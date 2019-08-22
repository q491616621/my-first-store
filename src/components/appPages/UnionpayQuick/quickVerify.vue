<template>
	<div>
		<!-- 顶部标题栏 -->
		<div class="title-bar flx-r">
			<top-title :titleName="titleName"></top-title>
		</div>
		<div class="verify-box">
			<div class="channel-information flx-rs" @click="aaa">
				<img src="../../../assets/img/unionpay.png">
				<div class="right flx-cs">
					<div  class="medium">快捷A(到账:9:10-22:10)</div>
					<div>普通0.6%+3;VIP:0.55%+3元/笔(最低支付金额到底方法</div>
				</div>
			</div>
			<van-cell-group class="sms-input">
			  <van-field v-model="smsCode" placeholder="请输入收到的短信验证码" />
			</van-cell-group>
			<button class="sure-btn">确定</button>
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
			titleName: '短信验证', //标题栏标题
			smsCode:'',//短信验证码
		};
	},
	beforeCreate() {
		document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
	},
	methods: {
		aaa() {
			this.$dialog.alert({
				title:'快捷A',
				message:'普通0.6%+3；VIP：0.55%+3元/笔（最低支付金额10元)'
			}).then(()=>{
				
			})
		}
	},
};
</script>

<style scoped="scoped" lang="less">
	.verify-box{
		width: 750px;
		margin-top: 88px;
		.channel-information{
			background: #fff;
			width: 100%;
			height: 120px;
			img{
				width: 50px;
				height: 32px;
				padding: 0 30px;
			}
			.right{
				// width: 505px;	
				height: 100%;
				text-align: left;
				line-height:44px;
				:nth-child(1){
					font-size: 28px;
					color: #333;
				}
				:nth-child(2){
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: 24px;
					color: #999;
					width: 510px;
				}
			}
		}
		.sms-input{
			margin-top: 20px;
			height: 90px;
		}
		.sure-btn{
			width: 690px;
			height: 88px;
			margin-top: 100px;
			background:linear-gradient(-90deg,rgba(63,129,246,1),rgba(127,187,249,1));
			box-shadow:0px 5px 10px 0px rgba(62,128,247,0.2);
			border-radius: 10px;
			font-size: 36px;
			color: #FFFFFF;
			
		}
	}
</style>