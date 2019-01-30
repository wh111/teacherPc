<!--
****--@file     content
****--@date     2018-09-28 10:49
****--@author   YC
****--@describe 内容部分
-->
<template>
    <div class="indexContent">
        <div class="banner">
            <swiper :options="bannersSwiperOption">
                <swiper-slide v-for="(item,index) in banners" :key="index">
                    <img :src="item">
                </swiper-slide>
            </swiper>
        </div>
        <div class="evaluat">
            <h2>自适应评测，孩子提分新方式</h2>
            <div class="eContent floatBox">
                <div class="left">
                    <div class="mac">
                        <swiper ref="evaluatSwiper" :options="evaluatSwiperOption"
                                @slideChangeTransitionStart="slideChangeTransitionStart">
                            <swiper-slide v-for="(item,index) in evaluat" :key="index">
                                <img :src="'/sasteacher/img/home/evaluat/'+item.img">
                            </swiper-slide>
                        </swiper>
                    </div>
                </div>
                <dl class="eList left">
                    <template v-for="(item,index) in evaluat">
                        <dt :key="index+'dt'" @click="evaluatSwiperShow(index)"
                            :class="{active:evaluatSwiperIndex===index}">{{ item.title }}
                        </dt>
                        <dd :key="index+'dd'">{{ item.text }}</dd>
                    </template>
                    <a href="/sasstudent/evaluationByself" class="enterBtn">进入测评</a>
                </dl>

            </div>
        </div>
        <div class="customiz">
            <h2>量身定制</h2>
            <ul class="cContent floatBox">
                <li class="step one left">
                    <b>Step 01</b>
                    <p>完成系统评测</p>
                </li>
                <li class="arrow left"></li>
                <li class="step two left">
                    <b>Step 02</b>
                    <p>平台建立学生<br>成长档案</p>
                </li>
                <li class="arrow left"></li>
                <li class="step three left">
                    <b>Step 03</b>
                    <p>完成平台推荐能力<br>相关试题</p>
                </li>
                <li class="arrow left"></li>
                <li class="step four left">
                    <b>Step 04</b>
                    <p>潜移默化中提升<br>学生学习能力</p>
                </li>
            </ul>
            <div class="bg"></div>
        </div>
        <div class="doubt">
            <h2>疑难问题随时提问</h2>
            <p>无需家教，随时解答</p>
            <img src="/sasteacher/img/home/doubt/man.jpg.png" alt="">
            <div class="doubtBtnBox">
                <a href="/sasstudent/troubleShooting" class="enterBtn">难疑解答</a>
            </div>
        </div>
        <div class="time">
            <div class="tContent">
                <img src="/sasteacher/img/home/time/content.png">
            </div>
            <div class="bg"></div>
        </div>
        <div class="teacher">
            <h2>数万名教师的教学新选择</h2>
            <div class="tContent">
                <swiper ref="teacherSwiper" :options="teacherSwiperOption">
                    <swiper-slide v-for="(item,index) in teacher" :key="index">
                        <div class="tcItem">
                            <div class="tcItemContent">
                                <img :src="item.head" class="tImg">
                                <p class="tName">{{ item.teacherName }}</p>
                                <b>
                                    <span>{{ teacherType[item.grade] }}</span>
                                    <span>|</span>
                                    <span>{{ item.subject }}</span>
                                    <span>|</span>
                                    <span>教龄{{ item.Seniority }}年</span>
                                </b>
                                <ul>
                                    <li v-for="(cItem,cIndex) in item.honor" :key="index+'-'+cIndex">
                                        <span>{{ cItem.title }}</span>：{{ cItem.tip }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
                <div class="tBtn tNext pIcon"></div>
                <div class="tBtn tPrev pIcon"></div>
            </div>
        </div>
        <div class="info">
            <h2>随时监督孩子学习</h2>
            <div class="iContent floatBox">
                <div class="tSwiper left">
                    <div class="tsBody">
                        <div class="tsMain">
                            <swiper :options="infoSwiperOption">
                                <swiper-slide v-for="index in 5" :key="index">
                                    <img :src="'/sasteacher/img/home/info/'+index+'.png'">
                                </swiper-slide>
                            </swiper>
                        </div>
                    </div>
                    <div class="tBtn iNext pIcon"></div>
                    <div class="tBtn iPrev pIcon"></div>
                </div>
                <div class="right">
                    <img class="iImg" src="/sasteacher/img/home/info/content.png">
                </div>
            </div>
        </div>
        <div class="introduce">
            <h2>助力机构高效管理</h2>
            <ul class="itContent floatBox">
                <li class="left func">
                    <b>功能板块</b>
                    <p>机构端管办理后台，轻松查看整体教学情况。</p>
                </li>
                <li class="left data">
                    <b>数据安全</b>
                    <p>专业云服务，安全存储机构数据，随时导入导出。</p>
                </li>
                <li class="left power">
                    <b>权限管理</b>
                    <p>管理人员多角色建立，合理分配各司其职。</p>
                </li>
                <li class="left analyse">
                    <b>数据分析</b>
                    <p>平台提供数据整合分析，输送结果，有效帮助决策。</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="scss">
    .indexContent {
        width: 100%;
        min-width: 1200px;
        overflow: hidden;
        .tBtn {
            width: 70px;
            height: 70px;
            border-radius: 35px;
            background-color: #bbb;
            cursor: pointer;
            position: absolute;
            top: 50%;
            margin-top: -35px;
            z-index: 2;
            &::before {
                content: ' ';
                width: 20px;
                height: 34px;
                display: block;
                margin: 20px auto 0;
                background-image: url("/sasteacher/img/home/icon.png");
            }
            &:hover {
                background-color: #bbbec4;
            }
        }
        .left {
            float: left
        }
        .right {
            float: right
        }
        .floatBox {
            &:after {
                display: block;
                content: "clear";
                height: 0;
                clear: both;
                overflow: hidden;
                visibility: hidden;
            }
        }
        .enterBtn {
            border-radius: 5px;
            background-color: rgb(17, 166, 63);
            width: 220px;
            height: 50px;
            display: inline-block;
            text-align: center;
            line-height: 50px;
            color: #fff;
            font-size: 18px;
            font-weight: bold;
        }
        .banner {
            width: 100%;
            margin: 0 auto;
            .swiper-container {
                width: 1920px;
                left: 50%;
                transform: translateX(-50%);
                img {
                    width: 100%
                }
            }
        }
        .evaluat {
            width: 1200px;
            margin: 0 auto;
            padding: 98px 0;
            h2 {
                font-size: 36px;
                text-align: center;
                font-weight: bold;
                color: #1c2c23;
                padding-bottom: 60px;
            }
            dd {
                font-size: 16px;
                color: #707070;
                line-height: 30px;
                margin-bottom: 35px;
                position: relative;
            }
            dt {
                font-size: 24px;
                font-weight: bold;
                color: #11a63f;
                position: relative;
                cursor: pointer;
                width: 135px;
                height: 40px;
                &:before {
                    content: ' ';
                    width: 20px;
                    height: 20px;
                    display: inline-block;
                    border: 4px solid #e1e1e1;
                    position: absolute;
                    left: -29px;
                    top: 10px;
                    border-radius: 10px;
                    background-color: #fff;
                }
                &.active {
                    -webkit-transform: scale(1.1);
                    -moz-transform: scale(1.1);
                    -ms-transform: scale(1.1);
                    -o-transform: scale(1.1);
                    transform: scale(1.1);
                    -webkit-transform-origin: left;
                    transform-origin: left;
                    -moz-transform-origin: left;
                    background-image: url(../assets/images/pen.png);
                    &:before {
                        left: -27px;
                        border-color: #11a63f;
                    }
                }
            }
            .mac {
                width: 807px;
                height: 488px;
                background-image: url('/sasteacher/img/home/evaluat/mac.png');
                position: relative;
            }
            .swiper-container {
                width: 500px;
                height: 318px;
                overflow: hidden;
                margin: 0;
                position: relative;
                top: 27px;
                left: 150px;
            }
            .eList {
                position: relative;
                padding-left: 20px;
                &:before {
                    content: ' ';
                    width: 2px;
                    border-left: 2px dashed #c3c3c3;
                    position: absolute;
                    top: 10px;
                    left: 0;
                    bottom: 90px;
                }
            }
        }
        .customiz {
            width: 100%;
            min-width: 1200px;
            height: 460px;
            position: relative;
            background-color: rgba(0, 0, 0, .2);
            .bg {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 460px;
                background-image: url(/sasteacher/img/home/customiz/bg.jpg);
                background-attachment: fixed;
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                z-index: -1;
            }
            h2 {
                font-size: 36px;
                font-weight: bold;
                color: #fff;
                text-align: center;
                padding-top: 60px;
            }
            .cContent {
                width: 1200px;
                margin: 0 auto;
                color: #fff;
                text-align: center;
                margin-top: 50px;
            }
            .step {
                width: 210px;
                height: 210px;
                border-radius: 105px;
                &:before {
                    width: 62px;
                    height: 62px;
                    content: ' ';
                    display: block;
                    margin: 0 auto;
                    margin-top: 40px;
                    background-image: url(/sasteacher/img/home/customiz/icon.png);
                }
                &:hover{
                    animation: axisRotation 2s infinite;
                }
            }
            b {
                font-weight: bold;
                font-size: 24px;
            }
            p {
                font-size: 16px;
            }
            .one {
                background-color: #15ab2d;
            }
            .two {
                background-color: #e67c10;
                &:before {
                    background-position: -327px 0;
                }
            }
            .three {
                background-color: #46b7ec;
                &:before {
                    background-position: 383px 0;
                }
            }
            .four {
                background-color: #8d88f1;
                &:before {
                    background-position: 62px 0;
                }
            }
            .arrow {
                width: 33px;
                height: 65px;
                background-image: url(/sasteacher/img/home/customiz/arrow.png);
                margin: 73px 43px;
            }
        }
        .doubt {
            text-align: center;
            padding: 100px 0;
            background-image: url(/sasteacher/img/home/doubt/bg.jpg);
            background-position: center;
            h2 {
                font-size: 36px;
                font-weight: bold;
                color: black;
            }
            p {
                font-size: 18px;
                color: #707070;
                margin-bottom: 60px;
            }
            .doubtBtnBox {
                margin-top: -66px;
            }
        }
        .time {
            width: 100%;
            min-width: 1200px;
            height: 500px;
            position: relative;
            background-color: rgba(42, 191, 206, .8);
            .bg {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 500px;
                background-image: url(/sasteacher/img/home/time/bg.jpg);
                background-attachment: fixed;
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                z-index: -1;
            }
            .tContent {
                width: 1200px;
                margin: 0 auto;
                padding-top: 80px;
            }
        }
        .teacher {
            width: 100%;
            min-width: 1200px;
            height: 880px;
            margin: 0 auto;
            padding: 100px 0;
            background-image: url(/sasteacher/img/home/teacher/bg.jpg);
            background-position: center;
            h2 {
                text-align: center;
                font-size: 36px;
                font-weight: bold;
                color: black;
            }
            b {
                padding-top: 10px;
                display: block;
                font-size: 15px;
                color: #313131;
            }
            ul {
                margin-top: 10px;
            }
            li {
                font-size: 14px;
                color: #959595;
                & ~ li {
                    margin-top: 28px;
                }
                span {
                    color: #11a63f;
                }
            }
            .tContent {
                width: 1200px;
                margin: 0 auto;
                padding: 0 60px;
                position: relative;
                margin-top: 70px;
            }
            .tcItem {
                width: 360px;
                padding: 30px;
                padding-top: 80px;
            }
            .tcItemContent {
                background-color: #fff;
                position: relative;
                padding: 80px 30px 0;
                height: 360px;
            }
            .tImg {
                width: 160px;
                height: 160px;
                position: absolute;
                left: 50%;
                top: -80px;
                padding: 5px;
                background: #eee;
                border-radius: 80px;
                margin-left: -80px;
            }
            .tName {
                text-align: center;
                font-size: 18px;
                color: #313131;
                padding-top: 30px;
            }
            .tPrev {
                left: 0;
                &::before {
                    background-position: -5px 0;
                }
            }
            .tNext {
                right: 0;
                &::before {
                    background-position: 32px 0;
                }
            }
        }
        .info {
            width: 100%;
            min-width: 1200px;
            height: 840px;
            margin: 0 auto;
            padding: 86px 0;
            background-image: url(/sasteacher/img/home/info/bg.jpg);
            background-position: center;
            h2 {
                text-align: center;
                font-size: 36px;
                font-weight: bold;
                color: black;
            }
            .iContent {
                width: 1200px;
                margin: 0 auto;
                margin-top: 30px;
            }
            .tSwiper {
                position: relative;
            }
            .tsBody {
                width: 516px;
                height: 604px;
                margin-left: 54px;
                position: relative;
                overflow: hidden;
            }
            .tsMain {
                width: 600px;
                position: absolute;
                left: -86px;
            }
            .tBtn {
                width: 50px;
                height: 50px;
                background-color: rgba(255, 255, 255, .8);
                &:before {
                    margin-top: 10px;
                }
            }
            .iPrev {
                left: 0;
                &::before {
                    background-position: -5px -54px;
                }
            }
            .iNext {
                right: -58px;
                &::before {
                    background-position: 32px -54px;
                }
            }
        }
        .introduce {
            width: 100%;
            min-width: 1200px;
            height: 700px;
            margin: 0 auto;
            padding: 86px 0;
            background-image: url(/sasteacher/img/home/introduce/bg.jpg);
            background-attachment: fixed;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            h2 {
                text-align: center;
                font-size: 36px;
                font-weight: bold;
                color: white;
            }
            .itContent {
                width: 1200px;
                margin: 0 auto;
                margin-top: 70px;
            }
            li {
                width: 270px;
                padding: 110px 30px;
                text-align: center;
                background-color: #fff;
                border-radius: 5px;
                & ~ li {
                    margin-left: 40px;
                }
                &:before{
                    content: ' ';
                    background-image: url(/sasteacher/img/home/icon.png);
                    display: block;
                    width: 64px;
                    height: 64px;
                    margin: 0 auto;
                    margin-bottom: 20px;
                }
            }
            .func:before{background-position: 0 -127px;}
            .data:before{background-position: 0 -216px;}
            .power:before{background-position: 0 -322px;}
            .analyse:before{background-position: 0 -424px;}
            b {
                font-size: 24px;
                color: #1b1b1b;
            }
            p {
                font-size: 15px;
                color: #7d7d7d;
            }
        }
    }
    @keyframes axisRotation {
        from {
            transform-origin:50% 50%;
            transform: rotateY(0);
            transition: all 1s;
        }
        to {
            transform-origin:50% 50%;
            transform: rotateY(360deg);
            transition: all 1s;
        }
    }
</style>
<script>
  /* 当前组件必要引入 */

  // 当前组件引入全局的util
  let Util = null
  export default {
    name: 'indexContent',
    data () {
      return {
        bannersSwiperOption: {
          autoplay: true,//可选选项，自动滑动
        },
        banners: ['/sasteacher/img/banner.png'],
        evaluat: [
          {img: 'firstAssessment.jpg', title: '首次测评', text: '首次测评，系统评估当前能力水平'},
          {img: 'analysis.jpg', title: '分析评估', text: '首次测评 分析评估 提分方案 测评完成'},
          {img: 'finish.jpg', title: '提分方案', text: '完成推荐试题试卷，在顺其自然中提升学习水平'},
          {img: 'programme.jpg', title: '测评完成', text: '评测完成，得到最终分析'}
        ],
        evaluatSwiperIndex: 0,
        evaluatSwiperOption: {
          autoplay: true,//可选选项，自动滑动
          direction: 'vertical'
        },
        teacherType: {1: '小学', 2: '初中', 3: '高中', 4: '大学', 5: '研究生导师'},
        teacher: [
          {
            'teacherName': '万老师',
            'head': '/sasteacher/img/home/teacher/1.jpg',
            'grade': 1,   // 1 是小学  2是初中   3是高中  4 是大学    5是研究生导师
            'subject': '数学',
            'Seniority': 9,
            'honor': [
              {title: '教师荣誉', 'tip': '优秀青年教师，山东省“优秀辅导教师”、省市教学能手，市学科带头人，市骨干教师。'},
              // {title: '教师成果', 'tip': '已送走五届中考毕业班，近40%的学生升入市、区重点高中。多名学生获得初中物理竞赛一等奖。'},
              // {title: '教师特色', 'tip': '已送走五届中考毕业班，近40%的学生升入市、区重点高中。多名学生获得初中物理竞赛一等奖。'},
            ]
          },
          {
            'teacherName': '李老师',
            'head': '/sasteacher/img/home/teacher/2.jpg',
            'grade': 4,   // 1 是小学  2是初中   3是高中  4 是大学    5是研究生导师
            'subject': '语文',
            'Seniority': 5,
            'honor': [
              {title: '教师荣誉', 'tip': '优秀青年教师，山东省“优秀辅导教师”、省市教学能手，市学科带头人，市骨干教师。'},
              // {title: '教师成果', 'tip': '已送走五届中考毕业班，近40%的学生升入市、区重点高中。多名学生获得初中物理竞赛一等奖。'},
              // {title: '教师特色', 'tip': '已送走五届中考毕业班，近40%的学生升入市、区重点高中。多名学生获得初中物理竞赛一等奖。'},
            ]
          },
          {
            'teacherName': '许老师',
            'head': '/sasteacher/img/home/teacher/3.jpg',
            'grade': 4,   // 1 是小学  2是初中   3是高中  4 是大学    5是研究生导师
            'subject': '英语',
            'Seniority': 3,
            'honor': [
              {title: '教师荣誉', 'tip': '优秀青年教师，山东省“优秀辅导教师”、省市教学能手，市学科带头人，市骨干教师。'},
              // {title: '教师成果', 'tip': '已送走五届中考毕业班，近40%的学生升入市、区重点高中。多名学生获得初中物理竞赛一等奖。'},
              // {title: '教师特色', 'tip': '已送走五届中考毕业班，近40%的学生升入市、区重点高中。多名学生获得初中物理竞赛一等奖。'},
            ]
          },
          {
            'teacherName': '王老师',
            'head': '/sasteacher/img/home/teacher/2.jpg',
            'grade': 5,   // 1 是小学  2是初中   3是高中  4 是大学    5是研究生导师
            'subject': '数学',
            'Seniority': 3,
            'honor': [
              {title: '教师荣誉', 'tip': '优秀青年教师，山东省“优秀辅导教师”、省市教学能手，市学科带头人，市骨干教师。'},
              // {title: '教师成果', 'tip': '已送走五届中考毕业班，近40%的学生升入市、区重点高中。多名学生获得初中物理竞赛一等奖。'},
              // {title: '教师特色', 'tip': '已送走五届中考毕业班，近40%的学生升入市、区重点高中。多名学生获得初中物理竞赛一等奖。'},
            ]
          },
        ],
        teacherSwiperOption: {
          navigation: {
            nextEl: '.tNext',
            prevEl: '.tPrev',
          },
          slidesPerView: 3,
          autoplay: true,//可选选项，自动滑动
          loop: true
        },
        infoSwiperOption: {
          effect: 'coverflow',
          grabCursor: true,
          centeredSlides: true,
          slidesPerView: 3,
          coverflowEffect: {
            rotate: 0,
            stretch: 3,
            depth: 30,
            modifier: 10,
            // slideShadows : true,
          },
          navigation: {
            nextEl: '.iNext',
            prevEl: '.iPrev',
          },
          autoplay: true,//可选选项，自动滑动
          loop: true
        }
      }
    },
    computed: {
      evaluatSwiper () {
        return this.$refs.evaluatSwiper.swiper
      },
      teacherSwiper () {
        return this.$refs.teacherSwiper.swiper
      }
    },
    methods: {
      // 初始化请求列表数据
      init () {
        Util = this.$util
      },
      slideChangeTransitionStart () {
        this.evaluatSwiperIndex = this.evaluatSwiper.activeIndex
      },
      evaluatSwiperShow (index) {
        this.evaluatSwiper.slideTo(index)
      }
    },
    created () {
      this.init()
    },
    mounted () {
    },
    components: {}
  }

</script>
