<template>
	<div>
		<!-- 顶部标题栏 -->
		<div class="title-bar">
			<top-title :titleName="titleName" :pageType='pageType'></top-title>
		</div>
	</div>
</template>
<script>
	import topTitle from '@/components/common/topTitle.vue';
	import tool from '../../../../public/tool/tool.js'
	export default {
		components: {
			topTitle,
		},
		data() {
			return {
				titleName: '公司简介', //标题栏标题
				pageType: 'app', //上个页面是什么h5还是app?
			};
		},
	};
</script>

<style scoped="scoped" lang="less">
	.aaa{
		margin-top: 88px;
	}
</style>
