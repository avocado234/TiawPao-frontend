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



const Search: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.themedView}>
      <Bgelement/>
        <View style={styles.headerWrapper}>
          <ThemedText className=' top-5' style={styles.headerText}>Hidfdfdfdfdfd</ThemedText>
          <TouchableNativeFeedback>
            <TouchableOpacity  onPress={() => router.push('./profile')}>
              <Image className="absolute end-5 -top-16" source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }} style={styles.avatar} />
            </TouchableOpacity>
          </TouchableNativeFeedback>
        </View>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View className='top-10'>
          <Carousel/>
          </View>

        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  themedView: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: -185,
    right: -180,
    width: '200%',
    height: '90%',
  },
  headerWrapper: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 36 ,
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
    paddingBottom: 40, // เพิ่ม padding ด้านล่างเพื่อให้ scroll ถึงเนื้อหาสุดท้ายได้
  },
});

export default Search;
