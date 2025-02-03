import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, TextInput, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { YStack, XStack } from 'tamagui';
import { router } from 'expo-router';

export default function OTPVerification(): JSX.Element {
    const serverotp = "1234";  // ค่า OTP ที่ถูกต้อง
    const [otp, setOtp] = useState<string[]>(['', '', '', '']);
    const [timer, setTimer] = useState<number>(35);
    const navigation = useNavigation();
    const inputRefs = useRef<(TextInput | null)[]>([]);

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(countdown);
    }, []);

    const handleChange = (value: string, index: number) => {
        if (/^\d*$/.test(value)) { // รับแค่ตัวเลข
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value !== '' && index < 3) {
                inputRefs.current[index + 1]?.focus();
            }

            if (index === 3) {
                checkOtp(newOtp.join(''));  // ตรวจสอบ OTP เมื่อกรอกครบ
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

    const checkOtp = (enteredOtp: string) => {
        if (enteredOtp === serverotp) {
            router.push("/(tabs)")
            // Alert.alert("Verify Success", "OTP is correct!", [{ text: "OK", onPress: () => router.push("/(tabs)") }]);
        } else {
            Alert.alert("OTP is incorrect. Try again.");
            setOtp(['', '', '', '']);
            inputRefs.current[0]?.focus();  // รีเซ็ต OTP และโฟกัสช่องแรก
        }
    };

    return (
        <View className="flex justify-stretch items-center h-screen bg-white relative">
        
            <Pressable onPress={() => navigation.goBack()} className="absolute top-[80px] left-[20px]">
                <MaterialIcons name="arrow-back" size={30} color="#203B82" />
            </Pressable>
            <View className='mt-[150px] items-center'>
            <YStack className="w-[80%] mt-[50px]">
                <Text className="text-2xl font-bold text-[#203B82] mb-3">Verification Code</Text>
                <Text className="text-gray-500 mt-2 mb-5">
                    Please enter the 4-digit verification code sent to john***@gmail.com
                </Text>
                <Text className='mb-10'>Didn't receive OTP? 
                    <Pressable disabled={timer !== 0} onPress={() => setTimer(35)} className="mt-2">
                        <Text className={`${timer === 0 ? `text-[#203B82]` : `text-gray-500`} ml-3 font-bold`}>Resend OTP</Text>
                    </Pressable>
                </Text>
            </YStack>

            {/* ช่องใส่ OTP พร้อม Auto-Focus และ Backspace Navigation */}
            <XStack space="$2" gap="$2" className="mt-[30px]">
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        value={digit}
                        onChangeText={(value) => handleChange(value, index)}
                        onKeyPress={(event) => handleKeyPress(event, index)}
                        keyboardType="numeric"
                        maxLength={1}
                        className="w-[50px] h-[50px] border-b-2 border-gray-400 text-center text-xl"
                    />
                ))}
            </XStack>

            <XStack alignItems="center" space="$2" className="mt-[20px]">
                <MaterialIcons name="timer" size={20} color="#203B82" />
                <Text className="text-[#203B82] text-lg my-10">00:{timer < 10 ? `0${timer}` : timer}</Text>
            </XStack>

            </View>
        </View>
    );
}
