import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface Place {
    id: string;
    name: string;
    location: string;
    detailimage: any;
    thumbnailimage: any;
    introduction : string;
}

interface HomeboxProps {
    places: Place[];
}

const PlaceCard: React.FC<{ place: Place }> = ({ place }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: place.thumbnailimage }} style={styles.image} resizeMode="cover" />
            <View style={styles.content}>
                <Text className="text-[18px] font-bold" numberOfLines={1} ellipsizeMode="tail">{place.name}</Text>
                <Text style={styles.location}>{place.location}</Text>
            </View>
        </View>
    );
};

const Homebox: React.FC<HomeboxProps> = ({ places }) => {
    const router = useRouter();

    const PresstoHomedetail = (place: Place) => {
        console.log("Sending to homedetail:", place);
        router.push({
            pathname: "/homedetail",
            params: {
                id: place.id,
                name: place.name,
                location: place.location,
                thumbnailimage: place.thumbnailimage || '',
                detailimage: place.detailimage || '',
                introduction: place.introduction,
            },
        });
    };

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
            {places.map((place) => (
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
        borderRadius: 15,
        shadowRadius: 5,
        elevation: 2,
        width: 160,
        marginRight: 12,
        left: 10,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
    },
    image: {
        width: "100%",
        height: 80,
        borderRadius :5
    },
    content: {
        padding: 10,
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
        fontSize: 16,
        marginLeft: 4,
    },
});
