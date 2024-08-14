import { useQuery } from "@tanstack/react-query";
import api from "./axiosConfig";

const getMyProfile = async () => {
    const resp = await api.get('/userprofiles/myprofile');
    return resp.data;
}

export const useMyProfile = () => {
    return useQuery({
        queryKey: ['myprofile'],
        queryFn: getMyProfile
    });
}