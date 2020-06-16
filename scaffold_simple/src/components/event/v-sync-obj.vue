<template>
	<div>
		<!--3. 当props为对象时添加.sync修饰：v-bind.sycn同步无效，在组件内手动抛出是必须的。但还需要要在组件上手动同步，sync修饰属性则不需要（注意事件可以存在多个冒号拼接）-->
		<h4>sync obj: 无效，暂未解决 - 手动同步</h4>
		<label>{{ syncinfact.t1 }}:&nbsp;</label>
		<input placeholder="v-bind.sync" :value="syncinfact.prop1" @input="$emit('update:prop1', $event.target.value)" /><br />
		<label>{{ syncinfact.t2 }}:&nbsp;</label>
		<input placeholder="v-bind.sync" :value="syncinfact.prop2" @input="$emit('update:prop2', $event.target.value)" /><br />
	</div>
</template>

<script>
	export default {
		props:['syncinfact']
	}
</script>

<style>
	input {
		text-indent: 4px;
	}
</style>