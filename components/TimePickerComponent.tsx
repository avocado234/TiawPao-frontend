import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Platform, 
  TouchableOpacity, 
  Modal, 
  StyleSheet, 
  useColorScheme 
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { XStack } from 'tamagui';

interface TimePickerProps {
  onChangeTime: (time: Date) => void;
  planData :any
  userData :any
}

const TimePickerComponent: React.FC<TimePickerProps> = ({ onChangeTime,planData,userData }) => {
  console.log(planData)
  console.log(userData)

  
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [selectedTime, setSelectedTime] = useState<Date>(new Date());
  const [isTimePickerVisible, setTimePickerVisible] = useState<boolean>(false);

  const showTimePicker = () => setTimePickerVisible(true);
  const hideTimePicker = () => setTimePickerVisible(false);

  const handleConfirm = (event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      setSelectedTime(date);
      onChangeTime(date); // 🔹 ส่งค่ากลับไปที่ parent
     
      
    }
    if (Platform.OS === 'android') hideTimePicker();
  };

  return (
    <View style={styles.modalContent}>
      <View style={styles.timeSelectContainer}>
        {/* <XStack style={{ borderWidth: 1, borderColor: "#203B82", padding: 20, borderRadius: 10 }}> */}
          {/* <View className='pr-5'> */}
            <TouchableOpacity onPress={showTimePicker} style={{ padding: '4%' ,borderRadius:30,backgroundColor:"white",alignItems:"center"}}>
              <Text style={[styles.selectedTimeText, { color: '#203B82' }]}>Select Time</Text>
            </TouchableOpacity>
          {/* </View> */}
          {/* <Text style={[styles.selectedTimeText, { color: '#203B82' ,padding:'2%'}]}>
            Location Time: {selectedTime.toLocaleTimeString()}
          </Text> */}
        {/* </XStack> */}

        {isTimePickerVisible && Platform.OS === 'android' && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display="default"
            onChange={handleConfirm}
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
