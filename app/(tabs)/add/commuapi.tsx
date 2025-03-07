import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import api from '@/utils/axiosTATInstance';
import { auth } from '@/config/firebaseconfig';
import uuid from 'react-native-uuid';
import { useUserStore } from '@/store/useUser';


interface PlaceData {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
  type: string;
  thumbnailUrl: string;
}

const MergedComponent = () => {
  const { user } = useUserStore();
  const params = useLocalSearchParams();
  const { tripName, region, province, startDate, startTime, endDate, endTime, visibility, peopletype, isMust, isNature, isEcoL, isArt, isBeach, isaAdventure, isCamping, isUrban, isRural, isLux, isLocal, isFood, isShop, kids, adults, } = params;
  const [prompt, setPrompt] = useState(' Plan a 3-day trip to Chonburi from April 14-17, 2025, starting each day from 8:00 AM to 6:00 PM, and traveling solo. The types of activities should include beach, camping, and shopping. If any of these activities are not suitable, feel free to exclude them from the schedule. Additionally, all locations must be in English, and the information should be based on the TAT API. Finally, please return the response in JSON format with the location names and times, or any adjustments that you think are appropriate.Here’s an example of the response I’m expecting: only{ "schedule": [ { "location": "Pattaya Beach", "start_time": "2025-04-14T08:00:00", "end_time": "2025-04-14T12:00:00" }, { "location": "Jomtien Beach", "start_time": "2025-04-14T13:00:00", "end_time": "2025-04-14T17:00:00" }, { "location": "Central Festival Pattaya", "start_time": "2025-04-14T17:30:00", "end_time": "2025-04-14T20:00:00" } ] }"');
  const [responseText, setResponseText] = useState('');
  const [data, setData] = useState<PlaceData[]>([]);
  const [places, setPlaces] = useState<PlaceData[]>([]);

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

    console.log("Province:", province); 

    const provinceId = getProvinceId(province.toString());
    console.log("Province ID:", provinceId);

    try {
      const response = await api.get(
        `https://tatdataapi.io/api/v2/places?province_id=${provinceId}&limit=200&sort_by=thumbnailUrl&status=true&has_name=true&has_thumbnail=true`
      );

      if (response.data?.data?.length > 0) {
        const newPlaces = response.data.data.map((place: any) => ({
          id: place.placeId,
          name: place.name,
          latitude: place.latitude,
          longitude: place.longitude,
          thumbnailUrl: place.thumbnailUrl,
          type: place.category.name,
        }));

        setPlaces(newPlaces);
        //console.log("Place Data:", newPlaces.map((place: any) => ({ id: place.id, name: place.name, thumbnailUrl: place.thumbnailUrl })));
      } else {
        console.warn("No place data found!");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  handleFetchTATData();
}, [province]);


  useEffect(() => {
  setData(places);
  }, [places]);
  

  useEffect(() => {
    callGeminiAPI();
  }, []); // Add this useEffect to call the API when the component mounts

  const callGeminiAPI = async () => {
    try {
      const apiKey = 'Hell Nah'; 
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



  console.log("Data:", data);
  console.log("Response Text:", responseText);
  return null;
};

export default MergedComponent;