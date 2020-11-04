/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './reactProject/App';
import './reactProject/global/Gloal';//全局的属性 切不可删除
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
