
import { Stack } from 'expo-router';



export default function PlanLayout() {
  

  return (

    <Stack screenOptions={{ gestureEnabled: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
     </Stack>
  );
}
