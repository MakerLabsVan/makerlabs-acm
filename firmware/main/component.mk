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

COMPONENT_EMBED_TXTFILES := \
	assets/WILDCARD_google_com_root_cacert.der \
	assets/WILDCARD_googleapis_com_root_cacert.der

COMPONENT_EMBED_FILES := \
	secrets/gen/firmware_update_check_request_intent.req.fb \
	secrets/gen/permissions_check_query.gviz.fb \
	secrets/gen/permissions_check_request_intent.req.fb \
	secrets/gen/activity_request_intent.req.fb \
	secrets/gen/log_request_intent.req.fb \
	secrets/gen/reauth_request_intent.req.fb

# Needed for std::to_string
acm_helpers.o: CXXFLAGS += -D_GLIBCXX_USE_C99=1
app_task.o: CXXFLAGS += -D_GLIBCXX_USE_C99=1
rfid_reader_actor.o: CXXFLAGS += -D_GLIBCXX_USE_C99=1

# Flatbuffers/flatc _generated.h file
acm_helpers.o: $(COMPONENT_PATH)/src/gen/acm_generated.h
acm_helpers.o: $(COMPONENT_PATH)/src/gen/display_generated.h
app_task.o: $(COMPONENT_PATH)/src/gen/display_generated.h
display_actor.o: $(COMPONENT_PATH)/src/gen/display_generated.h

$(COMPONENT_PATH)/secrets/gen/activity_request_intent.req.json: $(COMPONENT_PATH)/templates/activity_request_intent.req.json.tpl
	sed \
		-e 's#@CONFIG_SPREADSHEET_ID@#$(call dequote,$(CONFIG_SPREADSHEET_ID))#' \
		$^ > $@

$(COMPONENT_PATH)/secrets/gen/log_request_intent.req.json: $(COMPONENT_PATH)/templates/log_request_intent.req.json.tpl
	sed \
		-e 's#@CONFIG_SPREADSHEET_ID@#$(call dequote,$(CONFIG_SPREADSHEET_ID))#' \
		$^ > $@

$(COMPONENT_PATH)/secrets/gen/permissions_check_request_intent.req.json: $(COMPONENT_PATH)/templates/permissions_check_request_intent.req.json.tpl
	sed \
		-e 's#@CONFIG_SPREADSHEET_ID@#$(call dequote,$(CONFIG_SPREADSHEET_ID))#' \
		$^ > $@

$(COMPONENT_PATH)/secrets/gen/permissions_check_query.gviz.json: $(COMPONENT_PATH)/templates/permissions_check_query.gviz.json.tpl
	sed \
		-e 's#@CONFIG_PERMISSION_COLUMN_LABEL@#$(call dequote,$(CONFIG_PERMISSION_COLUMN_LABEL))#' \
		$^ > $@

$(COMPONENT_PATH)/secrets/gen/reauth_request_intent.req.json: $(COMPONENT_PATH)/templates/reauth_request_intent.req.json.tpl
	sed \
		-e 's#@CONFIG_OAUTH_CLIENT_ID@#$(call dequote,$(CONFIG_OAUTH_CLIENT_ID))#' \
		-e 's#@CONFIG_OAUTH_CLIENT_SECRET@#$(call dequote,$(CONFIG_OAUTH_CLIENT_SECRET))#' \
		-e 's#@CONFIG_OAUTH_REFRESH_TOKEN@#$(call dequote,$(CONFIG_OAUTH_REFRESH_TOKEN))#' \
		$^ > $@
