import React,{useContext,useEffect} from 'react';
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade,
    Shine 
} from 'rn-placeholder';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import PlaceHolderList from '../../component/Placeholder/list'
export default function Detail(){
    const {
        container
    } = styles;
        return (
            <View style={container}>
               <PlaceHolderList />
            </View> 
        )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        paddingLeft:20,
        paddingRight:20,
        paddingTop:20,
    }
})