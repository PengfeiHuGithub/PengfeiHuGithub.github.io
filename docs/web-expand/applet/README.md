# 基础篇 1：小程序开发基础知识

## 准备工作

小程序开发要先注册小程序账号，有了小程序账号才可以使用开发者工具。小程序是一种特殊的开发形式，里面的 API 和组件都是自己定制的，因此在普通的浏览器中不能预览，要预览功能和页面就需要使用开发者工具。

### 注册小程序账号

先准备一个没有注册过公众号的邮箱，然后访问[小程序介绍页面 (opens new window)](https://mp.weixin.qq.com/cgi-bin/wx?token=&lang=zh_CN)并点击底部的「前往注册」按钮，再按照提示填写个人信息，最后进入邮箱激活账号即可。

![img](https://user-gold-cdn.xitu.io/2018/8/13/165312e43a302608?w=754&h=762&f=jpeg&s=54460)

![img](https://user-gold-cdn.xitu.io/2018/8/13/165312ec725d3a79?w=621&h=560&f=jpeg&s=32255)

详细流程请参考[官方文档 (opens new window)](https://developers.weixin.qq.com/miniprogram/dev/#申请帐号)。

### 安装开发者工具

小程序有自己的开发者工具，可以编写代码，实时查看页面和功能效果，还能在开发者工具中进行 debug。小程序开发者工具是使用 NW.js 编写的。

开发者工具下载地址：[微信开发者工具(opens new window)](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

### 使用开发者工具演示 WeUI

> WeUI 是一套同微信原生视觉体验一致的基础样式库，由微信官方设计团队为微信内网页和微信小程序量身设计，令用户的使用感知更加统一。包含 button、cell、dialog、 progress、 toast、article、actionsheet、icon 等各式组件。

WeUI 有两个版本，一个是[普通的 HTML5 版本 (opens new window)](https://github.com/Tencent/weui)，另外是[小程序版本 (opens new window)](https://github.com/Tencent/weui-wxss)。本节我们通过 WeUI 来简单学习开发者工具的使用。

首先下载 WeUI 源码：

```text
# https 方式（推荐）
git clone https://github.com/Tencent/weui-wxss.git
# 或者 ssh 方式
git clone git@github.com:Tencent/weui-wxss.git
```

打开开发者工具，使用注册时绑定的微信账号扫码登录，这时在进入的界面中选择「小程序项目」，如果是初次使用小程序开发者工具，没有创建过小程序项目，就会进入下面的页面：

![img](https://user-gold-cdn.xitu.io/2018/8/13/165312f215200a5a?w=523&h=586&f=jpeg&s=31800)

在这个页面，先选择我们 clone 下来的 WeUI 项目的 dist 文件夹。对于 AppID 选项，如果已经有了小程序账号，可以在账号后台找到 AppID 并填写上；若还没有注册小程序账号，可以直接在「或使用测试号：」后面单击「小程序」，就会自动填好。然后给项目起个名字，比如「WeUI 演示」，点击确定后就打开了 WeUI 项目。这时候看到的是开发者工具的开发界面，如下图所示，开发界面主要由三部分组成：模拟器、编辑器和调试器。

![img](https://user-gold-cdn.xitu.io/2018/8/13/165312f51a739302?w=1552&h=986&f=jpeg&s=258219)

- 模拟器：提供小程序的运行环境，模拟小程序在手机上的界面效果
- 编辑器：简单 IDE 功能，点击左侧树形菜单可以打开多个文件直接编写保存，做到实时预览效果，但是开发者工具的编辑器做得比较简单，而且使用体验并不好，建议选择自己顺手的 IDE 增加 WXML 和 WXSS 的语法高亮插件等来编辑代码
- 调试器：订制版的 Chrome 开发者工具，提供从页面结构到网络请求等多个面板支持，会用 Chrome DevTools 就很容易上手该工具

> **Tips：** 常用 IDE 推荐
>
> - VS Code + [minapp 插件(opens new window)](https://marketplace.visualstudio.com/items?itemName=qiu8310.minapp-vscode)
> - Sublime Text 3 + [Sublime wxapp 插件(opens new window)](https://github.com/springlong/Sublime-wxapp/blob/master/docs/README.zh-ch.md)
> - Vim + [wxapp(opens new window)](https://github.com/chemzqm/wxapp.vim)

除了三个重要组成部分之外，在开发者工具的顶部还有各种操作按钮。左侧主要是模拟器、编辑器、调试器和小程序云开发控制台的视图开关，可以控制对应视图的开启关闭。

![img](https://user-gold-cdn.xitu.io/2018/8/17/1654831f696500a5?w=246&h=66&f=jpeg&s=8232)

中间部分是跟开发、编译、测试和上线相关的各种按钮，我们在开发和测试小程序中会经常使用，最常用的有：

- 预览、远程调试：是可以在手机上直接预览效果，开启远程 debug 功能的
- 清缓存：对于一些授权登录、缓存、数据之类的操作，我们需要清理状态和数据，可以通过这个按钮操作
- 上传：如果是创建项目的时候填写了 AppID，那么会出现这个按钮，小程序开发完毕后可以通过这个来上传，上传之后可以在小程序后台申请测试版和审核，审核通过后就可以正式上线了

最后介绍的是开发者工具右上角的「详情」。

![img](https://user-gold-cdn.xitu.io/2018/8/13/165312fbdffa1462?w=378&h=782&f=jpeg&s=50506)

详情下面主要有三个 Tab：项目设置、域名信息和腾讯云状态。

- 项目设置：这个是用得比较多的，可以指定上传代码时候的编译情况，比如支持 ES6 语法、支持 css autoprefixer、代码压缩等
- 域名信息：小程序的 `request` 等访问的域名采用了白名单形式，在这里可以看到小程序管理后台设置的域名白名单
- 腾讯云状态：可以看到小程序账号和腾讯云的绑定情况

## 小程序开发语言



小程序的开发语言跟前端开发者比较熟悉的 HTML5 非常相似（甚至相同），小程序的视图层由 `WXML` 和 `WXSS` 组成，分别对应 HTML 和 CSS，逻辑层则跟 HTML5 一样，也是 JavaScript 语言实现。

- WXML：小程序自己发明的 XML 语法描述，用来构造小程序的页面结构
- WXSS：小程序的页面的样式表语言，描述 WXML 的样式
- JavaScript：小程序 JS 的执行环境并不是普通的 WebView 浏览器，也不是 Node.js 环境，它执行在微信 App 内上下文， 跟 Node.js 一样，也不能像在浏览器内一样对页面 DOM 进行操作

> 微信小程序运行在三端：iOS、Android 和用于调试的开发者工具
>
> - 在 iOS 上，小程序的 JavaScript 代码运行在 JavaScriptCore 中
> - 在 Android 上，小程序的 JavaScript 代码通过 X5 内核来解析
> - 在 开发工具上， 小程序的 JavaScript 代码运行在 NW.js（Chromium 内核） 中

除了普通的 JavaScript，小程序还支持一种类似 JS 的 **WXS** 语言，WXS 对于小程序开发不是必需的，它的主要目的是为了增强 WXML 的数据处理能力而新引入一种技术实现，其实际解析的语言规范还是 JS，并没有引入新的语法，仅仅对 JS 做了上层的封装和限制，所以学习上基本没什么成本，大致了解下开发文档马上就能上手。本小册实战部分也会涉及简单的 WXS 编写。

> 对于 WXS 和 JavaScript 的性能比较，官方给出的数据是：**由于运行环境的差异，在 iOS 设备上小程序内的 WXS 会比 JavaScript 代码快 2 ~ 20 倍。在 Android 设备上二者运行效率无差异。**

## 小程序项目相关知识



### 小程序目录结构

小程序项目由配置文件、页面文件、静态资源和其他相关（比如组件、小程序云函数等）内容组成，一般小程序会由四类文件组成：

- `.json` 后缀的 JSON 配置文件
- `.wxml` 后缀的 WXML 模板文件
- `.wxss` 后缀的 WXSS 样式文件
- `.js` 后缀的 JS 脚本逻辑文件

小程序项目的目录结构组成没有严格的要求，按照前端项目的经验，一般会分为：配置、页面、静态资源、基础库、组件等多个目录，例如下面的目录结构：

```text
├── app.js            小程序全局app相关js
├── app.json          小程序配置文件
├── app.wxss          小程序全局app样式
├── cloud-functions   云函数目录
│   ├── decrypt
│   ├── geocoder
│   ├── he-air
│   ├── he-weather
│   ├── jscode2session
│   └── weather
├── components        组件库
│   └── icon
├── images            图片等静态资源
│   └── cloud.jpg
├── pages             页面目录
│   ├── diary
│   └── weather
└── project.config.json  工具项目配置文件
```

当然根据不同的项目，可能目录结构不同，但是小程序必需的 `app.json` 和页面组成是必不可少的。另外，在开发复杂的项目时，我们会用到开发框架或者编译工具，这时候目录结构只需要保证编译之后的目录结构符合规范即可。

### 小程序的配置

小程序有三个重要的配置，分别放在三个 JSON 文件内：`project.config.json`（工具项目配置）、`app.json`（小程序配置）、`page.json`（单页面配置）

- `project.config.json`：这个是配置项目工具相关的，比如开发者工具的编译设置（是否使用 ES6 语法等）、界面设置，以及云函数相关的 `cloudfunctionRoot`，详细可以参考[项目配置文件(opens new window)](https://developers.weixin.qq.com/miniprogram/dev/devtools/projectconfig.html)
- `app.json`：小程序的全局配置，包括了所有页面路径、界面表现、网络超时时间、底部 tab、插件等，常用的两个配置是 `window` 和 `pages`，详细配置参考[全局配置(opens new window)](https://developers.weixin.qq.com/miniprogram/dev/framework/config.html)
- `page.json`：是相对于 `app.json` 更细粒度的单页面配置，详细参考[页面配置(opens new window)](https://developers.weixin.qq.com/miniprogram/dev/framework/config.html#页面配置)

## 组件和插件



小程序页面是由各种组件组成的，组件可以类比成原生 HTML5 的标签。

### 组件

小程序内部定义了很多组件，可以对应 HTML5 的标签和基础能力来理解，小程序的组件根据实现不同，可以分为 Web 组件和 Native 组件，Web 组件是由 HTML5 原生 Web 组件封装的组件，比如 `view`、`image` 等；Native 组件是为了增强小程序的体验，用客户端技术实现的组件，包括一些交互复杂、原生 Web 组件性能不高的组件，例如 `input`、`map`、`canvas`、`video` 等。

小程序一共提供 8 大类 30 多个组件：

- 视图容器：主要是实现页面布局的，对常见的布局形式进行了封装，比如滚动 sroll-view 等
- 基本内容：类似 HTML5 中内容相关的 p、em 等
- 表单相关：要比 HTML5 的 form 表单丰富一些
- 导航：类似 a 标签
- 媒体：类比 HTML5 中的 video、audio 和 img 等，但是提供更标准的界面和更丰富的 API 支持
- 画布：Native 实现的 Canvas
- 地图：结合腾讯地图数据 Native 实现的组件
- 开放能力：这部分组件偏通用和小程序业务

### 自定义组件

小程序本身支持很多组件，比如地图、按钮等，开发者也可以自己做项目内公共组件，比如我们后面实战部分会介绍做一个 icon 组件，放在 `components` 目录下面，这样此小程序的任何页面如果要使用这个 icon 公共组件，只需在自己的 `page.json` 中添加如下字段：

```text
"usingComponents": {
  "icon": "../../components/icon/index"
}
```

添加完成之后，在页面代码中就可以直接使用 `<icon>` 的 tag 了。[官方文档 (opens new window)](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/)有更加详细的介绍。

### 插件

插件是对一组 JS 接口、自定义组件或页面的封装，用于提供给第三方小程序调用。简单来说，插件是组件的升级版本，组件只能在自己项目中使用，插件则更独立，是可以发布到全网，供其他开发者使用的。例如实战中，笔者使用了一款日历插件，则需要在 `app.json` 中增加 `plugins` 字段：

```text
"plugins": {
  "calendar": {
    "version": "1.1.3",
    "provider": "wx92c68dae5a8bb046"
  }
}
```

如果想开发一个插件，则可以参考[官方文档 (opens new window)](https://developers.weixin.qq.com/miniprogram/dev/framework/plugin/development.html)。

## 小程序开发基础



微信小程序是由数据驱动的开发框架，本小节主要介绍小程序开发中的基础概念和知识。

### 数据驱动

微信小程序是数据驱动模型，在 WXML 中可以对页面的数据进行绑定，小程序的 WXML 内使用的是 Mustache 语法，在 `{{}}` 内可以将变量名包裹起来。 例如：

```text
<view>{{ message }}</view>
Page({
  data: {
    message: 'Hello MINA!'
  }
})
```

但是小程序不支持复杂的表达式，目前支持简单的三元、加减和逻辑判断，如果要使用形如 `NaN` 的函数调用语法，需要 `WXS` 支持：

WXML 内容：

```text
<wxs src="./demo.wxs" module="tools" />
<view>{{ tools.toNumber(num) }}</view>
```

WXS 内容：

```text
// demo.wxs
function toNumber(n){
  return parseInt(n)
}
module.exports.toNumber = toNumber
```

小程序内对页面的数据修改只能通过 `setData` 方法，不能使用直接赋值的方式 `this.data.key = value`：

```text
Page({
  data: {
    message: 'Hello MINA!'
  },
  onLoad(){
    this.setData({
      message: 'hello world~'
    })
  }
})
```

> 记住：修改页面数据，只能使用 this.setData 修改！

### 事件绑定和处理

在小程序内，除了标准 HTML5 中遇见的 `touchstart` 等事件外，增加了 `tap` 类的事件，主要包括以下几种：

事件名称

说明

tap

手指触摸后马上离开

longpress

手指触摸后，超过 350ms 再离开，如果指定了事件回调函数并触发了这个事件，tap 事件将不被触发

longtap

手指触摸后，超过 350ms 再离开（推荐使用 longpress 事件代替）

小程序内，事件的绑定是通过在 WXML 标签增加 `bind*` 属性来实现的，比如新鲜天气的生活指数，笔者是绑定了一个 `tap` 事件，当用户点击之后，会响应对应页面 JS 的函数：

```text
<view class="life-style">
    <view class="item" wx:for="{{lifeStyle}}" data-name="{{item.name}}" data-detail="{{item.detail}}" bindtap="indexDetail">
      <view class="title">
        <icon type="{{item.icon}}"></icon>
        {{item.name}}
      </view>
      <view class="content">{{item.info}}</view>
    </view>
</view>
```

上面的代码绑定了 `tap` 事件，事件处理函数为 `indexDetail`。

#### 事件冒泡

**小程序内的事件分为可冒泡和不可冒泡的事件，除了 submit、input 之类的事件，多数是可冒泡的事件**，对于事件的绑定，除了 `bind*` 的方式，还可以通过 `catch*` 的方式来绑定，两者的区别在于：

- `bind` 不会阻止冒泡，变形写法为 `bind:*`
- `catch` 会阻止事件继续冒泡，变形写法为 `catch:*`

#### 事件捕获

小程序内，触摸类事件支持捕获阶段，捕获是先于冒泡的触发，绑定捕获事件，可以使用 `capture-bind`、`capture-catch`，后者将中断捕获阶段和取消冒泡阶段，下面是官方的示例：

> 在下面的代码中，点击 inner view 会先后调用 handleTap2、handleTap4、handleTap3、handleTap1。

```text
<view id="outer" bind:touchstart="handleTap1" capture-bind:touchstart="handleTap2">
  outer view
  <view id="inner" bind:touchstart="handleTap3" capture-bind:touchstart="handleTap4">
    inner view
  </view>
</view>
```

> 如果将上面代码中的第一个 capture-bind 改为 capture-catch，将只触发 handleTap2。

```text
<view id="outer" bind:touchstart="handleTap1" capture-catch:touchstart="handleTap2">
  outer view
  <view id="inner" bind:touchstart="handleTap3" capture-bind:touchstart="handleTap4">
    inner view
  </view>
</view>
```

关于事件的详细说明，建议阅读[官方的文档 (opens new window)](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html)，以获取更大的帮助。

#### 事件对象

当事件触发时，处理函数会响应，传入 `event` 对象，通过 `event` 对象可以获取事件触发时候的一些信息，包括时间戳、`detail` 等。

因为小程序内的事件绑定都是在 WXML 中实现的，所以传递参数只能通过 WXML 上面的属性值来传递，例如下面的代码中，`indexDetail` 处理函数需要接收生活指数的名称和详情，来弹出弹层提示，这时候需要在标签上增加 `data-xx` 这样的属性，`data-name` 和 `data-detail` 就是两个属性，通过这两个值，可以在 `indexDetail` 内 `event` 对象的 `target/currentTarget` 的 `dataset` 获取参数。

```text
<view class="life-style">
    <view class="item" wx:for="{{lifeStyle}}" data-name="{{item.name}}" data-detail="{{item.detail}}" bindtap="indexDetail">
      <view class="title">
        <icon type="{{item.icon}}"></icon>
        {{item.name}}
      </view>
      <view class="content">{{item.info}}</view>
    </view>
</view>
// weather/index.js
// 响应事件的处理函数
indexDetail(e) {
  const {name, detail} = e.currentTarget.dataset
  wx.showModal({
    title: name,
    content: detail,
    showCancel: false
  })
}
```

按照官方文档，`target` 和 `currentTarget` 都有个 `dataset`，**正确获取 `dataset` 的姿势是使用 `currentTarget` 的**，但是有时候 `target` 和 `currentTarget` 的数据又是完全一样的，如果这里使用 `target` 的话，那么有时候点击会弹出弹窗，有时候不会弹出，这两者究竟是怎样的关系呢？官方的解释有点模棱两可：

- `target`：触发事件的源组件
- `currentTarget`：事件绑定的当前组件

这里笔者做下详细解释：

- `target`：触发事件的源组件，上面的代码中，`target` 可能是 `view.title`、`view.content`、`view.item` 任意触发事件的组件
- `currentTarget`：事件绑定的当前组件，上面的代码中，只能是真正绑定了 `bindtap` 的 `view.item`

下面再来看下例子：

```text
<view id="outer" bindtap="handleTap1">
  outer view
  <view id="middle" catchtap="handleTap2">
    middle view
    <view id="inner" bindtap="handleTap3">
      inner view
    </view>
  </view>
</view>
```

> 点击 inner view 时，handleTap3 收到的事件对象 target 和 currentTarget 都是 inner，而 handleTap2 收到的事件对象 target 就是 inner，currentTarget 就是 middle。
>
> 由此一看，可以简单总结出来：`target` 是事件触发源头的地方，即事件开始的地方，可以冒泡到父节点触发父节点的绑定事件；而 `currentTarget` 是开发者自己绑定事件的地方，即实际的绑定事件的节点。**所以，如果绑定的事件有子节点，那么 `target` 不会等于 `currentTarget`，有可能是冒泡触发的，由此可见，获取 `dataset` 的时候使用 `currentTarget` 是靠谱的。**

### 小程序的事件驱动和数据绑定模型

由上面数据驱动和事件监听的处理方式可见，小程序是一套数据和事件驱动的模型，即下面的形式：

![img](https://user-gold-cdn.xitu.io/2018/8/13/1653130442bc15fc?w=823&h=428&f=jpeg&s=34695)

关于小程序的运行机制，在[第 4 节 (opens new window)](https://juejin.im/book/5b70f101e51d456669381803/section/5b70f3456fb9a00986735fa3)中会有更加详细的介绍。

### 路由

在小程序内，不能像 HTML5 中 a 标签那样，随便跳转，也不能像 `location` 对象中对应的属性那样随意跳转，小程序提供了对应 a 标签和 `location` 对象的方法：[navigator 组件 (opens new window)](https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html)和 [wx 中的导航相关函数 (opens new window)](https://developers.weixin.qq.com/miniprogram/dev/api/ui-navigate.html)。

在小程序中，路由是由路由栈来维护的，小程序的路由栈中最多维护 5 个页面，这样在 5 个页面内，小程序维护其渲染页面，可以实现快速的切换。

小程序中跳转页面可以通过下面两种方式：

1. 使用 navigator 组件：

```text
<navigator url="跳转页面URL" >跳转到新页面</navigator>
```

1. 使用 `wx` 中的导航相关函数：

```text
<view bindtap="gotoUrl">跳转页面</view>
Page({
  gotoUrl(){
    let url = 'pages/another/url'
    wx.navigateTo({
      url
    })
  }
})
```

### JavaScript 的限制和增强

微信内的 JavaScript 相对于浏览器中的有限制也有增强，增强的部分是基于小程序 Native 端能力做的增强，比如增强的文件操作类（相册、录音等）；除了增强，跟 HTML5 浏览器环境最大的不同是限制部分。

小程序的执行环境是没有浏览器了，所以浏览器环境特有的 `window` 对象、BOM 和 DOM 等相关 API 都存在缺失（有对应的补充 API），小程序的执行环境是类似于 Node.js 的一种执行环境。因为没有浏览器环境，所以跟浏览器相关的操作如 cookie、Ajax 请求（`XMLHttpRequest`）、DOM 选择器、DOM 事件、路由 history、缓存、设备信息、位置等都不存在，与之相对应的是小程序的私有 API，比如我们在小程序中不能使用 `XMLHttpRequest`，但是可以使用功能更加强大的 `wx.request` 方法。

## 小程序布局相关知识



本小节介绍小程序布局相关的知识。

### rpx

小程序 WXSS 中使用了 rpx 这个长度单位，可以用于表示元素的宽高和边距、字体的大小等。对于习惯使用 px 或者 rem 来做页面的前端来说，这可能让人有点迷糊。rpx 是以小程序容器宽度（等于设备宽度）恒等于 `750rpx` 来做定义的。对于 iPhone 6 来说，因为 dpr 为 2，所以 iPhone 的宽度为 375px，这样在 iPhone 6 上使用 rpx 的话，换算关系为 `2rpx=1px`。根据这样的关系类推，得到官方给的表格：

| 设备          | rpx换算 px (屏幕宽度/750) | px 换算 rpx (750/屏幕宽度) |
| ------------- | ------------------------- | -------------------------- |
| iPhone 5      | 1rpx = 0.42px             | 1px = 2.34rpx              |
| iPhone 6      | 1rpx = 0.5px              | 1px = 2rpx                 |
| iPhone 6 Plus | 1rpx = 0.552px            | 1px = 1.81rpx              |

看起来很麻烦，但是只需要**按照官方建议，让设计师按照 iPhone 6 的视觉稿标准出图即可，即宽度为 750px**，按照 750px 出图，那么我们写页面时直接使用测量的尺寸来设置 rpx 就行了。

### flex 布局

在 HTML5 标准中，flex 布局可以简便、完整、响应式地实现各种页面布局，小程序作为晚于 flex 标准创建的 Hybrid 解决方案，自然在布局设计上采用了先进的 flex 布局。

关于 flex 布局相关知识，可以参考阮一峰的 [flex 布局教程：语法篇 (opens new window)](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)和[实例篇 (opens new window)](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)。

## 小结



本节从小程序账号注册说起，依次介绍了小程序开发者工具、小程序开发语言、小程序项目、开发和布局相关的基础知识，内容由浅到深，全面地帮助大家入门小程序开发。

更多微信小程序的基础知识可以参考官方文档：[简易教程 (opens new window)](https://developers.weixin.qq.com/miniprogram/dev/index.html)、[框架 (opens new window)](https://developers.weixin.qq.com/miniprogram/dev/framework/MINA.html)、[组件 (opens new window)](https://developers.weixin.qq.com/miniprogram/dev/component/)、[API (opens new window)](https://developers.weixin.qq.com/miniprogram/dev/api/)。



#  基础篇 2：小程序·云开发基础知识

> **[小程序·云开发 (opens new window)](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)**是微信团队联合腾讯云团队推出的一套小程序开发解决方案。小程序·云开发为开发者提供完整的云端流程，弱化后端和运维概念，开发者无需购买和管理底层计算资源，包括服务器、数据库、静态存储，只需使用平台提供的简易 API 进行核心业务等开发，实现快速上线和迭代，把握业务发展的黄金时期。

简单来说，小程序开发中用到的服务器、数据库和静态资源管理，都可以托管到「小程序·云开发」上，小程序开发者只需要关注业务功能实现，而不需要关心服务器运维等带来的问题。小程序开发主要用到的是前端技术，后端开发和服务运维对于前端开发者来说有一定的门槛，而小程序·云开发的出现就是解决这个问题的。

## 小程序·云开发特点



- 提供完整后端服务解决方案，包括数据库、静态资源管理和云函数（功能服务）
- 背靠腾讯云大平台，腾讯云丰富的 API 和功能都可以简单调用
- 对于普通开发者，**完全免费**
- 对于高级服务型小程序，提供更强服务支持、计费弹性、不使用不计费的特点
- 无服务器搭建，无域名配置，直接调用 API 使用

对于我们普通开发者来说，小程序·云开发是个不错的练手平台。下面详细介绍下小程序·云开发提供的功能。

小程序·云开发提供数据库、云函数和静态存储三大功能，还有小程序的用户管理功能，在用户管理界面可以轻松掌握小程序的授权用户情况。目前云开发的这些功能已经深度整合到「微信开发者工具 Beta 版」中，可以在顶部点击「云开发」进入。

![img](https://user-gold-cdn.xitu.io/2018/8/13/16531333a4586d62?w=1200&h=877&f=png&s=90409)

首页会看到一些 API 调用和小程序·云开发的资源配置信息。

## 申请小程序·云开发



如果还没有开通小程序·云开发账号，首次点击「云开发」会出现下面的界面，该界面主要是云开发的介绍和申请入口。

![img](https://user-gold-cdn.xitu.io/2018/8/27/165796be943b5c8b?w=1199&h=787&f=png&s=216045)

点击蓝色的「创建资源环境」按钮进入新建环境界面。

![img](https://user-gold-cdn.xitu.io/2018/8/27/1657975df8ed1d6e?w=1200&h=786&f=png&s=76893)

第二步出现选择套餐信息，现在公测阶段只有一个免费套餐选项，将来应该会有更多套餐选择。填写上「环境名称」点击确认之后，会使用小程序开发账号在腾讯云开通一个 `fake account`。到此小程序·云开发就开通了！

> **TIPS**：目前一个小程序账号可以免费开通两个云开发账号，免费版本的限制应该也要注意：
>
> - 数据库存储空间：1GB
> - 文件存储空间：5GB
> - 文件存储外网下行流量：5GB/月
> - 云函数数量：20
> - 云函数资源使用量：10万GBs/月
> - API调用次数：3万次/天
>
> **这些对于我们做普通的小程序开发练习已经足够了！**

### 小程序·云开发在小程序中的调用

小程序·云开发可以在小程序中直接通过调用 `wx.cloud.*` 的方式进行调用，在调用云开发 API 之前，需要先调用 `wx.cloud.init` 对云开发进行初始化：

```text
wx.cloud.init({
  env: 'tianqi-xxx'
})
```

初始化时，需要传入 `env` 参数，该参数为创建小程序·云开发时的`环境 ID`，可以在「云开发」页面右上角「当前环境」下拉菜单中找到：

![img](https://user-gold-cdn.xitu.io/2018/8/13/1653133b981bd767?w=639&h=300&f=png&s=41977)

下面详细介绍下小程序·云开发的三大功能。

## 数据库



小程序·云开发的数据库是一种 NoSQL 云端数据库，数据以 JSON 格式存储，在底层支持弹性可扩展、自动容灾、监控管理，所以开发者不需要关注数据库的运维。从提供的文档和接口来看，云开发的数据库应该是由 MongoDB 实现的。

每个数据库是由多个集合（collection，类比关系型数据库中表的概念）组成，集合有多个 JSON 文档（行）组成，NoSQL 的特点是没有固定的字段，所以整个集合可以看成一个大的 JSON 数组，一个集合在数据库中的存储格式如下：

```text
[
  {
    "_id": 1,
    "_openid": "ax123CVadb",
    "name": "Alice",
    "city": "Guangzhou"
  },
  {
    "_id": 2,
    "_openid": "xj372nJdfa",
    "name": "Bob",
    "city": "Shenzhen"
  }
]
```

需要说明的是，文档中的 `_id` 是唯一的，开发者可以插入数据的时候自定义，另外 `_openid` 是增加文档默认创建的，代表当前小程序用户的唯一标示，后面实战部分笔者会重点介绍小程序的用户授权相关的内容。

### 快速入门

详细介绍可以见小程序·云开发的使用文档，这里笔者整理出常用的 API 使用方法：

```text
// 初始化
wx.cloud.init({
  env: 'tianqi-xxx'
})
// 获取数据库实例
const db = wx.cloud.database()
// 增
db.collection('集合名称').add({
  data: {} // 插入的数据
}).then(res => {
  // 可以通过 res._id 获取创建的记录的 id
  console.log(res._id)
})
// 删
db.collection('集合名称').doc('文档 ID').remove().then(res => {
  console.log('removed')
})
// 改
db.collection('集合名称').doc('文档 ID').update({
  data: {
    title: '我的第 1 篇文章', // 只更新 title 字段，其他不更新
  }
}).then(res => {
  // 可以通过 res._id 获取创建的记录的 id
  console.log(res._id)
})
// 查
db.collection('集合名称').doc('文档 ID').get().then(res => {
  // 打印结果，res.data 即为记录的数据
  console.log(res)
})
const _ = db.command // 取指令
db.collection('集合名称').where({
  // 查找条件
  category: 'computer',
  properties: {
    memory: _.gt(8), // 表示大于 8
  }
})
```

小程序·云开发的数据库查询命令是可以使用查询筛选指令的，使用查询筛选指令可以缩小查询范围，找到查询条件的文档。

以下指令挂载在 `db.command` 下

类型

接口

说明

比较运算

eq

字段 ==

neq

字段 !=

gt

字段 >

gte

字段 >=

lt

字段 <

lte

字段 <=

in

字段值在数组里

nin

字段值不在数组里

逻辑运算

and

表示需同时满足指定的所有条件

or

表示需同时满足指定条件中的至少一个

> 举例说明：在 `diary` 集合中找出 `openid` 某个值并且创建时间（`tsModified`）在 `start` 和 `end` 之间的文档。

```text
db
  .collection('diary')
  .where({
    openid,
    tsModified: _.gte(start).and(_.lt(end))
  })
  .get()
```

### 数据库的索引

增加合适的索引可以提升文档的查找效率，比如根据时间、用户 ID 查找，可以将时间和用户 ID 字段设置为索引项，笔者在使用的时候发现：**在小程序·云开发管理后台并不能对某个字段增加唯一索引。**

### 自带权限管理

在研发中，经常会针对不同的用户设置不同的数据库权限，例如：某条记录是用户 A 创建的，则只有用户 A 可以删除或者更新，其他用户只有查看的权限，这样的需求很常见，实际开发起来却非常费劲，往往要写不少权限判断的代码，小程序·云开发的数据库支持「权限管理」功能，可以针对这类需求对不同的集合进行统一处理，大大降低开发的门槛！

集合的操作权限包括以下四种：

- 所有用户可读，仅创建者及管理员可写
- 仅创建者及管理员可读写
- 所有用户可读，仅管理员可写
- 仅管理员可读写

可以在「云开发 -> 数据库 -> 选择某个集合 -> 权限设置」页面进行设置。

![img](https://user-gold-cdn.xitu.io/2018/8/13/1653133f8470acf5?w=733&h=493&f=png&s=66527)

## 文件存储



小程序·云开发的文件存储功能是专为存储和提供用户生成的内容（如图片或视频）的开发者打造的。开发者可使用腾讯云的 SDK 来存储图片、音频、视频或其他由用户生成的内容。在小程序内，则可以通过云开发的 API 直接上传、下载和管理存储。

公共使用的静态资源，可以通过「云开发 -> 存储」界面直接上传和管理，上传之后，就可以在界面内找到资源的 CDN 地址。

而对于小程序内需要上传和管理的则通过下面几个 API 来实现：

```text
// 上传，上传后会返回资源的 ID
wx.cloud.uploadFile
// 下载
wx.cloud.downloadFile
// 根据资源 ID 获取资源访问地址
wx.cloud.getTempFileURL
// 根据资源 ID 列表删除某资源
wx.cloud.removeFile
```

跟数据库权限管理一样，如果需要用户自己上传的内容自己可以管理，那么需要设置存储的操作权限，在「云开发 -> 存储」下可以设置全局的存储操作权限。

![img](https://user-gold-cdn.xitu.io/2018/8/13/16531342c74c933b?w=496&h=506&f=png&s=72357)

## 云函数



云函数是腾讯云提供的一套函数计算解决方案，我们可以将每个功能 API 做成单个可执行的函数，然后放到腾讯云上去托管，每个云函数是相互独立可执行的。代码编写完成后放到云端，不执行不调用不收费，执行调用按照调用次数和 CPU 等计算资源的占用情况收费。有了云函数，开发者无须搭建和购买服务器，只需要将写好的云函数代码上传部署到腾讯云，即可以在小程序内通过 `wx.cloud.callFunction` 的方法进行调用。

### 快速入门

#### 创建云函数

创建云函数有两种方式，一种是直接在小程序开发者工具中进行操作：

进入「云开发 -> 云函数 -> 添加」创建：

![img](https://user-gold-cdn.xitu.io/2018/8/13/16531345ab99757d?w=1065&h=434&f=png&s=53064)

另外一种是直接在小程序开发者工具中上传，在上传之前需要配置小程序的 `project.config.json`，指明哪个路径为云函数目录：

```text
{
  "cloudfunctionRoot": "./cloud-functions/"
}
```

配置完成后，在小程序开发者工具的编辑器中展开 `cloud-functions` 文件夹，选择对应的云函数文件夹，右键选择「上传并部署」即可：

![img](https://user-gold-cdn.xitu.io/2018/8/13/16531351a0e7da9f?w=442&h=400&f=png&s=67432)

#### 写个简单云函数

小程序·云开发的云函数是执行在 Node.js 8.9.0 版本下的，云函数必须在 index.js 有 `main` 方法为入口，例如下面的代码：

```text
// 命名为 test 的函数内容 index.js
exports.main = async (event, context) => {
  let {a, b} = event
  return new Promise((resolve, reject) => {
    resolve({result: parseInt(a) + parseInt(b)})
  })
}
```

除了上面 Promise 的写法，还可以用回调的方式：

```text
// 命名为 test 的函数内容 index.js
// 回调方式 callback
exports.main = async (event, context, callback) => {
  let {a, b} = event
  callback(null, {result: parseInt(a) + parseInt(b)})
}
```

> TIPS:
>
> 1. 云函数如果不存在 `main` 的方法，上传部署的时候会报错！
> 2. 云函数回调方式写法遵循「错误优先」原则（Error-First Callback）。

云函数接受两个 JSON 格式的参数 `event` 和 `context`，两者分别代表：

- `event`：平台将 `event` 入参传递给执行方法，通过此 `event` 入参对象，代码将与触发函数的事件（event）交互，`event` 可以获取 `wx.cloud.callFunction` 调用的参数 `data`
- `context`：平台将 `context` 入参传递给执行方法，通过此 `context` 入参对象，代码将能了解到运行环境及当前请求的相关内容

> TIPS： 开发者可以在云函数内获取到每次调用的上下文（appId、openId 等），无需维护复杂的鉴权机制，即可获取天然可信任的用户登录态（openId），这俩值可以从`event.userInfo`中读取。

上面 `test` 的函数上传到腾讯云之后，我们在小程序的 JS 代码中可以使用下面的方法进行调用：

```text
wx.cloud.callFunction({
  name: 'test',
  data: {
    a: 1,
    b: 2
  }
}).then(r=>{
  // 因为 main 的方法实际是个 promisify 的返回，所以可以直接使用 then/catch
  console.log(r)
}).catch(e=>{
  console.log(e)
})
```

#### 云函数的依赖管理

在云函数中，可以像正常的 Node.js 一样，使用 `package.json` 和 `node_modules` 来对依赖进行管理，在开发完代码之后，需要将 `node_modules` 文件夹一起上传到云端去。下面笔者将带着大家做一个什么值得买的简单抓取的云函数，讲解函数编写、npm 模块使用、云函数本地测试整个流程。

先说下，笔者要实现的功能：

1. 根据传入的分类参数，获取什么值得买对应分类的最新文章内容
2. 提取出文章列表的 title、image、mall，即文章名称、文章的配图和优惠所属的网站

首先在 cloud-functions 文件夹（该文件夹是我们创建的云函数文件夹），创建一个 `smzdm` 的云函数，目录结构如下：

```text
cloud-functions
├── smzdm
│   ├── index.js
```

然后进入 `smzdm` 目录，执行 `npm init`，按照提示填写内容以后，会在该目录下生成 `package.json` 文件，接下来需要安装抓取「什么值得买」手机站点的两个 npm 模块：

- [request (opens new window)](https://www.npmjs.com/package/request)：用于做数据请求，抓取站点的 HTML 内容
- [cheerio (opens new window)](https://www.npmjs.com/package/cheerio)：用于将 HTML 结构数据转为类似 jQuery 的对象，可以通过 CSS 选择器对 HTML 的内容进行提取

安装命令如下：

```text
# 进入 smzdm 目录，执行
npm install --save request cheerio
```

安装之后的目录结构如下：

```text
cloud-functions
├── smzdm
│   ├── node_modules
│   ├── index.js
│   └── package.json
```

然后我们开始编写 index.js 内容，第一步引入模块，编写 `main` 方法：

```text
// 引入 requst 和 cheerio
const request = require('request')
const cheerio = require('cheerio')
exports.main = async (event = {}) => {
  // 获取具体什么值得买网站分类
  let category = event.category || 'diannaoshuma'
  return new Promise((resolve, reject) => {

  })
}
```

第二步，开始编写具体的逻辑，即使用 `request.get` 先获取 HTML 内容，然后使用 `cheerio` 将 HTML 内容进行结构化，经过使用 Chrome 查看器查看，发现最新文章都包含在一个 `class` 为 `card-group-list` 的 div 下，然后找到 `zm-card-title` 等每个文章的标题、图片和商城信息，将结果放到一个数组，最后 `resolve` 输出：

```text
const request = require('request')
const cheerio = require('cheerio')
exports.main = async (event = {}) => {
  let category = event.category || 'diannaoshuma'
  return new Promise((resolve, reject) => {
    request.get(`https://m.smzdm.com/fenlei/${category}/`, (e, req, body) => {
      if (!e && req.statusCode === 200) {
        const $ = cheerio.load(body)
        const result = []
        $('.card-group-list').each((i, v) => {
          let $v = $(v)
          let title = $v.find('.zm-card-title').text().trim()
          let image = $v.find('.zm-card-media img').attr('src')
          let mall = $v.find('.card-mall').text().trim()
          result.push({
            title,
            image,
            mall
          })
        })
        resolve(result)
      }
    })
  })
}
```

这样就完成了一个带有依赖模块的云函数编写，上传到腾讯云部署之后，在小程序中使用：

```text
wx.cloud.callFunction({
  name: 'smzdm',
  data: {
    category: 'diannaoshuma'
  }
}).then(r=>{console.log(r)})
```

#### 云函数的调试

云函数有一个很不方便的地方，就是测试起来相对来说比较麻烦，我们不能每次都上传到云端，通过 `wx.cloud.callFunction` 的方式进行调用，下面介绍几种测试的方法。

> 1. 线下：函数自己使用 Node 来测试

这种方法就是在 index.js 的最后，增加一个测试方法，比如：

```text
const request = require('request')
const cheerio = require('cheerio')
const main = (exports.main = async (event = {}) => {
  let category = event.category || 'diannaoshuma'
  return new Promise((resolve, reject) => {
    request.get(`https://m.smzdm.com/fenlei/${category}/`, (e, req, body) => {
      if (!e && req.statusCode === 200) {
        const $ = cheerio.load(body)
        const result = []
        $('.card-group-list').each((i, v) => {
          let $v = $(v)
          let title = $v.find('.zm-card-title').text().trim()
          let image = $v.find('.zm-card-media img').attr('src')
          let label = $v.find('.card-label').text().trim()
          let mall = $v.find('.card-mall').text().trim()
          result.push({
            title,
            image,
            label,
            mall
          })
        })
        resolve(result)
      }
    })
  })
})
main({category: 'diannaoshuma'}).then(r=>{console.log(r)})
```

然后使用 Node.js 直接运行该文件：`node index.js`

> 1. 线上：使用开发者工具

在小程序开发者工具的云开发控制台内有测试的工具，进入路径为：「云开发 -> 云函数列表 -> 点击具体云函数 -> 右上角测试」。

对于测试的参数，还可以保存下来模板，方便以后使用。

![img](https://user-gold-cdn.xitu.io/2018/8/13/1653135a895f19a7?w=1200&h=1057&f=png&s=206458)

#### 云函数的 mock server

上文提到的测试方法，都是将小程序的研发流程完全割裂开来，不能完整地测试小程序的代码，只能要么测试云函数要么测试小程序，那么测试小程序的代码就需要上线云函数，实际还是一种效率不高的做法。这里笔者介绍一种本地 mock server 的方式来开启云函数的测试，这种方式可以打通小程序开发的整个流程。具体做法分两步：

1. 将云函数作为一个接受请求参数的 server 来访问
2. 使用 `wx.request` 构造请求拿到云函数的处理结果，然后跑通整个研发流程

笔者在 mock server 选型上，选择使用 [Express (opens new window)](https://www.expressjs.com/)自建 mock server 的方式。

首先，启动一个 Express server：

```text
const express = require('express')
const app = express()

app.listen(3000, () => {
  console.log(`开发服务器启动成功：http://127.0.0.1:3000`)
})
```

然后将云函数引入进程序中来，作为一个路由 handler 来接受http url 的参数，处理请求之后，将返回的处理结果通过 Express 的 `res.json`输出。

```text
const test = require('./cloud-functions/test/').main

app.get('/api/test', (req, res, next) => {
  // 将 req.query 传入
  test(req.query).then(res.json.bind(res)).catch((e) => {
    console.error(e)
    next(e)
  })
  // next()
})
```

这样访问 `http://127.0.0.1:3000/api/test?a=1&b=2` 就会输出结果了。到这里笔者就将 mock server 搭建完毕了。

关于小程序代码中如何调用，怎么保持代码的一致性，自由切换线上代码和线下开发代码的方式，在[实战篇 1：小程序开发环境搭建 (opens new window)](https://juejin.im/book/5b70f101e51d456669381803/section/5b70f587518825612b15bd95)中会有更详细的讲解。

## 小结



本节重点介绍了腾讯新推出的小程序云开发的基础知识，云开发由 NoSQL 数据库、文件存储和云函数三个云产品组成，其中数据库和文件存储都可以单独设置用户权限，这样极大地降低了 UGC（用户产生内容）类小程序的开发门槛。

云函数是小程序·云开发中一个很重要的产品，本节介绍了云函数的基本用法和注意事项，同时针对小程序云函数的开发测试比较困难的情况，提出了 mock server 的解决方式。



# 基础篇3：小程序架构及其实现机制

## 小程序 VS HTML5



小程序并不是 HTML5 应用，而是更偏向于传统的 CS 架构，它是基于**数据驱动**的模式，一切皆组件（视图组件）。下面是小程序与普通 Web App 的对比。

- 普通 HTML5 都是执行在浏览器的宿主环境，浏览器提供 `window`、`document` 等 BOM 对象，但小程序没有 `window`、`document`，它更像是一个类似 Node.js 的宿主环境；因此在小程序内不能使用 `document.querySelector` 这类 DOM 选择器，也不支持 `XMLHttpRequest`、`location`、`localStorage` 等这些浏览器提供的 API，只能使用小程序自己实现的 API
- 小程序并非是直接通过 URL 访问的，而是通过信道服务进行通信和会话管理，所以它不支持 Cookie 存储，同时访问资源使用 `wx.request` 则不存在跨域的问题
- 小程序在 JavaScript 的模块化上支持 CommonJS，通过 require 加载，跟 Node.js 类似
- 小程序的页面样式完全继承了 CSS 的语法，但是在选择器上面会少一些，布局支持 flex 布局
- 小程序的整体框架采用面向状态编程方式，状态管理从 API 来看采用类似 Redux 的设计方式；单向数据绑定方式，当 View 在 Action 操作后，只能通过 Action 的业务处理来更新 View

页面组件模块上，WXML 提供了一整套的「自定义 UI 组件标签」，有些组件实际是 HTML5 实现的，有些组件为了解决权限、性能和适配等问题实际是 Native 实现的（如 map、input、canvas、video）。

笔者在 Android 手机上通过「设置 -> 开发人员选项 -> 显示布局界限」选择**显示布局界限**之后，打开小程序的页面会看到 Native 的边框，如果是 Native 组件则会展现出来，下面是今日头条小程序的截图。

![img](https://user-gold-cdn.xitu.io/2018/8/13/165313734e6618f3?w=1079&h=1920&f=jpeg&s=371788)

而使用 [X5 内核 (opens new window)](https://x5.tencent.com/)的 inspect 版本（X5 内核 debug 功能在 [12 节真机调试技巧 (opens new window)](https://juejin.im/book/5b70f101e51d456669381803/section/5b70f888f265da27e36ef112)部分有详细介绍），打开 Chrome 的远程调试，看到当前页面如下图所示。

![img](https://user-gold-cdn.xitu.io/2018/8/13/165313705cbd8524?w=960&h=889&f=png&s=507229)

从图中看到，今日头条的小程序顶部导航区域是 Native 组件（会显示布局界限），而底部没有边框，在 Chrome 内发现实际为 webview 的页面实现。

## 小程序架构解密



![img](https://user-gold-cdn.xitu.io/2018/8/13/16531377b0ecbfc4?w=1024&h=768&f=jpeg&s=270403)

小程序架构如上图所示，分为视图层和逻辑层，视图层是在 WebView 内渲染，逻辑层则有 JavaScriptCore 来渲染；其中视图层可以多个（考虑到整体性能，最多可以 5 个），逻辑层则全局只有一个（实际通过开启 X5 内核另起一个 JavascriptCore 线程）。

视图层是 WebView，逻辑层为 JavaScriptCore，证据如下：使用 Android 手机，开启 X5 内核 debug 之后，在 Chrome inspect 中可以看到下图所示的内容。

![img](https://user-gold-cdn.xitu.io/2018/8/13/1653137a557f6bbc?w=927&h=439&f=png&s=87662)

在小程序内，视图层负责页面渲染，逻辑层负责逻辑处理、全局状态管理、请求和接口调用。逻辑层在小程序中称为 `APP Service`，视图层称为 `View`。

逻辑层和视图层通过微信的 `JSBridge` 来实现通信的，逻辑层数据变化通过 `JSBridge` 通知视图层，触发视图层更新；当视图层触发事件，则继续通过 `JSBridge` 将事件通知到逻辑层做处理，如此交互进行。

`JSBridge` 在三个环境（开发者工具、iOS 和 Android）中实现机制不同，在调用 Native 能力时主要使用 `invokeHandler`：

- 开发者工具：通过 `window.postMessage` 来封装
- iOS：通过 WKWebview 的 `window.webkit.messageHandlers.invokeHandler.postMessage`
- Android：通过 `WeixinJSCore.invokeHandler`

在消息分发的时候，则使用 `publishHandler`：

- 开发者工具：通过 `addEventListener('message')` 来监听消息，然后处理分发
- iOS：使用 WKWebview 的 `window.webkit.messageHandlers.publishHandler.postMessage`
- Android：通过 `WeixinJSCore.publishHandler`

其中，Android 的 `WeixinJSCore` 是 X5 内核暴露出来的对象，其作为 `window` 对象的一个属性，提供一些供 JavaScript 调用的能力。

这部分可以在开发者工具或者 X5 内核 debug 模式下，找到 `WAService.js`（代码笔者放到了[这个 Gist (opens new window)](https://gist.github.com/ksky521/590fdffcff203ee9fa83cb188b4a664b)上，方便大家查看） 看到：

WeixinJSBridge 提供的方法有 `invoke`、`publish` 和 `subscribe` 等，`invoke` 就是关键的调用 Native 端能力的方法，`publish` 是消息分发的方法。注意下图的 `invoke` 实际是来自`y`，`publish` 来自 `w`，`e` 为 `window`。

![img](https://user-gold-cdn.xitu.io/2018/8/23/16565a664eee46a3?w=457&h=619&f=png&s=70984)

`y` 的实现最后调用了`g`，`w` 的实现最后调用了`_`。

![img](https://user-gold-cdn.xitu.io/2018/8/23/16565a9a64c86a08?w=392&h=440&f=png&s=56038)

继续查找`g`、`_` 的实现，发现 `g`、`_` 最后都调用了 `d` 和 `f` 的方法（显现了关键字`invokeHandler`、`publishHandler`）。

![img](https://user-gold-cdn.xitu.io/2018/8/23/16565aad2c8758ef?w=827&h=462&f=png&s=71454)

继续查找，发现 `d` 和 `f` 分别是来自 `window.webkit`、`window.WeixinJSCore`。

![img](https://user-gold-cdn.xitu.io/2018/8/23/16565ad03ce850c6?w=257&h=82&f=png&s=12861)

因为在一个小程序中可以打开多个视图层（webview），要保证发送的消息准确送到每个具体的 webview 中，需要通过每个 webview 唯一标识 `webviewId` 来实现。发送消息时，携带 `webviewId`，然后逻辑层处理完对应的逻辑，如果需要通知或者执行对应 webview 的代码，则可以通过 `webviewId` 找到对应的 webview，下发通知。

## 小程序生命周期



小程序生命周期包括应用的生命周期（逻辑层 App Service）和页面的生命周期（视图层 View），两者支持的事件不同，详见官方文档中的这张配图。

![img](https://user-gold-cdn.xitu.io/2018/8/13/16531394a3c8fe1f?w=662&h=1014&f=png&s=45267)

掌握了上面小程序实现原理的内容，再来看小程序的生命周期就很好理解了。

小程序启动时，会同时启动两个线程，一个负责页面渲染的 WebView（实际不止一个，后面讲解），一个负责逻辑的 JavaScriptCore。逻辑层初始化后会将初始化数据（app.js 中的 global data）通过 JSBridge 传递给渲染层进行渲染，渲染层 WebView 页面渲染完之后又会跟逻辑层通信。

理解了小程序架构和启动流程，小程序整个生命周期的流程只需要对着上面的流程图就可以很容易理解。

## 小程序为什么感觉快



小程序在体验上不仅仅页面流畅，而且点击之后，页面跳转也会比普通的 HTML5 要快很多，这是因为小程序的视图层做了预加载处理。下图是通过 X5 内核开启 inspect 版本之后，在 Chrome 中看到的手机 WebView 的页面情况。小程序选择今日头条，打开了两个页面（热点新闻列表和某条新闻详情），但实际在 Chrome 中看到的 WebView 页面总是比真实打开的页面要多一个，这个多出来的隐藏 WebView 就是提前初始化预热的，方便打开下一个小程序页面来使用，这样就节省了 WebView 初始化的时间，从而大幅提升了跳页效率。

![img](https://user-gold-cdn.xitu.io/2018/8/13/16531399500bca20?w=1433&h=760&f=jpeg&s=228402)

## 小程序 WXML 是怎么转成 HTML 的



小程序的视图层最终是渲染在一个 webview 中的，通过下图就可以看到我们在 WXML 中写的 `view`、`icon`、`text` 等标签最终会转换成 `wx-*` 等标签。

![img](https://user-gold-cdn.xitu.io/2018/8/13/1653139d01fde2a4?w=1127&h=877&f=png&s=436706)

那么 WXML 到 HTML 的过程发生了什么呢？

首先，WXML 写完之后经过编译工具 `wcc` 转成可执行的 JS，下面的命令可以将某个页面转为 JS：

```text
wcc -d index.wxml -o index.js
```

> **TIPS：** `wcc` 和 `wcsc` 是小程序的 WXML 和 WXSS 的编译工具，是二进制文件，在 macOS 中可以在`/Applications/wechatwebdevtools.app/Contents/Resources/package.nw/js/vendor/` 路径中找到（应用 → 右键微信开发者工具 → 查看包文件）

![img](https://user-gold-cdn.xitu.io/2018/8/13/165313e0a87d209f?w=1764&h=1096&f=png&s=413336)

这个 JS 里面有个重要的函数是 `$gwx`：

![img](https://user-gold-cdn.xitu.io/2018/8/13/165313e2c44a689c?w=981&h=392&f=png&s=248171)

这个 JS 主要接收一个 `path` 将 `path` 的页面转换成一个 Virtual DOM：

![img](https://user-gold-cdn.xitu.io/2018/8/13/165313e4c84b0937?w=341&h=455&f=png&s=44563)

在这个 VDOM 结构里面就会找到以`wx-*` 开头的 tag，有了这个 VDOM 结构，就可以使用对应的 tag 创建 HTML 片段了。

整个流程梳理如下：

![img](https://user-gold-cdn.xitu.io/2018/8/13/165313e72ea7a43a?w=794&h=97&f=png&s=26808)

## 小结



本节重点介绍了小程序和普通的 HTML5 有什么区别，从小程序底层机制上来说明小程序是如何最终展现在 WebView 界面上的。本节涉及较多的源码和反编译技巧，对于初学者来说只需要了解微信小程序由逻辑层和视图层两个不同的线程进行交互而形成，而视图层是通过将 WXML 转换成 JS，最终由 JS 生成 HTML 片段放在 WebView 中显示的。



# 实战篇1：小程序开发环境搭建

微信小程序虽然提供自己的 IDE 开发工具，但是对于用惯了 VS Code、Sublime 等编辑器的前端工程师来说，其体验还是挺差的，因此本项目中，只将微信小程序开发者工具作为模拟器、调试和代码上传的工具，其他开发使用自己熟练的编辑器 / IDE 即可。

除了选择自己熟练的编辑器 / IDE 之外，还应该在代码层面提高编码体验，本实战项目使用 Sass 和 ES6 语法来写代码，通过构建工具编译成小程序可以识别的 WXSS 和 ES5，最后也使用构建工具压缩和优化静态资源。

对于小程序云开发（腾讯云）的测试，本项目使用官方提供的 [SCF-Cli (opens new window)](https://github.com/TencentCloud/scf-node-debug)来本地测试云函数，这样云函数的修改就不需要每次都上传到云端之后再测试了，可以提高研发效率。

整体技术选型如下：

- VS Code： 编辑器，用于代码编写
- Gulp：前端项目构建工具
- Sass：小程序样式表
- ES6：采用 ES6 语法编写 JS 代码，Babel 做编译处理

本节重点介绍使用 Gulp 搭建小程序开发环境。

## Gulp 和 webpack



目前，前端最火的打包工具无疑是 webpack，而 webpack 的产品定位是**模块打包工具**，对于小程序开发，涉及项目资源分类管理，所以 [Gulp (opens new window)](https://gulpjs.com/)、[Grunt (opens new window)](https://gruntjs.com/)、[FIS (opens new window)](http://fis.baidu.com/)这类前端工程构建工具很合适。

Gulp 可以对不同的文件类型、文件夹、文件等多种方式进行不同的处理流程，像小程序项目中多种文件类型需要不同的构建流程，使用 Gulp 的 task 就非常方便管理。

另外 Gulp 的 watch 功能也可以监控源文件，当源码发生变化时，立即执行对应 task，将修改后的代码编译到小程序开发工具监控的目录中；在生态建设上，Gulp 工具链也很完善。小程序开发本来就是本地开发模式，代码必须在小程序开发者工具提供的 Runtime 中才可以跑起来，不涉及服务搭建相关的知识，所以 webpack 的 devserver 也没有用武之地。

综上，本小册采用 Gulp 来搭建小程序开发环境。

## 项目目录结构



首先介绍下项目的目录结构，下面的目录结构是最开始的目录结构，注释中描述了文件夹（或文件）具体是做什么用的。

```text
├── cloud-functions // 云函数文件夹
├── dist            // 构建工具 release 之后的文件夹
├── gulpfile.js     // Gulp 配置文件
├── node_modules
├── package.json    // npm 描述文件
└── src             // 实际开发的源代码文件夹
    ├── app.js      // 入口 js
    ├── app.json    // App 配置
    ├── app.scss    // App 整体样式
    ├── components  // 小程序组件，例如 icon 类这些通用组件
    ├── images      // 小程序静态图片
    ├── lib         // 公共 lib
    ├── pages       // 小程序 page 页面
    │   ├── index.js
    │   ├── index.json
    │   ├── index.scss
    │   ├── index.wxml
    │   └── index.wxs
    └── project.config.json // 小程序项目配置
```

## Gulp 工程化打包方案



针对上面的开发目录，我们要达到的目标是：**将 src 目录下的文件，编译到小程序开发者工具实际运行的 dist 目录下**，先在 `gulpfile.js` 中定义这两个目录的变量：

```text
const src = './src'
const dist = './dist'
```

Gulp 是以 task 为核心的打包工具，针对不同的文件类型（比如通过正则过滤）可以配置不同的流程控制。小程序打包主要解决的是 WXML、WXSS、WXS 以及 JS 的编译，另外针对小程序开发中常见的问题进行工具化处理，例如 px 转 rpx、压缩优化等，下面笔者来一一介绍。

### wxml task

`wxml` 语法实际就是 `html` 的语法，不需要做额外的处理，直接 release 到**目标目录**即可：

```text
gulp.task('wxml', () => {
  return gulp
    .src(`${src}/**/*.wxml`)
    .pipe(gulp.dest(dist))
})
```

### wxss task

为了更好地维护和提供更加灵活的 CSS 开发体验，笔者在项目中使用了 `sass` 作为 wxss 的开发语言，然后通过 Gulp 的 wxss task 将`scss/sass`文件编译成 wxss，在处理样式文件的时候，笔者还解决了两个问题：

- px 转 rpx：使用`postcss-px2rpx`，将`px`按照 2 倍算法转化成 rpx，px 和 rpx 的详细介绍可以参考前面章节的内容
- 将 webfont 转化成 base64 引入：在小程序内，webfont 不允许访问小程序内部地址，所以只能将其转化成 bas64 方式引入

将 `sass/scss` 文件处理完之后，在最后一步，利用 `rename` 工具，将 `.sass/.scss` 改名为 `.wxss`：

```text
const rename = require('gulp-rename')
const postcss = require('gulp-postcss')
const pxtorpx = require('postcss-px2rpx')
const base64 = require('postcss-font-base64')
const combiner = require('stream-combiner2')

gulp.task('wxss', () => {
  const combined = combiner.obj([
    gulp.src(`${src}/**/*.{wxss,scss}`),
    sass().on('error', sass.logError),
    postcss([pxtorpx(), base64()]),
    rename((path) => (path.extname = '.wxss')),
    gulp.dest(dist)
  ])

  combined.on('error', handleError)
})
```

> 可以不使用 CSS 的自动添加浏览器兼容前缀的 `autoprefixer` 插件，而直接用小程序开发者工具的「详情 -> 项目设置 -> 上传代码时样式自动补全」功能。

![img](https://user-gold-cdn.xitu.io/2018/8/13/1653140645f84aaa?w=377&h=361&f=png&s=34728)

### js task

微信的 js 文件使用的是 ES5 语法，为了更好的开发体验，笔者开发中使用了 ES6/7 语法，在 Gulp 编译时引入了 `babel` 插件对 js 进行编译，并且还引入了 `sourcemap` 以方便本地 debug 代码。

```text
gulp.task('js', () => {
  gulp
    .src(`${src}/**/*.js`)
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ['env']
      })
    )
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dist))
})
```

### 其他 task

对于 `json`、`images` 和 `wxs` 类文件，主要采取的方式是按照当前路径复制到**目标目录**，所以它们的 task 配置是：

```text
gulp.task('json', () => {
  return gulp.src(`${src}/**/*.json`).pipe(gulp.dest(dist))
})
gulp.task('images', () => {
  return gulp.src(`${src}/images/**`).pipe(gulp.dest(`${dist}/images`))
})
gulp.task('wxs', () => {
  return gulp.src(`${src}/**/*.wxs`).pipe(gulp.dest(dist))
})
```

### 给每个 task 增加生产发布打包配置

针对开发和生产两种不同的发布环境，可以通过自定义 Gulp 命令参数来区分，这里使用 `--type` 来区分，即：

- --type prod：代表生产发布打包
- 默认：为开发发布打包

在生产发布打包的流程中，增加了对资源的压缩（js、html、json、css）和 [jdists 的代码块预处理 (opens new window)](https://github.com/zswang/jdists)，下面以 js task 为例，解释下怎么配置生产发布的流程（详细解释见注释）：

```text
// 引入需要用到的 npm 包
const sourcemaps = require('gulp-sourcemaps')
const jdists = require('gulp-jdists')
const through = require('through2')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const argv = require('minimist')(process.argv.slice(2))
// 判断 gulp --type prod 命名 type 是否是生产打包
const isProd = argv.type === 'prod'
const src = './client'
const dist = './dist'

gulp.task('js', () => {
  gulp
    .src(`${src}/**/*.js`)
    // 如果是 prod，则触发 jdists 的 prod trigger
    // 否则则为 dev trigger，后面讲解
    .pipe(
      isProd
        ? jdists({
            trigger: 'prod'
          })
        : jdists({
            trigger: 'dev'
          })
    )
    // 如果是 prod，则传入空的流处理方法，不生成 sourcemap
    .pipe(isProd ? through.obj() : sourcemaps.init())
    // 使用 babel 处理js 文件
    .pipe(
      babel({
        presets: ['env']
      })
    )
    // 如果是 prod，则使用 uglify 压缩 js
    .pipe(
      isProd
        ? uglify({
            compress: true
          })
        : through.obj()
    )
    // 如果是 prod，则传入空的流处理方法，不生成 sourcemap
    .pipe(isProd ? through.obj() : sourcemaps.write('./'))
    .pipe(gulp.dest(dist))
})
```

说下 `jdists` 代码块预处理工具，`jdists`是一种通过注释的方式，将不同的代码块根据不同的指令进行处理的工具，详细功能见 [jdists 文档 (opens new window)](https://github.com/zswang/jdists)。

本项目中主要用到了：

1. 根据 `trigger` 触发 `remove` 操作；
2. 根据 `import` 将媒介（资源）嵌入到文件的固定位置。

例如：

```text
/*<remove trigger="prod">*/
import {getMood, geocoder} from '../../lib/api'
import {getWeather, getAir} from '../../lib/api-mock'
/*</remove>*/

/*<jdists trigger="prod">
import {getMood, geocoder, getWeather, getAir} from '../../lib/api'
</jdists>*/
```

上面的代码片段中，`/*<remove trigger="prod">*/.../*</remove>*/` 之间是默认代码，从命名来看，实际 `getWeather` 和 `getAir` 两个方法来自 `api-mock` 这个 js 文件，`api-mock` 是接口的 mock 实现。真实上线的时候，我们希望暴露的是底部 `<jdists trigger="prod">...</jdists>*/` 中间的代码，这样在下面 Gulp 的配置中：

```text
.pipe(
      isProd
        ? jdists({
            trigger: 'prod'
          })
        : jdists({
            trigger: 'dev'
          })
    )
```

当 `isProd` 成立时，则触发 `trigger=prod`，即将顶部代码库移出，底部注释中的代码暴露出来，最终得到的代码如下：

```text
import {getMood, geocoder, getWeather, getAir} from '../../lib/api'
```

而普通打包（dev 开发方式时）则保持原样：

```text
/*<remove trigger="prod">*/
import {getMood, geocoder} from '../../lib/api'
import {getWeather, getAir} from '../../lib/api-mock'
/*</remove>*/

/*<jdists trigger="prod">
import {getMood, geocoder, getWeather, getAir} from '../../lib/api'
</jdists>*/
```

通过上面的讲解，你应该明白了，在 `gulp --type prod` 下，`getWeather` 和 `getAir` 来自 `lib/api` 文件，而在本地开发调试的时候，则来自 `api-mock` 这个 mock 的文件中，至于这俩文件有什么区别，以及 `jdists` 的 `import` 用法，见本小节的「mock server 实现」部分。

### 根据发布环境不同，对 task 进行聚合

上面单个 task 配置完毕，需要添加聚合类的 task 和 watch task，详细配置如下：

```text
gulp.task('watch', () => {
  ;['wxml', 'wxss', 'js', 'json', 'wxs'].forEach((v) => {
    gulp.watch(`${src}/**/*.${v}`, [v])
  })
  gulp.watch(`${src}/images/**`, ['images'])
  gulp.watch(`${src}/**/*.scss`, ['wxss'])
})

gulp.task('clean', () => {
  return del(['./dist/**'])
})

gulp.task('dev', ['clean'], () => {
  runSequence('json', 'images', 'wxml', 'wxss', 'js', 'wxs', 'cloud', 'watch')
})

gulp.task('build', ['clean'], () => {
  runSequence('json', 'images', 'wxml', 'wxss', 'js', 'wxs', 'cloud')
})
```

## mock server 实现



小程序云函数的联调测试是相当麻烦的，每次修改代码，都需要跑到小程序开发者工具的编辑器中，选择云函数文件夹「上传并部署」：

![img](https://user-gold-cdn.xitu.io/2018/8/13/165313fec208c69b?w=442&h=400&f=png&s=67432)

这样的开发效率是十分低的，所以笔者自研了一套云函数本地 mock 的方法，使用 mock server 可以在本地开发的时候直接使用 `wx.request` 方法调用 mock server 的接口，而真正上线的时候（或者发布测试的时候），则使用 `wx.cloud.callFunction` 方式调用。

mock server 的职责：

- 本地开发时，将云函数代理到 localserver，免除每次上传云函数测试效果的低效率研发方式
- 要设计一套方案，将云函数文件单独提取出来，做到 mock server 和上线后代码统一，不做二次开发（修改），降低开发成本
- 把将来放到服务器管理的静态资源（如图片 icon 类等）暂时放到本地托管，方便本地开发使用

基于上面的职责，笔者将小程序项目结构调整如下：

```text
├── README.md
├── client                    // 小程序 client 部分，主要编写内容
│   ├── app.js
│   ├── app.json
│   ├── app.scss
│   ├── project.config.json  // 小程序项目配置，如云函数文件夹
│   ├── components           // 组件
│   ├── images               // 图片资源
│   ├── lib
│   │   ├── api-mock.js      // api-mock 功能，详见文档「云函数 mock」部分
│   │   ├── api.js           // 实际 api
│   │   ├── bluebird.js
│   │   └── util.js
│   └── pages
│       └── index
├── config.server.json
├── dist
├── gulpfile.js
├── package.json
├── server                   // 小程序 server 部分，主要是静态资源和云函数
│   ├── cloud-functions
│   │   ├── test
│   │   └── test2
│   ├── index.js
│   ├── inline               // 云函数公共模块，打包的时候会 inline 进引入的云函数
│   │   └── utils.js
│   └── static
│       └── gulp.png
└── test                     // 测试文件夹
    └── functions            // 存储小程序云函数测试用的参数模板
        └── test.json
```

主要变化如下：

1. 跟前端相关的文件都放入了 client 中，编译后放到 dist 目录中，小程序开发者工具开发目录选择 dist 文件夹
2. 跟 mock server 相关的放入 server 中，server 下文件不做打包处理，即不 release 到 dist 文件下
3. 其中 server/cloud-functions 是云函数文件夹，编译之后放到 dist/cloud-functions 下
4. server/static 文件夹是静态资源文件夹，将来上传到小程序云开发的「文件管理」中维护（小程序云开发 CDN 静态资源服务器）

### 使用 Express 来实现 mock server

笔者使用 [Express (opens new window)](https://www.express.com/)来在本地实现一个 mock server：

```text
const express = require('express')
const {PORT} = require('../config.server.json')
const app = express()

app.listen(PORT, () => {
  console.log(`开发服务器启动成功：http://127.0.0.1:${PORT}`)
})
```

这样就开启了一个端口号为 3000 的本地服务。

#### 实现静态资源服务

下面要做的就是使用 `express.static` 将 `server/static` 目录设置为静态资源服务器：

```text
// 添加static
app.use(
  '/static',
  express.static(path.join(__dirname, 'static'), {
    index: false,
    maxage: '30d'
  })
)
```

静态资源服务器添加好之后，访问 `http://127.0.0.1:3000/static/xxx` 就可以直接访问 `static` 文件夹下的静态资源了。

#### 实现云函数服务

为了满足「云函数文件线上和 mock server 使用一份，不二次开发」的需求，我们直接按照云函数的写法写代码即可，比如 `cloud-functions/test/` 模块：

```text
exports.main = async (event) => {
  let {a, b} = event
  return new Promise((resolve, reject) => {
    resolve({result: parseInt(a) + parseInt(b)})
  })
}
```

在 `server/index.js` 中引入对应的模块，然后分配一个路由即可：

```text
const test = require('./cloud-functions/test/').main

app.get('/api/test', (req, res, next) => {
  // 将 req.query 传入
  test(req.query).then(res.json.bind(res)).catch((e) => {
    console.error(e)
    next(e)
  })
  // next()
})
```

上面代码中，将 `req.query` 传入 `test.main`，构造一个云函数的 `event` 参数，用于获取云函数的参数，最后通过 `Promise` 的 `then` 传递给 `res.json` 输出。

写完上面代码，再访问 `http://127.0.0.1:3000/api/test?a=1&b=2` 就会输出：

![img](https://user-gold-cdn.xitu.io/2018/8/13/165313f947bd3ad9?w=350&h=105&f=png&s=12377)

#### 使用 nodemon 对 server 进行自动重启

在云函数开发中，当文件改动了，需要重启 Node.js 服务，如果每次都手动操作就太消耗时间和精力了，所以引入了 [nodemon (opens new window)](https://github.com/remy/nodemon)对 server 目录下文件进行监控，发现文件修改，则重启 Node.js 服务。nodemon 的重启命令放在 `package.json` 中维护：

```text
// 启动
"scripts": {
  "server": "nodemon ./server/index.js"
},
// nodemon 配置
"nodemonConfig": {
  "ignore": ["test/*", "book/*", "client/*", "bin/*", "node_modules", "dist/*", "package.json"],
  "delay": "1000"
},
```

效果如下图所示。

![img](https://user-gold-cdn.xitu.io/2018/8/13/165313f69b72a696?w=372&h=182&f=png&s=42545)

## 前端对云函数的调用



mock server 中的云函数实现了一套代码在本地和线上都可以跑通，但是 `client` 中页面引用云函数使用 `wx.cloud.callFunction` 却不能实现一套代码通用，为解决这个问题，笔者通过 `jdists` 的 `remove` 和 `trigger` 方式来实现差异化管理，即

1. 将云函数调用等 API 接口请求调用方法，统一放入 `client/lib/api.js` 中实现，`api.js` 中使用 `wx.cloud.callFunction` 方法
2. 将云函数相关的再用 `wx.request` 方法实现一下，请求本地 `127.0.0.1:3000/api/` 接口，代码在 `api-mock.js` 中实现
3. `api.js` 和 `api-mock.js` 输入的参数和输出的结果是一致的，而内部实现是不同的
4. 使用某个云函数时，通过上文提到的 `jdists` 的 `remove` 和 `trigger` 分别引入

继续拿 `test` 这个云函数做说明，`api.js` 中直接使用：

```text
export const test = (a, b) => {
  return wx.cloud.callFunction({
    name: 'test',
    data: {
      a, b
    }
  })
}
```

然后在 `api-mock.js` 中实现一次：

```text
// 因为小程序的 callfunction 是 Promisify 的，所以这里需要用 Promise 处理一下
// 小程序中不支持 Promise，所以引入了 bluebird 这个库
import Promise from './bluebird'
export const test = (a,b) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'http://127.0.0.1:3000/api/test',
      {a,b},
      success: (res) => {
        resolve({result: res.data})
      },
      fail: (e) => {
        reject(e)
      }
    })
  })
}
```

## 小结



本节主要讲解了 Gulp 构建小程序开发脚手架，从 Gulp 的配置说起，介绍了 WXML、Sass、ES6/7 编写小程序前端代码，然后针对云函数开发测试体验不好的问题，介绍了使用 Express 实现本地 mock server 的方式，将云函数和静态资源文件在本地服务器统一管理，实现「一套代码，多处执行」的效果。

关于上面小程序开发用到的环境搭建代码，笔者从天气小程序项目中整理了出来，作为一个小程序开发脚手架放到了 [GitHub (opens new window)](https://github.com/ksky521/gulp-wxapp-boilerplate)上，方便读者快速创建自己的小程序开发环境。



# 实战篇2：新鲜天气小程序简洁

实战部分选择制作一款天气+心情签到的小程序，命名为「新鲜天气」，目前该程序已经完成上线，大家可以通过扫描下面的二维码进行线上体验：

![img](https://user-gold-cdn.xitu.io/2018/8/13/1653143759c8753f?w=430&h=430&f=jpeg&s=81641)

在实战选题上，笔者尽量做到基础并且覆盖足够多的 API 和功能，让大家可以学到更多的内容。所谓基础，并不是「简单」，而是大家自己线下方便练习和实现的意思，「新鲜天气」数据都是来自腾讯地图、和风天气这些免费的 API，任何人都可以免费使用；小程序·云开发初级配置是免费的，能够满足我们小型小程序的计算、存储和数据库功能。学完本小册，大家就可以按照小册的内容实际操作一下。另外，整个「新鲜天气」的源码笔者也放到了 GitHub 上，方便大家下载和学习：

> [ksky521/fresh-weather(opens new window)](https://github.com/ksky521/fresh-weather)

## 新鲜天气页面组成



新鲜天气小程序由天气预报页面和心情签到页面组成：

- 天气预报页面：主要是天气数据的展现，定位接口使用腾讯地图，天气数据来自和风天气 API，其中顶部实时天气温度用的是**体感温度**
- 心情签到页面：使用云开发数据库存储心情，每日可签到一次，不同心情不同颜色

### 天气预报页面模块和技术栈

![img](https://user-gold-cdn.xitu.io/2018/8/17/16546a3ee7298692?w=750&h=2338&f=png&s=1238212)

天气预报页面由实时天气预报、24 小时天气预报、一周天气预报和生活指数共四大模块组成，这四大模块各有各的特点：

- 实时天气预报：这块页面元素较多，页面复杂度高，其中顶部定位模块有事件绑定，右侧签到入口有「心情签到」页面入口；除此之外，在雨雪天气整个区域还会有雨雪动效，动效是使用小程序的绘图 API 实现的粒子系统
- 24小时天气：这个区域主要使用了小程序的 `scrollView` 模块和 flex 布局
- 一周天气预报：该区域主要是 flex 布局和 Chart.js 图表的使用
- 生活指数：该区域每个指数都绑定了 tap 事件，详细的生活指数内容是经过事件传值给浮层的
- 整个页面背景图片笔者抓取了 UC 天气背景图，可以根据不同天气更换图片
- 整个项目中用到的图标，都是由 `components` 下面的 `icon` 组件实现的

在天气预报这个页面，笔者重点介绍：

1. 小程序布局常用组件 view、text、scrollView、image、canvas 等 UI 组件的使用
2. 学会使用 `wx.request` 模块获取数据
3. 学会使用小程序绘图 API 实现雨雪效果的粒子系统
4. 小程序的事件绑定和处理
5. 定位 API 和选择位置组件的调用，还会讲解不同坐标系之间的区别
6. 如何实现一个 icon 的小程序组件
7. 在小程序内使用 `chartjs` 做报表展现
8. 深入体会和理解 wxs、rpx 等概念
9. 使用小程序云函数实现和风天气 API 的数据获取

### 心情签到页面模块和技术栈

![img](https://user-gold-cdn.xitu.io/2018/8/17/165469fa731ce96e?w=375&h=447&f=png&s=36443)

心情签到是一个可以记录自己心情起伏的小工具，它有助于我们找到心情起伏的原因。整个心情签到页面实战部分主要包含的内容有：

1. 小程序插件的使用
2. 授权登录，获取用户信息等跟用户相关 API 的使用
3. 云开发的数据库操作
4. 使用小程序云函数获取用户 `openid`

## 项目目录结构



整个项目目录结构如下：

```text
├── README.md
├── bin
│   ├── city.json
│   ├── getbg.js
│   ├── getbgimg.js
│   ├── geticon.js
├── client
│   ├── app.js
│   ├── app.json
│   ├── app.scss
│   ├── components
│   ├── config.js
│   ├── images
│   ├── lib
│   ├── pages
│   └── project.config.json
├── server
│   ├── cloud-functions
│   ├── index.js
│   ├── inline
│   ├── logs
│   ├── package-lock.json
│   └── static
├── dist
├── node_modules
├── config.server.json
├── gulpfile.js
├── package.json
├── tcb.json
└── test
    └── functions
```

- server：小程序云开发环境的 mock server 和云函数的 `cloud-functions`
- client：小程序前端主要代码；在 client 中会有小程序的配置和工具配置等文件
- gulpfile.js： 是 Gulp 的脚本
- test：是云函数测试脚本文件夹
- dist：是项目产出的文件夹，会把 client 和 server 的`cloud-functions`编译进去，也是小程序开发者工具选择的项目路径
- bin：是工具脚本，比如抓取图片相关的脚本等

### 配置

因为天气页面是没有顶部导航栏的，这样整个页面更加开阔，视觉效果更好，所以小程序的 `app.json` 中我们定义了导航条样式是自定义：

```text
"window": {
  "navigationStyle": "custom"
},
```

小程序云开发的云函数放在 `server/cloud-functions` 内，经过打包工具 Gulp 处理之后，会放到 `dist/cloud-functions` 内，所以 `project.config.json` 中的云函数配置如下：

```text
{
  "cloudfunctionRoot": "./cloud-functions/"
}
```

### 项目启动

首先 git clone 出项目到自己本地电脑：

```text
git clone https://github.com/ksky521/fresh-weather.git
```

然后进入项目路径，安装项目依赖：

```text
npm i
```

再依次进入云函数的目录，安装依赖：

```text
# 依次进入目录
cd server/cloud-functions/he-weather
npm i
```

#### 修改开发者信息

为了保护笔者个人的开发者信息，防止敏感信息泄露，所提供的 GitHub 代码是没有个人开发者信息的，大家 clone 下代码后需要按照以下步骤修改为自己的开发者账号：

1. 修改小程序云开发的开发环境：`client/lib/api.js` 中

```text
wx.cloud.init({
  env: '填写自己的开发者账号中的环境id'
})
```

1. 修改腾讯地图的开发者账号：`client/lib/api.js` 中的 `QQ_MAP_KEY`，登录[腾讯地图开发者控制台 (opens new window)](https://lbs.qq.com/console/user_info.html)获取
2. 修改和风天气 API 的开发者账号 `server/inline/utils` 中的 `KEY` 和 `USER_ID`，登录[和风天气控制台 (opens new window)](https://console.heweather.com/)获取
3. 小程序授权信息 `server/inline/utils` 中的 `WECHAT_APPID` 和 `WECHAT_APP_SECRET`，登录小程序管理后台获取

#### 项目二次开发

开发的时候，需要监听文件的变化，于是启动本地 mock server

```text
# mock server 启动
npm run server
# 启动 cloud functions 云函数文件夹同步
npm run cloud
# 编译项目，并且启动 gulp watch 功能
npm run dev
```

现在，用小程序开发者工具打开项目的 dist 文件夹即可。

![img](https://user-gold-cdn.xitu.io/2018/8/17/16546afc2a2af34e?w=1499&h=1047&f=jpeg&s=175383)

这里可能会遇到几个小问题，按以下方式解决：

1. 如果提示插件并未授权，请参考后续心情签到页面的插件使用部分内容
2. 如果提示域名不合法，可以先在开发者工具右上角「详情」的「项目设置」tab 勾选：不校验合法域名选项
3. 一定要按照上一小节内容，修改配置各种开发者账号
4. 在云开发控制台创建`diary`的数据库，参考[实战篇 6：心情签到页面开发(opens new window)](https://juejin.im/book/5b70f101e51d456669381803/section/5b70f7de6fb9a00992507524)

#### 项目打包上线

执行 `build` 命令：

```text
npm run build
```

然后 dist 文件夹下就是构建之后可以上线的全部代码，打开小程序开发者工具：

1. 上传并且部署云函数
2. 上传小程序代码，登录小程序管理后台，提交审核

## 小结



本节主要介绍实战项目「新鲜天气」，新鲜天气由两个页面组成：天气预报和心情签到。两个页面的技术栈和练习到的 API 不同，可以更加广泛地带领大家练习微信小程序的开发，具体代码笔者已经放到了 [GitHub (opens new window)](https://github.com/ksky521/fresh-weather)上。除了介绍项目之外，本节还介绍了项目的目录结构与配置，以及 GitHub 项目如何在本地运行和发布。



# 实战篇3：天气页面样式布局开发

## 先写一个 icon 组件



「新鲜天气」项目中，用到的 icon 比较多，比如天气图标、心情签到的表情，都是来自 icon 组件，本小节介绍下如何自定义个 icon 组件。

我们项目的自定义组件放在 client/components 目录下，首先在其目录下创建 icon 目录，创建组件的页面、样式和 JS 文件：

```text
client/components
└── icon
    ├── index.js
    ├── index.json
    ├── index.scss
    ├── index.wxml
    └── weather.ttf
```

组件需要在自己的页面配置文件（page.json，即 index.json）中声明自己是一个组件：

```text
// index.json
{
  "component": true
}
```

### 编写组件代码

icon 组件的 WXML 部分代码很简单：

```text
<!--index.wxml-->
<text class="icon icon-{{ type }}"></text>
```

笔者定义了一个 icon 的类型字段，该字段由使用方传入，所以对应 JS 的写法为：

```text
// index.js
Component({
  properties: {
    type: {
      type: String,
      value: ''
    }
  }
});
```

JS 中使用了 `Component` 构造器，调用 `Component` 构造器时可以指定组件的属性、数据、方法等。上面代码中定义了组件可以接受的 `properties` 有 `type`，`type` 是一个字符串类型的值，默认值是空字符串。

跟所有的 icon 样式写法一样，笔者通过图标共有的 class `icon` 定义了统一的样式，包括字体、大小等：

```text
/* index.scss */
@font-face {
  font-family: "weather";
  src: url("./weather.ttf") format("truetype");
}

.icon {
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: .4rpx;
  -moz-osx-font-smoothing: grayscale;
}

.icon::after,
.icon::before {
  font-family: weather !important;
}
```

然后通过 `.icon-` 定义了不同的图标对应 class 的 content：

```text
/* index.scss */
.icon.icon-xiaolian:before {
  content: "\e60f";
}

.icon.icon-shidu:before {
  content: "\e610";
}

.icon.icon-zhongyu:before {
  content: "\e611";
}
```

### 字体文件的引用问题

在小程序内，不支持使用 webfont 的 `@font-face` 引入本地的 ttf 等文件，这时候需要使用线上地址或者 `base64`。

在新鲜天气的开发中，笔者使用了 Gulp 直接将 webfont 转换成 `base64` 引入，这样写代码的时候就不需要关注这些事情了，具体做法为：

```text
const rename = require('gulp-rename')
const postcss = require('gulp-postcss')
const pxtorpx = require('postcss-px2rpx')
const base64 = require('postcss-font-base64')
const combiner = require('stream-combiner2')

gulp.task('wxss', () => {
  const combined = combiner.obj([
    gulp.src(`${src}/**/*.{wxss,scss}`),
    sass().on('error', sass.logError),
    postcss([pxtorpx(), base64()]),
    rename((path) => (path.extname = '.wxss')),
    gulp.dest(dist)
  ])

  combined.on('error', handleError)
})
```

> 除了字体以外，图片类静态资源的引入可以使用本地资源相对路径、`base64` 和线上地址，如果是线上地址，则必须是以 `https` 开头的协议。

### 在项目中使用自定义组件

在需要使用自定义组件的页面配置文件 `page.json` 中添加 `usingComponents` 字段：

```text
"usingComponents": {
  "icon": "../../components/icon/index"
}
```

其中，`icon` 就是我们自定义的标签名称，后面的值则是相对于页面文件、icon 组件对应的路径。

这样引入后，在页面中就可以直接通过 icon 标签来使用自定义的 icon 组件了：

```text
<!--定位icon-->
<icon type="dingwei" />
<!--天气icon-->
<icon type="{{ today.icon }}" class="logo"></icon>
```

也可以使用 CSS（WXSS）来控制它的样式：

```text
icon {
  float: right;
  font-size: 44rpx;
  height: 44rpx;
  width: 44rpx;
}
```

> **如何编辑字体**：icon 组件使用的字体是来自 [iconfont.cn (opens new window)](http://iconfont.cn/)，然后在[百度的字体编辑器 (opens new window)](http://fontstore.baidu.com/store)中进行编辑。

## 天气预报页面



天气预报是小程序的第一个页面，首先在 `app.json` 中的 `pages` 处添加入口：

```text
"pages": ["pages/weather/index"]
```

> 如果有多个页面，当前开发的页面可以放到 `pages` 数组的最前面，这样小程序的默认页面就是当前开发的页面，方便实时开发和查看效果。

添加完入口之后，在 `client/pages` 目录下创建 `weather` 文件夹，目录结构如下：

```text
pages
└── weather
    ├── index.js
    ├── index.json
    ├── index.scss
    ├── index.wxml
    └── index.wxs
```

因为我们要使用上文完成的 icon 组件，所以在 `index.json` 中添加 `usingComponents` 字段，天气页面还支持下拉刷新，于是最终版本的 `index.json` 配置如下：

```text
//index.json
{
  "enablePullDownRefresh": true,
  "usingComponents": {
    "icon": "../../components/icon/index"
  }
}
```

## 页面整体框架



首先我们来完成页面的整体框架 WXML 代码，页面整体包裹在 `.wrapper` 中，页面使用 `.container` 来区分不同的页面模块，模块之间通过 `.container` 的 `margin-bottom` 属性隔开。

```text
<!--weather/index.wxml-->
<view class="wrapper" style="background: url({{backgroundImage}}) center -178rpx / 100% no-repeat {{backgroundColor}};">

  <view class="container" id="canvas-wrapper">
    <view class="now">
      <!--当前实时天气和空气质量-->
    </view>
    <view class="two-days">
      <!--今明两天天气-->
    </view>
  </view>
  <view class="weather" style="background-color: {{backgroundColor}}">
    <view class="container">
      <!--24 小时天气-->
    </view>
    <view class="container">
      <view class="week">
        <!--七天天气-->
      </view>
    </view>
    <view class="container">
      <view class="life-style">
         <!--生活指数-->
      </view>
    </view>
  </view>
</view>
// weather/index.scss
// 定义 container 间隔
$grid-margin: 20rpx;
.container {
  margin-bottom: $grid-margin;
  max-width: 750rpx;
  box-sizing: border-box;
  color: #fff;
}
```

`.wrapper` 的背景图片和 `.weather` 的背景色都是根据天气情况更换的，需要根据天气数据赋值，这里笔者设置了默认值：

```text
Page({
  data: {
    // 页面数据
    backgroundImage: '../../images/cloud.jpg',
    backgroundColor: '#62aadc'
    ...
```

## 实时天气部分页面布局



天气页面的「实时天气」部分页面布局相对复杂，最终效果如图所示。

![img](https://user-gold-cdn.xitu.io/2018/8/13/1653144072e21bbe?w=746&h=778&f=jpeg&s=109939)

首先是当前天气部分页面结构：

```text
<!--weather/index.wxml-->
<view class="now">
  <view class="location" bindtap="chooseLocation">
    <icon type="dingwei" />
    <text>{{ address }}</text>
  </view>
  <view class="air-quality" wx:if="{{air.aqi}}">
    <text class="circle" style="background: {{ air.color }}"></text>
    <text class="value">{{ air.name }} {{ air.aqi }}</text>
  </view>
  <view class="now-weather">
    <view class="temp">
      <text>{{ current.temp }}</text>
      <text class="degree">°</text>
    </view>
    <view class="cur-weather">
      <view class="inline">
        <icon type="{{ current.icon }}"></icon>
        <text>{{ current.weather }}</text>
      </view>
      <view class="inline today">
        <text class="item">{{ utils.humidity(current.humidity) }}</text>
        <text class="item">{{ utils.wind(current.wind, current.windLevel) }}</text>
      </view>
    </view>
    <view class="tips" wx:if="{{tips}}">
      <text>{{tips}}</text>
    </view>
  </view>
</view>
```

上面页面需要的 `AppData` 示例数据为：

```text
"air": {
  "status": 0,
  "aqi": "77",
  "color": "#00cf9a",
  "name": "良"
},
"current": {
  "backgroundImage": "https://tianqi-1d3bf9.tcb.qcloud.la/bg/day/overcast.jpg",
  "backgroundColor": "#5c7a93",
  "temp": "35",
  "wind": "南风",
  "windLevel": "1",
  "weather": "阴",
  "humidity": "73",
  "icon": "yin",
  "ts": "2018-08-12 14:54"
},
```

上面的 WXML 中，笔者还使用了 `utils` 的两个方法。`utils`的方法来自于`index.wxs`，要使用`index.wxs`需要在页面的顶部引入它：

```text
<wxs src="./index.wxs" module="utils"></wxs>
```

WXS 相对 JS 来说语法更加受限，但是因为 WXML 的「双括号」数据绑定中对表达式的支持不够完善，我们在小程序开发中，可以使用 WXS 来增强 WXML 的表达式，其中 `humidity` 和 `wind` 的 WXS 代码如下：

```text
// weather/index.wxs
module.exports = {
  // 湿度处理
  humidity: function(h) {
    if (h) {
      return '湿度 ' + h + '%'
    }
    return h
  },
  // 根据风的 code 和风力输出文案
  wind: function(code, level) {
    if (!code) {
      return '无风'
    }
    if (level) {
      level = level.toString().split('-')
      level = level[level.length - 1]
      return code + ' ' + level + '级'
    }
    return code
  }
}
```

实时天气模块中，今明两天的 WXML 结构如下：

```text
<!--weather/index.wxml-->
<!--今明两天天气数据-->
<view class="two-days">
  <view class="item">
    <view class="top">
      <text class="date">今天</text>
      <text class="temp">{{ today.temp }}</text>
    </view>
    <view class="bottom">
      <text>{{ today.weather }}</text>
      <icon type="{{ today.icon }}" class="logo"></icon>
    </view>
  </view>
  <view class="item">
    <view class="top">
      <text class="date">明天</text>
      <text class="temp">{{ tomorrow.temp }}</text>
    </view>
    <view class="bottom">
      <text>{{ tomorrow.weather }}</text>
      <icon type="{{ tomorrow.icon }}" class="logo"></icon>
    </view>
  </view>
</view>
```

由此可见，需要的 `AppData` 示例数据结构是：

```text
"today": {
  "temp": "24/30°",
  "icon": "leizhenyu",
  "weather": "雷阵雨"
},
"tomorrow": {
  "temp": "24/30°",
  "icon": "leizhenyu",
  "weather": "雷阵雨"
},
```

需要说明的是，在今明两天天气布局中，笔者使用了 flex 布局，flex 布局使得小程序的页面布局更灵活，结构更明晰：

```text
// weather/index.scss
@mixin flex-row {
  display: flex;
  flex-direction: row;
}
.today {
  @include flex-row;
  .item {
    display: block;
    flex: 1;
    padding-right: 16rpx;
    margin: 0 16rpx 0 0;
    border-right: 2rpx solid rgba(255, 255, 255, .4);
  }
}
```

### 屏幕适配：自定义导航样式

为了UI效果，笔者使用了自定义导航条样式，即在`app.json`中增加配置：

```text
"window": {
  "navigationStyle": "custom"
},
```

经过上面配置，就没有导航条了，整个界面直接是天气预报页面的背景图，现在遇见了小程序的屏幕适配问题，笔者界面设计是定位地址文案部分跟小程序的胶囊操作区域对齐，如下图所示：

![img](https://user-gold-cdn.xitu.io/2018/8/18/16548a38d0affb97?w=376&h=396&f=jpeg&s=32583)

但是如果只是简单的使用 rpx，在 iPhone 6 的视觉稿（具体原因见[基础篇 1：小程序开发基础知识 (opens new window)](https://juejin.im/book/5b70f101e51d456669381803/section/5b70f117518825612a2277ea)）标准下实现：

```text
<!--pages/weather/index.wxml-->
<view class="container" id="canvas-wrapper" style="padding-top: 64rpx">
```

上面直接使用 rpx 来布局，由于不同手机的屏幕尺寸不同，实际产生的效果是：

![img](https://user-gold-cdn.xitu.io/2018/8/18/16548a3baaab5093?w=376&h=340&f=png&s=65502)

要做好屏幕适配，需要用到 rpx 的基础知识和`wx.getSystemInfo()`方法。

我们通过学习基础知识了解，rpx 是按照屏幕宽度来定义的，**不管屏幕多宽，屏幕宽度始终定义为 750rpx**，宽度不同，则 1rpx 实际宽度不同，如果用这个不确定的 rpx 来对高度做统一是实现不了的，所以我们固定使用`padding-top: 64rpx`实际根据不同屏幕它是高度不一致的。手机都有状态栏（`statusBar`），状态栏高度也是不同手机不同的尺寸，所以，最终在不同的手机会出现上面图片的效果。

要解决这个屏幕适配问题，即确定一个固定的 `padding-top` 值，需要将状态栏高度和 rpx 的实际对应 px 值进行统一计算。

首先，在页面结构中，使用 ``来表示 `padding-top` 值。

```text
<!--pages/weather/index.wxml-->
<view class="container" id="canvas-wrapper" style="padding-top: {{paddingTop}}px">
```

这个值是计算之后的 `px` 值，所以单位是 `px`！这个值在 iPhone 6 手机中是`32px`（iPhone 6 屏幕宽度为375px，所以`750rpx = 375px`）。下面我们需要获取系统的状态栏高度（statusBarHeight），可以使用`wx.getSystemInfo()`或者它的同步方法`wx.getSystemInfoSync()` 获取：

```text
//pages/weather/index.js
wx.getSystemInfo({
  success: (res) => {
    // 状态栏高度和屏幕宽度，单位都是px
    console.log(res.statusBarHeight, res.windowWidth)
  }
})
```

经过获取状态栏高度发现，iPhone 6 手机的状态栏高度为`20px`，所以计算出差值为`12px`（`32px - 20px`）。下面我们只需要将状态栏高度获取之后，加上`12px`即可。所以最终`paddingTop`计算代码是：

```text
//pages/weather/index.js
wx.getSystemInfo({
  success: (res) => {
    // 状态栏高度和屏幕宽度
    // console.log(res.statusBarHeight, res.windowWidth)
    // console.log(scale * res.statusBarHeight*2+24)
    this.setData({
      paddingTop: res.statusBarHeight+12
    })
  }
})
```

> **Tips**：rpx 并不是「万能油」，根据实际情况也可以使用 px 来解决实际问题。

## WXML 的循环：24小时、一周天气和生活指数



天气数据中，24 小时和一周天气都是由数组组成：

```text
// 24小时天气数据
"hourlyData": [
  {
    "temp": "29",
    "time": "16:00",
    "weather": "雷阵雨",
    "icon": "leizhenyu"
  }
  // ...
],
// 一周天气数据
"weeklyData": [
  {
    "day": "雷阵雨",
    "dayIcon": "leizhenyu",
    "dayWind": "南风",
    "dayWindLevel": "1-2",
    "maxTemp": "30",
    "minTemp": "24",
    "night": "中雨",
    "nightIcon": "zhenyuye",
    "nightWind": "南风",
    "nightWindLevel": "1-2",
    "time": 1534032000000
  }
  // ...
],
// 生活指数
"lifeStyle": [
  {
    "name": "舒适度", // 指数名称
    "icon": "guominzhishu", // 指数对应的icon图标type
    "info": "较不舒适", // 指数数值
    // 指数的详情
    "detail": "白天虽然有雨，但仍无法削弱较高气温带来的暑意，同时降雨造成湿度加大会您感到有些闷热，不很舒适。"
  }
  // ...
]
```

对于这些数组结构，我们在写页面的时候可以使用 WXML 的循环语句 `wx:for` 来输出 WXML：

```text
<!--weather/index.wxml-->
<!--24小时天气-->
<scroll-view scroll-x class="hourly">
  <view class="scrollX">
    <view class="item" wx:for="{{hourlyData}}">
      <text class="time">{{ item.time }}</text>
      <icon type="{{item.icon}}" class="icon"></icon>
      <text class="temp">{{item.temp}}°</text>
    </view>
  </view>
</scroll-view>
<!--一周天气数据-->
<view class="week">
  <view class="week-weather">
    <view class="item" wx:for="{{weeklyData}}">
      <view class="day">{{ utils.formatWeeklyDate(index) }}</view>
      <view class="date">{{ utils.formatDate(item.time) }}</view>
      <view class="daytime">
        <view class="wt">{{item.day}}</view>
        <icon type="{{item.dayIcon}}" class="img"></icon>
      </view>
      <view class="night">
        <icon type="{{item.nightIcon}}" class="img"></icon>
        <view class="wt">{{item.night}}</view>
      </view>
      <view class="wind">{{ utils.wind(item.nightWind) }}</view>
      <view class="wind" wx:if="{{item.nightWind}}">{{ utils.windLevel(item.nightWindLevel) }}</view>
      <view class="wind" wx:else></view>
    </view>
  </view>
<!--生活指数-->
<view class="life-style">
    <view class="item" wx:for="{{lifeStyle}}" data-name="{{item.name}}" data-detail="{{item.detail}}" bindtap="indexDetail">
      <view class="title">
        <icon type="{{item.icon}}"></icon>
        {{item.name}}
      </view>
      <view class="content">{{item.info}}</view>
    </view>
</view>
```

这里需要特别说下「24小时天气」和「生活指数」。对于「24小时天气」，笔者使用了 `scroll-view` 组件 + flex 布局，根据数组数据的长度（和风天气免费 API 只能获取间隔 3 个小时共 8 个小时天气）来计算 `scroll-view` 的整体宽度，然后按照等比例划分：

```text
// weather/index.scss
@mixin flex-column {
  display: flex;
  flex-direction: column;
}
// hourly
.hourly {
  .scrollX {
    position: relative;
    // 总长度，116*8
    width: 928rpx;
    padding: 40rpx 0;
    height: 150rpx;
  }
  .item {
    @include flex-column;
    width: 116rpx;
  }
}
```

「生活指数」布局是上下两行：

![img](https://user-gold-cdn.xitu.io/2018/8/13/1653144f363340ba?w=367&h=190&f=jpeg&s=16851)

flex 布局中使用横向（flex-row）布局，要达到 `4x2` 的布局效果，需要将子项设置为`25%`宽度，并且设置父容器 `flex-wrap: wrap`：

```text
// weather/index.scss
.life-style {
  @include flex-row;
  flex-wrap: wrap;

  .item {
    text-align: center;
    width: 25%;
    height: 188rpx;
    border-right: 2rpx solid rgba(255, 255, 255, .1);
    border-bottom: 2rpx solid rgba(255, 255, 255, .1);
    box-sizing: border-box;
    padding: 50rpx 0 0;
  }
}
```

## 小结



本节主要从整体上介绍了「新鲜天气」天气预报页面的布局实现，用到了 WXS 来增强 WXML 的数据绑定表达式，使用了多种 flex 布局效果，对于数组型数据，使用了 WXML 中的循环语句 `wx:for` 来实现。



# 实战篇4：天气页面数据获取和交互实现

天气预报页面主要有两个重要的流程：获取地理位置和获取天气数据。本节重点介绍这两部分的代码实现。

## 定位和逆地址查询

获取地理位置功能可以拆成两个步骤：

1. 使用微信 `wx.getLocation` 方法获取用户当前位置的经纬度
2. 使用拿到的经纬度请求腾讯地图的逆地址解析接口，获取省市县和详细地址

下面来逐一介绍。

### 获取用户当前位置经纬度

小程序可以使用 `wx.getLocation` 方法获取用户的当前位置经纬度。`wx.getLocation` 默认获取的是 `wgs84` 坐标系，即 GPS 的坐标系，而国内地图（除百度地图外）一般用的都是 `GCJ02`（国测局坐标，又称为“火星坐标系”）的坐标系，所以需要传入 `type` 来指定坐标系统。

```text
wx.getLocation({
  type: 'gcj02',
  success: this.updateLocation,
  fail: (e) => {
    // console.log(e)
    this.openLocation()
  }
})
```

> **Tips：** 出于国家安全考虑，国内使用的坐标系都是经过国测局统一加密偏移后的坐标，所以我们拿到的坐标并不是真正的坐标，国测局统一加密后的坐标系就是 GCJ02。国测局规定：国内地图产品需要用 GCJ02 的坐标系，或者在 GCJ02 基础上再次加密的坐标系，百度自有的 BD09 坐标系就是在 GCJ02 基础上再次加密的坐标系。
>
> GPS 定位拿到的是 WGS84 坐标系，直接在国内地图上使用或者调用国内地图的位置 API 服务都会计算有偏移。因为我们实战中用的逆地址解码服务是腾讯地图服务，腾讯地图的坐标系是 GCJ02，所以 `wx.getLocation` 的参数 `type` 应该是 `gcj02`，而不是默认的 `wgs84`。如果调用 `wx.getLocation` 不传入 `type` 则获取的 `wgs84` 坐标会有偏移。同理，使用 `wx.openLocation` 也要注意坐标系问题。

### 根据经纬度获取当前地址

`wx.getLocation` 方法返回有当前用户的经纬度，具体返回的数据有：

参数

说明

latitude

纬度，浮点数，范围为 -90~90，负数表示南纬

longitude

经度，浮点数，范围为 -180~180，负数表示西经

speed

速度，浮点数，单位 m/s

accuracy

位置的精确度

altitude

高度，单位 m

verticalAccuracy

垂直精度，单位 m（Android 无法获取，返回 0）

horizontalAccuracy

水平精度，单位 m

经纬度信息要转化成具体的地理位置，需要使用地图的逆地址查询接口，笔者在这里使用了[腾讯地图的 API (opens new window)](https://lbs.qq.com/)。

首先在腾讯地图开放平台注册账号，注册后登录，在「我的控制台 -> 密钥(key)管理」中可以添加密钥。密钥是我们使用 API 必须传递的一个参数，每个不同的应用对应不同的密钥。

![img](https://user-gold-cdn.xitu.io/2018/8/13/16531467d1217a52?w=1228&h=389&f=png&s=63687)

在小程序内，腾讯地图 API 的调用方式主要有两种：

- 通过腾讯地图提供的小程序 SDK
- WebService API 方式，即直接调用 API 的接口

这里笔者选择了 WebService API，原因如下：

1. 小程序 SDK 和 WebService API 都很方便，不需要加密数据，密钥都是对外暴露的
2. WebService API 使用微信 `wx.request` 方法可以直接发送请求，对代码无侵入性
3. 小程序 SDK 本质上还是用 `wx.request` 封装的 WebService API

根据[逆地址查询接口的文档 (opens new window)](https://lbs.qq.com/webservice_v1/guide-gcoder.html)，只需要传入密钥和 `location` （经纬度组合）信息即可：

```text
// lib/api.js
const QQ_MAP_KEY = 'ZVXBZ-xxxxxx-xxxxx-xxxxxK-LQFU6'
/**
 *  逆地址查询
 * @param {*} lat
 * @param {*} lon
 */
export const geocoder = (lat, lon, success = () => {}, fail = () => {}) => {
  return wx.request({
    url: 'https://apis.map.qq.com/ws/geocoder/v1/',
    data: {
      location: `${lat},${lon}`,
      key: QQ_MAP_KEY,
      get_poi: 0
    },
    success,
    fail
  })
}
```

### 完整获取地址的流程

完成了上面的获取经纬度和逆地址查询，就可以在 `index.js` 中进行整个地址获取的流程了，代码从 `onLoad` 调用 `this.getLocation` 开始，全部代码如下：

```text
// weather/index.js
onLoad(){
  this.getLocation()
},
// 处理逆地址
getAddress(lat, lon, name) {
  wx.showLoading({
    title: '定位中',
    mask: true
  })
  let fail = (e) => {
    // console.log(e)
    this.setData({
      address: name || '北京市海淀区西二旗北路'
    })
    wx.hideLoading()

    this.getWeatherData()
  }
  geocoder(
    lat,
    lon,
    (res) => {
      wx.hideLoading()
      let result = (res.data || {}).result
      // console.log(1, res, result)

      if (res.statusCode === 200 && result && result.address) {
        let {address, formatted_addresses, address_component} = result
        if (formatted_addresses && (formatted_addresses.recommend || formatted_addresses.rough)) {
          address = formatted_addresses.recommend || formatted_addresses.rough
        }
        let {province, city, district: county} = address_component
        this.setData({
          province,
          county,
          city,
          address: name || address
        })
        this.getWeatherData()
      } else {
        //失败
        fail()
      }
    },
    fail
  )
},
// 更新 data 数据，调用 getAddress
updateLocation(res) {
  let {latitude: lat, longitude: lon, name} = res
  let data = {
    lat,
    lon
  }
  if (name) {
    data.address = name
  }
  this.setData(data)
  this.getAddress(lat, lon, name)
},
getLocation() {
  // 获取经纬度
  wx.getLocation({
    type: 'gcj02',
    success: this.updateLocation,
    fail: (e) => {
      // console.log(e)
      this.openLocation()
    }
  })
},
// 检测到失败，则提示用户打开位置权限
openLocation() {
  wx.showToast({
    title: '检测到您未授权使用位置权限，请先开启哦',
    icon: 'none',
    duration: 3000
  })
},
```

### 点击地址栏事件处理

在天气预报的顶部地址栏部分绑定了 tap 事件，点击地址栏则会打开地图让用户重新选择位置，这可以通过小程序提供的 `wx.chooseLocation` 方法来实现。

![img](https://user-gold-cdn.xitu.io/2018/8/13/16531464c98c99c8?w=564&h=582&f=png&s=311084)

```text
<view class="location" bindtap="chooseLocation">
  <icon type="dingwei" />
  <text>{{ address }}</text>
</view>
```

事件 `chooseLocation` 的代码如下：

```text
chooseLocation() {
  wx.chooseLocation({
    success: (res) => {
      let {latitude, longitude} = res
      let {lat, lon} = this.data
      if (latitude == lat && lon == longitude) {
        this.getWeatherData()
      } else {
        this.updateLocation(res)
      }
    }
  })
}
```

## 和风天气数据获取

和风天气接口是提供三种调用方式的，不过对于 Web 端产品来说，只有普通 KEY 请求和签名请求两种方式，具体可以查看[天气 API 接口说明 (opens new window)](https://www.heweather.com/documents/api/s6)。

基于以下两点考虑，本小册中的天气服务采用了签名的认证方式：

1. 为了提高安全性
2. 练习云函数的使用方法

具体签名的算法可以参考[加密签名认证 (opens new window)](https://www.heweather.com/documents/api/s6/sercet-authorization)，这个不是我们介绍的重点，笔者先把签名算法代码贴上：

```text
const crypto = require('crypto')
const KEY = 'e8dd4902xxxxxxxxxxxxxxcb4df'
const USER_ID = 'HE11212121212121299'
function generateSignature(params) {
  params.username = USER_ID
  let data =
    Object.keys(params)
      .filter((key) => {
        return params[key] !== '' && key !== 'sign' && key !== 'key'
      })
      .sort()
      .map((key) => {
        return `${key}=${params[key]}`
      })
      .join('&') + KEY
  return crypto.createHash('md5').update(data).digest('base64')
}
```

有了认证的算法，就可以在云函数中发送数据请求。以获取[天气集合接口 (opens new window)](https://www.heweather.com/documents/api/s6/weather)为例，介绍下云函数的使用方法，获取空气质量相对简单且类似，具体代码中有详细注释：

```text
// server/cloud-functions/he-weather
// 请求的地址
const API_URL = 'https://free-api.heweather.com/s6/weather'
// request 模块
const request = require('request')

// 引入云函数功能工具方法，跟空气质量公用
// gulp prod 打包的时候将公共 utils 库嵌入式引入
/*<jdists import="../../inline/utils.js" />*/

// 普通 mock server 的代码直接将 utils 库当模块引入
/*<remove>*/
const $ = require('../../inline/utils')
/*</remove>*/

// 按照云函数的规定，必须导出 main 函数
exports.main = async (event) => {
  const {lat,lon} = event
  let location = `${lat},${lon}`
  let params = {
    location,
    t: Math.floor(Date.now() / 1e3),
    unit: 'm'
  }
  // 生成签名
  params.sign = $.generateSignature(params)
  let query = []
  for (let i in params) {
    query.push(`${i}=${encodeURIComponent(params[i])}`)
  }
  let url = API_URL + '?' + query.join('&')
  // 将 request.get 方法改造成 promise 方式
  return new Promise((resolve, reject) => {
    request.get(url, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        reject(error)
      } else {
        try {
          // 统一处理接口返回的数据
          let rs = $.handlerData(JSON.parse(body))
          resolve(rs)
        } catch (e) {
          reject(e)
        }
      }
    })
  })
}
```

完成获取天气集合数据，天气预报页面还用到了空气质量相关的接口，这个免费接口使用的参数不是经纬度而是城市名称，具体获取数据的代码跟天气数据接口类似，这里直接贴出代码：

```text
// server/cloud-functions/he-air
// const path = require('path')
const API_URL = 'https://free-api.heweather.com/s6/air/now'
const request = require('request')
/*<jdists import="../../inline/utils.js" />*/

/*<remove>*/
const $ = require('../../inline/utils')
/*</remove>*/

exports.main = async (event) => {
  let location = event.city
  let params = {
    location,
    t: Math.floor(Date.now() / 1e3),
    unit: 'm'
  }
  // 生成签名
  params.sign = $.generateSignature(params)
  let query = []
  for (let i in params) {
    query.push(`${i}=${encodeURIComponent(params[i])}`)
  }
  let url = API_URL + '?' + query.join('&')
  // console.log(url)
  return new Promise((resolve, reject) => {
    // console.log(url)
    request.get(url, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        reject(error)
      } else {
        try {
          let data = JSON.parse(body)
          // console.log(data)
          if (data && data.HeWeather6 && data.HeWeather6[0].air_now_city) {
            let {aqi, qlty} = data.HeWeather6[0].air_now_city
            resolve({
              status: 0,
              aqi,
              color: $.airBackgroundColor(aqi),
              name: qlty
            })
          } else {
            resolve({
              status: 500
            })
          }
          // resolve(rs)
        } catch (e) {
          reject(e)
        }
      }
    })
  })
}
```

## 天气预报页面流程图

![img](https://user-gold-cdn.xitu.io/2018/8/26/165761b0072f320f?w=1024&h=768&f=jpeg&s=232588)

## 下拉刷新

天气预报页面是支持下拉刷新的，在页面配置中 `index.json` 已经将 `enablePullDownRefresh` 设置为 `true`，我们还需要在 `index.js` 中增加下拉事件监听，监听下拉刷新操作，然后重新获取定位和天气数据，最后更新页面：

```text
// weather/index.js
onPullDownRefresh() {
  this.getWeatherData(() => {
    wx.stopPullDownRefresh()
  })
}
```

## 配置分享文案

为了提升我们小程序的分享体验，笔者设计了分享文案，通过监听 `onShareAppMessage` 事件，用户分享小程序的时候增加当前定位和天气相关的文案，`onShareAppMessage` 只需要返回一个分享文案和路径的对象即可：

```text
// weather/index.js
onShareAppMessage() {
  // 如果获取数据失败，则没有位置和天气信息，那么需要个默认文案
  if (!isUpdate) {
    return {
      title: '我发现一个好玩的天气小程序，分享给你看看！',
      path: '/pages/weather/index'
    }
  } else {
    // 如果有天气信息，那么需要给 path 加上天气信息
    const {lat, lon, address, province, city, county} = this.data
    let url = `/pages/weather/index?lat=${lat}&lon=${lon}&address=${address}&province=${province}&city=${city}&county=${county}`

    return {
      title: `「${address}」现在天气情况，快打开看看吧！`,
      path: url
    }
  }
},
```

![img](https://user-gold-cdn.xitu.io/2018/8/13/1653145b62466222?w=418&h=507&f=jpeg&s=44324)

最终的效果如上图所示，分享出去的小程序链接是带着当前天气的数据的，但是这时候如果有人打开了链接，那么还是根据自己的定位信息查看天气，不能看到分享人的位置和天气信息，所以还需要在 `onLoad` 中，获取页面的 URL 参数，然后使用分享的地理位置直接获取天气数据，对应的代码如下：

```text
// weather/index.js
onLoad() {
  // ......
  const pages = getCurrentPages() //获取加载的页面
  const currentPage = pages[pages.length - 1] //获取当前页面的对象
  const query = currentPage.options
  // 如果有地址，经纬度信息
  if (query && query.address && query.lat && query.lon) {
    let {province, city, county, address, lat, lon} = query
    // 取出这些数据，设置页面data
    // 利用setData的callback，保证数据设置完成后，获取天气信息
    this.setData(
      {
        city,
        province,
        county,
        address,
        lat,
        lon
      },
      () => {
        this.getWeatherData()
      }
    )
  } else {
    // 否则，正常逻辑：先获取地址，再获取天气数据
    this.getLocation()
  }
},
```

> **Tips：** 在获取分享的 URL 数据之后通过 `setData` 设置地理位置信息，不应该直接在 `setData` 之后获取天气信息，而应该在 `setData` 的回调函数中调用 `getWeatherData` 获取天气数据，这是因为 `setData` 是异步的，可以参考[基础篇 3：小程序架构及其实现机制 (opens new window)](https://juejin.im/book/5b70f101e51d456669381803/section/5b70f3456fb9a00986735fa3)的相关介绍。

## 使用 Chart.js 绘制图表

笔者在七天天气模块使用了 Chart.js 来绘制一个温度走势图。Chart.js 是个 Canvas 版本的图表库，有人将其改造成了[小程序版本 (opens new window)](https://github.com/xiabingwu/chartjs-wechat-mini-app/)。由于本实战中的温度走势图相对比较简单，所以 Chart.js 可以胜任需求，先看下效果图。

![img](https://user-gold-cdn.xitu.io/2018/8/13/16531458e395024e?w=369&h=120&f=jpeg&s=13050)

首先在 `<view class="week"/>` 最后增加走势图图表的 `canvas` 组件：

```text
<view class="week">
  <view class="week-weather">
    ....
  </view>
  <view class="week-chart">
    <canvas canvas-id="chart" id="chart"></canvas>
  </view>
</view>
```

通过绝对定位的方式，将 `week-chart` 放置在对应的位置，并且设置 `canvas` 的宽度和高度：

```text
.week-chart {
  position: absolute;
  left: 0;
  right: 0;
  height: 272rpx;
  top: 262rpx;
}
.week-chart canvas {
  width: 750rpx;
  height: 272rpx;
}
```

绘制走势图使用 Chart.js 是使用了折线图（line）方式，而温度数值的标注，是给 `Chart` 注册了个 `afterDatasetsDraw` 钩子（hook）内，将数据遍历一遍之后，直接绘制将温度写上，具体代码如下：

```text
// weather/index.js
import {fixChart, getChartConfig, drawEffect} from '../../lib/utils'
import Chart from '../../lib/chartjs/chart'
// Page 中定义的 drawChart 函数
drawChart() {
  const {width, scale, weeklyData} = this.data
  let height = CHART_CANVAS_HEIGHT * scale
  let ctx = wx.createCanvasContext('chart')
  fixChart(ctx, width, height)

  // 添加温度
  Chart.pluginService.register({
    afterDatasetsDraw(e, t) {
      ctx.setTextAlign('center')
      ctx.setTextBaseline('middle')
      ctx.setFontSize(16)

      e.data.datasets.forEach((t, a) => {
        let r = e.getDatasetMeta(a)
        r.hidden ||
          r.data.forEach((e, r) => {
            // 昨天的数据发灰
            ctx.setFillStyle(r === 0 ? '#e0e0e0' : '#ffffff')
            // 增加温度符号
            let i = t.data[r].toString() + '\xb0'
            let o = e.tooltipPosition()
            // 计算文字位置
            0 == a ? ctx.fillText(i, o.x + 2, o.y - 8 - 10) : 1 == a && ctx.fillText(i, o.x + 2, o.y + 8 + 10)
          })
      })
    }
  })

  return new Chart(ctx, getChartConfig(weeklyData))
}
```

## 小结

本节介绍了天气页面数据获取和交互的实现，重点讲解了地理位置获取和天气数据获取，地理位置使用 `wx.request` 请求腾讯地图 API，天气数据则使用云函数来获取数据。小节的最后介绍了下拉刷新和配置分享文案的实现。



# 实战篇5：为天气页面制作雨雪效果的粒子系统

经过前两节的内容，基本天气预报页面的布局和数据交互都已经完成了，本节来介绍使用小程序的绘图 API 在「实时天气」模块上做一个雨雪效果。

![img](https://user-gold-cdn.xitu.io/2018/8/13/165314726eeabb28?w=640&h=960&f=gif&s=2606064)

## 小程序的绘图 API

小程序的绘图 API 跟 HTML5 的 Canvas 本质上有很大区别的，造成用法区别的原因是：

> 小程序的绘图（Canvas）是客户端实现的 Native UI 组件，而不是普通的 H5 组件，所以在使用上跟普通的 H5 组件用法略有不同。

> **Tips：** 微信的 Canvas 在 iOS 上是 [Ejecta (opens new window)](https://github.com/phoboslab/Ejecta)实现的。

### 上下文获取方式不同

小程序绘图 API 的 `canvasContext` 获取方式是通过 `<canvas>` 的 `canvas-id` 来获取的，即

```text
<canvas canvas-id="test"></canvas>
```

获取 Context：

```text
let ctx = wx.createCanvasContext('test')
```

### API 写法不同

小程序的绘图 API 跟 HTML5 的 Canvas 在用法上主要是绝大部分的 HTML5 Canvas 属性写法，变成了小程序的方法写法，例如：

```text
const ctx = wx.createCanvasContext('myCanvas')
ctx.setFillStyle('red')
ctx.fillRect(10, 10, 150, 75)
ctx.draw()
```

不过值得一提的是，在 1.9.0 基础库以上，类似 `fillStyle`、`lineWidth` 这类的，可以直接跟 H5 的写法一样，不需要使用 `setXxxx` 的方式了。

### 想要显示绘制效果，需要 `ctx.draw()` 使用

在小程序的绘图使用中，对 `context` 进行绘制之后，并不会立即绘制到画布上，而是通过执行 `ctx.draw()` 的方式，将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。`ctx.draw()` 方法比较消耗性能，因此不建议在一个绘制周期内多次调用。

> **Tips：** 小程序绘图中的内部尺寸单位都是 px，例如 `clearRect()` 这类方法，所以在使用 `rpx` 布局的页面中，需要注意 Canvas 内部 rpx 到 px 的转换关系，详细解释见本节粒子系统实现部分。

## 粒子系统设计思路

在 Canvas 开发中，经常会提到粒子系统，使用粒子系统可以模拟出火、雾、云、雪、尘埃、烟气等抽象视觉效果。

在这个小程序中，笔者使用粒子系统做了雨雪效果，通过雨雪效果的编写，可以让读者学会粒子系统的基础知识，以及在小程序中使用绘图 API 相关的接口。

本小册中的粒子系统由基类和子类组成。`Particle` 是基类，定义了子类统一的方法，如 `run()`、`stop()`、`clear()` 等。基类负责整个粒子系统动画周期和流程的维护，子类负责具体实现的粒子效果，比如下雨下雪的效果是子类实现的，而下雨下雪的开关和公共处理流程是基类控制的。

基类由如下几个方法组成：

- `_init()`：实例化时第一执行的方法；空，由子类具体实现
- `_draw()`：每个动效周期内画图用的方法；空，由子类具体实现
- `run`：设置定时器，定时执行 `_draw()`，实现动画周期
- `stop`：停止动画
- `clear`：停止动画，并且清空画板

这些方法之间的关系是：

![img](https://user-gold-cdn.xitu.io/2018/8/13/16531478f272863c?w=803&h=558&f=png&s=64293)

上面的关系图很清晰地展现了整个粒子系统的设计思路：

1. 在构造器内调用 `_init`，随机生成单个粒子，放进数组对象
2. 在执行实例 `run` 的时候，设置定时器，定时器回调调用 `_draw` 绘制粒子，设置单个粒子下一步的属性
3. 而 `_init` 和 `_draw` 是子类具体根据效果实现的

根据这个关系图，基类就很简单实现了：

```text
// lib/effect.js
// 两个状态
const STATUS_STOP = 'stop'
const STATUS_RUNNING = 'running'
class Particle {
  constructor(ctx, width, height, opts) {
    this._timer = null
    this._options = opts || {}
    // canvas 上下文
    this.ctx = ctx
    this.status = STATUS_STOP
    this.w = width
    this.h = height

    this._init()
  }
  _init() {}
  _draw() {}
  run() {
    if (this.status !== STATUS_RUNNING) {
      // 更改状态
      this.status = STATUS_RUNNING
      // 绘制循环
      this._timer = setInterval(() => {
        this._draw()
      }, 30)
    }
    return this
  }
  stop() {
    // 清理定时器，状态修改
    this.status = STATUS_STOP
    clearInterval(this._timer)
    return this
  }
  clear(){
    this.stop()
    this.ctx.clearRect(0, 0, this.w, this.h)
    this.ctx.draw()
    return this
  }
}
```

## 下雨效果的粒子系统

根据上面的内容，具体的子类只需要在 `_init` 中，根据需要生成的粒子个数 `amount` 循环随机生成每个粒子，放入 `this.particles` 数组即可：

```text
// lib/effect.js
// _init

let h = this.h
let w = this.w
// 数量，根据不同雨大小，数量可调
let amount = this._options.amount || 100
// 速度参数，调节下落速度
let speedFactor = this._options.speedFactor || 0.03
let speed = speedFactor * h
let ps = (this.particles = [])
for (let i = 0; i < amount; i++) {
  let p = {
    x: Math.random() * w,
    y: Math.random() * h,
    l: 2 * Math.random(),
    xs: -1,
    ys: 10 * Math.random() + speed,
    color: 'rgba(255, 255, 255, 0.1)'
  }
  ps.push(p)
}
```

其中：

- x、y 代表单个粒子的位置，即雨滴开始绘图的位置
- xs、ys 分别代表 x、y 方向上的加速度，即雨滴的下落速度和角度
- l 代表雨滴的长度

`_draw`的方法，是先将画布清空，然后遍历 `this.particles` 数组取出单个雨滴并进行绘制，最后调用一个单独实现的 `_update` 重新计算单个雨滴的位置：

```text
// lib/effect.js
// _draw
let ps = this.particles
let ctx = this.ctx
// 清空画布
ctx.clearRect(0, 0, this.w, this.h)
// 遍历绘制雨滴
for (let i = 0; i < ps.length; i++) {
  let s = ps[i]
  ctx.beginPath()
  ctx.moveTo(s.x, s.y)
  // 画线绘制雨点效果
  ctx.lineTo(s.x + s.l * s.xs, s.y + s.l * s.ys)
  ctx.setStrokeStyle(s.color)
  ctx.stroke()
}
ctx.draw()
return this._update()
```

`_update` 的具体实现如下：

```text
// lib/effect.js

// _update
let {w, h} = this // 获取画布大小
for (let ps = this.particles, i = 0; i < ps.length; i++) {
  // 开始下一个周期的位置计算
  let s = ps[i]
  s.x += s.xs
  s.y += s.ys
  // 超出范围，重新回收，重复利用
  if (s.x > w || s.y > h) {
    s.x = Math.random() * w
    s.y = -10
  }
}
```

## 下雪效果子类实现

下雪的效果跟下雨不同的是，下雨是长条的线，雪花是圆形的雪片，另外为了增加「灵性」做出飘来飘去的效果，在 `_update` 方法中，使用了 `Math.cos` 来随机生成下一步 `x` 轴的位置，这里就直接贴出代码来：

```text
// lib/effect.js
class Snow extends Particle {
  _init() {
    let {w, h} = this
    let colors = this._options._colors || ['#ccc', '#eee', '#fff', '#ddd']
    // 雪的大小用数量来计算
    let amount = this._options.amount || 100

    let speedFactor = this._options.speedFactor || 0.03
    // 速度
    let speed = speedFactor * h * 0.15

    let radius = this._options.radius || 2
    let ps = (this.particles = [])

    for (let i = 0; i < amount; i++) {
      let x = Math.random() * w
      let y = Math.random() * h
      // console.log(x, y)
      ps.push({
        x,
        y,
        // 原始 x 坐标，后面计算随机雪摆动是以此为基础
        ox: x,
        // 向下运动动能变量
        ys: Math.random() + speed,
        // 雪的半径大小
        r: Math.floor(Math.random() * (radius + 0.5) + 0.5),
        // 颜色随机取
        color: colors[Math.floor(Math.random() * colors.length)],
        rs: Math.random() * 80
      })
    }
  }
  _draw() {
    let ps = this.particles
    let ctx = this.ctx
    ctx.clearRect(0, 0, this.w, this.h)
    for (let i = 0; i < ps.length; i++) {
      let {x, y, r, color} = ps[i]
      ctx.beginPath()
      // 绘制下雪的效果
      ctx.arc(x, y, r, 0, Math.PI * 2, false)
      ctx.setFillStyle(color)
      ctx.fill()
      ctx.closePath()
    }

    ctx.draw()
    this._update()
  }
  _update() {
    let {w, h} = this
    let v = this._options.speedFactor / 10
    for (let ps = this.particles, i = 0; i < ps.length; i++) {
      let p = ps[i]
      let {ox, ys} = p
      p.rs += v
      // 这里使用了 cos，做成随机左右摆动的效果
      p.x = ox + Math.cos(p.rs) * w / 2
      p.y += ys
      // console.log(ys)
      // 重复利用
      if (p.x > w || p.y > h) {
        p.x = Math.random() * w
        p.y = -10
      }
    }
  }
}
```

注意，不管是下雨还是下雪，在 `_draw` 的最开始都是执行 `ctx.clearRect` 清空画布，最后都是执行 `ctx.draw` 使 native 对画布进行统一绘制。

## 使用粒子系统

上面介绍了雨雪的粒子系统 JS 类实现，下面讲解怎样将 Canvas 效果画到网页上，首先看下效果图。

![img](https://user-gold-cdn.xitu.io/2018/8/17/165469d660043a27?w=400&h=718&f=png&s=257746)

效果图的黄色框内为下雨的效果，这个红色框大小跟顶部「实时天气模块」是等大的。首先，在 WXML 代码中，给实时天气模块增加 `id` 为 `effect` 的 Canvas 组件：

```text
<!-- weather/index.wxml -->
<view class="container" id="canvas-wrapper">
  <!-- 下面是雨雪效果的 Canvas -->
  <canvas canvas-id="effect" id="effect"></canvas>
  <view class="now">
    <view class="location" bindtap="chooseLocation">
      ...
    </view>
    <view class="air-quality" wx:if="{{air.aqi}}">
      ...
    </view>
    <view class="now-weather">
      ...
    </view>
  </view>
  <view class="two-days">
    ....
  </view>
</view>
```

在样式中，设置 Canvas 的大小跟实时天气模块大小一样，并且绝对定位，完全覆盖到实时天气模块上：

```text
// weather/index.scss
#effect {
  width: 750rpx;
  height: 768rpx;
  position: absolute;
  top: 0;
  right: 0;
}
```

**重点**：在微信小程序内，绘图 API（Canvas）内的长宽单位为 px，而我们页面布局用的是 rpx，虽然我们在 CSS 内已经使用 rpx 设置了 Canvas 的大小，但是由于内部单位的缘故，在实例化 Rain/Snow 粒子系统的时候，传入的 `width` 和 `height` 参数应该是实际的 px 大小。

根据之前章节的介绍，rpx 转 px 是根据不同的设备屏幕尺寸转换的。虽然切图可以按照 `1rpx=2px` 这样标准的 iPhone 6 视觉稿做页面，但是涉及实际 px 计算时，不能简单采用 `1rpx=2px` 的方式来解决，需要我们按照实际的 rpx 对应 px 的比例进行转换。如何获取 rpx 和 px 的实际比例呢？我们知道微信小程序中默认规定了屏幕宽度为 750rpx，根据这个设计，我们可以通过 `wx.getSystemInfo` 获取到的信息，找到手机屏幕的宽度大小 `windowWidth` 即可算出对应的比例，代码如下：

```text
// weather/index.js
// 在 onload 内
wx.getSystemInfo({
  success: (res) => {
    let width = res.windowWidth
    this.setData({
      width,
      scale: width / 375
    })
  }
})
```

这样，上面的 `width`就是屏幕的实际 **px 宽度**，而每个元素的实际 **px 高度**则由 `元素 rpx 高度 / 2 * scale` 得到。

最后，我们在页面代码中，实际使用 `Rain/Snow` 类时的代码是下面这样的：

```text
// weather/index.js
// 下面是 canvas 的 canvas-id
const canvasId = 'effect'
const ctx = wx.createCanvasContext(canvasId)
let {width, scale} = this.data
// 768 为 CSS 中设置的 rpx 值
let height = 768 / 2 * scale
let rain = new Rain(ctx, width, height, {
  amount: 100,
  speedFactor: 0.03
})
// 跑起来
rain.run()
// 如果切换了城市，不在下雨/雪，则执行
rain.clear()
```

## 小结

本节介绍使用小程序绘图 API（Canvas）绘制雨雪效果的粒子系统，给整个天气页面添加动效。

在使用粒子系统中应该注意小程序绘图 API 的写法跟 HTML5 中 Canvas API 的差异。除了 API 的差异，还要在绘图结束后调用 `ctx.draw()` 使绘制执行。最后介绍了怎样在 rpx 的布局中绘制不定宽高的效果，需要根据屏幕的宽度跟 rpx 的实际比例计算出元素的实际 px 宽高，然后给 Canvas 使用。



# 实战篇6：心情签到页面开发

「新鲜天气」的心情签到页面结构比较简单，本小节主要介绍三部分内容：

- 使用日历插件
- 用户授权和登录流程
- 使用小程序云开发的数据库功能

## 使用日历插件

心情签到页面最重要的模块就是日历，日历使用了一个[开源的日历插件 (opens new window)](https://github.com/czcaiwj/calendar)，在小程序内使用插件需要经过下面三步。

#### 1. 在小程序管理后台添加三方服务插件

登录小程序管理后台，依次进入「设置 -> 第三方服务」搜索日历插件的 AppID（wx92c68dae5a8bb046）就可以搜索到「极点日历」，这时候申请授权即可。

![img](https://user-gold-cdn.xitu.io/2018/8/13/1653148e5a1554e6?w=555&h=444&f=jpeg&s=15786)

#### 2. 在 app.json 中增加插件配置

第二步是在项目的 app.json 中增加 `plugins` 字段内容：

```text
"plugins": {
    "calendar": {
        "version": "1.1.3",
        "provider": "wx92c68dae5a8bb046"
    }
}
```

#### 3. 在 diary 页面增加组件配置

在 pages/diary/index.json 的页面配置中的 `usingComponents` 里增加 `calendar` 的插件地址：

```text
{
  "usingComponents": {
    "calendar": "plugin://calendar/calendar",
    "icon": "../../components/icon/index"
  }
}
```

经过上面三步之后，我们就可以在页面中使用 `<calendar />` 标签了。具体日历的用法，可以参考它的 [wiki 主页 (opens new window)](https://github.com/czcaiwj/calendar/wiki)。

### 设置日历的心情颜色

在心情设置上，笔者设计了 5 种心情，由 5 种颜色来表示，具体数值如下：

```text
// client/pages/diary/index.js Page data
emotions: ['serene', 'hehe', 'ecstatic', 'sad', 'terrified'],
colors: {
  serene: '#64d9fe',
  hehe: '#d3fc1e',
  ecstatic: '#f7dc0e',
  sad: '#ec238a',
  terrified: '#ee1aea'
}
```

签到不同的心情，最终在日历上会展现出下面的效果：

![img](https://user-gold-cdn.xitu.io/2018/8/17/165469e5ba884ab6?w=345&h=271&f=jpeg&s=22788)

要在某天设置该天的背景颜色，需要使用日历的 `days-color` 属性，这里笔者将 `days-color` 与 `daysStyle` 进行绑定：

```text
<!--diary/index.wxml-->
<calendar days-color="{{daysStyle}}" />
```

`daysStyle` 的计算和赋值是在 `setCalendarColor` 方法内的：

```text
// diary/index.js
setCalendarColor(year, month) {
  year = year || new Date().getFullYear()
  month = month || new Date().getMonth() + 1
  // 从数据库读取数据
  getEmotionByOpenidAndDate(this.data.openid, year, month)
    .then((r) => {
      const data = r.data || []
      const styles = []
      const now = new Date()
      const today = dateFormat(now)
      let todayEmotion = ''
      let colors = this.data.colors
      // 遍历日期，存在表情的日期则设置对应的颜色
      data.forEach((v) => {
        let ts = v.tsModified
        let date = new Date(ts)
        let day = date.getDate()
        if (today === dateFormat(date)) {
          todayEmotion = v.emotion || ''
        }
        styles.push({
          month: 'current',
          day,
          color: 'black',
          background: colors[v.emotion]
        })
      })
      // 设置 daysStyle
      this.setData({
        lastMonth: `${year}-${('00' + month).slice(-2)}`,
        showPublish: true,
        todayEmotion,
        daysStyle: styles
      })
    })
    .catch((e) => {
      wx.showToast({
        title: '加载已签数据失败，请稍后再试',
        icon: 'none',
        duration: 3000
      })
    })
}
```

### 日历事件绑定

当日历切换月份的时候，我们应该获取当前切换到的月份，获取当前月份的心情数据，所以在 `calendar` 上绑定 `dateChange` 事件：

```text
<!--diary/index.wxml-->
<calendar binddateChange="dateChange" />
// diary/index.js page
dateChange(e) {
  // console.log(e)
  let {currentYear, currentMonth} = e.detail
  this.setData({
    daysStyle: []
  })
  this.setCalendarColor(currentYear, currentMonth)
}
```

## 小程序用户登录和授权流程

在心情签到的功能开发中，需要得到用户信息，获取用户信息需要用户账号授权才可以。用户账号授权是小程序开发中经常碰见的技术点，本节重点介绍下小程序的登录授权机制。

小程序开发文档中有一张很完整的流程图（见下图），笔者会围绕这张图来介绍用户授权流程，然后结合云函数来实现一个获取用户授权信息的功能。

![img](https://user-gold-cdn.xitu.io/2018/8/13/16531493dbf89301?w=710&h=720&f=jpeg&s=61617)

从这张图来看，整个数据通信过程包含了小程序、开发者服务器（云函数）和微信接口服务，这三方是都参与其中的，整个流程跟公众号和第三方登录授权流程都基本类似。

整个授权流程可分为下面五个步骤。

#### 1. `wx.login` 获取临时登录凭证 code

「小程序」内调用 `wx.login` 方法，如果用户是第一次授权或者授权过期，则会弹出授权窗口，提示用户个人信息会被授权给第三方服务使用。这时候如果用户同意授权，则会拿到**临时登录凭证 code**，这个临时登录凭证有效期只有 **5 分钟**。我们拿到这个临时登录凭证需要调用「开发者服务器（云函数）」的接口，将临时凭证发送给服务器，然后「开发者服务器」调用「微信接口服务」的 `jscode2session` 接口获取 `openid` 和 `session_key`。

```text
wx.login({
  success: () => {
    if (res.code) {
        // example: 081LXytJ1xxxxcdfxxx1FWxdfdsfXyth
        // 将 code 发送给开发者服务器
    }
  }
})
```

#### 2. 获取 `openid` 和 `session_key`

微信内，同一用户在任意小程序、公众号或者服务号中，都会有一个不同的唯一标识 `openid`，所以可以认为，我们在应用中获取的用户 `openid` 是唯一的，并且该用户在另外一个应用中的 `openid` 跟其他应用的是不同的。

`session_key` 是微信服务派发给我们的一个用户登录有效性的凭证，通过它我们可以间接维护用户微信的登录态。

获取 `openid` 和 `session_key` 需要调用微信的接口：
`https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code`

这个接口的参数为：

参数

必填

说明

appid

是

小程序唯一标识

secret

是

小程序的 app secret

js_code

是

登录时获取的 code

grant_type

是

填写为 authorization_code

其中 `appid` 和 `secret` 可以在小程序管理后台找到，具体路径为「设置 -> 开发设置 -> 开发者 ID」。`appid` 直接可见，而 `secret` 需要点击「生成」链接，并用开发者账号的微信扫码才能生成，生成之后需自行保存。

`secret` 是授权中保证安全性的一个重要 ID，不能外泄，因此必须放在开发者自己的服务器上使用，不能直接放到前端页面调用微信服务接口，因为如果这样的话 `secret` 就暴露了，这也是整个授权过程需要小程序、开发者服务器、微信服务三方都介入的原因。如果忘记或泄露了 `secret`，需要在微信后台重置。

![img](https://user-gold-cdn.xitu.io/2018/8/13/1653149778229d90?w=1298&h=447&f=png&s=39517)

`js_code` 就是第一步中我们通过 `wx.login` 获取到的临时授权凭证 code。有了`appid`、`secret`和`js_code`，我们可以写一个云函数来请求微信的 `jscode2session` 接口：

```text
// 云函数名称：jscode2session
const API_URL = 'https://api.weixin.qq.com/sns/jscode2session'
const request = require('request')
const querystring = require('querystring')
/*<jdists import="../../inline/utils.js" />*/

/*<remove>*/
const $ = require('../../inline/utils')
/*</remove>*/

exports.main = async (event) => {
  let {code} = event
  // 这里微信的 id 和 secret 从配置文件中获取
  let {id, sk} = $.getWechatAppConfig()
  const data = {
    appid: id,
    secret: sk,
    js_code: code,
    grant_type: 'authorization_code'
  }
  let url = API_URL + '?' + querystring.stringify(data)
  return new Promise((resolve, reject) => {
    request.get(url, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        reject(error)
      } else {
        try {
          const r = JSON.parse(body)
          resolve(r)
        } catch (e) {
          reject(e)
        }
      }
    })
  })
}
```

有了 `jscode2session` 这个云函数，我们就可以在小程序中调用云函数，将 `wx.login` 获取的 code 作为参数传递过去：

```text
wx.login({
  success: (res) => {
    if(res.code){
      wx.cloud.callFunctions({
        name: 'jscode2session',
        data: {
          code: res.code
        }
      }).then(res => {
        let {openid = '', session_key = ''} = res.result || {}
        console.log(openid, session_key)
        wx.setStorage({
              key: 'openid',
              data: openid
            })
      })
    }
})
```

关于获取到的 `session_key`，我们还需要注意以下两点。

1. `session_key` 和 `wx.login` 获取的 code 是一一对应的，同一 code 只能换取一次 `session_key`。每次调用 `wx.login`，都会下发一个新的 code 和对应的 `session_key`，为了保证用户体验和登录态的有效性，开发者需要清楚用户需要重新登录时才去调用 `wx.login`。
2. `session_key` 是有时效性的，即便是不调用 `wx.login`，`session_key` 也会过期，过期时间跟用户使用小程序的频率成正相关，但具体的时间长短开发者和用户都是获取不到的。

由于 `session_key` 具有实效性，因而我们可以将 `session_key` 存入本地缓存，每次进入小程序的时候判断下 `session_key` 是否过期即可：

```text
wx.setStorage({
  key: 'session_key',
  data: session_key
})
```

#### 3. 获取用户昵称等信息

获取用户信息需要用到 `open-type="getUserInfo"` 的 `button` 组件，具体做法是：

```text
<button open-type="getUserInfo" bindgetuserinfo="getUserInfo">使用该功能需要授权登录</button>
```

上面的代码定义了一个 `getUserInfo` 类型的按钮，如果授权成功，则调用页面的 `getUserInfo` 方法（通过 `bindgetuserinfo` 绑定的）。`getUserInfo` 代码如下：

```text
getUserInfo(){
  wx.getUserInfo({
    success: (res) => {
      let rs = res.userInfo
      this.setData({
        nickname: rs.nickName,
        avatarUrl: rs.avatarUrl
      })
    }
  })
}
```

获取到的用户信息，包括以下几部分：

参数

类型

说明

userInfo

OBJECT

用户信息对象，不包含 openid 等敏感信息

rawData

String

不包括敏感信息的原始数据字符串，用于计算签名

signature

String

使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息

encryptedData

String

包括敏感数据在内的完整用户信息的加密数据

iv

String

加密算法的初始向量

除了实战中使用的包含用户昵称和头像的 `userInfo` 外，还有敏感信息的 `encryptedData` 字段，如果需要使用该字段，则需要按照[加密数据解密算法 (opens new window)](https://developers.weixin.qq.com/miniprogram/dev/api/signature.html#加密数据解密算法)的文档来解密。

#### 4. 解密敏感数据

尽管心情签到功能并没有涉及敏感信息的解密，这里笔者还是简单介绍下如何解密敏感数据。

解密敏感信息需要用到小程序的 AppID 和 `session_key`，在开发者文档中有提供 Node.js 版本的解密 demo，下面来简单实现个云函数：

```text
const crypto = require('crypto');
/*<jdists import="../../inline/utils.js" />*/

/*<remove>*/
const $ = require('../../inline/utils')
/*</remove>*/

function WXBizDataCrypt(appId, sessionKey) {
  this.appId = appId;
  this.sessionKey = sessionKey;
}

WXBizDataCrypt.prototype.decryptData = function (encryptedData, iv) {
  // base64 decode
  const sessionKey = new Buffer(this.sessionKey, 'base64');
  encryptedData = new Buffer(encryptedData, 'base64');
  iv = new Buffer(iv, 'base64');
  let decoded;
  try {
    // 解密
    const decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv);
    // 设置自动 padding 为 true，删除填充补位
    decipher.setAutoPadding(true);
    decoded = decipher.update(encryptedData, 'binary', 'utf8');
    decoded += decipher.final('utf8');
    decoded = JSON.parse(decoded);
  } catch (err) {
    throw new Error('Illegal Buffer');
  }
  if (decoded.watermark.appid !== this.appId) {
    throw new Error('Illegal Buffer');
  }
  return decoded;
};

exports.main = async (event) => {
  let {iv, data, session_key} = event
  // 这里微信的 id 和 secret 从配置文件中获取
  let appId = $.getWechatAppConfig().id
  return new Promise((resolve, reject) => {
    const pc = new WXBizDataCrypt(appId, session_key)
    resolve(pc.decryptData(data, iv))
  })
}
```

#### 5. 检测 `session_key` 是否失效

前面提到 `session_key` 需要存入本地缓存，但是存在可能失效的情况，小程序提供的 `wx.checkSession` 方法可以检测当前的 `session_key` 是否失效，如果失效则重新调用 `wx.login` 登录授权流程。

`wx.checkSession` 方法并不需要传入任何有关 `session_key` 的信息参数，而是小程序自己去调自己的服务来查询用户最近一次生成的 `session_key` 是否过期。如果当前 `session_key` 过期，就让用户来重新登录，更新 `session_key`，并将最新的 `session_key` 存入用户数据表中。

### 整个授权流程图和代码

![img](https://user-gold-cdn.xitu.io/2018/8/13/1653149c0d99db7d?w=1024&h=768&f=jpeg&s=116659)

用代码来表示如下：

```text
// 或者在 app.js 内使用 onLaunch
onLoad(){
  let loginFlag = wx.getStorageSync('session_key');
  if (loginFlag) {
    // 检查 session_key 是否过期
    wx.checkSession({
        // session_key 有效（未过期）
        success: function() {
            // 业务逻辑处理
        },

        // session_key 过期
        fail: function() {
            // session_key 过期，重新登录
            this.doLogin();
        }
    });
  ) else {
    // 无 session_key，作为首次登录
    this.doLogin();
  }
}
```

## 使用云开发数据库来存储心情数据

可以在小程序中通过 `wx.cloud` 相关的方法使用云开发的数据库，而且它支持权限设置，很方便存储 UGC（用户原创内容）的数据（在[第 3 节 (opens new window)](https://juejin.im/book/5b70f101e51d456669381803/section/5b70f2656fb9a009a545f6c7)介绍过）。在心情签到功能中，就使用了小程序云的数据库，用它来存储用户的签到心情。

### 在云开发控制台创建数据库

首先从小程序开发者工具中的「云开发」进入数据库管理 tab，然后点击「添加集合」，创建一个 `diary` 的集合（数据库）。

![img](https://user-gold-cdn.xitu.io/2018/8/13/1653149ee77c70b2?w=544&h=176&f=jpeg&s=10801)

这个集合中的文档数据格式如下图所示。

![img](https://user-gold-cdn.xitu.io/2018/9/1/165938bd3dbe91ab?w=311&h=143&f=jpeg&s=13693)

其中，`_id` 和 `_openid` 是系统自动生成的，文档（表）中其他字段的意思解释如下：

- emotion：当天的心情，一共有 5 种心情
- tsModified：签到的时间戳
- openid：根据授权信息获取的 openid，跟 `_openid` 一致

有了数据库的信息，需要编写增加一条心情数据（`addEmotion`）和获取某个月份所有心情数据（`getEmotionByOpenidAndDate`）。

### 增加心情数据

```text
// lib/api.js
// 初始化 cloud 环境
wx.cloud.init({
  env: 'envID'
})

// 获取数据库实例
const db = wx.cloud.database()

// 用户心情签到
export const addEmotion = (openid, emotion) => {
  return db.collection('diary').add({
    data: {
      openid,
      emotion,
      tsModified: Date.now()
    }
  })
}
```

### 获取心情数据

```text
// lib/api.js
// 初始化 cloud 环境
wx.cloud.init({
  env: 'envID'
})

// 获取数据库实例
const db = wx.cloud.database()

// 根据用户 openid 和日期获取心情数据
export const getEmotionByOpenidAndDate = (openid, year, month) => {
  const _ = db.command
  year = parseInt(year)
  month = parseInt(month)

  let start = new Date(year, month - 1, 1).getTime()
  let end = new Date(year, month, 1).getTime()
  // console.log(start, end, `${year}-${nextMonth}-01 00:00:00`,`${year}-${month}-01 00:00:00`)
  return db
    .collection('diary')
    .where({
      openid,
      tsModified: _.gte(start).and(_.lt(end))
    })
    .get()
}
```

小程序云开发的数据库为了提升查询性能，**不能够一次查询出来超过20条以上的数据**。所以上面的代码最多能够查询出20条数据，当签到数据超过20天（一个月最多31天），这时候就需要做两次查询（根据`tsModified` 正序，反序各取一次），然后合并数据了，所以最后的代码如下：

```text
export const getEmotionByOpenidAndDate = (openid, year, month) => {
  const _ = db.command
  year = parseInt(year)
  month = parseInt(month)

  let start = new Date(year, month - 1, 1).getTime()
  let end = new Date(year, month, 1).getTime()
  // 这里因为限制 limit 20，所以查询两次，一共31条（最多31天）记录
  // 正序反序各取一次，使用 orderBy 排序
  return new Promise((resolve, reject) => {
    Promise.all([
      db
        .collection('diary')
        .where({
          openid,
          tsModified: _.gte(start).and(_.lt(end))
        })
        .orderBy('tsModified', 'desc')
        .limit(15)
        .get(),
      db
        .collection('diary')
        .where({
          openid,
          tsModified: _.gte(start).and(_.lt(end))
        })
        .orderBy('tsModified', 'asc')
        .limit(16)
        .get()
    ])
      .then((data) => {
        let [data1, data2] = data
        let set = new Set()
        data1 = data1.data || []
        data2 = data2.data || []
        data = data1.concat(data2).filter((v) => {
          if (set.has(v._id)) {
            return false
          }
          set.add(v._id)
          return true
        })
        resolve({data})
      })
      .catch((e) => {
        console.log(e)
        reject(e)
      })
  })
}
```

心情数据是根据 `openid` 和月份获取的，日期范围为：月份 1 日的凌晨 0 点（start）到下一月份 1 日的凌晨 0 点（end），在云数据库中可以使用 `_.gte(start).and(_.lt(end))`，即大于等于 `start` 小于 `end`。

这里计算 `start` 和 `end` 的时候，遇见了 `Date` 兼容性的两个问题：

1. `localDateString` 问题
2. 时区问题

#### `localDateString` 问题

笔者一开始使用将日期转化成类似 `2018-01-01 00:00:00` 的格式，然后使用 `new Date('2018-01-01 00:00:00')`，可以得到 Date 实例，这在开发者工具和 Android 手机上都没有问题，但是在 iOS 系统下却识别成了 `Invalid Date`，变成了 `1970-01-01`。这是因为 iOS 上 `localDateString`（本地时间）的[问题 (opens new window)](https://stackoverflow.com/questions/13363673/javascript-date-is-invalid-on-ios)，使用 `new Date().toLocaleDateString()` 就可以知道，iOS 下识别的数据是 `2018/01/01 00:00:00` 这样的格式的。

#### 时区问题

小程序云开发的云函数和数据库是面向全球开发者的，它们使用的时区并不是我们的东八区（北京时间），因此我们在获取 Date 的时候就要小心，简单拼接 `2018-01-01 00:00:00` 获取的时间并不是北京时间，数据库存入的数据如果使用北京时间（本地 JS），那么获取数据的时候就应该使用北京时间（云端执行 JS 时）。

为了解决 Date 的问题，笔者在计算时区的时候，都转换成了 UTC 标准时间，比如在云函数中，笔者使用了 `new Date().getUTCHours()` 这样的时间，详见 server/inline/utils.js。

而在获取特定某一天的 Date 实例的时候，则使用 `new Date(year, month, day)` 的方式，这样在数据库获取某个月份时间戳时，就不会出现不同系统环境不同数值的问题，详见 client/lib/api.js 的 `getEmotionByOpenidAndDate` 方法。

## 使用 navigator 增加跳转

心情签到页面做完之后，还需要在天气预报页面给它做跳转。在天气预报页面增加跳转的 WXML 代码如下：

```text
<!--weather/index.wxml-->
<view class="navigator" bindtap="goDiary">
  <icon type="edit"/>
</view>
```

页面绑定了事件 `goDiary` 代码：

```text
// weather/index.js
Page({
  goDiary() {
    let url = `/pages/diary/index`
    wx.navigateTo({
      url
    })
  }
})
```

在心情签到页面，顶部导航需要增加返回操作：

```text
<!--diary/index.wxml-->
<view class="navigator">
  <icon type="back" bindtap="goBack"/>
</view>
// diary/index.js
Page({
  goBack() {
    wx.navigateBack()
  }
})
```

## 心情签到页面整体流程图

![img](https://user-gold-cdn.xitu.io/2018/8/13/16531487782ac35b?w=1024&h=768&f=jpeg&s=210592)

## 小结

本节介绍了新鲜天气日历使用、用户授权流程和数据库操作。

日历使用需要在小程序管理后台搜索对应的插件 id，然后申请授权。日历的日期背景颜色是跟当时签到心情相对应的，当切换了日历的月份之后，应该重新获取当前月份的签到数据信息。

用户授权流程由小程序、开发者服务器和微信接口服务三方参与，整个流程包括调用 `wx.login` 授权获取临时登录凭证，使用临时登录凭证获取 `openid` 和 `session_key`，以及获取用户信息三个步骤。`session_key` 可以用于解密敏感数据，但是 `session_key` 具有时效性，需要调用 `wx.checkSession` 方法来校验其是否失效。

云开发的数据库每条记录自带 `_openid` 字段，可以单独来设置数据库权限。笔者在心情签到功能中主动通过授权获得用户 `openid` 然后增加记录。在进行跟日期、时间戳相关的数据查询时应该注意云环境的时区，最佳实践是使用格林尼治时间，使用 `Date` 对象的时候也应该注意生产环节和本地环境 `localeDateString` 的差异。



# 实战篇7：对小程序进行优化

## 页面流程优化

合理的页面流程可以加快页面打开速度，下面介绍几种常见的方式。

### 减少白屏时间

当进入的页面还在进行数据加载的时候，如果加载时间过长，用户看不到页面实际内容，看到的只是一个白屏界面。可以通过增加骨架屏（Skeleton Screen）或者默认数据来减少白屏时间。在新鲜天气的天气预报页面，获取数据的流程较长，笔者通过在首屏提前渲染默认数据来减少白屏时间，效果如下图所示。

![img](https://user-gold-cdn.xitu.io/2018/8/17/16546a36e43e23a5?w=375&h=670&f=jpeg&s=31156)

当然这个骨架屏和默认数据做得还不够细致，有兴趣的读者可以通过 [GitHub (opens new window)](https://github.com/ksky521/fresh-weather)上的源码继续优化。

### 利用逻辑层空闲时间预加载数据

小程序是由逻辑层和视图层共同作用的，逻辑层代码（App Service）在小程序执行的生命周期内会常驻内存，并不会因为切换页面而释放资源，利用这个特点，可以对页面流程进行一些优化。

新鲜天气是由天气预报和心情签到两个页面组成的，在天气预报页面数据获取结束之后、页面空闲之时，如果用户已经授权登录信息，那么可以提前获取心情签到页面的数据，将数据存入 app.js 的 `globalData` 中，当用户进入心情签到页时，就可以减少等待时间，很快看到页面内容了。

天气预报页面对心情签到页面数据预取逻辑如下：

```text
// weather/index.js
let prefetchTimer
const app = getApp()

Page({
  onHide(){
    // 切走，则清理计时器
    clearTimeout(prefetchTimer)
  },
  onShow(){
    // 显示则添加计时器
    this._setPrefetchTimer()
  },
  _setPrefetchTimer(){
    // 10s 预取
    if(!app.globalData.currentMonthData.length && isUpdate){
      prefetchTimer = setTimeout(() => {
        this.prefetch()
      }, 10e3)
    }
  },
  prefetch(){
    let openid = wx.getStorageSync('openid')
    if(openid){
      // 存在则预取当前时间的心情
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth() + 1
      getEmotionByOpenidAndDate(openid, year, month)
      .then((r) => {
        const data = r.data || []
        // console.log(data)
        app.globalData.currentMonthData = data
      }).catch(e=>{})
    }
  }
})
```

在上面的预取代码中有个小技巧，就是增加了定时器清理功能，当页面切走（`onHide`）跳转到心情签到页面时，在后台预取数据已经变得没有意义了，所以及时地清理了定时器；而当页面再切回（`onShow`）的时候又重新启动了定时器，当然定时器的启动是以 `globalData` 没有数据，并且天气页面已经完成渲染为前提的。在心情签到页面中，获取的心情数据要存入 `globalData`，这样数据就打通了。

除了预取下一页的数据，如果整个项目中有较多的静态外链资源需要加载，也可以在首页空闲的时候进行预取。

### 默认数据缓存

对于用户第一次进入小程序的数据可以使用默认数据来构建骨架屏，空闲时预取下一页数据；而用户再次进入小程序，有了上一次的数据了，就可以使用之前的数据优先展示，等数据更新后重新渲染页面即可。心情签到数据也是这样，对于一个用户不能更改之前的签到数据，可以将这些数据存入小程序的本地缓存，减少 SQL 请求。要记录上次的数据，可以使用小程序的[数据缓存 API (opens new window)](https://developers.weixin.qq.com/miniprogram/dev/api/data.html)。

```text
// weather/index.js
// render 之后缓存数据
  dataCache() {
    const {current, backgroundColor, backgroundImage, today, tomorrow, address, tips, hourlyData} = this.data
    wx.setStorage({
      key: 'defaultData',
      data: {
        current,
        backgroundColor,
        backgroundImage,
        today,
        tomorrow,
        address,
        tips,
        hourlyData
      }
    })
  },
  // onLoad 内部获取数据之前调用
  setDataFromCache() {
    wx.getStorage({
      key: 'defaultData',
      success: ({data}) => {
        if (data && !isUpdate) {
          // 存在并且没有获取数据成功，那么可以给首屏赋值上次数据
          const {current, backgroundColor, backgroundImage, today, tomorrow, address, tips, hourlyData} = data
          this.setData({
            current,
            backgroundColor,
            backgroundImage,
            today,
            tomorrow,
            address,
            tips,
            hourlyData
          })
        }
      }
    })
  }
```

效果如下：

![img](https://user-gold-cdn.xitu.io/2018/8/24/16569ab5b6954ea4?w=375&h=667&f=png&s=91638)

## 控制包体积大小

当小程序第一次启动（冷启动）或者有更新包的时候，微信客户端会自动下载最新包，尤其是「冷启动」的时候，用户跟小程序的第一次接触如果因为资源包体积过大而一直下载数据，从而造成体验不好，那么对用户的伤害是相当大的。下面来介绍几种减少包体积的方法。

### 静态资源压缩

要控制包体积大小，可以梳理资源包内静态资源，从以下几个方面入手：

- 使用压缩工具或者直接勾选开发者工具中「上传代码时，压缩代码」选项
- 及时清理无用的代码和资源文件（包括无用的日志代码）
- 减少资源包中图片和媒体资源的数量和大小，除 icon 类小图片放在资源包内，大图片尽量放到 CDN 上
- icon 类图片可以使用字体和雪碧图
- 外链类静态资源要尽量使用 CDN 来提速

### 采用分包机制

小程序的包体积大小限制已经提高到了 2MB，但是一些复杂的大型小程序还是不够用，而且对包体积进行合理划分，做到按需加载，也可以提高页面的打开速度，于是小程序提供了分包机制。

分包机制只需要在 app.json 中按照下面格式配置分包的内容即可：

```text
{
  "pages":[
    "pages/index",
    "pages/logs"
  ],
  "subPackages": [
    {
      "root": "packageA",
      "pages": [
        "pages/cat",
        "pages/dog"
      ]
    }, {
      "root": "packageB",
      "pages": [
        "pages/apple",
        "pages/banana"
      ]
    }
  ]
}
```

经过上面的配置，`pages` 内的内容被打包成「主包」，而 `subPackages` 中的内容则被打包成「子包」。当小程序打开时，采用分包机制的小程序会先下载「主包」来展现首页内容，这样极大地提升了小程序的打开速度。

> 注意：并不是任何程序都可以分包，具体是否采用分包形式不能只看体积大小，要考虑业务实际情况；另外业务相关性强，并且具有连贯性的要分到一个包。

## 代码级别的优化

上面主要是从提升资源包下载速度方面来进行优化，而当代码下载到本地执行之后，用户体验满意度则体现在代码级别的优劣上。

### 小程序 `setData` 的性能

小程序的视图层 WebView 作为渲染载体，而逻辑层是由独立的 JavaScriptCore 作为执行环境的。两者在数据传递上，是先将数据字符串化之后再通过 JSBridge 进行传递的，也正是因为数据传输是通过 JSBridge 的这种事件通知机制，在这种机制下，从 `setData` 到页面数据真正被渲染使用的过程是一个**异步**的过程，但是 `this.data` 的变化是发生在逻辑层，即是一个**同步**的过程，**相同的原理，直接修改 `this.data` 是不被推荐的，因为虽然`this.data`值发生了变化，但是渲染层并没有发生变化，所以会出现数据不一致的问题！**，下面用代码来理解下 `this.data` 值设置是同步的：

```text
Page({
  data:{
    test: 0
  },
  onLoad(){
    this.setData({
      test: 1
    })
    console.log(this.data.test) // 1
  }
})
```

下面的代码，虽然都可以拿到正确的 `this.data` 值，但是在页面流程中的表现却是不同的：

```text
Page({
  data:{
    test: 0
  },
  onLoad(){
    this.setData({
      test: 1
    },() => {
      console.log(this.data.test) //1，页面渲染层已经更新完成
    })
    console.log(this.data.test) // 1，只是 this.data 变化，而渲染层并没有更新变化
  }
})
```

正确地使用 `setData` 可以提升页面性能。下面几种操作是对性能有损坏的，需要在写代码的时候注意。

> 1. 频繁调用 `setData`

不要在一个循环中频繁调用 `setData`（跟不要在循环内频繁操作 DOM 一样），毫秒级别的调用 `setData` 会导致视图层和逻辑层频繁地通过 JSBridge 进行通信，大量事件排队，最终导致页面出现卡顿的现象。

```text
// 下面的操作是不推荐的
for(let i = 0; i < items.length; i++ ){
  this.setData({
    key: items[i]
  })
}
```

一次需要更新多个 `data` 的字段时，如果数据量不大，可以考虑统一设置一次 `setData`。

> 1. 使用 `setData` 传递比较大的数据

比较大的数据会导致数据字符串化过程较慢，收到数据后重新对象化的时间也会加长，另外小程序内部规定每次 `setData` 数据不能超过 `1024kB`。对于较大的数据，可以通过细分的方式来处理：

```text
let bigData = [{
  text: '长文案1'
},{
  text: '长文案2'
}]
this.setData({
  'array[0].text': bigData[0].text
})
```

> 1. 后台状态的 webview 使用 `setData`

因为整个小程序只有一个逻辑层在处理数据和事件逻辑，如果一个页面已经在后台（`onHide`）但还在设置 `setData`，那么也会占用逻辑层的通信通道和资源，所以在页面 `onHide` 之后，一些 `setData` 操作可以提前缓存起来，等页面 `onShow` 之后再一次性更新。

> 1. 把跟页面无关的数据放到页面的 `data` 中

与当前界面渲染无关的数据最好不要设置在 `data` 中，而应该考虑作为内部变量来使用或者放在 page 对象的其他字段下。

比如在天气预报页面，`onLoad`方法先获取用户分享的文案地址，用到了获取省市县地址等信息：

```text
onLoad() {
  // ......
  const pages = getCurrentPages() //获取加载的页面
  const currentPage = pages[pages.length - 1] //获取当前页面的对象
  const query = currentPage.options
  // 如果有地址，经纬度信息
  if (query && query.address && query.lat && query.lon) {
    let {province, city, county, address, lat, lon} = query
    // **注意下面调用了 setData 方法，设置了一些无用的 data！！！！！！**
    this.setData(
      {
        city,
        province,
        county,
        address,
        lat,
        lon
      },
      () => {
        this.getWeatherData()
      }
    )
  } else {
    // 否则，正常逻辑：先获取地址，再获取天气数据
    this.getLocation()
  }
},
```

这里的`city`、`province`、`county`、`lat`、`lon`只是在页面 js 内部使用，跟渲染页面没有关系，所以这几个变量可以从`data`中剔除，直接放到普通变量中：

```text
let city, province, count, lat, lon
Page({
    data: {
        address
    },
    onLoad() {
        // 忽略代码
        // 下面只设置 address 这个跟渲染相关的数据
        // 其他直接用全局的变量即可
        this.setData(
          {
            address
          },
          () => {
            this.getWeatherData()
          }
        )
        
    }
})
```

### 合理使用小程序事件

小程序的事件响应是由视图层对事件进行监听，事件处理函数是通过视图层传递到逻辑层处理的，大量无用的事件绑定会增加视图层和逻辑层的通信，从而降低其他数据传输的响应时间，造成页面卡顿。尤其是 `onPageScroll` 这类频繁触发的事件，应该做好节流/防抖处理。

> **函数节流：** 是指在一段时间内，频繁触发某个函数，而函数的执行结果不会因为触发次数而发生改变，这时候可以使用延迟执行函数的方式，防止函数过多调用而对性能造成影响。最常见的应用场景就是对页面滚动或者改变视口大小的监听，比如 `onresize` 和 `scroll` 事件监听。 **函数防抖**是指频繁触发的情况下，只有足够的空闲时间，才执行代码一次。比如生活中的坐公交，就是一定时间内，如果有人陆续刷卡上车，司机就不会开车。只有别人没刷卡了，司机才开车。

```text
// 节流
let canRun = true;
$(window).scroll(() => {
   if(!canRun){
       // 判断是否已空闲，如果在执行中，则直接return
        return;
   } 
   canRun = false;
    setTimeout(() => {
        canRun = true;
    }, 300);
}); 
// 防抖
let timer;
$(window).scroll(() => {
  if(timer){
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    // 延时 200ms，处理滚动逻辑
  }, 200)
})
```

另外，当小程序事件需要绑定 `target` 或 `currentTarget` 的 `dataset` 时，应该尽量保持节点上 `data-*` 不放置过大的数据。

### 使用自定义组件和类库

对于多个页面都使用的代码片段，可以提炼成组件或者公共 API 来使用，这样既可以集中维护，又可以减少整体代码量。

### ES6 语法尽量简单

我们在项目中使用 ES6 时，应该尽量避免使用依赖 Runtime/Polyfill 的语法，例如 import 和 class，这类语法处理成 ES5 代码会增加不少的额外代码，所以需要根据实际情况来使用。

## 小结

本节重点介绍了小程序优化的技巧。小程序优化可以从页面流程、包体积和静态资源管理，以及代码层次优化三个方面入手。

小程序逻辑层和视图层分离设计，利用逻辑层常驻内存可以实现资源的预加载，从而优化页面流程。小程序本身提供分包机制，可以将整个项目划分为多个「子包」实现按需加载。在写代码的时候，应该理解小程序的实现机制，避免 `setData`、事件绑定的不合理使用，也要考虑将页面公共的组件和 API 提炼出通用代码来维护。



# 实战篇8：小程序调试技巧和上线发布

## 真机调试

平时开发小程序可以在开发者工具中进行调试，开发者工具提供了类似 Chrome DevTools 的调试面板，对于前端开发者来说入门门槛比较低。

小程序开发完成之后，我们需要在真机上进行测试，真机调试方面小程序开发者工具有**预览**、**远程调试**和**设置体验版本**三大部分功能。除了这三种方式之外，我们还可以使用真机远程调试，在 iOS 上可以通过实现 Safari 调试代码，安卓中可以安装 X5 内核的 inspect 版本，开启 Chrome remote debug 模式。

本部分会简单介绍开发者工具的预览和远程调试功能，以及如何开启 iOS 和 Android 的真机调试功能，体验版本功能会在「上线」部分讲解。

### 预览功能

在开发者工具中，顶部有「预览」功能，点击后会编译打包当前代码，然后生成一个二维码，用开发者账号扫码就可以预览代码。当遇见问题需要同步编写代码 debug 的时候，可以切换到「自动预览」模式，如下图所示，只要代码发生变化就会重新编译自动启动小程序。

![img](https://user-gold-cdn.xitu.io/2018/8/15/1653c204eeca9fe4?w=275&h=468&f=jpeg&s=28449)

### 远程调试

远程调试也是在开发者工具中开启的，点击顶部的「远程调试」即出现跟预览功能类似的界面，打包上传之后也会出现一个二维码，通过扫码可以进入远程调试界面。这时候，手机会打开带有 [vConsole (opens new window)](https://github.com/Tencent/vConsole)的小程序界面，而开发者工具的电脑则显示一个类似 Chrome DevTools 的开发者调试工具。这样就可以直接调试了。

![img](https://user-gold-cdn.xitu.io/2018/8/17/16546a63a85ac9bb?w=750&h=1334&f=png&s=534782)

![img](https://user-gold-cdn.xitu.io/2018/8/17/16546aac4dd9cbab?w=1136&h=934&f=jpeg&s=140192)

### iOS 调试

下面介绍下如何使用 Xcode、Reveal 和 Safari 来真机调试 iOS 上的小程序。进行 iOS 调试需要使用 Mac 电脑，如果你用的是 Windows 系统，可以跳过本部分内容，直接查看后面的 Android 版本的 remote debug。

> 先大概说下原理，首先下载砸过壳版本的微信 ipa 文件（iOS App 程序的后缀），然后使用 IPAPatch 对 ipa 进行重新签名，签名账号可以使用自己的 Apple 账号，最后将项目编译到真机（也可以模拟器），就可以使用 Safari 进行调试了。

1. 下载 [IPAPatch 项目(opens new window)](https://github.com/Naituw/IPAPatch)
2. 使用 PP 助手下载砸过壳版本的微信 ipa（使用最新版本的微信，否则登录会提示需要升级），这个需要安装 PP 助手，下载后在下载目录找到其 ipa
3. 将微信的 ipa 文件命名为 app.ipa，替换掉 IPAPatch 目录的 Assets/app.ipa 文件
4. 使用 Xcode 打开 IPAPatch 项目
5. 修改签名到自己的开发者账号，没有开发者账号可以用自己的 Apple 账号登录

![img](https://user-gold-cdn.xitu.io/2018/8/15/1653c20e1452b7a0?w=1512&h=887&f=jpeg&s=205377)

按照上面的提示，首先修改 `BundleID`（这里的填写可以比较随意），然后使用自己的 Apple ID 登录账号，再选择自己的真机（数据线连接后可以选择），选择后点击开始编译，编译结束会安装到自己的 iPhone 手机，安装成功后就会发现自己的手机有两个微信了。

接着再完成下面的步骤，就可以调试小程序了。

1. 在 iPhone 上信任自己的开发者描述文件：「设置 -> 通用 -> 描述文件 -> 信任你的证书」
2. 在 iPhone 上打开 Safari 调试功能：「设置 -> Safari -> 高级 -> Web 检查器打开」

首先登录微信账号，打开需要调试的小程序，打开后在 Mac 电脑上打开「Safari -> 开发」找到自己的 iPhone 手机，选择对应的页面就可以进行调试了。

![img](https://user-gold-cdn.xitu.io/2018/8/15/1653c21423b68206?w=692&h=242&f=jpeg&s=54346)

这里说明下：

- JSContext：是小程序的逻辑层代码，执行在 JavaScriptCore 环境中
- page-frame.html：是小程序的视图层代码，执行在普通的 WKWebview 中
- 上图只开了一个小程序页面却显示了两个 page-frame.html，说明始终有一个页面在后台加载，准备打开小程序的其他页面（[基础篇 3：小程序架构及其实现机制 (opens new window)](https://juejin.im/book/5b70f101e51d456669381803/section/5b70f3456fb9a00986735fa3)中介绍过）

#### 调试 JSContext

打开 JSContext 之后，找到的第一个 JS 文件实际就是微信的逻辑层代码执行 `waservice.js` 了：

![img](https://user-gold-cdn.xitu.io/2018/8/15/1653c216bcac23f1?w=1000&h=650&f=png&s=250489)

另外看到一些 `JSBridge.subscribeHandle` 的代码实际是 Native 实现的一些方法或事件，然后调用 JSContext 中的方法回传数据的。下面是点击事件的一个截图，会看到点击事件传递的数据。

![img](https://user-gold-cdn.xitu.io/2018/8/15/1653c21abc0044aa?w=1000&h=650&f=png&s=222778)

#### 调试 page-frame.html

`page-frame` 的页面是普通的 WebView 容器，可以在 Safari 中直接 debug，下面笔者通过 Console 面板修改 `#canvas-wrapper` 节点的内容：

![img](https://user-gold-cdn.xitu.io/2018/8/15/1653c218687897a9?w=1000&h=650&f=png&s=230180)

修改后，在手机上看到效果：

![img](https://user-gold-cdn.xitu.io/2018/8/17/16546a273f1004b9?w=400&h=708&f=png&s=226556)

这说明实际 WebView 内是可以进行 DOM 操作的，而且也可以使用普通的 BOM 对象，如 `alert`、`location`等。

![img](https://user-gold-cdn.xitu.io/2018/8/17/16546a1f7b889207?w=750&h=1334&f=jpeg&s=61647)

#### 使用 Reveal 查看 UI 布局

如果要研究微信小程序的布局，可以使用 Reveal 软件来查看 UI 布局。如下图所示，在今日头条的小程序布局中，可以看到播放器组件是 Native 实现的组件，而我们做的新鲜天气小程序的雨雪效果 Canvas 也是 Native 实现的。

![img](https://user-gold-cdn.xitu.io/2018/8/15/1653c22207fc956c?w=1312&h=833&f=jpeg&s=173509)

![img](https://user-gold-cdn.xitu.io/2018/8/17/16546a116a36f207?w=1527&h=1050&f=jpeg&s=216044)

要开启 Reveal，需要经过下面的步骤：

1. 安装 Reveal，然后通过菜单「Help -> Show Reveal Library in Finder -> iOS Library」，打开 `RevealServer.framework` 所在目录
2. 将 `RevealServer.framework` 复制到 IPAPatch 的 `Assets/Frameworks/` 内

上面两个步骤如果都正确，再次用 Xcode 打开 IPAPatch 编译运行，打开小程序后，会在 Reveal 中看到可以操作了。

![img](https://user-gold-cdn.xitu.io/2018/8/15/1653c225cdc43fad?w=1312&h=833&f=jpeg&s=76912)

这时候点击 icon 就可以随意查看 UI 布局了。

### Android 手机使用 X5 inspect 版本进行真机调试

安装 X5 inspect 版本之后，就可以使用 Chrome 的远程调控功能来调试小程序了。具体操作步骤如下：

1. 用 Android 版微信关注「腾讯浏览服务」公众号，点击菜单「TBS 公测」然后回答 5 个问题，就可以下载 X5 测试版本
2. 打开 Android 手机的「开发者选项 -> USB 调试」功能，连上电脑数据线，这时候如果有`adb`可以执行`adb devices`看下是否连接成功（`adb` 是 `android debug bridge` 安卓调试桥简称，[官方地址 (opens new window)](https://developer.android.com/studio/command-line/adb)）
3. 微信扫码访问：[http://debugx5.qq.com(opens new window)](http://debugx5.qq.com/)

![img](https://user-gold-cdn.xitu.io/2018/8/13/165313e946af4355?w=280&h=280&f=png&s=1417)

1. 切换到「信息」选项卡，勾选下图中的三项：「打开 TBS 内核 Inspector/X5jscore Inspector/小程序调试功能」

![img](https://user-gold-cdn.xitu.io/2018/8/13/165313ebef91bfff?w=1080&h=1920&f=jpeg&s=110911)

有关 Chrome 远程调控的更多资料可以访问 [Chrome Web Developers 官网教程 (opens new window)](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/)。

PS：安卓下调试小程序有一定概率会失败，感觉不是很稳定。

## 上线

小程序开发完成之后，使用 `npm run build` 打包，然后准备上线：

1. 上传云函数，保证云函数是最新代码
2. 在开发者工具页面右上角选择「上传」，弹出提示框填写版本号和备注（备注可以不填写）

![img](https://user-gold-cdn.xitu.io/2018/8/17/16546a78dc502122?w=597&h=165&f=jpeg&s=16810)

1. 登录微信[小程序管理后台 (opens new window)](https://mp.weixin.qq.com/)，左侧菜单选择「开发管理」，可以看到刚刚上传的版本号代码

![img](https://user-gold-cdn.xitu.io/2018/8/17/16546a4b78f8a028?w=757&h=182&f=jpeg&s=16998)

点击「提交审核」按钮会出现提示框，直接「下一步」，进入「配置功能页面」，这个页面需要填写小程序的主要功能页面。配置合理的标题和类目，可以帮助小程序更好地被检索。

这里笔者填写的内容如下：

![img](https://user-gold-cdn.xitu.io/2018/8/15/1653c230ec2e6515?w=751&h=879&f=jpeg&s=71545)

填写完「配置功能页面」之后，点击提交审核，就进入审核流程了。一般一次审核在几个小时到一天之间，第一次审核会相对慢一些，笔者提交了几次审核，最快的 3 个小时就审核通过了。审核通过后，绑定小程序开发者账号的微信号会收到提醒：

![img](https://user-gold-cdn.xitu.io/2018/8/18/1654a7f0617d94e6?w=750&h=494&f=jpeg&s=44098)

收到提醒后，再次登录[小程序管理后台 (opens new window)](https://mp.weixin.qq.com/)，在「开发管理」处会标记是已经审核通过待发布的版本。

![img](https://user-gold-cdn.xitu.io/2018/8/17/1654736552b78625?w=963&h=209&f=jpeg&s=22479)

点击发布可以选择「全量发布」和小流量发布，这时候根据自己情况选择即可。

> **Tips：**
>
> 1. 如果发现提交审核的代码有问题或者新开发了一个版本，可以在管理后台撤回审核的版本，再提交新版本审核即可
> 2. 上传代码后，可以在小程序后台设置刚刚上传的代码为「体验版本」，设置后可以扫描版本号下面的体验版本二维码进行体验
> 3. 如果发布的版本出现重大 bug，可以在「开发管理」页面对线上版本选择「版本回退」

### 设置体验版本

设置体验版本有点类似小范围公测，需要将代码通过开发者工具先上传，然后在小程序管理后台设置体验版本。体验版本并不是任何人都可以体验的，需要开发者主账号在「管理后台 -> 用户身份」添加体验账号。

![img](https://user-gold-cdn.xitu.io/2018/8/15/1653c23541562e30?w=1308&h=711&f=jpeg&s=69329)

设置用户身份之后，上传代码之后，在后台设置体验版本，体验版本设置成功之后，会有版本号二维码可以扫码体验。

![img](https://user-gold-cdn.xitu.io/2018/8/15/1653c237cc920995?w=590&h=582&f=jpeg&s=45182)

## 数据分析

上线后的小程序，可以在[小程序管理后台 (opens new window)](https://mp.weixin.qq.com/)，看到一些基本统计数据：

![img](https://user-gold-cdn.xitu.io/2018/8/17/1654735022cd9d90?w=960&h=487&f=jpeg&s=31887)

小程序 API 还提供**自定义分析**功能，可以通过[自定义分析 (opens new window)](https://developers.weixin.qq.com/miniprogram/analysis/custom/)页面定制自己的分析。

对于开发者而言，最关注的应该是程序异常数据，小程序的[监控报警 API (opens new window)](https://developers.weixin.qq.com/miniprogram/dev/api/monitor-report.html)提供数据监控上报的功能。使用前，需要在「[小程序管理后台 (opens new window)](https://mp.weixin.qq.com/)-> 运维中心 -> 性能监控 -> 业务数据监控」中新建监控事件，配置监控描述与告警类型。

![img](https://user-gold-cdn.xitu.io/2018/8/15/1653c23d5779b844?w=959&h=595&f=jpeg&s=37773)

创建完后，可以通过 API 进行数据上报：

```text
// 参数是监控 id 和上报数值
wx.reportMonitor('1', 1)
```

## 小结

本节介绍了小程序调试技巧和上线发布流程，以及小程序数据上报分析方法。在调试技巧中，重点介绍了如何在 iOS 和 安卓真机中调试微信中的小程序，希望上面的调试技巧可以帮助小程序开发者快速定位问题。