import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const hello = resolve => require(['@/apply/welcome'], resolve);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
      		title: "Welcome"
      },
      component: hello
    },
    	{
	    	path: '/index',
	    	name: 'index',
	    	meta: {
	      	title: "首页"
	    	},
	    	component: () => import('@/apply/index').then(m => m.default)
    },
		{
		  	path: '/hellp',
		  	name: 'hello',
		  	meta: {
		  		title: "欢迎"
		  	},
		  	component: hello
		},
		{
   	 	path: "/mint-ui",
			name: "mint ui",
			meta: {
				title: "mint-ui 案例"
			},
			component: () => import('@/apply/mint-ui.vue').then(m => m.default)
    },
		
    // 孵化页面
    {
   	 	path: "/customer_manager",
			name: "customer manager",
			meta: {
				title: "客户经理"
			},
			component: () => import('../apps/customer_manager.vue').then(m => m.default)
    },
    {
   	 	path: "/manager_description",
			name: "manager description",
			meta: {
				title: "详细资料"
			},
			component: () => import('../apps/manager_description.vue').then(m => m.default)
    },
  ]
})
