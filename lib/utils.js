import * as SecureStore from 'expo-secure-store';

/**
 * Retrieves the current user's email from secure storage if an authentication token is present.
 * @returns {Promise<string>} The email of the current user.
 * @throws {Error} If no authentication token is found.
 */
export const getCurrentUser = async () => {
    try {
        const token = await SecureStore.getItemAsync('authToken');
        const email = await SecureStore.getItemAsync('userEmail');
        if (token) {
            return email;
        }
        throw new Error('No token found');
    } catch (error) {
        throw error; // This will reject the promise with the caught error
    }
}

/**
 * Formats the given date into different string representations including date, 12-hour time, 24-hour time, day name, and month name.
 * @param {Date} date - The date to format.
 * @returns {Object} An object containing the formatted date information:
 * - `dateOnly`: The date in `MM/DD/YYYY` format.
 * - `time12Hour`: The time in 12-hour format with AM/PM.
 * - `time24Hour`: The time in 24-hour format.
 * - `dayName`: The full name of the day of the week.
 * - `monthName`: The full name of the month.
 */
export const getDateTimeInfo = (date) => {
    const dateOnly = date.toLocaleDateString();

    const time12Hour = date.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });

    const time24Hour = date.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    const dayName = date.toLocaleString('en-US', { weekday: 'long' });

    const monthName = date.toLocaleString('en-US', { month: 'long' });

    return { dateOnly, time12Hour, time24Hour, dayName, monthName };
};

/**
 * Creates a promise that resolves after a specified number of milliseconds.
 * @param {number} ms - The number of milliseconds to wait before resolving the promise.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));