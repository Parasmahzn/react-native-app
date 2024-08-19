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
 * Creates a promise that resolves after a specified number of milliseconds.
 * @param {number} ms - The number of milliseconds to wait before resolving the promise.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));