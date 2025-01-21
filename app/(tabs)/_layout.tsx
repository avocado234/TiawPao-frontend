import { Tabs } from 'expo-router';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import { View ,Text} from 'tamagui';

export default function TabLayout() {

  return (
    <Tabs screenOptions={{
      headerShown:false,
      tabBarShowLabel:false,
      tabBarStyle:{
        position:"absolute",
        bottom:0,
        left:16,
        right:16,
        height:72,
        elevation:0,
        backgroundColor:"white",
        borderRadius:16,
        alignItems:"center",
        justifyContent:"center",
      }
    }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon:({ focused }) =>(
            <View style={{
                alignItems:"center",
                paddingTop: 10
            }}>
              <Ionicons
                name={focused ? "home" : "home-outline"}
                color={focused ? "#5680EC" : "#001A35"}
                size={22}
              />
              <Text style={{
                color: focused ? "#5680EC" : "#001A35",
                fontSize:10,
                marginTop: 4
              }}>Home</Text>
            </View>
          )
        }}
      />
    </Tabs>
  );
}
