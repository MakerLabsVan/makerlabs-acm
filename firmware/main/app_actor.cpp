#include "actors.h"

#include "acm_helpers.h"

#include "filesystem.h"
#include "requests.h"
#include "uuid.h"

#include "esp_log.h"

#include <chrono>
#include <queue>
#include <string>
#include <unordered_map>
#include <experimental/string_view>

using namespace ActorModel;
using namespace Requests;

using namespace ACM;

using namespace std::chrono_literals;

using string = std::string;
using string_view = std::experimental::string_view;

using UserFlatbuffer = flatbuffers::DetachedBuffer;
using MutableUserFlatbuffer = std::vector<uint8_t>;
using MutableActivityFlatbuffer = std::vector<uint8_t>;
using UUID::uuidgen;

constexpr char TAG[] = "app_actor";

struct AppActorState
{
  using ActivityMap = std::unordered_map<
    UUID::UUID,
    MutableActivityFlatbuffer,
    UUID::UUIDHashFunc,
    UUID::UUIDEqualFunc
  >;

  AppActorState()
  {
    permissions_check_request_intent_mutable_buf = filesystem_read(
      "/spiflash/permissions_check_request_intent.req.fb"
    );
  }

  auto send_activity_request(
    //ActivityFlatbuffer&& activity_flatbuf,
    const MutableActivityFlatbuffer& activity_mutable_buf,
    const Pid& self
  ) -> UUID::UUID
  {
    if (not activity_mutable_buf.empty())
    {
      const auto* request_intent = flatbuffers::GetRoot<RequestIntent>(
        permissions_check_request_intent_mutable_buf.data()
      );

      if (
        request_intent
        and not permissions_check_request_intent_mutable_buf.empty()
      )
      {
        // Generate a random request intent id, and send responses back to us
        update_request_intent_ids(
          permissions_check_request_intent_mutable_buf,
          self
        );

        // Send the binary Activity flatbuffer as the body of the request
        set_request_body(
          permissions_check_request_intent_mutable_buf,
          string_view{
            reinterpret_cast<const char*>(activity_mutable_buf.data()),
            activity_mutable_buf.size()
          }
        );

        // Update the flatbuffer after mutating it
        request_intent = flatbuffers::GetRoot<RequestIntent>(
          permissions_check_request_intent_mutable_buf.data()
        );

        // Extract the generated request id
        const auto& request_id = *(request_intent->id());

        // Send the request
        auto request_manager_actor_pid = *(whereis("request_manager"));
        send(
          request_manager_actor_pid,
          "request",
          permissions_check_request_intent_mutable_buf
        );

        // Enqueue the Activity that was sent and the request id for it
        pending_activity.emplace(request_id, activity_mutable_buf);

        // Update the progress bar on a timer
        if (not progress_tref)
        {
          auto display_actor_pid = *(whereis("display"));
          progress_tref = send_interval(250ms, display_actor_pid, "progress");
        }

        return request_id;
      }
    }

    return UUID::NullUUID;
  }

  auto send_progress_bar(const DisplayIntentFlatbuffer& display_intent_flatbuf)
    -> bool
  {
    auto display_actor_pid = *(whereis("display"));
    send(display_actor_pid, "ProgressBar", display_intent_flatbuf);
    return true;
  }

  auto cancel_progress_timer()
    -> bool
  {
    if (progress_tref)
    {
      cancel(progress_tref);
      progress_tref = NullTRef;
      return true;
    }

    return false;
  }

  MutableRequestIntentFlatbuffer permissions_check_request_intent_mutable_buf;

  ActivityMap pending_activity;

  MutableUserFlatbuffer current_user_flatbuf;

  string access_token;

  string machine_id_str = CONFIG_ACM_PERMISSION_COLUMN_LABEL;
  string tag_id_str;
  bool logged_in = false;
  TRef progress_tref = NullTRef;
  bool rfid_scanning = false;
};

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
      auto progress = 0;
      auto message = "Tag " + state.tag_id_str + " search";

      // Send the updated progress bar to the display
      auto progress_bar = generate_progress_bar(message, progress);
      state.send_progress_bar(progress_bar);

#if CONFIG_ACM_ENABLE_SIGNED_IN_ACTIVITY
      // Add a Signed_In activity:
      const auto& activity_flatbuf = generate_activity(
        state.machine_id_str,
        ActivityType::Signed_In,
        state.tag_id_str
      );

      MutableActivityFlatbuffer activity_mutable_buf;
      activity_mutable_buf.assign(
        activity_flatbuf.data(),
        activity_flatbuf.data() + activity_flatbuf.size()
      );
      state.send_activity_request(activity_mutable_buf, self);
#endif // CONFIG_ACM_ENABLE_SIGNED_IN_ACTIVITY

      return {Result::Ok};
    }
  }

  {
    if (matches(message, "tag_lost", state.tag_id_str))
    {
      // Update progress bar to 0%
      auto message = "Tag " + state.tag_id_str + " removed";
      auto progress = 0;
      auto progress_bar = generate_progress_bar(message, progress);
      state.send_progress_bar(progress_bar);

      // Reset stored current_user
      state.current_user_flatbuf.clear();

#if CONFIG_ACM_ENABLE_PERMISSIONS_REQUIRED
      auto machine_actor_pid = *(whereis("machine"));
      send(machine_actor_pid, "disable");
#endif // CONFIG_ACM_ENABLE_PERMISSIONS_REQUIRED

#if CONFIG_ACM_ENABLE_SIGNED_OUT_ACTIVITY
      // Add a Signed_Out activity:
      const auto& activity_flatbuf = generate_activity(
        state.machine_id_str,
        ActivityType::Signed_Out,
        state.tag_id_str
      );

      MutableActivityFlatbuffer activity_mutable_buf;
      activity_mutable_buf.assign(
        activity_flatbuf.data(),
        activity_flatbuf.data() + activity_flatbuf.size()
      );
      state.send_activity_request(activity_mutable_buf, self);
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
      const auto& activity_flatbuf = generate_activity(
        state.machine_id_str,
        ActivityType::CNC_Job,
        state.tag_id_str,
        cnc_job->usage_seconds()
      );

      MutableActivityFlatbuffer activity_mutable_buf;
      activity_mutable_buf.assign(
        activity_flatbuf.data(),
        activity_flatbuf.data() + activity_flatbuf.size()
      );
      state.send_activity_request(activity_mutable_buf, self);
#endif // CONFIG_ACM_ENABLE_CNC_JOB_ACTIVITY
    }
  }

  {
    const Response* response = nullptr;
    if (matches(message, "response_finished", response))
    {
      const auto& activity_iter = (
        state.pending_activity.find(*(response->request_id()))
      );
      if (activity_iter != state.pending_activity.end())
      {
        if (response->code() == 200)
        {
          // Update progress bar to 100%
          {
            auto progress = 100;
            auto progress_bar = generate_progress_bar(
              "",
              progress,
              Display::Icon::HeavyCheckmark
            );

            state.cancel_progress_timer();
            state.send_progress_bar(progress_bar);
          }
          auto valid_user = false;

          if (response->body() and response->body()->size() > 0)
          {
            flatbuffers::Verifier verifier(
              reinterpret_cast<const uint8_t*>(response->body()->data()),
              response->body()->size()
            );

            if (verifier.VerifyBuffer<ACM::User>("ACM."))
            {
              valid_user = true;
              const auto& activity_flatbuf = activity_iter->second;
              const auto* activity = flatbuffers::GetRoot<const Activity>(
                activity_flatbuf.data()
              );

              if (activity->activity_type() == ActivityType::Signed_In)
              {
                const auto& current_user_flatbuf = response->body();


                state.current_user_flatbuf.assign(
                  current_user_flatbuf->data(),
                  current_user_flatbuf->data() + current_user_flatbuf->size()
                );
                const User* current_user = flatbuffers::GetRoot<User>(
                  state.current_user_flatbuf.data()
                );

                if (current_user)
                {
#if CONFIG_ACM_ENABLE_PERMISSIONS_REQUIRED
                  if (current_user->permissions())
                  {
                    for (const auto* allowed : *(current_user->permissions()))
                    {
                      if (allowed->string_view() == state.machine_id_str)
                      {
                        auto machine_actor_pid = *(whereis("machine"));
                        send(machine_actor_pid, "enable");
                      }
                    }
                  }
#endif // CONFIG_ACM_ENABLE_PERMISSIONS_REQUIRED

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
          }

          if (not valid_user)
          {
#if CONFIG_ACM_ENABLE_PERMISSIONS_REQUIRED
            auto machine_actor_pid = *(whereis("machine"));
            send(machine_actor_pid, "disable");
#endif // CONFIG_ACM_ENABLE_PERMISSIONS_REQUIRED

            ESP_LOGW(TAG, "Missing user before updating display");
            // Update progress bar to 100%
            auto progress = 100;
            auto progress_bar = generate_progress_bar(
#if CONFIG_ACM_ENABLE_PERMISSIONS_REQUIRED
              "Access Denied",
#else
              "Unknown Tag",
#endif // CONFIG_ACM_ENABLE_PERMISSIONS_REQUIRED
              progress,
              Display::Icon::HeavyCheckmark
            );

            state.send_progress_bar(progress_bar);
          }

          // Clear the matching Activity, it has been completed
          // And already re-queued if needed
          state.pending_activity.erase(activity_iter);

          // TODO(@paulreimer): Cancel progress timer here?
          state.cancel_progress_timer();

          return {Result::Ok};
        }
      }
    }
  }

  {
    const Response* response = nullptr;
    if (matches(message, "response_error", response))
    {
      const auto& activity_iter = (
        state.pending_activity.find(*(response->request_id()))
      );
      if (activity_iter != state.pending_activity.end())
      {
        if (response->code() < 0)
        {
          ESP_LOGE(TAG, "query: Internal error, re-queueing (%d): '%.*s'\n", response->code(), response->body()->size(), response->body()->data());
        }

        // TODO(@paulreimer): In case of permissions error, should send re-auth?
        if (
          response->code() == 401
          or response->code() == 408
          or response->code() < 0
        )
        {
          // Attempt to retransmit under a new request intent id
          const auto& activity_flatbuf = activity_iter->second;
          state.send_activity_request(activity_flatbuf, self);
        }
      }
    }
  }

  {
    if (matches(message, "access_token", state.access_token))
    {
      if (not state.logged_in)
      {
        auto progress = 100;
        state.logged_in = true;

        // Update progress bar
        auto progress_bar = generate_progress_bar("Logged in", progress);
        state.send_progress_bar(progress_bar);
      }

      if (not state.permissions_check_request_intent_mutable_buf.empty())
      {
        // Update auth used for permissions_check requests
        set_request_header(
          state.permissions_check_request_intent_mutable_buf,
          "Authorization",
          "Bearer " + state.access_token
        );
      }

      // Distribute access_token to other actors
      auto firmware_update_actor_pid = *(whereis("firmware_update"));
      if (not compare_uuids(self, firmware_update_actor_pid))
      {
        send(firmware_update_actor_pid, "access_token", state.access_token);
      }

      // Ready to RFID scan!
      if (not state.rfid_scanning)
      {
        auto rfid_scan_interval = 500ms;
        auto rfid_reader_actor_pid = *(whereis("rfid_reader"));
        send_interval(rfid_scan_interval, rfid_reader_actor_pid, "scan");
        state.rfid_scanning = true;
      }

      return {Result::Ok, EventTerminationAction::ContinueProcessing};
    }
  }

  return {Result::Unhandled};
}
