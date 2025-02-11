import React from 'react'
import { StyleSheet, Image, ScrollView, Dimensions } from "react-native";
import { Text, Button, View, XGroup, XStack, YStack } from "tamagui";
import Entypo from '@expo/vector-icons/Entypo';
import { ThemedSafeAreaView } from './ThemedSafeAreaView';

const { width, height } = Dimensions.get("window");
const homedetail = () => {
  return (
    <View>
      <XStack style={styles.test}>
        <Entypo name="back" size={50} color="Black" style={{ marginLeft: 10, }}></Entypo>
      </XStack>
      <YStack style={styles.topbackground}>
        <Text style={styles.texttopic}>Koh Larn</Text>
        <Text style={styles.texttopic2}>Pattaya Chonburi</Text>
      </YStack>
      <ScrollView>
        <Image source={require("@/assets/images/koh-larn-thailand.jpg")} 
        style={styles.imagemain}
        resizeMode='cover'/>
        <YStack>
          <Text style={styles.text}>        Koh Larn (Coral Island) is a perfect day trip from Pattaya, just 40 minutes by ferry or speedboat from Bali Hai Pier. Its clear beaches and warm waters are ideal for parasailing, jet skiing, banana boat rides, and snorkeling. For stunning views, visit the Big Buddha Viewpoint. You can explore the island by renting an affordable scooter or joining a group tour, which usually includes transportation.</Text>
        </YStack>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonblack: {
    backgroundColor: 'black',
    width: 50,
    height: 30,
  },
  test: {
    backgroundColor: '#5680EC',
  },
  texttopic: {
    color: '#fbdf61',
    fontSize: 40,
    marginLeft: 26,
  },
  texttopic2: {
    color: 'white',
    fontSize:20,
    marginLeft: 45,
    marginTop:5,
    marginBottom:12,
  },
  topbackground: {
    backgroundColor:'#5680EC',
  },
  imagemain: {
    flex:1,
    width: '100%',
    height: 230,
  },
  text:{
    fontSize:12,
    marginHorizontal:30,
    marginVertical:12,
  }
})

export default homedetail;