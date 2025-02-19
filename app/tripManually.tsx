import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import Bgelement from "@/components/Bgelement";
import { useRouter, useLocalSearchParams } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';


export default function TripManually() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const tripName = Array.isArray(params.tripName) ? params.tripName[0] : params.tripName;
  const province = Array.isArray(params.province) ? params.province[0] : params.province;
  const startDate = Array.isArray(params.startDate) ? params.startDate[0] : params.startDate;
  const endDate = Array.isArray(params.endDate) ? params.endDate[0] : params.endDate;

  const start = new Date(startDate as string);
  const end = new Date(endDate as string);
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1;

  const [expandedDays, setExpandedDays] = useState<number[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const toggleDay = (index: number) => {
    setExpandedDays(prev => 
      prev.includes(index) ? prev.filter(day => day !== index) : [...prev, index]
    );
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const addToPlan = () => {
    // Logic to add the location to the plan
    toggleModal();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.themedView}>
        <Bgelement />

        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/add')}>
          <Icon name="arrow-back-outline" size={24} color="#203B82" />
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.contentContainer}>
          <ImageBackground 
            source={require("@/assets/images/Chonburi.png")}
            style={styles.tripCard}
            imageStyle={{ borderRadius: 8 }}
          >
            
            <View style={styles.tripContent}>
              <Text style={styles.tripName}>{tripName}</Text>
              <Text style={styles.tripDate}>
                {start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} - 
                {end.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </Text>
              <Text style={styles.province}>{province}</Text>

              <TouchableOpacity style={styles.editButton}>
                
                <Text style={styles.editButtonText}>Edit</Text>
                <Icon name="create-outline" size={20} color="#203B82" style={styles.editIcon} />
                <Icon name="pencil-outline" size={20} color="#203B82" style={styles.editIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.iconContainer}>
              <TouchableOpacity style={styles.iconButton}>
                <Icon name="book-outline" size={24} color="#203B82" />
                <Text style={styles.iconTextInline}>View Location</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Icon name="person-add-outline" size={24} color="#203B82" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Icon name="settings-outline" size={24} color="#203B82" />
              </TouchableOpacity>
            </View>
            
          </ImageBackground>
          {Array.from({ length: days }).map((_, index) => (
            <View key={index} style={styles.dayContainer}>
              <TouchableOpacity onPress={() => toggleDay(index)} style={styles.dayHeader}>
                <Text style={styles.dayText}>
                  Day {index + 1}, {new Date(start.getTime() + index * 86400000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </Text>
                <Icon 
                  name={expandedDays.includes(index) ? "chevron-up-outline" : "chevron-down-outline"} 
                  size={20} 
                  color="#203B82" 
                />
              </TouchableOpacity>
              {expandedDays.includes(index) && (
                <View style={styles.dropdownContent}>
                  <View style={styles.dropdownRow}>
                    <Icon name="add-circle-outline" size={24} color="#203B82" />
                    <Text style={styles.dropdownText}>Build your day by adding some location</Text>
                  </View>
                  <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
                    <Icon name="add-outline" size={16} color="#fff" />
                    <Text style={styles.addButtonText}>Add</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
          <View style={styles.budgetContainer}>
            <Text style={styles.budgetText}>Average budget</Text>
            <Text style={styles.budgetAmount}>0$</Text>
          </View>
        </ScrollView>
      </ThemedView>
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Location</Text>
          <View style={styles.searchContainer}>
            <Icon name="search-outline" size={20} color="#203B82" />
            <TextInput
              style={styles.searchInput}
              placeholder="Where do you want to go"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={toggleModal} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={addToPlan} style={styles.addToPlanButton}>
              <Text style={styles.addToPlanButtonText}>Add to plan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  themedView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  tripCard: {
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  tripImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
    padding: 70,
    // shadowOpacity: 0,
    // shadowRadius: 10,
    // elevation: 5,
  },
  tripName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#203B82',
  },
  tripDate: {
    fontSize: 16,
    color: '#6c757d',
    marginVertical: 4,
  },
  province: {
    fontSize: 16,
    color: '#6c757d',
  },
  dayContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  dayText: {
    fontSize: 16,
    color: '#203B82',
  },
  budgetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  budgetText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#203B82',
  },
  budgetAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#203B82',
  },
  tripContent: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'flex-end',
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  iconTextInline: {
    fontSize: 12,
    color: '#203B82',
    marginLeft: 4,
  },
  editButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editIcon: {
    marginRight: 4,
  },
  editButtonText: {
    fontSize: 14,
    color: '#203B82',
    fontWeight: 'bold',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  backButtonText: {
    fontSize: 16,
    color: '#203B82',
    marginLeft: 8,
  },
  dropdownContent: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginTop: 8,
  },
  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dropdownText: {
    marginLeft: 8,
    color: '#203B82',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#203B82',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  addButtonText: {
    color: '#fff',
    marginLeft: 4,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalContent: { 
    backgroundColor: 'white',
    padding:50,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#203B82',
    borderRadius: 8,
    paddingHorizontal: 30,
    marginBottom: 20,
    width: '100%',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    padding: 10
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#203B82',
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#203B82',
  },
  addToPlanButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#203B82',
  },
  addToPlanButtonText: {
    color: 'white',
  },
});
