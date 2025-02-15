//Padding means inside box
//margin means outside box
import React from 'react';
import { useState } from 'react'
import { ThemedText } from "./ThemedText";
import { FontAwesome } from "@expo/vector-icons";
import { View, StyleSheet, Text, useColorScheme, TextInput,ScrollView ,Alert,Pressable} from 'react-native';
import { ThemedSafeAreaView } from './ThemedSafeAreaView';
import Entypo from '@expo/vector-icons/Entypo';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { XStack, YStack, Select, Card } from "tamagui";
import { Button } from 'tamagui';
import {auth} from "@/config/firebaseconfig";
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';
const Propage = () => {
  //Set Value to UpdateUsername
  const theme = useColorScheme();
  const [get_visible, set_visible] = useState(true);
  const [get_bool, set_bool] = useState(false);
  const [get_edit, set_edit] = useState(false);
 
  //Username  & Temp user_name
  const [user_name, set_user_name] = useState('JameMc');
  const [temp_user_name, temp_set_user_name] = useState(user_name);

  //firstname & Temp first_name
  const [first_name, set_first_name] = useState('Jame');
  const [temp_first_name, temp_set_first_name] = useState(first_name);

  //lastname & temp last_name
  const [last_name, set_last_name] = useState('Macdonnell');
  const [temp_last_name, temp_set_last_name] = useState(last_name);

  //email & temp email
  const [email, set_email] = useState('jamemc@gmail.com');
  const [temp_email, temp_set_email] = useState(email);

  //password & temp pass
  const [password, set_password] = useState('123456789');
  const [temp_password, temp_set_password] = useState(password);

  //mobile & temp mobile
  const [mobile, set_mobile] = useState('0812345678');
  const [temp_mobile, temp_set_mobile] = useState(mobile);

  //date & temp date
  const [date, set_date] = useState(new Date(2003, 2, 17));
  const [show_date, set_show_date] = useState(false);
  
  const [temp_date, temp_set_date] = useState(date);

  //gender & temp gender
  const [gener_list, set_gender_list] = useState(
  [
    { label: "Male", value: "Male" },
    { label: "Femail", value: "Femail" },
    { label: "Others", value: "Others" }
  ]); 
  const [gender, set_gender] = useState("Male");
  const [temp_gender, temp_set_gender] = useState(gender);


  const Approved = () => {
    console.log("flow this");
    set_user_name(temp_user_name);
    set_first_name(temp_first_name);
    set_last_name(temp_last_name);
    set_gender(temp_gender);
    set_date(temp_date);
    set_mobile(temp_mobile);
    set_email(temp_email);
    set_password(temp_password);

    set_bool(true);
    set_visible(true);
    set_edit(false);

  }
  const Noapproved = () => {
    temp_set_user_name(user_name);
    temp_set_first_name(first_name);
    temp_set_last_name(last_name);
    temp_set_gender(gender);
    temp_set_date(date);
    temp_set_mobile(mobile);
    temp_set_email(email);
    temp_set_password(password);
    set_edit(false);
    set_bool(false);
    set_visible(true);
  }

  const get_date = (date:Date) => {
    return date.toLocaleDateString('en-EN'); 
  };
  const router = useRouter();
  const handelSingOut = async() => {
      try {
        await signOut(auth).then(() => {
          router.replace('/signin')
        });
        
      } catch (error) {
        console.log(error);
      }
  };

  const date_confirm = (selectedDate :Date) => { 
    temp_set_date(selectedDate); 
    
    set_show_date(false); 
  };
  const date_cancle = () => {
    temp_set_date(date); 
    set_show_date(false); 
  };


  const showDatePicker = () => {
    if(get_edit)
    {
      set_show_date(true); 
    }
  };

  const disition_select_gender =()=>
  {
    if(get_edit)
    {
      select_gender();
    }
  };

  const select_gender = () => {
    Alert.alert(
      "Gender", 
      "Please select Gender", 
      [
        { text: "Male", onPress: () =>    temp_set_gender('Male') },
        { text: "Female", onPress: () =>  temp_set_gender('Female') },
        { text: "Others", onPress: () =>  temp_set_gender('Others') },
        { text: "Cancle", onPress: () => console.log("No select") },

      ],
      { cancelable: true }
    );
  };


  const changed = () => {
    set_visible(false);
    set_edit(true);
  }

  //Value to Color Change when Change in theme
  let backGround_Color = '#F2F2F2';
  let Profile_Background = '#F2F2F2';
  let Font_Color = '#203B82';
  let Border_Color = 'transparent';
  let Border_Width = 0;
  //Config Color when change theme
  const placeholder_Color = theme === 'dark' ? '#red' : '#white';
  if (theme === 'dark') {
    Font_Color = '#F2F2F2';
    backGround_Color = '#203B82';
    Profile_Background = '#F2F2F2';
    Border_Color = 'white';
    Border_Width = 0;
  }
  else {
    Font_Color = '#203B82';
    backGround_Color = 'white';
    Profile_Background = '#203B82';
    Border_Color = '#203B82';
    Border_Width = 0;
  }

  return (
    
    <View style={[styles.Component_box_main, { backgroundColor: backGround_Color, borderWidth: Border_Width, borderBlockColor: Border_Color }]}>
      {/* Comment : รูปของ Kaithod*/}
      <Button style={[styles.Component_Picture_profile, { backgroundColor: Profile_Background }]}>
        <Text>Clicker</Text>
      </Button>
      <ThemedSafeAreaView color='transparnet'  >

        {/*Comment : Just Hi Traveler */}
        <View style={styles.Component_big_username}>
          <Text style={[styles.font_only_hi, { color: Font_Color }]}>Hi</Text>
          <Text style={[styles.font_show_name, { color: Font_Color }]}>{user_name}</Text>
          {get_visible && (<Button style={[styles.Component_edit_box, { backgroundColor: Border_Color }]}
            onPress={changed}
          >
            <FontAwesome name="edit" size={25} color={backGround_Color} style={{ width: 25, height: 25 }} />
          </Button>)}
        </View>

        {/*Comment : Gang button kub */}
        <View style={styles.Component_box_all_button}>
          <YStack alignItems="flex-start" width="100%" padding="10" paddingTop="-50">

            <Text style={[styles.font_upper_textinput, { color: Font_Color }]}>Username</Text>
            <TextInput style={[styles.Component_user_textinput, { borderColor: Border_Color, backgroundColor: backGround_Color, color: Font_Color }]}
              value={temp_user_name}
              onChangeText={temp_set_user_name}
              editable={get_edit}
              selectionColor={placeholder_Color}
            ></TextInput>

            <Text style={[styles.font_upper_textinput, { color: Font_Color }]}>FirstName</Text>
            <TextInput style={[styles.Component_user_textinput, { borderColor: Border_Color, backgroundColor: backGround_Color, color: Font_Color }]}
              value={temp_first_name}
              onChangeText={temp_set_first_name}
              editable={get_edit}
              selectionColor={placeholder_Color}
            ></TextInput>

            <Text style={[styles.font_upper_textinput, { color: Font_Color }]}>LastName</Text>
            <TextInput style={[styles.Component_user_textinput, { borderColor: Border_Color, backgroundColor: backGround_Color, color: Font_Color }]}
              value={temp_last_name}
              onChangeText={temp_set_last_name}
              editable={get_edit}
              selectionColor={placeholder_Color}
            ></TextInput>
            {/*Comment : Normaly ystack is Sort in Y position so, I Use View and View to Decorate Gender and Date of Birth*/}

            <View style={styles.Component_twin_inputbox}>

              <View style={styles.Compareator_Gender}>
                <Text style={[styles.font_upper_textinput, { color: Font_Color }]}>Gender</Text>
                <Button style={[styles.Component_user_textinput,{backgroundColor:backGround_Color,borderColor:Border_Color}]}
                  onPress={disition_select_gender}>
                  <Text style={[styles.font_Date_gender_inside, { color: Border_Color ,paddingLeft:10}]}>{temp_gender}</Text>
                </Button> 

  
        
              </View>

              <View style={styles.Compareator_Date}>
                <Text style={[styles.font_upper_textinput, { color: Font_Color }]}>Date of Birth</Text>
                <Button style={[styles.Component_user_textinput, { borderColor: Border_Color, backgroundColor: backGround_Color, color: Font_Color ,justifyContent: 'center', alignItems: 'center'}]}
                onPress={showDatePicker}
                >
                  <DateTimePickerModal
                   isVisible={show_date}
                    mode="date"
                    date={temp_date}
                    onConfirm={date_confirm}
                    onCancel={date_cancle} // Hide picker when canceled
                  />
                    <Text style={[styles.font_Date_gender_inside, { color: Border_Color }]}>{get_date(temp_date)}</Text>
                    <XStack style={{marginRight:-30,marginTop:-2}}>
                    <Entypo name="calendar" size={24} color={theme === 'dark' ? "#fff" : "#203B82" } />
                    </XStack>

                </Button>


              </View>

            </View>
            {/*Comment : Back to Normally YStack lol */}
            <Text style={[styles.font_upper_textinput, { color: Font_Color }]}>Mobile Number</Text>
            <TextInput style={[styles.Component_user_textinput, { borderColor: Border_Color, backgroundColor: backGround_Color, color: Font_Color }]}
              value={temp_mobile}
              onChangeText={temp_set_mobile}
              editable={get_edit}
              selectionColor={placeholder_Color}
            ></TextInput>

            <Text style={[styles.font_upper_textinput, { color: Font_Color }]}>Email</Text>
            <TextInput style={[styles.Component_user_textinput, { borderColor: Border_Color, backgroundColor: backGround_Color, color: Font_Color }]}
              value={temp_email}
              onChangeText={temp_set_email}
              editable={get_edit}
              selectionColor={placeholder_Color}
            ></TextInput>

            <Text style={[styles.font_upper_textinput, { color: Font_Color }]}>Password</Text>
            <TextInput style={[styles.Component_user_textinput, { borderColor: Border_Color, backgroundColor: backGround_Color, color: Font_Color }]}
              value={temp_password}
              onChangeText={temp_set_password}
              editable={get_edit}
              selectionColor={placeholder_Color}
            ></TextInput>
              
          </YStack>
        </View>
        <XStack style={{ paddingLeft: 10, paddingRight: 10, justifyContent: 'space-between', width: '100%' }}>
          {!get_visible && (<Button style={[styles.Component_yesorno, { backgroundColor: Border_Color, color: backGround_Color }]}
            onPress={Approved}
          ><Text style={[styles.font_yesorno, { color: backGround_Color }]}>Yes</Text></Button>)}
          {!get_visible && (<Button style={[styles.Component_yesorno, { backgroundColor: Border_Color, color: backGround_Color }]}
            onPress={Noapproved}
          ><Text style={[styles.font_yesorno, { color: backGround_Color }]}>No</Text></Button>)}
        </XStack>
        <YStack>
          {!get_visible && (<Button style={styles.conponent_button_transparent}></Button>)}
          {!get_visible && (<Button style={styles.conponent_button_transparent}></Button>)}
        </YStack>
        
      </ThemedSafeAreaView>
      <Pressable
            className='bg-red-500 w-full h-[50px] mt-5 flex justify-center items-center rounded-3xl'
            onPress={handelSingOut}
        >
            <Text className='text-xl text-white'>Logout</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  Component_box_all_button: {
    zIndex: 4,
    width: '100%',
    height: 500,
    alignSelf: 'flex-start',
    textAlign: 'left',
    backgroundColor: 'transparent'
  },
  Component_box_main: {
    width: '88%',
    height: 650,
    borderRadius: 20,
    opacity: 1,
    zIndex: 1,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: '-50%' }, { translateY: '15%' }],
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
  },
  Component_big_username: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    position: 'relative',
    justifyContent: 'center',
    //alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    top: 0,
    zIndex: 5,
    width: '100%',
    height: 80,
  },
  Component_Picture_profile: {
    width: 125,
    height: 125,
    borderRadius: 100,
    //backgroundColor: '#203B82',
    position: 'absolute',
    top: -40,
    left: -20,
    zIndex: 3,
  },
  Component_twin_inputbox: {
    flexDirection: 'row',
    width: '100%',
    height: 70,
    backgroundColor: 'transparent',
    justifyContent: "space-between"
  },
  conponent_button_transparent: {
    backgroundColor: 'transparent',
  },
  Component_edit_box: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 50,
    right: 10,
    top: -3,
    width: 50,
    height: 30,
    backgroundColor: 'white',
  },
  Component_user_textinput: {
    paddingVertical: 5,
    shadowColor: 'transparent',
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 2,
    borderLeftWidth: 2,
    paddingLeft: 15,
    paddingRight: 48,
    paddingTop: 8,
    marginBottom: 5,
    marginTop: 5,
  },
  Component_Gender: {
    paddingVertical: 5,
    shadowColor: 'transparent',
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 2,
    borderLeftWidth: 2,
    paddingLeft: 15,
    paddingRight: 48,
    paddingTop: 8,
    marginBottom: 5,
    marginTop: 5,
  },
  Component_gender_picker: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    borderColor: '#203B82',
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 2,
    borderLeftWidth: 2,
    paddingLeft: 15,
    paddingRight: 48,
    paddingTop: 8,
    marginBottom: 10,
  },
  Component_yesorno: {
    borderRadius: 30,
    width: 70,
    height: 40,
  },
  font_only_hi: {
    fontSize: 24,
    left: 30,
    paddingTop: 10,
    //color: '#203B82',
  },
  font_show_name: {
    paddingTop: 20,
    //paddingLeft:-50,
    fontSize: 40,
    left: 30,
    //color: 'black',
    zIndex: 3,
  },
  font_yesorno: {
    fontSize: 20,
  },
  font_upper_textinput: {
    fontSize: 15,
    paddingLeft: 10,
    textAlign: 'left',
  },
  font_Date_gender_inside: {
    flex: 1,
    textAlign: 'left',
    marginLeft:-10,
    alignItems: 'center',
    // paddingLeft: ,
  },
  Compareator_Gender: {
    //backgroundColor:'black',
    flex: 1,
    marginRight: 10,
  },
  Compareator_Date: {
    // backgroundColor:'red',
    flex: 1,
    marginLeft: 10,
  }
});

export default Propage;
