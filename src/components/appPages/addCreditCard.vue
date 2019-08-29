<template>
	<div>
		<!-- 顶部标题栏 -->
		<div class="title-bar">
			<top-title :titleName="titleName" :pageType='pageType'></top-title>
		</div>
		<!-- 信息栏列表 -->
		<div class="addCreditCard-bottom flx-c">
			<van-cell-group class="addInfo-box">
				<van-field class="addInput-li" label-width="2.373333rem" type="number" v-model="cardInfo.cardNum" clearable label="卡号"
				 placeholder="请输入卡号" @blur='checkCardBank' />
				<van-field class="addInput-li" label-width="2.373333rem" type="number" v-model="cardInfo.cvn2" clearable label="cvn2"
				 placeholder="信用卡背面后三位，如853" />
				<van-field class="addInput-li" label-width="2.373333rem" type="number" v-model="cardInfo.valid" clearable label="有效期"
				 placeholder="有效期（月/年），如0123" />
				<van-field class="addInput-li" label-width="2.373333rem" v-model="cardInfo.userName" disabled clearable label="姓名"
				 placeholder="请输入姓名" />
				<van-field class="addInput-li" label-width="2.373333rem" v-model="cardInfo.certificateNum" disabled clearable label="身份证号"
				 placeholder="请输入身份证号码" />
				<van-field class="addInput-li" label-width="2.373333rem" v-model="cardInfo.bankName" clearable label="开户行"
				 placeholder="例如:建设银行" />
				<!-- <div class="addPicker-li flx-rs" @click="chooseBank">
					<div>开户行</div>
					<div class="right">
						<div>{{ cardInfo.bankName }}</div>
						<img src="../../assets/img/addCreditCard_choose.png" alt="选择" />
					</div>
				</div> -->
				<van-field class="addInput-li" label-width="2.373333rem" type="number" v-model="cardInfo.mobile" clearable label="手机号码"
				 placeholder="请输入银行预留手机号" />
				<button class="sure-btn bold" @click="showCodeBox">确认添加</button>
			</van-cell-group>
		</div>
		<!-- 选择开户行 -->
		<!-- 	<div class="addCreditCard-choose-picker">
			<van-popup v-model="chooseBankBox" position="bottom">
				<van-picker show-toolbar title="请选择信用卡开户行" :columns="columns" @cancel="onCancel" @confirm="onConfirm" @change="onChange" :item-height='50' />
			</van-popup>
		</div> -->
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
	import {
		server
	} from '@/api/server.js';
	// import {
	// 	Toast
	// } from 'vant';
	import tool from '../../../public/tool/tool.js';
	export default {
		components: {
			topTitle
		},
		data() {
			return {
				titleName: '添加信用卡', //标题栏标题
				pageType: 'h5', //上个页面是什么h5还是app?
				codeBox: false, //短信验证框
				countDownBox: true, //倒计时框
				smsCode: null, //验证码
				cardInfo: {
					cardNum: '', //卡号
					cvn2: null, //cvv码
					valid: null, //有效期
					userName: null, //姓名
					certificateNum: null, //身份证号码
					bankName: '', //开户行
					mobile: null, //手机号
					bankAgentId: '', //信惠通道必须的联行号
					bankType:'',//快付通大小额必须的联行号
					cardType: '2', //卡类型
					channelCode: ''//通道号
				},
				// chooseBankBox: false,//选择银行的picker弹窗
				verify: null, //验证银行卡绑卡需要的信息
				// countDown: 10000, //倒计时
				countDown: 59000, //倒计时
			};
		},
		created() {
			this.getUserInfo(); //获取用户身份信息函数
		},
		methods: {
			// 获取用户身份信息
			getUserInfo() {
				// let userInfo = JSON.parse(localStorage.getItem('userInfo'));
				// this.cardInfo.userName = userInfo.realName;
				// this.cardInfo.certificateNum = userInfo.certificateNumb;
				this.cardInfo.userName = this.$store.state.userName;//从vuex里面拿用户姓名
				this.cardInfo.certificateNum = this.$store.state.certificateNum;//从vuex里面拿用户身份证号码
				this.cardInfo.channelCode = this.$store.state.repayChannelCode;//从vuex里面拿通道编号
			},
			// 查询开户行
			checkCardBank() {
				let bankcardNumb = this.cardInfo.cardNum;
				let channelCode = this.cardInfo.channelCode;
				server.queryBankcardInfo({
						bankcardNumb,
						channelCode
					})
					.then(res => {
						// 判断返回的数据是null或者是{},不执行下面的操作
						if (res == null || JSON.stringify(res.data) == '{}'){
							this.cardInfo.bankAgentId = '';
							this.cardInfo.bankType = '';
							this.cardInfo.bankName = '';
							return;
						}
						// 判断是否有返回信惠的联行号
						if (res.data.xhBankAgentId == '' || res.data.xhBankAgentId == null) {
							this.cardInfo.bankAgentId = '';
						} else {
							this.cardInfo.bankAgentId = res.data.xhBankAgentId;
						}
						// 判断是否有返回快付通的联行号
						if(res.data.kftBankType == '' || res.data.kftBankType == null){
							this.cardInfo.bankType = '';
						}else{
							this.cardInfo.bankType = res.data.kftBankType;
						}
						this.cardInfo.bankName = res.data.bankName;
					})
			},
			// 显示弹窗
			showCodeBox() {
				let cardInfo = this.cardInfo;
				// 通道号1000000001 信惠的，这个通道必须有联行号
				if (cardInfo.channelCode == '1000000001' && cardInfo.bankAgentId == '') {
					this.$toast('该卡不支持,请填其他卡')
					return;
				}else if(cardInfo.channelCode == '1000010002' && cardInfo.bankType == ''){
					this.$toast('该卡不支持,请填其他卡')
					return;
				// 通道号1000010002，1000020002 快付通带下额通道必须有联行号
				}else if(cardInfo.channelCode == '1000020002' && cardInfo.bankType == ''){
					this.$toast('该卡不支持,请填其他卡')
					return;
				}
				let value = true;
				let verifier = {
					'cardNum': '卡号',
					'cvn2': 'cvv码',
					'valid': '卡片有效期',
					'userName': '姓名',
					'certificateNum': '身份证号码',
					'bankName': '开户行',
					'mobile': '银行预留手机号',
				}
				// 判读cardInfo 里面哪个值没填写,返回对应提示文字
				for (let it in cardInfo) {
					if (cardInfo[it] == null || cardInfo[it] == '') {
						for (let item in verifier) {
							if (item == it) {
								value = verifier[item]
							}
						}
					}
				}
				// 如果value 为true 的话,进行下一步提交卡片，否则提示用户哪些信息未填写
				if (value === true) {
					// 提示加载中
					tool.toastLoading()
					server.getBindcardSm(cardInfo)
						.then(res => {
							if (res == null) return;
							let status = res.data.status; //绑卡状态，0-处理中，1-绑卡成功，2-绑卡失败,3-已解绑，4-需短验
							// 执行验证绑卡状态函数
							this.checkCardStatus(status, res);
						})
				} else {
					this.$toast({
						message: `请填写${value}`
					})
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
						message: '绑卡正在处理中，请稍等',
						forbidClick: true,
					});
					setTimeout(()=>{
						this.$router.push({
							name:'cardManagement',
							params:{
								type:'next'
							}
						})
					},2000)
					return;
				} else if (status == 1) {
					// 关闭短信窗口弹窗告知结果再返回上个页面
					this.codeBox = false;
					this.$toast({
						message: '卡片绑定成功',
						forbidClick: true,
					});
					setTimeout(()=>{
						this.$router.push({
							name:'cardManagement',
							params:{
								type:'next'
							}
						})
					},2000)
					return;
				} else if (status == 2) {
					this.$toast({
						message: '卡片绑定失败',
						forbidClick: true,
						duration: 2000,
						onClose:()=>{
							// 关闭弹窗时,如果是倒计时状态,就重置倒计时
							if(this.$refs.countDown)this.$refs.countDown.reset();
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
			// 重新发送短信
			resendCode() {
				// 提示加载中
				tool.toastLoading();
				let cardInfo = this.cardInfo;
				server.getBindcardSm(cardInfo)
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
			// 选择银行
			// chooseBank() {
			// 	this.chooseBankBox = true;
			// },
			// onCancel(value, index) {
			// 	console.log(1)
			// },
			// onConfirm(value, index) {
			// 	console.log(2)
			// },
			// onChange(picker, value, index) {
			// }
		}
	};
</script>
<style lang="less">
	.addCreditCard-choose-picker {
		.van-picker__toolbar {
			height: 70px;
			line-height: 70px;
		}

		.van-picker__cancel,
		.van-picker__title,
		.van-picker__confirm,
		.van-picker-column {
			font-size: 30px;
		}
	}

	.mint-toast-text {
		font-size: 30px;
	}
</style>
<style scoped="scoped" lang="less">
	// 信息栏列表
	.addCreditCard-bottom {
		margin-top: 88px;
		width: 100%;
		box-sizing: border-box;
		padding: 20px 30px;

		.addInfo-box {
			width: 690px;
			box-sizing: border-box;
			padding: 0 30px 110px;
			// height: 980px;
			background: #fff;
			box-shadow: 0px 3px 12px 0px rgba(212, 212, 212, 0.5);
			border-radius: 14px;

			.addInput-li {
				width: 100%;
				// height: 100px;
				font-size: 30px;
				font-weight: 500;
				padding: 25px 0;
				text-align: left;
				color: #888;
				// line-height: 100px;
				box-sizing: border-box;
				border-bottom: 1px solid #ededed;
			}

			.addPicker-li {
				width: 100%;
				height: 100px;
				font-size: 30px;
				font-weight: 500;
				color: #888;
				line-height: 100px;
				box-sizing: border-box;
				border-bottom: 1px solid #ededed;

				.right {
					width: 450px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					color: #323233;

					img {
						width: 11px;
						height: 20px;
					}
				}
			}

			.addPicker-li :first-child {
				width: 178px;
				text-align: left;
			}

			.sure-btn {
				margin-top: 80px;
				width: 630px;
				height: 90px;
				background: linear-gradient(90deg, rgba(110, 191, 255, 1), rgba(26, 130, 255, 1));
				box-shadow: -1px 10px 24px 0px rgba(53, 133, 254, 0.5);
				border-radius: 45px;
				line-height: 90px;
				color: #fff;
				font-size: 32px;
			}
		}
	}

	.userInfo-box {
		width: 690px;
		height: 980px;
		box-sizing: border-box;
		// border: 1px solid #000;
		border-radius: 10px;
		padding: 0 30px;
		-moz-box-shadow: 0px 0px 20px #f0f0f0;
		-webkit-box-shadow: 0px 0px 20px #f0f0f0;
		box-shadow: 0px 0px 20px #f0f0f0;
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

	.van-cell:not(:last-child)::after {
		border: none;
	}
</style>
