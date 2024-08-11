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