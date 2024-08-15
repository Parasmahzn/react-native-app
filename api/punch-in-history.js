import { useQuery } from "@tanstack/react-query";
import api from "./axiosConfig"

const getPunchInDetails = async () => {
    const resp = await api.get('/users/1/me/punchinhistory');
    return resp.data;
}

export const usePunchInHistory = () => {
    return useQuery({
        queryKey: ['punchInHistory'],
        queryFn: getPunchInDetails()
    })
}