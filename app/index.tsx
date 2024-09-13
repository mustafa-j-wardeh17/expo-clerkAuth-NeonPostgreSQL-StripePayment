import { useAuth } from "@clerk/clerk-expo";
import { Link, Redirect } from "expo-router";
import { View } from "react-native";

const Page = () => {
    // const { isSignedIn } = useAuth()
    // if (isSignedIn) {
    //     return (
    //         <Redirect href="/(root)/(tabs)/home" />
    //     )
    // }
    // return (
    //     <Redirect href="/(auth)/welcome" />
    // )
    return (
        <View className='flex-1 items-center justify-center'>
            <Link href={'/(root)/(tabs)/explore'} >
                Home
            </Link>
        </View>
    )
}

export default Page