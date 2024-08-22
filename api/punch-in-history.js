import { useInfiniteQuery } from "@tanstack/react-query";
import api from "./axiosConfig";

/**
 * Function to fetch punch-in details. Handles both scenarios with and without date range.
 * @param {Object} params - Parameters for fetching punch-in details.
 * @param {number} params.pageParam - The current page number for pagination.
 * @param {string} [params.startDate] - The start date for filtering.
 * @param {string} [params.endDate] - The end date for filtering.
 * @returns {Promise<Object>} The punch-in details response.
 */
const getPunchInDetails = async ({ pageParam, startDate, endDate }) => {
    let url = 'users/1/me/punchinhistory'; // Default URL without date range

    if (startDate && endDate) {
        url = `/users/1/${startDate}/${endDate}/punchinhistory`; // URL with date range
    }

    const response = await api.get(url, {
        params: { page: pageParam },
    });
    return response.data;
};


/**
 * Custom hook to fetch punch-in history with optional date range filtering.
 * @param {string} [startDate] - The start date for filtering.
 * @param {string} [endDate] - The end date for filtering.
 * @returns {Object} The query result object from useInfiniteQuery.
 */
export const usePunchInHistory = (startDate, endDate) => {
    return useInfiniteQuery({
        queryKey: ['punchInHistory', startDate, endDate],
        queryFn: ({ pageParam = 1 }) => getPunchInDetails({ pageParam, startDate, endDate }),
        getNextPageParam: (lastPage) => {
            // Determine the next page to fetch based on the response
            return lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined;
        },
        keepPreviousData: true, // Keep previous data while fetching new data
    });
};
