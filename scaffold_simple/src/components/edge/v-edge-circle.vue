<template>
	<div>
		<p>循环引用:</p>
	
		<ul style="margin-left: 20px;">
			<li v-for="num in 10" :key='num'>
				<asyncone>
					<asynctwo>
						<asyncone></asyncone>
					</asynctwo>
				</asyncone>
			</li>
		</ul>
	</div>
</template>

<script>
	/* 组件之间的循环引用 -- import
		为了解释循环引用发生了什么，这里先把两个组件称为 A 和 B。模块系统发现它需要 A，但是首先 A 依赖 B，但是 B 又依赖 A，但是 A 又依赖 B，如此往复。这变成了一个循环，不知道如何不经过其中一个组件而完全解析出另一个组件。为了解决这个问题，此时需要给模块系统一个点，在那里“A 反正是需要 B 的，但是此时不需要先解析 B。”
		
		方案 1. 当通过 Vue.component 全局注册组件的时候，这个悖论会被自动解开。但通常不建议直接注册去阿奴怒组件，导致依赖的增加和组件名称的污染，基础组件会考虑。
		
		然而，如果使用一个模块系统依赖/导入组件，例如通过 webpack 或 Browserify，此时会遇到一个错误 Failed to mount component: template or render function not defined.
		
		方案 2：因为知道循环引用产生悖论的组件的相互引用，但这里有一个谁先引用的谁的时间差，所以可以会等到生命周期钩子 beforeCreate 时去注册被第二引用的子组件。
		
		方案 3：在本地注册组件的时候，可以使用 webpack 的异步 import；也可以使用 require 方案，虽然 require 是同步下载，但它也是按需加载的
	*/	
	
	// 循环引用
//	import asyncone from '../comp/v-async-one.vue';
//	import asynctwo from "../com/v-async-two.vue";
	
	// 方案 2
//	import asyncone from '../comp/v-async-one.vue';

	export default {
		components: {
//			asyncone,
//			asynctwo,
			
			// 方案 3
//			asyncone: () => System.import('../comp/v-async-one.vue'),
//			asynctwo: () => System.import('../comp/v-async-two.vue'),

			asyncone: r => require(['../comp/v-async-one.vue'], r),
			asynctwo: r => require(['../comp/v-async-two.vue'], r),

//			asyncone,
		},
		// 方案 2
//		beforeCreate: function () {
//		  	this.$options.components.asynctwo = require('../comp/v-async-two.vue').default
//		},

		// 内联模板测试数据 - v-edge-inline.vue
		data() {
			return {
				inline: "this is inline template from v-edge-circle.",
			}
		},
		methods: {
			showinline() {
				alert(this.inline);
			}
		}
	}
	

</script>

<style>
</style>