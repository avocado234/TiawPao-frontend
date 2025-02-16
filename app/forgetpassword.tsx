import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, useColorScheme, Button, Alert } from "react-native";
import { router, Link } from 'expo-router'
import { ThemedView } from '@/components/ThemedView';
import { XStack, YStack } from 'tamagui';
import { ThemedText } from '@/components/ThemedText';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedPressableBackButton } from '@/components/ThemedPressableBackButton';
import ThemedTextInput from '@/components/ThemedTextInput';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
import api from '@/utils/axiosInstance';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useForgetStore } from '@/store/useForgetStore';

export default function ForgetPassword() {
    const [timer, setTimer] = useState<number>(35);
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const { setForgetData } = useForgetStore();
    

    const theme = useColorScheme()
    const resetPassword = async (email:string) => {
            const auth = getAuth();
            
            try {                
                await sendPasswordResetEmail(auth, email);
                console.log("Reset email sent successfully");
                alert("Check your email for the reset link.");
            } catch (error) {
                console.error("Error sending reset email:", (error as any).message);
                alert((error as Error).message);
            }
        };

    const validateEmailFormat = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };



    return (
        <ThemedSafeAreaView>
            <ThemedView className="mt-[-40px] flex justify-stretch items-center h-screen relative px-10">
                <ThemedPressableBackButton />
                <View className='mt-[150px] items-center'>
                    <YStack className="w-[80%] mt-[50px]">
                        <ThemedText className="mt-[30px] text-3xl font-bold text-[#203B82] mb-3">Forgot Password</ThemedText>
                        <ThemedText className={`${theme == 'dark' ? `text-gray-400` : `text-gray-500`}  mt-2 mb-5 text-lg`}>
                            {/* Please enter the 4-digit verification code sent to {email} */}
                            {/* No worries! Just enter your email below, and
                            we'll send you a link to reset your password. */}
                            No problem. Just enter your email address 
                            below - we’ll send a link to reset your password for your email.
                        </ThemedText>
                        {/* <ThemedText className='mb-10 text-lg'>Didn't receive Email?
                            <Pressable disabled={timer !== 0} onPress={() => setTimer(35)} className="mt-2">
                                <Text className={`${timer === 0 ? `` : `text-gray-500`} ${theme == 'dark' ? `text-blue-400` : `text-blue-700`} ml-3 font-bold text-lg`}>Resend Email</Text>
                            </Pressable>
                        </ThemedText> */}
                    </YStack>
                    <View className="w-[300px] pb-5">
                        <ThemedText className="text-[#203B82] py-2">Email </ThemedText>
                        <ThemedTextInput
                            className="border border-[#203B82] h-[45px]  w-full rounded-3xl px-4 py-2"
                            onChangeText={setEmail}
                            value={email}
                        />
                    </View>
                    {!validateEmailFormat(email) && email.length > 0 && (
                        <ThemedText className="text-red-500 text-md pb-5">Invalid email format!</ThemedText>
                    )}
                    {/* <Pressable
                className=' bg-[#5680EC] w-[300px] h-[50px] flex justify-center items-center rounded-3xl'
                // onPress={handleNext}
            >
                <Text className='text-xl text-white '>Send Email</Text>
            </Pressable> */}
                    <Pressable
                        className={`bg-[#5680EC] w-[300px] h-[50px] flex justify-center items-center rounded-3xl mt-5`}
                        onPress={() => {resetPassword(email)}}
                    >
                        <Text className='text-xl text-white'>
                            Send Email
                        </Text>
                    </Pressable>

                </View>
            </ThemedView>

        </ThemedSafeAreaView>
    );
}

function setTimer(arg0: (prev: any) => number) {
    throw new Error('Function not implemented.');
}
