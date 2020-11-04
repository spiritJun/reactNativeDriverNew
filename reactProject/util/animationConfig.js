export default {
    animation: 'timing',
    config: {
        duration:300
    },
}
/**
 * timing:{
 *   duration: 动画的持续时间（毫秒）。默认值为 500.
     easing: 缓动函数。 默认为Easing.inOut(Easing.ease)。
     delay: 开始动画前的延迟时间（毫秒）。默认为 0.
     isInteraction: 指定本动画是否在InteractionManager的队列中注册以影响其任务调度。默认值为 true。
     useNativeDriver: 启用原生动画驱动。默认不启用(false)。
 * }
   spring:{
     friction: 控制弹性/幅度。默认值 7。
     tension: 控制速度。默认值 40.
     speed: 控制动画速度。默认值 12.
     bounciness: 控制弹性。默认值 8.
     stiffness：弹簧刚度系数。默认值100。
     damping：定义由于摩擦力应如何阻尼弹簧的运动。默认值10。
     mass：附着在弹簧末端的物体的质量。默认值1。
     velocity：附着在弹簧上的物体的初始速度。默认值为0（对象处于静止状态）。
     overshootClamping：布尔值，指示是否应夹紧弹簧而不反弹。默认为false。
     restDisplacementThreshold：静止位置的位移阈值，低于此阈值应考虑弹簧处于静止状态。默认值0.001。
     restSpeedThreshold：应该以每秒像素数为单位考虑弹簧静止的速度。默认值0.001。
     delay：延迟（毫秒）后开始动画。默认值0。
     isInteraction：指定本动画是否在InteractionManager的地下中注册以影响其任务调度。替换为true。
     useNativeDriver：启用原生动画驱动。暂时不启用（false）。
   }
 *  
 * 
 * 
 * 
 */