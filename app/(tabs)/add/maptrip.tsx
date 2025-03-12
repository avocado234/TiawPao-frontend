import { StyleSheet, Platform, View, Pressable, ScrollView, Text } from 'react-native';
import Longdo from 'longdomap-react-native-sdk';
import { useColorScheme } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Accordion, YStack } from 'tamagui';
import api from '@/utils/axiosInstance';

// Define the TripLocation interface inline
interface TripLocation {
  place_id: string;
  place_label: string;
  categorie_label: string;
  introduction: string;
  thumbnail_url: string;
  latitude: string;
  longitude: string; // Note: Adjust to "longitude" if desired
  time_location: string;
  day: string;
}

export default function HomeScreen() {
  const params = useLocalSearchParams();
  const planid = params.planID as string;
  const navigation = useNavigation();
  const router = useRouter();
  const theme = useColorScheme();

  // State for TripLocation, typed as an array of TripLocation objects
  const [trip_location, setTripLocation] = useState<TripLocation[]>([]);
  const [groupedTrips, setGroupedTrips] = useState<{ [key: string]: TripLocation[] }>({});
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
  const [cursorLatitude, setCursorLatitude] = useState<number>(0.0);
  const [cursorLongitude, setCursorLongitude] = useState<number>(0.0);
  const [isList, setIsList] = useState<boolean>(false);

  const toggleSection = (day: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const getTriplocation = async () => {
    try {
      const res_location = await api.get(`/plan/gettriplocation/${planid}`);
      console.log(res_location.data);

      // Assuming API returns an object with a property "trip_location" that is an array
      // If API returns the array directly, use res_location.data instead.
      setTripLocation(res_location.data.trip_location || res_location.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTriplocation();
  }, []);

  useEffect(() => {
    // Group trips by day using the TripLocation type explicitly.
    const groupByDay = trip_location.reduce((acc: { [key: string]: TripLocation[] }, trip: TripLocation) => {
      if (!acc[trip.day]) {
        acc[trip.day] = [];
      }
      acc[trip.day].push(trip);
      return acc;
    }, {});
    setGroupedTrips(groupByDay);

    // Set initial map cursor to the first location if available
    if (trip_location.length > 0) {
      setCursorLongitude(parseFloat(trip_location[0].longitude) || 0);
      setCursorLatitude(parseFloat(trip_location[0].latitude) || 0);
    }
  }, [trip_location]);

  useEffect(() => {
    // Update cursor values when trip_location changes
    if (trip_location.length > 0) {
      setCursorLongitude(parseFloat(trip_location[0].longitude) || 100.5382);
      setCursorLatitude(parseFloat(trip_location[0].latitude) || 13.7649);
    }
    console.log(cursorLatitude, cursorLongitude);
  }, [trip_location]);

  Longdo.apiKey = 'd5359b98f595a04e169cf69c4aa1d37b';
  let map: any;

  const routing = () => {
    if (!map || trip_location.length === 0) return;
    // Clear previous routes
    map.call("Route.clear");

    // Create markers from trip_location using the defined properties.
    const markers = trip_location.map((place, index) => {
      return Longdo.object(
        "Marker",
        { lon: parseFloat(place.longitude), lat: parseFloat(place.latitude) },
        { title: `Place ${index + 1}`, detail: place.place_label }
      );
    });
    markers.forEach((marker) => map.call("Route.add", marker));
    map.call("Route.search");
  };

  const toggleList = () => {
    setIsList(!isList);
    console.log(isList);
  };

  return (
    <View style={styles.Container}>
      <View style={[{ width: isList ? '40%' : '100%' }, styles.mapContainer]}>
        <Longdo.MapView
          ref={(callback: any) => {
            map = callback;
          }}
          layer={Longdo.static("Layers", "GRAY")}
          onReady={(r: any) => {
            map.call('Ui.LayerSelector.visible', false);
            map.call('Ui.Zoombar.visible', false);
            map.call('Ui.DPad.visible', false);
            routing();
          }}
          location={{
            lon: cursorLongitude,
            lat: cursorLatitude,
          }}
          lastView={false}
        />
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={30} color="#203B82" />
        </Pressable>
        <Pressable onPress={toggleList} style={[{ backgroundColor: isList ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.7)' }, styles.listButton]}>
          <MaterialIcons name="list" size={30} color="#203B82" />
        </Pressable>
      </View>
      <ScrollView style={styles.infoContainer}>
        <Accordion type="multiple">
          {Object.keys(groupedTrips).map((day) => (
            <Accordion.Item key={day} value={day}>
              <Accordion.Trigger onPress={() => toggleSection(day)}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text>Places in Day {parseInt(day)+1}</Text>
                  <MaterialIcons name={openSections[day] ? "arrow-drop-down" : "arrow-drop-up"} size={25} />
                </View>
              </Accordion.Trigger>
              <Accordion.Content>
                <YStack marginVertical={2}>
                  {groupedTrips[day].map((place: TripLocation) => (
                    <Pressable
                      key={place.place_id}
                      onPress={() => {
                        setCursorLongitude(parseFloat(place.longitude) || 0);
                        setCursorLatitude(parseFloat(place.latitude) || 0);
                      }}
                    >
                      <YStack backgroundColor="#203B82" paddingVertical={15} margin={2} gap={2}>
                        <Text style={{ color: "white", textAlign: 'center', fontSize: 18 }}>
                          {place.place_label}
                        </Text>
                        <Text style={{ color: "white", fontSize: 10, textAlign: 'center' }}>
                          {place.time_location}
                        </Text>
                      </YStack>
                    </Pressable>
                  ))}
                </YStack>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    marginTop: Platform.OS === 'ios' ? 55 : 0,
    flexDirection: 'row',
    width: "100%",
    height: "100%",
    backgroundColor: '#fff',
  },
  mapContainer: {
    height: "100%",
  },
  infoContainer: {
    paddingVertical: 30,
    width: "60%",
    height: "100%",
    padding: 10,
    backgroundColor: "#f8f8f8",
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
  listButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 125 : 95,
    left: 10,
    zIndex: 10,
    padding: 8,
    borderRadius: 20,
  },
});
