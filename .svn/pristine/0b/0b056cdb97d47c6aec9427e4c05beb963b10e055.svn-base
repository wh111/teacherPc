<!--
****--@file     seeDetail
****--@date     2018/1/13 10:53
****--@author   wh
****--@describe   信息详情
-->
<template>
    <el-row class="systemSeeDetail-root" style="font-size: 14px">
        <el-form>
            <el-col :span="12">
                <el-form-item label="消息发送人：">{{item.operator}}</el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="创建时间：">{{item.createTime | formatDate('yyyy-MM-dd HH:mm')}}</el-form-item>
            </el-col>
            <el-col>
                <el-form-item label="标题：">{{item.title}}</el-form-item>
            </el-col>
            <el-col>
                <el-form-item label="内容：">{{item.content}}</el-form-item>
            </el-col>
            <el-col v-if="type=='Add_Friend'||type=='Join_Group'" align="right">
            <el-button class="btn yellowOrange" :disabled="item.joinStatus==1"   @click="sure(2)">同意并添加</el-button>
            <el-button class="btn yellowOrange" :disabled="item.joinStatus==1"  @click="sure(3)">拒绝</el-button>
            </el-col>
        <!--<dl style="width: 100%">-->
            <!--<dt style=""> 消息发送人：{{item.operator}}<span style="margin-left: 100px"> 创建时间{{item.createTime | formatDate('yyyy-MM-dd HH:mm')}}</span>-->
            <!--</dt>-->
            <!--<dd> 标题：{{item.title}}</dd>-->
            <!--<dd> 内容：{{item.content}}</dd>-->
            <!--<div v-if="type=='Add_Friend'||type=='Join_Group'" style="float: right; ">-->
                <!--<el-button class="btn" :disabled="item.joinStatus==1"   @click="sure(2)">同意并添加</el-button>-->
                <!--<el-button class="btn" :disabled="item.joinStatus==1"  @click="sure(3)">拒绝</el-button>-->
            <!--</div>-->
            <!--<div style="clear: both"></div>-->
        <!--</dl>-->
        </el-form>
    </el-row>
</template>
<script>
  /*当前组件必要引入*/
//:disabled="item.status==2"
  let Util = null
  import api from './api'

  export default {
    props: ['id', 'type', 'operatorId','busId','status','messageId'],
    data () {
      return {
        item: {},
        sendStatus:''
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        Util = this.$util
        this.ajax({
          ajaxSuccess: this.getMessageSuccess,
          ajaxParams: {
            //baseURL:'PUBLIC',
            url: api.get.path,
            method: api.get.method,
            params: {
              id: this.id,
            },
          },
        })
      },
      getMessageSuccess (res) {
        this.$store.state.user.userMsgNumber = true
        this.item = res.data
      },
      sure (index) {
        this.sendStatus=index;
        if(this.type=='Add_Friend'){
          this.ajax({
            ajaxSuccess: this.makeSuccess,
            ajaxParams: {
              //baseURL:'PUBLIC',
              url: api.auditing.path,
              method: api.auditing.method,
              data: {
                status: index,
                studentId: this.operatorId,
              },
            },
          })
        }else if(this.type=='Join_Group'){
          this.ajax({
            ajaxSuccess:this.makeSuccess,
            ajaxParams: {
              //baseURL:'PUBLIC',
              url: api.modifyStudent.path,
              method: api.modifyStudent.method,
              data: {
                groupId:this.busId,
                status: index,
                id: this.id,
                studentId: this.operatorId,
//                id:this.messageId,
                userType:'Student',
              },
            },
          })
        }

      },
      makeSuccess () {
        if (this.sendStatus == 2) {
          var str = '添加成功'
        } else if (this.sendStatus == 3) {
          var str = '已拒绝'
        }
        this.$message({
          message: str,
          type: 'success'
        })

        this.$emit('seeSystemEnd')
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
    .systemSeeDetail-root {
        .btn {
            border: none;
            background-color: rgb(253, 116, 22);
            color: rgb(255, 255, 255);
        }
    }
</style>