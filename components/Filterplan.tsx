import * as React from 'react';
import { View, Text, SafeAreaView, useColorScheme, Pressable, TouchableNativeFeedback } from 'react-native';
import PublicPlanBox from '@/components/PublicPlanBox';
import { ThemedText } from '@/components/ThemedText';
import SvgComponent from '@/components/Bgelement';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from "expo-router";
import { Scroll } from '@tamagui/lucide-icons';
import { ScrollView } from 'tamagui';
import { Image } from 'react-native';
import { useState } from 'react';
import Slider from '@react-native-community/slider';

export default function Filterplan() {
    const [menuIndex, setMenuIndex] = useState(-1);
    const [budget, setBudget] = useState(5000);

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Filters</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white', marginTop: 15 }}>Sort By</Text>
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
                <Pressable style={{ backgroundColor: 'white', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 5 }}>
                    <Text>Rating</Text>
                </Pressable>
                <Pressable style={{ backgroundColor: 'white', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 5 }}>
                    <Text>Budget</Text>
                </Pressable>
                <Pressable style={{ backgroundColor: 'white', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 5 }}>
                    <Text>Name</Text>
                </Pressable>
            </View>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white', marginTop: 15 }}>Range Budget</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: 10 }}>
                <Text style={{ color: 'white', fontWeight: 'bold', width: 50, textAlign: 'center' }}>0$</Text>
                <Slider
                    style={{ flex: 1 }}
                    minimumValue={0}
                    maximumValue={9999}
                    step={1}
                    value={budget}
                    onValueChange={setBudget}
                    minimumTrackTintColor="#000"
                    maximumTrackTintColor="#ddd"
                    thumbTintColor="#000"
                />
                <Text style={{ color: 'white', fontWeight: 'bold', width: 50, textAlign: 'center' }}>{budget}$</Text>
            </View>
        </View>
    );
}
