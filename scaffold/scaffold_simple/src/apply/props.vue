<template>
  <div class="main">
    <h3>导入自定义组件:</h3>
    <!--实现了绑定入参，绑定事件，事件抛出值-->
    <VButton
      :button="button.title1"
      @button-click="buttonClick($event)"
    ></VButton>
    <VButton
      v-bind:button="button.title2"
      v-on:button-click="buttonClick($event)"
    ></VButton>
    <!--13. 组件props：若直接传入不能使用冒号；冒号是绑定传入：显示和数据是同步的。它们在组件内都能通过props取到值。props支持多参，支持传入对象，可为传入对象的属性添加验证-->
    <VButton
      button="直接传入值"
      v-on:button-click="buttonClick($event)"
    ></VButton>
    <!--弱类型，可传入其他类型，如44: 支持多参-->
    <VButton
      button="false"
      tmp="和上面的控件是同一个组件"
      v-on:button-click="buttonClick($event)"
    ></VButton>
    <!--6. props：支持多参，可做参数验证，尤其是开放为公共组件时尤其有用。自定义组件在绑定时，v-bind可省略，直接使用 :设置的props，若为点击事件，可直接使用@自定义的事件名称-->
    <h3>props 多参验证:</h3>
    <VProps
      :propA="props.propA"
      :propB="props.propB"
      :propC="props.propC"
      :propD="props.propD"
      :propE="props.propE"
      :propF="props.propF"
      :propP="props.propP"
    >
    </VProps>
    <h3>组件其它特性</h3>
    <!--8. 非 Prop 的特性：导当属性传向一个组件，但是组件并没有相应 prop 定义的特性。因为显式定义的 prop 适用于向一个子组件传入信息，然而组件库的并不总能预见组件使用的场景。这也是为什么组件可以接受任意的特性，而这些特性会被添加到这个组件的根元素上。— 在 mounted 内通过 this.$el.getAttribute(‘新增属性’) 可以获取到新增的未依赖 props 注入的值。-->
    <div class="input">
      <!--
		    5. 若在组件内部为input通过v-model绑定props的属性，若传入为对象，可绑定对象某个属性。不天太建议定义props为对象，难以查看对象的属性，props接收可为集合。
		    6. 虽然在自定义控件内能直接使用v-model，但这会直接在子组件内修改了父组件的值，更建议是将值抛出给父组件修改。多层可结合$attrs和$listeners，可以将组件当成标签进行使用。
		    7. 敲黑板：：若设置了 input 的 type 为 number，则录入字符时，回调通过$event.target.value的取值为空。.native可能会导致事件冲突，如43-3-1/2，点击按钮也就响应input的focus
	    -->
      <VInput
        :obj="input"
        data-add="add data not depended props"
        @input="objmodified = $event"
      >
      </VInput>
      <label>v-model: {{ objmodified }}</label>
    </div>
    <!--
		    10. 跨组件传值和事件的方式之一：inheritAttrs，$attrs和$listener —— 定义基础组件时很有用
	        1. inheritAttrs：禁用特性继承，默认情况下父作用域的不被认作 props 的特性绑定 (attribute bindings) 将会“回退”且作为普通的 HTML 特性应用在子组件的根元素上。当撰写包裹一个目标元素或另一个组件的组件时，这可能不会总是符合预期行为。通过设置 inheritAttrs 到 false，这些默认行为将会被去掉。—— 去掉组件的根元素继承特性，结合$attrs传值
	        2. $attrs：跨组件值传递，包含了父作用域中不被认为 (且不预期为) props 的特性绑定 (class 和 style 除外)。—— 组件传入绑定值未被上级组件props绑定，则可通过$attrs继续传递
	        3. $listener：跨组件事件传递，包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。可在底层组件直接抛出组件的事件，在上层组件中 v-on="$listeners" 继续往上抛出。
	        4. 参考：www.jb51.net/article/132371.htm —  $attrs通过 v-bind="$attrs" 继续传递，若所有的属性都被上层组件props所绑定，那获取到就是空的对象。绑定均在它的上层组件进行
		-->
    <VBaseInput
      class="baseInput"
      :title="baseinput.title"
      :content="baseinput.content"
      :placeholder="baseinput.placeholder"
      @click-button="inputButtonClick($event)"
      :child="baseinput.child"
    >
    </VBaseInput>

  </div>
</template>

<script>
import VButton from "../components/props/v-button";
import VProps from "../components/props/v-props.vue"
import VInput from "../components/props/v-input.vue"
import VBaseInput from "../components/props/v-inherit.vue"

export default {
  data() {
    return {
      button: {
        title1: "button comp1",
        title2: "button comp2"
      },
      props: {
        propA: 99,
        propB: "string or number",
        propC: "required string",
        propD: 100,
        propE: {
          message: 'hello proE'
        },
        propF: "success",
        propP: new window.person("x", "xx")
      },
      input: {
        title: "comp",
        content: "",
        placeholder: "v-model"
      },
      baseinput: {
        title: "comp",
        content: "",
        placeholder: "v-model",
        child: {
          child: "this is to children when base not used!",
        }
      },
      //4. 若在组件内部为input通过v-model绑定props的属性，修改时会报错，且若是对象修改无效，不报错。因此不建议传入props为对象，难以查看props，且自定义v-model时数据抛不出
      //5. 虽然在自定义控件内能直接使用v-model，但这会直接在子组件内修改了父组件的值，更建议是将值抛出给父组件修改。多层可结合$attrs和$listeners，可以将组件当成标签进行使用。
      objmodified: "尤其需要注意的点啊"
    }
  },
  // 引用的组件
  components: {
    VButton,
    VProps,
    VInput,
    VBaseInput
  },
  methods: {
    buttonClick: function (ev) {
      window.alert(ev);
    },
    inputButtonClick: function (event) {
      alert(event)
    }
  },
  mounted() {
    let title = (this.$route.meta.title);
    document.title = title;
  }
}
</script>

<style scoped="scoped">
.main {
  margin: 0.1rem;
  background: #ffffff;
}
h3 {
  margin-top: 0.15rem;
}
/*9. 替换/合并已有的特性：自定义组件当传入外部样式calss或style时，不会直接内部样式替换掉。而是会整合外部样式+内部样式。注意：相同属性组件内部的样式优先级高。*/
.input {
  background-color: #ebecee;
  padding: 0.05rem 0.1rem;
  color: #008b8b;
}
.baseInput {
  /*text-align: center;*/
}
</style>
