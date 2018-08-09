<template>
	<!--1. 是Vue 实现了一套内容分发的 API，在自定义模板内添加 slot 标签，可添加默认模板和值。当组件渲染的时候，slot 元素将会被替换。插槽内可以包含任何模板代码，包括 HTML。-->
	<div style="display: inline;">
		<a
			:href="url"
			class="nav-link">
   			<!--2. 插槽的默认内容：如果组件为这个插槽提供了内容，则默认的内容会被替换掉。若组件没有包含一个 <slot> 元素，则任何传入它的内容都会被抛弃。插槽在多次传入就会添加多次。-->
			<slot>defalut</slot>
		</a>
	</div>
</template>

<script>
	export default {
		props: ["url"]
	}
</script>

<style scoped="scoped">
	.nav-link {
		border: 1px solid #4CAF50;
		border-radius: 4px;
	    padding: 8px 10px;
	    text-align: center;
	    text-decoration: none;
	    display: inline-block;
	    font-size: 14px;
	    margin: 4px 2px;
		cursor: pointer;
	}
</style>