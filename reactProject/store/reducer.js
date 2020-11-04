import {
    SET_USER_INFO,
    SET_TOKEN,
    SET_SESSIONID,
    UPDATE_STATE,
    CLEAR_STATE
} from './actionType';
import {deepClone,setAsyncStorage} from '../util';
const initFn =  (state) => {
      return deepClone(state);
}
// function isPromise(fn){
//   if(fn && typeof fn.constructor == 'function' && fn instanceof Promise){
//      return true; 
//   }
//   return false;
// }  
let initState = {
    text:'',//测试数据
    token:'',
    sessionId:'',
    userInfo:null,//用户数据
}
const updateData = (key,action,newState,isSetStorage)=>{
  newState[key] = action[key];
  isSetStorage && setAsyncStorage(key,action[key]);
  return newState;
}
const reducer = (state = initState, action) => {
 const newState = initFn(state);
  switch(action.type) {
    //token
    case SET_TOKEN:
      return updateData('token',action,newState,true); 
    //sessionId  
    case SET_SESSIONID:
      return updateData('sessionId',action,newState,true); 
    //userInfo    
    case SET_USER_INFO:
      return updateData('userInfo',action,newState,true);
     //根据缓存数据进行修改 整个状态树   
     case UPDATE_STATE:
      for(let key in action.state){
        newState[key] = action.state[key];
      }
      return newState;
    //清楚所有state  
    case CLEAR_STATE:
      // for(let key in initState){
      //   newState[key] = initState[key];
      // }
      return initState;         
    default:
      return state;  
  }
}
export {
    initState,
    reducer
}