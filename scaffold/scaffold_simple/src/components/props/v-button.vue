<template>
	<div>
		<!--绑定入参，绑定事件，事件抛出值：事件抛出时若直接传入props值会导致抛出事件不能接收。-- v-tex若含有子元素会导致子元素无效，优点是取不到值不会渲染出模板花括号-->
		<button class="button" v-text="button" @click="$emit('button-click', back);"></button>
		<p class="temp">{{ tmp }}</p>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				back: this.button + " - event"
			}
		},
		props: ["button", "tmp"],
		// 添加计算属性
		computed: {
			changed: function() {
				return this.back + this.button;
			}
		},
		mounted() {
			console.log(this.button);
		}
	}
</script>

<style scoped="scoped">
	.button {
		background-color: #008CBA;
		border: none;
		color: white;
		padding: 5px 30px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 18px;
		margin: 4px 2px;
		cursor: pointer;
		border-radius: 4px;
		margin-left: 25%;
		width: 50%;
	}
	.temp {
		background: #008B8B;
		text-align: center;
		color: wheat;
	}
</style>