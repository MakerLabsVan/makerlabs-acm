#include "hid_global_tag_id.h"

HIDGlobalTagID::HIDGlobalTagID() noexcept
{}

HIDGlobalTagID::HIDGlobalTagID(const std::bitset<26>& bits) noexcept
{
  // Get the tag ID that was provided as a 32-bit integer
  auto val = bits.to_ulong();

  // Validate parity before setting any member fields
  auto parity_view = reinterpret_cast<ParityView*>(&val);

  // Validate the leading half parity, bit count should be even
  auto leading_bits = std::bitset<13>(parity_view->leading_bits);
  auto leading_bit_count_is_even = ((leading_bits.count() % 2) == 0);

  // Validate the trailing half parity, bit count should be odd
  auto trailing_bits = std::bitset<13>(parity_view->trailing_bits);
  auto trailing_bit_count_is_odd = ((trailing_bits.count() % 2) == 1);

  // If both parity bits check out, then we can set the fields
  if (leading_bit_count_is_even and trailing_bit_count_is_odd)
  {
    // Valid parity, set fields
    auto tag_format_view = reinterpret_cast<TagFormatView*>(&val);

    valid = true;
    facility_code = tag_format_view->facility_code;
    card_number = tag_format_view->card_number;
  }
}
