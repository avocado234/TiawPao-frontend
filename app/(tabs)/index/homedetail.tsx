import React, {useState, useEffect} from 'react'
import { StyleSheet, Image, ScrollView, SafeAreaView, Pressable } from "react-native";
import { Text, Button, View, XStack, YStack } from "tamagui";
import Imageswipe from "@/components/imageswipe";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { ThemedText } from '@/components/ThemedText';
import ThemeCustomBackButton from "@/components/ThemeCustomBackButton";
import Bgelement from "@/components/Bgelement";
import apiTAT from '@/utils/axiosTATInstance';

interface ImageswipeData {
    id: string;
    name: string;
    detailimage: { uri: string };
}

const homedetail = () => {
    const param = useLocalSearchParams();
    const { id, name, location, image ,introduction} = param;
    const [imageswipes, setImageswipes] = useState<ImageswipeData[]>([]);

    // const fetchImageswipeData = async () => {
    //     try {
    //         const response = await apiTAT.get('/places?place_category_id=2&limit=130&place_sub_category_id=38');
    //         setImageswipes(transformImageswipe(response.data));
    //       } catch (error: any) {
    //         if (error.response) {
    //           console.error('Error response:', error.response);
    //         } else if (error.request) {
    //           console.error('Error request:', error.request);
    //         } else {
    //           console.error('Error message:', error.message);
    //         }
    //       }
    // }
    // const transformImageswipe = (data: any): ImageswipeData[] => {
    //     return data.data.map((item: any) => {
    //         console.log('Raw Item:', item);
    //         const imageUrl = item.sha?.detailPicture?.[0] ?? null;
    //         console.log('Final Image URL:', imageUrl);
    //             return {
    //                 id: item.placeId,
    //                 name: item.name,
    //                 detailimage: imageUrl // ส่งไปให้ imageswipe เป็น detailimage (เอาแค่รูปเดียว)
    //             };
    //         })
    //         .filter((item: ImageswipeData) =>
    //             item.id &&
    //             item.name &&
    //             item.detailimage 
    //         );
    // };
    
    // useEffect(() => {
    //     fetchImageswipeData(); }, []);

    return (
        <View style={styles.themedView}>
            <Bgelement/>
            <XStack style={styles.test}>
                <ThemeCustomBackButton />
            </XStack>
            <YStack className='bg-fixed' style={styles.topbackground}>
                <Text style={styles.texttopic}>{name}</Text>
                <Text style={styles.texttopic2}>{location}</Text>
            </YStack>
            <ScrollView>
            {typeof image === 'string' && (
                <Image source={{ uri: image }} style={styles.imagemain} resizeMode="cover" />)}
                <ThemedText style={styles.texttopic4}>Details</ThemedText>
                <YStack>
                    <ThemedText style={styles.text}>  {introduction}</ThemedText>
                </YStack>
            <ThemedText style={styles.texttopic3}>Things to do</ThemedText>
            <Imageswipe/>
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
        marginBottom:15,
    },
    texttopic4: {
        fontSize: 16,
        color: 'gray',
        fontWeight: 'bold',
        marginHorizontal: 25,
        marginVertical: 10,

    }
})

export default homedetail;