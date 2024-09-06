import { Link, Stack } from 'expo-router';
import {Text, View } from 'react-native';



export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center">
        <Text>
          This Screen doesn't exist.
        </Text>
        <Link href={'/(auth)/sign-in'} className='font-bold'>
          <Text>Go To Home Page</Text>
        </Link>
      </View>
    </>
  );
}

