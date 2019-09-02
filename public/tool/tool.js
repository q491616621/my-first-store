import { Toast } from 'vant';
let tool = {
	// -------------------------------------------------------------------------------
	// 把数字转换为金额格式
	// 5000=>5,000.00
	outputmoney(number) {
		number = number.replace(/\,/g, "");
		if (isNaN(number) || number == "") return "";
		number = Math.round(number * 100) / 100;
		if (number < 0)
			return '-' + outputdollars(Math.floor(Math.abs(number) - 0) + '') + outputcents(Math.abs(number) - 0);
		else
			return outputdollars(Math.floor(number - 0) + '') + outputcents(number - 0);
	},
	//格式化金额
	// 5000=>5,000
	outputdollars(number) {
		if (number.length <= 3)
			return (number == '' ? '0' : number);
		else {
			var mod = number.length % 3;
			var output = (mod == 0 ? '' : (number.substring(0, mod)));
			for (i = 0; i < Math.floor(number.length / 3); i++) {
				if ((mod == 0) && (i == 0))
					output += number.substring(mod + 3 * i, mod + 3 * i + 3);
				else
					output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
			}
			return (output);
		}
	},
	outputcents(amount) {
		amount = Math.round(((amount) - Math.floor(amount)) * 100);
		return (amount < 10 ? '.0' + amount : '.' + amount);
	},
	//反向改回
	tran2(id) {
		var v;
		v = id.replace(/,/g, "");
	},
	// ---------------------------------------------------------------------------------------------------
	// 金钱分转元
	centTurnSmacker(val) {
		var str = (val / 1).toFixed(2) + '';
		var intSum = str.substring(0, str.indexOf(".")).replace(/\B(?=(?:\d{3})+$)/g, ','); //取到整数部分
		var dot = str.substring(str.length, str.indexOf(".")) //取到小数部分
		var ret = intSum + dot;
		return ret
	},
	//-----------------------------------------------------------------------------------------------------
	// 检查机型
	testPlat() {
		// 检查平台 0为安卓，1为ios，2为PC
		var u = navigator.userAgent;
		if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) { //android终端
			// setWebViewFlag();
			return 0;
		} else if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) { //ios终端
			// setWebViewFlag();
			return 1;
		} else {
			return 2;
		}
	},
	//-----------------------------------------------------------------------------------------------------
	// 检查当前月份的天数
	days(){
		let date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth()+1;
		let now = new Date(year,month,0);
		let dayCount = now.getDate();
		return dayCount;
	},
	//-----------------------------------------------------------------------------------------------------
	// 加载中弹窗
	toastLoading(){
		Toast.loading({
			message:'加载中...',
			duration:0,
			forbidClick:true
		})
	}
}
export default tool;
