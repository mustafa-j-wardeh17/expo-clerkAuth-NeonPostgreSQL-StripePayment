import { Redirect } from "expo-router";

const Page = () => {
    // const { isSignedIn } = useAuth()
    const isSignedIn = true
    if (isSignedIn) {
        return <Redirect href="/(root)/(tabs)/home" />
    }
    return <Redirect href="/(auth)/welcome" />;
}

export default Page