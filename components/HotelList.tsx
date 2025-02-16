import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface Hotel {
    id: string;
    name: string;
    description: string;
    rating: number;
    image: any;
}

const hotels: Hotel[] = [
    {
        id: "1",
        name: "Banyan Tree Bangkok",
        description: "#2 Best Value of 3,000 places to stay in Thailand",
        rating: 4.9,
        image: require("@/assets/images/Oldtown.png"),
    },
    {
        id: "2",
        name: "Hotel Clover Patong Phuket",
        description: "#4 Best Value of 3,000 places to stay in Thailand",
        rating: 4.9,
        image: require("@/assets/images/Oldtown.png"),
    },
    {
        id: "3",
        name: "Centara Reserve Samui",
        description: "#11 Best Value of 409 Thailand Luxury Hotels",
        rating: 4.9,
        image: require("@/assets/images/Oldtown.png"),
    },
    {
        id: "4",
        name: "Centara Reserve Samui",
        description: "#11 Best Value of 409 Thailand Luxury Hotels",
        rating: 4.9,
        image: require("@/assets/images/Oldtown.png"),
    },
    {
        id: "5",
        name: "Centara Reserve Samui",
        description: "#11 Best Value of 409 Thailand Luxury Hotels",
        rating: 4.9,
        image: require("@/assets/images/Oldtown.png"),
    },
    {
        id: "6",
        name: "Centara Reserve Samui",
        description: "#11 Best Value of 409 Thailand Luxury Hotels",
        rating: 4.9,
        image: require("@/assets/images/Oldtown.png"),
    },
];

const HotelCard: React.FC<{ hotel: Hotel }> = ({ hotel }) => {
    return (
        <View className="flex-1 rounded-2xl bg-white shadow-lg flex-row mb-4">
            <Image source={hotel.image} className="w-28 h-full rounded-xl " />
            <View className="ml-3 flex-1 p-1">
                <Text className="text-2xl font-bold text-gray-800">{hotel.name}</Text>
                <Text className="text-s text-gray-500" numberOfLines={2} ellipsizeMode="tail">{hotel.description}</Text>
                <View className="flex-row items-center mt-2">
                    <MaterialIcons name="star" size={16} color="gold" />
                    <Text className="text-sm ml-2 text-gray-700">{hotel.rating}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.5} onPress={() => console.log(hotel.name)}>
                    <Text className="text-blue-500 text-right text-m font-semibold right-2 bottom-2">more details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const HotelList: React.FC = () => {
    return (
        <ScrollView className=" p-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20,paddingVertical: 10}}>
            {hotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
            ))}
        </ScrollView>
    );
};

export default HotelList;