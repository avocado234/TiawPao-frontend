import { StyleSheet,Text } from "react-native";
import { Activity, Airplay } from "@tamagui/lucide-icons";
import { Button } from "react-native";
import {auth} from "@/config/firebaseconfig";
import {View, XGroup, XStack, YStack } from "tamagui";
import {auth} from "@/config/firebaseconfig";
import { signOut } from "firebase/auth";
export default function HomeScreen() {
  const user = auth.currentUser;
  return (
    <View  style={styles.container}>
      <YStack padding="$3" gap="$3">
        <Text className='font-bold text-red-400 text-xl'>Welcome User Email:{user?.email}</Text>
        <Button title="Sign Out" onPress={() => signOut(auth)}/>
      
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