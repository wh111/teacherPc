<!--
****--@file     preview
****--@date     2018/3/29 20:38
****--@author   YC
****--@describe 试题预览
-->
<template>
    <div class="paperView edit">
        <template v-if="error">
            <p class="urlParamsError">环境异常，请退出后重新登录</p>
        </template>
        <template v-else>
            <!-- 试卷顶部 -->
            <el-row class="paperHeader">
                <el-col>
                    <el-form :inline="true" :model="info" ref="info" :rules="rules">
                        <el-col align="center" class="paperTitle"
                                style="line-height: normal;position: relative;z-index: 10">
                            <p v-if="!editTitle" class="pTitle">
                                <b v-if="info.name">{{ info.name }}</b>
                                <i class="el-icon-edit" @click="editTitleCall">{{ info.name ? '' : '请点击进行标题编辑' }}</i>
                            </p>
                            <el-form-item v-else label="试卷名称：" prop="name">
                                <el-input v-model="info.name" align="center" style="width: 300px">
                                    <el-button slot="append" icon="el-icon-check" @click="editTitleCall"></el-button>
                                </el-input>
                            </el-form-item>
                            <!--<b>{{ info.name }}</b>-->
                            <!-- 操作按钮 -->
                            <div class="publishBtn">
                                <el-button class="greenButton" @click="publishStart">发布</el-button>
                                <el-button class="whiteButton" v-if="paperType == 'manual'" @click="printModal=true"
                                           :disabled="!info.name||!info.score||!info.times||!info.startTime||!info.submitTime||!info.publishAnswerTime">
                                    打印试卷
                                </el-button>
                                <el-button class="whiteButton"  v-else-if="paperType == 'intelligent'||paperType == 'template'"
                                           @click="printModal=true"
                                           :disabled="!info.name">
                                    打印试卷
                                </el-button>
                            </div>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="试卷总分：">{{ info.score }}分</el-form-item>
                            <el-form-item label="答题时间：" v-if="paperType !== 'homework'">
                                {{ (paperType === 'manual' ? info.times : (info.times / 60).toFixed(0)) || '-' }}分钟
                            </el-form-item>
                            <el-form-item label="试卷题数：">{{ info.questionsLen }}题</el-form-item>
                            <!--<el-form-item label="难度预估：" v-if="paperType=='homework'">{{info.diffLevelCode|diffLevelCode(self) }}</el-form-item>-->
                        </el-col>
                        <el-col :span="8" align="right">
                            <!--<el-form-item label=" 出卷时间：">{{(info.createTime || new Date()) | formatDate('yyyy-MM-dd HH:mm')}}</el-form-item>-->
                            <el-form-item label=" 发布时间：">
                                <span v-if="info.startTime && new Date(info.startTime).getTime() > now">{{info.startTime | formatDate('yyyy-MM-dd HH:mm')
                                    }}</span>
                                <span v-else>{{ info.startTime ? '立即发布' : '——' }}</span>
                            </el-form-item>
                        </el-col>
                        <el-row class="qtt_chartMain" v-if="paperType=='homework'">
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
                    </el-form>
                </el-col>
                <el-col class="paperInfoConfig" v-if="paperType==='manual'">
                    <el-form label-width="100px" :model="info" :rules="rules" ref="info">
                        <el-form-item label="设置时间" class="el-form--inline amSetTime">

                            <date-group
                                    :dateGroup="{text:'',startDate:info.startTime,endDate:info.submitTime}">
                                <el-form-item slot="start" prop="startTime" label="发布时间" label-width="80px">
                                    <el-date-picker v-model="info.startTime" type="datetime" :editable="false"
                                                    placeholder="选择发布时间" :picker-options="pickerOptions0"
                                                    @change="handleStartTime">
                                    </el-date-picker>
                                </el-form-item>
                                <i></i>
                                <el-form-item slot="end" prop="submitTime" label="截止时间" label-width="80px"
                                              class="amstEnd">
                                    <el-date-picker v-model="info.submitTime" type="datetime" :editable="false"
                                                    placeholder="选择截止时间" :picker-options="pickerOptions1"
                                                    @change="handleEndTime">
                                    </el-date-picker>
                                </el-form-item>
                            </date-group>
                            <el-form-item prop="publishAnswerTime" label="公布答案" label-width="80px">
                                <el-date-picker v-model="info.publishAnswerTime" type="datetime"
                                                :editable="false"
                                                placeholder="选择公布答案时间" :picker-options="pickerOptions1"
                                                @change="handleEndTime">
                                </el-date-picker>
                            </el-form-item>
                        </el-form-item>
                        <!--<el-form-item label="防舞弊设置">-->
                            <!--<el-checkbox v-model="info.cheatSetQuestionsSeqRandom" true-label='1'-->
                                         <!--false-label='0'-->
                                         <!--value="0">题目顺序随机-->
                            <!--</el-checkbox>-->
                            <!--<el-checkbox v-model="info.cheatSetOptionsSeqRandom" true-label='1' false-label='0'-->
                                         <!--value="0">选择题候选项随机-->
                            <!--</el-checkbox>-->
                        <!--</el-form-item>-->
                        <el-form-item label="答题时长" prop="times">
                            <el-input v-model="info.times" class="amTimeInput" placeholder="请输入答题时长"></el-input>
                            分钟
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <!-- 试卷结构 -->
            <div class="paperBody">
                <div>
                    <template v-for="questionsTypeId in info.questionsListShowOrder">
                        <el-row class="paperQuestionType">
                            <el-col :span="12">
                                <h3 :key="questionsTypeId" class="questionTypeText">
                                    {{ questionType[questionsTypeId] }}
                                </h3>
                            </el-col>
                            <el-col :span="12" align="right">
                                <!--<el-button icon="el-icon-plus" class="whiteButton" @click="addQueToPaper(questionsTypeId)">添加题目</el-button>-->
                            </el-col>
                        </el-row>

                        <template v-for="(cItem,index) in info.questionsList[questionsTypeId]">
                            <question-show :key="cItem.id" :index="index+1"
                                           :showData="cItem" :class="'questionItem' + index" :has-do="200"
                                           :show-score="true"
                                           :show-answer="false">
                                <template slot="todoBox">
                                    <el-button-group>
                                        <el-button  size="small" class="whiteButton"
                                                   @click="moveIndex(questionsTypeId,index,'up')"
                                                   :disabled="index==0">
                                            ↑
                                        </el-button>
                                        <el-button  size="small" class="whiteButton"
                                                   @click="moveIndex(questionsTypeId,index,'down')"
                                                   :disabled="index==info.questionsList[questionsTypeId].length-1">↓
                                        </el-button>
                                    </el-button-group>
                                    <el-select v-model="todoType[cItem.id]" placeholder="管理试题" class="todoTypeBox"
                                               @change="changeTodoType">
                                        <template v-for="(oItem,oIndex) in todoTypeOptions">
                                            <!-- 组题题型不允许替换 -->
                                            <el-option v-if="!cItem.groups || cItem.groups && oItem.value!='change'"
                                                       :disabled="info.questionsList[questionsTypeId].length < 2 && oItem.value === 'delete'"
                                                       :key="oIndex" :label="oItem.label"
                                                       :value="oItem.value+'_'+questionsTypeId+'_'+index+'_'+cItem.id"></el-option>
                                        </template>
                                    </el-select>
                                </template>
                            </question-show>
                        </template>

                    </template>
                </div>
            </div>

            <!--<el-row>-->
            <!--<el-col align="center" class="btnBox">-->
            <!--<load-btn @reloadPaper="reloadPaper" :btnData="reloadPaperBtn" v-show="editType=='add'"></load-btn>-->
            <!--<load-btn @listenSubEvent="listenSubEvent" :btnData="saveBtn"></load-btn>-->
            <!--</el-col>-->
            <!--</el-row>-->
        </template>

        <!-- 模态框 增加（add） -->
        <Modal :mask-closable="false" v-model="addModal" height="200" title="对话框标题" class-name="vertical-center-modal"
               :width="900">
            <modal-header slot="header" :content="contentHeader.addId"></modal-header>
            <add-que-to-paper v-if="addModal" @cancel="cancel" @add="addCall" :selectedIds="selectedIds"
                              :selectItems="headerSelectObj" :btnText="btnText"
                              :questionsTypeId="todoQuestionsTypeId"></add-que-to-paper>
            <div slot="footer"></div>
        </Modal>
        <!-- 模态框 打印（print） -->
        <Modal :mask-closable="false" v-model="printModal" title="对话框标题" class-name="vertical-center-modal"
               class="display"
               :width="900">
            <modal-header slot="header" :content="contentHeader.printId"></modal-header>
            <print-show v-if="printModal" @cancel="cancel">
                <div class="printTest">
                    <el-form :inline="true" :model="info" ref="info" :rules="rules">
                        <el-col align="center" class="paperTitle" style="line-height: normal">
                            <p class="pTitle" style="font-size: 18px">
                                {{ info.name }}
                            </p>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="试卷总分：">{{ info.score }}分</el-form-item>
                            <el-form-item label="答题时间：" v-if="paperType !== 'homework'">
                                {{ (paperType === 'manual' ? info.times : (info.times / 60).toFixed(1)) || '-' }}分钟
                            </el-form-item>
                            <el-form-item label="试卷题数：">{{ info.questionsLen }}题</el-form-item>
                        </el-col>
                    </el-form>
                    <template v-for="(item,questionsTypeId) in info.questionsList">
                        <el-row class="paperQuestionType">
                            <el-col :span="12">
                                <h3 :key="questionsTypeId" class="questionTypeText">
                                    {{ questionType[questionsTypeId] }}
                                </h3>
                            </el-col>

                        </el-row>

                        <template v-for="(cItem,index) in item">
                            <question-show :key="cItem.id" :index="index+1"
                                           :showData="cItem" :class="'questionItem' + index" :has-do="-10"
                                           :show-score="true"
                                           :show-answer="false">
                            </question-show>
                        </template>

                    </template>
                </div>

            </print-show>
            <div slot="footer"></div>
        </Modal>
        <Modal :mask-closable="false" v-model="publishModal" height="200" title="对话框标题"
               class-name="vertical-center-modal" :width="300">
            <modal-header slot="header" :content="contentHeader.publishId"></modal-header>
            <el-row class="publishModal">
                <p v-if="info.startTime && new Date(info.startTime).getTime() < now"> {{ $route.params.type!='homework'?'测评':'作业'}}将立即发布给学生</p>
                <p v-else>{{ $route.params.type!='homework'?'测评':'作业'}}将于{{ info.startTime | formatDate('yyyy-MM-dd HH:mm') }}发布给学生</p>
                <el-col align="center">
                    <el-button type="success"  class="greenButton" @click="publish" :disabled="!isDisabled">确定</el-button>
                    <el-button @click="cancel('publish')">取消</el-button>
                </el-col>
            </el-row>
            <!--<add-que-to-paper v-if="publishModal" @cancel="cancel" @add="addCall" :selectedIds="selectedIds"-->
            <!--:selectItems="headerSelectObj" :btnText="btnText"-->
            <!--:questionsTypeId="todoQuestionsTypeId"></add-que-to-paper>-->
            <div slot="footer"></div>
        </Modal>

    </div>
</template>
<!--<script src="http://pv.sohu.com/cityjson?ie=utf-8"></script>-->
<!--<script type="text/javascript">-->
  <!--document.write(returnCitySN["cip"]+','+returnCitySN["cname"])-->
<!--</script>-->
<script>
  /*当前组件必要引入*/
  import api from './api'
  import questionShow from '../../components/questionShow/show'
  import { testPaperManagementEdit as rules } from './rules'
  import printShow from '../../components/common/print.vue'
  import addQueToPaper from './components/addQueToPaper'

  var Echarts = require('echarts')
  //当前组件引入全局的util
  let Util = null
  let oneDayTime = 1000 * 60 * 60 * 24
  export default {
    name: 'createPaperPreview',
    props: ['operailityData'],
    data () {
      return {
        rules,
        info: {
          startTime: new Date(),
          submitTime: new Date(new Date().setDate(new Date().getDate() + 1)),
          publishAnswerTime: new Date(new Date().setDate(new Date().getDate() + 1))
        },
        starTimes: new Date(),
        endTimes: new Date(new Date().setDate(new Date().getDate() + 1)),
        printModal: false,
        questionType: {}, // 题型
        questionTypeIndex: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
        // 选择题、判断题、填空题、问答题
        saveBtn: {title: '保存', callParEvent: 'listenSubEvent', type: 'success'},
        reloadPaperBtn: {title: '换一批', callParEvent: 'reloadPaper', type: 'info'},
        isDisabled:true,
        pickerOptions1: {
          //选择结束时间后设置开始日期的限制
          disabledDate: (time) => {
            if (this.starTimes != '') {
              return time.getTime() <= this.starTimes - oneDayTime
            }
          }
        },
        pickerOptions0: {
          //选择开始时间后设置结束日期的限制
          disabledDate: (time) => {
            console.log(this.endTimes)
            if (this.endTimes < 0) {
              this.endTimes = ''
            }
            if (this.endTimes != '') {
              return time.getTime() >= this.endTimes
            }
          }
        },
        headerSelectObj: { // 当前试题的配置信息
          textbookVersion: '', // 教材
          grade: '', // 年级
          term: '', // 学期
          subject: '', // 科目
          chapter: '' // 章节
        },

        error: true,
        paperType: 'homework', // 试卷类型(homework布置作业|intelligent智能组卷)

        selectedIds: [], // 已经选择的试题id

        contentHeader: {
          addId: {id: 'addId', title: '选择试题'},
          publishId: {id: 'publishId', title: '确认发布'},
          printId: {id: 'printId', title: '打印'}
        },

        todoType: {}, // 操作类型
        todoQuestionsTypeId: '', // 操作试题类型id
        todoQuestionsObj: {id: '', index: ''}, // 操作试题索引
        todoTypeOptions: [/*{label: '删除试题', value: 'delete'}, */{label: '替换试题', value: 'change'}],

        btnText: '添加',

        queTodoType: 'add', // 添加试题add|替换试题change
        editType: 'add',
        editTitle: false,
        publishModal: false,
        now: new Date().getTime(),
        drawDate: null,
        isClickStart: false,
        deleteId: '',
        scoreConf: null, // 计分方式
      }
    },
    methods: {
      // 获取试卷计分方式
      getPaperScoreType () {
        console.log(0)
        console.log(this.$store.state.papers.znPreview ,this.info)
        let {scoreType, papsersQuestionsTypeScoreList} = this.editType === 'add' ? this.$store.state.papers.znPreview : this.info
        let questionsTypeScoreObj = {}
        this.$util._.defaultsDeep([], papsersQuestionsTypeScoreList).map(item => questionsTypeScoreObj[item.questionsTypeId] = item.score)
        this.scoreConf = {scoreType, papsersQuestionsTypeScoreList, questionsTypeScoreObj}
        console.log(this.scoreType)
      },
      handleStartTime (d) {
        this.starTimes = this.deformatterDate(d)
        this.isClickStart = true
        oneDayTime = 0
      },
      handleEndTime (d) {
        console.log(1)
        if (this.isClickStart) {
          oneDayTime = 0
        } else {
          oneDayTime = 1000 * 60 * 60 * 24
        }
        this.endTimes = this.deformatterDate(d)
      },
      //初始化请求列表数据
      init () {
        let {type} = this.$route.params
        Util = this.$util
        if (['homework', 'intelligent', 'manual', 'template'].includes(type)) {
          this.paperType = type
          this.error = false
        } else {
          return
        }
        if (this.operailityData) {
          console.log(this.operailityData)
          // 获取数据初始化
          this.$store.commit('papers/init')
          this.editType = 'edit'
          this.getShowData()
        } else {
          this.initInfo()
         // this.getPaperScoreType()
        }
        if (type == 'homework') {
          this.drawDate = this.$store.state.papers.chartOption
          this.drawHomeWork()
        }
      },
      drawHomeWork () {
        console.log(this.$store.state)
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
              show:false,
              data: this.drawDate.questionsTypesNameArr
            },
            series: [
              {
                name: '题型分布',
                type: 'pie',
                radius: '55%',
                center: ['50%', '40%'],
                data: this.drawDate.questionsTypesDataArr,
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
              show:false,
              data: this.drawDate.questionsKnowledgesNameArr
            },
            series: [
              {
                name: '知识点分布',
                type: 'pie',
                radius: '55%',
                center: ['50%', '40%'],
                data: this.drawDate.questionsKnowledgesDataArr,
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
      initInfo () {
        let znPreview = this.$store.state.papers.znPreview
        console.log(this.$store.state.papers.znPreview)
        let info = {}
        // 获取题型
        this.questionType = this.$store.getters['papers/questionsType']()
        // 从状态中初始化数据
        info = Util._.defaultsDeep({}, this.$store.state.papers.info)
        if (!znPreview || !info) {
          this.$router.push({name: 'selfCenter'})
          return
        }
        for (let key in this.headerSelectObj) {
          this.headerSelectObj[key] = info[key]
        }
        this.headerSelectObj.textbookVersion = this.info.textbookVersionId
        if (!info.name) {
          info.name = znPreview.title || ''
        }
        if (this.paperType === 'manual') { // 人工组卷
          ['cheatSetQuestionsSeqRandom', 'cheatSetOptionsSeqRandom', 'startTime', 'publishAnswerTime', 'releaseTime'].map(key => info[key] = znPreview[key])
        }
        info.startTime = znPreview.startTime || ''
        if (this.paperType === 'manual') {
          info.startTime = this.info.startTime
          info.submitTime = this.info.submitTime
          info.publishAnswerTime = this.info.publishAnswerTime
        }
        info.times = znPreview.times || ''
        info.selectedIds = this.$store.state.papers.questionsIds || []
        info.score=100;
        this.info = info

        console.log(this.info)
      },
      // 编辑标题
      editTitleCall () {
        this.editTitle = !this.editTitle
      },
      // 发布弹窗
      publishStart () {
        console.log(1)
        if (this.paperType === 'manual' && !this.checkManualPublishData()) {
          return
        }
        console.log(2)
        this.setName();
        // this.isDisabled=!this.isDisabled
        // console.log(this.isDisabled=!this.isDisabled)

      },
      // 发布
      publish () {
        if(this.info.questionsLen>100){
          this.errorMess('总题数不能大于100，请修改后发布')
          return
        }
        console.log(this.isDisabled=!this.isDisabled)
        let data = {}
        if (this.paperType === 'homework') {
          data = this.getHomeworkPublishData() // 作业发布数据
        } else {
          data = this.getPublishData() //  测评发布数据
        }
        let opt = {

          ajaxSuccess: () => {
            this.successMess('发布成功！')
            this.$router.push({name: 'groupManage'})
          },
          ajaxParams: {
            url: api[this.paperType === 'homework' ? 'workAdd' : 'releaseAdd'].path,
            method: api[this.paperType === 'homework' ? 'workAdd' : 'releaseAdd'].method,
            jsonString: true,
            data
          }
        }
        this.ajax(opt)
      },
      // 检查人工组卷的必填项
      checkManualPublishData () {
        let tag = this.submitForm('info')
        if (!this.info.name) {
          tag = false
          this.errorMess('请输入标题')
        }
        return tag
      },
      /*********************************** 按钮事件 *********************************/
      // 添加试题到试卷中
      addQueToPaper (questionsTypeId) {
        this.todoQueToPaper('add', questionsTypeId)

        console.log(questionsTypeId)
      },
      reGetChart (type, date) {
        console.log(this.info)

        console.log(date)
        if (type == 'add') {
          if (date.childQuestionsList) {
            date.childQuestionsList.map((date1) => {
              date1.knowledgeList.map((item) => {
                if (this.drawDate.questionsKnowledgesNameArr.indexOf(item.name) != -1) {
                  this.drawDate.questionsKnowledgesDataArr.map((item1, index) => {
                    if (item1.name == item.name) {
                      this.drawDate.questionsKnowledgesDataArr[index].value++

                    }

                  })

                } else {
                  this.drawDate.questionsKnowledgesDataArr.push({name: item.name, value: 1})
                  this.drawDate.questionsKnowledgesNameArr.push(item.name)

                }

              })
              if (this.drawDate.questionsTypesNameArr.indexOf(date1.questionsTypeName) != -1) {
                this.drawDate.questionsTypesNameArr.map((item2, index) => {
                  if (item2.name == date1.questionsTypeName) {
                    this.drawDate.questionsTypesDataArr[index].value++
                  }
                })
              } else {
                this.drawDate.questionsTypesNameArr.push(date1.questionsTypeName)
              }

            })

          } else {
            date.knowledgeList.map((item) => {
              if (this.drawDate.questionsKnowledgesNameArr.indexOf(item.name) != -1) {
                this.drawDate.questionsKnowledgesDataArr.map((item1, index) => {
                  if (item1.name == item.name) {
                    this.drawDate.questionsKnowledgesDataArr[index].value++

                  }

                })

              } else {
                this.drawDate.questionsKnowledgesDataArr.push({name: item.name, value: 1})
                this.drawDate.questionsKnowledgesNameArr.push(item.name)

              }

            })
            if (this.drawDate.questionsTypesNameArr.indexOf(date.questionsTypeName) != -1) {
              this.drawDate.questionsTypesDataArr.map((item2, index) => {
                if (item2.name == date.questionsTypeName) {
                  this.drawDate.questionsTypesDataArr[index].value++
                }
              })
            } else {
              this.drawDate.questionsTypesNameArr.push(date.questionsTypeName)
            }

          }

        }
        if (type = 'delete') {
          for (var i in this.info.questionsList) {
            console.log(this.info.questionsList[i])
            this.info.questionsList[i].map((item) => {
              console.log(2222)
              if (item.id == date) {
                if (item.childQuestionsList) {
                  item.childQuestionsList.map((date1) => {
                    date1.knowledgeList.map((item2) => {
                      if (this.drawDate.questionsKnowledgesNameArr.indexOf(item2.name) != -1) {

                        this.drawDate.questionsKnowledgesDataArr.map((item3, index) => {
                          if (item3.name == item2.name) {
                            if (this.drawDate.questionsKnowledgesDataArr[index].value == 1) {
                              this.drawDate.questionsKnowledgesNameArr.pop(item3.name)
                              this.drawDate.questionsKnowledgesDataArr.pop({name: item3.name, value: 1})

                            } else {
                              this.drawDate.questionsKnowledgesDataArr[index].value--
                            }

                          }

                        })

                      }
//                         else{
//                           this.drawDate.questionsKnowledgesDataArr.push({name:item.name,value:1})
//                           this.drawDate.questionsKnowledgesNameArr.push(item.name)
//
//                         }

                    })
                    if (this.drawDate.questionsTypesNameArr.indexOf(date1.questionsTypeName) != -1) {
                      this.drawDate.questionsTypesNameArr.map((item2, index) => {
                        if (item2.name == date1.questionsTypeName) {
                          if (this.drawDate.questionsTypesDataArr[index].value == 1) {
                            this.drawDate.questionsTypesDataArr.pop({name: item2.name, value: 1})
                            this.drawDate.questionsTypesNameArr.pop(item2.name)
                          } else {
                            this.drawDate.questionsTypesDataArr[index].value--
                          }
                        }
                      })
                    }

                  })

                } else {
                  item.knowledgeList.map((item2) => {
                    if (this.drawDate.questionsKnowledgesNameArr.indexOf(item2.name) != -1) {
                      this.drawDate.questionsKnowledgesDataArr.map((item1, index) => {
                        if (item1.name == item2.name) {
                          if (this.drawDate.questionsKnowledgesDataArr[index].value == 1) {
                            this.drawDate.questionsKnowledgesDataArr.pop({name: item1.name, value: 1})
                            this.drawDate.questionsKnowledgesNameArr.pop(item2.name)
                          }
                          else {
                            this.drawDate.questionsKnowledgesDataArr[index].value--
                          }

                        }

                      })

                    }
//                       else{
//                         this.drawDate.questionsKnowledgesDataArr.push({name:item.name,value:1})
//                         this.drawDate.questionsKnowledgesNameArr.push(item.name)
//
//                       }

                  })
                  if (this.drawDate.questionsTypesNameArr.indexOf(item.questionsTypeName) != -1) {
                    this.drawDate.questionsTypesDataArr.map((item2, index) => {
                      if (item2.name == item.questionsTypeName) {
                        if (this.drawDate.questionsTypesDataArr[index].value == 1) {
                          this.drawDate.questionsTypesDataArr.pop({name: item2.name, value: 1})
                          this.drawDate.questionsTypesNameArr.pop(item2.name)
                        } else {
                          this.drawDate.questionsTypesDataArr[index].value--
                        }

                      }
                    })
                  }
//                     else{
//                       this.drawDate.questionsTypesNameArr.push(date.questionsTypeName)
//                     }

                }

              }
            })
          }
        }
        this.drawHomeWork()
      },
      // 上下移动
      moveIndex (questionsTypeId, index, type) {
        this.$store.commit('papers/moveQuestionsIndex', {questionsTypeId, index, type})
        this.initInfo()
      },
      // 保存
      listenSubEvent (isLoadingFun) {
        if (!this.submitForm('info')) {
          return
        }
        let data = this.getSaveData()
        if (data.questionNums < 1) {
          this.errorMess('试卷至少要有一道试题！')
          return false
        }
        if (!isLoadingFun) isLoadingFun = function () {
        }
        isLoadingFun(true)
        let opt = {
          ajaxSuccess: res => {
            this.$emit('edit', 'edit', '保存成功！')
          },
          ajaxParams: {
            jsonString: true,
            url: api[this.editType].path,
            method: api[this.editType].method,
            data
          }
        }
        this.ajax(opt, isLoadingFun)
      },
      // 换一批
      reloadPaper (isLoadingFun) {
        let data = this.$util.getFormData(this.$store.state.papers.znPreview)
        if (!isLoadingFun) isLoadingFun = function () {
        }
        isLoadingFun(true)
        let opt = {
          ajaxSuccess: res => {
            this.$store.commit('papers/updateInfo', res.data)
            this.$store.commit('papers/initQuestionsList', res.data.questionsList)
            this.$store.commit('papers/getShowQuestionTypeOrder')
            this.initInfo()
          },
          ajaxParams: {
            jsonString: true,
            url: api.preview.path,
            method: api.preview.method,
            data
          }
        }
        this.ajax(opt, isLoadingFun)
      },
      // 管理
      changeTodoType (type) {
        let todoObj = type.split('_')
        console.log(type)
        console.log(todoObj)
        this.deleteId = todoObj[3]
        switch (todoObj[0]) {
          case 'delete':
            this.$store.commit('papers/deleteQuestions', {
              questionsTypeId: todoObj[1],
              index: todoObj[2]
            })
            if (this.$route.params.type == 'homework') {
              this.reGetChart('delete', todoObj[3])
            }
            this.todoType[todoObj[3]] = ''
            this.$store.commit('papers/getShowQuestionTypeOrder')

            break
          case 'change':
            this.reGetChatDate('change')
            //                  操作类型    题型id        操作索引    题目id
            this.todoQueToPaper(todoObj[0], todoObj[1], todoObj[2], todoObj[3])
            break
          default:
            break
        }
        this.initInfo()
      },
      reGetChatDate (type) {
        console.log(this.info.questionsListShowOrder)
//        if(type=='delete'){
//          this.drawDate=''
//        }
      },
      setName(){//检查名字
        let opt = {
          ajaxSuccess: res => {
            this.openModel('publish')
          },
          ajaxError: () => {this.errorMess('获取数据失败，请重试');},
          ajaxParams: {
            url: api.findPaperByName.path,
            method: 'post',
            jsonString: true,
            data: {
              name:this.info.name
            }
          }
        }
        this.ajax(opt)
      },
      /************************************ 数据相关 ********************************/
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
      checkData () {

      },
      // 获取保存数据
      getSaveData () {
        let data = this.$util.getFormData(this.info)
        let {id = '', textbookVersionId, stage, subject, grade, term, types, name, remark, times, score} = data
        let papersQuestions = []
        let start = 1 // 题目顺序从1开始

        for (let key in data.questionsList) {
          data.questionsList[key].map(item => {
            let isGroup = item.childQuestionsList instanceof Array && item.childQuestionsList.length
            let childQuestionsList = [] // 记录组题中的小题
            // 组合题型提取该题型下的所有小题
            if (isGroup) {
              item.childQuestionsList.map((cItem, cIndex) => {
                childQuestionsList.push({
                  'questionsId': cItem.oldId || cItem.id,
                  'seq': start,
                  'score': cItem.score,
                  'childQuestionsList': []
                })
                start++
              })
            }
            papersQuestions.push({
              'questionsId': item.oldId || item.id,
              'seq': isGroup ? '' : start,
              'score': isGroup ? '' : item.score,
              childQuestionsList
            })
            // 统计题数（累加）
            !isGroup && start++
          })
        }

        return {
          id,
          // 统计试题数量
          questionNums: start - 1,
          textbookVersionId, stage, subject, grade, term, types, name, remark, times, score, papersQuestions
        }
      },
      // 获取编辑数据
      getShowData () {
        let opt = {
          ajaxSuccess: res => {
            this.$store.commit('papers/updateInfo', res.data)
            this.$store.commit('papers/initQuestionsList', res.data.questionsList)
            this.$store.commit('papers/getShowQuestionTypeOrder')
           // this.getPaperScoreType()
            this.initInfo()
          },
          ajaxParams: {
            url: api.get.path,
            method: api.get.method,
            params: {id: this.operailityData.id}
          }
        }
        this.ajax(opt)
      },
      // 获取作业发布数据
      getHomeworkPublishData () {
        let {groupsId, subject, textbookVersionId, grade, diffLevel, startTime, submitTime, cheatSetQuestionsSeqRandom, cheatSetOptionsSeqRandom} = this.$store.state.papers.znPreview
        let {name: title, score: totalScore, questionsLen: totalQuestions, questionsListShowOrder} = this.info
        let questionsList = []
        let showQuestionsList = this.info.questionsList
        let seq = 1 // 从1开始
        questionsListShowOrder.map(type => {
          showQuestionsList[type].map(item => {
            if (item.groups && item.childQuestionsList) { // 组题
              item.childQuestionsList.map(cItem => {
                questionsList.push({questionsId: cItem.id, score: cItem.score, seq})
                seq++
              })
            } else { // 基础题型
              questionsList.push({questionsId: item.id, score: item.score, seq})
              seq++
            }
          })
        })
        startTime = new Date(startTime).getTime()
        submitTime = new Date(submitTime).getTime()
        return {
          title, totalScore, totalQuestions, groupsId, subject, textbookVersionId, grade, diffLevel,
          startTime, submitTime, cheatSetQuestionsSeqRandom, cheatSetOptionsSeqRandom, questionsList
        }
      },
      // 获取测评发布数据
      getPublishData () {
        let {
          groupsId: releaseTo, remark, subject, textbookVersionId, term, grade, stage, times, diffLevel,
          startTime: releaseTime, submitTime: endTime, publishAnswerTime,
          cheatSetQuestionsSeqRandom, cheatSetOptionsSeqRandom
        } = this.$store.state.papers.znPreview
        let {name, score, questionsLen: questionNums, questionsListShowOrder} = this.info
        let papersQuestions = []
        let showQuestionsList = this.info.questionsList
        let paperTypes = {
          'manual': 0, // 0人工组卷
          'intelligent': 1, // 1智能组卷
          'template': 2 // 2 模板组卷
        }
        let types = paperTypes[this.paperType]
        let seq = 1
        questionsListShowOrder.map(type => {
          showQuestionsList[type].map(item => {
            let questionItem = {questionsId: item.id, score: item.score || '', seq: '', childQuestionsList: []} // 基础题型
            if (item.groups && item.childQuestionsList) { // 组题
              item.childQuestionsList.map(cItem => {
                questionItem.childQuestionsList.push({questionsId: cItem.id, score: cItem.score || '', seq: seq++})
              })
            } else {
              questionItem.seq = seq++
            }
            papersQuestions.push(questionItem)
          })
        })
        let data = {
          name, remark, score, questionNums, releaseTo, subject, textbookVersionId, term, grade, stage, diffLevel,
          times, types, releaseTime, endTime, publishAnswerTime, papersTypes: '2', //0试卷/1联考/2测验'3 专题库
          cheatSetQuestionsSeqRandom, cheatSetOptionsSeqRandom, papersQuestions
        }
        if (this.paperType === 'manual') { // 人工组卷
          ['cheatSetQuestionsSeqRandom', 'cheatSetOptionsSeqRandom'].map(key => data[key] = this.info[key])
          data.times = (this.info.times || 0) * 60 // 分钟转换为秒
          data.releaseTime = this.conductDate(this.info.startTime, 'yyyy-MM-dd HH:mm:ss')
          data.endTime = this.conductDate(this.info.submitTime, 'yyyy-MM-dd HH:mm:ss')
          data.publishAnswerTime = this.conductDate(this.info.publishAnswerTime, 'yyyy-MM-dd HH:mm:ss') || ''
        }
        return data
      },
      // 试卷操作
      todoQueToPaper (type, questionsTypeId, index = '', id = '') {
        let todoText = {add: '添加', change: '替换'}
        this.queTodoType = type
        this.todoQuestionsTypeId = questionsTypeId
        this.todoQuestionsObj = {index, id}
        if (id) {
          this.todoType[id] = ''
        }
        this.btnText = todoText[type]
        this.openModel('add')
      },
      /************************************ 弹窗相关 ********************************/
      // 选择试题回调
      addCall (res) {
        let temp = true
        for (var i in this.info.questionsList) {
          this.info.questionsList[i].map((item) => {
            if (res.id == item.id) {
              this.errorMess('所选试题已存在！')
              temp = false
              return
            }
          })
        }

        if (this.$route.params.type == 'homework') {

          if (temp) {
            if (this.queTodoType == 'change') {
              this.reGetChart('delete', this.deleteId)
            }
            this.reGetChart('add', res)
          }
        }
        if (this.queTodoType == 'add') {
          this.$store.commit('papers/addQuestionsList', {
            questionsTypeId: res.questionsTypeId,
            question: res
          })
        //  this.getQuestionScoreData(res)
          this.$store.commit('papers/getShowQuestionTypeOrder')
        } else if (this.queTodoType == 'change') {
          this.$store.commit('papers/updateQuestions', {
            questionsTypeId: res.questionsTypeId,
            index: this.todoQuestionsObj.index,
            data: res
          })
        }
        this.initInfo()
        this.cancel('add')
      },
      // 重新计算试卷分数
      getQuestionScoreData (addQuestion) {
        console.log(this.scoreConf)
        let {scoreType, questionsTypeScoreObj} = this.scoreConf
        console.log(this.scoreConf)
        if (scoreType === 1) { // 按题型计算分数
          if (!addQuestion) {
            return
          }
          if (addQuestion.groups) {
            addQuestion.childQuestionsList.map(item => item.score = questionsTypeScoreObj[addQuestion.questionsTypeId])
          } else {
            addQuestion.score = questionsTypeScoreObj[addQuestion.questionsTypeId]
          }
//          this.$store.commit('papers/addQuestionsList', {
//            questionsTypeId: addQuestion.questionsTypeId,
//            question: addQuestion
//          })
        } else {
          this.getQuestionScoreByServer(addQuestion)
        }
      },
      // 系统计算分数
      getQuestionScoreByServer (addQuestion) {
        let data = this.getCalculationScoreData(addQuestion)
        let opt = {
          ajaxSuccess: res => {
            this.$store.commit('papers/initQuestionsList', res.data.questionsList)
            this.initInfo()
          },
          ajaxParams: {
            jsonString: true,
            url: api.calculationScore.path,
            method: api.calculationScore.method,
            data
          }
        }
        this.ajax(opt)
      },
      // 获取系统计算分数所需数据
      getCalculationScoreData (addQuestion) {
        let data = this.$util._.defaultsDeep({}, this.info)
        let questionsList = []
        Object.keys(data.questionsList).map(type => {
          data.questionsList[type].map(item => {
            item.id = item.oldId || item.id
            item.score = item.oldScore || item.score || ''
            if (item.groups) {
              item.childQuestionsList.map(cItem => {
                cItem.id = cItem.oldId || cItem.id
                cItem.score = cItem.oldScore || cItem.score || ''
                cItem.parentId = item.id
              })
            } else {
              item.parentId = ''
            }
            questionsList.push(item)
          })
        })
        if (addQuestion) {
          addQuestion.parentId = ''
          questionsList.push(addQuestion)
        }
        return {
          score: 100,
          questionsList
        }
      },
      /***
      /*
      * 打开指定的模态窗体
      * @param options string 当前指定的模态:"add"、"edit"
      * */
      openModel (options) {
        this[options + 'Modal'] = true
      },
      // 取消
      cancel (targer) {
        this[targer + 'Modal'] = true
      }

    },
    created () {
      this.init()
    },
    mounted () {
    },
    destroyed () {
      this.$store.commit('papers/destroy')
    },
    components: {
      // 试题类型
      questionShow,
      // 试题选择弹窗
      addQueToPaper, printShow
    }
  }

</script>
<style lang="scss">
    @import "../../assets/css/paper/view";
    @import "../css/createPaper_preview";
</style>
