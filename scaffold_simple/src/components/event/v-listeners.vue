<template>
	<!--2. .native修饰针对的是事件。若存在相同事件标签，可使用$listeners。而且如input标签，若根节点不是input，在组件上通过@focus.native会监听不到，也无报错。按钮事件不会-->
	<div>
		<label v-text="tips"></label><br />
		<!--		
		    5. 若在组件内部为input通过v-model绑定props的属性，若传入为对象，可绑定对象某个属性。不天太建议定义props为对象，难以查看对象的属性，props接收可为集合。
		    6. 虽然在自定义控件内能直接使用v-model，但这会直接在子组件内修改了父组件的值，更建议是将值抛出给父组件修改。多层可结合$attrs和$listeners，可以将组件当成标签进行使用。
		    7. 敲黑板：：若设置了 input 的 type 为 number，则录入字符时，回调通过$event.target.value的取值为空。.native可能会导致事件冲突，如43-3-1/2，点击按钮也就响应input的focus
	    -->
		<input :value="listener" placeholder="$listeners" v-on="inputListeners" /><br />
		<label>custom listener: {{ listener }}</label>
		<button @click="$emit('button-click', 'button toggle')">使用 $listeners</button>
	</div>
</template>

<script>
	export default {
		props: ["listener", "tips"],
		computed: {
			// 自己实现了$listeners
			// 4. 自定义组件包含input时，若在组件内部为input添加v-model绑定了props传入的属性，修改时会报错：直接会在子组件内修改了父组件的值，更建议是将修改事件和值抛出给父组件修改：可参考props - v-inherit
			inputListeners() {
				 var vm = this;
				 console.log(this.$listeners);
			    // `Object.assign` 将所有的对象合并为一个新对象
			    return Object.assign({},
				    // 我们从父级添加所有的监听器
			        this.$listeners,
			        // 然后我们添加自定义监听器，
			        // 或覆写一些监听器的行为
			        {
			          // 这里确保组件配合 `v-model` 的工作
			          input: function (event) {
			            vm.$emit('input', event.target.value)
			          }
			        }
			      )
			    }
			}
		}
</script>

<style>
</style>