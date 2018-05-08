#include "actors.h"

#include "requests.h"

#include "embedded_files.h"

#include "esp_log.h"

#include <string>
#include <experimental/string_view>

using namespace ActorModel;
using namespace Requests;

constexpr char TAG[] = "reauth_actor";

using string = std::string;
using string_view = std::experimental::string_view;

struct ReauthActorState
{
  MutableRequestIntentFlatbuffer reauth_request_intent_mutable_buf;
  RequestIntent* reauth_request_intent = nullptr;
  bool ready_to_run = false;
};

auto reauth_actor_behaviour(
  const Pid& self,
  StatePtr& _state,
  const Message& message
) -> ResultUnion
{
  if (not _state)
  {
    _state = std::make_shared<ReauthActorState>();

    auto& state = *(std::static_pointer_cast<ReauthActorState>(_state));

    state.reauth_request_intent_mutable_buf = parse_request_intent(
      embedded_files::reauth_request_intent_req_fb
    );
    // Extract the RequestIntent root
    state.reauth_request_intent = GetMutableRequestIntent(
      state.reauth_request_intent_mutable_buf.data()
    );
    // Set the destination Pid for response messages
    update_uuid(state.reauth_request_intent->mutable_to_pid(), self);
  }
  auto& state = *(std::static_pointer_cast<ReauthActorState>(_state));

  auto request_manager_actor_pid = *(whereis("request_manager"));

  const Response* response;
  if (matches(message, "chunk", response))
  {
    printf("received access_token from reauth\n");

    auto access_token_str = string_view{
      response->body()->data(),
      response->body()->size()
    };
    auto permissions_check_actor_pid = *(whereis("permissions_check"));
    send(permissions_check_actor_pid, "reauth", access_token_str);

    //auto firmware_update_actor_pid = *(whereis("firmware_update"));
    //send(firmware_update_actor_pid, "reauth", access_token_str);

    auto google_sheets_actor_pid = *(whereis("google_sheets"));
    send(google_sheets_actor_pid, "reauth", access_token_str);

    if (not state.ready_to_run)
    {
      auto permissions_check_actor_pid = *(whereis("permissions_check"));
      send(permissions_check_actor_pid, "update_columns");
    }

    if (response->code() < 400)
    {
      ESP_LOGI(TAG, "got chunk (%d): '%.*s'\n", response->code(), response->body()->size(), response->body()->data());
    }
    else {
      ESP_LOGE(TAG, "got chunk (%d): '%.*s'\n", response->code(), response->body()->size(), response->body()->data());
    }
  }

  else if (matches(message, "complete", response))
  {

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
    printf("send reauth request here\n");

    // Send the request intent message to the request manager actor
    send(
      request_manager_actor_pid,
      "request",
      state.reauth_request_intent_mutable_buf
    );
  }

  return Ok;
}
