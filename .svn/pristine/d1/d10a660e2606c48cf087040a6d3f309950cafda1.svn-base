<!--
****--@file     payMent
****--@date     2018/1/10 下午1:31
****--@author   jhd
****--@describe   支付组件
-->
<template>
    <div class="pay-ment">
        <el-collapse-transition>
            <div v-show="isShowWechatPay" class="pay-money-wrap">
                <div class="wechatPay">
                    <i class="product-icon icon-wechatPay" v-if="payTypes=='1'"></i>
                    <span class="earnname" v-if="payTypes=='1'">微信支付</span>
                    <i class="product-icon icon-aliPay" v-if="payTypes=='0'"></i>
                    <span class="earnname" v-if="payTypes=='0'">支付宝支付</span>
                    <span class="paynum payhover">实付金额：
                        <span class="num">{{currentPrice | money }}</span>
                    </span>
                </div>
                <div class="pay-money clearfix">
                    <div class="img-wrap">
                        <img width="230" height="230"
                             :src="baseSrcWeChat"
                             alt="">
                    </div>
                    <div class="tip">
                        <h5 v-if="payTypes=='1'">请使用微信扫描二维码<br>以完成支付</h5>
                        <h5 v-else>请使用支付宝扫描二维码<br>以完成支付</h5>
                        <!--<p>-->
                        <!--<a href="http://cs.mogujie.com/help/faqdetail.html?questionId=16he" target="_blank"-->
                        <!--class="link">详细使用帮助</a>-->
                        <!--</p>-->
                        <!--<p>（如果支付遇到问题，可<a href="http://cs.mogujie.com/help/contactus.html" target="_blank"-->
                        <!--class="link">联系客服</a>）</p>-->
                    </div>
                </div>
            </div>
        </el-collapse-transition>
    </div>
</template>
<script>
    /*当前组件必要引入*/
    let Util = null
    export default {
        props: ['isShowWechatPay', 'baseSrcWeChat', 'payTypes', 'currentPrice'],
        data() {
            return {}
        },
        methods: {
            //初始化请求列表数据
            init() {
                Util = this.$util
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
    .pay-ment {
        .pay-money-wrap:hover {
            border-color: #ababab;
            border: 2px solid hsla(0, 0%, 67%, .5);
        }
        .pay-money-wrap {
            border: 2px solid #ababab;
            width: 795px;
            margin: 20px;
            position: relative;
            .product-icon {
                height: 28px;
                margin-left: 32px;
                display: inline-block;
                width: 28px;
                vertical-align: middle;
            }
            .earnname {
                width: 94px;
                font-size: 18px;
                display: inline-block;
                height: 56px;
                line-height: 56px;
            }
            .paynum {
                position: absolute;
                right: 0;
                top: 0;
                font-size: 14px;
                padding-right: 18px;
                display: inline-block;
                height: 56px;
                line-height: 56px;
                .num {
                    padding: 0 2px;
                    color: #f5456e;
                    vertical-align: baseline;
                    font-size: 18px;
                }
            }
            .icon-aliPay {
                background: url('../../assets/images/payMent.png') 0 -112px no-repeat;
            }
            .icon-wechatPay {
                background: url('../../assets/images/payMent.png') 0 -167px no-repeat;
            }
            .pay-money {
                height: 300px;
                .img-wrap {
                    float: left;
                    width: 45%;
                    height: 230px;
                    padding: 32px 0;
                    text-align: center;
                    background: #fff;
                }
                .tip {
                    float: left;
                    position: relative;
                    padding: 61px 0;
                    width: 55%;
                    height: 300px;
                    background: #f4f4f4;
                    h5 {
                        padding: 40px 0;
                        font: 700 20px/1.4 Microsoft YaHei;
                        text-align: center;
                        color: #999;
                    }
                    p {
                        text-align: center;
                        color: #999;
                    }
                }
                .tip:after {
                    content: "";
                    position: absolute;
                    top: 50%;
                    left: -64px;
                    margin-top: -48px;
                    height: 0;
                    overflow: hidden;
                    border-top: 48px solid #fff;
                    border-right: 32px solid #f4f4f4;
                    border-bottom: 48px solid #fff;
                    border-left: 32px solid #fff;
                }
            }
        }
    }
</style>
