<template>
	<div>
		<!-- 文章列表 -->
		<div class="article-list flx-cas">
			<div class="article-li flx-ras" v-for="(item,index) in articleList" :key='index'>
				<div class="user-name">
					<van-image lazy-load :src='item.userImg' />
				</div>
				<div class="article-content flx-cas">
					<div class="name bold">{{item.name}}</div>
					<div class="share-btn flx-r">
						<img src="../../../assets/img/posters/shareBtn.png">
						<span>分享</span>
					</div>
					<div class="content">{{item.content}}</div>
					<button class="copy-btn" @click="copyText(item.content,index)" :data-clipboard-text='item.content' ref='copyBtn'>[复制文本]</button>
					<van-image class="article-img" :src="item.contentImg" fit="cover" @click='showPreviewBox(item.contentImg)'></van-image>
				</div>
			</div>
		</div>
		<!-- 预览的图片 -->
		<!-- 		<div class="preview-box">
			<van-overlay :show="previewBox" @click="articleImgBox = false" />
			<div class="preview-img">
				<img :src="previewImg">
			</div>
		</div> -->
		<div class="preview-box" v-if="previewBox">
			<van-image-preview v-model="previewBox" :images="previewImg" :showIndex='false'>
				<!-- <template v-slot:index>第1页</template> -->
			</van-image-preview>
			<div class="bottom flx-r">
				<!-- <button class="share-poster">分享海报</button> -->
				<button class="save-poster" @click="savePreviewImg">保存本地</button>
			</div>
		</div>
	</div>
</template>
<script>
	import tool from '../../../../public/tool/tool.js';
	export default {
		props:['platFlag'],
		data() {
			return {
				articleList: [{
						name: '王金盛',
						userImg: require('../../../assets/img/posters/friendcCircle.png'), //头像图片
						contentImg: require('../../../assets/img/ceshi2.jpg'), //发圈图片
						content: '如果你看懂这个趋势，就不要磨叽了。加入金融师是你最好的选择。', //发圈内容
					},
					{
						name: '王金盛',
						userImg: require('../../../assets/img/posters/friendcCircle.png'), //头像图片
						contentImg: require('../../../assets/img/ceshi1.jpg'), //发圈图片
						content: '如果你看懂这个趋势，就不要磨叽了。加入金融师是你最好的选择。', //发圈内容
					},
					{
						name: '王金盛',
						userImg: require('../../../assets/img/posters/friendcCircle.png'), //头像图片
						contentImg: require('../../../assets/img/ceshi1.jpg'), //发圈图片
						content: '如果你看懂这个趋势，就不要磨叽了。加入金融师是你最好的选择。', //发圈内容
					},
					{
						name: '王金盛',
						userImg: require('../../../assets/img/posters/friendcCircle.png'), //头像图片
						contentImg: require('../../../assets/img/ceshi1.jpg'), //发圈图片
						content: '如果你看懂这个趋势，就不要磨叽了。加入金融师是你最好的选择。', //发圈内容
					},
					{
						name: '王金盛',
						userImg: require('../../../assets/img/posters/friendcCircle.png'), //头像图片
						contentImg: require('../../../assets/img/ceshi1.jpg'), //发圈图片
						content: '如果你看懂这个趋势，就不要磨叽了。加入金融师是你最好的选择。', //发圈内容
					},
					{
						name: '王金盛',
						userImg: require('../../../assets/img/posters/friendcCircle.png'), //头像图片
						contentImg: require('../../../assets/img/ceshi1.jpg'), //发圈图片
						content: '如果你看懂这个趋势，就不要磨叽了。加入金融师是你最好的选择。', //发圈内容
					},
					{
						name: '王金盛',
						userImg: require('../../../assets/img/posters/friendcCircle.png'), //头像图片
						contentImg: require('../../../assets/img/ceshi1.jpg'), //发圈图片
						content: '如果你看懂这个趋势，就不要磨叽了。加入金融师是你最好的选择。', //发圈内容
					},
					{
						name: '王金盛',
						userImg: require('../../../assets/img/posters/friendcCircle.png'), //头像图片
						contentImg: require('../../../assets/img/ceshi1.jpg'), //发圈图片
						content: '如果你看懂这个趋势，就不要磨叽了。加入金融师是你最好的选择。', //发圈内容
					},
					{
						name: '王金盛',
						userImg: require('../../../assets/img/posters/friendcCircle.png'), //头像图片
						contentImg: require('../../../assets/img/ceshi1.jpg'), //发圈图片
						content: '如果你看懂这个趋势，就不要磨叽了。加入金融师是你最好的选择。', //发圈内容
					},
					{
						name: '王金盛',
						userImg: require('../../../assets/img/posters/friendcCircle.png'), //头像图片
						contentImg: require('../../../assets/img/ceshi1.jpg'), //发圈图片
						content: '如果你看懂这个趋势，就不要磨叽了。加入金融师是你最好的选择。', //发圈内容
					},
					{
						name: '王金盛',
						userImg: require('../../../assets/img/posters/friendcCircle.png'), //头像图片
						contentImg: require('../../../assets/img/ceshi1.jpg'), //发圈图片
						content: '如果你看懂这个趋势，就不要磨叽了。加入金融师是你最好的选择。', //发圈内容
					},
					{
						name: '王金盛',
						userImg: require('../../../assets/img/posters/friendcCircle.png'), //头像图片
						contentImg: require('../../../assets/img/ceshi1.jpg'), //发圈图片
						content: '如果你看懂这个趋势，就不要磨叽了。加入金融师是你最好的选择。', //发圈内容
					},
					{
						name: '王金盛',
						userImg: require('../../../assets/img/posters/friendcCircle.png'), //头像图片
						contentImg: require('../../../assets/img/ceshi1.jpg'), //发圈图片
						content: '如果你看懂这个趋势，就不要磨叽了。加入金融师是你最好的选择。', //发圈内容
					},
				],
				previewBox: false, //预览图片的盒子
				previewImg: [], //要预览的图片
				images: [require('../../../assets/img/ceshi1.jpg')],

			};
		},
		methods: {
			// 展示图片要预览的图片
			showPreviewBox(img) {
				tool.toastLoading()
				let arr = [img]
				let image = new Image();
				image.src = arr[0];
				image.setAttribute('crossOrigin', 'anonymous');//防止跨域
				image.onload = () => {
					let base64 = this.getBase64Image(image)
					this.previewImg = [base64];
					this.previewBox = true;
					this.$toast.clear()
				}
				// this.previewBox = true;
			},
			// 复制文字
			copyText(text, index) {
				
			},
			// 保存预览的照片
			savePreviewImg(){
				let init = {};
				init.poster = this.previewImg[0];
				console.log(init)
				if(this.platFlag == 0){
					// 调用安卓保存海报的方法
					window.android.saveToLocal(JSON.stringify(init));
					this.previewBox = false;
				}else{
					// 调用ios保存本地的方法
					window.webkit.messageHandlers.saveToLocal.postMessage(init);
					this.previewBox = false;
				}
			},
			// 图片转canvas
			getBase64Image(img) {
				let canvas = document.createElement("canvas");
				canvas.width = img.width;
				canvas.height = img.height;
				let ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0, img.width, img.height);
				// let ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
				// let dataURL = canvas.toDataURL("image/" + ext);
				let dataURL = canvas.toDataURL("image/jpeg");
				return dataURL;
			}
		}
	};
</script>
<style lang="less">
	.preview-box {
		.van-image-preview__image {
			max-width: 100%;
			max-height: 70%;
			// margin: 30px auto 0;
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
	}
</style>
<style scoped="scoped" lang="less">
	.article-list {
		width: 750px;
		background:#fff;
		.article-li {
			border-bottom: 10px solid #f2f2f2;
			// background:#fff;
			.user-name {
				width: 100px;
				height: 100px;
				// background: pink;

				img {
					width: 100px;
					height: 100px;
				}
			}

			.article-content {
				position: relative;
				width: 650px;
				// height: 500px;
				align-items: flex-start;
				box-sizing: border-box;
				padding: 10px;
				.share-btn{
					position: absolute;
					font-size: 22px;
					width: 130px;
					height: 46px;
					line-height: 46px;
					border: 1px solid #dfdfdf;
					border-radius: 30px;
					background: #f6f6f6;
					top: 10px;
					right: 15px;
					img{
						width: 40px;
						height: 40px;
					}
				}
				// background: skyblue;
				.name {
					font-size: 30px;
					color: #747f9b;
				}

				.content {
					font-size: 28px;
					color: #333;
					text-align: left;
					padding-top: 15px;
				}

				.copy-btn {
					font-size: 28px;
					color: #5194da;
					margin: 20px 0;
				}

				.article-img {
					width: 100%;
					height: 400px;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}

	// 预览的图片
	// .preview-box {
	// 	.preview-img {
	// 		position: fixed;
	// 	}
	// }
	// .aaa{
	// 	.van-image-preview__image{
	// 		max-width: 90%!important;
	// 		max-height: 80%!important;
	// 	}
	// }
</style>
