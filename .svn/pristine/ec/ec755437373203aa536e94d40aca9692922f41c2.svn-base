<!--
****--@file     correcting
****--@date     2018/3/19 15:05
****--@author   zyc
****--@describe 批改情况
-->
<template>
    <div class="maincontent">
    <el-row :gutter="20">
        <el-col>
            <div class="content-item"><span>{{$route.query.title}}</span></div>
        </el-col>
    </el-row>
        <div class="taskCenter-index">
        <ul class="clearfix type" style="padding-top: 0">
            <li :class="activeName=='first'? 'active' : ''" @click="activeName='first'">已批改</li>
            <li :class="activeName=='second' ? 'active' : ''" @click="activeName='second'">未批改</li>
            <li :class="activeName=='third' ? 'active' : ''" @click="activeName='third'">未完成</li>

        </ul>
        </div>
          <div style="padding: 0 30px;padding-top: 20px">
            <have-corrected v-if="activeName=='first'" :formValidate='formValidate'></have-corrected>

            <not-corrected v-if="activeName=='second'" :formValidate='formValidate' @setWorkNum="getWorkNum"></not-corrected>

            <correcting-unfinished v-if="activeName=='third'" :formValidate='formValidate' ></correcting-unfinished>
          </div>
    </div>
</template>
<script>
  /*当前组件必要引入*/
  let Util = null
  //已批改
  import haveCorrected from "./correctingHaveCorrected.vue";
  //未批改
  import notCorrected from "./correctingNotCorrected.vue";
  //未完成
  import correctingUnfinished from "./correctingUnfinished.vue";

  export default {
    data () {
      return {activeName: this.$route.query.types, formValidate: {}, num1: '', num2: '', num3: '',numList:{}}
    },
    methods: {
      //初始化请求列表数据
      init () {
        Util = this.$util
        this.formValidate = {
          workId: this.$route.query.id,
          groupsId: this.$route.query.groupsId,
        };
        this.getWorkNum();
      },
      getWorkNum(){
        this.ajax({
          ajaxSuccess: res => {
             this.numList=res.data;
             this.num1='已批改('+this.numList.markedNums+')';
            this.num2='未批改('+this.numList.unmarkedNums+')';
            this.num3='未完成('+this.numList.unfinishedNums+')';

          },
          ajaxParams: {
            url: '/historyWork/getWork',
            method: 'get',
            params: {
              workId: this.$route.query.id,
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
    components: {
      haveCorrected:haveCorrected,
      notCorrected:notCorrected,
      correctingUnfinished:correctingUnfinished,
    }
  }

</script>
<style lang="scss">
    *{
       font-family: 'Microsoft Yahe';
    }
    .maincontent{
        min-height: 700px;


        .content-item{
            padding: 30px;
            font-size: 24px;
        }
        .type {
            padding: 40px 30px 0 30px;
            border-bottom: 2px solid #11a63f;
            margin-top: 1px;
            li {
                width: 295px;
                float: left;
                cursor: pointer;
                background: #f5f5f5;
                margin-bottom: -2px;
                text-align: center;
                line-height: 44px;
            }
            .active {
                background: #11a63f;
                color: #ffffff;
                border-radius: 3px 3px 0 0;
            }
        }
    }

</style>