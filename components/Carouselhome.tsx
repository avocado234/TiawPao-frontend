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
    image: string | undefined;
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
    placeImageUrls: string[];
  
    
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
    console.log(carouselData);
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isAutoScrolling.current && flatListRef.current) {
                const nextIndex = (activeIndex + 1) % carouselData.length;
                isAutoScrolling.current = true;
                flatListRef.current.scrollToIndex({
                    index: nextIndex,
                    animated: true,
                });
                setActiveIndex(nextIndex);
                setTimeout(() => {
                    isAutoScrolling.current = false;
                }, 500);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [activeIndex, carouselData.length]);

    const getItemLayout = (_: any, index: number) => ({
        length: screenWidth,
        offset: screenWidth * index,
        index,
    });

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (isAutoScrolling.current) return;
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / screenWidth);
        setActiveIndex(index);
    };

    const renderItem = ({ item }: { item: CarouselItem }) => (
        <TouchableOpacity onPress={() => router.push('/HomeRecommend')}>
          <Image  source={{ uri: item.image }} style={styles.image} />
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
        top:10,
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
