<template>
	<div>
		<!-- 顶部标题栏 -->
		<div class="title-bar">
			<top-title :titleName="titleName"></top-title>
		</div>
		<div class="container flx-cas">
			<div class="title bold">绑定所有通道,可以避免还款失败,丰富商户类型</div>
			<div class="channel flx-ras">
				<div class="name bold">认证通道</div>
				<div class="channel-list flx-rs">
					<div 
					:class="item.status == 0||item.status == 1?'channel-li1':'channel-li2'" 
					v-for="(item,index) in channelList" 
					:key='index' 
					@click="checkChannel(index)">
						<div>{{item.channelName}}</div>
						<div class="yes flx-c" v-if="item.check">
							<img src="../../assets/img/right.png">
						</div>
					</div>
				</div>
			</div>
			<div class="card flx-rs">
				<div class="right flx-c">
					<img src="../../assets/img/bank.png">
					<div>1716</div>
					<div>招商银行</div>
				</div>
				<div class="left flx-c">
					<div class="btn" color="#fff">绑定该通道</div>
				</div>
			</div>
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
			titleName: '通道绑定', //标题栏标题
			cardInfo:'',
			checkIndex:0,
			channelList:[],
		};
	},
	beforeCreate() {
		document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
	},
	created() {
		let cardInfo = this.$route.params
		this.cardInfo = cardInfo; 
		console.log(cardInfo)
		this.getUserCardInfo(cardInfo.uniqueId);
	},
	methods: {
		getUserCardInfo(uniqueId){
			server.queryChannelBindcardInfo({uniqueId})
			.then(res=>{
				this.channelList = res.data
				console.log(res)
			})
		},
		// // 获取通道列表
		// getChannelList(){
		// 	
		// },
		// 切换通道
		checkChannel(index) {
			this.channelList = this.channelList.map((cur,idx)=>{
				cur.check = false;
				if(idx == index){
					cur.check = true;
				}
				return cur;
			})
		}
	},
};
</script>
<style scoped="scoped" lang="less">
	.container{
		width: 100%;
		margin-top: 88px;
		.title{
			width: 750px;
			height: 80px;
			font-size: 26px;
			color: #000;
			line-height: 80px;
			background: #fef7e6;
		}
		.channel{
			width: 100%;
			background: #fff;
			padding: 20px 40px;
			box-sizing: border-box;
			font-size: 26px;
			justify-content: flex-start;
			.name{
				width: 150px;
				text-align: left;
			}
			.channel-list{
				width:520px;
				flex-wrap: wrap;
				.channel-li1{
					position: relative;
					flex-shrink: 0;
					width: 150px;
					height: 50px;
					line-height: 50px;
					color: #fff;
					background: #ccc;
					border-radius: 10px;
					margin-right: 20px;
					margin-bottom: 20px;
				}
				.channel-li2{
					position: relative;
					flex-shrink: 0;
					width: 150px;
					height: 50px;
					line-height: 50px;
					color: #fff;
					background: #7ca859;
					border-radius: 10px;
					margin-right: 20px;
					margin-bottom: 20px;
				}
				.yes{
					position: absolute;
					bottom:-5px;
					right: -5px;
					border-radius: 50%;
					width: 30px;
					height: 30px;
					background: #fff;
					img{
						width: 20px;
						height: 20px;
					}
				}
			}
		}
		.card{
			margin-top: 30px;
			width: 690px;
			height: 300px;
			background: #ccc;
			border-radius: 10px;
			font-size: 28px;
			.right{
				width: 200px;
				height: 100%;
				background: #c2565b;
				border-top-left-radius: 10px;
				border-bottom-left-radius: 10px;
				color: #fff;
				img{
					width: 100px;
					height: 100px;
					padding-bottom: 10px;
				}
				div{
					padding-top: 10px;
				}
			}
			.left{
				width: 100%;
				height: 100%;
				.btn{
					width: 220px;
					height: 70px;
					border-radius: 10px;
					color: #fff;
					background: #f6e159;
					text-align: center;
					line-height: 70px;
				}
			}
		}
	}
</style>