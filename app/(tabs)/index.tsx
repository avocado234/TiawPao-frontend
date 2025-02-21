import React, { useState } from 'react';
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
import { useRouter } from "expo-router";
import Homebox from '@/components/Homebox';
import HotelList from '@/components/HotelList';
import { useUserStore } from '@/store/useUser';


const homepage: React.FC = () => {
  const router = useRouter();
  const {user} = useUserStore();
  // console.log(user)
  return (
    <SafeAreaView className=' flex-1'>
      <ThemedView className=' flex-1'>
        <Bgelement />
        <View style={styles.headerWrapper}>
          <ThemedText className=' top-5' style={styles.headerText}>{user.username}</ThemedText>
          <TouchableNativeFeedback>
            <TouchableOpacity onPress={() => router.push('./profile')}>
              <Image className="absolute end-5 bottom-[18]" source={{ uri: user.img }} style={styles.avatar} />
            </TouchableOpacity>
          </TouchableNativeFeedback>
        </View>
        <ScrollView
          className=' flex-1'
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
  scrollContentContainer: {
    padding: 10,
    paddingBottom: 120,
  },
});


