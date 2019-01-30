<!--
****--@file     subject
****--@date     2017/12/12 下午5:37
****--@author   jhd
****--@describe   选择科目
-->
<template>
    <div class="subject-head">
        <p v-if="~showItem.indexOf('grade')">
            <b>年级：</b>
            <span v-if="hasAll" @click="changeMoudle('grade','')" :class="select.grade === '' ? 'active' : ''">全部</span>
            <span v-for="index in 12" :key="index"
                  :class="select.grade == index ? 'active' : ''"
                  @click="changeMoudle('grade',index)"><i></i>{{ index | grade(self) }}</span>
        </p>
        <p v-if="~showItem.indexOf('subject')">
            <b>科目：</b>
            <span v-if="hasAll" @click="changeMoudle('subject','')"
                  :class="select.subject == '' ? 'active' : ''">全部</span>
            <span v-for="(item,id) in subjectList" :key="id"
                  :class="select.subject == item.code ? 'active' : ''"
                  @click="changeMoudle('subject',item.code)"><i></i>{{ item.value }}</span>
            <template v-if="!hasAll && !subjectList">
                暂无科目
            </template>
        </p>
        <p v-if="~showItem.indexOf('status')">
            <b>选择状态：</b>
            <span v-if="hasAll" @click="changeMoudle('status','')"
                  :class="select.status === '' ? 'active' : ''">全部</span>
            <span v-for="(item,index) in statusList" :key="index"
                  :class="select.status == item.code ? 'active' : ''"
                  @click="changeMoudle('status',item.code)"><i></i>{{ item.value }}</span>
        </p>
        <p v-if="~showItem.indexOf('answerStatus')">
            <b>选择状态：</b>
            <span v-if="hasAll" @click="changeMoudle('answerStatus','')"
                  :class="select.answerStatus === '' ? 'active' : ''">全部</span>
            <span v-for="(item,index) in answerStatusList" :key="index"
                  :class="select.answerStatus == item.code ? 'active' : ''"
                  @click="changeMoudle('answerStatus',item.code)"><i></i>{{ item.value }}</span>
        </p>
        <p v-if="~showItem.indexOf('sort')">
            <b>选择状态：</b>
            <span v-if="hasAll" @click="changeMoudle('sort','')"
                  :class="select.sort === '' ? 'active' : ''">全部</span>
            <span v-for="(item,index) in sortList" :key="index"
                  :class="select.sort == item.code ? 'active' : ''"
                  @click="changeMoudle('sort',item.code)"><i></i>{{ item.value }}</span>
        </p>
    </div>
</template>
<script>
    /*当前组件必要引入*/
    let Util = null
    export default {
        props: {
            showItems: { // 显示项 --> ['textbookVersion']
                type: Array,
                default: () => []
            },
            selectItems: { // 初始化选中项 --> {textbookVersion:id}
                type: Object,
                default: () => ({})
            },
            hasAll: { // 是否有“全部”
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
            	self:this,
                allSubject: {},
                // 显示项
                showItem: ['grade', 'subject', 'status', 'answerStatus', 'sort'],
                subject: '',
                subjectList: [],
                statusList: [
                    {
                        value: '已解答',
                        code: '1'
                    }, {
                        value: '未解答',
                        code: '0'
                    }],
                answerStatusList: [
                    {
                        value: '已采纳',
                        code: '1'
                    }, {
                        value: '未采纳',
                        code: '0'
                    }],
                sortList: [
                    {
                        value: '最新问题',
                        code: 'CREATE_TIME'
                    },
                    {
                        value: '精选问题',
                        code: 'VIEW_NUM'
                    }
                ],
                // 选中项
                select: { // 选中数据
                    grade: '', // 年级
                    subject: '', // 科目
                    status: '', // 状态
                    answerStatus: '',//解答状态
                    sort: ''//排序
                },
            }
        },
        methods: {
            //初始化请求列表数据
            init() {
                Util = this.$util;
                if(this.showItems.length) {
                    this.showItem = this.showItems
                    for(let key in this.showItem) {
                        if(this.showItem[key] == 'grade') {
                            this.changeGradeCall()
                        }
                    }
                }
                this.changeGradeCall()
            },
            //选择年级后回调
            changeGradeCall(showAll) {
              console.log(this.$store.getters['app/envs']('gradeMap'))
                if(!this.select.grade) {
                    let grade = this.$store.getters['user/info']('grade');
                    this.subjectList = this.$store.getters['app/envs']('gradeMap')[10];
                    return
                }
                // 科目处理
                this.select.subject = '';
                if(this.allSubject[this.select.grade]) { // 缓存中是否存在该年级的科目
                    this.subjectList = this.$util.getFormData(this.allSubject[this.select.grade])
                } else {
                    this.subjectList = this.$store.getters['app/envs']('gradeMap')[this.select.grade];
                }
                if(showAll){
                  this.subjectList = this.$store.getters['app/envs']('gradeMap')[10];
                }
            },
            // 选择数据
            changeMoudle(type, id) {
                this.select[type] = id
//                if(this.select[type] === id) return;
//                this.select[type] = id !== undefined ? id : '';
                // 做对应类型的回调处理
                let callFun = this['change' + type.replace(/^\w/, type[0].toLocaleUpperCase()) + 'Call'];
                if(typeof callFun === 'function') {
                    callFun()
                }
                let data = {};
                this.showItem.map(type => data[type] = this.select[type]);
//                this.showItem.map(type => data[type] = this.getSelectData(type));
                this.$emit('change', data, this.select);
            },
            // 获取选择数据
            getSelectData(type) {
                // 如果有值则返回对象，否则返回空字符
                return this[type + 'List'] && this[type + 'List'][this.select[type]] || this.select[type]
            },
            chioce(item) {
                this.subject = item
            }

        },
        created() {
            this.init();
        },
        mounted() {
        },
        components: {}
    }

</script>
<style lang="scss">
    .subject-head {
        padding-left: 10px;
        p {
            height: 30px;
            font-size: 14px;
            .active {
                color: #fd7416;
                font-weight: bold;
            }
            span {
                margin-right: 15px;
                cursor: pointer;
            }
        }
    }
</style>