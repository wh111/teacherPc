<!--
****--@file     login.vue
****--@date     2017/12/25 9:29
****--@author   王恒
****--@describe  登录注册找回密码
-->
<template>
    <div class="login-detail-root">
        <header-top></header-top>
        <template v-if="!isOtherLogin">
            <!-- 登录 -->
            <div class="login-detail" v-if="loginorregister==1">
                <div class="Tab">
                    <!--<div class="wechat">-->
                    <!--<div class="wechat-img">-->
                    <!--<img src="../../assets/images/QRCode-1.png"/>-->
                    <!--</div>-->
                    <!--<p>扫码关注我们的公众号</p>-->
                    <!--</div>-->
                    <h1><span class="spanL">用户登录 </span><span class="spanR" @click="clickRegister">用户注册</span></h1>
                    <div class="login-input">
                        <div class="div">
                            <div class="icon-login">
                                <img src="../../assets/images/agentName.png"/>
                            </div>
                            <input type="text" v-on:input="changeAccount()" v-model="loginForm.mobile"
                                   placeholder="请输入用户名"></input></div>
                        <div class="div" style="margin-top: 22px">
                            <div class="icon-login">
                                <img src="../../assets/images/password.png"/>
                            </div>
                            <input type="password" v-model="loginForm.password" placeholder="请输入密码"></input>
                        </div>
                            <el-checkbox v-if="unionId" v-model="bindWX">绑定微信</el-checkbox>
                        <el-checkbox v-model="checkedPassword0" :style="{'marginLeft':unionId ? '10px' : '0'}">记住密码
                        </el-checkbox>
                        <span :style="{'marginLeft':unionId ? '10px' : '112px'}" @click="findPassword">忘记密码</span><br>


                        <load-btn class="orangeYellow" :btnData="loginBtn" @toLogin="toLogin"></load-btn>

                    </div>
                    <div class="login-footer-foot">
                        <!--<a href="javascript:void(0)" @click="showQqQRCode">-->
                        <!--<div class="img" style="margin-left: 65px"><img src="../../assets/images/QQ.png"/></div>-->
                        <!--<span>QQ</span>-->
                        <!--</a>-->
                        <a href="javascript:void(0)" @click="showWxQRCode">
                            <div class="img" style="margin-left: 45px"><img src="../../assets/images/Wechat.png"/></div>
                            <span>微信</span>
                        </a>
                        <div class="img-teacher img" style="margin-left: 105px"><img
                                src="../../assets/images/greenCircle.png"/></div>
                        <a href="/sasstudent/Student/login" target="_blank"><span
                                style="margin-left: 10px">我是学生</span></a>
                        <!--<span v-if="isStudent" style="margin-left: 10px" @click="checkType">我是老师</span>-->
                        <!--<span v-else style="margin-left: 10px" @click="checkType">我是学生</span>-->
                        <!--<p><span style="margin-left: 80px">关于我们</span><span style="margin-left: 50px">客户服务</span><span-->
                        <!--style="margin-left: 50px">APP下载</span></p>-->
                    </div>
                </div>
            </div>
            <!-- 注册 -->
            <register v-if="loginorregister==2" :isStudent="isStudent" @sendPersonmessage="sendPersonmessage"
                      @clickLogin="clickLogin"></register>

            <!-- 找回密码 -->
            <find-password v-if="loginorregister==3" @sendP="sendP"></find-password>
        </template>
        <div v-else class="otherLoginTips">
            <i class="el-icon-loading"></i>
            <p>正在验证身份,请稍等...</p>
        </div>
        <footer-buttom style="margin-top: 100px"></footer-buttom>
        <!--<Modal :mask-closable="false" width="360" title="注册成功" v-model="loginorregisterTrue"-->
        <!--class-name="registerSuccess" :loading="loading">-->
        <!--<modal-header slot="header" :content="evaluateId"></modal-header>-->
        <!--<registerSuccess :typeofmessage="typeofmessage" @routerToLogin="routerToLogin"-->
        <!--v-if="loginorregisterTrue"></registerSuccess>-->
        <!--</Modal>-->
        <Modal :mask-closable="false" width="360" title="教师注册成功" v-model="teacherLoginorregisterTrue"
               class-name="teacherRegisterSuccess" :loading="loading">
            <modal-header slot="header" :content="teacherRegisterId"></modal-header>
            <teacherRegisterSuccess @identification="identification" @closeIdentification="closeIdentification"
                                    v-if="teacherLoginorregisterTrue"></teacherRegisterSuccess>
        </Modal>
        <Modal :mask-closable="false" width="360" title="实名认证" v-model="identificationSelf"
               class-name="toIdentification" :loading="loading">
            <modal-header slot="header" :content="toIdentificationId"></modal-header>
            <toIdentificationTeacher v-if="identificationSelf"
                                     @closeIdentification="closeIdentification"></toIdentificationTeacher>
        </Modal>
    </div>
</template>
<script>
  let Util = null
  import api from './api'
  import LoadBtn from '../../components/common/loadBtn'
  // import registerSuccess from './registerSuccess.vue'
  import headerTop from '../../components/common/headTop.vue'
  import footerButtom from '../../components/common/footer.vue'
  import findPassword from './findPassword.vue'
  import register from './register.vue'
  import teacherRegisterSuccess from './teacherRegisterSuccess.vue'
  import toIdentificationTeacher from './toIdentificationTeacher'

  export default {
    data () {
      return {

        isStudent: false,
        typeofmessage: 'true',

        sendKeySuccess: false,
        telNumber: '',
        loginForm: {
          mobile: '',
          password: '',
          keepPassword: '',
          openId: '',
          unionId: ''
        },
        loginBtn: {
          title: '立即登录',
          loadText: '登录中',
          callParEvent: 'toLogin'
        },
        messageInput: '',
        inputAccount: '',
        inputPassword: '',
        inputAccountpassword: '',

        checkedPassword: false,
        checkedPassword0: false,//记住账号
        checkedPassword1: false,//同意协议
        loginorregisterTrue: false,
        loginorregister: 1,
//                evaluateId: {
//                    id: 'registerSuccess',
//                    title: ''
//                },
        loading: false,
        teacherRegisterId: {
          id: 'teacherregisterSuccess',
          title: ''
        },
        toIdentificationId: {
          id: 'toIdentificationId',
          title: '实名认证'
        },
        teacherLoginorregisterTrue: false,
        identificationSelf: false,

        loading: false,
        bindWX: false,
        isOtherLogin: false,
        unionId: '',
        userId: ''
      }
    },
    watch: {
      '$route' (to, from) {
        this.loginorregister = this.$route.query.id
      },

    },
    computed: {},
    created () {
      this.init()
    },
    methods: {
      init () {
        Util = this.$util
        // if (this.$route.query.openId) {
        //   this.loginForm.openId=this.$route.query.openId;
        //   this.loginForm.unionId=this.$route.query.unionId||'';
        //   console.log(this.$route.query.binding)
        //   if(this.$route.query.binding==1) {
        //     alert(1)
        //     this.toLogin()
        //   }else{
        //     this.successMess('微信登录成功,请登录或注册以绑定账号');
        //   }
        //
        // }
        this.checkIsWXLogin()
        if (Util.getStore('mobile')) {
          this.loginForm = {
            mobile: Util.getStore('mobile'),
            password: Util.getStore('psw'),
          }
          this.checkedPassword0 = true
        }
      },
      checkIsWXLogin () {
        let {code, state} = this.$route.query
        this.isOtherLogin = state != undefined
        if (state === 'wx' && code) {
          this.wxOauth(code)
        }else if (state === 'qq' && code) {
          this.qqOauth(code)
        } else {
          this.wxLoginTips('', true)
        }
      },
      qqOauth (code) {
        let opt = {
          ajaxParams: {
            url: api.qqOauth.path,
            method: api.qqOauth.method,
            params: {code}
          },
          ajaxSuccess: res => {
            if (res.data) {
              this.wxLogin(res.data)
            } else {
              this.wxLoginTips('qq登录失败', true)
            }
          }
        }
        this.ajax(opt)
      },
      wxOauth (code) {
        let opt = {
          ajaxParams: {
            url: api.wxOauth.path,
            method: api.wxOauth.method,
            params: {code}
          },
          ajaxSuccess: res => {
            if (res.data) {
              this.wxLogin(res.data)
            } else {
              this.wxLoginTips('微信登录失败', true)
            }
          }
        }
        this.ajax(opt)
      },
      wxLogin (unionId) {
        let opt = {
          ajaxParams: {
            url: api.wxPClogin.path,
            method: api.wxPClogin.method,
            data: {unionId}
          },
          ajaxSuccess: res => {
            // if (res.data) {
            //   this.wxLogin(res.data)
            // } else {
            //   this.wxLoginTips('微信登录失败', false);
            // }
            if (res.data) {
              this.getMyInfo()
            } else {
              this.unionId = unionId
              this.wxLoginTips('', true)
            }
          }
        }
        this.ajax(opt)
      },
      bindWXToThisUser () {
        let opt = {
          ajaxParams: {
            url: api.wxBind.path,
            method: api.wxBind.method,
            data: {unionId: this.unionId, userId: this.userId, userType: '0'}
          },
          ajaxSuccess: res => {
            this.$message({
              message: res.data ? '微信绑定成功' : '微信绑定失败',
              type: res.data ? 'success' : 'warning'
            })
          }
        }
        this.ajax(opt)
      },
      showQqQRCode(){
        let {host, protocol, pathname} = window.location
        console.log( encodeURI(protocol + '//' + host + pathname))
//        host='/sasteacher/Teacher/login'
        let urlParams = {
          client_id: '1106606953',
          redirect_uri: encodeURI(protocol + '//' + host + pathname),
          response_type: 'code',
          scope: 'get_user_info',
          state: 'qq'
        }
        let url = 'https://graph.qq.com/oauth2.0/authorize?' + Object.keys(urlParams).map(key => `${key}=${urlParams[key]}`).join('&')
        window.location.href = url
      },
      showWxQRCode () {
        let {host, protocol, pathname} = window.location
        let urlParams = {
          appid: 'wxf77a6ddae54a7eda',
          redirect_uri: encodeURI(protocol + '//' + host + pathname),
          response_type: 'code',
          scope: 'snsapi_login',
          state: 'wx'
        }
        let url = 'https://open.weixin.qq.com/connect/qrconnect?' + Object.keys(urlParams).map(key => `${key}=${urlParams[key]}`).join('&')
        window.location.href = url
      },
      wxLoginTips (message, error = false) {
        this.isOtherLogin = !error
        message && this.$message({
          message,
          type: error ? 'warning' : 'success'
        })
      },
      identification () {//认证
        this.teacherLoginorregisterTrue = false
        this.identificationSelf = true
      },
      clickLogin () {
        this.loginorregister = 1
      },
      changeAccount () {
        this.loginForm.mobile = this.loginForm.mobile.replace(/[\u4e00-\u9fa5]/g, '')
        this.inputAccount = this.inputAccount.replace(/[\u4e00-\u9fa5]/g, '')
        this.inputPassword = this.inputPassword.replace(/[\u4e00-\u9fa5]/g, '')
      },
      toLogin (isLoadingFun) {
        this.checkedPassword0 == true ? this.loginForm.keepPassword = 1 : this.loginForm.keepPassword = ''
        if (!isLoadingFun) isLoadingFun = () => {
        }
        isLoadingFun(true)
        let data = this.$util.getFormData(this.loginForm)
        let opt = {
          ajaxSuccess: res => {
            this.userId = res.data.id
            if (this.bindWX) {
              this.bindWXToThisUser()
            }
            this.getMyInfo(isLoadingFun,)
            if (this.checkedPassword0) {
              Util.setStore('mobile', data.mobile)
              Util.setStore('psw', data.password)
            } else {
              Util.removeStore('mobile')
              Util.removeStore('psw')
            }
          },
          error: res => {
            isLoadingFun(false)
          },
          ajaxParams: {
            url: api.login.path,
            method: api.login.method,
            data
          }
        }
        this.ajax(opt)
      },
      getMyInfo (isLoadingFun) {
        let opt = {
          ajaxSuccess: 'getUserInfoSuccess',
          ajaxParams: {
            url: '/getMyInfo'
          }
        }
        this.ajax(opt, isLoadingFun)
      },
      getUserInfoSuccess (res) {
        // 提示用户进行实名认证
        if(res.data.realStatus==0||res.data.realStatus==3) {
          this.identificationSelf = true;
          if(res.data.realStatus==3){
            this.errorMess('未通过实名认证，请重新填写认证信息')
          }
          return false;
        }

        this.$cookie.set(this.$util.cookieConfig.loginAuthKey, 1)
        this.$store.commit('app/setLogin', true)
        this.$store.commit('user/updateInfo', res.data)
        if (this.teacherLoginorregisterTrue == false) {
          this.$router.push({name: 'selfCenter'})
        }
      },
      clickRegister () {
        this.loginorregister = 2
      },
//            clickLogin() {
//                this.loginorregister = 1
//            },
      findPassword () {
        this.loginorregister = 3
        this.$route.query.id = 3
      },
      sendPersonmessage (mobile, password) {

        this.loginForm.mobile = mobile
        this.loginForm.password = password
        this.toLogin()
        this.teacherLoginorregisterTrue = true
        this.loginorregisterTrue = true
        this.inputAccount = ''
        this.inputAccountpassword = ''
        this.checkedPassword = false
        this.messageInput = ''
        this.inputPassword = ''
      },
      sendP (mobile, password) {
//        this.teacherLoginorregisterTrue = false
//        this.loginorregisterTrue = true
//        this.inputAccount = ''
//        this.inputAccountpassword = ''
//        this.checkedPassword = false
//        this.messageInput = ''
        this.loginForm.mobile = mobile
        this.loginForm.password = password
        this.loginForm.keepPassword = 0
        this.toLogin()

      },
      routerToLogin (index) {
        this.loginorregister = index
        this.loginorregisterTrue = false
      },
      //选择当前登录身份类型
      //type=>  student || teacher
      checkType () {
        this.isStudent = !this.isStudent
      },
      closeIdentification () {
        this.teacherLoginorregisterTrue = false
        this.identificationSelf = false
        this.getMyInfo()

      },

    },
    components: {
      LoadBtn,
      headerTop,
      footerButtom,
      findPassword,
      register,
      teacherRegisterSuccess,
      toIdentificationTeacher
    }
  }
</script>
<style lang="scss">
    @import "./login.scss";

</style>
