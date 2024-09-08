import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { icons } from '@/constants'

const GoogleAuthButton = () => {
    return (
        <View className='w-full flex flex-row gap-4 justify-center'>
            <TouchableOpacity
                onPress={() => router.push('/(root)/(tabs)/home')}
                className='flex w-[50px] h-[50px] bg-neutral-800 justify-center items-center  border rounded-full border-neutral-400'
            >
                <Image
                    source={icons.Google}
                    className='w-[30px] h-[30px]'
                    resizeMode='contain'
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => router.push('/(root)/(tabs)/home')}
                className='flex w-[50px] h-[50px] bg-neutral-800 justify-center items-center  border rounded-full border-neutral-400'
            >
                <Image
                    source={icons.Facebook}
                    className='w-[25px] h-[30px]'
                    resizeMode='contain'
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => router.push('/(root)/(tabs)/home')}
                className='flex w-[50px] h-[50px] bg-neutral-800 justify-center items-center  border rounded-full border-neutral-400'
            >
                <Image
                    source={icons.Instagram}
                    className='w-[25px] h-[30px]'
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
    )
}

export default GoogleAuthButton