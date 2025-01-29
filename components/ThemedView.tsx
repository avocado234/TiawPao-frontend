import { ReactNode } from 'react';
import { useColorScheme, View, type ViewProps } from 'react-native';

export type ThemedViewProps = ViewProps & {
  children?: ReactNode
  lightColor?: string;
  darkColor?: string;
  className?: string;
};

export function ThemedView({ children , style, className = '', ...otherProps }: ThemedViewProps) {
  const theme = useColorScheme();
  const themeClass = theme === 'light' ? 'bg-white' : 'bg-black';

  return (
    <View
      className={`${themeClass} ${className}`}
      style={style}
      {...otherProps}
    >
      {children}
    </View>
  );
}
