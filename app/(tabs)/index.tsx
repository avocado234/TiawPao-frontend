import React, { useState , useContext, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'tamagui';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Bgelement from '@/components/Bgelement';
import { router } from 'expo-router';
import Carousel from '@/components/Carouselhome';



import { auth } from "@/config/firebaseconfig";
import { Button } from 'react-native'
import { XGroup, XStack, YStack } from "tamagui";
import { signOut } from "firebase/auth";
import { useRouter } from "expo-router";
import Homebox from '@/components/Homebox';
import HotelList from '@/components/HotelList';
import { useUserStore } from '@/store/useUser';




const homepage: React.FC = () => {
  const user = useUserStore((state) => state.user);

  const router = useRouter();
  
  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.themedView}>
        <Bgelement />
        <View style={styles.headerWrapper}>
          <ThemedText className=' top-5' style={styles.headerText}>Jame</ThemedText>
          <TouchableNativeFeedback>
            <TouchableOpacity onPress={() => router.push('./profile')}>
              <Image className="absolute end-5 bottom-[18]" source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }} style={styles.avatar} />
            </TouchableOpacity>
          </TouchableNativeFeedback>
        </View>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View className='top-9'>
            <Carousel />
          </View>
          <View className="top-12">
            <ThemedText className="text-2xl font-bold ">Journey together</ThemedText>
          </View>
          <View className=' top-14' >
            <Homebox />
          </View>
          <View className="top-14">
            <ThemedText className="text-2xl font-bold ">Food & Drink</ThemedText>
          </View>
          <View className=' top-14' >
            <Homebox />
          </View>
          <View className="top-14">
            <ThemedText className="text-2xl font-bold">Hotels</ThemedText>
          </View>
          <View className="top-14 ">
            <HotelList />
          </View>


        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
};
export default homepage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  themedView: {
    flex: 1,
  },
  headerWrapper: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 36,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  filterContainer: {
    overflow: 'hidden',

  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 50,
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: 10,
    paddingBottom: 120,
  },
});


