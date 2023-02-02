import { WECHAT_ENV } from "./constants";

// 判断当前是微信环境还是企业微信环境
export const getEnv = () => {
  if (process.client) return false;
  const ua = process.client.navigator?.userAgent.toLowerCase();
  // eslint-disable-next-line
  if (Boolean(ua?.match(/MicroMessenger/i)) && Boolean(ua?.match(/wxwork/i))) {
    // 企业微信
    // console.log('企业微信环境-1')
    return WECHAT_ENV.qyWechat;
    // eslint-disable-next-line
  } else if (Boolean(ua?.match(/micromessenger/i))) {
    // 微信
    // console.log('微信环境-2')
    return WECHAT_ENV.wechat;
  } else return 3;
};

/**
 * strapi 移除对象中自动创建的时间字段
 * @param obj
 * @returns
 */
export const removeTime = (obj) => {
  const { createdAt, publishedAt, updatedAt, ...params } = obj || {};
  Object.getOwnPropertyNames(params).forEach((item) => {
    if (typeof params[item] === "object") {
      if (Array.isArray(params[item])) {
        params[item] = params[item].map((item) => {
          return removeTime(item);
        });
      } else {
        params[item] = removeTime(params[item]);
      }
    }
  });
  return params;
};

/**
 * 移除属性和id
 * @param {*} obj
 * @returns
 */
export const removeAttrsAndId = (obj) => {
  const { attributes, id, ...params } = obj || {};
  const newObj = { ...attributes, ...params };
  Object.getOwnPropertyNames(newObj).forEach((item) => {
    if (typeof newObj[item] === "object") {
      if (Array.isArray(newObj[item])) {
        newObj[item] = newObj[item].map((item) => {
          return removeAttrsAndId(item);
        });
      } else {
        newObj[item] = removeAttrsAndId(newObj[item]);
      }
    }
  });
  return newObj;
};
