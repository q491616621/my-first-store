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
					:class="item.check?'channel-li2':'channel-li1'" 
					v-for="(item,index) in channelList" 
					:key='index' 
					@click="checkChannel(index)">
						<div>{{item.channelName}}</div>
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
export default {
	components: {
		topTitle,
	},
	data() {
		return {
			titleName: '通道绑定', //标题栏标题
			channelList:[
				{id:1,channelName:'大额8',check:true},
				{id:2,channelName:'大额13',check:false},
				{id:3,channelName:'通道1',check:false},
				{id:4,channelName:'通道2',check:false},
				{id:5,channelName:'通道3',check:false},
			],
			cardList:[
				{id:1,cardNum:1234,cardBank:'招商银行',pass:true},
				{id:2,cardNum:2311,cardBank:'平安银行',pass:false},
				{id:3,cardNum:4515,cardBank:'广发银行',pass:false},
				{id:4,cardNum:2136,cardBank:'招商银行',pass:false},
				{id:5,cardNum:1245,cardBank:'广发银行',pass:true}
			]
		};
	},
	beforeCreate() {
		document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
	},
	methods: {
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
					flex-shrink: 0;
					width: 150px;
					height: 50px;
					line-height: 50px;
					color: #fff;
					background: #ccc;
					border-radius: 10px;
					margin-right: 20px;
					margin-bottom: 20px;
					// .check{
					// 	position: absolute;
					// 	bottom: 0;
					// 	right: -3px;
					// 	width: 26px;
					// 	height: 26px;
					// 	border-radius: 50%;
					// 	background: #fff;
					// 	background: url(../../assets/img/right.png) no-repeat center center;
					// 	background-size: 100% 100%;
					// }
				}
				.channel-li2{
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
				width: 150px;
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