import React from 'react';
import { ThemedView } from '@/components/ThemedView';
import Bgelement from "@/components/Bgelement";
import { Pressable, View } from 'react-native';
import { Button, XStack, YStack } from 'tamagui';
import { router } from "expo-router";
import { ArrowLeft, Calendar, Clock, ChevronDown } from "@tamagui/lucide-icons";

export default function homedetail() {
    const Backtoindex = () => {
            router.push({
              pathname: "/plan",
            });
          };
  return (
    <ThemedView style={styles.themedView}>
        <XStack>
            <Pressable onPress={Backtoindex} style={styles.top}>
                <ArrowLeft size={24} color={'black'}/>
            </Pressable>
        </XStack>
    <View style={{flex:1, zIndex:0}}>
        <Bgelement/>
    </View>
    </ThemedView>
  );
}

const styles = {
  themedView: {
    flex: 1,
  },
  top:{
    zIndex:1,
    
  }
}