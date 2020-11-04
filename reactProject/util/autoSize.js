/**
 * ui设计基准,iphone 6
 * width:750
 * height:1334
 */
import {
    PixelRatio,
    Dimensions,
    Platform,
    //即将废弃 AsyncStorage
} from 'react-native';
export let screenW = Dimensions.get('window').width;
export let screenH = Dimensions.get('window').height;
const fontScale = PixelRatio.getFontScale();
export let pixelRatio = PixelRatio.get();
//像素密度
export const DEFAULT_DENSITY = 2;
//px转换成dp
//以iphone6为基准,如果以其他尺寸为基准的话,请修改下面的defaultWidth和defaultHeight为对应尺寸即可. 以下为1倍图时
const defaultWidth = 375;
const defaultHeight = 667;
const w2 = defaultWidth / DEFAULT_DENSITY;
//px转换成dp
const h2 = defaultHeight / DEFAULT_DENSITY;

//缩放比例
const _scaleWidth = screenW / defaultWidth;
const _scaleHeight = screenH / defaultHeight;

// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;
/**
 * 设置text为sp
 * @param size sp
 * return number dp
 */
//fontSize适配
export function setSpText(size,allowFontScaling = false) {
    const scale = Math.min(_scaleWidth, _scaleHeight);
    const fontSize = allowFontScaling ? 1 : fontScale;
    return size * scale / fontSize - 2;
}
export function scaleSize(size) {
    let scaleWidth = screenW / w2;
    let scaleHeight = screenH / h2;
    let scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round((size * scale + 0.5));
    return size / DEFAULT_DENSITY - 2;
}
export function scaleHeight(size) {
    return size * _scaleHeight - 2;
}