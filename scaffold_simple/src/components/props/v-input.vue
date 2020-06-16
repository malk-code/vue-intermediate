<template>
	<div class="input">
		<h4 style="color: black;">注意注意：input 的 type 为 number，则录入字符时，回调通过$event.target.value的取值为空</h4>
		<label> {{ obj.title }}</label>
		<!--		<input placeholder="update:my-prop-name" :value="sync.prop" @input="$emit('changed', $event.target.value)" />-->	
		<!--		
		    5. 若在组件内部为input通过v-model绑定props的属性，若传入为对象，可绑定对象某个属性。不天太建议定义props为对象，难以查看对象的属性，props接收可为集合。
		    6. 虽然在自定义控件内能直接使用v-model，但这会直接在子组件内修改了父组件的值，更建议是将值抛出给父组件修改。多层可结合$attrs和$listeners，可以将组件当成标签进行使用。
		    7. 敲黑板：：若设置了 input 的 type 为 number，则录入字符时，回调通过$event.target.value的取值为空。.native可能会导致事件冲突，如43-3-1/2，点击按钮也就响应input的focus
	    -->
    		<input :value="obj.content" type="number" :placeholder="obj.placeholder" @input="$emit('input', $event.target.value)" />
		</div>
</template>

<script>
	export default {
		props: ["obj"],
		// 8. 非 Prop 的特性：导当属性传向一个组件，但是组件并没有相应 prop 定义的特性。因为显式定义的 prop 适用于向一个子组件传入信息，然而组件库的并不总能预见组件使用的场景。这也是为什么组件可以接受任意的特性，而这些特性会被添加到这个组件的根元素上。— 在 mounted 内通过 this.$el.getAttribute(‘新增属性’) 可以获取到新增的未依赖 props 注入的值。
		mounted() {
			let data = this.$el.getAttribute('data-add')
//	        alert(data);
	        console.log(data);
		}
	}
</script>

<style scoped="scoped">
	input {
		text-indent: 4px;
	}
	.input {
		color: orange;
	}
</style>