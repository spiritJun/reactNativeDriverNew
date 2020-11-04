import React,{useState,useEffect,useMemo} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Animated,
  ScrollView,
  Platform
} from 'react-native';
import {throttle} from '../../util';
import styles from './style';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
//渲染每行
function RenderItem(props){
    const {orderList,lasyComponent,item,index,curPagerNo} = props;
    const component = ()=>{
     return (
        <View style={styles.orderList}>
         <View>
          <Text style={styles.orderText}>{`订单ID：${item.id}`}</Text>
        </View> 
        <View>
          <Text style={styles.orderText}>{`车牌号：${item.plateNumber}`}</Text>
        </View> 
      </View>
    ) 
   }
    // return lasyComponent(component,orderList);
    return component();
}
//底部的footer
function RenderFooterComponent(props){
    const {orderList,curPagerNo,total} = props;
    if(orderList.length){
        if(curPagerNo < total){
            return (
            <View >
                <Text>加载中...</Text>
            </View>
            )
        }else{
            return (
                <View >
                    <Text>一滴都没了</Text>
                </View>
            )
        }
    }else{
        return <></>
    }
}
//分割线组件
function SeparatorComponent(){
   return (
       <View
         style={styles.separators}
       />
   )
}
function HasNoData(props){
    if(props.total){
        return (
            <View>
                <Text>我也是有底线的~</Text>
            </View>
        )
    }else{
       return(
            <View >
                <Text>加载中啊...</Text>
            </View>
       ) 
    }
}
/**
 * 
 * @param {data} 数据源
 * @param {initialNumToRender} 每次渲染的条目
 * @param {keyExtractor} 每次渲染的key 方便differ
 * @params {ListFooterComponent} 底部组件
 * @params {renderItem} 渲染的每一项组件
 * @params {ItemSeparatorComponent} 分割线组件
 * @params {onRefresh} 头部上拉刷新方法(刷新的是第一页)
 * @param {refreshing} 是否正在加载中
 * @param {onEndReached} 下拉加载数据
 * @param {onEndReachedThreshold} 距离内容最底部还有多远时触发onEndReached回调，范围0~1，如0.01表示触底时触发
 * @param {ListEmptyComponent} 没有数据的时候 组件展示
 * @param {scrollEnabled} 禁止滚动
 * @param {keyboardDismissMode} 用户拖拽的时候是否需要隐藏键盘
 * @param {removeClippedSubviews} 性能优化 只在安卓端有效
 */
function RenderList(props){
    const {lasyComponent,orderList,curPagerNo,pageSize,setCurPagerNo,getOrderList,loadding,total,setLoadding} = props;
    const {orderListContainer,orderText} = styles;
    //刷新头部
    const onRefreshTop = ()=>{
        getOrderList('toTop');
    }
    const throttleRefresh =()=>{
        if(loadding){
          return false;  
        }else{
            setLoadding(true);
            return throttle(getOrderList,300,3000)();
        }
    }
    return (
        <View style={orderListContainer}>
                <AnimatedFlatList 
                    data={orderList}
                    initialNumToRender={pageSize}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={()=><RenderFooterComponent {...props}/>}
                    renderItem={({item,index})=><RenderItem orderList={orderList} lasyComponent={lasyComponent} item={item} curPagerNo={curPagerNo} index={index}/>}
                    ItemSeparatorComponent={() => <SeparatorComponent />}
                    onRefresh={()=>onRefreshTop()}
                    refreshing={loadding}
                    onEndReached={() => throttleRefresh()}
                    onEndReachedThreshold={0.1} 
                    ListEmptyComponent={()=><HasNoData total={total}/>}
                    scrollEnabled={!loadding}
                    keyboardDismissMode='on-drag'
                    removeClippedSubviews={Platform.OS === 'android'}

                >
                </AnimatedFlatList>
        </View>
    )
}
export default function OrderList(){
    const [loadding,setLoadding] = useState(false);
    const [curPagerNo,setCurPagerNo] = useState(1);
    const [pageSize,setPageSize] = useState(10);
    const [total,setTotal] = useState(0);
    const [orderList,setOrderList] = useState([]);
    const lasyComponent = (fn,input)=>useMemo(() => fn, input)
    useEffect(()=>{
        getOrderList();
    },[]);
    //获取数据
    const getOrderList = (toTop)=>{
        setLoadding(true);
        console.log(curPagerNo)
        orderApiModule.getOrderInfoHisList({
            curPagerNo:toTop ? 1 : curPagerNo,
            pageSize
        }).then(res =>{
            setLoadding(false);
            if(res.data.code == 200){
                const data = res.data;
                if(data.result && data.result.page){
                    setTotal(data.result.page.totalPageNumber);
                    if(curPagerNo < data.result.page.totalPageNumber && !toTop){
                        setCurPagerNo(pre=>pre + 1);
                    } 
                    if(data.result.page.list){
                        if(curPagerNo > 1){
                            setOrderList((pre)=>[...pre,...data.result.page.list]);
                        }else{
                            setOrderList([...data.result.page.list]); 
                        }
                    }
                }
               
            }
        }) 
    }
    const renderProps = {lasyComponent,orderList,curPagerNo,pageSize,setCurPagerNo,getOrderList,loadding,total,setLoadding};
    return (
       <View style={styles.container}>
           <RenderList {...renderProps}/> 
       </View> 
    )
}