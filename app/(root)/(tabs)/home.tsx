import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  Touchable
} from 'react-native';
import { router } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import SearchInput from '@/components/SerchInput';
import AntDesign from '@expo/vector-icons/AntDesign';
import { images } from '@/constants';
import { useFetch } from '@/lib/fetch';
interface Product {
  product_id: string; // Unique identifier for the product
  title: string; // Title of the product
  description: string; // Description of the product
  thumbnail: string; // URL of the thumbnail image
  images: string[]; // Array of image URLs
  rate: number; // Rating of the product
  sizes: number[]; // Array of available sizes
  price: number; // Price of the product
}

const Home = () => {
  // const { user } = useUser();
  // const { isSignedIn, signOut } = useAuth();
  const [search, setSearch] = useState('')



  const handleSignOut = () => {
    // if (isSignedIn) {
    //   signOut();
    // }
    router.replace('/(auth)/sign-in');
  };

  return (
    <ScrollView>
      <View className="bg-neutral-100 pt-12 space-y-6 flex-1">
        <View className=' w-full'>
          <View className=" w-full px-6  items-center justify-between flex flex-row ">
            <SimpleLineIcons name="menu" size={24} color="gray" />
            <Image
              source={images.NikeImage}
              className="w-[120px] h-[60px]"
              resizeMode="contain"
            />
            <Feather name="shopping-bag" size={24} color="gray" />
          </View>
          <SearchInput
            value={search}
            onChangeText={(text) => setSearch(text)}
            placeholder='Search'
          />
          <View className='w-full  relative items-center justify-center '>
            <Image
              source={images.Jordan3}
              className="w-[140px] absolute right-[50px] top-[80px] -rotate-[135deg] h-[70px]"
              resizeMode="contain"
            />
            <View className='w-full rotate-[35deg] mt-[100px]'>
              <Image
                source={images.Jordan3}
                className="w-[320px] h-[160px] shadow-lg  "
                resizeMode="contain"
              />
            </View>


          </View>
          <View className='w-full px-6 items-start mt-[30px]'>
            <Text className='text-[55px] font-bold'>Nike</Text>
            <Text className='text-[50px] text-neutral-400'>Collection</Text>
          </View>
        </View>
        <View className='gap-2'>
          <View className='px-6'>
            <Text className='text-2xl font-bold'>On Trend</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mb-[120px]' contentContainerStyle={{ gap: 20, paddingHorizontal: 20 }}>
            {
              [1, 2, 3, 4, 5, 6, 7].map((item) => (
                <TouchableOpacity key={item} onPress={() => router.push(`/(root)/${item}/product`)} className="w-[180px] space-y-3  items-center justify-center ">
                  <View className='relative mt-[40px] rounded-xl h-[180px] w-full bg-[#0b1a3b] shadow-sm justify-end shadow-neutral-700 '>
                    <View className='w-full absolute flex-1 items-center transform -top-[10px]  '>
                      <Image
                        source={images.Jordan3}
                        className="w-[180px] h-[120px] shadow-lg  rotate-[30deg]"
                        resizeMode="contain"
                      />
                    </View>
                    {
                      item % 2 === 0 && (
                        <View className="bg-amber-500 absolute top-[50%] -left-[14px]   rounded-md shadow-sm flex justify-center items-center w-[50px] px-2 py-1">
                          <Text className="font-bold text-blue-950">Sale</Text>
                        </View>
                      )
                    }
                    <View className='flex  flex-row p-4  items-center justify-between w-full'>
                      <View className='flex flex-row'>
                        <View className='justify-start'>
                          <Text className='text-[20px] text-amber-500 font-bold'>$</Text>
                        </View>
                        <Text className='text-[40px] text-white font-bold'>329</Text>
                      </View>
                      <View className='justify-end'>
                        <AntDesign name="heart" size={18} color="red" />
                      </View>
                    </View>
                  </View>
                  <Text className="text-2xl text-[#2e224f]/90 font-bold mb-2">Component {item}</Text>
                </TouchableOpacity>
              ))
            }
          </ScrollView>
        </View>
      </View >
    </ScrollView >
  );
};

export default Home;
