import { Link, Stack } from 'expo-router';
import { StyleSheet, Text } from 'react-native';


export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Link href="/main" className='my-2'>
        <Text >Go to home screen!</Text>
      </Link>
    </>
  );
}

