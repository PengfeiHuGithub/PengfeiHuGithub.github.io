# 基础

## 开篇—为什么你必须学Uniapp开发

### 为什么你必须学Uniapp开发

当今社会互联网技术在不断的极速发展，其中离不开每一位热情奋进的技术人员。每天层出不穷的新概念，热火朝天的区块链，泛滥的共享经济，每年蜂拥而至抢着每一手热点发布的手机厂商，还有资讯快餐充斥着我们所有能看到的场景。这一切都离不开界面的呈现，内容上、形式上、功能上都在以非同凡响的效果吸引着你我，当中离不开一个角色--前端。

前端是从web应用开发分离出来的用户层，也就是用户接口，直接与用户进行交互，通信技术发展促进了很多前端技术的变革。从最传统的开发模式开始，随着的前后端分离，AMD，CMD和UMD的模块化管理，工程化出现和发展，再演变为前端MVVM和当今的小程序。前端与其说是一个职业，更是一项不断学习提升自我的过程，作为前端开发者堪比盖世武侠，招式固然重要，唯有内功心法才能让功力大增。

2017 年，微信小程序横空出世，依托微信的强大市场占有量，小程序的出现影响了人们的生活，简单方便的移动操作界面应用在生活方方面面，但是对于前端开发者来说，意味着我们又要掌握一套的框架，甚至又催生了一个职业—小程序工程师。

> 小程序是一种不需要下载安装即可使用的应用，它实现了应用“触手可及”的梦想，用户扫一扫或者搜一下即可打开应用。也体现了“用完即走”的理念，用户不用关心是否安装太多应用的问题。应用将无处不在，随时可用，但又无需安装卸载。

开发市场规模不断扩大，前端开发的角色越发重要。对于大部分应用级开发而言，开发团队的人员配备正向前端倾斜，包括Android开发、iOS开发、PC端开发、小程序开发等角色进一步壮大了前端开发团队，前端工程师的岗位权重占比将不断加重。

虽然开发应用一直在向前端倾斜过渡，作为一名小小的前端，是不是也敢挺着身板自称程序员呢？因为前端就三大法宝：HTML、JS、CSS。技术，显然站不住脚。前端三架马车React、Angular、Vue 这样面向现代 web 应用需求的前端框架及其生态，与APP结合的混合开发模式，内嵌单页webview，Hybrid App。都在混淆这前端界。这些让我们感觉渺小羸弱。

你是否也在考虑WEB统一的时代来临，更或是由你改变？如果你有这样的想法，那么你来对了，Uniapp正在做这些事情，让开发有着统一的规范。

> Uniapp 是一个使用 Vue.js 开发跨平台应用的前端框架。开发者通过编写 Vue.js 代码，Uniapp 将其编译到iOS、Android、H5、以及各种小程序平台。

在实际开发中，同一个项目可能需要分别在H5 端，小程序端，甚至React Native 端有相同的表现，我们就需要开发和维护多端不同代码，工作量是非常巨大的。Uniapp 继承自 Vue.js，提供了完整的 Vue.js 开发体验。Uniapp 组件规范和扩展api与微信小程序基本相同。有一定 Vue.js 和微信小程序开发经验的开发者可快速上手，用特定的集成语言与多端语言进行对话就能在多个平台发布，省去了开发成本，节约了时间，何乐而不为呢？

曾在网上看到一句，“程序界的「二八定律」，百分之八十的问题可以运用百分之二十的知识来解决，而剩下的百分之二十的问题需要运用百分之八十的知识来解决。准备好那百分之八十的知识，才会在遇到有挑战的问题时更加游刃有余，机会永远留给准备好的人。”

## 基础—工具介绍、新建项目及插件配置

> 软件开发的时间通常是这样的：一开始的 90% 开发工作用掉了整个计划 90% 的时间，剩下的 10% 同样需要整个计划 90% 的时间，而最终发布前的修改也是如此。—— 汤姆 · 嘉吉

当你看到这里，相信你已经做好了准备（一台折腾得起的电脑和一颗肯行动的心），准备跟着我一同进入 `Uniapp` 的世界。

正所谓工欲善其事，必先利其器（这句话我经常说:>），我们要开发微信小程序和app，有两个工具是必不可少的：

1. 微信开发者工具
2. HbuilderX

注意：配置与安装方法 windows 系统一致。

## 微信开发者工具



我们要做的应用需要编译成小程序，因此也要[下载微信开发者工具 (opens new window)](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)进行编译预览效果。

![image-20210215142448474](https://img-repo.poetries.top/images/image-20210215142448474.png)

找到对应版本，下载安装，完成打开

![image-20210215142500753](https://img-repo.poetries.top/images/image-20210215142500753.png)

这里先做个配置，找到菜单 【设置】 >> 【安全设置】，该配置可以使 Uniapp 使用命令行调用微信开发者工具，实现项目的预览与热更新

![image-20210215142513328](https://img-repo.poetries.top/images/image-20210215142513328.png)

把服务端口选择开启即可

![image-20210215142524587](https://img-repo.poetries.top/images/image-20210215142524587.png)

这里如果不开启，接下来的调试会报以下错

![image-20210215142537280](https://img-repo.poetries.top/images/image-20210215142537280.png)

## HbuilderX



打开 [HbuilderX官方 (opens new window)](https://www.dcloud.io/hbuilderx.html)，使用 Uniapp 框架开发项目搭配官方的编辑器 HBuilderX 开发，编辑器集成了node，添加了很多底层配置。无需复杂的安装，开箱即用并且搭配了可视化界面，可以轻松编辑。

![image-20210215142551362](https://img-repo.poetries.top/images/image-20210215142551362.png)

下载对应安装包（我的是 Mac 机），下载选择一个 App 开发版本（App 开发版已集成相关插件、开箱即用），下载成功后直接解压：

![image-20210215142603246](https://img-repo.poetries.top/images/image-20210215142603246.png)

一顿操作后找到这个图标打开，打开基本上可以达到秒开。

![image-20210215142616773](https://img-repo.poetries.top/images/image-20210215142616773.png)

如果你熟悉了其他大众化的编译器，完全可以无缝衔接过来，因为可以快捷键切换，这样还是同样的配方，熟悉的味道，不用再次学习。打开编译器，空白区域可看快捷键方案设置，点击选择即可。

![image-20210215142632695](https://img-repo.poetries.top/images/image-20210215142632695.png)

然后修改主题 【工具】>>【主题】>>【酷黑】，即可看到熟悉的 IDE 的界面。

![image-20210215142647183](https://img-repo.poetries.top/images/image-20210215142647183.png)

## 新建项目



【选择新建项目】 >> 【uni-app】 >> 【默认模板】 >> 【创建】；选择 uni-app(U) 创建项目是为了开发者编写一套代码，可发布到iOS、Android、H5、以及各种小程序。

![image-20210215142700433](https://img-repo.poetries.top/images/image-20210215142700433.png)

一秒创建成功

![image-20210215142711714](https://img-repo.poetries.top/images/image-20210215142711714.png)

目录结构：

- pages 业务页面文件存放的目录
- static 静态文件目录(images之类)
- App.vue App 全局应用配置
- main.js 初始化入口文件
- manifest.json 多端配置信息
- pages.json 配置页面路由、导航等信息，类似原生小程序的 app.json

## 插件配置



选择菜单 【工具】 >> 【插件安装】

![image-20210215142725132](https://img-repo.poetries.top/images/image-20210215142725132.png)

![image-20210215142735096](https://img-repo.poetries.top/images/image-20210215142735096.png)

建议安装这些：

- NPM
- 内置浏览器
- 内置终端
- App真机运行
- uni-app编译
- Git插件
- js-beautify
- prettier
- htmlhint
- stylelint
- eslint-plugin-vue
- eslint-js
- js压缩
- css压缩
- scss/sass编译
- es6编译

其余根据自己需要安装。

## 运行 Uniapp 项目



上面的配置插件完成之后，就可以小试一下刚才的项目了，运行 Uniapp 项目主要有3种方式：

- 浏览器
- 小程序
- 手机 App

由于手机预览调试操作介绍内容比较长，我们会在后面章节小程序、app 调试环境配置中展开细说。这里简单说一下浏览器预览。

HBuilder 可能检测不到的浏览器所在位置，所有的运行配置都需要对应上你在本机安装的浏览器的安装路径才能进行命令行启动预览。小程序，手机的运行配置一致。 选择菜单【工具】>>【设置】>>【运行配置】：

![image-20210215142754363](https://img-repo.poetries.top/images/image-20210215142754363.png)

完成 chrome 等浏览器运行配置，操作 【运行】>>【运行到浏览器】>>【chrome】，HBuilder 会在底部开启终端，实行项目更新与热编译的检测：

![image-20210215142805646](https://img-repo.poetries.top/images/image-20210215142805646.png)

## Git



项目开发中，源码管理工具必不可少，比如 Git，但这里我不想花太多篇幅去讲解如何安装配置 Git 以及它的基础概念，这里有一篇更棒的文章很好地解释了 Git：[Git简明指南 (opens new window)](https://rogerdudler.github.io/git-guide/index.zh.html)。

## FAQ



有人会说，官方文档写得足够详细了，为什么还要看你的呢？这么说吧，官方文档更像一份新华字典，大而全，可以反复查阅，而我的章节更像一份干货小结，来源于项目用于项目。本课程基于官方文档，但是高于官方文档。

## 小结



磨刀不误砍柴工，只有刀磨锋利，接下来才会更顺手。

## 基础2—Uniapp基础知识

> 软件就像做爱。一次犯错，你需要用余下一生来维护支持。—— Michael Sinz

本章我们来学习 Vue 基础，认识 Vue 开发。

为什么是了解 Vue 基础呢？因为 Uniapp 设计的开发标准是：Vue的语法 + 小程序的API + 条件编译扩展平台个性化能力。了解完 Vue 基本开发原理就可使用 Uniapp 了。

## 什么是 MVC 与 MVVM ？



在开始之前，我们先来了解什么是 MVC 与 MVVM ？才能一步一步深入了解 Vue 框架的出现和 Vue 可以解决的问题。

MVC 的定义：MVC 是 Model-View-Controller 的简写。即模型-视图-控制器

![image-20210215143002544](https://img-repo.poetries.top/images/image-20210215143002544.png)

- **模型**（Model）指的是后端传递的数据（比如数据库记录列表）。
- **视图**（View）指的是所看到的页面，显示数据（数据记录）。
- **控制器**（Controller）是应用程序中处理用户交互的部分，处理输入（写入数据库记录）。

在前端并不成熟的时期，很多业务逻辑是在后端实现的，MVC 允许在不改变视图的情况下改变视图对用户输入的响应方式，用户对视图的操作交给了 Controller 处理，在 Controller 中响应 View 的事件调用 Model 的接口对数据进行操作，一旦 Model 发生变化便通知相关视图进行更新。

这里只是简略的去说 MVC ，感兴趣的小伙伴可以去网上查一下关于这方面的知识。使用 MVC 的目的就是将 Model 和 View 的代码分离。MVC 是单向通信。也就是 View 跟 Model，必须通过 Controller 来承上启下。但是 MVC 中大量的 DOM 操作又加上视图的二次加载更新，用户看到的更新数据页面会慢一些，并且页面渲染性能降低，影响了用户体验。

为解决这样的问题，MVVM 就出现了。

在过去的10年中，我们已经把很多传统的服务端代码放到了浏览器中，这样就产生了成千上万行的 javascript 代码，它们连接了各式各样的 HTML 和 CSS 文件，但缺乏正规的组织形式，这也就是为什么越来越多的开发者使用 javascript 框架，比如：Angular、React、Vue。浏览器的兼容性问题已经不再是前端的阻碍。前端的项目越来越大，项目的可维护性和扩展性、安全性等成了主要问题。当年为了解决浏览器兼容性问题，出现了很多类库，其中最典型的就是 jQuery。但是这类库没有实现对业务和逻辑的分层，所以在后期项目越来越庞大时，维护性和扩展性并不理想。

综合上面原因，衍生出了 MVVM 模式一类框架的出现，通过数据的单向流动，维护性和扩展性得到极大的提高。Vue 就是基于 MVVM 模式实现的这样一套框架。

下面来看一下 MVVM。

> MVVM 是 Model-View-ViewModel 的简写，即模型-视图-视图模型。MVVM 模式是通过以下三个核心组件组成：

![image-20210215143030037](https://img-repo.poetries.top/images/image-20210215143030037.png)

- **模型**（Model）指的是后端传递的数据，包含了业务和验证逻辑的数据模型。
- **视图**（View）指的是所看到的页面，定义屏幕中 View 的结构，布局和外观。
- **视图模型**（ViewModel） 是 MVVM 模式的核心，它是连接 View 和 Model 的桥梁，帮忙处理 View 的全部业务逻辑。

ViewModel 的角色就是将**视图**与**模型**之间来回转化：

- **模型**转化为**视图**：将服务器发送的数据转化成我们看到的页面内容。这就是 `{{}}` 进行数据对应的作用。
- **视图**转化为**模型**：将页面内容及用户操作信息转化成服务器的数据。这部分是指令与 dom 事件对应的作用。

**视图**与**模型**这两者之间的来回转化，我们称之为数据的双向绑定。

## 双向绑定的使用



来看一个添加名单的应用页面的 index.vue 结构，用户可以在输入框输入名字，书写的内容可以即时反映显示在文本中，用户可以操作添加，把该名字插入列表数据中：

![image-20210215143048661](https://img-repo.poetries.top/images/image-20210215143048661.png)

在 Vue 中可以发现：

- Model：data 处存放的数据
- View：template 中 HTML 代码展示的视图
- ViewModel：是 methods 里的 JS 逻辑代码

如此一来，我们已经对 MVVM 有了初步的认识。

DOM 的数据通过 Vue 的 directives（指令）来改变，所以直接改变 model 的数据就可以直接将数据反映在 DOM 上面。前面的 `v-model` 指令就是用户在输入框操作时反映显示在视图中（你要添加的名字: ），所以我们使用 Vue 这样的框架时，想要改变视图样式不是直接像 jQuery 操作 DOM 一样去操作，而是改变数据，让数据去驱动视图样式的改变。

## 生命周期



Vue 实例有一个完整的生命周期，也就是说从开始创建、初始化数据、编译模板、挂在DOM、渲染-更新-渲染、卸载等一系列过程。Vue 实例的生命周期钩子就是在某个阶段给你一个做某些处理的机会。比如 Vue 整个渲染完 DOM 的时候，你才可以操作 DOM，如果在 DOM 未渲染完之前去操作 DOM，由于 DOM 不存在而操作失败。

由于 Uniapp 是集成多端的，因此完整的支持 Vue 实例的生命周期，同时还支持`应用生命周期`及`页面生命周期`，区别在于你是开发 h5，小程序员，app。

### 应用生命周期

| 函数名   | 说明                                                         |
| :------- | :----------------------------------------------------------- |
| onLaunch | 初始化完成时触发（全局只触发一次），例如：点击分享页面进入应用，可以捕获在分享链接的参数 |
| onShow   | 启动，或从后台进入前台显示                                   |
| onHide   | 从前台进入后台                                               |
| onError  | 报错时触发                                                   |

### 页面生命周期

| 函数名   | 说明                                                         |
| :------- | :----------------------------------------------------------- |
| onLoad   | 监听页面加载，每个页面触发一次，其参数为上个页面传递的数据，参数类型为Object（用于页面传参） |
| onShow   | 监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面 |
| onReady  | 监听页面初次渲染完成。如果渲染速度快，会在页面进入动画完成前触发 |
| onHide   | 监听页面隐藏                                                 |
| onUnload | 监听页面卸载                                                 |
| onResize | 监听窗口尺寸变化 onPullDownRefresh                           |

以上的生命周期在项目中会经常使用到。看着挺多的不好记住，不要急，我将在进阶中详细演示，并提供一个页面模板给你使用。

## 模板语法



来一个简单的基于 HTML 的模板语法：

```html
<template>
    <view class="content">
        <view :title="singer">喜欢的歌手是: {{singer}}</view>
        <button @click="changeName">更换名字</button>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                singer: '周杰伦',
            }
        },
        methods: {
            changeName () {
                this.singer = '张学友'
            }
        }
    }
</script>
```

Vue 数据绑定最常见的形式就是使用 `Mustache` 语法 (双大括号) 的文本插值，比如 ``，Mustache 标签将会被替代为对应数据对象上 singer 属性的值。无论何时，绑定的数据对象上 singer 属性发生了改变，插值处的内容都会更新，`` 会被渲染成 `周杰伦`。

Mustache 语法不能作用在 HTML 特性上，遇到这种情况应该使用 v-bind 指令：

```html
<view v-bind:title="singer">喜欢的歌手是: {{singer}}</view>

// 渲染成
<view title="周杰伦">喜欢的歌手是: 周杰伦</view>
```

也可使用简写 `v-bind` 指令，将 `v-bind:title="singer"` 写成 `:title="singer"`，直接用 `:` 代替。

当然模板语法提供了完全的 JavaScript 表达式支持，你可以写一些简单的表达式，下面这些表达式会在所属 Vue 实例的数据作用域下作为 JavaScript 被解析：

```js
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>
```

## 事件



在上面的代码块中，有个 methods 对象，Vue 把所有的事件都放在 methods 属性中，对应具体的方法函数：

```html
<template>
    <view class="content">
        <view :title="singer">喜欢的歌手是: {{singer}}</view>
        <button @click="changeName">更换名字</button>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                singer: '周杰伦',
            }
        },
        methods: {
            changeName () {
                this.singer = '张学友'
            }
        }
    }
</script>
```

这样的方式可以统一集中处理事件，并且开发者可以直观知道事件绑定在哪个元素中，比如 `changeName` 方法绑定在 button 中，如果想要解除事件直接删除就可，而不用担心别的元素隐形绑定该事件而导致报错。

## 计算属性



模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护。例如：

```html
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>
```

如果你在处理一个比较复杂的变量，那么在 `{{}}` 书写就不合适了，看到长长的代码都能让你头大。对于任何复杂逻辑，你都应当使用计算属性。

```html
<template>
    <view class="content">
        <view>喜欢的歌手是: {{singer}}</view>
        <view>喜欢的歌手是: {{computedSinger}}</view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                singer: '周杰伦',
            }
        },
        computed: {
            // 对singer二次加工处理
            computedSinger: function () {
              // `this` 指向 Vue 实例
              return this.singer.split('').reverse().join('')
            }
        },
        methods: {
            changeName () {
                this.singer = '张学友'
            }
        }
    }
</script>
```

结果：

```html
喜欢的歌手是: 周杰伦
喜欢的歌手是: 伦杰周
```

## 指令



在 Vue 中指令是带有 `v-` 前缀的特殊属性，通过属性来操作元素。

常见的指令有：

```html
<template>
    <!-- v-text：在元素当中插入值 -->
    <view v-text='singer'></view>
    <!-- v-for：根据变量的值来循环渲染元素 -->
    <view v-for="(item, index) in list">
        {{item}}--{{index}}
    </view>
    <!-- v-if和v-else：根据表达式的真假值来动态插入和移除元素 -->
    <view v-if="isShow">我会显示</view>
    <view v-else>我不会显示，但是我要跟有 v-if 指令的元素并齐</view>
    <!-- v-model：把input的值和变量绑定了，实现了数据和视图的双向绑定 -->
    <input type="text" v-model="singer">
    <!-- v-bind：绑定元素的属性并执行相应的操作 -->
    <view v-bind:class="{t1: isBig}">isBig 为 true 时，该元素class类名会变为 t1</view>
    <!-- 上面v-bind可以简写 : -->
    <view :class="{t1: isBig}">isBig 为 true 时，该元素class类名会变为 t1</view>
    <!-- v-on：监听元素事件，并执行相应的操作 -->
    <view v-on:click="change">该元素绑定了点击事件</view>
    <!-- 上面 v-on：可以简写 @ -->
    <view @click="change">该元素绑定了点击事件</view>
</template>

<script>
    export default {
        data() {
            return {
                singer: '周杰伦',
                list:[1, 2, 3, 4],
                isShow: true,
                isBig: true

            }
        },
        methods: {
            change () {
                // ...
            }
        }
    }
</script>
```

### `<template/>` 和 `<block/>`

Uniapp 支持在 template 模板中嵌套 `<template/>` 和 `<block/>`，用来进行 列表渲染 和 条件渲染。

`<template/>` 和 `<block/>` 并不是一个组件，它们仅仅是一个包装元素，不会在页面中做任何渲染，只接受控制属性。

代码示例:

```html
<template>
    <view>
        <template v-if="test">
            <view>test 为 true 时显示</view>
        </template>
        <template v-else>
            <view>test 为 false 时显示</view>
        </template>
    </view>
    
    <!-- 列表渲染 -->
    <block v-for="(item,index) in list" :key="index">
        <view>{{item}} - {{index}}</view>
    </block>
</template>
```

## 全局变量(状态管理)



在 Vue（Uniapp）中有多种处理全局变量，全局方法的做法：

### 1. 挂载 Vue.prototype

将一些使用频率较高的常量或者方法，直接扩展到 Vue.prototype 上，每个 Vue 对象都会“继承”下来。

注意这种方式只支持多个 Vue 页面或多个 nVue 页面之间公用，Vue 和 nVue 之间不公用。

示例如下：

在 main.js 中挂载属性/方法

```js
Vue.prototype.websiteUrl = 'https://localhost:3000';  
```

然后在 pages/index/index.Vue 中调用

```js
<script>  
    export default {  
        methods: {  
            getBanner() {
                uni.request({
                    url: this.websiteUrl + '/banner',
                    method: 'GET',
                    data: {},
                    success: res => {},
                    fail: () => {},
                    complete: () => {}
                });
            }
        }  
    }  
</script>
```

这种方式，只需要在 main.js 中定义好即可在每个页面中直接调用。但要注意的是，当前的this指向的是当前模块，稍微不注意就可能出现重复命名的情况。

建议在 Vue.prototype 上挂载的属性或方法，可以加一个统一的前缀`$`。比如`$url` 、`$global_url`这样，在阅读代码时也容易与当前页面的内容区分开。

```js
// main.js
Vue.prototype.$websiteUrl = 'https://localhost:3000';  
// 访问
const url = this.$websiteUrl
```

使用 `this.$websiteUrl` 的时候，与你协作的开发人员一看 `$` 开头就知道是全局扩展的属性。

那如果只是简单的变量呢？

### 2. globalData

如果你了解开发小程序的话，恭喜你，这个就是基于小程序延伸过来的。如果你还不熟悉，可以往下看

但从字面上来看 globalData 单词，可以翻译为全局变量。Uniapp 也把 globalData 作为一种比较简单的全局变量使用方式，但是有一点要清楚，globalData 走内存，storage 走缓存，即小程序退出 globalData 会清空，storage 则不会。

在 App.vue 可以定义 globalData ，也可以使用 API 读写这个值。

```js
<script>  
    export default {  
        globalData: {  
           websiteUrl: 'https://localhost:3000'  
        },  
        onLaunch: function() {  
           console.log('App Launch')  
        } 
    }  
</script> 
```

js 中操作 globalData 的方式如下：

```js
赋值：getApp().globalData.websiteUrl = 'https://localhost:3000'  

取值：console.log(getApp().globalData.websiteUrl) // 'https://localhost:3000'  
```

### 3. Vuex

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

![image-20210215143129230](https://img-repo.poetries.top/images/image-20210215143129230.png)

关于`Vuex`东西不少，我打算开一章来详细讲解。

## 小结



1. MVVM 是解决 MVC 的一些问题而出现的。
2. Vue 是以数据驱动来改变视图的，所有的元素属性，文字节点，事件都可以进行管理；
3. 全局变量可以让你在项目中管理整个状态，类似使用"全局变量"。

## 基础3—基础组件、自定义组件、全局组件

## 什么是组件？

开篇我们先简单聊一下前端组件化。什么是组件化？在前端界，特别是现在 React，Vue，Angular 几大流行开发框架的盛行的时代下，已经把组件化的设计思想推向了一个新的高度了，出现了框架与组件共同繁荣的景象。

组件简单的来说就是可实现独立的功能的单一整体代码片段，无论把这个片段放在哪里，它还是保持着原有的功能和样式，从而可以实现复用，这种整体独立化的设计思想就是组件化，而这样设计出来的单一整体代码片段叫做组件。这样的设计可以非常灵活的使用在项目中，项目设计更具系统性，从而提高了项目管理开发效率。

如果上面说的比较拗口，来点简单的。比如一座房子，把房子看成一个独立的整体由屋顶、窗户、门，墙等组成。

![image-20210215143641799](https://img-repo.poetries.top/images/image-20210215143641799.png)

用代码来表示就是：

```text
<template>
    <!-- 这是一个房子 -->
    <view>
        <!-- 屋顶 -->
        <roof></roof>
        <!-- 墙 -->
        <wall></wall>
        <!-- 窗户 -->
        <window></window>
        <!-- 门 -->
        <door></door>
    </view>
</template>
```

那么换成一个页面呢？一个完整的页面由页头，内容，页脚等组成：

```text
<template>
    <view>
        <!-- 页头 -->
        <page-header></page-header>
        <!-- 内容 -->
        <content></content>
        <!-- 页脚 -->
        <pager-footer></pager-footer>
    </view>
</template>
```

那我们在开发页面的时候，头部和尾部都是固定不变的，只要内容更改就行。在开发框架中，页面其实也是作为组件化的一部分，但是我们组件更多关注的是页面的每个部件，比如头部，内容区，弹出框甚至确认按钮都可以作为一个组件，每个组件有独立的HTML、css、js代码。

## 基础组件



Uniapp 根据多端的特性以 Vue 语法糖 + 小程序的 API 打造了一大批组件，这些组件在开发的时候以 HBuliderX 为 IDE，生产的时候把那些代码编译转换为各个平台特性的语法与 API。

Uniapp 框架根据组件的设计思想为我们设计提供了一系列的基础组件，我们可以通过组合这些基础组件进行快速开发。每一个基础组件都独立定义了样式与功能， 这些基础组件中比如 button 组件，你可以设置按钮的大小，文字样式，里面的回调时机，这个按钮组件具有独立的并且有完整的多样化功能，相当于我们以参数的形式去定义这个按钮。

Uniapp 基础组件分为以下八大类：

- 视图容器（View Container）
- 基础内容（Basic Content）
- 表单组件（Form）
- 导航（Navigation）
- 媒体组件（Media）
- 地图（Map）
- 画布（Canvas）
- webview（Web-view）

这些基础的组件可以让我们快速的开发项目，由于每个人都处理的业务功能都不一样，就需要根据自己的业务情况去定制一个组件。如果 Uniapp 基础组件没有你想要的组件，而你又需要一个代码片段来实现功能的复用，那么你可以根据组件规范来注册属于自己自定义的组件。

## 自定义组件



在数据绑定的三大框架 Angular、React、Vue 中，所有的元素都可以细分为一个组件，甚至是一个页面。这个组件可以重复的复用，组件的使用也造就了当今的前端的繁华的原因之一，当然现在使用的 Uniapp 也不例外，合成小程序，weex，h5 等的共有特性。

一个组件由三大部分组成：template 模板，js 数据交互和 css 样式层：

```text
<template>
    <view class="content">
       <image class="logo" src="/static/logo.png"></image>
       <button @tap="getMsg">{{title}}</button>
    </view>
</template>

<script>
    export default {
        // props 是从父级（引用当前组件）的变量占位，在当前组件下给这些变量一个初始化值（initValue）
        props:{
            title: {
                type: String,
                default: ''
            },
            list:{
                type: Array,
                default () {  // 这里返回值需要是一个函数
                    return []
                }
            }
        },
        data() {
            return {
                title: 'Hello'
            }
        },
        created() {

        },
        methods: {
            getMsg () {
                console.log('I am demo')
                this.$emit('getMsg', this)
            }
        }
    }
</script>

<style lang="scss">
    ...
</style>
```

可以看到上面主要由三个主要元素组成 `template` ， `script` ，`style`。

1. html 部分由 `template` 标签元素闭合组成，其余 `view`, `image` 元素遵循[小程序的元素 (opens new window)](https://developers.weixin.qq.com/miniprogram/dev/component/)定义组成，需要注意的是组件元素必须有一个根元素（root element）包裹，不然会报错编译失败。
2. `script` 部分由 ES6 的 `export default` 导出整个页面模块，可以在其他页面引入该组件。

- `props` 是申明需要从父组件接收的数据

- `data` 数据部分是一个函数，返回该页面实例下的所有数据引用，data 必须声明为返回一个初始数据对象的函数；否则该组件关闭时，数据不会自动销毁，再次打开该组件时，会显示上次数据。

  ```text
  //正确用法，使用函数返回对象
  data() {
      return {
          title: 'Hello'
      }
  }
  
  //错误写法，会导致再次打开页面时，显示上次数据
  data: {
      title: 'Hello'
  }
  ```

  `props` 中声明的数据与组件 `data` 函数 `return` 的数据主要区别就是 `props` 的来自父级，而 `data` 中的是组件自己的数据，作用域是组件本身，这两种数据都可以在模板 `template` 及计算属性 `computed` 和方法 `methods` 中使用。

- `created` 组件生命周期函数, 还有 `beforeCreate` , `beforeMount` 等生命周期与 Vue 标准组件的生命周期相同，但没有页面级的 onLoad 等生命周期。

- `methods` 是事件处理函数对象，包含整个页面交互及逻辑处理的函数。在上面例子中我定义了一个 tap 事件在 methods 中，当用户触碰（tap）的时候就会打印这个文字。

- `this.$emit('getMsg', this)` 这一句是该组件通过 `this.$emit()` 派发事件，引用这个组件的地方可以利用 $on 对事件进行监听，实现参数的传递与事件向上传递，当前的 this 指的是该组件本身，指针指向当前组件。通俗的话就是，我传递一个叫 `getMsg` 事件并当前所有的参数内容出去，你只要在外面接收就可以了。

1. css 部分由 `style` 标签组成，这里面样式只作用当前的元素。style 支持 css3 标准，不用再写多余的 hack，比如 `-webkit-` 前缀等，已经由整个框架完成 hask 编译, 可以看到 style 标签有个 `lang="scss"`,说明里面的样式表可以直接以 [scss (opens new window)](https://www.sass.hk/)形式书写，当然 `lang` 的属性值还可以是 [less (opens new window)](https://lesscss.cn/),[stylus (opens new window)](https://stylus-lang.net/)，找到合适自己的 css 预编译期可以事半功倍。

父子组件（组件引用者与组件）的关系可以总结为 props 向下传递，事件向上传递。父组件通过 props 给子组件下发数据，子组件通过事件给父组件发送消息。

注意：

1. 所有组件与属性名都是小写，单词之间以连字符-连接。
2. 根节点为 `<template>`，这个 `<template>` 下只能有一个根 `<view>` 组件。

Uniapp 并没有限制使用 HTML 标签，如果开发者写了 div 等标签，在编译到非 H5 平台时也会被编译器转换为 view 标签，类似的还有 span 转 text 、a 转 navigator 等，包括 css 里的元素选择器也会转。但为了管理方便、策略统一，新写代码时仍然建议使用 view 等组件。

## 自定义完成一个商品卡片组件



![img](https://img-repo.poetries.top/images/16e71e5e856e06c3.png)

一个商品信息由商品图片，商品名称，商品价格，商品参考价组成。

实现步骤：

\1. 建立组件模板。  2. 准备组件的数据输入，定义 props 里面的数据、类型。  3. 准备好组件的数据输出。即根据组件逻辑，做好要暴露出来的方法。  4. 封装完成，进行命名调用。

在 components 文件夹创建 song.vue 文件:

```text
<template>
    <view class="song">
        <image class="img" :src="imgSrc"></image>
        <view class="desc">{{ title }}</view>
        <view class="flex-box">
            <view class="price">￥{{price}}</view>
            <view class="market-price">{{marketPrice}}</view>
        </view>
    </view>
</template>

<script>
export default {
    // 从父组件传值的
    props:{
        imgSrc: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        price: {
            type: String,
            default: ''
        },
        marketPrice: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            
        }
    },
    methods:{

    }
}
</script>
<style lang="scss" scoped>
.song {
    position: relative;
    width: 342rpx;
    height: 502rpx;
    line-height: 34rpx;
    color:#333;
    background:#fff;
    border-radius: 10rpx;
    overflow:hidden;
    font-size: 26rpx;
    .img {
        display: block;
        width: 342rpx;
        height: 342rpx;
        margin-bottom: 24rpx;
        background: #eee;
    }
    .desc {
        height: 64rpx;
        margin-top: 12rpx;
        line-height: 30rpx;
    }
    .price{
        color:#ff5000;
    }
    .market-price{
        padding-left: 10px;
        font-size: 24rpx;
        color: #979797;
        text-decoration: line-through;
    }
}
</style>
```

上面的组件的图片路径、商品名称、价格、市场价都经过 props 定义，只要在引用这个组件的页面里传值就行。

这样我们在首页 /pages/index.vue 就可以引用这个组件了

```text
<template>
    <view class="content">
        <song 
            :imgSrc="song.img"
            :title="song.title"
            :price="song.price"
            :marketPrice="song.marketPrice"
        />
    </view>
</template>

<script>
    import song from '../../components/song.vue'
    export default {
        components: {
            song
        },
        data() {
            return {
                song: {
                    img: 'https://gw.alicdn.com/bao/uploaded/i3/1917047079/O1CN01VlEDD522AEJzpw3A5_!!2-item_pic.png_360x10000.jpg',
                    title: 'Apple/苹果 iPhone 11 Pro',
                    price: '8699.00',
                    marketPrice: '￥8699.00',
                }
            }
        },
        onLoad() {
        },
        methods: {
            
        }
    }
</script>

<style>
page {
    background: #f2f2f2;
}
</style>
```

课程代码里面有列表数据循环，父子组件之间事件的传递的代码示例。

## 全局组件



Uniapp 支持配置全局组件，需在 `main.js` 里进行全局注册，注册后就可在所有页面里使用该组件。

### 但是

- Vue.component 的第一个参数必须是静态的字符串。
- nvue 页面暂不支持全局组件 注：建议统一用按需页面引入组件

`main.js`里进行全局导入和注册

```text
import Vue from 'vue'
import pageHead from './components/page-head.vue'
Vue.component('page-head', pageHead)
```

index.vue里可直接使用组件

```text
<template>
  <view>
    <page-head></page-head>
  </view>
</template>
```

## 非H5端不支持列表



Uniapp 只支持 Vue 单文件组件（ .vue 组件）。其他的诸如：动态组件，自定义 render 和 `<script type="text/x-template">` 字符串模版等，在非 H5 端不支持。

- Slot（scoped 暂时还没做支持）
- 动态组件
- 异步组件
- inline-template
- X-Templates
- keep-alive
- transition （可使用 animation 或 CSS 动画替代）
- 老的非自定义组件编译模式不支持在组件引用时，在组件上定义 click 等原生事件、v-show（可用 v-if 代替）和 class style 等样式属性(例：`<card class="class-name"> </card>` 样式是不会生效的)。建议更新为自定义组件模式。
- 老的非自定义组件编译模式组件里使用 slot 嵌套的其他组件时不支持 v-for。建议更新为自定义组件模式。

注意

在 Uniapp 中有些关键字做了保留，不可作为组件名，所以建议自定义组件时加上前缀，类似 `xm-button`。

## 小结



1. 组件是可实现独立的功能的单一整体代码片段，无论把这个片段放在哪里，它还是保持着原有的功能和样式，从而可以实现复用，这种整体独立化的设计思想就是组件化，而这样设计出来的单一整体代码片段叫做组件；
2. 如果框架的功能组件满足不了你，你就需要根据组件的规范自己定义一个组件；
3. 全局组件可以挂在到 Vue 实例中，作用在每一个页面文件上；
4. 本章代码 [uni-course-components](https://github.com/front-end-class/uniapp-music-code/blob/master/uni-course-components.zip)



## 基础4—页面导航、网络请求、数据缓存

这一章我们主要学习关于页面导航，网络请求以及数据缓存的知识，学习如何在跨页面中传递参数，如何拦截请求等

## 页面导航



说到页面导航，我们可能首先想到的是页面跳转（页面A跳转到页面B），页面跳转在不同端之间有不同的区别：

- H5 通过 window.history 属性对其进行访问，改变路由记录从而实现跳转
- ios/安卓 是改变根视图或操作导航控制器出栈进栈从而实现跳转
- 小程序实现跳转采用的方式也是改变根视图或操作导航控制器出栈进栈

如果你要把用 Uniapp 开发的项目编译成 H5，那么该项目呈现的是单页面应用，单页面应用实现页面跳转是通过监测页面 url 的 hash 改变而加载不同页面。hash 模式背后的原理是 onhashchange 事件，可以在 window 对象上监听这个事件：

```js
window.location.hash = 'list/list' // 设置页面 url 的 hash，会在当前url后加上 '#list/list'

let hash = window.location.hash // '#/pages/list/list'

window.addEventListener('hashchange', function(){ 
    // 监听 hash 变化，点击浏览器的前进后退或者hash改变会触发
})
```

例如访问列表地址，# 后面的路径就是指向页面地址：

```js
https://localhost:8080/#/pages/list/list
```

如果不想要很丑的 hash，我们可以用路由的 history 模式，在项目的配置文件 【manifest.json】>>【h5配置】>> 【路由模式】 进行修改：

![image-20210215144001624](https://img-repo.poetries.top/images/image-20210215144001624.png)

history 模式改变 url 的方式会导致浏览器向服务器发送请求，如果服务器端未做任何处理，则会请求资源失败，我们需要在服务器端做处理：如果匹配不到任何静态资源，则应该始终返回同一个 html 页面。具体操作可以看[这里(opens new window)](https://router.vuejs.org/zh/guide/essentials/history-mode.html)

如果你要用 Uniapp 开发的项目编译成微信小程序，就要注意微信小程序的页面栈的限制了，小程序中页面栈限制最多十层（微信进行了限制调整），随着页面栈的push增加，在不知道的情况下就会堆栈到十层，再用API navigateTo 去跳转页面就跳不动了，用户会跳转失效（卡死状态）。

如果遇到上述问题，删除当前页面栈（redirectTo）或删除所有页面栈（reLaunch）来跳转了，页面栈以跳转的 url 为第一个页面栈。页面栈可以通过 getCurrentPages 方法获取。

```js
function navigateTo(url, callback) {
    let goType = getCurrentPages().length >= 10 ? 'redirectTo' : 'navigateTo'
    wx[goType]({
        url,
        success: res => {
            callback()
        },
        fail: res => { },
        complete: res => { },
    })
}
```

简单化是微信小程序的开发理念的其中之一，如果你的页面栈层出现爆栈卡制，那么可以考虑一下你的产品项目的入口是不是设计的太深了，如果是，那这是多么糟糕的用户体验呀。

通过上面这些介绍，我们来看下 Uniapp 的路由与页面跳转

## Uniapp 的路由与页面跳转



Uniapp 集成多端的跳转方式，以标签 navigator 及封装 API 的形式控制应用内的跳转。

如果我想要首页跳转到列表页面并传一些参数：

```js
// 在起始页面跳转到list.vue页面并传递参数
// 该页面需要在 pages.json 注册
uni.navigateTo({
    url: '/pages/list/list?id=1&name=uniapp'
});

// 或者使用标签形式跳转
<navigator url="/pages/list/list?id=1&name=uniapp">去列表</navigator>
// 在list.vue页面接受参数
export default {
    onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
        console.log(option.id); //打印出上个页面传递的参数。
        console.log(option.name); //打印出上个页面传递的参数。
    }
}
```

我们还可以使用下面的几个 API 操作页面跳转:

```html
uni.navigateTo() 保留当前页面，跳转到应用内的某个页面，使用 uni.navigateBack 可以返回到原页面。
uni.redirectTo() 关闭当前页面，跳转到应用内的某个页面。
uni.reLaunch() 关闭所有页面，打开到应用内的某个页面。reLaunch 可以打开任意页面。
uni.switchTab() 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。switchTab 只能打开 tabBar 页面。
```

注意：

```html
* navigateTo, redirectTo 只能打开非 tabBar 页面。
* 页面跳转路径有层级限制，不能无限制跳转新页面
* 跳转到 tabBar 页面只能使用 switchTab 跳转
* 路由 API 的目标页面必须是在 pages.json 里注册的 vue 页面。如果想打开 web url，在 App 平台可以使用 plus.runtime.openURL 或 web-view 组件；H5 平台使用 window.open；小程序平台使用 web-view 组件（url需在小程序的联网白名单中）。在 hello uni-app 中有个组件 ulink.vue 已对多端进行封装，可参考。
```

如果使用标签形式进行跳转改变标签 `open-type` 属性即可：

```html
<navigator url="navigate/navigate?title=navigate" open-type="navigate">
    跳转到新页面
</navigator>
```

open-type 跳转方式参数对应：

| 值           | 说明                                   | 平台差异说明                     |
| ------------ | -------------------------------------- | -------------------------------- |
| navigate     | 对应 uni.navigateTo 的功能             |                                  |
| redirect     | 对应 uni.redirectTo 的功能             |                                  |
| switchTab    | 对应 uni.switchTab 的功能              |                                  |
| reLaunch     | 对应 uni.reLaunch 的功能               | 字节跳动小程序不支持             |
| navigateBack | 对应 uni.navigateBack 的功能           |                                  |
| exit         | 退出小程序，target="miniProgram"时生效 | 微信2.1.0+、百度2.5.2+、QQ1.4.7+ |

## Uniapp中的网络请求



Uniapp 使用 API `uni.request()` 发起网络请求，如果你用过微信小程序开发就会熟悉这个 API（`wx.request()`），Uniapp 兼容了微信代码，如果你写了 `wx.` 前缀，也可以执行，效果等同于 `uni.`，这里提一下，不建议同时存在 `uni.` 和 `wx.` 的写法，始终保持 api 统一，以免后期升级维护莫名报 bug。

代码示例：

```js
uni.request({
    url: 'https://www.example.com/request', //仅为示例，并非真实接口地址。
    data: {
        text: 'uni.request'
    },
    header: {
        'custom-header': 'hello' //自定义请求头信息
    },
    success: (res) => {
        console.log(res.data);
        this.text = 'request success';
    }
});
```

使用方法跟 jQuery 的 ajax 差不多，指定接口地址、请求方法、请求参数，可以拿来即用。如果没有传入 success / fail / complete 参数，则会返回封装后的 Promise 对象:

```js
// Promise
uni.request({
    url: 'https://www.example.com/request'
}).then(data => {   // data为一个数组，数组第一项为错误信息，第二项为返回数据
    let [error, res]  = data;
    console.log(res.data);
})
```

如何中断一次请求呢？

很多场景下是如果请求2个接口数据，当某一个接口成功的时候，就可能需要禁止掉另外一个接口的继续请求了，无论你是否有这样的需求，这种情况确实有发生：

```js
let requestTask = uni.request({
    url: 'https://www.example.com/request' // 仅为示例，并非真实接口地址。
});

// 中断请求任务
requestTask.abort();
```

上面对 request 对象进行一次返回，这样我们可以调用该对象下的 `abort` 方法，可中断请求任务。如果需要更好的实现拦截，并统一管理请求，Uniapp 插件市场有 flyio、axios 等三方封装的拦截器可用。本章附有教程代码。

当然更多的时候，我们会进行另外一个操作，设置网络请求超时。服务器未必会如同我们想的那么快捷，携带的信息也并非轻量，可能它们会跟我们一样悄悄的偷个懒，我们并不希望让这个请求一直保持触发状态。对于用户来说，这就是卡死的状态，我们现在说的就是体验感的问题。Uniapp 规定可以统一在 manifest.json 文件中配置 networkTimeout 的参数：

```js
    "name" : "mvvm",
    "appid" : "",
    "description" : "",
    "versionName" : "1.0.0",
    "versionCode" : "100",
    "transformPx" : false,
    "networkTimeout" : {
        "request" : 6000
    },
    // ...
```

有效封装能够更好的管理业务，比如服务器 500 错误的处理，400 的错误有怎么去处理，这些就是让你的请求更有肌肉感，让用户能在错误请求中获得良好体验。

一段 request 封装处理的响应代码：

```js
const resInterceptor = (response, conf = {}) => {
    // TODO do your response
    const statusCode = response.statusCode
    console.log('statusCode：'+ statusCode)
    // response interceptor
    if (statusCode >= 200 && statusCode < 300) { //成功
        _responseLog(response, conf, "response 200-299")
        return response
    } else if (statusCode === 500) {
        _responseLog(response, conf, "response 500")
        // 为了对reject的内容更加可控，我们增加了一个控制字段 wakaryReqToReject
        return {
            // 根据当前字段来判断是否reject
            wakaryReqToReject: true,
            // 下面可以配置您的其它返回信息，方便您更加统一的处理reject的内容。
            // 以下内容会被作为reject的返回，根据您的需要处理，比如返回您的具体错误信息
            msg: "服务器错误",
            res: response
        }
    } else {
        _responseLog(response, conf, "response 300-499")
        // 为了对reject的内容更加可控，我们增加了一个控制字段 wakaryReqToReject
        return {
            // 根据当前字段来判断是否reject
            wakaryReqToReject: true,
            // 下面可以配置您的其它返回信息，方便您更加统一的处理reject的内容。
            // 以下内容会被作为reject的返回，根据您的需要处理，比如返回您的具体错误信息
            msg: "这里是提示信息",
            res: response
        }
    }
}
```

注意：

1. 良好体验的 App，还会判断当前是否处于飞行模式（参考）、是 wifi 还是 3G（参考）
2. 单次网络请求数据量建议控制在50K以下（仅指 json 数据，不含图片），过多数据应分页获取，以提升应用体验。
3. localhost、127.0.0.1等服务器地址，只能在电脑端运行，手机端连接时不能访问。请使用标准 IP 并保证手机能连接电脑网络

## Uniapp 中的storage存储信息



Uniapp 集成了小程序，app，h5 的数据缓存，统一了 `uni.setStorage()`，`uni.getStorage()` 系列 API，完成对缓存数据的操作。

示例代码:

```js
uni.setStorage({
    key: 'storage_key',
    data: 'hello',
    success: function () {
        console.log('success');
    }
})
```

将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，存储的内容，只支持原生类型、及能够通过 `JSON.stringify` 序列化的对象。

记住，uniapp 设置存储有同步与异步之分，使用 `uni.setStorage()` 参数对象需指定键值 `key` ，存储数据 `data`:

```js
// 异步需指定 key 和 data
uni.setStorage({
    key: 'storage_key',
    data: 'hello',
    success: function () {
        console.log('success');
    }
});

// 同步，不用指定 key 和 data 的键
uni.setStorageSync('storage_key', 'hello');
```

因为是异步操作，有接口调用成功的回调函数，如果有业务逻辑处理或者判定失败等情况，就可以从这入手。

#### 注意

Uniapp 的 Storage 在不同端的实现不同：

1. H5 端为 localStorage，浏览器限制 5M 大小，持久化，可能会被清理；
2. App 端为原生的 plus.storage，无大小限制，不是缓存，持久化；
3. 各个小程序端自带的 Storage api，数据存储生命周期跟小程序本身一致，即除用户主动删除或超过一定时间被自动清理，否则数据都一直可用；
4. 微信小程序单个 key 允许存储的最大数据长度为 1MB，所有数据存储上限为 10MB；
5. 支付宝小程序单条数据转换成字符串后，字符串长度最大200*1024。同一个支付宝用户，同一个小程序缓存总上限为10MB；
6. 百度、字节跳动小程序文档未说明大小限制。

## 小结



1. 页面跳转的方式是一个应用的基本，但是入口太深会让你的用户失去耐心；
2. 请求的二次封装可以更好的管理你的请求动作，取消中断操作，业务问题，服务器错误等；
3. 留意操作 Storage 的异步同步之分，以及 Storage 在各端的表现。
4. 本章代码 [uni-course-request](https://github.com/front-end-class/uniapp-music-code/blob/master/uni-course-request.zip)



## 基础5—使用sass编写公用样式

本章主要讲解 scss 的基本使用，rpx 单位的概念，了解 uni.scss 在项目中的使用。

实际的开发更多的是结合什么样的工具，利用什么样的技术栈来实现快捷开发。前端三大工具js，html，css。特别是 css 上手容易，键值对对应即可实现，但是并不能实现复杂的逻辑判断，可以说是呆板鸡肋的。如果你想轻松自如健步如飞的写样式，那么 scss 绝对适合你，特别是 Uniapp 集成了插件后，不用复杂的配置 webpack 参数即可，让你在复杂的参数配置与羞涩难懂的命令行中解脱出来。

我们在新建 uni-app 项目的模板目录可以发现有一个 uni.scss 文件（相当于公用样式）。是的，你没看错。这里你可以轻松使用 scss ，尝试使用 scss ，会让你工作效率更高。

![image-20210215144542499](https://img-repo.poetries.top/images/image-20210215144542499.png)

在前面介绍安装 HbuilderX 编译器的章节中，我们就已经介绍了安装必要使用的插件（ scss/sass 编译），直接点击安装即可，点击【工具】>> 【插件安装】即可查看，如果安装了 scss/sass 编译，就可以在代码中体验着酸爽的感觉了。

![image-20210215144557176](https://img-repo.poetries.top/images/image-20210215144557176.png)

Scss 是一种 css 预处理器和一种语言, 它可以用来定义一套新的语法规则和函数，以加强和提升 css，可以解放代码量。

Uniapp 首推使用 scss ，因此这边主要以 scss 来讲解，使用时需要 Vue 文件中 style 节点上加上 `lang="scss"` 指定编译语言:

```text
<style lang="scss">
    /* or lang="less" */
    /* 测试代码 */
    .list{
        color: #fff;
        .item{
            background: #fff;
        }
    }
</style>
```

上面的代码经过 scss 编译成 css 后，嵌套的层级会处理成扁平的样式表:

```text
.list{
    color: #fff;
}
.item{
    background: #fff;
}
```

你还可以跟 js 一样使用变量，比如定义一个颜色 `$white: #fff` （变量以 $ 符号开头），所有引用这个变量的样式值都会编译成 `#fff`：

```text
<style lang="scss">
    $white: #fff;

    .list{
        color: $white;
        .item{
            background: $white;
        }
    }
    /**/
</style>
```

编译后：

```text
.list{
    color: #fff;
}
.item{
    background: #fff;
}
```

就上面的方法就已经可以让你解放双手了，你是否见过下面这样一大篓的，甚至更长的层级的样式表：

```text
.goods-list .item .img .txt{
    /* 样式 */ 
}
.goods-list .item .name{
    /* 样式 */ 
}
.goods-list .item .name .sub{
    /* 样式 */ 
}
.goods-list .item .price{
    /* 样式 */ 
}
.goods-list .item .num{
    /* 样式 */ 
}
```

我们很多后端的小伙伴就是因为不想写那么臃长的样式表而选择了后端开发，如果你用 scss 可以让你按‘模块’来写样式：

```text
.goods-list {
    .item {
        .img .txt{
            /* 样式 */ 
        }
        .name{
            /* 样式 */ 
            .sub{
                /* 样式 */ 
            }
        }
        .price{
            /* 样式 */ 
        }
        .num{
            /* 样式 */ 
        }
    }
}
```

> 想了解更多 scss 特性请查看 [官网 (opens new window)](https://www.sass.hk/)。

恩，我要说的可不止这些。我是想让你更加地贴近项目去开发，在项目目录里面的 uni.scss 文件是个变量文件，让你了解 scss 才能使你更加了解 uni.scss 的使用，让你在项目中更加驰骋。

> Uniapp 官方文档上说了，Uniapp 官方扩展插件及 [插件市场 (opens new window)](https://ext.dcloud.net.cn/)上很多三方插件均使用了这些样式变量，如果你是插件开发者，建议你使用 scss 预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的 App。

Uniapp 默认提供这样一套 UI 主题，同时允许在一定程度上定制新的主题，以满足业务的多样化视觉需求。

开发阶段，每个 Uniapp 项目在目录都会有一个 uni.scss 的文件，可以通过修改 scss 文件的变量来定制自己的插件主题，实现自定义主题功能。

Uniapp 定义了相关变量（相当于框架开发规范），方便开发者引用，修改指定变量值即可，以下是 uni.scss 的部分相关变量：

```text
/* 颜色变量 */
$theme-color: #21d398;
/* 行为相关颜色 */
$uni-color-primary: #007aff;
$uni-color-success: #4cd964;
$uni-color-warning: #f0ad4e;
$uni-color-error: #dd524d;
```

你可以在你使用的 vue 页面文件中轻松使用这些变量，定制主题就是编辑这个变量列表，然后在页面中使用这些变量：

```text
<style lang="scss">
    /* 例如，设置页面背景 #007aff */
    page{
        background: $uni-color-primary;  
    }

    .btn{
        color:#fff;
        background: $theme-color;
    }
</style>
```

在主题化下引用这些样式变量，所有的风格都会保持一致，比如这个音乐应用的主题颜色是浅绿色的，一些按钮，图标都是以这个颜色样式呈现。

运用行为相关颜色，文字基本颜色，背景颜色，边框颜色，文字尺寸，组件禁用态的透明度等等 scss 变量，会让你的项目呈现高度统一，保持一致性.

## 使用 rpx 开发



在样式单位处理方面，Uniapp 默认为 rpx。这是小程序官方推荐的单位，也是 Uniapp 可跨端的通用单位。

大多数人刚开始看到一个新的单位，心里肯定会在嘀咕，又多了一个样式单位，这是还嫌rem，%，em，vh不够麻烦的是吧？

先不要着急，慢慢看我区分这些单位，让你有个充分认识。

平常前端在开发过程中，px 是最常用的样式单位，但是随着移动设备的兴起，rem，%，em，vw 更多单位走入了我们的视野。这些单位的出现无非多是为了解决页面适配的问题，rpx 也不例外。页面适配指的是同样的布局，在不同大小的屏幕上怎么进行缩放、控制间距、宽高、字号等大小都会以同样的样式渲染。

页面适配的方式有很多：

- 使用 %，按百分比自适应布局；
- 使用 rem，结合 html 元素的 font-size 来根据屏幕宽度适配；
- 使用 vw、vh，直接根据视口宽高适配。

可是这些只是在h5网页的某些范围里可以实现，但在其他端并不完全支持，那 Uniapp 设计 rpx 这个单位就是为了解决这个问题的。

rpx 即响应式 px，跟 rem 实现是类似的，一种根据屏幕宽度自适应的动态单位。规定以 `750rpx` 为屏幕基准宽（移动端更多以 iphone 6 的尺寸设计），750rpx 恰好为屏幕宽度。屏幕变宽，rpx 实际显示效果会等比放大。Uniapp 集成了其他 iOS、Android、H5、以及各种小程序（微信/支付宝/百度/头条/QQ/钉钉）等多个平台的特性，为实现多端开发而定义的一种样式单位。

开发者可以通过设计稿基准宽度计算页面元素 rpx 值，设计稿 1px 与框架样式 1rpx 转换公式如下：

**设计稿 1px / 设计稿基准宽度 = 框架样式 1rpx / 750rpx**

换言之，页面元素宽度在 Uniapp 中的宽度计算公式：

**750 \* 元素在设计稿中的宽度 / 设计稿基准宽度**

用一句话简单来说就是，你在750px的设计稿中量到多少数目，就是多少数目的 rpx 量，不用管单位，知道它是伸缩适配的就行。

> 列举官方栗子： 若设计稿宽度为 750px，元素 A 在设计稿上的宽度为 100px，那么元素 A 在 uni-app 里面的宽度应该设为：750 * 100 / 750，结果为：100rpx。 若设计稿宽度为 640px，元素 A 在设计稿上的宽度为 100px，那么元素 A 在 uni-app 里面的宽度应该设为：750 * 100 / 640，结果为：117rpx。 若设计稿宽度为 375px，元素 B 在设计稿上的宽度为 200px，那么元素 B 在 uni-app 里面的宽度应该设为：750 * 200 / 375，结果为：400rpx。

你是不是看到这样的换算方程式有点懵？莫急，Uniapp 提供了自动换算的功能：

在 HBuilderX【偏好设置】->【编辑器设置】中进行配置

![image-20210215144617891](https://img-repo.poetries.top/images/image-20210215144617891.png)

之后代码里就有提示了

![image-20210215144705043](https://img-repo.poetries.top/images/image-20210215144705043.png)

你可能在别处听说过 upx，这个官方已经弃用了，目前版本统一用 rpx，了解完之后就愉快的使用 rpx 吧 😃

## 小结



1. 合理利用工具能让你的开发效率稳步提升，使用 scss 是一个很好提高效率和管理样式的方式；
2. uni.scss 可以实现自定义主题功能，实现全局样式变量的应用；
3. rpx 是 Uniapp 开发可跨端的通用单位，配置工具提示，根据设计稿大小，可以实现简单的基准换算，让开发变得更简单了一些。



## 基础6—样式与布局、BEM的应用、跨端兼容

## sidebarDepth: 3

 

## css 命名弊端



你是否有见过这样的代码？

```text
.top--left .left1-block_nav-liItem > li a{
	
}
.gy-theme .bar-header .hy-nav .order-search .pull-down.active .select-drop {
    display: block
}
```

上面的代码风格各异的使用了 `-` , `_`，驼峰等风格而且嵌套深，CSS 引擎查找样式从右到左进行匹配，遍历页面上每个 li a 元素并确定其父元素。

每个人的代码都有自己的风格在，对于个人来说作者本人也会对自己写的代码会比较熟悉，但是放在多人开发上就显得另类了。协同开发的小伙伴可能根本不知道你写的是什么，甚至跟你写的代码冲突覆盖。或者会反感你写的代码，因为他会为此多敲几次键盘，为了少敲几次键盘，他可能会“友好的问候”你。

为了让你不被小伙伴孤立，那么这次的讲解可能会对你有大好之处。这次也是为了让你少敲几次键盘。😃

我们先了解一下 css 中命名规范中的 BEM。

## 什么叫BEM？



BEM 是 BlockElementModifier 的简称，其实是块（block）、元素（element）、修饰符（modifier）的简称，是 CSS 中的一种命名规范。这种巧妙的命名方法让你的 CSS 类对其他开发者来说更加透明而且更有意义。BEM命名约定更加严格，而且包含更多的信息，它们用于一个团队开发一个耗时的大项目。

BEM 的关键是光凭名字就可以告诉其他开发者某个标记是用来干什么的。通过浏览HTML代码中的class属性，你就能够明白模块之间是如何关联的：有一些仅仅是组件，有一些则是这些组件的子孙或者是元素，还有一些是组件的其他形态或者是修饰符。

可能你还是不太理解什么是BEM，没关系，我们看一下下面这个大家比较熟悉的哆啦A梦吧，看看这之间有什么相似之处。

![image-20210215144908146](https://img-repo.poetries.top/images/image-20210215144908146.png)

上面的哆啦A梦如果用进行分块，可以分为头部（脸部），手部，脚部这三大块。其中我们把脸部拿出来细分：眼睛、嘴巴、鼻子，用关系图表示：

![image-20210215144921750](https://img-repo.poetries.top/images/image-20210215144921750.png)

我们用 BEM 规范来表达一下哆啦A梦的结构：

```text
<template>
	<view>
		<view class="doraemon">
			<view class="doraemon__face">
				<view class="doraemon__face-eye "></view>
				<view class="doraemon__face-mouth"></view>
				<view class="doraemon__face-nose"></view>
			</view>
			<view class="doraemon__hand">
				<view class="doraemon__hand-finger"></view>
			</view>
			<view class="doraemon__footer">
				<view class="doraemon__footer-toe"></view>
			</view>
		</view>
	</view>
</template>	
<style lang="scss">
	.doraemon{
		.doraemon-face{
			.doraemon-face_eye{}
			.doraemon-face_mouth{}
			.doraemon-face_nose{}
		}
		/* 或者使用 @root */
		@at-root #{&}-face {
			@at-root #{&}_eye{}
		}
		.doraemon-hand{
			.doraemon-hand_finger{}
		}
		.doraemon-footer{
			.doraemon-footer_toe{}
		}
	}
</style>	
```

上面使用 BEM 规范块和元素之间用 -- 连接，元素和修饰符之间用 _ 连接 （b--e_m），来命名 CSS（用代码组织哆啦A梦），组织 HTML 元素结构，一一对应 CSS 代码，使得代码结构更清晰。

看起来是不是好像有些少了点意思，为什么？因为名字还是长呀。

接着看下一步吧！

## 页面布局 + BEM + scss



使用 BEM 的方式，还是混淆使用 `-`，`_`，而且命名方式长，就命名这一个会让你举手投降。平常利用 BEM 的规范思想，我自己有一套命名规范。比如上面的代码我们已经在外层指定了 doraemon ，那 doraemon 包含的元素就是属于 doraemon 的了，没有必要再加上 doraemon 了，因此我们可以这么去做：

```text
<template>
	<view>
		<view class="doraemon">
			<view class="face">
				<view class="eye"></view>
				<view class="mouth"></view>
				<view class="nose"></view>
			</view>
			<view class="hand">
				<view class="finger"></view>
			</view>
			<view class="footer">
				<view class="toe"></view>
			</view>
		</view>
	</view>
</template>	
<style lang="scss">
	.doraemon{
		.face{
			.eye{}
			.mouth{}
			.nose{}
		}
		.hand{
			.finger{}
		}
		.footer{
			.toe{}
		}
	}
</style>	
```

每一层的作用域已经被上一层父级包含住了，因此没必要再去指定当前这一层的父级名字。当然每个团队的规范不一样，为了更容易阅读和理解，更容易协作，更容易控制，你需要服从团队的意识再去以开发效率去考虑，让团队甚至是你个人都能够更加容易地维护代码，如果你做到了，那么你自己也有了规范。

当我们自己将不同的规范柔和在一起以形成我自己的行为准则时，需要考虑：

1. 修改元素 class 的时候会不会干扰到其他地方的样式，导致其他引用这个样式的地方错乱；
2. class 名称是否足够简洁，不会让人烧脑；
3. 样式的引用在哪里存放，是否会以 class 命名存放，然后修改 style；
4. H5 中 class 命名的元素有没有绑定事件，修改会不会导致事件失效。

## 全局样式与局部样式



每个页面可覆盖全局样式

定义在 App.vue 中的样式为全局样式，作用于每一个页面。在 pages 目录下 的 vue 文件中定义的样式为局部样式，只作用在对应的页面，并会覆盖 App.vue 中相同的选择器。

注意： App.vue 中通过 `@import` 语句可以导入外联样式，一样作用于每一个页面。

这样我们可以在 common 的文件夹添加一个 common.scss 引入到app.vue中作为基础样式

```text
<!-- App.vue -->
<style lang="scss">
    @import './common/css/common.scss';
</style>
```

## 样式的条件编译



如果有个需求是 元素在 H5 的情况下渲染红色，在小程序下渲染绿色，你会想到怎么做？

判断平台，判断设备？其实你用 Uniapp 就不用考虑的那么复杂了，Uniapp 直接做了条件编译。条件编译是用特殊的注释作为标记，在编译时根据这些特殊的注释，将注释里面的代码编译到不同平台。

条件编译写法：以 #ifdef 或 #ifndef 加 “平台名称” 开头，以 #endif 结尾。

- \#ifdef：if defined 仅在某平台存在
- \#ifndef：if not defined 除了某平台均存在
- %PLATFORM%：平台名称

平台名称参数对应：

![image-20210215145011339](https://img-repo.poetries.top/images/image-20210215145011339.png)

条件编译是利用注释实现的，在不同语法里注释写法不一样，js使用 // 注释、css 使用 /* 注释 */。

那么就可以这么实现:

```text
/* #ifdef MP-WEIXIN */
.wx-clor{
    color: green;
}
/* #endif */
```

## 小结



1. 使用良好的命名规范更容易阅读和理解，更容易协作，更容易控制，能让你的团队开发效率提升一大截；
2. 局部样式就是每个 vue 页面的样式，它的权重比全局样式要高；
3. Uniapp 的条件编译是开发者编写一套代码发布多端项目的利器。



# 基础7—使用iconfont作为整站图标

------

## sidebarDepth: 2



本章主要讲解如何建立图标库，并在 Uniapp 中应用字体图标。

我们在做项目的时候，使用的图标会很多，全都以图片形式加载的话，整个文件体积会变得非常大，不仅会增加额外的 http 请求，还会有图片放大后失真的问题，在小程序开发当中，整个小程序所有代码量大小不超过 12M。如果没有很合理的运用与优化，加载速度也会大打折扣。

## 为什么要使用字体图标



- 字体图标是矢量图标，可进行无限缩放不失真，一旦字体加载了，图标就会马上渲染出来，不需要下载一个个图像
- 加载字体图标无需 http 请求，字体图标体积更小，相较图片加载速度更快
- 兼容性方面，字体图标支持现代浏览器，甚至是低版本的IE浏览器
- 可以像页面中的文字一样，通过 font-size 属性来对其进行大小的设置，而且还可以添加各种文字效果，如 color、hover、filter、text-shadow、transform 等效果

这里安利我常用的字体图标库，[Iconfont-阿里巴巴矢量图标库 (opens new window)](https://www.iconfont.cn/)-国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。阿里巴巴体验团队倾力打造,设计和前端开发的便捷工具。

## 使用 iconfont 图标库



在阿里图标库里，可以找到非常多各式各样的字体图标，并且可以私人上传定制图标库，与团队协同开发管理图标。首次登录需要先捆绑账号，支持github及新浪微博快捷入口登录。登录后点击【图标管理】>>【我的项目】进入项目页面：

![image-20210215145102087](https://img-repo.poetries.top/images/image-20210215145102087.png)

进入页面点击右侧紫色的添加图标新建一个项目，点进出现弹窗，在弹出的弹窗中填好项目名称及项目描述，然后点击新建：

![image-20210215145115364](https://img-repo.poetries.top/images/image-20210215145115364.png)

回到图标库，在搜索框中输入自己想要的图标，并鼠标悬浮到具体图标中，点击购物车（添加入库），此时你的购物车会添加1：

![image-20210215145128487](https://img-repo.poetries.top/images/image-20210215145128487.png)

找到所有想要的图标并添加进购物车后，点击右上角购物车的图标，将购物车里的图标添加至项目，选择刚才新建的项目：

![image-20210215145146585](https://img-repo.poetries.top/images/image-20210215145146585.png)

回到我的项目页面，点击**下载至本地**按钮，解压即可：

![image-20210215145206187](https://img-repo.poetries.top/images/image-20210215145206187.png)

## 在项目中使用 iconfont



第一步，解压文件

将上面下载的文件解压缩后可以看到以下内容，woff，woff2，ttf，eot后缀名的等都是字体文件：

![image-20210215145221504](https://img-repo.poetries.top/images/image-20210215145221504.png)

查看 iconfont.css 样式表中如何引用这些字体文件，并且可以清楚知道，引用了四个字体文件加上一个svg文件：

```text
@font-face {font-family: "iconfont";
  src: url('iconfont.eot?t=1573520590765'); /* IE9 */
  src: url('iconfont.eot?t=1573520590765#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,d0...') format('woff2'),
  url('iconfont.woff?t=1573520590765') format('woff'),
  url('iconfont.ttf?t=1573520590765') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('iconfont.svg?t=1573520590765#iconfont') format('svg'); /* iOS 4.1- */
}
```

第二步，引入文件

将上面提到的5个文件放入到新建文件夹 common/css 中，放在这里的原因是字体属于全局文件，可以统一管理：

![image-20210215145235326](https://img-repo.poetries.top/images/image-20210215145235326.png)

要想在所有页面上生效，就要在 App.vue 引入：

```text
<!-- App.vue -->
<style>
	/*每个页面公共css */
	@import './common/css/iconfont.css';
</style>
```

**注意：引用字体文件的时候注意使用相对路径，避免查找失败。**

第三步，在页面中使用

```text
<template>
	<view class="content">
		<view class="iconfont">&#xe64f;</view>
		<view class="iconfont">&#xe604;</view>
	</view>
</template>
```

然后就可以在浏览器，小程序上预览效果了：

![image-20210215145249407](https://img-repo.poetries.top/images/image-20210215145249407.png)

可能有小伙伴会有疑问，为什么这样做会生效？其实我们在 App.vue 引入 iconfont.css 的时候，样式表`font-family`属性指定了字体文件，作用于`iconfont`命名的元素，并且在字体库中查找对应的 code（以 `iconfont` 命名的元素包裹的字符）：

```text
<!-- iconfont.css -->
.iconfont {
  font-family: 'iconfont' !important;
  font-size: 28rpx;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

以 `iconfont` 命名的元素包裹的字符从哪里来呢？就是在 iconfont 项目中把字体图标显示以 Unicode 的形式显示，鼠标悬浮可复制代码：

![image-20210215145302868](https://img-repo.poetries.top/images/image-20210215145302868.png)

如果你不想每次都这么麻烦，添加一个图标然后又重复以上操作，你可以使用生成的 cdn 地址：

![image-20210215145315433](https://img-repo.poetries.top/images/image-20210215145315433.png)

代码修改调整：

```text
<!-- iconfont.css -->
@font-face {
  font-family: 'iconfont';
  src: url('https://at.alicdn.com/t/font_1487619_1bjjf4kxjov.eot');
  src: url('https://at.alicdn.com/t/font_1487619_1bjjf4kxjov.eot?#iefix') format('embedded-opentype'),
  url('https://at.alicdn.com/t/font_1487619_1bjjf4kxjov.woff2') format('woff2'),
  url('https://at.alicdn.com/t/font_1487619_1bjjf4kxjov.woff') format('woff'),
  url('https://at.alicdn.com/t/font_1487619_1bjjf4kxjov.ttf') format('truetype'),
  url('https://at.alicdn.com/t/font_1487619_1bjjf4kxjov.svg#iconfont') format('svg');
}
```

注意：小程序不能自动配对 https 的，必须手动添加 `https:`，将 iconfont.css 文件内 url 路径转换为在线路径，加上 `https:`。

### 小结

1. 有效利用字体图标的优势，让你臃肿的项目可以缩小不少，并优化速度；
2. iconfont 的引入能让你有效的管理图标库；
3. 本章代码 [uni-course-iconfont (opens new window)](https://github.com/front-end-class/uniapp-music-code/blob/master/uni-course-iconfont.zip)。



# 基础8—Vuex快速掌握

本节主要介绍 Vuex 的基本概念，并一步步引导读者如何去运用 Vuex 在一个应用中，以浅显易懂的例子掌握 Vuex 的核心知识。

## 什么是 Vuex？



首先我们要弄清楚 Vuex 是做什么的？为什么使用 Vuex ?

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。uniapp集成了vuex的状态管理功能，可以在多端情况下使用。

Vuex 需要解决的问题：

1. 多个视图依赖于同一状态。比如当前音乐应用的账号页，我的页面保持登录状态以及用户信息。
2. 来自不同视图的行为需要变更同一状态。比如登录页更改登录状态，账号页面退出登录改成未登录状态。

这个状态自管理应用包含以下几个部分：

- state，驱动应用的数据源；
- view，以声明方式将 state 映射到视图；
- actions，响应在 view 上的用户输入导致的状态变化。

![image-20210215145426175](https://img-repo.poetries.top/images/image-20210215145426175.png)

上面的概念比较模糊，我们先来点简单的。

在这引用了一位技术大拿关于管理状态（state）的讲解：

> 不管是 Vue ，还是 React，都需要管理状态（state），比如组件之间都有共享状态的需要。什么是共享状态？比如一个组件需要使用另一个组件的状态，或者一个组件需要改变另一个组件的状态，都是共享状态。

> 父子组件之间，兄弟组件之间共享状态，往往需要写很多没有必要的代码，比如把状态提升到父组件里，或者给兄弟组件写一个父组件，听听就觉得挺啰嗦。

> 如果不对状态进行有效的管理，状态在什么时候，由于什么原因，如何变化就会不受控制，就很难跟踪和测试了。如果没有经历过这方面的困扰，可以简单理解为会搞得很乱就对了。

> 在软件开发里，有些通用的思想，比如隔离变化，约定优于配置等，隔离变化就是说做好抽象，把一些容易变化的地方找到共性，隔离出来，不要去影响其他的代码。约定优于配置就是很多东西我们不一定要写一大堆的配置，比如我们几个人约定，view 文件夹里只能放视图，不能放过滤器，过滤器必须放到 filter 文件夹里，那这就是一种约定，约定好之后，我们就不用写一大堆配置文件了，我们要找所有的视图，直接从 view 文件夹里找就行。

> 根据这些思想，对于状态管理的解决思路就是：把组件之间需要共享的状态抽取出来，遵循特定的约定，统一来管理，让状态的变化可以预测。根据这个思路，产生了很多的模式和库。

Vuex 防止随意修改而不好跟踪状态，规定组件不允许直接修改 store 实例的 state，组件必须通过 action 来改变 state ，也就是说，组件里面应该执行 action 来分发 (dispatch) 事件通知 store 去改变。这样约定的好处是，我们能够记录所有 store 中发生的 state 改变，同时实现能做到记录变更 (mutation)、保存状态快照、历史回滚的先进的调试工具。

## Vuex 的基础使用（创建一个改变登录状态的应用）



我们一个简单的登录状态的应用开始。

第一步，创建 store ；

首先在根目录下新建文件夹 `store`，并创建 index.js ：

```text
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isLogin: false   // 是否登录的状态，默认为未登录 false
    },
    mutations: {
        // 定义一个操作isLogin状态的方法
        storeLogin (state) {
          state.isLogin = true
        }
    }
})

export default store
```

上面代码引入了 `vue`，`vuex` ，并使用 `Vue.use(Vuex)` 安装Vuex插件，在 `new Vuex.Store` 传参对象中定义 `state` ，`mutations` 。

我在上面定义了 `isLogin`，整个项目以这个变量作为登录标记，`storeLogin` 的方法来修改 `isLogin` 值，而且修改 `isLogin` 值只能通过 `storeLogin` 方法。

第二步，新建登录页login.vue；

在 `pages` 下新建一个页面 login.vue，鼠标悬浮在当前项目目录下选择【新建页面】，命名为 `login` 勾选【自动在 pages.json 中注册】:

上面新建了一个 `login` 路由页面，勾选【自动在 pages.json 中注册】是在 `pages.json` 文件中注册页面路由，在 HBuilder 上部操作 【运行】>>【运行到浏览器】>> 选择一个浏览器，这样客户端就能以 `https://localhost:8080/#/pages/login/login` 访问。

第三步，引入 Vuex ；

在主入口 main.js 引入刚才新建的 store：

```text
import Vue from 'vue'
import App from './App'
import store from './store'

Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
```

> 使用 `Vue.prototype.$store = store` 把 `store` 挂在到 `Vue` 中，这样整个项目就可以共享这个 `$store` 状态，通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 `this.$store` 访问到。下面要在 login.vue 页面共享 `isLogin` 登录状态；

```text
<!-- login.vue -->
<template>
    <view>
       登录状态: {{$store.state.isLogin}}
    </view>
</template>

<script>
    export default {
        data() {
            return {
                
            };
        }
    }
</script>

<style lang="scss">

</style>
```

第四步：访问 Vuex 定义变量。

在应用启动情况下访问 `https://localhost:8080/#/pages/login/login` 可以看到 login.vue 页面上的 `{$store.state.isLogin}` 被渲染成了一个 `false`，这个 `false` 是第一步在文件 store/index.js 中添加的 `isLogin` 变量。

因为有 `Vue.prototype.$store = store` 这样我们就可以在页面组件中以 `$store` 访问 `state` 定义下的所有状态变量，也就是说你可以在页面B，页面C，甚至是页面Y都可以访问到这个变量。

那问题来了，如果我定义的变量很多或者很长呢，这种写法 `$store.state.isLogin` 有没有更加便捷的方法呢？请看下一步。

## Vuex 的 state 多种用法



Vuex 封装了一些辅助函数 `mapState` 方法，让你写的状态可以映射出来，减少查询。当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性，让你少按几次键。这样我们可以简化一下 login.vue 代码：

```text
<!-- login.vue -->
<template>
    <view>
        登录状态: {{isLogin}}
        登录状态: {{hasLogin}}
    </view>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        data() {
            return {
                
            };
        },
        computed: mapState({
            // 箭头函数可使代码更简练
            isLogin: state => state.isLogin,
        
            // 传字符串参数 'isLogin' 等同于 `state => state.isLogin`
            hasLogin: 'isLogin',
        }),
        // computed: {
        //    ...mapState(['isLogin'])
        // },
    }
</script>
<style lang="scss">

</style>
```

在 `script` 中引入辅助函数 `import { mapState } from 'vuex'`，就可以在 `computed` 对象中使用 `mapState` 辅助函数了；

上面第一个写法中 由 `state.isLogin` 映射到状态 `isLogin`，第二个写法是直接以传字符串参数的形式将Vuex的储存状态 `isLogin` 直接映射到 `hasLogin` ，保存后可以在浏览器看到 `isLogin` ，`hasLogin` 渲染是一样的。好像还不够简便的样子，那来一个更简便的写法：

```text
computed: {
   ...mapState(['isLogin'])
},
```

这样的形式也可以访问 `isLogin` 状态，该写法运用了es6中的 `...` 对象扩展运算符号，意思是里面的数组值 `['isLogin']` 通过 `mapState` 辅助方法映射出来之后，再通过扩展运算符一个一个对应出来，这样就可以在视图直接访问了 ``，如果有多个状态值（比如还有 'stateA' , 'stateB' ）就显得便捷很多了，不用写多余的方法：

```text
computed: {
   ...mapState(['isLogin', 'stateA', 'stateB'])
},
```

上面的技术小点只是介绍如何获取 state 状态，那如果我想要改变状态呢？

## Vuex 的 Mutation 用法



还记得我们在 `store/index.js` 文件中定义一个操作 `isLogin` 状态的方法吗？

```text
// ...
mutations: {
    // 定义一个操作isLogin状态的方法
    storeLogin (state) {
      state.isLogin = true
    }
}
```

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation （在 mutations 中定义的方法），我们可以访问事件去触发 `storeLogin()` 更改登录状态，重新回到 login.vue 页面，添加一个按钮方法去触发 `storeLogin()`:

```text
<!-- login.vue -->
<template>
    <view>
        <view>
            登录状态: {{isLogin}}
        </view>
        <button @click="login">登录</button>
    </view>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        data() {
            return {
                
            };
        },
        computed: {
           ...mapState(['isLogin'])
        },
        methods: {
            // 登录
            login () {
               this.$store.commit('storeLogin')
            }
        },
    }
</script>
<style lang="scss">

</style>
```

当我们点击登录按钮的时候执行 `this.$store.commit('storeLogin')` 就可以把登录状态修改为 `true` 了。

我们不能直接调用一个 mutation 方法事件，我们要调用 store.commit 方法去触发，相当于中间搭了一个桥来衔接这些方法。现在想想好像是那么回事了 😃.

在程序设定开发中我们肯定会改变很多状态，不仅仅是把未登录改为登录，还会退出登录改为未登录，这样我们可以不用写一个退出登录的方法，我们直接传递一个参数过去就可以搞定了，回到 store/index.js 文件中 `storeLogin()` 这个方法会接受 `state` 作为第一个参数，自定义参数作为余后的参数，通常把这叫做 **载荷** `payload`：

```text
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = ``({
    state: {
        isLogin: false   // 是否登录的状态，默认为未登录 false
    },
    mutations: {
        // 定义一个操作isLogin状态的方法
        storeLogin (state, payload) {
          state.isLogin = payload
        }
    }
})

export default store
```

这样我们在 login.vue 页中就可以传参数了。

```text
<!-- login.vue -->
<template>
    <view>
        <view>
            登录状态: {{isLogin}}
        </view>
        <button @click="login">登录</button>
        <button @click="logout">退出</button>
    </view>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        data() {
            return {
                
            };
        },
        computed: {
           ...mapState(['isLogin'])
        },
        methods: {
            // 登录
            login () {
               this.$store.commit('storeLogin', true)
            },
            // 退出
            logout () {
               this.$store.commit('storeLogin', false)
            }
        },
    }
</script>
<style lang="scss">

</style>
```

我们再添加一个退出按钮，同样调用触发 `storeLogin()` 修改登录状态，这样只是更改参数就可以改变登录状态了，是不是很简单 😃，再优化一下代码：

```text
<!-- login.vue -->
<template>
    <view>
        <view>
            登录状态: {{isLogin}}
        </view>
        <button @click="login(true)">登录</button>
        <button @click="login(false)">退出登录</button>
        
        <navigator url="../index/index">去首页</navigator>
    </view>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        data() {
            return {
                
            };
        },
        computed: {
           ...mapState(['isLogin'])
        },
        methods: {
            // 改变登录状态
            login (bool) {
               this.$store.commit('storeLogin', bool)
            },
        },
    }
</script>
<style lang="scss">

</style>
```

并修改下首页，让首页也可以访问登录状态 `isLogin` ：

```text
<!-- 首页 index.vue -->
<template>
    <view class="content">
        <view class="text-area">
            <text class="title">当前是首页</text>
            <view>
                登录状态: {{isLogin}}
            </view>
        </view>
    </view>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        data() {
            return {
                
            };
        },
        computed: {
           ...mapState(['isLogin'])
        },
        methods: {
            
        },
    }
</script>
<style>
    
</style>
```

在浏览器运行一下，你就可以尝试改变登录状态的时候去首页查看，发现首页也是登录的。如果你做到了，恭喜你，你已经掌握了 Vuex 了。

Vuex 还有 Action 概念，可以包含任意异步操作，如果你使用了异步操作，直接调用 mutation 里面的方法可能并不会成功，因为 mutation 必须同步执行。

如果你的应用模块足够多的话，可以以模块的方式管理这些，比如客户模块，商品模块，这样这些状态就可以轻松管理了。整个项目，无论是页面还是组件都可以用上面提到的方式访问到 state 和修改 state。

然后再回顾一下这篇文章的第一个图，你就能轻松了解 Vuex 的机制了。

想要查看更多的理论知识可以查看[官网 vuex (opens new window)](https://vuex.vuejs.org/zh/)。

## 小结：



1. Vuex 是一个专为应用程序开发的状态管理模式。
2. 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。我们不能直接调用一个 mutation 方法事件，我们要调用 store.commit 方法去触发，相当于中间搭了一个桥来衔接这些方法。
3. 合理的使用 Vuex 可以让我们友好便捷的管理状态，不仅是登录状态，可以是用户信息，可以是一个修改标记，如果您不打算开发大型单页应用，使用 Vuex 可能是繁琐冗余的。确实是如此——如果您的应用够简单，您最好不要使用 Vuex。我们不能为了技术而技术。
4. 本章代码 [uni-course-vuex](https://github.com/front-end-class/uniapp-music-code/blob/master/uni-course-vuex.zip)



# 基础9—小程序、app调试环境配置

在解决了大部分开发的时候，我们的开发可以往调试处理兼容方向走了，虽然浏览器（内置浏览器）提供了很大的便利性，可以在控制台查看交互信息，样式的渲染。但实际的代码呈现还是有不一样的，并且模拟器存在一定的误差，因此需要真机模拟处理。

在操作之前先说一下关于兼容。

## 浏览器兼容



web 网页是以浏览器为载体的，因此兼容问题都是浏览器方面的问题，当前市场上浏览器种类很多，不同浏览器的内核也不尽相同，所以各个浏览器对网页的解析存在一定的差异。浏览器内核主要分为两种，一是渲染引擎，另一个是 js 引擎，内核更加倾向于说渲染引擎。

开发 h5 页面要处理兼容，需要了解不同浏览器的解析方式和对html，css，js三者不同版本的支持，比如桌面端浏览器对 ES2015 的支持情况：

1. Chrome：51 版起便可以支持 97% 的 ES6 新特性。
2. Firefox：53 版起便可以支持 97% 的 ES6 新特性。
3. Safari：10 版起便可以支持 99% 的 ES6 新特性。

那么如果你的 js 使用了 ES6 的语法，而且没有转编译成这些版本浏览器支持的语言去预览查看的话，浏览器就会认不出你写的代码而报错。

html，css的兼容问题大致如此，导致渲染出现异常，未能达到预期效果。

网页在各种浏览器上的显示效果可能不一致而产生浏览器和网页间的兼容问题，网站必须做好浏览器兼容，才能够让网站在不同的浏览器下都正常显示。因此只要多个浏览器查看有没有问题出现。很幸运的是，使用 HBilderX 编译器的 ES6 编译插件就可以在 Uniapp 酸爽使用 ES 了。你的代码就会编译成其他浏览器可识别的 ES2015 版本代码了。

## 小程序兼容



本质其实就是 hybrid app，介于 web app 与 native 之间，具备丰富的调用手机各种功能的接口，同时又具备灵活性，可跨平台。

> 微信小程序运行在三端：iOS（iPhone/iPad）、Android 和 用于调试的开发者工具。 三端的脚本执行环境以及用于渲染非原生组件的环境是各不相同的： 在 ios 上，小程序逻辑层的 javascript 代码运行在 JavaScriptCore 中，视图层是由 WKWebView 来渲染的，环境有 ios8、ios9、ios10； 在 Android 上，旧版本，小程序逻辑层的 javascript 代码运行中 X5 JSCore 中，视图层是由 X5 基于 Mobile Chrome 57 内核来渲染的； 新版本，小程序逻辑层的 javascript 代码运行在 V8 中，视图层是由自研 XWeb 引擎基于 Mobile Chrome 67 内核来渲染的； 在开发工具上，小程序逻辑层的 javascript 代码是运行在 NW.js 中，视图层是由 Chromium 60 Webview 来渲染的。

小程序是运行在微信，以微信作为载体的，大部分兼容性问题都已经由微信内部处理。更多的兼容问题体现在不同微信版本中。我们要处理的是一些小程序特性的问题，举例几个兼容问题：

1. scroll-view 在手机上可能会出现滚动条
2. 直接在标签添加 style 行内样式
3. css 不支持本地路径图片
4. 控件层级表现有出入，z-index 在 native 组件下失效

应该说这些问题只是因为语言特性渲染机制不同产生的，这些情况微信也在文档做了说明，要想处理兼容问题，熟知语言框架的特性，才能避免问题，最快定位问题，处理问题。开发时尽量避免使用太新的css，js，html，可能在老款手机上产生浏览器兼容问题。

## 小程序调试



进行小程序调试，打开第一章说过的 [微信开发者工具 (opens new window)](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)，而且还需要申请一个微信小程序的 AppID ，登录 [mp.weixin.qq.com (opens new window)](https://mp.weixin.qq.com/)申请。

接着：

1. 在 HbuilderX 编译器中打开这个工程，找到 manifest.json 文件并选中；
2. 找到微信小程序配置，在配置面板微信小程序 AppID 中输入刚才申请注册的 AppID；

![image-20210215145627431](https://img-repo.poetries.top/images/image-20210215145627431.png)

1. 点击【运行】>> 【运行到小程序模拟器】>> 【运行到小程序模拟器】>> 【微信开发者工具】 （选定第二个，可指定启动页面）：

![image-20210215145702836](https://img-repo.poetries.top/images/image-20210215145702836.png)

1. 项目开始编译，并启动微信开发者工具，可能需要在微信开发者工具中开启服务端口（第一章说过），然后 HbuilderX 才能访问，这个在控制台一般有提示，打开微信开发者工具【设置】>>【安全设置】>> 【开启服务端口】就行了（当然还需要手机扫码登录微信开发者）。
2. 这时候的代码保持着热更新中，在 HbuilderX 编译器保存文件（Ctrl + S）可及时查看修改效果，这也是一大便利。
3. 在微信小程序的工具栏找到预览并点击，小程序会打包你的代码，等待打包完就会出现一个二维码，用手机微信扫描即可。

![image-20210215145748535](https://img-repo.poetries.top/images/image-20210215145748535.png)

1. 在真机上，点击屏幕右上角的按钮打开的菜单里选择「打开调试」，会要求重新打开小程序，再次打开发现右下角会出现 vConsole 按钮，点击打开看到关于请求，报错，生命周期，系统等日志

## ios真机调试



HbuilderX 的调试对比 Xcode 等其他工具是非常简单了，跟着步骤提示来，你也可以成功

### Mac上真机调试

在 HbuilderX 编译器里面 点击 【运行】>> 【运行到手机或模拟器】>> 【运行设备**】在这里可以检测到在 itunes 关联的苹果手机：

![image-20210215145811960](https://img-repo.poetries.top/images/image-20210215145811960.png)

建立手机连接需要安装 HbuilderX 调试基座（iPhone_base.ipa）关联，根据提示点击安装在苹果手机：

![image-20210215145825228](https://img-repo.poetries.top/images/image-20210215145825228.png)

安装成功之后会，手机上可以看见 HbuilderX 图标，点开

![image-20210215145835283](https://img-repo.poetries.top/images/image-20210215145835283.png)

稍等片刻，HbuilderX 会开始打包代码同步到手机并运行

![image-20210215145851811](https://img-repo.poetries.top/images/image-20210215145851811.png)

> Uniapp 提示 ios9.0 及以上系统需要在"设置"-"通用"-"设备管理"(或"描述文件")中信任 DCloud 企业证书( Digital Heaven 开头的证书)才可以正常使用， 我们需要在手机上打开该软件可能会显示此软件未受信任的情况，需要 【设置】>> 【通用】>>【设备管理】>> 进入设备管理页面，我们找到想要授信的企业级应用，直接点击打开，系统将会在 iPhone 上弹出一个提醒窗口，我们直接点击【信任】按钮即可

![image-20210215145907983](https://img-repo.poetries.top/images/image-20210215145907983.png)

如无意外，编译成功：

![image-20210215145920461](https://img-repo.poetries.top/images/image-20210215145920461.png)

找到 HbuilderX 的调试小甲虫

![image-20210215145932161](https://img-repo.poetries.top/images/image-20210215145932161.png)

点击会弹出窗口

![image-20210215145943102](https://img-repo.poetries.top/images/image-20210215145943102.png)

待打开就可以调试应用了

![image-20210215145954622](https://img-repo.poetries.top/images/image-20210215145954622.png)

### Windows真机调试

和上文 Mac 调试基本相同，由于出生的不同，你可能需要安装 itunes 和 itools

1. 下载安装 itunes

官网下载 [itunes (opens new window)](https://www.apple.com/itunes/)，选择自己电脑系统 window:

![image-20210215150010134](https://img-repo.poetries.top/images/image-20210215150010134.png)

根据自己电脑系统32位或者64位进行下载：

![image-20210215150104521](https://img-repo.poetries.top/images/image-20210215150104521.png)

一路同意安装完成即可；

1. 下载安装 itools

[itools (opens new window)](https://www.itools.cn/)进行安装本地应用然后再次重复上面运行步骤：

![image-20210215150127994](https://img-repo.poetries.top/images/image-20210215150127994.png)

## 小结



本章主要介绍了小程序和 app 端调试配置，到这里基础章节就学完了，下一章我们将进入进阶实战，我会从项目分析，基础搭建和代码实战几方面完成一个真实的音乐项目，是不是有些按捺不住了，那就赶紧开始吧。



# 实战

## 实战1—项目初始化及架构目录

本章主要讲解项目环境的基础配置和使用工具，在此基础上分析工程代码目录结构，延展讲解完成项目开发的准备工作。

## 项目准备



一，项目初始阶段

1. 一个项目的开始，会有业务需求，就是为什么要有这个项目，这个项目要实现什么目的，解决什么问题（这些是项目发起人，产品定位者思考的）；
2. 项目发起后，产品经理会根据项目特点，市场分析，竞品分析，目标人群等给出项目的实际蓝图（原型），就是互联网产品的定型，项目的雏形；
3. 根据原型，UI 完成对原型的扩展，用户的操作习惯，视觉感官，画面感等进行进一步的完善，也就是我们所说的设计稿，前后端人员准备技术选型，语言，框架，或者是数据库的选择。只有适合团队的架构才能更好的打磨一个项目；
4. 技术选型完，前后端之间会讨论数据交互的问题，当前基本都是前后分离的架构，讨论更多的是基于 HTTP 协议的接口，约定数据结构，然后同时开发，按照项目进度进行联调，提测，交付，不断的循环这套流程，已达成一个个"里程碑"；

二，项目开发阶段

1. 前端人员在在需求评审，协商接口文档后，就可以开始搭建项目工程了（不要马上 coding，我们应该是对项目的 PRD 做分析，细化抽离，这块我在之后会详细探讨）；
2. 前端拿到接口文档，并不是直接对接开发，而是模拟准备数据，很多情况下后端人员只是约束了 api 类型，方法等，并没有实际部署，所以需要自己模拟接口，在这里我们使用了某易云音乐的 api，这样也更接近实际的项目开发，让学习者有更直观的感受；
3. 模拟接口完成必要的交互才会有实际性的联调，如果感兴趣的小伙伴可以选择简单的 [easyMock (opens new window)](https://www.easy-mock.com/)，当然还有其他一些工具 swagger 等，根据团队情况而定，完成数据模拟。

三，项目框架的选型

1. 框架选型是项目打造与项目定位的一部分，产品需要 app，h5，小程序来扩大市场，但是要基于团队的情况，衡量开发成本，开发时间，兼顾各个问题，兼顾各个端；
2. 市面上有很多大团队贡献的框架或库，但是如果项目有大量定制化的功能，那么这个框架或库可能比不是你想要的，如果你要简易多端走，那么这就是你的菜；
3. 以下是一些可以帮助您更好地比较这些框架的问题：
   - 是否足以构建可扩展的应用程序，解决项目需求？
   - 是否很容易为每个框架找到开发人员？
   - 是否有持续的维护和反馈？
   - 是否有稳定的社区？
   - 是否了解框架的性能，速度和学习曲线？
4. 在以往的经历中，我分别使用过小程序原生，mpvue，taro 和 Uniapp 来开发，即使不跨端，Uniapp 也能给我更好的开发体验，毕竟原生小程序开发并没有那么友好。

## 实战从 0 到 1



![image-20210215152844498](https://img-repo.poetries.top/images/image-20210215152844498.png)

从这节开始主要会围绕几个页面来分析讲解实战开发的内容，通过实际的开发来引用 Uniapp 框架的组件，api 等，这样能充分深入了解 Uniapp 框架，也可以了解如何搭建一个项目。如果你想更好把控框架与前端项目架构，那就往下看吧。

以上图为例，一开始就要确定好 tabbar 底部导航对应的几个入口页面，再把页面分成轮播图，分类，推荐歌单等模块，对于通用的模块功能可以封装成自定义组件。

开始我们新建一个 Uniapp 项目，【选择新建项目】 >> 【uni-app】 >> 【默认模板】 >> 【创建】；（关于如何新建项目可以查看基础一的解说介绍）

Uniapp 延伸扩展了小程序中的导航条、选项卡，通过配置文件生成，配置后由原生组件进行渲染， Uniapp 在 H5 中同样兼容这些配置，不过会降级通过 div 的标签组件实现，因此开发者无需单独为 H5 平台添加导航条或选项卡，从而实现一次开发，跨端运行。

## 目录结构介绍



新建项目后，项目目录手动调整为（目录结构为大多数团队开发基本约定）：

```text
|-- apis                             // 所有接口模块
|     └─ account.js
|-- common                           // 公用目录(包含全局样式，全局js等)
|     └─ css
|         └─ common.scss
|     └─ js
|         └─ util.js
|-- components                       // 公用组件目录
|     └─ a.vue                       // 公用的a组件
|-- pages                            // 业务页面文件存放目录 以入口进行文件夹分类
|     └─ index                       // index页面主体文件夹
|     |    └─ index.vue              // 页面
|     └─ account                     // account页面主体文件夹
|     |    └─ account.vue            // 页面
|     └─ subpages                    // 业务页面 分包
|          └─ acount
|               └─ acount.vue
|-- static                           // 存放应用引用静态资源（如图片、视频等）的地方，注意：静态资源只能存放于此
|     └─ image                       
|-- store                            // 状态管理
|     └─ index.js 
|-- untils                           // 管理工具
|     └─ request                     // 请求封装
|-- main.js                          // 初始化入口文件
|-- App.vue                          // 应用配置，用来配置App全局样式以及监听
|-- manifest.json                    // 配置应用名称、appid、logo、版本等打包信息
|-- pages.json                       // 配置页面路由、导航条、选项卡等页面类信息
```

上面的配置文件是固定，不建议随意修改，可能会引起未知编译问题，Uniapp 在处理文件的时候做了规范处理，所谓入乡随俗，使用它的框架就需要遵循它的使用规范。

这边要特别说明一点，由于小程序有分包机制优化，因此我们的 `pages` 是以分包来对页面进行分块的，以主页面的五个入口，分包的形式来管理页面。上面是 Uniapp 项目的基础目录使用，当然每个人可以根据习惯爱好，自定义一个目录。更重要的是遵循一定的规范，这有助于更好的协同开发。

下面讲解目录的核心内容。

## 加入公用文件



跟平常 h5 项目引入 reset.css 文件对页面`样式重置`处理一样，在项目开始引入通用的样式文件可以提前对文件全局处理。App.vue 是路由页主入口，在这定义的样式会在所有的组件生效，可以在 `<style>` 标签定义全局通用样式。为了更好管理全局样式，这里抽离为 common.scss 文件，并把编译语言设为 scss:

```text
<!-- App.vue -->
<style lang="scss">
    @import './common/css/common.scss';
</style>
```

此处的 page 相当于 body 节点，例如：

```text
<!-- common.scss -->
page {
  background-color:#ccc;
}
view{   // 以盒模型显示
  box-sizing:border-box;
}
```

注：在 Uniapp 中不能使用 * 选择器。

下一步引入公共方法库 utils.js ，要把公共方法给其他文件引用，要把这些文件暴露出去，通过 `export default` 暴露一个对象，然后引用文件再 import 该文件进来（有 export 才可 import），后续添加的方法加入 PubFuc 对象即可：

```text
/* common/js/utils.js */
const PubFuc = {
    // 格式化时间戳
    formatTime: (value) => {
        var value = String(value);
        function t (v) {
            return v = v < 10 ? ("0" + v) : v;
        }
        String.prototype.ToString = function (value) {
            var date = new Date(parseInt(this.substring(6, this.length - 2)));
            value = value.replace("yyyy", date.getFullYear());
            value = value.replace("yy", t(date.getFullYear().toString().substr(2)));
            value = value.replace("MM", t(date.getMonth() + 1));
            value = value.replace("dd", t(date.getDate()));
            value = value.replace("hh", t(date.getHours()));
            value = value.replace("mm", t(date.getMinutes()));
            value = value.replace("ss", t(date.getSeconds()));
            value = value.replace("ms", date.getMilliseconds())
            return value;
        };
        return value.ToString("yyyy-MM-dd  hh:mm:ss");
    }
}

export default PubFuc
```

在讲解公共模块的使用时，有一种挂载 Vue.prototype 方式适合我们去使用，我们只需在主入口 main.js 引入并挂在到 Vue 对象上：

```text
/* main.js */
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// 公共js
import PubFuc from'./common/js/util.js'
Vue.prototype.$pubFuc = PubFuc

App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
```

调用方式，例如：

```text
this.$pubFuc.formatTime()
```

## 使用 rpx、scss 开发



在前面基础章节讲解过样式单位处理，Uniapp 默认为 rpx 。这是一种作为 Uniapp 可跨端的通用单位。 为了多端的显示效果一致，我们也选用 rpx 单位作为该项目的像素处理单位。

```text
<style lang="scss">
   view {
       font-size: 30rpx;
   }
</style>
```

## 图标、图片处理



1. 图标统一使用 iconfont 图标作为整站的图标。
2. 图片放入到 static 文件夹中统一管理。

## 开发环境和生产环境、request 请求



Uniapp 可通过 process.env.NODE_ENV 判断当前环境是开发环境还是生产环境。一般用于连接测试服务器或生产服务器的动态切换。

```text
if (process.env.NODE_ENV === 'development') {
    console.log('开发环境')
} else {
    console.log('生产环境')
}
```

Uniapp 提供的 uni.request() 不能有效的管理请求与响应状态等信息，因此我们在项目使用中需要进行二次封装，可以更好的管理请求与响应。这一块的封装放在了 untils/request 中，而业务的请求 api 接口列表则存放在了文件夹 apis 中，下面的文件以入口模块命名：

```text
|-- apis     // 存放所有接口
     └─ account.js
     └─ cloud.js
     └─ index.js
```

我们在封装的 request 中里面还包含了请求拦截，响应拦截，设置请求头等，还有根据判断是开发环境或正式环境，来设置不同的 baseUrl：

```text
/* utils/request/index.js */

// need to change baseUrl
const baseUrl = process.env.NODE_ENV === 'development' ? "https://localhost:8081/v1/api" : "https://www.gzamon.wang"
```

这样在开发调用后端接口的时候，可以以此为 baseUrl。更有可能你需要与公司小伙伴在同个网段下开发联调，那这个 baseUrl 就要改成小伙伴的电脑 ip 地址了。

在调用页面使用时依据按需引用的原则，打包编译的时候不会把整个文件打包进来，有效控制编译后的文件大小，比如使用 apis/test.js 中的测试接口：

```text
/* apis/test.js */
import request from '@/utils/request/index.js'

// 暴露方法
export function test200(data) {
    return request.request({
        url: '/get200',
        method: 'POST',
        data: data,
        authType: 'None'
    })
}
/* pages/index.vue */
import { test200 } from "@/apis/test.js"
export default {
    data() {
        return {
            title: ''
        }
    },
    onLoad() {
        this.test()
    },
    methods: {
        // 测试获取数据
        test () {
            test200().then(res => {
                this.title = res.data
            })
        }
    }
}
```

apis/test.js 中的 `test200` 被封装成了 Promise 对象，因此在调用的时候使用 then 。[Promise 对象是什么？(opens new window)](https://es6.ruanyifeng.com/#docs/promise)

## 全局参数配置



在项目定稿后，我们需要在 pages.json 修改 globalStyle 配置应用的状态栏、导航条、标题、窗口背景色等。

```text
/* pages.json */

"globalStyle": {
    "navigationBarTextStyle": "white",     // 导航栏标题颜色及状态栏前景颜色，仅支持 black/white
    "navigationBarTitleText": "Uniapp Music",   // 导航栏标题文字内容
    "navigationBarBackgroundColor": "#F8F8F8",  // 导航栏背景颜色（同状态栏背景色）
    "backgroundColor": "#F8F8F8" // 窗口的背景色
}
```

## 小结



1. 确定开发需求和技术框架选型；
2. 根据框架特点选用处理单位，文件的统一管理有助于团队的协同开发；
3. 为了更好的管理开发项目，项目使用的文件基本都是经过了必要的处理与封装；
4. 本节确定 store 存储，api 与请求管理，图标与图片的存放，全局基础参数配置；
5. 整个完成项目搭建好之后，基本就是依葫芦画瓢的工作了（添加文件，开发细节）；
6. 本章代码 [uni-course-base (opens new window)](https://github.com/front-end-class/uniapp-music-code/blob/master/uni-course-base.zip)。



## 实战2—路由配置，导航栏添加配置

上一节主要讲解了如何架构项目，对文件统一管理等，本节来讲应用中基本功能，路由的配置与导航栏添加。

## 注册添加首页



在设备改变路由的时候，在不同路由会渲染成不同的内容，在 Uniapp 中所有页面的路由全部由框架进行管理，即 pages.json 管理配置。 pages.json 文件中不仅可以管理路由而且可以对 Uniapp 进行全局配置，决定页面文件的路径、窗口样式、原生的导航栏、底部的原生 tabbar 等。

![image-20210215153917311](https://img-repo.poetries.top/images/image-20210215153917311.png)

对于 Uniapp 中的每个页面，都需要在页面对应的 pages.json 文件中进行注册，才可以在访问路径中访问到该页面的数据。

可以使用编辑器注册一个页面，鼠标悬浮在左侧项目管理器那一栏，然后鼠标定位在 pages，右击鼠标：

![image-20210215153929153](https://img-repo.poetries.top/images/image-20210215153929153.png)

基础页面的代码结构如下：

```text
<template>
    <view>
        
    </view>
</template>

<script>
    export default {
        data() {
            return {
                
            };
        }
    }
</script>

<style lang="scss">

</style>
```

然后在 pages.json 中 pages 添加一项：

```text
"pages": [
    {
        "path": "pages/index/index",
        "style": {
            "navigationBarTitleText": "发现",  // 状态栏标题，覆盖掉 globalStyle 中设置的标题
        }
    },

// ...
```

`path` 指定的是页面路径，Uniapp 会根据这个路径加载处理 vue 页面，对 vue 文件的 template，script，style 进行编译处理。

注意：

- pages 节点的第一项为应用入口页（即首页）
- 应用中新增/减少页面，都需要对 pages 数组进行修改
- 文件名不需要写后缀，框架会自动寻找路径下的页面资源

`style` 指定的是页面窗口表现，比如每个页面的状态栏、导航条、标题、窗口背景色等，页面中配置项会覆盖 globalStyle 中相同的配置项。开发这个音乐应用并不需要过多的页面特殊处理，保持原有的设置即可。

然后在浏览器即可查看这个页面 https://localhost:8080/#/pages/index/index，Uniapp 默认端口为 8080，Uniapp运行的时候会检测本机 8080 端口是否被占用，如果占用就会启用 8081 端口，其次类推。当然你可以自行设置端口，【manifest.json】>>【H5配置】>>【端口】：

![image-20210215153944290](https://img-repo.poetries.top/images/image-20210215153944290.png)

## 配置导航栏



![img](https://img-repo.poetries.top/images/16f368a90d73df90.png)

我们需要实现这样一个页面，查看导航栏可以了解到该应用至少需要5个页面，需要先注册5个页面，根据上面的方式在 pages 文件夹新建注册其他页面:

```text
┌─pages               
│  ├─index           // 首页
│  │  └─index.vue    
│  └─video           // 视频
│  │  └─index.vue    
│  └─mine            // 我的
│     └─index.vue
│  └─cloud           // 云村
│     └─index.vue
│  └─account         // 账号
│     └─index.vue
├─static             
├─main.js       
├─App.vue          
├─manifest.json  
└─pages.json  
```

并在 pages.json 设置 `pages`，`tabBar`:

```text
"pages": [{ //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
        "path": "pages/index/index",
        "style": {
            "navigationBarTitleText": "发现"
        }
    }, {
        "path": "pages/video/index",
        "style": {
            "navigationBarTitleText": "视频"
        }
    }, {
        "path": "pages/mine/index",
        "style": {
            "navigationBarTitleText": "我的"
        }
    }, {
        "path": "pages/cloud/index",
        "style": {
            "navigationBarTitleText": "云村"
        }
    }, {
        "path": "pages/account/index",
        "style": {
            "navigationBarTitleText": "账号"
        }
    }
],
"tabBar": {
    "color": "#888",
    "selectedColor": "#ff2419",
    "borderStyle": "white",
    "backgroundColor": "#f9f9f9",
    "list": [{
        "pagePath": "pages/index/index",
        "iconPath": "static/tab/t_1.png",
        "selectedIconPath": "static/tab/t_11.png",
        "text": "发现"
    }, {
        "pagePath": "pages/video/index",
        "iconPath": "static/tab/t_2.png",
        "selectedIconPath": "static/tab/t_21.png",
        "text": "视频"
    }, {
        "pagePath": "pages/mine/index",
        "iconPath": "static/tab/t_3.png",
        "selectedIconPath": "static/tab/t_31.png",
        "text": "我的"
    }, {
        "pagePath": "pages/cloud/index",
        "iconPath": "static/tab/t_4.png",
        "selectedIconPath": "static/tab/t_41.png",
        "text": "云村"
    }, {
        "pagePath": "pages/account/index",
        "iconPath": "static/tab/t_5.png",
        "selectedIconPath": "static/tab/t_51.png",
        "text": "账号"
    }]
}
```

代码中的 `tabBar` 的 `list` 对象包含底下导航的5个路由页面，初始化的图标风格等，这样就可以实现底部导航栏的设置。

注意：

1. tabBar 的图标是不支持网络图片，不支持字体图标的，需要放在 static 静态目录里面
2. 路径图标不超过5个，代码跳转到 tabbar 页面，api 只能使用 uni.switchTab
3. 导航栏在不同端有不同展示形式，需要处理兼容问题
4. 如果有多端需求，必需真机模拟查看效果，浏览器模拟工具可能没那么准确
5. pagePath 页面路径，必须在 pages 中先定义

注意: 小程序导航栏只能是以静态图标出现，以及整齐的样式出现，如果需要动态图标或者自定义导航栏（中间凸起），需自行引入自定义组件去更改; Uniapp 是集成了各个框架的特性进行开发设计的(小程序不支持导航动态图标)，如果需要多端保持一致，就要有所取舍，产品设计保持一个平衡点，因此设计之初的时候需要权衡框架的特性。

使用 HBuilderX 编译器的一个好处是，可以随时在编译器正下方的控制台终端看见编译 bug 问题，可以直接定位问题。比如下方出现的报错可以直接知道页面没有注册建立成功还是没有对应好路径：

![image-20210215154022419](https://img-repo.poetries.top/images/image-20210215154022419.png)

根据提示做好修改即可，在编译保存（按下ctrl + S）的时候，界面会同时编译，形成热更新可视化，开发就变得便利快捷。

设置导航栏的背景颜色，图片等，即可实现一个简单的应用。

![image-20210215154035641](https://img-repo.poetries.top/images/image-20210215154035641.png)

然后补充一下导航栏图标即可：

![image-20210215154049066](https://img-repo.poetries.top/images/image-20210215154049066.png)

然后再进行切图补充页面内容。

## 小结



1. pages.json 文件用来对 Uniapp 进行全局配置，决定页面文件的路径、窗口样式、原生的导航栏、底部的原生 tabbar 等；
2. 可以使用编译器新增注册页面，简单方便；
3. 随时打开控制台是一个很好的习惯，让你可以快捷的发现问题，根据错误提示直接定位问题；
4. 本章代码 [uni-course-router (opens new window)](https://github.com/front-end-class/uniapp-music-code/blob/master/uni-course-router.zip)。



# 实战3—导航一 发现的页面开发

本章正式进入项目页面开发环节，将带大家完整的实现项目中的首页，涵括的功能点包含组件拆分、导航栏引入、banner 轮播、跳转等难点的讲解。

## 去除顶部标题栏



首先看页面布局，页面部分可以分为2个小块：轮播图，歌单滑动等小块。

![img](https://img-repo.poetries.top/images/16f3690afa3ee12a.png)

以上图作为 UI 设计稿，我们需要做的是完善页面内容，开发代码以上一节的架构代码为基础，调试以浏览器为优先。

Uniapp 默认情况下在 h5 端的是有 title 标题栏的，如果需要去掉就要在配置文件进行设置，这是未改之前的图片：

![img](https://img-repo.poetries.top/images/16f369b535843041.png)

当前开发的音乐应用是不需要标题栏的，找到项目的根目录下的 pages.json 文件，添加一下内容，可以去掉对应页面的导航栏，设置 app-plus 的 `titleNView` 为 `false` 即可；

```text
/* pages.json */

"pages": [
    {
     "path": "pages/index/index",
        "style": {
            "navigationBarTitleText": "发现",
            "app-plus":{
                "titleNView": false
            }
        }
    }
]
```

而且作为首页（启动的第一个页面），这个页面需要在 pages 数组中放在第一位，项目在启动的时候就会以此作为第一个启动页。

## 首页 banner 轮播（swiper组件使用）



![image-20210215154223903](https://img-repo.poetries.top/images/image-20210215154223903.png)

这样的 banner 轮播图交互可以选择 swiper 组件来完成，配置[查看 (opens new window)](https://uniapp.dcloud.io/component/swiper)，代码：

```text
<swiper class="swiper">
    <swiper-item>
        <view class="swiper-item">包含的内容</view>
    </swiper-item>
</swiper>
```

Uniapp 的 swiper 组件为滑块视图容器，可以用于左右滑动或上下滑动，比如 banner 轮播图。注意是滑动切换而不是滚动。swiper 下的每个 swiper-item 是一个滑动切换区域，不能停留在2个滑动区域之间。这样的交互效果完美契合了我们要完成的轮播图。

由 swiper 包裹 item 组件，swiper 接受配置参数，完成轮播的特效，我们要实现滑动动画时长300毫秒(`duration="300"`)，显示面板指示点（轮播图中间的导航小点）(`indicator-dots="true"`)，自动播放轮播图(`autoplay="true"`)，当前选中的指示点颜色为黑色(`indicator-active-color="#000"`)的设定：

```text
<swiper class="swiper" indicator-dots="true"  indicator-active-color="#000" autoplay="true" interval="interval" >
    <swiper-item>
        <view class="swiper-item uni-bg-red">A</view>
    </swiper-item>
</swiper>
```

我们实现的是需要有圆角的 banner 轮播图，对每个 item 项目设置样式即可。

我们只是书写了样式，怎么让数据对应呢？

## 完成数据请求与数据绑定



跟后台交互的时候，我们需要请求后台数据，Uniapp 有自己封装好的[api (opens new window)](https://uniapp.dcloud.io/api/request/request)，通俗易通，跟 jQuery 的 ajax 基本类似，依葫芦画瓢的就行，在 success 前面，是请求完成的回调，比如我会在请求前做一个 loading（菊花）状态呈现在页面，在请求完成后再把 loading 隐藏掉，这个也算是用户体验的一种，让用户预感到一个交互状态在进行中，心里有个预期感，如果网络不好的情况下，这样的作用会显得尤为重要，[文档查看 (opens new window)](https://uniapp.dcloud.io/api/request/request)。

```text
uni.request({
    url: 'https://localhost:3000/personalized',
    method: 'GET',
    header:{},
    data: {},
    success: res => {   // 请求成功的状态
    },
    fail: () => {  // 失败
    },
    complete: () => {   // 接口调用结束的回调函数（调用成功、失败都会执行）
    }
});
```

根据上面代码，我们可以引用到首页开发页面中去，并实现一个请求轮播图数据并伴有状态（loading）小动画，来完成轮播图数据的交互，并在页面 `onLoad` 后调用这个方法：

```text
/* pages/index/index.vue */
// ...
data () {
    return {
        swiper: [],
        loading: false
    }
},
onLoad() {
    this.getBanner()
},
methods: {
    // 获取轮播图
    getBanner() {
        // 正在加载状态
        this.loading = true
        uni.request({
            url: 'https://localhost:3000/banner',
            method: 'GET',
            data: {},
            success: res => {
                this.swiper = res.data.banners
            },
            complete: () => {
                // 加载完成状态
                this.loading = false
            }
        });
    }
}

// ...
```

关于请求的报错，加载 loading 等，都封装在了项目的 request 工具中。因此我们改为 api 的方法来完成请求，在 apis 文件夹中新增 index.js：

```text
/* apis/index.js */

import request from '@/utils/request/index.js'

export function apiGetBanner(data) {
    return request.request({
        url: '/banner',
        method: 'GET',
        data: data,
        authType: 'None'
    })
}
```

注意： @ 代表的是开发目录，这是路径别名。

```text
/* pages/index/index.vue */

import { apiGetBanner } from '@/apis/index.js';

// ...
data () {
    return {
        swiper: [],
    }
},
onLoad() {
    this.getBanner()
},
methods: {
    // 获取轮播图
    getBanner() {
        apiGetBanner().then(res => {
            this.swiper = res.banners
        })
    },
}

// ...
```

数据可以直接赋值到 model 中的 data 里面，视图 template 直接对应即可：

```text
<view class="banner">
    <swiper class="swiper" :autoplay="true" :indicator-dots="true" indicator-active-color="#ff372b"
     indicator-color='rgba(255,255,255, .5)' duration="500" :circular="true">
        <swiper-item v-for="(item,index) in swiper" :key="index">
            <view class="item">
                <image :src="item.imageUrl" class="img"></image>
                <view class="tag">{{item.typeTitle}}</view>
            </view>
        </swiper-item>
    </swiper>
</view>
```

Uniapp 处理了小程序 `this.setData({})` 数据赋值方式，我们可以直接使用 `this.swiper = res.banners` 进行赋值，如果原有的小程序项目需要更改这种赋值方式，或者更改重写 setData 方法：

```text
setData: function (obj) {    
    let that = this;    
    let keys = [];    
    let val,data;    
    Object.keys(obj).forEach(function (key) {    
      keys = key.split('.');    
      val = obj[key];    
      data = that.$data;    
      keys.forEach(function (key2, index) {    
          if (index+1 == keys.length) {    
              that.$set(data,key2,val);    
          } else {    
              if (!data[key2]) {    
                 that.$set(data,key2,{});    
              }    
          }    
          data = data[key2];    
      })    
    });    
}  
```

更多微信小程序转换 Uniapp 详细指南、小程序转 Uniapp 转换器、wepy 转 Uniapp 需求可以对照，前往[ask.dcloud.net.cn/article/357…(opens new window)](https://ask.dcloud.net.cn/article/35786)

## 主入口的代码实现



![image-20210215154241419](https://img-repo.poetries.top/images/image-20210215154241419.png)

这一块的开发看起来相对简单，实际上处理起来可以以更优雅的方式来处理（这一块由于接口的限制也做进一步的说明）。

主入口有五个（包含文字与图标），这些内容都是动态的，不可能把内容直接写死在代码上，在实际业务下需要读取接口。其实前端在实际开发的时候就需要对产品原型有一定了解与前瞻性，哪些是可变的，哪些是不变的，都心里有个底。

在项目准备之初，就已经搭建好整个项目的基本架构（考虑好基本开发），全局样式的引入，通用 js 方法，全局变量等等。这些都是为了更快捷方便的开发整个项目，现在就是使用的时候了。

我把这一块拿出来说，因为大部分开发人员注重 js 逻辑层的书写，往往忽略了基础的 css。往下看，你就会了解到前端 css 显得像利刃一样，开发来的简便快捷一些。像这样等分排列样式，可以用 flex 伸缩盒进行书写构建：

我已经在 common.scss 定义了样式类名 `flex-box`, `flex-item`:

```text
<!-- common/css/common.scss -->
.flex-box{
    display:flex;
    .flex-item{
        flex:1;
    }
}
```

书写页面代码的时候可以直接对应元素搭建 dom 样式:

```text
<view class="main-bar flex-box">
    <view class="flex-item" v-for="(item, index) in contentBar" :key="index">
        <image :src="'/static/image/index/t_' + (index + 1) + '.png'" class="img"></image>
        <view>{{item.name}}</view>
        <view v-if="index == 0" class="date">{{curDate}}</view>
    </view>
</view>
// data数据
// ...

contentBar: [
    { name: "每日推荐" },
    { name: "歌单" },
    { name: "排行榜" },
    { name: "电台" },
    { name: "直播" }
],
```

上面的代码可以基本的实现样式等比排列，你会看到：

![image-20210215154257832](https://img-repo.poetries.top/images/image-20210215154257832.png)

你可能心里在骂“弄了半天，怎么还是这样？”

其实你可以看上面的截图，你就会了解，图片并不像我们以前开发的那个样式呈现。原因在于 Uniapp 的框架中，图片 `image`元素是一个组件，在渲染到设备上会自带一个样式（`<image>` 组件默认宽度 300px、高度 225px），这样会撑破你的样式盒子。

在 css 命名上，没有使用复杂的，庸长的，或者难懂的名字。这一块（主入口）代码，可以外层父级元素命名 `main-bar`，里面的图片元素最顶层且颗粒度最小的元素可以命名为 `img`：

```text
.main-bar {
    padding-bottom:22rpx;
    text-align: center;
    line-height: 70rpx;
    color:#666;
    border-bottom:1rpx solid #e6e6e6;
    .img {
        display: block;
        width: 92rpx;
        height: 92rpx;
        margin: 0 auto;
    }
}
```

上面简单的几行就可以实现效果，标题文字的行高和排列由最外层父级决定（`line-height`，`text-align`会继承）。可能你会想起以前自己写的代码：

```text
<!-- no good -->
.main-bar {
    margin-top: 38rpx;
    text-align: center;
    line-height: 66rpx;
    .main-bar-img {
        display: block;
        width: 124rpx;
        height: 60rpx;
        margin: 0 auto;
        line-height: 1;
    }
    .main-bar-name{
        text-align: center;
        line-height: 66rpx;
    }
}
```

上面的代码在命名上是重复性的，以及不必要的，样式也是。在命名上最外层块的父级其实已经包含了基本的样式，也定义了属于那一块，里面的子元素就不用再去重复叠加命名了。在其他代码块也一样设定，如果想了解更多命名规范可以在网上查找 BEM，这些会让你感觉到 css 也是一把利刃。😃

```text
<view v-if="index === 0" class="date">{{curDate}}</view>
```

上面的这句是每日推荐对应的日期，`v-if="index === 0"` 列表索引的第一个 item 才生效。

## 使用自定义组件完成歌单



在代码书写中，大家都会把共用的方法抽出来，共用的变量抽出来进行变量共享。

记得我在前面说过，在软件开发里，有些通用的思想，比如隔离变化，约定优于配置等，隔离变化就是说做好抽象，把一些容易变化的地方找到共性，隔离出来，不要去影响其他的代码。这在开发里面以功能细分称为模块，以组成细分称为组件。一台电脑由主机，显示器，键盘，鼠标组成，细分为几个模块；单个鼠标由滚轮，外壳，内芯组成。

根据上面的思想，那么推荐歌单，达人歌单，最新专辑三个模块的共有的有主标题，链接更多，歌单数据（图片，内容文字等），那么我们就可以把想要的组件基本的抽离。

分析组件：

1. 建立组件的模板，先把架子搭起来，命名约定，组件样式，考虑好组件的基本逻辑。
2. 组件的数据输入，即定好 props 里面的数据类型。
3. 组件的数据输出，即对外暴露出来的方法和数据。

在 components 文件夹创建 songList.vue 文件:

```text
<template>
    <view class="song-list-comp">
        <view class="tit-bar">
            {{title}}
            <navigator :url="link" class="more fr">歌单广场</navigator>
        </view>
        <view class="clearfix">
            <view class="item" v-for="(item, index) in list" :key="index">
                <image class="img" :src="item.picUrl + $imgSuffix"></image>
                <view class="desc">{{item.name}}</view>
                <view class="count"> {{ item.playCount}}</view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        // 从父组件传值的 共有的有主标题，链接更多，歌单数据
        props:{
            title: {
                type: String,
                default: ''
            },
            link:{
                type:String,
                default:''
            },
            list:{
                type: Array,
                default () {  // 这里返回值需要是一个函数
                    return []
                }
            }
        },
        data() {
        },
        methods:{
        }
    }
</script>
<style lang="scss" scoped>
.song-list-comp {
        padding-left: 32rpx;
        margin-top:10rpx;
        .tit-bar {
            font-size: 34rpx;
            font-weight: 600;
            line-height: 110rpx;
        }

        .more {
            width:150rpx;
            height:50rpx;
            line-height:50rpx;
            text-align: center;
            margin-top: 30rpx;
            margin-right: 32rpx;
            font-weight: 400;
            font-size: 24rpx;
            border: 2rpx solid #e6e6e6;
            border-radius: 50rpx;
        }

        .item {
            float:left;
            position: relative;
            width: 216rpx;
            padding-bottom:16rpx;
            margin-right: 16rpx;
            line-height: 34rpx;
            &.video{
                width: 450rpx;
            }
            .img {
                display: block;
                width: 100%;
                height: 216rpx;
                margin-bottom: 16rpx;
                background: #eee;
                border-radius: 10rpx;
            }
            .desc{
                height:64rpx;
                margin-top:12rpx;
                line-height: 30rpx;
            }
            .count{
                position:absolute;
                top:0;
                right:0;
                padding-left:25rpx;
                line-height: 34rpx;
                color:#fff;
                font-size: 24rpx;
                z-index: 10;
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAqFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8j1z1tAAAAN3RSTlMA9wcC+/3w4A/RoQv0m4s6IBkU7eeRK73kxaZtW+rc1cmxe3UmwbiWQNmqgWZUzUY1ME4dhmGuJ2Z0kQAABVtJREFUeNrtnYtWGkEQRFsEeSmgII8EVBASUFHx1f//ZwmJRwaZYhndjdU5c//gQp8DVTvTK5FIJBKJRCKRSCQSiUQikcj/yWI6vRfzNEYz/U23NhbLlF70jZ7hr+W+pQ6FoxOxyXhP12neiEVyZd3gdiH2uFYfP0tijP2mehk8iy3miui1xRLfFHNaFTv0dAutvpihq1uZmPmp1yRqRuZLVxyol+5cLOB+9nMwZ52G8OOKSLWWVx97TzlhZ01EZDxRL8UHIcf92ZAl/ZZ6+UE+XxsiUjoF8zWinq9NEZH2BZivO+HFJyLyPFAvL4/Cil9ESkcF9XFIO19ARGRRVi9ndaHEDVPvksp38FP/7VgIQSJLTirq5fByX+jAIkvq5+rlnG++tovI/uWheqmwlUZAZMXxlXo5+M41X0DEZXqmXspUpaSuOBJAbrTq8GhLSSzi8jjUv/CWkusimLui/oa4lNxVRHLXYL5ISkmPCKLRYS4lPSIYFOovCEpJXVGRJGCoz59++XwBEci4R1pKIhFMv0VZegeL4FCfDyklGUSWoZ6vlAQiSTw32UpJN/lJMm6o5yolkUgy92WqUjJcxA31RKXkJ0RwqN+7TpwvLpFlqGcpJYNEQkL9MOtSEotcSRIo1DOU3kEigaH+bCoQShEY6vUKlpKcIjDU41IyS5EXSSY81M/q4oNXBIR6VHoTi4BQD0pJahEQ6kHpnZ3IUAIIDPWF96U3u8hGqEelJL/IWqjHpaQFERjqC0er0siECAj12c6Xm4ckRW6a20tJMyKvoR6WknZEcKgf9EXEkggO9b22LREY6pelpC0RHOq7fWMiONRPxlmJdCQLcKjPP1VtieBQX5wbE8GhvtOwJbIM9bCUtCWCQ33xzpgIDvWVXLoiE8macQck4YYxERjqy/vWRFCofzInItKeqIdxiiI9yRwc6msWRXyhfmBSxBfqFzZFNkP9g1UROVkP9TfpiVzIv6VRVodLqyLv/7D0jYps/IW8Nyni+VNfNSjii1kVSU/kVjIHB9+6ORF/FTEUYyKgHBqUjIlMZ+rjcCppipQlY47BOoNyQ0yJoEq7JmJJpH4Om1NLIieVAjzAbUgEPSjJn1YlA5FzyYj7Mn6eaEhkmTvQtRNLIjdNeBHIksjiFp+CyExkJmlT+lmA5wYsiTwP8PVFQyLti20XSs2IVE/zGZ+mwyJnkh79VsKlaxsi40niiUALIug44IF7BtiAyLyb7anZZJGipECjs9s5ZnKR3NPejifLuUUeimDBzeZUMYs0fgQ8SOcVAU/R0X2YLEW66ZXSyTfgSEUeh19+JxGIhJbSX39L1G00PlxKM9zbBSIhpTTHTWogElBKk9xt/5xIfUazAtXtZ8JLaaL9D64IX334L0Tq51w7LNySJqyUJttaA0QSp4pujxAWCS+lb9vydbiZeudSmnHXVrDITZNz+1mgyOKWdR8dEIGlNO2GwBCR5wHxzka36kgopXvUWzRdEapSOiORfot906ybTINL6RnHVHlEUCltYFtussi8++WrQtIQaXQIlreEinhLaYZ1OoEi+Z1L6R+EW9ehCC6lzyjfs4BElqU0zRKwQJHCeinNUB9+VgSX0rxvh/GJ5EagPnwifl+POryV0jT14WdEjq+I6sMPilCV0p8R2Zf6jKs+/KAIKqUH5FO1IXKght+NqCt4F3fvwtu3QL+qP4GybqFwZGKq/jBUTJnldQO78F1VbbxgJIHSHpgqivowhIp/qoiKnh05aZqfqlceiOvDMC51jRlb0bM79RZrfRhKqXb46lExOlVv5O5G19ejB/bQEYlEIpFIJBLJkF8r2nFUwcJuMQAAAABJRU5ErkJggg==) no-repeat;
                background-size: 25rpx 25rpx;
                transform: scale(0.8);
            }
        }
    }
</style>
```

这样我们在首页 /pages/index/index.vue 就可以引用这个组件了

```text
<!-- /pages/index/index.vue -->
<template>
    <view>
        <songList title="推荐歌单" link="test?id=123" :list="recommendSongs"/>
    </view>
</template>
<script>
    // 定义为 songList，需要在components注册一下
    import songList from '../../components/songList'

    export default {
        components: {
            songList     // 此处 songList:songList，es6中同名键值可以简写
        },
        data() {}
        // ...
    }
</script>
```

![image-20210215154319990](https://img-repo.poetries.top/images/image-20210215154319990.png)

你会看到推荐歌单会渲染两个，一个是由组件渲染，另一个则是页面代码渲染。上面只是一个示例与组件实现思想，其实接口字段不完全相同的，如果需要完全共用，就需要重新修改数据字段，这样就可以完全的使用通用组件了。

## 实现 tab 切换加载不同数据



![image-20210215154333718](https://img-repo.poetries.top/images/image-20210215154333718.png)

点击 tab 切换加载不同数据，并且选中的 tab 样式进行突出设置，未选中保持平常样式。

```text
<!-- 歌单分类块 -->
<view class="song-list">
    <view class="switch-line flex-box">
        <view class="flex-box">
            <view class="switch-item" :class="{on : newType == 1}" @click="switchTab(1)">新碟</view>|
            <view class="switch-item" :class="{on : newType == 2}" @click="switchTab(2)">新歌</view>
        </view>
        <template v-if="newType == 1">
            <view class="more">更多新碟</view>
        </template>
        <template v-if="newType == 2">
            <view class="more">新歌推荐</view>
        </template>
    </view>
    <scroll-view class="scroll-view" scroll-x>
        <view class="item" v-for="(item, index) in latestAlbum" :key="index">
            <image class="img" :src="item.picUrl + $imgSuffix"></image>
            <view class="desc ellipsis">{{item.name}}</view>
            <view class="desc ellipsis c9">{{item.artist.name}}</view>
        </view>
    </scroll-view>
</view>
// 切换新碟新歌
switchTab (type) {
    this.newType = type
    // 根据类型加载不同数据
    if (type == 1) {
        // 新碟数据
    }
    if (type == 2) {
        // 新歌数据
    }
},
```

在元素 `@click="switchTab(1)"` 事件的点击触发，传值 1 ，修改了 `newType` 的值为 1，传给 :class 一个对象，以动态地切换 class：

```text
<view class="switch-item" :class="{on : newType == 1}">新碟</view>
```

上面的语法表示 on 这个 class 存在与否将取决于数据属性 newType 是否等于 1。如果等于 1，class 的值将会添加 on，结果渲染为：

```text
<view class="switch-item on">新碟</view>
```

这样实现互斥样式的改变，取决于点击改变 newType 的值。切换不同数据也是一样的原理。

## 其他处理



当前页开发设计中去掉了导航栏，当页面配置 navigationStyle 设置为 custom 的时候可以使用此组件替代原生导航栏，在 pages.json:

```text
"globalStyle": {
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "Uniapp Music",
    "navigationBarBackgroundColor": "#F8F8F8",
    "backgroundColor": "#F8F8F8",
    "navigationStyle": "custom"
}
```

当前首页在小程序端显示下并没有导航栏，页面内容直接从设备顶部屏幕暂时，会出现运营商展示栏遮盖页面内容的问题，我们需要对小程序端差异化处理。对小程序添加一个顶部间隔：

![image-20210215154349904](https://img-repo.poetries.top/images/image-20210215154349904.png)

// 平台差异化处理的代码可以放在底部，这样有利于集中管理

```text
/* #ifdef MP-WEIXIN */
.banner{
    margin-top:60rpx;
}
/* #endif */
```

小结：

1. 导航栏和标题栏都可以在 pages.json 设置，掌握多端的特性，可以做出多样化的应用；
2. 尽量使用框架的组件，可以提高开发效率，可以在 [插件市场 (opens new window)](https://ext.dcloud.net.cn/)查找想要的功能；
3. 良好的命名习惯能让你的开发质量提升一个档次；
4. 不同端差异化集中处理，不仅有利于管理，还可以一目了然。
5. 本章代码 [uni-course-实战开发发现页 (opens new window)](https://github.com/front-end-class/uniapp-music-code/blob/master/uni-course-实战开发发现页.zip)。



## 实战4—导航二 视频的开发页面

本节主要讲解 scroll-view 在页面上的使用，长列表的渲染。

## scroll-view 滑动效果实现头部导航栏



![image-20210215154450634](https://img-repo.poetries.top/images/image-20210215154450634.png)

导航的滑动区域需要实现左右滑动效果，左右滑动这个在信息资讯设计下很常见，可以选用 Uniapp 中基础组件 `scroll-view` 容器，在遇到与左右或者上下互动局部内容的时候，可以考虑组件 `scroll-view`，配置查看[scroll-view (opens new window)](https://uniapp.dcloud.io/component/scroll-view)，示例代码：

```text
<scroll-view class="scroll-view" scroll-x="true" scroll-left="120">
    <view class="item uni-bg-red">A</view>
    <view class="item uni-bg-green">B</view>
    <view class="item uni-bg-blue">C</view>
</scroll-view>
```

在方位x轴上进行参数设置，即设置 `scroll-x="true"`，即可实现，左右滑动，一切就是那么简单...

但是当你以为一切就这样搞定的时候，可是并没有左右排列，肿么办？

![image-20210215154502950](https://img-repo.poetries.top/images/image-20210215154502950.png)

其实是关于 scroll-view 失效的问题，复制官方代码代码后会发现 scroll-view 横向滚共不生效，其实是没有设置好样式，将 scroll-view 容器设置宽度，并设置 white-space: nowrap; scroll-view 容器的每一项都设置宽度和 `display:inline-block`：

```text
.scroll-view {
    width: 100%;
    white-space: nowrap;
    .item {
        position: relative;
        display: inline-block;
        width: 218rpx;
        padding-bottom:16rpx;
        margin-right: 16rpx;
        line-height: 34rpx;
    }
}
```

## 通过绑定 class/style 实现active滑块



![image-20210215154517129](https://img-repo.poetries.top/images/image-20210215154517129.png)

这块的交互是点击触发实现滑块滑动至被触发的项，以及被触发的项实现样式切换。

```text
<scroll-view class="scroll-view" scroll-x>
    <view class="item" v-for="(item, index) in navList" :class="{active: curNav == item.id}" :key="item.id" @click="switchNav(item.id, index)">
        <view class="desc">{{item.name}}</view>
    </view>
    <view class="slide" :style="'width: '+ sliderWidth +'rpx;transform: translateX('+ sliderOffset +'rpx)'"></view>
</scroll-view>
// 导航切换
switchNav(id, index) {
    this.curNav = id
    this.sliderWidth = index == 1 ? 140 : 60;

    this.sliderOffset = 126 * index + (index > 1 ? 80 : 16) + (index == 0 && 16);
    // 加载数据
    this.getRelatedVideo(id)
}
.scroll-view {  
    position: fixed;
    top: 0;
    width: 100%;
    white-space: nowrap;
    text-align: center;
    line-height: 86rpx;
    color: #333;
    .item {
        position: relative;
        display: inline-block;
        min-width: 126rpx;
        padding: 0 20rpx;
        line-height: 34rpx;
        padding-bottom: 16rpx;
        <!-- 触发项样式 -->
        &.active{
            color:#f32628;
        }
    }
}
<!-- 滑块样式 -->
.slide {
    position: absolute;
    width: 60rpx;
    height: 4rpx;
    left: 0;
    bottom: 0rpx;
    background: #f32628;
    transition: transform 0.3s;
}
```

触发项的样式由 `:class="{active: curNav == item.id}"` 判定，active 这个 class 存在与否将取决于数据属性 curNav 是否等于为当前触发项的 id。class 的值将会添加 on，结果渲染为：

```text
<view class="item active"></view>
```

对应上类名 active 的样式即可实现触发项样式的切换。

底部滑块的动画需设置 `transition: transform 0.3s;` 样式，只要改变 transform 属性值 translateX 即可实现左右动画。关键在于样式的绑定改变：

```text
<view class="slide" :style="'width: '+ sliderWidth +'rpx;transform: translateX('+ sliderOffset +'rpx)'"></view>
// 导航切换
switchNav(id, index) {
    this.curNav = id
    this.sliderWidth = index == 1 ? 140 : 60;

    this.sliderOffset = 126 * index + (index > 1 ? 80 : 16) + (index == 0 && 16);
    // 
    this.getRelatedVideo(id)
}
```

点击导航判定触发项的索引，计算出滑块偏移位置 translateX 的值即可。与 `:class="{active: curNav == item.id}"` 不同的是，`:style` 由拼接字符决定整个值。

## 长列表 list 的渲染



![img](https://img-repo.poetries.top/images/16f3743ed6f051a0.png)

长列表的数据直接是请求后台列表数据，再用 v-for 循环遍历渲染到页面上：

```text
<view class="video-list">
    <view class="video-item" v-for="item in relatedVideo">
        <view class="video-wrap">
            <image class="img" :src="item.coverUrl + $imgSuffix"></image>
            <view class="desc ellipsis">{{item.title}}</view>
            <view class="creater-bar flex-box">
                <view class="avactor-box flex-box">
                    <image class="avactor" src=""></image>
                    <view class="name">{{item.creator[0].userName}}</view>
                </view>
                <view class="more">
                    <view class="iconfont">&#xe60f;</view>
                </view>
            </view>
        </view>
    </view>
</view>
import { apiGetRelatedVideo } from '@/apis/index.js';
export default {
    data() {
        return {
            relatedVideo: [],
        };
    },
    methods: {
        // 获取相关视频
        getRelatedVideo(id) {
            this.curNav = id
            const params = {
                id
            }
            apiGetRelatedVideo(params).then(res => {
                this.relatedVideo = res.data
            })
        },
    }
}
```

列表项有个更多的三点图标（上图箭头所指）是由 iconfont 渲染而成，只要在 iconfont 项目库中加入这个图标并在 Uniapp 项目引入直接可以使用：

```text
<view class="iconfont">&#xe60f;</view>
```

提示：关于 Uniapp 项目如何引入 iconfont 的操作，可查看基础课程《使用 iconfont 作为整站图标》章节。

## 列表处理下拉更新，上拉加载



移动端长列表浏览是一个非常常见的浏览交互，用户可以下拉刷新当前第一页的数据，也可以滑动到底部（上拉）无限加载数据。在 Uniapp 项目中一般使用 `scroll-view` 可滚动视图区域组件实现多端下的浏览。`scroll-view` 可以轻松解决滚动到顶部/底部的事件处理。

但是用 `scroll-view` 处理长列表很容易引发性能问题，不仅要判断偏移位置，而且要响应交互回调，我们在处理复杂多变的功能时，可以在官方[插件市场 (opens new window)](https://ext.dcloud.net.cn/)寻找适合功能的插件，通过示例改成适用自己项目的功能。关于[下拉刷新上拉加载组件 (opens new window)](https://ext.dcloud.net.cn/plugin?id=343)，我这选用了一个插件 [mescroll (opens new window)](https://github.com/mescroll/mescroll)，比较合适当前有导航栏和长列表组成的页面。

相关代码：

```text
<!-- top="86" 向下偏移导航栏的高度 -->
<mescroll-uni top="86" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback">
    <view class="video-list">
        <view class="video-item" v-for="(item, index) in relatedVideo" :key="index">
            <view class="video-wrap">
                <image class="img" :src="item.coverUrl + $imgSuffix"></image>
                <view class="desc ellipsis">{{item.title}}</view>
                <view class="creater-bar flex-box">
                    <view class="avactor-box flex-box">
                        <image class="avactor" src=""></image>
                        <view class="name">{{item.creator[0].userName}}</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</mescroll-uni>
// ...
data() {
    return {
        // 下拉刷新的常用配置
        downOption: {
            auto: false // 是否在初始化后,自动执行下拉回调callback; 默认true
        },
        // 上拉加载的常用配置
        upOption: {
            auto: false, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
            page: {
                num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
                size: 10 // 每页数据的数量,默认10
            },
        },
    }
},
methods: {
    // ...
    /*下拉刷新的回调 */
    downCallback(mescroll) {
        mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
    },
    /*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
    upCallback(mescroll) {
        //联网加载数据
        this.getList(mescroll.num, mescroll.size, (res) => {
            //设置列表数据
            if(mescroll.num == 1) this.relatedVideo = []; //如果是第一页需手动置空列表
            this.relatedVideo = this.relatedVideo.concat(res)
            // 后台接口有返回列表的总数据量 totalSize
            // mescroll.endBySize(10, 50); //必传参数(当前页的数据个数, totalSize总数据量)
            mescroll.endSuccess();
        }, () => {
            //联网失败的回调,隐藏下拉刷新的状态
            mescroll.endErr();
        })
    }
}
```

可以看到下图中下拉状态的交互样式。

在引用这个插件前，由于多端的差异化太大，需要对 pages.json 进行配置，只配置使用 mescroll-uni 的页面，可以解决取消 ios 回弹，避免和下拉刷新冲突等问题。

```text
"path": "pages/video/index",
"style": {
    "navigationBarTitleText": "视频",
    "app-plus":{
        "titleNView": false,
        "bounce" : "none", // 取消 ios 回弹，避免和下拉刷新冲突
        "disableScroll": true   // Android小程序卡顿
    }
}
```

页面初始化时，如果一次性向视图层传递大量的数据，使视图层一次性渲染大量节点，可能造成通讯变慢、页面切换卡顿，所以建议以局部更新页面的方式渲染页面。如：服务端分页；服务端返回100条数据，进行分批加载，一次加载50条，500ms 后进行下一次加载。

其实 scroll-view 不适合放长列表，有性能问题。长列表滚动和下拉刷新，应该使用原生导航栏搭配页面级的滚动和下拉刷新实现。包括在 app-nvue 页面，长列表应该使用 list 而不是 scroll-view。当前为了页面效果，权衡舍弃了页面级的滚动。

如果是在 app-nvue 下处理长列表，使用 list 组件的性能高于使用 view 或 scroll-view 的滚动。原因在于 list 在不可见部分的渲染资源回收有特殊的优化处理。`<list>` 组件是提供垂直列表功能的核心组件，拥有平滑的滚动和高效的内存管理，非常适合用于长列表的展示。**注意当前是 vue 项目，不是 app-nvue 项目**，因此未使用 list 完成长列表功能。

## 小结



1. scroll-view 的左右滑动需要样式设置，关键在于 `white-space: nowrap`；
2. 点击切换的常用功能通常操作元素的 class，传给 `:class` 一个对象，以动态地切换 class 值；
3. scroll-view 可以处理列表的下拉更新，上拉加载功能，可以找现成的功能插件完成开发。
4. 本章代码 [uni-course-实战开发视频页 (opens new window)](https://github.com/front-end-class/uniapp-music-code/blob/master/uni-course-实战开发视频页.zip)。



## 实战5—导航三 我的页面开发

![img](https://img-repo.poetries.top/images/16f3745c169f542a.png)

本节主要讲头部 + 页面布局，讲解添加头部标题栏基础功能。

## 头部 + 页面布局



从实战开发开始的两个页面都没有添加头部标题栏，只是把标题栏进行了取消。在项目的根目录下的 pages.json 文件，设置 app-plus 的 `titleNView` 为 `false` 即可；

```text
/* pages.json */
{
	"path": "pages/mine/index",
	"style": {
		"navigationBarTitleText": "我的",
		"app-plus":{
			"titleNView": false
		}
	}
},
```

视频页实际头部效果：

![image-20210215154648264](https://img-repo.poetries.top/images/image-20210215154648264.png)

这个页面的标题栏开发会相对容易一些，因此拿到这里来讲开发导航栏。

由于 h5 是运行在浏览器中的，我们并不能对标题栏进行样式设置，故在差异化下，H5 没有应用头部。但是在 app 我们是可以设置标题栏的，新版的小程序也开始支持标题栏的设置。我们的 Uniapp 项目并不是操作原生 app 组件，因此标题栏的设置可以说是 webview 的一个样式模拟。取消标题栏的是以手机状态栏（电池栏）开始自上而下排版的，这一块我们也要隔开。

看到开头的大图，图片上画的两个很明显的边框分为两块，头部与内容区。要想更接近 app 的原生效果，就要看页面的组成。我们在写页面的时候可以把导航栏固定，然后内容区用 scroll-view 组件撑开整个页面：

```text
<view>
	<view class="navbar">
		<!-- 这里是标题栏 -->
	</view>
	<scroll-view scroll-y="true" class="page-content">
		这里是内容区
	</scroll-view>
</view>
.navbar{
	position: fixed;
	top:0;
	width:100%;
	height:44px;
}
.page-content {
	position: fixed;
	top: 44px;   // 距离标题栏高度
	left: 0;
	right: 0;
	bottom: 0px;
}
```

这样就可以实现基本的页面布局，内容区铺满整个页面（除标题栏外和底部导航）。

在这里我们可以使用 Uniapp 官方的扩展组件 NavBar 导航栏。可以友好的处理左右边的事件，甚至可以以插槽的方式自定义功能复杂的标题栏。因此可以改造代码：

```text
<view>
	<!-- #ifdef APP-PLUS || MP-WEIXIN -->
	<uni-nav-bar fixed :status-bar="true" title="我的音乐" @clickLeft="goCloud" @clickRight="goCloud">
		<block slot="left"><image class="top-img left" src="/static/image/mine/l.png"></image></block>
		<!-- #ifdef APP-PLUS -->
		<block slot="right"><image class="top-img" src="/static/image/mine/r.png"></image></block>
		<!-- #endif -->
	</uni-nav-bar>
	<!-- #endif -->
	<!-- #ifdef APP-PLUS || MP-WEIXIN -->
	<scroll-view scroll-y="true" class="page-content">
	<!-- #endif -->
		这里是内容区
	<!-- #ifdef APP-PLUS || MP-WEIXIN -->
	</scroll-view>
	<!-- #endif -->
</view>
```

固定导航栏在 `uni-nav-bar` 组件中添加 fixed，添加 `:status-bar="true"` 适配状态栏的高度下渲染，并添加左右触发事件回调。由于这一块仅在 app 中需要设置标题栏，因此代码进行了条件编译 `<!-- #ifdef APP-PLUS -->`。

添加完头部标题栏的 APP 页面效果图：

![image-20210215154702414](https://img-repo.poetries.top/images/image-20210215154702414.png)

添加完头部标题栏的微信小程序页面效果图：

![image-20210215154712259](https://img-repo.poetries.top/images/image-20210215154712259.png)

小程序的载体是运营方 app，会有运营方的设计差异在。因此在设计整个项目之初，哪些功能是否适用的，是否可以在这个端使用的，都要做出评估。功能设计上也要有所取舍。如果产品经理设计一个功能需要在 H5 中调用用户的通讯录，就算程序员再优秀或者框架再实用，H5 也是做不到的调用通讯录的。**开发之前要考虑他们所提供的 API 和性能能否满足产品需求**。

## App、小程序与 H5 的能力对比



- App 能够承载更多产品功能，一些复杂的功能能够通过原生实现；
- 小程序可承载产品核心功能，较复杂的功能难以实现，优点是用完就走，缺点是需要在某个平台的 app 下打开，数据难以共享；
- H5能够脱离生态下运行，打开即可。一个网站多终端匹配。但是数据难以持久化，网页关闭后需要重新加载。根据手机的性能用户体验各有差别，流畅度不够高。

就比如这款 Uniapp Music 应用，我做一些取舍小改动，顶部右侧的功能图标不在小程序显示：

```text
<!-- #ifdef APP-PLUS -->
<!-- 条件编译后只在 app 显示 -->
<block slot="right"><image class="top-img" src="/static/image/mine/r.png"></image></block>
<!-- #endif -->
```

![image-20210215154743672](https://img-repo.poetries.top/images/image-20210215154743672.png)

通过这个头部的组件应用介绍，整个应用都可以改造成自定义的标题栏，在这里组件与插槽 slot 的优点就显露出来了。复用的同时又可以实现功能的自定义。下面我们看一下 slot 插槽的使用。

## slot 插槽的使用场景



父组件向子组件传递 dom 时会用到插槽。插槽，也就是 slot，是组件的一块模板，这块模板显示不显示、以及怎样显示由父组件来决定。比如头部代码的具名插槽：

```text
<uni-nav-bar fixed :status-bar="true" title="我的音乐" @clickLeft="goCloud" @clickRight="goCloud">
	<block slot="left"><image class="top-img left" src="/static/image/mine/l.png"></image></block>
	<block slot="right"><image class="top-img" src="/static/image/mine/r.png"></image></block>
</uni-nav-bar>
<!-- uni-nav-bar.vue 组成 -->
<view class="uni-navbar">
	<slot name="left" /> <!-- 我会被替换成 <image class="top-img left" src="/static/image/mine/l.png"></image> -->
	<view>标题</view>
	<slot name="right" />
</view>
```

`slot="left"`，`slot="right"`，这两个指定了名字，因此叫具名插槽，会在子组件指定的位置渲染。比如 `slot="left"` 的这个元素会在组件 `uni-nav-bar` 中 `<slot name="left" />` 显示，相当于替换掉了。插槽显示的位置由子组件自身决定，slot 在子组件中的位置，决定了父组件传过来的显示模板的位置。

## 导航栏 scroll-view



页面的整个内容区由 scroll-view 组件包裹，当前页面的导航栏也是由 scroll-view 组件组成，内容区主要负责用户上下浏览设置 `scroll-y`，而导航栏负责左右浏览设置 `scroll-x`。

## 小结



1. 注重整页的布局，尽可能的还原 app 浏览模式；
2. 标题栏可以使用官方的扩展组件 uni-nav-bar；
3. 插槽 slot 的使用可以在父级中自定义组件的功能，指定名称可以决定显示模板的位置；
4. 开发应用之前要考虑不同 app 、小程序、H5所提供的 API 和性能能否满足产品需求，这是开发设计的首要考虑的地方。
5. 本章代码 [uni-course-实战开发我的页 (opens new window)](https://github.com/front-end-class/uniapp-music-code/blob/master/uni-course-实战开发我的页.zip)。



## 实战6—导航四 云村页面开发

本节主要讲解利用 swiper 组件滚动展示信息，利用 flexbox 瀑布流布局实现浏览卡片式产品。

## 页面主体布局



![img](https://img-repo.poetries.top/images/16f374d21d95fbef.png)

当前页面的布局沿用在上一节中提到的布局。如上图所示分为两部分：头部标题栏 + 滚动浏览区域。头部标题栏 fixed 固定，内容区用 scroll-view 组件撑开整个页面。

相关代码：

```text
<view>
	<!-- 头部 -->
	<uni-nav-bar fixed :status-bar="true">
		头部内容
	</uni-nav-bar>
	<!-- 滚动区域 -->
	<view class="page-content">
		<mescroll-uni ref="mescroll" :fixed="false" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback">
			滚动区域内容
		</mescroll-uni>
	</view>
</view>
.page-content {
	position: fixed;
	top: 64px;
	left: 0;
	right: 0;
	bottom: 0px;
	/* #ifdef H5 */
	top:44px;  // h5 无状态栏
	/* #endif */
}
```

在样式方面需要注意 `.page-content` 向下偏移一个头部标题栏的高度才可实现内容区铺满。由于不同端屏幕展示起点不同，需要做样式的调整，先看一下头部标题栏组成：

**头部标题栏固定高度(64px) = 状态栏/电池栏(20px) + 标题栏(44px)**

H5 的渲染起点并没有状态栏，样式需要条件编译，H5 中页面实际的标题高度展示为 44px ，因此 page-content 内容区需向下偏移 44px ，而不是 64px。

![image-20210215154852615](https://img-repo.poetries.top/images/image-20210215154852615.png)

H5 未进行条件编译的状态

```text
/* #ifdef H5 */
top:44px;  // h5 无状态栏
/* #endif */
```

添加条件编译后，page-content 内容区偏移程度与其他端保持一致（页面正常）。里面的长列表用 mescroll-uni 上拉加载组件解决浏览交互。

## swiper 组件展示滚动信息



![image-20210215154913770](https://img-repo.poetries.top/images/image-20210215154913770.png)

关于这样的信息滚动展示的功能，可能会一大波小伙伴感觉有点吃力。其实分析这一块**滚动**的特性，可以联想到使用 swiper 组件便能轻松实现这样的一个小功能。

相关代码：

```text
<!-- 日期信息bar -->
<view class="date-bar flex-box">
	<view class="date-bar-left">
		云村热评墙 <text class="iconfont">&#xe605;</text>
		<swiper class="date-bar-swiper" :autoplay="true" :duration="500" :circular="true" :vertical="true">
			<swiper-item v-for="(item, index) in dateMsg.msgList" :key="index">
				{{item.name}}
			</swiper-item>
		</swiper>
	</view>
	<view>
		<view>{{dateMsg.curDate[1]}}.</view>
		<view class="date-bar-num">{{dateMsg.curDate[2]}}</view>
	</view>
</view>
dateMsg: {
	curDate: String(new Date()).split(' '),
	msgList: [
		{ name: '他是我见过最年少有为的人', id: ''},
		{ name: '因为一个人而失眠，这真的好吗', id: ''},
		{ name: '花开花落，没有悲愁怎么是少年？', id: ''},
	],
},
.date-bar-swiper{
	width:430rpx;
	height:40rpx;
	line-height: 40rpx;
	color:#d0d2d3;
	font-size: 24rpx;
}
```

这个功能对 swiper 属性进行设置 `:autoplay="true" :duration="500" :circular="true" :vertical="true"`，自动滚动，滑动动画时长500毫秒，采用衔接滑动，滑动方向为纵向。即可实现滚动信息展示。

## flexbox 瀑布流布局实现浏览卡片式产品



瀑布流又称瀑布流式布局，是一种比较流行的页面布局方式。与传统的分页显示不同，视觉表现为参差不齐的多栏布局。即多行等宽元素排列，后面的元素依次添加到其后，等宽不等高，根据图片原比例缩放直至宽度达到我们的要求，依次按照规则放入指定位置。

瀑布流式布局的优点：

1. 有效的降低了界面复杂度，节省了空间，不再需要臃肿复杂的页码导航链接或按钮；
2. 通过向上滑动浏览，对于触屏设备非常友好，基本上所有移动设备上的信息展示都是采用这种方式，特别是购物网站；
3. 滚动预加载，用户浏览时的观赏和思维不容易被打断，更高的参与度，留存更容易。

![img](https://img-repo.poetries.top/images/16f374e899d8abd0.png)

可以看上图的展示的瀑布流效果，flexbox 布局可以轻松实现，而不用使用 js 计算排版高度再插入内容等复杂的操作。我们可以把上图以 html 结构设计成：

```text
<!-- flex 盒 -->
<view class="list-content">
	<!-- 左边/第一列 -->
	<view class="video-list">
		<view class="video-item" v-for="(item, index) in showList.colList1"></view>
	</view>
	<!-- 右边/第二列 -->
	<view class="video-list">
		<view class="video-item" v-for="(item, index) in showList.colList2"></view>
	</view>
</view>
.list-content{
 	display: flex;
	flex-direction: row; // 水平方向排版
}
.video-list{
 	display: flex;
	flex-direction: column; // 垂直方向排版
}
```

相当于 list-content 包含多列**从左至右**显示内容（当前为两列），单独的一列以**从上到下**进行排列显示。单独每一列的具体数据：

```text
let i = 0,
	list1 = [], // 左边/第一列
    list2 = [], // 右边/第二列

    // 如果有第三列
    // list3 = [], // 第三列

// allDate 为后台获取的所有数据
while (i < allDate.length) {
    list1.push(allDate[i++]);
    if (i < allDate.length) {
        list2.push(allDate[i++]);
    }
	
	// 如果有第三列
    if (i < allDate.length) {
        list3.push(allDate[i++]);
    }
}
return {
    list1, // 第一列
    list2, // 第二列

    // 如果有第三列
    data3 // 第三列
};
```

如果使用三列的方式：

根据上面代码可以改造为多列布局，这些讲解的瀑布流布局方案，可以说是**竖向瀑布流**，利用 flexbox 的布局再结合下拉更新上拉加载的功能，即可实现可简单实现瀑布流布局的浏览方式。

## 底部导航栏红点与角标的设置



![image-20210215154950380](https://img-repo.poetries.top/images/image-20210215154950380.png)

作为一款应用，应用内的信息提示一般会展现在底部导航栏上，Uniapp 支持设置 TabBar 上的元素以及角标等信息，统一了 h5，小程序，app 的设置角标 API。

![img](https://img-repo.poetries.top/images/16f374f26f0ce1d4.png)

`uni.setTabBarBadge` 这个 API 在 **非tabbar** 页面上调用会失效，因此我们需要在 common/js/util.js 封装一个方法由几个 tabbar 页面上调用。结合 Vuex 的状态管理全局管理角标信息。

相关代码：

```text
// store/index.js
const store = new Vuex.Store({
	state: {
		message: {}  // 角标信息
	},
	mutations: {
		storeMessage (state, payload) {   // 角标信息
			state.message = {...state.message, ...payload}
		}
	}
})

export default store
```

封装公用方法，先读取存储的信息，再根据信息设置 tabbar 上的角标与文本。

```text
// common/js/util.js
// 设置角标
setTabBarBadge (page) {
	// 设置 store 红点信息
	const accountMsg = store.state.message.account
	const newMsg = store.state.message.newMsg || []
	
	newMsg[page] = 0
	
	const TempMsg = {
		account: page == 4 ? 0 : accountMsg,
		newMsg
	}
	store.commit('storeMessage', TempMsg)
	
	// 获取 store 红点信息
	const accountMsgNew = store.state.message.account
	const newMsgNew = store.state.message.newMsg || []
	
	if (accountMsgNew > 0) { // 如果有账号信息
		setTimeout(() => {
			// uni.setTabBarBadge 这个 API 在非tabbar页面上调用会失效。
			uni.setTabBarBadge({   // 设置角标
				index: 4,
				text: String(accountMsgNew)
			})
		})
	} else {
		setTimeout(() => {
			// 删除角标
			uni.removeTabBarBadge({
			   index: 0,
			})
		})
	}
	
	newMsgNew.forEach((item, index) => {  // 设置红点
		if (item > 0) {
			uni.showTabBarRedDot({
				index
			})
		} else {
			uni.hideTabBarRedDot({
				index
			})
		}
	})
}
```

在页面上调用，0 代表 tabbar 页面索引页面

```text
onLoad() {
	// 公共设置图标
	this.$pubFuc.setTabBarBadge(0)
}
```

在进入应用的时候可以看见红点与文本的信息，并在进入当前 tabbar 页面的时候清除红点、角标，表示用户已查看提示的信息。

## 小结



1. 滑动的展示都可以考虑使用 swiper 组件完成，利用好组件的功能可以达到事半功倍的的效果；
2. flexbox 很容易实现瀑布流，做瀑布流需要考虑几方面的因素：图片大小，图片质量，加载速度，如果这些不能同时满足，会大大降低用户体验；
3. 角标信息的设置需要在 tabbar 页面上调用。
4. 本章代码 [uni-course-实战开发云村页 (opens new window)](https://github.com/front-end-class/uniapp-music-code/blob/master/uni-course-实战开发云村页.zip)。



## 实战7—导航五 账号页面开发

本节主要讲解 H5+ API 扫码接口，移动端的小字与1px像素边框的处理。

## 页面布局



当前页面的布局沿用在上一节中提到的布局。为两部分：头部标题栏 + 滚动浏览区域。头部标题栏 fixed 固定，内容区用 scroll-view 组件撑开整个页面。

相关代码：

```text
<view>
    <!-- 头部 -->
    <uni-nav-bar fixed :status-bar="true">
        头部内容
    </uni-nav-bar>
    <!-- 滚动区域 -->
    <scroll-view scroll-y="true" class="page-content" @scroll="scroll" :scroll-top="scrollTop">
        滚动区域内容
    </scroll-view>
</view>
data() {
    return {
        scrollTop: 0
    };
},
methods: {
    // 滚动到顶部标题变换
    scroll (e) {
        let scrollTop = e.detail.scrollTop
        if (scrollTop < 5) {
            this.title = ''
            this.scrollTop = 0
        } else {
            this.title = '账号'
        }
    },
}
```

![image-20210215155117100](/Users/poetry/Library/Application Support/typora-user-images/image-20210215155117100.png)

这里有区别于其他开发页面的是，页面标题栏标题当滚动区域滚动到一定位置时隐藏，由 scroll() 处理监听滚动，当滚动位置达到一定位置时，scroll 页面到滚到顶部并清空标题。使用 `scrollTop < 5` 而不是 `scrollTop == 0` 的原因是用户操作触发的滚动值未必会精确到 0，这里对值进行了取舍，临近顶部的时候，取值 scrollTop 为 0。如果运动点达到某一个取值的时候，就让这个点达到理想值下。这是很多运动动画操作的一个方法。

## cell组件



![img](https://img-repo.poetries.top/images/16f3752a40130480.png)

对于这种 cell 样式使用 flex 布局可以快速解决左（图标）+ 右（cell内容）的排版。这种存在重复性的页面可以考虑使用组件去复用，在这里我使用了[uni-list-item 组件 (opens new window)](https://ext.dcloud.net.cn/plugin?id=24)。

```text
<uni-list>
    <uni-list-item title="口袋彩铃" thumb="/static/image/account/a_16.png" size='mini'/>
    <uni-list-item title="我的订单" thumb="/static/image/account/a_19.png" size='mini' border0/>
    <uni-list-item title="创作者中心" thumb="/static/image/account/a_09.png" size='mini' border0 class="mt16"/>
    <!-- more items -->
</uni-list>
import uniList from '@/components/uni-list/uni-list.vue'
import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
export default {
    components: {
        uniList,
        uniListItem,
    },
    data() {
        return {}
    }
}
```

对于拿来即用的组件，可能还会与自己实际业务上的设计还有一定差距，这个时候就要自己动手扩展组件属性。根据cell高度需求我在这添加了属性 `size='mini' border0`，这样 uni-list-item 子组件对着两个属性进行判定 class 名字，样式根据类名进行样式处理：

```text
<!-- uni-list-item.vue -->
<view class="uni-list-item__container" :class="[{'border': border0}, size]">
    <!-- 内容 -->
</view>
props: {
    size: { // 缩略图尺寸
        type: String,
        default: ''
    },
    border0: { // 无边框
        type: Boolean,
        default: false
    },
}
.uni-list-item__container {
    &:before{
        position:absolute;
        content: '';
        right:0;
        bottom:0;
        width:600rpx;
        border-top: 1px solid #e6e6e6;
        transform: scaleY(0.5);
    }
    &.mini{
        padding: 30rpx 30rpx 30rpx 0;
        &:before{
            width:646rpx;
        }
    }
    &.border:before{
        border:0;  // 去掉边框
    }
}
```

- 通过向 uni-list-item 子组件中传递属性 border0 ，进而控制不显示底部边框的显示隐藏。
- 通过向 uni-list-item 子组件中传递属性 size ，进而控制图片大小以及 cell 高度。

## 扫码功能开发



当前页面有个扫码的功能，我们可以使用 H5+ API 扫码接口，Barcode 模块可使得 Web 开发人员能快速方便调用设备的摄像头进行条码扫描识别，而不需要安装额外的扫描插件。这次只打算在 app 才可使用扫码，因此这一块功能需要条件编译处理一下。

创建扫码识别控件对象：

```text
plus.barcode.create(id, filters, styles)
```

参数：

- id: ( String ) 必选 扫码识别控件的标识 可用于通过`plus.barcode.getBarcodeById()`方法查找已经创建的扫码识别控件对象。
- filters: ( Array[ Number ] ) 可选 条码类型过滤器 条码类型常量数组，默认情况支持QR、EAN13、EAN8类通过此参数可设置扫码识别支持的条码类型（注意：设置支持的条码类型越多，扫描识别速度可能将会降低）。
- styles: ( BarcodeStyles ) 可选 扫码识别控件样式 用于设置扫码控件在页面中显示的样式，如扫码框、扫码条的颜色等。

说明：

此方法创建扫码识别控件并不会显示在页面中，需要调用 `plus.webview.Webview` 窗口对象的 append 方法将其添加到 Webview 窗口中才能显示。 注意：需要设置styles 参数的 top/left/width/height 属性指定扫码识别控件的位置及大小，否则可能无法正确显示。

栗子：

```text
// 创建一个二维码（plus.barcode.QR）扫码框
var barcode = plus.barcode.create('barcode', [plus.barcode.QR], {
    position: 'fixed',
    top: '64px',
    left: '0px',
    width: '100%',
    height: '100%',
});

// 扫码成功回调
barcode.onmarked = function (type, result) {
    console.log(type, result)
};

// 添加到当前 Webview
plus.webview.currentWebview().append(barcode);

// 打开扫码
barcode.start();
```

图片示例：

![img](https://img-repo.poetries.top/images/16f3753db7817cc4.png)

来尝试封装成单独一个组件，有助于管理。

```text
<!-- components/scan/scan.vue -->
<template>
    <view></view>
</template>

<script>
    export default {
        data() {
            return {
                typeList: [ // 码类型 参考地址 https://www.dcloud.io/docs/api/zh_cn/barcode.html
                    plus.barcode.QR,
                    // plus.barcode.EAN13,
                    // plus.barcode.EAN8,
                    // plus.barcode.UPCA,
                    // plus.barcode.UPCE,
                    // plus.barcode.CODABAR,
                    // plus.barcode.CODE39,
                    // plus.barcode.CODE93,
                    // plus.barcode.CODE128,
                    // plus.barcode.ITF,
                ],
            };
        },
        methods: {
            open() {
                // 创建上层webview
                let pages = getCurrentPages();
                let currentWebview = pages[pages.length - 1].$getAppWebview();
                // 创建一个扫码框
                this.barcode = plus.barcode.create('barcode', this.typeList, {
                    position: 'fixed',  // fixed 固定在页面
                    top: '64px',
                    left: '0px',
                    width: '100%',
                    height: '100%',
                });
                // 扫码成功回调
                this.barcode.onmarked = this.onmarked;
                // 添加到当前 Webview
                currentWebview.append(this.barcode);
                // 打开扫码
                this.barcode.start();
            },
            // 关闭扫码
            close () {
                this.barcode.close();
            },
            // 扫码成功
            onmarked (type, result) {
                this.openStartRecognize(result)
                this.$emit('success', result);
                this.close()
            }
        }
    }
</script>
<style lang="scss"></style>
```

引用：

```text
<!-- pages/account/index.vue -->
<scan ref="scan" @success="getScanCode"/>
// pages/account/index.vue
import scan from '@/components/scan/scan.vue'
export default {
    components: {
        scan
    },
    data () {
        return {}
    },
    methods: {
        // 打开扫描
        openScan () {
            this.$refs.scan.open()
            this.isShowScan = true
            // 隐藏底部 tabbar
            uni.hideTabBar({})
        },
        // 隐藏扫描
        closeScan () {
            this.$refs.scan.close()
            this.isShowScan = false
            uni.showTabBar({})
        },
        // 扫码成功
        getScanCode (val) {
            this.closeScan()
            uni.showToast({
                icon: 'none',
                title: '扫码成功',
            });

            // 业务代码...
        }
    }
}
```

需要注意的是，底部导航栏会遮盖扫码识别控件，因此打开扫码的时候隐藏底部导航栏，使用 Uniapp 的 API 操作导航栏 `uni.hideTabBar({})`。

![img](https://img-repo.poetries.top/images/16f37541a38c31a8.png)

设置扫码识别控件在扫码时可以开启摄像头的闪光灯 `obj.setFlash(true)`;

想要小程序也支持扫码功能，可以使用 [uni.scanCode (opens new window)](https://uniapp.dcloud.io/api/system/barcode?id=scancode)。

更多 H5+ 的 api 功能可以参考[HTML5+ API Reference (opens new window)](https://www.dcloud.io/docs/api/zh_cn/barcode.html)。

## 1px边框 和 10px字体



![img](https://img-repo.poetries.top/images/16f3752eff77d6b9.png)

按钮边框与cell边框

看上图中两个边框都是 1px，但是看起来粗细有些不一样，为什么呢？告诉你，是我们的屏幕的问题。

我们的移动端设备（手机，ipad等）都是 Retina 显示屏。Retina 显示屏一种具备超高像素密度的液晶屏，同样大小的屏幕上显示的像素点由1个变为多个，所以在高清显示屏中的位图被放大，图片会变得模糊，因此移动端的视觉稿通常会设计为传统 PC 的2倍。因此你拿到的设计稿是 750px，而不是 375px。而且在 Retina 屏中，像素比为 2(iPhone6/7/8) 或 3(iPhone6Plus/7Plus/8Plus) 的手机中，1px 的边框看起来比真的 1px 更宽。

我们使用的是 rpx 伸缩性单位，如果你在设计稿中测量的边框为 1，在项目中设置边框为:

```text
.border1{
    border-top: 1rpx solid #ddd;
}
```

实际编译后：

```text
.border1{
    border-top: 0.5px solid #ddd;
}
```

这个时候你就要小心了！！ 苹果机 ios8+ 的可以识别浮点类型的单位，因此苹果机可以渲染这个 0.5px，可以看到所谓的一像素细小边框。然而，绝大部分的 android 机是不支持浮点类型单位的（边框失效）。

关于一像素边框的处理，我习惯 `伪类 + transform` 的方法。即利用 `:before` 或者 `:after` 实现 border ，并 transform 的 scale Y轴缩小一半，将 border 绝对定位。

元素本身不定义边框，伪元素定义 1px 边框:

```text
<!-- 底部边框 -->
.border-bottom1 {
    position: relative;
    &:after{
        position:absolute;
        content: '';
        right:0;
        bottom:0;
        width:600rpx;
        border-top: 1px solid #e6e6e6;
        transform: scaleY(0.5);
    }
}
```

这样可以完美兼容到多种设备上了，那文字很小的怎么办呢？

![img](https://img-repo.poetries.top/images/16f3753566a6ef8f.png)

Chrome 为了更好显示中文规定了默认最小字体是 12px，很多手机厂商及浏览器也有这样的规定。那么上图中 10px 字体就会在某些设备下失效。有没有解决方法呢？ 其实答案就在上面，对文字使用 transform 的 scale 进行缩小。

```text
.font10px{
    font-size: 24rpx;
    transform: scale(0.84);
}
```

这样我们就可以看到小字了，但这只是缩小了文字的大小，并不能将文字所占的区域大小缩小，即无法缩小元素的 width 和 height。防止区域大小缩小后影响到其他元素的排版，可以只对包含文字的元素再包括一层行内元素，只对行内元素缩小。

```text
<view class="name">
    <text class="font10px">10px</text>
</view>
```

## 小结



1. 拿来即用的组件并不完全适用自己的项目，可以根据组件要求进行二次改造；
2. 小字与1px边框的问题，可以使用 css3 的 transform 进行缩放；
3. 对于设备模块，可以当做插件来看待，根据代码运行平台不同按需引用即可。
4. 本章代码 [uni-course-实战开发帐号页 (opens new window)](https://github.com/front-end-class/uniapp-music-code/blob/master/uni-course-实战开发账号页.zip)。



## 实战8—搜索组件开发

本节主要讲如何引入搜索组件，以及如何定制搜索组件。

## 发现页与视频页面添加标题栏



细心的小伙伴早就可能发现了首页与视频页面并没有头部。这一块头部的添加是相关联搜索的，需要特殊处理一下，因此放到这一节来说。

![image-20210215155333640](https://img-repo.poetries.top/images/image-20210215155333640.png)

发现页

![image-20210215155344079](https://img-repo.poetries.top/images/image-20210215155344079.png)

由于发现页面布局的改变，因此原有的代码也是需要进行稍微的调整，改为：头部标题栏 + 滚动浏览区域。

发现页相关代码：

```text
<view>
  <!-- 头部 -->
  <uni-nav-bar fixed status-bar>
	<block slot="left"><image class="top-img" src="/static/image/search/6.png"></image></block>
	<view class="top-search flex-box">
	  <image class="search-icon" src="/static/image/search/2.png"></image>
	  {{ searchTxt }}
	</view>
	<!-- #ifdef APP-PLUS || H5 -->
	<block slot="right"><image class="top-img" src="/static/image/mine/r.png"></image></block>
	<!-- #endif -->
  </uni-nav-bar>
  <!-- 滚动区域 -->
  <view class="page-content">
	<mescroll-uni ref="mescroll" :fixed="false" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback">
	  滚动区域内容
	</mescroll-uni>
  </view>
</view>
.page-content {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0px;
  /* #ifdef H5 || MP-WEIXIN */
  top: 44px;
  /* #endif */
}
```

在发现页与视频页面上的搜索框并不是 input 表单控件，是直接由 view 模拟的。

上面介绍了页面标题栏，那么就是确定了搜索的入口了。我们要实现的是点击首页的模拟搜索框，然后搜索页出现的交互。接下来我们开始开发这个组件。

## 开发搜索组件



类似这样的窗口类的组件页面，我们在定义的时候，就要控制显示及隐藏。

```text
<template>
  <view class="search-page" v-if="isShow">
	主体内容
  </view>
</template>
data() {
  return {
	  isShow: false
  }
},
methods: {
  close () {
		this.$emit('close')  // 分发关闭事件给父组件监听
		this.isShow = false
	// 业务逻辑
  },
  open () {
		this.isShow = true
	// 业务逻辑
  },
}
```

这样就可以在父页面进行引入调用，控制搜索组件显示及隐藏了。

```text
<search ref="search" @close="closeSearch"></search>
import search from '@/components/search.vue';
export default {
  components: {
		search
  },
  methods: {
		// 打开搜索
		openSearch() {
			this.$refs.search.open()
		},
		// 监听关闭搜索
		closeSearch() {
			// 业务逻辑
		}
  }
}
```

说完搜索组件的调用，接下来讲解一下如何写实现页面

![img](https://img-repo.poetries.top/images/16f3757440c62564.png)

发现页

这个组件的布局相关代码：

```text
<template>
  <view class="search-page" v-if="isShow">
	<!-- 头部 -->
	<uni-nav-bar fixed :isShowLeft="false" :status-bar="true" @clickLeft="goCloud" @clickRight="goCloud">
	  <view class="search-box  flex-box">
		<view class="top-search flex-box flex-item">
		  <image class="search-icon" src="/static/image/search/2.png"></image>
		  <input class="flex-item" :focus="isFocus" type="text" v-model="searchTxt" @confirm="addSearch" confirm-type="search">
		</view>
		<view class="cancle" @click="close">取消</view>
	  </view>
	  <!-- #ifdef APP-PLUS || H5 -->
	  <block slot="right"><image class="top-img" src="/static/image/search/1.png"></image></block>
	  <!-- #endif -->
	</uni-nav-bar>
	<!-- 滚动区域 -->
	<scroll-view class="page-content">
	  内容区域
	</scroll-view>
  </view>
</template>
```

关键代码：

```text
<input class="flex-item" :focus="isFocus" type="text" v-model="searchTxt" @confirm="addSearch" confirm-type="search">
```

- `:focus="isFocus"` 获取焦点，是否唤起键盘；
- `v-model="searchTxt"` 监听输入值；
- `confirm-type="search"` 键盘右下角按钮显示为**搜索**（仅在 type="text" 时生效）；
- `@confirm="addSearch"` 点击右下角**搜索**执行 `addSearch` 事件。

整个交互逻辑是从发现页点击入口加载这个页面，然后输入框自动聚焦，唤起软键盘。输入框输入文字后点击软键盘的**搜索**完成一次搜索。软键盘弹出后，点击非置焦区域可收起软键盘。点击输入框旁边的**取消**关闭搜索组件。

由于当前开发的输入框不是 app 平台的原生输入框，存在一个问题是当 input 获得焦点，键盘弹起，然后不点击键盘的完成，就无法关闭键盘。官方作出解释：

> App 平台在 iOS 上，webview 中的软键盘弹出时，默认在软键盘上方有一个横条，显示着：上一项、下一项和完成等按钮。如不想显示这个横条，可以配置 softinputNavBar: 'none'。

配置方式，在 pages.json 中配置 style

```text
"app-plus": {
	"softinputNavBar": "none"
}
```

在 pages.json 单个页面的设置：

```text
{
  "path": "pages/index/index",
  "style": {
	"navigationBarTitleText": "发现",
	"navigationStyle": "custom",
	"app-plus":{
	  "titleNView": false,
	  "bounce" : "none", // 取消iOS回弹,避免和下拉刷新冲突
	  "disableScroll": true,   // Android小程序卡顿
	  "softinputNavBar": "none"
	}
  }
}
```

原生输入框在iOS上不会有软键盘上方的横条。

## 使用 storage 存储搜索记录



![image-20210215155416874](https://img-repo.poetries.top/images/image-20210215155416874.png)

这一块的信息一般就是由前端的存储机制去做了，在这使用 Uniapp 的 `uni.setStorageSync()` ，`uni.getStorageSync()` 进行存取搜索历史。

```text
// 获取搜索历史
getSearchList () {
  try {
	  const value = uni.getStorageSync('searchlist');
	  if (value) {
	  this.historyList = JSON.parse(value)
	  }
  } catch (e) {
	  // error
  }
},
// 清除历史
clearSearch () {
  uni.showModal({
	  title: '',
	  content: '确认清除全部历史记录？',
	  success: res => {
		  if (res.confirm) {
		uni.setStorageSync('searchlist', '')
		this.historyList = []
		  } else if (res.cancel) {
			  // console.log('用户点击取消');
		  }
	  }
  });
  
},
// 添加搜索
addSearch () {
  const txt = this.searchTxt.trim()
  
  if (txt.length == 0) {  // 空字符不添加
	return false
  }
  
  const tempIndex = this.historyList.indexOf(txt)
  if (tempIndex !== -1) {  // 如果存在相同的删除旧的
	this.historyList.splice(tempIndex, 1)
  }
  
  // 插入数组前
  this.historyList.unshift(txt)
  if (this.historyList.length > 7) {  // 数组长度7
	this.historyList = this.historyList.slice(0, 7)
  }
  uni.setStorageSync('searchlist', JSON.stringify(this.historyList))
},
```

## 使用防抖功能优化请求



防抖(debounce)：单位时间内多次触发只会执行一次，即如果短时间内大量触发同一事件，只会执行一次函数。

这个在前端开发的过程中比较容易遇到，经常需要绑定一些持续触发的事件，如 resize、scroll、mousemove、change 等等，但我们并不希望在事件持续触发的过程中那么频繁地去执行函数。防止高频率的触发请求后台服务器。

我们要做的优化策略是当事件被触发时，设定一个周期延迟执行搜索动作，若期间又被触发，则重新设定周期，直到周期结束，执行搜索动作。这样搜索的请求控制在一定时间内。

防抖代码：

```text
// 防抖
function debounce(fn, wait = 300) {    
    var timeout = null;    
    return function() {        
        if(timeout !== null) clearTimeout(timeout);        
        timeout = setTimeout(fn, wait);    
    }
}
```

代码使用：

```text
<input type="text" v-model="searchTxt" confirm-type="search" @input="inputSearch">
methods: {
	// 输入搜索
	inputSearch: debounce(() => {
	 	// 未搜索或者写入空格的情况下不显示搜索建议
		if (!that.searchTxt.trim().length) {
			that.suggestList = []
			return false
		}
		const par = {
			type: 'mobile',
			keywords: that.searchTxt.trim(),
		}
		// 请求后台数据
		apiSearchSuggest(par).then(res => {
			that.suggestList = res.result.allMatch
		})
	})
}
```

像很多抢票、抢购这类操作很多都加了防抖优化策略，为了避免用户大量点击造成服务器压力，当固定时间内，不论点击多少次，只执行一次抢的动作。

感兴趣的小伙伴可以扩展了解一下与防抖实现的效果类似的**节流**。

业界最标准的当属 `lodash` 库的两个方法，[debounce (opens new window)](https://www.lodashjs.com/docs/latest#debounce)，[throttle (opens new window)](https://www.lodashjs.com/docs/latest#throttle)，有兴趣的可以查看源码。

当前的搜索组件的主要逻辑就是这么多，引入到发现页与视频页即可。

## 小结



1. 类似窗口类的组件页面，我们在定义的时候，就要暴露方法给父组件控制显示及隐藏；

2. 一些不用后台处理的信息可以放到前端去处理，这样可以避免与后台不必要的交互，防止资源浪费；

3. 防抖是有效解决高频率触发请求后台服务器的方法。

4. 本章代码 [uni-course-实战开发搜索页 (opens new window)](https://github.com/front-end-class/uniapp-music-code/blob/master/uni-course-实战开发搜索页.zip)。

   

## 实战9—歌单列表页的开发

 本节主要讲解分包机制，其他次级页面的开发。

## 小程序分包机制

每次打开小程序会发现有的小程序打开的很快，有些很慢，甚至白屏时间很长。原因是包代码量大小的问题。第一次进入小程序的时候，小程序会下载主包代码，如果我们的主包业务代码越多，那么白屏的时间也会越长。

小程序有个机制是在小程序启动时，默认会下载主包并启动主包内页面，当用户进入分包内某个页面时，客户端会把对应分包下载下来，下载完成后再进行展示。因此我们不能把所有代码都放在主页面里面。我们把次级页面放到分包里面。

在构建小程序分包项目时，通常会创建一个或多个分包。每个使用分包小程序必定含有一个主包。所谓的主包，即放置默认启动页面 TabBar 页面，以及一些所有分包都需用到公共资源（css，js，image）；而分包则是根据开发者的配置进行划分。

某些情况下，开发者需要将小程序划分成不同的子包，在构建时打包成不同的分包，用户在使用时按需进行加载。在 pages.json 我们需要 subPackages 管理次级页面的路由：

```text
// pages.json
"pages": [],
"subPackages": [
	{
		"root": "pages/subpages/index",   // 分包根目录
		"pages": [{
			"path": "album",              // 配置页面路径
			"style": {
				"navigationBarTitleText": "歌单",
				"app-plus": {
					"titleNView": false
				}
			}
		}]
	}
],
```

分包里面的 pages 与主包的 pages 页面组成保持一致。对小程序进行分包，可以优化小程序首次启动的下载时间，以及在多团队共同开发时可以更好的解耦协作。

因此像歌单这样的次级页面都会在分包中注册管理。

## 页面跳转与获取参数

关于页面跳转，在我们常识中就是浏览器对象窗口 location（url）属性的改变，可能我们第一印象是 a 标签，或者 location 对象的 href 属性进行页面的跳转。可是在 Uniapp 框架中怎么实现跳转呢？比如我要从首页跳转到歌单页？

在 Uniapp 中想要实现跳转，可以查看[路由与页面跳转 (opens new window)](https://uniapp.dcloud.io/api/router?id=navigateto)，由 `uni.navigateTo`, `uni.redirectTo`, `uni.navigateBack`, `uni.switchTab`, `uni.reLaunch` 五个 api 组成，比如从首页跳转到列表页：

```text
// 跳转到歌单页面并传递参数 1
uni.navigateTo({
	url: '/pages/subpages/index/album?id=1',
	success: function () {  // 成功时回调函数
		console.log('跳转成功')
	}
})
```

在 Uniapp 中也有类似的 a 标签元素 `navigator`。

由于 Uniapp 中并没有 a 标签以及 location 对象，页面跳转则要使用框架中的 api 来进行对象跳转。

像平常的页面跳转，我们使用页面标签即可，要是在事件回调中则使用 api 进行跳转，比如在首页的场景中的推荐歌单跳转歌单页面，附带传参数 id，可以在生命周期回调函数 `onLoad` 的参数值中获取到。

navigator 默认点击时的样式是有虚影状态的，我们需要设置 `hover-class="none"` ，设置成点击没有态效果。默认跳转方式 `open-type="navigate"`。

在 /pages/index/index.vue 首页

```text
<!-- index.vue -->
<!-- 歌单分类块 -->
<view class="song-list">
	<view class="tit-bar">
		推荐歌单
		<view class="more fr">歌单广场</view>
	</view>
	<scroll-view class="scroll-view" scroll-x>
		<navigator class="item" v-for="(item, index) in recommendSongs" :key="index" hover-class="none" :url="'/pages/subpages/index/album?id='+ item.id">
			<image class="img" :src="item.picUrl + $imgSuffix"></image>
			<view class="desc ellipsis">{{ item.name }}</view>
			<view class="count">{{ item.playCount }}</view>
		</navigator>
	</scroll-view>
</view>
```

在歌单页

```text
//  /pages/subpages/index/album.vue
<script>
	export default {
		data() {
			return {}
		},
		onLoad(options) {  //options为object类型，会序列化上个页面传递的参数
			console.log(options.id); //打印出上个页面传递的参数。
			this.getData(options.id);
		},
		methods: {
			// 获取歌单
			getData(id) {
				var par = {
					id
				};
				apiAlbumDetail(par).then(res => {
					res.playlist.description = res.playlist.description.slice(0, 27)
					this.album = res.playlist;
					this.playList = res.privileges;
				});
			},
		}
	}
</script>
```

以上实现了页面与页面之间的传值，这样的传值相对简单，在处理复杂传值情况下，遇到 url 有长度限制，太长的字符串会传递失败，可使用窗体通信、全局变量，或 encodeURIComponent 等多种方式解决，如下为 encodeURIComponent 示例。

```text
<navigator :url="'/pages/navigate/navigate?item='+ encodeURIComponent(JSON.stringify(item))"></navigator>

// navigate.vue页面接受参数
onLoad: function (option) {
	// 参数解码
	const item = JSON.parse(decodeURIComponent(option.item));
}
```

## 设置背景模糊图像

![image-20210215155508224](https://img-repo.poetries.top/images/image-20210215155508224.png)

这一块要使用 CSS3 filter(radius) 属性给图像设置高斯模糊。"radius"一值设定高斯函数的标准差，或者是屏幕上以多少像素融在一起， 所以值越大越模糊；

```text
.bg {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	filter: blur(35px);    // 模糊程度
	background-position: 0 0px;
	background-repeat: no-repeat;
	background-size: cover;
	overflow: hidden;
}
```

![image-20210215155532285](https://img-repo.poetries.top/images/image-20210215155532285.png)

```text
<!-- 标题栏 -->
<view class="nav-bar">
	<view class="h300">
		<view class="bg" :style="'background-image:url('+ (album.backgroundCoverUrl || (album.coverImgUrl + $imgSuffix)) +');top: ' + scrollTop + 'px'"></view>
	</view>
	<view class="nav-bar-con">
		标题
	</view>
</view>
<!-- 内容 -->
<scroll-view scroll-y="true" class="page-content" @scroll="scrollpage">
	<view class="album-top">
		<view class="bg" :style="'background-image:url(' + (album.backgroundCoverUrl || (album.coverImgUrl + $imgSuffix)) + ')'"></view>
	</view>
</scroll-view>
$bgheight: 688rpx;
$bgtop: -44px;
.bg {   // 滤镜模糊
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	filter: blur(35px);
	background-position: 0 0px;
	background-repeat: no-repeat;
	background-size: cover;
}
.h300{ // 标题栏模糊背景容器
	position:relative;
	height: $bgheight;
}
.nav-bar-con{  // 标题层级比背景高，不会防止点击返回箭头
	position: absolute;
	z-index: 20;
}

.album-top {  // 内容头部画面
	position: relative;
	top: $bgtop;
	height: $bgheight;
	padding-top:44px;
	overflow: hidden;
	background: #fff;
}
```

![image-20210215155552100](https://img-repo.poetries.top/images/image-20210215155552100.png)

这里的交互比较特殊，就是标题栏的背景一直衔接内容头部画面背景，因此在滑动内容区的时候监听滑动区的滚动高度，然后标题栏的背景相对应滚动同等高度

```text
// 防抖，防止高频率操作
function debounce(fn, wait = 10) {    
	var timeout = null;    
	return function() {        
		if(timeout !== null) clearTimeout(timeout);        
		timeout = setTimeout(fn, wait);    
	}
}
var that = null
methods: {
	scrollpage (e) {
		this.scrollY = e.detail.scrollTop
		this.scroll()
	},
	// 设置背景条
	scroll: debounce(() => {
		if (that.scrollY < 5) {
			that.scrollTop = 20
		} else {
			if (that.scrollY < 300) {
				that.scrollTop = - parseInt(that.scrollY) + 20
			}
		}
	}),
}
```

## 小结

1. 理解小程序分包机制，优化加载速度，提高用户体验；
2. 跳转 tabbar 页面，也就是底部导航指定的页面，必须在 navigator 设置跳转方式 `open-type="switchTab"`；
3. 页面之间通过 url 传参，对 url 参数一定的限制。



## 实战10—登录页开发

![img](https://img-repo.poetries.top/images/16f375f207b67096.png)

这个章节主要实现以下功能：

1. 页面开发
2. 账号登录
3. 授权登录

## 页面开发

```text
<template>
    <view>
        <view class="login-form">
            <input class="input-row js-input-numer" v-model="account" type="number" maxlength="11" placeholder="输入手机号"/>
            <input class="input-row" v-model="password" @confirm="bindLogin" type="password" maxlength="20" placeholder="输入密码" confirm-type="登录"/>
            <button type="button" class="btn login-btn" @click="bindLogin">登录</button>
            <view class="bot flex-box">
                <navigator class="sign" hover-class="none">立即注册</navigator>
                <navigator class="forget" hover-class="none">忘记密码?</navigator>
            </view>
        </view>
        <view class="auth-row" v-if="hasProvider">
            <view class="auth-image" v-for="provider in providerList" :key="provider.value">
                <!-- #ifdef APP-PLUS -->
                <image class="img" :src="provider.image" @click="authLogin(provider.value)"></image>
                <!-- #endif -->
                <!-- 小程序处理 -->
                <!-- #ifdef MP-WEIXIN -->
                <button v-if="provider.value == 'weixin'" class="log-btn" open-type="getUserInfo" @getuserinfo="getUserInfo">
                    <image class="img" :src="provider.image"></image>
                </button>
                <!-- #endif -->
            </view>
        </view>
    </view>
</template>
<script>

export default {
    data() {
        return {
            hasProvider: false, // 是否有服务商平台可登录
            providerList: [],
            account: '',
            password: ''
        };
    },
    onReady() {
        this.getProvider();
        // #ifdef H5
        this.$nextTick(() => {
            document.querySelector('.js-input-numer input').setAttribute("pattern", "[0-9]*")
        })
        // #endif
    },
    methods: {
        // 获取服务供应商
        getProvider() {
            const  providerList = ['weixin', 'qq', 'sinaweibo'];
            // 判断是否用某种登录工具登录
            uni.getProvider({
                service: 'oauth',
                success: res => {
                    if (res.provider && res.provider.length) {
                        for (let i = 0; i < res.provider.length; i++) {
                            var tempProvider = res.provider[i];
                            if (~providerList.indexOf(tempProvider)) {
                                this.providerList.push({
                                    value: tempProvider,
                                    image: '../../static/image/login/' + tempProvider + '.png'
                                });
                            }
                        }
                        this.hasProvider = true;
                    }
                },
                fail: err => {
                    console.error('获取服务供应商失败：' + JSON.stringify(err));
                }
            });
        },
        // 账号登录
        bindLogin() {
            /**
             * 客户端对账号信息进行一些必要的校验。
             * 实际开发中，根据业务需要进行处理，这里仅做示例。
             */
            const account = this.account.trim()
            const password = this.password.trim()
            if (account == '') {
                this.alert('请输入手机号')
                return;
            }
            if(!(/^1[3456789]\d{9}$/.test(account))){ 
                this.alert("手机号码有误，请重填");  
                return false; 
            } 
            if (password.length < 6) {
                uni.showToast({
                    icon: 'none',
                    title: '密码最短为 6 个字符'
                });
                return;
            }
            
            uni.showLoading({
                title: '登录中'
            });
            
            const params = {
                phone: this.account,
                password: this.password
            };
            // 登录请求业务
            // 
            // ...
        },
        // 授权登录
        authLogin(value) {
            uni.login({
                provider: value,
                success: res => {
                    uni.getUserInfo({
                        provider: value,
                        success: infoRes => {
                            console.log(infoRes)
                            // 存储个人信息
                            // 在store存储token, 用户信息
                            // ...

                            // 登录完之后到首页
                            uni.switchTab({
                                url: '/pages/index/index'
                            });
                        }
                    });
                },
                fail: err => {
                    console.error('授权失败：' + JSON.stringify(err));
                }
            });
        },
        // 验证报错
        alert (msg) {
            uni.showToast({
                icon: 'none',
                title: msg
            });
        }
    }
};
</script>
<style lang="scss"></style>
```

在 H5，还要区分是安卓用户，还是 ios 用户，所以这样写：在安卓端设置 input 类型为 number，可限制键盘只输入数字，在 ios 端，要加入 pattern 验证输入字段的模式，才能限制数字输入。

```text
<input type='number' pattern="[0-9]*"/>
```

`pattern` 属性规定用于验证输入字段的模式。模式指的是正则表达式，只出现数字键盘。由于 Uniapp 的 input 组件并没有 pattern 属性传递，编译成 H5 不会在 input 控件中查看到 pattern，需要条件编译一下，插入 pattern：

```text
onReady() {
    // #ifdef H5
    this.$nextTick(() => {
        document.querySelector('.js-input-numer input').setAttribute("pattern", "[0-9]*")
    })
    // #endif
},
```

![img](https://img-repo.poetries.top/images/16f375fcfa423eab.png)

在 input 控件中，使用 `v-model` 指令双向绑定使用，直接对应修改 data 中的数据。在这里的登录功能以手机号登录的 api 为账号登录，限定了类型 `type="number"`，长度 `maxlength="11"`（手机号码最大长度11位）。

第二个密码控件多了 `@confirm="bindLogin"` 属性，可以给用户提供输入完密码后确认登录的体验。

登录操作使用 `@click` 事件触发，有些小伙伴可能会在其他地方看到有使用 `@tap` 处理事件的，不必有疑惑，Uniapp 对两者的处理是一样的。

在页面下方有几个服务平台的授权，如果不使用账号密码登录，可以选择直接由第三方进行授权登录。但是在页面处理方面我们要做到根据应用处于不用平台的情况，对应不同登录方式可供用户选择：

- H5端，只可账号密码登录
- 小程序可微信授权登录
- App 端可 QQ，微信，微博授权登录

我们可以使用 Uniapp 的 `uni.getProvider()` 获取服务供应商，判定应用打开的在什么端。注意在 app 平台，可用的服务商，是打包环境中配置的服务商，与手机端安装了什么 app 没有关系。如果你的手机没有安装 QQ 软件，开发的 app 应用会打开 web 进行 QQ 账号密码登录后再授权登录。

根据API `uni.getProvider()` 直接在视图渲染对应在 `/static/image/login/` 目录下的图标，只要我们命名方式 `['weixin', 'qq', 'sinaweibo']`与该方法判断名称一致即可，加上切图美化，即可对应。

## 手机账号登录

![img](https://img-repo.poetries.top/images/16f3760cfcc63273.png)

应用的表单提交时可以说是前端的一项重大工程，后台的数据存储都是用户从前端页面操作存储的，如果没有表单的提交，那数据来源就是单向性的。我们前端在给后台传输数据的时候，需要对数据先行处理，对数据进行加工，校验，过滤等操作（当然后台也可以做）。后台也会对数据做校验过滤等操作，因为前端的数据是可见的，并且在某种手段下甚至是可以伪造的，可以说前端的数据是危险的，如果没有后端的校验过滤等操作，那么存入数据库的可能是一个命令。比如，csrf，xss插入伪造信息，更严重是删除数据库。

那么这些校验过滤操作放在前端来做呢？

如果用户的每一次操作不经过前台校验要后台来校验，想想用户每一次输入错误，前台把数据传入到后台需要0.3秒（网络不好甚至是1-3秒），后台再传输返回信息给前端告诉问题所在。那么用户很有可能关闭这个应用，甚至是不再使用这个应用。这样的用户体验是在太差了。

```text
const account = this.account.trim()
const password = this.password.trim()
if (account == '') {
    this.alert('请输入手机号')
    return;
}
if (!(/^1[3456789]\d{9}$/.test(account))) {
    this.alert("手机号码有误，请重填");  
    return false;
}
```

在登录提交这一块，对用户输入数据进行校验过滤，先使用 `trim()` 过滤掉数据的前后空格，可以避免用户操作输入失误产生的空格，然后对账号进行校验非空处理。这一步可以拦截用户未填入账号进行登录的无意义提交操作。下一步再对用户的输入数据格式（当前设定为手机号，可能有邮箱账户）进行校验。校验均使用 `uni.showToast()` 进行提示，统一又封装成 `alert()`。如果有多部操作，提取封装可以减少一定的代码量并提高效率。

## 微信授权登录

授权登录是指通过一套简单、安全的交互流程，让第三方应用可以在不知道用户登录名和密码的情况下，获取到用户的的对应信息，从而实现在第三方应用中的对应客户端的登录并关联第三方平台账户。

也就是说，对于用户来说，当你登录了一个 app 之后，你再使用这个 app 上的任何第三方服务，都不需要再手动输入一遍第三方服务对应的账号密码。而且在完成第一次登陆后，接下来的一段时间内用户再使用此服务都可以实现无感知登录。

第三方授权登录有几个优势点：

- 缩短用户操作步骤，降低流失率；
- 统一接入规范，把控登录方式；
- 获取用户信息，考虑合规要求；
- 协议管理方便，快速签约解约；

上面提到 Uniapp 的 `uni.getProvider()` 获取服务供应商就是为了判定该应用是否可以进行第三方授权登录，然后再根据API `uni.login()`根据不同的服务商进行授权登录。判定登录后再使用API `uni.getUserInfo()` 获取第三方已经登录的用户信息。

注意：

1. 虽然第三方授权登录的速度比传统的账号密码登录速度更快，只需要同意授权即可登录。鼓励用户使用第三方的账号登录，无疑是把该平台的资料分享给第三方平台，造成了数据泄露（登录用户数、昵称等信息）。作为核心机密的用户信息，被第三方平台所知悉，这也是不明智的选择。
2. 为优化用户体验，使用 `wx.getUserInfo` 接口直接弹出授权框的开发方式将逐步不再支持。目前已经调整为：**使用 button 组件，并将 open-type 指定为 getUserInfo 类型，获取用户基本信息。**

## 小结

1. 利用元素标签的属性限定用户操作能让你的应用更加好用，记住用户的所有操作都可能是愚蠢的，用户并不关心你的控件，能越节省用户输入时间，你的应用体验感也就越好，越能赢得客户青睐；
2. 前端操作的数据是可见的，危险的，并有可能被人伪造，或者恶意操作，真实项目需要一定的校验加密；
3. 授权登录优化了繁杂的账号密码登录，更方便用户操作。



## 实战11—引入Vuex保持登录状态

本节主要讲解如何使用 Vuex 以及 Uniapp 的 storage 储存功能来做用户状态保存。

下面先来了解下 storage 的基本概念。

## 利用 storage 存储信息

传统的网页 h5 端数据存储方式（cookie、localStorage、sessionStorage，IndexedDB...），而 App 端无大小限制，不是缓存，是持久化存储。小程序端是自有的 storage 方式，在于用户主动删除或超过一定时间被自动清理，否则数据都一直存在。

Uniapp 集成了小程序，app，h5 的数据缓存，统一了 `uni.setStorage()`，`uni.setStorage()` 系列 API ，完成对缓存数据的操作。

在登录这一块功能，传统做法是使用 cookie 的存储机制来判定用户。

使用 cookie：用户登录后由后端生成一个 sessionid 放在 cookie 中返回给客户端，并且服务端一直记录着这个 sessionid ，客户端以后每次请求都会带上这个 sessionid，服务端通过这个 sessionid 来验证身份之类的操作。（存在危险：攻击者拿到了cookie（sessionid）后，就可以完全替代你，客户端以为攻击者是实际用户）。

使用 token：用户登录后由后端返回一个 token 给客户端，客户端将这个 token 存储起来，然后每次客户端请求都需要开发者手动将 token 放在请求 header 中带过去，服务端每次只需要对这个 token 进行验证就能使用 token 中的信息来进行下一步操作了。

Cookie 是 JavaScript 中的浏览器对象，在小程序，App 中并没有 document.cookie 对象，因此不支持读写 cookie，所以使用 Uniapp 开发不能用传统的应用那样通过读取 cookie 来判断是否是登录状态。Uniapp 中有 `uni.setStorage()` 系列 API 进行数据缓存，而且整个框架的语法糖跟 Vue 类似，那我们可以 `uni.setStorage()` 以及 Vuex 对登录状态进行管理。

注：Uniapp 设置存储有同步与异步之分，以 Sync 结尾的都是同步缓存操作:

```text
// 异步
uni.setStorage({
    key: 'storage_key',
    data: 'hello',
    success: function () {
        console.log('success');
    }
});

// 同步
try {
    uni.setStorageSync('storage_key', 'hello');
} catch (e) {
    // error
}
```

有设置缓存 API ，当然还有 API 指定 key 去除缓存 `uni.removeStorage()`，以及 API 清理本地数据缓存 `uni.clearStorage()`。

注意 Uniapp 的 Storage 在不同端的实现不同：

1. 所有 storage 的 API 操作对应有同步异步之分，容易使用混淆。
2. H5端为 localStorage，浏览器限制5M大小，是缓存概念，可能会被清理
3. App 端为原生的 plus.storage，无大小限制，不是缓存，持久化
4. 各个小程序端为其自带的 storage api ，数据存储生命周期跟小程序本身一致，即除用户主动删除或超过一定时间被自动清理，否则数据都一直可用。
5. 微信小程序单个 key 允许存储的最大数据长度为 1MB，所有数据存储上限为 10MB。
6. 支付宝小程序单条数据转换成字符串后，字符串长度最大200*1024。同一个支付宝用户，同一个小程序缓存总上限为10MB。
7. 百度、头条小程序文档未说明大小限制。

根据上面的 storage 的 API 与 Vuex，我们可以先捋一下登录功能逻辑：

![img](https://img-repo.poetries.top/images/16f3190c8cb01823.png)

## 引入 Vuex，定义登录状态及用户信息

在 store/index.js 文件夹目录引入 Vuex，添加状态和分发方法：

```text
// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        uerInfo: {  // 用户信息
            hasLogin: false,
            token: '',
            profile: ''  // 简介
        },  
    },
    mutations: {
        storeLogin(state, payload) { // 改变登录状态
            const temp = {
                hasLogin: true,
                token: payload.token,
                profile: payload.profile
            }
            
            state.uerInfo = Object.assign({}, state.uerInfo, temp)
            
            // 将用户信息保存在本地
            uni.setStorageSync('uerInfo', JSON.stringify(state.uerInfo))

        },
        storeLogout(state) { // 退出登录
            const temp = {
                hasLogin: false,
                token: '',
                profile: {}
            }
            state.uerInfo = Object.assign({}, state.uerInfo, temp)
            
            uni.removeStorageSync('uerInfo')
        }
    }
})

export default store
```

Uniapp 中可以直接引入 Vuex 而不需命令行安装依赖，只需要注入到 Vuex 插件 `Vue.use(Vuex)`。

`new Vuex.Store()` 对象参数 `state` 保存用户信息，项目全局共享这些信息。`mutations` 对象定义方法 `storeLogin`，`storeLogout` 暴露出去给项目中的页面组件修改 `state` 的唯一通道，修改 `uerInfo` 状态信息只能通过这两个方法。

## 挂载 store ，全局共享状态信息

要想项目全局共享这些信息，需要在入口文件 main.js 文件中导入这个 js，并把 store 挂载到 Vue 中。

```text
import Vue from 'vue'
import App from './App'
import store from './store'

Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
```

挂载到 Vue 后，就可以在页面上使用了。

首先是用户的登录：

```text
import { mapMutations } from 'vuex';  
import { apiLogin } from '@/apis/account.js'
export default {
	methods: {
		...mapMutations(['storeLogin']),
		bindLogin() {
			const params = {
				phone: this.account,
				password: this.password
			};
			apiLogin(params).then(res => {
				// 不成功信息提示
				if (res.data.code !== 200) {
					uni.showToast({ 
					    icon: 'none',
					    title: res.data.msg,
					});
					return false
				}
				
				// 登录成功后改变store登录状态，并进入首页
				// 在store存储token,profile
				const temp = {
					token: res.access_token,
					profile: res.data.profile
				}
				this.storeLogin(temp)
				
				uni.switchTab({
					url: '/pages/index/index'
				});
			})
		},
	}
}
```

用户经过登录页登录后就可以在账号页面共享登录状态了。

## 账号页面共享登录状态与用户信息

登录前与登录后的页面状态：

![img](https://img-repo.poetries.top/images/16f31905e9b5cf90.png)

![img](https://img-repo.poetries.top/images/16f319082d75a218.png)

通过 Vuex 中保存的用户信息判断是否已经登录，从而显示不同的内容。关键代码：

```text
<!-- pages/account/index.vue -->
<!-- 未登录状态 -->
<view v-if="!userInfo.hasLogin" class="empty-user">
    <view>登录Uniapp Music</view>
    <view>手机电脑多端同步，尽享海量高品质音乐</view>
    <navigator class="btn" url="/pages/subpages/account/login">
        立即登录
    </navigator>
</view>
<!-- 登录状态 -->
<template v-if="userInfo.hasLogin">
    <view class="userinfo-box flex-box">
        <view class="avator">
            <image v-if="userInfo.profile.avatarUrl" class="img" :src="userInfo.profile.avatarUrl"></image>
            <view v-else class="no-img">
                上传头像
            </view>
        </view>
        <view class="flex-item">
            <view class="fl">
                <view class="name">{{userInfo.profile.nickname}}</view>
                <view class="level">lv1</view>
            </view>
            <image class="sign fr" src="/static/image/account/a_03.png"></image>
        </view>
    </view>
<template>
<!-- 退出登录 -->
<view v-if="userInfo.hasLogin" class="logout" @click="confirmOut">
    退出登录
</view>
import { mapState, mapMutations } from 'vuex';
import { apiLogout } from '@/apis/account.js';
export default {
		data() {
				return {};
		},
		computed:{
				...mapState(['userInfo'])
		},
		methods: {
				// 退出登录
				...mapMutations(['storeLogout']),
				// 退出登录 清空缓存
	confirmOut() {
		uni.showModal({
			title: 'Uniapp Music',
			content: '确定退出当前账号吗？',
			cancelColor: '#007aff',
			success: res => {
				if (res.confirm) {
					this.confirmLogout()
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
	},
	// 确定退出
	confirmLogout() {
		apiLogout().then(res => {
			this.storeLogout()
			// 到登录页
			uni.navigateTo({
				url: '/pages/subpages/account/login'
			})
		})
	},
		}
}
```

## 关键点：再次进入应用

刷新页面或者退出后页面再次进入应用后的判断。这里我们根据进入应用触发应用生命周期 onLaunch 来做判定。当进入应用时在 App.vue 中判断本地缓存中是否有 `uerInfo`，根据 uerInfo 里面的 token 判断登录状态。

```text
import { mapMutations } from 'vuex';
export default {
	onLaunch() {
		console.log('App Launch')
		uni.getStorage({
			key: 'userInfo',
			success: res => {
				console.log(res.data)
				// 此处仅做演示
				// 跟后台校验token的有效性，判定是否在登录状态。如果token失效，需重新登录。app端不强制用户登录，可以游客身份登录，可以进一步优化流程
				// uni.request({
				//  url: '',    // 验证token有效性的api
				//  header: {  
				//     "Token":res.data.token  
				//  },  
				// 	method: "POST",
				// 	success: response => {
				// 		if (response.data.code === 200) {
				// 			this.storeLogin(e.data);
				// 		} else {  // 验证无效清除用户原有缓存数据
				// 			this.storeLogout()
				// 		}
				// 	}
				// })
				this.storeLogin(JSON.parse(res.data))
			}
		});
	},
	methods: {  
		...mapMutations(['storeLogin', 'storeLogout'])  
	}
}
```

验证 token 有效性后拿到用户信息，如同再次登录一样，存储用户信息在状态管理，使所有页面都能共享登录状态与用户信息。

可以将 token 放在请求 header 中带过去，服务端每次只需要对这个 token 进行验证就能验证用户了。

```text
// utils/request/index.js
import store from '@/store/index.js'

const reqInterceptor = async (options) => {
  options.header = {  // 头部塞入token 进行验证
    ...options.header,
    token: store.state.userInfo.token
  }
}
```

## 小结

1. 关键在于如何存储验证 token 信息，如何与后台交换用户信息；
2. 将 token 放在请求 header 中，服务端每次只需要对这个 token 进行验证就能验证当前用户。
3. 本章代码 [uni-course-实战开发登录状态 (opens new window)](https://github.com/front-end-class/uniapp-music-code/blob/master/uni-course-实战开发登录状态.zip)。



## 实战12—播放页的开发

------

## sidebarDepth: 3

如果一个音乐应用没有播放，那么这款应用就是没有灵魂的，这也是进阶系列的重点之一。

本章主要讲解播放页的需求和逻辑处理，以及全局歌单的实现。

![image-20210215160015418](https://img-repo.poetries.top/images/image-20210215160015418.png)

## 播放页的整体思路

初始化应用的时候，没有播放入口（没有添加播放列表），需要添加播放列表才可播放。用户在进入到 album 歌单页面选择播放列表时进入到播放页面，并到列表存在 Vuex 中，歌曲列表都在全局，这样可以做到全局播放。并记录用户的行为数据，播放列表处在哪一首。

## 播放器的基本控制

1. 播放：点击播放列表中的歌曲进行播放，播放时跳转播放界面，并显示歌曲信息。
2. 停止：当歌曲正在播放时，点击歌曲播放界面下方的停止键，停止当前播放的歌曲。
3. 上一曲：当前歌曲索引值减一，重新初始化加载音频数据，播放列表中上一首歌曲，如果索引值小于0，则索引值为列表长度减去一。
4. 下一曲：当前歌曲索引值加一，重新初始化加载音频数据，播放列表中下一首歌曲，如果索引值大于列表长度，则索引值为0。
5. 播放列表：点击弹出歌曲列表界面。
6. 播放模式：随机，顺序，单曲，控制改变歌曲索引值，加载不同音频数据。
7. 添加歌曲：插入播放列表中。
8. 删除歌曲：从播放列表剔除歌曲。

## 音频 API

```text
const bgAudioMannager = uni.getBackgroundAudioManager();   // 创建一个音频
bgAudioMannager.title = '致爱丽丝';     // 音频的标题（歌名）
bgAudioMannager.singer = '暂无';       // 音频的作者 （歌手）
bgAudioMannager.coverImgUrl = 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg';  // 音频的封面（专辑海报）
bgAudioMannager.src = 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3';   // 音频源 （mp3）
// 事件不用重复设定，只用在 onload 时初始化一次即可
backgroundAudioManager.onPlay()    // 背景音频播放事件，判定播放状态
backgroundAudioManager.onPause()   // 背景音频暂停事件，判定暂停状态
backgroundAudioManager.onTimeUpdate() // 背景音频播放进度更新事件，确定当前播放进度时间和底部滑块位置
backgroundAudioManager.onEnded()  // 背景音频自然播放结束事件，播放完自动加载下一首歌曲
```

有上面 backgroundAudioManager 对象的方法和属性，就可以创建一个简单的播放器了，但是一个播放器有更多的交互，更新歌单，对应播放的歌曲，界面交互等效果，下面就来介绍网易云的播放器的效果与交互。

## 页面及样式的处理

这一块的样式效果主要是海报的虚化填充，磁盘的旋转动画，拨条机械臂的动画，以及进度滑块的使用。

1.背景虚化

```text
<view class="play-page" :style="bgStyle">
	<!-- 虚化蒙板 -->
	<view class="bg"></view>
	<!-- 内容层级在蒙板上 -->
	<view class="content"></view>
</view>
// 最底层元素负责背景渲染，背景为行内样式
.play-page {
	position: fixed;
	right: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-position: center center;
	background-repeat: no-repeat;
	background-size: cover;
}
// filter 虚化最底层元素背景
.bg {
	position: fixed;
	z-index: 0;
	right: 0;
	left: 0;
	height: 100%;
	width: 100%;
	filter: blur(40rpx);
	background: inherit;
	z-index:-1;
	transform:scale(1.5);
}
```

1. 磁盘转圈播放动画暂停以及重新开始旋转

主要的样式处理是磁盘转圈动画，以及拨条机械臂的滑动动画，监听音频播放停止事件，触发动画的运行。当点击开始按钮时候，就使用 css3 属性 transition 动画 transform 的旋转一定角度使得机械臂刚好落入到唱片磁盘内。当点击停止按钮时候，一方面控制唱片磁盘停止旋转，另一方面要操纵拨条机械臂匀速逆时针向上旋转离开唱片磁盘。 监听 playState 的变化，判定是否在播放状态。

```text
<!-- 磁盘盒 -->
<view class="play-poster" @click="openList(0)">
	<div class="poster-box" :class="playState ? '' : 'pause'">
		<image class="img" v-if="curSongItem.picUrl" :src="curSongItem.picUrl"></image>
	</div>
</view>
.play-poster {
	margin: 310rpx auto 0;
	.poster-box{
		display: flex;
		width: 616rpx;
		height:616rpx;
		margin: 0 auto;
		background: url(https://s3.music.126.net/mobile-new/img/disc-ip6.png?69796123ad7cfe95781ea38aac8f2d48=) center center no-repeat;
		background-size:100%;
		align-items: center;
		justify-content: center;
		animation: circling 20s linear infinite;
		// 播放停止下 animation 停止，旋转动画停止
		&.pause{
			animation-play-state: paused;
		}
	}
	.img {
		display: block;
		margin: 0 auto;
		width: 382rpx;
		height: 382rpx;
		border: solid 16rpx rgba(0, 0, 0, .15);
		border-radius: 50%;
	}
}
// 定义动画帧
@-webkit-keyframes circling {
	0% {
		transform: rotate(0);
	}
	100% {
		// 旋转一圈
		transform: rotate(1turn);
	}
}
```

1. 拨条设置

拨条机械臂监听播放状态进行滑动动画，由于 transform 的 rotate 属性值的旋转动画在元素中心点，这里需要更改一下 transform-origin 变换基点让机械臂顶部旋转。

```text
<view class="strip-box" :class="playState ? 'active' : ''">
	<image class="img" src="https://s3.music.126.net/mobile-new/img/needle-ip6.png?be4ebbeb6befadfcae75ce174e7db862="></image>
</view>
.strip-box{
	position: absolute;
	width:100%;
	top:142rpx;
	height: 329rpx;
	z-index: 100;
	transform: rotate(-30deg);
	// 更改旋转原点为上方中心点
	transform-origin: center 0;
	transition: transform 0.3s;
	&.active{
		transform: rotate(0deg);
	}
}
```

1. 拖拽进度条设置

播放进度可以使用 Uniapp 中的 slider 滑动选择器，滑块的位置由 curPlayTime 当前播放时间决定，滑块的滑动长度（max 最大值）由单曲音频的播放总时长 playTime 决定。

```text
<slider class="line" :value="curPlayTime" min="0" :max="playTime" @change="sliderChange" block-size="15" backgroundColor="rgba(255,255,255,.5)" activeColor="rgba(255,255,255,.5)" />
```

## 歌单（播放列表）从哪里来

在应用初始化的时候，播放列表暂时还没有，用户需要进入到 album 歌单页面选择播放列表时进入到播放页面，并到列表存在 Vuex 中。选定了播放列表后，进入到播放页。播放页拿到存储在 Vuex 的歌单数据，进行创建音频播放。

```text
// 在 H5 中存在用户刷新应用的可能，这里就要记住用户行为，利用 H5 的 localstorage 的缓存优势。如果用户刷新了应用，重新进入的时候读取缓存中数据再赋值到 Vuex 中。
// store/index.js
let storePlayList = {
	curSong: {},       // 当前播发歌曲信息
	list: [],          // 播放列表
	playState: false   // 播放状态
}
try {  // 给H5端缓存住音乐数据
    const value = uni.getStorageSync('playList');
    if (value) {
		storePlayList = JSON.parse(value)
    }
} catch (e) {
    // error
}

const store = new Vuex.Store({
	state: {
		playList: storePlayList,
	},
	mutations: {
		// 设置播放列表
		storePlayList(state, payload) {
			// 用对象扩展的方式去传值，这样就不用所有值传值覆盖
			state.playList = {...state.playList, ...payload}
			
			// 给 H5 端缓存住音乐数据
			// #ifdef H5
			uni.setStorage({
			    key: 'playList',
			    data: JSON.stringify(payload),
			    success: function () {
			        console.log('success');
			    }
			});
			// #endif
		}
	}
})
```

歌单页设置播放列表

```text
// pages/subpages/index/album.vue
methods: {
	// 设置歌单
	...mapMutations(['storePlayList']),
	setPlayList() {
		// 传递歌单信息到 store
		this.storePlayList({
			curSong: item,
			list: this.songList,
		})
		uni.navigateTo({
			url: '/pages/subpages/index/play'
		})
	}
}
```

播放页获取播放列表

```text
computed: {
	...mapState(['playList']),
},
```

根据上面的音频 API 以及歌单在 Vuex 的存取，可以创建一个全局性的背景音乐播放器了。

## 创建音频

H5 使用 uni.createInnerAudioContext() 创建并返回内部 audio 上下文 innerAudioContext 对象, App 及小程序 使用获取全局唯一的背景音频管理器 backgroundAudioManager，也就是我们所说的后台播放。

1. 后台播放的意思是将目前正在播放的播放器隐藏，但功能还在运行。后台播放的时候，播放界面是关闭（隐藏）的，对用户是不可见的，但是播放器的所有功能都是在正常运行的。这样操作的目的是方便用户播放音乐或者视频的时候的时候还可以正常操作其他软件。
2. 比如听音乐可以开启后台播放，同时可以玩其他的软件、游戏微信都可以玩。

## 平台差异说明

`uni.getBackgroundAudioManager()` 获取全局唯一的背景音频管理器 backgroundAudioManager。

| 5+App | H5   | 微信小程序 | 支付宝小程序 | 百度小程序 | 头条小程序 | QQ小程序 |
| ----- | ---- | ---------- | ------------ | ---------- | ---------- | -------- |
| √     | x    | √          | x            | √          | √          | √        |

[uni.getBackgroundAudioManager()背景音频管理器 (opens new window)](https://uniapp.dcloud.io/api/media/background-audio-manager)[uni.createInnerAudioContext()音频组件控制(opens new window)](https://uniapp.dcloud.io/api/media/audio-context)

在页面加载的时候创建一个音频：

```text
onLoad() {
	// 播放列表等信息对应vuex存储信息（computed中已引入）
	this.audioList = this.playList.list
	this.curSong = this.playList.curSong
	
	// 创建一个音频
	// #ifndef H5
		backgroundAudioManager = uni.getBackgroundAudioManager()
	// #endif
	
	// #ifdef H5
	backgroundAudioManager = uni.createInnerAudioContext();
	// #endif
	
	// 设置音频对象的方法
	this.setPlay()
	
	console.log("播放新歌曲了")
	this.playInit(1)
},
computed: {
	// 从vuex中获取歌曲信息
	...mapState(['playList']),
},
```

## 播放状态的监听

```text
methods: {
	// 设置音频对象的方法
	setPlay() {
		// 设置对应的歌曲索引
		let tempIndex = 0
		this.audioList.forEach((item, index) => {
			if (this.curSong.id == item.id) {
				return tempIndex = index
			}
		})
		this.curPlayIndex = tempIndex
		
		// 监听音频播放时，更改 playState 为 1 正在播放
		backgroundAudioManager.onPlay(() => { // 设置播放状态
			this.playState = 1
			// 传递歌单信息到 store
			this.storePlayList({
				playState: 1
			})
		})
		
		// 监听音频停止时，更改 playState 为 0 已经暂停，页面判定 playState 停止磁盘的动画
		backgroundAudioManager.onPause(() => {
			this.playState = 0
			
			// 传递歌单信息到 store
			this.storePlayList({
				playState: 0
			})
		})
		
		// 监听音频播放进度更新，更新 curPlayTime 当前播放时间，驱使播放滑块的运动
		backgroundAudioManager.onTimeUpdate((e) => {
			this.curPlayTime = Math.floor(backgroundAudioManager.currentTime)
		})
		
		// 监听音频自然播放结束，进行下一首播放，重新开始整个环节
		backgroundAudioManager.onEnded(() => {
			this.nextPlay()
		})
	},
}
```

## 获取歌曲信息以及链接

由于歌曲的信息存放在两个接口上，这里使用 async/await 以及 Promise.all 处理两个接口，促使两个接口请求完成才进行音频的设置，保证创建的音频在设置标题以及封面的时候不会报错。

```text
methods: {
	// 获取数据 初始化播放数据
	async playInit(isInit) {
		let [res0, res1] = await Promise.all([
			// 两个API接口方法返回数据
		])
		
		this.curSongItem = {...res0, ...res1}
		
		// 传递歌单信息到 store
		this.storePlayList({
			curSong: {...this.curAudio, ...this.curSongItem, ...{ playModel: this.playModel }}
		})
		
		// 新的音频歌
		/*
			设置歌曲封面等信息
		*/
		console.log("新的音频歌", this.curSongItem)
		backgroundAudioManager.title = this.curSongItem.name
		backgroundAudioManager.singer = this.curSongItem.singer
		backgroundAudioManager.coverImgUrl = this.curSongItem.picUrl
		this.playTime = this.curSongItem.time
		// 设置了 src 之后会自动播放
		backgroundAudioManager.src = this.curSongItem.src
		// h5 设置autoplay自动播放
		backgroundAudioManager.autoplay = true
		
		// #ifdef H5
		// h5 的标题信息
		uni.setNavigationBarTitle({
			title: this.curSongItem.name + ' - ' + this.curSongItem.singer + ' - 单曲 - 网易云音乐'
		})
		// #endif
	})
}
```

播放成功后，设置的音频标题、歌手名、封面图就是我们的手机在锁屏时看到的画面。

![img](https://img-repo.poetries.top/images/16f47d0b877bdd99.png)

当加载的时候获取 backgroundAudioManager 对象的 duration 时长可能存在为 NaN 或者为空的情况，这里加个定时器一直访问 duration 属性，直到拿到音频时长后销毁定时器。

```text
// 获取音频时长 playTime
let timer = setInterval(() => {
	this.playTime = Math.floor(backgroundAudioManager.duration || 0)
	if (this.playTime) {
		clearInterval(timer)
	}
}, 100)
```

## 播放进度滑块的拖拽

滑动手动更改时触发 slider 组件的 change 事件，拿到滑块所处的时间节点，并让音频跳转到指定位置并播放。

```text
sliderChange(e) {
	this.curPlayTime = e.detail.value
	backgroundAudioManager.seek(this.curPlayTime)
	// seek 跳转到指定位置，单位 s
},
```

## 播放暂停的控制

音频的播放暂停比较简单，直接调用 pause/play 方法即可实现控制，上面进行了音频播放暂停的监听，进而更改 playState 播放状态，从而改变页面动画。

```text
play() {
	if (this.playState) {
		//暂停
		backgroundAudioManager.pause()
	} else {
		//播放
		backgroundAudioManager.play()
	}
},
```

## 上一首下一首控制

上一首下一首的功能主要是改变播放列表的 curPlayIndex 索引值，改变 curPlayIndex 索引值从而改变音频播放不同的音乐。

```text
// 下一首
nextPlay(type) {
	// 顺序播放
	if (this.playModel == 0) {
		if (!type) { // 默认下一首
			this.curPlayIndex = this.curPlayIndex >= (this.audioList.length - 1) ? 0 : this.curPlayIndex + 1
		} else {
			this.curPlayIndex = (this.curPlayIndex < 1) ? this.audioList.length - 1 : this.curPlayIndex - 1
		}

	}
	// 随机播放
	if (this.playModel == 1) {
		this.curPlayIndex = Math.floor(Math.random() * 10) % this.audioList.length;
	}
	// 单曲循环保持当前索引不变

	// 再次初始化播放
	this.playInit()
},
// 上一首
prevPlay() {
	this.nextPlay(1)
},
```

## 设置播放模式

播放模式主要三种，0，1，2 三种值依次改变即可，改变并 toast 提示，页面根据 playModel 值展示对应图标。

```text
setPlayModel() {
	this.playModel = this.playModel > 1 ? 0 : this.playModel + 1
	uni.showToast({
		icon: 'none',
		title: ['列表循环', '随机播放', '单曲循环'][this.playModel]
	})
},
```

## 设置全局歌单信息

在操作歌曲的时候就需要引入 `storePlayList` 操作歌曲，重新存储歌单信息到 Vuex。

```text
methods: {
	// 设置歌单
	...mapMutations(['storePlayList']),
}
```

比如在歌单列表删除某一个曲子。

![img](https://img-repo.poetries.top/images/16f59e419e7076de.jpeg)

```text
// 删除单曲
removeItem(data) {
	// 过滤当前歌曲	
	this.audioList = this.audioList.filter(item => {
		return data.id != item.id
	})

	// 新列表更新到store
	this.storePlayList({
		list: this.audioList
	})
	// 如果删的是当前歌曲
	if (data.id == this.playList.curSong.id && this.audioList.length > 0) {
		// 重新初始化音频信息，定位到下一首，索引保持不变
		this.playInit()
	}
},
```

## 离开页面清空触发事件，防止二次进入事件累计

```text
destroyed() {
	backgroundAudioManager.onPlay()
	backgroundAudioManager.onPause()
	backgroundAudioManager.onTimeUpdate()
	backgroundAudioManager.onEnded()
},
```

上面的介绍已经基本实现了播放器的基本控制，由于平台的限制，平台都有管控，需在 manifest 中填写申请。

- ios app平台，背景播放需在 manifest.json -> app-plus -> distribute -> ios 节点添加 "UIBackgroundModes":["audio"] 才能保证音乐可以后台播放（打包成 ipa 生效）；
- 小程序平台，需在 manifest.json 对应的小程序节点下，填写"requiredBackgroundModes": ["audio"]。发布小程序时平台会审核；
- Android app 端默认不会在通知栏出现音量控制，如需此功能，需要在插件市场单独下载原生插件，[插件：通知栏+音乐控制 (opens new window)](https://ext.dcloud.net.cn/search?q=通知栏+音乐控制)。
- 由于自动播放网页中的音频或视频，会给用户带来一些困扰或者不必要的流量消耗，所以苹果系统和安卓系统通常都会禁止自动播放和使用 JS 的触发播放，必须由用户来触发才可以播放。

![img](https://img-repo.poetries.top/images/16f47d252fde616b.png)

功能已经基本满足播放的功能了，重新选歌单进入播放，随机、顺序、单曲的播放模式。有了这些功能就是一个基本的播放器了。

但是在我们第一次点击 album 歌单列表中的某首歌的时候，会进入 play 播放页，初始化创建了一个音频，歌曲开始播放。当我们 play 播放页，歌曲依然会继续播放（后台播放）。

但此时由于退出当前路由，页面的数据也已被销毁，当我们再次进入播放界面相当于重新进行页面加载了，但是音频已经创建，因此我们只需把当前音频的信息再次赋值到页面数据上。

这一点的区别就要从 Uniapp 的框架说起了。一般用 mvvm 框架去做，都会把 play 播放那一块放到应用最外面，整个应用实现共享播放界面。

如果是 vue 框架的话就会有一个主入口页面 app.vue ，示例代码：

```text
<template>
<div>
<!-- 页面路由 -->
<router-view/>
<!-- 播放器组件 -->
<player></player>
</div>
</template>
```

在进入页面的时候做一下判定，判定音频是否创建，如果有音频存在就不二次创建，不然会出现多个音频在播放。如果进入到页面播放的歌曲是当前全局的歌曲，就继续播放否则重新设置页面信息（歌名，封面等信息）。

```text
onLoad() {
	// 播放列表
	this.audioList = this.playList.list
	this.curSong = this.playList.curSong
	if (backgroundAudioManager) {  // 如果实例化了音频
		
	} else {
		// #ifdef H5
		backgroundAudioManager = uni.createInnerAudioContext();
		// #endif
		
		// 设置后台播放
		// #ifndef H5
		backgroundAudioManager = uni.getBackgroundAudioManager()
		// #endif
	}
	console.log(this.curSong.src)
	// 重新进入页面的时候判定后台音频是否为当前音频
	if (this.curSong.src && backgroundAudioManager.src && (this.curSong.src == backgroundAudioManager.src)) {
		// 维持当前歌曲
	} else { 
		let isH5 = false
		// #ifdef H5
		isH5 = true
		// #endif
		
		if (isH5 && this.curSong.src) { // H5 利用 locastorage 优势，页面刷新后播放当前储存下的歌曲
			this.playTime = this.curSong.time
			backgroundAudioManager.src = this.curSong.src
			// h5 设置autoplay自动播放
			if (this.playList.playState) {
				backgroundAudioManager.autoplay = true
			}
		} else {
			// 播放新歌  新歌分两种情况： 1，下一首原有列表的歌  2，上个页面传递的歌曲
			console.log("播放新歌曲了")
			this.playInit(1)
			return false
		}
		
	}
	
	// 重新设置歌曲信息
	this.playTime = this.curSong.time   // 歌曲总时长
	this.curPlayTime = backgroundAudioManager.currentTime   // 歌曲当前播放时间
	this.playState = !backgroundAudioManager.paused  // 播放状态
	this.playModel = this.curSong.playModel || 0    // 播放模式
	this.curSongItem.picUrl = this.curSong.picUrl  // 设置封面
	
	// #ifdef H5
	this.playState = this.playList.playState
	uni.setNavigationBarTitle({
		title: this.curSong.name + ' - ' + this.curSong.singer + ' - 单曲 - 网易云音乐'
	})
	// #endif
	
	// 设置音频对象的方法
	this.setPlay()
}
```

经过处理后，没次进入就像全局组件一样，原理就是进入到播放页面，重新把 Vuex 存储的信息再次赋值到页面上，保持与全局歌曲信息一致。

## 总结

1. 播放器的关键在音频管理对象，通过操作音频管理对象的方法实现播放/暂停/上下首的功能；
2. 播放列表从歌单页面传递到 Vuex，播放页再从中获取；
3. 各端的兼容不一样，需要做配置处理；
4. 注意 H5 不能自动播放，需要人为触发。
5. 本章代码 [uni-course-player (opens new window)](https://github.com/front-end-class/uniapp-music-code/blob/master/uni-course-player.zip)。



## 实战13—应用广告的开发

------

## sidebarDepth: 2

本节主要讲解开屏广告的做法，讲解如何在应用启动中插入广告。

## 关于开屏广告

每次打开应用，进入到首页之前，都需要等待一段时间，都会有一个 logo 的封面，然后再出现一个广告。

那个封面就是应用的启动页。启动页的作用除了缓和用户等待的焦虑情绪外，还有为 app 定调性的作用，现在有很多 app 的引导页已经变成了广告位，用以实现盈利。

那个出现的广告就是开屏广告，开屏广告是在 app 启动时出现的广告，一般展示倒数固定时间（5秒），展示完毕后自动关闭并进入 app 主页面。

### 开屏广告的来源与发展

> App 发展前期，市场上4G网络还未兴起，甚至部分地区仍存在2G的网络，缓慢的网络加之 app 自身量级的增加，致使启动时需要一定的加载时间，空白加载页的展示无疑是影响用户体验的，于是众多 app 设计了一系列启动页的加载图片或者小动画作为缓冲；但随着互联网广告商业模式的发展，广告主开始盯上这块高地，开屏页面也渐渐沦为投放广告的首要之地，后期网速虽有所提升，但开屏页已然成为媒体 app 宣传活动，广告主导流变现的一种形式。

开屏广告的跳转一般都会到广告主的落地页，这里的设计就是是到达广告主的 H5 商品页

![img](https://img-repo.poetries.top/images/16f3763e755ba805.png)

整个交互逻辑可以这样设定：广告内容可以在上一次打开应用时，开启预加载存于本地，在下次用户打开应用判断当前时间离开应用的时间是否超过一个时间段，如果超过这个时间则广告出现。用户离开时记录离开时间，给下一次进入做判断。

流程逻辑：

![img](https://img-repo.poetries.top/images/16f376423908e329.png)

首先我们先新增注册一个广告页面，并改动一下启动页，在 pages.json 设定为第一个页面（pages节点的第一项为应用入口页）。

```text
"pages": [
	{
	    "path" : "pages/account/ad",
	    "style" : {
			"navigationBarTitleText": "广告页",
			"navigationStyle": "custom",
			"app-plus":{
				"titleNView": false
			}
		}
	},
]
```

我们需要在 app.vue 入口文件判断用户进入应用以及离开应用，并记录下时间。进入应用的时间如果超过需要显示广告的时间(暂定10分钟) ，进入广告页后广告的内容及逻辑由广告页内部决定。

```text
// app.vue
onShow() {
	console.log('App Show')
	let adShowTime = (10 * 60 * 1000)  // 10分钟（单位毫秒）
	let nowTime = (new Date()).getTime()
	let leaveTime = this.$store.state.leaveTime
	if ((nowTime - leaveTime) > adShowTime) {
		console.log('出现广告吧')
		setTimeout(() => {
			uni.navigateTo({
			    url: '/pages/account/ad'
			});
		}, 10);
	}
},
onHide() {
	console.log('App Hide')
	// 记录离开时间
	this.$store.commit('storeLeaveTime')
}
```

记录的离开时间由 store 处理，方便全局调用：

```text
// store/index.js
const store = new Vuex.Store({
	state: {
		leaveTime: 0
	},
	mutations: {
		storeLeaveTime(state, payload) { // 记录离开时间
			let date = new Date()
			state.leaveTime = date.getTime()
		},
	}
})
```

在广告页里面进行处理广告内容，处理显示的广告内容，显示时间，跳转页面等。

关键代码：

```text
<view class="logo-bg">
	logo 页
</view>
<!-- 广告页 -->
<view class="ad-bg" :class="{active: isShowAd}">
	<image class="ad" :src="picture" mode="aspectFill"></image>
	<view class="close" @click="close">跳过</view>
</view>
onShow () {
	this.getAd()
	let date = new Date()
	this.startTime = date.getTime()
},
methods:{
	getAd () {
		// 初始化 isShowAd，防止缓存
		this.isShowAd = false
		apiAd().then(res => {
			let date = new Date()
			let nowTime = date.getTime()
			
			// 请求时间超过logo关闭（adWaitTime）的时间情况下直接显示广告
			if ((nowTime - this.startTime) > this.adWaitTime) {
				this.isShowAd = true
				
				this.picture = res.mock.ad
			} else { // 如果请求时间未超过logo关闭（adWaitTime）的时间情况下，等待logo关闭时间再显示广告
				let wait = this.adWaitTime - (nowTime - this.startTime)
				
				// this.closeTime = 
				setTimeout(() => {
					this.isShowAd = true
					this.picture = res.mock.ad
				}, wait)
			}
		})
		
		// 整个开屏广告不大于8秒
		this.adTimer = setTimeout(() => {
			this.close()
		}, this.adShowTime);
	},
	// 关闭广告页
	close () {
		// 清除计时器
		clearTimeout(this.adTimer)
		// 进入到首页
		uni.switchTab({
		    url: '/pages/index/index'
		});
	}
}
```

进入页面的时候显示 logo 页，加载广告完显示广告内容，然后自动关闭页面跳转到首页。

## 小结

1. 开屏广告的作用和实现逻辑；
2. 开屏广告应用的就是生命周期的使用，监听应用的生命周期完成功能。
3. 本章代码 [uni-course-实战开发开屏广告页 (opens new window)](https://github.com/front-end-class/uniapp-music-code/blob/master/uni-course-实战开发开屏广告页.zip)。



## 实战14—Node.js简单入门

------

## sidebarDepth: 2

> 凡是可以用 JavaScript 来写的应用，终将都会用 JavaScript 来写。—— Atwood 定律

Node.js 简称"服务端 JavaScript "，是基于谷歌 v8 引擎的 js 运行环境，可以让 JavaScript 在服务器端执行。相比于后端人员，JavaScript 对于前端来说再熟悉不过了，入门还是相对简单的。这章包含的内容如下：

- 安装 Node.js 及相关配置
- 常用的应用模块
- 简易 HTTP 服务器和自定义模块
- 事件驱动
- 常见的状态码

------

## 安装 Node.js 及相关配置

可从 Node.js [官网 (opens new window)](https://nodejs.cn/download/),下载对应平台的 Node 版本进行安装，一路完成即可。

完成后在命令行界面输入以下两个命令，检验是否安装成功：

```text
# node -v //查看node版本
# npm -v  //查看npm版本
```

使用 npm 命令安装模块

```text
npm install <Module Name>
```

你也可以使用 yarn 命令安装模块

```text
yarn add <Module Name>
```

关于如何安装 Node.js，这里就不赘述了，如果打印报错，请自行百度谷歌。

## 常用的应用模块

Node.js 提供了各种丰富的 JavaScript 模块库（自带的+第三方），极大简化了使用 Node.js 来扩展Web应用程序的开发。

Node Package Manager，简称 npm，是一个基于 Node.js 的包管理器，也是整个 Node.js 社区最流行、支持的第三方模块最多的包管理器。通过 npm，方便直接下载引用第三方发布模块，提高开发效率。

常用内置模块有：

- http
- path
- url
- events
- fs
- crypto加密
- os
- process

## 简易HTTP服务器和自定义模块

Node.js 基于 CommonJS 规范，主要分为模块定义、模块引用和模块标识，但 Node.js 在实现中并非完全按照 CommonJS 规范实现，而是对模块规范进行了一定的取舍。简单记住就是：引入模块用 require，输出模块用 module.exports。

网上有很多教程都会教你把所有的逻辑都放进一个用 Node.js 写的基础 HTTP 服务器里。但是如果我想加入更多的内容，同时还想保持代码的可读性呢？

实际上，只要把不同功能的代码放入不同的模块中，保持代码分离还是相当简单的。

让我们先从服务器模块开始。在项目的根目录下创建一个叫 app.js 的文件，并写入以下代码（记得动手敲起来哦）：

```text
const http = require('http');
const url = require('url'); //引用内置模块url  
http.createServer(function(req, res) {
	res.writeHead(200, {
   'Content-Type': 'text/plain'
	}); //设置头信息  
	let pathname = url.parse(req.url).pathname; //把请求网址交给url 对象处理  
	let bodyStr = ""; //定义一个变量，用来存储要输出的内容  
	if (pathname === "/") { //如果是首页   
		bodyStr = 'Hello Uniapp\n';
	} else {
		bodyStr = 'Happy Uniapp\n'; //如果是其他路径   
	}
	res.end(bodyStr); //输出内容   
}).listen(3000); //绑定端口 
console.log('Server running at https://localhost:3000/'); //控制台输出提示
```

然后在终端输入脚本：

```text
node app.js
```

接下来，打开浏览器访问 `https://localhost:3000/`，你会看到页面写着`Hello Uniapp`，如果是 `https://localhost:3000/happy`，会显示`Happy Uniapp`。

就这么简单，你已经启动了服务器。只要敲入键盘`Ctrl+C`就可以停止服务。

接下来创建一个自定义模块 testA.js 文件，并写下如下代码：

```text
function helloUniapp(){
	console.log("Hello Uniapp");
}

module.exports = helloUniapp;
```

我们在testA模块里面声明了一个`helloUniapp`函数，并且通过 module.exports 对外暴露该函数，在需要地方通过引入该模块，就可以使用`helloUniapp`函数方法。

我们再写一个 app.js 文件，引入该模块并使用

```text
const helloUniapp = require('./testA');	//引入testA模块

helloUniapp()  		// 执行showAge()函数  输出`Hello Uniapp`
```

在引用时注意引用的路径，上面两个文件是在同一目录下，所以用的相对路径。

在上面看到例如`const http = require("http")`的方式引用，这时 Node.js 会依次在内置模块、全局模块（即node_modules文件夹）下查找`http`模块，如果查找不到，就会报错！

## 事件驱动

Node.js 设计天生就是基于事件驱动。事件驱动可以理解为发布/订阅模式，当进来的一个新的请求的时候，请求将会被压入队列中，因为单线程关系，会通过一个循环来检测队列中的事件状态变化，如果检测到有状态变化的事件，那么就执行该事件对应的回调函数。

看个栗子直观理解：

```text
// 引入 events 模块
const events = require('events');
// 创建 eventEmitter 对象
const eventEmitter = new events.EventEmitter();

// 绑定 helloAction 事件
eventEmitter.on('helloAction', function(d){
   console.log(d); // 'Hello Uniapp。'
});

// 触发 helloAction 事件 
eventEmitter.emit('helloAction', 'Hello Uniapp。');

console.log("程序执行完毕。");
Hello Uniapp。
程序执行完毕。
```

## 常见的状态码

- 200 OK 服务器成功处理了请求
- 301/302 Moved Permanently（重定向）请求的URL已移走。Response中应该包含一个Location URL, 说明资源现在所处的位置
- 304 Not Modified（未修改）客户端的缓存资源是最新的，使用客户端缓存
- 400 Bad Request 传参有误
- 403 Forbidden 禁止访问，一般是没有权限
- 404 Not Found 未找到资源
- 500 Internal Server Error服务器内部错误

## 小结

本章讲了 Node.js 的几个基础知识：安装与配置，常用模块，HTTP服务，自定义模块和状态码，下一章会基于 Koa.js 框架实现简单的 Restful Api。

关于 Node.js 相关知识远远不止这些，网上专门讲 node.js 的教程和书籍有很多，我推荐《深入浅出Node.js》，可以反复看，讲得非常细致。



## 实战15—基于Koa.js实现Resful Api

这章内容内容包括：

- Koa.js 框架快速入门
- Koa 极简实现
- 常用 Koa 中间件
- 认识 Restful Api
- 实现简单的 Restful API

## Koa.js 框架快速入门

Koa 是一个 web 框架，由 Express 幕后的原班人马打造， 致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。 通过利用 async/await 函数，摆脱回调地狱，并有力地增强错误处理。Koa 并没有捆绑任何中间件，而是提供了一套优雅的中间件方法，让你自由的按需加载，这种作法褒贬不一，各大厂都会根据团队需求来封装自己 node 框架，衍生出的比较有名的有 Egg.js、nest.js、thinkjs 和 hapi，有兴趣的可以自行搜索相关资料。

Koa 应用程序是一个包含一组中间件函数的对象，它是按照类似堆栈的方式组织和执行的。 Koa 类似于其他中间件系统，然而，一个关键的设计点是在其低级中间件层中提供高级`语法糖`。 尽管提供了相当多的有用的方法 Koa 仍保持了一个很小的体积，因为没有捆绑中间件。

还是那个 Hello Uniapp 应用:

```text
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello Uniapp';
});

app.listen(3000);
```

Koa 中间件以更传统的方式级联，使用 async 功能，我们可以实现 “真实” 的中间件。

Koa 中间件包含两个参数 ctx 和 next。参数 next 是一个函数，它的作用是将处理控制权交给下一中间件。Koa 中间件采用级联代码方式执行。其中间件参数 next 的级联执行逻辑如图所示。

Koa 中间件执行顺序原理图

![img](https://img-repo.poetries.top/images/16ed107ee61bf775.jpeg)

> 执行流程，事件从最外层逐层触发，每层都会一进一出穿过两次，且最先穿入的一层最后穿出，到达最后一层最后冒泡返回。好比水分进出洋葱一样，洋葱的每层相当于中间件，水分输入相当于请求，水分输出相当于相应。

下面以`欢迎订阅，Uniapp从入门到进阶`的响应作为示例，请求开始进入中间件1，打印`欢迎订阅，`，当遇到第一个 next() 则该函数暂停并将控制传递给定义的下一个中间件2，打印`Uniapp`，遇到第二个 next() 发现没有更多的中间件执行了，于是返回打印`从入门`，再向上打印`到进阶`，然后跳出中间往下执行其他代码。

```text
const Koa = require('koa');
const app = new Koa();
// 中间件 1
app.use(async (ctx, next) => {
	console.log('欢迎订阅，')
    await next();
	console.log('到进阶')
});
// 中间件 2
app.use(async (ctx, next) => {
    ctx.body = 'Uniapp';
	await next();
	console.log('从入门')
});
app.listen(3000, () => {
    console.log('server is running at https://localhost:3000')
});
```

## Koa 极简实现

有的朋友可能之前已经了解过 Koa 的组成，网上也有很多的源码分析，我打算来简单的实现一个 mini 版本。麻雀虽小，但是核心依然是入口 Application 和 上下文 Context。

各模块的核心：

- Application：`use()`，`listen()`，`callback()`，`compose()`
- Context：整合 `req`，`res` 到 `ctx` 对象中

接下来实现入口 Application.js：

```text
const http = require('http') // 利用 http 模块
const Context = require('./Context') // 导入 Context 模块

module.exports = class Application {
    constructor() {
        this.middlewares = [] // 保存所有的中间件函数
    }

    // 构建ctx，传入到中间件集合，执行next递归
    callback() {
        return async(req, res) => {

            // 初始化ctx
            const ctx = new Context(req, res);

            //调用 compose 函数，依次处理所有中间件函数
            const fn = this.compose(this.middlewares);
            await fn(ctx)
            // 最后返回res body
            this.responseBody(ctx)
        }
    }

    // 简单粗暴处理res body
    responseBody(ctx) {
        const content = ctx.body;
        ctx.res.end(content);
        console.log(content)

        // 可加入类型判断，error错误处理流程
        // ...
    }

    // 核心：递归中间件，即所谓的 `next()` 方法，先执行第一个
    compose(middlewares) {
        return ctx => {
            const useMiddleware = i => {
                let fn = middlewares[i] //遍历中间件集合
                if (!fn) {
                    return
                }
                return fn(ctx, () => useMiddleware(i + 1)) //递归执行中间件方法，并且传到一下层
            }
            return useMiddleware(0)
        }
    }

    // 挂载中间件
    use(middleware) {
        //打包中间件集合，middleware实则是个方法
        this.middlewares.push(middleware)
    }

    // 启动服务器
    listen(...args) {
        const server = http.createServer(this.callback())
        server.listen(...args)
    }

}
```

Context.js 暂且简单做个代理：

```text
module.exports = class Context {
    constructor(req, res) {
        this.req = req
        this.res = res
    }
}
```

借用上小节的代码测试：

```text
const MiniKoa = require('./Application.js');
const app = new MiniKoa();
// 中间件 1
app.use(async(ctx, next) => {
    console.log('欢迎订阅，')
    await next();
    console.log('到进阶')
    ctx.body = 'print to body';
});
// 中间件 2
app.use(async(ctx, next) => {
    console.log('Uniapp')
    await next();
    console.log('从入门')
});
app.listen(3000, () => {
    console.log('启动 https://localhost:3000')
});
```

可以看到网页显示：“print to body”

查看终端，显示和预想一样：

![img](https://user-gold-cdn.xitu.io/2020/3/26/1711556642effecb?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 常用 Koa 中间件

随着ES6的普及，async/await 的语法受到更多开发者的青睐，Koa 作为比较早支持使用该语法的 Node 框架越来越受到大家的喜爱，虽然 Koa 本身支持的功能很有限，但官方和社区提供了很多各种功能的中间件。

- [koa-router(opens new window)](https://github.com/ZijianHe/koa-router)
- [koa-bodyparser(opens new window)](https://github.com/koajs/bodyparser)
- [koa-multer(opens new window)](https://github.com/koa-modules/multer)
- [koa-views(opens new window)](https://github.com/queckezz/koa-views)
- [koa-static(opens new window)](https://github.com/koajs/static)
- [koa-session(opens new window)](https://github.com/koajs/session)
- [koa-jwt(opens new window)](https://github.com/koajs/jwt)
- [koa-helmet(opens new window)](https://github.com/venables/koa-helmet)
- [koa-compress(opens new window)](https://github.com/koajs/compress)
- [koa-logger(opens new window)](https://github.com/koajs/logger)
- [@koa/cors@2(opens new window)](https://github.com/koajs/cors)

更多 Koa 插件可以到 [github.com/koajs/koa/w… (opens new window)](https://github.com/koajs/koa/wiki)获取。

## 认识 Restful Api

### Rest

- Rest 即表述性状态传递，Representational State Transfer 的简称；
- Rest 是一种软件架构风格；
- Rest 是一组架构约束条件和原则；
- Rest 通常基于使用 HTTP，URI，和 XML 以及 HTML 这些现有的广泛流行的协议和标准；
- Rest 通常使用 JSON 数据格式；
- Rest 是设计风格而不是标准。

### Restful

- 满足这些约束条件和原则的应用程序或设计就是 Restful

> 总结 REST 有两个最重要的原则： 1.分离性；交互的客户端和服务器除了 Restful-API 没有其他的依赖关系，限制了整个系统的复杂性，促进了各个部分的独立性。 2.无状态性：客户端和服务器之间的交互在请求之间是无状态的，从客户端到服务器的每个请求都必须包含理解请求所必需的信息。基于 Rest 架构的 Web Services 即是 Restful。

### Restful Api

- 满足上面规范的 API 接口就是 Restful-API。客户端常常通过 HTTP 方法(GET、POST、PUT、DELETE等)，来发送 API 请求；服务端常常以 JSON 数据作为响应。

> Rest 基本架构的四个HTTP方法： GET - 用于获取数据。 PUT - 用于更新或添加数据。 DELETE - 用于删除数据。 POST - 用于添加数据

## 实现简单的 Restful API

接下来，我尝试搭建简单的 Restful Api，这里直接列出代码，通过注释讲解：

```text
const Koa = require('koa');
const logger = require('koa-logger');
const Router = require('koa-router');
const cors = require('@koa/cors');
const app = new Koa();

//加入中间件
//记录日志
app.use(logger());

//支持跨域请求
app.use(cors());

// 主页
let routerHome = new Router();
routerHome.get('/', async (ctx, next) => {
    ctx.body = 'Hello Uniapp';
})

let routerRest = new Router();
routerRest.get('/list', async (ctx, next) => { // 请求 /list 路由
    ctx.body = {
        code: 200,
        msg: '请求成功',
        data: 'list列表数据'
    };
}).post('/detail/:id', async (ctx, next) => { // 请求 /detail 路由 参数 id: 10086
    ctx.body = {
        code: 200,
        msg: '请求成功',
        data: 'detail详情数据'
    };
})

// 装载所有路由
let router = new Router();
router.use('/', routerHome.routes(), routerHome.allowedMethods());
router.use('/rest', routerRest.routes(), routerRest.allowedMethods());
app.use(router.routes(), router.allowedMethods());

//监听3000端口
app.listen(3000, () => {
    console.log('server is running at https://localhost:3000')
});
```

使用 curl 命令测试 Restful Api

```text
$curl https://localhost:3000/rest/list
打印出：
{
	code: 200,
	msg: '请求成功
	data: 'list列表数据'
}
```

```text
$curl https://localhost:3000/rest/detail -X POST -H "Content-Type:application/json" -d '{"id": 10086}'
打印出：
{
	code: 200,
	msg: '请求成功',
	data: 'detail详情数据'
}
```

## 接口调试工具

目前最受大众欢迎的API接口调试工具：[postman (opens new window)](https://www.getpostman.com/)，免费的基本够用，当然你要高级的功能是收费的。

![img](https://img-repo.poetries.top/images/16f0d43611914f7b.jpeg)

因此，最近出现了一款 postman 的“老婆”：[postwoman (opens new window)](https://github.com/liyasthomas/postwoman)，免费开源、轻量级、快速的 API 调试工具，有兴趣的可以自己去尝试 ：）

![img](https://img-repo.poetries.top/images/16f0d43a8b2a4289.png)

## 小结

1. 本章通过介绍 Koajs 框架，实现一个简易 Koajs 和 Restful 风格，并且实现简单 Restful Api，目的是让你对写后端接口有个"傻瓜式"的入门，下一章我会基于 [NeteaseCloudMusicApi (opens new window)](https://binaryify.github.io/NeteaseCloudMusicApi)这个项目，来为每个入口页面提供接口。
2. 本章代码 [mini-koa (opens new window)](https://github.com/front-end-class/mini-koa)。



## 实战16—基于NeteaseCloudMusicApi

本章先来了解下 NeteaseCloudMusicApi 这个项目，并且我提前把 NeteaseCloudMusicApi 项目 fork 到了 [uniapp-music-back-code (opens new window)](https://github.com/front-end-class/uniapp-music-back-code)，方便后续接口二次开发和部署。

## NeteaseCloudMusicApi项目

NeteaseCloudMusicApi，网易云音乐 NodeJS 版 API。

![image-20210215160547033](https://img-repo.poetries.top/images/image-20210215160547033.png)

### 在线文档

[front-end-class.github.io/uniapp-musi…(opens new window)](https://front-end-class.github.io/uniapp-music-back-code/)

### 安装

```text
$ git clone https://github.com/front-end-class/uniapp-music-back-code.git
$ npm install
```

### 运行

```text
$ node app.js
```

服务器启动默认端口为 3000,若不想使用 3000 端口,可使用以下命令: Mac/Linux

```text
$ PORT=4000 node app.js
```

windows 下使用 git-bash 或者 cmder 等终端执行以下命令:

```text
$ set PORT=4000 && node app.js
```

成功启动打开浏览器访问：

![image-20210215160559284](https://img-repo.poetries.top/images/image-20210215160559284.png)

### 接口二次开发

使用 NeteaseCloudMusicApi 项目可以友好的使用网易云的接口，但是还是需要注意一些接口问题。毕竟网易云并没有把 app 应用的接口暴露出来，在 Uniapp 项目中使用特定业务的接口就需要数据模拟来完成了。

NeteaseCloudMusicApi 项目中的 app.js 处理接口是根据文件夹 module 下的文件名称进行接口定义的。比如 banner.js 文件里面处理了网易云的接口再二次转发到客户端。

这样客户端访问 localhost:3000/banner 接口就可以访问到数据了。相关代码：

```text
// app.js
// 读取 module 目录下的所有文件
fs.readdirSync(path.join(__dirname, 'module')).reverse().forEach(file => {
    if (!file.endsWith('.js')) return
	// 提取文件的名称
    let route = (file in special) ? special[file] : '/' + file.replace(/\.js$/i, '').replace(/_/g, '/')
	// 文件的请求promise
    let question = require(path.join(__dirname, 'module', file))
	
	// 以文件名称作为接口路径
    app.use(route, (req, res) => {
        let query = Object.assign({}, req.query, req.body, { cookie: req.cookies })
		// 处理请求响应
        question(query, request).then(answer => {
            res.append('Set-Cookie', answer.cookie)
            res.status(answer.status).send(answer.body)
        }).catch(answer => {
            if (answer.body.code == '301') answer.body.msg = '需要登录'
            res.append('Set-Cookie', answer.cookie)
            res.status(answer.status).send(answer.body)
        })
    })
})
```

以上面代码处理作为引导，我们可以在目录下新建一个 mock 文件夹处理模拟数据，也是以文件命名的方式作为接口名。以上面代码的重新改造即可。

*注：NeteaseCloudMusicApi 项目是基于 express 开发*

项目存在跨域的可能性，express 有一个 npm 模块 cors 处理跨域问题，使用非常简洁方便。

安装模块

```text
npm i cors -D
```

模块使用

```text
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
```

注：添加中间件要注意顺序。

看一下 app.js 完整代码：

```text
const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const request = require('./util/request')
const packageJSON = require('./package.json')
const exec = require('child_process').exec
const cache = require('apicache').middleware
const cors = require('cors');

// version check
exec('npm info NeteaseCloudMusicApi version', (err, stdout, stderr) => {
    if (!err) {
        let version = stdout.trim()
        if (packageJSON.version < version) {
            console.log(`最新版本: ${version}, 当前版本: ${packageJSON.version}, 请及时更新`)
        }
    }
})

const app = express()

app.use(cors());

// CORS & Preflight request
app.use((req, res, next) => {
    if (req.path !== '/' && !req.path.includes('.')) {
        res.set({
            'Access-Control-Allow-Credentials': true,
            // 'Access-Control-Allow-Origin': req.headers.origin || '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
            'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
            'Content-Type': 'application/json; charset=utf-8'
        })
    }
    req.method === 'OPTIONS' ? res.status(204).end() : next()
})

// cookie parser
app.use((req, res, next) => {
    req.cookies = {}, (req.headers.cookie || '').split(/\s*;\s*/).forEach(pair => {
        let crack = pair.indexOf('=')
        if (crack < 1 || crack == pair.length - 1) return
        req.cookies[decodeURIComponent(pair.slice(0, crack)).trim()] = decodeURIComponent(pair.slice(crack + 1)).trim()
    })
    next()
})

// body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// cache
app.use(cache('2 minutes', ((req, res) => res.statusCode === 200)))

// static
app.use(express.static(path.join(__dirname, 'public')))

// router
const special = {
    'daily_signin.js': '/daily_signin',
    'fm_trash.js': '/fm_trash',
    'personal_fm.js': '/personal_fm'
}

// mock 本地数据
fs.readdirSync(path.join(__dirname, 'mock')).reverse().forEach(file => {
    if (!file.endsWith('.js')) return
    let route = (file in special) ? special[file] : '/' + file.replace(/\.js$/i, '').toLowerCase().replace(/_/g, '/')
    let question = require(path.join(__dirname, 'mock', file))

    app.use(route, (req, res) => {
        // res.status(200).send(question)
        let query = Object.assign({}, req.query, req.body, { cookie: req.cookies })
        question.promise(query, request).then(answer => {
            console.log('[OK]', decodeURIComponent(req.originalUrl))
            console.log(answer)
            res.append('Set-Cookie', answer.cookie)

            answer.body.mock = question.mock
            res.status(answer.status).send(answer.body)
        }).catch(answer => {
            console.log('[ERR]', decodeURIComponent(req.originalUrl))
            if (answer.body.code == '301') answer.body.msg = '需要登录'
            res.append('Set-Cookie', answer.cookie)
            res.status(answer.status).send(answer.body)
        })

        return
    })
})

fs.readdirSync(path.join(__dirname, 'module')).reverse().forEach(file => {
    if (!file.endsWith('.js')) return
    let route = (file in special) ? special[file] : '/' + file.replace(/\.js$/i, '').replace(/_/g, '/')
    let question = require(path.join(__dirname, 'module', file))

    app.use(route, (req, res) => {
        let query = Object.assign({}, req.query, req.body, { cookie: req.cookies })
        question(query, request).then(answer => {
            console.log('[OK]', decodeURIComponent(req.originalUrl))
            res.append('Set-Cookie', answer.cookie)
            res.status(answer.status).send(answer.body)
        }).catch(answer => {
            console.log('[ERR]', decodeURIComponent(req.originalUrl))
            if (answer.body.code == '301') answer.body.msg = '需要登录'
            res.append('Set-Cookie', answer.cookie)
            res.status(answer.status).send(answer.body)
        })
    })
})

const port = process.env.PORT || 3000

app.server = app.listen(port, () => {
    console.log(`server running @ https://localhost:${port}`)
})

module.exports = app
```

## 注册腾讯云和安装软件

1. 注册腾讯云和申请域名，这里按照官方指导操作就可以
2. 我选的系统是 CentOS 7.5 64位，申请完登录，进入腾讯云，

![img](https://img-repo.poetries.top/images/16f0e2ba26392d06.jpeg)

选择标准方式`登录`，密码注册时已发`消息中心`里，建议修改密码

![img](https://img-repo.poetries.top/images/16f0e2c039f347b4.jpeg)

登录成功

![img](https://img-repo.poetries.top/images/16f0e2c43574a011.jpeg)

接下来依次键入命令安装几个软件：

- Node.js
- pm2
- nginx

```text
yum install -y nodejs
yum install -y git
yum install -y nginx
```

Node.js 安装完成就可以使用 npm 安装 pm2

```text
npm install pm2 -g
```

pm2 是 node 进程管理工具，可以利用它来简化很多 node 应用管理的繁琐任务，如性能监控、自动重启、负载均衡等，而且使用非常简单。pm2 功能很强大，入门确非常简单，常用的几个命令是：

```text
pm2 start app.js -n uni 启动一个进程并把它命名为 uni
pm2 list/ls 列出所有进程信息
pm2 logs 显示所有进程日志
pm2 stop all 停止所有进程
pm2 restart all 重启所有进程
pm2 reload all 0秒停机重载进程 (用于 NETWORKED 进程)
pm2 stop 0 停止指定的进程
pm2 restart 0 重启指定的进程
pm2 startup 产生 init 脚本 保持进程活着
pm2 delete 0 杀死指定的进程
pm2 delete all 杀死全部进程
pm2 monit 查看进程的资源消耗情况
pm2 start app.js -i max // -i 表示 number-instances 实例数量 max 表示 PM2将自动检测可用CPU的数量 可以自己指定数量
pm2 start app.js -n uni --watch 在文件改变的时候会重新启动程序
pm2 startup centos 设置pm2开机自启
pm2 save 保存设置
```

了解更多可以查看 [官方文档 (opens new window)](https://pm2.keymetrics.io/docs/usage/quick-start)。

## 部署项目至腾讯云

首先拉取一份代码到本地 [uniapp-music-back-code (opens new window)](https://github.com/front-end-class/uniapp-music-back-code)，然后回到腾讯云后台并输入：

```text
git clone https://github.com/front-end-class/uniapp-music-back-code.git
#之后需要更新可以输入命令：git pull

# 进入文件夹
cd uniapp-music-back-code

# 安装npm包
npm install

# 使用pm2启动
pm2 start app.js -n uni

# 查看状态
pm2 list
```

![img](https://img-repo.poetries.top/images/16f0e2cf41d39a44.jpeg)

已经启动成功，打开浏览器通过域名或 ip（公网ip） 访问。

![img](https://img-repo.poetries.top/images/16f0e2d23894bb5e.jpeg)

## 安装Shell软件

对于操作后台管理系统，更多人会选择可视化的软件。Windows 系统一般推荐就是 Xshell，对于 Mac 系统的，我使用 FinalShell（支持国产的，也没找到更傻瓜的）。 也是一路安装，然后配置（Xshell 也是类似操作）：

![img](https://img-repo.poetries.top/images/16f0e2de534eac5e.jpeg)

登录成功之后：

![img](https://img-repo.poetries.top/images/16f0e2e31f41f14b.jpeg)

尝试输入：

```text
pm2 list
# 出现上文启动的 uni 项目日志
```

## 配置Https

众所周知，小程序接口需要使用 https，我们可以利用腾讯云提供的免费 [SSL 证书 (opens new window)](https://console.cloud.tencent.com/ssl)来配置 https，点击免费申请按钮，选择域名型的（DV）免费证书即可：

![img](https://img-repo.poetries.top/images/16f0e2e66cf7914b.jpeg)

填上申请信息后，等待大概半小时，证书就能申请下来。

![img](https://img-repo.poetries.top/images/16f0e2e90b3cc88b.jpeg)

在证书申请通过后，进入SSL证书列表，将所申请的域名SSL证书下载到本地后，再上传到域名所在服务器。

回到 FinalShell，在 `/etc/nginx/` 下创建文件夹 ssl

```text
# 也可以选择输入命令
cd /etc/nginx/
mkdir ssl
```

将 crt 和 key 两个文件(公钥和私钥)修改好名字上传到 ssl 文件夹

![img](https://img-repo.poetries.top/images/16f0e2eee37e98f6.jpeg)

修改 nginx 配置文件

```text
vi /etc/nginx/nginz.conf
```

修改server配置

```text
server{
      listen 80;    #表示监听80端口
      server_name gzamon.wang www.gzamon.wang;
      location / {    #将80端口强制转为https
          rewrite (.*) https://www.gzamon.wang$1 permanent;
      }
}
server{
      listen 443 ssl;    #表示监听443端口即https
      server_name gzamon.wang www.gzamon.wang;
      ssl_certificate /etc/nginx/ssl/1_www.gzamon.wang_bundle.crt;   #证书公钥文件路径
      ssl_certificate_key /etc/nginx/ssl/2_www.gzamon.wang.key;      #证书私钥文件路径
      ssl_session_timeout 5m;                                         #5分钟session会话保持
      ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
      ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
      ssl_prefer_server_ciphers on;
      
      location / {    #将80端口强制转为https
        root /home/nginx/uni-music;  # H5 打包后项目放置目录
        #固定写法就可以了
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
      }
		
      location /api/ {
          proxy_pass https://127.0.0.1:3000/; # node后端接口服务
          proxy_redirect   off;
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

保存并重启 nginx

```text
sudo service nginx restart
```

如果报错：

```text
Job for nginx.service failed because the control process exited with error code. See "systemctl status nginx.service" and "journalctl -xe" for details.
# 输入 systemctl status nginx.service 会提示是什么错误，修复后再次重启 nginx 即可
```

如果没有报错你就可以使用 https 访问网站了 ：）

演示地址： [uni-music (opens new window)](https://www.gzamon.wang/)[api接口服务(opens new window)](https://www.gzamon.wang/api/)

参考文档：

- (域名型证书申请流程)[[cloud.tencent.com/document/pr… (opens new window)](https://cloud.tencent.com/document/product/400/6814)]
- (腾讯云实现全站 HTTPS 方案)[[cloud.tencent.com/document/pr… (opens new window)](https://cloud.tencent.com/document/product/400/6813)]

## 通过 Docker 部署

### 安装 Docker

首先在腾讯云上安装 Docker，参照官方极简教程，成功是分分钟事，[搭建 Docker 环境 (opens new window)](https://cloud.tencent.com/developer/labs/lab/10054)。

要知道是否安装成功，执行命令：

```text
docker -v
```

![img](https://img-repo.poetries.top/images/17106178ce21ebc0.jpeg)

代表安装成功。

### Dockerfile 文件

Dockerfile是个关键，它包含各种执行指令，Docker 能够读取 Dockerfile 的指定进行自动构建容器。

在项目根目录新建 Dockerfile，执行命令：

```text
touch Dockerfile
```

放入以下代码：

```text
FROM mhart/alpine-node:9

WORKDIR /app
COPY . /app

RUN rm -f package-lock.json \
    ; rm -rf .idea \
    ; rm -rf node_modules \
    ; npm config set registry "https://registry.npm.taobao.org/" \
    && npm install

RUN npm install pm2 -g

EXPOSE 3000
CMD ["pm2-runtime", "start", "app.js", "-n", "uni-docker"]
```

这个文件包含了以下命令：

- FROM mhart/alpine-node:9 - 指定使用最新版本的node基础镜像
- WORKDIR /app - 将容器内工作目录设置为/app
- COPY . /app - 将宿主机当前目录下内容复制到镜像/app目录下
- RUN rm / RUN npm install - 删除文件，设置npm源，再执行npm install安装应用所需的包
- EXPOSE 3000 - 对外开放容器的3000端口
- CMD ["pm2-runtime", "start", "app.js", "-n", "uni-docker"] - 在容器启动时，执行的命令，通过 pm2 来统一管理应用

### 构建镜像

编写完 Dockerfile 文件后，就可以通过 `docker build` 命令来构建镜像：

```text
sudo docker build -t uni-back .
```

![img](https://img-repo.poetries.top/images/171061734823539d.jpeg)

等待构建成功，执行命令查看：

```text
docker images
```

![img](https://img-repo.poetries.top/images/1710617043a9db24.jpeg)

### 运行容器

镜像构建完成后，就可以通过 `docker run` 运行容器，从而实现应用的 docker 化部暑。

执行命令：

```text
sudo docker run -d --name uni-back -p 3000:3000 uni-back
```

![img](https://img-repo.poetries.top/images/1710616ba45059a9.jpeg)

代表启动成功，通过你的域名+/api/ 访问。

### 查看状态

记得上面说得 `pm2 list` 来查看应用信息，在 docker 里查看命令需换成 `docker exec`：

```text
 docker container ls -a  #查看容器信息，例如 CONTAINER ID
 docker exec -it CONTAINER ID pm2 list
```

![img](https://img-repo.poetries.top/images/171061608f01a79e.jpeg)

uni-docker 运行一切良好，部署完成。

## Serverless

目前市面流行有另一种方案 —— Serverless，我在之前项目中分别使用过 Leancloud，小程序云开发和知晓云，重点在于编写云函数，提交部署，前端结合相关的 SDK 调用各自线上的服务，以操作后台的增删改查，对于简单的项目是非常便利的，可以做到快速集成上线，对于不熟悉后端的同学省去了搭建后端服务的时间。

最新版 HBuilderX 已经支持云开发，详细点击 [uniCloud (opens new window)](https://uniapp.dcloud.io/uniCloud/README)了解，后续我会尝试加入相关代码。

## 小结

1. 本章通过注册开通腾讯云，安装Shell软件，搭建云服务，编写 nginx，配置 https，基于 NeteaseCloudMusicApi 部署项目接口。如果你跟着一步步操作，会发现当前的云服务部署相比以前的购买空间（服务器）部署，那是相当简易了。
2. 本章代码 [uniapp-music-back-code (opens new window)](https://github.com/front-end-class/uniapp-music-back-code)。



## 实战17—发布与上线

------

## sidebarDepth: 3

到这里，音乐项目基本门面是有了（添砖加瓦的事留给有兴趣的朋友，自己动动手指），把东西分享到社区让大伙使(zhao)用(cha)，想想就兴奋。本章我简单谈谈如何发布为三端应用：微信小程序，安卓 app 和 ios app。

## 微信小程序发布

1. 申请微信小程序 AppID，参考：[微信教程 (opens new window)](https://developers.weixin.qq.com/miniprogram/dev/#申请帐号)；
2. 在 HBuilderX 中顶部菜单依次点击 "发行" => "小程序-微信"，输入小程序名称和 AppID 点击发行即可在 `unpackage/dist/build/mp-weixin` 生成微信小程序项目代码；

![img](https://img-repo.poetries.top/images/16f51c54f7f89344.jpeg)

1. 在微信小程序开发者工具中，导入生成的微信小程序项目，测试项目代码运行正常后，点击 "上传" 按钮，之后回到小程序后台按照 "提交审核" => "发布" 小程序标准流程，逐步操作即可，详细查看：[微信官方教程(opens new window)](https://developers.weixin.qq.com/miniprogram/dev/quickstart/basic/release.html)

## 安卓app打包发布

### 云打包（个人应用推荐使用）

1. 工具栏，选择"原生App-云打包"；

![image-20210215161111012](https://img-repo.poetries.top/images/image-20210215161111012.png)

1. 弹出配置界面，勾选需要的平台 Android 或 ios；

![img](https://img-repo.poetries.top/images/16f51c5e87f23f4a.jpeg)

1. 这里我选择"使用[公共测试证书 (opens new window)](https://ask.dcloud.net.cn/article/36522)"演示，真正发行还是要选择"使用[自有证书 (opens new window)](https://ask.dcloud.net.cn/article/35777)"，点击打包按钮；

![img](https://img-repo.poetries.top/images/16f51c6210c4cea9.jpeg)

1. 等待控制台，提示消息，成功后会出现下载地址，点击下载 .apk 文件，安装至手机即可。

![img](https://img-repo.poetries.top/images/16f51c66594ef2d3.jpeg)

### 本地打包（企业应用推荐使用）

1. 安装 [Android Studio (opens new window)](https://developer.android.google.cn/studio/)，配置安卓开发环境；
2. 下载 DCloud 官方 [SDK (opens new window)](https://ask.dcloud.net.cn/article/103)；
3. 用 HBuilderX 生成本地打包文件；

![img](https://img-repo.poetries.top/images/16f51c6a1eb06b85.jpeg)

![img](https://img-repo.poetries.top/images/16f51c6d2a99ac68.jpeg)

1. 替换官方 SDK 里面的文件夹（HelloH5）为 "__UNI__EDA8210"（这里是我的 uniapp 应用标识，你的会不同）；
2. 修改配置文件；

> 返回 Android Studio 修改文件 dcloud_control.xml，修改 id 为打包资源的 manifest.json 的 id 值：

![img](https://img-repo.poetries.top/images/16f51c70c826c3b3.jpeg)

1. 打包.apk。

![img](https://user-gold-cdn.xitu.io/2019/12/29/16f51c77de5325e2?imageslim)

注：本地打包稍微复杂，如果打包不成功，建议详细参照以下资料再试试。

参考资料：

- [uni-app 离线打包日记（安卓）(opens new window)](https://www.jianshu.com/p/a44b1e6fe27e)
- [Android 平台本地（离线）打包指南 - Android Studio(opens new window)](https://ask.dcloud.net.cn/article/508)

### Android应用发布平台

如果你使用自有证书打包的应用，可以发布到各大应用平台，以下列出目前使用比较多的 Android 应用发布平台：

| 开放平台              | 应用商店                                                     |
| --------------------- | ------------------------------------------------------------ |
| 腾讯开放平台          | [应用商店(opens new window)](https://sj.qq.com/)             |
| 华为开发者社区        | [华为应用市场(opens new window)](https://appstore.huawei.com/) |
| 小米开放平台          | [小米应用商店(opens new window)](https://app.mi.com/)         |
| 阿里应用分发开发平台  | [豌豆荚(opens new window)](https://www.wandoujia.com/)       |
| OPPO开放平台          | [OPPO软件商店(opens new window)](https://www.heytapmobi.com/) |
| 魅族开放平台          | [魅族应用商店(opens new window)](https://app.flyme.cn/)       |
| vivo开放平台          | [vivo手机助手(opens new window)](https://zs.vivo.com.cn/)     |
| Google Play开发者后台 | [Google Play(opens new window)](https://play.google.com/)    |
| 360移动开放平台       | [360手机助手(opens new window)](https://zhushou.360.cn/)      |
| 百度移动开放平台      | [百度手机助手(opens new window)](https://shouji.baidu.com/)  |

注：各平台有发布需要注意的点，审核还是挺严格的，一定要看清楚规范，否则会发布失败。

## ios app打包发布

### 云打包

和安卓的类似，测试需使用越狱手机和选择越狱证书，正式发布必须使用苹果的开发者帐号生成的[证书 (opens new window)](https://appstoreconnect.apple.com/)：

![img](https://img-repo.poetries.top/images/16f51c7b7a6ee38b.jpeg)

### 原生打包

Apple 公司对应用的审核非常严格，所以在开始发布应用程序之前，请确保符合 Apple 的[AppReview Guidelines (opens new window)](https://developer.apple.com/app-store/review/)。为了将应用发布到 App Store，需要注册一个[苹果开发者账号 (opens new window)](https://developer.apple.com/)。

1. 安装 [Xcode (opens new window)](https://developer.apple.com/xcode/resources/)，配置 ios 开发环境；
2. 下载 DCloud 官方 [SDK (opens new window)](https://ask.dcloud.net.cn/article/103)；
3. 接下来和安卓本地打包类似，参考[ ios 离线打包 (opens new window)](https://ask.dcloud.net.cn/article/41)，这里不赘述，如有问题可以给我留言探讨。

参考资料：

- [ios 证书(.p12)和描述文件(.mobileprovision)申请(opens new window)](https://ask.dcloud.net.cn/article/152)
- [HBuilderX 生成本地打包 App 资源(opens new window)](https://ask.dcloud.net.cn/question/60254)
- [uni-app 项目离线打包 ios 平台注意事项(opens new window)](https://ask.dcloud.net.cn/article/35871)
- [iTunes Connect 开发者指南(opens new window)](https://developer.apple.com/support/app-store-connect/)

## 小结

本章使读者快速了解三端打包发布的流程和操作，希望读者可以亲自尝试操作熟悉一遍。

项目的打包发布上线是项目开发的一个小里程碑阶段（真实项目开发会不断经历 "需求" => "开发" => "测试" => "发版" 的循环体），也意味着进阶篇也到小里程碑的阶段，接下来是我在开发中碰到的总结干货。



# 其他

## 福利1—优化

这章谈谈在开发中的一些常用优化方案

## setData

先科普下小程序架构，来源于官方介绍：

#### 双线程设计

- 逻辑层：创建一个单独的线程去执行 JavaScript，在这个环境下执行的都是有关小程序业务逻辑的代码
- 渲染层：界面渲染相关的任务全都在 WebView 线程里执行，通过逻辑层代码去控制渲染哪些界面。一个小程序存在多个界面，所以渲染层存在多个 WebView 线程

![image-20210215153202861](https://img-repo.poetries.top/images/image-20210215153202861.png)

#### 双线程通信

前面我们知道，逻辑层和渲染层的通信会由 Native （微信客户端）做中转，逻辑层发送网络请求也经由 Native 转发。

![image-20210215153218219](https://img-repo.poetries.top/images/image-20210215153218219.png)

- 1.在渲染层把 WXML 转化成对应的 JS 对象。
- 2.在逻辑层发生数据变更的时候，通过宿主环境提供的 setData 方法把数据从逻辑层传递到 Native，再转发到渲染层。
- 3.经过对比前后差异，把差异应用在原来的 DOM 树上，更新界面。

再科普下 setData 做的事情：

> 在数据传输时，逻辑层会执行一次 JSON.stringify 来去除掉 setData 数据中不可传输的部分，之后将数据发送给视图层。同时，逻辑层还会将 setData 所设置的数据字段与 data 合并，使开发者可以用 this.data 读取到变更后的数据。

我们知道，用户的一次交互，如点击某个按钮，开发者的逻辑层要处理一些事情，然后再通过 setData 引起界面变化。这样的一个过程需要四次通信：

- 渲染层 -> Native（点击事件）
- Native -> 逻辑层（点击事件）
- 逻辑层 -> Native（setData）
- Native -> 渲染层（setData）

因此频繁调用，视图会一直更新，阻塞用户交互，这样的操作流程会导致用户体验卡顿，引发性能问题。

知道原理后，我们可以采取以下方法：

- 首次加载 —— 读取接口的时候，尽量不要做 setData 操作
- 合并更新 —— 避免频繁的去 setData
- 局部更新 —— 减少数据传递时间和渲染效率
- wxs —— 在一定程度上缓解了微信小程序架构中跨线程通信的开销，具体可以查看官方文档 [wxs(opens new window)](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxs/)

## 尽可能多用原生组件

因为小程序是 Hybrid 应用，除了 Web 组件的渲染体系，还有原生组件的渲染。

它有几个好处：

- 绕过 setData、数据通信和重渲染流程，使渲染性能更好。
- 扩展 Web 的能力。比如像输入框组件（input, textarea）有更好地控制键盘的能力。
- 体验更好，同时也减轻 WebView 的渲染工作。比如像地图组件这类较复杂的组件，其渲染工作不占用 WebView 线程，而交给更高效的客户端原生处理。

它也有坏处：

- 原生组件的层级会比所有在 WebView 层渲染的组件要高
- 样式无法应用到原生组件上

## 分屏渲染，延迟加载

- 首屏模块和非首屏模块。简单说就是首页接口合理拆分，先加载首屏模块，再夹在非首屏模块，以此确保首屏内容以最快速度呈现。一次大量的setData会导致页面的卡住。
- 弹窗、右侧浮窗可以等主页面渲染完成再延迟1-2秒加载数据。
- 如果首页比较长，位于3屏之后的数据，有部分用户不一定会查看到的，可以延迟加载也可以选择滚动到距离底部“100px”再加载（例如首页“精选视频”模块），适当减少请求。

## 骨架屏

Skeleton Screen，相比于 loading 菊花图效果，骨架屏只是从感官上提升了用户体验，对性能没太多帮助（可能会消耗更多），相对于菊花图技术上会稍微复杂，请自行取舍。

![image-20210215153354442](https://img-repo.poetries.top/images/image-20210215153354442.png)

## 动画效果

由于架构的原因，频繁执行耗时逻辑改变视图，会造成动画掉帧。尽量用 css3 的动效，比如 fade-in-right/fade-out-right。

## 分包策略

小程序可以分主包和分包，主包是入口的文件包，其余可以归为分包。

当用户第一次打开小程序，会先下载好所有代码，然后再加载页面；当用户再次进入时，会直接使用已下载的代码，省去了代码下载的过程，打开速度更快。

微信小程序每个分包的大小是2M，总体积一共不能超过8M。 支付宝小程序每个分包的大小是2M，总体积一共不能超过4M。

我们公司最近开发的一款小程序，

- 在使用分包之前，压缩后的代码量大概是 2.23M，每个新用户第一次都需要下载的全部代码才能进入页面，差不多花费3秒时间才进入小程序。
- 使用分包机制后，主包大小控制在 1M 左右，平均1秒左右就可以进入小程序，下载时间大约降低了60%。

文件结构：

├── apis ├── components ├────... ├── pages 主包根目录 ├────index 首页 ├────my 我的 ├────... ├── subPages 分包根目录 ├────search 搜索页分包 ├────shopcart 购物车页分包 ├────...

## 本地图片压缩

- 推荐一个网站[tinypng (opens new window)](https://tinypng.com/)，非常好用，它采取更严格的压缩算法在不失真情况下做到最优的输出。
- 转成base64。
- 小程序的 `image` 组件可以支持 JPG、PNG、SVG、WEBP、GIF 等格式。尽可能利用 WEBP 格式优势，对比无损压缩体积比 PNG 小 26%，有损压缩体积比 JPEG 小 25-34%。
- 利用 `image` 组件自带 `lazy-load` 懒加载属性（但是有要求：在即将进入一定范围（上下三屏）时才开始加载）。

## 压缩代码，清理无用的代码

- 小程序打包是会将工程下所有文件都打入代码包内，从而影响到整体代码包的大小。
- 通过配置 project.config.json 文件的 packOptions 属性的 ignore ，可以排除不必要打包的文件，例如：因为本地集成组件库的文档，开发时需要查看，但是打包上传就应该忽略。

## 图片放cdn

- 这个不赘述，主要利用cdn优势。

## 图片延迟加载

- 所谓的懒加载策略，用户没有滚动到可视区域内的图片不必渲染，好处是避免资源浪费和减少渲染消耗。通过监听 onPageScroll 方法来操作，不过要注意 scroll 的消耗。
- 也有利用 intersectionObserver 这个api，具体用法可以自行百度。

## 接口合并

- 属于HTTP优化策略，一个请求经过三次握手四次挥手，所以尽可能通过后端合并接口，做到减少接口请求次数。

## 缓存数据

- 不常变的数据，可以采取缓存策略，例如，省市区的这类元数据。
- 缓存接口数据，放入 Vuex 或 globalData，减少重复请求。

## 防抖节流

这两个含义多数童鞋反馈搞不清，我来通俗点描述：

#### 防抖 debounce

- 当重复执行某个方法时，只有最后的那次方法，在到达设定的间隔时间才会执行。
- 多用于 input 的输入时，显示匹配的输入内容的情况。

#### 节流 throttle

- 设定的单位时间内，第一次触发函数并执行，之后 n 秒内不管触发多少次，都不执行。直到下一个单位时间n秒，第一次触发函数并执行，可以理解为间隔执行。
- 多用于页面scroll滚动，或者窗口resize，或者防止按钮重复点击等情况

最标准的当属 `lodash` 库的两个方法，[debounce (opens new window)](https://www.lodashjs.com/docs/latest#debounce)，[throttle (opens new window)](https://www.lodashjs.com/docs/latest#throttle)，有兴趣的可以查看源码。

## 内存告警

当 iOS/Android 向小程序进程发出内存警告时，会触发 `wx.onMemoryWarning()` 事件。我们可以利用这个 API 来收集机型终端，版本号，页面路径等信息，上传至监控平台（例如：Sentry）来做针对性地做优化。

## 长列表

小程序官方提供了一个 [长列表组件 recycle-view (opens new window)](https://developers.weixin.qq.com/miniprogram/dev/extended/functional/recycle-view.html)，和 Vue 的长列表 [vue-virtual-scroll-list (opens new window)](https://github.com/tangbc/vue-virtual-scroll-list)思路相似，基本实现就是监听 scroll 事件，并且重新计算需要渲染的数据，不需要渲染的数据留一个空的 div 占位元素。

## lazyCodeLoading

通常情况下，在小程序启动期间，所有页面及自定义组件的代码都会进行注入，当前页面没有使用到的自定义组件和页面在注入后其实并没有被使用。

自基础库版本`2.11.1`起，微信小程序支持有选择地注入必要的代码，以降低小程序的启动时间和运行时内存。

```js
{
  "lazyCodeLoading": "requiredComponents"
}
```

当配置了这一项时，微信小程序仅注入当前页面需要的自定义组件和页面代码，在页面中必然不会用到的自定义组件不会被加载和初始化。添加这项配置后，未使用到的代码文件将不被执行。

## 小结

本章主要通过了解小程序架构，介绍小程序开发的一些优化手段，不仅仅限定于这些，技术在发展，我们也需要不断踩坑填坑中向前走。



## 福利2—坑点、槽点

------

## sidebarDepth: 2

这章主要介绍下我在做 Uniapp 开发时的一些各端的坑及解决方案。

- 在小程序中的原生组件，如果在他的上部有元素，元素的层级会失效
- 阻止事件冒泡时要在外层加一层标签 `<view @tap.stop="stop"></view>`，直接加 `.stop` 方法无效
- 不要用`v-show`，可以用 `v-if` 或者通过class绑定来解决
- 弹出层的遮罩要阻止页面滚动，可以在遮罩的 touchmove 事件中加上 `@touchmove.prevent=""` 默认事件
- swiper有默认高度，不写高度会无法渲染，需要动态计算图片宽高以覆盖

```html
    <swiper :style="{height: `${imageHeight}px`}">
        ...
    </swiper>
```

- swiper动态加载数据，先前是多数组，加载后只有一组数据时，图片会显示空白，原因是之前切换了`current`，加载后数据对不上，尝试把`current`设置为`0`
- 图片，接口等地址（业务域名和服务器域名）必须是`https`，在真机会无法显示或报错，但模拟器调试不影响
- 主页面的生命周期用 onLoad 代替 created，onReady 代替 mounted，组件内使用原来的created 与 mounted
- webview 组件地址参数如果有中文，会报错，调试也很难发现，在构建地址前先用 `encodeURIComponent` 转义
- 图片加载过程中会先变形，瞬间又恢复正常，可以用 `height：auto` 解决
- image标签之间存在小细缝，可以设置`display:block`和`font-size:0`
- 做吸顶效果时，安卓大多数机型还是不支持 `position: sticky`
- 微信用户头像域名有`wx.glogo.cn`，也有`thirdwx.qlogo.cn`
- 菊花码扫码地址只支持32位长度，并且返回的数据存在`options.scene`里
- 微信小程序组件的`getRelationNodes`和头条小程序的返回值写法不统一，而且头条小程序子组件里不能用`key`这个关键字，导致在父组件获取子组件值一直为空，可以尝试变成`keys`
- 抖音里的小程序原生下拉刷新无效，今日头条里正常 (2020-11-25)
- 抖音里的小程序`<block tt:for=>`无效，乖乖的用`<view>`吧

## 小程序最新订阅消息

[官方文档(opens new window)](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/subscribe-message.html)

- 调试只能在真机中，本地开发者工具的wx原型链是没有 requestSubscribeMessage 方法的会报错
- 只能是用户点击触发
- 有微信版本限制，[requestSubscribeMessage方法详解(opens new window)](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/subscribe-message/wx.requestSubscribeMessage.html)

## 小程序自定义预处理命令

这里有必要说下， [自定义预处理命令 (opens new window)](https://developers.weixin.qq.com/miniprogram/dev/devtools/debug.html#自定义预处理)，官方文档写得确实不敢恭维，文档像是一笔带过，全靠悟，难道是觉得可有可无，没人用的意思？！要知道没点经验的同学，那是完全不知如何使用。

微信开发者工具，右上角有个详情 => 本地设置 => 启用自定义处理命令，命令支持 `node`，`bash`语法。

![image-20210215153509111](https://img-repo.poetries.top/images/image-20210215153509111.png)

来个栗子：自动切换本地开发环境，我使用 nodejs 编写命令

开发环境配置文件`./config/config.js`

![image-20210215153524752](https://img-repo.poetries.top/images/image-20210215153524752.png)

为防止上传代码时，团队成员忘了切回正式环境，强制做`上传前预处理`，把本地`ENV = dev`，切回 `ENV = prod`

```js
const FS = require('fs')
//读取文件，并且替换文件中指定的字符串
let replaceFile = function(filePath, sourceRegx, targetStr) {
    FS.readFile(filePath, function(err, data) {
        if (err) {
            return err
        }
        let str = data.toString()
        str = str.replace(sourceRegx, targetStr)
        FS.writeFile(filePath, str, function(err) {
            if (err) return err
        })
    })
}
FS.readdir('./config', function(err, files) {
    if (err) {
        return err
    }
    if (files.length != 0) {
        files.forEach((item) => {
            let path = './config/' + item
            //判断文件的状态，用于区分文件名/文件夹
            FS.stat(path, function(err, status) {
                if (err) {
                    return err
                }
                let isFile = status.isFile() //是文件
                let isDir = status.isDirectory() //是文件夹
                if (isFile) {
                    replaceFile(path, /const ENV = \"dev\"/g, 'const ENV = \"prod\"')
                }
                if (isDir) {
                    console.log("文件夹：" + item)
                }
            })
        })
    }
})
```



## 福利3—宽屏适配

------

## sidebarDepth: 3

最近（20201014）`Uniapp`官方在`HBuilderX 2.9.3`版本更新中，增加了PC宽屏适配的功能，在写下本章时该功能只支持`H5`端，这章来尝尝鲜。

[官方文档 (opens new window)](https://uniapp.dcloud.net.cn/adapt)介绍得很详细，这章我打算以我的看法来介绍。

目前适配主要大致分为两种：

1. 框架级适配 -- 在 `page.json` 增加配置项，可选有`leftWindow`、`rightWindow`、`topWindow`
2. 组件级适配 -- 使用`match-media`组件

## 框架级适配

`leftWindow`、`rightWindow`、`topWindow`，顾名思义就知道代表`左右上`的位置，从用户体验和产品角度，这种模式对使用范围还是有所约束，适合上导航，左分类，右内容的布局，对，我说的就是`后台管理系统`。

![image-20210215153634259](https://img-repo.poetries.top/images/image-20210215153634259.png)

首先，在`page.json`里加入配置：

```js
{
  "globalStyle": {

  },
  "topWindow": {
    "path": "responsive/top-window.vue", // 指定 topWindow 页面文件
    "style": {
      "height": 60
    },
    "matchMedia": {
      "minWidth": 0
    }
  },
  "leftWindow": {
    "path": "responsive/left-window.vue", // 指定 leftWindow 页面文件
    "style": {
      "width": 300
    }
  },
  "rightWindow": {
    "path": "responsive/right-window.vue", // 指定 rightWindow 页面文件
    "style": {
      "width": "calc(100vw - 400px)" // 页面宽度
    },
    "matchMedia": {
      "minWidth": 768 //生效条件，当窗口宽度大于768px时显示
    }
  }
}
```

然后建立目录和文件`responsive/right-window.vue`，加入用于显示右内容的代码：

```html
<!--responsive/right-window.vue-->
<template>
  <view>
    <pages-detail-artDetail ref="detailPage"></pages-detail-artDetail>
  </view>
</template>
```

`responsive/top-window.vue`，加入用于显示上导航的代码：

```html
<!--responsive/top-window.vue-->
<template>
  <view>
    <view class="logo">logo</view>
    <pages-head-nav ref="navPage"></pages-head-nav>
  </view>
</template>
```

这里要说明一下，`<pages-detail-artDetail>`组件是**按照目录结构**来命名的，他表示的是`pages -> detail -> artDetail文件`，

![image-20210215153649007](https://img-repo.poetries.top/images/image-20210215153649007.png)

组件数据渲染通过`uni.$emit`和`uni.$on`通信获取：

```js
<!--父-->
uni.$emit('updateDetail', {
  detail: encodeURIComponent(JSON.stringify(detail))
})
<!--子-->
uni.$on('updateDetail', (e) => {
  this.$refs.detailPage.load(e.detail);
})
```

## 组件级适配

`match-media`组件是媒体查询适配组件，用于动态屏幕适配，可以在页面多次使用。

在`match-media`组件中放置内容，并为组件指定一组`media query`媒体查询规则，如屏幕宽度。运行时，如屏幕宽度满足查询条件，这个组件就会被展示，反之则隐藏。

```html
<template>
    <view>
        <match-media :min-width="375" :max-width="800">
          <view>当页面最小宽度 375px， 页面宽度最大 800px 时显示</view>
        </match-media>

        <match-media :min-height="400" :orientation="landscape">
          <view>当页面高度不小于 400px 且屏幕方向为纵向时展示这里</view>
        </match-media>
    </view>
</template>
```

![image-20210215153708460](https://img-repo.poetries.top/images/image-20210215153708460.png)

![image-20210215153719791](https://img-repo.poetries.top/images/image-20210215153719791.png)

页面小于375px，第一段代码被隐藏了。

## 小结

1. PC宽屏适配这个功能的出现，预示着`Uniapp`实现了全平台开发，是一个里程碑。
2. 相信不久的将来，会有更多自适应组件和插件出来，改进开发方式，提高开发效率，少点996，多点955 😃。