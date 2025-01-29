import { Text, useColorScheme } from "react-native";
import { ReactNode } from "react";

type ThemedTextProps = {
children: ReactNode;
className ?: string;
[key: string]: any;
};

export function ThemedText({ children, className, ... props } : ThemedTextProps) {

const theme = useColorScheme();

  return (
      <Text
          className={`${theme === `dark`? `text-[#F2F2F2]` : `[text-[#203B82]`}` +
                    (className ? ` ${className} `: ``)}
                  { ... props}
                    >
                  {children}
            </Text>
  );
}