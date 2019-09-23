<template>
	<div>
		<!-- 顶部标题栏 -->
		<div class="title-bar">
			<top-title :titleName="titleName"></top-title>
		</div>
		<div class="aaa" @click="callTel">
			13610144601
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
				titleName: '商户详情', //标题栏标题
			};
		},
		methods: {
			callTel() {
				// 检查平台 0为安卓，1为ios，2为PC
				let platFlag = tool.testPlat();
				let init = {
					telNumber:'0755-33941925'
				}
				if(platFlag == 1){
					// 调用ios打电话的方法
					window.webkit.messageHandlers.callTelAction.postMessage(init);
				}else{
					// 调用安卓打电话方法
					window.android.callTelAction(JSON.stringify(init));
				}
			}
		},
	};
</script>

<style scoped="scoped" lang="less">
	.aaa{
		margin-top: 88px;
	}
</style>
