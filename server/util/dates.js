const Moment = require("moment");

/**
 * The function "parseDate" takes a date string in the format "MM/DD/YYYY" and returns the same date
 * string formatted as "MM/DD/YYYY".
 * @param date - The `date` parameter is a string representing a date in the format "MM/DD/YYYY".
 * @returns the parsed date in the format "MM/DD/YYYY".
 */
function parseDate(date) {
  return Moment(date, "MM/DD/YYYY", true).format("MM/DD/YYYY");
}

/**
 * The function returns the current date and time in the format "MM-DD-YYYY HH:mm".
 * @returns the current date and time in the format "MM-DD-YYYY HH:mm".
 */
function newDateWithTime() {
  return Moment(new Date()).format("MM-DD-YYYY HH:mm");
}

/**
 * The function checks if a given date is after the current date.
 * @param date - The `date` parameter is a date value that you want to check if it is after the current
 * date and time.
 * @returns a boolean value indicating whether the given date is after the current date and time.
 */
function isAfterDate(date) {
  return Moment(date).isAfter();
}

/**
 * The function checks if two dates are the same.
 * @param date1 - The first date to compare. It can be a string in a recognized date format or a
 * JavaScript Date object.
 * @param date2 - The `date2` parameter is the second date that we want to compare with `date1` to
 * check if they are the same date.
 * @returns a boolean value indicating whether the two dates are the same.
 */
function isSameDate(date1, date2) {
  return Moment(date1).isSame(date2);
}

/**
 * Helper function to check if a date falls within a given range.
 *
 * @param {string} date - The date to check.
 * @param {string} startDate - The start of the date range.
 * @param {string} endDate - The end of the date range.
 * @returns {boolean} True if the date falls within the range, false otherwise.
 */
function isDateInRange(date, startDate, endDate) {
  const startDateS = Moment(startDate, "L");
  const endDateS = Moment(endDate, "L");
  return Moment(date).isBetween(startDateS, endDateS, "days", "[]");
}

module.exports = {
  isDateInRange,
  parseDate,
  isAfterDate,
  newDateWithTime,
  isSameDate,
};
