<!--
****--@file     teacherMenu
****--@date     2018／03／04
****--@author   jhd
****--@describe   教师个人中心
-->
<template>
    <div class="selfContent-wrap clearfix self-menu">
        <head-top></head-top>
        <div class="selfContent clearfix">

            <div class="path">
                <span>首页> 个人中心> {{title}}</span>
            </div>
            <div class="left">
                <dl class="main-left" v-model="teacherMenu">
                    <dt class="main-left-introduce">
                        <dl>
                            <dt class="introduce-head"><img :src="imgsrc" :onerror="onerrImg" alt=""></dt>
                            <!--:onerror="onerrImg" -->
                            <dt class="introduce-name">
                                {{$store.state.user.info.name || '未实名认证'}}
                                <!--<span v-if="$store.state.user.info.name!=$store.state.user.info.mobile"> {{$store.state.user.info.name}} </span>-->
                                <!--<span style="padding: 5px;font-size: 14px;" v-if="$store.state.user.info.name==$store.state.user.info.mobile">未实名认证</span>-->
                            </dt>
                            <dd class="introduce-tip">资格种类：
                                {{$store.state.user.info.types | types}}
                            </dd>
                            <dd class="introduce-tip">我的积分：
                                <router-link to="integralList">
                                    {{$store.state.user.userIntegral}}积分
                                </router-link>
                            </dd>
                            <!--<dd class="introduce-tip">我的勋章：</dd>-->
                            <!--<dd class="introduce-tip">-->
                            <!--<p>余额：{{userInfo.b}}学币-->
                            <!--<router-link to="/selfCenter/selfAccount">-->
                            <!--<span class="getmoney">充值 ></span>-->
                            <!--</router-link>-->
                            <!--</p>-->
                            <!--</dd>-->
                        </dl>
                    </dt>

                    <dd class="main-left-item" v-for="(item,index) in teacherMenu" :key="index"
                        :style="{backgroundPositionY:-index*40+12 + 'px'}"
                        @click='selectSort(item)' :class="{'main-left-item-active' : title == item.title }">
                        <!--<img class="main-left-item-icon" src="../../assets/images/ttttttttt1.png" alt="">-->
                        <span>{{item.title}}</span>
                    </dd>

                </dl>
            </div>
            <div class="routerViewBox right">
                <router-view></router-view>
            </div>
            <!--<div class="pay-car clearfix">-->
            <!--<div style="position:relative;">-->
            <!--<img src="../../assets/images/ttttttttt4.png" alt="" width="30">-->
            <!--<router-link to="/selfCenter/selfShoppingCart">-->
            <!--<span class="car"></span>-->
            <!--</router-link>-->
            <!--<router-link to="/selfCenter/suggestion">-->
            <!--<span class="msg" style="top: 45px;"></span>-->
            <!--</router-link>-->
            <!--<a href="javascript:scroll(0,0)">-->
            <!--<span class="top" style="top: 90px;"></span>-->
            <!--</a>-->
            <!--</div>-->
            <!--</div>-->
        </div>
        <footer-buttom></footer-buttom>
        <Modal
                :mask-closable="false"
                width="360"
                title="提示实名"
                v-model="access"
                class-name="selectBook-con sureChange" :loading="loading">
            <modal-header slot="header" :content="waitAceesss"></modal-header>

            <wait-access v-if="access"></wait-access>
            <div slot="footer"></div>
        </Modal>
    </div>

</template>
<script>
  /*当前组件必要引入*/
  let Util = null
  import headTop from './headTop.vue'
  import footerButtom from './footer.vue'
  import waitAccess from './waitAccess.vue'

  export default {
    components: {
      headTop,
      footerButtom,
      waitAccess
    },
    data () {
      return {
        loading: false,
        img: '',
        isVip: false,
        title: '个人中心',
        access: false,//提示
        userInfo: {},
        isStudent: false,
        waitAceesss: {
          id: 'waitAceesssId',
          title: '',
        },
        teacherMenu: [
          {'title': '个人中心', 'path': '/selfCenter/selfCenterdetail'},
          {'title': '班组管理', 'path': '/selfCenter/groupManage'},
          {'title': '班级报告', 'path': '/selfCenter/groupReport'},
          {'title': '题库', 'path': '/selfCenter/questionBank'},
          {'title': '疑难问题', 'path': '/selfCenter/Troubleshooting'},
          {'title': '任务中心', 'path': '/selfCenter/taskCenter'},
          {'title': '个人资料', 'path': '/selfCenter/userInfo'},
          {'title': '意见反馈', 'path': '/selfCenter/Feedback'}
        ],
        onerrImg: '',
        name: '',
      }
    },
    computed: {
      imgsrc () {
        return this.getStaticPath(this.$store.state.user.info.icon)
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        Util = this.$util

        if (this.$store.state.user.info.name == this.$store.state.user.info.mobile) {
          this.$store.state.user.info.name = ''
        }
      },
      selectSort (item) {
        if (item.path == '/selfCenter/groupManage' || item.path == '/selfCenter/groupReport' || item.path == '/selfCenter/Troubleshooting') {
          if (this.$store.state.user.info.realStatus == 1) {
            this.access = true
            return false
          }

        }
        this.title = item.title
        this.$store.commit('user/changeCliclMeny', 3)
        Util.setStore('selfMenu', item.title)
        this.$router.push({
          path: item.path
        })
      },

    },
    watch: {
      '$store.state.user.clickMenu': function (val) {
        console.log(val)
        if (val == 2) {
          this.title = '班级报告'
        }
      },
      '$route': function (val) {

        if (val.path == '/selfCenter/selfCenterdetail') {
          this.title = '首页'
        }
      },
      '$store.state.user.info.sex': function () {
        console.log(this.$store.state)
        if (this.$store.state.user.info.sex == 1) {
          this.onerrImg = 'this.src="' + require('../../assets/images/woman.png') + '"'
        } else {
          this.onerrImg = 'this.src="' + require('../../assets/images/man.png') + '"'
        }
      },
//            '$store.state.user.info.nickname': function() {
//
//                this.userInfo = this.$store.state.user.info;
//            }

    },
    created () {
      this.init()
      if (this.$route.matched.length > 1) {
        this.title = this.$route.matched[1].meta.name
      }
      this.imgsrc = this.getStaticPath(this.$store.state.user.info.icon)
      if (this.$store.state.user.info.sex == 1) {
        this.onerrImg = 'this.src="' + require('../../assets/images/woman.png') + '"'
      } else {
        this.onerrImg = 'this.src="' + require('../../assets/images/man.png') + '"'
      }

    },
    mounted () {

    }
  }

</script>
<style>
    /*@import "../../pages/selfCenter/css/selfMenu.css";*/
    @import "../../assets/css/teachMenu.css";

    .main-left-item {
        padding-left: 50px;
        color: #a0a0a0;
        background-image: url("../../assets/images/ttttttttt1.png");
        background-repeat: no-repeat;
        background-origin: padding-box;
        background-clip: padding-box;
        background-position-x: 30px;
    }

    .main-left-item-active {
        background-image: url("../../assets/images/ttttttttt2.png");
    }

    .main-left-item-active span {
        color: #1cc03b;
    }

    .pay-car {
        position: fixed;
        background: #ffffff;
        padding: 4px;
        width: 40px;
        height: 145px;
        right: 68px;
        border-radius: 2px;
        top: 192px;
    }

    .pay-car div img {
        position: absolute;
        width: 30px;
        height: 125px;
    }

    .pay-car div span {
        position: absolute;
        width: 30px;
        height: 40px;
        cursor: pointer;
    }

    .routerViewBox {
        width: 950px;
        min-height: 638px;
        background: #fff;
        border-radius: 5px;
        margin-bottom: 20px;
        border-radius: 5px;
    }
</style>
