import React from 'react';
import { ThemedView } from '@/components/ThemedView';
import Bgelement from "@/components/Bgelement";



export default function TripManually() {
  return (
    
      <ThemedView style={styles.themedView}>
        <Bgelement />
      </ThemedView>
   
  );
}

const styles = {
  themedView: {
    flex: 1,
  }
}
