import { icons } from '@/constants';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, ImageSourcePropType, Text, View } from 'react-native';

const TabIcon = ({ focused, title, icon }: { icon: ImageSourcePropType, title: string, focused: boolean }) => (
  <View className={`flex flex-row justify-center items-center rounded-full ${focused ? 'bg-[#eeeeee]' : 'bg-[#eeeeee]'}`}>
    <View
      className={`rounded-full  w-12 h-12 items-center justify-center ${focused ? 'bg-[#f59e0b]' : ''}`}
    >
      <Image
        source={icon}
        tintColor={'white'}
        resizeMode='contain'
        className='w-7 h-7'
      />
    </View>
  </View>
)


export default function TabLayout() {
  return (
    <Tabs
      initialRouteName='home'
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#202d4c',
          borderRadius: 50,
          paddingBottom: 0,
          overflow: 'hidden',
          marginHorizontal: 20,
          marginBottom: 20,
          height: 70,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          position: 'absolute',
          // Remove the shadow and border
          elevation: 0, // for Android
          shadowOpacity: 0, // for iOS
          borderTopWidth: 0, // removes border in some cases
        }
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon
            focused={focused}
            title='Home'
            icon={icons.Home}
          />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon
            focused={focused}
            title='Explore'
            icon={icons.Profile}
          />,
        }}
      />
    </Tabs>
  );
}

