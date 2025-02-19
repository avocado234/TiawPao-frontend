import React from 'react';
import { useRouter,router } from 'expo-router'; 

import { View, Text, SafeAreaView, Pressable, useColorScheme ,Image} from 'react-native';
import { ArrowLeft ,ArrowRightToLine} from "@tamagui/lucide-icons";
import { Button, XStack, YStack } from 'tamagui';
import { ImageBackground } from 'expo-image';

const Themecolor = () => {
  const theme = useColorScheme();
  let opacitySize = 0.0;
  if (theme === 'dark') {
    opacitySize = 0.6;
  } else {
    opacitySize = 0.4;
  }
  return { opacitySize };
};

const Return_Button = () => {
 
  const BacktoAdd = () => {
    router.push({
      pathname: "/add",
    });
  };

  return (
    <Pressable onPress={BacktoAdd}>
      <ArrowLeft size={24} color={"black"} />
    </Pressable>
  );
};

const MainText = () => {
  const trip = "ChonBuri";
  return (
   <View>
       <Text style={styles.MainFont}>Gennarate your trip</Text>
       <XStack>
        <XStack>
          <Text style={styles.MainFont} >in </Text>
          <Text style={[styles.ProvinceFont,{ fontWeight:"bold"}]}>{trip}</Text>
          </XStack>
       <Image
        source={require("@/assets/images/Flag-thai.png")}
        style={{ width: 50, height: 42 ,paddingLeft:5}}
        resizeMode="contain"
        />
       </XStack>
    </View>
  );
};

const Main = () => {
  let backgroundColor;
  
  const theme = useColorScheme();
  if (theme === 'dark') {
   
  } else {
    
  }
  return (
    <ImageBackground
      source={require("@/assets/images/koh-larn-thailand.jpg")}
      style={styles.ImageBackGroud}>
      <SafeAreaView style={styles.ThemeSafeArea}>
        <XStack style={styles.XStackReturnButton}>
          <Return_Button /> 
        </XStack>
        <YStack style={styles.YStackMainComponent}>
            <MainText/>
          <View style={{marginTop:37}}>
            <Text style={styles.DescribeFont}>Add your travel preferences to</Text>
            <Text style={styles.DescribeFont}>generate a personalized trip</Text>
          </View>
          <View style={{marginTop:37}}>
            <Button style={styles.ButtonOnlyOne}>
              <Text style={styles.DescribeFont}>Start</Text>
              <ArrowRightToLine size={20} color={"black"} />
            </Button>
          </View>
          
        </YStack>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Main;

const styles = {
  ImageBackGroud: {
    flex: 1,
    opacity: 0.8,
  },
  ThemeSafeArea: {
    flex: 1,
  },
  XStackReturnButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: 'red',
  
  },
  YStackMainComponent: {
    marginTop: 50,
    backgroundColor: 'red',
    width: '100%',
    height: 500,
    alignItems: 'left',
    justifyContent: 'Top',
    marginLeft:20,
    paddingTop:50,

  },
  ButtonOnlyOne:{
    
    borderRadius:50,
    width:100,
    heigth:38,
  },
  MainFont:{
    fontSize:35,

  },
  ProvinceFont:{
    fontSize:35,
   
  },
  DescribeFont:{
    fontSize:14,
  }
};
