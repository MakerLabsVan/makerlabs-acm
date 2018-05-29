#include "actors.h"

#include "acm_helpers.h"

#include "googleapis.h"
#include "requests.h"
#include "uuid.h"

#include "embedded_files.h"

#include "esp_log.h"

#include <queue>
#include <string>
#include <experimental/string_view>

using namespace ActorModel;
using namespace Requests;

using namespace ACM;
using namespace googleapis::Visualization;
using namespace googleapis::Sheets;

using string = std::string;
using string_view = std::experimental::string_view;

using UserFlatbuffer = flatbuffers::DetachedBuffer;
using UUID::uuidgen;

constexpr char TAG[] = "app_actor";

struct AppActorState
{
  AppActorState()
  {
    permissions_check_query_intent_mutable_buf.assign(
      embedded_files::permissions_check_query_gviz_fb.begin(),
      embedded_files::permissions_check_query_gviz_fb.end()
    );
  }

  auto make_progress(bool complete = false)
    -> void
  {
    auto limit = complete? 100U : 95U;
    progress = std::min(progress+1, limit);
  }

  MutableDatatableFlatbuffer permissions_check_query_intent_mutable_buf;
  UserFlatbuffer current_user_flatbuf;
  string machine_id_str = CONFIG_PERMISSION_COLUMN_LABEL;
  bool logged_in = false;
  bool first_request = true;

  uint32_t progress = 0;
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

  auto display_actor_pid = *(whereis("display"));

  {
    string tag_id_str;
    if (matches(message, "tag_found", tag_id_str))
    {
      // Update progress bar to 0%
      state.progress = 0;
      auto message = "Tag " + tag_id_str + " search";

      // For first request, override progress bar title
      if (state.first_request)
      {
        state.first_request = false;
        message = "First-time setup";
      }

      // Send the updated progress bar to the display
      auto progress_bar = generate_progress_bar(message, state.progress);
      auto display_actor_pid = *(whereis("display"));
      send(display_actor_pid, "ProgressBar", progress_bar);

      // Add a Signed_In activity:
      {
        auto values_json = generate_activity_json(
          state.machine_id_str,
          ActivityType::Signed_In,
          tag_id_str
        );

        auto insert_row_intent_id = uuidgen();

        flatbuffers::FlatBufferBuilder fbb;
        fbb.Finish(
          CreateInsertRowIntentDirect(
            fbb,
            &insert_row_intent_id,
            &self,
            CONFIG_SPREADSHEET_ID,
            CONFIG_SPREADSHEET_ACTIVITY_SHEET_NAME,
            values_json.c_str()
          )
        );

        // Send the row to the sheets actor
        auto sheets_actor_pid = *(whereis("sheets"));
        send(sheets_actor_pid, "insert_row", fbb.Release());
      }

      // Update the tag ID column in the permissions check query
      auto did_update_query = update_permissions_check_query_intent(
        state.permissions_check_query_intent_mutable_buf,
        tag_id_str
      );

      // If the query was updated successfully, then send the query
      if (did_update_query)
      {
        auto* query_intent = flatbuffers::GetMutableRoot<QueryIntent>(
          state.permissions_check_query_intent_mutable_buf.data()
        );
        if (query_intent and query_intent->to_pid())
        {
          // Assign a random ID to this query
          uuidgen(query_intent->mutable_id());

          // Send query results back to this actor
          update_uuid(query_intent->mutable_to_pid(), self);

          // Send the query to the query actor
          const auto& query_buf = state.permissions_check_query_intent_mutable_buf;
          auto visualization_query_actor_pid = *(whereis("gviz"));
          send(visualization_query_actor_pid, "query", query_buf);

          return {Result::Ok, EventTerminationAction::ContinueProcessing};
        }
      }
      else {
        return {Result::Error};
      }
    }
  }

  {
    string tag_id_str;
    if (matches(message, "tag_lost", tag_id_str))
    {
      // Update progress bar to 0%
      auto message = "Tag " + tag_id_str + " removed";
      state.progress = 0;
      auto progress_bar = generate_progress_bar(message, state.progress);
      auto display_actor_pid = *(whereis("display"));
      send(display_actor_pid, "ProgressBar", progress_bar);

      // Reset stored current_user
      state.current_user_flatbuf = UserFlatbuffer{};

      // Add a Signed_Out activity:
      {
        auto values_json = generate_activity_json(
          state.machine_id_str,
          ActivityType::Signed_Out,
          tag_id_str
        );

        auto insert_row_intent_id = uuidgen();

        flatbuffers::FlatBufferBuilder fbb;
        fbb.Finish(
          CreateInsertRowIntentDirect(
            fbb,
            &insert_row_intent_id,
            &self,
            CONFIG_SPREADSHEET_ID,
            CONFIG_SPREADSHEET_ACTIVITY_SHEET_NAME,
            values_json.c_str()
          )
        );

        // Send the row to the sheets actor
        auto sheets_actor_pid = *(whereis("sheets"));
        send(sheets_actor_pid, "insert_row", fbb.Release());
      }

      return {Result::Ok, EventTerminationAction::ContinueProcessing};
    }
  }

  {
    const Datatable* query_results;
    if (matches(message, "query_results", query_results))
    {
      auto valid_user = false;

      const auto* query = flatbuffers::GetRoot<QueryIntent>(
        state.permissions_check_query_intent_mutable_buf.data()
      );

      if (query and query_results)
      {
        // Generate a User from the query results
        state.current_user_flatbuf = generate_user_from_query_intent_with_results(
          query,
          query_results
        );

        printf("Updated logged in user\n");

        const User* current_user = flatbuffers::GetRoot<User>(
          state.current_user_flatbuf.data()
        );

        if (current_user)
        {
          valid_user = true;

          // Show user details on OLED display
          auto show_user_details_display_intent_flatbuf = (
            generate_show_user_details_from_user(current_user)
          );

          send(
            display_actor_pid,
            "ShowUserDetails",
            show_user_details_display_intent_flatbuf
          );
        }
      }

      if (not valid_user)
      {
        ESP_LOGW(TAG, "Missing user before updating display");
        // Update progress bar to 100%
        state.progress = 100;
        auto progress_bar = generate_progress_bar(
          "Access Denied",
          state.progress,
          Display::Icon::HeavyCheckmark
        );
        auto display_actor_pid = *(whereis("display"));
        send(display_actor_pid, "ProgressBar", progress_bar);
      }

      return {Result::Ok};
    }
  }

  {
    if (matches(message, "inserted_row"))
    {
      // Update progress bar to 100%
      state.progress = 100;
      auto progress_bar = generate_progress_bar(
        "",
        state.progress,
        Display::Icon::HeavyCheckmark
      );
      auto display_actor_pid = *(whereis("display"));
      send(display_actor_pid, "ProgressBar", progress_bar);
    }
  }

  {
    string_view access_token_str;
    if (matches(message, "access_token", access_token_str))
    {
      if (not state.logged_in)
      {
        state.logged_in = true;

        // Update progress bar
        auto progress_bar = generate_progress_bar("Logged in", state.progress);
        auto display_actor_pid = *(whereis("display"));
        send(display_actor_pid, "ProgressBar", progress_bar);
      }

      // Distribute access_token to other actors
      auto spreadsheet_insert_row_actor_pid = *(whereis("sheets"));
      send(spreadsheet_insert_row_actor_pid, "access_token", access_token_str);

      auto visualization_query_actor_pid = *(whereis("gviz"));
      send(visualization_query_actor_pid, "access_token", access_token_str);

      auto firmware_update_actor_pid = *(whereis("firmware_update"));
      send(firmware_update_actor_pid, "access_token", access_token_str);

      // Ready to RFID scan!
      //auto rfid_reader_actor_pid = *(whereis("rfid_reader"));
      //send(rfid_reader_actor_pid, "scan");

      return {Result::Ok, EventTerminationAction::ContinueProcessing};
    }
  }

  {
    if (matches(message, "progress"))
    {
      if (state.current_user_flatbuf.size() == 0)
      {
        // Update progress bar
        state.make_progress();
        auto progress_bar = generate_progress_bar("", state.progress);
        auto display_actor_pid = *(whereis("display"));
        send(display_actor_pid, "ProgressBar", progress_bar);
      }
    }
  }

  return {Result::Unhandled};
}
