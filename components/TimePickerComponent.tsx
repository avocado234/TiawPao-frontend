import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Button, 
  Platform, 
  TouchableOpacity, 
  Modal, 
  StyleSheet, 
  useColorScheme 
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const TimePickerComponent: React.FC = () => {
  const colorScheme = useColorScheme(); // ตรวจจับว่าเป็น Dark Mode หรือ Light Mode
  const isDarkMode = colorScheme === 'dark';

  const [selectedTime, setSelectedTime] = useState<Date>(new Date());
  const [isTimePickerVisible, setTimePickerVisible] = useState<boolean>(false);

  const showTimePicker = () => setTimePickerVisible(true);
  const hideTimePicker = () => setTimePickerVisible(false);

  const handleConfirm = (event: DateTimePickerEvent, date?: Date) => {
    if (date) setSelectedTime(date);
    if (Platform.OS === 'android') hideTimePicker(); // ปิด Picker อัตโนมัติใน Android
  };

  return (
    <View style={[styles.modalContent, isDarkMode ? styles.darkBackground : styles.lightBackground]}>
      <Text style={[styles.modalTitle, isDarkMode ? styles.darkText : styles.lightText]}>Add Location</Text>

      {/* Time Selection Component */}
      <View style={styles.timeSelectContainer}>
        <Text style={[styles.selectedTimeText, isDarkMode ? styles.darkText : styles.lightText]}>
          {selectedTime ? `Selected Time: ${selectedTime.toLocaleTimeString()}` : 'No time selected'}
        </Text>

        <Button title="Select Time" onPress={showTimePicker} />

        {/* Android ใช้ DateTimePicker ตรงๆ */}
        {isTimePickerVisible && Platform.OS === 'android' && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display="default"
            onChange={handleConfirm}
          />
        )}

        {/* iOS ใช้ Modal เพื่อให้ UI ดีขึ้น */}
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
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  timeSelectContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  selectedTimeText: {
    fontSize: 16,
    marginBottom: 10,
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
  },
  doneButton: {
    width: '100%',
    backgroundColor: '#203B82',
    paddingVertical: 10,
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // 🎨 Light & Dark Mode Styles
  lightBackground: {
    backgroundColor: 'white',
  },
  darkBackground: {
    backgroundColor: '#1E1E1E',
  },
  lightText: {
    color: 'black',
  },
  darkText: {
    color: 'white',
  },
});

export default TimePickerComponent;
