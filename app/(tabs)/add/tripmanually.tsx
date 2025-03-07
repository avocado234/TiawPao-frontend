import React, { useEffect, useState } from 'react';
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
  Platform
} from 'react-native';
import type { CardProps } from 'tamagui';
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
import { DialogInstance } from '@/components/DialogInstance';
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
  const planid = params.planID;
  const [plandata, setPlanData] = useState<PlanData | null>(null);
  const [placeslist, setPlacesList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isTimeModalVisible, setTimeModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [catagories, setCatagories] = useState<number>(0);
  const [activeDay, setActiveDay] = useState<number>(-1); // store index of active day
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState(new Date());


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
      console.log(response.data.plan_data.province_id);
      const places: any = await apiTAT.get(
        `/places?province_id=${response.data.plan_data.province_id}&limit=50&has_thumbnail=has_thumbnail`
      );
      setPlacesList(places.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const start = new Date(plandata?.start_date || new Date().toISOString());
  const end = new Date(plandata?.end_date || new Date().toISOString());
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // When user taps the "Add to Trip" button on a card,
  // close the location modal and open the time selection modal.
  const openTimeModal = (placeId: string) => {
    setSelectedPlaceId(placeId); // กำหนด place ที่เลือก
    toggleModal(); // ปิด modal สถานที่
    // setTimeModalVisible(true); // เปิด modal เลือกเวลา
    setTimeout(() => {
      setTimeModalVisible(true); // เปิด modal เลือกเวลา
    }, 300);
  };

  const confirmTimeSelection = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('User not logged in');
      }
      const idToken = await currentUser.getIdToken();
      // ส่งข้อมูล selectedPlaceId และ selectedTime ไปยัง API
      const response = await api.put(
        `/plan/addtriplocation/${planid}`,
        { place_id: selectedPlaceId, time: selectedTime.toISOString() },
        { headers: { Authorization: `Bearer ${idToken}` } }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    setTimeModalVisible(false); // ปิด modal เลือกเวลา
    toggleModal(); // กลับไปเปิด modal สถานที่อีกครั้ง
  };
  
  const cancelTimeModal = () => {
    setTimeModalVisible(false); // ปิด modal เลือกเวลา
    toggleModal(); // กลับไปเปิด modal สถานที่อีกครั้ง
  };

  const handleDropdownCat = (value: any) => {
    console.log(value);
    setCatagories(value);
  };

  const addToPlan = () => {
    toggleModal();
  };

  if (loading) {
    return <LoadingComponent />;
  }

  // const testdata = [
  //   { id: 1, name: 'test1' },
  //   { id: 2, name: 'test1' },
  //   { id: 3, name: 'test1' },
  // ];

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.themedView}>
        <Bgelement />
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
          <Icon name="arrow-back-outline" size={24} color="#203B82" />
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
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
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit</Text>
                <FontAwesome6 name="edit" size={20} color="#203B82" style={styles.editIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => router.push("/(tabs)/add/maptrip")} style={styles.iconButton}>
                <Feather name="map" size={20} color="#FFFFFF" />
                <Text style={styles.iconTextInline}>View Location</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
          {Array.from({ length: days }).map((_, index) => (
            <Accordion
              key={index}
              overflow="hidden"
              width="full"
              borderRadius="$3"
              backgroundColor="$white0"
              paddingBottom="$2"
              type="multiple"
            >
              <Accordion.Item value="a1">
                <Accordion.Trigger
                  flexDirection="row"
                  justifyContent="space-between"
                  onPress={() => setActiveDay(activeDay === index ? -1 : index)}
                >
                  {({ open }: any) => (
                    <>
                      <Paragraph>
                        Day {index + 1},{' '}
                        {new Date(start.getTime() + index * 86400000).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </Paragraph>
                      <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                        <ChevronDown size="$1" />
                      </Square>
                    </>
                  )}
                </Accordion.Trigger>
                <Accordion.HeightAnimator animation="medium">
                  <Accordion.Content animation="medium" exitStyle={{ opacity: 0 }}>
                    <Paragraph>
                      <TouchableOpacity onPress={toggleModal}>
                        <View style={styles.dropdownRow}>
                          <Icon name="add-circle-outline" size={24} color="#203B82" />
                          <Text style={styles.dropdownText}>Adding some location</Text>
                        </View>
                      </TouchableOpacity>
                    </Paragraph>
                  </Accordion.Content>
                </Accordion.HeightAnimator>
              </Accordion.Item>
            </Accordion>
          ))}
          <View style={styles.budgetContainer}>
            <Text style={styles.budgetText}>Average budget</Text>
            <Text style={styles.budgetAmount}>0 ฿</Text>
          </View>
        </ScrollView>
      </ThemedView>

      {/* Modal for Location List (Filter & Search) */}
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Location</Text>
          {/* <View style={styles.dropdownContainer}>
            <FilterDropDown
              onValueChange={handleDropdownCat}
              data={catagoriesData}
              label="Province"
            />
          </View> */}
          <View style={styles.searchContainer}>
            <Icon name="search-outline" size={20} color="#203B82" />
            <TextInput
              style={styles.searchInput}
              placeholder="Where do you want to go"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          <ScrollView style={styles.cardContainer}>
            {placeslist.map((item: any) => (
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
                  <Button
                    onPress={() => openTimeModal(item.placeId)}
                    borderRadius="$10"
                  >
                    Add to Trip
                  </Button>
                  {/* <DialogInstance/> */}
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
      {/* Modal สำหรับเลือกเวลา */}
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  cardAddress: {
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tripDate: {
    fontSize: 16,
    color: '#FFFFFF',
    marginVertical: 4,
    marginLeft: 4,
  },
  province: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  budgetContainer: {
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
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
