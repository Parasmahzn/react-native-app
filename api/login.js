import { useMutation } from "@tanstack/react-query"
import * as SecureStore from 'expo-secure-store';
import api from "./axiosConfig"

const signIn = async (loginData) => {
    try {
        const response = await api.post('/login', loginData);
        await SecureStore.setItemAsync('userEmail', loginData?.email);
        return response.data;
    } catch (error) {
        // Forward the error message to the React Query hook
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'An error occurred');
        }
        throw new Error('An unexpected error occurred');
    }
}

export const useLogin = () => {
    return useMutation({
        mutationKey: ['login'],
        mutationFn: signIn
    })
}