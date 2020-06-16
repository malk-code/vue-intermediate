<template>
  <!--
	55. 过滤器
	    1. 在不改变的data 的情况下  输出需要的格式数据。以管道 | 的方式进行分发，对数据的显示做格式化。有全局和局部注册方式
	    2. vue 2.0 不再支持自带过滤器
	        1. vue.js在2.0版本中，相对于1.0版本做了比较大的改动，2.0版本中，过滤器只用于插入文本中({{}})。1.0版本中指令(如：v-for,v-on等)里边的过滤器现在都放在计算属性中。
	        2. 调用方式：同时1.0版本中的所有内置过滤器(如:capitalize等)全部取消了。2.0里过滤器只能用类似函数的写法 xx( ‘xx‘)，括号内是参数，不同于 1.0 用空格后加参数的写法。
	        3. 2.0 对于集合不再支持 filterBy/orderBy：
	            1. filterBy：对于集合的过滤可使用集合的计算属性，在不改变原集合时，返回一个筛选的副本，实现过滤器效果  — 显示过滤/排序结果 27.4；10.4 计算属性返回 $refs。
	            2. orderBy：排序需要通过 js 原生的 sort 来实现，注意的是排序方法必须为写在 export default 外，不能在 vue 对象的 methods 内：会无效。逆序：reverse() 方法。
	    3. 过滤器第一个参数必须为自身的值，后面可以加任意多的参数。2.0 语法和调用方法一致，但传入的第一个参数在过滤器内是对应第二个参数：自身作为第一个入参是默认的，可不传。
	    4. v-text里用过滤器失效，原因是在vue2.0里 管道符‘|’只能用在mousetache“双花括号”和v-bind中： v-bind:href=“xx.xx | xxx”；
	    5. VueJs允许链式调用过滤器，简单的来说，就是一个过滤器的输出成为下一个过滤器的输入，然后再次过滤。能够及时对数据进行处理并返回一个数据结果的简单函数。
	-->
  <div class="main">
    <h4>时间格式化：</h4>
    <p>{{ time.format | formattingDate }}</p>
    <p>{{ time.format | formattingDateTwo }}</p>
    <h4>字符格式化</h4>
    <p>{{ letter.initial | capitalize }}</p>
    <p>{{ letter.initial | uppercase }}</p>
    <h4>v-bind</h4>
    <a
      class="topic_title"
      target="_blank"
      v-bind:href="info.id | getTitleHref"
    >{{ info.title | uppercase | description }}</a>
    <h4>链式调用</h4>
    <p>{{ letter.initial | uppercase | description | uppercase }}</p>
    <h4>过滤集合和排序</h4>
    <ul class="product">
      <li v-for="product in products_fruits">
        {{ product.name }} <span>{{ product.price | currency }}</span> {{ product.price | discount(90) | currency}}
      </li>
    </ul>
    <button @click="isFruits = !isFruits">change category</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: {
        format: Date.parse(new Date()),
      },
      letter: {
        initial: "this is a filter."
      },
      info: {
        id: "p/9284808.html",
        title: "v-bind:href",
      },
      products: [{
        name: '苹果',
        price: 25,
        category: "水果"
      },
      {
        name: '香蕉',
        price: 15,
        category: "水果"
      },
      {
        name: '雪梨',
        price: 65,
        category: "水果"
      },
      {
        name: '宝马',
        price: 2500,
        category: "汽车"
      },
      {
        name: '奔驰',
        price: 10025,
        category: "汽车"
      },
      {
        name: '柑橘',
        price: 15,
        category: "水果"
      },
      {
        name: '奥迪',
        price: 25,
        category: "汽车"
      }
      ],
      isFruits: true,
    }
  },
  filters: { // xx 时间前
    formattingDate: function (timedata) {
      let timeinterval = new Date(Date.parse(new Date()) - timedata);
      let beforeTime = timeinterval.getDate();
      if (beforeTime) {
        return `${beforeTime}天前`;
      }
      beforeTime = timeinterval.getHours()
      if (beforeTime) {
        return `${beforeTime}小时前`;
      }
      beforeTime = timeinterval.getMinutes()
      return `${beforeTime}分钟前`;
    },
    //格式化时间
    formattingDateTwo: function (timedata) {
      var date = new Date(timedata);
      var Month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
      var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      return Month + "-" + d + " " + h + ":" + m;
    },
    // 首字母大写
    capitalize(value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    // 全大写
    uppercase(str) {
      return str.toUpperCase();
    },
    // 格式化地址
    getTitleHref: function (val) {
      return 'http://www.cnblogs.com/pruple/' + val
    },
    // 追加描述
    description(val) {
      return val + " -- description";
    },
    // 商品折扣
    discount: function (value, discount) {
      return value * (discount / 100);
    },
    // 价格格式化
    currency(val) {
      return "￥" + val;
    },
  },
  computed: {
    products_fruits() {
      return this.products.filter((item) => {
        if (this.isFruits) {
          return item.category == "水果";
        } else {
          return item.category != "水果";
        }
      }).sort(compare("price")).reverse();
    }
  },
  mounted() {
    this.$nextTick(() => {
      let arr = new Array(6)
      arr[0] = "10"
      arr[1] = "5"
      arr[2] = "40"
      arr[3] = "25"
      arr[4] = "1000"
      arr[5] = "1";
      console.log(arr.sort(sortNumber))
      console.log("xxx");
      for (let item of this.products.sort(compare("price"))) {
        console.log(item.price);
      }
    });
  }
}
// 排序方法必须为写在 export default 外，不能在 vue 对象的 methods 内：无效
function sortNumber(a, b) {
  return a - b
}
// 排序 - 对象
function compare(prop) {
  return function (obj1, obj2) {
    return obj1[prop] - obj2[prop];
  }
}
</script>

<style scoped="scoped" lang="less">
.main {
  padding: 0rem 0.1rem;
  .topic_title {
    color: #0081c2;
    text-justify: auto;
    border: solid 1px #0000ff;
    padding: 4px;
    border-radius: 5px;
  }
  .topic_title .active {
    color: red;
  }
  h4 {
    padding-top: 0.2rem;
  }
  .product {
    padding: 0rem 0.2rem;
    li span {
      text-decoration: line-through;
    }
  }
}
</style>
