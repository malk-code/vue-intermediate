<template>
	<div>
		<!--		
		    5. 若在组件内部为input通过v-model绑定props的属性，若传入为对象，可绑定对象某个属性。不天太建议定义props为对象，难以查看对象的属性，props接收可为集合。
		    6. 虽然在自定义控件内能直接使用v-model，但这会直接在子组件内修改了父组件的值，更建议是将值抛出给父组件修改。多层可结合$attrs和$listeners，可以将组件当成标签进行使用。
		    7. 敲黑板：：若设置了 input 的 type 为 number，则录入字符时，回调通过$event.target.value的取值为空。.native可能会导致事件冲突，如43-3-1/2，点击按钮也就响应input的focus
	    -->
		<input type="checkbox" :checked="checked" @input="$emit('changed', $event.target.checked)" :value="val" />
		<!--1. 事件名：跟组件和 prop 不同，事件名不存在任何自动化的大小写转换。而是触发的事件名需要完全匹配监听这个事件所用的名称。且事件名不会被用作一个 JavaScript 变量名或属性名，所以就没有理由使用 camelCase 或 PascalCase。并且 v-on 事件监听器在 DOM 模板中会被自动转换为全小写 (HTML 是大小写不敏感的)，建议始终使用 kebab-case 的事件名-->
		<button @click="$emit('get-value', val)">value</button>
	</div>
</template>

<script>
	export default {
		props: ["checked"],
		data() {
			// 2. 在组件内可直接使用v-model，但v-model 默认会利用名为 value 的 prop 和名为 input 的事件，有时输入控件可能会将 value 特性用于不同的目的。自定义v-model可避免这样的冲突
			return {
				val: "input value"
			}
		}
	}
</script>

<style>
</style>