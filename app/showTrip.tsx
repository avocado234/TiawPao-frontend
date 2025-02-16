import React from 'react';
import { View, Image, Pressable, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { XStack, YStack, Button } from 'tamagui';
import { ThemedText } from '@/components/ThemedText';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
import { ArrowLeft, Map, Settings, Plus, Share2 } from '@tamagui/lucide-icons';
import Bgelement from '@/components/Bgelement';

export default function ShowTrip() {
  const params = useLocalSearchParams();
  const startDate = new Date(params.startDate as string);
  const endDate = new Date(params.endDate as string);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDaysBetweenDates = () => {
    const days = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  return (
    <ThemedSafeAreaView>
      <Bgelement />
      
      {/* Header */}
      <XStack style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <ArrowLeft size={24} />
        </Pressable>
      </XStack>

      {/* Trip Header */}
      <View style={styles.tripHeader}>
        <Image
          source={{ uri: 'https://example.com/placeholder.jpg' }} 
          style={styles.headerImage}
        />
        <View style={styles.tripInfo}>
          <ThemedText style={styles.tripName}>{params.tripName}</ThemedText>
          <ThemedText style={styles.tripDate}>
            {formatDate(startDate)} - {formatDate(endDate)}
          </ThemedText>
          <ThemedText style={styles.location}>{params.province}</ThemedText>
        </View>
        <XStack space="$2" style={styles.headerIcons}>
          <Map size={24} />
          <Share2 size={24} />
          <Settings size={24} />
        </XStack>
      </View>

      {/* Action Buttons */}
      <XStack space="$4" style={styles.actionButtons}>
        <Button variant="outlined" onPress={() => router.back()}>
          Cancel
        </Button>
        <Button 
          style={{ backgroundColor: '#3b82f6' }}
          onPress={() => {/* Handle save */}}
        >
          Save
        </Button>
      </XStack>

      {/* Daily Itinerary */}
      <YStack space="$4" style={styles.itineraryContainer}>
        {getDaysBetweenDates().map((date, index) => (
          <View key={date.toISOString()} style={styles.dayContainer}>
            <ThemedText style={styles.dayHeader}>
              Day {index + 1}, {formatDate(date)}
            </ThemedText>
            <View style={styles.addLocationContainer}>
              <Plus size={24} color="#6b7280" />
              <ThemedText style={styles.addLocationText}>
                Build your day by adding some location
              </ThemedText>
              <Button style={styles.addButton}>
                + Add
              </Button>
            </View>
          </View>
        ))}
      </YStack>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center'
  },
  tripHeader: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 12,
  },
  tripInfo: {
    marginBottom: 12,
  },
  tripName: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  tripDate: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: '#6b7280',
  },
  headerIcons: {
    position: 'absolute',
    top: 24,
    right: 24,
  },
  actionButtons: {
    padding: 16,
    justifyContent: 'space-between',
  },
  itineraryContainer: {
    padding: 16,
  },
  dayContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  dayHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  addLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
  },
  addLocationText: {
    flex: 1,
    marginLeft: 12,
    color: '#6b7280',
  },
  addButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
});