<template>
	<div class="container">
		<div class="title-bar">
			<top-title :titleName="titleName" :pageType='pageType'></top-title>
		</div>
		<div class="server-box flx-c">
			<div class="app-name flx-cas">
				<div class="bold">金融师</div>
				<div>版本号1.0.0</div>
			</div>
			<div class="server-info flx-cs">
				<div class="flx-rs">
					<img class="phone-img" src="../../assets/img/contactServer_phone.png" alt="客服电话" />
					<div>联系电话 :</div>
					<div class="word">0755-33941925</div>
				</div>
				<div class="flx-rs">
					<img class="time-img" src="../../assets/img/contactServer_time.png" alt="客服电话" />
					<div>工作时间 :</div>
					<div class="word">09:00-19:00</div>
				</div>
			</div>
			<div class="server-weChat flx-c">
				<div class="title">客服微信</div>
				<div class="content flx-c">
					<div>1.复制客服微信:17727583650</div>
					<div>2.打开微信,点击右上角“+”,【添加朋友】</div>
					<div>3.在搜索框中,粘贴微信号,与微信客服沟通</div>
				</div>
				<div style="width: 100%;" class="flx-c">
					<button class="copy-btn" data-clipboard-action="copy" data-clipboard-text='17727583650' ref='copy' @click='copyWx'>复制微信号</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import topTitle from '@/components/common/topTitle.vue';
	export default {
		components: {
			topTitle
		},
		data() {
			return {
				titleName: '联系客服',
				pageType: 'app',
				copyBtn: null //存储初始化复制按钮事件
			};
		},
		mounted() {
			this.copyBtn = new this.clipboard(this.$refs.copy);
		},
		methods: {
			// 复制微信
			copyWx() {
				let clipboard = this.copyBtn;
				clipboard.on('success', e => {
					this.$toast({
						message: '复制成功',
						type: 'success'
					})
					clipboard.destroy()
				})
				clipboard.on('error', e => {
					this.$toast({
						message: '手机不支持,请手动复制',
					})
					clipboard.destroy()
				})
			}
		},
	};
</script>
<style scoped="scoped" lang="less">
	.container{
		width: 100%;
		height: 100%;
	}
	.server-box {
		margin-top: 88px;
		width: 100%;
		height: 1246px;
		background: url(../../assets/img/contactServer_bg.png) no-repeat center center;
		background-size: 100% 100%;
		justify-content: flex-start;

		.app-name {
			margin-top: 62px;
			width: 332px;
			height: 349px;
			background: pink;
			background: url(../../assets/img/contactServer_loop.png) no-repeat center center;
			background-size: 100% 100%;
			color: #fff;
		}

		.app-name :first-child {
			padding-top: 132px;
			font-size: 52px;
			height: 49px;
			line-height: 49px;
		}

		.app-name :last-child {
			padding-top: 31px;
			font-size: 26px;
			line-height: 25px;
		}

		.server-info {
			margin-top: 73px;
			font-size: 28px;
			color: #fff;

			img {
				width: 30px;
				height: 30px;
				flex-shrink: 0;
			}

			div {
				padding-left: 14px;
			}

			.word {
				padding-bottom: 6px;
			}
		}

		.server-info :last-child {
			padding-top: 10px;
		}

		.server-weChat {
			margin-top: 80px;
			width: 630px;
			height: 440px;
			background: #fff;
			border-radius: 22px;
			box-sizing: border-box;
			padding: 45px 50px 52px 50px;
			justify-content: flex-start;
			align-items: flex-start;

			.title {
				font-size: 34px;
				font-weight: bold;
				color: #1A82FF;
			}

			.content {
				margin-top: 40px;
				font-size: 26px;
				color: #131313;
				align-items: flex-start;

				div {
					padding-bottom: 26px;
				}
			}

			.copy-btn {
				margin-top: 10px;
				width: 360px;
				height: 75px;
				color: #fff;
				font-size: 30px;
				font-weight: bold;
				// background: -webkit-gradient(linear,0% 0%, 100% 0%, from(#6EBFFF), to(#1A82FF), color-stop(1.0,#1A82FF));
				background: linear-gradient(90deg, rgba(110, 191, 255, 1), rgba(26, 130, 255, 1));
				border-radius: 38px;
				line-height: 75px;
				text-align: center;
				-moz-box-shadow: -1px 10px 24px 0px rgba(53, 133, 254, 0.5);
				-webkit-box-shadow: -1px 10px 24px 0px rgba(53, 133, 254, 0.5);
				// -moz-box-shadow:0px 10px 20px rgba(53, 133, 254, 0.5);
				// -webkit-box-shadow:0px 10px 20px rgba(53, 133, 254, 0.5);
				box-shadow: 0px 10px 20px rgba(53, 133, 254, 0.5);

			}
		}
	}
</style>
