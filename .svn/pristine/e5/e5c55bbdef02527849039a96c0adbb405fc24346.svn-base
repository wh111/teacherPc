<!--
****--@file     list
****--@date     2018/3/19 18:31
****--@author   YC
****--@describe 专题库
-->
<template>
    <el-row>
        <el-col class="status-type">
            <el-col :span="14" class="navBtns" >
                <span class="btn active">我的专题库</span>
            </el-col>
            <el-col :span="10" align="right" class="todoBtns">
                <router-link to="./thematicLibrary/add/-1">
                    <el-button class="greenButton">创建题库</el-button>
                </router-link>
            </el-col>
        </el-col>
        <!--<el-col class="filterBox">-->
        <!--<subject-type></subject-type>-->
        <!--</el-col>-->
        <!--<el-col class="orderBox" align="right">-->
        <!--排序：-->
        <!--<span :class="{'active':orderType===''}" @click="orderBy('')">默认</span>-->
        <!--<span :class="{'active':orderType==='time'}" @click="orderBy('time')">时间</span>-->
        <!--<span :class="{'active':orderType==='useNum'}" @click="orderBy('useNum')">使用次数</span>-->
        <!--<span :class="{'active':orderType==='difficulty'}" @click="orderBy('difficulty')">难度</span>-->
        <!--</el-col>-->
        <el-col>
            <template v-if="totalCount">
                <el-col class="questionBankListItem" v-for="item in tableData" :key="item.id">
                    <el-col class="topBox">
                        <el-col :span="14" class="leftInfo">
                            <span>规格：{{ item.questionNums }}道题</span>
                        </el-col>
                        <el-col :span="10" align="right" class="rightInfo">
                            <span>创建时间：{{ item.createTime | formatDate('yyyy-MM-dd HH:mm') }}</span>
                        </el-col>
                    </el-col>
                    <el-col :span="20" class="contentBox">
                        <p class="contentTitle">
                            <router-link :to="'./thematicLibrarys/view/'+item.id">{{ item.name }}</router-link>
                        </p>
                        <p class="contentText line1">{{ item.remark }}</p>
                    </el-col>
                    <el-col :span="4" class="contentBox todoBtnBox" align="center">
                        <el-button class="todoBtns orange" @click="publish(item)">发布</el-button>
                        <el-button class="todoBtns" @click="remove(item)" :disabled="item.publishStatus==1">删除</el-button>
                    </el-col>
                </el-col>
            </template>
            <p v-else class="tableNoDataTips">暂无数据</p>

            <!--<el-col class="questionBankListItem" v-for="i in 2" :key="i">-->
            <!--<el-col class="topBox">-->
            <!--<el-col :span="14" class="leftInfo">-->
            <!--<span>规格：50道题</span>-->
            <!--</el-col>-->
            <!--<el-col :span="10" align="right" class="rightInfo">-->
            <!--<span>创建时间：2018-02-01</span>-->
            <!--</el-col>-->
            <!--</el-col>-->
            <!--<el-col :span="20" class="contentBox">-->
            <!--<p class="contentTitle">-->
            <!--<router-link to="./thematicLibrarys/view/1">这是标题</router-link>-->
            <!--</p>-->
            <!--<p class="contentText line1">-->
            <!--这是测试文字 这是测试文字 这是测试文字 这是测试文字-->
            <!--这是测试文字 这是测试文字 这是测试文字 这是测试文字-->
            <!--这是测试文字 这是测试文字 这是测试文字 这是测试文字-->
            <!--</p>-->
            <!--</el-col>-->
            <!--<el-col :span="4" class="contentBox todoBtnBox" align="center">-->
            <!--<el-button class="todoBtns orange">发布</el-button>-->
            <!--<el-button class="todoBtns">删除</el-button>-->
            <!--</el-col>-->
            <!--</el-col>-->
        </el-col>
        <el-col v-if="totalCount" class="pagination" align="center">
            <el-pagination @size-change="changePageSize" @current-change="changePage"
                           :current-page.sync="myPages.currentPage" :page-size="myPages.pageSize"
                           layout="total,prev, pager, next, jumper" :total="totalCount">
            </el-pagination>
        </el-col>
        <!--删除弹窗-->
        <Modal :mask-closable="false" height="200" v-model="removeModal" class-name="vertical-center-modal"
               :loading="loading" :width="300">
            <modal-header slot="header" :content="headerContent.removeId"></modal-header>
            <remove v-if="removeModal" :delete-url="deleteUrl" @remove="subCallback" @cancel="cancel"
                    :operaility-data="operailityData"></remove>
            <div slot="footer"></div>
        </Modal>
        <!-- 模态框 发布 -->
        <Modal :mask-closable="false" v-model="publishModal" :width="600">
            <modal-header slot="header" :content="headerContent.publishId"></modal-header>
            <publish v-if="publishModal" @cancel="cancel" :operailityData="operailityData"
                     @publish="subCallback"></publish>
            <div slot="footer"></div>
        </Modal>
    </el-row>
</template>
<script>
  /*当前组件必要引入*/
  import api from './api'
  import subjectType from '../../../components/common/subjectHead'
  import publish from './components/publish'

  //当前组件引入全局的util
  let Util = null
  export default {
    name: 'thematicLibraryList',
    data () {
      return {
        loading: false,
        // orderType: '',
        totalCount: 0,
        tableData: [],
        headerSelectObj: {},
        deleteUrl: api.remove.path,
        operailityData: '',
        publishModal: false,

        headerContent: {
          removeId: {id: 'removeId', title: '删除提示'},
          publishId: {id: 'publishId', title: '专题发布'},
        }
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        Util = this.$util
        this.myPages = this.queryQptions = {
          curPage: 1,
          pageSize: Util.pageInitPrams.pageSize,
        }
        this.setTableData()
      },
      /********************************* 表格相关 *****************************/
      /*
       * 设置表格数据
       * @param isLoading Boolean 是否加载
       */
      setTableData () {
        let params = Util._.defaultsDeep({}, this.queryQptions, this.headerSelectObj, this.searchObj, {questionsLibraryType: this.nav})
        let opt = {
          ajaxSuccess: 'listDataSuccess',
          ajaxParams: {
            url: api.list.path,
            params
          }
        }
        this.ajax(opt)
      },
      // 数据请求成功回调
      listDataSuccess (res) {
        if (res.data instanceof Array) {
          this.totalCount = res.totalCount || 0
          this.tableData = res.data || []
        } else {
          this.totalCount = res.data.totalCount || 0
          this.tableData = res.data.dataList || []
        }
      },
      // 删除
      remove (item) {
        this.operailityData = [item]
        this.openModel('remove')
      },
      // 发布
      publish (item) {
        this.operailityData = item
        this.openModel('publish')
      },
      /********************************* 弹窗相关 *****************************/
      // 取消
      cancel (targer) {
        this[targer + 'Modal'] = false
      },
      // 弹窗回调
      subCallback (target, title, updata) {
        this.cancel(target)
        if (title) {
          this.successMess(title)
        }
        if (!updata) {
          this.setTableData()
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
      subjectType,
      publish
    }
  }

</script>
