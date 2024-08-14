import { View, Text, FlatList, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAllUsers } from '../../api/users';
import { useWorkFromHome } from '../../api/on-wfh'

import useRefresh from '../../hooks/useRefresh';

import Loader from '../../components/Loader';
import InfoBox from '../../components/InfoBox';
import ErrorState from '../../components/ErrorState';
import EmptyState from '../../components/EmptyState';
import WorkFromHomeCard from '../../components/WfhCard';

const OnWorkFromHome = () => {
    const wfhUsers = useWorkFromHome();
    const allUsers = useAllUsers();

    const { refreshing, onRefresh } = useRefresh([
        wfhUsers.refetch,
        allUsers.refetch,
    ]);

    if (wfhUsers.isLoading || allUsers.isLoading)
        return <Loader />
    if (wfhUsers.isError || allUsers.isError)
        return <ErrorState message={wfhUsers.error.message || allUsers.error.message} />

    const wfhList = wfhUsers?.data[0] || [];
    const totalWfhCount = wfhUsers?.data[1] || 0;
    const totalEmployeeCount = allUsers?.data?.total_data || 0;

    return (
        <SafeAreaView className='bg-primary  h-full'>
            <Text className='text-2xl text-white text-center font-psemibold px-4 my-4'>
                Employees on WFH
            </Text>
            <FlatList
                data={wfhList}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <WorkFromHomeCard leave={item}
                        serialNumber={index + 1} />
                )}
                ListHeaderComponent={() => (
                    <View className='w-full justify-center items-center mt-6 mb-8 px-4'>
                        <View className='mt-2 flex-row'>
                            <InfoBox
                                title={totalWfhCount}
                                subtitle="WFH"
                                containerStyles='mr-10'
                                titleStyles='text-xl'
                            />
                            <InfoBox
                                title={totalEmployeeCount}
                                subtitle='Total'
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
            />
        </SafeAreaView>
    )
}

export default OnWorkFromHome