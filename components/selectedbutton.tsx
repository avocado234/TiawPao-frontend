import React from "react";
import { Text, StyleSheet, Pressable, useColorScheme } from "react-native";
import { House, User, Users2, Heart } from "@tamagui/lucide-icons";
import { XStack } from "tamagui";

type ButtonProps = {
  title: string;
  width?: number;
  logo: string;
  marginleft: number;
  marginright: number;
  onToggle?: (state: boolean) => void;
  isSelected?: boolean;
  disabled?: boolean;
};

const CustomButton: React.FC<ButtonProps> = ({marginright,marginleft,logo,title,width,onToggle,isSelected,disabled,}) => 
{
  const theme = useColorScheme();
  const active = isSelected || false;
  let TextColor = "black";
  let BorderColor = "#203B82";

  if (theme === "dark") {
    TextColor = "white";
    BorderColor = "#203B82";
  } else {
    TextColor = isSelected ? "white" : "#203B82";
    BorderColor = "#203B82";
  }

  const handlePress = () => {
    if (disabled) return;
    if (typeof onToggle !== "undefined") 
    {
        onToggle(!active);
    }
  };

  const showLogo = () => {
    if (logo === "Users2") return <Users2 size={20} color={TextColor} style={{ marginTop: -3 }} />;
    if (logo === "Heart") return <Heart size={20} color={TextColor} style={{ marginTop: 0 }} />;
    if (logo === "House") return <House size={20} color={TextColor} style={{ marginTop: -3 }} />;
    if (logo === "User") return <User size={20} color={TextColor} style={{ marginTop: -3 }} />;
  };

  return (
    <Pressable
      style={[
        styles.button,
        {
          width,
          backgroundColor: active ? "#203B82" : "transparent",
          borderColor: BorderColor,
          marginLeft: marginleft,
          marginRight: marginright,
        },
      ]}
      onPress={handlePress}
      disabled={disabled}
    >
      <XStack style={styles.XstackCompo}>
        {showLogo()}
        <Text style={[styles.text, { color: TextColor }]}>{title}</Text>
      </XStack>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 25,
  },
  text: {
    fontSize: 14,
  },
  XstackCompo: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomButton;
