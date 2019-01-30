<template>
    <div class="body">
        <head-top></head-top>
        <!-- 头部banner -->
        <div style="width: 100%;background-color: #35a13e; background: url('/sasteacher/img/banner.png') no-repeat center center;">
            <div class="header-banner">
                <img src="/sasteacher/img/banner.png" alt="中小学生自适应学习平台">
            </div>
        </div>
        <div class="content">
            <!-- 自适应测评 孩子提分新方式 -->
            <div class="content-evaluating">
                <p class="titleOfEvaluating title">自适应测评，孩子提分新方式</p>
                <div class="content-evaluating-left">
                    <div class="leftImg" style="">
                        <img class="left" src="../assets/images/mac.png" alt="" style="">
                        <div class="border" style="">
                            <div style="position: relative">
                                <ul :style="{top:leftPostionTV + 'px'}">
                                    <li><img src="../assets/images/11111.jpg"/></li>
                                    <li><img src="../assets/images/222221.jpg"/></li>
                                    <li><img src="../assets/images/33.jpg"/></li>
                                    <li><img src="../assets/images/4441.jpg"/></li>
                                </ul>

                            </div>
                        </div>
                    </div>
                    <div class="innitial">
                        <div @mouseover="setLeftPostionTV(0)" :class="hoverVal==0?'active':''"></div>
                        <img src="../assets/images/pointImg_03.jpg">
                        <div @mouseover="setLeftPostionTV(-317)" :class="hoverVal==-317?'active':''"></div>
                        <img src="../assets/images/pointImg_03.jpg">
                        <div @mouseover="setLeftPostionTV(-634)" :class="hoverVal==-634?'active':''"></div>
                        <img src="../assets/images/pointImg_03.jpg">
                        <div @mouseover="setLeftPostionTV(-951)" :class="hoverVal==-951?'active':''"></div>
                        <img src="../assets/images/pointImg_03.jpg">

                    </div>
                    <!--<img class="left" src="../assets/images/content-icon1.png" alt="" style="margin: 2px 0 0 37px">-->
                    <dl class="dl-list left">
                        <dt @mouseover="setLeftPostionTV(0)">
                            首次测评
                        </dt>
                        <dd>首次测评，系统评估当前能力水平</dd>
                        <dt @mouseover="setLeftPostionTV(-317)">
                            分析评估
                        </dt>
                        <dd>首次测评 分析评估 提分方案 测评完成</dd>
                        <dt @mouseover="setLeftPostionTV(-634)">
                            提分方案
                        </dt>
                        <dd>完成推荐试题试卷，在顺其自然中提升学习水平</dd>
                        <dt @mouseover="setLeftPostionTV(-951)">
                            测评完成
                        </dt>
                        <dd>评测完成，得到最终分析</dd>
                    </dl>
                    <router-link to="/evaluationByself">
                        <div class="goevaluating content-btn greenButton    ">进入测评</div>
                    </router-link>
                </div>
            </div>
            <div class="head-bigImg">
                <div class="one" style="">
                </div>
                <div class="two" style=""></div>
                <div class="three" style=""></div>
                <div class="four" style="">
                </div>

                <div class="bannerButtom" style=''>
                    <router-link to="/evaluationByself">
                        <div class="returnTo greenButton" style="">开始测评</div>
                    </router-link>
                    <img style="margin-left: -360px" src="../assets/images/bottom_04.jpg"/>
                    <div style="position: absolute;top: 1800px;width: 100%;height: 880px">
                        <div style="position:relative;height: 880px">
                            <img src="../assets/images/bg1.jpg" style="position: absolute;left: -355px">
                            <div @click="clickSmall('left')"
                                 style="top:456px;background: url('/sasteacher/img/doorbutton_06.jpg') no-repeat;width: 71px;height: 71px;z-index: 100;position: absolute;left: -2px"></div>
                            <div @click="clickSmall('right')"
                                 style="top:456px;background: url('/sasteacher/img/doorRight_08.jpg');width: 71px;height: 71px;z-index: 100;position: absolute;left: 1120px"></div>
                            <div class="content-choice content-body" style="position: absolute">

                                <div class="title">
                                    <p>
                                        名师入驻
                                    </p>
                                </div>
                                <div class="ul-wrap">
                                    <div class="ul-hidden">
                                        <ul ref="teacherList" class="teacher-list clearfix"
                                            :style="{marginLeft:leftPostion + 'px'}"
                                            v-model="teacherList">
                                            <li class="teacher-item left" v-for="item in teacherList">
                                                <img :src="item.head" alt=""

                                                     width="160" height="160">
                                                <!--onerror="javascript:this.src='./sasteacher/img/head.jpg'"-->
                                                <div class="teacher-item-content">
                                                    <p class="teacher-name">{{ item.teacherName }}</p>
                                                    <dl>
                                                        <dt class="teacher-tip">
                                                            {{ item.grade | grade(self) }} | {{ item.subject
                                                            }} | 教龄{{ item.Seniority
                                                            }}年
                                                        </dt>
                                                        <dd class="teacher-main" v-for="honor in item.honor">
                                                            <span class="rongyu">教师荣誉：</span>{{ honor.tip }}
                                                        </dd>
                                                    </dl>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="content-customized" style="top: 0;position: absolute;width: 1900px;margin-left: -355px">
                        <div class="content-body">
                            <p class="title titleOfEvaluating" style="color: #ffffff;padding-top: 80px">量身定制</p>
                            <ul class="customized-list" style="position: relative;top: -20px;left: 40px">
                                <li class="customized-item left" style="background:#1cc03b;margin-left: 37px"
                                    :class="active==0?'customized-item-active':''">
                                    <img style="margin-left: 9px" src="../assets/images/content-icon1.png" alt="">
                                    <span class="customized-item-title">Step 1</span><br>
                                    <span style="line-height: 20px;font-size: 12px">完成系统测试</span>

                                </li>
                                <img class="iconRight iconRightOne" src="../assets/images/iconRight.png"/>
                                <li class="customized-item left" style="background:#e67c10;"
                                    :class="active==1?'customized-item-active':''">
                                    <img style="margin-left: 6px" src="../assets/images/content-icon2.png" alt="">
                                    <span class="customized-item-title">Step 2</span><br>
                                    <span style="line-height: 20px;font-size: 12px">平台建立学生<br>成长档案</span>

                                </li>
                                <img class="iconRight iconRightTwo" src="../assets/images/iconRight.png"/>
                                <li class="customized-item left" style="background:#46b7ec;"
                                    :class="active==2?'customized-item-active':''">
                                    <img style="margin-left: 10px" src="../assets/images/content-icon3.png" alt="">
                                    <span class="customized-item-title">Step 3</span><br>
                                    <span style="line-height: 20px;font-size: 12px">完成平台推荐能力<br>相关试题</span>

                                </li>
                                <img class="iconRight iconRightThree" src="../assets/images/iconRight.png"/>
                                <li class="customized-item left" style="margin-right: 0;background:#8d88f1;"
                                    :class="active==3?'customized-item-active':''">
                                    <img style="margin-left: 13px" src="../assets/images/content-icon4.png" alt="">
                                    <span class="customized-item-title">Step 4</span><br>
                                    <span style="line-height: 20px;font-size: 12px">潜移默化中提升<br>学生学习能力</span>
                                </li>
                            </ul>
                        </div>

                    </div>
                    <!-- 中小学生自适应平台 -->
                    <div class="content-platform-wrap"
                         style="top:2680px;position: absolute;width: 1900px;margin-left: -355px">
                        <div class="content-platform-opcity"></div>
                        <div class="content-choice content-body">
                            <p class="title" style="padding-top: 88px">中小学生自适应平台</p>
                            <ul class="platform-list clearfix">
                                <li class="platform-item">
                                    <img src="../assets/images/choice-icon1.png" alt="" width="62" height="50">
                                    <p>现在加入，立即开启<br>全新的学习模式</p>
                                </li>
                                <li class="platform-item">
                                    <img src="../assets/images/choice-icon2.png" alt="" width="62" height="50">
                                    <p>告别传统的题海战术</p>
                                </li>
                                <li class="platform-item">
                                    <img src="../assets/images/choice-icon3.png" alt="" width="62" height="50">
                                    <p>通过完成平台的能力的<br>相关推送</p>
                                </li>
                                <li class="platform-item">
                                    <img src="../assets/images/choice-icon4.png" alt="" width="62" height="50">
                                    <p>在潜移默化中</p>
                                </li>
                                <li class="platform-item" style="margin-right: 0">
                                    <img src="../assets/images/choice-icon5.png" alt="" width="62" height="50">
                                    <p>完成学霸逆袭！</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <footer-buttom></footer-buttom>
    </div>
</template>

<script>
  let Util = null
  import headTop from '../components/common/headTop.vue'
  import footerButtom from '../components/common/footer.vue'

  export default {
    components: {
      headTop,
      footerButtom
    },
    data () {
      return {
        leftPostion: 0,
        leftPostionTV: 0,
        self: this,
        classGrade: '',
        leftNum: 0,
        teacherList: [
          {
            'teacherName': '万老师',
            'head': '/sasteacher/img/1.jpg',
            'grade': 1,   // 1 是小学  2是初中   3是高中  4 是大学    5是研究生导师
            'subject': '数学',
            'Seniority': 9,
            'honor': [
              {'tip': '优秀青年教师，山东省‘优秀辅导教师’，省市教育能手，市学科带头人，市骨干教师。'},
              {'tip': '省市教育能手，市学科带头人，优秀青年教师，山东省‘优秀辅导教师’，市骨干教师。'},
              {'tip': '市学科带头人，相信各位在工作或者业余自己玩技术的时候，市骨干教师,优秀青年教师，山东省‘优秀辅导教师’，省市教育能手。'},
            ]
          },
          {
            'teacherName': '李老师',
            'head': '/sasteacher/img/2.jpg',
            'grade': 4,   // 1 是小学  2是初中   3是高中  4 是大学    5是研究生导师
            'subject': '物理',
            'Seniority': 5,
            'honor': [
              {'tip': '省市教育能手，市学科带头人，优秀青年教师，山东省‘优秀辅导教师’，市骨干教师。'},
              {'tip': '市学科带头人，相信各位在工作或者业余自己玩技术的时候，市骨干教师,优秀青年教师，山东省‘优秀辅导教师’，省市教育能手。'},
              {'tip': '优秀青年教师，山东省‘优秀辅导教师’，省市教育能手，市学科带头人，市骨干教师。'},
            ]
          },
          {
            'teacherName': '许老师',
            'head': '/sasteacher/img/headThree.jpg',
            'grade': 2,   // 1 是小学  2是初中   3是高中  4 是大学    5是研究生导师
            'subject': '英语',
            'Seniority': 7,
            'honor': [
              {'tip': '省市教育能手，相信各位在工作或者业余自己玩技术的时候，市学科带头人，优秀青年教师，山东省‘优秀辅导教师’，市骨干教师。'},
              {'tip': '优秀青年教师，山东省‘优秀辅导教师’，省市教育能手，市学科带头人，市骨干教师。'},
              {'tip': '市学科带头人，市骨干教师,优秀青年教师，山东省‘优秀辅导教师’，省市教育能手。'},
            ]
          },
          {
            'teacherName': '张老师',
            'head': '/sasteacher/img/4.jpg',
            'grade': 4,   // 1 是小学  2是初中   3是高中  4 是大学    5是研究生导师
            'subject': '生物',
            'Seniority': 4,
            'honor': [
              {'tip': '省市教育能手，市学科带头人，优秀青年教师，山东省‘优秀辅导教师’，市骨干教师。'},
              {'tip': '相信各位在工作或者业余自己玩技术的时候，或多或少会去网上找轮子来实现某个需求，那么，一些拥有高度开源精神的技术爱好者和团队就渐渐出现在了技术圈。'},
              {'tip': '市学科带头人，市骨干教师相信各位在工作或者业余自己玩技术的时候,优秀青年教师，山东省‘优秀辅导教师’，省市教育能手。'},
            ]
          },
          {
            'teacherName': '关老师',
            'head': '/sasteacher/img/5.jpg',
            'grade': 1,   // 1 是小学  2是初中   3是高中  4 是大学    5是研究生导师
            'subject': '生物',
            'Seniority': 2,
            'honor': [
              {'tip': '省市教育能手，市学科带头人，优秀青年教师，山东省‘优秀辅导教师’，市骨干教师。会去网上找轮子来实现某个。'},
              {'tip': '相信各位在工作或者业余自己玩技术的时候，或多或少会去网上找轮子来实现某个需求，那么，一些拥有高度开源精神的技术爱好者和团队就渐渐出现在了技术圈。'},
              {'tip': '市学科带头人，市骨干教师相信各位在工作或者业余自己玩技术的时候,优秀青年教师，山东省‘优秀辅导教师’，省市教育能手。'},
            ]
          }
        ],
        length: 5,
        num: 0,
        canClick: true,
        timer: null,
        hoverVal: 0,
        timerOrder: null,
        active: 0,
      }
    },
    created () {
      this.init()
    },
    destroyed () {
      clearInterval(this.timerOrder)
      clearInterval(this.timer)
    },
    methods: {
      init () {
        Util = this.$util
        this.$util._myVue = this
        this.circle(0)
        this.timerOrder = setInterval(() => {
          this.active++
          if (this.active == 4) {
            this.active = 0
          }
        }, 2000)
      },
      circle (value) {
        var val = value
        this.timer = setInterval(() => {
          val++
          if (val >= 4) {
            val = 0
            this.leftPostionTV = 0
            this.hoverVal = 0
            this.setLeftPostionTV(val * -317, true)
            return
          }
          this.setLeftPostionTV(val * -317)
        }, 2000)
      },
      setLeftPostionTV (val, temp) {
        this.hoverVal = val
        if (!temp) {
          clearInterval(this.timer)
        }
        if (val < this.leftPostionTV) {
          this.timer = setInterval(() => {
            this.leftPostionTV = this.leftPostionTV - 31.7
            if (this.leftPostionTV >= 0) {
              this.leftPostionTV = 0
            }
            if (this.leftPostionTV <= val) {
              this.leftPostionTV = val
              clearInterval(this.timer)
              this.circle(this.hoverVal / -317)
            }
          }, 100)

        } else if (val > this.leftPostionTV) {
          this.timer = setInterval(() => {
            this.leftPostionTV = this.leftPostionTV + 31.7
            if (this.leftPostionTV >= 0) {
              this.leftPostionTV = 0
            }
            if (this.leftPostionTV >= val) {
              clearInterval(this.timer)
              this.circle(this.hoverVal / -31.7)
            }
          }, 100)
        }
      },
      clickSmall (type) {
        if (!this.canClick) {
          return
        }
        var timer
        var m = this.leftPostion
        if (type == 'right') {
          if (this.length > 3) {
            console.log(this.length)
            if ((this.length - 3) * 340 + m > 0) {
              timer = setInterval(() => {
                this.leftPostion = this.leftPostion - 34
                console.log(this.leftPostion)
                this.canClick = false
              }, 100)
              setTimeout(() => {
                clearInterval(timer)
                this.canClick = true
              }, 100 * 10)
            }
          }
        } else if (type == 'left') {
          if (m < 0) {
            timer = setInterval(() => {
              this.leftPostion = this.leftPostion + 34
              console.log(this.leftPostion)
              this.canClick = false
            }, 100)
            setTimeout(() => {
              clearInterval(timer)
              this.canClick = true
            }, 100 * 10)
          }
        }
        console.log(this.leftPostion)
      },
      onSwiper (value) {
        if (value == 'right') {
          if (this.length - this.num > 3) {
            this.num++

            this.leftNum = -this.num * 340
          }
        } else {
          if (this.num > 0) {
            this.num--
            this.leftNum = -this.num * 340
          }
        }
        return this.leftNum
      }
    }
  }
</script>

<style lang="scss">
    .header-banner {
        width: 1200px;
        height: 510px;
        margin: 0 auto;
        overflow: hidden;

    }

    .customized-item-active {
        animation: customized-item-active 2s infinite;
    }

    @keyframes customized-item-active {
        from {
            transform: scale(1.4);
            transition: all 1s;
        }
        to {
            transform: scale(1);
            transition: all 1s;
        }
    }

    .iconRight {
        left: 253px;
        top: 72px;
        position: absolute;
    }

    .iconRightTwo {
        left: 540px;
    }

    .iconRightThree {
        left: 825px;
    }

    .head-bigImg {
        width: 100%;
        height: 3380px;
        position: relative;
        background: url('/sasteacher/img/bottom_04.jpg') no-repeat center center;
        .two {
            position: absolute;
            top: 1300px;
            background: #3abfce;
            height: 500px;
            width: 100%;
            z-index: -1
        }
        .three {
            position: absolute;
            background: #ecece4;
            height: 880px;
            width: 100%;
            top: 1800px;
            z-index: -1
        }
        .four {
            position: absolute;
            height: 700px;
            width: 100%;
            top: 2680px;
            z-index: 11;
            background: url(../assets/images/backGroundtu.jpg) 100% 100%;
            background-attachment: fixed;
            background-position: 50%;
            background-repeat: no-repeat;
            background-size: cover;
            color: #ffffff;
        }
        .bannerButtom {
            width: 1200px;
            margin: 0 auto;
            z-index: 1000;
            position: relative;
            overflow: hidden;
        }
        .returnTo {
            position: absolute;
            top: 3234px;
            left: 483px;
            width: 220px;
            height: 52px;
            float: left;
            z-index: 10;
            background: #11a63f;
            border-radius: 5px;
            color: #fff;
            line-height: 52px;
            text-align: center;
            font-size: 20px;
            font-weight: bold;
        }
    }

    .head-bigImg .one {
        position: absolute;
        top: 0;
        background: #eef7f2;
        width: 100%;
        z-index: 1;
        background: url(../assets/images/beijing.jpg);
        background-attachment: fixed;
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: cover;
        height: 460px;
    }

    .header-banner img {
        margin-left: -360px;
    }

    .content-evaluating {
        width: 1190px;
        height: 819px;
        background: #ffffff;
        margin: 0 auto;
    }

    .content .title {
        font-size: 36px;
        font-weight: bold;
        color: #1c2c23;
        height: 200px;
        text-align: center;

        position: relative;
        p {
            padding-top: 100px;
        }
    }

    .titleOfEvaluating {
        padding-top: 100px;
    }

    .content-evaluating-left img {
        float: left;
    }

    .content-evaluating-left {
        .leftImg {
            float: left;
            width: 715px;
            height: 475px;
            position: relative
        }
        .border {
            position: absolute;
            width: 497px;
            height: 317px;
            left: 117px;
            top: 36px;
            div {
                position: relative;
                width: 497px;
                height: 317px;
                overflow: hidden;
            }
            ul {
                position: absolute;
                top: 0;
                width: 417px;
                height: 1268px;
            }
        }
        .innitial {
            width: 20px;
            height: 403px;
            float: left;
            margin-left: 80px;
            margin-top: 7px;
            div {
                width: 20px;
                height: 20px;
                border: 4px solid #ccc;
                border-radius: 50%;
            }
            img {
                float: none;
            }
            .active {
                border: 4px solid #11a63f;
            }
        }
    }

    .content-evaluating-left .dl-list {
        margin-left: 10px;
    }

    .content-evaluating-left .dl-list dt {
        font-size: 24px;
        font-weight: bold;
        color: #11a63f;
        position: relative;
        cursor: pointer;
        width: 135px;
        height: 40px;
    }

    .content-evaluating-left .dl-list dt:hover {
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
        -ms-transform: scale(1.1);
        -o-transform: scale(1.1);
        transform: scale(1.1);
        -webkit-transform-origin: left;
        transform-origin: left;
        -moz-transform-origin: left;
        background-image: url(../assets/images/pen.png);
    }

    .content-evaluating-left .dl-list dd {
        font-size: 16px;
        color: #707070;
        line-height: 30px;
        margin-bottom: 35px;
    }

    .goevaluating {
        display: inline-block;
        width: 220px;
        line-height: 50px;
        background: #11a63f;
        border-radius: 5px;
        font-size: 18px;
        color: white;
        font-weight: bold;
        text-align: center;
    }

    .content-customized {
        background: url(../assets/images/beijing.jpg);
        background-attachment: fixed;
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
        height: 460px;
    }

    .customized-item {
        width: 180px;
        height: 180px;
        border-radius: 50%;
        text-align: center;
        color: #ffffff;
        margin-right: 116px;
        position: relative;
        .el-icon-arrow-right {
            position: absolute;
        }
        .iconRight {
            left: 257px;
            top: 72px;
        }
    }

    /*.customized-item:hover {*/
    /*transform: rotateZ(360deg);*/
    /*-webkit-transform: rotateZ(360deg);*/
    /*-moz-transform: rotateZ(360deg);*/
    /*}*/

    .customized-item img {
        position: absolute;
        top: 24px;
    }

    .customized-item span {
        display: inline-block;
    }

    .customized-item-title {
        margin-top: 85px;
        font-size: 24px;
        font-weight: bold;
        color: white;
    }

    .content-questions-wrap {
        background: #eef7f2;
        padding-bottom: 108px;
    }

    .content-body {
        margin: 0 auto;
        width: 1190px;
        padding-bottom: 150px;
        position: relative;
    }

    .content-questions .content-img {
        position: relative;
    }

    .content-questions .content-img .response {
        position: absolute;
        bottom: 16px;
        left: 483px;
        background: #1dbf38;
    }

    .content-marking-wrap {
        height: 500px;
        width: 100%;
        color: #ffffff;
        z-index: 100;
        background: #42c3d4;
        position: relative;
    }

    .content-marking-body {
        width: 100%;
        height: 100%;
        opacity: .5;
        background: url(../assets/images/marking.png);
        background-attachment: fixed;
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .mark-warp {
        width: 1190px;
        margin: 0 auto;
    }

    .marking-title {
        position: absolute;
        top: 10px;
        padding: 86px 0 55px 0;
    }

    .marking-title .bigtitle {
        font-size: 47px;
        margin-left: 165px;
        font-weight: 900;
    }

    .marking-title img {
        margin-top: 45px;
    }

    .img-wrap {
        position: relative;
    }

    .img-tip {
        font-style: oblique;
        font-size: 24px;
        font-weight: 600;
        position: absolute;
        top: 110px;
        width: 120px;
    }

    .img-tip-left {
        left: 30px;
    }

    .img-tip-right {
        right: 30px;
    }

    .img-tip span {
        font-size: 40px;
        font-weight: 900;
    }

    .marking-title .smalltitle {
        font-size: 17px;
        margin: 9px 0 0 60px;
    }

    .content-choice-opcity {
        width: 100%;
        height: 895px;
        background: #ffffff;
        opacity: .7;
        position: absolute;
    }

    .content-choice-wrap {
        background: url(../assets/images/introduce.png);
        background-size: 100% 100%;
        position: relative;
    }

    .ul-wrap {
        position: relative;

    }

    .ul-hidden {
        width: 1000px;
        height: 540px;
        overflow: hidden;
        margin-left: 80px;
    }

    .teacher-list {
        width: 200000px;
    }

    .ul-wrap #btn-left, #btn-right {
        position: absolute;
        display: block;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        background: #a8a9a9;
        text-align: center;
        line-height: 74px;
        top: 50%;
        font-size: 67px;
        color: #ffffff;
        cursor: pointer;
    }

    #btn-left {
        left: 10px;

    }

    #btn-right {
        right: 10px;
    }

    .teacher-item {
        width: 300px;
        height: 540px;
        position: relative;
        margin: 0 20px;
    }

    .teacher-item-content {
        position: absolute;
        top: 80px;
        width: 300px;
        height: 460px;
        background: #ffffff;
    }

    .teacher-item-content dl {
        margin: 0 30px;
    }

    .teacher-item img {
        position: absolute;
        z-index: 333;
        left: 22%;
        border-radius: 50%;
    }

    .teacher-name {
        margin-top: 100px;
        line-height: 40px;
        font-size: 18px;
        font-weight: 600;
        color: #000000;
        text-align: center;
    }

    .teacher-tip {
        line-height: 40px;
        font-size: 16px;
        font-weight: 900;
        color: #000000;
    }

    .teacher-main {
        font-size: 13px;
        color: #959595;
        margin-bottom: 20px;
    }

    .teacher-main .rongyu {
        color: #11a642;
    }

    .content-btn {
        width: 250px;
        line-height: 50px;
        color: #ffffff;
        text-align: center;
        border-radius: 5px;
        cursor: pointer;
        margin-left: 113px;
        margin-top: 15px;
    }

    .lookmore {
        border: 2px solid #ccc;
        color: #ccc;
        font-size: 17px;
        font-weight: 600;
        margin: 0 auto;
    }

    .content-platform-wrap-border {
        background: url(../assets/images/backGroundtu.jpg) 100% 100%;
        background-attachment: fixed;
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: cover;
        height: 700px;
        width: 100%;
        color: #ffffff;
        position: relative;
    }

    .content-platform-wrap {
        background: url(../assets/images/backGroundtu.jpg) 100% 100%;
        background-attachment: fixed;
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: cover;
        height: 700px;
        width: 100%;
        color: #ffffff;
        position: relative;
    }

    .content-platform-opcity {
        width: 100%;
        height: 700px;

        position: absolute;
    }

    .platform-item {
        float: left;
        margin-bottom: 87px;
        width: 210px;
        margin-right: 35px;
        height: 280px;
        background: #ffffff;
        border-radius: 5px;
        text-align: center;
    }

    .platform-item img {
        margin-top: 70px;
    }

    .platform-item p {
        margin-top: 40px;
        font-size: 18px;
        font-weight: 600;
        color: #000000;
    }

    .goplat {
        background: #1dbf38;
        margin: 0 auto;
    }

    @keyframes myfirst {
        0% {
            background: red;
        }
        25% {
            background: yellow;
        }
        50% {
            background: blue;
        }
        100% {
            background: green;
        }
    }
</style>
