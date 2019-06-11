<template>
  <!-- https://itbilu.com/javascript/js/EJUYxg_7b.html -->
  <!-- https://www.cnblogs.com/zhangrunhao/p/7660931.html -->
  <div class="main">
    <a href="https://www.cnblogs.com/zhangrunhao/p/7660931.html">
      <h2>Object.defineProperty</h2>
      <p>主要功能就是用来定义或修改这些内部属性</p>
    </a>
    <section>
      <h4>1. 数据描述</h4>
      <p>当修改或定义对象的时候, 给属性添加一些特性</p>
      <h4>注意</h4>
      <p>一旦使用Objec.defineProperty给对象添加属性, 如果不设置属性的话, 那么configuable, enumerable, writable这些都是默认的false；</p>
      <p><strong>不能被枚举, 不能被重写, 不能被再次更改属性</strong></p>
    </section>
    <hr>
    <section>
      <h4>2. 存取器描述</h4>
      <p>当使用存取器描述特性的时候, 允许使用以下特性属性:</p>
      <p>1. 当使用了getter或者setter方法, 不允许使用writable和value这两个属性</p>
      <p>2. getter/setter：当设置或获取某个对象的属性值的时候, 可以提供getter/setter方法。getter: 是一种获取值的方法；setter: 是一种设置值的方法</p>
      <h4>注意</h4>
      <p><strong>1. get/set不必成对出现, 任写其一就可以. 如果设置不方便, 则get和set的默认值为undeifend</strong></p>
      <p><strong>2. 设置值的时候, 触发set方法，此时属性已经修改了，不同于iOS还需要手动赋值</strong></p>
    </section>
    <hr>
    <section>
      <h4>兼容性</h4>
      <p>在IE8下只能对DOM对象使用, 如果对原生对象使用Object.defineProtry()会报错</p>
    </section>
    <hr>
    <section>
      <h4>备注</h4>
      <p>Object.defineProperty和Object.defineProperties用于定义或修改对象的属性，是ECMAScript 5中定义的两个方法。通过两个方法我可以定义对象的数据属性或访问器属性，前者用于定义或修改对象的一个属性，后者用于定义或修改多个属性。</p>
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

    // ====== 1. 数据描述 ======

    var obj = {
      test: 'hello'
    }

    // 对象已有的属相添加特性描述
    Object.defineProperty(obj, 'test', {
      configurable: true | false,
      enumerable: true | false,
      value: `任意类型的值`,
      writable: true | false
    })

    // 对象新添加的属性描述
    Object.defineProperty(obj, 'newKey', {
      // configurable：目标属性是否可以被删除，目标属性的特性是否可以被再次修改. 默认false, 不可删除与修改
      configurable: true | false,
      // enumerable：此属性是否可以枚举(使用for...in或者Object.keys). 默认为false: 不可枚举
      enumerable: true | false,
      // value：属性对应的值, 可以为任意类型的值. 默认: undefined
      value: `任意类型的值`,
      // writable：属性的是否可以被重写. 默认false, 不能被重写.
      writable: true | false
    })

    console.log('数据描述', obj)
    obj.test = 'test'
    obj.newKey = 'newKey'
    console.log('数据描述', obj)

    // ====== 2. 存取器描述 ======

    // 在特性中使用get/set属性来定义对应的方法
    var obj = {}
    var initVlue = 'hello'
    // get/set不必成对出现, 任写其一就可以. 如果设置不方便, 则get和set的默认值为undeifend
    Object.defineProperty(obj, 'newKey', {
      get: function () {
        // 当获取值的时候, 触发这个函数
        return initVlue
      },
      set: function (value) {
        // 设置值的时候, 触发这个函数 ：：：这里newKey已经修改了，不同于iOS还需要手动赋值
        initVlue = value
      },
    })
    // 获取值
    console.log("存取器描述", obj.newKey, initVlue) // hello
    obj.newKey = 'change'
    console.log('存取器描述', initVlue, obj.newKey)// change

    // Object的defineProperty和defineProperties这两个方法在js中的重要性十分重要，主要功能就是用来定义或修改这些内部属性,
    // 与之相对应的getOwnPropertyDescriptor和getOwnPropertyDescriptors就是获取这行内部属性的描述。
    var desc = Object.getOwnPropertyDescriptor(obj, 'newKey');
    console.log("defineProperty - getOwnPropertyDescriptor", desc)


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
