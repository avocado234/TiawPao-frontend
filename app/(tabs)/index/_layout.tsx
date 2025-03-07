
import { Stack } from 'expo-router';



export default function IndexLayout() {
  

  return (

    <Stack screenOptions={{ gestureEnabled: false }} initialRouteName="home">
          <Stack.Screen name="home" options={{headerShown: false}} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="HomeRecommend" options={{headerShown : false}}/>
          <Stack.Screen name="homedetail" options={{headerShown: false}} />
        
     </Stack>
  );
}
