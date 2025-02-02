import { useColorScheme } from "react-native";
import { Image } from "react-native";

type ThemedBg = {
[key: string]: any;
};

export function ThemedBg({ ...props }: ThemedBg) {
    const theme = useColorScheme();

    return (
        <Image className=' absolute  justify-center items-center -top-60'
        source={require(" ./assets/images/Bgcycle.png ")}
        style={{ width: "100%" , height: "40%" }}/>
    );
}
