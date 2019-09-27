<template>
	<div>
		<!-- 顶部标题栏 -->
		<div class="title-bar flx-r">
			<top-title :titleName="titleName" :pageType='pageType'></top-title>
		</div>
		<!-- 正在加载中 -->
		<commomLoading v-if='commonLoading'></commomLoading>
		<!-- 加载失败，重新加载 -->
		<loadFail v-if='loadFail' @reload='reload'></loadFail>
		<div v-if="!commonLoading">
			<!-- 信用卡列表 -->
			<div class="card-list flx-cs" v-if='cardList.length != 0'>
				<!-- <div @click="goBindChannel">跳转绑定卡列表页面</div> -->
				<div :class="item.bgClassName" v-for="(item,index) in cardList" :key='index'>
					<div class="card-top flx-cas">
						<div class="logo flx-rs">
							<!-- <img src="../../assets/img/cardManagement/logo.png"> -->
							<img :src='item.logo'>
							<div class="bold">{{item.bankName}}</div>
							<div class="num1">****</div>
							<div class="num2">{{item.bankCardNumb}}</div>
						</div>
						<div class="name">{{item.userName}}</div>
						<div class="bottom-info flx-rs">
							<div class="sms flx-cas" v-if="item.billingDay != null">
								<div>{{item.billingDay|dateTime}}号</div>
								<div>账单日</div>
								<!-- <span>短信提醒</span> -->
								<!-- <img src="../../assets/img/cardManagement/sure.png"> -->
							</div>
							<div class="sms flx-cas" v-if="item.billingDay == null">
								<div>账单日未设置</div>
							</div>
							<!-- 				<div class="bill flx-rs" v-if="item.billingDay != null">
								<div class="num">{{item.billingDay|billDay}}</div>
								<div>
									<div class="bold">天后出账单</div>
									<div class="bold" style="text-align: left;">账单日:{{item.billingDay|dateTime}}号</div>
								</div>
								<div class="bill" v-if="item.billingDay == null">账单日未设置</div>
							</div> -->
							<div class="bill flx-rs" v-if="item.repaymentDay != null">
								<div class="num">{{item.repaymentDay|billDay}}</div>
								<div>
									<div class="bold">天后还款日</div>
									<div class="bold" style="text-align: center;">每月{{item.repaymentDay|dateTime}}号</div>
								</div>
							</div>
							<div class="bill" v-if="item.repaymentDay == null">还款日未设置</div>
							<div class="status-btn" @click.stop="goAddrePayPlan(item,index)" v-if="item.planOrderId == null">新增还款</div>
							<!-- <div class="status-btn" @click.stop="goAddrePayPlan(item,index)" v-if="item.planOrderId != null">新增还款</div> -->
							<div class="status-btn" @click.stop="goPlanDetail(item.planOrderId,item)" v-if="item.planOrderId != null">查看计划</div>
						</div>
					</div>
					<div class="card-bottom flx-r">
						<div class="bottom-li flx-c">
							<div>{{item.totalRepayAmount == null?'暂无计划':item.totalRepayAmount}}</div>
							<div>还款金额</div>
						</div>
						<div class="bottom-li flx-c">
							<div>{{item.repayType|formatRepayType}}</div>
							<!-- <div v-if="item.planOrderId != null">完美</div> -->
							<!-- <div v-if="item.planOrderId == null">空卡</div> -->
							<div>还款方式</div>
						</div>
						<div class="bottom-li flx-c">
							<div>{{item.repayTotalPens == null?'暂无':item.repayTotalPens}}</div>
							<div>还款笔数</div>
						</div>
						<div class="bottom-li flx-c">
							<div>{{item.totalRate == null?'暂无计划':item.totalRate}}</div>
							<div>手续费</div>
						</div>
						<div class="bottom-li flx-c">
							<img src="../../assets/img/cardManagement/Unionpay.png">
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
			<div class="card-list flx-cs" v-if='cardList.length == 0&&loadFail == false'>
				<div class="bg0 no-card">
					<div class="card-top flx-cas">
						<div class="logo flx-rs">
							<img src="../../assets/img/cardManagement/logo.png">
							<div class="bold">广发银行</div>
							<div>|</div>
							<div class="bold">CGB</div>
							<div>*8286</div>
						</div>
						<div class="name">李*强</div>
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
							<div class="status-btn">新增还款</div>
							<img class="example" src="../../assets/img/cardManagement/example.png">
						</div>
					</div>
					<div class="card-bottom flx-r">
						<div class="bottom-li flx-c">
							<div>未知</div>
							<div>还款金额</div>
						</div>
						<div class="bottom-li flx-c">
							<div>完美</div>
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
				<div class="tips">您暂时还没有添加信用卡哦~</div>
			</div>
		</div>
	</div>
</template>
<script>
	import topTitle from '@/components/common/topTitle.vue';
	import commomLoading from '@/components/common/loading.vue';
	import loadFail from '@/components/common/loadFail.vue';
	import tool from '../../../public/tool/tool.js';
	import switchServer from '../../../public/tool/switchServer.js';
	import {
		server
	} from '@/api/server.js';
	export default {
		components: {
			topTitle,
			commomLoading,
			loadFail
		},
		data() {
			return {
				titleName: '信用卡管理', //标题栏标题
				pageType: 'app', //上个页面是什么h5还是app?
				cardList: [],
				commonLoading: true, //默认加载中，页面加载完成才消失
				loadFail: false, //默认不显示，页面加载失败时显示
			};
		},
		beforeRouteEnter(to, from, next) {
			let name = from.name;
			if (name == 'planDetail' || name == 'chooseRepaymethod' || name == 'addCreditCard' || name == 'surePlan' || name ==
				'bindChannel') {
				to.params.type = 'next'
			}
			next();
		},
		beforeCreate() {
			document.querySelector('body').setAttribute('style', 'background-color:#FFFFFF')
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
				// let appData =
				// 	// '{"repayChannelCode": "1000010002","sessionId": "d06c2071-829c-4bbd-bf3d-3bae11caf1b0","certificateNum": "445122199010122716","userName": "王金盛"}';
				// 	// '{"repayChannelCode": "1000010002","sessionId": "d06c2071-829c-4bbd-bf3d-3bae11caf1b0","certificateNum": "231084199508103628","userName": "刘昭茜"}';
				// 	// 正式服务器
				// 	// '{"repayChannelCode": "1000010002","sessionId": "d06c2071-829c-4bbd-bf3d-3bae11caf1b0","certificateNum": "36062219910910705X","userName": "黄国桥"}';
				// 	'{"repayChannelCode": "1000010002","sessionId": "d06c2071-829c-4bbd-bf3d-3bae11caf1b0","certificateNum": "441823199308235917","userName": "何守卫"}';
				// this.getCardList()
				// // 1000000001 1000010002 1000020002
				// this.$store.commit('setCardManagement', JSON.parse(appData))
				// // this.getAppData(appData)
			}
		},
		mounted() {
			// 监控安卓回退按钮,设置返回事件
			if (window.history && window.history.pushState) {
				history.pushState(null, null, document.URL);
				window.addEventListener('popstate', this.goBack, false)
			}
		},
		destroyed() {
			// 组件销毁时,移除事件,避免其他页面触发
			window.removeEventListener('popstate', this.goBack, false)
		},
		methods: {
			// 返回事件(安卓手机返回按钮)
			goBack() {
				window.android.btnBack()
			},
			// 重新刷新
			reload() {
				this.loadFail = false;
				this.commonLoading = true;
				this.getCardList()
			},
			// 获取app端传过来的数据
			getAppData(e) {
				// 这行代码用来判断用户是否是从app端进来当前页面的,如果不是的app端进来的或者处于非cardManagement页面,不执行下面的操作(这个是为了优化安卓不多次调用接口)
				if(this.$route.name != 'cardManagement'||this.$route.params.type == 'next')return;
				// 获取到app端传过来的数据
				let appData = JSON.parse(e);
				let sessionId = appData.sessionId;
				switchServer.setCookie(sessionId)
				// 测试服务器
				// document.cookie = `productSessionId=${sessionId};path=/;domain=47.112.10.80;`
				// localStorage.setItem('productSessionId', sessionId)
				this.$store.commit('setCardManagement', appData)
				this.getCardList() //执行获取已绑定卡列表
			},
			// 跳转添加信用卡页面
			goAddCreditCard() {
				this.$router.push({
					name: 'addCreditCard',
				})
			},
			// 跳转新增还款计划页面
			goAddrePayPlan(e, index) {
				let cardInfo = e;
				cardInfo.bgClassName = `bg${(index+1)%5}`
				cardInfo.defaultChannelCode = this.$store.state.repayChannelCode;//把默认的通道号传过去
				this.$router.push({
					name: 'chooseRepaymethod',
					params: cardInfo
				})
			},
			// 跳转到计划详情页面
			goPlanDetail(e, item) {
				let planOrderId = e;
				this.$router.push({
					name: 'planDetail',
					params: {
						planOrderId,
						cardInfo: item
					}
				})
			},
			// 跳转绑定通道页面
			goBindChannel() {
				this.$router.push({
					name: 'bindChannel',
					params: {
						channelCode: '1000020002',
						page: 'surePlan'
					},
					// params:{page:'addCreditCard'},
					// 1000000001 1000010002 1000020002
				})
			},
			// 获取已绑定卡列表函数
			getCardList() {
				server.getBindcardList({
						isLinkPlanId: 1,
					})
					.then(res => {
						if (res == null) {
							this.commonLoading = false;
							this.loadFail = true;
							return;
						}
						let bankLogo = {
							'工商银行': require('../../assets/img/bankLogo/bank1.png'),
							'光大银行': require('../../assets/img/bankLogo/bank2.png'),
							'广发银行': require('../../assets/img/bankLogo/bank3.png'),
							'华夏银行': require('../../assets/img/bankLogo/bank4.png'),
							'建设银行': require('../../assets/img/bankLogo/bank5.png'),
							'交通银行': require('../../assets/img/bankLogo/bank6.png'),
							'民生银行': require('../../assets/img/bankLogo/bank7.png'),
							'平安银行': require('../../assets/img/bankLogo/bank8.png'),
							'浦发银行': require('../../assets/img/bankLogo/bank9.png'),
							'兴业银行': require('../../assets/img/bankLogo/bank10.png'),
							'邮政银行': require('../../assets/img/bankLogo/bank11.png'),
							'招商银行': require('../../assets/img/bankLogo/bank12.png'),
							'中国银行': require('../../assets/img/bankLogo/bank13.png'),
							'中信银行': require('../../assets/img/bankLogo/bank14.png'),
							'上海银行': require('../../assets/img/bankLogo/bank16.png'),
						};

						let cardList = res.data.map((cur, index) => {
							cur.bankCardNumb = cur.bankCardNumb.substr(cur.bankCardNumb.length - 4);
							cur.bgClassName = `bg${(index+1)%5}`;
							cur.logo = require('../../assets/img/bankLogo/bank15.png');
							for (let item in bankLogo) {
								if (cur.bankName == item) {
									cur.logo = bankLogo[item];
								}
							}
							return cur;
						})
						this.cardList = cardList;
						this.commonLoading = false;
					})
			}
		},
		filters: {
			// 格式化时间
			dateTime: (value) => {
				let time = value;
				if (time == null) {
					time = ''
				} else if (time < 10) {
					time = '0' + value;
				}
				return time;
			},
			// 格式化金额
			Quota: (value) => {
				if (value == null) {
					value = ''
				} else {
					value = tool.centTurnSmacker(value);
				}
				return value;
			},
			// 格式化距离出账单的天数
			billDay: (value) => {
				let date = new Date();
				// let billingDate = 31;
				let month = date.getMonth() + 1; //获取当前月份
				let year = date.getFullYear(); //获取当前年份
				let monthDay = new Date(year, month, 0).getDate() //当前月有多少天
				let nowDay = date.getDate(); //获取当前的日期
				let billing = 0;
				if (nowDay > value) {
					//如果当前日期已经超过了账单日,这个月的天数减去当前日期加上账单日，得到差多少天出账单
					billing = monthDay - nowDay + value;
				} else {
					// 如果当前日期未超过账单日,账单日减去当前日期,得到差多少天出账单
					billing = value - nowDay;
				}
				return billing;
			},
			// 格式化还款方式
			formatRepayType: (value) => {
				if (value == null) return value = '暂无计划';
				if (value == 1) {
					value = '完美还款'
				} else if (value == 2) {
					value == '智能还款'
				} else {
					value = '0余额还款'
				}
				return value;
			},
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
			// background: url(http://px45uxsff.bkt.clouddn.com/bg1.jpg) no-repeat center center;
			background: url(../../assets/img/cardManagement/bg1.jpg) no-repeat center center;
			background-size: 100% 100%;
			border-radius: 10px;
			display: flex;
			flex-direction: column;
		}

		.bg2 {
			margin-top: 20px;
			width: 690px;
			height: 350px;
			// background: url(https://px45uxsff.bkt.clouddn.com/bg2.jpg) no-repeat center center;
			background: url(../../assets/img/cardManagement/bg2.jpg) no-repeat center center;
			background-size: 100% 100%;
			border-radius: 10px;
			display: flex;
			flex-direction: column;
		}

		.bg3 {
			margin-top: 20px;
			width: 690px;
			height: 350px;
			// background: url(https://px45uxsff.bkt.clouddn.com/bg3.jpg) no-repeat center center;
			background: url(../../assets/img/cardManagement/bg3.jpg) no-repeat center center;
			background-size: 100% 100%;
			border-radius: 10px;
			display: flex;
			flex-direction: column;
		}

		.bg4 {
			margin-top: 20px;
			width: 690px;
			height: 350px;
			// background: url(https://px45uxsff.bkt.clouddn.com/bg4.jpg) no-repeat center center;
			background: url(../../assets/img/cardManagement/bg4.jpg) no-repeat center center;
			background-size: 100% 100%;
			border-radius: 10px;
			display: flex;
			flex-direction: column;
		}

		.bg0 {
			margin-top: 20px;
			width: 690px;
			height: 350px;
			// background: url(https://px45uxsff.bkt.clouddn.com/bg5.jpg) no-repeat center center;
			background: url(../../assets/img/cardManagement/bg5.jpg) no-repeat center center;
			background-size: 100% 100%;
			border-radius: 10px;
			display: flex;
			flex-direction: column;
		}

		.card-li {
			margin-top: 20px;
			width: 690px;
			height: 350px;
			// background: url(https://px45uxsff.bkt.clouddn.com/bg1.jpg) no-repeat center center;
			background: url(../../assets/img/cardManagement/bg1.jpg) no-repeat center center;
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

				.num1,
				.num2 {
					font-size: 28px;
					color: #fff;
					padding-left: 15px;
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
		position: relative;

		.example {
			width: 120px;
			position: absolute;
			top: 20px;
			right: 20px;
		}
	}

	.tips {
		padding-top: 20px;
		width: 100%;
		text-align: center;
		font-size: 32px;
		color: #999;
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
