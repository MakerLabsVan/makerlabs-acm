#include "actors.h"

#include "acm_helpers.h"

#include "filesystem.h"
#include "requests.h"
#include "timestamp.h"
#include "uuid.h"

#include "trace.h"

#include "flatbuffers/minireflect.h"

#include "esp_log.h"

#include <chrono>
#include <experimental/string_view>
#include <list>
#include <queue>
#include <string>

using namespace ActorModel;
using namespace Requests;

using namespace ACM;

using namespace std::chrono_literals;

using string = std::string;
using string_view = std::experimental::string_view;

using RequestPayloadFlatbuffer = flatbuffers::DetachedBuffer;
using UserFlatbuffer = flatbuffers::DetachedBuffer;
using MutableUserFlatbuffer = std::vector<uint8_t>;
using MutableActivityFlatbuffer = std::vector<uint8_t>;
using MutableRequestPayloadFlatbuffer = std::vector<uint8_t>;
using UUID::uuidgen;

constexpr char TAG[] = "app_actor";

auto send_progress_bar(const DisplayIntentFlatbuffer& display_intent_flatbuf)
  -> bool;

auto send_activity(const ActivityFlatbuffer& activity_mutable_buf)
  -> bool;

struct AppActorState
{
  using InProgressRequestPayload = std::pair<
    UUID::UUID,
    RequestPayloadFlatbuffer
  >;
  using InProgressRequestPayloadList = std::list<InProgressRequestPayload>;

  AppActorState()
  {
  }

  auto send_activity(const ActivityFlatbuffer& activity_mutable_buf)
    -> bool
  {
    bool did_send_request = false;

    auto permissions_check_endpoint_actor_pid = *(
      whereis("permissions_check_endpoint"
      )
    );

    auto request_payload = make_request_payload(activity_mutable_buf);

    did_send_request = send(
      permissions_check_endpoint_actor_pid,
      "request_payload",
      request_payload
    );

    if (did_send_request)
    {
      const auto* _request_payload = flatbuffers::GetRoot<RequestPayload>(
        request_payload.data()
      );

      if (_request_payload and _request_payload->id())
      {
        // Pop the request payload now that it has been processed
        // First add the move the payload into the list of inflight requests
        in_progress_request_payloads.emplace_back(
          std::make_pair(*(_request_payload->id()), std::move(request_payload))
        );
      }
    }

    return did_send_request;
  }

  MutableUserFlatbuffer current_user_flatbuf;

  string machine_id_str = CONFIG_ACM_PERMISSION_COLUMN_LABEL;
  string tag_id_str;
  string last_makerlabs_id_str;
  TimeDuration tag_lost_time = 0s;
  bool logged_in = false;

  InProgressRequestPayloadList in_progress_request_payloads;
};

auto send_progress_bar(const DisplayIntentFlatbuffer& display_intent_flatbuf)
  -> bool
{
  auto display_actor_pid = *(whereis("display"));
  return send(display_actor_pid, "ProgressBar", display_intent_flatbuf);
}

auto app_actor_behaviour(
  const Pid& self,
  StatePtr& _state,
  const Message& message
) -> ResultUnion
{
  if (not _state)
  {
    _state = std::make_shared<AppActorState>();
  }
  auto& state = *(std::static_pointer_cast<AppActorState>(_state));

  {
    if (matches(message, "tag_found", state.tag_id_str))
    {
      // Update progress bar to 0%
      auto message = "Tag " + state.tag_id_str + " search";

      // Send the updated progress bar to the display
      send_progress_bar(
        generate_progress_bar(
          message,
          0,
          15s
        )
      );

#if CONFIG_ACM_ENABLE_SIGNED_IN_ACTIVITY
      // Add a Signed_In activity:
      state.send_activity(
        generate_activity(
          state.machine_id_str,
          ActivityType::Signed_In,
          state.tag_id_str
        )
      );
#endif // CONFIG_ACM_ENABLE_SIGNED_IN_ACTIVITY

      return {Result::Ok};
    }
  }

  {
    if (matches(message, "tag_lost", state.tag_id_str))
    {
      // Reset stored current_user
      state.current_user_flatbuf.clear();

#if CONFIG_ACM_ENABLE_PERMISSIONS_REQUIRED
      auto machine_actor_pid = *(whereis("machine"));
      send(machine_actor_pid, "disable");
#endif // CONFIG_ACM_ENABLE_PERMISSIONS_REQUIRED

#if CONFIG_ACM_ENABLE_SIGNED_OUT_ACTIVITY
      // Update progress bar to 0%
      auto message = "Tag " + state.tag_id_str + " removed";
      send_progress_bar(
        generate_progress_bar(
          message,
          0,
          15s
        )
      );

      // Add a Signed_Out activity:
      state.send_activity(
        generate_activity(
          state.machine_id_str,
          ActivityType::Signed_Out,
          state.tag_id_str
        )
      );
#endif // CONFIG_ACM_ENABLE_SIGNED_OUT_ACTIVITY

      return {Result::Ok};
    }
  }

  {
    const CNC_Job* cnc_job = nullptr;
    if (matches(message, "cnc_job", cnc_job))
    {
#if CONFIG_ACM_ENABLE_CNC_JOB_ACTIVITY
      // Add a Signed_In activity:
      state.send_activity(
        generate_activity(
          state.machine_id_str,
          ActivityType::CNC_Job,
          state.tag_id_str,
          cnc_job->usage_seconds()
        )
      );
#endif // CONFIG_ACM_ENABLE_CNC_JOB_ACTIVITY
    }
  }

  {
    const ResponsePayload* response_payload;
    if (matches(message, "response_payload", response_payload))
    {

      // Ensure the completed response is one of ours
      const auto& request_payload_iter = std::find_if(
        state.in_progress_request_payloads.begin(),
        state.in_progress_request_payloads.end(),
        [response_payload](const AppActorState::InProgressRequestPayload& r)
        {
          return compare_uuids(r.first, *(response_payload->request_id()));
        }
      );
      if (request_payload_iter != state.in_progress_request_payloads.end())
      {
        const auto* request_payload = flatbuffers::GetRoot<RequestPayload>(
          request_payload_iter->second.data()
        );

        const auto& latest_request_payload = (
          state.in_progress_request_payloads.back()
        );
        if (
          request_payload
          and request_payload->payload()
          and compare_uuids(
            latest_request_payload.first,
            request_payload_iter->first
          )
        )
        {
          const auto* activity = flatbuffers::GetRoot<Activity>(
            request_payload->payload()->data()
          );
/*
          // Update progress bar to 100%
          {
            send_progress_bar(
              generate_progress_bar(
                "",
                100,
                0s,
                Display::Icon::HeavyCheckmark
              )
            );
          }
*/
          auto valid_user = false;

          if (
            response_payload->payload()
            and response_payload->payload()->size() > 0
          )
          {
            const auto& payload = *(response_payload->payload());
            flatbuffers::Verifier verifier(
              reinterpret_cast<const uint8_t*>(
                payload.data()
              ),
              payload.size()
            );

            if (verifier.VerifyBuffer<ACM::User>("ACM."))
            {
              valid_user = true;

              if (activity->activity_type() == ActivityType::Signed_In)
              {
                printf("Updated logged in user\n");

                state.current_user_flatbuf.assign(
                  payload.data(),
                  payload.data() + payload.size()
                );

                const User* current_user = flatbuffers::GetRoot<User>(
                  state.current_user_flatbuf.data()
                );

                if (current_user)
                {
#if CONFIG_ACM_ENABLE_PERMISSIONS_REQUIRED
                  bool found = false;
                  if (current_user->permissions())
                  {
                    for (const auto* allowed : *(current_user->permissions()))
                    {
                      if (allowed->string_view() == state.machine_id_str)
                      {
                        found = true;
                        break;
                      }
                    }
                  }

                  if (found)
                  {
                    printf("Access granted\n");
                    auto rfid_actor_pid = *(whereis("rfid_reader"));
                    send(rfid_actor_pid, "beep");

                    auto machine_actor_pid = *(whereis("machine"));
                    send(machine_actor_pid, "enable");
                  }
                  else {
                    printf("Access denied\n");
                    auto rfid_actor_pid = *(whereis("rfid_reader"));
                    send(rfid_actor_pid, "long_beep");
                  }
#endif // CONFIG_ACM_ENABLE_PERMISSIONS_REQUIRED

                  // Store cached copy of user fields for sign-out purposes
                  if (current_user->makerlabs_id())
                  {
                    state.last_makerlabs_id_str = current_user->makerlabs_id()->str();
                  }

                  // Show user details on OLED display
                  auto show_user_details_display_intent_flatbuf = (
                    generate_show_user_details_from_user(current_user)
                  );

                  auto display_actor_pid = *(whereis("display"));
                  send(
                    display_actor_pid,
                    "ShowUserDetails",
                    show_user_details_display_intent_flatbuf
                  );
                }
              }
            }
            else {
              printf("Invalid user\n");
            }
          }

          if (not valid_user)
          {
#if CONFIG_ACM_ENABLE_PERMISSIONS_REQUIRED
            auto machine_actor_pid = *(whereis("machine"));
            send(machine_actor_pid, "disable");
#endif // CONFIG_ACM_ENABLE_PERMISSIONS_REQUIRED

            ESP_LOGW(TAG, "Missing user before updating display");

            // Update progress bar to 100%
            send_progress_bar(
              generate_progress_bar(
#if CONFIG_ACM_ENABLE_PERMISSIONS_REQUIRED
                "Access Denied",
#else
                "Unknown (" + state.tag_id_str + ")",
#endif // CONFIG_ACM_ENABLE_PERMISSIONS_REQUIRED
                100,
                0s,
                Display::Icon::HeavyCheckmark
              )
            );
          }

          if (activity->activity_type() == ActivityType::Signed_Out)
          {
            // Show machine ID details on OLED display
            const auto logged_out_details = generate_show_user_details(
              "Logged out",
              "Logged out",
              state.last_makerlabs_id_str,
              "Logged out"
            );

            auto display_actor_pid = *(whereis("display"));
            send(
              display_actor_pid,
              "ShowUserDetails",
              logged_out_details
            );
          }

        }
        else {
          ESP_LOGW(TAG, "Received response for HTTP request out of order, ignoring");
        }

        // Clear the matching Activity, it has been completed
        // And already re-queued if needed
        state.in_progress_request_payloads.erase(request_payload_iter);

        return {Result::Ok};
      }
    }
  }

  {
    const Response* response = nullptr;
    if (matches(message, "response_error", response))
    {
      // Ensure the completed response is one of ours
      const auto& request_payload_iter = std::find_if(
        state.in_progress_request_payloads.begin(),
        state.in_progress_request_payloads.end(),
        [response](const AppActorState::InProgressRequestPayload& r)
        {
          return compare_uuids(r.first, *(response->request_id()));
        }
      );
      if (request_payload_iter != state.in_progress_request_payloads.end())
      {

        if (response->code() < 0)
        {
          const auto errbuf = string_view{
            reinterpret_cast<const char*>(response->body()->data()),
            response->body()->size()
          };

          ESP_LOGE(
            TAG,
            "query: Internal error, re-queueing (%d): '%.*s'\n",
            response->code(),
            errbuf.size(),
            errbuf.data()
          );

          auto request_manager_actor_pid = *(whereis("request_manager"));
          send(request_manager_actor_pid, "exit", errbuf);
        }
      }
    }
  }

  {
    if (matches(message, "access_token"))
    {
      if (not state.logged_in)
      {
        state.logged_in = true;

        // Show machine ID details on OLED display
        const auto machine_logged_in_details = generate_show_user_details(
          state.machine_id_str,
          "Logged in",
          "Logged in",
          "Logged in"
        );

        auto display_actor_pid = *(whereis("display"));
        send(display_actor_pid, "ShowUserDetails", machine_logged_in_details);
      }

      // Re-distribute access_token message to other actors
      auto firmware_update_actor_pid = *(whereis("firmware_update"));
      // Skip sending a duplicate message, if this one will pass-through
      if (not compare_uuids(self, firmware_update_actor_pid))
      {
        send(firmware_update_actor_pid, message);
      }

      auto permissions_check_endpoint_actor_pid = *(
        whereis("permissions_check_endpoint"
        )
      );
      // Skip sending a duplicate message, if this one will pass-through
      if (not compare_uuids(self, permissions_check_endpoint_actor_pid))
      {
        send(permissions_check_endpoint_actor_pid, message);
      }

      return {Result::Ok, EventTerminationAction::ContinueProcessing};
    }
  }

  {
    if (matches(message, "uptime"))
    {
      auto elapsed_microseconds = esp_timer_get_time();
      ESP_LOGW("uptime", "%llus", (elapsed_microseconds / 1000000));
      return {Result::Ok};
    }
  }

  return {Result::Unhandled};
}
