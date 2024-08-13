import { useMutation } from "@tanstack/react-query";
import api from "./axiosConfig"

const punchIn = async () => {
    const postData = { 'userIp': '110.44.126.148' }
    const resp = await api.post('/users/me/punchin', postData);
    return resp.data;
}

export const usePunchIn = () => {
    return useMutation({
        mutationKey: ['punchin'],
        mutationFn: punchIn
    });
}