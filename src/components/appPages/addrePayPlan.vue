<template>
	<div>
		<!-- 顶部标题栏 -->
		<div class="title-bar">
			<top-title :titleName="titleName"></top-title>
		</div>
		<!-- 信用卡列表 -->
		<div class="card-box flx-cas">
			<!-- <div class="bg0 no-card"> -->
			<div :class="cardInfo.bgClassName">
				<div class="card-top flx-cas">
					<div class="logo flx-rs">
						<!-- <img src="../../assets/img/cardManagement/logo.png"> -->
						<img :src='cardInfo.logo'>
						<div class="bold">{{cardInfo.bankName}}</div>
						<div class="num1">****</div>
						<div class="num2">{{cardInfo.bankCardNumb}}</div>
					</div>
					<div class="name">{{cardInfo.userName}}<span>持卡人</span></div>
				</div>
				<div class="card-bottom flx-r">
					<div class="card-bottom-li flx-c" @click="setCardQuotaBox = true">
						<div>
							<div class="flx-rs">
								<span>{{planInfo.cardQuota|Quota}}</span>
								<img class="pen" src="../../assets/img/addrePayPlan_pen.png">
							</div>
						</div>
						<div class="bottom-name">额度</div>
					</div>
					<div class="card-bottom-li flx-c" @click="showChooseDateBox(2)">
						<div class="flx-rs">
							<span>{{planInfo.billingDay|dateTime}}</span>
							<img class="operator" src="../../assets/img/del_operator.png">
						</div>
						<div class="bottom-name">账单日</div>
					</div>
					<div class="card-bottom-li flx-c" @click="showChooseDateBox(1)">
						<div class="flx-rs">
							<span>{{planInfo.repaymentDay|dateTime}}</span>
							<img class="operator" src="../../assets/img/del_operator.png">
						</div>
						<div class="bottom-name">还款日</div>
					</div>
				</div>
			</div>
		</div>
		<div class="repayPlan-box flx-c">
			<div class="repayPlan">
				<van-cell-group>
					<van-field class='repayPlan-li medium' label-width="2.373333rem" v-model="planInfo.repayAmount" label="还款金额" type="number"
					 placeholder="请输入还款金额" clearable autosize />
					<van-field class='repayPlan-li medium' label-width="2.373333rem" v-model="planInfo.balanceAmount" label="卡内余额"
					 type="number" placeholder="输入卡上现有的余额" clearable autosize />
					<!-- 选择还款通道 -->
					<div class="road flx-rs medium">
						<div class="name">选择通道</div>
						<van-radio-group v-model="radio" class='radio-box flx-rs' @change='changeRadio'>
							<van-radio :name="index" v-for="(item,index) in channelList" :key='index' :disabled="item.isCardBindsuc == 2?true:false">
								{{item.channelName}}
								<img slot="icon" slot-scope="props" :src="props.checked ? icon.active : icon.inactive">
							</van-radio>
						</van-radio-group>
					</div>
					<!-- 选择还款方式 -->
					<div class="road flx-rs medium">
						<div class="name">消费方式</div>
						<van-radio-group v-model="radio2" class='radio-box flx-rs' @change='changeRadio2'>
							<van-radio :name="index+1" v-for="(item,index) in planList" :key='item.ChannelID'>
								{{item.name}}
								<img slot="icon" slot-scope="props" :src="props.checked ? icon.active : icon.inactive">
							</van-radio>
						</van-radio-group>
					</div>
					<div class="city-picker flx-rs medium" v-if="isSupportLand == 1">
						<div class="pick-title">落地城市</div>
						<div class="pick-content flx-rs" @click="showPicker">
							<div class="pick-citys flx-rs">
								<div class="pick-provinceName">{{planInfo.provinceName}}</div>
								<div>{{planInfo.cityName}}</div>
							</div>
							<img src="../../assets/img/addCreditCard_choose.png" alt="落地城市">
							<div v-if="!planInfo.provinceName" class="pick-tips">请选择落地城市</div>
						</div>
					</div>
					<!-- 	<div class="protocol flx-rs medium">
						<img src="../../assets/img/protocol_Yse.png" alt="注册协议">
						<div>已阅读并同意</div>
						<div class="protocol-li">《注册协议》</div>
					</div> -->
					<button class="repayPlan-btn bold" @click="PreviewRepayment">预览还款计划</button>
				</van-cell-group>
			</div>
		</div>
		<!-- 输入金额框 -->
		<van-dialog v-model="setCardQuotaBox" title="卡片额度" show-cancel-button closeOnClickOverlay @confirm='setCardQuo'
		 @cancel='setCardQuotaBox=false'>
			<div class="input-box flx-r">
				<van-cell-group class='input' :border="false">
					<van-field type="number" v-model="cardQuota" placeholder="请输入卡的额度" />
				</van-cell-group>
			</div>
		</van-dialog>
		<!-- 还款日和账单日选择器 -->
		<div class="addrePayPlan-choose-picker">
			<van-popup v-model="chooseDateBox" position="bottom">
				<van-picker show-toolbar :columns="date" @cancel="chooseDateBox=false" @confirm="setDate" :item-height="60" />
			</van-popup>
		</div>
		<!-- 省市选择器 -->
		<div class="addrePayPlan-choose-picker">
			<van-popup v-model="chooseCityBox" position="bottom">
				<van-picker show-toolbar :columns="columns" @change="onChange" @cancel="chooseCityBox=false" @confirm="onConfirm"
				 :item-height="60" ref='cityPicker' />
			</van-popup>
		</div>
	</div>
</template>
<script>
	import topTitle from '@/components/common/topTitle.vue';
	import {
		server
	} from '@/api/server.js';
	import tool from '../../../public/tool/tool.js';
	export default {
		components: {
			topTitle
		},
		data() {
			return {
				isFirstEnter: false, //是否是第一次进入这个页面
				titleName: '新增还款计划',
				cardInfo: { //上个页面传过来的卡片信息,
					bankName: '',
					bankCardNumb: '',
					userName: ''
				},
				channelList: [], //通道列表
				planList: [{ //方式列表
					planCode: 1,
					name: '消费1'
				}, {
					planCode: 2,
					name: '消费2'
				}, {
					planCode: 3,
					name: '消费3'
				}],
				radio: 0, //还款通道
				radio2: 1, //还款方式
				planInfo: {
					bindcardUniqueId: null, //绑卡标识id
					repayAmount: null, //还款总额
					balanceAmount: null, //卡内余额
					billingDay: null, //账单日
					repaymentDay: null, //还款日
					channelCode: null, //通道ID
					provinceName: '', //省份名称
					cityName: '', //省份名称
					cardQuota: null, //卡额度
					repayMode: 1, //默认扣1还1
					repayType: '', //还款方式，1：完美还款，2:智能还款，3:0余额还款
				},
				inputCodefocus: false, //自动聚焦
				icon: {
					active: require('../../assets/img/addrePayPlan_roadYes.png'),
					inactive: require('../../assets/img/addrePayPlan_roadNo.png')
				},
				setCardQuotaBox: false, //设置卡片额度弹窗
				chooseDateBox: false, //日期选择框
				chooseCityBox: false, //落地城市选择框
				dateType: null, //设置日期类型 1为还款日 2为账单日
				citys: {},
				cardQuota: null, //卡片额度
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
				date: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
					30, 31
				],
				isSupportLand: '', //是否支持选择落地城市，1支持，非1不支持
				radioChange:false,//判断刚开始是否触发通道改变的方法
			};
		},
		beforeRouteEnter(to, from, next) {
			let arr = Object.keys(to.params)
			// 当时从cardManagement页面进入进来的,而且有传值的话,把isBack设为false 否则设为true
			if (from.name == 'chooseRepaymethod' && arr.length != 0) {
				to.meta.isBack = false;
			} else {
				to.meta.isBack = true;
			}
			next();
		},
		created() {
			this.isFirstEnter = true;
		},
		activated() {
			if (!this.$route.meta.isBack || this.isFirstEnter) {
				this.planInfo = {
					bindcardUniqueId: null, //绑卡标识id
					repayAmount: null, //还款总额
					balanceAmount: null, //卡内余额
					billingDay: null, //账单日
					repaymentDay: null, //还款日
					channelCode: null, //通道ID
					provinceName: '', //省份名称
					cityName: '', //省份名称
					cardQuota: null, //卡额度
					repayMode: 1, //默认扣1还1
					repayType: '', //还款方式
				};
				// this.columns = [{
				// 		// values: Object.keys(citys),
				// 		values: [],
				// 		className: 'column1'
				// 	},
				// 	{
				// 		// values: citys['浙江'],
				// 		values: [],
				// 		className: 'column2',
				// 		defaultIndex: 2
				// 	}
				// ];
				this.radioChange = false;
				this.radio = 0; //还款通道
				this.radio2 = 1;
				this.setCardInfo();
				this.getChannelList(); //执行获取代还通道请求
			}
			this.isFirstEnter = false;
		},
		methods: {
			// 把上个页面传递过来的数据设置给这个页面
			setCardInfo() {
				let cardInfo = this.$route.params;
				this.cardInfo = cardInfo;
				// 把上个页面传过来的 绑卡标识id 额度 还款日 账单日 设置给planInfo里面对应的值
				this.planInfo.bindcardUniqueId = cardInfo.uniqueId //绑卡标识id
				this.planInfo.cardQuota = cardInfo.cardQuota //额度
				this.planInfo.repaymentDay = cardInfo.repaymentDay //还款日
				this.planInfo.billingDay = cardInfo.billingDay //账单日 
				this.planInfo.repayType = cardInfo.repaymothod //还款方式，1：完美还款，2:智能还款，3:0余额还款
				// --------------------------------------------------
				this.cardQuota = null;

			},
			// 获取代还通道列表
			getChannelList() {
				this.$toast({
					type: 'loading',
					message: '通道加载中...',
					duration: 0,
					forbidClick: true
				})
				server.newRepayChannels({
					uniqueId: this.cardInfo.uniqueId
				}).then(res => {
					if (res == null) return;
					// 返回和用户选择的通道类型相同的通道
					let channelList = res.data.filter(cur => {
						return cur.channelType == this.planInfo.repayType;
					});
					// ---------------------------------
					// channelList = [
					// 	{
					// 		"channelName": "通道2",
					// 		"channelType": 2,
					// 		"channelCode": "1000010002",
					// 		"isSupportLand": 1,
					// 		"isCardBindsuc": 2
					// 	},
					// 	{
					// 		"channelName": "通道3",
					// 		"channelType": 1,
					// 		"channelCode": "1000020002",
					// 		"isSupportLand": 1,
					// 		"isCardBindsuc": 2
					// 	},
					// 	{
					// 		"channelName": "通道1",
					// 		"channelType": 1,
					// 		"channelCode": "1000000001",
					// 		"isSupportLand": 1,
					// 		"isCardBindsuc": 2
					// 	},
					// ]
					// 情况1用户绑定的通道都是失败的
					// 判断该用户的通道是否都是绑定失败的,如果都是失败的话,就不继续下面的操作了，直接提示用户去选择其他还款方式了
					let value = false;
					let a = 2;
					value = channelList.every(item=>item.isCardBindsuc == a)
					if(value){
						this.$toast({
							message:'您在该还款方式中，并未成功绑定过通道无法使用该方式还款，请选择其他还款方式',
							forbidClick:true,
							duration:5000,
							onClose:()=>{
								this.$router.go(-1)
							}
						})
						return;
					}
					// 情况2用户绑定的通道有成功的或者全部是成功的
					let defaultChannelCode = this.cardInfo.defaultChannelCode; //获取到我们默认的通道
					let radio = 0;
					for (let i = 0; i < channelList.length; i++) {
						if(channelList[i].channelCode == defaultChannelCode && channelList[i].isCardBindsuc !=2){
							radio = i;
							break;
						}else{
							if(channelList[i].isCardBindsuc != 2){
								radio = i;
								break;
							}
						}
					}
					// channelList.forEach((cur, index) => {
					// 	// 判断通道列表的通道是否有我们的默认通道,并且这个默认通道用户没有绑定失败
					// 	if (cur.channelCode == defaultChannelCode && cur.isCardBindsuc != 2) {
					// 		// 是的话就把我们默认选中设为我们默认选中的通道
					// 		radio = index;
					// 	} else {
					// 		if(cur.isCardBindsuc != 2){
					// 			radio = index;
					// 		}
					// 	}
					// })
					this.radio = radio;
					this.channelList = channelList;
					this.planInfo.channelCode = channelList[radio].channelCode;
					//设置默认是否显示落地城市选择
					this.isSupportLand = channelList[radio].isSupportLand;
					if (channelList[radio].isSupportLand == 1) {
						this.$toast({
							type: 'loading',
							message: '地区获取中...',
							duration: 0,
							forbidClick: true
						})
						server.queryProvinces({
								channelCode: channelList[radio].channelCode
							})
							.then(res => {
								if (res == null) return;
								this.citys = res.data;
								let province = Object.keys(res.data)[0] //拿到第一个省
								this.columns[0].values = Object.keys(res.data) //设置省选择框内数据
								this.columns[1].values = res.data[province] //设置市选择框内数据
								this.radioChange = true;
								if (this.$refs.cityPicker) {
									this.$refs.cityPicker.setColumnValues(0, Object.keys(res.data));
									this.$refs.cityPicker.setColumnValues(1, res.data[province]);
									this.$refs.cityPicker.setColumnIndex(0, 0);
									this.$refs.cityPicker.setColumnIndex(1, 2);
								}
							})
					}
				})
			},
			// 确定设置额度
			setCardQuo() {
				this.planInfo.cardQuota = this.cardQuota; //设置额度
				this.setCardQuotaBox = false; //关闭设置额度弹框
			},
			// 调起日期选择框
			showChooseDateBox(type) {
				this.chooseDateBox = true; //弹起选择日期框
				this.dateType = type; //选择设置日期的类型 2账单日 1还款日
			},
			// 确认日期选择
			setDate(value) {
				if (this.dateType == 1) {
					this.planInfo.repaymentDay = value
				} else {
					this.planInfo.billingDay = value
				}
				this.chooseDateBox = false;
			},
			// 选择通道
			changeRadio(e) {
				if(!this.radioChange)return;
				let name = e;
				// 选择通道时,设置通道id
				this.planInfo.channelCode = this.channelList[name].channelCode;
				//选择通道时，设置是否支持选择落地城市
				this.isSupportLand = this.channelList[name].isSupportLand;
				if (this.channelList[name].isSupportLand == 1) {
					tool.toastLoading()
					server.queryProvinces({
							channelCode: this.channelList[name].channelCode
						})
						.then(res => {
							if (res == null) return;
							this.citys = res.data;
							let province = Object.keys(res.data)[0] //拿到第一个省
							this.columns[0].values = Object.keys(res.data) //设置省选择框内数据
							this.columns[1].values = res.data[province] //设置市选择框内数据
							this.planInfo.provinceName = '';
							this.planInfo.cityName = '';
							if (this.$refs.cityPicker) {
								this.$refs.cityPicker.setColumnValues(0, Object.keys(res.data));
								this.$refs.cityPicker.setColumnValues(1, res.data[province]);
								this.$refs.cityPicker.setColumnIndex(0, 0);
								this.$refs.cityPicker.setColumnIndex(1, 2);
							}
						})
				}

			},
			// 选择方式
			changeRadio2(e) {
				let name = e;
				this.planInfo.repayMode = name;
			},
			// 调起省市选择框
			showPicker() {
				this.chooseCityBox = true;
			},
			// 改变选项
			onChange(picker, value) {
				let province = value[0]
				let citys = this.citys
				picker.setColumnValues(1, citys[province])
			},
			// 点击确定
			onConfirm(value) {
				this.planInfo.provinceName = value[0]
				this.planInfo.cityName = value[1]
				this.chooseCityBox = false;
			},
			// 预览还款计划
			PreviewRepayment() {
				let planInfo = this.planInfo;
				// 判断是否有少填写东西
				if (!planInfo.repayAmount) {
					this.$toast('请填写还款金额');
					return
				} else if (!planInfo.balanceAmount) {
					this.$toast('请填写卡内余额');
					return
				} else if (!planInfo.billingDay) {
					this.$toast('请选择账单日');
					return
				} else if (!planInfo.repaymentDay) {
					this.$toast('请选择还款日');
					return
				} else if (!planInfo.cardQuota) {
					this.$toast('请设置卡片额度');
					return
				} else if (this.isSupportLand == 1 && planInfo.provinceName == '' && planInfo.cityName == '') {
					// 判断当前通道是否有落地城市,如果有的话必须填落地省市
					this.$toast('请选择落地城市');
					return
				}
				let days = tool.days(); //获取当前月份的最大天数
				// 判断当前用户设置的账单日或者是还款日是否大于当前月份的最大天数,是的话改成当前月份最大的天数
				if (planInfo.billingDay > days) planInfo.billingDay = days;
				if (planInfo.repaymentDay > days) planInfo.repaymentDay = days;
				if (planInfo.billingDay == planInfo.repaymentDay) return this.$toast('账单日和还款日不能是同一天哦!')
				// 判断用户设置的账单日和还款日是否大于当前月分的天数,是的话提示用户进行修改
				// if (planInfo.billingDay > days || planInfo.repaymentDay > days) {
				// 	this.$toast('账单日或还款日不能大于当月最大天数，请修改后重试')
				// 	return
				// }
				// 弹窗加载中
				tool.toastLoading();
				server.preCreatePlan(planInfo).then(res => {
					if (res == null) return;
					let channelType = this.channelList[this.radio].channelType;
					this.$toast.clear()
					this.$router.push({
						name: 'payPlanInfo',
						params: {
							channelType,
							cardInfo: planInfo,
							planInfo: res.data,
							// userInfo:this.cardInfo
						}
					})
				})
			},
		},
		filters: {
			// 过滤账单日,还款日
			dateTime: (value) => {
				let time = value;
				if (time == null) {
					time = ''
				} else if (time < 10) {
					time = '0' + value;
				}
				return time;
			},
			// 过滤额度
			Quota: (value) => {
				if (value == null || value == '') {
					value = ''
				} else {
					value = tool.centTurnSmacker(value);
				}
				return value;
			}
		}
	};
</script>
<style lang="less">
	.radio-box {
		width: 100%;
		// justify-content: space-around;

		.van-radio {
			overflow: visible;
			margin-right: 20px;
		}

		.van-radio__label {
			margin-left: 5px;
		}
	}

	.addrePayPlan-choose-picker {
		.van-picker__toolbar {
			height: 70px;
			line-height: 70px;
		}

		.van-popup {
			position: absolute;
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
</style>
<style scoped="scoped" lang="less">
	// 信用卡
	.card-box {
		margin-top: 88px;
		box-sizing: border-box;
		padding-top: 20px;

		// --------------------------------------------------------------
		.bg1 {
			margin-top: 20px;
			width: 690px;
			height: 350px;
			// background: url(http://px45uxsff.bkt.clouddn.com/bg1.jpg) no-repeat center center;
			background: url(../../assets/img/cardManagement/bg1.jpg) no-repeat center center;
			background-size: 100% 100%;
			border-radius: 10px;
			display: flex;
			flex-direction: column;
		}

		.bg2 {
			margin-top: 20px;
			width: 690px;
			height: 350px;
			// background: url(http://px45uxsff.bkt.clouddn.com/bg2.jpg) no-repeat center center;
			background: url(../../assets/img/cardManagement/bg2.jpg) no-repeat center center;
			background-size: 100% 100%;
			border-radius: 10px;
			display: flex;
			flex-direction: column;
		}

		.bg3 {
			margin-top: 20px;
			width: 690px;
			height: 350px;
			// background: url(http://px45uxsff.bkt.clouddn.com/bg3.jpg) no-repeat center center;
			background: url(../../assets/img/cardManagement/bg3.jpg) no-repeat center center;
			background-size: 100% 100%;
			border-radius: 10px;
			display: flex;
			flex-direction: column;
		}

		.bg4 {
			margin-top: 20px;
			width: 690px;
			height: 350px;
			// background: url(http://px45uxsff.bkt.clouddn.com/bg4.jpg) no-repeat center center;
			background: url(../../assets/img/cardManagement/bg4.jpg) no-repeat center center;
			background-size: 100% 100%;
			border-radius: 10px;
			display: flex;
			flex-direction: column;
		}

		.bg0 {
			margin-top: 20px;
			width: 690px;
			height: 350px;
			// background: url(http://px45uxsff.bkt.clouddn.com/bg5.jpg) no-repeat center center;
			background: url(../../assets/img/cardManagement/bg5.jpg) no-repeat center center;
			background-size: 100% 100%;
			border-radius: 10px;
			display: flex;
			flex-direction: column;
		}

		.card-top {
			width: 100%;
			height: 220px;
			box-sizing: border-box;
			padding: 50px 30px 20px;
			color: #fff;
			align-items: flex-start;

			.logo {
				font-size: 24px;

				img {
					width: 42px;
					height: 37px;
					padding-right: 10px;
				}

				.num1,
				.num2 {
					font-size: 28px;
					color: #fff;
					padding-left: 15px;
				}
			}

			.name {
				font-size: 40px;
				padding-top: 30px;
				padding-left: 50px;
				font-weight: bold;

				span {
					font-size: 26px;
					padding-left: 20px;
					font-weight: normal;
					color: rgba(255, 255, 255, 0.6);
				}
			}
		}

		.card-bottom {
			justify-content: space-between;
			padding: 30px;
			height: 230px;
			font-size: 40px;
			font-weight: bold;
			color: #fff;

			.card-bottom-li {
				width: 33.3333%;
				height: 86px;
				justify-content: space-between;
			}

			.cardQuota {
				// padding-left: 40px;
			}

			.bottom-name {
				font-size: 26px;
				color: rgba(255, 255, 255, 0.6)
			}

			.pen {
				padding-left: 10px;
				width: 28px;
				height: 28px;
				flex-shrink: 0;
			}

			.operator {
				width: 28px;
				height: 28px;
				flex-shrink: 0;
			}
		}

		// -----------------------------------------------------------
		// 		.card-li {
		// 			width: 690px;
		// 			height: 300px;
		// 			margin-bottom: 20px;
		// 			background: linear-gradient(90deg, rgba(253, 68, 68, 1), rgba(255, 144, 125, 1));
		// 			box-shadow: 0px 10px 14px 0px rgba(255, 174, 174, 1);
		// 			border-radius: 14px;
		// 			box-sizing: border-box;
		// 			padding: 30px 30px;
		// 			color: #fff;
		// 			justify-content: flex-start;
		// 
		// 			.top {
		// 				width: 100%;
		// 				height: 50px;
		// 				flex-wrap: nowrap;
		// 
		// 				img {
		// 					width: 48px;
		// 					height: 46px;
		// 					flex-shrink: 0;
		// 				}
		// 
		// 				.bank {
		// 					padding-left: 8px;
		// 					font-size: 30px;
		// 					text-align: left;
		// 					max-width: 300px;
		// 					overflow: hidden;
		// 					text-overflow: ellipsis;
		// 					white-space: nowrap;
		// 				}
		// 
		// 				.number {
		// 					font-size: 34px;
		// 					padding-left: 40px;
		// 				}
		// 
		// 				.repay {
		// 					width: 150px;
		// 					height: 50px;
		// 					line-height: 50px;
		// 					background: #fff;
		// 					margin-left: auto;
		// 					border-radius: 25px;
		// 					color: #fd4444;
		// 					font-size: 24px;
		// 				}
		// 			}
		// 
		// 			.middle {
		// 				padding-top: 20px;
		// 				width: 284px;
		// 				height: 88px;
		// 
		// 				.name {
		// 					font-size: 40px;
		// 				}
		// 
		// 				.people {
		// 					font-size: 26px;
		// 					margin-left: 14px;
		// 					color: rgba(255, 255, 255, 0.6);
		// 					opacity: 0.6;
		// 				}
		// 			}
		// 
		// 			.bottom {
		// 				width: 100%;
		// 				padding-top: 28px;
		// 				justify-content: space-between;
		// 
		// 				.bottom-t {
		// 					font-size: 40px;
		// 					justify-content: flex-end;
		// 
		// 					.pen {
		// 						padding-left: 10px;
		// 						width: 28px;
		// 						height: 28px;
		// 						flex-shrink: 0;
		// 					}
		// 
		// 					.operator {
		// 						width: 28px;
		// 						height: 28px;
		// 						flex-shrink: 0;
		// 					}
		// 				}
		// 
		// 				.bottom-b {
		// 					font-size: 26px;
		// 					color: rgba(255, 255, 255, 0.6);
		// 					opacity: 0.6;
		// 				}
		// 			}
		// 		}
	}

	// 填写信息表
	.repayPlan-box {
		width: 100%;
		padding: 20px;
		box-sizing: border-box;

		.repayPlan {
			width: 690px;
			height: 740px;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 3px 12px 0px rgba(212, 212, 212, 0.5);
			border-radius: 14px;
			box-sizing: border-box;
			padding: 0 30px;

			.repayPlan-li {
				width: 100%;
				// height: 100px;
				font-size: 30px;
				font-weight: 500;
				padding: 25px 0;
				text-align: left;
				color: #212121;
				// line-height: 100px;
				box-sizing: border-box;
				border-bottom: 1px solid #ededed;
			}

			.road {
				width: 100%;
				height: 100px;
				color: #212121;
				font-size: 30px;
				line-height: 100px;
				box-sizing: border-box;
				border-bottom: 1px solid #ededed;

				.name {
					width: 250px;
					text-align: left;
				}

				.radio-box {
					// justify-content: space-around;
				}

				img {
					width: 27px;
					height: 27px;
				}
			}

			.city-picker {
				height: 100px;
				font-size: 30px;
				color: #212121;

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
					position: relative;

					.pick-citys {
						color: #212121;

						.pick-provinceName {
							padding-right: 10px;
						}
					}

					.pick-tips {
						position: absolute;
						top: 50%;
						margin-top: -20px;
						left: 0;
						color: #d5d5d5;
					}
				}
			}

			.protocol {
				font-size: 24px;

				img {
					width: 22px;
					height: 22px;
					flex-shrink: 0;
					padding-right: 15px;
				}

				.protocol-li {
					color: #1A82FF;
				}
			}

			.repayPlan-btn {
				margin-top: 88px;
				width: 630px;
				height: 90px;
				background: linear-gradient(90deg, rgba(110, 191, 255, 1), rgba(26, 130, 255, 1));
				box-shadow: -1px 10px 24px 0px rgba(53, 133, 254, 0.5);
				border-radius: 45px;
				color: #fff;
				font-size: 32px;
			}
		}
	}

	.input-box {
		height: 100px;

		.input {
			width: 400px;
			height: 80px;
			line-height: 80px;
		}
	}
</style>
