// import { v4 as uuidV4 } from "uuid";

/**
 * 数组原型添加findLastIndex
 */
(Array.prototype as any)._jt_findLastIndex = function (callback) {
  try {
    if (!this) return; // 防止报错
    for (let i = this.length - 1; i >= 0; i--) {
      if (callback(this[i], i, this)) {
        return i;
      }
    }
    return -1;
  } catch {}
};

/**
 * 数组原型添加jimoTrackerPush，添加非空判断
 */
(Array.prototype as any)._jt_push = function (...args) {
  try {
    if (this && args[0]) {
      Array.prototype.push.apply(this, args);
    }
  } catch {}
};

/**
 * 替换url的指定参数，如果没有会新增
 * @param {*} url 需要处理的url
 * @param {*} name 参数名称
 * @param {*} value 替换的值
 */
export const replaceOrAddQueryString = (url, name, value) => {
  try {
    const re = new RegExp(name + "=[^&]*", "g");
    if (re.test(url)) {
      return url.replace(re, name + "=" + value);
    } else {
      return url + "&" + name + "=" + value;
    }
  } catch {}
};

/**
 * 获取url的指定参数
 * @param {*} name 参数名称
 * @param {*} url 需要处理的url,可不传
 */
export const getQueryString = (name: string, url = "") => {
  try {
    // 获取URL参数
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    const r = (url || window.location.search.substr(1)).match(reg); // 正则不匹配问号需去掉
    return r != null ? r[2] : "";
  } catch {}
  return "";
};

/**
 * 删除url的指定参数
 * @param {*} url 需要处理的url
 * @param {*} name 参数名称
 */
export const deleteQueryString = (url, name) => {
  try {
    const re = new RegExp("&?" + name + "=[^&]*", "g");
    return url.replace(re, "");
  } catch {}
};

/**
 * 设置当前会话指纹
 */
export const getUuid = () => {
  try {
    return "uuidV4";
    // return  uuidV4().replace(/-/g, '');
  } catch {}
};

// 按大数据要求对路径进行处理
export const getValidPath = (pathname: string = "") => {
  let newPathname = decodeURIComponent(pathname);

  // 兼容任务模块特殊路径
  if (newPathname.includes("/{")) {
    newPathname = newPathname.split("/{")[0];
  }
  // 将路径中的 /corpId/xxx/agentId/xxx 替换成 /
  return newPathname.replace(/\/corpId\/.*\/agentId\/\d*\//, "/");
};

// 生成 router key 源自 react-router v5
export const createKey = () => {
  return Math.random().toString(36).substr(2, 8);
};

// 拼接spm网址 url参数中不能有 / 否则微信分享会失败
export const getSpmUrl = ({
  url = location.href,
  shareType,
  shareDesc = "",
  userInfo = {},
}) => {
  const { openId = "" } = userInfo as any;
  let newUrl = url;
  newUrl = deleteQueryString(newUrl, "_jt_spm");
  newUrl = deleteQueryString(newUrl, "_jt_pageDesc");
  newUrl = replaceOrAddQueryString(
    newUrl,
    "_jt_inviterId",
    encodeURIComponent(openId)
  );
  newUrl = replaceOrAddQueryString(
    newUrl,
    "_jt_shareType",
    encodeURIComponent(shareType || "")
  );
  newUrl = replaceOrAddQueryString(
    newUrl,
    "_jt_time",
    encodeURIComponent(_jt_.sessionStore.firstShareTime || new Date().getTime())
  );
  // 注意 shareDesc 是 block_desc 和 button_desc 一起的
  newUrl = replaceOrAddQueryString(
    newUrl,
    "_jt_spm",
    encodeURIComponent(
      `${
        _jt_.options.spmPositionA
      }.${_jt_.getSpmPathName()}.${shareDesc}`.replace(
        new RegExp(/\//gi),
        "___"
      )
    )
  );
  if (_jt_.options.sdkVer === "v1.0.0") {
    newUrl = replaceOrAddQueryString(
      newUrl,
      "_jt_pageDesc",
      encodeURIComponent(
        _jt_.getOldPageDesc()?.replace(new RegExp(/\//gi), "___")
      )
    );
  } else {
    newUrl = replaceOrAddQueryString(
      newUrl,
      "_jt_pageDesc",
      encodeURIComponent(
        getValidPath(location.pathname).replace(new RegExp(/\//gi), "___")
      )
    );
    newUrl = replaceOrAddQueryString(
      newUrl,
      "_jt_pageTrack",
      encodeURIComponent(
        _jt_.getSpmPageTrack().replace(new RegExp(/\//gi), "___")
      )
    );
  }
  return newUrl;
};
