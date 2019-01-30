<!--
****--@file     index
****--@date     2018/3/15 上午11:11
****--@author   jhd
****--@describe   教师个人中心首页
-->
<template>
    <div class="selfCenterindex-root">
        <div class="friendActive" style="margin-top: 0">
            <h1 class="cor-green-title">
                <span>班组动态</span></h1>
            <p v-if="queryNews.length==0" style="color: #ff9f00;">暂无动态</p>
            <div id="friendActive-min">
                <ul :style="{'top':friendActiveTop+'px'}">
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
        <div class="friendActive myPicture">
            <h1 class="cor-green-title">
                <span>我的图谱</span></h1>
            <div style="height: 300px" id="showknowledge">
                <p style="text-align: center;line-height: 300px;">图谱加载中</p>
            </div>
        </div>
        <div class="friendActive myNewwork">
            <h1 class="cor-green-title">
                <span>最新作业</span></h1>
            <work-list></work-list>
            <div style="clear:both;"></div>
        </div>
        <div style="clear: both"></div>
    </div>
</template>
<script>
  import workList from './workList.vue'
  import api from './api'
  var Echarts = require('echarts');
  import $ from 'jquery'
  /*当前组件必要引入*/
  let Util = null
  export default {
    data () {
      return {
        mark: 0,
        queryNews: [],
        friendActiveTop:null,
        setTimeOut:null,
        myChart: null,
        option: {}
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        Util = this.$util
        //this.myPages = Util.pageInitPrams;
        this.queryQptions = {
          url: api.query.path,
          params: {
            curPage: 1,
            pageSize: Util.pageInitPrams.pageSize,
          },
        }

        this.setTableData()
        this.getShowData()
      },
      getShowData() {
        console.log( this.$store.state.user.info)
        let opt = {
          ajaxSuccess: res => {
            if (res.data instanceof Array) {
              this.getShowDataSuccess(res.data)
            }
          },
          ajaxError: () => this.errorMess('获取数据失败，请重试'),
          ajaxParams: {
            url: api.infoImg.path,
            method: api.infoImg.method,
            params: {
              textbookVersionId: this.$store.state.user.info.textbookVersionList[0].textbookVersionId,
              subject:this.$store.state.user.info.subject
            }
          }
        };
        this.ajax(opt)
      },
      getShowDataSuccess(arr) {
        let temp = {}; // 知识点去重
        let data = []; // 所有知识点
        let edges = []; // 对应关系下标数组
        let index = {}; // 每个知识点的下标
        let start = 0; // 下标从0开始

        arr.map(item => {
          if (!temp[item.id]) {
            temp[item.id] = {
              name: item.name,
              id: item.id,
              label: {
                normal: {
                  show: true
                }
              }
            }
          }
        })

        for (let key in temp) {
          if (data.length) {
            data.push(temp[key])
          } else {
            data.push({
              fixed: true,
              name: temp[key].name,
              label: {
                normal: {
                  show: true
                }
              },
              x: 500,
              y: 300,
              symbolSize: 10,
              id: temp[key].id
            })
          }
          // 记录下标
          index[key] = start;
          start++
        }

        arr.map(item => {
          edges.push({
            // 根据id获取关系索引
            source: index[item.id],
            target: index[item.beforeId]
          })
        })

        let opt = {
          series: [{
            type: 'graph',
            layout: 'force',
            animation: true,
            roam: true,
            hoverAnimation: true,
            draggable: true,
            focusNodeAdjacency: true,
            data,
            force: {
              repulsion: 100,
              edgeLength: 5
            },
            edges
          }]
        };
        this.$nextTick(() => {
          this.myChart.setOption(opt);
        })
      },
      /*
     * 设置表格数据
     * @param isLoading Boolean 是否加载
     */
      setTableData (isLoading) {
        this.ajax({
          ajaxSuccess: 'listDataSuccess',
          ajaxParams: this.queryQptions
        }, isLoading)
      },
      listDataSuccess (res) {
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
          this.setTimeOut = setTimeout(() => {this.setTableData()}, (this.queryNews.length - 5) * 2000)

        } else {
          this.queryNews = res.data.dataList
          this.setTimeOut = setTimeout(() => {this.setTableData()}, 60 * 1000)
        }

      },
    },
    created () {
      this.init()
    },
    mounted () {
      this.myChart = Echarts.init(document.getElementById('showknowledge'));
    },
    destroyed () {
      clearInterval(this.timer)
      clearTimeout(this.setTimeOut)
    },
    components: {workList}
  }

</script>
<style lang="scss">
    .friendActive {
        padding: 20px;

    }

    .cor-green-title {
        line-height: 40px;
        font-size: 20px;
        position: relative;
        font-weight: bold;
    }

    .cor-green {
        background-color: #1cc03b;
        width: 3px;
        height: 20px;
        display: inline-block;
        position: absolute;
        top: 10px;
        margin: 0 5px;
        margin-left: 0;

    }

    .selfCenterindex-root {
        background: #eeeeee;
        #friendActive-min{
            position: relative;
            height: 160px;
            overflow: hidden;

        }
        .friendActive {
            border-radius: 5px;
            background: #fff;
            padding-left: 30px;
            margin-top: 30px;
            min-height: 250px;
            float: left;
            text-align: left;
            width: 100%;
            ul {
                width: 100%;
                position: absolute;
                li {
                    font-size: 14px;
                    line-height: 32px;
                    color: #434343;

                    div {
                        width: 6px;
                        float: left;
                        height: 6px;
                        margin-top: 12px;
                        border-radius: 100%;
                        margin-right: 3px;
                    }
                    .pray{
                        background: #A0A0A0;
                    }
                    .green{
                        background: #11a640;
                    }
                    .yellow{
                        background: #FD7416;
                    }
                    .yellowFont{
                        color:#FD7416;
                    }

                    .name {
                        font-weight: bold;
                    }
                    .project {
                        color: #fd7416;
                    }
                }
            }
        }
    }
</style>