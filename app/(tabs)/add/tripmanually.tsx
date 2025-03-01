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
  ActivityIndicator
} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import Bgelement from "@/components/Bgelement";
import { useRouter, useLocalSearchParams } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { auth } from '@/config/firebaseconfig';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import api from '@/utils/axiosInstance';

// กำหนด interface สำหรับ query params
interface TripManuallyParams {
  planID?: string;
}

// กำหนด interface สำหรับข้อมูลแผน (PlanData)
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
  trip_location: any[]; // กำหนด type ให้เหมาะสมกับข้อมูล
  trip_name: string;
  visibility: boolean;
}

export default function TripManually() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const planid = params.planID;
  const [plandata, setPlanData] = useState<PlanData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getPlanData();
  }, []);

  const getPlanData = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('User not logged in');
    }
    const idToken = await currentUser.getIdToken();
    setLoading(true);
    try {
      const response = await api.get(`/plan/getplanbyid/${planid}`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      // สมมติว่า response.data มี property "plan_data"
      setPlanData(response.data.plan_data as PlanData);
      console.log(response.data.plan_data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const start = new Date("2025-01-01");
  const end = new Date("2025-01-01");
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1;

  const [expandedDays, setExpandedDays] = useState<number[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const toggleDay = (index: number) => {
    setExpandedDays(prev =>
      prev.includes(index) ? prev.filter(day => day !== index) : [...prev, index]
    );
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const addToPlan = () => {
    // Logic to add the location to the plan
    toggleModal();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#203B82" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.themedView}>
        <Bgelement />

        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/add')}>
          <Icon name="arrow-back-outline" size={24} color="#203B82" />
        </TouchableOpacity>

        <ScrollView 
          contentContainerStyle={styles.contentContainer} 
          showsVerticalScrollIndicator={false}
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

              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit</Text>
                <FontAwesome6 name="edit" size={20} color="#203B82" style={styles.editIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.iconContainer}>
              <TouchableOpacity 
                onPress={() => { router.push("/(tabs)/add/maptrip") }}
                style={styles.iconButton}
              >
                <Feather name="map" size={20} color="#FFFFFF" />
                <Text style={styles.iconTextInline}>View Location</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconButton}>
                <FontAwesome6 name="user-plus" size={19} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </ImageBackground>
          {Array.from({ length: days }).map((_, index) => (
            <View key={index} style={styles.dayContainer}>
              <TouchableOpacity onPress={() => toggleDay(index)} style={styles.dayHeader}>
                <Text style={styles.dayText}>
                  Day {index + 1}, {new Date(start.getTime() + index * 86400000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </Text>
                <Icon 
                  name={expandedDays.includes(index) ? "chevron-up-outline" : "chevron-down-outline"} 
                  size={20} 
                  color="#203B82" 
                />
              </TouchableOpacity>
              {expandedDays.includes(index) && (
                <View style={styles.dropdownContent}>
                  <View style={styles.dropdownRow}>
                    <Icon name="add-circle-outline" size={24} color="#203B82" />
                    <Text style={styles.dropdownText}>Build your day by adding some location</Text>
                  </View>
                  <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
                    <Icon name="add-outline" size={16} color="#FFFFFF" />
                    <Text style={styles.addButtonText}>Add</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
          <View style={styles.budgetContainer}>
            <Text style={styles.budgetText}>Average budget</Text>
            <Text style={styles.budgetAmount}>0 ฿</Text>
          </View>
        </ScrollView>
      </ThemedView>
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Location</Text>
          <View style={styles.searchContainer}>
            <Icon name="search-outline" size={20} color="#203B82" />
            <TextInput
              style={styles.searchInput}
              placeholder="Where do you want to go"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={toggleModal} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={addToPlan} style={styles.addToPlanButton}>
              <Text style={styles.addToPlanButtonText}>Add to plan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
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
  dayContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  dayText: {
    fontSize: 16,
    color: '#203B82',
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
  dropdownContent: {
    padding: 10,
    backgroundColor: 'rgba(224, 224, 224, 1)',
    borderRadius: 8,
    marginTop: 8,
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#203B82',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  addButtonText: {
    color: '#fff',
    marginLeft: 4,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalContent: { 
    backgroundColor: 'white',
    padding: 20,
    height: '50%',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#203B82',
    borderRadius: 8,
    paddingHorizontal: 30,
    marginBottom: 20,
    width: '100%',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    padding: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
