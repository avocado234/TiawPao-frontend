import React from 'react';
import { useRouter,router,useLocalSearchParams } from 'expo-router'; 

import { View, Text, SafeAreaView, Pressable, useColorScheme ,Image} from 'react-native';
import { ArrowLeft ,ArrowRightToLine} from "@tamagui/lucide-icons";
import { Button, XStack, YStack } from 'tamagui';
import { ImageBackground } from 'expo-image';

// const Themecolor = () => {
//   const theme = useColorScheme();
//   let opacitySize = 0.0;
//   if (theme === 'dark') {
//     opacitySize = 0.6;
//   } else {
//     opacitySize = 0.4;
//   }
//   return { opacitySize };
// };
const Goto_GenProbs = () =>{
const param = useLocalSearchParams();
const {tripName,region,province,startDate,startTime,endDate,endTime,visibility} = param;
  router.push({
    pathname: "/genaiselected",
    params: {
      tripName: tripName,
      region: region,
      province: province,
      startDate: startDate,
      startTime: startTime,
      endDate: endDate,
      endTime: endTime,
      visibility:visibility
    }
  });
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
const param = useLocalSearchParams();
let {tripName,region,province,startDate,startTime,endDate,endTime,visibility} = param;
if(province === "")
{
  province ="Random?" 
}
  return (
   <View>
       <Text style={styles.MainFont}>Gennarate your trip</Text>
       <XStack>
        <XStack>
          <Text style={styles.MainFont} >in </Text>
          <Text style={[styles.ProvinceFont,{ fontWeight:"bold"}]}>{province}</Text>
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
  let backGroundPic ;
  const theme = useColorScheme();
  const param = useLocalSearchParams();
  const {tripName,region,province,startDate,startTime,endDate,endTime,visibility} = param;
  if(region === "central")
    {
      backGroundPic =require(`@/assets/images/region/central.jpeg`);
    }
    else if(region === "northern")
    {
      backGroundPic =require(`@/assets/images/region/northern.jpg`);
    }
    else if(region === "northeastern")
    {
      backGroundPic =require(`@/assets/images/region/northeastern.jpg`);
    }
    else if(region === "eastern")
    {
      backGroundPic =require(`@/assets/images/region/eastern.jpg`);
    }
    else if(region === "western")
    {
      backGroundPic =require(`@/assets/images/region/western.jpg`);
    }
    else if(region === "southern")
    {
      backGroundPic =require(`@/assets/images/region/southern.jpg`);
    }
    else
    {
      let random = Math.floor(Math.random() * (5 - 0 + 1)) + 0;
      if(random === 0)
      {
        backGroundPic =require(`@/assets/images/region/central.jpeg`);
      }
      else if(random === 1)
      {
        backGroundPic =require(`@/assets/images/region/northern.jpg`);
      }
      else if(random === 2)
      {
        backGroundPic =require(`@/assets/images/region/northeastern.jpg`);
      }
      else if(random === 3)
      {
        backGroundPic =require(`@/assets/images/region/eastern.jpg`);
      }
      else if(random === 4)
      {
        backGroundPic =require(`@/assets/images/region/western.jpg`);
      }
      else
      {
        backGroundPic =require(`@/assets/images/region/southern.jpg`);
      }
    }
  return (
    <ImageBackground
      source={backGroundPic}
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
            <Button style={styles.ButtonOnlyOne}
            onPress={Goto_GenProbs}
            >
              <Text style={[styles.DescribeFont,{color:'white'}]}>Start</Text>
              <ArrowRightToLine size={20} color={"white"} />
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
    //backgroundColor: 'red',
  
  },
  YStackMainComponent: {
    marginTop: 50,
   // backgroundColor: 'red',
    width: '100%',
    height: 500,
    alignItems: 'left',
    justifyContent: 'Top',
    marginLeft:20,
    paddingTop:50,

  },
  ButtonOnlyOne:{
    backgroundColor:"#203B82",
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
