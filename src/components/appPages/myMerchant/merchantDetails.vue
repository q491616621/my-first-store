<template>
	<div style="width: 100%;">
		<!-- 顶部标题栏 -->
		<div class="title-bar">
			<top-title :titleName="titleName"></top-title>
		</div>
		<!-- 标题 -->
		<!-- 	<div class="title flx-r">
			<span>我的推荐</span>
			<span>（393人）</span>
		</div> -->
		<!-- 推荐人列表 -->
		<van-list class="people-list" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
			<div class="people-li flx-r" v-for="(item,index) in list" :key='index'>
				<div class="name flx-c">
					<div>{{item.realName == ''||item.realName == null?'未实名':item.realName}}</div>
					<div>{{item.userMobile}}</div>
				</div>
				<div class="status flx-r">
					<div :class="item.authStatus == 0?'real-name2':'real-name1'">{{item.authStatus == 0?'未实名':'已实名'}}</div>
					<div :class="item.memberRoute == null||item.memberRoute==0?'vip1':'vip2'">{{item.memberRoute==null||item.memberRoute==0?'普通':'VIP'}}</div>
				</div>
				<!-- <div class="phone">
					<img src="../../../assets/img/phone2.png">
				</div> -->
			</div>
		</van-list>
	</div>
</template>
<script>
	import topTitle from '@/components/common/topTitle.vue';
	import tool from '../../../../public/tool/tool.js';
	import {
		server
	} from '@/api/server.js';
	export default {
		components: {
			topTitle,
		},
		data() {
			return {
				titleName: '我的商户', //标题栏标题
				list: [],
				loading: false,
				finished: false,
				page: 1, //当前页数
				pageSize: 10, //每页的个数
				userLevel: '',
			};
		},
		created() {
			// console.log(this.$route.params)
			this.userLevel = this.$route.params.userLevel;
			this.onLoad()
		},
		methods: {
			// 加载页面数据
			onLoad() {
				// 判断userLevel 是否为null,是的话不执行获取数据操作
				if(this.userLevel == null){
					this.finished = true;
					return;
				}
				let init = {
					userLevel: this.userLevel,
					page: this.page,
					pageSize: this.pageSize
				}
				this.loading = true;
				server.querySubAccountList(init)
					.then(res => {
						if (res == null) return;
						if (res.data.length == 0) {
							this.loading = false;
							this.finished = true;
							return;
						}
						let arr = res.data;
						this.list = this.list.concat(arr);
						this.loading = false;
						// 判断这次拿回来的数据是否小于每页的条数,小于的话不必再触发onLoad事件
						if (res.data.length < this.pageSize) {
							this.loading = false;
							this.finished = true;
							return
						}
						this.page += 1;
					})
				// 异步更新数据
				// setTimeout(() => {
				// 	for (let i = 0; i < 10; i++) {
				// 		this.list.push(this.list.length + 1);
				// 	}
				// 	// 加载状态结束
				// 	this.loading = false;
				// 	// 数据全部加载完成
				// 	if (this.list.length >= 40) {
				// 		console.log('触发了')
				// 		this.finished = true;
				// 	}
				// }, 500);
			},
			// 拨打电话
			callTel(phoneNum) {
				// 检查平台 0为安卓，1为ios，2为PC
				let platFlag = tool.testPlat();
				let init = {
					telNumber: phoneNum
				}
				if (platFlag == 1) {
					// 调用ios打电话的方法
					window.webkit.messageHandlers.callTelAction.postMessage(init);
				} else {
					// 调用安卓打电话方法
					window.android.callTelAction(JSON.stringify(init));
				}
			},
		},
	};
</script>

<style scoped="scoped" lang="less">
	// .title {
	// 	width: 100%;
	// 	height: 88px;
	// 	position: fixed;
	// 	top: 88px;
	// 	left: 0;
	// 	z-index: 1600;
	// 	background: #fff;
	// 	// margin-top: 88px;
	// 	border-bottom: 4px solid #2e90ff;
	// 	font-size: 30px;
	// 	font-weight: bold;
	// 	color: #333;

	// 	:nth-child(2) {
	// 		color: #2e90ff;
	// 		font-size: 30px;
	// 	}
	// }

	.people-list {
		margin-top: 88px;

		.people-li {
			width: 100%;
			height: 120px;
			// background: pink;
			justify-content: flex-start;
			font-size: 26px;
			box-sizing: border-box;
			padding-left: 20px;
			border-bottom: 1px solid #d7d7d7;

			.name {
				height: 100px;
				justify-content: space-around;
				align-items: flex-start;

				:nth-child(1) {
					font-size: 28px;
					color: #333;
					font-weight: bold;
				}

				:nth-child(2) {
					color: #999;
				}
			}

			.status {
				padding-left: 30px;
				font-size: 24px;

				.real-name1 {
					color: #fff;
					background: #2e90ff;
					padding: 6px 20px;
					border-radius: 10px;
				}

				.real-name2 {
					color: #fff;
					background: #989898;
					padding: 6px 20px;
					border-radius: 10px;
				}

				.vip1 {
					color: #333;
					padding-left: 30px;
					font-weight: bold;
				}

				.vip2 {
					color: #2e90ff;
					padding-left: 30px;
					font-weight: bold;
				}

				// :nth-child(2){
				// 	padding-left: 30px;
				// 	font-weight: bold;
				// }
			}

			.phone {
				padding-left: 200px;
				padding-top: 5px;

				img {
					width: 40px;
					height: 40px;
				}
			}
		}
	}
</style>
