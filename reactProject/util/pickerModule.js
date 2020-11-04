import React,{useState,useEffect,useMemo,Component} from 'react';
import Picker from 'react-native-picker';
/**
 * 
 * @param {title}  pickerTitleText
 * @param {defaultVal}  selectedValue
 * @param {pickerData}  pickerData
 * @param {successCallBack}  --(val,index)
 * @param {cancelCallBack}  --(val,index)
 */
export const showPicker = ({title,defaultVal,pickerData,successCallBack,cancelCallBack})=> {
    Picker.init({
      pickerTitleText:title,
      pickerCancelBtnText:'取消',
      pickerConfirmBtnText:'确定',
      selectedValue:defaultVal,
      pickerBg:[255,255,255,1],
      pickerData,
      pickerFontColor: [5, 86 ,255, 100],
      pickerConfirmBtnColor:[5, 86 ,255, 100],
      pickerCancelBtnColor:[5, 86 ,255, 100],
      onPickerConfirm: (pickedValue, pickedIndex) => {
         //获取值
         successCallBack && successCallBack({pickedValue, pickedIndex});
      },
      onPickerCancel: (pickedValue, pickedIndex) => {
         //取消按钮
         cancelCallBack && cancelCallBack({pickedValue, pickedIndex}); 
      },
      onPickerSelect: (pickedValue, pickedIndex) => {
          //获取值 这个方法先注释了吧 太可怕了
         // successCallBack && successCallBack({pickedValue, pickedIndex});
      }
    });
    Picker.show();
  }
  //关闭当前picker
  export const hidePicker = ()=>{
     Picker.hide();
  }