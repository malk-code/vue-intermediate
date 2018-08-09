<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
	export default {
		name: 'App'
	}
</script>

<style lang="less">
	/*覆盖浏览器默认样式：无所谓是否引入 vux 库*/
	
	@import '~vux/src/styles/reset.less';
	/*初始化css，引用淘宝初始化 css 代码*/
	
	@import "./static/css/style.css";
	body {
		background-color: white;
		font-size: 15px;
	}
	/*2. img 标签无法点击问题，在 iOS 端，可能需要将图片的 cursor 设置为 pointer —  cursor: pointer;  -- 在 App.vue 内设置 img（App.vue 样式的不为 scoped）。*/
	
	img {
		cursor: pointer;
	}
	
	html,
	body,
	#app {
		height: 100%;
	}
</style>