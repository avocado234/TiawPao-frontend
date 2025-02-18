import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

interface Experience {
    id: number;
    name: string;
    rating: number;
    image: any;
}

const experience: Experience[] = [
    {
        id: 1,
        name: "Paragliding",
        rating: 4.9,
        image: require("@/assets/images/paragliding.jpg"),
    },
    {
        id: 2,
        name: "Banana Boat",
        rating: 4.7,
        image: require("@/assets/images/bananaboat.jpg"),
    },
    {
        id: 3,
        name: "Glass Bottom Kayaks",
        rating: 4.2,
        image: require("@/assets/images/glasskayaking.jpg"),
    },
    {
        id: 4,
        name: "Jet Ski",
        rating: 4.9,
        image: require("@/assets/images/jetski.jpg"),
    },
    {
        id: 5,
        name: "Sea Walking",
        rating: 4.5,
        image: require("@/assets/images/seawalking.jpg"),
    },
];

interface ExperienceCardProps {
    card: Experience;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ card }) => {
    return (
        <View style={styles.card}>
            <Image source={card.image} style={styles.image} />
            <View className="p-2" >
                <Text className=" text-[16px] font-bold">{card.name}</Text>
                <View style={styles.ratingContainer}>
                    <MaterialIcons name="star" size={16} color="gold" />
                    <Text style={styles.ratingText}>{card.rating}</Text>
                </View>
            </View>
        </View>
    );
};

const Experiencecard: React.FC = () => {
    // const PresstoHomedetail = () => {
    //         router.push({
    //           pathname: "/experincedetail",
    //         });
    //       };
return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
        >
            {experience.map((card) => (
                <TouchableOpacity key={card.id} activeOpacity={0.8}>
                    <ExperienceCard card={card} />
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default Experiencecard;

const styles = StyleSheet.create({
    scrollContainer: {
        paddingVertical: 10,
    },
    card: {
        backgroundColor: "#F8F9FA",
        borderRadius: 16,
        shadowRadius: 6,
        overflow: "hidden",
        elevation: 4,
        width: 160,
        marginHorizontal: 6,
    },
    image: {
        width: "100%",
        height: 100,
        borderRadius: 10,
    },
    location: {
        fontSize: 14,
        color: "#6B7280",
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 2,
    },
    ratingText: {
        fontSize: 14,
        marginLeft: 4,
    },
});
