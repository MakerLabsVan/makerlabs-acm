#pragma once

#include <experimental/string_view>

#include <vector>

#define DECLARE_STRING_VIEW_WRAPPER(file_name_with_ext)       \
  extern const char file_name_with_ext ## _start[]            \
    asm("_binary_" #file_name_with_ext "_start");             \
  extern const char file_name_with_ext ## _end[]              \
    asm("_binary_" #file_name_with_ext "_end");               \
  const std::experimental::string_view file_name_with_ext(    \
    file_name_with_ext ## _start,                             \
    file_name_with_ext ## _end - file_name_with_ext ## _start \
  )

// To embed files in the app binary, they are named
// in the main component.mk COMPONENT_EMBED_TXTFILES variable.
namespace embedded_files {
  // WILDCARD_google_com_root_cacert.der
  DECLARE_STRING_VIEW_WRAPPER(WILDCARD_google_com_root_cacert_der);

  // WILDCARD_googleapis_com_root_cacert.der
  DECLARE_STRING_VIEW_WRAPPER(WILDCARD_googleapis_com_root_cacert_der);

  // firmware_update_check_request_intent.req.fb
  DECLARE_STRING_VIEW_WRAPPER(firmware_update_check_request_intent_req_fb);

  // reauth_request_intent.req.fb
  DECLARE_STRING_VIEW_WRAPPER(reauth_request_intent_req_fb);

  // permissions_check_request_intent.req.fb
  DECLARE_STRING_VIEW_WRAPPER(permissions_check_request_intent_req_fb);

  // activity_request_intent.req.fb
  DECLARE_STRING_VIEW_WRAPPER(activity_request_intent_req_fb);

  // log_request_intent.req.fb
  DECLARE_STRING_VIEW_WRAPPER(log_request_intent_req_fb);

  // permissions_check_query.gviz.fb
  DECLARE_STRING_VIEW_WRAPPER(permissions_check_query_gviz_fb);
}
