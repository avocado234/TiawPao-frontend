import { TextInput, useColorScheme } from "react-native";
import { ReactNode } from "react";

type ThemedTextProps = {
  className?: string;
  [key: string]: any;
};

export default function ThemedTextInput({ className, ...props }: ThemedTextProps) {
  const theme = useColorScheme();

  return (
    <TextInput
      className={
        `${theme === "dark" ? "text-white border-blue-500" : "text-black"}` +
        (className ? ` ${className} ` : "")
      }
      {...props}
    />
  );
}
