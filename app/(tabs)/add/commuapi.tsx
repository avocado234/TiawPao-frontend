import React, { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import apiTAT from '@/utils/axiosTATInstance';
import { useEffect } from "react";
import axios from 'axios';
interface PlaceData {
  id: string;
  name: string;
  // latitude: string;
  // longitude: string;
  type: string;
}

const main = () =>
{
  const [message, setMessage] = useState('');
  const [places, setPlaces] = useState<PlaceData[]>([]); 
  const params = useLocalSearchParams();
  const {tripName,region,province,startDate,startTime,endDate,endTime,visibility,peopletype,isMust,isNature,isEcoL,isArt,isBeach,isaAdventure,isCamping,isUrban,isRural,isLux,isLocal,isFood,isShop,kids,adults} = params;
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
  const getProvinceId = (provinceName: string): number | undefined =>
  {
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
  }, [province]); // ทำงานเมื่อ `province` เปลี่ยนแป
   
}
export default main;