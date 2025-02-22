import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

interface Place {
    id: string;
    name: string;
    location: string;
    rating: number;
    image: any;
}

interface HomeboxProps {
    places: Place[];
}

const PlaceCard: React.FC<{ place: Place }> = ({ place }) => {
    return (
        <View style={styles.card}>
            <Image source={place.image} style={styles.image} />
            <View className="p-2">
                <Text className="text-[16px] font-bold">{place.name}</Text>
                <Text style={styles.location}>{place.location}</Text>
                <View style={styles.ratingContainer}>
                    <MaterialIcons name="star" size={16} color="gold" />
                    <Text style={styles.ratingText}>{place.rating}</Text>
                </View>
            </View>
        </View>
    );
};


const Homebox: React.FC = ({places}:any) => {
    const PresstoHomedetail = (place : Place) => {
        console.log("place.id")
        console.log(place.id);
        router.push({
          pathname: "/(tabs)/index/homedetail",
          params: {
            id: place.id,
            name: place.name,
            location: place.location,
            image: place.image,
        },
        });
        
      };
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
            {places.map((place:any) => (
                <TouchableOpacity key={place.id} activeOpacity={0.8} onPress={() => PresstoHomedetail(place)}>
                    <PlaceCard place={place} />
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default Homebox;

const styles = StyleSheet.create({
    scrollContainer: {
        paddingVertical: 10,
    },
    card: {
        backgroundColor: "#F8F9FA",
        borderRadius: 16,
        shadowRadius: 6,
        overflow: "hidden",
        elevation: 4,
        width: 160,
        marginRight: 12,
    },
    image: {
        width: "100%",
        height: 100,
        borderRadius: 10,
    },
    location: {
        fontSize: 14,
        color: "#6B7280",
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 2,
    },
    ratingText: {
        fontSize: 14,
        marginLeft: 4,
    },
});
