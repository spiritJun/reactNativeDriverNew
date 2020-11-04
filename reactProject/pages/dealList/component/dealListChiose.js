import React,{useEffect,useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import { scaleSize,setSpText } from '../../../util/autoSize';
export default function DealListChiose(props){
       const {
         container,
         choiceButn
        } = styles;
        return (
            <View style={choiceButn}>
              <TouchableOpacity
                 activeOpacity={global.opacity}
                 onPress={()=>props.showDialog()}
               >
                <Text style={container}>筛选</Text>
              </TouchableOpacity>
            </View> 
        )
}
const styles = StyleSheet.create({
  choiceButn:{
    flex:1,
    height:global.headerHeight,
    lineHeight:global.headerHeight,
    justifyContent:'center',
    alignItems:'flex-end'
 },
   container:{
       color:'#1764FF',
       fontSize:setSpText(18),
       marginRight:scaleSize(10),
   },
})