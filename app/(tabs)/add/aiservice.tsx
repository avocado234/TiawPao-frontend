import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, Text, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import apiTAT from "@/utils/axiosTATInstance";
import api from "@/utils/axiosInstance";

import { useUserStore } from "@/store/useUser";
import { auth } from "@/config/firebaseconfig";
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from "@/components/ThemedView";

interface PlaceData {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
  thumbnailUrl: string;
  type: string;
}

interface TripItem {
  place_id: string;
  introduction: string ;
  place_label: string;
  dayVisit: string;
  startTime: string;
  endTime: string;
  thumbnail_url: string;
  type: string;
  latitude: string;
  longitude: string;
}

const Main = () => {
  const router = useRouter();
 const { addUserPlanId, user } = useUserStore();
  const params = useLocalSearchParams();
  

  const {
    planID,
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
    isEco,
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 
  const provinceMap: Record<number, string> = {
    571: "Amnat Charoen", 218: "Ang Thong", 219: "Bangkok", 590: "Bueng Kan",
    572: "Buri Ram", 220: "Chachoengsao", 221: "Chainat", 573: "Chaiyaphum",
    463: "Chanthaburi", 101: "Chiang Mai", 102: "Chiang Rai", 464: "Chonburi",
    343: "Chumphon", 574: "Kalasin", 103: "Kamphaeng Phet", 222: "Kanchanaburi",
    575: "Khon Kaen", 344: "Krabi", 104: "Lampang", 105: "Lamphun", 
    576: "Loei", 223: "Lop Buri", 106: "Mae Hong Son", 577: "Maha Sarakham",
    578: "Mukdahan", 224: "Nakhon Nayok", 225: "Nakhon Pathom", 579: "Nakhon Phanom",
    580: "Nakhon Ratchasima", 107: "Nakhon Sawan", 345: "Nakhon Si Thammarat",
    108: "Nan", 346: "Narathiwat", 581: "Nong Bua Lam Phu", 582: "Nong Khai",
    226: "Nonthaburi", 227: "Pathum Thani", 347: "Pattani", 348: "Phang Nga",
    349: "Phatthalung", 109: "Phayao", 110: "Phetchabun", 228: "Phetchaburi",
    111: "Phichit", 112: "Phitsanulok", 229: "Phra Nakhon Si Ayutthaya",
    113: "Phrae", 350: "Phuket", 230: "Prachin Buri", 231: "Prachuap Khiri Khan",
    351: "Ranong", 232: "Ratchaburi", 465: "Rayong", 583: "Roi Et",
    233: "Sa Kaeo", 584: "Sakon Nakhon", 234: "Samut Prakan", 235: "Samut Sakhon",
    236: "Samut Songkhram", 237: "Saraburi", 352: "Satun", 585: "Si Sa Ket",
    238: "Sing Buri", 353: "Songkhla", 114: "Sukhothai", 239: "Suphan Buri",
    354: "Surat Thani", 586: "Surin", 115: "Tak", 355: "Trang", 466: "Trat",
    587: "Ubon Ratchathani", 588: "Udon Thani", 116: "Uthai Thani", 117: "Uttaradit",
    356: "Yala", 589: "Yasothon"
  };

  const getProvinceId = (provinceName: string): number | undefined => {
    const foundKey = Object.keys(provinceMap).find(
      (key) => provinceMap[Number(key)] === provinceName
    );
    return foundKey ? Number(foundKey) : undefined;
  };

  // const Datatest = () => {
  //   console.log("Using mock data instead of Gemini API");
  //     const mockData = [
  //     {
  //       "place_id": "P03-01",
  //       "place_label": "Grand Palace",
  //       "dateVisit": "15/03/2025",
  //       "startTime": "09:00",
  //       "endTime": "12:00", 
  //       "thumbnail_url": "https://tatapi.tourismthailand.org/tatfs/Image/CustomPOI/Picture/P03-01.jpeg",
  //       "latitude": "13.7500",
  //       "longitude": "100.4910"
  //     },
  //     {
  //       "place_id": "P03-02",
  //       "place_label": "Wat Arun",
  //       "dateVisit": "15/03/2025",
  //       "startTime": "14:00",
  //       "endTime": "16:00",
  //       "thumbnail_url": "https://tatapi.tourismthailand.org/tatfs/Image/CustomPOI/Picture/P03-02.jpeg",
  //       "latitude": "13.7437",
  //       "longitude": "100.4892"
  //     },
  //     {
  //       "place_id": "P03-03",
  //       "place_label": "Chatuchak Weekend Market",
  //       "dateVisit": "16/03/2025",
  //       "startTime": "10:00",
  //       "endTime": "15:00",
  //       "thumbnail_url": "https://tatapi.tourismthailand.org/tatfs/Image/CustomPOI/Picture/P03-03.jpeg",
  //       "latitude": "13.7996",
  //       "longitude": "100.5403"
  //     }
  //   ];
    
  //   setResponseText(mockData);
  //   return mockData;
  // };
  const uploadTripLocations = async () => {
  if (!responseText || !Array.isArray(responseText) || responseText.length === 0) {
    console.error("No trip locations to upload");
    return false;
  }

  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("User not logged in");
    }

    const idToken = await currentUser.getIdToken();
    console.log(`Uploading ${responseText.length} locations to server for plan ${planID}`);

    for (const location of responseText) {
      const day = parseInt(location.dayVisit, 10);
      
  
      const requestBody = {
        place_id: location.place_id,
        place_label: location.place_label,
        categorie_label: location.type ,
        introduction: location.introduction,
        thumbnail_url: location.thumbnail_url,
        latitude: location.latitude.toString(),
        longtitude: location.longitude.toString(),
        time_location: location.startTime,
        day: day.toString(),
      };
      
      console.log(`Adding location: ${location.place_label}`);
      console.log("planID IN AI GEN:", planID);
      const response = await api.post(
        `/plan/addtriplocation/${planID}`,
        requestBody,
        {
          headers: { 
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      const formData = new FormData();
      const value = Array.isArray(planID) ? planID.join(',') : planID;
      formData.append("userplan_id", value);

      await api.put(`/user/updateuserplan/${user.email}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${idToken}`
        }
     });



      console.log(`Location ${location.place_label} added, status: ${response.status}`);
    }

    console.log("All locations uploaded successfully");
    return true;
  } catch (error) {
    console.error("Error uploading trip locations:", error);
    setError("Failed to upload trip locations to server");
    return false;
  }
};
  const goToTripManually = async () => {
  try {
    console.log("Processing AI results before navigation...");
    
    
    const uploaded = await uploadTripLocations();
    
    if (uploaded) {
      console.log("Locations uploaded successfully, navigating to trip manually page");
    } else {
      console.log("Failed to upload some locations, but continuing to trip manually page");
    }
    
    
    const aiResultsJSON = JSON.stringify(responseText);

    router.replace({
      pathname: "/(tabs)/add/tripmanually",
      params: {
        planID: planID,
        aiResults: aiResultsJSON,
        fromAI: "true",
        uploaded: uploaded ? "true" : "false"
      }
    });

    setLoading(false);
  } catch (error) {
    console.error("Error navigating to trip manually:", error);
    setError("Failed to navigate to trip page");
    setLoading(false);
  }
};

  const callGeminiAPI = async (newPrompt: string) => {
    try {
     // return Datatest();
      const apiKey = "AIzaSyDu6ozTXaX_PFkamSwrF3uDWFNWJMp-ZeI";
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
      //console.log("Raw API Response:", responseData);

      const answerText =
        responseData.candidates?.[0]?.content?.parts?.[0]?.text;

    //  console.log("Raw Answer Text:", answerText);

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
           // console.log("Extracted JSON:", extractedJson);
            try {
              const answer = JSON.parse(extractedJson);
              setResponseText(answer);
              return answer;
            } catch (innerError) {
              console.error("Error parsing extracted JSON:", innerError);
              setResponseText(null);
              setError("Failed to parse AI response");
              setLoading(false);
              return null;
            }
          } else {
            try {
              const answer = JSON.parse(cleanedAnswerText);
              setResponseText(answer);
              return answer;
            } catch (jsonError) {
              console.error("Error parsing cleaned JSON:", jsonError);
              setResponseText(null);
              setError("Failed to parse AI response");
              setLoading(false);
              return null;
            }
          }
        } catch (parseError) {
          console.error("Parse Error:", parseError);
          setError("Failed to parse AI response");
          setLoading(false);
          return null;
        }
      } else {
        setError("No response from AI");
        setLoading(false);
        return null;
      }
    } catch (error) {
      console.error("API Error:", error);
      setError("Failed to connect to AI service");
      setLoading(false);
      return null;
    }
  };

 useEffect(() => {
    const fetchData = async () => {
      if (!planID) {
        console.error("Missing planID in params");
        setError("Plan ID is missing");
        setLoading(false);
        return;
      }
      
      if (!province) {
        setError("Province information is missing");
        setLoading(false);
        return;
      }

      console.log("Province:", province);
      const provinceId = getProvinceId(province.toString());
      console.log("Province ID:", provinceId);

      if (!provinceId) {
        setError("Province ID not found!");
        setLoading(false);
        return;
      }

      try {
        const response = await apiTAT.get(
          `https://tatdataapi.io/api/v2/places?province_id=${provinceId}&limit=200&sort_by=thumbnailUrl&status=true&has_name=true&has_thumbnail=true`
        );

        if (response.data?.data?.length > 0) {
          const newPlaces = response.data.data.map((place: any) => ({
            id: place.placeId,
            name: place.name,
            latitude: place.latitude,
            longitude: place.longitude,
            thumbnailUrl: place.thumbnailUrl,
            introduction: place.introduction || "No introduction available", 
            type: place.category.name || "No Type available",
          }));

          setPlaces(newPlaces);
          setData(newPlaces);

          let vibes = "";
          if (isMust === "true") vibes += "must see attraction,";
          if (isNature === "true") vibes += "nature,";
          if (isEco === "true") vibes += "ecotourism,";
          if (isArt === "true") vibes += "art & theater,";
          if (isBeach === "true") vibes += "beach,";
          if (isaAdventure === "true") vibes += "adventure,";
          if (isCamping === "true") vibes += "camping,";
          if (isUrban === "true") vibes += "urban,";
          if (isRural === "true") vibes += "rural,";
          if (isLux === "true") vibes += "luxury,";
          if (isLocal === "true") vibes += "local culture,";
          if (isFood === "true") vibes += "foodie,";
          if (isShop === "true") vibes += "shopping,";
          vibes = vibes.slice(0, -1); 

         
        const newPrompt = `You are a travel planning consultant. Your task is to create a travel trip to ${province} from ${startDate} to ${endDate}, time is ${startTime} to ${endTime}. The traveler go to ${region}, and the trip is for ${peopletype}. 
        Important:
            - Create a travel itinerary for the selected ${province}. I want to make the most of my trip.
            - Each day's itinerary **MUST start at or after ${startTime} and end no later than ${endTime}** (except for ${startDate} and ${endDate}, which have special conditions).
            - The first activity of each day **MUST** start at or after ${startTime}. Do NOT schedule any activity before this time, even if the attraction is available earlier.
            - Example: If ${startTime} is 10:00 AM, the first activity on that day must start at 10:00 AM or later. Any activity before this time should be excluded.
            - Natural attractions like beaches or parks may open early (e.g., 06:00-22:00), **but if scheduled on ${startDate}, they MUST be set to start at or after ${startTime}**.
            - On ${startDate} and during the trip, I can stay out late, but on ${endDate}, I need to finish at ${endTime}.
            - Check if ${startTime} and ${endTime} for each location are sensible based on the type of attraction. If the location cannot be visited within the specified time frame, do not include it.
            - The selected vibes for this trip are: ${vibes}. You **MUST** prioritize places that match these vibes. Each recommended location should clearly align with at least one of these selected vibes. Do not include places that don't match the requested vibes.
            - The traveler has ${adults} adults and ${kids} kids. Make sure to include kid-friendly activities and plan for additional time for breaks.
            - Ensure that the travel time between locations is reasonable. If two places are too far apart, prioritize closer attractions instead.

          Additional requirements:
            - You **MUST** include at least 2, but not more than 4, places for EACH day of the trip (from day 0 to the last day).  
              If fewer than 2 places fit within the available hours, **prioritize quality recommendations rather than forcing the number of places**.
            - Estimate travel time between locations based on their coordinates and **realistic traffic conditions**.
            - Generally, allow at least **30-45 minutes** for short-distance travel.
            - If locations are **more than 20 km apart**, estimate travel time based on road conditions (typically 1-2 hours).



          Your response must be in JSON format and should include the following details value with: place_id,place_label,dayVisit(Start with 0),startTime,endTime,thumbnail_url,latitude,longitude,type,introduction. The data must be sourced from My resource. If any required information is unavailable, you may omit it. resource is ${JSON.stringify(newPlaces)} 

          The answer must not have "/","/n", "\n","\" using "," instead (set text more likely JSON).

          Example Answer: **MUST** [{"place_id": "1","place_label": "Bang Saen Beach","dayVisit": "0","startTime": "10:00:00","endTime": "16:00:00","thumbnail_url": "https://tatapi.tourismthailand.org/tatfs/Image/Content/Upload/Item/Item_20170825_150824_4518.JPG","latitude": "13.2842","longitude": "100.9195","type": "Beach","introduction": "Bang Saen Beach is a beach town along the eastern gulf coast of Thailand."}]`;
          console.log("Calling Gemini API...");
          console.log("Prompt:", newPrompt);
         
          await callGeminiAPI(newPrompt);
        } else {
          console.error("No places found in the response");
          setError("No place data found!");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch place data");
        setLoading(false);
      }
    };

    fetchData();
  }, [province, planID]); 

  useEffect(() => {

    if (responseText && Array.isArray(responseText) && responseText.length > 0) {
      console.log("Got AI Response:", JSON.stringify(responseText, null, 2));

      setLoading(false);
      goToTripManually();
    }
  }, [responseText]);
  return (
    <ThemedView style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#203B82" />
          <ThemedText style={styles.loadingText}>
            Generating your AI travel plan...
          </ThemedText>
          <ThemedText style={styles.subText}>
            This may take a minute
          </ThemedText>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>{error}</ThemedText>
          <ThemedText 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            Go Back
          </ThemedText>
        </View>
      ) : null}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingContainer: {
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  subText: {
    fontSize: 14,
    color: "#666",
    marginTop: 10,
    textAlign: "center",
  },
  errorContainer: {
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    marginBottom: 20,
    textAlign: "center",
  },
  backButton: {
    fontSize: 16,
    color: "#10b981",
    fontWeight: "bold",
    padding: 10,
  },
});

export default Main;