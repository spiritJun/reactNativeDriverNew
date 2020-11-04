import React,{useEffect,useState,useMemo,useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal
} from 'react-native';
import DealListType from './component/dealListType';
import OrderListChiose from './component/dealListChiose';
import ModelDialog from './component/ModelDialog';
import ModalView from '../../component/ModelView';
//context
import {DealComponent} from './context';
import {hidePicker} from '../../util/pickerModule';
import HeaderModule from '../../component/HeaderModule';
//渲染筛选弹框
function RenderModel({isShowDialog,setShowDialog}){
   if(isShowDialog){
     return (
       <ModelDialog 
          visible={isShowDialog}
          onDismiss={()=>{
            setShowDialog(false)
          }}
       />
     )
   }else{
     return null;
   }
}
//设置顶部Header
const _setOptionHeader =({navigation,setShowDialog,isShowDialog})=>{
    //打开弹框
    const showDialog = ()=>{
       setShowDialog(pre => !pre);
    }
    navigation.setOptions({
      headerMode:'screen',
      headerRight:()=><OrderListChiose showDialog={showDialog} />,
      // header:()=>{
      //   return (
      //     <HeaderModule 
      //       title='交易记录'
      //       navigation={navigation}
      //     >
      //         <OrderListChiose showDialog={showDialog} />
      //     </HeaderModule>
      //   )
      // }
  })
}
export default function DealList(props){
      const {navigation} = props;
      // console.log(navigation.canGoBack())
      // console.log(props);
      const [isShowDialog,setShowDialog] = useState(false);
      const [isShowMark,setShowMark] = useState(false);//遮罩
      useEffect(()=>{
        _setOptionHeader({navigation,setShowDialog,isShowDialog});
        return ()=>{
          _setOptionHeader({navigation,setShowDialog,isShowDialog})
        }
      },[]);
      //更新context
      const updateState = (state)=>{
          switch(state.type){
            case 'mark':
              return setShowMark(state.value);
            default:
              return ''  
          }
      }
      //关闭弹框
      const _disMissDialog = ()=>{
        setShowMark(false);
        hidePicker();
      }
      const renderProps = {
        isShowDialog,
        setShowDialog
      }
      return (
          <>
          {/* context */}
          <DealComponent
            state={{isShowMark}}
            updateState={updateState}
          >
             {/* 直接渲染type 以及模块组件 还有header */}
            <DealListType />
              {/* Render Model */}
              <RenderModel {...renderProps}/>
              {/* 渲染全局遮罩 */}
              {
               isShowMark && <ModalView position="bottom" onDismiss={_disMissDialog} />
              }
          </DealComponent>
          </> 
      )
}
