import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, RefreshControl, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { getDateTimeInfo } from '../../lib/utils';
import { useUsers } from '../../api/users';
import { useLeaveStatus } from '../../api/leave-status';
import { usePunchIn } from '../../api/punch-in';
import { usePunchOut } from '../../api/punch-out';

import useRefresh from '../../hooks/useRefresh';

import LeaveCard from '../../components/LeaveCard';
import EmptyState from '../../components/EmptyState';
import CustomButton from '../../components/CustomButton';
import Loader from '../../components/Loader';
import ErrorState from '../../components/ErrorState';

const Home = () => {
    const user = useUsers();
    const leaveStatus = useLeaveStatus();
    const punchIn = usePunchIn();
    const punchOut = usePunchOut()

    const { refreshing, onRefresh } = useRefresh([
        user.refetch,
        leaveStatus.refetch,
    ]);

    const [currentTime, setCurrentTime] = useState(new Date());
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (user.isLoading || leaveStatus.isLoading || punchIn.isLoading || punchOut.isLoading)
        return <Loader />
    if (user.isError || leaveStatus.isError || punchIn.isError || punchOut.isError)
        return <ErrorState message={user.error.message || leaveStatus.error.message || punchIn.error.message || punchOut.error.message} />

    const { userInfo } = user.data;
    const { dayName, time12Hour } = getDateTimeInfo(currentTime);

    const handlePunchIn = async (event) => {
        event.persist();
        setIsSubmitting(true);
        try {
            // await delay(2000);
            await punchIn.mutateAsync();
            Alert.alert("Success", 'Punch In Confirmed! Have a Great Day');
        } catch (error) {
            Alert.alert("Error", error.message);
        }
        finally {
            setIsSubmitting(false);
        }
    }
    const handlePunchOut = async (e) => {
        e.persist();
        setIsSubmitting(true);
        try {
            await punchOut.mutateAsync();
            Alert.alert("Success", "Punch Out Successful! Have a peaceful and restful evening!");
        } catch (error) {
            Alert.alert("Error", error.message);
        }
        finally {
            setIsSubmitting(false);
        }
    }

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
                            <View className="flex-1 items-start">
                                <Text className='font-pmedium text-sm text-gray-100'>
                                    Welcome Back,
                                </Text>
                                <Text className='text-2xl font-psemibold text-white'>
                                    {userInfo?.fullName}
                                </Text>
                            </View>

                            <View className='my-1'>
                                <Text className='text-white text-center w-24 text-sm font-psemibold'>
                                    {dayName}
                                </Text>
                                <Text className='text-white text-center w-24 text-sm font-psemibold'>
                                    {time12Hour}
                                </Text>
                            </View>
                        </View>

                        <View className='w-full flex-row justify-between pt-0 pb-1'>
                            <CustomButton
                                title='Punch In'
                                handlePress={handlePunchIn}
                                containerStyles='flex-1 mx-3'
                                isLoading={isSubmitting || userInfo.isPunchedIn}
                            />
                            <CustomButton
                                title='Punch Out'
                                handlePress={handlePunchOut}
                                containerStyles='flex-1 mx-3'
                                isLoading={!userInfo.isPunchedIn || isSubmitting}
                            />
                        </View>
                        <View className='p-4 bg-gray-800 rounded-lg'>
                            <Text className='text-lg font-psemibold text-white mb-4 text-center'>
                                Leave Balance
                            </Text>
                            <View className='w-full flex-row justify-evenly gap-1'>
                                <Text className='text-center font-pmedium text-gray-100'>
                                    Total: {userInfo.totalLeaves}
                                </Text>
                                <Text className='text-center font-pmedium text-gray-100'>
                                    Taken: {userInfo.leavesTaken}
                                </Text>
                                <Text className='text-center font-pmedium text-gray-100'>
                                    Remaining: {userInfo.remainingLeaves}
                                </Text>
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