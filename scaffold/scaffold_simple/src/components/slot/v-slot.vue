<template>
	<div class="container" stl="xx">
		<h3>具名插槽和作用域</h3>
		<p>scoped: {{ scoped }}</p>
		<p>scope: {{ scope }}</p>
		<!--3. 具名插槽：slot 元素有一个特殊的 name 属性，在想要传入的组件或标签上添加 slot=“插槽名称”；默认插槽：可以保留一个未命名插槽，它会作为所有未匹配到插槽的内容的统一出口-->
		<!--4. 作用域：父组件模板的所有东西都会在父级作用域内编译；子组件模板的所有东西都会在子级作用域内编译。理解：插槽的作用域就是组件内部的作用域，因此不能访问组件的作用域。-->
		<hr style="margin: 5px 0px;" />
		<div>
			<header>
		   		<slot name="header"></slot>
		  	</header>
		  	<main>
		    		<slot></slot>
		  	</main>
		  	<footer>
		    		<slot name="footer"></slot>
		 	</footer>
		</div>
	</div>
</template>

<script>
	export default {
		props: ["scoped"],
		data() {
			return {
				scope: '临时新增属性'
			}
		},
		mounted() {
			this.scope = this.$el.getAttribute('scope');
			console.log(this.$el.getAttribute('scope'));
		}
	}
</script>

<style scoped="scoped">
	.container {
		background: #CCCCCC;
		padding: 5px 10px;
	}
</style>