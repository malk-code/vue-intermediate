<template>
	<div>
		<input type="number" v-model="content" placeholder="将原生事件绑定到组件"/>
		<!--.native：在一个组件的根元素上直接监听一个原生事件，修饰v-on：当一个组件内同时存在input和button时，未加.stop修饰通过.native直接监听button事件会被调用两次-->
		<button>button</button>
		<!--4. $listeners属性：.native修饰针对的是事件。若存在相同事件标签，可使用$listeners：-->
		<button>button</button>
	</div>
</template>

<script>
	export default {
		props: ['content'],
		methods: {
			getFocus() {
//				window.alert("get focus")
			}
		}
	}
</script>

<style scoped="scoped">
	input {
		text-indent: 4px;
	}
</style>