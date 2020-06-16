<template>
  <div class="main">
    <h4>自定义指令</h4>
    <!-- .后面是修饰器，:后面是传给指令的参数，两者的参数名不能相同，且修饰器需要在传参之后 -->
    <input
      type="text"
      placeholder="custom-directive"
      v-focus:bar.foo='1+1'
    >
    <hr style='margin: 10px 0'>
    <h4>钩子函数参数</h4>
    <div v-demo:foo.a.b="message"></div>
    <hr style='margin: 10px 0'>
    <h4>函数简写</h4>
    <p v-color-swatch='color'>实现指令时直接在后面跟方法：不区分钩子，在 bind 和 update 时触发相同行为</p>
    <hr style='margin: 10px 0'>
    <h4>对象字面量</h4>
    <p v-obj="object">如果指令需要多个值，可以传入一个 JavaScript 对象字面量。记住，指令函数能够接受所有合法的 JavaScript 表达式。</p>
  </div>
</template>

<script>
export default {
  components: {

  },
  data() {
    return {
      message: 'hello!',
      color: 'red',
      object: {
        color: '#fff',
        backgroundColor: 'blue',
        padding: '10px'
      }
    }
  },
  // 除了 el 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 dataset 来进行。
  // HTMLElement.dataset属性允许无论是在读取模式和写入模式下访问在 HTML或 DOM中的元素上设置的所有自定义数据属性(data-*)集。
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el, binding, vnode, oldVnode) {
        el.focus()
        console.log(el, binding, vnode, oldVnode)
      }
    },
    demo: {
      bind: function (el, binding, vnode) {
        var s = JSON.stringify
        el.innerHTML =
          'name: ' + s(binding.name) + '<br>' +
          'value: ' + s(binding.value) + '<br>' +
          'expression: ' + s(binding.expression) + '<br>' +
          'argument: ' + s(binding.arg) + '<br>' +
          'modifiers: ' + s(binding.modifiers) + '<br>' +
          'vnode keys: ' + Object.keys(vnode).join(', ')
      }
    },
    // 函数的简写
    'color-swatch'(el, binding) {
      el.style.backgroundColor = binding.value
    },
    // 对象字面量
    obj(el, binding) {
      for (let key in binding.value) {
        console.log(key)
        el.style[key] = binding.value[key]
      }
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
  padding: 10px;
  input {
    background-color: #f4f4f4;
  }
}
</style>
