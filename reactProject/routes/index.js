//渲染路由表
//页面
import Home from '../pages/home';
import Me from '../pages/me';
import Detail from '../pages/detail';
import OrderList from '../pages/orderList';
import DealList from '../pages/dealList';
import DealDetail from '../pages/dealDetail';
import Screen from '../pages/screen';
export const staticRoutes = [
    {
      name:'Home',
      component: Home,
      options:{
        title:'主页',
      } 
    },
    {
      name:'Me',
      component: Me,
      options:{
        title:'我的',
      }
    },
    {
      name:'Detail',
      component: Detail,
      options:{
        title:'骨架屏demo',
      }
    },
    {
      name:'OrderList',
      component: OrderList,
      options:{
        title:'分页接口demo',
      }
    },
    {
      name:'DealList',
      component: DealList,
      options:{
        title:'交易记录',
      }
    },
    {
      name:'DealDetail',
      component: DealDetail,
      options:{
        title:'交易详情',
      }
    },
    {
      name:'Screen',
      component: Screen,
      options:{
        title:'',
      }
    },
];