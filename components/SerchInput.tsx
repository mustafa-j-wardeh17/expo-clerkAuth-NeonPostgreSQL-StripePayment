
import { View, Text, KeyboardAvoidingView, Platform, Keyboard, TextInput, TouchableWithoutFeedback, Image } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { icons } from '@/constants';



interface CustomInputProps {
  placeholder: string;
  onChangeText: (value: string) => void; // Corrected type definition
  value: string;
}

const SearchInput = ({ value, placeholder, onChangeText }: CustomInputProps) => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* Keyboard.dismiss to close keyboard when click out of it */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full px-6">
          <View className={`flex relative  flex-row p-4 justify-between items-center  bg-white rounded-2xl shadow-md shadow-neutral-300 border border-neutral-100 focus:border-primary-500`}>
            <TextInput
              className={`rounded-full  font-JakartaSemiBold text-[15px] flex-1 text-left`}
              value={value}
              onChangeText={onChangeText}
              placeholder={placeholder}
              placeholderTextColor={'#797979'}
            />
            <View className='absolute right-4 top-1/2 transform items-center justify-center translate-y-1/2  h-[30px]'>
              <Image source={icons.Search} className='w-[28px] h-[28px]' resizeMode='contain' />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SearchInput;
