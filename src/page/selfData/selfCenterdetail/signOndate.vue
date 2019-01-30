<!--
****--@file     signOndate.vue
****--@date     2017/12/25 9:29
****--@author   王恒
****--@describe  签到日历
-->


<template>
    <div class="signOndate">
        <p class="signOndatetitle">每日签到领积分</p>
        <div class="days"><span class="orangeItem">日</span>
            <span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span class="orangeItem">六</span>
        </div>
        <div class="daysDetail" id="daysDetail">
            <div v-for="item in length" :key="item"></div>
        </div>
        <dl>
            <dd>每日签到，第一天签到获得1积分，第二天签到获得<b style="color:#fd7416 ">2</b>积分，</dd>
            <dd>以此类推，连续签到直到第20天，从21天起至当月最后一天，每日签到获得固定积分<b style="color:#fd7416 ">20</b>分。</dd>
            <dd>若前二十天内签到有间断，则从该日其第二日获得<b style="color:#fd7416 ">1</b>积分。签到每月第一天刷新。</dd>
            <!--<dd style="margin-top: 20px;padding-bottom: 44px">当月奖励将于下月月初自动发放至会员账户内</dd>-->
        </dl>
    </div>

</template>
<script>
    import api from './api'

    export default {
        data() {
            return {
                length: 42,
                signList: []
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                this.signList = this.$store.getters['user/signList'];
                var today = new Date();
                var year = today.getFullYear();
                var month = today.getMonth();
                var firstday = new Date(year, month, 1);
                var dayofWeek = firstday.getDay();
                if(this.signList.length == 0) {
                    this.ajax({
                        ajaxSuccess: res => {
                            this.$store.commit('user/updatesignList', res.data);
                            this.signList = res.data;
                            dayofWeek > 4 ? this.signList.length > 30 ? this.length = 42 : this.length = 35 : this.length = 35
                        },
                        ajaxParams: {
                            url: '/sign/list'
                        }
                    })
                } else {
                    dayofWeek > 4 ? this.signList.length > 30 ? this.length = 42 : this.length = 35 : this.length = 35
                }
                ;
                this.$nextTick(function() {
                    var daysDetail = document.getElementById('daysDetail')
                    if(this.signList.length == 0) {
                        this.ajax({
                            ajaxSuccess: res => {
                                this.$store.commit('user/updatesignList', res.data);
                                this.signList = res.data;
                                this.signList.map(function(item, index) {
                                    if(item.whetherSign) {
                                        daysDetail.children[index + dayofWeek].innerText = '已签到';
                                        daysDetail.children[index + dayofWeek].setAttribute('class', 'isSign')
                                    } else {
                                        daysDetail.children[index + dayofWeek].innerText = index + 1;
                                    }
                                })
                            },
                            ajaxParams: {
                                url: '/sign/list'
                            }
                        })
                    } else {
                        this.signList.map(function(item, index) {
                            if(item.whetherSign) {
                                daysDetail.children[index + dayofWeek].innerText = '已签到';
                                daysDetail.children[index + dayofWeek].setAttribute('class', 'isSign')
                            } else {
                                daysDetail.children[index + dayofWeek].innerText = index + 1;
                            }
                        })
                    }
                    ;
                })
            },
        },
        mounted() {

        },

    }

</script>
<style lang="scss">
    .signOndate {
        .orangeItem {
            color: #fd7416;
        }
        /*.bold{*/
        /*font-weight: bold;*/
        /*color: #fd7416;*/
        /*}*/
        color: #313131;
        margin: 0 auto;
        text-align: center;
        .days {
            width: 410px;
            display: flex;
            margin-left: 200px;
        }
        span {
            flex: 1;
            font-size: 12px;
            line-height: 60px;
        }
        .daysDetail {
            width: 410px;
            height: 308px;
            margin-left: 200px;
            div {
                width: 50px;
                height: 50px;
                font-size: 18px;
                margin-left: 8px;
                margin-bottom: 10px;
                line-height: 50px;
                cursor: pointer;
                color: #a0a0a0;
                border: 1px solid #ccc;
                float: left;

            }
            .isSign {
                background: #fd7416;
                color: #ffffff;
                border-color: #fd7416;
                font-size: 14px;
            }
            .todaySignon {
                font-size: 16px;
                color: #ffffff;
                background: #8c939d;
                padding: 5px;
                line-height: 20px;
            }
            .last {
                margin-right: 0;
            }
        }
        dl {
            margin: 10px 0 0 50px;
            text-align: center;
            dd {
                line-height: 24px;
                height: 24px;
                font-size: 12px;
                width: 100%;
                text-align: center;
                p {
                    width: 100%;
                    line-height: 24px;
                    height: 24px;
                    text-align: center;
                }
                span {
                    color: #fd7416;
                }
            }

        }

    }

    .signOndatetitle {
        font-size: 26px;
        line-height: 40px;
    }

    .signOn-detail .ivu-modal-header {
        border-bottom: none;
    }

    .signOn-detail .ivu-modal-wrap {
        border-bottom: none;
    }

    .signOn-detail .ivu-modal-footer {
        display: none;
    }
</style>