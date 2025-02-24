import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// 🔹 กำหนดประเภทข้อมูลของ contentData
interface Place {
  name: string;
  image: any;
  detail: string;
}

interface TripData {
  title: string;
  subtitle: string; // เพิ่ม subtitle เหมือน Homedetail.tsx
  mainImage: any;
  description: string;
  places: Place[];
}

// 🔹 ข้อมูลของแต่ละทริป
const contentData: Record<string, TripData> = {
    "1": {
      title: "Rayong-Chanthaburi Road Trip",
      subtitle: "Thailand",
      mainImage: require("@/assets/images/rayong/rayong1.png"), // ✅ ต้องมีภาพใน assets
      description: "Embark on a scenic road trip through Rayong and Chanthaburi, two beautiful provinces offering stunning beaches, lush forests, and rich cultural heritage.",
  
      places: [
        {
          name: "Laem Charoen Beach",
          image: require("@/assets/images/rayong/rayong2.png"),
          detail: "A peaceful beach near Rayong City, perfect for relaxing and enjoying fresh seafood from the local restaurants."
        },
        {
          name: "Wat Pa Pradu",
          image: require("@/assets/images/rayong/rayong3.png"),
          detail: "A historic temple famous for its large reclining Buddha image, unique because it is turned on its left side instead of the usual right."
        },
        {
          name: "Chao Lao Beach",
          image: require("@/assets/images/rayong/rayong4.png"),
          detail: "One of the most beautiful beaches in Chanthaburi, offering soft white sand and clear blue waters, ideal for swimming and snorkeling."
        },
        {
          name: "Oasis Sea World",
          image: require("@/assets/images/rayong/rayong5.png"),
          detail: "A marine attraction where visitors can watch dolphin shows and even swim with these intelligent creatures."
        },
        {
          name: "Cathedral of the Immaculate Conception",
          image: require("@/assets/images/rayong/rayong6.png"),
          detail: "The largest Catholic church in Thailand, featuring stunning Gothic architecture and located in Chanthaburi’s Old Town."
        }
      ]
    },
  
  "2": {
    title: "Korat 2 Days 1 Night",
    subtitle: "Nakhon Ratchasima",
    mainImage: require("@/assets/images/korat/korat1.png"),
    description: "Nakhon Ratchasima, commonly known as Korat, serves as the gateway to Thailand's northeastern region.",
    places: [
      {
        name: "Petrified Wood Museum",
        image: require("@/assets/images/korat/korat2.png"),
        detail: "Located in Suranaree Subdistrict, this museum showcases fossilized woods dating back 800,000 to 320 million years."
      },
      {
        name: "Thao Suranaree Monument",
        image: require("@/assets/images/korat/korat3.png"),
        detail: "Erected in 1934, this monument honors the bravery of Thao Suranaree (Lady Mo), who defended Korat from invaders in 1826."
      },
      {
        name: "Phimai Historical Park",
        image: require("@/assets/images/korat/korat5.png"),
        detail: "Home to one of the largest Khmer temples in Thailand, offering a glimpse into the region's ancient past."
      },
    ]
  },
  "3": {
    title: "Trang-Satun Low Carbon 3 Days 2 Nights",
    subtitle: "Southern Thailand",
    mainImage: require("@/assets/images/trang/trang1.png"), // ✅ ต้องมีภาพใน assets
    description: "Embark on a low-carbon adventure through Trang and Satun, two stunning provinces with breathtaking natural attractions, rich cultural heritage, and delicious southern Thai cuisine.",
    
    places: [
      {
        name: "Pak Meng Beach",
        image: require("@/assets/images/trang/trang2.png"),
        detail: "A scenic beach with a long stretch of golden sand, facing the Andaman Sea. It's a perfect spot to relax and enjoy the sunset."
      },
      {
        name: "Emerald Cave (Morakot Cave)",
        image: require("@/assets/images/trang/trang3.png"),
        detail: "A hidden lagoon accessible only by swimming through a dark cave tunnel. The water inside is emerald green, making it a magical experience."
      },
      {
        name: "Koh Lao Liang",
        image: require("@/assets/images/trang/trang4.png"),
        detail: "A paradise island famous for its towering limestone cliffs, crystal-clear waters, and excellent snorkeling and rock climbing spots."
      },
      {
        name: "Thale Ban National Park",
        image: require("@/assets/images/trang/trang5.png"),
        detail: "A biodiversity hotspot in Satun, home to lush rainforests, diverse wildlife, and beautiful freshwater lakes surrounded by limestone mountains."
      },
      {
        name: "Satun UNESCO Global Geopark",
        image: require("@/assets/images/trang/trang6.png"),
        detail: "Recognized by UNESCO, this geopark showcases stunning karst landscapes, ancient fossils, and caves that date back millions of years."
      }
    ]
  }

};

export default function HomeRecommend() {
  const router = useRouter();
  const params = useLocalSearchParams();

  console.log("✅ Received params:", params);  // Debug ตรวจสอบค่าที่ได้รับจาก router

  const tripId = params.id ? String(params.id) : "1";
  console.log("🚀 Resolved tripId:", tripId);  // Debug ตรวจสอบค่าหลังจากแปลงเป็น string

  const content = contentData[tripId] || contentData["1"];

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ SafeAreaView ครอบ Header เพื่อให้พื้นหลังสีฟ้าเต็มถึงขอบจอ */}
      <SafeAreaView style={styles.safeHeader}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={28} color="black" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>{content.title}</Text>
            <Text style={styles.headerSubtitle}>{content.subtitle}</Text>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* 🔹 รูปภาพหลัก */}
        <Image source={content.mainImage} style={styles.mainImage} resizeMode="cover" />

        {/* 🔹 คำอธิบายหลัก */}
        <View style={styles.content}>
          <Text style={styles.text}>{content.description}</Text>

          {/* 🔹 แสดงสถานที่แต่ละแห่ง (ถ้ามี) */}
          {content.places.length > 0 && content.places.map((place, index) => (
            <View key={index}>
              <Image source={place.image} style={styles.image} />
              <Text style={styles.subtitle}>{place.name}</Text>
              <Text style={styles.text}>{place.detail}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },

  // ✅ SafeAreaView ที่ทำให้ Header สีฟ้าเต็มถึงขอบจอ
  safeHeader: {
    backgroundColor: "#5680EC",
    
  },
 
  header: {
    backgroundColor: "#5680EC",
    paddingVertical: 20,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 30, // ✅ ป้องกันทับ Notch บน iPhone
  },
  backButton: { marginRight: 10 },
  headerTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fbdf61",
  },
  headerSubtitle: {
    fontSize: 20,
    color: "white",
  },

  /* 🔹 เนื้อหาและรูป */
  scrollContent: { paddingBottom: 80 },
  mainImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  content: { padding: 20 },
  text: {
    fontSize: 16,
    color: "#444",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginTop: 10,
    marginBottom: 5,
  },
  image: {
    width: "100%",
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
  },
});
