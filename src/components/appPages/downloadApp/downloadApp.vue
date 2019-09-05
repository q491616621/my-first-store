<template>
	<div>
		<!-- 下载链接 -->
		<div class="downloadApp-bg flx-cas">
			<img src="../../../assets/img/pic.jpg">
			<div class="title">专业、便捷、安全、稳定</div>
			<a class="download-btn flx-r" @click="downloadApp">
				<div class="box flx-rs">
					<img src="../../../assets/img/icon.png">
					<span>下载苹果客户端</span>
				</div>
			</a>
			<a class="download-btn flx-r" @click="downloadApp">
				<div class="box flx-rs">
					<img src="../../../assets/img/icon2.png">
					<span>下载安卓客户端</span>
				</div>
			</a>
		</div>
		<!-- 提示跳转使用浏览器打开蒙层 -->
		<div class="weChat-box" v-if="show">
			<img class="img1" src="../../../assets/img/pic2.png">
			<img class="img2" src="../../../assets/img/pic3.png">
			<img class="img3" src="../../../assets/img/pic4.png" @click="show = false">
		</div>
	</div>
</template>
<script>
	import tool from '../../../../public/tool/tool.js'
	export default {
		data() {
			return {
				platFlag: '', //用户的机型
				show: false, //跳转提示是否显示
			};
		},
		created() {
			// 检查平台 0为安卓，1为ios，2为PC
			let platFlag = tool.testPlat();
			this.platFlag = platFlag;
			if (/MicroMessenger/gi.test(navigator.userAgent)) {
				this.show = true;
			}
		},
		methods: {
			// 点击下载app
			downloadApp() {
				// 判断用户当前打开网页的环境是否是微信,是的话引导去浏览器打开网页
				if (/MicroMessenger/gi.test(navigator.userAgent)) {
					this.show = true;
					return;
				}
				// 判断用户机型跳转不同的下载
				let platFlag = this.platFlag;
				// 0为安卓，1为ios，2为PC
				if (platFlag == 0) {
					window.location.href = 'https://fir.im/xlu8'
				} else {
					window.location.href = "https://fir.im/8sgc";
				}
			}
		},
	};
</script>
<style scoped="scoped" lang="less">
	.downloadApp-bg {
		width: 100%;
		padding-top: 80px;

		img {
			width: 480px;
			height: 700px;
		}

		.title {
			padding-top: 20px;
			font-size: 48px;
			color: #6486b9;
			font-weight: bold;
		}

		.download-btn {
			// display: block;
			width: 460px;
			height: 80px;
			background: #00a2ea;
			border-radius: 50px;
			margin-top: 50px;

			.box {
				width: 305px;
			}

			img {
				width: 40px;
				height: 44px;
			}

			span {
				padding-left: 5px;
				font-size: 32px;
				color: #fff;
			}
		}
	}

	.weChat-box {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.7);

		.img1 {
			width: 130px;
			position: absolute;
			top: 30px;
			right: 30px;
		}

		.img2 {
			width: 600px;
			position: absolute;
			top: 150px;
			left: 50%;
			margin-left: -300px;
		}

		.img3 {
			width: 300px;
			position: absolute;
			top: 800px;
			margin-left: -150px;
		}
	}
</style>
