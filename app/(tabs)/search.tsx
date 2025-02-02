import * as React from 'react';
import { View, Text, SafeAreaView, useColorScheme, Pressable, TouchableNativeFeedback } from 'react-native';
import PublicPlanBox from '@/components/PublicPlanBox';
import { ThemedText } from '@/components/ThemedText';
import SvgComponent from '@/components/Bgelement';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from "expo-router";
import { Scroll } from '@tamagui/lucide-icons';
import { ScrollView } from 'tamagui';
import { Image } from 'react-native';
import { useState } from 'react';
import Slider from '@react-native-community/slider';

export default function search() {
  const router = useRouter();
  const [menuIndex, setMenuIndex] = useState(-1);
  const [budget, setBudget] = useState(5000);

  return (
    <SafeAreaView>
      <ThemedView>
        <View className='pb-5'>
          <Image className='absolute -top-60'
            source={require("@/assets/images/Bgcycle.png")}
            style={{ width: "100%", height: "60%" }} />
          <View style={{ padding: 20 }}>
            <View>
              <ThemedText className="text-5xl text-white font-bold inset-9 mt-5 -inset-x-0">
                Public Plan
              </ThemedText>
            </View>
            <View className='flex-row justify-end right-15 -top-3'>
              <TouchableNativeFeedback onPress={() => router.push("/(tabs)/profile")}>
                <AntDesign name="filter" size={32} color="white" />
              </TouchableNativeFeedback>
            </View>
          </View>
          <ScrollView>
            <PublicPlanBox />
          </ScrollView>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}
