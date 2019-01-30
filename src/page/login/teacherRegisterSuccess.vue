<!--
****--@file     TeacherRegisterSuccess
****--@date     2018/3/14 14:50
****--@author   wh
****--@describe   教师登录成功
-->
<template>
    <div class="teacherregisterSuccess-root">
        <h1>注册成功，是否进行实名认证？</h1>

        <el-button @click="returnToName">立即认证</el-button>
    </div>
</template>
<script>
    /*当前组件必要引入*/
    let Util = null
    export default {
        data() {
            return {}
        },
        methods: {
            //初始化请求列表数据
            init() {
                Util = this.$util
            },
            returnToName() {
                this.$emit('identification')
            },
        },
        created() {
            this.init();
        },
        mounted() {
        },
        components: {}
    }

</script>
<style lang="scss">
    .teacherregisterSuccess-root {
        text-align: center;
        margin: 0 auto;
        h1 {
            line-height: 40px;
            font-size: 20px;
            margin-top: 40px;
        }

    }
</style>