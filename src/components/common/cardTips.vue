<template>
	<div class="">
		<!-- 提示1 -->
		<van-dialog
		  class="tips1"
		  v-model="tips1"
		  title="有效期说明"
		  :beforeClose='resetTipsType'
		>
		  <img :src="tipsImg1">
		  <div class="content">有效期是打印在信用卡正面卡号下方，标注格式为月份在前，年份在后的数字</div>
		</van-dialog>
		<!-- 提示2 -->
		<van-dialog
		  class="tips2"
		  v-model="tips2"
		  title="CVN2说明"
		  :beforeClose='resetTipsType'
		>
		  <img :src="tipsImg2">
		  <div class="content">CVN2是打印在信用卡背面签名栏上的最后三位数字。</div>
		</van-dialog>
	</div>
</template>
<script>
export default {
	props:{
		tipsType:{
			type:String,
			default:'',
		}
	},
	data() {
		return {
			tips1:false,
			tips2:false,
			tipsImg1:require('../../assets/img/tips1.jpg'),
			tipsImg2:require('../../assets/img/tips2.jpg'),
		};
	},
	methods: {
		resetTipsType(action,done){
			// console.log(action)
			this.$emit('resetTipsType')
			done()
		}
	},
	watch:{
		tipsType(val){
			if(val == 'cvn2'){
				this.tips2 = true;
			}else if(val == 'valid'){
				this.tips1 = true;
			}
		}
	}
};
</script>

<style scoped="scoped" lang="less">
	.tips1{
		img{
			padding-top: 38px;
			width:550px;
			height: 385px;
		}
		.content{
			padding: 20px 20px;
			text-align: left;
			font-size: 30px;
			color: #888;
		}
	}
	.tips2{
		.van-dialog__header{
			padding-top: 0!important;
		}
		img{
			padding-top: 38px;
			width: 550px;
			height: 300px;
		}
		.content{
			padding: 20px 20px;
			text-align: left;
			font-size: 30px;
			color: #888;
		}
	}
</style>