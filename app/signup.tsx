import React, { useState } from 'react'
import { View, Pressable, Text } from "react-native";
import { Image } from 'expo-image';
import { router, Link } from 'expo-router'
import { XStack, YStack } from "tamagui";
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedLogo } from '@/components/ThemedLogo';
import { Eye, EyeOff } from "@tamagui/lucide-icons";
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
import { useSignupStore } from "@/store/useSignupStore";
import ThemedTextInput from "@/components/ThemedTextInput";

/** ฟังก์ชันตรวจสอบแต่ละเงื่อนไข (ทีละข้อ) ว่าผ่านหรือไม่ */
const getPasswordChecks = (pwd: string) => {
  return {
    lengthCheck: pwd.length >= 8,                 // ยาว >= 8
    upperCheck: /[A-Z]/.test(pwd),                // มีตัวพิมพ์ใหญ่
    lowerCheck: /[a-z]/.test(pwd),                // มีตัวพิมพ์เล็ก
    digitCheck: /[0-9]/.test(pwd),                // มีตัวเลข
    specialCheck: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd) // มีอักขระพิเศษ
  };
};

/** ฟังก์ชันตรวจสอบว่าเงื่อนไขทั้งหมดผ่านหรือไม่ (ถ้าต้องใช้สรุปสุดท้าย) */
const validatePasswordConditions = (pwd: string): string[] => {
  const errors: string[] = [];
  if (pwd.length < 8) {
    errors.push("ความยาวอย่างน้อย 8 ตัวอักษร");
  }
  if (!/[A-Z]/.test(pwd)) {
    errors.push("มีตัวพิมพ์ใหญ่ (A-Z) อย่างน้อย 1 ตัว");
  }
  if (!/[a-z]/.test(pwd)) {
    errors.push("มีตัวพิมพ์เล็ก (a-z) อย่างน้อย 1 ตัว");
  }
  if (!/[0-9]/.test(pwd)) {
    errors.push("มีตัวเลข (0-9) อย่างน้อย 1 ตัว");
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) {
    errors.push("มีอักขระพิเศษอย่างน้อย 1 ตัว");
  }
  return errors;
};

export default function SignUpPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hashedPassword, setHashedPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [secureTextConfirm, setSecureTextConfirm] = useState(true);

  const { setSignupData } = useSignupStore();

  
  // ฟังก์ชันตรวจสอบรูปแบบอีเมล
  const validateEmailFormat = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // ใช้ตรวจสอบว่าข้อใดผ่านแล้วบ้างในแบบเรียลไทม์
  const passwordChecks = getPasswordChecks(password);

  /** กดปุ่ม Sign Up */
  const handleNext = () => {
    // 1) ตรวจสอบว่ากรอกครบทุกฟิลด์
    if (!username || !email || !password || !confirmpassword) {
      alert("Please fill in all fields!");
      return;
    }

    // 2) ตรวจสอบรูปแบบ Email
    if (!validateEmailFormat(email)) {
      alert("Invalid email format!");
      return;
    }

    // 3) ตรวจสอบเงื่อนไข Password (ทั้งหมด)
    const passwordErrors = validatePasswordConditions(password);
    if (passwordErrors.length > 0) {
      const alertMessage =
        "รหัสผ่านต้องมีเงื่อนไขดังนี้:\n" +
        passwordErrors.map(err => `• ${err}`).join("\n");
      alert(alertMessage);
      return;
    }

    // 4) ตรวจสอบว่า password กับ confirm password ตรงกันหรือไม่
    if (password !== confirmpassword) {
      alert("Passwords do not match!");
      return;
    }

    // หากผ่านทุกเงื่อนไข
    setSignupData({ username, email, password });
    router.push("/personaldetail");
  };

  return (
    <ThemedSafeAreaView>
      <ThemedView className="flex justify-center items-center h-screen">
        <ThemedLogo />
        <YStack space="$3" alignItems="center" width="100%">

          {/* Username */}
          <View className="w-[70%]">
            <ThemedText className="text-[#203B82] py-2">Username </ThemedText>
            <ThemedTextInput
              className="border border-[#203B82] h-[45px] w-full rounded-3xl px-4 py-2"
              onChangeText={setUsername}
              value={username}
            />
          </View>

          {/* Email */}
          <View className="w-[70%]">
            <ThemedText className="text-[#203B82] py-2">Email </ThemedText>
            <ThemedTextInput
              className="border border-[#203B82] h-[45px]  w-full rounded-3xl px-4 py-2"
              onChangeText={setEmail}
              value={email}
            />
          </View>

          {/* Password */}
          <View className="w-[70%]">
            <ThemedText className="py-2">Password</ThemedText>
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
                className="absolute right-4 top-1/2 -translate-y-1/2"
                onPress={() => setSecureText(!secureText)}
              >
                {secureText ? <EyeOff size={20} color="gray" /> : <Eye size={20} color="gray" />}
              </Pressable>
            </View>

            {/* แสดงผลแบบเรียลไทม์ว่าเงื่อนไขใดผ่านแล้วบ้าง */}
            {password.length > 0 && (
                <View className="mt-2">
                    <Text style={{ color: passwordChecks.lengthCheck ? '#16A34A' : '#DC2626' }} >
                    • At least 8 characters
                    </Text>
                    <Text style={{ color: passwordChecks.upperCheck ? '#16A34A' : '#DC2626' }}>
                    • At least 1 uppercase letter (A-Z)
                    </Text>
                    <Text style={{ color: passwordChecks.lowerCheck ? '#16A34A' : '#DC2626' }}>
                    • At least 1 lowercase letter (a-z)
                    </Text>
                    <Text style={{ color: passwordChecks.digitCheck ? '#16A34A' : '#DC2626' }}>
                    • At least 1 digit (0-9)
                    </Text>
                    <Text style={{ color: passwordChecks.specialCheck ? '#16A34A' : '#DC2626' }}>
                    • At least 1 special character
                    </Text>
                </View>
                )}

          </View>

          {/* Confirm Password */}
          <View className="w-[70%] pb-5">
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
                className="absolute right-4 top-1/2 -translate-y-1/2"
                onPress={() => setSecureTextConfirm(!secureTextConfirm)}
              >
                {secureTextConfirm ? <EyeOff size={20} color="gray" /> : <Eye size={20} color="gray" />}
              </Pressable>
            </View>

            {/* แจ้งเตือนแบบเรียลไทม์หากไม่ตรงกัน */}
            {password !== confirmpassword && confirmpassword.length > 0 && (
              <ThemedText className="text-red-500 text-md py-3">
                Passwords do not match!
              </ThemedText>
            )}
          </View>

          {/* สำหรับ Email หากต้องการแจ้งเตือนเรียลไทม์เช่นกัน */}
          {!validateEmailFormat(email) && email.length > 0 && (
            <ThemedText className="text-red-500 text-md py-3">
              Invalid email format!
            </ThemedText>
          )}

          {/* ปุ่ม Sign Up */}
          <Pressable
            className="bg-[#5680EC] w-[300px] h-[50px] flex justify-center items-center rounded-3xl"
            onPress={handleNext}
          >
            <Text className="text-xl text-white">SIGN UP</Text>
          </Pressable>
          <XStack>
            <ThemedText className="text-lg text-gray-500">Have an account ? </ThemedText>
            <Link href="/">
              <ThemedText className="text-lg text-[#203B82] font-bold">Sign In</ThemedText>
            </Link>
          </XStack>
        </YStack>
      </ThemedView>
    </ThemedSafeAreaView>
  );
}
