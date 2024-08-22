import moment from 'moment';

/**
 * Formats a given date into a specified format.
 * @param {Date | string} date - The date to format.
 * @param {string} [format='YYYY-MM-DDTHH:mm:ss.SSSZ'] - The format string. Defaults to ISO 8601 format.
 * @returns {string} The formatted date.
 */
export const formatDate = (date, format = 'YYYY-MM-DDTHH:mm:ss.SSSZ') => {
    return moment(date).format(format);
};

/**
 * Returns the current date in ISO 8601 format.
 * @returns {string} The current date and time in ISO 8601 format.
 */
export const getCurrentDate = () => {
    return moment().toISOString();
};

/**
 * Returns the full name of the day of the week for a given date.
 * @param {Date | string} date - The date to format.
 * @returns {string} The full name of the day (e.g., 'Monday').
 */
export const getDayName = (date) => {
    return moment(date).format('dddd'); // Full weekday name
};

/**
 * Returns the time in 12-hour format with AM/PM for a given date.
 * @param {Date | string} date - The date to format.
 * @returns {string} The time in 12-hour format (e.g., '03:15:49 PM').
 */
export const getTime12Hour = (date) => {
    return moment(date).format('hh:mm:ss A'); // 12-hour format with AM/PM
};

/**
 * Returns the start date of the current month in ISO 8601 format.
 * @returns {string} The start date of the current month in ISO 8601 format.
 */
export const getStartDateOfMonth = () => {
    return moment().startOf('month').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
};

/**
 * Returns the end date of the current month in ISO 8601 format.
 * @returns {string} The end date of the current month in ISO 8601 format.
 */
export const getEndDateOfMonth = () => {
    return moment().endOf('month').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
};

/**
 * Returns the start date of the previous month in ISO 8601 format.
 * @returns {string} The start date of the previous month in ISO 8601 format.
 */
export const getStartDateOfPreviousMonth = () => {
    return moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
};

/**
 * Returns the end date of the previous month in ISO 8601 format.
 * @returns {string} The end date of the previous month in ISO 8601 format.
 */
export const getEndDateOfPreviousMonth = () => {
    return moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
};

/**
 * Returns the start date based on a given number of months ago in ISO 8601 format.
 * @param {number} monthsAgo - The number of months ago to calculate the start date.
 * @returns {string} The start date based on the number of months ago in ISO 8601 format.
 */
export const getStartDateMonthsAgo = (monthsAgo) => {
    return moment().subtract(monthsAgo, 'months').startOf('month').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
};

/**
 * Returns the end date based on a given number of months ago in ISO 8601 format.
 * @param {number} monthsAgo - The number of months ago to calculate the end date.
 * @returns {string} The end date based on the number of months ago in ISO 8601 format.
 */
export const getEndDateMonthsAgo = (monthsAgo) => {
    return moment().subtract(monthsAgo, 'months').endOf('month').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
};

/**
 * Checks if a given date falls on a weekend (Saturday or Sunday).
 * @param {Date | string} date - The date to check. It can be a Date object or a string that Moment.js can parse.
 * @returns {boolean} - Returns `true` if the date is a weekend, otherwise `false`.
 */
export const isWeekend = (date) => {
    const dayOfWeek = moment(date).day(); // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    return dayOfWeek === 0 || dayOfWeek === 6; // Check if it's Sunday (0) or Saturday (6)
};