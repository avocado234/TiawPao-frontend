import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import apiTAT from '@/utils/axiosTATInstance';

interface PlaceData {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
  type: string;
}

const MergedComponent = () => {
  const [prompt, setPrompt] = useState(' Plan a 3-day trip to Chonburi from April 14-17, 2025, starting each day from 8:00 AM to 6:00 PM, and traveling solo. The types of activities should include beach, camping, and shopping. If any of these activities are not suitable, feel free to exclude them from the schedule. Additionally, all locations must be in English, and the information should be based on the TAT API. Finally, please return the response in JSON format with the location names and times, or any adjustments that you think are appropriate.Here’s an example of the response I’m expecting: only{ "schedule": [ { "location": "Pattaya Beach", "start_time": "2025-04-14T08:00:00", "end_time": "2025-04-14T12:00:00" }, { "location": "Jomtien Beach", "start_time": "2025-04-14T13:00:00", "end_time": "2025-04-14T17:00:00" }, { "location": "Central Festival Pattaya", "start_time": "2025-04-14T17:30:00", "end_time": "2025-04-14T20:00:00" } ] }"');
  const [responseText, setResponseText] = useState('');
  const [places, setPlaces] = useState<PlaceData[]>([]);

  const params = useLocalSearchParams();
  const {
    tripName,region,province,startDate,startTime,endDate,endTime,visibility,peopletype,isMust,isNature,isEcoL,isArt,isBeach,isaAdventure,isCamping,isUrban,isRural,isLux,isLocal,isFood,isShop,kids,adults,
  } = params;

  const provinceMap: Record<number, string> = {
    571: "Amnat Charoen",
    218: "Ang Thong",
    219: "Bangkok",
    590: "Bueng Kan",
    572: "Buri Ram",
    220: "Chachoengsao",
    221: "Chainat",
    573: "Chaiyaphum",
    463: "Chanthaburi",
    101: "Chiang Mai",
    102: "Chiang Rai",
    464: "Chon Buri",
    343: "Chumphon",
    574: "Kalasin",
    103: "Kamphaeng Phet",
    222: "Kanchanaburi",
    575: "Khon Kaen",
    344: "Krabi",
    104: "Lampang",
    105: "Lamphun",
    576: "Loei",
    223: "Lop Buri",
    106: "Mae Hong Son",
    577: "Maha Sarakham",
    578: "Mukdahan",
    224: "Nakhon Nayok",
    225: "Nakhon Pathom",
    579: "Nakhon Phanom",
    580: "Nakhon Ratchasima",
    107: "Nakhon Sawan",
    345: "Nakhon Si Thammarat",
    108: "Nan",
    346: "Narathiwat",
    581: "Nong Bua Lam Phu",
    582: "Nong Khai",
    226: "Nonthaburi",
    227: "Pathum Thani",
    347: "Pattani",
    348: "Phang Nga",
    349: "Phatthalung",
    109: "Phayao",
    110: "Phetchabun",
    228: "Phetchaburi",
    111: "Phichit",
    112: "Phitsanulok",
    229: "Phra Nakhon Si Ayutthaya",
    113: "Phrae",
    350: "Phuket",
    230: "Prachin Buri",
    231: "Prachuap Khiri Khan",
    351: "Ranong",
    232: "Ratchaburi",
    465: "Rayong",
    583: "Roi Et",
    233: "Sa Kaeo",
    584: "Sakon Nakhon",
    234: "Samut Prakan",
    235: "Samut Sakhon",
    236: "Samut Songkhram",
    237: "Saraburi",
    352: "Satun",
    585: "Si Sa Ket",
    238: "Sing Buri",
    353: "Songkhla",
    114: "Sukhothai",
    239: "Suphan Buri",
    354: "Surat Thani",
    586: "Surin",
    115: "Tak",
    355: "Trang",
    466: "Trat",
    587: "Ubon Ratchathani",
    588: "Udon Thani",
    116: "Uthai Thani",
    117: "Uttaradit",
    356: "Yala",
    589: "Yasothon"
  };

  const getProvinceId = (provinceName: string): number | undefined => {
    const foundKey = Object.keys(provinceMap).find(key => provinceMap[Number(key)] === provinceName);
    return foundKey ? Number(foundKey) : undefined;
  };

  useEffect(() => {
    const handleFetchTATData = async () => {
      if (!province) return;

      const provinceId = getProvinceId(province.toString());
      console.log("Province ID:", provinceId);

      if (!provinceId) {
        console.error("Province ID not found!");
        return;
      }

      try {
        const response = await apiTAT.get(
          `https://tatdataapi.io/api/v2/places?province_id=${provinceId}&sha_flag=no&limit=300&updated_at=2024-03-01&has_name=true&has_thumbnail=true`
        );

        if (response.data?.data?.length > 0) {
          const newPlaces = response.data.data.map((place: any) => ({
            id: place.placeId,
            name: place.name,
            latitude: place.latitude,
            longitude: place.longitude,
            type: place.category.name,
          }));

          setPlaces(newPlaces);
          console.log("Place Data:", newPlaces.map((place: any) => ({ name: place.name, id: place.id })));
        } else {
          console.warn("No place data found!");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    handleFetchTATData();
  }, [province]);

  const callGeminiAPI = async () => {
    try {
      const apiKey = 'Hell_Nah_API'; 
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const payload = {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API call failed with status ${response.status}`);
      }

      const data = await response.json();
      setResponseText(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
      setResponseText('Error: ');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Gemini API Example</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter text prompt"
        value={prompt}
        onChangeText={setPrompt}
      />
      <Button title="Generate Content" onPress={callGeminiAPI} />
      <Text style={styles.response}>{responseText}</Text>
      <View style={styles.placesContainer}>
        <Text style={styles.subtitle}>Places Data</Text>
        {places.map((place) => (
          <View key={place.id} style={styles.placeItem}>
            <Text style={styles.placeName}>{place.name}</Text>
            <Text>{`Lat: ${place.latitude}, Lon: ${place.longitude}`}</Text>
            <Text>{`Type: ${place.type}`}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 4,
  },
  response: {
    marginTop: 20,
    fontSize: 14,
    fontFamily: 'monospace',
  },
  placesContainer: {
    marginTop: 30,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  placeItem: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
  },
  placeName: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default MergedComponent;
