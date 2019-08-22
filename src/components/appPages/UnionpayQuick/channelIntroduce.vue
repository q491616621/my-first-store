<template>
	<div>
		<!-- 顶部标题栏 -->
		<div class="title-bar flx-r">
			<top-title :titleName="titleName"></top-title>
		</div>
		<div class="intro-box flx-cas">
			<div class="intro-title flx-ras">
				<div class='title'>银行名称</div>
				<div class='title'>单卡单笔（元）</div>
				<div class='title'>单卡当日（元）</div>
			</div>
			<div class="intro-content flx-ras" v-for="(item,index) in introListA" :key='index'>
				<div :class="index%2==0?'content1':'content2'">{{item.bankName}}</div>
				<div :class="index%2==0?'content1':'content2'">{{item.cardAmount}}</div>
				<div :class="index%2==0?'content1':'content2'">{{item.intradayAmount}}</div>
			</div>
		</div>
	</div>
</template>
<script>
	import topTitle from '@/components/common/topTitle.vue';
	export default {
		components: {
			topTitle,
		},
		data() {
			return {
				titleName: '银联快捷-积分通道A', //标题栏标题
				introListA: [
					{bankName: '农业银行',cardAmount:'20000.00',intradayAmount:'50000.00'},
					{bankName: '工商银行',cardAmount:'20000.00',intradayAmount:'50000.00'},
					{bankName: '邮储银行',cardAmount:'20000.00',intradayAmount:'50000.00'},
					{bankName: '光大银行',cardAmount:'20000.00',intradayAmount:'50000.00'},
					{bankName: '兴业银行',cardAmount:'20000.00',intradayAmount:'50000.00'},
					{bankName: '招商银行',cardAmount:'20000.00',intradayAmount:'50000.00'},
					{bankName: '中国银行',cardAmount:'20000.00',intradayAmount:'50000.00'},
					{bankName: '建设银行',cardAmount:'20000.00',intradayAmount:'50000.00'},
					{bankName: '北京银行',cardAmount:'20000.00',intradayAmount:'50000.00'},
					{bankName: '民生银行',cardAmount:'20000.00',intradayAmount:'50000.00'},
					{bankName: '平安银行',cardAmount:'20000.00',intradayAmount:'50000.00'},
					{bankName: '中信银行',cardAmount:'20000.00',intradayAmount:'50000.00'},
					{bankName: '华夏银行',cardAmount:'20000.00',intradayAmount:'50000.00'},
					{bankName: '广发银行',cardAmount:'20000.00',intradayAmount:'50000.00'},
					{bankName: '恒丰银行',cardAmount:'20000.00',intradayAmount:'50000.00'},
					{bankName: '浙商银行',cardAmount:'20000.00',intradayAmount:'50000.00'},
					{bankName: '汇丰银行',cardAmount:'20000.00',intradayAmount:'50000.00'},
					{bankName: '东亚银行',cardAmount:'20000.00',intradayAmount:'50000.00'},
				]
			};
		},
		beforeCreate() {
			document.querySelector('body').setAttribute('style', 'background-color:#fff')
		},
	};
</script>

<style scoped="scoped" lang="less">
	.intro-box {
		margin-top: 108px;
		padding-bottom:30px;
		.intro-title {
			width: 690px;
			justify-content: space-between;
			.title {
				width: 229px;
				height: 60px;
				font-size: 24px;
				color: #FFFFFF;
				background: #5B95F9;
				line-height: 60px;
				text-align: center;
			}
		}
		.intro-content{
			width: 690px;
			justify-content: space-between;
			.content1{
				width: 229px;
				height: 60px;
				font-size: 24px;
				color: #333;
				background: #DCE9FF;
				line-height: 60px;
				text-align: center;
			}
			.content2{
				width: 229px;
				height: 60px;
				font-size: 24px;
				color: #333;
				background: #F3F3F3;
				line-height: 60px;
				text-align: center;
			}
		}
	}
</style>
