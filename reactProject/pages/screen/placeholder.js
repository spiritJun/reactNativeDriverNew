import React,{Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import {
  scaleHeight,
  scaleSize,
  screenW,
  screenH
} from '../../util/autoSize'
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade,
    Shine 
} from 'rn-placeholder';
function PlaceHolderDrap(){
    let component = [];
    for(let i = 0; i < 2; i++){
        component.push(
            <View key={i} style={styles.box}>
                <PlaceholderLine width={100} height={scaleSize(30)} style={{backgroundColor:'#ebebeb',borderRadius:0,marginBottom:scaleSize(20)}} />
                <PlaceholderLine width={100} height={scaleSize(15)} style={{backgroundColor:'#ebebeb',borderRadius:0,marginBottom:scaleSize(20)}} />
                <PlaceholderLine width={80} height={scaleSize(15)} style={{backgroundColor:'#ebebeb',borderRadius:0,marginBottom:scaleSize(20)}} />
                <PlaceholderLine width={60} height={scaleSize(15)} style={{backgroundColor:'#ebebeb',borderRadius:0,marginBottom:scaleSize(20)}} />
                <PlaceholderLine width={40} height={scaleSize(20)} style={{backgroundColor:'#ebebeb',borderRadius:0,marginBottom:scaleSize(20)}} />
            </View>
        )
    }
    return component;
}
export default function PlaceHolder(){
    return (
        <View style={styles.container}>
            <Placeholder
                backgroundColor="#fff"
                Animation={props => (
                    <Fade {...props} duration={500} style={{ backgroundColor: "#fff" }} />
                )}
            >
                <PlaceholderMedia style={{backgroundColor:'#ebebeb',width:'100%',height:scaleSize(120),marginBottom:scaleSize(20)}} />
                <PlaceHolderDrap />
            </Placeholder>
        </View> 
    )
}
const styles = StyleSheet.create({
    container:{
        paddingTop:scaleSize(30),
        paddingLeft:scaleSize(20),
        paddingRight:scaleSize(20)
    },
    box:{
        marginBottom:scaleSize(30)
    }
})