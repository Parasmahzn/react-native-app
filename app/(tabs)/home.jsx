import { View, Text, FlatList, Image, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import EmptyState from '../../components/EmptyState';
import LeaveCard from '../../components/LeaveCard';
import { useUsers } from '../../api/users';
import CustomButton from '../../components/CustomButton';
import Loader from '../../components/Loader';

const Home = () => {
    const { data, isLoading, isError, error, refetch } = useUsers();

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }

    if (isLoading) {
        <Loader />
    }

    if (isError)
        return <p>{`Error : ${error.message}`}</p>

    // Add a check here to avoid destructuring undefined
    if (!data || !data.userInfo) {
        return null;
    }

    const { userInfo, leaveType } = data;

    return (
        <SafeAreaView className='bg-primary  h-full'>
            <FlatList
                data={leaveType}
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
                                <Image
                                    source={images.logoSmall}
                                    resizeMode='contain'
                                    className='w-9 h-10'
                                />
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