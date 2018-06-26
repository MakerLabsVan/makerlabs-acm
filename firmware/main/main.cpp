#include "network_manager.h"

#include "freertos/FreeRTOS.h"
#include "freertos/event_groups.h"
#include "freertos/queue.h"
#include "freertos/task.h"

#include "esp_event_loop.h"
#include "esp_log.h"
#include "esp_vfs.h"
#include "esp_vfs_fat.h"
#include "nvs_flash.h"
#include "tcpip_adapter.h"

#include "app_task.h"

extern EventGroupHandle_t network_event_group;

extern "C" {
RTC_DATA_ATTR static int boot_count = 0;
}

// Handle of the wear levelling library instance
static wl_handle_t s_wl_handle = WL_INVALID_HANDLE;

constexpr char TAG[] = "main";

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
    ESP_LOGW(TAG, "Invalid NVS size encountered, wiping and re-initializing");
    // Wipe and re-initialize NVS partition
    ESP_ERROR_CHECK(nvs_flash_erase());
    err = nvs_flash_init();
  }
  ESP_ERROR_CHECK(err);

  ESP_LOGI(TAG, "Mounting FAT filesystem");
  const esp_vfs_fat_mount_config_t mount_config = {
    format_if_mount_failed: true,
    max_files: 4,
    allocation_unit_size: CONFIG_WL_SECTOR_SIZE,
  };
  auto ret = esp_vfs_fat_spiflash_mount(
    "/spiflash",
    "storage",
    &mount_config,
    &s_wl_handle
  );
  if (err == ESP_OK)
  {
    ESP_LOGI(TAG, "Successfully mounted FAT filesystem");
  }
  else {
    ESP_LOGE(TAG, "Failed to mount FAT filesystem (%s)", esp_err_to_name(err));
  }

  // Setup the TCP/IP adapter
  tcpip_adapter_init();

  // Create the shared network status event group
  network_event_group = xEventGroupCreate();

  // Create the event loop
  ret = esp_event_loop_init(NetworkManager::event_handler, nullptr);
  if (ret != ESP_OK)
  {
    ESP_LOGE(TAG, "Could not set event loop callback");
  }

  xTaskCreate(&app_task, "app_task", 4096, nullptr, 5, nullptr);

  // Main task can complete as soon as other tasks have been started
  ESP_LOGI(TAG, "Complete, deleting task.");
  vTaskDelete(nullptr);
}
