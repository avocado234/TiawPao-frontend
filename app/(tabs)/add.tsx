import React, { useState } from 'react'
import { View, Pressable, TextInput, Image, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { router } from 'expo-router'
import { XStack, YStack, Button, Select, Sheet } from "tamagui";
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ArrowLeft, Calendar, Clock, ChevronDown } from "@tamagui/lucide-icons";
import ThemedTextInput from "@/components/ThemedTextInput";
// import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from '@/components/RadioButton';
import ThemedDropDownPicker from '@/components/ThemedDropDownPicker';
import Bgelement from '@/components/Bgelement';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

type RegionKey = 'central' | 'northern' | 'northeastern' | 'eastern' | 'western' | 'southern';

export default function CreateTrip() {
  const [tripName, setTripName] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Public');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [isProvinceOpen, setIsProvinceOpen] = useState(false);
  
  const regionHeight = useSharedValue(0);
  const provinceHeight = useSharedValue(0);
  
  const regionChevronRotation = useSharedValue(0);
  const provinceChevronRotation = useSharedValue(0);
  
  const DROPDOWN_HEIGHT = 200; // Adjust height as needed

  const animatedRegionStyle = useAnimatedStyle(() => ({
    height: regionHeight.value,
    overflow: 'hidden',
  }));

  const animatedProvinceStyle = useAnimatedStyle(() => ({
    height: provinceHeight.value,
    overflow: 'hidden',
  }));

  const animatedRegionChevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${regionChevronRotation.value}deg` }],
  }));

  const animatedProvinceChevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${provinceChevronRotation.value}deg` }],
  }));

  const toggleRegionDropdown = () => {
    if (isRegionOpen) {
      regionHeight.value = withTiming(0, { duration: 300 });
      regionChevronRotation.value = withSpring(0);
      setIsRegionOpen(false);
    } else {
      regionHeight.value = withTiming(DROPDOWN_HEIGHT, { duration: 300 });
      regionChevronRotation.value = withSpring(180);
      setIsProvinceOpen(false);
      provinceHeight.value = withTiming(0, { duration: 300 });
      provinceChevronRotation.value = withSpring(0);
      setIsRegionOpen(true);
    }
  };

  const toggleProvinceDropdown = () => {
    if (!selectedRegion) return;
    
    if (isProvinceOpen) {
      provinceHeight.value = withTiming(0, { duration: 300 });
      provinceChevronRotation.value = withSpring(0);
      setIsProvinceOpen(false);
    } else {
      provinceHeight.value = withTiming(DROPDOWN_HEIGHT, { duration: 300 });
      provinceChevronRotation.value = withSpring(180);
      setIsRegionOpen(false);
      regionHeight.value = withTiming(0, { duration: 300 });
      regionChevronRotation.value = withSpring(0);
      setIsProvinceOpen(true);
    }
  };

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

  const handleCreatePlan = () => {
    router.push({
      pathname: "/tripManually",
      params: {
        tripName: tripName,
        region: selectedRegion,
        province: selectedProvince,
        startDate: startDate.toISOString(),
        startTime: startTime.toISOString(),
        endDate: endDate.toISOString(),
        endTime: endTime.toISOString(),
        visibility: selectedOption
      }
    });
  };

  const renderContent = () => (
    <YStack style={{ padding: 16, flex: 1, gap: 16 }}>
      {/* Trip Name */}
      <View style={{ marginBottom: 16 }}>
        <ThemedText className="text-[#203B82] py-2">Trip name</ThemedText>
        <ThemedTextInput
          className="border border-[#203B82] h-[45px] rounded-lg px-4 py-2"
          placeholder="e.g., Vacation in Thailand"
          value={tripName}
          onChangeText={setTripName}
        />
      </View>

      {/* Region */}
      <View style={{ marginBottom: 16, zIndex: 3 }}>
        <ThemedText className="text-[#203B82] py-2">Region</ThemedText>
        <ThemedDropDownPicker
          items={regions}
          value={selectedRegion}
          setValue={setSelectedRegion}
          onSelect={(value) => {
            setSelectedRegion(value);
            setSelectedProvince('');
          }}
        />
      </View>

      {/* Province */}
      <View style={{ marginBottom: 16, zIndex: 2 }}>
        <ThemedText className="text-[#203B82] py-2">Province</ThemedText>
        <ThemedDropDownPicker
          items={getFilteredProvinces()}
          value={selectedProvince}
          setValue={setSelectedProvince}
          disabled={!selectedRegion}
        />
      </View>

      {/* Date and Time Selection */}
      <XStack style={{ gap: 16, marginBottom: 16 }}>
        {/* Start Date and Time */}
        <View style={{ flex: 1 }}>
          <ThemedText className="text-[#203B82] py-2">Start date</ThemedText>
          <XStack style={{ 
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#203B82',
            borderRadius: 8,
            padding: 8,
            height: 45,
            marginBottom: 8
          }}>
            {/* <Calendar size={16} color="#6c757d" style={{ marginRight: -25 }} />
            <DateTimePicker
              value={startDate}
              mode="date"
              onChange={(event, date) => {
                if (date) setStartDate(date);
              }}
              style={{ transform: [{ scale: 0.7 }] }}
            /> */}
          </XStack>
          <XStack style={{ 
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#203B82',
            borderRadius: 8,
            padding: 8,
            height: 45,
          }}>
            {/* <Clock size={16} color="#6c757d" style={{ marginRight: -25 }} />
            <DateTimePicker
              value={startTime}
              mode="time"
              onChange={(event, date) => {
                if (date) setStartTime(date);
              }}
              style={{ transform: [{ scale: 0.7 }] }}
            /> */}
          </XStack>
        </View>

        {/* End Date and Time */}
        <View style={{ flex: 1 }}>
          <ThemedText className="text-[#203B82] py-2">End date</ThemedText>
          <XStack style={{ 
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#203B82',
            borderRadius: 8,
            padding: 8,
            height: 45,
            marginBottom: 8
          }}>
            {/* <Calendar size={16} color="#6c757d" style={{ marginRight: -25 }} />
            <DateTimePicker
              value={endDate}
              mode="date"
              onChange={(event, date) => {
                if (date) setEndDate(date);
              }}
              style={{ transform: [{ scale: 0.7 }] }}
            /> */}
          </XStack>
          <XStack style={{ 
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#203B82',
            borderRadius: 8,
            padding: 8,
            height: 45,
          }}>
            {/* <Clock size={16} color="#6c757d" style={{ marginRight: -25 }} />
            <DateTimePicker
              value={endTime}
              mode="time"
              onChange={(event, date) => {
                if (date) setEndTime(date);
              }}
              style={{ transform: [{ scale: 0.7 }] }}
            /> */}
          </XStack>
        </View>
      </XStack>

      {/* Visibility Options */}
      <View style={{ marginBottom: 24 }}>
        <ThemedText className="text-[#203B82] py-2">Who can view</ThemedText>
        <YStack style={{ gap: 16 }}>
          <Pressable onPress={() => setSelectedOption("Public")}>
            <YStack style={{ gap: 8 }}>
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
            <YStack style={{ gap: 8 }}>
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
      <View style={{ 
        marginTop: 'auto',  // Push buttons to bottom
        paddingBottom: 20,
        zIndex: 1
      }}>
        <Button
          style={{ 
            backgroundColor: '#3b82f6', 
            borderRadius: 8,
            height: 45,
            justifyContent: 'center',
            marginBottom: 10
          }}
          onPress={handleCreatePlan}
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
      </View>
    </YStack>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.themedView}>
        <Bgelement />
        
        {/* Header */}
        <XStack style={{ paddingHorizontal: 16, paddingVertical: 8, alignItems: 'center' }}>
          <Pressable onPress={() => router.back()}>
            <ArrowLeft size={24} />
          </Pressable>
        </XStack>
        
        <ThemedText style={{ fontSize: 25, fontWeight: '600', marginLeft: 12, marginBottom: 16 }}>Create a Trip</ThemedText>
        
        <FlatList
          data={[{ key: 'content' }]}
          renderItem={() => renderContent()}
          keyExtractor={item => item.key}
          scrollEnabled={true}
          nestedScrollEnabled={true}
        />

        {/* Date Pickers */}
        {/* {showStartDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            onChange={(event, date) => {
              setShowStartDatePicker(false);
              if (date) setStartDate(date);
            }}
          />
        )} */}
        {/* {showEndDatePicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            onChange={(event, date) => {
              setShowEndDatePicker(false);
              if (date) setEndDate(date);
            }}
          />
        )} */}
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  themedView: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
    opacity: 0.5,
  },
});