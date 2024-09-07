import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import { useUser } from '@clerk/clerk-expo'

const Explore = () => {
  // const { user } = useUser()
  return (
    <SafeAreaView className='flex-1 items-center justify-center'>
      <Text>Profile</Text>
    </SafeAreaView>
  )
}

export default Explore