import React,{useState,useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
// import ModalView from '../../../component/ModelView';
import { scaleSize,setSpText,scaleHeight } from '../../../util/autoSize';
export default function ChangeData(props){
    // //打开弹框
    const _showDialog = ()=>{
        props.showDialog();
    }
    const {
        container,
        containerTop,
        containerTopTxt,
        containerTopImg,
        containerBot,
        containerBotL,
        containerBotR
    } = styles;  
        return (
            <>
              <View style={container}>
                 <TouchableOpacity 
                   activeOpacity={global.opacity}
                   onPress={()=>_showDialog()}
                   style={containerTop}>
                     <Text style={containerTopTxt}>{`${props.defaultVal.year}年${props.defaultVal.month}月`}</Text>
                     <Image style={containerTopImg}
                     source={require('../../../assets/images/DealList/ponit_down.png')} />
                 </TouchableOpacity>
                 <View style={containerBot}>
                    <Text style={containerBotL}>支出 ¥1749.65</Text>
                    <Text style={containerBotR}>收入 ¥1045.22</Text>
                 </View>
              </View>
            </> 
        )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#F8F8F8',
        paddingTop:scaleSize(17),
        paddingBottom:scaleSize(10),
        paddingLeft:scaleSize(15),
    },
    containerTop:{
        paddingBottom:scaleSize(9),
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row'
    },
    containerTopTxt:{
        color:'#222',
        fontSize:setSpText(16),
        fontWeight:'800'
    },
    containerTopImg:{
        marginLeft:scaleSize(7.5),
        width:scaleSize(22),
        height:scaleSize(22)
    },
    containerBot:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    containerBotL:{
        color:'#666',
        fontSize:setSpText(14)
    },
    containerBotR:{
        color:'#666',
        fontSize:setSpText(14),
        marginLeft:scaleSize(5)
    }
})