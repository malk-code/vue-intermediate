<template>
	<div>
		<!--		
		    5. 若在组件内部为input通过v-model绑定props的属性，若传入为对象，可绑定对象某个属性。不天太建议定义props为对象，难以查看对象的属性，props接收可为集合。
		    6. 虽然在自定义控件内能直接使用v-model，但这会直接在子组件内修改了父组件的值，更建议是将值抛出给父组件修改。多层可结合$attrs和$listeners，可以将组件当成标签进行使用。
		    7. 敲黑板：：若设置了 input 的 type 为 number，则录入字符时，回调通过$event.target.value的取值为空。.native可能会导致事件冲突，如43-3-1/2，点击按钮也就响应input的focus
	    -->
<!--		<input placeholder="update:my-prop-name" :value="sync.prop" @input="$emit('changed', $event.target.value)" />-->	
		<label>{{ sync.t1 }}:&nbsp;</label>
		<input placeholder="$emit('my-event', value)" :value="sync.prop" @input="changed" />
		<br />
		<!--1. 不建议在组件内直接使用v-model，因为这导致会直接在子组件内修改了父组件的值，导致维护问题，更建议是将值抛出给父组件修改。建议事件方法名称格式：名称:属性-->
		<label>{{ sync.t2 }}:&nbsp;</label>
		<input placeholder="update:my-prop-name" :value="sync.propsync" @input="$emit('update:data', $event.target.value)" />
		<br />
		<label>{{ sync.t3 }}:&nbsp;</label>
		<input placeholder="v-model" v-model="sync.propmodel" />
		<br />
		<!--2. 在组件上绑定属性添加.sync修饰符，组件内部写法相同（没有使用 v-model），依然需要绑定value，依然需要抛出value。只是在组件上不需要在实现数据同步，@抛出事件:属性-->
		<h4>sync prop: </h4>
		<label>{{ sync.t4 }}:&nbsp;</label>
		<input placeholder="v-bind:prop.sync" :value="syncprop" @input="$emit('update:syncprop', $event.target.value)" /><br />
        <!--3. 当props为对象时添加.sync修饰：v-bind.sycn同步无效，在组件内手动抛出是必须的。但还需要要在组件上手动同步，sync修饰属性则不需要（注意事件可以存在多个冒号拼接）-->
		<h4>sync obj: 无效，暂未解决</h4>
		<label>{{ syncinfact.t1 }}:&nbsp;</label>
		<input placeholder="v-bind.sync" :value="syncinfact.prop1" @input="$emit('update:syncinfact:prop1', $event.target.value)" /><br />
		<label>{{ syncinfact.t2 }}:&nbsp;</label>
		<input placeholder="v-bind.sync" :value="syncinfact.prop2" @input="$emit('update:prop2', $event.target.value)" /><br />
	</div>
</template>

<script>
	export default {
		props: ["sync", 'syncprop', "syncinfact"],
		methods: {
			changed(event) {
				this.$emit('changed', event.target.value)
			}
		}
	}
</script>

<style scoped="scoped">
	input {
		text-indent: 4px;
	}
</style>