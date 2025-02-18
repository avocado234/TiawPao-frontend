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
    { id: 4, nametrip: "Rayong First Time", price: "700$", date: "24 Jan - 25 Jan", location: "Rayong" },
    { id: 5, nametrip: "Rayong First Time", price: "700$", date: "24 Jan - 25 Jan", location: "Rayong" },
    { id: 6, nametrip: "Rayong First Time", price: "700$", date: "24 Jan - 25 Jan", location: "Rayong" },
    { id: 7, nametrip: "Rayong First Time", price: "700$", date: "24 Jan - 25 Jan", location: "Rayong" },
    { id: 8, nametrip: "Rayong First Time 12", price: "700$", date: "24 Jan - 25 Jan", location: "Rayong" },
];

const MyPlanBox = ({ isEditMode }: { isEditMode: boolean }) => {
    const [trips, setTrips] = useState<Trip[]>(initialTrips);

    const handleDelete = (id: number) => {
        setTrips(trips.filter(trip => trip.id !== id));
    };

    return (
        
            <View style={styles.container}>
                {trips.map((trip) => (
                    <View key={trip.id}
                        style={[styles.cardWrapper, isEditMode ? styles.cardWrapperEdit : {}]}>
                        <TouchableOpacity activeOpacity={0.8}
                            style={[styles.card, isEditMode ? styles.cardEdit : {}]}>
                            <View className=" left-3">
                                <Text style={styles.tripTitle} numberOfLines={1} ellipsizeMode="tail">{trip.nametrip}</Text>
                                <View style={styles.tripInfo}>
                                    <FontAwesome name="calendar" size={24} color="#fff" />
                                    <Text className=" color-white " > {trip.date}</Text>
                                </View>
                                <View style={styles.tripInfo}>
                                    <FontAwesome name="map-marker" size={24} color="#fff" />
                                    <Text className=" color-white" > {trip.location}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        {isEditMode && (
                            <TouchableOpacity  style={styles.deleteButton} onPress={() => handleDelete(trip.id)}>
                                <FontAwesome  name="trash" size={24} color="white" />
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
    scrollContentContainer: { paddingBottom: 55 },

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
        shadowOpacity: 0,
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

    tripTitle: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#fff",
    },

    tripInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
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
