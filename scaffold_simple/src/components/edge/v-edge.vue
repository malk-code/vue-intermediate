<template>
	<div>
		<p>prop: {{ prop }}</p>
		<div>
			<label>input: </label>
			<input :value="obj.val" :placeholder="obj.place" @input="$emit('input-changed', $event.target.value)"/><br />
			<label>input: {{ obj.val }}</label><br />
			<label>sync: </label>
			<input :value="sync" :placeholder="obj.place" @input="$emit('update:sync', $event.target.value)"/><br />
			<label>sync: {{ sync }}</label>
		</div>
		<br />
		<p>访问 $parent: </p>
		<p>
			<button @click="parentprop">$parent log</button>&nbsp;
			<button @click="parentalert">$parent alert</button>
		</p>
		<p>访问 $root/$children: </p>
		<p>
			<button @click="rootprop">$root log</button>&nbsp;
			<button @click="rootalert">$root alert</button>&nbsp;&nbsp;&nbsp;
			<button @click="owerprop">$root ower</button>
		</p>
		<!--48. 处理边界情况：在绝大多数情况下，最好不要触达另一个组件实例内部或手动操作 DOM 元素。
		    	1. $root：测试发现，$root取到的值是路由节点的，需要再取 $children 的第0个元素。若存在路由情况时，得到App.Vue，因为App.Vue 配置了 router-view，；没有路由则得到当前组件
		    2. 由 $root 特性，可在App.vue内设置中央事件总线，但一般设置在window对象上。通过 $emit 和 $on 触发和接受，第一位入参都为约定名称。在 beforeDestroy 通过  $off 关闭监听。
		-->
		<br />
		<div>
			<p>通过 $root 实现中央事总线 </p>
			<button @click="busemit">Bus $emit</button>
		</div>
		<br />
		<!--
			5. 访问子组价的实例或元素
		        1. 一般来讲，获取DOM元素，需document.querySelector（”id”）获取这个dom节点，然后在获取对应 id 的值. 这样就可以减少获取dom节点的消耗了。
		        2. 父子组件：不一定是自定义的两个组件，标签其实也可以看做是一个组件。若把自定义组件的事件和属性都暴露出来，这样子该组件就相当于是一个自定义的标签了。
	    -->
		<p>访问子组价的实例或元素: </p>
		<label>$refs: </label>
		<input ref='refused' placeholder="ref 的用法"/>
		<button @click="refbutton">ref event</button>
		
		<br />
		<br />
		<p>依赖注入：</p>
		<label>{{ injection }}&nbsp;&nbsp;&nbsp;&nbsp;</label>
		<button @click="provide">provide</button>&nbsp;&nbsp;
		<button @click="inject">inject</button>
		
		<br />
		<br />
		<p>程序化事件监听器：怎么阻止两次弹出框 ？ </p>
		<input ref="dateInput" v-model="date" type="date" />
		<input ref="dateInput" v-model="date" type="text" />
	</div>
</template>

<script>		
	// npm install vue-pikaday  -- 引用 pikaday 组件
	import Pikaday from 'pikaday';
	
	export default {
		props: ["prop", "obj", 'sync'],
		data() {
			return {
				t: '回到我自己了',
				injection: "provide & inject",
				date: null,
			}
		},
		inject: ['getprovide', 'getinject'],
		methods: {
			parentprop() {
				console.log(this.$parent.roots)
				console.log(this.$parent.$parent.roots);			
			},
			parentalert() {
				this.$parent.showroot()
				this.$parent.$parent.showroot()
			},
			// 1. $root：测试发现，$root取到的值是路由节点的，需要再取 $children 的第0个元素。若存在路由情况时，得到App.Vue，因为App.Vue 配置了 router-view；没有路由则得到当前组件
			rootprop() {
				console.log(this.$root.$children[0].roots)
				console.log(this.$root.$children[0].$children[0].roots)
			},
			rootalert() {
				this.$root.$children[0].showroot()
				this.$root.$children[0].$children[0].showroot()
			},
			owerprop() {
				console.log(this.$root.$children[0].$children[0].$children[0].t)
			},
			
			/* 2. 中央事件总线
				1. 由 $root 特性，可在App.vue内设置中央事件总线，但一般设置在window对象上。通过 $emit 和 $on 触发和接收，第一位入参为约定名称。在 beforeDestroy 通过  $off 关闭监听
				2. $root 实现：在App.vue 内新增一个属性，赋值为一个空的 Vue 对象。 空的实例放到根组件下，所有的子组件都能调用：使用 new Vue()，需要先导入 import Vue from 'vue'; 
				3. 测试发现，直接使用 this.$root 也可以，有对象触发就行；注意触发的层级以一定要高于接受的组件对象。但建议使用同一个对象，方便管理和销毁；可像原生管理通知一样处理。
		    */
			busemit() {
				this.$root.$children[0].Bus.$emit('bus', '这是 $root 实现的中央事件总线。')
			},
			
			/* 5. 访问子组价的实例或元素
		        1. 一般来讲，获取DOM元素，需document.querySelector（”id”）获取这个dom节点，然后在获取对应 id 的值. 这样就可以减少获取dom节点的消耗了。
		        2. 父子组件：不一定是自定义的两个组件，标签其实也可以看做是一个组件。若把自定义组件的事件和属性都暴露出来，这样子该组件就相当于是一个自定义的标签了。
		    */
			refbutton() {
				console.log(this.$refs.refused);
				this.$refs.refused.focus();
			},
			
			 /* 6. 依赖注入：
					1. provide 选项允许指定想要提供给后代组件的数据/方法然后在任何后代组件里，都可以使用 inject 选项来接收指定的想要添加在这个实例上的属性。我理解为自带实现接口的概念。
			        2. 实际上，可以把依赖注入看作一部分“大范围有效的 prop”，除了：祖先组件不需要知道哪些后代组件使用它提供的属性；后代组件不需要知道被注入的属性来自哪里。
			        3. 益处：不需要担心使用可能会改变/移除一些子组件依赖的东西。同时这些组件之间的接口是始终明确定义的，就和 props 一样。其使用 provie 相同于 data，inject 相同于 props。
			        4. 然而，依赖注入还是有负面影响的。它将应用目前的组件组织方式耦合了起来，使重构变得更加困难。同时所提供的属性是非响应式的。这是出于设计的考虑，因为使用它们来创建一个中心化规模化的数据跟使用 $root做这件事都是不够好的。— 小型方案可使用。使用 $parent 属性无法很好的扩展到更深层级的嵌套组件上，这是依赖优于直接访问dom的原因
			        5. vuex：若组件想要共享的属性是应用特有的，而不是通用化的，或者如果需要在祖先组件中更新所提供的数据，那么这意味着可能需要换用一个像 Vuex 这样真正的状态管理方案。
		    */
			provide() {
				this.injection = this.getprovide();
				console.log(this.injection);
			},
			inject() {
				this.injection = this.getinject();
				console.log(this.injection);
			},
		},
		mounted() {
			// 当前实例创建完成就监听这个事件
			this.$root.$children[0].Bus.$on('bus', (val) => {
				window.alert("触发Bus： " + val);
			});
			
			/* 7. 程序化的事件监听器：在 $emit 的用法，它可以被 v-on 侦听，但是 Vue 实例同时在其事件接口中提供了其它的方法。还可以：
		        1. 通过 $on(eventName, eventHandler) 侦听一个事件；通过 $once(eventName, eventHandler) 一次性侦听一个事件；通过 $off(eventName, eventHandler) 停止侦听一个事件。
		        2. 引用第三方组件，更建议使用局部变量，将创建和销毁统一在 mounted 内。通过 this.$once('hook:beforeDestroy', function () { … }) 添加 hook 钩子监听页面销毁，销毁引用组件
		    */
			var picker = new Pikaday({
			    field: this.$refs.dateInput,
			    format: 'YYYY-MM-DD',
			});
			
			this.$once('hook:beforeDestroy', function () {
			    picker.destroy()
			})
		},
		// 在组件销毁时别忘了解除事件绑定
		beforeDestroy() {
		  	this.$root.$children[0].Bus.$off('eventName')
		},
		
		/* 页面间使用 Bus
		 * 1. 注意使用后清空，避免重复调用。— $once 能确保仅仅会被调用一次，优于 $on
		 * 2. 尤其需要注意，组件A $emit事件应在beforeDestory生命周期内：避免出现第一次监听不到；下次点击监听两次的情况（已处理 $off ）— 监听两次可使用 $once
		 */
	}
</script>

<style scoped="scoped">
	@import 'http://dbushell.github.com/Pikaday/css/pikaday.css';
</style>