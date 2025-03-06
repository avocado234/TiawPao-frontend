
import { Stack } from 'expo-router';



export default function ProfileLayout() {
  

  return (

    <Stack screenOptions={{ gestureEnabled: false }}>
          <Stack.Screen name="index" options={{ headerShown: false}} />
          <Stack.Screen name="resetpassword" options={{ headerShown: false}} />
     </Stack>
  );
}
