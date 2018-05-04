#include "app_task.h"

#include <chrono>
#include <memory>
#include <string>

#include "requests.h"
#include "actor_model.h"
#include "googleapis.h"

#include "delay.h"
#include "http_utils.h"
#include "network.h"

#include "hid_global_reader.h"
#include "acm_helpers.h"

#include "embedded_files.h"

#include "request_manager_actor.h"

#include "gviz_generated.h"
#include "display_generated.h"

#include "flatbuffers/minireflect.h"
//#include "fmt/format.h"

#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_log.h"

#include "trace.h"

#include "simple_match/simple_match.hpp"

#include <experimental/optional>

#include "u8g2_esp32_hal.h"

using namespace ActorModel;
using namespace Requests;

using namespace ACM;
using namespace Display;
using namespace GViz;
using namespace googleapis;

using namespace std::chrono_literals;

using namespace simple_match;
using namespace simple_match::placeholders;

constexpr char TAG[] = "app_task";

using string_view = std::experimental::string_view;
using string = std::string;

using Timestamp = std::chrono::time_point<std::chrono::system_clock>;

struct DisplayActorState
{
  DisplayActorState()
  {
    u8g2_esp32_hal_t u8g2_esp32_hal = U8G2_ESP32_HAL_DEFAULT;
    u8g2_esp32_hal.sda = pin_sda;
    u8g2_esp32_hal.scl = pin_scl;
    u8g2_esp32_hal.reset = pin_reset;
    u8g2_esp32_hal_init(u8g2_esp32_hal);
    printf("sda = %d, scl = %d, reset = %d\n", pin_sda, pin_scl, pin_reset);

    // init u8g2 structure
    u8g2_Setup_ssd1306_128x32_univision_f(
      &u8g2,
      U8G2_R0,
      //u8x8_byte_sw_i2c,
      u8g2_esp32_msg_i2c_cb,
      u8g2_esp32_msg_i2c_and_delay_cb
    );
    u8x8_SetI2CAddress(&u8g2.u8x8,0x78);

    u8g2_InitDisplay(&u8g2); // send init sequence to the display, display is in sleep mode after this,

    u8g2_SetPowerSave(&u8g2, 0); // wake up display

    // Send an initial blank frame
    u8g2_ClearBuffer(&u8g2);

    // Send the buffer to the display
    u8g2_SendBuffer(&u8g2);
  }

  gpio_num_t pin_sda = static_cast<gpio_num_t>(4);
  gpio_num_t pin_scl = static_cast<gpio_num_t>(15);
  gpio_num_t pin_reset = static_cast<gpio_num_t>(16);
  u8g2_t u8g2;
};

auto app_task(void* /* user_data */)
  -> void
{
  string machine_id_str = CONFIG_PERMISSION_COLUMN_LABEL;

  WiegandReader::Config config{
    .data0_pin = 32,
    .data1_pin = 33,
    .hold_pin = 22,
    .red_led_pin = 17,
    .green_led_pin = 15,
    .beeper_pin = 23
  };

  HIDGlobalReader reader{config};
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
  const auto permissions_check_request_intent = parse_request_intent(
    embedded_files::permissions_check_request_intent_req_fb
  );

  const auto activity_request_intent = parse_request_intent(
    embedded_files::activity_request_intent_req_fb
  );

  const auto log_request_intent = parse_request_intent(
    embedded_files::log_request_intent_req_fb
  );

  const auto reauth_request_intent = parse_request_intent(
    embedded_files::reauth_request_intent_req_fb
  );

  string permissions_check_query_mutable_str;
  permissions_check_query_mutable_str.assign(
    embedded_files::permissions_check_query_gviz_fb.begin(),
    embedded_files::permissions_check_query_gviz_fb.end()
  );
  auto permissions_check_query = GetMutableQuery(
    const_cast<char*>(permissions_check_query_mutable_str.data())
  );

  auto ready_to_run = false;
  auto did_notify_reboot = false;

  flatbuffers::DetachedBuffer current_user_flatbuf;

  Pid main_actor_pid = spawn(
    [
      machine_id_str,
      &current_user_flatbuf,
      &permissions_check_request_intent,
      &permissions_check_query,
      &ready_to_run,
      &did_notify_reboot,
      &activity_request_intent,
      &log_request_intent,
      &reauth_request_intent
    ]
    (const Pid& self, StatePtr& state, const Message& message)
      -> ResultUnion
    {
      auto request_manager_actor_pid = *(whereis("request_manager"));
      auto display_actor_pid = *(whereis("display"));

      ResponseT response;
      if (matches(message, "chunk", response))
      {
        printf("received chunk\n");
        const auto& request_id = response.request_id;

        if (compare_uuids(request_id, permissions_check_request_intent->id))
        {
          printf("received chunk from gviz\n");
          const Datatable* datatable = flatbuffers::GetRoot<Datatable>(
            response.body.data()
          );

          if (not ready_to_run)
          {
            auto did_update_all_ids = update_query_columns(
              datatable->cols(),
              permissions_check_query
            );
            if (did_update_all_ids)
            {
              ready_to_run = true;
            }
            else {
              ESP_LOGE(TAG, "Could not update all column IDs for query");
            }
          }

          if (
            ready_to_run
            and datatable
            and datatable->rows()
            and (datatable->rows()->Length() > 0)
          )
          {
            // Generate a User from the query results
            current_user_flatbuf = generate_user_from_query_results(
              permissions_check_query,
              datatable
            );
            printf("Updated logged in user\n");
          }
        }
        else if (compare_uuids(request_id, reauth_request_intent->id))
        {
          printf("received access_token from reauth\n");

          // Use access_token to auth spreadsheet Users query request
          set_query_arg(
            permissions_check_request_intent->request->query,
            "access_token",
            response.body
          );

          // Use access_token to auth spreadsheet Activity insert request
          set_header(
            activity_request_intent->request->headers,
            "Authorization",
            string{"Bearer "} + response.body
          );

          // Use access_token to auth spreadsheet Log insert request
          set_header(
            log_request_intent->request->headers,
            "Authorization",
            string{"Bearer "} + response.body
          );

          if (not ready_to_run)
          {
            // Send the request intent message to the request manager actor
            send_request(
              request_manager_actor_pid,
              *(permissions_check_request_intent)
            );
          }
        }
        else {
          printf("received chunk from unknown request id\n");
        }

        if (response.code < 400)
        {
          ESP_LOGI("main_actor", "got chunk (%d): '%.*s'\n", response.code, response.body.size(), &response.body[0]);
        }
        else {
          ESP_LOGE("main_actor", "got chunk (%d): '%.*s'\n", response.code, response.body.size(), &response.body[0]);
        }
      }

      else if (matches(message, "complete", response))
      {
        const auto& request_id = response.request_id;
        if (compare_uuids(request_id, permissions_check_request_intent->id))
        {
          printf("permissions check complete\n");
          if (ready_to_run)
          {
            if (current_user_flatbuf.size() > 0)
            {
              const User* current_user = flatbuffers::GetRoot<User>(
                current_user_flatbuf.data()
              );

              // Show user details on OLED display
              auto show_user_details_display_intent_flatbuf = (
                generate_show_user_details_from_user(current_user)
              );

              send(
                display_actor_pid,
                "ShowUserDetails",
                show_user_details_display_intent_flatbuf
              );

              // Send Signed_In activity
              activity_request_intent->request->body = (
                generate_activity_json(
                  machine_id_str,
                  ActivityType::Signed_In,
                  current_user
                )
              );

              send_request(
                request_manager_actor_pid,
                *(activity_request_intent)
              );
            }
            else {
              ESP_LOGW("main_actor", "Missing user before generating Activity request");
            }
          }
          else {
            ESP_LOGE("main_actor", "Not all columns updated before generating Activity request");
            //throw std::runtime_error("Not all columns updated before generating Activity request");
          }
        }

        else if (compare_uuids(request_id, activity_request_intent->id))
        {
          printf("did post activity\n");
        }

        else if (compare_uuids(request_id, reauth_request_intent->id))
        {
          if (not did_notify_reboot)
          {
            // Send activity request
            log_request_intent->request->body = (
              generate_log_json(
                machine_id_str,
                LogSeverity::Notice,
                "Reboot"
              )
            );

            send_request(
              request_manager_actor_pid,
              *(log_request_intent)
            );

            did_notify_reboot = true;
          }
        }

        ESP_LOGI("main_actor", "got body (%d): '%.*s'\n", response.code, response.body.size(), &response.body[0]);
      }

      else if (matches(message, "error", response))
      {
        const auto& request_id = response.request_id;
        if (compare_uuids(request_id, permissions_check_request_intent->id))
        {
          if (response.code == 401)
          {
            printf("send reauth request here\n");

            // Send the request intent message to the request manager actor
            send_request(
              request_manager_actor_pid,
              *(reauth_request_intent)
            );
          }
        }

        if (response.code < 0)
        {
          ESP_LOGE("main_actor", "Fatal error (%d): '%.*s'\n", response.code, response.body.size(), &response.body[0]);
          throw std::runtime_error("Fatal error");
        }
        ESP_LOGE("main_actor", "got error (%d): '%.*s'\n", response.code, response.body.size(), &response.body[0]);
      }

      return Ok;
    },
    // Override the default execution config settings to increase mailbox size
    [](ActorExecutionConfigBuilder& builder)
    {
      builder.add_mailbox_size(8192);
    }
  );

  auto display_actor_pid = spawn(
    [](const Pid& self, StatePtr& _state, const Message& message)
      -> ResultUnion
    {
      if (not _state)
      {
        _state = std::make_shared<DisplayActorState>();
      }

      auto& state = *(std::static_pointer_cast<DisplayActorState>(_state));
      auto& u8g2 = state.u8g2;

      if (message.type()->str() == "ClearDisplay")
      {
        // Clear the buffer
        u8g2_ClearBuffer(&u8g2);

        // Send the buffer to the display
        u8g2_SendBuffer(&u8g2);
      }

      const DisplayIntent* display_intent;
      if (matches(message, "ShowUserDetails", display_intent))
      {
        switch (display_intent->action_type())
        {
          case DisplayAction::ShowUserDetails:
          {
            const auto* show_user_details_action = (
              display_intent->action_as_ShowUserDetails()
            );
            const auto& name = show_user_details_action->name();
            const auto& email = show_user_details_action->email();
            const auto& makerlabs_id = show_user_details_action->makerlabs_id();

            // Draw line1: Full Name
            if (name)
            {
              u8g2_SetFont(&u8g2, u8g2_font_helvR10_tr);
              u8g2_DrawStr(&u8g2, 0, 13, name->str().c_str());
            }

            // Draw line2: 1.2s
            if (email)
            {
              u8g2_SetFont(&u8g2, u8g2_font_helvB14_tr);
              //u8g2_DrawStr(&u8g2, 0, 31, duration_str);
              //u8g2_DrawStr(&u8g2, 0, 31, email->c_str());
              u8g2_DrawStr(&u8g2, 0, 31, makerlabs_id->c_str());
            }

            // Send the buffer to the display
            u8g2_SendBuffer(&u8g2);

            break;
          }

          default:
            break;
        }
      }
      return Ok;
    }
  );

  register_name("display", display_actor_pid);

/*
  auto reader_actor_pid = spawn(
    [](const Pid& self, StatePtr& state, const Message& message)
      -> ResultUnion
    {
      return Ok;
    }
  );

  auto machine_actor_pid = spawn(
    [](const Pid& self, StatePtr& state, const Message& message)
      -> ResultUnion
    {
      return Ok;
    }
  );
*/
  // Set the destination Pid for response messages
  update_uuid(reauth_request_intent->to_pid, main_actor_pid);
  update_uuid(activity_request_intent->to_pid, main_actor_pid);
  update_uuid(permissions_check_request_intent->to_pid, main_actor_pid);

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

  HIDGlobalReader::MaybeTagId scanned_tag_prev;

  for (;;)
  {
    //heap_check("app_task loop");

    // Periodic polling loop, send interval-based messages here
    auto now = std::chrono::system_clock::now();

    // Trigger reauth if interval has elapsed
    if ((now - last_reauth_timestamp) > reauth_interval)
    {
      // Send the request intent message to the request manager actor
      send_request(
        request_manager_actor_pid,
        *(reauth_request_intent)
      );

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
      //const auto scanned_tag = reader.scan_tag();
      const auto scanned_tag = reader.last_scanned_tag;

      if (scanned_tag != scanned_tag_prev)
      {
        if (scanned_tag)
        {
          printf(
            "found tag, facility_code = %i, card_number = %i\n",
            scanned_tag->facility_code,
            scanned_tag->card_number
          );

          reader.beep(300ms);

          auto tag_id_str = std::to_string(scanned_tag->card_number);
          auto query_str = generate_permissions_check_query_string(
            permissions_check_query,
            tag_id_str
          );

          // Set the 'tq' query arg
          set_query_arg(
            permissions_check_request_intent->request->query,
            "tq",
            query_str
          );

          // Send the request intent message to the request manager actor
          send_request(
            request_manager_actor_pid,
            *(permissions_check_request_intent)
          );
        }
        else {
          printf("lost tag\n");

          reader.beep(150ms);

          // Clear the 'tq' query arg
          // Do not allow (possible, future) bugs to affect this user
          set_query_arg(
            permissions_check_request_intent->request->query,
            "tq",
            ""
          );

          // Send a Signed_Out activity message
          if (current_user_flatbuf.size() > 0)
          {
            const User* current_user = flatbuffers::GetRoot<User>(
              current_user_flatbuf.data()
            );
            activity_request_intent->request->body = (
              generate_activity_json(
                machine_id_str,
                ActivityType::Signed_Out,
                current_user
              )
            );

            // Reset stored current_user
            //current_user_flatbuf.reset();
            current_user_flatbuf = flatbuffers::DetachedBuffer{};

            send_request(
              request_manager_actor_pid,
              *(activity_request_intent)
            );
          }

          send(
            display_actor_pid,
            "ClearDisplay"
          );
        }

        scanned_tag_prev = scanned_tag;
      }
    }

    delay(100ms);
  }

  ESP_LOGI(TAG, "Complete, deleting task.");
  vTaskDelete(nullptr);
}
