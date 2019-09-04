<template>
	<div>
		<!-- 顶部标题栏 -->
		<div class="title-bar">
			<top-title :titleName="titleName"></top-title>
		</div>
		<!-- ...................................................... -->
		<!-- 顶部总信息 -->
		<div class="planDetail-top flx-cas">
			<div class="plan-detail flx-cas">
			<!-- 	<div class="orderId flx-rs">
					<span>订单号：{{cardInfo.planOrderId}}</span>
				</div> -->
				<div class="location flx-rs">
				<!-- 	<div class="left flx-rs bold">
						<img src="../../assets/img/unionpay.png">
						<span>信用卡</span>
						<span>落地通道</span>
					</div> -->
					<span class="orderId">订单号:{{cardInfo.planOrderId}}</span>
					<div class="right flx-rs">
						<span>消费地区：</span>
						<img src="../../assets/img/location.png">
						<span>{{cardPlanInfo.city}}</span>
					</div>
				</div>
				<div class="bank flx-rs">
					<div class="left flx-rs">
						<img :src="cardInfo.logo">
						<span>{{cardInfo.bankName}}</span>
						<span>**** **** **** {{cardInfo.bankCardNumb}}</span>
					</div>
					<div class="right flx-r" v-if="!cancelPlanBtn">
						<img src="../../assets/img/close.png">
						<span>已手动取消</span>
					</div>
				</div>
				<div class="plan flx-ras">
					<div class='plan-li plan-li-left flx-rs'>
						<span>消费金额：</span>
						<span>¥{{cardInfo.totalDeductAmount}}</span>
					</div>
					<div class='plan-li plan-li-right flx-rs'>
						<span>本期还款金额：</span>
						<span>¥{{cardInfo.totalRepayAmount}}</span>
					</div>
					<div class='plan-li plan-li-left flx-rs'>
						<span>预留额度：</span>
						<span>¥{{cardInfo.cardBalance}}</span>
					</div>
					<div class='plan-li plan-li-right flx-rs'>
						<span>已还款金额：</span>
						<span>{{cardPlanInfo.hasRepayMoney}}</span>
					</div>
				</div>
				<div class="cost flx-ras">
					<div class="cost-li flx-rs">
						<span>消费手续费：</span>
						<span>¥{{cardInfo.totalRate}}</span>
					</div>
				<!-- 	<div class="cost-li flx-rs">
						<span>消费笔数：</span>
						<span>{{cardInfo.deductTotalPens}}</span>
					</div>
					<div class="cost-li flx-rs">
						<span>自用减免：</span>
						<span>未知</span>
					</div> -->
					<div class="cost-li flx-rs">
						<span>还款笔数：</span>
						<span>{{cardInfo.repayTotalPens}}</span>
					</div>
				</div>
				<div class="tips flx-ras" style="text-align: left;">
						<div style="flex-shrink: 0;">提示:</div>
						<div>账单不明确可以添加客服微信，截图对账，或者直接拨打客服电话咨询</div>
				</div>
				<div class="cancel-box flx-r" v-if="cancelPlanBtn" @click="cancelPlan">
					<button class="cancel-btn">取消计划</button>
				</div>
			</div>
		</div>
		<!-- ...................................................... -->
		<!-- 计划详情列表 -->
		<div :class="cancelPlanBtn?'margin-top755':'margin-top655'">
			<div class="repayInfo-list flx-cas">
				<div class="list-li" v-for="(item,index) in cardPlanInfo.itemList" :key='index'>
					<div class='li-top flx-r medium'>
						<div>{{item.dateTime}}</div>
						<div>手续费：￥{{item.rateAmount}}</div>
					</div>
					<div class="li-bottom">
				<!-- 		<div class="consume flx-rs">
							<div class="left flx-rs">
								<img src="../../assets/img/payPlanInfo_consume.png" alt="消费">
								<div class="flx-cs" style="padding-left: 16px;">
									<div class="title">消费</div>
									<div class="time medium">{{item.tradeTime}}</div>
								</div>
							</div>
							<div class="right flx-c">
								<div class="money medium">￥{{item.tradeAmount}}</div>
								<div class="state medium">{{item.deductTips}}</div>
							</div>
						</div> -->
						<div class="repayment flx-rs" v-for="(cur,idx) in item.itemList" :key='idx'>
							<div class="left flx-rs">
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
		<!-- 固定底部栏 -->
<!-- 		<div class="planDetail-bottom flx-rs">
			<div class="left flx-cs">
				<div class="top">
					<span>已完成：</span>
					<span>738.91元</span>
				</div>
				<div class="bottom">
					<span>未完成：</span>
					<span>9271元</span>
				</div>
			</div>
			<div class="right flx-cs">
				<div>已完成12%</div>
				<div class="bar">
					<div class="rate-bar" style="width:12%;"></div>
				</div>
				<div class="num">
					<span>已完成次数</span>
					<span>2/18次</span>
				</div>
			</div>
			<button class="restart-btn" @click="restart">
				<div>重新启动</div>
				<div>还款计划</div>
			</button>
		</div> -->
		<!-- 弹窗 -->
		<van-dialog class='planDetail-show' v-model="show" title="温馨提示" 
		:show-cancel-button='false' 
		:showConfirmButton='false'
		:closeOnClickOverlay='true'>
			<div class="content">
				<div class="top">您当前计划已经还款738.91元 ，还有9271元未还
					清，如您需要在该通道继续还款，请点击【重新启
					动】计划！如您之前消费的商户出现重复，需要更
					换通道重新制定计划，请点击【重新制定】计划！</div>
				<div class="bottom">
					<div>重新启动</div>
					<div>重新定制</div>
				</div>
			</div>
		</van-dialog>
	</div>
</template>
<script>
	import topTitle from '@/components/common/topTitle.vue';
	import {
		server
	} from '@/api/server.js';
	import tool from '../../../public/tool/tool.js';
	export default {
		components: {
			topTitle
		},
		data() {
			return {
				isFirstEnter: false, //是否是第一次进入这个页面
				titleName: '计划详情',
				cardPlanInfo: {},
				cardInfo: {},
				cancelPlanBtn: true, //取消计划的按钮
				show: false, //重新制定计划弹窗
			};
		},
		beforeRouteEnter(to, from, next) {
			let arr = Object.keys(to.params)
			// 当时从cardManagement页面进入进来的,而且有传值的话,把isBack设为false 否则设为true
			if (from.name == 'cardManagement' && arr.length != 0) {
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
				// 获取上个页面传递过来的卡片信息
				this.getCardPlanInfo() //执行获取卡计划信息函数
			}
			this.isFirstEnter = false;
			this.cancelPlanBtn = true;
		},
		methods: {
			// 获取计划详情
			getCardPlanInfo() {
				let planOrderId = this.$route.params.planOrderId;
				server.queryPlanBillDetail({
					planOrderId
				}).then(res => {
					if (res == null) return;
					console.log(res)
					let cardPlanInfo = res.data;
					// 格式化数据
					// cardPlanInfo.hasRepayMoney = tool.centTurnSmacker(cardPlanInfo.hasRepayMoney); //已还款金额
					// cardPlanInfo.hasDeductMoney = tool.centTurnSmacker(cardPlanInfo.hasDeductMoney); //已消费金额
					// cardPlanInfo.waitDeductMoney = tool.centTurnSmacker(cardPlanInfo.waitDeductMoney); //待还款金额
					// cardPlanInfo.itemList = cardPlanInfo.itemList.map(cur => {
					// 	cur.rateAmount = tool.centTurnSmacker(cur.rateAmount); //手续费
					// 	cur.repayAmount = tool.centTurnSmacker(cur.repayAmount); //还款金额
					// 	cur.tradeAmount = tool.centTurnSmacker(cur.tradeAmount); //消费金额
					// 	cur.dateTime = cur.tradeTime.substr(0, 10)
					// 	cur.tradeTime = cur.tradeTime.substr(0, 16) //格式化扣款时间
					// 	cur.transferTime = cur.transferTime.substr(0, 16) //格式化还款时间
					// 	return cur
					// })
					cardPlanInfo.itemList = cardPlanInfo.itemList.map(cur=>{
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
					this.cardPlanInfo = cardPlanInfo;
					this.cardInfo = this.$route.params.cardInfo;
				})
			},
			// 取消计划
			cancelPlan() {
				this.$dialog.confirm({
					title:'确认取消计划?',
					message:'您正在取消该笔计划，请问是否确认取消？'
				}).then(()=>{
					tool.toastLoading()
					let planOrderId = this.cardInfo.planOrderId;
					let repayMode = 1;
					// 为了兼容之前刷1还1,判断后端返回的字段是否为空 为空直接用1 不为空用后端给的字段
					if(this.cardPlanInfo.repayMode){
						repayMode = this.cardPlanInfo.repayMode;
					}
					server.stopRepayPlan({planOrderId,repayMode})
					.then(res=>{
						if(res == null) return;
						this.$toast({
							message:'取消成功'
						})
						this.cancelPlanBtn = false;
					})
				}).catch(()=>{
				})
			},
			// 重新启动
			restart(){
				// this.show = true;
			},
		},
	};
</script>
<style lang="less">
	.planDetail-show {
		.van-dialog__header--isolated {
			padding: 0;
		}

		.van-dialog__header {
			padding: 0;
			width: 100%;
			height: 80px;
			line-height: 80px;
			background: #1c84ff;
			color: #fff;
			font-size: 36px;
		}

		.content {
			width: 100%;
			height: 320px;
			padding: 30px 30px 50px;
			box-sizing: border-box;
			.top{
				font-size: 24px;
				color: #333;
				text-align: left;
			}
			.bottom{
				padding-top:40px;
				// background: pink;
				display: flex;
				justify-content: space-around;
				div{
					width: 180px;
					height: 60px;
					border: 1px solid #3E80F7;
					border-radius: 30px;
					line-height: 60px;
					font-size: 28px;
					color: #3E80F7;
				}
			}
		}
	}
</style>
<style scoped="scoped" lang="less">
	// ---------------------------------------------------
	.planDetail-top {
		// margin-top: 88px;
		position: fixed;
		width: 100%;
		top: 88px;
		left: 0px;
		background: #fff;
		padding-bottom: 10px;

		.plan-detail {
			width: 690px;
			
			// .orderId {
			// 	padding-top: 10px;
			// 	width: 100%;
			// 	color: #000;
			// 	font-size: 24px;
			// 	font-weight: bold;
			// }	
			.location {
				width: 100%;
				height: 70px;
				// display: flex;
				// background: skyblue;
				justify-content: space-between;

// 				.left {
// 					font-size: 30px;
// 					color: #333;
// 
// 					img {
// 						width: 50px;
// 						height: 30px;
// 					}
// 
// 					:nth-child(2) {
// 						padding-left: 10px;
// 					}
// 
// 					:nth-child(3) {
// 						padding-left: 10px;
// 						color: #3c9aff;
// 					}
// 				}
				.orderId{
					font-size: 20px;
				}
				.right {
					font-size: 22px;
					color: #666;

					img {
						width: 25px;
						height: 30px;
						// padding: 0 10px;
						padding-bottom:10px;
						padding-right: 10px;
					}
				}
			}

			.bank {
				width: 100%;
				height: 90px;
				background: linear-gradient(90deg, rgba(110, 191, 255, 1), rgba(26, 130, 255, 1));
				border-radius: 10px 10px 0px 0px;
				box-sizing: border-box;
				padding: 0 25px;
				justify-content: space-between;

				.left {
					font-size: 24px;
					color: #fff;

					img {
						width: 70px;
						height: 70px;
					}

					:nth-child(2) {
						padding: 0 20px;
					}

					:nth-child(3) {
						padding-top: 4px;
					}
				}

				.right {
					width: 160px;
					height: 40px;
					background: #fff;
					border-radius: 5px;
					font-size: 22px;
					color: #666;
					line-height: 40px;

					img {
						width: 18px;
						height: 18px;
						padding-right: 6px;
					}
				}
			}

			.plan {
				width: 100%;
				height: 121px;
				border-bottom: 1px solid #e5e5e5;
				box-sizing: border-box;
				// padding: 30px 0;
				flex-wrap: wrap;
				font-size: 22px;
				color: #333;

				.plan-li {
					height: 60px;
					width: 50%;

					// .bar{
					// 	width: 4px;
					// 	height: 15px;
					// 	border-radius:2px;
					// 	background: #3E80F7;
					// }
					:nth-child(1) {
						height: 16px;
						line-height: 18px;
						border-left: 4px solid #3e80f7;
						padding: 0 5px 0 10px;
						// padding-left: 10px;
					}

					:nth-child(2) {
						color: #FF5050;
						height: 70px;
						line-height: 74px;
					}

					.ratio {
						font-size: 20px;
						background: #7f7f7f;
						margin-left: 10px;
						border-radius: 5px;
						padding: 2px 5px;
						color: #fff;
					}
				}
			}

// 			.plan-li-left {
// 				width: 55% !important;
// 			}
// 
// 			.plan-li-right {
// 				width: 45% !important;
// 			}

			.cost {
				width: 100%;
				font-size: 24px;
				// height: 110px;
				flex-wrap: wrap;
				color: #666;

				.cost-li {
					width: 50%;
					height: 55px;

					:nth-child(2) {
						color: #333;
						height: 58px;
						line-height: 64px;
					}
				}
			}

			.tips {
				width: 100%;
				height: 80px;
				box-sizing: border-box;
				padding: 10px;
				border: 1px dashed #D2D2D2;
				font-size: 24px;
				:nth-child(1){
					flex-shrink: 0;
					padding-right: 10px;
					color: #FF5050;
				}
				:nth-child(2){
					color: #333;
				}
			}

			.cancel-box {
				width: 100%;
				padding: 20px 0 0;
				box-sizing: border-box;

				.cancel-btn {
					width: 100%;
					height: 80px;
					background: linear-gradient(90deg, rgba(110, 191, 255, 1), rgba(26, 130, 255, 1));
					box-shadow: -1px 10px 24px 0px rgba(53, 133, 254, 0.5);
					border-radius: 10px;
					color: #fff;
					font-size: 32px;
					font-weight: bold;
				}
			}
		}
	}

	// ---------------------------------------------------
	.margin-top755 {
		// margin-top: 695px;
		margin-top: 625px;
	}

	.margin-top655 {
		margin-top: 515px;
	}

	// .planDetail-box {
	// <!-- 计划详情列表 -->
	.repayInfo-list {
		padding: 20px 0;
		// margin-bottom: 100px;
		margin-bottom: 20px;

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
				// height: 370px;
				box-sizing: border-box;
				padding: 0 30px;

				img {
					width: 90px;
					height: 90px;
				}

				.consume,
				.repayment {
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

	// }

	// 固定底部栏
	.planDetail-bottom {
		width: 100%;
		height: 100px;
		background: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		box-sizing: border-box;
		padding: 0px 30px;
		font-size: 22px;
		color: #666;
		text-align: left;

		.left {
			width: 250px;
			height: 100%;

			.bottom {
				padding-top: 10px;

				:nth-child(2) {
					color: #3E80F7;
				}
			}
		}

		.right {
			height: 100%;

			.bar {
				position: relative;
				width: 200px;
				height: 6px;
				background: #eee;
				margin: 6px 0;
			}

			.rate-bar {
				position: absolute;
				top: 0;
				left: 0;
				// width:40px;
				height: 6px;
				background: #51CC8D;
			}

			.num {
				:nth-child(2) {
					padding-left: 10px;
					color: #3E80F7;
				}
			}
		}

		.restart-btn {
			position: absolute;
			top: 0;
			right: 0;
			width: 150px;
			height: 100px;
			background: #3595ff;
			// background: #3E80F7;
			color: #fff;
			font-size: 28px;
		}
	}
</style>
