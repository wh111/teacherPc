<!--
****--@file     publish
****--@date     2018/3/19 14:12
****--@author   ${王恒}
****--@describe   发布测评
-->
<template>
    <el-row>
        <div class="model" v-if="isTemp">
            <el-form label-width="80px">
                <el-form-item label="组卷模版">
                    <el-select v-model="tempId" v-on:emit="eve($event)" >
                        <el-option v-for="item in tempOption" :key="item.id" :value="item.id"
                                   :label="item.templateName" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="cancel" class="whiteButton">取消</el-button>
                    <el-button type="success" @click="selectTemp" class="greenButton" :disabled="!tempId">确定</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-col v-else align="center">
            <router-link :to="{name: 'createPaper',params:{type:'intelligent',groupId:groupId}}">
                <el-button class="whiteButton">智能组卷</el-button>
            </router-link>
            <router-link :to="{name: 'createPaper',params:{type:'manual',groupId:groupId}}">
                <el-button class="whiteButton">人工组卷</el-button>
            </router-link>
            <el-button class="whiteButton" @click="isTempCall">模板组卷</el-button>
        </el-col>
    </el-row>
</template>
<script>
  /*当前组件必要引入*/
  let Util = null
  import api from '../api'

  export default {
    props: ['groupId'],
    data () {
      return {
        tempId: '',
        isTemp: false,
        tempOption: []
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        Util = this.$util
        console.log(this.tempOption)
      },

      isTempCall () {
        this.isTemp = true
        this.getTempOption()
      },
      selectTemp () {
        this.$router.push({
          name: 'createPaper',
          params: {type: 'template', groupId: this.groupId},
          query: {template: this.tempId}
        })
      },
      eve:function(a){
        this.tempId=a
        // console.log(a)
      },
      getTempOption () {
        let createId = this.$store.getters['user/info']('id')
        let opt = {
          ajaxSuccess: res => this.tempOption = res.data,
          ajaxParams: {
            url: api.papersTemplateList.path,
            params: {
              createId
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
