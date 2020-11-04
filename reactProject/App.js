/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useContext,useReducer,useEffect,useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {getStatusHeight} from './util';//获取导航高度
//导入路由
import Routes from './routes/Routes';
//将组件进行状态共享的Context
import {TextComponent} from './store/context';
import {
  setCookieRN,
  getCookieRN,
  getAllAsyncStorage
} from './util';
const init = async ({setShowComponent})=>{
  const initSetCookit = await getCookieRN();
  const data = await getAllAsyncStorage();
  if(data){
    for(let key in data){
        global[key] = data[key];
    }
  }
  if(!initSetCookit){
     await setCookieRN();
  }
  setShowComponent(true);
}
const App: () => React$Node = () => {
  const [isShowComponent,setShowComponent] = useState(false);
  useEffect(()=>{
     //设置cookie上的三大精钢 product platform token_type
     init({setShowComponent});
  },[]);
  function RenderRoutes(isShowComponent){
     if(isShowComponent){
          return (
            <SafeAreaView style={{flex:1}}> 
              <TextComponent>
                  <Routes />
              </TextComponent>
            </SafeAreaView> 
          )
       }else {
       return null;
     }
  }
  return (
    <>
      <StatusBar 
        StatusBarAnimation="slide"
        barStyle="dark-content" 
        backgroundColor="#fff"/>
           {/* 直接引入路由先 */}
           <RenderRoutes
             isShowComponent={isShowComponent}
            />
    </>
  );
};

export default App;
