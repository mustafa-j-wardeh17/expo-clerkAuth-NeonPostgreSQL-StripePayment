import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
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
import { ProductType } from '@/types/types';

const Product = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [productImages, setProductImages] = useState<string[]>([]);
    const swiperRef2 = useRef<Swiper>(null);
    const { productId: id } = useLocalSearchParams<{ productId: string }>();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [like, setLike] = useState(false);
    const [selectedSize, setSelectedSize] = useState<number | null>(null);
    const { data: product, loading } = useFetch<ProductType>(`/(api)/product/${id}`);

    useEffect(() => {
        if (product?.images) {
            setProductImages(product.images);
            console.log('Product Images:', product.images); // Debugging line
        }
    }, [product]);

    const handleIndexChange = (index: number) => {
        setActiveIndex(index % productImages.length); // Updated to handle any number of slides
    };

    const rating = () => {
        return Array.from({ length: 5 }).map((_, index) => (
            <AntDesign
                key={index}
                name="star"
                size={24}
                color={index < (product?.rate || 0) ? '#f59e0b' : 'gray'}
            />
        ));
    };

    const sizeList = product?.sizes.map((size, index) => (
        <TouchableOpacity
            key={`Size - ${size}`}
            onPress={() => setSelectedSize(index)}
            className={`flex items-center justify-center rounded-xl w-[50px] h-[50px] border-[2px] border-[#362d4d] ${selectedSize === index ? 'bg-[#362d4d] ' : ''}`}
        >
            <Text className={`${selectedSize !== index ? 'text-[#362d4d]' : 'text-amber-600'} text-md font-bold`}>
                {size}
            </Text>
        </TouchableOpacity>
    ));

    return (
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
            <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}>
                {
                    loading ? (
                        <SafeAreaView className='flex-1 items-center justify-center'>
                            <ActivityIndicator size={24} color={'black'} />
                        </SafeAreaView>
                    ) : (
                        <SafeAreaView className="flex-1">
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

                                {/* Swiper */}
                                <View className="w-full items-center justify-center flex-1">
                                    <Swiper
                                        ref={swiperRef2}
                                        loop={true}
                                        showsPagination={false}
                                        onIndexChanged={handleIndexChange}
                                    >
                                        {productImages.length > 0 ? (
                                            productImages.map((image, idx) => (
                                                <View key={idx} className="flex-1  justify-center items-center">
                                                    <Image
                                                        source={{ uri: image }}
                                                        className="w-full h-full mb-5 rounded-xl"
                                                        resizeMode='center'
                                                        onError={() => console.log(`Failed to load image: ${image}`)} // Debugging line
                                                    />
                                                </View>
                                            ))
                                        ) : (
                                            <View className="flex-1 justify-center items-center">
                                                <Text>No images available</Text>
                                            </View>
                                        )}
                                    </Swiper>
                                </View>
                            </View>

                            {/* Bottom Sheet for Product Details */}
                            <BottomSheet
                                ref={bottomSheetRef}
                                snapPoints={['60%']}
                                index={0}
                                backgroundStyle={{ borderRadius: 20, flex: 1 }}
                            >
                                <BottomSheetView style={{ padding: 20, flex: 1 }}>
                                    {/* Product Details Content */}
                                    <View className="flex w-full space-y-4">
                                        <View className="w-full">
                                            <View className="flex flex-row items-center justify-between">
                                                <Text className="text-xl font-bold">{product?.title}</Text>
                                                <View className="flex flex-row space-x-1">{rating()}</View>
                                            </View>
                                            <Text className="text-base text-neutral-400 mt-2">
                                                {product?.description}
                                            </Text>
                                        </View>
                                        <View className="flex flex-col space-y-2">
                                            <Text className="text-lg font-bold">Size</Text>
                                            <View className="flex flex-row flex-wrap gap-2">{sizeList}</View>
                                        </View>
                                    </View>
                                    <View className="flex-1 flex flex-row gap-6 items-end pb-6 ">
                                        <View className='flex flex-row h-[50px]'>
                                            <Text className='text-md text-[#0b1a3b]'>$</Text>
                                            <Text className='text-[38px] text-[#0b1a3b]'>{product?.price}</Text>
                                        </View>
                                        <View className='w-full flex-1 h-[50px]'>
                                            <Payment
                                                amount='20'
                                                email='mostafa.wardeh2000@gmail.com'
                                                fullName='Mustafa Abu Wardeh'
                                            />
                                        </View>
                                    </View>
                                </BottomSheetView>
                            </BottomSheet>
                        </SafeAreaView>
                    )
                }
            </StripeProvider>
        </GestureHandlerRootView>
    );
};

export default Product;
