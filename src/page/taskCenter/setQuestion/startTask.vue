<!--
****--@file     input
****--@date     2018/4/2 17:24
****--@author   YC
****--@describe 集体投稿-开始任务
-->
<template>
    <div class="task_goon">
        <template v-if="error">
            <p class="urlParamsError">环境异常，请退出后重新登录</p>
        </template>
        <template v-else-if="viewData">
            <div class="task-content">
                <div class="title"><span class="text">任务信息</span></div>
                <p class="tip">
                    <span>任务名称</span>{{ viewData.name }}
                </p>
                <p class="tip">
                    <span>任务类型</span>{{ viewType | taskType }}
                </p>
                <p class="tip">
                    <span>任务描述</span>
                    <b class="tips">{{ viewData.remark }}</b>
                </p>
                <p class="tip">
                    <span>任务时间</span>起 {{ viewData.beginTime | formatDate('yyyy-MM-dd HH:mm') }} 止 {{ viewData.endTime |
                    formatDate('yyyy-MM-dd HH:mm') }}
                </p>
                <p class="tip">
                    <span>知识点</span>{{ viewData.knowledgeList | getArrText('knowledgeName') }}
                </p>
                <p class="tip">
                    <span>来源</span>系统
                </p>
                <p class="tip">
                    <span>参与者</span>全部教师
                </p>
                <p class="tip">
                    <span>任务奖励</span>{{ viewData.integral }}积分
                </p>
            </div>
            <div class="test"></div>
            <div class="bzst">
                <div class="title">
                    <span class="text">编制试题</span>
                    <el-button class="right yellowButton" style="width: 140px;height: 40px;font-size: 14px" type="warning" round @click="add">编制试题</el-button>
                </div>
                <ul class="clearfix">
                    <template v-if="viewData.questionsList.length">
                        <li :class="index == 0 ? 'first-child item' : 'item'"
                            v-for="(item,index) in viewData.questionsList" :key="index">
                            <el-col class="task-item-title">
                                <el-col :span="14" class="source">
                                    <span class="questionIndex">试题{{index+1}}</span> | <span>题型：{{ item.questionsTypeName }}</span>
                                </el-col>
                                <el-col :span="10" align="right">
                                    <span class="time">分值：{{ item.score }}分</span>
                                </el-col>
                            </el-col>
                            <div class="task-item-content clearfix">
                                <div class="tip-wrap left">
                                    <!-- 试题组件 -->
                                    <question-show :showData="item" v-if="item.basicType" :show-answer="true"
                                                   :showScore="true"></question-show>
                                </div>
                                <div class="btn-wrap">
                                    <p v-if="item.status == 0">未处理</p>
                                    <p v-else-if="item.status == 1">采纳</p>
                                    <el-tooltip v-else effect="light" content="驳回提示文字" placement="top-start">
                                        <p class="lookTips">驳回</p>
                                    </el-tooltip>
                                </div>
                            </div>
                        </li>
                    </template>
                    <p v-else class="errMsg">暂无试题</p>
                </ul>
            </div>
        </template>
        <p v-else class="errMsg">
            <span class="el-icon-loading"></span>
            数据加载中
        </p>
        <!--查看弹窗-->
        <Modal :mask-closable="false" v-model="addModal" height="200" class-name="vertical-center-modal" :width="960">
            <modal-header slot="header" :content="headerContent.addId"></modal-header>
            <add v-if="addModal" @cancel="cancel" @add="subCallback" style="padding: 0;" :gamesGroupsId="id"></add>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
  /*当前组件必要引入*/
  import api from '../api'
  import add from './input'
  import questionShow from '../../../components/questionShow/show'
  //当前组件引入全局的util
  let Util = null
  export default {
    name: 'setQuestionInput',
    data () {
      return {
        id: '',
        viewData: null,
        viewType: '',
        isJoin: false, // 是否是首次参加
        error: false,
        headerContent: {
          addId: {
            id: 'addId',
            title: '编制试题'
          }
        },
        taskType: '',
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        Util = this.$util
        let {type, id} = this.$route.params
        if (!['groupQuestion', 'setQuestion'].includes(type) && !isNaN(id)) {
          this.error = true
          return
        }
        let {isJoin} = this.$route.query
        this.isJoin = isJoin || false
        this.viewType = type
        this.id = id
        this.getViewData()
      },
      getViewData () {
        let opt = {
          ajaxSuccess: res => this.viewData = res.data,
          ajaxParams: {
            url: api[this.isJoin ? 'joinGamesGroups' : 'getGamesGroupsInfo'].path,
            method: api[this.isJoin ? 'joinGamesGroups' : 'getGamesGroupsInfo'].method,
            params: {
              id: this.id
            }
          }
        }
        this.ajax(opt)
      },
      add () {
        this.openModel('add')
      },
      /**************************** 弹窗相关 ***************************/
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
          this.getViewData()
        }
      },
      /*
      * 打开指定的模态窗体
      * @param options string 当前指定的模态:"add"、"edit"
      * */
      openModel (options) {
        this[options + 'Modal'] = true
      },
      // 取消
      cancel (targer) {
        this[targer + 'Modal'] = false
      }
    },
    created () {
      this.init()
    },
    mounted () {
    },
    filters: {
      taskType (val) {
        let type = {
          groupQuestion: '众包组题',
          setQuestion: '集题投稿',
        }
        return type[val] || val
      },
    },
    components: {
      add, questionShow
    }
  }

</script>
<style lang="scss">
    @import '../../css/task_goon.scss';
</style>
