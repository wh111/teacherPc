<!--
****--@file     input
****--@date     2018/3/21 9:59
****--@author   YC
****--@describe 创建题库
-->
<template>
    <el-row class="thematicLibraryInputBox">
        <h1 class="thematicLibraryInputTitle">创建题库</h1>
        <el-col class="mainBox">
            <!-- 选择试题 -->
            <template v-if="step==='selectQuestion'">
                <el-form>
                    <el-row>
                        <el-col class="questionTypeItem">
                            <el-col :span="8">
                                <el-form-item label="教材">{{ userTextbookVersionInfo.textbookVersionName }}
                                </el-form-item>
                            </el-col>
                            <el-col :span="16">
                                <el-form-item label="科目">{{ userTextbookVersionInfo.subject | subject }}
                                </el-form-item>
                            </el-col>
                        </el-col>
                        <el-col class="questionTypeItem">
                            <el-col :span="8">
                                <el-form-item label="年级">
                                    <el-select v-model="headerSelectObj.grade" placeholder="请选择" @change="changeGrade">
                                        <el-option v-for="item in 12" :key="item" :label="item | grade(self)"
                                                   :value="item"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="学期">
                                    <el-select v-model="headerSelectObj.term" placeholder="请选择" @change="changeTerm">
                                        <el-option v-for="index in 2" :key="index" :label="(index - 1) | term"
                                                   :value="index-1"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="章节">
                                    <el-select v-model="headerSelectObj.chapter" placeholder="请选择"
                                               @change="changeChapter">
                                        <el-option v-for="item in chapterList" :key="item.id" :value="item.id"
                                                   :label="item.name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-col>
                    </el-row>
                    <div class="questionSelectMain">
                        <div class="qstop">
                            <h2 align="center">题库</h2>
                            <el-row class="qstSelectBox">
                                <el-col :span="6">
                                    <el-form-item label="题型">
                                        <el-select v-model="selectFormValidate.questionsTypeId" clearable
                                                   placeholder="请选择"
                                                   @change="getQuestionsList">
                                            <el-option label="全部" value=""></el-option>
                                            <el-option v-for="(item,index) in questionsTypeList" :key="index"
                                                       :label="item.name"
                                                       :value="item.id"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="难度">
                                        <el-select v-model="selectFormValidate.diffLevelCode" clearable
                                                   placeholder="请选择"
                                                   @change="getQuestionsList">
                                            <el-option label="全部" value=""></el-option>
                                            <question-diff-level-option></question-diff-level-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="知识点">
                                        <el-select v-model="selectFormValidate.knowledgeId" clearable
                                                   placeholder="请选择"
                                                   @change="getQuestionsList">
                                            <el-option v-for="(item,index) in knowledgeList" :key="index"
                                                       :label="item.name"
                                                       :value="item.id"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5" :offset="1">
                                    <el-form-item label="">已选题目：<b>{{ selectQuestionIds.length }}</b></el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="qsMain">
                            <template v-if="totalCount">
                                <el-checkbox-group v-model="selectQuestionIdArr" @change="changeSelectQuestionIdArr">
                                    <template v-for="item in showDataArr">
                                        <question-show class="qsmItem" :key="item.id" :showData="item"
                                                       v-if="item.basicType" :index="item.index" :show-answer="true"
                                                       :hasDo="140" :answerDo="3">
                                            <template slot="todoBox">
                                                <div class="qsTodoBox"  align="right">
                                                    <div class="qstdInfo">
                                                        <!--<p class="qstdiItem">难度：{{ item.diffLevelCode |-->
                                                        <!--diffLevelCode(self) }}</p>-->
                                                        <p class="qstdiItem">难度：{{ item.diffLevel }}</p>
                                                        <p class="qstdiItem">分值：{{ item.score }}分</p>
                                                    </div>
                                                    <el-checkbox :value="item.id" :label="item.id">{{ }}</el-checkbox>
                                                </div>
                                            </template>
                                        </question-show>
                                    </template>
                                </el-checkbox-group>
                            </template>
                            <p v-else class="tableNoDataTips">暂无数据</p>
                        </div>
                        <el-col v-if="totalCount" class="pagination" align="center">
                            <el-pagination @size-change="changePageSize" @current-change="changePage"
                                           :current-page.sync="myPages.currentPage" :page-size="myPages.pageSize"
                                           layout="total,prev, pager, next, jumper" :total="totalCount">
                            </el-pagination>
                        </el-col>
                    </div>
                </el-form>
            </template>
            <!-- 编辑试题 -->
            <template v-if="step==='info'">
                <el-col>
                    <el-form label-width="80px" :model="formValidate" :rules="rules" ref="formValidate">
                        <el-col class="questionTypeItem">
                            <el-form-item label="题库名称" prop="name">
                                <el-input v-model="formValidate.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col class="questionTypeItem">
                            <el-form-item label="题库说明" prop="remark">
                                <el-input v-model="formValidate.remark" type="textarea"
                                          :autosize="{ minRows: 4, maxRows: 6}"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form>
                    <el-button icon="plus" class="addQuestion greenButton" @click="addQueToPaper" type="success">添加试题</el-button>
                    <div class="questionSelectedBox">
                        <template v-if="questionShowTypeOrder.length">
                            <div class="questionSelectedItem" v-for="questionsTypeId in questionShowTypeOrder"
                                 :key="questionsTypeId">
                                <!-- 题型 -->
                                <h2 class="qsiTitle">{{ questionsTypeList[questionsTypeId].name }}</h2>
                                <!-- 试题 -->
                                <div class="qsiContent">
                                    <template v-for="(item,index) in getQuestionReview(questionsTypeId)">
                                        <question-show class="qsmItem" :showData="item" v-if="item.basicType"
                                                       :index="((questionReviewCurrent[questionsTypeId] - 1) * questionViewPageSize) + index + 1"
                                                       :key="item.id" :show-answer="true" :showScore="true"
                                                       :hasDo="140">
                                            <!-- 试题操作 -->
                                            <template slot="todoBox">
                                                <div class="qsTodoBox" align="right">
                                                    <el-button type="text" class="el-icon-arrow-up"
                                                               @click="moveIndex(questionsTypeId,index,'up')"
                                                               :disabled="index===0"></el-button>
                                                    <el-button type="text" class="el-icon-arrow-down"
                                                               @click="moveIndex(questionsTypeId,index,'down')"
                                                               :disabled="index===questionReview[questionsTypeId].length-1"></el-button>
                                                    <el-button type="text"
                                                               @click="changeQueToPaper(questionsTypeId,index)">替换
                                                    </el-button>
                                                    <el-button type="text" class="el-icon-delete"
                                                               @click="deleteQuestion(questionsTypeId,index)"></el-button>
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
                        </template>
                        <p v-else class="tableNoDataTips">请添加试题</p>
                    </div>
                </el-col>
            </template>
            <el-col align="center" :class="{'btnPadding': !totalCount}">
                <el-button class="greenButton" @click="next" type="success" v-if="step==='selectQuestion'">下一步</el-button>
                <el-button @click="save"  class="greenButton" type="success" v-if="step==='info'" :disabled="!questionShowTypeOrder.length">
                    保存
                </el-button>
            </el-col>
        </el-col>
        <!-- 模态框 增加（add） -->
        <Modal :mask-closable="false" v-model="addModal" :width="1000">
            <modal-header slot="header" :content="contentHeader.addId"></modal-header>
            <add-que-to-paper v-if="addModal" @cancel="cancel" @add="todoQueToPaper"
                              :questionsTypeId="todoQuestionsTypeId" :selectedId="questionReviewIds"
                              :btnText="btnText" :grade="headerSelectObj.grade" :term="headerSelectObj.term"
                              :type="queTodoType === 'add' ? 'checkbox' : 'radio'"></add-que-to-paper>
            <div slot="footer"></div>
        </Modal>
    </el-row>
</template>
<script>
  /*当前组件必要引入*/
  import api from './api'
  import questionDiffLevelOption from '../../../components/common/questionDiffLevelOption'
  import questionShow from '../../../components/questionShow/show'
  import addQueToPaper from './components/addQueToPaper'

  import { thematicLibraryAdd as rules } from '../rules'

  //当前组件引入全局的util
  let Util = null
  export default {
    name: 'thematicLibraryInput',
    data () {
      return {
        rules,
        self: this,
        step: 'selectQuestion', // selectQuestion
        // 状态
        editType: this.$route.params.type || 'add', // add添加|edit修改
        id: this.$route.params.id || -1,
        questionsTypeList: {}, // 题型列表
        chapterList: [], // 章节列表
        allChapterList: {}, // 章节列表缓存
        knowledgeList: {}, // 知识点
        userTextbookVersionInfo: {subject: '', textbookVersionName: ''}, // 当前老师的教材信息

        questionViewPageSize: 2, // 预览题型每页显示条数

        selectQuestionIdArr: [], // 选择的试题id(初始化时需要赋值处理)
        selectQuestionIds: [], // 存储选择试题的id(初始化时需要赋值处理)
        selectQuestionDataObj: {}, // 选择的试题数据(初始化时需要赋值处理)
        questionShowTypeOrder: [], // 试题类型预览时顺序
        questionReview: {}, // 试题分类预览数据
        questionReviewIds: [], // 当前预览试题的id(初始化时需要赋值处理)[记录id防止重复选择]
        questionReviewCurrent: {}, // 试题分类预览分页数据

        questionReviewPageType: '', // 试题分类预览分页数据所在题型

        contentHeader: {
          addId: {id: 'addId', title: '选择试题'}
        },
        btnText: '添加',

        queTodoType: 'add', // 添加试题add|替换试题change
        editType: 'add',

        todoType: {}, // 操作类型
        todoQuestionsTypeId: '', // 操作试题类型id

        headerSelectObj: { // 当前试题的配置信息
          textbookVersionId: '', // 教材
          grade: '', // 年级
          term: '', // 学期
          subject: '', // 科目
          chapter: '', // 章节
          knowledgeIds:''
        },

        questionsType: {},
        totalCount: 0,
        showData: {}, // 记录条件筛选的试题集提供后续选择使用
        showDataArr: [], // 显示使用，避免出现显示顺序不一致

        selectFormValidate: {
          questionsTypeId: '', // 题型
          diffLevelCode: '', // 难度
          knowledgeId: '' // 知识点
        },

        // 提交数据
        formValidate: {
          'subject': '', //科目：语文/数学/英语
          'grade': '', //年级：1-12
          'term': '', //学期：0上学期/1下学期
          'name': '', //试卷名称
          'remark': '', //试卷说明
          'score': '', //试卷满分/试卷总分
          'questionNums': '', //试卷试题数量
          'papersTypes': '3',//0试卷/1联考/2测验'3 专题库
          'papersQuestions': [
            // { //试题对象集合
            //   'questionsId': '', //试题ID
            //   'seq': '', //试题序列
            //   'score': '', //试题分数
            //   'childQuestionsList': []
            // }
          ]
        }
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        Util = this.$util
        this.myPages = this.queryQptions = {
          curPage: 1,
          pageSize: Util.pageInitPrams.pageSize,
        }
        let textbookVersionList = this.$store.getters['user/info']('textbookVersionList')
        if (textbookVersionList && textbookVersionList.length) {
          let {textbookVersionId, subject} = textbookVersionList[0]
          this.userTextbookVersionInfo = textbookVersionList[0]
          this.headerSelectObj.textbookVersionId = textbookVersionId
          this.headerSelectObj.subject = subject
        }
        this.getQuestionsTypeList()
      },
      // 第一步分页获取数据
      setTableData () {
        this.getQuestionsList()
      },
      /**************************** 顶部选项切换 ***************************/
      // 改变年级
      changeGrade () {
        this.getChapterListData();
        this.headerSelectObj.chapter=''
      },
      // 改变学期
      changeTerm () {
        this.getChapterListData()
        this.headerSelectObj.chapter=''
      },
      // 改变章节
      changeChapter () {
        this.selectFormValidate.knowledgeId=''
        this.getknowledgeList()

      },
      // 选择试题
      changeSelectQuestionIdArr (arr) {
        let differenceArr = Util._.difference(Util._.defaultsDeep([], this.selectQuestionIds), arr)
        let delId = Util._.last(differenceArr) // 删除的选项ID
        let addId = Util._.last(arr)
        this.selectQuestionIds = arr
        if (delId) {
          let data = Util._.defaultsDeep({}, this.selectQuestionDataObj)
          delete data[delId]
          this.selectQuestionDataObj = data
        } else {
          this.selectQuestionDataObj[addId] = Util._.defaultsDeep({}, this.showData[addId])
        }
        console.log('删除：' + delId, '添加：' + addId)
      },
      /**************************** 数据获取 ***************************/
      // 获取章节
      getChapterListData () {
        let {grade, term, subject, textbookVersionId} = this.headerSelectObj
        // 条件缺一不可
        if (!grade || term === '' || !subject || !textbookVersionId) {
          return
        }
        if (this.allChapterList[grade + '_' + term]) { // 读取缓存
          this.chapterList = this.allChapterList[grade + '_' + term]
          return
        }
        term = term || '0'
        let opt = {
          ajaxSuccess: res => {
            this.allChapterList[grade + '_' + term] = res.data // 缓存数据
            this.chapterList = res.data
            this.getQuestionsList()
          },
          ajaxParams: {
            url: api.queryChapterList.path,
            params: {
              grade, term, textbookVersionId, subject
            }
          }
        }
        this.ajax(opt)
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
          },
          ajaxParams: {
            url: api.questionsType.path
          }
        }
        this.ajax(opt)
      },
      // 获取知识点
      getknowledgeList () {
        this.headerSelectObj.knowledgeIds='';
        let opt = {
          ajaxSuccess: res => {
            let list = {}
            if (res.data instanceof Array) {
              res.data.map((item) =>{ list[item.id] = item;this.headerSelectObj.knowledgeIds+=item.id+',';});
            }
            this.knowledgeList = list;
            this.getQuestionsList()
          },
          ajaxParams: {
            url: api.queryKnowledgeList.path,
            method: api.queryKnowledgeList.method,
            params: {
              grade: this.headerSelectObj.grade,
              subject: this.headerSelectObj.subject,
              term: this.headerSelectObj.term || '0',
              chapterId:this.headerSelectObj.chapter
            }
          }
        }
        this.ajax(opt)
      },
      // 获取问题列表
      getQuestionsList () {
//        this.headerSelectObj.knowledgeIds='';
        if (!this.headerSelectObj.grade || this.headerSelectObj.term === ''||!this.headerSelectObj.chapter) {return} // 必须选择班级和学期才能获取试题数据
        let params = Util._.defaultsDeep({}, this.queryQptions, this.headerSelectObj, this.selectFormValidate);
        params.chapterId=this.headerSelectObj.chapter;
       // params.textbookVersionId = ''
        let opt = {
          ajaxSuccess: res => {
            let quetionObj = {}
            let startNum = this.myPages.pageSize * (this.myPages.curPage - 1) + 1
            this.totalCount = res.data.totalCount
            res.data.dataList.map((item, index) => {
              item.index = startNum + index // 根据分页记录索引
              if (item.groups) { // 组合题的分数是所有子题的分数和
                let sumSore = 0;
                (item.childQuestionsList || []).map(cItem => sumSore += cItem.score)
                item.score = Number(sumSore.toFixed(1)) // 保留一位小数
              }
              quetionObj[item.id] = item
            })
            this.showData = quetionObj
            this.showDataArr = res.data.dataList
          },
          ajaxParams: {
            url: api.questionsList.path,
            params
          }
        }
        this.ajax(opt)
      },
      /**************************** 步骤相关 ***************************/
      // 下一步
      next () {
        if (this.selectQuestionIds.length) {
          this.questionClassification()
          this.step = 'info'
        } else {
          this.errorMess('请选择试题才能进行下一步')
        }
      },
      // 保存数据
      save () {
        // 验证未通过不允许提交
        if (!this.submitForm('formValidate')) {return}
        let data = this.getSaveData()
        let opt = {
          ajaxSuccess: res => {
            this.successMess('添加成功')
            this.$router.push({name: 'questionBank', params: {view: 'thematicLibrary'}})
          },
          ajaxParams: {
            jsonString: true,
            url: api.add.path,
            method: api.add.method,
            data
          }
        }
        this.ajax(opt)
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
      /**************************** 试题操作 ***************************/
      // 上下移动
      moveIndex (questionsTypeId, index, type) {
        let questionsList = this.questionReview[questionsTypeId]
        let moveData = questionsList[index] // 记录删除之前的值
        questionsList.splice(index, 1) // 先删
        if (type === 'down') {
          questionsList.splice(index + 1, 0, moveData) // 再加
        } else {
          questionsList.splice(index - 1, 0, moveData) // 再加
        }
      },
      // 删除试题
      deleteQuestion (questionsTypeId, index) {
        let questionsList = this.questionReview[questionsTypeId]
        let questionsListData = null
        questionsList.splice(index, 1)
        if (!questionsList.length) { // 如果该题型下面所有的试题都被删除
          questionsListData = Util._.defaultsDeep({}, this.questionReview)
          delete questionsListData[questionsTypeId] // 从试题数据中删除该题型
          this.questionShowTypeOrder.splice(this.questionShowTypeOrder.indexOf(questionsTypeId), 1) // 从题型排序数据删除该题型
          this.questionReview = questionsListData
        }
      },
      // 添加试题
      addQueToPaper () {
        this.queTodoType = 'add'
        this.btnText = '添加'
        this.todoQuestionsTypeId = ''
        this.openModel('add')
      },
      // 替换试题
      changeQueToPaper (questionsTypeId, index) {
        this.queTodoType = 'change'
        this.btnText = '替换'
        this.todoQuestionsTypeId = Number(questionsTypeId)
        this.todoType = {questionsTypeId, index}
        this.openModel('add')
      },
      // 试题操作（添加/替换）
      todoQueToPaper (obj) {
        console.log(obj,this.questionShowTypeOrder)
        let questionIds = Object.keys(obj)
        let {questionsTypeId, index} = this.todoType
        let questionsList = this.questionReview[questionsTypeId]
        console.log(questionsList )
        if (this.queTodoType == 'change') { // 替换
          this.setQuestionReviewIds({add: Number(questionIds[0]), del: Number(questionsList[index].id)})
          questionsList.splice(index, 1) // 先删
          questionsList.splice(index + 1, 0, obj[questionIds[0]]) // 再加
        } else { // 添加
          let questionTypeIds = Util._.defaultsDeep([], this.questionShowTypeOrder) // 题型id
          let questionReview = Util._.defaultsDeep({}, this.questionReview)
          questionIds.map(qid => {
            let questionsTypeId = obj[qid].questionsTypeId
            if (!~questionTypeIds.indexOf(questionsTypeId)) {
              questionTypeIds.push(questionsTypeId)
              questionReview[questionsTypeId] = []
            }
            questionReview[questionsTypeId].push(obj[qid])
            // 记录加入的试题id
            this.setQuestionReviewIds({add: Number(qid)})
          })
          this.getShowQuestionTypeOrder(questionTypeIds)
          this.questionReview = questionReview
        }
        this.cancel('add')
      },
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
      // 试题id处理(添加|删除)
      setQuestionReviewIds (obj) {
        let {add, del} = obj
        let delIndex = null
        if (add) {
          this.questionReviewIds.push(add)
        }
        if (del) {
          delIndex = this.questionReviewIds.indexOf(del)
          this.questionReviewIds.splice(delIndex, 1)
        }
        console.log('添加:' + add, '删除:' + del)
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
      // 试题分类
      questionClassification () {
        let selectQuestionDataObj = Util._.defaultsDeep({}, this.selectQuestionDataObj)
        let questionReview = {}
        let questionReviewCurrent = {}
        Object.keys(selectQuestionDataObj).map(qid => {
          let item = selectQuestionDataObj[qid]
          if (!questionReview[item.questionsTypeId]) { // 根据试题类型进行分类
            questionReviewCurrent[item.questionsTypeId] = 1 // 所有题型默认显示第一页数据
            questionReview[item.questionsTypeId] = []
          }
          this.setQuestionReviewIds({add: Number(qid)})
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
      // 获取保存数据
      getSaveData () {
        let data = Util._.defaultsDeep({}, this.formValidate)
        let {subject, grade, term} = Util._.defaultsDeep({}, this.headerSelectObj)
        let seq = 1 // 试题序号
        let score = 0 // 试题总分
        let questionNums = 0 // 试题总数量
        let papersQuestions = [] // 试题数据
        // 通过试题类型展示顺序读取试题数据
        this.questionShowTypeOrder.map(qtId => {
          this.questionReview[qtId].map(questionItem => {
            let papersQuestionItem = {
              'questionsId': questionItem.id, //试题ID
              'seq': questionItem.groups ? '' : seq++, //试题序列
              'score': questionItem.score, //试题分数
              'childQuestionsList': []
            }
            if (questionItem.groups) { // 如果是组题
              questionItem.childQuestionsList.map(cItem => {
                papersQuestionItem.childQuestionsList.push({
                  'questionsId': cItem.id, //试题ID
                  'seq': seq++, //试题序列
                  'score': cItem.score, //试题分数
                })
                score += cItem.score
                questionNums++
              })
            } else { // 基础题
              score += questionItem.score
              questionNums++
            }
            papersQuestions.push(papersQuestionItem)
          })
        })
        term = term.toString()
        let temp = {subject, grade, term, score, questionNums, papersQuestions}
        Object.keys(temp).map(key => data[key] = temp[key])
        return data
      },
      /**************************** 弹窗相关 ***************************/
      /*
      * 打开指定的模态窗体
      * @param options string 当前指定的模态:"add"、"edit"
      * */
      openModel (options) {
        this[options + 'Modal'] = true
      },
      // 取消
      cancel (targer) {
        this[targer + 'Modal'] = false
      }
    },
    created () {
      this.init()
    },
    mounted () {
    },
    components: {
      questionDiffLevelOption,
      questionShow,
      addQueToPaper
    }
  }

</script>
<style lang="scss">
    @import "../../css/thematicLibraryView";
</style>
