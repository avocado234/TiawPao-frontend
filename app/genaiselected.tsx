import React from 'react';
import { ThemedView } from '@/components/ThemedView';
import { View, Text, SafeAreaView, Pressable, useColorScheme ,Image} from 'react-native';
import Bgelement from "@/components/Bgelement";



export default function GenAiSected() {
  return (
    
      <SafeAreaView style={styles.themedView}>
        <Bgelement />
      
      </SafeAreaView>
   
  );
}

const styles = {
  themedView: {
    flex: 1,
  }
}
