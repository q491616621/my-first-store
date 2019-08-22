<template>
	<div>
		<!-- 顶部标题栏 -->
		<div class="title-bar flx-r">
			<top-title :titleName="titleName"></top-title>
		</div>
		<!-- 正在加载中 -->
		<commomLoading v-if='commonLoading'></commomLoading>
		<div v-if="!commonLoading">
			<!-- 信用卡列表 -->
			<div class="card-list flx-cs" v-if='cardList.length != 0'>
				<div :class="item.bgClassName" v-for="(item,index) in cardList" :key='index'>
					<div class="card-top flx-cas">
						<div class="logo flx-rs">
							<img src="../../assets/img/cardManagement/logo.png">
							<div class="bold">{{item.bankName}}</div>
							<div>|</div>
							<div class="bold">CGB</div>
							<div>*{{item.bankCardNumb}}</div>
						</div>
						<div class="name">{{item.userName}}</div>
						<div class="bottom-info flx-rs">
							<div class="sms flx-rs">
								<span>短信提醒</span>
								<img src="../../assets/img/cardManagement/sure.png">
							</div>
							<div class="bill flx-rs">
								<div class="num">11</div>
								<div>
									<div class="bold">天后出账单</div>
									<div class="bold" style="text-align: left;">08-10</div>
								</div>
							</div>
							<div class="status-btn" v-if="item.planOrderId == null">新增还款</div>
							<div class="status-btn" v-if="item.planOrderId != null">查看计划</div>
						</div>
					</div>
					<div class="card-bottom flx-r">
						<div class="bottom-li flx-c">
							<div>未知</div>
							<div>还款金额</div>
						</div>
						<div class="bottom-li flx-c">
							<div>智还/空卡</div>
							<div>还款方式</div>
						</div>
						<div class="bottom-li flx-c">
							<div>未知</div>
							<div>还款笔数</div>
						</div>
						<div class="bottom-li flx-c">
							<div>未知</div>
							<div>手续费</div>
						</div>
						<div class="bottom-li flx-c">
							<img src="../../assets/img/cardManagement/Unionpay.png">
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 添加信用卡按钮 -->
		<div class="flx-c btn-box">
			<button class="flx-r add-btn" @click="goAddCreditCard">
				<img src="../../assets/img/cardManagement_add.png" alt="添加信用卡" />
				<div class="bold">添加信用卡</div>
			</button>
		</div>
		<!-- 没有信用卡时背景 -->
		<div class="no-card flx-c medium" v-if='cardList.length == 0'>
			<img src="../../assets/img/cardManagement_bg.png" alt="信用卡" />
			<div>暂时没有添加信用卡哦~</div>
		</div>
	</div>
</template>
<script>
	import topTitle from '@/components/common/topTitle.vue';
	import commomLoading from '@/components/common/loading.vue';
	import tool from '../../../public/tool/tool.js';
	import {
		server
	} from '@/api/server.js';
	export default {
		components: {
			topTitle,
			commomLoading,
		},
		data() {
			return {
				titleName: '信用卡管理', //标题栏标题
				pageType: 'app', //上个页面是什么h5还是app?
				cardList: [],
				commonLoading: true, //默认加载中，页面加载完成才消失
			};
		},
		beforeRouteEnter(to, from, next) {
			let name = from.name;
			if (name == 'planDetail' || name == 'chooseRepaymethod' || name == 'addCreditCard' || name == 'surePlan') {
				to.params.type = 'next'
			}
			next();
		},
		created() {
			// this.getCardList(); //执行获取已绑定卡列表
			if (this.$route.params.type == 'next') {
				this.getCardList() //执行获取已绑定卡列表
			} else {
				let me = this;
				window['getAppData'] = (url) => {
					me.getAppData(url)
				}
				let appData =
					'{"repayChannelCode": "1000000001","sessionId": "c78e66a7-6cc1-46a4-9f94-b6b1c76e0974","certificateNum": "445122199010122716","userName": "王金盛"}';
				this.getCardList()
				this.$store.commit('setCardManagement', JSON.parse(appData))
			}
		},
		methods: {
			// 获取app端传过来的数据
			getAppData(e) {
				// 获取到app端传过来的数据
				let appData = JSON.parse(e);
				let sessionId = appData.sessionId;
				document.cookie = `productSessionId=${sessionId};path=/;domain=47.112.10.80;`
				// localStorage.setItem('productSessionId', sessionId)
				this.$store.commit('setCardManagement', appData)
				this.getCardList() //执行获取已绑定卡列表
			},
			// 跳转添加信用卡页面
			goAddCreditCard() {
				this.$router.push({
					name: 'addCreditCard'
				})
			},
			// 跳转新增还款计划页面
			goAddrePayPlan(e) {
				let cardInfo = e;
				this.$router.push({
					name: 'chooseRepaymethod',
					params: cardInfo
				})
			},
			// 跳转到计划详情页面
			goPlanDetail(e) {
				let planOrderId = e;
				this.$router.push({
					name: 'planDetail',
					params: {
						planOrderId
					}
				})
			},
			// 获取已绑定卡列表函数
			getCardList() {
				server.getBindcardList({
						isLinkPlanId: 1,
					})
					.then(res => {
						if (res == null) return;
						let cardList = res.data.map((cur, index) => {
							cur.bankCardNumb = cur.bankCardNumb.substr(cur.bankCardNumb.length - 4);
							cur.bgClassName = `bg${(index+1)%5}`
							return cur;
						})
						this.cardList = cardList;
						this.commonLoading = false;
					})
			}
		},
		filters: {
			dateTime: (value) => {
				let time = value;
				if (time == null) {
					time = ''
				} else if (time < 10) {
					time = '0' + value;
				}
				return time;
			},
			Quota: (value) => {
				if (value == null) {
					value = ''
				} else {
					value = tool.centTurnSmacker(value);
				}
				return value;
			}
		}
	};
</script>
<style scoped="scoped" lang="less">
	// 信用卡列表
	.card-list {
		margin-top: 88px;
		width: 100%;
		padding-bottom: 150px;

		.bg1 {
			margin-top: 20px;
			width: 690px;
			height: 350px;
			background: url(../../assets/img/cardManagement/bg1.png) no-repeat center center;
			background-size: 100% 100%;
			border-radius: 10px;
			display: flex;
			flex-direction: column;
		}

		.bg2 {
			margin-top: 20px;
			width: 690px;
			height: 350px;
			background: url(../../assets/img/cardManagement/bg2.png) no-repeat center center;
			background-size: 100% 100%;
			border-radius: 10px;
			display: flex;
			flex-direction: column;
		}

		.bg3 {
			margin-top: 20px;
			width: 690px;
			height: 350px;
			background: url(../../assets/img/cardManagement/bg3.png) no-repeat center center;
			background-size: 100% 100%;
			border-radius: 10px;
			display: flex;
			flex-direction: column;
		}

		.bg4 {
			margin-top: 20px;
			width: 690px;
			height: 350px;
			background: url(../../assets/img/cardManagement/bg4.png) no-repeat center center;
			background-size: 100% 100%;
			border-radius: 10px;
			display: flex;
			flex-direction: column;
		}

		.bg0 {
			margin-top: 20px;
			width: 690px;
			height: 350px;
			background: url(../../assets/img/cardManagement/bg5.png) no-repeat center center;
			background-size: 100% 100%;
			border-radius: 10px;
			display: flex;
			flex-direction: column;
		}

		.card-li {
			margin-top: 20px;
			width: 690px;
			height: 350px;
			background: url(../../assets/img/cardManagement/bg1.png) no-repeat center center;
			background-size: 100% 100%;
			border-radius: 10px;
			display: flex;
			flex-direction: column;
		}

		.card-top {
			width: 100%;
			height: 220px;
			box-sizing: border-box;
			padding: 20px 30px;
			color: #fff;
			align-items: flex-start;

			.logo {
				font-size: 24px;

				img {
					width: 42px;
					height: 37px;
					padding-right: 10px;
				}

				:nth-child(3) {
					color: #B91227;
					padding: 0 10px;
				}

				// :nth-child(4){
				// 	font-size: 24px;
				// }
				:nth-child(5) {
					padding-left: 50px;
					font-size: 28px;
				}
			}

			.name {
				font-size: 30px;
				padding-top: 20px;
				padding-left: 85px;
			}

			.bottom-info {
				width: 100%;
				font-size: 24px;
				justify-content: space-between;
				padding-top: 20px;

				.sms {
					img {
						width: 23px;
						height: 23px;
						border: 2px solid #fff;
						padding: 2px;
						margin-left: 10px;
					}
				}

				.bill {
					.num {
						font-size: 48px;
						padding-right: 10px;
					}
				}

				.status-btn {
					width: 160px;
					height: 40px;
					background: #fff;
					color: #666;
					line-height: 44px;
					border-radius: 5px;
				}
			}
		}

		.card-bottom {
			width: 100%;
			height: 130px;
			border-radius: 0px 0px 10px 10px;
			background: rgba(0, 0, 0, 0.3);
			font-size: 24px;
			color: #fff;
			box-sizing: border-box;
			padding: 24px 30px;
			justify-content: space-between;

			img {
				padding-top: 10px;
				width: 105px;
				height: 67px;
			}

			.bottom-li {
				height: 100%;
				justify-content: space-between;

				:nth-child(2) {
					font-size: 20px;
				}
			}
		}
	}

	// 没有信用卡背景
	.no-card {
		margin-top: 88px;
		padding-top: 275px;
		width: 100%;
		height: 330px;
		justify-content: flex-start;

		img {
			width: 404px;
			height: 220px;
			flex-shrink: 0;
		}

		div {
			margin-top: 72px;
			font-size: 26px;
			color: #999;
		}
	}

	// 添加信用卡按钮
	.btn-box {
		width: 100%;
		position: fixed;
		bottom: 40px;
		left: 0;

		.add-btn {
			width: 690px;
			height: 90px;
			background: linear-gradient(90deg, rgba(110, 191, 255, 1), rgba(26, 130, 255, 1));
			box-shadow: -1px 10px 24px 0px rgba(53, 133, 254, 0.5);
			border-radius: 45px;
			justify-content: flex-start;
			box-sizing: border-box;
			padding-left: 234px;
			color: #fff;
			font-size: 32px;
			line-height: 90px;

			img {
				width: 31px;
				height: 30px;
				padding-right: 17px;
			}
		}
	}
</style>
