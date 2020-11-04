import React,{useContext} from 'react';
import {TextContext} from '../../../store/context'; //context
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
} from 'react-native';
export default function Setting(props){
    const {state} = useContext(TextContext);
    const goSearch = ()=>{
      props.navigation.jumpTo('Search');
    }
    return (
        <View>
            <Text>我是Setting组件</Text>
            <Text>{state.text}</Text>

            <Button title="点我去Search页面" onPress={goSearch}/>
        </View> 
    )
}