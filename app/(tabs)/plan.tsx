import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import MyPlanBox from '@/components/MyplanBox';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Bgelement from '@/components/Bgelement';

const initialTrips = [
  { id: 1, nametrip: "Chonburi trip", price: "500$", date: "24 Jan - 26 Jan", location: "Pattaya, Chonburi" },
  { id: 2, nametrip: "Chiang Mai Tour", price: "600$", date: "13 June - 19 June", location: "Chiang Mai" },
  { id: 3, nametrip: "Go Khon Kaen", price: "700$", date: "13 June - 19 June", location: "Khon Kaen" },
  { id: 4, nametrip: "Rayong First Time", price: "700$", date: "24 Jan - 25 Jan", location: "Rayong" },
  { id: 5, nametrip: "Rayong First Time", price: "700$", date: "24 Jan - 25 Jan", location: "Rayong" },
  { id: 6, nametrip: "Rayong First Time", price: "700$", date: "24 Jan - 25 Jan", location: "Rayong" },
  { id: 7, nametrip: "Rayong First Time", price: "700$", date: "24 Jan - 25 Jan", location: "Rayong" },
  { id: 8, nametrip: "Rayong First Time 12", price: "700$", date: "24 Jan - 25 Jan", location: "Rayong" },
];

const { width, height } = Dimensions.get('screen');

const Plan: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [trips, setTrips] = useState(initialTrips);

  const handleDelete = (id: number) => {
    setTrips(trips.filter(trip => trip.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.themedView}>
        <Bgelement />
        <View style={styles.headerWrapper}>
          <ThemedText style={styles.headerText}>My Plan</ThemedText>
        </View>
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollContainer}>
          <MyPlanBox trips={trips} isEditMode={isEditMode} onDelete={handleDelete} />
        </ScrollView>
        {/* Edit Button */}
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
