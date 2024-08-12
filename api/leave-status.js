import { useQuery } from "@tanstack/react-query";
import api from "./axiosConfig"

const getLeaveStatus = async () => {
    const resp = await api.get('/userleaves/myleavestatushistory');
    return resp.data;
}

export const useLeaveStatus = () => {

    return useQuery({
        queryKey: ['leaveStatus'],
        queryFn: getLeaveStatus
    })
}