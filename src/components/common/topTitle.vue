<template>
	<div class="flx-r top-title">
		<button class="return-btn flx-r" @click="returnBack" v-if="returnBtn">
			<img src="../../assets/img/return.png" alt="返回按钮">
		</button>
		<div class="title-name">{{titleName}}</div>
	</div>
</template>
<script>
	import tool from '../../../public/tool/tool.js'
	export default {
		props: {
			titleName: {
				type: String,
				default: '斑马APP'
			},
			pageType: { //上个页面的类型
				type: String,
				default: 'h5'
			},
			returnBtn: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				platFlag: null, //平台类型0为安卓，1为ios，2为PC
			};
		},
		created() {
			// 检查平台 0为安卓，1为ios，2为PC
			let platFlag = tool.testPlat();
			this.platFlag = platFlag;
		},
		methods: {
			// 返回上一页的函数
			returnBack() {
				let pageType = this.pageType; //获取上个页面的类型
				// 上个页面是H5的话,直接调用自己的方法,返回上个页面
				if (pageType == 'h5') {
					// 判断h5
					if (this.$route.name == 'bindChannel') {
						this.$router.push('cardManagement')
						return;
					}
					this.$router.go(-1)
				} else {
					// 判断当前页面是否是sharePostersTwo页面,是的话安卓调用返回首页的方法,苹果还是调用返回的方法
					if(this.$route.name == 'sharePostersTwo'){
						if(this.platFlag == 1){
							let aaa = '奥利奥，泡一泡';
							// closeWeb ios定义的退回上一页，删除H5页面的方法
							window.webkit.messageHandlers.closeWeb.postMessage(aaa);
						}else{
							console.log('吃饭睡觉打豆豆')
						}
						return;
					}
					if (this.platFlag == 1) {
						let aaa = '奥利奥，泡一泡';
						// closeWeb ios定义的退回上一页，删除H5页面的方法
						window.webkit.messageHandlers.closeWeb.postMessage(aaa);
					} else {
						// btnBack 安卓定义的退回上一页,删除H5页面的方法
						window.android.btnBack()
					}
				}
			}
		},
	};
</script>
<style scoped="scoped" lang="less">
	.top-title {
		width: 100%;
		height: 88px;
		box-sizing: border-box;
		border-bottom: 1px solid #EDEDED;
		position: relative;
		background: #fff;

		.return-btn {
			position: absolute;
			top: 0px;
			left: 0px;
			// width: 100px;
			height: 100%;

			img {
				padding: 0px 30px;
				width: 18px;
				height: 32px;
			}
		}

		.title-name {
			font-size: 36px;
			color: #212121;
			font-weight: bold;
			line-height: 64px;
		}
	}
</style>
