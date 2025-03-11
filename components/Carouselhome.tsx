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
    _id: string;
    image: any;
}

const Carousel: React.FC = () => {
    const flatListRef = useRef<FlatList<CarouselItem>>(null);
    const screenWidth = Dimensions.get("window").width;
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const isAutoScrolling = useRef(false);
    const router = useRouter();
    const snapToInterval = screenWidth;

    const carouselData: CarouselItem[] = [
        { _id: "67d011b380ad9b2abfb61d54", image: require("@/assets/images/test.png") },
        { _id: "67d011e580ad9b2abfb61d59", image: require("@/assets/images/test2.png") },
        { _id: "67d0120f80ad9b2abfb61d5e", image: require("@/assets/images/test3.png") },
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
        <TouchableOpacity 
            key={item._id}  // ✅ แก้ไขปัญหา unique key
            onPress={() => {
                console.log("🖱️ Clicked item:", item);
                console.log("🔍 Available keys in item:", Object.keys(item));
                console.log("📤 Sending ID:", item._id);

                router.push({
                    pathname: "../HomeRecommend",
                    params: { id: item._id }
                });
            }}
        >
            <Image source={item.image} style={styles.image} />
        </TouchableOpacity>
    );

    const renderDotIndicators = () => (
        <View style={styles.dotContainer}>
            {carouselData.map((item) => (
                <View
                    key={item._id}  // ✅ ใช้ `_id` เป็น key แทน index
                    style={[styles.dot, carouselData.indexOf(item) === activeIndex ? styles.activeDot : styles.inactiveDot]}
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
                keyExtractor={(item) => item._id} // ✅ ใช้ `_id` เป็น key
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
    image: {
        width: Dimensions.get("screen").width,
        height: 220, 
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
