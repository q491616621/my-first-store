<template>
	<div>
		<!-- 还款总信息 -->
		<commomLoading v-if='commonLoading'></commomLoading>
		<div v-if='!commonLoading'>
			<div class="payPlanInfo">
				<div class="flx-r top-title">
					<button class="return-btn" @click="returnBack">
						<img src="../../assets/img/return_white.png" alt="返回按钮">
					</button>
					<div class="title-name">{{titleName}}</div>
				</div>
				<div class="amount medium">{{planInfo.totalRepayMoney}}</div>
				<!-- <div class="amount medium">500.00</div> -->
				<div class="repayInfo flx-r">
					<div>
						<div class="repayInfo-top">{{planInfo.totalRateMoney}}</div>
						<!-- <div class="repayInfo-top">1560</div> -->
						<div class="repayInfo-bottom">还款手续费(元)</div>
					</div>
					<div>
						<div class="repayInfo-top">{{planInfo.repayPeriods}}</div>
						<!-- <div class="repayInfo-top">500</div> -->
						<div class="repayInfo-bottom">还款笔数</div>
					</div>
					<div>
						<div class="repayInfo-top">{{planInfo.balanceMoney}}</div>
						<!-- <div class="repayInfo-top">500</div> -->
						<div class="repayInfo-bottom">卡内预留余额</div>
					</div>
				</div>
			</div>
			<!-- <div style="height: 3000px;width: 100%;background: pink;"></div> -->
			<!-- 还款信息列表 -->
			<div class="repayInfo-list flx-cas">
				<div class="list-li" v-for="(item,index) in planInfo.voList" :key='index'>
					<div class='li-top flx-r medium'>
						<div>{{item.dateTime}}</div>
						<div>手续费：￥{{item.rateAmount}}</div>
					</div>
					<div class="li-bottom">
					<!-- 	<div class="consume flx-rs">
							<div class="left flx-rs">
								<img src="../../assets/img/payPlanInfo_consume.png" alt="消费">
								<div class="flx-cs" style="padding-left: 16px;">
									<div class="title">消费</div>
									<div class="time medium">{{item.tradeTime}}</div>
								</div>
							</div>
							<div class="right flx-c">
								<div class="money medium">￥{{item.tradeAmount}}</div>
								<div class="state medium">待处理</div>
							</div>
						</div> -->
						<div class="repayment flx-rs" v-for="(cur,idx) in item.itemList" :key='idx'>
							<div class="left flx-rs">
								<!-- <img src="../../assets/img/payPlanInfo_repay.png" alt="消费"> -->
								<img :src="cur.bgPic">
								<div class="flx-cs" style="padding-left: 16px;">
									<div class="title">{{cur.name}}</div>
									<div class="time medium">{{cur.tradeTime}}</div>
								</div>
							</div>
							<div class="right flx-c">
								<div class="money medium">￥{{cur.tradeAmount}}</div>
								<div class="state medium">{{cur.statusTips}}</div>
							</div>
						</div>
						<div class="total flx-rs">
							<div>该笔交易共还款</div>
							<div class="money">¥{{item.tradeAmount}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 任务栏 -->
		<div class="payPlanInfo-taskBar flx-r medium">
			<div class="taskBar-btn reset" @click="returnBack">重置计划</div>
			<div class="taskBar-btn" @click="changePeriods('minus')">减少期数</div>
			<div class="taskBar-btn" @click="changePeriods('add')">增加期数</div>
			<div class="taskBar-btn sumbit" @click="sumbitPlan">提交计划</div>
		</div>
	</div>
</template>
<script>
	import commomLoading from '@/components/common/loading.vue';
	import {
		server
	} from '@/api/server.js';
	// import tool from '../../../public/tool/tool.js';
	export default {
		components: {
			commomLoading
		},
		data() {
			return {
				isFirstEnter:false,//是否是第一次进入这个页面
				titleName: '还款总金额(元)',
				planInfo: null, //预览计划的信息
				cardInfo: null, //上个页面用户填写的卡信息
				commonLoading: true, //默认加载中，页面加载完成才消失
				channelType:'',//上个页面传过来的用户选择的还款类型
			};
		},
		beforeRouteEnter(to, from, next) {
			let arr = Object.keys(to.params)
			// 当时从cardManagement页面进入进来的,而且有传值的话,把isBack设为false 否则设为true
			if (from.name == 'addrePayPlan' && arr.length != 0) {
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
			if (!this.$route.meta.isBack||this.isFirstEnter) {
				this.getPlanInfo()
			}
			this.isFirstEnter = false;
		},
		methods: {
			// 重置计划，重新跳转回去上个页面
			returnBack() {
				this.$router.go(-1)
			},
			// 提交计划
			sumbitPlan() {
				let surePlanInfo = this.planInfo;
				surePlanInfo.channelCode = this.cardInfo.channelCode;
				surePlanInfo.bindcardUniqueId = this.cardInfo.bindcardUniqueId;
				surePlanInfo.channelType = this.channelType;
				this.$router.push({
					name: 'surePlan',
					params: surePlanInfo
				})
			},
			// 增加或者减少期数
			changePeriods(e) {
				// 深拷贝一下,不然会影响到上个页面传过来的值
				let cardInfo = JSON.parse(JSON.stringify(this.cardInfo))
				cardInfo.periods = this.planInfo.totalPeriods; //当前的期数
				if (e == 'minus') {
					cardInfo.dayFlag = -1; //减少期数
				} else {
					cardInfo.dayFlag = 1; //增加期数
				}
				server.preCreatePlan(cardInfo)
					.then(res => {
						if (res == null) return;
						let planInfo = res.data;
						this.forMatInfo(planInfo)
					})
			},
			// 获取上个页面传递过来的计划信息
			getPlanInfo() {
				// 拿到上个页面调用预览计划接口后返回的信息
				let planInfo = this.$route.params.planInfo;
				// 执行格式化数据的函数
				this.forMatInfo(planInfo)
				// 把上个页面填写的信息设置给cardInfo
				this.cardInfo = this.$route.params.cardInfo;
				//设置上个页面传递过来的channelType
				this.channelType = this.$route.params.channelType;
			},
			// 格式化数据
			forMatInfo(planInfo) {
				// 格式化数据,把数据转换成页面需要展示的样式
				// planInfo.totalDeductMoney = tool.centTurnSmacker(planInfo.totalDeductMoney) //格式化总扣款金额
				// planInfo.totalRepayMoney = tool.centTurnSmacker(planInfo.totalRepayMoney) //格式化总还款金额
				// planInfo.totalRateMoney = tool.centTurnSmacker(planInfo.totalRateMoney) //格式总手续费
				// planInfo.balanceMoney = tool.centTurnSmacker(planInfo.balanceMoney) //格式化卡内余额
				// planInfo.itemList = planInfo.itemList.map(cur => {
				// 	cur.tradeAmount = tool.centTurnSmacker(cur.tradeAmount) //格式化扣款金额
				// 	cur.repayAmount = tool.centTurnSmacker(cur.repayAmount) //格式化还款金额
				// 	cur.rateAmount = tool.centTurnSmacker(cur.rateAmount) //格式化手续费
				// 	cur.dateTime = cur.tradeTime.substr(0, 10)
				// 	cur.tradeTime = cur.tradeTime.substr(0, 16) //格式化扣款时间
				// 	cur.transferTime = cur.transferTime.substr(0, 16) //格式化还款时间
				// 	return cur
				// })
				planInfo.voList =  planInfo.voList.map(cur=>{
					cur.dateTime = cur.dateTime.substr(0,10);
					cur.itemList.map((item,index)=>{
						item.tradeTime = item.tradeTime.substr(0,16);
						if(cur.itemList.length-1 == index){
							item.name = '还款';
							item.bgPic = require('../../assets/img/payPlanInfo_repay.png');
						}else{
							item.name = '消费';
							item.bgPic = require('../../assets/img/payPlanInfo_consume.png')
						}
						return item;
					})
					cur.tradeAmount = cur.itemList[cur.itemList.length-1].tradeAmount;//该笔交易的共还款
					return cur;
				})
				this.planInfo = planInfo;
				this.commonLoading = false;
			}
		},
	};
</script>
<style scoped="scoped" lang="less">
	// 顶部标题栏
	// .top-title {
	// 	width: 100%;
	// 	height: 88px;
	// 	box-sizing: border-box;
	// 	padding: 0px 30px;
	// 	position: relative;
	// 	background: linear-gradient(90deg, rgba(110, 191, 255, 1), rgba(26, 130, 255, 1));
	// 	.return-btn {
	// 		position: absolute;
	// 		top: 22px;
	// 		left: 30px;
	// 		width: 50px;
	// 		height: 50px;
	// 		text-align: left;
	// 		img {
	// 			width: 18px;
	// 			height: 32px;
	// 		}
	// 	}
	// 	.title-name {
	// 		font-size: 30px;
	// 		color: #C1E1FF;
	// 	}
	// }
	.top-title {
		width: 100%;
		height: 88px;
		box-sizing: border-box;
		// padding: 28px 30px;
		// border-bottom: 1px solid #EDEDED;
		position: relative;
		background: linear-gradient(90deg, rgba(110, 191, 255, 1), rgba(26, 130, 255, 1));

		.return-btn {
			position: absolute;
			top: 0px;
			left: 0px;
			// width: 100px;
			height: 100%;

			img {
				padding: 0px 30px;
				width: 18px;
				height: 32px;
			}
		}

		.title-name {
			font-size: 30px;
			color: #C1E1FF;
			// font-weight: bold;
			line-height: 64px;
		}
	}

	// 还款总信息
	.payPlanInfo {
		position: fixed;
		z-index: 9999;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 293px;
		background: linear-gradient(90deg, rgba(110, 191, 255, 1), rgba(26, 130, 255, 1));

		.amount {
			font-size: 42px;
			color: #fff;
		}

		.repayInfo {
			height: 100px;
			padding: 30px;
			justify-content: space-between;

			.repayInfo-top {
				font-size: 34px;
				color: #fff;
			}

			.repayInfo-bottom {
				padding-top: 10px;
				font-size: 24px;
				color: #C1E2FF;
			}
		}
	}

	// 还款信息列表
	.repayInfo-list {
		margin-top: 293px;
		padding: 20px 0px;
		margin-bottom: 100px;

		.list-li {
			width: 690px;
			// height: 470px;
			background: #fff;
			box-shadow: 0px 3px 12px 0px rgba(212, 212, 212, 0.5);
			border-radius: 14px;
			margin-bottom: 22px;

			.li-top {
				height: 70px;
				background: #DEEDFF;
				box-sizing: border-box;
				padding: 0 30px;
				font-size: 26px;
				color: #ADADAD;
				border-top-left-radius: 14px;
				border-top-right-radius: 14px;
				justify-content: space-between;
			}

			.li-bottom {
				// height: 400px;
				// height: 370px;
				box-sizing: border-box;
				padding: 0 30px;

				img {
					width: 90px;
					height: 90px;
				}

				.consume,
				.repayment {
					// height: 159px;
					height: 139px;
					border-bottom: 1px solid #EDEDED;
					justify-content: space-between;
				}

				.title {
					font-size: 30px;
					color: #212121;
					padding-bottom: 14px;
				}

				.time {
					font-size: 24px;
					color: #ADADAD;
				}

				.right {
					align-items: flex-end;

					.money {
						font-size: 30px;
						color: #FF4C4C;
					}

					.state {
						width: 100px;
						height: 40px;
						background: #E3FBEE;
						border: 1px solid #C3F3DA;
						border-radius: 4px;
						color: #5FD196;
						font-size: 24px;
						text-align: center;
						line-height: 44px;
						margin-top: 20px;
					}
				}
			}
		}

		.total {
			height: 80px;
			font-size: 26px;
			color: #212121;
			justify-content: flex-end;

			.money {
				color: #FF4C4C;
				font-size: 30px;
				padding-left: 10px;
			}
		}
	}

	// 任务栏
	.payPlanInfo-taskBar {
		width: 100%;
		height: 100px;
		position: fixed;
		bottom: 0;
		left: 0;
		background: #fff;
		box-sizing: border-box;
		padding: 20px 30px;
		font-size: 26px;
		justify-content: space-between;

		.taskBar-btn {
			width: 160px;
			height: 60px;
			border-radius: 30px;
			border: 1px solid #ADADAD;
			text-align: center;
			line-height: 60px;
			color: #212121;
		}

		.reset {
			border: 1px solid #FF5454;
			color: #FF5454;
		}

		.sumbit {
			color: #fff;
			background: linear-gradient(90deg, rgba(110, 191, 255, 1), rgba(26, 130, 255, 1));
			box-shadow: 0px 6px 12px 0px rgba(53, 133, 254, 0.5);
			border: none;
		}
	}
</style>
