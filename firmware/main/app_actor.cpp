#include "actors.h"

#include "acm_helpers.h"

#include "filesystem.h"
#include "googleapis.h"
#include "requests.h"
#include "uuid.h"

#include "embedded_files.h"

#include "esp_log.h"

#include <chrono>
#include <queue>
#include <string>
#include <experimental/string_view>

using namespace ActorModel;
using namespace Requests;

using namespace ACM;
using namespace googleapis::Visualization;
using namespace googleapis::Sheets;

using namespace std::chrono_literals;

using string = std::string;
using string_view = std::experimental::string_view;

using UserFlatbuffer = flatbuffers::DetachedBuffer;
using UUID::uuidgen;

constexpr char TAG[] = "app_actor";

struct AppActorState
{
  AppActorState()
  {
    permissions_check_query_intent_mutable_buf = filesystem_read(
      "/spiflash/permissions_check_query.gviz.fb"
    );
  }

  MutableDatatableFlatbuffer permissions_check_query_intent_mutable_buf;
  UserFlatbuffer current_user_flatbuf;
  string machine_id_str = CONFIG_PERMISSION_COLUMN_LABEL;
  bool logged_in = false;
  bool first_request = true;
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

  auto display_actor_pid = *(whereis("display"));

  {
    string tag_id_str;
    if (matches(message, "tag_found", tag_id_str))
    {
      // Update progress bar to 0%
      auto progress = 0;
      auto message = "Tag " + tag_id_str + " search";

      // For first request, override progress bar title
      if (state.first_request)
      {
        state.first_request = false;
        message = "First-time setup";
      }

      // Send the updated progress bar to the display
      auto progress_bar = generate_progress_bar(message, progress);
      auto display_actor_pid = *(whereis("display"));
      send(display_actor_pid, "ProgressBar", progress_bar);

      if (not state.progress_tref)
      {
        state.progress_tref = send_interval(
          200ms,
          display_actor_pid,
          "progress"
        );
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
        }
      }
      else {
        //return {Result::Error};
      }

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
        auto insert_row = fbb.Release();
        send(sheets_actor_pid, "insert_row", insert_row);
      }

      return {Result::Ok};
    }
  }

  {
    string tag_id_str;
    if (matches(message, "tag_lost", tag_id_str))
    {
      // Update progress bar to 0%
      auto message = "Tag " + tag_id_str + " removed";
      auto progress = 0;
      auto progress_bar = generate_progress_bar(message, progress);
      auto display_actor_pid = *(whereis("display"));
      send(display_actor_pid, "ProgressBar", progress_bar);

      if (not state.progress_tref)
      {
        state.progress_tref = send_interval(
          50ms,
          display_actor_pid,
          "progress"
        );
      }

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

      return {Result::Ok};
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
        auto progress = 100;
        auto progress_bar = generate_progress_bar(
          "Access Denied",
          progress,
          Display::Icon::HeavyCheckmark
        );

        auto display_actor_pid = *(whereis("display"));
        send(display_actor_pid, "ProgressBar", progress_bar);
      }

      if (state.progress_tref)
      {
        cancel(state.progress_tref);
        state.progress_tref = NullTRef;
      }

      return {Result::Ok};
    }
  }

  {
    if (matches(message, "inserted_row"))
    {
      // Update progress bar to 100%
      auto progress = 100;
      auto progress_bar = generate_progress_bar(
        "",
        progress,
        Display::Icon::HeavyCheckmark
      );

      if (state.progress_tref)
      {
        cancel(state.progress_tref);
        state.progress_tref = NullTRef;
      }

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
        auto progress = 100;
        state.logged_in = true;

        // Update progress bar
        auto progress_bar = generate_progress_bar("Logged in", progress);
        auto display_actor_pid = *(whereis("display"));
        send(display_actor_pid, "ProgressBar", progress_bar);
      }

      // Distribute access_token to other actors
      auto spreadsheet_insert_row_actor_pid = *(whereis("sheets"));
      if (not compare_uuids(self, spreadsheet_insert_row_actor_pid))
      {
        send(spreadsheet_insert_row_actor_pid, "access_token", access_token_str);
      }

      auto visualization_query_actor_pid = *(whereis("gviz"));
      if (not compare_uuids(self, visualization_query_actor_pid))
      {
        send(visualization_query_actor_pid, "access_token", access_token_str);
      }

      auto firmware_update_actor_pid = *(whereis("firmware_update"));
      if (not compare_uuids(self, firmware_update_actor_pid))
      {
        send(firmware_update_actor_pid, "access_token", access_token_str);
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
