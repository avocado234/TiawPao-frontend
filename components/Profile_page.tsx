
import React from 'react';
import { useState } from 'react'
import { ThemedText } from "./ThemedText";
import { View, StyleSheet, Text, useColorScheme } from 'react-native';
import { Button } from 'tamagui';

const Propage = () => {
  const [username, setUsername] = useState('JameMc');
  const theme = useColorScheme();
  let bg = '#F2F2F2';
  let borderw = 0;
  if (theme === 'dark') {
    bg = '#F2F2F2';
    borderw = 0;
  }
  else {
    bg = '#F2F2F2';
    borderw = 1.5;
  }

  return (
    <View style={[styles.Component_box_main, { backgroundColor: bg, borderWidth: borderw, borderBlockColor: 'black' }]}>
      {/* Comment : รูปของ Kaithod*/}
      <Button style={styles.Component_Picture_profile}>
        <Text>Clicker</Text>
      </Button>

      {/*Comment : Just Hi Traveler */}
      <View style={styles.Component_big_username}>
        <Text style={styles.font_only_hi}>Hi</Text>
        <Text style={styles.font_show_name}>{username}</Text>
      </View>

      {/*Comment : Gang button kub */}

    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: '#203B82',
    position: 'absolute',
    top: -40,
    left: -20,
    zIndex: 3,
  },
  font_only_hi:{
    fontSize:24,
    left:40,
    paddingTop:10,

    //paddingTop:,
    color: '#203B82',
  },
  font_show_name: {
    paddingTop:20,
    //paddingLeft:-50,
    fontSize:40,
    
    left:40,
    color: 'black',
    zIndex:3,

  }
});

export default Propage;
