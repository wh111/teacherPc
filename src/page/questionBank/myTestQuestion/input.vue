<!--
****--@file     input
****--@date     2018/3/20 14:54
****--@author   YC
****--@describe 试题编辑
-->
<template>
    <div class="questionEditBox">
        <h1 class="questionShowTitle">{{ editType === 'add' ? '创建' : '编辑' }}试题</h1>
        <el-row class="cqqe-content">
            <el-form :rules="rules" ref="formValidate" :model="formValidate" :label-width="labelWidth"
                     class="demo-form-inline editForm">
                <p>基本信息</p>
                <el-col>
                    <el-col :span="8">
                        <el-form-item label="年级：" prop="grade">
                            <el-select :disabled="editType === 'edit'" v-model="formValidate.grade" placeholder="请选择" @change="changeGrade">
                                <!--<el-option v-for="num in gradeList" :key="num" :label="num | grade(self)"-->
                                <!--:value="num"></el-option>-->
                                <el-option v-for="item in gradeList" :key="item" :value="item.toString()"
                                           :label="item.toString() | grade(self)">
                                    <!--{{ item.toString() | grade(self) }}-->
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="科目：" prop="subject">
                            <el-select :disabled="editType === 'edit'" v-model="formValidate.subject" placeholder="请选择" @change="changeSubject">
                                <el-option v-for="(item,index) in subjectList" :key="index" :label="item.value"
                                           :value="item.code"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="学期：" prop="term">
                            <el-select :disabled="editType === 'edit'" v-model="formValidate.term" placeholder="请选择" @change="changeTerm">
                                <el-option label="上学期" :value="0"></el-option>
                                <el-option label="下学期" :value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col>
                    <el-col :span="8">
                        <el-form-item label="章节：" prop="chapter">
                            <el-select size="small" v-model="chapter" placeholder="请选择"
                                       @change="getknowledgeList">
                                <el-option v-for="(item,index) in chapterList" :key="index" :label="item.name"
                                           :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="题型：" prop="questionsTypeId">
                            <el-select :disabled="editType === 'edit'" size="small" v-model="formValidate.questionsTypeId" placeholder="请选择"
                                       @change="changeQuestionsType">
                                <el-option v-for="(item,index) in questionsTypeList" :key="index" :label="item.name"
                                           :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!-- 只有非组题时主题干部分才有分数 -->
                    <template v-if="!formValidate.groups">
                        <el-col :span="8">
                            <el-form-item label="分值：" prop="score">
                                <el-input size="small" v-model="formValidate.score">分</el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="难度：" prop="diffLevelCode">
                                <el-select size="small" v-model="formValidate.diffLevelCode" placeholder="请选择">
                                    <question-diff-level-option></question-diff-level-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </template>
                    <!--<el-col :span="8">-->
                    <!--<el-form-item label="权限：" prop="openType">-->
                    <!--<el-select size="small" v-model="formValidate.openType" placeholder="请选择">-->
                    <!--<el-option label="共有" :value="0"></el-option>-->
                    <!--<el-option label="私有" :value="1"></el-option>-->
                    <!--</el-select>-->
                    <!--</el-form-item>-->
                    <!--</el-col>-->
                </el-col>
                <!-- 非组题时题干部分才有知识点 -->
                <el-col v-if="!formValidate.groups">
                    <el-col :span="8">
                        <el-form-item label="添加知识点：">
                            <el-select @change="addKnowledge" v-model="knowledgeIds" filterable clearable
                                       placeholder="请选择">
                                <el-option v-for="(item,index) in knowledgeList" :key="index" :label="item.name"
                                           :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="知识点：" prop="knowledgeList" class="is-required">
                            <span v-if="!formValidate.knowledgeList || !formValidate.knowledgeList.length">请选择添加知识点</span>
                            <template v-else>
                                <el-tag style="margin-right: 5px" v-for="(tag,index) in formValidate.knowledgeList"
                                        :key="index"
                                        closable @close="deleteKnowledge(index)">
                                    {{tag.name}}
                                </el-tag>
                            </template>
                        </el-form-item>
                    </el-col>
                </el-col>
                <!--<el-row>-->
                <!--<el-form-item label="试题难度：">-->
                <!--<el-select v-model="formValidate.diffLevel">-->
                <!--<el-option v-for="item in 10" :key="item" :label="item" :value="item"></el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->
                <!--</el-row>-->
                <!--<el-row>-->
                <el-col>
                    <!-- 非组题模式 -->
                    <template v-if="formValidate.groups == 0">
                        <q-radio :from-data="formValidate" v-if="formValidate.basicType == 'Radio'"
                                 :labelWidth="labelWidth" ref="Radio"></q-radio>
                        <q-checkbox :from-data="formValidate" v-if="formValidate.basicType == 'Checkbox'"
                                    :labelWidth="labelWidth" ref="Checkbox"></q-checkbox>
                        <q-judgment :from-data="formValidate" v-if="formValidate.basicType == 'Judgment'"
                                    :labelWidth="labelWidth" ref="Judgment"></q-judgment>
                        <q-input :from-data="formValidate" v-if="formValidate.basicType == 'Input'"
                                 :labelWidth="labelWidth" ref="Input"></q-input>
                        <q-answer :from-data="formValidate" v-if="formValidate.basicType == 'Answer'"
                                  :labelWidth="labelWidth" ref="Answer"></q-answer>
                    </template>
                    <!-- 组题模式 -->
                    <template v-else>
                        <el-col style="padding-bottom: 20px">
                            <!-- 非公共候选项 -->
                            <q-group v-if="formValidate.publics == 0" :from-data="formValidate" :labelWidth="labelWidth"
                                     ref="qGroup" :knowledgeList="knowledgeList" @cancel="cancelEdit"
                                     @save="saveDataToSever"></q-group>
                            <q-mix v-else :from-data="formValidate" :labelWidth="labelWidth"
                                   ref="qMix" :knowledgeList="knowledgeList" @cancel="cancelEdit"
                                   @save="saveDataToSever"></q-mix>
                        </el-col>
                    </template>
                </el-col>
            </el-form>
            <el-col align="center" class="btnBox">
                <load-btn :btnData="saveBtn" class="greenButton" @saveData="saveData"></load-btn>
            </el-col>
        </el-row>
        <!--查看弹窗-->
        <Modal :mask-closable="false" v-model="showModal" height="200" class-name="vertical-center-modal" :width="350"
               @on-cancel="cancelEdit">
            <modal-header slot="header" :content="headerContent.showId"></modal-header>
            <el-row v-if="showModal" class="mtqTips">
                <el-col class="mtqtText">试题新建完成，请选择你要继续的操作</el-col>
                <el-col align="center">
                    <el-button @click="cancelEdit">返回题库</el-button>
                    <el-button @click="reset">继续新建</el-button>
                </el-col>
            </el-row>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
  /*当前组件必要引入*/
  import api from './api'
  import { questionsManageAdd as rules } from '../rules'
  import { question } from '../../../components/questionEdit/dataTemp' // 数据模版

  import questionDiffLevelOption from '../../../components/common/questionDiffLevelOption' // 难度组件

  import qRadio from '../../../components/questionEdit/radio' // 单选
  import qCheckbox from '../../../components/questionEdit/checkbox' // 多选
  import qJudgment from '../../../components/questionEdit/judgment' // 判断
  import qInput from '../../../components/questionEdit/input' // 填空
  import qAnswer from '../../../components/questionEdit/answer' // 问答

  import qGroup from '../../../components/questionEdit/group' // 自由组题
  import qMix from '../../../components/questionEdit/mix' // 公共候选项组题
  //当前组件引入全局的util
  let Util = null
  export default {
    name: 'myTestQuestionInput',
    props: ['operailityData'],
    data () {
      return {
        rules,
        self: this,
        showModal: false,
        labelWidth: '82px',
        saveBtn: {title: this.$route.params.type === 'edit' ? '完成' : '确定', callParEvent: 'saveData', type: 'success'},

        headerContent: {
          showId: {
            id: 'showId',
            title: '操作结果'
          }
        },

        // 数据
        subjectList: [], // 科目
        knowledgeList: {}, // 知识点
        questionsTypeList: {}, // 题型

        // 选中的数据
        selKnowledgeId: [],
        editRefName: '', // 当前编辑的ref

        // 绑定的数据
        knowledgeIds: '',
        formValidate: {},
        chapter: '',
        loadingCallFun: null,
        gradeList: [],
        // 状态
        editType: this.$route.params.type || 'add', // add添加|edit修改
        id: this.$route.params.id || -1,
        chapterList: [],
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        let types = this.$store.getters['user/info']('types')
        this.formValidate = this.$util._.defaultsDeep({textbookVersionId: this.$store.state.user.info.textbookVersionList[0].textbookVersionId}, question)
        this.formValidate.textbookVersionId = this.$store.state.user.info.textbookVersionList[0].textbookVersionId
        if (this.$store.state.user.info.textbookVersionList[0].length == 0) {
          teacherGrade = [[1, 2, 3, 4, 5, 6], [7, 8, 9], [10, 11, 12]]
        } else {
          teacherGrade = [[1, 2, 3, 4, 5], [6, 7, 8, 9], [10, 11, 12]]
        }
        this.gradeList = teacherGrade[types || 0]
        if (this.id > 0) {
          this.editType = 'edit'
          this.getEditData()
        } else {
          // 默认选择1年级
          this.getSubjectList(this.gradeList[0].toString())
        }
        // 获取题型
        this.getQuestionsTypeList()
        let teacherGrade = null
      },
//      // 获取章节
//      getChapterData ()     {
//        let {textbookVersionId, grade, term, subject} = this.formValidate
//        // 教材、年级、学期、科目缺一不可
//        if (!textbookVersionId || !grade || term === '' || !subject) {
//          return
//        }
//        let opt = {
//          ajaxSuccess: res => {
//            this.chapterList = res.data;
//          },
//          ajaxParams: {
//            url: api.getchapterList.path,
//            method: api.getchapterList.method,
//            params: {
//              id: this.id
//            }
//          }
//        }
//        this.ajax(opt)
//      },
      /**
       * 初始化知识点
       * @param state
       * @returns {Array}
       */
      initKnowledgeList () {
        this.selKnowledgeId = []
        this.formValidate.knowledgeList = []
      },
      /**
       * 初始化选项
       * @param state
       * @returns {Array}
       */
      initQuestionsOptions () {
        this.formValidate.questionsOptions = ''
      },
      /**
       * 初始化公共候选项
       * @param state
       * @returns {Array}
       */
      initQuestionsChild () {
        this.formValidate.childQuestionsList = []
      },
      // 继续新建
      reset () {
        this.init()
        this.showModal = false
      },
      /************************************* 数据获取 *************************************/
      // 获取编辑数据
      getEditData () {
        let opt = {
          ajaxSuccess: res => {
            this.chapter = ''
            let temp=JSON.stringify(res.data);
            let that=this;
            if(temp.indexOf('/static/img/') < 0){
              temp=temp.replace(/src=\\"([^\"]*?)\\"/gi,function (item) {
                item = item.replace('/static/', '')
                item=item.split('\\"')[1];
                return item= 'src=\\"'+  that.getStaticPath(item)+'\\"'
              })
            }
            this.formValidate = JSON.parse(temp);
            this.formValidate.textbookVersionId = this.$store.state.user.info.textbookVersionList[0].textbookVersionId
            // 获取对应年级的科目
            this.getSubjectList(res.data.grade)
            // 获取章节
            this.getChapterListData()
            // 获取对应科目的知识点
            this.getknowledgeList()
          },
          ajaxParams: {
            url: api.get.path,
            method: api.get.method,
            params: {
              id: this.id
            }
          }
        }
        this.ajax(opt)
      },
      /**
       * 获取年级对应的科目
       * @param grade 年级
       */
      getSubjectList (grade) {
        this.subjectList = this.$store.getters['app/gradeMap'](grade)
        this.formValidate.grade = grade
      },
      /**
       * 获取题型列表
       */
      getQuestionsTypeList () {
        let opt = {
          ajaxSuccess: res => {
            let list = {}
            if (res.data instanceof Array) {
              res.data.map(item => list[item.id] = item)
            }
            this.questionsTypeList = list
          },
          ajaxParams: {
            url: '/questionsType/query-all',
            method: 'get'
          }
        }
        this.ajax(opt)
      },
      /**
       * 获取知识点列表
       */
      getknowledgeList () {
        if (!this.chapter) {
          return
        }
        let opt = {
          ajaxSuccess: res => {
            let list = {}
            if (res.data instanceof Array) {
              res.data.map(item => list[item.id] = item)
            }
            this.knowledgeList = list
          },
          ajaxParams: {
            url: '/textbookContent/queryKnowledgeList',
            method: 'get',
            params: {
              grade: this.formValidate.grade,
              subject: this.formValidate.subject,
              term: this.formValidate.term || '0',
              chapter: this.chapter
            }
          }
        }
        this.ajax(opt)
      },
      /************************************* 数据添加 *************************************/
      /**
       * 添加知识点
       */
      addKnowledge (id) {
        if (!id || !!~this.selKnowledgeId.indexOf(id)) {
          return
        }
        if (!(this.formValidate.knowledgeList instanceof Array)) {
          this.formValidate.knowledgeList = []
        }
        this.formValidate.knowledgeList.push(this.knowledgeList[id])
        this.selKnowledgeId.push(id)
      },
      /************************************* 数据更新 *************************************/
      /**
       * 更新试题基本数据
       * @param state
       * @param questionObj
       */
      updateQuestion (questionObj) {
        for (let key in questionObj) {
          this.formValidate[key] = questionObj[key]
        }
      },
      /**
       * 更新指定值并初始化其他属性值（不会初始化对象和数组）
       * @param state
       * @param ignoreArr 忽略更新
       */
      updateQuestionBase (ignoreArr = []) {
        // 忽略更新的键
        let ignore = ['id', 'no', 'knowledgeList', 'questionsOptions', 'childQuestionsList', 'term', 'openType']
        ignore = ignore.concat(ignoreArr)
        for (let key in this.formValidate) { // 清除原来的值
          if (!~ignore.indexOf(key)) {
            this.formValidate[key] = ''
          }
        }
      },
      /**
       * 更新题型（不传则清空题目的题型相关数据，传值则更新）
       * @param state
       * @param questionsTypeObj {key:val} || {index:'子小题',updateData:{key:val}}
       */
      updateQuestionsType (questionsTypeObj = {}) {
        // 获取更新的值
        let {id: questionsTypeId = '', childTypes: basicType = '', groups = '', publics = ''} = questionsTypeObj
        let newTypes = {questionsTypeId, basicType, groups, publics}
        for (let key in newTypes) {
          // 更新主题型
          this.formValidate[key] = newTypes[key]
        }
        this.formValidate.isMain = (groups && publics) ? 0 : 1
      },
      /************************************* 数据变更 *************************************/
      /**
       * 改变年级
       * @param grade
       */
      changeGrade (grade) {
        this.getSubjectList(grade)
        this.updateQuestionBase(['grade'])
        this.initKnowledgeList()
        this.updateQuestionsType()
        this.initQuestionsOptions()
        this.initQuestionsChild()
        this.deleteKnowledgeRes()
        this.getChapterListData()
      },
      getChapterListData () {//获取章节
        this.formValidate.textbookVersionId = this.$store.state.user.info.textbookVersionList[0].textbookVersionId
        let {grade, term, subject, textbookVersionId} = this.formValidate
        // 条件缺一不可
        if (!grade || term === '' || !subject || !textbookVersionId) {
          return
        }
        term = term || '0'
        let opt = {
          ajaxSuccess: res => {
            this.chapterList = res.data
//            this.getQuestionsList()
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
      /**
       * 改变科目
       * @param subject
       */
      changeSubject (subject) {
        this.updateQuestionBase(['subject', 'grade'])
        this.initKnowledgeList()
        this.updateQuestionsType()
        this.initQuestionsOptions()
        this.initQuestionsChild()
        this.getknowledgeList()
        this.deleteKnowledgeRes()
        this.getChapterListData()
      },
      /**
       * 改变学期
       * @param term
       */
      changeTerm (term) {
        this.updateQuestionBase(['grade', 'subject', 'term'])
        this.initKnowledgeList()
        this.updateQuestionsType()
        this.initQuestionsOptions()
        this.initQuestionsChild()
        this.getknowledgeList()
        this.deleteKnowledgeRes()
        this.getChapterListData()
      },
      /**
       * 改变题目类型
       */
      changeQuestionsType (typeId) {
        let typeData = this.questionsTypeList[typeId]
        this.updateQuestionsType(typeData)
        this.initQuestionsOptions()
        this.initQuestionsChild()
      },
      /************************************* 数据删除 *************************************/
      /**
       * 删除知识点
       * @param state
       * @param index 需要删除的知识点的索引
       * @returns {*|T[]}
       */
      deleteKnowledge (index) {
        let delId = this.formValidate.knowledgeList[index].id
        let delIndex = this.selKnowledgeId.indexOf(delId)
        this.knowledgeIds = ''
        this.formValidate.knowledgeList.splice(index, 1)
        this.selKnowledgeId.splice(delIndex, 1)
      },
      // 清除知识点集
      deleteKnowledgeRes () {
        this.knowledgeIds = ''
        this.knowledgeList = {}
      },
      /************************************* 数据验证 *************************************/
      /*
       * 点击提交按钮 监听是否验证通过
       * @param formName string  form表单v-model数据对象名称
       * @return flag boolean   form表单验证是否通过
       * */
      submitForm (formName) {
        let flag = false
        this.$refs[formName].validate(valid => {
          if (valid) {
            flag = true
          }
        })
        return flag
      },
      // 检测提交数据是否合法
      checkData () {
        if (!this.formValidate.groups) { // 常规模式
          if (!this.formValidate.knowledgeList.length) {
            this.errorMess('请选择知识点')
            return false
          }
        }
        return true
      },
      /************************************* 数据保存 *************************************/
      /**
       * 保存数据操作
       * @param isLoadingFun
       */
      saveData (isLoadingFun) {
        this.getEditRefName()
        // 如果是组题，保存按钮从组题中触发保存数据操作
        if (this.formValidate.groups) {
          this.loadingCallFun = isLoadingFun
          this.$refs[this.editRefName].saveData()
        } else {
          this.saveDataToSever(isLoadingFun)
        }
      },
      // 保存试题数据到服务器
      saveDataToSever (isLoadingFun) {
        let isSubmit = this.submitForm('formValidate')
        let msg = {add: '添加', edit: '修改'}
        if (isSubmit && this.checkData()) {
          if (!isLoadingFun) {
            isLoadingFun = this.loadingCallFun
          }
          isLoadingFun(true)
          let data = this.$refs[this.editRefName].getEditVal()
          if (!data) {
            setTimeout(() => isLoadingFun(false), 1000)
            return
          }
          data = this.getSaveData(data)
          let opt = { // ajaxSuccess: res => this.$emit(this.editType, this.editType, msg[this.editType] + '成功'),
            ajaxSuccess: res => {
              if (this.editType === 'edit') {
                this.cancelEdit()
              } else {
                this.openModel('show')
              }
            },
            ajaxParams: {
              jsonString: true,
              url: api[this.editType].path,
              method: api[this.editType].method,
              data
            }
          }
          // console.log('父级保存数据', data)
          // setTimeout(() => isLoadingFun(false), 2000)
          this.ajax(opt, isLoadingFun)
        }
      },
      /************************************* 其他操作 *************************************/
      // 取消
      cancel () {
        this.getEditRefName()
        // 如果是组题，取消按钮则是取消小题编辑
        if (this.formValidate.groups) {
          this.$refs[this.editRefName].cancel()
        } else {
          this.cancelEdit()
        }
      },
      // 取消编辑
      cancelEdit () {
        // this.$emit('cancel', this.editType)
        this.$router.push({name: 'questionBank'})
      },
      // 数据转换
      getSaveData (data) {
        let {title = '', answer = '', answerExplain = '', questionsOptions = '', childQuestionsList = []} = data
        let editData = {title, answer, answerExplain, questionsOptions, childQuestionsList}
        let temp = this.$util._.defaultsDeep({}, this.formValidate)
        for (let key in editData) {
          temp[key] = editData[key]
        }
        return temp
      },
      // 获取当前编辑的ref名称
      getEditRefName () {
        let editRefName = this.formValidate.basicType
        if (this.formValidate.groups) {
          editRefName = 'qGroup'
          if (this.formValidate.publics) {
            editRefName = 'qMix'
          }
        }
        this.editRefName = editRefName
      },
      /*
       * 打开指定的模态窗体
       * @param options string 当前指定的模态:"add"、"edit"
       * */
      openModel (options) {
        this[options + 'Modal'] = true
      },
    },
    created () {
      this.init()
    },
    mounted () {
    },
    components: {
      questionDiffLevelOption,
      qRadio, qCheckbox, qJudgment, qInput, qAnswer,
      qGroup, qMix
    }
  }

</script>
<style lang="scss">
    .questionEditBox {
        padding: 20px 20px 0;
        textarea[name="content"] {
            border: none
        }
        .btnBox {
            padding-bottom: 40px
        }
    }

    .questionShowTitle {
        padding: 10px 0;
        margin-bottom: 10px;
        border-bottom: 1px solid #e5e5e5;
    }

    .cqqe-content {
        .label {
            font-size: 14px;
            margin-left: 20px;
        }
        .remove-btn {
            position: absolute;
            bottom: 164px;
            right: 328px;
        }
        .keyword {
            position: absolute;
            bottom: 123px;
            right: 258px;
        }
        .answeritem {
            width: 900px;
            margin: 0 0 20px 30px;
            .el-input {
                display: inline-block;
            }
        }
        .upload-demo {
            margin-top: 10px;
            .el-upload-list {
                margin: -40px 100px;
            }
        }
        p {
            font-size: 15px;
            line-height: 30px;
        }

        .width .el-input, .width .el-textarea {
            width: 800px;
        }
    }

    .mtqTips {
        .mtqtText {
            line-height: 24px;
            min-height: 50px;
        }
    }
</style>
