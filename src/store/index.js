import Vue from 'vue';
import Vuex from 'vuex'; //引入vuex
Vue.use(Vuex);
// state 共享仓库
const state = {
	sessionId:null,//登陆凭证
	repayChannelCode:null,//代还通道编号
	userName:null,//用户实名认证姓名
	certificateNum:null,//用户实名认证身份证号码
	withdrawalType:'app',//判断点击右上角返回按钮应该返回h5页面还是app，默认app
}
// 修改state仓库数据的方法合集
const mutations = {
	// app端进入H5信用卡管理页面设置state数据调用的方法
	setCardManagement(state,appData){
		// 把app传递过来的参数设置给state里面对应的值
		state.sessionId = appData.sessionId;
		if(appData.repayChannelCode){	
			state.repayChannelCode = appData.repayChannelCode;
		}
		if(appData.userName){	
			state.userName = appData.userName;
		}
		if(appData.certificateNum){
			state.certificateNum = appData.certificateNum;
		}
	},
	setWithdrawalType(state){
		state.withdrawalType = 'h5' 
	}
}
//异步掉用mutations里面的方法修改state里面的数据的方法合集
const actions = {
	
}
//实时监听state里面的值的变化
const getters = {
	
}

const store = new Vuex.Store({
	state,
	mutations,
	actions,
	getters
});
export default store;