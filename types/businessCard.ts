import type { StaffCardGetCertificateGroupResponse } from './httpTypes/applet/staffCard/getCertificateGroup_get';

export type CertificateGroupType = Required<StaffCardGetCertificateGroupResponse>['retdata'];
export type CertificateListType = {
  /**
   * 证书类型名
   */
  name: string;
  /**
   * 证书编号
   */
  certificateNo: string;
  /**
   * 证书图片
   */
  picUrl: string;
}[];

/**
 * 顶部卡片信息modal
 */
export interface IHeaderCardType {
  // 姓名
  name: string;
  // 头像
  avatar: string;
  // 公司名称
  corpName: string;
  // 部门名称
  deptList: string[];
  // 职位名称
  position: string;
  // 手机号
  mobile: string;
  // 小站名称
  studio: string;
  // 微信
  contact: string;
  // 员工ID
  staffId: string;
  // 证书列表
  certificateList: CertificateListType;
}

/**
 * 页面名片信息model
 */
export interface IPageCardType {
  // 员工ID
  staffId: string;
  // 姓名
  name: string;
  // 头像
  avatar: string;
  // 公司名称
  corpName: string;
  // 部门名称
  deptList: string[];
  // 职位名称
  position: string;
  // 手机号
  mobile: string;
  // 地址
  address: string;
  // 个人证书列表
  certificateList: CertificateListType;
  // 个人简介
  desc: string;
  // 小站名称
  studio: string;
  // 微信
  contact: string;
  // 个人标签
  tagList: string[];
  // 企业自己上传的logo图片
  selfBigLogo: string;
  // 企业自己上传我的小站logo
  selfSmallLogo: string;
  // 公司logo
  corpLogo: string;
  // 公司logo 不是白色
  corpCompleteLogoUrl: string;
}

export interface StationGetStationNameRes {
  id?: number;
  corpId?: string;
  type?: number;
  customize?: string;
  isDeleted?: number;
  createBy?: string;
  dateCreated?: string;
  updateBy?: string;
  lastUpdated?: string;
  replaceCustomize?: string;
}

/**
 * 海报名片信息model
 */
export interface IPosterCardType {
  // 姓名
  name: string;
  // 头像
  avatar: string;
  // 公司名称
  corpName: string;
  // 部门名称
  deptList: string[];
  // 职位名称
  position: string;
  // 手机号
  mobile: string;
  // 地址
  address: string;
  // 证书列表
  certificateList: CertificateListType;
  // 名片二维码
  qrCodeUrl: string;
  /**
   * 证书展示方式
   */
  certificateShowType: 0 | 1;
  /**
   * 组合证书
   */
  certGroup: CertificateGroupType;
  /**
   * 自定义描述
   */
  desc: string;
}

export type IPageCardThemeType = {
  // 公司自定义上传背景
  backgroundColor: string;
  backgroundColor2: string;
  // icon颜色
  iconColor: string;
  // 前端字体色
  color: string;
  // 公司自定义上传背景
  backgroundImage: string;

  tagColor: string;
  tagFontColor: string;
  mainColor: string;
  isSetFontColor: boolean;
};
