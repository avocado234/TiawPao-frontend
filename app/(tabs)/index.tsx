import { StyleSheet,Text } from "react-native";
import { Activity, Airplay } from "@tamagui/lucide-icons";

import {auth} from "@/config/firebaseconfig";
import { Button, View, XGroup, XStack, YStack } from "tamagui";

export default function HomeScreen() {
  const user = auth.currentUser;
  return (
    <View  style={styles.container}>
      <YStack padding="$3" gap="$3">
        <Text className='font-bold text-red-400 text-xl'>Welcome User Email:{user?.email}</Text>
        <Button>Plain</Button>
        <Button alignSelf="center" icon={Airplay} size="$6">
          Large
        </Button>
        <XStack gap="$2" justifyContent="center">
          <Button size="$3" theme="active">
            Active
          </Button>
          <Button size="$3" variant="outlined">
            Outlined
          </Button>
        </XStack>
        <XStack gap="$2" marginHorizontal="auto">
          <Button themeInverse size="$3">
            Inverse
          </Button>
          <Button iconAfter={Activity} size="$3">
            iconAfter
          </Button>
        </XStack>
        <XGroup>
          <XGroup.Item>
            <Button width="50%" size="$2" disabled opacity={0.5}>
              disabled
            </Button>
          </XGroup.Item>

          <XGroup.Item>
            <Button width="50%" size="$2" chromeless>
              chromeless
            </Button>
          </XGroup.Item>
        </XGroup>
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