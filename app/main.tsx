import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { Text, View } from "react-native";

const Main = () => {
    const { isSignedIn } = useAuth()
    if (isSignedIn) {
        return <Redirect href={"/(root)/(tabs)/home"} />
    }
    return <Redirect href="/(auth)/welcome" />;
}

export default Main