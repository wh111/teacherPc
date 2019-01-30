<!--
****--@file     index
****--@date     2018/3/31 10:49
****--@author   YC
****--@describe 组卷入口（布置作业、智能组卷、人工组卷）
-->
<template>
    <div class="index">
        <template v-if="error">
            <p class="urlParamsError">环境异常，请退出后重新登录</p>
        </template>
        <template v-else>
            <intelligent v-if="['homework','intelligent'].includes(type)" :type="type"
                         :groupId="groupId"></intelligent>
            <manual v-if="['manual'].includes(type)" :groupId="groupId" :type="type"></manual>
            <paper-template v-if="['template'].includes(type)" :groupId="groupId" :type="type"
                            :templateId="templateId"></paper-template>
        </template>
    </div>
</template>
<script>
  /*当前组件必要引入*/
  import intelligent from './intelligent' // 布置作业、智能组卷
  import manual from './manual'
  import paperTemplate from './template'
  //当前组件引入全局的util
  let Util = null
  export default {
    name: 'createPaperIndex',
    data () {
      return {
        type: '', // 操作类型
        groupId: '', // 群组id
        templateId: '', // 模版id
        error: true // 参数是否错误
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        let {type, groupId} = this.$route.params
        let {template = ''} = this.$route.query
        if (['homework', 'intelligent', 'manual', 'template'].includes(type) && !isNaN(groupId)) {
          this.type = type
          this.groupId = groupId
          this.templateId = template
          this.error = false
        }
      }
    },
    created () {
      this.init()
    },
    mounted () {
    },
    components: {
      intelligent, manual, paperTemplate
    }
  }

</script>
<style lang="scss">
    .index{
        .questionKnowledgeTable .el-table__body-wrapper{
            overflow: auto !important;
        }
    }
</style>
