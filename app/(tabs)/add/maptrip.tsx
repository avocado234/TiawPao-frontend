import { StyleSheet, Platform, View, Pressable, ScrollView, Image} from 'react-native';
import Longdo from 'longdomap-react-native-sdk';
import { useColorScheme } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import apiTAT from '@/utils/axiosTATInstance';
import { useLocalSearchParams, useNavigation ,useRouter} from 'expo-router';
import { useEffect, useState } from 'react';
import { Accordion, YStack, Button } from 'tamagui';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
import { ThemedText } from '@/components/ThemedText';
// import { TimePickerAndroid } from 'react-native';
import { Text } from 'react-native';

export default function HomeScreen() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const [isList, setIsList] = useState<boolean>(false);
  const router = useRouter();
  const [cursorLatitude,setCursorLatitude] = useState<float>(0.0);
  const [cursorLongitude,setCursorLongitude] = useState<float>(0.0);
  const theme = useColorScheme();
  const [planData, setPlanData] = useState([]);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (day: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [day]: !prev[day], // Toggle the open state
    }));
  };
  const [groupedTrips, setGroupedTrips] = useState<{ [key: string]: typeof trip_location }>(
    {}
  );

  useEffect(() => {
    // Group places by day
    const groupByDay = trip_location.reduce((acc, trip) => {
      acc[trip.day] = acc[trip.day] || [];
      acc[trip.day].push(trip);
      return acc;
    }, {} as { [key: string]: typeof trip_location });

    setGroupedTrips(groupByDay);

    // Set initial map cursor to the first location
    if (trip_location.length > 0) {
      setCursorLongitude(parseFloat(trip_location[0].longitude) || 0);
      setCursorLatitude(parseFloat(trip_location[0].latitude) || 0);
    }
  }, []);

  Longdo.apiKey = 'd5359b98f595a04e169cf69c4aa1d37b';
  let map: any;
  const trip_location = [
    {
        "place_id": "5827",
        "place_label": "Tiger Park Pattaya",
        "categorie_label": "",
        "introduction": "Tiger Park Pattaya is popular attraction for local people and travelers!",
        "thumbnail_url": "https://dmc.tatdataapi.io/assets/451a381e-f3c7-4ca8-9265-97ff1bcaa21a.png",
        "latitude": "12.87113",
        "longitude": "100.90241",
        "time_location": "10:00AM",
        "day": "1"
    },
    {
        "place_id": "9122",
        "place_label": "Siriporn Orchid Farm",
        "categorie_label": "",
        "introduction": "Tiger Park Pattaya is popular attraction for local people and travelers!",
        "thumbnail_url": "https://dmc.tatdataapi.io/assets/451a381e-f3c7-4ca8-9265-97ff1bcaa21a.png",
        "latitude": "12.97667",
        "longitude": "100.91333",
        "time_location": "13:00PM",
        "day": "1"
    },
    {
        "place_id": "1316",
        "place_label": "Wat Tai Ton Lan",
        "categorie_label": "",
        "introduction": "Tiger Park Pattaya is popular attraction for local people and travelers!",
        "thumbnail_url": "https://dmc.tatdataapi.io/assets/451a381e-f3c7-4ca8-9265-97ff1bcaa21a.png",
        "latitude": "13.49113",
        "longitude": "101.18149",
        "time_location": "15:00PM",
        "day": "2"
    }
  ]
  useEffect(() => {
    setCursorLongitude(trip_location.length > 0 ? parseFloat(trip_location[0]?.longitude) || 0 : 100.5382); 
    setCursorLatitude(trip_location.length > 0 ? parseFloat(trip_location[0]?.latitude) || 0 : 13.7649);
    console.log(cursorLatitude)
    console.log(cursorLongitude)
  },[])
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
    if (!map || trip_location.length === 0) return; // Prevent errors if map or data is missing

    // Clear previous routes
    map.call("Route.clear");

    // Convert `planData` to Longdo markers
    const markers = trip_location.map((place, index) => {
      return Longdo.object(
        "Marker",
        { lon: parseFloat(place.longitude), lat: parseFloat(place.latitude) },
        { title: `Place ${index + 1}`, detail: place.place_label }
      );
    });

    // Add markers to the route
    markers.forEach(marker => map.call("Route.add", marker));

    // Search the route
    map.call("Route.search");
  };
  const toggle = () => {setIsList(!isList);console.log(isList)};
  return (
    <View style={styles.Container}>
      <View style={[{width: isList ? '40%' : '100%'},styles.mapContainer]}>
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
          lon: cursorLongitude, 
          lat: cursorLatitude
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
      <Pressable
        onPress={toggle}
        style={[
          {backgroundColor: isList ? 'rgba(255,255,255,1)' :'rgba(255,255,255,0.7)',},
          styles.listButton]}>
        <MaterialIcons
          name="list"
          size={30}
          color='#203B82'
        />
      </Pressable>
      </View>
      <ScrollView style={styles.infoContainer}>
        <Accordion type="multiple">
          {Object.keys(groupedTrips).map((day) => (
            <Accordion.Item key={day} value={day}>
              <Accordion.Trigger onPress={() => toggleSection(day)}>
                <View className="flex flex-row justify-between items-center">
                  <Text>Places in Day {day}</Text>
                  <MaterialIcons
                    name={openSections[day] ? "arrow-drop-down" : "arrow-drop-up"}
                    size={25}
                  />
                </View>
              </Accordion.Trigger>
              <Accordion.Content>
                <YStack marginVertical={2}>
                  {groupedTrips[day].map((place) => (
                    <Pressable
                      key={place.place_id}
                      onPress={() => {
                        setCursorLongitude(parseFloat(place.longitude) || 0);
                        setCursorLatitude(parseFloat(place.latitude) || 0);
                      }}
                    >
                      <YStack backgroundColor="#203B82" paddingVertical={15} margin={2} gap={2}>
                        <Text style={{ color: "white", textAlign:'center',fontStyle:18, }}>{place.place_label}</Text>
                        <Text style={{ color: "white",fontSize:10,textAlign:'center' }}>{place.time_location}</Text>
                      </YStack>
                    </Pressable>
                  ))}
                </YStack>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>;
      </ScrollView>
   </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    marginTop: Platform.OS === 'ios' ? 55 : 0,
    flexDirection:'row',
    width:"100%",
    height:"100%",
    backgroundColor: '#fff',
  },
  mapContainer: {
    height: "100%",
  },
  infoContainer: {
    paddingVertical:30,
    width: "60%", // 25% of screen width
    height: "100%",
    padding: 10,
    backgroundColor: "#f8f8f8", // Light gray background for visibility  
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 75 : 40,
    left: 10,
    zIndex: 10,
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
  },
  placeContainer: {
    backgroundColor: '#203B82',
    paddingVertical: 10,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 20,
  },
  listButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 125 : 95,
    left: 10,
    zIndex: 10,
    padding: 8,
    borderRadius: 20,
  },
});
