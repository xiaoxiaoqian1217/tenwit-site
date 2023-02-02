/* eslint-disable camelcase */
import type { MainObj, Data, Options, SessionStore, ShareObj } from "./data";
import { initFromUrl, initFromStorage, setDeviceId } from "./init";
// import { initFromUrl, initFromStorage, setDeviceId } from "./init";
// import Router from "./router";
import {
  createBodyClick,
  createWindowUnload,
  createDocumentVisibilityChange,
} from "./event";

// import { getValidPath } from "./utils";
class Tracker {
  private _mainObj: MainObj; // 请求对象
  private readonly _options: Options; // 配置参数
  private _shareObj: ShareObj | null; // 从网址获取分享参数
  private _shareObjUsed: number; // 分享来源_shareObj已使用次数
  public refreshBlockExposure: any; // 刷新模块曝光
  public refreshHideElementExposure: any; // 刷新隐藏元素曝光
  private _touchStartClientY: number; // 触摸滑动事件clientY
  public router: any; // 路由对象
  public needNewRouter: Array<any>; // 新开路由条件
  public sessionStore: SessionStore; // sdk存储到sessionStorage数据
  public curSpmObj: any; // 临时smp对象
  constructor(options: Options) {
    this._mainObj = {
      env_name: options.envName, // dev,test,test2,test3,uat,gray,prod
      device_id: "", // 浏览器设备id
      open_id: "",
      union_id: "",
      user_id: "", // 企微后台用户userId
      main_id: "", // 我们后台区别用户
      user_type: "", // 用户类型：企业员工、企业客户、潜在客户、游客
      identity: "", // 身份类型 非同事，同事，员工自己
      corp_id: "",
      staff_id: "",
      sdk_type: options.sdkType, // sdk类型
      sdk_ver: options.sdkVer, // sdk版本
      app_ver: options.appVer, // 日期+hash
      app_sub_ver: "", // 子版本
      start_source: options.startSource, // 入口
      session_id: "", // 会话id
      sub_session_id: "", // 隐藏后重新显示 会话子id
      event_type: "", // 事件类型
      project_desc: options.projectPath, // 项目路径
      page_desc: "", // 当前页面路径
      block_desc: "", // 模块
      button_desc: "", // button
      page_track: "", // 访问过的历史路径链，真正上报前要处理 projectPath 和路径参数
      page_title: "", // 页面名称
      parameters: {}, // 附加参数
    };
    this._options = options;
    this._shareObj = null; // 从网址获取分享参数
    this._shareObjUsed = 0; // 分享来源_shareObj已使用次数
    this._touchStartClientY = 0;
    // this.router = new Router(this);
    // 当跳到这些路由中时需要清空上报路由栈
    // TODO: 1. 如果中间有正常页面跳转到这些页面清空路由栈是不合理的，应该从 tab 跳到这些页面的加个特殊参数，有这些特殊参数的清空路由栈，没有的按正常处理
    // TODO: 2. PC 已知问题，如果从首页跳至其他页如 B 页，然后返回再跳至下边页，再点前进，会跳到 B 页，正常进下边页应清空当前页以后的历史记录，由于移动端没有前进按钮，该问题可以先不解决
    this.needNewRouter = [
      "/caizhi_webapp/home",
      "/caizhi_webapp/customerManage",
      "/caizhi_webapp/managerStation",
      "/caizhi_webapp/clientStation",
    ];
    this.sessionStore = {}; // sdk存储到sessionStorage数据
    this.curSpmObj = null;
    // this.refreshBlockExposure = refreshBlockExposure.bind(this);
    // this.refreshHideElementExposure = refreshHideElementExposure.bind(this);
    this._init();
  }

  /**
   * 初始化
   */
  private async _init() {
    initFromStorage(this); // 初始化顺序会覆盖
    initFromUrl(this);
    // this.router.init(); // 在storage初始化后
    // await setDeviceId(this);
    createDocumentVisibilityChange(this);
    createWindowUnload(this);
    this._options.enableBodyClick && createBodyClick(this);
    // this._options.enableBlockExposure && createBlockExposure(this);
    // this._options.enableHideElementExposure && createHideElementExposure(this);
  }

  public get options() {
    return this._options;
  }

  /**
   * 触摸滑动事件touchStart
   */
  public touchStart = (e) => {
    try {
      if (!this._options.enableTouchSlide) return;
      this._touchStartClientY = e.touches[0]?.clientY;
    } catch {}
  };

  /**
   * 触摸滑动事件touchEnd
   */
  public touchEnd = (e, dom, data: Data) => {
    try {
      if (!this._options.enableTouchSlide) return;
      if (
        Math.abs(e.changedTouches[0]?.clientY - this._touchStartClientY) > 50
      ) {
        let scrollTop = dom.scrollTop;
        if (scrollTop === 0 && dom.style.transform) {
          // 当是transform滑动，获取Y轴数值
          scrollTop = Math.abs(
            parseInt(dom.style.transform?.split(",")[1]?.split("px")[0])
          );
        }
        this.sendTracker({
          ...data,
          parameters: { ...data.parameters, scrollTop },
        });
      }
    } catch {}
  };

  /**
   * 设置埋点数据方法
   */
  public setData(obj: MainObj) {
    try {
      this._mainObj = {
        ...this._mainObj,
        ...obj,
        parameters: { ...this._mainObj.parameters, ...obj.parameters },
      };
    } catch {}
  }

  /**
   * 冷启动发送埋点
   */
  public coldStart() {
    try {
      if (this._mainObj?.start_source) {
        if (this._options.enableLog) {
          console.log(`jimo-tracker cold_start`);
        }
        this.sendTracker({
          event_type: "cold_start",
          block_desc: "",
          button_desc: "",
          parameters: {},
        });
      }
    } catch {}
  }

  /**
   * 获取当前路径
   */
  public getSpmPathName() {
    try {
      // return getValidPath(location.pathname).slice(this._mainObj?.project_desc?.length).slice(1);
    } catch {}
    return "";
  }

  // v2 版获取来源路径
  public getSpmPageTrack() {
    return this._mainObj.page_track;
  }

  // v1 版获取来源路径
  public getOldPageDesc() {
    try {
      let pageDesc = this._mainObj.project_desc;
      this._mainObj.page_track
        ?.split(this._options.routerStackDelimiter)
        .forEach((item: any) => {
          pageDesc =
            pageDesc +
            getValidPath(item.slice(this._mainObj?.project_desc?.length));
        });
      return pageDesc;
    } catch {}
    return "";
  }

  /**
   * 拦截发送请求，spm信息是否带入下个url
   */
  private _interceptSendTracker(data: Data) {
    try {
      if (data.type === "clickAndSpm") {
        this.curSpmObj = data;
        return true;
      } else if (data.type === "spm") {
        this.curSpmObj = data;
        return false;
      } else {
        this.curSpmObj = null;
        return true;
      }
    } catch {}
  }

  /**
   * 自定义埋点上报方法
   */
  public async sendTracker(data: Data) {
    try {
      // 不登陆暂时不上报+拦截发送请求
      // if (!this._mainObj.open_id || !this._interceptSendTracker(data)) {
      //   if (this._options.enableLog) {
      //     console.log(`sendTracker 上报被拦截`);
      //   }
      //   return;
      // }
      delete data.type; // 删除type策略类型字段
      delete data.page_desc; // 删除page_desc字段
      if (!data.parameters) {
        data.parameters = {};
      }

      // 一期临时来源方案，业务里未删除，所以保留
      if (data.parameters.enterBtnTargetPath) {
        delete data.parameters.enterBtnTargetPath;
      }
      if (
        this._shareObj &&
        (data.event_type === "cold_start" || data.event_type === "page_exp")
      ) {
        // 使用分享来源参数
        data.parameters = {
          ...data.parameters,
          ...this._shareObj,
        };
        this._shareObjUsed++;
        if (this._shareObjUsed >= 2) {
          this._shareObj = null;
        }
      }
      if (!this._mainObj.device_id) {
        // await setDeviceId(this);
      }
      const trackData: any = {
        ...this._mainObj,
        ...data,
        parameters: {
          ...this._mainObj.parameters,
          ...data.parameters,
        },
      };

      // v1.0.0 使用老的埋点字段 page_desc 包括路由栈和当前路由，v1.0.0 以后 page_desc 只存当前页路径、路由栈存在 page_track、增加 page_title、project_desc 参数
      if (this.options.sdkVer === "v1.0.0") {
        trackData.page_desc = this.getOldPageDesc();
        delete trackData.sdk_ver;
        delete trackData.project_desc;
        delete trackData.page_track;
        delete trackData.page_title;
      } else {
        // trackData.page_desc = getValidPath(this._mainObj.page_desc);
        trackData.page_title = document.title;
      }

      if (this._options.enableLog) {
        console.log(`trackData`, JSON.stringify(trackData, null, 2));
      }
      if (this._options.nodeEnv === "production") {
        // 本地调试不上报，
        // TODO: 请求方法对比与封装js
        // 1、神策由默认原来image方式改成navigator.sendBeacon，我们也采用此方式，添加兼容低版本
        // 2、新建skd项目，用rollup打包全局iife格式js文件
        window.trackInfo && window.trackInfo(trackData);
      }
    } catch (e) {
      console.error("track info: ", e);
    }
  }
}

export default Tracker;

// objId可考虑sdk获取
