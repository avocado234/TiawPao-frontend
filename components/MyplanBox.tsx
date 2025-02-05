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
    { id: 1, nametrip: "Chonburi trip", price: "500$", date: "24 Jan - 26 Jan", location: "Chonburi" },
    { id: 2, nametrip: "Bangkok trip", price: "600$", date: "1 Feb - 3 Feb", location: "Bangkok" },
    { id: 3, nametrip: "Phuket trip", price: "700$", date: "10 Mar - 12 Mar", location: "Phuket" },
    { id: 4, nametrip: "Phuket trip", price: "700$", date: "10 Mar - 12 Mar", location: "Phuket" },
    { id: 5, nametrip: "Phuket trip", price: "700$", date: "10 Mar - 12 Mar", location: "Phuket" },
    { id: 6, nametrip: "Phuket trip", price: "700$", date: "10 Mar - 12 Mar", location: "Phuket" },
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
                    <TouchableOpacity key={trip.id} activeOpacity={0.8} style={styles.card}>
                        <View>
                            <Text style={styles.tripTitle}>{trip.nametrip}</Text>
                            <View style={styles.tripInfo}><FontAwesome name="calendar" size={18} color="#fff" /><Text style={styles.dateText}> {trip.date}</Text></View>
                            <View style={styles.tripInfo}><FontAwesome name="map-marker" size={18} color="#fff" /><Text style={styles.dateText}> {trip.location}</Text></View>
                            <Text style={styles.price}>{trip.price}</Text>
                        </View>
                        {isEditMode && (
                            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(trip.id)}>
                                <FontAwesome  name="trash" size={28} color="white" />
                            </TouchableOpacity>
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 15, flex: 1 },
    scrollContentContainer: {
        paddingBottom: 50,
    },
    card: {
        backgroundColor: "#203B82",
        padding: 15,
        borderRadius: 24,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    tripTitle: {
        fontSize: 36,
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
        borderRadius: 15,
        right : 15
    },
    price: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 20,
    }
});

export default MyPlanBox;
