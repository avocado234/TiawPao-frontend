import { Tabs } from 'expo-router';
import React from 'react';
import Foundation from '@expo/vector-icons/Foundation';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { View ,Text} from 'tamagui';
import Stack from 'expo-router';
import { useColorScheme } from 'react-native';
export default function TabLayout() {
  const theme = useColorScheme();
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
        backgroundColor: theme == 'dark' ? "#18181b" : "white",
        // borderTopLeftRadius: 30, 
        // borderTopRightRadius: 30, 
        borderTopColor: "ิิิblack", 
        borderTopWidth: 0.5,       
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
              <Foundation 
                name="home" 
                color={focused ? "#5680EC" : theme == 'dark' ? "white" : "#001A35" }
                size={24}
              />
              <Text style={{
                color: focused ? "#5680EC" : theme == 'dark' ? "white" : "#001A35",
                fontSize:9,
                marginTop: 4,
                fontWeight:"bold"
              }}>Home</Text>
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon:({ focused }) =>(
            <View style={{
                alignItems:"center",
                paddingTop: 10
            }}>
              <Ionicons 
                name="search" 
                color={focused ? "#5680EC" : theme == 'dark' ? "white" : "#001A35"}
                size={24}
              />
              <Text style={{
                color: focused ? "#5680EC" : theme == 'dark' ? "white" : "#001A35",
                fontSize:9,
                marginTop: 4,
                fontWeight:"bold"
              }}>Search</Text>
            </View>
          )
        }}
      />
       <Tabs.Screen
        name="add"
        options={{
          tabBarIcon:({ focused }) =>(
            <View style={{
                alignItems:"center",
                justifyContent:"center",
                height: 70,
                width:70,
                borderRadius:999,
                backgroundColor:theme == 'dark'? "#001A35" : "white",
                borderWidth: 2,
                borderColor: "#5680EC",
                shadowColor: "#5680EC",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8,
                shadowRadius: 5,
                elevation: 10, 
            }}>
              <AntDesign
                name="plus" 
                color="#5680EC"
                size={24}
              />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="plan"
        options={{
          tabBarIcon:({ focused }) =>(
            <View style={{
                alignItems:"center",
                paddingTop: 10
            }}>
              <FontAwesome 
                name="bookmark" 
                color={focused ? "#5680EC" : theme == 'dark' ? "white" : "#001A35"}
                size={24}
              />
              <Text style={{
                color: focused ? "#5680EC" : theme == 'dark' ? "white" : "#001A35",
                fontSize:9,
                marginTop: 4,
                fontWeight:"bold"
              }}>Plan</Text>
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon:({ focused }) =>(
            <View style={{
                alignItems:"center",
                paddingTop: 10
            }}>
              <Ionicons
                name="person" 
                color={focused ? "#5680EC" : theme == 'dark' ? "white" : "#001A35"}
                size={24}
              />
              <Text style={{
                color: focused ? "#5680EC" : theme == 'dark' ? "white" : "#001A35",
                fontSize:9,
                marginTop: 4,
                fontWeight:"bold"
              }}>Profile</Text>
            </View>
          )
        }}
      />    
    </Tabs>
  );
}
