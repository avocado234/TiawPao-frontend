import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, TextInput, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSignupStore } from '@/store/useSignupStore';
import { useForgetStore } from '@/store/useForgetStore';
import { YStack, XStack } from 'tamagui';
import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedPressableBackButton } from '@/components/ThemedPressableBackButton';
import { useColorScheme } from 'react-native';
import api from '@/utils/axiosInstance';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/config/firebaseconfig';

type OTPVerificationProps = {
    isRegister: boolean; // Flag to determine if this is for registration or password reset
};

export default function OTPVerification({ isRegister }: OTPVerificationProps): JSX.Element {
    const { email, password, firstname, lastname, dateofbirth, tel, gender } = useSignupStore();
    const { email: forgetEmail } = useForgetStore(); // This is for the email from the Forgot Password flow
    const [otp, setOtp] = useState<string[]>(['', '', '', '']);
    const [timer, setTimer] = useState<number>(35);
    const theme = useColorScheme();
    const inputRefs = useRef<(TextInput | null)[]>([]);
    const targetEmail = isRegister ? email : forgetEmail; // Use the appropriate email based on context

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(countdown);
    }, []);

    const handleChange = (value: string, index: number) => {
        if (/^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value !== '' && index < 3) {
                inputRefs.current[index + 1]?.focus();
            }

            if (index === 3) {
                checkOtp(newOtp.join(''));
            }
        }
    };

    const handleKeyPress = (event: any, index: number) => {
        if (event.nativeEvent.key === 'Backspace' && otp[index] === '') {
            if (index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const checkOtp = async (enteredOtp: string) => {
        try {
            const response = await api.post('/user/verifyotp', {
                email: targetEmail, 
                otp: enteredOtp,
            });

            if (response.data.message === 'OTP verified') {
                if (isRegister) {
                    try {
                        await createUserWithEmailAndPassword(auth, email, password);
                    } catch (err) {
                        Alert.alert('Sign Up Fail');
                    }
                    const registerResponse = await api.post('/user/register', {
                        email,
                        password,
                        firstname,
                        lastname,
                        dateofbirth,
                        tel,
                        gender,
                    });
                    if (registerResponse.status === 201) {
                        Alert.alert('Success', 'Registration completed!');
                        router.replace('/(tabs)');
                    } else {
                        Alert.alert('Error', 'Registration failed. Try again.');
                    }
                } else {
                    // Handle password reset logic here
                    // Example: You can show a password reset screen or trigger the password change API
                    Alert.alert('Success', 'OTP Verified. You can now reset your password.');
                    router.push('/resetpassword');
                }
            } else {
                Alert.alert('Error', 'Invalid OTP. Try again.');
                setOtp(['', '', '', '']);
                inputRefs.current[0]?.focus();
            }
        } catch (error) {
            console.error('OTP Verification Error:', error);
            Alert.alert('Error', 'Invalid OTP or Server Issue.');
        }
    };

    return (
        <ThemedView className="flex justify-stretch items-center h-screen bg-white relative">
            <ThemedPressableBackButton />
            <View className="mt-[150px] items-center">
                <YStack className="w-[80%] mt-[50px]">
                    <ThemedText className="text-3xl font-bold text-[#203B82] mb-3">Verification Code</ThemedText>
                    <ThemedText className={`${theme == 'dark' ? `text-gray-400` : `text-gray-500`} mt-2 mb-5 text-lg`}>
                        Please enter the 4-digit verification code sent to {targetEmail}
                    </ThemedText>
                    <ThemedText className="mb-10 text-lg">
                        Didn't receive OTP?
                        <Pressable disabled={timer !== 0} onPress={() => setTimer(35)} className="mt-2">
                            <Text
                                className={`${timer === 0 ? '' : 'text-gray-500'} ${
                                    theme == 'dark' ? `text-blue-400` : `text-blue-700`
                                } ml-3 font-bold text-lg`}
                            >
                                Resend OTP
                            </Text>
                        </Pressable>
                    </ThemedText>
                </YStack>

                <XStack space="$2" gap="$3" className="mt-[30px]">
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            value={digit}
                            onChangeText={(value) => handleChange(value, index)}
                            onKeyPress={(event) => handleKeyPress(event, index)}
                            keyboardType="numeric"
                            maxLength={1}
                            className={` ${theme == 'dark' ? `text-white` : `text-[#203B82]`} w-[50px] h-[50px] border-b-2 border-gray-400 text-center text-xl `}
                        />
                    ))}
                </XStack>

                <XStack alignItems="center" space="$2" className="mt-[20px]">
                    <MaterialIcons name="timer" size={20} color={theme == 'dark' ? '#fff' : '#203B82'} />
                    <ThemedText className="text-lg my-10">00:{timer < 10 ? `0${timer}` : timer}</ThemedText>
                </XStack>
            </View>
        </ThemedView>
    );
}
