<template>
	<div style="width:100%">
		<!-- 文章列表 -->
		<div class="article-list flx-cas">
			<div class="article-li flx-ras" v-for="(item,index) in articleList" :key='index'>
				<div class="user-name">
					<van-image lazy-load :src='item.userImg' round />
				</div>
				<div class="article-content flx-cas">
					<div class="name bold">{{item.name}}</div>
					<div class="share-btn flx-r" @click="createImg(item.contentImg)">
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
		<!-- 分享选择框 -->
		<van-dialog class="share-method-box" v-model="shareArticleImgBox" title="使用以下方式打开" :show-confirm-button='false'
		 show-cancel-button>
			<div class="method-box flx-r">
				<img src="../../../assets/img/posters/friendcCircle.png" @click="shareArticleImg('friendcCircle')">
				<img src="../../../assets/img/posters/WeChat.png" @click="shareArticleImg('WeChat')">
			</div>
		</van-dialog>
	</div>
</template>
<script>
	import tool from '../../../../public/tool/tool.js';
	export default {
		props: ['platFlag'],
		data() {
			return {
				articleList: [{
						name: '努力靠自己',
						userImg: require('../../../assets/img/posters/head1.jpg'), //头像图片
						contentImg: require('../../../assets/img/posters/articleImg1.png'), //发圈图片
						content: '很多朋友问我，为什么要推广安安卡管家？其实是因为自己使用信用卡多年，知道当今社会 是靠信用值生存的年代，多少人因为还不上信用卡而进入黑名单 ？我希望所有的好朋友，从接触安安卡管家的这一刻开始，除了能够减轻还款压力、养卡、提额的同时，还能让自己的资金周转更灵活，学会让钱赚钱!', //发圈内容
					},
					{
						name: '陈秋坪',
						userImg: require('../../../assets/img/posters/head2.jpg'), //头像图片
						contentImg: require('../../../assets/img/posters/articleImg2.jpg'), //发圈图片
						content: '安安卡管家现已成功与多家国有或股份制商业银行、多家国内保险机构中国百强金融服务机构达成战略合作，并已取得了良好的合作口碑，在广大代理商伙伴的努力下，推广成缋良好 ,营收稳步增长，代理商收益丰厚，平台发展势头喜人。 后续我们将陆续和国内顶级银行、金融服务机构达成合作 ,全方位多角度为合作伙伴提供更优质的资源及更专业的服务。', //发圈内容
					},
					{
						name: '李本群',
						userImg: require('../../../assets/img/posters/head4.jpg'), //头像图片
						contentImg: require('../../../assets/img/posters/articleImg3.jpg'), //发圈图片
						content: '如果你看懂这个趋势，就不要在磨叽了。加入安安卡管家是你最好的选择。', //发圈内容
					},
				],
				previewBox: false, //预览图片的盒子
				previewImg: [], //要预览的图片
				shareImg: '', //要分享的图片
				shareArticleImgBox: false, //要分享的
				images: [require('../../../assets/img/ceshi1.jpg')],

			};
		},
		methods: {
			// 展示图片要预览的图片
			showPreviewBox(img) {
				tool.toastLoading();
				let arr = [img];
				let image = new Image();
				image.src = arr[0];
				image.setAttribute('crossOrigin', 'anonymous'); //防止跨域
				image.onload = () => {
					let base64 = this.getBase64Image(image)
					this.previewImg = [base64];
					this.previewBox = true;
					this.$toast.clear();
				}
				// this.previewBox = true;
			},
			// 复制文字
			copyText(text) {
				// 判断用户手机类型,根据不同手机类型调用不同的复制文字方法
				let init = {};
				init.text = text;
				if(this.platFlag == 0){
					// 调用安卓复制文字
					window.android.copyToPasbord(JSON.stringify(init));
				}else{
					// 调用ios复制文字的方法
					window.webkit.messageHandlers.copyToPasbord.postMessage(init);
				}
			},
			// 保存预览的照片
			savePreviewImg() {
				let init = {};
				init.poster = this.previewImg[0];
				if (this.platFlag == 0) {
					// 调用安卓保存海报的方法
					window.android.saveToLocal(JSON.stringify(init));
					this.previewBox = false;
				} else {
					// 调用ios保存本地的方法
					window.webkit.messageHandlers.saveToLocal.postMessage(init);
					this.previewBox = false;
				}
			},
			// 生成要分享的图片的图片
			createImg(img) {
				tool.toastLoading();
				let image = new Image();
				image.src = img;
				image.setAttribute('crossOrigin', 'anonymous'); //防止跨域
				image.onload = () => {
					let base64 = this.getBase64Image(image)
					this.shareImg = base64;
					this.$toast.clear();
					this.shareArticleImgBox = true;
				}
			},
			// 分享文章图片
			shareArticleImg(type) {
				let init = {};
				init.poster = this.shareImg;
				init.type = type;
				// 根据不同手机类型,调用不同类型的分享方法
				if (this.platFlag == 0) {
					// 调用安卓分享海报的方法
					window.android.shareAction(JSON.stringify(init));
					this.shareArticleImgBox = false;
				} else {
					// 调用ios分享海报的方法
					window.webkit.messageHandlers.shareAction.postMessage(init);
					this.shareArticleImgBox = false;
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
		// width: 750px;
		width: 100%;
		background: #fff;

		.article-li {
			width: 100%;
			border-bottom: 10px solid #f2f2f2;
			
			// background:#fff;
			// .aaa{
			// 	padding: 10px;
			// }
			.user-name {
				width: 90px;
				height: 90px;
				padding: 10px 0 10px 10px;

				// background: pink;
				// img {
				// 	width: 100px;
				// 	height: 100px;
				// }
			}

			.article-content {
				position: relative;
				width: 600px;
				// height: 500px;
				align-items: flex-start;
				box-sizing: border-box;
				padding: 10px;

				.share-btn {
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

					img {
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

	// 选择分享方式的盒子
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
