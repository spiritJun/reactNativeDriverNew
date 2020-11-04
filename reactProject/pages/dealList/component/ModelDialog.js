import React,{useRef,useState,useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import {
 deepClone
} from '../../../util'
import {
  scaleSize,
  setSpText,
  scaleHeight,
  screenW
} from '../../../util/autoSize';
import ModelView from '../../../component/ModelView';
//静态数据 后期改成接口都无所谓
const staticRecord = [
  {
    typeName:'平台类型',
    typeList:[
      {
       name:'全部',
       isCur:true 
      },
      {
       name:'快成平台',
       isCur:false 
      },
      {
       name:'绥德平台',
       isCur:false 
      }
    ]
  },
  {
   typeName:'收支查询',
   typeList:[
     {
      name:'全部',
      isCur:true 
     },
     {
      name:'收入',
      isCur:false 
     },
     {
      name:'提现',
      isCur:false 
     },
     {
       name:'保险购买',
       isCur:false 
      },
      {
        name:'保险扣除',
        isCur:false 
       },
       {
         name:'加油',
         isCur:false 
        },
        {
          name:'运费代收',
          isCur:false 
         },
        {
          name:'加气',
          isCur:false 
         },
         {
           name:'收款支付',
           isCur:false 
          },
          {
            name:'运费预付款',
            isCur:false 
           }
   ]
 }
]
const deepCloneData = deepClone(staticRecord);
const _initData = ({setData})=>{
  setData([...staticRecord]);
}
export default function ModelDialog(props){
    const [data,setData] = useState([]);//多维数组
    useEffect(()=>{
       _initData({setData}); 
    },[])
    return (
        <RenderDialog {...props} data={data} setData={setData}/> 
    )
}
//模态框重置、确定的点击事件
const _clickDealBtn = (props)=>{
   if(props.value){//确定
      props.onDismiss();
   }else{//重置
     props.setData([...deepCloneData]);
   }
}
//渲染按钮
function RenderBtn(props){
  const {setData,onDismiss} = props;
  const {
    btnContainer,
    btnContainerL,
    btnContainerLTxt,
    btnContainerR,
    btnContainerRTxt
  } = styles;
  return (
    <View style={btnContainer}>
       <TouchableOpacity
         activeOpacity={global.opacity}
         style={btnContainerL}
         onPress={()=>_clickDealBtn({value:0,setData,onDismiss})}
       >
           <Text style={btnContainerLTxt}>重置</Text>
       </TouchableOpacity>
       <TouchableOpacity
         activeOpacity={global.opacity}
         style={btnContainerR}
         onPress={()=>_clickDealBtn({value:1,setData,onDismiss})}
       >
           <Text style={btnContainerRTxt}>确定</Text>
       </TouchableOpacity>
    </View>
  )
}
//渲染子集中选中的效果
function RenderChioce({item}){
  const {
    typeLi,
    typeLiTxt,
    typeCur,
    typeCurTxt,
    typeImg
  } = styles;
  if(item.isCur){
   return (
      <View style={typeCur}>
         <Image style={typeImg} source={require('../../../assets/images/DealList/argeCur.png')} />
         <Text style={typeCurTxt}>{item.name}</Text>
      </View>
   )
  }else{
    return (
     <View style={typeLi}>
       <Text style={typeLiTxt}>{item.name}</Text>
     </View>
    )
  }
}
//选择Type
const choiceType = ({index,indexSon,data,setData})=>{
    const arr = deepClone(data);
    arr.forEach((item,index_) =>{
      if(index_ == index){
          item.typeList.forEach(obj=>{
            obj.isCur = false;
          })  
      }
    })
   arr[index].typeList[indexSon].isCur = true;
   setData([...arr]);
}
//渲染内层子节点
function RenderLi({item,index,data,setData}){
  return (
    <View 
     style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',width:screenW - 12}}>
     {
        item.typeList.map((itemSon,indexSon)=>(
          <TouchableOpacity
          // style={typeLi} 
          key={indexSon}
          activeOpacity={global.opacity}
          onPress={()=>choiceType({index,indexSon,data,setData})}>
              {/* 点击之后的背景选择 */}
              <RenderChioce item={itemSon}/>
          </TouchableOpacity>
        ))
      }
    </View>
  )
}
//渲染内层
function RenderList(props){
  const {
    containerList,
    containerLiTop,
    containerLi
   
  } = styles;
  if(props.data.length){
    return (
      <>
         {
          props.data.map((item,index)=>(
            <View style={containerList} key={index}>
                <Text style={containerLiTop}>{item.typeName}</Text>
                <View style={containerLi}>
                    <RenderLi item={item} index={index} {...props}/>
                </View>
            </View>
          )) 
         }
         {/* 众所周知 最后渲染BTN */}
          <RenderBtn {...props} />
      </>
    )
  }else{
    return <></>;
  }
}
//渲染外层
function RenderDialog(props){
  const {
    container,
    containerBox,
    
} = styles;
  if(props.visible){
    return (
      <ModelView 
          position="top"
          onDismiss={props.onDismiss}
         >
          <View style={container}>
              <View style={containerBox}>
                  <RenderList {...props} />
              </View>
          </View>
         </ModelView>
    )
  }else{
    return <></>;
  }
} 
const styles = StyleSheet.create({
    container:{
       position:'absolute',
       top:0,
       width:screenW,
       backgroundColor:'#fff',
    },
    containerBox:{
       paddingLeft:scaleSize(12),
    },
    containerList:{
      paddingTop:scaleSize(12),
     
    },
    containerLiTop:{
      paddingBottom:scaleSize(10),
      fontSize:setSpText(14),
      color:'#222',
    },
    containerLi:{
      justifyContent:'flex-start',
      alignItems:'flex-start',
    },
    typeLi:{
      backgroundColor:'#F5F5F5',
      width:scaleSize(108),
      height:scaleHeight(36),
      justifyContent:'center',
      alignItems:'center',
      marginRight:scaleSize(10),
      marginBottom:scaleSize(12),
      borderRadius:scaleSize(4),
    },
    typeLiTxt:{
      color:'#222',
      fontSize:setSpText(14)
    },
    btnContainer:{
      paddingBottom:scaleSize(30),
      marginTop:scaleSize(20),
      paddingLeft:scaleSize(10),
      paddingRight:scaleSize(10),
      justifyContent:'space-between',
      flexDirection:'row'
    },
    btnContainerL:{
      width:scaleSize(135),
      borderRadius:scaleSize(4),
      height:scaleSize(36),
      borderWidth:0.5,
      borderColor:'#0060FF',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#fff',
      marginRight:scaleSize(20)
    },
    btnContainerLTxt:{
       fontSize:setSpText(14),
       color:'#1764FF',
       fontWeight:'800'
    },
    btnContainerR:{
      flex:1,
      borderRadius:scaleSize(4),
      height:scaleSize(36),
      backgroundColor:'#1764FF',
      justifyContent:'center',
      alignItems:'center',
    },
    btnContainerRTxt:{
       fontSize:setSpText(14),
       color:'#fff',
       fontWeight:'800'
    },
    typeCur:{
      backgroundColor:'#fff',
      width:scaleSize(108),
      height:scaleHeight(36),
      justifyContent:'center',
      alignItems:'center',
      marginRight:scaleSize(10),
      marginBottom:scaleSize(12),
      borderRadius:scaleSize(4),
      borderWidth:0.5,
      borderColor:'#1764FF',
      position:'relative',
    },
    typeCurTxt:{
      fontSize:setSpText(14),
      color:'#1764FF',
      fontWeight:'800'
    },
    typeImg:{
      position:'absolute',
      top:0,
      right:0,
      width:scaleSize(20),
      height:scaleHeight(20.5)
    }
})