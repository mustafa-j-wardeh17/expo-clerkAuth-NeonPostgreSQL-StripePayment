import { View, Text, KeyboardAvoidingView, Platform, Keyboard, TextInput, TouchableWithoutFeedback } from 'react-native';
import React from 'react';

interface CustomInputProps {
  label: string;
  placeholder: string;
  secure: boolean;
  onChangeText: (value: string) => void; // Corrected type definition
  value: string;
}

const CustomInput = ({ label, secure, value, placeholder, onChangeText }: CustomInputProps) => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* Keyboard.dismiss to close keyboard when click out of it */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text className={`text-lg font-JakartaSemiBold mb-3`}>
            {label}
          </Text>
          <View className={`flex shadow-sm flex-row justify-start items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500`}>
            <TextInput
              className={`rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1 text-left`}
              secureTextEntry={secure}
              value={value}
              onChangeText={onChangeText}
              placeholder={placeholder}
              placeholderTextColor={'#797979'}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CustomInput;
