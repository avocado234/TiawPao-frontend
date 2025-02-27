import React from 'react';
import {
  SafeAreaView,
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

const places = [
    { id: "1", name: "Koh Larn", location: "Chonburi", rating: 4.7, image: require("@/assets/images/Kohlarn.png") },
    { id: "2", name: "Old Town", location: "Phuket", rating: 4.9, image: require("@/assets/images/Oldtown.png") },
    { id: "3", name: "Doi Inthanon", location: "Chiangmai", rating: 4.2, image: require("@/assets/images/Doiinthanon.png") },
    { id: "4", name: "Wat Arun", location: "Bangkok", rating: 4.9, image: require("@/assets/images/Watarun.png") },
];

const hotels = [
    { id: "1", name: "Banyan Tree Bangkok", description: "#2 Best Value of 3,000 places to stay in Thailand", rating: 4.9, image: require("@/assets/images/Oldtown.png") },
    { id: "2", name: "Hotel Clover Patong Phuket", description: "#4 Best Value of 3,000 places to stay in Thailand", rating: 4.9, image: require("@/assets/images/Oldtown.png") },
    { id: "3", name: "Centara Reserve Samui", description: "#11 Best Value of 409 Thailand Luxury Hotels", rating: 4.9, image: require("@/assets/images/Oldtown.png") },
];

const Homepage: React.FC = () => {
  const router = useRouter();
  const { user } = useUserStore();

  return (
    <View className="flex-1 w-full !h-full">
      <ThemedView className="flex-1 w-full !h-full">
        <Bgelement />
        <View style={styles.headerWrapper}>
          <ThemedText className="top-5" style={styles.headerText}>{user.username}</ThemedText>
          <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
            <Image className="absolute end-5 bottom-[18]" source={{ uri: user.image }} style={styles.avatar} />
          </TouchableOpacity>
        </View>

        <View className=''>
        <ScrollView
          className="flex-1 w-full"
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={false}
        >
          <Carousel />
          <ThemedText className="text-2xl font-bold left-3">Journey together</ThemedText>
          <Homebox places={places} />
          <ThemedText className="text-2xl font-bold left-3">Food & Drink</ThemedText>
          <Homebox places={places} />
          <ThemedText className="text-2xl  font-bold left-3">Hotels</ThemedText>
          <View className=' p-2'>
          <HotelList hotels={hotels} />
          </View>
        </ScrollView>
        </View>
      </ThemedView>
    </View>
  );
};

export default Homepage;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  headerWrapper: {
    marginTop: height * 0.04, 
    paddingHorizontal: width * 0.05,
    alignContent : "space-between",
    
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
    bottom : width * 0.06
  },
  scrollContentContainer: {
   paddingBottom : width *0.45
  },
});
