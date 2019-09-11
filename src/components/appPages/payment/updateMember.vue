<template>
	<div>
		<!-- 顶部标题栏 -->
		<div class="title-bar">
			<top-title :titleName="titleName" :pageType='pageType'></top-title>
		</div>
		<div class="wueui-content content">
			<div class="div_vip_list">
				<div class="div_vip_li">
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
							钻石*代理*入驻金融圈 自用省钱*推广赚钱
						</a>
						<div class="div_vip_li_info">
							<p style="text-align: left;">
								1. 达到中级会员后推荐20个用户使用升级既可有机会享受更
								高收益，还有机会进入躺赚模式，每一个收益环节都可以享受
								最高分配比例。
							</p>
							<p style="text-align: left;">
								2. 会员升级后享受多达三级的级差收益，分享越多收益越多。
							</p>
							<p style="text-align: left;">
								3. 推荐用户注册升级可享40%推荐收益。
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
											万31
										</td>
									<!-- 	<td rowspan="5">
											还款一万收益有20元，一年就有240元
										</td> -->
										<td>
											60%
										</td>
										<td>
											付费后累计推荐40人
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
											万29
										</td>
										<td>
											50%
										</td>
										<td>
											付费后累计推荐25人
										</td>
									</tr>
									<tr>
										<td>
											白金会员
										</td>
										<td>
											增加万4
										</td>
										<td>
											万27
										</td>
										<td>
											40%
										</td>
										<td>
											付费后累计推荐13人
										</td>
									</tr>
									<tr>
										<td>
											铂金会员
										</td>
										<td>
											增加万3
										</td>
										<td>
											万23
										</td>
										<td>
											30%
										</td>
										<td>
											付费后累计推荐3人
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
											20%
										</td>
										<td>
											付费升级
										</td>
									</tr>
								</table>
							</div>
						</div>
					</div>
					<div class="div_pay">
						¥398.00/年
						<span>¥598.00</span>
						<button class="btn_pay" @click="payMember('levelOne')" v-if="payMembInfo.memberLevel == 1">立即购买</button>
						<button class="btn_pay" @click="alreadyPurchased" v-if="payMembInfo.memberLevel >1">您已是会员</button>
					</div>
				</div>
				<div class="div_vip_li">
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
							黄金*代理*入驻金融圈 自用省钱*推广赚钱
						</a>
						<div class="div_vip_li_info">
							<p style="text-align: left;">
								1. 达到初级会员后推荐3个用户使用升级既可有机会享受相对
								较高收益。
							</p>
							<p style="text-align: left;">
								2. 会员升级后享受多达三级的级差收益，分享越多收益越多。
							</p>
							<p style="text-align: left;">
								3. 推荐用户注册升级可享30%推荐收益。
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
											付费后累计推荐40人
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
											50%
										</td>
										<td>
											付费后累计推荐25人
										</td>
									</tr>
									<tr>
										<td>
											白金会员
										</td>
										<td>
											增加万4
										</td>
										<td>
											万23
										</td>
										<td>
											40%
										</td>
										<td>
											付费后累计推荐13人
										</td>
									</tr>
									<tr>
										<td>
											铂金会员
										</td>
										<td>
											增加万3
										</td>
										<td>
											万19
										</td>
										<td>
											30%
										</td>
										<td>
											付费后累计推荐3人
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
											10%
										</td>
										<td>
											付费升级
										</td>
									</tr>
								</table>
							</div>
						</div>
					</div>
					<div class="div_pay">
						¥198.00/年
						<span>¥398.00</span>
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
				contentOne: false,//第一个下拉窗状态
				contentTwo: false,//第二个下拉窗状态
				show: false,//支付弹窗状态
				radio: '1',
				price: '', //选择会员的价格
				goodsname: '',//会员类型 0初级会员 1中级会员
				payMembInfo: '',//储存的app传过来的
			};
		},
		created() {
			let me = this;
			window['getUserLevel'] = (url) => {
				me.getUserLevel(url)
			}
			// 下面是自己测试代码
			// let a = {'highMemberName':'中级会员','highPayAmount':'2','midMemberName':'初级会员','midPayAmount':'1','memberLevel':'0'}
			// this.getUserLevel(a)
			// this.payMembInfo = {'highMemberName':'中级会员','highPayAmount':'2','midMemberName':'初级会员','midPayAmount':'1','memberLevel':'1'};
		},
		methods: {
			// 用户已经是会员了
			alreadyPurchased(){
				this.$toast({
					message:'您已经是会员了，请勿重复购买',
					duration:2000,
				})
			},
			// 获取app页面传递过来的数据的方法
			getUserLevel(e) {
				// e = JSON.stringify(e)
				let payMembInfo = JSON.parse(e);
				// this.$toast({
				// 	message: `highMemberName:${payMembInfo.highMemberName},highPayAmount:${payMembInfo.highPayAmount},midMemberName:${payMembInfo.midMemberName},midPayAmount:${payMembInfo.midPayAmount},userLevel:${payMembInfo.memberLevel}`,
				// 	duration: 0
				// })
				this.payMembInfo = payMembInfo;
			},
			// 拉起支付选择框
			payMember(level) {
				// if (this.payMembInfo.memberLevel > 1) {
				// 	this.$toast({
				// 		message: '您已经是会员了，请勿重复购买'
				// 	})
				// 	return;
				// }
				if (level == 'levelOne') {
					let highPayAmount = this.payMembInfo.highPayAmount;
					this.price = parseInt(highPayAmount)/100;
					this.goodsname = this.payMembInfo.highMemberName;
				} else {
					let midPayAmount = this.payMembInfo.midPayAmount;
					this.price = parseInt(midPayAmount)/100;
					this.goodsname = this.payMembInfo.midMemberName;
				}
				// 拉起支付弹窗
				this.show = true;
			},
			// 确认支付
			surePay() {
				let platFlag = tool.testPlat();//获取平台类型 0为安卓 1为ios
				let init = {};
				init.goodsname = this.goodsname;//开通的会员等级 0初级会员 1中级会员
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
			// notClose(action,done){
			// 	// 弹窗点击的是取消按钮,关闭弹窗
			// 	if(action == 'cancel'){
			// 		done()
			// 	}else{
			// 		// 弹窗点击的是确认按钮,发出支付,不关闭弹窗
			// 		done(false)
			// 	}
			// }
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
	table{
		border-collapse:separate;
	}
	.div_pay {
		text-align: left;
	}

	.content {
		margin-top: 88px;
	}
</style>
