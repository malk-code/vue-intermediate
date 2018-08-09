 <style scoped="scoped" lang="less" scoped>  
	.mint-msgbox-btns {
	    	display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	    height: 40px;
	    line-height: 40px;
	}
	.mint-msgbox-btn {
	    line-height: 35px;
	    display: block;
	    background-color: #fff;
	    -webkit-box-flex: 1;
	    -ms-flex: 1;
	    flex: 1;
	    margin: 0;
	    border: 0;
	}
</style> 

<template>  
  	<div>  
		未解决：：：：
		<button class="mint-msgbox-btns mint-msgbox-btn" v-show="showCancelButton" @click="handleAction('cancel')">{{ cancelButtonText }}</button>
		<button class="mint-msgbox-btns mint-msgbox-btn" v-show="showConfirmButton" @click="handleAction('confirm')">{{ confirmButtonText }}</button>
		
		高级异步组件 promise -- 参考学习 mnit-ui Message Box：使用返回一个 promise，不理解
  	</div>  
</template>  

<script>  
	// 处理加载状态：高级组件：
	// 2. import()：在工厂函数中返回一个 Promise，需要插件支持，且在组件内需要为 import 添加 System 前缀；当使用局部注册时，也可以直接提供一个返回 Promise 的函数得到组
	
	export default {  
		data() {  
	    		return {
	    			showCancelButton: true,
	    			showConfirmButton: true,
	    			cancelButtonText: '取消',
	    			confirmButtonText: "确认",
	    			callback: null,
	   	 	}
	  	},  
	  	methods: {
	  		 handleAction(action) {
		       	console.log('xxx')
		       	
		       	var callback = this.callback;
		        this.value = false;
		        callback(action);
		      },
	  	}
	}  
</script>  
