import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Platform,
  RefreshControl,
  Dimensions
} from 'react-native';
import type { CardProps } from 'tamagui';
import { Gesture, GestureDetector, GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { Button, Card, H2, Image, XStack } from 'tamagui';
import { ThemedView } from '@/components/ThemedView';
import Bgelement from '@/components/Bgelement';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { auth } from '@/config/firebaseconfig';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import api from '@/utils/axiosInstance';
import apiTAT from '@/utils/axiosTATInstance';
import LoadingComponent from '@/components/LoadingComponent';
import { useFocusEffect } from '@react-navigation/native';
import { ChevronDown } from '@tamagui/lucide-icons';
import { Accordion, Paragraph, Square } from 'tamagui';
import FilterDropDown from '@/components/FilterDropDown';
import { catagoriesData } from '@/data/catagories';
import DateTimePicker from '@react-native-community/datetimepicker';
import TimePickerComponent from '@/components/TimePickerComponent';
import { useUserStore } from '@/store/useUser';
import { useNavigation } from 'expo-router';
import Animated, { Extrapolation, interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import AnimatedLocationItem from '@/components/AnimatedLocationItem';
interface TripManuallyParams {
  planID?: string;
}

interface PlanData {
  author_email: string;
  author_img: string;
  end_date: string;
  end_time: string;
  plan_id: string;
  province_id: string;
  province_label: string;
  region_label: string;
  start_date: string;
  start_time: string;
  trip_location: any[];
  trip_name: string;
  visibility: boolean;
}

export default function TripManually() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { user } = useUserStore();
  const planid = params.planID;
  const [plandata, setPlanData] = useState<PlanData | null>(null);
  const [placeslist, setPlacesList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isTimeModalVisible, setTimeModalVisible] = useState(false);
  const [catagories, setCatagories] = useState<number>(0);
  const [activeDay, setActiveDay] = useState<number>(-1); // store index of active day
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [searchText, setSearchText] = useState('');
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [timeLocation, setTimeLocation] = useState<Date | null>(null);
  const [location, setLocation] = useState<any[][]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // เพิ่มสถานะสำหรับการรีเฟรชข้อมูล
  const [isEdit, setIsEdit] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      getPlanData();
    }, [planid])
  );

  const getPlanData = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('User not logged in');
    }
    const idToken = await currentUser.getIdToken();
    setLoading(true);
    try {
      const response = await api.get(`/plan/getplanbyid/${planid}`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      setPlanData(response.data.plan_data as PlanData);

      const places: any = await apiTAT.get(
        `/places?province_id=${response.data.plan_data.province_id}&limit=50&has_thumbnail=has_thumbnail`
      );
      setPlacesList(places.data.data);

      // ดึงข้อมูล trip location
      const res_location = await api.get(`/plan/gettriplocation/${planid}`);

      // จัดข้อมูลให้เป็น 2D array ตาม `day`
      const locationArray: any[][] = [];

      res_location.data.trip_location.forEach((loc: any) => {
        const dayIndex = parseInt(loc.day, 10); // แปลง `day` เป็นตัวเลข
        if (!locationArray[dayIndex]) {
          locationArray[dayIndex] = []; // สร้าง array ว่างถ้ายังไม่มี
        }
        locationArray[dayIndex].push(loc);
      });

      setLocation(locationArray);
    } catch (error) {
      console.error(error);
      router.replace('/(tabs)/add/createtrip');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };



  const handleRefresh = async () => {
    setRefreshing(true);
    await getPlanData(); // เรียกใช้งาน getPlanData ใหม่
  };

  const start = new Date(plandata?.start_date || new Date().toISOString());
  const end = new Date(plandata?.end_date || new Date().toISOString());
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  const filteredPlaces = placeslist.filter((item) =>
    (item?.name?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
    (item?.location?.address?.toLowerCase() || "").includes(searchText.toLowerCase())
  );
  const handleOpen = (index: any) => {
    // console.log(index)
    setIsOpen(!isOpen);
    setActiveDay(isOpen ? -1 : index)
    // console.log(isOpen ? -1 : index)
  }
  // const ITEM_HEIGHT = 80;
  // const {width} = Dimensions.get('window');
  // const SWIPE_THRESHOLD = -width*0.3
  // const translateX = useSharedValue(0);
  // const itemHeight = useSharedValue(ITEM_HEIGHT)
  // const marginVertical = useSharedValue(10)
  // const opacity = useSharedValue(1);

  // const skewX = useSharedValue(0);
  // const skewY = useSharedValue(0);

  // const swipeGesture = Gesture.Pan().onUpdate(event => {
  //     translateX.value = event.translationX;
  //     skewX.value = interpolate(
  //       translateX.value, 
  //       [0, SWIPE_THRESHOLD],
  //       [0,25],Extrapolation.CLAMP
  //     );
  //     skewY.value = interpolate(
  //       translateX.value, 
  //       [0, SWIPE_THRESHOLD],
  //       [0,5],Extrapolation.CLAMP
  //     );
  // }).onEnd(event => {

  // })
  // const animatedItemStyle = useAnimatedStyle(() => ({
  //   transform: [
  //     { translateX: translateX.value },
  //     { skewX: `${skewX.value}deg` },
  //     { skewY: `${skewY.value}deg` }
  //   ],
  //   backgroundColor:interpolateColor(
  //     translateX.value,
  //     [0, SWIPE_THRESHOLD],
  //     ['white', 'lightcoral']
  //   )
  // }))
  const handleLoaction = () => {
    router.push({
      pathname: "/(tabs)/add/maptrip",
      params: { planID: planid }
    });
  }
  const { width } = Dimensions.get('window');
  const SWIPE_THRESHOLD = -width * 0.3;
  const handleDeleteLocation = (placeId: string) => {
    console.log("Delete",placeId);
    setLocation(prev => prev.map(dayLocations => 
      dayLocations.filter(loc => loc.place_id !== placeId)
    ));
  };
  const goToIndex = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "index" }], // เปลี่ยนไปหน้า index.tsx
    });
  };
  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.themedView}>
        <Bgelement />
        <TouchableOpacity style={styles.backButton} onPress={goToIndex}>
          <Icon name="arrow-back-outline" size={24} color="#203B82" />
        </TouchableOpacity>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#203B82']} // ตั้งค่าสีของการรีเฟรช (optional)
            />
          }
        >
          <ImageBackground
            source={require("@/assets/images/Chonburi.png")}
            style={styles.tripCard}
            imageStyle={{ borderRadius: 8 }}
          >
            <View style={styles.tripContent}>
              <Text style={styles.tripName}>{plandata?.trip_name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="calendar-clear" size={19} color="#FFFFFF" />
                <Text style={styles.tripDate}>
                  {start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} -
                  {end.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Feather name="map-pin" size={20} color="#FFFFFF" />
                <Text style={styles.province}>{plandata?.province_label || "Province Here"}</Text>
              </View>
              <TouchableOpacity style={styles.editButton} onPress={()=>{setIsEdit(!isEdit)}}>
              <Text style={styles.editButtonText}>{isEdit? "Done" : "Edit"}</Text>                
              <FontAwesome6 name="edit" size={20} color="#203B82" style={styles.editIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={handleLoaction} style={styles.iconButton}>
                <Feather name="map" size={20} color="#FFFFFF" />
                <Text style={styles.iconTextInline}>View Location</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
          {Array.from({ length: days }).map((_, index) => (
            <Accordion key={index} overflow="hidden" width="full" borderRadius="$3" backgroundColor="$white0" paddingBottom="$1" type="multiple">
              <Accordion.Item value={`day${index}`}>
                <Accordion.Trigger flexDirection="row" justifyContent="space-between" onPress={() => handleOpen(index)}>
                  <Paragraph style={{ fontFamily: 'Nunito' }}>
                    Day {index + 1}, {new Date(start.getTime() + index * 86400000).toLocaleDateString('en-GB')} 
                  </Paragraph>
                  <Square animation="quick"><ChevronDown size="$1" /></Square>
                </Accordion.Trigger>
                <Accordion.HeightAnimator animation="medium">
                  <Accordion.Content animation="medium">
                    <TouchableOpacity onPress={toggleModal}>
                        <View style={styles.dropdownRow}>
                          <Icon name="add-circle-outline" size={24} color="#203B82" />
                          <Text style={styles.dropdownText}>Adding some location</Text>
                        </View>
                      </TouchableOpacity>
                    <GestureHandlerRootView>
                      {location[index] && location[index].length > 0 ? (
                        location[index]
                          .sort((a, b) => {
                            const timeA = new Date(`1970-01-01T${a.time_location}:00Z`);
                            const timeB = new Date(`1970-01-01T${b.time_location}:00Z`);
                            return timeA.getTime() - timeB.getTime();
                          })
                          .map((loc, locIndex) => (
                            <AnimatedLocationItem 
                              key={`${loc.place_id}-${locIndex}`} 
                              loc={loc} 
                              onDelete={handleDeleteLocation} 
                              isEditMode={isEdit} 
                              isFirst={locIndex === 0} // ✅ เช็คว่าเป็น Index แรกหรือไม่
                            />
                          ))
                      ) : (
                        <Text style={styles.NunitoFont}>No locations added yet</Text>
                      )}

                    </GestureHandlerRootView>
                  </Accordion.Content>
                </Accordion.HeightAnimator>
              </Accordion.Item>
            </Accordion>
          ))}


        </ScrollView>
      </ThemedView>

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Location</Text>
          <View style={styles.searchContainer}>
            <Icon name="search-outline" size={20} color="#203B82" />
            <TextInput
              style={[styles.searchInput]}
              placeholder="Where do you want to go"
              placeholderTextColor="#203B82"

              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          <ScrollView style={styles.cardContainer}>
            {filteredPlaces.map((item) => (
              <Card key={item?.placeId} elevate size="$4" marginBottom="$5">
                <Card.Header padded>
                  <View style={styles.cardHeaderContainer}>
                    <H2 style={styles.cardTitle}>{item.name}</H2>
                    <Paragraph style={styles.cardAddress} theme="alt2">
                      {item.location.address}
                    </Paragraph>
                  </View>
                </Card.Header>
                <Card.Footer padded>
                  <XStack flex={1} />
                  <TimePickerComponent onChangeTime={setTimeLocation} planData={item} Day={activeDay} planID={planid} />
                </Card.Footer>
                <Card.Background>
                  <Image
                    resizeMode="cover"
                    alignSelf="center"
                    source={{ uri: item.thumbnailUrl[0] }}
                    style={styles.cardImage}
                  />
                </Card.Background>
              </Card>
            ))}
          </ScrollView>

          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={toggleModal} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  refreshControl: {
    marginTop: 10,
  },
  locationList: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  locationListTitle: {
    fontFamily: 'Nunito',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  NunitoFont: {
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'Nunito',
  },
  locationItem: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  locationPlace: {
    fontFamily: 'Nunito',
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationThumbnail: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginVertical: 10,
  },
  timeSelectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  selectedTimeText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  timeSelectButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // ScrollView container inside modal for Cards
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  cardImage: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
  },
  // Card header styles
  cardTitle: {
    fontFamily: 'Nunito',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  cardAddress: {
    fontFamily: 'Nunito',
    fontSize: 14,
    color: 'black',
    marginTop: 4,
  },
  cardHeaderContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    // Note: `backdropFilter` is not natively supported in React Native.
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  // General container styles
  container: {
    flex: 1,
    marginTop: 40,
  },
  themedView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  tripCard: {
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    margin: 16,
    opacity: 1,
  },
  tripName: {
    fontFamily: 'Nunito',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tripDate: {
    fontFamily: 'Nunito',
    fontSize: 16,
    color: '#FFFFFF',
    marginVertical: 4,
    marginLeft: 4,
  },
  province: {
    fontFamily: 'Nunito',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  budgetContainer: {
    fontFamily: 'Nunito',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  budgetText: {
    fontFamily: 'Nunito',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#203B82',
  },
  budgetAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#203B82',
  },
  tripContent: {
    flex: 1,
    padding: 16,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  iconTextInline: {
    fontFamily: 'Nunito',
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  editButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editIcon: {
    marginRight: 4,
    marginLeft: 4,
  },
  editButtonText: {
    fontFamily: 'Nunito',
    fontSize: 14,
    color: '#203B82',
    fontWeight: 'bold',
  },
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#203B82',
    marginLeft: 8,
  },
  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dropdownText: {
    fontFamily: 'Nunito',
    marginLeft: 8,
    color: '#203B82',
  },
  // Container style for the FilterDropDown wrapper
  dropdownContainer: {
    width: '100%',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#203B82',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
  },
  searchInput: {
    fontFamily: 'Nunito',
    flex: 1,
    marginLeft: 10,
    padding: 10,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    height: '60%',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: 'Nunito',
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'center',
    width: '100%',
  },
  cancelButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#203B82',
    marginRight: 10,
  },
  cancelButtonText: {
    fontFamily: 'Nunito',
    color: '#203B82',
  },
  addToPlanButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#203B82',
  },
  addToPlanButtonText: {
    color: 'white',
  },
});
