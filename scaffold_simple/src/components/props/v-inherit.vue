<template>
	<div class="main">
		<label>{{ title }}</label>
		<!--		
		    5. 若在组件内部为input通过v-model绑定props的属性，若传入为对象，可绑定对象某个属性。不天太建议定义props为对象，难以查看对象的属性，props接收可为集合。
		    6. 虽然在自定义控件内能直接使用v-model，但这会直接在子组件内修改了父组件的值，更建议是将值抛出给父组件修改。多层可结合$attrs和$listeners，可以将组件当成标签进行使用。
		    7. 敲黑板：：若设置了 input 的 type 为 number，则录入字符时，回调通过$event.target.value的取值为空。.native可能会导致事件冲突，如43-3-1/2，点击按钮也就响应input的focus
	    -->
		<input :placeholder="placeholder" v-model="content" /><br />
		<label>v-model: {{ content }}</label>
		<button @click="$emit('click-button', 'base inherit')">button</button><br />
		<hr />
		<h4>Child</h4>		 
		<VChildInput v-bind="$attrs" v-on="$listeners" :placeholder="placeholder"></VChildInput>
	</div>
</template>

<script>
	import VChildInput from "../props/v-inherit-child.vue";
	/*
	    10. 跨组件传值和事件的方式之一：inheritAttrs，$attrs和$listener —— 定义基础组件时很有用
        1. inheritAttrs：禁用特性继承，默认情况下父作用域的不被认作 props 的特性绑定 (attribute bindings) 将会“回退”且作为普通的 HTML 特性应用在子组件的根元素上。当撰写包裹一个目标元素或另一个组件的组件时，这可能不会总是符合预期行为。通过设置 inheritAttrs 到 false，这些默认行为将会被去掉。—— 去掉组件的根元素继承特性，结合$attrs传值
        2. $attrs：跨组件值传递，包含了父作用域中不被认为 (且不预期为) props 的特性绑定 (class 和 style 除外)。—— 组件传入绑定值未被上级组件props绑定，则可通过$attrs继续传递
        3. $listener：跨组件事件传递，包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。可在底层组件直接抛出组件的事件，在上层组件中 v-on="$listeners" 继续往上抛出。
        4. 参考：www.jb51.net/article/132371.htm —  $attrs通过 v-bind="$attrs" 继续传递，若所有的属性都被上层组件props所绑定，那获取到就是空的对象。绑定均在它的上层组件进行
	 */
	export default {
		inheritAttrs: false,
		props: ["title", "content", "placeholder"],
		components: {
			VChildInput
		},
		mounted() {
			console.log("base - " + this.$attrs.child.child)
		}
	}
</script>

<style scoped="scoped">
	.main {
		background: #A1A1A1;
		padding: 5px 10px;
		color: white;
		font-size: 18px;
	}
</style>