import React,{useEffect,useContext,useState,useMemo} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button
} from 'react-native';
import { setSpText } from '../util/autoSize';
import {UPDATE_STATE} from '../store/actionType';
import {TextContext} from '../store/context'; //context
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,TransitionSpecs,CardStyleInterpolators   } from '@react-navigation/stack';
//组件
import config from '../util/animationConfig';
import Loadding from '../component/Loadding';
const Stack = createStackNavigator();
//路由
import {staticRoutes} from './index';
//左侧返回按钮
import RenderLeft from './headerBack';
//渲染最终screen
const renderRouteFn = ()=>{
   return (
     <>
      {
        staticRoutes.map((item,index)=>{
          return (
            <Stack.Screen
              key={index} 
              name={item.name} 
              component={item.component} 
              options={item.options}
            />
          )
        })
      }
     </>
   )
}
//判断渲染路由
function RenderRouter(){
    const initialRouteName = staticRoutes.filter(item => item.name === 'Screen'); 
    if(staticRoutes.length){
      return (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={initialRouteName[0].name}
            screenOptions={{
              // header:()=>null,
              headerTitleAlign:'center',
              headerBackTitle:'',
              headerMode:'screen',
              headerStyle:{
                backgroundColor: '#fff',
                height:global.headerHeight,
                // borderBottomWidth: 0,
                borderBottomWidth:0.5,
                borderBottomColor:'#E0E0E0',
                elevation: 0,//去除阴影
                shadowOpacity:0,//去除ios下划线
              },
              headerLeft:(props)=><RenderLeft {...props} />,
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: setSpText(20)
              },
              transitionSpec: {
                open: config,
                close: config,
                // open: TransitionSpecs.FadeInFromBottomAndroidSpec,
                // close: TransitionSpecs.FadeInFromBottomAndroidSpec,
              },
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          >
            {renderRouteFn()}
          </Stack.Navigator>
        
    </NavigationContainer>
      )
    }else{
      return null
    }
}
export default function Routes(){
  const {state,dispatch} = useContext(TextContext);
  const _memoComponent = (fn,inupt)=>useMemo(fn,inupt);//性能优化
  //初始化函数封装路由
  const _initData = ()=>{
      if(global.token && !state.token){ //优化派发任务
        let state_ = {};
        for(let key in global){
          if(key in state){
            state_[key] = global[key];
          }
        }
        dispatch({type: UPDATE_STATE,state:state_});
    }
  }
  useEffect(()=>{
    _initData();  
  },[]);
        return (
            <>
             {
               _memoComponent(RenderRouter,[staticRoutes.length])
             }
            </> 
        )
}