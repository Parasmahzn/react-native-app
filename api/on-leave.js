import { useQuery } from "@tanstack/react-query";
import api from "./axiosConfig"

const getLeaveDetail = async () => {
    const resp = await api.get('/userleaves/usersonleave');
    return resp.data;
}

export const useOnLeave = () => {
    return useQuery({
        queryKey: ['leave'],
        queryFn: getLeaveDetail,
    })

}