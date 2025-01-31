import React from "react";
import { View, Text, Image, StyleSheet,ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
// import TripCard from "./TripCard";
import { YStack } from "tamagui"; // นำเข้า TripCard
interface Trip {
  id: number;
  user:string;
  nametrip:string;
  location: string;
  price: string;
  date: string;
  rating: string;
  description:string;
}

interface TripCardProps {
  trip: Trip;
}
const tripData = [
  { id: 1, user:"Jame Macdonell",nametrip: "Chonburi trip", price: "500$", date: "24 Jan - 26 Jan", rating: "4.8" ,location:"Chonburi",description:"this plan is very good plan in Pattaya"},
  { id: 2, user:"Jame Macdonell",nametrip: "Bangkok trip", price: "600$", date: "1 Feb - 3 Feb", rating: "4.5" ,location:"Bangkok",description:"this plan is very good plan in Pattaya"},
  { id: 3, user:"Jame Macdonell",nametrip: "Phuket trip", price: "700$", date: "10 Mar - 12 Mar", rating: "4.7",location:"Phuket" ,description:"this plan is very good plan in Pattaya"},
];

const PublicPlanBox = () => {
  return (
    <ScrollView
    // showsHorizontalScrollIndicator={false} // ซ่อนแถบเลื่อนแนวนอน
    contentContainerStyle={styles.scrollViewContent} // เพิ่มสไตล์ให้ container
    // className="bg-red-900 w-full h-screen"
  >
       {tripData.map((trip) => (
      
            <TripCard  key={trip.id} trip={trip}/>

        ))} 
    </ScrollView>
  );
};

export default PublicPlanBox;
const TripCard: React.FC<TripCardProps> = ({ trip }) => {
return (
    <ThemedView style={styles.card}>
    <View className=" " style={styles.header}>
        <View style={styles.userInfo}>
        <Image
            source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }}
            style={styles.avatar}
        />
        <Text style={styles.userName}>{trip.user}</Text>
        </View>
        <Text style={styles.price}>{trip.price}</Text>
    
    <Text style={styles.tripTitle}>{trip.nametrip}</Text>
    <View style={styles.tripInfo}>
        <FontAwesome name="calendar" size={18} color="#fff" />
        <Text style={styles.dateText}> {trip.date}</Text>
    </View>
    <View style={styles.tripInfo}>
        <FontAwesome name="map-marker" size={18} color="#fff" />
        <Text style={styles.dateText}> {trip.location}</Text>
    </View>
    </View>
    <View className="py-5 px-10">
      <View style={styles.reviewSection}>
          <Text style={styles.reviewText}>Review</Text>
          <View style={styles.rating}>
          <FontAwesome name="star" size={14} color="#FBC02D" />
          <Text style={styles.ratingText}> {trip.rating}</Text>
          </View>
      </View>
      <Text style={styles.reviewDesc}>
          {trip.description}
      </Text>
    </View>

    </ThemedView>
);
};



const styles = StyleSheet.create({
  scrollViewContent: {
    // backgroundColor:"red",
    // display:"flex",
    width:"100%", // ระยะห่างด้านบนและล่าง

    // height:"100%",
    // paddingHorizontal:20,
    // justifyContent:"center",
    // flexDirection: "column",
    alignItems: "center",
    // alignItems: "center", // จัดให้เนื้อหาอยู่ตรงกลางแนวนอน
    // marginTop:50,
    // paddingHorizontal:20,
    // paddingVertical: 50,
    // paddingTop:100,
    // marginHorizontal: 80,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 25,
    overflow: "hidden",
    // padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width:"94%",
    elevation: 3,
    marginVertical: 10, // ระยะห่างระหว่างการ์ดในแนวตั้ง
  },
  header: {
    backgroundColor: "#203B82",
    padding: 15,
    borderRadius: 20,
    width:"100%",
    // position: "relative",
    // marginBottom: -18,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 12,
    marginRight: 10,
    right: -20,
  },
  userName: {
    color: "#fff",
    fontWeight: "bold",
    top: 5,
    right: -20,
  },
  price: {
    position: "absolute",
    right: 20,
    top: 30,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
  },
  tripTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 0,
    right: -20,
  },
  tripInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
    right: -20,
  },
  dateText: {
    color: "#fff",
    marginLeft: 4,
  },
  reviewSection: {

    flexDirection: "row",
    justifyContent: "space-between",
    // marginTop: 10,
    
  },
  reviewText: {
    fontWeight: "bold",
    color: "#16367F",
    // right: -20,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    color: "#333",
    fontWeight: "bold",
    marginLeft: 4,
    
  },
  reviewDesc: {
    marginTop: 4,
    color: "#666",
    // right: -20,
  },
});


