import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

interface Trip {
  id: number;
  user: string;
  nametrip: string;
  location: string;
  price: string;
  date: string;
  rating: string;
  description: string;
}

interface FilterplanProps {
  trips: Trip[];
  setFilteredTrips: (trips: Trip[]) => void;
}

const Filterplan: React.FC<FilterplanProps> = ({ trips, setFilteredTrips }) => {
  const [budget, setBudget] = useState<number>(9999);
  const [activeFilter, setActiveFilter] = useState<string>('');

  const sortTrips = (type: 'rating' | 'budget' | 'name', order: 'asc' | 'desc') => {
    setActiveFilter(`${type}-${order}`);
    let sortedTrips = [...trips];

    if (type === 'rating') {
      sortedTrips.sort((a, b) => order === 'desc' ? parseFloat(b.rating) - parseFloat(a.rating) : parseFloat(a.rating) - parseFloat(b.rating));
    } 
    else if (type === 'budget') {
      sortedTrips.sort((a, b) => order === 'desc' ? parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')) : parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
    } 
    else if (type === 'name') {
      sortedTrips.sort((a, b) => order === 'asc' ? a.nametrip.localeCompare(b.nametrip) : b.nametrip.localeCompare(a.nametrip));
    }

    setFilteredTrips(sortedTrips);
  };

  const filterByBudget = (value: number) => {
    setBudget(value);
    const filtered = trips.filter(trip => parseFloat(trip.price.replace('$', '')) <= value);
    setFilteredTrips(filtered);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filters</Text>

      <Text style={styles.subTitle}>Sort By</Text>
      <View style={styles.buttonRow}>
        
        <Pressable style={[styles.button, activeFilter === 'budget-asc' && styles.activeButton]} onPress={() => sortTrips('budget', 'asc')}>
          <Text style={styles.buttonText}>Budget (Low to High)</Text>
        </Pressable>
        <Pressable style={[styles.button, activeFilter === 'budget-desc' && styles.activeButton]} onPress={() => sortTrips('budget', 'desc')}>
          <Text style={styles.buttonText}>Budget (High to Low)</Text>
        </Pressable>
        <Pressable style={[styles.button, activeFilter === 'name-asc' && styles.activeButton]} onPress={() => sortTrips('name', 'asc')}>
          <Text style={styles.buttonText}>Name (A-Z)</Text>
        </Pressable>
        <Pressable style={[styles.button, activeFilter === 'name-desc' && styles.activeButton]} onPress={() => sortTrips('name', 'desc')}>
          <Text style={styles.buttonText}>Name (Z-A)</Text>
        </Pressable>
        <Pressable style={[styles.button, activeFilter === 'rating-desc' && styles.activeButton]} onPress={() => sortTrips('rating', 'desc')}>
          <Text style={styles.buttonText}>Rating</Text>
        </Pressable>
      </View>

      <Text style={styles.subTitle}>Range Budget</Text>
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>0 $</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={50000}
          step={1}
          value={budget}
          onValueChange={filterByBudget}
          minimumTrackTintColor="#5680EC"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#5680EC"
        />
        <Text style={styles.sliderLabel}>{budget} $</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: "#203B82", borderRadius: 20 },
  title: { fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center' },
  subTitle: { fontSize: 16, fontWeight: 'bold', color: 'white', marginTop: 10 },
  buttonRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  button: { backgroundColor: 'white', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, margin: 5, alignItems: 'center' },
  activeButton: {backgroundColor: '#5680EC' },
  buttonText: { fontSize: 14, color: '#000', fontWeight: 'bold' },
  sliderContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 15 },
  sliderLabel: { color: 'white', fontWeight: 'bold', width: 80, textAlign: 'center' },
  slider: { flex: 1 },
});

export default Filterplan;
