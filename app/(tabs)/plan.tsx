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
import MyplanBox from '@/components/MyplanBox';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


const plan: React.FC = () => {

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.themedView}>
        <Image
          className="absolute -top-96"
          source={require("@/assets/images/Bgcycle.png")}
          style={styles.backgroundImage}
        />
        <View style={styles.headerWrapper}>
          <ThemedText className=' inset-6' style={styles.headerText}>My Plan</ThemedText>
        </View>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={false}>
          <MyplanBox />
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
    fontSize: 44,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  filterContainer: {
    overflow: 'hidden',

  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: 10,
    paddingBottom: 40, 
}});

export default plan;