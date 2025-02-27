import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions, SafeAreaView } from 'react-native';
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
  const { width } = useWindowDimensions();
  const [budget, setBudget] = useState<number>(9999);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const sortTrips = (type: 'rating' | 'budget' | 'name', order: 'asc' | 'desc') => {
    const newFilter = `${type}-${order}`;

    if (activeFilter === newFilter) {
      setActiveFilter(null);
      setFilteredTrips(trips); // ยกเลิก filter แล้วคืนค่าเดิม
      return;
    }

    setActiveFilter(newFilter);
    let sortedTrips = [...trips];

    if (type === 'rating') {
      sortedTrips.sort((a, b) => order === 'desc' ? parseFloat(b.rating) - parseFloat(a.rating) : parseFloat(a.rating) - parseFloat(b.rating));
    } else if (type === 'budget') {
      sortedTrips.sort((a, b) => order === 'desc' ? parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')) : parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
    } else if (type === 'name') {
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
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={[styles.container, { padding: width * 0.04 }]}>
        <View style={[styles.innerContainer, { padding: width * 0.03 }]}>
          <Text style={[styles.subTitle, { fontSize: width * 0.04 }]}>Sort By</Text>
          <View style={styles.buttonRow}>
            {[
              { label: 'Budget (Low to High)', type: 'budget', order: 'asc' },
              { label: 'Budget (High to Low)', type: 'budget', order: 'desc' },
              { label: '( A - Z )', type: 'name', order: 'asc' },
              { label: '( Z - A )', type: 'name', order: 'desc' },
              { label: 'Rating', type: 'rating', order: 'desc' }
            ].map(({ label, type, order }) => (
              <TouchableOpacity
                key={`${type}-${order}`}
                style={[
                  styles.button,
                  activeFilter === `${type}-${order}` && styles.activeButton
                ]}
                onPress={() => sortTrips(type as 'rating' | 'budget' | 'name', order as 'asc' | 'desc')}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.buttonText,
                  activeFilter === `${type}-${order}` && styles.activeButtonText
                ]}>
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.subTitle, { fontSize: width * 0.04 }]}>Range Budget</Text>
          <View style={styles.sliderContainer}>
            <Text style={[styles.sliderLabel, { fontSize: width * 0.035, width: width * 0.12 }]}>
              0 ฿
            </Text>
            <Slider
              style={[styles.slider, { width: width * 0.6 }]} 
              minimumValue={0}
              maximumValue={9000}
              step={1}
              value={budget}
              onValueChange={setBudget}
              onSlidingComplete={filterByBudget}
              minimumTrackTintColor="#fff"
              maximumTrackTintColor="#ddd"
              thumbTintColor="white"
            />
            <Text style={[styles.sliderLabel, { fontSize: width * 0.035, width: width * 0.12 }]}>
              {budget} ฿
            </Text>
          </View>

        </View>
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#5680EC",
  },
  innerContainer: {
    backgroundColor: "rgba(32, 59, 130, 0.3)",
    borderRadius: 10,
  },
  subTitle: {
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    margin: 5,
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "#203B82",
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
  activeButtonText: {
    color: "white",
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sliderLabel: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  slider: {
    alignSelf: "center",
  },
});

export default Filterplan;
