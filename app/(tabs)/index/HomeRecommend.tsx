import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ThemeCustomBackButton from "@/components/ThemeCustomBackButton";
import Bgelement from "@/components/Bgelement";
import * as Animatable from "react-native-animatable";
import Animated, { useSharedValue, useAnimatedStyle, interpolate, Extrapolation } from "react-native-reanimated";

export default function HomeRecommend() {
  const router = useRouter();
  const param = useLocalSearchParams();
  const {
    name,
    introduction,
    numberOfDays,
    regionNames,
    distance,
    placeImageUrls,
    thumbnailUrl,
  } = param;

  const mainImageUri = typeof thumbnailUrl === "string" ? thumbnailUrl : "https://via.placeholder.com/500";
  const imageUrlsArray = typeof placeImageUrls === "string" ? placeImageUrls.split(",") : [];

  const scrollY = useSharedValue(0);

  const animatedInfoCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, 200],  // ช่วงที่ scroll (0 คือเริ่มต้น, 200 คือระยะที่ scroll ขึ้นไป)
            [0, -150], // ค่า translateY ของ infoCard (0 = เริ่มต้น, -150 = ขึ้นไปทับ mainImage)
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <Bgelement />
      <View style={[styles.header]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ThemeCustomBackButton />
        </TouchableOpacity>
      </View>
      <Animatable.Image source={{ uri: mainImageUri }} style={styles.mainImage} animation="fadeIn" duration={800} />
      
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={(event) => {
          scrollY.value = event.nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={16}
      >
        <Animated.View style={[styles.infoCard, animatedInfoCardStyle]}>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.introduction}>{introduction || "No description available."}</Text>

            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={24} color="#203B82" />
              <Text style={styles.infoText}>Region : {Array.isArray(regionNames) ? regionNames.join(", ") : regionNames || "N/A"}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="calendar-outline" size={24} color="#203B82" />
              <Text style={styles.infoText}>Number of Days : {numberOfDays} day</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="walk-outline" size={24} color="#203B82" />
              <Text style={styles.infoText}>Distance : {distance || "No distance"} Km.</Text>
            </View>
          </View>

          <Animatable.View animation="fadeInUp" delay={500} duration={600}>
            <Text style={styles.subTitle}>Gallery</Text>
            <Animated.ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.imageList}>
              {imageUrlsArray.map((imageUri, index) => (
                <Animatable.View key={index} animation="zoomIn" delay={index * 200}>
                  <Image source={{ uri: imageUri }} style={styles.subImage} />
                </Animatable.View>
              ))}
            </Animated.ScrollView>
          </Animatable.View>
        </Animated.View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    marginBottom: 10,
    paddingHorizontal: 16,
    marginTop: 50,
  },
  backButton: { marginRight: 5 },
  mainImage: {
    marginTop: 100,
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignSelf: "center",
    zIndex: 0,
    position: "absolute", 
  },
  scrollContent: { paddingBottom: 60, zIndex: 1 },
  infoCard: {
    marginTop: 280, // ทำให้เริ่มจากตำแหน่งสูงกว่า mainImage เล็กน้อย
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    zIndex: 1,
  },
  infoContainer: {
    padding: 15,
  },
  title: { fontSize: 22, fontWeight: "bold", color: "#203B82", marginBottom: 10 },
  introduction: { fontSize: 16, color: "#444", marginBottom: 10 },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  infoText: { fontSize: 16, color: "#555", marginLeft: 5 },
  subTitle: { fontSize: 20, fontWeight: "bold", marginLeft: 15, marginBottom: 10, color: "#203B82", marginTop: 10 },
  imageList: { paddingHorizontal: 10 },
  subImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
  },
});