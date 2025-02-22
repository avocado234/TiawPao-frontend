
import { Stack } from 'expo-router';



export default function SearchLayout() {
  

  return (

    <Stack screenOptions={{ gestureEnabled: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
     </Stack>
  );
}
