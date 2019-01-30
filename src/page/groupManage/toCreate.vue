<!--
****--@file     toCreate
****--@date     2018/3/15 13:44
****--@author   wh
****--@describe   创建班组群
-->
<template>
    <div style="text-align:center;margin: 0 auto">
        <el-form onsubmit="return false;" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="95px"
                 style="text-align:center;margin: 0 auto" class="base-introduce">
            <el-form-item label="群名称:" prop="title">
                <el-input v-model="ruleForm.title" ></el-input>
            </el-form-item>
            <el-form-item label="群简介:" prop="remark">
                <el-input type="textarea" v-model="ruleForm.remark" :rows="2"></el-input>
            </el-form-item>
        </el-form>
        <load-btn class="greenButton" :btnData="loginBtn" @toCreate="toCreate"></load-btn>
    </div>
</template>
<script>

  /*当前组件必要引入*/
  let Util = null
  import { createGroup as rules } from '../login/rules'
  import api from './api'

  export default {
    props: ['groupType'],
    data () {
      return {
        rules,
        ruleForm: {
          title: '',
          remark: '',
          types: 0,
        },
        loginBtn: {
          title: '确定',
          loadText: '创建中',
          callParEvent: 'toCreate'
        },
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        Util = this.$util
        console.log(this.groupType)
        this.ruleForm.types = this.groupType
      },
      /*
     * 点击提交按钮 监听是否验证通过
     * @param formName string  form表单v-model数据对象名称
     * @return flag boolean   form表单验证是否通过
     * */
      submitForm (formName) {
        let flag = false
        this.$refs[formName].validate((valid) => {
          if (valid) {
            flag = true
          }
        })
        return flag
      },
      toCreate (isLoadingFun) {
        let isSubmit = this.submitForm('ruleForm')
        console.log(isSubmit)
        if (isSubmit) {
          if (!isLoadingFun) isLoadingFun = () => {
          }
          isLoadingFun(true)
          this.ruleForm.types = this.groupType
          this.ajax({
            ajaxSuccess: res => {
              this.showMess('创建成功')
              this.$emit('createGroupSuccess')
            },
            error: res => {
              isLoadingFun(false)
            },
            ajaxParams:{
              url: api.createGroups.path,
              method: 'post',
              data: this.ruleForm,
            }


          })
        }
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
<style lang="scss">
    .toCreateTitle {
        .ivu-modal-footer {
            display: none;
        }
    }
</style>