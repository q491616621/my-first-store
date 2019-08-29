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
		<!-- 发短信弹窗 -->
		<van-dialog class="code-box flx-cas" v-model="codeBox" :show-confirm-button="false" ref='sms'>
			<!-- <div class="codeBox-logo flx-r"><img src="../../assets/img/addCreditCard_logo.png" alt="logo" /></div> -->
			<van-cell-group class="code-input flx-rs">
				<van-field class="input-box medium" v-model="smsCode" type="number" placeholder="请输入验证码" />
				<button class="send-btn medium" v-if='!countDownBox' @click="resendCode">发送验证码</button>
				<div class="send-btn medium flx-r" v-if="countDownBox">
					<van-count-down ref='countDown' class='count-down' :time="countDown" format='ss' :auto-start='false' @finish='finished' />
					<div>s 后重发</div>
				</div>
			</van-cell-group>
			<button class="sumbit-btn bold" @click="verifyBank">提交</button>
			<button class="cancel-btn" @click="closeCodeBox"></button>
		</van-dialog>
	</div>
</template>
<script>
	import topTitle from '@/components/common/topTitle.vue';
	import tool from '../../../public/tool/tool.js';
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
			currentChannelCode:'',//当前选中的通道号
			currentIndex:'',//当前选中的通道
			checkIndex:0,
			channelList:[],//该卡片绑定的通道情况，status有三种状态 1已绑定该通道 -1未绑定该通道 0 通道正在绑定中（正在等待绑定的回调）
			cardList:[],
			codeBox: false, //短信验证框
			countDownBox: true, //倒计时框
			smsCode: null, //验证码
			verify: null, //验证银行卡绑卡需要的信息
			countDown: 59000, //倒计时
		};
	},
	beforeCreate() {
		document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
	},
	created() {
		// let cardInfo = this.$route.params
		// this.cardInfo = cardInfo; 
		this.getChannelList()
	},
	methods: {
		// 获取用户卡片在各通道的绑定情况
		getChannelList(){
			server.newRepayChannels()
			.then(res=>{
				if(res == null) return;
				let channelList = res.data.reverse();
				this.channelList = channelList;
				let channelCode = channelList[0].channelCode;
				server.queryCardInfoByChannel({channelCode})
				.then(res=>{
					if(res == null)return;
					console.log(res)
				})
			})
		},
		// 切换通道
		checkChannel(index) {
			// this.channelList = this.channelList.map((cur,idx)=>{
			// 	cur.check = false;
			// 	if(idx == index){
			// 		cur.check = true;
			// 	}
			// 	return cur;
			// })
			
			let channelList = this.channelList;
			this.currentChannelCode = channelList[index].channelCode;
			this.currentIndex = index;
			if(channelList[index].status == 1) return;
			// 提示加载中
			tool.toastLoading()
			let init = {};
			init.channelCode = channelList[index].channelCode;
			init.uniqueId = this.cardInfo.uniqueId;
			server.getBindcardSm(init)
			.then(res=>{
				if (res == null) return;
				let status = res.data.status; //绑卡状态，0-处理中，1-绑卡成功，2-绑卡失败,3-已解绑，4-需短验
				// 执行验证绑卡状态函数
				this.checkCardStatus(status, res);
			})
		},
		// 检查绑卡状态函数
		checkCardStatus(status, res) {
			if (status == 4) {
				this.$toast({
					message: '验证短信已发送,请留意接收',
					duration: 1000,
					forbidClick: true,
					onClose: () => {
						let verify = {};
						verify.channelCode = res.data.channelCode;
						verify.orderId = res.data.orderId;
						verify.recordId = res.data.recordId;
						verify.smsSeq = res.data.smsSeq||'';//快付通通道的短信验证序列号
						this.verify = verify; //把短信验证需要的数据设置到data里面
						this.codeBox = true; //显示短信验证框
						this.countDownBox = true; //显示倒计时窗口
						// 等dom出现了,开始倒计时
						setTimeout(() => {
							this.$refs.countDown.start();
						}, 500)
					}
				})
			} else if (status == 0) {
				this.$toast({
					message: '绑卡正在处理中了，请稍等',
					forbidClick: true,
					onClose:()=>{
						// 关闭弹窗时,如果是倒计时状态,就重置倒计时
						if(this.$refs.countDown)this.$refs.countDown.reset();
						// 关闭弹窗后,修改这张卡片的状态为0,关闭验证码框
						this.channelList[this.currentIndex].status = 0;
						this.codeBox = false;
					}
				});
				return;
			} else if (status == 1) {
				// 关闭短信窗口弹窗告知结果再返回上个页面
				this.$toast({
					message: '卡片绑定成功',
					forbidClick: true,
					onClose:()=>{
						// 关闭弹窗时,如果是倒计时状态,就重置倒计时
						if(this.$refs.countDown)this.$refs.countDown.reset();
						// 弹窗关闭后,修改这张卡片的状态为1，关闭验证码框
						this.channelList[this.currentIndex].status = 1;
						this.codeBox = false;
					}
				});
				return;
			} else if (status == 2) {
				this.$toast({
					message: '卡片绑定失败',
					forbidClick: true,
					onClose:()=>{
						// 关闭弹窗时,如果是倒计时状态,就重置倒计时
						if(this.$refs.countDown)this.$refs.countDown.reset();
						// 弹窗关闭后,关闭验证码框
						this.codeBox = false;
					}
				});
				return;
			} else if (status == 3) {
				this.$toast({
					message: '该卡绑定已解除',
					forbidClick: true,
					duration: 2000,
					onClose:()=>{
						// 关闭弹窗时,如果是倒计时状态,就重置倒计时
						if(this.$refs.countDown)this.$refs.countDown.reset();
						this.codeBox = false;
					}
				});
				return;
			}
		},
		// 提交验证码，验证银行卡绑定
		verifyBank() {
			let smsCode = this.smsCode;
			if (smsCode == null || smsCode == '') {
				this.$toast({
					message: '请填写验证码',
					duration: 2000
				})
				return;
			} //未填写验证码时不进行下面操作
			tool.toastLoading()
			let verify = this.verify;
			verify.smsCode = this.smsCode;
			server.verifyBindcardSm(verify)
				.then(res => {
					if (res == null) return; //返回为null 不执行下面操作
					let status = res.data.status;
					this.checkCardStatus(status, res) //执行检查
				})
		},
		// 重新发送短信
		resendCode() {
			// 提示加载中
			tool.toastLoading();
			let init = {};
			init.channelCode = this.currentChannelCode;
			init.uniqueId = this.cardInfo.uniqueId;
			server.getBindcardSm(init)
				.then(res => {
					if (res == null) return;
					let status = res.data.status; //绑卡状态，0-处理中，1-绑卡成功，2-绑卡失败,3-已解绑，4-需短验
					// 执行验证绑卡状态函数
					this.checkCardStatus(status, res);
				})
			this.countDownBox = true;
			// 重新开始倒计时
			setTimeout(() => {
				this.$refs.countDown.start();
			}, 500)
		},
		// 倒计时结束后
		finished() {
			// 显示发送短信框
			this.countDownBox = false;
		},
		// 关闭弹窗
		closeCodeBox() {
			// 关闭弹窗时,如果是倒计时状态,就重置倒计时
			if(this.$refs.countDown)this.$refs.countDown.reset();
			this.codeBox = false;
			this.smsCode = null;
			this.verify = null;
		},
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
	// 验证码弹窗
	.code-box {
		width: 630px;
		// height: 571px;
		// height: 400px;
		height: 450px;
		background: #fff;
		border-radius: 22px;
		box-sizing: border-box;
		// padding-top: 247px;
		// padding-top: 100px;
		padding-top: 150px;
	
		.codeBox-logo {
			width: 192px;
			height: 192px;
			position: absolute;
			top: -86px;
			left: 50%;
			margin-left: -96px;
			z-index: 9999;
			border-radius: 50%;
			background: #fff;
			img {
				width: 175px;
				height: 175px;
				border-radius: 50%;
			}
		}
	
		.code-input {
			width: 553px;
			height: 100px;
			background: #fff;
			border: 1px solid #ededed;
			border-radius: 10px;
			box-sizing: border-box;
			padding: 0 26px;
			font-size: 130px;
	
			.input-box {
				font-size: 30px;
			}
	
			.send-btn {
				width: 180px;
				height: 55px;
				flex-shrink: 0;
				background: linear-gradient(90deg, rgba(110, 191, 255, 1), rgba(26, 130, 255, 1));
				box-shadow: 0px 6px 12px 0px rgba(53, 133, 254, 0.5);
				border-radius: 28px;
				font-size: 26px;
				line-height: 55px;
				color: #fff;
			}
	
			.count-down {
				color: #fff;
				letter-spacing: 4px;
			}
		}
	
		.sumbit-btn {
			margin-top: 63px;
			// width: 440px;
			width: 350px;
			height: 90px;
			background: linear-gradient(90deg, rgba(110, 191, 255, 1), rgba(26, 130, 255, 1));
			box-shadow: -1px 8px 14px 0px rgba(53, 133, 254, 0.5);
			border-radius: 45px;
			color: #fff;
			font-size: 32px;
		}
	
		.cancel-btn {
			width: 68px;
			height: 68px;
			position: absolute;
			bottom: -118px;
			left: 50%;
			margin-left: -34px;
			z-index: 9999;
			background: url(../../assets/img/addCreditCard_XX.png) no-repeat center center;
			background-size: 100% 100%;
		}
	}
	.van-dialog {
		overflow: visible;
	}
</style>