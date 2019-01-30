<!--
****--@file     showQuestionDetailOfModal
****--@date     2018/3/22 10:05
****--@author   ${王恒}
****--@describe   问题详情弹框
-->
<template>
    <el-row class="showQuestionDetailOfModal">
        <el-col v-if='accessData=="easy"'>
            <p>确定将此题加入到易错题库吗？</p>
            <el-col align="right">
                <el-button type="success"  class="greenButton" @click='emit'>确定</el-button>
                <el-button @click='cancel'>取消</el-button>
            </el-col>
        </el-col>
        <el-col v-if='accessData=="hard"'>
            <p>确定将此题加入到难题库吗？</p>
            <el-col align="right">
                <el-button type="success"  class="greenButton" @click='emit'>确定</el-button>
                <el-button @click='cancel' class="whiteButton">取消</el-button>
            </el-col>
        </el-col>

        <el-col v-if='accessData=="changeErr"' style="text-align: left">
            <el-form ref="formValidate" :model="formValidate" :rules="rules">
                <el-form-item label="错题反馈：" prop="remark">
                    <el-input type="textarea" :autosize="{minRows:4, maxRows:8}" placeholder="请输入反馈内容"
                              v-model="formValidate.remark"></el-input>
                </el-form-item>
            </el-form>
            <el-col align="right">
                <el-button type="success"  class="greenButton" @click='emit'>提交</el-button>
                <el-button  class="whiteButton" @click='cancel'>取消</el-button>
            </el-col>
        </el-col>
    </el-row>
</template>
<script>
  /*当前组件必要引入*/
  let Util = null
  import api from '../api'
  import { changeErr as rules } from '../rules'

  export default {
    props: ['accessData', 'questionsId', 'subject', 'questionData', 'types'],
    data () {
      return {
        rules,
        formValidate: {
          remark: ''
        }
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        Util = this.$util
      },
      emit () {
        let funName = 'save' + this.accessData.replace(/\w/, s => s.toUpperCase())
        this[funName].call(this, () => this.$emit('sure'))
      },
      saveChangeErr (fn) {
        if (!this.submitForm('formValidate')) {
          return false
        }
        this.ajax({
          ajaxSuccess: () => {
            this.successMess('提交试题纠错成功！')
            fn && fn()
          },
          ajaxParams: {
            url: api.outofQuestion.path,
            method: api.outofQuestion.method,
            data: {
              questionId: this.questionsId,
              remark: this.formValidate.remark,
              resTypes: this.$route.query.types,
              types: '1',
              subject: this.subject,
            },
          },
        })
      },
      saveHard (fn) {
        this.ajax({
          ajaxSuccess: () => {
            this.successMess('添加到难题成功！')
            fn && fn()
          },
          ajaxParams: {
            url: api.add.path,
            method: api.add.method,
            data: {
              questionsLibraryType: 2,
              questionsId: this.questionsId
            },
          },
        })
      },
      saveEasy (fn) {
        this.ajax({
          ajaxSuccess: () => {
            this.successMess('添加到易错题成功！')
            fn && fn()
          },
          ajaxParams: {
            url: api.add.path,
            method: api.add.method,
            data: {
              questionsLibraryType: 1,
              questionsId: this.questionsId,
              // todo 需要加source，busId；接口逻辑还没有验证
              // source: this.questionData.
            },
          },
        })
      },
      cancel () {
        this.$emit('cancel')
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
    .showQuestionDetailOfModal {
        text-align: center;
        line-height: 40px;
    }
</style>

