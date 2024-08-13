import { useMutation } from "@tanstack/react-query";
import api from "./axiosConfig"

const punchOut = async () => {
    const postData = { 'userIp': '202.79.34.34' }
    const resp = await api.post('users/me/punchout', postData);
    return resp.data;
}

export const usePunchOut = () => {
    return useMutation({
        mutationKey: ['punchout'],
        mutationFn: punchOut
    });
}