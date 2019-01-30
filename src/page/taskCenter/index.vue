<!--
****--@file     taskCenter_index
****--@date     2018/3/15 下午2:13
****--@author   jhd
****--@describe   任务中心 首页
-->

<template>
    <div class="taskCenter-index">
        <ul class="clearfix type">
            <li :class="showType === 'groupQuestion'? 'active' : ''" @click="type('groupQuestion')">众包组题</li>
            <li :class="showType === 'setQuestion' ? 'active' : ''" @click="type('setQuestion')">集题投稿</li>
            <li :class="showType === 'brushQuestion' ? 'active' : ''" @click="type('brushQuestion')">刷题大赛</li>
        </ul>
        <div class="list-wrap">
            <group-question v-if="showType==='groupQuestion'"></group-question>
            <set-question v-if="showType==='setQuestion'"></set-question>
            <brush-question v-if="showType==='brushQuestion'"></brush-question>
        </div>
    </div>
</template>
<script>
  /*当前组件必要引入*/
  import groupQuestion from './groupQuestion/list'
  import setQuestion from './setQuestion/list'
  import brushQuestion from './brushQuestion/list'

  let Util = null
  export default {
    data () {
      return {
        showType: 'groupQuestion',
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        Util = this.$util
      },
      //更改任务类型
      type (type) {
        this.showType = type
      },
    },
    created () {
      this.init()
    },
    mounted () {
    },
    components: {
      groupQuestion, setQuestion, brushQuestion
    }
  }

</script>
<style lang="scss">
    @import "../css/taskCenter.scss";
</style>
