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
import { widths } from '@tamagui/config/types/media';


export default function Main() {
  const theme = useColorScheme();
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
  const TypeTripRender = () => {
    const [selectedTrip, setSelectedTrip] = useState<string | null>(null);
    const [triptype, setTriptype] = useState("Solo")
    const handleToggle = (state: boolean, tripType: string) => {
      if (state) {
        setSelectedTrip(tripType);
        setTriptype(tripType);
        console.log(triptype);
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
  const SelectedVibs = () => {
    const [Mustsee, setmustsee] = useState(false);
    const [Nature, setNature] = useState(false);
    const [Eco, setEco] = useState(false);
    const [ArtAndthea, setArtAndthea] = useState(false);
    const [Beach, setBeach] = useState(false);
    const [Adventure, setAdventure] = useState(false);
    const [Camping, setCamping] = useState(false);
    const [Urban, setUrban] = useState(false);
    const [Rural, setRural] = useState(false);
    const [Luxury, setLuxury] = useState(false);
    const [LocalCul, setLocalCul] = useState(false);
    const [Foodie, setFoodie] = useState(false);
    const [Shopping, setShopping] = useState(false);
    const handleToggle = (state: boolean, tripType: string) => {
        console.log("state is ",state);
        if (tripType === "must") {
          setmustsee(state);
          console.log("Logic must = ",Mustsee);
        }
        else if (tripType === "nature") {
          setNature(state);
          console.log("Logic Nature = ",Nature);
        }
        else if (tripType === "eco") {
          setEco(state);
          console.log("Logic Eco = ",Eco);
        }
        else if (tripType === "art") {
          setArtAndthea(state);
          console.log("Logic ArtAndthea = ",ArtAndthea);
        }
        else if (tripType === "beach") {
          setBeach(state);
          console.log("Logic Beach = ",Beach);
        }
        else if (tripType === "adventure") {
          setAdventure(state);
          console.log("Logic Adventure = ",Adventure);
        }
        else if (tripType === "camping") {
          setCamping(state);
          console.log("Logic Camping = ",Camping);
        }
        else if (tripType === "urban") {
          setUrban(state);
          console.log("Logic Urban = ",Urban);
        }
        else if (tripType === "rural") {
          setRural(state);
          console.log("Logic Rural = ",Rural);
        }
        else if (tripType === "luxury") {
          setLuxury(state);
          console.log("Logic Luxury = ",Luxury);
        }
        else if (tripType === "local") {
          setLocalCul(state);
          console.log("Logic local = ",LocalCul);
        }
        else if (tripType === "foodie") {
          setFoodie(state);
          console.log("Logic Foodie = ",Foodie);
        }
        else if (tripType === "shopping") {
          setShopping(state);
          console.log("Logic Shopping = ",Shopping);
        }
    };
    return (
      <YStack style={styles.YstackVibs}>
        <XStack style={styles.XstackVibs}>
          <SelectedCompo width={157} title="Must see attraction" marginleft={0} marginright={21} logo='no'
            onToggle={(state) => handleToggle(state, "must")} 
            isSelected={Mustsee}
            disabled={LocalCul}/>
          <SelectedCompo width={75} title="Nature" marginleft={0} marginright={21} logo='no' 
            onToggle={(state) => handleToggle(state, "nature")} 
            isSelected={Nature}/>
          <SelectedCompo width={100} title="Ecotourism" marginleft={0} marginright={0} logo='no' 
            onToggle={(state) => handleToggle(state, "eco")} 
            isSelected={Eco}
            disabled={Luxury}/>
        </XStack>
        <XStack style={styles.XstackVibs}>
          <SelectedCompo width={115} title="Art & Theater" marginleft={0} marginright={21} logo='no'  disabled={false}
            onToggle={(state) => handleToggle(state, "art")} 
            isSelected={ArtAndthea}/>
          <SelectedCompo width={67} title="Beach" marginleft={0} marginright={21} logo='no' 
            onToggle={(state) => handleToggle(state, "beach")} 
            isSelected={Beach}/>
          <SelectedCompo width={96} title="Adventure" marginleft={0} marginright={0} logo='no' 
            onToggle={(state) => handleToggle(state, "adventure")} 
            isSelected={Adventure}/>
        </XStack>
        <XStack style={styles.XstackVibs}>
          <SelectedCompo width={87} title="Camping" marginleft={0} marginright={21} logo='no' 
           onToggle={(state) => handleToggle(state, "camping")} 
           isSelected={Camping}/>
          <SelectedCompo width={72} title="Urban" marginleft={0} marginright={21} logo='no' 
            onToggle={(state) => handleToggle(state, "urban")} 
            isSelected={Urban}
            disabled={Rural}/>
          <SelectedCompo width={60} title="Rural" marginleft={0} marginright={21} logo='no' 
           onToggle={(state) => handleToggle(state, "rural")} 
           isSelected={Rural}
           disabled={Urban}/>
          <SelectedCompo width={72} title="Luxury" marginleft={0} marginright={0} logo='no' 
          onToggle={(state) => handleToggle(state, "luxury")} 
          isSelected={Luxury}
          disabled={Eco}/>
        </XStack>
        <XStack style={styles.XstackVibs}>
          <SelectedCompo width={115} title="Local Culture" marginleft={0} marginright={21} logo='no' 
           onToggle={(state) => handleToggle(state, "local")} 
           isSelected={LocalCul}
           disabled={Mustsee}/>
          <SelectedCompo width={75} title="Foodie" marginleft={0} marginright={21} logo='no' 
           onToggle={(state) => handleToggle(state, "foodie")} 
           isSelected={Foodie}/>
          <SelectedCompo width={90} title="Shopping" marginleft={0} marginright={0} logo='no' 
           onToggle={(state) => handleToggle(state, "shopping")} 
           isSelected={Shopping}/>
        </XStack>

      </YStack>);
  }
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
            {TypeTripRender()}
            <Text style={styles.TextSubScript}>What your travel vibes?</Text>
            {SelectedVibs()}
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
    //backgroundColor: "tranparent",
  },
  XstackFourSelect:
  {
    backgroundColor: 'tranparent',
    justifyContent: 'left',
    alignItems: 'center',
    marginBottom: 20,

    //marginLeft:'20',

  },
  XstackVibs:
  {
    widths: '100%',
    //backgroundColor : 'red',
    marginLeft: 10,
    marginBottom: 10,
  },
  YstackVibs:
  {
    //backgroundColor : 'green',
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
