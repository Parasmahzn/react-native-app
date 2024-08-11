import { View, FlatList, TouchableOpacity, Image, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '../../components/EmptyState';
import { useGlobalContext } from '../../context/GlobalProvider';
import { icons } from '../../constants';
import InfoBox from '../../components/InfoBox';
import { router } from 'expo-router';
import { useUsers } from '../../api/users';

const Profile = () => {
    const { user, setUser, setIsLoggedIn } = useGlobalContext();
    const { data: users } = useUsers();

    const logout = async () => {
        // await signOut();
        setUser(null);
        setIsLoggedIn(false);
        router.replace('/sign-in');
    }

    return (

        <SafeAreaView className='bg-primary  h-full'>
            <View className='flex flex-1 justify-center items-center'>
                <InfoBox
                    title={'Coming Soon'}
                    subtitle="Work in progress"
                    titleStyles='text-xl'
                />
            </View>
        </SafeAreaView>
    )
}

export default Profile