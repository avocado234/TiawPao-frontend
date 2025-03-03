import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import MyPlanBox from '@/components/MyplanBox';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Bgelement from '@/components/Bgelement';
import api from '@/utils/axiosInstance';
import { useUserStore } from '@/store/useUser';
import { auth } from '@/config/firebaseconfig';

const { width, height } = Dimensions.get('screen');

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

// Interface ที่ MyPlanBox ใช้ โดยข้อมูลจะถูกห่อหุ้มใน property "plan_data"
interface Trip {
  plan_data: PlanData;
}

const Plan: React.FC = () => {
  // เปลี่ยน state type จาก PlanData[] เป็น Trip[]
  const [planDataArray, setPlanDataArray] = useState<Trip[]>([]);
  const { user } = useUserStore();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const getUserTrip = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('User not logged in');
      }

      const idToken = await currentUser.getIdToken();
      const userPlanIds: string[] = user.userplan_id;
      const planDataResponses = await Promise.all(
        userPlanIds.map(async (planId) => {
          console.log(`Requesting plan data for: ${planId}`);
          const response = await api.get(`/plan/getplanbyid/${planId}`, {
            headers: {
              Authorization: `Bearer ${idToken}`
            }
          });
          // response.data ควรมีรูปแบบ { plan_data: { ... } }
          return response.data;
        })
      );
      // map ให้ตรงกับ interface Trip (object ที่มี property plan_data)
      const trips: Trip[] = planDataResponses.map((data: any) => ({
        plan_data: data.plan_data
      }));
      setPlanDataArray(trips);
    } catch (err) {
      console.error("Error to Fetch PlanData:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserTrip();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ThemedView style={[styles.themedView, styles.loadingContainer]}>
          <ActivityIndicator size="large" color="#fff" />
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.themedView}>
        <Bgelement />
        <View style={styles.headerWrapper}>
          <ThemedText style={styles.headerText}>My Plan</ThemedText>
        </View>
  
        {planDataArray.length === 0 ? (
          <View style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>Please create your plan</ThemedText>
          </View>
        ) : (
          <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={styles.scrollContainer}
          >
            <MyPlanBox trips={planDataArray} isEditMode={isEditMode} onDelete={() => { console.log("DELETE") }} />
          </ScrollView>
        )}
  
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditMode(!isEditMode)}
        >
          <MaterialCommunityIcons 
            name={isEditMode ? 'file-check-outline' : 'pencil'} 
            size={width * 0.08} 
            color="#fff" 
          />
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
  
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  themedView: { flex: 1 },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#203B82'
  },
  headerWrapper: {
    marginTop: height * 0.08,
  },
  headerText: {
    fontSize: 32,
    paddingHorizontal: width * 0.04, 
    color: 'white',
    fontWeight: 'bold',
    marginBottom: height * 0.01,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: height * 0.06, 
  },
  editButton: {
    position: 'absolute',
    backgroundColor: '#5680EC',
    right: width * 0.05, 
    bottom: height * 0.1,
    padding: width * 0.04,
    borderRadius: width * 0.1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Plan;
