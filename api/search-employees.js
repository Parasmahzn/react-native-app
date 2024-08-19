import { useQuery } from "@tanstack/react-query";
import api from "./axiosConfig"

const searchEmployees = async (searchKey, pageNumber = 1) => {
    const response = await api.get(`/users/search/${pageNumber}?key=${searchKey}`);
    return response.data;
};

export const useSearchEmployees = (searchKey = '', pageNumber = 1) => {
    return useQuery({
        queryKey: ['searchEmployees', searchKey, pageNumber],
        queryFn: () => searchEmployees(searchKey, pageNumber),
    })
}