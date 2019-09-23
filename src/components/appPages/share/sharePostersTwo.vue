<template>
	<div style="width: 100%;">
		<!-- 顶部标题栏 -->
		<div class="title-bar flx-r">
			<top-title :titleName="titleName" :pageType='pageType' :returnBtn='returnBtn'></top-title>
		</div>
		<div class="container flx-cas">
			<div class="switch-bar flx-r">
				<div :class="bar?'left':'left2'" @click="switchBar('left')">
					推广海报
				</div>
				<div :class="bar?'right':'right2'" @click="switchBar('right')">
					发圈素材
				</div>
			</div>
			<div class="posters-list flx-rs" v-show="bar">
				<!-- <div class="posters-li" v-for="(item,index) in postersList" :key='index' @click="showPostersBox(item.img,index)"> -->
				<div class="posters-li" v-for="(item,index) in postersList" :key='index'>
					<div class="img-box">
						<!-- <van-image :src="item.img" class="posters-img" @click="showPostersBox(item.img,index)"/> -->
						<van-image :src="item.img" class="posters-img" @click="isImgDownLoadFinish(item.img,index)"/>
					</div>
					<div class="title">海报{{index+1}}</div>
				</div>
			</div>
			<div class="friends-list" v-show="!bar">
				<share-posters :platFlag='platFlag'></share-posters>
			</div>
		</div>
		<!-- 生成海报图 -->
		<div class="posters-box" v-if="postersBox">
			<van-overlay :show="postersBox" @click='closePostersBox' />
			<div class="mask" v-if="postersBox">
				<img :src="poster">
			</div>
			<img src="../../../assets/img/posters/left.png" class="left" @click="switchImg('left')">
			<img src="../../../assets/img/posters/right.png" class="right" @click="switchImg('right')">
			<div class="bottom flx-r">
				<button class="share-poster" @click="shareMethodBox = true">分享海报</button>
				<button class="save-poster" @click="savePoster">保存本地</button>
			</div>
		</div>
		<!-- 分享选择框 -->
		<van-dialog class="share-method-box" v-model="shareMethodBox" title="使用以下方式打开" :show-confirm-button='false'
		 show-cancel-button>
			<div class="method-box flx-r">
				<img src="../../../assets/img/posters/friendcCircle.png" @click="sharePoster('friendcCircle')">
				<img src="../../../assets/img/posters/WeChat.png" @click="sharePoster('WeChat')">
			</div>
		</van-dialog>
		<canvas id="myCanvas"></canvas>
	</div>
</template>
<script>
	import topTitle from '@/components/common/topTitle.vue';
	import sharePosters from '@/components/appPages/share/sharePosters.vue'
	import switchServer from '../../../../public/tool/switchServer.js';
	import tool from '../../../../public/tool/tool.js';
	import QRCode from "qrcode";
	export default {
		components: {
			topTitle,
			sharePosters
		},
		data() {
			return {
				titleName: '分享海报',
				pageType: 'app', //上个页面是什么h5还是app?
				platFlag: '', //手机类型 0为安卓 1为ios
				returnBtn: false, //页面是否带有返回按钮
				postersList: [{
						img: require('../../../assets/img/posters/posters13.jpg')
					},
					{
						img: require('../../../assets/img/posters/posters1.jpg')
					},
					{
						img: require('../../../assets/img/posters/posters2.jpg')
					},
					{
						img: require('../../../assets/img/posters/posters3.jpg')
					},
					{
						img: require('../../../assets/img/posters/posters4.jpg')
					},
					{
						img: require('../../../assets/img/posters/posters5.jpg')
					},
					{
						img: require('../../../assets/img/posters/posters6.jpg')
					},
					{
						img: require('../../../assets/img/posters/posters7.jpg')
					},
					{
						img: require('../../../assets/img/posters/posters8.jpg')
					},
					{
						img: require('../../../assets/img/posters/posters9.jpg')
					},
					{
						img: require('../../../assets/img/posters/posters10.jpg')
					},
					{
						img: require('../../../assets/img/posters/posters11.jpg')
					},
					{
						img: require('../../../assets/img/posters/posters12.jpg')
					},
				],
				poster: '', //合成出来的图片
				screenWidth: '', //屏幕宽度
				qrCode: '', //二维码
				postersBox: false,
				qrCodeSize: { //二维码与海报对应比例=》用于设置二维码在海报中的位置
					width: 125 / 500,
					height: 125 / 900,
					left: 190 / 900,
					top: 500 / 900,
				},
				currentImgIndex: '', //当前选择的图片序号
				canvasImgList: [], //存储已经生成了的二维码图片
				shareMethodBox: false, //选择分享方式的盒子
				bar: true,
			};
		},
		beforeCreate() {
			document.querySelector('body').setAttribute('style', 'background-color:#f2f2f2')
		},
		created() {
			// this.getQrCode('1908141437', '88888888');
			let platFlag = tool.testPlat();
			this.platFlag = platFlag; //获取平台类型 0为安卓 1为ios;
			if (platFlag == 1) this.returnBtn = true;
			let me = this;
			window['setPostersData'] = (url) => {
				me.setPostersData(url)
			}
		},
		methods: {
			// 切换海报页面
			switchBar(type) {
				// this.$toast('功能正在开发中，敬请期待')
				// return;
				if (type == 'left') {
					this.bar = true;
				} else {
					this.bar = false;
				}
				window.scrollTo(0, 0);
			},
			// 获取app传递过来的数据
			setPostersData(e) {
				let appData = JSON.parse(e);
				let sessionId = appData.sessionId;
				switchServer.setCookie(sessionId);
				this.getQrCode(appData.agentId, appData.recommendMobile);
			},
			// 生成二维码图片
			getQrCode(agentId, recommendMobile) {
				let UrlAddress =
					`https://www.kfmanager.com/producth5/index.html#/shareRegister?agentId=${agentId}&recommendMobile=${recommendMobile}`;
				QRCode.toDataURL(UrlAddress)
					.then(url => {
						this.qrCode = url;
					})
					.catch(err => {
						this.$toast({
							messgae: '二维码生成失败,请重新进入页面'
						})
					})
			},
			isImgDownLoadFinish(postersBg,currentImgIndex){
				let image = new Image();
				image.src = postersBg;
				let timer = setTimeout(()=>{
					this.$toast.clear()
					// console.log('执行了')
					// this.$toast({
					// 	message:'加载超时了，图片加载失败，请稍后再试',
					// 	forbidClick:true
					// })
				},8000)
				this.$toast({
					type:'loading',
					message:'加载中...',
					duration:0,
					forbidClick:true
				})
				// 判断图片是否加载完成,加载完成执行生成二维码图片函数
				image.onload = ()=>{
					this.showPostersBox(postersBg,currentImgIndex)
					// 如果图片加载完成的话,清除定时器
					clearInterval(timer)
				}
			},
			// 显示海报框
			showPostersBox(postersBg, currentImgIndex) {
				// return;
				this.poster = postersBg;
				document.querySelector('body').setAttribute('style', 'overflow:hidden')
				let img = new Image();
				img.src = postersBg;
				let qrCode = this.qrCode; //二维码
				let base64 = '';
				let canvas = document.getElementById('myCanvas');
				let ctx = canvas.getContext('2d');
				let bgWidth = 500; //图片宽度
				let bgHeight = 900; //图片高度
				let qrWidth = this.qrCodeSize.width * bgWidth; // 二维码宽 = 比例 * 宽度
				let qrHeight = this.qrCodeSize.height * bgHeight; // 二维码高 = 比例 * 高度 
				// let qrLeft = bgWidth / 2 - qrWidth / 2 //二维码距离左侧位置
				// let qrTop = bgHeight / 2 - qrHeight / 2 //二维码距离顶部的位置
				let qrLeft = bgWidth * 0.08 //二维码距离左侧位置
				let qrTop = bgHeight * 0.75 //二维码距离顶部的位置
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
						let img = new Image();
						// 防止跨域
						img.setAttribute('crossOrigin', 'anonymous');
						// 给图片链接加上时间戳
						img.src = list[index].file;
						img.onload = () => {
							ctx.drawImage(img, ...list[index].size);
							// 递归list
							drawing(index + 1)
						}
						img.onerror = ()=>{
							this.$toast({
								message:'选择的图片加载失败，请重试',
								forbidClick:true
							})
						}
					} else {
						base64 = canvas.toDataURL('image/jpeg');
						if (base64) {
							// console.log(base64)
							// 赋值到相应的海报上
							this.$set(this, 'poster', base64)
							// let init = {};
							// init.img = base64
							// this.canvasImgList.push(init)
							this.postersBox = true;
							this.currentImgIndex = currentImgIndex;
							this.$toast.clear();
						}
					}
				}
				drawing(0)
			},
			// 切换图片
			switchImg(type) {
				let postersList = this.postersList;
				let currentImgIndex = this.currentImgIndex;
				if (type == 'left' && currentImgIndex - 1 >= 0) {
					// console.log('执行左边了')
					// this.showPostersBox(postersList[currentImgIndex - 1].img, currentImgIndex - 1)
					this.isImgDownLoadFinish(postersList[currentImgIndex - 1].img, currentImgIndex - 1)
				} else if (type == 'right' && currentImgIndex + 1 < postersList.length) {
					// console.log('执行右边了')
					// this.showPostersBox(postersList[currentImgIndex + 1].img, currentImgIndex + 1)
					this.isImgDownLoadFinish(postersList[currentImgIndex + 1].img, currentImgIndex + 1)
				}
			},
			// 分享海报
			sharePoster(type) {
				// this.shareMethodBox = true;
				let init = {};
				init.poster = this.poster;
				init.type = type;
				if (this.platFlag == 0) {
					// 调用安卓分享海报的方法
					window.android.shareAction(JSON.stringify(init));
					this.shareMethodBox = false;
					this.postersBox = false;
				} else {
					// 调用ios分享海报的方法
					window.webkit.messageHandlers.shareAction.postMessage(init);
					this.shareMethodBox = false;
					this.postersBox = false;
				}
			},
			// 保存本地
			savePoster() {
				let init = {};
				init.poster = this.poster;
				// init.poster = require('../../../assets/img/posters/friendcCircle.png');
				// console.log(JSON.stringify(init))
				if (this.platFlag == 0) {
					// 调用安卓保存海报的方法
					window.android.saveToLocal(JSON.stringify(init));
					this.shareMethodBox = false;
					this.postersBox = false;
				} else {
					// 调用ios保存本地的方法
					window.webkit.messageHandlers.saveToLocal.postMessage(init);
					this.shareMethodBox = false;
					this.postersBox = false;
				}
			},
			// 关闭海报框
			closePostersBox() {
				if (this.shareMethodBox) return;
				document.querySelector('body').setAttribute('style', 'background-color:#f2f2f2')
				this.postersBox = false;
			},
			// 下载图片
			// downLoad() {
			// 	if (this.poster) {
			// 		let a = document.createElement('a');
			// 		a.setAttribute("download", "海报下载-" + (new Date().getTime()));
			// 		a.href = this.poster;
			// 		a.click()
			// 	} else {
			// 		console.log('海报不存在请重新生成')
			// 	}
			// },
		},
	};
</script>
<style>
	.van-toast {
		z-index: 9999 !important;
	}
</style>
<style scoped="scoped" lang="less">
	.container {
		// margin-top: 88px;
		width: 100%;
		background: #f2f2f2;

		.switch-bar {
			position: fixed;
			top: 88px;
			left: 0;
			z-index: 1500;
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

			.left2 {
				width: 220px;
				height: 65px;
				background: #34332f;
				line-height: 70px;
				border: 2px solid #ffffff;
				border-top-left-radius: 12px;
				border-bottom-left-radius: 12px;
				color: #ffffff;
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

			.right2 {
				width: 220px;
				height: 65px;
				background: #fff;
				line-height: 70px;
				border: 2px solid #ffffff;
				border-top-right-radius: 12px;
				border-bottom-right-radius: 12px;
				color: #866e39;
			}
		}

		.posters-list {
			margin-top: 218px;
			// padding-bottom: 30px;
			margin-bottom: 30px;
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

					.posters-img {
						width: 200px;
						height: 360px;

						img {
							width: 100%;
							height: 100%;
							position: relative;
						}

						.van-image__img::before {
							content: 'dddddd';
							width: 50px;
							height: 50px;
							background: #fff;
							position: absolute;
							top: 270px;
							left: 16px;
						}
					}

					.posters-img:before {
						content: '';
						width: 50px;
						height: 50px;
						background: #fff;
						position: absolute;
						top: 270px;
						left: 16px;
					}

					// .erCode {
					// 	width: 50px;
					// 	height: 50px;
					// 	background: #fff;
					// 	position: absolute;
					// 	top: 270px;
					// 	// 二维码位置高度75%
					// 	left: 16px;
					// 	// 二维码左边距离8%
					// }
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
		height: 900px;
		border-radius: 0;

		img {
			width: 500px;
			height: 900px;
		}
	}

	.posters-box {
		.mask {
			position: fixed;
			width: 500px;
			height: 900px;
			top: 50%;
			margin-top: -450px;
			margin-left: -250px;
			left: 50%;
			z-index: 3000;

			img {
				width: 500px;
				height: 900px;
			}
		}

		.left {
			position: fixed;
			top: 50%;
			left: 10px;
			z-index: 3000;
			width: 100px;
			height: 100px;
		}

		.right {
			position: fixed;
			top: 50%;
			right: 10px;
			z-index: 3000;
			width: 100px;
			height: 100px;
		}

		.bottom {
			width: 690px;
			height: 100px;
			// background: #fff;
			position: fixed;
			font-size: 26px;
			bottom: 10%;
			margin-bottom: -40px;
			left: 50%;
			margin-left: -345px;
			z-index: 3000;
			justify-content: space-around;

			.share-poster {
				width: 250px;
				height: 75px;
				border: 2px solid #fff;
				border-radius: 20px;
				// background: #a1a1a1;
				// background: #4dab3d;
				background: linear-gradient(90deg, rgba(110, 191, 255, 1), rgba(26, 130, 255, 1));
				color: #fff;
			}

			.save-poster {
				width: 250px;
				height: 75px;
				border: 2px solid #fff;
				border-radius: 20px;
				// background: #a1a1a1;
				// background: #ec1c2c;
				background: linear-gradient(90deg, rgba(110, 191, 255, 1), rgba(26, 130, 255, 1));
				color: #fff;
			}
		}

		.van-overlay {
			z-index: 3000 !important;
		}
	}

	.share-method-box {
		z-index: 9999 !important;

		.method-box {
			width: 100%;
			box-sizing: border-box;
			// padding-left: 100px;
			// padding-top: 30px;
			padding: 30px 100px 30px 100px;
			justify-content: space-around;

			img {
				width: 64px;
				height: 64px;
			}
		}
	}

	#myCanvas {
		position: absolute;
		left: -9999px;
		top: -9999px;
	}

	// 朋友圈
	.friends-list {
		width: 100%;
		margin-top: 190px;
	}
</style>
