import { StyleSheet, Platform, View, Pressable } from 'react-native';
import Longdo from 'longdomap-react-native-sdk';
import { useColorScheme } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

export default function HomeScreen() {
  const navigation = useNavigation();
  const theme = useColorScheme();
  Longdo.apiKey = 'd5359b98f595a04e169cf69c4aa1d37b';
  let map: any;

  return (
    <View style={styles.Container}>
      <Longdo.MapView
        ref={(callback: any) => {
          map = callback;
        }}
        onReady={(r: any) => {
          map.call('Ui.LayerSelector.visible', false);
          map.call('Ui.Zoombar.visible', false);
          map.call('Ui.DPad.visible', false);
        }}
        lastView={false}
      />
      <Pressable
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <MaterialIcons
          name="arrow-back"
          size={30}
          color='#203B82'
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    marginTop: Platform.OS === 'ios' ? 55 : 0,
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 55 : 20,
    left: 10,
    zIndex: 10,
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
  },
});
