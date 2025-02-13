import { useState, Dispatch, SetStateAction } from "react";
import { useColorScheme, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { MaterialIcons } from "@expo/vector-icons"; // Import icons from Expo (or use react-native-vector-icons)

type ThemedDropDownProps = {
    value: any;
    setValue: (value: any) => void;
    items: { label: string; value: any }[];
    style?: object;
    dropDownContainerStyle?: object;
    placeholder?: string;
    open?: boolean;
    setOpen?: Dispatch<SetStateAction<boolean>>;
    disabled?: boolean;
    listMode?: "DEFAULT" | "MODAL" | "SCROLLVIEW" | "FLATLIST";
    modalProps?: object;
    modalContentContainerStyle?: object;
};

export default function ThemedDropDownPicker({ 
    value, 
    setValue, 
    items, 
    style, 
    dropDownContainerStyle,
    placeholder = "Select an item",
    open: externalOpen,
    setOpen: externalSetOpen,
    disabled = false,
    ...props 
}: ThemedDropDownProps) {
    const theme = useColorScheme();
    const [internalOpen, setInternalOpen] = useState<boolean>(false);

    // Use external or internal open state
    const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;

    // ตรวจสอบให้แน่ใจว่า setIsOpen รับค่า boolean เสมอ
    const handleSetOpen: Dispatch<SetStateAction<boolean>> = (value) => {
        if (externalSetOpen) {
            externalSetOpen(value);
        } else {
            setInternalOpen(value);
        }
    };

    return (
        <View>
            <DropDownPicker
                open={isOpen}
                setOpen={handleSetOpen}
                value={value}
                setValue={setValue}
                items={items}
                disabled={disabled}
                style={[
                    { 
                        borderColor: theme == 'dark' ? "#3B82F6":"#203B82", 
                        height: 40, 
                        borderRadius: 24, 
                        backgroundColor: disabled 
                            ? theme === "dark" ? "#2a2a2a" : "#e9ecef"
                            : theme === "dark" ? "#18181B" : "#fff",
                        opacity: disabled ? 0.6 : 1
                    },
                    style
                ]}
                placeholder={placeholder}
                placeholderStyle={{
                    color: theme === "dark" ? "#8a8a8a" : "#6c757d"
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
