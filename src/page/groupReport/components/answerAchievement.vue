<!--
****--@file     answerAchievement
****--@date     2018/3/19 16:32
****--@author   zyc
****--@describe 作答成绩
-->
<template>
    <div class="answerAchievement-root">
        <!--<p>评测名称：{{tableData.name}} </p>-->
        <h1>{{tableData.name}}</h1>
        <el-row class="title">
            <span>
                群组人数：{{tableData.groupTotalNum||0}}人
            </span>
            <span style="float: right">
                教师：{{tableData.teacherName}}
            </span>
            <span>
                班级最高分：{{tableData.maxScore||0}}分
            </span>
            <span>
                班级平均分：{{tableData.avgScore||0}}分
            </span>
        </el-row>
        <div id="myTable" ref="myTable" style="margin-top: 70px">
            <el-table
                    :data="tableData.studentList"
                    style="width: 100%">
                <el-table-column
                        prop="name"
                        label="姓名"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="score"
                        label="成绩"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="rank"
                        label="排名"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="usedTime"
                        label="用时"
                        align="center">
                    <template slot-scope="scope">
                        {{(scope.row.usedTime/60||0).toFixed(0)}}分{{(scope.row.usedTime%60||0)}}秒
                    </template>
                </el-table-column>
                <el-table-column
                        prop="correctRate"
                        label="正确率"
                        align="center">
                    <template slot-scope="scope">
                        {{Number(scope.row.correctRate).toFixed(0)}}%
                    </template>
                </el-table-column>
                <el-table-column
                        prop="falseNum"
                        label="错题数"
                        align="center">
                    <template slot-scope="scope">
                        {{scope.row.falseNum}}/{{(scope.row.falseNum || 0) + (scope.row.trueNum || 0)}}
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
  /*当前组件必要引入*/
  import api from '../api'
  //当前组件引入全局的util
  let Util = null
  export default {
    name: 'answerAchievement',
    props:['id'],
    data () {
      return {
        tableData:[]

      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        Util = this.$util

        this.myPages = Util.pageInitPrams
        this.queryQptions = {
          url: api.get.path,
          params: {}
        }
        this.setTableData()
      },
      /*
      * 设置表格数据
      * @param isLoading Boolean 是否加载
      */
      setTableData (isLoading) {
        Object.assign(this.queryQptions.params, {paperId: this.id})
        this.ajax({
          ajaxSuccess: 'listDataSuccess',
          ajaxParams: this.queryQptions
        }, isLoading)
      },
      listDataSuccess (res) {
        this.tableData = res.data
        this.totalCount = res.data.totalCount
      },


    },
    created () {
      this.init()
    },
    mounted () {
    },
    components: {},
  }

</script>
<style lang="scss">
    .answerAchievement-root {
        padding: 20px;
        line-height: 30px;
        h1 {
            line-height: 40px;
            font-size: 18px;
            font-weight: bold;
            color: #11a63f;
            text-align: center;
            border-bottom: 1px solid #D9E0E2;
            margin-top: -20px;

        }
        .title{
            font-size: 12px;
            color:#959595;
            line-height: 30px;
            span{
                padding-right: 20px;
            }

        }
    }
</style>
