import React from 'react';
import { View } from 'react-native';
import { ThemedText } from './ThemedText';
import { XStack } from 'tamagui';

interface RadioButtonProps {
  label: string;
  selected: boolean;
}

export const RadioButton: React.FC<RadioButtonProps> = ({ label, selected }) => {
  return (
    <XStack alignItems="center" space="$2">
      <View
        style={{
          height: 20,
          width: 20,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: selected ? '#3b82f6' : '#6b7280',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {selected && (
          <View
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: '#3b82f6',
            }}
          />
        )}
      </View>
      <ThemedText style={{ marginLeft: 8 }}>{label}</ThemedText>
    </XStack>
  );
}; 