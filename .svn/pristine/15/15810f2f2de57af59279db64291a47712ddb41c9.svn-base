<!--
****--@file     waitAccess
****--@date     2018/4/23 15:15
****--@author   ${王恒}
****--@describe   提示正在审核
-->
<template>
    <div class="waitAccess-root">
         亲爱的<span class="colorRed name">{{$store.state.user.info.name}} </span>:老师：
         <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;欢迎登录您的个人中心,权限正在审核中，尚不能使用<span class="colorRed">班组管理</span>，<span class="colorRed">班级报告</span>，<span class="colorRed">疑难问题</span>等的功能 </p>
    </div>
</template>
<script>
  /*当前组件必要引入*/
  let Util = null
  export default {
    data () {
      return {}
    },
    methods: {
      //初始化请求列表数据
      init () {
        Util = this.$util
      }
      
    },
    created () {
      this.init();
    },
    mounted () {
    },
    components: {}
  }

</script>
<style lang="scss">
   .waitAccess-root{
       line-height: 20px;
       .colorRed {
           color: red;
       }
       .name{
           padding: 0 3px;
           color: #1cc03b;
       }
   }
</style>