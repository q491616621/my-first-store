<template>
	<div>
		<!-- 顶部标题栏 -->
		<!-- 		<div class="title-bar flx-r">
			<top-title :titleName="titleName" :pageType='pageType'></top-title>
		</div> -->
		<div class="posters-list flx-cas">
			<div class="posters-li">
				<div class="top flx-rs">
					<div class="title">8月14日推荐</div>
					<div class="share-btn" @click="aaa">分享</div>
				</div>
				<div class="content">拥抱梦想，杨帆起航</div>
				<!-- 	<div class="image">
					<img class="qrCode-img" id="erCode" :src="qrCode">
				</div> -->
			</div>
		</div>
		<canvas id="myCanvas" :style="{width:width+'px',height:height+'px'}"></canvas>
		<button @click="downloadImg">点击下载</button>
	</div>
</template>
<script>
	import topTitle from '@/components/common/topTitle.vue';
	import QRCode from "qrcode";
	export default {
		components: {
			topTitle,
		},
		data() {
			return {
				titleName: '每日海报', //标题栏标题
				screenWidth: '',
				posterSize: 500 / 900, //海报比例
				qrCodeSize: { //二维码与海报对应比例=》用于设置二维码在海报中的位置
					width: 150 / 500,
					height: 150 / 900,
					left: 190 / 900,
					top: 500 / 900,
				},
				poster: '', //合成图片
				// ------------------------------------------------
				dataUrl: "", //整个页面生成的图片
				// --------------------------------------------
				pageType: 'app', //上个页面是什么h5还是app?
				qrCode: '', //二维码
				width: '', //屏幕宽度
				height: '', //屏幕高度
				img: require('../../../assets/img/qrCode1.jpg')
			};
		},
		created() {
			this.screenWidth = document.body.clientWidth || document.documentElement.clientWidth || 375;
			// -------------------------------------------
			let width = document.body.scrollWidth;
			let height = (width / 5) * 9
			this.width = width*1.4;
			this.height = height*1.4;
		},
		mounted() {
			this.userQrcode()
		},
		methods: {
			// 下载图片
			downloadImg() {
				if (this.poster) {
					let a = document.createElement('a');
					a.setAttribute("download", "海报下载-" + (new Date().getTime()));
					a.href = this.poster;
					a.click()
				}else{
					console.log('海报不存在请重新生成')
				}
			},
			// 生成二维码
			userQrcode() {
				// console.log(document.body.clientWidth)
				// let qrCodeCanvas = document.getElementById('qrCodeCanvas');
				// QRCode.toCanvas(
				// 	qrCodeCanvas,
				// 	"https://www.baidu.com",
				// 	(error) => {
				// 		if (error) console.log(error);
				// 		console.log("QRCode success!");
				// 	}
				// )
				// 'https://www.kfmanager.com/producth5/index.html#/shareRegister?agentId=1908141437&recommendMobile=13610144601'
				QRCode.toDataURL(
						'https://www.kfmanager.com/producth5/index.html#/shareRegister?agentId=1908141437&recommendMobile=13610144601')
					.then(url => {
						this.qrCode = url;
						console.log(url)
					})
					.catch(err => {
						this.$toast({
							messgae: '二维码生成失败,请重新进入页面'
						})
					})
			},
			aaa() {
				let bgImg = require('../../../assets/img/qrCode4.jpg');
				let qrCode = this.qrCode;
				let base64 = '';
				let canvas = document.getElementById('myCanvas');
				let ctx = canvas.getContext('2d');
				// let bgWidth = this.screenWidth * 2; //图片宽度
				// let bgHeight = this.posterSize * bgWidth; //图片高度
				let bgWidth = this.width; //图片宽度
				let bgHeight = this.height; //图片高度
				let qrWidth = this.qrCodeSize.width * bgWidth; // 二维码宽 = 比例 * 宽度
				let qrHeight = this.qrCodeSize.height * bgHeight; // 二维码高 = 比例 * 高度 
				let qrLeft = bgWidth / 2 - qrWidth / 2 //二维码距离左侧位置
				let qrTop = bgHeight / 2 - qrHeight / 2
				// 设置canvas的宽高
				canvas.width = bgWidth;
				canvas.height = bgHeight;
				ctx.rect(0, 0, bgWidth, bgHeight);
				ctx.fillStyle = '#000'; //填充颜色
				ctx.fill();
				let list = [{
						file: bgImg,
						size: [0, 0, bgWidth, bgHeight]
					},
					{
						file: qrCode,
						size: [qrLeft, qrTop, qrWidth * 0.8, qrHeight * 0.8]
					}
				];
				// 开始绘制
				let drawing = (index) => {
					//判断当前索引=》是否已经绘制成功
					if (index < list.length) {
						console.log(index + 1)
						let img = new Image();
						let timeStamp = new Date().getTime(); //时间戳
						// 防止跨域
						img.setAttribute('crossOrigin', 'anonymous');
						// 给图片链接加上时间戳
						img.src = list[index].file;
						img.onload = () => {
							console.log(list[index])
							ctx.drawImage(img, ...list[index].size);
							// 递归list
							drawing(index + 1)
						}
					} else {
						base64 = canvas.toDataURL('image/');
						if (base64) {
							console.log(base64)
							// 赋值到相应的海报上
							this.$set(this, 'poster', base64)
						}
					}
				}
				drawing(0)
			},
			// 分享
			share() {
				let img = new Image();
				img.src = require('../../../assets/img/qrCode1.jpg')
				const canvas = document.getElementById('myCanvas');
				const ctx = canvas.getContext('2d');
				let scale = 5 / 9;
				console.log(document.documentElement.clientWidth)
				console.log(document.documentElement.clientHeight)
				console.log(img.width)
				console.log(img.height)
				ctx.drawImage(img, 0, 0, 375, 150);
			}
		}
	};
</script>
<style scoped="scoped" lang="less">
	#myCanvas {
		// background: pink;
	}

	.posters-list {
		width: 100%;
		margin-top: 88px;

		.posters-li {
			width: 710px;
			height: 800px;
			box-sizing: border-box;
			padding: 20px 0;
			font-size: 30px;
			border-bottom: 20px solid #fafafa;

			.top {
				justify-content: space-between;

				.title {
					border-left: 10px solid #09bd07;
					padding-left: 10px;
				}

				.share-btn {
					width: 120px;
					height: 50px;
					background: #f3f4f4;
					border-radius: 40px;
					border: 2px solid #e3e3e3;
					line-height: 50px;
					font-size: 24px;
				}
			}

			.content {
				text-align: left;
				color: #9d9d9d;
				padding-top: 5px;
			}

			.image {
				margin-top: 5px;
				width: 500px;
				height: 900px;
				background: url('../../../assets/img/qrCode1.jpg') no-repeat center center;
				background-size: 100% 100%;
				position: relative;
			}

			.qrCode-img {
				position: absolute;
				width: 50%;
				top: 50%;
				margin-top: -25%;
				left: 50%;
				margin-left: -25%;
			}
		}
	}
</style>
