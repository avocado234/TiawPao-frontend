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


const Homepage: React.FC = () => {
  const router = useRouter();
  const { user } = useUserStore();
  const [hotelData, setHotelData] = useState<HotelItem[]>([]);
  const [travelData, setTravelData] = useState<TravelItem[]>([]);


  const fetchHotelData = async () => {
    try {
      const response = await apiTAT.get('/places?place_category_id=2&limit=130&place_sub_category_id=38');
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
    return data.data
      .map((item: any) => {
        
        const location = [
          // item.location?.address,     
          // item.location?.sub_district?.name,
          // item.location?.district?.name,    
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
      console.error('Error fetching travel data:', error);
    }
  };
  
  const transformTravel = (data: any): TravelItem[] => {
    return data.data
      .map((item: any) => {
        const imageUrl = item.thumbnailUrl?.[0] ?? null; // ดึงค่ามาแบบชัดเจน
        
       
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
