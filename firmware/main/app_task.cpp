#include "app_task.h"

#include <chrono>
#include <memory>
#include <string>

#include "actors.h"

#include "requests.h"
#include "actor_model.h"

#include "delay.h"
#include "http_utils.h"
#include "network.h"

#include "acm_helpers.h"

#include "embedded_files.h"

#include "request_manager_actor.h"

#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_log.h"

#include "trace.h"

#include "simple_match/simple_match.hpp"

#include <experimental/optional>

using namespace ActorModel;
using namespace Requests;

using namespace ACM;

using namespace std::chrono_literals;

using namespace simple_match;
using namespace simple_match::placeholders;

constexpr char TAG[] = "app_task";

using string_view = std::experimental::string_view;
using string = std::string;

using Timestamp = std::chrono::time_point<std::chrono::system_clock>;


auto app_task(void* /* user_data */)
  -> void
{
  string machine_id_str = CONFIG_PERMISSION_COLUMN_LABEL;

/*
  auto x = 2;
  match(x,
    1, []() {printf("The answer is one\n"); },
    2, []() {printf("The answer is two\n"); },
    _x < 10, [](auto&& a) {printf("The answer %d is less than 10\n", a); },
    10 < _x < 20,  [](auto&& a) {printf("The answer %d is between 10 and 20 exclusive\n", a); },
    _, []() {printf("Did not match\n"); }
  );
*/
  heap_check("app_task");
  //fmt::print("Don't {}\n", "panic");

  // Wait for valid network connection before making the connection
  wait_for_network(
    (NETWORK_IS_CONNECTED | NETWORK_TIME_AVAILABLE),
    portMAX_DELAY
  );
  ESP_LOGI(TAG, "Network online");

  // Spawn the RequestManager actor
  Pid request_manager_actor_pid;
  {
    // Spawn the RequestManager actor using the generated execution config
    request_manager_actor_pid = spawn(
      request_manager_behaviour,
      // Override the default execution config settings to increase task size
      [](ActorExecutionConfigBuilder& builder)
      {
        builder.add_task_stack_size(REQUESTS_REQUEST_MANAGER_TASK_STACK_SIZE);
      }
    );

    register_name("request_manager", request_manager_actor_pid);
  }

  // Parse requests from flatbuffers stored in ROM
  {
    auto display_actor_pid = spawn(display_actor_behaviour);
    register_name("display", display_actor_pid);
  }

  {
    auto reauth_actor_pid = spawn(reauth_actor_behaviour);
    register_name("reauth", reauth_actor_pid);
  }

  {
    auto google_sheets_actor_pid = spawn(google_sheets_actor_behaviour);
    register_name("google_sheets", google_sheets_actor_pid);
  }

  {
    auto permissions_check_actor_pid = spawn(
      permissions_check_actor_behaviour,
      // Override the default execution config settings to increase mailbox size
      [](ActorExecutionConfigBuilder& builder)
      {
        builder.add_mailbox_size(8192);
      }
    );
    register_name("permissions_check", permissions_check_actor_pid);
  }

  {
    auto rfid_reader_actor_pid = spawn(rfid_reader_actor_behaviour);
    register_name("rfid_reader", rfid_reader_actor_pid);
  }

  auto machine_actor_pid = spawn(
    [](const Pid& self, StatePtr& state, const Message& message)
      -> ResultUnion
    {
      return Ok;
    }
  );

  // Set CA certs for *.google.com
  send(
    request_manager_actor_pid,
    "add_cacert_der",
    embedded_files::WILDCARD_google_com_root_cacert_der
  );

  // Set CA certs for *.googleapis.com
  send(
    request_manager_actor_pid,
    "add_cacert_der",
    embedded_files::WILDCARD_googleapis_com_root_cacert_der
  );

  // Main loop:
  auto reauth_interval = 20min;
  auto network_check_interval = 10min;

  Timestamp last_reauth_timestamp;
  Timestamp last_network_check_timestamp;

  for (;;)
  {
    //heap_check("app_task loop");

    // Periodic polling loop, send interval-based messages here
    auto now = std::chrono::system_clock::now();

    // Trigger reauth if interval has elapsed
    if ((now - last_reauth_timestamp) > reauth_interval)
    {
      // Send the request intent message to the request manager actor
      auto reauth_actor_pid = *(whereis("reauth"));
      send(reauth_actor_pid, "reauth");
      last_reauth_timestamp = now;
    }

    // Trigger network check if interval has elapsed
    if ((now - last_network_check_timestamp) > network_check_interval)
    {
      printf("trigger network check here\n");
      // TODO: trigger network check
      last_network_check_timestamp = now;
    }

    // Only begin scan activity after initial setup is done
    if (ready_to_run)
    {
      auto rfid_reader_actor_pid = *(whereis("rfid_reader"));
      send(rfid_reader_actor_pid, "scan");
    }

    delay(100ms);
  }

  ESP_LOGI(TAG, "Complete, deleting task.");
  vTaskDelete(nullptr);
}
