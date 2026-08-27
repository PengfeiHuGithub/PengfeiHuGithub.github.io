# 微前端开发实战

# 微前端的诞生

```
微前端` 概念的出现，是在我了解到后端 `server less` 相关概念时候出现的，其实大致的思路是差不多的，每一个功能（服务）`独立部署`、`独立运行`，每一个模块都拆分成`更小`，更`易于管理`的 `微应用
```

## web 时代的发展



在 `web 1.0` 时代，内容基本上是 `静态`、`单向阅读`为主，代表网站比如新浪、搜狐等内容性网站，网站是信息提供者，过程是个单向的过程，从网络到用户，当时网络上所有的内容，都是单一性的，就是网站说这个是什么意思，就是什么意思，这时候的网站是没有什么用户体验之说的，知只是单纯的可以展示内容，保证整体展示是工整的即可；

![img](https://img-repo.poetries.top/images/image-20210210165815221.png)

在 `web 2.0` 时代，内容是`人与人`之间的沟通，网站负责提供平台，大家各自发表自己对于信息的了解和去了解别人提供的信息，这个适合对于用户体验的提升，原因是在于用户对于内容上的体验，用户在访问不同的网站获取到不同的内容，去满足自己在网络上所要得到的所有知识；

![img](https://img-repo.poetries.top/images/image-20210210170004018.png)

在 `web 3.0` 时代，就是`人与网络与人`之间的通信关系，网络成为了用户的需求理解者和信息提供者，由于提供信息的平台越来越多，内容的种类越来越多，用户对于平台的要求也会越来越高

![img](https://img-repo.poetries.top/images/image-20210210170020490.png)

这个时候，用户体验对于我们开发来说，就越发的重要，比如每一个页面的展示、每一个按钮的点击，都可能是影响到用户是否在当前网站留存

好的用户体验，不只是访问速度，还要考虑用户如何提供一个完善的功能链来满足用户的功能所需，基于市场的需求，网站的功能越来越多，我们要做的事情也就越来越多，如果把所有的功能都放在了一起，网站的可维护性就会变的特别差，存在的风险也会越来越多，这个时候，微前端出现了。

## 是什么条件下诞生了微前端



我们的开发模式在不同的 web 时代的实现方式也是在逐渐变化的：

- web1.0：那时候信息比较简单，就是单纯嵌套网页（css + html + js（jquery）+ cms后台），数据简单，展示简单
- web2.0：这时候出现了前后端分离（css + html + js + ajax），前后端做出分离以后，前端对于开发模式上面，就做出了很多的研究和琢磨，这期间最火的，就是`MVC（Module View Controller）`
- web3.0：由于在这个阶段，我们要处理的就不只是上面那些需求了，要考虑用户体验（渲染和响应速度）、开发速度等，技术根据需求而生，这时候，`react`、`vue`、`angular`等框架就应用而生了

技术是一个逐渐调优的过程，在这些框架为我们做了很多事以后，有些事情也是需要我们自己考虑的，项目那么大，我们应该如何维护？

开发每个人之间的水平都是层次不齐的，项目搭建、开发规范、代码提交合并、项目部署等，在项目越来越大的过程当中，每一个环境出现问题，都会影响到一整个项目的运行和用户的使用，在保证前面每一个时代要解决的问题的前提下，我们要想着如何规避现在已存在的这些问题

## 微前端方案一（iframe）



在最早我们用来实现 `微前端` 的方式，是通过`iframe`来做的，页面里面嵌套一个`iframe`，通过设置`url` 来做`微应用`的划分，这样可以保证了每一个`微应用` 都是独立部署，独立运行的，哪一个就算出现了问题，也不会影响到其它的应用，可以保证`在一定范围内用户正常使用`

`iframe` 对于一些简单的静态、纯展示类的页面是很好的方案，但是如果有需要做`交互`、`信息共享`、`数据更新`等行为的时候，`iframe` 就不能完全满足我们的需求了，`iframe`不能满足的需求有以下几点：

- 在`iframe`内的页面做切换的时候，浏览器回退的时候，就会出现页面跳转错误
- 由于它的特性可以完美的隔离上下文之间的所有资源，但是隔离的同时在对于一些需要做共享资源，`iframe` 的特性就没有办法突破了
- 当每一次 `iframe` 的启动，都是需要重新做资源的加载
- 如果在嵌套`iframe`的页面是有那种类似二次确认的弹窗，由于是覆盖整个页面的，`iframe`页面可以 `resize` ，但是 `resize` 也会影响到嵌套页面的展示效果，毕竟从局部变成了整个页面了嘛
- 对于 `iframe` 的状态捕捉，假设`iframe 子应用`加载、预渲染、渲染后、卸载、卸载后、加载报错的情况；整个生命周期处理上面都需要做很多的处理，麻烦而复杂，对`iframe`生命周期的方案做的不好的话，意外的情况就会影响到用户的使用，就得不偿失了

## 微前端方案二（single-spa）



一个在国外流行很久的方案`single-spa`完美的处理了所有上述`iframe`所存在的问题，接下来我们所有的案例也是基于`single-spa` 去做的效果展示，下面是`single-spa`官方对于`single-spa` 诞生所做的阐述：

- single-spa 的诞生，是通过从现在的一些框架：react、angular、vue的生命周期中获得了灵感，将生命周期 运用于整个应用，避免应用程序被束缚。
- 现在 single-spa 几乎支持任何框架。 由于 JavaScript 因其许多框架的寿命短而臭名昭著，我们决定让它在 任何您想要的框架都易于使用。

`single-spa` 很完美的解决了目前市场对`微前端`的需求吗？

不是的。

> 没有任何一个框架可以完美的解决市场的需求，任何方案都是解决目前存在的问题，未来是未知的



# 学习微前端的知识储备

在我们学习微前端前，是要做一定的知识储备的，`概念` 和 `代码` 结合在一起，才能保证我们完全去理解到一种思想或者一种技术的真正意义。

这一章节最主要是要告诉大家在基于`single-spa` 学习`微前端`的时候，需要掌握哪些基础知识，通过了解到这些知识后，我们学起来`single-spa` 也会快一些，`single-spa` 学的快了，我们了解`微前端`的概念也就会要快很多

## js相关



这个就不多说了，前端必备知识基础

## webpack 基础



`webpack` 其实也是必备的知识点了，如果你使用了官方提供的`create-single-spa`的包，则不需要手动配置，如果你是基于现有的项目基础上去做的重构，则还是自己手动配置一下会更加安全一些：

- 将 `single-spa` 输出的目标设置为`system`

```js
// webpack.config.js
{
  output: {
    libraryTarget: 'system'
  }
}
```

设置该属性的目的，是由于`single-spa`的部分功能是基于 [systemjs (opens new window)](https://github.com/systemjs/systemjs)实现的，所以要保证输出的正确使用

- 动态导入模块，不要使用 `Optimization`

```js
{
  entry: {
  	index: './src/index.js'
  }
}
```

设置单一的入口，通过`import()`语法动态导入每一个子应用，`single-spa` 官方的理念就是 **“一个子应用是一个动态导入的模块”**：

```js
// before
import $ from 'jquery'

function myComponent() {
  $('#app').append('<div></div>')
}

// after
function myComponent() {
  import('jquery').then(({default: $}) => {
  	$('#app').append('<div></div>')
  })
}
```

这个就不做太多详解了，webpack官方有详细的解释，就是告诉大家要这么做，理解了即可；

- 针对`webpack`的`systemjs`配置

其中一项配置在上面已经说到了，就是设置`libraryTarget`，另一项就是下方这段代码，目的是如果`System`在`webpack`中是通过 `global`构建的代码，那么就需要通过下面的配置来避免重写

```js
{
  module: {
    rules: [
      { parser: { system: false } }
    ]
  }
}
```

- 使用 [systemjs-webpack-interop (opens new window)](https://github.com/joeldenning/systemjs-webpack-interop)来创建、验证、你的`webpack` 配置；还可以用来设置`public path`，`single-spa`的微应用入口：

```js
import { setPublicPath } from "systemjs-webpack-interop";
/* This dynamically sets the webpack public path so that code splits work properly. See related:
 * https://github.com/joeldenning/systemjs-webpack-interop#what-is-this
 * https://webpack.js.org/guides/public-path/#on-the-fly
 * https://single-spa.js.org/docs/faq/#code-splits
 */

setPublicPath("@spa/react");
```

类似于这样，然后通过在`importmap`中注册，`root config` 中调用`@spa/react`即可，稍后的实例当中会做详解

- 不要设置`output.library`

`systemjs` 不需要一个导出的变量，事实上在没有更多配置的情况下也不支持具名模块

- 设置 `webpack-dev-server` 不检查 `hosts`

```js
{
  devServer: {
  	disableHostCheck: true
  }
}
```

- 允许跨域

```js
{
  devServer: {
  	headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}
```

- 设置 `externals` 是正确并共享的运行时模块

```js
{
  externals: [ 'single-spa', /^@spa\// ]
}
```

大概比较核心的配置项就是这么多，剩下的一些配置项也不是特别重要了，剩下一些不重要的配置大家可以在`single-spa`官网查看

## systemjs



[systemjs (opens new window)](https://github.com/systemjs/systemjs)是一个标准的模块加载器，`single-spa` 项目中可以通过 `systemjs` 在浏览器中下载并执行子应用

## 微前端四大特性



`single-spa`官方把微前端分为三种类型：

- `受路由控制渲染的子应用（applications）`
- `不受路由控制的组件（parcels）`
- `非渲染组件，应用间通信逻辑（utility modules）`

在我看来，其实应该还有一个类型，就是 `root config`

`root config`在我看来，作为子应用通信的路由配置，也是一个非常重要的环节，所有子应用的特殊处理情况都是需要在`root config`做处理的，所以我认为它应该是其中一个比较重要的特性

这一章节大概的内容就是告诉大家需要掌握或者配置哪些信息就可以通过`single-spa`来学习微前端了



# 微前端的优缺点

随着时代的发展，大型应用越来越多，对于维护成本也会逐渐提高，如果一整个项目的代码都在一起的话，维护的局限性会特别强

这些年，我们把大部分的目光都在用户体验上面，如何把代码写的更好，性能更快，用户体验更流畅，在做这些事情的同时，随着日复一日的项目迭代，加上业务的复杂性，我们需要花在除了正常业务开发上的时间会越来越多

然后在这种条件下，渐渐的目光转向了如何面对当前市场越来约复杂的web应用上做整体的结构优化，子应用的切分也是要保证对用户而言，他是一个完整的应用，一个国外对微前端研究较深的web开发人员认为：

> 一种架构风格，其中独立交付的前端应用程序被组合成一个更大的整体

其实针对 `微前端` 每个人都有不同的看法，我没有按照一些特定的**技术方法**和**实现原理**来告诉大家 `微前端就是什么` 、`什么就是微前端`，只是以目前的这种技术方案和市场的需求来描述这么一种应用而生的技术而已

`微前端` 的好处和坏处都是针对目前的一些市场反馈来总结的，不同的产品需求，针对 `微前端` 的反馈也是各自不同的，下面我只是总结了我已知的一些优点和缺点，剩下的还需要在未来使用`微前端` 的路上大家一起探索

## 增量升级（影响范围小）



一个好的产品，会在每个阶段都会进行更新迭代，以满足更多用户的需求，保证吸引更多的用户，产品的完善，版本的迭代，给开发带来的主要工作就是代码量的增加，某一个功能点可能需要对一部分的代码进行不断的更新：

## 版本一



产品初始化，我们有一个选项卡功能，需要通过数据确定有哪些`tab`，对应的`tab`显示对应的内容，这个时期，最火的框架是 `jquery` ，没有`react` 和`vue`，实现的过程如下：

```html
<div id="tab-container">
 <div id="tab-btn"></div>
 <div id="tab-content"></div>
</div>
$ajax({
 url: '***',
 success: function() {
   // 这里就是获取到所有的按钮，绑定事件，点击相应的 tab 再次请求显示相应内容
   // 不写太多逻辑，明白意思即可
 }
})
```

这里实现了一个初始化项目开发，满足了该产品一开始的需求

## 版本二



产品维护了一段时间，用户数也在不断的上涨，发现目前的这个功能不满足用户的需求了，我们原先的头部`tab` 按钮保持不变，但是展示的内容变了，可能是一段文字，可能是一张图片，也有可能是一个媒体资源，而且页面不止有`tab`，还有很多的内容都是基于某一个状态来做动态更新的，为了保证内容的可扩展性，我们做了抽离，这个时候，有了`react` 和`vue` 框架：

```js
// app.js
import React, { Component } from 'react'
impot TabHoc from 'TabHoc.js'
import Content1 from 'Content1.js'
import Content2 from 'Content2.js'

const HocContent1 = TabHoc(Content1, (props, method) => {
  return method(props.status)
})

const HocContent2 = TabHoc(Content2, (props, method) => {
  return method(props.status)
})

export default class App extends Component {
  constructor() {
    this.state = {
    	status: '1'
    }
  }
  componentDidMount() {
  }
  render() {
    <>
      <HocContent1 status={this.state.status}  />
      <HocContent2 status={this.state.status} />
      <... />
    </>
  }
}

// TabHoc.js

import React, { Component } from 'react'
import { Tabs } from 'antd';
const { TabPane } = Tabs;

export default function(Components, callback) {
  return class extends Component {
    constructor() {
      this.updateData = this.updateData.bind(this)
      this.updateState = (props = {
          tabList: []
        }) => callback(
        props,
        this.updateData
      )
      this.state = this.updateState()
    }
    componentDidMount() {
      axios({
        url: '***'
      }).then(({data}) => {
          this.updateState({
            tableList: data
          })
      })
    }
    updateData(obj) {
    	this.setState(prev => Object.assign({}, prev, obj))
    }
    render() {
      <Tabs defaultActiveKey={tabList[0].tab} onChange={callback}>
        {tabList.map((item,index) => {
          return (
            <TabPane tab={item.tab} key={index}>
              <Components {...this.props} data={...this.state} type={item.type} />
            </TabPane>
          )
        })}
      </Tabs>
    }
  }
}
```

`Content1` 和 `Content2` 的代码我没有写，后面的那个`callback`的方法也是大概一个意思，就是告诉大家不同的情况下，可能会有不同的展示形式，利用高阶组件（HOC）的概念对共享型数据和方法做了封装，保证代码的维护性的同时也提升了整体的性能，要比在`jquery`时期的渲染速度快很多，虽然功能变多了，但是由于`dom`的渲染是基于`diff`算法的，没有变化的dom 是不会进行重新渲染的

当然，版本的变化可能不止这么简单，可能更复杂，更需要不断的去重构、重构、在重构以此来优化代码，每一次的优化重构，都是会导致产品用户使用不流畅风险性的提升，没有谁敢保证某一次的更改不会影响到别的业务

这时候如果使用的是微前端方案的话，完全可以把这里独立出来，哪怕是重构，也不会影响到别的业务；如果重构的成本要比重做的成本还高（框架版本升级，性能优化等），那么重做的话基于微前端，也是一个非常安全的方案

基于微前端做增量升级最大的好处就是不论是对当前的产品进行任何 `增、删、改、查` 都是最方便的，风险低、效率高

## 支持多框架（灵活）



市面上的前端框架数不胜数，也各自有各自的优点，方便的框架不代表适用于我们现在的业务，如果单纯的考虑开发速度来说，`vue` 绝对是我认为目前市场上最方便、最快捷的框架了

但是，`vue` 是我们当前项目里面最好的选择吗？并不是。

上面我也说了，如果单纯是为了考虑开发效率，项目体积小，业务逻辑没有特别沉重，我还是建议使用`vue`的；但是如果项目比较复杂，业务逻辑依赖性也比较强的话，这个时候我就建议还是选择`react` 会更好一些；当然，如果你可能只是做一个活动页，宣传页之类的，前两者可能都不需要，毕竟可能只是几个div，几个事件就搞定的东西，没有必要在去搞一套框架，那样还的再去加载框架相关资源，没那个必要

多框架带来的好处很明显，当然凡事都是有两面性，合适的方式去实现合适的功能，但是整体产品来说，加载的资源就会被无限的放大：框架、构建配置、预处理语言编译器等，都是需要考虑的范围

毕竟，用户的体验才是最重要的，其次才是开发效率，但是多框架带来的上述所说的弊端也不是不可以解决，只是需要去衡量一定的方案而已

## 独立部署（安全）



后端有一个叫做`server less` 的概念，是前端可以借鉴的地方，也是微前端里面一个非常重要的概念

假设我们是一整个项目，没有做项目切片，项目做大以后，我们可能很多人要维护着一个项目，按照 `git flow` 的方式，基于 `master` 分支，拉了一个新的分支 `dev1` ，开发过程当中，可能有多个版本，比如开发的一半的时候，我们需要有别人加入来开发新的需求，两者业务逻辑不影响，但是有公共的方法可能需要一起使用，如果我们基于 `dev1` 去拉一个 `dev2` ，这样不合理，毕竟没有相同的需求，而且调试过程当中， `dev1` 的分支可能存在问题，会影响到我们接下来的开发，然而如果从 `master` 分支上拉一个来开发虽然看似没有问题的，但是这两版需求在合并的时候一旦出现冲突，那么这方面要耽误的时间成本就会很长了，一些复杂的逻辑，我们也不可能时时都在合并代码后做逻辑检测，对于前端或者测试来说，都是一项重复性，而又不愿意面对的问题

![image-20210210170547345](https://img-repo.poetries.top/images/image-20210210170547345.png)

按照上图的方法，我们是可以规避掉这种问题的，我们的 `dev1` 和 `dev2` 都是独立的服务，维护各自的代码，可以完全避免掉因为某一个需要出现的问题而导致整个项目无法进行使用，线上项目出现类似的问题，是一件很恐怖的事情

仔细看的同学这个时候可能会问，那么独立的服务代表我们要做独立的代码分布，虽然可以通过 `copy` 实现功能的使用，但是这样打包的时候加载当前资源就会出现多余的内容呀？

当然，这样肯定是会出现的，我们做微前端的目的就是为了能保证用户的体验和稳定性、开发人员的维护成本和开发成本，这样的代码出现是不利于我们维护的，下面，就会讲解怎么解决类似的问题

## 共享组件库（便捷）



上述情况中就存在一个问题，代码重复性，其实平时我们有用到类似的方法，或者说见过类似的一些功能就可以解决这种问题：按需加载。

通过按需加载的方式，把公共的一些功能或者组件通过打包的方式，来实现局部加载，这样就可以解决上面所说的问题，例如 `antd` 中，我们 `import { Button } from 'antd'` , 在通过 `babel-plugin-import` 插件，基于 `AST` 把代码独立打包出来使用

`antd` 为我们提供了 ui组件， `lodash` 为我们提供了数据处理的方法，但是肯定是不难满足我们的业务需求的，但是可以借鉴此类方法

`babel-plugin-import` 的实现原理和 `AST` 相关的我就不在该文当中做详细解释了，百度一下都有

## 团队自治（沟通成本小）



一个完整的产品团队，实现产品需求只是其中的一部分，在需求的的路上，还有很多需要我们解决的问题，团队协作就是一个非常重要的点，而这个点可以直接的影响到我们产品的实用性及发展速度

假设现在我们有 a 和 b 两个功能需要开发，产品和开发都是一个团队，当业务需求特别多的时候，尤其是敏捷开发的阶段，人员的调整、需求的评审，各方各面的原因都可能导致项目有存在不难按时实现需求的情况，而且这种情况不只是靠加班解决的

一个产品不应该是按照技术团队去做划分的，而是应该按照产品的功能去做划分，在微前端的方案中，不论是 a功能 还是 b功能，他们都是一个独立的团队，a团队的产品和开发去做 a功能；b团队也是如此，这样可以把当前的产品线给无限的向上发展，保证了开发的速度，也保证了因为功能沟通而浪费的时间成本

![image-20210210170613390](https://img-repo.poetries.top/images/image-20210210170613390.png)

## 微前端的缺点



凡事都有两面性，没有任何一个技术方案是完美的，在解决某些问题的情况下，总会有不同的弊端出现，我们要做的就是在不同的方案面前，去衡量哪一种方案是解决我们当前产品最好的办法

## 有效的负载变大



`微前端` 的概念，使我们的每一个功能，成为了一个独立的 `应用` ，这样会导致我们的依赖项出现大量的重复，对于用户来说，是需要做多次无意义的资源下载，这样其实是不友好的，但是针对该问题，目前有一种方案就是重复的依赖构建独立的资源包进行下载，这样好像是可以避免掉重复性资源的加载问题，但随之而来的两个不可避免的问题就出现了：

- 在 `a页面` 可能不需要 `b页面` 的相应资源，但是 `c页面` 需要，我们又不能针对这种依赖关系做详细的依赖切分，这样其实对于我们整体的工作而言，是一个很重的任务量，每一个项目都不止一个依赖包，我们不可能花很多的时间去细分每一个依赖包针对当前功能的依赖关系，这是一个非常沉重的工作量
- `a页面` 可能使用的是 `react 16.7` 之前的版本，ui框架 `antd` 使用的也是 `3.x` 的，这里面是没有 `hooks` 的；`b页面` 使用的是 `react 16.7` 之后的版本，这时候支持 `hooks` ，但是 `antd` 还没有做更新，只能只用 `3.x` 版本；`c页面` 使用的也是 `react 16.7` 以后的版本，但是 `antd` 更新 `4.x` ，它支持 `hooks`；这里可能会有人问，为什么不直接使用 `react 16.7`版本， `antd 4.x` 不就行了，何必这么复杂？我们的需求不是一下子完成的，框架也是需要不断的优化实现不管开发效率还是用户体验方面的提升的，版本的控制就是我们需要面对的最大的一个问题，我们不能在同一个公共依赖包里面去做所有版本的兼容问题，这是个不现实的事情

如此来看，好像独立的资源加载好似是最好的办法，可以避免这样的问题，但是有效的负载变大存在的问题还是没有解决，其实独立的资源加载并不是错的，但是它也不是对的，只是我们一直在这个对和错之间，寻找一个边界，其实对和错是不难区分的，难区分的就是它们之间的这个边界问题，如果区分对错的边界，需要耗费我们区分对错更多的成本，那么其实当前的状态，可能就是最好的

当然不是鼓励大家不去更精细化的区分对和错的更深层次的边界，一个中小型企业，时间成本很重要，这种边界的探测对于公司的发展来说起不到什么比较有价值的作用，反而会耽误整体的发展；反之如果是一个专门研究这方面技术的，技术协会或者大型公司的技术团体，我还是很鼓励大家做更深层次的研究的，毕竟物尽其用，人尽其才

## 管理的复杂性



这一块其实内容就很好说明了，管理的复杂性指的很多方面，业务方面、和开发方面等：

- 业务方面的划分，虽然说做到了更多的细节的把控，人员的目光和方向会更精确一点，但是带来的问题就是，业务的广泛性带来的成本也会很高，老人对业务扩展的创新性是否真的能直达用户内心、新人对业务方向的熟悉性是否能符合整个产品的发展方向，这些都是在不断的业务细分的场景下会出现的问题，有的时候细不一定是好，虽然说这样可以考虑到很多的点，但是很容易因为业务的细分导致大家的目光只盯在一个点上，这样其实对于一整个产品的发展并不友好，因为有可能产品和开发讨论了很久的一个对与错的细节问题，在用户看来，并不重要，尤其是对于业务在快速增长阶段的产品来说，这更是一个噩耗
- 开发方面的划分，就是一个很明显的、繁琐的一个过程，微前端带给我们的好处上面已经说的很清楚了，但是根据每一个微应用去做划分的同时，带来的就是一个需要合理规划维护方式的技术难题：
  - 代码库的数量增加，是否有更好的办法去维护每一个版本的更新（CI是一个目前来说可以解决该问题毕竟）
  - 每一个微应用，可能都是一个单独的仓库，那么一整个团队应该如何管理这些微应用，是否需要一定的规范性去约束每一个项目，还是天马行空的发挥各自的想象
  - 假设有相同的功能点，我们有一套独立的微应用组件，那么这个开发工作应该如何划分，对于组件 api 的支持应该如何去制定

## 结束语



其实对于 `微前端` 的优点和缺点还有很多，包括细节的一些点，在我们以后不断工作中去尝试，还会发现很多的问题，对于 `微前端` 的介绍，我也很少用那种很官方，很专业的术语去解释它到底是什么样子的，我更喜欢通过这种大白话、举例的方式去给大家讲解到底 `微前端` 对于我们日常工作来说，到底起到了什么作用、项目当中该不该用、存在的问题我们当前的项目是否真的可以不考虑

前面对于 `微前端` 发展及概念的介绍差不多就到此为止了，有什么疏忽的点还希望大家评论补充

下面的重心就会放在基于 `single-spa` 如何去搭建微应用并部署到容器中的一整套实现方案，并包括其中的 `api` 介绍，`single-spa` 官方的 api 我和一些身边的朋友都感觉可读性还是很差的，所以我准备自己好好梳理一下，方便大家阅读



# 微前端的工具介绍

## 前言



上面几章大概的内容是给大家讲解了 `微前端` 到底是个什么东西，面对日常的业务我们应该如何抉择是否对当前的产品使用 `微前端` 方向的框架

这一章介绍的工具，是基于 `single-spa` 框架做的浏览器插件的介绍，`微前端` 和我们日常的开发框架中使用的一些插件还是有些许的差别的，所以为了帮助大家看完本小册后，可以正常的去使用 `single-spa` 框架搭建的微应用项目，当大家了解了应该做什么样的东西，在什么情况下可能出现什么样的问题，哪怕以后不用 `single-spa` 框架的时候，没有合适的插件，也可以迅速的定位到问题

## 应用运行前的验证环节



在应用运行前，脚手架安装完成之后，`single-spa` 有一套独立的检测方案，保证我们在运行前的环境是没有问题的，对于初学者来说这是很重要的一环：

![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/546b2ed9974d47d2832b0bbbcc76c71c~tplv-k3u1fbpfcp-watermark.image)

在我们通过 `single-spa` 对 `微前端` 项目进行本地化构建后，命令行会显示以上信息：1就是我们的正常启动项目；2就是用来测试我们的微前端项目是否可以正常运行，当我们打开2网址后，会自动重定向到 [single-spa-playground.org/ (opens new window)](https://single-spa-playground.org/)，在该网址下展示脚手架安装好的子应用：

![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4935fd586e54785aac08ff7a8f73830~tplv-k3u1fbpfcp-watermark.image)

在右下角会有一个 `playground` 的 `icon` ，点击弹出下图内容：

![image-20210210170853635](https://img-repo.poetries.top/images/image-20210210170853635.png)

微应用的运行前检测工具一共分 5 个阶段：

- 运行前检测工具的简介
- 如何构建微前端应用
- 验证微前端应用
- root config（根配置）
- QA

### 运行前检测工具的简介

这里简介就没有什么太多要讲的东西，大概的意思就是告诉大家下面的几项做了哪些东西：

`Single-spa playground` 是一个网站，可帮助您使代码与 [single-spa (opens new window)](https://single-spa.js.org/)配合使用。如果您不知道什么是 `single-spa`，请观看[此介绍视频(opens new window)](https://www.youtube.com/watch?v=L4jqow7NTVg&feature=youtu.be)

`single-spa` 还具有一个浏览器扩展程序，可以连接到您浏览器的开发工具中。`Single-spa playground` 和浏览器扩展程序可以协同工作，以帮助您调试 `single-spa` 应用程序。

`Single-spa playground` 将指导您构建成功的 `single-spa` 应用程序，突出显示重要步骤，并为您提供工具以帮助您了解问题所在。

请注意，这不是使用 `single-spa` 的唯一方法，但是通过更好地理解概念，您将能够以自己喜欢的任何方式应用它。这是我们要做的：

- 在单独的git仓库中有微前端。我们将专注于React，但是您可以使用Angular，Vue等
- 测试您的微前端是否正确构建
- 了解并创建一个root config，它将为您的微前端进行路由。
- 独立部署您的微前端（了解更多）。

如果您遇到困难或对改善 `Single-spa playground` 有任何建议，请考虑[加入我们的 slack 工作区 (opens new window)](https://join.slack.com/t/single-spa/shared_invite/enQtODAwNTIyMzc4OTE1LWUxMTUwY2M1MTY0ZGMzOTUzMGNkMzI1NzRiYzYwOWM1MTEzZDM1NDAyNWM3ZmViOTAzZThkMDcwMWZmNTFmMWQ)，[pull request (opens new window)](https://github.com/single-spa/single-spa-playground/pulls)或[提 issue (opens new window)](https://github.com/single-spa/single-spa-playground/issues)。

### 如何构建微前端应用

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/219fe8a3cac54b7e9936257df8d4cfe3~tplv-k3u1fbpfcp-zoom-1.image)

这一步演示了如何去创建一个 `single-spa` 应用程序，由于 `single-spa` 应用程序没有自己的HTML文件，因此它们不能作为独立应用程序运行。相反，它们会生成可动态注入HTML文件的javascript和CSS。`Single-spa playground` 允许您动态地将JavaScript和CSS注入其中，以便您可以测试应用程序

在没有介绍 `root config` 之前，如果您想独立测试当前构建的 `single-spa` 应用程序，可以通过 `npm run start:standalone` 来执行独立运行

```text
这里我是用 react 做的微应用构建，vue相关我会在后面的章节做详解
```

### [#](https://interview.poetries.top/fe-micro-docs/docs/04-微前端的工具介绍.html#验证微前端应用)验证微前端应用

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e419a13213d540bd8126dcf5fdefa674~tplv-k3u1fbpfcp-watermark.image)

在这部分其实就是验证 当前构建的 `single-spa` 应用是否可以正常运行的一个过程，前面的东西可以大概看看是什么意思，在 `root config` 部分的时候，在一起讲了就好，大概的意思就是通过配置 `import map` 然后在 `single-spa` 中注册

校验当微应用是否可以正常运行一共有六步：

- 可以从提供的URL下载应用程序
- 检查应用程序是否具有共享依赖项
- 应用程序代码执行时没有javascript错误
- 正确导出了单spa生命周期方法（引导程序，安装和卸载）
- 应用程序可以挂载到DOM
- 卸载生命周期正常工作
- 重新安装应用程序

![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8715e3525b46484daa7c032b7bc7eb94~tplv-k3u1fbpfcp-watermark.image?imageslim)

检测正常通过应该是上图的展示方式，这样保证我们当前的微应用是可以正常运行的

### root config（根配置）

`root config` 就是运行一个微应用的核心功能，我称之为 `桥接器`，通过 `systemsjs` 设置每一个微应用的导入项

```js
<script type="systemjs-importmap">
  {
  "imports": {
    "@spa/spa": "//localhost:8500/spa-spa.js"
  }
}
</script>
```

在通过 `single-spa` 注册每一个微应用

```text
singleSpa.registerApplication(
  '@spa/spa',
  () => System.import('@spa/spa'),
  location => location.pathname.startsWith('/')
);

singleSpa.start();
```

从而达到通过 `桥接器` 串联每一个微应用，实现一个完整应用的效果，`yarn start` 一下就可以了

### QA

这里就是 `single-spa` 给大家留的搜索问题和解决问题的入口：

如果您想让事情顺利进行，请随时[通过single-spa-playground提出Github问题](https://github.com/single-spa/single-spa-playground/issues/new?body= %23%23 Data dump Applications%3A `json { "name"%3A "%40spa%2Fspa"%2C "pathPrefix"%3A "%2F"%2C "useNativeModules"%3A false }` Import map%3A `json { "imports"%3A { "%40spa%2Freact"%3A "8500"%2C "%40spa-vue%2Fsingle-spa-vue"%3A "https%3A%2F%2Flocalhost%3A8080%2Fjs%2Fapp.js"%2C "%40spa%2Fspa"%3A "%2F%2Flocalhost%3A8500%2Fspa-spa.js" }%2C "scopes"%3A {} }` %23%23 Description )，或[加入我们的 slack 工作区 (opens new window)](https://join.slack.com/t/single-spa/shared_invite/enQtODAwNTIyMzc4OTE1LWUxMTUwY2M1MTY0ZGMzOTUzMGNkMzI1NzRiYzYwOWM1MTEzZDM1NDAyNWM3ZmViOTAzZThkMDcwMWZmNTFmMWQ)。

可能有些人遇到过类似的问题，因此请确保在提交[新问题 (opens new window)](https://github.com/single-spa/single-spa-playground/issues)之前[先搜索现有问题或已解决的问题(opens new window)](https://github.com/single-spa/single-spa-playground/issues)

## 应用运行后的浏览器插件



上面讲到了运行前会出现的一些情况和解决办法，接下来要说的就是运行后通过插件来检测当前微应用的运行状态是否正常

### 安装地址

[Chrome(opens new window)](https://chrome.google.com/webstore/detail/single-spa-inspector/emldbibkihanfiaiaghebffnbahjcgcp)

[Firefox(opens new window)](https://addons.mozilla.org/en-US/firefox/addon/single-spa-inspector/)

### 要求

版本要求： >= [single-spa@4.1](mailto:single-spa@4.1).

### 特征

- 列出所有注册的应用 (按照挂载顺序)
- 展示所有应用的状态
- 强制挂载、卸载某一个应用
- 展示应用覆盖的记录[ (点击这里) (opens new window)](https://zh-hans.single-spa.js.org/docs/devtools/#配置应用覆盖记录)查看如何配置覆盖记录，启用该功能
- 提供了一个添加[重写导入映射 (import-maps) (opens new window)](https://zh-hans.single-spa.js.org/docs/devtools/#重写导入映射-import-maps)的接口

### 配置应用覆盖记录

应用覆盖主要提供如下功能：移入一个已经挂载的App的名字时，会展示这个App在浏览器DOM的什么位置，类似我们平时使用的审查元素，当很多应用同时挂载的时候这个功能很有用（例如某些场合下一个单独的页面中4个不同的应用先后加载时）

为了添加应用覆盖, 找到你导出生命周期函数的那个文件（例如bootstrap、mount、unmount）并以如下格式添加你自己希望的配置:

```js
// 常量的名字必须是devtools
export const devtools = {
  overlays: {
    // selectors是必选项
    selectors: [
      // 该配置时css选择器构成的数组，在每个应用的最外层，以该选择器作为标识
      // 你可以设置多个标识，类似多个parcel或‘不同容器对应不同试图’的用法
      "#my-app",
      ".some-container .app"
    ],
    // options不是必选项
    options: {
      // 这些选项用来配置‘覆盖’的样式和一些操作
      width: "100%",
      height: "100%",
      zIndex: 40,
      position: "absolute",
      top: 0,
      left: 0,
      color: "#000",
      background: "#000",
      textBlocks: [
        // 你可以给‘覆盖’添加额外的文本，例如，你可以添加这个配置的开发人员的名字
        // 这个数组中的每个字符串都会在一个新的div中
        // 例如：'blue squad', 'is awesome'会被解析成
        // <div>blue squad</div><div>is awesome</div>
      ]
    }
  }
};
```

### 重写导入映射 (import-maps)

如果你的环境中使用了[导入映射(import-maps) (opens new window)](https://github.com/WICG/import-maps)，当使用[import-map-overrides库 (opens new window)](https://github.com/joeldenning/import-map-overrides)时，检测工具会提供一个接口用于添加自定义的‘导入映射’来覆盖默认值，在[满足组件安装条件 (opens new window)](https://github.com/joeldenning/import-map-overrides#installation)之后，你就可以创建、移除、刷新页面来查看你覆盖的效果.

### 操作步骤

当我们按照以上的方法下载并安装以后，通过 `localStorage.setItem('devtools', true)` 激活控制台，并刷新页面，这时，屏幕下方应该会有：

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b88330247c44475bd2afe6d536856b0~tplv-k3u1fbpfcp-watermark.image)

一个橘黄色的小图标，然后点击打开

![image-20210210171003670](https://img-repo.poetries.top/images/image-20210210171003670.png)

通过 `Add new module` 按钮添加当前微应用即可：

![image-20210210171011934](https://img-repo.poetries.top/images/image-20210210171011934.png)

一般情况下当通过 `single-spa` 脚手架下载后就会自动存在了，不需要额外手动添加，但是一但出现了什么问题，这里也是一个很好发现问题的地方

当我们微应用配置正确的时候，就可以正常访问我们的微应用了：

![image-20210210171019827](https://img-repo.poetries.top/images/image-20210210171019827.png)

上图红色框内的内容就是当前应用内所有微应用的名称、状态、动作、import 路径等，因为是基础讲解我就创建了一个项目，所以 `App Name` 只有一项

到这里基本上就可以发现在开发微应用项目前所遇到的大部分问题，从而找到相应的解决办法，接下来我们就可以走到开发阶段了

## 结束语



当然，插件存在的好处还是很明显的，可以帮助大家迅速的排除一些问题，可视化的界面也方便大家清晰的看见当前框架内的一些方法和属性的分布，但是我并不建议大家过于依赖插件，插件是可以快速帮助我们解决问题，但是对于个人发展和长期的成长来看，我并不觉得它是一个很好的东西：

如果没有插件的存在，不论是我们状态的管理、页面的渲染等问题，可能会通过打断点、baidu、google、甚至爱学习的同学会去看源码，这是一个良性的过程，只不过比较麻烦，但是学到的东西，都是自己的；

如果用插件的话，你是可以比不用的更快定位到问题，但是习惯性依赖的发生，就会导致不愿意花更多的精力去研究问题的产生原因，这并不是一个好的现象

但是不是让大家完全不去用插件，如果初学的时候还是要通过插件保证整体的运行状态正常，才能让我们更好的学下去

上述的情况也是以一个刚接触某框架初期开发的一个案例，当我们做了很多年的时候，可能很多人就不需要了，反正我目前 `vue` 和 `react` 相关的插件一个都没用过。。。



# Root Config 概念

## Configuring single-spa



`root config` 的配置主要是用于启动微应用

### Index.html文件

内容可参考 [该示例 (opens new window)](https://github.com/polyglot-microfrontends/root-config/blob/master/src/index.ejs)。注意该文件不包含html元素(div, buttons等)，只是为了调用registerApplication()方法。

有关根HTML文件的外观，请参见下面的[根配置示例]。

在使用 `single-spa` 时，不必使用 `SystemJS`，不过为了能够 **独立部署** 各应用，很多示例和教程会推荐使用 `SystemJS`。

### 注册应用

注册应用的办法我们在介绍工具的部分其实已经讲过了，这里直接附上官方代码片段，回忆一下即可：

```js
// single-spa-config.js
import { registerApplication, start } from 'single-spa';
// Simple usage
registerApplication(
  'app2',
  () => import('src/app2/main.js'),
  (location) => location.pathname.startsWith('/app2'),
  { some: 'value' }
);
// Config with more expressive API
registerApplication({
  name: 'app1',
  app: () => import('src/app1/main.js'),
  activeWhen: '/app1',
  customProps: {
    some: 'value',
  }
);
start();
```

## 参数



### name

`registerApplication` 的第一个参数表示应用名称，`name` 必须是 `string` 类型

### 加载函数或应用

`registerApplication` 可以是一个 `Promise` 类型的加载函数，也可以是一个已经被解析的应用（Application）

### 应用作为第二个参数

你可以选择将一个已经被解析过的应用作为 `registerApplication` 的第二个参数，这个应用其实是一个包含各个生命周期函数的对象。我们既可以从另外一个文件中引入该对象，也可以在 `single-spa` 的配置文件中定义这个对象。

```js
const application = {
  bootstrap: () => Promise.resolve(), //bootstrap function
  mount: () => Promise.resolve(), //mount function
  unmount: () => Promise.resolve(), //unmount function
}
registerApplication('applicationName', application, activityFunction)
```

### 加载函数

`registerApplication` 的第二个参数必须是返回 `promise` 的函数(或"`async function`"方法)。这个函数没有入参，会在应用第一次被下载时调用。返回的 `Promise resolve` 之后的结果必须是一个可以被解析的应用。常见的实现方法是使用 `import` 加载：

```js
() => import('/path/to/application.js')
```

### 激活函数

`registerApplication` 的第三个参数需要是一个纯函数，`window.location` 会作为第一个参数被调用，当函数返回的值为 `true` 时，应用会被激活。通常情况下，`Activity function` 会根据 `window.location` 后面的 `path` 来决定该应用是否需要被激活

另外一种场景是 `single-spa` 根据顶级路由查找应用，而每个应用会处理自身的子路由。 在以下场景，`single-spa` 会调用应用的 `activity function`

在以下情况下，single-spa将调用每个应用的活动函数：

- `hashchange` or `popstate` 事件触发时
- `pushState` or `replaceState` 被调用时
- 在 `single-spa` 上手动调用 `triggerAppChange` 方法
- `checkActivityFunctions` 方法被调用时

### 自定义属性

`registerApplication` 的第四个可选参数是自定义属性，这些属性传递给应用程序的 `single-spa` 生命周期函数。 自定义道具可以是对象，也可以是返回对象的函数。 使用应用程序名称和当前 `window.location` 作为参数调用自定义属性函数。

## 使用对象作为参数



```js
singleSpa.registerApplication({
  name: 'myApp',
  app: () => import('src/myApp/main.js'),
  activeWhen: ['/myApp', (location) => location.pathname.startsWith('/some/other/path')],
  customProps: {
    some: 'value',
  },
});
singleSpa.registerApplication({
  name: 'myApp',
  app: () => import('src/myApp/main.js'),
  activeWhen: ['/myApp', (location) => location.pathname.startsWith('/some/other/path')],
  customProps: (name, location) => ({
    some: 'value',
  }),
});
```

### config.name

必须是字符串。

### config.app

应用的定义，它可以是一个单spa生命周期的对象，加载函数或者与第二个参数相同。

### config.activeWhen

可以是激活函数，比如参数API、路径前缀或两者的数组。因为最常见的用例是使用`window.location` 将其URL前缀进行匹配，所以我们帮你实现了这个方法。

### Path prefix

路径前缀会匹配url，允许以下每一种前缀：

'/app1'

- ✅ app.com/app1
- ✅ app.com/app1/anything/everything
- 🚫 app.com/app2

'/users/:userId/profile'

- ✅ app.com/users/123/profile
- ✅ app.com/users/123/profile/sub-profile/
- 🚫 app.com/users//profile/sub-profile/
- 🚫 app.com/users/profile/sub-profile/

'/pathname/#/hash'

- ✅ app.com/pathname/#/hash
- ✅ app.com/pathname/#/hash/route/nested
- 🚫 app.com/pathname#/hash/route/nested
- 🚫 app.com/pathname#/another-hash

['/pathname/#/hash', '/app1']

- ✅ app.com/pathname/#/hash/route/nested
- ✅ app.com/app1/anything/everything
- 🚫 app.com/pathname/app1
- 🚫 app.com/app2

### config.customProps

可选自定义属性提供传递给应用程序的 `single-spa` 生命周期功能的自定义属性。 自定义属性可以是对象，也可以是返回对象的函数。 使用应用程序名称和当前 `window.location` 作为参数调用自定义属性函数

## Calling singleSpa.start()



```text
start()`方法 **必须** 被 `single-spa` 配置文件的js调用，这时应用才会被真正挂载。在 `start` 被调用之前，应用先被下载，但不会初始化/挂载/卸载。`start` 方法可以协助我们更好提升应用的性能。举个例子，我们可能会马上注册一个应用(为了立刻下载代码)，但不能马上就在DOM节点上挂载该应用，而是需要等一个AJAX请求(可能会获取用户的登录信息)完成后，再根据结果进行挂载。这种情况下，最佳实践是先调用 `registerApplication`，等 `AJAX` 请求完成后再调用 `start
//single-spa-config.js
import { start } from 'single-spa';
 /*在注册应用之前调用start意味着single-spa可以立即安装应用，无需等待单页应用的任何初始设置。*/
start();
// 注册应用。。。。
```

## 同时注册两个路由



实现此目的的一种方法是为每个应用程序创建一个`<div>`，这样它们就永远不会尝试同时修改同一DOM。

> 将需要一个以前缀single-spa-application：开头的id，然后是您的应用程序名称。 例如，如果您有一个名为 app-name 的应用程序，则可以使用id single-spa-application：app-name 创建一个。

具有多个应用程序的示例如下所示：

```html
<div id="single-spa-application:app-name"></div>
<div id="single-spa-application:other-app"></div>
```



# Application 概念

## 前言



`single-spa` 应用与普通的单页面是一样的，只不过它没有HTML页面。在一个`single-spa`中，你的SPA包含许多被注册的应用，而各个应用可以使用不同的框架。被注册的这些应用维护自己的客户端路由，使用自己需要的框架或者类库。应用只要通过挂载，便可渲染自己的html页面，并自由实现功能。“挂载”(mounted)的概念指的是被注册的应用内容是否已展示在DOM上。我们可通过应用的`activity function`来判断其是否已被挂载。应用在未挂载之前，会一直保持休眠状态

## 创建并注册一个应用程序



要添加一个应用，首先需要注册该应用。一旦应用被注册后，必须在其入口文件(entry point)实现下面提到的各个生命周期函数

注册的方法已经在前面的章节写过了，这里就不多做说明了

## 注册应用的生命周期



在一个 `single-spa` 页面，注册的应用会经过下载(loaded)、初始化(initialized)、被挂载(mounted)、卸载(unmounted)和unloaded（被移除）等过程。`single-spa` 会通过“生命周期”为这些过程提供钩子函数。

生命周期函数是 `single-spa` 在注册的应用上调用的一系列函数，`single-spa` 会在各应用的主文件中，查找对应的函数名并进行调用。

注:

- `bootstrap`、 `mount`、 `unmount`的是必须的，`unload` 是可选的
- 生命周期函数必须有返回值，可以是 `Promise` 或者 `async` 函数
- 如果导出的是函数数组而不是单个函数，这些函数会被依次调用，对于 `promise` 函数，会等到 `resolve` 之后再调用下一个函数
- 如果 `single-spa` 未启动，各个应用会被下载，但不会被初始化、挂载或卸载。

```text
在single-spa 生态中有各个主流框架对于生命周期函数的实现，这些文档有助于理解这些helper执行的操作，也有助于你自己实现生命周期函数。
```

## 生命周期参数



生命周期函数使用 `props` 传参，这个对象包含 `single-spa` 相关信息和其他的自定义属性

```js
function bootstrap(props) {
  const {
    name,        // 应用名称
    singleSpa,   // singleSpa实例
    mountParcel, // 手动挂载的函数
    customProps  // 自定义属性
  } = props;     // Props 会传给每个生命周期函数
  return Promise.resolve();
}
```

### 内置参数

每个生命周期函数的入参都会保证有如下参数：

- name: 注册到 single-spa 的应用名称
- singleSpa: 对singleSpa 实例的引用, 方便各应用和类库调用singleSpa提供的API时不再导入它。 可以解决有多个webpack配置文件构建时无法保证只引用一个singleSpa实例的问题。
- mountParcel: [mountParcel (opens new window)](https://zh-hans.single-spa.js.org/docs/parcels-api/#mountparcel)函数

### 自定义参数

除 `single-spa` 提供的内置参数外，还可以指定自定义参数，在调用各个生命周期函数时传入。指定方法是在调用 `registerApplication` 时，传入第4个参数

```js
// root.application.js
singleSpa.registerApplication({
  name: 'app1',
  activeWhen,
  app,
  customProps: { authToken: "d83jD63UdZ6RS6f70D0" }
});
singleSpa.registerApplication({
  name: 'app1',
  activeWhen,
  app,
  customProps: (name, location) => {
    return { authToken: "d83jD63UdZ6RS6f70D0" };
  }
});
export function mount(props) {
  console.log(props.authToken); // 可以在 app1 中获取到authToken参数
  return reactLifecycles.mount(props);
}
```

可能使用到的场景：

- 各个应用共享一个公共的 access token
- 下发初始化信息，如渲染目标
- 传递对事件总线（event bus）的引用，方便各应用之间进行通信

注意如果没有提供自定义参数，则 `props.customProps` 默认会返回一个空对象。

### 生命周期帮助类

有一些帮助类库会对针对主流框架的生命周期函数进行实现以方便使用。具体可参见[生态页面(opens new window)](https://zh-hans.single-spa.js.org/docs/ecosystem)

### 下载(load)

注册的应用会被懒加载，这指的是该应用的代码会从服务器端下载并执行。注册的应用在`activity function` 第一次返回 `true` 时，下载动作会发生。在下载过程中，建议尽可能执行少的操作，可以在 `bootstrap` 生命周期之后再执行各项操作。若确实有在下载时需要执行的操作，可将代码放入子应用入口文件中，但要放在各导出函数的外部。例如：

```js
console.log("The registered application has been loaded!");
export async function bootstrap(props) {...}
export async function mount(props) {...}
export async function unmount(props) {...}
```

### 初始化

这个生命周期函数会在应用**第一次**挂载前**执行一次**

```js
export function bootstrap(props) {
  return Promise
    .resolve()
    .then(() => {
      // One-time initialization code goes here
      console.log('bootstrapped!')
    });
}
```

### 挂载

每当应用的`activity function`返回 `true`，但该应用处于未挂载状态时，挂载的生命周期函数就会被调用。调用时，函数会根据URL来确定当前被激活的路由，创建DOM元素、监听DOM事件等以向用户呈现渲染的内容。任何子路由的改变（如`hashchange`或`popstate`等）不会再次触发mount，需要各应用自行处理

```js
export function mount(props) {
  return Promise
    .resolve()
    .then(() => {
      // Do framework UI rendering here
      console.log('mounted!')
    });
}
```

### 卸载

每当应用的activity function返回假值，但该应用已挂载时，卸载的生命周期函数就会被调用。卸载函数被调用时，会清理在挂载应用时被创建的DOM元素、事件监听、内存、全局变量和消息订阅等。

```js
export function unmount(props) {
  return Promise
    .resolve()
    .then(() => {
      // Do framework UI unrendering here
      console.log('unmounted!');
    });
}
```

### 移除

“移除”生命周期函数的实现是可选的，它只有在[unloadApplication (opens new window)](https://zh-hans.single-spa.js.org/docs/api/#unloadapplication)被调用时才会触发。如果一个已注册的应用没有实现这个生命周期函数，则假设这个应用无需被移除。

移除的目的是各应用在移除之前执行部分逻辑，一旦应用被移除，它的状态将会变成NOT_LOADED，下次激活时会被重新初始化。

移除函数的设计动机是对所有注册的应用实现“热下载”，不过在其他场景中也非常有用，比如想要重新初始化一个应用，且在重新初始化之前执行一些逻辑操作时

```js
export function unload(props) {
  return Promise
    .resolve()
    .then(() => {
      // Hot-reloading implementation goes here
      console.log('unloaded!');
    });
}
```

## 超时



默认情况下，所有注册的应用遵循[全局超时配置 (opens new window)](https://zh-hans.single-spa.js.org/docs/api/#setbootstrapmaxtime)，但对于每个应用，也可以通过在主入口文件导出一个timeouts对象来重新定义超时时间。如：

```js
export function bootstrap(props) {...}
export function mount(props) {...}
export function unmount(props) {...}
export const timeouts = {
  bootstrap: {
    millis: 5000,
    dieOnTimeout: true,
    warningMillis: 2500,
  },
  mount: {
    millis: 5000,
    dieOnTimeout: false,
    warningMillis: 2500,
  },
  unmount: {
    millis: 5000,
    dieOnTimeout: true,
    warningMillis: 2500,
  },
  unload: {
    millis: 5000,
    dieOnTimeout: true,
    warningMillis: 2500,
  },
};
```

注意`millis`指的是最终控制台输出警告的毫秒数，`warningMillis`指的是将警告打印到控制台(间隔)的毫秒数

## 切换应用时过渡



如果你想为应用在挂载和卸载时加一些过渡效果(动画效果等)，则需要将其和 `bootstrap`, `mount`, 和 `unmount` 等生命周期函数关联。这个 [single-spa 过渡仓库 (opens new window)](https://github.com/frehner/singlespa-transitions)是个小 `demo`，展示了生命周期之间切换时如何过渡



# Parcel 概念

## 前言



`Parcels` 是 `single-spa` 的一个高级特性。在对 `single-spa` 的注册相关api有更多了解之前，请尽量避免使用该特性。一个 `single-spa` 的 `parcel`，指的是一个与框架无关的组件，由一系列功能构成，可以被应用手动挂载，无需担心由哪种框架实现。`Parcels` 和注册应用的api一致，不同之处在于`parcel`组件需要手动挂载，而不是通过`activity`方法被激活。

一个 `parcel` 可以大到一个应用，也可以小至一个组件，可以用任何语言实现，只要能导出正确的生命周期事件即可。在 `single-spa` 应用中，你的SPA可能会包括很多个注册应用，也可以包含很多 `parcel`。通常情况下我们建议你在挂载 `parcel` 时传入应用的上下文，因为parcel可能会和应用一起卸载。

如果你只使用了一种框架，建议使用框架组件（如`React、Vue、Angular`组件）而不是 `parcel` 共享功能。`Parcel` 多包裹了一层中间层，而框架组件在应用间调用时会更容易，你可以通过 `import` 语法直接在注册应用里导入一个组件。只有在涉及到跨框架的应用之间进行组件调用时，我们才需要考虑 `parcel` 的使用

```js
// 快速示例
// parcel 的实现
const parcelConfig = {
  bootstrap() {
    // 初始化
    return Promise.resolve()
  },
  mount() {
    // 使用某个框架来创建和初始化dom
    return Promise.resolve()
  },
  unmount() {
    // 使用某个框架卸载dom，做其他的清理工作
    return Promise.resolve()
  }
}
// 如何挂载parcel
const domElement = document.getElementById('place-in-dom-to-mount-parcel')
const parcelProps = {domElement, customProp1: 'foo'}
const parcel = singleSpa.mountRootParcel(parcelConfig, parcelProps)
// parcel 被挂载，在mountPromise中结束挂载
parcel.mountPromise.then(() => {
  console.log('finished mounting parcel!')
  // 如果我们想重新渲染parcel，可以调用update生命周期方法，其返回值是一个 promise
  parcelProps.customProp1 = 'bar'
  return parcel.update(parcelProps)
})
.then(() => {
  // 在此处调用unmount生命周期方法来卸载parcel. 返回promise
  return parcel.unmount()
})
```

## Parcel 配置



一个 `parcel` 只是一个由3到4个方法组成的对象。当挂载一个 `parcel` 时，你可以直接提供挂载对象，也可以提供 `loading` 方法来异步下载 `parcel` 对象。 `parcel` 对象上的每个方法都是一个生命周期函数，返回值是 `promise` 。`Parcels` 有3个必填生命周期函数`(bootstrap， mount 和 unmount)`和1个可选生命周期函数`(update)`。 强烈建议通过[官方推荐的生命周期库 (opens new window)](https://zh-hans.single-spa.js.org/docs/ecosystem/#help-for-frameworks)来当实现一个 `parcel`

一个React parcel示例如下：

```js
// myParcel.js
import React from 'react'
import ReactDom from 'react-dom'
import singleSpaReact from 'single-spa-react'
import MyParcelComponent from './my-parcel-component.component.js'
export const MyParcel = singleSpaReact({
  React,
  ReactDom,
  rootComponent: MyParcelComponent
})
// 在这个示例中，singleSpaReact 处理input并生成了一个含有生命周期函数的parcel
```

需要使用上面例子生成的 `parcel`，你只需引用由[single-spa-react (opens new window)](https://zh-hans.single-spa.js.org/docs/ecosystem-react/)提供的 `Parcel` 组件

```js
// mycomponent.js
import Parcel from 'single-spa-react/parcel'
import { MyParcel } from './myparcel.js'
export class myComponent extends React.Component {
  render () {
    return (
      <Parcel
        config={MyParcel}
        { /* optional props */ }
        { /* and any extra props you want here */ }
      />
    )
  }
}
```

## Parcel 生命周期



### 初始化(Bootstrap)

这个生命周期函数只在 `parcel` 第一次挂载前调用一次

```js
function bootstrap(props) {
  return Promise
    .resolve()
    .then(() => {
      // 在这里做初始化相关工作
      console.log('bootstrapped!')
    });
}
```

### 挂载（Mount）

在 `mountParcel` 方法被调用且 `parcel` 未挂载时触发，一般会创建DOM元素、初始化事件监听等，从而为用户提供展示内容

```js
function mount(props) {
  return Promise
    .resolve()
    .then(() => {
      // 在这里通知框架（如React等）渲染DOM
      console.log('mounted!')
    });
}
```

### 卸载(Unmount)

这个生命周期函数被调用的时机是parcel已经被挂载，且满足下列某个条件：

- `unmount()` 被调用
- 父 `parcel` 或者应用被卸载

当被调用时，这个方法会清除DOM元素、DOM事件监听，清理内存泄漏、全局变量、事件订阅等在挂载 `parcel` 时创建的内容。

```js
function unmount(props) {
  return Promise
    .resolve()
    .then(() => {
      // 在这里通过框架语言停止渲染和移除dom
      console.log('unmounted!');
    });
}
```

### 更新(Update)(可选)

```js
function update(props) {
  return Promise
    .resolve()
    .then(() => {
      // 在这里通过框架更新 DOM
      console.log('update!');
    });
}
```

当调用 `parcel.update()` 会触发更新生命周期函数。该生命周期函数是可选的，`parcel` 使用者需要在调用该方法之前确认其已经实现。

## 使用示例



### 模态框

`App1` 处理和联系人相关的所有逻辑(高内聚)，但 `App2` 中需要新建一个联系人。 我们有以下方法在 `应用1` 和 `应用2` 中共享功能：

- 如果两个应用使用同一个框架，可以 export/import组件实现
- 重新实现一份创建联系人的逻辑(逻辑分散，不再内聚)
- 使用single-spa parcels

从 `App1` 导出一个 `parcel`，包括创建联系人的功能。这样就可以在不丢失应用高内聚特性的基础上，在跨框架的应用间共享组件行为。 `App1` 可以将 `modal` 导出作为 `parcel`，`App2` 导入该 `parcel` 并使用。在下面的例子中，一个主要的好处在于从 `App1` 导出的 `parcel/modal` 也将会被卸载，而无需卸载/加载 `App1`

```js
// App1
export const AddContactParcel = {
  bootstrap: bootstrapFn,
  mount: mountFn,
  unmount: unmountFn,
}
// App2
// 获取parcel，该例子使用systemJS和React
componentDidMount() {
  SystemJS.import('App1').then(App1 => {
    const domElement = document.body
    App2MountProps.mountParcel(App1.AddContactParcel, {domElement})
  })
}
```

### mountRootParcel 和 mountParcel

`single-spa` 对外暴露了 `两套parcels` 相关接口。二者的区别主要在于调用者和调用接口的方式

|          | mountRootParcel    | mountParcel             |
| -------- | ------------------ | ----------------------- |
| 上下文   | singleSpa          | application             |
| 卸载条件 | 手动卸载           | 手动卸载 + 应用被卸载时 |
| api 位置 | singleSpa 命名导出 | 生命周期属性中提供      |

### 我应该使用哪个

通常我们建议使用 `mountParcelAPI`。`mountParcel` 允许你将 `parcel` 在应用里当做一个普通组件处理，不需要考虑 `parcel` 由哪个框架实现，也不需要强制调用 `unmount()` 方法卸载 `parcel`

### 如何获取mountParcel API ？

为了能够绑定在应用的上下文中，`mountParcel` 会作为生命周期属性进行传入。你需要在自己的应用中存储和管理其方法。

`mountParcel` API例子：

```js
// App1
let mountParcel
export const bootstrap = [
  (props) => {
    mountParcel = props.mountParcel
    return Promise.resolve()
  },
  // 其他更多boostrap
]
```

> 注意：一些类库(如React)支持在框架里存储和管理parcel。在这些情况下我们不需要写helper方法来存储和管理mountParcel方法。



# 布局引擎 Layout Engine



## 前言



[git仓库(opens new window)](https://github.com/single-spa/single-spa-layout/)

该 `single-spa-layout` NPM包是一个可选的附加单温泉。布局引擎提供了一个路由API，用于控制您的顶级路由，应用程序和dom元素。使用单spa布局可以更轻松地完成以下任务：

- DOM放置和应用程序排序。
- 下载应用程序时加载UI。
- 未找到/ 404页的默认路由。
- 路线之间的转换（执行中）。

布局引擎执行两项主要任务：

- 从HTML元素和/或JSON对象生成单温泉注册配置。
- 侦听路由事件，以确保在安装单spa应用程序之前正确布置所有DOM元素。

`single-spa-layout` 被压缩为3.2kb（未压缩为9kb）。

## 安装



您只需要将布局引擎安装到您的[根配置中即可 (opens new window)](https://zh-hans.single-spa.js.org/docs/configuration/)（无需在任何其他应用程序中安装）。

```js
npm install --save single-spa-layout@beta
# or
yarn add single-spa-layout@beta
```

### 项目状态

`single-spa-layout` 是新的，当前 `beta` 在npm的dist标签下发布。我们正在收集反馈并改进布局引擎，以准备发布稳定版本。尽管我们不希望版图引擎发生巨大变化，但是我们建议您在正式发布之前不要在生产环境中使用它。

### 浏览器支持

`single-spa-layout` 在 `single-spa` 支持的所有浏览器（包括IE11）中均可使用。

### 要求

您必须使用 `single-spa` @> == 5.4.0才能使布局引擎正常工作。此外，您可能不 `domElementGetter` 为任何 `single-spa` 应用程序提供自定义功能，因为这些功能会覆盖 `single-spa` 布局中的配置。

### 基本用法

> 在根html文件中，将 `<template>` 元素添加到头部。它应具有 `<single-spa-router>` 包含 `<route>` 元素，`<application>` 元素和任何其他dom元素的元素：

```html
<html>
  <head>
    <template id="single-spa-layout">
      <single-spa-router>
        <nav class="topnav">
          <application name="@organization/nav"></application>
        </nav>
        <div class="main-content">
          <route path="settings">
            <application name="@organization/settings"></application>
          </route>
          <route path="clients">
            <application name="@organization/clients"></application>
          </route>
        </div>
        <footer>
          <application name="@organization/footer"></application>
        </footer>
      </single-spa-router>
    </template>
  </head>
</html>
```

然后在您的root-config的JavaScript代码中，添加以下内容：

```js
import { registerApplication, start } from 'single-spa';
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from 'single-spa-layout';
const routes = constructRoutes(document.querySelector('#single-spa-layout'));
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });
applications.forEach(registerApplication);
start();
```

## 布局定义



布局是 `HTMLElement` ，路由 和 `single-spa` 应用程序的组合。在根配置中静态定义了布局，以处理顶级路由和dom元素。单个 `single-spa` 布局不应在根配置之外使用；相反，UI框架（React，Angular，Vue）应处理应用程序中的布局。

您可以将布局定义为HTML模板或JSON对象。对于喜欢将布局定义存储在数据库中而不是代码中的组织，支持JSON定义。HTML和JSON布局具有相同的功能集。但是，通常首选在代码中存储布局，并且默认情况下鼓励使用。如果您刚开始使用 `single-spa` 布局，我们建议您使用HTML模板。

一旦你定义布局，你应该 `constructRoutes`，`constructApplications` 和 `constructLayoutEngine`

### HTML布局

您可以在根配置的 `index.html` 文件中或在被解析为HTML的javascript字符串中定义HTML布局。我们通常鼓励在根配置的 `index.html` 文件中定义布局。

要在 `index.html` 文件中定义布局，请创建一个 `<template id="single-spa-layout">` 包含布局的元素。在模板内，添加一个 `<single-spa-router>`元素以及所有路由，应用程序和dom元素。

请注意，在布局中定义的HTMLElement是静态的-无法强制重新呈现或更改它们。

```html
<!-- index.ejs -->
<html>
  <head>
    <template>
      <single-spa-router>
        <div class="main-content">
          <route path="settings">
            <application name="settings"></application>
          </route>
        </div>
      </single-spa-router>
    </template>
  </head>
</html>
// 不推荐使用，但是也可以用HTMLElements进行javascript构造
const doc = new DOMParser().parseFromString(`
<single-spa-router>
  <div class="main-content">
    <route path="settings">
      <application name="settings"></application>
    </route>
  </div>
</single-spa-router>
`, "text/html").documentElement
```

### JSON布局

您可以将布局定义为JSON，包括路由，应用程序和任意dom元素。

```js
const layout = {
  "routes": [
    { "type": "route", "path": "settings", "routes": [
      { "type": "application", "name": "settings" }
    ]}
  ]
};
```

### 布局元素

布局元素是HTMLElement或JSON对象，代表dom节点，路由或应用程序。

#### template

仅当将布局定义为HTML时才使用该 `template` 元素。它的目的是防止其内容被浏览器显示，因为布局定义对用户不可见。

```html
<template>
  <!-- 在这里定义您的布局 -->
  <single-spa-router></single-spa-router>
</template>
```

请注意，`<template>` IE11中不完全支持元素。但是，您无需为了在 `single-spa` 布局中使用模板元素而对其进行填充。相反，只需添加 `style="display: none;"` 到模板即可防止其内容显示在IE11中。

```html
<template style="display: none;">
  <!-- 在这里定义您的布局 -->
  <single-spa-router></single-spa-router>
</template>
```

#### `<single-spa-router>`

该 `single-spa-router` 元素是必需的布局的顶层容器。所有属性都是可选的。

```html
<single-spa-router mode="hash|history" base="/" disableWarnings></single-spa-router>
{
  "mode": "hash|history",
  "base": "/",
  "disableWarnings": false,
  "containerEl": "#container",
  "routes": []
}
```

属性:

- mode（可选）：必须为hash或history默认为的字符串history。这指示路由是否应与Location路径名或hash匹配。
- base （可选）：匹配路由路径时将考虑的字符串URL前缀。
- disableWarnings （可选）：一个布尔值，当提供的元素不正确时，该布尔值将打开单个spa布局的控制台警告。
- containerEl（可选）：字符串CSS选择器或HTMLElement，用作所有单spa dom元素的容器。默认为body。

> 该`route`元素用于控制为顶级URL路由显示哪些应用程序和dom元素。它可能包含 `HTMLElement`，应用程序或其他路由。

```html
<route path="clients">
  <application name="clients"></application>
</route>
<route default>
  <application name="clients"></application>
</route>
{
  "type": "route",
  "path": "clients",
  "routes": [
    { "type": "application", "name": "clients" }
  ],
  "default": false
}
```

属性:

路由必须具有路径或为默认路由。

- routes （必填）：激活路线时将显示的子元素数组
- path（可选）：将与浏览器的URL匹配的字符串路径。路径是相对于其父路径（或基本URL）的。开头和结尾/字符是不必要的，并且会自动应用。通过使用:字符（"`clients/:id/reports`"），路径可能包含“动态段” 。单spa布局使用单spa的pathToActiveWhen功能将路径字符串转换为活动功能。
- default（可选）：一个布尔值，确定此路由是否将与同级路由未定义的所有其余URL匹配。这对于“ 404找不到页面”很有用。同级路由定义为具有相同最近父路由的任何路由。
- props：单spa自定义道具的对象，在安装时将提供给应用程序。请注意，对于不同路径上的同一应用程序，可以对它们进行不同的定义。您可以在下面的文档中阅读有关在HTML中定义道具的更多信息。

#### application

> 该 `application` 元素用于呈现 `single-spa` 应用程序。应用程序可以包含在路线元素中，也可以作为将始终呈现的应用程序存在于顶层。呈现应用程序时，将通过 `single-spa-layout` 创建一个容器 `HTMLElement`。容器 `HTMLElement` 的创建id属性为 `single-spa-application:appName`，以便框架助手在安装应用程序时自动使用它。

同一应用程序可能会在布局中以不同的路线出现多次。但是，每个应用程序只能为每个路由定义一次。

```html
<！-基本用法->
<application name="appName"></application>
<！-使用在javascript中定义的命名加载程序->
<application name="appName" loader="mainContentLoader"></application>
<！-将单spa定制道具添加到应用程序中。prop的值在javascript->中定义
<application name="appName" props="myProp,authToken"></application>
// 基本用法
{
  "type": "application",
  "name": "appName"
}
// 使用单spa包裹作为加载UI，也可以使用Angular，Vue等。
const parcelConfig = singleSpaReact({...})
{
  "type": "application",
  "name": "appName",
  "loader": parcelConfig
}
// 使用HTML字符串作为加载UI
{
  "type": "application",
  "name": "appName",
  "loader": "<img src='loading.gif'>"
}
// 添加 single-spa 自定义属性
{
  "type": "application",
  "name": "appName",
  "props": {
    "myProp": "some-value"
  }
}
```

属性:

- `name`（必需）：字符串应用程序名称。
- `loader`（可选）：HTML字符串或单spa包裹配置对象。在等待应用程序的加载功能解析时，加载程序将安装到DOM 。您可以在下面的文档中阅读有关定义加载程序的更多信息
- `props`：单spa自定义道具的对象，在安装时将提供给应用程序。请注意，对于不同路径上的同一应用程序，可以对它们进行不同的定义。您可以在下面的文档中阅读有关在HTML中定义道具的更多信息。

#### DOM元素

可以将任意HTMLElement放置在布局中的任何位置。要在HTML中执行此操作，只需像通常一样添加HTMLElemet。目前尚不支持在JSON中定义HTMLElements，但很快就会 [跟踪issue (opens new window)](https://github.com/single-spa/single-spa-layout/issues/40)。

```html
<nav class="topnav"></nav>
<div class="main-content">
  <button>A button</button>
</div>
```

`single-spa-layout` 仅在路由转换期间支持更新DOM元素。不支持任意重新渲染和更新。

路由中定义的DOM元素将在路由变为活动/非活动状态时进行安装/卸载。如果在不同的路线下两次定义相同的DOM元素，则在路线之间导航时将销毁并重新创建该DOM元素。

#### 属性

`single-spa 自定义属性` 可以在 `route` 和 `application` 元素上定义。任何路由属性都将与应用程序属性合并在一起，以创建最终的属性，并传递到 `single-spa` 生命周期功能。

#### JSON格式

在JSON布局定义中，您可以使用props应用程序和路由上的属性来定义props ：

```js
import { constructRoutes } from 'single-spa-layout';
constructRoutes({
  routes: [
    { type: "application", name: "nav" props: { title: "Title" } },
    { type: "route", path: "settings" props: { otherProp: "Some value" } },
  ]
})
```

#### HTML

在JSON对象上定义属性很简单，因为它们可以包含字符串，数字，布尔值，对象，数组等。但是，在HTML中定义复杂的数据类型并不是那么简单，因为HTML属性始终是字符串。要解决此问题，单一spa布局允许您在HTML中命名道具，但可以在javascript中定义其值。

```html
<application name="settings" props="authToken,loggedInUser"></application>
import { constructRoutes } from 'single-spa-layout';
const data = {
  props: {
    authToken: "fds789dsfyuiosodusfd",
    loggedInUser: fetch('/api/logged-in-user').then(r => r.json())
  }
}
const routes = constructRoutes(document.querySelector('#single-spa-template'), data)
```

API的完整API文档详细 `constructRoutes` 说明了该data对象。

#### 加载UI

在等待应用程序的代码下载和执行时，通常希望显示一个加载UI。`Single-spa-layout` 允许您定义每个应用程序的加载程序，这些加载程序将在应用程序的[加载函数 (opens new window)](https://zh-hans.single-spa.js.org/docs/configuration/#loading-function-or-application)挂起时安装到DOM 。可以为多个应用程序共享相同的加载UI。

加载的UI定义为HTML字符串或 [parcel 配置对象 (opens new window)](https://zh-hans.single-spa.js.org/docs/parcels-overview/#parcel-configuration)。HTML字符串最适合用于静态，非交互式的加载器，而当您想使用框架（Vue，React，Angular等）动态呈现加载器时， `parcels` 最适合。

通过javascript对象定义加载程序非常简单，因为它们是一个可以包含字符串，数字，布尔值，对象，数组等的对象。但是，在HTML中定义复杂的数据类型并不是那么简单，因为HTML属性始终是字符串。要解决此问题，单spa布局允许您在HTML中命名加载程序，但可以在javascript中定义其值。

```html
<application name="topnav" loader="topNav"></application>
<application name="topnav" loader="settings"></application>
import { constructRoutes } from 'single-spa-layout';
// 你也可以使用 Angular, Vue, etc.
const settingsLoader = singleSpaReact({...})
const data = {
  loaders: {
    topNav: `<nav class="placeholder"></nav>`,
    settings: settingsLoader
  }
}
const routes = constructRoutes(document.querySelector('#single-spa-template'), data)
```

API的完整API文档详细constructRoutes说明了该data对象。

#### 转场

已计划支持路线转换，但尚未实施。如果您对此功能感兴趣，请在此 [issue (opens new window)](https://github.com/single-spa/single-spa-layout/issues/11)中提供用例，支持和反馈。

#### 默认路由（找不到404）

默认路由是当没有其他同级路由与当前URL匹配时激活的路由。它们没有URL路径，并且可以包含DOM元素和单spa应用程序的任意组合。

```html
<single-spa-router>
  <route path="cart"></route>
  <route path="product-detail"></route>
  <route default>
    <h1>404 Not Found</h1>
  </route>
</single-spa-router>
```

默认路由与其同级路由匹配，从而可以嵌套：

```html
<single-spa-router>
  <route path="cart"></route>
  <route path="product-detail/:productId">
    <route path="reviews"></route>
    <route path="images"></route>
    <route default>
      <h1>Unknown product page</h1>
    </route>
  </route>
  <route default>
    <h1>404 Not Found</h1>
  </route>
</single-spa-router>
```

兄弟路由定义为共享“最近的父路由”的路由。这意味着它们不必是您的HTML / JSON中的直接同级，而是可以嵌套在DOM元素中：

```html
<single-spa-router>
  <route path="product-detail/:productId">
    <div class="product-content">
      <route path="reviews"></route>
      <route path="images"></route>
    </div>
    <!-- 评论和图片路线是同级，因为它们共享最近的父路线 -->
    <!-- 当URL与评论或图片不匹配时，默认路由将激活 -->
    <route default>
      <h1>Unknown product page</h1>
    </route>
  </route>
</single-spa-router>
```



# single-spa-react

## 前言



`single-spa-react` 是一个辅助库，它可以帮助React应用程序实现 `single-spa` 需要的命周期函数`（bootstrap、mount 和 unmount）`。请查看 [single-spa-react github(opens new window)](https://github.com/single-spa/single-spa-react)

## 安装



```js
npm install --save single-spa-react
# or
yarn add single-spa-react
```

> 另外，您也可以通过添加 `<script src="https://unpkg.com/single-spa-react">` 并访问全局变量 `singleSpaReact` 来使用 `single-spa-react`

这里我更建议使用 `npm init single-spa --framework react` 脚手架安装，对于初学者来说会省很多事情

![image-20210210171940641](https://img-repo.poetries.top/images/image-20210210171940641.png)

安装完成后的提示在之前的章节有过讲解了，就不多做赘述了

项目的初始化的目录结构基本就是下图：

![image-20210210171949684](https://img-repo.poetries.top/images/image-20210210171949684.png)

## 项目结构



### 入口文件（spa-spa.js）

这里的名字是根据在安装过程中，通过 `Organiztion name` 和 `Project name` 组合而成的，上面安装的时候我就是随便起的名字就是 spa 和 spa，所以成的就是 `spa-spa`，名字是 `O-P` 的结构

```js
import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
```

最主要的是使用了 `singleSpaReact` 这个 react 的微应用库，用于创建一个微应用对象：

参数接收一个对象：

- React (必填)
- React DOM (必填)
- rootComponent (必填) 将被渲染的顶层React组件。只有在提供了 `loadRootComponent` 的情况下才可以省略。
- loadRootComponent：(可选) 一个加载函数。由 parcel 触发用来获取自定义 `single-spa` 属性 `的loading` 方法，返回值为 `Promise`。 如果如提供了此选项，它将取代 `rootComponent` 选项。它的目的是为了帮助那些想要懒加载根组件的源代码的人。源代码将在 `bootstrap` 生命周期中被懒加载。
- suppressComponentDidCatchWarning：(可选) 一个布尔值，表示当 `rootComponent` 没有实现 `componentDidCatch` 时，`single-spa-react` 是否应该发出警告。默认值为 `false`。
- domElementGetter：(可选) 一个不接收任何参数并返回一个DOM元素的函数。这个 dom 元素是 React 应用程序将被初始、挂载和卸载的地方。注意，这个选项可以省略。当省略时， `domElementGetter` 或 `domElement` 的自定义 `single-spa` 属性会被使用。要使用这些，请执行 `singleSpa.registerApplication(name, app, activityFn, {domElementGetter: function() {...}})` 或 `singleSpa.registerApplication(name, app, activityFn, {domElement: document.getElementById(...)})`。如果通过这些方法中的任何一个都找不到dom元素，那么就会创建一个容器div并附加到 `document.body` 中。
- parcelCanUpdate：(可选) 一个布尔值，控制是否为返回的 `parcel` 创建更新生命周期。注意，该选项不影响单个spa应用，只影响 `parcels`。默认情况下，它是 `true`。
- renderType：(可选) 可选值：['render'，'hydrate'，'createRoot'，'createBlockingRoot']。 默认为 'render'。允许你选择你想在你的应用程序中使用哪个 `ReactDOM` 渲染方法。

返回的值也是一个对象，就是当前微应用的所有生命周期方法

```js
export const { bootstrap, mount, unmount } = lifecycles;
```

### 业务代码入口（root.component.js）

该文件就是正常的 `react` 业务开发的代码了，没什么特殊的

### 公共路径（set-public-path.js）

这里其实是 `systemjs` 框架内，用于提供公共目录入口的文件

### 注意

对于`react@>=16`，最好的做法是让每个 `single-spa` 应用程序的根应用程序实现 `componentDidCatch`，以避免整个应用程序在发生错误时意外卸载。更多细节请参见[reactjs.org/blog/2017/0… (opens new window)](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html)。

## Parcels



`single-spa-react` 也可以用来创建一个 `single-spa parcel`（而不是 single-spa 应用程序）。要做到这一点，只需调用 `singleSpaReact()` ，就像调用应用程序一样，除了没有 `domElementGetter` 之外（因为这些都是由挂载 `parcel` 的代码提供的）。

此外，`single-spa-react` 提供了一个 `<Parcel>` 组件，使使用框架的人不需要知道 `single-spa parcels`。 这使得你可以把 `parcel` 放到你的 `render` 方法的jsx中，而不需要实现 `componentDidMount` 和 `componentWillUnmount`。 你可以通过npm安装该库并导入 `single-spa-react/parcel` ，或者通过添加，然后用`window.Parcel.default` 访问 `Parcel` 组件。

### Parcel props

- config (必填)：要么是一个`single-spa parcel`配置对象，要么是一个 "加载函数"，返回一个 `resolve` 包裹配置的 `Promise`。
- wrapWith (可选)：`tagName` 字符串。 将创建一个该类型的 dom 节点，包裹 `Parcel` 生成的节点。 默认：div
- appendTo (可选)：将 `parcel append` 到此 dom 元素下。 默认情况下，这是不需要的，因为包裹将挂载在包裹组件所呈现的 DOM 中。 当想要把 parcel 放到 `document.body` 或 指定dom特定位置时很有用。
- mountParcel (有时需要，有时不需要)：由 `single-spa` 所提供的 `mountParcel` 功能。 我们建议使用应用程序的 `mountParcel` 函数， 而非 `single-spa` 的 `mountParcel` 函数. 这样，`single-spa` 可以跟踪父子关系，并在应用程序卸载时自动卸载应用程序的包。请注意，如果 `<Parcel>` 组件是由使用 `single-spa-react` 的 `single-spa` 应用程序 `render` 而来的，则无需传递prop，因为 `<Parcel>` 可以从 `SingleSpaContext` 中获取 prop。
- handleError (可选)：Function 类型。`parcel` 抛出错误时被调用。 如果没有提供，默认情况下，将在窗口上抛出错误。
- parcelDidMount (可选)：Function 类型。当包 `parcel` 完成装载时，将调用该命令。

例子：

```js
function CustomDomFn() {
  return <div>123</div>
}
const CustomDom = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: CustomDomFn
})
export default function Root(props) {
  console.log(CustomDom)

  return (
    <div>
      {props.name} i1s mounted!
      {/* <CustomDom /> */}
      <Parcel
        config={CustomDom}
      />
    </div>
  )
}
```



# single-spa-vue

## 前言



`single-spa-vue` 是一个针对vue项目的初始化、挂载、卸载的库函数，可以实现 `single-spa` 注册的应用、生命周期函数等功能，详情请查看 [single-spa-vue的github (opens new window)](https://github.com/single-spa/single-spa-vue)。

## 安装



### 使用Vue CLI的项目

[vue-cli-plugin-single-spa (opens new window)](https://github.com/single-spa/vue-cli-plugin-single-spa)将会把所有的事情都做好.

```js
vue add single-spa
```

这个CLI（控制台命令行接口）插件将会做下面的事情:

- 修改 `webpack` 配置，从而使你的项目适用于一个 `single-spa` 项目或是一个子应用。
- 安装 `single-spa-vue`.
- 修改你的 `main.js` 或 `main.ts` 文件，从而使你的项目适用于一个 `single-spa` 项目或是一个子应用。
- 添加 `set-public-path.js` ，从而有序地使用 `systemjs-webpack-interop` 来设置你的应用的 `public path`。

### 没有使用Vue CLI的项目

```js
npm install --save single-spa-vue
```

> 你可以通过选择引入 `<script src="https://unpkg.com/single-spa-vue">` 到你的html文件中，就可以得到 `singleSpaVue` 全局变量

## 用法



如果没有安装过的话，请安装 `systemjs-webpack-interop`。

```js
npm install systemjs-webpack-interop -S
```

在和项目目录同级的位置新建 `set-public-path.js` 文件作为你的 `main.js/ts`

```js
import { setPublicPath } from 'systemjs-webpack-interop';
setPublicPath('appName');
```

将你的应用的入口文件改成如下内容：

> 请注意，如果您使用的是Vue CLI插件 main.ts or main.js 文件将用此代码自动更新并设置为 set-public-path.js 文件将自动创建应用程序名为您的 package.json 的name属性。

如果您想处理您的Vue实例，可以按照下面的步骤修改mount方法。mount方法将在v1.6.0之后使用Vue实例返回Promise。

```js
const vueLifecycles = singleSpaVue({...})
export const mount = props => vueLifecycles.mount(props).then(instance => {
  // 使用 vue 实例做你想做的事情
  ...
})
```

### Vue2

对于Vue 2，将应用程序的条目文件更改为：

```js
import './set-public-path';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import singleSpaVue from 'single-spa-vue';
const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render(h) {
      return h(App);
    },
    router,
  },
});
export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
```

### Vue 3

对于Vue 3，将应用程序的条目文件更改为：

```js
import './set-public-path';
import { h, createApp } from 'vue';
import singleSpaVue from '../lib/single-spa-vue.js';
import App from './App.vue';
const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App, {
        props: {
          // single-spa 属性可以在 this 对象上使用。根据需要将它们转发给您的组件
          // https://single-spa.js.org/docs/building-applications#lifecyle-props
          name: this.name,
          mountParcel: this.mountParcel,
          singleSpa: this.singleSpa,
        },
      });
    },
  },
});
export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
```

> 出于性能上的考虑，Vue、Vue Router以及其他较大的库，最好使用相同的版本

## 自定义属性



`single-spa` 自定义属性可以传递到根组件，如下所示：

```js
// main.js
const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render(h) {
      return h(App, {
        props: {
          mountParcel: this.mountParcel,
          otherProp: this.otherProp,
        },
      });
    },
    router,
  },
});
// App.vue
<template>
  <button>{{ otherProp }}</button>
</template>
<script>
export default {
  props: ['mountParcel', 'otherProp'],
}
</script>
```

## 依赖共享



要实现不同应用间的依赖共享，添加你想要共享的依赖作为 [webpack externals (opens new window)](https://webpack.js.org/configuration/externals/)。然后使用 一个工作在浏览器中的模块加载工具，比如 [systemjs (opens new window)](https://github.com/systemjs/systemjs)，来为 `single-spa` 中的每个项目提供这些共享的依赖，将 `vue` 以及其他库添加到 [import map (opens new window)](https://single-spa-playground.org/playground/import-map)中。

如下案例给出一个 `import map` 的案例，可以作为参考： [coexisting-vue-microfrontends (opens new window)](https://github.com/joeldenning/coexisting-vue-microfrontends/blob/master/root-html-file/index.html)的 index.html 文件。

依赖共享是被强烈建议的。详细的原因可以查看 [recommended setup for single-spa(opens new window)](https://single-spa.js.org/docs/faq.html#is-there-a-recommended-setup)

### 使用Vue CLI的情况下共享的配置

```js
// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.externals(['vue', 'vue-router']);
  },
};
```

### 未使用Vue CLI的情况下共享的配置

```js
// webpack.config.js
module.exports = {
  externals: ['vue', 'vue-router'],
};
```

## 选项



当调用 `singleSpaVue(opts)` 时，所有选项都是通过 `opts` 参数传入 `single-spa-vue` 的

- Vue: (必传项) 主Vue对象, 通常暴露在window对象上，或通过 `require('vue') ``import Vue from 'vue'` 获得
- appOptions: (必传项) 类型为Object对象类型，用来实例化Vue应用。appOptions将直接透传为Vue构造函数实例化时的初始化参数 `new Vue(appOptions)`。需要注意：如果你没有传el选项，插件就会自动创建一个div，并作为一个Vue项目的默认容器附加到DOM中。
- loadRootComponent: (非必传，用于取代 `appOptions.render`) 在懒加载时有用，一个以 `root component` 为成功回调参数的 `Promise` 对象。

可以用 `appOptions.el` 配置 `single-spa` 要挂载到哪个dom元素上:

```js
onst vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render: h => h(App),
    el: '#a-special-container',
  },
});
```

## 作为一个single-spa应用



想要创建一个`single-spa`应用，只需要从`appOptions`中去掉`el`选项，如此一来，dom元素将需要应用的开发者来指定，除此之外的其他选项都应该和上述案例保持一致

## Parcels



### 创建 parcel

`parcel` 是一个对象，它表示在Vue、React、Angular或任何其他框架中实现的组件

要创建 VueJS single spa parcel 配置对象，只需从`appOptions`中省略`el`选项，因为dom元素将由 `Parcel` 的用户指定。所有其他选项都应与上面的示例完全相同。

```js
const parcelConfig = singleSpaVue({...});
```

### 渲染 parcel

要在Vue中呈现 parcel 配置对象，可以使用 single-spa-vue's Parcel 组件：

```js
<template>
  <Parcel
    v-on:parcelMounted="parcelMounted()"
    v-on:parcelUpdated="parcelUpdated()"
    :config="parcelConfig"
    :mountParcel="mountParcel"
    :wrapWith="wrapWith"
    :wrapClass="wrapClass"
    :wrapStyle="wrapStyle"
    :parcelProps="getParcelProps()"
  />
</template>
<script>
// For old versions of webpack
import Parcel from 'single-spa-vue/dist/esm/parcel'
// For new versions of webpack
import Parcel from 'single-spa-vue/parcel'
import { mountRootParcel } from 'single-spa'
const Widget =
export default {
  components: {
    Parcel
  },
  data() {
    return {
      /*
        parcelConfig (object, required)
        parcelConfig是一个对象，或者是一个与parcelConfig对象解析的 promise
        对象可以来自当前项目中，也可以通过跨微前端导入来自不同的微前端。它可以表示Vue组件，也可以表示React/Angular组件。
        https://single-spa.js.org/docs/recommended-setup#cross-microfrontend-imports
        Vanilla js object:
        parcelConfig: {
          async mount(props) {},
          async unmount(props) {}
        }
        // React component
        parcelConfig: singleSpaReact({...})
        // 交叉微前端导入如下所示
      */
      parcelConfig: System.import('@org/other-microfrontend').then(ns => ns.Widget),
      /*
        mountParcel (function, required)
        mountParcel 函数可以是当前Vue应用程序的 mountParcel 属性，也可以是全局可用的mount RootParcel 函数。更多信息请访问
        https://localhost:3000/docs/parcels-api#mountparcel
      */
      mountParcel: mountRootParcel,
      /*
        wrapWith (string, optional)
       	wrapWith字符串确定将为 parcel 提供哪种dom元素。默认为'div'
      */
      wrapWith: 'div'
      /*
        wrapClass (string, optional)
        wrapClass字符串用作提供给 parcel 的dom元素的CSS类。
      */
      wrapClass: "bg-red"
      /*
        wrapStyle (object, optional)
        wrapStyle对象作为CSS样式应用于 parcel 的dom元素容器
      */
      wrapStyle: {
        outline: '1px solid red'
      },
    }
  },
  methods: {
    // These are the props passed into the parcel
    getParcelProps() {
      return {
        text: `Hello world`
      }
    },
    // Parcels mount 安装，因此 parcel 完成安装后将调用此方法
    parcelMounted() {
      console.log("parcel mounted");
    },
    parcelUpdated() {
      console.log("parcel updated");
    }
  }
}
</script>
```



# 应用内通信

## 前言



前面的章节针对微前端的框架做了简单的介绍，已经可以满足我们初学者的开发了，但是应用之间的通信还是存在问题的，假设我是一个 a 应用，基于 a 应用的某种动作或者某种状态，需要对象 b 应用进行更新，这个时候就需要我们想一个比较合理的方案来解决该问题来

一个好的体系结构是将微前端解耦，并且不需要频繁通信。基于路由的single-spa应用程序本质上需要较少的应用程序间通信。

微前端直接通信的可能有三样东西：

- 方法，组件，逻辑，全局状态
- API数据
- UI状态

## 通信状态



### 方法，组件，逻辑，全局状态

这里，`single-spa` 官方有提供一个案例，大家可以参考一下：

- 导入[组件(opens new window)](https://github.com/vue-microfrontends/rate-dogs/blob/fe3196234b9cbd6d627199b03a96e7b5f0285c4b/src/components/rate-dogs.vue#L25)
- 导出[组件(opens new window)](https://github.com/vue-microfrontends/styleguide/blob/af3eaa70bec7daa74635eb3ec76140fb647b0b14/src/vue-mf-styleguide.js#L5)

你可以在不同git仓库或JS包的微前端之间导入或导出方法，组件，逻辑，全局状态：

```js
// @org-name/auth
export function userHasAccess(permission) {
  return loggedInUser.permissions.some(p => p === permission);
}
import { userHasAccess } from '@org-name/auth'
// 在 single-spa应用程序中，从不同的微前端导入并使用util函数
const showLinkToInvoiceFeature = userHasAccess('invoicing');
```

### API数据

这里，`single-spa` 官方有提供一个案例，大家可以参考一下：

- 导入[请求(opens new window)](https://github.com/react-microfrontends/api/blob/c3c336129e920bbc6137f04cce24b718105efed1/src/react-mf-api.js#L3)
- 导出[请求(opens new window)](https://github.com/react-microfrontends/people/blob/ad18de9b96b52e6975244e6662becfe13e41a2db/src/utils/api.js#L1)

API数据通常不需要在 `microfrontend` 之间共享，因为每个 single-spa 应用程序控制不同的路由，而不同的路由通常有不同的数据。然而，有时您确实需要在 `microfrontend` 之间共享API数据。API对象的内存中的JavaScript缓存是一些公司用来解决这个问题的解决方案。对于React用户，这类似于带 `Suspense` 的数据获取，其中路由的获取逻辑是从使用数据的组件代码中分离出来的。

```js
// 在api实用程序模块内部，您可以在另一个微前端调用导出的函数时延迟获取数据，或者在路由更改时急于获取数据。
let loggedInUserPromise = fetch('...').then(r => {
  if (r.ok) {
    return r.json()
  } else {
    throw Error(`Error getting user, server responded with HTTP ${r.status}`)
  }
})
export function getLoggedInUser() {
  return loggedInUserPromise;
}
import { getLoggedInUser } from '@org-name/api';
// 在app1内部，您可以从“ api”实用程序模块中导入某些内容
getLoggedInUser().then(user => {
  console.log('user', user);
});
```

### UI状态

如果两个微前端经常在彼此之间传递状态，可以考虑合并它们。当你的microfrontend不是孤立的模块时，它的缺点就会被放大

比如“是模态打开的”、“输入的当前值是多少”等等的UI状态，基本上不需要在微前端之间共享。如果您发现自己需要不断共享UI状态，那么您的微前端可能拆分的太多了。考虑将它们合并。

在极少的情况下在需要在 single-spa 应用程序之间共享UI状态，可以使用`event emitter`来实现。下面是一些`event emitter`的例子，可能会对你有所帮助。

- Observables / Subjects (rxjs) - 一个微前端发布一个新值到一个可以被其他微前端消费的流对象，它可以向所有的微前端应用暴露出来以便其他应用可以订阅。
- CustomEvents - 浏览器有一个内置的事件发射器系统，允许你触发自定义事件。查看[此文档 (opens new window)](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events)以获得更多信息。`window.dispatchEvent` 事件允许任何其他的微前端通过 `window.addEventListener` 订阅。
- 其他订阅发布系统。

### 结束语

我目前用的最多的就是 `systemjs-webpack-interop` ，通过 `setPublicPath` 一个公共的组件或者状态，然后 `import` 过去，微前端最主要的概念就是解耦，所以如果出现耦合性太高的业务时，是不建议做应用拆分的

这一章东西其实不多，但是我还是单独拿出来一章来写来，目的是希望大家对于通信的处理写的更简单，更干净一些，不要把太多的工作量放在通信方面，要记住微前端的目的是为了合理的 **解偶



# 服务端渲染

## 简介



在单页面应用程序（SPA）的上下文中，服务器端呈现（SSR）是指从Web服务器发送到浏览器的HTML页面的动态生成。在单页面应用程序中，服务器仅生成用户请求的第一页，而所有后续页面都将由浏览器呈现。

为了完成SPA的服务器端渲染，在NodeJS中执行javascript代码以生成初始HTML。在浏览器中，在“添加（注水）”过程中执行相同的javascript代码，该过程将事件侦听器附加到HTML。大多数流行的UI框架（Vue，React，Angular等）都可以在NodeJS和浏览器中执行，并提供API来生成服务器HTML并在浏览器中进行混合。此外，还有一些流行的框架（如NextJS和Nuxt）可简化开发人员对服务器端呈现的体验。

在微前端的上下文中，服务器端渲染是指从多个单独的微前端组装HTML。每个微前端控制从Web服务器发送到浏览器的HTML片段，并在浏览器中初始化它们后将其片段合并。

## 目的



服务器端渲染的主要目的是提高性能。服务器渲染的页面通常比静态页面更快地向用户显示其内容，因为在初始化javascript资源之前向用户显示了内容。SSR的其他原因包括改进的搜索引擎优化（SEO）。

服务器渲染的应用程序通常更难构建和维护，因为代码必须同时在客户端和服务器上运行。此外，SSR通常会使运行您的应用程序所需的基础架构复杂化，因为许多SPA + SSR解决方案都需要NodeJS，而纯客户端SPA的生产中并不需要NodeJS。

## 示例



在 [isomorphic-microfrontends (opens new window)](https://github.com/isomorphic-microfrontends)例子显示React服务器呈现的微前端。您可以在[isomorphic.microfrontends.app (opens new window)](https://isomorphic.microfrontends.app/)上查看代码的实时演示。

## 实施概述



服务器端呈现的最终目标是生成HTTP响应，当javascript运行时，浏览器将向用户显示该响应。大多数微前端服务器端渲染实现（包括single-spa推荐的方法）都是通过以下步骤实现的：

- 布局-标识要为传入的HTTP请求呈现的微前端，以及将它们放置在HTML中的位置。这通常是基于路由的。
- fetch-开始将每个微前端的HTML呈现到流中。
- headers -从每个微前端检索HTTP响应标头。将它们合并在一起，然后将结果作为HTTP响应标头发送到浏览器。
- body-将HTTP响应正文发送到浏览器，该浏览器是由静态和动态部分组成的HTML文档。这涉及等待每个微前端的流结束，然后再继续进行HTML的下一部分。
- 添加（注水）-在浏览器中，下载所有需要的JavaScript，然后添加（注水）HTML。

### 1.布局

要定义用于布局页面的HTML模板，请首先选择“微前端布局中间件”：

- single-spa-layout：单spa的官方布局引擎。
- [Tailor (opens new window)](https://github.com/zalando/tailor)：一种流行的，经过测试的布局引擎，早于 single-spa-layout ，并且未正式与 single-spa 关联。
- TailorX：一个主动维护的Tailor分支，Namecheap在其 single-spa 网站中使用它。在编写 single-spa-layout 时，single-spa 核心团队与TailorX的创建者合作，从中汲取了一些灵感。

我们通常建议使用 single-spa-layout，尽管选择其他选项之一可能会适合您的情况，因为单spa布局较新且使用量少于Tailor / TailorX。

使用 single-spa-layout，您可以定义一个处理所有路由的模板。完整的文档。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Isomorphic Microfrontends</title>
    <meta
      name="importmap-type"
      content="systemjs-importmap"
      server-cookie
      server-only
    />
    <script src="https://cdn.jsdelivr.net/npm/import-map-overrides@2.0.0/dist/import-map-overrides.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/systemjs@6.6.1/dist/system.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/systemjs@6.6.1/dist/extras/amd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/systemjs@6.6.1/dist/extras/named-exports.min.js"></script>
  </head>
  <body>
    <template id="single-spa-layout">
      <single-spa-router>
        <nav>
          <application name="@org-name/navbar"></application>
        </nav>
        <main>
          <route path="settings">
            <application name="@org-name/settings"></application>
          </route>
          <route path="home">
            <application name="@org-name/home"></application>
          </route>
        </main>
      </single-spa-router>
    </template>
    <fragment name="importmap"></fragment>
    <script>
      System.import("@org-name/root-config");
    </script>
    <import-map-overrides-full
      show-when-local-storage="devtools"
      dev-libs
    ></import-map-overrides-full>
  </body>
</html>
```

### 2.fetch

您的微前端布局中间件（请参阅“[布局 (opens new window)](https://single-spa.js.org/docs/ssr-overview/#1-layout)”部分）确定哪些微前端与HTTP请求的路由匹配。然后，中间件为每个微前端获取HTTP响应标头和HTML内容。

使用 single-spa-layout 时，通过`renderApplication`提供给的功能来处理每个微前端`renderServerResponseBody`。

提取标题和HTML内容的方法可能会有所不同，因为 single-spa-layout 允许任何任意的自定义提取方法。但是，实际上，有两种流行的方法，如下所述。通常，我们建议将动态模块加载作为主要方法，因为动态加载模块所需的基础设施较少，并且可以（稍微）有更好的性能。但是，HTTP请求也具有一些优点，并且还可以使用不同的提取方法来实现不同的微前端。

#### A.模块加载

模块加载是指使用import和加载javascript代码import()。使用模块加载，获取每个微前端的标头和内容的实现完全在单个Web服务器和操作系统过程中完成：

```js
import('@org-name/navbar/server.js').then(navbar => {
  const headers = navbar.getResponseHeaders(props);
  const htmlStream = navbar.serverRender(props);
})
```

在 single-spa-layout 的情况下，这是在renderApplication函数内部完成的：

```js
import {
  constructServerLayout,
  sendLayoutHTTPResponse
} from "single-spa-layout/server";
import http from 'http';
const serverLayout = constructServerLayout({
  filePath: "server/views/index.html",
});
http.createServer((req, res) => {
  const { bodyStream } = sendLayoutHTTPResponse({
    res,
    serverLayout,
    urlPath: req.path,
    async renderApplication({ appName, propsPromise }) {
      const [app, props] = await Promise.all([
        import(`${props.name}/server.mjs`,
        propsPromise
      )])
      return app.serverRender(props);
    },
    async retrieveApplicationHeaders({ appName, propsPromise }) {
      const [app, props] = await Promise.all([
        import(`${props.name}/server.mjs`,
        propsPromise
      )])
      return app.getResponseHeaders(props);
    },
    async retrieveProp(propName) {
      return "prop value"
    },
    assembleFinalHeaders(appHeaders) {
      return Object.assign({}, ...Object.values(allHeaders).map(a => a.appHeaders));
    },
    renderFragment(name) {
      // not relevant to the docs here
    }
  });
  bodyStream.pipe(res);
}).listen(9000)
```

为了促进我们的微前端的独立部署，以使Web服务器不必在每次更新每个微前端时都重新启动/重新部署，我们可以使用动态模块加载。动态模块加载是指从动态位置加载模块-通常是从磁盘上的某个位置或通过网络加载。默认情况下，NodeJS仅从相对URL或node_modules目录中加载模块，但是动态模块加载允许您从任意文件路径或URL加载模块。

通过动态模块加载来促进独立部署的一种模式是，每个微前端的部署都将一个或多个javascript文件上传到受信任的CDN，然后使用动态模块加载在CDN上加载特定版本的代码。Web服务器将轮询每个微前端的新版本，并在部署时下载新版本。

为了完成动态模块加载，我们可以使用NodeJS模块加载器。具体来说，`@node-loader/ import-maps` 和 `@node-loader/http` 允许我们控制模块的位置以及如何通过网络下载它。下面的代码说明了服务器端导入映射如何促进动态模块加载

在部署navbar之前：

```js
{
  "imports": {
    "@org-name/navbar/": "https://cdn.example.com/navbar/v1/"
  }
}
```

部署navbar之后：

```js
{
  "imports": {
    "@org-name/navbar/": "https://cdn.example.com/navbar/v2/"
  }
}
```

导入映射本身托管在CDN上，因此可以在不重新启动Web服务器的情况下进行部署。这里显示了此设置的示例。

#### B. HTTP请求

还可以使用HTTP请求来实现从微前端获取HTML内容和HTTP标头。在此设置中，每个微前端必须作为已部署的Web服务器运行。根部Web服务器（负责响应浏览器）对每个微前端的Web服务器进行HTTP调用。每个微前端Web服务器都会以HTML页面作为响应正文以及其HTTP响应标头进行响应。响应主体将流式传输到根Web服务器，以便它可以将字节尽快发送到浏览器。

在 single-spa-layout 的情况下，这可以通过以下renderApplication功能完成：

```js
import {
  constructServerLayout,
  sendLayoutHTTPResponse,
} from "single-spa-layout/server";
import http from 'http';
import fetch from 'node-fetch';
const serverLayout = constructServerLayout({
  filePath: "server/views/index.html",
});
http.createServer((req, res) => {
  const fetchPromises = {}
  sendLayoutHTTPResponse(serverLayout, {
    res,
    serverLayout,
    urlPath: req.path,
    async renderApplication({ appName, propsPromise }) {
      const props = await propsPromise
      const fetchPromise = fetchPromises[appName] || (fetchPromises[appName] = fetchMicrofrontend(props))
      const response = await fetchPromise;
      // r.body is a Readable stream when you use node-fetch,
      // which is best for performance when using single-spa-layout
      return response.body;
    },
    async retrieveApplicationHeaders({ appName, propsPromise }) {
      const props = await propsPromise
      const fetchPromise = fetchPromises[appName] || (fetchPromises[appName] = fetchMicrofrontend(props))
      const response = await fetchPromise;
      return response.headers;
    },
    async retrieveProp(propName) {
      return "prop value"
    },
    assembleFinalHeaders(allHeaders) {
      return Object.assign({}, ...Object.values(allHeaders))
    },
    renderFragment(name) {
      // not relevant to the docs here
    }
  });
  bodyStream.pipe(res);
}).listen(9000)
async function fetchMicrofrontend(props) {
  fetch(`https://${props.name}`, {
    headers: props
  }).then(r => {
    if (r.ok) {
      return r;
    } else {
      throw Error(`Received http response ${r.status} from microfrontend ${appName}`);
    }
  })
}
```

### 3. HTTP响应头

发送到浏览器的HTTP响应标头是默认标头和从每个微前端检索的 headers 的组合。您获取微前端的方法不会更改浏览器最终 headers 的合并和组装方式。

Tailor 和 TailorX 具有合并 headers 的内置方法。Single-spa-layout 允许通过以下assembleFinalHeaders 选项进行自定义合并：

```js
import {
  constructServerLayout,
  sendLayoutHTTPResponse
} from "single-spa-layout/server";
import http from 'http';
const serverLayout = constructServerLayout({
  filePath: "server/views/index.html",
});
http.createServer((req, res) => {
  const { bodyStream } = sendLayoutHTTPResponse({
    res,
    serverLayout,
    urlPath: req.path,
    async renderApplication({ appName, propsPromise }) {
      const [app, props] = await Promise.all([
        import(`${props.name}/server.mjs`,
        propsPromise
      )])
      return app.serverRender(props);
    },
    async retrieveApplicationHeaders({ appName, propsPromise }) {
      const [app, props] = await Promise.all([
        import(`${props.name}/server.mjs`,
        propsPromise
      )])
      return app.getResponseHeaders(props);
    },
    async retrieveProp(propName) {
      return "prop value"
    },
    assembleFinalHeaders(allHeaders) {
      // appHeaders contains all the application names, props, and headers for 
      return Object.assign({}, ...Object.values(allHeaders).map(a => a.appHeaders));
    },
    renderFragment(name) {
      // not relevant to the docs here
    }
  });
  bodyStream.pipe(res);
}).listen(9000)
```

### 4. HTTP响应主体

从Web服务器发送到浏览器的HTTP响应正文必须逐字节进行流处理，以使性能最大化。NodeJS可读流通过充当缓冲区来实现这一目的，该缓冲区发送接收到的每个字节，而不是一次发送所有字节。

本文档中提到的所有微前端布局中间件都将HTML响应主体流式传输到浏览器。在 single-spa-layout 的情况下，这可以通过调用 sendLayoutHTTPResponse

```js
import {
  sendLayoutHTTPResponse,
} from "single-spa-layout/server";
import http from 'http';
const serverLayout = constructServerLayout({
  filePath: "server/views/index.html",
});
http.createServer((req, res) => {
  sendLayoutHTTPResponse({
    res,
    // Add all other needed options here, too
  })
}).listen(9000)
```

### 5.hydrate

hydrate（或rehydration）是指浏览器Javascript初始化事件侦听器并将其附加到服务器发送的HTML。有几种变体，包括进行性rehydration和部分rehydration。

另请参阅Google的“[网络渲染 (opens new window)](https://developers.google.com/web/updates/2019/02/rendering-on-the-web)”。

在微前端的情况下，rehydration 是通过微前端的底层UI框架（React，Vue，Angular等）完成的。例如，在React中，这是通过调用[ReactDOM.hydrate (opens new window)](https://zh-hans.reactjs.org/docs/react-dom.html#hydrate)完成的。通过单spa适配器库，您可以指定是初次 hydrating 还是安装（请参见single-spa-react的renderType[选项 (opens new window)](https://zh-hans.single-spa.js.org/docs/ecosystem-react/#选项)）。

单spa布局的作用是确定哪些微前端应 hydrating DOM的哪些部分。当您调用[constructLayoutEngine (opens new window)](https://single-spa.js.org/docs/layout-api/#constructlayoutengine)和singleSpa.start（）时，将自动完成此操作。如果使用TailorX而不是 single-spa-layout ，则[同构布局编辑器项目 (opens new window)](https://github.com/namecheap/ilc)的作用与相似constructLayoutEngine。



# 微应用本地构建服务

## 前言

前面我们已经针对微前端的概念及 `single-spa` 内的主要功能做了介绍，下面我们要针对开发好的项目进行部署，网上针对开发的过程讲解的文档还是很多的，但是没有一整套完整的达到线上运行效果的文档，对于微应用基础镜像的构建，这里不是讲解的重点，之前针对镜像构建我写过一篇文章，可以满足不同的微应用的镜像构建 [镜像构建篇 - 我是如何实现 docker 镜像 2 分钟构建、部署 (opens new window)](https://juejin.cn/post/6871630496535838734)，在基于 root-config 进行完整案例演示

## 针对官方案例进行优化

**index.ejs 内使用了 CSP**

在初学阶段我安装了 `single-spa-react` 和 `root-config` 是可以正常运行的，但是安装了 `single-spa-vue` 发现在 `root-config` 内跑不起来，独立运行也是不可以的，独立运行的办法网上有，通过 `window.singleSpaNavigate` 来判断其是否是 `single-spa` 环境内

```js
if (!window.singleSpaNavigate) {
  new Vue({
    render: h => h(App),
  }).$mount('#app');
} else {
  setPublicPath("@spa-vue/single-spa-vue", 2);
  vueLifecycles = singleSpaVue({
    Vue,
    appOptions: {
      render(h) {
        console.log(this)
        return h(App, {
          props: {
            // single -spa props are available on the "this" object. Forward them to your component as needed.
            // https://single-spa.js.org/docs/building-applications#lifecyle-props
            name: this.name,
            mountParcel: this.mountParcel,
            singleSpa: this.singleSpa,
          },
        });
      },
    },
  });
}
```

但是这在 `root-config` 内还是无法正常运行，也没有任何提示，插件也只会报 `mount error`，baidu、google 我都搜过了，也没找着解决的办法，后来一点一点的尝试，发现是官方的案例内添加了 [csp（内容安全策略） (opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)，而我在本地环境下，使用的是 http：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Root Config</title>
  ...
  <meta http-equiv="Content-Security-Policy" content="default-src 'self' https: localhost:*; script-src 'unsafe-inline' 'unsafe-eval' https: localhost:*; connect-src https: localhost:* ws://localhost:*; style-src 'unsafe-inline' https:; object-src 'none';">
  ...
```

在 head 头内 添加了 `Content-Security-Policy` 的 meta 标签，可以选择在调试阶段先注释掉，上线的时候在放开

### 修改 webpack 配置

官方的案例内只是做了一些简单的配置，但是对于打包在容器内运行，还是差点东西，在加上 importmap 的配置不利于优化，我就整体做了一个调整：

importmap

```html
 <script type="systemjs-importmap">
    {
      "imports": {
        "@single-spa/welcome": "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js",
        "@spa/root-config": "//localhost:9000/spa-root-config.js"
      }
    }
 </script>
```

原来是在 `index.ejs` 内添加了一个 script 标签，所有配置都写在了页面里，我认为配置方面的东西应该是一个独立的配置环境，所以我把它独立了出来：

```html
<script type="systemjs-importmap" src="./importmap.json"></script>
{
  "imports": {
    "single-spa": "https://cdn.jsdelivr.net/npm/single-spa@5.5.5/lib/system/single-spa.min.js",
    "react": "https://cdn.jsdelivr.net/npm/react@16.13.1/umd/react.production.min.js",
    "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@16.13.1/umd/react-dom.production.min.js",
    "@spa/react": "//localhost:8500/spa-react.js",
    "@spa-vue/single-spa-vue": "//localhost:8080/js/app.js" 
  }
}
```

写到这里我发现还有一点要提醒大家，使用 `single-spa-react` 构建的 `react` 应用，想在 `root-config` 内运行是需要配置上面代码中的两个变量：`react` 和 `react-dom`

`@spa/react` 和 `@spa-vue/single-spa-vue` 的域名可以通过 `dotenv` 来设置环境变量

上面配置了 `importmap` ，但是想打包进去还需要对整体的结构做个优化，结合了 `react` 及 `vue` 项目的经验，我选择把 `importmap.json` 和 `index.ejs` 放在 `public` 目录中，在通过 `webpack` 配置把相应的文件 `copy` 到打包目录中，优化后的 `webpack` 配置如下：

```js
const path = require("path");
const fs = require('fs-extra');
const webpack = require('webpack');
const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = {
  appPublic: path.join(__dirname, 'public'),
  appBuild: path.join(__dirname, 'dist'),
  appHtml:  path.join(__dirname, 'public/index.html'),
}
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml,
  });
}

module.exports = (webpackConfigEnv) => {
  const orgName = "spa";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
  });

  const config = webpackMerge.smart(defaultConfig, {
    devtool: 'soure-map',
    // modify the webpack config however you'd like to by adding to this object
    devServer: {
      historyApiFallback: true,
      // publicPath: '/src/',
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      contentBase: paths.appPublic
    },
    module: {
      rules: [
        {
          use: [
            {
              test: /\.json$/,
              loader: 'json-loader'
            }
          ]
        }
      ]
    },
    plugins: [
      // new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        inject: false,
        template: paths.appHtml,
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal === "true",
          orgName
        }
      })
    ],
  });
  
  const compiler = webpack(config)
  compiler.run((err, stats) => {
    // console.log('构建完成', stats)
    copyPublicFolder()
  })
  return config
};
```

构建的配置文章头部就有那篇我的文章，只要按照那篇文章的构建部署的方式去做，就可以完美的完成一个本地容器模拟线上环境的一个基于 `single-spa` 开发的微应用了

## 结束语

到这里代码部分就差不多了，基于前面的几篇文章和本章就可以从0到1的实现一个微前端的应用了，如果在使用的过程中出现了什么问题，可以随时评论区呼唤我，所有的案例都是我自己一个人跑了的，可能有一些没有遇见过的特殊情况，也还请大家见谅

下面的部分就是针对目前微前端市场存在的一些问题和争议的探讨，这里其实所提出的问题更能深刻的说明微前端的优缺点和未来的发展方向



# 微前端常见问题解答

## single-spa做了什么？



single-spa是一个顶层路由。当路由处于活动状态时，它讲下载并执行该路由的相关代码。

路由的代码被称为应用，每个代码都可以（可选）拥有自己的git仓库、CI进程，并且可以独立部署。这些应用即可以用相同框架实现，也可以用不同框架实现。

## 对性能有什么影响?



当按照推荐方式进行配置时，您的代码性能和包的大小将与已被拆分的单个应用程序基本相同。主要区别在于添加single-spa库（如果你选择使用SystemJS）。其他差别主要归结为一个（webpack/rollup等等）的代码包和浏览器内ES模块之间的差异。

## 我应该使用前端微服务吗？



如果你曾遇到过单一服务引发的问题，你就要考虑使用微服务了。

另外，如果你的结构是在Spotify类型的模型中设置的（例如：拥有完整堆栈功能的自治小队），那么前端的微服务将非常适合你的设置。

然而，如果你刚开始有一个小项目或一个小团队，建议暂时不实用微服务。当到你的项目扩展（如：结构扩展、功能扩展等）变得困难时，别担心，我们会在这里帮你迁移的。

## 我能使用多个框架吗？



是的。然而，这是你需要认证考虑的问题，因为他将在你的前端结构中分成了不兼容的专业领域（如：React专家可能在使用Angular应用时遇到问题），而且还会导致更多的代码被发送给用户。

然而，它非常适合从旧的或者不需要的库中迁移，这样就可以慢慢的从旧应用中删除代码，并在新库中替换成新的代码

这也是一种允许大型项目在不同库上进行实验，而无需要对他们做出强烈承诺的一种方式。

只要意识到它对你的用户即他们使用应用时的体验的影响。

## 每个single-spa应用可以拥有自己的git仓库吗？



当然！你甚至可以为他们提供自己的package.json，webpack配置文件，CI/CD进程，使用SystemJS在浏览器中将他们组合在一起。

## single-spa应用可以独立部署吗？



可以通过 ci 进行打包部署

使用推荐设置流程如下：

1. 打包你的代码并上传至CDN。
2. 更新开发环境的导入映射，指向新的URL。换句话说，你的导入映射由"styleguide": "cdn.com/styleguide/v1.js" 更新为 "styleguide": "cdn.com/styleguide/v2.js"

"如何更新导入映射"上的一些选项：

- 服务器通过导入映射渲染index.html。这不意味这你的所有的DOM元素都需要服务器渲染，但是只要使用 `<script type="systemjs-importmap>` 元素， 可以提供更新数据库或服务器的本地文件的API。
- 将导入映射放在CDN上，并且使用 [import-map-deployer (opens new window)](https://github.com/single-spa/import-map-deployer)或类似于在CI过程中更新导入映射。这种方法对性能影响很小，如果你没有设置服务端渲染，则通常更容易设置。（你也可以[preload (opens new window)](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content)导入映射文件来提升速度）。详情见 example [travis.yml (opens new window)](https://github.com/openmrs/openmrs-esm-root-config/blob/master/.travis.yml)。其他的CI工具也可以工作。



