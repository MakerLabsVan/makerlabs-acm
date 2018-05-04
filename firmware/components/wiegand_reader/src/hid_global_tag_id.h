#pragma once

#include <bitset>

#include <cinttypes>

struct HIDGlobalTagID
{
  struct TagFormatView
  {
    uint64_t leading_parity_bit : 1;
    uint64_t facility_code : 8;
    uint64_t card_number : 16;
    uint64_t trailing_parity_bit : 1;
  };

  struct ParityView
  {
    uint64_t leading_bits : 13;
    uint64_t trailing_bits : 13;
  };

  HIDGlobalTagID() noexcept;
  explicit HIDGlobalTagID(const std::bitset<26>& bits) noexcept;

  bool valid = false;

  uint8_t facility_code = 0;
  uint16_t card_number = 0;
};

inline bool operator==(
  const HIDGlobalTagID& lhs,
  const HIDGlobalTagID& rhs
)
{
  return (
    lhs.valid == rhs.valid
    and lhs.facility_code == rhs.facility_code
    and lhs.card_number == rhs.card_number
  );
}
