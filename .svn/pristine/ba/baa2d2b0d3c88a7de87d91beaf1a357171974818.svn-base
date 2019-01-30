<!--
****--@file     gropReport
****--@date     2018/3/19 9:58
****--@author   wh
****--@describe   班级报告组件
-->
<template>
    <div>
        <el-tabs v-model="activeName">
            <el-tab-pane label="历史作业" name="first">
                <history-task v-if="activeName=='first'" :types='types' :groupId='groupId'></history-task>
            </el-tab-pane>
            <el-tab-pane label="历史测评" name="second">
                <history-evaluation v-if="activeName=='second'" :types='types' :groupId='groupId'></history-evaluation>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
  /*当前组件必要引入*/
  let Util = null
  //历史作业
  import historyTask from "./historyTask_list.vue";
  //历史测评
  import historyEvaluation from "./historyEvaluation_list.vue";
  export default {
    props: ['types', 'groupId'],
    data () {
      return {activeName: 'first',}
    },
    methods: {
      //初始化请求列表数据
      init () {
        Util = this.$util
      },
      
    },
    created () {
      this.init()
    },
    mounted () {
    },
    watch: {},
    components: {
      historyTask:historyTask,
      historyEvaluation:historyEvaluation
    }
  }

</script>
<style lang="scss">

</style>