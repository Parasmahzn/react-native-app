import { FlatList, RefreshControl, ScrollView, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DataTable } from 'react-native-paper';
import { usePunchInHistory } from '../../api/punch-in-history';

import EmptyState from '../../components/EmptyState'
import Loader from '../../components/Loader';
import ErrorState from '../../components/ErrorState';
import PunchInCard from '../../components/PunchInCard';

const PunchInHistory = () => {
    const {
        data,
        isLoading,
        isError,
        error,
        isFetching,
        fetchNextPage,
        hasNextPage,
        refetch
    } = usePunchInHistory();

    if (isLoading) return <Loader />
    if (isError) return <ErrorState message={error.message} />

    const { pages } = data || { pages: [] };
    const punchInData = pages.flatMap(page => page.data);

    const loadMoreData = () => {
        if (hasNextPage) {
            fetchNextPage();
        }
    };

    return (
        <SafeAreaView className='bg-primary h-full'>
            <Text className='text-2xl text-white text-center font-psemibold px-4 my-4'>
                Punch In History
            </Text>

            <FlatList
                data={punchInData}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                renderItem={({ item }) => (
                    <PunchInCard data={item} />
                )}
                refreshControl={
                    <RefreshControl refreshing={isFetching} onRefresh={refetch} />
                }
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No record found"
                        subtitle="Please check back later"

                    />
                )}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.5} // Load more when half the list is scrolled
            />
        </SafeAreaView>
    );
}

export default PunchInHistory