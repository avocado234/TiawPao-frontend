import React from 'react';
import { Modal, View, Button, Platform, StyleSheet, useColorScheme } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

interface CustomDateTimePickerProps {
  visible: boolean;
  mode: 'date' | 'time';
  value: Date;
  onChange: (event: DateTimePickerEvent, date?: Date) => void;
  onClose: () => void;
}

const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = ({
  visible,
  mode,
  value,
  onChange,
  onClose,
}) => {
  const colorScheme = useColorScheme(); // Detect theme
  const isDarkMode = colorScheme === 'dark';

  const modalBackground = isDarkMode ? '#333' : '#fff';
  const textColor = isDarkMode ? '#fff' : '#000';

  if (Platform.OS === 'ios') {
    return (
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: modalBackground }]}>
            <DateTimePicker
              value={value}
              mode={mode}
              display="spinner"
              onChange={onChange}
              textColor={textColor as any} // Apply text color (iOS-specific prop)
            />
            <Button title="Confirm" onPress={onClose} color={isDarkMode ? '#bbb' : '#007AFF'} />
          </View>
        </View>
      </Modal>
    );
  } else {
    return visible ? (
      <DateTimePicker
        value={value}
        mode={mode}
        display="default"
        onChange={(event, date) => {
          onChange(event, date);
          if (event.type === 'set') {
            onClose();
          }
        }}
        themeVariant={isDarkMode ? 'dark' : 'light'} // Android-specific theme prop
      />
    ) : null;
  }
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    margin: 20,
    borderRadius: 10,
    padding: 20,
  },
});

export default CustomDateTimePicker;
