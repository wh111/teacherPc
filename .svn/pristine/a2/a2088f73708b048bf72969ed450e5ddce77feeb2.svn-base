<!--
****--@file     selectLeftTable
****--@date     2018/1/13 0:37
****--@author   wh
****--@describe   已解答
-->
<template>
    <div>

        <subject :showItems="showItems" @change="change" style="padding: 30px 30px"></subject>
        <div>
            <div id="myTable1">
                <el-table
                        @row-click="seeDatail"
                        :data="LastTableData"
                        border
                        style="width: 100%">
                    <el-table-column

                            prop="grade"
                            label="年级"
                            align="center">
                        <template slot-scope="scope">
                            {{ scope.row.grade | grade(self)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="subject"
                            label="科目"
                            align="center">
                        <template slot-scope="scope">
                            {{ scope.row.subject | subject}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="title"
                            label="问题"
                            align="center" width="200" style="overflow: hidden;white-space: nowrap !important;">
                        <template slot-scope="scope">
                            <em style="font-style:italic;color: #1cc03b" v-if="scope.row.appointMe">ToMe</em>
                            {{scope.row.title}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="createTime"
                            label="时间"
                            align="center" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.createTime | formatDate('yyyy-MM-dd HH:mm')}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="questionerName"
                            label="提问人"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            label="奖励"
                            align="center">
                        <template slot-scope="scope">
                            {{ scope.row.rewardIntegral}}积分

                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="replyNum"
                            label="回复数"
                            align="center">
                    </el-table-column>
                </el-table>

            </div>
            <div class="pagination" style="width: 920px">
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
            <div style="clear: both"></div>

        </div>
    </div>
</template>
<script>
    /*当前组件必要引入*/
    let Util = null
    import subject from '../../../components/common/subject.vue'
    import api from "../api"

    export default {
        data() {
            return {
            	self:this,
              showItems: ['subject', 'grade'],
                input: '',
                LastTableData: [],
                totalCount: 0,
                formValidate: {
                    grade: '',
                    subject: '',
                    isAdopt: 1,
                  isMy: false,
                },

            }
        },
        created() {
            Util = this.$util;
            this.myPages = Util.pageInitPrams;
          this.myPages.currentPage=1;
          this.queryQptions = {
                url: api.searchContent.path,
                params: {
                    curPage: 1,
                    pageSize: Util.pageInitPrams.pageSize,
                },
            }
            this.setTableData();
        },
        methods: {
            seeDatail(row, event, column) {
              this.$router.push({path: '/selfCenter/searchDetail', query: {id: row.id}})
            },
            change(i) {
                this.formValidate.grade = i.grade;
                this.formValidate.subject = i.subject;
                this.setTableData();
            },
            setTableData(isLoading) {
                this.queryQptions.params = Object.assign(this.queryQptions.params, this.formValidate);
                this.ajax({
                    ajaxSuccess: this.listDataSuccess,
                    ajaxParams: this.queryQptions,
                }, isLoading)
            },
            listDataSuccess(res) {
                this.LastTableData = res.data.dataList;
                this.totalCount = res.data.totalCount;
            },


        },
        components: {
            subject,

        },

    }

</script>
<style lang="scss">

</style>