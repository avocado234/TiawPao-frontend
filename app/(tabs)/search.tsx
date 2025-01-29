import { StyleSheet, Image, Platform } from 'react-native';
import React from 'react'
import { Text,Button, View, XGroup, XStack, YStack, ScrollView } from "tamagui";
import ColorScrollList from '@/components/ColorScrollList';
export default function search() {
  return (
    <ScrollView>
    <ColorScrollList color="#32a852"/>
    </ScrollView>
  );
}

