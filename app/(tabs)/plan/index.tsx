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

const Plan: React.FC = () => {
  const { user } = useUserStore();
  const [planDataArray, setPlanDataArray] = useState<PlanData[]>([]);
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
          return response.data;
        })
      );
      setPlanDataArray(planDataResponses);
    } catch (err) {
      console.error("เกิดข้อผิดพลาดในการโหลด PlanData:", err);
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
    <SafeAreaView className='mt-5' style={styles.container}>
      <ThemedView style={styles.themedView}>
        <Bgelement />
        <View style={styles.headerWrapper}>
          <ThemedText style={styles.headerText}>My Plan</ThemedText>
        </View>
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollContainer}>
          {/* ส่งข้อมูล planDataArray ไปยัง MyPlanBox */}
          <MyPlanBox trips={planDataArray} isEditMode={isEditMode} onDelete={() => { console.log("DELETE") }} />
        </ScrollView>
        {/* ปุ่ม Edit */}
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
    backgroundColor: '#203B82' // สีพื้นหลังสำหรับหน้าล็อด
  },
  headerWrapper: {
    marginTop: height * 0.05, 
  },
  headerText: {
    fontSize: width * 0.1,
    marginHorizontal: 20, 
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
});

export default Plan;
