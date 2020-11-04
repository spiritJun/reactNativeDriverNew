import React,{useEffect,useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import {  
    scaleSize,
    setSpText,
    screenW,
    screenH,
    scaleHeight 
} from '../../../util/autoSize';
import FreezeModule from './freezeModule';
import DealModule from './dealModule';
import Loadding from '../../../component/Loadding';
const staticTabs = [
    {
      name:'交易明细',
      component:React.memo(DealModule)  
    },
    {
        name:'冻结记录',
        component:React.memo(FreezeModule)  
    }
];
export default function DealListType(props){
        return (
            <>
                 <RenderTabDom />
            </> 
        )
}
function RenderTabDom(props){
    if(staticTabs.length){
        return <RenderTab />
    }else{
        return (
           <Loadding />
        );
    }
}
function RenderScreen(props){
    return (
        <>
           {
              staticTabs.map((item,index)=>{
                return (
                    <Tab.Screen
                    key={index} 
                    name={item.name} 
                    component={item.component} 
                    /> 
                )  
              })
            }
        </>
    )
}

//渲染Tab
function RenderTab(props){
    return (
        <Tab.Navigator
          initialLayout={{
              width:screenW,
              height:scaleSize(50),
          }}
          initialRouteName={staticTabs[0].name}
          swipeEnabled={true}
          lazy={true}
          tabBarOptions={{
            activeTintColor:'#1764FF',
            inactiveTintColor:'#666',
            labelStyle:{
                fontSize:setSpText(16)
            },
            indicatorStyle:{ //下划线
                backgroundColor:'#1764FF',
                height:1
            },
            style:{
                backgroundColor:'#fff',
                height:scaleSize(50),
                borderBottomWidth: 0,
                elevation: 0,//去除阴影
            }
          }}
        >
            {
              RenderScreen()  
            }
           {/* <Tab.Screen name="DealList" component={DealModule} />
           <Tab.Screen name="FreezeList" component={FreezeModule} /> */}
       </Tab.Navigator>
    )
}