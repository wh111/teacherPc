<!--
****--@file     historyEvaluation
****--@date     2018/3/19 15:05
****--@author   zyc
****--@describe 历史测评
-->
<template>
    <div>
        <div id="myTable" ref="myTable" style="min-height: 400px">
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        type="index"
                        label="序号"
                        align="center"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="试卷名称"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="releaseTime"
                        label="测试时间"
                        align="center">
                    <template slot-scope="scope">
                        {{scope.row.releaseTime| formatDate('yyyy-MM-dd HH:mm')}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="person"
                        label="完成人数/总人数"
                        align="center">
                    <template slot-scope="scope">
                        {{scope.row.completionNums}}/{{scope.row.totalNums}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="operation"
                        label="操作"
                        align="center"
                        width="320"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button
                                size="mini" class="whiteButton"
                                @click="handleEdit('paperAnalysis',scope.$index, scope.row)"
                                :disabled="scope.row.endTime>(new Date()).getTime()">试卷分析
                        </el-button>
                        <router-link :to="{path:'/selfCenter/answerAnalysis',query:{id:scope.row.id,name:scope.row.name}}">
                            <el-button class="whiteButton"
                                    size="mini">作答分析
                            </el-button>
                        </router-link>
                        <el-button
                                size="mini" class="whiteButton"
                                @click="handleEdit('answerAchievement',scope.$index, scope.row)"
                                :disabled="scope.row.endTime>(new Date()).getTime()">作答成绩
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
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
        <!--试卷分析-->
        <Modal
                :mask-closable="false"
                width="840"
                v-model="paperAnalysisModal"
                title="试卷分析"
                :loading="loading">
            <modal-header slot="header" :content="paperAnalysis"></modal-header>
            <paper-analysis v-if="paperAnalysisModal" :id='id'></paper-analysis>
            <div slot="footer"></div>
        </Modal>
        <!--作答成绩-->
        <Modal
                :mask-closable="false"
                width="900"
                v-model="answerAchievementModal"
                title="作答成绩"
                class-name="signOn-detail1"
                :loading="loading">
            <modal-header slot="header" :content="answerAchievement"></modal-header>
            <answer-achievement v-if="answerAchievementModal" :id='id'></answer-achievement>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
  /*当前组件必要引入*/
  //试卷分析
  import paperAnalysis from './paperAnalysis.vue'
  //作答成绩
  import answerAchievement from './answerAchievement.vue'
  import api from '../api'
  //当前组件引入全局的util
  let Util = null
  export default {
    name: 'historyEvaluation',
    props: ['types', 'groupId'],
    data () {
      return {
        //试卷分析
        paperAnalysisModal: false,
        paperAnalysis: {
          id: 'paperAnalysisId',
          title: '',
        },
        totalCount: 0,
        //作答成绩
        answerAchievementModal: false,
        answerAchievement: {
          id: 'answerAchievementId',
          title: '',
        },

        routerUrl: {},
        loading: false,
        tableData: [],
        formValidate: {
          name: '',
          releaseTo: ''
        },
        id: '',
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        Util = this.$util
        this.myPages = Util.pageInitPrams
        this.queryQptions = {
          params: {curPage: 1, pageSize: Util.pageInitPrams.pageSize}
        }
        if (this.groupId instanceof Object) {
          this.setTableData()
        }
      },
      /*
        * 设置表格数据
        * @param isLoading Boolean 是否加载
        */
      setTableData (isLoading) {
        if (this.groupId.id) {
          this.formValidate.releaseTo = this.groupId.id
        }

        this.queryQptions.params = Object.assign(this.queryQptions.params, this.formValidate)
        this.ajax({
          ajaxSuccess: 'getHistorySuccess',
          ajaxParams: {
            url: api.queryHistoryList.path,
            method: api.queryHistoryList.method,
            params: this.queryQptions.params,
          },
        }, isLoading)
      },
      /*
        * 设置表格数据
        * @param isLoading Boolean 是否加载
        */
//      setTableData (isLoading) {
//        Object.assign(this.queryQptions.params, {types: this.types})
//        this.ajax({
//          ajaxSuccess: 'listDataSuccess',
//          ajaxParams: this.queryQptions
//        }, isLoading)
//      },
      getHistorySuccess (res) {
        this.tableData = res.data.dataList
        this.totalCount = res.data.totalCount
      },

      /*
           * 处理列表按钮事件
           * 作用:根据不同的参数打开对应的模态
           * @param targer string example:"add"、"edit"
           * */
      handleEdit (modalType, rowIndex, row) {
        this.openModel(modalType)
        this.id = row.id
      },

      /*
            * 监听子组件通讯的方法
            * 作用:根据不同的参数关闭对应的模态
            * @param targer string example:"add"、"edit"
            * */
      cancel (targer) {
        this[targer + 'Modal'] = false
      },

      /*
            * 监听子组件通讯的方法
            * 作用:ajax请求成功回调,该监听方法在libs/util 中的混合模式下定义回调
            * @param targer string example:"add"、"edit"
            * @param targer string 提示返回的ajax回调返回的信息改信息在对应的子组件中定义
            * 例如:errorTitle、errorTitle
            *addMessTitle:{
            *    type:'add',
            *    successTitle:'添加成功!',
            *    errorTitle:'添加失败!',
            *    ajaxSuccess:'ajaxSuccess',
            *    ajaxError:'ajaxError',
            *    ajaxParams:{
            *      url:'/role/add',
            *      method:'post'
            *    }
            *    }
            * @param udata boolean 默认false  是否不需要刷新当前表格数据
            * */
      subCallback (target, title, updata) {
        target && this.cancel(target)
        title && this.successMess(title)
        if (!updata) {
          this.getProductList()
        }
      },

      /*
      * 打开指定的模态窗体
      * @param options string 当前指定的模态:"add"、"edit"
      * */
      openModel (options) {
        this[options + 'Modal'] = true
      },

    },
    created () {
      this.init()
    },
    mounted () {
    },
    components: {
      paperAnalysis: paperAnalysis,
      answerAchievement: answerAchievement,
    },
    watch: {
      'groupId': function () {
        this.init()
      }
    },
  }

</script>
