<!--
****--@file     selfAnsweringQuestion_show
****--@date     2017/12/15 下午2:37
****--@author   jhd
****--@describe   查看我的答疑
-->
<template>
    <div class="selfAnsweringQuestion-show">
        <div class="wrap">
            <div class="show-head">
                <p class="title">{{detail.title}}</p>
                <p class="tip">
                    <span>发表人：{{detail.questionerName}}</span> <span>|</span>
                    <span>年级：{{detail.grade | grade(self)}}</span> <span>|</span>
                    <span>科目：{{detail.subject | subject}}</span> <span>|</span>
                    <span>日期：{{detail.createTime | formatDate('yyyy-MM-dd HH:mm')}}</span>
                    <span>悬赏积分：{{detail.rewardIntegral}}积分</span>
                </p>
            </div>
            <div class="show-content">
                <!--<p style="font-size: 14px; color: #a0a0a0;margin-top: 10px;text-indent:0;">问题详情</p>-->
                <p v-html="detail.content"></p>
                <!--<div class="img-wrap">-->
                <!--<img width="230" src="../../../assets/images/ques-1111.png" alt="">-->
                <!--</div>-->
                <div class="notic clearfix">
                    <span>难题原因</span>
                    <p class="tip imgMax" v-html="detail.reason">
                    </p>
                </div>
            </div>
        </div>
        <div class="wrap answer" style="margin-top: 30px">
            <p class="title">全部解答 <span>{{totalCount}}</span></p>
            <dl class="clearfix" v-for="(item,index) in list" :key="index">
                <img v-if="item.isAdopt==1" class="cn-img" src="../../../assets/images/cn1.png" alt="">
                <dt class="left">
                    <img :src="item.replyUserIcon" :onerror="onerrImg" alt=""
                         style="width: 60px;height: 60px;border-radius: 100%">
                </dt>
                <dd class="left">
                    <p class="top">
                        <span class="name">{{item.replyUserName}}</span>
                        <span class="time">{{item.replyTime | formatDate('yyyy-MM-dd HH:mm')}}</span>
                    </p>
                    <p class="content imgMax" v-html="item.answer">

                    </p>
                    <p class="bottom">
                        <span class="msg-title">解答建议：</span>
                        <span class="msg imgMax" v-html="item.proposal"></span>
                    </p>
                </dd>
            </dl>
            <p style="text-align: center;margin-top: 20px;">
                <span class="showMore" @click="showMore" v-if="this.totalCount>this.list.length">查看更多解答</span>
            </p>
        </div>
    </div>
</template>
<script>
  /*当前组件必要引入*/
  let Util = null
  import api from '../api'

  export default {
    data () {
      return {
        self: this,
        onerrImg: '',
        list: [],
        num: 2,
        formValidate: {
          grade: '',
          subject: '',
          isAdopt: '',
          title: '',
        },
        queryQptions: {},
        queryQptions1: {},
        detail: [],
        totalCount: '',


      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        if (this.$store.state.user.info.sex == 1) {
          this.onerrImg = 'this.src="' + require('../../../assets/images/woman.png') + '"'

        } else {
          this.onerrImg = 'this.src="' + require('../../../assets/images/man.png') + '"'
        }
        Util = this.$util
        this.myPages = Util.pageInitPrams
        this.queryQptions = {
          url: api.myQuestionDetail.path,
          params: {
            id: this.$route.query.id
          },
        },
          this.queryQptions1 = {
            url: api.problemReply.path,
            params: {
              problemId: this.$route.query.id,
              pageSize: 3,
              curPage: 1,
            },
          }

        this.setListData()
        this.getList()

      },
      //点击查看更多解答
      showMore () {
        this.queryQptions1.params.curPage++
        this.getList()
      },
      modify (index, i) {
//                this.list.map(function(item) {
//                    item.isAdopt = 0
//                    return item
//                })
//                this.Aready = 1
//                this.list[index].isAdopt = 1;
//                this.changeAdopt();
      },
      setListData (isLoading) {
        //this.queryQptions.params = Object.assign(this.queryQptions.params, this.formValidate);
        this.ajax({
          ajaxSuccess: this.listDataSuccess,
          ajaxParams: this.queryQptions,
        }, isLoading)
      },
      getList () {
        this.ajax({
          ajaxSuccess: this.listData,
          ajaxParams: this.queryQptions1,
        })
      },
//            changeAdopt() {
//                this.ajax({
//                    ajaxSuccess: this.changeSuccess,
//                    ajaxParams: this.queryQptions2,
//                })
//            },
      changeSuccess () {

      },
      listData (res) {
        for (var i = 0; i < res.data.dataList.length; i++) {
//          if (res.data.dataList[i].isAdopt == 1) {
//            this.Aready = 1
//          }
          res.data.dataList[i].replyUserIcon = this.getStaticPath(res.data.dataList[i].replyUserIcon)
          this.list.push(res.data.dataList[i])
        }
        this.totalCount = res.data.totalCount
      },
      listDataSuccess (res) {
        this.detail = res.data
        this.$emit('commond', res.data)

      },

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
    .selfAnsweringQuestion-show {
        .wrap {
            width: 950px;
            padding: 30px;
            border-radius: 3px;
            background: #ffffff;
            .show-head {
                text-align: center;
                border-bottom: 1px solid #e5e5e5;
                .title {
                    font-size: 30px;
                    letter-spacing: 0.2px;
                    color: #313131;
                }
                .tip {
                    margin: 15px 0;
                    font-size: 12px;
                    letter-spacing: 0.1px;
                    color: #a0a0a0;
                    span {
                        margin: 0 8px;
                    }
                }
            }
            .show-content {
                p {
                    margin-top: 30px;
                    font-size: 14px;
                    text-align: left;
                    color: #434343;
                }
                .img-wrap {
                    text-align: center;
                    padding: 20px;
                }
            }
            .notic {
                span {
                    float: left;
                    font-size: 14px;
                    text-align: left;
                    color: #a0a0a0;
                    height: auto;
                }
                .tip {
                    float: right;
                    margin-top: 0px;
                    padding: 0 10px;
                    width: 827px;
                    border-radius: 5px;
                    background-color: #e7f9ed;
                    border: 1px solid #cccccc;
                    line-height: 2;
                    font-size: 14px;
                    text-align: left;
                    color: #434343;
                }
            }
        }
        .answer {
            .title {
                font-size: 16px;
                letter-spacing: 0.1px;
                color: #434343;
                span {
                    font-size: 14px;
                    color: #a0a0a0;
                }
            }
            dl {
                position: relative;
                border-bottom: 1px solid #e5e5e5;
                padding: 30px 0 30px 0;
                .cn-img {
                    position: absolute;
                    top: 15px;
                    right: 25px;
                }
                dt {
                    img {
                        width: 60px;
                        border-radius: 100%;
                    }
                }
                dd {
                    width: 800px;
                    margin: 10px 0 0 20px;
                    .top {
                        .name {
                            font-size: 14px;
                            font-weight: bold;
                            color: #434343;
                            margin-right: 20px;
                        }
                        .time {
                            font-size: 12px;
                            text-align: left;
                            color: #a0a0a0;
                        }
                    }
                    .content {
                        line-height: 1.8;
                    }
                    .bottom {
                        .msg-title {
                            font-size: 14px;
                            font-weight: bold;
                            line-height: 1.71;
                            color: #a0a0a0;
                        }
                        .msg {
                            font-size: 14px;
                            line-height: 1.71;
                            color: #434343;
                        }
                    }
                }
            }
            .showMore {
                font-size: 14px;
                line-height: 1.71;
                color: #11a63f;
                cursor: pointer;
            }
        }

    }

    .selfAnsweringQuestion-show .answer dl {
        min-height: 150px;
    }

    .selfAnsweringQuestion-show .wrap .show-content p {
        margin-top: 0px;
        line-height: 30px;
        text-indent: 2em;
        span {
            font-size: 14px !important;
        }
    }

    .selfAnsweringQuestion-show .wrap .notic .tip {
        min-height: 30px;
    }
</style>