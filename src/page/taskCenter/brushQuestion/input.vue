<!--
****--@file     input
****--@date     2018/4/2 17:26
****--@author   YC
****--@describe 刷题大赛-开始任务
-->
<template>
    <el-row class="ctta-content">
        <el-form :rules="rules" ref="formValidate" :model="formValidate" label-width="130px">
            <el-form-item prop="name" label="任务名称：">
                <el-input v-model="formValidate.name"></el-input>
            </el-form-item>
            <el-form-item prop="" label="任务类型：">
                刷题大赛
            </el-form-item>
            <el-form-item prop="seasonId" label="赛季选择：">
                <el-select v-model="formValidate.seasonId" placeholder="请选择" @change="selectSeason">
                    <template v-for="item in seasonOptions">
                        <el-option :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </template>
                </el-select>
            </el-form-item>
            <date-group :dateGroup="{text:'',sDate:formValidate.beginTime,eDate:formValidate.endTime}"
                        style="display: inline;">
                <el-form-item slot="start" prop="beginTime" label="开始时间：">
                    <el-date-picker v-model="formValidate.beginTime" type="datetime" :editable="false"
                                    placeholder="选择时间" :picker-options="pickerOptions0"
                                    @change="handleStartTime">
                    </el-date-picker>
                </el-form-item>
                <i></i>
                <el-form-item slot="end" prop="endTime" label="结束时间：">
                    <el-date-picker v-model="formValidate.endTime" type="datetime" :editable="false"
                                    placeholder="选择时间" :picker-options="pickerOptions1"
                                    @change="handleEndTime">
                    </el-date-picker>
                </el-form-item>
            </date-group>

            <el-form-item prop="remark" label="任务描述：">
                <el-input :rows="4" type="textarea" v-model="formValidate.remark"></el-input>
            </el-form-item>
            <el-form-item label="发布至：">
                <el-radio-group v-model="formValidate.releaseTo">
                    <el-col style="margin-bottom: 20px;height: 32px;">
                        <el-radio :label="0" style="margin-top: 10px">年级</el-radio>
                        <el-form-item v-if="!formValidate.releaseTo" prop="grade"
                                      style="width: 200px;margin-left: 20px;display: inline-block;margin-bottom: 0;">
                            <el-select v-model="formValidate.grade" placeholder="请选择" @change="changeGrade">
                                <el-option v-for="num in 12" :key="num" :label="num | grade(self)"
                                           :value="num"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-radio :label="1">群组</el-radio>
                        <el-form-item v-if="formValidate.releaseTo" style="margin-bottom: 0;">
                            <el-checkbox-group v-model="groups" @change="changeGroups">
                                <el-checkbox v-for="item in groupsData" :key="item.id" :label="item.id"
                                             :value="item.id">{{item.title}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="任务内容：">
                <el-button  class="greenButton" @click="addZn" type="success">创建题库</el-button>
                <i style="margin-left: 20px" v-if="formValidate.questionIds" class="el-icon-success"></i>
            </el-form-item>
            <el-form-item class="el-form-item is-required" prop="rewardConfigList" label="设置积分奖励：">
                <!--<el-input v-model="formValidate.integral"></el-input>-->
                <!--<p>（答对一题获得积分数量）</p>-->
                <el-col>
                    <el-col v-for="(item,index) in formValidate.rewardConfigList" :key="index">
                        第
                        <el-input style="width: 150px" v-model="item.startRanking"
                                  @change="inputCheck(index,'startRanking')"></el-input>
                        名到第
                        <el-input style="width: 150px" v-model="item.endRanking"
                                  @change="inputCheck(index,'endRanking')"></el-input>
                        名，奖励积分
                        <el-input style="width: 150px" v-model="item.integral"
                                  @change="inputCheck(index,'integral')"></el-input>
                        <template v-if="index == formValidate.rewardConfigList.length-1">
                            <el-col style="margin-top: 10px;">
                                <el-button @click="add">添加</el-button>
                                <el-button @click="del(index)" v-show="index != 0">删除</el-button>
                            </el-col>
                        </template>
                    </el-col>
                </el-col>
            </el-form-item>
        </el-form>
        <p style="text-align: center">
            <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
            <el-button size="small" @click="close">取消</el-button>
        </p>
        <!-- 模态框 增加（add） -->
        <Modal :mask-closable="false" v-model="addZnModal" height="200" title="对话框标题" class-name="vertical-center-modal"
               :width="1000">
            <modal-header slot="header" :content="contentHeader.addZnId"></modal-header>
            <create-question v-if="addZnModal" @cancel="cancel" @getQuestion="getQuestion"
                             style="padding-top: 0;padding-bottom: 0;"
                             :grade="formValidate.grade"></create-question>
            <div slot="footer"></div>
        </Modal>
    </el-row>
</template>
<script>
  /*当前组件必要引入*/
  import { CongregationAdd as rules } from '../rules'
  import api from '../api'
  import createQuestion from './createQuestion'
  //当前组件引入全局的util
  let Util = null
  export default {
    name: 'brushQuestionInput',
    data () {
      return {
        rules,
        self: this,
        addZnModal: false,
        addTypes: '',
        title: '',
        seasonOptions: {},
        questionBank: {}, // 生成题库
        contentHeader: {
          addZnId: {
            id: 'addZnId',
            title: '生成题库'
          }
        },
        loadBtn: {
          title: '提交',
          callParEvent: 'listenSubEvent'
        },
        groups: [],
        groupsData: [],
        formValidate: {
          name: '',
          groupsIds: '', // 班组ids
          publishType: '1', // 发布者类型：0平台、1教师
          // types: "0",
          releaseTo: 0, // 发布到 0是年级|1是群组
          remark: '', // 任务描述
          seasonId: '', // 赛季id
          beginTime: '', // 开始时间
          endTime: '', //结束时间
          subject: '', // 科目
          // integral: '', // 分数
          rewardConfigList: [
            {
              'startRanking': '',//排名开始
              'endRanking': '',//排名结束
              'integral': '' // 奖励积分
            },
            {
              'startRanking': '',//排名开始
              'endRanking': '',//排名结束
              'integral': '' // 奖励积分
            },
            {
              'startRanking': '',//排名开始
              'endRanking': '',//排名结束
              'integral': '' // 奖励积分
            }
          ],
          grade: '', // 年级
          questionIds: '' //试题ID ，多个逗号隔开
        },
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        Util = this.$util
        this.getSeasonOptions()
        this.getGroupsData()
      },
      changeGroups () {
        this.formValidate.grade = ''
      },
      changeGrade () {
        this.formValidate.groupsId = ''
        this.groups = []
      },
      // 获取班组
      getGroupsData () {
        let opt = {
          ajaxSuccess: res => this.groupsData = res.data.dataList || [],
          ajaxParams: {
            url: api.getGroups.path,
            params: {
              types: '0'
            }
          }
        }
        this.ajax(opt)
      },
      // 获取赛季
      getSeasonOptions () {
        let opt = {
          ajaxSuccess: res => {
            let resData = res.data
            let data = []
            let temp = {}
            let sel = '' // 默认选择的赛季
            let now = new Date()
            now.setHours(now.getHours() + 1)
            resData.map(item => {
              if (item.endTime && item.startTime && item.endTime > new Date().getTime()) {
                data.push(item)
              }
            })
            data.sort((a, b) => a.startTime > b.startTime)
            if (data instanceof Array) {
              data.map(item => {
                temp[item.id] = item
                // 根据当前时间获取默认赛季
                if (!sel && item.startTime < now.getTime() && item.endTime > now.getTime()) {
                  sel = item.id
                }
              })
            }
            this.seasonOptions = temp

            if (sel) {
              this.formValidate.seasonId = sel
              this.selectSeason(sel, now)
            }
          },
          ajaxParams: {
            url: api.getSeason.path,
            method: api.getSeason.method
          }
        }
        this.ajax(opt)
      },
      selectSeason (id, startTime) {
        let now = new Date()
        now.setHours(now.getHours() + 1)
        let temp = this.seasonOptions[id]
        let beginTime = startTime || temp.startTime
        // 处理赛季时间与当前时间进行的关系
        if (temp.startTime < now.getTime() && temp.endTime > now.getTime()) {
          beginTime = now
        }
        this.formValidate.beginTime = new Date(beginTime)
        this.formValidate.endTime = new Date(temp.endTime)
      },
      // 添加积分奖励规则
      add () {
        this.formValidate.rewardConfigList.push({
          'startRanking': '',//排名开始
          'endRanking': '',//排名结束
          'integral': '' // 奖励积分
        })
      },
      // 删除积分奖励规则
      del (index) {
        this.formValidate.rewardConfigList.splice(index, 1)
      },
      // 输入检测
      inputCheck (index, key) {
        let thisObj = this.formValidate.rewardConfigList[index]
        let preObj = null
        if (index) {
          preObj = this.formValidate.rewardConfigList[index - 1]
        }
        if (thisObj[key] && !/^\d+$/.test(thisObj[key])) {
          thisObj[key] = ''
          this.errorMess('请输入有效数字')
          return
        }
        if (key == 'integral') {
          return
        }
        if (thisObj.startRanking && thisObj.endRanking && +thisObj.startRanking > +thisObj.endRanking || !thisObj.startRanking) {
          thisObj[key] = ''
          this.errorMess('名次范围输入无效')
          return
        }
        if (preObj && (!preObj.endRanking || +thisObj.startRanking <= +preObj.endRanking)) {
          thisObj[key] = ''
          this.errorMess('名次范围输入无效')
          return
        }
      },
      //智能组卷
      addZn () {
        this.addTypes = '1'
        this.openModel('addZn')
      },
      // 智能组卷预览
      getQuestion (obj) {
        this.title = '已选择试题'
        this.questionBank = obj
        this.formValidate.grade = obj.grade
        this.formValidate.subject = obj.subject
        this.addZnModal = false
        let questionIds = []
        // 不支持组题
        obj.questionsList.map(item => {
          if (item.groups) {
            item.childQuestionsList.map(cItem => questionIds.push(cItem.id))
          } else {
            questionIds.push(item.id)
          }
        })
        this.formValidate.questionIds = questionIds.join(',')
      },
      /*
       * 点击提交按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
      listenSubEvent (isLoadingFun) {
        let isSubmit = this.submitForm('formValidate')
        if (isSubmit && this.checkData()) {
          if (!isLoadingFun) isLoadingFun = function () {
          }
          isLoadingFun(true)
          let rewardConfigList = []
          let data = this.getFormData(this.formValidate)
          data.beginTime = new Date(data.beginTime).getTime()
          data.endTime = new Date(data.endTime).getTime()
          data.rewardConfigList.map(item => item.startRanking && rewardConfigList.push(item))
          data.rewardConfigList = rewardConfigList
          if (this.formValidate.releaseTo) {
            data.groupsIds = this.groups.join(',')
            data.grade = ''
          } else {
            data.groupsIds = ''
          }
          let opt = {
            type: 'add',
            callback: 'close',
            successTitle: '添加成功!',
            errorTitle: '添加失败!',
            ajaxSuccess: res => this.$emit('add', 'add', '添加成功'),
            ajaxError: 'ajaxError',
            ajaxParams: {
              jsonString: true,
              url: api.addGamesAnswer.path,
              method: api.addGamesAnswer.method,
              data
            }
          }
          this.ajax(opt, isLoadingFun)
        }
      },
      checkData () {
        let data = this.getFormData(this.formValidate)
        let start = 0
        let num = 0 // 有效的数据
        if (data.releaseTo && !this.groups.length) {
          this.errorMess('请至少选择一个群组')
          return false
        }
        if (!data.releaseTo && !data.grade) {
          this.errorMess('年级必须选择！')
          return false
        }
        data.rewardConfigList.forEach((item, index) => {
          if (item.startRanking || item.endRanking || item.integral) {
            if (!item.startRanking || !item.endRanking || +item.startRanking > +item.endRanking) {
              this.errorMess(`请正确填写第${index + 1}项的名次范围`)
              return false
            }
            if (!item.integral) {
              this.errorMess(`请填写第${index + 1}项的积分数量`)
              return false
            }
            if (index > 0) {
              start = data.rewardConfigList[index - 1].endRanking
              if (+item.startRanking <= +start) {
                this.errorMess(`第${index + 1}项的名次范围填写不正确`)
                return false
              }
            }
            num++
          }
        })
        if (!num) {
          this.errorMess(`积分奖励至少完整填写一项`)
        }
        return !!num
      },
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
        if (flag && this.formValidate.questionIds === '') {
          this.errorMess('请创建题库！')
          flag = false
        }
        return flag
      },
      /*
       * 获取表单数据
       * @return string  格式:id=0&name=aa
       * */
      getFormData (data) {
        let myData = Util._.defaultsDeep({}, data)
        return myData
      },
      close () {
        this.$emit('cancel', 'add')
      },
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
      createQuestion
    }
  }

</script>
<style lang="scss">
    .ctta-content {
        .el-input,
        .el-select,
        .el-textarea {
            width: 100%;
        }
    }
</style>
