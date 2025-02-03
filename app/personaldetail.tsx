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
import Entypo from '@expo/vector-icons/Entypo';
import { useSignupStore } from "@/store/useSignupStore"; 
import { useColorScheme } from 'react-native';
export default function PersonalDetail() {
  const { username, email, setSignupData } = useSignupStore(); 
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastName] = useState('');
  const [dateofbirth, setDateofBirth] = useState('');
  const [tel, setTel] = useState('');
  const [gender, setGender] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const theme = useColorScheme()
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleNext = () =>{
    if (!firstname || !lastname || !dateofbirth || !tel || !gender) {
        alert("Please fill in all fields!");
        return;
    }

    if (!/^\d+$/.test(tel)) {
        alert("Mobile number must contain only numbers!");
        return;
    }
    setSignupData({
        firstname,
        lastname,
        dateofbirth,
        tel,
        gender,
    });
    router.push("/onetimepass")
    
  }
  const handleConfirm = (date:any) => {
const today = new Date();
    if (date > today) {
        alert("Date of Birth cannot be in the future!");
        return;
    }
    setDateofBirth(date.toISOString().split('T')[0]); 
    hideDatePicker();
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
          <TouchableOpacity onPress={showDatePicker} className={`flex flex-row items-center border ${theme == 'dark' ? `border-[#3B82F6]`:`border-[#203B82]`} h-[45px] w-full rounded-3xl px-4 py-2`}>
            <ThemedText className="flex-1">{dateofbirth || "Select Date"}</ThemedText>
            <Entypo name="calendar" size={24} color={theme =='dark' ? "#fff":"#203B82"} />
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
          <ThemedText className="py-2 px-2 ">Gender <Text style={{ color: 'red' }}>*</Text></ThemedText>
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
          className='bg-[#5680EC] w-[300px] h-[50px] flex justify-center items-center rounded-3xl mt-12'
          onPress={handleNext}
        >
          <Text className='text-xl text-white'>NEXT</Text>
        </Pressable>
      </YStack>
    </ThemedView>
  );
}
