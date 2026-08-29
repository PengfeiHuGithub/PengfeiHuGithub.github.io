------------------------------------------------------------>>

# 面试题：

------------------------------------------------------------>>

## 什么是重绘和回流?

回流：一部分或全部元素应改变了自身的宽高 布局，和显示与隐藏
或元素内部文字发生变化 导致需要重新构建页面的时候  回流就产生了

重绘：当一个元素自身的宽高布局 显示与隐藏没有改变
而只是改变了元素颜色外观风格就产生重绘了

总结：回流必定触发重绘 ，而重绘不一定触发回流
------------------------------------------------------------------->>

## get 与post的区别？

get是从服务器获取数据  post是向服务器传送数据
get 能被缓存 而post不能
get他会被游览器记录url 有限制长度  而 post不会 没有长度限制
post比get安全一点因为get请求都包含在URL里会被游览器保存历史记录
post不会被保存游览器历史显示 

## cookie localStorage和sessionStorage区别？

cookie一般有服务器生成可以设置失效时间
如果在游览器生成 默认关闭游览器之后失效

cookie 每次都会携带在http头中 如果保存过多数据会带来性能问题
localStorage：除非被清除 否则永久保存而
sessionStorage：仅在当前会话有效
localStorage和sessionStorage他们仅在客户端中保存不参与服务器

------------------------------------------------------------------------------------------------------->>

   ##  this指向 :

   // 运行在浏览器 this 指向的是window
    // 浏览器的函数中
    // 调用的方式  执行这个函数 this 指向的就是window
    // new 函数   this指向的是构造实例
    // 对象中的es5的函数 this指向的是当前对象本身
    // 对象中的箭头函数 this指向的是外层函数this的指向 如果外层没有函数 指向的就是window

    //改变this指向 
    // call undefined / null   this指向不会发生改变
    // call apply bind 
    // call apply  立即执行  call(this,...参数)  apply(this,[])
    // bind : 不会立即执行 返回一个函数
    // 当bind之后  this指向大多数情况不在发生改变 (call / apply /bind)三种方法
    // 只有 重新new之后才能改变this指向

------------------------------------------------------------------>>
Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组
使用 for…in 循环遍历该对象时返回的顺序一致 。

---------------------------------------------------------------->>

## hash和history的区别？

hash
即地址栏 URL 中的 # 符号（此 hash 不是密码学里的散列运算）。
比如这个 URL：http://www.baidu.com/#/home，
hash 的值为 #/home。它的特点在于：
hash 虽然出现在 URL 中，
但不会被包括在 HTTP 请求中，
对后端完全没有影响，因此改变 hash 不会重新加载页面。

history
利用了 HTML5 History Interface 中新增的 
pushState() 和 replaceState() 方法（需要特定浏览器支持），
用来完成 URL 跳转而无须重新加载页面，
不过这种模式还需要后台配置支持。
因为我们的应用是个单页客户端应用，
如果后台没有正确的配置，就需要配置404页面。

通过history api，我们丢掉了丑陋的#，
但是它也有个问题：不怕前进，不怕后退，就怕刷新，
（如果后端没有准备的话），
因为刷新是实实在在地去请求服务器的。
在hash模式下，前端路由修改的是#中的信息，
而浏览器请求时不会将 # 后面的数据发送到后台，
所以没有问题。
但是在history下，你修改path时，当刷新时，
如果服务器中没有相应的响应或者资源，
则会刷新出来404页面。
------------------------------------------------------------>>

## vue数据劫持的原理 Object.defineProperty？

//1 定义一个监听函数，对对象的每一个属性进行监听
//2 通过Object.defineProperty对监听的每一个属性设置get 和 set 方法。
//3 对对象实行监听
//4 对对象内嵌对象进行处理  递归方法
//5 对数组对象进行处理 重写

------------------------------------------------------------>>

## MVVM和MVC的区别？



MVVM双向绑定
MVC单项数据流

model 数据 view视图层  vm 数据视图层 双向绑定
mvc 数据层 视图层 c：controller 控制层 单项数据流

------------------------------------------------------------>>

## Vue实例上的方法？

$el 获取实例DOM节点
$options 在实例上挂载的属性
$watch 缓存 
$set 劫持数组的变化 劫持对象的变化
$on
$emit
-------------------------------------------------------------->>

## vue中data为什么要变成一个函数 返回对象？

对象为引用类型，在Vue中当重复用组件时，
由于数据对象都指向同一个data对象，
当在一个组件中修改data时，

其他重复用的组件中的data会同时被修改；
而使用返回对象的函数，
由于每次返回的都是一个新对象（Object的实例），
引用地址不同，则不会出现这个问题

总结：避免变量污染

---------------------------------------------------------------->>

## vue中的v-once 

被定义了 v-once 指令的元素或组件（包括元素或组件内的所有子孙节点）只能被渲染一次。首次渲染后，即使数据发生变化，也不会被重新渲染。一般用于静态内容展示。

html:

```html
<div id="app">
    <div v-once>
        {{content}}
    </div>
</div>
```



js:

```js
<script>
    var app = new Vue({
        el: '#app',
        data: {
            content:'格陵兰岛冰下疑现巨大陨石坑 或与灭绝理论有关'
        }
    });

    app.content='显卡第一利器升级：AMD新卡到位';
</script>
```

输出结果:

格陵兰岛冰下疑现巨大陨石坑 或与灭绝理论有关

这里虽然使用了  app.content 重新设置了内容，但并没有生效，因为我们使用了  v-once 指令。

v-once 指令除了用于展示静态内容，也可能在需要进一步优化性能时用到它哦O(∩_∩)O~



## vue中的 v-if 与 v-show 的区别


### 区别

- 1.手段：v-if是通过控制dom节点的存在与否来控制元素的显隐；v-show是通过设置DOM元素的display样式，block为显示，none为隐藏；
- 2.编译过程：v-if切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件；v-show只是简单的基于css切换；
- 3.编译条件：v-if是惰性的，如果初始条件为假，则什么也不做；只有在条件第一次变为真时才开始局部编译（编译被缓存？编译被缓存后，然后再切换的时候进行局部卸载); v-show是在任何条件下（首次条件是否为真）都被编译，然后被缓存，而且DOM元素保留；
- 4.性能消耗：v-if有更高的切换消耗；v-show有更高的初始渲染消耗；

### 使用场景

基于以上区别，因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。

### 总结

v-if判断是否加载，可以减轻服务器的压力，在需要时加载,但有更高的切换开销;v-show调整DOM元素的CSS的dispaly属性，可以使客户端操作更加流畅，但有更高的初始渲染开销。如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。

```vue
<!--模板 控制 -->
  <template v-if="false">
    fdafdsaf
  </template>
```

在模板中只能使用 v-if    v-show是不起作用的



## vue中v-for循环的数据类型，以及相关参数顺序，以及v-for的注意事项

### vue中的v-for可以循环四种数据，分别是，*数字，字符串，数组，对象*

首先，v-for是属性，是对元素属性的扩展。记得，是v-for=""，而不是 v-for:"".
接着，在v-for属性的值是表达式，里面的参数，用逗号，而不是用空格隔开。

#### 一：v-for循环数字

````html
<li v-for='num in 10'>{{ num }}</li>
````

#### 二：v-for循环字符串

```html
<li v-for="str in 'haha'">{{ str }}</li>
```

#### 三：v-for循环数组

```html
<div id="test">
        <ul>
            <li v-for='(item,index) in arr'>{{ item }}---{{ index }}</li>
        </ul>
    </div>
    <script>
        const vm = new Vue({
            el: "#test",
            data: {
                arr: ['apple', 'orange', 'banana'],
            }
        })
    </script>
```

上面的item，index是语义化的写法，不是固定的，可以是a,b,c这样的，顺序就是数组内容，数组索引

#### 四：v-for循环对象

```html
<div id="test">
        <ul>
            <li v-for='(value,key,index) in obj'>{{ value }}---{{ key }}---{{ index }}				</li>
        </ul>
 </div>
 <script>
        const vm = new Vue({
            el: "#test",
            data: {
                obj: {
                    name: "zhangsan",
                    age: 18,
                    sex: '男'
                }
            }
        })
 </script>
```

第一个是值，第二个是键，第三个是索引

#### 关于数组和对象中参数顺序的解释

1.所有的循环，首要目的都是为了获取元素的值
2.其次是元素的键
3.最后是元素的索引
可以依靠这个规则来记忆参数的顺序

使用索引的时候要注意数组的翻转   会出现问题

html:

````html
<div v-for="(item,index) in arr" :key="item.id" :a="index">{{item.name}}</div>
<button @click="arr.reverse()">反转</button>
````

js:

````vue
<script>
  let vm = new Vue({
    el: '#app',
    data: {
      hello: '',
      flag: true,
      msg: 'hello',
      arr:[
        {name:'橘子',id:'a'},
        {name:'香蕉',id:'b'},
        {name:'苹果',id:'c'},
      ],
    },
    methods:{
      fn($event,num) {
        this.hello = $event.target.value;
      }
    }
  });
  vm.msg = 'world';


</script>
````

## vue中v-model 实现原理及 input、radio、checkbox 使用区别

html:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
  <script src="../node_modules/vue/dist/vue.js"></script>
</head>
<body>
<div id="app">
  <!--下拉框-->
  <label>
    <select v-model="selectValue">
      <option disabled>--请选择--</option>
      <option v-for="item in selectList">{{item.name}}</option>
    </select>
    {{selectValue}}
  </label>

  <br>
  <!--单选-->
  <label for="sex1">
    男
    <input id="sex1" type="radio" v-model="sex" value="男">
  </label>
  <label for="sex2">
    女
    <input id="sex2" type="radio" v-model="sex" value="女">
  </label>
  <label for="sex3">
    未知
    <input id="sex3" type="radio" v-model="sex" value="未知">
  </label>
  {{sex}}

  <br>
  <!--多选-->
  吃:<input  type="checkbox" v-model="likes" value="吃">
  睡觉:<input  type="checkbox" v-model="likes" value="睡觉">
  打豆豆:<input  type="checkbox" v-model="likes" value="打豆豆">
  面壁:<input  type="checkbox" v-model="likes" value="面壁">
  {{likes}}

</div>
```

js:

```vue
<script>
  let vm = new Vue({
    el: '#app',
    data: {
      selectValue: '--请选择--',
      selectList: [{id:1, name:'大老婆'},{id:1, name:'二老婆'},{id:1, name: '小老婆'},],
      sex: '男',
      likes: []
    },
    methods:{

    }
  });
</script>
```

使用v-model来进行双向数据绑定的时：

```html
<input v-model="something">
```

仅仅是一个语法糖：

```html
<input v-bind:value="something" v-on:input="something=$event.target.value">
```

所以在组件中使用的时候，相当于下面的简写：

```vue
<custom v-bind:value="something" v-on:input="something = $event.target.value"></custom>
```

所以要组件的v-model生效，它必须：

- 接受一个 value 属性
- 在有新的value时触发input事件

对比：

```vue
<template>
  <InputNumber v-model="value" />
</template>
<script>
  import InputNumber from '../components/input-number/input-number.vue';

  export default {
    components: { InputNumber },
    data () {
      return {
        value: 1
      }
    }
  }
</script>

```

````vue
<template>
  <InputNumber :value="value" @input="handleChange" />
</template>
<script>
  import InputNumber from '../components/input-number/input-number.vue';

  export default {
    components: { InputNumber },
    data () {
      return {
        value: 1
      }
    },
    methods: {
      handleChange (val) {
        this.value = val;
      }
    }
  }
</script>

````

