<!--
****--@file     makeanswer
****--@date     2017/12/18 下午3:18
****--@author   jhd
****--@describe   我来解答
-->
<template>
    <div class="make-answer">
        <div class="wrap">
            <div class="show-head">
                <p class="title">{{detail.title}}</p>
                <p class="tip">
                    <span>发表人：{{detail.questionerName}}</span> <span>|</span>
                    <span>年级：{{detail.grade | grade(self)}}</span> <span>|</span>
                    <span>科目：{{detail.subject | subject}}</span> <span>|</span>
                    <span>日期：{{detail.createTime | formatDate('yyyy-MM-dd HH:mm')}}</span>
                    <span>悬赏积分：{{detail.rewardIntegral}}积分</span>
                </p>
            </div>
            <div class="show-content">
                <!--<p style="font-size: 14px; color: #a0a0a0;margin-top: 10px;text-indent:0;">问题详情</p>-->
                <p v-html="detail.content"></p>
                <!--<div class="img-wrap">-->
                <!--<img width="230" src="../../../../assets/images/ques-1111.png" alt="">-->
                <!--</div>-->
                <div class="notic clearfix" style="margin-top: 10px">
                    <span>难题原因</span>
                    <p class="tip">
                        <span v-html="detail.reason"></span>
                    </p>
                </div>
            </div>
        </div>
        <div class="answer-content">
            <p class="title">我来解答</p>
            <el-form ref="formValidate" :model="formValidate" label-width="100px">
                <el-form-item label="内容：" prop="content">
                    <simditor @valuechanged="getInfo"></simditor>
                    <p class="tip">提示：描述此题的难点，自己做不出来的地方。</p>
                </el-form-item>
                <el-form-item label="解题建议：" prop="result">
                    <simditor @valuechanged="getResult" :toolbarHidden="true"></simditor>
                    <p class="tip">提示：描述此题的难点，自己做不出来的地方。</p>
                </el-form-item>
            </el-form>
            <p class="load-btn-wrap">
                <load-btn style="padding: 10px 30px;" @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
            </p>
        </div>
    </div>
</template>
<script>
  /*当前组件必要引入*/
  import simditor from '../../../components/common/simditor.vue'
  import api from '../api'

  let Util = null
  export default {
    data () {
      return {
        self: this,
        loadBtn: {title: '提交', callParEvent: 'listenSubEvent'},
        formValidate: {
          content: '',
          result: ''
        },
        addMessTitle: {
          type: 'add',
          callback: 'close',
          successTitle: '发表成功!',
          errorTitle: '发表失败!',
          ajaxSuccess: res => this.successMess('发表成功!'),
          ajaxError: 'ajaxError',
          ajaxParams: {}
        },
        detail: []
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        Util = this.$util
        this.queryQptions = {
          url: api.myQuestionDetail.path,
          params: {
            id: this.$route.query.id
          },
        },
          this.setListData()
      },
      getResult (content) {//获取难题原因
        this.formValidate.reason = content
      },
      setListData (isLoading) {
        //this.queryQptions.params = Object.assign(this.queryQptions.params, this.formValidate);
        this.ajax({
          ajaxSuccess: this.listDataSuccess,
          ajaxParams: this.queryQptions,
        }, isLoading)
      },
      listDataSuccess (res) {
        this.detail = res.data
      },
      getInfo (content) {//获取内容
        this.formValidate.content = content
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
      /*
      * 点击提交按钮 监听是否提交数据
      * @param isLoadingFun boolean  form表单验证是否通过
      * */
      listenSubEvent (isLoadingFun) {
        let isSubmit = this.submitForm('formValidate')
        if (isSubmit) {
          if (!isLoadingFun) isLoadingFun = function () {
          }
          isLoadingFun(true)

          this.addMessTitle.ajaxParams.data = this.getFormData(this.formValidate)

          this.ajax({
            ajaxSuccess: this.submitSuccess,
            error: () => {
            },
            ajaxParams: {
              url: api.addAnswer.path,
              method: api.addAnswer.method,
              jsonString:true,
              data: {
                problemId: this.$route.query.id,
                files: '',
                proposal: this.formValidate.reason,
                answer: this.addMessTitle.ajaxParams.data.content,
              },

            },
          }, isLoadingFun)

        }
      },
      submitSuccess () {
        this.successMess('解答成功!')
        this.$router.push({path: '/selfCenter/troubleShooting'})
      },

      /*
          * 获取表单数据
          * @return string  格式:id=0&name=aa
          * */
      getFormData (data) {
        let myData = Util._.defaultsDeep({}, data)
        return myData
      }

    },
    created () {
      this.init()
    },
    mounted () {
    },
    components: {
      simditor
    }
  }

</script>
<style lang="scss">
    .make-answer {
        .wrap {
            width: 950px;
            padding: 30px;
            border-radius: 3px;
            background: #ffffff;
            .show-head {
                text-align: center;
                border-bottom: 1px solid #e5e5e5;
                .title {
                    font-size: 30px;
                    letter-spacing: 0.2px;
                    color: #313131;
                }
                .tip {
                    margin: 15px 0;
                    font-size: 12px;
                    letter-spacing: 0.1px;
                    color: #a0a0a0;
                    span {
                        margin: 0 8px;
                    }
                }
            }
            .show-content {
                p {
                    margin-top: 30px;
                    font-size: 14px;
                    text-align: left;
                    color: #434343;
                    text-indent: 2em;
                    font-size: 14px !important;
                }
                span {
                    font-size: 14px !important;
                }
                .img-wrap {
                    text-align: center;
                    padding: 20px;
                }
            }
            .notic {
                span {
                    float: left;
                    font-size: 14px;
                    text-align: left;
                    color: #a0a0a0;
                    height: auto;
                }
                .tip {
                    float: right;
                    margin-top: 0px;
                    padding: 0 10px;
                    width: 827px;
                    border-radius: 5px;
                    background-color: #e7f9ed;
                    border: 1px solid #cccccc;
                    line-height: 2;
                    font-size: 14px;
                    text-align: left;
                    color: #434343;
                }
            }
        }
        .answer-content {
            margin-top: 30px;
            border-radius: 3px;
            padding: 30px 30px;
            width: 950px;
            background: #fff;
            .title {
                font-size: 18px;
                letter-spacing: 0.1px;
                text-align: left;
                color: #434343;
                margin-bottom: 5px;
            }
            .el-form {
                border-top: 1px solid #e5e5e5;
            }
            .el-form-item--small {
                border-bottom: 1px solid #e5e5e5;
                padding: 10px 0;
                margin: 0;
                .tip {
                    font-size: 12px;
                    line-height: 1.8;
                    text-align: left;
                    color: #a0a0a0;
                }
                .el-form-item__content {
                    .el-input--small {
                        width: 690px;
                    }
                }
                .el-select--small {
                    .el-input {
                        width: 150px;
                    }
                }
            }
            .load-btn-wrap {
                text-align: center;
                margin-top: 20px;
            }
        }
    }

    .make-answer .wrap .notic .tip span p {
        margin-top: 0;
    }
</style>