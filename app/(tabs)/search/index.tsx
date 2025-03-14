import React, { useEffect, useState, useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  RefreshControl,
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
  plan_id: string;
  author_email: string;
  author_name: string;
  author_img: string;
  trip_name: string;
  region_label: string;
  province_label: string;
  province_id: string;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  description: string;
  trip_location: any[];
  visibility: boolean;
}

const Search: React.FC = () => {
  const [planDataArray, setPlanDataArray] = useState<PlanData[]>([]);
  const [filteredTrips, setFilteredTrips] = useState<PlanData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const getPublicPlan = async () => {
    try {
      const response = await api.get('/plan/getpublicplan');
      setPlanDataArray(response.data);
      setFilteredTrips(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getPublicPlan();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getPublicPlan();
  }, []);

  const router = useRouter();

  if (loading && !refreshing) {
    return <LoadingComponent />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.themedView}>
        <Bgelement />
      
        <View style={styles.headerWrapper}>
          <ThemedText style={styles.headerText}>Public Plan</ThemedText>
        </View>

     
        <Filterplan trips={planDataArray} setFilteredTrips={setFilteredTrips} />

      
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
    marginTop: height * 0.005,
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
