import { router } from 'expo-router';
import { View, TouchableOpacity, Image, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';
import { useUsers } from '../../api/users';
import { icons } from '../../constants';

import InfoBox from '../../components/InfoBox';
import Loader from '../../components/Loader';
import ErrorState from '../../components/ErrorState';

const Profile = () => {
    const { user, setUser, setIsLoggedIn } = useGlobalContext();
    const users = useUsers();

    const logout = async () => {
        // await signOut();
        setUser(null);
        setIsLoggedIn(false);
        router.replace('/forgot-password');
    }

    if (users.isLoading)
        return <Loader />;
    if (users.isError)
        return <ErrorState message={users.error.message} />;

    const { userInfo: { designation, fullName } } = users.data;

    return (
        <SafeAreaView className='bg-primary  h-full'>
            <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
                <TouchableOpacity
                    className='w-full items-end mb-10'
                    onPress={logout}
                >
                    <Image
                        source={icons.logout}
                        resizeMode='contain'
                        className='w-6 h-6'
                    />
                </TouchableOpacity>
                <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
                    <Image
                        source={icons.avatar}
                        className='w-[90%] h-[90%] rounded-lg'
                        resizeMode='cover'
                    />
                </View>
                <InfoBox
                    title={fullName}
                    containerStyles='mt-5'
                    titleStyles='text-lg'
                />
                <InfoBox
                    title={designation}
                    containerStyles='mr-1'
                    titleStyles='text-xs'
                />
            </View>
        </SafeAreaView>
    )
}

export default Profile