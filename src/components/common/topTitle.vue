<template>
	<div class="flx-r top-title">
		<button class="return-btn flx-r" @click="returnBack">
			<img src="../../assets/img/return.png" alt="返回按钮">
		</button>
		<div class="title-name">{{titleName}}</div>
	</div>
</template>
<script>
	import tool from'../../../public/tool/tool.js'
export default {
	props:{
		titleName:{
			type:String,
			default:'斑马APP'
		},
		pageType:{//上个页面的类型
			type:String,
			default:'h5'
		}
	},
	data() {
		return {
			platFlag:null,//平台类型0为安卓，1为ios，2为PC
		};
	},
	created(){
		// 检查平台 0为安卓，1为ios，2为PC
		let platFlag = tool.testPlat();
		this.platFlag = platFlag;
	},
	methods: {
		// 返回上一页的函数
		returnBack() {
			let pageType = this.pageType; //获取上个页面的类型
			// 上个页面是H5的话,直接调用自己的方法,返回上个页面
			if(pageType == 'h5'){
				// let name = this.$route.name
				// if(name == 'planDetail'||name=='addrePayPlan'||name=='addCreditCard'){
				// 	this.$router.push({
				// 		name:'cardManagement',
				// 		params:{type:'next'}
				// 	})
				// }else{
					this.$router.go(-1)
				// }
			}else{
				if(this.platFlag == 1){
					let aaa = '奥利奥，泡一泡'
					// closeWeb ios定义的退回上一页，删除H5页面的方法
					window.webkit.messageHandlers.closeWeb.postMessage(aaa);
				}else{
					// btnBack 安卓定义的退回上一页,删除H5页面的方法
					window.android.btnBack()
				}
				
			}
		}
	},
};
</script>
<style scoped="scoped" lang="less">
 .top-title{
  width: 100%;
  height: 88px;
  box-sizing: border-box;
  border-bottom: 1px solid #EDEDED;
  position: relative;
  background: #fff;
  .return-btn{
   position: absolute;
   top: 0px;
   left: 0px;
   // width: 100px;
   height: 100%;
   img{
    padding:0px 30px;
    width: 18px;
    height: 32px;
   }
  }
  .title-name{
   font-size: 36px;
   color: #212121;
   font-weight: bold;
   line-height: 64px;
  }
 }
</style>
