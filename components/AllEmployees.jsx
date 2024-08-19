import { FlatList, RefreshControl, View } from 'react-native'
import EmployeeCard from './EmployeeCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import InfoBox from './InfoBox'
import EmptyState from './EmptyState'
import { useSearchEmployees } from '../api/search-employees'
import { useAllUsers } from '../api/users'
import useRefresh from '../hooks/useRefresh'
import Loader from './Loader'
import ErrorState from './ErrorState'

const AllEmployees = () => {
    const searchEmployees = useSearchEmployees();
    const allUsers = useAllUsers();

    const { refreshing, onRefresh } = useRefresh([
        searchEmployees.refetch,
        allUsers.refetch,
    ]);

    if (searchEmployees.isLoading || allUsers.isLoading)
        return <Loader />
    if (searchEmployees.isError || allUsers.isError)
        return <ErrorState message={searchEmployees.error.message || allUsers.error.message} />

    const { data: searchEmployeesData } = searchEmployees;
    const employeeList = searchEmployeesData?.data || [];
    const totalEmployeeCount = allUsers?.data?.total_data || 0;
    return (
        <SafeAreaView className='bg-primary h-full'>
            <FlatList
                data={employeeList}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <EmployeeCard employee={item}
                        serialNumber={index + 1} />
                )}
                ListHeaderComponent={() => (
                    <View className='w-full justify-center items-center mb-4 px-4'>
                        <View className='mt-0 flex-row'>
                            <InfoBox
                                title={totalEmployeeCount || 0}
                                subtitle="Total"
                                titleStyles='text-xl'
                            />
                        </View>
                    </View>
                )}

                ListEmptyComponent={() => (
                    <EmptyState
                        title="No Employee Records"
                        subtitle="No employees found at this moment."

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

export default AllEmployees