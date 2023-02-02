export const TIPS_SHOW_TIME = '2020-12-02 00:00:00';

// 业务中有引用到，于是提取出来
export const CORP_ID_JIANGYIN = 'wwad758ffe1ebca931'; // 江阴农商银行
export const CORP_ID_XIAMEN = 'ww9d09288d837bf4da'; // 厦门银行
export const CORP_ID_DEV = 'wwc8b0e2b9d33c6340'; // 新皓信息  dev
export const CORP_ID_TEST = 'ww8c83d949a80b562d'; // 新翰信息咨询合伙企业  test
export const CORP_ID_TEST2 = 'ww29ca23e4addefa92'; // 新皓                test2
export const CORP_ID_UAT = 'ww2c6ff24bf8608b5b'; // 新翰信息            uat
export const CORP_ID_TEST3_1 = 'ww9038af1337f90eaa'; // test3
export const CORP_ID_TEST3_2 = 'ww03a52391aa4bafdb'; // test3
export const CORP_ID_CHINA_BANK = 'wwbeea07437d5961e6'; // 中国银行
export const CORP_ID_MIN_SHENG = 'ww51ab38ddb9f7f60d'; // 民生银行
export const CORP_ID_TYXX = 'wwbff7045d42600f88'; // 腾银信息

// 测试2、腾银、光大显示小站tab
export const STATION_SHOW_TAB_WHITE_LIST = [
  'wwae9c3475c024f743',
  'ww535912ccc9fb5be5',
  'ww7726587648cdc3da',
  CORP_ID_CHINA_BANK,
];

// 活动类型obj
export const BANNER_TYPE = {
  article: 0,
  product: 1,
  link: 2,
  picture: 3,
  miniPro: 4,
};

// 弹窗类型
export const POPUP_TYPE = {
  article: 0,
  product: 1,
  link: 2,
  picture: 3,
  miniPro: 4,
};

// 活动底部按钮跳转类型obj
export const BANNER_BTN_TYPE = {
  link: 0,
  miniPro: 1,
};

export const WECHAT_ENV = {
  qyWechat: 1, // 企业微信
  wechat: 2, // 微信
};

export const AJAX_CODE = {
  productDown: 1010089, // 产品删除、下架
  articleDown: 50020001, // 文章删除
  activityDown: 1010090, // 活动删除
  livingDown: 1010099, // 直播下架、删除
};

export enum PAPER_TYPE {
  old = 1, // 经典版 旧版
  new = 2, // 新闻版 新版
}

export const JYKL_CORPIDS = ['ww1f6a463934da5458', 'wx09c7b557e3f3691f'];

// 资讯专题里的资讯类型
export const RESOURCE_TYPE = {
  article: 'NEWS',
  topic: 'INTERACT_TOPIC',
};

// 话题类型
export const TOPIC_TYPE = {
  optional: 'optional', // 单选类型
  pk: 'pk', // 辩论类型 pk
};

// PC端企业微信 在推产品、发咨询、每日早报中支持转发（群发客户、群发客户群两种分享方式）的企业id集合
export const SUPPORT_FORWARD_PC_QYWECHAT_CORP_IDS = [
  CORP_ID_DEV, // 开发环境
  'ww8c83d949a80b562d', // 新翰信息咨询合伙企业-test
  // 'wwbff7045d42600f88', // 腾银信息-test
  'ww29ca23e4addefa92', // 新皓-test2
  'ww2c6ff24bf8608b5b', // 新翰信息-uat
  'ww535912ccc9fb5be5', // 腾银-正式
  /* -------------------------------------------------- */
  'ww5f03d548ea0cdb35', // 宁波银行
];

// 关联产品的类型
export const RELATE_PRODUCT_TYPE = {
  article: 'article', // 文章
  paper: 'paper', // 早报
  articleTopic: 'newsSubject', // 资讯专题
};

// 朋友圈内容类型及其对应的icon
export const MOMENTS_TYPE = {
  pic: 2, // 图片、海报，1-9张图,
  text: 1, // 纯文本
  link: 3, // 资讯（链接）
  video: 4, // 视频(链接)
};
export const MOMENTS_TYPE_TEXT = {
  1: '文本',
  2: '海报',
  3: '资讯',
  4: '视频',
};

// 小站界面类型
export const STATION_TYPE = {
  card: '1', // 名片版
  withBg: '2', // 头图版(头图就是背景图)
  customize: '3', // 广州银行定制版
};

// 功能配置白名单
export const SCRAP_DATA_IS_IN_WHITE_LIST = {
  PRODUCT_PREHEAT_SETTTING: 'PRODUCT_PREHEAT_SETTTING', // 产品预热设置开关
  POSTER_QRCODE_PROMPT: 'POSTER_QRCODE_PROMPT', // 海报配置产品二维码下的提示文字配置
  LIVE_PREHEAT_SETTTING: 'LIVE_PREHEAT_SETTTING', // 直播白名单
};

export enum PRODUCT_TYPE {
  /**
   * 理财类产品
   */
  FinancialProducts = 1,

  /**
   * 其他类产品
   */
  Others,

  /**
   * 实物类产品
   */
  PhysicalProducts,
}

// 海报类型 0:视频  1:图片
export const POSTER_TYPE = {
  video: 0,
  pic: 1,
};

export enum CardLayoutPattern {
  /**
   * 商务版
   */
  BusinessVersion,
  /**
   * 现代版
   */
  ModernVersion,
}

export enum SideBarType {
  /**
   * 话术
   */
  sentence,
  /**
   * 文件
   */
  file,
}

/**
 * 点击前往办理时，当前的分享渠道来源
 */
export const SHARE_CHANNEL_TYPE = {
  '1': 'FORWARD',
  '2': 'WECHAT_FRIENDS',
  '3': 'WECHAT_MOMENTS',
  '11': 'QW_WECHAT_MOMENTS',
  '4': 'MASS_CUSTOMER',
  '5': 'MASS_CUSTOMER_BASE',
};

export const CUSTOMER_RECORD_TYPE = {
  chatMeInProduct: 40, // 产品详情页联系我
};
