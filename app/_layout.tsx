import { Slot, Stack } from 'expo-router';
import 'react-native-reanimated';
import * as SecureStore from 'expo-secure-store'
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'

// import { tokenCache } from '@/lib/auth';
import { LogBox, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { tokenCache } from '@/lib/auth';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!



LogBox.ignoreLogs(['Clerk:'])
export default function RootLayout() {

  if (!publishableKey) {
    throw new Error(
      'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
    )
  }

  return (
<<<<<<< HEAD
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(root)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
=======
    // <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
    //   <ClerkLoaded>
    //     <slot />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(root)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
    //   </ClerkLoaded>
    // </ClerkProvider>
>>>>>>> 4491e4e (style sign-in and sign-up pages)
  );
}

