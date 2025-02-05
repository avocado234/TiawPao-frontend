import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'tamagui';
import PublicPlanBox from '@/components/PublicPlanBox';
import { ThemedText } from '@/components/ThemedText';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ThemedView } from '@/components/ThemedView';
import Filterplan from '@/components/Filterplan';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const FILTER_PANEL_HEIGHT = 200; // ปรับความสูงของ Filter Panel ตามที่ต้องการ

const Search: React.FC = () => {
  // State สำหรับ toggle เปิด/ปิด Filter Panel
  const [filterOpen, setFilterOpen] = useState<boolean>(false);

  // Shared value สำหรับความสูงของ Filter Panel
  const filterHeight = useSharedValue(0);

  // สไตล์แบบแอนิเมชันสำหรับ Filter Panel โดยใช้ความสูงที่เปลี่ยนแปลงได้
  const animatedFilterStyle = useAnimatedStyle(() => ({
    height: filterHeight.value,
  }));

  // Toggle Filter Panel เมื่อกดปุ่ม filter
  const toggleFilter = () => {
    if (filterOpen) {
      // ถ้าเปิดอยู่อยู่แล้ว ให้ปิดโดย animate height กลับเป็น 0
      filterHeight.value = withTiming(0, { duration: 300 });
      setFilterOpen(false);
    } else {
      // ถ้าปิดอยู่ ให้เปิดโดย animate height จาก 0 เป็น FILTER_PANEL_HEIGHT
      filterHeight.value = withTiming(FILTER_PANEL_HEIGHT, { duration: 300 });
      setFilterOpen(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.themedView}>
        <Image
          className="absolute -top-96"
          source={require("@/assets/images/Bgcycle.png")}
          style={styles.backgroundImage}
        />
        <View style={styles.headerWrapper}>
          <ThemedText className=' inset-5' style={styles.headerText}>Public Plan</ThemedText>
          <TouchableNativeFeedback>
            <TouchableOpacity onPress={toggleFilter}>
              <AntDesign
                className="absolute end-5 -top-16"
                name="filter"
                size={36}
                color="white"
              />
            </TouchableOpacity>
          </TouchableNativeFeedback>
        </View>
        {/* Filter Panel */}
        <Animated.View style={[styles.filterContainer, animatedFilterStyle]}>
          <Filterplan />
        </Animated.View>
        {/* เนื้อหา Scrollable */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={false}
        >
          <PublicPlanBox />
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  themedView: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: -185,
    right: -180,
    width: '250%',
    height: '90%',
  },
  headerWrapper: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 44,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  filterContainer: {
    overflow: 'hidden',
  
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: 10,
    paddingBottom: 40, // เพิ่ม padding ด้านล่างเพื่อให้ scroll ถึงเนื้อหาสุดท้ายได้
  },
});

export default Search;
