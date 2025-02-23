import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { ThemedView } from './ThemedView';

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
    <ThemedView  style={styles.container}>
      
      <Text style={styles.subTitle}>Sort By</Text>
      <View style={styles.buttonRow}>
        
      <Pressable 
  style={[styles.button, activeFilter === "budget-asc" && styles.activeButton]} 
  onPress={() => sortTrips("budget", "asc")}
>
  <Text style={[styles.buttonText, activeFilter === "budget-asc" && styles.activeButtonText]}>
    Budget (Low to High)
  </Text>
</Pressable>
<Pressable 
  style={[styles.button, activeFilter === "budget-desc" && styles.activeButton]} 
  onPress={() => sortTrips("budget", "desc")}
>
  <Text style={[styles.buttonText, activeFilter === "budget-desc" && styles.activeButtonText]}>
    Budget (High to Low)
  </Text>
</Pressable>
<Pressable 
  style={[styles.button, activeFilter === "name-asc" && styles.activeButton]} 
  onPress={() => sortTrips("name", "asc")}
>
  <Text style={[styles.buttonText, activeFilter === "name-asc" && styles.activeButtonText]}>
    Name (A-Z)
  </Text>
</Pressable>
<Pressable 
  style={[styles.button, activeFilter === "name-desc" && styles.activeButton]} 
  onPress={() => sortTrips("name", "desc")}
>
  <Text style={[styles.buttonText, activeFilter === "name-desc" && styles.activeButtonText]}>
    Name (Z-A)
  </Text>
</Pressable>
<Pressable 
  style={[styles.button, activeFilter === "rating-desc" && styles.activeButton]} 
  onPress={() => sortTrips("rating", "desc")}
>
  <Text style={[styles.buttonText, activeFilter === "rating-desc" && styles.activeButtonText]}>
    Rating
  </Text>
</Pressable>

        
      </View>

      <Text className=' top-2' style={styles.subTitle}>Range Budget</Text>
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>0 $</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={9000}
          step={1}
          value={budget}
          onValueChange={filterByBudget}
          minimumTrackTintColor="#000"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#000"
        />
        <Text style={styles.sliderLabel}>{budget} $</Text>
        </View>
       
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#5680EC", paddingBottom : 35 },
  subTitle: { fontSize: 20, fontWeight: "bold", color: "white", marginBottom: 15 },
  buttonRow: { flexDirection: "row", flexWrap: "wrap" },
  button: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 5,
    alignItems: "center",
  },
  activeButton: { backgroundColor: "#203B82" },
  buttonText: { fontSize: 14, color: "#000", fontWeight: "bold" },
  activeButtonText: { color: "white" }, 
  sliderContainer: { flexDirection: "row", alignItems: "center",top:10 },
  sliderLabel: { fontSize: 16, color: "white", fontWeight: "bold", width: 70, textAlign: "center" },
  slider: { flex: 1 },
});


export default Filterplan;
