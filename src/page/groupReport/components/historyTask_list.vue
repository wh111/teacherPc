<!--
****--@file     historyTask_list
****--@date     2018/3/19 13:47
****--@author   zyc
****--@describe 历史作业
-->
<template>
    <div>
        <div class="historyTask_list">

            <div class="imgerr" style="text-align: center" v-if="JSON.stringify(datalist)=='{}'">
                暂无数据
            </div>
            <div class="list-box-content" v-for="(item,index) in datalist" :key='item.index'>
                <div class="list-content-title">
                    {{item[0].num}}月
                </div>
                <div class="list-content" v-for='(item1,index1) in item' :key='item1.index1'>
                    <!--<el-row>-->
                    <!--<el-col :span="6">{{item1.title}}</el-col>-->
                    <!--<el-col :span="4">{{item1.totalQuestions}}道题</el-col>-->
                    <!--<el-col :span="6">发布至：{{groupId.title}}</el-col>-->
                    <!--</el-row>-->
                    <!--<el-row>-->
                    <!--<el-col :offset="15" :span="3">-->
                    <!--<div class="in-center-text">{{item1.markedNums}}</div>-->
                    <!--</el-col>-->
                    <!--<el-col :span="3">-->
                    <!--<div class="in-center-text">{{item1.unmarkedNums}}</div>-->
                    <!--</el-col>-->
                    <!--<el-col :span="3">-->
                    <!--<div class="in-center-text">{{item1.unfinishedNums}}</div>-->
                    <!--</el-col>-->
                    <!--</el-row>-->
                    <!--<el-row>-->
                    <!--<el-col :span="8">布置时间：{{item1.startTime | formatDate('yyyy-MM-dd HH:mm')}}</el-col>-->
                    <!--<el-col :span="7">上交时间：{{item1.submitTime|formatDate('yyyy-MM-dd HH:mm') }}</el-col>-->
                    <!--<el-col :span="3">-->
                    <!--<router-link :to="{path:'/selfCenter/showCorrecting',query:{id:item1.id,groupsId:groupId }}">-->
                    <!--<div class="in-center-text">已批改</div>-->
                    <!--</router-link>-->
                    <!--</el-col>-->
                    <!--<el-col :span="3">-->
                    <!--<router-link :to="{path:'/selfCenter/showCorrecting',query:{id:item1.id,groupsId:groupId }}">-->
                    <!--<div class="in-center-text">未批改</div>-->
                    <!--</router-link>-->
                    <!--</el-col>-->
                    <!--<el-col :span="3">-->
                    <!--<router-link :to="{path:'/selfCenter/showCorrecting',query:{id:item1.id,groupsId:groupId }}">-->
                    <!--<div class="in-center-text">未完成</div>-->
                    <!--</router-link>-->
                    <!--</el-col>-->
                    <!--</el-row>-->
                    <div class="list-content_first">
                        <div>
                            <span class="issuer">发布至：{{item1.groupsName}}</span>
                        </div>
                        <div>
                            <span>布置时间</span>：{{item1.startTime | formatDate('yyyy-MM-dd HH:mm')}}
                            <span class="overtime">上交时间</span>：{{item1.submitTime | formatDate('yyyy-MM-dd HH:mm')}}
                        </div>
                    </div>

                    <div class="list-content_two">
                        <div>
                            <div class="homework">
                                {{item1.title}}
                            </div>
                            <div class="topic">
                                共{{item1.totalQuestions}}道题
                            </div>
                        </div>
                        <div>
                            <div class="correct">

                                <router-link
                                        :to="{path:'/selfCenter/showCorrecting',query:{id:item1.id,groupsId:groupId.id,title:groupId.title,types:'first' }}">
                                    <div class="in-center-text-top" id="markedNums">{{item1.markedNums}}</div>
                                    <div class="in-center-text">已批改</div>
                                </router-link>
                            </div>
                            <div class="no_correct">

                                <router-link
                                        :to="{path:'/selfCenter/showCorrecting',query:{id:item1.id,groupsId:groupId.id,title:groupId.title,types:'second' }}">
                                    <div class="in-center-text-top" id="unmarkedNums">{{item1.unmarkedNums}}</div>
                                    <div class="in-center-text">未批改</div>
                                </router-link>
                            </div>
                            <div class="over">

                                <router-link
                                        :to="{path:'/selfCenter/showCorrecting',query:{id:item1.id,groupsId:groupId.id,title:groupId.title,types:'third' }}">
                                    <div class="in-center-text-top" id="unfinishedNums">{{item1.unfinishedNums}}</div>
                                    <div class="in-center-text">未完成</div>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style="clear: both"></div>

            <div style="clear: both"></div>
        </div>
        <div class="pagination" style="width: 920px">
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
</template>
<script>
  /*当前组件必要引入*/

  //当前组件引入全局的util
  let Util = null
  import api from '../api'

  export default {
    props: ['types', 'groupId'],
    name: 'historyTask',
    data () {
      return {
        routerUrl: {
          'showCorrecting': '/selfCenter/showCorrecting'
        },
        totalCount: 0,
        formValidate: {
          name: '',
          groupsId: ''
        },
        datalist: {},
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        Util = this.$util
        this.myPages = Util.pageInitPrams
        this.queryQptions = {
          params: {
            curPage: 1,
            pageSize: 10,
          },
        }
        if (this.groupId instanceof Object) {
          this.setTableData()
        }
      },
      setTableData (isLoading) {
        if (this.groupId.id) {
          this.formValidate.groupsId = this.groupId.id
        }
        this.queryQptions.params = Object.assign(this.queryQptions.params, this.formValidate)
        this.ajax({
          ajaxSuccess: 'getHistorySuccess',
          ajaxParams: {
            url: api.historyWorkList.path,
            method: api.historyWorkList.method,
            params: this.queryQptions.params,
          },
        }, isLoading)
      },
      getHistorySuccess (res) {
        this.totalCount = res.data.totalCount
        if (res.data) {

//          this.conductDate()
          res.data.dataList.reduce((obj, item, index) => {
            let month = this.conductDate(item.startTime, 'MM')
            item.num = month
            return obj

          }, {})
        }
        let datalist = {}
        res.data.dataList.map(item => {
          if (datalist[item.num]) {
            datalist[item.num].push(item)
          } else {
            datalist[item.num] = [item]
          }
        })
        this.datalist = datalist
      },

    },
    created () {
      this.init()
    },
    mounted () {
    },
    watch: {
      'groupId': function () {
        this.init()
      }
    },
    components: {},
  }

</script>
<style lang="scss">
    .historyTask_list {
        min-height: 350px;
        .imgerr {
            font-size: 12px;
            height: 400px;
        }
        .in-center-text-top {
            font-size: 20px !important;
            font-weight: bold;
        }
        .side-bar {
            position: absolute;
            top: 0;
            width: 0;
            height: 100%;
            background-color: #eaeaea;
            border: 1px solid #eaeaea;
            border-top: 0;
            border-bottom: 0;
            left: 9px;
            z-index: 1;
        }
        .circle_top, .circle_bot {
            position: absolute;
            top: 0;
            left: 3px;
            z-index: 2;
            width: 0;
            background-color: #ffffff;
            width: 15px;
            height: 15px;
            margin: 0px 0 0 0px;
            border-radius: 50%;
            border: 2px solid #eaeaea;
        }
        .circle_bot {
            top: inherit;
            bottom: 0;
        }

        .list-box {
            position: relative;
            z-index: 2;
            padding: 15px 0;
        }

        .list-box-content {

            padding: 10px 5px;
            margin-left: 5px;
            .list-content-title {
                color: #979797;
                font-size: 14px;
                font-weight: bold;
                line-height: 20px;
                margin-bottom: 2px;
            }
            #markedNums, #unmarkedNums, #unfinishedNums {
                margin-left: 1px;
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
        .in-center-text {
            text-align: center;
        }
    }
</style>
