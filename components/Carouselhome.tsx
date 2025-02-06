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

interface CarouselItem {
    id: string;
    image: any;
}

const Carousel: React.FC = () => {
    const flatListRef = useRef<FlatList<CarouselItem>>(null);
    const screenWidth = Dimensions.get("window").width;
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const carouselData: CarouselItem[] = [
        { id: "01", image: require("@/assets/images/test.png") },
        { id: "02", image: require("@/assets/images/test2.png") },
        { id: "03", image: require("@/assets/images/test3.png") },
    ];
    


    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (activeIndex + 1) % carouselData.length;
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
            setActiveIndex(nextIndex);
        }, 3000);

        return () => clearInterval(interval);
    }, [activeIndex]);

    const getItemLayout = (_: any, index: number) => ({
        length: screenWidth,
        offset: screenWidth * index,
        index,
    });

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / screenWidth);
        setActiveIndex(index);
    };

    const renderItem = ({ item }: { item: CarouselItem }) => (
        <TouchableOpacity>
            <Image source={item.image} style={styles.image} />
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
            />
            {renderDotIndicators()}
        </View>
    );
};

export default Carousel;

const styles = StyleSheet.create({
    image: {
    
        height: 210,
        width: 410,
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
        opacity : 0.3,
        backgroundColor: "#000",
    },
});
