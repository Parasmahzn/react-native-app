import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, Alert, Switch } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SecureStore from 'expo-secure-store';

import { Link, router } from 'expo-router';
import { useLogin } from '../../api/login';
import { useGlobalContext } from '../../context/GlobalProvider';

import { validatePassword } from '../../lib/validations';
import { getCurrentUser } from '../../lib/utils';
import { images } from '../../constants';

import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import ErrorState from '../../components/ErrorState';
import Loader from '../../components/Loader';

const SignIn = () => {
    const { setUser, setIsLoggedIn } = useGlobalContext();

    const { mutateAsync: login, isLoading, error, isError } = useLogin();

    if (isLoading) return <Loader />;
    if (isError) return <ErrorState message={error.message} />;

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const loadCredentials = async () => {
            const storedEmail = await SecureStore.getItemAsync('userEmail');
            const storedPassword = await SecureStore.getItemAsync('userPassword');
            if (storedEmail) {
                setForm(prev => ({ ...prev, email: storedEmail, password: storedPassword }));
                setRememberMe(true);
            }
        };
        loadCredentials();
    }, []);

    const submit = async () => {
        if (!form.email || !form.password) {
            Alert.alert("Error", 'Please fill in all the fields');
            return;
        }
        const { valid, message } = validatePassword(form.password);
        if (!valid) {
            Alert.alert("Password Error", message);
            return;
        }
        setIsSubmitting(true);
        try {
            await login({ ...form });

            if (rememberMe) {
                await SecureStore.setItemAsync('userEmail', form.email);
                await SecureStore.setItemAsync('userPassword', form.password);
            } else {
                await SecureStore.deleteItemAsync('userEmail');
                await SecureStore.deleteItemAsync('userPassword');
            }
            // set it to global state
            const result = await getCurrentUser();
            setUser(result);
            setIsLoggedIn(true);
            router.replace('/home');
        } catch (error) {
            Alert.alert("Error", error.message);
            return;
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView>
                <View className='w-full justify-center min-h-[83vh] px-4 py-6'>
                    <Image
                        source={images.logo}
                        resizeMode='contain'
                        className='w-[115px] h-[35px]'
                    />
                    <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>
                        Log in to DRM
                    </Text>
                    <FormField

                        title='Email'
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles='mt-7'
                        keyboardType='email-address'

                    />
                    <FormField
                        title='Password'
                        value={form.password}
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        otherStyles='mt-7'
                    />
                    <View className='flex-row items-center mt-7'>
                        <Switch
                            value={rememberMe}
                            onValueChange={setRememberMe}
                        />
                        <Text className='text-white ml-3 font-pregular'>Remember Me</Text>
                    </View>
                    <CustomButton
                        title='Sign In'
                        handlePress={submit}
                        containerStyles='mt-7'
                        isLoading={isSubmitting}
                    />
                    <View className='justify-center pt-5 flex-row gap-2'>
                        <Text className='text-lg text-gray-100 font-pregular'>
                            Forgot your password?
                        </Text>
                        <Link href='/forgot-password'
                            className='text-lg font-psemibold text-secondary-100'
                        >
                            Reset here
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn