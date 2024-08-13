import { useState } from 'react';

const useRefresh = (refetchFunctions) => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await Promise.all(refetchFunctions.map((refetch) => refetch()));
        } finally {
            setRefreshing(false);
        }
    };

    return {
        refreshing,
        onRefresh,
    };
};

export default useRefresh;
