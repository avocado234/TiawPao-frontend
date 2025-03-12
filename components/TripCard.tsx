import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ThemedView } from "./ThemedView";

interface PlanData {
  plan_id: string;
  author_email: string;
  author_name: string;
  author_img: string;
  trip_name: string;
  region_label: string;
  province_label: string;
  province_id: string;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  description: string;
  trip_location: any[];
  visibility: boolean;
}

const TripCard: React.FC<PlanData> = (props) => {
  // Helper function to format the date
  // console.log(props)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // Example format: "Mar 6, 2025"
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <View style={styles.container}>
      <ThemedView style={styles.card}>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image source={{ uri: props.author_img }} style={styles.avatar} />
            <Text style={styles.userName}>{props.author_name ? props.author_name : "Unknow"}</Text>
          </View>
          {/* <Text style={styles.price}>ราคา</Text> */}
          <Text numberOfLines={1} ellipsizeMode="clip" style={styles.tripTitle}>
            {props.trip_name}
          </Text>
          <View style={styles.tripInfo}>
            <FontAwesome name="calendar" size={18} color="#fff" />
            <Text style={styles.dateText}> {formatDate(props.start_date)} - {formatDate(props.end_date)}</Text>
          </View>
          <View style={styles.tripInfo}>
            <FontAwesome name="map-marker" size={18} color="#fff" />
            <Text style={styles.dateText}> {props.province_label}</Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.reviewSection}>
            <Text style={styles.reviewText}>Description</Text>
            {/* <View style={styles.rating}>
              <FontAwesome name="star" size={14} color="#FBC02D" />
              <Text style={styles.ratingText}> 4.8</Text>
            </View> */}
          </View>
          <Text style={styles.reviewDesc}>{props.description ? props.description : "No Description" }</Text>
        </View>
      </ThemedView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
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
