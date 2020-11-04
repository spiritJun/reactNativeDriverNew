import {Platform } from 'react-native';
import {
    scaleSize,
    setSpText,
    screenW,
    screenH,
    scaleHeight,
} from '../util/autoSize'
import * as loginApiModule from '../api/apiModules/login';//登录api
import * as orderApiModule from '../api/apiModules/order';
global.loginApiModule = loginApiModule;
global.orderApiModule = orderApiModule;
//设置util
global.scaleSize = scaleSize;
global.setSpText = setSpText;
global.screenW = screenW;
global.scaleHeight = scaleHeight;
global.opacity = 0.5;
global.headerHeight = scaleSize(50);
global.isIOS = Platform.OS == 'ios';
global.isAndroid = Platform.OS == 'android';


