#include "start_app.h"

#include "acm_helpers.h"
#include "actors.h"
#include "display_generated.h"

#include "start_request_manager.h"

// actor_model
#include "actor_model.h"
#include "supervisor_actor_behaviour.h"

// utils
#include "delay.h"
#include "filesystem.h"

// firmware_update
#include "firmware_update.h"
#include "firmware_update_actor.h"

// network_manager
#include "network_check_actor.h"
#include "network_manager.h"
#include "ntp.h"
#include "ntp_actor.h"
#include "wifi_actor.h"

// requests
#include "requests.h"

#include <chrono>
#include <memory>
#include <string>

#include "esp_log.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"

#include "trace.h"

using Requests::set_request_body;

// ActorModel behaviours:
using NetworkManager::network_check_actor_behaviour;
using NetworkManager::ntp_actor_behaviour;
using NetworkManager::wifi_actor_behaviour;
using FirmwareUpdate::firmware_update_actor_behaviour;

using string_view = std::experimental::string_view;
using string = std::string;

using Timestamp = std::chrono::time_point<std::chrono::system_clock>;
using FirmwareUpdate::get_current_firmware_version;

using namespace Display;
using namespace ModuleManager;
using namespace NetworkManager;

using namespace std::chrono_literals;

constexpr char TAG[] = "start_app";

auto start_app()
  -> bool
{
  printf("S/W Version Number: %lld\n", get_current_firmware_version());
  string machine_id_str = CONFIG_ACM_PERMISSION_COLUMN_LABEL;
/*
  // Check boot state of GPIO5 (pull-down -> reset to factory immediately)
  uint32_t strapping_pins = REG_READ(GPIO_STRAP_REG);
  bool factory_reset_requested = ((strapping_pins & 1) == 0);
  if (factory_reset_requested)
  {
    // Check if we are already running from factory partition
    auto current_partition = get_current_partition();
    auto factory_partition = get_factory_partition();

    if (not compare_partitions(current_partition, factory_partition))
    {
      ESP_LOGW(TAG, "Trigger factory reset");
      factory_reset();
    }
    else {
      ESP_LOGW(TAG, "Factory reset request ignored, already running factory!");
    }
  }
*/
  heap_check("start_app");

  // Single actor with multiple behaviours combined sharing the same task
  Pid app_actor_pid = UUID::NullUUID;
  {
    auto combined_actor_pid = spawn(
      {
        auth_actor_behaviour,
        rfid_reader_actor_behaviour,
        app_actor_behaviour,
        machine_actor_behaviour,
        ntp_actor_behaviour,
        wifi_actor_behaviour,
        network_check_actor_behaviour,
      },
      // Override the default execution config settings to increase mailbox size
      [](ProcessExecutionConfigBuilder& builder)
      {
        builder.add_task_stack_size(4096);
        builder.add_mailbox_size(4096);
      }
    );

    // app features
    register_name("auth", combined_actor_pid);
    register_name("rfid_reader", combined_actor_pid);
    register_name("machine", combined_actor_pid);
    register_name("app", combined_actor_pid);

    // network_manager features
    register_name("network_manager", combined_actor_pid);
    register_name("ntp", combined_actor_pid);
    register_name("wifi", combined_actor_pid);
    register_name("network_check", combined_actor_pid);

    app_actor_pid = combined_actor_pid;
  }

  // DisplayActor
  {
    auto display_actor_pid = spawn(
      static_cast<ActorBehaviour>(display_actor_behaviour),
      // Override the default execution config settings
      [](ProcessExecutionConfigBuilder& builder)
      {
        builder.add_task_stack_size(4096);
      }
    );
    register_name("display", display_actor_pid);

    // Show version details on OLED display
    flatbuffers::FlatBufferBuilder fbb;

    auto version_str = string(
      "v" + std::to_string(get_current_firmware_version())
    );

    const auto& version_fbstr = fbb.CreateString(version_str);
    auto display_loc = CreateShowUserDetails(
      fbb,
      fbb.CreateString("MakerLabs ACM"),
      version_fbstr,
      version_fbstr,
      version_fbstr
    );

    fbb.Finish(
      CreateDisplayIntent(
        fbb,
        DisplayAction::ShowUserDetails,
        display_loc.Union()
      ),
      DisplayIntentIdentifier()
    );

    send(
      display_actor_pid,
      "ShowUserDetails",
      fbb.Release()
    );
  }

  {
    // Register module(s)
    ModuleFlatbuffer mod1_flatbuf;

    flatbuffers::FlatBufferBuilder fbb;

    std::vector<flatbuffers::Offset<Function>> exports;
    exports.push_back(
      CreateFunctionDirect(
        fbb,
        "start_request_manager",
        reinterpret_cast<uint64_t>(&start_request_manager)
      )
    );

    fbb.Finish(
      CreateModuleDirect(fbb, "mod1", &(exports), "/spiflash/mod1.elf")
    );

    module(
      string_view{
        reinterpret_cast<const char*>(fbb.GetBufferPointer()),
        fbb.GetSize()
      }
    );
  }

  // Supervisor
  {
    auto supervisor_pid = spawn_link(
      app_actor_pid,
      static_cast<ActorBehaviour>(supervisor_actor_behaviour),
      // Override the default execution config settings
      [](ProcessExecutionConfigBuilder& builder)
      {
        builder.add_task_stack_size(4096);
      }
    );
    register_name("supervisor", supervisor_pid);

    flatbuffers::FlatBufferBuilder fbb;

    const auto id = "request_manager";

    flatbuffers::FlatBufferBuilder args_fbb;

    std::vector<uint8_t> payload{};
    args_fbb.Finish(
      CreateMessageDirect(args_fbb, "init", 0, nullptr, 1, &(payload))
    );

    std::vector<uint8_t> args{
      args_fbb.GetBufferPointer(),
      args_fbb.GetBufferPointer() + args_fbb.GetSize()
    };
    auto start = CreateMFADirect(fbb, "mod1", "start_request_manager", &(args));

    auto shutdown_milliseconds = 5000;

    std::vector<flatbuffers::Offset<Module>> modules;
    modules.push_back(
      CreateModule(
        fbb
      )
    );

    std::vector<flatbuffers::Offset<ChildSpec>> child_specs;
    child_specs.push_back(
      CreateChildSpecDirect(
        fbb,
        id,
        start,
        ChildSpecRestartFlag::permanent,
        shutdown_milliseconds,
        ChildSpecTypeFlag::worker,
        &(modules)
      )
    );

    fbb.Finish(
      CreateSupervisorArgsDirect(fbb, &(child_specs)),
      MessageIdentifier()
    );

    send(
      supervisor_pid,
      "init",
      fbb.Release()
    );
  }

  // FirmwareUpdateActor
  {
    auto firmware_update_actor_pid = spawn(
      static_cast<ActorBehaviour>(firmware_update_actor_behaviour),
      // Override the default execution config settings
      [](ProcessExecutionConfigBuilder& builder)
      {
        builder.add_task_stack_size(FIRMWARE_UPDATE_ACTOR_TASK_STACK_SIZE);
        builder.add_mailbox_size(FIRMWARE_UPDATE_ACTOR_MAILBOX_SIZE);
      }
    );
    register_name("firmware_update", firmware_update_actor_pid);
  }
  heap_check("after firmware_update");

  //heap_check("after spawn all actors");
  // Send periodic heap check message
  {
    auto heap_check_interval = 30s;
    auto app_actor_pid = *(whereis("app"));

    // Schedule periodic ping requests (re-using previous metadata)
    send_interval(heap_check_interval, app_actor_pid, "heap_check");
  }

  // Start Wifi in STA mode
  {
    auto network_manager_actor_pid = *(whereis("network_manager"));
    send(network_manager_actor_pid, "connect_wifi_sta");
  }

  // Wait for valid network connection before starting services
  NetworkManager::wait_for_network(
    NetworkManager::NETWORK_IS_CONNECTED,
    portMAX_DELAY
  );
  ESP_LOGI(TAG, "Network online");

  // Send periodic network_check ping message
  {
    auto network_check_interval = 10min;
    auto network_check_actor_pid = *(whereis("network_check"));

    // Send an initial full ping request
    send(network_check_actor_pid, "ping");
    // Schedule periodic ping requests (re-using previous metadata)
    send_interval(network_check_interval, network_check_actor_pid, "ping");
  }

  // Fetch time via NTP
  {
    auto network_manager_actor_pid = *(whereis("network_manager"));
    flatbuffers::FlatBufferBuilder fbb;
    fbb.Finish(
      CreateNTPConfiguration(fbb, fbb.CreateString("pool.ntp.org"))//,
      //DisplayIntentIdentifier()
    );
    send(network_manager_actor_pid, "ntp_client_start", fbb.Release());
  }

  // Wait for valid network connection and NTP time before continuing
  NetworkManager::wait_for_network(
    (NetworkManager::NETWORK_IS_CONNECTED | NetworkManager::NETWORK_TIME_AVAILABLE),
    portMAX_DELAY
  );

  // Print current NTP time
  {
    // UTC Time
    auto now = std::time(nullptr);
    auto* timeinfo = std::gmtime(&now);
    auto utc_now_str = NetworkManager::format_time(timeinfo, "%c");
    printf("UTC:   %s\n", utc_now_str.c_str());

    // 2017c, America/Vancouver
    auto tz = Posix::time_zone{"PST8PDT,M3.2.0,M11.1.0"};
    auto local_now = NetworkManager::TimeZone{tz, std::chrono::system_clock::now()};
    auto local_now_str = NetworkManager::format_time(local_now, "%c");
    printf("local:   %s\n", local_now_str.c_str());
  }

  // Send periodic auth message
  {
    auto auth_interval = 20min;
    auto auth_request_intent_req_fb = filesystem_read(
      "/spiflash/auth_request_intent.req.fb"
    );

    set_request_body(
      auth_request_intent_req_fb ,
      "grant_type="     "refresh_token" "&"
      "client_id="      CONFIG_ACM_OAUTH_CLIENT_ID "&"
      "client_secret="  CONFIG_ACM_OAUTH_CLIENT_SECRET "&"
      "refresh_token="  CONFIG_ACM_OAUTH_REFRESH_TOKEN
    );

    auto auth_actor_pid = *(whereis("auth"));

    // Send an initial full auth request intent
    send(auth_actor_pid, "auth", auth_request_intent_req_fb);
    // Schedule periodic auth requests (re-using previous metadata)
    send_interval(auth_interval, auth_actor_pid, "auth");
  }

  // Send periodic firmware_update check message
  {
    auto firmware_update_check_interval = std::chrono::seconds(
      CONFIG_FIRMWARE_UPDATE_CHECK_INTERVAL_SECONDS
    );
    auto firmware_update_check_request_intent_req_fb = filesystem_read(
      "/spiflash/firmware_update_check_request_intent.req.fb"
    );

    auto firmware_update_actor_pid = *(whereis("firmware_update"));

    // Send an initial full firmware update check request intent
    send(
      firmware_update_actor_pid,
      "check",
      firmware_update_check_request_intent_req_fb
    );

    // Schedule periodic firmware update checks (re-using previous metadata)
    send_interval(
      firmware_update_check_interval,
      firmware_update_actor_pid,
      "check"
    );

    //TODO: this should be interrupt, timer, cancellation driven
    // Schedule periodic reset button checks
    auto reset_button_check_interval = 1s;
    send_interval(
      reset_button_check_interval,
      firmware_update_actor_pid,
      "check_reset_pressed"
    );
  }

  return true;
}
