<!--
****--@file     showHaveCorrected
****--@date     2018/3/19 20:54
****--@author   zyc
****--@describe 已批改-查看详情//
-->
<template>
    <div class="showHaveCorrected-root">
        <h1>{{viewData.title}} </h1>
        <el-row style="border-bottom: 1px solid #D9E0E2;">
            <div class="rightTitle-Already">
                <div class="status green">
                    已批改
                </div>
                <div class="status">
                    <b>{{viewData.totalScore}}分</b>
                </div>
            </div>
            <div class="img">
                <user-img :wh="60" :src="viewData.icon"></user-img>
            </div>
            <span class="name">{{viewData.studentName}}</span>
        </el-row>
        <el-row style="line-height: 30px">
            <el-col :span='12'>
                试卷共{{viewData.totalQuestions}}题，考生共答{{viewData.studentAnswerNum}}题
            </el-col>
            <el-col :span='6'>
                用时：{{(viewData.usedTime/60||0).toFixed(0)}}分钟{{(viewData.usedTime%60||0)}}秒
            </el-col>
            <el-col :span='6'>
                <span style="float: right">正确率：{{(Number(viewData.correctRate)||0).toFixed(0)}}%</span>
            </el-col>
        </el-row>
        <!-- 试卷结构 -->
        <div class="paperBody">
            <template v-for="(item,questionsTypeId) in viewData.questionsList">
                <!--<h3 :key="questionsTypeId" class="questionTypeText"></h3>-->
                <router-link target="_blank" :to="{name:'groupDetailOfQuestion',query:{types:5,assessmentId:formValidate.workId,questionsId:item.id,groupsId:formValidate.groupsId,studentId:studentId}}">
                    <question-show
                            :key="questionsTypeId"
                            :index="questionsTypeId+1"
                            :showData="item"
                            :showScore="true"
                            :show-answer="true"
                            :answerDo="7"
                    >
                        <template v-if="item.groups">
                           <template  slot="title">
                               <p class="contentTitle" @click.stop="cancelHref"><span>难度：{{item.diffLevel}}</span><span>总满分：{{item.score}}分</span><span class="green">得分： {{item.studentScore}} </span></p>
                           </template >
                            <template v-for="itemChild in item.childQuestionsList" :slot="'answerRight'+itemChild.id">

                                <template>
                                  <p class="contentTitleRight">  <span>难度：{{itemChild.diffLevel}}</span><span>满分：{{itemChild.score}}分</span><span class="green">得分： {{itemChild.studentScore}} </span></p>
                                    <!--<span style="margin-right: 10px">难度：{{itemChild.diffLevel}} </span>-->
                                         <!--{{itemChild.studentScore}} / {{itemChild.score}}分-->
                                </template>
                            </template>

                        </template>
                        <template v-else >
                            <template slot="title">
                                <p class="contentTitle " @click.stop="cancelHref"><span>难度：{{item.diffLevel}}</span><span>满分：{{item.score}}分</span><span class="green">得分： {{item.studentScore}} </span></p>
                            </template>
                            <template slot="answerRight">
                                <span></span>
                            </template>
                        </template>

                    </question-show>
                </router-link>
            </template>
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
    props:['formValidate','studentId'],
    data () {
      return {
        viewData: {questionsList:[],},
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
          this.getInfo();
          console.log(this.studentId)
      },
      cancelHref(){
      },
      routerLink(){
        this.$router.push({name: 'groupDetailOfQuestion', query:{types:5,assessmentId:formValidate.workId,questionsId:item.id,groupsId:formValidate.groupsId,studentId:studentId}})
      },
      getInfo(){
        this.ajax({
          ajaxSuccess: (res)=>{
            this.viewData=res.data;
            if(this.viewData.icon){this.viewData.icon = this.getStaticPath(this.viewData.icon);}
            this.viewData.questionsList.map((item, index) => {
              if (item.childQuestionsList) {
                item.score=0;
                item.studentScore=0;
                item.childQuestionsList.map((itemChildren, index1) => {
                  item.score+=itemChildren.score;
                  item.studentScore+=itemChildren.studentScore
                })
              }
              // this.viewData.questionsList.map((item) => {item.middle = (item.studentScore || 0)})
            })
          },
          ajaxParams: {
            url: api.getWorkInfo.path,
            method: api.getWorkInfo.method,
            params: {
              workId:this.formValidate.workId,
              studentId:this.studentId
            },
          },
        })
      },

    },
    created () {
      this.init()
    },
    mounted () {
    },
    components: {userImg,questionShow},
  }

</script>
<style lang="scss">
    .showHaveCorrected-root {
        .contentTitle {
            height: 37px;
            margin-top: 40px;
            background: #ebf3f0 ;
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
        /*.paperBody{*/
            /*border:1px solid #11a63f ;*/
            /*border-radius: 5px;*/
            /*background: #fff;*/
            /*padding-bottom: 20px;*/
        /*}*/
        .rightTitle-Already{
            float: right;
            border: 1px solid #11a63f;
            border-radius: 2px;
            overflow: hidden;
            margin-top: 20px;
            margin-right: 20px;
            .status{
                width: 80px;
                height: 32px;
                line-height: 32px;
                text-align: center;

                font-size: 12px;
            }
            .green{
                color: #fff;
                background: #11a63f;
            }
            .yellow{
                background:#FD7416;
                color: #fff;
            }
        }
        h1 {
            line-height: 40px;
            font-size: 20px;
            text-align: center;
        }
        .p {
            margin-left: 75px;
            height: 60px;
            line-height: 70px;
            span {
                float: right;
            }
        }
        .img {
            float: left;
            margin-top: 24px;
        }
        .name{
            line-height: 100px;
            margin-left: 10px;
            font-weight: bold;
        }
        .list-content {
            padding: 10px;
            margin: 10px 0;
            font-size: 14px;

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