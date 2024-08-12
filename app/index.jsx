import { Image, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {
    // const { isLoading, isLoggedIn } = useGlobalContext();
    // if (!isLoading && isLoggedIn) return <Redirect href={"/home"} />

    // const openLinkedInProfile = () => {
    //     const url = 'https://www.linkedin.com/in/paras-maharjan-7b910583/';
    //     Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
    // };

    return (
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className='w-full justify-center items-center min-h-[85vh] px-4'>
                    <Image
                        source={images.logo}
                        className='w-[130px] h-[84px]'
                        resizeMode='contain'
                    />
                    <Image
                        source={images.cards}
                        className='max-w-[380px] w-full h-[300px]'
                        resizeMode='contain'
                    />
                    <View className='relative mt-5'>
                        <Text className='text-3xl text-white text-center font-bold'>
                            Discover Endless Possibilities with{' '}
                            <Text className='text-secondary-200'>Paras</Text>
                        </Text>
                        <Image
                            source={images.path}
                            className='w-[136px] h-[15px] absolute -bottom-2 -right-8'
                            resizeMode='contain'
                        />
                    </View>
                    <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>
                        Deerhold DRM App — Your Solution for Mobile Attendance
                    </Text>
                    <Text className='text-base text-gray-300'>
                        © {new Date().getFullYear()} Paras. All rights reserved.
                    </Text>
                    <CustomButton
                        title={"Continue with Email"}
                        handlePress={() => { router.push('/sign-in') }}
                        containerStyles='w-full mt-7'
                    />
                </View>
            </ScrollView>
            <StatusBar backgroundColor='#161622' style='light' />
        </SafeAreaView>
    );
}