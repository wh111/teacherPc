<!--
****--@file     registerSuccess.vue
****--@date     2017/12/25 9:29
****--@author   王恒
****--@describe  注册成功弹窗
-->
<template>
  <div class="registerSuccess-root">
      <h1 v-if="typeofmessage">您已注册成功</h1>
      <h1 v-if="!typeofmessage">找回密码成功</h1>
      <p v-if="typeofmessage">恭喜您成功注册中小学生自适应学习平台</p>
      <p v-if="!typeofmessage">恭喜您成功修改中小学生自适应学习平台密码</p>
      <p><span>{{timer1}}s</span> 后自动跳转登录页面！</p>
    <button @click="returnTo">立即登录</button>
  </div>

</template>
<script>
    export default {
        props: ['typeofmessage'],
        data() {
            return {
                timer1: 5,
            }
        },
        created() {
            this.init()

        },
        methods: {
            init() {
                var that = this;
                var ti = window.setInterval(function() {

                    that.timer1--;
                    if(that.timer1 == 0) {
                        that.returnTo();
                        window.clearInterval(ti)
                    }
                    console.log(that.timer1)
                }, 1000)
            },
            returnTo() {
                this.$emit('routerToLogin', 1)
            },
        },

    }
</script>
<style lang="scss">
  .registerSuccess-root {

    height: 264px;
    border-radius: 5px;
    background-color: #ffffff;
    text-align: center;
    font-family: MicrosoftYaHei;
    font-size: 26px;
    color: #313131;
    h1 {
      padding: 30px 0;
      font-size: 26px;
    }
    p {
      font-size: 16px;
      padding: 6px 0;
      span {
        color: #ef3f3f;
      }
    }
    button {
      width: 260px;
      height: 40px;
      border-radius: 2px;
      background-color: #fd7416;
      border: none;
      text-align: center;
      font-family: MicrosoftYaHei;
      font-size: 16px;
      font-weight: bold;
      margin-top: 55px;
      color: #ffffff;
    }
  }


</style>