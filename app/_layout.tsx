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
import api from '../utils/axiosInstance';
import { useUserStore } from '../store/useUser';

import { onAuthStateChanged ,User } from 'firebase/auth';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { user,setUserData,resetUserData } = useUserStore();

  const colorScheme = useColorScheme();
  // const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  const segments = useSegments();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [usercur, setUsercur] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!loading) {

      const isOnHome = segments[0] === '(tabs)';
      
      if (usercur && !isOnHome) {
        // ถ้าล็อกอินแล้ว แต่ตอนนี้ยังอยู่หน้า login => ไปหน้า Home (tabs)
        router.replace('/(tabs)'); 
      } else if (!usercur && isOnHome) {
        // ถ้ายังไม่ล็อกอิน แต่ตอนนี้อยู่ใน (tabs) => กลับไปหน้า login
        router.replace('/signin');
      }
    }
  }, [usercur, loading, segments]);


// สมมติว่า api เป็น instance ของ axios
const getUserData = async (email: any) => {
  try {
    // ตรวจสอบว่ามี user ที่ login อยู่หรือไม่
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('User not logged in');
    }

    // ดึง ID token จาก Firebase
    const idToken = await currentUser.getIdToken();

    // ส่ง idToken ไปกับ headers ของ API call
    const userData: any = await api.get(`/user/getuser/${email}`, {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    });

    const dataUser = userData.data;
    console.log(dataUser);
    setUserData({
      username: dataUser.username,
      email: dataUser.email,
      firstname: dataUser.firstname,
      lastname: dataUser.lastname,
      dateofbirth: dataUser.date_of_birth,
      tel: dataUser.tel,
      gender: dataUser.gender,
      img:dataUser.image
    });
  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
     if(usercur){
      getUserData(usercur.email);
     }
  }, [usercur]);

  useEffect(() => {
    console.log("Starting onAuthStateChanged");
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      // console.log("onAuthStateChanged triggered, user:", currentuser);
      setUsercur(currentuser);
      if(!currentuser){
        resetUserData();
      }
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, []);
  
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
  
  // useEffect(() => {
  //   if (loading) return;              // รอโหลดข้อมูลก่อน

  //   const inAuthGroup = segments[0] === '(tabs)';

  //   if (!user && !inAuthGroup) { 
  //     router.replace("/");            // ถ้าไม่ได้ล็อกอินให้ไปหน้า login
  //   } else if (user && inAuthGroup) {
  //     router.replace("/(tabs)");      // ถ้าล็อกอินแล้วแต่เข้าหน้า login ให้ออกไปหน้า home
  //   }
  // }, [user, loading, segments]);

  
  return (
    <TamaguiProvider config={tamaguiConfig}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ gestureEnabled: false }}>
      {/* <AuthProvider> */}
        {/* <Stack> */}
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="signin" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          <Stack.Screen name="personaldetail" options={{ headerShown: false }} />
          <Stack.Screen name="onetimepass" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="forgetpassword" options={{ headerShown : false }} />
          <Stack.Screen name="resetpassword" options={{ headerShown : false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="tripManually" options={{ headerShown: false }} />
          <Stack.Screen name="HomeRecommend" options={{headerShown : false}}/>

          <Stack.Screen name="homedetail" options={{headerShown: false}} />
          <Stack.Screen name="tripgenai" options={{headerShown: false}} />
          <Stack.Screen name="genaiselected" options={{headerShown: false}} />
        </Stack>
      {/* </AuthProvider> */}
      <StatusBar style="auto" />
    </ThemeProvider>
    </TamaguiProvider>
  );
}
