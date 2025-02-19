import React from 'react'
import { StyleSheet, Image, ScrollView, SafeAreaView, Pressable } from "react-native";
import { Text, Button, View, XGroup, XStack, YStack } from "tamagui";
import { ArrowLeft, Bold } from "@tamagui/lucide-icons";
import Expecard from '@/components/experiencecard';
import { router, useLocalSearchParams, useRouter } from "expo-router";

const homedetail = () => {
    const router = useRouter();
    const param = useLocalSearchParams();
    let pic;
    const { id, name, location, image } = param;
    if (id === "1") {
        pic = require(`@/assets/images/koh-larn-thailand.jpg`);
    }
    if (id === "2") {
        pic = require(`@/assets/images/Oldtown.png`);
    }
    if (id === "3") {
        pic = require(`@/assets/images/Doiinthanon.png`);
    }
    if (id === "4") {
        pic = require(`@/assets/images/wat-arun.jpg`);
    }
    const PresstoHome = () => {
        router.push({
            pathname: "/(tabs)",
        });
    };
    return (
        <View style={styles.themedView}>
            <XStack style={styles.test}>
                <Pressable>
                    <ArrowLeft size={24} onPress={PresstoHome} />
                </Pressable>
            </XStack>
            <YStack style={styles.topbackground}>
                <Text style={styles.texttopic}>{name}</Text>
                <Text style={styles.texttopic2}>{location}</Text>
            </YStack>
            <ScrollView>
                <Image source={pic}
                    style={styles.imagemain}
                    resizeMode='cover' />
                <YStack>
                    <Text style={styles.text}>        Koh Larn (Coral Island) is a perfect day trip from Pattaya, just 40 minutes by ferry or speedboat from Bali Hai Pier. Its clear beaches and warm waters are ideal for parasailing, jet skiing, banana boat rides, and snorkeling. For stunning views, visit the Big Buddha Viewpoint. You can explore the island by renting an affordable scooter or joining a group tour, which usually includes transportation.</Text>
                    <Text style={styles.texttopic3}> The way to Experience Koh Larn </Text>
                    <Text style={styles.texttopic4}> Activities </Text>
                    <View className=''>
                        <Expecard />
                    </View>
                    <Text style={styles.texttopic4}> Food & Drink </Text>
                    <View className=''>
                        <Expecard />
                    </View>
                    <Text style={styles.texttopic4}> Hotel </Text>
                    <View className=''>
                        <Expecard />
                    </View>
                </YStack>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    ThemeSafeArea: {
        padding: 10,
        flex: 1,
    },
    themedView: {
        flex: 1,
    },
    test: {
        color: 'white',
        paddingHorizontal: 16,
        paddingVertical: 8,
        paddingTop: 42,
        alignItems: 'center',
        backgroundColor: '#5680EC',
    },
    texttopic: {
        color: '#fbdf61',
        fontSize: 40,
        marginLeft: 26,
    },
    texttopic2: {
        color: 'white',
        fontSize: 20,
        marginLeft: 45,
        marginTop: 5,
        marginBottom: 12,
    },
    topbackground: {
        backgroundColor: '#5680EC',
    },
    imagemain: {
        flex: 1,
        width: '100%',
        height: 230,
    },
    text: {
        fontSize: 12,
        marginHorizontal: 30,
        marginVertical: 12,
    },
    texttopic3: {
        fontSize: 16,
        color: '#203B82',
        fontWeight: 'bold',
        marginHorizontal: 17,
    },
    texttopic4: {
        fontSize: 16,
        color: '#4B5563',
        fontWeight: 'semibold',
        margin: 10,
    }
})

export default homedetail;