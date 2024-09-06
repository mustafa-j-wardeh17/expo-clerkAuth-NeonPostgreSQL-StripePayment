import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
interface CustomButtonProps {
    label: string;
    onPress: () => void
}
const CustomButton = ({ label, onPress }: CustomButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className='bg-sky-500 w-full max-w-[250px] py-3 my-3 rounded-full shadow-md flex items-center justify-center'
        >
            <Text className='text-white font-bold text-lg '>{label}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton