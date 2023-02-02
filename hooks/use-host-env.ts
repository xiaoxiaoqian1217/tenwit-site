import { HostEnv, Platform } from "@/types";

// 获取当前运行环境
export const useHostEnv = () => {
  if (process.client) return false;
  const ua: string = process.client?.navigator.userAgent.toLowerCase();
  let currentHostEnv: HostEnv = HostEnv.OTHER;
  let platform = Platform.OTHER; // 操作系统平台

  if (Boolean(ua.match(/MicroMessenger/i)) && Boolean(ua.match(/wxwork/i))) {
    // 企业微信
    currentHostEnv = HostEnv.QYWX;
  } else if (ua.match(/micromessenger/i)) {
    // 微信
    currentHostEnv = HostEnv.WX;
  } else {
    // 其它
    currentHostEnv = HostEnv.OTHER;
  }

  if (ua.match(/\(i[^;]+;( u;)? cpu.+mac os x/)) {
    platform = Platform.IOS;
  } else if (ua.indexOf("Android") > -1 || ua.indexOf("Adr") > -1) {
    platform = Platform.ANDROID;
  } else {
    platform = Platform.OTHER;
  }
  return {
    currentHostEnv,
    platform,
  };
};
