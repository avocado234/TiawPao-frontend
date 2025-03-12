import React, { useEffect, useState, useRef, useMemo } from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    View,
    Dimensions,
    NativeScrollEvent,
    NativeSyntheticEvent,
    TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

interface CarouselItem {
    image: string;
    id: string;
    routeId: string;
    name: string;
    introduction: string;
    numberOfDays: number;
    thumbnailUrl: string;
    provinceWithDay: any[];
    regionNames: string[];
    regions: any[];
    distance: number;
    placeImageUrls: any;
}

interface CarouselProps {
    carouselData: CarouselItem[];
}

const Carousel: React.FC<CarouselProps> = ({ carouselData }) => {
    const flatListRef = useRef<FlatList<CarouselItem>>(null);
    const screenWidth = Dimensions.get("window").width;
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const isAutoScrolling = useRef(false);
    const router = useRouter();
    const snapToInterval = screenWidth;

    const getItemLayout = useMemo(
        () => (_: any, index: number) => ({
            length: screenWidth,
            offset: screenWidth * index,
            index,
        }),
        [screenWidth]
    );
    
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (isAutoScrolling.current) return;
    
        const scrollPosition = event.nativeEvent.contentOffset.x;
        if (screenWidth > 0) {
            const index = Math.round(scrollPosition / screenWidth);
            if (!isNaN(index) && index >= 0 && index < carouselData.length) {
                setActiveIndex(index);
            }
        }
    };

    const renderItem = ({ item }: { item: CarouselItem }) => (
        <TouchableOpacity
            onPress={() => router.push({
                pathname: "/HomeRecommend",
                params: {
                    id: item.id,
                    name: item.name,
                    introduction: item.introduction,
                    numberOfDays: item.numberOfDays,
                    provinceWithDay: item.provinceWithDay,
                    regionNames: item.regionNames,
                    regions: item.regions,
                    distance: item.distance,
                    placeImageUrls: item.placeImageUrls,
                    image: item.image,
                    thumbnailUrl: item.thumbnailUrl
                }
            })}
        >
            <Image source={{ uri: item.image }} style={styles.image} />
        </TouchableOpacity>
    );

    const renderDotIndicators = () => (
        <View style={styles.dotContainer}>
            {carouselData.map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.dot,
                        activeIndex === index ? styles.activeDot : styles.inactiveDot,
                    ]}
                />
            ))}
        </View>
    );

    useEffect(() => {
        if (carouselData.length === 0) return;
    
        const interval = setInterval(() => {
            if (!isAutoScrolling.current && flatListRef.current) {
                const nextIndex = (activeIndex + 1) % carouselData.length;
    
                try {
                    isAutoScrolling.current = true;
                    flatListRef.current.scrollToIndex({
                        index: nextIndex,
                        animated: true,
                    });
                    setActiveIndex(nextIndex);
                } catch (error) {
                    console.error("Scroll Error:", error);
                } finally {
                    setTimeout(() => {
                        isAutoScrolling.current = false;
                    }, 500);
                }
            }
        }, 3000);
    
        return () => clearInterval(interval);
    }, [activeIndex, carouselData.length]);

    return (
        <View style={styles.carouselWrapper}>
            <FlatList
                data={carouselData}
                ref={flatListRef}
                getItemLayout={getItemLayout}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                onScroll={handleScroll}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                snapToInterval={snapToInterval}
                snapToAlignment="start"
            />
            {renderDotIndicators()}
        </View>
    );
};

export default Carousel;

const styles = StyleSheet.create({
    carouselWrapper: {
        width: "100%",
        position: "relative",
    },
    image: {
        width: Dimensions.get("window").width,
        height: 250,

    },
    dotContainer: {
        top: 10,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        marginHorizontal: 6,
        backgroundColor: "#000",
    },
    activeDot: {
        opacity: 1,
    },
    inactiveDot: {
        opacity: 0.3,
    },
});
