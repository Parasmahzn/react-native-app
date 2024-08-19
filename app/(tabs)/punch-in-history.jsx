import { FlatList, RefreshControl, ScrollView, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DataTable } from 'react-native-paper';
import { usePunchInHistory } from '../../api/punch-in-history';

import EmptyState from '../../components/EmptyState'
import Loader from '../../components/Loader';
import ErrorState from '../../components/ErrorState';
import PunchInCard from '../../components/PunchInCard';

const PunchInHistory = () => {
    const { data, isLoading, isError, error, isFetching, refetch } = usePunchInHistory();

    if (isLoading) return <Loader />
    if (isError) return <ErrorState message={error.message} />

    const { pages } = data || { pages: [] };
    const punchInData = pages.flatMap(page => page.data);

    return (
        <SafeAreaView className='bg-primary h-full'>
            <Text className='text-2xl text-white text-center font-psemibold px-4 my-4'>
                Punch In History
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <DataTable>
                    <DataTable.Header className='bg-slate-600'>
                        <DataTable.Title className="text-[10px] text-white font-psemibold">S.N.</DataTable.Title>
                        <DataTable.Title className="text-[10px] text-white font-psemibold">Date</DataTable.Title>
                        <DataTable.Title className="text-[10px] text-white font-psemibold">Punch In Time</DataTable.Title>
                        <DataTable.Title className="text-[10px] text-white font-psemibold">Punch Out Time</DataTable.Title>
                        <DataTable.Title className="text-[10px] text-white font-psemibold">Punch In Remarks</DataTable.Title>
                        <DataTable.Title className="text-[10px] text-white font-psemibold">Punch Out Remarks</DataTable.Title>
                        <DataTable.Title className="text-[10px] text-white font-psemibold">Total Hours</DataTable.Title>
                    </DataTable.Header>
                    <FlatList
                        data={punchInData}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => (
                            <PunchInCard data={item}
                                serialNumber={index + 1} />
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
                    />
                </DataTable>
            </ScrollView>
        </SafeAreaView>
    );
}

export default PunchInHistory