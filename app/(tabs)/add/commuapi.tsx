import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import api from "@/utils/axiosTATInstance";
import { useUserStore } from "@/store/useUser";
import { auth } from "@/config/firebaseconfig";
import uuid from "react-native-uuid";
interface PlaceData {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
  type: string;
  thumbnailUrl: string;
}

interface TripItem {
  ID: string;
  PlaceName: string;
  DateVisit: string;
  StartTime: string;
  EndTime: string;
  ImageURL: string;
  Latitude: string;
  Longitude: string;
}

const Main = () => {
  const { user } = useUserStore();
  const params = useLocalSearchParams();
  const {
    tripName,
    region,
    province,
    startDate,
    startTime,
    endDate,
    endTime,
    visibility,
    peopletype,
    isMust,
    isNature,
    isEcoL,
    isArt,
    isBeach,
    isaAdventure,
    isCamping,
    isUrban,
    isRural,
    isLux,
    isLocal,
    isFood,
    isShop,
    kids,
    adults,
  } = params;
  const [responseText, setResponseText] = useState<TripItem[] | null>(null);
  const [data, setData] = useState<PlaceData[]>([]);
  const [places, setPlaces] = useState<PlaceData[]>([]);
  const [prompt, setPrompt] = useState("");
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
    589: "Yasothon",
  };

  const getProvinceId = (provinceName: string): number | undefined => {
    const foundKey = Object.keys(provinceMap).find(
      (key) => provinceMap[Number(key)] === provinceName
    );
    return foundKey ? Number(foundKey) : undefined;
  };
  const Gototrip = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error("User not logged in");
      }
      
      const idToken = await currentUser.getIdToken();
      const planID = uuid.v4();
      const dataJson = {
        plan_id: planID,
        author_email: user.email,
        author_img: user.image,
        trip_name: tripName,
        region_label: region,
        province_label: province,
        province_id: getProvinceId(province?.toString() || ""),
        start_date: new Date(startDate?.toString() || "").toISOString(),
        start_time: new Date(startTime?.toString() || "").toISOString(),
        end_date: new Date(endDate?.toString() || "").toISOString(),
        end_time: new Date(endTime?.toString() || "").toISOString(),
        trip_location: responseText || [],
        visibility: visibility === "Public",
      };
      
      const response = await api.post("/user/createplan", dataJson, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        }
      });
      
      console.log("Plan created successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating trip:", error);
      throw error;
    }
  };

  const callGeminiAPI = async (newPrompt : String) => {
    try {
      const apiKey = "Hell_Nah_API";
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const payload = {
        contents: [
          {
            parts: [
              {
                text: newPrompt,
              },
            ],
          },
        ],
      };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API call failed with status ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Raw API Response:", responseData);

      const answerText =
        responseData.candidates?.[0]?.content?.parts?.[0]?.text;

      console.log("Raw Answer Text:", answerText);

      if (answerText) {
        try {
          if (answerText.includes("```json") && answerText.length < 10) {
            throw new Error("Empty JSON response");
          }
          const cleanedAnswerText = answerText
            .replace(/```json|```/g, "")
            .replace(/[\r\n]+/g, "")
            .trim();

          if (!cleanedAnswerText || cleanedAnswerText.length < 2) {
            throw new Error("Empty JSON after cleaning");
          }

          console.log("Cleaned Answer:", cleanedAnswerText);

          const jsonRegex = /(\[.*\]|\{.*\})/s;
          const jsonMatch = answerText.match(jsonRegex);

          if (jsonMatch && jsonMatch[0].length > 5) {
            const extractedJson = jsonMatch[0];
            console.log("Extracted JSON:", extractedJson);
            try {
              const answer = JSON.parse(extractedJson);
              setResponseText(answer);
            } catch (innerError) {
              console.error("Error parsing extracted JSON:", innerError);
              setResponseText(null);
            }
          } else {
            try {
              if (
                cleanedAnswerText.startsWith("[") ||
                cleanedAnswerText.startsWith("{")
              ) {
                const answer = JSON.parse(cleanedAnswerText);
                setResponseText(answer);
              } else {
                throw new Error("Not valid JSON format");
              }
            } catch (jsonError) {
              console.error("JSON Parse Error:", jsonError);
              setResponseText(null);
            }
          }
        } catch (parseError) {
          console.error("Parse Error:", parseError);
          console.error("Failed text:", answerText);
          setResponseText(null);
        }
      } else {
        console.error("Response structure:", responseData);
        const parts = responseData.candidates?.[0]?.content?.parts;
        if (parts && Array.isArray(parts) && parts.length > 0) {
          try {
            let jsonData = null;

            for (const part of parts) {
              if (part.text) {
                const cleaned = part.text.replace(/```json|```/g, "").trim();
                jsonData = JSON.parse(cleaned);
                break;
              }
            }
            if (jsonData) {
              setResponseText(jsonData);
            } else {
              setResponseText(null);
            }
          } catch (e) {
            console.error("Failed to parse parts:", e);
            setResponseText(null);
          }
        } else {
          setResponseText(null);
        }
      }
    } catch (error) {
      console.error("API Error:", error);
      setResponseText(null);
    }
  };
  useEffect(() => {
    const handleFetchTATData = async () => {
      if (!province) return;

      console.log("Province:", province);
      const provinceId = getProvinceId(province.toString());
      console.log("Province ID:", provinceId);

      if (!provinceId) {
        console.error("Province ID not found!");
        return;
      }

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
          setData(newPlaces);
          let vibes = "";
          if (isMust) vibes += "must see attraction,";
          if (isNature) vibes += "nature,";
          if (isEcoL) vibes += "ecotourism,";
          if (isArt) vibes += "art & theater,";
          if (isBeach) vibes += "beach,";
          if (isaAdventure) vibes += "adventure,";
          if (isCamping) vibes += "camping,";
          if (isUrban) vibes += "urban,";
          if (isRural) vibes += "rural,";
          if (isLux) vibes += "luxury,";
          if (isLocal) vibes += "local culture,";
          if (isFood) vibes += "foodie,";
          if (isShop) vibes += "shopping,";
          vibes = vibes.slice(0, -1);
          const newPrompt = `You are a travel planning consultant. Your task is to create a travel trip to ${province} from ${startDate} to ${endDate}, ${startTime} to ${endTime}. The traveler go to ${region} , and the trip is for ${peopletype} That trip is need vibes is ${vibes}  and have ${kids} kids and ${adults} adults in this trip. Your response must be in JSON format and should include the following details value with: ID,PlaceName,DateVisit,StartTime,EndTime,ImageURL,Latitude,Longitude The data must be sourced from My resource. If any required information is unavailable, you may omit it. resource is ${JSON.stringify(
            newPlaces
          )} the answer must not have "/","/n", "\n","\" using "," insthead (set text more likely JSON), Example Answer: [{"ID": "1","PlaceName": "Bang Saen Beach","DateVisit": "14/03/2025","StartTime": "10:00","EndTime": "16:00","ImageURL": "https://tatapi.tourismthailand.org/tatfs/Image/Content/Upload/Item/Item_20170825_150824_4518.JPG","Latitude": "13.2842","Longitude": "100.9195" }]`;

          setPrompt(newPrompt);

          setTimeout(() => {
            callGeminiAPI(newPrompt);
          }, 100); 
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
    if (
      responseText &&
      Array.isArray(responseText) &&
      responseText.length > 0
    ) {
      console.log("Result ", responseText);
    }
  }, [responseText]);

  return null;
};

export default Main;
