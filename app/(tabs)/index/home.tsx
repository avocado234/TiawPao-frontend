import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { ScrollView } from 'tamagui';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Bgelement from '@/components/Bgelement';
import Carousel from '@/components/Carouselhome';
import { useRouter } from "expo-router";
import Homebox from '@/components/Homebox';
import HotelList from '@/components/HotelList';
import { useUserStore } from '@/store/useUser';
import apiTAT from '@/utils/axiosTATInstance';

const { width, height } = Dimensions.get('window');

interface HotelItem {
    id: string;
    routeId: string;
    name: string;
    location: string;
    detailimage: string | null;
}

interface TravelItem {
    id: string;
    name: string;
    province: string;
    image: string | null;
    introduction: string;
}

interface RestaurantItem {
    id: string;
    name: string;
    province: string;
    image: string | null;
    introduction: string;
}

interface CarouselItem {
    id: string;
    routeId: string;
    name: string;
    introduction: string;
    numberOfDays: number;
    thumbnailUrl: string;
    provinceWithDay: any[];
    regionNames: string[];
    regions: any[];
    distance: number;
    placeImageUrls: string[];
    image: string;
}

const Homepage: React.FC = () => {
    const router = useRouter();
    const { user } = useUserStore();
    const [hotelData, setHotelData] = useState<HotelItem[]>([]);
    const [travelData, setTravelData] = useState<TravelItem[]>([]);
    const [restaurantData, setRestaurantData] = useState<RestaurantItem[]>([]);
    const [carouselData, setCarouselData] = useState<CarouselItem[]>([]);


    const fetchHotelData = async () => {
        try {
            const response = await apiTAT.get('/places?place_category_id=2&limit=15&place_sub_category_id=38');
            setHotelData(transformHotels(response.data));
        } catch (error: any) {
            handleApiError(error);
        }
    };

    const transformHotels = (data: any): HotelItem[] => {
        return data.data
            .map((item: any) => {
                const location = [
                    item.location?.province?.name,
                ]
                    .filter(Boolean)
                    .join('  ');

                return {
                    id: item.placeId,
                    name: item.name,
                    location,
                    detailimage: item.sha?.detailPicture?.[0] ?? item.thumbnailUrl?.[0] ?? null,
                };
            })
            .filter((item: HotelItem) => item.id && item.name && item.location && item.detailimage);
    };

    const fetchTravelData = async () => {
        try {
            const response = await apiTAT.get('/places?place_category_id=3&limit=30&place_sub_category_id=3');
            setTravelData(transformTravel(response.data));
        } catch (error: any) {
            handleApiError(error);
        }
    };

    const transformTravel = (data: any): TravelItem[] => {
        return data.data
            .map((item: any) => {
                const imageUrl = item.thumbnailUrl?.[0] ?? null;
                return {
                    id: item.placeId,
                    name: item.name,
                    introduction: item.introduction,
                    province: item.location?.province?.name,
                    image: imageUrl,
                };
            })
            .filter((item: TravelItem) => item.introduction && item.id && item.name && item.province && item.image);
    };

    const fetchRestaurantData = async () => {
        try {
            const response = await apiTAT.get('/places?keyword=restaurant&limit=4&place_sub_category_id=165');
            setRestaurantData(transformRestaurant(response.data));
        } catch (error: any) {
            handleApiError(error);
        }
    };

    const transformRestaurant = (data: any): RestaurantItem[] => {
        return data.data
            .map((item: any) => {
                const imageUrl = item.thumbnailUrl?.[0] ?? null;
                return {
                    id: item.placeId,
                    name: item.name,
                    province: item.location?.province?.name,
                    image: imageUrl,
                };
            })
            .filter((item: RestaurantItem) => item.id && item.name && item.province && item.image);
    };

    const fetchCarouselData = async () => {
        try {
            const response = await apiTAT.get('/routes?limit=3&page=1&sort=datetime_updated_desc');
            const transformedData = transformCarousel(response.data);
            setCarouselData(transformedData);
        } catch (error: any) {
            handleApiError(error);
        }
    };

    const transformCarousel = (data: any): CarouselItem[] => {
        return data.data
            .map((item: any) => {
                if (
                    item.routeId &&
                    item.name &&
                    item.introduction &&
                    item.numberOfDays &&
                    item.thumbnailUrl &&
                    item.provinceWithDay &&
                    item.regionNames &&
                    item.regions &&
                    item.distance !== undefined &&
                    item.placeImageUrls
                ) {
                    return {
                        id: item.routeId,
                        name: item.name,
                        introduction: item.introduction,
                        numberOfDays: item.numberOfDays,
                        thumbnailUrl: item.thumbnailUrl,
                        provinceWithDay: item.provinceWithDay,
                        regionNames: item.regionNames,
                        regions: item.regions,
                        distance: item.distance,
                        placeImageUrls: item.placeImageUrls,
                        createdAt: item.createdAt,
                        updatedAt: item.updatedAt,
                        image: item.thumbnailUrl,
                    };
                }
                return null;
            })
            .filter((item: CarouselItem) => item && item.id && item.name && item.introduction && item.numberOfDays && item.thumbnailUrl && item.provinceWithDay && item.regionNames && item.regions && item.distance !== undefined && item.placeImageUrls);
    };
    const handleApiError = (error: any) => {
        if (error.response) {
            console.error('Error response:', error.response);
        } else if (error.request) {
            console.error('Error request:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
    };

    useEffect(() => {
        fetchHotelData();
        fetchTravelData();
        fetchRestaurantData();
        fetchCarouselData();
    }, []);

    return (
        <View className="flex-1 w-full !h-full">
            <ThemedView className="flex-1 w-full !h-full mt-5">
                <Bgelement />
                <View style={styles.headerWrapper}>
                    <ThemedText className="top-5" style={styles.headerText}>
                        {user.username}
                    </ThemedText>
                    <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
                        <Image
                            className="absolute end-5 bottom-[18]"
                            source={{ uri: user.image }}
                            style={styles.avatar}
                        />
                    </TouchableOpacity>
                </View>
                <ScrollView
                    className="flex-1 w-full h-full"
                    contentContainerStyle={styles.scrollContentContainer}
                    showsVerticalScrollIndicator={false}
                >
                    <Carousel carouselData={carouselData} />
                    <View className="top-5">
                        <ThemedText className="text-2xl font-bold left-3 ">Journey together</ThemedText>
                        <Homebox places={travelData} />
                        <ThemedText className="text-2xl font-bold left-3 ">Food & Drink</ThemedText>
                        <Homebox places={restaurantData} />
                        <ThemedText className="text-2xl font-bold left-3 ">Hotels</ThemedText>
                        <View className="p-2">
                            <HotelList hotels={hotelData} />
                        </View>
                    </View>
                </ScrollView>
            </ThemedView>
        </View>
    );
};

export default Homepage;

const styles = StyleSheet.create({
    headerWrapper: {
        marginTop: height * 0.04,
        paddingHorizontal: width * 0.05,
        alignContent: "space-between",
    },
    headerText: {
        fontSize: width * 0.1,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: height * 0.05,
        top: width * 0.05,
    },
    avatar: {
        width: 24,
        height: 24,
        borderRadius: width * 0.07,
        position: "absolute",
        bottom: width * 0.06,
    },
    scrollContentContainer: {
        paddingBottom: width * 0.45,
    },
});
