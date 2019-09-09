
import Vue from 'vue'
import App from './App.vue'
import router from './router' 
import VueLazyload from 'vue-lazyload'
// import './registerServiceWorker'
// import FastClick from 'fastclick' //引入fastclick 解决ios300ms延迟
import 'amfe-flexible/index.js' //引入amfe-flexible,用来配合postcss-pxtorem 转换rem
import store from './store/index.js';//引入vuex定义的全局仓库

import clipboard from 'clipboard';//引入clipboard 实现复制功能
Vue.prototype.clipboard = clipboard;

import Vant from 'vant'; //引入vantUI
import 'vant/lib/index.css';
Vue.use(Vant);
Vue.use(VueLazyload,{
	loading:'https://img.yzcdn.cn/vant/apple-1.jpg',
	error:'https://img.yzcdn.cn/vant/apple-2.jpg',
});
// FastClick.attach(document.body);
Vue.config.productionTip = false;


// router.beforeEach((to,from,next)=>{
// 	if(!to.query.name){
// 	let name = 'www.baidu.com'
// 	console.log(111)
// 		// next({
// 		// 	path:to.path,
// 		// 	query:name
// 		// })
// 	}
// 	console.log(to)
// 	console.log(from)
// 	console.log(next)
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
