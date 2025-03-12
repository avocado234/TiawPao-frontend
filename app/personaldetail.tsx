import React, { useState } from 'react';
import { View, Pressable, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import { YStack } from "tamagui";
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedPressableBackButton } from '@/components/ThemedPressableBackButton';
import ThemedTextInput from "@/components/ThemedTextInput";
import ThemedDropDownPicker from '@/components/ThemedDropDownPicker';
import DateTimePicker from '@react-native-community/datetimepicker';

import Entypo from '@expo/vector-icons/Entypo';
import { useSignupStore } from "@/store/useSignupStore"; 
import { useColorScheme } from 'react-native';
import api from '@/utils/axiosInstance'; 
import { Calendar } from '@tamagui/lucide-icons';

export default function PersonalDetail() {
  const { email ,setSignupData } = useSignupStore(); 
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastName] = useState('');
  const [date_of_birth, setDate_of_Birth] = useState('');
  const [tel, setTel] = useState('');
  const [gender, setGender] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useColorScheme();

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  
  const handleNext = async () => {
    console.log(date_of_birth);

    if (!firstname || !lastname || !date_of_birth || !tel || !gender) {
      Alert.alert("Error", "Please fill in all fields!");
      return;
    }

    if (!/^\d+$/.test(tel)) {
      Alert.alert("Error", "Mobile number must contain only numbers!");
      return;
    }

    setSignupData({ firstname, lastname, date_of_birth, tel, gender });

    try {
      setLoading(true);
      const response = await api.get(`/user/genotp/${email}`);

      if (response.data.message) {
        Alert.alert("Success", "OTP Sent! Check your email.");
        router.push({
          pathname: '/onetimepass',
          params: { isRegister: 'true' },
        });
      } else {
        Alert.alert("Error", "Failed to send OTP. Try again.");
      }
    } catch (error) {
      console.error("OTP Error:", error);
      Alert.alert("Error", "Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = (selectedDate:any) => {
    // If user dismisses the picker (Android), selectedDate can be undefined.
    if (!selectedDate) {
      hideDatePicker();
      return;
    }
    
    const today = new Date();
    if (selectedDate > today) {
      Alert.alert("Error", "Date of Birth cannot be in the future!");
      hideDatePicker();
      return;
    }
    // console.log(selectedDate);
    setDate_of_Birth(selectedDate.toISOString().split('T')[0]);
    // console.log(date_of_birth);
    hideDatePicker();
  };

  // onChange handler for DateTimePicker
  const onChangeDate = (event:any, selectedDate:any) => {
    if (Platform.OS === 'android') {
      // On Android, the picker is rendered as a dialog.
      if (event.type === "dismissed") {
        hideDatePicker();
        return;
      }
      handleConfirm(selectedDate);
    } else {
      // On iOS, you might want to update the state live.
      if (selectedDate) {
        handleConfirm(selectedDate);
      }
    }
  };

  return (
    <ThemedView className="flex justify-center items-center h-screen relative">
      <ThemedPressableBackButton />
      <View className="w-[70%] mt-[50px] mb-[30px]">
        <ThemedText className="text-3xl font-bold text-left">Personal Details</ThemedText>
      </View>

      <YStack space="$3" alignItems="center" width="100%">
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

        <View className="w-[70%]">
          <ThemedText className="py-2">
            Date of Birth <Text style={{ color: 'red' }}>*</Text>
          </ThemedText>
          <TouchableOpacity
            onPress={showDatePicker}
            className={`flex flex-row items-center border ${theme === 'dark' ? 'border-[#3B82F6]' : 'border-[#203B82]'} h-[45px] w-full rounded-3xl px-4 py-2`}
          >
            <ThemedText className="flex-1">{date_of_birth || "Select Date"}</ThemedText>
            <Calendar size={24} color={theme === 'dark' ? "#fff" : "#203B82"} style={{ marginRight: 8 }} />

            {/* <Entypo name="calendar" size={24} color={theme === 'dark' ? "#fff" : "#203B82"} /> */}
          </TouchableOpacity>
          {isDatePickerVisible && (
            <DateTimePicker
              value={date_of_birth ? new Date(date_of_birth) : new Date()}
              mode="date"
              display="default"
              onChange={onChangeDate}
              maximumDate={new Date()}
            />
          )}
        </View>

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

        <View className="w-[70%]">
          <ThemedText className="py-2 px-2">
            Gender <Text style={{ color: 'red' }}>*</Text>
          </ThemedText>
          <ThemedDropDownPicker
            value={gender}
            setValue={setGender}
            items={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Other", value: "other" }
            ]}
          />
        </View>

        <Pressable
          className={`bg-[#5680EC] w-[300px] h-[50px] flex justify-center items-center rounded-3xl mt-12 ${loading ? "opacity-50" : ""}`}
          onPress={handleNext}
          disabled={loading}
        >
          <Text className='text-xl text-white'>
            {loading ? "Sending OTP..." : "NEXT"}
          </Text>
        </Pressable>
      </YStack>
    </ThemedView>
  );
}
