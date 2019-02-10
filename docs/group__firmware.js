var group__firmware =
[
    [ "HIDGlobalReader", "class_h_i_d_global_reader.html", [
      [ "MaybeTagId", "class_h_i_d_global_reader.html#af8c721746a1b6a26db972015e56f4bf3", null ],
      [ "ScanState", "class_h_i_d_global_reader.html#ac7982de634512494cfc25d04d2633b45", [
        [ "IsScanningHold", "class_h_i_d_global_reader.html#ac7982de634512494cfc25d04d2633b45a1e095411c02a273604c0ce4190f36b1a", null ],
        [ "IsScanningTag", "class_h_i_d_global_reader.html#ac7982de634512494cfc25d04d2633b45aa766db4fe7f694ad316830a1ffe731fa", null ],
        [ "IsScanningComplete", "class_h_i_d_global_reader.html#ac7982de634512494cfc25d04d2633b45abd6b2272b57a4a2e7f39546bb6be27bb", null ]
      ] ],
      [ "HIDGlobalReader", "group__firmware.html#ga30a69ce847d3c189237930e9fc37961a", null ],
      [ "beep", "group__firmware.html#gaf1f8892fc6a2558575889ff5e3cefb47", null ],
      [ "scan_tag", "group__firmware.html#gaf67b0ae8d9de234274d986231d496bf5", null ],
      [ "scanning_fsm", "group__firmware.html#ga02c79a6d3862e8987d412c545f5523a3", null ],
      [ "last_scanned_tag", "class_h_i_d_global_reader.html#a778e732b9e037355cd1eff73a0ee7970", null ],
      [ "scan_state", "class_h_i_d_global_reader.html#ac31b6e36a34c1fe2521ce82978aef9eb", null ]
    ] ],
    [ "HIDGlobalTagID", "struct_h_i_d_global_tag_i_d.html", [
      [ "ParityView", "struct_h_i_d_global_tag_i_d_1_1_parity_view.html", [
        [ "leading_bits", "struct_h_i_d_global_tag_i_d_1_1_parity_view.html#a680e3e0ac137ba8a53153f624516bf03", null ],
        [ "trailing_bits", "struct_h_i_d_global_tag_i_d_1_1_parity_view.html#af7547a7a3ae7363e4cf9d1e9c70b1776", null ]
      ] ],
      [ "TagFormatView", "struct_h_i_d_global_tag_i_d_1_1_tag_format_view.html", [
        [ "card_number", "struct_h_i_d_global_tag_i_d_1_1_tag_format_view.html#acd601964f9664ddfec64f974008e5214", null ],
        [ "facility_code", "struct_h_i_d_global_tag_i_d_1_1_tag_format_view.html#aa4a3d68ddddcebeda4b303792baefe3d", null ],
        [ "leading_parity_bit", "struct_h_i_d_global_tag_i_d_1_1_tag_format_view.html#ae2a02e118b8581138d493d4c23478708", null ],
        [ "trailing_parity_bit", "struct_h_i_d_global_tag_i_d_1_1_tag_format_view.html#a0b8dcfc5774b537041abc01afab20850", null ]
      ] ],
      [ "HIDGlobalTagID", "group__firmware.html#gab400d17630e9fdd4321eae457c41b5c9", null ],
      [ "card_number", "struct_h_i_d_global_tag_i_d.html#a7dc6d1ddc0c65583ee29de622b7c0a13", null ],
      [ "facility_code", "struct_h_i_d_global_tag_i_d.html#af759c14a71f7f6ee9d3acc8bfd457d0d", null ],
      [ "valid", "struct_h_i_d_global_tag_i_d.html#a04d90f12904cb68d74d5df21ada81063", null ]
    ] ],
    [ "TagRead", "struct_tag_read.html", [
      [ "tag_id", "struct_tag_read.html#af45f3bd589ce94478b0cb6558839bf71", null ],
      [ "timestamp", "struct_tag_read.html#a8f0067092c8b347407d3a964655084cc", null ]
    ] ],
    [ "WiegandReader", "class_wiegand_reader.html", [
      [ "CallbackInfo", "struct_wiegand_reader_1_1_callback_info.html", [
        [ "is_data1", "struct_wiegand_reader_1_1_callback_info.html#ae08de32beada0ae538bd7031338da85b", null ],
        [ "state", "struct_wiegand_reader_1_1_callback_info.html#a75416bd36787956b01d23881c358a25c", null ]
      ] ],
      [ "Config", "struct_wiegand_reader_1_1_config.html", [
        [ "beeper_pin", "struct_wiegand_reader_1_1_config.html#acbb11350459095f7dcc3f163dace6fcd", null ],
        [ "data0_pin", "struct_wiegand_reader_1_1_config.html#af86702a3379cbde76d8ad5dab191bdf0", null ],
        [ "data1_pin", "struct_wiegand_reader_1_1_config.html#a71f2ec4c20742e62b31511470acba7fb", null ],
        [ "green_led_pin", "struct_wiegand_reader_1_1_config.html#ac14564ca1c3d9485b7b506d5fd485417", null ],
        [ "hold_pin", "struct_wiegand_reader_1_1_config.html#a8118514b818ae6ea5e758baee3850741", null ],
        [ "red_led_pin", "struct_wiegand_reader_1_1_config.html#a04aba5e03037d21b03ec2c5f19b9911b", null ]
      ] ],
      [ "State", "struct_wiegand_reader_1_1_state.html", [
        [ "current_bit", "struct_wiegand_reader_1_1_state.html#a0b0bd7c25db3ad050306c6e984188138", null ],
        [ "current_tag_bits", "struct_wiegand_reader_1_1_state.html#a7c11531dd7b9d0fb448a69610f5fe719", null ],
        [ "last_bit_timestamp", "struct_wiegand_reader_1_1_state.html#a52e623a35c1689f1cfa379a7a74aac05", null ]
      ] ],
      [ "TagReadEvent", "class_wiegand_reader.html#aa47c8dfc3ee2b1726b142f7b866e2b2b", null ],
      [ "WiegandReader", "group__firmware.html#gaddfbeb16233008116c9b381190cbe2e1", null ],
      [ "get_current_tag", "group__firmware.html#ga73ff7ccf542e664f378ea981a1091404", null ],
      [ "set_beeper", "group__firmware.html#ga168595d2dc727539a923dba406f13f28", null ],
      [ "set_green_led", "group__firmware.html#gaa196b54b0638a3b316d046faa7ef8cd6", null ],
      [ "set_hold", "group__firmware.html#gab6adc1acb7608f0094c67367b75d13b5", null ],
      [ "set_red_led", "group__firmware.html#gac9d36939697619513b5d424e4f5e360e", null ],
      [ "state", "class_wiegand_reader.html#a1b3e7a8ac52a9139d38e4b194528d285", null ]
    ] ],
    [ "AppActorState", "struct_app_actor_state.html", [
      [ "InProgressRequestPayload", "struct_app_actor_state.html#abd3db5e16b162bf74e822e34a209dba1", null ],
      [ "InProgressRequestPayloadList", "struct_app_actor_state.html#ae0904bc00ff0647a9f88b6791a5ba2a5", null ],
      [ "AppActorState", "struct_app_actor_state.html#a015d047ce46fa5bac59a7e80754c0f53", null ],
      [ "send_activity", "struct_app_actor_state.html#a05a4423c3cd9f87337b82621b9718515", null ],
      [ "current_user_flatbuf", "struct_app_actor_state.html#a0c117adba1dc320d1f10d5953426a192", null ],
      [ "in_progress_request_payloads", "struct_app_actor_state.html#a2f74415007a63750cc89f43a9b592d07", null ],
      [ "last_makerlabs_id_str", "struct_app_actor_state.html#a601085dcffeabd9c3cb2f79a55a603f3", null ],
      [ "logged_in", "struct_app_actor_state.html#a18f88dd4d6b4e688b0ee2c61bb7a6fb8", null ],
      [ "machine_id_str", "struct_app_actor_state.html#aa2133058dd6bf3d6dab01db7de8835d9", null ],
      [ "tag_id_str", "struct_app_actor_state.html#ac9f95603ff7c01a1399868a0269f49c3", null ],
      [ "tag_lost_time", "struct_app_actor_state.html#ac6424cd6c82b9c0f8e86f03791489126", null ]
    ] ],
    [ "AuthActorState", "struct_auth_actor_state.html", [
      [ "AuthActorState", "struct_auth_actor_state.html#a9dd102a9b684b084fbadd93c79778fc4", null ],
      [ "auth_request_intent_mutable_buf", "struct_auth_actor_state.html#ae841da807cc36c5ff2be1d80dde8be90", null ]
    ] ],
    [ "DisplayActorState", "struct_display_actor_state.html", [
      [ "DisplayActorState", "struct_display_actor_state.html#ae85f8dcd5b93ad919b5a266200167bc2", null ],
      [ "update_display_action", "struct_display_actor_state.html#a42038e6dd971dec69ca12aa1e64aedb9", null ],
      [ "idle_timeout", "struct_display_actor_state.html#af439d8ca2a5ddf9be42e5ec2234d4dbf", null ],
      [ "initial_progress", "struct_display_actor_state.html#af6d637447d86412e923412f68a58b6e9", null ],
      [ "job_timer_start", "struct_display_actor_state.html#a1121ca28dc5c46c1530e7f4622786372", null ],
      [ "last_display_action", "struct_display_actor_state.html#a941aee7663380c28e5c45ed54b1415e6", null ],
      [ "last_idle_time", "struct_display_actor_state.html#a62a8ee98721a6acd49c1528cd9630345", null ],
      [ "last_progress_bar_message", "struct_display_actor_state.html#ab8bb7a8b6669c59198e5a5ffde2337f4", null ],
      [ "pin_reset", "struct_display_actor_state.html#a44d88d0361012dc1c8bec6190fcd8e3a", null ],
      [ "pin_scl", "struct_display_actor_state.html#a6823e2680967b926a15148a8dd52ac2e", null ],
      [ "pin_sda", "struct_display_actor_state.html#ab946f1603cbf3cd0b2f4c4b29aba755b", null ],
      [ "progress_bar_duration", "struct_display_actor_state.html#a9f3e66ab5dd3bf824b045364868127c8", null ],
      [ "progress_bar_start", "struct_display_actor_state.html#a5b2de2ddcdfcbf63c2ec56544e44e532", null ],
      [ "u8g2", "struct_display_actor_state.html#ac786fa2e4f626a6827b1316910d50216", null ],
      [ "u8g2_esp32_hal", "struct_display_actor_state.html#a9306da10850e1c61419f7f7e043ebbb5", null ]
    ] ],
    [ "MachineActorState", "struct_machine_actor_state.html", [
      [ "MachineActorState", "struct_machine_actor_state.html#ac8909eed324a69918aff8d2d65c0770c", null ],
      [ "_set_output", "struct_machine_actor_state.html#ab4777302ac695f024819777fc92a3760", null ],
      [ "disable_interlock_tref", "struct_machine_actor_state.html#a1542d94add4ac0203e619bf95abfcd07", null ],
      [ "disable_relay_tref", "struct_machine_actor_state.html#a8ae1c83fada54f7672e9c989d6b157c5", null ],
      [ "INTERLOCK_OFF", "struct_machine_actor_state.html#aee6b5239fb0695c6d949d296c5a61ae4", null ],
      [ "INTERLOCK_ON", "struct_machine_actor_state.html#a71842933ca1c624162714dfbc7cc39fc", null ],
      [ "interlock_pin", "struct_machine_actor_state.html#a81393c6cf0b2b461b65d5a7a81d96dbb", null ],
      [ "last_motor_activity_timestamp", "struct_machine_actor_state.html#a56f1deba231b2bd0884e74cf4cf5edcc", null ],
      [ "last_motor_pulse_count", "struct_machine_actor_state.html#a827338a6083031a4fa1755415bf7317d", null ],
      [ "last_motor_pulse_timestamp", "struct_machine_actor_state.html#ab3535171df308f0e04069257af9ff171", null ],
      [ "max_job_end_interval", "struct_machine_actor_state.html#ae26deb3a206ed272bc9f996f742cab5a", null ],
      [ "max_job_start_interval", "struct_machine_actor_state.html#a07ce157b2ecda207ced443c076f556f2", null ],
      [ "max_motor_pulse_count", "struct_machine_actor_state.html#ac314d8b5d79e81fdfdf8c2c09da66892", null ],
      [ "motor_activity_check_tref", "struct_machine_actor_state.html#a6d8c67d1af37ccad644913d8464f8ffc", null ],
      [ "motor_activity_seconds", "struct_machine_actor_state.html#ab613c88f2b28ced0441996f660f6cd72", null ],
      [ "motor_x_pin", "struct_machine_actor_state.html#af1f9a2ad6a68ec224a0b3ec669ecec81", null ],
      [ "motor_y_pin", "struct_machine_actor_state.html#a3ee9f3bc4367c3e6fad19392cdc6a025", null ],
      [ "RELAY_OFF", "struct_machine_actor_state.html#a671f05b87b49ed08d66b8ab8c3c675fa", null ],
      [ "RELAY_ON", "struct_machine_actor_state.html#a27a270a18e7c445ba3d497a126e0e7a0", null ],
      [ "relay_pin", "struct_machine_actor_state.html#ad37b92b47c2654c0682c00216b4b52f5", null ],
      [ "threshold_motor_pulse_count", "struct_machine_actor_state.html#a7c6f1999ccef4d8a07bbab27ecb9654a", null ]
    ] ],
    [ "RFIDReaderActorState", "struct_r_f_i_d_reader_actor_state.html", [
      [ "RFIDReaderActorState", "struct_r_f_i_d_reader_actor_state.html#a79d442edf17f603e022fdf0d0c2265de", null ],
      [ "rfid_reader", "struct_r_f_i_d_reader_actor_state.html#af43ff05a43f8bb71922b7d10f30fe78c", null ],
      [ "scanned_tag_prev", "struct_r_f_i_d_reader_actor_state.html#a6417e825dfe39f420763e7d0395ac51d", null ]
    ] ],
    [ "hid_global_reader.cpp", "hid__global__reader_8cpp.html", null ],
    [ "hid_global_reader.h", "hid__global__reader_8h.html", null ],
    [ "hid_global_tag_id.cpp", "hid__global__tag__id_8cpp.html", null ],
    [ "hid_global_tag_id.h", "hid__global__tag__id_8h.html", null ],
    [ "wiegand_reader.cpp", "wiegand__reader_8cpp.html", null ],
    [ "wiegand_reader.h", "wiegand__reader_8h.html", null ],
    [ "acm_helpers.cpp", "acm__helpers_8cpp.html", null ],
    [ "acm_helpers.h", "acm__helpers_8h.html", null ],
    [ "actors.h", "actors_8h.html", null ],
    [ "app_actor.cpp", "app__actor_8cpp.html", null ],
    [ "auth_actor.cpp", "auth__actor_8cpp.html", null ],
    [ "display_actor.cpp", "display__actor_8cpp.html", null ],
    [ "machine_actor.cpp", "machine__actor_8cpp.html", null ],
    [ "main.cpp", "main_8cpp.html", null ],
    [ "rfid_reader_actor.cpp", "rfid__reader__actor_8cpp.html", null ],
    [ "start_app.cpp", "start__app_8cpp.html", null ],
    [ "start_request_manager.cpp", "start__request__manager_8cpp.html", null ],
    [ "start_request_manager.h", "start__request__manager_8h.html", null ],
    [ "ActivityFlatbuffer", "group__firmware.html#ga701a460b2c909f27e2655d18c4b6203f", null ],
    [ "DisplayIntentFlatbuffer", "group__firmware.html#gadd043916085304d80aaa1f7ecbfc5d8e", null ],
    [ "LogFlatbuffer", "group__firmware.html#gadc03a1b60d6cc9db665a9a9dd165b4e5", null ],
    [ "MutableActivityFlatbuffer", "group__firmware.html#gad486f5e9ee0243b986ac7b8b473b8cf3", null ],
    [ "MutableRequestPayloadFlatbuffer", "group__firmware.html#ga23039b5e99114ec469a0ac6e9a855184", null ],
    [ "MutableUserFlatbuffer", "group__firmware.html#ga4403e5d42a9e48030d397b9d523c2443", null ],
    [ "RequestPayloadFlatbuffer", "group__firmware.html#ga26e7f7f33b2c1e8220f6abb7706503fa", null ],
    [ "string", "group__firmware.html#gaca454f84dd198a937af6499dd758aa3d", null ],
    [ "string", "group__firmware.html#gaca454f84dd198a937af6499dd758aa3d", null ],
    [ "string", "group__firmware.html#gaca454f84dd198a937af6499dd758aa3d", null ],
    [ "string", "group__firmware.html#gaca454f84dd198a937af6499dd758aa3d", null ],
    [ "string_view", "group__firmware.html#ga23b57f0b98455f90118efd4a93ca0151", null ],
    [ "string_view", "group__firmware.html#ga23b57f0b98455f90118efd4a93ca0151", null ],
    [ "string_view", "group__firmware.html#ga23b57f0b98455f90118efd4a93ca0151", null ],
    [ "string_view", "group__firmware.html#ga23b57f0b98455f90118efd4a93ca0151", null ],
    [ "string_view", "group__firmware.html#ga23b57f0b98455f90118efd4a93ca0151", null ],
    [ "TagBits", "group__firmware.html#ga695512799d3a7f97bce2a134801ba8e4", null ],
    [ "TimerCallbackFunction", "group__firmware.html#gad9bd5cf844b13d6d769472bece849905", null ],
    [ "Timestamp", "group__firmware.html#ga3343c53b6d9bbe20ea9b9902c1d40265", null ],
    [ "UserFlatbuffer", "group__firmware.html#gab39a0e493b4a10a6b3b27dfcda9f1def", null ],
    [ "UserFlatbuffer", "group__firmware.html#gab39a0e493b4a10a6b3b27dfcda9f1def", null ],
    [ "app_actor_behaviour", "group__firmware.html#gae528aa46f9c454ed1d50a7ed974b9075", null ],
    [ "app_actor_behaviour", "group__firmware.html#ga19e9deb9e876a0646107c94c5eb7e7df", null ],
    [ "app_main", "group__firmware.html#gabce06be17fc37d675118a678a8100a36", null ],
    [ "auth_actor_behaviour", "group__firmware.html#gabfa8352fbc37598c0e239932ff43e23e", null ],
    [ "auth_actor_behaviour", "group__firmware.html#ga6a5b9b50c423651a0a9bcceabc6b26de", null ],
    [ "beep", "group__firmware.html#gaf1f8892fc6a2558575889ff5e3cefb47", null ],
    [ "beep_timer_isr", "group__firmware.html#ga92feef0b3f93c4bd4e20b3ab81877428", null ],
    [ "display_behaviour", "group__firmware.html#ga32cbe146c6f35d870248f5b921f35e78", null ],
    [ "generate_activity", "group__firmware.html#ga8bf5f9a386f7a7d080fefca52359234f", null ],
    [ "generate_activity", "group__firmware.html#gac9d3483c43167d351b2b0d9989a3e587", null ],
    [ "generate_log", "group__firmware.html#ga04d2987521d80af3aec4fa9ede78411c", null ],
    [ "generate_log", "group__firmware.html#gac9e4be877af07f2a75c4e568cbae4256", null ],
    [ "generate_progress_bar", "group__firmware.html#gab78952bec466d527c5023c0d66ec9dd2", null ],
    [ "generate_progress_bar", "group__firmware.html#gac8046e5ddb046b014e3ae1002a65f80d", null ],
    [ "generate_show_user_details", "group__firmware.html#ga3b82ff3a3d6577b5ed9588bf7aae2756", null ],
    [ "generate_show_user_details_from_user", "group__firmware.html#ga28b5fc4d82c56d917410536e83fb6ee9", null ],
    [ "get_current_tag", "group__firmware.html#ga73ff7ccf542e664f378ea981a1091404", null ],
    [ "HIDGlobalReader", "group__firmware.html#ga30a69ce847d3c189237930e9fc37961a", null ],
    [ "HIDGlobalTagID", "group__firmware.html#gab400d17630e9fdd4321eae457c41b5c9", null ],
    [ "hold_timer_isr", "group__firmware.html#ga4acc7ccfc398615e2bdef0cc9ea191d1", null ],
    [ "machine_actor_behaviour", "group__firmware.html#ga2565ae2511f4c53e94ded34232cdcb6a", null ],
    [ "machine_actor_behaviour", "group__firmware.html#gab449412ddd3912652b125573e90d8db1", null ],
    [ "motors_gpio_isr_handler", "group__firmware.html#ga91bf7209e205135f8df197d348e3d1ba", null ],
    [ "operator==", "group__firmware.html#gaf24480ac916188ffb4d86cfff7735260", null ],
    [ "rfid_reader_actor_behaviour", "group__firmware.html#ga8980cdac7afb7bc0cc910b173e5240e3", null ],
    [ "rfid_reader_actor_behaviour", "group__firmware.html#ga1fd070e191561cf7166b9d17e161c940", null ],
    [ "scan_tag", "group__firmware.html#gaf67b0ae8d9de234274d986231d496bf5", null ],
    [ "scanning_fsm", "group__firmware.html#ga02c79a6d3862e8987d412c545f5523a3", null ],
    [ "send_activity", "group__firmware.html#ga921049120cbc046bc1ff6b3d1f703c4e", null ],
    [ "send_progress_bar", "group__firmware.html#gad41fbe5fac05b69ef45279c6a0112fa5", null ],
    [ "set_beeper", "group__firmware.html#ga168595d2dc727539a923dba406f13f28", null ],
    [ "set_green_led", "group__firmware.html#gaa196b54b0638a3b316d046faa7ef8cd6", null ],
    [ "set_hold", "group__firmware.html#gab6adc1acb7608f0094c67367b75d13b5", null ],
    [ "set_red_led", "group__firmware.html#gac9d36939697619513b5d424e4f5e360e", null ],
    [ "start_app", "group__firmware.html#gae8545dae37e173a12f23fcaaac960a21", null ],
    [ "start_request_manager", "group__firmware.html#gac7395e733d11bf672623ce5b6ef43043", null ],
    [ "start_request_manager", "group__firmware.html#ga7e4ffb20ac7a308e9693544d2837cdea", null ],
    [ "wiegand_gpio_isr_handler", "group__firmware.html#ga8707cd2c09ee8841859746e17633babc", null ],
    [ "WiegandReader", "group__firmware.html#gaddfbeb16233008116c9b381190cbe2e1", null ],
    [ "BEEP_TIMER_IDX", "group__firmware.html#ga11ced7b8958750ef9dd7f27e27daada0", null ],
    [ "boot_count", "group__firmware.html#ga292d1100c9cdb3e5fb1a97c09ede3d17", null ],
    [ "HOLD_TIMER_IDX", "group__firmware.html#ga485f3e488d8bf7712ae40073e2dcb49a", null ],
    [ "max_bit_interval", "group__firmware.html#gaf2e2ae0a21ce0b3eb0c40b5d05b8611a", null ],
    [ "max_tag_active_interval", "group__firmware.html#gaf28cc82aac02de136b2ce945cdbe9ce7", null ],
    [ "network_event_group", "group__firmware.html#ga73c290f9022fc713847808060bccf3e8", null ],
    [ "s_wl_handle", "group__firmware.html#ga9d1f6636715d2cd2af21e20bc5e26afa", null ],
    [ "TAG", "group__firmware.html#gabcc4a60700a62517b6a422059f87754c", null ],
    [ "TAG", "group__firmware.html#gabcc4a60700a62517b6a422059f87754c", null ],
    [ "TAG", "group__firmware.html#gabcc4a60700a62517b6a422059f87754c", null ],
    [ "TAG", "group__firmware.html#gabcc4a60700a62517b6a422059f87754c", null ],
    [ "TAG", "group__firmware.html#gabcc4a60700a62517b6a422059f87754c", null ],
    [ "TAG", "group__firmware.html#gabcc4a60700a62517b6a422059f87754c", null ],
    [ "TAG", "group__firmware.html#gabcc4a60700a62517b6a422059f87754c", null ],
    [ "TIMER_DIVIDER", "group__firmware.html#gabf33d635bf72a0f0bb9f6f81b45f513a", null ]
];