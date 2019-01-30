<!--
****--@file     correctingHaveCorrected
****--@date     2018/3/19 18:03
****--@author   zyc
****--@describe 已批改
-->
<template>
    <div>
        <div id="myTable" ref="myTable">
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="studentName"
                        label="姓名"
                        align="center">
                </el-table-column>
                <el-table-column
                        width="170"
                        prop="endTime"
                        label="完成时间"
                        align="center">
                    <template slot-scope="scope">
                        {{scope.row.endTime| formatDate('yyyy-MM-dd HH:mm:ss')}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="userTime"
                        label="用时"
                        align="center">
                    <template slot-scope="scope">
                        {{(scope.row.usedTime/60||0).toFixed(0)}}分{{(scope.row.usedTime%60||0)}}秒
                    </template>
                </el-table-column>
                <el-table-column
                        prop="totalScore"
                        label="分数"
                        align="center">
                    <template slot-scope="scope">
                        {{scope.row.totalScore||scope.row.score||0}}分
                    </template>
                </el-table-column>
                <template v-if="id">
                <el-table-column
                        prop="score"
                        label="状态"
                        align="center">
                    <template slot-scope="scope">
                        <span  v-if=" scope.row.isCorrecting==1&&scope.row.answerStatus==1">已批改</span>
                        <span v-if=" scope.row.isCorrecting==0&&scope.row.answerStatus==1">未批改</span>
                        <span v-if="scope.row.answerStatus==0&&!scope.row.isMarked">未提交</span>
                    </template>
                </el-table-column>
                </template>
                <el-table-column
                        prop="operation"
                        label="操作"
                        align="center"
                        width="320"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button class="whiteButton"  v-if=" scope.row.isMarked==1"
                                size="mini"
                                @click="handleEdit('showHaveCorrected',scope.$index, scope.row)">查看详情</el-button>
                        <el-button class="whiteButton"  v-if=" scope.row.isCorrecting==1&&scope.row.answerStatus==1"
                                    size="mini"
                                    @click="handleEdit('showHaveCorrected',scope.$index, scope.row)">查看详情</el-button>
                        <el-button class="whiteButton"  v-if=" scope.row.isCorrecting==0&&scope.row.answerStatus==1"
                                    size="mini"
                                    @click="handleEdit('startCorrected',scope.$index, scope.row)">开始批改</el-button>
                        <el-button class="whiteButton"  v-if="scope.row.answerStatus==0&&!scope.row.isMarked"
                                    size="mini"
                                    @click="hasSubmit(scope.row)">催交</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--查看详情-->
        <Modal  style="background:#ebf3f0"
                :mask-closable="false"
                width="900"
                v-model="showHaveCorrectedModal"
                title="查看详情"
                class-name="signOn-detail"
                :loading="loading">
            <modal-header slot="header" :content="showHaveCorrected"></modal-header>
            <!--查看作业-->
            <show v-if="showHaveCorrectedModal&&formValidate"  :formValidate="formValidate" :studentId="studentId"></show>
            <!--查看测评-->
            <show-test v-if="showHaveCorrectedModal&&id" :id="id" :studentId="studentId" ></show-test>
            <div slot="footer"></div>
        </Modal>
        <!--开始批改-->
        <Modal
                :mask-closable="false"
                width="900"
                v-model="startCorrectedModal"
                title="开始批改"
                class-name="signOn-detail"
                :loading="loading">
            <modal-header  style="background:#ebf3f0" slot="header" :content="startCorrected"></modal-header>
            <start-corrected-test v-if="startCorrectedModal" @reResquest="reResquest" :id="id" :studentId="studentId"></start-corrected-test>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
  /*当前组件必要引入*/
  import show from "./showHaveCorrected.vue";
  import startCorrectedTest from './startCorrectedTest.vue';
  import showTest from './showHaveCorrectedTest.vue'
  import api from '../api'
  //当前组件引入全局的util
  let Util = null
  export default {
    name: 'correctingHaveCorrected',
    props: ['formValidate','id'],
    data () {
      return {
        studentId:'',
        //查看详情
        showHaveCorrectedModal: false,
        showHaveCorrected: {
          id: 'showHaveCorrectedId',
          title: '',
        },
        startCorrectedModal: false,
        startCorrected: {
          id: 'startCorrectedId',
          title: '',
        },
        loading: false,
        tableData: [],
        idItem:'',
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        Util = this.$util;
        this.myPages = Util.pageInitPrams;

        if(this.formValidate){//作业
          this.queryQptions = {
            url: api.queryMarkList.path,
            params: {}
          };
          this.setTableData()
        }
        if(this.id){//试卷作答分析列表
          this.queryQptions = {
            url: api.list.path,
            params: {}
          };
          this.getAnswerAnalysisList();
        }

      },
      reResquest(){
        this.startCorrectedModal=false;
        this.getAnswerAnalysisList();
      },
      /*
        * 设置表格数据
        * @param isLoading Boolean 是否加载
        */
      setTableData(isLoading) {
        Object.assign(this.queryQptions.params, this.formValidate,{isMarked:'1'})
        this.ajax({
          ajaxSuccess: 'listDataSuccess',
          ajaxParams: this.queryQptions
        }, isLoading)
      },
      getAnswerAnalysisList(isLoading) {
        Object.assign(this.queryQptions.params, {paperId:this.id})
        this.ajax({
          ajaxSuccess: 'listDataSuccess',
          ajaxParams: this.queryQptions
        }, isLoading)
      },
      listDataSuccess(res) {
        this.tableData = res.data
      },
      //催交作业
      hasSubmit(val){
        this.ajax({
          ajaxSuccess: ()=>{this.successMess('催交成功')},
          ajaxParams: {
            url: api.accessTo.path,
            params: {
              studentId:val.studentId,
              papersId:this.id,
            }
          }
        })
      },
      /*
           * 处理列表按钮事件
           * 作用:根据不同的参数打开对应的模态
           * @param targer string example:"add"、"edit"
           * */
      handleEdit(modalType,rowIndex,row){
        console.log(this.studentId)
        this.openModel(modalType);
        if(this.formValidate){
          this.studentId=row.studentId;
          this.idItem=row.workId;
        }
        if(this.id){
          this.studentId=row.studentId;
        }
        this.work=row
      },


      /*
            * 监听子组件通讯的方法
            * 作用:根据不同的参数关闭对应的模态
            * @param targer string example:"add"、"edit"
            * */
      cancel(targer) {
        this[targer + 'Modal'] = false;
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
      subCallback(target, title, updata) {
        target && this.cancel(target);
        title && this.successMess(title);
        if(!updata) {
          this.getProductList()
        }
      },


      /*
      * 打开指定的模态窗体
      * @param options string 当前指定的模态:"add"、"edit"
      * */
      openModel(options) {
        this[options + 'Modal'] = true;
      },

    },
    created () {
      this.init()
    },
    mounted () {
    },
    components: {

      show:show,
      startCorrectedTest,
      showTest
    },
  }

</script>
<style lang="scss">
    .signOn-detail{
       /*.ivu-modal-content{*/
           /*background: #ebf3f0 !important;*/
       /*}*/
    }
</style>