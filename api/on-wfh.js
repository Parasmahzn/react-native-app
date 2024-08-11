import { useQuery } from "@tanstack/react-query";
import api from "./axiosConfig"

const getWorkFromHomeDetail = async () => {
    const resp = await api.get('/userleaves/usersonwfh');
    return resp.data;
}

export const useWorkFromHome = () => {
    return useQuery({
        queryKey: ['wfh'],
        queryFn: getWorkFromHomeDetail,
    })

}