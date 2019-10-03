import request from './request';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export async function getIp() {
  let _getIp = await request('https://api.ipify.org?format=json');
  return _getIp.ip;
}

export function getDeviceInfo() {
  const DeviceDetector = require('device-detector-js');
  const deviceDetector = new DeviceDetector();
  const userAgent =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.81 Safari/537.36';
  const device = deviceDetector.parse(userAgent);
  return device;
}

export async function getObjectBody(params) {
  const { token, ip, fingerprint, refreshToken } = params;
  let _ip = ip ? ip : await getIp();
  let deviceInfo = getDeviceInfo();
  let prepareFingerprint = fingerprint
    ? fingerprint
    : {
        osName: deviceInfo.os.name,
        deviceType: deviceInfo.device.type,
        deviceBrand: deviceInfo.device.brand,
      };
  let _token = token ? token : checkExistToken();
  return {
    ip: _ip,
    fingerprint: prepareFingerprint,
    token,
    refreshToken,
  };
}

export function setCookie(object) {
  try {
    cookies.set('saveUserInfo', object, { path: '/' });
  } catch (error) {
    console.log('No save cookie', error);
  }
}

export function getCookieInfo() {
  let dataCookie = cookies.get('saveUserInfo');
  return dataCookie;
}
export function checkExistToken() {
  let getDataCookie = getCookieInfo();
  if (getDataCookie) {
    if (getDataCookie.token) return getDataCookie.token;
    else return undefined;
  } else return undefined;
}
