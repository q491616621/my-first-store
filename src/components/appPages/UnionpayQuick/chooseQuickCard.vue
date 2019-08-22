<template>
	<div>
		<!-- 顶部标题栏 -->
		<div class="title-bar flx-r">
			<top-title :titleName="titleName"></top-title>
		</div>
		<div class="container flx-cas">
			<div class="order-info">
				<div class="order-li flx-r">
					<div>订单编号</div>
					<div class="order-num medium">201908131725188450042</div>
				</div>
				<div class="order-li flx-r">
					<div>交易类型</div>
					<div class="order-type medium">银联快捷</div>
				</div>
				<div class="order-li flx-r">
					<div>交易金额</div>
					<div class="order-amount medium">¥128.00</div>
				</div>
			</div>
			<div class="title">选择银行卡</div>
			<div class="card-list">
				<div class="card-li flx-rs" v-for="(item,index) in cardList" :key='index'>
					<img class="bank-img" src="../../../assets/img/bankLogo/bank12.png">
					<div class="card-info flx-cs">
						<div class="medium">招商银行</div>
						<div>**** **** **** 1234</div>
					</div>
					<img class="choose-img" src="../../../assets/img/UnionpayQuick/checked.png">
				</div>
				<div class="add-card flx-r" @click="goAddQuickCard">
					<img src="../../../assets/img/UnionpayQuick/add.png">
					<span class="medium">添加信用卡</span>
				</div>
			</div>
			<div class="title flx-rs">
				<span>请选择支付通道</span>
				<span class="tips">(温馨提示:若支付失败,请更换其他支付通道支付)</span>
			</div>
			<div class="channel-list">
				<div class="channel-li flx-rs">
					<img src="../../../assets/img/cardManagement/Unionpay.png">
					<div style="text-align: left;">
						<div>银联快捷-积分通道B</div>
						<div class="channel-info flx-ras">
							<div>额度:200-20000</div>
							<div>结算:10秒到账</div>
							<div>时间:07:00-21:55</div>
							<div>费率:0.65%+2元/笔</div>
						</div>
						<div class="tip">
							<span style="color: #FF3535;">提示:</span>
							<span>暂不支持交通、浦发银行信用卡</span>
						</div>
					</div>
					<img src="../../../assets/img/UnionpayQuick/intro.png" class="tip2" @click="goChannelIntroduce">
					<!-- <img  class="tip2" @click="goChannelIntroduce"></img> -->
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
			titleName: '确认支付', //标题栏标题
			cardList:[1]
		};
	},
	beforeCreate() {
		document.querySelector('body').setAttribute('style', 'background-color:#FFFFFF')
	},
	methods: {
		// 跳转绑定快捷信用卡页面
		goAddQuickCard(){
			this.$router.push({
				'name':'addQuickCard'
			})
		},
		// 跳转通道介绍页面
		goChannelIntroduce() {
			this.$router.push({
				name:'channelIntroduce',
			})
		}
	},
};
</script>

<style scoped="scoped" lang="less">
	.container{
		width: 100%;
		margin-top: 88px;
		.order-info{
			width: 690px;
			font-size: 30px;
			color: #333;
			.order-li{
				height: 90px;
				border-bottom: 1px solid #E5E5E5;
				justify-content: space-between;
				.order-num{
					font-size: 28px;
				}
				.order-type{
					font-size: 28px;
				}
				.order-amount{
					font-size: 28px;
					color: #5B95F9;
				}
			}
			:nth-child(3){
				border: none;
			}
		}
		.title{
			width:750px;
			height: 90px;
			background: #f6f6f6;
			font-size: 28px;
			color: #666666;
			line-height: 90px;
			box-sizing: border-box;
			padding-left: 30px;
			text-align: left;
		}
		.tips{
			font-size: 18px;
			padding-left: 10px;
			color: #5B95F9;
		}
		.card-list{
			width: 690px;
			font-size:28px;
			.card-li{
				height: 120px;
				border-bottom: 1px solid #E5E5E5;
				.bank-img{
					width: 60px;
					height: 60px;
					padding-right: 20px;
				}
				.card-info{
					flex-grow: 1;
					:nth-child(1){
						padding: 10px 0;
					}
					:nth-child(2){
						font-size: 24px;
						color: #999;
					}
				}
				.choose-img{
					width: 40px;
					height: 40px;
				}
			}
			.add-card{
				height: 90px;
				color:#333;
				justify-content:flex-start;
				img{
					width: 40px;
					height: 40px;
					padding-right: 20px;
				}
			}
		}
		.channel-list{
			width: 690px;
			.channel-li{
				position: relative;
				padding: 20px 0;
				font-size: 28px;
				color: #333;
				border-bottom:1px solid #E5E5E5;
				img{
					width: 50px;
					height: 32px;
					padding-right: 30px;
				}
				.channel-info{
					flex-flow: wrap;
					padding-top:10px;
					div{
						width: 50%;
						font-size: 24px;
						color: #999;
					}
				}
				.tip{
					padding-top: 10px;
					font-size:22px;
					:nth-child(2){
						padding-left: 10px;
					}
				}
				.tip2{
					position: absolute;
					top: 1px;
					right: -31px;
					width: 70px;
					height: 70px;
				}
			}
		}
	}
</style>