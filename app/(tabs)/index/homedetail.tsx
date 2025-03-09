import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, ScrollView, SafeAreaView, Pressable } from "react-native";
import { Text, Button, View, XStack, YStack } from "tamagui";
import Imageswipe from "@/components/imageswipe";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { ThemedText } from '@/components/ThemedText';
import ThemeCustomBackButton from "@/components/ThemeCustomBackButton";
import Bgelement from "@/components/Bgelement";
import apiTAT from '@/utils/axiosTATInstance';

const homedetail = () => {
    const param = useLocalSearchParams();
    const { id, name, location, detailimage, introduction, thumbnailimage } = param;

    let DetailImage = [];
    if (typeof detailimage === 'string') {
        try {
            DetailImage = JSON.parse(detailimage);
        } catch (error) {
            console.error('Failed to parse detailimage:', error);
            DetailImage = [];
        }
    }

    DetailImage = Array.isArray(DetailImage) 
        ? DetailImage.filter((image: any) => image?.uri && typeof image.uri === 'string' && image.uri.trim() !== '')
        : [];

    const mappedDetailImages = DetailImage.map((image: any, index: number) => ({
        id: index.toString(),
        title: `Image ${index + 1}`,
        image: image.uri,
    }));

    console.log('Detail Pictures:', mappedDetailImages);

    return (
        <View style={styles.themedView}>
            <Bgelement />
            <XStack style={styles.test}>
                <ThemeCustomBackButton />
            </XStack>
            <YStack className='bg-fixed' style={styles.topbackground}>
                <Text style={styles.texttopic}>{name}</Text>
                <Text style={styles.texttopic2}>{location}</Text>
            </YStack>
            <ScrollView>
                {typeof thumbnailimage === 'string' && (
                    <Image source={{ uri: thumbnailimage }} style={styles.imagemain} resizeMode="cover" />
                )}
                <ThemedText style={styles.texttopic4}>Details</ThemedText>
                <YStack>
                    <ThemedText style={styles.text}>{introduction}</ThemedText>
                </YStack>
                {mappedDetailImages.length > 0 && (
                    <>
                        <ThemedText style={styles.texttopic3}>Things to do</ThemedText>
                        <Imageswipe detailimages={mappedDetailImages} />
                    </>
                )}
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
        paddingBottom: 50,
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
        fontSize: 32,
        marginLeft: 26,
        fontWeight: 'bold',
    },
    texttopic2: {
        color: 'white',
        fontSize: 20,
        marginLeft: 35,
        marginTop: -5,
        marginBottom: 12,
        fontWeight: 'semibold',
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
        fontSize: 16,
        marginHorizontal: 30,
        textAlign: 'justify',
        marginBottom: 30,
    },
    texttopic3: {
        fontSize: 16,
        color: 'gray',
        fontWeight: 'bold',
        marginHorizontal: 25,
        marginBottom: 15,
    },
    texttopic4: {
        fontSize: 16,
        color: 'gray',
        fontWeight: 'bold',
        marginHorizontal: 25,
        marginVertical: 10,

    },
    text2: {
        fontSize: 16,
        marginHorizontal: 30,
        textAlign: 'justify',
        marginBottom: 30,
    }
})

export default homedetail;