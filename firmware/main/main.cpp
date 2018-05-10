#include "freertos/FreeRTOS.h"
#include "freertos/event_groups.h"
#include "freertos/queue.h"
#include "freertos/task.h"

#include "esp_log.h"
#include "nvs_flash.h"

//#include "module_task.h"
#include "wifi_task.h"
//#include "network_check_task.h"
#include "ntp_task.h"
//#include "firmware_update_task.h"

#include "app_task.h"

extern EventGroupHandle_t network_event_group;

extern "C" {
RTC_DATA_ATTR static int boot_count = 0;
}

constexpr char TAG[] = "app_main";

#ifdef __cplusplus
extern "C"
#endif // __cplusplus
void
app_main()
{
  // Print and increment the boot count (from persistent RTC memory)
  ESP_LOGI(TAG, "Boot #: %d", boot_count);
  ++boot_count;

  // Initialize the NVS
  esp_err_t err = nvs_flash_init();

  // Check if NVS cached size is invalid/resized
  if (err == ESP_ERR_NVS_NO_FREE_PAGES)
  {
    // Wipe and re-initialize NVS partition
    ESP_ERROR_CHECK(nvs_flash_erase());
    err = nvs_flash_init();
  }
  ESP_ERROR_CHECK(err);

  // Create the shared network status event group
  network_event_group = xEventGroupCreate();

  // Create the initial tasks
  xTaskCreate(&wifi_task, "wifi_task", 4096, nullptr, 5, nullptr);
  //xTaskCreate(&network_check_task, "network_check_task", 4096, nullptr, 5, nullptr);
  xTaskCreate(&ntp_task, "ntp_task", 4096, nullptr, 5, nullptr);

  xTaskCreate(&app_task, "app_task", 4096, nullptr, 5, nullptr);

  // Main task can complete as soon as other tasks have been started
  ESP_LOGI(TAG, "Complete, deleting task.");
  vTaskDelete(nullptr);
}
