import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Alert, TouchableOpacity } from 'react-native';
import Animated, { 
  interpolate, 
  interpolateColor, 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring, 
  withRepeat, 
  runOnJS 
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import api from '@/utils/axiosInstance';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = -width * 0.3;

const AnimatedLocationItem = ({ loc, onDelete, isEditMode, isFirst }: { loc: any; onDelete: (placeId: string) => void; isEditMode: boolean; isFirst: boolean }) => {
  const translateX = useSharedValue(isEditMode && isFirst ? -15 : 0);
  const showDelete = useSharedValue(0);
  const bounceX = useSharedValue(0);

  useEffect(() => {
    if (isEditMode && isFirst) {
      translateX.value = withSpring(-15); 
      bounceX.value = withRepeat(withSpring(-10, { damping: 5, stiffness: 100 }), -1, true);
    } else {
      translateX.value = withSpring(0); 
      bounceX.value = 0;
    }
  }, [isEditMode, isFirst]);

  const handleDelete = async () => {
    try {
      await api.delete(`/plan/deletetriplocation/${loc.place_id}`);
      runOnJS(onDelete)(loc.place_id);
    } catch (error) {
      Alert.alert("Error", "Failed to delete location");
    }
  };

  const showAlert = () => {
    Alert.alert(
      "Delete Location",
      "Are you sure you want to delete this location?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => runOnJS(handleDelete)(), style: "destructive" }
      ]
    );
  };

  const swipeGesture = Gesture.Pan()
    .enabled(isEditMode)
    .onUpdate(event => {
      translateX.value = event.translationX + (isFirst ? -15 : 0);
      showDelete.value = interpolate(translateX.value, [SWIPE_THRESHOLD, 0], [1, 0]);
    })
    .onEnd(() => {
      if (translateX.value <= SWIPE_THRESHOLD) {
        runOnJS(showAlert)();
      }
      translateX.value = withSpring(isEditMode && isFirst ? -15 : 0); 
      showDelete.value = withSpring(0);
    });

  const animatedItemStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    backgroundColor: interpolateColor(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      ['white', '#FFEBEE']
    ),
  }));

  const trashIconStyle = useAnimatedStyle(() => ({
    opacity: isEditMode ? showDelete.value : 0,
    transform: [{ scale: showDelete.value }],
  }));

  const bounceArrowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: bounceX.value }],
    opacity: isEditMode && isFirst ? 1 : 0,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.arrowContainer}>
        {/* ลูกศรที่ขยับซ้าย-ขวา */}
        <Animated.View style={[bounceArrowStyle]}>
          <Ionicons name="arrow-back" size={24} color="#203B82" />
        </Animated.View>
      </View>

      <View style={styles.mainContent}>
        {/* รายการสถานที่ */}
        <GestureDetector gesture={swipeGesture}>
          <Animated.View style={[styles.locationItem, animatedItemStyle]}>
            <Text style={styles.locationPlace}>{loc.place_label}</Text>
            <Image source={{ uri: loc.thumbnail_url }} style={styles.locationThumbnail} />
            <Text style={styles.locationInfo}>Category: {loc.categorie_label}</Text>
            <Text style={styles.locationInfo}>Time: {loc.time_location}</Text>
          </Animated.View>
        </GestureDetector>

        {/* ไอคอนถังขยะ */}
        <Animated.View style={[styles.trashIconContainer, trashIconStyle]}>
          <TouchableOpacity onPress={showAlert} disabled={!isEditMode}>
            <FontAwesome name="trash" size={24} color="red" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default AnimatedLocationItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  arrowContainer: {
    width: 30, // กำหนดพื้นที่ให้ลูกศรอยู่
    alignItems: 'center',
  },
  mainContent: {
    flex: 1, // ให้รายการเต็มพื้นที่ที่เหลือ
    flexDirection: 'row',
    alignItems: 'center',
  },
  trashIconContainer: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  locationItem: {
    flex: 1, // ให้เต็มพื้นที่ของ mainContent
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 10,
    marginLeft: 10, // เว้นช่องให้ลูกศรอยู่ทางซ้าย
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  locationPlace: {
    fontFamily: 'Nunito',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  locationThumbnail: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginVertical: 10,
  },
  locationInfo: {
    fontFamily: 'Nunito',
    fontSize: 14,
    color: '#555',
  },
});
