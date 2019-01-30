<!--
****--@file     newWork
****--@date     2018/3/15 17:09
****--@author   wh
****--@describe   创建任务
-->
<template>

    <div class="selfData-root">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="base-introduce">
            <el-form-item label="任务名称："  :span="10"  prop="account">
                <el-input v-model="ruleForm.account"></el-input>
            </el-form-item>
            <!--<el-form-item label="昵称" prop="nickname">-->
            <!--<el-input v-model="ruleForm.nickname" style="width: 180px"></el-input>-->
            <!--</el-form-item>-->
            <el-form-item label="任务类型：">
                <el-select v-model="ruleForm.region" placeholder="请选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="任务描述：" prop="content">
                <simditor @valuechanged="getInfo"></simditor>
            </el-form-item>
            <el-form-item label="选择赛季：" prop="content">
                <el-radio-group v-model="ruleForm.subject">
                    <el-radio v-for="(item,index) in subjectList" :label="item.code" :key="index">{{ item.value }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="选择时间：" prop="content">
                <data-group ></data-group>
            </el-form-item>
            <el-form-item label="发布至：" prop="content">
                <el-button class="float" @click="changeColor('all')">全体学生</el-button>
                <el-button class="float" @click="changeColor('mygroup')">我的班组</el-button>
            </el-form-item>
            <el-form-item label="任务内容：" prop="content">
                <el-button @click="choice">进入题库</el-button>
            </el-form-item>


        </el-form>
        <p style="margin: 0 auto;text-align: center">
            <load-btn :btnData="loadBtn" @listenSubEvent="listenSubEvent"></load-btn>
        </p>
        <!--选择群组-->
        <Modal :mask-closable="false" v-model="groupModal" height="400" title="对话框标题" class-name="vertical-center-modal"
               :width="800">
            <modal-header slot="header" :content="groupId"></modal-header>
            <div v-if="groupModal">
                <el-checkbox-group v-model="ruleForm.checkList">
                    <el-checkbox style="margin-left:30px" label="1">初三一班一组</el-checkbox>
                    <el-checkbox label="2">初三一班一组</el-checkbox>
                    <el-checkbox label="3">初三一班二组</el-checkbox>
                    <el-checkbox label="4">初三一班</el-checkbox>
                    <el-checkbox label="5">初三一班一组</el-checkbox>
                    <el-checkbox label="6">初三一班二组</el-checkbox>
                </el-checkbox-group>
                <p style="text-align:center;margin-top:20px">
                    <el-button @click="cancel('group')" class="whiteButton">取消</el-button>
                    <el-button @click="saveGroupEvent"  class="greenButton" type="success">确定</el-button>
                </p>
            </div>
            <div slot="footer"></div>
        </Modal>
        <!--选择题库-->
        <Modal :mask-closable="false" v-model="questionModal" height="400" title="对话框标题" class-name="vertical-center-modal"
               :width="800">
            <modal-header slot="header" :content="questionId"></modal-header>
            <question-view v-if="questionModal" @cancel="cancel" @choice="subCallback"></question-view>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
    /*当前组件必要引入*/
    import rules from './rules.js'
    import simditor from '../../components/common/simditor.vue'
    import dataGroup from '../../components/common/dateGroup.vue'
    import questionView  from './questions.vue'
    let Util = null
    export default {
        data() {
            return {
                ruleForm:{
                    region:'',
                    people:'',
                    checkList:[]
                },
                subjectList:[{code:'第一赛季',value:'第一赛季'},{code:'第二赛季',value:'第二赛季'}],
                rules,
                type:'all',//选择发布类型
                saveBtn: {title: "保存", callParEvent: "saveGroupEvent", type: 'success'},
                loadBtn: {title: '保存', callParEvent: 'listenSubEvent'},
                groupModal: false,
                questionModal:false,
                questionId:{
                    id: 'questionId',
                    title: '选择题库',
                },
                groupId: {
                    id: 'groupId',
                    title: '选择小组',
                },
                loading:false,
                typeIsee:'submitMetion'
            }
        },
        methods: {
            //初始化请求列表数据
            init() {
                Util = this.$util
            },
            /*
            * 监听子组件通讯的方法
            * 作用:根据不同的参数关闭对应的模态
            * @param targer string example:"add"、"edit"
            * */
            cancel(targer) {
                this[targer + 'Modal'] = false;
            },
            listenSubEvent(isLoadingFun) {
                this.$emit('add','add','添加任务成功！')
            },
            saveGroupEvent(){
                this.cancel('group');
            },
            choice(){
                this.openModel('question')
            },
            setTableData(){

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
                    this.setTableData();
                }
            },
            /*
            * 打开指定的模态窗体
            * @param options string 当前指定的模态:"add"、"edit"
            * */
            openModel(options) {
                this[options + 'Modal'] = true;
            },
            getInfo(content) {

                if(content.length > 10000) {
                    this.$message({
                        showClose: true,
                        message: '输入字数过多',
                        type: 'error'
                    });

                }

                this.formValidate.content = content
            },
            changeColor(val){
                if(val == 'all'){
                    this.type=val;
                }else{
                    this.groupModal = true
                }
                
            }

        },
        created() {
            this.init();
        }
        ,
        mounted() {
        }
        ,
        components: {
            simditor,dataGroup,questionView
        }
    }

</script>
<style lang="scss">
    .selfData-root{
        width: 97%;
        .float{
            float: left;
        }
        .mar{
            margin-left: 10px;
        }
        .base-introduce{
            margin-top: 0 !important;
        }
    }
</style>