import { View, FlatList, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWorkFromHome } from '../api/on-wfh'

import useRefresh from '../hooks/useRefresh';

import Loader from './Loader';
import InfoBox from './InfoBox';
import ErrorState from './ErrorState';
import EmptyState from './EmptyState';
import WorkFromHomeCard from './WfhCard';

const OnWorkFromHome = () => {
    const wfhUsers = useWorkFromHome();

    const { refreshing, onRefresh } = useRefresh([
        wfhUsers.refetch
    ]);

    if (wfhUsers.isLoading)
        return <Loader />
    if (wfhUsers.isError)
        return <ErrorState message={wfhUsers.error.message} />

    const wfhList = wfhUsers?.data[0] || [];
    const totalWfhCount = wfhUsers?.data[1] || 0;

    return (
        <SafeAreaView className='bg-primary h-full'>
            <FlatList
                data={wfhList}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <WorkFromHomeCard leave={item}
                        serialNumber={index + 1} />
                )}
                ListHeaderComponent={() => (
                    <View className='w-full justify-center items-center mb-4 px-4'>
                        <View className='mt-0 flex-row'>
                            <InfoBox
                                title={totalWfhCount}
                                subtitle="Total"
                                titleStyles='text-xl'
                            />
                        </View>
                    </View>
                )}

                ListEmptyComponent={() => (
                    <EmptyState
                        title="No Work From Home"
                        subtitle="No employees currently working from home"

                    />
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />}

                ListFooterComponent={<View className='h-[95px]' />}
            />
        </SafeAreaView>
    )
}

export default OnWorkFromHome