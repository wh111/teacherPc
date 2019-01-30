<!--
****--@file     correctingUnfinished
****--@date     2018/3/19 18:06
****--@author   zyc
****--@describe 未完成
-->
<template>
    <div class="correctingUnfinished-root">
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
                        prop="endTime"
                        label="完成时间"
                        align="center">
                    <template slot-scope="scope">
                        --
                    </template>
                </el-table-column>
                <el-table-column
                        prop="usedTime"
                        label="用时"
                        align="center">
                    <template slot-scope="scope">
                        --
                    </template>
                </el-table-column>
                <el-table-column
                        prop="score"
                        label="分数"
                        align="center">
                    <template slot-scope="scope">
                        --
                    </template>
                </el-table-column>
                <el-table-column
                        prop="operation"
                        label="操作"
                        align="center"
                        width="320"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div style="position: relative">
                        <el-button @mouseover.native="mouseover(scope.row)"
                                size="mini"
                               class="whiteButton" :disabled="to_talk" @click="handleEdit('paperAnalysis',scope.$index, scope.row)" >催交
                        </el-button>
                            <!--:disabled="to_talk"-->
                        <el-button v-if="scope.row.show"  @mouseover.native="mouseoverAll(scope.row)" @mouseout.native="scope.row.show=false"  class="to_work orangeYellow" style="color: white;position: absolute;z-index: 10;right:20px;top:0;height: 28px"
                                   @click='to_work' :disabled="to_talk">全部催交
                        </el-button>
                        </div>
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
    name: 'correctingUnfinished',
    props: ['formValidate'],
    data () {
      return {
        loading: false,
        tableData: [],
        to_talk:true,
        timer:null,
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        Util = this.$util
        //this.myPages = Util.pageInitPrams;
        this.queryQptions = {
          url: api.queryNoSubmit.path,
          params: {}
        }

        this.setTableData()
      },
      mouseover(item){
        this.tableData.map((item1)=>{
          item1.show=false
        })
        item.show=true;
//        clearTimeout(this.timer);
        this.timer=setTimeout(()=>{
          item.show=false;
        },2000)
      },
      mouseoverAll(item){
        clearTimeout(this.timer);
        item.show=true;
      },
      /*
        * 设置表格数据
        * @param isLoading Boolean 是否加载
        */
      setTableData (isLoading) {
        Object.assign(this.queryQptions.params, this.formValidate)
        this.ajax({
          ajaxSuccess: 'listDataSuccess',
          ajaxParams: this.queryQptions
        }, isLoading)
      },
      listDataSuccess (res) {
        res.data.map((item)=>{
          item.show=false;
        })
        this.tableData = res.data;
        console.log(res.data[0].submitTime,new Date().getTime(),res.data[0].submitTime >= new Date().getTime())
        if(res.data.length>0){
          if(res.data[0].submitTime >= new Date().getTime()){
            this.to_talk=false;
          }

        }
        console.log( this.to_talk)
        //this.totalCount = res.data.totalCount;
      },

      /*
           * 处理列表按钮事件
           * 作用:根据不同的参数打开对应的模态
           * @param targer string example:"add"、"edit"
           * */
      handleEdit (modalType, rowIndex, row) {
        this.openModel(modalType)
        this.sendUrgeWork(row)

      },
      sendUrgeWork (row) {
        this.ajax({
          type: 'add',
          errorTitle: '催交失败!',
          ajaxSuccess: () => {this.successMess('催交成功!') },
          ajaxError: 'ajaxError',
          ajaxParams: {
            url: api.urgeWork.path,
            method: api.urgeWork.get,
            params: {
              workId: this.formValidate.workId,
              studentId: row.studentId,
            }
          }
        })
      },//催所有人交作业
      to_work () {
        this.ajax({
          type: 'add',
          errorTitle: '催交失败!',
          ajaxSuccess: () => {this.successMess('催交成功!') },
          ajaxError: 'ajaxError',
          ajaxParams: {
            url: api.urgeAllWork.path,
            method: api.urgeAllWork.get,
            params: {
              workId: this.formValidate.workId,
              groupsId: this.formValidate.groupsId,
            }
          }
        })
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
    components: {},
  }

</script>
<style lang="scss">
    .correctingUnfinished-root {
    }
</style>