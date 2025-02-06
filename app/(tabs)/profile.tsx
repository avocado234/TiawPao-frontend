import React from 'react'
import { Text, Button, View, XGroup, XStack, YStack, ScrollView, styled } from "tamagui";
import Propage from '@/components/Profile_page';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedLogo } from '@/components/ThemedLogo';
import Bg from '@/components/Bgelement';
import { SafeAreaView } from 'react-native';




export default function profile() {
  return (
    <SafeAreaView className=' flex-1'>
    <ThemedView className=' flex-1'>
      <Bg />
      <View>
        <View className=''>
          <Propage />
        </View>
      </View>
    </ThemedView>
    </SafeAreaView>
  )
}


// const Foreground = styled(View,{
//   width: '90%',
//   height: 650,
//   backgroundColor: 'white',
//   borderRadius: 20,
//   opacity: 1,
//   zIndex: 1,
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: [{ translateX: '-50%' }, { translateY: '20%' }],
//   flex: 1,
//   justifyContent: 'center',
//   alignItems: 'center',


// })



