import { router } from 'expo-router';
import { View, TouchableOpacity, Image, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';

import { useGlobalContext } from '../../context/GlobalProvider';
import { useUsers } from '../../api/users';
import { useMyProfile } from '../../api/my-profile';
import { icons } from '../../constants';

import Loader from '../../components/Loader';
import ErrorState from '../../components/ErrorState';

const Profile = () => {
    const { setUser, setIsLoggedIn } = useGlobalContext();
    const users = useUsers();
    const myProfile = useMyProfile();

    if (users.isLoading || myProfile.isLoading)
        return <Loader />;
    if (users.isError || myProfile.isError)
        return <ErrorState message={users.error.message || myProfile.error.message} />;

    const logout = async () => {
        try {
            await SecureStore.deleteItemAsync('authToken');
            setUser(null);
            setIsLoggedIn(false);
            router.replace('/');
        } catch (error) {
            console.error('Error clearing Secure Store:', error);
        }
    }
    const { userInfo: { designation, fullName, email, citNumber,
        ssfNumber, citizenshipNumber, role, department, reportingManager, joinedDate, shift }
    } = users.data;

    const { general: { gender, dateOfBirth, userId, imageUrl, bloodGroup,
        panNumber, fatherName, motherName, maritalStatus }
    } = myProfile.data;

    return (
        <SafeAreaView className='bg-primary h-full'>
            <View className='w-full justify-center items-center mt-4 px-4'>
                <TouchableOpacity
                    className='absolute top-4 right-4'
                    onPress={logout}
                >
                    <Image
                        source={icons.logout}
                        resizeMode='contain'
                        className='w-5 h-5'
                    />
                </TouchableOpacity>
                <View className='w-14 h-14 border border-secondary rounded-full justify-center items-center'>
                    <Image
                        source={imageUrl || icons.avatar}
                        className='w-[90%] h-[90%] rounded-full'
                        resizeMode='cover'
                    />
                </View>
                <View className='items-center mt-3'>
                    <Text className='text-lg font-psemibold text-white'>
                        {fullName}
                    </Text>
                    <Text className='text-sm font-pmedium text-gray-300 mb-1'>
                        {designation}
                    </Text>
                    <Text className='text-sm font-pmedium text-gray-300 mb-1'>
                        {email}
                    </Text>
                    <Text className='text-sm font-pmedium text-gray-300 mb-3'>
                        DRM ID: {userId}
                    </Text>
                </View>
            </View>
            <ScrollView className='flex-1 px-4'>
                <View className='mb-4'>
                    <Text className='text-xl font-psemibold text-white mb-4 text-center'>
                        Personal Details
                    </Text>
                    <View className='bg-gray-800 rounded-lg p-4'>
                        <Text className='text-sm mb-2 text-white font-psemibold'>
                            Gender: <Text className='text-xs text-gray-400'>{gender}</Text>
                        </Text>
                        <Text className='text-sm mb-2 text-white font-psemibold'>
                            Date of Birth: <Text className='text-xs text-gray-400'>{dateOfBirth}</Text>
                        </Text>
                        <Text className='text-sm mb-2 text-white font-psemibold'>
                            Blood Group: <Text className='text-xs text-gray-400'>{bloodGroup}</Text>
                        </Text>
                        <Text className='text-sm mb-2 text-white font-psemibold'>
                            PAN No: <Text className='text-xs text-gray-400'>{panNumber}</Text>
                        </Text>
                        <Text className='text-sm mb-2 text-white font-psemibold'>
                            Father's Name: <Text className='text-xs text-gray-400'>{fatherName}</Text>
                        </Text>
                        <Text className='text-sm mb-2 text-white font-psemibold'>
                            Mother's Name: <Text className='text-xs text-gray-400'>{motherName}</Text>
                        </Text>
                        <Text className='text-sm mb-2 text-white font-psemibold'>
                            Marital Status: <Text className='text-xs text-gray-400'>{maritalStatus}</Text>
                        </Text>
                    </View>
                </View>

                <View>
                    <Text className='text-lg font-psemibold text-white mb-3 text-center'>
                        Official Details
                    </Text>
                    <View className='bg-gray-800 rounded-lg p-3'>
                        <Text className='text-sm mb-1 text-white font-psemibold'>
                            CIT No: <Text className='text-gray-400 text-xs'>{citNumber}</Text>
                        </Text>
                        <Text className='text-sm mb-1 text-white font-psemibold'>
                            SSF No: <Text className='text-gray-400 text-xs'>{ssfNumber}</Text>
                        </Text>
                        <Text className='text-sm mb-1 text-white font-psemibold'>
                            Citizen Number: <Text className='text-gray-400 text-xs'>{citizenshipNumber}</Text>
                        </Text>
                        <Text className='text-sm mb-1 text-white font-psemibold'>
                            Role: <Text className='text-gray-400 text-xs'>{role}</Text>
                        </Text>
                        <Text className='text-sm mb-1 text-white font-psemibold'>
                            Department: <Text className='text-gray-400 text-xs'>{department}</Text>
                        </Text>
                        <Text className='text-sm mb-1 text-white font-psemibold'>
                            Designation: <Text className='text-gray-400 text-xs'>{designation}</Text>
                        </Text>
                        <Text className='text-sm mb-1 text-white font-psemibold'>
                            Reporting Manager: <Text className='text-gray-400 text-xs font-normal'>{reportingManager}</Text>
                        </Text>
                        <Text className='text-sm mb-1 text-white font-psemibold'>
                            Joined Date: <Text className='text-gray-400 text-xs'>{new Date(joinedDate)?.toLocaleDateString() || ''}</Text>
                        </Text>
                        <Text className='text-sm mb-1 text-white font-psemibold'>
                            Working Shift: <Text className='text-gray-400 text-xs'>{shift}</Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile