import React from 'react';
import { SafeAreaView, StyleSheet, View, Image, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, SharedValue, withSpring, withTiming } from 'react-native-reanimated';

interface ImageswipeProps {
  id: string;
  title: string;
  image: any;
}

interface Props {
  item: ImageswipeProps;
  index: number;
  scrollX: SharedValue<number>;
}

interface PaginationProps {
  items: ImageswipeProps[];
  scrollX: SharedValue<number>;
}

const { width } = Dimensions.get('window');

const Pagination = ({ items, scrollX }: PaginationProps) => {
  return (
    <View style={styles.pagcontainer}>
      {items.map((item, index) => {
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
        const key = item.id ? item.id : index.toString();
        return <Animated.View key={key} style={[styles.dot, dotAnimatedStyle]} />;
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
      <Image source={{ uri: item.image }} style={{ width: '80%', height: 300, borderRadius: 15, marginHorizontal: 10 }} />
    </Animated.View>
  );
};

const Main = ({ detailimages }: { detailimages: ImageswipeProps[] }) => {
  const scrollX = useSharedValue(0);
  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        data={detailimages}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({ item, index }) => <SliderItem item={item} index={index} scrollX={scrollX} />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={onScrollHandler}
      />
      <Pagination items={detailimages} scrollX={scrollX} />
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
