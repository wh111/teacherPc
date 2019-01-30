<!--
****--@file     Feedback_index
****--@date     2018/3/15 下午2:17
****--@author   jhd
****--@describe   意见反馈
-->
<template>
    <div class="suggestion-root">
        <h1>意见反馈</h1>
        <p v-if="show==false">感谢您对我们提出的宝贵意见,您的意见我们已经收到。</p>
        <div v-if="show==true">

            <p>对于我们平台，您有什么意见和建议欢迎提出 ，我们将虚心采纳。谢谢您的支持！</p>
            <el-form style="text-align: left;margin-top: 50px" :model="ruleFormTel" ref="ruleFormTel"
                     label-width="130px"
                     class="base-ruleFormSafe">
                <el-form-item label="反馈内容" prop="newPassword">
                    <el-input type="textarea" :rows="8" v-model="ruleFormTel.word" style="width: 690px;"></el-input>
                </el-form-item>
            </el-form>
            <button @click="submit" class="greenButton">提交</button>
        </div>
    </div>

</template>
<script>
  import api from './api'

  export default {
    data () {
      return {
        ruleFormTel: {
          word: '',
          title: '',
        },
        show: true
      }
    },
    methods: {
      submit () {
        if (this.ruleFormTel.word.length <= 0) {
          this.$message({
            showClose: true,
            message: '反馈内容不能为空',
            type: 'error'
          })
          return false
        }
        if (this.ruleFormTel.word.length >= 500) {
          this.$message({
            showClose: true,
            message: '反馈内容不能大于500字',
            type: 'error'
          })
          return false
        }
        this.ajax({//
          ajaxSuccess: this.RightSend,
          ajaxParams: {
            // baseURL:'PUBLIC',
            url: api.add.path,
            method: api.add.method,
            data: {
              content: this.ruleFormTel.word,
              title: this.ruleFormTel.title
            },
          },
        })
      },
      RightSend () {
        this.$message({
          showClose: true,
          message: '提交意见成功',
          type: 'success'
        })
        this.show = false
      },

    },
    created () {

    }
  }
</script>
<style lang="scss">
    .suggestion-root {
        margin: 0 auto;
        width: 950px;
        height: 720px;
        border-radius: 5px;
        background-color: #ffffff;
        text-align: center;
        h1 {
            font-family: MicrosoftYaHei;
            font-size: 30px;
            color: #11a63f;
            padding-top: 48px;
            margin-bottom: 20px;
        }
        p {

            height: 18px;
            font-family: MicrosoftYaHei;
            font-size: 17px;
            color: #434343;
        }
        button {
            width: 690px;
            height: 40px;
            border-radius: 3px;
            background-color: #11a63f;
            margin-top: 30px;
            font-size: 13px;
            line-height: 40px;
            color: #fff;
            border: none;
        }
    }

</style>