#include "actors.h"

#include "requests.h"

#include "esp_log.h"

#include <string>
#include <experimental/string_view>

using namespace ActorModel;
using namespace Requests;

constexpr char TAG[] = "auth_actor";

using string = std::string;
using string_view = std::experimental::string_view;

struct AuthActorState
{
  AuthActorState()
  {
  }

  MutableRequestIntentFlatbuffer reauth_request_intent_mutable_buf;
};

auto auth_actor_behaviour(
  const Pid& self,
  StatePtr& _state,
  const Message& message
) -> ResultUnion
{
  if (not _state)
  {
    _state = std::make_shared<AuthActorState>();
  }
  auto& state = *(std::static_pointer_cast<AuthActorState>(_state));

  {
    const Response* response;
    auto reauth_request_intent_id = get_request_intent_id(
      state.reauth_request_intent_mutable_buf
    );
    if (matches(message, "response_chunk", response, reauth_request_intent_id))
    {
      if (response->code() < 400)
      {
        auto access_token_str = string_view{
          response->body()->data(),
          response->body()->size()
        };

        auto app_actor_pid = *(whereis("app"));
        send(app_actor_pid, "access_token", access_token_str);
      }
      else {
        ESP_LOGE(TAG, "got error chunk (%d): '%.*s'\n", response->code(), response->body()->size(), response->body()->data());
      }

      return {Result::Ok};
    }
  }

  {
    const Response* response;
    auto reauth_request_intent_id = get_request_intent_id(
      state.reauth_request_intent_mutable_buf
    );
    if (matches(message, "response_finished", response, reauth_request_intent_id))
    {
      // Already processed access_token(s) via chunk messages
      // Check for internal error and re-send request immediately in that case
      if (response->code() < 0)
      {
        ESP_LOGE(TAG, "Fatal error (%d): '%.*s'\n", response->code(), response->body()->size(), response->body()->data());
        //throw std::runtime_error("Fatal error");
        // Re-send the failed request
        auto request_manager_actor_pid = *(whereis("request_manager"));
        send(
          request_manager_actor_pid,
          "request",
          state.reauth_request_intent_mutable_buf
        );
      }
      return {Result::Ok};
    }
  }

  {
    const Response* response;
    auto reauth_request_intent_id = get_request_intent_id(
      state.reauth_request_intent_mutable_buf
    );
    if (matches(message, "response_error", response, reauth_request_intent_id))
    {
      ESP_LOGE(TAG, "got error (%d): '%.*s'\n", response->code(), response->body()->size(), response->body()->data());

      return {Result::Ok};
    }
  }

  {
    string_view reauth_request_intent;
    if (matches(message, "reauth", reauth_request_intent))
    {
      if (not reauth_request_intent.empty())
      {
        // Parse (& copy) the firmware update check request intent flatbuffer
        state.reauth_request_intent_mutable_buf = parse_request_intent(
          reauth_request_intent,
          self
        );
      }

      if (not state.reauth_request_intent_mutable_buf.empty())
      {
        // Send the request intent message to the request manager actor
        auto request_manager_actor_pid = *(whereis("request_manager"));
        send(
          request_manager_actor_pid,
          "request",
          state.reauth_request_intent_mutable_buf
        );
      }

      return {Result::Ok};
    }
  }

  return {Result::Unhandled};
}
