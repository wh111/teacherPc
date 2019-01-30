<!--
****--@file     view
****--@date     2018/3/20 15:18
****--@author   YC
****--@describe 我的试题查看
-->
<template>
    <el-row class="cqqs-content">
        <h1 class="questionShowTitle">查看试题</h1>
        <el-form ref="showData" :model="showData" label-width="100px">
            <p>基本信息</p>
            <el-col>
                <el-col :span="8">
                    <el-form-item label="年级：" prop="grade">
                        {{ showData.grade | grade(self) }}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="科目：" prop="subject">
                        {{ showData.subject | subject }}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="学期：" prop="term">
                        {{ showData.term | term }}
                    </el-form-item>
                </el-col>
            </el-col>
            <el-col>
                <el-col :span="8">
                    <el-form-item label="题型：" prop="questionsTypeId">
                        {{ showData.questionsTypeName }}
                    </el-form-item>
                </el-col>
                <!-- 只有非组题时主题干部分才有分数 -->
                <el-col :span="8" v-if="!showData.groups">
                    <el-form-item label="分值：" prop="score">
                        {{ showData.score }}分
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="权限：" prop="openType">
                        {{ showData.openType | questionOpenType }}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="难度：" prop="diffLevelCode">
                        {{ showData.diffLevelCode | diffLevelCode(self) }}
                    </el-form-item>
                </el-col>
            </el-col>
            <!-- 非组题时题干部分才有知识点 -->
            <el-col v-if="!showData.groups">
                <el-form-item label="知识点：" prop="knowledgeList">
                    <el-tag style="margin-right: 5px" v-for="(tag,index) in showData.knowledgeList"
                            :key="index">
                        {{tag.name}}
                    </el-tag>
                </el-form-item>
            </el-col>

            <el-col>
                <question-show :showData="showData" v-if="showData.basicType" :show-answer="true"
                               :showScore="true"></question-show>
            </el-col>

            <el-col align="center" style="margin-top: 20px">
                <el-button size="small" @click="cancel">返回</el-button>
            </el-col>
        </el-form>
    </el-row>
</template>
<script>
  let Util = null

  import api from './api'
  import questionShow from '../../../components/questionShow/show'

  export default {
    name: 'myTestQuestionView',
    props: ['showId'],
    data () {
      return {
        self: this,
        showData: {}
      }
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        Util = this.$util
        let id = this.showId || this.$route.params.id || ''
        let option = {
          ajaxSuccess: res => {
            if (res.data instanceof Object) {
              this.showData = res.data
            }
          },
          ajaxError: () => this.errorMess('获取数据失败，请重试'),
          ajaxParams: {
            url: api.get.path,
            method: api.get.method,
            params: {
              id
            }
          }
        }
        !isNaN(id) && this.ajax(option)
      },
      cancel () {
        this.$router.back()
      }
    },
    components: {
      questionShow
    }
  }
</script>

<style lang="scss">
    .questionShowTitle {
        padding: 10px 0;
        margin-bottom: 10px;
        border-bottom: 1px solid #e5e5e5;
    }

    .cqqs-content {
        padding: 20px;
        .el-form {
            padding-left: 40px;
        }
        .showDataBox {
            .el-col-24 {
                padding-left: 40px;
            }
        }
        .qc_options {
            margin-left: 30px;
        }
        p {
            font-size: 15px;
            line-height: 30px;
        }
        .width .el-input, .width .el-textarea {
            width: 600px;
        }
    }
</style>
