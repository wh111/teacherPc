<!--
****--@file     list
****--@date     2018/4/2 17:22
****--@author   YC
****--@describe 众包组题列表页
-->
<template>
    <div class="taskCenter-index">
        <div class="list-wrap">
            <div class="status-type btns">
                状态：
                <span :class="formValidate.progressStatus === '' ? 'active' : ''" @click="choiceStatus('')">全部</span>
                <span v-for="(text,index) in ['未开始','进行中','已结束']" :key="index"
                      :class="formValidate.progressStatus === index.toString() ? 'active' : ''"
                      @click="choiceStatus(index)">{{ text }}</span>
                <!--<el-button round class="right" type="warning" icon="el-icon-plus" @click="add" style="margin-right:20px;">创建任务</el-button>-->
            </div>
            <!--
                <div class="isNull" v-if="groupList.length == 0">-->
            <!--<img src="../../../assets/images/isnull.png" alt="">-->
            <!--<p class="tips">暂无任务</p>-->
            <!--</div>-->
            <!--<ul v-else class="task-wrap">-->
            <!--<li :class="index == 0 ? 'first-child item' : 'item'" v-for="(item,index) in groupList"-->
            <!--:key="index" style="border: 1px solid #EFEFEF">-->
            <!--<el-row style="display: flex;align-items: center;text-align: center;height: 50px;background: #EFEFEF;">-->
            <!--<el-col :span="5">任务名称</el-col>-->
            <!--<el-col :span="5">任务类型</el-col>-->
            <!--<el-col :span="5">任务时间</el-col>-->
            <!--<el-col :span="5">来源</el-col>-->
            <!--<el-col :span="4">操作</el-col>-->
            <!--</el-row>-->
            <!--<el-row style="text-align: center;height: 90px;display: flex;align-items: center">-->
            <!--<el-col :span="5" style="height: 50px;line-height: 50px">{{item.remark}}</el-col>-->
            <!--<el-col :span="5">{{item.remark}}</el-col>-->
            <!--<el-col :span="5">-->
            <!--<el-col>起：{{item.beginTime| formatDate('yyyy-MM-dd HH:mm')}}</el-col>-->
            <!--<el-col>止：{{item.endTime| formatDate('yyyy-MM-dd HH:mm')}}</el-col>-->
            <!--</el-col >-->
            <!--<el-col :span="5">系统</el-col>-->
            <!--<el-col :span="4">-->
            <!--<router-link v-if="true" :to="{name: 'startTask',params:{id:item.id,type:'groupQuestion'}}">-->
            <!--<el-button type="warning">查看详情</el-button>-->
            <!--</router-link>-->
            <!--<el-button v-else style="margin-left: 5px" size="small" :disabled="true">开始任务</el-button>-->
            <!--</el-col>-->
            <!--</el-row>-->
            <!--</li>-->
            <!--</ul>-->
            <div id="myTable" ref="myTable">
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            prop="name"
                            label="任务名称"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            label="任务开始时间"
                            align="center">
                        <template slot-scope="scope">
                            {{ scope.row.beginTime|formatDate('yyyy-MM-dd HH:mm')}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="任务结束时间"
                            align="center">
                        <template slot-scope="scope">
                            {{ scope.row.endTime|formatDate('yyyy-MM-dd HH:mm')}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            align="center">
                        <template slot-scope="scope">
                            <router-link v-if="scope.row.progressStatus==2"
                                         :to="{name: 'startTask',params:{id:scope.row.id,type:'groupQuestion'}}">
                                <el-button type="warning" class="orangeYellow">查看详情</el-button>
                            </router-link>
                            <el-button type="warning" @click="beginTask(scope.row)" v-else style="margin-left: 5px"
                                       size="small" :disabled="scope.row.progressStatus== 0">开始任务
                            </el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </div>
            <div class="pagination">
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
        <!-- 模态框 增加（add） -->
        <Modal :mask-closable="false" v-model="addModal" height="200" title="对话框标题" class-name="vertical-center-modal"
               :width="800">
            <modal-header slot="header" :content="addId"></modal-header>
            <add v-if="addModal" @cancel="cancel" @add="subCallback"></add>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
  /*当前组件必要引入*/
  import api from '../api'
  import add from './input'
  //当前组件引入全局的util
  let Util = null
  export default {
    name: 'groupQuestionList',
    data () {
      return {
        totalCount: 0,
        addId: {
          id: 'addId',
          title: '创建任务',
        },
        brush: [],
        formValidate: {
          progressStatus: ''
        },
        tableData: [],
      }
    },
    methods: {
      beginTask (val) {
        if (val.progressStatus == 1) {
          this.$router.push({name: 'startTask', params: {id: val.id, type: 'groupQuestion'}})
        }
      },
      //初始化请求列表数据
      init () {
        Util = this.$util
        this.myPages = this.queryQptions = {
          curPage: 1,
          pageSize: Util.pageInitPrams.pageSize,
        }
        this.brushList()
      },
      brushList () {
        let params = {}
        params = Util._.defaultsDeep({}, this.myPages, {types: 0}, this.formValidate)
        this.ajax({
          ajaxSuccess: res => {
            this.tableData = res.data.dataList
            this.totalCount = res.data.totalCount
          },
          ajaxParams: {
            url: api.gamesGroupsList.path,
            method: api.gamesGroupsList.method,
            params,
          },
        })
      },
      /***
       * 根据选择的状态  展示对应的任务
       * @augments status -->状态
       */
      choiceStatus (status) {
        this.formValidate.progressStatus = status.toString()
        this.brushList()
      },
      /***
       * 创建任务
       */
      add () {
        this.openModel('add')
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
          this.brushList()
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
      add
    }
  }

</script>
<style lang="scss">
    @import "../../css/taskCenter.scss";
</style>
