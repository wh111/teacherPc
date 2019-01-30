<!--
****--@file     Troubleshooting_index
****--@date     2018/3/15 下午2:11
****--@author   jhd
****--@describe   疑难问题 首页
-->
<!--
****--@file     Troubleshooting.vue
****--@date     2017/12/13 下午4:17
****--@author   王恒
****--@describe  疑难问题
-->
<template>
    <div>
        <div style="background: #efefef">
            <div class="Troubleshooting-root">
                <div class="left">
                    <div class="groupsSelect">
                        <div class="groupsLeft" :class="{active:selectTab==1}" @click="change1(1)">已解答</div>
                        <div class="groupsRight" style="margin: 0 2px" :class="{active:selectTab==2}" @click="change1(2)">未解答</div>
                        <div class="groupsRight" :class="{active:selectTab==3}" @click="change1(3)">我的回答</div>
                        <!--<router-link :to="{path:'/TroubleshootingResult',query:{name:input||''}}">-->
                            <!--<button>搜索</button>-->
                        <!--</router-link>-->
                        <!--<el-input style="float: right" v-model="input" placeholder="请输入内容"></el-input>-->
                    </div>
                    <select-left-table v-if="selectTab==1"></select-left-table>

                    <select-table v-if="selectTab==2"></select-table>
                    <my-answer-list v-if="selectTab==3"></my-answer-list>
                </div>

            </div>
        </div>

    </div>
</template>
<script>

    import api from "./api"
    import subject from '../../components/common/subject.vue'
    import selectTable from './components/sleectTable.vue'
    import selectLeftTable from './components/selectLeftTable.vue'
    import myAnswerList from './components/myAnswerList.vue'

    let Util = null;
    export default {
        data() {
            return {
                selectTab: 1,
                showItems: ['subject', 'grade', 'sort'],
                input: '',
                selectRank: 1,

            }
        },
        created() {
            Util = this.$util;


        },
        methods: {

            change1(index) {
                this.selectTab = index;
            },





        },
        components: {
            subject,
            selectTable,
            selectLeftTable,
          myAnswerList
        },

    }


</script>
<style lang="scss">
    @import "../css/Troubleshooting.scss";

</style>