<template>
	<!--
	    	4. v-once（不建议使用）
        		1. 用途：若有一个组件，这个组件包含了大量静态内容。可以在根元素上添加 v-once 特性以确保这些内容只计算一次然后缓存起来，若用在Button上会导致事件只会一次有效。
        		2. 注意：v-once 也能执行一次性地插值，当数据改变时，插值处的内容不会更新。请留心这会影响到该节点上的其它数据绑定。—— v-once 仅仅使用第一次有效，后续修改无效。
    -->
	<div>
		<p>
			<b>4. 静态组件 v-once（不建议使用：只会阻止数据更新不会阻止事件传递</b>	 
	        	<br />
	        	1. 用途：若有一个组件，这个组件包含了大量静态内容。可以在根元素上添加 v-once 特性以确保这些内容只计算一次然后缓存起来，这会导致从这个元素开始 Vue 响应式系统失效。
	        	<br />
	        	2. 注意：v-once 也能执行一次性地插值，当数据改变时，插值处的内容不会更新。请留心这会影响到该节点上的其它数据绑定。 v-once 仅仅使用第一次有效，后续修改无效。
		</p>
		<br />
       	<label v-once>{{ msg }}</label>&nbsp;&nbsp;&nbsp;
       	<label>{{ msg }}</label>&nbsp;&nbsp;&nbsp;
		<button v-once @click="modify">button v-once</button>&nbsp;&nbsp;&nbsp;
		<button @click="modify">not v-once</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				msg: "default",
			}
		},
		methods: {
			modify() {
				this.msg = 'button ' + this.clsfun();
			},
			clsfun: function() {
				let count = 0;
				return () => {
					return count++;
				}
			}(),
		}
	}
</script>

<style scoped="scoped">
	
</style>