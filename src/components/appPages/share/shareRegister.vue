<template>
	<div>
		<!-- 头部 -->
		<div class="banner">
			<img src="../../../assets/img/share/pic.png">
		</div>
		<!-- 注册栏 -->
		<div class="register flx-cas">
			<van-cell-group class='userInfo'>
				<div class="flx-r phone">
					<img src="../../../assets/img/share/icon.png">
					<van-field v-model="userInfo.userName" type="number" placeholder="请输入您的手机号" />
				</div>
				<div class="flx-r password">
					<img src="../../../assets/img/share/icon3.png">
					<van-field v-model="userInfo.passWord" type="password" placeholder="请输入您的密码" />
				</div>
				<div class="flx-ras verify">
					<div class="flx-r verify-code">
						<img src="../../../assets/img/share/icon2.png">
						<van-field v-model="userInfo.vcode" type="number" placeholder="请输入验证码" />
					</div>
					<van-button class="codeBtn" type="default" v-if="!showCountDown" @click='getVcode'>获取验证码</van-button>
					<van-button class="codeBtn flx-r" type="default" v-if="showCountDown">
						<van-count-down style='display: inline;color: #fff;' ref='countDown' class='count-down' :time="countDown" format='ss'
						 :auto-start='true' @finish='finished' />
						<span> 秒后再获取</span>
					</van-button>
				</div>
				<van-button class="register-btn" type="default" block @click='freeRegister'>免费注册</van-button>
				<van-button class="download-btn" type="default" block @click='goDownloadApp'>已注册,前往下载APP</van-button>
			</van-cell-group>
			<!-- 标题 -->
			<div class="title flx-r">
				<span></span>
				<div>了解安安卡管家</div>
				<span></span>
			</div>
			<div class="intro flx-cas">
				<div class="imgOne">
					<img src="../../../assets/img/share/pic2.png">
					<div class="nav flx-ras">
						<div class="flx-r">
							<span class="sp1">·</span>
							<span class="sp2">更便捷</span>
						</div>
						<div class="flx-r">
							<span class="sp1">·</span>
							<span class="sp2">更智能</span>
						</div>
						<div class="flx-r">
							<span class="sp1">·</span>
							<span class="sp2">更优惠</span>
						</div>
						<div class="flx-r">
							<span class="sp1">·</span>
							<span class="sp2">更多元</span>
						</div>
					</div>
					<div class="intro-ul">
						<div class="intro-li one flx-r">
							<img class="imgTwo" src="../../../assets/img/share/pic4.jpg">
							<div class="intro-li-content">
								<div>一键操作 智能还款</div>
								<div style="margin-top: 4px;">全自动完成账单还款</div>
							</div>
							<img class="imgThree" src="../../../assets/img/share/pic5.png">
						</div>
						<div class="intro-li two flx-r">
							<img class="imgTwo" src="../../../assets/img/share/pic6.jpg">
							<div class="intro-li-content">
								<div>完美还款自定义实体</div>
								<div style="margin-top: 4px;">落地商户,实现完美账单</div>
							</div>
							<img class="imgFour" src="../../../assets/img/share/pic7.jpg">
						</div>
						<div class="intro-li three flx-r">
							<img class="imgTwo" src="../../../assets/img/share/pic8.jpg">
							<div class="intro-li-content">
								<div>超低手续费,还款一万</div>
								<div style="margin-top: 4px;">手续费超低</div>
							</div>
							<img class="imgFive" src="../../../assets/img/share/pic9.jpg">
						</div>
						<div class="intro-li four flx-r">
							<img class="imgTwo" src="../../../assets/img/share/pic10.jpg">
							<div class="intro-li-content">
								<div>刷卡+还款+申请信用卡</div>
								<div style="margin-top: 4px;">零投资创业,做金融达人</div>
							</div>
							<img class="imgFour" src="../../../assets/img/share/pic11.jpg">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		server
	} from '@/api/server.js';
	export default {
		data() {
			return {
				userInfo: {
					agentId: '', //归属代理商编号
					recommendMobile:'',//推荐人手机号
					userName: '', //注册手机号
					passWord: '', //注册密码
					vcode: '', //短信验证码
				},
				showCountDown: false, //是否显示倒计时
				countDown: 60000, //倒计时
				// countDown: 10000, //倒计时
			};
		},
		created(){
			this.userInfo.agentId = this.$route.query.agentId;
			this.userInfo.recommendMobile = this.$route.query.recommendMobile;
		},
		methods: {
			// 跳转获取下载app页面
			goDownloadApp(){
				this.$router.push({
					name:'downloadApp'
				})
			},
			// 获取验证码
			getVcode() {
				if (this.userInfo.userName == '' || this.userInfo.userName == null) {
					this.$toast({
						message: '请输入手机号码'
					})
					return;
				}
				let init = {}
				init.businessType = 1;
				init.mobile = this.userInfo.userName;
				init.agentId = this.userInfo.agentId
				server.vcodeMobile(init).then(res => {
					if (res == null) return; //返回为null 不执行下面操作
					this.$toast({
						message: '短信已经发送到您手机,请注意查收',
					})
					this.showCountDown = true; //切换验证倒计时
				})
			},
			// 倒计时结束
			finished() {
				this.showCountDown = false;
			},
			// 免费注册
			freeRegister() {
				let userInfo = this.userInfo;
				if(!userInfo.userName){
					this.$toast('请填写手机号');
					return;
				}else if(!userInfo.passWord){
					this.$toast('请填写密码');
					return;
				}else if(!userInfo.vcode){
					this.$toast('请填写验证码')
					return
				}
				server.register(userInfo)
				.then(res=>{
					if (res == null) return; //返回为null 不执行下面操作
					this.$toast({
						message:'注册成功!赶快下载登陆APP使用吧!',
						forbidClick:true,
					})
					setTimeout(()=>{
						this.$router.push({
							name:'downloadApp'
						})
					},2000)
				})
			}
		},
	};
</script>
<style scoped="scoped" lang="less">
	.van-button--default {
		border: none;
	}

	.banner {
		width: 100%;
		height: 454px;

		img {
			width: 100%;
			height: 100%;
		}
	}

	.register {
		width: 100%;
		height: 3000px;
		background: #00a2ea;

		.userInfo {
			width: 610px;
		}

		[class*=van-hairline]::after {
			border: none;
		}

		.title {
			padding-top: 100px;
			width: 700px;
			justify-content: space-between;

			span {
				width: 190px;
				height: 4px;
				background: #fff;
			}

			div {
				font-size: 32px;
				color: #fff;
			}
		}

		.intro {
			margin-top: 100px;
			width: 610px;
			height: 1000px;

			.imgOne {
				position: relative;

				img {
					width: 100%;
				}

				.nav {
					width: 610px;
					height: 36px;
					justify-content: space-around;
					position: absolute;
					bottom: 50px;
					left: 0;
					box-sizing: border-box;
					padding: 0 20px;

					.sp1 {
						color: #000;
						font-weight: bold;
					}

					.sp2 {
						font-size: 26px;
						color: #174763;
					}
				}
			}

			.intro-ul {
				width: 610px;
				position: absolute;
				top: 384px;
				left: 0;

				.intro-li {
					width: 100%;
					height: 430px;
					background: url(../../../assets/img/share/pic3.png) no-repeat center center;
					background-size: 100% 100%;
					font-size: 32px;
					color: #333;
					justify-content: flex-start;

					.imgTwo {
						padding-left: 40px;
						padding-top: 50px;
						width: 45px;
					}

					.intro-li-content {
						padding-top: 50px;
						padding-left: 30px;
						text-align: left;
					}

					.imgThree {
						padding-top: 50px;
						padding-left: 60px;
						width: 104px;
					}

					.imgFour {
						padding-top: 50px;
						padding-left: 60px;
						width: 70px;
					}

					.imgFive {
						padding-top: 50px;
						padding-left: 88px;
						width: 70px;
					}
				}

				.one {
					position: absolute;
					top: 0px;
					left: 0px;
				}

				.two {
					position: absolute;
					top: 420px;
					left: 0px;
					z-index: 10;
				}

				.three {
					position: absolute;
					top: 840px;
					left: 0px;
					z-index: 10;
				}

				.four {
					position: absolute;
					top: 1260px;
					left: 0px;
					z-index: 10;
				}
			}
		}
	}

	.userInfo {
		background: #00a2ea;
		margin-top: 60px;

		.register-btn {
			background: #fdbc0c;
			color: #fff;
			border-radius: 10px;
			font-size: 34px;
		}

		.download-btn {
			margin-top: 30px;
			background: #4abcef;
			color: #fff;
			border-radius: 10px;
			font-size: 34px;
		}
	}

	.phone,
	.password,
	.verify-code {
		background: #fff;
		margin-bottom: 30px;
		border-radius: 10px;
		height: 80px;

		img {
			height: 40px;
			padding: 0 20px;
		}

		.van-field {
			border-radius: 10px;
			padding: 15px 0;
			// height: 80px;
		}
	}

	.verify {
		justify-content: space-between;

		.verify-code {
			width: 386px;
		}

		.codeBtn {
			width: 200px;
			height: 80px;
			font-size: 26px;
			color: #fff;
			line-height: 80px;
			text-align: center;
			background: #fdbc0c;
			border-radius: 10px;
			padding: 0 10px;
		}

	}
</style>
