import React,{Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Setting from '../../pages/tarBarPage/setting';
import Search from '../../pages/tarBarPage/search';
const Tab = createBottomTabNavigator();
export default function TabNavigator(){
    return (
        <Tab.Navigator
        tabBarOptions={{
         labelStyle:{
             fontSize:12,
            //  fontSize:13
         },   
         activeTintColor:'#0079ff',
         inactiveTintColor:'#C6C6C6',
         tabStyle : {
             // backgroundColor: '#ddd',
             paddingBottom: 2,
             paddingTop: 2
             // borderRightWidth: 1,
             // borderRightColor: '#fff'
           },
       }}
       lazy={true}
     >
         <Tab.Screen 
           name="Setting" 
           component={Setting}
           options={{
             tabBarIcon:({focused})=>{
                 if(!focused){
                     return (
                       <View>  
                            {/* <Icon name="cog" size={25} color="#C6C6C6" />  */}
                       </View>
                     )
                 }else{
                     return (
                         <View>
                            {/* <Icon name="cog" size={25} color="#0079ff" />  */}
                         </View> 
                     )
                 }
             }
           }}
            
            />
         <Tab.Screen 
           name="Search" 
           component={Search}
           options={{
             tabBarIcon:({focused})=>{
                 if(!focused){
                     return (
                       <View>  
                            {/* <Icon name="search" size={25} color="#C6C6C6" />  */}
                       </View>
                     )
                 }else{
                     return (
                         <View>
                            {/* <Icon name="search" size={25} color="#0079ff" />  */}
                         </View> 
                     )
                 }
             }
           }} 
         />
     </Tab.Navigator>
    )
}