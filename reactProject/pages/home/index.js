import React,{Component} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
} from 'react-native';
import TabNavigator from '../../component/TabNavigator'
export default function Home(props){
        const {navigation} = props;
        return (
            <View style={{flex:1}}>
                <Text>我是Home</Text>
                <Button title="点我进入详情页面" onPress={()=>navigation.navigate('Me')}/>
                <Text style={{fontSize:14}}>我是君君setSpText</Text>
                <Text style={{fontSize:12}}>我是君君</Text>
                {/* tabBar导航 */}
                <TabNavigator />
            </View> 
        )
}