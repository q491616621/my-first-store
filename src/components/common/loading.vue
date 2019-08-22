<template>
	<div class="common-loading">
		<van-loading size="36px" vertical color="#62b6ff">加载中...</van-loading>
	</div>
</template>
<script>
export default {
	data() {
		return {
		};
	},
};
</script>
<style lang="less">
	.common-loading{
		margin-top: 138px;
		.van-loading__text{
			color: #62b6ff;
		}
	}
</style>