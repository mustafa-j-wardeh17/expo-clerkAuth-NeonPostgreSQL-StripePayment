import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
interface CustomButtonProps {
    label: string;
    onPress: () => void;
    textStyle?: string;
    buttonStyle?: string;
}
const CustomButton = ({ buttonStyle = 'bg-[#0b1a3b]  ', label, onPress, textStyle = 'text-amber-600' }: CustomButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`${buttonStyle} w-full py-3  rounded-xl shadow-md shadow-neutral-400 flex items-center justify-center`}
        >
            <Text className={`${textStyle} font-bold text-lg`}>{label}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton