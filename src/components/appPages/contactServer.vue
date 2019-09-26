<template>
	<div class="container">
		<div class="title-bar">
			<top-title :titleName="titleName" :pageType='pageType'></top-title>
		</div>
		<div class="server-box flx-c">
			<div class="app-name flx-cas">
				<div class="bold">安安卡管家</div>
				<div>版本号1.0.0</div>
			</div>
			<div class="server-info flx-cs">
				<div class="flx-rs">
					<img class="phone-img" src="../../assets/img/contactServer_phone.png" alt="客服电话" />
					<div>联系电话 :</div>
					<div class="word phone" @click="callTel">0755-33941925</div>
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
					<div>1.复制客服微信:18924596162</div>
					<div>2.打开微信,点击右上角“+”,【添加朋友】</div>
					<div>3.在搜索框中,粘贴微信号,与微信客服沟通</div>
				</div>
				<div style="width: 100%;" class="bottom-btn flx-r">
					<button class="copy-btn" data-clipboard-action="copy" data-clipboard-text='18924596162' ref='copy' @click='copyWx'>复制微信号</button>
					<button class="copy-btn2" @click='openWeChat'>打开微信</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import topTitle from '@/components/common/topTitle.vue';
	import tool from '../../../public/tool/tool.js';
	export default {
		components: {
			topTitle
		},
		data() {
			return {
				titleName: '联系客服',
				pageType: 'app',
				copyBtn: null ,//存储初始化复制按钮事件
				n:0
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
				// 每次都需要重置这个值，不然再点击复制就不生效了
				this.copyBtn = new this.clipboard(this.$refs.copy);
			},
			// 打开微信
			openWeChat(){
				let platFlag = tool.testPlat();//获取用户手机类型
				if(platFlag == 1){
					//调用ios打开微信的方法
					let init = '奥利奥，泡一泡'
					window.webkit.messageHandlers.openWechat.postMessage(init);
				}else{
					//调用安卓打开微信的方法
					window.android.openWechat();
				}
			},
			// 打电话
			callTel(){
				let platFlag = tool.testPlat();//获取用户手机类型
				let init = {
					telNumber:'0755-33941925'
				}
				if(platFlag == 1){
					// 调用ios打电话的方法
					window.webkit.messageHandlers.callTelAction.postMessage(init);
				}else{
					// 调用安卓打电话方法
					window.android.callTelAction(JSON.stringify(init));
				}
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
			a{
				padding-left: 14px;
				color: #fff;
				text-decoration: underline;
			}
			.word {
				padding-bottom: 6px;
			}
			.phone{
				text-decoration: underline;
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
			.bottom-btn{
				justify-content: space-around;
				.copy-btn {
					margin-top: 10px;
					width: 250px;
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
					box-shadow: 0px 10px 20px rgba(53, 133, 254, 0.5);
				
				}
				.copy-btn2{
					margin-top: 10px;
					width: 250px;
					height: 75px;
					font-size: 30px;
					color: #53a7ff;
					font-weight: bold;
					border: 2px solid #6EBFFF;
					box-sizing: border-box;
					border-radius: 38px;
					line-height: 75px;
					text-align: center;
					-moz-box-shadow: -1px 10px 24px 0px rgba(53, 133, 254, 0.5);
					-webkit-box-shadow: -1px 10px 24px 0px rgba(53, 133, 254, 0.5);
					box-shadow: 0px 10px 20px rgba(53, 133, 254, 0.5);
				}
			}
		}
	}
</style>
