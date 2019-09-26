import axios from 'axios'
import {
	Toast
} from 'vant';
import tool from '../../public/tool/tool.js';
// Vue.use(Toast);
// const instance = axios.create({
//   withCredentials:true
// })
axios.defaults.withCredentials = true;
axios.defaults.timeout = 5000; //默认延时
// ------------------------------------------------------------------------
// 测试环境
axios.defaults.baseURL = 'http://47.112.10.80:9011/productapi/api';
// 正式环境
// axios.defaults.baseURL = 'https://www.kfmanager.com/productapi/api';
// ------------------------------------------------------------------------

// axios.defaults.headers.post["Content-Type"] = "multipart/form-data"
// 请求拦截器
axios.interceptors.request.use(config => {
	return config;
}, error => {
	return Promise.reject(error);
})
// 响应拦截器
axios.interceptors.response.use(response => {
	console.log(response)
	Toast.clear()
	return response
}, error => {
	if (error && error.response) {
		switch (error.response.status) {
			case 400:
				Toast('400错误');
				console.log('400,错误请求')
				break;
			case 401:
				Toast('401错误');
				console.log('401,未授权，请重新登录')
				break;
			case 403:
				Toast('403错误');
				console.log('403,拒绝访问')
				break;
			case 404:
				Toast({message:'404错误'});
				console.log('404,请求错误,未找到该资源')
				break;
			case 405:
				Toast('405错误');
				console.log('405,请求方法未允许')
				break;
			case 408:
				Toast('408错误');
				console.log('408,请求超时')
				break;
			case 500:
				Toast('500错误');
				console.log('500,服务器端出错')
				break;
			case 501:
				Toast('501错误');
				console.log('501,网络未实现')
				break;
			case 502:
				Toast('502错误');
				console.log('502,错误请求')
				break;
			case 503:
				Toast('503错误');
				console.log('503,服务不可用')
				break;
			case 504:
				Toast('504错误');
				console.log('504,网络超时')
				break;
			case 505:
				Toast('505错误');
				console.log('505,http版本不支持该请求')
				break;
			default:
				Toast(`其他错误${error.response.status}`);
				console.log(`其他错误${error.response.status}`);
				break;
		}
	} else {
		Toast('服务器连接失败,请检查网络情况,稍后再试')
		// console.log('服务器连接失败')
	}
	return Promise.resolve(error.response)
})


// 封装的get请求
export function get(url, params = {}) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
			params: params
		}).then(res => {
			resolve(res.data)
		}).catch(err => {
			reject(err)
		})
	})
}
// 封装的post请求
export function post(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios({
			method: 'post',
			url: url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				// 'Content-Type':'multipart/form-data'
			},
			data: data,
			transformRequest: [function(data) {
				// 判断本地缓存中是否有productSessionId有的话携带在data里面
				// if(localStorage.getItem('productSessionId')){
				// 	data = {...data,productSessionId:localStorage.getItem('productSessionId')}
				// }
				let ret = ''
				for (let it in data) {
					// ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
					ret += it + '=' + data[it] + '&'
				}
				ret = ret.substring(0, ret.length - 1)
				return ret
			}]
		}).then(res => {
			if(res.config.url == 'https://www.kfmanager.com/productapi/api/bankcard/getBindcardSm.do'||res.config.url == 'http://47.112.10.80:9011/productapi/api/bankcard/getBindcardSm.do'){
				resolve(res.data)
				return;
			}
			if (res.data.code == 0 || res.data.code == '-30001') {
				resolve(res.data)
			} else if (res.data.code == '-10000') {
				// 检查平台 0为安卓，1为ios，2为PC
				let platFlag = tool.testPlat();
				Toast({
					message: '登陆过期，跳转重新登陆',
					duration: 2000,
					forbidClick: true
				})
				setTimeout(() => {
					if (platFlag == 1) {
						let a = '奥利奥，泡一泡'
						// 调用ios的重新登陆方法
						window.webkit.messageHandlers.reLogin.postMessage(a);
					} else {
						// 调用安卓的重新登陆方法
						window.android.reLogin()
					}
				}, 2000)
			} else {
				// 判断是否有返回的错误信息,没有的话提示错误码
				Toast({
					message:res.data.message||res.status,
					forbidClick: true
				})
				resolve(null)
			}
		}).catch(err => {
			reject(err)
		})
	})
}
// export function post(url,data={}){
// 	return new Promise((resolve,reject)=>{
//     instance.post(url,data).then(res=>{
//       console.log(res)
//     })
// 	})
// }
//
