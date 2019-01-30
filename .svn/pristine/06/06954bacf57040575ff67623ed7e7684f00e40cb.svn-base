<!--
****--@file     changGroup
****--@date     2018/3/15 14:33
****--@author   wh
****--@describe   调整班组
-->
<template>
    <div class="changeSelfGroup-root">
        <p>将该生移动至</p>
        <el-radio-group v-model="radio2" v-for="item in groupList" :key="item.id">
            <el-radio :label="item.id">{{item.title}}</el-radio>
        </el-radio-group>


        <br/>
        <div>
            <el-button @click="sure" class="greenButton">确定</el-button>
            <el-button @click="cancle" class="whiteButton">取消</el-button>
        </div>
    </div>
</template>
<script>
  /*当前组件必要引入*/
  let Util = null
  import api from './api'
  export default {
    props: ['types', 'groupId', 'personId'],
    data () {
      return {
        groupList: [],
        radio2: '',
        textbookVersionList: [],
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        Util = this.$util
        this.getList()
      },
      getList () {
        this.ajax({
          ajaxSuccess: res => {this.groupList = res.data.dataList},
          ajaxParams: {
            url: api.getGroups.path,
            method: api.getGroups.method,
            params: {
              types: this.types//
            },
          },
        })
      },
      sure () {
        this.ajax({
          ajaxSuccess: 'ajaxSuccess',
          ajaxParams: {
            url: api.changeGroups.path,
            method: api.changeGroups.method,
            data: {
              studentId: this.personId,
              newGroupsId: this.radio2,
              oldGroupsId: this.groupId.id,

            },
          },
        })

      },
      ajaxSuccess () {
        this.$message({
          message: '更改班组成功',
          type: 'success'
        })
        this.$emit('changeGroupSuccess', this.radio2)
      },
      cancle () {
        this.$emit('cancel')
      }

    },
    created () {
      this.init()
    },
    mounted () {
    },
    components: {}
  }

</script>
<style lang="scss">
    .changeSelfGroup-root {
        margin-top: -20px;
        div {
            text-align: center;
            margin: 0 auto;
        }
        .el-button {
            border: none;
            margin-top: 20px;

        }
        p {
            line-height: 40px;
        }
        .el-radio-group {
            min-width: 33%;
            text-align: left;
            line-height: 20px;
        }
    }

    .toCreateTitle {
        .ivu-modal-footer {
            display: none;
        }
    }
</style>