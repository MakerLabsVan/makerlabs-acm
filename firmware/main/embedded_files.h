#pragma once

#include "embedded_files_string_view_wrapper.h"

// To embed files in the app binary, they are named
// in the main component.mk COMPONENT_EMBED_TXTFILES variable.
namespace embedded_files {
  // WILDCARD_google_com_root_cacert.der
  DECLARE_STRING_VIEW_WRAPPER(WILDCARD_google_com_root_cacert_der);

  // WILDCARD_googleapis_com_root_cacert.der
  DECLARE_STRING_VIEW_WRAPPER(WILDCARD_googleapis_com_root_cacert_der);
} // namespace embedded_files
