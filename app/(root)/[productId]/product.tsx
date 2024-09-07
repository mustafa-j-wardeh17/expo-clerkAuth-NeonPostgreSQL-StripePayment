import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, SimpleLineIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { images } from '@/constants';
import Payment from '@/components/Payment';
import { StripeProvider } from '@stripe/stripe-react-native';
import Swiper from 'react-native-swiper';
import { useFetch } from '@/lib/fetch';

const Product = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const isLastSlide = activeIndex === 2
    const swiperRef2 = useRef<Swiper>(null)

    // Handle onIndexChanged to update activeIndex properly
    const handleIndexChange = (index: number) => {
        // Assuming you have 3 slides
        const actualIndex = index % 3; // Modulo to keep within slide bounds
        setActiveIndex(actualIndex);
    };
    const { productId: id } = useLocalSearchParams<{ productId: string }>();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [like, setLike] = useState(false);
    const rate = 4;
    const [selectedSize, setSelectedSize] = useState<number | null>(null);
    const sizes = [5, 5.5, 6, 6.5, 7];
    const { data: product, loading, error } = useFetch(`/(api)/product/${id}`)
    console.log(error, loading, product )
    // Function to return star rating
    const rating = () => {
        return Array.from({ length: 5 }).map((_, index) => (
            <AntDesign
                key={index}
                name="star"
                size={24}
                color={index < rate ? '#f59e0b' : 'gray'}
            />
        ));
    };

    // Generating Size Options
    const sizeList = sizes.map((size, index) => (
        <TouchableOpacity
            key={`Size - ${size}`}
            onPress={() => setSelectedSize(index)}
            className={`flex items-center justify-center rounded-xl w-[60px] h-[60px] border-[2px] border-[#362d4d] ${selectedSize === index ? 'bg-[#362d4d] ' : ''
                }`}
        >
            <Text
                className={`${selectedSize !== index ? 'text-[#362d4d]' : 'text-[#b9b527]'
                    } text-lg font-bold`}
            >
                {size}
            </Text>
        </TouchableOpacity>
    ));

    return (
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
            <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}>

                <SafeAreaView className=" flex-1">
                    {/* Header Section */}
                    <View className="flex-row px-6 items-center justify-between w-full">
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="chevron-back" size={28} color="black" />
                        </TouchableOpacity>
                        <Image
                            source={images.NikeImage}
                            className="w-[120px] h-[60px]"
                            resizeMode="contain"
                        />
                        <Feather name="shopping-bag" size={28} color="gray" />
                    </View>

                    {/* Product Image Section */}
                    <View className="relative w-full h-[240px]">
                        <View className="absolute px-6 z-10 flex flex-row items-center justify-between top-0 left-0 w-full">
                            <View className="bg-amber-500 rounded-md shadow-sm flex justify-center items-center w-[70px] px-2 py-1">
                                <Text className="font-bold text-blue-950">Sale</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => setLike((prev) => !prev)}
                                className="w-[40px] h-[40px] items-center justify-center"
                            >
                                <AntDesign name="heart" size={24} color={like ? 'red' : 'gray'} />
                            </TouchableOpacity>
                        </View>
                        {/* <View className="w-full items-center justify-center">
                            <Image
                                source={images.Jordan2}
                                className="w-[300px] h-[200px] rounded-xl"
                                resizeMode="cover"
                            />
                        </View> */}
                        {/* Swiper */}
                        <View className="w-full items-center justify-center flex-1">
                            <Swiper
                                ref={swiperRef2}
                                loop={true}
                                // dot={
                                //     <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
                                // }
                                // activeDot={
                                //     <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
                                // }
                                showsPagination={false}

                                onIndexChanged={(index) => setActiveIndex(index)}
                            >
                                <View className="flex-1 justify-center items-center ">
                                    <Image
                                        source={images.Jordan2}
                                        className="w-[300px] mb-5 rounded-xl"
                                        resizeMode="contain"
                                    />
                                </View>
                                <View className="flex-1 justify-center items-center ">
                                    <Image
                                        source={images.Jordan2}
                                        className="w-[300px] mb-5 rounded-xl"
                                        resizeMode="contain"
                                    />
                                </View>
                                <View className="flex-1 justify-center items-center ">
                                    <Image
                                        source={images.Jordan2}
                                        className="w-[300px] mb-5 rounded-xl"
                                        resizeMode="contain"
                                    />
                                </View>
                            </Swiper>
                        </View>

                    </View>

                    {/* Bottom Sheet for Product Details */}
                    <BottomSheet
                        ref={bottomSheetRef}
                        snapPoints={['60%']}
                        index={0}
                        backgroundStyle={{ borderRadius: 20 }}
                    >
                        <BottomSheetView style={{ padding: 20 }}>
                            {/* Product Details Content */}
                            <View className="flex w-full space-y-4">
                                <View className="w-full">
                                    <View className="flex flex-row items-center justify-between">
                                        <Text className="text-2xl font-bold">Product {id}</Text>
                                        <View className="flex flex-row space-x-1">{rating()}</View>
                                    </View>
                                    <Text className="text-base text-neutral-400 mt-2">
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                        Aperiam itaque ad minus quisquam eligendi libero, doloribus
                                        veritatis molestias, quaerat tempore consequuntur. Corrupti
                                        placeat soluta voluptas dolore asperiores minima, ducimus
                                        esse!
                                    </Text>
                                </View>
                                <View className="flex flex-col space-y-2">
                                    <Text className="text-xl font-bold">Size</Text>
                                    <View className="flex flex-row space-x-1">{sizeList}</View>
                                </View>
                            </View>
                            <View className="h-[200px] justify-end ">
                                <Payment
                                    amount='20'
                                    email='mostafa.wardeh2000@gmail.com'
                                    fullName='Mustafa Abu Wardeh'
                                />
                            </View>
                        </BottomSheetView>
                    </BottomSheet>
                </SafeAreaView>
            </StripeProvider>

        </GestureHandlerRootView>
    );
};

export default Product;
