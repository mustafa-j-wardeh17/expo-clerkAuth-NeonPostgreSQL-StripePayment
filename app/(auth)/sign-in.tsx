import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import GoogleAuthButton from '@/components/GoogleAuthButton';

const SignIn = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Function to handle input changes
  const handleInputChange = (field: string, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }))
  };

  const handleSignIn = async () => {
    router.push('/(root)/(tabs)/home')
  }
  return (
    <ScrollView className='flex-1 relative '>
      <View className="p-3 justify-end bg-gray-200 w-full h-[200px]">
        <Text className="text-3xl font-extrabold">Welcome 👋</Text>
      </View>
      <View className="flex flex-col p-4">

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

        <CustomButton
          label='Sign In'
          onPress={handleSignIn}
        />
      </View>
      <View className='h-[2px] w-full bg-slate-200' />
      <GoogleAuthButton />

    </ScrollView>
  )
}

export default SignIn