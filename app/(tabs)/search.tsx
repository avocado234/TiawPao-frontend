
import * as React from 'react';
import { View, Text ,SafeAreaView, useColorScheme, Pressable} from 'react-native';
import ColorScrollList from '@/components/ColorScrollList';
import { ThemedText } from '@/components/ThemedText';
import SvgComponent from '@/components/Bgelement';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from "expo-router";
// const theme = useColorScheme();

export default function Profile() {
  const router = useRouter(); // ✅ ใช้ useRouter()

  return (
    <ThemedView>
      <SvgComponent />
      <View className="absolute">
        <ThemedText className="!justify-start text-4xl text-white inset-y-20 inset-x-8 font-bold">
          Public Plan
        </ThemedText>
        
      
        <Pressable onPress={() => router.push("/(tabs)/profile")}> 
        <AntDesign  name="filter" size={32} color="white" className=' inset-x-safe-offset-96 inset-y-10  font-bold '/>
        </Pressable>

        <ColorScrollList  />
      </View>
    </ThemedView>
  );
}

