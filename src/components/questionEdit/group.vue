<!--
****--@file     group
****--@date     2017/12/27 19:08
****--@author   YC
****--@describe 自由组题
-->
<template>
    <el-row>
        <el-form :labelWidth="labelWidthStr">
            <el-col>
                <p>题目内容</p>
                <el-form-item label="标题：">
                    <el-col>
                        <p v-if="!edits.title">
                            <el-input :rows="4" type="textarea" :disabled="lockTitle"
                                      v-model="formValidate.title"></el-input>
                        </p>
                        <div v-else>
                            <view-u-editor style="width: 100%" name="title" @storeUE="storeUE"
                                           @getUeditorVal="getUeditorVal"
                                           :ueditor-val="formValidate"
                                           :ueditor-config="ueditorConfig"></view-u-editor>
                        </div>
                    </el-col>
                    <el-col class="editTodoBtnBox" align="right">
                        <el-button  class="whiteButton" :disabled="lockTitle" @click="localSaveTitle">保存主题干</el-button>
                        <el-button  class="whiteButton" :disabled="editQuestionChild" @click="addChildQuestions">新增小题</el-button>
                        <el-button :disabled="lockTitle" @click="changeEdit('title')" class="whiteButton" >
                            {{ edits.title ? '文本' : '图文' }}编辑
                        </el-button>
                    </el-col>
                </el-form-item>
            </el-col>
            <!-- 新建小题时隐藏表格 -->
            <el-col v-if="!editQuestionChild">
                <el-table align="center" :context="self" border maxHeight="400" :data="formValidate.childQuestionsList"
                          tooltip-effect="dark"
                          style="width: 100%">
                    <el-table-column label="序号" width="70" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.$index + 1 }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="题型" align="center" width="100" prop="basicType">
                        <template slot-scope="scope">
                            {{ scope.row.basicType | questionsBasicType }}
                        </template>
                    </el-table-column>
                    <el-table-column label="题干" prop="title">
                        <template slot-scope="scope">
                            {{ scope.row.title | delHtmlTag | sliceText(20,'...') }}
                        </template>
                    </el-table-column>
                    <el-table-column label="答案" prop="answer" width="160">
                        <template slot-scope="scope">
                            <template v-if="!!~['Radio','Checkbox'].indexOf(scope.row.basicType)">
                                {{ scope.row.answer | answerCode }}
                            </template>
                            <template v-else-if="scope.row.basicType === 'Judgment'">
                                {{ scope.row.answer | answerText }}
                            </template>
                            <template v-else>
                                {{ scope.row.answer | delHtmlTag | sliceText(20,'...') }}
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="160">
                        <template slot-scope="scope">
                            <el-button @click="editQuestionChildData(scope.$index)">修改</el-button>
                            <el-button @click="removeQuestionChildData(scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-form>
        <!-- 新建小题 -->
        <template v-if="editQuestionChild">
            <!-- 基础数据 -->
            <el-form :labelWidth="labelWidthStr" :model="tempQuestion" :rules="rules">
                <el-col>
                    <el-col :span="6">
                        <el-form-item label="小题题型：" prop="basicType">
                            <el-select size="small" v-model="tempQuestion.basicType" placeholder="请选择"
                                       @change="changeQuestionsType">
                                <el-option v-for="(item,index) in questionChildTypes" :key="index"
                                           :label="item | questionsBasicType"
                                           :value="item"></el-option>
                            </el-select>
                            <span v-if="!tempQuestion.basicType">（请选择题型）</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="添加知识点：">
                            <el-select @change="addKnowledge" v-model="knowledgeIds" filterable clearable
                                       placeholder="请选择">
                                <el-option v-for="(item,index) in knowledgeList" :key="index" :label="item.name"
                                           :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="分值：" prop="score">
                            <el-input size="small" v-model="tempQuestion.score">分</el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="难度：" prop="diffLevelCode">
                            <el-select size="small" v-model="tempQuestion.diffLevelCode" placeholder="请选择">
                                <question-diff-level-option></question-diff-level-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-col>
                <!-- 知识点 -->
                <el-col>
                    <el-form-item label="知识点：" prop="knowledgeList">
                        <span v-if="!tempQuestion.knowledgeList || !tempQuestion.knowledgeList.length">请选择添加知识点</span>
                        <template v-else>
                            <el-tag style="margin-right: 5px" v-for="(tag,index) in tempQuestion.knowledgeList"
                                    :key="index"
                                    closable @close="deleteKnowledge(index)">
                                {{tag.name}}
                            </el-tag>
                        </template>
                    </el-form-item>
                </el-col>
            </el-form>
            <!-- 题目编辑 -->
            <el-col>
                <q-radio :from-data="tempQuestion" v-if="tempQuestion.basicType == 'Radio'"
                         :labelWidth="labelWidth" ref="Radio"></q-radio>
                <q-checkbox :from-data="tempQuestion" v-if="tempQuestion.basicType == 'Checkbox'"
                            :labelWidth="labelWidth" ref="Checkbox"></q-checkbox>
                <q-judgment :from-data="tempQuestion" v-if="tempQuestion.basicType == 'Judgment'"
                            :labelWidth="labelWidth" ref="Judgment"></q-judgment>
                <q-input :from-data="tempQuestion" v-if="tempQuestion.basicType == 'Input'"
                         :labelWidth="labelWidth" ref="Input"></q-input>
                <q-answer :from-data="tempQuestion" v-if="tempQuestion.basicType == 'Answer'"
                          :labelWidth="labelWidth" ref="Answer"></q-answer>
            </el-col>
        </template>
    </el-row>
</template>
<style>
    .editTodoBtnBox {
        margin-top: 10px
    }
</style>
<script>
  /*当前组件必要引入*/
  import { mixQuestionEdit as rules } from './rules'
  import { question } from './dataTemp' // 数据模版
  import viewUEditor from '../common/showUeditor.vue' // 富文本编辑器

  import questionDiffLevelOption from '../common/questionDiffLevelOption' // 难度组件

  import qRadio from './radio' // 单选
  import qCheckbox from './checkbox' // 多选
  import qJudgment from './judgment' // 判断
  import qInput from './input' // 填空
  import qAnswer from './answer' // 问答
  //当前组件引入全局的util
  let Util = null
  export default {
    props: ['fromData', 'labelWidth', 'knowledgeList'],
    data () {
      return {
        rules,
        labelWidthStr: this.labelWidth || '100px',

        // 小题知识点
        knowledgeIds: '',
        // 选中的小题知识点id集
        selKnowledgeId: [],
        // 小题支持的类型
        questionChildTypes: [],

        // 主题
        formValidate: {},
        // 小题临时模版
        tempQuestion: {},

        editQuestionIndex: -1, // 当前编辑试题的索引（-1时表示添加）
        editQuestionChild: false, // 是否是编辑小题
        lockTitle: false, // 锁定试题题目

        self: this,
        edits: {},
        //富文本编译器
        UE: {},
        ueditorConfig: {
          //详细配置参考UEditor 官网api
          initialFrameHeight: 200  //初始化编辑器高度,默认320
        }
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        let data = this.$util._.defaultsDeep({}, this.fromData)
        this.formValidate = data
        this.questionChildTypes = data.basicType.split(',')
        this.initEditState()
      },
      initEditState () {
        let formObj = this.formValidate
        let editKey = ['title']
        editKey.map(k => {
          let key = k.split('_')
          if (formObj[key[0]] instanceof Array) {
            formObj[key[0]].map((item, index) => {
              if (this.$util.hasHtmlTag(item[key[1]])) {
                this.edits[key[0] + '_' + index + '_' + key[1]] = true
              }
            })
          } else {
            if (this.$util.hasHtmlTag(formObj[key[0]])) {
              this.edits[key[0]] = true
            }
          }
        })
      },
      /*************************************** 按钮事件相关 ***************************************/
      // 保存主题干
      localSaveTitle () {
        this.lockTitle = true
        this.editQuestionChild = false
      },
      // 添加小题
      addChildQuestions () {
        let data = this.$util._.defaultsDeep({}, question)
        data.parentId = this.formValidate.id || ''
        data.subject = this.formValidate.subject || ''
        data.grade = this.formValidate.grade || ''
        data.term = this.formValidate.term || '0'

        this.tempQuestion = data
        this.editQuestionChild = true
        this.editQuestionIndex = -1
      },
      // 切换小题题型
      changeQuestionsType (val) {
        console.log(val)
      },
      // 添加知识点
      addKnowledge (id) {
        if (!id || !!~this.selKnowledgeId.indexOf(id)) {
          return
        }
        this.tempQuestion.knowledgeList.push(this.knowledgeList[id])
        this.selKnowledgeId.push(id)
      },
      // 删除知识点
      deleteKnowledge (index) {
        let delId = this.tempQuestion.knowledgeList[index].id
        let delIndex = this.selKnowledgeId.indexOf(delId)
        this.knowledgeIds = ''
        this.tempQuestion.knowledgeList.splice(index, 1)
        this.selKnowledgeId.splice(delIndex, 1)
      },
      // 修改小题
      editQuestionChildData (index) {
        let data = this.$util._.defaultsDeep({}, this.formValidate.childQuestionsList[index])
        this.tempQuestion = data
        this.editQuestionChild = true
        this.editQuestionIndex = index
      },
      // 删除小题
      removeQuestionChildData (index) {
        this.formValidate.childQuestionsList.splice(index, 1)
      },
      // 取消编辑
      cancelEdit () {
        // 解锁主题干
        this.lockTitle = false
        // 取消小题编辑模式
        this.editQuestionChild = false
        // 初始化小题编辑索引
        this.editQuestionIndex = -1
        // 初始化选中知识点
        this.knowledgeIds = ''
        this.selKnowledgeId = []
      },
      /*************************************** 富文本编辑器相关 ***************************************/
      /**
       *
       * 存储编辑器的value值
       * @param name {string}  编辑器的name
       *
       * @param val  {string}  编辑器的内容
       *
       */
      getUeditorVal (name, val) {
        let arr = name.split('_')
        if (arr.length > 1) {
          if (arr.length == 3) {
            this.formValidate[arr[0]][arr[1]][arr[2]] = val
          } else {
            this.formValidate[arr[0]][arr[1]] = val
          }
        } else {
          this.formValidate[name] = val
        }
      },

      /**
       *
       * 存储编辑器的UE.editor对象
       * @param name {string}  编辑器的name
       *
       * @param editor {}      编辑器的对象
       *
       */
      storeUE (name, editor) {
        this.UE[name] = editor
        this.edits[name] = true
      },
      /**
       * 图文切换
       * @param name
       */
      changeEdit (name) {
        // 每次切换模式都清除原来的值
        let arr = name.split('_')
        if (arr.length > 1) {
          if (arr.length == 3) {
            this.formValidate[arr[0]][arr[1]][arr[2]] = ''
          } else {
            this.formValidate[arr[0]][arr[1]] = ''
          }
        } else {
          this.formValidate[name] = ''
        }
        if (this.edits[name] == undefined) {
          let opt = {}
          opt[name] = true
          this.edits = this.$util._.defaultsDeep({}, this.edits, opt)
        } else {
          this.edits[name] = !this.edits[name]
        }
      },
      /*************************************** 数据处理相关函数 ***************************************/
      // 数据转换
      getSaveData (data) {
        let {title = '', answer = '', answerExplain = '', questionsOptions = []} = data
        let editData = {title, answer, answerExplain, questionsOptions}
        let temp = this.$util._.defaultsDeep({}, this.tempQuestion)
        for (let key in editData) {
          temp[key] = editData[key]
        }
        return temp
      },
      /*************************************** 外部调用相关函数 ***************************************/
      // 检测提交数据是否合法
      checkData () {
        if (!this.formValidate.title) {
          this.errorMess('请填写题目标题')
          return false
        }
        if (!this.formValidate.childQuestionsList.length) {
          this.errorMess('至少要有一个小题')
          return false
        }
        return true
      },
      /**
       * 获取当前编辑的所有数据
       * @returns {*}
       */
      getEditVal () {
        if (!this.checkData()) {
          return false
        }
        let data = this.$util._.defaultsDeep({}, this.formValidate)
        return data
      },
      /**
       * 保存数据
       * 如果当前是在编辑小题状态则保存小题数据到本地
       * 如果当前状态不是编辑小题，则调用父级的保存方法，父级的保存方法调用该组件的getEditVal方法获取保存数据到服务器
       */
      saveData () {
        if (this.editQuestionChild) {
          if (!this.tempQuestion.basicType) {
            this.errorMess('请先选择题型')
            return
          }
          if (this.tempQuestion.knowledgeList && !this.tempQuestion.knowledgeList.length) {
            this.errorMess('请选择知识点')
            return false
          }
          if (this.tempQuestion.score == '' || this.tempQuestion.score != '' && isNaN(this.tempQuestion.score)) {
            this.errorMess('分值请填写有效的数字')
            return false
          }
          if (!this.tempQuestion.diffLevelCode) {
            this.errorMess('请选择难度')
            return false
          }
          let data = this.$refs[this.tempQuestion.basicType].getEditVal()
          if (!data) {
            return
          }
          data = this.getSaveData(data)
          if (this.editQuestionIndex === -1) {
            // 添加
            this.formValidate.childQuestionsList.push(data)
          } else {
            // 修改
            this.formValidate.childQuestionsList[this.editQuestionIndex] = data
          }
          this.cancelEdit()
        } else {
          this.$emit('save')
          // console.log('调用父级的保存数据方法')
        }
        // console.log('所有数据：', this.getEditVal())
        // console.log('子组件保存数据')
      },
      // 取消
      cancel () {
        if (this.editQuestionChild) {
          this.cancelEdit()
        } else {
          this.$emit('cancel')
        }
      }
    },
    created () {
      this.init()
    },
    mounted () {
    },
    components: {
      viewUEditor, questionDiffLevelOption,
      qRadio, qCheckbox, qJudgment, qInput, qAnswer
    }
  }

</script>
