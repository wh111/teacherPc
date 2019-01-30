<!--
****--@file     view
****--@date     2018/3/20 17:38
****--@author   YC
****--@describe 题库查看
-->
<template>
    <el-row class="thematicLibraryInputBox">
        <h1 class="thematicLibraryInputTitle">题库详情</h1>
        <el-col class="mainBox">
            <!-- 选择试题 -->
            <el-col>
                <el-form label-width="86px">
                    <el-col class="questionTypeItem">
                        <el-form-item label="题库名称：">
                            {{ viewData.name }}
                        </el-form-item>
                    </el-col>
                    <el-col class="questionTypeItem">
                        <el-form-item label="题库说明：">
                            {{ viewData.remark }}
                        </el-form-item>
                    </el-col>
                    <el-col class="questionTypeItem">
                        <el-form-item label="创建时间：">
                            {{ viewData.createTime | formatDate('yyyy-MM-dd HH:mm') }}
                        </el-form-item>
                    </el-col>
                </el-form>
                <el-col class="questionSelectedBox">
                    <div class="questionSelectedItem" v-for="questionsTypeId in questionShowTypeOrder"
                         :key="questionsTypeId">
                        <!-- 题型 -->
                        <h2 class="qsiTitle">{{ questionsTypeList[questionsTypeId].name }}</h2>
                        <!-- 试题 -->
                        <div class="qsiContent">
                            <template v-for="(item,index) in getQuestionReview(questionsTypeId)">
                                <question-show class="qsmItem" :showData="item" v-if="item.basicType"
                                               :index="((questionReviewCurrent[questionsTypeId] - 1) * questionViewPageSize) + index + 1"
                                               :key="item.id" :show-answer="true" :showScore="true" :hasDo="140">
                                    <!-- 试题操作 -->
                                    <template slot="todoBox">
                                        <div class="qsTodoBox noSelect" align="right">
                                            <div class="qstdInfo">
                                                <!--<p class="qstdiItem">难度：{{ item.diffLevelCode |-->
                                                <!--diffLevelCode(self) }}</p>-->
                                                <p class="qstdiItem">难度：{{ item.diffLevel }}</p>
                                                <p class="qstdiItem">分值：{{ item.score }}分</p>
                                            </div>
                                        </div>
                                    </template>
                                </question-show>
                            </template>
                        </div>
                        <!-- 分页 -->
                        <div class="qsiCurrentPage" align="right"
                             @click="setQuestionReviewType(questionsTypeId)">
                            <el-pagination @current-change="currentChange" :page-size="questionViewPageSize"
                                           layout="total, prev, pager, next"
                                           :total="questionReview[questionsTypeId].length">
                            </el-pagination>
                        </div>
                    </div>
                </el-col>
            </el-col>
            <el-col align="center" :class="{'btnPadding': !questionShowTypeOrder.length}">
                <el-button @click="toBack"  class="greenButton" type="success">返回</el-button>
            </el-col>
        </el-col>
    </el-row>
</template>
<script>
  /*当前组件必要引入*/
  import api from './api'
  import questionShow from '../../../components/questionShow/show'
  //当前组件引入全局的util
  let Util = null
  export default {
    name: 'thematicLibraryView',
    data () {
      return {
        self: this,
        id: this.$route.params.id || -1,
        questionsTypeList: {}, // 题型列表
        chapterList: [], // 章节列表
        allChapterList: {}, // 章节列表缓存
        knowledgeList: {}, // 知识点
        userTextbookVersionInfo: {subject: '', textbookVersionName: ''}, // 当前老师的教材信息

        questionViewPageSize: 1, // 预览题型每页显示条数

        selectQuestionIdArr: [], // 选择的试题id(初始化时需要赋值处理)
        selectQuestionIds: [], // 存储选择试题的id(初始化时需要赋值处理)
        // selectQuestionDataObj: {}, // 选择的试题数据(初始化时需要赋值处理)
        questionShowTypeOrder: [], // 试题类型预览时顺序
        questionReview: {}, // 试题分类预览数据
        questionReviewIds: [], // 当前预览试题的id(初始化时需要赋值处理)[记录id防止重复选择]
        questionReviewCurrent: {}, // 试题分类预览分页数据

        questionReviewPageType: '', // 试题分类预览分页数据所在题型

        viewData: {name: '', remark: '', createTime: ''}
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        this.getQuestionsTypeList()
      },
      // 获取题型
      getQuestionsTypeList () {
        let opt = {
          ajaxSuccess: res => {
            let list = {}
            let arr = res.data
            if (arr instanceof Array) {
              arr.map(item => list[item.id] = item)
            }
            this.questionsTypeList = list
            this.getViewData()
          },
          ajaxParams: {
            url: api.questionsType.path
          }
        }
        this.ajax(opt)
      },
      // 获取保存数据
      getViewData () {
        let opt = {
          ajaxSuccess: 'setViewData',
          ajaxParams: {
            url: api.get.path,
            params: {
              id: this.id
            }
          }
        }
        this.ajax(opt)
      },
      // 返回
      toBack () {
        this.$router.push({name: 'questionBank', params: {view: 'thematicLibrary'}})
      },
      /**************************** 试题操作 ***************************/
      // 获取试题类型分页数据
      getQuestionReview (questionsTypeId) {
        let arr = this.questionReview[questionsTypeId]
        // 排除其他类型的题型分页影响
        let qtId = this.questionReviewPageType == questionsTypeId ? this.questionReviewPageType : questionsTypeId
        let start = (this.questionReviewCurrent[qtId] - 1) * this.questionViewPageSize
        let end = this.questionReviewCurrent[qtId] * this.questionViewPageSize
        end = end > arr.length ? arr.length : end
        // 数据分页
        return arr.slice(start, end)
      },
      // 点击分页时设置对应的分页所在的类型
      setQuestionReviewType (questionsTypeId) {
        this.questionReviewPageType = questionsTypeId
      },
      // 预览试题分类分页
      currentChange (v) {
        this.questionReviewCurrent[this.questionReviewPageType] = v
      },
      /**************************** 试题转换 ***************************/
      // 初始化查看数据
      setViewData (res) {
        let data = res.data;
        res.data.questionsList.map((item)=>{
          item.studentAnswer = undefined;
          if(item.childQuestionsList){
            item.childQuestionsList.map((itemSmall)=>{
              itemSmall.studentAnswer = undefined;
            })
          }


        })
        let {name, remark, createTime, questionsList} = data
        let viewData = {name, remark, createTime, questionsList}
        let questionsObj = {}
        Object.keys(viewData).map(key => this.viewData[key] = viewData[key])
        questionsList.map(item => questionsObj[item.id] = item)
        this.questionClassification(questionsObj)
      },
      // 试题分类
      questionClassification (questionsObj) {
        let selectQuestionDataObj = questionsObj
        let questionReview = {}
        let questionReviewCurrent = {}
        Object.keys(selectQuestionDataObj).map(qid => {
          let item = selectQuestionDataObj[qid]
          if (!questionReview[item.questionsTypeId]) { // 根据试题类型进行分类
            questionReviewCurrent[item.questionsTypeId] = 1 // 所有题型默认显示第一页数据
            questionReview[item.questionsTypeId] = []
          }
          questionReview[item.questionsTypeId].push(item)
        })
        // 初始化各题型预览分页
        this.questionReviewCurrent = questionReviewCurrent
        // 根据所选的试题类型进行排序
        this.getShowQuestionTypeOrder(Object.keys(questionReview))
        this.questionReview = questionReview
      },
      // 获取试题类型显示顺序
      getShowQuestionTypeOrder (questionTypes = []) {
        let questionTypesOrder = [[], []] // 试题类型排序后的数据(0表示的是系统默认题型、1表示用户自定义题型)
        questionTypes.map(id => questionTypesOrder[id < 0 ? 0 : 1].push(id)) // id分类
        // 排序处理
        questionTypesOrder[0].sort((a, b) => b - a) // 倒序
        questionTypesOrder[1].sort((a, b) => a - b) // 正序
        this.questionShowTypeOrder = [].concat(...questionTypesOrder[0], ...questionTypesOrder[1])
      },
    },
    created () {
      this.init()
    },
    mounted () {
    },
    components: {
      questionShow
    }
  }

</script>
<style lang="scss">
    @import "../../css/thematicLibraryView";
</style>
