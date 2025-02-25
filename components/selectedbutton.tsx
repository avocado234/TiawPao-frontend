import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, Pressable, useColorScheme } from "react-native";
import { House, User, Users2, Heart } from "@tamagui/lucide-icons";
import { YStack ,XStack} from "tamagui";
type ButtonProps = {
    title: string;
    width?: number;
    logo: string;
    onToggle?: (state: boolean) => void;
};

const CustomButton: React.FC<ButtonProps> = ({ logo, title, width, onToggle }) => {
    const [Active, setIsActive] = useState(false);
    const theme = useColorScheme();
    let TextColor = "black";
    let BorderColor = "#203B82";
    if (theme === 'dark') {

        TextColor = "white";
        BorderColor = "#203B82";
    }
    else {
        if (Active) {
            TextColor = "white";
        }
        else {
            TextColor = "#203B82";
        }
        BorderColor = "#203B82";
    }
    const handlePress = () => {
        const toggles = !Active;
        setIsActive(toggles);
        if (onToggle) {
            onToggle(toggles);
        }
    }
    const showlogo = () => {
        if (logo === "Users2") {
            return (<Users2 size={20} color={TextColor} style={{marginTop:-3}}/>);
        }
        else if (logo === "Heart") {
            return (<Heart size={40} color={TextColor} style={{marginTop:-3}}/>);
        }
        else if (logo === "House") {
            return (<House size={40} color={TextColor} style={{marginTop:-3}}/>);
        }
        else if (logo === "User") {
            return (<User size={20} color={TextColor} style={{marginTop:-3}}/>);
        }
    }
    return (
        <Pressable
            style={[styles.button, { width, backgroundColor: Active ? "#203B82" : "transparent", borderColor: BorderColor }]}
            onPress={handlePress}
        >
            <XStack style={styles.XstackCompo}>
                {showlogo()}
                <Text style={[styles.text, { color: TextColor }]}>{title}</Text>
            </XStack>
        </Pressable>
    );

};

const styles = StyleSheet.create({
    button: {
        height: 35,
        backgroundColor: "#203B82",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 25,
        marginHorizontal:5,
    },
    text: {
        color: "white",
        fontSize: 14,
    },
    XstackCompo:
    {
        justifyContent: 'center', 
        alignItems: 'center'
    }

});

export default CustomButton;