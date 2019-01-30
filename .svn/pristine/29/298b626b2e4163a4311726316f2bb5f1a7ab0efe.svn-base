<!--
****--@file     groupReport_index
****--@date     2018/3/15 下午2:04
****--@author   jhd
****--@describe   班级报告 首页
-->
<template>
    <div class="gropReport_index-root">
        <div class="groupManage-top" style="line-height: 40px;height: 49px">
            <div class="titel left banji"> 班级群：</div>
            <el-tabs class="tab" v-model="selectGroup" @tab-click="handleClickTop">
                <el-tab-pane :label="item.title" v-for="item in groupList" :key="item.id"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="groupManage-top" style="line-height: 40px;height: 49px">
            <div class="titel left banji"> 小组群：</div>
            <el-tabs class="tab" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane :label="item.title" v-for="item in groupListofSmallList" :key="item.id"></el-tab-pane>
            </el-tabs>
        </div>
        <div style="clear: both"></div>
        <grop-report :types='types' :groupId='groupId'></grop-report>
    </div>
</template>
<script>
  import gropReport from './components/gropReport.vue'
  import api from '../groupManage/api'
  /*当前组件必要引入*/
  export default {
    data () {
      return {
        selectClass: '',
        groupListofSmallList: '',
        selectClass: '',
        groupListofSmall: '',
        groupListofSmallList: [],
        groupList: [],
        types: 0,
        groupId: null,
        selectGroup: '',
        activeName: ''
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        this.getGroupList()
      },
      handleClick (tab, event) {
        this.changeTitleofSmall(this.groupListofSmallList[this.activeName])
        this.selectGroup = ''
      },
      handleClickTop (tab, event) {
        this.changeTitle(this.groupList[this.selectGroup])
        this.activeName = ''
      },
      changeTitle (val) {
        this.selectClass = val.id
        this.groupListofSmall = ''
        this.groupId = val
      },
      changeTitleofSmall (val) {
        this.groupListofSmall = val.id
        this.selectClass = ''
        this.groupId = val
      },
      getGroupList () {//班组群
        this.types = '0'
        this.ajax({
          ajaxSuccess: res => {
            this.groupList = res.data.dataList
            if (this.groupList[0]) {this.changeTitle(this.groupList[0])}
            this.getGroupListgroup()
          },
          ajaxParams: {
            url: api.getGroups.path,
            method: api.getGroups.method,
            params: {
              types: this.types
            },
          },
        })

      },
      //获取小组群
      getGroupListgroup () {
        this.types = '1'
        this.ajax({
          ajaxSuccess: res => {
            this.groupListofSmallList = res.data.dataList
            if (this.groupList.length == 0 && this.groupListofSmallList[0]) {
              if (this.groupListofSmallList.length != 0) {
                this.changeTitleofSmall(this.groupListofSmallList[0])
              } else {
                this.totalCount = 0
                this.groupMessage = []
                this.personDetail = {}
                this.personId = ''
              }
            }
            if (this.groupList.length > 0 && this.selectGroup == '0') {
              this.activeName = ''
            }
          },
          ajaxParams: {
            url: api.getGroups.path,
            method: api.getGroups.method,
            params: {
              types: this.types//
            },
          },
        })
      },

    },
    created () {
      this.init()
    },
    mounted () {
    },
    components: {gropReport}
  }

</script>
<style lang="scss">
    .gropReport_index-root {
        padding: 20px;
        .titel {
            margin-right: 15px;
            cursor: pointer;
        }
        .active {
            color: #fd7416;
        }
        .tab {
            width: 830px;
            float: left;
        }
        .banji {
            line-height: 40px;
            color: #d1d1d1;
            font-size: 14px;
        }
    }
</style>
