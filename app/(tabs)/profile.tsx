import React from 'react'

import { Text, Button, View, XGroup, XStack, YStack, ScrollView, styled } from "tamagui";
import PublicPlanBox from '@/components/PublicPlanBox';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedLogo } from '@/components/ThemedLogo';
import SvgComponent from '@/components/Bgelement';

export default function profile() {
  return (
    <ThemedView>
      <Backround>
        <SvgComponent />
      </Backround>
  </ThemedView>
  )
}

const Backround = styled(View, {
  position: 'absolute', 
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,  
})



