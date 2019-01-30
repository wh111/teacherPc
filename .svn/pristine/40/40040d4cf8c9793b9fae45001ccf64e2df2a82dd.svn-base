<!--
****--@file     selfMenu
****--@date     2017/12/11 下午3:44
****--@author   jhd
****--@describe   个人中心 左侧菜单栏
-->
<template>
    <div class="selfContent-wrap clearfix self-menu">
        <head-top></head-top>
        <div class="selfContent clearfix">

            <div class="path">
                <span>首页> 个人中心> {{title}}</span>
            </div>
            <div class="left">
                <dl class="main-left" v-model="selfList">
                    <dt class="main-left-introduce">
                        <dl>
                            <dt class="introduce-head"><img :src="imgsrc" :onerror="onerrImg" alt=""></dt>
                            <!--:onerror="onerrImg" -->
                            <dt class="introduce-name">
                                {{getUserName('nickname')}}
                                <img v-if="isVip" width="34" src="../../assets/images/vip.png" alt="">
                            </dt>
                            <dd class="introduce-tip">我的积分：
                                <router-link to="integralList">
                                    {{$store.state.user.userIntegral}}积分
                                </router-link>
                            </dd>
                            <!--<dd class="introduce-tip">我的勋章：</dd>-->
                            <dd class="introduce-tip">
                                <p>余额：{{userInfo.b}}学币
                                    <router-link to="/selfCenter/selfAccount">
                                        <span class="getmoney">充值 ></span>
                                    </router-link>
                                </p>
                            </dd>
                        </dl>
                    </dt>
                    <router-link :to='item.path' v-for="(item,index) in selfList" :key="index">
                        <dd class="main-left-item" :style="{backgroundPositionY:-index*40+12 + 'px'}"
                            @click='selectSort(item)' :class="{'main-left-item-active' : title == item.title }">
                            <!--<img class="main-left-item-icon" src="../../assets/images/ttttttttt1.png" alt="">-->
                            <span>{{item.title}}</span>
                        </dd>
                    </router-link>
                </dl>
            </div>
            <div class="routerViewBox right">
                <router-view></router-view>
            </div>
            <div class="pay-car clearfix">
                <div style="position:relative;">
                    <img src="../../assets/images/ttttttttt4.png" alt="" width="30">
                    <router-link to="/selfCenter/selfShoppingCart">
                        <span class="car"></span>
                    </router-link>
                    <router-link to="/selfCenter/suggestion">
                        <span class="msg" style="top: 45px;"></span>
                    </router-link>
                    <a href="javascript:scroll(0,0)">
                        <span class="top" style="top: 90px;"></span>
                    </a>
                </div>
            </div>
        </div>
        <footer-buttom></footer-buttom>
    </div>

</template>
<script>
  /*当前组件必要引入*/
  let Util = null
  import headTop from './headTop.vue'
  import footerButtom from './footer.vue'

  export default {
    components: {
      headTop,
      footerButtom
    },
    data () {
      return {
        img: '',
        isVip: false,
        title: '个人中心',
        userInfo: {},
        isStudent: false,
        selfList: [
          {'title': '个人中心', 'path': '/selfCenter/selfCenterdetail'},
          {'title': '我的题库', 'path': '/selfCenter/personalQuestion'},
          {'title': '我的群组', 'path': '/selfCenter/selfGroups'},
          {'title': '我的测评', 'path': '/selfCenter/selfTest'},
          {'title': '我的作业', 'path': '/selfCenter/selfHomework'},
          {'title': '我的账户', 'path': '/selfCenter/selfAccount'},
          {'title': '我的订单', 'path': '/selfCenter/selfShopcar'},
          {'title': '成长档案', 'path': '/selfCenter/seeHistory'},
          {'title': '学科助手', 'path': '/selfCenter/subjectAssistant'},
          {'title': '我的答疑', 'path': '/selfCenter/selfAnsweringQuestion'},
          {'title': '个人资料', 'path': '/selfCenter/selfData'}
        ],
        onerrImg: ''
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
        if (this.$store.getters['app/isLogin']) {
          this.userInfo = this.$store.state.user.info
        } else {
          this.$router.push({name: 'login'})
        }
        if (this.$store.getters['user/info']('vipStatus')) {
          this.isVip = true
        } else {
          this.isVip = false
        }
        console.log(this.isVip)
//                Util.getStore('selfMenu') ? this.title = Util.getStore('selfMenu') : this.title = '个人中心'
      },
      selectSort (item) {
        this.title = item.title
        Util.setStore('selfMenu', item.title)
      },

    },
    watch: {
      '$store.state.user.info.name': function () {
        this.userInfo = this.$store.state.user.info
      },
      '$store.state.user.info.nickname': function () {
        this.userInfo = this.$store.state.user.info
      },
      '$store.state.user.info.sex': function () {
        console.log(this.$store.state)
        if (this.$store.state.user.info.sex == 1) {
          this.onerrImg = 'this.src="' + require('../../assets/images/woman.png') + '"'
        } else {
          this.onerrImg = 'this.src="' + require('../../assets/images/man.png') + '"'
        }
      },
    },
    created () {
      this.init();
      console.log(this.$store.state)
      if (this.$route.matched.length > 1) {
        this.title = this.$route.matched[1].meta.name
      }
      //this.imgsrc = this.getStaticPath(this.$store.state.user.info.icon);
      if (this.$store.state.user.info.sex == 1) {
        this.onerrImg = 'this.src="' + require('../../assets/images/woman.png') + '"'
      } else {
        this.onerrImg = 'this.src="' + require('../../assets/images/man.png') + '"'
      }

    },
    mounted () {

    },


  }

</script>
<style>
    @import "../../pages/selfCenter/css/selfMenu.css";

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
        color: #11a63f;
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
        /*background: #fff;*/
        margin-bottom: 20px;
    }
</style>
