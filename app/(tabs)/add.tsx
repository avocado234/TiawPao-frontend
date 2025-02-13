import React, { useState } from 'react'
import { View, Pressable, TextInput, Image, StyleSheet } from "react-native";
import { router } from 'expo-router'
import { XStack, YStack, Button, Select, Sheet } from "tamagui";
import { ThemedText } from '@/components/ThemedText';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
import { ArrowLeft, Calendar, Home, Search, Plus, Map, User, Globe, Lock, MoveLeft } from "@tamagui/lucide-icons";
import ThemedTextInput from "@/components/ThemedTextInput";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { RadioButton } from '@/components/RadioButton';
import ThemedDropDownPicker from '@/components/ThemedDropDownPicker';
import Bgelement from '@/components/Bgelement';

type RegionKey = 'central' | 'northern' | 'northeastern' | 'eastern' | 'western' | 'southern';

export default function CreateTrip() {
  const [tripName, setTripName] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [visibility, setVisibility] = useState('public');
  const [selectedOption, setSelectedOption] = useState('Public');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);

  const regions = [
    { value: 'central', label: 'Central Thailand' },
    { value: 'northern', label: 'Northern Thailand' },
    { value: 'northeastern', label: 'Northeastern Thailand' },
    { value: 'eastern', label: 'Eastern Thailand' },
    { value: 'western', label: 'Western Thailand' },
    { value: 'southern', label: 'Southern Thailand' },
  ];

  const provinces = {
    central: [
      { value: 'ang_thong', label: 'Ang Thong' },
      { value: 'ayutthaya', label: 'Ayutthaya' },
      { value: 'bangkok', label: 'Bangkok' },
      { value: 'chainat', label: 'Chainat' },
      { value: 'lopburi', label: 'Lopburi' },
      { value: 'nakhon_nayok', label: 'Nakhon Nayok' },
      { value: 'nakhon_pathom', label: 'Nakhon Pathom' },
      { value: 'nonthaburi', label: 'Nonthaburi' },
      { value: 'pathum_thani', label: 'Pathum Thani' },
      { value: 'phra_nakhon_si_ayutthaya', label: 'Phra Nakhon Si Ayutthaya' },
      { value: 'samut_prakan', label: 'Samut Prakan' },
      { value: 'samut_sakhon', label: 'Samut Sakhon' },
      { value: 'samut_songkhram', label: 'Samut Songkhram' },
      { value: 'saraburi', label: 'Saraburi' },
      { value: 'sing_buri', label: 'Sing Buri' },
      { value: 'suphan_buri', label: 'Suphan Buri' }
    ],
    northern: [
      { value: 'chiang_mai', label: 'Chiang Mai' },
      { value: 'chiang_rai', label: 'Chiang Rai' },
      { value: 'kamphaeng_phet', label: 'Kamphaeng Phet' },
      { value: 'lampang', label: 'Lampang' },
      { value: 'lamphun', label: 'Lamphun' },
      { value: 'mae_hong_son', label: 'Mae Hong Son' },
      { value: 'nakhon_sawan', label: 'Nakhon Sawan' },
      { value: 'nan', label: 'Nan' },
      { value: 'phayao', label: 'Phayao' },
      { value: 'phetchabun', label: 'Phetchabun' },
      { value: 'phichit', label: 'Phichit' },
      { value: 'phitsanulok', label: 'Phitsanulok' },
      { value: 'phrae', label: 'Phrae' },
      { value: 'sukhothai', label: 'Sukhothai' },
      { value: 'tak', label: 'Tak' },
      { value: 'uttaradit', label: 'Uttaradit' },
      { value: 'uthai_thani', label: 'Uthai Thani' }
    ],
    northeastern: [
      { value: 'amnat_charoen', label: 'Amnat Charoen' },
      { value: 'bueng_kan', label: 'Bueng Kan' },
      { value: 'buri_ram', label: 'Buri Ram' },
      { value: 'chaiyaphum', label: 'Chaiyaphum' },
      { value: 'kalasin', label: 'Kalasin' },
      { value: 'khon_kaen', label: 'Khon Kaen' },
      { value: 'loei', label: 'Loei' },
      { value: 'maha_sarakham', label: 'Maha Sarakham' },
      { value: 'mukdahan', label: 'Mukdahan' },
      { value: 'nakhon_phanom', label: 'Nakhon Phanom' },
      { value: 'nakhon_ratchasima', label: 'Nakhon Ratchasima' },
      { value: 'nong_bua_lam_phu', label: 'Nong Bua Lam Phu' },
      { value: 'nong_khai', label: 'Nong Khai' },
      { value: 'roi_et', label: 'Roi Et' },
      { value: 'sakon_nakhon', label: 'Sakon Nakhon' },
      { value: 'sisaket', label: 'Sisaket' },
      { value: 'surin', label: 'Surin' },
      { value: 'ubon_ratchathani', label: 'Ubon Ratchathani' },
      { value: 'udon_thani', label: 'Udon Thani' },
      { value: 'yasothon', label: 'Yasothon' }
    ],
    eastern: [
      { value: 'chachoengsao', label: 'Chachoengsao' },
      { value: 'chanthaburi', label: 'Chanthaburi' },
      { value: 'chonburi', label: 'Chonburi' },
      { value: 'prachin_buri', label: 'Prachin Buri' },
      { value: 'rayong', label: 'Rayong' },
      { value: 'sa_kaeo', label: 'Sa Kaeo' },
      { value: 'trat', label: 'Trat' }
    ],
    western: [
      { value: 'kanchanaburi', label: 'Kanchanaburi' },
      { value: 'phetchaburi', label: 'Phetchaburi' },
      { value: 'prachuap_khiri_khan', label: 'Prachuap Khiri Khan' },
      { value: 'ratchaburi', label: 'Ratchaburi' },
      { value: 'samut_songkhram', label: 'Samut Songkhram' },
      { value: 'suphan_buri', label: 'Suphan Buri' }
    ],
    southern: [
      { value: 'chumphon', label: 'Chumphon' },
      { value: 'krabi', label: 'Krabi' },
      { value: 'nakhon_si_thammarat', label: 'Nakhon Si Thammarat' },
      { value: 'narathiwat', label: 'Narathiwat' },
      { value: 'pattani', label: 'Pattani' },
      { value: 'phang_nga', label: 'Phang Nga' },
      { value: 'phatthalung', label: 'Phatthalung' },
      { value: 'phuket', label: 'Phuket' },
      { value: 'ranong', label: 'Ranong' },
      { value: 'satun', label: 'Satun' },
      { value: 'songkhla', label: 'Songkhla' },
      { value: 'surat_thani', label: 'Surat Thani' },
      { value: 'trang', label: 'Trang' },
      { value: 'yala', label: 'Yala' }
    ]
  };
  

  const getFilteredProvinces = () => {
    if (!selectedRegion) return [];
    return provinces[selectedRegion as RegionKey] || [];
  };

  const formatDateTime = (date: Date) => {
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })}`;
  };

  return (
    <ThemedSafeAreaView>
      <Bgelement />
      
      {/* Header */}
      <XStack style={{ paddingHorizontal: 16, paddingVertical: 8, alignItems: 'center' }}>
        <Pressable onPress={() => router.back()}>
          <ArrowLeft size={24} />
        </Pressable>
      </XStack>

      {/* Form */}
      <View style={{ flex: 1 }}>
        <ThemedText style={{ fontSize: 25, fontWeight: '600', marginLeft: 12, marginBottom: 16 }}>
          Create a Trip
        </ThemedText>
        
        <YStack space="$4" style={{ padding: 16, flex: 1 }}>
          {/* Trip Name */}
          <View style={{ marginBottom: 16 }}>
            <ThemedText style={{ marginBottom: 8 }}>Trip name</ThemedText>
            <ThemedTextInput
              className='border border-black-300'
              placeholder="e.g.Vacation in Thailand"
              value={tripName}
              onChangeText={setTripName}
              placeholderTextColor="$gray10"
              style={{ 
                borderRadius: 8,
                padding: 12,
                height: 50,
                backgroundColor: '$background',
                color: '$color',
              }}
            />
          </View>

          {/* Region */}
          <View style={{ marginBottom: 16, zIndex: 3 }}>
            <ThemedText style={{ marginBottom: 8 }}>Region</ThemedText>
            <View style={{ flexGrow: 1 }}>
              <ThemedDropDownPicker
                items={regions}
                value={selectedRegion}
                setValue={(value) => {
                  setSelectedRegion(value);
                  setSelectedProvince('');
                }}
                placeholder="Select a region"
                style={{ 
                  borderRadius: 8,
                  height: 40
                }}
                open={isRegionOpen}
                setOpen={setIsRegionOpen}
                listMode="SCROLLVIEW"
                dropDownContainerStyle={{
                  borderWidth: 1,
                  borderColor: '#e5e7eb',
                  borderRadius: 8,
                  backgroundColor: 'white',
                  zIndex: 1000,
                  elevation: 5,
                }}
              />
            </View>
          </View>

          {/* Province */}
          <View style={{ marginBottom: 16, zIndex: 2 }}>
            <ThemedText style={{ marginBottom: 8 }}>Province</ThemedText>
            <View style={{ flexGrow: 1 }}>
              <ThemedDropDownPicker
                items={getFilteredProvinces()}
                value={selectedProvince}
                setValue={setSelectedProvince}
                placeholder="Select a province"
                disabled={!selectedRegion}
                style={{ 
                  borderRadius: 8,
                  height: 40
                }}
                listMode="SCROLLVIEW"
                dropDownContainerStyle={{
                  borderWidth: 1,
                  borderColor: '#e5e7eb',
                  borderRadius: 8,
                  backgroundColor: 'white',
                  zIndex: 1000,
                  elevation: 5,
                }}
              />
            </View>
          </View>

          {/* Date Selection */}
          <XStack style={{ gap: 16, marginBottom: 16 }}>
            {/* Start Date */}
            <View style={{ flex: 1 }}>
              <ThemedText style={{ marginBottom: 8 }}>Start date & time</ThemedText>
              <Pressable onPress={() => setStartDatePickerVisible(true)}>
                <XStack style={{ 
                  alignItems: 'center',
                  borderWidth: 1,
                  borderRadius: 8,
                  padding: 8,
                  height: 40,
                }}>
                  <Calendar size={16} color="#6c757d" style={{ marginRight: 8 }} />
                  <ThemedText>{formatDateTime(startDate)}</ThemedText>
                </XStack>
              </Pressable>
              <DateTimePickerModal
                isVisible={isStartDatePickerVisible}
                mode="datetime"
                display="inline"
                date={startDate}
                onConfirm={(date) => {
                  setStartDate(date);
                  setStartDatePickerVisible(false);
                }}
                onCancel={() => setStartDatePickerVisible(false)}
                is24Hour={false}
              />
            </View>

            {/* End Date */}
            <View style={{ flex: 1 }}>
              <ThemedText style={{ marginBottom: 8 }}>End date & time</ThemedText>
              <Pressable onPress={() => setEndDatePickerVisible(true)}>
                <XStack style={{ 
                  alignItems: 'center',
                  borderWidth: 1,
                  borderRadius: 8,
                  padding: 8,
                  height: 40,
                }}>
                  <Calendar size={16} color="#6c757d" style={{ marginRight: 8 }} />
                  <ThemedText>{formatDateTime(endDate)}</ThemedText>
                </XStack>
              </Pressable>
              <DateTimePickerModal
                isVisible={isEndDatePickerVisible}
                mode="datetime"
                display="inline"
                date={endDate}
                onConfirm={(date) => {
                  setEndDate(date);
                  setEndDatePickerVisible(false);
                }}
                onCancel={() => setEndDatePickerVisible(false)}
                is24Hour={false}
              />
            </View>
          </XStack>

          {/* Visibility Options */}
          <View style={{ marginBottom: 24 }}>
            <ThemedText style={{ marginBottom: 8 }}>Who can view</ThemedText>
            <YStack space="$4">
              <Pressable onPress={() => setSelectedOption("Public")}>
                <YStack space="$2">
                  <RadioButton
                    label="Public"
                    selected={selectedOption === "Public"}
                  />
                  <ThemedText style={{ color: 'gray', fontSize: 14, marginLeft: 26 }}>
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
                  <ThemedText style={{ color: 'gray', fontSize: 14, marginLeft: 26 }}>
                    Only you can see this trip
                  </ThemedText>
                </YStack>
              </Pressable>
            </YStack>
          </View>

          {/* Action Buttons */}
          <YStack space="$4">
            <Button
              style={{ 
                backgroundColor: '#3b82f6', 
                borderRadius: 8,
                height: 45,
                justifyContent: 'center'
              }}
              onPress={() => router.push({
                pathname: '/showTrip',
                params: {
                  tripName,
                  region: selectedRegion,
                  province: selectedProvince,
                  startDate: startDate.toISOString(),
                  endDate: endDate.toISOString(),
                  visibility: selectedOption
                }
              })}
            >
              <ThemedText style={{ color: 'white', textAlign: 'center' }}>
                Create Plan Manually
              </ThemedText>
            </Button>

            <Button
              style={{ 
                backgroundColor: '#10b981', 
                borderRadius: 8,
                height: 45,
                justifyContent: 'center'
              }}
              onPress={() => {/* Handle AI generation */}}
            >
              <ThemedText style={{ color: 'white', textAlign: 'center' }}>
                Use AI Generate
              </ThemedText>
            </Button>
          </YStack>
        </YStack>
      </View>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
    opacity: 0.5,
  },
});