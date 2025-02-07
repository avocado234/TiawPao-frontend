import { StyleSheet,Text } from "react-native";
import { Activity, Airplay } from "@tamagui/lucide-icons";
import { Button } from "react-native";
import {auth} from "@/config/firebaseconfig";
import {View, XGroup, XStack, YStack } from "tamagui";
import { signOut } from "firebase/auth";
import {useRouter} from "expo-router";
export default function HomeScreen() {
  const router = useRouter();
  const handelSignOut = async()=>{
      await signOut(auth)
      router.replace('/')
  }
  const user = auth.currentUser;
  return (
    <View  style={styles.container}>
      <YStack padding="$3" gap="$3">
        <Text className='font-bold text-red-400 text-xl'>Welcome User Email:{user?.email}</Text>
        <Button title="Sign Out" onPress={handelSignOut}/>
      
      </YStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});