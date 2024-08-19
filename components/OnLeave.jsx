import { View, FlatList, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOnLeave } from '../api/on-leave';
import { useAllUsers } from '../api/users';
import useRefresh from '../hooks/useRefresh';

import Loader from './Loader';
import WorkFromHomeCard from './WfhCard';
import InfoBox from './InfoBox';
import EmptyState from './EmptyState';
import ErrorState from './ErrorState';

const OnLeave = () => {
    const onLeaveUsers = useOnLeave();
    const allUsers = useAllUsers();

    const { refreshing, onRefresh } = useRefresh([
        onLeaveUsers.refetch,
        allUsers.refetch,
    ]);

    if (onLeaveUsers.isLoading || allUsers.isLoading)
        return <Loader />
    if (onLeaveUsers.isError || allUsers.isError)
        return <ErrorState message={onLeaveUsers.error.message || allUsers.error.message} />

    const { data: onLeaveUserData } = onLeaveUsers;

    const onLeaveList = onLeaveUserData[0] || [];
    const totalOnLeaveCount = onLeaveUserData[1] || 0;
    const totalEmployeeCount = allUsers?.data?.total_data || 0;

    return (
        <SafeAreaView className='bg-primary h-full'>
            <FlatList
                data={onLeaveList}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <WorkFromHomeCard leave={item}
                        serialNumber={index + 1} />
                )}
                ListHeaderComponent={() => (
                    <View className='w-full justify-center items-center mb-4 px-4'>
                        <View className='mt-0 flex-row'>
                            <InfoBox
                                title={totalOnLeaveCount}
                                subtitle='Leave'
                                containerStyles='mr-10'
                                titleStyles='text-xl'
                            />
                            <InfoBox
                                title={totalEmployeeCount}
                                subtitle="Total"
                                titleStyles='text-xl'
                            />
                        </View>
                    </View>
                )}

                ListEmptyComponent={() => (
                    <EmptyState
                        title="No Leave Records"
                        subtitle="No employees are on leave at this moment."

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

export default OnLeave