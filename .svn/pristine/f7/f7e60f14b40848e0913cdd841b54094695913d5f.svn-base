<!--
****--@file     publish
****--@date     2018/3/28 19:13
****--@author   YC
****--@describe 发布专题库到群组
-->
<template>
    <el-row class="thematicLibrarysPublish">
        <el-form>
            <el-checkbox-group v-if="groups && groups.length" v-model="releaseTo" class="classBox">
                <el-col :span="8" v-for="item in groups" :key="item.id">
                    <el-checkbox :label="item.id" :value="item.title" :disabled="!!~publishedList.indexOf(item.id)">
                        <p>{{ item.title | sliceText(10,'...') }}</p>
                    </el-checkbox>
                </el-col>
            </el-checkbox-group>
            <div class="classBox" v-else>
                <p class="noDataTips">{{ groups === null ? '群组加载中...' : '暂无群组' }}</p>
            </div>
            <el-col align="center" class="btnBox">
                <el-button type="success"  class="greenButton" @click="publish">发布</el-button>
                <el-button class="whiteButton" @click="cancel">取消</el-button>
            </el-col>
        </el-form>
    </el-row>
</template>
<style lang="scss">
    .thematicLibrarysPublish {
        .classBox {
            min-height: 200px;
        }
        .btnBox {
            padding-top: 20px
        }
    }
</style>
<script>
  /*当前组件必要引入*/
  import api from '../api'
  //当前组件引入全局的util
  let Util = null
  export default {
    name: 'thematicLibrarysPublish',
    props: ['operailityData'],
    data () {
      return {
        publishedList: [],
        releaseTo: [],
        groups: null
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        (this.operailityData.publishList || []).map(item => this.publishedList.push(item.groupsId))
        this.getGroups()
      },
      getGroups () {
        let opt = {
          ajaxSuccess: res => this.groups = res.data.dataList || [],
          ajaxParams: {
            url: api.queryGroups.path,
            params: {
              types: '0'
            }
          }
        }
        this.ajax(opt)
      },
      publish () {
        if (!this.releaseTo.length) {
          this.errorMess('请选择需要发布的群组')
          return
        }
        let opt = {
          ajaxSuccess: () => this.$emit('publish', 'publish', '发布成功！'),
          ajaxParams: {
            url: api.publish.path,
            method: api.publish.method,
            data: {
              paperId: this.operailityData.id,
              releaseTo: this.releaseTo.join(',')
            }
          }
        }
        this.ajax(opt)
      },
      cancel () {
        this.$emit('cancel', 'publish')
      },
    },
    created () {
      this.init()
    },
    mounted () {
    },
    components: {}
  }

</script>
