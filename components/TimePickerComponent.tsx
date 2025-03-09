import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Modal,
  StyleSheet,
  useColorScheme,
  Alert
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { auth } from '@/config/firebaseconfig'
import { XStack } from 'tamagui';
import api from '@/utils/axiosInstance'
import axios from 'axios';
interface TimePickerProps {
  onChangeTime: (time: Date) => void;
  planData: any
  Day: any
  planID: any
}
const TimePickerComponent: React.FC<TimePickerProps> = ({ onChangeTime, planData, Day, planID }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  useEffect(() => {console.log(Day)}, []);

  const [selectedTime, setSelectedTime] = useState<Date>(new Date());
  const [isTimePickerVisible, setTimePickerVisible] = useState<boolean>(false);

  const showTimePicker = () => setTimePickerVisible(true);
  const hideTimePicker = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error("User not logged in");
      }
  
      const idToken = await currentUser.getIdToken();
  
      // สร้างเวลาในรูปแบบ HH:mm
      const hours = selectedTime.getHours();
      const minutes = selectedTime.getMinutes();
      const timeString = `${hours}:${minutes.toString().padStart(2, "0")}`;
      console.log("PlanID:", planID);
  
      // แปลงค่าตัวเลขให้เป็น string เพื่อให้ตรงกับ schema ใน Go
      const requestBody = {
        place_id: planData.placeId,
        place_label: planData.name,
        categorie_label: planData.category.name,
        introduction: planData.introduction,
        thumbnail_url: planData.thumbnailUrl[0],
        latitude: planData.latitude.toString(),       // แปลงเป็น string
        longtitude: planData.longitude.toString(),      // แปลงเป็น string
        time_location: timeString,
        day: Day.toString(),                           // แปลงเป็น string
      };
      console.log(requestBody)
      // ส่งข้อมูลไปยัง backend โดยใช้ planID จากตัวแปร
      const response = await api.post(
        `/plan/addtriplocation/${planID}`,
        requestBody,
        {
          headers: { 
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      console.log("Response:", response.data);
    } catch (error) {
      // แสดงรายละเอียด error ถ้ามีข้อมูลเพิ่มเติมจาก server
      console.error("Error updating trip location:", error);
      Alert.alert("Error", "Failed to update trip location.");
    } finally {
      setTimePickerVisible(false);
    }
  };
  

  const handleConfirm = async (event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      setSelectedTime(date);
      // console.log("Selected Time:", date);
      onChangeTime(date);
    }
    if (Platform.OS === 'android') hideTimePicker();
  };

  const handleConfirmAndriod = async (event: DateTimePickerEvent, date?: Date) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error("User not logged in");
      }

      const idToken = await currentUser.getIdToken();

      if (date) {
        setSelectedTime(date);
        onChangeTime(date);

        const hours = date.getHours();
        const minutes = date.getMinutes();
        const timeString = `${hours}:${minutes.toString().padStart(2, "0")}`;
        console.log("Time:", timeString);
        const requestBody = {
          place_id: planData.placeId,
          place_label: planData.name,
          categorie_label: planData.category.name,
          introduction: planData.introduction,
          thumbnail_url: planData.thumbnailUrl[0],
          latitude: planData.latitude.toString(),       // แปลงเป็น string
          longtitude: planData.longitude.toString(),      // แปลงเป็น string
          time_location: timeString,
          day: Day.toString(),                           // แปลงเป็น string
        };

        const response = await api.post(
          `/plan/addtriplocation/${planID}`,
          requestBody,
          {
            headers: { 
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        console.log("Response:", response.data);
      }
    } catch (error) {
      console.error("Error updating trip location:", error);
      Alert.alert("Error", "Failed to update trip location.");
    }
  };


  return (
    <View style={styles.modalContent}>
      <View style={styles.timeSelectContainer}>
        <TouchableOpacity onPress={showTimePicker} style={{ padding: '4%', borderRadius: 30, backgroundColor: "white", alignItems: "center" }}>
          <Text style={[styles.selectedTimeText, { color: '#203B82', fontFamily: "Nunito" }]}>Add Location</Text>
        </TouchableOpacity>
        {isTimePickerVisible && Platform.OS === 'android' && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display="default"
            onChange={handleConfirmAndriod}
          />
        )}

        {Platform.OS === 'ios' && (
          <Modal visible={isTimePickerVisible} transparent animationType="slide">
            <View style={styles.modalContainer}>
              <View style={[styles.pickerWrapper, isDarkMode ? styles.darkBackground : styles.lightBackground]}>
                <DateTimePicker
                  value={selectedTime}
                  mode="time"
                  display="spinner"
                  onChange={handleConfirm}
                />
                <TouchableOpacity onPress={hideTimePicker} style={styles.doneButton}>
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    padding: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  timeSelectContainer: {
    marginTop: 10,
    alignItems: 'flex-start',
  },
  selectedTimeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerWrapper: {
    alignItems: 'center',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  doneButton: {
    width: '80%',
    backgroundColor: '#203B82',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  doneButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  lightBackground: {
    backgroundColor: 'white',
  },
  darkBackground: {
    backgroundColor: 'black',
  },
});

export default TimePickerComponent;
