import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AntDesign from '@expo/vector-icons/AntDesign';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import Bgelement from '@/components/Bgelement';
import Filterplan from '@/components/Filterplan';
import TripCard from '@/components/TripCard';
import { useRouter } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import api from '@/utils/axiosInstance';
import LoadingComponent from '@/components/LoadingComponent';

const { width, height } = Dimensions.get('window');
const FILTER_PANEL_HEIGHT = height * 0.25;

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

// interface Trip {
//   plan_data: PlanData;
// }

const tripData = [
  { id: 1, user: "Jame Macdonell", nametrip: "Chonburi trip", price: "500 ฿", date: "24 Jan - 26 Jan", rating: "4.8", location: "Chonburi", description: "This plan is very good plan in Pattaya" },
  { id: 2, user: "Jame Macdonell", nametrip: "Bangkok trip", price: "600 ฿", date: "1 Feb - 3 Feb", rating: "4.5", location: "Bangkok", description: "This plan is very good plan in Pattaya" },
  { id: 3, user: "Jame Macdonell", nametrip: "Phuket trip", price: "700 ฿", date: "10 Mar - 12 Mar", rating: "4.7", location: "Phuket", description: "This plan is very good plan in Pattaya" },
  { id: 4, user: "Jame Macdonell", nametrip: "Krabi trip", price: "300 ฿", date: "10 Mar - 12 Mar", rating: "4.9", location: "Krabi", description: "Beautiful beaches and nice weather" },
];

const Search: React.FC = () => {

  const [planDataArray, setPlanDataArray] = useState<PlanData[]>([]);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [filteredTrips, setFilteredTrips] = useState(tripData);
  const [loading, setLoading] = useState<boolean>(true);
  const filterHeight = useSharedValue(0);

  const getPublicPlan = async () => {
    try {
      const response = await api.get('/plan/getpublicplan');
      setPlanDataArray(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPublicPlan();
  }, []);

  const router = useRouter();

  const animatedFilterStyle = useAnimatedStyle(() => ({ height: filterHeight.value }));

  const toggleFilter = () => {
    filterHeight.value = withTiming(filterOpen ? 0 : FILTER_PANEL_HEIGHT, { duration: 500 });
    setFilterOpen(!filterOpen);
  };
 
  if (loading) {
    return (
     <LoadingComponent/>
    );
  }
  return (
   <SafeAreaView className="flex-1 w-full !h-full">
         <ThemedView className="flex-1 w-full !h-full mt-5">
        <Bgelement />
        <View style={styles.headerWrapper}>
          <ThemedText style={styles.headerText}>Public Plan</ThemedText>
          <TouchableOpacity onPress={toggleFilter}>
            <MaterialIcons style={{ opacity: 0.75 }} name={filterOpen ? 'filter-list-off' : 'filter-list'} size={36} color="#fff" />
          </TouchableOpacity>
        </View>
        <Animated.View style={[styles.filterContainer, animatedFilterStyle]}>
          <Filterplan trips={tripData} setFilteredTrips={setFilteredTrips} />
        </Animated.View>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : (
          <ScrollView
  style={styles.scrollView}
  contentContainerStyle={styles.scrollContainer}
  showsVerticalScrollIndicator={false}
>
{planDataArray.map((trip, index) => (
  <TouchableOpacity
    key={index}
    activeOpacity={0.8}
    style={{ alignItems: "center" }}
    onPress={() => {
      router.replace({
        pathname: "/(tabs)/add/tripmanually",
        params: {
          planID: trip.plan_id,
        }
      });
    }}
  >
    <TripCard {...trip} />
  </TouchableOpacity>
))}

</ScrollView>

        )}
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
 
  headerWrapper: {
    marginTop: 48,
    paddingHorizontal: width * 0.04,
    marginBottom: height * 0.015,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: width * 0.1,
    color: 'white',
    fontWeight: 'bold',
    
  },
  filterContainer: {
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    minHeight: height,
    paddingBottom: height * 0.08,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Search;
