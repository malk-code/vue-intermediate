<template>
  <edgecircle inline-template>
    <div>
      <!--
		    		2. 内联模板 1：使用inline-template特性，这和作用域插槽很像，只是作用域插槽是集合v-for来使用的。
		            1. 使用：当 inline-template 这个特殊的特性出现在一个子组件上时，这个组件将会使用其里面的内容作为模板，而不是将其作为被分发的内容。这使得模板的撰写工作更加灵活
		            2. 缺点：inline-template 会让模板的作用域变得更加难以理解。所以作为最佳实践，请在组件内优先选择 template 选项或 .vue 文件里的一个 <template> 元素来定义模板。
		            3. 因此：组件作为内联模板，组件本身模板会被替换掉，但仅仅是模板会被替换。其次组件作为内联模板，那其实也就是一个 template 标签，因此在布局时也只能有一个根节点
		    -->
      <p>
        <b>内联模板 1:</b><br />
        和作用域插槽很像，只是作用域插槽是集合v-for来使用的。<br />
        将组件作为内联模板，组件本身模板会被替换掉，但仅仅是模板会被替换。其次组件作为内联模板，那其实也就是一个 template 标签，因此在创建布局时只能有一个根节点。
      </p>
      <br />
      替换模板，引用之前模板的数据：
      <p>
        {{ inline }} &nbsp;&nbsp;
        <button @click="showinline">showinline</button>
      </p>
      <br />
      <!--
				3. 内联模板 2：使用 x-tempate 特性
					1. 在一个 script 元素中，并为其带上 text/x-template 的类型，然后通过一个 id 将模板引用过去，可以用于模板特别大的 demo 或极小型的应用。但是其它情况下请避免使用：
					2. 因为这会将模板和该组件的其它定义分离开（ inline-template 也是），但它允许使用适当的 HTML 标记编写需要的 HTML。因为 Vue 是 SPA，因此 script 添加在 index.html
			-->
      <p>
        <b>内联模板 2:</b><br />
        1. 模板 7 种 https://www.w3cplus.com/vue/seven-ways-to-define-a-component-template-by-vuejs.html 字符串/模板字面量/x-template/内联模板/render 函数/JSF/单文件组件。
        <br /><br />
        引用 x-template 模板
        <hello-world></hello-world>
      </p>
    </div>
  </edgecircle>
</template>

<script>
import Vue from 'vue';

Vue.component('hello-world', {
  template: '#hello-world-template'
});

export default {
  components: {
    edgecircle: () => System.import('./v-edge-circle.vue'),
  }
}
</script>

<style>
</style>
