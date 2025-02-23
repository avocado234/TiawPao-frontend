import React, { useState, useEffect } from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Platform
} from 'react-native';
import { router } from 'expo-router';
import { XStack, YStack, Button as TamaguiButton } from 'tamagui';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ArrowLeft, Calendar, Clock } from "@tamagui/lucide-icons";
import ThemedTextInput from "@/components/ThemedTextInput";
import { RadioButton } from '@/components/RadioButton';
import ThemedDropDownPicker from '@/components/ThemedDropDownPicker';
import Bgelement from '@/components/Bgelement';
import ThemedCustomBackButton from '@/components/ThemeCustomBackButton';
import CustomDateTimePicker from '@/components/CustomDateTimePicker'; // ปรับ path ให้ถูกต้องตามโปรเจคของคุณ
import DropdownComponent from '@/components/DropDownComponent';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

type RegionKey = 'central' | 'northern' | 'northeastern' | 'eastern' | 'western' | 'southern';

export default function CreateTrip() {
  const [selectedValueRegion, setSelectedValueRegion] = useState(null);
  const [selectedValueProvince, setSelectedValueProvince] = useState(null);
  const [tripName, setTripName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Public');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  // ส่วน Animation สำหรับ dropdown (หากมีการใช้งาน)
  const regionHeight = useSharedValue(0);
  const provinceHeight = useSharedValue(0);
  const regionChevronRotation = useSharedValue(0);
  const provinceChevronRotation = useSharedValue(0);
  const DROPDOWN_HEIGHT = 200;

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
    if (regionHeight.value > 0) {
      regionHeight.value = withTiming(0, { duration: 300 });
      regionChevronRotation.value = withSpring(0);
    } else {
      regionHeight.value = withTiming(DROPDOWN_HEIGHT, { duration: 300 });
      regionChevronRotation.value = withSpring(180);
      // ถ้าเปิด region ให้ปิด province
      provinceHeight.value = withTiming(0, { duration: 300 });
      provinceChevronRotation.value = withSpring(0);
    }
  };

  const toggleProvinceDropdown = () => {
    if (!selectedValueRegion) return;
    if (provinceHeight.value > 0) {
      provinceHeight.value = withTiming(0, { duration: 300 });
      provinceChevronRotation.value = withSpring(0);
    } else {
      provinceHeight.value = withTiming(DROPDOWN_HEIGHT, { duration: 300 });
      provinceChevronRotation.value = withSpring(180);
      // ถ้าเปิด province ให้ปิด region
      regionHeight.value = withTiming(0, { duration: 300 });
      regionChevronRotation.value = withSpring(0);
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
    if (!selectedValueRegion) return [];
    return provinces[selectedValueRegion as RegionKey] || [];
  };
  const handleDropdownChangeRegion= (value: any) => {
    setSelectedValueRegion(value);
  }
  const handleDropdownChangeProvince= (value: any) => {
    setSelectedValueProvince(value);
  }

  const handleCreatePlan = () => {
    router.push({
      pathname: "/(tabs)/add/tripmanually",
      params: {
        tripName: tripName,
        region: selectedValueRegion,
        province: selectedValueProvince,
        startDate: startDate.toISOString(),
        startTime: startTime.toISOString(),
        endDate: endDate.toISOString(),
        endTime: endTime.toISOString(),
        visibility: selectedOption
      }
    });
  };

  const handleCreatePlanAi = () => {
    router.push({
      pathname: "/(tabs)/add/tripgenai",
      params: {
        tripName: tripName,
        region: selectedValueRegion,
        province: selectedValueProvince,
        startDate: startDate.toISOString(),
        startTime: startTime.toISOString(),
        endDate: endDate.toISOString(),
        endTime: endTime.toISOString(),
        visibility: selectedOption
      }
    });
  };

  // Date/time change handlers
  const onChangeStartDate = (event: any, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      setStartDate(selectedDate);
    }
    if (Platform.OS === 'android') {
      setShowStartDatePicker(false);
    }
  };

  const onChangeEndDate = (event: any, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      setEndDate(selectedDate);
    }
    if (Platform.OS === 'android') {
      setShowEndDatePicker(false);
    }
  };

  const onChangeStartTime = (event: any, selectedTime?: Date) => {
    if (event.type === 'set' && selectedTime) {
      setStartTime(selectedTime);
    }
    if (Platform.OS === 'android') {
      setShowStartTimePicker(false);
    }
  };

  const onChangeEndTime = (event: any, selectedTime?: Date) => {
    if (event.type === 'set' && selectedTime) {
      setEndTime(selectedTime);
    }
    if (Platform.OS === 'android') {
      setShowEndTimePicker(false);
    }
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
        <DropdownComponent 
          onValueChange={handleDropdownChangeRegion} 
          data={regions} 
          label="Region"
        />
      </View>

      {/* Province */}
      <View style={{ marginBottom: 16, zIndex: 2 }}>
        <ThemedText className="text-[#203B82] py-2">Province</ThemedText>
        <DropdownComponent 
          onValueChange={handleDropdownChangeProvince} 
          data={getFilteredProvinces()} 
          label="Province"
        />
      </View>

      {/* Date and Time Selection */}
      <XStack style={{ gap: 16, marginBottom: 16 }}>
        <View style={{ flex: 1 }}>
          <ThemedText className="text-[#203B82] py-2">Start date</ThemedText>
          <Pressable onPress={() => setShowStartDatePicker(true)}>
            <XStack style={styles.pickerContainer}>
              <Calendar size={16} color="#6c757d" style={{ marginRight: 8 }} />
              <ThemedText>{startDate.toLocaleDateString()}</ThemedText>
            </XStack>
          </Pressable>
          <ThemedText className="text-[#203B82] py-2" style={{ marginTop: 8 }}>Start time</ThemedText>
          <Pressable onPress={() => setShowStartTimePicker(true)}>
            <XStack style={styles.pickerContainer}>
              <Clock size={16} color="#6c757d" style={{ marginRight: 8 }} />
              <ThemedText>{startTime.toLocaleTimeString()}</ThemedText>
            </XStack>
          </Pressable>
        </View>

        <View style={{ flex: 1 }}>
          <ThemedText className="text-[#203B82] py-2">End date</ThemedText>
          <Pressable onPress={() => setShowEndDatePicker(true)}>
            <XStack style={styles.pickerContainer}>
              <Calendar size={16} color="#6c757d" style={{ marginRight: 8 }} />
              <ThemedText>{endDate.toLocaleDateString()}</ThemedText>
            </XStack>
          </Pressable>
          <ThemedText className="text-[#203B82] py-2" style={{ marginTop: 8 }}>End time</ThemedText>
          <Pressable onPress={() => setShowEndTimePicker(true)}>
            <XStack style={styles.pickerContainer}>
              <Clock size={16} color="#6c757d" style={{ marginRight: 8 }} />
              <ThemedText>{endTime.toLocaleTimeString()}</ThemedText>
            </XStack>
          </Pressable>
        </View>
      </XStack>

      {/* Visibility Options */}
      <View style={{ marginBottom: 24 }}>
        <ThemedText className="text-[#203B82] py-2">Who can view</ThemedText>
        <YStack style={{ gap: 16 }}>
          <Pressable onPress={() => setSelectedOption("Public")}>
            <YStack style={{ gap: 8 }}>
              <RadioButton label="Public" selected={selectedOption === "Public"} />
              <ThemedText style={{ color: 'gray', fontSize: 14, marginLeft: 26 }}>
                Everyone can see this trip
              </ThemedText>
            </YStack>
          </Pressable>
          <Pressable onPress={() => setSelectedOption("Private")}>
            <YStack style={{ gap: 8 }}>
              <RadioButton label="Private" selected={selectedOption === "Private"} />
              <ThemedText style={{ color: 'gray', fontSize: 14, marginLeft: 26 }}>
                Only you can see this trip
              </ThemedText>
            </YStack>
          </Pressable>
        </YStack>
      </View>

      {/* Action Buttons */}
      <View style={{ marginTop: 'auto', paddingBottom: 20, zIndex: 1 }}>
        <TamaguiButton
          style={{
            backgroundColor: '#3b82f6',
            borderRadius: 8,
            height: 45,
            justifyContent: 'center',
            marginBottom: 10,
          }}
          onPress={handleCreatePlan}
        >
          <ThemedText style={{ color: 'white', textAlign: 'center' }}>
            Create Plan Manually
          </ThemedText>
        </TamaguiButton>

        <TamaguiButton
          style={{
            backgroundColor: '#10b981',
            borderRadius: 8,
            height: 45,
            justifyContent: 'center',
          }}
          onPress={handleCreatePlanAi}
        >
          <ThemedText style={{ color: 'white', textAlign: 'center' }}>
            Use AI Generate
          </ThemedText>
        </TamaguiButton>
      </View>
    </YStack>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.themedView}>
        <Bgelement />
        {/* Header */}
        <XStack style={{ paddingHorizontal: 16, paddingVertical: 8, alignItems: 'center' }}>
          <ThemedCustomBackButton style={{ marginTop: 20 }}/>
        </XStack>
        <ThemedText style={{ fontSize: 25, fontWeight: '600', marginLeft: 12, marginBottom: 16 }}>
          Create a Trip
        </ThemedText>
        <FlatList
          data={[{ key: 'content' }]}
          renderItem={() => renderContent()}
          keyExtractor={(item) => item.key}
          scrollEnabled
          nestedScrollEnabled
        />

        {/* Custom DateTimePickers */}
        <CustomDateTimePicker
          visible={showStartDatePicker}
          mode="date"
          value={startDate}
          onChange={onChangeStartDate}
          onClose={() => setShowStartDatePicker(false)}
        />
        <CustomDateTimePicker
          visible={showEndDatePicker}
          mode="date"
          value={endDate}
          onChange={onChangeEndDate}
          onClose={() => setShowEndDatePicker(false)}
        />
        <CustomDateTimePicker
          visible={showStartTimePicker}
          mode="time"
          value={startTime}
          onChange={onChangeStartTime}
          onClose={() => setShowStartTimePicker(false)}
        />
        <CustomDateTimePicker
          visible={showEndTimePicker}
          mode="time"
          value={endTime}
          onChange={onChangeEndTime}
          onClose={() => setShowEndTimePicker(false)}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  themedView: {
    flex: 1,
  },
  pickerContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#203B82',
    borderRadius: 8,
    padding: 8,
    height: 45,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
    opacity: 0.5,
  },
});
