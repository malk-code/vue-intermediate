<template>
	<div class="main">
		<h2>router</h2>
		<router-link class="router" to="temp1">left</router-link>
		<router-link class="router" to="temp2">right</router-link>

		<router-view></router-view>
	</div>
</template>

<script>
	import Vue from 'vue';
	import Router from 'vue-router';

//	import temp1 from './apply/login.vue'
//	import temp2 form './apply/intro.vue'
	const temp1 = { template: '<div>foo</div>' }
	const temp2 = { template: '<div>bar</div>' }

	const routes = [
	  { path: '/login', component: temp1 },
	  { path: '/intro', component: temp2 }
	]

//	const router = new VueRouter({
//	  routes // （缩写）相当于 routes: routes
//	})

	export default {
//		router: router,
		data() {
			return {

			}
		}
	}
</script>

<style>
	h2 {
		text-align: center;
		margin: .2rem;
	}

	.main {
		height: 6.48rem;
		background: #FFFFFF;
	}

	.router {
		width: 50%;
		text-align: center;
	}

</style>
