<!--
****--@file     crowdsourcing
****--@date     2018/3/31
****--@author   zzh
****--@describe   众包组题
-->

<template>
    <div class="taskCenter-index">
        <div class="list-wrap">
            <template v-if="groupList instanceof Array">
                <div class="isNull" v-if="groupList.length == 0">
                    <img src="../../assets/images/isnull.png" alt="">
                    <p class="tips">暂无任务</p>
                </div>
                <ul v-else class="task-wrap">
                    <div class="status-type">
                        状态：
                        <span :class="formValidata.status == '0' ? 'active' : ''" @click="choiceStatus('0')">全部</span>
                        <span :class="formValidata.status == '1' ? 'active' : ''" @click="choiceStatus('1')">正在进行</span>
                        <span :class="formValidata.status == '2' ? 'active' : ''" @click="choiceStatus('2')">已完成</span>
                        <span :class="formValidata.status == '3' ? 'active' : ''" @click="choiceStatus('3')">未发布</span>
                        <el-button round class="right" type="warning" icon="el-icon-plus" @click="add">创建任务</el-button>
                    </div>
                    <li :class="index == 0 ? 'first-child item' : 'item'" v-for="(item,index) in groupList" :key="index" v-if="formValidata.status == code">
                        <p class="task-item-title">
                            <span class="source">来源：赵老师</span>
                            <span class="time">结束时间：{{item.endTime}}</span>
                            <span class="time">开始时间：{{item.beginTime}}</span>
                        </p>
                        <div class="task-item-content">
                            <div class="tip-wrap">
                                <p class="types name">任务名称：{{item.name}}</p>
                                <p class="name">任务类型：{{item.remark}}</p>
                            </div>
                            <dd class="btn-wrap">
                                <router-link v-if="true" :to="{path:'/selfCenter/task_goon',query:{productId:item.id}}">
                                    <el-button type="warning">开始任务 ></el-button>
                                </router-link>
                                <el-button v-else style="margin-left: 5px" size="small" :disabled="true">已评价</el-button>
                            </dd>
                        </div>
                    </li>
                </ul>
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
            </template>
            <template v-else>
                <p class="errMsg">
                    <span class="el-icon-loading"></span>
                    数据加载中
                </p>
            </template>
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
    import api from './api'
    import add from './newWork.vue'
    let Util = null
    export default {
        data() {
            return {
                types: [],
                totalCount: 0,
                formValidata: {
                    status: 0
                },
                code:0,
                loading: false,
                addId: {
                    id: 'addId',
                    title: '创建任务',
                },
                addModel: false,
                brush: [],
                type: 0,
                groupList: []
            }
        },
        methods: {
            //初始化请求列表数据
            init() {
                Util = this.$util;
                this.myPages = this.queryQptions = {
                    curPage: 1,
                    pageSize: Util.pageInitPrams.pageSize,
                };
                this.brushList();
            },
            brushList() {
                this.type = '0';
                let params = {
                    types: this.type,
                };
                params = Object.assign({},params,this.myPages);
              params = Util._.defaultsDeep({}, params, this.myPages)
                this.ajax({
                    ajaxSuccess: res => {
                        this.groupList = res.data.dataList;
                        this.code = res.status.code
                    },
                    ajaxParams: {
                        url: api.crowd.path,
                        method: api.crowd.method,
                        params: {params},
                    },
                })
            },
            /***
             * 根据选择的状态  展示对应的任务
             * @augments status -->状态
             */
            choiceStatus(status) {
                this.formValidata.status = status
            },
            /***
             * 创建任务
             */
            add() {
                this.openModel('add');
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
                if (!updata) {
                    this.brushList();
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
        created() {
            this.init();

        },
        mounted() {

        },
        components: {
            add
        }
    }

</script>
<style lang="scss">
    @import "../css/taskCenter.scss";
</style>
