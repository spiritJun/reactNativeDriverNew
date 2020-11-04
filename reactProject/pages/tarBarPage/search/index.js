import React,{useContext,useEffect} from 'react';
import {TextContext} from '../../../store/context'; //context
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button
} from 'react-native';
 const goSetting = (props)=>{
    // console.warn(props); 
    props.navigation.jumpTo('Setting')
 }
export default function Search (props){
    const {state,dispatch} = useContext(TextContext);
    //生命周期
    useEffect(()=>{
       const unsubscribe = props.navigation.addListener('tabPress',e=>{
        // e.preventDefault();
        alert('Default behavior prevented');
       });
       return unsubscribe;
    },[props.navigation])
    return (
        <View>
            <Text>我是Search组件</Text>
            <View style={{height:20,backgroundColor:'yellow'}}>
               <Text style={{fontSize:16}}>哈哈哈计算过了</Text>
            </View>
            <View style={{height:20,backgroundColor:'red'}}>
               <Text style={{fontSize:16}}>哈哈哈</Text>
            </View>
            <Button title="点我进入setting" onPress={()=>goSetting(props)}  />
        </View> 
    )
}