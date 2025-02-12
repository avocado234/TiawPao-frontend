import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface Place {
    id: string;
    name: string;
    location: string;
    rating: number;
    image: any;
}

const places: Place[] = [
    {
        id: "1",
        name: "Koh Larn",
        location: "Chonburi",
        rating: 4.7,
        image: require("@/assets/images/Kohlarn.png"),
    },
    {
        id: "2",
        name: "Old Town",
        location: "Phuket",
        rating: 4.9,
        image: require("@/assets/images/Oldtown.png"),
    },
    {
        id: "3",
        name: "Doi Inthanon",
        location: "Chiangmai",
        rating: 4.2,
        image: require("@/assets/images/Doiinthanon.png"),
    },
    {
        id: "4",
        name: "Wat Arun",
        location: "Bangkok",
        rating: 4.9,
        image: require("@/assets/images/Watarun.png"),
    },
    {
        id: "5",
        name: "Wat Arun",
        location: "Bangkok",
        rating: 4.9,
        image: require("@/assets/images/Watarun.png"),
    },
    {
        id: "6",
        name: "Wat Arun",
        location: "Bangkok",
        rating: 4.9,
        image: require("@/assets/images/Watarun.png"),
    },
];

interface PlaceCardProps {
    place: Place;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place }) => {
    return (
        <View className="bg-gray-100 rounded-xl overflow-hidden mr-3 shadow-md w-40 ">
            <Image source={place.image} className="w-full h-24" />
            <View className="p-3">
                <Text className="text-lg font-bold">{place.name}</Text>
                <Text className="text-sm text-gray-500">{place.location}</Text>
                <View className="flex-row items-center mt-1">
                    <MaterialIcons name="star" size={16} color="gold" />
                    <Text className="text-sm ml-1">{place.rating}</Text>
                </View>
            </View>
        </View>
    );
};

const Homebox: React.FC = () => {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-3 flex-row">
            {places.map((place) => (
                <TouchableOpacity key={place.id} activeOpacity={0.8} onPress={() => console.log(place.name)} className=" flex-row">
                    <PlaceCard place={place} />
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default Homebox;
