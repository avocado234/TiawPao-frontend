import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ThemedView } from "./ThemedView";
import { Card } from "tamagui";


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
  { id: 1, user: "Jame Macdonell", nametrip: "Chonburi trip", price: "500$", date: "24 Jan - 26 Jan", rating: "4.8", location: "Chonburi", description: "This plan is very good plan in Pattaya" },
  { id: 2, user: "Jame Macdonell", nametrip: "Bangkok trip", price: "600$", date: "1 Feb - 3 Feb", rating: "4.5", location: "Bangkok", description: "This plan is very good plan in Pattaya" },
  { id: 3, user: "Jame Macdonell", nametrip: "Phuket trip", price: "700$", date: "10 Mar - 12 Mar", rating: "4.7", location: "Phuket", description: "This plan is very good plan in Pattaya" },
  { id: 4, user: "Jame Macdonell", nametrip: " trip", price: "700$", date: "10 Mar - 12 Mar", rating: "4.7", location: "Phuket", description: "This plan is very good plan in Pattaya" },
  { id: 5, user: "Jame Macdonell", nametrip: "Phuket trip", price: "700$", date: "10 Mar - 12 Mar", rating: "4.7", location: "Phuket", description: "This plan is very good plan in Pattaya" },
  { id: 6, user: "Jame Macdonell", nametrip: "last trip", price: "500", date: "10 Mar - 12 Mar", rating: "4.7", location: "Phuket", description: "This plan is very good plan in Pattaya" },

];

import { useSafeAreaInsets } from "react-native-safe-area-context";

const PublicPlanBox = () => {
    return (
      <View style={styles.container}>
        {tripData.map((trip) => (
          <TouchableOpacity key={trip.id} activeOpacity={0.8} style={styles.cardWrapper}>
            <TripCard trip={trip} />
          </TouchableOpacity>
        ))}
      </View>
    );
  };


const TripCard: React.FC<TripCardProps> = ({ trip }) => {
  return (
    <ThemedView style={styles.card}  >
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }} style={styles.avatar} />
          <Text style={styles.userName}>{trip.user}</Text>
        </View>
        <Text style={styles.price}>{trip.price}</Text>
        <Text style={styles.tripTitle}>{trip.nametrip}</Text>
        <View style={styles.tripInfo}><FontAwesome name="calendar" size={18} color="#fff" /><Text style={styles.dateText}> {trip.date}</Text></View>
        <View style={styles.tripInfo}><FontAwesome name="map-marker" size={18} color="#fff" /><Text style={styles.dateText}> {trip.location}</Text></View>
      </View>
      <View style={styles.body}>
        <View style={styles.reviewSection}>
          <Text style={styles.reviewText}>Review</Text>
          <View style={styles.rating}><FontAwesome name="star" size={14} color="#FBC02D" /><Text style={styles.ratingText}> {trip.rating}</Text></View>
        </View>
        <Text style={styles.reviewDesc}>{trip.description}</Text>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
    container: {
    padding: 15,
    paddingTop: 30,
    },
    cardWrapper: {
    marginBottom: 15,
    },
    card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: "100%",
    marginBottom: 5,
    paddingBottom: 5,
   
  },
  header: {
    backgroundColor: "#203B82",
    padding: 16,
    borderRadius: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  userName: {
    color: "#fff",
    fontWeight: "bold",
  },
  price: {
    position: "absolute",   
    right: 15,
    top: 15,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  tripTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 8,
  },
  tripInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  dateText: {
    color: "#fff",
    marginLeft: 4,
  },
  body: {
    padding: 16,
  },
  reviewSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reviewText: {
    fontWeight: "bold",
    color: "#16367F",
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
  },
});

export default PublicPlanBox;