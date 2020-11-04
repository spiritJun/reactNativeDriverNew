import request from '../request'
//登录
export function getOrderInfoHisList(data){
    return request({
        url: '/order/getOrderInfoHisList',
        method: 'post',
        data
    })
}