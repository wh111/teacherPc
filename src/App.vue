<template>
    <div id="app">
        <router-view v-if="$store.getters['app/canLoadView']"/>
        <div class="fullLoadBox" v-else>
            <looping-rhombuses-spinner
                    :animation-duration="2500"
                    :rhombus-size="15"
                    color="#1cc03b"
            />
        </div>
    </div>
</template>

<script>
  import { LoopingRhombusesSpinner } from 'epic-spinners'

  export default {
    name: 'app',
    data () {
      return {
        loadFun: null,
        isLogin: false,
      }
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        this.isLogin = this.$util.isLogin(this)
        this.getEnvs()
      },
      getMyInfo () {
        let opt = {
          done: res => {
            setTimeout(() => {
              // this.loadFun.close();
              // this.loadFun = null;
              this.$store.commit('app/setCanLoadView', true)
            }, 100)
          },
          ajaxSuccess: res => this.getUserInfoSuccess(res),
          ajaxParams: {
            url: '/getMyInfo'
          }
        }
        // 全局loading
        // this.loadFun = this.$loading({
        //     lock: true,
        //     text: 'Loading',
        //     spinner: 'el-icon-loading',
        //     background: 'rgba(0, 0, 0, 0)'
        // });
        this.ajax(opt)
//                this.ajax({
//                    ajaxSuccess: res => this.$store.commit('user/updatesignList', res.data),
//                    ajaxParams: {
//                        url: '/sign/list'
//                    }
//                })
      },
      getEnvs () {
        let opt = {
          ajaxSuccess: res => {
            this.$store.commit('app/initEnvs', res.data)
            window.src =''
            if (this.isLogin) {
              // 已经登录
              if (!this.$util.hasUserInfo(this)) {
                // 需要请求用户数据
                this.getMyInfo()
              } else {
                setTimeout(() => {
                  this.$store.commit('app/setCanLoadView', true)
                }, 100)
              }
            } else {
              // 重新登录
             // this.$router.push({name: 'login'})
              setTimeout(() => {
                this.$store.commit('app/setCanLoadView', true)
              }, 100)
            }
          },
          ajaxParams: {
            url: '/envs'
          }
        }
        this.ajax(opt)
      },
      getUserInfoSuccess (res) {
        if (res.data instanceof Object) {
          this.$store.commit('app/setLogin', true)
          this.$store.commit('user/updateInfo', res.data)
        }
      },
    },
    components: {
      LoopingRhombusesSpinner
    }
  }
</script>

<style lang="scss">
    @import "assets/css/common";

    .fullLoadBox {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -33px;
        margin-left: -33px;
    }
</style>
