<!--
****--@file     answerAnalysis
****--@date     2018/3/19 16:32
****--@author   zyc
****--@describe 作答分析
-->
<template>
    <div style="padding: 20px;">
        <p style="line-height: 40px;font-size: 22px">{{$route.query.name}}</p>
        <correcting-have-corrected  :id='$route.query.id'></correcting-have-corrected>
    </div>
</template>
<script>
  /*当前组件必要引入*/

  //当前组件引入全局的util
  import CorrectingHaveCorrected from './correctingHaveCorrected.vue'

  let Util = null
  export default {
    name: 'answerAnalysis',
    data () {
      return {}
    },
    methods: {
      //初始化请求列表数据
      init () {

      },

    },
    created () {
      this.init()
    },
    mounted () {
    },
    components: {CorrectingHaveCorrected},
  }

</script>