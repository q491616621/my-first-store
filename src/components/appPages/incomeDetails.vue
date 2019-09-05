<template>
	<div>
		<!-- 顶部标题栏 -->
		<div class="title-bar">
			<top-title :titleName="titleName" :pageType='pageType'></top-title>
		</div>
		<!-- 收益总览 -->
		<div class="incomeAll-box flx-c">
			<div class="bar"></div>
			<div class="incomeAll flx-cas">
				<button class="withdrawal-btn" @click="goWithdrawal">提现</button>
				<div class="income flx-cas">
					<div>{{incomeDetail.totalIncome}}</div>
					<div class="name">总收益(元)</div>
				</div>
				<div class="detail flx-r">
					<div class="flx-c">
						<div>{{incomeDetail.todayIncome}}</div>
						<div class="name">今日收益(元)</div>
					</div>
					<span class="strip"></span>
					<div class="flx-c">
						<div>{{incomeDetail.monthIncome}}</div>
						<div class="name">本月预计(元)</div>
					</div>
				</div>
			</div>
			<div class="bar"></div>
		</div>
		<!-- 收益列表 -->
		<div class="income-list-box flx-cas">
			<van-list class='income-list' v-model="loading" :finished="finished" finished-text="没有更多了" :immediate-check='false'
			 @load="onLoad">
				<div class="income-li flx-cs" v-for="(item,index) in incomeList" :key='index'>
					<div class="top flx-rs">
						<div class="flx-rs">
							<img src="../../assets/img/images/icon013.png">
							<span>{{item.incomeType|type}}</span>
						</div>
						<div class="time">{{item.createTime}}</div>
					</div>
					<div class="bottom">
						<span>收益金额：</span>
						<span style="color: #ff9344;">¥{{item.profitAmount}}</span>
					</div>
				</div>
			</van-list>
		</div>
	</div>
</template>
<script>
	import topTitle from '@/components/common/topTitle.vue';
	import {
		server
	} from '@/api/server.js';
	import tool from '../../../public/tool/tool.js';
	import switchServer from '../../../public/tool/switchServer.js';
	export default {
		components: {
			topTitle,
		},
		data() {
			return {
				titleName: '收益明细', //标题栏标题
				pageType: 'app', //上个页面是什么h5还是app?
				incomeDetail: {}, //收入总信息
				incomeList: [], //收入明细列表
				list: [],
				loading: false,
				finished: false,
				page: 1, //页数
				pageSize: 20, //每页个数
			};
		},
		beforeRouteEnter(to,from,next){
			if(from.name == 'withdrawal'){
				to.params.page = 'withdrawal'
			}
			next();
		},
		created() {
			// 判断上个页面是否是withdrawal 页面
			if(this.$route.params.page == 'withdrawal'){
				this.getAllIncome();
				this.onLoad();
				return;
			}
			// 设置app调用的方法
			let me = this;
			window['getSessionId'] = (url) => {
				me.getSessionId(url)
			}
		},
		methods: {
			// 获取app页面传过来的参数
			getSessionId(e) {
				let sessionId = JSON.parse(e).sessionId;
				switchServer.setCookie(sessionId)
				// document.cookie = `productSessionId=${sessionId};path=/;domain=47.112.10.80;`;
				this.getAllIncome();
				this.onLoad();
			},
			// 获取收入总信息
			getAllIncome() {
				server.querySettleInfo()
					.then(res => {
						if (res == null) return;
						let init = res.data;
						let incomeDetail = {};
						incomeDetail.monthIncome = tool.centTurnSmacker(init.monthIncome); //今日收益金额
						incomeDetail.todayIncome = tool.centTurnSmacker(init.todayIncome); //本月预计收益金额
						incomeDetail.totalIncome = tool.centTurnSmacker(init.totalIncome); //总收益金额
						this.incomeDetail = incomeDetail;
					})
			},
			onLoad() {
				let init = {};
				init.page = this.page;
				init.pageSize = this.pageSize;
				this.loading = true;
				server.queryIncomeDetail(init)
					.then(res => {
						if (res == null) return;
						if (res.data.length == 0) {
							this.loading = false;
							this.finished = true;
							return;
						}
						let arr = res.data.map(cur => {
							cur.profitAmount = tool.centTurnSmacker(cur.profitAmount / 100);
							return cur;
						});
						// let incomeList = this.incomeList;
						this.incomeList = this.incomeList.concat(arr);
						this.loading = false;
						// 判断这次拿回来的数据是否小于每页的条数,小于的话不必再触发onLoad事件
						if (res.data.length < this.pageSize) {
							this.loading = false;
							this.finished = true;
							return
						}
						this.page += 1;
						// if(this.page > 3){
						// 	this.loading = false;
						// 	this.finished = true;
						// 	return;
						// }
						// let b = {
						// 	"payAcountId": "1159207707",
						// 	"incomeType": 1,
						// 	"profitAmount": 22,
						// 	"createTime": "2019-07-24 15:19:23"
						// };
						// for (let i = 0; i < 20; i++) {
						// 	this.incomeList.push(b)
						// }
						// this.loading = false;
						// this.page += 1;
						// 
						// console.log(res)
					})
			},
			// 跳转提现页面
			goWithdrawal() {
				this.$router.push({
					name: 'withdrawal',
					params: {
						amount: parseInt(this.incomeDetail.totalIncome)
					}
				})
			}
		},
		filters: {
			type(value) {
				let type = ''
				if (value == 1) {
					type = '代还返佣'
				}else if(value == 2){
					type = '直推会员返现'
				}
				return type;
			},
		}
	};
</script>

<style scoped="scoped" lang="less">
	// 总收益明细
	.incomeAll-box {
		width: 100%;
		position: fixed;
		z-index: 9999;
		top: 88px;
		left: 0;
		// padding-bottom: 20px;
		border-bottom: 20px solid #f6f6f6;
		overflow: hidden;

		.bar {
			width: 100%;
			height: 20px;
			background: #fff;
		}

		.incomeAll {
			// margin-top: 20px;
			width: 690px;
			height: 310px;
			border-radius: 10px;
			background: url('../../assets/img/images/icon010.png') no-repeat center center;
			background-size: 100% 100%;
			color: #fff;
			position: relative;
			box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);

			.withdrawal-btn {
				position: absolute;
				top: 20px;
				right: 20px;
				width: 128px;
				height: 54px;
				background: #fff;
				border-radius: 30px;
				line-height: 54px;
				text-align: center;
				font-size: 30px;
				color: #3e80f7;
			}

			.income {
				padding-top: 50px;
				font-size: 48px;

				.name {
					padding-top: 20px;
					font-size: 24px;
				}
			}

			.detail {
				width: 620px;
				margin-top: 30px;
				height: 80px;
				font-size: 30px;
				justify-content: space-around;

				.strip {
					width: 4px;
					height: 80px;
					background: rgba(255, 255, 255, 0.5);
				}

				.name {
					padding-top: 8px;
					font-size: 24px;
				}
			}
		}
	}

	// 收益明细列表
	.income-list-box {
		margin-top: 458px;
		padding-bottom: 30px;

		.income-list {
			width: 690px;

			.income-li {
				position: relative;
				// height: 156px;
				height: 100px;
				padding: 20px 0;
				border-bottom: 1px solid #e5e5e5;
				justify-content: space-between;

				.top {
					width: 100%;
					font-size: 30px;
					color: #333;
					justify-content: space-between;

					img {
						width: 60px;
						height: 60px;
						padding-right: 20px;
					}

					.time {
						font-size: 24px;
						color: #999;
					}
				}

				.bottom {
					width: 100%;
					text-align: right;
					font-size: 28px;
					color: #333;
				}
			}
		}
	}
</style>
