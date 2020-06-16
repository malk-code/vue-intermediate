<template>
  <div class="main">
    <h4><a href="https://cn.vuejs.org/v2/guide/reactivity.html">深入响应式原理：官网</a></h4>
    <router-link to="inherent">如何追踪变化：Objec.defineProperty</router-link>
    <section>
      <h4>检测变化的注意事项</h4>
      <p><strong>成因：</strong></p>
      <p>1. 受现代 JavaScript 的限制 (而且 Object.observe 也已经被废弃)，Vue 不能检测到对象属性的添加或删除。</p>
      <p>2. 由于 Vue 会在初始化实例时对属性执行 getter/setter 转化过程，所以属性必须在 data 对象上存在才能让 Vue 转换它，这样才能让它是响应的。</p>
      <p><strong>方案：</strong></p>
      <p>Vue 不允许在已经创建的实例上动态添加新的根级响应式属性 (root-level reactive property)</p>
      <p>1. 它可以使用 Vue.set(object, key, value) 方法将响应属性添加到嵌套的对象上: Vue.set(vm.someObject, 'b', 2)</p>
      <p>2. 还可以使用 vm.$set 实例方法，这也是全局 Vue.set 方法的别名：this.$set(this.someObject,'b',2)</p>
      <p>3. 有时你想向一个已有对象添加多个属性，例如使用 Object.assign() 或 _.extend() 方法来添加属性。但是，这样添加到对象上的新属性不会触发更新。在这种情况下可以创建一个新的对象，让它包含原对象的属性和新的属性：</p>
    </section>
    <hr>
    <section>
      <h4>声明响应式属性</h4>
      <p>1. 由于 Vue 不允许动态添加根级响应式属性，所以你必须在初始化实例前声明根级响应式属性，哪怕只是一个空值<strong>（只要对象的key存在即可）</strong></p>
      <p>2. 如果你未在 data 选项中声明 message，Vue 将警告你渲染函数正在试图访问的属性不存在。</p>
      <h4>考量：</h4>
      <p>1. 它消除了在依赖项跟踪系统中的一类边界情况，也使 Vue 实例在类型检查系统的帮助下运行的更高效。</p>
      <p>2. 在代码可维护性方面也有一点重要的考虑：data 对象就像组件状态的概要，提前声明所有的响应式属性，可以让组件代码在以后重新阅读或其他开发人员阅读时更易于被理解。</p>
    </section>
    <hr>
    <section>
      <h4>异步更新队列 </h4>
      <p>1. Vue 异步执行 DOM 更新。只要观察到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。</p>
      <p>2. 如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。</p>
      <p>3. 在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部尝试对异步队列使用原生的 Promise.then 和 MessageChannel，如果执行环境不支持，会采用 setTimeout(fn, 0) 代替。</p>
      <h4>方案：</h4>
      <p>为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用 Vue.nextTick(callback) 。这样回调函数在 DOM 更新完成后就会调用。<strong>（避免直接接触 DOM）</strong></p>
      <h4>语法：</h4>
      <p>1. 在组件内使用 vm.$nextTick() 实例方法特别方便，因为它不需要全局 Vue ，并且回调函数中的 this 将自动绑定到当前的 Vue 实例上</p>
      <p>2. 因为 $nextTick() 返回一个 Promise 对象，所以你可以使用新的 ES2016 async/await 语法完成相同的事情：在async方法内，<strong>// 未更新</strong> await this.$nextTick() <strong>// 已更新</strong></p>
    </section>
  </div>
</template>

<script>
export default {
  components: {

  },
  data() {
    return {

    }
  },
  methods: {

  },
  computed: {},
  watch: {},
  mounted() {


  },


}

</script>

<style scoped lang="less">
.main {
  padding: 0.1rem;
}
h2,
h4 {
  padding: 0.1rem 0;
}
p {
  padding: 0.05rem 0;
}
hr {
  margin: 0.05rem 0;
}
</style>
