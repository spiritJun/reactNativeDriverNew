import React,{useState,useEffect,useRef,useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  ActivityIndicator
} from 'react-native';
import {
    removeCookieRN,
    clearAsyncStorage,
    setAsyncStorage,
    setCookieRN,
} from '../../util';
import {TextContext} from '../../store/context'; //context
import {
    SET_SESSIONID,
    SET_TOKEN,
    SET_USER_INFO,
    CLEAR_STATE
} from '../../store/actionType';
import styles from './style';
//点击登录事件
const _loginActive = ({mobile,password,state,dispatch})=>{
    //登录接口
    loginApiModule.login({mobile,password}).then(async response =>{
        const data = response.data;
        const {token,sessionId} = data.result;
        console.log(token)
        await setCookieRN({token,sessionId});
        dispatch({
            type:SET_TOKEN,
            token
        });
        dispatch({
            type:SET_SESSIONID,
            sessionId
        });

    }).catch(err =>{
        console.error(err);
    });
}
const _getUserInfo = ({setLoadding,dispatch,params={},navigation})=>{
    //获取用户信息接口
    setLoadding(true);
    loginApiModule.refreshMe(params).then(async response =>{
        const userInfo = (response ?.data?.result) || '错误';
        console.log(userInfo);
        await setAsyncStorage('userInfo',userInfo);
        dispatch({
            type:SET_USER_INFO,
            userInfo
        });
        setLoadding(false);
        navigation.navigate('OrderList')
    }).catch(err =>{
        console.error(err);
    });
}
//清楚所有cookie
const _clearCookie = ({dispatch})=>{
    removeCookieRN();
    clearAsyncStorage();
    dispatch({
        type:CLEAR_STATE,
    });
}
function RenderLogin ({setLoadding,navigation,userName,setUserName,password,setPassword,state,dispatch}){
    const {
        container,
        loginList,
        inputStyle,
        loginText,
        btnContainer,
        btnText
    } = styles;
    return (
        <View style={container}>
           <View style={{...loginList,marginBottom:(20)}}>
             <Text style={loginText}>用户名</Text>  
             <TextInput 
             value={userName}
             placeholder="请输入用户名"
             keyboardType="number-pad"
               style={inputStyle}
               underlineColorAndroid={'transparent'}//去掉下划线
               clearButtonMode='never'
              onChange={value => setUserName(value)}
             />
           </View>
           <View style={{...loginList,marginBottom:(20)}}>
             <Text style={loginText}>密码</Text>  
             <TextInput 
             placeholder="请输入密码"
             value={password}
             underlineColorAndroid={'transparent'}//去掉下划线
             secureTextEntry={true}//隐藏输入内容
               style={inputStyle}
               clearButtonMode='never'
              onChange={value => setPassword(value)}
             />
           </View>
           <TouchableOpacity
                 activeOpacity={0.7}
                 onPress={()=>_loginActive({mobile:'17718410774',password:'1234567q',state,dispatch})}
                >
            <View style={btnContainer}>
                <Text style={btnText}>登录</Text> 
            </View>
           </TouchableOpacity>
           {/* 获取个人信息 */}
           <TouchableOpacity
                 activeOpacity={0.7}
                 onPress={()=>_getUserInfo({setLoadding,dispatch,navigation})}
                >
            <View style={btnContainer}>
                <Text style={btnText}>获取个人信息</Text> 
            </View>
           </TouchableOpacity>
           {/* testing */}
           <TouchableOpacity
                 activeOpacity={0.7}
                 onPress={()=>_clearCookie({dispatch})}
                >
            <View style={btnContainer}>
                <Text style={btnText}>清楚RN的cookie</Text> 
            </View>
           </TouchableOpacity>
        </View>
    )
}
function RederLoadding (props){
    // return (
    //  props.isShowLoadding ? <ActivityIndicator size="large" color="#0000ff" />
    //  :<RenderLogin {...props} />
    // )
    if(props.isShowLoadding) {
        return (
            <>
              <ActivityIndicator size="large" color="#0000ff" />
              <RenderLogin {...props} />
            </>
        )
    }else{
       return (
        <RenderLogin {...props} /> 
       ) 
    }
 }
export default function Me(props){
    const {navigation} = props;
    const [isShowLoadding,setLoadding] = useState(false);
    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const {state,dispatch} = useContext(TextContext);
    useEffect(()=>{
        
    },[]);
    const renderProps = {isShowLoadding,setLoadding,navigation,userName,setUserName,password,setPassword,state,dispatch};
    return (
        <View style={{flex:1,backgroundColor:'#fff',justifyContent:'center',alignItems:'center'}}>
             {/* 渲染加载动画以及内容 */}
             <RederLoadding {...renderProps} />
          <Text>{state.token}</Text>
       </View>
    )
}