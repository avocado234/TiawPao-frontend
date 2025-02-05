import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface Trip {
    id: number;
    nametrip: string;
    location: string;
    price: string;
    date: string;
}

const initialTrips: Trip[] = [
    { id: 1, nametrip: "Chonburi trip", price: "500$", date: "24 Jan - 26 Jan", location: "Pattaya, Chonburi" },
    { id: 2, nametrip: "Chiang Mai Tour", price: "600$", date: "13 June - 19 June", location: "Chiang Mai" },
    { id: 3, nametrip: "Go Khon Kaen", price: "700$", date: "13 June - 19 June", location: "Khon Kaen" },
    { id: 4, nametrip: "Rayong First Time 111", price: "700$", date: "24 Jan - 25 Jan", location: "Rayong" },
];

const MyPlanBox = ({ isEditMode }: { isEditMode: boolean }) => {
    const [trips, setTrips] = useState<Trip[]>(initialTrips);

    const handleDelete = (id: number) => {
        setTrips(trips.filter(trip => trip.id !== id));
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContentContainer}>
            <View style={styles.container}>
                {trips.map((trip) => (
                    <View key={trip.id} style={styles.cardWrapper}>
                        <TouchableOpacity activeOpacity={0.8} style={styles.card}>
                            <View>
                                <Text style={styles.tripTitle}>{trip.nametrip}</Text>
                                <View style={styles.tripInfo}>
                                    <FontAwesome name="calendar" size={24} color="#fff" />
                                    <Text style={styles.dateText}> {trip.date}</Text>
                                </View>
                                <View style={styles.tripInfo}>
                                    <FontAwesome name="map-marker" size={24} color="#fff" />
                                    <Text style={styles.dateText}> {trip.location}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        {isEditMode && (
                            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(trip.id)}>
                                <FontAwesome className=" top-14" name="trash" size={24} color="white" />
                            </TouchableOpacity>
                        )}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 15, flex: 1 },
    scrollContentContainer: { paddingBottom: 50 },

    cardWrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },

    card: {
        maxHeight: 145,
        backgroundColor: "#203B82",
        padding: 20,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        flex: 1,
    },

    tripTitle: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#fff",
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

    deleteButton: {
        backgroundColor: "#FF4C4C",
        padding: 20,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        height :144.1,
        
    },
});

export default MyPlanBox;
