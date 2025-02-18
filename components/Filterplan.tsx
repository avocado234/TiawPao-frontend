import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

interface FilterplanProps {}

const Filterplan: React.FC<FilterplanProps> = () => {
  const [budget, setBudget] = useState<number>(5000);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filters</Text>
      <Text style={styles.subTitle}>Sort By</Text>
      <View style={styles.buttonRow}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Rating</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Budget</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Name</Text>
        </Pressable>
      </View>
      <Text style={styles.subTitle}>Range Budget</Text>
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>0$</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={9999}
          step={1}
          value={budget}
          onValueChange={setBudget}
          minimumTrackTintColor="#000"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#000"
        />
        <Text style={styles.sliderLabel}>{budget}$</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor : "#203B82",
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  subTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  buttonText: {
    fontSize: 14,
    color: '#000',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  sliderLabel: {
    color: 'white',
    fontWeight: 'bold',
    width: 50,
    textAlign: 'center',
  },
  slider: {
    flex: 1,
  },
});

export default Filterplan;
