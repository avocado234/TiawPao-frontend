import React, { useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, SharedValue,  withSpring, withTiming } from 'react-native-reanimated';

export type Imageswipetype = {
    id: string;
    title: string;
    image: any;
};

type Props = {
    item: Imageswipetype;
    index: number;
    scrollX: SharedValue<number>;
};

type PaginationProps = {
    items: Imageswipetype[];
    scrollX: SharedValue<number>;
};

const { width } = Dimensions.get('window');

export const Imageswipe = [
    {
        id: '1',
        title: 'Glass Kayaking',
        image: require('@/assets/images/glasskayaking.jpg'),
    },
    {
        id: '2',
        title: 'Paragliding',
        image: require('@/assets/images/paragliding.jpg'),
    },
    {
        id: '3',
        title: 'Sea Walking',
        image: require('@/assets/images/seawalking.jpg'),
    },
    {
        id: '4',
        title: 'Jetski',
        image: require('@/assets/images/jetski.jpg'),
    },
];

const Pagination = ({ items, scrollX }: PaginationProps) => {
    return (
        <View style={styles.pagcontainer}>
            {items.map((_, index) => {
                const dotAnimatedStyle = useAnimatedStyle(() => {
                    const scale = interpolate(
                        scrollX.value,
                        [(index - 1) * width, index * width, (index + 1) * width],
                        [0.8, 1.2, 0.8],
                        Extrapolation.CLAMP
                    );
                    return {
                        transform: [{ scale }],
                    };
                });
                return <Animated.View key={index} 
                style={[styles.dot, dotAnimatedStyle]} />;
            })}
        </View>
    );
};
const SliderItem = ({ item, index, scrollX }: Props) => {
    const rnAnimatedStyle = useAnimatedStyle(() => {
        const translateX = interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.25, 0, width * 0.25],
            Extrapolation.CLAMP
        );
        
        const scale = interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
        );

        return {
            transform: [
                { translateX: withTiming(translateX) },
                { scale: withSpring(scale) },
            ],
        };
    });

    return (
        <Animated.View style={[styles.itemContainer, rnAnimatedStyle]}>
            <Image source={item.image} style={{ width: '100%', height: 300, borderRadius: 15, marginHorizontal: 10 }} />
            <ThemedText style={styles.imageTitle}>{item.title}</ThemedText>
        </Animated.View>
    );
};

const Main = () => {
    const scrollX = useSharedValue(0);
    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollX.value = e.contentOffset.x;
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <Animated.FlatList
                data={Imageswipe}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => <SliderItem item={item} index={index} scrollX={scrollX} />}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onScroll={onScrollHandler}
            />
            <Pagination items={Imageswipe} scrollX={scrollX} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 25,
        marginRight: 15,
        borderRadius: 15,
        marginBottom: 30,
        width: width * 0.9,
    },
    imageTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    image: {
        width: '100%', 
        height: 300, 
        borderRadius: 15,
    },
    pagcontainer: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -30,
        marginBottom: 30,
    },
    dot: {
        backgroundColor: '#aaa',
        height: 8,
        width: 8,
        marginHorizontal: 2,
        borderRadius: 8,
    },
});

export default Main;
