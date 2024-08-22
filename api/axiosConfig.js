import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Create an Axios instance with custom configuration
const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_ENDPOINT,
    timeout: 10000,  // Set a timeout for requests (in milliseconds)
    headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2003J15SC) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36'
    },
});

api.interceptors.request.use(
    async config => {
        // Retrieve the token from Secure Store
        const token = await SecureStore.getItemAsync('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        // Handle request errors
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    async response => {
        // Handle successful responses
        if (response.config.url === '/login' && response.status === 200) {
            const token = response.data.access_token;
            await SecureStore.setItemAsync('authToken', token);
        }
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;
