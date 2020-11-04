import React,{useState,useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Button,
} from 'react-native';
import { scaleSize } from '../../util/autoSize';
import styles from './style';
import HeaderModule from '../../component/HeaderModule';
export default function DealDetail(props){
  const {navigation,route} = props;
  useEffect(()=>{

  },[])
//   console.log(navigation.canGoBack())
  // console.log(props);
  // console.log(route.params.orderId);
  const {
    container,
    containerTop,
    topTxt,
    botTxt,
    containerbox,
    containerList,
    containerLtxt,
    containerRtxt,
    colorRight,
    typeBorder
  } = styles;
        return (
            <>
              <View style={container}>
                 <View style={containerTop}>
                      <Text style={topTxt}>交易金额（元）</Text>
                      <Text style={botTxt}>-666.00</Text>
                 </View>
                 <View style={containerbox}>
                    <View style={containerList}>
                        <Text style={containerLtxt}>收款账户：</Text>
                        <Text style={containerRtxt}>天真蓝</Text>
                    </View>
                    <View style={containerList}>
                        <Text style={containerLtxt}>出款方式：</Text>
                        <Text style={containerRtxt}>快成农业可用余额</Text>
                    </View>
                    <View style={containerList}>
                        <Text style={containerLtxt}>手机号：</Text>
                        <Text style={containerRtxt}>15010544645</Text>
                    </View>
                    <View style={containerList}>
                        <Text style={containerLtxt}>交易号：</Text>
                        <Text style={containerRtxt}>01054464515</Text>
                    </View>
                    <View style={[containerList,typeBorder]}>
                        <Text style={containerLtxt}>专款状态：</Text>
                        <Text style={[containerRtxt,colorRight]}>成功</Text>
                    </View>
                    <View style={containerList}>
                        <Text style={containerLtxt}>转账时间：</Text>
                        <Text style={containerRtxt}>2020-09-21 18:05:12</Text>
                    </View>
                    <View style={{...containerList,marginBottom:scaleSize(50)}}>
                        <Text style={containerLtxt}>到账时间：</Text>
                        <Text style={containerRtxt}>2020-09-21 18:05:12</Text>
                    </View>
                    <Button 
                     title="点我去登录页"
                     onPress={()=>navigation.navigate('Me')} />
                 </View>
              </View>
            </> 
        )
}