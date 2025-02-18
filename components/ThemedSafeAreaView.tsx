import { KeyboardAvoidingView, ScrollView, Platform, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import React, { ReactNode } from 'react';

export type ThemedSafeAreaViewProps = {
    children?: ReactNode;
    color?: string;
}

export function ThemedSafeAreaView({ children, color } : ThemedSafeAreaViewProps) {
    const theme = useColorScheme();

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1,backgroundColor: color ? color : (theme === 'dark' ? '#18181B' : '#FFF')}}>
                <KeyboardAvoidingView style={{ flex: 1, backgroundColor: color ? color : (theme === 'dark' ? '#18181B' : '#FFF') }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <ScrollView style={{ flex: 1, backgroundColor: color ? color : (theme === 'dark' ? '#18181B' : '#FFF') }}>
                        {children}
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}