import request from '../request'
//登录
export function login(data){
    return request({
        url: '/driverUserController/login',
        method: 'post',
        data
    })
}
//退出登录
export function logout(data){
    return request({
        url: '/driverUserController/logout',
        method: 'post',
        data
    })
}
//发送验证码
export function sendVerifyCodeRegist(data){
    return request({
        url: '/driverUserController/sendVerifyCodeRegist',
        method: 'post',
        data
    })
}
//司机验证码登陆
export function loginVerifyCode(data){
    return request({
        url: '/driverUserController/loginVerifyCode',
        method: 'post',
        data
    })
}
//我的资料
export function refreshMe(data){
    return request({
        url: '/driverUserController/refreshMe',
        method: 'post',
        data
    })
}
// 支付密码验证
export function verifyPayPassword(data){
    return request({
        url: '/accountAction/verifyPayPassword',
        method: 'post',
        data
    })
}
