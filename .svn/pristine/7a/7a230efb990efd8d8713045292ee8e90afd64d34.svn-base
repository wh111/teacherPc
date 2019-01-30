<!--
****--@file     passwordChange.vue
****--@date     2017/12/25 9:29
****--@author   王恒
****--@describe  密码修改成功
-->

<template>
    <div style="line-height: 150px;text-align: center">密码修改成功，请
        <span style="color:#ff9f00 " @click="re">重新登录</span>
    </div>
</template>
<script>
    import api from '../api'
    export default {
        data() {
            return {}
        },
        methods: {
            re() {
                this.$cookie.delete(this.$util.cookieConfig.loginAuthKey);
                this.$store.commit('user/destroy');
                this.$store.commit('app/destroy');
              this.$router.push({name: 'login'})
            },
            sendPersonmessage() {
                this.setCookie('manager_login_token', "", -1);
            },
            setCookie(cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                document.cookie = cname + "=" + cvalue + "; " + expires;
            }


        }
    }

</script>
