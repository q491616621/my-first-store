let switchServer = {
	setCookie(sessionId){
		// let urlAddress = '47.112.10.80';//测试服务器
		let urlAddress = 'www.kfmanager.com';//正式服务器
		// document.cookie = `productSessionId=${sessionId};path=/;domain=47.112.10.80;`
		document.cookie = `productSessionId=${sessionId};path=/;domain=${urlAddress}`
	}
}
export default switchServer;