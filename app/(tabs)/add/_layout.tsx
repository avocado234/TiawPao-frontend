
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function AddLayout() {
 
  return (

    <Stack screenOptions={{ gestureEnabled: false }} initialRouteName="createtrip">
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="createtrip" options={{ headerShown: false }} />
          <Stack.Screen name="tripmanually" options={{ headerShown: false }} />
          <Stack.Screen name="genaiselected" options={{headerShown: false}} />
          <Stack.Screen name="tripgenai" options={{headerShown: false}} />
          <Stack.Screen name="maptrip" options={{headerShown: false}} />
     </Stack>
  );
}
