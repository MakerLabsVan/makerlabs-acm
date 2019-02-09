/// @addtogroup scripts
/// @{
/// @file
/// @brief Create a Date object from a UNIX epoch timestamp in seconds.

/// @brief Create a Date object from a UNIX epoch timestamp in seconds.
///
/// @param epochSeconds Number of seconds elapsed since UNIX epoch start
///
/// @return JS Date object
function FROM_UNIX_EPOCH(epochSeconds) {
  const epochMilliseconds = Number(epochSeconds) * 1000;
  return new Date(epochMilliseconds);
}
/// @}
