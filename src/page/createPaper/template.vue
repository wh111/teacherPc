<!--
****--@file     template
****--@date     2018/4/2 14:31
****--@author   YC
****--@describe 通过模版创建评测
-->
<template>
    <div class="assignment">
        <h1 class="aTopTitle">
            <span v-if="type=='template'">模板组卷</span>
            <span v-else> 智能组卷</span></h1>
        <div class="aStepBox">
            <el-steps class="aStep" :active="step" finish-status="success">
                <el-step></el-step>
                <el-step></el-step>
            </el-steps>
        </div>
        <el-row class="aMain">
            <!-- 第一步 -->
            <el-col v-if="step === 0">
                <el-form label-width="100px" ref="formValidate" :model="formValidate" :rules="testPaperManagementZn0">
                    <el-col>
                        <el-form-item label="试卷名称" prop="title">
                            <el-input v-model="formValidate.title" class="amTitleInput"
                                      placeholder="请输入试卷名称"></el-input>
                        </el-form-item>
                        <el-form-item label="设置时间" class="el-form--inline amSetTime">
                            <date-group
                                    :dateGroup="{text:'',startDate:formValidate.startTime,endDate:formValidate.submitTime}">
                                <el-form-item slot="start" prop="startTime" label="发布时间" label-width="80px">
                                    <el-date-picker v-model="formValidate.startTime" type="datetime" :editable="false"
                                                    placeholder="选择发布时间" :picker-options="pickerOptions0"
                                                    @change="handleStartTime">
                                    </el-date-picker>
                                </el-form-item>
                                <i></i>
                                <el-form-item slot="end" prop="submitTime" label="截止时间" label-width="80px"
                                              class="amstEnd">
                                    <el-date-picker v-model="formValidate.submitTime" type="datetime" :editable="false"
                                                    placeholder="选择截止时间" :picker-options="pickerOptions1"
                                                    @change="handleEndTime">
                                    </el-date-picker>
                                </el-form-item>
                            </date-group>
                            <el-form-item prop="publishAnswerTime" label="公布答案" label-width="80px">
                                <el-date-picker v-model="formValidate.publishAnswerTime" type="datetime"
                                                :editable="false"
                                                placeholder="选择公布答案时间" :picker-options="pickerOptions1"
                                                @change="handleEndTime">
                                </el-date-picker>
                            </el-form-item>
                        </el-form-item>
                        <!--<el-form-item label="防舞弊设置">-->
                            <!--<el-checkbox v-model="formValidate.cheatSetQuestionsSeqRandom" true-label='1'-->
                                         <!--false-label='0'-->
                                         <!--value="0">题目顺序随机-->
                            <!--</el-checkbox>-->
                            <!--<el-checkbox v-model="formValidate.cheatSetOptionsSeqRandom" true-label='1' false-label='0'-->
                                         <!--value="0">选择题候选项随机-->
                            <!--</el-checkbox>-->
                        <!--</el-form-item>-->
                        <el-form-item label="答题时长" prop="times">
                            <el-input v-model="formValidate.times" class="amTimeInput" placeholder="请输入答题时长"></el-input>
                            分钟
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-col>
            <!-- 第二步：题目分布信息 -->
            <el-col v-if="step === 1">
                <el-table align="center" :context="self" maxHeight="400" class="qtt_questionKnowledgeTable"
                          :data="questionsInfo" tooltip-effect="dark"
                          :summary-method="getSummaries" show-summary>
                    <el-table-column label="题型" prop="type" show-overflow-tooltip></el-table-column>
                    <el-table-column label="数量" prop="num" show-overflow-tooltip></el-table-column>
                    <template v-if="formValidate.scoreType === 1">
                        <el-table-column label="单题分值" prop="score" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.score" @input="setThisTotalScore(scope.row)"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="总分" prop="totalScore" show-overflow-tooltip></el-table-column>
                    </template>
                    <el-table-column label="知识点" prop="knowledges" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <p v-for="(item,index) in scope.row.knowledges" :key="index">
                                {{ item.knowledgeName }}（{{ item.num }}）
                            </p>
                        </template>
                    </el-table-column>
                </el-table>
                <!--<h3 class="qtt_h3Title">难度预估：</h3>-->
                <el-row class="qtt_chartMain">
                    <!--<el-col :span="4">-->
                    <!--<p class="qtt_centerText difNum">难度值：{{ (selectFormValidate.diffLevelCode || '全部') |-->
                    <!--diffLevelCode(self)-->
                    <!--}}</p>-->
                    <!--</el-col>-->
                    <el-col :span="12">
                        <div id="questionsTypes" class="qtt_chartBox"></div>
                        <!--<p class="qtt_centerText">题型分布</p>-->
                    </el-col>
                    <el-col :span="12">
                        <div id="questionsKnowledges" class="qtt_chartBox"></div>
                        <!--<p class="qtt_centerText">知识点分布</p>-->
                    </el-col>
                </el-row>
                <el-form ref="formValidate" :model="formValidate" :rules="testPaperManagementZn2" :inline="true"
                         label-width="100px">
                    <!--<el-col>-->
                        <!--<el-form-item label="定义分数：">-->
                            <!--<el-radio-group v-model="formValidate.scoreType" @change="changeScoreType">-->
                                <!--<el-radio :label="2">使用试题库分数，并将总分折算为 100分</el-radio>-->
                                <!--<el-radio :label="1" v-if="type!='template'">自定义各题型分值，总分为 {{ formValidate.score }}</el-radio>-->
                            <!--</el-radio-group>-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--<el-col v-if="paperType!=='homework'">-->
                    <!--<el-form-item label="答题时长：" prop="times">-->
                    <!--<el-input v-model="formValidate.times">-->
                    <!--<template slot="append">分钟</template>-->
                    <!--</el-input>-->
                    <!--</el-form-item>-->
                    <!--</el-col>-->
                </el-form>
            </el-col>
            <!-- 底部按钮 -->
            <el-col align="center" class="amFooterBtn">
                <el-button type="info" v-show="step" @click="prev">上一步</el-button>
                <el-button class="greenButton" type="success" @click="next" v-show="step < 1">下一步</el-button>
                <load-btn @preview="preview" v-show="step === 1" :btnData="saveBtn"></load-btn>
                <!--<load-btn @saveTemp="saveTemp" v-show="step === 1" :btnData="saveTempBtn"></load-btn>-->
            </el-col>
        </el-row>
    </div>
</template>
<script>
  /*当前组件必要引入*/
  import api from './api'
  import questionDiffLevelOption from '../../components/common/questionDiffLevelOption'
  import { testPaperManagementZn0, testPaperManagementZn1, testPaperManagementZn2 } from './rules'

  var Echarts = require('echarts')
  //当前组件引入全局的util
  let Util = null
  export default {
    name: 'createPaperTemplate',
    props: ['groupId', 'type', 'templateId'],
    data () {
      return {
        self: this,
        step: 0,
        testPaperManagementZn0, testPaperManagementZn1, testPaperManagementZn2,
        formValidate: {
          'textbookVersionId': '', // 教材版本ID
          'subject': '', // 科目
          'grade': '', // 年级：1-12
          'term': '', // 学期
          'stage': '', // 阶段 (预览使用)
          'questionType': [], // 问题类型 (预览使用)
          'title': '', // 作业名称（试卷名称）
          'remark': '', // 试卷说明
          'groupsId': '', // 班组Id
          'score': 100, // 作业总分 (由totalScore改的)
          'totalQuestions': '0', // 总题数
          'diffLevel': '', // 预估难度
          'startTime': new Date(), // 发布时间，时间戳
          'submitTime': new Date().setDate(new Date().getDate() + 1), // 截止时间，时间戳
          'publishAnswerTime': new Date().setDate(new Date().getDate() + 1),
          'times': '', // 答题时长
          'cheatSetQuestionsSeqRandom': '0', // 试题顺序随机：0否、1是
          'cheatSetOptionsSeqRandom': '0', // 选项顺序随机：0否、1是
          'scoreType': 2, // 1 自定义个题型分值 2 使用试题库分数，并将总分折算为score (预览使用)
          'questionsTypeScore': [], // 自定义试题类型分数(预览使用)
          'questionsList': [
            // {
            //   "questionsId":"", // 试题ID
            //   "score":"" // 试题分值
            // },
          ]
        },
        userTextbookVersionInfo: {subject: '', textbookVersionName: ''}, // 当前老师的教材信息

        paperType: 'homework', // 试卷类型(homework布置作业|intelligent智能组卷)

        questionsType: {}, // 题型列表
        saveBtn: {title: '预览', callParEvent: 'preview'},
        saveTempBtn: {title: '点击存为模版', callParEvent: 'saveTemp', type: 'text'},

        // 缓存所有章节
        allChapter: {},
        allknowledge: {}, // 缓存所有知识点
        headerSelectObj: {}, // 第一步选择的所有数据
        chapterListLen: 0,
        knowledgeListLen: 0,
        chapterList: null, // 章节
        knowledgeList: null, // 知识点
        checkAllChapter: false,
        isIndeterminateChapter: false,
        checkAllKnowledge: false,
        isIndeterminateKnowledge: false,

        questionHeader: [], // 试卷题目类型
        questions: [], // 查询试题数量（智能组卷）

        // 第二步表单
        selectFormValidate: {
          diffLevelCode: '', // 难度
          selectChapter: [], // 选中的章节
          selectknowledge: [] // 选中的知识点
        },

        // 第三歩
        questionsInfo: [], // 试卷基本信息

        // 接口
        // api: {
        //   questionsType: 'questionsType/query-all', //题型
        //   chapter: 'textbookContent/queryChapterList',
        //   knowledge: 'textbookContent/queryKnowledgeListByChapter',
        //   questions: 'papers/questions/group' // 查询试题数量（智能组卷）
        // }

        templateData: {} // 模版数据
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        console.log(this.type)
        Util = this.$util
        let textbookVersionList = this.$store.getters['user/info']('textbookVersionList')
        if (textbookVersionList && textbookVersionList.length) {
          let {textbookVersionId, subject} = textbookVersionList[0]
          this.userTextbookVersionInfo = textbookVersionList[0]
          this.formValidate.textbookVersionId = textbookVersionId
          this.formValidate.subject = subject
        }
        this.formValidate.groupsId = this.groupId
        this.paperType = this.type
        this.getQuestionsType()
        if (this.templateId) { // 通过模版创建
          this.getPapersTemplate()
        }
      },
      /******************************* 数据验证 **********************************/
      // 检测第一步数据是否正确
      checkedData0 () {
        return this.submitForm('formValidate')
      },
      // 检测预览数据
      checkPreviewData () {
        if (this.formValidate.scoreType === 1) {
          for (let i = 0, d = this.questionsInfo, l = d.length; i < l; i++) {
            if (!d[i].score || !/^\d{1,2}$/.test(d[i].score)) {
              this.errorMess('每个题型的分数必须填写并且是有效的两位数')
              return false
            }
          }
        }
        return true
      },
      /******************************* 按钮交互 **********************************/
      // 上一步
      prev () {
        this.step--
      },
      // 下一步
      next () {
        let checkData = this['checkedData' + this.step]
        if (typeof checkData === 'function' && !checkData()) {
          // 数据检测未通过
          return
        }
        //下一步
        this.step++
        switch (this.step) {
          case 1:
            this.getQuestionsInfo()
            break
          default:
            break
        }
      },
      // 改变分数类型
      changeScoreType (type) {
        if (type === 2) {
          this.formValidate.score = 100
        }
      },
      // 预览
      preview (isLoadingFun) {
        if (!this.submitForm('formValidate') || !this.checkPreviewData()) {
          return
        }
        let data = this.getPreviewData()
        if (!isLoadingFun) isLoadingFun = function () {
        }
        isLoadingFun(true)
        // 缓存智能组卷数据提供下次“换一批”
        this.$store.commit('papers/initZnPreview', data)
        let opt = {
          error: () => isLoadingFun(false),
          ajaxSuccess: res => {
            this.$store.commit('papers/init')
            this.$store.commit('papers/updateInfo', res.data)
            this.$store.commit('papers/initQuestionsList', res.data.questionsList)
            this.$store.commit('papers/getShowQuestionTypeOrder')
            this.$router.push({name: 'preview', params: {type: this.type}})
            // this.$emit('preview', true)
          },
          ajaxError: () => this.errorMess('预览试卷失败，请重试'),
          ajaxParams: {
            jsonString: true,
            url: api.preview.path,
            method: api.preview.method,
            data
          }
        }
        this.ajax(opt, isLoadingFun)
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
       * 重置当前表单
       * */
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      /*
       * 获取表单数据
       * @return string  格式:id=0&name=aa
       * */
      getFormData (data) {
        let myData = Util._.defaultsDeep({}, data)
        return myData
      },

      // 初始化图表
      initChar (obj) {
        let charts = ['questionsTypes', 'questionsKnowledges']
        let myChart = {}
        this.$nextTick(() => {
          charts.map(item => myChart[item] = Echarts.init(document.getElementById(item)))
          for (let key in myChart) {
            myChart[key].setOption(obj[key])
          }
        })
      },
      // 统计试卷信息
      getSummaries (param) {
        const {columns, data} = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计'
            return
          }
          if (!~[1, 3].indexOf(index)) {
            return
          }
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
          } else {
            sums[index] = '该列只允许输入数字'
          }
          if (index === 3) { // 计算总分
            this.formValidate.score = sums[index]
          }
        })

        return sums
      },
      // 设置该题型的总分
      setThisTotalScore (row) {
        let res = 0
        if (!isNaN(row.num)) {
          res = row.num * row.score
        }
        row.totalScore = res
      },
      /******************************* 数组转换 ***************************/
      // 获取试卷信息表格数据
      getQuestionsInfoTable () {
        let questionTypes = {} // 所有题型
        let table = [] // 表格数据
        let score = {};
        (this.templateData.papersTemplateScoreList || []).map(item => score[item.questionsTypeId] = item)
        this.templateData.papersTemplateInfoList.map(item => {
          if (!questionTypes[item.questionsTypeId]) {
            questionTypes[item.questionsTypeId] = { // 表格每一行的数据
              questionsTypeId: item.questionsTypeId, // 试题类型id
              type: item.questionsTypeName, // 试题类型
              num: 0, // 试题数量
              score: this.templateData.scoreType === 1 ? score[item.questionsTypeId].score : '', // 单题分值
              totalScore: 0, // 总分
              knowledges: [] // 知识点
            }
          }
          // 累加每个知识点对应的题型数量
          questionTypes[item.questionsTypeId].num += +(item.selectNum)
          // 该题型下的知识点(只有该知识点有数量才会加入到该题型下)
          questionTypes[item.questionsTypeId].knowledges.push({
            knowledgeId: item.knowledgeId,
            knowledgeName: item.knowledgeName,
            num: item.selectNum, // 该知识点在该题型下的数量
            total: item.total // // 该知识点在该题型下的总数量
          })
        })

        let totalQuestions = 0 // 统计所有试题量
        for (let key in questionTypes) {
          // 删除没有使用的知识点
          let knowledges = []
          let totalScore = 0
          questionTypes[key].knowledges.map(item => {
            if (+item.num) {
              totalQuestions += +item.num
              knowledges.push(item)
            }
          })
          totalScore = questionTypes[key].score !== '' ? questionTypes[key].num * questionTypes[key].score : 0
          questionTypes[key].knowledges = knowledges
          questionTypes[key].totalScore = totalScore
          // 只有试题下有题目才会加入到表格中
          questionTypes[key].num && table.push(questionTypes[key])
        }
        questionTypes = null

        this.formValidate.totalQuestions = totalQuestions
        this.questionsInfo = table
      },
      // 获取试题类型及分数数据
      getQuestionsTypeAndScore () {
        let questionsTypeScore = []
        let condition = []
        let scoreType = this.formValidate.scoreType

        this.questionsInfo.map(item => {
          questionsTypeScore.push({
            questionsTypeId: item.questionsTypeId,
            score: scoreType === 1 ? item.score : '' // 自定义的分数的时候才读取分数
          })
          item.knowledges.map(kItem => {
            let {knowledgeId, total, num: selectCount} = kItem
            condition.push({
              questionsTypeId: item.questionsTypeId,
              knowledgeId, total, selectCount
            })
          })
        })

        return {questionsTypeScore, condition}
      },
      // 获取预览提交数据
      getPreviewData () {
        let data = this.getFormData(this.formValidate)
        // let questionsTypeScore = []
        // let condition = []

        // 时间转换
        data.times = (data.times || 0) * 60 // 分钟转换为秒
        data.startTime = this.conductDate(data.startTime, 'yyyy-MM-dd HH:mm:ss')
        data.submitTime = this.conductDate(data.submitTime, 'yyyy-MM-dd HH:mm:ss')
        data.publishAnswerTime = this.conductDate(data.publishAnswerTime, 'yyyy-MM-dd HH:mm:ss') || ''
        // 阶段
        data.stage = data.grade > 6 ? (data.grade > 9 ? 2 : 1) : '0'

        // 难度、知识点
        // let {diffLevelCode} = this.selectFormValidate
        // data.diffLevelCode = diffLevelCode

        // let difMap = this.questionDiffMap[diffLevel]; // 获取难度区间
        // let dif = ['', ''];
        // if (difMap) {
        //     dif = difMap.split(',')
        // }
        // data.diffLevelSmall = dif[0];
        // data.diffLevelBig = dif[1];

        // this.questionsInfo.map(item => {
        //   questionsTypeScore.push({
        //     questionsTypeId: item.questionsTypeId,
        //     score: data.scoreType === 1 ? item.score : '' // 自定义的分数的时候才读取分数
        //   })
        //   item.knowledges.map(kItem => {
        //     let {knowledgeId, total, num: selectCount} = kItem
        //     condition.push({
        //       questionsTypeId: item.questionsTypeId,
        //       knowledgeId, total, selectCount
        //     })
        //   })
        // })
        //
        let {questionsTypeScore, condition} = this.getQuestionsTypeAndScore()
        data.questionsTypeScore = questionsTypeScore
        data.condition = condition

        return data
      },
      // 根据模版数据初始化
      initPapersByTemplate (res) {
        let data = res.data
        let formValidate = this.formValidate
        let questionType = [];
        ['score', 'scoreType', 'diffLevelCode', 'subject', 'textbookVersionId', 'totalQuestions', 'term'].map(key => formValidate[key] = data[key]);
        (data.papersTemplateInfoList || []).map(item => {
          if (!questionType.includes(item.questionsTypeId)) {
            questionType.push(item.questionsTypeId)
          }
        })
        formValidate.title = data.templateName
        formValidate.grade = data.grade.toString()
        formValidate.questionType = questionType
        this.templateData = data
      },
      /******************************* 数据获取 ****************************/
      // 根据选择的所选的题型获取表格头部
      getQuestionHeader () {
        let t = []
        this.formValidate.questionType.map(item => t.push({
          label: this.questionsType[item].name,
          prop: this.getQuestionHeaderProp(item, true)
        }))
        this.questionHeader = t
      },
      // 获取试卷信息
      getQuestionsInfo () {
        // 计算试卷信息
        this.getQuestionsInfoTable()
        let questionsTypesDataObj = {} // 问题类型信息
        let questionsTypesNameArr = [] // 问题类型数组
        let questionsTypesDataArr = [] // 问题类型对应的数量信息数组
        let questionsKnowledgesNameObj = {} // 知识点类型[缓存使用]
        let questionsKnowledgesNameArr = [] // 知识点类型数组
        let questionsKnowledgesDataArr = []; // 知识点类型对应的数量信息数组

        (this.templateData.papersTemplateInfoList || []).map(item => {
          if (!questionsTypesDataObj[item.questionsTypeName]) {
            questionsTypesDataObj[item.questionsTypeName] = {value: 0, name: item.questionsTypeName}
          }
          questionsTypesDataObj[item.questionsTypeName].value += item.selectNum
          if (!questionsKnowledgesNameObj[item.knowledgeId]) {
            questionsKnowledgesNameObj[item.knowledgeId] = {name: item.knowledgeName, value: +item.selectNum}
          } else {
            questionsKnowledgesNameObj[item.knowledgeId].value += +item.selectNum
          }
        })

        Object.keys(questionsTypesDataObj).map(id => {
          questionsTypesDataArr.push(questionsTypesDataObj[id])
          questionsTypesNameArr.push(questionsTypesDataObj[id].name)
        })

        console.log(questionsTypesNameArr)
        console.log(questionsTypesDataArr)
        console.log(questionsKnowledgesNameObj)

        for (let key in questionsKnowledgesNameObj) {
          questionsKnowledgesNameArr.push(questionsKnowledgesNameObj[key].name)
          questionsKnowledgesDataArr.push(questionsKnowledgesNameObj[key])
        }

        // 计算统计图数据
        let chartsOptions = {
          questionsTypes: {
            title: {
              text: '题型分布',
              x: 'center',
              y:'bottom'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: questionsTypesNameArr
            },
            series: [
              {
                name: '题型分布',
                type: 'pie',
                radius: '55%',
                center: ['50%', '40%'],
                data: questionsTypesDataArr,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          },
          questionsKnowledges: {
            title: {
              text: '知识点分布',
              x: 'center',
              y:'bottom'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: questionsKnowledgesNameArr
            },
            series: [
              {
                name: '知识点分布',
                type: 'pie',
                radius: '55%',
                center: ['50%', '40%'],
                data: questionsKnowledgesDataArr,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          }
        }

        this.initChar(chartsOptions)
      },
      // 获取题型
      getQuestionsType () {
        this.getDataForServer('questionsType', {type: 0}, obj => this.questionsType = obj)
      },
      // 从服务器获取选择数据
      getDataForServer (type, params, call, isObj = true) {
        let opt = {
          ajaxSuccess: res => {
            let data = {}
            if (isObj && res.data instanceof Array && res.data.length) {
              res.data.map(item => data[item.id] = item)
            } else {
              data = null
            }
            call && call(data, res)
          },
          ajaxError: () => this.errorMess('获取数据失败，请重试'),
          ajaxParams: {
            url: api[type],
            params
          }
        }
        this.ajax(opt)
      },
      // 获取模版
      getPapersTemplate () {
        let opt = {
          ajaxSuccess: 'initPapersByTemplate',
          ajaxParams: {
            url: api.getPapersTemplate.path,
            params: {
              id: this.templateId
            }
          }
        }
        this.ajax(opt)
      }
    },
    created () {
      this.init()
    },
    mounted () {
    },
    components: {
      questionDiffLevelOption
    }
  }

</script>
<style lang="scss">
    @import "../css/intelligent";
</style>
