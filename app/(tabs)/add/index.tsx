import React, { useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import CreateTrip from './createtrip';

export default function FirstPageAdd() {
  useFocusEffect(
    useCallback(() => {
      return () => {}; // Cleanup function
    }, [])
  );

  return <CreateTrip />;
}
