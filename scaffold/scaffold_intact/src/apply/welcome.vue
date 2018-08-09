<template>
	<div id="app">
		<img class="logo" src="../assets/img/logo.png">
		<h1>{{ msg }}</h1>
		<h2>Essential Links</h2>

		<p class="description" v-text="description"></p>
		<p class="description, remark" v-text="remark"></p>

		<button class="remark" @click="links">To index</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				msg: 'Welcome to My Vue.js App',
				description: "Hello, it's my local server.",
				remark: "MU"
			}
		},
		methods: {
			links: function() {
				this.$router.push({
					name: 'mint ui'
				});
			},
		},
		mounted() {
			let title = (this.$route.meta.title);
			document.title = title;
		}
	}
</script>

<style scoped="scoped">
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
		font-size: 13px;
	}
	
	h1,
	h2 {
		font-weight: normal;
	}
	
	ul {
		list-style-type: none;
		padding: 0;
	}
	
	li {
		display: inline-block;
		margin: 0 10px;
	}
	
	a {
		color: #42b983;
	}
	
	.description {
		text-align: center;
		margin-top: 5%;
	}
	
	.remark {
		margin-top: 10%;
	}
</style>