import React,{useCallback,useContext,useState,useEffect,useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal
} from 'react-native';
import Loadding from '../../component/Loadding';
import PlaceHolder from './placeholder';
export default function Screen(props){
  const timer = useRef(null);
  const {navigation} = props;
  const setTime = setTimeout(()=>navigation.replace('DealList'),100);
  const setTimeJump = ()=>setTimeout(()=>navigation.replace('DealList'),100);
  timer.current = setTime;
  useEffect(()=>{
    setTimeJump();
    return clearTimeout(timer.current);
  },[]);
    return (
      <View style={styles.container}>
        {/* <Loadding /> */}
           <PlaceHolder />
      </View>
    )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff'
  }
})