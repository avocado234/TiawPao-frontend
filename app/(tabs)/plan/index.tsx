import React, { useState, useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import MyPlanBox from '@/components/MyplanBox';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Bgelement from '@/components/Bgelement';
import api from '@/utils/axiosInstance';
import { useUserStore } from '@/store/useUser';
import { auth } from '@/config/firebaseconfig';
import LoadingComponent from '@/components/LoadingComponent';
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

interface Trip {
  plan_data: PlanData;
}

const Plan: React.FC = () => {
  const [planDataArray, setPlanDataArray] = useState<Trip[]>([]);
  // ใช้ selector เพื่อดึง userPlanIds จาก global state
  const userPlanIds = useUserStore((state) => state.user.userplan_id);
  const { removeUserPlanId } = useUserStore();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const getUserTrip = async () => {
    try {
      if (!refreshing) {
        setLoading(true);
      }
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('User not logged in');
      }
      const idToken = await currentUser.getIdToken();
      console.log("Global userplan_id:", userPlanIds);
      const planDataResponses = await Promise.all(
        userPlanIds.map(async (planId) => {
          console.log(`Requesting plan data for: ${planId}`);
          const response = await api.get(`/plan/getplanbyid/${planId}`, {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });
          // คาดว่า response.data มีรูปแบบ { plan_data: { ... } }
          return response.data;
        })
      );
      const trips: Trip[] = planDataResponses.map((data: any) => ({
        plan_data: data.plan_data,
      }));
      setPlanDataArray(trips);
    } catch (err) {
      console.error("Error fetching PlanData:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // เมื่อหน้าถูก focus ให้เรียก getUserTrip ใหม่ โดยขึ้นอยู่กับ userPlanIds
  useFocusEffect(
    useCallback(() => {
      getUserTrip();
    }, [userPlanIds])
  );

  // ฟังก์ชัน refresh สำหรับ pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getUserTrip();
  }, [userPlanIds]);

  const handleDelete = async (planId: string) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('User not logged in');
      }
      const idToken = await currentUser.getIdToken();

      const payload = { plan_id: planId };
      await api.delete(`/user/deleteuserplanbyemail/${useUserStore.getState().user.email}`, {
        data: payload,
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
      });
      // อัปเดต global state เพื่อลบ planId
      removeUserPlanId(planId);
      await api.delete(`/plan/deleteplanbyid/${planId}`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      setPlanDataArray((prev) =>
        prev.filter((trip) => trip.plan_data.plan_id !== planId)
      );
    } catch (err) {
      console.error("Error deleting plan:", err);
    }
  };

  if (loading && !refreshing) {
    return (
     <LoadingComponent/>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.themedView}>
        <Bgelement />
        <View style={styles.headerWrapper}>
          <ThemedText style={styles.headerText}>My Plan</ThemedText>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <MyPlanBox
            trips={planDataArray}
            isEditMode={isEditMode}
            onDelete={handleDelete}
          />
        </ScrollView>
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
    backgroundColor: '#203B82',
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
