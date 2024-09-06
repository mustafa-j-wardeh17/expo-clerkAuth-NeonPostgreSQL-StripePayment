import React, { useState } from 'react';
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
              source={images.Jordan4}
              className="w-[120px] absolute right-[50px] top-[100px] -rotate-[290deg] h-[150px]"
              resizeMode="cover"
            />
            <View className='w-full rotate-45 mt-[100px]'>
              <Image
                source={images.Jordan3}
                className="w-[400px] h-[200px] shadow-lg  "
                resizeMode="cover"
              />
            </View>


          </View>
          <View className='w-full px-6 items-start my-[30px]'>
            <Text className='text-[40px] font-bold'>Nike</Text>
            <Text className='text-[40px] text-neutral-600'>Collections</Text>
          </View>
        </View>
        <View className='gap-4'>
          <View className='px-6'>
            <Text className='text-2xl font-bold'>On </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mb-[120px]' contentContainerStyle={{ gap: 20, paddingHorizontal: 20 }}>
            {
              [1, 2, 3, 4, 5].map((item) => (
                <TouchableOpacity key={item} onPress={() => router.push(`/(root)/${item}/product`)} className="w-[180px]  h-[250px] items-center justify-center ">
                  <View className='relative mt-[40px] space-y-2 rounded-xl p-5 h-[180px] w-full bg-[#2e224f] justify-end shadow-sm '>
                    <View className='w-full absolute left-0 -translate-x-1/2 top-0 rotate-45 '>
                      <Image
                        source={images.Jordan3}
                        className="w-[150px] h-[80px] shadow-lg  "
                        resizeMode="cover"
                      />
                    </View>
                    <View className='flex  flex-row items-center justify-between w-full'>
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
                  <Text className="text-lg text-[#2e224f] font-bold mb-2">Component {item}</Text>
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
