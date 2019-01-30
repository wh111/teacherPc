<!--
****--@file     question.vue
****--@date     2018/3/17 15:06
****--@author   jhd
****--@describe   题库选择
-->
<template>
    <div class="question">
        <el-steps :active="active" finish-status="success">
            <el-step title="第一步"></el-step>
            <el-step title="第二步"></el-step>
        </el-steps>
        <div v-if="active == 0">
            <subject-head></subject-head>
        </div>
        <div v-else>
            <el-form ref="searchData" :model="searchData" label-width="80px">
                <el-form-item label="章节：">
                    <el-radio-group v-model="searchData.resource">
                        <el-radio label="全部"></el-radio>
                        <el-radio label="第一章"></el-radio>
                        <el-radio label="第二章"></el-radio>                            
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="知识点：">
                    <el-checkbox-group v-model="searchData.type">
                        <el-checkbox label="全部" name="type"></el-checkbox>
                        <el-checkbox label="汉语拼音" name="type"></el-checkbox>
                        <el-checkbox label="汉语默写" name="type"></el-checkbox>
                    </el-checkbox-group>
                    
                </el-form-item>
                <el-form-item label="难度：">
                    <el-select v-model="searchData.region" placeholder="请选择活动区域">
                        <el-option label="0.1" value="0.1"></el-option>
                        <el-option label="0.2" value="0.2"></el-option>
                    </el-select>
                    <el-button class="greenButton" type="success">筛选</el-button>
                </el-form-item>
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="30"></el-table-column>
                        <el-table-column prop="name" label="知识点" width="180">
                        </el-table-column>
                        <el-table-column prop="choice" label="选择题" width="180">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.chioce"></el-input>/30
                            </template>
                        </el-table-column>
                        <el-table-column prop="tiankong" label="填空">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.chioce"></el-input>/20
                            </template>
                        </el-table-column>
                        <el-table-column prop="jianda" label="简答">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.chioce"></el-input>/10
                            </template>
                        </el-table-column>
                    </el-table>
            </el-form>
        </div>
        <p class="bottom-btn-wrap">
            <el-button type="success" class="greenButton" @click="next">下一步</el-button>
            <el-button type="success">上一步</el-button>
            <el-button type="success" @click="submit">提交</el-button>
        </p>
    </div> 
</template>

<script>
    import subjectHead from '../../components/common/subjectHead.vue'
    export default{
        data(){
            return{
                active:1,
                searchData:{},
                tableData:[]
            }
        },
        created(){
        },
        methods:{
            handleSelectionChange(){

            },
            submit(){
                this.$emit('choice','question','成功！')
            },
            next(){
                this.active = 1
            }
        },
        components:{
            subjectHead
        }
    }
</script>