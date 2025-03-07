import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface TripData {
  author_email: string;
  author_img: string;
  end_date: string;
  end_time: string;
  plan_id: string;
  province_id: string;
  province_label: string;
  region_label: string;
  start_date: string;
  start_time: string;
  trip_location?: string[]; // optional เพื่อรองรับ undefined
  trip_name: string;
  visibility: boolean;
}

interface Trip {
  plan_data: TripData;
}

interface MyPlanBoxProps {
  trips: Trip[];
  isEditMode: boolean;
  onDelete: (id: string) => void;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
  return date.toLocaleDateString('en-US', options);
};

const MyPlanBox: React.FC<MyPlanBoxProps> = ({ trips, isEditMode, onDelete }) => {
  const router = useRouter();

  if (trips.length > 0) {
    console.log(trips[0].plan_data.trip_name);
  }

  return (
    <View style={styles.container}>
      {trips.map((trip, index) => (
        <View 
          key={trip.plan_data.plan_id || index} 
          style={[styles.cardWrapper, isEditMode && styles.cardWrapperEdit]}
        >
          <TouchableOpacity
            onPress={() => {
                router.replace({
                  pathname: "/(tabs)/add/tripmanually",
                  params: {
                    planID: trip.plan_data.plan_id,
                  }
                });
              }}
            activeOpacity={0.8}
            style={[styles.card, isEditMode && styles.cardEdit]}
          >
            <View style={styles.contentWrapper}>
              <Text style={styles.tripTitle} numberOfLines={1} ellipsizeMode="clip">
                {trip.plan_data.trip_name}
              </Text>
              <View style={styles.tripInfo}>
                <FontAwesome name="calendar" size={24} color="#fff" />
                <Text style={styles.tripInfoText}>
                  {formatDate(trip.plan_data.start_date)} - {formatDate(trip.plan_data.end_date)} , {trip.plan_data.trip_location?.length} Location
                </Text>
              </View>
              <View style={styles.tripInfo}>
                <FontAwesome name="map-marker" size={24} color="#fff" />
                <Text style={styles.tripInfoText}>
                  {trip.plan_data.province_label}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          {isEditMode && (
            <TouchableOpacity 
              style={styles.deleteButton} 
              onPress={() => onDelete(trip.plan_data.plan_id)}
            >
              <FontAwesome name="trash" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
};

export default MyPlanBox;

const styles = StyleSheet.create({
  container: { padding: 15, flex: 1 },
  cardWrapper: {
    flexDirection: "row",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardWrapperEdit: {
    shadowOpacity: 0.5,
  },
  card: {
    backgroundColor: "#203B82",
    padding: 15,
    borderRadius: 20,
    flex: 1,
  },
  cardEdit: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  contentWrapper: {
    marginLeft: 15,
  },
  tripTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 1,
  },
  tripInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  tripInfoText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "#FF4C4C",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
});
