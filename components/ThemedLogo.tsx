import { useColorScheme } from "react-native";
import { Image } from "expo-image";

type ThemedTextProps = {
[key: string]: any;
};

export function ThemedLogo({ ...props }: ThemedTextProps) {
    const theme = useColorScheme();

    return (
        <Image
            source={
                theme === "dark"
                    ? require("../assets/images/TiawPaoLogo_dark.png")  
                    : require("../assets/images/TiawPaoLogo.png")      
            }
            style={{ width: "60%", height: "30%" }}
            contentFit="contain"
            {...props}
        />
    );
}
