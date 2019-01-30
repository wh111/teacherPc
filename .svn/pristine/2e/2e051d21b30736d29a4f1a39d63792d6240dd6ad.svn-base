<!--
****--@file     questionBank_index
****--@date     2018/3/15 下午2:09
****--@author   jhd
****--@describe   题库中心首页
-->
<template>
    <div class="questionBank">
        <ul class="clearfix type">
            <li :class="showType == 'myTestQuestion' ? 'active' : ''" @click="type('myTestQuestion')">我的题库</li>
            <li  style="margin: 0 2px"  :class="showType === 'fallibilityAndDifficult' ? 'active' : ''"
                @click="type('fallibilityAndDifficult')">
                错题&难题库
            </li>
            <li :class="showType == 'thematicLibrary' ? 'active' : ''" @click="type('thematicLibrary')">专题库</li>
        </ul>
        <div class="list-wrap">
            <my-test-question v-if="showType === 'myTestQuestion'"></my-test-question>
            <fallibility-and-difficult v-if="showType === 'fallibilityAndDifficult'"></fallibility-and-difficult>
            <thematic-library v-if="showType === 'thematicLibrary'"></thematic-library>
        </div>
    </div>
</template>
<style lang="scss">
    @import "../css/questionBanks";
    @import "../css/questionBankListItem";
</style>
<script>
  /*当前组件必要引入*/
  import myTestQuestion from './myTestQuestion/list'
  import fallibilityAndDifficult from './fallibilityAndDifficult/list'
  import thematicLibrary from './thematicLibrary/list'

  export default {
    data () {
      return {
        showType: this.$route.params.view || 'myTestQuestion'
      }
    },
    methods: {
      //初始化请求列表数据
      init () {

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
      myTestQuestion, fallibilityAndDifficult, thematicLibrary
    }
  }

</script>
