<!--
****--@file     startCorrected
****--@date     2018/3/19 20:59
****--@author   zyc
****--@describe 未批改-开始批改
-->

<template>
    <div class="showHaveCorrected-root">
        <h1 class="h1">{{viewData.title}} </h1>
        <el-row style="border-bottom: 1px solid #D9E0E2;">
            <div class="rightTitle">
                <div class="status yellow">
                    未批改
                </div>
                <div class="status">
                    <b>{{viewData.totalScore}}分</b>
                </div>
            </div>
            <div class="img">
                <user-img :wh="52" :src="viewData.icon"></user-img>
            </div>
            <span class="name">{{viewData.studentName}}</span>
            <!--<p class="p"> {{viewData.studentName}}<span style="float: right">(未批改){{viewData.totalScore}}分</span></p>-->
        </el-row>
        <el-row style="line-height: 30px">
            <el-col :span='12'>
                试卷共{{viewData.totalQuestions}}题，考生共答{{viewData.studentAnswerNum}}题
            </el-col>
            <el-col :span='6'>
                用时：{{(viewData.usedTime / 60 || 0).toFixed(0)}}分钟{{(viewData.usedTime % 60 || 0)}}秒
            </el-col>
            <el-col :span='6'>
                <span style="float: right">正确率：{{(Number(viewData.correctRate) || 0).toFixed(0)}}%</span>
            </el-col>
        </el-row>
        <!-- 试卷结构 -->
        <div class="paperBody">
            <template v-for="(item,questionsTypeId) in viewData.questionsList">
                <question-show
                        :key="questionsTypeId"
                        :index="questionsTypeId+1"
                        :showData="item"
                        :showScore="true"
                        :show-answer="true"
                        answerDo="7"
                >
                    <template v-if="item.groups">
                        <template slot="title">
                            <p class="contentTitle" @click.stop="cancelHref"><span>难度：{{item.diffLevel}}</span><span>满分：{{item.score}}</span><span
                                    class="green">得分： {{item.studentScore}} </span></p>
                        </template>
                        <template v-for="(itemChild,index) in item.childQuestionsList"
                                  :slot="'answerRight'+itemChild.id">
                            <template v-if="!['Answer','Input'].includes(itemChild.basicType)">
                                <template>
                                    <p class="contentTitleRight" @click.stop="cancelHref">
                                        <span>难度：{{itemChild.diffLevel}}</span><span>满分：{{itemChild.score}}</span><span
                                            class="green">得分： {{itemChild.studentScore}} </span></p>
                                </template>
                            </template>
                            <template v-else>
                                <!--<template slot="title">-->
                                <!--<p class="contentTitle" @click.stop="cancelHref"><span>难度：{{itemChild.diffLevel}}</span><span>满分：{{itemChild.score}}</span><span class="green">得分： {{itemChild.studentScore}}<span class="pen"><i class="el-icon-edit"></i></span> </span></p>-->
                                <!--</template>-->
                                <!--<div :key="itemChild.id">-->
                                <!--<span style="margin-right: 10px">难度：{{itemChild.diffLevel}} </span>-->
                                <!--<el-input style="width: 22%" v-model="itemChild.studentScore" slot="todoBox"-->
                                <!--type="number"/>-->
                                <!--<span style="color:#fd7416;"> / {{itemChild.score}}</span>-->
                                <!--<el-button @click="correct(itemChild,questionsTypeId,'child',index)">打分</el-button>-->
                                <!--</div>-->
                                <div class="contentTitle contentTitleRight" @click.stop="cancelHref">
                                    <span>难度：{{itemChild.diffLevel}}</span><span>满分：{{itemChild.score}}</span><span
                                        class="green">得分： {{itemChild.studentScore}}<span class="pen"
                                                                                          @click.stop="showCorrect(itemChild)"><i
                                        class="el-icon-edit"></i>
                                         <div class="buttonContent" @click.stop="cancelHref"
                                              v-show="show&&itemChild.show">
                                          <el-input class="input" v-model="studentScoreNull"></el-input>
                                          <el-button class="greenButton button"
                                                     @click="correct(itemChild,questionsTypeId,'child',index)">确定</el-button>
                                        </div>
                                </span> </span>

                                </div>

                            </template>
                        </template>

                    </template>
                    <template v-else>
                        <template v-if="!['Answer','Input'].includes(item.basicType)">
                            <template slot="title">
                                <p class="contentTitle " @click.stop="cancelHref">
                                    <span>难度：{{item.diffLevel}}</span><span>满分：{{item.score}}</span><span class="green">得分： {{item.studentScore}}</span>
                                </p>
                            </template>

                        </template>
                        <template v-else>
                            <template slot="title">
                                <div class="contentTitle" @click.stop="cancelHref">
                                    <span>难度：{{item.diffLevel}}</span>
                                    <span>满分：{{item.score}}</span>
                                    <span class="green">得分： {{item.studentScore}}</span>
                                    <span class="pen" @click.stop="showCorrect(item)">
                                        <i class="el-icon-edit"></i>
                                    </span>
                                    <div @click.stop="cancelHref" class="buttonContent" v-if="show&&item.show">
                                        <el-input class="input" v-model="studentScoreNull"></el-input>
                                        <el-button class="greenButton button"
                                                   @click="correct(item,questionsTypeId,'noChild')">确定
                                        </el-button>
                                    </div>
                                </div>

                            </template>
                            <!--<span style="margin-right: 10px">难度：{{item.diffLevel}} </span>-->
                            <!--<el-input style="width: 22%" v-model="item.studentScore" slot="todoBox" type="number"/>-->
                            <!--<span style="color:#fd7416;">/  {{item.score}}</span>-->
                            <!--<el-button @click="correct(item,questionsTypeId,'noChild')">打分</el-button>-->
                        </template>
                        <template slot="answerRight">
                            <span></span>
                        </template>
                    </template>

                </question-show>
            </template>
            <div style="text-align: center">
                <el-button @click="allComplete">批改完成 </el-button>
            </div>
        </div>
    </div>
</template>
<script>
  /*当前组件必要引入*/
  import userImg from '../../../components/common/userHeadImg.vue'
  import questionShow from '../../../components/questionShow/show.vue'
  import api from '../api'

  //当前组件引入全局的util
  let Util = null
  export default {
    name: 'showHaveCorrected',
    props: ['formValidate', 'studentId'],
    data () {
      return {
        viewData: {questionsList: [],},
        question: {questionsId: '', score: ''},
        questionData: {},
        show: false,
        showItem:null,
        studentScoreNull:''
      }
    },
    methods: {
      showCorrect (item) {
        // console.log(1)
        // this.show = !this.show
        // console.log(this.show)
        if(item!=this.showItem){
          // console.log(1)
          this.show=true;
          this.showItem=item;
        }
        this.viewData.questionsList.map((data) => {
          if (data.groups) {
            data.childQuestionsList.map((childItem) => {
              childItem.show = false
            })
          } else {
            data.show = false
          }
        })
        item.show = this.show

      },
      showCorrect (itemChild) {
        // console.log("181 ",this.show)
        this.show = !this.show
        this.studentScoreNull=''
        // console.log("this.show",this.show)
        if(itemChild!=this.showItem){
          // console.log("185",this.showItem)
          this.show=true;
          this.showItem=itemChild;
        }
        this.viewData.questionsList.map((data) => {
          if (data.groups) {
            data.childQuestionsList.map((childItem) => {
              childItem.show = false
            })
          } else {
            data.show = false
          }
        })
        itemChild.show = this.show

      },
      cancelHref () {
      },
      allComplete () {//全部批改
        let temp = true
        this.viewData.questionsList.map((item) => {
          if (item.groups) {
            item.childQuestionsList.map((childItem) => {
              if (childItem.isCorrecting == 0 && ['Input', 'Answer'].includes(childItem.basicType)) {
                this.errorMess('还有未批改的题，请批改完成点击提交')
                temp = false
                return false
              }
            })
          } else {
            if (item.isCorrecting == 0 && ['Input', 'Answer'].includes(item.basicType)) {
              this.errorMess('还有未批改的题，请批改完成点击提交')
              temp = false
              return false
            }
          }
        })
        if (!temp) {
          return false
        }
        this.ajax({
          ajaxSuccess: () => {
            this.successMess('提交成功')
            this.$emit('reResquest')
          },
          ajaxParams: {
            url: api.finished.path,
            method: api.finished.method,
            data: {
              workId: this.formValidate.workId,
              studentId: this.studentId,
              groupsId: this.formValidate.groupsId

            },
          },
        })
      },
      //初始化请求列表数据
      init () {
        this.getInfo()
      },
      getInfo () {
        this.ajax({
          ajaxSuccess: (res) => {
            this.showList = []
            this.viewData = res.data
            if (this.viewData.icon) {this.viewData.icon = this.getStaticPath(this.viewData.icon)}
            this.viewData.questionsList.map((item, index) => {
              item.middle = item.studentScore
              item.show = false
              if (item.childQuestionsList) {
                item.score = 0
                item.studentScore = 0
                item.childQuestionsList.map((itemChildren, index1) => {
                  item.score += itemChildren.score
                  item.studentScore += itemChildren.studentScore
                  itemChildren.show = false
                  itemChildren.middle = itemChildren.studentScore
                })
              }
              // this.viewData.questionsList.map((item) => {item.middle = (item.studentScore || 0)})
            })
          },
          ajaxParams: {
            url: api.getWorkInfo.path,
            method: api.getWorkInfo.method,
            params: {
              workId: this.formValidate.workId,
              studentId: this.studentId
            },
          },
        })
      },
      correct (val, index, type, childrenIndex) {//
        val.studentScore=this.studentScoreNull;
        // console.log(val.studentScore,val.score)
        if(val.studentScore < 0){
          this.errorMess('请输入正确值')
          val.studentScore = 0
          this.studentScoreNull=''
          return false
        }
        if (val.studentScore > val.score || val.studentScore === '') {
          this.errorMess('输入分值不能大于该题满分')
          val.studentScore = 0
          this.studentScoreNull=''
          return false
          // return
        }
        this.show = !this.show
        // console.log(279,Number(this.studentScoreNull))
        this.studentScore=Number(this.studentScoreNull)
        // console.log(279,this.studentScore)

        this.questionData = {
          workId: this.formValidate.workId,
          studentId: this.studentId,
          groupsId: this.formValidate.groupsId,
          questionsId: val.id,
          score: val.studentScore
        }
        this.show = !this.show

        val.studentScore=this.studentScore
        // console.log(292,val.studentScore)
        // console.log("val.studentScore266",val.studentScore)
        // console.log("val.studentScore266",val.score)

        let opt = Object.assign({}, this.questionData)
        this.ajax({
          ajaxSuccess: (res) => {
            this.successMess('提交成功')
//            this.show=false;
//            console.log(this.show)
            if (childrenIndex) {
              this.viewData.totalScore += (Number(val.studentScore) - Number(this.viewData.questionsList[index].childQuestionsList[childrenIndex].middle))
              this.viewData.questionsList[index].childQuestionsList[childrenIndex].middle = val.studentScore
              this.viewData.questionsList[index].childQuestionsList[childrenIndex].isCorrecting = true
              this.viewData.questionsList[index].studentScore += (Number(val.studentScore) - Number(this.viewData.questionsList[index].childQuestionsList[childrenIndex].middle))

            } else {
              // console.log("285middle",this.viewData.questionsList[index].middle)
              this.viewData.totalScore += (Number(val.studentScore) - Number(this.viewData.questionsList[index].middle))
              this.viewData.questionsList[index].middle = val.studentScore
              this.viewData.questionsList[index].isCorrecting = true
            }
            this.showCorrect(val)
          },
          ajaxParams: {
            url: api.correcting.path,
            method: api.correctEvaluation.method,
            data: opt,
          },
        })
      },

//      finished(){
//        this.ajax({
//          ajaxSuccess: (res) => {this.successMess('批改成功')},
//          ajaxParams: {
//            url: api.finished.path,
//            method: api.finished.method,
//            params:{
//              workId: this.formValidate.workId,
//              studentId: this.studentId,
//              groupsId:this.viewData.groupsId,
//            }
//          },
//        })
//      }
    },
    created () {
      this.init()
    },
    mounted () {
    },
    components: {
      userImg, questionShow
    },
  }

</script>
<style lang="scss">
    .showHaveCorrected-root {
        .contentTitle {
            height: 37px;
            background: #ebf3f0;
            margin-top: 40px;
            line-height: 37px;
            text-align: right;
            position: relative;
            span {
                font-size: 12px;
                color: #A0A0A0;
                margin-right: 20px;
            }
            .green {
                color: #11a63f;
                font-weight: bold;
            }
            .pen {
                color: #A0A0A0;
                font-size: 14px;

            }
        }
        .contentTitleRight {
            background: #fff;
            height: 24px;
            line-height: 26px;
            span {
                font-size: 12px;
                color: #A0A0A0;
                margin-right: 20px;
            }
            .green {
                color: #11a63f;
                font-weight: bold;
            }
        }
        .buttonContent {
            z-index: 10;
            background-color: #fff;
            position: absolute;
            right: 0;
            bottom: -66px;
            width: 147px;
            height: 53px;
            .input {
                width: 62px;
                height: 27px;

            }
            .button {
                color: #fff;
                text-align: center;
                width: 62px;
                span {
                    color: #fff;
                }
            }
        }

        /*.paperBody{*/
        /*border:1px solid #11a63f ;*/
        /*border-radius: 5px;*/
        /*background: #fff;*/
        /*padding-bottom: 20px;*/
        /*}*/
        h1 {
            line-height: 40px;
            font-size: 18px;
            font-weight: bold;
            color: #11a63f;
            text-align: center;
            border-bottom: 1px solid #D9E0E2;
            margin-top: -20px;

        }
        .p {
            margin-left: 75px;
            height: 60px;
            line-height: 70px;
            font-size: 12px;
            span {
                float: right;
            }
        }

        .rightTitle {
            float: right;
            border: 1px solid #FD7416;
            border-radius: 2px;
            overflow: hidden;
            margin-top: 20px;
            margin-right: 20px;
            .status {
                width: 80px;
                height: 32px;
                line-height: 32px;
                text-align: center;

                font-size: 12px;
            }
            .green {
                color: #fff;
                background: #11a63f;
            }
            .yellow {
                background: #FD7416;
                color: #fff;
            }
        }
        .img {
            float: left;
            margin-top: 24px;
        }
        .name {
            line-height: 100px;
            margin-left: 10px;
            font-weight: bold;
        }
        .span {
            float: left;
        }
        .list-content {
            padding: 10px;
            margin: 10px 0;
            font-size: 14px;
            background-color: #f5f5f5;
            .title {
                height: 40px;
                line-height: 20px;
            }
        }
        a {
            color: #495060;
        }
    }
</style>