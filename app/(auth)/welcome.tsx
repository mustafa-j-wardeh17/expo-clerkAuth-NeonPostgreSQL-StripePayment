import { View, Text, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import Swiper from 'react-native-swiper'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const Welcome = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const isLastSlide = activeIndex === 2
  const swiperRef = useRef<Swiper>(null)

  const handleButton = () => {
    isLastSlide
      ? router.replace("/(auth)/sign-up")
      : swiperRef.current?.scrollBy(1)

  }
  return (
    <SafeAreaView className="flex h-full p-3 items-center pb-6 justify-between bg-white">
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-in");
        }}
        className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-black text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        <View className='flex-1 justify-center items-center bg-[#9DD6EB]'>
          <Text className='text-[#fff] text-[30px] font-bold' >Hello Swiper</Text>
        </View>
        <View className='flex-1 justify-center items-center bg-[#97CAE5]'>
          <Text className='text-[#fff] text-[30px] font-bold'>Beautiful</Text>
        </View>
        <View className='flex-1 justify-center items-center bg-[#92BBD9]'>
          <Text className='text-[#fff] text-[30px] font-bold' >And simple</Text>
        </View>
      </Swiper>
      <TouchableOpacity
        onPress={handleButton}
        className='w-11/12 mt-8 mb-12 flex items-center justify-center py-3 rounded-full bg-sky-500'
      >
        <Text className='font-bold text-white text-2xl'>
          {
            isLastSlide ? "Get Started" : "Next"
          }
        </Text>

      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Welcome