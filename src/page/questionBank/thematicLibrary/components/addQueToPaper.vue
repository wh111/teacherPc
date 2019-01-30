<!--
****--@file     addQueToPaper
****--@date     2017/12/7 16:58
****--@author   YC
****--@describe 添加试题到试卷
-->
<template>
    <div class="thematicLibraryInputBox selectPapersBox">
        <el-row>
            <el-col class="selectPapersItem mainBox">
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
                                    <el-select v-model="headerSelectObj.grade" placeholder="请选择" @change="changeGrade"
                                               :disabled="grade !== undefined">
                                        <el-option v-for="item in 12" :key="item" :label="item | grade(self)"
                                                   :value="item"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="学期">
                                    <el-select v-model="headerSelectObj.term" placeholder="请选择" @change="changeTerm"
                                               :disabled="term !== undefined">
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
                                                   placeholder="请选择" :disabled="!!questionsTypeId"
                                                   @change="getQuestionsList">
                                            <el-option label="全部" value=""></el-option>
                                            <el-option v-for="(item,index) in questionsTypeList" :key="index"
                                                       :label="item.name" :value="item.id"></el-option>
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
                                                       :label="item.name" :value="item.id"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5" :offset="1">
                                    <el-form-item label="">已选题目：
                                        <b>
                                            {{ selectType === 'radio' ? (selectQuestionId ? 1 : 0) :
                                            selectQuestionIds.length }}
                                        </b>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="qsMain">
                            <template v-if="totalCount">
                                <el-checkbox-group v-if="selectType === 'checkbox'" v-model="selectQuestionIdArr"
                                                   @change="changeSelectQuestionIdArr">
                                    <template v-for="item in showDataArr">
                                        <question-show class="qsmItem" :key="item.id" :showData="item"
                                                       v-if="item.basicType" :index="item.index" :show-answer="true"
                                                       :hasDo="140">
                                            <template slot="todoBox">
                                                <div class="qsTodoBox" align="right">
                                                    <div class="qstdInfo">
                                                        <p class="qstdiItem">难度：{{ item.diffLevelCode |
                                                            diffLevelCode(self) }}</p>
                                                        <p class="qstdiItem">分值：{{ item.score }}分</p>
                                                    </div>
                                                    <el-checkbox :value="item.id" :label="item.id"
                                                                 :disabled="selectedIds.includes(item.id)">{{ }}
                                                    </el-checkbox>
                                                </div>
                                            </template>
                                        </question-show>
                                    </template>
                                </el-checkbox-group>
                                <el-radio-group v-else v-model="selectQuestionId"
                                                @change="changeSelectQuestionIdArr">
                                    <template v-for="item in showDataArr">
                                        <question-show class="qsmItem" :key="item.id" :showData="item"
                                                       v-if="item.basicType" :index="item.index" :show-answer="true"
                                                       :hasDo="140">
                                            <template slot="todoBox">
                                                <div class="qsTodoBox" align="right">
                                                    <div class="qstdInfo">
                                                        <p class="qstdiItem">难度：{{ item.diffLevelCode |
                                                            diffLevelCode(self) }}</p>
                                                        <p class="qstdiItem">分值：{{ item.score }}分</p>
                                                    </div>
                                                    <el-radio :value="item.id" :label="item.id"
                                                              :disabled="selectedIds.includes(item.id)">{{ }}
                                                    </el-radio>
                                                </div>
                                            </template>
                                        </question-show>
                                    </template>
                                </el-radio-group>
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
                <el-col align="center" :class="{'btnPading':!totalCount}">
                    <el-button  class="greenButton" @click="add" type="success">{{ btnStr }}</el-button>
                    <el-button class="whiteButton" @click="cancel">取消</el-button>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>
<style lang="scss">
    .selectPapersBox {
        padding: 0;
        .qsMain {
            max-height: 300px;
            overflow: auto;
        }
        .btnPading {
            padding-top: 20px
        }
        .el-radio-group {
            width: 100%
        }
    }
</style>
<script>
  /*当前组件必要引入*/
  import api from '../api'
  // import {projectDiffLevels} from '../../../../libs/projectDiffLevel'
  import questionDiffLevelOption from '../../../../components/common/questionDiffLevelOption' // 难度组件
  import subjectHead from '@/components/common/subjectHead.vue'

  import questionShow from '../../../../components/questionShow/show'

  //当前组件引入全局的util
  let Util = null
  export default {
    props: ['btnText', 'questionsTypeId', 'grade', 'term', 'type', 'selectedId'],
    data () {
      return {
        self: this,
        questionsTypeList: {}, // 题型列表
        chapterList: [], // 章节列表
        allChapterList: {}, // 章节列表缓存
        knowledgeList: {}, // 知识点
        userTextbookVersionInfo: {subject: '', textbookVersionName: ''}, // 当前老师的教材信息

        selectQuestionId: '', // 选择的试题id
        selectQuestionIdArr: [], // 选择的试题id
        selectQuestionIds: [], // 存储选择试题的id
        selectQuestionDataObj: {}, // 选择的试题数据

        headerSelectObj: { // 当前试题的配置信息
          textbookVersionId: '', // 教材
          grade: this.grade !== undefined ? this.grade : '', // 年级
          term: this.term !== undefined ? this.term : '', // 学期
          subject: '', // 科目
          chapter: '' // 章节
        },

        // 第二步表单
        selectFormValidate: {
          questionsTypeId: this.questionsTypeId || '', // 题型
          diffLevelCode: '', // 难度
          knowledgeId: '' // 知识点
        },

        selectedIds: this.selectedId || [],

        selectType: this.type || 'radio',
        btnStr: this.btnText || '确定',

        questionsType: {},
        totalCount: 0,
        showData: {}, // 记录条件筛选的试题集提供后续选择使用
        showDataArr: [], // 显示使用，避免出现显示顺序不一致
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        Util = this.$util
        console.log('selectedIds', this.selectedIds)
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
        if (this.grade !== undefined && this.term !== undefined) {
          this.getChapterListData()
          this.getQuestionsList()
        }
        this.getQuestionsTypeList()
      },
      setTableData () {
        this.getQuestionsList()
      },
      /**************************** 顶部选项切换 ***************************/
      // 改变年级
      changeGrade () {
        this.getChapterListData()
      },
      // 改变学期
      changeTerm () {
        this.getChapterListData()
      },
      // 改变章节
      changeChapter () {
        this.getknowledgeList()
        this.getQuestionsList()
      },
      // 选择试题
      changeSelectQuestionIdArr (arr) {
        if (this.selectType === 'radio') {
          let data = {}
          data[arr] = Util._.defaultsDeep({}, this.showData[arr])
          this.selectQuestionIds[0] = arr
          this.selectQuestionDataObj = data
          console.log('选择：' + arr)
        } else {
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
        }
      },
      /**************************** 数据获取 ***************************/
      // 获取章节
      getChapterListData () {
        console.log(1)
        let {grade, term, subject, textbookVersionId} = this.headerSelectObj
        console.log(1)
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
        let opt = {
          ajaxSuccess: res => {
            let list = {}
            if (res.data instanceof Array) {
              res.data.map(item => list[item.id] = item)
            }
            this.knowledgeList = list
          },
          ajaxParams: {
            url: api.queryKnowledgeList.path,
            method: api.queryKnowledgeList.method,
            params: {
              grade: this.headerSelectObj.grade,
              subject: this.headerSelectObj.subject,
              term: this.headerSelectObj.term || '0'
            }
          }
        }
        this.ajax(opt)
      },
      // 获取问题列表
      getQuestionsList () {
        let params = Util._.defaultsDeep({}, this.queryQptions, this.headerSelectObj, this.selectFormValidate)
        console.log( params.textbookVersionId)
        console.log(1)
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
      /**************************** 操作回调 ***************************/
      add () {
        if (!this.selectQuestionIds.length) {
          this.errorMess('请先选择试题')
          return
        }
        this.$emit('add', Util._.defaultsDeep({}, this.selectQuestionDataObj))
      },
      cancel () {
        this.$emit('cancel', 'add')
      }
    },
    created () {
      this.init()
    },
    mounted () {
    },
    components: {
      subjectHead,
      questionDiffLevelOption,
      questionShow
    }
  }

</script>
