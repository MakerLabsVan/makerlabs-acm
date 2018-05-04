#pragma once

#include "wiegand_reader.h"
#include "hid_global_tag_id.h"

#include <experimental/optional>
#include <atomic>

class HIDGlobalReader
: private WiegandReader
{
public:
  using MaybeTagId = std::experimental::optional<HIDGlobalTagID>;

  explicit HIDGlobalReader(const WiegandReader::Config& config) noexcept;

  enum class ScanState
  {
    IsScanningHold,
    IsScanningTag,
    IsScanningComplete,
  };

  auto scan_tag()
    -> MaybeTagId;

  auto beep(std::chrono::milliseconds duration)
    -> void;

  auto scanning_fsm()
    -> void;

  //std::atomic<HIDGlobalTagID> last_scanned_tag;
  MaybeTagId last_scanned_tag;

protected:
  ScanState scan_state = ScanState::IsScanningHold;
};
