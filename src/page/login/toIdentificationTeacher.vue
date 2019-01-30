<!--
****--@file     toIdentificationTeacher
****--@date     2018/3/14 15:26
****--@author   wh
****--@describe   教师认证
-->
<template>
    <div style="margin: 0 auto;text-align: center">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" style="text-align: left"
                 class="base-introduce1">
            <el-form-item label="真实姓名:" prop="name">
                <el-input v-model="ruleForm.name" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码:" prop="idcard">
                <el-input v-model="ruleForm.idcard" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="教师资格证编号:" prop="teachCertNo">
                <el-input v-model="ruleForm.teachCertNo" style="width: 180px"></el-input>
            </el-form-item>

            <el-form-item label="资格类型:" prop="types">
                <el-select @change="selectGrade" v-model="ruleForm.types" placeholder="请选择"
                           style="width: 130px">
                    <el-option value='0' label="小学教师"></el-option>
                    <el-option value='1' label="初中教师"></el-option>
                    <el-option value='2' label="高中教师"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="任教学科:" prop="subject" >
                <el-select v-model="ruleForm.subject" placeholder="请选择" @change="queryTextbookVersion"
                           style="width: 130px">
                    <el-option v-for="item in subjectList" :key='item.code' :value='item.code' :label='item.value'>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="使用教材:" prop="textbookVersionId">
                <el-select v-model="ruleForm.textbookVersionId" placeholder="请选择"
                           style="width: 130px">
                    <el-option
                            v-for="item in textbookVersionList"
                            :key="item.textbookVersionId"
                            :label="item.name"
                            :value="item.textbookVersionId">
                    </el-option>
                </el-select>
            </el-form-item>



        </el-form>

            <!--<el-button type="primary" @click="deserve('ruleForm')">提交</el-button>-->
        <load-btn @listenSubEvent="listenSubEvent" :btnData="submitBtn"></load-btn>


    </div>
</template>
<script>
  /*当前组件必要引入*/
  let Util = null
  import { identification as rules } from './rules'
  import api from './api'

  export default {
    data () {
      return {
        rules,
        ruleForm: {
          name: '',
          idcard: '',
          teachCertNo: '',
          types: '',
          subject: '',
          textbookVersionList: [{textbookVersionId: '', subject: ''}],
          textbookVersionId: ''

        },
        subjectList: [],
        submitBtn: {title: '提交', callParEvent: 'listenSubEvent'},
        textbookVersionList: [],

      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        Util = this.$util
       // this.textbookVersionList = this.$store.state.app.envs.textBookVersionList
      },
      queryTextbookVersion(){//获取教材版本
        this.ruleForm.textbookVersionId='';
        this.ajax({
          ajaxSuccess: (res)=>{ this.textbookVersionList=res.data.dataList},
          ajaxParams: {
            //baseURL:'PUBLIC',
            url: api.queryTextbookVersion.path,
            method: api.queryTextbookVersion.method,
            params:{
              subject:this.ruleForm.subject
            }
          },
        })
      },
      selectGrade(){
        if(this.ruleForm.types=='0'){
          this.subjectList = this.$store.state.app.envs.gradeMap[2]
        }else{
          this.subjectList = this.$store.state.app.envs.gradeMap[11]
        }
      },
      listenSubEvent () {
        this.deserve('ruleForm')
      },

      deserve (formName) {
        this.ruleForm.textbookVersionList[0].subject = this.ruleForm.subject
        this.ruleForm.textbookVersionList[0].textbookVersionId = this.ruleForm.textbookVersionId
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ajax({
              ajaxSuccess: this.identificationSuccess,
              ajaxParams: {
                //baseURL:'PUBLIC',
                jsonString: true,
                url: api.identify.path,
                method: api.identify.method,
                data: this.ruleForm,
              },
            })
          } else {
            return false
          }
        })
      },
      identificationSuccess () {
        this.$emit('closeIdentification')
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

</style>