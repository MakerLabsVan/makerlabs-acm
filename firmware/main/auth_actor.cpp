#include "actors.h"

#include "requests.h"

#include <chrono>
#include <experimental/string_view>
#include <string>

#include "esp_log.h"

using namespace ActorModel;
using namespace Requests;

using namespace std::chrono_literals;

constexpr char TAG[] = "auth_actor";

using string = std::string;
using string_view = std::experimental::string_view;

struct AuthActorState
{
  AuthActorState()
  {
  }

  MutableRequestIntentFlatbuffer auth_request_intent_mutable_buf;
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
    const Response* response = nullptr;
    auto auth_request_intent_id = get_request_intent_id(
      state.auth_request_intent_mutable_buf
    );
    if (matches(message, "response_chunk", response, auth_request_intent_id))
    {
      if (response->code() < 400)
      {
        auto access_token_str = string_view{
          reinterpret_cast<const char*>(response->body()->data()),
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
    const Response* response = nullptr;
    auto auth_request_intent_id = get_request_intent_id(
      state.auth_request_intent_mutable_buf
    );
    if (matches(message, "response_finished", response, auth_request_intent_id))
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
          state.auth_request_intent_mutable_buf
        );
      }
      return {Result::Ok};
    }
  }

  {
    const Response* response = nullptr;
    auto auth_request_intent_id = get_request_intent_id(
      state.auth_request_intent_mutable_buf
    );
    if (matches(message, "response_error", response, auth_request_intent_id))
    {
      if (response->code() < 0)
      {
        ESP_LOGE(
          TAG,
          "Internal error, re-queueing (%d): '%.*s'\n",
          response->code(),
          response->body()->size(),
          response->body()->data()
        );
        send_after(100ms, self, "auth");
      }
      else {
        ESP_LOGE(
          TAG,
          "Response error (%d): '%.*s'\n",
          response->code(),
          response->body()->size(),
          response->body()->data()
        );
      }

      return {Result::Ok};
    }
  }

  {
    if (matches(message, "auth"))
    {
      const auto auth_request_intent = string_view(
        reinterpret_cast<const char*>(message.payload()->data()),
        message.payload()->size()
      );
      if (not auth_request_intent.empty())
      {
        // Parse (& copy) the firmware update check request intent flatbuffer
        state.auth_request_intent_mutable_buf = parse_request_intent(
          auth_request_intent,
          self
        );
      }

      if (not state.auth_request_intent_mutable_buf.empty())
      {
        // Send the request intent message to the request manager actor
        auto request_manager_actor_pid = *(whereis("request_manager"));
        send(
          request_manager_actor_pid,
          "request",
          state.auth_request_intent_mutable_buf
        );
      }

      return {Result::Ok};
    }
  }

  return {Result::Unhandled};
}
