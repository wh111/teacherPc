<!--
****--@file     findPassword
****--@date     2018/1/3 11:45
****--@author   wh
****--@describe   找回密码
-->
<template>
    <div class="tabRegister login-detail">
        <div class="Tab">
            <h1><span class="spanL">找回密码</span></h1>
            <div class="login-input">
                <div class="div" style="margin-top: 22px">
                    <div class="icon-login">
                        <img src="../../assets/images/telNumber.png"/>
                    </div>
                    <input type="text" v-on:input="changeAccount()" v-model="inputPassword"
                           placeholder="请输入手机号"></input></div>
                <div class="div" style="margin-top: 22px">
                    <input type="password" placeholder="请输入短信验证码" v-model="messageInput" @change="replace"
                           style="width: 150px;padding: 0 14px;border-left: 1px solid #ccc"/>
                    <button @click="getPassTel" v-if="!sendKeySuccess"
                            style="width: 110px;margin-top: 0px;float: right; color: #ffffff;background-color: #11a63f;height: 40px">
                        获取验证码
                    </button>
                    <button v-if="sendKeySuccess"
                            style="width: 110px;margin-top: 0px;float: right; color: #ffffff;background-color: #11a63f;height: 40px">
                        已发送<span style="color:#fd7416;padding-left:5px">{{timesend}}</span>s
                    </button>
                </div>
                <div class="div" style="margin-top: 22px">
                    <div class="icon-login">
                        <img src="../../assets/images/password.png"/>
                    </div>
                    <input type="password" @change="replace" v-model="inputAccountpassword"
                           placeholder="请输入您的密码"></input></div>
                <div class="div" style="margin-top: 22px">
                    <div class="icon-login">
                        <img src="../../assets/images/password.png"/>
                    </div>
                    <input type="password" @change="replace" v-model="inputAccountpassword1"
                           placeholder="请再次输入您的密码"></input></div>
                <el-checkbox v-model="checkedPassword"></el-checkbox>
                <span>我已阅读并同意《 <span @click="agreementModal=true" style="color: #11a63f">用户协议</span> 》</span>

                <button @click="AgreeRegister">提交</button>
                <!--<p class="tabRegister-footer"><span>关于我们</span><span>客户服务</span><span>APP下载</span></p>-->
            </div>
        </div>
        <!--协议弹窗-->
        <Modal
                :mask-closable="false"
                width="700"
                v-model="agreementModal"
                title="注册协议"
                :loading="loading">
            <modal-header slot="header" :content="confirm"></modal-header>
            <agreement-modal v-if="agreementModal"></agreement-modal>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
  /*当前组件必要引入*/
  let Util = null
  import api from './api'
  import agreementModal from './agreementModal.vue'

  export default {
    data () {
      return {
        loading: false,
        confirm: {
          id: 'confirmId',
          title: '用户协议'
        },
        agreementModal: false,
        inputAccountpassword: '',
        inputAccountpassword1: '',
        inputPassword: '',
        inputPassword1: '',
        inputAccount: '',
        inputAccount1: '',
        checkedPassword: true,
        sendKeySuccess: false,
        timesend: 60,
        messageInput: ''
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        Util = this.$util
      },
      replace () {
        this.inputAccountpassword = this.inputAccountpassword.replace(/\s/g, '')
        this.inputAccountpassword1 = this.inputAccountpassword1.replace(/\s/g, '')
        this.messageInput = this.messageInput.replace(/\s/g, '')
      },
      changeAccount () {
        this.inputPassword = this.inputPassword.replace(/[\u4e00-\u9fa5]/g, '')
      },
      AgreeRegister () {//注册提交
        if (!(/^.{6,32}$/.test(this.inputAccountpassword))) {
          this.$message({
            showClose: true,
            message: '请输入6-32位密码',
            type: 'error'
          })
          return false
        }
        if (this.inputAccountpassword != this.inputAccountpassword1) {
          this.$message({
            showClose: true,
            message: '两次密码输入不一致',
            type: 'error'
          })
          return false
        }
        if (!this.checkedPassword) {
          this.$message({
            showClose: true,
            message: '请阅读并同意协议',
            type: 'error'
          })
          return false
        }
        if (!(/^1[34578]\d{9}$/.test(this.inputPassword))) {
          this.$message({
            showClose: true,
            message: '请输入正确的手机号码',
            type: 'error'
          })
          return false
        }
        if (this.messageInput == '') {
          this.$message({
            showClose: true,
            message: '请输入验证码',
            type: 'error'
          })
          return false
        }
        this.RightSend()
      },
      RightSend () {
        this.ajax({//发送账号信息
          ajaxSuccess: 'sendPersonmessageSuccess',
          error: res => {
            this.$message({
              showClose: true,
              message: res.status.msg,
              type: 'error'
            })
          },
          ajaxParams: {
            //baseURL:'PUBLIC',
            url: api.backPassword.path,
            method: api.backPassword.method,
            data: {
              mobile: this.inputPassword,
              password: this.inputAccountpassword,
              code: this.messageInput,

            },
          },
        })

      },
      sendPersonmessageSuccess () {
        this.$emit('sendP', this.inputPassword, this.inputAccountpassword)
      },
      getPassTel () {

        if (!(/^1[34578]\d{9}$/.test(this.inputPassword))) {
          this.$message({
            showClose: true,
            message: '请输入正确的手机号码',
            type: 'error'
          })

        } else {

          this.ajax({
            ajaxSuccess: this.getPassTelSuccess,
            ajaxParams: {
              //baseURL:'PUBLIC',
              url: api.sendValidCode.path,
              method: api.sendValidCode.method,
              data: {
                mobile: this.inputPassword,
                types: 20,
              },
            },
          })

        }

      },
      getPassTelSuccess (res) {
        var that = this
        var setInt = window.setInterval(function () {
          that.timesend--
          if (that.timesend == 0) {
            window.clearInterval(setInt)

            that.sendKeySuccess = false
            that.timesend = 60
          }
        }, 1000)
        this.sendKeySuccess = true
      }

    },
    created () {
      this.init()
    },
    mounted () {
    },
    components: {agreementModal}
  }

</script>
<style lang="scss">
    @import "./login.scss";
</style>