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

    const { gender, dateOfBirth, userId, imageUrl, bloodGroup,
        panNumber, fatherName, motherName, maritalStatus
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
                        DRM ID: {userId}
                    </Text>
                    <Text className='text-sm font-pmedium text-gray-300 mb-3'>
                        {email}
                    </Text>
                </View>
            </View>
            <ScrollView className='flex-1 px-4'>
                <View className='mb-6'>
                    <Text className='text-xl font-psemibold text-white mb-4 text-center'>
                        Personal Details
                    </Text>
                    <View className='bg-gray-800 rounded-lg p-4'>
                        <Text className='text-base font-pmedium text-gray-100 mb-2'>
                            Gender: <Text className='font-normal'>{gender}</Text>
                        </Text>
                        <Text className='text-base font-pmedium text-gray-100 mb-2'>
                            Date of Birth: <Text className='font-normal'>{dateOfBirth}</Text>
                        </Text>
                        <Text className='text-base font-pmedium text-gray-100 mb-2'>
                            Blood Group: <Text className='font-normal'>{bloodGroup}</Text>
                        </Text>
                        <Text className='text-base font-pmedium text-gray-100 mb-2'>
                            PAN No: <Text className='font-normal'>{panNumber}</Text>
                        </Text>
                        <Text className='text-base font-pmedium text-gray-100 mb-2'>
                            Father's Name: <Text className='font-normal'>{fatherName}</Text>
                        </Text>
                        <Text className='text-base font-pmedium text-gray-100 mb-2'>
                            Mother's Name: <Text className='font-normal'>{motherName}</Text>
                        </Text>
                        <Text className='text-base font-pmedium text-gray-100 mb-2'>
                            Marital Status: <Text className='font-normal'>{maritalStatus}</Text>
                        </Text>
                    </View>
                </View>

                <View>
                    <Text className='text-xl font-psemibold text-white mb-4 text-center'>
                        Official Details
                    </Text>
                    <View className='bg-gray-800 rounded-lg p-4'>
                        <Text className='text-base font-pmedium text-gray-100 mb-2'>
                            CIT No: <Text className='font-normal'>{citNumber}</Text>
                        </Text>
                        <Text className='text-base font-pmedium text-gray-100 mb-2'>
                            SSF No: <Text className='font-normal'>{ssfNumber}</Text>
                        </Text>
                        <Text className='text-base font-pmedium text-gray-100 mb-2'>
                            Citizen Number: <Text className='font-normal'>{citizenshipNumber}</Text>
                        </Text>
                        <Text className='text-base font-pmedium text-gray-100 mb-2'>
                            Role: <Text className='font-normal'>{role}</Text>
                        </Text>
                        <Text className='text-base font-pmedium text-gray-100 mb-2'>
                            Department: <Text className='font-normal'>{department}</Text>
                        </Text>
                        <Text className='text-base font-pmedium text-gray-100 mb-2'>
                            Designation: <Text className='font-normal'>{designation}</Text>
                        </Text>
                        <Text className='text-base font-pmedium text-gray-100 mb-2'>
                            Reporting Manager:
                            <Text className='font-normal'>
                                {reportingManager}
                            </Text>
                        </Text>
                        <Text className='text-base font-pmedium text-gray-100 mb-2'>
                            Joined Date: <Text className='font-normal'>
                                {joinedDate || new Date(joinedDate)?.toLocaleDateString()}
                            </Text>
                        </Text>
                        <Text className='text-base font-pmedium text-gray-100 mb-2'>
                            Working Shift: <Text className='font-normal'>{shift}</Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile