import { useQuery } from "@tanstack/react-query"
import api from "./axiosConfig"

// Function to fetch user data from the API
export const getUserDetail = async () => {
    const resp = await api.get('/users/me');
    return resp.data;
}

// Custom hook to use user data with react-query
export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: getUserDetail,
        select: (data) => {
            const userInfo = {
                fullName: data?.user?.fullName || '',
                email: data?.user?.email || '',
                citNumber: data?.user?.citNumber || '',
                ssfNumber: data?.user?.ssf || '',
                citizenshipNumber: data?.user?.citizenshipNumber || '',
                joinedDate: data?.user?.joinDate || '',
                isPunchedIn: data?.user?.punchedIn === 1,
                designation: data?.user?.Designation?.name || '',
                role: data?.user?.Role?.name || '',
                totalLeaves: data?.user?.leaveData?.totalLeaves || 0,
                leavesTaken: data?.user?.leaveData?.leavesTaken || 0,
                remainingLeaves: data?.user?.leaveData?.remainingLeaves || 0,
                reportingManager: data?.user?.managerData?.fullName || '',
                department: data?.user?.Department?.description || '',
                shift: data?.user?.shiftData?.name || '',

            };
            return { userInfo };
        }
    })
};

export const getAllUsers = async () => {
    const resp = await api.get('/users');
    return resp.data;
}

// Custom hook to use user data with react-query
export const useAllUsers = () => {
    return useQuery({
        queryKey: ['allUsers'],
        queryFn: getAllUsers
    })
};