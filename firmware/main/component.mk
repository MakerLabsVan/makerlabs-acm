#
# "main" pseudo-component makefile.
#
# (Uses default behaviour of compiling all source files in directory, adding 'include' to include path.)

COMPONENT_DEPENDS := \
	actor_model \
	fatfs \
	firmware_update \
	module_manager \
	mqtt \
	network_manager \
	nvs_flash \
	requests \
	utils \
	u8g2 \
	wiegand_reader

COMPONENT_ADD_INCLUDEDIRS := \
	. \
	src/gen

COMPONENT_SRCDIRS := \
	. \
	src/gen

COMPONENT_EXTRA_CLEAN := \
	$(COMPONENT_PATH)/assets/gen/WILDCARD_googleapis_com_root_cacert.der \
	$(COMPONENT_PATH)/assets/gen/WILDCARD_execute_api_us_west_2_amazonaws_com_root_cacert.der \
	$(COMPONENT_PATH)/secrets/gen/firmware_update_check_request_intent.req.fb \
	$(COMPONENT_PATH)/secrets/gen/firmware_update_check_request_intent.req.json \
	$(COMPONENT_PATH)/secrets/gen/log_request_intent.req.json \
	$(COMPONENT_PATH)/secrets/gen/permissions_check_request_intent.req.fb \
	$(COMPONENT_PATH)/secrets/gen/permissions_check_request_intent.req.json \
	$(COMPONENT_PATH)/secrets/gen/auth_request_intent.req.fb \
	$(COMPONENT_PATH)/secrets/gen/auth_request_intent.req.json \
	$(COMPONENT_PATH)/src/gen/acm_generated.h \
	$(COMPONENT_PATH)/src/gen/display_generated.h

CXXFLAGS += -std=c++14

# Needed for std::to_string
acm_helpers.o: CXXFLAGS += -D_GLIBCXX_USE_C99=1
start_app.o: CXXFLAGS += -D_GLIBCXX_USE_C99=1
rfid_reader_actor.o: CXXFLAGS += -D_GLIBCXX_USE_C99=1

# Flatbuffers/flatc _generated.h file
acm_helpers.o: $(COMPONENT_PATH)/src/gen/acm_generated.h
acm_helpers.o: $(COMPONENT_PATH)/src/gen/display_generated.h
start_app.o: $(COMPONENT_PATH)/src/gen/display_generated.h
start_app.o: $(PROJECT_PATH)/esp32-network-lib/firmware_update/src/gen/firmware_update_generated.h
display_actor.o: $(COMPONENT_PATH)/src/gen/display_generated.h

app_actor.o: $(PROJECT_PATH)/fs/WILDCARD_googleapis_com_root_cacert.der
app_actor.o: $(PROJECT_PATH)/fs/WILDCARD_execute_api_us_west_2_amazonaws_com_root_cacert.der
app_actor.o: $(PROJECT_PATH)/fs/firmware_update_check_request_intent.req.fb
app_actor.o: $(PROJECT_PATH)/fs/auth_request_intent.req.fb
app_actor.o: $(PROJECT_PATH)/fs/permissions_check_request_intent.req.fb

$(PROJECT_PATH)/fs/WILDCARD_googleapis_com_root_cacert.der: $(COMPONENT_PATH)/assets/gen/WILDCARD_googleapis_com_root_cacert.der
	cp $^ $@

$(PROJECT_PATH)/fs/WILDCARD_execute_api_us_west_2_amazonaws_com_root_cacert.der: $(COMPONENT_PATH)/assets/gen/WILDCARD_execute_api_us_west_2_amazonaws_com_root_cacert.der
	cp $^ $@

$(PROJECT_PATH)/fs/firmware_update_check_request_intent.req.fb: $(COMPONENT_PATH)/secrets/gen/firmware_update_check_request_intent.req.fb
	cp $^ $@

$(PROJECT_PATH)/fs/auth_request_intent.req.fb: $(COMPONENT_PATH)/secrets/gen/auth_request_intent.req.fb
	cp $^ $@

$(PROJECT_PATH)/fs/permissions_check_request_intent.req.fb: $(COMPONENT_PATH)/secrets/gen/permissions_check_request_intent.req.fb
	cp $^ $@

$(COMPONENT_PATH)/secrets/gen/permissions_check_request_intent.req.json: $(COMPONENT_PATH)/templates/permissions_check_request_intent.req.json.tpl
	sed \
		-e 's#@CONFIG_SPREADSHEET_ID@#$(call dequote,$(CONFIG_SPREADSHEET_ID))#' \
		-e 's#@CONFIG_SPREADSHEET_USERS_SHEET_GID@#$(call dequote,$(CONFIG_SPREADSHEET_USERS_SHEET_GID))#' \
		-e 's#@CONFIG_ACM_PERMISSIONS_CHECK_URL@#$(call dequote,$(CONFIG_ACM_PERMISSIONS_CHECK_URL))#' \
		$^ > $@

$(COMPONENT_PATH)/secrets/gen/auth_request_intent.req.json: $(COMPONENT_PATH)/templates/auth_request_intent.req.json.tpl
	sed \
		-e 's#@CONFIG_ACM_OAUTH_CLIENT_ID@#$(call dequote,$(CONFIG_ACM_OAUTH_CLIENT_ID))#' \
		-e 's#@CONFIG_ACM_OAUTH_CLIENT_SECRET@#$(call dequote,$(CONFIG_ACM_OAUTH_CLIENT_SECRET))#' \
		-e 's#@CONFIG_ACM_OAUTH_REFRESH_TOKEN@#$(call dequote,$(CONFIG_ACM_OAUTH_REFRESH_TOKEN))#' \
		$^ > $@
