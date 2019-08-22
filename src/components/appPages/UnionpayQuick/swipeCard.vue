<template>
	<div>
		<!-- 顶部标题栏 -->
		<div class="title-bar flx-r">
			<top-title :titleName="titleName" :pageType='pageType'></top-title>
		</div>
		<div class="container flx-cas">
			<div class="instructions flx-r">
				<!-- <img src="../../../assets/img/UnionpayQuick/explain.png"> -->
				<!-- <div>使用说明</div> -->
			</div>
			<div class="amount-box flx-cas">
				<div class="title">
					<span>请输入刷卡金额</span>
					<span>(元)</span>
				</div>
				<div class="content flx-rs">
					<span>￥</span>
					<span v-if="amount.length>0">{{amount}}</span>
					<span v-if="!(amount.length>0)">0.00</span>
					<!-- <span>0.00</span> -->
				</div>
				<div class="bottom flx-r">
					<div class="bottom-li flx-c">
						<div>限额</div>
						<div>2万元/笔</div>
					</div>
					<div class="bottom-li flx-c">
						<div>费率</div>
						<div>0.60%+2元/笔</div>
					</div>
					<div class="bottom-li flx-c">
						<div>结算</div>
						<div>10秒内到账</div>
					</div>
				</div>
			</div>
			<div class="number-keyboard flx-ras">
				<div class="keybord-left flx-ras">
					<van-button class='keybord-li' type="default" @click='setAmount("1")'>1</van-button>
					<van-button class='keybord-li' type="default" @click='setAmount("2")'>2</van-button>
					<van-button class='keybord-li' type="default" @click='setAmount("3")'>3</van-button>
					<van-button class='keybord-li' type="default" @click='setAmount("4")'>4</van-button>
					<van-button class='keybord-li' type="default" @click='setAmount("5")'>5</van-button>
					<van-button class='keybord-li' type="default" @click='setAmount("6")'>6</van-button>
					<van-button class='keybord-li' type="default" @click='setAmount("7")'>7</van-button>
					<van-button class='keybord-li' type="default" @click='setAmount("8")'>8</van-button>
					<van-button class='keybord-li' type="default" @click='setAmount("9")'>9</van-button>
					<van-button class='keybord-zero' type="default" @click='setAmount("0")'>0</van-button>
					<van-button class='keybord-li' type="default" @click='setAmount(".")'>·</van-button>
				</div>
				<div class="keybord-right flx-cs">
					<van-button class='keybord-x' type="default" @click="setAmount('D')">
						<img src="../../../assets/img/UnionpayQuick/del.png">
						<!-- <span class="x">x</span> -->
					</van-button>
					<van-button class='keybord-pay' type="default" @click='goChooseQuickCard'>
						<span>确认</span>
						<span>付款</span>
					</van-button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import topTitle from '@/components/common/topTitle.vue';
	// import tool from '../../../../public/tool/tool.js'
	export default {
		components: {
			topTitle,
		},
		data() {
			return {
				titleName: '信用卡刷卡', //标题栏标题
				pageType: 'app',
				amount: '', //提现金额
			};
		},
		beforeCreate() {
			document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
		},
		methods: {
			// 跳转选择信用卡页面
			goChooseQuickCard(){
				if(!this.amount||this.amount == 0){
					this.$toast({
						message:'请输入刷卡金额',
					})
					return;
				}
				this.$router.push({
					name:'chooseQuickCard'
				})
			},
			// 输入金额
			setAmount(num) {
				// let str = this.amount;
				switch (String(num)) {
					// 小数点
					case '.':
						this._handleDecimalPoint();
						break;
						// 删除键
					case 'D':
						this._handleDeleteKey();
						break;
					default:
						// 数字键
						this._handleNumberKey(num);
						break;
				}
				// let amount = this.amount;
				// amount = Number(amount);
				// if(amount == 0){
				// 	this.amount = num;
				// 	console.log(this.amount)
				// }else{
				// 	console.log(amount)
				// }
			},
			// 小数点
			_handleDecimalPoint() {
				let amount = this.amount;
				// 如果已经包含了小数点,直接返回
				if (amount.indexOf('.') > -1) return;
				//如果小数点是第一位，补0
				if (!amount.length) {
					// amount = '0.'
					return;
				} else {
				//如果不是，添加一个小数点
					amount += '.'
				}
				this.amount = amount;
				// console.log('点')
			},
			// 删除键
			_handleDeleteKey() {
				let amount = this.amount;
				// 如果没有输入,直接返回
				if(!amount.length)return;
				// 否则删除最后一个 
				amount = amount.substring(0,amount.length-1);
				this.amount = amount;
				// console.log('删除')
			},
			// 数字键
			_handleNumberKey(num) {
				let amount = this.amount;
				//如果有小数点且小数点位数不小于2
				if(amount.indexOf('.')>-1&&amount.substring(amount.indexOf('.')+1).length<2){
					amount += num; 
				}
				// 有小数点
				if(!(amount.indexOf('.') > -1)){
					if(num == 0&&amount.length == 0){
						// amount = '0.'
						amount = '0'
						// return;
					}else{
						if(amount.length && Number(amount.charAt(0))===0) return;
						amount += num;
					}
				}
				this.amount = amount;
				// console.log('数字')
			}
		},
		// watch:{
		// 	// 限制用户输入的金额只能是小数点后2位
		// 	amount(value,oldValue){
		// 		value = value.toString()
		// 		let aaa = tool.centTurnSmacker((value.match(/^\d*(\.?\d{0,2})/g)[0]))
		// 		console.log(aaa)
		// 		// this.amount = tool.centTurnSmacker((value.match(/^\d*(\.?\d{0,2})/g)[0]))
		// 		this.amount = aaa;
		// 	}
		// }
	};
</script>
<style scoped="scoped" lang="less">
	.container {
		width: 100%;
		margin-top: 88px;

		.instructions {
			width: 690px;
			height: 90px;
			justify-content: flex-end;
			font-size: 24px;
			color: #000;

			img {
				width: 20px;
				height: 23px;
				padding-right: 10px;
			}
		}

		// 金额信息表
		.amount-box {
			width: 690px;
			height: 368px;
			background: #fff;
			border-radius: 20px;
			font-size: 24px;
			color: #333;
			box-sizing: border-box;
			padding: 30px;

			.title {
				text-align: left;
				width: 100%;
				padding-top: 20px;
				font-size: 28px;
				color: #666;

				:nth-child(2) {
					padding-left: 20px;
				}
			}

			.content {
				width: 100%;
				height: 100px;
				line-height: 100px;
				padding-top: 60px;
				border-bottom: 1px solid #e5e5e5;

				span {
					height: 80px;
					line-height: 80px;
					font-size: 60px;
					color: #444;
				}

				:nth-child(2) {
					color: #666;
				}
			}

			.bottom {
				padding-top: 20px;
				width: 100%;
				height: 100%;
				justify-content: space-around;

				.bottom-li {
					justify-content: space-between;
					height: 80px;

					:nth-child(2) {
						color: #5B95F9;
					}
				}
			}
		}

		// 数字键盘

		.number-keyboard {
			position: fixed;
			bottom: 30px;
			width: 100%;
			height: 510px;

			.keybord-left {
				width: 514px;
				justify-content: space-between;
				align-items: flex-start;
				flex-wrap: wrap;

				.keybord-li {
					width: 165px;
					height: 120px;
					margin-bottom: 10px;
					border-radius: 5px;
					font-size: 40px;
					color: #333;
					font-weight: blod;
				}

				.keybord-zero {
					width: 340px;
					height: 120px;
					border-radius: 5px;
					font-size: 40px;
					color: #333;
					font-weight: blod;
				}
			}

			.keybord-right {
				width: 176px;

				.keybord-x {
					width: 165px;
					height: 120px;
					margin: 0 0 10px 10px;
					border-radius: 5px;
					line-height:0;
					img{
						width: 34px;
						height: 26px;
					}
				}

				.keybord-pay {
					width: 165px;
					height: 380px;
					border-radius: 5px;
					background: #5B95F9;
					margin-left: 10px;
					line-height: 50px;

					span {
						width: 70px;
						font-size: 36px;
						color: #fff;
						font-weight: bold;
					}
				}
			}
		}
	}
</style>
