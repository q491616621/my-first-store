<template>
	<div>
		<!-- 顶部标题栏 -->
		<div class="title-bar">
			<top-title :titleName="titleName"></top-title>
		</div>
		<!-- 信息栏列表 -->
		<div class="addCreditCard-bottom flx-c">
			<van-cell-group class="addInfo-box">
				<van-field class="addInput-li" label-width="2.373333rem" type="number" v-model="cardInfo.cardNum" clearable label="卡号"
				 placeholder="请输入卡号" />
				<van-field class="addInput-li" label-width="2.373333rem" type="number" v-model="cardInfo.cvn2" clearable label="cvn2"
				 placeholder="信用卡背面后三位，如853" right-icon='question-o' @click-right-icon='showTips("cvn2")'/>
				<van-field class="addInput-li" label-width="2.373333rem" type="number" v-model="cardInfo.valid" clearable label="有效期"
				 placeholder="有效期（月/年），如0123" right-icon='question-o' @click-right-icon='showTips("valid")'/>
				<van-field class="addInput-li" label-width="2.373333rem" v-model="cardInfo.userName" disabled clearable label="姓名"
				 placeholder="请输入姓名" />
				<van-field class="addInput-li" label-width="2.373333rem" v-model="cardInfo.certificateNum" disabled clearable label="身份证号"
				 placeholder="请输入身份证号码" />
				<van-field class="addInput-li" label-width="2.373333rem" type="number" v-model="cardInfo.mobile" clearable label="手机号码"
				 placeholder="请输入银行预留手机号" />
				<button class="sure-btn bold" @click="goQuickVerify">下一步</button>
			</van-cell-group>
		</div>
		<card-tips :tipsType='tipsType' @resetTipsType='resetTipsType' ></card-tips>
	</div>
</template>
<script>
	import topTitle from '@/components/common/topTitle.vue';
	import cardTips from '@/components/common/cardTips.vue';
	import {
		server
	} from '@/api/server.js';
	import tool from '../../../../public/tool/tool.js'
	export default {
		components: {
			topTitle,
			cardTips
		},
		data() {
			return {
				titleName: '添加快捷信用卡', //标题栏标题
				tipsType:'',//提示盒子
				cardInfo: {
					cardNum: null, //卡号
					cvn2: null, //cvv码
					valid: null, //有效期
					userName: null, //姓名
					certificateNum: null, //身份证号码
					mobile: null, //手机号
					bankAgentId: null, //联行号（暂时写死）
					cardType: '2', //卡类型
					channelCode: '1000000001'
				},
				// chooseBankBox: false,//选择银行的picker弹窗
				verify: null, //验证银行卡绑卡需要的信息
				// countDown: 10000, //倒计时
				countDown: 59000, //倒计时
			};
		},
		created() {},
		methods: {
			// 提示弹窗
			showTips(type){
				if(type == 'cvn2'){
					this.tipsType = 'cvn2';
				}else{
					this.tipsType = 'valid';
				}
			},
			// 重置tipsType
			resetTipsType(){
				this.tipsType = '';
			},
			// 跳转到短信验证
			goQuickVerify() {
				let cardInfo = this.cardInfo;
				let value = true;
				let verifier = {
					'cardNum': '卡号',
					'cvn2': 'cvv码',
					'valid': '卡片有效期',
					'userName': '姓名',
					'certificateNum': '身份证号码',
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
			background: url(../../../assets/img/addCreditCard_XX.png) no-repeat center center;
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
