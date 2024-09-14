
import CustomInput from "@/components/CustomInput";
import { images } from "@/constants";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const Explore = () => {
  let user
  // const { user } = useUser();

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="px-5 flex flex-1"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text className="text-2xl font-JakartaBold my-5">My profile</Text>
        <Text className="text-lg font-JakartaBold my-5">{'mostafa.wardeh2000@gmail.com'}</Text>

        <View className="flex items-center justify-center my-5">
          <Image
            source={images.NikeImage}
            style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
            className="rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300"
            resizeMode="contain"
          />
        </View>

        <View className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3">
          <View className="flex flex-col items-start justify-start">
            <CustomInput
              label="First name"
              placeholder={"Not Found"}
              value=""
              onChangeText={() => { }}
              secure={false}
            />

            <CustomInput
              label="Last name"
              placeholder={"Not Found"}
              value=""
              onChangeText={() => { }}
              secure={false}
            />

            <CustomInput
              label="Email"
              placeholder={
                 "Not Found"
              }
              value=""
              onChangeText={() => { }}
              secure={false}
            />

            <CustomInput
              label="Phone"
              placeholder={"Not Found"}
              value=""
              onChangeText={() => { }}
              secure={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Explore;