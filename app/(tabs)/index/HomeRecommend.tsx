import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";


interface Place {
  name: string;
  image: string;
  detail: string;
}

interface TripData {
  _id: string;
  title: string;
  mainImage: string;
  description: string;
  places: Place[];
}

export default function HomeRecommend() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const [tripData, setTripData] = useState<TripData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const tripId = params.id ? String(params.id) : null;

  useEffect(() => {
    if (!tripId) {
      setError("❌ Invalid trip ID");
      setLoading(false);
      return;
    }

    const fetchTripData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/trips/${tripId}`);
        setTripData(response.data);
      } catch (err) {
        setError("Failed to fetch trip data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTripData();
  }, [tripId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <ActivityIndicator size="large" color="#5680EC" style={{ marginTop: 50 }} />
      </SafeAreaView>
    );
  }

  if (error || !tripData) {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#5680EC" translucent={true} />

      <SafeAreaView style={styles.safeContainer}>
        {/* 🔹 Header Background */}
        <View style={[styles.headerBackground, { height: insets.top + 60 }]} />

        {/* 🔹 Header */}
        <View style={[styles.header, { paddingTop: insets.top }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle} numberOfLines={2} ellipsizeMode="tail">
              {tripData.title}
            </Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Image source={{ uri: tripData.mainImage }} style={styles.mainImage} resizeMode="cover" />
          <TouchableOpacity style={styles.saveButton}>
            <Ionicons name="heart-outline" size={24} color="red" />
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>

          <View style={styles.content}>
            <Text style={styles.description}>{tripData.description}</Text>

            {tripData.places.map((place) => (
              <View key={place.name} style={styles.placeContainer}>
                <Image source={{ uri: place.image }} style={styles.placeImage} />
                <Text style={styles.placeTitle}>{place.name}</Text>
                <Text style={styles.placeDetail}>{place.detail}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  headerBackground: {
    width: "100%",
    position: "absolute",
    backgroundColor: "#5680EC",
    
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    height: 60,
    textAlign: "left",
  },
  backButton: {
    position: "absolute",
    left: 20,
    zIndex: 10,
  },
  titleContainer: {
    flex: 1,
    position: "absolute",
    left: 60,
    right: 60,
    top: 12, // ✅ ทำให้ Title อยู่ตรงกลาง
    alignItems: "center",
    
  },
  headerTitle: {
    color: '#fbdf61',
    fontSize: 30,
    marginLeft: -20,
    fontFamily: "System",
    textAlign: "left",
    backgroundColor: "transparent",
    
  },
  scrollContent: { paddingBottom: 80, marginTop: 60 },
  mainImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
    top: 0,
    marginTop: -60, 
    zIndex: -1,
    
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: 20,
    top: 140,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 20,
  },
  saveText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  content: { padding: 20 },
  description: {
    fontSize: 16,
    color: "#444",
    marginBottom: 10,
  },
  placeContainer: {
    marginBottom: 20,
  },
  placeImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  placeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginTop: 10,
  },
  placeDetail: {
    fontSize: 14,
    color: "#444",
  },
  errorText: {
    textAlign: "center",
    marginTop: 50,
    color: "red",
    fontSize: 16,
  },
});
