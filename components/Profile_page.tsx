//Padding means inside box
//margin means outside box
import React, { useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react'
import { ThemedText } from "./ThemedText";
import { FontAwesome } from "@expo/vector-icons";
import { View, StyleSheet, Text, useColorScheme, TextInput, ScrollView, Alert, Pressable, Image, Platform } from 'react-native';
import { ThemedSafeAreaView } from './ThemedSafeAreaView';
import Bgelement from '@/components/Bgelement';
import Entypo from '@expo/vector-icons/Entypo';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomDateTimePicker from '@/components/CustomDateTimePicker'; // ปรับ path ให้ถูกต้องตามโปรเจคของคุณ
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from "expo-file-system";

// import DateTimePickerModal from "react-native-modal-datetime-picker";
import { XStack, YStack, Select, Card } from "tamagui";
import { Button } from 'tamagui';
import { auth } from "@/config/firebaseconfig";
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { useUserStore } from '@/store/useUser';
import { ThemedView } from './ThemedView';
import { transform } from '@babel/core';
import ThemedTextInput from './ThemedTextInput';
import api from '@/utils/axiosInstance';
const Propage = () => {
  const { user, setUserData, resetUserData } = useUserStore();
  const router = useRouter();
  const baseUrl = "http://20.187.146.79:8000"; //Azure
  const [username, setUsername] = useState<String>(user.username);
  const [firstname, setFirstname] = useState<String>(user.firstname);
  const [lastname, setLastName] = useState<String>(user.lastname);
  const [tel, setTel] = useState<String>(user.tel);
  const [gender, setGender] = useState<String>(user.gender);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date_of_birth, setDate_of_Birth] = useState<String>("");
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [dateOfBirth, setDateOfBirth] = useState(new Date(user.date_of_birth));

  const [dateString, setDateString] = useState<String>('')
  // const theme = useColorScheme();
  // const [isDark, setIsDark] = useState(theme === 'light' ? false : true);
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const year = dateOfBirth.getFullYear();
    const month = String(dateOfBirth.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(dateOfBirth.getDate()).padStart(2, '0');
    const tmp = `${year}-${month}-${day}`;
    setDate_of_Birth(tmp);
    setDateString(tmp)
  }, [dateOfBirth])

  const handleConfirm = (selectedDate: any) => {
    // If user dismisses the picker (Android), selectedDate can be undefined.
    if (!selectedDate) {
      hideDatePicker();
      return;
    }

    const today = new Date();
    if (selectedDate > today) {
      Alert.alert("Error", "Date of Birth cannot be in the future!");
      hideDatePicker();
      return;
    }
    // console.log(selectedDate);
    // setDate_of_Birth(selectedDate.toISOString().split('T')[0]);
    // console.log(date_of_birth);
    hideDatePicker();
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      setDateOfBirth(selectedDate);
    }
    if (Platform.OS === 'android') {
      setDatePickerVisibility(false);
    }
  };

  const handleUpdate = async () => {
    if (
      username !== user.username ||
      firstname !== user.firstname ||
      lastname !== user.lastname ||
      tel !== user.tel ||
      gender !== user.gender ||
      dateString !== user.dateofbirth ||
      image !== null
    ) {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          throw new Error('User not logged in');
        }

        // ดึง ID token จาก Firebase
        const idToken = await currentUser.getIdToken();
        console.log(idToken)
        console.log(user.email)
        console.log(dateString);
        let imageUrl = user.img;
        // Upload image if a new one is selected
        if (image !== null) {
            const uri = image.startsWith("file://") ? image : `file://${image}`;
            const fileInfo = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });

            const formData = new FormData();
            formData.append("image", {
              uri: image,
              name: "image.jpg",  // You can change the file extension based on the image type
              type: "image/jpeg", // Or use the appropriate MIME type for the file
            });
            try {
              console.log("Uploading image...");
              const uploadResponse = await api.post("/user/uploadImage", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });

              if (uploadResponse.status === 200) {
                imageUrl = baseUrl+uploadResponse.data.path; // Adjust based on your backend response
                console.log("Uploaded image URL:", imageUrl);
              } else {
                throw new Error("Image upload failed");
              }
            } catch (uploadError) {
              console.error("Image Upload Error:", uploadError);
              Alert.alert("Image Upload Failed", "Please try again.");
              return;
            }

        }

        const updateUser: any = await api.put(
          `/user/update/${user.email}`,
          {
            username,
            tel,
            firstname,
            lastname,
            date_of_birth,
            gender,
            image: imageUrl,
          },
          {
            headers: {
              Authorization: `Bearer ${idToken}`
            }
          }
        );


        if (updateUser.status === 201) {
          // Fetch the updated user data
          const userData: any = await api.get(`/user/getuser/${user.email}`, {
            headers: {
              Authorization: `Bearer ${idToken}`
            }
          });

          const dataUser = userData.data;
          console.log(dataUser);
          setUserData({
            username: dataUser.username,
            email: dataUser.email,
            firstname: dataUser.firstname,
            lastname: dataUser.lastname,
            date_of_birth: dataUser.date_of_birth,
            tel: dataUser.tel,
            gender: dataUser.gender,
            image: dataUser.image
          });

          Alert.alert("User updated successfully!");
        } else {
          Alert.alert("Update failed", "Please try again.");
        }
      } catch (error) {
        console.error("Update Error:", error);
        Alert.alert("Error", "Something went wrong during the update.");
      }
    }
    setImage(null);
    setIsEdit(false);
  };

  const handleCancel = ()=>  {
    setUsername(user.username);
    setFirstname(user.firstname);
    setLastName(user.lastname);
    setTel(user.tel);
    setGender(user.gender);
    setImage(null);
    setIsEdit(false);
  };
  const pickImage = async () => {
    console.log("test");
    let result = await ImagePicker.launchImageLibraryAsync({
// No permissions request is necessary for launching the image library
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      quality: 1,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (

    <View style={styles.screen}>
      <ThemedView style={styles.plane} className='flex'>
        <ThemedView style={[
          {
            backgroundColor: isDark ? "#203B82" : 'white'
          },
          styles.setting_plane,
        ]}>
          <ThemedView style={styles.detial_plane}>
            <ThemedText style={styles.headerText}>{username}</ThemedText>
            <ThemedText style={styles.subheaderText}>{user.email}</ThemedText>
            {!isEdit &&
              <Pressable
                onPress={() => { setIsEdit(true) }}
                style={[
                  // styles.edit_button,
                  isDark ? styles.edit_button_dark : styles.edit_button_light,
                ]}
              >
                <Text style={[{ color: isDark ? '#203B82' : 'white' }]} >Edit Profile</Text>
              </Pressable>
            }
            <View className="w-[90%] pb-2">
              <ThemedText style={styles.input_header_text}>Username</ThemedText>
              <ThemedTextInput
                style={[styles.input_data, { color: isDark ? '#203B82' : 'black', }]}
                value={username}
                onChangeText={setUsername}
                autoComplete="username"
                editable={isEdit}
              />
            </View>
            <View className="w-[90%] pb-2">
              <ThemedText style={styles.input_header_text}>Firstname</ThemedText>
              <ThemedTextInput
                style={[styles.input_data, { color: isDark ? '#203B82' : 'black', }]}
                value={firstname}
                onChangeText={setFirstname}
                autoComplete="firstname"
                editable={isEdit}
              />
            </View>
            <View className="w-[90%] pb-2">
              <ThemedText style={styles.input_header_text}>Lastname</ThemedText>
              <ThemedTextInput
                style={[styles.input_data, { color: isDark ? '#203B82' : 'black', }]}
                value={lastname}
                onChangeText={setLastName}
                autoComplete="lastname"
                editable={isEdit}
              />
            </View>
            <View className="w-[90%] pb-2">
              <ThemedText style={styles.input_header_text}>Moblie Number</ThemedText>
              <ThemedTextInput
                style={[styles.input_data, { color: isDark ? '#203B82' : 'black', }]}
                value={tel}
                onChangeText={setTel}
                autoComplete="tel"
                editable={isEdit}
              />
            </View>
            <View className="w-[90%] pb-4 flex flex-row justify-between">
              <View className='w-[48%]'>
                <ThemedText style={styles.input_header_text}>Gender</ThemedText>
                <ThemedTextInput
                  style={[styles.input_data, { color: isDark ? '#203B82' : 'black', }]}
                  value={gender}
                  onChangeText={setGender}
                  className='text-center'
                  autoComplete="sex"
                  editable={isEdit}
                />
              </View>
              <View className='w-[48%]'>
                <ThemedText style={styles.input_header_text}>Date of Birth</ThemedText>
                {isEdit &&
                  <ThemedText
                    onPress={() => { setDatePickerVisibility(true) }}
                    style={[
                      styles.input_data_date,
                      {
                        borderColor: isDark ? '#5680EC' : 'black',
                        color: isDark ? '#203B82' : 'black',
                      }
                    ]}
                  >{dateOfBirth.toLocaleDateString()}</ThemedText>
                }
                {!isEdit &&
                  <ThemedText
                    style={[
                      styles.input_data_date,
                      {
                        borderColor: isDark ? '#5680EC' : 'black',
                        color: isDark ? '#203B82' : 'black',
                      }
                    ]}
                  >{dateOfBirth.toLocaleDateString()}</ThemedText>
                }

              </View>
            </View>
            {!isEdit &&
              <Pressable style={styles.logout_button}
                onPress={() => { auth.signOut() }}
              >
                <Text style={[{ color: isDark ? 'white' : 'white' }]} >Logout</Text>
              </Pressable>
            }
            {isEdit &&
              <ThemedView className="w-[90%]" style={{ backgroundColor: 'transparent' }}>
              <ThemedView className='w-[100%] flex flex-row justify-between pb-4' style={{ backgroundColor: 'transparent' }}>
                <Pressable style={styles.save_button}
                  onPress={handleUpdate}
                >
                  <Text style={[{ color: isDark ? 'white' : 'white' }]} >Save</Text>
                </Pressable>
                <Pressable style={styles.cancel_button}
                  onPress={ handleCancel }
                >
                  <Text style={[{ color: isDark ? 'white' : 'white' }]} >Cancel</Text>
                </Pressable>
              </ThemedView>
              <Pressable style={[{backgroundColor: isDark ? 'white' : '#203B82'},styles.reset_button]}
                onPress={()=>{router.push("/(tabs)/profile/resetpassword")}}
              >
                <Text style={[{ color: isDark ? '#203B82' : 'white' }]} >Reset Password</Text>
              </Pressable>

              </ThemedView>
            }
          </ThemedView>
        </ThemedView>
        { isEdit && <Pressable className="absolute"  onPress={pickImage} style={styles.avatar} > 
        <View>
          <Image source={{ uri: image==null?user.image:image}} 
            style={{  width: 100,
            height: 100,
            borderRadius: 50,
            position: 'absolute',
            left: '50%',
            top: '5%',
            transform: [{ translateX: -50 }],
          }} />
          <MaterialIcons
            name="camera-alt"
            size={80}
            style={{transform:[{translateX:10},{translateY:15}],opacity:0.5}}
            color='#203B82'
          />
        </View>
        </Pressable>}
        { !isEdit && <Image className="absolute" source={{ uri: user.image }} style={styles.avatar} />}
      </ThemedView>
      <CustomDateTimePicker
        visible={isDatePickerVisible}
        mode="date"
        value={dateOfBirth}
        onChange={onChangeDate}
        onClose={() => setDatePickerVisibility(false)}
      />
    </View>
  )
};

export default Propage;
const styles = StyleSheet.create({
  screen: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 30,
    paddingVertical: 60,
    // backgroundColor: "red",
    backgroundColor: 'transparent',

  },
  plane: {
    width: '100%',
    height: '100%',
    flex: 2,
    backgroundColor: 'transparent',
    // backgroundColor: "yellow",

  },
  setting_plane: {
    width: '100%',
    height: '95%',
    // backgroundColor: "white",
    marginTop: '5%',
    borderRadius: 30,
  },
  detial_plane: {
    marginTop: '20%',
    width: '100%',
    height: '90%',
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 30,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  subheaderText: {
    fontSize: 14,
    fontWeight: 'medium',
    textAlign: 'center',
    marginBottom: 6,

  },
  input_header_text: {
    fontSize: 18,
    paddingBottom: 5,
  },
  input_data: {
    fontSize: 16,
    borderWidth: 2,
    borderStyle: 'solid',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 30,
  },
  input_data_date: {
    textAlign: 'center',
    fontSize: 16,
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  edit_button_light: {
    width: 140,
    height: 36,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#203B82',
    marginBottom: 2,
  },
  edit_button_dark: {
    width: 140,
    height: 36,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    marginBottom: 2,
  },
  logout_button: {
    width: '90%',
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 30,
    marginBottom: 5,
  },
  save_button: {
    width: '48%',
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2AC365',
    borderRadius: 30,
    marginBottom: 5,
  },
  cancel_button: {
    width: '48%',
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 30,
    marginBottom: 5,
  },
  reset_button: {
    width: '100%',
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 5,
  },
  filterContainer: {
    overflow: 'hidden',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
    left: '50%',
    top: '5%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  scrollContentContainer: {
    padding: 10,
    paddingBottom: 120,
  },
});

