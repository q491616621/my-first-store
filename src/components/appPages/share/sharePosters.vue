<template>
	<div>
		<div class="article-list flx-cas">
			<div class="article-li flx-ras">
				<div class="user-name">
					<van-image
					  lazy-load
					  :src='img'
					/>
				</div>
				<div class="article-content"></div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			img:require('../../../assets/img/posters/friendcCircle.png')
		};
	},
};
</script>
<style scoped="scoped" lang="less">
	.article-list{
		width: 690px;
		.article-li{
			
		}
		.user-name{
			width: 100px;
			height: 500px;
			background: pink;
		}
		.article-content{
			width: 590px;
			height: 500px;
			background: skyblue;
		}
	}
</style>