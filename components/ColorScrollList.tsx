import {View , Text , ScrollView , Image , StyleSheet} from 'react-native'
import React from 'react'
import { opacity } from 'react-native-reanimated/lib/typescript/Colors'
const ColorScrollList = ({color}:any) =>{
    return(
        <ScrollView
            contentContainerStyle={style.container}>
            {
                [1,0.7,0.5,0.4,0.2].map(opacity=>(
                    <View
                    key = {opacity}
                    style={[style.color, {backgroundColor: color,opacity}]}>
                    </View>
                ))
            }
        </ScrollView>
    )
}
const style = StyleSheet.create({
    color:{
        width:'100%',
        height:150,
        borderRadius : 25,
        borderCurve:'continuous',
        marginBottom:15

    },
    container:{
        paddingHorizontal:20,
        paddingVertical:10,
        height: '100%'
    }


})
export default ColorScrollList;