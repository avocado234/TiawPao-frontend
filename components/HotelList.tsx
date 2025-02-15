import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
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
        <View className=" flex-1 rounded-2xl bg-white shadow-lg flex-row  mb-4">
            <Image source={hotel.image} className="w-26 h-32 rounded-2xl" />
            <View className="ml-3 flex-1 p-1">
                <Text className="text-xl font-bold text-gray-800">{hotel.name}</Text>
                <Text className="text-s text-gray-500">{hotel.description}</Text>
                <View className="flex-row items-center mt-1">
                    <MaterialIcons name="star" size={16} color="gold" />
                    <Text className="text-sm ml-1 text-gray-700">{hotel.rating}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.5} onPress={() => console.log(hotel.name)}>
                    <Text className="text-blue-500 text-right text-m font-semibold mt-1 right-5">more details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const HotelList: React.FC = () => {
    return (
        <FlatList
            data={hotels}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <HotelCard hotel={item} />}
            showsVerticalScrollIndicator={false}
            className="mt-4"
        />
    );
};

export default HotelList;
