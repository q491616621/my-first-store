<template>
	<div class="load-fail flx-c">
		<van-button class="btn" type="default" @click='reload'>点击重新加载</van-button>
	</div>
</template>
<script>
export default {
	data() {
		return {
		};
	},
	methods: {
		reload() {
			this.$emit('reload')
		}
	},
};
</script>
<style scoped="scoped" lang="less">
	.load-fail{
		margin-top: 88px;
		height: 150px;
		.btn{
			color: #5eb4ff;
			font-size: 26px;
			border: 2px solid #5eb4ff;
			border-radius: 10px;
			width: 350px;
			height: 70px;
			line-height: 70px;
		}
	}
</style>