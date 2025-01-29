
import * as React from 'react';
import { View, Text } from 'react-native';
import ColorScrollList from '@/components/ColorScrollList';
import { ThemedText } from '@/components/ThemedText';
import SvgComponent from '@/components/Bgelement';


export default function profile(){
  return (
    <View className=''>
    <SvgComponent/>
    <View className='absolute'>
       <Text className='text-2xl text-white'>foo</Text>
       <Text>foo</Text>
       <Text>foo</Text>
       <Text>foo</Text>
       <Text>foo</Text>
       <Text>foo</Text>
 
    </View>
 </View>
  )
}

