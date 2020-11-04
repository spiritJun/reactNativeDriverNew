import React,{useState,useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {scaleSize,setSpText,scaleHeight,screenW,screenH} from '../../util/autoSize';
function RenderBack({navigation}){
       return (
            <TouchableOpacity 
             style={styles.back}
             activeOpacity={global.opacity}
             onPress={()=>navigation.pop()}
            >
                <Image
                style={{
                    width:global.scaleSize(22),
                    height:global.scaleSize(22),
                }}
                source={require('../../assets/images/header/backBlack.png')} />
            </TouchableOpacity>
       ) 
}
/**
 * Notice 如果外层跳入 也可以渲染返回按钮 
 *        当然返回事件也可以自定义目前先pop
 */
export default function HeaderModule(props){
    const {navigation} = props;
    return (
        <View style={styles.container}>
           {
            navigation.canGoBack() && <RenderBack navigation={navigation} />   
           } 
          <View style={styles.titleBox}>
            <View style={styles.title}>
               <Text style={styles.titleTxt}>{props.title}</Text>
            </View> 
          </View> 
           {props.children}
        </View> 
    )
}
const styles = StyleSheet.create({
    container:{
        height:scaleSize(50),
        width: screenW,
        backgroundColor:'#fff',
        alignItems:'center',
        borderBottomWidth:0.5,
        borderBottomColor:'#E0E0E0',
        flexDirection:'row',
        position:'relative',
    },
    titleBox:{
        position:'absolute',
        top:0,
        left:0,
        width:screenW,
        height:scaleSize(50),
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    titleTxt:{
        fontSize:setSpText(20),
        fontWeight: 'bold',
    },
    back:{
        position:'absolute',
        top:0,
        left:0,
        zIndex:10000,
        height:scaleSize(50),
        width:scaleSize(32),
        justifyContent:'center',
        alignItems:'center',
    }
})