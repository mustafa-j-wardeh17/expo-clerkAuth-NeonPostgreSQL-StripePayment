import { useAuth } from "@clerk/clerk-expo";
import { useStripe } from "@stripe/stripe-react-native";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

import CustomButton from "@/components/CustomButton";
import { fetchAPI } from "@/lib/fetch";

declare interface PaymentProps {
    fullName: string;
    email: string;
    amount: string;
}

const Payment = ({
    fullName,
    email,
    amount,
}: PaymentProps) => {

    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    // const { userId } = useAuth();
    const [success, setSuccess] = useState<boolean>(false);

    const openPaymentSheet = async () => {
        await initializePaymentSheet();

        const { error } = await presentPaymentSheet();

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            setSuccess(true);
        }
    };

    const initializePaymentSheet = async () => {
        const { error } = await initPaymentSheet({
            merchantDisplayName: "Example, Inc.",
            intentConfiguration: {
                mode: {
                    amount: parseInt(amount) * 100,
                    currencyCode: "usd",
                },
                confirmHandler: async (
                    paymentMethod,
                    shouldSavePaymentMethod,
                    intentCreationCallback,
                ) => {
                    const { paymentIntent, customer } = await fetchAPI(
                        "/(api)/(stripe)/create",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                name: fullName || email.split("@")[0],
                                email: email,
                                amount: amount,
                                paymentMethodId: paymentMethod.id,
                            }),
                        },
                    );

                    if (paymentIntent.client_secret) {
                        const { result } = await fetchAPI("/(api)/(stripe)/pay", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                payment_method_id: paymentMethod.id,
                                payment_intent_id: paymentIntent.id,
                                customer_id: customer,
                            }),
                        });
                        if (result.client_secret) {
                            intentCreationCallback({
                                clientSecret: result.client_secret
                            })
                        }

                    }

                },
            },
            returnURL: "myapp://book-ride",
        });

        if (!error) {
            // setLoading(true);
        }
    };

    return (
        <View className="flex-1 w-full">
            <CustomButton
                label="Checkout"
                onPress={openPaymentSheet}
            />

            <ReactNativeModal
                isVisible={success}
                onBackdropPress={() => setSuccess(false)}
            >
                <View className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
                    {/* <Image source={images.check} className="w-28 h-28 mt-5" /> */}

                    <Text className="text-2xl text-center font-JakartaBold mt-5">
                        Booking placed successfully
                    </Text>

                    <Text className="text-md text-general-200 font-JakartaRegular text-center mt-3">
                        Thank you for your booking. Your reservation has been successfully
                        placed. Please proceed with your trip.
                    </Text>

                    <CustomButton
                        label="Back Home"
                        onPress={() => {
                            setSuccess(false);
                            router.push("/(root)/(tabs)/home");
                        }}

                    />
                </View>
            </ReactNativeModal>
        </View>
    );
};

export default Payment;