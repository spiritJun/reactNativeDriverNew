import axios from 'axios';
import qs from 'qs';
import {getAesString} from './crypto';
import {reduceResponeCode,getCookieRN,getAsyncStorage,getAllAsyncStorageKey} from '../util';
import {
    Alert
} from 'react-native';
// 生成秘钥key
function getKey(){
    let intKey = '';
    let intKeyStr = 'wjssjscdkcwlnnzzezwa';
    let re = '';
    for(let k = 1; k < 7; k++){
        intKey += k
    }
    re = intKey.split("").reverse().join("");
    intKey += intKeyStr.substr(8,4);
    intKey += re
    return intKey
}
// 生成偏移量iv
function getIv(){
    let intIv = '';
    for(let k = 1; k < 9; k++){
        intIv += '0' + k
    }
    intIv += intIv
    return intIv
}
/**
 * 创建axios实例
 */
const service = axios.create({
    // baseURL:'http://192.168.1.180:8091/',
    baseURL:'http://testucarrier.bjkcwl.com',
    timeout:3000000,
    withCredentials:false
});
/**
 * 请求头
 */
const header = () => {
    const config_ = {
        'content-type': '',
    };
    //请求头设置
    config_["content-type"] = 'application/x-www-form-urlencoded';
   
    return config_
};
// request拦截器
service.interceptors.request.use(
    async config => {
        const config_ = header();
        config.headers['content-type'] = config_["content-type"];
        // config.headers.CookieRN = 'product=1; platform=100; token_type=Android';
        const cookies = await getCookieRN();
        console.log(cookies);
        // console.log(getCookieRN() instanceof Promise)
        // console.log(typeof getCookieRN().constructor == 'function')
        cookies && (config.headers.Cookie = cookies);
        if (config.method === 'post') {
            if(config.data){
                let data = {
                    encryptionData:getAesString(JSON.stringify(config.data),getKey(),getIv())
                }
                config.data =qs.stringify(data);
            }
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    response => {
        let code;
        if(!response.data.code){
            code = response.headers['content-code'];
        }else{
            response.data.code = reduceResponeCode(response.data.code) || response.data.code;
            code = reduceResponeCode(response.data.code) || response.data.code;
        }
        if (!response.data || code != 200) {
            switch(code){
                case '008': case '009':
                    Alert.alert('登录已过期','很抱歉，登录已过期，请重新登录',[
                        {
                            text: '去登录',
                            onPress: () => console.warn('你还没登录')
                        }
                    ])
                    break; 
                 default :
                    Alert.alert('请求异常',response.data.message || '',[
                        {
                            text: '确定',
                            onPress: () => console.warn(response.data.message)
                        }
                    ])
                return response;
            }
        } else {
            return response;
        }
    },
    error => {
        return Promise.reject(error);
    }
)
export default service
