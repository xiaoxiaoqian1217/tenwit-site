/* eslint-disable camelcase */
// import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { getQueryString, getUuid } from "./utils";

/**
 * 初始化从Storage获取参数
 */
export const initFromStorage = (ctx: any) => {
  try {
    ctx.sessionStore = JSON.parse(
      sessionStorage.getItem("jimoTrackerSessionStore") || "{}"
    );
    if (ctx.sessionStore.sessionId) {
      ctx._mainObj.session_id = ctx.sessionStore.sessionId;
    } else {
      const sessionId = getUuid();
      ctx._mainObj.session_id = sessionId;
      ctx.sessionStore.sessionId = sessionId;
    }
    ctx._mainObj.parameters.channel_type = ctx.sessionStore.channelType;
    if (ctx.sessionStore.startSource) {
      ctx._mainObj.start_source = ctx.sessionStore.startSource;
    }
    const routerStack = ctx.sessionStore.routerStack || [];
    const routerIndex = ctx.sessionStore.routerIndex || 0;
    // 只有当前页面刷新，才从 sessionStore 恢复路由栈数据，否则就重新开始
    if (routerStack[routerIndex].key === history.state?._jm_key) {
      ctx.router.routerStack = routerStack;
      ctx.router.routerIndex = routerIndex;
    } else {
      ctx.router.routerStack = [];
      ctx.router.routerIndex = 0;
      ctx.sessionStore.routerStack = [];
      ctx.sessionStore.routerIndex = 0;
    }
  } catch {}
};

/**
 * 初始化从网址获取参数
 */
export const initFromUrl = (ctx: any) => {
  try {
    const channelType =
      decodeURIComponent(getQueryString("channel_type")) || undefined; // 后端消息类型
    const inviterId =
      decodeURIComponent(getQueryString("_jt_inviterId")) || undefined;
    const shareType =
      decodeURIComponent(getQueryString("_jt_shareType")) || undefined;
    const time = decodeURIComponent(getQueryString("_jt_time")) || undefined;
    const pageDesc =
      decodeURIComponent(getQueryString("_jt_pageDesc")) || undefined;
    const pageTrack =
      decodeURIComponent(getQueryString("_jt_pageTrack")) || undefined;
    const spm: any = decodeURIComponent(getQueryString("_jt_spm")) || undefined;
    const spmArr = spm ? spm.replace(new RegExp(/___/gi), "/").split(".") : [];
    const obj: any = {
      inviter_id: inviterId,
      share_type: shareType,
      t: time,
      from_page_desc: pageDesc && pageDesc.replace(new RegExp(/___/gi), "/"),
      from_block_desc: spmArr[2],
      from_button_desc: spmArr[3],
    };

    // v2.0 以上才有 from_page_track，如果有 v3.0 这里条件记得细化，不能简单的 !== 'v1.0.0'
    if (ctx.options.sdkVer !== "v1.0.0") {
      obj.from_page_track =
        pageTrack && pageTrack.replace(new RegExp(/___/gi), "/");
    }

    ctx._shareObj = obj;
    if (time) {
      ctx.sessionStore.firstShareTime = time;
    }
    if (channelType) {
      ctx._mainObj.parameters.channel_type = channelType;
      ctx.sessionStore.channelType = channelType;
    }

    // TODO: startSource 不该和 shareType 混用，要和大数据沟通独立出来
    if (shareType) {
      ctx._mainObj.start_source = shareType;
      ctx.sessionStore.startSource = shareType;
    }
  } catch {}
};

/**
 * TODO: 设置当前设备浏览器指纹，deviceId为空率低于0.5%，与官方宣称的99.5%符合，如果想更好，可考虑收费版或者其他库
 */
export const setDeviceId = async (ctx: any) => {
  try {
    // const fpPromise = FingerprintJS.load();
    // const fp = await fpPromise;
    // const result = await fp.get();
    // ctx._mainObj.device_id = result.visitorId;
    ctx._mainObj.device_id = "device_id";
    if (ctx?._options?.enableLog) {
      // console.log("setDeviceId ===>", result);
    }
  } catch {}
};
