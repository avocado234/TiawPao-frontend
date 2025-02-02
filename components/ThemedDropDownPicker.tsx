import { useState } from "react";
import { useColorScheme, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { MaterialIcons } from "@expo/vector-icons"; // Import icons from Expo (or use react-native-vector-icons)

type ThemedDropDownProps = {
    value: any;
    setValue: (value: any) => void;
    items: { label: string; value: any }[];
    style?: object;
    dropDownContainerStyle?: object;
};

export default function ThemedDropDownPicker({ value, setValue, items, style, dropDownContainerStyle, ...props }: ThemedDropDownProps) {
    const theme = useColorScheme();
    const [open, setOpen] = useState(false);

    return (
        <View>
            <DropDownPicker
                open={open}
                setOpen={setOpen}
                value={value}
                setValue={setValue}
                items={items}
                style={[
                    { borderColor: "#203B82", height: 40, borderRadius: 24, backgroundColor: theme === "dark" ? "#18181B" : "white" }, // Text color based on theme
                ]}
                dropDownContainerStyle={{
                    backgroundColor: theme === "dark" ? "#333" : "#fff", borderColor: "#203B82"
                }}
                textStyle={{
                    color: theme === "dark" ? "white" : "black",
                }}
                ArrowDownIconComponent={() => (
                    <MaterialIcons name="arrow-drop-down" size={30} color={theme === "dark" ? "white" : "#203B82"} />
                )}
                ArrowUpIconComponent={() => (
                    <MaterialIcons name="arrow-drop-up" size={30} color={theme === "dark" ? "white" : "#203B82"} />
                )}
                {...props}
            />
        </View>
    );
}
