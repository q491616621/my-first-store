<template>
	<div>
		<!-- 顶部标题栏 -->
		<div class="title-bar flx-r">
			<top-title :titleName="titleName"></top-title>
		</div>
		<div class="planDetail-top">
			<div class="plan-detail flx-cas">
				<div class="orderId flx-rs">
					<span>订单号：19071715005065701031367839</span>
				</div>
				<div class="location flx-rs">
					<div class="left flx-rs bold">
				<!-- 		<span>订单号：</span>
						<span>19071715005065701031367839</span> -->
						<img src="../../assets/img/unionpay.png">
						<span>信用卡</span>
						<span>落地通道</span>
					</div>
					<div class="right flx-rs">
						<span>消费地区：</span>
						<img src="../../assets/img/location.png">
						<span>深圳市</span>
					</div>
				</div>
				<div class="bank flx-rs">
					<div class="left flx-rs">
						<img src="../../assets/img/bank.png">
						<span>招商银行</span>
						<span>6225 **** **** 1716</span>
					</div>
					<div class="right flx-r">
						<img src="../../assets/img/close.png">
						<span>已手动取消</span>
					</div>
				</div>
				<div class="plan flx-ras">
					<div class='plan-li plan-li-left flx-rs'>
						<span>总额度：</span>
						<span>¥10092</span>
					</div>
					<div class='plan-li plan-li-right flx-rs'>
						<span>本期还款金额：</span>
						<span>¥10092.25</span>
					</div>
					<div class='plan-li plan-li-left flx-rs'>
						<span>预留额度：</span>
						<span>¥6000</span>
						<div class="ratio">占59.94%</div>
					</div>
					<div class='plan-li plan-li-right flx-rs'>
						<span>已还款金额：</span>
						<span>¥738.91</span>
					</div>
				</div>
				<div class="cost flx-ras">
					<div class="cost-li flx-rs">
						<span>消费手续费：</span>
						<span>¥738.91</span>
					</div>
					<div class="cost-li flx-rs">
						<span>消费笔数：</span>
						<span>12+6(还款)</span>
					</div>
					<div class="cost-li flx-rs">
						<span>自用减免：</span>
						<span>¥0</span>
					</div>
					<div class="cost-li flx-rs">
						<span>还款笔数费：</span>
						<span>¥6</span>
					</div>
				</div>
				<div class="tips">
					<div style="text-align: left;">
						您当前为实习会员，成为最高级别会员再减手续费：¥32.29
					</div>
					<div style="text-align: left;">单卡按年计算：32.29*12个月 = 省387.48元</div>
					<div style="text-align: left;">
						提示：账单不明确可以添加客服微信，截图对账，或者直接拨打客
						服电话咨询
					</div>
				</div>
				<div class="cancel-box flx-r">
					<button class="cancel-btn">取消计划</button>
				</div>
			</div>
		</div>
		<div class="planDetail-bottom flx-rs">
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
			<button class="restart-btn">
				<div>重新启动</div>
				<div>还款计划</div>
			</button>
		</div>
	</div>
</template>
<script>
	import topTitle from '@/components/common/topTitle.vue';
	import {
		server
	} from '@/api/server.js';
	export default {
		components: {
			topTitle,
		},
		data() {
			return {
				titleName: '计划详情', //标题栏标题
			};
		},
		created(){
			// this.getCardPlanInfo()
		},
		methods: {
			getCardPlanInfo(){
				let planOrderId = '19080818133594601818670820';
				server.queryPlanBillDetail({planOrderId})
				.then(res=>{
					
					console.log(res)
				})
			}
			// planOrderId: 19080818133594601818670820
		}
	};
</script>
<style scoped="scoped" lang="less">
	.planDetail-top {
		margin-top: 88px;

		// padding: 30px 0;
		.plan-detail {
			width: 690px;
			// height: 500px;

			// background: pink;
			.orderId{
				padding-top:20px;
				width: 100%;
				color: #000;
				font-size: 24px;
				font-weight: bold;
			}
			.location {
				width: 100%;
				height: 90px;
				// background: skyblue;
				justify-content: space-between;

				.left {
					font-size: 30px;
					color: #333;

					img {
						width: 50px;
						height: 30px;
					}
					:nth-child(2) {
						padding-left: 10px;
					}

					:nth-child(3) {
						padding-left: 10px;
						// color: #4585f7;
						color: #3c9aff;
					}
				}

				.right {
					font-size: 22px;
					color: #666;

					img {
						width: 25px;
						height: 30px;
						padding: 0 20px;
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
				height: 141px;
				border-bottom: 1px solid #e5e5e5;
				box-sizing: border-box;
				// padding: 30px 0;
				flex-wrap: wrap;
				font-size: 22px;
				color: #333;

				.plan-li {
					height: 70px;
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
			.plan-li-left{
				width: 55% !important;
			}
			.plan-li-right{
				width: 45% !important;
			}
			.cost {
				width: 100%;
				font-size: 24px;
				height: 136px;
				flex-wrap: wrap;
				color: #666;

				.cost-li {
					width: 50%;
					height: 68px;

					:nth-child(2) {
						color: #333;
						height: 68px;
						line-height: 78px;
					}
				}
			}

			.tips {
				width: 100%;
				height: 180px;
				box-sizing: border-box;
				padding: 20px;
				border: 1px dashed #D2D2D2;
				font-size: 24px;
			}

			.cancel-box {
				width: 100%;
				padding: 30px 0;
				box-sizing: border-box;
				.cancel-btn {
					width: 100%;
					height: 90px;
					background: linear-gradient(90deg, rgba(110, 191, 255, 1), rgba(26, 130, 255, 1));
					box-shadow: -1px 10px 24px 0px rgba(53, 133, 254, 0.5);
					border-radius: 45px;
					color: #fff;
					font-size: 32px;
					font-weight: bold;
				}
			}
		}
	}
	.planDetail-bottom{
		width: 100%;
		height: 100px;
		// background: pink;
		position: fixed;
		bottom: 0;
		left: 0;
		box-sizing: border-box;
		padding: 0px 30px;
		font-size: 22px;
		color: #666;
		text-align: left;
		.left{
			width: 250px;
			height: 100%;
			.bottom{
				padding-top:10px;
				:nth-child(2){
					color:#3E80F7; 
				}
			}
		}
		.right{
			height: 100%;
			.bar{
				position: relative;
				width: 200px;
				height: 6px;
				background: #eee;
				margin: 6px 0;
			}
			.rate-bar{
				position: absolute;
				top: 0;
				left: 0;
				// width:40px;
				height: 6px;
				background: #51CC8D;
			}
			.num{
				:nth-child(2){
					padding-left:10px;
					color: #3E80F7;
				}
			}
		}
		.restart-btn{
			position: absolute;
			top: 0;
			right: 0;
			width: 150px;
			height: 100px;
			background: #1f86ff;
			// background: #3E80F7;
			color: #fff;
			font-size: 28px;
		}
	}
</style>
