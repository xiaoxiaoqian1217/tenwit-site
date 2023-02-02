// 登录用户上下文信息
export interface LoginContextInfo {
  openId: string;
  unionId: string;
  visitorId: string; // 访客 id
  mainId: string; // 合并账号后的访客 id
  staffId?: string; // 员工 id
  userId?: string; // 员工企业微信 userId
  userName?: string; // 用户昵称
  staffName?: string; // 员工姓名
  alias?: string; // 员工别名
  visitorImg?: string; // 访客头像
  isYetAuth?: string; // 用户是否同意授权 0-未同意，1-已同意
  hideConsumerFun?: number;
  closeContact?: number; // 客户联系开关 0-打开，1-关闭
  closeGroupShare?: number; // 群分享开关 0-打开，1-关闭
  closeConsumerTag?: number; // 客户标签开关 0-打开，1-关闭
}

// 用户公共属性
export interface UserProps {
  identity: string; // 用户身份，SELF-自己的个人/企业微信，COLLEAGUE-同事，OTHER-其他
  distinctId: string; // 设备 id
  isLogin?: boolean; // 是否登录
  customerType?: string; // 客户类型，CORP_STAFF-企业员工，CUSTOMER-客户，POTENTIAL_CUSTOMER-潜在客户，VISIT_CUSTOMER-游客
}

// 微信用户信息
export interface WxUserInfo {
  openId: string;
  unionId: string;
  id?: string; // 用户id
  nickName?: string; // 用户昵称
  pinyin?: string; // 昵称拼音
  mobile?: string; // 没有区号的手机号
  phoneNumber?: string; // 用户绑定的手机号（国外手机号会有区号）
  countryCode?: string; // 区号
  gender?: number; // 性别，0-未定义，1-男性，2-女性
  avatar?: string; // 头像url
  city?: string; // 所属城市
}

// 当前登录用户信息
export interface UserInfo extends LoginContextInfo, UserProps, WxUserInfo {}
