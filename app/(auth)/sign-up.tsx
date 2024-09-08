import { View, Text, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import GoogleAuthButton from '@/components/GoogleAuthButton';
import { images } from '@/constants';
import AuthInput from '@/components/AuthInput';

const SignUp = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleInputChange = (field: string, value: string) => {
        setUser((prev) => ({ ...prev, [field]: value }));
    };

    const onSignUpPress = async () => {
        router.push('/(auth)/sign-in');
    };

    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                backgroundColor: '#fcc028ee',
                paddingHorizontal: 24,
                paddingVertical: 32
            }}

            className="bg-gradient-to-b from-yellow-400 to-yellow-300"
        >
            <View className="flex-1 justify-center px-6 py-12">
                {/* Header */}
                <View className="mb-12 items-center">
                    <Image source={images.NikeImage} className="w-24 h-9" resizeMode='contain' />
                    <Text className="text-4xl font-bold text-white mt-6">Sign Up</Text>
                </View>

                {/* Form */}
                <View className="bg-white rounded-lg shadow-lg p-8">
                    <AuthInput
                        value={user.name}
                        label={'Full Name'}
                        placeholder={'Name'}
                        secure={false}
                        onChangeText={(value) => handleInputChange('name', value)}
                    />
                    <AuthInput
                        value={user.email}
                        label={'Email'}
                        placeholder={'Email'}
                        secure={false}
                        onChangeText={(value) => handleInputChange('email', value)}
                    />
                    <AuthInput
                        value={user.password}
                        label={'Password'}
                        placeholder={'Create Password'}
                        secure={true}
                        onChangeText={(value) => handleInputChange('password', value)}
                    />

                    <View className="mt-6">
                        <CustomButton
                            label='Sign Up'
                            onPress={onSignUpPress}
                            textStyle="text-yellow-600"
                            buttonStyle="bg-white border border-yellow-600"
                        />
                        <Text className="text-center text-gray-600 mt-4 text-sm">
                            By Signing Up, you agree to our{' '}
                            <Text className="text-yellow-600 font-semibold">Terms</Text> &{' '}
                            <Text className="text-yellow-600 font-semibold">Privacy Policy</Text>
                        </Text>
                        <Text className='text-center text-gray-600 mt-3 text-sm'>
                            or
                        </Text>
                    </View>
                    {/* Google Auth Button */}
                    <View className="my-3">
                        <GoogleAuthButton />
                    </View>

                    {/* Footer */}
                    <View className="flex-row justify-center mt-6">
                        <Text className="text-gray-600 text-sm">
                            Already have an account?{' '}
                            <Link href={'/(auth)/sign-in'} className="text-yellow-600 font-bold">
                                Login
                            </Link>
                        </Text>
                    </View>
                </View>


            </View>
        </ScrollView>
    );
};

export default SignUp;
