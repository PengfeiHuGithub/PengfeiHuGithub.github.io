# React Hooks与Immutable实战

这一节来介绍 React 的渲染机制————Reconciliation 过程 (很多人翻译成 "一致化处理过程"，个人觉得不太贴切，直译为 "协调" 反而更好，且看下面分解)。

![image-20210215170925278](https://img-repo.poetries.top/images/image-20210215170925278.png)

如上图所示，React 采用的是虚拟 DOM (即 VDOM )，每次属性 (props) 和状态 (state) 发生变化的时候，render 函数返回不同的元素树，React 会检测当前返回的元素树和上次渲染的元素树之前的差异，然后针对差异的地方进行更新操作，最后渲染为真实 DOM，这就是整个 Reconciliation 过程，其核心就是进行新旧 DOM 树对比的 diff 算法。

为了获得更优秀的性能，首先映入脑海的便是 `减少 diff 的过程`，那么在保证应该更新的节点能够得到更新的前提下，这个 diff 的过程如何来避免呢？

答案是利用 shouldComponentUpdate 这个生命周期函数。这个函数做了什么事情呢？

默认的 shouldComponentUpdate 会在 props 或 state 发生变化时返回 true, 表示组件会重新渲染，从而调用 render 函数，进行新旧 DOM 树的 diff 比对。但是我们可以在这个生命周期函数里面做一些判断，然后返回一个布尔值，并且返回 true 表示即将更新当前组件，false 则不更新当前组件。换句话说，我们可以通过 shouldComponentUpdate 控制是否发生 VDOM 树的 diff 过程。

关键的知识点已经做好了铺垫。现在我们以 React 官方的一个图为例，完整地分析一下 Reconciliation 的流程:

![image-20210215171024258](https://img-repo.poetries.top/images/image-20210215171024258.png)

SCU 即 shouldComponentUpdate 的简写，图中的红色节点表示 shouldComponentUpdate 函数返回 true ，需要调用 render 方法，进行新旧 VDOM 树的 diff 过程，绿色节点表示此函数返回 false ，不需要进行 DOM 树的更新。

从 C1 开始，C1 为红色节点，shouldComponentUpdate 返回 true，需要进行进一步的新旧 VDOM 树的比对，假设现在两棵树上的 C1`节点类型相同`，则递归进入下一层节点的比较，首先进入 C2，绿色节点，表示 SCU 返回 false，`不需要对 C2 的 VDOM 节点进行比对`，同时 `C2 下面所有的后代节点` 都不需要比对。

现在进入 C3，C3 为红色节点，表示 SCU 为 true，需要在该节点上进行比对，假设两棵树的 `C3 节点类型相同`，则继续进入到下一层的比对中。其 r 中 C6 为红色节点，进行相应的 diff 操作，C7、C8 都为绿色节点，都不需要更新。

当然可能你会有疑问，上面都是在 diff 的时候假设节点类型相同，那如果节点类型不相同的时候会怎样呢？这里 React 的做法非常简单粗暴，直接将 `原 VDOM 树上该节点以及该节点下所有的后代节点` 全部删除，然后替换为新 VDOM 树上同一位置的节点，当然这个节点的后代节点也全都跟着过来了。这属于 diff 算法的实现细节，我们在文末的彩蛋中会对于 diff 更全面和细致的拆解：）

因此我们可以发现，如果能够合理利用 shouldComponentUpdate，从而能避免不必要的 Reconciliation 过程，使得应用性能可以更加优秀。

一般 shouldComponentUpdate 会比较 props 和 state 中的属性是否发生改变 (浅比较) 来判定是否返回 true，从而触发 Reconciliation 过程。典型的应用就是 React 中推出的 PureComponent 这个 API，会在 props 或者 state 改变时对两者的数据进行浅层比较。

但是在上一小节已经提出，这个项目全面拥抱函数式组件，不再用类组件了，因此 shouldComponentUpdate 就不能再用了。用了函数组件后，是不是就没有了浅比较的方案了呢？并不是。React 为函数组件提供了一个 `memo` 方法，它和 PureComponent 在数据比对上唯一的区别就在于 `只进行了 props 的浅比较`。而且它的用法很简单，直接将函数传入 memo 中导出即可。形如:

```text
function Home () {
    //xxx
} 
export default React.memo (Home);
```

这也就解释了为什么我们需要用在每个组件导出时都要加 memo 包裹。

## 彩蛋: React 虚拟 DOM 的 Diff 原理全解析

谈到 React,diff 算法几乎是一个避不开的话题，因为它对于应用性能来说实在非常重要，但本小节的主角是 shouldComponentUpdate, 因此在正文只是有所提及，现在在彩蛋部分我们就来彻底地整理一下 React 虚拟 DOM 的 diff 算法究竟是如何做的。其实整个过程并不难，难的是它的源码对于边界情况和其他细节的处理，但精通源码，那是参与 React 框架开发的人要做的，我们要做的只是明白其中的原理，以此来帮助我们的应用开发。

> 思维图 (建议收藏)：

![image-20210215171045327](https://img-repo.poetries.top/images/image-20210215171045327.png)

接下来一一地对其中的过程进行拆解。

### 设计思想概述

首先是设计思想，其实从一个树参照另一棵树进行更新，如果利用循环递归的方式对每一个节点进行比较，那算法的复杂度可以到达是 O (n^3), 通俗点来说 1000 个节点的树，要比对 10 亿次，还不包括比对类型、属性等等节点的细节，即使目前性能最高的 CPU 也很难再一秒内算出结果。

但是 React 说它的 diff 就是能达到 O (n) 级别。

不可思议吧！但它其实就是偷工减料，并没有老老实实地比对每一个节点，有一套自己的方法论，简单的归纳一下就是下面三条:

1. 永远只比较同层节点，不会跨层级比较节点。
2. 不同的两个节点产生不同的树。这也就是上面总结的类型不相同的情况，把原来的节点以及它的后代全部干掉，替换成新的。
3. 通过 key 值指定哪些元素是相同的。(后面来展开介绍。)

### 执行规则 (流程)

#### 1、元素类型不相同时

见上文分析。

#### 2. 元素类型相同时

##### a. 都是 DOM 节点

```text
<div className="old" title="老节点" />

<div className="new" title="新节点" />
```

通过比对这两个元素，React 知道需要修改 DOM 元素上的 className 属性和 title 属性。

处理完该节点后，React 继续对子节点进行递归。

##### b. 都是组件元素

组件实例保持不变，更新 props。值得注意的是，这时候调用组件实例的 componentWillReceiveProps () 方法。然后通过 shouldComponentUpdate 返回值决定是否调用 render 方法。

处理完该节点后，依然继续对子节点进行递归。

### 特殊情况讨论：遍历子元素列表

#### 引入 key 值

首先，我们往列表末尾插入一个元素:

```text
<ul>
  <li>1</li>
  <li>2</li>
</ul>
```

插入后为:

```text
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

React 会先匹配两个对应的树，最后插入第三个元素，没有任何问题。

但是如果在头部插入呢？

```text
<ul>
  <li>3</li>
  <li>1</li>
  <li>2</li>
</ul>
```

此时前两个元素和原来都不一样，第三个元素被当作新增的节点，明明只需要更新 1 个节点，现在更新了 3 个。这样的情况效率是非常低的。

于是，React 引入了 key 值的概念。

```text
<ul>
  <li key="first">1</li>
  <li key="second">2</li>
</ul>
```

插入之后变为:

```text
<ul>
  <li key="third">3</li>
  <li key="first">1</li>
  <li key="second">2</li>
</ul>
```

现在 React 通过 key 得知 1 和 2 原来是存在的，现在只是换了位置，因此不需要更新整个节点了，只需要移动位置即可，大大提升效率。

## 选取 key 值的问题

key 选取的原一般是 `不需要全局唯一，但必须列表中保持唯一`。

有很多人喜欢用数组元素的下标作为 key 值，在元素顺序不改变的情况是没有问题的，但一旦顺序发生改变，diff 效率就有可能骤然下降。

举个例子，现在在五个元素中插入 F

![image-20210215171109479](https://img-repo.poetries.top/images/image-20210215171109479.png)

现在由于 F 的插入，后面的 C、D、E 索引值都改变，即 key 值改变，因此后面的节点都得更新。而且，数组乱序或者在头部插入都会导致同样的更新问题。

> 因此，不用数组索引做 key 值的根本原因在于：数组下标值不稳定，修改顺序会修改当前 key

当我们利用 key 值以后，上面的问题便迎刃而解，后面的 C、D、E 只需要向后挪动一个位置即可，真正需要更新的就只有新增的节点了。

好了，React 中的 diff 算法先分享到这里，希望这一小节对你有所启发。

# 为什么要在React中用Immutable数据流

上一节我们已经知道，shouldComponentUpdate 是我们进行性能优化的利器，我们之后的优化方案都会基于它来进行。

## 优化方案一：PureComponent (memo) 进行浅层比较

上一节我埋下了一个伏笔，就是 PureComponent 或者 memo 将会进行新旧数据的浅层比对。你可能会比较好奇，浅层比较是怎么比较的呢？口说无凭，我觉得让大家直观地感受一下比较重要，所以我暂且扒出 PureComponent 浅比较部分的核心源码让大家体会一下，大家不用紧张，其实逻辑非常简单。

```text
function shallowEqual (objA: mixed, objB: mixed): boolean {
  // 下面的 is 相当于 === 的功能，只是对 + 0 和 - 0，以及 NaN 和 NaN 的情况进行了特殊处理
  // 第一关：基础数据类型直接比较出结果
  if (is (objA, objB)) {
    return true;
  }
  // 第二关：只要有一个不是对象数据类型就返回 false
  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false;
  }

  // 第三关：在这里已经可以保证两个都是对象数据类型，比较两者的属性数量
  const keysA = Object.keys (objA);
  const keysB = Object.keys (objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // 第四关：比较两者的属性是否相等，值是否相等
  for (let i = 0; i < keysA.length; i++) {
    if (
      !hasOwnProperty.call (objB, keysA [i]) ||
      !is (objA [keysA [i]], objB [keysA [i]])
    ) {
      return false;
    }
  }

  return true;
}
```

从我写的注释可以看出，在这里开启了四道关卡，但终究还是浅层比较。在下面的情况会判断失灵。

```text
// 调用 state.a.push("2")
state: {a: ["1"]} -> state: {a: ["1", "2"]}
```

其实 a 数组已经改变了，但是浅层比较会表示没有改变，因为数组的引用没有变。看到没有？一旦属性的值为引用类型的时候浅比较就失灵了。

这就是这种方式最大的弊端，由于 JS 引用赋值的原因，这种方式仅仅适用于无状态组件或者状态数据非常简单的组件，对于大量的应用型组件，它是无能为力的。

## 优化方案二:shouldComponentUpdate 中进行深层比对

为了解决方案一带来的问题，我们现在不做浅层比对了，我们把 props 中所有的属性和值进行递归比对。

我们把上面浅层比对的代码进行一些魔改:

```text
 function deepEqual (objA: mixed, objB: mixed): boolean {
  // 下面的 is 相当于 === 的功能，只是对 + 0 和 - 0，以及 NaN 和 NaN 的情况进行了特殊处理
  // 第一关：保证两者都是基本数据类型。基础数据类型直接比较出结果。
  // 对象类型咱就不比了
  if (objA == null && objB == null) return true;
  if (typeof objA !== 'object' &&
      typeof objB !== 'object' &&
      is (objA, objB)) {
    return true;
  }
  // 第二关：只要有一个不是对象数据类型就返回 false
  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false;
  }

  // 第三关：在这里已经可以保证两个都是对象数据类型，比较两者的属性数量
  const keysA = Object.keys (objA);
  const keysB = Object.keys (objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // 第四关：比较两者的属性是否相等，值是否相等
  for (let i = 0; i < keysA.length; i++) {
    if (
      !hasOwnProperty.call (objB, keysA [i]) ||
      !is (objA [keysA [i]], objB [keysA [i]])
    ) {
      return false;
    } else {
        if (!deepEqual (objA [keysA [i]], objB [keysA [i]])){
            return false;
        }
    }
  }

  return true;
}
```

当访问到对象的属性值的时候，将属性值再进行递归比对，这样就达到了深层比对的效果。但是想想一种极端的情况，就是在属性有一万条的时候，只有最后一个属性发生了变化，那我们就不得已将一万条属性都遍历。这是非常浪费性能的。

## 优化方案 3: immutable 数据结构 + SCU (memo) 浅层比对

回到问题的本质，无论是直接用浅层比对，还是进行深层比对，我们最终是想z知道组件的 props (或 state) 数据有无发生改变。

在这样的条件下，immutable 数据应运而生。

### 什么是 immutable 数据？它有什么优势？

immutable 数据一种利用结构共享形成的持久化数据结构，一旦有部分被修改，那么将会返回一个全新的对象，并且原来相同的节点会直接共享。

具体点来说，immutable 对象数据内部采用是多叉树的结构，凡是有节点被改变，那么它和与它相关的所有上级节点都更新。

用一张动图来模拟一下这个过程：

![img](https://user-gold-cdn.xitu.io/2019/10/20/16de7a154c8b30b8?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

是吧！只更新了父节点，比直接比对所有的属性简直强太多，并且更新后返回了一个全新的引用，即使是浅比对也能感知到数据的改变。

因此，采用 immutable 既能够最大效率地更新数据结构，又能够和现有的 PureComponent (memo) 顺利对接，感知到状态的变化，是提高 React 渲染性能的极佳方案。

不过有一说一，immutable 也有一些被部分开发者吐槽的点，首先是 immutable 对象和 JS 对象要注意转换，不能混用，这个大家注意适当的时候调用 toJS 或者 fromJS 即可，问题并不大。

其次就是对于 immutable API 的学习成本的争议。我觉得这个问题见仁见智吧，我的观点是：如果你目前沉溺在已经运用得非常熟练的技术栈当中，不说深入学习新技术，连新的 API 都懒得学，我觉得对个人成长来说是一个不太好的征兆。

而且，项目中涉及的 api 并没有那么复杂，完全没必要从头到尾把 immutable.js 的 Api 全都记住。接下来我们就来悉数一下项目将要用到的 immutable 的功能。

### 项目中涉及的 immutable 方法

#### 1.fromJS

它的功能是将 JS 对象转换为 immutable 对象。

```text
import {fromJS} from 'immutable';
const immutableState = fromJS ({
    count: 0
});
```

大家以后会经常在 redux 的 reducer 文件中看到这个 api, 是 immutable 库当中导出的方法。

#### 2. toJS

和 fromJS 功能刚好相反，用来将 immutable 对象转换为 JS 对象。但是值得注意的是，这个方法并没有在 immutable 库中直接导出，而是需要让 immutable 对象调用。比如:

```text
const jsObj = immutableState.toJS ();
```

#### 3.get/getIn

用来获取 immutable 对象属性。通过与 JS 对象的对比来体会一下：

```text
//JS 对象
let jsObj = {a: 1};
let res = jsObj.a;
//immutable 对象
let immutableObj = fromJS (jsObj);
let res = immutableObj.get ('a');
//JS 对象
let jsObj = {a: {b: 1}};
let res = jsObj.a.b;
//immutable 对象
let immutableObj = fromJS (jsObj);
let res = immutableObj.getIn (['a', 'b']);// 注意传入的是一个数组
```

#### 4.set

用来对 immutable 对象的属性赋值。

```text
let immutableObj = fromJS ({a: 1});
immutableObj.set ('a', 2);
```

#### 5. merge

新数据与旧数据对比，旧数据中不存在的属性直接添加，旧数据中已存在的属性用新数据中的覆盖。

```text
let immutableObj = fromJS ({a: 1});
immutableObj.merge ({
    a: 2,
    b: 3
});// 修改了 a 属性，增加了 b 属性
```

好了，到这里项目中为什么要使用 immutable 数据以及基本的使用就给大家讲清楚了

# 初始化项目

项目开始前，有必要跟大家说一下仓库的分支规划。不同的小册章节内容对应不同仓库分支，方便大家针对性的学习:

```text
chapter1 和 chapter2 已经在第 4 节和第 5 节声明。
6-9 节 -> chapter3
10-12 节 -> chapter4
13-14 节 -> chapter5
15-19 节 -> chapter6
20-22 节 -> chapter7
23-28 节 -> chapter8
28-31 节 -> chapter9
32-34 节 -> chapter10
```

> 温馨提示: 本小节代码大家可以去参考 GitHub 仓库 chapter1 分支。

[仓库传送门(opens new window)](https://github.com/sanyuan0704/react-cloud-music/tree/chapter1)

## create-react-app 脚手架初始化

首先通过 create-react-app 这个脚手架工具生成项目的初始化化结构。

> 注意: 请保证你的 create-react-app 是最新版本，不然目录结构不会生成。

在命令行中输入以下命令:

```text
create-react-app cloud-music
```

完成后，根据提示：

```text
cd cloud-music
```

启动项目:

```text
npm start
```

## 项目目录说明

开始这个项目之前，我们需要对目录进行一下改造。如下 (主要针对 src 目录):

```text
├─api                   // 网路请求代码、工具类函数和相关配置
├─application           // 项目核心功能
├─assets                // 字体配置及全局样式
├─baseUI                // 基础 UI 轮子
├─components            // 可复用的 UI 组件
├─routes                // 路由配置文件
└─store                 //redux 相关文件
  App.js                // 根组件
  index.js              // 入口文件
  serviceWorker.js      // PWA 离线应用配置
  style.js              // 默认样式
```

脚手架生成的无用文件已经删除，大家注意也把相关的引入语句也删除。目前应该是整个应用的最终工程目录，以后的开发都会基于这个目录结构进行。

## 默认样式及字体图标准备

本项目的样式采用 styled-components 来进行开发，也就是利用 css in js 的方式，我为什么要这么做，有兴趣的同学可以阅读一下我之前在掘金写的文章 [styled-components: 前端组件拆分新思路 (opens new window)](https://juejin.im/post/6844903878580764686)。当然后面有人看了我的项目后给我提了这个库的一些缺点，但我依然坚持用它进行开发，因为它在工程化方面的优势依然非常明显，而且大部分缺点我们也可以有意识的去避开，这个具体在后面的章节里面再说吧。

其实 styled-components 的使用是相当简单的，不需要额外专门的学习，所以大家跟着我写一遍，熟悉一下就行了。

不知道你有没有发现一个问题，上面目录中默认样式文件是 style.js，而不是.css，没错，这就是使用了 styled-components 后的结果。

我们先安装这个库:

```text
npm install styled-components --save
```

在刚刚的 style.js 中，

```text
import { createGlobalStyle } from'styled-components';

export const GlobalStyle = createGlobalStyle`
	html, body, div, span, applet, object, iframe,
	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	a, abbr, acronym, address, big, cite, code,
	del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, strong, sub, sup, tt, var,
	b, u, i, center,
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, embed, 
	figure, figcaption, footer, header, hgroup, 
	menu, nav, output, ruby, section, summary,
	time, mark, audio, video {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
	}
	/* HTML5 display-role reset for older browsers */
	article, aside, details, figcaption, figure, 
	footer, header, hgroup, menu, nav, section {
		display: block;
	}
	body {
		line-height: 1;
	}
	html, body {
		background: #f2f3f4;;
	}
	ol, ul {
		list-style: none;
	}
	blockquote, q {
		quotes: none;
	}
	blockquote:before, blockquote:after,
	q:before, q:after {
		content: '';
		content: none;
	}
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}
	a {
		text-decoration: none;
		color: #fff;
	}
`
```

这就是 styled-components 创建全局样式并导出的代码。

这段代码导出到哪里去呢？导入到 App.js 中。

```text
//App.js 中添加这一句
import { GlobalStyle } from  './style';
```

我们继续来引入字体图标文件，这里的字体图标是采用的阿里图标库 [地址(opens new window)](https://www.iconfont.cn/)

选择好图标之后下载至本地 (本项目下载 unicode 模式)。这个操作不属于本项目的重点，也过于简单，就不在这浪费篇幅了。

在 assets 目录下新建一个名为 iconfont 的文件夹，将.css, .eot, .svg, .ttf, .woff 为后缀的文件放到这个文件夹中。 然后将这个 css 文件做一些手脚，需要改成 js 代码。

所以现在的 iconfont.css 需要改成 iconfont.js，这里做了一些省略，具体代码大家直接看 GitHub 仓库 chapter1 分支吧。

```text
import {createGlobalStyle} from'styled-components';

export const IconStyle = createGlobalStyle`
@font-face {font-family: "iconfont";
  src: url ('iconfont.eot?t=1565320061289'); /* IE9 */
  src: url ('iconfont.eot?t=1565320061289#iefix' ... 省略 base64 巨长字符) format ('embedded-opentype'), /* IE6-IE8 */
  url ('data:application/x-font-woff2;charset=utf-8) format ('woff2'),
  url ('iconfont.woff?t=1565320061289') format ('woff'),
  url ('iconfont.ttf?t=1565320061289') format ('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url ('iconfont.svg?t=1565320061289#iconfont') format ('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
...
`
```

接下来，咱们把字体引入 App.js 中。

```text
//App.js
import React from 'react';
import { IconStyle } from './assets/iconfont/iconfont';
import { GlobalStyle } from './style';

function App () {
  return (
    <div className="App">
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      <i className="iconfont">&#xe62b;</i>
    </div>
  );
}

export default App;
```

接下来大家打开页面可以看到一个小小的放大镜，背景变为浅灰色，字体图标和默认样式起到了效果。

到此为止，默认样式和字体图标就算一同引入到了项目中。大家可能对字体图标的用法有了一些了解，但是中间的 unicode 编码怎么来的呢？别担心，我专门在 iconfont 文件夹中放了 demo_index.html 文件，打开便能索引不同图标的 unicode 值啦。

# 搭建项目基本骨架

现在我们来进入项目基础搭建的环节。

> 本节代码对应 GitHub 分支: chapter2

[仓库传送门(opens new window)](https://github.com/sanyuan0704/react-cloud-music/tree/chapter2)

初始项目的搭建主要分为三个部分进行:

1. 路由的配置和应用部分
2. 公共组件的开发
3. redux 的 store 创建和引入

现在让我们开始吧。

## 一、路由配置

### 路由文件编写

要开发一个复杂应用的时候，首先要做的并不是上来就开始写具体功能，要想清楚整个应用的结构，从路由开始入手编写是一个比较好的方式，也建议大家拿到别人的项目的时候从路由开始着手，可以很好的整理我们的思路。

应用的骨架其实非常简单，顶部有固定的内容及 tab 栏，下面对应不同的功能组件。

首先安装依赖。

```text
npm install react-router react-router-dom react-router-config --save
```

现在我们在 routes 目录下新建 index.js 文件，利用 react-router-config 来对路由进行配置。

```text
//routes/index.js
import React from 'react';
import { Redirect } from "react-router-dom";
import Home from '../application/Home';
import Recommend from '../application/Recommend';
import Singers from '../application/Singers';
import Rank from '../application/Rank';

export default [
  {
    path: "/",
    component: Home,
    routes: [
      {
        path: "/",
        exact: true,
        render: () => (
          <Redirect to={"/recommend"}/>
        )
      },
      {
        path: "/recommend",
        component: Recommend
      },
      {
        path: "/singers",
        component: Singers
      },
      {
        path: "/rank",
        component: Rank
      }
    ]
  }
]
```

Home 组件对应公共组件，下面的推荐组件、歌手列表组件和排行榜组件为具体的功能组件。

为了让路由文件生效，必须在 App 根组件下面导入路由配置，现在在 App.js 中:

```text
import React from 'react';
import { GlobalStyle } from  './style';
import { renderRoutes } from 'react-router-config';//renderRoutes 读取路由配置转化为 Route 标签
import { IconStyle } from './assets/iconfont/iconfont';
import routes from './routes/index.js';
import { HashRouter } from 'react-router-dom';

function App () {
  return (
    <HashRouter>
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      { renderRoutes (routes) }
    </HashRouter>
  )
}

export default App;
```

### 新建组件文件

现在你的项目应该是无法启动的，因为这些组件你都没有定义和引入。

现在， 在 application 目录下，新建 Home 文件夹，然后新建 index.js 文件，

```text
//src/appliction/Home/index.js
import React from 'react';

function Home (props) {
  return (
    <div>Home</div>
  )
}

export default React.memo (Home);
```

然后类似的，创建 Recommend、Singers 和 Rank 组件。

启动项目，打开页面，你可以看到 "home" 已经显示到屏幕，但是这还不够，我们需要展示下面的功能组件，但是你在地址后面加上 /recommend，却并没有显示 Recommend 组件相应的内容，因为 renderRoutes 这个方法只渲染一层路由，之前 Home 处于数组第一层，后面的功能组件在第二层，当然不能正常渲染啦。其实要解决这个问题也非常简单，只需在 Home 中再次调用 renderRoutes 即可。

```text
//src/appliction/Home/index.js
import React from 'react';
import { renderRoutes } from "react-router-config";

function Home (props) {
  const { route } = props;

  return (
    <div>
      <div>Home</div>
      { renderRoutes (route.routes) }
    </div>
  )
}

export default React.memo (Home);
```

好，现在你可以访问 /recommend 路由，应该可以看到 Recommend 中的内容。同理，现在也可以正常访问其它的路由啦。

## 二、公共组件开发

路由折腾清楚后，我们来着手开发项目的第一个组件: Home 组件。

### 全局样式准备

现在要真正开始写样式了，为了统一风格，需要一些全局样式配置，在 assets 目录下新建 global-style.js, 内容如下:

```text
// 扩大可点击区域
const extendClick = () => {
  return `
    position: relative;
    &:before {
      content: '';
      position: absolute;
      top: -10px; bottom: -10px; left: -10px; right: -10px;
    };
  `
}
// 一行文字溢出部分用... 代替
const noWrap = () => {
  return `
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  `
}

export default {
  'theme-color': '#d44439',
  'theme-color-shadow': 'rgba (212, 68, 57, .5)',
  'font-color-light': '#f1f1f1',
  'font-color-desc': '#2E3030',
  'font-color-desc-v2': '#bba8a8',// 略淡
  'font-size-ss': '10px',
  'font-size-s': '12px',
  'font-size-m': '14px',
  'font-size-l': '16px',
  'font-size-ll': '18px',
  "border-color": '#e4e4e4',
  'background-color': '#f2f3f4',
  'background-color-shadow': 'rgba (0, 0, 0, 0.3)',
  'highlight-background-color': '#fff',
  extendClick,
  noWrap
}
```

### 顶部栏开发

首先，在 Home 目录下新建 style.js，创建 CSS 样式组件

```text
import styled from'styled-components';
import style from '../../assets/global-style';

export const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 10px;
  background: ${style ["theme-color"]};
  &>span {
    line-height: 40px;
    color: #f1f1f1;
    font-size: 20px;
    &.iconfont {
      font-size: 25px;
    }
  }
`
```

很简单的布局和样式，就不过多解释了。接下来在 Home 组件应用这些样式，

```text
//src/appliction/Home/index.js
import React from 'react';
import { renderRoutes } from "react-router-config";
import { Top } from './style';

function Home (props) {
  const { route } = props;

  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">WebApp</span>
        <span className="iconfont search">&#xe62b;</span>
      </Top>
      { renderRoutes (route.routes) }
    </div>
  )
}

export default React.memo (Home);
```

接着来编写上面的 tab 栏，先定义样式:

```text
export const Tab = styled.div`
  height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: ${style ["theme-color"]};
  a {
    flex: 1;
    padding: 2px 0;
    font-size: 14px;
    color: #e4e4e4;
    &.selected {
      span {
        padding: 3px 0;
        font-weight: 700;
        color: #f1f1f1;
        border-bottom: 2px solid #f1f1f1;
      }
    }
  }
`
export const TabItem = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
```

在 Home 组件中使用:

```text
import React from 'react';
import { renderRoutes } from "react-router-config";
import {
  Top,
  Tab,
  TabItem,
} from './style';
import { NavLink } from 'react-router-dom';// 利用 NavLink 组件进行路由跳转

function Home (props){
  const { route } = props;

  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">Web App</span>
        <span className="iconfont search">&#xe62b;</span>
      </Top>
      <Tab>
        <NavLink to="/recommend" activeClassName="selected"><TabItem><span > 推荐 </span></TabItem></NavLink>
        <NavLink to="/singers" activeClassName="selected"><TabItem><span > 歌手 </span></TabItem></NavLink>
        <NavLink to="/rank" activeClassName="selected"><TabItem><span > 排行榜 </span></TabItem></NavLink>
      </Tab>
      { renderRoutes (route.routes) }
    </div>
  );
}
 
export default React.memo (Home);
```

打开页面，现在一个像样的 WebApp 头部就出来了，并且点击不同的 tab 会显示不同的功能组件。

![image-20210215180607313](https://img-repo.poetries.top/images/image-20210215180607313.png)

## 三、redux 准备

本项目开发的一大核心理念就是用 Redux 这一成熟的状态管理库实现单一数据源。因此，在后面的具体功能开发之前，有必要准备一些关于 Redux 的工作。

### 安装相应依赖

```text
npm install redux redux-thunk redux-immutable react-redux immutable --save
```

其中 redux-immutable 大家可能比较陌生，因为项目中需要用到 immutable.js 中的数据结构，所以合并不同模块 reducer 的时候需要用到 redux-immutable 中的方法。

### 创建 store

在 store 文件夹下面新建 index.js 和 reducer.js 文件:

```text
//reducer.js
import { combineReducers } from 'redux-immutable';

export default combineReducers ({
// 之后开发具体功能模块的时候添加 reducer
});
//index.js
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore (reducer, composeEnhancers (
  applyMiddleware (thunk)
));

export default store;
```

### 项目中注入 store

现在 App.js 中代码如下:

```text
import React from 'react'
import { Provider } from 'react-redux'
import { GlobalStyle } from  './style'
import { renderRoutes } from 'react-router-config'
import { IconStyle } from './assets/iconfont/iconfont'
import store from './store/index'
import routes from './routes/index.js'
import { HashRouter } from 'react-router-dom';

function App () {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        { renderRoutes (routes) }
      </HashRouter>
    </Provider>
  )
}

export default App;
```

现在功能依旧能用，但是打开控制台会有这样一段报错:

![img](https://img-repo.poetries.top/images/16ddde922f4d392b.jpeg)

> 因为现在没有开发出具体的 reducer 函数，没关系，随着之后的开发，这个错误会自动消失。

# 推荐模块1 打造炫酷轮播及列表

> 本节代码对应 GitHub 分支: chapter3

[仓库传送门(opens new window)](https://github.com/sanyuan0704/react-cloud-music/tree/chapter3)

## 一、轮播组件开发

现在来开发 recommend 组件，首先进入到 src 目录下 application/Recommend/index.js 中:

```text
import React from 'react';
import Slider from '../../components/slider';

function Recommend () {

  //mock 数据
  const bannerList = [1,2,3,4].map (item => {
    return { imageUrl: "https://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg" }
  });

  return (
    <div>
      <Slider bannerList={bannerList}></Slider>
    </div>
  )
}

export default React.memo (Recommend);
```

现在就可以着手编写 slider 组件的具体内容了。首先安装一个插件:

```text
npm install swiper --save
```

接下来，在 slider/index.js 中：

```text
//components/slider/index.js
import React, { useEffect, useState } from 'react';
import { SliderContainer } from './style';
import "swiper/css/swiper.css";
import Swiper from "swiper";

function Slider (props) {
  const [sliderSwiper, setSliderSwiper] = useState (null);
  const { bannerList } = props;

  useEffect (() => {
    if (bannerList.length && !sliderSwiper){
        let newSliderSwiper = new Swiper(".slider-container", {
          loop: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          pagination: {el:'.swiper-pagination'},
        });
        setSliderSwiper(newSliderSwiper);
    }
  }, [bannerList.length, sliderSwiper]);
  
  return (
    <SliderContainer>
      <div className="slider-container">
        <div className="swiper-wrapper">
          {
            bannerList.map (slider => {
              return (
                <div className="swiper-slide" key={slider.imageUrl}>
                  <div className="slider-nav">
                    <img src={slider.imageUrl} width="100%" height="100%" alt="推荐" />
                  </div>
                </div>
              );
            })
          }
        </div>
        <div className="swiper-pagination"></div>
      </div> 
    </SliderContainer>
  );
}

export default React.memo (Slider);
```

对应的 style.js 文件:

```text
import styled from'styled-components';
import style from '../../assets/global-style';

export const SliderContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: auto;
  background: white;
  .before {
    position: absolute;
    top: 0;
    height: 60%;
    width: 100%;
    background: ${style ["theme-color"]};
  }
  .slider-container {
    position: relative;
    width: 98%;
    height: 160px;
    overflow: hidden;
    margin: auto;
    border-radius: 6px;
    .slider-nav {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
    }
    .swiper-pagination-bullet-active {
      background: ${style ["theme-color"]};
    }
  }
`
```

现在打开页面可以看到这个效果:

![image-20210215181330812](https://img-repo.poetries.top/images/image-20210215181330812.png)

轮播的功能已经具备，但是这个效果并不是我们想要的，我们希望它是两边并不是完全空白，而是有一部分红色做衬托，如图:

![image-20210215182012642](https://img-repo.poetries.top/images/image-20210215182012642.png)

这个效果如何来实现？如果说单纯去增加 Home 组件的高度，那么其他的组件并不需要下面的这些红色背景，显然不合适，我们只能在 slider 组件上做一些手脚。 我们在 SliderContainer 标签内新建一个 div:

```text
<div className="before"></div>
```

样式已经写在上面的 style.js 中了，大家可以翻到上面看看，还是比较 tricky 的一个操作，相当于另外做了一层遮罩，我们之后开发歌手详情页同样会用到这个方法。

## 二、推荐列表开发

首先在 recommend 组件中:

```text
import React from 'react';
import Slider from '../../components/slider';
import RecommendList from '../../components/list';

function Recommend () {

  //mock 数据
  const bannerList = [1,2,3,4].map (item => {
    return { imageUrl: "https://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg" }
  });

  const recommendList = [1,2,3,4,5,6,7,8,9,10].map (item => {
    return {
      id: 1,
      picUrl: "https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg",
      playCount: 17171122,
      name: "朴树、许巍、李健、郑钧、老狼、赵雷"
    }
  });

  return (
    <div>
      <Slider bannerList={bannerList}></Slider>
      <RecommendList recommendList={recommendList}></RecommendList> 
    </div>
  )
}

export default React.memo (Recommend);
```

现在来开发 list 这个组件，首先展示 DOM 结构，

```text
import React from 'react';
import { 
  ListWrapper,
  ListItem,
  List
} from './style';

function RecommendList (props) {
  return (
    <ListWrapper>
      <h1 className="title"> 推荐歌单 </h1>
      <List>
        {
          props.recommendList.map ((item, index) => {
            return (
              <ListItem key={item.id + index}>
                <div className="img_wrapper">
                  <div className="decorate"></div>
                    {/* 加此参数可以减小请求的图片资源大小 */}
                    <img src={item.picUrl + "?param=300x300"} width="100%" height="100%" alt="music"/>
                  <div className="play_count">
                    <i className="iconfont play">&#xe885;</i>
                    <span className="count">{getCount (item.playCount)}</span>
                  </div>
                </div>
                <div className="desc">{item.name}</div>
              </ListItem>
            )
          })
        }
      </List>
    </ListWrapper>
  );
  }
 
export default React.memo (RecommendList);
```

这里需要提醒大家一下，getCount 是一个工具类函数，与我们的业务功能关系不大，我们把它放到专门的目录下去编写：

```text
// 大家按照这个目录层级新建文件
//src/api/utils.js
export const getCount = (count) => {
  if (count < 0) return;
  if (count < 10000) {
    return count;
  } else if (Math.floor (count / 10000) < 10000) {
    return Math.floor (count/1000)/10 + "万";
  } else  {
    return Math.floor (count / 10000000)/ 10 + "亿";
  }
}
```

刚才的 list/index.js 中并没有引入这个函数，现在需要加一行引入代码:

```text
import { getCount } from "../../api/utils";
```

样式部分的 js 代码如下:

```text
import styled from'styled-components';
import style from '../../assets/global-style';

export const ListWrapper = styled.div`
  max-width: 100%;
  .title {
    font-weight: 700;
    padding-left: 6px;
    font-size: 14px;
    line-height: 60px;
  }
`;
export const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const ListItem = styled.div`
  position: relative;
  width: 32%;

  .img_wrapper {
    .decorate {
      position: absolute;
      top: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient (hsla (0,0%,43%,.4),hsla (0,0%,100%,0));
    }
    position: relative;
    height: 0;
    padding-bottom: 100%;
    .play_count {
      position: absolute;
      right: 2px;
      top: 2px;
      font-size: ${style ["font-size-s"]};
      line-height: 15px;
      color: ${style ["font-color-light"]};
      .play {
        vertical-align: top;
      }
    }
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
  }
  .desc {
      overflow: hidden;
      margin-top: 2px;
      padding: 0 2px;
      height: 50px;
      text-align: left;
      font-size: ${style ["font-size-s"]};
      line-height: 1.4;
      color: ${style ["font-color-desc"]};
    }
`;
```

值得关注的是：

```text
<div className="decorate"></div>
```

上面 style.js 中对应样式:

```text
.decorate {
  position: absolute;
  top: 0;
  width: 100%;
  height: 35px;
  border-radius: 3px;
  background: linear-gradient(hsla(0,0%,43%,.4),hsla(0,0%,100%,0));
}
```

这个标签的样式，它的作用就是给图片上的图标和文字提供一个遮罩，因为在字体颜色是白色，在面对白色图片背景的时候，文字会看不清或者看不到，因此提供一个阴影来衬托出文字，这个细节很容易被忽略，希望大家也能注意一下。

# 推荐模块2 打造巨好用的项目灵魂组件Scroll组件

> 本节代码对应 GitHub 分支: chapter3

[仓库传送门(opens new window)](https://github.com/sanyuan0704/react-cloud-music/tree/chapter3)

本项目最大的亮点之一就是采用 better-scroll 打造了移动端滑动基础组件，不仅仅可以用在本项目，也可以直接移植到其他所有的移动端 React 项目。现在，我们来一起封装这个实用且强大的组件。

## 分步拆解 scroll 组件

```text
// 安装 better-scroll
npm install better-scroll@next --save
```

我们依然采用函数式组件的形式进行开发，不过作为一个通用组件，scroll 组件在业务中会被经常取到原生 DOM 对象，而函数式组件天生不具备被上层组件直接调用 ref 的条件，因此需要用 React 当中一些特殊的方式来处理，即使用 forwardRef 进行包裹。

```text
const Scroll = forwardRef ((props, ref) => {
  // 编写组件内容
})
```

首先梳理一下这个组件需要接受哪些参数:

```text
Scroll.propTypes = {
  direction: PropTypes.oneOf (['vertical', 'horizental']),// 滚动的方向
  click: true,// 是否支持点击
  refresh: PropTypes.bool,// 是否刷新
  onScroll: PropTypes.func,// 滑动触发的回调函数
  pullUp: PropTypes.func,// 上拉加载逻辑
  pullDown: PropTypes.func,// 下拉加载逻辑
  pullUpLoading: PropTypes.bool,// 是否显示上拉 loading 动画
  pullDownLoading: PropTypes.bool,// 是否显示下拉 loading 动画
  bounceTop: PropTypes.bool,// 是否支持向上吸顶
  bounceBottom: PropTypes.bool// 是否支持向下吸底
};
```

目前归纳出了这些可能的参数，也正是后面的开发中所需要的，给他们赋默认值:

```text
Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll:null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true
};
```

现在来写 scroll 组件的核心逻辑代码，首先声明如下 hooks 变量:

```text
//better-scroll 实例对象
const [bScroll, setBScroll] = useState ();
//current 指向初始化 bs 实例需要的 DOM 元素 
const scrollContaninerRef = useRef ();
```

从外面接受 props，解构赋值拿到这些参数:

```text
const { direction, click, refresh, pullUpLoading, pullDownLoading, bounceTop, bounceBottom } = props;
const { pullUp, pullDown, onScroll } = props;
```

接下来创建 better-scroll，

```text
useEffect (() => {
  const scroll = new BScroll (scrollContaninerRef.current, {
    scrollX: direction === "horizental",
    scrollY: direction === "vertical",
    probeType: 3,
    click: click,
    bounce:{
      top: bounceTop,
      bottom: bounceBottom
    }
  });
  setBScroll (scroll);
  return () => {
    setBScroll (null);
  }
}, []);
```

每次重新渲染都要刷新实例，防止无法滑动:

```text
useEffect (() => {
  if (refresh && bScroll){
    bScroll.refresh ();
  }
});
```

给实例绑定 scroll 事件，

```text
useEffect (() => {
  if (!bScroll || !onScroll) return;
  bScroll.on ('scroll', (scroll) => {
    onScroll (scroll);
  })
  return () => {
    bScroll.off ('scroll');
  }
}, [onScroll, bScroll]);
```

进行上拉到底的判断，调用上拉刷新的函数

```text
useEffect (() => {
  if (!bScroll || !pullUp) return;
  bScroll.on ('scrollEnd', () => {
    // 判断是否滑动到了底部
    if (bScroll.y <= bScroll.maxScrollY + 100){
      pullUp ();
    }
  });
  return () => {
    bScroll.off ('scrollEnd');
  }
}, [pullUp, bScroll]);
```

进行下拉的判断，调用下拉刷新的函数

```text
useEffect (() => {
  if (!bScroll || !pullDown) return;
  bScroll.on ('touchEnd', (pos) => {
    // 判断用户的下拉动作
    if (pos.y > 50) {
      pullDown ();
    }
  });
  return () => {
    bScroll.off ('touchEnd');
  }
}, [pullDown, bScroll]);
```

完成了滑动事件、上拉下拉事件的判断，现在需要给外界暴露组件方法，如:

```text
// 上层组件代码
const scrollRef = useRef ();
...
<Scroll ref={scrollRef}></Scroll>  
```

想要通过这种调用方法的方式刷新 scroll 组件：

```text
scrollRef.current.refresh ();
```

这应该怎么办呢？ React Hooks 中的 useImperativeHandle 已经给了我们解决方案，我们这样做就好了:

```text
// 一般和 forwardRef 一起使用，ref 已经在 forWardRef 中默认传入
useImperativeHandle (ref, () => ({
  // 给外界暴露 refresh 方法
  refresh () {
    if (bScroll) {
      bScroll.refresh ();
      bScroll.scrollTo (0, 0);
    }
  },
  // 给外界暴露 getBScroll 方法，提供 bs 实例
  getBScroll () {
    if (bScroll) {
      return bScroll;
    }
  }
}));
```

剩下的是 UI 的渲染工作:

```text
return (
  <ScrollContainer ref={scrollContaninerRef}>
    {props.children}
  </ScrollContainer>
);
```

同时贴出样式部分的 js 代码:

```text
const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`
```

加载动画部分涉及到 loading 组件我们放到下一章拆解：）

## 综合代码

这里给出综合后的代码:

```text
import React, { forwardRef, useState,useEffect, useRef, useImperativeHandle } from "react"
import PropTypes from "prop-types"
import BScroll from "better-scroll"
import styled from'styled-components';

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`
const Scroll = forwardRef ((props, ref) => {
  const [bScroll, setBScroll] = useState ();

  const scrollContaninerRef = useRef ();

  const { direction, click, refresh,  bounceTop, bounceBottom } = props;

  const { pullUp, pullDown, onScroll } = props;

  useEffect (() => {
    const scroll = new BScroll (scrollContaninerRef.current, {
      scrollX: direction === "horizental",
      scrollY: direction === "vertical",
      probeType: 3,
      click: click,
      bounce:{
        top: bounceTop,
        bottom: bounceBottom
      }
    });
    setBScroll (scroll);
    return () => {
      setBScroll (null);
    }
    //eslint-disable-next-line
  }, []);

  useEffect (() => {
    if (!bScroll || !onScroll) return;
    bScroll.on ('scroll', (scroll) => {
      onScroll (scroll);
    })
    return () => {
      bScroll.off ('scroll');
    }
  }, [onScroll, bScroll]);

  useEffect (() => {
    if (!bScroll || !pullUp) return;
    bScroll.on ('scrollEnd', () => {
      // 判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100){
        pullUp ();
      }
    });
    return () => {
      bScroll.off ('scrollEnd');
    }
  }, [pullUp, bScroll]);

  useEffect (() => {
    if (!bScroll || !pullDown) return;
    bScroll.on ('touchEnd', (pos) => {
      // 判断用户的下拉动作
      if (pos.y > 50) {
        pullDown ();
      }
    });
    return () => {
      bScroll.off ('touchEnd');
    }
  }, [pullDown, bScroll]);


  useEffect (() => {
    if (refresh && bScroll){
      bScroll.refresh ();
    }
  });

  useImperativeHandle (ref, () => ({
    refresh () {
      if (bScroll) {
        bScroll.refresh ();
        bScroll.scrollTo (0, 0);
      }
    },
    getBScroll () {
      if (bScroll) {
        return bScroll;
      }
    }
  }));


  return (
    <ScrollContainer ref={scrollContaninerRef}>
      {props.children}
    </ScrollContainer>
  );
})

Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll:null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true
};

Scroll.propTypes = {
  direction: PropTypes.oneOf (['vertical', 'horizental']),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool,// 是否支持向上吸顶
  bounceBottom: PropTypes.bool// 是否支持向上吸顶
};

export default Scroll;
```

## 在项目中应用

scroll 组件已经初步实现。但是，这还不够。还有一些细节，比如防抖，loading 控制等等，后期会一步一步完善。更重要的是，我们还需要将它运用到项目中，进入到 Recommend 目录下的 index.js，函数返回的 JSX 代码变化如下：

```text
<Content>
  <Scroll className="list">
    <div>
      <Slider bannerList={bannerList}></Slider>
      <RecommendList recommendList={recommendList}></RecommendList>
    </div>
  </Scroll>
</Content> 
```

可能你会不解，Content 样式组件是个什么鬼？在这里我要强调一下，better-scroll 的原理并不复杂，就是在容器元素高度固定，当子元素高度超过容器元素高度时，通过 transfrom 动画产生滑动效果，因此它的使用原则就是外部容器必须是固定高度，不然没法滚动。而 Content 就是这个外部容器。

我们在对应 style.js 中增加以下代码:

```text
import styled from'styled-components';

export const Content = styled.div`
  position: fixed;
  top: 90px;
  bottom: 0;
  width: 100%;
`
```

现在打开页面，你就能体会到下拉吸顶、上拉吸底的感觉了。不过还是有一个问题，当你下拉的时候，中间会有一段空白，感觉比较突兀，没错，这就是默认的背景颜色。那么怎么来解决这个问题呢？

还是从遮罩入手吧，还记得那个.before 的 div 吗？

```text
.before {
  position: absolute;
  top: -300px;
  height: 400px;
  width: 100%;
  background: ${style ["theme-color"]};
}
```

如此修改即可，这样下拉间隙就变成了主题色了。

# 推荐模块3 从零开发数据层

> 本节代码对应 GitHub 分支: chapter3

[仓库传送门(opens new window)](https://github.com/sanyuan0704/react-cloud-music/tree/chapter3)

UI 层算是基本搞定了，不过之前都是用的 mock 数据，现在需要我们做数据层的开发了，一方面包括 Ajax 请求的处理，另一方面是 redux 的相关操作。

## axios 请求封装

首先安装:

```text
npm install axios --save
```

大家先去 [GitHub 网易云音乐接口 (opens new window)](https://github.com/Binaryify/NeteaseCloudMusicApi/tree/master)clone 这个 nodejs 项目然后运行在其他端口上，保证不和前端服务端口冲突。(在[本项目 (opens new window)](https://github.com/sanyuan0704/react-cloud-music)仓库的readme文档也有详细说明)

现在在 src/api 目录下新建 config.js 文件，里面编写 axios 的配置:

```text
import axios from 'axios';

export const baseUrl = 'https://xxx自己填';

//axios 的实例及拦截器配置
const axiosInstance = axios.create ({
  baseURL: baseUrl
});

axiosInstance.interceptors.response.use (
  res => res.data,
  err => {
    console.log (err, "网络错误");
  }
);

export {
  axiosInstance
};
```

然后在同一个目录下新建 request.js 用来封装不同的网络请求，内容如下:

```text
import { axiosInstance } from "./config";

export const getBannerRequest = () => {
  return axiosInstance.get ('/banner');
}

export const getRecommendListRequest = () => {
  return axiosInstance.get ('/personalized');
}
```

即需要的两个接口，到时候直接调这些函数即可。

## redux 层开发

在 Recommend 目录下，新建 store 文件夹，然后新建以下文件

```text
actionCreators.js// 放不同 action 的地方
constants.js      // 常量集合，存放不同 action 的 type 值
index.js          // 用来导出 reducer，action
reducer.js        // 存放 initialState 和 reducer 函数
```

### 1. 声明初始化 state

初始化 state 在 reducer 中进行

```text
//reducer.js
import * as actionTypes from './constants';
import { fromJS } from 'immutable';// 这里用到 fromJS 把 JS 数据结构转化成 immutable 数据结构

const defaultState = fromJS ({
  bannerList: [],
  recommendList: [],
});
```

### 2. 定义 constants

```text
//constants.js
export const CHANGE_BANNER = 'recommend/CHANGE_BANNER';

export const CHANGE_RECOMMEND_LIST = 'recommend/RECOMMEND_LIST';
```

### 3. 定义 reducer 函数

在 reducer.js 文件中加入以下处理逻辑，由于存放的是 immutable 数据结构，所以必须用 set 方法来设置新状态，同时取状态用 get 方法。

```text
export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_BANNER:
      return state.set ('bannerList', action.data);
    case actionTypes.CHANGE_RECOMMEND_LIST:
      return state.set ('recommendList', action.data);
    default:
      return state;
  }
}
```

### 4. 编写具体的 action

```text
//actionCreators.js
import * as actionTypes from './constants';
import { fromJS } from 'immutable';// 将 JS 对象转换成 immutable 对象
import { getBannerRequest, getRecommendListRequest } from '../../../api/request';

export const changeBannerList = (data) => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS (data)
});

export const changeRecommendList = (data) => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data: fromJS (data)
});

export const getBannerList = () => {
  return (dispatch) => {
    getBannerRequest ().then (data => {
      dispatch (changeBannerList (data.banners));
    }).catch (() => {
      console.log ("轮播图数据传输错误");
    }) 
  }
};

export const getRecommendList = () => {
  return (dispatch) => {
    getRecommendListRequest ().then (data => {
      dispatch (changeRecommendList (data.result));
    }).catch (() => {
      console.log ("推荐歌单数据传输错误");
    });
  }
};
```

### 5. 将相关变量导出

```text
//index.js
import reducer from './reducer'
import * as actionCreators from './actionCreators'

export { reducer, actionCreators };
```

如果以后要加入新状态，或者创建新的 reducer 模块，直接走这些步骤即可。

## 组件连接 Redux

首先，需要将 recommend 下的 reducer 注册到全局 store，在 store/reducer.js 中，内容如下:

```text
import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../application/Recommend/store/index';

export default combineReducers ({
  recommend: recommendReducer,
});
```

注册完成！

现在在 Recommend/index.js 中，准备连接 Redux。组件代码更新如下:

```text
import React, { useEffect } from 'react';
import Slider from '../../components/slider/';
import { connect } from "react-redux";
import * as actionTypes from './store/actionCreators';
import RecommendList from '../../components/list/';
import Scroll from '../../baseUI/scroll/index';
import { Content } from './style';

function Recommend (props){
  const { bannerList, recommendList } = props;

  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

  useEffect (() => {
    getBannerDataDispatch ();
    getRecommendListDataDispatch ();
    //eslint-disable-next-line
  }, []);

  const bannerListJS = bannerList ? bannerList.toJS () : [];
  const recommendListJS = recommendList ? recommendList.toJS () :[];

  return (
    <Content>
      <Scroll>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
    </Content> 
  );
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
  // 不要在这里将数据 toJS
  // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
  bannerList: state.getIn (['recommend', 'bannerList']),
  recommendList: state.getIn (['recommend', 'recommendList']),
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch () {
      dispatch (actionTypes.getBannerList ());
    },
    getRecommendListDataDispatch () {
      dispatch (actionTypes.getRecommendList ());
    },
  }
};

// 将 ui 组件包装成容器组件
export default connect (mapStateToProps, mapDispatchToProps)(React.memo (Recommend));
```

到这里，一个精美的推荐页面就开发完成了。

![img](https://img-repo.poetries.top/images/16dddf0a5ad3e1ef.jpeg)

# 性能及体验优化

> 本节代码对应 GitHub 分支: chapter3

[仓库传送门(opens new window)](https://github.com/sanyuan0704/react-cloud-music/tree/chapter3)

## 图片懒加载

在大量图片加载的情况下，会造成页面空白甚至卡顿，然而我们的视口就这么大，因此只需要让视口内的图片显示即可，同时图片未显示的时候给它一个默认的 src，让一张非常精简的图片占位。这就是图片懒加载的原理。当然，在本项目中，我们采取一个成熟的方案 react-lazyload 库，易上手，效果不错。

```text
npm install react-lazyload --save
//components/list.js
// 引入
import LazyLoad from "react-lazyload";

//img 标签外部包裹一层 LazyLoad
<LazyLoad placeholder={<img width="100%" height="100%" src={require ('./music.png')} alt="music"/>}>
  <img src={item.picUrl + "?param=300x300"} width="100%" height="100%" alt="music"/>
</LazyLoad>
```

至于默认的占位图片，大家可以去相应分支去拿。

现在我们做到了视口内的图片显示真实资源，视口外则显示占位图片，那么当我们滑动的时候，如何让下面相应的图片显示呢？

其实也相当简单，在 Recommend/index.js 中:

```text
// 引入 forceCheck 方法
import { forceCheck } from 'react-lazyload';

//scroll 组件中应用这个方法
<Scroll className="list" onScroll={forceCheck}>
...
```

这样随着页面滑动，下面的图片会依次显示，没有任何问题。

## 进场 loading 效果

Ajax 请求往往需要一定的时间，在这个时间内，页面会处于没有数据的状态，也就是空白状态，但是用户点击来的时候看见一片空白的时候心里是非常焦灼的，尤其是 Ajax 的请求时间长达几秒的时候，而 loading 效果便能减缓这种焦急的情绪，并且如果 loading 动画做的漂亮，还能够让人赏心悦目，让用户对 App 产生好感。

loading 的重要性不言而喻。因此，我也是这花费了不少力气，折腾出了几个版本的 loading 效果。这里先来写第一版。

主要是利用了 CSS3 的 animation-delay 特性，让两个圆交错变化，产生一个涟漪的效果。

```text
import React from 'react';
import styled, { keyframes } from'styled-components';
import style from '../../assets/global-style';

const loading = keyframes`
  0%, 100% {
    transform: scale(0.0);
  }
  50% {
    transform: scale(1.0);
  }
`
const LoadingWrapper = styled.div`
  >div {
    position: fixed;
    z-index: 1000;
    left: 0; 
    right: 0;  
    top: 0;
    bottom: 0;
    margin: auto;
    width: 60px;
    height: 60px;
    opacity: 0.6;
    border-radius: 50%;
    background-color: ${style ["theme-color"]};
    animation: ${loading} 1.4s infinite ease-in;
  }
  >div:nth-child (2) {
    animation-delay: -0.7s;
  }
`

function Loading ()  {
  return (
    <LoadingWrapper>
      <div></div>
      <div></div>
    </LoadingWrapper>
  );
}
 
export default React.memo (Loading);
```

现在在 Recommend 组件中引入

```text
import Loading from '../../baseUI/loading/index';

// 在返回的 JSX 代码中
<Content>
  ...
  <Loading></Loading>
<Content>
```

现在你可以看到屏幕中间的 loading。接下来添加 Loading 的控制逻辑。

由于数据是异步获取，异步逻辑全在 redux-thunk 中执行，且 loading 和数据之间是一个联动的关系，因此 loading 的状态应放在 redux 管理。

1. 首先，在 Recommend/store 下的 reducer.js 中:

```text
//reducer.js
const defaultState = fromJS ({
  ...
  enterLoading: true
});
```

1. 添加 action 的 type 值常量

```text
//constants.js
...
export const CHANGE_ENTER_LOADING = 'recommend/CHANGE_ENTER_LOADING';
```

1. 添加 reducer 的逻辑:

```text
export default (state = defaultState, action) => {
  switch (action.type) {
    ...
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set ('enterLoading', action.data);
    default:
      return state;
  }
}
```

1. 然后编写 action：

```text
//actionCreators.js
...
export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
});
// 另外在获取推荐歌单后，应把 loading 状态改为 false
export const getRecommendList = () => {
  return (dispatch) => {
    getRecommendListRequest ().then (data => {
      dispatch (changeRecommendList (data.result));
      dispatch (changeEnterLoading (false));// 改变 loading
    }).catch (() => {
      console.log ("推荐歌单数据传输错误");
    });
  }
};
```

接下来在组件中应用这个 enterLoading:

```text
//recommend/index.js
const mapStateToProps = (state) => ({
  ...
  enterLoading: state.getIn (['recommend', 'enterLoading'])
});
// 返回的 JSX 代码中应用它
<Content>
  ...
  { enterLoading ? <Loading></Loading> : null }
<Content>
```

这样 Loading 效果就正常显示啦！

## Redux 数据缓存

问题：其实还有一个细节需要我们来优化，就是你现在切换到歌手页面，然后切回到推荐页，你在浏览器的 Network 中会看到又发了两次网络请求，而这两次请求是完全没有必要的，纯属浪费性能。

![image-20210215183137666](https://img-repo.poetries.top/images/image-20210215183137666.png)

那如何来优化呢？根据我们这个项目的特点，利用 Redux 的数据来进行页面缓存成本最低，是不二之选。

其实操作起来也是非常简单的，只需要做一些小小的改动：

```text
//Recommend/index.js
useEffect (() => {
  // 如果页面有数据，则不发请求
  //immutable 数据结构中长度属性 size
  if (!bannerList.size){
    getBannerDataDispatch ();
  }
  if (!recommendList.size){
    getRecommendListDataDispatch ();
  }
}, []);
```

这下，我切换到歌手页，再切回来，果然就不会多发请求啦！

恭喜你，现在已经完成了推荐模块的内容，是不是相当有成就感呢？后面还有更多有挑战的事情等着你呢，加油！

# 歌手列表1 横向分类列表开发,搞定诸多类似场景

> 本节代码对应 GitHub 分支: chapter4

[仓库传送门(opens new window)](https://github.com/sanyuan0704/react-cloud-music/tree/chapter4)

本节最终效果如下所示:

![img](https://img-repo.poetries.top/images/16dddf229c87866a.gif)

## 接受参数

在 baseUI 文件夹下新建 horizen-item 目录，接着新建 index.js。

首先分析这个基础组件接受哪些参数，

```text
import React, { useState, useRef, useEffect, memo } from 'react';
import styled from'styled-components';
import Scroll from '../scroll/index'
import { PropTypes } from 'prop-types';
import style from '../../assets/global-style';

function Horizen (props) {
  return (
    // 暂时省略
  )
}

// 首先考虑接受的参数
//list 为接受的列表数据
//oldVal 为当前的 item 值
//title 为列表左边的标题
//handleClick 为点击不同的 item 执行的方法
Horizen.defaultProps = {
  list: [],
  oldVal: '',
  title: '',
  handleClick: null
};

Horizen.propTypes = {
  list: PropTypes.array,
  oldVal: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func
};
export default memo (Horizen);
```

现在，来把 props 对象进行解构赋值，

```text
const { list, oldVal, title } = props;
const { handleClick } = props;
```

返回的 JSX 代码为:

```text
return ( 
  <Scroll direction={"horizental"}>
    <div>
      <List>
        <span>{title}</span>
        {
          list.map ((item) => {
            return (
              <ListItem 
                key={item.key}
                className={`${oldVal === item.key ? 'selected': ''}`} 
                onClick={() => handleClick (item.key)}>
                  {item.name}
              </ListItem>
            )
          })
        }
      </List>
    </div>
  </Scroll>
);
```

样式代码:

```text
// 由于基础组件样式较少，直接写在 index.js 中
const List = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;
  >span:first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${style ["font-size-m"]};
    vertical-align: middle;
  }
`
const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${style ["font-size-m"]};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected {
    color: ${style ["theme-color"]};
    border: 1px solid ${style ["theme-color"]};
    opacity: 0.8;
  }
`
```

现在大家还看不到效果，可能会有些慌张，没关系，我们现在就把这个组件进入到页面中试一试。

## 载入页面

进入到 application/Singers/index.js 中，代码如下:

```text
import React from 'react';
import Horizen from '../../baseUI/horizen-item';
import { categoryTypes } from '../../api/config';

function Singers () {
  return (
    <Horizen list={categoryTypes} title={"分类 (默认热门):"}></Horizen>
  )
}

export default React.memo (Singers);
```

分类数据在 api/config.js 中，但现在还没定义，现在在这个文件中添加以下代码:

```text
// 歌手种类
export const categoryTypes = [{
  name: "华语男",
  key: "1001"
},
{
  name: "华语女",
  key: "1002"
},
{
  name: "华语组合",
  key: "1003"
},
{
  name: "欧美男",
  key: "2001"
},
{
  name: "欧美女",
  key: "2002"
},
{
  name: "欧美组合",
  key: "2003"
},
{
  name: "日本男",
  key: "6001"
},
{
  name: "日本女",
  key: "6002"
},
{
  name: "日本组合",
  key: "6003"
},
{
  name: "韩国男",
  key: "7001"
},
{
  name: "韩国女",
  key: "7002"
},
{
  name: "韩国组合",
  key: "7003"
},
{
  name: "其他男歌手",
  key: "4001"
},
{
  name: "其他女歌手",
  key: "4002"
},
{
  name: "其他组合",
  key: "4003"
},
];

// 歌手首字母
export const alphaTypes = [{
    key: "A",
    name: "A"
  },
  {
    key: "B",
    name: "B"
  },
  {
    key: "C",
    name: "C"
  },
  {
    key: "D",
    name: "D"
  },
  {
    key: "E",
    name: "E"
  },
  {
    key: "F",
    name: "F"
  },
  {
    key: "G",
    name: "G"
  },
  {
    key: "H",
    name: "H"
  },
  {
    key: "I",
    name: "I"
  },
  {
    key: "J",
    name: "J"
  },
  {
    key: "K",
    name: "K"
  },
  {
    key: "L",
    name: "L"
  },
  {
    key: "M",
    name: "M"
  },
  {
    key: "N",
    name: "N"
  },
  {
    key: "O",
    name: "O"
  },
  {
    key: "P",
    name: "P"
  },
  {
    key: "Q",
    name: "Q"
  },
  {
    key: "R",
    name: "R"
  },
  {
    key: "S",
    name: "S"
  },
  {
    key: "T",
    name: "T"
  },
  {
    key: "U",
    name: "U"
  },
  {
    key: "V",
    name: "V"
  },
  {
    key: "W",
    name: "W"
  },
  {
    key: "X",
    name: "X"
  },
  {
    key: "Y",
    name: "Y"
  },
  {
    key: "Z",
    name: "Z"
  }
];
```

## 解决滚动问题

启动项目，进入歌手列表页后，你发现这个横向列表并不能滚动，我们再回顾下 better-scroll 的 (横向) 滚动原理，首先外面容器要宽度固定，其次内容宽度要大于容器宽度。

因此目前存在两个问题:

1. 外部容器未限定宽度，也就是两个 Horizen 外面包裹的 div 元素。
2. 内部宽度没有进行相应的计算，始终为屏幕宽度。

现在就分别来解决这两个问题。

首先，新建 Singers/style.js 并增加：

```text
import styled from'styled-components';
import style from '../../assets/global-style';

export const NavContainer  = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 95px;
  width: 100%;
  padding: 5px;
  overflow: hidden;
`;
```

在 Singers/index.js 中使用:

```text
import { NavContainer } from "./style";

//...
// 返回的 JSX
return (
  <NavContainer>
    <Horizen list={categoryTypes} title={"分类 (默认热门):"}></Horizen>
    <Horizen list={alphaTypes} title={"首字母:"}></Horizen>
  </NavContainer>
)
//...
```

接下来 ，我们进入 baseUI/horizen-item/index.js 中:

```text
// 加入声明
const Category = useRef (null);

// 加入初始化内容宽度的逻辑
useEffect (() => {
  let categoryDOM = Category.current;
  let tagElems = categoryDOM.querySelectorAll ("span");
  let totalWidth = 0;
  Array.from (tagElems).forEach (ele => {
    totalWidth += ele.offsetWidth;
  });
  categoryDOM.style.width = `${totalWidth}px`;
}, []);

// JSX 在Scroll下面，对第一个 div 赋予 ref
<Scroll direction={"horizental"}>
  <div ref={Category}>
```

## 点击 item 样式改变

现在整个列表就可以滑动啦。不过还有一个问题，当我们点击某个 item 的时候，应该呈现选中样式，然后并没有，因为我们并没有在点击的时候改变 oldVal 的值。

现在进入到 Singers/index.js 中，我们加入部分逻辑后代码如下:

```text
import React, {useState} from 'react';
import Horizen from '../../baseUI/horizen-item';
import { categoryTypes, alphaTypes } from '../../api/config';
import { NavContainer } from "./style";

function Singers () {
  let [category, setCategory] = useState ('');
  let [alpha, setAlpha] = useState ('');

  let handleUpdateAlpha = (val) => {
    setAlpha (val);
  }

  let handleUpdateCatetory = (val) => {
    setCategory (val);
  }

  return (
    <NavContainer>
      <Horizen 
        list={categoryTypes} 
        title={"分类 (默认热门):"} 
        handleClick={handleUpdateCatetory} 
        oldVal={category}></Horizen>
      <Horizen 
        list={alphaTypes} 
        title={"首字母:"} 
        handleClick={val => handleUpdateAlpha (val)} 
        oldVal={alpha}></Horizen>
    </NavContainer>
  )
}

export default React.memo (Singers);
```

好，现在就有了我们开头的效果。现在你可以为所欲为地滑动、点击，都没有任何问题啦。



# 歌手列表2 歌手List开发，为后面起飞做铺垫

> 本节代码对应 GitHub 分支: chapter4

[仓库传送门(opens new window)](https://github.com/sanyuan0704/react-cloud-music/tree/chapter4)

为了做出小小的分类横向滚动列表，可谓花了不少的力气。不过做完了这个，再来开发歌手列表，简直易如反掌了。

进入 Singers/index.js, 增加以下代码，

```text
//mock 数据
const singerList = [1, 2,3, 4,5,6,7,8,9,10,11,12].map (item => {
  return {
    picUrl: "https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg",
    name: "隔壁老樊",
    accountId: 277313426,
  }
}); 

// 渲染函数，返回歌手列表
const renderSingerList = () => {
  return (
    <List>
      {
        singerList.map ((item, index) => {
          return (
            <ListItem key={item.accountId+""+index}>
              <div className="img_wrapper">
                <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          )
        })
      }
    </List>
  )
};
```

然后将返回的 JSX 代码做一些改动:

```text
return (
  <div>
    <NavContainer>
      <Horizen 
        list={categoryTypes} 
        title={"分类 (默认热门):"} 
        handleClick={(val) => handleUpdateCatetory (val)} 
        oldVal={category}></Horizen>
      <Horizen 
        list={alphaTypes} 
        title={"首字母:"} 
        handleClick={val => handleUpdateAlpha (val)} 
        oldVal={alpha}></Horizen>
    </NavContainer> 
    <ListContainer>
      <Scroll>
        { renderSingerList () }
      </Scroll>
    </ListContainer>
  </div>
)
```

现在项目会报错，因为样式组件还没有定义，我们在 style.js 中添加：

```text
export const ListContainer = styled.div`
  position: fixed;
  top: 160px;
  left: 0;
  bottom: 0;
  overflow: hidden;
  width: 100%;
`;

export const List = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  overflow: hidden;
  .title {
    margin:10px 0 10px 10px;
    color: ${style ["font-color-desc"]};
    font-size: ${style ["font-size-s"]};
  }
`;
export const ListItem = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  margin: 0 5px;
  padding: 5px 0;
  align-items: center;
  border-bottom: 1px solid ${style ["border-color"]};
  .img_wrapper {
    margin-right: 20px;
    img {
      border-radius: 3px;
      width: 50px;
      height: 50px;
    }
  }
  .name {
    font-size: ${style ["font-size-m"]};
    color: ${style ["font-color-desc"]};
    font-weight: 500;
  }
`;
```

在 index.js 中引入:

```text
import { 
  NavContainer,
  ListContainer,
  List,
  ListItem
} from "./style";
```

现在你就能看到一个可以滚动的歌手列表啦！

![img](https://img-repo.poetries.top/images/16dddf3919da2c45.gif)

## 数据层开发

刚刚只是mock数据，要实现真正的线上功能，还有很多工作要做。

### axios请求处理

进入到api/request.js中，加入下面的请求代码:

```text
export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
}

export const getSingerListRequest= (category, alpha, count) => {
  return axiosInstance.get(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`);
}
```

这就是我们目前需要的全部ajax请求。

### redux层开发

redux刚开始接触的时候确实是比较复杂，但多些几次你就会发现其实就是一些模板代码，并没有什么难的。还是按推荐模块一样，我们来按照步骤开发redux模块。

注意，在这里我们会添加一些新的业务逻辑，比如上拉/下拉/进场加载动画的控制、列表页数的控制，大家看到不要感到奇怪。

在Singers目录下，新建store文件夹，然后新建以下文件:

```text
actionCreators.js //放不同action的地方
constants.js      //常量集合，存放不同action的type值
index.js          //用来导出reducer，action
reducer.js        //存放initialState和reducer函数
```

#### 1.声明初始化state

初始化state在reducer中进行

```text
//reducer.js
import { fromJS } from 'immutable';

const defaultState = fromJS({
  singerList: [],
  enterLoading: true,     //控制进场Loading
  pullUpLoading: false,   //控制上拉加载动画
  pullDownLoading: false, //控制下拉加载动画
  pageCount: 0            //这里是当前页数，我们即将实现分页功能
});
```

#### 2.定义constants

```text
export const CHANGE_SINGER_LIST = 'singers/CHANGE_SINGER_LIST';
export const CHANGE_PAGE_COUNT = 'singers/PAGE_COUNT';
export const CHANGE_ENTER_LOADING = 'singers/ENTER_LOADING';
export const CHANGE_PULLUP_LOADING = 'singers/PULLUP_LOADING';
export const CHANGE_PULLDOWN_LOADING = 'singers/PULLDOWN_LOADING';
```

#### 3.定义reducer函数

在reducer.js文件中加入以下处理逻辑，由于存放的是immutable数据结构，所以必须用set方法来设置新状态，同时取状态用get方法。

```text
export default (state = defaultState, action) => {
  switch(action.type) {
    case actionTypes.CHANGE_SINGER_LIST:
      return state.set('singerList', action.data);
    case actionTypes.CHANGE_PAGE_COUNT:
      return state.set('pageCount', action.data);
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.data);
    case actionTypes.CHANGE_PULLUP_LOADING:
      return state.set('pullUpLoading', action.data);
    case actionTypes.CHANGE_PULLDOWN_LOADING:
      return state.set('pullDownLoading', action.data);
    default:
      return state;
  }
}
```

#### 4.编写具体的action

```text
import {
  getHotSingerListRequest,
  getSingerListRequest
} from "../../../api/request";
import {
  CHANGE_SINGER_LIST,
  CHANGE_CATOGORY,
  CHANGE_ALPHA,
  CHANGE_PAGE_COUNT,
  CHANGE_PULLUP_LOADING,
  CHANGE_PULLDOWN_LOADING,
  CHANGE_ENTER_LOADING
} from './constants';
import {
  fromJS
} from 'immutable';


const changeSingerList = (data) => ({
  type: CHANGE_SINGER_LIST,
  data: fromJS(data)
});

export const changePageCount = (data) => ({
  type: CHANGE_PAGE_COUNT,
  data
});

//进场loading
export const changeEnterLoading = (data) => ({
  type: CHANGE_ENTER_LOADING,
  data
});

//滑动最底部loading
export const changePullUpLoading = (data) => ({
  type: CHANGE_PULLUP_LOADING,
  data
});

//顶部下拉刷新loading
export const changePullDownLoading = (data) => ({
  type: CHANGE_PULLDOWN_LOADING,
  data
});

//第一次加载热门歌手
export const getHotSingerList = () => {
  return (dispatch) => {
    getHotSingerListRequest(0).then(res => {
      const data = res.artists;
      dispatch(changeSingerList(data));
      dispatch(changeEnterLoading(false));
      dispatch(changePullDownLoading(false));
    }).catch(() => {
      console.log('热门歌手数据获取失败');
    })
  }
};

//加载更多热门歌手
export const refreshMoreHotSingerList = () => {
  return (dispatch, getState) => {
    const pageCount = getState().getIn(['singers', 'pageCount']);
    const singerList = getState().getIn(['singers', 'singerList']).toJS();
    getHotSingerListRequest(pageCount).then(res => {
      const data = [...singerList, ...res.artists];
      dispatch(changeSingerList(data));
      dispatch(changePullUpLoading(false));
    }).catch(() => {
      console.log('热门歌手数据获取失败');
    });
  }
};

//第一次加载对应类别的歌手
export const getSingerList = (category, alpha) => {
  return (dispatch, getState) => {
    getSingerListRequest(category, alpha, 0).then(res => {
      const data = res.artists;
      dispatch(changeSingerList(data));
      dispatch(changeEnterLoading(false));
      dispatch(changePullDownLoading(false));
    }).catch(() => {
      console.log('歌手数据获取失败');
    });
  }
};

//加载更多歌手
export const refreshMoreSingerList = (category, alpha) => {
  return (dispatch, getState) => {
    const pageCount = getState().getIn(['singers', 'pageCount']);
    const singerList = getState().getIn(['singers', 'singerList']).toJS();
    getSingerListRequest(category, alpha, pageCount).then(res => {
      const data = [...singerList, ...res.artists];
      dispatch(changeSingerList(data));
      dispatch(changePullUpLoading(false));
    }).catch(() => {
      console.log('歌手数据获取失败');
    });
  }
};
```

#### 5.将相关变量导出

```text
//index.js
import reducer from './reducer'
import * as actionCreators from './actionCreators'

export { reducer, actionCreators };
```

### 组件连接Redux

首先，需要将Singers下的reducer注册到全局store，在src目录下的store/reducer.js中，内容如下:

```text
import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../application/Recommend/store/index';
import { reducer as singersReducer } from '../application/Singers/store/index';

export default combineReducers({
  recommend: recommendReducer,
  singers: singersReducer,
});
```

好，现在已经在全局的store下面注册完成。现在在Singers/index.js中，准备连接Redux。 增加代码:

```text
import React, {useState, useEffect} from 'react';
import Horizen from '../../baseUI/horizen-item';
import { categoryTypes, alphaTypes } from '../../api/config';
import { 
  NavContainer,
  ListContainer,
  List,
  ListItem,
} from "./style";
import { 
  getSingerList, 
  getHotSingerList, 
  changeEnterLoading, 
  changePageCount, 
  refreshMoreSingerList, 
  changePullUpLoading, 
  changePullDownLoading, 
  refreshMoreHotSingerList 
} from './store/actionCreators';
import Scroll from './../../baseUI/scroll/index';
import {connect} from 'react-redux';

//在此省略组件代码

const mapStateToProps = (state) => ({
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount'])
});
const mapDispatchToProps = (dispatch) => {
  return {
    getHotSingerDispatch() {
      dispatch(getHotSingerList());
    },
    updateDispatch(category, alpha) {
      dispatch(changePageCount(0));//由于改变了分类，所以pageCount清零
      dispatch(changeEnterLoading(true));//loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
      dispatch(getSingerList(category, alpha));
    },
    // 滑到最底部刷新部分的处理
    pullUpRefreshDispatch(category, alpha, hot, count) {
      dispatch(changePullUpLoading(true));
      dispatch(changePageCount(count+1));
      if(hot){
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList(category, alpha));
      }
    },
    //顶部下拉刷新
    pullDownRefreshDispatch(category, alpha) {
      dispatch(changePullDownLoading(true));
      dispatch(changePageCount(0));//属于重新获取数据
      if(category === '' && alpha === ''){
        dispatch(getHotSingerList());
      } else {
        dispatch(getSingerList(category, alpha));
      }
    }
  }
};   
```

记得最后用react-redux中的connect包裹:

```text
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers));
```

好，现在就可以完美地显示真实的列表了。

### 分类和列表联动

但是，点击不同的分类并没有获取相应的列表，现在我们就来实现分类和列表联动的功能。

这当然要从handleUpdatexxx函数开始着手啦。其实非常简单，只需做如下修改即可：

```text
let handleUpdateAlpha = (val) => {
  setAlpha(val);
  updateDispatch(category, val);
};

let handleUpdateCatetory = (val) => {
  setCategory(val);
  updateDispatch(val, alpha);
};
```

至此，这样联动效果就实现啦！



# 歌手列表3 上拉下拉加载及优化，全面助力移动web开发

> 本节代码对应 GitHub 分支: chapter4

[仓库传送门(opens new window)](https://github.com/sanyuan0704/react-cloud-music/tree/chapter4)

## 上拉 / 下拉加载更多实现

在这里 Scroll 基础组件的作用就展现出来了。之前我们封装了 Scroll 组件，监听上拉 / 下拉刷新的功能已编写完成，但是相应的 loading 效果并没有考虑。现在，我们就来先完善 loading 效果。

首先引入 loading 组件：

```text
import Loading from '../loading/index';
```

将 return 部分的代码修改为:

```text
const PullUpdisplayStyle = pullUpLoading ? {display: ""} : { display:"none" };
const PullDowndisplayStyle = pullDownLoading ? { display: ""} : { display:"none" };
return (
  <ScrollContainer ref={scrollContaninerRef}>
    {props.children}
    {/* 滑到底部加载动画 */}
    <PullUpLoading style={ PullUpdisplayStyle }><Loading></Loading></PullUpLoading>
    {/* 顶部下拉刷新动画 */}
    <PullDownLoading style={ PullDowndisplayStyle }><LoadingV2></LoadingV2></PullDownLoading>
  </ScrollContainer>
);
```

注意 PullUpdisplayStyle 和 PullDowndisplayStyle 都是外部传入的，这就方便了我们控制 loading 的显示和隐藏。

其中 Loading 组件即之前编写的两圆交错的涟漪效果组件，但 LoadingV2 并没有编写，现在就花一点时间来开发第二个 Loading 效果。

```text
//baseUI/loading-v2/index.js
import React from 'react';
import styled, {keyframes} from'styled-components';
import style from '../../assets/global-style'

const dance = keyframes`
    0%, 40%, 100%{
      transform: scaleY (0.4);
      transform-origin: center 100%;
    }
    20%{
      transform: scaleY (1);
    }
`
const Loading = styled.div`
    height: 10px;
    width: 100%;
    margin: auto;
    text-align: center;
    font-size: 10px;
    >div {
      display: inline-block;
      background-color: ${style ["theme-color"]};
      height: 100%;
      width: 1px;
      margin-right:2px;
      animation: ${dance} 1s infinite;
    }
    >div:nth-child (2) {
      animation-delay: -0.4s;
    }
    >div:nth-child (3) {
      animation-delay: -0.6s;
    }
    >div:nth-child (4) {
      animation-delay: -0.5s;
    }
    >div:nth-child (5) {
      animation-delay: -0.2s;
    } 

`

function LoadingV2 () {
  return (
    <Loading>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <span > 拼命加载中...</span>
    </Loading>
  );
}
 
export default React.memo (LoadingV2);
```

OK, 现在在 scroll 组件中引入。

```text
//scroll/index.js
import Loading2 from '../loading-v2/index';
```

接下来，我们在 Singers/index.js 中，传入相应的参数即可。

```text
<Scroll
  pullUp={ handlePullUp }
  pullDown = { handlePullDown }
  pullUpLoading = { pullUpLoading }
  pullDownLoading = { pullDownLoading }
>
  { renderSingerList () }
</Scroll>
```

现在 handlePullUp 和 handlePullDown 两个方法还没有定义，添加如下:

```text
const handlePullUp = () => {
  pullUpRefreshDispatch (category, alpha, category === '', pageCount);
};

const handlePullDown = () => {
  pullDownRefreshDispatch (category, alpha);
};
```

现在试一试上拉下拉，相应的 loading 动画能够出现了，同时数据也能正常加载。 对了，现在进场的 loading 效果还没有实现，我们在 Singers/index.js 中加入:

```text
import Loading from '../../baseUI/loading';
//...
//ListContainer 标签中
<Loading show={enterLoading}></Loading>
```

这样，当你第一次打开列表页或者切换不同分类的时候，会有 loading 效果出现，和我们的预期一致。

## 相关优化

### 图片懒加载

同样是引入 react-lazyload, 在 Singers/index.js 作如下修改:

```text
// 首先引入
import  LazyLoad, {forceCheck} from 'react-lazyload';

// 包裹 img 标签
<LazyLoad placeholder={<img width="100%" height="100%" src={require ('./singer.png')} alt="music"/>}>
  <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
</LazyLoad>

<Scroll
  //...
  onScroll={forceCheck}
>
</Scroll>
```

现在懒加载的效果就完成了。

### 防抖处理

当你频繁地下拉时，事实上事件回调函数也会被频繁触发，导致发送很多无意义的请求。因此这里对 Scroll 基础组件做一下防抖处理。

防抖函数写在 api/utils.js 中，

```text
// 防抖函数
export const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout (timer);
    }
    timer = setTimeout (() => {
      func.apply (this, args);
      clearTimeout (timer);
    }, delay);
  }
}
```

然后在 scroll/index.js 中:

```text
import { debounce } from "../../api/utils";

//...

let pullUpDebounce = useMemo (() => {
  return debounce (pullUp, 300)
}, [pullUp]);
// 千万注意，这里不能省略依赖，
// 不然拿到的始终是第一次 pullUp 函数的引用，相应的闭包作用域变量都是第一次的，产生闭包陷阱。下同。

let pullDownDebounce = useMemo (() => {
  return debounce (pullDown, 300)
}, [pullDown]);
//...
// 之后直接调用 useMemo 返回的函数
// 滑动到底部
useEffect(() => {
    if(!bScroll || !pullUp) return;
    const handlePullUp = () => {
      //判断是否滑动到了底部
      if(bScroll.y <= bScroll.maxScrollY + 100){
        pullUpDebounce();
      }
    };
    bScroll.on('scrollEnd', handlePullUp);
    // 解绑
    return () => {
      bScroll.off('scrollEnd', handlePullUp);
    }
}, [pullUp, pullUpDebounce, bScroll]);

// 判断用户的下拉动作
useEffect(() => {
    if(!bScroll || !pullDown) return;
    const handlePullDown = (pos) => {
      //判断用户的下拉动作
      if(pos.y > 50) {
        pullDownDebounce();
      }
    };
    bScroll.on('touchEnd', handlePullDown);
    return () => {
      bScroll.off('touchEnd', handlePullDown);
    }
}, [pullDown, pullDownDebounce, bScroll]);
```

这样当你频繁上拉下拉的时候就不会频繁触发回调了。

> 思考题：当我们切换组件的时候，事实上现在的 category 和 alpha 会丢失，如果想要切换组件后仍然能够缓存 category 和 alpha 的值应该怎么做？可以自己动手试试看



# 如何用hooks实现一个 Redux

> 本节代码对应 GitHub 分支: chapter5

[仓库传送门(opens new window)](https://github.com/sanyuan0704/react-cloud-music/tree/chapter5)

上一章我们留下了一道思考题，让组件切换时能够保存当前组件的状态。当组件切换后，当前组件即被卸载，对于组件内部有关的函数引用也会消失，作用域引用消失，闭包变量不复存在。

所以通过该组件内部缓存是行不通的，必须采取状态存储在组件外的方式。

也许你马上就想到了 redux，这当然可以，但如果真要用这个，我也就没有说的必要了。

其实也是为了拓展一下大家的思路，全局的状态管理不仅仅可以用 redux，react hooks 同样可以模拟出这种功能。现在我们就用 hooks 中的 useContext 结合 useReducer 打造出类似 redux 的状态管理功能。

## 用 hooks 写一个简单的 redux

在 Singers 目录下新建一个文件 data.js, 模拟一个简单的 redux 代码如下：

```text
import React, {createContext, useReducer} from 'react';
import { fromJS } from 'immutable';

//context
export const CategoryDataContext = createContext ({});

// 相当于之前的 constants
export const CHANGE_CATEGORY = 'singers/CHANGE_CATEGORY';
export const CHANGE_ALPHA = 'singers/CHANGE_ALPHA';

//reducer 纯函数
const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return state.set ('category', action.data);
    case CHANGE_ALPHA:
      return state.set ('alpha', action.data);
    default:
      return state;
  }
};

//Provider 组件
export const Data = props => {
  //useReducer 的第二个参数中传入初始值
  const [data, dispatch] = useReducer (reducer, fromJS ({
    category: '',
    alpha: ''
  }));
  return (
    <CategoryDataContext.Provider value={{data, dispatch}}>
      {props.children}
    </CategoryDataContext.Provider>
  )
}
```

然后，在 App.js 中用 Data 这个 Provider 组件来包裹下面的子组件:

```text
//App.js
// 增加引入代码
import { Data } from './application/Singers/data';

function App () {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        <Data>
          { renderRoutes (routes) }
        </Data>
      </HashRouter>
    </Provider>
  )
}
```

然后在 Singers/index.js 来运用：

```text
// 首先需要引入 useContext
// 将之前的 useState 代码删除
const {data, dispatch} = useContext (CategoryDataContext);
// 拿到 category 和 alpha 的值
const {category, alpha} = data.toJS ();
```

而且 handleUpdatexxx 函数也要修改:

```text
//CHANGE_ALPHA 和 CHANGE_CATEGORY 变量需要从 data.js 中引入
let handleUpdateAlpha = (val) => {
  dispatch ({type: CHANGE_ALPHA, data: val});
  updateDispatch (category, val);
};

let handleUpdateCatetory = (val) => {
  dispatch ({type: CHANGE_CATEGORY, data: val});
  updateDispatch (val, alpha);
};
```

至此，一个比较简单的 redux 就用 hooks 实现完成了。

看到这里，你可能会说，hooks 现在不就可以取代 redux 吗？

现在的确也有不少人这样说，尽管 hooks 能模拟 redux 的核心功能，但是能够取代 redux 这件事我不敢苟同。

1. 首先 redux 有非常成熟的状态跟踪调试工具，也就是 chrome 浏览器的 redux-devtools 插件，至少到现在为止开发中很多的错误我都是通过它发现的。换而言之，它能够协助我们写出更利于维护的代码，并且在出现故障时快速找到问题的根源。
2. 其次，redux 有非常成熟的数据模块化方案，不同模块的 reducer 直接导出，在全局的 store 中，调一下 redux 自带的 combineReducer 即可，目前从官方的角度看 hooks 这方面并不成熟。
3. Redux 拥有成熟且强大的中间件功能，如 redux-logger, redux-thunk, redux-saga，用 hooks 实现中间件的功能就只能靠自己手动实现了。

当然 redux 也并不是十全十美的，有些方面也经常被人吐槽，比如繁重的模板代码，需要 react-redux 引入徒增项目包大小等等。但是瑕不掩瑜，这些不妨碍我们使用 redux 开发出容易调试并维护的应用。

因此客观来说，redux 是一个短时间不可被替代的状态管理方案。

## 歌手列表页的数据缓存

有了分类名称的缓存，我们再来做歌手列表页的数据缓存就轻松多了。

```text
//useEffect 中增加判断逻辑
useEffect (() => {
  if (!singerList.size) {
    getHotSingerDispatch ();
  }
}, []);
```

当歌手列表不为空时，就不发 Ajax 请求，同时能够记忆之前的分类，让分类和列表对应，正是我们想要的效果。



# 排行榜单模块开发

> 本节代码对应 GitHub 分支: chapter5

[仓库传送门(opens new window)](https://github.com/sanyuan0704/react-cloud-music/tree/chapter5)

## 数据层开发

### axios 请求代码

在 api/request.js 中，添加以下代码:

```text
export const getRankListRequest = () => {
  return axiosInstance.get (`/toplist/detail`);
};
```

### redux 层开发

排行榜单可以说是整个应用中就数据层而言最简单的一个组件。因此 redux 的代码我们集中在一个文件中。

```text
//rank/store/index.js
import { fromJS } from 'immutable';
import { getRankListRequest } from '../../../api/request';

//constants
export const CHANGE_RANK_LIST = 'home/rank/CHANGE_RANK_LIST';
export const CHANGE_LOADING = 'home/rank/CHANGE_LOADING';

//actionCrreator
const changeRankList = (data) => ({
  type: CHANGE_RANK_LIST,
  data: fromJS (data)
})

export const getRankList = () => {
  return dispatch => {
    getRankListRequest ().then (data => {
      let list = data && data.list;
      dispatch (changeRankList (list));
      dispatch (changeLoading (false));
    })
  }
}

const changeLoading = (data) => ({
  type: CHANGE_LOADING,
  data
})

//reducer
const defaultState = fromJS ({
  rankList: [],
  loading: true
})

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_RANK_LIST:
      return state.set ('rankList', action.data);
    case CHANGE_LOADING:
      return state.set ('loading', action.data);
    default:
      return state;
  }
}

export { reducer };
```

### 组件连接 redux

先在全局 store 注册:

```text
//src/store/reducer.js
import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../application/Recommend/store/index';
import { reducer as singersReducer } from '../application/Singers/store/index';
import { reducer as rankReducer } from '../application/Rank/store/index';

export default combineReducers ({
  // 之后开发具体功能模块的时候添加 reducer
  recommend: recommendReducer,
  singers: singersReducer ,
  rank: rankReducer
});
```

然后让 rank 组件连接 redux,

```text
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

function Rank (props) {

}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
  rankList: state.getIn (['rank', 'rankList']),
  loading: state.getIn (['rank', 'loading']),
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    getRankListDataDispatch () {
      dispatch (getRankList ());
    }
  }
};

export default connect (mapStateToProps, mapDispatchToProps)(React.memo (Rank));
```

已经熟悉了 redux 开发方式的你，是不是也觉得非常简单呢？废话不多说，我们马上进入 Rank 组件的开发。

## Rank 组件开发

首先初始化相应的 props。

(这里的引入模块的代码大家自行参考 GitHub 仓库的 chapter5 分支，也根据命令行报错提示依次引入)

```text
const { rankList:list, loading } = props;

const { getRankListDataDispatch } = props;

let rankList = list ? list.toJS () : [];
```

didMount 的时候发送 Ajax 请求:

```text
useEffect (() => {
  getRankListDataDispatch ();
}, []);
```

排行榜单分为两个部分，一部分是官方榜，另一部分是全球榜。

官方榜单数据有 tracks 数组，存放部分歌曲信息，而全球榜没有。

但是后端数据并没有将这两者分开，因此我们需要做一下数据的处理。

```text
let globalStartIndex = filterIndex (rankList);
let officialList = rankList.slice (0, globalStartIndex);
let globalList = rankList.slice (globalStartIndex);
```

其中，filterIndex 从 api/utils.js 中导出，

```text
// 处理数据，找出第一个没有歌名的排行榜的索引
export const filterIndex = rankList => {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList [i].tracks.length && !rankList [i + 1].tracks.length) {
      return i + 1;
    }
  }
};
// 记得引入这个方法
import { filterIndex } from '../../api/utils';
// 这是渲染榜单列表函数，传入 global 变量来区分不同的布局方式
const renderRankList = (list, global) => {
  return (
    <List globalRank={global}>
      {
      list.map ((item) => {
        return (
          <ListItem key={item.coverImgId} tracks={item.tracks} onClick={() => enterDetail (item.name)}>
            <div className="img_wrapper">
              <img src={item.coverImgUrl} alt=""/>
              <div className="decorate"></div>
              <span className="update_frequecy">{item.updateFrequency}</span>
            </div>
            { renderSongList (item.tracks)  }
          </ListItem>
        )
      })
    } 
    </List>
  )
}

const renderSongList = (list) => {
  return list.length ? (
    <SongList>
      {
        list.map ((item, index) => {
          return <li key={index}>{index+1}. {item.first} - {item.second}</li>
        })
      }
    </SongList>
  ) : null;
}

// 榜单数据未加载出来之前都给隐藏
let displayStyle = loading ? {"display":"none"}:  {"display": ""};

return (
  <Container>
    <Scroll>
      <div>
        <h1 className="offical" style={displayStyle}> 官方榜 </h1>
          { renderRankList (officialList) }
        <h1 className="global" style={displayStyle}> 全球榜 </h1>
          { renderRankList (globalList, true) }
        { loading ? <EnterLoading><Loading></Loading></EnterLoading> : null }
      </div>
    </Scroll> 
    {renderRoutes (props.route.routes)}
  </Container>
  );
```

style.js 中:

```text
import styled from'styled-components';
import style from '../../assets/global-style';

// Props 中的 globalRank 和 tracks.length 均代表是否为全球榜

export const Container = styled.div`
  position: fixed;
  top: 90px;
  bottom: 0;
  width: 100%;
  .offical,.global {
    margin: 10px 5px;
    padding-top: 15px;
    font-weight: 700;
    font-size: ${style ["font-size-m"]};
    color: ${style ["font-color-desc"]};
  }
`;
export const List = styled.ul`
  margin-top: 10px;
  padding: 0 5px;
  display: ${props => props.globalRank ? "flex": "" };
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  background: ${style ["background-color"]};
  &::after {
    content:"";
    display:block;
    width: 32vw;
  }
`
export const ListItem = styled.li`
  display: ${props => props.tracks.length ? "flex": ""};
  padding: 3px 0;
  border-bottom: 1px solid ${style ["border-color"]};
  .img_wrapper {
    width:  ${props => props.tracks.length ? "27vw": "32vw"};
    height: ${props => props.tracks.length ? "27vw": "32vw"};
    border-radius: 3px;
    position: relative;
    .decorate {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient (hsla (0,0%,100%,0),hsla (0,0%,43%,.4));
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
    .update_frequecy {
      position: absolute;
      left: 7px;
      bottom: 7px;
      font-size: ${style ["font-size-ss"]};
      color: ${style ["font-color-light"]};
    }
  }
`;
export const SongList = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 10px;
  >li {
    font-size: ${style ["font-size-s"]};
    color: grey;
  }
`;
```

然后在 index.js 中引入 CSS 组件即可，代码就不展示了。

在 image_wrapper 中，我们再次利用渐变效果实现了一层遮罩，达到衬托文字的效果。

其实布局都是非常常用的 flex 布局，我就不在这上面浪费时间了。值得注意的是，当 flex 布局一行填满三个元素，但是最后一行只有两个元素的时候，会出现一些问题，你会发现最后一个元素并不是在居中的位置，而是在最右边，中间留出了空白。我当时就遇到了这个问题，最后采用伪元素的方式才得以解决:

```text
export const List = styled.ul`
  margin-top: 10px;
  padding: 0 5px;
  display: ${props => props.globalRank ? "flex": "" };
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  background: ${style ["background-color"]};
  &::after {
    content:"";
    display:block;
    width: 32vw;
  }
`
```

现在的接口列表数据比之前少了一条，因此不再存在这个问题，但是希望大家能了解到这个细节。



#  歌单详情1 动感切换页面，你心动了吗

> 本节代码对应 GitHub 分支: chapter6

[仓库传送门(opens new window)](https://github.com/sanyuan0704/react-cloud-music/tree/chapter5)

## 构建路由

榜单详情页面在这里我们需要构建一个专门的路由，目前我们就以推荐歌单的数据来完成详情页开发。

首先在 routes/index.js 中，

```text
import Album from '../application/Album';

// 在 /recommend 后面加上子路由
{
  path: "/recommend",
  component: Recommend,
  routes: [
    {
      path: "/recommend/:id",
      component: Album
    }
  ]
},
```

然后在 component/list/index.js 中设置跳转：

```text
const enterDetail = (id) => {
  props.history.push (`/recommend/${id}`)
}
// 加入事件绑定逻辑
<ListItem key={item.id} onClick={() => enterDetail (item.id)}>
//...
```

注意，这里 List 组件作为 Recommend 的子组件，并不能从 props 拿到 history 变量，无法跳转路由。有两种解决方法：

1. 将 Recommend 组件中 props 对象中的 history 属性传给 List 组件
2. 将 List 组件用 withRouter 包裹

这里我们用第二种方式:

```text
//List/index.js
import { withRouter } from 'react-router-dom';

// 省略组件代码

// 包裹
export default React.memo (withRouter (RecommendList));
```

这样，现在就能拿到 history 变量，顺利进行路由跳转了。

但是，Album 组件现在并没有编写。简单来写一下:

```text
//src/application/Album/index.js
import React from 'react';
import {Container} from './style';

function Album (props) {
  return (
    <Container>
    </Container>
  )
}

export default Album;
```

在同目录下的 style.js：

```text
import styled from'styled-components';
import style from '../../assets/global-style';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: #fff;
`
```

现在你点击一个歌单，url 地址确实变化了，但页面却没有任何改变，这是什么原因呢？这里我卖个关子，给大家提供一个解决问题的思路。 第一反应是层叠上下文的问题吗？结果改变了 z-index 值，页面还是一样。说明并不是这个问题。

接着，这个组件究竟渲染了没？在 Album/index.js 的组件函数中，输出一些内容，到页面中，跳转后这些内容并未输出。此时，可以断定是组件没有渲染的问题。但是路由都改变了，配置也没错，怎么会出现这个问题呢？在这个时候，就考验我们对路由配置原理的理解了，具体来说就是 renderRoutes 方法。这个方法中传入参数为路由配置数组，我们在组件中调用这个方法后只能渲染一层路由，再深层的路由就无法渲染。

因此，我们现在在 Recommend 组件中加入这些逻辑即可:

> 有人说下面的props.route.routes有问题，是因为之前的子路由名称写成了 children 而不是 routes，这里默认配置项的子路由名字都是 routes

```text
import { renderRoutes } from 'react-router-config';

// 返回的 JSX
<Content>
  // 其他代码
  // 将目前所在路由的下一层子路由加以渲染
  { renderRoutes (props.route.routes) }
</Content>
```

现在就有跳转效果了。

## 动画实现

本项目所有的过渡动画采用成熟的第三方库 react-transition-group。首先安装:

```text
npm install react-transition-group --save
```

接下来我们来初步地使用:

```text
//Album/index.js
import React, {useState} from 'react';
import {Container} from './style';
import { CSSTransition } from 'react-transition-group';

function Album (props) {
  const [showStatus, setShowStatus] = useState (true);

  return (
    <CSSTransition
      in={showStatus}  
      timeout={300} 
      classNames="fly" 
      appear={true} 
      unmountOnExit
      onExited={props.history.goBack}
    >
      <Container>
      </Container>
    </CSSTransition>
  )
}

export default React.memo (Album);
```

然后在相应的 style.js 中，

```text
import styled from'styled-components';
import style from '../../assets/global-style';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: ${style ["background-color"]};
  transform-origin: right bottom;
  &.fly-enter, &.fly-appear {
    transform: translate3d (100%, 0, 0);
  }
  &.fly-enter-active, &.fly-appear-active {
    transition: transform .3s;
    transform: translate3d (0, 0, 0);
  }
  &.fly-exit {
    transform: translate3d (0, 0, 0);
  }
  &.fly-exit-active {
    transition: transform .3s;
    transform: translate3d (100%, 0, 0);
  }
`
```

现在你回到首页，然后点击一个歌单，你会看到一个滑入的动画。但是作为一个精致的项目，这个效果还不够，完整版的项目里面呈现的是一个切入的效果，那这个如何来实现？

也算是一个经验吧，这里直接分享给大家。需要把握两点:

1. 设定 transfrom 的固定点，接下来的动画都是绕这个点旋转或平移
2. 设置 rotateZ 的值，让整个页面能够拥有 Z 坐标方向的矢量

修改后如下:

```text
  // 动画样式代码
  transform-origin: right bottom;
  &.fly-enter, &.fly-appear {
    transform: rotateZ (30deg) translate3d (100%, 0, 0);
  }
  &.fly-enter-active, &.fly-appear-active {
    transition: transform .3s;
    transform: rotateZ (0deg) translate3d (0, 0, 0);
  }
  &.fly-exit {
    transform: rotateZ (0deg) translate3d (0, 0, 0);
  }
  &.fly-exit-active {
    transition: transform .3s;
    transform: rotateZ (30deg) translate3d (100%, 0, 0);
  }
```

这个切入的动画就完成了。同样离开页面的时候，也有切出的动画。要检验整个效果，我们先来准备好路由的跳转。

## Header 基础组件开发

由于比较简单，就直接贴上 Header 组件的代码了。

```text
//baseUI/header/index.js
import React from 'react';
import styled from'styled-components';
import style from '../../assets/global-style';
import PropTypes from "prop-types";

const HeaderContainer = styled.div`
  position: fixed;
  padding: 5px 10px;
  padding-top: 0;
  height: 40px;
  width: 100%;
  z-index: 100;
  display: flex;
  line-height: 40px;
  color: ${style ["font-color-light"]};
  .back {
    margin-right: 5px;
    font-size: 20px;
    width: 20px;
  }
  >h1 {
    font-size: ${style ["font-size-l"]};
    font-weight: 700;
  }
`
// 处理函数组件拿不到 ref 的问题，所以用 forwardRef
const Header = React.forwardRef ((props, ref) => {
  const { handleClick, title} = props;
  return (
    <HeaderContainer ref={ref}>
      <i className="iconfont back"  onClick={handleClick}>&#xe655;</i>
      <h1>{title}</h1>
    </HeaderContainer>
  )
})

Header.defaultProps = {
  handleClick: () => {},
  title: "标题",
};

Header.propTypes = {
  handleClick: PropTypes.func,
  title: PropTypes.string,
};

export default React.memo (Header);
```

现在在 Album 组件中直接使用:

```text
// 先引入
import  Header  from './../../baseUI/header/index';
const handleBack = () => {
  setShowStatus (false);
};

//Container 组件下声明 Header
// 前面代码省略
<Header title={"返回"} handleClick={handleBack}></Header>
```

现在你就能看到返回的箭头和文字啦，虽然颜色比较淡，但点击能够正常的跳转并显示切出动画。那看到这里你不禁要问了，我们只是通过 setShowStatus 把状态置为了 false，让退出的动画执行一次，为什么会有路由跳转呢？

你可能忘了，在写 CSSTransition 的时候，我特意加上了这一句:

```text
onExited={props.history.goBack}
```

什么意思？在退出动画执行结束时跳转路由。

那你可能会说，为什么不是直接在 handleBack 里面直接跳转路由呢？这里就是我踩过的一个坑，大家可以试试把 CSSTransition 中的 onExited 钩子删去，然后在 handleBack 中跳转路由。你会发现，动画根本就没有出现！

让我来给你解释一下这是为什么，当你点击后，执行路由跳转逻辑，这个时候路由变化，当前的组件会被立即卸载，相关的动画当然也就不复存在了。最后我的解决方案就是，先让页面切出动画执行一次，然后在动画执行完的瞬间跳转路由，这就达到我们的预期了，这也就是现在呈现给大家的方案。

OK，关于切页动画就分享到这里了，接下来我们开始核心页面的布局。



#  歌单详情2 准备静态模板

> 本节代码对应 GitHub 分支: chapter6

[仓库传送门(opens new window)](https://github.com/sanyuan0704/react-cloud-music/tree/chapter6)

现在就进入到具体组件的开发了，首先是静态的布局部分。

## 顶部和菜单布局

```text
//Album/index.js
import React, {useState} from 'react';
import {Container} from './style';
import { CSSTransition } from 'react-transition-group';
import  Header  from './../../baseUI/header/index';
import Scroll from '../../baseUI/scroll/index';

function Album (props) {
  const [showStatus, setShowStatus] = useState (true);
  
  //mock 数据
  const currentAlbum = {
    creator: {
      avatarUrl: "https://p1.music.126.net/O9zV6jeawR43pfiK2JaVSw==/109951164232128905.jpg",
      nickname: "浪里推舟"
    },
    coverImgUrl: "https://p2.music.126.net/ecpXnH13-0QWpWQmqlR0gw==/109951164354856816.jpg",
    subscribedCount: 2010711,
    name: "听完就睡，耳机是天黑以后柔软的梦境",
    tracks:[
      {
        name: "我真的受伤了",
        ar: [{name: "张学友"}, {name: "周华健"}],
        al: {
          name: "学友 热"
        }
      },
      {
        name: "我真的受伤了",
        ar: [{name: "张学友"}, {name: "周华健"}],
        al: {
          name: "学友 热"
        }
      },
      {
        name: "我真的受伤了",
        ar: [{name: "张学友"}, {name: "周华健"}],
        al: {
          name: "学友 热"
        }
      },
      {
        name: "我真的受伤了",
        ar: [{name: "张学友"}, {name: "周华健"}],
        al: {
          name: "学友 热"
        }
      },
      {
        name: "我真的受伤了",
        ar: [{name: "张学友"}, {name: "周华健"}],
        al: {
          name: "学友 热"
        }
      },
      {
        name: "我真的受伤了",
        ar: [{name: "张学友"}, {name: "周华健"}],
        al: {
          name: "学友 热"
        }
      },
      {
        name: "我真的受伤了",
        ar: [{name: "张学友"}, {name: "周华健"}],
        al: {
          name: "学友 热"
        }
      },
      {
        name: "我真的受伤了",
        ar: [{name: "张学友"}, {name: "周华健"}],
        al: {
          name: "学友 热"
        }
      },
      {
        name: "我真的受伤了",
        ar: [{name: "张学友"}, {name: "周华健"}],
        al: {
          name: "学友 热"
        }
      },
      {
        name: "我真的受伤了",
        ar: [{name: "张学友"}, {name: "周华健"}],
        al: {
          name: "学友 热"
        }
      },
    ]
  }

  const handleBack = () => {
    setShowStatus (false);
  };

  return (
    <CSSTransition
      in={showStatus}  
      timeout={300} 
      classNames="fly" 
      appear={true} 
      unmountOnExit
      onExited={props.history.goBack}
    >
      <Container>
        <Header title={"返回"} handleClick={handleBack}></Header>
        // 这里是具体布局 JSX 代码
      </Container>
    </CSSTransition>
  )
}

export default React.memo (Album);
```

接下来我们来开始具体布局的 JSX 代码，

```text
<Scroll bounceTop={false}>
  <div>
    <TopDesc background={currentAlbum.coverImgUrl}>
      <div className="background">
        <div className="filter"></div>
      </div>
      <div className="img_wrapper">
        <div className="decorate"></div>
        <img src={currentAlbum.coverImgUrl} alt=""/>
        <div className="play_count">
          <i className="iconfont play">&#xe885;</i>
          <span className="count">{Math.floor (currentAlbum.subscribedCount/1000)/10} 万 </span>
        </div>
      </div>
      <div className="desc_wrapper">
        <div className="title">{currentAlbum.name}</div>
        <div className="person">
          <div className="avatar">
            <img src={currentAlbum.creator.avatarUrl} alt=""/>
          </div>
          <div className="name">{currentAlbum.creator.nickname}</div>
        </div>
      </div>
    </TopDesc>
    <Menu>
      <div>
        <i className="iconfont">&#xe6ad;</i>
        评论
      </div>
      <div>
        <i className="iconfont">&#xe86f;</i>
        点赞
      </div>
      <div>
        <i className="iconfont">&#xe62d;</i>
        收藏
      </div>
      <div>
        <i className="iconfont">&#xe606;</i>
        更多
      </div>
    </Menu>
  </div>  
</Scroll>
// 对应 style.js

// 添加 TopDesc 和 Menu
export const TopDesc = styled.div`
  background-size: 100%;
  padding: 5px 20px;
  padding-bottom: 50px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 275px;
  position: relative;
  .background {
    z-index: -1;
    background: url (${props => props.background}) no-repeat;
    background-position: 0 0;
    background-size: 100% 100%;
    position: absolute;
    width: 100%;
    height: 100%;
    filter: blur (20px);
    .filter {
      position: absolute;
      z-index: 10;
      top: 0; left: 0;
      width: 100%;
      height: 100%;
      background: rgba (7, 17, 27, 0.2);
    }
  }
  .img_wrapper {
    width: 120px;
    height: 120px;
    position: relative;         
    .decorate {
      position: absolute;
      top: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient (hsla (0,0%,43%,.4),hsla (0,0%,100%,0));
    }
    .play_count {
      position: absolute;
      right: 2px;
      top: 2px;
      font-size: ${style ["font-size-s"]};
      line-height: 15px;
      color: ${style ["font-color-light"]};
      .play {
        vertical-align: top;
      }
    }
    img {
      width: 120px;
      height: 120px;
      border-radius:3px;
    }
  }
  .desc_wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 120px;
    padding: 0 10px;
    .title {
      max-height: 70px;
      color: ${style ["font-color-light"]};
      font-weight: 700;
      line-height: 1.5;
      font-size: ${style ["font-size-l"]};
    }
    .person {
      display: flex;
      .avatar {
        width: 20px;
        height: 20px;
        margin-right: 5px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .name {
        line-height: 20px;
        font-size: ${style ["font-size-m"]};
        color: ${style ["font-color-desc-v2"]};
      }
    }
  }
`;

export const Menu = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 30px 20px 30px;
  margin: -100px 0 0 0;
  >div {
    display: flex;
    flex-direction: column;
    line-height: 20px;
    text-align: center;
    font-size: ${style ["font-size-s"]};
    color: ${style ["font-color-light"]};
    z-index:1000;
    font-weight: 500;
    .iconfont {
      font-size: 20px;
    }
  }
`;
```

对应的样式组件自行引入组件代码中，这里相信你已经很娴熟了。

## 歌单列表布局

现在我们紧接着来添加歌单列表。

```text
// 紧接着 TopDesc 和 Menu
<SongList>
  <div className="first_line">
    <div className="play_all">
      <i className="iconfont">&#xe6e3;</i>
      <span > 播放全部 <span className="sum">(共 {currentAlbum.tracks.length} 首)</span></span>
    </div>
    <div className="add_list">
      <i className="iconfont">&#xe62d;</i>
      <span > 收藏 ({getCount (currentAlbum.subscribedCount)})</span>
    </div>
  </div>
  <SongItem>
    {
      currentAlbum.tracks.map ((item, index) => {
        return (
          <li key={index}>
            <span className="index">{index + 1}</span>
            <div className="info">
              <span>{item.name}</span>
              <span>
                { getName (item.ar) } - { item.al.name }
              </span>
            </div>
          </li>
        )
      })
    }
  </SongItem>
</SongList>
```

其中 getName 是一个工具方法，我们在 api/utils.js 里面来写一下:

```text
// 处理歌手列表拼接歌手名字
export const getName = list => {
  let str = "";
  list.map ((item, index) => {
    str += index === 0 ? item.name : "/" + item.name;
    return item;
  });
  return str;
};
```

在 Album 组件代码中引入，

```text
import { getName } from './../../api/utils';
```

然后开始编写歌单的样式组件:

```text
//style.js 中加入
export const SongList = styled.div`
  border-radius: 10px;
  opacity: 0.98;
  ${props => props.showBackground ? `background: ${style ["highlight-background-color"]}`: ""}
  .first_line {
    box-sizing: border-box;
    padding: 10px 0;
    margin-left: 10px;
    position: relative;
    justify-content: space-between;
    border-bottom: 1px solid ${style ["border-color"]};
    .play_all {
      display: inline-block;
      line-height: 24px;
      color: ${style ["font-color-desc"]};
      .iconfont {
        font-size: 24px;
        margin-right: 10px;
        vertical-align: top;
      }
      .sum {
        font-size: ${style ["font-size-s"]};
        color: ${style ["font-color-desc-v2"]};
      }
      >span {
        vertical-align: top;
      }
    }
    .add_list,.isCollected {
      display: flex;
      align-items: center;
      position: absolute;
      right: 0; top :0; bottom: 0;
      width: 130px;
      line-height: 34px;
      background: ${style ["theme-color"]};
      color: ${style ["font-color-light"]};
      font-size: 0;
      border-radius: 3px;
      vertical-align: top;
      .iconfont {
        vertical-align: top;
        font-size: 10px;
        margin: 0 5px 0 10px;
      }
      span {
        font-size: 14px;
        line-height: 34px;
      }
    }
    .isCollected {
      display: flex;
      background: ${style ["background-color"]};
      color: ${style ["font-color-desc"]};
    }
}
`
export const SongItem = styled.ul`
  >li {
    display: flex;
    height: 60px;
    align-items: center;  
    .index {
      flex-basis: 60px;
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
    .info {
      box-sizing: border-box;
      flex: 1;
      display: flex;
      height: 100%;
      padding: 5px 0;
      flex-direction: column;
      justify-content: space-around;
      border-bottom: 1px solid ${style ["border-color"]};
      ${style.noWrap ()}
      >span {
        ${style.noWrap ()}
      }
      >span:first-child {
        color: ${style ["font-color-desc"]};
      }
      >span:last-child {
        font-size: ${style ["font-size-s"]};
        color: #bba8a8;
      }
    }
  }
`
```

接下来把样式组件引入到 Album/index.js 中，大家自行完成。

现在初步的布局效果就有了，让大家瞧一瞧。

![image-20210215201014034](https://img-repo.poetries.top/images/image-20210215201014034.png)

## 滑动时 Header 联动效果

作为一个精美的 WebApp，我们当然不仅仅是考虑静态布局啦，滑动时的体验也要兼顾，大家去项目预览地址可以看到，在滑动的过程中 Header 组件的背景会逐渐变红，而且里面的文字换成了歌单名，并且呈现出一个跑马灯的效果。

![img](https://img-repo.poetries.top/images/16f3bee6ce19d88d.gif)

现在又体现出了封装 Scroll 基础组件的优势了，在 Scroll 组件中，初始化时已经监听了滚动事件并且自动执行回调，因此我们直接编写回调逻辑即可。

首先我们稍微改造一下 Header 组件。

```text
const Header = React.forwardRef ((props, ref) => {
  const { handleClick, title, isMarquee} = props;
  return (
    <HeaderContainer ref={ref}>
      <i className="iconfont back"  onClick={handleClick}>&#xe655;</i>
      {
        isMarquee ? <marquee><h1>{title}</h1></marquee>:
        <h1>{title}</h1>
      }
    </HeaderContainer>
  )
})
Header.defaultProps = {
  //...
  isMarquee: false
};

Header.propTypes = {
  //...
  isMarquee: PropTypes.bool
};
```

接下来，在 Album 组件中，加入:

```text
import React, { useState, useCallback, useRef } from 'react';

const [title, setTitle] = useState ("歌单");
const [isMarquee, setIsMarquee] = useState (false);// 是否跑马灯

const headerEl = useRef ();
// 传参修改如下:
<Header ref={headerEl} title={title} handleClick={handleBack} isMarquee={isMarquee}></Header>
```

接着可以加入滑动处理逻辑了:

```text
// 首先引入
import style from "../../assets/global-style";

export const HEADER_HEIGHT = 45;

const handleScroll = (pos) => {
  let minScrollY = -HEADER_HEIGHT;
  let percent = Math.abs (pos.y/minScrollY);
  let headerDom = headerEl.current;
  // 滑过顶部的高度开始变化
  if (pos.y < minScrollY) {
    headerDom.style.backgroundColor = style ["theme-color"];
    headerDom.style.opacity = Math.min (1, (percent-1)/2);
    setTitle (currentAlbum.name);
    setIsMarquee (true);
  } else {
    headerDom.style.backgroundColor = "";
    headerDom.style.opacity = 1;
    setTitle ("歌单");
    setIsMarquee (false);
  }
};

// 传递给 Scroll 组件
<Scroll bounceTop={false} onScroll={handleScroll}></Scroll>
```

OK, 现在静态页面的布局就已经基本完成了。接下来进入数据层的对接，大家加油！



# 歌单详情3 打通歌单数据层

> 本节代码对应 GitHub 分支: chapter6

[仓库传送门(opens new window)](https://github.com/sanyuan0704/react-cloud-music/tree/chapter6)

## axios 请求准备

在 api/request.js 中加入:

```text
export const getAlbumDetailRequest = id => {
  return axiosInstance.get (`/playlist/detail?id=${id}`);
};
```

## redux 层开发

### 1. 声明初始化 state

```text
//reducer.js
import * as actionTypes from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS ({
  currentAlbum: {},
  enterLoading: false,
})
```

### 2. 定义 constants

```text
//constants.js
export const CHANGE_CURRENT_ALBUM = 'album/CHANGE_CURRENT_ALBUM';
export const CHANGE_ENTER_LOADING = 'album/CHANGE_ENTER_LOADING';
```

### 3. 定义 reducer 函数

```text
//reducer.js
export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_CURRENT_ALBUM:
      return state.set ('currentAlbum', action.data);
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set ('enterLoading', action.data);
    default:
      return state;
  }
};
```

### 4. 编写具体的 action

```text
//actionCreators.js
import { CHANGE_CURRENT_ALBUM, CHANGE_ENTER_LOADING } from './constants';
import { getAlbumDetailRequest } from '../../../api/request';
import { fromJS } from 'immutable';

const changeCurrentAlbum = (data) => ({
  type: CHANGE_CURRENT_ALBUM,
  data: fromJS (data)
});

export const changeEnterLoading = (data) => ({
  type: CHANGE_ENTER_LOADING,
  data
});

export const getAlbumList = (id) => {
  return dispatch => {
    getAlbumDetailRequest (id).then (res => {
      let data = res.playlist;
      dispatch (changeCurrentAlbum (data));
      dispatch (changeEnterLoading (false));
    }).catch (() => {
      console.log ("获取 album 数据失败！")
    });
  }
};
```

### 5. 将相关变量导出

```text
//index.js
import reducer from './reducer'
import * as actionCreators from './actionCreators'

export { reducer, actionCreators };
```

## 组件连接 Redux

首先，需要将 Album 下的 reducer 注册到全局 store，在 src 目录下的 store/reducer.js 中，内容如下:

```text
import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../application/Recommend/store/index';
import { reducer as singersReducer } from '../application/Singers/store/index';
import { reducer as rankReducer } from '../application/Rank/store/index';
import { reducer as albumReducer } from '../application/Album/store/index';

export default combineReducers ({
  recommend: recommendReducer,
  singers: singersReducer ,
  rank: rankReducer,
  album: albumReducer
});
```

现在在 Album/index.js 中，准备连接 Redux。 增加代码:

```text
import { connect } from 'react-redux';

// 组件代码

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
  currentAlbum: state.getIn (['album', 'currentAlbum']),
  enterLoading: state.getIn (['album', 'enterLoading']),
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    getAlbumDataDispatch (id) {
      dispatch (changeEnterLoading (true));
      dispatch (getAlbumList (id));
    },
  }
};

// 将 ui 组件包装成容器组件
export default connect (mapStateToProps, mapDispatchToProps)(React.memo (Album));
```

## 组件对接真实数据

在组件代码中，

```text
import React, {useState, useCallback, useRef, useEffect} from 'react';
import { getAlbumList, changeEnterLoading } from './store/actionCreators';

// 从路由中拿到歌单的 id
const id = props.match.params.id;

const { currentAlbum:currentAlbumImmutable, enterLoading } = props;
const { getAlbumDataDispatch } = props;

useEffect (() => {
  getAlbumDataDispatch (id);
}, [getAlbumDataDispatch, id]);

// 同时将 mock 数据的代码删除
let currentAlbum = currentAlbumImmutable.toJS ();
```

但是如果你现在进入页面，会报一个错误: cannot read avatarUrl of undefined

这是为什么呢？

当页面进入 Ajax 请求还没有获取数据时，currentAlbum 的值为初始态 {}。直到数据异步加载完成，currentAlbum 才会改变，那么在这个过程中，通过 currentAlbum.creator 为 undefined，通过 current.creator.avatarUrl 取值自然会报错。这样的问题在日常开发中非常常见，那怎么避免这个问题？

我们需要在渲染前做一个非空对象的判断。

首先在 api/utils 中写一个工具函数：

```text
// 判断一个对象是否为空
export const isEmptyObject = obj => !obj || Object.keys (obj).length === 0;
```

然后自行导入到 Album 组件中。

组件中修改如下:

```text
{
  !isEmptyObject (currentAlbum) ? (
    <Scroll 
      onScroll={handleScroll} 
      bounceTop={false}
    >
    // 省略内部代码
    </Scroll>
  ) : null
}
```

这样页面就能正常显示啦。

## 进场 Loaing 动画添加

```text
import Loading from '../../baseUI/loading/index';

// 在 Container 样式组件中添加
{ enterLoading ? <Loading></Loading> : null}
```

到此为止，UI 和数据已经打通了，接下来我们来做一些优化。



# 代码封装及优化

> 本节代码对应 GitHub 分支: chapter6

[仓库传送门(opens new window)](https://github.com/sanyuan0704/react-cloud-music/tree/chapter6)

## 封装 UI 代码

现在 Album 里面的 JSX 过于庞大，影响可读性，可以做一下封装。

将复杂渲染的代码拆解如下:

```text
const renderTopDesc = () => {
  return (
    <TopDesc background={currentAlbum.coverImgUrl}>
      <div className="background">
        <div className="filter"></div>
      </div>
      <div className="img_wrapper">
        <div className="decorate"></div>
        <img src={currentAlbum.coverImgUrl} alt="" />
        <div className="play_count">
          <i className="iconfont play">&#xe885;</i>
          <span className="count">{getCount (currentAlbum.subscribedCount)}</span>
        </div>
      </div>
      <div className="desc_wrapper">
        <div className="title">{currentAlbum.name}</div>
        <div className="person">
          <div className="avatar">
            <img src={currentAlbum.creator.avatarUrl} alt="" />
          </div>
          <div className="name">{currentAlbum.creator.nickname}</div>
        </div>
      </div>
    </TopDesc>
  )
}

const renderMenu = () => {
  return (
    <Menu>
      <div>
        <i className="iconfont">&#xe6ad;</i>
        评论
      </div>
      <div>
        <i className="iconfont">&#xe86f;</i>
        点赞
      </div>
      <div>
        <i className="iconfont">&#xe62d;</i>
        收藏
      </div>
      <div>
        <i className="iconfont">&#xe606;</i>
        更多
      </div>
    </Menu>
  )
};

const renderSongList = () => {
  return (
    <SongList>
      <div className="first_line">
        <div className="play_all">
          <i className="iconfont">&#xe6e3;</i>
          <span > 播放全部 <span className="sum">(共 {currentAlbum.tracks.length} 首)</span></span>
        </div>
        <div className="add_list">
          <i className="iconfont">&#xe62d;</i>
          <span > 收藏 ({getCount (currentAlbum.subscribedCount)})</span>
        </div>
      </div>
      <SongItem>
        {
          currentAlbum.tracks.map ((item, index) => {
            return (
              <li key={index}>
                <span className="index">{index + 1}</span>
                <div className="info">
                  <span>{item.name}</span>
                  <span>
                    {getName (item.ar)} - {item.al.name}
                  </span>
                </div>
              </li>
            )
          })
        }
      </SongItem>
    </SongList>
  )
}

return (
  <CSSTransition
    in={showStatus}
    timeout={300}
    classNames="fly"
    appear={true}
    unmountOnExit
    onExited={props.history.goBack}
  >
    <Container>
      <Header ref={headerEl} title={title} handleClick={handleBack} isMarquee={isMarquee}></Header>
      {!isEmptyObject (currentAlbum) ?
        (
          <Scroll
            bounceTop={false}
            onScroll={handleScroll}
          >
            <div>
              { renderTopDesc () }
              { renderMenu () }
              { renderSongList () }
            </div>
          </Scroll>
        )
        : null
      }
      { enterLoading ? <Loading></Loading> : null}
    </Container>
  </CSSTransition>
)
```

这样整个返回的 JSX 代码就清爽了不少，给人一目了然的感觉。

## useCallback 优化 function props

将传给子组件的函数用 useCallback 包裹，这也是 useCallback 的常用场景。

```text
const handleBack = useCallback (() => {
  setShowStatus (false);
}, []);

const handleScroll = useCallback ((pos) => {
  //xxx
}, [currentAlbum]);
```

以此为例，如果不用 useCallback 包裹，父组件每次执行时会生成不一样的 handleBack 和 handleScroll 函数引用，那么子组件每一次 memo 的结果都会不一样，导致不必要的重新渲染，也就浪费了 memo 的价值。

因此 useCallback 能够帮我们在依赖不变的情况保持一样的函数引用，最大程度地节约浏览器渲染性能。

OK，歌单详情模块现在开发基本完成。



# 榜单详情组件一站式开发

> 本节代码对应 GitHub 分支: chapter6

[仓库传送门(opens new window)](https://github.com/sanyuan0704/react-cloud-music/tree/chapter6)

已经走到了这里，恭喜你完成了这一章最复杂的部分。推荐歌单详情都做完了，再来开发排行榜单详情就简直易如反掌了。

首先声明路由:

```text
//rank 部分 
{
  path: "/rank/",
  component: Rank,
  key: "rank",
  routes: [
    {
      path: "/rank/:id",
      component: Album
    }
  ]
},
```

在 Rank/index.js 中:

```text
// 之前排行歌单不存在的问题已经收到小伙伴的 pr，完美解决，因此直接拿到 id 跳转即可，无关代码已经在当前分支删除
// 实现跳转路由函数
const enterDetail = (detail) => {
  props.history.push (`/rank/${detail.id}`)
}

// 绑定事件
<ListItem key={item.coverImgId} tracks={item.tracks} onClick={() => enterDetail (item)}>
```

你没看错，排行榜单详情页这里就开发完了，这就是组件复用的威力。



# 歌手主页1 核心布局，组件基石

> 本节代码对应 GitHub 分支: chapter7

[仓库传送门(opens new window)](https://github.com/sanyuan0704/react-cloud-music/tree/chapter6)

## 改造路由

第一步当然是路由的准备工作。

在 routes/index.js 中，添加如下：

```text
import Singer from '../application/Singer';

//...
{
  path: "/singers",
  component: Singers,
  key: "singers",
  routes: [
    {
      path: "/singers/:id",
      component: Singer
    }
  ]
}
```

当然，我们需要新建 Singer 文件夹，其中的 index.js 如下：

```text
import React from 'react';

function Singer (props) {
  return (
    <div>Singer</div>
  )
}

export default Singer;
```

接下来我们需要在以前的歌手列表组件中添加以下跳转逻辑：

```text
const enterDetail = (id)  => {
  props.history.push (`/singers/${id}`);
};

//...
<ListItem key={item.accountId+""+index} onClick={() => enterDetail (item.id)}>
```

当然，不要忘了这一句，否则作为子路由下的 Singer 组件无法渲染:

```text
//Singers/index.js
import { renderRoutes } from 'react-router-config';

//...
return (
  <div>
    //...
    { renderRoutes (props.route.routes) }
  </div> 
)
```

## 路由跳转动画

由于之前详细拆解过，这里就不着重介绍了。

仍然是利用 react-transition-group。

```text
import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Container } from "./style";

function Singer (props) {
  const [showStatus, setShowStatus] = useState (true);

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => props.history.goBack ()}
    >
      <Container>
      </Container>
    </CSSTransition>
  )
}

export default Singer;
```

样式组件代码 style.js 现在构建如下:

```text
import styled from'styled-components';
import style from '../../assets/global-style';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: ${props => props.play > 0 ? "60px": 0};
  width: 100%;
  z-index: 100;
  overflow: hidden;
  background: #f2f3f4;
  transform-origin: right bottom;
  &.fly-enter, &.fly-appear {
    transform: rotateZ (30deg) translate3d (100%, 0, 0);
  }
  &.fly-enter-active, &.fly-appear-active {
    transition: transform .3s;
    transform: rotateZ (0deg) translate3d (0, 0, 0);
  }
  &.fly-exit {
    transform: rotateZ (0deg) translate3d (0, 0, 0);
  }
  &.fly-exit-active {
    transition: transform .3s;
    transform: rotateZ (30deg) translate3d (100%, 0, 0);
  }
`
```

## 核心布局开发

前方高能预警！

大家现在看线上的最终效果可能会感觉整个页面的布局和交互是非常流畅的，但殊不知，这背后凝结着诸多的技巧和细节的考量。你所看到的流畅的，其实是开发者背后无数的心血！之前的大部分布局一带而过，但是这部分的布局非常关键，格外重点拆解。相信大家跟着做下来一定会积累不少布局经验和技巧。

首先 mock 数据如下：

```text
const artist = {
  picUrl: "https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg",
  name: "薛之谦",
  hotSongs: [
    {
      name: "我好像在哪见过你",
      ar: [{name: "薛之谦"}],
      al: {
        name: "薛之谦专辑"
      }
    },
    {
      name: "我好像在哪见过你",
      ar: [{name: "薛之谦"}],
      al: {
        name: "薛之谦专辑"
      }
    },
    // 省略 20 条
  ]
}
```

返回的 JSX 结构如下:

```text
<CSSTransition
  in={showStatus}
  timeout={300}
  classNames="fly"
  appear={true}
  unmountOnExit
  onExited={() => props.history.goBack ()}
>
  <Container>
    <Header title={"头部"}></Header>
    <ImgWrapper bgUrl={artist.picUrl}>
      <div className="filter"></div>
    </ImgWrapper>
    <CollectButton>
      <i className="iconfont">&#xe62d;</i>
      <span className="text"> 收藏 </span>
    </CollectButton>
    <BgLayer></BgLayer>
    <SongListWrapper>
      // 歌曲列表部分，待会专门拆解
    </SongListWrapper>
  </Container>
</CSSTransition>
```

对应 style.js 中的各个样式组件代码如下，之后样式组件大家自行引入 index.js 中：

ImgWrapper 中有一个比较特殊的处理，将图片设为这个容器的背景，然后里面放置跟容器一样大的 div，这个 div 颜色偏深，来对图片的色调进行修饰。

```text
export const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 75%;
  transform-origin: top;
  background: url (${props => props.bgUrl});
  background-size: cover;
  z-index: 50;
  .filter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba (7, 17, 27, 0.3);
  }
`
```

CollectButton 即收藏的按钮，相对于 Container 绝对定位，以 left、right 各为 0，margin 设为 auto 的方式实现水平居中。

```text
export const CollectButton = styled.div`
  position: absolute;
  left: 0; right: 0;
  margin: auto;
  box-sizing: border-box;
  width: 120px;
  height: 40px;
  margin-top: -55px;
  z-index:50;
  background: ${style ["theme-color"]};
  color: ${style ["font-color-light"]};
  border-radius: 20px;
  text-align: center;
  font-size: 0;
  line-height: 40px;
  .iconfont {
    display: inline-block;
    margin-right: 10px;
    font-size: 12px;
    vertical-align: 1px;
  }
  .text {
    display: inline-block;
    font-size:14px;
    letter-spacing: 5px;
  }
`
```

歌曲列表容器，比较简单。

```text
export const SongListWrapper = styled.div`
  position: absolute;
  z-index: 50;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  >div {
    position: absolute;
    left: 0;
    width: 100%;
    overflow: visible;
  }
`
```

白色背景遮罩，是本部分的亮点。等会把歌曲列表开发完成就能体会到它的用处了。

```text
export const BgLayer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: white;
  border-radius: 10px;
  z-index: 50;
`
```

## 歌曲列表组件重构

之前在推荐歌单部分，我们用到了歌曲列表，这里我们可以把这样的列表抽离出来，做一下组件的复用。

application 目录下新建 SongList 组件 (由于之后和播放器组件的数据交互较多，我们放到 application 目录)

```text
import React from 'react';
import { SongList, SongItem } from "./style";
import { getName } from '../../api/utils';

const SongsList = React.forwardRef ((props, refs)=> {

  const { collectCount, showCollect, songs } = props;

  const totalCount = songs.length;

  const selectItem = (e, index) => {
    console.log (index);
  }

  let songList = (list) => {
    let res = [];
    for (let i = 0; i < list.length; i++) {
      let item = list [i];
      res.push (
        <li key={item.id} onClick={(e) => selectItem (e, i)}>
          <span className="index">{i + 1}</span>
          <div className="info">
            <span>{item.name}</span>
            <span>
              { item.ar ? getName (item.ar): getName (item.artists) } - { item.al ? item.al.name : item.album.name}
            </span>
          </div>
        </li>
      )
    }
    return res;
  };

  const collect = (count) => {
    return  (
      <div className="add_list">
        <i className="iconfont">&#xe62d;</i>
        <span > 收藏 ({Math.floor (count/1000)/10} 万)</span>
      </div>
    )
  };
  return (
    <SongList ref={refs} showBackground={props.showBackground}>
      <div className="first_line">
        <div className="play_all" onClick={(e) => selectItem (e, 0)}>
          <i className="iconfont">&#xe6e3;</i>
          <span > 播放全部 <span className="sum">(共 {totalCount} 首)</span></span>
        </div>
        { showCollect ? collect (collectCount) : null}
      </div>
      <SongItem>
        { songList (songs) }
      </SongItem>
    </SongList>
  )
});

export default React.memo (SongsList);
```

它的样式代码之前已经写过了，不过有一些参数的处理，稍作修改如下:

```text
import styled from'styled-components';
import style from '../../assets/global-style';

export const SongList = styled.div`
  border-radius: 10px;
  opacity: 0.98;
  // 注意在这里背景改为自配置参数控制
  ${props => props.showBackground ? `background: ${style ["highlight-background-color"]}`: ""}
  .first_line {
    box-sizing: border-box;
    padding: 10px 0;
    margin-left: 10px;
    position: relative;
    justify-content: space-between;
    border-bottom: 1px solid ${style ["border-color"]};
    .play_all {
      display: inline-block;
      line-height: 24px;
      color: ${style ["font-color-desc"]};
      .iconfont {
        font-size: 24px;
        margin-right: 10px;
        vertical-align: top;
      }
      .sum {
        font-size: ${style ["font-size-s"]};
        color: ${style ["font-color-desc-v2"]};
      }
      >span {
        vertical-align: top;
      }
    }
    .add_list,.isCollected {
      display: flex;
      align-items: center;
      position: absolute;
      right: 0; top :0; bottom: 0;
      width: 130px;
      line-height: 34px;
      background: ${style ["theme-color"]};
      color: ${style ["font-color-light"]};
      font-size: 0;
      border-radius: 3px;
      vertical-align: top;
      .iconfont {
        vertical-align: top;
        font-size: 10px;
        margin: 0 5px 0 10px;
      }
      span {
        font-size: 14px;
        line-height: 34px;
      }
    }
    .isCollected {
      display: flex;
      background: ${style ["background-color"]};
      color: ${style ["font-color-desc"]};
    }
}
`
export const SongItem = styled.ul`
  >li {
    display: flex;
    height: 60px;
    align-items: center;  
    .index {
      flex-basis: 60px;
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
    .info {
      box-sizing: border-box;
      flex: 1;
      display: flex;
      height: 100%;
      padding: 5px 0;
      flex-direction: column;
      justify-content: space-around;
      border-bottom: 1px solid ${style ["border-color"]};
      ${style.noWrap ()}
      >span {
        ${style.noWrap ()}
      }
      >span:first-child {
        color: ${style ["font-color-desc"]};
      }
      >span:last-child {
        font-size: ${style ["font-size-s"]};
        color: #bba8a8;
      }
    }
  }
`
```

当然组件封装之后，可以在原来的歌单详情中复用，这里我偷个懒，让大家下去自己完成，相信对现在的你而言也是非常容易的事情了。

## 关于 UI 的代码整理

首先亮出 Singer 组件目前的代码:

```text
import React, { useState, useEffect, useRef, useCallback } from "react";
import { CSSTransition } from "react-transition-group";
import { Container } from "./style";
import { ImgWrapper, CollectButton, SongListWrapper, BgLayer } from "./style";
import Header from "../../baseUI/header/index";
import Scroll from "../../baseUI/scroll/index";
import SongsList from "../SongsList";

function Singer (props) {
  const [showStatus, setShowStatus] = useState (true);

  const artist = {
    picUrl: "https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg",
    name: "薛之谦",
    hotSongs: [
      {
        name: "我好像在哪见过你",
        ar: [{name: "薛之谦"}],
        al: {
          name: "薛之谦专辑"
        }
      },
      {
        name: "我好像在哪见过你",
        ar: [{name: "薛之谦"}],
        al: {
          name: "薛之谦专辑"
        }
      // 省略 20 条
    ]
  };

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => props.history.goBack ()}
    >
      <Container>
        <Header title={"头部"}></Header>
        <ImgWrapper bgUrl={artist.picUrl}>
          <div className="filter"></div>
        </ImgWrapper>
        <CollectButton>
          <i className="iconfont">&#xe62d;</i>
          <span className="text"> 收藏 </span>
        </CollectButton>
        {/* <BgLayer></BgLayer> */}
        <SongListWrapper>
          <Scroll>
            <SongsList
              songs={artist.hotSongs}
              showCollect={false}
            ></SongsList>
          </Scroll>
        </SongListWrapper>
      </Container>
    </CSSTransition>
  )
}

export default Singer;
```

接下来以此为基础来进行渐进式开发。

由于歌曲列表是相对于 Container 绝对定位且 top 为 0，因此初始化时，我们将歌曲列表的 top 设置为整个图片的高度，正好处在图片下方，不然列表就会与图片重叠。

```text
// 记得引入相关 hooks 函数，下不赘述

//...

const collectButton = useRef ();
const imageWrapper = useRef ();
const songScrollWrapper = useRef ();
const songScroll = useRef ();
const header = useRef ();
const layer = useRef ();
// 图片初始高度
const initialHeight = useRef (0);

// 往上偏移的尺寸，露出圆角
const OFFSET = 5;

useEffect (() => {
  let h = imageWrapper.current.offsetHeight;
  songScrollWrapper.current.style.top = `${h - OFFSET} px`;
  initialHeight.current = h;
  // 把遮罩先放在下面，以裹住歌曲列表
  layer.current.style.top = `${h - OFFSET} px`;
  songScroll.current.refresh ();
  //eslint-disable-next-line
}, []);

const setShowStatusFalse = useCallback (() => {
  setShowStatus (false);
}, []);

//JSX
<Container>
  <Header
    handleClick={setShowStatusFalse}
    title={artist.name}
    ref={header}
  ></Header>
  <ImgWrapper ref={imageWrapper} bgUrl={artist.picUrl}>
    <div className="filter"></div>
  </ImgWrapper>
  <CollectButton ref={collectButton}>
    <i className="iconfont">&#xe62d;</i>
    <span className="text"> 收藏 </span>
  </CollectButton>
  <BgLayer ref={layer}></BgLayer>
  <SongListWrapper ref={songScrollWrapper}>
    <Scroll ref={songScroll}>
      <SongsList
        songs={artist.hotSongs}
        showCollect={false}
      ></SongsList>
    </Scroll>
  </SongListWrapper>
</Container>
```

好，现在静态页面的部分已经开发的差不多了。但是作为一个精美的 web 应用，绝不是仅仅靠布局就能体现 "精美" 二字的。接下来，我们就来完成略微有些复杂的以 JS 为主的交互逻辑。



# 歌手主页2 交互逻辑，精益求精

> 本节代码对应 GitHub 分支: chapter7

[仓库传送门(opens new window)](https://github.com/sanyuan0704/react-cloud-music/tree/chapter7)

## 交互逻辑实现

JS 交互主要是滑动屏幕时的逻辑，现在有了 scroll 基础组件，我们可以直接写在 onScroll 的回调中。

```text
<Scroll onScroll={handleScroll} ref={songScroll}>
//...
```

这里面需要一些 DOM 操作，我们先把 DOM 对象取出来。

```text
import { HEADER_HEIGHT } from "./../../api/config";
const handleScroll = pos => {
    let height = initialHeight.current;
    const newY = pos.y;
    const imageDOM = imageWrapper.current;
    const buttonDOM = collectButton.current;
    const headerDOM = header.current;
    const layerDOM = layer.current;
    const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;

    // 指的是滑动距离占图片高度的百分比
    const percent = Math.abs (newY /height);

}
```

说明：在歌手页的布局中，歌单列表其实是没有自己的背景的，layerDOM 其实是起一个遮罩的作用，给歌单内容提供白色背景 因此在处理的过程中，随着内容的滚动，遮罩也跟着移动。

滑动主要分三种情况:

1. 处理往下拉的情况，效果：图片放大，按钮跟着偏移

```text
if (newY > 0) {
  imageDOM.style ["transform"] = `scale (${1 + percent})`;
  buttonDOM.style ["transform"] = `translate3d (0, ${newY}px, 0)`;
  layerDOM.style.top = `${height - OFFSET + newY}px`;
} 
```

1. 往上滑动，但是遮罩还没超过 Header 部分

```text
else if (newY >= minScrollY) {
  layerDOM.style.top = `${height - OFFSET - Math.abs (newY)}px`;
  // 这时候保证遮罩的层叠优先级比图片高，不至于被图片挡住
  layerDOM.style.zIndex = 1;
  imageDOM.style.paddingTop = "75%";
  imageDOM.style.height = 0;
  imageDOM.style.zIndex = -1;
  // 按钮跟着移动且渐渐变透明
  buttonDOM.style ["transform"] = `translate3d (0, ${newY}px, 0)`;
  buttonDOM.style ["opacity"] = `${1 - percent * 2}`;
} 
```

1. 往上滑动，但是遮罩超过 Header 部分

```text
else if (newY < minScrollY) {
  // 往上滑动，但是超过 Header 部分
  layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`;
  layerDOM.style.zIndex = 1;
  // 防止溢出的歌单内容遮住 Header
  headerDOM.style.zIndex = 100;
  // 此时图片高度与 Header 一致
  imageDOM.style.height = `${HEADER_HEIGHT}px`;
  imageDOM.style.paddingTop = 0;
  imageDOM.style.zIndex = 99;
}
```

现在终于可以达到一个比较好的交互效果了。但是别忘了，handleScroll 作为一个传给子组件的方法，我们需要用 useCallback 进行包裹，防止不必要的重渲染。

```text
const handleScroll = useCallback (pos => {
  // 具体代码
}, []);
```



# 歌手主页3 组件接轨业务数据流

> 本节代码对应 GitHub 分支: chapter7

[仓库传送门(opens new window)](https://github.com/sanyuan0704/react-cloud-music/tree/chapter7)

## axios 请求准备

```text
//api/request.js
export const getSingerInfoRequest = id => {
  return axiosInstance.get (`/artists?id=${id}`);
};
```

## redux 层开发

### 1. 声明初始化 state

```text
//store/reducer.js
import * as actionTypes from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS ({
  artist: {},
  songsOfArtist: [],
  loading: true
});
```

### 2. 定义 constants

```text
//store/constants.js
export const CHANGE_ARTIST = 'singer/CHANGE_ARTIST';
export const CHANGE_SONGS_OF_ARTIST = 'singer/CHANGE_SONGS_OF_ARTIST';
export const CHANGE_ENTER_LOADING = 'singer/CHNAGE_ENTER_LOADING';
```

### 3. 定义 reducer 函数

```text
//store/reducer.js
export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_ARTIST:
      return state.set ('artist', action.data);
    case actionTypes.CHANGE_SONGS_OF_ARTIST:
      return state.set ('songsOfArtist', action.data);
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set ('loading', action.data);
    default:
      return state;
  }
}
```

### 4. 编写具体的 action

```text
import { CHANGE_SONGS_OF_ARTIST, CHANGE_ARTIST, CHANGE_ENTER_LOADING } from './constants';
import { fromJS } from 'immutable';
import { getSingerInfoRequest } from './../../../api/request';

const changeArtist = (data) => ({
  type: CHANGE_ARTIST,
  data: fromJS (data)
});

const changeSongs = (data) => ({
  type: CHANGE_SONGS_OF_ARTIST,
  data: fromJS (data)
})
export const changeEnterLoading = (data) => ({
  type: CHANGE_ENTER_LOADING,
  data
})

export const getSingerInfo = (id) => {
  return dispatch => {
    getSingerInfoRequest (id).then (data => {
      dispatch (changeArtist (data.artist));
      dispatch (changeSongs (data.hotSongs));
      dispatch (changeEnterLoading (false));
    })
  }
}
```

### 5. 将相关变量导出

```text
//index.js
import reducer from './reducer'
import * as actionCreators from './actionCreators'

export { reducer, actionCreators };
```

## 组件连接 Redux

首先，需要将 Singer 下的 reducer 注册到全局 store，在 src 目录下的 store/reducer.js 中，内容如下:

```text
import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../application/Recommend/store/index';
import { reducer as singersReducer } from '../application/Singers/store/index';
import { reducer as rankReducer } from '../application/Rank/store/index';
import { reducer as albumReduimport { reducer as singerInfoReducer } from "../application/Singer/store/index";
import { reducer as singerInfoReducer } from "../application/Singer/store/index";

export default combineReducers ({
  recommend: recommendReducer,
  singers: singersReducer ,
  rank: rankReducer,
  album: albumReducer,
  singerInfo: singerInfoReducer
});
```

现在在 Singer/index.js 中，准备连接 Redux。增加代码：

```text
import { connect } from 'react-redux';
import { getSingerInfo, changeEnterLoading } from "./store/actionCreators";

// 组件代码省略

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = state => ({
  artist: state.getIn (["singerInfo", "artist"]),
  songs: state.getIn (["singerInfo", "songsOfArtist"]),
  loading: state.getIn (["singerInfo", "loading"]),
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = dispatch => {
  return {
    getSingerDataDispatch (id) {
      dispatch (changeEnterLoading (true));
      dispatch (getSingerInfo (id));
    }
  };
};

// 将 ui 组件包装成容器组件
export default connect (mapStateToProps,mapDispatchToProps)(React.memo (Singer));
```

同时组件代码做如下添加:

```text
// 记得删除 mock 数据

const { 
  artist: immutableArtist, 
  songs: immutableSongs, 
  loading,
} = props;

const { getSingerDataDispatch } = props;

const artist = immutableArtist.toJS ();
const songs = immutableSongs.toJS ();
```

同时 SongList 组件中传入的 songs 参数应该改为现在从 redux 取得的 songs 变量。

## 组件对接真实数据

很简单，我们在 useEffect 中添加请求代码即可:

```text
useEffect (() => {
  const id = props.match.params.id;
  getSingerDataDispatch (id);
  // 之前写的 UI 处理逻辑省略
}, []);
```

## 添加 loading

```text
import Loading from "./../../baseUI/loading/index";

return (
  //Container 组件下面
  { loading ? (<Loading></Loading>) : null}
)
```

至此，一个精美的歌手详情页就打造完成了。恭喜你，又解锁了一个新的模块。

下一章，我们开始本项目最复杂、最具有挑战性的模块：播放器模块开发。大家加油！



# 播放器1 开发前热身

> 本节代码对应 GitHub 分支: chapter8

[仓库传送门(opens new window)](https://github.com/sanyuan0704/react-cloud-music/tree/chapter8)

终于，我们进入了最精彩的环节，也是最有挑战的模块 ———— 播放器开发。

之前在不断地重构、更新代码，经过`组件拆分`、`代码解耦`，最后理想的版本终于打造完成。接下来给大家呈现的也是最后一版的代码，每个组件的代码尽量控制在了 300 行以内，而不是在第一版那样近千行代码挤在一个文件，非常不利于维护。

播放器是一个比较特别的组件，里面并没有涉及到 Ajax 的操作，反而全程都在**依赖 store 里面的数据**。因从，我们从数据层开始准备是一个比较明智的选择。

application 目录下新建 Player 文件夹，然后新建 store 目录，开始 redux 层的开发。

## 1. 声明初始化 state

```text
//store/reducer.js
import * as actionTypes from './constants';
import {fromJS} from 'immutable';
import { playMode } from './../../../api/config';

const defaultState = fromJS ({
  fullScreen: false,// 播放器是否为全屏模式
  playing: false, // 当前歌曲是否播放
  sequencePlayList: [], // 顺序列表 (因为之后会有随机模式，列表会乱序，因从拿这个保存顺序列表)
  playList: [],
  mode: playMode.sequence,// 播放模式
  currentIndex: -1,// 当前歌曲在播放列表的索引位置
  showPlayList: false,// 是否展示播放列表
  currentSong: {} 
});
```

注意 playMode 对象应该在 api/config.js 中定义，

```text
// 播放模式
export const playMode = {
  sequence: 0,
  loop: 1,
  random: 2
};
```

## 2. 定义 constants

```text
//store/constants.js
export const SET_CURRENT_SONG = 'player/SET_CURRENT_SONG';
export const SET_FULL_SCREEN = 'player/SET_FULL_SCREEN';
export const SET_PLAYING_STATE = 'player/SET_PLAYING_STATE';
export const SET_SEQUECE_PLAYLIST = 'player/SET_SEQUECE_PLAYLIST';
export const SET_PLAYLIST = 'player/SET_PLAYLIST';
export const SET_PLAY_MODE = 'player/SET_PLAY_MODE';
export const SET_CURRENT_INDEX = 'player/SET_CURRENT_INDEX';
export const SET_SHOW_PLAYLIST = 'player/SET_SHOW_PLAYLIST';
```

## 3. 定义 reducer 函数

```text
//store/reducer.js
export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_SONG:
      return state.set ('currentSong', action.data);
    case actionTypes.SET_FULL_SCREEN:
      return state.set ('fullScreen', action.data);
    case actionTypes.SET_PLAYING_STATE:
      return state.set ('playing', action.data);
    case actionTypes.SET_SEQUECE_PLAYLIST:
      return state.set ('sequencePlayList', action.data);
    case actionTypes.SET_PLAYLIST:
      return state.set ('playList', action.data);
    case actionTypes.SET_PLAY_MODE:
      return state.set ('mode', action.data);
    case actionTypes.SET_CURRENT_INDEX:
      return state.set ('currentIndex', action.data);
    case actionTypes.SET_SHOW_PLAYLIST:
      return state.set ('showPlayList', action.data);
    default:
      return state;
  }
}
```

## 4. 编写具体的 action

```text
//store/actionCreators.js
import { SET_CURRENT_SONG, SET_FULL_SCREEN, SET_PLAYING_STATE, SET_SEQUECE_PLAYLIST, SET_PLAYLIST, SET_PLAY_MODE, SET_CURRENT_INDEX, SET_SHOW_PLAYLIST, DELETE_SONG, INSERT_SONG } from './constants';
import { fromJS } from 'immutable';

export const changeCurrentSong = (data) => ({
  type: SET_CURRENT_SONG,
  data: fromJS (data)
});

export const changeFullScreen =  (data) => ({
  type: SET_FULL_SCREEN,
  data
});

export const changePlayingState = (data) => ({
  type: SET_PLAYING_STATE,
  data
});

export const changeSequecePlayList = (data) => ({
  type: SET_SEQUECE_PLAYLIST,
  data: fromJS (data)
});

export const changePlayList  = (data) => ({
  type: SET_PLAYLIST,
  data: fromJS (data)
});

export const changePlayMode = (data) => ({
  type: SET_PLAY_MODE,
  data
});

export const changeCurrentIndex = (data) => ({
  type: SET_CURRENT_INDEX,
  data
});

export const changeShowPlayList = (data) => ({
  type: SET_SHOW_PLAYLIST,
  data
});
```

## 5. 将相关变量导出

```text
//store/index.js
import reducer from './reducer'
import * as actionCreators from './actionCreators'
import * as constants from './constants'

export { reducer, actionCreators, constants };
```

然后在全局 store 注册：

```text
//store/reducer.js
import { reducer as playerReducer } from "../application/Player/store/index";

export default combineReducers ({
  //...
  player: playerReducer
});
```

## 播放器组件连接数据

```text
//Player/index.js
import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  changePlayingState,
  changeShowPlayList,
  changeCurrentIndex,
  changeCurrentSong,
  changePlayList,
  changePlayMode,
  changeFullScreen
} from "./store/actionCreators";

function Player (props) {
  return (
    <div>Player</div>
  )
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = state => ({
  fullScreen: state.getIn (["player", "fullScreen"]),
  playing: state.getIn (["player", "playing"]),
  currentSong: state.getIn (["player", "currentSong"]),
  showPlayList: state.getIn (["player", "showPlayList"]),
  mode: state.getIn (["player", "mode"]),
  currentIndex: state.getIn (["player", "currentIndex"]),
  playList: state.getIn (["player", "playList"]),
  sequencePlayList: state.getIn (["player", "sequencePlayList"])
});

// 映射 dispatch 到 props 上
const mapDispatchToProps = dispatch => {
  return {
    togglePlayingDispatch (data) {
      dispatch (changePlayingState (data));
    },
    toggleFullScreenDispatch (data) {
      dispatch (changeFullScreen (data));
    },
    togglePlayListDispatch (data) {
      dispatch (changeShowPlayList (data));
    },
    changeCurrentIndexDispatch (index) {
      dispatch (changeCurrentIndex (index));
    },
    changeCurrentDispatch (data) {
      dispatch (changeCurrentSong (data));
    },
    changeModeDispatch (data) {
      dispatch (changePlayMode (data));
    },
    changePlayListDispatch (data) {
      dispatch (changePlayList (data));
    }
  };
};

// 将 ui 组件包装成容器组件
export default connect (
  mapStateToProps,
  mapDispatchToProps
)(React.memo (Player));
```

如果现在还看不到这个组件，可不要感到奇怪，仅仅凭经验就知道这个组件还并没有注册到全局。这里播放器组件比较特殊，没有专门的路由，也就是说，它会作为一个全局性的组件存在。让我们在 Home 组件来引入:

```text
import Player from '../Player';

return (
  //...
  //renderRoute 下面
  <Player></Player>
)
```

现在你如果进入到某个页面，比如排行榜页，就能看到 Player 组件了。内容已经出现，样式之后再调整。

![img](https://img-repo.poetries.top/images/16e07fd3ba3ffeb7.jpeg)

接下来我们来把基础 UI 构建一波。



# 播放器2 布局_动画各个击破

> 本节代码对应 GitHub 分支: chapter8

[仓库传送门(opens new window)](https://github.com/sanyuan0704/react-cloud-music/tree/chapter8)

## 迷你版布局



首先在 Player 目录下新建 miniPlayer 子目录，

```text
//miniPlayer/index.js
import React from 'react';
import {getName} from '../../../api/utils';
import { MiniPlayerContainer } from './style';

function MiniPlayer (props) {
  const { song } = props;
  return (
      <MiniPlayerContainer>
        <div className="icon">
          <div className="imgWrapper">
            <img className="play" src={song.al.picUrl} width="40" height="40" alt="img"/>
          </div>
        </div>
        <div className="text">
          <h2 className="name">{song.name}</h2>
          <p className="desc">{getName (song.ar)}</p>
        </div>
        <div className="control">
          <i className="iconfont">&#xe650;</i>
        </div>
        <div className="control">
          <i className="iconfont">&#xe640;</i>
        </div>
      </MiniPlayerContainer>
  )
}

export default React.memo (MiniPlayer);
```

样式组件对应如下，在 style.js 中：

```text
import styled, {keyframes} from'styled-components';
import style from '../../../assets/global-style';

const rotate = keyframes`
  0%{
    transform: rotate (0);
  }
  100%{
    transform: rotate (360deg);
  }
`

export const MiniPlayerContainer = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  height: 60px;
  background: ${style ["highlight-background-color"]};
  &.mini-enter {
    transform: translate3d (0, 100%, 0);
  }
  &.mini-enter-active {
    transform: translate3d (0, 0, 0);
    transition: all 0.4s;
  }
  &.mini-exit-active {
    transform: translate3d (0, 100%, 0);
    transition: all .4s
  }
  .icon {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    padding: 0 10px 0 20px;
    .imgWrapper {
      width: 100%;
      height: 100%;
      img {
        border-radius: 50%;
        &.play {
          animation: ${rotate} 10s infinite;
          &.pause {
            animation-play-state: paused;
          }
        }
      }
    }
  }
  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    .name {
      margin-bottom: 2px;
      font-size: ${style ["font-size-m"]};
      color: ${style ["font-color-desc"]};
      ${style.noWrap ()}
    }
    .desc {
      font-size: ${style ["font-size-s"]};
      color: ${style ["font-color-desc-v2"]};
      ${style.noWrap ()}
    }
  }
  .control {
    flex: 0 0 30px;
    padding: 0 10px;
    .iconfont, .icon-playlist {
      font-size: 30px;
      color: ${style ["theme-color"]};
    }
    .icon-mini {
      font-size: 16px;
      position: absolute;
      left: 8px;
      top: 8px;
      &.icon-play {
        left: 9px
      }
    }
  }
`
```

当然，在 Player/index.js 下也要做一些修改:

```text
//Player/index.js 修改内容如下
import MiniPlayer from './miniPlayer';

function Player (props) {
  const currentSong = {
    al: { picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg" },
    name: "木偶人",
    ar: [{name: "薛之谦"}]
  }
  return (
    <div>
      <MiniPlayer song={currentSong}/>
    </div>
  )
}

//...
```

现在大家能看到的应该是这个样子了。

![img](https://img-repo.poetries.top/images/16e08012af8aa18f.jpeg)

这里暂停按钮比较单调，因为没有包括进度条，这个组件下一节来开发，现在先用图标代替。

miniPlayer 的布局就这些，还算比较简单，我们现在马上过渡到全屏版本的布局中。

## 全屏版布局



给大家整理了一下，现在大致的布局是这样。

```text
//normalPlayer/index.js
import React from "react";
import {  getName } from "../../../api/utils";
import {
  NormalPlayerContainer,
  Top,
  Middle,
  Bottom,
  Operators,
  CDWrapper,
} from "./style";

function NormalPlayer (props) {
  const {song} =  props;
  return (
    <NormalPlayerContainer>
      <div className="background">
        <img
          src={song.al.picUrl + "?param=300x300"}
          width="100%"
          height="100%"
          alt="歌曲图片"
        />
      </div>
      <div className="background layer"></div>
      <Top className="top">
        <div className="back">
          <i className="iconfont icon-back">&#xe662;</i>
        </div>
        <h1 className="title">{song.name}</h1>
        <h1 className="subtitle">{getName (song.ar)}</h1>
      </Top>
      <Middle>
        <CDWrapper>
          <div className="cd">
            <img
              className="image play"
              src={song.al.picUrl + "?param=400x400"}
              alt=""
            />
          </div>
        </CDWrapper>
      </Middle>
      <Bottom className="bottom">
        <Operators>
          <div className="icon i-left" >
            <i className="iconfont">&#xe625;</i>
          </div>
          <div className="icon i-left">
            <i className="iconfont">&#xe6e1;</i>
          </div>
          <div className="icon i-center">
            <i className="iconfont">&#xe723;</i>
          </div>
          <div className="icon i-right">
            <i className="iconfont">&#xe718;</i>
          </div>
          <div className="icon i-right">
            <i className="iconfont">&#xe640;</i>
          </div>
        </Operators>
      </Bottom>
    </NormalPlayerContainer>
  );
}
export default React.memo (NormalPlayer);
```

相应的 style.js 如下：

```text
import styled, { keyframes } from "styled-components";
import style from "../../../assets/global-style";

const rotate = keyframes`
  0%{
    transform: rotate (0);
  }
  100%{
    transform: rotate (360deg);
  }
`;
export const NormalPlayerContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 150;
  background: ${style ["background-color"]};
  .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.6;
    filter: blur (20px);
    &.layer {
      background: ${style ["font-color-desc"]};
      opacity: 0.3;
      filter: none;
    }
  }
`;
export const Top = styled.div`
  position: relative;
  margin-bottom: 25px;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;
    .iconfont {
      display: block;
      padding: 9px;
      font-size: 24px;
      color: ${style ["font-color-desc"]};
      font-weight: bold;
      transform: rotate (90deg);
    }
  }
  .title {
    width: 70%;
    margin: 0 auto;
    line-height: 40px;
    text-align: center;
    font-size: ${style ["font-size-l"]};
    color: ${style ["font-color-desc"]};
    ${style.noWrap ()};
  }
  .subtitle {
    line-height: 20px;
    text-align: center;
    font-size: ${style ["font-size-m"]};
    color: ${style ["font-color-desc-v2"]};
    ${style.noWrap ()};
  }
`;
export const Middle = styled.div`
  position: fixed;
  width: 100%;
  top: 80px;
  bottom: 170px;
  white-space: nowrap;
  font-size: 0;
  overflow: hidden;
`;
export const CDWrapper = styled.div`
  position: absolute;
  margin: auto;
  top: 10%;
  left: 0;
  right: 0;
  width: 80%;
  box-sizing: border-box;
  height: 80vw;
  .cd {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    .image {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid rgba (255, 255, 255, 0.1);
    }
    .play {
      animation: ${rotate} 20s linear infinite;
      &.pause {
        animation-play-state: paused;
      }
    }
  }
  .playing_lyric {
    margin-top: 20px;
    font-size: 14px;
    line-height: 20px;
    white-space: normal;
    text-align: center;
    color: rgba (255, 255, 255, 0.5);
  }
`;

export const Bottom = styled.div`
  position: absolute;
  bottom: 50px;
  width: 100%;
`;
export const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin: 0px auto;
  padding: 10px 0;
  .time {
    color: ${style ["font-color-desc"]};
    font-size: ${style ["font-size-s"]};
    flex: 0 0 30px;
    line-height: 30px;
    width: 30px;
    &.time-l {
      text-align: left;
    }
    &.time-r {
      text-align: right;
    }
  }
  .progress-bar-wrapper {
    flex: 1;
  }
`;
export const Operators = styled.div`
  display: flex;
  align-items: center;
  .icon {
    font-weight: 300;
    flex: 1;
    color: ${style ["font-color-desc"]};
    &.disable {
      color: ${style ["theme-color-shadow"]};
    }
    i {
      font-weight: 300;
      font-size: 30px;
    }
  }
  .i-left {
    text-align: right;
  }
  .i-center {
    padding: 0 20px;
    text-align: center;
    i {
      font-size: 40px;
    }
  }
  .i-right {
    text-align: left;
  }
  .icon-favorite {
    color: ${style ["theme-color"]};
  }
`;
```

现在大家可以看到基本的布局啦。如下图，并且唱片部分正在旋转:

![img](https://img-repo.poetries.top/images/16e07fd7d482ba80.jpeg)

其实这部分的布局相对之前的几个组件还是相当简单的，不做赘述了，我们把重心放在后面更出彩的部分 ———— 进出场动画。

## 全屏版进场动画



### 引入状态

既然是要进场，那就必须涉及到状态的改变了，具体来说我们现在需要拿出 redux 中的 fullScreen 并做相应的改变。

由于父组件连接了 redux，现在 normalPlayer 只需从父组件接受相应的变量和方法即可。

首先在父组件中传 props:

```text
function Player (props) {
  const { fullScreen } = props;

  const { toggleFullScreenDispatch } = props;

  //...
  return (
    <div> 
      <MiniPlayer
        song={currentSong}
        fullScreen={fullScreen}
        toggleFullScreen={toggleFullScreenDispatch}
      />
      <NormalPlayer 
        song={currentSong}
        fullScreen={fullScreen}
        toggleFullScreen={toggleFullScreenDispatch}
      />
    </div>
  )
}
```

然后在 normalPlayer 中接收。

```text
const { song, fullScreen } =  props;
const { toggleFullScreenDispatch } = props;

return (
  <CSSTransition
    classNames="normal"
    in={fullScreen}
    timeout={400}
    mountOnEnter
    //onEnter={enter}
    //onEntered={afterEnter}
    //onExit={leave}
    //onExited={afterLeave}
  >
  // 组件代码
  </CSSTransition>
)
```

当然，这里的钩子函数还没有定义。因为还有一些准备工作需要提前做一下。

### 准备工作

首先 miniPlayer 里面，当 fullScreen 为 false 的时候应该不显示，我们也可以运用一下 CSSTransition：

```text
// 引入 useRef

const miniPlayerRef = useRef ();

return (
  <CSSTransition 
    in={!fullScreen} 
    timeout={400} 
    classNames="mini" 
    onEnter={() => {
      miniPlayerRef.current.style.display = "flex";
    }}
    onExited={() => {
      miniPlayerRef.current.style.display = "none";
    }}
  >
    <MiniPlayerContainer ref={miniPlayerRef} onClick={() => toggleFullScreen (true)}>
      // 其余代码不变 
    </MiniPlayerContainer>
  </CSSTransition>
)
```

关于 mini 动画钩子类在 style.js 中如下声明:

```text
//NormalPlayerContainer 组件下
&.mini-enter {
  transform: translate3d (0, 100%, 0);
}
&.mini-enter-active {
  transform: translate3d (0, 0, 0);
  transition: all 0.4s;
}
&.mini-exit-active {
  transform: translate3d (0, 100%, 0);
  transition: all .4s
}
```

这样实现了 miniPlayer 进出的过渡效果。

接下来需要用到 JS 的帧动画插件 create-keyframe-animation

```text
npm install create-keyframe-animation --save
```

### JS 实现帧动画

```text
接下来高能预警！
```

先拿到一些关键元素的 DOM 对象。

```text
const normalPlayerRef = useRef ();
const cdWrapperRef = useRef ();
```

分别对应：

```text
<NormalPlayerContainer ref={normalPlayerRef}>
//...
  <Middle ref={cdWrapperRef}>
```

现在，来开始着手写动画钩子的逻辑。

```text
// 引入的代码
import animations from "create-keyframe-animation";

// 启用帧动画
const enter = () => {
  normalPlayerRef.current.style.display = "block";
  const { x, y, scale } = _getPosAndScale ();// 获取 miniPlayer 图片中心相对 normalPlayer 唱片中心的偏移
  let animation = {
    0: {
      transform: `translate3d (${x} px,${y} px,0) scale (${scale})`
    },
    60: {
      transform: `translate3d (0, 0, 0) scale (1.1)`
    },
    100: {
      transform: `translate3d (0, 0, 0) scale (1)`
    }
  };
  animations.registerAnimation ({
    name: "move",
    animation,
    presets: {
      duration: 400,
      easing: "linear"
    }
  });
  animations.runAnimation (cdWrapperRef.current, "move");
};

// 计算偏移的辅助函数
const _getPosAndScale = () => {
  const targetWidth = 40;
  const paddingLeft = 40;
  const paddingBottom = 30;
  const paddingTop = 80;
  const width = window.innerWidth * 0.8;
  const scale = targetWidth /width;
  // 两个圆心的横坐标距离和纵坐标距离
  const x = -(window.innerWidth/ 2 - paddingLeft);
  const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
  return {
    x,
    y,
    scale
  };
};
const afterEnter = () => {
  // 进入后解绑帧动画
  const cdWrapperDom = cdWrapperRef.current;
  animations.unregisterAnimation ("move");
  cdWrapperDom.style.animation = "";
};
```

现在可以看到这样的进场效果。

![img](https://img-repo.poetries.top/images/16e07fe228d64cc1.gif)

但是，这还不够！

我们可以让 Top 和 Bottom 都跟着动起来。

还记得刚刚写过的 "normal" 的钩子类吗？我们利用贝塞尔动画曲线给它们一个过渡。

```text
//normalPlayer/style.js
//NormalPlayerContainer 样式组件下
&.normal-enter,
&.normal-exit-done {
  .top {
    transform: translate3d (0, -100px, 0);
  }
  .bottom {
    transform: translate3d (0, 100px, 0);
  }
}
&.normal-enter-active,
&.normal-exit-active {
  .top,
  .bottom {
    transform: translate3d (0, 0, 0);
    transition: all 0.4s cubic-bezier (0.86, 0.18, 0.82, 1.32);
  }
  opacity: 1;
  transition: all 0.4s;
}
&.normal-exit-active {
  opacity: 0;
}
```

仔细观察，Top 和 Bottom 部分出现的相应的过渡，可以发现现在的效果较之前是更加灵动的:

![img](https://user-gold-cdn.xitu.io/2019/10/26/16e0800ac63ce804?imageslim)

## 出场动画



首先声明一下，我们实现的出场动画是基于 transform 属性的，但是 transform 在不同的浏览器厂商会有不同的前缀，这个问题在 CSS 中可以用 postcss 等工具来解决，但是 JS 中我们现在只有自己来处理了。

在 api/utils.js 中添加:

```text
// 给 css3 相关属性增加浏览器前缀，处理浏览器兼容性问题
let elementStyle = document.createElement ("div").style;

let vendor = (() => {
  // 首先通过 transition 属性判断是何种浏览器
  let transformNames = {
    webkit: "webkitTransform",
    Moz: "MozTransform",
    O: "OTransfrom",
    ms: "msTransform",
    standard: "Transform"
  };
  for (let key in transformNames) {
    if (elementStyle [transformNames [key]] !== undefined) {
      return key;
    }
  }
  return false;
})();

export function prefixStyle (style) {
  if (vendor === false) {
    return false;
  }
  if (vendor === "standard") {
    return style;
  }
  return vendor + style.charAt (0).toUpperCase () + style.substr (1);
}
```

然后在 normalPlayer/index.js 中引入 prefixStyle 方法。

```text
import { prefixStyle } from "../../../api/utils";

// 组件代码中加入
const transform = prefixStyle ("transform");
```

接下来写离开动画的逻辑:

```text
const leave = () => {
  if (!cdWrapperRef.current) return;
  const cdWrapperDom = cdWrapperRef.current;
  cdWrapperDom.style.transition = "all 0.4s";
  const { x, y, scale } = _getPosAndScale ();
  cdWrapperDom.style [transform] = `translate3d (${x} px, ${y} px, 0) scale (${scale})`;
};

const afterLeave = () => {
  if (!cdWrapperRef.current) return;
  const cdWrapperDom = cdWrapperRef.current;
  cdWrapperDom.style.transition = "";
  cdWrapperDom.style [transform] = "";
  // 一定要注意现在要把 normalPlayer 这个 DOM 给隐藏掉，因为 CSSTransition 的工作只是把动画执行一遍 
  // 不置为 none 现在全屏播放器页面还是存在
  normalPlayerRef.current.style.display = "none";
};
```

![img](https://user-gold-cdn.xitu.io/2019/10/26/16e0800fb44c5345?imageslim)

OK, 至此我们的进场和出场动画就开发完成了！是不是 get 到很多新姿势呢：）



# 播放器3 进度条组件封装，完美衔接业务开发

> 本节代码对应 GitHub 分支: chapter8

[仓库传送门(opens new window)](https://github.com/sanyuan0704/react-cloud-music/tree/chapter8)

进度条组件是播放器中至关重要的组件，我们单独抽出来讲。

## 环形进度条组件



环形主要用于迷你播放器上，简单地运用 svg 来进行实现。

```text
//baseUI/progress-circle.js
import React from 'react';
import styled from'styled-components';
import style from '../../assets/global-style';

const CircleWrapper = styled.div`
  position: relative;
  circle {
    stroke-width: 8px;
    transform-origin: center;
    &.progress-background {
      transform: scale (0.9);
      stroke: ${style ["theme-color-shadow"]};
    }
    &.progress-bar {
      transform: scale (0.9) rotate (-90deg);
      stroke: ${style ["theme-color"]};
    }
  }
`

function ProgressCircle (props) {
  const {radius, percent} = props;
  // 整个背景的周长
  const dashArray = Math.PI * 100;
  // 没有高亮的部分，剩下高亮的就是进度
  const dashOffset = (1 - percent) * dashArray;

  return (
    <CircleWrapper>
      <svg width={radius} height={radius} viewBox="0 0 100 100" version="1.1" xmlns="https://www.w3.org/2000/svg">
        <circle className="progress-background" r="50" cx="50" cy="50" fill="transparent"/>
        <circle className="progress-bar" r="50" cx="50" cy="50" fill="transparent" 
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}/>
      </svg>
      {props.children}
    </CircleWrapper>
  )
}

export default React.memo (ProgressCircle);
```

现在来把它应用到 mini 播放器中:

```text
// 先 mock 一份 percent 数据
let percent = 0.2;

// 将原来的暂停按钮部分修改
<div className="control">
  <ProgressCircle radius={32} percent={percent}>
    <i className="icon-mini iconfont icon-pause">&#xe650;</i>
  </ProgressCircle>
</div>
```

现在 20% 的效果就出现了。

![image-20210215203338330](https://img-repo.poetries.top/images/image-20210215203338330.png)

## 线形进度条组件



现在我们来构建 normalPlayer 中的线性进度条，相信这也是大家会比较常用的一个组件。大家可能在平时的开发中，直接用的 UI 框架来完成，但你懂得背后是如何实现的吗？ 现在就趁这个机会来试一试吧。

由于涉及到比较复杂的交互，我们这里做重点来讲解。

### UI 构建

首先构建 UI:

```text
//baseUI/progressBar/index.js
import React, {useEffect, useRef, useState } from 'react';
import styled from'styled-components';
import style from '../../assets/global-style';
import { prefixStyle } from './../../api/utils';

const ProgressBarWrapper = styled.div`
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba (0, 0, 0, .3);
    .progress {
      position: absolute;
      height: 100%;
      background: ${style ["theme-color"]};
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -15px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid ${style ["border-color"]};
        border-radius: 50%;
        background: ${style ["theme-color"]};
      }
    }
  }
`

function ProgressBar (props) {
  return (
    <ProgressBarWrapper>
      <div className="bar-inner">
        <div className="progress"></div>
        <div className="progress-btn-wrapper">
          <div className="progress-btn"></div>
        </div>
      </div>
    </ProgressBarWrapper>
  )
}
```

为了能及时看到效果，我们在 normalPlayer 中来引入这个组件。

```text
import ProgressBar from "../../../baseUI/progress-bar/index";

<ProgressWrapper>
  <span className="time time-l">0:00</span>
  <div className="progress-bar-wrapper">
    <ProgressBar percent={0.2}></ProgressBar>
  </div>
  <div className="time time-r">4:17</div>
</ProgressWrapper>
```

ProgressWrapper 样式组件已经实现，现在只需从 style.js 引入即可。

现在，就可以看到基本的进度条的样子了。

![image-20210215203403598](https://img-repo.poetries.top/images/image-20210215203403598.png)

## 进度条交互逻辑开发



首先，进度条组件作为播放器的一部分，我们思考一下将它被拆分出去后的功能，一方面是要响应用户的拖动或点击动作，让进度条得以长度变化，另一方面是要执行播放器组件传递过来的进度改变时需要的回调。

好，我们先完成第一步。

```text
// 即将使用的 hooks
import React, {useEffect, useRef, useState } from 'react';

const progressBar = useRef ();
const progress = useRef ();
const progressBtn = useRef ();
const [touch, setTouch] = useState ({});

const progressBtnWidth = 16;  

//JSX 部分
<ProgressBarWrapper>
  <div className="bar-inner" ref={progressBar} >
    <div className="progress" ref={progress}></div>
    <div className="progress-btn-wrapper" ref={progressBtn}
        onTouchStart={progressTouchStart}
        onTouchMove={progressTouchMove}
        onTouchEnd={progressTouchEnd}
    >
      <div className="progress-btn"></div>
    </div>
  </div>
</ProgressBarWrapper>
```

现在来处理滑动事件的逻辑:

```text
// 处理进度条的偏移
const _offset = (offsetWidth) => {
  progress.current.style.width = `${offsetWidth} px`;
  progressBtn.current.style.transform = `translate3d (${offsetWidth} px, 0, 0)`;
}

const progressTouchStart = (e) => {
  const startTouch = {};
  startTouch.initiated = true;//initial 为 true 表示滑动动作开始了
  startTouch.startX = e.touches [0].pageX;// 滑动开始时横向坐标
  startTouch.left = progress.current.clientWidth;// 当前 progress 长度
  setTouch (startTouch);
}

const progressTouchMove = (e) => {
  if (!touch.initiated) return;
  // 滑动距离   
  const deltaX = e.touches [0].pageX - touch.startX;
  const barWidth = progressBar.current.clientWidth - progressBtnWidth; 
  const offsetWidth = Math.min (Math.max (0, touch.left + deltaX), barWidth);
  _offset (offsetWidth);
}

const progressTouchEnd = (e) => {
  const endTouch = JSON.parse (JSON.stringify (touch));
  endTouch.initiated = false;
  setTouch (endTouch);
}
```

现在进度条就可以自由地拖动啦！

不过还有一种情况，就是用户点击进度条的时候，进度条也应该做相应的改变。

其实很简单，绑定点击事件即可。

```text
<div className="bar-inner" ref={progressBar} onClick={progressClick}>
const progressClick = (e) => {
  const rect = progressBar.current.getBoundingClientRect ();
  const offsetWidth = e.pageX - rect.left;
  _offset (offsetWidth);
};
```

现在我们就完成了第一步啦，接下来当进度改变后，我们需要执行父组件传过来的回调函数。

```text
// 取出回调函数
const {percentChange} = props;

const _changePercent = () => {
  const barWidth = progressBar.current.clientWidth - progressBtnWidth;
  const curPercent = progress.current.clientWidth/barWidth;// 新的进度计算
  percentChange (curPercent);// 把新的进度传给回调函数并执行
}

// 滑动完成时  
const progressTouchEnd = (e) => {
  //...
  _changePercent ();
}
// 点击后
const progressClick = (e) => {
  //...
  _changePercent ();
}
```

由于 percentChange 的具体逻辑在父组件完成，与目前组件无关 至此，进度条组件就开发完成了。



# 播放器4 复杂交互，极限挑战

现在，我们终于进入到了逻辑层的开发，之前我们已经准备好了相关的数据并且已经让组件连接，这里会省不少事情。但是整个交互的逻辑还是比较复杂的，希望大家能够提前做好心理准备，迎接这个挑战吧。

首先把问题拆分一下，对播放器而言，进行交互的部分无非就是两个部分：mini版和全屏版。我们先从简单一些的mini版开始入手吧。

## mini播放器



mini播放器目前依赖的数据是播放状态和播放进度数据。

```text
const { song, fullScreen, playing, percent } = props;

const { clickPlaying, setFullScreen } = props;
```

进度条这里的JSX代码也需要修改一下:

```text
// 暂停的时候唱片也停止旋转
<img className={`play ${playing ? "": "pause"}`} src={song.al.picUrl} width="40" height="40" alt="img"/>
<ProgressCircle radius={32} percent={percent}>
  { playing ? 
    <i className="icon-mini iconfont icon-pause" onClick={e => clickPlaying(e, false)}>&#xe650;</i>
    :
    <i className="icon-mini iconfont icon-play" onClick={e => clickPlaying(e, true)}>&#xe61e;</i> 
  }
</ProgressCircle>
```

当然在父组件中也要做相应修改:

```text
const clickPlaying = (e, state) => {
  e.stopPropagation();
  togglePlayingDispatch(state);
};
return (
  <div>
    <MiniPlayer
      song={currentSong}
      fullScreen={fullScreen}
      playing={playing}
      toggleFullScreen={toggleFullScreenDispatch}
      clickPlaying={clickPlaying}
    />
    <NormalPlayer 
      song={currentSong}
      fullScreen={fullScreen}
      playing={playing}
      toggleFullScreen={toggleFullScreenDispatch}
      clickPlaying={clickPlaying}
    />
  </div>
)
```

## 初次完成播放



Ok, 现在我们来处理更复杂的全屏播放器部分。

首先定义必要的播放器属性:

```text
//Player/index.js

//目前播放时间
const [currentTime, setCurrentTime] = useState(0);
//歌曲总时长
const [duration, setDuration] = useState(0);
//歌曲播放进度
let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;
```

同时需要接受redux中的currentIndex:

```text
  const { fullScreen, playing, currentIndex, currentSong: immutableCurrentSong } = props;
  const { toggleFullScreenDispatch, togglePlayingDispatch, changeCurrentIndexDispatch, changeCurrentDispatch } = props;

  let currentSong = immutableCurrentSong.toJS();
```

我们现在的当务之急是让播放器能够播放, 所以现在我们需要放上我们的核心元素————audio标签:

```text
//绑定ref
const audioRef = useRef();

return (
  <div>
    //...
    <audio ref={audioRef}></audio>
  </div>
)
```

现在先写一些逻辑:

```text
//mock一份playList，后面直接从 redux 拿，现在只是为了调试播放效果。
const playList = [
    {
      ftype: 0,
      djId: 0,
      a: null,
      cd: '01',
      crbt: null,
      no: 1,
      st: 0,
      rt: '',
      cf: '',
      alia: [
        '手游《梦幻花园》苏州园林版推广曲'
      ],
      rtUrls: [],
      fee: 0,
      s_id: 0,
      copyright: 0,
      h: {
        br: 320000,
        fid: 0,
        size: 9400365,
        vd: -45814
      },
      mv: 0,
      al: {
        id: 84991301,
        name: '拾梦纪',
        picUrl: 'https://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg',
        tns: [],
        pic_str: '109951164627180052',
        pic: 109951164627180050
      },
      name: '拾梦纪',
      l: {
        br: 128000,
        fid: 0,
        size: 3760173,
        vd: -41672
      },
      rtype: 0,
      m: {
        br: 192000,
        fid: 0,
        size: 5640237,
        vd: -43277
      },
      cp: 1416668,
      mark: 0,
      rtUrl: null,
      mst: 9,
      dt: 234947,
      ar: [
        {
          id: 12084589,
          name: '妖扬',
          tns: [],
          alias: []
        },
        {
          id: 12578371,
          name: '金天',
          tns: [],
          alias: []
        }
      ],
      pop: 5,
      pst: 0,
      t: 0,
      v: 3,
      id: 1416767593,
      publishTime: 0,
      rurl: null
    }
];
useEffect(() => {
  if(!currentSong) return;
  changeCurrentIndexDispatch(0);//currentIndex默认为-1，临时改成0
  let current = playList[0];
  changeCurrentDispatch(current);//赋值currentSong
  audioRef.current.src = getSongUrl(current.id);
  setTimeout(() => {
    audioRef.current.play();
  });
  togglePlayingDispatch(true);//播放状态
  setCurrentTime(0);//从头开始播放
  setDuration((current.dt / 1000) | 0);//时长
}, []);
```

其中，getSongUrl为一个封装在api/utils.js中的方法:

```text
//拼接出歌曲的url链接
export const getSongUrl = id => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
};
```

引入:

```text
import { getSongUrl } from "../../api/utils";
```

但是你现在会看到这样的报错信息:

![img](https://user-gold-cdn.xitu.io/2020/1/16/16fac32579302b6b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

这是因为初始化store数据的时候，currentSong是一个空对象，song.al为undefined, 因此song.al.picUrl就会报错。

那怎么来规避这个问题呢？

很简单，我们在渲染播放器的时候判断一下currentSong是否对空对象就可以了。

```text
import { isEmptyObject } from "../../api/utils";

//JSX
return (
  <div>
    { isEmptyObject(currentSong) ? null : 
      <MiniPlayer
        song={currentSong}
        fullScreen={fullScreen}
        playing={playing}
        toggleFullScreen={toggleFullScreenDispatch}
        clickPlaying={clickPlaying}
      /> 
    }
    { isEmptyObject(currentSong) ? null : 
      <NormalPlayer
        song={currentSong}
        fullScreen={fullScreen}
        playing={playing}
        toggleFullScreen={toggleFullScreenDispatch}
        clickPlaying={clickPlaying}
      />
    }
    <audio ref={audioRef}></audio>
  </div>
)
```

好，现在你打开项目应该可以听到背景音乐了，现在我们迈出了第一步。接下来就是一步步不断地完善播放的逻辑。

## 播放和暂停



首先是播放和暂停的逻辑。

其实之前已经完成，只不过没有和audio元素对接。现在通过监听playing变量来实现:

```text
useEffect(() => {
  playing ? audioRef.current.play() : audioRef.current.pause();
}, [playing]);
```

现在在mini播放器可以看到效果，但是normalPlayer里面却没反应，现在补充上里面的逻辑。

```text
//normalPlayer/index.js
const { song, fullScreen, playing } =  props;
const { toggleFullScreen, clickPlaying } = props;

//JSX中的修改
//CdWrapper下唱片图片
<div className="cd">
  <img
    className={`image play ${playing ? "" : "pause"}`}
    src={song.al.picUrl + "?param=400x400"}
    alt=""
  />
</div>
//中间暂停按钮
<div className="icon i-center">
  <i
    className="iconfont"
    onClick={e => clickPlaying(e, !playing)}
    dangerouslySetInnerHTML={{
      __html: playing ? "&#xe723;" : "&#xe731;"
    }}
  ></i>
</div>
```

## 进度控制



之前写的播放时间都是mock数据, 现在填充成动态数据。

```text
//父组件传值
<NormalPlayer
  song={currentSong}
  fullScreen={fullScreen}
  playing={playing}
  duration={duration}//总时长
  currentTime={currentTime}//播放时间
  percent={percent}//进度
  toggleFullScreen={toggleFullScreenDispatch}
  clickPlaying={clickPlaying}
/>
```

同时有一点需要注意，就是audio标签在播放的过程中会不断地触发onTimeUpdate事件，在此需要更新currentTime变量。

```text
const updateTime = e => {
  setCurrentTime(e.target.currentTime);
};
//JSX
<audio
  ref={audioRef}
  onTimeUpdate={updateTime}
></audio>
```

现在在normalPlayer中：

```text
const { song, fullScreen, playing, percent, duration, currentTime } =  props;
const { toggleFullScreen, clickPlaying, onProgressChange } = props;

//相应属性传给进度条
<ProgressWrapper>
  <span className="time time-l">{formatPlayTime(currentTime)}</span>
  <div className="progress-bar-wrapper">
    <ProgressBar
      percent={percent}
      percentChange={onProgressChange}
    ></ProgressBar>
  </div>
  <div className="time time-r">{formatPlayTime(duration)}</div>
</ProgressWrapper>
```

ps: 其中，formatPlayTime为api/utils.js中的一个工具函数：

```text
//转换歌曲播放时间
export const formatPlayTime = interval => {
  interval = interval | 0;// |0表示向下取整
  const minute = (interval / 60) | 0;
  const second = (interval % 60).toString().padStart(2, "0");
  return `${minute}:${second}`;
};
```

我要强调的重点是传给ProgressBar的两个参数，一个是percent，用来控制进度条的显示长度，另一个是onProgressChange，这个其实是一个进度条被滑动或点击时用来改变percent的回调函数。我们在父组件来定义它：

```text
const onProgressChange = curPercent => {
  const newTime = curPercent * duration;
  setCurrentTime(newTime);
  audioRef.current.currentTime = newTime;
  if (!playing) {
    togglePlayingDispatch(true);
  }
};

//父组件传值
<NormalPlayer
  //...
  onProgressChange={onProgressChange}
/>
```

那么之前封装的进度条组件并没有处理percent相关的逻辑，现在在进度条组件中来增加。

```text
const transform = prefixStyle('transform');

const { percent } = props;

const { percentChange } = props;

//监听percent
useEffect(() => {
  if(percent >= 0 && percent <= 1 && !touch.initiated) {
    const barWidth = progressBar.current.clientWidth - progressBtnWidth;
    const offsetWidth = percent * barWidth;
    progress.current.style.width = `${offsetWidth}px`;
    progressBtn.current.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`;
  }
  // eslint-disable-next-line
}, [percent]);

const _changePercent = () => {
  const barWidth = progressBar.current.clientWidth - progressBtnWidth;
  const curPercent = progress.current.clientWidth / barWidth;
  percentChange(curPercent);
}

//点击和滑动结束事件改变percent
const progressClick = (e) => {
  //...
  _changePercent();
}

const progressTouchEnd = (e) => {
  //...
  _changePercent();
}
```

OK, 进度条被我们改了差不多了，现在就能够对接我们的播放器进度啦！

![img](https://img-repo.poetries.top/images/16fac32f825fb728.gif)

在最后，我们也把mini播放器的进度对接一下:

```text
//父组件传值
<MiniPlayer
  //...
  percent={percent}
></MiniPlayer>
//miniPlayer/index.js
const { full, song, playing, percent } = props;

//JSX
<ProgressCircle radius={32} percent={percent}>
//...
```

做到这里大家可以完完整整地听一首歌了，实在不容易，接下来还有上一曲和下一曲的功能，我们慢慢来。

## 上下曲切换逻辑



```text
//一首歌循环
const handleLoop = () => {
  audioRef.current.currentTime = 0;
  changePlayingState(true);
  audioRef.current.play();
};

const handlePrev = () => {
  //播放列表只有一首歌时单曲循环
  if (playList.length === 1) {
    handleLoop();
    return;
  }
  let index = currentIndex - 1;
  if (index < 0) index = playList.length - 1;
  if (!playing) togglePlayingDispatch(true);
  changeCurrentIndexDispatch(index);
};

const handleNext = () => {
  //播放列表只有一首歌时单曲循环
  if (playList.length === 1) {
    handleLoop();
    return;
  }
  let index = currentIndex + 1;
  if (index === playList.length) index = 0;
  if (!playing) togglePlayingDispatch(true);
  changeCurrentIndexDispatch(index);
};
```

这部分逻辑传给normalPlayer:

```text
//传递给normalPlayer
handlePrev={handlePrev}
handleNext={handleNext}
```

在normalPlayer中绑定按钮点击事件:

```text
const { toggleFullScreen, clickPlaying, onProgressChange, handlePrev, handleNext } = props;

//JSX
<div className="icon i-left" onClick={handlePrev}>
  <i className="iconfont">&#xe6e1;</i>
</div>
//...
<div className="icon i-right" onClick={handleNext}>
  <i className="iconfont">&#xe718;</i>
</div>
```

现在我们把父组件中控制歌曲播放的的逻辑完善一下:

```text
//记录当前的歌曲，以便于下次重渲染时比对是否是一首歌
const [preSong, setPreSong] = useState({});

//先mock一份currentIndex
useEffect(() => {
  changeCurrentIndexDispatch(0);
}, [])

useEffect(() => {
  if (
    !playList.length ||
    currentIndex === -1 ||
    !playList[currentIndex] ||
    playList[currentIndex].id === preSong.id 
  )
    return;
  let current = playList[currentIndex];
  changeCurrentDispatch(current);//赋值currentSong
  setPreSong(current);
  audioRef.current.src = getSongUrl(current.id);
  setTimeout(() => {
    audioRef.current.play();
  });
  togglePlayingDispatch(true);//播放状态
  setCurrentTime(0);//从头开始播放
  setDuration((current.dt / 1000) | 0);//时长
}, [playList, currentIndex]);
```

## 播放模式



分三种: 单曲循环、顺序循环和随机播放

我们先在Player/index.js，也就是父组件中写相应逻辑：

```text
//从props中取redux数据和dispatch方法
const {
  playing,
  currentSong:immutableCurrentSong,
  currentIndex,
  playList:immutablePlayList,
  mode,//播放模式
  sequencePlayList:immutableSequencePlayList,//顺序列表
  fullScreen
} = props;

const {
  togglePlayingDispatch,
  changeCurrentIndexDispatch,
  changeCurrentDispatch,
  changePlayListDispatch,//改变playList
  changeModeDispatch,//改变mode
  toggleFullScreenDispatch
} = props;

const playList = immutablePlayList.toJS();
const sequencePlayList = immutableSequencePlayList.toJS();
const currentSong = immutableCurrentSong.toJS();
```

现在的需求是点击normalPlayer最左边的按钮，能够切换播放模式，我们现在在父组件写相应的逻辑。

顺便说一句。不知道你发现没有: 关于业务逻辑的部分都是在父组件完成然后直接传给子组件，而子组件虽然也有自己的状态，但大部分是控制UI层面的，逻辑都是从props中接受， 这也是在潜移默化中给大家展示了UI和逻辑分离的组件设计模式。通过分离关注点，解耦不同的模块，能够大量节省开发和维护成本。

```text
//Player/index
const changeMode = () => {
  let newMode = (mode + 1) % 3;
  if (newMode === 0) {
    //顺序模式
    changePlayListDispatch(sequencePlayList);
    let index = findIndex(currentSong, sequencePlayList);
    changeCurrentIndexDispatch(index);
  } else if (newMode === 1) {
    //单曲循环
    changePlayListDispatch(sequencePlayList);
  } else if (newMode === 2) {
    //随机播放
    let newList = shuffle(sequencePlayList);
    let index = findIndex(currentSong, newList);
    changePlayListDispatch(newList);
    changeCurrentIndexDispatch(index);
  }
  changeModeDispatch(newMode);
};
```

目前的播放列表是在组件内mock的，现在已经不太合适，我们把mock列表移动到reducer中的defaultState中，这里就不展示了，要注意playList和sequenceList都要mock并且mock一样的数据。

接下来我们来解释一下changeMode中的内容,findIndex方法用来找出歌曲在对应列表中的索引，shuffle方法用来打乱一个列表，达成随机列表的效果，这两个函数都定义在api/utils.js中。

```text
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// 随机算法
export function shuffle(arr) {
  let new_arr = [];
  arr.forEach(item => {
    new_arr.push(item);
  });
  for (let i = 0; i < new_arr.length; i++) {
    let j = getRandomInt(0, i);
    let t = new_arr[i];
    new_arr[i] = new_arr[j];
    new_arr[j] = t;
  }
  return new_arr;
}

// 找到当前的歌曲索引
export const findIndex = (song, list) => {
  return list.findIndex(item => {
    return song.id === item.id;
  });
};
```

引入到父组件:

```text
import { getSongUrl, isEmptyObject, shuffle, findIndex } from "../../api/utils";
```

接下来我们给normalPlayer传入:

```text
<NormalPlayer
  //...
  mode={mode}
  changeMode={changeMode}
/>
```

现在就需要对normalPlayer做一些事情了：

```text
//Operator标签下
<div className="icon i-left" onClick={changeMode}>
  <i
    className="iconfont"
    dangerouslySetInnerHTML={{ __html: getPlayMode() }}
  ></i>
</div>
//getPlayMode方法
const getPlayMode = () => {
  let content;
  if (mode === playMode.sequence) {
    content = "&#xe625;";
  } else if (mode === playMode.loop) {
    content = "&#xe653;";
  } else {
    content = "&#xe61b;";
  }
  return content;
};
```

其中playMode常量我们已经定义过，直接引入:

```text
import { playMode } from '../../../api/config';
```

现在大家打开redux-devtools可以看到数据的变化，下面是随机模式

![img](https://img-repo.poetries.top/images/16fac33621418e87.jpeg)

可以看到playList现在已经乱序了。

功能是实现了，但是只有一个图标放在这里，可能很多用户不知道是什么意思，如果能够文字提示一下，体验会更好一些。废话不多说，直接开始封装崭新的Toast组件，这里只是由于是侧重项目， 不可能将Toast的功能面面俱到，只是让大家体会一下封装的过程，以此来提升自己的内功，这也是我不用UI框架的原因。

在baseUI目录下新建Toast文件夹:

```text
//Toast/index.js
import React, {useState, useImperativeHandle, forwardRef} from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import style from '../../assets/global-style';

const ToastWrapper = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  height: 50px;
  /* background: ${style["highlight-background-color"]}; */
  &.drop-enter{
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  &.drop-enter-active{
    opacity: 1;
    transition: all 0.3s;
    transform: translate3d(0, 0, 0);
  }
  &.drop-exit-active{
    opacity: 0;
    transition: all 0.3s;
    transform: translate3d(0, 100%, 0);
  }
  .text{
    line-height: 50px;
    text-align: center;
    color: #fff;
    font-size: ${style["font-size-l"]};
  }
`
//外面组件需要拿到这个函数组件的ref，因此用forwardRef
const Toast = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const [timer, setTimer] = useState('');
  const {text} = props;
  //外面组件拿函数组件ref的方法，用useImperativeHandle这个hook
  useImperativeHandle(ref, () => ({
    show() {
      // 做了防抖处理
      if(timer) clearTimeout(timer);
      setShow(true);
      setTimer(setTimeout(() => {
        setShow(false)
      }, 3000));
    }
  }))
  return (
    <CSSTransition in={show} timeout={300} classNames="drop" unmountOnExit>
      <ToastWrapper>
        <div className="text">{text}</div>
      </ToastWrapper>
    </CSSTransition>
  )
});

export default React.memo(Toast);
```

现在放到Player/index.js中使用:

```text
import Toast from "./../../baseUI/toast/index";

//...
const [modeText, setModeText] = useState("");

const toastRef = useRef();

//...
const changeMode = () => {
  let newMode = (mode + 1) % 3;
  if (newMode === 0) {
    //...
    setModeText("顺序循环");
  } else if (newMode === 1) {
    //...
    setModeText("单曲循环");
  } else if (newMode === 2) {
    //...
    setModeText("随机播放");
  }
  changeModeDispatch(newMode);
  toastRef.current.show();
};

//JSX
return (
  <div>
    //...
    <Toast text={modeText} ref={toastRef}></Toast>  
  </div>
)
```

效果:

![img](https://img-repo.poetries.top/images/16fac3421b9d1c07.gif)

那现在还有最后一个问题需要处理，就是歌曲播放完了之后，紧接着需要怎么处理。

我们回到父组件，把这个处理逻辑写在audio标签的onEnded事件回调中:

```text
<audio
  ref={audioRef}
  onTimeUpdate={updateTime}
  onEnded={handleEnd}
></audio>
```

由于之前封装了下一曲和单曲循环的逻辑，这里就非常简单了。

```text
import { playMode } from '../../api/config';
//...
const handleEnd = () => {
  if (mode === playMode.loop) {
    handleLoop();
  } else {
    handleNext();
  }
};
```

OK，到这里，mini/全屏播放器基本的功能都完成了！



# 播放器5 由音符陨落动画引发的EventLoop机制之问

> 本节代码对应 GitHub 分支: chapter8

[仓库传送门(opens new window)](https://github.com/sanyuan0704/react-cloud-music/tree/chapter8)

不是说两个播放器功能已经做完了吗？确实。但是作为一个精美的 APP，我们还要搞！事！情！

话不多说，直接上 gif 效果图：

![img](https://img-repo.poetries.top/images/16dde187ddaf8cf6.gif)

是不是很酷炫？

这一节就让我们来开始来一波骚操作：）

## musicNote 动画组件封装

我们先初始化组件:

```text
//baseUI/music-note/index.js
import React, {useEffect, useImperativeHandle, useRef, forwardRef} from 'react';
import styled from'styled-components';
import { prefixStyle } from './../../api/utils';
import style from '../../assets/global-style';

const Container = styled.div`
  .icon_wrapper {
    position: fixed;
    z-index: 1000;
    margin-top: -10px;
    margin-left: -10px;
    color: ${style ["theme-color"]};
    font-size: 14px;
    display: none;
    transition: transform 1s cubic-bezier (.62,-0.1,.86,.57);
    transform: translate3d (0, 0, 0);
    >div {
      transition: transform 1s;
    }
  }
`

const MusicNote = forwardRef ((props, ref) => {

  const iconsRef = useRef ();
  // 容器中有 3 个音符，也就是同时只能有 3 个音符下落
  const ICON_NUMBER = 3;

  const transform = prefixStyle ("transform");

  // 原生 DOM 操作，返回一个 DOM 节点对象
  const createNode = (txt) => {
    const template = `<div class='icon_wrapper'>${txt}</div>`;
    let tempNode = document.createElement ('div');
    tempNode.innerHTML = template;
    return tempNode.firstChild;
  }

  useEffect (() => {
    for (let i = 0; i < ICON_NUMBER; i++){
      let node = createNode (`<div class="iconfont">&#xe642;</div>`);
      iconsRef.current.appendChild (node);
    }
    // 类数组转换成数组，当然也可以用 [...xxx] 解构语法或者 Array.from ()
    let domArray = [].slice.call (iconsRef.current.children);
    domArray.forEach (item => {
      item.running = false;
      item.addEventListener ('transitionend', function () {
        this.style ['display'] = 'none';
        this.style [transform] = `translate3d (0, 0, 0)`;
        this.running = false;

        let icon = this.querySelector ('div');
        icon.style [transform] = `translate3d (0, 0, 0)`;
      }, false);
    });
    //eslint-disable-next-line
  }, []);

  return (
    <Container ref={iconsRef}>
    </Container>
  )
})

export default React.memo (MusicNote);
```

接下来是下落动画的处理逻辑了:

```text
const startAnimation = ({x, y}) => {
  for (let i = 0; i < ICON_NUMBER; i++) {
    let domArray = [].slice.call (iconsRef.current.children)
    let item = domArray [i]
    // 选择一个空闲的元素来开始动画
    if (item.running === false) {
      item.style.left = x + "px";
      item.style.top = y + "px";
      item.style.display = "inline-block";

      setTimeout (() => {
        item.running = true;
        item.style [transform] = `translate3d (0, 750px, 0)`;
        let icon = item.querySelector ("div");
        icon.style [transform] = `translate3d (-40px, 0, 0)`;
      }, 20);
      break;
    }
  }
};
// 外界调用的 ref 方法
useImperativeHandle (ref, () => ({
  startAnimation
}));
```

解释一下我为什么要用定时器？

1. 因为目前元素的 display 虽然变为了 inline-block, 但是元素显示出来需要・`浏览器的回流` 过程，无法立即显示。 也就是说元素目前还是 `隐藏` 的，那么 `元素的位置未知`，导致 transform 失效
2. 用 setTimout 的本质将动画逻辑放到下一次的 `宏任务`。事实上，当本次的宏任务完成后， 会触发 `浏览器 GUI 渲染线程` 的重绘工作，然后才执行下一次宏任务，那么下一次宏任务中元素就显示了，transform 便能生效。

这个涉及 JS 的 eventLoop 机制，如果有点懵推荐一篇通俗易懂的 [文章 (opens new window)](https://juejin.im/post/6844903919789801486):

## 动画运用到组件

首先我们需要改造 SongsList 组件。SongsList 其实是一个相当关键的组件，在很多地方都需要复用，而且和播放器的数据有交互，因此单独封装成一个应用型的组件。

```text
import { changePlayList, changeCurrentIndex, changeSequecePlayList } from './../../application/Player/store/actionCreators';
import { connect } from 'react-redux';

//...
const { changePlayListDispatch, changeCurrentIndexDispatch, changeSequecePlayListDispatch } = props;

// 接受触发动画的函数
const { musicAnimation } = props;

const selectItem = (e, index) => {
  changePlayListDispatch (songs);
  changeSequecePlayListDispatch (songs);
  changeCurrentIndexDispatch (index);
  musicAnimation (e.nativeEvent.clientX, e.nativeEvent.clientY);
}
//...

// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    changePlayListDispatch (data){
      dispatch (changePlayList (data));
    },
    changeCurrentIndexDispatch (data) {
      dispatch (changeCurrentIndex (data));
    },
    changeSequecePlayListDispatch (data) {
      dispatch (changeSequecePlayList (data))
    }
  }
};

// 将 ui 组件包装成容器组件
export default connect (null, mapDispatchToProps)(React.memo (SongsList));
```

这样一来，我们就不用模拟 playList 的数据啦。我们把 player/reducer 中 defaultState 里的 playList 和 sequenceList 置为 []。

```text
//player/index.js 中这份 mock 的代码也删除
useEffect (() => {
  changeCurrentIndexDispatch (0);
}, [])
```

### 歌手页音符实现

```text
//Singer/index.js
import MusicNote from "../../baseUI/music-note/index";

//...
const musicNoteRef = useRef ();

const musicAnimation = (x, y) => {
  musicNoteRef.current.startAnimation ({ x, y });
};

return (
  <CSSTransition>
    <Contaniner>
      //...
        <SongsList
          songs={songs}
          showCollect={false}
          musicAnimation={musicAnimation}
        ></SongsList>
      //...
      <MusicNote ref={musicNoteRef}></MusicNote>
    </Contaniner>
  </CSSTransition>
)
```

### 歌单详情页音符实现

```text
//Album/index.js
import MusicNote from "../../baseUI/music-note/index";

//...
const musicNoteRef = useRef ();

const musicAnimation = (x, y) => {
  musicNoteRef.current.startAnimation ({ x, y });
};

return (
  <CSSTransition>
    <Contaniner>
      //...
        <SongsList
          songs={currentAlbum.tracks}
          collectCount={currentAlbum.subscribedCount}
          showCollect={true}
          showBackground={true}
          musicAnimation={musicAnimation}
        ></SongsList>
      //...
      <MusicNote ref={musicNoteRef}></MusicNote>
    </Contaniner>
  </CSSTransition>
)
```

现在就成功地集成了音符掉落的动画了！



# 播放器6 解决潜在bug，细节决定精致程度

> 本节代码对应 GitHub 分支: chapter9

[仓库传送门(opens new window)](https://github.com/sanyuan0704/react-cloud-music/tree/chapter9)

## 1. 出现 mini 播放器时页面底部被遮挡

问题如图:

![img](https://user-gold-cdn.xitu.io/2019/10/26/16e0802235fe5aa9?imageslim)

当 mini 播放器不出现的时候，还能够正常看到底部，但一出现，最下面就被遮住了，每个页都是如此。为什么？因为之前布局都是用 bottom: 0，但是在 mini 播放器出现后我们需要 改变这个 bottom 值，miniPlayer 高度为 60px，我们把 bottom 设为 60px，等于把下面的 60px 高度留给播放器。

因此对于每个页面 Container 的 bottom 值有无播放器需要分开处理。那怎么判断有无播放器出现呢？

有一个很简单的方式，就是判断当前 playList 的长度，如果大于 0 则正在播放，等于 0 则没有。

以 Recommend 组件为例:

```text
function Recommend (props){
  const { songsCount } = props;
  //...

  <Content play={songsCount}>
  //...
}

const mapStateToProps = (state) => ({
  //...
  songsCount: state.getIn (['player', 'playList']).size,// 尽量减少 toJS 操作，直接取 size 属性就代表了 list 的长度
});
//...
```

相应 style.js 中:

```text
import styled from'styled-components';

export const Content = styled.div`
  position: fixed;
  top: 90px;
  bottom: ${props => props.play > 0?"60px": 0};
  width: 100%;
`
```

然后在 Singer、Singers、Rank、Album 组件中也是相同的操作，这里就不浪费篇幅了。大家可以自行完成，也可以参考 chapter8 分支的代码。

## 2. 频繁切歌导致的异常

如果频繁切换歌曲，会出现这样的异常：

![image-20210215204015438](https://img-repo.poetries.top/images/image-20210215204015438.png)

操作过快直接报错，这是完全无法接受的。所以我们必须究根溯源，把这个问题给解了。

解决的原理：其实从 audio 标签拿到 src 加载到能够播放之间有一个缓冲的过程，只有当控件能够播放时才能够切到下一首。如果在这个缓冲过程中切歌就会报错。

现在就来具体地来解决这个问题:

```text
//Player/index.js
const songReady = useRef (true);

useEffect (() => {
  if (
    !playList.length ||
    currentIndex === -1 ||
    !playList [currentIndex] ||
    playList [currentIndex].id === preSong.id ||
    !songReady.current// 标志位为 false
  )
    return;
  let current = playList [currentIndex];
  setPreSong (current);
  songReady.current = false; // 把标志位置为 false, 表示现在新的资源没有缓冲完成，不能切歌
  changeCurrentDispatch (current);// 赋值 currentSong
  audioRef.current.src = getSongUrl (current.id);
  setTimeout (() => {
    // 注意，play 方法返回的是一个 promise 对象
    audioRef.current.play ().then (() => {
      songReady.current = true;
    });
  });
  togglePlayingDispatch (true);// 播放状态
  setCurrentTime (0);// 从头开始播放
  setDuration ((current.dt/ 1000) | 0);// 时长
}, [playList, currentIndex]);
```

同时再做一下异常处理:

```text
const handleError = () => {
  songReady.current = true;
  alert ("播放出错");
};

<audio
  //...
  onError={handleError}
></audio>
```

这样就能放心切歌，不会有报错啦！                            



# 播放器7 播放列表组件，跟APP媲美的丝滑体验

> 本节代码对应 GitHub 分支: chapter9

[仓库传送门(opens new window)](https://github.com/sanyuan0704/react-cloud-music/tree/chapter9)

## 骨架搭建

首先完成播放列表的轮廓，以及将它和播放器进行对接。

```text
import React from 'react';
import {connect} from "react-redux";
import { PlayListWrapper, ScrollWrapper } from './style';
function PlayList (props) {
  return (
    <PlayListWrapper>
      <div className="list_wrapper">
        <ScrollWrapper></ScrollWrapper>
      </div>
    </PlayListWrapper>
  )
}
export default PlayList;
```

相应的 style.js 中:

```text
import styled from'styled-components';
import style from '../../../assets/global-style';

export const PlayListWrapper = styled.div `
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background-color: ${style ["background-color-shadow"]};
  .list_wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    opacity: 1;
    border-radius: 10px 10px 0 0;
    background-color: ${style ["highlight-background-color"]};
    transform: translate3d (0, 0, 0);
    .list_close {
      text-align: center;
      line-height: 50px;
      background: ${style ["background-color"]};
      font-size: ${style ["font-size-l"]};
      color: ${style ["font-color-desc"]};
    }
  }
`;
export const ScrollWrapper = styled.div`
  height: 400px;
  overflow: hidden;
`;
```

现在你可以看到弹出的一个白色浮层了，这就是播放列表组件。现在我们将它和播放器做一下对接。

首先，需要在 Player/index.js 中，往 miniPlayer 和 normalPlayer 子组件中分别传入这个属性：

```text
// 当然先要从 props 取出 togglePlayListDispatch，这部分大家自己加上即可
togglePlayList={togglePlayListDispatch}
```

然后在 miniPlayer/index.js 中，增加以下逻辑:

```text
// 取出
const { togglePlayList } = props;
const handleTogglePlayList = (e) => {
  togglePlayList (true);
  e.stopPropagation ();
};

// 给列表图标绑定事件
<div className="control" onClick={handleTogglePlayList}>
```

同时，在 normalPlayer/index.js 中，增加:

```text
const { togglePlayList } = props;
//...
<div
  className="icon i-right"
  onClick={() => togglePlayList (true)}
>
```

现在我们让 PlayList 组件对接上 redux 中的数据。

```text
import { connect } from "react-redux";

// 组件代码省略

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
  showPlayList: state.getIn (['player', 'showPlayList']),
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    togglePlayListDispatch (data) {
      dispatch (changeShowPlayList (data));
    }
  }
};

// 将 ui 组件包装成容器组件
export default connect (mapStateToProps, mapDispatchToProps)(React.memo (PlayList));
```

连接后我们专心来写组件内部的逻辑。

```text
// 即将引入的模块
import { connect } from "react-redux";
import { PlayListWrapper, ScrollWrapper, ListHeader, ListContent } from './style';
import { CSSTransition } from 'react-transition-group';
import React, { useRef, useState, useCallback } from 'react';
import { prefixStyle, getName } from './../../../api/utils';
import { changeShowPlayList, changeCurrentIndex, changePlayMode, changePlayList } from "../store/actionCreators";
import { playMode } from "../../../api/config";
import Scroll from '../../../baseUI/scroll';


// 组件内代码
function PlayList (props) {
  const { showPlayList } = props;
  const { togglePlayListDispatch } = props;
  const playListRef = useRef ();
  const listWrapperRef = useRef ();
  const isShow = useState (false);

  return (
    <CSSTransition 
      in={showPlayList} 
      timeout={300} 
      classNames="list-fade"
      onEnter={onEnterCB}
      onEntering={onEnteringCB}
      onExiting={onExitingCB}
      onExited={onExitedCB}
    >
      <PlayListWrapper 
        ref={playListRef} 
        style={isShow === true ? { display: "block" } : { display: "none" }} 
        onClick={() => togglePlayListDispatch (false)}
      >
        <div className="list_wrapper" ref={listWrapperRef} >
          <ScrollWrapper></ScrollWrapper>
        </div>
      </PlayListWrapper>
    </CSSTransition>
  )
}
```

接下来编写动画钩子里面的回调函数:

```text
import { prefixStyle } from './../../../api/utils';

const transform = prefixStyle ("transform");

const onEnterCB = useCallback (() => {
  // 让列表显示
  setIsShow (true);
  // 最开始是隐藏在下面
  listWrapperRef.current.style [transform] = `translate3d (0, 100%, 0)`;
}, [transform]);

const onEnteringCB = useCallback (() => {
  // 让列表展现
  listWrapperRef.current.style ["transition"] = "all 0.3s";
  listWrapperRef.current.style [transform] = `translate3d (0, 0, 0)`;
}, [transform]);

const onExitingCB = useCallback (() => {
  listWrapperRef.current.style ["transition"] = "all 0.3s";
  listWrapperRef.current.style [transform] = `translate3d (0px, 100%, 0px)`;
}, [transform]);

const onExitedCB = useCallback (() => {
  setIsShow (false);
  listWrapperRef.current.style [transform] = `translate3d (0px, 100%, 0px)`;
}, [transform]);
```

在 style.js 中增加动画部分:

```text
export const PlayListWrapper = styled.div `
  /* 下面是动画部分的代码 */
  &.list-fade-enter {
    opacity: 0;
  }
  &.list-fade-enter-active {
    opacity: 1;
    transition: all 0.3s;
  }
  &.list-fade-exit {
    opacity: 1;
  }
  &.list-fade-exit-active {
    opacity: 0;
    transition: all 0.3s;
  }
`
```

现在大家点击列表图标便能弹出浮层了。

## 完成列表展示功能

现在我们来往浮层中增添列表的内容和功能。

首先，得从 redux 中拿到相应的数据。获取数据如下:

```text
// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
  currentIndex: state.getIn (['player', 'currentIndex']),
  currentSong: state.getIn (['player', 'currentSong']),
  playList: state.getIn (['player', 'playList']),// 播放列表
  sequencePlayList: state.getIn (['player', 'sequencePlayList']),// 顺序排列时的播放列表
  showPlayList: state.getIn (['player', 'showPlayList']),
  mode: state.getIn (['player', 'mode'])
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    togglePlayListDispatch (data) {
      dispatch (changeShowPlayList (data));
    },
    // 修改当前歌曲在列表中的 index，也就是切歌
    changeCurrentIndexDispatch (data) {
      dispatch (changeCurrentIndex (data));
    },
    // 修改当前的播放模式
    changeModeDispatch (data) {
      dispatch (changePlayMode (data));
    },
    // 修改当前的歌曲列表
    changePlayListDispatch (data) {
      dispatch (changePlayList (data));
    },
  }
};
```

从 props 中导入:

```text
const {
  currentIndex,
  currentSong:immutableCurrentSong,
  showPlayList,
  playList:immutablePlayList,
  mode,
  sequencePlayList:immutableSequencePlayList
} = props;
const {
  togglePlayListDispatch,
  changeCurrentIndexDispatch,
  changePlayListDispatch,
  changeModeDispatch,
} = props;

const currentSong = immutableCurrentSong.toJS ();
const playList = immutablePlayList.toJS ();
const sequencePlayList = immutableSequencePlayList.toJS ();
```

然后让列表组件对接这些数据，渲染出整个列表。JSX 结构如下:

```text
//div.list_wrapper 标签中包裹下面的结构
<ListHeader>
  <h1 className="title">
    { getPlayMode () }
    <span className="iconfont clear" onClick={handleShowClear}>&#xe63d;</span>
  </h1>
</ListHeader>
<ScrollWrapper>
  <Scroll >
    <ListContent>
      {
        playList.map ((item, index) => {
          return (
            <li className="item" key={item.id}>
              {getCurrentIcon (item)}
              <span className="text">{item.name} - {getName (item.ar)}</span>
              <span className="like">
                <i className="iconfont">&#xe601;</i>
              </span>
              <span className="delete">
                <i className="iconfont">&#xe63d;</i>
              </span>
            </li>
          )
        })
      }
    </ListContent>
  </Scroll>
</ScrollWrapper>
```

其中有一些 UI 相关的逻辑封装，包括 getPlayMode、getPlayMode 和 changeMode，比较直观，没有参杂太多的业务逻辑，直接贴出代码:

```text
const getCurrentIcon = (item) => {
  // 是不是当前正在播放的歌曲
  const current = currentSong.id === item.id;
  const className = current ? 'icon-play' : '';
  const content = current ? '&#xe6e3;': '';
  return (
    <i className={`current iconfont ${className}`} dangerouslySetInnerHTML={{__html:content}}></i>
  )
};
const getPlayMode = () => {
  let content, text;
  if (mode === playMode.sequence) {
    content = "&#xe625;";
    text = "顺序播放";
  } else if (mode === playMode.loop) {
    content = "&#xe653;";
    text = "单曲循环";
  } else {
    content = "&#xe61b;";
    text = "随机播放";
  }
  return (
    <div>
      <i className="iconfont" onClick={(e) => changeMode (e)}  dangerouslySetInnerHTML={{__html: content}}></i>
      <span className="text" onClick={(e) => changeMode (e)}>{text}</span>
    </div>
  )
};
const changeMode = (e) => {
  let newMode = (mode + 1) % 3;
  // 具体逻辑比较复杂 后面来实现
};
```

当然，还有对应的 style.js 中的样式组件，首先是 ListHead , 作为列表头部包裹播放模式和清空按钮的容器组件:

```text
export const ListHeader = styled.div `
  position: relative;
  padding: 20px 30px 10px 20px;
  .title {
    display: flex;
    align-items: center;
    >div {
      flex:1;
      .text {
        flex: 1;
        font-size: ${style ["font-size-m"]};
        color: ${style ["font-color-desc"]};
      }
    }
    .iconfont {
      margin-right: 10px;
      font-size: ${style ["font-size-ll"]};
      color: ${style ["theme-color"]};
    }
    .clear {
      ${style.extendClick ()}
      font-size: ${style ["font-size-l"]};
    }
  }
`
```

ListContent 组件用来包裹整个歌曲的列表，是一个列表包裹组件， 样式代码如下：

```text
export const ListContent = styled.div `
  .item {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 30px 0 20px;
    overflow: hidden;
    .current {
      flex: 0 0 20px;
      width: 20px;
      font-size: ${style ["font-size-s"]};
      color: ${style ["theme-color"]};
    }
    .text {
      flex: 1;
      ${style.noWrap ()}
      font-size: ${style ["font-size-m"]};
      color: ${style ["font-color-desc-v2"]};
      .icon-favorite {
        color: ${style ["theme-color"]};
      }
    }
    .like {
      ${style.extendClick ()}
      margin-right: 15px;
      font-size: ${style ["font-size-m"]};
      color: ${style ["theme-color"]};
    }
    .delete {
      ${style.extendClick ()}
      font-size: ${style ["font-size-s"]};
      color: ${style ["theme-color"]};
    }
  }
`
```

现在列表的展示已经成功完成！接下来就是处理对应的业务逻辑了，梳理一下，分别是点击切歌、删除歌曲和切换播放模式这三大功能。

## 点击切歌实现

首先，我们需要绑定对应的事件:

```text
const handleChangeCurrentIndex = (index) => {
  if (currentIndex === index) return;
  changeCurrentIndexDispatch (index);
}

// 绑定点击事件
<li className="item" key={item.id} onClick={() => handleChangeCurrentIndex (index)}>
```

你现在点击一下歌曲，好像可以切歌，但是你发现有一个问题:

当你点击之后列表突然被隐藏了。这个 bug 是怎么产生的呢？其实我们之前在 PlayWrapper 绑定了这样一个事件:

```text
onClick={() => togglePlayListDispatch (false)}
```

其实这是为了在用户点击列表外部的时候，直接将列表隐藏掉，也符合常理。但是 PlayWrapper 的范围是整个屏幕，包含了列表内容，因此出现了这个 bug。

如何解决这个问题？

且看这样一行代码:

```text
<div className="list_wrapper" ref={listWrapperRef} onClick={e => e.stopPropagation ()}>
```

在 list_wrapper 中绑定点击事件，阻止它冒泡就行了。因为这个 div 包裹的就是整个歌曲的列表。

OK！接下来，我们来实现删除歌曲的功能，这里面又包括删除一首歌曲和清空全部歌曲。

## 删除一首歌曲

```text
import { deleteSong } from "../store/actionCreators";

const { deleteSongDispatch } = props;
const handleDeleteSong = (e, song) => {
  e.stopPropagation ();
  deleteSongDispatch (song);
};

<span className="delete" onClick={(e) => handleDeleteSong (e, item)}>
  <i className="iconfont">&#xe63d;</i>
</span>
```

重点在于 deleteSongDispatch 的逻辑，我们来一步步拆解它。

```text
//mapDispatchToProps 中
deleteSongDispatch (data) {
  dispatch (deleteSong (data));
}
```

然后在 Player/store/constants.js 中增加:

```text
export const DELETE_SONG = 'player/DELETE_SONG';
```

在 store/actionCreator.js 中导入 DELETE_SONG, 然后增加一个新的 action:

```text
export const deleteSong = (data) => ({
  type: DELETE_SONG,
  data
});
```

现在转到 store/reducer.js 下编写删除的逻辑:

```text
import { findIndex } from '../../../api/utils';// 注意引入工具方法
//...
const handleDeleteSong = (state, song) => {
  // 也可用 loadsh 库的 deepClone 方法。这里深拷贝是基于纯函数的考虑，不对参数 state 做修改
  const playList = JSON.parse (JSON.stringify (state.get ('playList').toJS ()));
  const sequenceList = JSON.parse (JSON.stringify (state.get ('sequencePlayList').toJS ()));
  let currentIndex = state.get ('currentIndex');
  // 找对应歌曲在播放列表中的索引
  const fpIndex = findIndex (song, playList);、
  // 在播放列表中将其删除
  playList.splice (fpIndex, 1);
  // 如果删除的歌曲排在当前播放歌曲前面，那么 currentIndex--，让当前的歌正常播放
  if (fpIndex < currentIndex) currentIndex--;
  
  // 在 sequenceList 中直接删除歌曲即可
  const fsIndex = findIndex (song, sequenceList);
  sequenceList.splice (fsIndex, 1);

  return state.merge ({
    'playList': fromJS (playList),
    'sequencePlayList': fromJS (sequenceList),
    'currentIndex': fromJS (currentIndex),
  });
}

export default (state = defaultState, action) => {
  switch (action.type) {
    //...
    case actionTypes.DELETE_SONG:
      return handleDeleteSong (state, action.data);
    default:
      return state;
  }
}
```

现在点击单个歌曲后面的删除按钮便能成功地将歌曲从列表删除啦！

## 清空歌曲功能

一般而言，删除全部是一个影响比较大的操作，如果弹出一个确定框，让用户点击确定再操作，无疑是更加合理的。

因此，我们首先来封装弹框组件，然后进行事件绑定。

在 baseUI 目录下新建 confirm 文件夹，然后新建 index.js 文件。

其代码从 [代码地址 (opens new window)](https://github.com/sanyuan0704/react-cloud-music/blob/master/src/baseUI/confirm/index.js)中获取，也是一个非常基础的组件，里面的封装操作和之前的类似，就不再浪费篇幅了。

回到 PlayList 组件，我们引入 Confirm 组件:

```text
import Confirm from './../../../baseUI/confirm/index';
const confirmRef = useRef ();
//JSX
return (
  <PlayListWrapper>
    //...
    <Confirm 
      ref={confirmRef}
      text={"是否删除全部？"} 
      cancelBtnText={"取消"} 
      confirmBtnText={"确定"} 
      handleConfirm={handleConfirmClear}
    />
  </PlayListWrapper>
)
```

现在来绑定一下清空事件:

```text
const handleShowClear = () => {
  confirmRef.current.show ();
} 

<span className="iconfont clear" onClick={handleShowClear}>&#xe63d;</span>
```

现在的工作是编写 Confirm 组件的回调函数 handleConfirmClear。

```text
import { changeSequecePlayList, changeCurrentSong, changePlayingState } from '../store/actionCreators';
//...
const { clearDispatch } = props;
const handleConfirmClear = () => {
  clearDispatch ();
}
```

clearDispatch 在 mapDispatchToProps 中定义:

```text
const mapDispatchToProps = (dispatch) => {
  return {
    //...
    clearDispatch () {
      // 1. 清空两个列表
      dispatch (changePlayList ([]));
      dispatch (changeSequecePlayList ([]));
      // 2. 初始 currentIndex
      dispatch (changeCurrentIndex (-1));
      // 3. 关闭 PlayList 的显示
      dispatch (changeShowPlayList (false));
      // 4. 将当前歌曲置空
      dispatch (changeCurrentSong ({}));
      // 5. 重置播放状态
      dispatch (changePlayingState (false));
    }
  }
};
```

## 修改播放模式

直接复用当时完成 normalPlayer 时修改播放模式的代码，当时我们实现过，估计你已经不陌生了。

```text
// 从 utils.js 中再引入 shuffle 和 findIndex
import { prefixStyle, getName, shuffle, findIndex } from './../../../api/utils';

const changeMode = () => {
  let newMode = (mode + 1) % 3;
  if (newMode === 0) {
    // 顺序模式
    changePlayListDispatch (sequencePlayList);
    let index = findIndex (currentSong, sequencePlayList);
    changeCurrentIndexDispatch (index);
  } else if (newMode === 1) {
    // 单曲循环
    changePlayListDispatch (sequencePlayList);
  } else if (newMode === 2) {
    // 随机播放
    let newList = shuffle (sequencePlayList);
    let index = findIndex (currentSong, newList);
    changePlayListDispatch (newList);
    changeCurrentIndexDispatch (index);
  }
  changeModeDispatch (newMode);
};
```

## 下滑关闭及反弹效果

作为一个精美的 App，在完成基本功能的同时，我们也有其他交互细节的考量。比如在安卓中下滑小段距离时会有反弹，下滑超过了一定阈值就会关闭浮层。现在就带大家来完成这个移动端常用的功能。

实现这个交互的关键在于利用好 touchStart， touchMove, touchEnd 这三个事件的回调。

首先来绑定事件:

```text
const handleTouchStart = (e) => {};
const handleTouchMove = (e) => {};
const handleTouchEnd = (e) => {};
//...
<div 
  className="list_wrapper" 
  ref={listWrapperRef} 
  onClick={e => e.stopPropagation ()}
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
>
```

其次，对于 Scroll 组件:

```text
// 是否允许滑动事件生效
const [canTouch,setCanTouch] = useState (true);

const listContentRef = useRef ();
const handleScroll = (pos) => {
  // 只有当内容偏移量为 0 的时候才能下滑关闭 PlayList。否则一边内容在移动，一边列表在移动，出现 bug
  let state = pos.y === 0;
  setCanTouch (state);
}

<Scroll 
  ref={listContentRef} 
  onScroll={pos => handleScroll (pos)}
  bounceTop={false}
>
```

接下来我们来具体地编写那三个 touch 事件的回调函数。

首先初始化三个变量:

```text
//touchStart 后记录 y 值
const [startY, setStartY] = useState (0);
//touchStart 事件是否已经被触发
const [initialed, setInitialed] = useState (0);
// 用户下滑的距离
const [distance, setDistance] = useState (0);
```

对于 touchStart 事件：

```text
const handleTouchStart = (e) => {
  if (!canTouch || initialed) return;
  listWrapperRef.current.style ["transition"] = "";
  setStartY (e.nativeEvent.touches [0].pageY);// 记录 y 值
  setInitialed (true);
};
```

对于 touchMove 事件:

```text
const handleTouchMove = (e) => {
  if (!canTouch || !initialed) return;
  let distance = e.nativeEvent.touches [0].pageY - startY;
  if (distance < 0) return;
  setDistance (distance);// 记录下滑距离
  listWrapperRef.current.style.transform = `translate3d (0, ${distance} px, 0)`;
};
```

对于 touchEnd:

```text
const handleTouchEnd = (e) => {
  setInitialed (false);
  // 这里设置阈值为 150px
  if (distance >= 150) {
    // 大于 150px 则关闭 PlayList
    togglePlayListDispatch (false);
  } else {
    // 否则反弹回去
    listWrapperRef.current.style ["transition"] = "all 0.3s";
    listWrapperRef.current.style [transform] = `translate3d (0px, 0px, 0px)`;
  }
};
```

恭喜你，现在终于开发完成了这个看似简单却实际上并不简单的 PlayList 组件。如今播放器的功能已经比较完整了，但是仍然有一个非常重要的功能需要完成 —— 歌词功能，下一节就让我们开始歌词开发的第一步 —— 歌词解析插件的封装。



# 播放器8 来，手写一个歌词解析第三方插件

> 本节代码对应 GitHub 分支: chapter9

[仓库传送门(opens new window)](https://github.com/sanyuan0704/react-cloud-music/tree/chapter9)

# 歌词解析插件封装

在封装插件之前，我想有必要给大家看一看歌词数据的格式。

在 Player/index.js 中：

```text
// 在组件内部编写
const currentLyric = useRef ();

useEffect (() => {
  //...
  getLyric (current.id);
  setCurrentTime (0);
  setDuration ((current.dt/ 1000) | 0);
}, [currentIndex, playList]);

const getLyric = id => {
  let lyric = "";
  getLyricRequest (id)
    .then (data => {
      console.log (data)
      lyric = data.lrc.lyric;
      if (!lyric) {
        currentLyric.current = null;
        return;
      }
    })
    .catch (() => {
      songReady.current = true;
      audioRef.current.play ();
    });
};
```

其中 getLyricRequest 方法封装在 api/request.js 中。

```text
export const getLyricRequest = id => {
  return axiosInstance.get (`/lyric?id=${id}`);
};
```

在 Player/index.js 中引入。

目前打开播放器，点一首歌，便能在控制台看到获取到的歌词信息。

![img](https://img-repo.poetries.top/images/16e0803db83a9fb4.jpeg)

可以看到，现在能获取到的歌词信息仅仅只是一个字符串，而且格式相对规整，[] 中的内容为时间戳，紧接着的内容是歌词内容。

如果想要将歌词集成到现有的项目中，那解析歌词是必不可少的工作。

现在，就带大家来一起完成这个相对复杂的插件的封装，后期会以彩蛋的形式对它进行扩展、升级。

> 第一版插件代码参考了现有 github 开源仓库 https://github.com/ustbhuangyi/lyric-parser，在此深表鸣谢！

## 初始化插件

构造器传入两个参数，一个是待解析的字符串，另一个是当歌曲播放抵达某个时间戳的时候，执行相应的回调。

```text
// 解析 [00:01.997] 这一类时间戳的正则表达式
const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g

const STATE_PAUSE = 0
const STATE_PLAYING = 1
export default class Lyric {
  /**
   * @params {string} lrc
   * @params {function} handler
  */ 
  constructor (lrc, hanlder = () => {}) {
    this.lrc = lrc;
    this.lines = [];// 这是解析后的数组，每一项包含对应的歌词和时间
    this.handler = hanlder;// 回调函数
    this.state = STATE_PAUSE;// 播放状态
    this.curLineIndex = 0;// 当前播放歌词所在的行数
    this.startStamp = 0;// 歌曲开始的时间戳

    this._initLines ();
  }

  _initLines () {
    // 解析代码
  }
}
```

## 解析字符串，生成 lines 数组

```text
  _initLines () {
    // 解析代码
    const lines = this.lrc.split ('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines [i];// 如 "[00:01.997] 作词：薛之谦"
      let result = timeExp.exec (line);
      if (!result) continue;
      const txt = line.replace (timeExp, '').trim ();// 现在把时间戳去掉，只剩下歌词文本
      if (txt) {
        if (result [3].length === 3) {
          result [3] = result [3]/10;//[00:01.997] 中匹配到的 997 就会被切成 99
        }
        this.lines.push ({
          time: result [1] * 60 * 1000 + result [2] * 1000 + (result [3] || 0) * 10,// 转化具体到毫秒的时间，result [3] * 10 可理解为 (result / 100) * 1000
          txt
        });
      }
    }
    this.lines.sort ((a, b) => {
      return a.time - b.time;
    });// 根据时间排序
  }
```

现在解析后的效果如下:

![img](https://img-repo.poetries.top/images/16e0803fc82c001c.jpeg)

## 开始播放

对应的插件方法为 play 方法，如下所示:

```text
//offset 为时间进度，isSeek 标志位表示用户是否手动调整进度
play (offset = 0, isSeek = false) {
  if (!this.lines.length) {
    return;
  }
  this.state = STATE_PLAYING;
  // 找到当前所在的行
  this.curLineIndex = this._findcurLineIndex (offset);
  // 现在正处于第 this.curLineIndex-1 行
  // 立即定位，方式是调用传来的回调函数，并把当前歌词信息传给它
  this._callHandler (this.curLineIndex-1);
  // 根据时间进度判断歌曲开始的时间戳
  this.startStamp = +new Date () - offset;

  if (this.curLineIndex < this.lines.length) {
    clearTimeout (this.timer);
    // 继续播放
    this._playRest (isSeek);
  }
}

_findcurLineIndex (time) {
  for (let i = 0; i < this.lines.length; i++) {
    if (time <= this.lines [i].time) {
      return i
    }
  }
  return this.lines.length - 1
}

_callHandler (i) {
  if (i < 0) {
    return
  }
  this.handler ({
    txt: this.lines [i].txt,
    lineNum: i
  })
}
```

## 继续播放

对应的方法为_playRest，如下所示:

```text
//isSeek 标志位表示用户是否手动调整进度
_playRest (isSeek=false) {
  let line = this.lines [this.curLineIndex];
  let delay;
  if (isSeek) {
    delay = line.time - (+new Date () - this.startStamp);
  } else {
    // 拿到上一行的歌词开始时间，算间隔
    let preTime = this.lines [this.curLineIndex - 1] ? this.lines [this.curLineIndex - 1].time : 0;
    delay = line.time - preTime;
  }
  this.timer = setTimeout (() => {
    this._callHandler (this.curLineIndex++);
    if (this.curLineIndex < this.lines.length && this.state === STATE_PLAYING) {
      this._playRest ();
    }
  }, delay)
}
```

画图模拟一下 isSeek 为 true 和 false 的两种情况。

![img](https://img-repo.poetries.top/images/16e08041cfd3ef47.jpeg)

那触发下一次_playRest 就还剩 00:03.123 - (new Date () - 歌曲开始的时间戳)。即:

```text
delay = line.time - (+new Date () - this.startStamp);
```

![img](https://img-repo.poetries.top/images/16e0804323d841a4.jpeg)

那这个时候触发下一次_playRest 就还剩 00:05.763 - 00:03:123 了。即:

```text
// 拿到上一行的歌词开始时间，算间隔
let preTime = this.lines [this.curLineIndex - 1] ? this.lines [this.curLineIndex - 1].time : 0;
delay = line.time - preTime;
```

## 两个状态切换：暂停和播放

歌曲暂停 (播放) 的时候，歌词也应该相应地暂停 (播放)。

```text
togglePlay (offset) {
  if (this.state === STATE_PLAYING) {
    this.stop ()
  } else {
    this.state = STATE_PLAYING
    this.play (offset, true)
  }
}

stop () {
  this.state = STATE_PAUSE
  clearTimeout (this.timer)
}
```

## 切到某个时间点播放

由于之前做了很多的铺垫，现在用户手动调整进度的时候，只需要调用 play 方法，并对 isSeek 参数传入 true 就可以了。

```text
seek (offset) {
  this.play (offset, true)
}
```

OK! 歌词插件初步封装完成，接下来我们需要将它集成项目中，不要走开，精彩继续！



# 播放器9 歌词功能深度集成

> 本节代码对应 GitHub 分支: chapter9

[仓库传送门(opens new window)](https://github.com/sanyuan0704/react-cloud-music/tree/chapter8)

## 播放器逻辑

首先，将 Player/index.js 中的获取歌词的代码完善一下。

```text
// 记得引入插件
import Lyric from './../../api/lyric-parser';

const handleLyric = ({lineNum, txt}) => {
  if (!currentLyric.current) return;
  currentLineNum.current = lineNum;
  setPlayingLyric (txt);
};

const getLyric = id => {
  let lyric = "";
  if (currentLyric.current) {
    currentLyric.current.stop ();
  }
  // 避免 songReady 恒为 false 的情况
  getLyricRequest (id)
    .then (data => {
      lyric = data.lrc.lyric;
      if (!lyric) {
        currentLyric.current = null;
        return;
      }
      currentLyric.current = new Lyric (lyric, handleLyric);
      currentLyric.current.play ();
      currentLineNum.current = 0;
      currentLyric.current.seek (0);
    })
    .catch (() => {
      songReady.current = true;
      audioRef.current.play ();
    });
};
```

对于歌词功能，已经有了一个 currentLyric 对象，但同时我们还有一条即时歌词，因此要再声明一个 currentPlayingLyric 变量:

```text
const [currentPlayingLyric, setPlayingLyric] = useState ("");
```

当然，还有一个记录当前行数的 currentLineNum:

```text
const currentLineNum = useRef (0);
```

然后，将这些属性传递给 nornalPlayer 处理:

```text
<NormalPlayer
  //...
  currentLyric={currentLyric.current}
  currentPlayingLyric={currentPlayingLyric}
  currentLineNum={currentLineNum.current}
></NormalPlayer>
```

对于歌曲播放的过程，还有两个非常重要的逻辑需要处理，一个是歌曲暂停，一个是歌曲进度更新，这两种情况，歌词都是需要跟着改变的。

歌曲暂停 / 播放:

```text
const clickPlaying = (e, state) => {
  //...
  if (currentLyric.current) {
    currentLyric.current.togglePlay (currentTime*1000);
  }
};
```

歌曲进度更新:

```text
const onProgressChange = curPercent => {
  //...
  if (currentLyric.current) {
    currentLyric.current.seek (newTime * 1000);
  }
};
```

## normalPlayer 中集成

先从父组件接收歌词相关的属性:

```text
const {
  currentLineNum,
  currentPlayingLyric,
  currentLyric
} = props;
```

我们希望点击中间的 CD 之后切换为歌词，因此中间部分可以保存一个状态，根据它来显示不同的内容。

```text
import Scroll from "../../../baseUI/scroll";
import { LyricContainer, LyricWrapper } from "./style";

const currentState = useRef ("");
const lyricScrollRef = useRef ();
const lyricLineRefs = useRef ([]);

// 在 Middle 组件内
<Middle ref={cdWrapperRef} onClick={toggleCurrentState}>
  <CSSTransition
    timeout={400}
    classNames="fade"
    in={currentState.current !== "lyric"}
  >
    <CDWrapper style={{visibility: currentState.current !== "lyric" ? "visible" : "hidden"}}>
      // 其余跟以前保持一致
      <p className="playing_lyric">{currentPlayingLyric}</p>
    </CDWrapper>
  </CSSTransition>
  <CSSTransition
    timeout={400}
    classNames="fade"
    in={currentState.current === "lyric"}
  >
    <LyricContainer>
      <Scroll ref={lyricScrollRef}>
        <LyricWrapper
          style={{visibility: currentState.current === "lyric" ? "visible" : "hidden"}}
          className="lyric_wrapper"
        >
          {
            currentLyric
              ? currentLyric.lines.map ((item, index) => {
              // 拿到每一行歌词的 DOM 对象，后面滚动歌词需要！ 
              lyricLineRefs.current [index] = React.createRef ();
              return (
                <p
                  className={`text ${
                    currentLineNum === index ? "current" : ""
                  }`}
                  key={item + index}
                  ref={lyricLineRefs.current [index]}
                >
                  {item.txt}
                </p>
              );
            })
          : <p className="text pure"> 纯音乐，请欣赏。</p>}
        </LyricWrapper>
      </Scroll>
    </LyricContainer>
  </CSSTransition>
</Middle>
```

对应的 style.js 中，相应的样式代码如下:

```text
export const LyricContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;
export const LyricWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  p {
    line-height: 32px;
    color: rgba (255, 255, 255, 0.5);
    white-space: normal;
    font-size: ${style ["font-size-l"]};
    &.current {
      color: #fff;
    }
    &.pure {
      position: relative;
      top: 30vh;
    }
  }
`;
```

其中，toggleCurrentState 为改变 Middle 状态的方法，定义如下:

```text
const toggleCurrentState = () => {
  if (currentState.current !== "lyric") {
    currentState.current = "lyric";
  } else {
    currentState.current = "";
  }
};
```

这个时候打开播放器，可以完整的看到歌词了，但是你滑动进度条，歌词并没有跟着动。那这是什么原因呢？

因为父组件 currentLine 已经改变，而 normalPlayer 的歌词并没有滚动到相应位置。

现在我们就来监听 currentLine 变量，当它改变时，来进行一些歌词滚动操作。

```text
import { useEffect } from "react";

useEffect (() => {
  if (!lyricScrollRef.current) return;
  let bScroll = lyricScrollRef.current.getBScroll ();
  if (currentLineNum > 5) {
    // 保持当前歌词在第 5 条的位置
    let lineEl = lyricLineRefs.current [currentLineNum - 5].current;
    bScroll.scrollToElement (lineEl, 1000);
  } else {
    // 当前歌词行数 <=5, 直接滚动到最顶端
    bScroll.scrollTo (0, 0, 1000);
  }
}, [currentLineNum]);
```

现在歌词的功能就非常正常了。

不过还有一个小小的 bug，当在歌词界面退出播放器的时候，下次进来的时候并不是 CD 先进来，我们在退出播放器的时候将状态还原。

```text
const afterLeave = () => {
  //...
  currentState.current = "";
};
```

到目前为止，歌词的功能就集成完毕了。从下小节开始，我们进入到搜索模块的开发。大家加油！



# 搜索模块1 小小的搜索框，大大的学问

> 本节代码对应 GitHub 分支: chapter10

[仓库传送门(opens new window)](https://github.com/sanyuan0704/react-cloud-music/tree/chapter10)

## 路由相关

首先构建路由。

```text
//routes/index.js
import Search from '../application/Search';

export default [
  {
    path: "/",
    component: Home,
    routes: [
      //...
      {
        path: "/search",
        exact: true,
        key: "search",
        component: Search
      } 
    ] 
]
```

现在在 application/Search 目录下新建 index.js：

```text
import React, {useState, useEffect} from 'react';
import { CSSTransition } from 'react-transition-group';
import { Container } from './style';

function Search (props) {
  // 控制动画
  const [show, setShow] = useState (false);
  useEffect (() => {
    setShow (true);
  }, []);
  return (
    <CSSTransition
    in={show}
    timeout={300}
    appear={true}
    classNames="fly"
    unmountOnExit
    onExited={() => props.history.goBack ()}
  >
    <Container>
      <div onClick={() => (setShowfalse)}> 返回 </div>
    </Container>
  </CSSTransition>
  )
}

export default Search;
```

相应的 style.js 中，我们来完成 Container 组件:

```text
import styled from'styled-components';
import style from '../../assets/global-style';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 100;
  overflow: hidden;
  background: #f2f3f4;
  transform-origin: right bottom;
`
```

当然，为了给 Search 页面进出场的过渡效果，我们加上相关的动画钩子类的编写:

```text
&.fly-enter, &.fly-appear {
  transform: translate3d (100%, 0, 0);
}
&.fly-enter-active, &.fly-appear-active {
  transition: all .3s;
  transform: translate3d (0, 0, 0);
}
&.fly-exit {
  transform: translate3d (0, 0, 0);
}
&.fly-exit-active {
  transition: all .3s;
  transform: translate3d (100%, 0, 0);
}
```

现在，我们进入 Home 组件，也就是跳转路由的地方，给 Search 组件一个入口。

```text
//application/Home/index.js
<span className="iconfont search" onClick={() => props.history.push ('/search')}>&#xe62b;</span>
```

现在你点击搜索图标就能进入到 Search 页面，并且进出场都是会带滑动的过渡效果。

好，基础框架搭建就到这里，接下来，我们实现 Search 的具体内容。

## 搜索框基础组件开发

搜索框对于这个模块来说是一个非常关键的子组件，涉及到比较复杂的交互，可以说是这个模块的 "中枢" 部分。

在 baseUI/search-box 目录下，新建 index.js：

```text
import React, {useRef, useState, useEffect, useMemo} from 'react';
import styled from'styled-components';
import style from '../../assets/global-style';
import { debounce } from './../../api/utils';


const SearchBox = (props) => {
  const queryRef = useRef ();
  const [query, setQuery] = useState ('');
  // 从父组件热门搜索中拿到的新关键词
  const { newQuery } = props;
  // 父组件针对搜索关键字发请求相关的处理
  const { handleQuery } = props;
  // 根据关键字是否存在决定清空按钮的显示 / 隐藏 
  const displayStyle = query ? {display: 'block'}: {display: 'none'};

  const handleChange = () => {
    // 搜索框内容改变时的逻辑
  };
  const clearQuery = () => {
    // 清空框内容的逻辑
  }

  return (
    <SearchBoxWrapper>
      <i className="iconfont icon-back" onClick={() => props.back ()}>&#xe655;</i>
      <input ref={queryRef} className="box" placeholder="搜索歌曲、歌手、专辑" value={query} onChange={handleChange}/>
      <i className="iconfont icon-delete" onClick={clearQuery} style={displayStyle}>&#xe600;</i>
    </SearchBoxWrapper>
  )
};
```

下面是 SearchBoxWrapper 的样式部分:

```text
const SearchBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  padding-right: 20px;
  height: 40px;
  background: ${style ["theme-color"]};
  .icon-back {
    font-size: 24px;
    color: ${style ["font-color-light"]};
  }
  .box {
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background: ${style ["theme-color"]};
    color: ${style ["highlight-background-color"]};
    font-size: ${style ["font-size-m"]};
    outline: none;
    border: none;
    border-bottom: 1px solid ${style ["border-color"]};
    &::placeholder {
      color: ${style ["font-color-light"]};
    }
  }
  .icon-delete {
    font-size: 16px;
    color: ${style ["background-color"]};
  }
`
```

好，现在就让我们来梳理一下搜索框的核心逻辑:

1. 进场时 input 框应该出现光标
2. 内容改变时要执行父组件传来的回调
3. 当父组件点击热门搜索中的关键词时，如果新关键词与现在的 query 不同，则修改 query 并执行回调

现在就让我们来一一实现:

进场出现光标:

```text
useEffect (() => {
  queryRef.current.focus ();
}, []);
```

query 改变时执行回调:

```text
// 监听 input 框的内容
const handleChange = (e) => {
  setQuery (e.currentTarget.value);
};

// 缓存方法
let handleQueryDebounce = useMemo (() => {
  return debounce (handleQuery, 500);
}, [handleQuery]);

useEffect (() => {
  // 注意防抖
  handleQueryDebounce (query);
}, [query]);
```

父组件点击了热门搜索的关键字，newQuery 更新:

```text
useEffect (() => {
  if (newQuery !== query){
    setQuery (newQuery);
  }
}, [newQuery]);
```

还剩下清空的逻辑:

```text
const clearQuery = () => {
  setQuery ('');
  queryRef.current.focus ();
}
```

目前为止，SearchBox 组件就搭建的差不多了，我们把它对接到 Search 组件中。

```text
//Search/index.js
import SearchBox from './../../baseUI/search-box/index';

// 组件内部
const [query, setQuery] = useState ('');

// 由于是传给子组件的方法，尽量用 useCallback 包裹，以使得在依赖未改变，始终给子组件传递的是相同的引用
const searchBack = useCallback (() => {
  setShow (false);
}, []);

const handleQuery = (q) => {
  setQuery (q);
}
// Container 中删除原来的内容，换成下面的
<Container>
  <div className="search_box_wrapper">
    <SearchBox back={searchBack} newQuery={query} handleQuery={handleQuery}></SearchBox>
  </div>
</Container>
```

现在打开搜索页面，就能顺利地看到搜索框啦！接下来我们就来开发具体的 Search 组件的逻辑了。



# 搜索模块2 火力全开，完成最后的组件

> 本节代码对应 GitHub 分支: chapter10

[仓库传送门(opens new window)](https://github.com/sanyuan0704/react-cloud-music/tree/chapter10)

首先开发 redux 数据层。

## axios 请求准备

在 api/request.js 中加入:

```text
export const getHotKeyWordsRequest = () => {
  return axiosInstance.get (`/search/hot`);
};

export const getSuggestListRequest = query => {
  return axiosInstance.get (`/search/suggest?keywords=${query}`);
};

export const getResultSongsListRequest = query => {
  return axiosInstance.get (`/search?keywords=${query}`);
};
```

## redux 层开发

### 1. 声明初始化 state

```text
//reducer.js
import * as actionTypes from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS ({
  hotList: [], // 热门关键词列表
  suggestList: [],// 列表，包括歌单和歌手
  songsList: [],// 歌曲列表
  enterLoading: false
})
```

### 2. 定义 constants

```text
//constants.js
export const SET_HOT_KEYWRODS = "search/SET_HOT_KEYWRODS";
export const SET_SUGGEST_LIST = 'search/SET_SUGGEST_LIST';
export const SET_RESULT_SONGS_LIST = 'search/SET_RESULT_SONGS_LIST'; 
export const SET_ENTER_LOADING = 'search/SET_ENTER_LOADING'; 
```

### 3. 定义 reducer 函数

```text
export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_HOT_KEYWRODS:
      return state.set ('hotList', action.data);
    case actionTypes.SET_SUGGEST_LIST:
      return state.set ('suggestList', action.data);
    case actionTypes.SET_RESULT_SONGS_LIST:
      return state.set ('songsList', action.data);
    case actionTypes.SET_ENTER_LOADING:
      return state.set ('enterLoading', action.data);
    default:
      return state;
  }
}
```

### 4. 编写具体的 action

逻辑都非常简单，直接放出代码：

```text
//actionCreators.js

import { SET_HOT_KEYWRODS, SET_SUGGEST_LIST, SET_RESULT_SONGS_LIST, SET_ENTER_LOADING } from './constants';
import { fromJS } from 'immutable';
import { getHotKeyWordsRequest, getSuggestListRequest, getResultSongsListRequest } from './../../../api/request';

const changeHotKeyWords = (data) => ({
  type: SET_HOT_KEYWRODS,
  data: fromJS (data)
});

const changeSuggestList = (data) => ({
  type: SET_SUGGEST_LIST,
  data: fromJS (data)
});

const changeResultSongs = (data) => ({
  type: SET_RESULT_SONGS_LIST,
  data: fromJS (data)
});

export const changeEnterLoading = (data) => ({
  type: SET_ENTER_LOADING,
  data
});

export const getHotKeyWords = () => {
  return dispatch => {
    getHotKeyWordsRequest ().then (data => {
      // 拿到关键词列表
      let list = data.result.hots;
      dispatch (changeHotKeyWords (list));
    })
  }
};
export const getSuggestList = (query) => {
  return dispatch => {
    getSuggestListRequest (query).then (data => {
      if (!data) return;
      let res = data.result || [];
      dispatch (changeSuggestList (res));
    })
    getResultSongsListRequest (query).then (data => {
      if (!data) return;
      let res = data.result.songs || [];
      dispatch (changeResultSongs (res));
      dispatch (changeEnterLoading (false));// 关闭 loading
    })
  }
};
```

### 5. 将相关变量导出

```text
//index.js
import reducer from './reducer'
import * as actionCreators from './actionCreators'
import * as constants from './constants'

export { reducer, actionCreators, constants };
```

## 组件连接 Redux

首先，需要将 Search 下的 reducer 注册到全局 store，在 src 目录下的 store/reducer.js 中。(注意，这个操作非常重要，当时因为这个问题调整了很久，后来打开 redux-devtools 中才猛然发现。)

```text
import { combineReducers } from "redux-immutable";
import { reducer as recommendReducer } from "../application/Recommend/store/index";
import { reducer as singersReducer } from "../application/Singers/store/index";
import { reducer as rankReducer } from "../application/Rank/store/index";
import { reducer as albumReducer } from "../application/Album/store/index";
import { reducer as singerInfoReducer } from "../application/Singer/store/index";
import { reducer as playerReducer } from "../application/Player/store/index";
import { reducer as searchReducer } from "../application/Search/store/index";

export default combineReducers ({
  recommend: recommendReducer,
  singers: singersReducer,
  rank: rankReducer,
  album: albumReducer,
  singerInfo: singerInfoReducer,
  player: playerReducer,
  search: searchReducer,
});
```

现在在 Search/index.js 中，准备连接 Redux。 增加代码:

```text
import { connect } from 'react-redux';

// 组件代码

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
  hotList: state.getIn (['search', 'hotList']),
  enterLoading: state.getIn (['search', 'enterLoading']),
  suggestList: state.getIn (['search', 'suggestList']),
  songsCount: state.getIn (['player', 'playList']).size,
  songsList: state.getIn (['search', 'songsList'])
});

// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    getHotKeyWordsDispatch () {
      dispatch (getHotKeyWords ());
    },
    changeEnterLoadingDispatch (data) {
      dispatch (changeEnterLoading (data))
    },
    getSuggestListDispatch (data) {
      dispatch (getSuggestList (data));
    },
  }
};
// 将 ui 组件包装成容器组件
export default connect (mapStateToProps, mapDispatchToProps)(React.memo (Search));
```

## 组件对接真实数据

首先在组件中取出 redux 中的数据:

```text
import { getHotKeyWords, changeEnterLoading, getSuggestList } from './store/actionCreators';
import { connect } from 'react-redux';
import { Container, ShortcutWrapper, HotKey } from './style';
import Scroll from '../../baseUI/scroll';

const {
  hotList, 
  enterLoading, 
  suggestList: immutableSuggestList, 
  songsCount, 
  songsList: immutableSongsList
} = props;

const suggestList = immutableSuggestList.toJS ();
const songsList = immutableSongsList.toJS ();

const {
  getHotKeyWordsDispatch,
  changeEnterLoadingDispatch,
  getSuggestListDispatch,
  getSongDetailDispatch
} = props;
```

我们接下来要做三件事情:

1. 当搜索框为空，展示热门搜索列表
2. 当搜索框有内容时，发送 Ajax 请求，显示搜索结果
3. 点击搜索结果，分别进入到不同的详情页中

第一步，当搜索框为空时：

```text
//Search 组件内
const renderHotKey = () => {
  let list = hotList ? hotList.toJS (): [];
  return (
    <ul>
      {
        list.map (item => {
          return (
            <li className="item" key={item.first} onClick={() => setQuery (item.first)}>
              <span>{item.first}</span>
            </li>
          )
        })
      }
    </ul>
  )
};
//Container 组件中添加
<ShortcutWrapper show={!query}>
  <Scroll>
    <div>
      <HotKey>
        <h1 className="title"> 热门搜索 </h1>
        {renderHotKey ()}
      </HotKey>
    </div>
  </Scroll>
</ShortcutWrapper>
```

对应的 style.js：

```text
export const ShortcutWrapper = styled.div`
  position: absolute;
  top: 40px;
  bottom: 0;
  width: 100%;
  display: ${props => props.show ? "":"none"};
`

export const HotKey = styled.div`
  margin: 0 20px 20px 20px;
  .title {
    padding-top: 35px;
    margin-bottom: 20px;
    font-size: ${style ["font-size-m"]};
    color: ${style ["font-color-desc-v2"]};
  }
  .item {
    display: inline-block;
    padding: 5px 10px;
    margin: 0 20px 10px 0;
    border-radius: 6px;
    background: ${style ["highlight-background-color"]};
    font-size: ${style ["font-size-m"]};
    color: ${style ["font-color-desc"]};
  }
`
```

当组件初次渲染时，我们发送 Ajax 请求拿到热门列表。

```text
useEffect (() => {
  setShow (true);
  // 用了 redux 缓存，不再赘述
  if (!hotList.size)
    getHotKeyWordsDispatch ();
}, []);
```

现在就能成功地看到热门标签了，而且点击标记，搜索框的内容也能跟着改变。

第二步，搜索框有内容时:

在 handleQuery 中加入下面的逻辑。

```text
const handleQuery = (q) => {
  //...
  if (!q) return;
  changeEnterLoadingDispatch (true);
  getSuggestListDispatch (q);
}
```

然后分别渲染歌单、歌手和单曲列表。

```text
// 顺便引入 Loading
import Loading from './../../baseUI/loading/index';

const renderSingers = () => {};
const renderAlbum = () => {};
const renderSongs = () => {};

{/* 紧接在热门列表后面 */}
{/* 下面为搜索结果 */}
<ShortcutWrapper show={query}>
  <Scroll onScorll={forceCheck}>
    <div>
      {renderSingers ()}
      {renderAlbum ()}
      {renderSongs ()}
    </div>
  </Scroll>
</ShortcutWrapper>
{ enterLoading? <Loading></Loading> : null }
```

对于歌单而言:

```text
// 注意引入相应组件
import LazyLoad, {forceCheck} from 'react-lazyload';
import { List, ListItem } from './style';

const renderAlbum = () => {
  let albums = suggestList.playlists;
  if (!albums || !albums.length) return;
  return (
    <List>
      <h1 className="title"> 相关歌单 </h1>
      {
        albums.map ((item, index) => {
          return (
            <ListItem key={item.accountId+""+index}>
              <div className="img_wrapper">
                <LazyLoad placeholder={<img width="100%" height="100%" src={require ('./music.png')} alt="music"/>}>
                  <img src={item.coverImgUrl} width="100%" height="100%" alt="music"/>
                </LazyLoad>
              </div>
              <span className="name"> 歌单: {item.name}</span>
            </ListItem>
          )
        })
      }
    </List>
  )
};
```

style.js 中的 List 和 ListItem 如下:

```text
export const List = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  overflow: hidden;
  .title {
    margin:10px 0 10px 10px;
    color: ${style ["font-color-desc"]};
    font-size: ${style ["font-size-s"]};
  }
`;
export const ListItem = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  margin: 0 5px;
  padding: 5px 0;
  align-items: center;
  border-bottom: 1px solid ${style ["border-color"]};
  .img_wrapper {
    margin-right: 20px;
    img {
      border-radius: 3px;
      width: 50px;
      height: 50px;
    }
  }
  .name {
    font-size: ${style ["font-size-m"]};
    color: ${style ["font-color-desc"]};
    font-weight: 500;
  }
`;
```

这里进入的是一个全新的路由。但是我们可以复用 Album 组件，在 routes/index.js 增加:

```text
//...
// 增加 album 路由，用来显示歌单
{
  path: "/album/:id",
  exact: true,
  key: "album",
  component: Album
},
{
  path: "/search",
  exact: true,
  key: "search",
  component: Search
}
//...
```

对于歌手而言:

```text
const renderSingers = () => {
  let singers = suggestList.artists;
  if (!singers || !singers.length) return;
  return (
    <List>
      <h1 className="title"> 相关歌手 </h1>
      {
        singers.map ((item, index) => {
          return (
            <ListItem key={item.accountId+""+index}>
              <div className="img_wrapper">
                <LazyLoad placeholder={<img width="100%" height="100%" src={require ('./singer.png')} alt="singer"/>}>
                  <img src={item.picUrl} width="100%" height="100%" alt="music"/>
                </LazyLoad>
              </div>
              <span className="name"> 歌手: {item.name}</span>
            </ListItem>
          )
        })
      }
    </List>
  )
};
```

对于单曲列表:

```text
// 引入代码
import { SongItem } from './style';
import { getName } from '../../api/utils';

const renderSongs = () => {
  return (
    <SongItem style={{paddingLeft: "20px"}}> 
      {
        songsList.map (item => {
          return (
            <li key={item.id}>
              <div className="info">
                <span>{item.name}</span>
                <span>
                  { getName (item.artists) } - { item.album.name }
                </span>
              </div>
            </li>
          )
        })
      }
    </SongItem>
)
```

SongItem 对应的样式代码:

```text
export const SongItem = styled.ul`
  >li {
    display: flex;
    height: 60px;
    align-items: center;  
    .index {
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
    .info {
      box-sizing: border-box;
      flex: 1;
      display: flex;
      height: 100%;
      padding: 5px 0;
      flex-direction: column;
      justify-content: space-around;
      border-bottom: 1px solid ${style ["border-color"]};
      >span:first-child {
        color: ${style ["font-color-desc"]};
      }
      >span:last-child {
        font-size: ${style ["font-size-s"]};
        color: #bba8a8;
      }
    }
  }
`
```

对应的 music.png 和 singer.png 占位图片已经放在仓库中，有需要可以去仓库拷贝一份。

这三者的逻辑虽然有点复杂，但是难度并不大。这里就不过多的拆解，大家将代码过一遍，能够理解每一步做的什么事情即可。

第三步，点击结果，进入到各自的详情页。

在 renderSingers 方法中:

```text
<ListItem key={item.accountId+""+index} onClick={() => props.history.push (`/singers/${item.id}`)}>
```

在 renderAlbum 方法中:

```text
<ListItem key={item.accountId+""+index} onClick={() => props.history.push (`/album/${item.id}`)}>
```

在 renderSongs 方法中:

```text
<li key={item.id} onClick={(e) => selectItem (e, item.id)}>
```

而 selectItem 定义如下:

```text
const selectItem = (e, id) => {

}
```

重点来了！现在歌单和歌手详情页都能正确跳转，后面的逻辑当然能走的通了，剩下的就是如何处理单曲的问题。我们希望点击单曲后能够直接播放，那么首先需要 将选中的单曲加入到播放列表中。顺便提一句，网易云给到的搜索单曲的接口中数据并不完整，需要我们拿到 id 再重新获取具体的单曲数据，然后再添加到播放列表中。

axios 请求部分:

```text
export const getSongDetailRequest = id => {
  return axiosInstance.get (`/song/detail?ids=${id}`);
};
```

关于歌曲的逻辑属于播放器部分，因此我们转到 Player/store/actionCreators.js 中来编写：

```text
import { getSongDetailRequest } from '../../../api/request';
import { INSERT_SONG } from './constants';

export const insertSong = (data) => ({
  type: INSERT_SONG,
  data
});

export const getSongDetail = (id) => {
  return (dispatch) => {
    getSongDetailRequest (id).then (data => {
      let song = data.songs [0];
      dispatch (insertSong ( song));
    })
  }
}
```

同目录 constants.js 中添加:

```text
export const INSERT_SONG = 'player/INSERT_SONG';
```

然后再 reducer 编写具体的 insert 逻辑:

```text
export default (state = defaultState, action) => {
  switch (action.type) {
    //...
    case actionTypes.INSERT_SONG:
      return handleInsertSong (state, action.data);
    default:
      return state;
  }
}
```

handleInsertSong 的逻辑还是比较复杂的，我们单独拎出来拆解:

```text
const handleInsertSong = (state, song) => {
  const playList = JSON.parse (JSON.stringify (state.get ('playList').toJS ()));
  const sequenceList = JSON.parse (JSON.stringify (state.get ('sequencePlayList').toJS ()));
  let currentIndex = state.get ('currentIndex');
  // 看看有没有同款
  let fpIndex = findIndex (song, playList);
  // 如果是当前歌曲直接不处理
  if (fpIndex === currentIndex && currentIndex !== -1) return state;
  currentIndex++;
  // 把歌放进去，放到当前播放曲目的下一个位置
  playList.splice (currentIndex, 0, song);
  // 如果列表中已经存在要添加的歌，暂且称它 oldSong
  if (fpIndex > -1) {
    // 如果 oldSong 的索引在目前播放歌曲的索引小，那么删除它，同时当前 index 要减一
    if (currentIndex > fpIndex) {
      playList.splice (fpIndex, 1);
      currentIndex--;
    } else {
      // 否则直接删掉 oldSong
      playList.splice (fpIndex+1, 1);
    }
  }
  // 同理，处理 sequenceList
  let sequenceIndex = findIndex (playList [currentIndex], sequenceList) + 1;
  let fsIndex = findIndex (song, sequenceList);
  // 插入歌曲
  sequenceList.splice (sequenceIndex, 0, song);
  if (fsIndex > -1) {
    // 跟上面类似的逻辑。如果在前面就删掉，index--; 如果在后面就直接删除
    if (sequenceIndex > fsIndex) {
      sequenceList.splice (fsIndex, 1);
      sequenceIndex--;
    } else {
      sequenceList.splice (fsIndex + 1, 1);
    }
  }
  return state.merge ({
    'playList': fromJS (playList),
    'sequencePlayList': fromJS (sequenceList),
    'currentIndex': fromJS (currentIndex),
  });
}
```

现在插入的逻辑可以在 Search 组件中运用了。

```text
const mapDispatchToProps = (dispatch) => {
  return {
    //...
    getSongDetailDispatch (id) {
      dispatch (getSongDetail (id));
    }
  }
};
```

在组件中：

```text
const selectItem = (e, id) => {
  getSongDetailDispatch (id);
}
```

现在点击单曲后，歌曲就能正常播放啦！

由于没有加上音符组件，因此这里不会有音符坠落的动画，加上去也非常简单。

```text
import MusicalNote from '../../baseUI/music-note';
import { useRef } from 'react';
// 组件内部
const musicNoteRef = useRef ();

// 返回的 JSX
// Container 标签中加入
<MusicalNote ref={musicNoteRef}></MusicalNote>
```

然后在 selectItem 方法中加入一行代码就 OK:

```text
const selectItem = (e, id) => {
  getSongDetailDispatch (id);
  musicNoteRef.current.startAnimation ({x:e.nativeEvent.clientX, y:e.nativeEvent.clientY});
}
```

当然，还剩下一个小小的 bug，事实上 Container 还是会遮盖住 miniPlayer。

之前专门修复了不少这样的 bug, 现在贴上代码:

```text
//Search/index.js
<Container play={songsCount}>
```

style.js 中:

```text
export const Container = styled.div`
  //...
  bottom: ${props => props.play > 0 ? "60px": 0};
  //...
`
```

搜索模块现在就开发完毕了。总体来说，还是非常复杂的一个组件。希望大家好好消化一下，对自己是一个很好的锻炼。



# 代码分割、项目部署及展望未来

## 组件 CodeSpliting

目前所有的组件已经开发完成，在打包之前，我们可以对组件进行代码分割，达到组件懒加载的效果，这也是性能优化的一个手段，因为没必要在一开始加载所有组件，尤其在应用特别复杂、组件规模非常庞大的时候，这样可以大幅提升首屏加载速度。

在路由代码中:

```text
import React from 'react';
import {Redirect} from "react-router-dom";
import Home from '../application/Home';
const RecommendComponent = lazy (() => import ("../application/Recommend/"));
const SingersComponent = lazy (() => import ("../application/Singers/"));
const RankComponent = lazy (() => import ("../application/Rank/"));
const AlbumComponent = lazy (() => import ("../application/Album/"));
const SingerComponent = lazy (() => import ("./../application/Singer/"));
const SearchComponent = lazy (() => import ("./../application/Search/"));

const SuspenseComponent = Component => props => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  )
}
export default [
  {
    path: "/",
    component: Home,
    routes: [
      {
        path: "/",
        exact: true,
        render: () => (
          <Redirect to={"/recommend"}/>
        )
      },
      {
        path: "/recommend/",
        component: SuspenseComponent (RecommendComponent),
        routes: [
          {
            path: "/recommend/:id",
            component: SuspenseComponent (AlbumComponent)
          }
        ]
      },
      {
        path: "/singers",
        component: SuspenseComponent (SingersComponent),
        routes: [
          {
            path: '/singers/:id',
            component: SuspenseComponent (SingerComponent)
          }
        ]
      },
      {
        path: "/rank/",
        component: SuspenseComponent (RankComponent),
        key: "rank",
        routes: [
          {
            path: "/rank/:id",
            component: SuspenseComponent (AlbumComponent)
          }
        ]
      },
      {
        path: "/album/:id",
        exact: true,
        key: "album",
        component: SuspenseComponent (AlbumComponent)
      },
      {
        path: "/search",
        exact: true,
        key: "search",
        component: SuspenseComponent (SearchComponent)
      }
    ]
  }
]
```

## 部署

如果想要部署，直接执行:

```text
npm run build
```

现在打包会生成 build 目录。

然后写这样一段代码:

```text
// 项目根目录下
// 相应的 express 和 compression 要装好
var express = require ('express')
var compression = require ('compression')
// 端口可以自己定义
var port = process.env.PORT || 8010;
var app = express ()
// 开启 gzip 压缩
app.use (compression ())
app.use (express.static ('./build'))
module.exports = app.listen (port, function (err) {
  if (err) {
    console.log (err)
    return
  }
  console.log ('Listening at https://localhost:' + port + '\n')
})
```

利用 express 服务部署到线上。

在服务器上运行：

```text
node server.js
```

这样就可以通过在外网进行访问了。不过终端关闭后服务会停止，这时我们可以利用 PM2 管理工具，首先

```text
npm install pm2 
```

然后通过一条命令就能轻松地启动服务:

```text
pm2 start ./server.js
```

现在终端关闭后也能正常地访问了。

## 总结

回过头梳理一下，我们写了近`6000行代码`，封装了`13个UI基础组件`，`12个应用组件`，完成了`七大模块`，可以说是实打实的项目经验，绝非简简单单的demo项目可以相比。更重要的是，我们践行了React中数据Immutable的思想，将性能优化由理论展开了实践，并在大大小小的组件封装过程中潜移默化地让大家体会react hooks的各种应用场景，可以说对React技术栈的同学是一个很好的巩固，对于之前掌握其他技术栈的同学也是一次新鲜的经历。



# 彩蛋1 CD世界更新_歌曲倍速播放

最近抽空将播放器的界面做了一些更新，如图所示:

![img](https://user-gold-cdn.xitu.io/2019/10/26/16e080ce8d8611b3?imageslim)

一共分两路更新:

1. CD 界面重构
2. 增加倍速播放，歌词解析插件升级

## CD 界面重构

进入到 normal-player/index.js 中，将 CDWrapper 中的内容换成如下所示的代码:

```text
// 可旋转 needle
<div className={`needle ${playing? '' : 'pause'}`}></div>
<div className="cd">
  <img
    className={`image play ${playing? '' : 'pause'}`}
    src={song.al.picUrl + "?param=400x400"}
    alt=""
  />
</div>
<p className="playing_lyric">{currentPlayingLyric}</p>
```

在 style.js 中:

```text
import disc from './disc.png';
import needle from './needle.png';

export const CDWrapper = styled.div`
  margin: auto;
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  .needle {
    position: absolute;
    top: -6.67vw;
    left: 48vw;
    width: 25vw;
    height: 40vw;
    z-index: 100;
    background-image: url (${needle});
    ${style.bgFull ()};
    transform-origin: 4.5vw 4.5vw;
    transition: all 0.3s;
    transform: rotate (0);
    &.pause {
      transform: rotate (-30deg);
    }
  }
  .cd {
    top: 16%;
    position: absolute;
    width: 70%;
    height: 70vw;
    background-image: url (${disc});
    border: 4px solid ${style ["border-color-v2"]};
    border-radius: 50%;
    ${style.bgFull ()};
    .image {
      position: absolute;
      left: 0;right: 0;
      top: 0;bottom: 0;
      width: 68%;
      height: 68%;
      margin: auto;
      border-radius: 50%;
    }
    .play {
      animation: ${rotate} 20s linear infinite;
      &.pause {
        animation-play-state: paused;
      }
    }
  }
  .playing_lyric {
    position: absolute;
    margin: auto;
    width: 80%;
    top: 95vw;
    font-size: 14px;
    line-height: 20px;
    white-space: normal;
    text-align: center;
    color: rgba (255, 255, 255, 0.5);
  }
`;
```

needle 和 disc 图片大家可以进入这个链接获取: [点击获取(opens new window)](https://github.com/sanyuan0704/react-cloud-music/tree/master/src/application/Player/normal-player)

另外，global-style.js 中的内容也有所更新:

```text
const bgFull = () => {
  return `
    background-position: 50%;
    background-size: contain;
    background-repeat: no-repeat;
  `
};

export default {
  //...
  "border-color-v2": "rgba (228, 228, 228, 0.1)",
  bgFull
};
```

另一部分是 Top 部分的更新。

```text
// JSX
<Top className="top">
  <div className="back" onClick={() => toggleFullScreenDispatch (false)}>
    <i className="iconfont icon-back">&#xe662;</i>
  </div>
  <div className="text">
    <h1 className="title">{song.name}</h1>
    <h1 className="subtitle">{getName (song.ar)}</h1>
  </div>
</Top>

//style.js
export const Top = styled.div`
  box-sizing: border-box;
  position: absolute;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid ${style ["border-color-v2"]};
  padding-bottom: 5px;
  width: 100%;
  height: 8%;
  .back {
    margin-left: 5px;
    z-index: 50;
    .iconfont {
      display: block;
      padding: 9px;
      font-size: 24px;
      color: ${style ["font-color-desc"]};
      font-weight: bold;
      transform: rotate (90deg);
    }
  }
  .text {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }
  .title {
    line-height: 25px;
    font-size: ${style ["font-size-l"]};
    color: ${style ["font-color-desc"]};
    ${style.noWrap ()};
  }
  .subtitle {
    line-height: 20px;
    font-size: ${style ["font-size-m"]};
    color: ${style ["font-color-desc-v2"]};
    ${style.noWrap ()};
  }
`;
```

现在，就能看到文章开始的那个效果啦！

## 倍速播放功能添加

首先需要作好数据层的准备。因为目前来说我们希望歌曲播放的速度是一个全局性的变量，即使更换了歌曲依然按照速度不会变。因此特意把它放到了 redux 中存储。

```text
//constants.js
export const CHANGE_SPEED = 'player/CHANGE_SPEED';

//reducer.js
const defaultState = fromJS ({
  //...
  speed: 1
});
export default (state = defaultState, action) => {
  switch (action.type) {
    //...
    case actionTypes.CHANGE_SPEED:
      return state.set ('speed', action.data);
    default:
      return state;
  }
}

//actionCreators.js
export const changeSpeed = (data) => ({
  type: CHANGE_SPEED,
  data
});
```

还有对于播放速度的配置数据:

```text
//api/config.js
// 倍速播放配置
export const list = [
  {
    key: 0.75,
    name: "x0.75"
  },
  {
    key: 1,
    name:"x1"
  }, 
  {
    key: 1.25,
    name:"x1.25"
  }, 
  {
    key: 1.5,
    name:"x1.5"
  }, 
  {
    key: 2,
    name:"x2"
  }
]
```

OK, 现在我们来对接 Player 组件。

```text
import { changeSpeed } from './store/actionCreators';
import { list } from "../../../api/config";

// 组件内
const { speed } = props;
const { changeSpeedDispatch } = props;
// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = state => ({
  //...
  speed: state.getIn (["player", "speed"]),
});

// 映射 dispatch 到 props 上
const mapDispatchToProps = dispatch => {
  return {
    //...
    changeSpeedDispatch (data) {
      dispatch (changeSpeed (data));
    }
  };
}
```

在 normalPlayer 中的 Bottom 部分我们往首部加入:

```text
<List>
  <span > 倍速听歌 </span>
  {
    list.map ((item) => {
      return (
        <ListItem 
          key={item.key}
          className={`${speed === item.key ? 'selected': ''}`} >
            {item.name}
        </ListItem>
      )
    })
  }
</List>
```

其中 List, ListItem 在 style.js 中导出:

```text
export const List = styled.div`
  width: 70%;
  margin: auto;
  display: flex;
  align-items: center;
  height: 30px;
  justify-content: space-around;
  overflow: hidden;
  >span:first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    color: ${style ["font-color-desc-v2"]};
    font-size: ${style ["font-size-m"]};
    vertical-align: middle;
  }
`
export const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${style ["font-size-m"]};
  padding: 5px 5px;
  border-radius: 10px;
  color: ${style ["font-color-desc-v2"]};
  &.selected {
    color: ${style ["theme-color"]};
    border: 1px solid ${style ["theme-color"]};
    opacity: 0.8;
  }
`
```

然后引入:

```text
import { List, ListItem } from './style';
```

现在我们来给每一个 ListItem 绑定点击事件。

```text
const { clickSpeed } = props;
//JSX
<ListItem 
  //...
  onClick={() => clickSpeed (item.key)}>
    {item.name}
</ListItem>
```

这个处理逻辑由父组件传递，我们在父组件来编写具体的逻辑。

```text
useEffect (() => {
  //...
  audioRef.current.src = getSongUrl (current.id);
  audioRef.current.autoplay = true;
  // 这里加上对播放速度的控制
  audioRef.current.playbackRate = speed;
  //...
}, [currentIndex, playList]);
const clickSpeed = (newSpeed) => {
  changeSpeedDispatch (newSpeed);
  //playbackRate 为歌词播放的速度，可修改
  audioRef.current.playbackRate = newSpeed;
  // 别忘了同步歌词
  currentLyric.current.changeSpeed (newSpeed);
  currentLyric.current.seek (currentTime*1000);
}
```

好，现在歌曲可以正常播放了。但是同时还有一个非常严重的问题，那就是歌词不能倍速播放，也就是歌曲和歌词不同步！

看似是一个难以解决的问题，但是我们只需要稍稍对歌词插件做一些扩展即可：

```text
//api/lyric-parser.js
export default class Lyric {
  constructor (lrc, handler, speed) {
    //...
    this.speed = speed || 1;
    
    this._init ();
  }
  changeSpeed (speed) {
    this.speed = speed;
  }
}
```

然后是一个最关键的修改:

```text
_playRest (isSeek=false) {
  //...
  this.timer = setTimeout (() => {
    this._callHandler (this.curLineIndex++)
    if (this.curLineIndex < this.lines.length && this.state === STATE_PLAYING) {
      this._playRest ()
    }
    // 注意定时器的时间
  }, (delay /this.speed))
}
```

当速度变为 x2 的时候，其实离下一句歌词到来的时间间隔变为了原来的 1 / 2。依此类推。

这样歌词能够正常倍速播放了。

现在的歌词插件可以说是一个相对完整的插件了，我们也可以将它发布到 npm 上作为第三方包供其他开发者使用。做法也非常简单：

1. 在 www.npmjs.com 网站上注册一个用户
2. 通过 npm init 创建一个仓库
3. 通过 npm adduser 登录你的 npm 账户
4. 使用 npm publish 发布你的代码。(上传后第三方包的名字就是 package.json 中的 name 值)

结果如图所示:

![img](https://img-repo.poetries.top/images/16e080ca6b6c1c07.jpeg)



# 彩蛋2 Redux及中间件原理解析

在做这个项目的过程中，hooks 的 api 相当简洁，代码也容易理解，但 Redux 就不一样了，大量的样板代码，以及各种纯函数的限制，让刚刚上手的新人总会 感觉有些不适应。React 的开发，很大一部分的门槛在于 Redux。可能有人会说了，都 9012 年了，还用什么 Redux 管理数据啊，直接 hooks 一把撸。对于这些人的观点，我认为 Redux 由于出色的调试机制和完整的模块管理功能，是一个短时间不可被替代的状态管理方案。

因此我觉得我们在熟练使用 Redux 的同时，也有必要去研究它内部的原理，体会它的设计思想，这样不仅仅能够加深我们对于 Redux 本身的理解，也能够巩固原生 JS 的 功底，锤炼我们的编程思想。

还记得这些熟悉的代码吗？

```text
import {createStore, compose, applyMiddleware} from "redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore (reducer, composeEnhancers (applyMiddleware (thunk)));
import { combineReducers } from "redux-immutable";
import { reducer as recommendReducer } from "../application/Recommend/store/index";
//...

export default combineReducers ({
  recommend: recommendReducer,
  //...
});
```

你知道 createStore 发生了什么？dispatch 执行后在内部怎么运作的？compose 函数做了什么事情？combineReducers 是如何合并不同的 reducer 的？applyMiddleware 是如何组织中间件的？

接下来我们就来一一拆解 Redux 在背后为我们做的这些事情。

首先要声明的是，为了把原理讲清楚，不可避免地会涉及到源码，但是源码有大量的类型判断和边界检查，如果一一列举，其一对我们理解 Redux 本身的原理没有帮助，其二分散我们的注意力、 浪费大量时间。因此凡是对我们理解 Redux 原理没有帮助的源码部分，我们不予考虑，如果真的很感兴趣可以 [GitHub 仓库 (opens new window)](https://github.com/reduxjs/redux)下载它的源码自己去看。

## createStore 揭秘

createStore，顾名思义，是要创建一个仓库，是 redux 的核心所在， 它最后要返回四个非常重要的属性，分别是 getState,subscribe,dispatch,replaceReducer。

```text
export default function createStore (reducer, preloadedState, enhancer) {
  //...
  return {
    getState,// 获取到 state
    subscribe,// 采用发布订阅模式，这个方法进行观察者的订阅
    dispatch,// 派发 action
    replaceReducer// 用新的 reducer 替换现在的
  }
}
```

进入 createStore，第一步是检查参数，一共可以接收三个参数，reducer 表示改变 store 数据的纯函数，preloadedState 表示初始状态，第三个参数暂且不管，后面讲到中间件机制你就 明白它的用意了。

```text
export default function createStore (reducer, preloadedState, enhancer) {
  //reducer 必须是函数
  // 当前 reducer
  let currentReducer = reducer
  //state 数据，redux 的根本
  let currentState = preloadedState
  // 订阅者集合
  let currentListeners = []
  // 虽然不起眼，但是是一个关键的设计
  let nextListeners = currentListeners
  // 是否正在有 dispatch 在运行
  let isDispatching = false

  //...
  //return 代码
}
```

首先看看它的 getState 方法:

```text
function getState () {
  // 如果有 dispatch 正在执行则报错
  if (isDispatching) throw new Error ("xxxx 具体信息省略")
  return currentState
}
```

它的 subscribe 方法其实是基于发布订阅模式的，我们想一想只有一个数组来存放订阅者的时候可能会出现什么问题。

假若有十个订阅者订阅了 store, 然后一旦条件触发 store 会依次执行所有的订阅者 (注意这里的订阅者 listener 都是方法，下面代码中的类型判断里面有提)。

这个时候第一个方法中干了一件特别 "孙子" 的事情，它把其他 9 个人全部退订了。那这个时候数组里面只剩下 1 个订阅者，但是循环还在继续啊，从数组后面的索引拿订阅者来执行，会报错，因为 已经不存在了。

当然还有更加复杂的情况，这些情况本质上是订阅者 (可以认为函数) 拥有订阅和退订的权利，也就是说，它可以改变订阅者数组。但是我们遍历订阅者的时候是基于最开始的那个订阅者数组。

因此我们需要缓存最开始的数组，在调用订阅者的时候，一切关于 currentListeners 的改变都不允许，但是可以拷贝一份同样的数组，让它来承担订阅者对数组的改变，那这个数组就是 nextListeners。

subscribe 方法如下定义:

```text
function ensureCanMutateNextListeners () {
  // 如果 next 和 current 数组是一个引用，那这种情况是危险的，原因上面已经谈到，我们需要 next 和 current 保持各自独立
  if (nextListeners === currentListeners) {
    nextListeners = currentListeners.slice ()
  }
}

function subscribe (listener) {
  if (typeof listener !== 'function') {
    throw new Error ('Expected the listener to be a function.')
  }
  // 如果正在有 dispatch 执行则报错
  if (isDispatching) {
    throw new Error ("xxx")
  }
  let isSubscribed = true
  ensureCanMutateNextListeners ()
  nextListeners.push (listener)
  // 返回的是一个退订的方法，将特定的 listener 从订阅者集合中删除
  return function unsubscribe () {
    // 已经退订了就不管了
    if (!isSubscribed) return;
    if (isDispatching) throw new Error ("xxx 具体信息省略")

    isSubscribed = false
    ensureCanMutateNextListeners ()
    const index = nextListeners.indexOf (listener)
    nextListeners.splice (index, 1)
  }
}
```

值得注意的是每次调用这个函数的时候，都会产生一个闭包，里面存储着 isSubscribed 的值，调用 n 次就会产生 n 个这样的闭包，用来存储 n 个不同的订阅情况。 仔细想想还是比较巧妙的做法。

接下来是 dispatch 函数:

```text
function dispatch (action) {
  //action 必须是一个对象
  //action.type 不能为 undefined

  if (isDispatching) {
    throw new Error ('Reducers may not dispatch actions.')
  }

  try {
    isDispatching = true
    // 看到没有？执行 reducer 后返回的状态直接成为 currentState 了
    currentState = currentReducer (currentState, action)
  } finally {
    isDispatching = false
  }

  const listeners = (currentListeners = nextListeners)
  for (let i = 0; i < listeners.length; i++) {
    const listener = listeners [i]
    listener ()
  }

  return action
}
```

接下来是 replaceReducer：

```text
function replaceReducer (nextReducer) {
  if (typeof nextReducer !== 'function') {
    throw new Error ('Expected the nextReducer to be a function.')
  }

  currentReducer = nextReducer
  // 此时无法匹配任何的 action，但是返回的状态可以将 currentState 给更新
  // 也就是更新当前的 state，因为 reducer 更新了，老的 state 该换了！
  dispatch ({ type: ActionTypes.REPLACE })
}
```

## combineReducer 做了些什么？

还记得我们怎么使用 combineReducer 的吗？

```text
import { combineReducers } from "redux-immutable";
import { reducer as recommendReducer } from "../application/Recommend/store/index";
import { reducer as singersReducer } from "../application/Singers/store/index";

export default combineReducers ({
  recommend: recommendReducer,
  singers: singersReducer,
});
```

combineReducer 用来组织不同模块的 reducer，那背后是怎么组织起来的呢？除去容错性的代码，我们看看 combineReducer 的核心源代码:

```text
export default function combineReducers (reducers) {
  // 以项目中的例子来讲，reducerKeys 就是 ['recommend', 'singers']
  const reducerKeys = Object.keys (reducers)
  //finalReducers 是 reducers 过滤后的结果
  // 确保 finalReducers 里面每一个键对应的值都是函数
  const finalReducers = {}
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys [i]

    if (typeof reducers [key] === 'function') {
      finalReducers [key] = reducers [key]
    }
  }
  const finalReducerKeys = Object.keys (finalReducers)

  // 最后依然返回一个纯函数
  return function combination (state = {}, action) {
    // 这个标志位记录初始的 state 是否和经过 reducer 后是一个引用，如果不是则 state 被改变了
    let hasChanged = false
    const nextState = {}
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys [i]
      const reducer = finalReducers [key]
      // 原来的状态树中 key 对应的值
      const previousStateForKey = state [key]
      // 调用 reducer 函数，获得该 key 值对应的新状态
      const nextStateForKey = reducer (previousStateForKey, action)
      nextState [key] = nextStateForKey
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    // 这个很简单理解吧？如果没改变直接把原始的 state 返回即可
    return hasChanged ? nextState : state
  }
}
```

很简单理解吧？好，我们现在进入最硬核的部分！

## compose 函数解读

compose 其实是一个工具，充分体现了高阶函数的技巧。源码如下:

```text
export default function compose (...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs [0]
  }

  return funcs.reduce ((a, b) => (...args) => a (b (...args)))
}
```

举个例子:

```text
const f0 = (x) => { console.log (x) }
const f1 = () => { console.log (1) }
const f2 = () => { console.log (2) }
let fArr = [f2, f1, f0];
console.log (compose (...fArr)(100)) // 执行 f2 (f1 (f0 (100))) 输出 100 1 2
```

现在先埋下伏笔。之后在 applyMiddleware 中如何大显身手。

## applyMiddleware 完全解析

这个方法与中间件息息相关，一上来就干讲是很不容易理解的，现在我们以项目中用到的 redux-thunk 中间件为例来演示，先放出 redux-thunk 的源码 (你没看错，就这么一点儿):

```text
function createThunkMiddleware (extraArgument) {
  // 这里将 middlewareAPI 给解构成了 { dispatch, getState }
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action (dispatch, getState, extraArgument)
    }

    return next (action)
  }
}

const thunk = createThunkMiddleware ();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
```

现在我们来打开 applyMiddleware 的源代码:

```text
export default function applyMiddleware (...middlewares) {
  return createStore => (...args) => {
    const store = createStore (...args)
    let dispatch = () => {
      throw new Error (
        'Dispatching while constructing your middleware is not allowed. ' +
          'Other middleware would not be applied to this dispatch.'
      )
    }
    //middlewareAPI 其实就是拿到 store 的信息
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch (...args)
    }
    // 参考上面的 thunk，其实就是传入 store 参数，剩下的部分为 next => action => { ... };
    // 传入这个参数是必须的，因为需要拿到 store 的相关属性，如 thunk 拿了 getState
    // 这里的意思就是每个中间件都能拿到 store 的数据
    const chain = middlewares.map (middleware => middleware (middlewareAPI))
    dispatch = compose (...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}
```

加入现在还有一个 redux-logger 的中间件，调用 applyMiddleware (logger, thunk), 那么走到 compose 逻辑的时候，相当于 调用 logger (thunk (store.dispatch))。这样就完成了中间件的机制。仔细体会一下这中间的执行顺序，其实并不难。

## 探究 createStore 留下来的问题

刚刚在 createStore 那一段提了下参数类型判断，但是第三个参数没有展开讲，那这里面究竟是如何来判断的呢？现在我觉得时机成熟了。

给出这一部分源代码:

```text
export default function createStore (reducer, preloadedState, enhancer) {
  // 第二个参数为函数，但是第三个参数没传
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState  // 将第二个参数当做 enhancer 
    preloadedState = undefined
  }
  // 确保 enhancer 为函数
  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error ('Expected the enhancer to be a function.')
    }

    return enhancer (createStore)(reducer, preloadedState)
  }
  //...
}
```

判断类型后返回 enhancer (...) 是针对什么样的场景的呢？

如果要用 thunk 中间件，那么 redux 官方文档是这么写的:

```text
const store = createStore (reducer, applyMiddleware (thunk));
```

看到没？这个时候其实 redux 内部的 enhancer 就变成了 applyMiddleware (thunk) 的结果。

运行流程其实变成了 applyMiddleware (thunk)(createStore)(reducer, preloadedState);

而返回的结果赋给了 store, 当前 store 中的 dispatch 属性已经成功被更改，一旦走入 dispatch，必然经过中间件。中间件成功地集成！

知道了原理后，相信你再写一个自己的 Redux 中间件也易如反掌了。

```text
function createMyMiddleware (...arg) {
  return ({ dispatch, getState }) => next => action => {
    console.log ("我开发的 Redux 中间件")
    return next (action);
  }
}

const myMiddleware = createMyMiddleware ()

export default myMiddleware;
```

然后在 createStore 的时候应用:

```text
import thunk from 'react-thunk';
import myMiddleware from 'my-middleware';
const store = createStore (reducer, applyMiddleware (thunk, myMiddleware));
```

中间件里面具体编写什么内容，应该由业务场景来决定，这里就不展开了。

## Redux 源码中一些有意思的工具函数

### 1. 判断是否为普通的对象

```text
export default function isPlainObject (obj) {
  if (typeof obj !== 'object' || obj === null) return false

  let proto = obj
  while (Object.getPrototypeOf (proto) !== null) {
    proto = Object.getPrototypeOf (proto)
  }

  return Object.getPrototypeOf (obj) === proto
}
```

### 2. 生成随机字符串

```text
const randomString = () =>
  Math.random ()
    .toString (36)
    .substring (7)
    .split ('')
    .join ('.')
```

Redux 原理的解读就到这里了，其实理解它的源码也并没有那些难，但我觉得最重要还是将它的原理和使用结合起来，体会整个设计的思想，研究这些对个人的成长还有是很有帮助的，也希望这篇文章能够起到抛砖引玉的作用，让大家带着更多的好奇和兴趣去研究其他工具的原理，提升自己的思维层次和工程能力。大家加油！