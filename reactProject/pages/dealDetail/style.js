import {
  StyleSheet
} from 'react-native';
import {
  scaleSize,
  setSpText,
  screenW,
} from '../../util/autoSize';
export default StyleSheet.create({
   container:{
       flex:1,
       backgroundColor:'#fff',
       paddingLeft:scaleSize(30),
       paddingRight:scaleSize(30)
   },
   containerTop:{
       height:scaleSize(101),
       backgroundColor:'#fff',
       width:'100%',
       justifyContent:'center',
       alignItems:'center',
       borderBottomColor:'#EBEBEB',
       borderBottomWidth:1
   },
   topTxt:{
       color:'#666',
       fontSize:setSpText(14),
       marginBottom:scaleSize(10)
   },
   botTxt:{
       color:'#222',
       fontSize:setSpText(27)
   },
   containerbox:{
       flex:1,
       paddingTop:scaleSize(30),
   },
   containerList:{
       flexDirection:'row',
       marginBottom:scaleSize(12)
   },
   containerLtxt:{
       color:'#666',
       fontSize:setSpText(14),
       marginRight:scaleSize(11.5),
       width:scaleSize(72)
   },
   containerRtxt:{
       color:'#222',
       fontSize:setSpText(14)
   },
   colorRight:{
       color:'#FF3A30',
       paddingBottom:scaleSize(28.5),
   },
   typeBorder:{
        borderBottomWidth:1,
        borderBottomColor:'#EBEBEB',
   }
});