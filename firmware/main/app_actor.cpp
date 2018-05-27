#include "actors.h"

#include "requests.h"

#include "acm_helpers.h"

#include "googleapis.h"

#include "embedded_files.h"

#include "esp_log.h"

#include <queue>
#include <string>
#include <experimental/string_view>

using namespace ActorModel;
using namespace Requests;

using namespace ACM;
using namespace googleapis::Visualization;

using string = std::string;
using string_view = std::experimental::string_view;

using UserFlatbuffer = flatbuffers::DetachedBuffer;

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

  MutableDatatableFlatbuffer permissions_check_query_intent_mutable_buf;
  UserFlatbuffer current_user_flatbuf;
  string machine_id_str = CONFIG_PERMISSION_COLUMN_LABEL;
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
    string_view tag_id_str;
    if (matches(message, "tag_found", tag_id_str))
    {
      auto did_update_query = update_permissions_check_query_intent(
        state.permissions_check_query_intent_mutable_buf,
        tag_id_str
      );

      // Add a Signed_In activity:
      {
        auto values_json = generate_activity_json(
          state.machine_id_str,
          ActivityType::Signed_In,
          tag_id_str
        );

        flatbuffers::FlatBufferBuilder fbb;
        fbb.Finish(
          CreateInsertRowIntentDirect(
            fbb,
            CONFIG_SPREADSHEET_ID,
            CONFIG_SPREADSHEET_ACTIVITY_SHEET_NAME,
            values_json.c_str()
          )
        );

        // Send the row to the sheets actor
        auto sheets_actor_pid = *(whereis("sheets"));
        send(sheets_actor_pid, "insert_row", fbb.Release());
      }


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
    string_view tag_id_str;
    if (matches(message, "tag_lost", tag_id_str))
    {
      // Reset stored current_user
      state.current_user_flatbuf = UserFlatbuffer{};

      // Blank the display
      auto display_actor_pid = *(whereis("display"));
      send(display_actor_pid, "ClearDisplay");

      // Add a Signed_Out activity:
      {
        auto values_json = generate_activity_json(
          state.machine_id_str,
          ActivityType::Signed_Out,
          tag_id_str
        );

        flatbuffers::FlatBufferBuilder fbb;
        fbb.Finish(
          CreateInsertRowIntentDirect(
            fbb,
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
        else {
          ESP_LOGW(TAG, "Missing user before updating display");
        }
      }
    }
  }

  {
    string_view access_token_str;
    if (matches(message, "access_token", access_token_str))
    {
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

  return {Result::Unhandled};
}
