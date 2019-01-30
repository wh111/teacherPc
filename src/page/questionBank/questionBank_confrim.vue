<!--
****--@file     questionBank_confrim
****--@date     2017/12/20 下午2:55
****--@author   jhd
****--@describe   确定订购
-->
<template>
    <div class="questionBank-confrim">
        <p class="modal-title" style="text-align: center;font-size: 26px;color: #313131;">确认兑换？</p>
        <p class="modal-content"
           style="margin-top:30px;font-size: 16px;line-height: 1.44;text-align: left;color: #313131;">
            此商品需要 {{ Price == null ? '0' : Price }} 分兑换，您的当前积分
            为 {{$store.state.user.userIntegral}} 分</p>
        <p class="modal-btn">
            <el-button @click="cancel">取消</el-button>
            <load-btn class="el-button-exchange" @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
        </p>
    </div>
</template>
<script>
	/*当前组件必要引入*/
    let Util = null
    // import api from "./api"

	export default {
        props: ['productId', 'currentPrice'],
        data() {
            return {
                MyIntegral: '',
                Price: this.currentPrice,
                formValidate: {
                    productId: this.productId
                },
                loadBtn: {title: "提交", callParEvent: "listenSubEvent"},
                addMessTitle: {
                    type: 'add',
                    callback: 'confirm',
                    successTitle: '兑换成功!',
                    errorTitle: '兑换失败!',
                    ajaxSuccess: this.confirmSuccess,
                    error: res => {
//                        console.log(res)
                    },
                    ajaxError: 'ajaxError',
                    ajaxParams: {
                        url: '/integral/payment',
                        method: post,
                    }
                },
            }
		},
        methods: {
			//初始化请求列表数据
            init() {
                Util = this.$util;
                this.MyIntegral = this.$store.getters['user/info']('integral');
                if(this.$store.getters['user/info']('vipStatus') == '1') {
                    this.Price = 0
                }
			},
            cancel() {
                this.$emit('cancel', this.addMessTitle.callback)
			},
            /**
             * 兑换成功回调函数
             * **/
            confirmSuccess(res) {
                this.$emit('confirm', 'confirm', '兑换成功！');
                this.ajax({
                    ajaxSuccess: res => {
                        this.$store.commit('app/setLogin', true);
                        this.$store.commit('user/updateInfo', res.data);
                        this.$store.commit('user/updateTextbookVersionList', res.data.textbookVersionList);
                    },
                    ajaxParams: {
                        url: '/student/getMyInfo'
                    }
                })
            },
            /*
            * 点击提交按钮 监听是否提交数据
            * @param isLoadingFun boolean  form表单验证是否通过
            * */
            listenSubEvent(isLoadingFun) {
                if(!isLoadingFun) isLoadingFun = function() {
                };
                isLoadingFun(true);
                this.addMessTitle.ajaxParams.data = this.getFormData(this.formValidate);
                this.ajax(this.addMessTitle, isLoadingFun)
            },
            /*
            * 获取表单数据
            * @return string  格式:id=0&name=aa
            * */
            getFormData(data) {
                let myData = Util._.defaultsDeep({}, data);
                return myData;
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
    .questionBank-confrim {
        .modal-btn {
            text-align: center;
            .el-button {
                border: 1px solid #fd7416;
                color: #fd7416;
                margin-top: 10px;
            }
            .el-button-exchange {
                background: #fd7416;
                color: #ffffff;
            }
            .exchange {
                margin-top: 20px;
            }
            .el-button:hover {
                background: #ffffff;
            }
            .el-button-exchange:hover {
                background: #fd7416;
                color: #ffffff;
            }
        }
    }

</style>
