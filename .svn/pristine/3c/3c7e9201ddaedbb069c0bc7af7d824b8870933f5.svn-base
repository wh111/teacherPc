<!--
****--@file     createByPerson
****--@date     2018/3/20 10:13
****--@author   ${王恒}
****--@describe   人工组卷
-->
<template>
    <div class="createByPerson-root">
        <subject-type></subject-type>
        <p class="p">已选题目 <span v-for="item in select" :key='item.option'><span
                class="selectTit">{{item.option}}( {{item.num}} ) </span> </span>
            <el-button class="btn" @click='printModal=true'>查看详情</el-button>
        </p>
        <h1>题库</h1>
        <el-row>
            <el-col :span='6'>
                题型：
                <el-select style="width: 60%" v-model="selectOption.types">
                    <el-option label="填空题" value='1'></el-option>
                    <el-option label="选择题" value='2'></el-option>
                </el-select>
            </el-col>
            <el-col :span='6'>
                难度：
                <el-select style="width: 60%" v-model="selectOption.types">
                    <el-option label="填空题" value='1'></el-option>
                    <el-option label="选择题" value='2'></el-option>
                </el-select>
            </el-col>
            <el-col :span='6'>
                知识点：
                <el-select style="width: 60%" v-model="selectOption.types">
                    <el-option label="填空题" value='1'></el-option>
                    <el-option label="选择题" value='2'></el-option>
                </el-select>
            </el-col>
            <el-col :span='6'>
                来源：
                <el-select style="width: 60%" v-model="selectOption.types">
                    <el-option label="填空题" value='1'></el-option>
                    <el-option label="选择题" value='2'></el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="list-content" v-for="item in list">
            <div class="title">
                {{item.title}}
            </div>
            <el-row>
                <el-col :span="6">
                    题型：{{item.types }}
                </el-col>
                <el-col :span="6">
                    难度：{{item.cens }}
                </el-col>
                <el-col :span="6">
                    分值：{{item.cions }}分
                </el-col>
                <el-col :span="6">
                    <el-button style="float: right">添加</el-button>
                </el-col>
            </el-row>
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
        <Modal :mask-closable="false" v-model="printModal" class-name="vertical-center-modal-print"
               :width="1500">
            <modal-header slot="header" :parent="self" :content="printDataId"></modal-header>
            <print v-if="printModal" @cancel="cancel" @print="printDone">
                <el-col :span='10'>
                    <div class="display">
                        <el-form ref="form" :model="form" label-width="120px">
                            <el-form-item label="难度预估：">
                                {{form.dif}}
                            </el-form-item>
                            <el-form-item label="答题时长：" prop="name">
                                <el-col :span="10">
                                    <el-input v-model="form.name"></el-input>

                                </el-col>
                                <el-col :span='10'>
                                    分钟
                                </el-col>
                            </el-form-item>
                            <el-form-item label="发布时间：" prop="name">

                                <data-group :dateGroup="{text:'截至时间：',templateType:'1' }"></data-group>

                            </el-form-item>
                            <el-form-item label="公布答案：" prop="name">
                            </el-form-item>

                            <el-form-item label="防舞弊设置：" prop="name">
                                <el-checkbox-group v-model="form.checkList">s
                                    <el-checkbox label="a">题目顺序随机</el-checkbox>
                                    <el-checkbox label="B">选择题候选项随机</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="发布至：" prop="name">
                                <el-checkbox-group v-model="form.checkList">
                                    <el-checkbox label="a">初三一班</el-checkbox>
                                    <el-checkbox label="B">初三二班</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>

                        </el-form>
                    </div>
                </el-col>
                <el-col :span='14'>
                    <div class="printBPMain" style="min-height: 600px">

                    </div>
                </el-col>
                <div slot="footer"></div>
            </print>
            <!--<div slot="footer"></div>-->
        </Modal>
    </div>
</template>
<script>
  /*当前组件必要引入*/

  let Util = null
  import subjectType from '../../../components/common/subjectHead.vue'
  import print from '../../../components/common/print.vue'
  import dataGroup from '../../../components/common/dateGroup.vue'
  export default {
    data () {
      return {
        form: {name: '', dif: '2.4'},
        self: this,
        printModal: false,
        totalCount: 10,
        printDataId: {
          id: 'printDataId',
          title: '打印'
        },
        select: [
          {option: '选择题:', num: '1'},
          {option: '填空题:', num: '1'}],
        selectOption: {
          types: '',
        },
        list: [{
          title: '题目：据统计，2009年嘉兴市人均GDP约为4.49×104元，比上年增长7.7%，其中，近似数4.49 ×104有______个有效数字．',
          types: '填空题',
          cens: '2.0',
          cions: '2'
        },
          {
            title: '题目：据统计，2009年嘉兴市人均GDP约为4.49×104元，比上年增长7.7%，其中，近似数4.49 ×104有______个有效数字．',
            types: '填空题',
            cens: '2.0',
            cions: '2'
          },
          {
            title: '题目：据统计，2009年嘉兴市人均GDP约为4.49×104元，比上年增长7.7%，其中，近似数4.49 ×104有______个有效数字．',
            types: '填空题',
            cens: '2.0',
            cions: '2'
          },
          {
            title: '题目：据统计，2009年嘉兴市人均GDP约为4.49×104元，比上年增长7.7%，其中，近似数4.49 ×104有______个有效数字．',
            types: '填空题',
            cens: '2.0',
            cions: '2'
          }],

      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        Util = this.$util
        this.myPages = Util.pageInitPrams
        this.queryQptions = {
          url: '',
          params: {
            curPage: 1,
            pageSize: Util.pageInitPrams.pageSize,
          },
        }
      },
      setTableData (isLoading) {
//        this.queryQptions.params = Object.assign(this.queryQptions.params, this.formValidate);
//        this.ajax({
//          ajaxSuccess: this.listDataSuccess,
//          ajaxParams: this.queryQptions,
//        }, isLoading)
      },
      listDataSuccess (res) {

//        this.LastTableData = res.data.dataList;
//        //this.LastTableData=[];
//        this.totalCount = res.data.totalCount;
//        if(this.formValidate.sort == "VIEW_NUM" && this.great == 1) {
//          this.LastTableData = [];
//          this.totalCount = 0;
//          for(var i = 0; i < res.data.dataList.length; i++) {
//            if(res.data.dataList[i].viewNum >= 1000) {
//              this.LastTableData.dataList.push(res.data.dataList[i])
//              this.totalCount++
//            }
//          }
//        }

      },
      printDone () {

      },
      // 取消
      cancel (targer) {
        this[targer + 'Modal'] = false
      },
      
    },
    created () {
      this.init()
    },
    mounted () {
    },
    components: {
      subjectType, print, dataGroup
    }
  }

</script>
<style lang="scss">
    .vertical-center-modal-print .ivu-modal-footer button {
        visibility: hidden;
    }
    .createByPerson-root {
        padding: 20px;
        h1 {
            line-height: 70px;
            font-size: 20px;
        }
        .p {
            padding: 5px 0px;
        }
        .selectTit {
            padding: 0 10px;
        }
        .btn {
            background-color: #1cc03b;
            color: white;
            float: right;
        }
        .list-content {
            padding: 10px;
            margin: 10px 0;
            font-size: 14px;
            background-color: #f5f5f5;
            .title {
                height: 40px;
                line-height: 20px;
            }
        }
    }
</style>