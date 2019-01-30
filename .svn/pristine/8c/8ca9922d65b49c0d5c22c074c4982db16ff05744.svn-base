<!--
****--@file     stepThree
****--@date     2018/3/19 16:59
****--@author   ${王恒}
****--@describe   组卷第三步
-->
<template>
    <div class="stepThree-root">
        <el-table class="table"
                  :data="tableData3"
                  height="250"
                  border
                  style="width: 600px;text-align: center">
            <el-table-column
                    prop="date1"
                    label=" ">
                <template slot-scope="scope">

                    <el-checkbox v-model="checked">汉语拼音</el-checkbox>
                </template>
            </el-table-column>
            <el-table-column
                    prop="date"
                    label="数量">
                20
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="单题分值">
                <template slot-scope="scope">
                    40
                </template>
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="知识点">
                汉语拼音

                汉字笔画
            </el-table-column>
        </el-table>
        <!--<p><span style="font-size: 14px;color: #5a5e66;">定义分数：</span>-->
            <!--<el-radio v-model="radio" label="1">使用试题库分数，并将总分折算为100分-->
            <!--</el-radio>-->
        <!--</p>-->
    </div>
</template>
<script>
  /*当前组件必要引入*/
  let Util = null
  export default {
    data () {
      return {
        radio: '',
        tableData3: []
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        Util = this.$util
      }
      
    },
    created () {
      this.init()
    },
    mounted () {
    },
    components: {}
  }

</script>
<style lang="scss">
    .stepThree-root {
        margin: 0 auto;
        text-align: center;
        .table {
            margin-left: 150px;
        }
    }
</style>