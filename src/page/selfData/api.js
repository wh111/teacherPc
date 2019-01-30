const file = '/'//当前模块api前缀
const api = {
  getMyInfo: {//获取我的信息
    path: '/getMyInfo',
    method: 'get'
  },
  getBooklist: {//获取教材
    path: '/textbook/get',
    method: 'get',
  },
  uploadImg: {
    path: '/file/uploadImg',
    method: 'post'
  },
  changePass: {//更改密码
    path: '/modify-password',
    method: 'put'
  },
  bindMobile: {//绑定手机号
    path: '/bind-mobile',
    method: 'put'
  },
  sendValidCode: {//获取验证码
    path: '/sms/sendValidCode',
    method: 'post'
  },
  validCodeRight: {//验证验证码
    path: '/validCode',
    method: 'post'
  },
  modify1: {//修改数据
    path: '/modify',
    method: 'put'
  },
  nameAndMoblie: {//验证手机号是否注册过
    path: '/nameAndMoblie',
    method: 'post'
  },
  logout: {//注销
    path: '/logout',
    method: 'delete'
  },
  queryTextbookVersion: {
    path: '/query-textbookVersion-by-subject',
    method: 'get'
  },
  wxOauth: {
    path: '/wxConnect/teaWxBoundByCode',
    method: 'get'
  },
}
export default api 
