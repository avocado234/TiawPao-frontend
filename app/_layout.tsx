import 'react-native-reanimated';
import "../global.css";
import * as SplashScreen from 'expo-splash-screen';
import tamaguiConfig from "@/tamagui.config";
import {View} from 'react-native'
import { Stack } from 'expo-router';
import {useState} from 'react';
import { useFonts } from 'expo-font';
import { useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { TamaguiProvider} from '@tamagui/core'
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter, useSegments } from "expo-router";
import { ActivityIndicator } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

import {auth} from '../config/firebaseconfig'




import { onAuthStateChanged ,User} from 'firebase/auth';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  // const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  const segments = useSegments();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Starting onAuthStateChanged");
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("onAuthStateChanged triggered, user:", user);
      setUser(user);
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, []);
 

  // useEffect(() => {
  //   if (loading) return;              // รอโหลดข้อมูลก่อน

  //   const inAuthGroup = segments[0] === '(tabs)';

  //   if (!user && !inAuthGroup) { 
  //     router.replace("/");            // ถ้าไม่ได้ล็อกอินให้ไปหน้า login
  //   } else if (user && inAuthGroup) {
  //     router.replace("/(tabs)");      // ถ้าล็อกอินแล้วแต่เข้าหน้า login ให้ออกไปหน้า home
  //   }
  // }, [user, loading, segments]);

  
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!loaded) {
    return null;
  }
  

  return (
    <TamaguiProvider config={tamaguiConfig}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* <Stack screenOptions={{ gestureEnabled: false }}> */}
      {/* <AuthProvider> */}
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          <Stack.Screen name="personaldetail" options={{ headerShown: false }} />
          <Stack.Screen name="onetimepass" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      {/* </AuthProvider> */}
      <StatusBar style="auto" />
    </ThemeProvider>
    </TamaguiProvider>
  );
}
