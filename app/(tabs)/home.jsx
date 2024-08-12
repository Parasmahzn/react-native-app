import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '../../components/EmptyState';
import LeaveCard from '../../components/LeaveCard';
import { useUsers } from '../../api/users';
import CustomButton from '../../components/CustomButton';
import Loader from '../../components/Loader';
import { useLeaveStatus } from '../../api/leave-status';

const Home = () => {
    const user = useUsers();
    const leaveStatus = useLeaveStatus();

    const [refreshing, setRefreshing] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    const onRefresh = async () => {
        setRefreshing(true);
        await user.refetch();
        await leaveStatus.refetch();
        setRefreshing(false);
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (user.isLoading || leaveStatus.isLoading) return <Loader />
    if (user.isError || leaveStatus.isError) return <h1> Something Went Wrong...</h1>

    const { userInfo } = user.data;

    const formatTime = (date) => {
        return date.toLocaleString('en-US', {
            weekday: 'long', // Full name of the day (e.g., "Sunday")
            hour: '2-digit', // 2-digit hour (12-hour format)
            minute: '2-digit', // 2-digit minute
            second: '2-digit', // 2-digit second
            hour12: true // 12-hour format with AM/PM
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString();
    };

    return (
        <SafeAreaView className='bg-primary  h-full'>
            <FlatList
                data={leaveStatus.data[0]}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <LeaveCard leave={item} />
                )}
                ListHeaderComponent={() => (
                    <View className='my-6 px-4 space-y-6'>
                        <View className='justify-between items-start flex-row mb-6'>
                            <View>
                                <Text className='font-pmedium text-sm text-gray-100'>
                                    Welcome Back,
                                </Text>
                                <Text className='text-2xl font-psemibold text-white'>
                                    {userInfo?.fullName}
                                </Text>
                            </View>
                            <View className='mt-1.5'>
                                {/* <Image
                                    source={images.logoSmall}
                                    resizeMode='contain'
                                    className='w-9 h-10'
                                /> */}

                                <Text className='text-white text-xl font-psemibold'>{formatDate(currentTime)}</Text>
                                <Text className='text-white text-lg font-psemibold'>{formatTime(currentTime)}</Text>
                            </View>
                        </View>

                        <View className='w-full flex-row justify-between pt-0 pb-1'>
                            <CustomButton
                                title='Punch In'
                                // handlePress={submit}
                                containerStyles='flex-1 mx-3'
                                isLoading={userInfo.isPunchedIn}
                            />
                            <CustomButton
                                title='Punch Out'
                                // handlePress={submit}
                                containerStyles='flex-1 mx-3'
                                isLoading={!userInfo.isPunchedIn}
                            />
                        </View>
                        <View className='p-4 bg-gray-800 rounded-lg'>
                            <Text className='text-lg font-psemibold text-white mb-4 text-center'>Leave Balance</Text>
                            <View className='w-full flex-row justify-evenly gap-1'>
                                <Text className='text-center font-pmedium text-gray-100'>Total: {userInfo.totalLeaves}</Text>
                                <Text className='text-center font-pmedium text-gray-100'>Taken: {userInfo.leavesTaken}</Text>
                                <Text className='text-center font-pmedium text-gray-100'>Remaining: {userInfo.remainingLeaves}</Text>
                            </View>
                        </View>
                    </View>
                )}

                ListEmptyComponent={() => (
                    <EmptyState
                        title="No record found"
                        subtitle="Be check back later"

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

export default Home