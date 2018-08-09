<template>
	<div id="dynamic-component-demo">
	  	<!--css绑定，可直接使用判断条件，Bool值没有必要再定义方法出来：简单的方法和类型的Bool值绑定，直接在标签上即可实现方法，标签可直接访问data内数据，即省略了this-->
	  	<button
		   	v-for="tab in tabs"
		    	v-bind:key="tab"
		    	v-bind:class="['tab-button', { active: currentTab === tab }]"
		    	v-on:click="currentTab = tab">
		    {{ tab }}
	  	</button>
	  	<!--组件消失，不会失活，下次使用会保存之前的状态，没有改标签则会每次重新渲染：就是原生全局控件和局部控件使用区别-->
	 	<keep-alive>
		   	<component
		      	v-bind:is="currentTabComponent"
		      	class="tab" >
		    </component>
	  	</keep-alive>
  	    <!--3. 动态组件切换
	        1. 模块组件的局部注册，在 ES2015+ 中，在对象中放一个类似 ComponentA 的变量名其实是 ComponentA: ComponentA 的缩写。
	        2. 通过 v-bind:is 绑定需要显示的组件，在components 声明需要切换的组件，若组件为导入的自定义组件，则需要未组件添加key来实现，但这导致不能实现组件的传参。
	        3. 传值：变通1，可能需要将多个组件定义为一个template，在当前组件内进行取值；变通2：注册为全局组件，通过 import Vue from 'vue'; 导入Vue，来创建对象即可实现传参。
	    -->
	    <br />
	  	<h4>为模板设置了一个key，作为组件切换，但这如何传值呢？</h4>
	  	<p>
       		传值：变通1，将多个组件分别定义为template在当前组件；变通2：注册为全局组件，通过 import Vue from 'vue'; 导入Vue来创建对象即可实现传参。变通3：自定义构造器。
	  	</p>
	</div>
</template>

<script>
	import postcontent from './v-keep-alive-postcontent.vue';
	
	export default {
		data() {
			return {
				currentTab: 'Posts',
    				tabs: ['Posts', 'Archive']
			}
		},
		computed: {
		    currentTabComponent: function () {
			    	let comp = 'tab-' + this.currentTab.toLowerCase();
			    	console.log(comp);
			     return comp;
		    }
		},
		components: {
			
			// 为组件添加一个key，作为组件切换
			// 3. 在组件的 component 上指定需要动态切换的模板/组件，再通过 v-bind:is 绑定需要显示的组件。 一般import 一个组件，会直接将组件名称声明在components内，不加key。此处要加
			'tab-posts': postcontent,
			'tab-archive': {
				template: '<div>Archive component</div>' 
			},
		},
	}
</script>

<style scoped="scoped">
.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
	}
	.tab-button:hover {
	  background: #e0e0e0;
	}
	.tab-button.active {
	  background: #e0e0e0;
	}
	.tab {
	  border: 1px solid #ccc;
	  padding: 10px;
	}
</style>