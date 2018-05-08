#include "actors.h"

#include "requests.h"

#include "acm_helpers.h"

#include "embedded_files.h"

#include "esp_log.h"

#include <string>
#include <experimental/string_view>

using namespace ActorModel;
using namespace Requests;

using namespace ACM;

using string = std::string;
using string_view = std::experimental::string_view;

constexpr char TAG[] = "google_sheets_actor";

struct GoogleSheetsActorState
{
  MutableRequestIntentFlatbuffer activity_request_intent_mutable_buf;
  MutableRequestIntentFlatbuffer log_request_intent_mutable_buf;
  bool did_notify_reboot = false;
  string machine_id_str = CONFIG_PERMISSION_COLUMN_LABEL;
};

auto google_sheets_actor_behaviour(
  const Pid& self,
  StatePtr& _state,
  const Message& message
) -> ResultUnion
{
  if (not _state)
  {
    _state = std::make_shared<GoogleSheetsActorState>();

    auto& state = *(std::static_pointer_cast<GoogleSheetsActorState>(_state));

    {
      // Parse (& copy) the permission check request intent flatbuffer
      state.activity_request_intent_mutable_buf = parse_request_intent(
        embedded_files::activity_request_intent_req_fb
      );
      // Extract the RequestIntent root
      auto activity_request_intent = GetMutableRequestIntent(
        state.activity_request_intent_mutable_buf.data()
      );
      // Set the destination Pid for response messages
      update_uuid(activity_request_intent->mutable_to_pid(), self);
    }

    {
      // Parse (& copy) the permission check request intent flatbuffer
      state.log_request_intent_mutable_buf = parse_request_intent(
        embedded_files::log_request_intent_req_fb
      );
      // Extract the RequestIntent root
      auto log_request_intent = GetMutableRequestIntent(
        state.log_request_intent_mutable_buf.data()
      );
      // Set the destination Pid for response messages
      update_uuid(log_request_intent->mutable_to_pid(), self);
    }
  }
  auto& state = *(std::static_pointer_cast<GoogleSheetsActorState>(_state));

  const Response* response;
  if (matches(message, "chunk", response))
  {
    printf("received chunk\n");
  }

  else if (matches(message, "complete", response))
  {
    printf("did post activity\n");

    ESP_LOGI(TAG, "got body (%d): '%.*s'\n", response->code(), response->body()->size(), response->body()->data());
  }

  else if (matches(message, "error", response))
  {
    if (response->code() < 0)
    {
      ESP_LOGE(TAG, "Fatal error (%d): '%.*s'\n", response->code(), response->body()->size(), response->body()->data());
      throw std::runtime_error("Fatal error");
    }
    ESP_LOGE(TAG, "got error (%d): '%.*s'\n", response->code(), response->body()->size(), response->body()->data());
  }

  else if (message.type()->string_view() == "reauth")
  {
    printf("google sheets actor reauth\n");
    const auto access_token_str = string_view{
      reinterpret_cast<const char*>(message.payload()->data()),
      message.payload()->size()
    };
    printf("access_token_str = '%.*s'\n", access_token_str.size(), access_token_str.data());

    // Use access_token to auth spreadsheet Activity insert request
    set_header(
      state.activity_request_intent_mutable_buf,
      "Authorization",
      string{"Bearer "} + string{access_token_str}
    );

    // Use access_token to auth spreadsheet Log insert request
    set_header(
      state.log_request_intent_mutable_buf,
      "Authorization",
      string{"Bearer "} + string{access_token_str}
    );

    if (not state.did_notify_reboot)
    {
      printf("about to do notify reboot?\n");
      // Send Log request
      set_request_body(
        state.log_request_intent_mutable_buf,
        generate_log_json(
          state.machine_id_str,
          LogSeverity::Notice,
          "Reboot"
        )
      );

      auto request_manager_actor_pid = *(whereis("request_manager"));
      send(
        request_manager_actor_pid,
        "request",
        state.log_request_intent_mutable_buf
      );

      state.did_notify_reboot = true;
    }
  }

  return Ok;
}
