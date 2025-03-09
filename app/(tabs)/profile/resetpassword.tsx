import { ThemedPressableBackButton } from '@/components/ThemedPressableBackButton';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
import { useRouter,useNavigation } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import ThemedTextInput from '@/components/ThemedTextInput';
import { ThemedView } from '@/components/ThemedView';
import { MaterialIcons } from '@expo/vector-icons';
import { EyeOff, Eye } from '@tamagui/lucide-icons';
import { Alert } from 'react-native';
import React, { useState } from 'react';
import { View, Pressable, useColorScheme } from 'react-native';
import { YStack, XStack } from 'tamagui';
import { getAuth, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { useForgetStore } from '@/store/useForgetStore';

export default function ResetPassword() {

    const theme = useColorScheme()
        const { email } = useForgetStore(); // This is for the email from the Forgot Password flow
    const [password, setPassword] = useState<string>('');
    const [confirmpassword, setConfirmPassword] = useState<string>('');
    const router = useRouter();
    const navigation = useNavigation();
    const [secureText, setSecureText] = useState<boolean>(true);
    const [secureTextConfirm, setSecureTextConfirm] = useState<boolean>(true);
    const resetPassword = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
            Alert.alert("Error", "No user is signed in.");
            return;
        }

        if (password.length < 6) {
            Alert.alert("Error", "Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmpassword) {
            Alert.alert("Error", "Passwords do not match.");
            return;
        }

        try {
            // Reauthentication is required for security reasons
            // const credential = EmailAuthProvider.credential(email, password);
            // await reauthenticateWithCredential(user, credential);
            Alert.alert('Success', 'Password updated successfully!');
            await updatePassword(user, password);
            navigation.goBack();
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };




    return (
        <ThemedSafeAreaView>
            <ThemedView className="mt-[-40px] flex justify-stretch items-center h-screen relative px-10">
                <ThemedPressableBackButton />
                <View className='mt-[150px]'>
                    <YStack className="w-[100%] mt-[50px]">
                        <ThemedText className="mt-[30px] text-3xl font-bold text-[#203B82] mb-3">Reset Password</ThemedText>
                    </YStack>
                    <View className="w-[300px] py-5">
                        <ThemedText className="py-2">New assword</ThemedText>
                        <View className="relative w-full">

                            <ThemedTextInput
                                className="border border-[#203B82] h-[45px] w-full rounded-3xl px-4 py-2 pr-12"
                                onChangeText={setPassword}
                                value={password}
                                secureTextEntry={secureText}
                                textContentType="oneTimeCode"
                                autoComplete="off"
                            />
                            <Pressable
                                className=" absolute right-4 top-1/2 -translate-y-1/2"
                                onPress={() => setSecureText(!secureText)}
                            >
                                {secureText ? <EyeOff size={20} color="gray" /> : <Eye size={20} color="gray" />}
                            </Pressable>
                        </View>

                    </View>
                    <View className="w-[300px] pt-5 pb-10">
                        <ThemedText className="py-2">Confirm Password</ThemedText>
                        <View className="relative w-full">

                            <ThemedTextInput
                                className="border border-[#203B82] h-[45px] w-full rounded-3xl px-4 py-2 pr-12"
                                onChangeText={setConfirmPassword}
                                value={confirmpassword}
                                secureTextEntry={secureTextConfirm}
                                textContentType="oneTimeCode"
                                autoComplete="off"
                            />
                            <Pressable
                                className=" absolute right-4 top-1/2 -translate-y-1/2"
                                onPress={() => setSecureTextConfirm(!secureTextConfirm)}
                            >
                                {secureTextConfirm ? <EyeOff size={20} color="gray" /> : <Eye size={20} color="gray" />}
                            </Pressable>
                        </View>

                    </View>

                    {password !== confirmpassword && confirmpassword.length > 0 && (
                        <ThemedText className="text-red-500 w-[300px] text-center  text-md pb-10">Passwords do not match!</ThemedText>
                    )}

                    <Pressable
                        className=' bg-[#5680EC] w-[300px] h-[50px] flex justify-center items-center rounded-3xl'
                        onPress={resetPassword}
                        >
                        <ThemedText className='text-xl text-white '>Change Password</ThemedText>
                    </Pressable>

                </View>
            </ThemedView>

        </ThemedSafeAreaView>
    );
}
