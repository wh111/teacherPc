<!--
****--@file     integralList
****--@date     2018/1/4 下午5:19
****--@author   jhd
****--@describe   我的积分
-->
<template>
    <div class="integralList">
        <p class="integral">我的积分： <span class="integral-span">{{$store.state.user.userIntegral}}</span> 积分
            <!--<el-button @click="sign" v-if="!isSign">签到</el-button>-->
            <!--<el-button @click="sign" v-else>已签到</el-button>-->
        </p>
        <div class="groupsSelect">
            <div class="groupsLeft" :class="{active:types=='true'}" @click="change('true')">积分获得</div>
            <div class="groupsMid" :class="{active:types=='false'}" @click="change('false')">积分消耗</div>
        </div>
        <div id="myTable" ref="myTable">
            <el-table
                    :height="445"
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="times"
                        label="时间"
                        align="center">
                    <template slot-scope="scope">
                        {{scope.row.times | formatDate('yyyy-MM-dd HH:mm')}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="points"
                        label="积分数量"
                        align="center"
                        v-if="types=='true'">
                    <template slot-scope="scope">
                        +{{scope.row.points}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="points"
                        label="积分数量"
                        align="center"
                        v-else>
                    <template slot-scope="scope">
                        -{{scope.row.points}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="remark"
                        label="积分用途"
                        align="center"
                        show-overflow-tooltip
                        v-if="types ==' true'">
                </el-table-column>
                <el-table-column
                        prop="remark"
                        label="积分用途"
                        align="center"
                        v-else>
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
        <div class="bgc"></div>
        <ul class="hot-ul clearfix">
            <li class="hot-li" v-for="item in queryHotList">
                <div class="detail-top clearfix">
                    <router-link target="_blank" :to="{path:'/questionBankDetail',query:{name:item.id}}">
                        <div class="top-img left">
                            <img :src="resourceHttp + item.icon" onerror="javascript:this.src='/sasstudent/img/53.png'"
                                 width="140" alt="">
                        </div>
                    </router-link>
                    <div class="top-content left">
                        <p class="name">{{item.title}}</p>
                        <p class="type">类别：{{item.types | goodType }}</p>
                        <div class="press">{{item.press}}</div>
                        <p class="price">{{item.currentPrice || 0}}积分</p>
                        <p class="btn-wrap">
                            <el-button class="pay" @click="confim(item.id,item.currentPrice)">立即兑换</el-button>
                        </p>
                    </div>
                </div>

            </li>
        </ul>
        <!--兑换弹窗-->
        <Modal
                :mask-closable="false"
                width="360"
                v-model="confirmModal"
                title="确认订购"
                :loading="loading">
            <modal-header slot="header" :content="confirm"></modal-header>
            <co-confirm-modal v-if="confirmModal" :productId="productId" :currentPrice="currentPrice" @cancel="cancel"
                              @confirm="subCallback"></co-confirm-modal>
            <div slot="footer"></div>
        </Modal>
        <!--签到-->
        <Modal
                :mask-closable="false"
                width="810"
                v-model="calendarModal"
                title="签到日历"
                class-name="signOn-detail"
                :loading="loading">
            <modal-header slot="header" :content="calendarId"></modal-header>
            <signOndate v-if="calendarModal" @signonThisday="signonThisday"></signOndate>
        </Modal>
    </div>
</template>
<script>
    /*当前组件必要引入*/
    let Util = null;
    import signOndate from '../selfCenterdetail/signOndate.vue'
    import coConfirmModal from '../../questionBank/questionBank_confrim.vue'
    import api from './api'
    export default {
        data() {
            return {
                loading: false,
                types: 'true',
                tableData: [],
                totalCount: 0,
                calendarId: {
                    id: 'signOndata',
                    title: '',
                },
                resourceHttp: '',
                calendarModal: false,
                confirmModal: false,
                confirm: {
                    id: 'confirmId',
                    title: '确认兑换',
                },
                queryHotList: [],
                isSign: false
            }
        },
        methods: {
            //初始化请求列表数据
            init() {
                Util = this.$util;
                this.resourceHttp = this.$store.getters['app/envs']('resourceHttp');
                this.myPages = Util.pageInitPrams;
                this.queryQptions = {
                    // url: api.list.path,
                  url:'/integral/historyRecord',
                    params: {curPage: 1, pageSize: Util.pageInitPrams.pageSize}
                };
                this.setTableData();

            },
            getProductList() {
                this.ajax({
                    ajaxSuccess: res => {
                        this.queryHotList = res.data.dataList
                    },
                    ajaxParams: {
                        url: api.productList.path,
                        params: {
                            productTypes: '1',
                            curPage: 1,
                            pageSize: 8
                        }
                    }
                })
            },
            /*
            * 设置表格数据
            * @param isLoading Boolean 是否加载
            */
            setTableData(isLoading) {
                Object.assign(this.queryQptions.params, {types: this.types});
                this.ajax({
                    ajaxSuccess: 'listDataSuccess',
                    ajaxParams: this.queryQptions
                }, isLoading)
            },
            listDataSuccess(res) {
                this.tableData = res.data.dataList;
                this.totalCount = res.data.totalCount
            },
            sign() {
                if(!this.isSign) {
                    this.ajax({
                        ajaxSuccess: res => {
                            this.successMess('签到成功！');
                            this.$store.commit('user/updateuserIntegral', res.data);
                            this.ajax({
                                ajaxSuccess: res => {
                                    this.$store.commit('user/updatesignList', res.data);
                                    this.isSign = true;
                                    this.setTableData();
                                },
                                ajaxParams: {
                                    url: '/sign/list'
                                }
                            })
                        },
                        ajaxParams: {
                            url: '/sign/sign',
                            method: 'post'
                        }
                    })
                } else {
                    this.calendarModal = true
                }
            },
            signonThisday() {
                this.isSign = true
                this.calendarModal = false
            },
            change(type) {
                this.types = type;
                this.setTableData()
            },
            confim(id, price) {
                this.currentPrice = price;
                this.productId = id;
                this.openModel('confirm')
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
        created() {
            this.init();
        },
        mounted() {
        },
        components: {
            coConfirmModal,
            signOndate
        }
    }

</script>
<style lang="scss">
    .integralList {
        width: 950px;
        background: #ffffff;
        border-radius: 5px;
        .integral {
            text-align: center;
            font-size: 20px;
            line-height: 96px;
            .integral-span {
                font-size: 30px;
                color: red;
            }
        }
        #myTable {
            padding: 10px;
        }
        .groupsSelect {
            cursor: pointer;
            width: 950px;
            border-bottom: 2px solid #11a63f;
            height: 46px;
            padding-left: 30px;
            div {

                height: 44px;
                text-align: center;
                float: left;
                border-radius: 2px;
                font-size: 16px;
                line-height: 44px;
                width: 444px;
                color: #727272;

            }
            .active {
                background-color: #11a63f;
                color: #fff;
            }
        }
        .pagination {
            padding-bottom: 20px;
        }
        .bgc {
            width: 100%;
            height: 20px;
            background: #efefef;
        }
        .hot-ul {
            padding: 20px;
            .hot-li {
                float: left;
                margin-top: 20px;
                width: 450px;
                text-align: center;
                .detail-top {
                    .top-img {
                        padding: 8px;
                        width: 152px;
                        height: 174px;
                        border: solid 1px #e5e5e5;
                    }
                }
                .topic {
                    padding: 3px 10px;
                    background: #efefef;
                    p {
                        text-align: left;
                        font-size: 12px;
                        color: #434343;
                    }
                    .red {
                        color: #ef3f3f;
                    }
                }
            }
            .top-content {
                margin-left: 25px;
                .name {
                    font-size: 16px;
                    font-weight: bold;
                    text-align: left;
                    line-height: 30px;
                    color: #313131;
                }
                .type {
                    font-size: 14px;
                    text-align: left;
                    color: #b5b5b5;
                }
                .press {
                    font-size: 14px;
                    margin: 10px 0 25px 0;
                    text-align: left;
                    color: #313131;
                }
                .btn-wrap {
                    .el-button {
                        color: #ffffff;
                        border: none;
                        background: #fd7416;
                    }
                }
                .price {
                    font-size: 16px;
                    line-height: 30px;
                    text-align: left;
                    color: #ef3f3f;
                }
                .msg {
                    font-size: 12px;
                    margin-top: 15px;
                    text-align: left;
                    color: #b5b5b5;
                }
            }
        }
    }
</style>
