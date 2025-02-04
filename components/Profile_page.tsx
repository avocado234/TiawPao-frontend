
import React from 'react';
import { useState } from 'react'
import { ThemedText } from "./ThemedText";
import { Picker } from '@react-native-picker/picker';
import { View, StyleSheet, Text, useColorScheme,TextInput} from 'react-native';
import { XStack, YStack,Select } from "tamagui";

import { Button } from 'tamagui';

const Propage = () => {
  //Set Value to UpdateUsername
  const theme = useColorScheme();
  const [user_name, set_user_name] = useState('JameMc');
  const [first_name, set_first_name] = useState('Jame');
  const [last_name, set_last_name] = useState('Macdonnell');
  const [email,set_email] = useState('jamemc@gmail.com');
  const [password,set_password] = useState('123456789');
  const [mobile, set_mobile] = useState('0812345678');
  const [date,set_date] = useState('17/03/2003');
  const [gender,set_gender] = useState('male');
  const [can_change,set_can_chage] = useState(false);


  //Value to Color Change when Change in theme
  let backGround_Color = '#F2F2F2';
  let Profile_Background = '#F2F2F2';
  let Font_Color = '#203B82';
  let Border_Color = 'transparent';
  let Border_Width = 0;
  //const placeholder_Color = theme === '#A0A0A0' ? '#808080'; // ให้ contrast เห็นชัดขึ้น
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
      <Button style={[styles.Component_Picture_profile,{backgroundColor: Profile_Background}]}>
        <Text>Clicker</Text>
      </Button>

      {/*Comment : Just Hi Traveler */}
      <View style={styles.Component_big_username}>
        <Text style={[styles.font_only_hi,{color:Font_Color}]}>Hi</Text>
        <Text style={[styles.font_show_name,{color:Font_Color}]}>{user_name}</Text>
      </View>

      {/*Comment : Gang button kub */}
      <View style={styles.Component_box_all_button}>
        <YStack alignItems="flex-start" width="100%" padding="25">
          
            <Text style={[styles.font_upper_textinput,{color:Font_Color}]}>Username</Text>
            <TextInput style={[styles.Component_user_textinput,{borderColor:Border_Color,backgroundColor:backGround_Color,color:Font_Color}]}
            value={user_name}
            onChangeText={set_user_name}
            editable={can_change}
            selectionColor={placeholder_Color}
            ></TextInput>

            <Text style={[styles.font_upper_textinput,{color:Font_Color}]}>FirstName</Text>
            <TextInput style={[styles.Component_user_textinput,{borderColor:Border_Color,backgroundColor:backGround_Color,color:Font_Color}]}
            value={first_name}
            onChangeText={set_first_name}
            editable={can_change}
            selectionColor={placeholder_Color}
            ></TextInput>

            <Text style={[styles.font_upper_textinput,{color:Font_Color}]}>LastName</Text>
            <TextInput style={[styles.Component_user_textinput,{borderColor:Border_Color,backgroundColor:backGround_Color,color:Font_Color}]}
            value={last_name}
            onChangeText={set_last_name}
            editable={can_change}
            selectionColor={placeholder_Color}
            ></TextInput>
      {/*Comment : Normaly ystack is Sort in Y position so, I Use View and View to Decorate Gender and Date of Birth*/}

          <View style={styles.Component_twin_inputbox}>

            <View style={styles.Compareator_Gender}>
              <Text style={[styles.font_upper_textinput,{color:Font_Color}]}>Gender</Text>
              <TextInput style={[styles.Component_user_textinput,{borderColor:Border_Color,backgroundColor:backGround_Color,color:Font_Color}]}
                value={gender}
                onChangeText={set_gender}
                editable={can_change}
                selectionColor={placeholder_Color}
            ></TextInput>
            </View>

            <View style={styles.Compareator_Date}>
              <Text style={[styles.font_upper_textinput,{color:Font_Color}]}>Date of Birth</Text>
              <TextInput style={[styles.Component_user_textinput,{borderColor:Border_Color,backgroundColor:backGround_Color,color:Font_Color}]}
              value={date}
              onChangeText={set_date}
              editable={can_change}
              selectionColor={placeholder_Color}
              ></TextInput>
            </View>

          </View>
      {/*Comment : Back to Normally YStack lol */}
          <Text style={[styles.font_upper_textinput,{color:Font_Color}]}>Mobile Number</Text>
          <TextInput style={[styles.Component_user_textinput,{borderColor:Border_Color,backgroundColor:backGround_Color,color:Font_Color}]}
            value={mobile}
            onChangeText={set_mobile}
            editable={can_change}
            selectionColor={placeholder_Color}
            ></TextInput>

          <Text style={[styles.font_upper_textinput,{color:Font_Color}]}>Email</Text>
          <TextInput style={[styles.Component_user_textinput,{borderColor:Border_Color,backgroundColor:backGround_Color,color:Font_Color}]}
            value={email}
            onChangeText={set_email}
            editable={can_change}
            selectionColor={placeholder_Color}
            ></TextInput>

          <Text style={[styles.font_upper_textinput,{color:Font_Color}]}>Password</Text>
          <TextInput style={[styles.Component_user_textinput,{borderColor:Border_Color,backgroundColor:backGround_Color,color:Font_Color}]}
            value={password}
            onChangeText={set_password}
            editable={can_change}
            selectionColor={placeholder_Color}
            ></TextInput>
        </YStack>
      </View>
      {/* <Button
        title={can_change ? "บันทึก" : "แก้ไข"}
        onPress={() => set_can_chage(!can_change)} // กดปุ่มเพื่อสลับโหมด
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  Component_box_all_button:{
    zIndex:2,
    width:'100%',
    height:500,
    alignSelf: 'flex-start',
    textAlign: 'left',
    backgroundColor:'transparent',
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
    transform: [{ translateX: '-50%' }, { translateY: '20%' }],
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
  },
  Component_big_username: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    position: 'absolute',
    justifyContent: 'center', 
    //alignItems: 'center',
    top:0,
    zIndex:2,
    width: '95%',
    height: 100,
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
  Component_twin_inputbox:{
    flexDirection: 'row',
    width: '100%',
    height: 70,
    backgroundColor:'transparent',
    justifyContent: "space-between"
  },
  Component_user_textinput:{
    paddingVertical: 5, 
    shadowColor:'transparent',
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
    marginBottom: 10, 
  },
  Component_gender_picker:{
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
  font_only_hi:{
    fontSize:24,
    left:40,
    paddingTop:10,
    //color: '#203B82',
  },
  font_show_name: {
    paddingTop:20,
    //paddingLeft:-50,
    fontSize:40,
    left:40,
    //color: 'black',
    zIndex:3,
  },
  font_upper_textinput:{
    fontSize: 15,
    paddingLeft:10,
   // color:'#203B82',
    textAlign: 'left',
  },
  Compareator_Gender:{
      flex:1,
      marginRight: 10,
  },
  Compareator_Date:{
    flex:1,
    marginLeft: 10,
}
});

export default Propage;
