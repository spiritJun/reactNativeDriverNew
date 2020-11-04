import React,{Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {scaleHeight,setSpText,scaleSize} from '../util/autoSize';
export default function RenderLeft(props){ //此处只处理黑色的返回按钮
    console.log(props);
    const {label,canGoBack,onPress} = props;
    if(canGoBack){
      return (
         <TouchableOpacity
           activeOpacity={global.opacity}
           style={styles.container}
           onPress={onPress}
         >
           <Image style={styles.backImage} source={require('../assets/images/header/backBlack.png')} />
         </TouchableOpacity>
      )
    }else{
      return null;
    }
}
const styles = StyleSheet.create({
    container:{
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
        marginLeft:scaleSize(10)
    },
    backImage:{
        width:scaleSize(22),
        height:scaleSize(22)
    }
})