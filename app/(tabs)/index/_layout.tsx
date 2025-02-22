
import { Stack } from 'expo-router';



export default function IndexLayout() {
  

  return (

    <Stack screenOptions={{ gestureEnabled: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
     </Stack>
  );
}
