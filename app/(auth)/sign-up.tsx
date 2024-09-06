import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import GoogleAuthButton from '@/components/GoogleAuthButton';

const SignUp = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    // Function to handle input changes
    const handleInputChange = (field: string, value: string) => {
        setUser((prev) => ({ ...prev, [field]: value }));
    };

    const onSignUpPress  = async () => {
        router.push('/(auth)/sign-in')
    }
    return (
        <ScrollView className="flex-1 ">
            <View className="p-3 justify-end bg-gray-200 w-full h-[200px]">
                <Text className="text-3xl font-extrabold">Welcome 👋</Text>
            </View>
            <View className="flex flex-col p-4">
                <CustomInput
                    value={user.name}
                    label={'Full Name'}
                    placeholder={'Enter your name'}
                    secure={false}
                    onChangeText={(value) => handleInputChange('name', value)}
                />
                <CustomInput
                    value={user.email}
                    label={'Email'}
                    placeholder={'Enter your email'}
                    secure={false}
                    onChangeText={(value) => handleInputChange('email', value)}
                />
                <CustomInput
                    value={user.password}
                    label={'Password'}
                    placeholder={'Enter your password'}
                    secure={true}
                    onChangeText={(value) => handleInputChange('password', value)}
                />
                <CustomInput
                    value={user.confirmPassword}
                    label={'Confirm Password'}
                    placeholder={'Confirm your password'}
                    secure={true}
                    onChangeText={(value) => handleInputChange('confirmPassword', value)}
                />
                <CustomButton
                    label='Sign Up'
                    onPress={onSignUpPress}
                />
            </View>
            <View className='h-[2px] my-3 w-full bg-slate-200' />
                <GoogleAuthButton />

        </ScrollView>
    );
};

export default SignUp;
