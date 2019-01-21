#include "start_request_manager.h"

// actor_model
#include "actor_model.h"

// utils
#include "filesystem.h"

// requests
#include "request_manager_actor.h"

#include <chrono>

using namespace ActorModel;

using namespace std::chrono_literals;

// ActorModel behaviours:
using Requests::request_manager_actor_behaviour;

auto start_request_manager(const Pid& sup_pid, const Message& message)
  -> ResultUnion
{
  // Spawn the RequestManager actor
  Pid request_manager_actor_pid;
  {
    // Spawn the RequestManager actor using the generated execution config
    request_manager_actor_pid = spawn_link(
      sup_pid,
      static_cast<ActorBehaviour>(request_manager_actor_behaviour),
      // Override the default execution config settings
      [](ProcessExecutionConfigBuilder& builder)
      {
        builder.add_task_stack_size(REQUESTS_REQUEST_MANAGER_TASK_STACK_SIZE);
        builder.add_mailbox_size(REQUESTS_REQUEST_MANAGER_MAILBOX_SIZE);
      }
    );
    register_name("request_manager", request_manager_actor_pid);
  }

  // Set CA certs for request_manager
  {
    // Set CA certs for *.googleapis.com
    auto WILDCARD_googleapis_com_root_cacert_der = filesystem_read(
      "/spiflash/WILDCARD_googleapis_com_root_cacert.der"
    );

    send(
      request_manager_actor_pid,
      "add_cacert_der",
      WILDCARD_googleapis_com_root_cacert_der
    );

    // Set CA certs for *.execute-api.us-west-2.amazonaws.com
    auto WILDCARD_execute_api_us_west_2_amazonaws_com_root_cacert_der = filesystem_read(
      "/spiflash/WILDCARD_execute_api_us_west_2_amazonaws_com_root_cacert.der"
    );

    send(
      request_manager_actor_pid,
      "add_cacert_der",
      WILDCARD_execute_api_us_west_2_amazonaws_com_root_cacert_der
    );
  }


  return {Result::Ok, request_manager_actor_pid};
}
