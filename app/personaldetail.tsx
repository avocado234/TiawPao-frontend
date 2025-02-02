import React from 'react'
import { useState } from 'react'
import { View, TextInput, Pressable, Text } from "react-native";
import { Image } from 'expo-image';
import { router, Link } from 'expo-router'
import { XStack, YStack } from "tamagui";
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedLogo } from '@/components/ThemedLogo';
import { Eye, EyeOff } from "@tamagui/lucide-icons";
import ThemedTextInput from "@/components/ThemedTextInput"
import ThemedDropDownPicker from '@/components/ThemedDropDownPicker';

export default function personaldetail() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastName] = useState('');
    const [datebirth, setDateBirth] = useState('');
    const [mobilenumber, setMobileNumber] = useState('');
    const [selectedGender, setSelectedGender] = useState(null);
   
    return (
        <ThemedView className="flex justify-center items-center h-screen">
            <ThemedText className='text-3xl font-bold'> Personal Details</ThemedText>
            <YStack space="$3" alignItems="center" width="100%">

                <View className="w-[70%]">
                    <ThemedText className="text-[#203B82] py-2">First Name </ThemedText>
                    <ThemedTextInput
                        className="border border-[#203B82] h-[45px] w-full rounded-3xl px-4 py-2"
                        onChangeText={setFirstname}
                        value={firstname}
                    />
                </View>
                <View className="w-[70%]">
                    <ThemedText className="text-[#203B82] py-2">Last Name </ThemedText>
                    <ThemedTextInput
                        className="border border-[#203B82] h-[45px]  w-full rounded-3xl px-4 py-2"
                        onChangeText={setLastName}
                        value={lastname}
                    />
                </View>
                <View className="w-[70%]">
                    <ThemedText className="py-2">Date of Birth</ThemedText>
                    <View className="relative w-full">

                        <ThemedTextInput
                            className="border border-[#203B82] h-[45px] w-full rounded-3xl px-4 py-2 pr-12"
                            onChangeText={setDateBirth}
                            value={datebirth}
                        />
                    </View>

                </View>
                <View className="w-[70%]">
                    <ThemedText className="py-2">Mobile Number</ThemedText>
                    <View className="relative w-full">

                        <ThemedTextInput
                            className="border border-[#203B82] h-[45px] w-full rounded-3xl px-4 py-2 pr-12"
                            onChangeText={setMobileNumber}
                            value={mobilenumber}
                        />
                    </View>

                </View>
                <View style={{ width: "70%",marginBottom:30}}>
                    <ThemedText className="py-2">Gender</ThemedText>
                    <View style={{ width: "100%", position: "relative" }}>
                    <ThemedDropDownPicker
                        value={selectedGender}
                        setValue={setSelectedGender}
                        items={[
                            { label: "Male", value: "male" },
                            { label: "Female", value: "female" },
                            { label: "Other", value: "other" }
                        ]}
                    />
                    </View>
                </View>

                <Pressable
                    className=' bg-[#5680EC] w-[300px] h-[50px] flex justify-center items-center rounded-3xl'
                    onPress={() => router.push("/(tabs)/plan")}
                >
                    <Text className='text-xl text-white '>SIGN UP</Text>
                </Pressable>

            </YStack>
        </ThemedView>

    );
}
