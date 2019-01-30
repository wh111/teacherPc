<!--
****--@file     selfTextAlert.vue
****--@date     2017/12/22 18:07
****--@author   王恒
****--@describe   自适应测平-弹窗
-->
<template>
    <div class="resultOfFirst-root selfTextAlert-root">
        <h1>{{operationData.name}}：{{operationData.chapterText}}</h1>
        <div class="selfTextAlert-progress">
            <div style="width: 460px;padding: 0 20px;float: left">
                <p>当前掌握度：{{operationData.level}}% </p>
                <co-progress background="#fd7416" :text-inside="true" :stroke-width="18"
                             :percentage="operationData.level"></co-progress>
            </div>
            <button @click="startExam" class="cursor">开始训练</button>
        </div>
        <div class="item">
            <span class="icon-left"><i></i>练习评价</span>
            <div class="content" style="height: auto;">
                <p class="tip" style="padding: 20px;">{{ getEvaluate() }}</p>
            </div>
        </div>
        <div class="item">
            <span class="icon-left"><i></i>历史练习</span>
        </div>
        <div id="myTable" ref="myTable" style="margin-top: 2px">

            <el-table
                    :data="LastTableData"
                    border
                    style="width: 100%;">
                <el-table-column
                        prop="totalScore"
                        label="标题"
                        width="230"
                        align="center">
                    <template slot-scope="scope">
                        {{operationData.name}}：{{ operationData.chapterText }}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="updateTime"
                        label="时间"
                        align="center">
                    <template slot-scope="scope">
                        {{ scope.row.updateTime | formatDate('yyyy-MM-dd HH:mm') }}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="right"
                        label="准确率"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="70"
                        align="center">
                    <template slot-scope="scope">
                        <el-button @click="viewPaper(scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="clear: both"></div>
        <!--查看试卷-->
        <Modal
                :mask-closable="false"
                width="810"
                v-model="showModal"
                title="查看试卷"
                class-name="vertical-center-modal"
                :loading="loading">
            <modal-header slot="header" :content="showId"></modal-header>
            <show v-if="showModal" :typeId="id" types="2"></show>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
    /*当前组件必要引入*/
    let Util = null
    import coProgress from '../../../../components/common/progress.vue'
    import show from '../../../../components/common/questionsPaper_show.vue'

    import api from './api';

    export default {
        props: ['operationData', 'subject'],
        data() {
            return {
                id: '',
                loading: false,
                LastTableData: [],
                showModal: false,
                showId: {
                    id: 'showId',
                    title: '查看试卷'
                },
                //根据章节测评（点击苹果）
                getByChapter: {
                    ajaxSuccess: 'getByChapterSuccess',
                    ajaxParams: {
                        url: api.getByChapter.path,
                        params: {
                            chapterId: this.operationData.chapterId,
                        }
                    }
                }
            }
        },
        methods: {
            //初始化请求列表数据
            init() {
                Util = this.$util
                this.ajax(this.getByChapter)
            },
            getEvaluate() {
                let str = '';
                let level = this.operationData.level;
                if(level == 0) {
                    str = '当前章节掌握度为0，快来练习本章节试题实现零的突破。';
                } else if(level == 100) {
                    str = '恭喜你完美掌握，推荐你进行下一章节的练习。';
                } else {
                    let y = '略差';
                    if(level > 80) {
                        y = '极好'
                    } else if(level > 60) {
                        y = '较高'
                    } else if(level > 40) {
                        y = '一般'
                    }
                    str = `当前章节掌握度为：${level}%，掌握度${y}，建议通过适量的练习加强本章的掌握度，平时多注意总结，继续加油。`;
                }
                return str
            },
            //获取数据成功
            getByChapterSuccess(res) {
                let data = res.data;
                if(!data) return;
                data.map(item => {
                    if(item.answerTrueNum != null && item.answerFalseNum != null) {
                        item.right = ((item.answerTrueNum / (item.answerTrueNum + item.answerFalseNum)) * 100).toFixed(1) + '%' //准确率；
                    }
                })
                this.LastTableData = data
            },

            startExam() {
                let info = this.$store.getters['user/textbookVBySubject'](this.subject);
                this.$router.push({
                    path: `/choiceEvaluation/${this.$store.getters['user/info']('grade')}/2/${info.textbookVersionId}/${this.subject}`,
                    query: {
                        chapterId: this.operationData.chapterId
                    }
                })
            },

            viewPaper(item) {
                this.id = item.id;
                this.showModal = true;
            },

        },
        created() {
            this.init()
        },
        mounted() {
        },
        components: {
            coProgress,
            show
        },
    }

</script>
<style lang="scss">
    @import "../css/resultOfFirst.scss";

    .selfTextAlert-root {
        width: 560px;
        padding-bottom: 50px;
        .cursor {
            cursor: pointer;
        }
        h1 {
            width: 560px;
            font-size: 26px;
            margin-top: 0px;
        }
        .item {
            margin-top: 20px
        }
        .selfTextAlert-progress {
            width: 560px;
            height: 50px;
            border-radius: 5px;
            background-color: #fff7de;
            border: solid 1px #f8e1c3;
            margin: 20px 0;
            text-align: center;
            p {
                line-height: 30px;
            }
            .el-progress-bar__outer {
                height: 10px !important;
            }
            .el-progress-bar__innerText {
                display: none;
            }
            button {
                width: 98px;
                height: 50px;
                border-radius: 5px;
                background-color: #fd7416;
                float: left;
                border: none;
                color: #ffffff;
                font-weight: bold;
            }
            .el-progress-bar__innerText {
                display: none;
            }
        }
    }
</style>