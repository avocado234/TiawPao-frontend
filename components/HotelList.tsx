import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { router, useRouter } from "expo-router";

interface Hotel {
    id: string;
    name: string;
    location: string;
    introduction : string;
    thumbnailimage: any ;
    detailimage: any;
}

interface HotelListProps {
    hotels: Hotel[];
}

const HotelCard: React.FC<{ hotel: Hotel }> = ({ hotel }) => {
    const router = useRouter();

    const PresstoHomedetail = (hotel: Hotel) => {
        console.log("Hotel object:", hotel);
        console.log("Sending to homedetail:", hotel);
        console.log(`Selected: ${hotel.name}`);
        const detailimage = typeof hotel.detailimage === 'string' ? hotel.detailimage : JSON.stringify(hotel.detailimage);
            router.push({
                pathname: 'homedetail',
                params: {
                    id: hotel.id,
                    name: hotel.name,
                    location: hotel.location,
                    introduction: hotel.introduction,
                    thumbnailimage: hotel.thumbnailimage,
                    detailimage: detailimage
                }
            })
    };
    return (
        <View className="flex-1 rounded-lg bg-white shadow-lg flex-row mb-4">
            {hotel.detailimage ? (
                <Image source={{ uri: hotel.thumbnailimage }} className="w-28 h-28 rounded-lg bg-fixed" />
            ) : (
                <View className="w-24 h-24 bg-gray-200 rounded-sm flex items-center justify-center">
                    <Text className="text-gray-500">No Image</Text>
                </View>
            )}
            <View className="ml-3 flex-1 p-1">
                <Text className="text-2xl font-bold text-gray-800 mt-2" numberOfLines={1} ellipsizeMode="clip">
                    {hotel.name}
                </Text>
                <Text className="mt-2 text-m text-gray-500" numberOfLines={1} ellipsizeMode="tail">
                    {hotel.location}
                </Text>
                <TouchableOpacity activeOpacity={0.5} onPress={() => PresstoHomedetail(hotel) }>
                    <Text className="text-blue-500 text-right text-[15px] font-bold right-3 ">More details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const HotelList: React.FC<HotelListProps> = ({ hotels }) => {
    return (
        <ScrollView className="p-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20, paddingVertical: 10 }}>
            {hotels.length > 0 ? (
                hotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)
            ) : (
                <Text className="text-gray-500 text-center mt-5">No hotels available</Text>
            )}
        </ScrollView>
    );
};

export default HotelList;
