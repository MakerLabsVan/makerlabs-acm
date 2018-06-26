#
# "main" pseudo-component makefile.
#
# (Uses default behaviour of compiling all source files in directory, adding 'include' to include path.)

COMPONENT_DEPENDS := \
	actor_model \
	firmware_update \
	googleapis \
	requests

COMPONENT_ADD_INCLUDEDIRS := \
	. \
	src/gen

COMPONENT_SRCDIRS := \
	. \
	src/gen

COMPONENT_EXTRA_CLEAN := \
	$(COMPONENT_PATH)/assets/gen/WILDCARD_google_com_root_cacert.der \
	$(COMPONENT_PATH)/assets/gen/WILDCARD_googleapis_com_root_cacert.der \
	$(COMPONENT_PATH)/secrets/gen/firmware_update_check_request_intent.req.fb \
	$(COMPONENT_PATH)/secrets/gen/firmware_update_check_request_intent.req.json \
	$(COMPONENT_PATH)/secrets/gen/log_request_intent.req.json \
	$(COMPONENT_PATH)/secrets/gen/permissions_check_query.gviz.fb \
	$(COMPONENT_PATH)/secrets/gen/permissions_check_query.gviz.json \
	$(COMPONENT_PATH)/secrets/gen/reauth_request_intent.req.fb \
	$(COMPONENT_PATH)/secrets/gen/reauth_request_intent.req.json \
	$(COMPONENT_PATH)/src/gen/acm_generated.h \
	$(COMPONENT_PATH)/src/gen/display_generated.h

COMPONENT_EMBED_TXTFILES := \
	assets/gen/WILDCARD_google_com_root_cacert.der \
	assets/gen/WILDCARD_googleapis_com_root_cacert.der

COMPONENT_EMBED_FILES := \
	$(PROJECT_PATH)/esp32-network-lib/googleapis/assets/gen/visualization_query_request_intent.req.fb \
	$(PROJECT_PATH)/esp32-network-lib/googleapis/assets/gen/spreadsheet_insert_row_request_intent.req.fb

# Needed for std::to_string
acm_helpers.o: CXXFLAGS += -D_GLIBCXX_USE_C99=1
app_task.o: CXXFLAGS += -D_GLIBCXX_USE_C99=1
rfid_reader_actor.o: CXXFLAGS += -D_GLIBCXX_USE_C99=1

# Flatbuffers/flatc _generated.h file
acm_helpers.o: $(COMPONENT_PATH)/src/gen/acm_generated.h
acm_helpers.o: $(COMPONENT_PATH)/src/gen/display_generated.h
app_task.o: $(COMPONENT_PATH)/src/gen/display_generated.h
app_task.o: $(PROJECT_PATH)/esp32-network-lib/firmware_update/src/gen/firmware_update_generated.h
display_actor.o: $(COMPONENT_PATH)/src/gen/display_generated.h

app_actor.o: $(PROJECT_PATH)/fs/firmware_update_check_request_intent.req.fb
app_actor.o: $(PROJECT_PATH)/fs/reauth_request_intent.req.fb
app_actor.o: $(PROJECT_PATH)/fs/permissions_check_query.gviz.fb

$(PROJECT_PATH)/fs/firmware_update_check_request_intent.req.fb: $(COMPONENT_PATH)/secrets/gen/firmware_update_check_request_intent.req.fb
	cp $^ $@

$(PROJECT_PATH)/fs/reauth_request_intent.req.fb: $(COMPONENT_PATH)/secrets/gen/reauth_request_intent.req.fb
	cp $^ $@

$(PROJECT_PATH)/fs/permissions_check_query.gviz.fb: $(COMPONENT_PATH)/secrets/gen/permissions_check_query.gviz.fb
	cp $^ $@

$(COMPONENT_PATH)/secrets/gen/permissions_check_query.gviz.json: $(COMPONENT_PATH)/templates/permissions_check_query.gviz.json.tpl
	sed \
		-e 's#@CONFIG_SPREADSHEET_ID@#$(call dequote,$(CONFIG_SPREADSHEET_ID))#' \
		-e 's#@CONFIG_SPREADSHEET_USERS_SHEET_GID@#$(call dequote,$(CONFIG_SPREADSHEET_USERS_SHEET_GID))#' \
		-e 's#@CONFIG_PERMISSION_COLUMN_LABEL@#$(call dequote,$(CONFIG_PERMISSION_COLUMN_LABEL))#' \
		$^ > $@

$(COMPONENT_PATH)/secrets/gen/reauth_request_intent.req.json: $(COMPONENT_PATH)/templates/reauth_request_intent.req.json.tpl
	sed \
		-e 's#@CONFIG_OAUTH_CLIENT_ID@#$(call dequote,$(CONFIG_OAUTH_CLIENT_ID))#' \
		-e 's#@CONFIG_OAUTH_CLIENT_SECRET@#$(call dequote,$(CONFIG_OAUTH_CLIENT_SECRET))#' \
		-e 's#@CONFIG_OAUTH_REFRESH_TOKEN@#$(call dequote,$(CONFIG_OAUTH_REFRESH_TOKEN))#' \
		$^ > $@
