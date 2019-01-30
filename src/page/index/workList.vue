<!--
****--@file     workList
****--@date     2018/3/19 14:28
****--@author   ${王恒}
****--@describe   作业列表
-->
<template>
    <div class="myNewWorkList">
        <p v-if="tableList.length==0" style="color: #ff9f00;">暂无作业</p>
        <div class="list-content" v-for='item in tableList' :key='item.id'>
            <!--<el-row class="list-content_first">-->
                <!--<el-col :span="5">{{item.title}}</el-col>-->
                <!--<el-col :span="10">{{item.totalQuestions}}道题</el-col>-->
                <!--<el-col :span="7" class="issuer">发布至：{{item.groupsTitle}}</el-col>-->
            <!--</el-row>-->
            <!--<el-row class="list-content_two">-->
                <!--<el-col :span="8" id="start_time"><span>布置时间</span>：{{item.startTime | formatDate('yyyy-MM-dd HH:mm')}}-->
                <!--</el-col>-->
                <!--<el-col :span="9" id="stop_time"><span>上交时间</span>：{{item.submitTime | formatDate('yyyy-MM-dd HH:mm')}}-->
                <!--</el-col>-->
                <!--<el-col :span="2" style="text-align:center" class="correct">-->
                    <!--<div class="in-center-text">{{item.markedNums}}</div>-->
                    <!--<router-link :to="{path:'/selfCenter/showCorrecting',query:{id:item.id,groupsId:item}}">-->
                        <!--<div class="in-center-text">已批改</div>-->
                    <!--</router-link>-->
                <!--</el-col>-->
                <!--<el-col :span="2" style="text-align:center" class="no_correct">-->
                    <!--<div class="in-center-text">{{item.unmarkedNums}}</div>-->
                    <!--<router-link :to="{path:'/selfCenter/showCorrecting',query:{id:item.id,groupsId:item}}">-->
                        <!--<div class="in-center-text">未批改</div>-->
                    <!--</router-link>-->
                <!--</el-col>-->
                <!--<el-col :span="2" style="text-align:center" class="over">-->
                    <!--<div class="in-center-text">{{item.finishedNums}}</div>-->
                    <!--<router-link :to="{path:'/selfCenter/showCorrecting',query:{id:item.id,groupsId:item}}">-->
                        <!--<div class="in-center-text">已完成</div>-->
                    <!--</router-link>-->
                <!--</el-col>-->
            <!--</el-row>-->
            <div class="list-content_first">
                <div>
                    <span class="issuer">发布至：{{item.groupsName}}</span>
                </div>
                <div>
                    <span>布置时间</span>：{{item.startTime | formatDate('yyyy-MM-dd HH:mm')}}
                    <span class="overtime">上交时间</span>：{{item.submitTime | formatDate('yyyy-MM-dd HH:mm')}}
                </div>
            </div>

            <div class="list-content_two">
                <div>
                    <div class="homework">
                        {{item.title}}
                    </div>
                    <div class="topic">
                        共{{item.totalQuestions}}道题
                    </div>
                </div>
                <div>
                    <div class="correct">
                        <router-link target="_blank"
                                :to="{path:'/selfCenter/showCorrecting',query:{id:item.id,groupsId:item.groupsId,types:'first',title:item.title  }}">
                        <div class="in-center-text-top" id="markedNums" @click="changeMenu">{{item.markedNums}}</div>

                            <div class="in-center-text">已批改</div>
                        </router-link>
                    </div>
                    <div class="no_correct">
                        <router-link  target="_blank"
                                :to="{path:'/selfCenter/showCorrecting',query:{id:item.id,groupsId:item.groupsId,types:'second',title:item.title  }}">
                        <div class="in-center-text-top" id="unmarkedNums" @click="changeMenu">{{item.unmarkedNums}}</div>

                            <div class="in-center-text">未批改</div>
                        </router-link>
                    </div>
                    <div class="over">
                        <router-link  target="_blank"
                                :to="{path:'/selfCenter/showCorrecting',query:{id:item.id,groupsId:item.groupsId,types:'third',title:item.title }}">
                        <div class="in-center-text-top" id="unfinishedNums" @click="changeMenu">{{item.unfinishedNums}}</div>
                            <div class="in-center-text">未完成</div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  /*当前组件必要引入*/
  let Util = null
  import api from './api'
  export default {
    data () {
      return {
        routerUrl: {
          'showCorrecting': '/selfCenter/showCorrecting'
        },
        tableList: [],
        groupId:''
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        Util = this.$util
        this.getNewWork()
      },
      //获取最新作业
      getNewWork (isLoading) {
        this.ajax({
          ajaxSuccess: (res) => {this.tableList = res.data.dataList },
          ajaxParams: {
            url: api.work.path,
            params: {
              curPage: 1,
              pageSize: 5,
            },
          }
        }, isLoading)
      },
      changeMenu(){
        this.$store.commit('user/changeCliclMeny',2)
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
<style lang="scss">
    .myNewWorkList {
        .in-center-text{
            font-size: 12px;
        }
        .in-center-text-top{
            font-size: 20px !important;
            font-weight: bold;
        }
        .list-content {
            border: 1px solid #E5E5E5;
            margin-bottom: 35px;
            .list-content_first {
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 15px 20px;
                background: #EFEFEF;
                font-size: 12px;
                .issuer {
                    width: 165px;
                }
                .issuer:nth-of-type(1) {
                    margin-right: 20px;
                }
                .issuer:nth-of-type(2) {
                    margin-left: 20px;
                }
                .overtime {
                    margin-left: 10px;
                }
                .start_time {
                    width: 190px;
                    font-size: 10px;
                    color: #B0B0B0;
                    margin-right: 0;
                }
                > div:nth-of-type(2) {
                    color: #a0a0a0
                }
            }
            .list-content_two {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 80px;
                padding: 0;
                > div:nth-of-type(1) {
                    padding: 20px;
                    .homework {
                        color: #434343;
                        font-size: 14px;
                        margin-bottom: 6px;
                        max-width: 575px;
                        overflow: hidden;
                    }
                    .topic {
                        font-size: 12px;
                        color: #d1d1d1;
                    }
                }
                > div:nth-of-type(2) {
                    border-left: 1px solid #E5E5E5;
                    display: flex;
                    padding: 16px 40px;
                    .correct, .no_correct, .over {
                        text-align: center;
                        margin-right: 40px;
                        > div {
                            text-align: center;
                            font-size: 16px;
                        }
                        > a > div {
                            font-size: 12px;
                        }
                    }
                    .correct {
                        > div {
                            color: #5F5F5F;
                        }
                        > a > div {
                            color: #5F5F5F;
                        }
                    }
                    .no_correct {
                        > div {
                            color: #FD7415;
                        }
                        > a > div {
                            color: #FD7415;
                        }
                    }
                    .over {
                        margin-right: 0;
                        > div {
                            color: #FF9F00;
                        }
                        > a > div {
                            color: #FF9F00;
                        }
                    }
                }

            }
        }
    }
</style>