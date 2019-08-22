<template>
	<div>
		<!-- 顶部标题栏 -->
		<div class="title-bar">
			<top-title :titleName="titleName"></top-title>
		</div>
		<!-- 信息栏列表 -->
		<div class="addCreditCard-bottom flx-c">
			<van-cell-group class="addInfo-box">
				<!-- <van-field class="addInput-li" label-width="2.373333rem" v-model="cardInfo.userName" disabled clearable label="姓名"
				 placeholder="请输入姓名" />
				<van-field class="addInput-li" label-width="2.373333rem" v-model="cardInfo.certificateNum" disabled clearable label="身份证"
				 placeholder="请输入身份证号码" /> -->
				<van-field class="addInput-li" label-width="2.373333rem" type="number" v-model="cardInfo.bankCardNumb" clearable
				 label="储蓄卡" placeholder="请输入储蓄卡卡号" />
				<!-- 	<van-field class="addInput-li" label-width="2.373333rem" v-model="cardInfo.userName" clearable label="开户行"
				 placeholder="请输入开户行" /> -->

				<!-- 	<div class="addPicker-li flx-rs">
					<div>开户行</div>
					<div class="right" @click="showBankPicker">
						<div v-if="cardInfo.bankName ==''" class="default">请选择开户行</div>
						<div v-if="cardInfo.bankName !=''">{{ cardInfo.bankName }}</div>
						<img src="../../../assets/img/addCreditCard_choose.png" />
					</div>
				</div> -->
				<div class="city-picker flx-rs medium">
					<div class="pick-title">开户行省市</div>
					<!-- <div class="pick-content flx-rs" @click="showCityPicker"> -->
					<div class="pick-content flx-rs" @click="chooseCityBox = true">
						<div style="color:#d5d5d5;" v-if="cardInfo.province == ''">请选择开户行省市</div>
						<div class="pick-citys flx-rs" v-if="cardInfo.province != ''">
							<div class="pick-provinceName">{{cardInfo.province}}</div>
							<div>{{cardInfo.city}}</div>
						</div>
						<img src="../../../assets/img/addCreditCard_choose.png" />
					</div>
				</div>
				<van-field class="addInput-li" label-width="2.373333rem" v-model="cardInfo.bankNameBranch" clearable label="开户支行"
				 placeholder="请输入开户支行(非必填)" />
				<van-field class="addInput-li" label-width="2.373333rem" type="number" v-model="cardInfo.bankCardMobile" clearable
				 label="手机号码" placeholder="请输入银行预留手机号" />
				<button class="sure-btn bold" @click="bindAtmCard">确认绑定</button>
			</van-cell-group>
		</div>
		<!-- 选择开户行 -->
		<!-- <div class="addCreditCard-choose-picker">
			<van-popup v-model="chooseBankBox" position="bottom">
				<van-picker show-toolbar title="请选择信用卡开户行" :columns="bankColumns" @cancel="chooseBankBox=false" @confirm="sureBank"
				 :item-height='50' />
			</van-popup>
		</div> -->
		<!-- 省市选择器 -->
		<div class="addrePayPlan-choose-picker">
			<van-popup v-model="chooseCityBox" position="bottom">
				<van-picker show-toolbar :columns="columns" @change="onChange" @cancel="chooseCityBox=false" @confirm='onConfirm'
				 :item-height="60" />
			</van-popup>
		</div>
	</div>
</template>
<script>
	import topTitle from '@/components/common/topTitle.vue';
	import citys from '../../../../public/tool/city.json'
	import {
		server
	} from '@/api/server.js';
	import {
		Toast
	} from 'vant';
	export default {
		components: {
			topTitle
		},
		data() {
			return {
				titleName: '绑定提现银行卡', //标题栏标题
				cardInfo: {
					// userName: '王金盛', //姓名
					// certificateNum: '4451456464646846844', //身份证
					id: '',
					bankCardNumb: '', //储蓄卡号码
					bankCardMobile: '', //预留银行的手机号
					bankName: '', //开户行
					province: '', //省份名称
					city: '', //城市名称
					bankNameBranch: '', //支行
				},
				chooseBankBox: false, //控制银行的picker盒子显示与否
				// bankColumns: ['建设银行', '中国银行', '工商银行', '农业银行', '人民银行'], //银行列表
				chooseCityBox: false, //控制省市的picker盒子显示与否
				citys: '',
				columns: [{
						// values: Object.keys(citys),
						values: [],
						className: 'column1'
					},
					{
						// values: citys['浙江'],
						values: [],
						className: 'column2',
						defaultIndex: 2
					}
				],
			};
		},
		beforeCreate() {
			document.querySelector('body').setAttribute('style', 'background-color:#fff')
		},
		created() {
			let arr = Object.keys(this.$route.params)
			console.log(arr)
			if (arr.length > 0) {
				this.cardInfo.id = this.$route.params.id
			}
			this.setColums()
		},
		methods: {
			// 设置省市列表
			setColums() {
				// 把本地的省市json设置给页面
				this.citys = citys.provinces;
				let arr = [];
				let arr2 = [];
				citys.provinces.forEach(cur => {
					arr.push(cur.name)
				})
				citys.provinces[0].cities.forEach(cur => {
					arr2.push(cur.name)
				})
				// 把省市设置给选择器
				this.columns[0].values = arr;
				this.columns[1].values = arr2;
			},
			// 打开银行选择器
			// showBankPicker() {
			// 	this.chooseBankBox = true;
			// },
			// 选择的银行
			// sureBank(value) {
			// 	this.cardInfo.bankName = cardInfo.bankCardNumb;
			// 	this.chooseBankBox = false;
			// },
			// 打开省市选择器
			showCityPicker() {
				// let init = {};
				// init.channelCode = 1000000001;
				// let arr = Object.keys(this.citys);
				// if(arr.length == 0){
				// 	server.queryProvinces(init)
				// 	.then(res=>{
				// 		if(res == null) return;
				// 		console.log(res)
				// 		this.citys = res.data;
				// 		let province = Object.keys(res.data)[0] //拿到第一个省
				// 		this.columns[0].values = Object.keys(res.data) //设置省选择框内数据
				// 		console.log(this.columns[0].values)
				// 		this.columns[1].values = res.data[province] //设置市选择框内数据
				// 		this.chooseCityBox = true;//显示省市选择框
				// 	})
				// }else{
				// 	let citys = this.citys;
				// 	let province = Object.keys(citys)[0] //拿到第一个省
				// 	this.columns[0].values = Object.keys(citys)
				// 	this.columns[1].values = citys[province]
				// this.chooseCityBox = true; //显示省市选择框
				// }
			},
			// 改变省市选择
			onChange(picker, value) {
				let province = value[0]
				let citys = this.citys
				let arr = [];
				citys.forEach(cur => {
					if (cur.name == province) {
						cur.cities.forEach(item => {
							arr.push(item.name)
						})
					}
				})
				this.columns[1].values = arr;
				picker.setColumnValues(1, arr)
			},
			// 确定省市选择
			onConfirm(value) {
				this.cardInfo.province = value[0]
				this.cardInfo.city = value[1]
				this.chooseCityBox = false;
			},
			// 提交资料绑定银行卡
			bindAtmCard() {
				let cardInfo = this.cardInfo;
				let value = true;
				let verifier = {
					'bankCardNumb': '请填写储蓄卡号码', //储蓄卡号码
					'province': '请选择开户行省市', //省份名称
					// 'bankName': '请选择开户行', //开户行
					// 'branchBank': '请填写支行', //支行
					'bankCardMobile': '请填写预留银行手机号', //预留银行的手机号
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
				console.log(value)
				// 如果value 为true 的话,进行下一步绑定卡片，否则提示用户哪些信息未填写
				if (value === true) {
					console.log(cardInfo)
					// 先发请求查询银行卡信息的请求确认用户的卡片是否支持
					server.queryBankcardInfo({
							bankcardNumb: cardInfo.bankCardNumb
						})
						.then(res => {
							if (res == null) return;
							// 接口返回数据为{},用户卡片不支持,就不继续发绑卡请求了
							if (JSON.stringify(res.data) == '{}') {
								this.$toast('该卡不支持，请换别的卡绑定')
								return;
							}
							cardInfo.bankName = res.data.bankName;
							console.log(cardInfo)
							server.bindSettleCard(cardInfo)
								.then(res => {
									if (res == null) return;
									this.$toast({
										message: '绑定成功',
										duration: 2000,
										forbidClick: true,
										onClose: () => {
											this.$router.push({
												name: 'withdrawal'
											})
										}
									})
								})
						})
				} else {
					this.$toast({
						message: value
					})
				}
			}
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

		.van-picker__columns {
			height: 300px;

			.van-picker-column {
				font-size: 30px;
			}
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

					.default {
						height: 100px;
						width: 100%;
						color: #d5d5d5;
					}

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
		height: 571px;
		background: #fff;
		border-radius: 22px;
		box-sizing: border-box;
		padding-top: 247px;

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
			width: 440px;
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

	// 落地城市
	.city-picker {
		height: 100px;
		font-size: 30px;
		color: #888;
		border-bottom: 1px solid #ededed;

		img {
			width: 11px;
			height: 20px;
		}

		.pick-title {
			width: 250px;
			text-align: left;
		}

		.pick-content {
			width: 100%;
			justify-content: space-between;

			.pick-citys {
				color: #212121;

				.pick-provinceName {
					padding-right: 10px;
				}
			}
		}
	}
</style>
