import { StyleSheet, Platform, View, Pressable } from 'react-native';
import Longdo from 'longdomap-react-native-sdk';
import { useColorScheme } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import apiTAT from '@/utils/axiosTATInstance';
import { useNavigation ,useRouter} from 'expo-router';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const [planData, setPlanData] = useState([]);
  const theme = useColorScheme();
  Longdo.apiKey = 'YOU-API-KEY';
  let map: any;
  const trip_location = [
    {
        "place_id": "5827",
        "time_location": "10:00",
        "day": "1"
    },
    {
        "place_id": "9122",
        "time_location": "13:00",
        "day": "1"
    },
    {
        "place_id": "6880",
        "time_location": "15:00",
        "day": "1"
    },
    {
        "place_id": "1316",
        "time_location": "19:00",
        "day": "1"
    }
  ]
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responses = await Promise.all(
          trip_location.map(async (location) => {
            const response = await apiTAT.get(`/places/${location.place_id}`);
            return { ...location, data: response.data }; // Merge response with trip data
          })
        );
        setPlanData(responses);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPlaces();
  }, []);
  const mapOnReady = () => { 
   let location = {lon: 100.5382, lat: 13.7649}
   let newMarker = Longdo.object('Marker', location, 
     { 
       title: 'Marker', 
       detail: 'Marker'
     })
   map.call('Overlays.add', newMarker);
  }
  //const routing = () => {
  //    let starterPoint = Longdo.object('Marker', {lon: 100.5, lat: 13.7}, { title:'Place 1',detail: 'place 1 detial' });
  //    let midPoint = Longdo.object('Marker', {lon: 100.5382, lat: 13.749}, { title:'Place 2',detail: 'place 2 detial' });
  //    let destinationPoint = Longdo.object('Marker', {lon: 100.5382, lat: 13.8649}, { title:'Place 3',detail: 'place 3 detial' });
  //    map.call('Route.add', starterPoint);
  //    map.call('Route.add', midPoint);
  //    map.call('Route.add', destinationPoint);
  //    map.call('Route.search');
  //}
  const routing = () => {
    if (!map || planData.length === 0) return; // Prevent errors if map or data is missing

    // Clear previous routes
    map.call("Route.clear");

    // Convert `planData` to Longdo markers
    const markers = planData.map((place, index) => {
      return Longdo.object(
        "Marker",
        { lon: parseFloat(place.data.longitude), lat: parseFloat(place.data.latitude) },
        { title: `Place ${index + 1}`, detail: place.data.name }
      );
    });

    // Add markers to the route
    markers.forEach(marker => map.call("Route.add", marker));

    // Search the route
    map.call("Route.search");
  };
  return (
    <View style={styles.Container}>
      <Longdo.MapView
        ref={(callback: any) => {
          map = callback;
        }}
        layer={Longdo.static("Layers", "GRAY")}
        onReady={(r: any) => {
          map.call('Ui.LayerSelector.visible', false);
          map.call('Ui.Zoombar.visible', false);
          map.call('Ui.DPad.visible', false);
          //mapOnReady();
          routing();
        }}
        // location={{ lon: 100.5382, lat: 13.7649 }}
        location={{
          lon: planData.length > 0 ? parseFloat(planData[0]?.data?.longitude) || 0 : 100.5382, 
          lat: planData.length > 0 ? parseFloat(planData[0]?.data?.latitude) || 0 : 13.7649
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
