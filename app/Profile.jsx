import { ActivityIndicator, Text, View } from 'react-native'
import React from 'react'
import { useUsers } from '../api/users';

const Profile = () => {
    const { data: users, isLoading, error, isError } = useUsers();

    if (isLoading) {
        return (
            <View className='items-center' >
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (isError) {
        return (
            <View>
                <Text>Error: {error.message}</Text>
            </View>
        );
    }

    return (
        <View>
            {users?.data?.map((user) => (
                <Text key={user?.id}>{`${user?.first_name} ${user?.last_name}`}</Text>
            ))}
        </View>
    )
}

export default Profile