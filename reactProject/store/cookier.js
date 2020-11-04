import {
 Platform
} from 'react-native';
export default {
    product:1,//联盟为1 司机端为5 app端也是用的这个
    platform:100,
    token_type:Platform.OS == 'android' ? 'Android' : 'Ios',
    appType:'rn'
}