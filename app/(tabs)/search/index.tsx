import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Bgelement from '@/components/Bgelement';
import Filterplan from '@/components/Filterplan';
import TripCard from '@/components/TripCard';
import { useRouter } from "expo-router";
import api from '@/utils/axiosInstance';
import LoadingComponent from '@/components/LoadingComponent';

const { width, height } = Dimensions.get('window');

interface PlanData {
  author_email: string;
  author_img: string;
  end_date: string;
  end_time: string;
  plan_id: string;
  description: string;
  province_id: string;
  province_label: string;
  region_label: string;
  start_date: string;
  start_time: string;
  trip_location: any[];
  trip_name: string;
  visibility: boolean;
}

const Search: React.FC = () => {
  const [planDataArray, setPlanDataArray] = useState<PlanData[]>([]);
  const [filteredTrips, setFilteredTrips] = useState<PlanData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getPublicPlan = async () => {
    try {
      const response = await api.get('/plan/getpublicplan');
      setPlanDataArray(response.data);
      setFilteredTrips(response.data); 
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

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.themedView}>
        <Bgelement />
        {/* Header */}
        <View style={styles.headerWrapper}>
          <ThemedText style={styles.headerText}>Public Plan</ThemedText>
        </View>

        {/* Filterplan Section */}
        <Filterplan trips={planDataArray} setFilteredTrips={setFilteredTrips} />

        {/* Trip List */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {filteredTrips.map((trip, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              style={{ alignItems: 'center' }}
              onPress={() => {
                router.replace({
                  pathname: '/(tabs)/add/tripmanually',
                  params: {
                    planID: trip.plan_id,
                  },
                });
              }}
            >
              <TripCard {...trip} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  themedView: { flex: 1 },
  headerWrapper: {
    marginTop: height * 0.1,
    paddingHorizontal: width * 0.06,
    marginBottom: height * 0.015,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    
  },
  headerText: {
    fontSize: width * 0.08,
    color: 'white',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: height * 0.01,
  },
});

export default Search;
