import { useMutation } from "@tanstack/react-query";
import api from "./axiosConfig"

const punchIn = async () => {
    try {
        const postData = { 'userIp': '110.44.126.148' }
        const resp = await api.post('/users/me/punchin', postData);
        return resp.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'An error occurred');
        }
        throw new Error('An unexpected error occurred');
    }
}

export const usePunchIn = () => {
    return useMutation({
        mutationKey: ['punchin'],
        mutationFn: punchIn
    });
}