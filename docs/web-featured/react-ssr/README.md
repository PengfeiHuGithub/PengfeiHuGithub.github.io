# React SSR服务端渲染与同构实践

本节标题：「武装思想」-`React SSR vs SSR vs CSR`

本节主旨：通过全面对比三种渲染模式，阐述为什么需要 `react ssr`

# 开篇

本文主要来介绍下`SSR`、`CSR`、`React SSR` 这三种渲染方式以及各自的优缺点。

![image-20210214205624262](https://img-repo.poetries.top/images/image-20210214205624262.png)

## 什么是 SSR

`SSR` 的全称是`Server Side Rendering`，对应的中文名称是:服务端渲染，也就是将渲染的工作放在服务端进行。

这种方式很早就存在，早在 `Ajax`出现之前全部都是这种方式， 由服务端返回给浏览器完整的 `html` 内容。

浏览器得到完整的结构后就可直接进行 `DOM` 的解析、构建、加载资源及后续的渲染。

参考下图 `jd` 的产品详情，`html` 内包含具体的数据

![image-20210214205429292](/Users/poetry/Library/Application Support/typora-user-images/image-20210214205429292.png)

### SSR 优缺点

这种页面（html）直出的方式可以让页面首屏较快的展现给用户，对搜索引擎比较友好，爬虫可以方便的找到页面的内容，非常有利于`SEO`。

不好的地方就是所有页面的加载都需要向服务器请求完整的页面内容和资源，访问量较大的时候会对服务器造成一定的压力，另外页面之间频繁刷新跳转的体验并不是很友好。

## 什么是 CSR

与 `SSR` 对应的就是 `CSR`，全称是 `Client Side Rendering`，也就是客户端渲染。

它是目前 `Web` 应用中主流的渲染模式，一般由 `Server` 端返回初始 `HTML` 内容，然后再由 `JS` 去异步加载数据，再完成页面的渲染。

客户端渲染模式中最流行的开发模式当属`SPA`（单页应用），所以后文都会基于`SPA`进行说明。

这种模式下服务端只会返回一个页面的框架和`js` 脚本资源，而不会返回具体的数据。

参考 `弹个车www.tangeche.com`，只有一个页面骨架和所需要的静态资源。

### CSR（SPA） 优缺点

页面之间的跳转不会刷新整个页面，而是局部刷新，体验上有了很大的提升。

单页应用中，只有首次进入或者刷新的时候才会请求服务器，只需加载一次`js css`资源，页面的路由维护在客户端，页面间的跳转就是切换相关的组件所以切换速度很快，另外数据渲染都在客户端完成，服务器只需要提供一个返回数据的接口,大大降低了服务器的压力。

所以后来就有了 `web app`的叫法，也是为了突出这种体验很像是`Native App` 。

`SPA`这种客户端渲染的方式在整体体验上有了很大的提升，但是它仍然有缺陷 - 对 `SEO` 不友好，页面首次加载可能有较长的白屏时间。

## SSR VS CSR(SPA)

找了很久才找到这个图，相信看过之后就明白了。

下面这张图，是同一个应用，用两种不同的方式去渲染时页面的加载时序。

![image-20210214205451258](https://img-repo.poetries.top/images/image-20210214205451258.png)

- 橙色部分为页面背景色，对应了常规意义上的白屏时间

可以看到，从内容可见的时间上，`SSR`比`CSR`更快。

这是由于 `SSR` 的工作原理，决定了它的优势，这种差异在弱网环境下会体现的更加明显。

`SPA`（客户端渲染） 方式比 `SSR` (服务端渲染) 模式在体验和性能上有了很大的提升。

`SPA` 好处有很多，但缺点也很明显。

`SEO` 不够友好：有些网站的流量来源主要还是靠搜索引擎，所以网站的 `SEO` 效果 还是很重要的，而 `SPA` 模式页面数据非直出，搜索引擎爬虫拿不到具体的数据，所以无法对网站的内容进行识别和分类，得不到网站的关键词和描述信息，就无法进行排名，甚至不会被收录。结果就是在搜索引擎里搜不到你的站点。

首次白屏等待：在 `SPA` 模式下，第一次打开页面我们得到的是一个`html` 框架，不包含内容。数据的渲染需要等待页面`js css`资源加载完成,且执行时再发起异步数据请求，然后等数据返回后，再进行渲染，渲染完成后用户才能看到最终的页面。

这样做会直接降低页面的首屏展现时间，也就是“白屏”等待，这个时间的长短和客户端的网络环境也密切相关，可能长也可能短，特别是在移动互联网环境下，对首屏加载性能影响很大。对于用户来说，当然是想更快的看到内容。

## React SSR

到这里我们已经了解了 `SSR` 和 `CSR` 的概念以及优缺点。它们自身的亮点很多，但是瑕疵也很多。

`SPA` 模式下，虽然体验上来了，也降低了服务端的压力。但是还不算完美，仍有缺陷。

**那么有没有一种完美的方式呢？**

既然发现了问题，那就要想办法解决这个问题。

我们先来分析下。

**确定问题：其实就两个问题**

- `SEO`不友好
- 首次白屏等待。

以上两个问题是在传统 `SSR` 模式下是不存在的,因为服务端会直接返回完整的`html`数据。

所以如果要解决这个问题我们只能让数据直出 `SSR` 了。

但如果这样做的话，`SPA` 的优势就没有了，技术上没有任何进步。

### SSR + SPA 完美的结合

只实现 `SSR` 没什么意义，技术上没有任何改进，否则 `SPA` 技术就不会出现。

但是单纯的 `SPA` 又不够完美，所以最好的方案就是这两种技术和体验的结合。

第一次打开页面是服务端渲染，基于第一次访问，用户的后续交互是 `SPA` 的效果和体验，于此同时还能解决`SEO`问题，这就有点完美了。

单纯实现 `SSR` 很简单，毕竟这是传统技术，且和语言无关，随便用 `php` 、`jsp`、`asp`、`node` 等都可以实现。

下面用 `node` 实现一个基本的 `ssr`

1. 创建一个 `node` 服务
2. 模拟数据请求方法 `fetchData`
3. 将`fetchData`结果转换为 `html` 字符串
4. 输出完整的 `html` 内容

效果如下

![image-20210214205526745](https://img-repo.poetries.top/images/image-20210214205526745.png)

```text
const http = require('http');

//模拟数据的获取
const fetchData = function () {
    return {
        list: [{
                name: '包子',
                num: 100
            },
            {
                name: '饺子',
                num: 2000
            }, {
                name: '馒头',
                num: 10
            }
        ]
    }
}

//数据转换为 html 内容
const dataToHtml=(data)=>{
   
    var html='';
    data.list.forEach(item=>{
        html += `<div>${item.name}有${item.num}个</div>`
    });

    return html;
}

//服务
http.createServer((req, res) => {

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    const html = dataToHtml(fetchData());

    res.end(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>传统 ssr</title>
</head>
<body>
    <div id="root">
       ${html}
    </div>
</body>
</html>
</body>
`);

}).listen(9001);

console.log('server start...9001');
```

但是要实现两种技术的结合，同时可以最大限度的重用代码（同构），减少开发维护成本，那就需要采用 `react` 或者 `vue` 等前端框架和`node(ssr)`相结合的方式来实现。

`csr` 和 `react ssr` 从用户体验上来说差别不大，只是首次访问页面是 `ssr`直出，后续交互是 `spa`。

大家可以访问 `https://m.xin.com/` 来体验下 `react ssr` 的体验，`spa` 的话可以体验下掘金，可同时右键查看源码,只有一个`html`骨架。

本文主要说 `React SSR` ,当然 `VUE`同样能实现，毕竟原理相同，只是技术栈不同而已。

`React SSR` 实现并不复杂，根据官方的说明，实现一个简单的组件直出也是分分钟。

但是这只能是个 `demo`，并不能应用到实际的项目开发中。

如果想用 `react ssr` 开发实际项目，我们就需要一个完整的开发框架，类似 `nuxt.js` `next.js`这样的框架，所以接下来我们将从`react ssr` 的原理出发，徒手实现一个完整的应用开发骨架。

请大家记住，我们要实现的是一个通用的应用开发骨架，有了这个骨架我们就可以快速的进入各种项目的业务开发，而不用关心 `SSR` 具体实现细节。

# 小结

本文主要是介绍了`SSR` `CSR`的概念，同时分析对比了它们的优缺点，最后引出了一种完美的实现方式`CSR+SSR`，也是我们后续实现`React SSR`的重要铺垫。

另外通过本文可以清晰的理解`SSR+CSR` 应用的优势以及该应用所独有的体验特点，让我们从宏观上对这种应用有一种基础的认知。



# React SSR根本原理

# 武装思想

在动手搭建应用骨架前我们要先了解下`react ssr` 最根本的原理，这是整个技术架构实现的基础，也可以说是基石，可以理解为我们盖房子的地基。

![image-20210214205804054](https://img-repo.poetries.top/images/image-20210214205804054.png)

如果你对一些多技术感觉到陌生或者看过很多次仍然会忘记时，主要原因要么是用的少，要么就是不理解其中的原理，导致印象不够深刻。

深入理解原理对于我们的开发和创新（自己造轮子）有很大的帮助，原理可以一步一步的带你走正确的路。

或许你之前觉得`react ssr` 这个技术很高大上，学起来没有头绪，无从下手。

在我看来 `react ssr`实现起来并不复杂，这个突破口就是从原理出发，一点一点的进行分析，然后通过代码校验你的分析。

`react ssr` 原理很容易理解，但是仅仅理解这点还不够足以搭建应用骨架，其中最有难度的内容应该是同构。

那么什么是同构？如何实现同构应用呢？

下面请听我慢慢叨叨。我叨叨的同时也会引出问题，希望大家能在看的同时也一起思考起来。

我们上一节说过，传统的`ssr`和目前流行的`csr`方案`spa`都不够完美，所以我们需要能综合这两者优点的技术 - `react ssr (SPA+SSR)`。

![image-20210214205821750](https://img-repo.poetries.top/images/image-20210214205821750.png)

每次刷新页面的时候数据是从服务端直出，然后后续的访问就是 `spa` 的体验，即能解决`SEO`问题，也能保持页面切换的效率，服务器的压力要比传统的`ssr`也相对小。

我们现在既然已经知道了该技术的作用和意义，那么接下来就该分析下它的原理了。

为什么`react`能够实现 `SPA+SSR` 这种体验呢 ?

## 虚拟 dom

使用`react ssr`技术开发出的最终产物其实就是`SPA+SSR`的结合。

其中的`SSR`指的是在服务端渲染组件。

而组件可以在服务端渲染的根本原因就是`虚拟 DOM`。

平时我们都习惯使用`jsx`来编写`react` 的组件。但`jsx`只是一个抽象的语法糖，看上去是写组件，其实我们写的是对象，只是这样写更方便，更符合我们前端开发者的编写习惯，看上去就像写`html`，多爽。

虚拟 `DOM` 除了在渲染时用于提高渲染性能，以最小的代价来更新视图的作用外，另一个作用就是为组件的跨平台渲染提供可能。

虚拟`DOM`本身 就是一个内存中的对象，通过对象的属性来描述要渲染的具体是什么元素以及内容。

举个栗子

下面是我们一个组件的`render`部分

```text
<ul id='list'>
  <li class='item'>1</li>
  <li class='item'>2</li>
  <li class='item'>3</li>
</ul>
```

上面的结构可以转换为下面的对象表示（虚拟 dom）

```text
const tree = {
  tag: 'ul', // 节点标签名
  props: {       // DOM的属性，用一个对象存储键值对
    id: 'list'
  },
  children: [    // 该节点的子节点
    {tag: 'li', props: {class: 'item'}, children: ['1']},
    {tag: 'li', props: {class: 'item'}, children: ['2']},
    {tag: 'li', props: {class: 'item'}, children: ['3']},
  ]
}
```

从上面我们可以看出这就是个普通对象。

既然有了这样的对象，我们就可以轻松的把这个对象转换我们想要的表现形式，比如 `html`格式，而这个`html`就是我们要直出的内容。

不过这个转换的过程不需要我们来完成，`react`已经帮我们完成，其本身就已提供了内置方法来支持服务端渲染。

## 同构

`React` 虚拟 `DOM` 为我们实现 `SSR` 提供了基础条件，但是单纯的 `SSR` 和 传统的 `SSR` 没有什么区别，`React`中的 组件也只能用作其他模板语言的代替品。。。

那么为什么还要基于`React`来实现`SSR`呢？

既然这种技术能够出现，肯定是因为有他独特的魅力和优点。

我们要明白一点，服务端渲染的核心作用。

`SSR`主要是直接表达出页面最基础和核心的内容这就够了。

剩下的工作就要交给浏览器了，浏览器端需要对页面的交互完成进一步的渲染、事件绑定等增强功能。

说到这里好像有点明白了，意思不就是服务端把首屏的内容直出，让用户更快的看到页面，然后后面的数据采用`js`来异步请求和加载。貌似不用`react`一样可以做到的呀。

诶，好像说的没啥毛病。确实方案不只一种，但是我们基于`react`来实现可以更高效，写更少的代码。因为我们可以构造同构应用。

所谓同构，就是指前后端公用一套代码，比如我们的组件可以在服务端渲染也可以在客户端渲染，但都是同一个组件。这样的方式应该是可以甩传统方式好几条街了把。

当然打造同构应用还有另外一个得天独厚的条件，双端使用同一种语言 - javascript。

`SSR` 部分我们使用`node`就能完成,所以我们才可以编写同一套代码供双端执行。

另外还有一个重要的特性也是同构的重要体现,浏览器接管页面后的进一步渲染（交互、事件）过程中，会判断已有的`DOM`结构和浏览器渲染出的结构是否相同，若相同，则不重复渲染，只需要绑定事件即可。

当然上面的这个特性是`react`提供的双端节点对比功能，也是为了最大限度的提高页面的渲染效率，尽可能的重用服务端给出的`html`结构。

## 打造同构应用

说了这么多其实本质还是`react`的能力，有了它的支持才能玩的转，这当然也得力于`node`。

说到这里，可能有同学会这样认为，既然`react`都为我们提供了，那我们实现起来就很方便了呀。和我们做`SPA`应用的时候差不多吧，只写一套代码，然后在服务端调用下`react`服务端渲染的相关 `api` ，浏览器端也不需要管，`react`也帮我们搞定了。

说的好像没啥毛病，但是打造同构应该不是仅仅调用几个`api`的事儿，如果你只是打算写一个`demo`玩玩，我觉得是可以的。

同构的最大优点是双端可以公用一套代码，但它是一把双刃剑，因为他还涉及到服务端，所以复杂性大大增加。

另外双端也不是完全能公用一套代码，还需要做很多差异化的处理。不只是代码层面的，还会涉及到架构和工程化。

虽然我们已经了解了`react ssr`的最核心的原理，但是并不能保证你能迅速的开发出这样体验的应用。

所以我们需要一个轮子，这个轮子本身已经帮我们完备了双端的差异处理，开发者只需要关心自身业务逻辑，开发中无差异化。

而这个轮子就是我们接下来要一步一步实现的`React SSR`应用开发骨架。

## 双端对比机制

上面也提到了这个概念，这里需要详细的说明一下。

为了实现服务端渲染，打造同构应用，`React`内部实现了相关的`API`，可以让我们方便的将一个组件转换为`html`字符串。

下面介绍几个`API`

```text
import ReactDOMServer from 'react-dom/server'
```

`ReactDOMServer` 类可以帮我们在服务端渲染组件 - 得到组件的 `html` 字符串。

下面是介绍该模块的两个方法

- renderToString()

```text
ReactDOMServer.renderToString(element)
```

把一个`React`组件渲染为原始的`HTML`。

我们可以用这个方法在服务端生成`HTML`字符串，然后将该字符串返回给浏览器端，完成页面内容的初始化，同时让搜索引擎可以抓取你的页面来达到优化`SEO`的目的。

另外在`react 16`前该方法生成的`html`内容的每一个`DOM`节点都有一个`data-react-id`属性，根节点会有一个`data-react-checksum`属性。

组件在服务端渲染后，在浏览器端还会渲染一次，来完成组件的交互等逻辑。渲染时，`react`在浏览器端会计算出组件的`data-react-checksum`属性值，如果发现和服务端计算的值一致，则不会进行客户端渲染。所以`data-react-checksum`属性的作用是为了完成组件的双端对比。

如果两个组件的`props`和`DOM`结构是相同的，那么计算出的该属性值就是一致的。

也可以换个角度来理解，当双端渲染的组件的`props`和`DOM`结构一致时，那么该组件只会渲染一次，客户端会采用服务端渲染的结果，仅作事件绑定等处理，这会让我们的应用有一个非常高效的初次加载体验。

ps:`data-react-checksum`属性值是通过`Adler-32`校验算法实现的。有兴趣的可以了解下此算法，这里就不详细说明了。

- renderToStaticMarkup()

```text
ReactDOMServer.renderToStaticMarkup(element)
```

该方法就比较轻量了，仅仅是为了将组件渲染为`html`字符串，不会带有`data-react-checksum`属性。

和上面方法的能力不同，当然使用场景也不同，如果只是单纯服务端渲染的话可以用该方法，性能肯定要比上面的方法高，因为不需要计算嘛，还能减少直出的内容体积。

### 性能提升

咱们上面说的都是`react 16`以前的，现在是什么样的呢？

从`react 16`开始，服务端渲染`renderToString`方法渲染的结果不再有`data-react-*`属性，当然也相应的提供了一个客户端渲染`API` - `ReactDOM.hydrate()`，从使用上来说和`ReactDOM.render()`没有差别。

在浏览器端渲染时，该方法会最大限度的保留服务端使用`renderToString()`渲染的内容，同时添加事件绑定等交互。

- renderToNodeStream 和 renderToStaticNodeStream

另外 `react 16` 在性能上还做了改进，提供了可以将组件转换为字节流的`renderToNodeStream`方法。

其实使用`renderToNodeStream`或者`renderToString`对最终的渲染结果没有影响。不过`renderToNodeStream`的性能要好的多，可以有效缩短`TTFB`时间。

因为组件渲染为字符串，是一次性处理完后才开始向浏览器端返回结果。而采用流的话，可以边读边输出，可以要让页面更快的展现，缩短首屏展现时间。

![image-20210214205842755](https://img-repo.poetries.top/images/image-20210214205842755.png)

那么`renderToStaticNodeStream`可以结合 `renderToStaticMarkup`理解下，作用应该很明了了。

## 同构应用流程图

上面我们介绍了很多理论性的知识，可能不够具象。

为了加强理解我准备了一张同构应用的流程图。

![image-20210214205908252](https://img-repo.poetries.top/images/image-20210214205908252.png)

# 小结

本节我们主要从原理来了解下`react ssr`技术，目的是希望能对该技术有更深的理解和认识。

另外可以根据同构应用流程图来对我们的应用骨架有个宏观的认识，后面我们就要进入实践阶段，一步一步的来打造我们的应用骨架了。

**造轮子，所需要的工具**

```text
node10.14  其实支持async await的版本就可以
react16.8 
react-router5 
redux
redux-thunk
webpack4 
babel7 
koa2 ，小册里使用 koa2，当然用 express 也可以
...其他的一些插件和库，细节在后面说明
```



# 实现最基本的React SSR

本节配套代码:

## 正文

上一节我们介绍了`react ssr`的核心原理。

这一节我们就来实操一下，实现一个单纯的 `react ssr`功能，这有点像是写一个`hello world`。

在服务端渲染 `react` 组件，得到组件的 `html` 内容，然后将`html`字符串返回给浏览器端。

## 准备工作

**安装 `react` 库**

```text
npm i react react-dom
```

**安装 `babel`**

`react` 代码不能直接运行，需要先经过 `babel` 编译。

`babel7`和之前版本安装有所不同,是一次重大的升级，所有的包都放在了`@babel` 下面。

```text
npm i @babel/core @babel/cli @babel/preset-react
```

## 创建组件

创建一个 `Index` 组件

```text
const React = require('react');
//组件
class Index extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <h1>hello react ssr !</h1>
    }
}
```

## 创建 http 服务

使用`node http` 模块创建服务,然后调用 `react`服务端渲染`renderToString` 方法将组件转换为 `html` 字符串。

```text
//node http 模块
const http = require('http');

//服务端渲染方法
const { renderToString } = require('react-dom/server');

//创建服务
http.createServer((req, res) => {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        //将组件转换为 html
        const html = renderToString(<Index/>);
        
            res.end(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>传统 ssr</title>
        </head>
        <body>
            <div id="root">
               ${html}
            </div>
        </body>
        </html>
`);

    }
).listen(9001);//服务监听9001端口
```

## 代码编译

启动服务之前，使用 `babel` 进行代码转换。

这里我们使用 `babel cli` 命令模式行来编译代码。

```text
npx babel index.js --out-file index-compiled.js --presets=@babel/preset-react
```

编译后的文件为：`index-compiled.js`

ps: `npm` 从 `5.2` 版开始，增加了 `npx` 命令，使用 `npx` 命令可以调用项目内的模块，而不用再需要全局安装这个模块。

该命令执行的时候会自动安装 `npx`。

转换后的代码

```text
class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
   //jsx 语法转换为了 React.createElement 方法
    return React.createElement("div", null, "hello react ssr!");
  }

}
```

## 运行服务

```text
node index-compiled.js
```

访问:`https://localhost:9001/`

![image-20210214210106774](https://img-repo.poetries.top/images/image-20210214210106774.png)

查看网页源代码可以看到组件的 `html` 内容

![image-20210214210149308](https://img-repo.poetries.top/images/image-20210214210149308.png)

ok，到这里我们就实现了最基本的`react ssr`，当然这很简陋，也仅仅是个 `demo`，不过可以帮助我们具象的理解如何实现直出一个组件。

不要小看它，它可以帮我们引出一系列的问题，引导我们逐步的实现一个完整的 `ssr` 应用骨架。

## 小结

这一节，我们实现了一个非常简单的组件直出的功能，同时对我们的理论知识进行验证。

其实可以看出，这和我们平时开发`spa`的项目时编写的组件没什么区别，他是可以在服务端运行的，当然这得利于一个天然的条件 - 双端的语言都是`javascript`。

你可以试试给组件传递一些参数，然后看看渲染效果。

本节完整代码:

[github.com/Bigerfe/koa…(opens new window)](https://github.com/Bigerfe/koa-react-ssr/tree/better/packages/base-react-ssr)



# 初步认识同构_交互实现

## 正文

上一节，我们实现了一个`react ssr`版的`hello world`，让我们对服务端组件直出有了一个基本的了解。

单纯的`ssr`也没啥意义，也只能把组件当做一个模板来用，连个最基本的交互都没有。

比如：我想点击页面某个元素的时候给我一个反馈提示。

![image-20210214213314606](https://img-repo.poetries.top/images/image-20210214213314606.png)

ok ，这不就是增加一个事件么，这个太简单了吧，代码信手拈来。

```text
//组件
export default class Index extends React.Component {
    constructor(props) {
        super(props);
    }

   handlerClick(){
       alert('一起来玩 react ssr 啊');
   }

    render() {
        return <h1 onClick={this.handlerClick}>click here!</h1>
    }
}
```

其实结果可想而知，这个事件根本不会执行的。

**这是为什么呢？**

我们都知道元素事件是基于浏览器执行的，只有在浏览器端执行了相应的 `js` 代码才能绑定事件。

在上一节我们实现的这是一个 `ssr` 直出效果，也就是说只是一个静态页面。

所以我们需要让代码在浏览器端也执行一次，组件在浏览器端挂载完后`react`会自动完成事件绑定。

**浏览器也执行一次代码，组件不会重复渲染吗？**

浏览器接管页面后，`react-dom`在渲染组件前会先和页面中的节点做对比，只有对比失败的时候才会采用客户端的内容进行渲染,且`react`会尽量多的复用已有的节点。

## 初识同构

**那需要写两套代码？**

既然客户端和服务端都要执行，那是不是就要写两份代码，供双端使用?

当然不需要，也完全不合理。

这正是我们本节的重点 - **同构**。

基于同构，浏览器和服务端可以运行同一份代码，服务端直出组件后，浏览器接管页面，然后剩下的工作由浏览器来完成。

## 客户端代码执行

经过上面一些理论的分析，我们已经清楚的了解到我们应该做什么。

现在回到正题，来实现元素事件的绑定。

### 如何实现？

大家应该都做过`react spa`项目，大部分情况都是 请求页面后服务器返回了一个页面的基本框架，同时包括 `js css` 等静态资源。

所以这里我们第一步要先把`js`代码打包，在服务端`ssr` 时,同时将这个 `js` 资源输出就可以了。

如图

![image-20210214213332426](https://img-repo.poetries.top/images/image-20210214213332426.png)

### 实现思路说明

为了方便开发我们从这里开始使用 `koa2`来构建 `http` 服务。

另外统一双端的模块化方式，在 `node` 端也使用 `es6 module` 方式进行模块的引入，但是在`node` 端不能运行，所以需要使用 `babel` 进行编译。

```text
npx babel xxx.js 
```

**整体实现思路**

- 使用 `koa` 创建一个基础 `http` 服务，可以直出 `Index` 组件。
- 然后编写客户端代码，增加 `Index` 组件的渲染入口，使用`react-dom` 库渲染 `Index` 组件。
- 然后使用 `webpack` 将`js`代码打包到一个文件内 `index.js` 内。
- 服务端直出的时候输出这个 `js` 资源到浏览器。
- 在运行前，需要使用`webpack`将客户端代码编译打包，使用`babel cli`打包编译服务端代码。

### 安装插件、工具、库

```text
react react-dom //react 基础库
@babel/core @babel/cli //babel 基础库
@babel/preset-react //编译 react 代码
@babel/preset-env //配置 babel 编译的一些选项
babel-loader //编译 js 代码
webpack webpack-cli   //webpack 两个核心库
koa2 //web 开发框架
koa-static //实现静态资源的访问
```

ps:`@babel/preset-env` 是一个预设集合，代替了以往的 `stage-*` `babel-preset-es2015`等包，可以根据开发者的配置，按需加载插件,还可以通过设置`target`属性对`node` 或者`浏览器`端进行编译输出设置。

### 具体实施

**创建基础 `http` 服务**

```text
// /app.js 

//web 服务启动入口文件
//这是一个中间件，它用于处理web 请求，实现react ssr，将组件转换为 html字符串

const reactSsr  = require('./dist/src/server/middlewares/react-ssr').default;
const Koa = require('koa2');
const koaStatic =require('koa-static');
const path = require('path');

const app = new Koa();

//设置可访问的静态资源，我们把 webpack 打包后的代码放到/dist/static目录下
app.use(koaStatic(
        path.join(__dirname, './dist/static')
));

//react ssr 中间件
app.use(reactSsr);

//启动服务
app.listen(9001);

console.log('server is start .9001');
```

**react ssr 中间件**

直出组件的同时， 将`index.js`代码资源直出到浏览器端。

```text
<script type="text/javascript"  src="index.js"></script>
// ./src/server/middlewares/react-ssr.js

//完成 react ssr 工作的中间件,组件在服务端渲染的逻辑都在这个文件内

//引入Index 组件
import React from 'react';
//引入index 组件
import Index from '../../client/pages/index';
import { renderToString} from 'react-dom/server';

export default  (ctx,next)=>{

    const html = renderToString(<Index/>);
    ctx.body=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>my react ssr</title>
</head>
<body>
    <div id="root">
       ${html}
    </div>
</body>
</html>
<script type="text/javascript"  src="index.js"></script>//这里绑定了 index.js代码，浏览器会下载后执行
`;

    return next();
}
```

**Index组件定义**

```text
// /src/client/pages/index/index.js
//index 组件

import React from 'react';

//组件
export default class Index extends React.Component {
    constructor(props) {
        super(props);
    }

   handlerClick(){
       alert('一起来玩 react ssr 呀。');
   }

    render() {
        return <h1 onClick={this.handlerClick}>click here!</h1>
    }
}
```

**实现组件在浏览器端渲染和挂载**

浏览器端执行组件渲染的入口文件,也是 `webpack` 进行资源构建的 `entry` 入口。

```text
// ./src/client/app/index.js

import React from 'react';
import ReactDom from 'react-dom';
import Index from '../pages/index';

//渲染 index 组件 到页面
ReactDom.hydrate(<Index />, document.getElementById('root'))
```

**webpack 配置**

```text
// ./webpack/webpack.dev.config.js

const path = require('path');

//定一个通用的路径转换方法
const resolvePath = (pathstr) => path.resolve(__dirname, pathstr);

module.exports = {
    mode: 'development',
    entry: resolvePath('../src/client/app/index.js'),//入口文件
    output: {
        filename: 'index.js', //设置打包后的文件名
        path: resolvePath('../dist/static')//设置构建结果的输出目录
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
}
```

**babel 配置**

个人习惯喜欢把配置单独放在`.babelrc`里面，当然也可以放到 `webpack` 配置文件内。

```text
{
    "env": {
        "development": {
            "presets": [
                [
                    "@babel/preset-env",
                    {
                        "targets": {
                            "browsers": [
                                ">1%",
                                "last 2 versions",
                                "not ie <= 8"
                            ]
                        }
                    }
                ],
                "@babel/preset-react"
            ]
        }
    }
}
```

简单说下上面配置中`env`和`development`。

`env` 用于设置对应环境下的配置, 在编译的时候`babel`会根据当前环境变量的值来决定采用哪个配置。

`env`字段的值会从`process.env.BABEL_ENV`获取，如果`BABEL_ENV`不存在，则从`process.env.NODE_ENV`获取，如果`NODE_ENV`还不存在，则取默认值`development`，使用这样方式进行配置可以定义多个不同的配置项，同时可以通过环境变量来控制要读取的配置。

**客户端代码打包**

`webapck`构建，配置一个 `npm script`命令

```text
"dev": "webpack --config ./webpack/webpack.dev.config.js",
```

**服务端代码打包**

`node` 端代码使用的是`es6 module`方式，所以需要编译一次。

`node` 端所需要的 `react` 组件代码需要使用 `babel` 进行编译。

`babel`除了可以编译单独的文件外，还可以直接编译整个目录。

这里我们也为其配一个 `npm script` 命令，并将代码打包到`dist/src`目录下

```text
"babel-node": "babel  src -d dist/src"
```

执行上面的两个命令

```text
npm run dev
npm run babel-node
```

ok，到这里浏览器端和服务端所需的最终代码已转换完成。

**http 服务启动**

```text
node ./app.js
```

元素事件已正常绑定上。

![image-20210214213357192](https://img-repo.poetries.top/images/image-20210214213357192.png)

## 双端对比测试

到这里我们再回看一下，前面说 `react ssr` 原理的时候，有说到双端节点对比。

意思是浏览器端代码执行时生成的节点结构会和网页内已有的结构进行对比。如果对比失败，则采用浏览器端的结构。

这个对比过程由 `react` 完成。

现在我们就来测试一下，以便更具象的理解这个概念。

我们在`react ssr` 中间件内多增加一个标签。

```text
<body>
    <div id="root">
       ${html} <span>测试内容</span>//增加了span 标签
    </div>
</body>
```

再次运行服务查看页面，`span` 标签内容会一闪而过。

因为节点对比失败，结果使用的是客户端的节点。

当然还有一个重点就是浏览器端的组件渲染和服务端渲染的差别，服务端只是生成-`html` 字符串，也只会执行组件的`componentWillMount`方法。

在浏览器端渲染同时会对比节点，进行节点重用，完成事件的绑定。

## 小结

这一节，我们对同构有了初步的了解和认识，然后基于同构的理念，一步一步的从零实现了一个组件的双端渲染，同时这个实践也是对之前理论进行验证的重要过程。

虽然这仍然是一个 `demo`,功能虽小，但是思想才是重要的，我们可以基于此举一反三。会让你对`react ssr` 的理解更深一步，当然对于构建完整的`react ssr`应用骨架这也是必经之路。

最后，你也可以试试给组件添加一些其他的交互或者数据，体验一下这个过程,毕竟实践出真知嘛。

本节完整代码:

[github.com/Bigerfe/koa…(opens new window)](https://github.com/Bigerfe/koa-react-ssr/tree/better/packages/my-react-ssr)



# 开发体验与升级

## 正文

上一节，我们实现了一个`react ssr`版的`hello world`，让我们对服务端组件直出有了一个基本的了解。

单纯的`ssr`也没啥意义，也只能把组件当做一个模板来用，连个最基本的交互都没有。

比如：我想点击页面某个元素的时候给我一个反馈提示。

![image-20210214213314606](https://img-repo.poetries.top/images/image-20210214213314606.png)

ok ，这不就是增加一个事件么，这个太简单了吧，代码信手拈来。

```text
//组件
export default class Index extends React.Component {
    constructor(props) {
        super(props);
    }

   handlerClick(){
       alert('一起来玩 react ssr 啊');
   }

    render() {
        return <h1 onClick={this.handlerClick}>click here!</h1>
    }
}
```

其实结果可想而知，这个事件根本不会执行的。

**这是为什么呢？**

我们都知道元素事件是基于浏览器执行的，只有在浏览器端执行了相应的 `js` 代码才能绑定事件。

在上一节我们实现的这是一个 `ssr` 直出效果，也就是说只是一个静态页面。

所以我们需要让代码在浏览器端也执行一次，组件在浏览器端挂载完后`react`会自动完成事件绑定。

**浏览器也执行一次代码，组件不会重复渲染吗？**

浏览器接管页面后，`react-dom`在渲染组件前会先和页面中的节点做对比，只有对比失败的时候才会采用客户端的内容进行渲染,且`react`会尽量多的复用已有的节点。

## 初识同构

**那需要写两套代码？**

既然客户端和服务端都要执行，那是不是就要写两份代码，供双端使用?

当然不需要，也完全不合理。

这正是我们本节的重点 - **同构**。

基于同构，浏览器和服务端可以运行同一份代码，服务端直出组件后，浏览器接管页面，然后剩下的工作由浏览器来完成。

## 客户端代码执行

经过上面一些理论的分析，我们已经清楚的了解到我们应该做什么。

现在回到正题，来实现元素事件的绑定。

### 如何实现？

大家应该都做过`react spa`项目，大部分情况都是 请求页面后服务器返回了一个页面的基本框架，同时包括 `js css` 等静态资源。

所以这里我们第一步要先把`js`代码打包，在服务端`ssr` 时,同时将这个 `js` 资源输出就可以了。

如图

![image-20210214213332426](https://img-repo.poetries.top/images/image-20210214213332426.png)

### 实现思路说明

为了方便开发我们从这里开始使用 `koa2`来构建 `http` 服务。

另外统一双端的模块化方式，在 `node` 端也使用 `es6 module` 方式进行模块的引入，但是在`node` 端不能运行，所以需要使用 `babel` 进行编译。

```text
npx babel xxx.js 
```

**整体实现思路**

- 使用 `koa` 创建一个基础 `http` 服务，可以直出 `Index` 组件。
- 然后编写客户端代码，增加 `Index` 组件的渲染入口，使用`react-dom` 库渲染 `Index` 组件。
- 然后使用 `webpack` 将`js`代码打包到一个文件内 `index.js` 内。
- 服务端直出的时候输出这个 `js` 资源到浏览器。
- 在运行前，需要使用`webpack`将客户端代码编译打包，使用`babel cli`打包编译服务端代码。

### 安装插件、工具、库

```text
react react-dom //react 基础库
@babel/core @babel/cli //babel 基础库
@babel/preset-react //编译 react 代码
@babel/preset-env //配置 babel 编译的一些选项
babel-loader //编译 js 代码
webpack webpack-cli   //webpack 两个核心库
koa2 //web 开发框架
koa-static //实现静态资源的访问
```

ps:`@babel/preset-env` 是一个预设集合，代替了以往的 `stage-*` `babel-preset-es2015`等包，可以根据开发者的配置，按需加载插件,还可以通过设置`target`属性对`node` 或者`浏览器`端进行编译输出设置。

### 具体实施

**创建基础 `http` 服务**

```text
// /app.js 

//web 服务启动入口文件
//这是一个中间件，它用于处理web 请求，实现react ssr，将组件转换为 html字符串

const reactSsr  = require('./dist/src/server/middlewares/react-ssr').default;
const Koa = require('koa2');
const koaStatic =require('koa-static');
const path = require('path');

const app = new Koa();

//设置可访问的静态资源，我们把 webpack 打包后的代码放到/dist/static目录下
app.use(koaStatic(
        path.join(__dirname, './dist/static')
));

//react ssr 中间件
app.use(reactSsr);

//启动服务
app.listen(9001);

console.log('server is start .9001');
```

**react ssr 中间件**

直出组件的同时， 将`index.js`代码资源直出到浏览器端。

```text
<script type="text/javascript"  src="index.js"></script>
// ./src/server/middlewares/react-ssr.js

//完成 react ssr 工作的中间件,组件在服务端渲染的逻辑都在这个文件内

//引入Index 组件
import React from 'react';
//引入index 组件
import Index from '../../client/pages/index';
import { renderToString} from 'react-dom/server';

export default  (ctx,next)=>{

    const html = renderToString(<Index/>);
    ctx.body=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>my react ssr</title>
</head>
<body>
    <div id="root">
       ${html}
    </div>
</body>
</html>
<script type="text/javascript"  src="index.js"></script>//这里绑定了 index.js代码，浏览器会下载后执行
`;

    return next();
}
```

**Index组件定义**

```text
// /src/client/pages/index/index.js
//index 组件

import React from 'react';

//组件
export default class Index extends React.Component {
    constructor(props) {
        super(props);
    }

   handlerClick(){
       alert('一起来玩 react ssr 呀。');
   }

    render() {
        return <h1 onClick={this.handlerClick}>click here!</h1>
    }
}
```

**实现组件在浏览器端渲染和挂载**

浏览器端执行组件渲染的入口文件,也是 `webpack` 进行资源构建的 `entry` 入口。

```text
// ./src/client/app/index.js

import React from 'react';
import ReactDom from 'react-dom';
import Index from '../pages/index';

//渲染 index 组件 到页面
ReactDom.hydrate(<Index />, document.getElementById('root'))
```

**webpack 配置**

```text
// ./webpack/webpack.dev.config.js

const path = require('path');

//定一个通用的路径转换方法
const resolvePath = (pathstr) => path.resolve(__dirname, pathstr);

module.exports = {
    mode: 'development',
    entry: resolvePath('../src/client/app/index.js'),//入口文件
    output: {
        filename: 'index.js', //设置打包后的文件名
        path: resolvePath('../dist/static')//设置构建结果的输出目录
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
}
```

**babel 配置**

个人习惯喜欢把配置单独放在`.babelrc`里面，当然也可以放到 `webpack` 配置文件内。

```text
{
    "env": {
        "development": {
            "presets": [
                [
                    "@babel/preset-env",
                    {
                        "targets": {
                            "browsers": [
                                ">1%",
                                "last 2 versions",
                                "not ie <= 8"
                            ]
                        }
                    }
                ],
                "@babel/preset-react"
            ]
        }
    }
}
```

简单说下上面配置中`env`和`development`。

`env` 用于设置对应环境下的配置, 在编译的时候`babel`会根据当前环境变量的值来决定采用哪个配置。

`env`字段的值会从`process.env.BABEL_ENV`获取，如果`BABEL_ENV`不存在，则从`process.env.NODE_ENV`获取，如果`NODE_ENV`还不存在，则取默认值`development`，使用这样方式进行配置可以定义多个不同的配置项，同时可以通过环境变量来控制要读取的配置。

**客户端代码打包**

`webapck`构建，配置一个 `npm script`命令

```text
"dev": "webpack --config ./webpack/webpack.dev.config.js",
```

**服务端代码打包**

`node` 端代码使用的是`es6 module`方式，所以需要编译一次。

`node` 端所需要的 `react` 组件代码需要使用 `babel` 进行编译。

`babel`除了可以编译单独的文件外，还可以直接编译整个目录。

这里我们也为其配一个 `npm script` 命令，并将代码打包到`dist/src`目录下

```text
"babel-node": "babel  src -d dist/src"
```

执行上面的两个命令

```text
npm run dev
npm run babel-node
```

ok，到这里浏览器端和服务端所需的最终代码已转换完成。

**http 服务启动**

```text
node ./app.js
```

元素事件已正常绑定上。

![image-20210214213357192](https://img-repo.poetries.top/images/image-20210214213357192.png)

## 双端对比测试

到这里我们再回看一下，前面说 `react ssr` 原理的时候，有说到双端节点对比。

意思是浏览器端代码执行时生成的节点结构会和网页内已有的结构进行对比。如果对比失败，则采用浏览器端的结构。

这个对比过程由 `react` 完成。

现在我们就来测试一下，以便更具象的理解这个概念。

我们在`react ssr` 中间件内多增加一个标签。

```text
<body>
    <div id="root">
       ${html} <span>测试内容</span>//增加了span 标签
    </div>
</body>
```

再次运行服务查看页面，`span` 标签内容会一闪而过。

因为节点对比失败，结果使用的是客户端的节点。

当然还有一个重点就是浏览器端的组件渲染和服务端渲染的差别，服务端只是生成-`html` 字符串，也只会执行组件的`componentWillMount`方法。

在浏览器端渲染同时会对比节点，进行节点重用，完成事件的绑定。

## 小结

这一节，我们对同构有了初步的了解和认识，然后基于同构的理念，一步一步的从零实现了一个组件的双端渲染，同时这个实践也是对之前理论进行验证的重要过程。

虽然这仍然是一个 `demo`,功能虽小，但是思想才是重要的，我们可以基于此举一反三。会让你对`react ssr` 的理解更深一步，当然对于构建完整的`react ssr`应用骨架这也是必经之路。

最后，你也可以试试给组件添加一些其他的交互或者数据，体验一下这个过程,毕竟实践出真知嘛。

本节完整代码:

[github.com/Bigerfe/koa…(opens new window)](https://github.com/Bigerfe/koa-react-ssr/tree/better/packages/my-react-ssr)



# 双端路由同构

## 正文

前面几节我们实现了一个最基础的 `react ssr`，同时也初步接触了同构，双端渲染同一个组件，服务端直出 `html` 结构，浏览器端也能够实现组件事件的绑定。

然后又对应用骨架的开发体验做了一次重要的升级。

## 引出问题

虽然我们能展示页面并且执行事件，但我们还缺一个非常重要的能力。

那就是路由！

现在我们只有一个路由，属于服务端的根路由 `/` 。

我们无论怎么在浏览器内改变路由地址都会显示同一个`UI`。

当然我们的项目不可能只有一个页面，那我们该怎样来处理和维护项目的路由呢？

## 路由同构

由于我们打造的是基于服务端渲染的`React SPA`应用开发骨架，所以服务端和客户端都需要对路由进行处理。

我们使用的是`React`,那前端路由肯定会使用`react-router`来处理。

那服务端呢？服务端也需要单独维护一套路由？

当然不需要，这样不科学，更不合理。

在前几节我们初步接触了同构，现在解决这个问题的办法还是同构 - `路由同构`，经过同构后服务端和客户端可以使用同一套路由。

### 同构思路与实现

先整体说下实现思路,让大家先有个基本的了解。

当第一请求页面的时候，服务端接收请求，根据当前的`path`来查找具体的路由，然后根据路由得到具体的组件，然后将组件直出。

服务端直出后，页面由浏览器接管，后面的渲染执行就交给前端代码了。

思路很简单，接下来看下具体的实现和代码。

**创建一个客户端路由配置**

从`react router4`开始，`react`对路由做了重大的升级，将组件化的思想贯彻到底 - 一切皆组件。

所以从`v4`版本开始不再是集中式路由配置，路由也是组件，也可以和 `UI` 写在一起。

当然你仍然可以使用集中式的路由配置方式。

新增一个`Layout`组件作为页面公共组件，在这个组件内进行路由渲染,当然也可以不用，这里也是为了让每个页面都有公共部分，无需每重复渲染。

具体用不用看自身的业务即可。

```text
// ./src/client/app/layout.js

import React from 'react';
import { Link } from 'react-router-dom';
export default class Index extends React.Component{
constructor(props){
 super(props);
}
render(){
return  <div>
    <Link to="/index">首页</Link>  <Link to="/artice">列表页</Link>
    <div>{this.props.children}</div>
    </div>
}
}
```

**配置路由**

顺便简单介绍几个`react router4`的路由组件 `Route, Switch, BrowserRouter`

```text
Route 组件
```

用于绑定组件和`path`的关系,一般使用`component`属性指定要渲染的组件,其中`exact`属性表示是否是精确匹配模式，默认是`false`。

```text
 <Route path="/index"  exact={true} component={Index}></Route>
Switch 组件
```

使用该组件只会渲染第一个匹配到的路由，否则所有的路由都会渲染。

```text
  <Switch>
      <Route path="/"  exact={true} component={Root}></Route>
      <Route path="/list" exact={true} component={List}></Route>
  </Switch>
BrowserRouter 组件
```

此组件相信大家都熟悉，基于浏览器 `History api` 来达到浏览器地址和 `UI` 同步的能力。

```text
<BrowserRouter>
    <Switch>
        <Route path="/root"  exact={true} component={Root}></Route>
        <Route path="/list" exact={true} component={List}></Route>
    </Switch>
</BrowserRouter>
```

**来看下完整的路由配置**

提取为独立的模块，方便维护和管理。

```text
// ./src/client/router/route-config.js
//路由配置文件

import Index from '../pages/index';
import List from '../pages/list';

export default [
    {
        path:'/index',
        component:Index,
        exact: true //是否精确匹配
    },
    {
        path: '/list',
        component: List,
        exact: true,
    }
]
```

**路由渲染入口配置**

遍历路由配置

```text
// src/client/router/indxex.js
//路由配置文件

import Layout from '../app/layout';
import React  from 'react';
import { Route, Switch } from 'react-router-dom';

//服务端也会用到所以通过参数的方式将配置传递进来
function App({routeList}) {
    return (
        <Layout> //公共组件
            <Switch>
                {
                    routeList.map(item=>{
                            return <Route key={item.path} {...item}></Route>
                    })
                }
            </Switch>
        </Layout>
    );
}

export default App;
```

**调整客户端组件渲染的入口代码**

```text
//client/app/index.js
//浏览器端页面结构渲染入口

import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter} from 'react-router-dom';
import App from '../router/index';
import routeList from '../router/route-config';//路由配置


//渲染入口
ReactDom.hydrate(
   - <Index>
   + <BrowserRouter>
        <App routeList={routeList} />
   </BrowserRouter>//改成路由组件
, document.getElementById('root'))
```

到这里，客户端路由已生效，路由改变同时能够渲对应的组件

![image-20210214214106281](https://img-repo.poetries.top/images/image-20210214214106281.png)

**现在客户端路由基本上已经配置好，服务端该如何处理？**

**服务端路由处理**

按照我们上面的思路，根据请求的 `path`，去路由配置里查找对应的组件，得到匹配的组件后，服务端完成组件直出。

上面的思路没什么问题，不过`v4`中 已经为我们提供了相关的组件来完成服务端的渲染。

```text
StaticRouter
import { StaticRouter} from 'react-router';
```

该组件主要用于服务端渲染，可以帮助我们完成路由查找功能,无需再做手动匹配。

基本的思路是，将替换为无状态的。

将服务器上接收到的`path`传递给此组件用来匹配，同时支持传入`context`特性,此组件会自动匹配到目标组件进行渲染。

`context`属性是一个普通的`JavaScript`对象。

在组件渲染时，可向该对象添加属性以存储有关渲染的信息，比如`302 404`等结果状态，然后服务端可以针对不同的状态进行具体的响应处理。

对比来看

```text
//客户端
<BrowserRouter>
      <App/>
</BrowserRouter>
     
// 服务端
<StaticRouter location={req.url} context={context}>   
        <App/>
</StaticRouter>
```

**服务端渲染处理**

```text
//引入客户端路由组件
//...
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, Route} from 'react-router';
import App from '../../client/router/index';
import routeList from '../../client/router/route-config';


export default  (ctx,next)=>{
    
    //获得请求的 path
    const path = ctx.request.path;
    
    //渲染组件为 html 字符串
    const html = renderToString(<StaticRouter location={path}>
          <App routeList={routeList}></App>
    </StaticRouter>);
    ctx.body=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>my react ssr</title>
</head>
<body>
    <div id="root">
       ${html}
    </div>
</body>
</html>
</body>
<script type="text/javascript"  src="index.js"></script>
`;

    return next();
}
```

到这里我们已经实现了基本的双端路的同构，是不是很简单呢。^_^

![image-20210214214127569](https://img-repo.poetries.top/images/image-20210214214127569.png)

## 小结

本节主要是了解和实现 `路由同构`，整体来说比较简单，不过这也只是小试牛刀哦，后面还会更精彩。

[github.com/Bigerfe/koa…(opens new window)](https://github.com/Bigerfe/koa-react-ssr/tree/better/packages/my-react-ssr2)



# 双端数据同构

## 正文

上一节我们实现了应用骨架的路由同构，这一节我们来实现非常重要的一个环节 - **数据同构**。

## 什么是数据同构

整体来说，组件的一些数据需要从接口异步获取后进行渲染，数据同构就是服务端和客户端能够使用同一个数据请求处理方法（一套代码），同一份数据进行组件的渲染。

我们前面实现的组件直出只是将组件转换为了 `html`字符串，但是并没有具体的数据，顶多就是个静态页。

比如现在有这么一个需求，要从接口获取数据并且渲染到页面上。

以往在单页应用中，我们一般都将数据的数据的请求处理放在`compoentDidMount`生命周期内，得到数据后更改状态，随之渲染。

异步获取数据

```text
  componentDidMount(){
        ...
        fetchData().then(res=>{
            this.setState({
                list:res.list
            });
        })
    }
```

在 `render` 方法内组织数据

```text
 render() {
        ....
        let {list} = this.state;
        .....
        return <>
        {list&&list.map(item=>{
            return <div>{item.title}</div>
        })}
        </>
    }
```

上面的代码我们都非常熟悉，以上代码也能在 `ssr` 模式中执行，但是无法得到我们期望的效果，数据只能在客户端得到，达不到数据直出的效果，查看网页源代码也没有我们想要的数据。

![image-20210214214245297](https://img-repo.poetries.top/images/image-20210214214245297.png)

开始的时候我们介绍过一些原理，`componentDidMount`生命周期只会在浏览器端执行，所以如果想让数据也能在服务端渲染就需要做一些特殊的处理。

接下来我们来实现 `react ssr` 本应用骨架内的数据同构。

## 数据预取

在客户端，我们在`componentDidMount`生命周期内执行数据请求方法从接口拿到数据。

在服务端渲染组件的时候要想在直出的组件内容也包含数据，那就需要提前得到数据，然后将数据作为属性传递给组件，在`constructor`内对组件 `state` 进行初始化。

当组件有了数据，服务端渲染直出的时候自然就会有数据。

**以上这个在服务端渲染前得到数据的过程就是数据预取。**

**思考两个问题：**

问题1：客户端和服务端组件渲染执行的声明周期不同，双端如何使用一套代码，代码如何组织呢？

问题2：真实开发中，浏览器的 `fetch api` 无法在`node` 端使用,如何统一呢？

以上两个问题都可以通过同构来解决。

先说问题2，因为比较简单，现在已经有很多同构的库来解决。

比如:`isomorphic-fetch`，`axios`，这里我推荐使用`axios`,对开发者非常友好，可以无差别使用。

那现在回到问题1，解决这个问题前需要回顾下以往的知识。

`js`里无论是函数还是类，到底都是函数，同时都是特殊的对象。

所以我们可以为这些函数添加属性，这个属性也可以被称作为类的静态方法。

静态方法有什么特点？

不需要实例化就可以访问,像下面这样。

```text
class Foo {
   run(){
       .....
       console.log('hello');
   }
}

Foo.method=function(){
    console.log('hello method');
}
```

这有什么作用呢？

上面的代码可以在浏览器端执行，当然也可在 `node` 端执行。

其实以上思路就是解决问题2的办法，可以把`Foo`想象成我们的`react` 组件。

我们可以在 `node` 端找到这个路由对应的组件，然后调用这个组件的静态方法来实现数据的预取。

**梳理下完整的思路**

- 约定并为组件添加数据预取的静态方法
- 在服务端查找到当前路由对应的组件
- 调用组件的数据预取方法得到数据
- 将数据作为属性传入组件
- 组件内render做相应的处理
- 服务端直出组件
- 浏览器接管页面，完成渲染

## 手膜手实现数据同构

### 约定数据预取方法

首先我们模拟一个异步获取数据的方法，返回一个列表数据。

我这里准备了一份从掘金采集的信息，作为假数据。

```text
// ./src/client/pages/list/data.js

const data = [{
    "title": "深入浅出TypeScript：从基础知识到类型编程",
    "desc": "Vue3 源码及开发必备基础，从基础知识到类型工具设计，从理论到实战，手把手让你从零基础成为进阶使用者。",
    "img": "https://user-gold-cdn.xitu.io/2019/11/8/16e4ab5d6aff406a?imageView2/1/w/200/h/280/q/95/format/webp/interlace/1"
}, {
    "title": "SVG 动画开发实战手册",
    "desc": "从0到1，学习SVG动画开发知识，快速高效完成SVG动画效果开发。",
    "img": "https://user-gold-cdn.xitu.io/2019/9/26/16d6bda264ac27e4?imageView2/1/w/200/h/280/q/95/format/webp/interlace/1"
}, {
    "title": "预售JavaScript 设计模式核⼼原理与应⽤实践",
    "desc": "通俗易懂的编程“套路“学。带你深入看似高深实则接地气的设计模式原理，在实际场景中内化设计模式的”道“与”术“。学会驾驭代码，而非被其奴役。",
    "img": "https://user-gold-cdn.xitu.io/2019/9/16/16d382e623923d91?imageView2/1/w/200/h/280/q/95/format/webp/interlace/1"
}
]
```

另外我们约定所有页面组件内的数据预取方法为`getInitialProps`,用于双端调用。

```text
//src/client/pages/list/index.js
//List 页面 组件

import React from 'react';
import {Link} from 'react-router-dom';
//导入  - 假数据
import tempData from './data';
//组件
export default class Index extends React.Component {
    constructor(props) {
        super(props);
    }
    //静态方法  数据预取方法
    static async  getInitialProps() {
        //模拟数据请求方法
        const fetchData=()=>{
            return new Promise(resolve=>{
                setTimeout(() => {
                    resolve({
                        code:0,
                        data: tempData
                    })
                }, 100);
            })
        }

        let res = await fetchData();

        return res;
    }

    handlerClick(){
        alert('一起来玩 react 服务端渲染');
    }

    render() {
        return <div onClick={this.handlerClick}>hello world。</div>
    }
}
```

数据预取方法设置已完成，下一步需要在服务端调用这个方法。

### 服务端数据预取实现

`server` 端接到客户端的请求，通过`req url path` 来进行路由匹配，然后得到需要渲染的组件后调用数据预取方法。

#### 路由如何匹配?

到这里我们又遇到了个问题 - 路由如何匹配。

每个路由都有 `path` 属性，所以完全可以根据路由的 `path` 去匹配。

最简单的方式无疑就是遍历路由配置，对比 `req path` 和路由`path` 。

参考代码

```text
//路由配置文件

import Index from '../pages/index';
import List from '../pages/list';


export default [

    {
        path:'/index',
        component:Index
    },
    {
        path: '/list',
        component: List
    }
]


//根据请求 path 查找路由
const matchRoute=(path,routeList)=>{
    let route;
    for(var item of routeList){
        if(item.path===path){//路由匹配
            route = item;
        }
        break;
    }

    return route;
}
```

上面的代码看着没什么问题,但只能处理静态路由，如果是动态路由的话上面的方法就无能为力了。

静态路由

```text
 <Route path="/item"  exact={true} component={Item}></Route>
```

动态路由

```text
<Route path="/item/:id"  exact={true} component={Root}></Route>
```

当然我们都知道这种动态 `path` 就需要正则来进行匹配了。

**path-to-regexp**

此时我们就需要使用工具来处理了。

该工具库用来处理 `url` 中地址与参数，可以将动态路径转换为所对应的正则。

```text
const keys = [];

const regexp = pathToRegexp("/foo/:bar", keys);

// regexp = /^\/foo\/([^\/]+?)\/?$/i
// keys = [{ name: 'bar', prefix: '/', suffix: '', pattern: '[^\\/#\\?]+?', modifier: '' }]
```

还可以直接用于路径匹配

```text
const regexp = pathToRegexp("/:foo/:bar");
// keys = [{ name: 'foo', prefix: '/', ... }, { name: 'bar', prefix: '/', ... }]
 
regexp.exec("/test/route");
//=> [ '/test/route', 'test', 'route', index: 0, input: '/test/route', groups: undefined ]
```

说到这里相信我们的问题已经解决了。

不过上面只是介绍下原理，具体的应用其实`react-router`内已经内置了，而且内部处理机制也是利用`pathToRegexp`这个库。

**matchPath 方法**

```text
import { matchPath } from "react-router";
```

该方法主要就是用于路由的匹配。

```text
const match = matchPath("/users/123", {
  path: "/users/:id",
  exact: true,
  strict: false
});
```

完善下组件匹配方法

```text
//根据请求 path 匹配路由，结果返回该路由
const matchRoute=(opt)=>{
    let {path} = opt;
    let route;
    for(var item of routeList){
       if(matchPath(path,item)){
        route = item;
        break;
       }
    }
    return route;
}
```

**完成数据预取**

- 查找到组件后，调用组件的数据预取方法得到数据
- 得到数据后，将数据传递给组件

```text
export default  async (ctx,next)=>{

    const path = ctx.request.path;

    //查找到的目标路由对象
    let targetRoute = matchRoute(path,routeList);

    //数据预取 -> fetchResult
    let fetchDataFn = targetRoute.component.getInitialProps;
    let fetchResult = {};
    if(fetchDataFn){
        fetchResult = await fetchDataFn();
    }

     //将预取数据在这里传递过去 组内通过props.staticContext获取
    const context = {
        initialData: fetchResult
    };

    html = renderToString(<StaticRouter location={path} context={context}>
        <App routeList={routeList}></App>
    </StaticRouter>);
    //....

    await next();
}
```

### 组件 render 逻辑处理

组件从`props.staticContext.initialData`得到数据。

`render`方法增加渲染逻辑

```text
//list 页面 组件
export default class Index extends React.Component {
    constructor(props) {
        super(props);   
        //得到初始化数据
        + initialData = props.staticContext.initialData||{};
        
        + this.state=initialData;
    }

    static async  getInitialProps() {
        //...
    }

    render() {
        //渲染逻辑
        + const {code,data}=this.state;
        
        return <div>
        + {data && data.map((item,index)=>{
            return <div key={index}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
            </div>
        })}
        {!data&&<div>暂无数据</div>}
        </div>
    }
}
```

到这里，服务端的数据直出就处理完成了，查看网页源代码已经能看到直出的数据。

![image-20210214214310986](https://img-repo.poetries.top/images/image-20210214214310986.png)

但是如果查看页面效果的话，页面内容会一闪而过，最终页面只显示一个`暂无数据` 。

![image-20210214214329679](https://img-repo.poetries.top/images/image-20210214214329679.png)

![image-20210214214352550](https://img-repo.poetries.top/images/image-20210214214352550.png)

## 数据脱水

继续分析，出现以上问题的原因。

导致这个问题的原因是因为在浏览器端进行渲染的时候，没有该数据。

结果导致双端节点对比失败，最终采用的是客户端的渲染结果。

所以，浏览器端也需要有相同的数据，使组件可以渲染出和服务端相同的结构，才能够通过双端节点对比。才不会被客户端的结构覆盖,从而使用服务端直出的 `html` 结构。

**浏览器端组件渲染前如何才能得到服务端的数据呢？**

**得到了数据如何传递给组件呢？**

第一排除通过接口请求，那就是重复请求了,没意义。

服务端返回相应数据后页面就被浏览器接管了，所以只能在接管之前做一些操作。

我们可以直接把数据也吐给浏览器，将数据序列化后作为字符串直出到页面，这样在浏览器端就可以在组件渲染前很方便的得到数据。

为了防止 `xss` 攻击，咱们这里将数据放到了`textarea`标签内。

```text
//...

    ctx.body=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>my react ssr</title>
</head>
<body>
    <div id="root">
       ${html}
    </div>
    + <textarea id="ssrTextInitData" style="display:none;">
    ${JSON.stringify(fetchResult)}
    </textarea>
</body>
</html>
</body>

//.....
```

ok，经过我们上面的分析和实现，我们在直出组件的时候同时将数据源也输出给浏览器，而这个过程就叫做`数据脱水`。

## 数据注水

现在还差最后一步，浏览器端得到了数据后，如何使用该数据呢？

- 浏览器端在组件渲染前，得到初始化数据
- 将数据作为属性传递给组件

### 得到初始化数据

这个很简单了，直接上代码

```text
//初始数据
let initialData =JSON.parse( document.getElementById('ssrTextInitData').value);
```

### 将数据作为属性传递给组件

如何将数据作为属性传递给组件呢？

方法其实有很多种，下面算是其中一个方法。

可以根据当前的 `path`匹配到目标路由，然后在路由的`render`方法内将数据传递给组件即可。

ps:因为在服务端渲染的时候我们传入初始数据的属性为`initialData`,所以客户端最好使用同一个属性来传递。

```text
// ./src/client/app/index.js
//浏览器端页面结构渲染入口

import React from 'react';
import ReactDom from 'react-dom';
import App from '../router/index';
import { BrowserRouter} from 'react-router-dom';
import routeList from '../router/route-config';

function clientRender() {
    //初始数据
    let initialData =JSON.parse( document.getElementById('ssrTextInitData').value);

    //查找路由
    let route = matchRoute(document.location.pathname,routeList);

    //设置组件初始化数据 [关键点]
    route.initialData =initialData;

    //渲染index
    ReactDom.hydrate(<BrowserRouter>
            <App routeList={routeList}/>
    </BrowserRouter>
        , document.getElementById('root'))

}
//渲染入口
clientRender();
```

然后看下在`App`组件内做的一些处理。

```text
function App({routeList}) {
    return (
            <Layout> 
               <Switch>
                {
                    routeList.map(item=>{
                        //判断是否有初始数据
                        return item.initialData ? <Route key={item.path} exact={item.exact} path={item.path}  render={(props)=>{
                            props.initialData = item.initialData;
                            return <item.component {...props}></item.component>
                        }}></Route> : <Route key={item.path} {...item}></Route>
                    })
                }
                <Route to="*" component={Page404}></Route>
            </Switch>
            </Layout>
    );
}
```

到这里，我们进入到`/list`页面,它的渲染结果已经正常，数据也能够正常的显示。

![image-20210214214418209](https://img-repo.poetries.top/images/image-20210214214418209.png)

这个将数据和组件调和渲染的过程就是`数据注水`。

## 彻底解决问题

到这里，首次访问的结果是正常了，但是仍然有问题，在这里我们彻底解决它。

在上图中我们页面中有两个链接，分别是首页和列表页。

上面访问的是`/list`列表页，但是如果我们第一次就访问`/index`路由，再点击列表页链接，列表页的数据竟然消失了。

![image-20210214214433204](https://img-repo.poetries.top/images/image-20210214214433204.png)

![image-20210214214442417](https://img-repo.poetries.top/images/image-20210214214442417.png)

这是什么原因？

我们都知道首次进入页面走服务端 `ssr`，后续访问就`spa`。

现在列表页的数据只能在`ssr` 模式下才能拿到，如果是 `spa` 就拿不到了。

如何处理？

这个就比较简单了，和我们平时开发`spa`一样。

我们可以在`componentDidMount`内获取数据然后更新 `state`。

ps: 实现比较简单，但是需要做个容错，判断下是否有初始化数据，以免重复请求，浪费资源。

```text
  componentDidMount(){
        if(!this.state.data){//判断是否有初始化数据
            //进行数据请求
            Index.getInitialProps().then(res=>{
                this.setState({
                    data:res.data||[]
                })
            })
        }
    }
```

到这里，页面的整体数据同构渲染已经完成，效果已经达到预期。

## 公共方法

上面的实现过程中，服务端和浏览器端都用到了路由的匹配，所以我们可以将这个方法提出来，供双端调用。

```text
// src/share/match-route.js
// 根据 path， 匹配路由 

import { matchPath} from 'react-router';

export default (path,routeList)=>{ 
        let route;
        for (var item of routeList) {
            if (matchPath(path, item)) {
                route = item;//查找到第一个路由后停止查找
                break;
            }
        }
        return  route;
}
```

## 小结

本节主要使用一个小需求来抛砖引玉，带出来了一系列的问题，让我们逐步的分析和实现了数据同构。

关键步骤如下:

- 方法同构： 为组件声明`getInitialProps`静态方法，这是一个同构方法，用于双端的数据获取
- 数据预取：在服务端通过路由匹配找到目标的组件，然后调用组件的数据预取方法得到数据
- 将初始化数据作为属性传递给组件
- 数据脱水：将数据序列化,和 `html`字符串 一起直出返回给浏览器端
- 数据注水:浏览器端得到服务端直出的数据，也通过属性将数据传给组件
- 如果初始化数据不存在，则可以在`componentDidMount`生命周期内请求一次数据

本节内容较多，但并不复杂，重要的是理清思路。

[github.com/Bigerfe/koa…(opens new window)](https://github.com/Bigerfe/koa-react-ssr/tree/better/packages/my-react-ssr-dataiso)



# SEO TDK支持

## 正文

这一节我们来解决一个小问题，在我们小册开篇的时候也着重提到过，那就网页的 `SEO`,主要是指页面的 `TDK`信息。

上一节我们已经让页面内有了数据，`SEO`优化除了需要基础数据外，`TDK`也是非常重要的,否则搜索引擎很难知道你这页面是干啥的。

```text
TDK
```

- title 当前页面的标题
- description 当前页面的描述
- keywords 当前页面的关键词

可以参考京东官网的 `tdk`

![image-20210214214707638](https://img-repo.poetries.top/images/image-20210214214707638.png)

另外也可以看下`弹个车`的 `tdk`，弹个车整站就是个单页应用，很早之前没有`tdk`,现在已经直出了`tdk`。

搜索引擎爬虫会抓取页面内容同时根据上面三个关键内容确定网页的内容和权重。

如何实现像上面这样的 `tdk` 信息直出效果呢？

我们已经实现了组件直出，增加`tdk` 直出是不是太简单了

## 简单粗暴

在`react-srr`中间件里加入相关的 `meta` 标记

```text
// /src/server/middlewares/react-ssr.js

***
ctx.body=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    + <title>my react ssr 标题</title>
    + <meta name="keywords" content="关键词内容" />
    + <meta name="description" content="描述内容" />
</head>
<body>
    <div id="root">
       ${html}
    </div>
    <textarea id="ssrTextInitData" style="display:none;">
    ${JSON.stringify(fetchResult)}
    </textarea>
</body>
</html>
</body>
<script type="text/javascript"  src="/index.js"></script>
`;
***
```

以上代码便可以为所有的页面添加 `tdk` 信息，简单粗暴，但是意义不大。

一个网站有很多页面，每个页面的信息肯是不同的，所以我们需要动态的设置，让每个页面的 `tdk` 可以 不同。

## 动态 tdk - 数据预取中做手脚

可以从我们的数据预取方法返回当前页面的 `tdk` 信息 ，服务端得到数据后可直出到页面，同时浏览器端在`componentDidMount`生命周期内通过 `DOM` 操作 修改当前页面的`title`信息,来避免单页跳转时 `title` 不变的问题。

在数据预取中返回 `tdk`还有一个好处，就是可以在预取方法内利用当前的数据来组织 `tdk`,让每个页面的 `tdk` 不同。

```text
***
 //数据预取方法
 static async  getInitialProps() {
        //模拟数据请求方法
        const fetchData=()=>{
            return new Promise(resolve=>{
                setTimeout(() => {
                    resolve({
                        code:0,
                        data: tempData
                    })
                }, 100);
            })
        }

        let res = await fetchData();
        
        — return res;
        + return {
            fetchData:res,
            page:
            {
                tdk:{
                    title:'首页',
                    keywords:'前端技术江湖',
                    description:'前端技术江湖'
                }
            }
        }
    }
***
```

### 组件内需要的处理

`componentDidMount`内通过 `DOM`操作 设置页面标题，防止页面切换的时候标题不更新。

```text
 componentDidMount(){
        let {tdk} =this.state.page;
        if(tdk){
            document.title=tdk.title;
        }
        
         if(!this.state.fetchData){
            //如果没有数据，则进行数据请求
            Index.getInitialProps().then(res=>{
                this.setState({
                    fetchData:res.fetchData||[],
                    page:res.page
                });
                //重设页面 title
                document.title = res.page.tdk.title;
            })
        }
        
    }
```

### 服务端获取 tdk 信息

服务端代码调整,我们可以直接从数据预取的方法里得到页面的 `tdk` 信息，所以可以很方便的直出到页面内。

获取 `tdk` 信息

```text
//  /src/server/middlewares/react-ssr.js

//...
 let { page } = fetchResult || {};
    let tdk = {
        title: '默认标题',
        keywords: '默认关键词',
        description: '默认描述'};

    if(page && page.tdk){
        tdk=page.tdk;
    }
//...

ctx.body=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    + <title>${tdk.title}</title>
    + <meta name="keywords" content="${tdk.keywords}" />
    + <meta name="description" content="${tdk.description}" />
</head>
<body>
    <div id="root">
       ${html}
    </div>
    <textarea id="ssrTextInitData" style="display:none;">
    ${JSON.stringify(fetchResult)}
    </textarea>
</body>
</html>
</body>
<script type="text/javascript"  src="//localhost:9002/index.js"></script>
`;

//...
```

上面代码将 `tdk` 内容和 `html` 内容一同返回给浏览器。

![image-20210214214730349](https://img-repo.poetries.top/images/image-20210214214730349.png)

## 动态 tdk - 使用轮子

此方法是方法1的改造，`tdk`数据 依然从`getInitialProps`方法内返回。

方法1的实现方式比较传统，虽然思路较容易理解，但是代码涉及的部分较多，有些繁琐，效率不高，且容易出错。

所以这里我们结合现有的轮子来完成这个功能，该用轮子用轮子，毕竟轮子可以帮助我们提高一些效率,而且功能更丰富。

### react-helmet 组件

该组件可以帮助你管理和定制你的页面`title`以及 `meta` 信息，支持服务端和客户端渲染。

- 安装

```text
npm i react-helmet
```

### 客户端使用

组件在浏览器端渲染后会自动完成 `DOM` 操作，无需手动操作。

```text
//src/client/pages/index/index.js

+ import { Helmet } from 'react-helmet';

 //....
 render() {
        //渲染数据
         const {tdk={}} = this.state.page || {};
        
       return <div>
        <Helmet>
                <title>{tdk.title}</title>
                <meta name="description" content={tdk.description}/>
                <meta name="keywords" content={tdk.keywords}/>
        </Helmet>
        首页</div>
    }
```

### 服务端使用

可以直接得到组件的`html` 内容，更方便的直出到客户端。

```text
// /src/server/middlewares/react-ssr.js

+ import { Helmet } from 'react-helmet';

//....

//得到组件的序列化数据
+ const helmet = Helmet.renderStatic();

ctx.body=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    + ${helmet.title.toString()} //直出到客户端
    + ${helmet.meta.toString()}
    <meta name="keywords" content="${tdk.keywords}" />
    <meta name="description" content="${tdk.description}" />
</head>
//....
</html>
</body>
<script type="text/javascript"  src="/index.js"></script>
`;

***
```

`react-helmet` 帮我们完成了所需的 `dom` 操作，方便快捷，同时也减少了错误。

![image-20210214214746086](https://img-repo.poetries.top/images/image-20210214214746086.png)

### 本节代码已上传

方法1

[github.com/Bigerfe/koa…(opens new window)](https://github.com/Bigerfe/koa-react-ssr/tree/better/packages/my-react-ssr-seo0)

方法2

[github.com/Bigerfe/koa…(opens new window)](https://github.com/Bigerfe/koa-react-ssr/tree/better/packages/my-react-ssr-seo1)



# CSS 资源处理

## 正文

从我们开始搭建应用骨架到这里，这一路我们发现了很多问题，也解决了很多问题,这个收获是巨大的。但总感觉少点什么，期间完全没有涉及到 `css` ，一个完整的项目怎么能缺少 `css` 呢？

所以本节开始，我们来把 `css` 融合到我们的应用骨架里，达到可以给组件添加样式，美化页面的目的。

不就是支持 `css` 嘛，配置几个 `loader` 就完事了。

真的这么简单吗？

接下来，我们一步一步的实现应用骨架对 `css` 的支持。

## 安装所需 loader

```text
npm i sass-loader style-loader postcss-loader css-loader autoprefixer
```

使用`sass`预编译，使用`postcss-loader + autoprefixer` 为选择器增加浏览器前缀

## 浏览器端 - loader 配置

加入 `css` 的相关`loader`配置，开发环境中使`css`打包进 `js`，`style-loader`会帮助我们将 `css`内联在页面内。

```text
// webpack/webpack.dev.config.js
//webpack 配置文件
const path = require('path')
const resolvePath = (pathstr) => path.resolve(__dirname, pathstr);

module.exports = {
    mode: 'development',
    entry: resolvePath('../src/client/app/index.js'),//入口文件
    output: {
        filename: 'index.js',
        path: resolvePath('../dist/static')
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                + test: /\.(sa|sc|c)ss$/,
                + use: [
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
            },
                {
                        test: /\.(png|jpg|gif)$/,
                        use: [{
                            loader: 'file-loader',
                            options: {
                                name: 'img/[name].[ext]'//配置图片的输出路径和名称
                            }
                }]
            ]
            },
        ]
    }
}
```

配置`autoprefixer`完成 `css` 前缀转换

在项目根目录创建`postcss.config.js`文件进行配置,也可以直接和 `loader` 写在一起，看个人习惯。

```text
module.exports = {
    plugins: [require('autoprefixer')]  // 引用该插件
}
```

上面我们就完成了，针对浏览器端的 `css` 配置。

## 添加css测试代码

给`layout`组件添加`css`，作为全局样式

```text
// ./src/client/app/layout.css

body {
  background-color: #f4f5f5;
}

.layout-box {
  max-width: 750px;
  margin: 0 auto;
  text-align: center;
  background: #fff;
}

.layout-box h1 {
  margin-top: 20px;
  margin-top: 20px;
}
```

给`index`组件添加`css`，作为业务`css`

```text
// ./src/client/pages/index/index.scss

.page-index-box{
    width: 750px;
}
Index`组件导入 `css
// ./src/client/pages/index/index.js
//....
import './index.scss';
//....
```

结果运行`npm run dev`时，服务端代码打包失败

![image-20210214214921254](https://img-repo.poetries.top/images/image-20210214214921254.png)

由于组件会在双端构建，我们在组件内导入了 `css`，而服务端`webpack`配置文件没有配置相关的 `css loader`，所以服务端的代码打包失败了。

## 服务端处理

- 暴力破解法

既然服务端无法处理`css`模块，而我们也不能给服务端配置添加相关的 `css loader`,否则`css`也会被打包进`js`。

所以需要采取其他方法，这里有个取巧的方式，我们可以在服务端代码构建前干掉这行代码。

- 如何删除这行导入？

方法有很多种，要么是借助工具，要么是自己写插件。

在这里我们自定义一个 `babel plugin` 来搞定。

- 如何写 `babel plugin`

我们先增加一个目录，`babel` 下存放 `plugin` 和 `preset`。

![image-20210214214937167](https://img-repo.poetries.top/images/image-20210214214937167.png)

创建一个 `js` 文件为插件文件,插件的名称为`no-require-css`

```text
// ./webpack/babel/plugin/no-require-css.js

/**
 * 删除代码中导入的 css
 */
module.exports = function ({ types: babelTypes }) {
    return {
        name: "no-require-css",
        visitor: {
            ImportDeclaration(path, state) {
                let importFile = path.node.source.value;
                if(importFile.indexOf('.scss')>-1){
                    //如果引入了 css文件，则删除此节点
                    path.remove();
                }
            }
        }
    };
};
```

- 配置插件

在`.babelrc`内配置这个插件

```text
{
    "env": {
        "node":{
            "presets": [
                [
                    "@babel/preset-env",
                    {
                        "targets":{
                            "node":"current"
                        }
                    }
                ],
                "@babel/preset-react"
            ],
            "plugins": [
                "@babel/plugin-proposal-class-properties",
                + "./webpack/babel/plugin/no-require-css"          
            ]
        }
```

- 查看结果

服务可以正常启动，`css` 已经内联到了`head` 内。

![image-20210214214957102](https://img-repo.poetries.top/images/image-20210214214957102.png)

## 页面抖动问题

我们已经实现了`css`的渲染，但是有些勉强，效果不够好，当页面刷新或者第一次进入的时候，页面会抖动。

![image-20210214215012251](https://img-repo.poetries.top/images/image-20210214215012251.png)

因为第一次进入是服务端直出的 `html` 结构，没有 `css` 。

`css` 是在客户端`js` 代码执行后动态插入到 `head` 内的，所以会出现抖动。

- 如何解决这个问题呢？

我们可以采用传统的方式来解决，将所有的`css`模块 打包成一个文件，然后在服务端直出的时候带上它，作为资源文件加载。

例如:

```text
<link rel="stylesheet" type="text/css" href="//s1.bigerfe.com/zz-static/css/styles.04403cf0.css">
```

- 具体如何实现？

可能你会说，我们这里路过来问题有点太多了吧，这一个接一个的。

不用怕，慢慢来，不怕问题多，就怕没问题。

来吧，一起搞定他！

## css 合并

在`webpack4`里需要使用`mini-css-extract-plugin`插件来将 `css` 进行合并。

看下具体配置

将`style-loader`替换为

```text
//...
  {
    loader: MiniCssExtractPlugin.loader,
  }
//...
```

设置`plugin`

```text
  //...
  plugins: [
        new MiniCssExtractPlugin({
        filename: '[name].css' //设置名称
    })]
```

上面的`[name]`为资源的名称，会使用当前配置的`entry`的名称，所以我们调整下`entry`定义,增加入口`main`

```text
//...
 entry:{
        main: resolvePath('../src/client/app/index.js'), //入口文件
    }
//...
```

同时将`js`的 `bundle` 的名称改为占位

```text
  output: {
        filename: '[name].js',
        path: resolvePath('../dist/static')
    }
```

## 服务端调整

经过上面的配置，我们已经将所有的 `css`打包到一个文件内。

![image-20210214215029876](https://img-repo.poetries.top/images/image-20210214215029876.png)

在服务端只需将`main.css`作为 `link` 直出即可。

```text
// ./src/server/middlewares/react-ssr.js

//...
    ctx.body=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${tdk.title}</title>
    <meta name="keywords" content="${tdk.keywords}" />
    <meta name="description" content="${tdk.description}" />
    + <link rel="stylesheet" type="text/css" href="/main.css" />
</head>

//...
```

启动服务，页面已正常显示。

看下具体效果

![image-20210214215052352](https://img-repo.poetries.top/images/image-20210214215052352.png)

## 小结

本节我们主要实现`react ssr`中的 `css` 的支持和处理。

客户端的处理，配置和我们以往单页开发中的配置没什么区别，主要是服务端方面的处理。

我们采用的方式比较直接，服务端构建前将导入的`css`模块代码移除，然后客户端配置将 `css` 提取到一个文件内，然后将 `css`作为`link`直出到浏览器端，解决了页面的抖动问题。

本节代码已上传

[github.com/Bigerfe/koa…(opens new window)](https://github.com/Bigerfe/koa-react-ssr/tree/better/packages/my-react-ssr-css)



# 构建生产环境

## 正文

诶？这么快就到生产环境了吗？我们的开发环境还没彻底完善呢，之前遗留的手动刷新页面才能看到最新效果的问题呢？

是的，的确有些地方还需要优化，但这个过程就像是““盖房子”。

当我们配置生产环境后，这个“毛坯房”就算是建造完成了，他已经能“用”，而剩下的那些优化和处理相当于是后期的“装修”，是为了让我们住的更舒服，体验更好。

“毛坯房”就像是骨架，骨架是基础，有了骨架后面的优化才有立足之地。

所以，我们本节一起来进行生产环境的配置、构建以及项目部署，让我们的“毛坯房竣工”。

## 生产环境都需要做哪些处理呢？

这里主要是对`webpack`进行相关配置，相信大家都玩过，那咱们就开门见山了。

- 对应的应该拥有一个独立的生产环境配置文件
- 设置环境变量，区分开发和生产环境
- 压缩`js css`资源，体积更小，提高下载速度
- `js`分包，基础库和业务代码分别打包，可以提高缓存利用率,提高页面渲染效率，节省用户流量
- 为打包的`bundle`名称配置`hash`值,这样有利于发布和资源缓存
- 生成资源映射表，用于服务端使用
- 有独立的发布命令
- 可以在本机运行生产环境 `server`，方便本地调试
- 开发环境做相应的调整

## 整体看资源的分布情况

先看下开发环境和生产环境的资源加载情况，然后下面再进行具体的实现。

![image-20210214215247731](https://img-repo.poetries.top/images/image-20210214215247731.png)

![image-20210214215257779](https://img-repo.poetries.top/images/image-20210214215257779.png)

通过上图可以比较清晰的看到生产环境和开发环境的差别。

下面来看具体实现

## 准备工作

安装所需 `npm` 包

```text
npm i optimize-css-assets-webpack-plugin 压缩 css
npm i uglifyjs-webpack-plugin 压缩 js
npm i mini-css-extract-plugin 提取 css ，上一节已介绍过
npm i clean-webpack-plugin 打包前清理 dist 目录
```

## 前端生产环境构建配置

`css js`相关的 `loader` 配置和我们前面介绍的开发环境的一致，所以这里仅介绍有区别的地方。

首先我们创建生产环境配置文件`./webpack/webpack.prod.config.js`

### 配置环境变量

```text
    plugins: [
        //...
        new webpack.DefinePlugin({
        'process.env': { NODE_ENV: '"production"'},//标识生产环境
        '__IS_PROD__': true//方便在代码中使用
        })
        //...
    ]
```

### 配置文件 hash

方便文件的发布和充分利用资源的强缓存

```text
//...
 output: {
        //设置 js
        filename: 'js/[name].[chunkhash:8].js',
        path: resolvePath('../dist/static'),
        publicPath: '/'
    }
//...
    
   new MiniCssExtractPlugin({
        //设置 css 
        filename:'css/[name].[contenthash:8].css'
        })
//...
```

### 压缩 js css 文件

使其体积更小，提高下载速度

```text
//压缩和优化 css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

//压缩 js 代码
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

//...

 optimization: {
        minimizer: [
            //压缩 js
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        drop_console: true,
                        drop_debugger: true
                    },
                    warnings: false,
                    ie8: true,
                    output: {
                        comments: false,
                    },
                },
                cache: true,
                sourceMap: false
            }),
            //压缩 css
            new OptimizeCSSAssetsPlugin()
        ]
    }
```

### js 分包

将基础库和业务代码分别打包

```text
optimization: {
       //...
        splitChunks: {
            cacheGroups: {
                libs: { // 抽离第三方库
                    test: /node_modules/, // 指定node_modules下的包
                    chunks: 'initial',
                    name: 'libs'// 打包后的文件名    
                }
            }
        }
    }
```

### 生成资源映射表，用于服务端使用

![image-20210214215320571](https://img-repo.poetries.top/images/image-20210214215320571.png)

```text
//生成 manifest 方便定位对应的资源文件
const ManifestPlugin = require('webpack-manifest-plugin');

//...

 plugins: [
        //生成 manifest
        new ManifestPlugin({
            fileName: '../server/asset-manifest.json',
        })
    ],
```

### 配置构建命令

```text
npm run client:build

// ./package.json

"client:build": "NODE_ENV=production webpack --config  ./webpack/webpack.prod.config.js",
```

这仅仅是前端资源的构建，还缺少服务端代码的构建。

### 完整前端生产环境配置代码

```text
// webpack/webpack.prod.config.js

//生产环境配置

//webpack 配置文件
const path = require('path')
const webpack = require('webpack');
//提取 css  插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//生成 manifest 方便定位对应的资源文件
const ManifestPlugin = require('webpack-manifest-plugin');

//压缩 js 代码
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

//构建前清理目录
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

//压缩和优化 css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

//路径转换
const resolvePath = (pathstr) => path.resolve(__dirname, pathstr);

process.env.BABEL_ENV ='development';//指定 babel 编译环境

module.exports = {
    mode: 'production',
    devtool: 'none',
    entry: {
        main: [resolvePath('../src/client/app/index.js')] //指定一个入口名称
    },
    output: {
        filename: 'js/[name].[chunkhash:8].js',
        path: resolvePath('../dist/static'),
        publicPath: '/'
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: "sass-loader"
                    },
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name].[hash:8].[ext]',
                        publicPath: '/'
                    }
                }]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css'
        }),
        // 清理上一次构建的文件
        new CleanWebpackPlugin(),
        //生成 manifest 方便定位对应的资源文件
        new ManifestPlugin({
            fileName: '../server/asset-manifest.json',
        }),
        new webpack.DefinePlugin({
        'process.env': { NODE_ENV: '"production"'},
        '__IS_PROD__': true
        })

    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        drop_console: true,
                        drop_debugger: true
                    },
                    warnings: false,
                    ie8: true,
                    output: {
                        comments: false,
                    },
                },
                cache: true,
                parallel: true,
                sourceMap: false
            }),
            new OptimizeCSSAssetsPlugin()
        ],
        splitChunks: {
            cacheGroups: {
                libs: { // 抽离第三方库
                    test: /node_modules/, // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'libs'// 打包后的文件名，任意命名    
                }
            }
        }
    }
}
```

## 服务端生产环境配置

我们需要在已有的配置`webpack.server.config`中兼容生产环境的配置。

### 定义环境变量

在服务端就可以通过以下变量来判断当前环境。

```text
process.env.NODE_ENV:production|development
```

`__IS_PROD__:true|false` 简易访问

```text
//获取当前环境
const isProd=process.env.NODE_ENV==='production';


//...
    plugins:[
        new webpack.DefinePlugin({
        'process.env': { NODE_ENV: `"${process.env.NODE_ENV}"`},
        '__IS_PROD__':isProd
        })
    ]
//...
```

### 定义生产目录别名

因为在服务端执行需要导入静态资源映射表`asset-manifest.json`，定义别名更方便导入。

```text
//...
 resolve: {
        alias: {
            //定义 dist 目录别名，方便导入模块
            '@dist': path.resolve(__dirname,'../dist')
        }
    }
/...
```

### 服务端代码调整

服务端需要根据当前环境来启动，生产环境需要得到`js css` 资源文件，然后作为资源和 `html` 结构一同直出给浏览器端。

#### 创建资源处理模块

新建`src/server/common/assets.js`模块，用于服务端对静态资源的读取。

下面代码是一个完整的模块，最终返回静态资源的 `html` 标记。

```text
//生产环境中 静态资源的处理
module.exports = function () {

    let devHost = '//localhost:9001';

    let jsFiles = ['libs.js','main.js'];
    let cssFiles = ['main.css'];

    const assets = {
        js: [],
        css: []
    };
    if (!__IS_PROD__) {//开发环境
        assets.js.push(`<script type="text/javascript"  src="${devHost}/libs.js"></script>`);
        assets.js.push(`<script type="text/javascript"  src="${devHost}/main.js"></script>`);
        assets.css.push(`<link rel="stylesheet" type="text/css" href="${devHost}/main.css" />`);
    } else {
        //生产环境 从 asset-manifest.json 读取资源
        const map = require('@dist/server/asset-manifest.json');
        jsFiles.forEach(item => {
            if(map[item])
                assets.js.push(`<script type="text/javascript"  src="${map[item]}"></script>`)
        });
        cssFiles.forEach(item => {
            if(map[item])
                assets.css.push(`<link rel="stylesheet" type="text/css" href="${map[item]}" />`)
        });
    }

    return assets;
}
```

#### ssr 中间件 `react-ssr.js` 调整

```text
//导入资源处理库
const getAssets = require('../common/assets');

//得到静态资源
const assetsMap = getAssets();

//绑定资源

//...
    ctx.body=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${tdk.title}</title>
    <meta name="keywords" content="${tdk.keywords}" />
    <meta name="description" content="${tdk.description}" />
     ${assetsMap.css.join('')} //输出 css 资源
</head>
<body>
    <div id="root">
       ${html}
    </div>
    <textarea id="ssrTextInitData" style="display:none;">
    ${JSON.stringify(fetchResult)}
    </textarea>
</body>
</html>
</body>
 ${assetsMap.js.join('')}  //输出 js 资源
`;

//...
```

### 服务端生产环境构建命令

配置 `npm scripts` 命令,同时设置环境变量为`NODE_ENV=production`，必须要有此设置，否则会按照开发环境执行。

```text
"server:build": "NODE_ENV=production webpack --config  ./webpack/webpack.server.config.js"
```

### 生产环境服务启动

方便本地查看和调试

```text
npm run prod:start
 "prod:start": "node ./dist/server/app.js"
```

## 开发环境调整

因为最初在开发环境对`js`资源打包没有分包，所以这里要和生产环境统一。

这里为了方便演示，生产环境和开发环境采用的两个独立的配置文件，其实可以将相同的配置提取出来，然后使用`webpack-merge`进行合并。

```text
// ./webpack/src/webpack-dev.config.js

//...
    optimization: {
        splitChunks: {
            cacheGroups: {
                libs: { // 抽离第三方库
                    test: /node_modules/, // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'libs'// 打包后的文件名，任意命名    
                }
            }
        }
    }
//...
```

## 最终的构建命令

```text
npm run build
 "scripts": {
    "build": "NODE_ENV=production npm run client:build && npm run server:build",
    "client:build": "NODE_ENV=production webpack --config  ./webpack/webpack.prod.config.js",
    "server:build": "NODE_ENV=production webpack --config  ./webpack/webpack.server.config.js",
    "prod:start": "node ./dist/server/app.js"
  },
```

到此全部配置完成，具体运行效果看下图

![image-20210214215343090](https://img-repo.poetries.top/images/image-20210214215343090.png)

## 项目部署

通常一个项目线上运行都会使用`nginx`做反向代理，请求都会发到`nginx`服务，然后再转发到我们的`node`服务，而`node`服务的进程守护一般都会用`pm2`来做。

下面代码便是我们使用`pm2`来启动服务

```text
PORT=9001 pm2 start ./dist/server/app.js -n xxx.com -o "/data1/logs/xxx.com.-out.log" -e "/data1/logs/xxx.com-err.log" --watch
//参数说明 
PORT=9001 //指定服务启动的端口
pm2 start ./dist/server/app.js //服务入口文件
-n xxx.com //设置服务名称
-o xx //设置日志文件
-e xx //设置错误日志文件
--watch //开启监听，文件改动会自动重启
```

## 小结

本节我们完成了生产环境的搭建和配置，我们的“毛坯房”建成了， 完成了一个重大的里程碑。

客户端配置就像是我们开发单页时的配置一样， 差别主要在于如何处理服务端代码构建，以及静态资源的规划。

后面我们就需要对我们的“房子”进行装修了，也就是优化，有哪些需要优化地方呢？咱们后面接着聊。

本节代码地址

[github.com/Bigerfe/koa…(opens new window)](https://github.com/Bigerfe/koa-react-ssr/tree/better/packages/my-react-ssr-prod)



# 双服务模式热更新

## 正文

上一节我们完成了生产环境的配置，从本节开始一起来做一些“装修”的工作，让应用骨架的开发体验更好,同时也是解决我们之前留下的坑。

良好的开发体验可以大大提高我们的开发效率，目前有一个明显的缺陷，开发环境中需要手动刷新页面来看效果。

而我们要做的就是 - 搞定他！

使用`webpack --watch`来动态监听前端文件的改变并实时打包，输出新`bundle.js`文件，这样文件多了之后打包速度会很慢，此外这样的打包方式不能做到`hot replace`，即每次`webpack`编译之后需要手动刷新浏览器。

所以本节我们就是用热更新机制来解决这个问题。

## 热更新

对于热更，相信大家都有所了解，一种是热重载，一种是模块热替换。

我们这里要实现的是模块热替换。

## webpack-dev-server

因为该模块已经内置了热更新机制，只需要进行一些简单的配置就能将这个特性继承到我们的项目中。

所以开发环境中实现热更新推荐使用`webpack-dev-server`。

ps:`webpack-dev-server`后面都使用`wds`简称来代替

该库的作用主要是用来提供静态资源文件的更新和访问。其内部会启动一个基于`express`的`http`服务器。 该`http`服务和浏览器之间使用`websocket`进行实时通讯。当原始文件作出改动后，`wds`会实时编译，但是最后的构建文件并没有输出到硬盘，而是全部载入内存，省去了每次对磁盘的 `io`，所以性能上也较以往的方式有很大的提升。

启动`webpack-dev-server`服务有2种方式：

1. 通过 `cmd line`
2. 通过`Node.js API`

为了可以更加灵活控制，我们采用`API`方式来启动。

另外还需要结合`react-hot-loader`库来实现 `react` 开发环境下的热更新。

## 具体实施

### 端口约定

我们约定`webpack-dev-server`服务端口为`9002`，应用骨架的`node server`启动端口为`9001`,保持不变。

ps:这些端口可以根据自己的喜好来调整。

### 安装模块

```text
npm i webpack-dev-server -D
```

`react-hot-loader` 可以结合 `wds` 实现热更新过程中保存 `react` 组件的状态不丢失

```text
npm i react-hot-loader -D
```

### react-hot-loader 配置

```text
.babelrc` 内增加 `react-hot-loader/babel
// .babelrc
{
  "plugins": ["react-hot-loader/babel"]
}
```

- 根组件使用热导出

```text
// src/client/app/layout.js

import { hot } from 'react-hot-loader/root';
class Index extends React.Component{
//...
}
export default hot(Index);
```

- 安装`@hot-loader/react-dom`

它替换了同一版本的`react-dom`包，使用了额外的补丁来支持热重新加载。

直接使用`react-dom`，控制台会出现下面的警告

![image-20210214215636524](https://img-repo.poetries.top/images/image-20210214215636524.png)

- `webpack`配置入口`entry`调整

```text
//webpack.dev.config
module.exports = {
  entry: {
        main:['react-hot-loader/patch',resolvePath('../src/client/app/index.js'), //入口文件
    }
```

### wds 配置

通过 `api` 方式启动 `wds` 服务时，会忽略`webpack.dev.config`内的配置，需要将配置作为参数传递给`WebpackDevServer`。

创建一个 `wds` 配置文件

```text
// webpack/scripts/webpack-dev-server.config.js

const path  = require('path');

module.exports = function (port,publicPath) {
    return {
        quiet: true,//不显示构建日志
        contentBase: path.resolve(__dirname, '../../dist/static'),
        publicPath: publicPath,//必须和 webpack.dev.config 配置一致
        hot: true,
        progress:true,
        open: false,
        compress: true,
        watchOptions: {
            ignored: /node_modules/,
            //当第一个文件更改，会在重新构建前增加延迟。
            //这个选项允许 webpack 将这段时间内进行的任何其他更改都聚合到一次重新构建里。以毫秒为单位：
            aggregateTimeout: 500,
            //指定毫秒为单位进行轮询
            poll: 500
        }
    }
}
```

### 相关 api 调用

在 `webpack/scripts`下创建`wds-start.js`文件，用于启动 `wds` 服务。

1. 获得 `webpack compiler`

`wds` 需要和 `webpack` 相结合才能工作

```text
//webpack dev 环境配置
const clientConfig = require('../webpack.dev.config');

// 获得webpack compiler
function getWebPackCompiler() {
    return webpack(clientConfig);
}
```

1. 创建 `wds` 服务

这里的服务指的是 `wds` 内部会启动一个 `http server`，用来支持 `socket` 和 资源访问。

```text
//wds 配置
const getWdsConfig = require('./webpack-dev-server.config');

//创建 wds 服务
function createWdsServer() {

    let compiler = getWebPackCompiler();

     compiler.hooks.done.tap('done', function (data) {
        console.log('\n wds server compile done'); //编译完成时的提示 
    });
    
    return new WebpackDevServer(compiler, getWdsConfig(clientConfig.output.publicPath));
}
```

1. 启动 `wds` 服务

`createWdsServer`会返回一个 `http server` 实例,这里启动的端口设置为`9002`。

```text
// 启动 WebpackDevServer

function runWdsServer() {

    let devServer = createWdsServer();
    let port=9002;//wds 服务端口
    devServer.listen(port,'localhost',err => {
        if (err) {
            return console.log(err);
        }
        console.log(chalk.cyan('Starting the development node server...\n'));
    
        console.log('🚀 started');
    });

}

runWdsServer();
```

### 关键 - 配置 publicPath

`wds` 和 `webpack.dev.config` 的`publicPath`必须一致，否则热更新会无效，会默认请求到`node server`，导致静态资源访问无效。

下面对`webpack.dev.config.js`进行调整，端口指向的是`wds`的端口`9002`，因为所有的静态资源现在是由`wds`提供的。

```text
// webpack.dev.config.js

 output: {
     //...
    publicPath: 'https://localhost:9002/'
}
```

### 配置 npm scripts 命令

```text
"wds:watch": "BABEL_ENV=development node ./webpack/scripts/wds-start.js",
npm run wds:watch
```

![image-20210214215704693](https://img-repo.poetries.top/images/image-20210214215704693.png)

从上图可以看出编译已经通过，而且支持实时编译，但是热更新还看不出来。

## 调整开发环境启动命令

```text
// webpack/start.js

//移除 webpack -watch 监听
- spawn('npm', ['run', 'fe:watch'], { stdio: 'inherit' });

//增加 wds 监听
+ spawn('npm', ['run', 'wds:watch'], { stdio: 'inherit' });
```

### 客户端渲染入口代码配置

```text
// src/client/app/index.js

//只有在开发环境才启用热更新
if (process.env.NODE_ENV==='development' &&  module.hot) {
    module.hot.accept();
}
```

### 更改 `node server` 的 `js` 脚本地址

因为我们采用的是双服务模式

- `wds` 服务提供静态资源服务
- `node server` 提供 ssr 能力

所以我们需要将静态资源的地址指向 `wds` 服务的`9002`端口

```text
// src/server/common/assets.js

- let devHost = '//localhost:9001';
+ let devHost = '//localhost:9002';

//...
```

## 测试 - 启动热更新

执行 `npm run dev`

看下图，`socket`已成功建立链接,后面只要更新了文件就会自动更新页面，且页面不会刷新,组件的状态也不会丢失。

![image-20210214215733222](https://img-repo.poetries.top/images/image-20210214215733222.png)

## 小结

本地开发服务启动后，会启动三个进程，其中包含两个服务，也就是我们最开始说的双服务，`wds`服务和`node server`,在这两个服务的配合下完成了开发环境的热更新开发体验。

1. `wds`服务进程，提供静态资源访问和热更新功能
2. 服务端代码监听进程
3. `node http server` 提供`react ssr`能力

`node server` 会从`wds 9002`端口服务上加载静态资源。

好了，本小节到此结束，快来试试热更新吧。

本节代码已上传

[github.com/Bigerfe/koa…(opens new window)](https://github.com/Bigerfe/koa-react-ssr/tree/better/packages/my-react-ssr-HMR)



# 基于路由的按需渲染

## react ssr 下的路由分割 - 按需渲染

到这里，我们的应用骨架已相对完善，已经可以 用来进行实际项目开发，但是仍然不够，还有优化的空间。

现在的所有业务代码都打包到了一个文件内`main.js`。

若开发一个真实的项目，在开始阶段页面较少，支持的业务较少，`js` 代码体积并不会太大，但是随着时间的推移，这个 `js` 文件会变得越来越大，有可能超过`1M`。

过大的文件会严重影响页面的加载速度，直接影响用户体验。

## 如何优化

代码全部打包到一个文件内在访问时被全部加载，但用户当前访问的也就一个页面，所以我们只需要当前页面的业务代码就可以了，其他页面的代码是不需要加载的，当用户访问的时候再加载和执行岂不是更好？

所以我们本节开始来实现基于路由的按需渲染。

## 需渲染原理

早期接触过 `webpack2` 的同学应该都知道`require.ensure`方法，甚至使用过该方法来实现按需加载。

这个 `Api` 的作用就是用来实现代码分割，它会单独打包指定的文件，不和主文件打包在一起。

不过后来有了更加规范的方式来实现按需加载-`动态导入`。

```text
const A = import('./pages/A');
```

并且在`webpack2`版本中早就支持了该特性，只需要配置`@babel/plugin-syntax-dynamic-import`插件便可使用。

也就是说从`webpack2`开始已经支持了`require.ensure`和动态导入两种方式来实现按需加载。

这里我们主要介绍下使用动态导入的方式来实现按需加载。

`import()`只是一个语法糖，当前模块没有加载时，内部会发起一个`JSONP`请求来加载目标代码模块， 返回值是一个`Promise`对象，可以在`then`方法内得到真正的模块。

```text
// pages/a.js
export default class A{
    //...
}

import('./pags/a').then({default:A}=>{
    
    //...
})
```

代码拆分和异步加载逻辑`webpack`已帮我们完成。

那动态导入怎样和`react`结合来实现按需加载呢？

## 具体实现

实现按需加载并不复杂，官方也有很多 `demo` 可以参考。

在`react router3`下实现按需加载更简单，但是 `react router4`就完全不同了。

在`v3`中，路由提供了特定的属性来支持，下面简短的几行代码就达到了按需加载的效果。

```text
const A = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/A').default)
    },'A')
}

//配置route
<Route path="/a" getComponent={A} />
```

## react router4 按需渲染

我们需要抽象一个`AsyncBundler`组件，用于按需加载。

我们为该组件添了一个`state mod`状态， 表示异步加载(import())完成后得到的组件，并且加载过程增加`laoding`显示。

该组件还接收一个`load props`，此属性为`Promise`类型，用于动态导入其他组件，当`AsyncBundler`挂载完成后，在`componentDidMount`事件内执行异步组件的加载,也就是`props. load`方法，在`then`方法内得到加载成功的异步组件，同时更新`AsyncBundler`组件的`state.mod`，完成渲染。

以下是该组件完整代码

```text
/**
 * 容器组件，组件按需加载器
 *
 * @class Bundle
 * @extends {Component}
 */
export default class AsyncBundle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mod: null//自身状态
        };
    }

    componentDidMount() {
        if (!this.state.mod) {
            this.load(this.props);
        }
    }


    load(props) {
        this.setState({
            mod: null
        });
        //注意这里，使用Promise对象; mod.default导出默认
        props.load().then((mod) => {
            this.setState({
                mod: mod.default ? mod.default : mod
            });
        });
    }

    render() {
        return this.state.mod ? this.props.children(this.state.mod) : <LoadingCompoent/>;
    }
}
```

组件的具体用法如下

```text
 <AsyncBundle load={()=>import('../pages/a'))}>
            {(Comp) => <Comp />}
 </AsyncBundle>
```

为了使用更方便，我们对上面的写法再次进行封装，只需要调用一个方法就可以。

```text
//异步加载组件的高阶函数

import AsyncBundle from './async-bundle';
import React from 'react';
function AsyncLoader (loader) {

    function asyncFn(props) {
       return <AsyncBundle load={loader}>
            {(Comp) => <Comp {...props}/>}
        </AsyncBundle>
    }
    
    return asyncFn;
}

export default AsyncLoader;
```

封装后的用法如下，这样使用可以节省不少代码。

```text
 AsyncLoader(() => import('../pages/index')),
```

## 路由改造

我们可以通过`/*webpackChunkName:"chunk-index"*/`的方式来执行文件名称，默认按照数字来命名.

```text
//组件动态加载容器
import AsyncLoader from './async-loader';

export default [
    {
        path: ['/','/index'],
        component: AsyncLoader(() => import(/*webpackChunkName:"chunk-index"*/'../pages/index')),
        exact:true
    },
    {
        path: '/list',
        component: AsyncLoader(() => import('../pages/list')),
        exact: true
    },
    {
        path: '*',
        component: pageNotFound,
        exact: true
    }
]
```

## react ssr 按需加载的坑

路由改造完成后，已经可以看效果，同时控制台也能看到按需加载的包。

![image-20210214215955835](https://img-repo.poetries.top/images/image-20210214215955835.png)

但是页面效果并不是我们所期望的。

页面显示时会先显示`loading...`，然后又渲染了对应的组件。

此时查看网页源代码发现并没有具体内容，也就是我们的`ssr`无效了。

![image-20210214220012343](https://img-repo.poetries.top/images/image-20210214220012343.png)

## 处理 ssr 无效问题

路由按需加载后，服务端渲染的组件发生了改变。

组件按需加载仅仅是针对浏览器端的，在服务器端是没必要。由于路由对应的组件外层包裹了一个动态渲染组件，服务端执行时他并没有得到真正的组件，所以`ssr`直出的内容会显示为一个`loading`。

比如非按需时会渲染`A`组件，现在改造成按需渲染此时`A`外层会包裹`AsyncBundle`组件，所以在服务端渲染的组件变成了`AsyncBundle` 容器组件。

其实在服务端根本不需要按需，只需要一个路由的静态配置就可以了。

如何处理呢？

服务端在路由匹配前，将动态化为静态路由（也就是预加载）。

看下转换代码，就明白了。

```text
转为静态路由
//将路由转换为静态路由
async function getStaticRoutes(routes) {

    let len = routes.length,
        i = 0;
    const staticRoutes = [];

    for (; i < len; i++) {
        let item = routes[i];
        if (checkIsAsyncRoute(item.component)) {
            staticRoutes.push({
                ...item,
                ...{
                    component: (await item.component().props.load()).default
                }//调用下load方法得到返回值即可
            });
        } else {
            staticRoutes.push({
                ...item
            });
        }
    }
    return staticRoutes; //返回静态路由
}
```

上面方法返回了一个静态配置的路由，之后的匹配和渲染都基于这个静态路由。

这里有个点可以优化一下，把查找的结果缓存起来，没必要每次请求都去转换一次。

看下`ssr`中间件代码的改造

```text
// src/server/middlewares/react-ssr.js 主要变更代码
//...

//获得静态路由
const staticRoutesList = await getStaticRoutes(routeList);

//查找到的目标路由对象

let matchResult = await matchRoute(path, staticRoutesList);

let { targetRoute, targetMatch } = matchResult;
//....

//staticRouter 也是用静态路由 staticRoutesList

const html = renderToString(<StaticRouter location={path} context={context}>
        <App routeList={staticRoutesList}></App>
    </StaticRouter>);
```

查看效果后，`ssr` 组件直出问题解决。

不过还有问题。。。

这次页面的效果更加神奇了，先显示服务端直出的内容，随后显示`loading`，然后`loading`消失，又显示了组件的内容。

## 处理客户端覆盖渲染问题

为什么浏览器接管后，页面还会出现`...loading`并且一闪而过呢?

这里请大家屏气凝神的想一下，其实很简单。

非按需渲染时是不会出现 `loading` 的吧，不过这好像是废话。

那么按需的时候出现`loading`，其实是在等待异步 `js` 代码的加载， 动态创建 `script`后，`js`代码的请求和下载也是需要时间的。

所以呢？

我们应该等这段异步`js`代码下载完后再去执行渲染是不是就好了呢？

答案是对的！

那如何做呢？

```text
组件查找
```

客户端渲染前先进行路由查找,得到对应的组件后，调用组件的异步渲染方法`load`，等待其加载完后，再进行组件的`DOM`渲染。

具体实现如下

```text
//提取出挂载到 dom 方法
function renderDom(routeList) {
        //渲染index
        ReactDom.hydrate(<BrowserRouter>
                <App routeList={routeList} />
        </BrowserRouter>
                , document.getElementById('root'))
}

//渲染入口
function clientRender(routeList) {

        let initialData = JSON.parse(document.getElementById('ssrTextInitData').value);

        //查找路由
        let matchResult = matchRoute(document.location.pathname, routeList);
        let { targetRoute } = matchResult;
        if (targetRoute) {
                //设置组件初始化数据
                targetRoute.initialData = initialData;
                //****等待异步脚本加载完成****
                if (targetRoute.component[proConfig.asyncComponentKey]) {
                    targetRoute.component().props.load().then(res => {
                    //异步组件加载完成后再渲染页面
                    console.log('异步组件加完成');
                            
                    //加载完成再执行 dom 挂载    
                    renderDom(routeList);
                    });
                }

        } else {
                renderDom(routeList);
        }
}

//渲染入口
clientRender(routeList);
```

到这里，一个完整的`react ssr` 路由按需加载就完成了，小伙伴们抓紧来试试吧。

## 其他方式实现按需渲染

在上面我们是自己手写的异步组件加载器,当然业界也有很多比较成熟的工具库,原理和我们的实现差不多，只是容错更强，功能更丰富。

下面几个现有库，有兴趣的可以自己试试。

```text
react-async-component
react-loadable //广泛使用
@loadable/component
react-imported-component
react-universal-component
```

`react-loadable` 该库是一个轻量级的代码分割组件，用于加载动态导入的组件，而且它考虑了非常多的边界情况，支持预加载、`ssr`，业内使用度很高。

**遗留问题**

路由分割后，会导致热更新无效，现在官方也依然存在这个 `issue`，现在唯一的办法就是牺牲热更新对状态的保存,但不影响模块热替换。

## 小结

这一节我们完成了一个重大的优化，实现了基于路由的按需渲染。

单纯实现组件的按需加载还是很容易的，关键是和`react ssr`结合后该如何解决出现的各种问题。

要知道在服务端不需要动态导入，服务端只需要处理静态路由即可，所以我们在使用前将动态路由转换为了静态路由。

另外客户端渲染也需要注意，需使用预加载，等异步组件加载完成再进行`DOM`的挂载，否则会出现客户端覆盖服务端渲染的问题。

本节代码已上传

[github.com/Bigerfe/koa…(opens new window)](https://github.com/Bigerfe/koa-react-ssr/tree/better/packages/my-react-ssr-routesplit)



# 使用高阶组件优化数据同构

## 正文

在之前的小节中我们已经完成了数据同构，如果用来进行实际项目开发的话也能满足，但是有些时候用起来不够舒服，因为还存在一些不足和一些可以优化的空间。

当然这也是可以理解的，我们之前的阶段是建造阶段，为的是满足需求而已，现在是装修优化阶段，所以是时候把这些瑕疵给干掉了。

到底有哪些地方需要优化呢？下面一步一步来看。

## 组件内`state`初始化存在重复逻辑

下面这段代码是`list`页面组件构造函数内的数据获取逻辑，通过`__SERVER__`这个全局变量来判断是否是服务端渲染还是客户端渲染，最后给到`state`初始值。

```text
//...

 constructor(props) {
        super(props);   

        let initialData = null;//初始化数据
        if(__SERVER__){
            //如果是在服务端执行
            initialData = props.staticContext.initialData||{};
        }else{
            //客户端渲染
            initialData = props.initialData || {};
        }
        this.state=initialData;
    }

//...
```

一个正常的项目，都会有多个页面，那么上面的逻辑会出现每一个页面内，而且都是重复的代码。

## 组件`componentDidMount`存在重复代码

下面代码实现了当没有初始化数据的时候会在客户端进行异步数据获取，然后更新渲染。

另外还会设置当前页面的 `title`。

逻辑上好像没什么毛病，但是这段代码也会同时出现在h很多页面内。

```text
  componentDidMount() {
        if (!this.state.fetchData) {
            //如果没有数据，则进行数据请求
            Index.getInitialProps().then(res => {
                this.setState({
                    fetchData: res.fetchData || [],
                    page:res.page
                });
                //设置 title
                document.title = res.page.tdk.title;
            })
        }

        if (this.state.page && this.state.page.tdk) {
            //设置 title
            document.title = this.state.page.tdk.title;
        }
    }
```

## 直出的页面无法更新数据

如何理解这个问题？

这个问题隐藏的比较深，如果不仔细观察可能会被忽略。

我就详细的描述的下。

首次进入一个页面`/A`，`/A`页面肯定是服务端渲染的，浏览器接管页面后会进行继续渲染，完成页面事件和交互处理。

但是当在浏览器端进行路由切换，再回到这个页面`/A`时，数据仍然是服务端直出的数据。

无论你切换路由的方式是`PUSH`还是`POP`，`/A`页面的数据永远不会更新。

本骨架现在是通过组件的属性带入直出的数据。

```text
props.initialData
```

目前我们只实现了通过该属性进行数据的获取，但是缺少路由切换时的更新机制,所以每次切换到`/A`页面，数据永远都是当初直出的数据。

## 解决问题

### 代码重复问题

前两个代码重复代码的问题应该是比较好解决，可以使用`高阶组件`来解决，同时还可以统一页面组件内获取数据的属性字段。

比如在服务端或者前端环境都使用 `props.initailData` 来获取数据,其他逻辑均可以封装在高阶组件内。

```text
高阶组件代码参考
export default (SourceComponent) => {
    return class HoComponent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                initialData: {},
                getProps: false//浏览器端是否需要请求数据
            }
        }
        //用于服务端调用
        static async getInitialProps(props) {
            return SourceComponent.getInitialProps ? await SourceComponent.getInitialProps(props) : {};
        }


        async componentDidMount() {

            if(!this.state.initialData || !this.state.initialData.fetchData){
                HoComponent.getInitialProps().then(res=>{
                    //...渲染数据
                })
            }
        }

        render() {
            const props = {
                initialData: {},
                ...this.props
            };

            if (__SERVER__) {
                //服务端渲染
                props.initialData = this.props.staticContext.initialData || {};
            } else {
               //客户端渲染 props.initialData=this.props.initialData;
            }


            return <SourceComponent  {...props}></SourceComponent>
        }
    }
}
在页面组件中的使用
//组件
class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    static async  getInitialProps() {
        return {
            fetchData: //...,
            page:{
                tdk:{
                   // ...
                }
            }
        };
    }

    render() {
        //渲染数据
        const {fetchData,page} = this.props.initialData;
        const { code, data } = fetchData||{};
        
        return <div>
        //....
        </div>
    }
}

export default PageContainer(Index); 
```

从上面的代码可以看出，页面组件干净了很多，我们只需要关心数据获取和渲染部分即可。

### 直出组件数据不更新问题

问题原因我们已经分析过。

- props.history.action=PUSH 跳转 不会更新
- props.history.action=POP 后退 or 前进 不会更新

所以解决办法也很明确，判断`action`的值即可。

真的那么简单吗？

```text
if(props.history.action==='PUSH' || props.history.action==='POP')
update();
```

我们一步一步分析.

`action = PUSH` 这个操作没问题，`action=POP`就有问题，因为第一次进入页面的时候`action`的值也是`POP`。

看来很多问题并不是我们想象中那么简单，我们该如何处理`POP`呢？

**不过我们离答案已经很近了。非常近了。**

上面都是在分析问题，现在直接说结果吧。

当第一次进入页面的时候`action`值为`POP`,但是不会触发`popstate`事件，触发事件的时候都属于是客户端渲染。

我们可以在`popstate`事件内进行数据更新,当`action=PUSH`时更新数据，其他情况使用默认数据。

```text
//伪代码

const popStateCallback = ()=> {
    // 使用popStateFn保存函数防止addEventListener重复注册
   update();
};


async componentDidMount() {
  //注册事件，用于在页面回退的时候触发
    window.addEventListener('popstate', popStateCallback);
    
    if(this.props.history.action === 'PUSH'){
        update();
    }
}
```

下面来看下这个高阶组件的完整代码,可结合注释进行理解。

```text
let _this = null;//保存当前渲染的组件实例

const popStateCallback = ()=> {
    // 使用popStateFn保存函数防止addEventListener重复注册
    if (_this && _this.getInitialProps) {
        _this.getInitialProps();
    }
};
//高阶函数
export default (SourceComponent)=>{
    return class HoComponent extends React.Component {
        constructor(props) {
            super(props);

            this.state={
                initialData:{},
                canClientFetch:false//浏览器端是否需要请求数据的状态
            }
        }
        //用于服务端进行数据预取
        static async getInitialProps(props){
            return SourceComponent.getInitialProps ? await SourceComponent.getInitialProps(props):{};
        }

        //用于封装处理
        async getInitialProps(){
            // ssr首次进入页面以及,切换路由时才调用组件的getInitialProps方法
            const props = this.props;
            const res =  SourceComponent.getInitialProps ? await SourceComponent.getInitialProps(props) : {};
            this.setState({
                initialData: res,
                canClientFetch: true
            });

            let { tdk } = res.page;
            if (tdk) {
                document.title = tdk.title;
            }
        }
        //组件挂载完成事件
        async componentDidMount() {
            
            _this = this; // 保证_this指向当前渲染的页面组件
            //注册事件，用于在页面回退的时候触发
            window.addEventListener('popstate', popStateCallback);

            const canClientFetch = this.props.history && this.props.history.action === 'PUSH';//路由跳转的时候可以异步请求数据
            if (canClientFetch) {
                await this.getInitialProps();
            }
        }

        render() {
            // 只有在首次进入页面需要将window.__INITIAL_DATA__作为props，路由切换时不需要

            const props = {
                initialData:{},
               ...this.props
            };


            if(__SERVER__){
                //服务端渲染时
                props.initialData = this.props.staticContext.initialData||{};                
            }else{
                //客户端渲染
                if (this.state.canClientFetch) {
                
                    //获取异步请求数据
                    props.initialData = this.state.initialData||{};
                } else {
                    //首次加载使用页面数据
                    props.initialData = window.__INITIAL_DATA__;
                    window.__INITIAL_DATA__={};//使用过后清除数据,否则其他页面会使用
                }
            }
         
            return <SourceComponent  {...props}></SourceComponent>
        }
    }
}
```

## 干掉对路由的入侵

上面已经介绍过本骨架目前的同构渲染初始化数据是通过为路由增加属性，从而为路由对应的组件带入数据。

具体代码如下，通过`matchRoute`方法查找路由，然后为路由设置`initialData`属性，并赋值初始化数据。

```text
function clientRender() {

        let initialData = JSON.parse(document.getElementById('ssrTextInitData').value);

        //查找路由
        let matchResult = matchRoute(document.location.pathname, routeList);
        let { targetRoute } = matchResult;
        if (targetRoute) {
                //设置组件初始化数据
                targetRoute.initialData = initialData;
        }

        //渲染index
        ReactDom.hydrate(<BrowserRouter>
                <App routeList={routeList} />
        </BrowserRouter>
                , document.getElementById('root'))

}
```

然后在`App`组件内遍历`route`时会进行逻辑判断，如果路由存在`item.initialData`属性，则渲染时将`initialData`作为组件的属性，同时带入数据,这样页面组件就可以通过使用`props.initialData`属性来获取页面上的数据了。

```text
function App({routeList}) {
    return (
            <Layout> 
               <Switch>
                {
                    routeList.map(item=>{
                        return item.initialData ? <Route key={item.path} exact={item.exact} path={item.path}  render={(props)=>{
                            return <item.component {...props} initialData={item.initialData}></item.component>
                        }}></Route> : <Route key={item.path} {...item}></Route>
                    })
                }
                <Route to="*" component={Page404}></Route>
            </Switch>
            </Layout>
    );
}
```

这种数据和路由关联的方式没有问题，但是会对路由产生修改，侵入路由，并不推荐这样处理。

其实在上面的高级组件中我们已经解决了，就是将页面直出的数据作为全局变量。

```text
function clientRender(routeList) {

        let initialData = JSON.parse(document.getElementById('ssrTextInitData').value);
        window.__INITIAL_DATA__ = initialData;
        
        //...
}
```

那么下面这段用于在渲染前设置路由参数，并带入初始数据的代码就不需要了,简化了代码，降低了耦合。

```text
//....
//查找路由
    let matchResult = matchRoute(document.location.pathname, routeList);
    let { targetRoute } = matchResult;
    if (targetRoute) {
        //设置组件初始化数据
        - targetRoute.initialData = initialData;
    }
```

我们的`App`组件也更清晰了

```text
function App({routeList}) {
    return (
            <Layout> 
               <Switch>
                {
                    routeList.map(item=>{
                        - return item.initialData ? <Route key={item.path} exact={item.exact} path={item.path}  render={(props)=>{
                            props.initialData = item.initialData;
                            return <item.component {...props} />
                        }}></Route> : <Route key={item.path} {...item}></Route>
                        
                        + return <Route key={item.path} {...item} />
                    })
                }
            </Switch>
            </Layout>
    );
}
```

## 小结

本节咱们主要是对已有的数据同构进行优化，通过使用高阶组件将重复的逻辑进行提取，让页面组件变得更加简洁，开发者只需要关注数据和渲染即可。

然后解决了一个隐含的数据更新问题，直出到页面的数据会被注入组件，客户端路由切换时数据也不会更新。

我们采用的`history action`结合`popstate`事件结合处理，确定了客户端进行异步数据请求的时机。同时也清除了客户端渲染前对路由和组件的入侵，降低了耦合。

本节完整代码已上传

[github.com/Bigerfe/koa…(opens new window)](https://github.com/Bigerfe/koa-react-ssr/tree/better/packages/my-react-ssr-dataisobetter)



# CSS资源同构直出

## 正文

之前的小节中我们已经对 `css`做过处理，将所有的`css`打包到一个文件内,然后作为资源`link`和组件的 `html`内容一起直出到客户端。

![image-20210214220307869](https://img-repo.poetries.top/images/image-20210214220307869.png)

## 发现问题

上面的方式很简单也很有效。

但存在一些问题，当项目体量上来后`css`代码量剧增，导致最终打包的`css`文件会过大，另外只要一个页面的`css`内容产生变化，就会导致此文件的缓存生效，用户端就需要重新下载，最终会对体验和性能造成影响。

## 优化思路

如何来解决这个问题呢？

前面的小节中我们对`js` 业务代码进行了优化，使用了路由拆分，按需加载,只加载基础库和当前页面的代码，大大缩减了所需下载的资源体积。

所以我们也可以使用`按需加载`的方式对该问题进行优化处理。

## 实现分析

如何实现呢？

相信大家都用过`style-loader`，该库的作用是将模块引入的 `css`，在客户端渲染的时候以内联的形式动态插入到`head`内。

![image-20210214220322543](https://img-repo.poetries.top/images/image-20210214220322543.png)

上图便是我们在单页应用开发中的必然产物。

那么插入到`DOM`时的`css`内容从哪里获得的呢?

这里就需要说到`css-loader`了，它的存在是很强大的，`js`模块内导入的`css`文件能够被处理，全仰仗该库的作用。

该库会把`css`代码转换成`js`代码或者`css`字符串，最终和`js`模块代码打包在一起，之后便能够作为`js`代码的一部分加载到客户端，然后`style-loader`便会简单粗暴的使用`DOM`操作将`css`中的样式插入`head`内。

那上面这些内容和我们的 `css`按需加载有什么关系呢？

我们可以得到一些信息，`css-loader`可以让我们得到导入的`css`文件的内容，如果我们得到了这些信息就可以在服务端直出组件的时候将`css`代码一同直出。

当客户端接管页面后，后续的访问就是单页应用了，此时`css`就应该是由客户端代码动态插入到`head`标签内。

但是上面介绍的`style-loader`就无法胜任了，它只能运行在客户端，在服务端就无法愉快的玩耍了。

所以我们要使用一种同构的方式来处理，让双端都可以运行。

## isomorphic-style-loader

该库没有像`style-loader`那样直接进行`DOM`操作，而是导出了一些辅助方法，让用户依据实际情况来调用不同的方法。

可以参考下面部分源码来理解下

```text
//用于获得模块信息和 样式内容
exports._getContent = function() { return content; };
//获得 css 内容
exports._getCss = function() { return '' + css; };
//执行 dom 操作，将 css 动态插入到head 内
exports._insertCss = function(options) { return insertCss(content, options) };
```

可以先看下官方的说明,里面也包含了很多参考实例

[github.com/kriasoft/is…(opens new window)](https://github.com/kriasoft/isomorphic-style-loader)

## 具体实现

现在我们已经了解了`css`同构直出的原理，接下来进行一步一步的实现。

### 从开发环境开始，首先调整 webpack 配置

之前我们是使用插件`mini-css-extract-plugin`将`css`全部提取到一个文件内，现在这个插件就不需要使用了，替换为下面的配置。

```text
客户端配置
// webpack/webpack.dev.config.js

//...
  {
                test: /\.(sa|sc|c)ss$/,
                use: ['isomorphic-style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2
                        }
                    }, 'postcss-loader', 'sass-loader'
                ]
            }
//...
服务端配置
```

同时服务端`webpack.server.config.js`的配置和上面客户端的配置保持一致即可。

### 页面组件的调整

```text
// ./src/client/pages/index/index.js

//导入 css
import css from  './index.scss';
//导入高阶组件，用于同构处理 css
import withStyles from 'isomorphic-style-loader/withStyles'

//组件代码 略...


export default withStyles(css)(PageContainer(Index));
```

### 客户端渲染入口的调整

```text
//定义css处理逻辑，实现将 css 动态插入到`head`内

  const insertCss = (...styles) => {
                const removeCss = styles.map(style => style._insertCss());//客户端执行，插入style
                return () => removeCss.forEach(dispose => dispose());//组件卸载时 移除当前的 style 标签
        }


//导入内置的 context 组件，用于将上面的方法传递给子组件
import StyleContext from 'isomorphic-style-loader/StyleContext';
    
ReactDom.hydrate(<BrowserRouter>
    <StyleContext.Provider value={{ insertCss }}>
        <App routeList={routeList}/>
    </StyleContext.Provider>

</BrowserRouter>,document.getElementById('root'))；
//...
```

### 服务端 ssr中间件调整

基本上和客户端的渲染部分差不多，只是服务端只需要收集到所有组件的`css`样式内容。

```text
//定义存储组件 css 的变量
const css = new Set() // CSS for all rendered React components

//定义收集 css 的方法.此方法会在`withStyles`高阶组件内获得，然后执行该方法，完成 css 内容搜集。
const insertCss = (...styles) => styles.forEach(style => css.add(style._getContent()));

const html = renderToString(<StaticRouter location={path} context={context}>
<StyleContext.Provider value={{ insertCss }} >
    <App routeList={staticRoutesList}></App></StyleContext.Provider>
</StaticRouter>);

//...
```

### 配置基本完成，但存在问题

我们先来看下效果。

本地启动服务并运行，查看网页源代码的确能看到`css`直出到了页面。

![image-20210214220404500](https://img-repo.poetries.top/images/image-20210214220404500.png)

但是通过审查元素会发现问题，客户端也执行了插入，相当于是两份相同的 `css`。

![image-20210214220418139](https://img-repo.poetries.top/images/image-20210214220418139.png)

正常情况下应该是服务端直出了`css`内容，客户端在插入前需要判断是否可以插入。

```
根据什么来判断呢？
```

![image-20210214220439745](https://img-repo.poetries.top/images/image-20210214220439745.png)

上面截图中能看到`style`标签上都有`id`的属性，所以关键就在这里，猜想肯定是通过`id`来判断。

```text
//执行 dom 操作，将 css 动态插入到head 内
exports._insertCss = function(options) { return insertCss(content, options) };
```

`_insertCss`方法的内部逻辑也是通过 `id`来判断的。

下面是关键代码，一看便知。

```text
// https://github.com/kriasoft/isomorphic-style-loader/blob/master/src/insertCss.js
//...

//根据 id 获取对应的节点
 let elem = document.getElementById(id)
    let create = false

    if (!elem) {//如果节点不存在 才会执行插入
      create = true

      elem = document.createElement('style')
      elem.setAttribute('type', 'text/css')
      elem.id = id

      if (media) {
        elem.setAttribute('media', media)
      }
    }

//...
如何给 style 标签 增加 id呢？
id 的取值又是什么,又如何取值呢？
```

其实`isomorphic-style-loader`已为我们提供，只是有时候需要多尝试下。

```text
//用于获得模块信息 和 样式内容
exports._getContent = function() { return content; };
```

该方法会返回当前 `css`模块的`id`和样式信息。

在上面几张图中能看到`id`的取值是很长的字符串。之所以这么长，是因为在`development`环境中`id`值默认为模块的相对路径地址。

### 设置style标签 id

根据上面的分析，我们来对`react ssr`中间件做下调整。

```text
    const css = new Set() ;
    - React components
    const insertCss = (...styles) => styles.forEach(style => css.add(style.——getCss()));
    
    + React components
    const insertCss = (...styles) => styles.forEach(style => css.add(style._getContent()));//该方法会获得css id 值
```

增加转换逻辑，在直出时可以带上`style`标签和`id`属性。

```text
    const styles = [];
    [...css].forEach(item => {
        let [mid, content] = item[0];
        styles.push(`<style id="s${mid}-0">${content}</style>`)
    });
    //...
```

直出部分

```text
<head>
    <meta charset="UTF-8">
    <title>${tdk.title}</title>
    <meta name="keywords" content="${tdk.keywords}" />
    <meta name="description" content="${tdk.description}" />
    ${styles.join('')}
</head>
```

## 生产环境处理

经过上一步的处理，目前已经不会重复插入`style`了。

![image-20210214220457978](https://img-repo.poetries.top/images/image-20210214220457978.png)

开发环境是 ok 了，不过生产环境中，仍然有坑。

继续往下看。

生产环境也主要是调整下`webpack.prod.config.js`配置，移除`mini-css-extract-plugin`的使用，调整 下`scss`相关`loader`配置即可。

```text
   {
        test: /\.(sa|sc|c)ss$/,
        use: ['isomorphic-style-loader',
                {
                    loader: "css-loader",
                    options: {
                            importLoaders: 2
                        }
                }, 'postcss-loader', 'sass-loader'
            ]
    }
```

构建后，并启动生产环境服务。

![image-20210214220514712](https://img-repo.poetries.top/images/image-20210214220514712.png)

从上图中可以看出，在生产环境`style`标签的`id`不再是模块的相对路径，而变成了数字，比如`s19-0`。

其中的`s`为前缀，后面的`-0`其实没用，永远都是`-0`，源码中本身可以删除这个逻辑。

问题出现了，当我们审查元素的时候发现`style`标签增多了，又出现了重复的插入，客户端排重失败。

![image-20210214220529799](https://img-repo.poetries.top/images/image-20210214220529799.png)

原因是：客户端的模块 `id`和服务器的模块`id`值不同。

为什么不同呢 ？

因为环境问题，打包的目标平台不同，所以`node`和`浏览器`的打包内容也不同，所以就会导致模块的`id`值不同。

诶？可是在开发环境采用的是模块的路径是相同的，这个是肯定的。

#### HashedModuleIdsPlugin 解决模块 id 不稳定问题

该插件会根据模块的相对路径生成一个四位数的`hash`作为模块`id`, 主要用于生产环境。

ps:服务端打包配置也需要配置此插件

```text
new webpack.HashedModuleIdsPlugin({
  // Options...
})
```

ok，直接上插件。

```text
// ./webpack/webpack.prod.config.js

  plugins: [
        new webpack.HashedModuleIdsPlugin(),
    //...
    ]
```

重新启动服务后，得到了我们期望的结果。

![image-20210214220545056](https://img-repo.poetries.top/images/image-20210214220545056.png)

### 但是最后还有个 bug

这个问题很难发现，隐藏的比较深。

我在验证的过程中发现了`style`标签内容会被替换，经过一番折腾验证了这个问题。

然后经过研究和排查，最终确定这该同构库的一个 `bug`。

> insertCss.js 文件

![image-20210214220606381](https://img-repo.poetries.top/images/image-20210214220606381.png)

以上代码中，`id`排重验证没有问题，到后面，也就是我标注的地方，判断是有问题的。

但我没理解为什么加这个判断，干掉以后就正常了。

所以也顺便给官方提了一个 [pr (opens new window)](https://github.com/kriasoft/isomorphic-style-loader/pull/176)。

## 小结

本节我们再次对`css`代码进行了一次优化，采用的是同构直出的方式实现了`css`的按需加载，减少了请求次数，解决了单一文件的弊端。

另外也大致的了解了`style-loader`,`css-loader`以及`isomorphic-style-loader`的原理。

本节完整代码已上传

[github.com/Bigerfe/koa…(opens new window)](https://github.com/Bigerfe/koa-react-ssr/tree/better/packages/my-react-ssr-cssiso)



# 添加状态管理redux

## 正文

小册的内容进行到这里，本应用骨架的搭建已经接近尾声，整体上目前已经比较完善，可以用到实际项目开发中。

目前还缺少一个可选的能力 - 状态管理。

业内最有名的状态管理工具肯定是`redux`了，但实际上它并不是必须的，在实际项目中到底需不需要使用它，要根据自己的实际情况来定。

为了给我们实际场景中多一个选型，这一节我们将`redux`状态管理融入到我们的骨架中。

## redux 介绍

这里对`redux`做一个简单介绍，便于把大家带入主题。

在复杂应用中组件间的数据通信可能非常复杂，单纯通过层级关系进行数据传递会显得力不从心，难以维护。所以此时会使用`redux`来进行状态管理，或者其他的一些状态管理工具如`mobx`。

`redux`借鉴了函数式编程的思想，采用`Flux`单向数据流理念，将应用状态全局化、中心化，同时为实现对状态的管理封装了不同的方法，实现数据的顶层分发，并对我们的操作进行规范和约束。

可以参考下图来理解其理念。

![image-20210214220738696](https://img-repo.poetries.top/images/image-20210214220738696.png)

可能上面说的有点抽象，用人类的语言再说一下。

`redux` 将应用的数据`state`,集中到一个地方来进行存储管理，而不需要再单独的在组件内维护状态，状态的更新只能通过`redux`提供的规范和`api`来进行处理.。不在需要我们来手动调用`setState`来更新组件，其内部已经帮我们完成。

下面用伪代码简单介绍`redux`各个部分，帮我们更进一步理解`redux`。

- 数据管理 - `Store`

`Store` 是`redux`唯一保存所有`state`的容器,包含应用的状态和逻辑。

```text
//创建一个store
const store = createStore(reducer, defualtState);

//获得 store内的状态
const state = Store.getState();
```

- 数据源 - `Action`

表示在客户端触发，用于更新状态的动作,同时包含具体的数据，它是一个纯声明的数据结构，不提供逻辑。

在执行状态更新之前都会先产生一个`action`对象,用于来获取具体的数据。

```text
{
    type:'getList',
    data:{
        list:[1,2,3]
    }
}
```

- 状态整合 - reducer

`reducer`是一个纯函数，用于接收`action`，根据`action`的`type`和数据(data),来返回一个新的`state`。

```text
function xxxReducer(state = {},action){
    switch(action.type){
        case 'ADD':
            return {
                ...state,
                count:action.count
            }
    }
}
```

上面函数接收 `state` 和 `action` 两个参数, 其中 `state` 为上一个状态，也就是发起 `action` 时 `store`中的状态。

`action` 为一个真实的对象，其中必须含有一个为 `type`的属性。`reducer` 就是通过这个`action.type` 进行判断，来返回不同的 `state`。

- 数据更新 - dispatch

`dispatch`是`store`暴露出的一个方法，用于执行对`store`内数据的更新，它接收一个`action`对象，其内部会调用`reducer`来返回最新的状态，最后完成状态的更新。

```text
dispatch(action);//更新数据

const store  = store.getState();//获取最新数据
```

## 中间件和异步

上面是`redux`的基本用法，但是还不够。因为实际中没有那么简单的项目，比如我要从接口获取数据怎么办。

咱们上面介绍的只是在同步情况下的处理，更新数据直接`dispath(action)`就可以。

为此`redux`提供了一套中间件机制，可以让我们在派发`action`和执行`reducer`之间，做一些操作，比如做一个异步操作（从接口中拿数据）。

`redux`本身提供了`appleMiddleware`方法来接入中间件。

```text
const store = createStore(reducer, defualtState, applyMiddleware(..));
```

这里提一个比较常用的中间件`redux-thunk`，包括我们下面的实践中也会用这个。

## `react-redux`

为了更加方便的使`redux`和`react`相结合，我们需要使用`react-redux`库。

该库把`react`和`redux`链接在一起，内部进行了极强的封装，不在需要我们手动调用`setState`进行数据更新,当我们执行`dipatch(action)`时会自动更新状态，同时重新渲染组件。

该库更细节的使用就不多说了，更详细的可以参考下官方的文档。

[react-redux.js.org/(opens new window)](https://react-redux.js.org/)

下面我们来进行实践，在我们的`react ssr`应用骨架内接入`redux`。

## ssr 接入 redux

使用`redux`进行状态管理，虽然并不是必须的，但是从使用层面来讲可以大大简化我们的代码，更方便后期的维护，代码结构更清晰。

如何接入呢？

其实和我们开发`SPA`应用的使用方式差不多，只是需要针对双端做一些调整。

**下面我们在上一节代码基础上进行改造。**

### 准备工作

安装基础库

```text
npm i redux react-redux redux-thunk
```

### 创建 store

状态都由`store`来进行管理和存储，所以首先要先有`store`。

```text
// ./src/client/share/redux/store.js

import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

export default (defualtState={}) => {
  return createStore(reducer, defualtState, applyMiddleware(thunk));
}
```

上面是一个同构方法，双端都会调用。由于`node`模块具有缓存机制，所以我们需要导出一个函数来每次都能返回最新的`store`。

### 创建 reducer

该模块会对各个页面内的子`reducer`进行合并。

```text
// ./src/client/share/redux/reducer.js

//列表页面的子 reducer
import { reducer as listPage } from '../../client/pages/list/redux/index';

//关于页面的子 reducer
import { reducer as aboutPage } from '../../client/pages/about/redux/index';

//合并多个 reducer
import {combineReducers } from 'redux';

export default combineReducers({
    listPage,
    aboutPage
});
```

### 客户端渲染

首先要获得`sotre`对象，利用`Provider`组件可以使子组件从`context`上得到`store`。

```text
// ./src/client/app/index.js

import { Provider } from 'react-redux';
import getStore from '../../share/redux/store';

function renderDom(routeList,initialData) {
        
        const insertCss = (...styles) => {
                const removeCss = styles.map(style => style._insertCss());//客户端执行，插入style
                return () => removeCss.forEach(dispose => dispose());//组件卸载时 移除当前的 style 标签
        }

        //得到 store 对象
        const store = getStore(initialData);
        
        //将store 放入全局，方便后期的使用
        window.__STORE__ = store;
        
        //传递 store
        ReactDom.hydrate(<Provider store={store}>
        <BrowserRouter>
            <StyleContext.Provider value={{ insertCss }}>
            <App routeList={routeList} />
            </StyleContext.Provider>
        </BrowserRouter>
        </Provider>,document.getElementById('root'))
}

//...
```

### 改造 列表页面

下面拿我们项目中的列表页面举例,其路由为`/list`，同时模拟了异步数据的请求。

#### 创建 reducer action

个人习惯吧，我没有把`actions`,`reducer`,`action type`分文件存在，而是合并到了一起，感觉用起来更方便一些。

在`pages/list`下面创建`redux/index.js`文件。

```text
//假数据
import tempData from '../data';

//action type
export const ACTION_TYPE={
  changeList:'list/changelist'
}

//用于更新状态 action creater
const changeList = list => ({
  type: ACTION_TYPE.changeList,
  list
});

//异步获得数据 【副作用】 返回Promise类型
export const getInitialData = (props) => {
  return (dispatch, getState) => {
    return new Promise(resolve=>{
    //延迟 500ms 返回数据
      setTimeout(() => {
        const data = {
          fetchData: {
            code: 0,
            data: tempData
          },
          page: {
            tdk: {
              title: '列表页 - koa-react-ssr',
              keywords: '关键词 koa-react-ssr',
              description: '描述 koa-react-ssr'
            }
          }
        }
        resolve(data);
        //更新状态
        dispatch(changeList(data));
      }, 500);
    })
  };
};


//默认数据
const defaultState = {
  fetchData:{},
  page:{}
};

// reducer 返回一个全新状态
export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_TYPE.changeList:
      return {//通过共享结构返回一个新对象
        ...state,
        ...action.list
      };
    default:
      return state;//返回默认
  }
}
```

#### 页面组件改造

我们使用`connect`方法将组件和`redux`进行链接，以支持组件的状态传递和组件的自动更新。

另外需要对`数据预取`方法进行更改，不再是直接调用接口返回数据，而是使用`dispatch`。

```text
//src/client/pages/list/index.js
//列表页 组件

import React from 'react';
import {Link} from 'react-router-dom';
import css from './list.scss';

//action  获取初始化数据
import {getInitialData} from './redux/index';

//为了方便使用，封装的一个方法，下面会介绍
import isoConnect from '../../common/components/iso-connect';

class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    //数据预取方法 用于服务端调用 参数内可以获得store 
    static async  getInitialProps({store}) {
        //通过 dispach 获得数据,同时也会更新store
        return store.dispatch(getInitialData());
    }

    render() {
        //渲染数据 这里不变
        const {fetchData,page} = this.props.initialData;
        const { code, data } = fetchData||{};
        
        return <div className="list-page-box">
        {data && data.map((item,index)=>{
            return <div key={index}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
            </div>
        })}
        {!data&&<div>暂无数据</div>}
        </div>
    }
}

//将 store 中 state 转换为 props传递给组件
const mapStateToProps = state => ({
    initialData: state.listPage,
});

//将获取数据的方法也做为 props传递给组件
const mapDispatchToProps = dispatch => ({
    getInitialData() {
        console.log('dispath fetch data');
        return dispatch(getInitialData());
    }
});

// 封装了一层，为了方便，下面有介绍
export default isoConnect({
    css,
    mapStateToProps,
    mapDispatchToProps},Index);
```

**isoConnect 方法**

由于我们的页面组件内需要做 `css`同构，需要调用`PageContainer`高阶组件（提取了组件内的重复逻辑）,现在又需要调用`connect`方法， 这样一层又一层的写法很繁琐，所以为了方便使用，需要做一层封装，提取了一个`isoConnect`方法。

```text
import PageContainer from '../page-container/index';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles'

export default ({ css, mapStateToProps, mapDispatchToProps }, ActiveComponet)=>{
    return withStyles(css)
        (connect(mapStateToProps, mapDispatchToProps)(PageContainer(ActiveComponet)));
}
```

#### 高阶组件改造

需要对我们的`PageContainer`组件进行改造，主要是数据预取和数据初始化的处理,同时兼容不使用`redux`的页面。

```text
// ./src/client/common/comoponents/page-container
//高阶组件 用于提取重复逻辑

import React from 'react';

let _this = null;

const popStateCallback = () => {
    // 使用popStateFn保存函数防止addEventListener重复注册
    if (_this && _this.getInitialProps) {
        console.log('popStateFn');
        _this.getInitialProps();
    }
};

export default (SourceComponent) => {
    return class HoComponent extends React.Component {
        constructor(props, context) {
            super(props);
            console.log('props', props);
            this.state = {
                initialData: {},
                canClientFetch: false//浏览器端是否需要请求数据
            }
        }

        //转接子组件的预取方法，服务端会调用这个方法来做数据预取
        static async getInitialProps(ctx) {
            return SourceComponent.getInitialProps ? await SourceComponent.getInitialProps(ctx) : {};
        }

        //用于封装处理数据的更新逻辑
        async getInitialProps() {
            // ssr首次进入页面以及csr/ssr切换路由时才调用组件的getInitialProps方法
            const props = this.props;
            const store = window.__STORE__;//从全局得到 store 
            
            //兼容不使用 redux 的页面
            const res = props.getInitialData ? await props.getInitialData(store.dispatch) : (
                SourceComponent.getInitialProps? await SourceComponent.getInitialProps():{}
            );
            
            //处理页面 title 显示
            let { tdk } = res.page || {};
            if (tdk) {
                document.title = tdk.title;
            }
        }

        async componentDidMount() {

            _this = this; // 修正_this指向，保证_this指向当前渲染的页面组件
            //注册事件，用于在页面回退的时候触发
            window.addEventListener('popstate', popStateCallback);

            const canClientFetch = this.props.history && this.props.history.action === 'PUSH';//路由跳转的时候可以异步请求数据
            if (canClientFetch) {
                //如果是 history PUSH 操作 则更新数据
                await this.getInitialProps();
            }

        }

        render() {
            const props = {
                initialData: {},
                ...this.props
            };

            //客户端渲染
            if (this.state.canClientFetch) {//需要异步请求数据
                props.initialData = this.state.initialData || {};
            } else {
                props.initialData = this.props.initialData;
            }

            return <SourceComponent  {...props}></SourceComponent>
        }
    }
}
```

### 服务端渲染

只需要对`react-ssr.js`中间件做调整，导入`Provider`组件，得到`store`对象。

这里需要注意一点，调用数据预取方法后，`store`内的`state`会自动更新，组件在渲染的时候会自动获取，不在需要显示的通过`staticContext`属性进行传递。

```text
// 服务端 ssr 中间件
// ./src/server/middlewares/react-ssr.js

//...
import { Provider } from "react-redux";
import getStore from '../../share/redux/store';


export default async (ctx, next) => {

   //...

    //获得静态路由
    const staticRoutesList = await getStaticRoutes(routeList);


    //查找到的目标路由对象
    let matchResult = await matchRoute(path, staticRoutesList);
    let { targetRoute, targetMatch } = matchResult;

    //得到 store,默认没有数据
    const store = getStore();

    //进行数据预取，更新 store 内的数据
    let fetchDataFn,fetchResult={};
    if (targetRoute){
        fetchDataFn = targetRoute.component ?targetRoute.component.getInitialProps:null;
        if (fetchDataFn) {
            fetchResult = await fetchDataFn({store});//更新 state 
        }
    }
    
    //从数据预取的结果中得到 page 信息
    let { page } = fetchResult || {};

    let tdk = {
        title: '默认标题 - koa+react+ssr',
        keywords: '默认关键词',
        description: '默认描述'
    };

    if (page && page.tdk) {
        tdk = page.tdk;
    }

    const context = {};
    const css = new Set();
    //css  同构
    React components
    const insertCss = (...styles) => styles.forEach(style => css.add(style._getContent()));
   
    //使用 Provider 传递 store
    const html = renderToString(<Provider store={store}><StaticRouter location={path} context={context}>
        <StyleContext.Provider value={{ insertCss }} >
            <App routeList={staticRoutesList}></App></StyleContext.Provider>
    </StaticRouter></Provider>);

    const styles = [];
    [...css].forEach(item => {
        let [mid, content] = item[0];
        styles.push(`<style id="s${mid}-0">${content}</style>`)
    });

    //静态资源
    const assetsMap = getAssets();

    ctx.body = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${tdk.title}</title>
    <meta name="keywords" content="${tdk.keywords}" />
    <meta name="description" content="${tdk.description}" />
    ${styles.join('')}
</head>
<body>
    <div id="root">
       ${html}
    </div>
    <textarea id="ssrTextInitData" style="display:none;">
    //获得store 然后序列化直出到客户端
    ${JSON.stringify(store.getState())}
    </textarea>
</body>
</html>
</body>
 ${assetsMap.js.join('')}
`;

    await next();
}
```

代码层面改造已完成，下面看下具体展示

![image-20210214220816548](https://img-repo.poetries.top/images/image-20210214220816548.png)

![image-20210214220831449](https://img-repo.poetries.top/images/image-20210214220831449.png)

## 小结

本节我们完成了同构应用内的`redux`的接入，让我们的应用骨架更加的完善。

从本次改造中可以看出大部分还是我们平时`SPA`开发中的应用，最主要的部分还是`数据预取`，考查的是我们的对同构的理解。只要你熟悉`redux`的应用，那么在搞明白数据同构之后，相信你也能较快的接入`redux`。

改造的方案很多，但是其中原理和流程都是相同的，所以我们也可以迅速的集成`mobx`。

本节完整代码已上传

[github.com/Bigerfe/koa…(opens new window)](https://github.com/Bigerfe/koa-react-ssr/tree/better/packages/my-react-ssr-redux)



# SSR 双模式渲染支持以及其他细节梳理

## 正文

本节主要是补充一下以前没有提到的一些细节和一些问题以及解决思路，以便于我们可以更方便的应用本骨架进行业务开发，减少前期的一些时间准备成本。

本来打算将`csr/ssr`双模式渲染作为独立章节来说，但是具体的实现很简单，作为独立章节的话又确实没必要。

但是这个特性又非常重要，所以干脆将内容进行压缩一下，只说主要的部分，同时将本骨架的其他的一些细节合在一起介绍吧。

## ssr/csr 两种渲染模式支持

目前我们的骨架只是单纯的支持了`ssr`模式下的开发和运行，其实我们还可以做一个扩展，多加一个运行模式`csr`模式，这样整个应用就可以支持两种渲染模式。

我们可以根据需要来进行切换渲染模式，当应用的负载过大的时候我们也可以方便的切换为单页应用，这种临时处理方案可以迅速的降低服务器的压力。

### 实现说明

具体的实现很简单，我们在全局配置文件内增加一个配置，用于表示渲染模式。

我们目前是`ssr`模式，如果当前是`csr` 模式的话只需要返回一个空的`html`结构,然后向浏览器注入一个全局变量，表示当前的渲染模式。

其他的`css/js`资源正常按照`ssr`下的模式直出即可。

```text
增加一个全局设置
// ./src/share/pro-config.js
//双端公用的配置文件

module.exports = {
    __IS_SSR__:false,//是否为 ssr 模式
    wdsPort:9002,//wds 服务的运行端口
    nodeServerPort:9001,//node server 的监听端口
    asyncComponentKey:'__IS_ASYNC_COMP_FLAG__'//标志组件是否是按需加载 turn | false
}
服务端模式判断
```

我们在`ssr`中间件对渲染模式进行判断，如果是`csr`则返回一个空的页面骨架。

```text
let html="";//组件渲染结果
 if (proConfig.__IS_SSR__){
 //匹配路由
 //数据预取
 //组件渲染
 }

//...

    ctx.body = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${tdk.title}</title>
    <meta name="keywords" content="${tdk.keywords}" />
    <meta name="description" content="${tdk.description}" />
     ${assetsMap.css.join('')}
</head>
<body>
    <div id="root">
       ${html}
    </div>
    <textarea id="ssrTextInitData" style="display:none;">
    ${JSON.stringify(fetchResult)}
    </textarea>
</body>
</html>
</body>
<script>
//注入全局渲染模式
window.__IS__SSR__=${proConfig.__IS_SSR__};
</script>
 ${assetsMap.js.join('')}
`;
高阶组件调整
```

我们的高阶组件`PageContainer`用来管理客户端页面在路由切换时是否进行异步获取数据，所以当前若是`csr`模式，则每次在`componentDidMount`内直接获取数据,也不需要监听`popstate`事件了。

```text
// src/client/common/components/page-container/index.js

//...

async componentDidMount() {
            
            _this = this; // 修正_this指向，保证_this指向当前渲染的页面组件
            //只有当前是ssr模式才会注册事件，用于在页面切换时候触发
            window.__IS__SSR && window.addEventListener('popstate', popStateCallback);

            const canClientFetch = this.props.history && this.props.history.action === 'PUSH';//路由跳转的时候可以异步请求数据

            if (canClientFetch || !window.__IS__SSR) {//如果是 csr 模式，每次都需要异步请求数据
                await this.getInitialProps();
            }
        }


//...
```

完整代码：[github.com/Bigerfe/koa…(opens new window)](https://github.com/Bigerfe/koa-react-ssr/blob/better/packages/my-react-ssr-dataisobetter/src/client/common/components/page-container/index.js)

```text
看下整体的页面输出结果
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>默认标题 - my react ssr</title>
    <meta name="keywords" content="默认关键词" />
    <meta name="description" content="默认描述" />
     <link rel="stylesheet" type="text/css" href="//localhost:9002/styles.css" />
</head>
<body>
    <div id="root">
       
    </div>
    <textarea id="ssrTextInitData" style="display:none;">
    {}
    </textarea>
</body>
</html>
</body>
<script>
//定义当前的渲染模式
window.__IS__SSR__=false;
</script>
 <script type="text/javascript"  src="//localhost:9002/libs.js"></script><script type="text/javascript"  src="//localhost:9002/main.js"></script><script type="text/javascript"  src="//localhost:9002/styles.js"></script>
模式热切换
```

我们现在是将渲染模式放到了配置文件内，手动切换模式后需要重启`node`进程，如果想做到动态切换可以将配置值从接口来获取,这样不需要重启 `node`服务。

ok，到这里双模式支持完成。

## 跨平台设置环境变量

在使用`npm scripts`运行本骨架时会设置环境变量，目前只能在`mac`系统运行正常，`windows`下运行会报错。

所以需要使用`cross-env`来进行环境变量的设置，该库能够以`unix`方式设置环境变量，然后在`windows`上也能兼容运行。

改造后的命令为

```text
"scripts": {
    //...
    "build": "cross-env NODE_ENV=production npm run client:build && npm run server:build",
    "client:build": "cross-env NODE_ENV=production webpack --config  ./webpack/webpack.prod.config.js",
    "server:build": "cross-env NODE_ENV=production webpack --config  ./webpack/webpack.server.config.js",
    //...
    "wds:watch": "cross-env BABEL_ENV=development node ./webpack/scripts/wds-start.js"
  },
```

## 前端模块 hack

`react ssr`开发骨架的核心是`同构`,也就是双端会运行同一套代码，所以一些用于浏览器端的模块就会在服务器端执行，然而此时就会报错。

因为`document window`都是浏览器的对象，`node`里不存在。

那我们应该解决这个问题呢？

### 最直接的方式

直接在`node global`上增加相关缺失的属性

```text
global.document={};
global.window={};
```

这种方式虽然可行，但是比较辛苦。如果是多级访问的对象可就更麻烦了。

```text
document.location.hash
document.location.hash={};
```

所以这个方式并不好，放弃吧。

### 使用babel插件

最彻底的办法是不让服务端加载浏览器模块，所以我们可以写一个插件，在代码打包的时候将导入的模块替换为`{}`。

和我们前面小节中过滤掉组件内的 `css`模块的方式一致。

这个方式在我这个开发骨架`1.0`版本的时候使用过。

所以最终运行在服务端代码会变为

```text
import React from 'react';

- import dom from './dom';

+ const xxMd = {};
```

这个方式可以彻底解决，但是实现有些复杂了。其实还有更简单的方式，往下看。

既然不是最好的，就不做过多介绍了。

### 使用动态加载

使用我们在`webpack`内定义的全局变量`__SERVER__`,结合使用`require`运行时执行来实现。

这样服务端就彻底不会加载这个前端模块了。

```text
//当前环境是服务端 则 dom={} 
const dom = __SERVER__ ? {} : require('./dom').default;
测试模块
// dom.js 

console.log(window.location.href);

export default {
    log(){
        console.log(window.location.href);
    }
}
```

## 无法跨端访问

目前本骨架在本地开发服务为双服务模式，一个是`node server`绑定的是`9001`端口，另一个是静态资源`webpack-dev-server`启动的服务绑定端口为`9002`，而骨架内的静态资源`host`地址为`localhost`，所以只能在本地访问，无法在其他设备或者终端访问。

### 改造思路 1

通过本机`ip`启动`node server`,同时其静态资源地址统一为`ip`地址即可。

```text
获取本机ip
const os = require('os');

function getNetworkAddress() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const interface of interfaces[name]) {
            const { address, family, internal } = interface;
            if (family === 'IPv4' && !internal) {
                return address;
            }
        }
    }
}
```

然后调整`wds`和`webpack.dev.config`的相关配置

```text
// webpack-dev-server.config

  output: {
        filename: '[name].js',
        path: resolvePath('../dist/static'),
        //设置静态资源地址通过 ip 访问
        publicPath: `https://${__LOCAL_IP__}:${proConfig.wdsPort}/`
    },
```

设置`wds`选项的`host`为本机 `ip`

```text
// ./webpack/webpack-dev-server.config
module.exports = function (port, publicPath) {
    return {
        host: global.__LOCAL_IP__//本机 ip，这里我提前把 ip 作为一个全局变量
    //...
    }
```

### 改造方案 2

使用`node server` 进行请求转发。

```text
module.exports = {
  proxy: {
    host: 'https://127.0.0.1:9002', // 本地开发时,代理前端打包出来的静态资源
    match: /(\/static)|(\/sockjs-node)|(\/__webpack_dev_server__)|hot-update/
  }
}
```

## 子进程的平台兼容问题

我们本地开发时执行`npm run dev`命令，内部会创建多个子进程。

```text
const {spawn} = require('child_process');//用于创建子进程

//wds 服务
const feCodeWatchProcess = spawn('npm', ['run', 'wds:watch',localHostIp], { stdio: 'inherit' });

//服务端代码监控和编译进程
const svrCodeWatchProcess = spawn('npm', ['run', 'svr:watch']);

//....
```

但上面`spawn`使用方式在`windows`系统上会报错。

原因：当执行 `npm` 时，实际执行的是 `npm.cmd` 批处理，而在`windows`上，`.cmd`, `.bat` 批处理是无法脱离 `cmd.exe`解释器而单独运行的。

### 解决方法1

调用 `spawn` 函数时，设置 `shell` 选项为 `true` 以隐式地调用 `cmd`。

```text
spawn('npm', {
  stdio: 'inherit',
  shell: true
});
```

优化一下,毕竟在`mac`上不需要此设置

```text
const child = cp.spawn('npm', ['run', 'build'], { shell: process.platform === 'win32' });
```

### 解决方法 2

除了自己编写代码的时候做处理，也有第三方模块`cross-spawn`。

使用该模块，可以在调用 `spawn` 函数时，自动根据当前的运行平台，来决定是否生成一个 `shell` 来执行所给的命令。

```text
npm install cross-spawn

const spawn = require('cross-spawn');
 
spawn('npm', {
  stdio: 'inherit'
});
```

## 数据预取方法参数

在前面小节内，我们的数据预取都是获取的假数据，所以没有提关于一些动态参数的传递问题。但在实际业务中是离不开的。

```text
//还没有传递参数
Index.getInitialProps= async ()=>{
    console.log('fetch data index');
    //模拟数据请求方法
    //...

    return {
        page: {
            tdk: {
                title: '首页 - koa-react-ssr',
                keywords: '关键词 - koa-react-ssr',
                description: '描述'
            }
        }
    };
}
```

所以这里单独说明下需要传递的参数。

最基本的参数有路由`params`和`url query`。

```text
路由params
    {
        path: '/list/:id',//id 的获取
        component:A,
        exact: true
    },
```

`url`透传的参数

```text
//获取 a b 值
https://localhost:9001/list/100?a=1&b=2
```

### 约定参数

我们可以约定函数的参数如下

```text
Index.getInitialProps= async ({match,location})=>{
    //...
}
```

### 客户端处理

上面两个参数可以在组件的`props`属性获取。

```text
var match = this.props.match;
var location = this.props.location;
```

所以只需要在调用的时候带入`props`即可。

```text
 //用于封装处理
 async getInitialProps(){
            //ssr首次进入页面以及csr/ssr切换路由时才调用组件的getInitialProps方法
            const {match,location} = this.props;
            const res =  SourceComponent.getInitialProps ? await SourceComponent.getInitialProps({match,location}) : {};
            //...
        }
```

### 服务端处理

在服务端调用数据预取方法时，路由的匹配结果会返回`match`结果，结果内包含了`params`。

```text
 //查找到的目标路由对象
    let matchResult = await matchRoute(path, staticRoutesList);
    //targetMatch 包含参数信息
    let { targetRoute, targetMatch } = matchResult;
    
//...targetMatch 
{ path: '/list', url: '/list', isExact: true, params: {} }
```

另外`location`就可以通过`ndoe server context`来获取了,具体代码就省略了。

除了这两个基础参数外，可能还需要对服务端做一些单独的处理，所以我们可以带入`req`，`res`对象。

```text
Index.getInitialProps= async ({match,location,req,res})=>{
    if(req){
        //服务端处理
    }
}
```

## 页面级渲染可控

这里只是提一个想法，在我们的项目中存在很多页面，可能有些页面根本不需要考虑`SEO`,所以也就不需要`ssr`。

所以我们需要做到对页面级的渲染模式可控。

可以约定为组件添加一个静态属性，该属性表示当前页面是否开启`ssr`渲染。

```text
class Index{
    
}

Index.__OPEN_SSR__=false;//关闭 ssr
```

然后在服务端匹配路由时，就可以通过对该属性进行逻辑判断当前页面是否需要做`ssr`。

## 配套 cli 工具

一个完整的开发框架一般都会配`cli`脚手架工具，可以在命令行下帮我们快速的创建项目开发模板。

像`react`的`create-react-app`，`vue`的`vue-cli`。

本骨架的`cli`工具目前已经开发完成，具体的实现方式很简单,所以就不做具体介绍了。

`cli`项目源码： [github.com/Bigerfe/zzj…(opens new window)](https://github.com/Bigerfe/zzjs-cli)

另外具体的实现可以参考下面文章，写的很不错

[mp.weixin.qq.com/s/CO6La0NCH…(opens new window)](https://mp.weixin.qq.com/s/CO6La0NCHnsfXN4MHgiBag)

## 小结

本小节主要是总结性的说明下之前我们没有涉及到细节，包括一些问题和扩展方案。

这些应该算是比较基础的，也比较容易发现的，其实还有很多可以扩展的地方。比如路由配置，现在是集中配置，其实这种方式并不利于维护，或许我们可以参考`next.js`的约定式路由来改造一下。

其他更多的扩展，可能需要在后期的使用中逐步的挖掘和完善，好在，这个骨架是白盒的，你可以灵活定制。



# 对比业内已有框架的实现

## 正文

`react ssr` 到现在已经不是新技术，技术原理也不复杂，但是真要自己弄出一个完整的轮子并非易事，有非常多的细节和边边角角需要处理。

所以除了自己来造轮子，我们还可以站在巨人的肩膀上，直接使用业内现成的框架进行开发。

造轮子可以，但是不要闭门造车，所以本节我们来了解下业内框架他们是怎样实现的，也侧面的看下我们已有功能的实现是否合理，是为了验证我们的方案，更是学习。

这里主要来看下`next.js`和`egg-react-ssr`的实现。

当然还有`umi`，不过`umi ssr`代码核心部分也是`egg-react-ssr`团队贡献的代码，所以就不做对比了。

另外在客户端组件渲染时会使用服务端直出的数据问题，也是参考`egg-react-ssr`来实现的,只是细节不同。

## 数据预取

看下这两个框架在服务端如何获取组件数据的。

- `next.js` 数据预取代码

```text
import React from 'react'

export default class extends React.Component {
  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { userAgent }
  }

  render() {
    return (
      <div>
        Hello World {this.props.userAgent}
      </div>
    )
  }
}
```

当页面渲染时加载数据，使用了一个异步方法`getInitialProps`。它能异步获取数据，并绑定在`props`上。当服务渲染时，`getInitialProps`将会把数据序列化，就像`JSON.stringify`。

当第一次进入页面时,`getInitialProps`只会在服务端执行。只有当路由跳转（Link组件跳转或 API 方法跳转）时，客户端才会执行`getInitialProps`。

另外此方法只能用于页面组件内，不能在子组件内使用。

- `egg-react-ssr` 数据预取代码

```text
import React from 'react'
import { Link } from 'react-router-dom'
import './index.less'

function Page (props) {
  return (
    <div className='normal'>
      <div className='welcome' />
      <ul className='list'>
        {
          props.news && props.news.map(item => (
            <li key={item.id}>
              <div>文章标题: {item.title}</div>
              <div className='toDetail'><Link to={`/news/${item.id}`}>点击查看详情</Link></div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

Page.getInitialProps = async (ctx) => {
  // ssr渲染模式只在服务端通过Node获取数据，csr渲染模式只在客户端通过http请求获取数据，getInitialProps方法在整个页面生命周期只会执行一次
  return __isBrowser__ ? (await window.fetch('/api/getIndexData')).json() : ctx.service.api.index()
}

export default Page
```

页面初始化时，服务端根据当前请求的`path`，来确定我们要渲染哪一个组件，`getComponent`可以理解为一个根据`path`从路由表中找到匹配的组件的方法,检测该组件上有没有`getInitialProps`静态方法，这里之所以要用静态方法，是为了不需要实例化就可以拿到方法。

如果有的话，将调用这个方法,将数据作为组件的`props`传入，使得组件可以通过`props.xxx`的方式来读取到服务端获取的数据。

## 本应用的数据预取

```text
import React from 'react';
import {
    Link
} from 'react-router-dom';
import './index.scss';
import img from '../../public/img.jpg';
import PageContainer from '../../common/components/page-container';


function Index(props) {
        return <div className="page-index-box">
            <p>首页</p>
            <img src={img} />
        </div>
}

Index.getInitialProps= async ()=>{
    console.log('fetch data index');
    //模拟数据请求方法
    //...

    return {
        page: {
            tdk: {
                title: '首页 - koa-react-ssr',
                keywords: '关键词 - koa-react-ssr',
                description: '描述'
            }
        }
    };
}

export default PageContainer(Index); 
```

同样为组件添加`getInitialProps`静态方法，服务端根据当前请求的`path`，调用`matchRoute`方法查找到对应的路由，得到具体的组件，判断组件上是否有`getInitialProps`此方法，然后进行数据预取。

最后把数据作为组件的`props`，在组件内可以通过`props.initialData`固定属性来获取。

整体来看，本应用的实现方式和`egg-react-ssr`,`next.js`非常相似，可能这也是业内一种默认的通用做法吧。

## 数据脱水

从运行时的页面看下服务端直出数据的方式。

- next.js

数据直出到页面后，通过`script`标签来进行包裹，且`type="application/json"`，标签内直接是 `json`数据。

![image-20210214221123926](https://img-repo.poetries.top/images/image-20210214221123926.png)

- egg-react-ssr

也是作为脚本加载,然后将数据保存在了`window.__INITIAL_DATA__`全局变量内。

![image-20210214221135415](https://img-repo.poetries.top/images/image-20210214221135415.png)

- 本应用

为了防止`xss`攻击，将数据放在了`textarea`标签内，客户端使用前先进行一次获取

![image-20210214221159958](https://img-repo.poetries.top/images/image-20210214221159958.png)

最后，本应用和他们两个框架的结果相同，只是表现形式不同。

## 热更新

都实现了模块热替换的功能。

- `next.js`采用`hot-middleware` + `webpackHotDevClient.js`实现
- `egg-react-ssr`采用社区成熟库`webpack-dev-server`实现，使用代理抹平了双服务模式，对外看到的是一个服务
- 本应用采用社区成熟库`webpack-dev-server`实现,未做代理转发，目前是使用双服务模式

再次确认了下这两个框架是否支持了模块热更新的同时，是否能保存组件的状态，不过都不支持。

## 路由配置

- next.js

该框架是约定式路由，没有路由配置文件，只要在 `pages` 文件夹下创建的文件，都会默认生成以文件名命名的路由,的确很方便，但是有些过度封装了。

![image-20210214221212572](https://img-repo.poetries.top/images/image-20210214221212572.png)

- 本骨架和`egg-react-ssr` 直接使用`react-router`,依旧使用传统的`spa`应用的使用方式,手动编写路由规则，更加方便你去控制你的项目结构。

`egg-react-ssr` 配置方式

```text
const resolvePath = (path) => require('path').resolve(__dirname, path)

module.exports = {
  type: 'ssr', // 指定运行类型可设置为csr切换为客户端渲染
  routes: [
    {
      path: '/',
      exact: true,
      Component: () => (require('@/page/index').default), // 这里使用一个function包裹为了让它延迟require
      controller: 'page',
      handler: 'index'
    },
    {
      path: '/news/:id',
      exact: true,
      Component: () => (require('@/page/news').default),
      controller: 'page',
      handler: 'index'
    },
    {
      path: '/test',
      exact: true,
      Component: () => (require('@/page/test').default),
      controller: 'page',
      handler: 'index'
    }
  ],
  baseDir: resolvePath('../'),
  injectCss: [
    `/static/css/Page.chunk.css`
  ], // 客户端需要加载的静态样式表
  injectScript: [
    `<script src='/static/js/runtime~Page.js'></script>`,
    `<script src='/static/js/vendor.chunk.js'></script>`,
    `<script src='/static/js/Page.chunk.js'></script>`
  ], // 客户端需要加载的静态资源文件表
  serverJs: resolvePath(`../dist/Page.server.js`)
}
```

`本骨架`的配置方式

```text
//路由配置文件
import React from 'react';

//组件动态加载容器
import AsyncLoader from './async-loader';

function pageNotFound() {
    return <div>404页面</div>
}

export default [
    {
        path: ['/','/index'],
        component: AsyncLoader(() => import('../pages/index')),
        exact:true
    },
    {
        path: '/list',
        component: AsyncLoader(() => import('../pages/list')),
        exact: true
    },
    {
        path: '/about',
        component: AsyncLoader(() => import('../pages/about')),
        exact: true
    },
    {
        path: '*',
        component: pageNotFound,
        exact: true
    }
]
```

这两者都属于集中式路由配置，更加直观和更灵活的进行配置。多人开发的时候可能维护上有点小瑕疵，容易有冲突。

## 路由分割

### `next.js`

自动根据页面进行代码分割,无需配置。

### egg-react-ssr 实现方式

使用`react-loadable`库实现，实现方式和官方的方式不同。

没有将服务端`bundle`打包成多个文件,依然保持一个文件,因为服务端直接处理的是静态路由。

可以参考以下配置

```text
  {
        path: '/news/:id',
        exact: true,
        Component: () => (__isBrowser__ ? require('react-loadable')({
        loader: () => import(/* webpackChunkName: "news" */ '@/page/news'),
        loading: function Loading () {
            return React.createElement('div')
        }
        }) : require('@/page/news').default // 通过这种方式来让服务端bundle不要分块打包
        ),
        controller: 'page',
        handler: 'index'
    }
```

这样配置有个坑，导致`Loadable`没办法预先知道你有哪些组件被包裹了，所以没办法直接调用`Loadable.preloadReady()`来预加载。

只能自己写一个`preloadComponen`方法来手动调用组件的`preload`方法了。

```text
import { pathToRegexp } from 'path-to-regexp'
import cloneDeepWith from 'lodash.clonedeepwith'
import { RouteItem } from './interface/route'

const preloadComponent = async (Routes: RouteItem[]) => {
  const _Routes = cloneDeepWith(Routes)
  for (let i in _Routes) {
    const { Component, path } = _Routes[i]
    let activeComponent = Component()
    if (activeComponent.preload && pathToRegexp(path).test(location.pathname)) {
        // 只有在你访问的path和组件为同一个path才拿到真实的组件，其他情况还是返回Loadable Compoennt来让首屏不要去加载这些组件
      activeComponent = (await activeComponent.preload()).default
    }
    _Routes[i].Component = () => activeComponent
  }
  return _Routes
}

export {
    preloadComponent
}
```

然后在客户端渲染的时候调用一下该方法

```text
const clientRender = async () => {
 //预加载
  const clientRoutes = await preloadComponent(Routes)
  // 客户端渲染||hydrate
  ReactDOM[window.__USE_SSR__ ? 'hydrate' : 'render'](
    <BrowserRouter>
      {
        // 使用高阶组件getWrappedComponent使得csr首次进入页面以及csr/ssr切换路由时调用getInitialProps
        clientRoutes.map(({ path, exact, Component }) => {
          const activeComponent = Component()
          const WrappedComponent = getWrappedComponent(activeComponent)
          const Layout = WrappedComponent.Layout || defaultLayout
          return <Route exact={exact} key={path} path={path} render={() => <Layout><WrappedComponent /></Layout>} />
        })
      }
    </BrowserRouter>
    , document.getElementById('app'))

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept()
  }
}
```

### 本骨架实现方式

没有使用`react-loadable`，而是依据动态导入原理，包装了一个自定义异步组件加载器`AsyncBundle`,基本原理和`react-loadable`都是一样的。

1. 通过高阶函数对返回一个函数组件，同时为函数添加异步属性,后面服务端和客户端预加载直接通过此属性进行判断
2. 服务端代码会被打包成多个文件
3. 服务端在请求前对组件进行预加载，也就是转换为静态组件
4. 客户端代码会打包成多个文件
5. 客户端`bundle`预加载后再渲染页面

```text
容器组件
import React from 'react';
import LoadingCompoent from './loading-compoent';


/**
 * 动态加载组件组的容器组件
 *
 * @class Bundle
 * @extends {Component}
 */
export default class AsyncBundle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mod: null
        };
    }

    componentDidMount() {
        if (!this.state.mod) {
            this.load(this.props);
        }
    }

    load(props) {
        this.setState({
            mod: null
        });
        //注意这里，使用Promise对象; mod.default导出默认
        props.load().then((mod) => {
            this.setState({
                mod: mod.default ? mod.default : mod
            });
        });
    }

    render() {
        return this.state.mod ? this.props.children(this.state.mod) : <LoadingCompoent/>;
    }
}
高阶函数，返回异步加载组件的包装组件
import AsyncBundle from './async-bundle';
import proConfig from '../../share/pro-config';
import React from 'react';
function AsyncLoader (loader) {

    function asyncFn(props) {
       return <AsyncBundle load={loader}>
            {(Comp) => <Comp {...props} />}
        </AsyncBundle>
    }

    //标记为异步组件，双端会根据此属性进行预加载
    asyncFn[proConfig.asyncComponentKey] = true;

    return asyncFn;
}

export default AsyncLoader;
参考一个路由配置
```

`AsyncLoader`函数内会标记此组件为异步组件

```text
    {
        path: '/list',
        component: AsyncLoader(() => import('../pages/list')),
        exact: true
    }
服务端组件预加载
//将路由转换为静态路由，进行组件预加载
async function getStaticRoutes(routes) {

    const key ='__dynamics_route_to_static';
    if (global[key]){
        console.log('cache route');
        return global[key];
    }

    let len = routes.length,
        i = 0;
    const staticRoutes = [];

    for (; i < len; i++) {
        let item = routes[i];
        if (checkIsAsyncRoute(item.component)) {
            staticRoutes.push({
                ...item,
                ...{
                    component: (await item.component().props.load()).default
                }
            });
        } else {
            staticRoutes.push({
                ...item
            });
        }
    }
    global[key]=staticRoutes;
    return staticRoutes; //返回静态路由
}
客户端渲染
function clientRender(routeList) {
      

        let initialData = JSON.parse(document.getElementById('ssrTextInitData').value);
        window.__INITIAL_DATA__ = initialData;

        //查找路由
        let matchResult = matchRoute(document.location.pathname, routeList);
        let { targetRoute } = matchResult;
        if (targetRoute) {
                //预加载完成后进行 render
                if (targetRoute.component[proConfig.asyncComponentKey]) {
                        targetRoute.component().props.load().then(res => {
                                //异步组件加载完成后再渲染页面
                                console.log('异步组件加载完成.....');
                                renderDom(routeList,initialData);
                        });
                }

        } else {
                renderDom(routeList);

        }
}
```

## CSS 资源

主要看下 `css` 资源是如何处理的。

- next.js

该框架采用的是将`css`代码最终打包到一个文件内，作为资源进行加载。

![image-20210214221231029](https://img-repo.poetries.top/images/image-20210214221231029.png)

- egg-react-ssr

也是最终将`css`代码提取到一个文件内。

![image-20210214221242918](https://img-repo.poetries.top/images/image-20210214221242918.png)

- 本骨架实现方式

我们目前有两种方式来处理`css`，一种是将代码进行提取到一个文件内作为资源进行加载。

另外一种是同构处理，页面初始化时服务端会搜集组件所需的 `css`，然后作为内联形式输出。

客户端渲染时会判断当前页面内是否已存在，只有不存在的情况下才会动态的插入样式。

![image-20210214221256113](https://img-repo.poetries.top/images/image-20210214221256113.png)

其实`css`同构处理的配置比较繁琐，直接提取为一个`css`文件也不失为一种便捷的处理方式。

## csr/ssr 双模式

- `next.js`是一个纯粹的`ssr`应用服务框架
- 本应用和`egg-react-ssr`即支持`ssr`也支持`csr`，且支持本地开发与生产环境`ssr/csr`两种渲染模式无缝切换

## 总结

本骨架的方案和`egg-react-ssr`比较相似，不过仍然有很多区别，还有很多地方可以借鉴和学习,但整体方向比较相似。

`next.js`是很成熟的`React SSR`应用开发框架，进行了大量的封装，很多东西都是黑盒的，只能按照他已有的模式进行开发，很难进行改造，且只支持`ssr`一种渲染模式。

比较方便的一个是它的约定式路由，根据你的目录和文件来处理的，不需要对路由进行维护，但是需要按照他的规则来创建文件，让你可以有更多时间来关注业务，而无需关注底层和配置。

我们的骨架是完全透明的，所有的配置和代码都在项目里，可以很方便的进行改造，路由仍然是传统的集中配置的路由，符合我们以往的开发习惯，但是多人开发可能有些问题，会产生冲突。不过也可以进行优化一下，在每个页面内增加一个路由配置，分开维护，最后通过一些手段将各个页面的路由合并为一个再使用。

另外本骨架同时支持`csr`和`ssr`两种渲染模式无缝切换。

生产环境来说，大家都采用的是将所有的`css`打包合并到为一个文件方式，如果项目过大的话 `css`文件可能会过大，导致页面渲染变慢。

所以本骨架使用同构对 `css`进行按需加载，消除了独立`css`文件，`css`代码在服务端渲染时会和`html`内容一起直出，客户端渲染时会动态的创建`style`标签插入到`head`内。

这样的方式可以让客户端加载更少的代码，不好的地方就是`css`代码会打包进`js`，修改`css`代码也会导致相关的`js`模块缓存失效，另外同构配置比较繁琐，坑较多，另外对代码侵入性较大，这也可能是其他框架不具备此能力的原因吧。



# React SSR项目实践

## 正文

前面我们用了大量的时间来讲述原理和以及每一步具体的实现。

到这里我们的应用骨架已经搭建完成，剩下的就是应用和升级。

本节我们就开发一个小项目，来实际的应用下这个骨架，从开发过程中感受下自己的骨架。

## 项目介绍

本项目为仿造掘金小册页面，包括列表页和详情页面。

## 整体页面效果

![image-20210214221416564](https://img-repo.poetries.top/images/image-20210214221416564.png)

![image-20210214221436218](https://img-repo.poetries.top/images/image-20210214221436218.png)

## 相关接口

```text
列表接口
url:https://mockssr.bigerfe.com/list
method:get
result:
{
    "code": 0,
    "data": [
        {
            "des": '',//描述
            "href":'',//详情地址
            "id": '',//小册 id
            "pic": '',//配图
            "title": ''//小册名称
        }
    ]
}
小册详情接口
url:https://mockssr.bigerfe.com/detail/:id
method:get
result:
{
    "code": 0,
    "data": {
        "html":''//小册详情
    }
}
```

## 数据请求模块

使用`axios`来处理数据的请求，简单方便，兼容双端。

- 配置接口地址

```text
fetch-config.js
export default {
    apiHost:'https://mockssr.bigerfe.com'//接口地址
}
```

- 获取列表数据模块

```text
get-list.js
import axios from 'axios';
import fetchConfig from './fetch-config';

export default ()=>{
    return axios.get(`${fetchConfig.apiHost}/list`)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        })
}
```

- 获取详情数据模块

```text
get-detail.js
import axios from 'axios';
import fetchConfig from './fetch-config';


export default (id)=>{
    return axios.get(`${fetchConfig.apiHost}/detail/${id}`)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}
```

## 创建页面和子组件

### 页面

在`/pages/`下创建`index`和`detail`页面。

![img](data:image/svg+xml;utf8,<?xml version="1.0"?>)

### 子组件

这里没有把首页的每一个`item`提取为一个组件，为了方便单独提取了一个`List`组件，用于列表的渲染。

```text
//List 组件
import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {list=[]} = this.props;

        return <div className="book-list">
            {
                 list.map(item=>{
                    return <div key={item.id} className="item">
                        <p className="img"></p>
                    <div className="right">
                            <p className="title"><Link to={"/detail/" + item.id}>{item.title}</Link></p>
                            <p className="des">{item.des}</p>
                    </div>
                    </div>
                })
            }
        </div>
    }
}
```

### index 页面组件(列表页面)

引入子组件`List`,同时设置数据预取逻辑`getInitialProps`,这里使用的是函数组件，也可以使用类组件。

```text
import React from 'react';
import {
    Link
} from 'react-router-dom';
import './index.scss';
import img from '../../public/img.jpg';
import PageContainer from '../../common/components/page-container';

import fetchGetList from '../../common/fetch/get-list';
import List from '../../common/components/list';


function Index(props) {
    const { fetchData } = props.initialData||{};
    return <div className="page-index-box">
        //使用 list 组件 并将数据做为属性传入
        <List list={fetchData}></List>
    </div>
}

Index.getInitialProps = async (ctx) => {

    let res = await fetchGetList();
    let data = res.code === 0 ? res.data : [];

    return {
        fetchData: data,
        page: {
            tdk: {
                title: '首页 - koa-react-ssr',
                keywords: '关键词 - koa-react-ssr',
                description: '描述'
            }
        }
    };
}

export default PageContainer(Index); 
```

### detail 页面组件（详情页面）

设置数据预取和渲染逻辑。

列表页面使用的是类组件。

```text
//src/client/pages/detail/index.js
//小册详情 组件

import React from 'react';
import {Link} from 'react-router-dom';
import fetchDetail from '../../common/fetch/get-detail';

import PageContainer from '../../common/components/page-container';

import './index.scss';

//组件
class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    static async  getInitialProps(ctx) {
        let res = await fetchDetail(ctx.match.params.id);

        return {
            fetchData:res.data ||{},
            page:{
                tdk:{
                    title:'小册详情 - koa-react-ssr',
                    keywords:'koa-react-ssr',
                    description:'koa-react-ssr'
                }
            }
        };
    }

    render() {
        //渲染数据
        const {fetchData={}} = this.props.initialData || {};
        const  {html}  = fetchData || null;
        return html ? <div className="detail-box" dangerouslySetInnerHTML={{ __html: html}}></div>:null
    }
}

export default PageContainer(Index); 
```

## 配置路由

```text
route-config.js
//路由配置文件


import React from 'react';

//组件动态加载容器
import AsyncLoader from './async-loader';

function pageNotFound() {
    return <div>404页面</div>
}

export default [
    {
        path: ['/','/index'],
        component: AsyncLoader(() => import('../pages/index')),
        exact:true
    },
    {
        path: '/detail/:id',
        component: AsyncLoader(() => import('../pages/detail')),
        exact: true
    },
    {
        path: '*',
        component: pageNotFound,
        exact: true
    }
]
```

## 本地开发

```text
npm run dev
```

## 生产环境

```text
npm run build
```

## 生产环境预览

```text
npm run prod:start
```

## 小结

本节主要是通过一个实际的项目来了解下如何基于我们的应用骨架进行开发，整体来看还是比较简单的。

这个项目未使用`redux`做状态管理，不过我们前面已经完成了基于状态管理的骨架，如果进行改造的话也是很容易的。

本节完整代码已上传

[github.com/Bigerfe/koa…(opens new window)](https://github.com/Bigerfe/koa-react-ssr/tree/better/packages/ssr-demo-simple)