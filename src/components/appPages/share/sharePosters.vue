<template>
	<div>
		<!-- 顶部标题栏 -->
		<div class="title-bar flx-r">
			<top-title :titleName="titleName" :pageType='pageType'></top-title>
		</div>
		<div class="posters-list flx-cas">
			<div class="posters-li">
				<div class="top flx-rs">
					<div class="title">8月14日推荐</div>
					<div class="share-btn" @click="share">分享</div>
				</div>
				<div class="content">拥抱梦想，杨帆起航</div>
				<div class="image">
					<img class="erCode-img" :src="erCode">
				</div>
			</div>
		</div>
		<!-- <div id="qrCode"> -->
			<!-- <canvas id="qrCodeCanvas" style="width:375px;height: 812px;"></canvas> -->
			<canvas id="myCanvas" :style="{width:width+'px',height:height+'px'}"></canvas>
			<img :src="img" id="bgImg" :style="{width:width+'px',height:height+'px'}">
		<!-- </div> -->
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
			pageType: 'app', //上个页面是什么h5还是app?
			erCode:'',//二维码
			width:'',//屏幕宽度
			height:'',//屏幕高度
			img:require('../../../assets/img/erCode1.jpg')
		};
	},
	created(){
		let width = document.body.scrollWidth;
		let height = (width/3)*4
		this.width = width;
		this.height = height;
	},
	mounted() {
		this.userQrcode()
	},
	methods:{
		// 生成二维码
		userQrcode(){
			// let qrCodeCanvas = document.getElementById('qrCodeCanvas');
			// QRCode.toCanvas(
			// 	qrCodeCanvas,
			// 	"https://www.baidu.com",
			// 	(error)=>{
			// 		if (error) console.log(error);
			// 		console.log("QRCode success!");
			// 	}
			// )
			// 'https://www.kfmanager.com/producth5/index.html#/shareRegister?agentId=1908141437&recommendMobile=13610144601'
			QRCode.toDataURL('https://www.kfmanager.com/producth5/index.html#/shareRegister?agentId=1908141437&recommendMobile=13610144601')
			.then(url=>{
				console.log(url)
				this.erCode = url;
			})
			.catch(err=>{
				console.log(err)
			})
		},
		// 分享
		share(){
			let bgImg = document.getElementById('bgImg')
			const canvas = document.getElementById('myCanvas');
			const ctx = canvas.getContext('2d');
			// ctx.fillStyle="#FF0000";
			// ctx.fillRect(0,0,150,75);
			// ctx.drawImage('../../../assets/img/erCode1.jpg',0,0,this.width,this.height);
			console.log(this.erCode)
			ctx.drawImage(bgImg,0,0,375,500);
			// bgImg.onload = function(){
			// 	ctx.drawImage(bgImg,0,0,this.width,this.height)
			// }
		}
	}
};
</script>
<style scoped="scoped" lang="less">
	#myCanvas{
		// background: pink;
	}
	.posters-list{
		width: 100%;
		margin-top: 88px;
		.posters-li{
			width: 710px;
			height: 800px;
			box-sizing: border-box;
			padding: 20px 0;
			font-size: 30px;
			border-bottom:20px solid #fafafa;
			.top{
				justify-content: space-between;
				.title{
					border-left: 10px solid #09bd07;
					padding-left: 10px;
				}
				.share-btn{
					width: 120px;
					height: 50px;
					background: #f3f4f4;
					border-radius: 40px;
					border: 2px solid #e3e3e3;
					line-height: 50px;
					font-size: 24px;
				}
			}
			.content{
				text-align: left;
				color: #9d9d9d;
				padding-top: 5px;
			}
			.image{
				margin-top: 5px;
				width: 480px;
				height: 640px;
				background: url('../../../assets/img/erCode1.jpg') no-repeat center center;
				background-size: 100% 100%;
				position: relative;
			}
			.erCode-img{
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