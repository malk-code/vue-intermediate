<template>
	<!--所有页面都作为App.vue的router-view-->
	<div>
		<x-header :left-options="{ showBack:iscanback }" :title="$route.meta.title" v-if="hasheader"></x-header>
		<router-view @header-state='updateHeader'></router-view>
	</div>
</template>

<script>
	import { XHeader } from 'vux';

	import Vue from 'vue';

	export default {
		//引入的组件
		components: {
			XHeader,
		},

		// 48. 处理边界情况：在绝大多数情况下，最好不要触达另一个组件实例内部或手动操作 DOM 元素。

		// comp.vue 访问 $root / $parent 测试
		data() {
			return {
				// 1. $root：测试发现，$root取到的值是路由节点的，需要再取 $children 的第0个元素。若存在路由情况时，得到App.Vue，因为App.Vue 配置了 router-view；没有路由则得到当前组件
				roots: 'app vue root prop',
				/* 2. 中央事件总线
					1. 由 $root 特性，可在App.vue内设置中央事件总线，但一般设置在window对象上。通过 $emit 和 $on 触发和接收，第一位入参为约定名称。在 beforeDestroy 通过  $off 关闭监听
					2. $root 实现：在App.vue 内新增一个属性，赋值为一个空的 Vue 对象。 空的实例放到根组件下，所有的子组件都能调用：使用 new Vue()，需要先导入 import Vue from 'vue'; 
					3. 测试发现，直接使用 this.$root 也可以，有对象触发就行；注意触发的层级以一定要高于接受的组件对象。但建议使用同一个对象，方便管理和销毁；可像原生管理通知一样处理。
		   	 	*/
				Bus: new Vue(), // 空的实例放到根组件下，所有的子组件都能调用：使用 new Vue()，需要先导入 import Vue from 'vue'; 

				iscanback: true,
				hasheader: true,
			}
		},
		methods: {
			showroot() {
				window.alert('I\'m app vue root.');
			},

			// 处理全局导航栏状态，事件流
			updateHeader(obj) {
				this.hasheader = obj.hasheader;
				this.iscanback = obj.iscanback;
			}
		},
		// 处理全局导航栏状态，依赖注入
		provide() {
			return {
				//	  			headerState: this.updateHeader,
				headerState: (obj) => {
					this.hasheader = obj.hasheader;
					this.iscanback = obj.iscanback;
				},
			}
		},
	}
</script>

<style lang="less">
	/*vux可选配置3：引入 reset.less，默认样式不包含reset，并且部分用户自己有一套reset样式，因此需要在App.vue进行手动引入*/
	
	@import '~vux/src/styles/reset.less';
	body {
		background-color: white;
		font-size: 15px;
	}
	/*2. img 标签无法点击问题，在 iOS 端，可能需要将图片的 cursor 设置为 pointer —  cursor: pointer;  -- 在 App.vue 内设置 img（App.vue 样式的不为 scoped）。*/
	
	img {
		cursor: pointer;
	}
	
	html,
	body,
	#app {
		height: 100%;
	}
</style>