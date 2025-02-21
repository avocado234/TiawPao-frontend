import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import MyPlanBox from '@/components/MyplanBox';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Bgelement from '@/components/Bgelement';

const { width, height } = Dimensions.get('window');

const Plan: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.themedView}>
        <Bgelement />
        <View style={styles.headerWrapper}>
          <ThemedText style={styles.headerText}>My Plan</ThemedText>
        </View>
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollContainer}>
          <MyPlanBox isEditMode={isEditMode} />
        </ScrollView>
        {/* Edit Button */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditMode(!isEditMode)}
        >
          <MaterialCommunityIcons 
            name={isEditMode ? 'file-check-outline' : 'pencil'} 
            size={width * 0.08} 
            color="#fff" 
          />
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  themedView: { flex: 1 },
  headerWrapper: {
    marginTop: height * 0.05, 
  
  },
  headerText: {
    fontSize: width * 0.1,
    marginHorizontal: 20, 
    color: 'white',
    fontWeight: 'bold',
    marginBottom: height * 0.02,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: height * 0.06, 
  },
  editButton: {
    position: 'absolute',
    backgroundColor: '#5680EC',
    right: width * 0.05, 
    bottom: height * 0.1,
    padding: width * 0.04,
    borderRadius: width * 0.1,
  },
});

export default Plan;
