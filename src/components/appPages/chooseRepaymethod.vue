<template>
	<div>
		<!-- 顶部标题栏 -->
		<div class="title-bar">
			<top-title :titleName="titleName"></top-title>
		</div>
		<div class="methods-list flx-cas medium">
			<!-- <div class="methods-li flx-r" v-for="(item,index) in methodsList" :key='index' @click="chooseMethods(index)"> -->
			<div class="methods-li flx-r" v-for="(item,index) in methodsList" :key='index'>
				<div class="left flx-cas">
					<div>{{item.title}}</div>
					<div class="methods-content">{{item.content}}</div>
				</div>
				<div>
					<img v-show="item.checked" src="../../assets/img/addrePayPlan_roadYes.png" alt="选择状态">
					<img v-show="!item.checked" src="../../assets/img/addrePayPlan_roadNo.png" alt="选择状态">
				</div>
			</div>
		<button class="next bold" @click="goAddrePayPlan">确认还款</button>
		</div>
	</div>
</template>
<script>
	import topTitle from '@/components/common/topTitle.vue';
	export default {
		components: {
			topTitle
		},
		data() {
			return {
				isFirstEnter:false,//是否是第一次进入这个页面
				titleName: '选择还款方式',
				methodsList: [{
					title: '智能还款',
					content: '还款总额大于5万元，单笔大于1000元商旅商户账单',
					checked: false,
					type:0
				}, {
					title: '完美还款',
					content: '还款总额小于5万元，单笔金额小于1000元实体落地商户',
					checked: true,
					type:1
				}, {
					title: '0余额还款',
					content: '信用卡为0也能还，预留充足的手续费即可',
					checked: false,
					type:2
				}],
				cardInfo:{},//信用卡列表页面传递过来的数据
				repaymothod:0,
			};
		},
		beforeRouteEnter(to,from,next){
			let arr = Object.keys(to.params)
			// 当时从cardManagement页面进入进来的,而且有传值的话,把isBack设为false 否则设为true
			if(from.name == 'cardManagement'&&arr.length != 0){
				to.meta.isBack = false;
			}else{
				to.meta.isBack = true;
			}
			next();
		},
		created(){
			this.isFirstEnter = true;
		},
		activated(){
			if(!this.$route.meta.isBack||this.isFirstEnter){
				// 获取上个页面传递过来的卡片信息
				this.getCardInfo()
			}
			this.isFirstEnter = false;
		},
		methods: {
			// 获取上个页面传递过来的数据
			getCardInfo(){
				this.cardInfo = this.$route.params
			},
			// 跳转到添加还款计划页面
			goAddrePayPlan(){
				// 把这一页获取到的还款方式和上一页的数据一起传给添加还款计划页面
				let cardInfo = this.cardInfo;
				let repaymothod = this.repaymothod
				console.log(cardInfo)
				cardInfo = {...cardInfo,repaymothod};
				console.log(cardInfo)
				this.$router.push({
					name:'addrePayPlan',
					params:cardInfo
				})
			},
			// 选择还款方式
			chooseMethods(e) {
				let methodsList = this.methodsList.map((cur, index) => {
					cur.checked = false;
					if (index == e) {
						cur.checked = true;
					}
					return cur
				})
				this.methodsList = methodsList
			}
		},
	};
</script>
<style scoped="scoped" lang="less">
	.methods-list {
		margin-top: 88px;
		padding: 20px 0;
		box-sizing: border-box;
		.methods-li {
			width: 690px;
			height: 180px;
			box-shadow: 0px 3px 12px 0px rgba(212, 212, 212, 0.5);
			border-radius: 10px;
			box-sizing: border-box;
			padding: 30px;
			justify-content: space-between;
			margin-bottom: 20px;

			.left {
				width: 100%;
				height: 100%;
				font-size: 30px;
				color: #212121;
				align-items: flex-start;

				.methods-content {
					margin-top: 10px;
					text-align: left;
					font-size: 24px;
					color: #ADADAD;
					width: 455px;
				}
			}
			img {
				width: 35px;
				height: 35px;
			}
		}
		.next{
			margin-top:100px;
			width: 690px;
			height: 90px;
			text-align: center;
			background: linear-gradient(90deg, rgba(110, 191, 255, 1), rgba(26, 130, 255, 1));
			box-shadow: -1px 10px 24px 0px rgba(53, 133, 254, 0.5);
			border-radius: 45px;
			color: #fff;
			font-size: 32px;
			line-height: 90px;
		}
	}
</style>
