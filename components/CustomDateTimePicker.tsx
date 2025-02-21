import React from 'react';
import { Modal, View, Button, Platform, StyleSheet } from 'react-native';
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
  if (Platform.OS === 'ios') {
    return (
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <DateTimePicker
              value={value}
              mode={mode}
              display="spinner"
              onChange={onChange}
              style={{ backgroundColor: 'white' }}
            />
            <Button title="ปิด" onPress={onClose} />
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
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
});

export default CustomDateTimePicker;
