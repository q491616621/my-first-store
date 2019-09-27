<template>
	<div class="container">
		<!-- 顶部标题栏 -->
		<div class="title-bar">
			<top-title :titleName="titleName" :pageType='pageType'></top-title>
			<div class="record" @click="goWithdrawalRecord">提现记录</div>
		</div>
		<!-- 没有绑定提现卡背景 -->
		<div v-if='!hasCard'>
			<div class="no-card flx-c medium">
				<img src="../../../assets/img/cardManagement_bg.png" alt="信用卡" />
				<div>您还没有绑定提现的银行卡哦~</div>
			</div>
			<!-- 确认结算按钮 -->
			<div class="flx-c btn-box">
				<button class="withdraw-btn bold" @click="goBindAtmCard">
					立即绑定
				</button>
			</div>
		</div>
		<!-- 绑定了提现卡 -->
		<div v-if="hasCard">
			<div class="withdraw-bank flx-rs">
				<img :src="bankCardInfo.logo">
				<div class="bank-info flx-c">
					<div class="bank-name">{{bankCardInfo.bankName}}</div>
					<div class="bank-num">尾号{{bankCardInfo.bankCardNumb}}</div>
				</div>
				<div class="changeBankCard" @click="goBindAtmCard">修改</div>
			</div>
			<div class="tips flx-rs">
				<img src="../../../assets/img/images/icon014.png">
				<div>单次提现金额上限50000,最低提现金额需不低于100</div>
			</div>
			<van-cell-group class='withdraw-input'>
				<van-field v-model="amount" type="number" label="金额" placeholder="请输入提现金额" />
			</van-cell-group>
			<div class="apply-amount">当前可提现金额:{{canApplyAmount}}</div>
			<div class="tips flx-rs">
				<img src="../../../assets/img/images/icon014.png">
				<div>提现扣除6%税加1元每笔手续费，申请成功后需1-2个工作日审核，请耐心等待！</div>
			</div>
			<!-- 确认结算按钮 -->
			<div class="flx-c btn-box">
				<button class="withdraw-btn bold" @click="ImmediateWithdraw">
					立即提现
				</button>
			</div>
		</div>
	</div>
</template>
<script>
	import topTitle from '@/components/common/topTitle.vue';
	import tool from '../../../../public/tool/tool.js';
	import switchServer from '../../../../public/tool/switchServer.js';
	import {
		server
	} from '@/api/server.js';
	export default {
		components: {
			topTitle,
		},
		data() {
			return {
				titleName: '提现', //标题栏标题
				pageType: 'app', //上个页面是什么h5还是app?
				canApplyAmount: '', //可提现金额
				bankCardInfo: '', //已经绑定的提现银行卡信息
				hasCard: false, //是否已经有绑卡了
				amount: '', //提现金额
			};
		},
		beforeRouteEnter(to, from, next) {
			let name = from.name;
			if (name == 'incomeDetails') {
				// this.$store.commit('setWithdrawalType')
				to.params.from = 'incomeDetails'
			}
			// 判断用户如果是从incomeDetails页面来的话,就把pageType 设置为h5,否则是app
			if (name == 'incomeDetails' || name == 'withdrawalRecord' || name == 'bindAtmCard') {
				to.params.type = 'h5'
			}
			next();
		},
		created() {
			if (this.$route.params.from == 'incomeDetails') {
				this.$store.commit('setWithdrawalType')
			}
			this.pageType = this.$store.state.withdrawalType;
			// 如果上个页面是h5页面中任意一个，不是app的话,直接执行获取银行卡信息
			if (this.$route.params.type == 'h5') {
				// 获取用户绑定了的银行卡信息
				this.getBankCard();
			} else {
				// console.log(111)
				let me = this;
				window['getSessionId'] = (url) => {
					me.getSessionId(url)
				}
			}
		},
		methods: {
			getSessionId(e) {
				let sessionId = JSON.parse(e).sessionId;
				switchServer.setCookie(sessionId);
				// document.cookie = `productSessionId=${sessionId};path=/;domain=47.112.10.80;`;
				this.getBankCard()
			},
			// 查询用户绑定了的银行卡信息
			getBankCard() {
				server.querySettleCard({
						isAppCall: 1
					})
					.then(res => {
						if (res == null) return;
						if (res.data.settleCardInfo != null) {
							let bankLogo = {
								'工商银行': require('../../../assets/img/bankLogo/bank1.png'),
								'光大银行': require('../../../assets/img/bankLogo/bank2.png'),
								'广发银行': require('../../../assets/img/bankLogo/bank3.png'),
								'华夏银行': require('../../../assets/img/bankLogo/bank4.png'),
								'建设银行': require('../../../assets/img/bankLogo/bank5.png'),
								'交通银行': require('../../../assets/img/bankLogo/bank6.png'),
								'民生银行': require('../../../assets/img/bankLogo/bank7.png'),
								'平安银行': require('../../../assets/img/bankLogo/bank8.png'),
								'浦发银行': require('../../../assets/img/bankLogo/bank9.png'),
								'兴业银行': require('../../../assets/img/bankLogo/bank10.png'),
								'邮政银行': require('../../../assets/img/bankLogo/bank11.png'),
								'招商银行': require('../../../assets/img/bankLogo/bank12.png'),
								'中国银行': require('../../../assets/img/bankLogo/bank13.png'),
								'中信银行': require('../../../assets/img/bankLogo/bank14.png'),
								'上海银行': require('../../../assets/img/bankLogo/bank16.png'),
							};
							let settleCardInfo = res.data.settleCardInfo
							settleCardInfo.logo = require('../../../assets/img/bankLogo/bank15.png');
							for (let item in bankLogo) {
								if (settleCardInfo.bankName == item) {
									settleCardInfo.logo = bankLogo[item];
								}
							}
							settleCardInfo.bankCardNumb = settleCardInfo.bankCardNumb.substr(settleCardInfo.bankCardNumb.length - 4);
							this.canApplyAmount = tool.centTurnSmacker(res.data.canApplyAmount / 100)
							this.bankCardInfo = settleCardInfo;
							this.hasCard = true;
						}
					})
			},
			// 立即提现
			ImmediateWithdraw() {
				let amount = this.amount * 100;
				if (amount == '' || amount == null) {
					this.$toast('请填写提现金额')
					return;
				}else if(amount < 10000){
					this.$toast('最低提现金额100哦！')
					return;
				}else if(amount > 5000000){
					this.$toast('最高提现金额50000哦！')
					return;
				}
				let init = {};
				init.cardId = this.bankCardInfo.id;
				init.amount = amount;
				this.$toast({
					type: 'loading',
					message: '提现申请正在提交',
					duration: 0,
					forbidClick: true
				})
				server.applyWithdraw(init)
					.then(res => {
						if (res == null) return;
						if (res.data.status == 1) {
							this.$toast({
								type: 'success',
								message: '申请成功，请耐心等待审核通过',
								forbidClick: true
							})
							// 提示成功通知结束后,跳转到提现记录页面
							setTimeout(() => {
								this.$router.push({
									name: 'withdrawalRecord',
								})
							}, 3000)
						} else {
							this.$toast({
								type: 'fail',
								message: '申请失败,请联系客服了解原因',
								forbidClick: true
							})
						}
					})
			},
			// 跳转到绑定提现银行卡页面
			goBindAtmCard() {
				if (this.hasCard == false) {
					this.$router.push({
						name: 'bindAtmCard',
					})
				} else {
					this.$router.push({
						name: 'bindAtmCard',
						params: {
							id: this.bankCardInfo.id
						}
					})
				}
			},
			// 跳转提现记录页面
			goWithdrawalRecord() {
				this.$router.push({
					name: 'withdrawalRecord',
				})
			}
		},
		watch: {
			// 限制用户输入的金额只能是小数点后2位
			amount(value, oldValue) {
				this.amount = (value.match(/^\d*(\.?\d{0,2})/g)[0])
			}
		}
	};
</script>
<style lang="less">
	.withdraw-input {
		.van-field__label {
			width: 80px;
			padding-right: 50px;
		}
	}
</style>
<style scoped="scoped" lang="less">
	.container {
		width: 100%;
	}

	.record {
		position: absolute;
		font-size: 28px;
		width: 120px;
		padding-right: 22px;
		height: 88px;
		top: 50%;
		right: 0;
		margin-top: -44px;
		line-height: 88px;
	}

	.withdraw-bank {
		margin-top: 88px;
		height: 140px;
		background: #fff;
		position: relative;

		img {
			padding-left: 30px;
			width: 80px;
			height: 80px;
		}

		.bank-info {
			align-items: flex-start;
			padding-left: 20px;

			.bank-name {
				font-size: 30px;
				color: #333;
			}

			.bank-num {
				padding-top: 10px;
				font-size: 24px;
				color: #666;
			}
		}

		.changeBankCard {
			position: absolute;
			top: 20px;
			right: 30px;
			font-size: 30px;
		}
	}

	.apply-amount {
		height: 80px;
		line-height: 80px;
		padding-left: 40px;
		color: #999;
		text-align: left;
		font-size: 30px;
	}

	.tips {
		height: 88px;
		color: #999;
		font-size: 24px;
		text-align: left;

		img {
			padding-left: 30px;
			padding-right: 30px;
			width: 20px;
			height: 20px;
		}
	}

	// 添加信用卡按钮
	.btn-box {
		margin-top: 100px;
		width: 100%;

		.withdraw-btn {
			width: 690px;
			height: 90px;
			background: linear-gradient(90deg, rgba(110, 191, 255, 1), rgba(26, 130, 255, 1));
			box-shadow: -1px 10px 24px 0px rgba(53, 133, 254, 0.5);
			border-radius: 45px;
			color: #fff;
			font-size: 32px;
			line-height: 90px;
			text-align: center;
		}
	}

	// 没有绑定提现卡
	.no-card {
		margin-top: 88px;
		padding-top: 275px;
		width: 100%;
		height: 330px;
		// background: #fff;
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
</style>
