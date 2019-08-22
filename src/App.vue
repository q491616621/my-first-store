<template>
	<div id="app">
		<router-view v-if="!$route.meta.keepAlive"></router-view>
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		
	<!-- 	<transition :name='transitionName' v-if="!$route.meta.keepAlive">
			<router-view></router-view>
		</transition>
		 <transition :name="transitionName" v-if="$route.meta.keepAlive">
		    <keep-alive>
		    	<router-view></router-view>
		    </keep-alive>
		</transition> -->
		
		
		<!-- <transition :name="transitionName">
            <router-view v-if="!$route.meta.keepAlive"></router-view>
            <keep-alive>
            	<router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
        </transition> -->
	</div>
</template>
<script>
	// export default{
	// 	name:'app',
	// 	data(){
	// 		return{
	// 			transitionName:''
	// 		}
	// 	},
	// 	watch:{
	// 		$route(to,from){
	// 			console.log(to)
	// 			console.log(from)
	// 			if(to.meta.index > 0){
	// 					if(to.meta.index > from.meta.index){
	// 					this.transitionName = 'slide-left'
	// 				}else{
	// 					this.transitionName = 'slide-right'
	// 				}
	// 			}else if(to.meta.index == 0 && from.meta.index >0){
	// 				this.transitionName = 'slide-right'
	// 			}
	// 		}
	// 	}
	// }
</script>
<style lang="less">
	@import url("../public/css/reset.css");
	@import url("../public/css/common.css");
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
	// ----------------------------------------------------------
	// 滑动进入,滑动出来
	.slide-right-enter-active,
    .slide-right-leave-active,
    .slide-left-enter-active,
    .slide-left-leave-active {
        will-change: transform;
        transition: all .3s;
        position: absolute;
        width:100%;
        left:0;
    }
    .slide-right-enter {
        transform: translateX(-100%);
    }
    .slide-right-leave-active {
        transform: translateX(100%);
    }
    .slide-left-enter {
        transform: translateX(100%);
    }
    .slide-left-leave-active {
        transform: translateX(-100%);
    }
	// ----------------------------------------------------
// 	#nav {
// 		padding: 30px;
// 
// 		a {
// 			font-weight: bold;
// 			color: #2c3e50;
// 
// 			&.router-link-exact-active {
// 				color: #42b983;
// 			}
// 		}
// 	}
</style>
