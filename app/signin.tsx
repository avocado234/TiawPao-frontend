import React from 'react'
import { useState,useContext } from 'react'
import { View, TextInput, Pressable, Text,Alert } from "react-native";
import { Image } from 'expo-image';
import { router,Link } from 'expo-router'
import { XStack, YStack } from "tamagui";
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedLogo } from '@/components/ThemedLogo';
import ThemedTextInput  from '@/components/ThemedTextInput';
import { Eye, EyeOff } from "@tamagui/lucide-icons"; // Using Tamagui Icons
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "@/config/firebaseconfig";
import api from "@/utils/axiosInstance";

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureText, setSecureText] = useState(true);
    const handelSignIn = async() => {
        try {
            await signInWithEmailAndPassword(auth,email,password)

            Alert.alert("Success","Sign In Success!")
            router.replace("/(tabs)")
        } catch (err) {
            Alert.alert("Error","Sign In Fail Please Try Again")
        }
    }

    return (
        <ThemedView className="flex justify-center items-center h-screen">
            <ThemedLogo />
            <YStack space="$3" alignItems="center" width="100%">

                <View className="w-[70%]">
                    <ThemedText className="text-[#203B82] py-2">Email</ThemedText>
                    <ThemedTextInput
                        className="border border-[#203B82] h-[40px] w-full rounded-3xl px-4 py-2"
                        onChangeText={setEmail}
                        value={email}
                        autoComplete="email"
                    />
                </View>
                <View className="w-[70%]">
                    <ThemedText className="py-2">Password</ThemedText>
                    <View className="relative w-full">

                        <ThemedTextInput
                            className="text-clip h-[40px] overflow-hidden border border-[#203B82] w-full max-w-ful rounded-3xl px-4 py-2 pr-12 "
                            onChangeText={setPassword}
                            value={password}
                            secureTextEntry={secureText}
                            maxLength={28}
                            autoComplete="password"
                        />
                        <Pressable
                            className=" absolute right-4 top-1/2 -translate-y-1/2"
                            onPress={() => setSecureText(!secureText)}
                        >
                            {secureText ? <EyeOff size={20} color="gray" /> : <Eye size={20} color="gray" />}
                        </Pressable>
                    </View>


                    <View className="w-full flex items-end">
                        <Link href="/forgetpassword">
                            <ThemedText className="py-2 font-semibold">Forget password?</ThemedText>
                        </Link>
                    </View>
                </View>
                <Pressable
                    className='bg-[#5680EC] w-[300px] h-[50px] flex justify-center items-center rounded-3xl'
                    onPress={handelSignIn}
                >
                    <Text className='text-xl text-white'>SIGN IN</Text>
                </Pressable>

                <ThemedText className="py-2 font-semibold"> or sign in with</ThemedText>
                <Pressable
                    className="bg-white w-[300px] border border-[#203B82] h-[50px] flex flex-row justify-center items-center rounded-3xl"
                    onPress={() => router.push("/(tabs)/plan")}
                >
                    <Image
                        source={require("../assets/images/devicon_google.png")}
                        style={{ width: 24, height: 24, marginRight: 10 }}

                    />
                    <Text className="text-lg text-[#203B82]">SIGN IN WITH GOOGLE</Text>
                </Pressable>
                <XStack>
                    <ThemedText className="text-lg text-gray-500">Don't have an account ? </ThemedText>
                    <Link href="/signup">
                        <ThemedText className=" text-lg text-[#203B82] font-bold">Sign Up</ThemedText>
                    </Link>
                </XStack>

            </YStack>
        </ThemedView>

    );
}
