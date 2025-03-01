import React, { useState, useEffect } from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Platform,
  Alert
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
import FilterDropDown from '@/components/FilterDropDown';
import api from '@/utils/axiosInstance';
import { useUserStore } from '@/store/useUser';
import {auth} from '@/config/firebaseconfig'
import uuid from 'react-native-uuid';
import apiTAT from '@/utils/axiosTATInstance';
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
  const [selectedValueProvinceID, setSelectedValueProvinceID] = useState(null);
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
      { id: 218, value: "ang_thong", label: "Ang Thong" },
      { id: 229, value: "ayutthaya", label: "Ayutthaya" },
      { id: 219, value: "bangkok", label: "Bangkok" },
      { id: 221, value: "chainat", label: "Chainat" },
      { id: 223, value: "lopburi", label: "Lop Buri" },
      { id: 224, value: "nakhon_nayok", label: "Nakhon Nayok" },
      { id: 225, value: "nakhon_pathom", label: "Nakhon Pathom" },
      { id: 226, value: "nonthaburi", label: "Nonthaburi" },
      { id: 227, value: "pathum_thani", label: "Pathum Thani" },
      { id: 234, value: "samut_prakan", label: "Samut Prakan" },
      { id: 235, value: "samut_sakhon", label: "Samut Sakhon" },
      { id: 236, value: "samut_songkhram", label: "Samut Songkhram" },
      { id: 237, value: "saraburi", label: "Saraburi" },
      { id: 238, value: "sing_buri", label: "Sing Buri" },
      { id: 239, value: "suphan_buri", label: "Suphan Buri" }
    ],
    northern: [
      { id: 101, value: "chiang_mai", label: "Chiang Mai" },
      { id: 102, value: "chiang_rai", label: "Chiang Rai" },
      { id: 103, value: "kamphaeng_phet", label: "Kamphaeng Phet" },
      { id: 104, value: "lampang", label: "Lampang" },
      { id: 105, value: "lamphun", label: "Lamphun" },
      { id: 106, value: "mae_hong_son", label: "Mae Hong Son" },
      { id: 107, value: "nakhon_sawan", label: "Nakhon Sawan" },
      { id: 108, value: "nan", label: "Nan" },
      { id: 109, value: "phayao", label: "Phayao" },
      { id: 110, value: "phetchabun", label: "Phetchabun" },
      { id: 111, value: "phichit", label: "Phichit" },
      { id: 112, value: "phitsanulok", label: "Phitsanulok" },
      { id: 113, value: "phrae", label: "Phrae" },
      { id: 114, value: "sukhothai", label: "Sukhothai" },
      { id: 115, value: "tak", label: "Tak" },
      { id: 117, value: "uttaradit", label: "Uttaradit" },
      { id: 116, value: "uthai_thani", label: "Uthai Thani" }
    ],
    northeastern: [
      { id: 571, value: "amnat_charoen", label: "Amnat Charoen" },
      { id: 590, value: "bueng_kan", label: "Bueng Kan" },
      { id: 572, value: "buri_ram", label: "Buri Ram" },
      { id: 573, value: "chaiyaphum", label: "Chaiyaphum" },
      { id: 574, value: "kalasin", label: "Kalasin" },
      { id: 575, value: "khon_kaen", label: "Khon Kaen" },
      { id: 576, value: "loei", label: "Loei" },
      { id: 577, value: "maha_sarakham", label: "Maha Sarakham" },
      { id: 578, value: "mukdahan", label: "Mukdahan" },
      { id: 579, value: "nakhon_phanom", label: "Nakhon Phanom" },
      { id: 580, value: "nakhon_ratchasima", label: "Nakhon Ratchasima" },
      { id: 581, value: "nong_bua_lam_phu", label: "Nong Bua Lam Phu" },
      { id: 582, value: "nong_khai", label: "Nong Khai" },
      { id: 583, value: "roi_et", label: "Roi Et" },
      { id: 584, value: "sakon_nakhon", label: "Sakon Nakhon" },
      { id: 585, value: "sisaket", label: "Sisaket" },
      { id: 586, value: "surin", label: "Surin" },
      { id: 587, value: "ubon_ratchathani", label: "Ubon Ratchathani" },
      { id: 588, value: "udon_thani", label: "Udon Thani" },
      { id: 589, value: "yasothon", label: "Yasothon" }
    ],
    eastern: [
      { id: 220, value: "chachoengsao", label: "Chachoengsao" },
      { id: 463, value: "chanthaburi", label: "Chanthaburi" },
      { id: 464, value: "chonburi", label: "Chonburi" },
      { id: 230, value: "prachin_buri", label: "Prachin Buri" },
      { id: 465, value: "rayong", label: "Rayong" },
      { id: 233, value: "sa_kaeo", label: "Sa Kaeo" },
      { id: 466, value: "trat", label: "Trat" }
    ],
    western: [
      { id: 222, value: "kanchanaburi", label: "Kanchanaburi" },
      { id: 228, value: "phetchaburi", label: "Phetchaburi" },
      { id: 231, value: "prachuap_khiri_khan", label: "Prachuap Khiri Khan" },
      { id: 232, value: "ratchaburi", label: "Ratchaburi" },
      { id: 236, value: "samut_songkhram", label: "Samut Songkhram" },
      { id: 239, value: "suphan_buri", label: "Suphan Buri" }
    ],
    southern: [
      { id: 343, value: "chumphon", label: "Chumphon" },
      { id: 344, value: "krabi", label: "Krabi" },
      { id: 345, value: "nakhon_si_thammarat", label: "Nakhon Si Thammarat" },
      { id: 346, value: "narathiwat", label: "Narathiwat" },
      { id: 347, value: "pattani", label: "Pattani" },
      { id: 348, value: "phang_nga", label: "Phang Nga" },
      { id: 349, value: "phatthalung", label: "Phatthalung" },
      { id: 350, value: "phuket", label: "Phuket" },
      { id: 351, value: "ranong", label: "Ranong" },
      { id: 352, value: "satun", label: "Satun" },
      { id: 353, value: "songkhla", label: "Songkhla" },
      { id: 354, value: "surat_thani", label: "Surat Thani" },
      { id: 355, value: "trang", label: "Trang" },
      { id: 356, value: "yala", label: "Yala" }
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
    // console.log("From Handel : " + value.id)
    setSelectedValueProvince(value.label);
    setSelectedValueProvinceID(value.id);
  }
  const { user } = useUserStore();

  // const handleFetchTATData = async () => {
  //   await apiTAT.get('/location/provinces')
  //   .then(response => {
  //     console.log(response.data);
  //   })
  //   .catch(error => {
  //     console.error('Error:', error);
  //   });
  // }

  const handleCreatePlan = async() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('User not logged in');
    }

    const idToken = await currentUser.getIdToken();
    const missingFields = getMissingFields();
    if (missingFields.length > 0) {
      Alert.alert(
        "Incomplete Form",
        `Please fill fields: ${missingFields.join(', ')}`,
        [{ text: "OK" }]
      );
      return;
    }
   try{
    console.log("TEST")
    const planID = uuid.v4();
    const dataJson = {
      "plan_id":  planID,
      "author_email": user.email,
      "author_img": user.image,
      "trip_name": tripName,
      "region_label": selectedValueRegion,
      "province_label": selectedValueProvince,
      "province_id": String(selectedValueProvinceID),
      "start_date": startDate.toISOString(),
      "start_time": startTime.toISOString(),
      "end_date": endDate.toISOString(),
      "end_time": endTime.toISOString(),
      "trip_location": [],
      "visibility": selectedOption === 'Public'
    }
    const response = await api.post(`/user/createplan`, dataJson,{
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    });
    const formData = new FormData();
    formData.append("userplan_id", planID);

    await api.put(`/user/updateuserplan/${user.email}`,formData,{
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${idToken}`
      }
    });
    router.push({
          pathname: "/(tabs)/add/tripmanually",
          params: {
            planID: planID,
          }
        });
    // console.log(response)
  // .then( ()=>{
  //   router.push({
  //     pathname: "/(tabs)/add/tripmanually",
  //     params: {
  //       tripName: tripName,
  //       region: selectedValueRegion,
  //       province: selectedValueProvince,
  //       startDate: startDate.toISOString(),
  //       startTime: startTime.toISOString(),
  //       endDate: endDate.toISOString(),
  //       endTime: endTime.toISOString(),
  //       visibility: selectedOption
  //     }
  //   });
  // })
  
   }catch(err){
     console.log(err)
   }
    
  };

  const handleCreatePlanAi = () => {
    const missingFields = getMissingFields();
    if (missingFields.length > 0) {
      Alert.alert(
        "Incomplete Form",
        `Please fill in the following fields: ${missingFields.join(', ')}`,
        [{ text: "OK" }]
      );
      return;
    }
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

  const getMissingFields = () => {
    const missing = [];
    if (tripName.trim() === '') missing.push('Trip Name');
    if (!selectedValueRegion) missing.push('Region');
    if (!selectedValueProvince) missing.push('Province');
    if (!startDate) missing.push('Start Date');
    if (!endDate) missing.push('End Date');
    if (!startTime) missing.push('Start Time');
    if (!endTime) missing.push('End Time');
    return missing;
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

  const navigateToIndex = () => {
    router.push('/index'); // เปลี่ยน '/index' เป็นเส้นทางที่ถูกต้องของหน้า index ของคุณ
  };

  const isFormValid = () => {
    return (
      tripName.trim() !== '' &&
      selectedValueRegion !== null &&
      selectedValueProvince !== null &&
      startDate !== null &&
      endDate !== null &&
      startTime !== null &&
      endTime !== null
    );
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
        <FilterDropDown
        onValueChange={handleDropdownChangeProvince} 
        data={getFilteredProvinces()} 
        label="Province"
        />
        {/* <DropdownComponent 
          onValueChange={handleDropdownChangeProvince} 
          data={getFilteredProvinces()} 
          label="Province"
        /> */}
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
      <View className ='mb-16'style={{ marginTop: 'auto', paddingBottom: 20, zIndex: 1 }}>
        <TamaguiButton
          style={{
            backgroundColor: '#3b82f6',
            borderRadius: 8,
            height: 45,
            justifyContent: 'center',
            marginBottom: 10,
          }}
          onPress={handleCreatePlan}
          // onPress={handleFetchTATData}
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
          <ThemedCustomBackButton style={{ marginTop: 20 }} onPress={navigateToIndex} />
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
