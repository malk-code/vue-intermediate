function getIntroRoot(intro) {
	return "http://47.100.123.138:91/learn-basics/" + intro + ".html";
}

module.exports = {
	component: [{
			id: 1,
			path: '/',
			name: 'index',
			title: "介绍页",

		},
		{
			id: 2,
			path: '/index',
			name: 'home',
			title: "首页",
			isIndex: true
		},
		{
			id: 3,
			path: '/router',
			name: 'router',
			title: "路由"
		},
		{
			id: 4,
			path: "/props",
			name: "props",
			title: "属性",
		},
		{
			id: 5,
			path: "/event",
			name: "event",
			title: "事件"
		},
		{
			id: 6,
			path: "/slot",
			name: "slot",
			title: "插槽"
		},
		{
			id: 7,
			path: "/comp",
			name: "comp",
			title: "组件"

		},
		{
			id: 8,
			path: "/edge",
			name: "edge",
			title: "边界"

		},
		{
			id: 9,
			path: "/edge-comp",
			name: "edge comp",
			title: "边界组件"
		},
		{
			id: 10,
			path: "/vux-plugin",
			name: "vux plugin",
			title: "vux 库"
    },
    {
			id: 11,
			path: "/nested-router",
			name: "/nested-router",
			title: "嵌套路由"
		}
	],
	introduction: [{
			id: 1,
			order: getIntroRoot('1-introduction'),
			title: "入门索引",

		},
		{
			id: 2,
			order: getIntroRoot('2-sample'),
			title: "测试案例",

		},
		{
			id: 3,
			order: getIntroRoot('3-template'),
			title: "模板语法",

		},
		{
			id: 4,
			order: getIntroRoot('4-computed'),
			title: "计算属性",

		},
		{
			id: 5,
			order: getIntroRoot('5-class&style_binding'),
			title: "类型绑定",

		},
		{
			id: 6,
			order: getIntroRoot('6-condition_renderer'),
			title: "条件渲染",

		},
		{
			id: 7,
			order: getIntroRoot('7-list'),
			title: "列表操作",

		},
		{
			id: 8,
			order: getIntroRoot('8-events'),
			title: "事件处理",

		},
		{
			id: 9,
			order: getIntroRoot('9-components'),
			title: "组件基础",

		},
	],
	transition: [{
			path: '/transition',
			name: 'transition',
			title: "过渡",
		},
		{
			path: '/animation',
			name: 'animation',
			title: "动画",
		}
	],
	reusability_composition: [{
		path: '/filter',
		name: 'filter',
		title: "过滤器",
	}],
	tool: [{
		path: '/animation',
		name: 'animation',
		title: "动画",
	}],
	scale: [{
		path: "/vuex-store",
		name: "vuex store",
		title: "vuex store"
	}],
	other: [{
		id: 3,
		path: '/login',
		name: 'login',
		title: "登录-注册"
	}]
}
