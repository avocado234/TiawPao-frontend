import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ThemedView } from "./ThemedView"; 


const TripCard = ({ trip }) => {
  return (
    <ThemedView className="inset-x-16 inset-y-24" style={styles.card}>
      <View className="-inset-x-5 -inset-y-6" style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>Jame Macdonnell</Text>
        </View>
        <Text style={styles.price}>{trip.price}</Text>
        <Text style={styles.tripTitle}>{trip.location}</Text>
        <View style={styles.tripInfo}>
          <FontAwesome name="calendar" size={18} color="#fff" />
          <Text style={styles.dateText}> {trip.date}, 9 Location</Text>
        </View>
        <View style={styles.tripInfo}>
          <FontAwesome name="map-marker" size={18} color="#fff" />
          <Text style={styles.dateText}> Pattaya</Text>
        </View>
      </View>

      <View style={styles.reviewSection}>
        <Text style={styles.reviewText}>Review</Text>
        <View style={styles.rating}>
          <FontAwesome name="star" size={14} color="#FBC02D" />
          <Text style={styles.ratingText}> {trip.review}</Text>
        </View>
      </View>
      <Text style={styles.reviewDesc}>this plan is very good plan in Pattaya</Text>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 350,
    marginHorizontal: -25,
  },
  header: {
    backgroundColor: "#203B82",
    padding: 15,
    borderRadius: 28,
    width: 355,
    position: "relative",
    marginBottom: -15,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  userName: {
    color: "#fff",
    fontWeight: "bold",
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
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
  reviewSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
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

export default TripCard;
