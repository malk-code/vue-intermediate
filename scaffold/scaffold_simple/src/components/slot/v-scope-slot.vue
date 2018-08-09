<template>
	<div class="main">
		<ul>
			<li 
				v-for="todo in todos"
				:key='todo.id'>
				 <!-- 我们为每个 todo 准备了一个插槽，-->
    				<!-- 将 `todo` 对象作为一个插槽的 prop 传入。-->
				<slot :item="todo">
					<!-- 回退的内容：默认显示内容 -->
					slot: {{ todo.text }}
				</slot>
			</li>
		</ul>
	</div>
	<!--
		作用域插槽：
        1. 定义：组件带有一个可从子组件获取数据的可复用的插槽。我理解这可以提升slot可访问的变量，外部实现，就能访问外部的组件的变量了。
        2. 使用：结合v-for为每个item添加一个插槽，在组件内设置插槽默认显示样式和内容，且props中仅仅需要定义传入的集合，插槽的属性通过slot动态绑定：不需要在props定义。
        3. 模板：传入插槽一般以 template 作为替代方案，也可以直接使用HTML的标签。在获取 v-for 的对象时，必须用插槽设置的绑定属性名：slot 设置了绑定的属性名未在props定义。
        4. 插槽数据，通过 slot-scope 特性从子组件获取数据。官方文档：而且在 2.5.0+，slot-scope 不再限制在 <template> 元素上使用，而可以用在插槽内的任何元素或组件上。
            1. slot-scope="临时变量"，通过该临时变量，点语法去访问 slot 内部设置的绑定属性，就能得到 slot 绑定的 v-for 后的对象。
            2. 解构 slot-scope：如果一个 JavaScript 表达式在一个函数定义的参数位置有效，那么这个表达式实际上就可以被 slot-scope 接受，使用 ES2015 解构语法，
            3. 因此可简写为：直接通过 slot-scope="{ slot设置的绑定属性名 } 就能获取 slot 在 v-for 得到的对象。这会使作用域插槽变得更干净一些。
	-->
</template>

<script>
	export default {
		props: ['todos']
	}
</script>

<style scoped="scoped">
	.main {
		background-color: #FFFFFF;
	}
</style>