import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import MyPlanBox from '@/components/MyplanBox';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FontAwesome } from '@expo/vector-icons';
import { Icon } from "@iconify/react";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const PlanScreen: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);

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

        <MyPlanBox isEditMode={isEditMode} />

        {/* ปุ่ม Edit/Check */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditMode(!isEditMode)}
        >
          
          <MaterialCommunityIcons name={isEditMode ? "file-check-outline" : "pencil"} size={32} color="black" />
        </TouchableOpacity>

      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  themedView: { flex: 1 },
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
  editButton: {
    position: "absolute",
    top: 740,
    right: 20,
    backgroundColor: "#1E90FF",
    padding: 16,
    borderRadius: 30,
  },
});

export default PlanScreen;
