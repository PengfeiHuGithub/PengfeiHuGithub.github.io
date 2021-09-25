# IM聊天系统前端开发实践

# 前端基础知识

## 前言

一起重温下 HTML，CSS 和 JS 中核心的知识点，浏览器的解析渲染原理，CSS面向对象编程，最后通过实践 Promise 封装一个Ajax请求(`面试专用`)。

### 前端基础知识源码地址

> 源码地址：[github.com/dkypooh/fro…(opens new window)](https://github.com/dkypooh/front-end-develop-demo/tree/master/base/)

### 通过本章读者可以学习到什么？

1. 浏览器的解析原理是如何，服务端传输过来的 `text/html`字符串是如何绘制成页面？
2. H5 的 Meta 标签配置是如何，不同属性有什么作用？
3. CSS 面向对象编程，BEM的规范又是什么，它们两者是如何结合？
4. CSS 主流的布局，如何轻松应对页面布局？
5. Promise 的实现原理，应用场景，以及如何和 async await 配合使用？

## 浏览器解析原理

### 浏览器总的解析原理

> 浏览器的解析过程：浏览器文档流 -> html DOM结构 --> CSS结合 --> 布局 --> 绘制页面。

HTML的渲染过程中，DOM 和 CSSOM 结构可以并行渲染。

![img](http://img-repo.poetries.top/images/20210210204723.png)

### 第一步 HTML 转换成 DOM

> 服务端返回 `text/html` 格式的文档流， HTML 字符串描述了一个页面的结构，浏览器会把 HTML 字符串解析成 DOM 树形结构。

![img](http://img-repo.poetries.top/images/20210210204744.png)

### 第二步 生成 CSSOM 结构

> CSS 样式可以在 WEB 页面里映射成 CSSOM（CSS对象模型），它和 DOM 结构比较像, 不是增量模式，而是组合模式。

![img](http://img-repo.poetries.top/images/20210210204845.png)

### 第三步 CSSOM 树和 DOM 树合并成渲染树

![img](http://img-repo.poetries.top/images/20210210204903.png)

### 第四步 完整 DOM 结构

> DOM 结构有两个规则：一个是 HTML 文档对象，一个是通过接口获取 DOM 元素。通过 `document.getElementById()` 以获取元素节点

![img](http://img-repo.poetries.top/images/20210210204920.png)

## 性能优化策略

基于上面介绍的浏览器构建原理，DOM 树型结构的构建顺序，可以对页面渲染做些优化，提升体验。

> 基于上面介绍的浏览器构建原理，DOM 树型结构的构建顺序，可以对页面渲染做些优化，提升体验。

- JS优化：

   

  ```
  <script>
  ```

   

  标签加上 defer属性 和 async属性， 不阻塞页面文档解析，控制脚本的下载和执行。

  - defer属性： 用于开启新的线程下载脚本文件，并使脚本在文档解析完成后执行。
  - async属性： HTML5 新增属性，用于异步下载脚本文件，下载完毕立即解释执行代码

- `Preload`优化： preload(预加载) 是一个声明式 fetch，可以强制浏览器在不阻塞 document 的 onload 事件的情况下请求资源

> preload 有如下配置属性，`<link>` 为标签, `ref="preload"` 为预加载属性配置，`href="/test.css"` 为加载的资源，`as="style"` 为加载的资源类型。

#### 用例代码

我们预加载了CSS和JavaScript文件，所以在随后的页面渲染中，一旦需要使用它们，它们就会立即可用，同时也可以`预加载图片，字体`等文件。

```html
<head>
  <meta charset="utf-8">
  <title>JS and CSS preload example</title>
  // 1. 浏览器可以预先加载style.css, main.js的资源
  <link rel="preload" href="style.css" as="style">
  <link rel="preload" href="main.js" as="script">
  // 2. 使用style.css样式
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <h1>bouncing balls</h1>
  <canvas></canvas>
  // 3. 使用main.js文件
  <script src="main.js"></script>
</body>
```

细节实践可以参考 [通过rel="preload"进行内容预加载(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Preloading_content)

## CSS

> CSS 层叠样式表 (Cascading Style Sheets，缩写为 CSS），是一种样式表语言。

### CSS 像素

`CSS`像素分为了 物理像素（`physical pixel`） 和 设备独立（逻辑）像素（`density-independent pixel`）。

> 设备像素比(`devicePixelRatio`) ＝ `物理像素` / `设备独立像素`。

### 历代IPhone的分辨率

| 设备            | 逻辑像素(point) | 物理像素(pixel)      | 屏幕尺寸 | 设备像素比(dpr) |
| --------------- | --------------- | -------------------- | -------- | --------------- |
| iPhone 3        | 320 × 480       | 320 × 480            | 3.5寸    | @1x             |
| iPhone 4/4S     | 320 × 480       | 640 × 960            | 3.5寸    | @2x             |
| iPhone 6/7/8    | 375 × 667       | 750 × 1334           | 4.7寸    | @2x             |
| iPhone 6P/7P/8P | 414 × 736       | (1242x2208)1080x1920 | 5.5寸    | @3x             |
| iPhone X        | 375 × 812       | 1125 × 2436          | 5.8寸    | @3x             |

> 解释说明：`dpr = pixel / point`, 由于 Plus 系列比较特殊，可以近似于3倍屏。

#### 物理像素（physical pixel）

物理像素又被称为设备像素，他是显示设备中一个最微小的物理部件，retina设备像素为独立像素的2倍, 例如 iphone 6/7/8 系列

#### 设备独立像素（density-independent pixel）

设备独立像素也称为密度无关像素，又称为逻辑像素，一个点代表一个可以由程序使用的虚拟像素（`PX`）。

**缩合上述的几个概念，用一张图来解释：**

![img](http://img-repo.poetries.top/images/20210210205134.png)

## CSS布局

Web中主流的两种布局方式：[Flexbox布局 (opens new window)](https://www.w3cplus.com/blog/tags/157.html)和 [CSS Grid布局 (opens new window)](https://www.w3cplus.com/blog/tags/355.html)。

### Flex布局

[Flex布局 (opens new window)](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)旨在提供一个更加有效的方式制定、调整和分布一个容器里的项目布局，即使他们的大小是未知或者是动态的。

Flex布局主要思想是具有伸缩性特点，可以取向改变、缩放、拉伸和收缩。

在Flexbox布局中有主轴（Main Axis）和侧轴（Cross Axis）两个概念：

![img](http://img-repo.poetries.top/images/20210210205145.png)

[Flex 参考资料下载(opens new window)](https://github.com/dkypooh/front-end-develop-demo/tree/master/download/css)

#### 实现一个水平垂直居中

```text
<div class="container">
    <div class="block"></div>
</div>

.container {
    display: flex;  // 默认为水平布局，主轴线为水平
    justify-content: center; // 水平居中
    align-items: center;    // 垂直居中
}

.block {
    height: 100px;
    width: 100px;
}
```

### CSS Grid布局

[CSS Grid布局 (opens new window)](https://www.w3cplus.com/blog/tags/355.html)（又名"网格"），是一个基于二维网格布局的系统，主要目的是改变我们基于网格设计的用户接口方式。

[Grid 参考资料下载(opens new window)](https://github.com/dkypooh/front-end-develop-demo/tree/master/download/css)

![img](http://img-repo.poetries.top/images/20210210205220.png)

## CSS 面向对象

OOCSS [“Object Oriented CSS（面向对象的CSS）” (opens new window)](https://www.zcfy.cc/article/an-introduction-to-object-oriented-css-oocss-ndash-smashing-magazine)，是一种写 CSS 的方法，其思想就是鼓励你把样式表看作“对象”的集合：创建可重用性、可重复性的代码段让你可以在整个网站中多次使用。

基于SCSS预编译器，使用 OOCSS 和 BEM 结合的编码方式，可以让 CSS 编写更加规范，更加高效。

### BEM

[BEM(Block-Element-Modifier) (opens new window)](http://getbem.com/)，是一种用于 HTML 和 CSS 类名的命名约定。BEM 最初是由 Yandex 提出的，拥有巨大的代码库和可伸缩性。 BEM 是 `Block`，`Element`和 `Modifier` 的缩写。

- `Block`： 有实际意义的独立元素，例如：header, container, menu, checkbox, input
- `Element`： Block 的子元素，没有独立的含义，例如：`menu item`, `list item`等定义成 `menu__item`, `list_item`
- `Modifier`： 表示 Blcok 和 Element 元素的不同行为和状态。例如：`disable`, `highlighted`等定义成 `menu-diable`，`menu_item-highlighted`。

![img](http://img-repo.poetries.top/images/20210210205244.png)

**CSS定义**

```text
.button {
	display: inline-block;
}
.button--state-success {
	color: #FFF;
	background: #569E3D linear-gradient(#79D858, #569E3D) repeat-x;
}
.button--state-danger {
	color: #900;
}
```

### OOCSS 和 BEM 案例结合

`BEM` 和 `OOCSS` 不是CSS的标准，也是定义了一种 CSS 命名规范，下面就结合实际例子来分析, 安装 sass 编译器。

```text
npm i sass -g           // 全局安装SASS
sass bem.scss bem.css   // SCSS文件编译成CSS文件
```

#### HTML

```text
<article class="m-card">
  <h1 class="card__title">Adorable 2BR in the sunny Mission</h1>
  <div class="card__body">
    <p>Vestibulum id ligula porta felis euismod semper.</p>
  </div>
</article>
```

#### SCSS

结合 BEM 规范，更加清晰语义化的表达，同时配合 SCSS 级联语法，使 CSS 书写更加清晰，更加语义化。

```text
.m-card {
  display: flex;
  flex-direction: column;
  &__title {
    line-height: 30px
  }
  &__body {
    line-height: 20px;
    p {
      margin: 0
    }
  }
}
```

##### SCSS编译后的CSS

```text
.m-card {
  display: flex;
  flex-direction: column;
}
.m-card__title {
  line-height: 30px;
}
.m-card__body {
  line-height: 20px;
}
.m-card__body p {
  margin: 0;
}
```

## Promise原理及实践

Promise原理是通过 `Promise.prototype.then` 和 `Promise.prototype.catch` 方法将观察者方法注册到被观察者 `Promise` 对象中，同时返回一个新的 Promise 对象，以便可以链式调用。

Promise 内部进行 `等待态（Pending）`、`执行态（Fulfilled）`和`拒绝态（Rejected）` 的状态流转。

![img](http://img-repo.poetries.top/images/20210210205305.png)

### 三种回调比较 JS Callback VS Promise VS Async await

**JS Callback ：** 产生 地狱般的回调嵌套，一旦嵌套次数过多，就很容易使我们的代码难以理解和维护。

**Promise：** 通过 链式调用的方法 去解决回调嵌套的问题，使我们的代码更容易理解和维护，同时Promise 还增加了许多有用的特性，让我们处理异步编程得心应手。

**Async await：** 是 ES7 引入的新的异步代码 规范，它提供了一种新的编写异步代码的方式，这种方式在语法层面提供了一种形式上非常接近于 同步代码的异步非阻塞 代码风格。

### 支持情况

Promise 在 Chrome33 版本开始支持，全球用户比例89.69%, Async await 在 Chrome55 版本开始支持，全球用户比例85.87%。

S7 标准 Async 原先需要 Babel编译，在Chrome55可以直接使用，不需要Babel编译

#### Promise支持情况

![img](http://img-repo.poetries.top/images/20210210205319.png)

#### Async await支持情况

![img](http://img-repo.poetries.top/images/20210210205331.png)

### Ajax 封装案例实践

本小节会实现一个基于 `XMLHttpRequest` 对象实现一个 Promise 的 Ajax 方法封装（`面试专用考题`），再对比 `Promise` 和 `Async Await`的差异，以及他们的优缺点。

### Promise实现

```text
/**
 * 请求服务
 * @param {Object} param
 * @param {String} param.url    请求URL
 * @param {String} param.type   默认 'GET'
 * 
 * @return new Promise
 */
function fetchRequest (param) {
    const type = param.type || 'GET',
    const url = param.url;
    if (!url) {
        new TypeError('param url must be set...')
    }
    return new Promise( (resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(type, url, true);
        // 1. 监听状态
        xhr.onreadystatechange = function () {
            // 2. readyState = 4， status = 200 是请求成功的标识
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.responseText, xhr);
                } else {
                    reject({
                        code: xhr.status, 
                        message: xhr.response 
                    }, xhr);
                }
            }
        }
        xhr.send();
    })
}
```

### Promise VS Async await 使用区别

异步调用的最大问题是不能 Catch 到错误信息，同时编码上产生大量的 回调函数 或者 链式调用。 Async await 调用是把 Promise 的链式调用同步化，同时可以 Catch 到错误栈信息。

#### Promise 使用

```text
const getGithubHooks = () => {
    return fetchRequest({
        api: 'https://github.com/xxx'
    }).then(result => {
        return result;
        // result data
    }.catch(err => {
        // error 
    })
}
    
```

#### Async await 使用

```text
async function getGithubHooks() {
   let result = null
   // 同步 try catch 错误
   try {
    result =  await fetchRequest({
       api: 'https://github.com/xxx'
    })
    return result
   } catch(err) {
    return err; 
   }
   
   
}
```

## 结语

前端开发涉及的基础知识点非常多，非常杂，本章带精选了项目开发实践中的核心知识点，带大家进行了结构化的梳理。

这是基础到进阶重要的一步，后面一章会和大家一起学习 Typescript 知识，如果对 ES6 语法 还不是很熟悉的话，可以参考阅读 [ECMAScript 6 入门(opens new window)](http://es6.ruanyifeng.com/)

## 思考题

**Q:** 除了Flexible通过JS方式来动态设置的方式，还有其他方案来处理多端H5适配问题？

**Q：** 如何实现三栏布局，中间自适应，采用 Flex 和 Grid 两种方案实现？

## 参考文献(部分需要翻墙)

- [渲染树构建、布局及绘制(opens new window)](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction?hl=zh-cn)
- [通过rel="preload"进行内容预加载(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Preloading_content)
- [阮一峰-Flex布局教程(opens new window)](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
- [Promises/A+标准(opens new window)](https://promisesaplus.com/)
- [使用Flexible实现手淘H5页面的终端适配(opens new window)](https://github.com/amfe/article/issues/17)



# TypeScript指南

## 前言

> TypeScript 是 Javascript 的超集，可以编译成各个标准的 JS。这一章一起来学习重温下 Typescript 项目开发中常用的核心概念，最后和大家一起实践一个基于 Promise 实现的中间件函数。

### Typescript特点及优势

1. **静态输入：** 静态类型检查，可以在开发人员编写脚本时检测错误。
2. **可读性和易维护性：** 从JS动态弱类型检查到TS强类型检查，增加了静态类型、类、模块、接口和类型注解。 接口和类型提示使代码更具可读性。同时编译检查让项目更具易维护性。
3. **更好的协作：** 类型安全是一种在编码期间检测错误的功能，而不是在编译项目时检测错误。这为开发团队创建了一个更高效的编码和调试过程。

**关键字：类型检查，确定性输入出书，JS超集，可读性，易维护性。**

### 通过本章读者可以学习了解到什么？

1. TS 的项目开发中有哪些核心语法，语法规范是如何的。
2. TS 的适用场景分析，如何将 TS 编译成指定 JS 标准版本。
3. TS 如何使用第三方模块，同时如何发布 TS 模块。
4. 越来越多的项目在往 TS 迁移，如何把老的项目往 TS 迁移。
5. 用 TS 封装 Promise 实现一个中间件函数。

### Typescript 开发环境源码

> [github.com/dkypooh/fro…(opens new window)](https://github.com/dkypooh/front-end-develop-demo/tree/master/base/typescript)

### Typescript 使用场景

由于 TS 的类型检查，确定性输入输出。在编写一些不涉及UI， 例如工具类函数，基础 SDK 和数据接口 等方面有很强的优势，同时配合单元测试来保证系统开发的健壮性。

推荐：可以参考本小册 《通用SDK设计》章节

> 源码地址：[github.com/dkypooh/fro…(opens new window)](https://github.com/dkypooh/front-end-develop-demo/tree/master/senior/sdk)

## Typescript环境配置

搭建 Typescript 开发环境，环境配置，命令行使用以及编译成不同 JS 标准。

### Typescript 安装

```text
npm install typescript -g       // 安装ts编译器
tsc helloworld.ts               // 编译ts文件，默认ES3标准
```

### 命令行说明

![image-20210210220611441](http://img-repo.poetries.top/images/image-20210210220611441.png)

```text
### 初始化tsconfig配置
tsc --init

### 基础命令
tsc index.ts

### 编译JS标准版本
tsc index.ts -t es6

### 编译适配库
tsc index.ts --lib es6

### 编译生成声明文件
tsc index.ts -d -t es6
```

### tsconfig 配置

如果一个目录下存在一个 `tsconfig.json` 文件，那么它意味着这个目录是 TypeScript 项目的根目录。`tsconfig.json` 文件中指定了用来编译这个项目的根文件和编译选项。

#### 开箱即用的 tsconfig 配置

```text
{
  "compilerOptions": {
    "target": "esnext",     /* 指定编译JS标准 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. */
    "module": "commonjs",   /* 编译模式,  'none', 'commonjs', 'amd', 'system', 'commonjs', 'es2015', or 'ESNext'. */
    "outDir": "build",      /* 编译输出目录 */
    "declaration": true,    /* 创建声明文件 `.d.ts` */
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "**/*.spec.ts",
    "**/*.spec.ts"
  ]
}
```

## Typescript 基础核心知识

### 变量语法

变量声明语法有四部分组成：变量，分隔符( `:` ), 类型 (`number`, `string`) 和 值（ `value` ）。

![image-20210210220644275](http://img-repo.poetries.top/images/image-20210210220644275.png)

### 变量语法实例

```text
let isDone: boolean = false;                            // 布尔类型
let decLiteral: number = 6;                             // 数字类型
let sentence: string = 'Hello, my name is ${ name }.';  // 字符类型
let list: number[] = [1, 2, 3];                         // 数组类型
let list: Array<number> = [1, 2, 3];                    // 数组泛型
let x: [string, number] = ['1', 2];                     // 元组Tuple
```

### 函数声明语法

标准函数声明需要定义参数类型和返回类型，参数和返回类型可以是 基础数据类型 和 自定义数据类型。

函数声明语法也有四部分组成：函数名，变量，变量类型 (`基础类型(String)` 和 `自定义类型(UserInfoObject)` ) 和 返回类型 (`void`)

![image-20210210220656149](http://img-repo.poetries.top/images/image-20210210220656149.png)

### 函数声明实例

```text
interface GreetingSettings {
  greeting: string;
  duration?: number;
  color?: string;
}

declare function greet(setting: GreetingSettings): void;
// 双箭头函数说明
const testAbc = (abc: funAbcSign):string =>  {
  return funcAbcSign.abc;
}
```

### 基础数据类型

数据类型主要有：string、boolean、number、Array、void、null、undefined、Tuple、enum、object、never、any。

**Tuple元组类型：** 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。

**any类型：** 不清楚类型的变量指定一个类型，指定任意类型。

```text
// 枚举类型
enum Color {Red = 1, Green = 2, Blue = 4}	
let c: Color = Color.Green;			

// tuple类型
let x: [string, number];    // Declare a tuple type
x = ['hello', 10];          // OK Initialize it
x = [10, 'hello'];          // Error Initialize it incorrectly

// 空类型
let unusable: void = undefined;
// any类型
let list: any[] = [1, true, "free"];
list[1] = 100;
```

### 接口

TypeScript 的核心原则之一是，对值所具有的结构进行类型检查, 它有时被称做 “鸭式辨型法” 或 “结构性子类型化” 。

在 TypeScript 里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约，类可以定义为接口。

```text
// 内联接口
function printUserInfo(user: {age: number, name: string, sex?: string}): void {
	console.log('user', user);
}

// 外联接口
interface UserInfoObject {
  age: number,
  name: string,
  sex?: string
}

function printUserInfo(user: UserInfoObject): void {
	console.log('user', user);
}
```

### 泛型的使用

软件工程中，我们不仅要创建一致的定义良好的 API，同时也要考虑可重用性。 组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统时为你提供了十分灵活的功能。

```text
// 参数和返回值类型一样，但不确定
function getUser<T>(user: T):T {
	return user;
}

// 泛型接口
interface getUserFn {
	<T>(arg: T): T;
}

const getMyUser:getUserFn = getUser
// const getMyUser:<T>(arg: T) => T = getUser
```

## Typescript 高级核心知识

### 声明文件

TypeScript 的声明文件是一个以 `.d.ts` 为后缀的 TypeScript 代码文件，但它的作用是描述一个 JavaScript 模块（广义上的）内所有导出接口的类型信息。

TypeScript 的声明文件有两种写法：一种叫做 全局类型声明(Global Type Definition)，另一个则是叫做 模块导出声明(External Module Definition)。

```text
// 模块导出声明 global.ts
export declare interface funcAbcSign {
    (abc: string): string
}

export declare let abc: funcAbcSign;

// index.ts 使用 global.ts外部申明
import { funAbcSign } from './global.ts';
const testAbc = (abc: funAbcSign):string =>  {
  return funcAbcSign.abc;
}
```

### 设置全局变量及函数

TS 是强类型检查，对于第三方全局变量（`jquery`）或者函数需要声明。

```text
// 声明变量
declare var jquery: any
declare const age: number

// 声明函数
declare function greet(greeting: string): void;

// 对象组合声明
declare namespace myLib {
    function makeGreeting(s: string): string;
    let numberOfGreetings: number;
}
```

#### TS模块搜索 [microsoft.github.io/TypeSearch/(opens new window)](http://microsoft.github.io/TypeSearch/)

#### NPM的TS组织 [www.npmjs.com/~types(opens new window)](https://www.npmjs.com/~types)

### 第三方模块使用

如果使用第三方模块，首先需要声明第三方模块。 编译器会去查找相应路径下的 `.ts` ，`.tsx` 再或者`.d.ts`

```text
// module.ts
declare module 'md5'

// index.ts
import md5 from 'md5';
```

### 发布TS模块

发布TS模块需要配置 `tsconfig.json` 的 `declaration` 为 `true`

```text
## 使用第三方包，创建 module.d.ts
declare module 'md5'

## 分享TS包
tsc --build tsconfig.json       // tsconfig.json 配置 "declaration": true,
```

### 使用Mixins继承多个类的方法 [不常用]

除了传统的面向对象继承方式，还流行一种通过可重用组件创建类的方式，就是联合另一个简单类的代码, 在某些场景下我们需要继承多个类的方法（能力）。

实例说明： 作为一个全栈开发工程师，我们既需要前端的能力，有需要服务端的能力。

```text
function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
      Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
          derivedCtor.prototype[name] = baseCtor.prototype[name];
      });
  });
}

class FrontEndEngineer {
	html: boolean
  css: boolean
  isKnowWeex (level:number):boolean {
    return level > 8
  }
}

class ServerEngineer {
	sql: boolean
  isKnowEggjs (level:number):boolean {
    return level > 8
  }
}

class Engineer implements FrontEndEngineer, ServerEngineer {
  html: boolean = true
  sql: boolean = true
  css: boolean = true
  isKnowWeex: (level: number) => boolean
  isKnowEggjs: (level: number) => boolean
}


applyMixins(Engineer, [FrontEndEngineer, ServerEngineer]);
const my = new Engineer();

console.log('my kills:', my.css, my.html, my.sql);
console.log('weex level:', my.isKnowWeex(9));
console.log('eggjs level:', my.isKnowEggjs(6));
```

## 实践Promise 中间件函数

**面试专用：** 一起通过 Typescript 封装 Promise 来实现一个中间件函数。

中间件函数模块使用场景非常广泛，后面项目最佳实践的组件中间件就会用到，理解设计的巧妙，会使代码的能力也会有很大提升。

> 源码地址：[github.com/dkypooh/fro…(opens new window)](https://github.com/dkypooh/front-end-develop-demo/blob/master/senior/sdk/src/util.ts)

### middleware代码

通过 Promise 队列执行每个回调函数。 Typescript 语法定义了函数声明，变量类型和返回值类型。

```text
// 1. 形成Promise队列返回
export const promiseMiddleware = (list: ((...args: any[]) => any)[]):Promise<any> => {
  // 2. 返回resolve对象,初始化上下文
  let resolved = Promise.resolve({});   
  // 3. 遍历队列，返回promise
  list.forEach((fn: any, index: number) => {
    if (typeof fn !== 'function') throw new TypeError('Promise cell must be function');
    resolved = resolved.then((context: object) => fn(context)) // 复制新的promise结果
  })
  return resolved; 
}
```

### Jest测试代码

```text
test('promise middleware test', (done) => {
  const result = promiseMiddlware([(context) => {
    context.name = 'rose'
    return context
  }, (context) => {
    context.age = '12';
    return context;
  }])

  result.then((context) => {
    expect(context).toEqual({name: 'rose', age: '12'})
    done();
  })
})
```

### 测试结果

```text
 PASS  test/promise.test.ts
  SDK Test
    ✓ promise middleware test(8ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.1s
```

## 结语

通过本章学习我们知道 Typescript 在项目开发中的核心语法 和 Typescript 的适用场景。

最后用 Promise 封装了中间件函数，后面关于数据层SDK的项目都会采用 Typescript，同时使用 Jest 做单元测试。

如果需要深入了解还是要 翻阅官方文档 [Typescript官方文档 (opens new window)](https://www.typescriptlang.org/)。

## 思考题

Q: 如何使用第三方模块？

Q: 如何让原先的NPM包可以被TS识别？

## 参考资料

- [Typescript 中文指南(opens new window)](https://www.tslang.cn/docs/home.html)
- [TypeScript 实践(opens new window)](https://juejin.im/post/6844903569552834568)
- [你不知道的前端SDK开发技巧



# GIT项目管理

## 前言

和大家一起学习探讨下 Git 的内部原理，Git 基本操作，Git的版本管理策略， 最后会和大家通过一些场景问题，学习 Git 的常用黑科技, 例如：`cherry-pick`，`patch`，`reset vs revert`。

### Git项目管理源码地址

> 源码地址：[github.com/dkypooh/fro…(opens new window)](https://github.com/dkypooh/front-end-develop-demo/tree/master/base/git/git-resp)

**PS:** 查看隐藏文件夹 `.git`

### 一句话理解Git(面试专用)

Git 的每个分支的管理类似于链表，每次提交都会产生一个 SHA1 的唯一标识符，此唯一标识符是引用的指针，后续的增删改查操作都可以基于这个指针进行索引操作。

**关键字：分布式，四个分区，链表，SHA1指针**

### 通过本章读者可以学习了解到什么？

1. git 的核心原理，四个分区差异，代码的不同状态在四个分区流转的规则。
2. 如何修改 git 的基本信息, 用户名，远端仓库地址
3. 如何删除及忽略 git 已经提交的资源
4. git reset 和 git revert 的区别
5. git pull 和 git pull --rebase 的区别
6. git 版本管理策略模型

## 认识Git

### Git简史

同生活中的许多伟大事物一样，Git 诞生于一个极富纷争大举创新的年代。

Linux 内核开源项目有着为数众多的参与者。 绝大多数的 Linux 内核维护工作都花在了提交补丁和保存归档的繁琐事务上（1991－2002年间）。 到 2002 年，整个项目组开始启用一个专有的分布式版本控制系统 BitKeeper 来管理和维护代码。

### 版本管理策略

![image-20210210220937003](http://img-repo.poetries.top/images/image-20210210220937003.png)

**master分支：** 一般会以此分支为主分支（发布分支）。主分支的意思是说开发者不会在主分支上开发， 主分支只接受外分支的合并。合并完之后，验证通过，打 `tag` 上线。

**develop分支：** 作为日常开发分支，同时会有多人在上面提交代码，为了保证提交不冲突，尽量保证模块拆解合理，开发过程中没有多位开发者同时修改同一文件的情况。

**feture_a 到 feture_n分支：** 这些分支是发布之后的 bug 修复分支，不同开发者产生的 bug，会不同分支上修复 bug，最终合并到 master 分支上上线。

## Git核心概念及原理

Git 是分布式版本控制系统，SVN 是集中化版本控制系统。 Git 取代了 SVN 作为当前最好的版本管理工具。

**SVN缺点:** SVN 集中化版本控制系统虽然能够令多个团队成员一起协作开发，但有时如果中央服务器宕机的话，谁也无法在宕机期间提交更新和协同开发。甚至有时，中央服务器磁盘故障，恰巧又没有做备份或备份没及时，那就可能有丢失数据的风险。

### Git 四个工作区

Git 的文件操作原理都是基于 `Workspace` （工作区），`Index / Stage` （暂存区）, `Repository` （仓库区） 和 `Remote`（远程仓库）四个工作区来进行流转。

![image-20210210220952669](http://img-repo.poetries.top/images/image-20210210220952669.png)

**Workspace工作区：** 平时存放编辑项目代码的空间

**Index / Stage暂存区：** 用于临时存放你的改动，事实上它只是一个文件，保存即将提交到文件列表信息

**Repository仓库区（或版本库）：** 就是安全存放数据的位置，这里面有你提交到所有版本的数据。其中 HEAD 指向最新放入仓库的版本

**Remote远程仓库：** 托管代码的服务器。例如 Github 的代码远端代码托管服务器

#### 操作说明

1. `pull` 操作，Git 会从 远端仓库 到 工作区
2. `fetch/clone` 操作，Git 会从 远端仓库 到 版本仓库
3. `add` 操作，Git 会从 工作区 到 暂存区
4. `commit` 操作，Git 会从 暂存区 到 版本仓库

例如我们一次完整的提交 `add --> commit --> push` 经历的工作区变化就是

> 工作区 --> 缓存区 --> 本地仓库区 --> 远端仓库

### Git内部构造

要理解 Git 内部构造的核心，我们应理解三个东西：**实体（objects）、引用（refs）、索引(index)。**，这些都会在 Git 的 `.git` 文件结构目录下找到对应的目录。

![image-20210210221005961](http://img-repo.poetries.top/images/image-20210210221005961.png)

**实体：** 提交到一个 Git 代码仓库中的所有文件，包括每个提交的说明信息（the commit info）都在目录 `.git/objects/` 中存储为实体。一个实体以一个 40 字符长度的字符串（该实体内容的 SHA1 哈希值）来标识。

**引用：** Git 中，一个分支（branch）、远程分支（remote branch）或一个标签（tag）（也称为轻量标签）仅是指向一个实体的一个指针，这里的实体通常是一个 commit 实体。这些引用以文本文件的形式存储在目录 `.git/refs/` 中。

**索引：** 索引是一个暂存区，以二进制文件的形式存储为文件 `.git/index`。当 git add 一个文件，Git 将该文件的信息添加到索引中。当 git commit，Git 仅提交索引文件中列出的文件。

## Git初始化

### Git授权SSH

大多数 Git 服务器都会选择使用 SSH 公钥来进行授权。在 Github 或者 Gitlab 上提交代码，我们需要把 SSH 公钥复制托管到Github的

> personal setting -> ssh keys

#### 生成 SSH-Key 方法

```text
# 进入ssh目录
cd ~/.ssh               
# 生成ssh公私钥
ssh-keygen              
# 复制ssh公钥
cat ~/.ssh/id_rsa.pub   
```

### 仓库基本操作

```text
# 在当前目录新建一个Git代码库
git init                        

# 新建一个目录，将其初始化为Git代码库
git init <project-name>         

# clone git仓库
git clone <git-hub-url>  

# [高阶用法] clone git仓库并且制定分支
git clone <url> -b <branch>     
```

### Git忽略不应该跟踪的文件

`.gitignore` 文件显式地指定了哪些文件不应被 Git 追踪，即被 Git 忽略掉。例如开发过程中 node_module，.vscode 等文件不需要被跟踪和提交，可以在初始化的忽略它们。http://interview.poetries.top/fe-react-docs/im-chat/docs/03-Git项目管理.html#git配置)Git配置

### 修改用户信息

```text
# 配置信息列表
git config --list         

# 设置用户名
git config --global user.name "John Doe"   

# 设置邮箱
git config --global user.email johndoe@example.com  
```

### 设置不同的仓库源

```text
# 查看帮助
git remote --help                   

# 查看不同源
git remote  

# 添加不同地址的源，并取一个别名
git remote add [name] [url]    

# 删除一个源
git remote remove [name]           
```

## Git基本操作

### 操作一次完整提交流程

当文件修改时，需要把本地仓库提交到远端仓库上面，一次完整提交路径： **工作区 --> 缓存区 --> 本地仓库区 --> 远端仓库**

```text
# 修改readme文件，文件在工作区
vi readme.md                

# 文件进入缓存区，缓存区的文件可以被checkout移除到工作区
git add readme.md  

# 文件进入提交分支，但还是在本地
git commit 'add readme'  

# 提交分支 push 到远端分支
git push origin master      
```

### 操作一次完整更新流程

多人协同开发过程中，开发者随时需要更新本地仓库代码，始终保持本地代码处于最新状态。 本小节会介绍更新本地代码的具体操作， `git pull`，`git fetch`， `git pull --rebase`具体操作，以及他们之间的差异。

- git pull : git fetch + git merge
- git pull --rebase: git fetch + git rebase

![image-20210210221025222](http://img-repo.poetries.top/images/image-20210210221025222.png)

### 分支管理

本小节介绍如何创建一个分支，如何删除一个本地分支和远端分支。

**注意：本地分支删除了，并不代表远端分支删除。如何定期清理远端分支。**

```text
# 已当前分支为基础，创建daily/0.0.1分支
git checkout -b daily/0.0.1            

# 查看本地分支及远端分支
git branch -la  

# 强制删除本地分支
git branch -D [branchName]  

# 删除已经Merge过的分支
git branch -d [branchName]    

# 创建一个分支
git checkout -b daily/0.0.1  

# 如何删除远端多余分支
# 大多数情况remote_name为origin
git push -delete <remote_name> <branchName> 
```

### Git提交信息检查

```text
# 查看当前工作区改动点
git diff                               

# 提交hash1和hash2的差异
git diff commit_hash1 commit_hash2 

# 分支a和b的差异
git diff branch_a branch_b   

# 当前改动文件
git status     

# 查看提交历史
git log                

# 提交历史缩减一行查看，主要是提交Hash值
git log --pretty=oneline              
```

## Git高阶操作(黑科技)

### merge, cherry-pick和patch使用及差别

多人协同开发中我们需要合并别人的代码（或者pick别人的部分代码），使本地分支代码达到理想最新状态。Git提供了三种合并的方式，后两者操作属于高阶操作，初学者很少知道如何使用以及他们的差别。

下图列举了三种操作的使用场景和差异，并且举例了具体操作实例。

![image-20210210221041452](http://img-repo.poetries.top/images/image-20210210221041452.png)

### 删除 Git 缓存文件

**场景：** 有些情况开发者把原有不需要提交的代码提交到了远端仓库，再使用.gitignore忽略文件不生效。哪怕我们删除后再提交也没有办法忽略。这种情况下我们应该怎么解决？

**方法：** 我们可以使用git rm --cache 删除原来git跟踪的文件缓存，再在.gitignore里面添加忽略文件

```text
## 当我们需要删除暂存区或分支上的文件, 同时工作区也不需要这个文件了, 可以使用
git rm file_path 

## 当我们需要删除暂存区或分支上的文件, 但本地又需要使用, 只是不希望这个文件被版本控制, 可以使用
# PS: file_path 为文件路径
git rm --cached file_path       
```

### 如何强制提交

**场景：** 对于多人协作开发，有些时候我们会遇到版本管理混乱的情况，例如：远端版本错误了，但本地版本是正确的。 如何才能让强制更新远端版本，保持和本地工作区环境一样？

**方法：** 强制push本地正确的版本，但是慎用。因为它是不可逆转的。

```text
# 强制更新，慎用
git push origin master --force  
```

### revert 和 reset区别

**场景：** 有些时候开发者需要退回到某次正确的提交记录，有些时候开发者的commit错误了，这时候可以使用 git revert 和 git reset。

- git revert： 撤销某次操作，此次操作之前的commit都会被保留。
- git reset ： 撤销某次提交，但是此次之后的修改都会被退回到暂存区。

```text
# 强制回退到某次提交，且需要强制提交
git reset ——hard commit_hash 
git push origin master --force 

# 回退到某提提交，保存提交commit记录, 重新commit
git revert commit_hash
git add .
git commit -m "revert"
git push origin master
```

### 创建Tag，如何以某个Tag创建分支

有时我们代码已经发布很长时间才发现了一个Bug，同时当前开发分支又有需求在开发，如何以之前发布版本的节点开分支修复问题，这样就可以使用 `Tag` 创建分支。

```text
# 创建tag
# 创建标注标签
git tag -a daily/0.0.1 -m "add develop file" 

# 简单创建tag
git tag daily/0.0.1                                 

# 分享tag到远端
git push origin [tagname]
git push origin --tags 

# 如何已某个tag创建分支
git checkout -b <newbranch> <tagname>
```

### 已某个远端分支为基础分支，创建本地分支

默认情况创建一个分支是以远端的 Master 分支为基础，本地创建一个 Master 分支。如果我们想直接远端某个分支为基础创建相应本地分支，可以如下操作， 或者想本地某个分支创建一个新分支，可以如下操作：

```text
# 本地从当前所在分支上创建一个新分支： 
git checkout -b 新分支名 

# 拉取远程某个分支到本地: 
git checkout -b 本地分支名 origin/远程分支名
```

### 子模块（submodule）的使用场景

在复杂工程项目中，可能会遇到在一个 Git 仓库中添加其他 Git 仓库的场景，Submodule是仓库的一份引用。 下文会涉及到基于 lerna 多仓库管理的情况下，lerna 会去链接各个仓库的依赖关系，但是各个仓库又是独立的，那么就需要 submodule 进行管理，具体操作如下：

```text
# 添加子模块
git submodule add 仓库地址

# 更新子模块
git submodule update --remote 模块名称

## 删除子模块
1. git rm --cached 模块名称
2. 删除 .gitmodules 下相应子模块信息
3. 删除 .git/config 下相应子模块信息
```

## 结语

本章介绍的 Git 版本管理策略是一个最简单模型，原理上需要区分开发（日常），预发，线上环境三套环境。对于 Git 的版本管理需要根据具体场景具体分析。

欢迎在此 ISSUE 补充问题，完善场景解决方案。 [Git 版本管理场景及解决方案合集(opens new window)](https://github.com/dkypooh/front-end-develop-demo/issues/8)

学习资料下载地址：[学习资料(opens new window)](https://github.com/dkypooh/front-end-develop-demo/tree/master/download/)

下面一章将要学习 Lerna包管理, 大家需要提前了解下 Lerna 基本知识。

查看 Lerna 官网 [Lerna 官网(opens new window)](https://lernajs.io/)

## 思考题

Q: [Learning Git Branching网站 (opens new window)](https://learngitbranching.js.org/)，完成一次完整的发布更新流程。

## 参考文档

- [Git Pro Book(opens new window)](https://git-scm.com/book/zh/v2)
- [Git workflow 问题集合(opens new window)](https://stackoverflow.com/search?q=git+workflow)
- [常用 Git 命令清单(opens new window)](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)
- [Git远程操作详解(opens new window)](http://www.ruanyifeng.com/blog/2014/06/git_remote.html)
- [Learning Git Branching网站



# Lerna包管理

## 前言

和大家一起学习探讨包管理策略，monorepo 和 multrepo 区别，Lerna 的基本操作和原理，Lerna 的适用场景，同时深入到 Lerna 源码探究它是如何实现 文件软链。

### Lerna开发环境源码

> [github.com/dkypooh/fro…(opens new window)](https://github.com/dkypooh/front-end-develop-demo/tree/master/base/lerna)

### Lerna 简介

> A tool for managing JavaScript projects with multiple packages. Lerna is a tool that optimizes the workflow around managing multi-package repositories with git and npm.

**翻译：** Lerna 是一个用来优化托管在 git\npm 上的多 package 代码库的工作流的一个管理工具,可以让你在主项目下管理多个子项目，从而解决了多个包互相依赖，且发布时需要手动维护多个包的问题。

**关键字：** 多仓库管理，多包管理，自动管理包依赖

### 通过本章读者可以学习了解到什么？

1. lerna 基本操作，如何更新，链接，发布等。
2. lerna 采用的是 monorepo 模式，和 multrepo 有什么区别。
3. lerna 是如何实现内部文件软链，是 npm link 么。
4. lerna 的适用场景以及包管理策略。
5. lerna 如何提升安装性能。
6. lerna 如何指定发布版本，如何指定发布子目录

### lerna的使用策略

![image-20210214183010777](http://img-repo.poetries.top/images/image-20210214183010777.png)

我们一般会把一个大型项目才分两大部分：业务模块 + 通用模块。 由于通用模块会被多个业务模块使用，往往是通过 NPM 包提供服务。lerna 很好的管理多个包以及他们的依赖关系。

最佳案例：React 仓库， Rax 仓库

## Lerna核心原理

### monorepo 和 multrepo 区别

**monorepo：** 是将所有的模块统一的放在一个主干分支之中管理。

**multrepo：** 将项目分化成为多个模块，并针对每一个模块单独的开辟一个reporsitory来进行管理。

![image-20210214183056616](http://img-repo.poetries.top/images/image-20210214183056616.png)

### lerna 如何实现软链

lerna 是如何做到内部模块的软链和管理，对于作者来说是一个很大的困惑？在 npm 下，npm link 可以在系统目录下建立包软链。软链可以不需要发布，就可以使用本地包，很好的提高开发效率。

作者阅读源码发现 lerna 实现软链使用了 `symlink-dependencies` 包。最终使用 `fs.symlink` 函数实现了文件软链。

![image-20210214183116689](http://img-repo.poetries.top/images/image-20210214183116689.png)

源码解析如下：

1. command 基类是 lerna 的核心包，提供了各种指令
2. utils 目录下提供了文件软链的各种方法，例如：create-symlink(创建软链)，symlink-dependencies(软链依赖)等
3. 在 create-symlink 文件中， 核心函数 `createSymbolicLink` 使用了 `fs` 文件类的 `symlink` 方法实现了文件依赖管理

`createSymbolicLink` 函数源码地址

> [github.com/lerna/lerna…(opens new window)](https://github.com/lerna/lerna/blob/master/utils/create-symlink/create-symlink.js#L20)

## Lerna 环境配置

### lerna 初始化

```text
npm i lerna -g 				// 全局安装lerna
lerna init 					// 初始化lerna目录
```

### lerna.json 基础配置

```text
{
"version": '0.0.1',
"npmClient": 'cnpm',                        // yarn, npm
"packages": ['packages/*', 'xx/*'],         // 管理多个目录
"command": {
    "publish": {                            // lerna publish配置，忽略*.md文件，
        "ignoreChanges": ["*.md"],
        "message": "chore(release): publish"
    },
    "bootstrap": {                          // lerna bootstrap配置，忽略component-*包
      "ignore": "component-*",
      "npmClientArgs": ["--no-package-lock"]
    }
}
```

### lerna 目录结构

![image-20210214183137937](http://img-repo.poetries.top/images/image-20210214183137937.png)

使用 Lerna 注意事项：

1. Lerna 会管理 packages 下面的包的依赖关系，对于 package-2 依赖 package-1，lerna可以帮助自动管理。
2. lerna 可以管理多个目录的依赖关系，只需要在 lerna.json 的 packages 属性配置。
3. 当遇到异常情况需要更新或者清理缓存时， 可以使用 `lerna clean` 指令。

## Lerna 基本操作

本小节会介绍 lerna 基本操作命令，如何创建一次lerna的工作流。

lerna的常用命令：list, bootstrap, clean, changed, publish。

### 安装依赖

```text
lerna bootstrap
```

### 查看本地包列表

```text
lerna list
```

### 删除安装依赖

```text
lerna clean
```

### 何建立软链

```text
lerna link
```

### 发布安装包

```text
lerna publish
```

### 场景使用实例

创建一次完整的 lerna 工作流有如下流程：

> lerna boostrap(依赖包安装) --> 开发模块 --> git commit --> lerna changed(查看包变化) --> lerna publish。

如下操作实例

```text
lerna bootstrap     // 安装依赖包
lerna list          // 本地依赖包
lerna changed       // 待发布包列表
lerna publish       // 发布
```

## Lerna 高阶操作

### publish 高级应用

某些发布的情况，开发者需要指定安装包版本，或者指定子目录发布。

```text
lerna publish --dist-tag next   // 指定当前版本号
lerna publish --contents dist   // 指定dist目录为发布目录
```

### 性能提升

如果使用 `lerna bootstrap` 命令会在每个子目录都安装 `node_modules` 依赖，导致性能变差，在开发环境下，可以使用 `--hoist` 在 `lerna` 根目录安装依赖来提升性能。

```text
lerna bootstrap --hoist         // 提升到根目录
```

### 结语

Lerna 对于大部分的同学来说相对还比较陌生，但是越来越多的国内外公司都在使用 Lerna 管理他们的项目，当前版本也很稳定，请放心使用。

例如：[babel/babel (opens new window)](https://github.com/babel/babel), [facebook/jest (opens new window)](https://github.com/facebook/jest), [alibaba/rax (opens new window)](https://github.com/alibaba/rax)。

Lerna 解决的是多包依赖管理的问题，可以动态建立软链，自动更新依赖，大大减少的人力，降低了出错的概率。

下面一章将要学习 React 组件, 大家需要提前了解下 React 基本知识和生命周期, 查看 [React 官网 (opens new window)](https://reactjs.org/)。 当前版本 `React@16.8.1` 支持了 `Hooks` 提案，一起来学习此特性。

## 思考题

Q: 简单搭建一个 Lerna 管理项目，如果两个包互相依赖，可以自动更新

## 参考文献

- [使用lerna优雅地管理多个package(opens new window)](https://zhuanlan.zhihu.com/p/35237759)
- [lerna管理前端packages的最佳实践(opens new window)](https://juejin.im/post/6844903568751722509)
- [Lerna 官网(opens new window)](https://lernajs.io/)



# React 组件

## 前言

> React 是 Facebook 公司开发的用于构建用户界面的 JavaScript 库，React 是现在使用最广泛的组件库，相信大家都比较了解 React 的基本原理及使用，这里不再累赘，下面主要和大家一起学习下 React 新的特性。

翻阅官方文档是最好的学习途径，官方文档地址：

> [react.docschina.org/docs/gettin…(opens new window)](https://react.docschina.org/docs/getting-started.html)

### React 项目地址（附新特性源码）

> [github.com/dkypooh/fro…(opens new window)](https://github.com/dkypooh/front-end-develop-demo/tree/master/base/eslint-react)

## React 基础

### React 生命周期

![image-20210214183554159](http://img-repo.poetries.top/images/image-20210214183554159.png)

> 从 React 生命周期中可以看出 shouldComponentUpdate 这个节点的生命周期关系到是否重新 Render 组件。对 shouldComponentUpdate 的手动触发也是组件性能优化的一个重要手段。

### React 基础实例

编写一个 hello world 组件，JSX 语法编译成 React.createElement 包装的函数。

```text
import React from "react";

export default class extends React.PureComponent {
  render() {
    return (
      <div className="App">
        <h1>Hello boy</h1>
        <h2>Welcome</h2>
      </div>
    );
  }
}

## 编译后的结果
return React.createElement('div', {className: 'App'},
  React.createElement('h1', /* ... h1 children ... */),
  React.createElement('h2', /* ... h2 children ... */)
);
```

同时在当前版本的 React 中，支持编写函数式组件，官方称为 Function Component。通过 Webpack 的 Babel `@babel/preset-react` 支持编译成 Javascript 语法。

## Portals 传送门

Portals 提供了一种很好的将子节点渲染到父组件以外的 DOM 节点的方式。

```text
ReactDOM.createPortal(child, container)
```

第一个参数（ child ）是任何可渲染的 React 子元素，例如一个元素，字符串或碎片。第二个参数（container）则是一个 DOM 元素。

```text
render() {
  return ReactDOM.createPortal(
    <Component />,
    domNode,
  );
}
```

通常讲，当你从组件的 render 方法返回一个元素，该元素仅能装配 DOM 节点中离其最近的父元素。在 React@^16 中的这个特性可以动态插入到任何 DOM 节点的位置。 这种方式在编写 `Modal`, `Dialog`, `Toast` 等全局节点组件中很有用。

[在 CodePen 上试一试(opens new window)](https://codepen.io/gaearon/pen/yzMaBd)

## Context 上下文

在 `React@v16.3.0` 版本中引入 Context 的 API， Context 通过组件树提供了一个传递数据的方法，从而避免了在每一个层级手动的传递 Props 属性。通过 Context 数据共享的方式，保证组件数据不需要使用 Props 属性，实现跨级传输。 [Context 详细API参考文档(opens new window)](https://react.docschina.org/docs/context.html)

Context 设计目的是为共享那些被认为对于一个组件树而言是“全局”的数据。下面例子来说明 `Props` 和 `Context` 数据通信的区别。

### 使用 Props 实例

```text
class App extends React.Component {
  render() {
    return <Toolbar theme="dark" />;
  }
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  );
}

class ThemedButton extends React.Component {
  render() {
    return <Button theme={this.props.theme} />;
  }
}
```

### 使用 Context 实例

React.createContext 方法创建 Context 实例，创建了一对 { Provider, Consumer }。 当 React 渲染 Context 组件 Consumer 时，它将从组件树的上层中最接近的匹配的 Provider 读取当前的 context 值。

```text
// 创建 Context 实例
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    return (
      // 提供 `Provider` 上下文容器
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 返回 Toobar 组件函数
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

// 构建组件实例
class ThemedButton extends React.Component {d
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```

## React Hooks

> With React 16.8, React Hooks are available in a stable release! - February 06, 2019

现在 React Hooks 已经提案到了最终的标准， 读者之前开发过 React 相关的项目，都会遇到如下问题：

1. `It’s hard to reuse stateful logic between components` 不同组件之间的状态很难复用。
2. `Complex components become hard to understand` 复杂组件导致很难理解
3. `Classes confuse both people and machines` 大量的类定义导致很难维护。
4. `hooks let you use more of React’s features without classes.` React Hooks 开发组件也变得越来越轻量级。

技术的发展路径总是逐步降低其门槛，简单从轻量级角度我们做一个排序：

> createClass Component > Class Component > Function Component

React Hooks 动机也是为了解决 React 项目开发与维护的成本，Hooks 和 Function Compenent 配合让开发者不需要定义类，更加轻量级。

如下实例：

> 源码地址：[github.com/dkypooh/fro…(opens new window)](https://github.com/dkypooh/front-end-develop-demo/tree/master/base/react-feature)

```text
import React, { useState } from 'react';

function App() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  return (
    <div class="App">
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
export default App;
```

Hooks 有几个关键 API: `useState`、`useEffect`、`useContext` 、`useContext`。 下面带大家一起了解下这些API的使用，以及他们解决的问题。

### State Hooks

State Hooks API 为了解决组件内部状态难复用的问题，以轻量级隔离的方式创建状态和更改状态。

```text
const [state, setState] = useState(InitialState)
```

state 为状态名称， setState 为更改状态函数(当然可以去其他的，例如上文 setCount), InitialState 状态初始值。

也可以使用多个状态变量，这样的关系中维护写法做到了去中心化。

```text
## 之前 state 语法
this.state = {
    fruit: 'banana',
    age: 42,
    todos: 'Lerna Hooks'
};

this.setState({fruit: 'orange'});

## 现在 useState 语法
const [age, setAge] = useState(42);
const [fruit, setFruit] = useState('banana');
const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);

setFruit('orange');
```

### Effect Hooks

Effect Hooks 副作用钩子 API 为了链接组件生命周期，让组件更加简单。 Effect Hooks 可以同时在 componentDidMount 和 componentDidUpdate 上触发,同时返回会在 componentWillUnmount 的时候触发。 可以使用它代替一些生命周期，使书写更加简洁。

关于生命周期，使用 useEffect 基本解决了在 Fuction Component 无生命周期的问题

#### 不使用 Effect

```text
import React from 'react';

class NoEffect extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
export default NoEffect;
```

#### 使用 Effect

```text
import React, { useState, useEffect } from 'react';

function UseEffect() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default UseEffect;
```

### Reducer Hooks

useReducer Hooks 可以模拟 Redux 的 reducer 行为，进行数据流转。 下面语法返回 `state` 和 `dispatch` 两个属性

```text
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

#### 使用 useReducers

```text
// 初始化状态
const initialState = {count: 0};

// reducer规则
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </>
  );
}
```

#### useState 实现 useReducer

useState API 原理公式是：

> (state, action) => newState

useReducer 返回 dispatch 方法来触发状态的改变。 如下有通过 useState 实现案例。 useReducer源码实现:

> [github.com/facebook/re…(opens new window)](https://github.com/facebook/react/blob/master/packages/react-reconciler/src/ReactFiberHooks.js#L543)

```text
function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState);
  }

  return [state, dispatch];
}
```

## React的高阶组件

HOC（Higher Order Component，高阶组件），它不是 React 的组件，而是一种设计模式。

理解：高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件, 同时函数执行创建了闭包环境。

计算公式如下：

> const EnhancedComponent = higherOrderComponent(WrappedComponent);

HOC 组件可以封装组件中通用的组件，可变的组件可以通过传入子组件的方式，提高代码复用性。

### 高阶组件实例

```text
function HOC(WrappedComponent) {  
  return class extends React.Component {    
    render() {      
      return <WrappedComponent {...this.props}/>    
    }  
  } 
}
```

注释：这里的 HOC 是一个方法，接受一个 WrappedComponent 作为方法的参数，返回一个匿名 class，renderWrappedComponent。

## 结语

本章和大家一起来学习下 React 中的两个重要特性( Portals 和 Context ) 和 一个核心概念 ( Hooks )，通过本章学习读者可以知道为什么需要 Hooks , 以及它的适用场景，最后和大家一起编写一个消息流 React HOC 组件。

下一章将要学习 Mobx 状态管理, 大家需要提前了解下 Mobx基本概念, 同时最好了解下 Redux 的原理，下一章会思考 Mobx 和 Redux 的差异和不同的使用场景。

参考文档：

1. [Mobx 中文官网(opens new window)](https://cn.mobx.js.org/)
2. [Redux 官网(opens new window)](https://redux.js.org/)

## 思考题

Q: 编写一个 HOC 组件之消息流 HOC 组件，UI 如下，传入不同的 wrapper 组件，展示不同消息项。

![image-20210214183622811](http://img-repo.poetries.top/images/image-20210214183622811.png)

## 参考文档

- [React 官方文档(opens new window)](https://react.docschina.org/docs/hello-world.html)
- [React Hooks官方中文文档 (opens new window)](https://react.docschina.org/docs/hooks-intro.html)**Hooks提案已应用**
- [深入理解 React 高阶组件(opens new window)](https://zhuanlan.zhihu.com/p/24776678)
- [精读《React Hooks》(opens new window)](https://zhuanlan.zhihu.com/p/49408348)
- [React Context 的理解以及应用(opens new window)](https://juejin.im/post/6844903566381940744)



# Redux VS Mobx 状态管理

## 前言

近几年前端技术发展如火如荼，前端的两大UI框架已经定型 React 和 Vue，很多系统都是由单页系统搭建，随着业务迭代开发，系统也越来越复杂，同时状态管理也变得越来越不可控，越来越复杂，这时我们需要引入状态管理工具来更好的管理系统状态，让状态从不可控变得可控。

切记不要一概而论，不是所有的系统都需要引入类似于 redux 和 mobx 的状态管理工具，这既增加了系统复杂度， 又增加的开发工作量，杀鸡用牛刀，得不偿失。 例如：一些简单的H5页面，作者认为完全没有必要，内部状态足以管理。

## Redux VS Mobx 状态管理

Mobx 和 Redux 都是 JavaScript 应用状态管理库，都适用于React，Angular，VueJs 等框架或库，而不是局限于某一特定UI库。不管是 Mobx 和 Redux 状态管理工具，都是帮助项目解决如下几个问题：

1. `components share state` (组件之间共享状态)
2. `state should be accessible from everywhere` (所有状态可以方便获取)
3. `components need to mutate the state` (组件可以修改状态)
4. `components need to mutate the state of another component` (组件可以修改其他组件的状态)

无论 Redux 还是 Mobx 状态管理库，本质还是为了解决状态管理混乱，无法有效同步的问题，状态管理是软件开发的最困难方面之一。

### Redux 优缺点

Redux 所有状态变更都需要 dispath，变得完全可控 不仅有助于状态管理，还使得实现一些高级特性变得很简单，比如无限撤销/重做和实时编辑时间旅行 (live-editing time travel)。

Redux 缺点是开发者学习成本上升，开发流程重复和复杂，往往需要些很多冗余的代码。

### Mobx 优缺点

Mobx 小巧轻便，内部实现属性 Diff 的性能优化，用户开发起来更加方便，类似于 Vue 中的响应式的原理，设置属性是可观察的，赋值属性就可以修改状态。

Mobx 缺点是状态不能回溯，Mobx 相对比较自由，是优点也是缺点，导致复杂系统应用的时候，状态还是不可控。

本章节也实现用 Redux 和 Mobx 两个状态管理实现了计数器代码，方便读者通过源码对比差异。

> redux-counter 源码：[github.com/dkypooh/fro…(opens new window)](https://github.com/dkypooh/front-end-develop-demo/tree/master/base/Redux-Counter)

> mobx-counter 源码：[github.com/dkypooh/fro…(opens new window)](https://github.com/dkypooh/front-end-develop-demo/tree/master/base/mobx-counter)

## Redux状态管理

![img](http://img-repo.poetries.top/images/169807b65b0b902d.gif)

Redux 是一种 数据的管理 方式， 所有的状态都要遵循统一的流程才能更改状态。 界面操作 Action ，然后 Dispatcher 到 Store 更新状态 State，推送新状态到视图 View（重点）

> action --> dispatch --> reducer --> state

下面带着 redux-counter 源码例子讲解Redux的3个核心概念：

### 单一数据源（Store）

Redux 通过一个 JavaScript 对象管理状态，该对象称为数据存储（Store），包含应用程序的所有状态。

整个应用的 state 被储存在一棵 object-tree 中，并且这个 object-tree 只存在于唯一一个 store 中

```text
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Counter from './components/Counter';
import counter from './reducers';

// 创建一个全局store
const store = createStore(counter);

// react-redux连接器，存入store
ReactDOM.render(
  <Provider store={store}>
    <Counter />
  </Provider>,
  document.getElementById('root')
);
```

代码详解：

1. 使用 redux 的 createStore 创建一个全局 store，保存全局状态树。
2. 使组件层级中的 connect() 方法都能够获得 Redux store。正常情况下，你的根组件应该嵌套在 中才能使用 connect() 方法。

### 应用程序状态（State）不可变

确保了视图和网络请求都不能直接修改 state，相反它们只能表达想要修改的意图。因为所有的修改都被集中化处理，且严格按照一个接一个的顺序执行，因此不用担心竞态条件（race condition）的出现。

Action 就是普通对象而已，因此它们可以被日志打印、序列化、储存、后期调试或测试时回放出来。

如果想修改 State 的状态，Redux 规定了需要走统一的 Action 的 Dispatch 流程。

#### 计数器 Action 实现

```text
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

// 返回 增加行为 类型
export const increment = (param) => {
  return {
    type: INCREMENT
  }
};

// 返回 减少行为 类型
export const decrement = (param) => {
  return {
    type: DECREMENT
  }
};
```

代码详解：Action 的职能，描述了增加/减少的行为，不改变 State 的状态。

### 使用纯函数来执行修改（Reducer）

Reducer 只是一些纯函数，它接收先前的 state 和 action，并返回新的 state。公式：

> F(State) = newState

#### 计数器 Reducer 实现

```text
import { INCREMENT, DECREMENT } from '../actions';

// 初始化代码
const initialState = {
  count: 0
}

export default (state = initialState, action) => {
  // 返回纯函数
  switch (action.type) {
    case INCREMENT:
      return {
        count: state.count + 1
      }
    case DECREMENT:
      return {
        count: state.count - 1
      }
    default:
      return state;
  }
};
```

代码描述：Action 只是描述了行为，真正修改状态的是 Reducer。

### React-Redux库

React-Redux 提供 Connect 方法用于连接 React 组件与 Redux Store，Connect 是一个高阶组件， 声明如下：

> connect([mapStateToProps], [mapDispatchToProps], [mergeProps],[options])

#### mapStateToProps

这个函数允许我们将 store 中的数据作为 props 绑定到组件上, 输入 state，并把 state 绑定到 props

> mapStateToProps(state, ownProps) : stateProps

### mapDispatchToProps

connect 的第二个参数是 mapDispatchToProps，它的功能是，将 action 作为 props 绑定到组件上，也会成为组件的 props。

```text
import React, { Component } from "react";
import { connect } from 'react-redux';
import { increment, decrement } from '../actions';

class Counter extends Component {
    render() {
        return (
            <p>
                Clicked: {this.props.count} times
                <button onClick={() => { this.props.increment() }}>
                    +
                </button>
                <button onClick={() => { this.props.decrement() }}>
                    -
                </button>
            </p>
        );
    }
}

// 1. 构造 state = {count: 0} 数据模型，映射state到props
const mapStateToProps = (state) => {
    return {
        count: state.count
    };
};

// 2. 映射action到props，同时执行dispatch
const mapDispatchToProps = {increment, decrement};

// 3. connect作为高阶函数组件，内部连接redux的状态流转流程
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

代码解析，翻阅 connect 实现源码，实现为一个高阶组件：

1. mapStateToProps 作为 connect 的第一个参数， 构造 state = {count: 0} 数据模型，映射 state 到 props，此组件就可以直接通过属性调用。
2. mapDispatchToProps 作为 connect 的第二个参数， 映射 action 到 props，同时执行 dispatch。
3. connect 作为高阶函数组件，内部连接 redux 的状态流转流程

## Mobx状态管理

![img](http://img-repo.poetries.top/images/169848d298bc5d09.png)

Mobx 通过透明的函数响应式编程(transparently applying functional reactive programming - TFRP)使得状态管理变得简单和可扩展。

背后的哲学：任何源自应用状态的东西都应该自动地获得。

MobX 的实现思路非常简单直接，类似于 Vue 中的响应式的原理，其实质可以简单理解为观察者模式，数据是被观察的对象，「响应」是观察者，响应可以是计算值或者函数，当数据发生变化时，就会通知「响应」执行。

Mobx 我理解的最大的好处是简单、直接，数据发生变化，那么界面就重新渲染，在 React 中使用时，我们甚至不需要关注 React 中的 state，我们看下用 MobX 怎么实现我们上面 Redux 的状态变更。

```text
import React from "react";
import ReactDOM from "react-dom";
import { observable, action } from "mobx";
import { Provider, observer, inject } from "mobx-react";

import "./styles.css";

class Store {
  // 1. count 设置为可观察属性，可以动态改变
  @observable count = 0;
  // 2. action 是唯一可以修改状态，在此副作用下状态可以直接修改并且相应
  @action inc = (n = 1) => (this.count += n);
}

// 3. 注入 Store 属性到组件
@inject("store")
// 4. 设置无状态组件为响应式组件，相应action产生的副作用，更新UI
@observer
class App extends React.Component {
  render() {
    const { store } = this.props;

    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <p onClick={() => store.inc()}>{store.count}</p>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={new Store()}>
    <div>
      <App />
    </div>
  </Provider>,
  rootElement
);
```

对于 Mobx 的可以分为几个重要概念来执行：

1. 设置 `observer` 可观察的状态, 哪些状态可以改变的
2. `@action` 描述这是一个修改数据的动作，这样代码逻辑更清晰、底层也会做一些性能优化、并且在调试的时候结合调试工具能够提供有用的信息。
3. `@reactions` 和计算值很像，但它不是产生一个新的值，而是会产生一些副作用，比如打印到控制台、网络请求、递增地更新 React 组件树以修补DOM、等等。
4. 在组件上添加 `observer` 函数/ 装饰器. ，把无状态组件变成响应式组件，相应 action 产生的副作用，更新UI

## Redux VS Mobx 结语

Mobx 的数据修改说的好听点是「灵活」，不好听点是「随意」。

不过相对于 Redux 而言，Mobx 还是灵活很多，它没有太多的约束和规则，在少量开发人员或者小型项目中，会非常地自由和高效，但是随着项目的复杂度和开发人员的增加，这种「无约束」反而可能会带来后续高昂的维护成本，反之 Redux 的「约束」会确保不同的人写出来的代码几乎是一致的，因为你必须按照它约定的规则来开发，代码的一致性和可维护性也会更好。

## 思考题

Q: Mobx的数据拦截原理，简单实现一个对象getter 和 setter ？

## 参考文档

- [中文Mobx指南(opens new window)](https://cn.mobx.js.org/)
- [结合具体场景，聊聊 React 的状态管理方案(opens new window)](https://juejin.im/post/6844903766030827534)
- [Redux 中文文档(opens new window)](https://www.redux.org.cn/)



# Babel编译及代码规范

## 前言

大家一起学习探讨 三大开发环境利器 ESLint, EditorConfig 和 Babel, 前两者属于代码规范，最后一个属于JavaScript的编译器。

浅谈 Babel 的 AST 编译过程，以及Babel 的 Plugin 和 Preset 的区别。

如何搭建项目开发静态代码检查规范，大厂的开箱即用的 EditorConfig 配置规则。

把三个知识点放在一起更好配合下文的React项目开发环境搭建实践。

### Babel + React 开发环境

> 源码地址：[github.com/dkypooh/fro…(opens new window)](https://github.com/dkypooh/front-end-develop-demo/tree/master/base/babel7-react)

### 理解 Eslint 和 EditorConfig

ESLint 是一种可组装的 JavaScript 和 JSX 检查工具。 完全可配置，可以自定义每一个规则。

EditorConfig 是一个跨编辑器的项目统一编码样式管理规范，由文件定义格式和文本编辑插件格式。

### 理解 Babel

Babel 是一个代码编译器，输入代码编译输出代码 (source code => output code)。

### 开箱即用的 EditorConfig 配置规则

```text
# 所有文件匹配
[*] 
indent_style = space                # 缩进样式
end_of_line = lf                    # 结束换行，cr回车
indent_size = 2                     # 缩进2个空格
charset = utf-8                     # 文件utf-8编码
trim_trailing_whitespace = true     # 去掉末尾空格
insert_final_newline = true         # 在最后插入一个新行

# md文件匹配
[*.md]
trim_trailing_whitespace = false    # 取消去掉末尾空格
```

在 VSCode 编辑器下要首先要下载 `EditorConfig` 插件，然后配置代码样式规划：

![img](http://img-repo.poetries.top/images/1689ccd2dad80ad8.png)

## Babel编译原理

### AST语法解析实例

通过 AST 树形描述了表达式的语法结构。例如变量声明 （`VariableDeclaration`），字符穿字面量 （`StringLiteral`） 及值 （`value`）等等。

![img](http://img-repo.poetries.top/images/1689dd0d152cfcd8.png)

如下是 AST 编译器地址：[AST链接地址(opens new window)](https://astexplorer.net/#/gist/e6af3d)

### Babel编译过程

![img](http://img-repo.poetries.top/images/1689d6f652979726.png)

abel 的三个主要处理步骤分别是： **解析（parse）**，**转换（transform）**，**生成（generate）**。原理不是本章重点，具体可以查看参考文档[Babel插件指南]。

- **解析：** 解析步骤接收代码并输出 AST。 这个步骤分为两个阶段：**词法分析（Lexical Analysis**和 **语法分析（Syntactic Analysis）**。
  - **词法解析：** 词法分析阶段把字符串形式的代码转换为**令牌（tokens） 流。**
  - **语法解析：** 语法分析阶段会把一个令牌流转换成 AST语法书的形式。
- **生成：** 代码生成步骤把最终（经过一系列转换之后）的 AST转换成字符串形式的代码，同时创建源码映射（source maps）。
  - 代码生成其实很简单：深度优先遍历整个 AST，然后构建可以表示转换后代码的字符串

## Babel基础配置

Babel 是一个工具链，主要用于在旧的浏览器或环境中将 ECMAScript 2015+ 代码转换为向后兼容版本的 JavaScript 代码。

### babel-cli 命令行转换工具

```text
# 工具安装 
$ npm i babel-cli -g

# 转码结果输出到标准输出
$ babel example.js

# 转码结果写入一个文件
# --out-file 或 -o 参数指定输出文件
$ babel example.js --out-file compiled.js
# 或者
$ babel example.js -o compiled.js

# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
$ babel src --out-dir lib
# 或者
$ babel src -d lib

# -s 参数生成source map文件
$ babel src -d lib -s
```

### .babelrc 配置文件

在特定环境的时候，您可以用 env 选项来设置特定的配置, 如下在生产环境中指定插件：

```text
{
  "env": {
    "production": {
      "plugins": ["transform-react-constant-elements"]
    }
  }
}
```

env 选项的值将从 process.env.BABEL_ENV 获取，如果没有的话，则获取 process.env.NODE_ENV 的值，它也无法获取时会设置为 `development` 。

您可以通过下面的方法设置环境变量, 也可以使用跨平台命令 `cross-env` ：

```text
# 指定Babel环境
$ BABEL_ENV=production <commond>

# 跨平台使用
$ cross BABEL_ENV=production <commond>
```

### 查找规则

Babel 会在正在被转录的文件的当前目录中查找一个 `.babelrc` 文件。 如果不存在，它会遍历目录树，直到找到一个 `.babelrc` 文件，或一个 package.json 文件中有 "babel": {}。

### .babelrc 的几种配置方式

#### 通过 package.json 使用Babel

```text
{
  "name": "my-package",
  "version": "1.0.0",
  "babel": {
    // my babel config here
  }
}
```

#### 通过 .babelrc 使用 Babel

```text
{
    plugins: [],
    presets: []
}
```

### React 开发环境配置实例

如下是配置 React 开发环境的事例，需要用到 `es2015`, `react`, `stage-1`三个 Preset 预设装置。

```text
# ES2015转码规则
$ npm install --save-dev babel-preset-es2015

# react转码规则
$ npm install --save-dev babel-preset-react

# ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
$ npm install --save-dev babel-preset-stage-0
{
    "presets": [
      "es2015",
      "react",
      "stage-1"
    ]
}
```

### Plugin 和 Preset 区别

Preset 是由一系列的 Plugins 组成的。可以组合完成 Plugins 的事情。例如 `babel-preset-react` 由如下 Plugins 组成：

```text
preset-flow
syntax-jsx
transform-react-jsx
transform-react-display-name
```

## ESLint 配置

为了在 Node.js 上运行 ESLint，你必须先安装 npm，之后全局安装 eslint

```text
 npm i eslint -g    // 全局安装eslint
```

初始化eslint文件前需要有 package.json 文件，生成 package.json，之后再生成 .eslint.js 文件

```text
npm init            // 生成package.json
eslint --init       // 生成.eslint.js
```

Eslint fix 可以根据 eslint 检查配置 自动修复编码问题。 [参考ESLint修复选项(opens new window)](https://cn.eslint.org/docs/rules/)

```text
## 语法
eslint [options] file.js [file.js] [dir]
## 实例, 按照eslint配置，检查根目录和src目录，同时修复
eslint --config .eslintrc.js ./src/*  --fix 
```

### ESLint Rules 配置

ESLint Rules 配置是ESLint的核心概念，规定了多人协作开发过程的代码规范。如下讲解下 ESLint Rules 配置语法。

![image-20210214194314985](http://img-repo.poetries.top/images/image-20210214194314985.png)

Rules 属性可以做下面的任何事情以扩展（或覆盖）规则：

```text
# 改变继承的规则级别而不改变它的选项：
基础配置："eqeqeq": ["error", "allow-null"]
派生的配置："eqeqeq": "warn"
最后生成的配置："eqeqeq": ["warn", "allow-null"]
    
# 覆盖基础配置中的规则的选项
基础配置："quotes": ["error", "single", "avoid-escape"]
派生的配置："quotes": ["error", "single"]
最后生成的配置："quotes": ["error", "single"]
```

### ESLint常用插件

如下列举项目开发中一些常用插件和 ESLint 规范。

- **eslint-plugin-react:** React语法规则插件
- **eslint-config-airbnb:** airbnb ESLint开发规范
- **eslint-config-standard:** JavaScript ESLint开发规范

## 搭建React项目开发环境

本小节通过搭建React项目开发环境，实践讲解如何配置 ESLint 和 editorconfig 。 同时 Babel 插件如何使用。

配置参考项目地址： [React项目仓库地址(opens new window)](https://github.com/dkypooh/front-end-develop-demo/tree/master/base/babel6-react)

### 初始化开发环境

```text
npm init            // 生成package.json
eslint --init       // 生成.eslint.js
```

### 初始化项目目录

`editorconfig`和`babel`可以参考上文配置。

![image-20210214194343164](http://img-repo.poetries.top/images/image-20210214194343164.png)

**Package依赖** 主要有三大方面：Babel依赖，ESLint依赖 和 Webpack配置

### 编写React组件

![image-20210214194439327](http://img-repo.poetries.top/images/image-20210214194439327.png)

### NPM Script命令行

```text
$ npm run start             // 启动服务
$ npm run build             // 构建代码
$ npm run size              // 代码大小分析
$ npm run lint              // ESLint检查
```

### 输出页面

![image-20210214194504873](http://img-repo.poetries.top/images/image-20210214194504873.png)

## Babel6 迁移 Babel7

为了更好的适应未来的变化，越来越多老的项目需要迁移到 Babel7上面，作者总结了如下迁移方案，Babel渐进性更新弃用了一些原来的插件。有如下重要迁移的改变：

- **弃用 Stage Preset：** Babel正在删除 Stage presets，以支持明确的提案使用。默认使用`Stage-0`支持更多的特性。
- **弃用年份 Preset:** 例如`babel-preset-es2015`等， 使用`@babel/preset-env`来代替
- **删除 @babel/polyfill 中的 polyfill 提案**: `polyfill`插件会产生一些副作用，使用`@babel/runtime`代替，优化代码

具体可以参考 [React-Babel7迁移项目(opens new window)](https://github.com/dkypooh/front-end-develop-demo/tree/master/packages/babel7-react)

## 结语

通过本章的阅读，我们可以了解到 Babel 编译的三个核心步骤（`inputCode => outputCode`）， 同时通过React项目实践 Babel, ESlint， Editorconfig 三大能力。

最后把此项目从 Babel6 迁移到 Babel7，增加新的特性，适应未来的变化。

下一章将要学习 Webpack 环境开发搭建以及常用的Webpack优化技巧，需要了解下 Webpack 的基本知识和原理。

请预先预习 [Webapck 官方文档(opens new window)](https://www.webpackjs.com/concepts/)

## 思考题

Q：通过 AST Explorer [astexplorer.net/# (opens new window)](https://astexplorer.net/#)观察下抽象语法书的结构？

## 参考文档

- [Babel 插件开发指南(opens new window)](https://github.com/brigand/babel-plugin-handbook/blob/master/translations/zh-Hans/README.md#babylon)
- [AST测试地址(opens new window)](https://github.com/brigand/babel-plugin-handbook/blob/master/translations/zh-Hans/README.md#babylon)
- [Babel入门规则(opens new window)](http://www.ruanyifeng.com/blog/2016/01/babel.html)
- [ESLint规则配置列表(opens new window)](https://cn.eslint.org/docs/rules/)
- [EditorConfig官网(opens new window)](https://editorconfig.org/)
- [Babel7升级(opens new window)](https://babel.docschina.org/docs/en/7.0.0/v7-migration)



# Webpack环境搭建

## 前言

Webpack 是一个现代 JavaScript 应用程序的静态模块打包器 (module bundler)，使用 Webpack 可以对模块进行压缩、预处理、按需打包、按需加载等。

当 Webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

### Webpack 构建 React+Mobx+Scss 开发环境源码

> 源码地址：[github.com/dkypooh/fro…(opens new window)](https://github.com/dkypooh/front-end-develop-demo/tree/master/base/react-mobx-scss)

### 通过本章读者可以学习了解到什么？

- Webpack 核心概念以及基本配置。
- Webpack 性能优化策略，主要分为构建性能和构建包性能（大小和按需加载）两大部分
- 搭建 React + Mobx + Scss 开发环境 ，实践讲解如何构建一个主流开发环境， 如何一步步完善 webpack 性能

当前前端主流构建工具有 `Browserify`, `Grunt`, `Gulp`,`Webpack` 和 `Rollup`

![image-20210214195217677](http://img-repo.poetries.top/images/image-20210214195217677.png)

数据采集到2019年2月2日，最近半年数据指标

横向对比这几种构建工具，webpack 在构建工具还是占据主导地位，整个生态相对完善，同时可以自定义业务构建需要的 `plugin` 和 `loader` 。

## Webpack基础

从 Webpack 4 开始，可以不用引入一个配置文件, 可以实现零配置运行（之前 webpack 的配置复杂一直引起诟病），大多数项目会需要复杂的设置来支持开发环境定制，这也是他的强大之处。

在 Webpack 需要理解四个核心概念：**入口(entry)**， **输出(output)**，**加载器(loader)**，**插件(plugins)**。

## Webpack 四个核心概念

### 入口(entry)

**入口起点(entry point)** 是指 Webpack 应该使用哪个模块，来作为构建其内部依赖图的开始，Webpack 会找出有哪些模块和 library 是入口起点（直接和间接）依赖的。

可以通过在 [webpack 配置 (opens new window)](https://www.webpackjs.com/configuration)中配置 `entry` 属性，来指定一个入口起点（或多个入口起点），默认值为`./src`。

接下来我们看一个 `entry` 配置的最简单例子：`webpack.config.js`

```text
module.exports = {
  entry: 'src/copy.js'
};
```

### 输出(output)

**output** 属性告诉 Webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 `./dist`。基本上，整个应用程序结构，都会被编译到指定的输出路径的文件夹中。

你可以通过在配置中指定一个 `output` 字段，来配置这些处理过程：

**webpack.config.js**

```text
const path = require('path');

module.exports = {
  entry: './src/copy',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};
```

### 加载器(Loader)

**Loader** 让 Webpack 能够去处理那些非 JavaScript 文件（webpack 自身只识别 JavaScript），Loader 可以将所有类型的文件转换为 Webpack 能够处理的有效模块，然后你就可以利用 Webpack 的打包能力，对它们进行处理。

本质上，webpack loader 将所有类型的文件，转换为应用程序的依赖图和最终的 bundle 可以直接引用的模块。

> **主要注意是的:** 在更高层面，在 webpack 的配置中 loader 有两个目标：
>
> - **test 属性**，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
> - **use 属性**，表示进行转换时，应该使用哪个 loader。

**webpack.config.js**

```text
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [{ 
        test: /\.txt$/, 
        use: [
            { loader: 'style-loader' },
            { loader: 'css-loader', options: { modules:true }},
            { loader: 'sass-loader' }
        ]
    }]
  }
};
```

配置文件说明, 对一个单独的 module 对象定义了 rules 属性，里面包含两个必须属性：`test` 和 `use`。

- test: 表示需要检索的文件类型
- use: 指定配置文件 loader 选项，可以通过数组关联多个。

#### 常见的Loader

- **css-loader**: 解释 (interpret) @import 和 url() ，会 import/require 后再解析 (resolve) 它们，推荐和 **style-loader** 一起配合使用。
- **babel-loader**: 让 webpack 可以使用 babel 代码编译能力。并在 `.babelrc` 或者 `package.json` 的 `"babel: {"plugin": []}` 配置的编译的能力

### 插件(Plugins)

**Loader** 被用于转换某些类型的模块，而插件（Plugins）则可以用于执行范围更广的任务。

插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量，插件接口功能极其强大，可以用来处理各种各样的任务。想要使用一个插件，你只需要 require 进来，然后把它添加到 plugins 数组中。

多数插件可以通过选项 (option) 自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 new 操作符来创建它的一个实例。

**webpack.config.js**配置如下：

```text
const webpack = require('webpack'); //访问内置的插件
const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    // 1. 配置 UglifyJsPlugin 插件，优化打包后的JS大小
    new webpack.optimize.UglifyJsPlugin(),
  ]
};
```

## Plugin原理

插件（Plugin）是 Webpack 生态系统的重要组成部分，为社区用户提供了一种强大方式来直接触及 Webpack 的编译过程 (compilation process)。

### Plugin生命周期钩子（Hooks）

插件能够 Hook 到在每个编译 (compilation) 中触发的所有关键事件。在编译的每一步，插件都具备完全访问 compiler 对象的能力，如果情况合适，还可以访问当前 compilation 对象。

> 钩子(hook)参考文档：[www.webpackjs.com/api/compile…(opens new window)](https://www.webpackjs.com/api/compiler-hooks/#hooks)

**Plugin 是一个支柱，对于整个编译过程，模块处理进行全链路的钩子回调。**

### Loader原理

loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件。因此，loader 类似于其他构建工具中 “任务(task)”，并提供了处理前端构建步骤的强大方法。

loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL，loader 甚至允许你直接在 JavaScript 模块中 import CSS文件！

#### 安装Loader

例如，你可以使用 Loader 告诉 Webpack 加载 CSS 文件，或者将 TypeScript 转为 JavaScript。为此，首先安装相对应的 loader。

```text
npm install --save-dev css-loader
npm install --save-dev ts-loader
```

然后指示 Webpack 对每个 `.css` 使用 css-loader，以及对所有 .ts 文件使用 ts-loader：

**webpack.config.js**

```text
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  }
};
```

### Webpack的命令行工具

本小节会介绍下如何通过 `webpack-cli` 构建一个打包工具。使用两种方式构建开发环境：命令行方式 和 webpack 配置文件方式

#### 安装准备

安装 Webpack 的版本是 4.x, `webpack-cli` 和 `webpack-dev-server` 的版本是 3.x

```text
$ npm i webpack webpack-cli webpack-dev-server -D
```

#### 编写 命令行开发环境

通过 webpack 命令行配置 webpack-dev-server 开发服务。 说明如下：使用 `cross-env` 跨平台设置环境变量，当前环境为 `development`, 端口号为 `3000` ,静态资源的地址为 `./dist` , 使用 Chrome 浏览器打开，并且显示编译进度。

```text
$ cross-env NODE_ENV=development webpack-dev-server --config webpack.config.js --port 3000 --content-base ./dist --open 'Chrome' --progress 
```

#### 配置 npm scripts 完整的开发环境

通过 npm srcipts 脚本快捷管理开发环境，配置一个完善的开发环境主要有如下能力：

- start：开发环境配置
- build: 构建打包环境
- size: 分析打包大小环境
- lint: Eslint 代码检查以及修复

```text
"scripts": {
    "start": " cross-env NODE_ENV=development webpack-dev-server --config webpack.config.js",
    "build": "cross-env NODE_ENV=production  webpack --config webpack.config.js --progress",
    "lint": "npx eslint --config .eslintrc src --fix",
    "size": " cross-env NODE_ENV=analyzer webpack --config webpack.config.js --progress"
}
```

## React + Mobx + Scss 项目实践

本小节会通过搭建 React + Mobx + Scss 开发环境，和读者一起探讨 Webpack 的性能优化 的策略。性能优化主要从两个方面入手: 构建性能 和 打包文件大小性能。 总结下来有如下策略：

### 构建性能优化策略

#### 方案一: 合理配置 CommonsChunkPlugin

假设我们的页面中存在 entry1，entry2，entry3 三个入口，这些入口中可能都会引用如 utils，lodash，fetch 等这些通用模块，那么就可以考虑对这部分的共用部分机提取。配置如下：

```text
module.exports = {
  //...
  entry: {
    vendor: ['jquery', 'other-lib'],
    app: './entry'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      // filename: "vendor.js"
      // (给 chunk 一个不同的名字)
      minChunks: Infinity,
      // (随着 entry chunk 越来越多，
      // 这个配置保证没其它的模块会打包进 vendor chunk)
    })
  ]
};
```

**HTML配置文件**

```text
<script src="vendor.js" charset="utf-8"></script>
<script src="app.js" charset="utf-8"></script>
```

#### 方案二：通过 externals 配置来提取常用库

简单来说 external 就是把我们的依赖资源声明为一个外部依赖，然后通过 script 外链脚本引入。告知 Webapck 遇到此类变量名时就可以不用解析和编译至模块的内部文件中，而改用从外部变量中读取，这样能极大的提升编译速度，同时也能更好的利用 CDN 来实现缓存。配置如下：

```text
module.export = {
    react: {
        amd: 'react',
        root: 'React',
        commonjs: 'react',
        commonjs2: 'react'
    },
    'react-dom': {
        amd: 'react-dom',
        root: 'ReactDOM',
        commonjs: 'react-dom',
        commonjs2: 'react-dom'
    }
}
```

**HTML配置文件**

```text
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
```

#### 方案三：利用 DllPlugin 和 DllReferencePlugin

我们的项目依赖中通常会引用大量的 npm 包，而这些包在正常的开发过程中并不会进行修改，但是在每一次构建过程中却需要反复的将其解析。DllPlugin 的作用是预先编译一些模块，而 DllReferencePlugin 则是把这些预先编译好的模块引用起来。简单来说 DllPlugin 和 DllReferencePlugin 主要是缓存编译后的内容，对不变的文件减少二次编译。 配置如下：

**生成缓存文件 manifest.json **

webpack.dll.lib.js 为生成缓存文件，配置静态文件。

```text
$ NODE_ENV=development webpack --config  webpack.dll.lib.js --progress
```

**配置dllPlugin的静态资源引入**

```text
// 将mainfest.json添加到webpack的构建中
module.export = {
  plugins: [
       new webpack.DllReferencePlugin({
       context: __dirname,
       manifest: require('../dll/manifest.json'),
      })
  ]
}
```

#### 方案四：使用 Happypack 加速你的代码构建

happypack 的处理思路是将原有的 Webpack 对 loader 的执行过程从单一进程的形式扩展多进程模式，原本的流程保持不变，这样可以在不修改原有配置的基础上来完成对编译过程的优化，核心配置如下：

```text
module.export = {
    module: {
        rules: [
          { test: /\.jsx|js?$/, use: 'happypack/loader?id=jsx'}
        ]
    },
    plugins: [
        new HappyPack({ id: 'jsx', threads: 4, loaders: ['babel-loader']}),
    ]
}
```

配置解析：在 rules 需要配置 happypack 的 loader id，在 Happypack 插件需要配置 线程数。

## 打包文件性能优化

打包文件性能优化主要手段是采用特定的方式来减少最终打包的大小，下文介绍几种基础的配置来优化打包的文件大小。

我们使用原始的打包方式，所有的资源文件都会打包到 `bundlejs` 里面，导致 `bunldejs` 很大，如下图所示

![image-20210214195508829](http://img-repo.poetries.top/images/image-20210214195508829.png)

### 提取公共文件

相同的资源被重复的加载，浪费用户的流量和服务器的成本，每个页面需要加载的资源太大，导致网页首屏加载缓慢，影响用户体验，将多个入口重复加载的公共资源提取出来, 基本配置如下。

> 在 webpack4.0 optimization.splitChunks 替代了 CommonsChunkPlugin

#### webpack 配置

```text
module.exports = {
    optimization: {
        splitChunks: {
          // 默认打包node_modules到venders.js
          chunks: 'all'
        }
    },
    entry: {
        bundle: './src/index.js',
        vendor: ['react', 'react-dom'] // 配置哪些依赖包需要提取到 vendor 文件中
    },
}
```

#### 优化后的效果如下

![image-20210214195613516](http://img-repo.poetries.top/images/image-20210214195613516.png)

可以看到公共文件被提取到 `vendor.js` 文件中了， `bundle.js` 文件大小 94KB 左右

### 压缩资源文件

对原有文件进行压缩和混淆一方面有利于以更小的体积传输， 另一方面有利代码安全。 在 webpack4 中配置如下：

#### webpack 配置

```text
module.exports  = {
    mode: 'production'
}
```

#### 优化后的效果

![image-20210214195728158](http://img-repo.poetries.top/images/image-20210214195728158.png)

可以看到 `bundle.js` 文件大小有原先的 `94KB` 压缩到 `70KB`, 通过 gzip 压缩后的大小为 `14KB`。

### Tree Shaking

Tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。执行生产编译 （mode = production）默认已开启Tree Shaking。

#### [](http://interview.poetries.top/fe-react-docs/im-chat/docs/08-Webpack环境搭建.html#webpack-配置-3)webpack 配置

```text
module.exports  = {
    mode: 'production'
}
```

## 思考题

Q：如何把react, jquery等外部依赖文件, 从输出的 bundle 中排除依赖, 不打包进bundle, 变成外部依赖？

## 参考文献

- [webpack配置说明(opens new window)](https://user-gold-cdn.xitu.io/2019/3/18/16990228e0ed6ba0)
- [Webpack Plugins插件列表(opens new window)](https://www.webpackjs.com/plugins/)
- [Webpack Loaders列表(opens new window)](https://www.webpackjs.com/loaders/)
- [从零开始使用webpack 4, Babel 7创建一个React项目（2018）(opens new window)](https://user-gold-cdn.xitu.io/2019/2/2/168ac617a14e5a29)



# Jest前端测试框架

## 前言

测试是整个项目保障最重要的一环，关系到最终软件的产出质量， 测试对后端来说相对比较熟悉，包括 接口测试，单元测试，性能测试，流量压测 等。但对于前端来说相对比较陌生，由于前端偏向于 GUI 软件性质，同时国内快速的业务迭代节奏，前端做自动化测试的投入产出比不高。

### Jest测试环境源码地址

> 源码地址：[github.com/dkypooh/fro…(opens new window)](https://github.com/dkypooh/front-end-develop-demo/tree/master/base/jest)

[知乎讨论 - TDD（测试驱动开发）是否已死？(opens new window)](https://www.zhihu.com/question/37623307)

```text
自动化的收益 = 迭代次数 * 全手动执行成本 - 首次自动化成本 - 维护次数 * 维护成本
```

**解释：** 计算公式可以看出来首次投入的成本远远小于首次收益，但是随着项目迭代，收益会越来越明显。

**作者认为：** 对于前端是否适合做自动化测试，不能一棒子肯定或者否定，需要辩证根据不同的应用场景，项目重要程度（资金相关应用）来判断。下面列举了一些场景

- **数据层SDK：** 不涉及UI表现，需要做单元测试，接口覆盖率测试等，它是提供服务给UI层，还需要考虑业务接入版本管理问题。 它的投入产出比远远超出预期。
- **资损类型项目：** 对于资金相关的项目，需要重点保障，接口或者UI的改变都可能导致项目严重故障。它的投入产出比也远远超出预期。
- **其他非核心保障项目：** 量力而行，不要为了 `TDD` 而 `TDD`

## Jest前端测试框架

Jest 是 Facebook 出品的一个测试框架，相对其他测试框架，最大的特点就是内置了常用的测试工具，比如 `自带断言`、`测试覆盖率工具`，`UI测试工具`，`Mock能力` 等，同时可以集成很多插件，与主流的软件库配合测试，比如：`Typescript`, `React`, `Vue`等， 真正实现了开箱即用。

### 基本配置

```text
$ npm install --save-dev jest
```

创建一个 **sum.js** 文件

```text
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

创建一个 **sum.jest.js** 文件

```text
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

在`package.json`创建 `NPM Scripts`

```text
{
  "scripts": {
    "test": "jest"
  }
}
```

运行 `npm run test` 查看结果

```text
PASS  ./sum.test.js
✓ adds 1 + 2 to equal 3 (5ms)
```

### 配置文件

初始化生成 `jest.config.js` 文件，可以选择 `node` 和 `jsdom` 两种环境，暂时选择 `node` 环境，之后根据项目需求配置 `jest.config.js` 文件

```text
$ npx jest --init
## 执行jest测试
$ npx jest -c jest.config.js --colors
```

### Jest全局变量及生命周期

在您的测试文件，Jest 将这些方法和对象放入全局环境。你不必导入即可使用它们

![image-20210214200043550](http://img-repo.poetries.top/images/image-20210214200043550.png)

#### afterAll 测试用例

以 `afterAll` 测试用例为例，其他生命周期也是一样。 解释下面用例：创建全局数据库，查询事物，等所有调用结束后关闭数据库。

```text
const globalDatabase = makeGlobalDatabase();

function cleanUpDatabase(db) {
  db.cleanUp();
}

afterAll(() => {
  cleanUpDatabase(globalDatabase);
});

test('can find things', () => {
  return globalDatabase.find('thing', {}, results => {
    expect(results.length).toBeGreaterThan(0);
  });
});
```

### Typescript 单元接口测试

Typescript 由于强类型检查，代码提示等优秀的特性，越来越成为主流开发语言。Jest 也很好的支持了 Typescript 语法。Typescript 在数据 SDK 接口模块开发中发挥了重要角色，考虑到之后的维护性和扩展性，对于 SDK 提供基础能力模块必须要用 Typescript 开发，同时配合 Jest 做单元测试和覆盖率测试，到达事半功倍的效果。

参考 [前端高阶能力 - 通用SDK设计 案例(opens new window)](https://github.com/dkypooh/front-end-develop-demo/tree/master/senior/sdk)

#### 搭建Typescript测试环境

安装 `typescript`, `@types/jest`, `jest`, `ts-jest` 依赖。

详细配置参考 [Using Jest with TypeScript(opens new window)](https://basarat.gitbooks.io/typescript/docs/testing/jest.html)

```text
{
    "devDependencies": {
        "typescript": "^3.3.1",
        "@types/jest": "^24.0.0",
        "jest": "^24.1.0",
        "ts-jest": "^23.10.5"
    }  
}
```

#### 配置 jest.config.js

使用 `ts-jest` 插件进行 `.ts` 的语法转化。

```text
module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js?|ts?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
```

#### SDK 测试用例

```text
import SDK from '../src/index'

describe('SDK Test', () => {
  const sdk = new SDK([]);
  it('subscribe and publish', (done) => {
    sdk.on('publish', (obj) => {
      expect(obj).toEqual({cmd: 'publish'});
      done();
    })
    sdk.emit('publish', {cmd: 'publish'});
  });

  it('add middleware module', (done) => {
    sdk.useBatch([(ctx: any) => {
      ctx.message.content = 'test';
    }, (ctx: any) => {
      ctx.conversation.lastMsg = 'test';
    }])
    sdk.dispatch({type: 'text'}, {id: 'yyy'}).then((ctx) => {
      expect(ctx.message).toEqual({ type: 'text', content: 'test' })
      expect(ctx.conversation).toEqual({ id: 'yyy', lastMsg: 'test' })
      done();
    })
  })
})
```

### React 测试

对于核心资损业务，不管是 接口层 SDK 还是 UI层 改动都会存在风险。Jest 也提供了 React UI 测试能力。同时配合 enzyme 断言和控制 UI 组件渲染。

[enzyme (opens new window)](https://airbnb.io/enzyme/docs/guides/jest.html)是 Airbnb开源的 React 测试类库， 提供了一套简洁强大的 API，并通过 jQuery 风格的方式进行DOM 处理。

> 源码参考地址： https://github.com/dkypooh/front-end-develop-demo/tree/master/base/jest

#### 测试实例

`CheckboxWithLabel-test.js` 测试例子， `enzyme shallow` 方法渲染 `DOM` 元素，

```text
import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()}); // 设置适配器

import CheckboxWithLabel from '../src/components/CheckboxWithLabel';

it('CheckboxWithLabel changes the text after click', () => {
  // Render a checkbox with label in the document
  const checkbox = shallow(<CheckboxWithLabel labelOn="On" labelOff="Off" />);

  expect(checkbox.text()).toEqual('Off');

  checkbox.find('input').simulate('change');

  expect(checkbox.text()).toEqual('On');
});
```

### 快照

每当你想要确保你的UI不会有意外的改变，快照测试是非常有用的工具。

一个典型的移动app快照测试案例过程是，先渲染UI组件，然后截图，最后和独立于测试存储的参考图像进行比较。

上文提到的 **重点资损项目** 可以监测UI改动差异，是否符合预期

> 源码参考地址： https://github.com/dkypooh/front-end-develop-demo/blob/master/base/jest/**test**/link.test.js

#### 测试用例

```text
it('renders correctly', () => {
  const tree = renderer
    .create(<Link page="http://www.facebook.com">Facebook</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
```

修改链接 `facebook` 为 `taobao`, 运行 `npm run test`。运行结果如下：

```text
- Snapshot
+ Received

  <a
    className="normal"
-   href="http://www.facebook.com"
+   href="http://www.taobao.com"
    onMouseEnter={[Function]}
    onMouseLeave={[Function]}
  >
    Facebook
  </a>
```

## Code Review

![image-20210214200113546](http://img-repo.poetries.top/images/image-20210214200113546.png)

`Code Review` 是阿里巴巴最为看重保证质量的环节。 尤其在双十一期间上线需求都需要多人多次 `Code Review` 保证上线质量。

`Code Review` 的好处显然易见，一方面，方面能够在及早发现代码中潜在的bug，统一团队的代码规范。 另一方面, `Review` 过程也是相互学习的过程, 同时可以对项目做好 `Backup` 需求。

`Code Review` 形式可以灵活多变，前期需要有人审核你的代码，同时优化你代码。 本章提出来 **希望大家重视 `Code Review` 过程， 对保证项目质量非常重要**

## 结语

作者认为测试是保证项目质量的最重要的环节。由于前端的特性，我们需要根据当时的场景和项目情况来合理安排测试，力争投入产出比最高。

通过本章的学习，我们了解 `Jest` 前端测试框架的能力，以及 `Jest` 全局变量和生命周期，`Snapshot` 快照的能力引入有效的减少UI改变带来的风险，最后，`Code Review` 是代码质量最重要的保障措施。

## 思考题

Q: 使用上文Jest项目，实现一个UI快照用例？ 参考地址：[jestjs.io/docs/zh-Han…(opens new window)](https://jestjs.io/docs/zh-Hans/snapshot-testing)

## 参考文档

- [知乎讨论-如何进行前端自动化测试(opens new window)](https://www.zhihu.com/question/29922082)
- [Using Jest with TypeScript(opens new window)](https://basarat.gitbooks.io/typescript/docs/testing/jest.html)
- [Jest 测试中文文档(opens new window)](https://deltice.github.io/jest/docs/zh-Hans/getting-started.html)
- [如何有效地做 Code Review(opens new window)](https://zhuanlan.zhihu.com/p/19967954)



# JSDoc 文档管理

## 前言

[JSDoc (opens new window)](http://usejsdoc.org/)是一个根据 Javascript 文件中注释信息，生成 JavaScript 应用程序或库、模块的 API 文档 的工具。你可以使用他记录如：命名空间，类，方法，方法参数等。

JSDoc 可以帮助开发者将标准化的注释转化为文档，协同开发其他开发者可以快速了解整个类和其中的属性和方法，并且快速知道如何使用，从而提高开发效率，降低维护成本。

### Jsdoc开发环境地址

> 源码地址：[github.com/dkypooh/fro…(opens new window)](https://github.com/dkypooh/front-end-develop-demo/tree/master/base/jsdoc)

> Jsdoc脚手架地址：[github.com/ge-tbms/gen…(opens new window)](https://github.com/ge-tbms/generator-lerna-jsdoc-packages)

## 安装

```text
$ npm i jsdoc -g
```

## 主题及配置

JSDOC 提供很多丰富的主题 ([主题资源列表 (opens new window)](https://cancerberosgx.github.io/jsdoc-templates-demo/demo/)), 本章以 DocStrap 主题为例，它是以 [Bootstrap (opens new window)](https://getbootstrap.com/2.3.2/)样式为原型。

```text
$ npm i ink-docstrap -D // 主题安装
```

### 配置信息

参考 [JSDOC文档 (opens new window)](http://usejsdoc.org/about-configuring-jsdoc.html)默认配置项。如下解释说明

- **plugins：** 添加 `markdown` 插件
- **includePattern：** 正则匹配 `js` 和 `md` 文件
- **excludePattern：** 正则过滤掉 `_`模式文件，例如: `node_modules`
- **opts：** 命令行选项合并到配置文件，Destination 输出文件，Template 主题模板。

```text
{
  "applicationName": "sdk document",
  "plugins": [
    "plugins/markdown"
  ],
  "source": {
    "include": [
      "./src/"
    ],
    "includePattern": ".+\\.js(md)?$",
    "excludePattern": "(^|\\/|\\\\)_"
  },
  "opts": {
    "encoding": "utf8",
    "recurse": true,
    "destination": "./build",
    "template": "./node_modules/ink-docstrap/template"
  }
}
```

### 命令行配置

```text
$ jsdoc -e utf8 -d ./build -t ./node_modules/ink-docstrap/template ./src README.md -r

## config配置 等同于 👆命令行配置
$ npx jsdoc -c conf.json -R README.md
```

## 关键属性

### IMSDK类配置实例

`@class` 标签标明函数是一个构造器函数

```text
/**
 * @class IMSDK
 * @description 消息基础SDK，`回调函数全部小写`
 * @name IMSDK
 * 
 * @param {Object} options                      配置参数
 * @param {String} options.appKey               应用APPKEY
 * @param {String} options.biz                  业务类型, BC, CC, 小蜜等 {@link IMSDK.biz|业务类型 }
 * @param {String} options.targetId             目标用户Id, 可以是群ID或者用户Nick
 * @param {String} [options.account]            账号Id或者Nick
 * @param {Function} options.onlogin            登入回调，可以拿到用户信息
 * @param {Function} options.onconnect          连接建立后的回调, 会传入一个对象, 包含登录的信息
 * @param {Function} options.onclose            断开连接后的回调
 * @param {Function} options.onerror            发生错误回调  {@link IMError|消息错误}
 * @param {Function} options.onmsg              实时消息回调 {@link IMMessage|消息体}
 * @param {Function} options.onsystemmsg        系统消息回调
 * @param {Function} options.onofflinemsg       离线消息，漫游消息，历史消息回调 {@link IMMessage|消息体}
 * @param {Function} options.onconversation     同步最近会话{@link Conversation|会话}列表回调, 会传入会话列表。
 * 
 * 
 * @example
 * const imsdk = new IMSDK({
 *      appkey: 'appKey',
 *      targetId: 'xxxx',
 *      account: 'account',
 *      onlogin: onLogin,
 *      onclose: onClose,
 *      onerror: onError,
 *      onmsg: onMsg,
 *      onsystemmsg: onSystemMsg,
 *      onofflinemsg: onOfflineMsg,
 *      onconversation: onConversation
 * })
 */
```

### namespace实例

`@namespace` 标签指明对象是一个命名空间, 用于 **实体对象** 的说明

```text
/**
* @namespace
* @name Conversation
* @property {String}   id                  会话ID
* @property {String}   scene               {@link IMMessage.type|场景}
* @property {String}   to                  聊天对象, 账号或群ID
* @property {Long}     updateTime          会话更新的时间
* @property {Number}   unread              未读数
* @property {Message}  lastMsg             此会话的最后一条消息
* @property {String}   custom              自定义消息
*/
```

- **@class:** 标示构造器函数
- **@description:** 构造器函数描述
- **@name：** 构造器函数名称，可以被 `@link` 引用
- **@param：** 标记方法参数及参数类型, 语法格式 `@param {类型} 属性 - 说明`
- **@link:** 外部属性链接
- **@example:** 举例说明
- **@property:** 属性说明 `@property {类型} 属性 说明描述`

## 结语

上文介绍了 JSDoc 的基本配置，给读者推荐了 DocStrap 主题配置模板，参考 [IMSDK文档 (opens new window)](https://github.com/dkypooh/front-end-develop-demo/tree/master/base/jsdoc)可以开箱即用。 同时列举了 JSDoc 常用的配置属性。

IMSDK文档 会在 《项目最佳实践》章节中作为标准化文档使用。

## 参考文档

- [JSDoc 中文文档(opens new window)](http://www.shouce.ren/api/view/a/13232)
- [JSDoc 常用属性(opens new window)](https://www.jianshu.com/p/f2a363513d67)
- [JSDoc 插件介绍(opens new window)](https://www.html.cn/doc/jsdoc/about-plugins.html)



# 前端进阶能力

## 前言

通过前端基础能力篇章的学习，相信读者了解前端开发中的核心知识点，同时建立了系统化的前端知识模型。如何把这些前端知识点应用到具体业务场景中，这是本章节我们要一起来探讨学习的课题。

## 思路大纲

作者理解为的框架设计能力应该是：**源于业务场景，对业务场景抽象，高于业务，是一种可以被复制的能力**。

作者把这部分能力称为前端高阶能力，把这部分的能力设计模式、流程抽象及领域模型、组件通信、开发工作流划分了四个维度来探讨。

![image-20210214200452844](http://img-repo.poetries.top/images/image-20210214200452844.png)

## 目标

前端高阶能力篇章主要为了提升读者的综合能力，一起探讨学习系统设计，业务场景抽象等。

通过这一层的学习，我们可以了解到前端主流设计模式，跨组建的通信策略， 如何设计一个通用SDK的模型，同时构建一个自己的开发环境脚手架工具。

# 设计模式

## 前言

设计模式（Design pattern）是一套被反复使用、多数人知晓的、经过分类编目的、代码设计经验的总结。

作者认为设计模式不应该脱离场景问题存在，设计模式应该是解决特定场景下的特定问题，提高代码的可复用性和可靠性。

本章会给大家介绍四种前端常用的设计模式，了解它们的适用场景以及解决的问题。四种常用设计模式：单例模式，工厂模式，代理（委托）模式，发布-订阅模式。其中在前端应用最广泛以及最重要的模式是发布-订阅模式模式（没有之一）。

### 设计模式源码

> 源码地址：[github.com/dkypooh/fro…(opens new window)](https://github.com/dkypooh/front-end-develop-demo/tree/master/senior/design-pattern)

## 工厂模式

工厂模式（Factory Pattern）是 Java 中最常用的设计模式之一。这种类型的设计模式属于创建型模式，它提供了一种创建对象的最佳方式。

在工厂模式中，我们在创建对象时不会对客户端暴露创建逻辑，并且是通过使用一个共同的接口来指向新创建的对象。

### 定义

定义一个创建对象的接口，让其子类自己决定实例化哪一个工厂类，工厂模式使其创建过程延迟到子类进行。

### 实现方法

让其子类实现工厂接口，返回的也是一个抽象的产品。

### 适用场景

子类不需要定义父类的实现，只需要实现父类定义接口。

1. 您需要一辆汽车，可以直接从工厂里面提货，而不用去管这辆汽车是怎么做出来的，以及这个汽车里面的具体实现。
2. Hibernate 换数据库只需换方言和驱动就可以。

### 代码实例

```text
// 1. 父类实现基本定义，定义姓名
class Parent {
    getName() {
        
    }
}

// 2. 子类集成了父类的各个基因，男孩名字叫 bob
class ChildBoy extends Parent {
    getName() {
        return 'bob';
    }
}

// 3. 子类集成了父类的各个基因，女孩名字叫 alice
class ChildGirl extends Parent {
    getName() {
        return 'alice';
    }
}
```

## 单例模式

### 定义

保证一个类仅有一个实例，并提供一个访问它的全局访问点。

### 实现方法

判断系统是否已经有这个单例，如果有则返回，如果没有则创建，确保了一个类只有一个实例对象。

### 适用场景

当您想控制实例数目，节省系统资源的时候，有如下场景可以适用：

1. 全局性实例化组件，例如：`Toast组件`，`Modal弹窗组件`
2. 避免类防止多次创建实例的场景，例如：实例化事件模块`new EventEmitter()`

### 代码实例

```text
//  1. 创建 Toast 单例类
class Singleton {
  constructor(options) {
    this.options = options
  }
  show(message) {
    alert(message)
  }
}

// 2. 创建代理类，确保构造器只有一个实例
function ProxyClass() {
  let instance = null
  return function(options) {
    if (!instance) {
      instance = new Singleton(options);
    }

    return instance;
  }
}

// 3. 执行代理函数，闭包保存实例，返回单例类
const SingletonClass =  ProxyClass();

// 4. 测试代码，实例化两个类，实例是否相同
const d = new SingletonClass('dd');
const c = new SingletonClass('cc');
d === c
```

## 事件代理模式

事件代理模式在前端的主要应用场景是事件委托（event delegate）。

### 定义

JavaScript高级程序设计上讲：事件委托就是利用事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。

### 实现方法

一般来讲，会把一个或者一组元素的事件委托到它的父层或者更外层元素上，真正绑定事件的是外层元素，当事件响应到需要绑定的元素上时，会通过事件冒泡机制从而触发它的外层元素的绑定事件上，然后在外层元素上去执行函数。

### 适用场景

![image-20210214200609476](http://img-repo.poetries.top/images/image-20210214200609476.png)

事件冒泡 和 事件捕获 分别由 微软 和 网景 公司提出，后来 W3C 将两者结合，制定了统一的标准 —— 先捕获再冒泡。

为了更好的理解事件流模型，我们把 DOM 树想象成一个靶子，父节点在外，子节点在内。如下图所示：

- 事件冒泡(event bubbling) 由内向外，即从 DOM 树的子到父，`div -> body -> html -> document`
- 事件捕获(event capturing) 由外向内，即从 DOM 树的父到子，`document -> html -> body -> div`

### 代码实例

在 JavaScript 中，`addEventListener` 方法用于向指定元素添加事件句柄。 语法：`element.addEventListener(event, function, useCapture)`

| element    | 目标元素                                                     |      |
| ---------- | ------------------------------------------------------------ | ---- |
| event      | 事件名，如 click                                             |      |
| function   | 事件触发时执行的函数                                         |      |
| useCapture | Bool值，true - 事件句柄在 `捕获` 阶段执行，false- false- 默认。事件句柄在 `冒泡` 阶段执行 |      |

设置 `addEventListener` 捕获方式为 `false` 冒泡方式

```text
/**.html**/
<div class="t3">document
  <div class="t2">html
    <div class="t1">body
      <div class="t0">div</div>
    </div>
  </div>
</div>

/**.js**/
var $t0 = document.getElementsByClassName('t0')[0];
var $t1 = document.getElementsByClassName('t1')[0];
var $t2 = document.getElementsByClassName('t2')[0];
var $t3 = document.getElementsByClassName('t3')[0];

$t0.addEventListener("click", function(){
  alert("click div")
}, false);

$t1.addEventListener("click", function(){
  alert("click body")
}, false);

$t2.addEventListener("click", function(){
  alert("click html")
}, false);

$t3.addEventListener("click", function(){
  alert("click document")
}, false);
```

## 发布-订阅模式

### 定义

观察者模式中的源（Subject）就像一个发布者（Publisher），观察者（Observer）完全和订阅者（Subscriber）关联。

> 在发布-订阅模式，消息的发送方，叫做发布者（publishers），消息不会直接发送给特定的接收者，需要有个一个中间媒介做集中化处理。

![image-20210214200722364](http://img-repo.poetries.top/images/image-20210214200722364.png)

上图解释：一个发布者发布一条消息，通过订阅-发布模型，可以被多的接收者收到。

### 观察者模式 VS 发布-订阅模式

读者开始会对这两者模式差异存在疑惑，作者认为在前端领域，这两种存在一些细微差别，使用功能来说可以等同。我们同样可以成为观察者模式 为 发布-订阅模式。 它们细小的差别在于，发布-订阅模式相比较于观察者模式，有一个中心管控（或者中介者）的模块。如下图所示：

![image-20210214200741722](http://img-repo.poetries.top/images/image-20210214200741722.png)

### 应用场景

在前端发布-订阅模式，又称为观察者模式。它主要有如下几方面的应用场景。

1. 保持组件数据通信的扁平化，例如不同根节点子组件通信可以使用发布-订阅模式
2. 数据通信解耦，在统一内存环境下都可以实现不同模块之间的通信

### 源码实现

DOM原生支持的 `CustomEvent` 也是一个发布-订阅模型，下面使用此 DOM API 使用此模型。

```text
<body>
  <div id="tap"> Sub/Pub </div>

  <script>
    // 1. 获取id 为 tap DOM元素节点
    const node = document.getElementById('tap');
    
    // 2. 添加tap节点自定义事件
    node.addEventListener('cat', (result) => {
      console.log(result.detail);
    })

    // 3. 绑定tap节点 click 事件
    node.addEventListener('click', () => {
      // 3.1 定义自定义事件
      const event = new CustomEvent("cat", {"detail":{"hazcheeseburger":true}})
      // 3.2 节点出发事件
      node.dispatchEvent(event);
    })
  </script>
</body>
```

## EventEmitter实现

设计模式章节的最后, 和作者一起通过 Typescript 实现一个 EventEmitter 类， EventEmitter 实现两个核心方法： `emit`(发布事件) 和 `on` (订阅事件)。

EventEmitter 实现的基本思想：使用Map来维护事件名称和事件方法的映射关系。同时通过 `emit` 绑定当前作用域，执行方法。

### 代码实例

> 源码参考地址：[github.com/dkypooh/fro…(opens new window)](https://github.com/dkypooh/front-end-develop-demo/blob/master/senior/sdk/src/event.ts)

```text
export default class EventEmitter {
  // 1. 创建一个eventMap，用于存储事件名和函数的映射关系
  private _eventMap = new Map();
  /**
   * on
   * @param {String} type     事件名称
   * @param {Function} fn     绑定函数
   */
  on(type: string, fn: ICallback) {
    // 2. 实现 on 事件监听方法
    // 2.1 如果 eventMap 有此方法，则维护多个方法，push到方法数组中, emit的时候批量执行
    // 2.2 如果 enentMap 没有此方法， 则 set 这个事件函数
    if (this._eventMap.has(type)) {
      const cbs = this._eventMap.get(type);
      cbs.push(fn);
    } else {
      this._eventMap.set(type, [fn]);
    }
    return this;
  }
  /**
   * emit 
   * @param {String} type  事件名称
   * @param args
   */
  emit(type: string, ...args: any[]): boolean {
    // 3. 实现 emit 事件订阅方法
    // 3.1 如果 event 中有此方法，则批量执行，同时通过Apply 绑定当前作用域执行。
    if (this._eventMap.has(type)) {
      const cbs = this._eventMap.get(type);
      for (const fn of cbs) {
        fn.apply(this, args);
      }
      return true;
    } else {
      return false;
    }
  }
  
}
```

代码详解如下：

1. 创建一个eventMap，用于存储事件名和函数的映射关系
2. 实现 on 事件监听方法，如果 eventMap 有此方法，则维护多个方法，push到方法数组中, emit的时候批量执行，如果 enentMap 没有此方法， 则 set 这个事件函数
3. 实现 emit 事件订阅方法，如果 event 中有此方法，则批量执行，同时通过Apply 绑定当前作用域执行。

## 结语

设计模式的选择， 必须是根据不同场景问题出发，解决不同场景的实际问题。 上文介绍了前端开发中常用的四种设计模式。

最后带大家实现一个 EventEmitter 事件发布-订阅类（前端最常用的工具类），读者可以体会其中的实现思想，同时可以使用此类解耦项目数据通信。

## 思考题

Q：如何实现一个类的单例，防止多次初始化？

# 通用SDK设计

## 前言

上一章节我们学习设计模式，了解前端应用最广泛的几个设计模式，订阅发布模式、单例模式、工厂模式等。 本章节我们会通过设计一个通用 SDK 模型来学习应用这些设计模式，和读者一起搭建 SDK 的 TypeScript 开发环境，一起探讨如何设计一个通用的 SDK 原型。

### 通用SDK原型代码

> 源码地址：[github.com/dkypooh/fro…(opens new window)](https://github.com/dkypooh/front-end-develop-demo/tree/master/senior/sdk)

## SDK设计指南

软件开发工具包（缩写：SDK、外语全称：Software Development Kit）一般都是一些软件工程师为特定的软件包、软件框架、硬件平台、操作系统等建立应用软件时的开发工具的集合。

SDK 是根据业务需求来设计的，一方面提供各种业务需要的 API 接口，另一方面 SDK 的设计需要具备扩展性和兼容性。

作者的理解一个好的 SDK 应该具备小而美且五脏俱全的特性

### API设计准则

API 是模块或者子系统之间交互的接口定义。好的系统架构离不开好的 API 设计。好的 API 设计有如下准则：

- **提供清晰的思维模型：** API 是用于程序之间的交互，但是一个 API 如何被使用，以及 API 本身如何被维护，是依赖于维护者和使用者能够对该API有清晰的、一致的认识。
- **少即是多：** 系统随着需求的增加不断的演化，SDK 承载的逻辑会越来越多，为了减少使用者的使用成本，SDK 提供的 API 应该是必须且少的。
- **单一职责：** 接口设计尽量要做到 单一职责,最细粒度化，每个接口职责是明确的。
- **插件化：** 随着系统业务需求增加，带来了越来越多的不确定性，基于最核心的 SDK 模块去扩展，不同业务可以去扩展不同需求。

## Typescript 通用 SDK 开发环境搭建

npm 包环境安装如下：typescript，jest 和 eslint。

```text
## 安装typescript支持
$npm i typescript -D

## 安装jest 支持
$ npm i jest @types/jest ts-jest -D

## 安装tslint支持
$ npm i tslint tslint-config-standard -D
```

### 配置 package 文件

配置 package 文件的 scripts 脚本如下：

1. build: 通过 tsc 编译 ts 成 js 文件。
2. test: 运行 jest 测试环境。具体 TS 的 Jest 测试环境说明参考 [前端基础能力 - Jest前端测试框架]。
3. fix: 运行 tsconfig 语法检查，同时修复语法问题。

```text
{
  "name": "tbms-sdk",
  "version": "1.0.0",
  "description": "sdk, middleware",
  "main": "build/index.js",
  "scripts": {
    "build": "npx tsc --build tsconfig.json -w",
    "test": "npx jest -c jest.config.js --colors",
    "fix": "tslint --fix src/*.ts -t verbose",
    "tslint": "tslint -c tslint.json src/*.ts"
  },
  "keywords": [
    "sdk",
    "middleware"
  ],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "typescript": "^3.3.1",
    "@types/jest": "^24.0.0",
    "jest": "^24.1.0",
    "ts-jest": "^23.10.5",
    "tslint": "^5.12.1",
    "tslint-config-standard": "^8.0.1"
  }
}
```

### Yoeman SDK 脚手架环境

> Typescript + Jest SDK 脚手架: [github.com/ge-tbms/gen…(opens new window)](https://github.com/ge-tbms/generator-typescript-jest-sdk)

使用 `generator-typescript-jest-sdk`脚手架工具，可以如下操作：

```text
## 安装yo 以及 generator
npm install -g yo
npm install -g generator-typescript-jest-sdk

## 运行 generator-typescript-jest-sdk 生成目录
yo typescript-jest-sdk
```

## Typescript 通用SDK目录结构

```text
├── build
├── jest.config.js
├── package.json
├── src
│   ├── event.ts
│   ├── global.ts
│   ├── index.ts
│   ├── middleware.ts
│   └── util.ts
├── test
│   └── sdk.test.ts
├── tsconfig.json
└── tslint.json
```

文件结构解释如下，详情可见：

- **event模块:** EventEmitter类，用于实现sub/pub模式， 代码可以参考上一章节 [设计模式 - EventEmitter实现]
- **middleware模块:** 通过 Promise 队列实现一个中间件模块，同时维护一个 middleware 数组。
- **util.ts:** 集成了一些通用函数，例如判断数据类型、获取 URL 参数、甚至动态增加 CSS 样式

## 通用 SDK 能力

一个具备可扩展以及兼容性的SDK，最基本应该两个基础能力：事件订阅发布 和 中间件模块 能力。在此基础上再根据业务需求扩展合理的API接口。

- **事件发布监听能力：** 继承上一章实现的 `EventEmitter` 基类，实现子类实例的 `emit` 和 `on` 方法。
- **中间件模块：** 下面重点分析中间件模块的实现，和 项目最佳实践- 数据SDK开发实现 中间件模块有所差别。 这次实现是通过 `Promise Queue`链表，实现顺序执行中间件。项目最佳实践- 数据SDK开发实现的中间件模块可以处理异步请求，洋葱圈模型。

### promiseMiddleware 代码实现

> 源码参考文件地址: [github.com/dkypooh/fro…(opens new window)](https://github.com/dkypooh/front-end-develop-demo/blob/master/senior/sdk/src/util.ts#L40)

`promiseMiddleware` 作为 `src/util.ts` 模块的一个函数方法提供，下文会使用到。

```text
const promiseMiddleware = (middlewares: any[], ctx: any) => {
  let promise = Promise.resolve(null);
  let next;

  // 1. 通过bind把执行上下文对象，绑定到中间件第一个参数
  middlewares.forEach((fn, i) => {
    middlewares[i] = fn.bind(null, ctx);
  });

  // 2. 通过while循环执行promise实例
  while ((next = middlewares.shift())) {
    promise = promise.then(next);
  }

  // 3. 最终返回一个promise实例结果
  return promise.then(() => {
    return ctx;
  });
}
```

代码详解：此段代码执行思想比较简单，但是开发者很难想到通过 promise 链表来实现中间件模块，提供一种可借鉴比较好的思路。

### middleware 中间件类代码实现

此源代码文件 `src/middleware`， 通过 `util` 实现的 `promiseMiddleware` 方法，同时继承 `EventEmitter` 事件类。

> 源码参考地址: [github.com/dkypooh/fro…(opens new window)](https://github.com/dkypooh/front-end-develop-demo/blob/master/senior/sdk/src/middleware.ts)

```text
import _ from './util';
import EventEmitter from './event';

export default class extends EventEmitter{
  public middlewares:any[] = [];
  public ctx = {
    message: {},
    conversation: {}
  }
  // 1. 构造器函数，初始化添加 middlewares
  constructor(middlewares: any[]) {
    super();
    this.middlewares = middlewares;
  }

  // 2. 通过批量添加中间件接口 
  useBatch(steps: any[]) {
    if (_.isArray(steps)) {
      this.middlewares = this.middlewares.concat(steps);
    } else {
      throw TypeError('useBatch must be arrary!!!')
    }
  }

  // 3. 核心实现，每个Action都需要进过Dispatch进行触发
  dispatch(msg: any, conversation: any) {
    // 3.1 使用Object.create 创建新的 middlewares 和 ctx对象，防止对象引用
    let steps = Object.create(this.middlewares);
    let ctx = Object.create(this.ctx);
    // 3.2 赋值 会话和消息 对象
    ctx.conversation = conversation;
    ctx.message = msg;
    // 3.3 执行中间件模块，同时返回一个 promise 实例
    return _.promiseMiddleware(steps, ctx);
  }
}
```

代码详解：

1. 构造器函数，初始化添加 `middlewares` 模块

2. 使用 `useBatch` 接口，批量添加中间件接口

3. 核心实现

   ```text
   dispatch
   ```

   函数，每个

   ```text
   Action
   ```

   都需要进过

   ```text
   dispatch
   ```

   进行触发, 主要如下三件事情：

   - 使用 `Object.create` 创建新的 `middlewares` 和 `ctx` 对象，防止对象引用
   - 给执行上下文赋值 会话和消息 对象
   - 最终 执行中间件模块，同时返回一个 `promise` 实例

## 通用SDK实现

通用SDK的实现相对比较简单，只需要集成 `Middlware` 类，它就具备两个通用能力：**事件订阅发布** 和 **中间件** 能力。SDK的职责是根据业务需求扩展标准API接口。

```text
import MiddleWare from './middleware';

export default class extends MiddleWare {
  constructor(middlewares: any[]) {
    super(middlewares);
  }
}
```

## 通用SDK的单元测试

通用SDK就具备两个通用能力：**事件订阅发布** 和 **中间件** 能力。为了确保通用SDK可用，我们在项目中运行 `npm run test` 对代码进行单元测试。

> 单元测试源码：[github.com/dkypooh/fro…(opens new window)](https://github.com/dkypooh/front-end-develop-demo/blob/master/senior/sdk/test/sdk.test.ts)

```text
import SDK from '../src/index'

describe('SDK Test', () => {
  const sdk = new SDK([]);
  it('subscribe and publish', (done) => {
    sdk.on('publish', (obj) => {
      expect(obj).toEqual({cmd: 'publish'});
      done();
    })
    sdk.emit('publish', {cmd: 'publish'});
  });

  it('add middleware modules', (done) => {
    sdk.useBatch([(ctx: any) => {
      ctx.message.content = 'test';
    }, (ctx: any) => {
      ctx.conversation.lastMsg = 'test';
    }])
    sdk.dispatch({type: 'text'}, {id: 'yyy'}).then((ctx) => {
      expect(ctx.message).toEqual({ type: 'text', content: 'test' })
      expect(ctx.conversation).toEqual({ id: 'yyy', lastMsg: 'test' })
      done();
    })
  })
})
```

代码详解：两段测试代码，分别测试 事件订阅发布 和 中间件 能力。

- 事件订阅发布：`emit` 发布一个 `publish` 事件，同时 `on` 一个 `publish` 事件，同时传递数据 `{cmd: 'publish'}`
- 中间件： 使用 `useBatch` 添加中间件两个中间件模块，分别修改 `message` 和 `conversation` 的内容。检查通过 `dispatch` 是否达到预期。

### 测试结果

```text
 PASS  test/sdk.test.ts
  SDK Test
    ✓ subscribe and publish (8ms)
    ✓ add middleware module (3ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        1.421s
```

## 结语

本章最后通过Jest的单元测试，测试了本章实现的通用SDK的两个能力：**事件订阅发布** 和 **中间件**，单元测试通过保证了SDK的可靠性和稳定性。

最后，作者一直认为SDK是根据业务需求来设计的，SDK的设计一方面提供各种业务需要的API接口，另一方面SDK的设计需要具备扩展性和兼容性。 一个好的SDK它应该是 **麻雀虽小，但五脏俱全**。

## 参考文献

- [Promise Deffered(opens new window)](https://link.juejin.im/?target=https%3A%2F%2Fwww.kancloud.cn%2Fkancloud%2Fpromises-book%2F44233)
- [SDK的开发与设计(opens new window)](https://link.juejin.im/?target=https%3A%2F%2Fwww.jianshu.com%2Fp%2F5cf360fc9957)
- [redux middleware 详解(opens new window)](https://link.juejin.im/?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F20597452)

# 组件通信

## 前言

上一章节我们一起学习了通过SDK的设计，了解了 SDK 设计中的事件监听模型，同样 `EventEmitter` 也可以作为中介者模型来实现组件之间的跨级通信。

本章节我们就一起来学习几种通用的组件通信模型， 同时通过中介者模型实现组件元素之间跨级通信。

### 开箱即用的源码

> 源码地址：[github.com/dkypooh/fro…(opens new window)](https://github.com/dkypooh/front-end-develop-demo/tree/master/base/babel7-react)

## 组件通信模式

本小节以 `React` 组件框架为例，和大家一起探讨学习几种通用的组件通信模型。

![image-20210214200953207](http://img-repo.poetries.top/images/image-20210214200953207.png)

- **父组件到子组件：** `props` 属性 ， `instance methods` 实例方法
- **子组件到父组件：** `callback`回调方法， `event bubbles` 事件冒泡
- **临近兄弟节点：** `Parent Component` 父组件
- **任何节点：** `Observer Pattern` 观察者模式, `Global Variables` 全局变量, `Context` React执行上下文

## 父组件到子组件

### Props

`Props` 是一个父节点到一个子节点通信最常见的方式。

```text
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
ReactDOM.render(
  <Welcome name="Sara" />,
  document.getElementById('root')
);
```

### Instance Methods

父组件可以使用refs调用子组件上的实例方法

```text
class TheChild extends React.Component {
  myFunc() {
    return "hello";
  }
}
class TheParent extends React.Component {
  render() {
    return (
      <TheChild
        ref={foo => {
          this.foo = foo;
        }}
      />
    );
  }

  componentDidMount() {
    var x = this.foo.myFunc();
    // x is now 'hello'
  }
}
```

## 子组件到父组件

### Callback Functions

最简单的方法是父组件将函数传递给子组件，子组件调用父组件的方法

**以属性的方式传递函数**

```text
<MyChild myFunc={this.handleChildFunc} />
```

**子组件调用方式**

```text
this.props.myFunc();
```

**添加属性函数声明**

```text
MyChild.propTypes = {
  myFunc: React.PropTypes.func
};
```

### Event Bubbling

事件冒泡不是 `React` 的概念，它是DOM元素的概念，它可以像回调函数一样通过冒泡方式把数据通子组件发送到父组件。

```text
class ParentComponent extends React.Component {
  render() {
    return (
      <div onKeyUp={this.handleKeyUp}>
        // Any number of child components can be added here.
      </div>
    );
  }

  handleKeyUp = (event) => {
    // This function will be called for the 'onkeyup'
    // event in any <input/> fields rendered by any of
    // my child components.
  }
}
```

## 临近兄弟节点

### 父组件通信

如果两个相邻组件需要通信， 我们可以找到他们相邻的父节点进行中转通信

```text
class ParentComponent extends React.Component {
  render() {
    return (
      <div>
        <SiblingA
          myProp={this.state.propA}
          myFunc={this.siblingAFunc}
        />
        <SiblingB
          myProp={this.state.propB}
          myFunc={this.siblingBFunc}
        />
      </div>
    );
  }
  // Define 'siblingAFunc' and 'siblingBFunc' here
}
```

## 任何节点

### 全局变量

组件中都可以引用到全局变量，一般可以挂载到 `window` 对象上面，切记不要滥用他们

```text
window.x = 'global variable'
```

### Context

`Context` 使用类似于 `Props`, 和 `Props` 区别在于它可以提供整个树形组件的数据（多级子组件）， `Context` 只能向下数据传递（父组件到子组件），可以配合 `callback functions` 一起使用（子组件到父组件）。

#### 使用 `Props` 实例

```text
class App extends React.Component {
  render() {
    return <Toolbar theme="dark" />;
  }
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  );
}

class ThemedButton extends React.Component {
  render() {
    return <Button theme={this.props.theme} />;
  }
}
```

### 使用 `Context` 实例

```text
// 创建 Context 实例
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    return (
      // 提供 `Provider` 上下文容器
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {d
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```

## 中介者模式通信

本小节和大家一起探讨学习，通过中介者模式实现组件元素之间跨级通信。同理 `Redux` 状态管理也是采用中介者模式实现 **数据状态扁平化管理**

![image-20210214201012024](http://img-repo.poetries.top/images/image-20210214201012024.png)

不需要考虑A，B，C组件的树形关系，这样就可以实现扁平化通信，如图：A组件的行为就可以被B和C组件响应。

### EventBus实现

`EventBus` 模块实现引用的是通用SDK的 `event` 模块。实现事件发布和监听管理。 代码可以参考上一章节(设计模式 - EventEmitter实现)

EventBus源码地址

> 源码地址：[github.com/dkypooh/fro…(opens new window)](https://github.com/dkypooh/front-end-develop-demo/tree/master/base/babel7-react/src/common/eventBus)

## 组件通信实例

不通过父子组件属性和回调函数通信， 通过 `EventBus` 中介者模式实现一个加减计数器组件

![img](https://user-gold-cdn.xitu.io/2019/2/11/168db25e82630580?imageslim)

### 目录结构

```text
├── src
│   ├── common
│   │   ├── event.js
│   │   └── eventBus
│   │       ├── event.d.ts
│   │       ├── event.js
│   │       └── event.ts
│   ├── components
│   │   ├── add
│   │   │   └── index.jsx
│   │   └── show
│   │       └── index.jsx
│   └── index.jsx
```

### Add 组件

```text
import React from "react";
import event from '../../common/event';

export default class extends React.PureComponent {
  handleAdd() {
    // 触发加号事件
    event.emit('add');
  }

  handleReduce() {
    // 触发减号事件
    event.emit('reduce');
  }
  render() {
    return (
      <div className="m-opt">
        <div onClick={() => {this.handleAdd()}}>+</div>
        <div onClick={() => {this.handleReduce()}}>-</div>
      </div>
    );
  }
}
```

### Show 组件

```text
import React from "react";
import event from '../../common/event';

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      number: 0
    };
    // 监听减号事件，并把 `number` 字段减一
    event.on('reduce', () => {
      this.setState({
        number: this.state.number - 1
      });
    });
    // 监听加号事件，并把 `number` 字段加一
    event.on('add', () => {
      this.setState({
        number: this.state.number + 1
      });
    });
  }
  render() {
    return (
      <div className="m-show">
        {this.state.number}
      </div>
    );
  }
}
```

`Add组件`出发操作加减的事件， `Show组件`监听事件实现状态更改

## 结语

这样介绍了组件通信常用的几种方式，以及通过 `EventBus` 实现组件之间扁平化通信。 本章以 `React` 框架举例，同时在其他主流的 `MVVM` 框架都适用（Vuejs，Angular等）。

## 参考文档

- [EventEmitter(opens new window)](https://github.com/Olical/EventEmitter)
- [React 组件间通讯(opens new window)](http://taobaofed.org/blog/2016/11/17/react-components-communication/)



# 构建开发工作流

## 前言

伴随着前端技术日新月异的发展，前端开发中前后端分离，工程化，自动化等现代化的开发模式越来普及，前端项目也引入了编译，构建，单元测试等现代软件工程化的标准环节。这样大提高了前端的开发效率和业务交付能力。

### Yeoman构建脚手架源码

> Lerna 和 Jsdoc 包管理脚手架：[github.com/ge-tbms/gen…(opens new window)](https://github.com/ge-tbms/generator-lerna-jsdoc-packages)

> TS SDK以及配合Jest测试脚手架：[github.com/ge-tbms/gen…(opens new window)](https://github.com/ge-tbms/generator-typescript-jest-sdk)

> React+SCSS+Mobx 开发环境脚手架: [github.com/ge-tbms/gen…(opens new window)](https://github.com/ge-tbms/generator-react-mobx-scss)

> Rax 组件构建脚手架（实现页面和组件分别生成）：[github.com/ge-tbms/gen…(opens new window)](https://github.com/ge-tbms/generator-rax-component)

### 开箱即用的源码

> 源码地址：[github.com/dkypooh/fro…(opens new window)](https://github.com/dkypooh/front-end-develop-demo/tree/master/senior/workflow)

## NPM Script搭建开发工作流

npm 允许在 `package.json`里面，使用 `scripts` 字段定义脚本命令

```text
{
    "scripts": {
        "start": "node start.js"
    }
}
```

脚本语法

```text
npm run-script <command> [--silent] [-- <args>...]
```

命令行下需要使用 `npm run <comand>` 方式执行脚本

```text
$ npm run start
## 等同于
$ node start.js
```

### 执行原理

### 配置参数

`npm scripts` 参数传递的命令行分割符是 `'--'`, 即可将后续参数添加到 `process.env.argv` 数组中。例如：

```text
$ npm run build -- --name hello
```

### npm scripts 组合命令

npm脚本需要执行多个任务，首先需要明确它们的执行顺序，然后把他们组合起来。 如果是并行执行（即同时的平行执行），可以使用 `&` 符号。

```text
$ npm run build-js & npm run build-css
```

如果是串行执行（即只有前一个任务成功，才执行下一个任务），可以使用 `&&` 符号。

```text
$ npm run eslint && npm run build && npm run publish
```

从代码检查，到代码构建，最后到发布。

### 默认命令

默认命令可以省略掉 `run`

```text
npm start 是 npm run start
npm stop 是 npm run stop的简写
npm test 是 npm run test的简写
npm restart 是 npm run stop && npm run restart && npm run start的简写
```

### npm钩子

npm提供了两种钩子，pre和post，分别代表操作前和操作后

```text
{
    "scripts": {
        "prebuild": "echo 1",
        "build": "echo 2",
        "postbuild": "echo 3"
    }
}
```

用户执行 `npm run build` 的时候，会自动按照下面的顺序执行。

```text
$ npm run prebuild && npm run build && npm run postbuild
## 最终输出
$ 123
```

#### 默认钩子

> - prepublish，postpublish
> - preinstall，postinstall
> - preuninstall，postuninstall
> - preversion，postversion
> - pretest，posttest
> - prestop，poststop
> - prestart，poststart
> - prerestart，postrestart

## Yeoman Generator搭建开发工作流

[Yeoman (opens new window)](https://link.juejin.im/?target=https%3A%2F%2Fyeoman.io%2F)，它不只是一个工具，而是一个工作流。它其实包括了三个部分yo、grunt、bower，分别用于项目的启动、文件操作、包管理。

### 打造一个自己的集成工具流

> 源码地址：[github.com/dkypooh/fro…(opens new window)](https://github.com/dkypooh/front-end-develop-demo/tree/master/senior/workflow/generator-react-mobx-scss)

### 安装及步骤

可以同时安装 Yeoman(`yo`) 和 Generator(`generator-generator`)构建器脚本

```text
$ npm i -g yo generator-generator
```

#### 生成文件目录

```text
$ yo generator
```

#### 标准Generator目录

`templates` 是模板目录，例如 `React` 工程脚手架， `index.js` 入口文件，维护 `Yoeman` 各个生命周期。

```text
├── LICENSE
├── README.md
├── __tests__
│   └── app.js
├── generators
│   └── app
│       └── templates   // 模板目录
│       ├── index.js    // 入口文件
└── package.json
```

#### 生命周期回调

![image-20210214201341362](http://img-repo.poetries.top/images/image-20210214201341362.png)

- **initializing** - Your initialization methods (checking current project state, getting configs, etc)
  - 初始化方法（检验当前项目状态、获取configs、等）
- **prompting** - Where you prompt users for options (where you’d call this.prompt())
  - 人机交互，获取用户选项
- **configuring** - Saving configurations and configure the project (creating .editorconfig files and other metadata files)
  - 保存配置（创建 .editorconfig 文件）
- **default** - If the method name doesn’t match a priority, it will be pushed to this group
  - 如果函数名称如生命周期钩子不一样，则会被放进这个组
- **writing** - Where you write the generator specific files (routes, controllers, etc)
  - 写generator特殊的文件（路由、控制器、等）
- **conflicts** - Where conflicts are handled (used internally)
  - 冲突后处理办法
- **install** - Where installations are run (npm, bower)
  - 选择安装依赖（npm、bower）
- **end** - Called last, cleanup, say good bye, etc
  - 安装结束、清除文件、设置good bye文案、等

### 构建React开发脚手架

我们以 **Mobx状态管理** 这章我们一起搭建`React + Mobx + SCSS`工程环境为脚手架模板(app/templates)。通过 `yeoman` 集成成通用脚手架工具。视频案例：

#### 生成器安装

```text
$ npm i -g generator-react-mobx-scss
```

### 入口文件初始化

`Generator` 的 `index.js` 文件，需要集成 `yeoman-generator` 基类

```text
var Generator = require('yeoman-generator');

module.exports = class extends Generator {};
```

### 生命周期节点实现

#### Initializing

初始化获取用户名信息

```text
// 初始化获取用户名信息
initializing() {
    try {
      this.username = process.env.USER || process.env.USERPROFILE.split(require('path').sep)[2]
    } catch (e) {
      this.username = ''
    }
}
```

#### Prompting

获取基本配置信息

```text
// 获取基本配置信息
return this.prompt([
    // 项目名称
    {
    type: 'input',
    name: 'name',
    message: 'Your project name',
    // 项目描述
    {
        type: 'input',
        name: 'description',
        message: 'Your project description',
        default: ''
    },
    // 用户名（默认系统）
    {
        type: 'input',
        name: 'username',
        message: 'Your name',
        default: this.username
    },
    // 邮箱信息
    {
        type: 'input',
        name: 'email',
        message: 'Your email',
        default: ''
    },
    // npm 镜像选择
    {
        type: 'list',
        name: 'registry',
        message: 'Which registry would you use?',
        choices: [
            'https://registry.npm.taobao.org',
            'https://registry.npmjs.org'
        ]
    }
]).then(answers => {
    this.answers = answers
    this.obj = {answers: this.answers}
})
```

#### Writing

模板文件复制到项目目录，同时动态插入配置信息

```text
const _ = require('lodash')

this.fs.copy(this.templatePath('static', '*'), this.destinationPath('static'))
this.fs.copyTpl(this.templatePath('src'), this.destinationPath('src'), this.obj, {
    interpolate: /<%=([\s\S]+?)%>/g
});
this.fs.copy(this.templatePath('index.js'), this.destinationPath('index.js'))
this.fs.copy(this.templatePath('babelrc'), this.destinationPath('.babelrc'))
this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'))
this.fs.copy(this.templatePath('eslintrc'), this.destinationPath('.eslintrc'))
this.fs.copy(this.templatePath('editorconfig'), this.destinationPath('.editorconfig'))
this.fs.copyTpl(this.templatePath('webpack.config.js'), this.destinationPath('webpack.config.js'))
// 动态插入配置信息, 生成Package.json文件
this.fs.copyTpl(this.templatePath('package.json_vm'), this.destinationPath('package.json'), this.obj)
// 动态插入配置信息, 生成模板ReadME.md
this.fs.copyTpl(this.templatePath('readme.md'), this.templatePath('readme.md'), this.obj) 
```

#### Install

可以选择 `npm` 或者 `yarn` 安装依赖。

```text
// 语法结构：npmInstall(pkgs?: string|string[], options?: object, spawnOptions?: object): void;
// undefined为全部安装
install() {
    this.npmInstall(undefined, {
      registry: this.answers.registry
    })
}
```

### End

```text
end() {
    this.log.ok('Project ' + this.answers.name + ' generated!!!')
    this.spawnCommand('npm', ['start'])
}
```

## 结语

在 `React组件` 章节学习中，大家也接触到了 `npm scripts` 的使用，本章节系统化的带大家一起学习 `npm` 脚本以及 `npm hooks` 来管理项目周期。同时带大家一起学习了 `Yeoman` 基本原理和生命周期。最后以 `react-mobx-scss` 项目为模板，一起开发了 `generator-react-mobx-scss` 脚手架生成器，读者可以在自己平时的项目中使用此脚手架生成器。

## 参考文献

- [npm-scripts(opens new window)](https://link.juejin.im/?target=https%3A%2F%2Fdocs.npmjs.com%2Fmisc%2Fscripts)
- [Yoeman Generator Search(opens new window)](https://link.juejin.im/?target=https%3A%2F%2Fyeoman.io%2Fgenerators%2F)
- [WRITING YOUR OWN YEOMAN GENERATOR(opens new window)](https://link.juejin.im/?target=https%3A%2F%2Fyeoman.io%2Fauthoring%2F)

# 项目最佳实践

## 前言

IM的应用非常广泛，如钉钉，微信、淘宝聊天、淘宝直播、虎牙直播、聊天宝等，其中，钉钉和微信是最成功的IM应用产品。

项目最佳实践这一章节，作者会根据多年大厂IM项目实战经验，带大家一起把前两层学习到 基础知识 和 进阶知识 通过项目实践的方式串联起来，融汇贯通。

本层阅读前大家可以看下在知名的公众号（前端早读课）发布的相关文章：

- [前端如何去设计架构能力 - 双十二在星巴克消息开放从点到面的思考实践(opens new window)](https://mp.weixin.qq.com/s/Vbnld_QogVDNpxdazzUAHQ)
- [手淘千牛前端消息开放融合 - 双十一在星巴克消息开放项目的思考实践(opens new window)](https://mp.weixin.qq.com/s/z7ECVZXLmzQW6LZkJ56TpA)

## 思路提纲

本层讲解的思路和一个大型项目开发保持一致，包含了项目的前期，开发中期，后期三个维度。

![image-20210214202813430](http://img-repo.poetries.top/images/image-20210214202813430.png)

## 目标

本层以IM聊天项目为案例，抽象一个大型项目的六个通用生命周期，即行业分析、技术选型、环境搭建、开发测试、联调发布和横向输出。通过的本层学习，本层将对前两章（基础知识和进阶能力）进行串联，帮助读者行程开发项目体系化的思考模型和方法论。

以点到面，帮助读者可以把这些能力（基础-进阶-项目实战）应用到其他项目开发中。

# 行业分析

## 前言

本章节会介绍即时通信的行业背景，IM的基本概念及基本流程，让读者对这个领域有一个直观的认识。

本文重点不会介绍 WebSocket 的实现方式，我们更关注上层业务的架构和引用。 本文的代码实现用的是云信IM服务。

## 行业背景

IM的应用场景非常广泛，除了传统的图文聊天外，时下流行的在线直播、在线教育、互动游戏等都是IM聊天的应用场景。

在阿里巴巴集团里面应用场景也很广泛， 例如淘宝聊天(BC店铺/CC淘友)，淘宝直播，即时互动场景。

![image-20210214203008916](http://img-repo.poetries.top/images/image-20210214203008916.png)

在阿里巴巴以外也有很多优秀的产品，下面列举了一些产品简介：

- 老罗的子弹短信 (老罗提出的噱头说是发送方喜欢发语音，接受方喜欢看文字。这不是语音转文字么，只是自动化了)。
- 网易七鱼（客服领域解决方案），其实它跟集团里面阿里小蜜很像（机器人，快捷回复，知识库，呼叫中心，质检，分流，热门问题推荐等）
- 腾讯的QQ，微信甚至是微视等产品

> 调研IM行业领域，大体的产品可以分为两个部分：第一分部为IM即时通讯能力，做消息开放。例如网易云信，腾讯IM云，阿里系的百川。 例如：子弹短信和网易七鱼是在网易云信上面搭建的产品；QQ，微信和微视是在腾讯IM云上搭建的产品。 第二部分IM产品。例如：上文提到的子弹短信，网易七鱼，QQ和微信

![image-20210214203051683](http://img-repo.poetries.top/images/image-20210214203051683.png)



# 基本概念及流程抽象

## 前言

作者一直认为一个优秀的程序员不仅 仅是具有设计架构的能力，更是了解整个行业背景的现状和趋势。为了更好的设计和架构一个大型系统，我们需要调研行业的背景，从一个具象行业抽象出两个核心：领域模型和抽象流程。下面这章会介绍IM系统的 会话 和 消息 两大核心概念， 以及IM系统的基本抽象流程。

## 会话和消息两大核心概念

笔者认为两个核心的概念是 **会话** 和 **消息** 的概念

- 会话session（conversation）： 它是指AB通讯之间维持的一种关系，它是消息存储的载体。
- 消息message: 可以根据业务分为两大块消息，会话内消息和系统通知消息。会话内消息又可以分为基本消息和自定义消息。

## 会话

即时通讯 SDK 的核心概念「会话」，即 Conversation。我们将单聊和群聊（包括聊天室）的消息发送和接收都依托于 Conversation 这个统一的概念进行操作。如下是定义会话数据结构

### 会话数据格式

| **会话属性** | **备注**               |
| ------------ | ---------------------- |
| id           | 会话ID                 |
| scene        | 场景                   |
| to           | 聊天对象，账号或者群ID |
| updateTime   | 会话更新时间           |
| unread       | 未读数                 |
| lastMsg      | 此会话的最后一条消息   |
| custom       | 扩展Json字符串         |

## 消息

IM SDK内的消息可以分为两类：会话内消息和系统消息。

### 会话内消息

会话内消息只能出现并展示在聊天界面里，一般是应用内的一个用户发给另一个用户（或群组/聊天室）的消息，例如文本消息、图片消息都属于会话内消息。：

| **会话内消息类型** | **备注**                                                     |
| ------------------ | ------------------------------------------------------------ |
| 文本消息           | 消息内容为普通文本                                           |
| 图片消息           | 消息内容为图片URL地址、尺寸、图片大小等信息                  |
| 语音消息           | 消息内容为语音URL地址、时长、大小、格式等信息                |
| 视频消息           | 消息内容为视频文件的URL地址、时长、大小、格式等信息          |
| 文件消息           | 消息内容为文件的URL地址、大小、格式等信息，格式不限          |
| 地理位置消息       | 消息内容为地理位置标题、经度、纬度信息                       |
| 通知消息           | **自定义消息可以用于消息接入扩展。 例如卡片消息，红包消息等。** |
| 自定义消息         | **通知消息属于`会话内`的一种消息，用于会话内通知和提示场景。例如：群名称更新、某某某退出了群聊等。** |

### 消息数据格式

| 属性           | 类型    | 描述                                                         |
| -------------- | ------- | ------------------------------------------------------------ |
| conversationId | String  |                                                              |
| id             | String  | 服务器用于区分消息用的ID                                     |
| idClient       | String  | SDK生成的消息id, 在发送消息之后会返回给开发者, 开发者可以在发送消息的结果回调里面根据这个ID来判断相应消息的发送状态, 到底是发送成功了还是发送失败了, 然后根据此状态来更新页面的UI。如果发送失败, 那么可以重新发送此消息 |
| scene          | String  | 群聊还是单聊场景                                             |
| type           | String  | 消息类型：文本，图片，语音，还是自定义消息                   |
| from           | String  | 消息发送方                                                   |
| to             | String  | 消息接收方                                                   |
| time           | Number  | 消息时间戳                                                   |
| flow           | String  | 消息的流向 `'in'`表示此消息是收到的消息，`'out'`表示此消息是发出的消息 |
| status         | String  | 消息发送状态 `'sending'`: 发送中， `'success'`: 发送成功，`'fail'`: 发送失败 |
| content        | String  | 文本消息的文本内容, 请参考发送文本消息                       |
| file           | Object  | 文件消息的文件对象, 具体字段请参考                           |
| resend         | Boolean | 是否是重发的消息                                             |
| custom         | String  | 扩展字段, `用途扩展自定消息`                                 |

### 系统消息

系统通知一般在会话维度，通常用于验证关系。例如：某某某请求加你为好友，群名称更新、某某某退出了群聊等

### 系统消息数据格式

| 属性    | 类型   | 说明                                   |
| ------- | ------ | -------------------------------------- |
| msgId   | String | 消息Id                                 |
| time    | Number | 时间戳                                 |
| type    | String | 系统通知类型                           |
| from    | String | 系统通知的来源, 账号或者群ID           |
| to      | String | 系统通知的目标, 账号或者群ID           |
| scene   | String | 自定义系系统通知的场景, 参考[消息场景] |
| content | String | 文本消息内容                           |
| custom  | String | 自定义消息内容，`JSONString`格式       |

## 基本流程

IM即时通讯是不同用户之间交流的双通通道，如下是收发消息的简单模型。

![image-20210214203248788](http://img-repo.poetries.top/images/image-20210214203248788.png)

客户端A向客户端B发消息，内部流程应该如下：

1. 客户端A和客户端B都先和服务端建立 WebSocket的长连接。
2. 客户端A通过Websocket向服务端发送了文本消息，同时服务端向客户端A发送一个ACK回包，说明收到此消息。
3. 服务分析此消息的来源和去向，消息类型和内容。通过 Websocket 投递给客户端B
4. 客户端B收到消息的回调。完成一次客户端A向客户端B发消息的流程

IM系统一次完整用户建立连接的流程图：

1. 输入用户基本信息，如果有固定秘钥或者 `Token` 则初始化信息，建立连接。
2. 没有 `Token` 则通过 `https` 根据用户信息往服务端申请 `Token`
3. 返回 `Token` 及用户信息，通过 `Websocket` 和服务端建立长连接
4. 建立长连接之后，可以和服务端进行 收发消息 的通信。

## 基本功能

### 单聊

1V1 聊天，提供包括文字、图片、语音、地理位置、文件、自定义消息等多种能力，除此之外还提供消息推送功能

### 群聊

多人聊天服务，内置公开群、私有群、聊天室、互动直播聊天室和在线成员广播大群五种群组形态，能够适应各种群组需求的场景。

## 云信IM服务实践

文章上文介绍了IM的基本概念、基本流程和基本功能。下面以云信IM服务为例，我们来实战的看下如何使用IM服务。

### 建立云信账号

我们创建云信账号，并且创建掘金小册应用，建立应用会提供Appkey 和 AppSecret 用于后续服务认证。同时建立两个测试账号 Bob 和 Alice。操作视频如下：

### 如何获取建连Token

具体建立连接的API接口和传参可以参考云信文档。

> [dev.yunxin.163.com/docs/produc…](https://dev.yunxin.163.com/docs/product/IM即时通讯/服务端API文档/网易云通信ID?kw=refresh Token.action&pg=1&pid=0&#网易云通信ID更新)

```text
import { APP_CONFIG } from './constant';
import { _ } from 'tbms-util';
import sha1 from 'sha1';

const getAccountToken = async (accid: string) => {
  const time =Math.round(+new Date() / 1000);
  const hash = _.md5(accid);
  const response:any = await fetch('https://api.netease.im/nimserver/user/refreshToken.action', {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      "AppKey": APP_CONFIG.appkey,
      "Nonce": hash,
      "CurTime": '' + time,
      "CheckSum": sha1(APP_CONFIG.appSecret + hash + time)
    },
    body: `accid=${accid}`
  });

  return response.json();
}
```

接口解释：分装了一个获取账号Token的 Async Await 的 Fetch 方法, 根据参数要求获取连接 Token。

## 结语

本章节介绍了IM的两个核心概念：消息 和 会话，以及IM系统的基本抽象流程，作为基础知识概念，对于后续的架构设计和系统开发有很大的帮助。

下一章会加如何设计架构IM系统，如何进行系统分层。下一章介绍的系统分层方式也是常见的前端设计架构方案。



# 架构设计

## 前言

上一章我们介绍了IM的基本概念及流程。封面是这次实现微信聊天系统的截屏，这章节主要和大家一起探讨下系统的架构设计，系统分层以及设计思想。

## 技术选型

IM聊天系统技术选型考虑通用性，复用性。主要有如下划分：

- IM通道层：使用云信IM服务，保证IM的通道互通
- 数据SDK层：使用 Typescript 构建的 SDK 能力，扩展中间件能力。
- UI层: 使用 `Alibab/rax` 的跨端解决方案，定制基础组件和业务组件等。
- 工具链路支撑： 使用 Yeoman 扩展生成器定制开发工具集。

## 架构设计

### 架构大图

为了保证扩展性和鲁棒性，我们把聊天系统拆分三层来处理，数据层，解析层和UI层，如上图。

1. IM通道层：如何IM服务对接，上一章介绍了如何对接云信的流程。
2. 数据层SDK：设计通用IM-SDK模型，如何实现一个SDK的中间件模块，事件模块，以及一些通用的工具类函数。
3. 解析层：如何用Pipeline的思想来结合组件和数据，最终实现数据源和UI一一对应。
4. UI组件层：IM消息系统的UI层，观察共性实现高阶组件，以及其他业务组件，如输入框，表情组件。

### 设计思想

**总体设计思想**：设计分离出数据层和UI层，数据层和UI层以标准化协议对接。具体大图如下

- 数据层：通过中间件的方式扩展功能。
- UI层：通过 `Pipeline` 的方式，数据和UI所见即所得。

![image-20210214203410690](/Users/poetry/Library/Application Support/typora-user-images/image-20210214203410690.png)

解释说明，有如下几个步骤：

1. 在数据层，对接IM服务厂商（理解为数据管道），数据流通过 Dispatch 到中间件模块，中间模块主要由 编码，解码等模块组成。主要目的是把非标准化的数据格式转化层标准化协议。
2. 数据层目的是对接不同IM厂商，把非标准的数据格式转化成标准的数据格式。如：`Message` 和 `Session`。
3. 在UI层，消息格式通过 `Dispatch` 到 `Pipeline` 管道，和HOC组件结合，转化成不同消息格式的UI。如图一条文本消息，通过`Pipeline`转化成文本UI。

## 结语

对于系统架构设计的主要目的是为了解决软件系统复杂度带来的问题。作者总结了系统架构设计的几个要点，可以从如下几个方面去思考问题:

1. 首先了解系统的基本概念以及基本流程。
2. 设计核心模块，以及核心的设计思想。
3. 对系统架构和模块分层。前端系统一般可以从 UI层 和 数据层着手，然后在细分
4. 联通各个模块之间的接口和通信。

> 这一章节，我们介绍IM系统的架构思想以及IM系统的分层。我们也提到了一些重要的技术实现，例如：HOC组件，SDK的Middleare模块， Pipeline管道，会下面两章实战如何实现这些模块，前方高能，需要读者预习下前两章的基础知识。



# 数据SDK开发

## 前言

本章主要和大家一起实现一个具有中间件，事件等功能的可扩展的SDK，基于此基础SDK， 从而实现云信聊天SDK模块。

![image-20210214203903585](http://img-repo.poetries.top/images/image-20210214203903585.png)

上图是这样和大家讲解的核心模块，具体源码可以参考如下仓库地址，对应的NPM安装包如下：`tbms-middleware`、 `tbms-sdk`、`tbms-brandsdk-yunxin` 和 `generator-typescript-jest-sdk`。

> 1. 中间件源码(tbms-middleware): [github.com/ge-tbms/tbm…(opens new window)](https://github.com/ge-tbms/tbms-packages/tree/master/packages/tbms-middleware)
> 2. 基础SDK源码：[github.com/ge-tbms/tbm…(opens new window)](https://github.com/ge-tbms/tbms-packages/tree/master/packages/tbms-sdk)
> 3. 云信SDK源码：[github.com/ge-tbms/tbm…(opens new window)](https://github.com/ge-tbms/tbms-brandsdk-yunxin)
> 4. SDK生成脚手架源码：[github.com/ge-tbms/gen…(opens new window)](https://github.com/ge-tbms/generator-typescript-jest-sdk)

## tbms-midddleware 设计思想

`tbms-middleware` 的设计参考了Koajs的设计原理。Koajs的中间件思路： 中间件对于一次请求来处理，context分别集成了request和response对象。

**同理可以映射成对一条收发消息的处理，通过dispatch，经过中间件流转，转化成系统期望的数据结构**。

在context中会集成 `message(消息)` , `session(会话)` , `app(如用户，初始化sdk信息等其他信息)`

![image-20210214203931439](http://img-repo.poetries.top/images/image-20210214203931439.png)

解释说明：websocket 接受一条数据流，通过 `action` 触发 `dispatch` 方法， `dispatch` 会触发各个 `middleware` 模块，同时一直保存着 `context`执行上下文。在视图层同样通过 `action` 触发 `dispatch`, 回流到 `view` 层。

### tbms-middleware 核心实现

tbms-middleware 模块继承于 tbms-util 的 EventEmitter 事件类（此实现源码在通用SDK设计中实现过），因此 tbms-middleware 模块具有事件发布-订阅模式。

### tbms-middleware-compose 核心代码

```text
export default function compose(middleware: ICallback[]) {
 /**
   * 中间件返回函数
   * @param {Array} middleware
   * @return {Function}
   *
   */
  return function(context: object, next?: Promise<any> | ICallback) {
    let index: number = -1;
    // 0. 执行 dispatch 递归模块
    return dispatch(0);
    // 1. 实现 dispatch 函数，返回Promise链
    function dispatch(i: number): Promise<any> {
      if (i <= index)
        return Promise.reject(new Error("next() called multiple times"));
      index = i;
      let fn: any = middleware[i];
      // 2.1 如果递归索引值为模块长度，赋值next，
      // 2.2 同时next为空的时候，返回 promise resolve，跳出递归。
      if (i === middleware.length) fn = next;
      if (!fn) return Promise.resolve(context);
      try {
        // 3. i+1 递归执行下一个Middleware模块
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        // 4. 异常情况跳出递归，返回 Promise reject 
        return Promise.reject(err);
      }
    }
  };
}
```

代码详细解析:

1. 内部实现 `dispatch` 函数, 返回一个 `Promise` 链
2. 通过高阶函数，内部闭包维护了 `middleware` 数组。同时以 0 为索引执行 `dispatch` 模块。每个middleware函数模块输入参数为两个 context 和 next。 1. context执行上下文对象，存储各个middleware修改的状态。 2. next 为 `dispatch.bind(null, i + 1))` 通过 bind 函数，递归执行 `Promise` 链。同时此中间件方法适用于异步方法。
3. 如果递归索引值为模块长度，赋值next，同时next为空的时候，返回 promise resolve，跳出递归。

### tbms-middleware 核心代码

```text
/**
* 触发函数
* @param {Object} message  消息体
*/
dispatch(val: ContextObject) {
    // 1. 创建一个上下文，通过Object.create创建一个新的对象
    let context = this.createContext(val);
    // 2. 原型SDK返回一个上下文(ctx), 用于yunxin-sdk等基础的SDK扩展。
    context = this.handleContextExternal(context, val);
    // 3. 执行👆的compose函数，实现promise中间件
    const fnMiddleware = compose(this.middleware);
    // 4. 返回promise实例，以及结果
    return fnMiddleware(context).catch(this.onerror.bind(this))
}
/**
* 处理上下文，给上下文添加额外参数
* 子类继承扩展
* @param {Object} context 上下文
*/
handleContextExternal(ctx: ContextObject, val: ContextObject) {
    return ctx
}

/**
* 创建新的上下文
* @param {Object} message 创建'`新上下文`'
*/
createContext(val: ContextObject) {
    const ctx = Object.create(this.context);
    // 对原有ctx扩展
    return Object.assign(ctx, val);
}
```

代码详细解析：

1. 每次 dispatch 通过Object.create创建一个新的上下文对象。
2. handleContextExternal 用于继承原型 Middleware 进行扩展，子类实现。
3. 执行上文的compose函数，实现promise中间件。此中间件支持异步请求
4. 返回一个 promise 实例，以及最终处理结果。

### tbms-middleware 单元测试

```text
import Middleware from '../src/index';

test('basic', (done) => {
  const middle = new Middleware({})
  // 1. 添加中间件1，同时支持异步返回
  middle.use((ctx, next) => {
    ctx.test = 1;
    console.log('use1 >>>')
    next().then(() => {
      ctx.userDeffer1 = '1'
      console.log('use1 <<< promise')
    });
    console.log('use1 <<<')
  });
  // 1. 添加中间件2，同时支持异步返回
  middle.use((ctx, next) => {
    ctx.testTwo = 2;
    console.log('use2 >>>')
    next().then(() => {
      ctx.userDeffer2 = '2'
      console.log('use2 <<< promise')
    });
    console.log('use2 <<< ')
  })
  middle.dispatch({message:{message: 1, id: '12'}}).then((result: any) => {
    expect(result.userDeffer1).toBe('1');
    expect(result.userDeffer2).toBe('2');
    done();
  })
});

// 测试 async await 写法
test('await async function ', (done) => {
  const middle = new Middleware({})
  async function asyncTest() {
    const result = await middle.dispatch({message:{message: 2, id: '12'}});
    expect(result.message.message).toBe(2);
    done();
  }

  asyncTest()
})
```

我们可以在源码 tbms-middleware 目录下运行 `npm run test` 查看结果。结果如下：

![image-20210214203954279](http://img-repo.poetries.top/images/image-20210214203954279.png)

测试结果解析：同步的方法先执行（从外到内），异步的方法（从内到外），洋葱圈模型。

## tbms-sdk 核心实现

tbms-sdk 是一个标准的IM-SDK模块，tbms-sdk 继承与 tbms-middlware 模块，因此它同时具有 中间件 和 事件监听发布 能力。在此模块主要实现统一的API接口以及标准事件回调，初始化聊天的参数配置以及一些通用的业务逻辑处理。 如图是标准API接口 和 tbms-sdk测试用例（测试用例）

![image-20210214204020363](http://img-repo.poetries.top/images/image-20210214204020363.png)

### 初始化参数配置

初始化参数配置依赖于IM的基本概念和基本流程。我们需要传入 `appkey`, `touid`, `uid`必填参数。同时需要有些通用事件回调, `onlogin`, `onmsg`, `onofflinemsg` 等等。

| Name             | Type     | Description                                      |
| ---------------- | -------- | ------------------------------------------------ |
| `appkey`         | String   | 应用APPKEY                                       |
| `touid`          | String   | 目标用户Id, 可以是群ID或者用户Nick               |
| `uid`            | String   | 账号Id或者Nick                                   |
| `onlogin`        | function | 登入回调，可以拿到用户信息                       |
| `onconnect`      | function | 连接建立后的回调, 会传入一个对象, 包含登录的信息 |
| `onerror`        | function | 发生错误回调                                     |
| `onmsg`          | function | 实时消息回调                                     |
| `onsystemmsg`    | function | 系统消息回调                                     |
| `onofflinemsg`   | function | 离线消息，漫游消息，历史消息回调                 |
| `onconversation` | function | 同步最近会话列表回调, 会传入会话列表。           |

#### SDK实例

```text
const imsdk = new IMSDK({
     appkey: 'b652154953697d814225f7aa707491b1',
     touid: 'alice',
     uid: 'bob',
     onlogin: onLogin,
     onclose: onClose,
     onerror: onError,
     onmsg: onMsg,
     onsystemmsg: onSystemMsg,
     onofflinemsg: onOfflineMsg,
     onconversation: onConversation
})

const onLogin = (user: IMUser) => {
 // user 用户信息
}

const onError = (error: IMError) => {
  // 错误对象处理
}

const onMsg = (msgs: IMMessage[]) => {
 // 实时消息同步
}

const onSystemMsg = (msgs: IMSystemMessage[]) => {
 // 系统通知消息
 // 通知消息属于`会话内`的一种消息，用于会话内通知和提示场景。例如：群名称更新、某某某退出了群聊等
}

const onOfflineMsg = (msgs: IMMessage[]) => {
 // 离线消息，漫游消息，历史消息回调
}

const onConversation = (conversation: Conversation[]) => {
 // 最近会话
}
```

### tbms-sdk 核心代码

代码详细见 `tbms-sdk/src/index.ts`, tbms-sdk 继承与 tbms-middlware 模块，因此它同时具有 中间件 和 事件监听发布 能力。

tbms-sdk 对标准接口进行了封装，同时对消息流 `action` 统一通过 `dispatch` 方法走中间件模块。

```text
 /**
   * 触发实时消息
   * @param {object | MessageObject} message 消息体
   * @api dispatchMsg
   */
  dispatchMsg(message: MessageObject) {
    this.dispatch({ message: message }).then((result: any) => {
      this.options.onmsg(result.message, result)
    })
  }
```

代码详解：对新消息，调用 `dispatchMsg` 的 `action`, 通过 `dispatch` 流转中间件。 得到最终标准化消息数据。

## tbms-yunxin-sdk 核心实现

代码详细见 `tbms-sdk/src/core.ts`，主要实现的功能是把云信的SDK通过事件的方式转化到标准SDK中

```text
// 底层调用云信SDK
this.sdk = NIM.getInstance({
  appKey: APP_CONFIG.appkey,
  token: options.token,
  account: options.accid,
  onconnect: (event: any) => {
    // 接受登录成功回调，同时分发这个事件。
    this.emit(MSG_EVENT_CONSTANT.LOGIN_SUCCESS, event);
  },
  onerror: (event: any) => {
    // 接受错误回调，同时分发这个事件。
    this.emit(MSG_EVENT_CONSTANT.LOGIN_ERROR, event);
  },
  onroamingmsgs: (obj: any) => {
    const msgs = obj.msgs;
    // 接受漫游消息回调，同时分发这个事情
    this.emit(MSG_EVENT_CONSTANT.GET_OFFLINE_MSG, msgs);
  },
  onofflinemsgs: (obj: any) => {
    const msgs = obj.msgs;
    // 接受离线消息回调，同时分发这个事情
    this.emit(MSG_EVENT_CONSTANT.GET_OFFLINE_MSG, msgs);
  },
  onsessions: (sessions: any[]) => {
    // 单聊有且只有一个会话对象
    this.conversation = sessions[0] || {};  
    // 由于会话属于中间件字段，需要通过 middleware 流转
    this.dispatchConversation(this.conversation);
  },
  onmsg: (msg: any) => {
    // 取唯一标识
    msg.id = msg.idClient; 
    // 接受实时消息回调，同时分发这个事情
    this.emit(MSG_EVENT_CONSTANT.RECEIVE_MSG, msg);
  }
})
```

### tbms-yunxin-sdk 的 middleware 代码实现

代码详细见 `tbms-sdk/src/middleware.ts`, 主要是编码和解码中间件模块，插入到 tbms-yunxin-sdk 中。

```text
/**
 * 解码中间件流
 * @param ctx
 * @param next
 */
export const messageDecodeFlow = function(ctx:any, next:any) {
  let message = ctx.message;

  if (message.from && message.to && message.from !== message.to) {
    message.conversationId = message.sessionId;
    message.scene = 'single';
    message.status = 'success';
    switch(message.type) {
      case 'text': // 文本消息
        merge(message, {
          type: 'text',
          content: message.text
        });
        break;
      default:
        merge(message, {
          type: 'text',
          content: '目前版本暂不支持该功能'
        })
        break;
    }
  }

  next();
}

/**
 * 编码中间件流
 * @param ctx
 * @param next
 */
export const messageEncodeFlow = function(ctx: any, next: any) {
  let message = ctx.message;
  if (message.from && message.to && message.from === message.to) {
    message.conversationId = ctx.conversation.conversationId;
    message.scene = 'single';
    message.status = 'success';
    message.idClient = message.id;
  }
  next();
}
```

代码详解，传入两个参数 `context` 和 `next`

- 编码模块：把非标准的数据流解析成标准化消息格式。
- 解码模块：把标准化消息格式解析成服务器请求的参数消息格式。

### tbms-yunxin-sdk 的 主模块实现

代码详见 `tbms-yunxin-sdk/src/index.ts`

```text
constructor(options: any) {
    this.options = options;
    // 实例化Core模块
    this.core = new Core(options);
    // 添加中间件实现，主要是编码模块，解码模块
    this.core.useBatch([messageEncodeFlow, messageDecodeFlow])
    this.init();
}
/**
* 初始化，事件监听
*/
init() {
    this.core.on(MSG_EVENT_CONSTANT.RECEIVE_MSG, (msg: any) => {
      this.core.dispatchMsg(msg);
    });
    
    this.core.on(MSG_EVENT_CONSTANT.LOGIN_SUCCESS, (event: any) => {
      this.core.dispatchLogin(event);
    });
    
    this.core.on(MSG_EVENT_CONSTANT.LOGIN_ERROR, (event: any) => {
      this.options.onerror(event);
    });
    
    this.core.on(MSG_EVENT_CONSTANT.GET_OFFLINE_MSG, (msgs: any) => {
      msgs.forEach((msg: any) => {
        this.core.dispatchOfflineMsg(msg);
      });
    });
}
```

**代码解析：** 在主函数模块中，主要是实例化 `Core` 模块，同时添加中间件模块。 另一方面通过监听标准化事件，统一处理消息（dispatch 到中间件模块）。

## 结语

看完 tbms-yunxin-sdk 代码实现， 读者可能会想，作者为什么要这么来实现，直接通过云信的SDK来实现不是很方便直接，为什么要去对接标准SDK。这是一个非常好的问题，这样做的目的，今天我们架构的是一个通用解决方案，不仅仅为了云信来实现，这套实现方案以后可以对接微信IM云，淘宝IM服务等。 使用这套框架，之后对接IM服务厂商的时候，我们只需要扩展实现 `Middleware` 模块，其他能力都是可以共用。

## 参考文档

- [redux middleware 详解(opens new window)](https://zhuanlan.zhihu.com/p/20597452)
- [Koa 源码实现(opens new window)](https://github.com/koajs/koa/tree/master/lib)



# UI组件化

## 前言

上一章我们实战了数据层的开发，这样我们来实现UI组件化, 技术方案选用 `Alibaba/rax`, 类 React 语法，适用于移动端开发。这章重点会介绍 组件化的设计分层， HOC组件设计，解析器模块设计。

### 源码地址（组件化代码合集）

> [github.com/ge-tbms/tbm…(opens new window)](https://github.com/ge-tbms/tbms-components)

## 需求交互

![image-20210214204151439](http://img-repo.poetries.top/images/image-20210214204151439.png)

针对交互稿我们有如下业务诉求分析：

1. 对于一个聊天的UI可以拆分为 普通消息， 自定义（卡片）和系统消息组件。
2. 对上面提到的消息展示， 抽象成一个HOC组件，封装不可变的UI，包裹可变组件。
3. 封装输入框组件，表情组件。

## 组件化架构框图

![image-20210214204210479](http://img-repo.poetries.top/images/image-20210214204210479.png)

对聊天消息组件化能力划分三个层级：基础消息组件，自定义消息组件和业务组件。

- 基础组件(rax-tbms-basemsg)：包括 文本消息、图片消息、系统消息等
- 自定义消息（rax-tbms-custommsg）: 卡片消息， 抽屉消息等。
- 业务组件(rax-tbms-chat-plugin): 表情，输入框，加载组件等

## 消息HOC组件

高阶组件（HOC）是组件开发中的高级技术，用来重用组件逻辑。

具体而言，高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件。表达式如下：

> const EnhancedComponent = higherOrderComponent(WrappedComponent);

我们观察交互可以发现，聊天项可以抽象分离出一个HOC高阶组件。

- 不可变区域为：头像和头像标题。
- 可变区域：中间的消息流，根据不同消息展示不同消息UI。

```text
const leftChatItemHOC = (WrappedComponent) => (conversation) => {
    const avator = conversation.targetAvator;
    // 1. 返回一个装饰过的组件
    return class extends PureComponent {
        render() {
          return (
            <View style={style.container}>
              <View style={style.containerAvator}>
                <Image source={{uri: avator}} resizeMode="cover" style={style.containerAvator} />
              </View>
              <View style={[style.containerCnt, style.containerLeft]} >
                <Text style={style.containerNick}>{conversation.targetNick}</Text>
                <View style={style.containerWrappedCard}>
                  // 2. 返回传入的可变组件, 同时注入组件
                  <WrappedComponent {...this.props} />
                </View>
              </View>
            </View>
          );
        }
    }
}
```

代码解释：封装了一个左侧消息展示的高阶函数，用来重用组件逻辑，返回一个传入的可变组件，同时注入属性。

### 使用事例

高阶组件`rax-tbms-chat-item` 封装了 `leftChatItemHOC` 和 `rightChatItemHOC`，分别是左侧对方发送消息高阶组件和右侧自己发送消息高阶组件。

`WrappedComponent` 为传入的组件， 通过高阶组件返回一个新的组件。 源码地址：

> [github.com/ge-tbms/tbm…(opens new window)](https://github.com/ge-tbms/tbms-components/blob/master/packages/rax-tbms-chat-item/src/index.js)

使用事例参考如下:

```text
import { leftChatItemHOC } from 'tbms-ui-chat-item';
import { TextMsg } from 'tbms-ui-chat-basemsg';

// 1. 设置会话基础信息
const conversation = {
  avator: 'https://gw.alicdn.com/tfs/TB1aRryvSzqK1RjSZFpXXakSXXa-640-640.png',
  targetNick: '伊芙丽旗舰店小徐',
  fromNick: 'moliy'
};

// 2. 设置消息格式
const message = {
  type: 'text',
  content: '其他的小伙伴有需要一起来看看吗？'
};

// 3. 返回HOC包裹的高阶组件
const ItemComponent = leftChatItemHOC(TextMsg)(conversation);

// 文本消息的消息流组件
<ItemComponent {...message} />
```

代码解释说明如下：

1. 设置会话基础信息
2. 设置消息格式
3. 返回HOC包裹的高阶组件

## 基础组件

聊天基础消息组件可以分为 文本消息、图片消息、系统消息 和 富文本消息 ，下面举一个简单的文本消息组件。

```text
/**
 * @class
 * @name tbms-text 基础组件
 * @property {Object} props           属性
 * @property {String} props.text      文字
 */
export default class extends BaseComponent {
  render() {
    const styles = this.styles;
    // 1. 解析富文本，表情消息
    const richText = wwParser(this.props.content, styles);
    return <View style={styles.container}>{richText}</View>
  }
}
```

rax-tbms-basemsg 基础消息组件

```text
import { TextMsg } from 'rax-tbms-basemsg';
```

## 组件解析器模块

### 设计框图

![image-20210214204231613](http://img-repo.poetries.top/images/image-20210214204231613.png)

上一章我们通过中间件的方式，整合输出了标准 IM 数据结构：消息和会话。 这章我们要介绍下一条消息如何通过 pipline 表现出标准化UI，原理图如上所示。

### 设计思想

组件中间件的设计思路来源于数据驱动，如何根据不同的消息格式展示不同的UI组件。作者设计了一种管道模型（ `消息 ---> UI解析器 --> 组件` ），每条消息都通过解析器管道，最终得到上下文对象，包含高阶组件和消息数据两个属性对象。

设计的好处：入口和出口统一，对于数据和UI组件的映射关系放在 UI解析器模块。同时管道模型设计成插件可扩展方式，可以插拔不同UI解析器模块。

### 解析器参考代码

> [github.com/ge-tbms/tbm…(opens new window)](https://github.com/ge-tbms/tbms-components/blob/master/packages/rax-tbms-chat-parser/src/parse.js)

### 中间件模型

promiseMiddleware 模块参考 **前端进阶能力 - 通用SDK设计** 的中间件函数。

#### 解析器中间件模块 **middleware**

```text
export default class {
  public middlewares:any[] = [];
  public ctx = {
    ItemComponent: null,
    message: {},
    conversation: {}
  }
  constructor(middlewares: any[]) {
    this.middlewares = middlewares;
  }
  // 1. 批量添加中间件
  useBatch(steps: any[]) {
    if (_.isArray(steps)) {
      this.middlewares = this.middlewares.concat(steps);
    } else {
      throw TypeError('useBatch must be arrary!!!')
    }
  }
  // 2. 触发消息数据，每条消息都经过中间件流转
  dispatch(msg: any, conversation: any) {
    let steps = Object.create(this.middlewares);
    let ctx = Object.create(this.ctx);
    ctx.conversation = conversation;
    ctx.message = msg;
    // 3. 绑定执行上下文，批量处理解析器模块
    return _.promiseMiddleware(steps, ctx);
  }
}
```

代码解释说明：

`ctx`保持了这次调用的引用。所有对象都挂载到`ctx`上，统一接口通过 `dispatch` 函数进行流转。 通过解析器 (parser) 会多挂载一个 高阶组件包装后的 `ItemComponent` 组件对象。

#### 解析器模块 parser

解析模块的作用是根据不同的消息 映射成 不同的消息UI组件，具体参考代码如下：

```text
import { TextMsg } from 'rax-tbms-basemsg';
import { leftChatItemHOC, rightChatItemHOC } from 'rax-tbms-chat-item';

export default function (ctx) {
  const msg = ctx.message;
  let message = merge({ type: msg.type }, msg);
 
  switch(msg.type) {
    // 1. 区分消息类型
    case 'text':
      // 2. 合并消息数据
      ctx.message = merge(message, {
        content: msg.content
      })
      // 根据数据流向，通过HOC组件包装消息
      ctx.ItemComponent = msg.flow === 'in' ? leftChatItemHOC(TextMsg)(ctx.conversation) : rightChatItemHOC(TextMsg)(ctx.conversation);
      break;
    default:
      break;
  }
}
```

#### 实例调用

```text
import baseParser from './parser.js'

// 0. 实例化中间件模块
const componentParser = new Middleware([baseParser]);

// 1. 自定义解析器，现为空
const cosutomParser = (ctx) => ({});

// 2. 批量添加额外的UI解析器
componentParser.useBatch([customParser])

// 3. 注入 msg 和 conversation 两个对象
componentParser.dispatch(msg, conversation).then(ctx => {   
    // 3.1 返回由解析器流转后的消息实体
    const message = ctx.message; 
    // 3.2 返回由解析器流转后的高阶组件
    const ItemComponent = ctx.ItemComponent; 
    
    // 4. render 实体组件
    render(<ItemComponent {...ctx.message} />)
})
```

代码解释说明：通过 `middleware` 和 `parser` 两个模块就实现了 `pipeline` 功能。 实例化 中间件模块，所有数据通过 `dispatch` 分发。

## 结语

本章提供了一种通用的数据驱动UI的设计模式，称作 pipeline 设计模式，同时介绍了组件化开发的通用思路： HOC组件开发，组件化分层的思想。这章介绍的实践能力和思想同样可以适用于其他业务，有助于提升大家的前端设计架构能力。

# 前言

上文介绍了数据层SDK和UI组件的开发，大家了解了系统的分层，分别知道各个层如何实现，这章主要和读者一起串联各个模块，介绍里面串联的设计技巧，完整的搭建一个原型聊天系统，感兴趣的同学可以在这基础上扩展。

### 技术栈准备

1. Alibab/RAX 技术栈，[开源地址(opens new window)](https://github.com/alibaba/rax)
2. Yeoman 使用 自建 `generator-rax-component` 脚手架构建聊天项目环境
3. 数据SDK开发章节封装的 `tbms-brandsdk-yunxin` NPM包，提供标准SDK。
4. UI组件章节封装的 `tbms-components` 的NPM包，提供UI组件。

### 相关技术栈源码

> generator-rax-component: [github.com/ge-tbms/gen…(opens new window)](https://github.com/ge-tbms/generator-rax-component)

> tbms-brandsdk-yunxin: [github.com/ge-tbms/tbm…(opens new window)](https://github.com/ge-tbms/tbms-brandsdk-yunxin)

> tbms-components: [github.com/ge-tbms/tbm…(opens new window)](https://github.com/ge-tbms/tbms-components)

## 数据和UI层结合

整体结合思路，通过数据层SDK的标准数据结构和回调，通过 `dispatch` 和 UI层组件结合起来，在封装消息HOC组件, 实现所见即所得。

> 数据层 + UI层 => 聊天系统

![image-20210214204409184](http://img-repo.poetries.top/images/image-20210214204409184.png)

聊天系统源码地址：

> [github.com/ge-tbms/tbm…(opens new window)](https://github.com/ge-tbms/tbms-chat)

## 标准SDK使用

### 初始化SDK

```text
import {createElement, Component, render, findDOMNode} from 'rax';
// 1、数据层沉淀的 `tbms-brandsdk-yunxin` SDK NPM包
import YUNXINSDK from 'tbms-brandsdk-yunxin';
// 2、组件容器
class App extends Component {
  constructor() {
    super();
    
    // 3、初始化SDK，初始化参数及标准事件回调
    this.sdk = new YUNXINSDK({
      uid: uid,                                         // 登录用户ID
      touid: touid,                                     // 目标用户ID
      onmsg: this.onMsg.bind(this),                     // 收到及时消息回调
      onofflinemsg: this.onOfflineMsg.bind(this),       // 收到离线消息回调
      onerror: this.onError.bind(this),                 // 错误情况回调
      onconversation: this.onConversation.bind(this),   // 建立或者更改会话回调
      onsystemmsg: this.onSystemMsg.bind(this),         // 系统消息回调
      onlogin: this.onLogin.bind(this)                  // 登录信息回调
    });
  }
}
```

注释：在组件构造器生命周期中初始化SDK，初始化参数，回调各种标准事件。

### 编写 onmsg 回调

```text
 // 通过scrollTop 设置滚动偏移高度
const SCROLLTOP = 100000;          

class App extends Component {
  onMsg(msg) {
    const MessageList = this.state.MessageList;

    componentParser.dispatch(msg, this.conversation).then(ctx => {
      const ItemComponent = ctx.ItemComponent;
      // 设置页面title
      this.titleParse(ctx.message);
      // push消息组件
      MessageList.push(<ItemComponent {...ctx.message} />);
      // 更新节点
      this.setState({
        MessageList
      }, () => {
        // 滚动到页面底部
        this.horizontalScrollView.scrollTo({y: SCROLLTOP});
      })
    })
  }
}
```

注释：1. 维护消息队列，通过上文提到解析器模块流转数据，从而在 `then` 中获取相应的组件。2. 设置标题，Push 消息组件到 MessageList 消息队列中。3. setState更新状态，在更新状态之后把导航栏至底部。

### 编写 offlinemsg 回调

```text
class App extends Component {
  onOfflineMsg(msg) {
    const MessageList = this.state.MessageList; 
    if (_.isObject(msg)) {
      componentParser.dispatch(msg, this.conversation).then((ctx) => {
        const ItemComponent = ctx.ItemComponent;
        // 1、通过unshift顶部队列
        MessageList.unshift(<ItemComponent {...ctx.message} />);
        // 2、更新节点
        this.setState({
          MessageList,
        }, () => {
          // 3、导航栏定位到相应位置
          const scrollTop = findDOMNode(this.refs['body']).offsetHeight - this.containerHeight;
          this.horizontalScrollView.scrollTo({y: scrollTop});
        })
      })
    } else {
      // 4、没有历史消息（离线消息），则为暂无消息
      this.setState({
        isEmpty: true
      })
    }
  }
}
```

注释：和 onmsg 差别在于顶部更新消息队列，同时导航栏定位到相应位置。如果没有历史消息（离线消息）则设置为为空表现。

### 编写 onConversation，onLogin 和 onError 回调

```text
import merge from 'lodash/merge';
import Toast from 'universal-toast';

class App extends Component {
  onConversation(conversation) {
    // 1、存储会话信息
    this.conversation = merge(this.conversation, conversation);
  }

  onLogin() {
    Toast.show('登入成功');
    // 2、登入成功，则开始获取历史消息
    this.sdk.getHistoryMessage({
      scene: 'p2p',
      to: this.conversation.touid,  
    })
  }

  onError(err) {
    // 统一错误信息处理
    Toast.show(JSON.stringify(err));
  }
}
```

注释：onLogin 登录成功之后，拉取历史消息

## UI层使用

### 整体UI结构

```text
class App extends Component {
 renderPlugin() {
    // 1、插件选择，原型聊天实现 emoji 表情插件
    if (this.state.pluginVisible === 'emoji') {
      return <EmojiPlugin onChange={this.handleEmojiChange} onSend={this.handleSendText} type="ww" />;
    } else {
      return null;
    }
  }
  render() {
    return (
      // 2、聊天View容器
      <View style={styles.container}>
        // 3、消息流滚动组件 
        <ScrollView 
          style={styles.containerBody}
          ref={(scrollView) => {this.horizontalScrollView = scrollView;}}
        >
        <View ref="body">
        {this.state.MessageList}
        </View>
        </ScrollView>
        // 4、输入框组件
        <InputText text={this.state.inputText}
          onPluginChange={this.handlePluginChange}
          onFocus={this.handleFocus}
          onChange={this.handleChangeText}
          onSubmit={this.handleSendText}
          showPlugin={false}
        />
        // 5、插件组件
        {this.renderPlugin()}
      </View>
    );
  }
}
```

注释：整体聊天UI结构主要分为三个区块：消息流区域，输入框区域和插件区域。

插件和输入框组件通过自定义组件包 `rax-tbms-chat-plugin` 引入。

### 消息发送

```text
class App extends Component {
  handleSendText = (text) => {
    const content = (text || this.state.inputText).trim();
    // 1、判断内容是否为空
    if (content) {
      // 2、 发送文本消息
      this.sdk.sendMsg({
        type: 'text',
        content: content
      });
      this.setState({
        inputText: ''
      })
    } else {
      Toast.show('亲，输入内容不能为空哦！')
    }
  }
}
```

注释：通过 sdk 封装的 sendMsg 发送消息，同时也可以指定其他数据类型（例如image，card等数据类型）。

## 结语

这个章节把之前封装的模块进行了串联，总结起来，作者认为做好分层，明确每一层的职能和划分， 基本可以从容面对一个负责的系统。

就像IM聊天，我们把复杂的数据逻辑放在了SDK层，同时接口数据方面做了单元测试来保证稳定性。 在UI方面，拆分了单元化组件，最后再把两者结合起来构建了一个聊天系统。

## 复盘提升

这是一次完整的项目实践过程，用到了前端各种技术栈和思考模型。同时小册精讲了各个知识点，我们需要辩证的来看各个知识点解决的问题，最重要的是通过项目实践，形成体系化的思考模型。

如下图所示：原先我们是发散性思维模式到现在的体系化思维模式。

![image-20210214204431618](http://img-repo.poetries.top/images/image-20210214204431618.png)