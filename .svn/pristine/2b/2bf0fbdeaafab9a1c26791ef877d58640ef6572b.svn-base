<!--
****--@file     selfCenterdetail.vue
****--@date     2017/12/25 9:29
****--@author   王恒
****--@describe  个人中心详情
-->


<template>

    <div class="selfCenterdetail">
        <div class="selfIcon" style="position: absolute;left: 230px;top: 0;">
        </div>
        <div class="friendActive">
            <h1><b>班组动态</b></h1>
            <p v-if="mark==1" style="color: #ff9f00;font-size:14px">暂无动态</p>
            <div id="friendActive-min">
                <ul :style="{'top':friendActiveTop+'px'}" id="url">
                    <li v-for="(item,index) in queryNews" :key="index">
                        <div class="yellow" v-if="item.type=='teacher'"></div>
                        <div class="green" v-else-if="item.type=='student'"></div>
                        <div class="pray" v-else></div>
                        <span>{{item.title}}</span>
                        <span> <span v-if="item.type=='student'">同学</span>  ：</span>
                        <span>{{item.content.split('*')[0]}}</span>
                        <span class="yellowFont">{{item.content.split('*')[1]}}</span>
                        <span>{{item.content.split('*')[2]}}</span>
                        <!--{{item.content}}-->
                        <span style="font-size: 12px">        {{item.createTime | formatDate('yyyy-MM-dd HH:mm')}}</span>
                        <!--正在进行[ <span class="project">初一语文</span> ]相关的测评-->
                    </li>
                </ul>
            </div>
        </div>
        <div class="signOn selfPos" v-if="!signtoday">
            <!--<p>今日签到领<b class="cens">+1</b>积分</p>-->
            <div class="circle circleLeft" @click="sign">
                <div class="layer">
                    签
                </div>
            </div>
            <button class="yellowButton" style="font-size: 14px" @click="sign"><b>马上签到</b></button>

        </div>
        <div class="signOn signOnRight" v-if="signtoday">
            <!--<p>明日签到领<b class="cens">+30</b>积分</p>-->
            <div class="circle circleRight">
                <div>
                    <p>已有</p>
                    <p>{{$store.state.user.userIntegral}}积分</p>
                </div>
            </div>
            <button @click="alertTab"><b style="font-size: 14px">查看签到记录</b></button>
        </div>

        <div class="clearfloat"></div>
        <div class="selfMyTree-My">
            <h1><b>我的知识树</b></h1>
            <div class="searchProject">
                <b>科目：</b>
                <span v-for="(item,index)  in project" :key="index" @click="selectProject(item)"
                      :class="{active:userStudeyInfo.subject==item.code}">{{item.value}}</span>
            </div>

            <div class="tree">

                <div class="treeLeft">
                    <div v-if="!treeTrue" class="treeLeft-not-all">
                        <div class="treeDoor">
                            <p>打开知识的大门</p>
                            <ul>
                                <li>您还未点亮知识树，</li>
                                <li>请完成枯木
                                    <span s>
                                        <router-link v-if="userStudeyInfo.textbookVersionId"
                                                     :to="`/choiceEvaluation/${userStudeyInfo.grade}/${isFirstAssessment}/${userStudeyInfo.textbookVersionId}/${userStudeyInfo.subject}`">
                                               <span style="color: #fc4341"> 首次测评</span>
                                        </router-link>
                                        <template v-else>
                                               <span style="color: #fc4341"> 首次测评</span>
                                        </template>
                                    </span>
                                    点亮知识树！
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div v-else class="treeLeft-all">
                        <ul class="app-wrap clearfix">
                            <div v-for="(item,index) in appArr" :key="index" class="app-line"
                                 :class="'app-line-'+index">
                                <li style="cursor: pointer" class="img-wrap" v-for="(arr,i) in item.apple" :key="i"
                                    @click="selfText(arr)"
                                    :style="{left:arr.marginLeft  + i * 80 + 'px'}">
                                    <el-tooltip class="item" effect="light" :content="arr.name+'：'+arr.chapterText"
                                                placement="right-end">
                                        <img @click="alertModel=true" :src="'/sasstudent/img/' + arr.img + '.png'">
                                    </el-tooltip>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
                <div class="treeRight">
                    <b>当前章节掌握情况</b>
                    <ul v-if="chapterList.length > 0">
                        <li @click="selfText(item)" style="cursor: pointer" class="treeRight-li"
                            v-for="(item,index) in chapterList" :key="index">
                            {{item.name}}：{{item.chapterText}}
                            <span>
                                    <div class="selfApple"
                                         :class="{
                                            'selfApple4': item.level == 0,
                                            'selfApple3': item.level >= 1 && item.level < 50,
                                            'selfApple2': item.level >= 50 && item.level < 100,
                                            'selfApple1': item.level == 100,
                                         }"></div>
                            <div style="display: inline-block;width: 42px">{{item.level}}%</div>
                                </span>
                        </li>
                    </ul>
                    <p v-else style="text-align: center;line-height: 25px;">暂无数据</p>
                </div>
            </div>

        </div>
        <div class="selfAccess">
            <div class="progress stuProgress">
                <p>当前学习进度</p>
                <el-progress class="progressInner" :percentage='studyProgress||0' color="#11a63f"></el-progress>
                <span>{{ studyProgress }}%</span><span class="rule">100%</span>
            </div>
            <div class="progress Myability" style="border: none;">
                <p>我的能力值</p>
                <el-progress class="progressInner" :percentage="percentageAbility||0" status="exception"></el-progress>
                <span>{{ percentageAbility }}</span><span class="rule">100</span>
            </div>


        </div>
        <div class="selfMyhomework" style="min-height: 200px">

            <h1><b>我的作业</b></h1>
            <p v-if="detailList.length==0" style="color: #ff9f00;">暂无作业</p>
            <div class="selfWork" v-for="(item,index) in detailList" :key="item.id">
                <p>布置者:{{item.teacherName}}&nbsp &nbsp&nbsp&nbsp&nbsp | &nbsp&nbsp&nbsp&nbsp&nbsp
                    来源：{{item.groupsName}}
                    <span>布置时间：{{item.startTime | formatDate('yyyy-MM-dd HH:mm')}} &nbsp&nbsp&nbsp&nbsp&nbsp  上交时间：{{item.submitTime | formatDate('yyyy-MM-dd HH:mm')}}</span>
                </p>
                <div class="selfWorkname">
                    <ul>
                        <li class="title">
                            <div class="ulleft">作业名称：{{item.title}}</div>
                            <span v-if="item.isNew==0&&item.submitTime > now">新作业</span></li>
                        <li class="sec">共{{item.totalQuestions}}小题。<span
                                v-if="item.finishedNums==0">作业还无人解答，争做第一名</span><span
                                v-else>{{item.finishedNums}}人已提交</span></li>
                    </ul>
                    <div class="selfready">
                        <router-link v-if="item.submitTime > now"
                                     :to="{name:'questions',params:{type:'homework',papersId:item.id},query:{groupsId:item.groupsId}}">
                            <button class="orangeYellow" @click="$store.state.app.serveAnswer={}"> 开始答题 ></button>
                        </router-link>
                        <button style="background-color: #ccc;" v-else :disabled="true"> 已截止</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="selfMyhomework">

            <h1><b>正在学习</b></h1>
            <div class="selfWork">
                <!--<p>已购买<span>2013-08-09 </span></p>-->
                <div class="isNull" v-if="myCurrentStudyProductList.length == 0">
                    <p class="tips" style="line-height: 170px;height: 170px">您还未购买过商品</p>
                </div>
                <div class="selfWorkname selfWorking" v-else v-for="(item,index) in myCurrentStudyProductList"
                     :key="index">
                    <div class="selfimg">
                        <img :src="resourceHttp + item.icon" onerror="javascript:this.src='/sasstudent/img/53.png'"/>
                    </div>
                    <ul>
                        <li class="title">
                            <div class="ulleft">{{item.title}}</div>
                        </li>
                        <li class="sec secwork">价格：<span class="selfprice">{{item.currentPrice | money}}</span></li>
                        <br>
                        <li class="sec secwork">试卷：{{item.spec}}{{item.unit | unit}}</li>
                    </ul>
                    <div class="selfready selfreadybutton">
                        <router-link
                                :to='{path:"/selfCenter/personalQuestion_goon",query:{productId:item.id}}'>
                            <button class="greenButton"> 继续练习 ></button>
                        </router-link>
                    </div>
                    <div class="selfready selfreadyWork ">
                        <span>学习进度：{{parseFloat(item.answerNums / item.questionNums * 100).toFixed(1)}}%</span>
                        <div class="selfper">
                            <el-progress class="progressInner" style="width: 100px" :text-inside="true"
                                         :stroke-width="8"
                                         :percentage="Number(parseFloat(item.answerNums / item.questionNums*100).toFixed(1))||0"
                                         status="success"></el-progress>
                        </div>
                    </div>
                </div>
                <div class="pagination" v-if="myCurrentStudyProductList.length > 0">
                    <div style="text-align: center">
                        <el-pagination
                                @size-change="changePageSize"
                                @current-change="changePage"
                                :current-page.sync="myPages.currentPage"
                                :page-size="myPages.pageSize"
                                layout="total,prev, pager, next, jumper"
                                :total="totalCount">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>

        <Modal
                :mask-closable="false"
                width="810"
                v-model="calendarModal"
                title="签到日历"
                class-name="signOn-detail"
                :loading="loading">
            <modal-header slot="header" :content="calendarId"></modal-header>
            <signOndate v-if="calendarModal" @signonThisday="signonThisday"></signOndate>
        </Modal>
        <Modal
                :mask-closable="false"
                width="700"
                v-model="selfTextAlertModel"
                title="自适应测评-弹窗"
                class-name="alertSelftest">
            <modal-header slot="header" :content="selfTextAlert"></modal-header>
            <!---->
            <selfTextAlert :operationData="operationData" :subject="userStudeyInfo.subject"
                           v-if="selfTextAlertModel"></selfTextAlert>
            <div slot="footer"></div>
        </Modal>

    </div>

</template>

<script>
  import modalHeader from '../../../components/common/modalHeader.vue'
  import signOndate from './signOndate.vue'
  import selfTextAlert from './components/selfTextAlert.vue'
  import api from './api'

  let Util = null
  export default {
    components: {
      modalHeader,
      signOndate,
      selfTextAlert,
    },
    data () {
      return {
        detailList: [],//我的作业
        mark: 0,
        friendActiveTop: 0, // 班组动态顶部位置
        totalCount: 0,
        signtoday: false,
        treeTrue: false, // 是否显示知识树章节
        calendarId: {
          id: 'signOndata',
          title: '',
        },
        MyIntegral: '',
        Selftest: {
          id: 'Selftest',
          title: '',
        },
        signList: [],
        loading: false,
        calendarModal: false,
        project: [],
        setTimeOut: null,
        isFirstAssessment: 1, // 是否是首次 1首次/2非首次
        userStudeyInfo: {
          textbookVersionId: '',
          subject: '',
          grade: ''
        },
        now: new Date().getTime(),
        chapterList: [],
        num: 5,
        appArr: {
          1: {apple: [], number: 1},
          2: {apple: [], number: 7},
          3: {apple: [], number: 6},
          4: {apple: [], number: 7},
          5: {apple: [], number: 8},
          6: {apple: [], number: 10},
          7: {apple: [], number: 11},
        },
        weight: [4, 5, 6, 3, 2, 1, 7],
        queryNews: [],
        studyProgress: 0,
        percentageAbility: 0,
        resourceHttp: '',
        myCurrentStudyProductList: [],

        operationData: {},//点击选择的苹果数据
        selfTextAlertModel: false,
        selfTextAlert: {
          id: 'selfTextAlert',
          title: ' 　',
        },
        timer: null,
      }
    }
    ,
    methods: {
      //初始化请求列表数据
      init () {
        Util = this.$util
        this.resourceHttp = this.$store.getters['app/envs']('resourceHttp')
        this.userStudeyInfo.grade = this.$store.getters['user/info']('grade')
        if (this.userStudeyInfo.grade) {
          this.project = this.$store.getters['app/envs']('gradeMap')[this.userStudeyInfo.grade]
          this.selectProject(this.project[0])
        }
//                this.ajax({
//                    ajaxSuccess: 'signListSuccess',
//                    ajaxParams: {
//                        url: api.signList.path
//                    }
//                });

        this.MyIntegral = this.$store.getters['user/info']('integral')
        this.ajax({
          ajaxSuccess: res => {
            console.log(res.data, 'aaa')
            this.signtoday = res.data
            if (this.signtoday) {
              this.ajax({
                ajaxSuccess: 'signListSuccess',
                ajaxParams: {
                  url: api.signList.path
                }
              })
            }
          },
          ajaxParams: {
            url: '/sign/getTodaySignStatus'
          }
        })
        this.myPages = Util.pageInitPrams
        this.queryQptions = {
          url: api.myCurrentStudyProductList.path,
          params: {curPage: 1, pageSize: 5}
        }
        this.setTableData()

        this.setListData()
      },
      setListData (isLoading) {//获取我的作业
        this.ajax({
          ajaxSuccess: (res) => {
            this.detailList = res.data.dataList
          },
          ajaxParams: {
            url: api.queryWork.path,
            params: {curPage: 1, pageSize: 5, isFinished: '0', nowTime: new Date().getTime()}
          },
        }, isLoading)
      },

      getFirstAssessmentState () {
        let opt = {
          ajaxSuccess: res => {
            if (res.data) {
              this.isFirstAssessment = 2
              this.$store.commit('user/updateIsFirstAssessment', true)
              this.getStudentAbility()
            } else {
              this.initAssessmentState()
            }
          },
          ajaxParams: {
            url: api.isFirstAssessment.path,
            params: this.userStudeyInfo
          }
        }
        this.ajax(opt)
      },
      initAssessmentState () {
        this.isFirstAssessment = 1
        this.$store.commit('user/updateIsFirstAssessment', false)
        this.treeTrue = false
        this.studyProgress = 0
        this.percentageAbility = 0
        this.chapterList = []
      },
      /*
      * 获取当前学生学习进度/能力值
      * */
      getStudentAbility () {
        this.chapterList = []
        this.studyProgress = 0
        this.percentageAbility = 0
        this.treeTrue = false
        this.ajax({
          ajaxSuccess: res => {
            if (res.data instanceof Object) {
              this.chapterList = res.data.chapterList
              this.studyProgress = res.data.studyProgress || 0
              console.log(this.studyProgress)
              this.percentageAbility = res.data.percentageAbility || 0
              this.treeTrue = true
              this.readTree()
            }
          },
          ajaxParams: {
            url: api.getStudentAbility.path,
            params: {
              grade: this.userStudeyInfo.grade,
              subject: this.userStudeyInfo.subject
            }
          }
        })
      },
      /*
      * 获取当前用户正在学习的商品
      * */
      setTableData (isLoading) {
        this.ajax({
          ajaxSuccess: 'listDataSuccess',
          ajaxParams: this.queryQptions
        }, isLoading)
      },
      listDataSuccess (res) {
        this.myCurrentStudyProductList = res.data.dataList
        this.totalCount = res.data.totalCount
      },
      //好友动态
      getFriend () {
        this.ajax({
          ajaxSuccess: this.getpeoplesuccess,
          ajaxParams: {
            url: api.queryNews.path,
            method: api.queryNews.method,
            params: {},
          },
        })
      },
      getpeoplesuccess (res) {
        if (res.data.dataList.length > 5) {
          if (this.queryNews.length > 5) {
            this.friendActiveTop = 0
            this.queryNews = this.queryNews.slice(this.queryNews.length - 5, -1)
          }
          this.queryNews = this.queryNews.concat(res.data.dataList)
          clearInterval(this.timer)
          this.timer = setInterval(() => {
            this.friendActiveTop += -1
          }, 62.5)
          this.setTimeOut = setTimeout(() => {this.getFriend()}, (this.queryNews.length - 5) * 2000)

        } else {
          this.queryNews = res.data.dataList
          this.setTimeOut = setTimeout(() => {this.getFriend()}, 60 * 1000)
        }
        if (this.queryNews.length == 0) {
          this.mark = 1
        } else {
          this.mark = 0
        }
      },
      getUserInfoSuccess (res) {
        if (res.data instanceof Object) {
          this.personData = res.data
          this.MyIntegral = res.data.integral
          this.$store.commit('user/updateInfo', res.data)
          this.$store.commit('user/updateTextbookVersionList', res.data.textbookVersionList)
        }
      },
      signListSuccess (res) {
        this.signList = res.data
        var today = new Date()
        var year = today.getFullYear()
        var month = today.getMonth()
        var daymouth = today.getDate()
        today.setMonth(month + 1)
        today.setDate(0)
//                var mdays = today.getDate()
        var firstday = new Date(year, month, 1)
        var dayofWeek = firstday.getDay()
        let that = this
//        this.signList.map(function (item, index) {
//          if ((index + 1) == (daymouth + dayofWeek - 1)) {
//            item.whetherSign ? that.signtoday = true : that.signtoday = false
//          }
//        })
      },
      readTree () {
        let arr = []
        let that = this
        let chapterList = that.chapterList
        let len = chapterList.length
        let ind = 0
        this.appArr = {
          1: {apple: [], number: 1},
          2: {apple: [], number: 7},
          3: {apple: [], number: 6},
          4: {apple: [], number: 7},
          5: {apple: [], number: 8},
          6: {apple: [], number: 10},
          7: {apple: [], number: 11}
        }
        for (let key in this.appArr) {
          if (key < 7) {
            arr.push(Math.floor(len * this.appArr[key].number / 50))
          }
        }
        arr.map(function (item, index) {
          if (item > 0) {
            '1'.repeat(item).split('').map(function (i) {
              let temp = chapterList[ind]
              temp.img = 'app-4'
              temp.marginLeft = parseInt(that.appArr[index + 1].number * 3 * Math.random() * 10)
              if (temp.level === 100) {
                temp.img = 'app-1'
              } else if (temp.level >= 50 && temp.level < 100) {
                temp.img = 'app-2'
              } else if (temp.level >= 1 && temp.level < 50) {
                temp.img = 'app-3'
              }
              that.appArr[index + 1].apple.push(temp)
              ind = ind + 1
            })
          }
        })
        let a = 0
        for (let key in this.appArr) {
          if (key < 7) {
            a = a + this.appArr[key].apple.length
          }
        }
        '1'.repeat(this.chapterList.length - a).split('').map(function (i) {
          let temp = chapterList[ind]
          temp.img = 'app-4'
          temp.marginLeft = parseInt(that.appArr[7].number * 3 * Math.random() * 10)
          if (temp.level === 100) {
            temp.img = 'app-1'
          } else if (temp.level >= 50 && temp.level < 100) {
            temp.img = 'app-2'
          } else if (temp.level >= 1 && temp.level < 50) {
            temp.img = 'app-3'
          }
          that.appArr[7].apple.push(temp)
          ind = ind + 1
        })
        console.log(this.appArr)
      },
      sign () {
        this.ajax({
          ajaxSuccess: res => {
            this.successMess('签到成功！')
            this.$store.commit('user/updateuserIntegral', res.data)
            this.ajax({
              ajaxSuccess: res => {
                this.$store.commit('user/updatesignList', res.data)
                this.signtoday = true
              },
              ajaxParams: {
                url: '/sign/list'
              }
            })
          },
          ajaxParams: {
            url: '/sign/sign',
            method: 'post'
          }
        })
      },
      alertTab () {
        this.calendarModal = true
      },
      selectProject (item) {
        this.userStudeyInfo.subject = item.code
        let userTBV = this.$store.getters['user/textbookVBySubject'](this.userStudeyInfo.subject)
        this.userStudeyInfo.textbookVersionId = ''
        if (!userTBV.textbookVersionId) {
          this.initAssessmentState()
          this.$Message.error('请先到个人资料中完善该科目的教材版本信息！')
        } else {
          this.userStudeyInfo.textbookVersionId = userTBV.textbookVersionId
          this.getFirstAssessmentState()
        }
      },
      signonThisday () {
        this.signtoday = true
        this.calendarModal = false
      },

      //点击打开自适应测评弹窗
      selfText (item) {
        this.operationData = item
        this.selfTextAlertModel = true
      },

    },
    computed: {},
    created () {
      this.init()
    },
    destroyed () {
      clearInterval(this.timer)
      clearTimeout(this.setTimeOut)
    },
    mounted () {
      this.$nextTick(() => {
        this.getFriend()
      })

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @import "../css/selfCenterdetail";

    .Myability {
        .el-progress.is-exception .el-progress-bar__inner {
            background: #fd7416;
        }
    }
</style>
