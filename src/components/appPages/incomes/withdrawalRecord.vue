<template>
	<div>
		<!-- 顶部标题栏 -->
		<div class="title-bar">
			<top-title :titleName="titleName"></top-title>
		</div>
		<!-- 提现记录列表 -->
		<van-list class='record-list flx-cas' v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
			<div class="record-li flx-r" v-for="(item,index) in list" :key='index' :title="item">
				<div class="flx-cs record-left">
					<div class="title">提现</div>
					<div class="time">{{item.createTime}}</div>
				</div>
				<div class="record-right bold">
					<div>{{item.withdrawAmount}}</div>
					<div>{{item.statusName}}</div>
				</div>
			</div>
		</van-list>
	</div>
</template>
<script>
	import topTitle from '@/components/common/topTitle.vue';
	import {
		server
	} from '@/api/server.js';
	import tool from '../../../../public/tool/tool.js';
	export default {
		components: {
			topTitle,
		},
		data() {
			return {
				titleName: '提现记录', //标题栏标题
				list: [],
				loading: false,
				finished: false,
				page: 1, //页数
				pageSize: 20, //每页的数量
			};
		},
		methods: {
			onLoad() {
				let init = {};
				init.page = this.page;
				init.pageSize = this.pageSize;
				server.queryWithdrawList(init)
					.then(res => {
						if (res == null) return;
						if (res.data.length == 0) {
							this.loading = false;
							this.finished = true;
							return;
						}
						let status = [
							{status:1,statusName:'付款成功'},
							{status:2,statusName:'付款失败'},
							{status:3,statusName:'处理中'},
							{status:4,statusName:'退票'},
							{status:5,statusName:'待审核'},
							{status:6,statusName:'审核通过'},
							{status:7,statusName:'审核不通过'},
						];//1-付款成功，2-付款失败，3-处理中，4-退票，5-待审核，6-审核通过，7-审核不通过'
						let arr = res.data.map(cur=>{
							cur.withdrawAmount = tool.centTurnSmacker(cur.withdrawAmount/100)
							status.forEach(item=>{
								if(cur.applyStatus == item.status){
									cur.statusName = item.statusName
								}
							})
							return cur;
						});
						this.list = this.list.concat(arr);
						let loading = false;
						this.page += 1;
						if (res.data.length < this.pageSize) {
							this.loading = false;
							this.finished = true;
						}
					})
				// 异步更新数据
				// 				setTimeout(() => {
				// 					for (let i = 0; i < 10; i++) {
				// 						this.list.push(this.list.length + 1);
				// 					}
				// 					// 加载状态结束
				// 					this.loading = false;
				// 
				// 					// 数据全部加载完成
				// 					if (this.list.length >= 40) {
				// 						this.finished = true;
				// 					}
				// 				}, 500);
			}
		},
	};
</script>
<style scoped="scoped" lang="less">
	.record-list {
		margin-top: 88px;
	}

	.record-li {
		width: 690px;
		height: 150px;
		border-bottom: 1px solid #e5e5e5;
		justify-content: space-between;
		background: #fff;

		.title {
			font-size: 30px;
			color: #333;
		}

		.time {
			padding-top: 20px;
			font-size: 24px;
			color: #999;
		}

		.record-right {
			font-size: 30px;
			color: #333;
			padding-right: 40px;
		}
	}
</style>
