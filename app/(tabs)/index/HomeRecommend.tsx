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
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import Animated, { useSharedValue, useAnimatedStyle, interpolate, Extrapolation } from "react-native-reanimated";
import { Calendar } from "@tamagui/lucide-icons";

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

  // เปลี่ยนสีตามโหมดธีม
  const cardBackgroundColor = theme === "dark" ? "#000" : "#fff";
  const infoTextColor = theme === "dark" ? "#F2F2F2" : "#555";
  const textColor = theme === "dark" ? "#5680EC" : "#203B82";

  const animatedInfoCardStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: cardBackgroundColor,
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
      <Image
        source={{ uri: mainImageUri }}
        style={[styles.backgroundImage, { top: statusBarHeight }]}
      />

      {/* ปุ่มกดกลับ */}
      <View style={[styles.backgroundbackButtonContainer, { top: statusBarHeight }]}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={() => router.push("/(tabs)/")}
        >
          <MaterialIcons name="arrow-back" size={30} color={"#203B82"} />
        </TouchableOpacity>
      </View>



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
            <Text style={[styles.title, { color: textColor }]}>{name}</Text>
            <Text style={[styles.introduction, { color: infoTextColor }]}>
              {introduction || "No description available."}
            </Text>

          
            <View style={styles.infoRow}>
              <Calendar size={24} color={infoTextColor} />
              <Text style={[styles.infoText, { color: infoTextColor }]}>
                Number of Days: {numberOfDays} day
              </Text>
            </View>
         
          <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={24} style={{ color: infoTextColor }} />
              <Text style={[styles.infoText, { color: infoTextColor }]}>
                Region:{" "}
                {Array.isArray(regionNames)
                  ? regionNames.join(", ")
                  : regionNames || "N/A"}
              </Text>
            </View>
            </View>
          {/* Gallery */}
          <Animatable.View animation="fadeInUp" delay={500} duration={600}>
            <Text style={[styles.subTitle, { color: textColor }]}>Gallery</Text>
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
  backgroundbackButtonContainer: {
    position: "absolute",
    left: 15,
    zIndex: 10,
    backgroundColor: "rgba(255, 255, 255)",
    borderRadius: 30, 
    width: 40, 
    height: 40, 
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3, 
  },
  backButtonContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  
  backgroundImage: {
    position: "absolute",
    top: 44,
    left: 0,
    width: "100%",
    height: "40%",
    resizeMode: "cover",
    opacity: 1,
  },

  scrollContent: {
    paddingBottom: 40,
  },
  infoCard: {
    marginTop: 350,
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
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
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
