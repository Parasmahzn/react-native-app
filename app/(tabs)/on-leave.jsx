import { View, FlatList } from 'react-native'
import React from 'react'
import { useOnLeave } from '../../api/on-leave';
import Loader from '../../components/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';
import InfoBox from '../../components/InfoBox';
import EmptyState from '../../components/EmptyState';
import { useAllUsers } from '../../api/users';

const OnLeave = () => {
    const onLeaveUsers = useOnLeave();
    const allUsers = useAllUsers();

    const onLeaveList = onLeaveUsers?.data[0];
    const totalOnLeaveCount = onLeaveUsers?.data[1];
    const totalEmployeeCount = allUsers?.data?.total_data || 0;

    if (onLeaveUsers.isLoading) {
        return <Loader />
    }

    if (onLeaveUsers.isError) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-white">Error: {onLeaveUsers?.error?.message}</Text>
            </View>
        );
    }

    return (
        <SafeAreaView className='bg-primary  h-full'>
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
            />
        </SafeAreaView>
    )
}

export default OnLeave