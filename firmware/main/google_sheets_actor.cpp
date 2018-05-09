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

    // Parse (& copy) the permission check request intent flatbuffer
    state.activity_request_intent_mutable_buf = parse_request_intent(
      embedded_files::activity_request_intent_req_fb,
      self
    );

    // Parse (& copy) the permission check request intent flatbuffer
    state.log_request_intent_mutable_buf = parse_request_intent(
      embedded_files::log_request_intent_req_fb,
      self
    );
  }
  auto& state = *(std::static_pointer_cast<GoogleSheetsActorState>(_state));

  const Response* response;
  auto activity_request_intent_id = get_request_intent_id(
    state.activity_request_intent_mutable_buf
  );
  auto log_request_intent_id = get_request_intent_id(
    state.log_request_intent_mutable_buf
  );

  if (matches(message, "chunk", response, activity_request_intent_id))
  {
    printf("received chunk for activity\n");

    return Ok;
  }

  else if (matches(message, "chunk", response, log_request_intent_id))
  {
    printf("received chunk for log\n");

    return Ok;
  }

  else if (matches(message, "complete", response, activity_request_intent_id))
  {
    printf("did post activity\n");

    ESP_LOGI(TAG, "got body (%d): '%.*s'\n", response->code(), response->body()->size(), response->body()->data());

    return Ok;
  }

  else if (matches(message, "complete", response, log_request_intent_id))
  {
    printf("did post log\n");

    ESP_LOGI(TAG, "got body (%d): '%.*s'\n", response->code(), response->body()->size(), response->body()->data());

    return Ok;
  }

  else if (matches(message, "error", response, activity_request_intent_id))
  {
    if (response->code() < 0)
    {
      ESP_LOGE(TAG, "Fatal error (%d), resending: '%.*s'\n", response->code(), response->body()->size(), response->body()->data());
      auto request_manager_actor_pid = *(whereis("request_manager"));
      send(
        request_manager_actor_pid,
        "request",
        state.activity_request_intent_mutable_buf
      );
      //throw std::runtime_error("Fatal error");
    }
    ESP_LOGE(TAG, "got error (%d): '%.*s'\n", response->code(), response->body()->size(), response->body()->data());

    return Ok;
  }

  else if (matches(message, "error", response, log_request_intent_id))
  {
    if (response->code() < 0)
    {
      ESP_LOGE(TAG, "Fatal error (%d), resending: '%.*s'\n", response->code(), response->body()->size(), response->body()->data());
      auto request_manager_actor_pid = *(whereis("request_manager"));
      send(
        request_manager_actor_pid,
        "request",
        state.log_request_intent_mutable_buf
      );
      //throw std::runtime_error("Fatal error");
    }
    ESP_LOGE(TAG, "got error (%d): '%.*s'\n", response->code(), response->body()->size(), response->body()->data());

    return Ok;
  }

  else if (matches(message, "reauth"))
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

    return Ok;
  }

  return Unhandled;
}
