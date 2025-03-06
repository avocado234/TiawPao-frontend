import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  
} from "react-native";
import { useRouter ,useLocalSearchParams} from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function HomeRecommend() {
  const router = useRouter();
  const param = useLocalSearchParams();
      const { id, name, location, image ,introduction,numberOfDays,provinceWithDay,regionNames,regions,distance,placeImageUrls } = param;
  

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔹 Header พร้อม Title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rayong First Time?</Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        <View>
        <Image
          source={{ uri: "https://api.tourismthailand.org/upload/live/article_desktop_cover_image/1124-32787.png" }} 
          style={styles.mainImage}
        />
        </View>

        {/* 🔹 ปุ่ม Save */}
        <View style={styles.saveContainer}>
          <TouchableOpacity style={styles.saveButton}>
            <Ionicons name="heart-outline" size={20} color="red" />
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>

        {/* 🔹 เนื้อหา */}
        <View style={styles.content}>
          <Text style={styles.text}>
            Need a quick and easy pick-me-up road <Text style={styles.link}>Trip?</Text> Check out this fantastic 2D1N itinerary.
            Head to <Text style={styles.link}>Rayong</Text> and <Text style={styles.link}>Chanthaburi</Text> for a weekend getaway.
          </Text>

          {/* 🔹 Day 1 */}
          <Text style={styles.dayTitle}>Day 1 - <Text style={styles.bold}>Rayong</Text></Text>

          <Text style={styles.text}>
            <Text style={styles.link}>Flora Exhibition Hall</Text>, Miracle of Natural, <Text style={styles.link}>Rayong</Text> (Mon - Sat, 09.30 - 16.30)
          </Text>

          <Image
            source={{ uri: "https://api.tourismthailand.org/upload/live/content_article/1124-32791.png" }}
            style={styles.subImage}
          />

          <Text style={styles.text}>
            King Taksin the Great Knowledge Park (Daily, closed Mondays: 09.30-16.00)
          </Text>

          <Text style={styles.link}>Yom Chinda Road</Text>
          <Text style={styles.text}>
            Stroll along Yom Chinda Road, where charming old buildings and a vintage atmosphere await.
          </Text>

          <Image
            source={{ uri: "https://api.tourismthailand.org/upload/live/content_article/1124-32796.png" }}
            style={styles.subImage}
          />

          {/* 🔹 Day 2 */}
          <Text style={styles.dayTitle}>Day 2 - <Text style={styles.bold}>Chanthaburi</Text></Text>

          <Text style={styles.link}>Chanthaboon Waterfront Community</Text>
          <Text style={styles.text}>
            Stroll through Chanthaboon Waterfront Community, where you can experience charming old houses and a laid-back riverside lifestyle.
          </Text>

          <Image
            source={{ uri: "https://api.tourismthailand.org/upload/live/content_article/1124-32793.png" }}
            style={styles.subImage}
          />

          <Text style={styles.link}>Nong Bua Walking Street</Text>
          <Text style={styles.text}>
            Discover unique sweets in the Nong Bua Walking Street. Taste special treats made from unique recipes.
          </Text>

          <Image
            source={{ uri: "https://api.tourismthailand.org/upload/live/content_article/1124-32792.jpeg" }}
            style={styles.subImage}
          />

          {/* 🔹 Responsible Tourism Tips */}
          <Text style={styles.dayTitle}>Responsible Tourism Tips:</Text>
          <Text style={styles.text}>
            Eco-friendly road <Text style={styles.link}>Trips?</Text> Try switching to electric vehicles, an innovation that's kind to the environment.
          </Text>
        </View>
      </ScrollView>

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  
  header: {
    top: 0,
    left: 0,
    right: 0,
    height: 110, 
    backgroundColor: "#203B82",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  backButton: {
    marginRight: 10,
  },

  headerTitle: {
    fontSize: 24, // 🔹 ขยายขนาดตัวอักษร
    fontWeight: "bold",
    color: "yellow",
  },

  scrollContent: {
    paddingBottom: 80, 
  },

  mainImage: {
    width: "100%",
    height: 150,
   
  },

  subImage: {
    width: "100%",
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
  },

  content: {
    padding: 20,
  },

  text: {
    fontSize: 16,
    color: "#444",
    marginBottom: 10,
  },

  link: {
    color: "#3A7DFF",
    fontWeight: "bold",
  },

  dayTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 15,
  },

  bold: { 
    fontWeight: "bold",
  },

  saveContainer: { 
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: 20,
    marginTop: -20,
  },

  saveButton: { 
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },

  saveText: { 
    marginLeft: 5,
    color: "red",
    fontWeight: "bold",
  },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingVertical: 10,
  },

  navItem: {
    alignItems: "center",
  },

  navText: {
    fontSize: 12,
    color: "#000",
    marginTop: 2,
  },
});
