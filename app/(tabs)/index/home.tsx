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
import LoadingComponent from '@/components/LoadingComponent';
const { width, height } = Dimensions.get('window');

interface HotelItem {
    id: string;
    routeId: string;
    name: string;
    location: string;
    detailimage: any;
    thumbnailimage: any;
    introduction: string;

}

interface TravelItem {
    id: string;
    name: string;
    location: string;
    detailimage: any;
    thumbnailimage: any;
    introduction: string;
}

interface RestaurantItem {
    id: string;
    name: string;
    location: string;
    detailimage: any;
    thumbnailimage: any;
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
    const [loading ,setLoading] = useState<boolean>(true);

    const fetchHotelData = async () => {
        setLoading(true);
        try {
            const response = await apiTAT.get('https://tatdataapi.io/api/v2/places?place_category_id=2&limit=130&sort_by=detailPicture&place_sub_category_id=38&has_introduction=true&has_name=true&has_thumbnail=true');
            setHotelData(transformHotels(response.data));
        } catch (error: any) {
            if (error.response) {
                console.error('Error response:', error.response);
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        }finally{
            setLoading(false);
        }
    };

    const transformHotels = (data: any): HotelItem[] => {
        return data.data.map((item: any) => {
            const detailImages = Array.isArray(item.sha?.detailPicture)
                ? item.sha.detailPicture.map((imgUrl: string) => ({ uri: imgUrl }))
                : [];
            return {
                id: item.placeId,
                name: item.name,
                location: item.location?.province?.name ?? '',
                detailimage: detailImages,
                thumbnailimage: item.thumbnailUrl?.[0] ?? null,
                introduction: item.introduction || '',
            };
        })
            .filter((item: HotelItem) =>
                item.introduction?.trim() !== "" &&
                item.introduction !== null &&
                item.id &&
                item.name &&
                item.location &&
                item.thumbnailimage &&
                item.detailimage.length > 0
            );
    };

    const fetchTravelData = async () => {
        setLoading(true);
        try {
            const response = await apiTAT.get('https://tatdataapi.io/api/v2/places?place_category_id=3&sha_flag=true&limit=30&sort_by=detailPicture&place_sub_category_id=3&status=true&has_introduction=true&has_name=true&has_thumbnail=true');
            setTravelData(transformTravel(response.data));
        } catch (error: any) {
            if (error.response) {
                console.error('Error response:', error.response);
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        }finally{
            setLoading(false);
        }
    };

    const transformTravel = (data: any): TravelItem[] => {
        return data.data.map((item: any) => {
            const detailImages = Array.isArray(item.sha?.detailPicture)
                ? item.sha.detailPicture.map((imgUrl: string) => ({ uri: imgUrl }))
                : [];
            return {
                id: item.placeId,
                name: item.name,
                location: item.location?.province?.name ?? '',
                detailimage: JSON.stringify(detailImages),
                thumbnailimage: item.thumbnailUrl?.[0] ?? null,
                introduction: item.introduction || '',
            };
        })
            .filter((item: TravelItem) =>
                item.introduction?.trim() !== "" &&
                item.introduction !== null &&
                item.id &&
                item.name &&
                item.location &&
                item.thumbnailimage &&
                JSON.parse(item.detailimage).length > 0
            );
    };

    const fetchRestaurantData = async () => {
        setLoading(true);
        try {
            const response = await apiTAT.get('https://tatdataapi.io/api/v2/places?keyword=restaurant&sha_flag=true&limit=4&place_sub_category_id=165&status=true&has_introduction=true&has_name=true&has_thumbnail=true');
            setRestaurantData(transformRestaurant(response.data));
        } catch (error: any) {
            handleApiError(error);
        }finally{
            setLoading(false);
        }
    };

    const transformRestaurant = (data: any): RestaurantItem[] => {
        return data.data
            .map((item: any) => {
                const imageUrl = item.thumbnailUrl?.[0] ?? null;
                const detailImages = Array.isArray(item.sha?.detailPicture)
                    ? item.sha.detailPicture.map((imgUrl: string) => ({ uri: imgUrl }))
                    : [];
                return {
                    id: item.placeId,
                    name: item.name,
                    location: item.location?.province?.name,
                    thumbnailimage: imageUrl,
                    detailimage: JSON.stringify(detailImages),
                    introduction: item.introduction,
                };
            })
            .filter((item: RestaurantItem) => item.id && item.name && item.location && item.thumbnailimage);
    };

    const fetchCarouselData = async () => {
        setLoading(true);
        try {
            const response = await apiTAT.get('/routes?limit=3&page=1&sort=datetime_updated_desc');
            const transformedData = transformCarousel(response.data);
            setCarouselData(transformedData);
        } catch (error: any) {
            handleApiError(error);
        }finally{
            setLoading(false);
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

    if (loading) {
        return (
            <LoadingComponent />
        );
    }
    
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
                        <ThemedText className="text-2xl font-bold left-3 top-2 ">Hotels</ThemedText>
                        <View className="p-1">
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
        fontSize: 32,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: height * 0.05,
        top: width * 0.05,
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: width * 0.07,
        position: "absolute",
        bottom: width * 0.06,
    },
    scrollContentContainer: {
        paddingBottom: width * 0.25,
    },
});
