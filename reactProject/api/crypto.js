/**
 * 通过crypto-js实现 加解密工具
 * 加密方式为AES、HASH(MD5、SHA256)、base64
 */
import CryptoJS from 'crypto-js';
export function getAesString(data, key, iv) { // 加密
    key = CryptoJS.enc.Utf8.parse(key);
    iv = CryptoJS.enc.Hex.parse(iv);
    data = CryptoJS.enc.Utf8.parse(data);
    const encrypted = CryptoJS.AES.encrypt(data, key,
        {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    return encrypted.ciphertext.toString().toUpperCase(); 
}

export function getDAesString(encrypted, key, iv) { // 解密
    key = CryptoJS.enc.Utf8.parse(key);
    iv = CryptoJS.enc.Hex.parse(iv);
    const decrypted = CryptoJS.AES.decrypt(encrypted, key,
        {
            iv: iv,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
    return decrypted.ciphertext.toString(CryptoJS.enc.Utf8);
}

// AES 对称秘钥加密
export const aes = {
    en: (data, KP) => getAesString(data, KP.key, KP.iv),
    de: (data, KP) => getDAesString(data, KP.key, KP.iv)
};
// BASE64
export const base64 = {
    en: data => CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data)),
    de: data => CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8)
};
// SHA256
export const sha256 = data => CryptoJS.SHA256(data).toString();
// MD5
export const md5 = data => CryptoJS.MD5(data).toString();

/**
 * 签名
 * @param ssid 会话id
 * @param nonce 随机数
 * @param timestamp 签名时间戳
 */
export const sign = (KP, ssid, nonce, timestamp) => {
    const signsrc = ssid + nonce + timestamp;
    const aesEn = aes.en(signsrc, KP);
    const md5aesEn = md5(aesEn);
    return md5aesEn;
};
/* 登录密码加密 */
export const password = (KP, password) => {
    const aesPass = aes.en(password, KP);
    return aesPass;
};

/* 登录用户名加密 */
export const uname = (KP, username) => {
    const aesUser = aes.en(username, KP);
    return aesUser;
};
