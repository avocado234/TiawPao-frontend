
import { Stack } from 'expo-router';



export default function AddLayout() {
  

  return (

    <Stack screenOptions={{ gestureEnabled: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="createtrip" options={{ headerShown: false }} />
          <Stack.Screen name="tripmanually" options={{ headerShown: false }} />
          <Stack.Screen name="genaiselected" options={{headerShown: false}} />
          <Stack.Screen name="tripgenai" options={{headerShown: false}} />
          <Stack.Screen name="maptrip" options={{headerShown: false}} />
          <Stack.Screen name="aiservice" options={{ headerShown: false }} />
          <Stack.Screen name="introgenai" options={{headerShown: false}} />
      
                   
     </Stack>
  );
}
