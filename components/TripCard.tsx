import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ThemedView } from "./ThemedView";

interface TripCardProps {
  trip: {
    id: number;
    user: string;
    nametrip: string;
    location: string;
    price: string;
    date: string;
    rating: string;
    description: string;
  };
}

const TripCard: React.FC<TripCardProps> = ({ trip }) => {
  return (
    <View style={styles.container}>
    <ThemedView style={styles.card}  >
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }} style={styles.avatar} />
          <Text style={styles.userName}>{trip.user}</Text>
        </View>
        <Text style={styles.price}>{trip.price}</Text>
        <Text numberOfLines={1} ellipsizeMode="clip" style={styles.tripTitle}>{trip.nametrip}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
    flex:1,
    width : "90%"
    },
    cardWrapper: {
    marginBottom: 15,
    },
    card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    marginBottom: 15,
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
    fontSize: 32,
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
    marginLeft: 6,
    fontSize: 16,
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
    fontSize: 16,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    color: "#333",
    fontWeight: "bold",
    marginLeft: 4,
    fontSize: 16,
  },
  reviewDesc: {
    marginTop: 4,
    color: "#666",
  },
});

export default TripCard;
