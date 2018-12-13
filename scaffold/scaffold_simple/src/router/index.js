import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* 路由配置
	1. 在 npm install 完成后，执行 cnpm install vue-router vue-resource --save，安装 vue 路由模块vue-router和网络请求模块vue-resource
	2. 在 src 下新建 router 文件夹，新建一个 index.js 文件来处理路由。懒加载可用 require 和 import() 方案，首页可用声明式加载，切记不要对同一个组件使用两种加载方式
	3. 使用路由需要：1. 导入依赖和使用路由，再导出配置的路由对象；2. 在 main.js 内引用新增的路由文件给 App；3. 将App.vue 作为路由切换站点。配置 router-view 标签
	4. 访问路由配置信息：如设置页面标题，mounted() {  let title = (this.$route.meta.title);  document.title = title;  }，$route 可访问到当前页面在路由中配置信息
*/
const intro = () => import('../apply/intro.vue')

// 嵌套路由
import nested from '../components/router/NestedNamedViews/nested'
import named from '../components/router/NestedNamedViews/named'
import views from '../components/router/NestedNamedViews/views'

export default new Router({
  routes: [
    // 组件进阶
    {
      path: '/',
      name: 'home',
      meta: {
        title: '介绍页'
      },
      component: intro
    },
    {
      path: '/index',
      name: 'index',
      meta: {
        title: '首页'
      },
      component: () => import('../apply/index.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录-注册'
      },
      // 动态组件/按需加载，完整版本带有 babel-plugin-transform-runtime： 如 let login = component: () => import('../apply/login.vue').then(m => m.default)
      component: () => import('../apply/login.vue')
    },
    {
      path: '/intro',
      name: 'intro',
      meta: {
        title: '引导'
      },
      component: intro
    },
    {
      path: '/router',
      name: 'router',
      meta: {
        title: '路由'
      },
      component: () => import('../apply/router.vue')
    },
    {
      path: '/props',
      name: 'props',
      meta: {
        title: '属性'
      },
      component: () => import('../apply/props.vue')
    },
    {
      path: '/event',
      name: 'event',
      meta: {
        title: '事件'
      },
      component: () => import('../apply/event.vue')
    },
    {
      path: '/slot',
      name: 'slot',
      meta: {
        title: '插槽'
      },
      component: resolve => require(['../apply/slot.vue'], resolve)
    },
    {
      path: '/comp',
      name: 'comp',
      meta: {
        title: '组件'
      },
      // 14. import 是模板编译指令，会提升到文件顶部执行，且是编译期运行，import() 是运行时异步加载函数，返回一个promise，require 也是运行时加载，但是同步加载。
      component: resolve => require(['../apply/comp.vue'], resolve)
    },
    {
      path: '/edge',
      name: 'edge',
      meta: {
        title: '边界'
      },
      component: function(resolve) {
        require(['../apply/edge.vue'], resolve)
      }
    },
    {
      path: '/edge-comp',
      name: 'edge-comp',
      meta: {
        title: '边界组件'
      },
      component: function(resolve) {
        require(['../apply/edge-comp.vue'], resolve)
      }
    },
    {
      path: '/vux-plugin',
      name: 'vux plugin',
      meta: {
        title: 'vux 库'
      },
      component: () => import('../apply/vux-plugin.vue')
    },
    {
      path: '/nested-router',
      name: 'nested-router',
      meta: {
        title: '嵌套路由'
      },
      component: () => import('../apply/nested-router.vue'),
      children: [
        {
          path: '/nested-router/nested',
          name: 'nested',
          meta: {
            title: '命名路由'
          },
          components: {
            default: () => import('../components/router/NestedNamedViews'),
            nested,
            named,
            views
          }
        },
        {
          path: '/nested-router/second',
          name: 'second',
          meta: {
            title: '二级路由'
          },
          component: () => import('../components/router/NestedSecondViews')
        }
      ]
    },

    // 过渡动画 - vue 文件夹不能有数字
    {
      path: '/transition',
      name: 'transition',
      meta: {
        title: '过渡'
      },
      component: () => import('../apply/transition.vue').then(m => m.default)
    },
    {
      path: '/animation',
      name: 'animation',
      meta: {
        title: '动画'
      },
      component: () => import('../apply/transition.vue').then(m => m.default)
    },

    // 可复用性和组合
    {
      path: '/filter',
      name: 'filter',
      meta: {
        title: '过滤器'
      },
      component: () => import('../apply/filter.vue').then(m => m.default)
    },

    // 工具

    // 规模化
    {
      path: '/vuex-store',
      name: 'vuex store',
      meta: {
        title: 'vuex store'
      },
      component: () => import('../apply/vuex-store.vue') // vuex 状态管理
    },

    // 内在

    // 孵化页面
    {
      path: '/customer_manager',
      name: 'customer manager',
      meta: {
        title: '客户经理'
      },
      component: () =>
        import('../apps/customer_manager.vue').then(m => m.default)
    },
    {
      path: '/manager_description',
      name: 'manager description',
      meta: {
        title: '详细资料'
      },
      component: () =>
        import('../apps/manager_description.vue').then(m => m.default)
    }
  ]
})
