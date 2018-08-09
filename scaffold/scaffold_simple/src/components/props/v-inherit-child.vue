<template>
	<div>
		<h5>引用子组件，通过$attrs传值: {{ $attrs.child.child }}</h5>
		<h5>引用子组件，通过$listeners传递事件 - buuton的值传递通过两层props传递
			<button v-text="placeholder" @click="$emit('click-button', 'child inherit')"></button><br />
		</h5>
		<h5>不能传递style和class: 跨组件尤其的定义基础组件时传递值和事件尤其有用！</h5>
	</div>
</template>

<script>
	/*
	    10. 跨组件传值和事件的方式之一：inheritAttrs，$attrs和$listener —— 定义基础组件时很有用
        1. inheritAttrs：禁用特性继承，默认情况下父作用域的不被认作 props 的特性绑定 (attribute bindings) 将会“回退”且作为普通的 HTML 特性应用在子组件的根元素上。当撰写包裹一个目标元素或另一个组件的组件时，这可能不会总是符合预期行为。通过设置 inheritAttrs 到 false，这些默认行为将会被去掉。—— 去掉组件的根元素继承特性，结合$attrs传值
        2. $attrs：跨组件值传递，包含了父作用域中不被认为 (且不预期为) props 的特性绑定 (class 和 style 除外)。—— 组件传入绑定值未被上级组件props绑定，则可通过$attrs继续传递
        3. $listener：跨组件事件传递，包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。可在底层组件直接抛出组件的事件，在上层组件中 v-on="$listeners" 继续往上抛出。
        4. 参考：www.jb51.net/article/132371.htm —  $attrs通过 v-bind="$attrs" 继续传递，若所有的属性都被上层组件props所绑定，那获取到就是空的对象。绑定均在它的上层组件进行
	 */
	export default {
		props: ["placeholder"],
		data() {
			return {
				
			}
		},
		components: {

		},
		mounted() {
			console.log("child - " + this.$attrs.child.child);
		},
	}
</script>

<style>
</style>