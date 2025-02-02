
import * as React from 'react';
import { View, Text ,SafeAreaView, useColorScheme, Pressable} from 'react-native';
import PublicPlanBox from '@/components/PublicPlanBox';
import { ThemedText } from '@/components/ThemedText';
import SvgComponent from '@/components/Bgelement';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from "expo-router";
import { Scroll } from '@tamagui/lucide-icons';
import { ScrollView } from 'tamagui';
import { Image } from 'react-native';


export default function Profile() {
  const router = useRouter();

  return (
    <SafeAreaView  >
      <ScrollView >
        <ThemedView >
          <View>
              <Image className=' absolute   -top-60 '
                source={require("@/assets/images/Bgcycle.png")}
                style={{ width: "100%" , height: "40%" }}/>
            <View>
            <ThemedText className=" text-5xl text-white  font-bold inset-10 mt-12 ">
                Public Plan                                                                                                                                                                                                                                                                                                                     
              </ThemedText>
            </View>
            <View className='flex-row justify-end right-10 -top-3'>
              <Pressable onPress={() => router.push("/(tabs)/profile")}>
              <AntDesign  name="filter" size={32} color="white" />
              </Pressable>
            </View>
          <PublicPlanBox />
          </View>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

