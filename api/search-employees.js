import { useInfiniteQuery } from "@tanstack/react-query";
import api from "./axiosConfig"

const searchEmployees = async ({ pageParam, searchKey }) => {
    const response = await api.get(`/users/search/${pageParam}?key=${searchKey}`);
    return response.data;
};

export const useSearchEmployees = (searchKey = '') => {
    return useInfiniteQuery({
        queryKey: ['searchEmployees', searchKey],
        queryFn: ({ pageParam = 1 }) => searchEmployees({ pageParam, searchKey }),
        getNextPageParam: (lastPage) => {
            // Assume that `lastPage` contains `page` and `totalPages`
            // Update this logic based on your API's pagination response structure
            return lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined;
        },
        keepPreviousData: true, // Keep previous data while fetching new data
    });
};