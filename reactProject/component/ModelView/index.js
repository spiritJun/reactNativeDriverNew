import React,{useState,useEffect,useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity
} from 'react-native';
import {
 scaleHeight,
 screenW,
 scaleSize,
 setSpText,
 screenH
} from '../../util/autoSize';
//点击遮罩弹框消失
const _handerClose = ({e,onDismiss})=>{
  if('getNode' in e.target){
     onDismiss();
  }
}
//渲染styles
const renderStyles = ({position,fadeAnim})=>{
  switch(position){
    case 'top':
      return {
        left:0,
        top:fadeAnim
      }
    case 'left':
      return {
        top:0,
        left:fadeAnim
      }
    case 'right':
      return {
        top:0,
        right:fadeAnim
      } 
    case 'bottom':
      return {
        left:0,
        bottom:fadeAnim
      }      
  }
}
export default function ModelView(props){
   const {
    position, // top left bottom right
    onDismiss
   } = props;
   const fadeAnim = useRef(new Animated.Value(-900)).current; 
   useEffect(() => {
    Animated.timing(                 
      fadeAnim,                      
      {
        toValue: 0,
        easing: Easing.back(),
        duration: 200,
        useNativeDriver: false             
      }
    ).start();                        
  }, [fadeAnim])
    const {container} = styles;
    return (
            <TouchableOpacity
            activeOpacity={1}
            style={container}
            onPress={(e)=>_handerClose({e,onDismiss})}
          >
             <Animated.View 
                 style={{
                  position:'absolute', 
                  width:'100%',
                  height:screenH - 50,
                  ...renderStyles({position,fadeAnim})
                }}
              >
                {props.children}
             </Animated.View>
          
             </TouchableOpacity>
        )
}
const styles = StyleSheet.create({
    container:{
        width:screenW,
        backgroundColor:'rgba(0,0,0,0.5)',
        height:screenH - scaleSize(50),
        position:'absolute',
        zIndex:100
    },
})