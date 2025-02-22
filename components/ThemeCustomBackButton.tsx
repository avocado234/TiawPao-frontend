import { useColorScheme } from "react-native";
import { Pressable} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "expo-router";

type ThemedTextProps = {
[key: string]: any;
};

export default function ThemeCustomBackButton({ ...props }: ThemedTextProps) {
    const theme = useColorScheme();
    const navigation = useNavigation();

    return (
        <Pressable onPress={() => navigation.goBack()} {...props}>
            <MaterialIcons name="arrow-back" size={30} color={theme == 'dark' ? "#fff" : "#203B82"} />
        </Pressable>
    );
}
