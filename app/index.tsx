import React from 'react'
import { View, TextInput,Button } from "react-native";
import { Image } from 'expo-image';
import { router } from 'expo-router'
import { YStack } from "tamagui";
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function SignInPage() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <ThemedView className="flex justify-center items-center h-screen">
            <Image
                source={require('../assets/images/TiawPaoLogo.png')}
                style={{ width: '60%', height: '30%' }}
                contentFit="contain"
            />

            <YStack space="$3" alignItems="center" width="100%">
       
                <View className="w-[70%]">
                    <ThemedText className="text-[#203B82] py-2">Username or Email</ThemedText>
                    <TextInput
                        className="border border-gray-400 w-full rounded-3xl px-4 py-2"
                        onChangeText={setUsername}
                        value={username}
                    />
                </View>

                {/* Password */}
                <View className="w-[70%]">
                    <ThemedText className="text-[#203B82] py-2">Password</ThemedText>
                    <TextInput
                        className="border border-gray-400 w-full rounded-3xl px-4 py-2"
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry={true} 
                    />
                </View>

                <Button
                title="Press me"
                onPress={() => router.push("/(tabs)/plan")}
                />
            </YStack>
        </ThemedView>
    );
}
