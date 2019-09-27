<template>
	<div>
		<!-- 顶部标题栏 -->
		<div class="title-bar">
			<top-title :titleName="titleName"></top-title>
		</div>
		<!-- 确认信息栏 -->
		<div class="surePlan-box flx-cas">
			<div class="surePlan-info">
				<div class="info-li flx-rs">
					<div>消费金额</div>
					<div class="money">{{surePlanInfo.totalDeductMoney}}</div>
				</div>
				<div class="info-li flx-rs medium">
					<div>还款总金额</div>
					<div class="money">{{surePlanInfo.totalRepayMoney}}</div>
				</div>
				<div class="info-li flx-rs medium">
					<div>交易手续费</div>
					<div class="money">{{surePlanInfo.totalRateMoney}}</div>
				</div>
				<div class="info-li flx-rs medium">
					<div>卡内余额</div>
					<div class="money">{{surePlanInfo.balanceMoney}}</div>
				</div>
				<div class="plan-notify flx-cs">
					<div class="notify-li">1、计划终止，已执行完计划的手续费将不予退回。</div>
					<div class="notify-li">2、为保障您的还款计划顺利进行，请务必保证信用卡余额
						最低为{{surePlanInfo.balanceMoney}}元。</div>
				</div>
				<button class="sure-btn bold" @click="sureSumbitPlan">确认执行计划</button>
			</div>
		</div>
		<!-- 跳转绑定通道页面弹窗 -->
		<van-dialog class="bindChannle" v-model="bindChannelBox" show-confirm-button confirm-button-text='下一步'
		 confirm-button-color='66b9ff' @confirm='goBindChannel'>
			<div class="content flx-c">
				<img src="../../assets/img/tip.png">
				<div>您还未绑定该通道,暂时无法使用该通道,点击下一步进行通道的绑定!</div>
			</div>
		</van-dialog>
	</div>
</template>
<script>
	import {
		server
	} from '@/api/server.js';
	import topTitle from '@/components/common/topTitle.vue';
	import tool from '../../../public/tool/tool.js';
	export default {
		components: {
			topTitle,
		},
		data() {
			return {
				isFirstEnter: false, //是否是第一次进入这个页面
				titleName: '执行计划',
				surePlanInfo: {
					totalDeductMoney: '',
					totalRepayMoney: '',
					totalRateMoney: '',
					balanceMoney: '',
				}, //各种金额数据
				bindChannelBox: false,
			};
		},
		beforeRouteEnter(to, from, next) {
			let arr = Object.keys(to.params)
			// 当时从cardManagement页面进入进来的,而且有传值的话,把isBack设为false 否则设为true
			if (from.name == 'payPlanInfo' && arr.length != 0) {
				to.meta.isBack = false;
			} else {
				to.meta.isBack = true;
			}
			next();
		},
		created() {
			this.isFirstEnter = true;
		},
		activated() {
			if (!this.$route.meta.isBack || this.isFirstEnter) {
				this.getPlanInfo() //获取上个页面传过来的数据
			}
			this.isFirstEnter = false;
		},
		methods: {
			// 获取上个页面传递过来的数据的函数
			getPlanInfo() {
				let surePlanInfo = this.$route.params;
				this.surePlanInfo = surePlanInfo;
			},
			// 确认提交计划
			sureSumbitPlan() {
				let init = {};
				let surePlanInfo = this.surePlanInfo;
				init.planDTO = surePlanInfo.planDTO;
				init.planInfo = surePlanInfo.planInfo;
				// 弹窗加载中
				tool.toastLoading();
				server.comfirmRepayPlan(init)
					.then(res => {
						if (res == null) return;
						// 判断后台返回的是成功还是未绑定该通道
						if (res.code == "-30001") {
							// 未绑定通道,显示绑定通道弹窗
							this.bindChannelBox = true;
							return;
						} else {
							this.$toast({
								message: '制定计划成功',
								forbidClick: true,
							})
							setTimeout(() => {
								this.$router.push({
									name: 'cardManagement',
									params: {
										type: 'next'
									}
								})
							}, 2000)
						}
					})
			},
			// 跳转绑定通道页面
			goBindChannel(){
				// 未绑定通道跳转去绑定通道页面,把当前要绑定的通道号和当前页面的名称携带过去
				let init = {};
				init.planDTO = this.surePlanInfo.planDTO;
				init.planInfo = this.surePlanInfo.planInfo;
				init.bindcardUniqueId = this.surePlanInfo.bindcardUniqueId;
				init.channelType = this.surePlanInfo.channelType;
				this.$router.push({
					name:'bindChannel',
					params:{channelCode:this.surePlanInfo.channelCode,page:'surePlan',planData:init}
				})
			}
		},
	};
</script>
<style scoped="scoped" lang="less">
	.surePlan-box {
		margin-top: 88px;
		padding: 20px 0;
	}

	.surePlan-info {
		width: 690px;
		height: 820px;
		background: #fff;
		box-shadow: 0px 3px 12px 0px rgba(212, 212, 212, 0.5);
		border-radius: 14px;
		box-sizing: border-box;
		padding: 0 30px 114px;

		.info-li {
			height: 100px;
			border-bottom: 1px solid #EDEDED;
			justify-content: space-between;
			font-size: 30px;
			color: #888;

			.money {
				color: #D5D5D5;
			}
		}

		.plan-notify {
			margin-top: 20px;
			font-size: 24px;
			color: #FF9540;

			.notify-li {
				padding-top: 10px;
				text-align: left;
			}
		}

		.sure-btn {
			margin-top: 78px;
			width: 630px;
			height: 90px;
			background: linear-gradient(90deg, rgba(110, 191, 255, 1), rgba(26, 130, 255, 1));
			box-shadow: -1px 10px 24px 0px rgba(53, 133, 254, 0.5);
			border-radius: 45px;
			font-size: 32px;
			color: #fff;
		}
	}

	// 跳转绑通道弹窗
	.bindChannle {
		.content {
			padding: 30px 0;

			img {
				width: 100px;
				height: 100px;
			}

			div {
				text-align: left;
				padding: 30px;
			}
		}
	}
</style>
