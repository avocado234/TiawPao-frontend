import { useState, Dispatch, SetStateAction } from "react";
import { useColorScheme, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { MaterialIcons } from "@expo/vector-icons"; // Import icons from Expo (or use react-native-vector-icons)

interface ThemedDropDownProps {
    items: { value: string; label: string }[];
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    placeholder?: string;
    disabled?: boolean;
    onSelect?: (value: string) => void;
}

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
                    { borderColor: theme == 'dark' ? "#3B82F6":"#203B82", height: 40, borderRadius: 24, backgroundColor: theme === "dark" ? "#18181B" : "#fff" }, // Text color based on theme
                ]}
                placeholderStyle={{
                    color: "#8a8a8a"
                  }}

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
