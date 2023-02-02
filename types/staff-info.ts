// 经理信息
export interface StaffInfo {
  userId: string; // 企业微信 userId
  staffId: string; // 员工 id
  name: string; // 姓名
  avatar: string; // 头像
  qrCode: string; // 员工个人二维码
  email?: string; // 邮箱
  mobile?: string; // 手机号
  telephone?: string; // 座机
  businessType?: number; // 客户经理的业务类型
  address?: string; // 地址
  addressShow?: boolean; // 地址是否展示
  desc?: string; // 描述
  descShow?: boolean; // 描述是否显示
  qrCard?: string;
  qrCardShow?: boolean;
  phone?: string; // 手机号 TODO 用哪个手机号字段？
  phoneShow?: boolean; // 手机号是否展示（企业级开关）
  phoneShowCard?: boolean; // 手机号是否在卡片展示（员工级开关）
  corpName?: string; // 企业名称
  corpNameShow?: boolean; // 企业名称是否展示
  position?: string; // 岗位名称
  positionShow?: boolean; // 岗位名称是否展示
  fatherDept?: string; // 上级部门
  fatherDeptShow?: boolean; // 上级部门是否展示
  dept?: string; // 部门名称
  deptShow?: boolean; // 部门名称是否展示
  corpSelfUploadLogoUrl?: string; // 企业自己上传的logo图片
  corpSelfUploadSmallLogoUrl?: string; // 企业自己上传我的小站logo
  corpCompleteLogoUrl?: string; // 企业完整logo
  corpWhiteCompleteLogoUrl?: string; // 企业白色版完整logo
  corpPhotoLogoUrl?: string; // 企业图形logo
  staffClient?: boolean;
  collection?: boolean; // 是否收藏，用户视图会用到
  manager?: boolean; // 是不是我的客户经理，用户视图会用到
  tagList?: string[]; // 客户经理标签
  jobDesc?: string; // 职业亮点描述
  editQrCodeAndDesc?: boolean; // 编辑二维码和描述说明开关
  corpNameInHead?: boolean; // 机构名是否在页首
  deptInHead?: boolean; // 部门是否在页首
  parentDeptInHead?: boolean; // 父部门是否在页首
  positionInHead?: boolean; // 岗位是否在页首
  mobileInHead?: boolean; // 手机号是否在页首
  isShowStaffCertificate?: boolean; // 是否展示员工证书
  certificateShowType?: number; // 证书展示方式 0：个人证书 1：组合证书
  mainColorStyle?: number; // 主色风格，0-品牌主色版（默认），1-简约主色版
  fontColor?: number; // 字体颜色
  layoutPattern?: number; // 版式格局，0-商务版（默认），1-现代版
  oldNewFlag?: number; // 新老版本标记，老版本用旧配置，新增的主色风格、字体颜色、版式格局三个配置属性用于新版本名片配置，0-老版本（默认），1-新版本
  alias?: string; // 别名
  certificateList?: Certificate[]; // 证书列表
  aesUserId?: string; // aes 加密后的 userId
}

// 证书
interface Certificate {
  name: string; // 证书名
  certificateNo: string; // 证书编号
  picUrl: string; // 证书图片
}
