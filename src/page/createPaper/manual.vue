<!--
****--@file     manual
****--@date     2018/3/31 16:51
****--@author   YC
****--@describe 人工组卷
-->
<template>
    <div class="createPaperManual">
        <el-row class="thematicLibraryInputBox">
            <h1 class="thematicLibraryInputTitle">人工组卷</h1>
            <el-col class="mainBox">
                <!-- 选择试题 -->
                <el-form>
                    <el-row>
                        <el-col class="questionTypeItem">
                            <el-form-item label="教材">{{ userTextbookVersionInfo.textbookVersionName }}
                            </el-form-item>
                        </el-col>
                        <el-col class="questionTypeItem">
                            <el-form-item label="科目">{{ userTextbookVersionInfo.subject | subject }}
                            </el-form-item>
                        </el-col>
                        <el-col class="questionTypeItem">
                            <el-form-item label="年级">
                                <!--<el-select v-model="headerSelectObj.grade" placeholder="请选择" @change="changeGrade">-->
                                <!--<el-option v-for="item in 12" :key="item" :label="item | grade(self)"-->
                                <!--:value="item"></el-option>-->
                                <!--</el-select>-->
                                <span class="selectHeadItem" v-for="item in gradeList" :key="item" @click="changeGrade(item)"
                                      :class="{'active':headerSelectObj.grade===item}">{{ item | grade(self) }}</span>
                            </el-form-item>
                        </el-col>
                        <el-col class="questionTypeItem">
                            <el-form-item label="学期">
                                <!--<el-select v-model="headerSelectObj.term" placeholder="请选择" @change="changeTerm">-->
                                <!--<el-option v-for="index in 2" :key="index" :label="(index - 1) | term"-->
                                <!--:value="index-1"></el-option>-->
                                <!--</el-select>-->
                                <span class="selectHeadItem" v-for="index in 2" :key="index"
                                      @click="changeTerm(index-1)"
                                      :class="{'active':headerSelectObj.term===(index-1)}">{{ (index - 1) | term }}</span>
                            </el-form-item>
                        </el-col>
                        <el-col class="questionTypeItem">
                            <el-form-item label="章节">
                                <!--<el-select v-model="headerSelectObj.chapter" placeholder="请选择"-->
                                <!--@change="changeChapter">-->
                                <!--<el-option v-for="item in chapterList" :key="item.id" :value="item.id"-->
                                <!--:label="item.name"></el-option>-->
                                <!--</el-select>-->
                                <template v-if="chapterList.length">
                                    <span class="selectHeadItem"  :class="{'active':headerSelectObj.chapterIds===''}"   @click="changeChapter('')">全部 </span>
                                    <span class="selectHeadItem" v-for="item in chapterList" :key="item.id"
                                          @click="changeChapter(item.id)"
                                          :class="{'active':headerSelectObj.chapterIds===item.id}">{{ item.name }}</span>
                                </template>
                                <span v-else>暂无章节</span>
                            </el-form-item>
                        </el-col>
                        <el-col class="questionTypeItem">
                            <el-col :span="20">
                                <el-form-item label="已选题目">
                                    <span class="questionTypeItemName" v-for="id in questionShowTypeOrder"
                                          v-if="questionShowTypeId[id]" :key="id">{{ questionsTypeList[id].name }}({{questionShowTypeId[id]}})</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item align="right">
                                    <el-button @click="changeView">查看详情</el-button>
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
                                <el-col :span="6">
                                    <el-form-item label="来源">
                                        <el-select v-model="selectFormValidate.openType" clearable
                                                   placeholder="请选择"
                                                   @change="getQuestionsList">
                                            <el-option v-for="(item,index) in originList" :key="index"
                                                       :label="item.name"
                                                       :value="item.id"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="qsMain">
                            <template v-if="totalCount">
                                <el-checkbox-group v-model="selectQuestionIdArr" @change="changeSelectQuestionIdArr">
                                    <template v-for="item in showDataArr">
                                        <question-show class="qsmItem" :key="item.id" :showData="item"
                                                       v-if="item.basicType" :index="item.index" :show-answer="true"
                                                       :hasDo="140">
                                            <template slot="todoBox">
                                                <div class="qsTodoBox" align="right">
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
            </el-col>
        </el-row>
    </div>
</template>
<script>
  /*当前组件必要引入*/
  import api from './api'
  import questionDiffLevelOption from '../../components/common/questionDiffLevelOption'
  import questionShow from '../../components/questionShow/show'
  //当前组件引入全局的util
  let Util = null
  export default {
    name: 'createPaperManual',
    props: ['groupId', 'type'],

    data () {
      return {
        self: this,
        gradeList:null,
        viewType: 'selectQuestion',
        questionsTypeList: {}, // 题型列表
        chapterList: [], // 章节列表
        allChapterList: {}, // 章节列表缓存
        knowledgeList: {}, // 知识点
        userTextbookVersionInfo: {subject: '', textbookVersionName: ''}, // 当前老师的教材信息
        originList:[{name:'全部',id:''},{name:'题库',id:'0'},{name:'我的试题',id:'1'}],
        selectQuestionIdArr: [], // 选择的试题id(初始化时需要赋值处理)
        selectQuestionIds: [], // 存储选择试题的id(初始化时需要赋值处理)
        selectQuestionDataObj: {}, // 选择的试题数据(初始化时需要赋值处理)
        questionShowTypeOrder: [], // 试题类型预览时顺序
        questionShowTypeId: {}, // 试题类型id

        headerSelectObj: { // 当前试题的配置信息
          textbookVersionId: '', // 教材
          grade: '', // 年级
          term: '', // 学期
          subject: '', // 科目
          chapterIds: '' // 章节
        },

        questionsType: {},
        totalCount: 0,
        showData: {}, // 记录条件筛选的试题集提供后续选择使用
        showDataArr: [], // 显示使用，避免出现显示顺序不一致

        selectFormValidate: {
          questionsTypeId: '', // 题型
          diffLevelCode: '', // 难度
          knowledgeId: '', // 知识点
          openType:''
        },
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
        this.getQuestionsTypeList();
        let teacherGrade=null;
        let types = this.$store.getters['user/info']('types')
        if(this.$store.state.user.info.textbookVersionList[0].length==0){
          teacherGrade = [[1, 2, 3, 4, 5, 6], [7, 8, 9], [10, 11, 12]]
        }else {
          teacherGrade = [[1, 2, 3, 4, 5], [6,7, 8, 9], [10, 11, 12]]
        }
        this.gradeList=teacherGrade[types||0]
      },
      // 第一步分页获取数据
      setTableData () {
        this.getQuestionsList()
      },
      // 视图切换
      changeView () {
        if (!this.selectQuestionIds.length) {
          this.errorMess('请选择试题')
          return
        }
        let data = this.getPreviewData()
        let questionsList = []
        let selectQuestionDataObj = Util._.defaultsDeep({}, this.selectQuestionDataObj)
        let score = 0
        let totalQuestions = 0

        this.selectQuestionIds.map(id => {
          questionsList.push(selectQuestionDataObj[id])
          if (selectQuestionDataObj[id].groups) {
            selectQuestionDataObj[id].childQuestionsList.map(item => {
              totalQuestions += 1
              score += item.score
            })
          } else {
            totalQuestions += 1
            score += selectQuestionDataObj[id].score
          }
        })

        data.score = score
        data.totalQuestions = totalQuestions

        this.$store.commit('papers/initZnPreview', data)
        this.$store.commit('papers/init')
        this.$store.commit('papers/updateInfo', data)
        this.$store.commit('papers/initQuestionsList', questionsList)
        this.$store.commit('papers/getShowQuestionTypeOrder')
        this.$router.push({name: 'preview', params: {type: this.type}})
      },
      getPreviewData () {
        let data = Util._.defaultsDeep({}, this.headerSelectObj)
        // let questionsTypeScore = []
        // let condition = []

        // 时间转换
        data.times = (data.times || 0) * 60 // 分钟转换为秒
        data.startTime = ''
        data.releaseTime = ''
        data.submitTime = ''
        data.publishAnswerTime = ''
        data.cheatSetQuestionsSeqRandom = '0'
        data.cheatSetOptionsSeqRandom = '0'
        data.groupsId = this.groupId
        data.title = ''
        data.remark = ''
        // 阶段
        data.stage = data.grade > 6 ? (data.grade > 9 ? 2 : 1) : '0'

        // 难度、知识点
        let {diffLevelCode} = this.selectFormValidate
        data.diffLevelCode = diffLevelCode

        return data
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
      /**************************** 顶部选项切换 ***************************/
      // 改变年级
      changeGrade (grade) {
        this.headerSelectObj.grade = grade
        this.headerSelectObj.chapterIds=''
        this.getChapterListData()
      },
      // 改变学期
      changeTerm (term) {
        this.headerSelectObj.term = term
        this.headerSelectObj.chapterIds=''
        this.getChapterListData()
      },
      // 改变章节
      changeChapter (chapter) {
        this.headerSelectObj.chapterIds = chapter;
        this.getknowledgeList()
        this.getQuestionsList()
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
          this.getQuestionShowTypeId(delId)
        } else {
          this.selectQuestionDataObj[addId] = Util._.defaultsDeep({}, this.showData[addId])
          this.getQuestionShowTypeId(addId, true)
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
            this.getknowledgeList();
            this.getQuestionsList();
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
            url: api.questionsType
          }
        }
        this.ajax(opt)
      },
      // 获取知识点
      getknowledgeList () {
        let params = Util._.defaultsDeep({}, this.headerSelectObj);
        if(params.chapterIds==''){
          let temp=[];
          this.chapterList.map((item)=>{
            temp.push(item.id)
          })
          params.chapterIds=temp.join(',')
        }
        params.chapterIds=params.chapterIds.toString();
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
              term: this.headerSelectObj.term || '0',
              chapterIds: params.chapterIds,
            }
          }
        }
        this.ajax(opt)
      },
      // 获取问题列表
      getQuestionsList () {
        if (!this.headerSelectObj.grade || this.headerSelectObj.term === '') {return} // 必须选择班级和学期才能获取试题数据
        let params = Util._.defaultsDeep({}, this.queryQptions, this.headerSelectObj, this.selectFormValidate)
        params.textbookVersionId = ''
        // console.log(params,this.chapterList)
        if(params.chapterIds==''){
          let temp=[];
          this.chapterList.map((item)=>{
            temp.push(item.id)
          })
          params.chapterIds=temp.join(',')
        }
        params.chapterIds=params.chapterIds.toString();
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
      // 根据选择试题获取对应题型所选择的试题数量
      getQuestionShowTypeId (questionId, isAdd) {
        let data = Util._.defaultsDeep({}, this.questionShowTypeId)
        if (!data[this.showData[questionId].questionsTypeId]) {
          data[this.showData[questionId].questionsTypeId] = 0
        }
        if (isAdd) {
          data[this.showData[questionId].questionsTypeId] += 1
        } else {
          data[this.showData[questionId].questionsTypeId] -= 1
        }
        this.questionShowTypeId = data
        this.getShowQuestionTypeOrder(Object.keys(data))
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
      questionDiffLevelOption,
      questionShow,

    }
  }

</script>
<style lang="scss">
    @import "../css/intelligent";
    @import "../css/thematicLibraryView";
    @import "../css/questionBankListItem";
    @import "../css/createPaper_manual";
</style>
