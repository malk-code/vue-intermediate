<template>
	<div :class="{ active : isactive }">
		<br />
		<b>递归组件:</b>
		当前组件的 name 等于 导入的模板名称时，其实并没有导入外部的模板，而是对当前组件造成了递归调用：修改当前 data 只会影响后续创建的组件，之前创建并不影响，因为后续的组件会被处理为当前组件的子组件。
		<br />
		<button @click="out = !out">recursion</button>&nbsp;&nbsp;
		<button @click="isactive = !isactive">isactive</button>
		<edgerecursion v-if="out == 1"></edgerecursion>
	</div>
</template>

<!--    
	1. 递归组件
        1. 定义：组件是可以在它们自己的模板中调用自身的。不过只能通过 name 选项来做这件事。
        2. 当使用 Vue.component 全局注册一个组件时，这个全局的 ID 会自动设置为该组件的 name 选项。在返回的 template 内使用为组件设置的 name 作为标签。
        3. 若是自定义组件，设置 name 其实就可直接通过 name 设置的名称作为标签。因此当 name 等于 导入的模板名称时，其实并没有导入外部的模板，而是对当前组件造成了递归调用
        4. 递归当前组件：修改当前 data 只会影响后续创建的组件，之前创建并不影响，因为后续的组件会被处理为当前组件的子组件。
        5. 设置出口：稍有不慎，递归组件就可能导致无限循环，或抛出错误：使用递归组件需要设置出口，所以要确保递归调用是条件性的 (例如使用一个最终会得到 false 的 v-if)。
-->
<script>
	// 当 name 等于 导入的模板名称时，其实并没有导入外部的模板，而是对当前组件造成了递归调用
//	const edgerecursion = () => System.import('../comp/v-async-one.vue');
	
	export default {
		name: "edgerecursion",
		data() {
			return {
				out: 0,	
				isactive: true
			}
		},
		components: {
//			edgerecursion,
		}
	}
</script>

<style scoped="scoped">
	.active {
		border: 1px solid #0088CC;
		padding: 10px;
	}
</style>