import {
    StyleSheet,
  } from 'react-native';
  import {
    scaleSize,
    setSpText,
    screenW,
    screenH,
} from '../../util/autoSize';
export default StyleSheet.create({
   container:{
       backgroundColor:'#fff',
       flex:1,
   },
   orderListContainer:{
       paddingTop:scaleSize(15),
       paddingRight:scaleSize(15),
       paddingLeft:scaleSize(15),
       paddingBottom:scaleSize(15)
   },
   orderList:{
     height:scaleSize(40),
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:'#ebebeb',
     marginBottom:setSpText(15)
   },
   orderText:{
       fontSize:setSpText(15),
       color:'#000'
   },
   separators:{
       height:scaleSize(10),
       backgroundColor:'#ef4454'
   }
});