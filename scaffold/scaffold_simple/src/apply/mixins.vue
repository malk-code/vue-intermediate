<template>
  <div class="main">
    <h4>混入数据</h4>
    <p>{{message}}</p>
    <p>{{replace}}</p>
    <button @click="test">混入的钩子</button>
    <hr style="margin: 10px 0">
    <h4>数据对象在内部会进行浅合并 (一层属性深度)，合并相同的属性也是组件优先；若组件内将混入的对象设置为null，混入内的对象就被清空</h4>
    <p>{{object.prop}}</p>
    <button @click="object.prop = '组件内'">混入为对象</button>
    <hr style="margin: 10px 0">
    <h4>全局混入</h4>
    <p>疑问：会调用两次</p>
  </div>
</template>

<script>
import mixins from '../utils/mixins/mixins'
// 为自定义的选项 'myOption' 注入一个处理器。
import Vue from 'vue'
Vue.mixin({
  mounted: function () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption, this)
    }
  }
})
export default {
  mixins: [mixins],
  myOption: 'hello global mixin!',
  components: {

  },
  data() {
    return {
      // 2. 选项合并：当组件和混入对象含有同名选项时，这些选项将以恰当的方式混合。比如，数据对象在内部会进行浅合并 (一层属性深度)，在和组件的数据发生冲突时以组件数据优先。—  包含组件和方法
      replace: '选项合并，组件的优先级更高。',
      object: {} // 数据对象在内部会进行浅合并 (一层属性深度)，若组件内将混入的对象设置为null，混入内的对象就被清空；对象合并相同的属性也是组件优先
      // 3. 总结：值为对象的选项，例如 methods, components 和 directives，将被混合为同一个对象。两个对象键名冲突时，取组件对象的键值对。
    }
  },
  methods: {
    test() {
      this.replace += ' ** 组件覆盖混入的钩子函数 **'
    }
  },
  computed: {},
  watch: {},
  mounted() {

  },
  // 3. 组件内和混入内的，同名钩子函数将混合为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用。  —  仅针对于钩子函数
  created() {
    console.log('组件内：')
    this.hello()
  },
}

</script>

<style scoped lang="less">
.main {
  padding: 0.1rem;
}
button {
  border: 1px solid #bcbcbc;
  padding: 4px 6px;
  margin-top: 5px;
  &:active {
    border-color: red;
  }
}
</style>
