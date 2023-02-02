export type KeyProductItemType = {
  name: string;
  category: string;
  fundType: string;
  otherTag: string[];
  incomeRate: string;
  desc: string;
  id: string;
  shareCount: number;
};

// vant Tabs onchange/click-tab事件参数
export type TabsOnChangeType = { name: number; title: string };
export type TabsClickTabType = TabsOnChangeType & { event: MouseEvent; disabled: boolean };

export type PosterItemType = {
  /**
   * 海报ID
   */
  posterId?: number;
  /**
   * 海报标题
   */
  posterTitle?: string;
  /**
   * 封面URL，跟之前url取值保持一致（形式为逗号分隔的url字符串）
   */
  postCoverUrl?: string;
};

export type VideoItemType = {
  /**
   * 主键id
   */
  id?: number;
  /**
   * 视频id
   */
  videoId?: number;
  /**
   * 视频名称
   */
  videoName?: string;
  /**
   * 视频介绍
   */
  videoDesc?: string;
  /**
   * 视频封面
   */
  videoCoverUrl?: string;
  /**
   * 分类名称
   */
  categoryName?: string;
  /**
   * 角色
   */
  roleId?: number;
  /**
   * 创建人
   */
  createBy?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 排序号
   */
  rank?: number;
  /**
   * 视频地址URL
   */
  videoUrl?: string;
};
export type LiveItemType = {
  /**
   * 主键ID
   */
  id: number;
  /**
   * 直播id
   */
  livebroadId: number;
  /**
   * 直播主题
   */
  livingTheme: string;
  /**
   * 机构
   */
  organiser: string;
  /**
   * 描述
   */
  livingDesc: string;
  /**
   * 机构图
   */
  organiserImage: string;
  /**
   * 开始时间
   */
  beginDate: string;
  /**
   * 结束时间
   */
  endDate: string;
  /**
   * 是否回放
   */
  isReplay: number;
  /**
   * 推广图
   */
  popularizeImage: string;
  /**
   * 分享图
   */
  shartImage: string;
  /**
   * 海报图
   */
  posterImage: string;
  /**
   * 直播状态
   */
  livingStatus: number;
  /**
   * 是否预约申请 0 否 1 是
   */
  isApplication: number;
  /**
   * 预约申请模版ID
   */
  bookingFormTemplateId?: number;
  /**
   * 开播预告时间
   */
  liveTrailerTime?: string;
  /**
   * 权重
   */
  weight?: number;
  /**
   * 直播权限   0全员 1内部
   */
  liveRevealAuth?: number;
};

export type ArticleItemType = {
  /**
   * 资讯id
   */
  newsId?: string;
  publishTime?: string;
  title?: string;
  openCnt?: number;
  /**
   * 是否推荐
   */
  mustSend?: boolean;
  cover?: string;
  sendCnt?: number;
  originalCreator?: string;
  summary?: string;
  originalNewsUrl?: string;
  externalType?: number;
  /**
   * 标签集合
   */
  tagList?: string[];
  tags?: string;
};

export type FileItemType = {
  /**
   * 素材id
   */
  materialId: string;
  /**
   * 素材标题
   */
  title: string;
  /**
   * 素材类别
   */
  materialType: string;
  /**
   * 是否对外可见
   */
  opened: boolean;
  /**
   * 素材信息
   */
  infoResVOList: {
    /**
     * 文件名称
     */
    name: string;
    /**
     * url
     */
    url: string;
    /**
     * 文件大小
     */
    size: number;
  }[];
  createTime: string;
};

export type MarketTabType = {
  id?: number | string;
  categoryName?: string;
  createBy?: string;
  rank?: string;
  categoryId?: string;
}[];

export type BannerItemType = {
  /**
   * banner ID
   */
  bannerId?: number;
  /**
   * banner名称
   */
  bannerName?: string;
  /**
   * banner图片地址
   */
  bannerImgUrl?: string;
  /**
   * 横幅类别 0 文章 1 产品 2 网页URL  3 活动图片 4 小程序
   */
  type?: number;
  /**
   * 文章、产品的id，根据type决定
   */
  objId?: string;
  /**
   * 网页链接
   */
  newsURL?: string;
  /**
   * 小程序原始ID
   */
  appletSourceId?: string;
  /**
   * 小程序appID
   */
  appletAppId?: string;
  /**
   * 小程序跳转路径
   */
  appletPath?: string;
  /**
   * 小程序跳转参数
   */
  appletParam?: string;
};
