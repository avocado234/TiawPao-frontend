import React, { useState } from 'react';
import { View, Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; // Import Material Icons
import { YStack } from "tamagui";
import ThemedTextInput from "@/components/ThemedTextInput";
import ThemedDropDownPicker from '@/components/ThemedDropDownPicker';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';

export default function PersonalDetail() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastName] = useState('');
  const [datebirth, setDateBirth] = useState('');
  const [mobilenumber, setMobileNumber] = useState('');
  const [selectedGender, setSelectedGender] = useState(null);

  const navigation = useNavigation();

  return (
    <View className="flex justify-center items-center h-screen">
        <Pressable onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 100, left: 20 }}>
          <MaterialIcons name="arrow-back" size={30} color="#203B82" />
        </Pressable>
      <YStack space="$3" alignItems="center" width="100%">
        <ThemedText className='text-3xl font-bold'>Personal Details</ThemedText>

        <View className="w-[70%]">
          <ThemedText className="text-[#203B82] py-2">First Name</ThemedText>
          <ThemedTextInput
            className="border border-[#203B82] h-[45px] w-full rounded-3xl px-4 py-2"
            onChangeText={setFirstname}
            value={firstname}
          />
        </View>

        <View className="w-[70%]">
          <ThemedText className="text-[#203B82] py-2">Last Name</ThemedText>
          <ThemedTextInput
            className="border border-[#203B82] h-[45px] w-full rounded-3xl px-4 py-2"
            onChangeText={setLastName}
            value={lastname}
          />
        </View>

        <View className="w-[70%]">
          <ThemedText className="py-2">Date of Birth</ThemedText>
          <ThemedTextInput
            className="border border-[#203B82] h-[45px] w-full rounded-3xl px-4 py-2"
            onChangeText={setDateBirth}
            value={datebirth}
          />
        </View>
        <View className="w-[70%]">
          <ThemedText className="py-2">Mobile Number</ThemedText>
          <ThemedTextInput
            className="border border-[#203B82] h-[45px] w-full rounded-3xl px-4 py-2"
            onChangeText={setMobileNumber}
            value={mobilenumber}
          />
        </View>

        <View className="w-[70%]">
          <ThemedText className="py-2">Gender</ThemedText>
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

        <Pressable
          className='bg-[#5680EC] w-[300px] h-[50px] flex justify-center items-center rounded-3xl mt-6'
          onPress={() => router.push("/(tabs)/plan")}
        >
          <Text className='text-xl text-white'>SIGN UP</Text>
        </Pressable>
      </YStack>
    </View>
  );
}

