<template>
	<!--1. 是Vue 实现了一套内容分发的 API，在自定义模板内添加 slot 标签，可添加默认模板和值。当组件渲染的时候，slot 元素将会被替换。插槽内可以包含任何模板代码，包括 HTML。-->
	<div class="main">
		<!--2. 插槽的默认内容：如果组件为这个插槽提供了内容，则默认的内容会被替换掉。若组件没有包含一个 <slot> 元素，则任何传入它的内容都会被抛弃。插槽在多次传入就会添加多次。-->
		<navigationlink :url='url1'></navigationlink>
		<navigationlink :url='url2'>intro profile</navigationlink>
		<navigationlink :url='url3'><navigationlink>event</navigationlink> </navigationlink>
		<!--3. 具名插槽：slot 元素有一个特殊的 name 属性，在想要传入的组件或标签上添加 slot=“插槽名称”；默认插槽：可以保留一个未命名插槽，它会作为所有未匹配到插槽的内容的统一出口-->
		<!--4. 作用域：父组件模板的所有东西都会在父级作用域内编译；子组件模板的所有东西都会在子级作用域内编译。理解：插槽的作用域就是组件内部的作用域，因此不能访问组件的作用域。-->
		<namesolt :scoped="scoped" scope="this is slot components scoped">
			<template slot="header">
				<h2>this is header</h2>
			</template>
			 <p>A paragraph for the main content.</p>
			 <p>And another one.</p>
			<h4 slot="footer">this is footer</h4>				
		</namesolt>
		
		<!--使用solt默认内置的样式和内容-->
		<scopeslot :todos="items"></scopeslot>
		
		<scopeslot :todos="items">
			<label slot-scope="{ item }">
				<span v-if="!item.isComplete">♡</span>
				<span v-else>✓</span>
				{{ item.text }}
			</label>
		</scopeslot>
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
		<scopeslot :todos="items">
			<template slot-scope="slotProps">
			    <!-- 为待办项自定义一个模板，-->
			    <!-- 通过 `slotProps` 定制每个待办项。-->
			    <span v-if="slotProps.item.isComplete">✓</span>
			    {{ slotProps.item.text }} - {{ scopeslot }}
			 </template>
		</scopeslot>
			
		<scopeslot :todos="items">
			<template slot-scope="{ item }">
			    <span v-if="!item.isComplete">✘</span>
			    {{ item.text }} - 更干净的作用域插槽
			</template>
		</scopeslot>
	</div>
</template>

<script>
	import navigationlink from '../components/slot/navigation-link.vue';
	import namesolt from '../components/slot/v-slot.vue';
	import scopeslot from '../components/slot/v-scope-slot.vue';

	export default {
		data() {
			return {
				url1: "index.html#/login?mode=open",
				url2: "index.html#/intro?mode=open",
				url3: "index.html#/event?mode=open",
				scoped: "slot scoped intro.",
				items: [
					{
						id: 1,
						text: 'item 1',
						isComplete: true,
					},
					{
						id: 2,
						text: 'item 2',
						isComplete: false
					},
					{
						id: 3,
						text: 'item 3',
						isComplete: false
					},
					{
						id: 4,
						text: 'item 4',
						isComplete: true
					},
				],
				scopeslot: "is't from slot"
			}
		},
		components: {
			navigationlink,
			namesolt,
			scopeslot,
		},
		mounted() {
			let title = (this.$route.meta.title);
			document.title = title;
		}
	}
</script>

<style scoped="scoped">
	.main {
		margin: .2rem .1rem;
	}
</style>