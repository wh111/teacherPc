<!--
****--@file     createPaper
****--@date     2018/3/19 14:41
****--@author   ${王恒}
****--@describe   布置作业
-->
<template>
    <div class="makeHomework-root">
        <div style="min-height: 460px">
            <h1 style="border-bottom: 2px solid #dcdcdc;color: #1cc03b;font-size: 20px;font-weight: 600;padding-bottom: 10px;margin-bottom: 30px">
                {{title}}</h1>
            <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px" class="base-introduce">
                <div v-if="step==1">
                    <el-row>

                        <el-col :span="8">
                            <el-form-item label="科目：" prop="name" style="z-index: 10">
                                <span style="color: #fd7416"> {{ruleForm.subject | subject}}</span>
                            </el-form-item>
                        </el-col>
                        <!--<el-col :span="8">-->
                        <!--<el-form-item label="教材：" :span="5" prop="name" style="z-index: 10">-->
                        <!--{{ruleForm.textbookVersionName}}-->
                        <!--</el-form-item>-->
                        <!--</el-col>-->

                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="教材：" :span="5" prop="name" style="z-index: 10">
                                <span style="color: #fd7416">  {{ruleForm.textbookVersionName}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!--<el-form-item label="题型：" prop="name">-->
                    <!--<el-checkbox-group v-model="ruleForm.checkList">-->
                    <!--<el-checkbox label="a">单选题</el-checkbox>-->
                    <!--<el-checkbox label="B">多选题</el-checkbox>-->
                    <!--<el-checkbox label=" C">问答题</el-checkbox>-->
                    <!--</el-checkbox-group>-->
                    <!--</el-form-item>-->
                    <div v-if="$route.params.name=='1'">
                        <el-form-item label="作业名称：" prop="title">
                            <el-col :span="8">
                                <el-input v-model="ruleForm.title"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="布置时间：" prop="name">
                            <data-group :dateGroup="{text:'上交时间：',type:'datetime' }"></data-group>
                        </el-form-item>
                        <el-form-item label="防作弊设置：" prop="name">
                            <el-checkbox-group v-model="ruleForm.checkList" @change='select'>
                                <el-checkbox label="cheatSetQuestionsSeqRandom">题目顺序随机</el-checkbox>
                                <el-checkbox label="cheatSetOptionsSeqRandom">选择题候选项随机</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </div>
                    <div v-if="$route.params.name=='2'">
                        <el-form-item label="试卷名称：" prop="name">
                            <el-col :span="8">
                                <el-input v-model="ruleForm.day"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="发布时间：" prop="name">
                            <data-group :dateGroup="{text:'截至时间：' ,type:'datetime'}"></data-group>
                        </el-form-item>
                        <el-form-item label="公布答案" prop="birth">
                            <div class="block" style="float: left">

                                <el-date-picker
                                        v-model="ruleForm.day"
                                        type="datetime"
                                        placeholder="及时公布"
                                >
                                </el-date-picker>
                            </div>

                        </el-form-item>
                        <el-form-item label="答题时长：" prop="name">
                            <el-col :span="8">
                                <el-input v-model="ruleForm.name"></el-input>
                            </el-col>
                            <el-col :span="8">
                                分钟
                            </el-col>
                        </el-form-item>

                    </div>
                    <el-form-item label="发布至：" prop="name">
                        <span style="color:  #fd7416">  {{$route.params.id.title}}</span>
                    </el-form-item>
                </div>
                <div v-if="step==2">

                    <subjectType :showItems="showItems"></subjectType>
                    <el-form-item label="难度：" prop="name">
                        <el-select v-model="ruleForm.subject">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="0.5" value="shanghai"></el-option>
                            <el-option label="0.4" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>

                </div>
            </el-form>
            <el-table
                    :data="tableData3"
                    border
                    style="width: 600px;text-align: center" v-if="step==2">
                <el-table-column
                        prop="date1"
                        label=" ">
                    <template slot-scope="scope">
                        <el-checkbox v-model="checked">汉语拼音</el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="选择题">
                    <template slot-scope="scope">
                        <el-col :span="12">
                            <el-input v-model="number"></el-input>
                        </el-col>
                        <el-col :span="12">
                            /10
                        </el-col>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="填空题">
                    <template slot-scope="scope">
                        <el-col :span="10">
                            <el-input v-model="number"></el-input>
                        </el-col>
                        /10
                    </template>
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="简答题">
                    <template slot-scope="scope">
                        <el-col :span="10">
                            <el-input v-model="number"></el-input>
                        </el-col>
                        /10
                    </template>
                </el-table-column>
            </el-table>
            <step-three v-if="step==3"></step-three>
        </div>
        <div style="text-align: center;padding-top: 10px">
            <el-button @click="step--" v-if="step!=1" style="background-color: #1cc03b;color: white">上一步</el-button>
            <el-button @click="step++;next()" v-if="step!=3" style="background-color: #1cc03b;color: white;">下一步
            </el-button>
        </div>
    </div>
</template>
<script>
  /*当前组件必要引入*/
  import dataGroup from '../../../components/common/dateGroup.vue'
  import subjectType from '../../../components/common/subjectHead'
  import stepThree from './stepThree'
  import { makeWork as rules } from '../rules'

  let Util = null
  export default {
    data () {
      return {
          rules: {},
        showItems: ['grade', 'subject', 'chapter'],
        self: this,
        subjectList: [],
        title: '',
        step: 1,
        checked: '',
        number: '',
        ruleForm: {
          checkList: [],
          grade: '',
          subject: '',
          title: '',
          cheatSetQuestionsSeqRandom: 0,
          cheatSetOptionsSeqRandom: 0,
          textbookVersionName: '',
          textbookVersionId: ''
        },
        tableData3: []
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        console.log(this.$store.state)
        if (this.$store.state.user.info.textbookVersionList[0]) {
          this.ruleForm.subject = this.$store.state.user.info.textbookVersionList[0].subject
          this.ruleForm.textbookVersionName = this.$store.state.user.info.textbookVersionList[0].textbookVersionName
          this.ruleForm.textbookVersionId = this.$store.state.user.info.textbookVersionList[0].textbookVersionId
        }
        Util = this.$util
        if (this.$route.params.name == 1) {
          this.title = '布置作业'
        } else if (this.$route.params.name == 2) {
          this.title = '智能组卷'
        }
      },
      select () {
        //防屏蔽设置
        if (this.ruleForm.checkList.indexOf('cheatSetQuestionsSeqRandom')) {
          this.ruleForm.cheatSetQuestionsSeqRandom = 1
        }
        if (this.ruleForm.checkList.indexOf('cheatSetOptionsSeqRandom')) {
          this.ruleForm.cheatSetOptionsSeqRandom = 1
        }
      }

    },
    created () {
      this.init()
    },
    mounted () {
    },
    components: {
      dataGroup,
      stepThree,
      subjectType
    }
  }

</script>
<style lang="scss">
    .makeHomework-root {
        padding: 30px;
    }

    #app > div > div.selfContent.clearfix > div.routerViewBox.right {
        min-height: 597;
    }

    .base-introduce {
        padding-left: 60px;
        padding-top: 40px;
    }
</style>
