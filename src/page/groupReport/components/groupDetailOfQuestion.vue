<!--
****--@file     groupDetailOfQuestion
****--@date     2018/3/22 9:42
****--@author   ${王恒}
****--@describe   布置作业题目详情
-->
<template>
    <div class="groupDetailOfQuestion-root">
        <div style="line-height: 39px" v-if="questionData instanceof Object">
            <el-row class="title-wrap">
                <el-col class="question-item-title">
                    <el-col :span="6">
                        <span>编号：{{questionData.no}}</span>
                    </el-col>
                    <el-col :span="10">
                        <template v-if="questionData.childQuestionsList instanceof Array">
                            <span v-if="questionData.childQuestionsList[0].paperName">所属试卷：{{questionData.childQuestionsList[0].paperName}}</span>
                        </template>
                        <template v-else>
                            <span v-if="questionData.paperName">所属试卷：{{questionData.paperName}}</span>
                            <span v-else style="visibility: hidden">1</span>
                        </template>
                    </el-col>
                    <el-col :span="8" align="right">
                        <template v-if="questionData.childQuestionsList instanceof Array">
                            <span v-if="questionData.childQuestionsList[0].answerNum">
                            <b>{{questionData.childQuestionsList[0].answerNum}}</b>人做过此题，正确率为<b>{{Number(questionData.childQuestionsList[0].accuracy || 0).toFixed(1)}}</b>%</span>
                        </template>
                        <template v-else>
                            <span v-if="questionData.answerNum"><b>{{questionData.answerNum}}</b>人做过此题，正确率为<b>{{Number(questionData.accuracy || 0).toFixed(1)}}</b>%</span>
                        </template>
                    </el-col>
                </el-col>

                <el-col class="question-item-title">
                    <el-col :span="6">
                        <template v-if="questionData.childQuestionsList instanceof Array">
                            <span>分值：{{questionData.childQuestionsList[0].score}}分</span>
                        </template>
                        <template v-else>
                            <span>分值：{{questionData.score}}分</span>
                        </template>
                    </el-col>
                    <el-col :span="10">
                        <template v-if="questionData.childQuestionsList instanceof Array">
                            <span>难易程度：{{questionData.childQuestionsList[0].diffLevelCode|diffLevelCode(self)}} </span>
                        </template>
                        <template v-else>
                            <span>难易程度：{{questionData.diffLevelCode|diffLevelCode(self) }}</span>
                        </template>
                    </el-col>
                </el-col>
            </el-row>
        </div>
        <div class="question-item-content">
            <question-show :showData="questionData" :showAnswer="true"></question-show>
        </div>
        <div class="buttom" v-if="$route.query.types!='hardOrEasyDefault'">
            <el-button type="text" @click='open("easy")' :disabled="questionData.isEasyWrong==1">易错题</el-button>
            <el-button type="text" @click='open("hard")' :disabled="questionData.isDifficult==1">难题</el-button>
            <el-button type="text" @click='open("changeErr")'>试题纠错</el-button>
        </div>
        <!--查看详情-->
        <Modal :mask-closable="false" :width="width" v-model="showDeatilModal" title="查看详情"
               class-name="showDeatilModal modalNoFooter"
               :loading="loading">
            <modal-header slot="header" :content="showDeatilModalId"></modal-header>
            <showDeatil v-if="showDeatilModal" @sure='sure' :accessData='accessData' @cancel="cancel('showDeatil')"
                        :id="id" :questionsId="$route.query.questionsId"
                        :questionData="requestData" :subject="questionData.subject" :types="types"></showDeatil>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
  /*当前组件必要引入*/

  import showDeatil from './showQuestionDetailOfModal.vue'
  import questionShow from '../../../components/questionShow/show.vue'

  let Util = null
  export default {
    data () {
      return {
        self: this,
        types: this.$route.query.types || '',
        id:'',//作业或测评id
        questionData: {},
        requestData: {},
        showDeatilModalId: {
          id: 'showDeatilModalId',
          title: ''
        },
        loading: true,
        width: 300,
        showDeatilModal: false,
        accessData: '',
        questionsId: ''
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        Util = this.$util
        this.getShowData()
      },

      getShowData () {
        let ajaxParams = {}
        if (this.types == 4) {
          this.requestData = {
            papersId: this.$route.query.assessmentId,
            questionsId: this.$route.query.questionsId,
            studentId:this.$route.query.studentId

          }
          this.id=this.$route.query.assessmentId
          ajaxParams = {
            url: '/evaluation/getQuestionsAnalysis',
            params: this.requestData
          }

        } else if (this.types == 'hardOrEasyDefault') {
          ajaxParams = {
            url: '/questions/get',
            params: {
              id: this.$route.query.questionsId
            }
          }
        } else {
          this.id=this.$route.query.assessmentId
          ajaxParams = {
            url: '/historyWork/getQuestionsAnalysis',
            params: {
              workId: this.$route.query.assessmentId,
              questionsId: this.$route.query.questionsId,
              groupsId: this.$route.query.groupsId,
              studentId:this.$route.query.studentId
            }
          }
        }
        this.ajax({
          ajaxSuccess: res => {
            this.questionData = res.data
          },
          ajaxParams: ajaxParams
        })
      },

      cancel (targer) {
        this[targer + 'Modal'] = false
      },
      open (val) {
        console.log(1)
        let title = {
          easy: '加入易错题',
          hard: '加入难题',
          changeErr: '试题纠错',
        }
        if (val == 'changeErr') {
          this.width = 600
        } else {
          this.width = 300
        }
        this.accessData = val
        this.showDeatilModalId.title = title[val]
        this.showDeatilModal = true
      },
      sure () {
        // this.getShowData()
        // this.showDeatilModal = false
        if(this.accessData=="easy"){
          this.questionData.isEasyWrong=1
        }else {
          this.questionData.isDifficult=1
        }
        this.showDeatilModal = false;

      }
    },
    created () {
      this.init()
    },
    mounted () {
    },
    components: {showDeatil, questionShow}
  }

</script>
<style lang="scss">
    .groupDetailOfQuestion-root {
        padding: 40px 30px 50px 30px;
        padding-bottom: 0px;
        .float {
            float: right;
        }
        .buttom {
            text-align: right;
        }
        .question-item-content {
            min-height: 462px;
        }
    }
</style>

