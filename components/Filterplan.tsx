import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet,Dimensions } from 'react-native';
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
const { width, height } = Dimensions.get("window");

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
      <View style={styles.innerContainer}>
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

        <Text className='top-2' style={styles.subTitle}>Range Budget</Text>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>0 $</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={2000}
            step={1}
            value={budget}
            onValueChange={setBudget}
            onSlidingComplete={filterByBudget}
            minimumTrackTintColor="#fff"
            maximumTrackTintColor="#ddd"
            thumbTintColor="#fff"
          />
          <Text style={styles.sliderLabel}>{budget} $</Text>
        </View>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: width * 0.02, 
    backgroundColor: "#5680EC", 
    paddingBottom: height * 0.5, 
  },
  innerContainer: {  
    backgroundColor: "rgba(32, 59, 130, 0.3)",  
    padding: width * 0.02, 
    borderRadius: 10, 
    height: height * 0.25, 
  },
  subTitle: { 
    fontSize: width * 0.04, 
    fontWeight: "bold", 
    color: "white", 
    marginBottom: height * 0.02 
  },
  buttonRow: { 
    flexDirection: "row", 
    flexWrap: "wrap" 
  },
  button: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.005,
    margin: width * 0.02,
    alignItems: "center",
  },
  activeButton: { 
    backgroundColor: "#203B82" 
  },
  buttonText: { 
    fontSize: width * 0.035, 
    color: "black", 
    fontWeight: "bold" 
  },
  activeButtonText: { 
    color: "white" 
  },
  sliderContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginTop: height * 0.01 
  },
  sliderLabel: { 
    fontSize: width * 0.03, 
    color: "white", 
    fontWeight: "bold", 
    width: width * 0.15, 
    textAlign: "center" 
  },
  slider: { 
    flex: 1 
  },
});

export default Filterplan;