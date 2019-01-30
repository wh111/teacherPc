<!--
****--@file     resultOfFirst
****--@date     2017/12/22 16:26
****--@author   王恒
****--@describe   首次测评结果
-->
<template>
  <div class="resultOfFirst-root">

    <h1>恭喜你完成系统首次测评！点亮了知识树，以下是你的</h1>
    <h2>测评结果！
    </h2>
    <div style="width: 890px;margin: 0 auto">
      <p class="title">
        <span>本次测评得分:<i style="color: #fd7416">90</i>分</span>
        <span>用时:<i>20分00秒</i></span>
        <span>答对:<i style="color:#11a63f">8</i>道题</span>
          <span>答错:<i style="color:#fc4341">4</i>道题</span>
      </p>
      <div class="clearfix">
        <div class="item left" style="margin-right: 25px;width: 432px;">
          <span class="icon-left"><i></i>正确率</span>
          <div class="content" style="text-align: center;position: relative">
            <span style="position: absolute;top: 33px;left: 191px;">正确率</span>
            <co-progress background="#fd7416" type="circle" :percentage="90"></co-progress>
          </div>
        </div>
        <div class="item left progress" style="width: 432px;margin-top: 23px">
          <span>能力值：</span>
          <co-progress :text-inside="true" :stroke-width="18" :percentage="50"></co-progress>
          <span>学习进度：</span>
          <co-progress background="#fd7416" :text-inside="true" :stroke-width="18" :percentage="70"></co-progress>
        </div>
      </div>
      <div class="item">
        <span class="icon-left"><i></i>测评结果</span>
        <div class="content" style="height: auto;">
          <p class="time">2017-08-09 10:00</p>
          <p class="tip">昵称完成系统根据其能力进行自动组卷、阅卷的测评，主要知识点为汉语拼音、文章理解方面，进行了综合测试，总得分为100分，正
            确率为100%，测评结果为优秀。</p>
        </div>
      </div>
    </div>
    <div class="item">
      <span class="icon-left" style="margin-left: 30px"><i></i>各章节掌握度</span>
    </div>
    <div class="know-access">
      <div id="myRadarChart" :style="{width: '300px', height: '300px'}"></div>

    </div>
    <div style="width: 890px;margin: 0 auto">
      <div class="item">
        <span class="icon-left"><i></i>做题详情</span>
        <el-button class="right show-paper" @click="showModal = true">查看试卷
          <i class="el-icon-arrow-right"></i></el-button>
        <div class="content" style="height: auto;">
          <p class="detial">汉语拼音：<span class="green">1</span><span class="green">1</span><span
            class="green">4</span><span class="red">6</span><span class="green">7</span><span class="red">10</span><span
            class="green">12</span></p>
          <p class="detial">阅读理解：<span class="green">2</span><span class="green">3</span><span class="green">11</span>
          </p>
          <p class="detial">汉字笔画：<span class="red">4</span><span class="red">8</span><span class="green">9</span></p>
        </div>
      </div>

      <div class="item">
        <span class="icon-left"><i></i>提升建议</span>
        <div class="content" style="height: auto;">
          <p class="tip" style="padding: 20px;">学无止境，请你再接再厉，继续加强练习！
            你本次的测评结果为优秀，但千万不要因此而骄傲，一定要多加练习，巩固所学知识点，根据本次测评，你对汉语拼音、汉字拼写、文
            章理解知识点掌握度较高，可以选择继续练习巩固，也可以选择进行下一章节的训练。</p>
        </div>
      </div>
    </div>
    <div id="myTable" ref="myTable">

      <el-table
        :data="LastTableData"
        border
        style="width: 100%;">
        <el-table-column
          prop="ID"
          label="序号"
          width="90"
          align="center">
        </el-table-column>
        <el-table-column
          prop="ProjectName"
          label="档案名称"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          width="100"
          align="center">
          <template slot-scope="scope">
            <router-link target="_blank" to="">
              <el-button>查看</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>

    </div>
  </div>

</template>
<script>
	/*当前组件必要引入*/
	let Util = null
	import show from '../../../components/common/questionsPaper_show.vue'
	import coProgress from '../../../components/common/progress.vue'
	import echarts from 'echarts'

	export default {
		data () {
			return {}
		},
		methods: {
			//初始化请求列表数据
			init () {
				Util = this.$util

			},

			objectSpanMethod ({row, column, rowIndex, columnIndex}) {
				if (columnIndex === 0) {
					if (rowIndex === 0) {
						return {
							rowspan: this.tableData.length,
							colspan: 1,
						}
					} else {
						return {
							rowspan: 0,
							colspan: 0,
						}
					}
				}
			},
			//画图
			drawRadar () {
				console.log(1)
				let myChart = echarts.init(document.getElementById('myRadarChart'))
				myChart.setOption({
					title: {
						text: '',
					},
					tooltip: {},
					legend: {
						data: ['', ''],
					},
					radar: {
						// shape: 'circle',
						name: {
							textStyle: {
								color: '#fff',
								backgroundColor: '#999',
								borderRadius: 3,
								padding: [3, 5],
							},
						},
						indicator: [
							{name: '', max: 6500},
							{name: '', max: 16000},
							{name: '', max: 30000},
							{name: '', max: 38000},
							{name: '', max: 52000},
							{name: '', max: 25000},
						],
					},
					series: [
						{
							name: '预算 vs 开销（Budget vs spending）',
							type: 'radar',
							// areaStyle: {normal: {}},
							data: [
								{
									value: [4300, 10000, 28000, 35000, 50000, 19000],
									name: '语文（Allocated Budget）',
								},
								{
									value: [5000, 14000, 28000, 31000, 42000, 21000],
									name: '数学（Actual Spending）',
								},
							],
						}],
				})

			},
			/**
			 * 回调函数
			 * **/
			subCallback () {

			},
			/**
			 * 回调函数
			 * **/
			cancel () {

			},
			
		},
		created () {
			this.init()
		},
		mounted () {
			this.drawRadar()
		},
		components: {
			coProgress,
			show,
			echarts,
		},
	}

</script>
<style lang="scss">
  @import "css/resultOfFirst.scss";
</style>