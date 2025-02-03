import React, { useState } from 'react';
import { View, Pressable, Text, TouchableOpacity } from 'react-native';
import { YStack } from "tamagui";
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedPressableBackButton } from '@/components/ThemedPressableBackButton';
import ThemedTextInput from "@/components/ThemedTextInput";
import ThemedDropDownPicker from '@/components/ThemedDropDownPicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome } from '@expo/vector-icons';

export default function PersonalDetail() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastName] = useState('');
  const [datebirth, setDateBirth] = useState('');
  const [tel, setTel] = useState('');
  const [selectedGender, setSelectedGender] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date:any) => {
    setDateBirth(date.toISOString().split('T')[0]); // แปลงเป็น YYYY-MM-DD
    hideDatePicker();
  };

  return (
    <ThemedView className="flex justify-center items-center h-screen relative">
      <ThemedPressableBackButton />
      <View className="w-[70%] mt-[50px] mb-[30px]">
        <ThemedText className="text-3xl font-bold text-left">Personal Details</ThemedText>
      </View>

      <YStack space="$3" alignItems="center" width="100%">
        {/* First Name */}
        <View className="w-[70%]">
          <ThemedText className="text-[#203B82] py-2">
            First Name <Text style={{ color: 'red' }}>*</Text>
          </ThemedText>
          <ThemedTextInput
            className="border border-[#203B82] h-[45px] w-full rounded-3xl px-4 py-2"
            onChangeText={setFirstname}
            value={firstname}
          />
        </View>

        {/* Last Name */}
        <View className="w-[70%]">
          <ThemedText className="text-[#203B82] py-2">
            Last Name <Text style={{ color: 'red' }}>*</Text>
          </ThemedText>
          <ThemedTextInput
            className="border border-[#203B82] h-[45px] w-full rounded-3xl px-4 py-2"
            onChangeText={setLastName}
            value={lastname}
          />
        </View>

        {/* Date of Birth with Calendar Icon */}
        <View className="w-[70%]">
          <ThemedText className="py-2">
            Date of Birth <Text style={{ color: 'red' }}>*</Text>
          </ThemedText>
          <TouchableOpacity onPress={showDatePicker} className="flex flex-row items-center border border-[#203B82] h-[45px] w-full rounded-3xl px-4 py-2">
            <Text className="flex-1">{datebirth || "Select Date"}</Text>
            <FontAwesome name="calendar" size={24} color="#203B82" />
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>

        {/* Mobile Number */}
        <View className="w-[70%]">
          <ThemedText className="py-2">
            Mobile Number <Text style={{ color: 'red' }}>*</Text>
          </ThemedText>
          <ThemedTextInput
            className="border border-[#203B82] h-[45px] w-full rounded-3xl px-4 py-2"
            onChangeText={setTel}
            value={tel}
          />
        </View>

        {/* Gender Dropdown */}
        <View className="w-[70%]">
          <ThemedText className="py-2 px-2">Gender <Text style={{ color: 'red' }}>*</Text></ThemedText>
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

        {/* Next Button */}
        <Pressable
          className='bg-[#5680EC] w-[300px] h-[50px] flex justify-center items-center rounded-3xl mt-12'
          onPress={() => router.push("/onetimepass")}
        >
          <Text className='text-xl text-white'>NEXT</Text>
        </Pressable>
      </YStack>
    </ThemedView>
  );
}
