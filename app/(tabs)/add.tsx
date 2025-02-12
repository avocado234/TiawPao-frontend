import React, { useState } from 'react'
import { View, Pressable, TextInput } from "react-native";
import { router } from 'expo-router'
import { XStack, YStack, Button, Select, Sheet } from "tamagui";
import { ThemedText } from '@/components/ThemedText';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
import { ArrowLeft, Calendar, Home, Search, Plus, Map, User, Globe, Lock } from "@tamagui/lucide-icons";
import ThemedTextInput from "@/components/ThemedTextInput";
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from '@/components/RadioButton';


export default function CreateTrip() {
  const [tripName, setTripName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [visibility, setVisibility] = useState('public');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Public');

  return (
    
    <ThemedSafeAreaView> 
      {/* Header */}
      <XStack style={{ paddingHorizontal: 16, paddingVertical: 8, alignItems: 'center' }}>
        <Pressable onPress={() => router.back()}>
          <ArrowLeft size={24} />
        </Pressable>
      </XStack>

      {/* Form */}
      <ThemedText style={{ fontSize: 25, fontWeight: '600', marginLeft: 12 }}>Create a Trip</ThemedText>
      <YStack style={{ padding: 16, flex: 1 }}>
      
      <ThemedText>Trip name</ThemedText>
      <ThemedTextInput
        className=' border border-black-300 rounded-md p-2'
        placeholder="e.g., Vacation in Thailand"
        value={tripName}
        onChangeText={setTripName}
        style={{ alignItems: 'center', marginBottom: 16 , borderRadius: 8, padding: 12, marginTop: 12 }}
      />


        <YStack style={{ marginBottom: 16 }}>
          <XStack style={{ 
            gap: 16, 
            justifyContent: 'center',
            width: '100%',
            alignItems: 'center',
          }}>
            {/* Start Date */}
            <Pressable 
              onPress={() => setShowStartDatePicker(true)} 
              style={{ 
                flex: 1,
                marginBottom: 16,
              }}
            >
              <ThemedText style={{ marginBottom: 8 }}>Start date</ThemedText>
              <XStack style={{ 
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderRadius: 8,
                padding: 8,
                paddingHorizontal: 12,
                marginVertical: 4,
                //backgroundColor: '#f8f9fa',
                //borderColor: '#e9ecef',
                height: 40,
              }}>
                <Calendar size={16} color="#6c757d" style={{ marginRight: -25 }} />
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  onChange={(event, date) => {
                    setShowStartDatePicker(false);
                    if (date) setStartDate(date);
                  }}
                  style={{ transform: [{ scale: 0.7 }] }}
                />
              </XStack>
            </Pressable>

            {/* End Date */}
            <Pressable 
              style={{ 
                flex: 1,
                marginBottom: 16,
                marginLeft: 12
              }}
            >
              <ThemedText style={{ marginBottom: 8 }}>End date</ThemedText>
              <XStack style={{ 
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderRadius: 8,
                padding: 8,
                paddingHorizontal: 12,
                marginVertical: 4,
                backgroundColor: '#f8f9fa',
                borderColor: '#e9ecef',
                height: 40,
              }}>
                <Calendar size={16} color="#6c757d" style={{ marginRight: -25 }} />
                <DateTimePicker
                  value={endDate}
                  mode="date"
                  onChange={(event, date) => {
                    setShowEndDatePicker(false);
                    if (date) setEndDate(date);
                  }}
                  style={{ transform: [{ scale: 0.7 }] }}
                />
              </XStack>
            </Pressable>
          </XStack>
        </YStack>
        
      {/* Date Selection */}
      <Pressable>
  <ThemedText>Who can view</ThemedText>
  <YStack padding="$4" space="$4">
    <Pressable onPress={() => setSelectedOption("Public")}>
      <YStack space="$2">
        <RadioButton
          label="Public"
          selected={selectedOption === "Public"}
        />
        <ThemedText className="text-gray-500 text-sm">
          Everyone can see this trip
        </ThemedText>
      </YStack>
    </Pressable>

    <Pressable onPress={() => setSelectedOption("Private")}>
      <YStack space="$2">
        <RadioButton
          label="Private"
          selected={selectedOption === "Private"}
        />
        <ThemedText className="text-gray-500 text-sm ">
        {/* <ThemedText className="text-gray-500 text-sm ml-[26px]"> */}
          Only you can see this trip
        </ThemedText>
      </YStack>
    </Pressable>
  </YStack>
</Pressable>


       

        {/* Visibility Selection */}

        {/* Start Button */}
        <Button
          style={{ backgroundColor: '#3b82f6', borderRadius: 8 }}
          onPress={() => {/* Handle trip creation */}}
        >
          <ThemedText style={{ color: 'white', textAlign: 'center' }}>Start</ThemedText>
        </Button>
      </YStack>

     

      {/* Date Pickers */}
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          onChange={(event, date) => {
            setShowStartDatePicker(false);
            if (date) setStartDate(date);
          }}
        />
      )}
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          onChange={(event, date) => {
            setShowEndDatePicker(false);
            if (date) setEndDate(date);
          }}
        />
      )}
    </ThemedSafeAreaView>
    
  );
}