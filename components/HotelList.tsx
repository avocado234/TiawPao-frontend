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

interface HotelListProps {
    hotels: Hotel[];
}

const HotelCard: React.FC<{ hotel: Hotel }> = ({ hotel }) => {
    return (
        <View className="flex-1 rounded-2xl bg-white shadow-lg flex-row mb-4 ">
            <Image source={hotel.image} className="w-28 h-full rounded-xl bg-fixed" />
            <View className="ml-3 flex-1 p-1">
                <Text className="text-2xl font-bold text-gray-800" numberOfLines={1} ellipsizeMode="clip">{hotel.name}</Text>
                <Text className="text-s text-gray-500" numberOfLines={2} ellipsizeMode="clip">{hotel.description}</Text>
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

const HotelList: React.FC<HotelListProps> = ({ hotels }) => {
    return (
        <ScrollView className="p-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20, paddingVertical: 10 }}>
            {hotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
            ))}
        </ScrollView>
    );
};

export default HotelList;
