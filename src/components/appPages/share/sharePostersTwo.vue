<template>
	<div>
		<!-- 顶部标题栏 -->
		<div class="title-bar flx-r">
			<top-title :titleName="titleName" :pageType='pageType'></top-title>
		</div>
		<div class="container flx-cas">
			<div class="switch-bar flx-r">
				<div class="left">
					推广海报
				</div>
				<div class="right">
					信用卡海报
				</div>
			</div>
			<div class="posters-list flx-rs">
				<div class="posters-li" v-for="(item,index) in postersList" :key='index' @click="showPostersBox(item.img)">
					<div class="img-box">
						<img :src="item.img">
						<div class="erCode"></div>
					</div>
					<div class="title">海报{{index+1}}</div>
				</div>
			</div>
		</div>
		<van-dialog class="postersBox" v-model="postersBox" :showConfirmButton='false'>
			<img src="https://img.yzcdn.cn/vant/apple-3.jpg">
		</van-dialog>
		<canvas id="myCanvas" :style="{width:width+'px',height:height+'px'}"></canvas>
		<button @click="downLoad">下载</button>
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
				titleName: '分享海报',
				pageType: 'app',
				postersList: [{
						img: require('../../../assets/img/posters/posters1.jpg')
					},
					{
						img: require('../../../assets/img/posters/posters1.jpg')
					},
					// {
					// 	img: require('../../../assets/img/posters/poster1.jpg')
					// },
					// {
					// 	img: require('../../../assets/img/posters/poster1.jpg')
					// },
					// {
					// 	img: require('../../../assets/img/posters/poster1.jpg')
					// },
					// {
					// 	img: require('../../../assets/img/posters/poster1.jpg')
					// },
					// {
					// 	img: require('../../../assets/img/posters/poster1.jpg')
					// },
					// {
					// 	img: require('../../../assets/img/posters/poster1.jpg')
					// },
				],
				poster: '', //合成出来的图片
				screenWidth: '', //屏幕宽度
				qrCode: '', //二维码
				postersBox: false,
				width: '', //屏幕宽度
				height: '', //屏幕高度
				qrCodeSize: { //二维码与海报对应比例=》用于设置二维码在海报中的位置
					width: 125 / 500,
					height: 125 / 900,
					left: 190 / 900,
					top: 500 / 900,
				},
			};
		},
		beforeCreate() {
			document.querySelector('body').setAttribute('style', 'background-color:#f2f2f2')
		},
		created() {
			let img = new Image();
			img.src = this.postersList[0].img;
			
			this.screenWidth = document.body.clientWidth || document.documentElement.clientWidth || 375;
			let width = 500;
			let height = 900;
			// let width = document.body.scrollWidth;
			// let height = (width / 5) * 9
			this.width = width;
			this.height = height;
			this.getUserQrCode();
		},
		methods: {
			// 下载图片
			downLoad(){
				if (this.poster) {
					let a = document.createElement('a');
					a.setAttribute("download", "海报下载-" + (new Date().getTime()));
					a.href = this.poster;
					a.click()
				} else {
					console.log('海报不存在请重新生成')
				}
			},
			// 生成二维码图片
			getUserQrCode() {
				QRCode.toDataURL(
						'https://www.kfmanager.com/producth5/index.html#/shareRegister?agentId=1908141437&recommendMobile=13610144601')
					.then(url => {
						this.qrCode = url;
					})
					.catch(err => {
						this.$toast({
							messgae: '二维码生成失败,请重新进入页面'
						})
					})
			},
			// 显示海报框
			showPostersBox(postersBg) {
				console.log(postersBg)
				let qrCode = this.qrCode;//二维码
				let base64 = '';
				let canvas = document.getElementById('myCanvas');
				let ctx = canvas.getContext('2d');
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
						file: postersBg,
						size: [0, 0, bgWidth, bgHeight]
					},
					{
						file: qrCode,
						size: [qrLeft, qrTop, qrWidth, qrHeight]
					}
				];
				// 开始绘制
				let drawing = (index) => {
					//判断当前索引=》是否已经绘制成功
					if (index < list.length) {
						console.log(index + 1)
						let img = new Image();
						// let timeStamp = new Date().getTime(); //时间戳
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
						base64 = canvas.toDataURL('image/jpeg');
						if (base64) {
							console.log(base64)
							// 赋值到相应的海报上
							this.$set(this, 'poster', base64)
						}
					}
				}
				drawing(0)
				// this.postersBox = true;
			}
		},
	};
</script>

<style scoped="scoped" lang="less">
	.container {
		margin-top: 88px;

		.switch-bar {
			width: 750px;
			height: 100px;
			background: #34332f;
			font-size: 28px;
			font-weight: bold;

			.left {
				width: 220px;
				height: 65px;
				background: #fff;
				line-height: 70px;
				border: 2px solid #ffffff;
				border-top-left-radius: 12px;
				border-bottom-left-radius: 12px;
				color: #866e39;
			}

			.right {
				width: 220px;
				height: 65px;
				background: #34332f;
				line-height: 70px;
				border: 2px solid #ffffff;
				border-top-right-radius: 12px;
				border-bottom-right-radius: 12px;
				color: #ffffff;
			}
		}

		.posters-list {
			margin-top: 30px;
			padding-bottom: 30px;
			width: 690px;
			// height: 1000px;
			background: #fff;
			border-radius: 10px;
			flex-wrap: wrap;
			justify-content: flex-start;
			align-items: flex-start;

			.posters-li {
				// width: 200px;
				// height: 360px;
				// background: pink;
				margin-top: 30px;
				margin-left: 15px;
				margin-right: 15px;

				.img-box {
					width: 200px;
					height: 360px;
					position: relative;

					img {
						width: 100%;
						height: 100%;
					}

					.erCode {
						width: 50px;
						height: 50px;
						background: #fff;
						position: absolute;
						top: 270px;
						// 二维码位置高度75%
						left: 16px;
						// 二维码左边距离8%
					}
				}

				.title {
					font-size: 28px;
					height: 60px;
					line-height: 60px;
				}
			}
		}
	}

	.postersBox {
		width: 500px;
		border-radius: 0;

		img {
			width: 500px;
			height: 900px;
		}
	}
</style>
