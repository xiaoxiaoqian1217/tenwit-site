/* eslint-disable camelcase */
export interface MainObj {
  env_name?: string; // dev,test,test2,test3,uat,gray,prod
  device_id?: string; // 设备浏览器id
  open_id?: string;
  union_id?: string;
  user_id?: string; // 企微后台用户userId
  main_id?: string; // 我们后台区别用户
  user_type?: string; // 用户类型：企业员工、企业客户、潜在客户、游客
  identity?: string; // 身份类型 非同事，同事，员工自己
  corp_id?: string;
  staff_id?: string;
  sdk_type?: string; // sdk类型
  sdk_ver?: string; // sdk版本
  app_ver?: string; // 日期+hash
  app_sub_ver?: string; // 子版本
  start_source?: string; // 入口
  session_id?: string; // 会话id
  sub_session_id?: string; // 隐藏后重新显示 会话子id
  event_type?: string; // 事件类型
  project_desc?: string; // 项目
  page_desc?: string; // 当前页面路径
  block_desc?: string; // 模块
  button_desc?: string; // button
  page_track?: string; // 页面访问历史
  page_title?: string; // 页面名称
  parameters?: any; // TODO: 附加参数完善类型信息
}

export interface Data {
  type?: string; // type策略类型 click clickAndSpm clickSpm
  event_type: string; // 事件类型
  page_desc?: string; // 页面路径
  block_desc?: string; // 模块
  button_desc?: string; // 块
  parameters?: any;  // TODO: 附加参数完善类型信息
}

export interface ShareObj {
  inviter_id: string;
  share_type: string;
  t: string;
  from_page_desc: string;
  from_block_desc: string;
  from_button_desc: string;
  from_page_track?: string;
}

export interface Options {
  envName: string; // 环境名称 dev,test,test2,test3,uat,prod
  nodeEnv: string; // 环境变量 production,development
  appVer: string; // 版本号
  projectPath: string; // 项目路径
  spmPositionA: string; // spm模型A位项目名
  startSource: string; // 入口
  routerStackDelimiter: string; // 上报历史路由栈分隔符
  sdkType: string; // sdk 类型，目前只有 h5
  sdkVer: string; // sdk 版本，v1.0.0
  enableBodyClick: boolean; // 开启事件委托
  enableBlockExposure: boolean; // 开启模块曝光
  enableHideElementExposure: boolean; // 开启隐藏元素曝光
  enableTouchSlide: boolean; // 开启触摸滑动事件
  enableLog: boolean; // 是否开启日志
}

export interface SessionStore {
  routerStack?: Array<any>; // 路由栈
  routerIndex?: number; // 路由指针
  startSource?: string; // 入口
  channelType?: string; // 后端消息类型
  firstShareTime?: string; // 分享时间
  sessionId?: string; // 会话id
}
