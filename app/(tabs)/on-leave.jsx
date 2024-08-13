import { View, FlatList, Text, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOnLeave } from '../../api/on-leave';
import { useAllUsers } from '../../api/users';
import useRefresh from '../../hooks/useRefresh';

import Loader from '../../components/Loader';
import WorkFromHomeCard from '../../components/WfhCard';
import InfoBox from '../../components/InfoBox';
import EmptyState from '../../components/EmptyState';
import ErrorState from '../../components/ErrorState';

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
        <SafeAreaView className='bg-primary  h-full'>
            <Text className='text-2xl text-white text-center font-psemibold px-4 my-4'>
                Employees on Leave
            </Text>
            <FlatList
                data={onLeaveList}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <WorkFromHomeCard leave={item}
                        serialNumber={index + 1} />
                )}
                ListHeaderComponent={() => (
                    <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
                        <View className='mt-5 flex-row'>
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
            />
        </SafeAreaView>
    )
}

export default OnLeave