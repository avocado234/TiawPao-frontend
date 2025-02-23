import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useColorScheme } from 'react-native';

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

const DropdownComponent = ({ onValueChange ,data,label}:any) => {
  const theme = useColorScheme();
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  // ฟังก์ชัน renderItem เพื่อปรับสไตล์เฉพาะเมื่อ item ถูกเลือก
  const renderItem = (item: any) => {
    const isSelected = item.value === value;
    return (
      <View
        style={[
          styles.item,
          {
            backgroundColor: isSelected
              ? '#3B82F6'
              : theme === 'light'
              ? 'white'
              : '#18181b',
          },
        ]}
      >
        <Text
          style={[
            styles.itemText,
            {
              color: isSelected
                ? 'white'
                : theme === 'light'
                ? 'black'
                : 'white',
            },
          ]}
        >
          {item.label}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: theme === 'light' ? 'white' : '#18181b',
        borderRadius: 8,
      }}
    >
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'white' }]}
        placeholderStyle={{
          fontSize: 16,
          color: theme === 'light' ? 'black' : 'white',
        }}
        selectedTextStyle={{
          fontSize: 16,
          color: theme === 'light' ? 'black' : 'white',
        }}
        inputSearchStyle={{
          height: 40,
          fontSize: 16,
          borderColor: theme === 'light' ? 'gray' : 'white',
          borderRadius: 8,
        }}
        iconStyle={styles.iconStyle}
        containerStyle={{
          backgroundColor: theme === 'light' ? 'white' : '#18181b',
        }}
        itemTextStyle={{ fontSize: 16 }}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
          // ส่งค่า selected item กลับไปที่ parent
          onValueChange && onValueChange(item.value);
        }}
        renderItem={renderItem}  // ใช้ renderItem ที่ปรับสไตล์สำหรับ selected item
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  item: {
    padding: 10,
  },
  itemText: {
    fontSize: 16,
  },
});
