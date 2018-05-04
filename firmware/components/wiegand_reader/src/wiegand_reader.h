#pragma once

#include <atomic>
#include <bitset>
#include <chrono>
#include <experimental/optional>

using TagBits = std::bitset<26>;

struct TagRead
{
  using Timestamp = std::chrono::time_point<std::chrono::system_clock>;

  uint64_t tag_id;
  Timestamp timestamp;
};

class WiegandReader
{
public:
  struct Config
  {
    int data0_pin;
    int data1_pin;
    int hold_pin;
    int red_led_pin;
    int green_led_pin;
    int beeper_pin;
  };

  struct State
  {
    using Timestamp = std::chrono::time_point<std::chrono::system_clock>;

    TagBits current_tag_bits;
    uint32_t current_bit = 0;
    Timestamp last_bit_timestamp;
  };

  struct CallbackInfo
  {
    State& state;
    bool is_data1;
  };

  using TagReadEvent = std::experimental::optional<TagRead>;

  explicit WiegandReader(const Config& config = {});

  bool set_hold(bool enabled);
  bool set_red_led(bool enabled);
  bool set_green_led(bool enabled);
  bool set_beeper(bool enabled);

  TagReadEvent get_current_tag();

  //std::atomic<State> state;
  State state;

private:
  bool _set_output(int pin, bool enabled);
  Config config;

  // We give out the address to the global callback, though
  CallbackInfo data0_callback;
  CallbackInfo data1_callback;
};
