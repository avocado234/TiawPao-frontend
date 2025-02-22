import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableNativeFeedback,
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

const { width, height } = Dimensions.get('screen');

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
  return (
    <View className='flex-1'>
      <ThemedView className='flex-1'>
        <Bgelement />
        <View  style={styles.headerWrapper}>
          <ThemedText  style={styles.headerText}>Jame</ThemedText>
          <TouchableNativeFeedback>
            <TouchableOpacity onPress={() => router.push('./profile')}>
              <Image className=" " source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }} style={styles.avatar} />
            </TouchableOpacity>
          </TouchableNativeFeedback>
        </View>
        <ScrollView
          className='flex-1'
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View >
            <Carousel />
          </View>
          <View >
            <ThemedText className="text-2xl font-bold">Journey together</ThemedText>
          </View>
          <View >
            <Homebox places={places} />
          </View>
          <View >
            <ThemedText className="text-2xl font-bold">Food & Drink</ThemedText>
          </View>
          <View >
            <Homebox places={places} />
          </View>
          <View >
            <ThemedText className="text-2xl font-bold">Hotels</ThemedText>
          </View>
          <View >
            <HotelList hotels={hotels} />
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
    
  },
  headerText: {
    fontSize: width * 0.09, 
    color: 'white',
    fontWeight: 'bold',
    marginBottom: height * 0.03,
    top : width * 0.02
  },
  avatar: {
    width: width * 0.14,
    height: width * 0.14,
    borderRadius: width * 0.07,
    position :"absolute",
    end : width *0.01,
    bottom : width * 0.05,

    
  },
  scrollContentContainer: {
    padding: width * 0.03,
    paddingBottom: height * 0.05,
  },
});
