import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

const Page = () => {
    const { isSignedIn } = useAuth()
    if (isSignedIn) {
        return (
            <Redirect href="/(root)/(tabs)/home" />
        )
    }
    return (
        <Redirect href="/(auth)/welcome" />
    )
    // return (
    //     <View className='flex-1 items-center justify-center'>
    //         <Link href={'/(root)/(tabs)/explore'} >
    //             Home
    //         </Link>
    //     </View>
    // )
}

export default Page