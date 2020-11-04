import React,{useEffect, useState,useMemo,useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Animated
} from 'react-native';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
import ChangeData from './changeData';
import * as mockModule from '../../../assets/mock/dealFreeze';
import ModalView from '../../../component/ModelView';
import {showPicker,hidePicker} from '../../../util/pickerModule';
import {getAllMonth} from '../../../util';
import {scaleSize, setSpText,screenW} from '../../../util/autoSize';
//context
import {DealContext} from '../context';
//渲染子组件
function FreezeItem({item,index}){
  const config = {
    kc:require('../../../assets/images/DealList/platKC.png'),
    sd:require('../../../assets/images/DealList/platSD.png')
}
const {
    listContainer,
    containerLeft,
    listL,
    listLdealName,
    listLmoney,
    listNomal,
    receiveStatus
    } = styles;    
return (
    <View style={listContainer}>
    <View
      style={{
        width:global.scaleSize(30),
        height:global.scaleSize(30)
        }}
    >
    <Image 
    style={{width:scaleSize(30),height:scaleSize(30)}}
    source={config[item.bankType]} />
    </View>
    <View style={containerLeft}>
       <View style={listL}>
          <Text style={listLdealName}>{item.dealName}</Text>
          <Text style={listLmoney}>{item.isAdd ? '+' : '-'}{item.money}</Text>
       </View>
       <View style={listNomal}>
            <Text style={{fontSize:setSpText(14),color:'#666',width:scaleSize(68)}}>订单号：</Text>
            <Text style={{fontSize:setSpText(14),color:'#1764FF'}}>{item.orderId}</Text>
        </View>
        <View style={listNomal}>
            <Text style={{fontSize:setSpText(14),color:'#666',width:scaleSize(68)}}>收款银行：</Text>
            <Text style={{fontSize:setSpText(14),color:'#222'}}>{item.receiveBank}</Text>
        </View>
        <View style={[listNomal,receiveStatus]}>
            <View style={{flexDirection:'row'}}>
                <Text style={{fontSize:setSpText(14),color:'#666',width:scaleSize(68)}}>收款时间：</Text>
                <Text style={{fontSize:setSpText(14),color:'#222'}}>{item.receiveTime}</Text>
            </View> 
        </View>
    </View>
    </View>
) 
}
//渲染分页组件
function RenderFreeze(props){
    const componentMemo = (props)=> (
        <View 
          style={styles.container}
          >
          <AnimatedFlatList 
          data={props.freezeList}
          initialNumToRender={props.freezeList.length}
          keyExtractor={(item, index) => index.toString()}
          // ListFooterComponent={()=><RenderFooterComponent {...props}/>}
          renderItem={({item,index})=><FreezeItem item={item} index={index}/>}
          // ItemSeparatorComponent={() => <SeparatorComponent />}
          // onRefresh={()=>onRefreshTop()}
          // refreshing={loadding}
          // onEndReached={() => throttleRefresh()}
          // onEndReachedThreshold={0.1} 
          // ListEmptyComponent={()=><HasNoData total={total}/>}
          // scrollEnabled={!loadding}
          keyboardDismissMode='on-drag'
          removeClippedSubviews={Platform.OS === 'android'}
          >
              
          </AnimatedFlatList>
        </View>
    );
    return props._memoComponent(()=>componentMemo(props),[props.freezeList.length])
}
export default function FreezeModule(){
        const [freezeList,setFreezeList] = useState([]);
        const _memoComponent = (fn,inupt)=>useMemo(fn,inupt);//性能优化
        const [year,setYear] = useState(new Date().getFullYear());
        const [month,setMonth] = useState(new Date().getMonth() + 1);
        const {state,updateState} = useContext(DealContext);//context
        const params = {
            title:'请选择时间',
            defaultVal:[`${year}年`,`${month}月`],
            pickerData:getAllMonth(),
            successCallBack:(res)=>_changeDate(res),
            cancelCallBack:(rej)=>_disMissDialog(),
        }
         //选择日期
        const _changeDate = ({pickedValue, pickedIndex})=>{
            setYear(pickedValue[0].slice(0,pickedValue[0].length -1));
            setMonth(pickedValue[1].slice(0,pickedValue[1].length -1));
            updateState({type:'mark',value:false})
        }
        //打开弹框
        const _showDialog = ()=>{
            updateState({type:'mark',value:true})
            showPicker(params);
        }
        //关闭弹框
        const _disMissDialog = ()=>{
            updateState({type:'mark',value:false})
            hidePicker();
        }
        useEffect(()=>{
          setFreezeList([...mockModule.freezeList])
        },[]);
        const renderProps = {
          freezeList,
            _memoComponent 
        }
        return (
            <>
                <ChangeData 
                   defaultVal={{year,month}}
                   showDialog={_showDialog}
                />
                <RenderFreeze {...renderProps} />
            </> 
        )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
  },
  listContainer:{
     paddingTop:scaleSize(19),
     paddingLeft:scaleSize(20),
     flexDirection:'row',
     justifyContent:'flex-start',
     alignItems:'flex-start', 
  },
  containerLeft:{
      flex:1,
      justifyContent:'flex-start',
      alignItems:'flex-start',
      borderBottomWidth:0.5,
      borderBottomColor:'#EBEBEB',
      paddingBottom:scaleSize(13)
  },
  listL:{
      width:screenW - scaleSize(30) - scaleSize(20),
      paddingLeft:scaleSize(10),
      paddingRight:scaleSize(15),
      justifyContent:'space-between',
      alignItems:'flex-start',
      flexDirection:'row'
  },
  listLdealName:{
     fontSize:setSpText(16),
     color:'#222',
     fontWeight:'600'
  
  },
  listLmoney:{
     color:'#FF7429',
     fontSize:setSpText(20),
     fontWeight:'600'
  },
  listNomal:{
      paddingLeft:scaleSize(10),
      paddingTop:scaleSize(8),
      justifyContent:'flex-start',
      alignItems:'flex-start',
      flexDirection:'row'
  },
  receiveStatus:{
      width:screenW - scaleSize(30) - scaleSize(20),
      paddingRight:scaleSize(15),
      justifyContent:'space-between',
      alignItems:'center',
      flexDirection:'row',
  }
})