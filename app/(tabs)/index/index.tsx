import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import { ScrollView, Text } from 'tamagui';
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

const Homepage: React.FC = () => {
  const router = useRouter();
  const { user } = useUserStore();
  const [hotelData, setHotelData] = useState<HotelItem[]>([]);
  const [travelData, setTravelData] = useState<TravelItem[]>([]);

  const fetchHotelData = async () => {
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
            detailimage: JSON.stringify(detailImages), // Convert to JSON string
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

  useEffect(() => {
    fetchHotelData();
    fetchTravelData();
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
          className="flex-1 w-full"
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={false}
        >
          <Carousel />
          <ThemedText className="text-2xl font-bold left-3">Journey together</ThemedText>
          <Homebox places={travelData} />
          <ThemedText className="text-2xl font-bold left-3">Food & Drink</ThemedText>
          <ThemedText className="text-2xl font-bold left-3">Hotels</ThemedText>
          <View className="p-2">
            <HotelList hotels={hotelData} />
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
    width: width * 0.14,
    height: width * 0.14,
    borderRadius: width * 0.07,
    position: "absolute",
    bottom: width * 0.06,
  },
  scrollContentContainer: {
    paddingBottom: width * 0.45,
  },
});
