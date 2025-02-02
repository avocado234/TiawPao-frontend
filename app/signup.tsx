import React from 'react'
import { useState } from 'react'
import { View, TextInput, Pressable, Text } from "react-native";
import { Image } from 'expo-image';
import { router , Link } from 'expo-router'
import { XStack, YStack } from "tamagui";
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedLogo } from '@/components/ThemedLogo';
import { Eye, EyeOff } from "@tamagui/lucide-icons"; // Using Tamagui Icons
import ThemedTextInput from "@/components/ThemedTextInput"

export default function SignUpPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [secureText, setSecureText] = useState(true);
    const [secureTextConfirm, setSecureTextConfirm] = useState(true);

    return (
        <ThemedView className="flex justify-center items-center h-screen">
            <ThemedLogo />
            <YStack space="$3" alignItems="center" width="100%">

                <View className="w-[70%]">
                    <ThemedText className="text-[#203B82] py-2">Username </ThemedText>
                    <ThemedTextInput
                        className="border border-[#203B82] h-[40px] w-full rounded-3xl px-4 py-2"
                        onChangeText={setUsername}
                        value={username}
                    />
                </View>
                <View className="w-[70%]">
                    <ThemedText className="text-[#203B82] py-2">Email </ThemedText>
                    <ThemedTextInput
                        className="border border-[#203B82] h-[40px]  w-full rounded-3xl px-4 py-2"
                        onChangeText={setEmail}
                        value={email}
                    />
                </View>
                <View className="w-[70%]">
                    <ThemedText className="py-2">Password</ThemedText>
                    <View className="relative w-full">

                        <ThemedTextInput
                            className="border border-[#203B82] h-[40px] w-full rounded-3xl px-4 py-2 pr-12"
                            onChangeText={setPassword}
                            value={password}
                            secureTextEntry={secureText}
                        />
                        <Pressable
                            className=" absolute right-4 top-1/2 -translate-y-1/2"
                            onPress={() => setSecureText(!secureText)}
                        >
                            {secureText ? <EyeOff size={20} color="gray" /> : <Eye size={20} color="gray" />}
                        </Pressable>
                    </View>

                </View>
                <View className="w-[70%] pb-5">
                    <ThemedText className="py-2">Confirm Password</ThemedText>
                    <View className="relative w-full">

                        <ThemedTextInput
                            className="border border-[#203B82] h-[40px] w-full rounded-3xl px-4 py-2 pr-12"
                            onChangeText={setConfirmPassword}
                            value={confirmpassword}
                            secureTextEntry={secureTextConfirm}
                        />
                        <Pressable
                            className=" absolute right-4 top-1/2 -translate-y-1/2"
                            onPress={() => setSecureTextConfirm(!secureTextConfirm)}
                        >
                            {secureTextConfirm ? <EyeOff size={20} color="gray" /> : <Eye size={20} color="gray" />}
                        </Pressable>
                    </View>

                </View>

                <Pressable
                    className=' bg-[#5680EC] w-[300px] h-[50px] flex justify-center items-center rounded-3xl'
                    onPress={() => router.push("/(tabs)/plan")}
                >
                    <Text className='text-xl text-white '>SIGN UP</Text>
                </Pressable>

                <ThemedText className="py-2 font-semibold"> or sign up with</ThemedText>
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
                    <ThemedText className="text-lg text-gray-500">Have an account ? </ThemedText>
                    <Link href="/">
                        <ThemedText className=" text-lg text-[#203B82] font-bold">Sign In</ThemedText>
                    </Link>
                </XStack>

            </YStack>
        </ThemedView>

    );
}
