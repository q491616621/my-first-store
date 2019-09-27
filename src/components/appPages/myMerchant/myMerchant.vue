<template>
	<div style="width: 100%;">
		<div class="return-top">
			<div class="flx-r top-title">
				<button class="return-btn" @click="returnBack">
					<img src="../../../assets/img/return_white.png" alt="返回按钮">
				</button>
				<div class="title-name">{{titleName}}</div>
			</div>
		</div>
		<div class="background-box" @click="goMerChantDetails(list[0].userLevel)">
			<div class="information-box position">
				<div class="title">累积推广（人）：{{totalAccount}}</div>
				<div class="content flx-r">
					<div class="box flx-c">
						<div class="name">我的伙伴</div>
						<div class="num">{{list[0].subTotal}}</div>
					</div>
					<div class="box flx-c">
						<div class="name">VIP</div>
						<div class="num">{{list[0].memberTotal}}</div>
					</div>
					<div class="box flx-c">
						<div class="name">实名</div>
						<div class="num">{{list[0].authTotal}}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="information flx-cas">
			<div class="information-box" @click="goMerChantDetails(list[1].userLevel)">
				<!-- <div class="title">累积服务商（人）：未知</div> -->
				<div class="content flx-r">
					<div class="box flx-c">
						<div class="name">我的团队</div>
						<div class="num">{{list[1].subTotal}}</div>
					</div>
					<div class="box flx-c">
						<div class="name">VIP</div>
						<div class="num">{{list[1].memberTotal}}</div>
					</div>
					<div class="box flx-c">
						<div class="name">实名</div>
						<div class="num">{{list[1].authTotal}}</div>
					</div>
				</div>
			</div>
			<div class="information-box box2" @click="goMerChantDetails(list[2].userLevel)">
				<!-- <div class="title">累积服务商（人）：未知</div> -->
				<div class="content flx-r">
					<div class="box flx-c">
						<div class="name">我的人脉</div>
						<div class="num">{{list[2].subTotal}}</div>
					</div>
					<div class="box flx-c">
						<div class="name">VIP</div>
						<div class="num">{{list[2].memberTotal}}</div>
					</div>
					<div class="box flx-c">
						<div class="name">实名</div>
						<div class="num">{{list[2].authTotal}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import tool from '../../../../public/tool/tool.js'
	import switchServer from '../../../../public/tool/switchServer.js';
	import {
		server
	} from '@/api/server.js';
	export default {
		data() {
			return {
				titleName: '我的商户', //标题栏标题
				pageType: 'app', //上个页面是什么h5还是app?
				totalAccount: 0, //累计推广人数
				list: [{
						"subTotal": 0,
						"memberTotal": 0,
						"authTotal": 0,
						"userLevel": null
					},
					{
						"subTotal": 0,
						"memberTotal": 0,
						"authTotal": 0,
						"userLevel": null
					},
					{
						"subTotal": 0,
						"memberTotal": 0,
						"authTotal": 0,
						"userLevel": null
					}
				], //存放我的商户数据的数组
			};
		},
		beforeRouteEnter(to,from,next){
			let name = from.name;
			if(name == 'merchantDetails'){
				to.params.type = 'next'
			}
			next()
		},
		created() {
			if(this.$route.params.type == 'next'){
				this.getData()
			}else{
				let me = this;
				window['getMyMerchantData'] = (url) => {
					me.getMyMerchantData(url)
				}
				// -----------------------------
				// this.getData()
			}
		},
		methods: {
			// 设置相关app端传过来的数据
			getMyMerchantData(e) {
				// 这行代码用来判断用户是否是从app端进来当前页面的,如果不是的app端进来的或者处于非myMerchant页面,不执行下面的操作(这个是为了优化安卓不多次调用接口)
				if(this.$route.name != 'myMerchant'||this.$route.params.type == 'next')return;
				let appData = JSON.parse(e);
				let sessionId = appData.sessionId;
				switchServer.setCookie(sessionId)
				// this.$toast({
				// 	message:appData.sessionId,
				// 	duration:5000
				// })
				this.getData() //执行调用获取数据的函数
			},
			getData() {
				tool.toastLoading()
				server.countSubAccounts()
					.then(res => {
						if (res == null) return;
						if(res.data.list.length !=0&&res.data.list.length == 1){
							this.list[0] = res.data.list[0];
						}else if(res.data.list.length !=0&&res.data.list.length == 2){
							this.list[0] = res.data.list[0];
							this.list[1] = res.data.list[1];
						}else if(res.data.list.length !=0&&res.data.list.length == 3){
							this.list = res.data.list;
						}
						// if (res.data.list.length != 0) {
						// 	this.list = res.data.list;
						// }
						this.totalAccount = res.data.totalAccount;
					})
			},
			// 返回上一个页面
			returnBack() {
				// 检查平台 0为安卓，1为ios，2为PC
				let platFlag = tool.testPlat();
				if (platFlag == 1) { //苹果调用苹果的返回方法
					let aaa = '奥利奥，泡一泡';
					window.webkit.messageHandlers.closeWeb.postMessage(aaa);
				} else { //安卓调用安卓的返回方法
					window.android.btnBack()
				}
			},
			// 跳转我的商户详情页面
			goMerChantDetails(userLevel) {
				this.$router.push({
					name: 'merchantDetails',
					params:{userLevel}
				})
			}
		},
	};
</script>

<style scoped="scoped" lang="less">
	.top-title {
		width: 100%;
		height: 88px;
		box-sizing: border-box;
		// padding: 28px 30px;
		// border-bottom: 1px solid #EDEDED;
		position: relative;
		background: linear-gradient(90deg, rgba(110, 191, 255, 1), rgba(26, 130, 255, 1));

		.return-btn {
			position: absolute;
			top: 0px;
			left: 0px;
			// width: 100px;
			height: 100%;

			img {
				padding: 0px 30px;
				width: 18px;
				height: 32px;
			}
		}

		.title-name {
			font-size: 36px;
			color: #ffffff;
			font-weight: bold;
			line-height: 64px;
		}
	}

	// 背景盒子
	.background-box {
		position: relative;
		width: 100%;
		height: 150px;
		background: linear-gradient(90deg, rgba(110, 191, 255, 1), rgba(26, 130, 255, 1));

		.position {
			position: absolute;
			top: 20px;
			left: 50%;
			margin-left: -345px;
		}
	}

	.information-box {
		width: 690px;
		height: 280px;
		background: #ffffff;
		border-radius: 20px;
		-moz-box-shadow: 0px 5px 10px #ccc;
		-webkit-box-shadow: 0px 5px 10px #ccc;
		box-shadow: 0px 5px 10px #ccc;
		box-sizing: border-box;
		padding: 20px;

		.title {
			width: 100%;
			font-size: 24px;
			text-align: left;
			font-weight: bold;
		}

		.content {
			width: 100%;
			height: 130px;
			margin-top: 50px;
			// background: pink;
			justify-content: space-around;

			.box {
				width: 33.3333%;
				height: 100%;

				.name {
					color: #777;
					font-size: 26px;
				}

				.num {
					padding-top: 20px;
					color: #373737;
					font-size: 40px;
					font-weight: bold;
				}
			}
		}
	}

	.information {
		width: 100%;
		margin-top: 180px;

		.bottom {
			margin-top: 30px;
		}
	}
	.box2{
		margin-top: 30px;
	}
</style>
