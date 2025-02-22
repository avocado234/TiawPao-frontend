import React, { useEffect, useRef, useState } from "react";
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
    id: string;
    image: any;
}

const Carousel: React.FC = () => {
    const flatListRef = useRef<FlatList<CarouselItem>>(null);
    const screenWidth = Dimensions.get("window").width;
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const isAutoScrolling = useRef(false);
    const router = useRouter();

    const carouselData: CarouselItem[] = [
        { id: "01", image: require("@/assets/images/test.png") },
        { id: "02", image: require("@/assets/images/test2.png") },
        { id: "03", image: require("@/assets/images/test3.png") },
        { id: "04", image: require("@/assets/images/test3.png") },
        { id: "05", image: require("@/assets/images/test3.png") },
    ];

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
    }, [activeIndex]);

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
            <Image className=" bg-fixed" source={item.image} style={styles.image} />
        </TouchableOpacity>
    );

    const renderDotIndicators = () => (
        <View style={styles.dotContainer}>
            {carouselData.map((_, index) => (
                <View
                    key={index}
                    style={[styles.dot, activeIndex === index ? styles.activeDot : styles.inactiveDot]}
                />
            ))}
        </View>
    );

    return (
        <View>
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
                snapToInterval={screenWidth} 
                snapToAlignment="center"      
            />
            {renderDotIndicators()}
        </View>
    );
};

export default Carousel;

const styles = StyleSheet.create({
    image: {
        width: Dimensions.get("window").width,
        height: 210, 
        resizeMode: "cover",
    },
    dotContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 16,
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        marginHorizontal: 6,
    },
    activeDot: {
        backgroundColor: "#000",
    },
    inactiveDot: {
        opacity: 0.3,
        backgroundColor: "#000",
    },
});
