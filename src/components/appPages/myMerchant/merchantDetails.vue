<template>
	<div style="width: 100%;">
		<!-- 顶部标题栏 -->
		<div class="title-bar">
			<top-title :titleName="titleName"></top-title>
		</div>
		<!-- 标题 -->
		<div class="title flx-r">
			<span>我的推荐</span>
			<span>（393人）</span>
		</div>
		<!-- 推荐人列表 -->
		<van-list class="people-list" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
			<div class="people-li flx-r" v-for="item in list" :key='item'>
				<div class="name flx-c">
					<div>赵**</div>
					<div>137****8948</div>
				</div>
				<div class="status flx-r">
					<div>已实名</div>
					<div>VIP</div>
				</div>
				<div class="phone">
					<img src="../../../assets/img/phone2.png">
				</div>
			</div>
			<!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
		</van-list>
	</div>
</template>
<script>
	import topTitle from '@/components/common/topTitle.vue';
	import tool from '../../../../public/tool/tool.js'
	export default {
		components: {
			topTitle,
		},
		data() {
			return {
				titleName: '我的商户', //标题栏标题
				list: [],
				loading: false,
				finished: false
			};
		},
		methods: {
			callTel() {
				// 检查平台 0为安卓，1为ios，2为PC
				let platFlag = tool.testPlat();
				let init = {
					telNumber: '0755-33941925'
				}
				if (platFlag == 1) {
					// 调用ios打电话的方法
					window.webkit.messageHandlers.callTelAction.postMessage(init);
				} else {
					// 调用安卓打电话方法
					window.android.callTelAction(JSON.stringify(init));
				}
			},
			onLoad() {
				// 异步更新数据
				setTimeout(() => {
					for (let i = 0; i < 10; i++) {
						this.list.push(this.list.length + 1);
					}
					// 加载状态结束
					this.loading = false;
					// 数据全部加载完成
					if (this.list.length >= 40) {
						console.log('触发了')
						this.finished = true;
					}
				}, 500);
			}
		},
	};
</script>

<style scoped="scoped" lang="less">
	.title {
		width: 100%;
		height: 88px;
		position: fixed;
		top: 88px;
		left: 0;
		z-index: 1600;
		background: #fff;
		// margin-top: 88px;
		border-bottom: 4px solid #2e90ff;
		font-size: 30px;
		font-weight: bold;
		color: #333;

		:nth-child(2) {
			color: #2e90ff;
			font-size: 30px;
		}
	}

	.people-list {
		margin-top: 180px;
		.people-li{
			width: 100%;
			height: 120px;
			// background: pink;
			justify-content: flex-start;
			font-size: 26px;
			box-sizing: border-box;
			padding-left: 20px;
			border-bottom: 1px solid #d7d7d7;
			.name{
				height: 100px;
				justify-content: space-around;
				align-items: flex-start;
				:nth-child(1){
					font-size: 28px;
					color: #333;
					font-weight: bold;
				}
				:nth-child(2){
					color: #999;
				}
			}
			.status{
				padding-left: 30px;
				font-size: 24px;
				:nth-child(1){
					color: #fff;
					background:#2e90ff;
					padding: 6px 20px;
					border-radius: 10px;
				}
				:nth-child(2){
					padding-left: 30px;
					font-weight: bold;
				}
			}
			.phone{
				padding-left: 200px;
				padding-top: 5px;
				img{
					width: 40px;
					height: 40px;
				}
			}
		}
	}
</style>
