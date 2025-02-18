import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MyPlanBox from '@/components/MyplanBox';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Bgelement from '@/components/Bgelement';

const plan: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.themedView}>
        <Bgelement/>
        <View style={styles.headerWrapper}>
          <ThemedText className='px-5' style={styles.headerText}>My Plan</ThemedText>
        <ScrollView showsVerticalScrollIndicator={false} >
        <MyPlanBox isEditMode={isEditMode} />
        </ScrollView>
        {/* ปุ่ม Edit/Check */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditMode(!isEditMode)}
        >
          
          <MaterialCommunityIcons name={isEditMode ? "file-check-outline" : "pencil"} size={32} color="#fff" />
        </TouchableOpacity>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 , paddingVertical: 60},
  themedView: { flex: 1 },
  headerWrapper: {
    marginTop: 10,
  },
  headerText: {
    fontSize: 44,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  editButton: {
    position: "absolute",
    backgroundColor: "#5680EC",
    end : "5%",
    top : "80%",
    padding: 16,
    borderRadius: 30,
  },
});

export default plan;
