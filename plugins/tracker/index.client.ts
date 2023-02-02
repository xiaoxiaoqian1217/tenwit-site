import Tracker from "./Tracker";
import queryString from "query-string";
import { getEnv } from "@/utils";
import "./mutationObserver";

export const jimoTrackerInit = () => {
  // const GIT_COMMIT = process.env.GIT_COMMIT || "";
  // const appVer = dayjs().format('YYYY-MM-DD') + '-' + GIT_COMMIT.slice(0, 8);
  const baseQuery = queryString.parseUrl(window.location.href)?.query; // 地址携带信息
  console.log(
    "%c [ baseQuery ]-9",
    "font-size:13px; background:pink; color:#bf2c9f;",
    baseQuery
  );

  // projectPath 目前取域名后的一级路径，如 /caizhi_webapp /caizhi-webapp-audit /caizhi-webapp-formal-pi 等
  const firstLevelPath = window.location.pathname.split("/")?.[1];
  const projectPath = firstLevelPath ? "/" + firstLevelPath : "/caizhi_webapp";
  const enableLog =
    process.env?.ENABLE_JIMO_TRACKER_SDK_LOG === "on" ||
    baseQuery?._enablelog === "on" ||
    "on";

  try {
    let instance = new Tracker({
      envName: process.env?.APP_ENV || "test", // 环境名称 dev,test,test2,test3,uat,gray,prod
      nodeEnv: process.env?.NODE_ENV || "production", // NODE_ENV production, development
      appVer: "v0", // 版本号
      projectPath, // 项目路径
      spmPositionA: "webapp", // spm模型A位项目名
      startSource: getEnv() === 1 ? "2" : "5", // TODO: 多种冷启动类型 未完成
      routerStackDelimiter: "|",
      sdkType: "h5",
      sdkVer: "v1.0.0", // v2.0.0 以上 page_desc page_track 分开，新加 page_title project_desc
      enableBodyClick: true, // 开启事件委托
      enableBlockExposure: true, // 开启模块曝光
      enableHideElementExposure: true, // 开启隐藏元素曝光
      enableTouchSlide: true, // 开启触摸滑动事件
      enableLog, // 是否开启日志,
    });

    if (enableLog) {
      console.log("===> jimo-tracker-sdk init success");
    }
    return instance;
  } catch {}
};
// const trackerInstance = jimoTrackerInit();

// console.log(
//   "%c [ trackerInstance ]-45",
//   "font-size:13px; background:pink; color:#bf2c9f;",
//   trackerInstance?.sendTracker
// );

export const trackerInstance = new Tracker({
  envName: process.env?.APP_ENV || "test", // 环境名称 dev,test,test2,test3,uat,gray,prod
  nodeEnv: process.env?.NODE_ENV || "production", // NODE_ENV production, development
  appVer: "v0", // 版本号
  projectPath: "1", // 项目路径
  spmPositionA: "webapp", // spm模型A位项目名
  startSource: getEnv() === 1 ? "2" : "5", // TODO: 多种冷启动类型 未完成
  routerStackDelimiter: "|",
  sdkType: "h5",
  sdkVer: "v1.0.0", // v2.0.0 以上 page_desc page_track 分开，新加 page_title project_desc
  enableBodyClick: true, // 开启事件委托
  enableBlockExposure: true, // 开启模块曝光
  enableHideElementExposure: true, // 开启隐藏元素曝光
  enableTouchSlide: true, // 开启触摸滑动事件
  enableLog: true, // 是否开启日志,
});
console.log(
  "%c [ trackerInstance ]-292",
  "font-size:13px; background:pink; color:#bf2c9f;",
  trackerInstance
);
export default defineNuxtPlugin(() => {
  return {
    provide: {
      sendTracker: (data) => trackerInstance?.sendTracker(data),
    },
  };
});
