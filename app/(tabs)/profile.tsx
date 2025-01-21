import React from 'react'
import { Text,Button, View, XGroup, XStack, YStack, ScrollView } from "tamagui";
import ColorScrollList from '@/components/ColorScrollList';
export default function profile(){
  return (
    <ScrollView>
       <ColorScrollList color="#32a852"/>
    </ScrollView>
  )
}
