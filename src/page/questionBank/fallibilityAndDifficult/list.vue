<!--
****--@file     list
****--@date     2018/3/19 18:28
****--@author   YC
****--@describe 易错&难题库
-->
<template>
    <div>
        <el-row>
            <el-col class="status-type">
                <el-col :span="14" class="navBtns">
                    <span class="btn" :class="{'active':nav===1}"
                          @click="showNav(1)">易错题库</span>
                    <span class="btn" :class="{'active':nav===2}" @click="showNav(2)">难题库</span>
                </el-col>
                <!--<el-col :span="10" align="right" class="todoBtns">-->
                <!--<el-button>导入试题</el-button>-->
                <!--<el-button>新建试题</el-button>-->
                <!--</el-col>-->
            </el-col>
            <el-col class="filterBox">
                <subject-type :showItems="showItem" :subject="$store.state.user.info.subject"  @change="headChange"></subject-type>
            </el-col>
            <el-col class="orderBox" align="right">
                排序：
                <span :class="{'active':searchObj.sortBy===''}" @click="sortbyCall('')">默认</span>
                <span :class="{'active':searchObj.sortBy==='createTime'}" @click="sortbyCall('createTime')">
                    时间
                    <i class="el-icon-arrow-down"
                       v-if="searchObj.sortBy==='createTime' && searchObj.order==='desc'"></i>
                    <i class="el-icon-arrow-up" v-else></i>
                </span>
                <span :class="{'active':searchObj.sortBy==='usedNum'}" @click="sortbyCall('usedNum')">
                    使用次数
                    <i class="el-icon-arrow-down" v-if="searchObj.sortBy==='usedNum' && searchObj.order==='desc'"></i>
                    <i class="el-icon-arrow-up" v-else></i>
                </span>
                <span :class="{'active':searchObj.sortBy==='diffLevel'}" @click="sortbyCall('diffLevel')">
                    难度
                    <i class="el-icon-arrow-down" v-if="searchObj.sortBy==='diffLevel' && searchObj.order==='desc'"></i>
                    <i class="el-icon-arrow-up" v-else></i>
                </span>
            </el-col>
            <el-col>
                <template v-if="totalCount">
                    <el-col class="questionBankListItem" v-for="item in tableData" :key="item.id">
                        <el-col class="topBox">
                            <el-col :span="14" class="leftInfo">
                                <span>编号：{{ item.no }}</span>
                                <span>|</span>
                                <span>知识点：{{ item.knowledgeList | getArrText('name') | sliceText(10,'...') }}</span>
                            </el-col>
                            <el-col :span="10" align="right" class="rightInfo">
                                <span>创建时间：{{ item.createTime | formatDate('yyyy-MM-dd HH:mm') }}</span>
                            </el-col>
                        </el-col>
                        <el-col :span="20" class="contentBox">
                            <p class="contentText">
                                <router-link  :to="{name:'groupDetailOfQuestion',query:{types:'hardOrEasyDefault',questionsId:item.questionsId}}">
                                    {{ item.title| delHtmlTag('true') | sliceText(20,'...')}}
                                </router-link>
                            </p>
                        </el-col>
                        <el-col :span="4" class="contentBox todoBtnBox" align="center">
                            <el-button class="todoBtns" @click="remove(item)">删除</el-button>
                        </el-col>
                    </el-col>
                </template>
                <p v-else class="tableNoDataTips">暂无数据</p>
            </el-col>
            <el-col v-if="totalCount" class="pagination" align="center">
                <el-pagination @size-change="changePageSize" @current-change="changePage"
                               :current-page.sync="myPages.currentPage" :page-size="myPages.pageSize"
                               layout="total,prev, pager, next, jumper" :total="totalCount">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>
<script>
  /*当前组件必要引入*/
  import api from './api'
  import subjectType from '../../../components/common/subjectHead'
  //当前组件引入全局的util
  let Util = null
  export default {
    name: 'fallibilityAndDifficultList',
    data () {
      return {
        nav: 1, // 1易错题 2难题
        showItem: ['grade', 'term', 'chapter', 'knowledge', 'diffLevelCode'],
        self: this,
        loading: false,
        searchObj: {sortBy: '', order: 'asc'},
        totalCount: 0,
        tableData: [],
        headerSelectObj: {},
        deleteUrl: api.remove.path,
        operailityData: '',
        headerContent: {
          removeId: {
            id: 'removeId',
            title: '删除提示'
          }
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
      headChange (data, select,chapterList) {
        if(select.chapter){
          select.chapter=select.chapter.toString()
        }else {
          let temp=[]
          select.chapterIds='';
          for(var item in chapterList){
            temp.push(item);
          }
          select.chapterIds=temp.join(',');
        }
        let {chapter, subject, grade, term, diffLevelCode, knowledge: knowledgeId,chapterIds} = select
        this.headerSelectObj = {
          chapter, subject, grade, term, diffLevelCode, knowledgeId,chapterIds
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
        params.subject=this.$store.state.user.info.subject;
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
      sortbyCall (type) {
        if (this.searchObj.sortBy == type) {
          if (this.searchObj.order === 'desc') {
            this.searchObj.order = 'asc'
          } else {
            this.searchObj.order = 'desc'
          }
        } else {
          this.searchObj.order = 'desc'
        }
        this.searchObj.sortBy = type
        this.setTableData()
      },
      // 删除
      remove (item) {
        console.log(item)
        this.operailityData = [item]
        this.ajax({
          ajaxSuccess: (res) => {this.successMess('删除成功');this.setTableData () },
          ajaxParams: {
            url: api.remove.path,
            method:api.remove.method,
            params: {
              ids:item.id
            },
          }
        })
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
      showNav (nav) {
        this.nav = nav
        this.searchObj.order = 'asc'
        this.searchObj.sortBy = ''
        this.init()
      },
    },
    created () {
      this.init()
    },
    mounted () {
    },
    components: {
      subjectType
    }
  }

</script>
