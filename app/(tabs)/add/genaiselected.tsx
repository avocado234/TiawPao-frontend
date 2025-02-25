import React, { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import ThemedCustomBackButton from '@/components/ThemeCustomBackButton';
import { View, Text, SafeAreaView, Pressable, useColorScheme, Image, Alert } from 'react-native';
import { ArrowLeft, ArrowRightToLine } from "@tamagui/lucide-icons";
import { Button, XStack, YStack } from 'tamagui';
import { ImageBackground } from 'expo-image';
import { ThemedView } from '@/components/ThemedView';
import Bgelement from "@/components/Bgelement";
import SelectedCompo from "@/components/selectedbutton";

const Return_Button = () => {
  const theme = useColorScheme();
  const BacktoAdd = () => {
    router.push({
      pathname: "/add/tripgenai",
    });
  };
  return (
    <Pressable onPress={BacktoAdd} >
      <MaterialIcons name="arrow-back" size={30} color={theme == 'dark' ? "#fff" : "#203B82"} />
    </Pressable>
  );
};


const KindTripRender = () => {
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);  
  const handleToggle = (state: boolean, tripType: string) => {
    if (state) {
      setSelectedTrip(tripType);  
    } else {
      setSelectedTrip(null);  
    }
  };
  return (
    <YStack>
      <XStack style={styles.XstackFourSelect}>
        <SelectedCompo
          title="Solo Trip"
          width={115}
          marginleft={30}
          marginright={0}
          logo="User"
          onToggle={(state) => handleToggle(state, "Solo")}
          isSelected={selectedTrip === "Solo"}
          disabled={selectedTrip !== null && selectedTrip !== "Solo"}
        />
        <SelectedCompo
          title="Partner Trip"
          width={138}
          marginleft={40}
          marginright={0}
          logo="Heart"
          onToggle={(state) => handleToggle(state, "Partner")}
          isSelected={selectedTrip === "Partner"}
          disabled={selectedTrip !== null && selectedTrip !== "Partner"}
        />
      </XStack>
      <XStack style={styles.XstackFourSelect}>
        <SelectedCompo
          title="Friends Trip"
          width={138}
          marginleft={30}
          marginright={0}
          logo="Users2"
          onToggle={(state) => handleToggle(state, "Friends")}
          isSelected={selectedTrip === "Friends"}
          disabled={selectedTrip !== null && selectedTrip !== "Friends"}
        />
        <SelectedCompo
          title="Family Trip"
          width={138}
          marginleft={20}
          marginright={0}
          logo="House"
          onToggle={(state) => handleToggle(state, "Family")}
          isSelected={selectedTrip === "Family"}
          disabled={selectedTrip !== null && selectedTrip !== "Family"}
        />
      </XStack>
    </YStack>
  );
};


export default function Main() {
  const theme = useColorScheme();
  let TextColor = "white";

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.ThemeView}>
        <Bgelement />
        <XStack style={styles.XStackReturnButton}>
          <Return_Button />
        </XStack>
        <YStack style={styles.YStackAllComponent}>
          <YStack style={styles.YStackNameTrip}>
            <Text style={[styles.TextHeader, { fontWeight: "bold" }]}>Test Trip</Text>
          </YStack>
          <YStack style={styles.YStackRenderContent}>
            <Text style={styles.TextSubScript}>What kind of trip are you planning?</Text>
            {KindTripRender()}
            <Text style={styles.TextSubScript}>What your travel vibes?</Text>
          </YStack>
        </YStack>
      </ThemedView>
    </SafeAreaView>

  );
}

const styles = {
  ThemeView: {
    flex: 1,
  },
  XStackReturnButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  YStackAllComponent: {
    flex: 1,
    backgroundColor: 'tranparent',
    widths: '100%',
    heights: '100%',
    marginHorizontal: 10,
  },
  YStackNameTrip: {
    widths: '100%',
    heights: '100',
    backgroundColor: 'tranparent',
    marginVertical: 20,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  YStackRenderContent:
  {
    backgroundColor: "tranparent",
  },
  XstackFourSelect:
  {
    backgroundColor: 'tranparent',
    justifyContent: 'left',
    alignItems: 'center',
    marginBottom: 20,
    //marginLeft:'20',

  },
  TextHeader:
  {
    fontSize: 32,
  },
  TextSubScript:
  {
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 30,

  },

}
