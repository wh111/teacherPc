<!--
****--@file     paperAnalysis
****--@date     2018/3/19 16:32
****--@author   zyc
****--@describe 试卷分析
-->
<template>
    <div class="paperAnalysis-root">
        <h1>{{dataList.name}}</h1>

        <el-row class="title">
            <span style="float: right">
                测评时间：{{dataList.releaseTime | formatDate('yyyy-MM-dd HH:mm')}}
            </span>
            <span>
                测评人数：{{dataList.groupTotalNum}}
            </span>
            <span>
                答题时长：{{dataList.times / 60}}分钟
            </span>

            <span>
                题目数量：{{dataList.questionNums}}
            </span>
            <span>
                题目难度：{{dataList.diffLevel}}
            </span>
        </el-row>
        <div class="cor-green-title">
            <div class="cor-green"></div>
            <span>试卷结构：</span></div>
        <el-row>
            <ul :style="{width:100/dataList.paperStructure.length+'%'}" style="float: left;text-align: center;" v-for='(item,index) in dataList.paperStructure'
                :key='index'>
                <li >{{item.questionsTypeName}}</li>
                <li>{{item.questionsNum}}</li>
            </ul>
        </el-row>
        <div class="cor-green-title">
            <div class="cor-green"></div>
            <span>  知识点分布：</span></div>
        <el-row>
            <ul style="float: left;text-align: center;" :style="{width:100/dataList.knowledgeAnalysis.length+'%'}"
                v-for='(item,index) in dataList.knowledgeAnalysis'
                :key='index'>
                <li>{{item.knowledgeName}}</li>
                <li>{{item.questionsNum}}</li>
            </ul>
        </el-row>
        <div class="cor-green-title">
            <div class="cor-green"></div>
            <span>     成绩统计：</span></div>
        <el-row style="text-align: center">
            <el-col style="width:20%;">
                <ul>
                    <li>测评人数</li>
                    <li>{{dataList.scoreStatistics.evaluationNum}}</li>
                </ul>
            </el-col>
            <el-col style="width:20%;">
                <ul>
                    <li>实际测评人数</li>
                    <li>{{dataList.scoreStatistics.actualNum}}</li>
                </ul>
            </el-col>
            <el-col style="width:20%;">
                <ul>
                    <li>最高分</li>
                    <li>{{dataList.scoreStatistics.maxScore}}</li>
                </ul>
            </el-col>
            <el-col style="width:20%;">
                <ul>
                    <li>最低分</li>
                    <li>{{dataList.scoreStatistics.minScore}}</li>
                </ul>
            </el-col>
            <el-col style="width:20%;">
                <ul>
                    <li>平均分</li>
                    <li>{{dataList.scoreStatistics.avgScore}}</li>
                </ul>
            </el-col>
        </el-row>
        <div class="cor-green-title">
            <div class="cor-green"></div>
            <span>     成绩分析：</span></div>
        <el-row style="text-align: center">
            <el-col style="width:20%;">
                <ul>
                    <li>优秀</li>
                    <li>{{dataList.scoreAnalysis.excellent}}</li>
                </ul>
            </el-col>
            <el-col style="width:20%;">
                <ul>
                    <li>良好</li>
                    <li>{{dataList.scoreAnalysis.good}}</li>
                </ul>
            </el-col>
            <el-col style="width:20%;">
                <ul>
                    <li>中等</li>
                    <li>{{dataList.scoreAnalysis.medium}}</li>
                </ul>
            </el-col>
            <el-col style="width:20%;">
                <ul>
                    <li>及格</li>
                    <li>{{dataList.scoreAnalysis.pass}}</li>
                </ul>
            </el-col>
            <el-col style="width:20%;">
                <ul>
                    <li>不及格</li>
                    <li>{{dataList.scoreAnalysis.fail}}</li>
                </ul>
            </el-col>
        </el-row>
        <!--<div class="cor-green-title">-->
            <!--<div class="cor-green"></div>-->
            <!--<span>     成绩分析表：</span></div>-->
        <div style="height: 233px;position: relative;top:-38px">
            <div id="passGrade1" :style="{width: '800px', height: '270px'}"></div>
        </div>
    </div>
</template>
<script>
  /*当前组件必要引入*/
  import echarts from 'echarts'
  import api from '../api'
  //当前组件引入全局的util
  let Util = null
  export default {
    name: 'paperAnalysis',
    props: ['id'],
    data () {
      return {
        dataList: {
          scoreAnalysis: {excellent: 0, good: 0, medium: 0, pass: 0, fail: 0},
          scoreStatistics: {evaluationNum: 0, actualNum: 0, maxScore: 0, minScore: 0, avgScore: 0}
        },
        form: {},

      }
    },
    methods: {
      //初始化请求列表数据
      init () {

      },
      ajaxList () {
        this.ajax({
          ajaxSuccess: (res) => {
            this.dataList = res.data
            this.passGrade()
          },
          ajaxParams: {
            url: api.getAnalysis.path,
            method: api.getAnalysis.method,
            params: {
              paperId: this.id
            },
          },
        })
      },
      passGrade () {
        //myProjectprecent-numofquestion

        let aa = echarts.init(document.getElementById('passGrade1'))

        aa.setOption({
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['优秀（90-100分）', '良好（80-89分）', '中等（70-79分）', '及格（60-69分）', '不及格（0-59分）'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '人数',
              type: 'bar',
              barWidth: '60%',
              data: [this.dataList.scoreAnalysis.excellent, this.dataList.scoreAnalysis.good, this.dataList.scoreAnalysis.medium, this.dataList.scoreAnalysis.pass, this.dataList.scoreAnalysis.fail]
            }
          ]
        })
      }

    },
    created () {
      this.init()
    },
    mounted () {
      this.$nextTick(() => {
        this.ajaxList()
      })
      // setTimeout(()=>{this.passGrade()},1000)

    },
    components: {echarts},
  }

</script>
<style lang="scss">
    .paperAnalysis-root {
        line-height: 44px;
        h1 {
            line-height: 40px;
            font-size: 18px;
            font-weight: bold;
            color: #11a63f;
            text-align: center;
            border-bottom: 1px solid #D9E0E2;
            margin-top: -20px;

        }
        .title {
            color:#959595;
            span {
                padding-right: 20px;
            }
        }
        .cor-green {
            background-color: #1cc03b;
            width: 5px;
            height: 17px;
            display: inline-block;
            position: absolute;
            top: 10px;
            margin: 0 5px;
            margin-left: 0;
        }
        .cor-green-title {
            line-height: 40px;
            font-size: 15px;
            position: relative;
            margin-top: 20px;
        }
        ul{
            :first-child{
                background-color: #e6f9ec;
                color: #11a63f;
            }
            :last-child{
                border-bottom: 1px solid #e6ebf5;
            }
        }
    }

</style>