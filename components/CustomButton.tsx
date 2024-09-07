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
            className='bg-[#0b1a3b]  w-full py-3  rounded-xl shadow-md shadow-neutral-400 flex items-center justify-center'
        >
            <Text className='text-amber-600 font-bold text-lg '>{label}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton