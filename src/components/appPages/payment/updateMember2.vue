<template>
	<div style="width: 100%;">
		<!-- 顶部标题栏 -->
		<div class="title-bar">
			<top-title :titleName="titleName" :pageType='pageType'></top-title>
		</div>
		<div class="member-box flx-cas">
			<!-- 金 -->
			<div class="gold flx-cas">
				<img class="gold-bg" src="../../../assets/img/images/icon003.png">
				<div class="title">金卡会员</div>
				<div class="label1 flx-ras">
					<div class="label-li">购买率：5%</div>
					<div class="label-li flx-rs">
						<div>推荐指数：</div>
						<img src="../../../assets/img/images/icon005.png" />
						<img src="../../../assets/img/images/icon005.png" />
						<img src="../../../assets/img/images/icon005.png" />
						<img src="../../../assets/img/images/icon005.png" />
						<img src="../../../assets/img/images/icon005.png" />
					</div>
				</div>
				<div class="label2">
					<div class="label-li">智能还款分润万20</div>
				</div>
				<div class="title2" @click="contentOne=!contentOne">
					<div>金卡会员 自用省钱*推广赚钱</div>
					<img v-show="!contentOne" class="top" src="../../../assets/img/images/icon004.png">
					<img v-show="contentOne" class="bottom" src="../../../assets/img/images/icon007.png">
				</div>
				<div class="show-content">
					<div>1. 自用省钱，还款1万最高省31元</div>
					<div>2. 成人达己，招募团队合伙人。</div>
					<div>3. 卡测评、查征信持续上线，敬请期待。</div>
					<div>4. 尊享分红，同级别共享奖励。</div>
				</div>
				<div class="price flx-r">
					<div class="left">
						<span>¥298.00/年</span>
						<span>¥598.00</span>
					</div>
				</div>
			</div>
			<!-- 银 -->
			<div class="silver">
				
			</div>
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
<style scoped="scoped" lang="less">
	.member-box{
		// width: 750px;
		width: 100%;
		margin-top:88px;
		color:#333;
		font-size:28px;
		.gold{
			margin-top: 20px;
			width: 690px;
			// height: 500px;
			// background:pink;
			.gold-bg{
				width: 100%;
				border-radius: 10px;
				-moz-box-shadow: 0px 10px 20px rgba(0,0,0,0.2); /* 老的 Firefox */
				box-shadow: 0px 10px 20px rgba(0,0,0,0.2);
			}
			.title{
				margin-top: 20px;
				line-height: 52px;
			}
			.label1{
				align-self:flex-start;
				.label-li{
					height: 44px;
					line-height: 48px;
					background: #ff852b;
					margin-right: 20px;
					padding: 0 12px;
					color: #fff;
					font-size: 24px;
					-webkit-border-radius: 6px;
					-moz-border-radius: 6px;
					border-radius: 6px;
					img{
						width: 24px;
						height: 24px;
						padding-bottom: 5px;
					}
				}
			}
			.label2{
				align-self:flex-start;
				margin-top: 20px;
				.label-li{
					height: 44px;
					line-height: 48px;
					background: #3e80f7;
					margin-right: 20px;
					padding: 0 12px;
					color: #fff;
					font-size: 24px;
					-webkit-border-radius: 6px;
					-moz-border-radius: 6px;
					border-radius: 6px;
				}
			}
			.title2{
				width: 100%;
				margin-top:20px;
				color: #999;
				position: relative;
				.top{
					position: absolute;
					top: 0;
					right: 0;
					width: 28px;
					margin-top: 8px;
				}
				.bottom{
					position: absolute;
					top: 0;
					right: 0;
					width: 28px;
					margin-top: 8px;
				}
			}
			.price{
				width: 100%;
				height: 100px;
				background: pink;
				justify-content: space-between;
			}
		}
	}
</style>
