<template>
  <div class="login-box">
    <button @click="yanzhengma">验证码</button>
    <button @click='zhuce'>注册</button>
    <button @click="denglu">登陆</button>
    <button @click="tuichu">退出登陆</button>
    <button @click="shimingrenzheng">实名认证</button>
    <button @click="chaxunshi">查询市</button>
  </div>
</template>
<script>
  import {
    server
  } from '@/api/server.js'
  export default {
    data() {
      return {
        vcode: null,
      };
    },
    methods: {
      chaxunshi(){
        let init = {
          channelCode:1000000001,
          province:'安徽省'
        }
        server.queryCities(init).then(res=>{
          console.log(res)
        })
      },
      // 实名认证
      shimingrenzheng(){
        let init = {
          realName:'王金盛',
          certificateNumb:'445122199010122716'
        }
        server.idAuth(init).then(res=>{
          console.log(res)
        })
      },
      // 退出登陆
      tuichu(){
        server.logout().then(res=>{
          console.log(res)
        })
      },
      // 登陆
      denglu() {
        // let init = {
        //   agentId: 1986738797,
        //   userName: 13610144601,
        //   passWord: '123456'
        // }
		//  let init = {
		//   agentId: 1986738797,
		//   userName: 17665271721,
		//   passWord: 'hgq123456'
		// }
		//  let init = {
		//   agentId: 1986738797,
		//   userName: 13590386972,
		//   passWord: '12345'
		// }
		// 昭茜的账号
		// let init = {
		// 	agentId: 1986738797,
		// 	userName: 18665327870,
		// 	passWord: '123456'
		// }
		//金盛二号手机
		// let init = {
		// 	agentId:1986738797,
		// 	userName: 15361056437,
		// 	passWord: '123456'
		// }
		// 正式服务器的
		//奥利奥
		// let init = {
		// 	agentId:1908141437,
		// 	userName:17665271721,
		// 	passWord:'123456'
		// }
		//老于
		let init = {
			agentId:1908141437,
			userName:18682001955,
			passWord:'woaini'
		}
		// let init = {
		// 	agentId:1908141437,
		// 	userName:13631435331,
		// 	passWord:'123456'
		// }
		// let init = {
		// 	agentId:1908141437,
		// 	userName:13610144601,
		// 	passWord:'123456'
		// }
		// ------------------------------
        server.login(init).then(res=>{
		  console.log(res.data)
          // 把sessionId 设置给cookie
          let sessionId = res.data.sessionId
          // document.cookie = 'productSessionId' + '='+sessionId;
		  console.log(document.cookie)
          // 把用户的身份证信息和姓名设置给localStorage
          let userInfo = {
            certificateNumb:res.data.certificateNumb,
            realName:res.data.realName
          }
          window.localStorage.setItem('userInfo',JSON.stringify(userInfo))
        })
      },
      // 验证码
      yanzhengma() {
        server.vcodeMobile({
          mobile: 13610144601
        }).then(res => {
          this.vcode = res.data.vcode
        })
      },
      // 注册
      zhuce() {
        let init = {
          agentId: 1986738797,
          userName: 13610144601,
          passWord: 123456,
          vcode: this.vcode,
          recommendMobile: 13590386972
        }
        server.register(init).then(res => {
          console.log(res)
        })
      }
    },
  };
</script>

<style scoped="scoped" lang="less">
  .login-box {
    width: 100%;
    height: 1000px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
	font-size: 30px;
  }
</style>
