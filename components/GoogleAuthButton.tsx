import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const GoogleAuthButton = () => {
    return (
        <View className='mt-3 px-3'>
            <TouchableOpacity
                onPress={() => router.push('/(root)/(tabs)/home')}
                className='flex py-3 flex-row justify-center items-center  border rounded-full border-neutral-400'
            >
                <Text >icon</Text>
                <Text className='text-lg font-bold'>GoogleAuthButton</Text>
            </TouchableOpacity>
        </View>
    )
}

export default GoogleAuthButton