import * as SecureStore from 'expo-secure-store';
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