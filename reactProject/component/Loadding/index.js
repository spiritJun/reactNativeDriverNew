import React,{Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
export default function Loadding(){
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <ActivityIndicator size="large" color="#1764FF" />
            </View> 
        )
}