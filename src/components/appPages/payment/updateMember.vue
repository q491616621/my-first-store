<template>
	<div>
		<!-- 顶部标题栏 -->
		<div class="title-bar">
			<top-title :titleName="titleName" :pageType='pageType'></top-title>
		</div>
		<div class="wueui-content content">
			<div class="div_vip_list">
				<div class="div_vip_li" v-if="payMembInfo.memberRoute == 2||payMembInfo.memberLevel == 1">
					<div class="div_vip_li_img">
						<img src="../../../assets/img/images/icon003.png" />
					</div>
					<div class="div_vip_li_title">金卡会员</div>
					<div class="div_evaluate">
						<span>购买率：95%</span>
						<span>
							<label>推荐指数：</label>
							<img src="../../../assets/img/images/icon005.png" />
							<img src="../../../assets/img/images/icon005.png" />
							<img src="../../../assets/img/images/icon005.png" />
							<img src="../../../assets/img/images/icon005.png" />
							<img src="../../../assets/img/images/icon005.png" />
						</span>
					</div>

					<div class="div_function">
						<!-- <span>授信还款额度</span>
						<span>授权实习会员资格</span> -->
						<span>智能还款分润万20</span>
					</div>
					<div class="div_vip_li_content">
						<a href="javascript:;" :class="contentOne?'btn_title active':'btn_title'" @click="contentOne=!contentOne">
							金卡会员 自用省钱*推广赚钱
						</a>
						<div class="div_vip_li_info">
							<p style="text-align: left;">
								1. 自用省钱，还款1万最高省31元。
							</p>
							<p style="text-align: left;">
								2. 成人达己，招募团队合伙人。
							</p>
							<p style="text-align: left;">
								3. 卡测评、查征信持续上线，敬请期待。
							</p>
							<p style="text-align: left;">
								4. 尊享分红，同级别共享奖励。
							</p>
							<div class="div_vip_li_title02">
								分享赚钱
							</div>
							<div class="div_table">
								<!--表格可直接放图片-->
								<table cellspacing="0" cellpadding="0">
									<tr>
										<th>
											会员等级
										</th>
										<th>
											尊享分红
										</th>
										<th>
											还款收益
										</th>
										<th>
											推荐收益
										</th>
										<th>
											推荐付费人数
										</th>
									</tr>
									<tr>
										<td>
											黑卡会员
										</td>
										<td>
											<!-- 增加万2 -->
											会员10%加还款万1分红
										</td>
										<td>
											万31
										</td>
										<!-- 	<td rowspan="5">
											还款一万收益有20元，一年就有240元
										</td> -->
										<td>
											60%
										</td>
										<td>
											累计推荐40个会员
										</td>
									</tr>
									<tr>
										<td>
											钻石会员
										</td>
										<td>
											<!-- 增加万2 -->
											会员8%分红
										</td>
										<td>
											万29
										</td>
										<td>
											55%
										</td>
										<td>
											累计推荐25个会员
										</td>
									</tr>
									<tr>
										<td>
											铂金会员
										</td>
										<td>
											<!-- 增加万4 -->
											会员5%分红
										</td>
										<td>
											万27
										</td>
										<td>
											50%
										</td>
										<td>
											累计推荐13个会员
										</td>
									</tr>
									<tr>
										<td>
											白金会员
										</td>
										<td>
											增加万3
										</td>
										<td>
											万23
										</td>
										<td>
											45%
										</td>
										<td>
											累计推荐3个会员
										</td>
									</tr>
									<tr>
										<td>
											金卡会员
										</td>
										<td>
											万20
										</td>
										<td>
											万20
										</td>
										<td>
											40%
										</td>
										<td>
											付费升级
										</td>
									</tr>
									<tr>
										<td>
											普通会员
										</td>
										<td>
											75+1
										</td>
										<td>
											万10
										</td>
										<td>
											0
										</td>
										<td>
											免费
										</td>
									</tr>
								</table>
							</div>
						</div>
					</div>
					<div class="div_pay">
						¥298.00/年
						<span>¥598.00</span>
						<button class="btn_pay" @click="payMember('levelOne')" v-if="payMembInfo.memberLevel == 1">立即购买</button>
						<button class="btn_pay" @click="alreadyPurchased" v-if="payMembInfo.memberLevel >1">您已是会员</button>
					</div>
				</div>
				<div class="div_vip_li" v-if="payMembInfo.memberRoute == 1||payMembInfo.memberLevel == 1">
					<div class="div_vip_li_img">
						<img src="../../../assets/img/images/icon006.png" />
					</div>
					<div class="div_vip_li_title">银卡会员</div>
					<div class="div_evaluate">
						<span>购买率：5%</span>
						<span>
							<label>推荐指数：</label>
							<img src="../../../assets/img/images/icon005.png" />
							<img src="../../../assets/img/images/icon005.png" />
							<img src="../../../assets/img/images/icon005.png" />
						</span>
					</div>
					<div class="div_function">
						<!-- 	<span>授信还款额度</span>
						<span>授权实习会员资格</span> -->
						<span>智能还款分润万16</span>
					</div>
					<div class="div_vip_li_content">
						<a href="javascript:;" :class="contentTwo?'btn_title active':'btn_title'" @click="contentTwo=!contentTwo">
							银卡会员 自用省钱*推广赚钱
						</a>
						<div class="div_vip_li_info">
							<p style="text-align: left;">
								1. 自用省钱，还款1万最高省27元。
							</p>
							<p style="text-align: left;">
								2. 成人达己，招募团队合伙人。
							</p>
							<p style="text-align: left;">
								3. 卡测评、查征信持续上线，敬请期待。
							</p>
							<div class="div_vip_li_title02">
								分享赚钱
							</div>
							<div class="div_table">
								<table cellspacing="0" cellpadding="0">
									<tr>
										<th>
											会员等级
										</th>
										<th>
											分润增加
										</th>
										<th>
											还款收益
										</th>
										<th>
											推荐收益
										</th>
										<th>
											推荐付费人数
										</th>
									</tr>
									<tr>
										<td>
											黑卡会员
										</td>
										<td>
											增加万2
										</td>
										<td>
											万27
										</td>
										<!-- 	<td rowspan="5">
											还款一万收益有16元，一年就有192元
										</td> -->
										<td>
											60%
										</td>
										<td>
											累计推荐40个会员
										</td>
									</tr>
									<tr>
										<td>
											钻石会员
										</td>
										<td>
											增加万2
										</td>
										<td>
											万25
										</td>
										<td>
											55%
										</td>
										<td>
											累计推荐25个会员
										</td>
									</tr>
									<tr>
										<td>
											铂金会员
										</td>
										<td>
											增加万4
										</td>
										<td>
											万23
										</td>
										<td>
											50%
										</td>
										<td>
											累计推荐13个会员
										</td>
									</tr>
									<tr>
										<td>
											白金会员
										</td>
										<td>
											增加万3
										</td>
										<td>
											万19
										</td>
										<td>
											45%
										</td>
										<td>
											累计推荐3个会员
										</td>
									</tr>
									<tr>
										<td>
											银卡会员
										</td>
										<td>
											万16
										</td>
										<td>
											万16
										</td>
										<td>
											30%
										</td>
										<td>
											付费升级
										</td>
									</tr>
									<tr>
										<td>
											普通会员
										</td>
										<td>
											75+1
										</td>
										<td>
											万10
										</td>
										<td>
											0
										</td>
										<td>
											免费
										</td>
									</tr>
								</table>
							</div>
						</div>
					</div>
					<div class="div_pay">
						¥98.00/年
						<span>¥298.00</span>
						<button class="btn_pay" @click="payMember('levelTwo')" v-if="payMembInfo.memberLevel == 1">立即购买</button>
						<button class="btn_pay" @click="alreadyPurchased" v-if="payMembInfo.memberLevel >1">您已是会员</button>
					</div>
				</div>
			</div>
		</div>
		<div class="updateMember-pay">
			<van-dialog v-model="show" title="请选择付款方式" show-cancel-button @cancel='radio = "1"' @confirm='surePay'>
				<van-radio-group v-model="radio">
					<van-cell-group>
						<van-cell title="微信支付" clickable @click="radio = '1'">
							<van-radio slot="right-icon" name="1" />
						</van-cell>
						<van-cell title="支付宝" clickable @click="radio = '0'">
							<van-radio slot="right-icon" name="0" />
						</van-cell>
					</van-cell-group>
				</van-radio-group>
			</van-dialog>
		</div>
	</div>
</template>
<script>
	import topTitle from '@/components/common/topTitle.vue';
	import tool from '../../../../public/tool/tool.js'
	export default {
		components: {
			topTitle,
		},
		data() {
			return {
				titleName: '购买会员', //标题栏标题
				pageType: 'app', //上个页面是什么h5还是app?
				contentOne: false, //第一个下拉窗状态
				contentTwo: false, //第二个下拉窗状态
				show: false, //支付弹窗状态
				radio: '1',
				price: '', //选择会员的价格
				goodsname: '', //会员类型 0初级会员 1中级会员
				payMembInfo: '', //储存的app传过来的
				// payMembInfo: {
				// 	'highMemberName': '中级会员',
				// 	'highPayAmount': '2',
				// 	'midMemberName': '初级会员',
				// 	'midPayAmount': '1',
				// 	'memberLevel': '1',
				// 	'memberRoute': null
				// }
			};
		},
		beforeCreate() {
			let me = this;
			window['getUserLevel'] = (url) => {
				me.getUserLevel(url)
			}
			window['weChatPayFinish'] = (url) => {
				me.weChatPayFinish(url)
			}
			window['AlipayPayFinish'] = (url) => {
				me.AlipayPayFinish(url)
			}
		},
		// created() {
		// 	let me = this;
		// 	window['getUserLevel'] = (url) => {
		// 		me.getUserLevel(url)
		// 	}
		// 	window['weChatPayFinish'] = (url) => {
		// 		me.weChatPayFinish(url)
		// 	}
		// 	window['AlipayPayFinish'] = (url) => {
		// 		me.AlipayPayFinish(url)
		// 	}
		// 	
		// 	// console.log(this.$route.query)
		// 	
		// 	// 下面是自己测试代码
		// 	// let a = {'highMemberName':'中级会员','highPayAmount':'2','midMemberName':'初级会员','midPayAmount':'1','memberLevel':'0'}
		// 	// this.getUserLevel(a)
		// 	// this.payMembInfo = {'highMemberName':'中级会员','highPayAmount':'2','midMemberName':'初级会员','midPayAmount':'1','memberLevel':'1'};
		// },
		methods: {
			// 用户已经是会员了
			alreadyPurchased() {
				this.$toast({
					message: '您已经是会员了，请勿重复购买',
					duration: 2000,
				})
			},
			// 获取app页面传递过来的数据的方法
			getUserLevel(e) {
				// e = JSON.stringify(e)
				let payMembInfo = JSON.parse(e);
				// ----------------------------
				// this.$toast({
				// 	message: `highMemberName:${payMembInfo.highMemberName},highPayAmount:${payMembInfo.highPayAmount},midMemberName:${payMembInfo.midMemberName},midPayAmount:${payMembInfo.midPayAmount},userLevel:${payMembInfo.memberLevel},memberRoute:${payMembInfo.memberRoute}`,
				// 	duration: 1000
				// })
				// -------------------------------
				this.payMembInfo = payMembInfo;
			},
			// 拉起支付选择框
			payMember(level) {
				// -----------------------
				// let payMembInfo = this.payMembInfo;
				// this.$toast({
				// 	message:`highMemberName:${payMembInfo.highMemberName},highPayAmount:${payMembInfo.highPayAmount},midMemberName:${payMembInfo.midMemberName},midPayAmount:${payMembInfo.midPayAmount},userLevel:${payMembInfo.memberLevel},memberRoute:${payMembInfo.memberRoute}`,
				// 	duration:1000
				// })
				// ------------------------
				if (this.payMembInfo.memberLevel > 1) {
					this.$toast({
						message: '您已经是会员了，请勿重复购买'
					})
					return;
				}
				if (level == 'levelOne') {
					let highPayAmount = this.payMembInfo.highPayAmount;
					this.price = parseInt(highPayAmount) / 100;
					this.goodsname = this.payMembInfo.highMemberName;
				} else {
					let midPayAmount = this.payMembInfo.midPayAmount;
					this.price = parseInt(midPayAmount) / 100;
					this.goodsname = this.payMembInfo.midMemberName;
				}
				// 拉起支付弹窗
				this.show = true;
			},
			// 确认支付
			surePay() {
				let platFlag = tool.testPlat(); //获取平台类型 0为安卓 1为ios
				let init = {};
				init.goodsname = this.goodsname; //开通的会员等级 0初级会员 1中级会员
				init.chanelTpye = this.radio; //0是支付宝 1是微信
				init.price = this.price; //要支付的价格
				// 根据平台类型的不同调用不同平台的支付方法
				if (platFlag == 0) {
					// 调用安卓支付的方法
					window.android.updateMember(JSON.stringify(init));
				} else {
					// 调用ios支付的方法
					window.webkit.messageHandlers.updateMember.postMessage(init);
				}
			},
			// ------------------------------------------------------------------------安卓端支付完成后调用的方法
			// 微信支付完成
			weChatPayFinish(value) {
				let payMembInfo = JSON.parse(value);
				this.payMembInfo = payMembInfo;
				this.show = false;
			},
			// 支付宝支付完成
			AlipayPayFinish(value) {
				let payMembInfo = JSON.parse(value);
				this.payMembInfo = payMembInfo;
				this.show = false;
			}
		},
	};
</script>
<style lang="less">
	.updateMember-pay {
		.van-dialog__header {
			padding: 0;
			height: 100px;
			line-height: 100px;
		}
	}
</style>
<style scoped="scoped" lang="less">
	@import url("../../../../public/css/other.css");

	table {
		border-collapse: separate;
	}

	.div_pay {
		text-align: left;
	}

	.content {
		margin-top: 88px;
	}

	.div_vip_li_img {
		img {
			border-radius: 10px;
		}
	}
</style>
