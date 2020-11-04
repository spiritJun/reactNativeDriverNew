
import {NativeModules,Platform,StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// import {
//     AsyncStorage
// } from 'react-native';
import cookieData from '../store/cookier';
/**
 * 存储
 * @param key
 * @param value
 */
export function setAsyncStorage(key, value) {
   return AsyncStorage.setItem(key, JSON.stringify(value));
}

/**
 * 取值
 * @param key
 */
export function getAsyncStorage(key) {
    return new Promise((resolve, reject) => { 
        AsyncStorage.getItem(key).then(val =>{
          const json = JSON.parse(val);
            resolve(json);
        })
    })
}

/**
 * 删除对应key的
 * @param key
 */
export function removeAsyncStorage(key) {
    return AsyncStorage.removeItem(key);
}
export function getAllAsyncStorageKey(){
    return AsyncStorage.getAllKeys(); 
 }
/**
 * 获取所有缓存中的value [['k1', 'val1'], ['k2', 'val2']]
 * 
 */
export async function getAllAsyncStorageValue(){
   const keys = await getAllAsyncStorageKey(); 
   return AsyncStorage.multiGet(keys)
}
/**
 * 根据所有的key获取所有的缓存中的值 Map类型
 * 
 */
export async function getAllAsyncStorage(){
   try{
     const keys = await getAllAsyncStorageValue();
     const sourceData = new Map(keys);
     const storage = {};
     for(const [key,value] of sourceData){
        storage[key] = value;
     }
    return Promise.resolve(storage); 
   } catch(err){
       console.error(err);
   }
}
/**
 * 清楚所有全局数据
 */
export async function clearAsyncStorage(){
    try{
        const keys = await getAllAsyncStorageKey();
        return AsyncStorage.multiRemove(keys);
    }catch(err){
      console.error(err);
    }
}

/**
 * 返回当前数据的数据类型
 * @param data --要检测的数据源 
 * 
 */
export function checkDataType(data){
   if(!data){
    throw new Error('error','data is null or undefined');
   }else{
      const typeStr = Object.prototype.toString.call(data);
      return typeStr.slice(8,-1);
   }
};
/**
 * 深拷贝 --对于reducer来说就是immutable的
 * @param source --源数据
 * 
 */
export function deepClone(source) {
    if (!source && typeof source !== 'object') {
        throw new Error('参数不正确，必须为引用数据类型');
    }
    // console.warn(checkDataType(new Array()));
    const targetObj = checkDataType(source) === 'Array' ? [] : {};
    Object.keys(source).forEach(keys => {
        if (source[keys] && typeof source[keys] === 'object') {
            targetObj[keys] = deepClone(source[keys]);
        } else {
            targetObj[keys] = source[keys];
        }
    })
    return targetObj;
}
/**
 * 处理请求中的code
 * 后端返回的只有后三位有用
 * @params code 
 */
export function reduceResponeCode(code){
     return code && code.length > 3 ? code.slice(-3) : null;
} 
/**
 * 设置cookie的键值对 'product=1; platform=100; token_type=Android';
 * 后期会有token sessionId等等的加入
 * 方便后台取进行替换操作
 */
export async function setCookieRN(params = {}){
    try{
        const preCookieData = await getAsyncStorage('cookie');
        const data = preCookieData ? {...preCookieData,...params} : {...cookieData,...params}; 
        return setAsyncStorage('cookie',data);
    }catch(err){
        console.error(err);
    }
};
/**
 * 取出cookie的键值对 'product=1; platform=100; token_type=Android';
 */
export async function getCookieRN(){
      try{
        const res = await getAsyncStorage('cookie');
        if(res){
            let str = '';
            Object.keys(res).forEach(key =>{
                str += `${key}=${res[key]};`
            })
            str = str.slice(0,str.length -1);
            // console.warn(str);
            return Promise.resolve(str);//promise 
        }else{
            return null;
        }
      }catch(err){
         console.error(err);
      }
};
/**
 * 清楚request Headers中的CookieRN;
 * 并设置默认cookie
 */
export async function removeCookieRN(){
    try{
      await removeAsyncStorage('cookie');
      await setCookieRN();
    }catch(err){
       console.error(err);
    }
};
/**
 * 事件节流
 * @param {fn} 要执行的函数
 * @param {delay} 延迟多久执行
 * @param {time} 在这段时间内必须执行一次
 */
export function throttle(fn, delay, time){
    let timeout;
    let startTime = new Date().getTime();
        return function () {
            let args = arguments;
            let curTime = new Date().getTime();
            clearTimeout(timeout);
            if (curTime - startTime >= time) {
                fn.apply(null, args);
                startTime = curTime;
            } else {
                timeout = setTimeout(()=> {
                    fn.apply(null, args);
                }, delay);
            }
        };
}
/**
 * 获取从1970年到目前所有的年月日 
 */
export function getAllDates(){
    let date = [];
    let currDate = new Date();
    let year = currDate.getFullYear();
    for(let i=1970;i<=year;i++){
        let month = [];
        for(let j = 1;j<13;j++){
            let day = [];
            if(j === 2){
                for(let k=1;k<29;k++){
                    day.push(k+'日');
                }
                if(i%4 === 0){
                    day.push(29+'日');
                }
            }
            else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                for(let k=1;k<32;k++){
                    day.push(k+'日');
                }
            }else{
                for(let k=1;k<31;k++){
                    day.push(k+'日');
                }
            }
            let _month = {};
            _month[j+'月'] = day;
            month.push(_month);
        }
        let _date = {};
        _date[i+'年'] = month;
        date.push(_date);
    }
    return date;
}
/**
 * 获取从1970年到目前所有的年月 --懒人必备
 */
export function getAllMonth(){
    const dateAll = getAllDates();
    const date = [];
    dateAll.forEach(year =>{
      let obj = {};
      for(let yearKey in year){
        obj[yearKey] =  year[yearKey].map(month =>{
           for(let monthKey in month){
             return monthKey;
           }
        })
      }
      date.push(obj)
    }); 
    return date;
}
/**
 * 获取从1970年到目前所有的年 --懒人必备
 */
export function getAllYear(){
    const dateAll = getAllMonth();
    const date = [];
    dateAll.forEach(year =>{
      for(let yearKey in year){
        date.push(yearKey)
      }
    }); 
    return date;
}
/**
 * 获取异形屏的状态栏的高度 ios android
 */
export function getStatusHeight(){
    const { StatusBarManager } = NativeModules;
    if(Platform.OS == 'android'){
        return StatusBar.currentHeight;
    } 
    if(Platform.OS == 'ios'){
        return new Promise((resolve, reject) => {
            StatusBarManager.getHeight(val => {
                resolve(val.height)
            });
        })
    }
    return null;
}