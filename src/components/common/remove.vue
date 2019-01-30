<template>
    <div class="removeBox">
        <div class="remove">确定要删除吗？</div>
        <el-row>
            <el-col align="center">
                <load-btn @handleRemove="handleRemove" class="orange" :btnData="loadBtn"></load-btn>
                <el-button class="but-col" @click="cancel('remove')">取消</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<style lang="scss">
    .removeBox {
        .remove {
            min-height: 50px;
            font-size: 16px;
            line-height: 24px;
        }
    }
</style>
<script>
  let Util
  export default {
    props: ['operailityData', 'deleteUrl'],
    data () {
      return {
        //保存数据
        addUrl: '/role/add',
        loadBtn: {title: '确定', callParEvent: 'handleRemove'},
        countDate: 0,
      }
    },
    created () {
      Util = this.$util
    },
    methods: {
      cancel () {
        this.$emit('cancel', 'remove')
      },
      handleRemove (isLoadingFun) {
        let ids = []
        if (this.operailityData instanceof Array && this.operailityData.length) {
          this.operailityData.map(item => ids.push(item.id))
        }
        ids = ids.join(',')
        let opt = {
          error: () => this.errorMess('删除失败'),
          ajaxSuccess: () => this.$emit('remove', 'remove', '删除成功'),
          ajaxParams: {
            url: this.deleteUrl,
            method: 'delete',
            params: {
              ids
            }
          }
        }
        if (!ids) {return}
        if (!isLoadingFun) isLoadingFun = function () {}
        this.ajax(opt, isLoadingFun)
      }
    },
  }
</script>
