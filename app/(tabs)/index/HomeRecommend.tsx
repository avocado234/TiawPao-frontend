import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  Platform,
  StatusBar,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import ThemeCustomBackButton from "@/components/ThemeCustomBackButton";
import * as Animatable from "react-native-animatable";
import Animated, { useSharedValue, useAnimatedStyle, interpolate, Extrapolation } from "react-native-reanimated";

export default function HomeRecommend() {
  const router = useRouter();
  const param = useLocalSearchParams();
  const theme = useColorScheme();
  const {
    name,
    introduction,
    numberOfDays,
    regionNames,
    placeImageUrls,
    thumbnailUrl,
  } = param;

  const mainImageUri =
    typeof thumbnailUrl === "string"
      ? thumbnailUrl
      : "https://via.placeholder.com/500";
  const imageUrlsArray =
    typeof placeImageUrls === "string"
      ? placeImageUrls.split(",")
      : [];

  const scrollY = useSharedValue(0);

  const animatedInfoCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, 200],
            [0, -150],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  const statusBarHeight = Platform.select({
    ios: 44,
    android: StatusBar.currentHeight || 24,
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* ภาพพื้นหลัง */}
      <Image source={{ uri: mainImageUri }} style={[styles.backgroundImage, {top : statusBarHeight}]} />

      {/* ปุ่มกดกลับ */}
      <TouchableOpacity style={[styles.backButtonContainer, { top: statusBarHeight }]} onPress={() => router.push('/(tabs)/')}>
      <MaterialIcons name="arrow-back" size={30} color={"#203B82"} />
      </TouchableOpacity>

      {/* ScrollView สำหรับเนื้อหา */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={(event) => {
          scrollY.value = event.nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={16}
      >
        {/* การ์ดแสดงข้อมูล */}
        <Animated.View style={[styles.infoCard, animatedInfoCardStyle]}>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.introduction}>
              {introduction || "No description available."}
            </Text>

            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={24} color="#203B82" />
              <Text style={styles.infoText}>
                Region:{" "}
                {Array.isArray(regionNames)
                  ? regionNames.join(", ")
                  : regionNames || "N/A"}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="calendar-outline" size={24} color="#203B82" />
              <Text style={styles.infoText}>
                Number of Days: {numberOfDays} day
              </Text>
            </View>
          </View>

          {/* Gallery */}
          <Animatable.View animation="fadeInUp" delay={500} duration={600}>
            <Text style={styles.subTitle}>Gallery</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.imageList}
            >
              {imageUrlsArray.map((imageUri, index) => (
                <Animatable.View key={index} animation="zoomIn" delay={index * 200}>
                  <Image source={{ uri: imageUri }} style={styles.subImage} />
                </Animatable.View>
              ))}
            </ScrollView>
          </Animatable.View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  backgroundImage: {
    position: "absolute", // ตั้งให้อยู่พื้นหลัง
    top: 44, // or any other appropriate value
    left: 0,
    width: "100%",
    height:"40%",
    resizeMode: "cover",
    opacity: 1, 
  },
  backButtonContainer: {
    position: "absolute",
    left: 15,
    zIndex: 10, 
  },
  scrollContent: {
    paddingBottom: 40,
  },
  infoCard: {
    marginTop: 350,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 50,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    zIndex: 5, 
  },
  infoContainer: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#203B82",
    marginBottom: 10,
  },
  introduction: {
    fontSize: 16,
    color: "#444",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    color: "#555",
    marginLeft: 5,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 15,
    marginBottom: 10,
    color: "#203B82",
    marginTop: 10,
  },
  imageList: {
    paddingHorizontal: 10,
  },
  subImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
  },
});
