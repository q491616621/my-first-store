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
					<div class="content">{{item.content}}</div>
					<button class="copy-btn" @click="copyText(item.content,index)" :data-clipboard-text='item.content' ref='copy-btn'>[复制文本]</button>
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
				<button class="share-poster">分享海报</button>
				<button class="save-poster">保存本地</button>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
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
				],
				previewBox: false, //预览图片的盒子
				previewImg: [], //要预览的图片
				images:[require('../../../assets/img/ceshi1.jpg')]
			};
		},
		created() {
			
		},
		methods: {
			// 展示图片要预览的图片
			showPreviewBox(img) {
				let arr = [img]
				this.previewImg = arr;
				this.previewBox = true;
			},
			copyText(text,index){
				
				console.log(text)
			}
		}
	};
</script>
<style lang="less">
	.preview-box{
		.van-image-preview__image{
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

		.article-li {
			border-bottom: 10px solid #000000;

			.user-name {
				width: 100px;
				height: 100px;
				background: pink;

				img {
					width: 100px;
					height: 100px;
				}
			}

			.article-content {
				width: 650px;
				// height: 500px;
				align-items: flex-start;
				box-sizing: border-box;
				padding: 10px;

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
