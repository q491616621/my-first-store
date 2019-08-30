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
					<div :class="item.checked == true?'channel-li2':'channel-li1'" v-for="(item,index) in channelList" :key='index'
					 @click="checkChannel(index)">
						<div>{{item.channelName}}</div>
						<div class="yes flx-c" v-show="item.checked">
							<img src="../../assets/img/right.png">
						</div>
					</div>
				</div>
			</div>
			<div class="card flx-rs" v-for="(item,index) in cardList" :key='index'>
				<div class="right flx-c">
					<img src="../../assets/img/bank.png">
					<div>{{item.bankCardNumb}}</div>
					<div>{{item.bankName}}</div>
				</div>
				<div class="left flx-c">
					<div class="btn" color="#fff" @click="bindTheChannel(index)">绑定该通道</div>
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
	import switchServer from '../../../public/tool/switchServer.js';
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
				pageType: 'app', //上个页面是什么h5还是app?
				cardInfo: '',
				currentChannelCode: '', //当前选中的通道号
				currentIndex: '', //当前选择卡片序列号
				checkIndex: 0,
				channelList: [], //该卡片绑定的通道情况，status有三种状态 1已绑定该通道 -1未绑定该通道 0 通道正在绑定中（正在等待绑定的回调）
				cardList: [],
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
			// console.log(this.$route);
			let params = this.$route.params;
			console.log(params)
			if (Object.keys(params).length > 0) {
				// 判断上个页面是否传值过来,如果有的话说明上个页面是h5页面，直接执行getChannelList函数
				console.log('执行了h5页面进入')
				this.pageType = 'h5';
				this.getChannelList(params)
			} else {
				this.pageType = 'app';
				let me = this;
				window['appEnter'] = (url) => {
					me.appEnter(url)
				}
				console.log('执行了app页面进入')
				// let a =
				// 	'{"repayChannelCode": "1000020002","sessionId": "d06c2071-829c-4bbd-bf3d-3bae11caf1b0","certificateNum": "445122199010122716","userName": "王金盛"}';
				// 	this.appEnter(a)
			}
			// let cardInfo = this.$route.params
			// this.cardInfo = cardInfo; 
			// this.getChannelList()
		},
		mounted() {
			if(window.history&&window.history.pushState){
				window.addEventListener('popstate',()=>{
					this.$router.push({
						name:'myMessage'
					})
				})
			}
		},
		methods: {
			// 从App端进入该页面
			appEnter(e) {
				// 获取app传过来的sessionId并设置给cookie,再执行getChannelList函数
				let appData = JSON.parse(e);
				let sessionId = appData.sessionId;
				switchServer.setCookie(sessionId);
				this.getChannelList()
			},
			// 获取用户卡片在各通道的绑定情况
			getChannelList(data) {
				server.newRepayChannels()
					.then(res => {
						if (res == null) return;
						let channelList = [];
						let channelCode = '';
						if (data && data.channelCode) { //判断data.channeCode是否有值，有值的话说明是surePlan页面过来的
							channelList = res.data.reverse().map(cur => {
								// surePlan页面过来的,把用户当前要绑定的通道作为默认选择的通道
								if (cur.channelCode == data.channelCode) {
									cur.checked = true;
								} else {
									cur.checked = false;
								}
								return cur;
							});
							this.currentChannelCode = data.channelCode;
							channelCode = data.channelCode;
						} else {
							// 非surePlan页面过来的,把第一个通道作为默认选择的通道
							channelList = res.data.reverse().map((cur, index) => {
								if (index == 0) {
									cur.checked = true;
								} else {
									cur.checked = false;
								}
								return cur;
							});
							this.currentChannelCode = channelList[0].channelCode; //设置当前选择的通道号
							channelCode = channelList[0].channelCode;
						}
						this.channelList = channelList;
						server.queryCardInfoByChannel({
								channelCode
							})
							.then(res => {
								if (res == null) return;
								this.cardList = res.data.map(cur => {
									cur.bankCardNumb = cur.bankCardNumb.substr(cur.bankCardNumb.length - 4);
									return cur;
								});
							})
					})
			},
			// 切换通道查看
			checkChannel(index) {
				// 节流判断，当前通道号和点击的通道号相同，不发请求
				if (this.currentChannelCode == this.channelList[index].channelCode) return;
				let channelCode = this.channelList[index].channelCode;
				server.queryCardInfoByChannel({
						channelCode
					})
					.then(res => {
						if (res == null) return;
						// 修改当前选中的通道
						this.channelList = this.channelList.map((cur, idx) => {
							cur.checked = false;
							if (idx == index) {
								cur.checked = true;
							}
							return cur;
						})
						this.currentChannelCode = this.channelList[index].channelCode; //设置当前选择的通道号
						// 更新当前通道号的卡片列表
						this.cardList = res.data.map(cur => {
							cur.bankCardNumb = cur.bankCardNumb.substr(cur.bankCardNumb.length - 4);
							return cur;
						});
					})
			},
			// 绑定该通道
			bindTheChannel(index) {
				this.currentIndex = index;
				let init = {};
				init.channelCode = this.currentChannelCode;
				init.uniqueId = this.cardList[index].uniqueId;
				// 提示加载中
				tool.toastLoading()
				server.getBindcardSm(init)
					.then(res => {
						if (res == null) return;
						let status = res.data.status; //绑卡状态，0-处理中，1-绑卡成功，2-绑卡失败,3-已解绑，4-需短验
						//执行验证绑卡状态函数
						this.checkCardStatus(status, res);
					})
			},
			// 检查绑卡状态函数
			checkCardStatus(status, res) {
				if (status == 4) { //需短验
					this.$toast({
						message: '验证短信已发送,请留意接收',
						duration: 1000,
						forbidClick: true,
						onClose: () => {
							let verify = {};
							verify.channelCode = res.data.channelCode;
							verify.orderId = res.data.orderId;
							verify.recordId = res.data.recordId;
							verify.smsSeq = res.data.smsSeq || ''; //快付通通道的短信验证序列号
							this.verify = verify; //把短信验证需要的数据设置到data里面
							this.codeBox = true; //显示短信验证框
							this.countDownBox = true; //显示倒计时窗口
							// 等dom出现了,开始倒计时
							setTimeout(() => {
								this.$refs.countDown.start();
							}, 500)
						}
					})
				} else if (status == 0) { //处理中
					this.$toast({
						message: '绑卡正在处理中了，请稍等',
						forbidClick: true,
						onClose: () => {
							// 关闭弹窗时,如果是倒计时状态,就重置倒计时
							if (this.$refs.countDown) this.$refs.countDown.reset();
							// 关闭短信验证弹窗
							this.codeBox = false;
						}
					});
					return;
				} else if (status == 1) { //绑卡成功
					// 关闭短信窗口弹窗告知结果再返回上个页面
					this.$toast({
						message: '卡片绑定成功',
						forbidClick: true,
						onClose: () => {
							// 绑定成功把该卡从数组移除掉
							this.cardList = this.cardList.filter((cur, index) => {
								if (index != this.currentIndex) return cur;
							})
							// 关闭弹窗时,如果是倒计时状态,就重置倒计时
							if (this.$refs.countDown) this.$refs.countDown.reset();
							this.codeBox = false;
						}
					});
					return;
				} else if (status == 2) { //绑卡失败
					this.$toast({
						message: '卡片绑定失败',
						forbidClick: true,
						onClose: () => {
							// 关闭弹窗时,如果是倒计时状态,就重置倒计时
							if (this.$refs.countDown) this.$refs.countDown.reset();
							// 弹窗关闭后,关闭验证码框
							this.codeBox = false;
						}
					});
					return;
				} else if (status == 3) { //已经解绑
					this.$toast({
						message: '该卡绑定已解除',
						forbidClick: true,
						duration: 2000,
						onClose: () => {
							// 关闭弹窗时,如果是倒计时状态,就重置倒计时
							if (this.$refs.countDown) this.$refs.countDown.reset();
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
				init.uniqueId = this.cardList[this.currentIndex].uniqueId;
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
				if (this.$refs.countDown) this.$refs.countDown.reset();
				this.codeBox = false;
				this.smsCode = null;
				this.verify = null;
			},
		},
	};
</script>
<style scoped="scoped" lang="less">
	.container {
		width: 100%;
		margin-top: 88px;

		.title {
			width: 750px;
			height: 80px;
			font-size: 26px;
			color: #000;
			line-height: 80px;
			background: #fef7e6;
		}

		.channel {
			width: 100%;
			background: #fff;
			padding: 20px 40px;
			box-sizing: border-box;
			font-size: 26px;
			justify-content: flex-start;

			.name {
				width: 150px;
				text-align: left;
			}

			.channel-list {
				width: 520px;
				flex-wrap: wrap;

				.channel-li1 {
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

				.channel-li2 {
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

				.yes {
					position: absolute;
					bottom: -5px;
					right: -5px;
					border-radius: 50%;
					width: 30px;
					height: 30px;
					background: #fff;

					img {
						width: 20px;
						height: 20px;
					}
				}
			}
		}

		.card {
			margin-top: 30px;
			width: 690px;
			height: 300px;
			background: #ccc;
			border-radius: 10px;
			font-size: 28px;

			.right {
				width: 200px;
				height: 100%;
				background: #c2565b;
				border-top-left-radius: 10px;
				border-bottom-left-radius: 10px;
				color: #fff;

				img {
					width: 100px;
					height: 100px;
					padding-bottom: 10px;
				}

				div {
					padding-top: 10px;
				}
			}

			.left {
				width: 100%;
				height: 100%;

				.btn {
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
