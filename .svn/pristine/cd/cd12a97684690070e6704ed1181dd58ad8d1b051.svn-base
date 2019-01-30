<!--
****--@file     correctingNotCorrected
****--@date     2018/3/19 18:05
****--@author   zyc
****--@describe 未批改
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
                        prop="finishedTime"
                        label="完成时间"
                        align="center">
                    <template slot-scope="scope">
                        {{scope.row.finishedTime| formatDate('yyyy-MM-dd HH:mm:ss')}}
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
                                @click="handleEdit('startCorrected',scope.$index, scope.row)">开始批改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--查看详情-->
        <Modal
                :mask-closable="false"
                width="890"
                v-model="startCorrectedModal"
                title="开始批改"
                class-name="signOn-detail"
                :loading="loading">
            <modal-header slot="header" :content="startCorrected"></modal-header>
            <start-corrected v-if="startCorrectedModal" :formValidate="formValidate" :studentId="studentId" @reResquest="reRequest"></start-corrected>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
  /*当前组件必要引入*/
  import startCorrected from "./startCorrected.vue";
  import api from '../api'
  //当前组件引入全局的util
  let Util = null
  export default {
    name: 'correctingNotCorrected',
    props: ['formValidate'],
    data () {
      return {
        //开始批改
        startCorrectedModal: false,
        startCorrected: {
          id: 'startCorrectedId',
          title: '',
        },

        loading: false,
        tableData: [],
        studentId:''
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        Util = this.$util;

        this.myPages = Util.pageInitPrams;
        this.queryQptions = {
          url: api.queryMarkList.path,
          params: {}
        };
        this.setTableData()
      },
      reRequest(){
        this.setTableData();
        this.$emit('setWorkNum')
        this.startCorrectedModal=false;
        this.setTableData()
      },
      /*
        * 设置表格数据
        * @param isLoading Boolean 是否加载
        */
      setTableData(isLoading) {
        this.formValidate.isMarked = 0
        Object.assign(this.queryQptions.params, this.formValidate)
        this.ajax({
          ajaxSuccess: 'listDataSuccess',
          ajaxParams: this.queryQptions
        }, isLoading)
      },
      listDataSuccess(res) {
        this.tableData = res.data
      },


      /*
           * 处理列表按钮事件
           * 作用:根据不同的参数打开对应的模态
           * @param targer string example:"add"、"edit"
           * */
      handleEdit(modalType,rowIndex,row){
        this.openModel(modalType);
        this.studentId=row.studentId;
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
      startCorrected:startCorrected,
    },
  }

</script>
<style lang="scss">
    .signOn-detail{
        /*.ivu-modal-content{*/
            /*background: #ebf3f0 !important;*/
        /*}*/
        #startCorrectedId{
            background: #ebf3f0
        }
        .ivu-modal-header{
            border: none;
        }
    }
</style>