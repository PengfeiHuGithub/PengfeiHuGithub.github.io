# 基础篇1 Manifest 配置文件

> 由于 Web 应用入口严重依赖于浏览器，这一限制大大降低了用户体验且不利于用户留存。即使部分浏览器提供了添加为桌面快捷方式的机制以便用户快速打开应用，但其表现形式依旧含有强烈的浏览器标签。而 PWA 正是通过 Manifest 配置文件在保留 Web 应用原有特性的同时，降低甚至抹平与原生应用间的差异，从而提高用户体验及用户留存率。

接下来，我们通过一个具体的例子来对其进行深入讲解。

## manifest.json 配置



```json
{
  "name": "PWA Manifest Demo",
  "short_name": "Manifest Demo",
  "start_url": "./index.html",
  "theme_color": "#4374A5",
  "background_color": "#4374A5",
  "display": "standalone",
  "orientation": "natural",
  "icons": [{
    "src": "images/launcher-icon.png",
    "sizes": "192x192",
    "type": "image/png"
  }]
}
```

### 应用名称

> `name`：应用名称，使用场景为：

启动页

![img](https://user-gold-cdn.xitu.io/2019/10/18/16ddcaa27d2ee9c4?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

安装提示

![img](https://user-gold-cdn.xitu.io/2019/10/18/16ddcaa93b7eba4e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> `short_name`：应用短名称，使用场景为：

主屏幕

![img](https://user-gold-cdn.xitu.io/2019/10/18/16ddcaaf17d4f1f2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

安装横幅

![img](https://user-gold-cdn.xitu.io/2019/10/18/16ddcab35fdb841c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 注：在 [Google web app manifest (opens new window)](https://developers.google.com/web/fundamentals/web-app-manifest/)中提到安装横幅使用 name，但实际测试结果使用的是 short_name，故此处根据实际测试结果进行说明。

### 启动网址

> start_url：启动应用时加载的 URL。

### 主题色

> `theme_color`：工具栏的色值，如在 `HTML` 中通过 `meta` 标签指定，则以 `meta` 标签指定的色值为准，故建议 `meta` 与 `manifest.json` 的值保持一致。

### 背景色

> `background_color`：应用首次启动后，在启动网址呈现之前，浏览器会使用该色值填充屏幕，以便杜绝白屏，效果如上述中的启动页。

### 启动模式

> `display`：应用启动后的展现形式；其值可为：

`fullscreen`：页面占满整个屏幕。

![img](https://user-gold-cdn.xitu.io/2019/10/18/16ddcab9d2aad205?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> `standalone`：相对于 `fullscreen`，此模式还包含状态栏、返回按钮等其他系统 `UI`，该模式更接近原生应用

![img](https://user-gold-cdn.xitu.io/2019/10/18/16ddcac00d40e464?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> `minimal-ui`：相对于 standalone，此模式还包含浏览器地址栏，地址栏样式取决于具体的浏览器

![img](https://user-gold-cdn.xitu.io/2019/10/18/16ddcacec5127da2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> browser：使用操作系统内置的浏览器来打开应用。

![img](https://user-gold-cdn.xitu.io/2019/10/18/16ddcad6b349a529?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 显示方向

> `orientation`：锁定屏幕旋转，强制指定应用的显示方向；其值可为：

- `any`：当屏幕切换到横屏时，以横屏方式显示，否则以竖屏方式显示。
- `natural`：如果屏幕的宽大于高，则以横屏显示，否则以竖屏方式显示。
- `portrait`：根据平台规则或屏幕旋转角度，自动取值 portrait-primary 或 portrait-secondary。
- `portrait-primary`：竖屏正方向。
- `portrait-secondary`：竖屏反方向，屏幕正方向按顺时针旋转 180°。
- `landscape`：根据平台规则或屏幕旋转角度，自动取值 landscape-primary 或 landscape-secondary。
- `landscape-primary`：横屏正方向，屏幕正方向按顺时针旋转 90°。
- `landscape-secondary`：横屏反方向，屏幕正方向按顺时针旋转 270°。

### 应用图标

> `icons`：应用图标列表，其中每一项包含的属性为：

- `src`：图标文件路径。
- `type`：图标的 mime 类型；非必填项，该属性可以让浏览器快速忽略掉不支持的图标类型。
- `sizes`：图标尺寸；格式为 widthxheight，其宽高均以像素（px）为单位。

以上我们对常用配置进行了说明，更完善的列表请参考完整 Web 应用清单。

> 至此，我们已经完成了 `manifest.json` 的配置，那要实现可安装，还需要做些什么呢？我们接着往下看。

## 页面代码



```text
<!DOCTYPE html>
<html>
<head>
  <link rel="manifest" href="./manifest.json">
</head>
<body>
  <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        /**
         * ./sw.js 文件中的内容如下：
         * self.addEventListener('fetch', function(event) {
         * });
         */
        navigator.serviceWorker.register('./sw.js');
      });
    }
  </script>
</body>
</html>
```

> 上述代码中，我们不仅对 manifest.json 进行了链接，并对 Service Worker 进行了注册，这是因为要实现应用的可安装，需满足以下条件：

拥有一个 `manifest.json`配置文件，且该配置文件必须包含以下配置：

- `name`
- `short_name`
- `start_url`
- `icons`

拥有一个注册了的 `Service Worker`。

网络需要使用 `HTTPS`。

网站在同一浏览器中至少被访问过两次，且相隔时间不少于五分钟。

## 安装



![img](https://user-gold-cdn.xitu.io/2019/10/18/16ddca9387fca845?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 完成上文中的设置，我们便可通过点击上图中的安装 PWA Manifest Demo 或浏览器内置的安装横幅（会在用户多次访问站点且间隔时间不少于五分钟的时候自动出现）来进行应用安装。但如果我们想要延迟安装提示，或在用户选择同意或拒绝安装后做一些统计类的工作，我们就需要通过代码来实现。比如：

```text
let appPromptEvent = null;
window.addEventListener('beforeinstallprompt', function(event) {
  console.log('触发事件：beforeinstallprompt');
  appPromptEvent = event;
  event.preventDefault();
  return false;
});

const installBtn = document.getElementById('installBtn');
installBtn.addEventListener('click', function() {
  if (appPromptEvent !== null) {
    appPromptEvent.prompt();
    appPromptEvent.userChoice.then(function(result) {
      if (result.outcome === 'accepted') {
        console.log('同意安装应用');
      } else {
        console.log('不同意安装应用');
      }
      appPromptEvent = null;
    });
  }
});
window.addEventListener('appinstalled', function() {
  console.log('应用已安装');
});
```

上述代码的主要流程为：

- 通过监听 window 对象的 `beforeinstallprompt` 事件拦截浏览器安装横幅的显示事件，在回调中我们将 event 实例保存起来以便后续使用，然后通过屏蔽事件的默认行为来阻止安装横幅的显示。
- 在安装应用按钮的点击事件中，如果 `appPromptEvent` 不为空，我们通过调用 prompt 方法来显示安装提示，而后便可在 `userChoice` 属性的 then 回调中对用户的选择做一些类似统计之类的工作，这里唯一需要注意的是，由于 `appPromptEvent` 只能被使用一次，所以在最后我们必须要将其设置为空（或许你会问：如果用户选择了拒绝，片刻又反悔了岂不是没有事件可用了？关于这个问题我们稍后回答）。
- 通过监听 window 对象的 `appinstalled` 事件，我们可以在应用成功安装后做一些类似统计之类的工作。 流程、代码都非常简单，我们可通过以下演示或自行运行[本章示例 (opens new window)](https://github.com/nanjingboy/pwa-demos/tree/master/part-1/chapter-1)来查看效果：

![img](https://user-gold-cdn.xitu.io/2019/10/18/16ddca8918669845?imageslim)

> 通过上面的日志输出可以得知 `beforeinstallprompt` 被触发了两次，那么就让我们对该事件的触发时机进行简单梳理：

- 如果应用已经被安装，该事件将不会被触发。
- 如果应用没有被安装，该事件会在：
  - 浏览器安装横幅首次将要显示时触发。
  - 用户拒绝安装后（这也回答了上面把 `appPromptEvent` 设置为空后，后续再次点击安装应用按钮后无事件可用的问题）。

## 总结



> 本章节我们对 `Manifest` 配置文件进行了系统学习，通过该机制，`Web` 应用可以抹平与原生应用在启动方式、应用表现形式等方面的差异。在下面的几个章节中，我们将对 `Service Worker`、离线存储、后台同步进行讲解，以便更好地体会离线处理为 Web 应用所带来的全新生命力。

## 资源



> 示例代码：[github.com/nanjingboy/…(opens new window)](https://github.com/nanjingboy/pwa-demos/tree/master/part-1/chapter-1)

通过 `ngrok`，可轻松测试基于 `HTTPS` 的应用，并实现公网访问：ngrok.com/



# 基础篇2 Service Worker

> 随着时代的发展，用户对应用体验的要求愈加苛刻，我们虽然可以通过各种优化手段来减少页面加载时间，但当用户处于移动状态，潜在的网络切换很可能导致短暂的离线，如果用户在此时进行事务处理，那么此刻应用的不可用很可能导致用户流失。也许正是由于 Web 应用在离线处理上的弱势，才最终导致其地位在移动时代不如原生应用这一局面。

那又该如何破局，将本机原生应用所具有的离线处理能力植入到 Web 应用中去呢？接下来我们要讨论的 Service Worker 便可解决这一难题。

## Service Worker 与 Web Worker



- 首次看到 `Service Worker`，我想大家可能会跟我一样都有这东西跟 Web Worker 有什么联系之类的疑问，带着这个疑问让我们来梳理下两者的差异。
- `Web Worker` 是现代浏览器提供的一个 `JavaScript` 多线程解决方案，我们可以将一些复杂、耗时的运算交给 Web Worker 执行以达到释放主线程的目的；`Service Worker` 则是建立在 `Web Worker` 之上，旨在通过请求代理、本地缓存、后台同步等机制来提供离线处理能力。两者的主要异同点如下：

**相同点**

- 都独立于主线程，以单独线程的形式运行。
- 都不能直接访问并操作 `DOM`、`window` 对象。
- 都是通过 `postMessage` 接口与主线程进行交互。

**不同点**

- `Service Worker` 内部大部分为基于 `Promise` 的异步操作。
- `Service Worker` 必须运行在 `HTTPS` 环境下以避免中间人攻击。
- `Service Worker` 的生命周期完全独立于网页，且可在不用时被中止、在下次有需要时重启。

## 生命周期



> 上一节我们对 `Service Worker` 及 `Web Worker` 进行了简单对比，下面我们将深入了解 Service Worker 的生命周期。

### 注册

> 要使用 Service Worker，需通过以下方式在页面中对其进行注册：

```js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js', { scope: './' }).then(function(registration) {
      // do domething...
    }).catch(function(err) {
      // do domething...
    });
  });
}
```

> 示例首先检测 `Service Worker` 是否可用，如果可用，则在页面加载完后注册位于 `./sw.js` 的 `Service Worker`。代码非常简单，但需注意以下两点：

- 注册成功仅仅表明指定脚本已成功解析，并不意味着 Service Worker 已经安装或处于激活状态。
- `register` 方法中的 scope 参数指定了 Service Worker 可接收 fetch 事件的作用域，比如 scope 的值为 /mobile，那么 Service Worker 便只能接收 path 以 `/mobile` 开头的 fetch 事件，默认值为 `sw.js` 所在路径。

### 安装

> 注册完成后，浏览器便会立即尝试安装并进入安装状态，此时将触发 `Service Worker` 的 `install` 事件，在该事件中我们经常对静态资源进行缓存处理，比如：

```js
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('sw-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/main.css',
        '/main.js',
        '/image.jpg'
      ]);
    })
  );
});
```

> 示例中通过 Cache API 对静态资源进行了缓存处理，其中方法 `event.waitUntil` 的参数是一个 `Promise` 对象，并且：

- 等待直到参数为 `resolve` 状态时，`Service Worker` 才会进入下一个生命周期。
- 如果最终参数为 `reject` 状态，`Service Worker` 安装失败，我们无需为此做特殊的处理，因为在下次进行注册时，会重新进行安装尝试。

> 需要注意的是，并不是每次注册成功后都会进入安装状态并触发 Service Worker 的 install 事件，其需要满足以下两个条件中的任意一个：

- 页面中尚未安装 `Service Worker`。
- `Service Worker` 已安装，并且从服务器获取的 `sw.js` 文件与本地版本存在差异

### 等待

> 安装成功后，如果已经存在一个版本的 Service Worker 且有页面正在使用该版本，新版 Service Worker 便会进入等待状态，当 Service Worker 处于该阶段时，由于它必须等正在运行旧版本 Service Worker 的页面全部关闭后才会获得控制权，因此如果我们需要所有页面能够及时得到更新，可在 install 中通过 self.skipWaiting 来强制跳过该阶段：

```js
self.addEventListener('install', function(event) {
  self.skipWaiting();
  //……
});
```

### 激活

当满足以下任一条件，Service Worker 便可进入该阶段：

- `self.skipWaiting` 方法被调用。
- 安装完成后，不存在旧版本的 Service Worker 或无页面使用此版本。
- 等待状态下正在运行旧版本 Service Worker 的页面被全部关闭（页面刷新或切换无法使 Service Worker 从等待进入激活状态，这是由于当页面刷新或切换时，浏览器需要等到新页面渲染完成之后才会销毁旧页面，即新旧两个页面存在共同的交叉时间）。
- 进入该状态后，`activate` 事件将会被触发，我们常通过订阅该事件对缓存进行更新或删除，比如

```js
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName != 'sw-cache';
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
```

> 当 Service Worker 被首次注册时，已打开的页面只有在刷新后才会接受 Service Worker 的控制，如果想要 Service Worker 在激活后尽快掌握这些页面的控制权，可在 activate 中调用 `self.clients.claim` 方法来实现：

```js
self.addEventListener('activate', function(event) {
  self.clients.claim()
  //……
});
```

### 已激活

> 到了这一阶段，便可通过监听 `fetch`、`push`、`sync`、`message` 等事件来为应用提供丰富的离线处理能力。

### 注销

> 用户可通过点击调试面板中的 `unregister`（如下图）来注销 Service Worker，但有些时候我们可能需要通过编程的方式来进行注销，其实现代码如下：

![img](https://user-gold-cdn.xitu.io/2019/10/18/16ddc977ba357326?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

```js
const serviceWorker = navigator.serviceWorker;
if (typeof serviceWorker.getRegistrations === 'function') {
  serviceWorker.getRegistrations().then(function(registrations) {
    registrations.forEach(function(registration) {
      registration.unregister();
    });
  });
} else if (typeof serviceWorker.getRegistration === 'function') {
  serviceWorker.getRegistration().then(function(registration) {
    registration.unregister();
  })
}
```

> 需要注意的是，无论通过何种方式注销，本地缓存都不会自动清除，需手动调用 Cache API、IndexedDB API 等其他离线存储 API 进行清理操作。

### 废弃

> 该阶段表示一个 Service Worker 的生命周期已结束；进入该阶段的条件可为以下任意一个：

- 安装失败。
- 激活失败。
- 用户执行了注销操作。
- 新版本的 Service Worker 替换了它并成为激活状态。

### 状态监听

> 注册成功后，我们可通过回调中的 registration 参数来获取以下状态的 ServiceWorker 实例：

- 安装：通过 `registration.installing` 获取，如属性值为非空，则表示 Service Worker 正处于安装状态。
- 等待：通过 `registration.waiting` 获取，如果属性值为非空，则表示 Service Worker 正处于等待状态。
- 激活：通过 `registration.active`获取，如果属性值为非空，则表示 Service Worker 已被激活。

需要注意的是，在 Service Worker 新旧版本切换的时候，会同时存在安装（等待）及激活状态实例，这是因为新的 Service Worker 还没有完全取得所有页面的控制权。

通过以上方式得到 `ServiceWorker` 实例后，我们可通过监听该实例的 `statechange` 事件来获得其最新状态，比如：

```js
navigator.serviceWorker.register('./sw.js').then(function(registration) {
  const newWorker = registration.installing;
  newWorker.addEventListener('statechange', function() {
    console.log(newWorker.state);
  });
});
```

> 同时也可通过 `registration` 的 `updatefound`事件来监听 `Service Worker`的更新，该事件将在 `registration.installing` 的值发生变化时触发：

```js
navigator.serviceWorker.register('./sw.js').then(function(registration) {
  registration.addEventListener('updatefound', function() {
  });
});
```

> 如果我们想要在新的 Service Worker 取得页面控制权后执行一些逻辑（比如给予用户提示），可通过订阅 `navigator.serviceWorker` 的 `controllerchange` 事件来实现：

```js
navigator.serviceWorker.addEventListener('controllerchange', function() {
});
```

## 事件



> 上一节我们对 Service Worker 的生命周期进行了详细说明，下面我们了解下 Service Worker 所支持的常用事件：

- `install`：安装事件，一般对静态资源文件进行缓存处理。
- `activate`：激活事件，一般用于更新或删除旧版本的缓存。
- `fetch`：接收 Service Worker 作用域下的 `fetch` 事件，在该事件中可以做各种缓存代理的事情。
- `sync`：后台同步事件，由 `BackgroundSync API` 发出。
- `message`：由于 Service Worker 以独立线程运行，通过该事件可以实现与主进程的交互。
- `push`：响应来自系统的推送消息。
- `notificationclick`：推送通知点击事件，一般用来处理通知与用户的交互。

## 总结



> 本章我们通过与 Web Worker 的对比、生命周期以及常用事件三个方面对 Service Worker 进行了系统学习，这些机制为 Web 应用的离线处理、系统交互提供了可能，然而仅仅拥有机制还远远不够，它还需要其他技术的配合才能真正发挥其威力，因此在接下来的几个章节中，我们将对为其提供底层服务的技术一一进行讲解。



# 基础篇3 离线存储

> 通过对 Service Worker 的系统学习，我们知道它为 Web 的离线处理提供了支持，但它仍需要配合离线存储、后台同步等技术来充分挖掘、发挥其威力。在本章节中，我们将对离线存储进行讨论，希望通过本章节的学习，大家可以掌握以下内容：

离线存储方案对比。

- IndexedDB 的基本使用。
- Cache API 的基本使用。

## 离线存储方案对比



![img](https://user-gold-cdn.xitu.io/2019/10/18/16dde55cebc40da7?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 如图所示，在 `Chrome Devtools -> Application -> Storage / Cache` 标签下，我们可以看到不同的离线存储方案，究竟这些方案有什么差异，我们又该使用哪些方案来为 Service Worker 提供底层服务，本节将一一为大家说明。

### Cookie

> Cookie 是服务器发送并保存到客户端的一小块数据，目的是为了解决无状态 HTTP 协议下无法验证两个请求来自同一会话的问题，主要特点为：

- 无法跨域访问。
- 存储数据格式单一。
- 接口同步访问。
- 存储空间过小（一般为 `4 KB`）。
- 生命周期一般由服务器设定，如果由浏览器生成，一般在浏览器关闭后失效。
- 每次请求都会自动携带 Cookie 信息，如果存放的数据过多，将会带来额外的性能开销。
- 无法在 `Web Worker` 及 `Service Worker` 环境下访问。

### LocalStorage 和 SessionStorage

> LocalStorage、SessionStorage 是 HTML5 引入的离线存储技术，主要特点为：

- 无法跨域访问。
- 存储数据格式单一。
- 接口同步访问。
- 存储空间相对于 `Cookie` 有所增加（一般为 `5 MB`）。
- 生命周期 `LocalStorage` 为永久，`SessionStorage` 则随着页面关闭而失效。
- 仅存在客户端中，不参与服务端通信。
- 无法在 Web Worker 及 `Service Worker` 环境下访问。

> 至此，我们对 `Cookie`、`LocalStorage` 以及 `SessionStorage` 进行了简单说明，由于其均无法在 Service Worker 环境下访问且 Service Worker 的离线存储要求能够存储大量、具有不同格式的数据，故上述存储方案均无法使用。它们的主要使用场景为：

- 由于每次请求都会自动携带 `Cookie` 信息，优先使用 `Cookie` 来保存用户登录状态信息。
- 也正是由于每次请求都会自动携带 `Cookie` 信息，除用户登录状态之外任何会话（比如购物车、游戏分数等）信息优先使用 `LocalStorage` 或 `SessionStorage`

### Web SQL 和 IndexedDB

> `Web SQL`、`IndexedDB` 同样是 `HTML5` 引入的离线存储技术，主要特点为：

- 无法跨域访问。
- 可存储丰富的数据格式。
- 接口异步访问（基于事件）。
- 存储空间较大（一般不少于 `250 MB`）。
- 生命周期为永久。
- 仅存在客户端中，不参与服务端通信。
- 能够在 `Web Worker` 及 `Service Worker` 环境下访问。

> 总的来说，`Web SQL`、`IndexedDB` 是关系型数据库、非关系型数据库在客户端的各自实现，其所支持的丰富数据格式、较大的存储空间以及可在 `Service Worker` 环境下访问的特性均符合 Service Worker 对底层技术的要求，但由于 Web SQL 已被 W3C 废弃且浏览器支持情况不甚理想，所以我们可选用 IndexedDB 作为 Service Worker 的底层技术支持。

### Application Cache

> Application Cache 是 HTML5 引入的旨在提供页面离线访问能力的缓存机制，其使用步骤如下：

- 在文档的 `html` 标签中设置 `manifest` 属性以引用 `manifest` 文件。
- 配置 `manifest`文件，在其中设置需要缓存的资源。
- 服务端正确配置 `MIME-type`。

> 上述可知，它仅仅提供了一套离线缓存机制，并非离线存储方案。这里之所以提及，因为这是 Web 离线处理的一次尝试，但由于存在各种各样的问题，导致它最终被废弃的命运，这也才会有后来的 Service Worker。其主要问题为：

- 缓存内容存在大小限制（一般为 5 MB）。
- 无法通过编程方式清除缓存，必须用户手动清除。
- m`anifest` 配置文件格式要求比较严格。
- 只要 `manifest` 配置文件中的资源有一个缓存（更新）失败，将导致全部资源缓存（更新）失败。
- 由于会自动缓存引用了 `manifest` 的 HTML，这就导致如果改了 HTML 内容，也需要更新版本才能更新。
- 难以实现动态缓存，且一旦出现问题，将难以进行调试。

### CacheStorage

> CacheStorage 是 Service Worker 规范的一部分，因此从它出生的那一刻起便决定了它为 Service Worker 提供底层服务的使命。虽然它是 Service Worker 规范的一部分，但依旧可以脱离 Service Worker 单独使用。主要特点为：

- 无法跨域访问。
- 可存储丰富的数据格式。
- 接口异步访问（基于 Promise）。
- 存储空间较大（一般不少于 250 MB）。
- 生命周期为永久。
- 仅存在客户端中，不参与服务端通信。
- 能够在 Web Worker 及 Service Worker 环境下访问。

### 小结

> 通过上述对比，我们可以使用 IndexedDB 及 CacheStorage 来为 Service Worker 的离线存储提供底层服务，根据社区的经验，它们各自的适用场景为：

- 对于网址可寻址的（比如脚本、样式、图片、HTML 等）资源使用 `CacheStorage`。
- 其他资源则使用 `IndexedDB`。
- 完成了技术选型，接下来我们将对 `IndexedDB` 及 `CacheStorage` 相关 `API` 的使用进行简单说明

## IndexedDB 的基本使用



本节我们将通过数据库及数据操作两个方面对 IndexedDB 的使用进行简单说明。

### 数据库操作

```text
const openRequest = window.indexedDB.open('TodoList', 1);
```

> 作为使用 IndexedDB 的第一步，我们通过 `window.indexedDB.open` 来打开名为 `TodoList` 的数据库，如果该数据库不存在或指定的版本大于当前版本，都将会触发接口返回值（此处为 `openRequest`）的 `onupgradeneeded` 事件，我们一般在该事件的回调函数中进行存储空间的创建。比如：

```js
openRequest.onupgradeneeded = function(event) {
  const db = event.target.result;
  const todosStore = db.createObjectStore('todos', { keyPath: 'id', autoIncrement : true });
  todosStore.createIndex('status', 'status');
};
```

> 上例中，我们先通过 `event.target.result` 来获取 `IDBDatabase` 实例，然后通过该实例的 `createObjectStore` 方法创建了一个名为 `todos` 的存储空间，该方法接收 2 个参数：

- 第一个参数为存储空间的名称。
- 第二个参数用来将存储对象中的某个属性设置为存储空间的 `key` 值，其中 `autoIncrement` 指定了 `key` 值是否为自增。

> 通过 `createObjectStore` 创建了存储空间后，我们通过存储空间的 `createIndex` 方法创建了一个名为 `status` 的索引，该方法接收 3 个参数：

- 第一个参数为索引的名称。
- 第二个参数指定了根据存储数据的哪一个属性来构建索引，其值可以为字符串或字符串数组。
- 第三个参数指定了该索引的一些约束，常用属性为：

```js
{
  unique: boolean, // 索引值是否唯一
  /**
   * 常用于包含操作，比如以下结构：
   * const People = {
   *   name: 'Tom',
   *   skills: ['C++', 'JavaScript', 'Java'],
   * };
   * 如果想通过 `objectStore.index(’skill‘).get('Java')` 获取数据，
   * 那么在创建 `skill` 索引的时候则需将 `multiEntry` 设置为 `true`
   */
  multiEntry: boolean
}
```

至此便完成了数据库、存储空间的创建，接下来我们将对数据操作进行简要说明。

### 数据操作

```js
openRequest.onsuccess = function(event) {
  const db = event.target.result;
  const transaction = db.transaction(['todos'], 'readonly');
  const todosStore = transaction.objectStore('todos');
  // ……
};
```

> 上例中，我们通过订阅 `openRequest` 的 `onsuccess` 事件以便在回调函数中对数据进行操作，由于 `IndexedDB` 的数据操作都是基于事务的，因此第一步我们通过 `IDBDatabase` 的实例（此处为 `db`）方法 `transaction` 来获得了一个只读事务，该实例方法接收 `2` 个参数：

- 第一个参数指定要操作的存储空间名称，其值可以为字符串或字符串数组。
- 第二个参数指定事务的模式，常用值为 `readonly` 或 `readwrite`，默认值为 `readonly`

> 得到事务实例后，我们便可通过事务实例的 `objectStore` 方法获得需要操作的存储空间，之后便可通过存储空间实例（此处为 `todosStore`）进行数据的增、删、改、查等操作，具体细节参看 [IndexedDB使用文档 (opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API/Using_IndexedDB)或参照本章 [IndexedDB 示例 (opens new window)](https://github.com/nanjingboy/pwa-demos/blob/master/part-1/chapter-3/indexedDB/main.js)，此处不再阐述

## Cache API 的基本使用



> 掌握了 `IndexedDB`，接下来我们来简单了解下 `Cache API`。

### CacheStorage 接口

> 我们可通过 `caches` 来访问 `CacheStorage`，主要接口为：

- `open`：获取指定名称的 `Cache` 对象。
- `keys`：获取 `CacheStorage` 所有 `Cache` 对象中的 `Response` 条目键值列表。
- `has`：判断是否存在指定名称的 `Cache` 对象。
- `delete`：删除指定名称的 `Cache` 对象。
- `match`：获取指定请求所对应的 `Response` 条目（如匹配到多个，则返回第一个）。

### Cache 接口

> 通过上述 `CacheStorage` 的一系列接口获取到 `Cache` 对象后，我们便可对缓存进行操作，主要接口为：

- `match`：获取指定请求所对应的 `Response` 条目（如匹配到多个，则返回第一个）。
- `matchAll`：与 `match` 的唯一差别是该接口返回所有匹配项。
- `add`：获取指定 `URL` 的资源，将返回的 `Response` 添加到 `Cache` 对象中。
- `addAll`： 与 `add` 的唯一差别是该接口可以获取多个 `URL` 的资源，并将其依次添加到 `Cache` 对象中。
- `put`：将指定 `Request` 的 `Response`添加到 `Cache` 对象中。
- `delete`: 删除指定 `Request` 的 `Response` 条目。
- `keys`：获取指定 `Request` 的 `Response` 条目键值列表

> 这里我们仅对 CacheStorage 和 Cache 的接口进行了一个简短说明，具体细节请参看 [CacheStorage API (opens new window)](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage#Methods)和 [Cache API (opens new window)](https://developer.mozilla.org/en-US/docs/Web/API/Cache#Methods)或参照本章 [Cache 示例 (opens new window)](https://github.com/nanjingboy/pwa-demos/blob/master/part-1/chapter-3/cache/sw.cache.js)，此处不再阐述。

## 总结



> 本章节我们首先通过对比得出了使用 `IndexedDB` 和 `CacheStorage` 为 `Service Worker` 提供离线存储底层服务的结论，而后对它们的基本使用进行了简单说明。下一章我们将对离线处理中的后台同步进行讲解，相信通过 `Service Worker` 与这些底层服务的有效结合，我们完全可以构建出应对复杂网络状况下高可用的 Web 应用。



# 基础篇4：后台同步

> 上一章我们对离线存储进行了讲解，本节我们继续介绍离线处理中的另外一个话题 - 后台同步，该机制允许用户随时随地进行事务处理，而无需关心网络的连接状态。比如以下示例：

![img](https://user-gold-cdn.xitu.io/2019/10/18/16dde59e204f3218?imageslim)

通过演示我们可以看到，无论在线还是离线，甚至在触发了后台同步之后关闭页面，只要网络处于在线状态都会执行后台同步事件，并将缓存在本地的请求数据发送到服务端。对于传统的 Web 应用来说，该特性是极其令人兴奋的，因为它解决了传统 Web 应用所存在的以下几个问题：

- 页面发起的请求会随着页面的关闭而终止。
- 在离线状态下，很难将用户的网络请求缓存起来，并在网络恢复正常后再次进行请求。

那么它究竟是如何工作的？下面我们通过上面的演示实例对其进行说明。

## 基本使用



### 注册

> 在上面的演示中，当我们点击添加按钮后，控制台首先输出了已触发后台同步：add-todo，这便完成了后台同步事件注册，主要代码如下：

```html
<script src="./db.js"></script>
<script src="./ui.js"></script>
<script src="./network.js"></script>
<script>
  window.addEventListener('load', function() {
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      navigator.serviceWorker.register('./sw.js').then(function(registration) {
        document.getElementById('submit').addEventListener('click', function() {
          ui.submit(function(name) {
            db.addTodo(name).then(function() {
              registration.sync.register('add-todo').then(function() {
                console.log('已触发后台同步：add-todo');
              });
            });
          });
        });
      });
      navigator.serviceWorker.addEventListener('message', function(event) {
        ui.render(event.data);
      });
    } else {
      document.getElementById('submit').addEventListener('click', function() {
        ui.submit(function(name) {
          network.addTodos([{ name: name }]).then(function(todos) {
            ui.render(todos);
          });
        });
      });
    }
  });
</script>
```

> 上述代码中，我们首先判断当前环境下 `Service Worker` 及 `SyncManager` 是否可用，如不可用则按照传统方式对按钮的点击事件进行处理，否则按照以下步骤进行处理：

- 注册 `Service Worker`。
- 注册完成后，使用回调参数 `registration` 的 `sync.register`方法注册一个后台同步事件；在该例中，我们在回调中监听按钮的点击事件，并在点击事件中进行后台同步事件注册。
- 当添加按钮点击且页面验证通过后（通过 `ui.submit` 方法），我们通过 `db.addTodo` 方法将需要发送到服务端的数据缓存在本地。
- 数据缓存成功后，则调用 `registration.sync.register` 方法注册一个名为 `add-todo` 的后台同步事件。

以上便是后台同步注册的常规流程，其过程非常简单，但也需要注意以下几点：

- `registration.sync.register` 的参数是事件的唯一标识，为了减少设备、浏览器需要唤醒的次数，浏览器可能会将多个具有相同标识的事件合并为一个；如果想要每个事件都触发一次，则需要使用不同的标识。
- 由于 `Service Worker` 内不允许直接访问 `DOM` 元素，因此我们需要将发送到服务端的数据缓存到本地（根据上一章的讨论，我们一般使用 `IndexedDB` 进行处理）。

### 响应

> 完成了注册，接下来我们就需要在 `Service Worker` 中对事件进行响应，主要代码如下：

```js
importScripts('./db.js');
importScripts('./network.js');

function notification(todos) {
  self.clients.matchAll().then(function(clients) {
    if (clients && clients.length) {
      clients.forEach(function(client) {
        client.postMessage(todos);
      });
    }
  });
}

self.addEventListener('sync', function(event) {
  if (event.tag === 'add-todo') {
    console.log(`开始进行后台同步：${event.tag}`);
    event.waitUntil(
      db.getTodos().then(function(todos) {
        return network.addTodos(todos).then(function(todos) {
          console.log('来自服务器的响应：', todos);
          notification(todos);
          return db.clearTodos();
        });
      })
    );
  }
});
```

> 因为 `Service Worker` 是独立于主线程运行的，所以即使在页面中引入了 `./db.js` 及 `./network.js`，我们仍需要通过 `importScripts` 方法将其引入。 而后，我们通过监听 `sync` 事件来响应同步事件，在回调函数中，我们主要做了以下事情：

- 检查当前同步的标签（这里为 `add-todo`），从而触发正确的同步逻辑。
- 获取存储在本地的需要发送到服务端的数据，并将其发送到服务端。
- 同步完成后通知主线程并删除本地缓存。

至此我们完成了后台同步事件的响应，过程依旧非常简单，这里需要注意以下事项：

- `sync` 回调函数返回值为 `Promise` 对象，由于浏览器内置了智能的重试机制，所以我们无需自行设计重试机制。
- 上文已提到过，`Service Worker` 是无法直接操作 `DOM` 元素的，因此如果我们在同步处理成功后想要对 `DOM` 进行处理，可通过给主线程发送消息来实现：

```js
// Service Worker 内实现参见 notification 方法

// 主线程
navigator.serviceWorker.addEventListener('message', function(event) {
  // doSomething with event.data;
});
```

### 重试

> 上文中我们提到，针对 `sync` 事件中的异常，浏览器内置了智能的重试机制，但它究竟何时执行且是否会一直执行下去呢？下面我们通过实际测试来回答这个问题。

![img](https://user-gold-cdn.xitu.io/2019/10/18/16dde5b0417e674e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

通过上图的输出，我们可以看出：

- 第一次执行失败后，第二次会在 5 分钟之后触发；
- 第二次执行失败后，第三次会在 15 分钟后触发；
- 如果第三次执行失败后，该同步事件将不会再触发。

总的来说，从我们通过 `registration.sync.register` 注册一个同步事件开始，到该事件的落幕，这期间它最多可被执行 `3` 次。如果想要在它惨淡落幕前给予用户提示，可通过以下方式实现：

```js
self.addEventListener('sync', function(event) {
  if (event.tag === 'add-todo') {
    event.waitUntil(
      doSomething().catch(function(error) {
        if (event.lastChance) {
          //给予用户以友好提示
        }
        throw error;
      })
    );
  }
});
```

## 总结



本章中，我们详细介绍了后台同步，它为实现恶劣网络环境下，用户进行无感知的事务处理提供了可能。至此我们完成了 `Service Worker`、`离线存储`、后台同步的学习，通过这些技术我们可以构建出应对复杂网络状况的 `Web` 应用，以此提高用户体验并逐步抹平与原生应用在离线处理方面的差异。在接下来的一个章节中，我们将对推送通知进行讨论，通过它我们可以让 `Web` 应用彻底突破浏览器限制，以实现曾经可望而不可及的系统深度集成

[示例代码：github.com/nanjingboy/…](https://github.com/nanjingboy/pwa-demos/tree/master/part-1/chapter-4)



# 基础篇5：推送通知

> 当今时代，应用需要与用户互动才能加强用户黏性并避免用户流失，虽然我们可以在用户离开后通过邮件等方式来发送一些有价值的信息，但这并不能完全引起用户的注意，且无法与应用进行互动。这正是推送通知所要解决的问题，它最大的特点是即使没有打开应用（或浏览器），用户依旧能够收到通知内容，并通过点击通知进入应用进行事务处理。这种类似原生应用的体验为加强互动体验并保证用户留存提供了可能，也必将成为颠覆 Web 的入口，本章我们将一起探讨它的基本使用。

## 基本流程



```text
+-------+           +--------------+       +-------------+
|  UA   |           | Push Service |       | Application |
+-------+           +--------------+       |   Server    |
    |                      |               +-------------+
    |      Subscribe       |                      |
    |--------------------->|                      |
    |       Monitor        |                      |
    |<====================>|                      |
    |                      |                      |
    |          Distribute Push Resource           |
    |-------------------------------------------->|
    |                      |                      |
    :                      :                      :
    |                      |     Push Message     |
    |    Push Message      |<---------------------|
    |<---------------------|                      |
    |                      |                      |
```

上图摘自：[tools.ietf.org/html/draft-…(opens new window)](https://tools.ietf.org/html/draft-ietf-webpush-protocol-12)

如图所示，推送通知由三部分组成：

- `UA`：客户端。
- `Push Service`：一般由浏览器服务商提供，比如 chrome 和 firefox 自己的 Push Service。
- `Application Server`：服务端，开发者自己提供。

其工作流程为：

> `Subscribe`：浏览器通过询问（如下图）的方式让用户选择是否允许显示通知，如允许则向 `Push Service` 发起订阅请求，订阅成功后返回 [PushSubscription (opens new window)](https://developer.mozilla.org/en-US/docs/Web/API/PushSubscription)对象。

![img](https://user-gold-cdn.xitu.io/2019/10/25/16e00ccc58c5f13b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- `Monitor`：订阅成功后，`Push Service` 将保持与客户端的联系，主要作用是将服务端推送的消息发送到客户端。
- `Distribute Push Resource`：订阅成功后，客户端需要将 `PushSubscription` 对象中的验证信息发送给服务端，并在服务端进行保存。
- `Push Message`：服务端推送的消息并不是直接发给客户端的，而是发给 `Push Service`，后者对消息进行校检后，再将消息推送给客户端。

> 以上便是推送通知的工作流程，由于使用过程中我们基本上不会对 `Push Service` 进行干预，因此接下来我们仅对客户端以及服务端的使用进行阐述说明。

## 订阅通知



### 客户端

上文我们讨论了，使用推送通知的第一步便是订阅，其中客户端主要代码如下：

```html
<script>
  function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  function getApplicationServerKey() {
    return urlB64ToUint8Array(
      'BLW2Nfw3ylyUdwNqAreIPYbemxnxQ7ZTZSIJIHxrgw_xOiUP9enenF5JIHX8KXY8BZpzuGN_0mCehb2XEqms3hg'
    );
  }
  window.addEventListener('load', function() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.register('./sw.js').then(function(registration) {
        registration.pushManager.getSubscription().then(function(subscription) {
          if (subscription) {
            console.log('通知已注册....');
            return;
          }
          registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: getApplicationServerKey()
          }).then(function(subscription) {
            fetch('/subscribe', {
              headers: {
                'content-type': 'application/json'
              },
              method: 'POST',
              body: JSON.stringify(subscription)
            }).then(function(response) {
              return response.json();
            }).then(function() {
              console.log('通知注册成功……');
            }).catch(function() {
              subscription.unsubscribe();
              console.log('通知注册失败……');
            })
          });
        });
      });
    }
  });
</script>
```

> 上述代码中，我们首先判断当前环境下 `Service Worker` 及 `PushManager` 是否可用，如可用则按照以下步骤进行处理：

- 注册 `Service Worker`。

- `Service Worker` 注册成功后，我们通过调用 `registration.pushManager` 对象中的 `getSubscription` 方法来检测用户是否已经订阅，如订阅直接返回，否则进行下一步。

- 通过调用

   

  ```
  registration.pushManager
  ```

   

  对象中的

   

  ```
  subscribe
  ```

   

  方法进行订阅，其接收的参数选项为：

  - `userVisibleOnly`：布尔值，表示返回的推送订阅将只能被用于对用户可见的消息，该属性值必须为 `true`，否则会抛出以下异常 ![img](https://user-gold-cdn.xitu.io/2019/10/25/16e00cd52c69ae1a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
  - `applicationServerKey：Uint8Array` 类型，服务端用来向客户端应用发送消息的公钥。我们可以使用[本章配套示例 (opens new window)](https://github.com/nanjingboy/pwa-demos/tree/master/part-1/chapter-5)中的 `yarn generage-keys` 生成相应的公私钥。 ![img](https://user-gold-cdn.xitu.io/2019/10/25/16e00cd96ad06315?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- 订阅成功后，我们将返回的

   

  ```
  PushSubscription
  ```

   

  对象

   

  ```
  subscription
  ```

   

  信息发送到服务端，服务端存储该信息以便将来发送信息使用。其中发送到服务端的主要数据格式如下：

  - `endpoint`：浏览器为每个订阅者生成的唯一 `URL`，便于 `Push Service` 确定向哪个客户端发送通知。
  - `expirationTime`：订阅的有效时间，只读属性，值一般为 `null`。
  - `keys`：用于加密消息数据，属性有 `auth` 和 `p256dh`。

以上便是客户端的订阅过程，接下来我们看一下服务端的注册流程。

### 服务端

这里我们选用 Node.js 以及 [web-push (opens new window)](https://github.com/web-push-libs/web-push)来实现服务端的逻辑，主要代码如下：

```js
const Router = require('koa-router');
const webpush = require('web-push');

webpush.setVapidDetails(
  'mailto:hzlhu.dargon@gmail.com', // 值为 URL 或 'mailto:' 格式信息
  'BLW2Nfw3ylyUdwNqAreIPYbemxnxQ7ZTZSIJIHxrgw_xOiUP9enenF5JIHX8KXY8BZpzuGN_0mCehb2XEqms3hg', // 公钥
  'LBj1P1XVRmIir5zxSAGQMvLdwxC87hU6tZYJzxO6NQ4' // 私钥
);

let subscription = null

const router = new Router();
router
  .post('/subscribe', ctx => {
    console.log('\nThe subscribe request is triggered...');
    subscription = ctx.request.body;
    ctx.body = { status: true };
  });
```

> 通过代码可以发现服务端的注册流程非常简单，首先通过调用 `webpush` 的 `setVapidDetails` 方法来设置 [VAPID (opens new window)](https://datatracker.ietf.org/doc/rfc8292/)信息，其中密钥的生成参见上文中的 `yarn generage-keys` 命令，而后我们在请求 `POST /subscribe` 中将客户端上传的 `PushSubscription`信息保存起来即可（注：出于演示的目的，此处仅保存在全局变量中，生产环境应保存在数据库或其他持久存储中去）。

## 发送通知



### 服务端

```js
const webpush = require('web-push');
const router = new Router();

let subscription = null;
const languages = ['C++', 'Java', 'JavaScript', 'Swift', 'Kotlin', 'Rust'];

function pushMessage(data) {
  webpush.sendNotification(subscription, JSON.stringify(data), { proxy: 'http://127.0.0.1:1087' }).then(response => {
    console.log('\nThe data send successfully:', JSON.stringify(data));
  }).catch(err => {
    console.log('\nThe data send failed:', err);
  });
}

router
  .post('/push', ctx => {
    console.log('\nThe push request is triggered...');
    pushMessage({
      message: languages[Math.min(languages.length - 1, Math.floor(Math.random() * 10))],
      type: 'vote'
    });
    ctx.body = { status: true };
  });
```

> 上述代码中，我们通过响应来自客户端的 `POST /push` 请求来发送随机的编程语言投票信息，去掉数据的准备以及其他一些代码，与发送通知相关的便是 `webpush.sendNotification` 方法的调用，参数从左到右以次为：

- 客户端注册的 `PushSubscription` 信息。
- 要发送的消息，消息内容只能为字符串或 `Buffer`。
- 参数信息，这里通过设置代理来解决 Google 服务在国内无法访问的问题，其他属性参见：[web-push (opens new window)](https://github.com/web-push-libs/web-push#input)文档

### 客户端

此时服务端已经发送了通知，接下来就让我们看看客户端是如何做出响应的，主要代码如下：

```js
// sw.js 文件

self.addEventListener('push', function (event) {
  const data = event.data.json();
  const title = 'Push & Notification Demo';
  console.log('触发通知响应事件：', data);
  if (data.type === 'subscribe') {
    event.waitUntil(
      self.registration.showNotification(title, {
        body: data.message,
        icon: './icon.png',
      })
    );
  } else if (data.type === 'vote') {
    event.waitUntil(
      self.registration.showNotification(title, {
        body: data.message,
        icon: './icon.png',
        actions: [
          { action: 'like', title: '👍 喜欢' },
          { action: 'unlike', title: '👎 不喜欢' }]
      })
    );
  }
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  console.log('触发通知点击事件：');
  if (event.action === 'like') {
    console.log(`你对 ${event.notification.body} 投了赞成票`);
  } else if (event.action === 'unlike') {
    console.log(`你对 ${event.notification.body} 投了反对票`);
  }
});
```

> 我们通过监听 `Service Worker` 的 `push` 事件来监听来自服务端的推送通知，在该例中，我们通过调用 `self.registration.showNotification` 方法显示横幅来进行响应，效果如下：

![img](https://user-gold-cdn.xitu.io/2019/10/25/16e00ce208e08dca?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

![img](https://user-gold-cdn.xitu.io/2019/10/25/16e00ce5417f678a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 无论我们点击横幅中的任一地方，都会触发 `notificationclick` 事件，在该事件的监听回调中，我们首先关闭通知，然后根据点击所触发的动作来做出不同的响应。

## 取消订阅



> 用户可以通过改变浏览器的设置（如下图）来取消订阅，但有些时候我们可能需要通过编程的方式来取消某个用户的订阅，其实现代码如下：

![img](https://user-gold-cdn.xitu.io/2019/10/25/16e00cf6730c7417?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

```js
function unsubscribe() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.ready.then(function(registration) {
      registration.pushManager.getSubscription().then(function(subscription) {
        if (subscription) {
          subscription.unsubscribe();
        }
      }
    });
  }
}
```

> 上述代码中，我们首先需要通过 `registration.pushManager.getSubscription` 检查当前用户是否已经订阅，如果已经订阅（`subscription` 对象不为空），便调用 `subscription.unsubscribe` 方法来完成取消订阅操作。

## 总结



> 本章中，我们对推送通知的机制以及使用进行了详细的介绍，通过该机制，即使离开了页面，用户依旧能够获得新的应用更新，这为提高用户交互体验并保证用户留存提供了可能。至此，我们完成了 PWA 底层技术（Manifest 配置文件、`Service Worker`、离线存储、后台同步、推送通知）的系统学习，正是这些技术的有效结合，才使得当今 Web 应用与原生应用的差异逐步淡化成为可能。下一部分中，我们将通过一个完整的案例对这些技术进行综合应用，以便大家更好地掌握 PWA。

[示例代码：github.com/nanjingboy/…](https://github.com/nanjingboy/pwa-demos/tree/master/part-1/chapter-5/)



# 实战篇1：概述

在上一部分中，我们对 PWA 的底层技术进行了全面介绍，本部分我们将通过实现一个简单的博客系统（见下图）来对上述各技术点进行综合运用，以便让大家更好地掌握 PWA。

![img](https://user-gold-cdn.xitu.io/2019/10/28/16e0f5e53a95fdb9?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

![img](https://user-gold-cdn.xitu.io/2019/10/28/16e0f5e915ef9159?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

![img](https://user-gold-cdn.xitu.io/2019/10/28/16e0f5ece6febd87?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

本部分完整代码仓库为：[github.com/nanjingboy/… (opens new window)](https://github.com/nanjingboy/pwa-demos/tree/master/part-2)，主要目录结构如下：

```text
├── client
│   ├── db.js
│   ├── detail
│   │   ├── edit.png
│   │   ├── index.js
│   │   └── styles.css
│   ├── edit
│   │   ├── index.js
│   │   └── styles.css
│   ├── global
│   │   ├── index.css
│   │   └── index.js
│   ├── home
│   │   ├── index.js
│   │   ├── plus.png
│   │   └── styles.css
│   ├── index.ejs
│   ├── launcher-icon.png
│   ├── manifest.json
│   ├── network.js
│   └── sw.js
├── server
│   ├── db.js
│   ├── push.js
│   └── server.js
├── webpack
│   └── plugins
│       ├── SWFilePlugin.js
│       ├── ShellPlugin.js
│       └── index.js
├── webpack.config.js
```

- `client`：主要包含页面、`Service Worker`、应用配置（manifest.json）等前端业务逻辑。
- `server`：主要包含 `Web Server`、数据库操作、`Web Push` 等后端业务逻辑。
- `webpack`：`Webpack plugin`，用于生成 Shell 文件及预缓存列表。
- `webpack.config.js`：`Webpack` 配置文件。

**所用技术：**

- 前端：由于示例较为简单，该示例并未选用如 Vue、React 等第三方框架，而是使用原生 `JavaScript + DOM API` 来完成相关逻辑。
- 前端构建：由于 webpack 在前端构建中占有大量的份额，故此选择 webpack 作为构建工具。
- 服务端：`Node.js + Koa`。

通过本部分的学习，除了能够对 PWA 相关技术进行熟练运用外，大家还将会掌握以下知识点：

- 如何通过自定义 `Webpack Plugin` 实现动态预缓存列表的生成。
- 应用 `Shell`、导航预加载解决的问题及使用。
- 常见请求策略及缓存置换问题。
- `Server Worker` 的更新问题。

> 注：由于使用了 `ES6` 语法且未进行转义处理，故建议在最新的 `Chrome` 下运行客户端。



# 实战篇2：预缓存

> 在 `Service Worker` 的 `install` 事件中，我们一般会对静态资源进行缓存处理，比如：

```js
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open('precache');
    await cache.addAll([
      '/',
      '/index.html',
      '/main.css',
      '/main.js',
      '/image.jpg'
    ]);
  })());
});
```

> 这种在安装阶段将资源进行缓存以便 `Service Worker` 变为可用后可直接从本地缓存中获取资源的能力，我们称之为预缓存（`prechching`）。它与运行时缓存（`Service Worker` 可用后，通过监听其 `fetch` 事件，将资源请求结果动态添加到缓存中的机制）一起为 Web 应用的离线访问提供了技术支持

## 自动生成预缓存资源列表



> 上例中，我们以硬编码的形式定义了预缓存资源列表，这在 Web 应用愈加复杂、前端构建及工程体系逐步完善的今天，既效率低下，又容易出错，因此本节我们借用 webpack 来简单实现资源列表的自动生成。

首先，我们如下修改 `sw.js` 文件：

```js
const precacheList = <%- precacheList %>;
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(precacheName);
    await cache.addAll(precacheList);
  })());
});
```

> 我们通过定义一个 `precacheList` 常量并将其作为参数传递给 `cache.addAll` 方法来替换硬编码资源列表，`precacheList` 的值使用了 `ejs` 模板语法，该值会在执行 `build`时替换成真实资源列表，比如：

```text
const precacheList = ["/db.90cab081eccbdfa6e090fc6ebbadb90f.js","/plus.6b433cf1453965994b3029ea10ec8449.png","/home.5704e93d911a9fcdaf14.css"];
```

可究竟如何生成这些真实的资源信息呢？非常简单，我们只需实现一个简单的 webpack plugin 即可。

创建 `SWFilePlugin.js`：

```js
const path = require('path');
const memFs = require('mem-fs');
const editor = require('mem-fs-editor');

class SWFilePlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('SWFilePlugin', (compilation, callback) => {
      const publicPath = compilation.mainTemplate.getPublicPath({
        hash: compilation.hash
      });
      const assets = Object.keys(compilation.assets).map(asset => `${publicPath}${asset}`);
      const fsEditor = editor.create(memFs.create());
      fsEditor.copyTpl(
        path.join(__dirname, '../../client/sw.js'),
        path.join(__dirname, '../../public/sw.js'),
        {
          precacheList: JSON.stringify(assets)
        }
      );
      fsEditor.commit(() => {
        callback();
      })
    });
  }
}

module.exports = SWFilePlugin;
```

> 在 apply 方法中，我们在 `webpack compiler` 的 emit 钩子中通过：

```js
const publicPath = compilation.mainTemplate.getPublicPath({
  hash: compilation.hash
});
const assets = Object.keys(compilation.assets).map(asset => `${publicPath}${asset}`);
```

- 来获取资源列表，然后通过 [mem-fs-editor (opens new window)](https://github.com/SBoudrias/mem-fs-editor)的 `copyTpl` 方法来生成 `precacheList` 值已被替换的 `sw.js` 文件。
- 代码非常简单，唯一需要注意的是 `precacheList` 的值需通过 `JSON.stringify(assets)` 将其转换为字符串，否则，将生成以下内容：

```text
const precacheList = /db.90cab081eccbdfa6e090fc6ebbadb90f.js,/plus.6b433cf1453965994b3029ea10ec8449.png,/home.5704e93d911a9fcdaf14.css;
```

这样的代码是无法解释执行的。

完成了 `SWFilePlugin`，接下来需要如下修改 `webpack.config.js`：

```js
const { SWFilePlugin } = require('./webpack/plugins');

module.exports = {
  //... 其他配置
  plugins: [
    //... 其他插件
    new SWFilePlugin()
  ]
};
```

> 至此我们便完成了自动生成资源列表所需的所有工作，可[下载示例 (opens new window)](https://github.com/nanjingboy/pwa-demos/tree/master/part-2)，执行 `yarn build` 命令来查看最终生成的 `public/sw.js` 与原始文件 `client/sw.js` 的差异。

## 资源更新



- 当资源或 `Service Worker` 更新后，我们需要对缓存进行更新。对于资源更新后的缓存更新，我们在后面的缓存策略中进行讨论，本节我们只讨论 Service Worker 更新后的缓存更新机制。
- 我们一般在 `Service Worker`的 `activate`事件中对缓存进行更新操作，根据 `precacheName` 是否改变，存在以下两种更新策略：

1. 如果 `precacheName` 改变，直接删除 `cacheName` 与当前 `precacheName` 不相同且符合预缓存命名规则（非预缓存资源无需删除）的缓存，比如：

```js
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys();
    for (const cacheName of cacheNames) {
      if (cacheName !== precacheName && /^precache\-\d+$/.test(cacheName)) {
        await caches.delete(cacheName);
      }
    }
  })());
});
```

1. 如果 `precacheName` 尚未改变，则删除 `precacheList` 中不存在的预缓存项，比如：

```js
 self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(precacheName)
    const requests = await cache.keys();
    for (const request of requests) {
      const { pathname } = new URL(request.url, location);
      if (!precacheList.includes(pathname)) {
        await cache.delete(request);
      }
    }
  })());
});
```

> 在本文附带的示例中，我们采用第一种方式进行来处理 `Service Worker` 更新后的缓存更新。`precacheName` 的动态赋值与上文中的 `precacheList` 类似，首先在 `sw.js` 中定义以下常量：

```js
const precacheName = '<%= precacheName %>';
```

然后修改 `SWFilePlugin.js`：

```js
//... require 依赖

class SWFilePlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('SWFilePlugin', (compilation, callback) => {
      //... 资源列表获取
      fsEditor.copyTpl(
        path.join(__dirname, '../../client/sw.js'),
        path.join(__dirname, '../../public/sw.js'),
        {
          precacheName: `precache-${(new Date()).getTime()}`,
          //... 其他属性设置
        }
      );
      fsEditor.commit(() => {
        callback();
      })
    });
  }
}

module.exports = SWFilePlugin;
```

## 总结



> 上文中，我们从自动生成预缓存资源列表与资源更新两个方面对 Service Worker 预缓存的使用进行了说明，当它与接下来要介绍的应用 Shell 组合使用后，即使在 `Service Worker` 变为可用后瞬间掉线，我们的 Web 应用依旧可以提供良好的用户体验，而不是出现类似以下的异常页面：

![img](https://user-gold-cdn.xitu.io/2019/10/28/16e0f63a5ada2bdd?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



# 实战篇3：应用Shell

> 上一章中，我们对预缓存进行了讲解，基于该机制，当一个页面被访问时，脚本、样式、图片等资源可直接从缓存中获取，这在很大程度上加速了页面的渲染。但如果仅止步于此，那么当用户处于电梯、高铁、地铁等网络极其恶劣的环境下，用户可能看到的依旧是空白页（如下所示）：

![img](https://user-gold-cdn.xitu.io/2019/10/28/16e0f67bc83b2a67?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- 这种无任何反馈的空白页可以说是用户体验的终极杀手，或许就在此刻，用户关闭了站点，转而投向了竞争对手的怀抱……
- 那么如何避免此种悲剧的发生呢？如果仔细观察页面构造，我们会发现页面中变化的始终是部分内容，比如：

![img](https://user-gold-cdn.xitu.io/2019/10/28/16e0f67f83597f93?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 上图所展示的页面主要由 Header、列表及添加按钮三部分组成，其中除了列表，其余部分的内容均是不变的。基于此并结合预缓存，我们可以通过以下方式来解决空白页的问题：

- 通过缓存获取 Header、添加按钮等静态信息。
- 通过网络获取列表等动态信息。
- 将前两步得到的信息拼装成完整的 HTML 返回给浏览器进行渲染。

以上步骤所展示的解决方案正是本章将要讲解的应用 Shell 架构，在本章的剩余部分，我们将通过以下几个方面对该架构的实施进行详细说明：

- `Shell` 文件生成。
- `fetch` 事件。
- 服务端实现。

## Shell 文件生成



> 运行[示例中 (opens new window)](https://github.com/nanjingboy/pwa-demos/tree/master/part-2)的 `yarn build` 命令，`public/shell` 目录下会生成以下文件：

```text
├── home_top.html
├── home_bottom.html
├── ....
```

> 打开 home_top.html 与 home_bottom.html，我们会发现这两个文件分别为一个完整 HTML 文档的一部分：

**home_top.html：**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content= "width=device-width, user-scalable=no">
    <link rel="manifest" href="/manifest.json">
    <title>PWA 博文</title>
    <link href="/global.4735f484d20bd330417c.css" rel="stylesheet"><link href="/home.5704e93d911a9fcdaf14.css" rel="stylesheet">
  </head>
  <body>
    <header class="header">
      <div class="title">PWA 博文</div>
      <div class="action action-install-app">安装应用</div>
      <div class="action action-unsubscribe">取消订阅</div>
    </header>
    <section class="container">
```

**html_bottom.html：**

```html
  </section>
    <img class="side-action" src="/plus.6b433cf1453965994b3029ea10ec8449.png" />
    <script type="text/javascript" src="/db.90cab081eccbdfa6e090fc6ebbadb90f.js"></script>
    <script type="text/javascript" src="/network.c91f3df5f50e951c4317d298a52c9dd0.js"></script>
    <script type="text/javascript" src="/global.4735f484d20bd330417c.js"></script>
    <script type="text/javascript" src="/home.5704e93d911a9fcdaf14.js"></script>
  </body>
</html>
```

> 由于动态的列表信息位于 `<section class="container"></section>` 中，所以我们以 `<section class="container">` 为标志将完整的 `home.html` 分解为：

- `home_top.html`
- 从服务端获取的用以填充 `<section class="container"></section>` 的动态 `HTML`
- `html_bottom.html`

> 通过这样的拆分，当我们请求该页面时，由于 Service Worker 的预缓存已经缓存了 home_top.html 和 html_bottom.html，这个时候即使因网络异常而无法获取动态的列表信息，我们依旧可以将 home_top.html 及 html_bottom.html 拼装成的 HTML 返回给浏览器进行渲染，从而避免空白页给用户带来的不适。

- 上述 home_top.html 及 html_bottom.html 等 HTML 片段文件我们称之为 Shell 文件，我们完全可以自行创建并完成 Shell 文件的编写，但这种方式相当繁琐，因此本节的剩余部分我们将讨论如何通过 webpack 动态生成 Shell 文件。

首先我们需要定义一个模板文件，比如 `index.ejs`：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content= "width=device-width, user-scalable=no">
    <link rel="manifest" href="/manifest.json">
    <title>PWA 博文</title>
  </head>
  <body>
    <header class="header">
      <div class="title">PWA 博文</div>
      <% if (isEnableGoHomeLink) { %>
        <a class="action action-to-home" href="/">首页</a>
      <% } %>
      <div class="action action-install-app">安装应用</div>
      <div class="action action-unsubscribe">取消订阅</div>
    </header>
    <section class="container">
      <!-- shell -->
    </section>
    <% if (isShowPlusAction) { %>
      <img class="side-action" src="<%= require('file-loader?name=[name].[hash].[ext]!./home/plus.png') %>" />
    <% } else if (isShowEditAction) { %>
      <img class="side-action" src="<%= require('file-loader?name=[name].[hash].[ext]!./detail/edit.png') %>" />
    <% } %>
    <script type="text/javascript" src="<%= require('file-loader?name=[name].[hash].[ext]!./db.js') %>"></script>
    <script type="text/javascript" src="<%= require('file-loader?name=[name].[hash].[ext]!./network.js') %>"></script>
  </body>
</html>
```

> 该模板的内容为一个完整的 HTML 文档，注意我们在 `<section class="container"></section>` 中间添加的 `<!-- shell -->` 注释，该注释用于告知 webpack 以此为标志进行 Shell 文件的拆分。

接下来，我们需要创建一个用于生成 Shell 文件的 `webpack plugin`，比如 `ShellPlugin.js`：

```js
const path = require('path');
const fs = require('fs-extra');
const editor = require("mem-fs-editor");

class ShellPlugin {
  constructor() {
    this.htmls = [];
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('ShellPlugin',  compilation => {
      compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync('ShellPlugin', (data, callback) => {
        this.htmls.push({
          key: data.outputName.replace(/\.html$/i, ''),
          html: data.html
        });
        callback(null, data);
      });
    });
    compiler.hooks.emit.tapAsync('ShellPlugin', async (compilation, callback) => {
      const shellRootPath = path.join(__dirname, '../../public/shell');
      await fs.ensureDir(shellRootPath);
      for (const htmlConfig of this.htmls) {
        const { key, html } = htmlConfig;
        const htmlParts = html.split('<!-- shell -->').map(part => part.trim());
        await fs.writeFile(
          path.join(shellRootPath, `${key}_top.html`),
          htmlParts[0],
          'utf-8'
        );
        await fs.writeFile(
          path.join(shellRootPath, `${key}_bottom.html`),
          htmlParts[1],
          'utf-8'
        );
        compilation.assets[`shell/${key}_top.html`] = {
          source: () => htmlParts[0],
          size: () => htmlParts[0].length
        };
        compilation.assets[`shell/${key}_bottom.html`] = {
          source: () => htmlParts[1],
          size: () => htmlParts[1].length
        };
        delete(compilation.assets[`${key}.html`]);
      }
      callback();
    });
  }
}

module.exports = ShellPlugin;
```

**在 apply 方法中：**

> 首先在 webpack compiler 的 `compilation` 钩子中通过 `html-webpack-plugin` 的 `htmlWebpackPluginAfterHtmlProcessing` 钩子来获取将要生成的 HTML 文件信息：

```text
this.htmls.push({
  key: data.outputName.replace(/\.html$/i, ''),
  html: data.html
});
```

> 然后在 `webpack compiler` 的 `emit` 钩子中遍历第一步得到的 html 信息，根据标志`<!-- shell -->` 将每一项拆分成 top、bottom 两个 Shell 文件：

```js
const { key, html } = htmlConfig;
const htmlParts = html.split('<!-- shell -->').map(part => part.trim());
await fs.writeFile(
  path.join(shellRootPath, `${key}_top.html`),
  htmlParts[0],
  'utf-8'
);
await fs.writeFile(
  path.join(shellRootPath, `${key}_bottom.html`),
  htmlParts[1],
  'utf-8'
);
```

> 将每一项生成的 Shell 文件添加到 `compilation` 的 `assets` 列表中，这样方便后续执行 `SWFilePlugin` 时将这些 Shell 文件添加到预缓存列表中去：

```js
compilation.assets[`shell/${key}_top.html`] = {
  source: () => htmlParts[0],
  size: () => htmlParts[0].length
};
compilation.assets[`shell/${key}_bottom.html`] = {
  source: () => htmlParts[1],
  size: () => htmlParts[1].length
};
```

> 由于不需要 html-webpack-plugin 生成的 html 文件，所以我们需要将其从 compilation 的 assets 列表中移除：

```text
delete(compilation.assets[`${key}.html`]);
```

> 最后我们需要如下修改 `webpack.config.js`：

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ShellPlugin, SWFilePlugin } = require('./webpack/plugins');

const pageConfigs = [
  { key: 'home', isEnableGoHomeLink: false, isShowEditAction: false, isShowPlusAction: true },
  { key: 'detail', isEnableGoHomeLink: true, isShowEditAction: true, isShowPlusAction: false },
  { key: 'edit', isEnableGoHomeLink: true, isShowEditAction: false, isShowPlusAction: false },
].reduce((result, { key, isEnableGoHomeLink, isShowEditAction, isShowPlusAction }) => {
  result.entry[key] = `./client/${key}/index.js`;
  result.html.push(new HtmlWebpackPlugin({
    filename: `${key}.html`,
    template: './client/index.ejs',
    chunks: [key, 'global'],
    templateParameters: {
      isEnableGoHomeLink,
      isShowPlusAction,
      isShowEditAction
    }
  }));
  return result;
}, { entry: {}, html: [] });

module.exports = {
  //... 其他配置
  plugins: [
    //... 其他插件
    ...pageConfigs.html,
    new ShellPlugin(),
    //... 其他插件
    new SWFilePlugin()
  ]
};
```

## fetch 事件



上一节中，我们讨论了如何利用 webpack 自动生成页面的 Shell 文件，本节我们将继续讨论如何利用这些 Shell 来优化页面的渲染。

> 我们可以通过监听 Service Worker 的 `fetch` 事件来拦截网络请求，因此需要在该事件中对页面请求做出处理，其主要逻辑如下：

```js
async function getCache(cacheName, cacheKey) {
  const cache = await caches.open(cacheName);
  return await cache.match(cacheKey);
}

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method.toLowerCase() === 'get') {
    event.respondWith((async () => {
      const cacheKey = new URL(request.url, location).pathname;
      //...其他类型请求处理逻辑
      return fetchPage(cacheKey);
    })());
  }
});
```

> fetch 事件中，我们通过拦截 get 请求并在一系列请求类型判断后，调用了 `fetchPage` 方法来响应页面请求，该方法的主要逻辑如下：

```js
function fetchPage(cacheKey) {
  let shellType;
  if (cacheKey === '/') {
    shellType = 'home';
  } else if (/^\/create|\/edit\/\d+$/.test(cacheKey)) {
    shellType = 'edit';
  } else if (/^\/detail\/\d+$/.test(cacheKey)) {
    shellType = 'detail';
  }

  const stream = new ReadableStream({
    start(controller) {
      function pushStream(stream) {
        const reader = stream.getReader();
        function read() {
          return reader.read().then(result => {
            if (result.done) {
              return;
            }
            controller.enqueue(result.value);
            return read();
          });
        }
        return read();
      }

      (async () => {
        const top = await getCache(precacheName, `/shell/${shellType}_top.html`);
        await pushStream(top.body);
        const context = await fetch(cacheKey, {
          headers: {
            'only_content': 1
          }
        });
        if (content) {
          await pushStream(content.body);
        } else {
          const errorContent = new Response(
            '<div class="message">网络错误</div>',
            { headers: { 'Content-Type': 'text/html' } }
          );
          await pushStream(errorContent.body);
        }
        const bottom = await getCache(precacheName, `/shell/${shellType}_bottom.html`);
        await pushStream(bottom.body);
        controller.close();
      })();
    }
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/html' }
  });
}
```

> 该方法首先通过 `cacheKey` 获得页面所属的 Shell 类型，然后通过 `ReadableStream` 实例来逐步获取页面中每个部分的响应信息，其中：

**Shell 文件 top 和 bottom 通过预缓存获取：**

```js
const top = await getCache(precacheName, `/shell/${shellType}_top.html`);
//...其他逻辑
const bottom = await getCache(precacheName, `/shell/${shellType}_bottom.html`);
//...其他逻辑
```

**页面中的正文信息通过网络获取：**

```js
const context = await fetch(cacheKey, {
  headers: {
    'only_content': 1
  }
});
//...其他逻辑
```

> 需要注意的是，在请求正文信息时我们需要添加头信息 `'only_content': 1` 来告知服务端只返回正文信息。

最后，我们用生成的 `ReadableStream` 实例 `stream` 作为 `Response` 参数来实例化一个 `Response` 对象并返回。

> 方法 `fetchPage` 的逻辑非常直观，我想唯一能让大家产生疑问的是：为什么使用 ReadableStream 而非 Promise。这是因为如果使用 Promise，我们需要等到 top shell、正文信息、bottom shell 全部 resolve 后才能实例化 Response 对象；如果使用 ReadableStream，在获取部分信息后，可通过 controller.enqueue 方法将其加入队列，这样浏览器便可对已入队列的信息进行渲染，而无需等待所有信息准备完毕。当然，ReadableStream 的浏览器兼容情况不如 Promise，鉴于此大家可以思考下如何实现 fetchPage 方法的兼容，此处不再阐述。

## 服务端实现



> 服务端需要做的就是根据上文中提到的头信息 `only_content` 来决定是否只返回正文部分信息，这是因为在 `Service Worker` 尚未取得页面控制权时依旧能够正常的显示页面。主要实现如下

```js
//... 其他引用
const router = new Router();

async function renderPage(ctx, type, content) {
  if (parseInt(ctx.request.headers['only_content'], 10) === 1) {
    ctx.body = content;
  } else {
    const rootPath = path.join(__dirname, '../public/shell');
    const top = await fs.readFile(path.join(rootPath, `${type}_top.html`), 'utf-8');
    const bottom = await fs.readFile(path.join(rootPath, `${type}_bottom.html`), 'utf-8');
    ctx.body = `${top}${content}${bottom}`;
  }
}

router.get('/', async ctx => {
  const articles = await db.getArticles();
  let content = '<div class="message">暂无任何数据</div>';
  if (Array.isArray(articles) && articles.length > 0) {
    content = articles.reduce((result, item) => {
      result += `<div class="item" onclick="onListItemClicked(${item.id})">
        <div class="title">${item.title}</div>
        <div class="content">${item.content}</div>
        <div class="times">
          <div>首发于：${item.created_at}</div>
          <div>更新于：${item.created_at}</div>
        </div>
      </div>`;
      return result;
    }, '<div class="list">') + '</div>';
  }
  await renderPage(ctx, 'home', content);
});

//... 其他逻辑
```

- 在 `router.get('/', ...)`的回调中，我们首先构造出正文部分的 html 内容 `content`，而后将其作为参数传递给 `renderPage` 方法。
- 在 `renderPage` 方法中，如果头信息 `only_content` 的值为 `1`，我们就将 `content` 直接返回，否则根据其传递的 `shell` 类型（此处为 home）来得到 `top shell` 和 `bottom shell` 的内容，并将其与 `content` 合并后返回。

## 总结



> 上文中，我们对 应用 `Shell` 的原理及其实施过程进行了详细说明，它为解决恶劣网络环境下，服务端无法响应或响应缓慢时出现的异常或空白页提供了很好的解决方案。可是，页面请求是否还有别的优化措施呢？当然有，这便是我们下一章将要学习的导航预加载。



# 实战篇4：导航预加载

> 一般情况下，当请求一个包含 Service Worker 的页面，并且此 Service Worker 尚未运行，那么浏览器将会等到 Service Worker 启动之后才会发起导航请求（如下图），也由于受各种因素的影响，Service Worker 的启动时间会有不同程度的延迟，这种延迟将直接导致导航请求的延迟，进而增加了页面的整体渲染时间。

![img](https://user-gold-cdn.xitu.io/2019/10/30/16e19a7e43e6d60c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

上文中我们提到了导航请求，这里我们先简单了解下相关概念，在 `Fetch` 规范中的定义为：请求实体为 `document` 的请求。通俗来讲就是当我们在浏览器的地址栏中输入网址，或通过链接等手段从一个页面跳转到另外一个页面时所发送的请求。由于导航请求响应中的 HTML 负责启动所有脚本、样式、图片等资源的请求，因此任何导航请求的延迟都终将导致空白页问题的出现。

正是为了解决因 `Service Worker` 启动而导致导航请求的延迟问题，`Service Worker` 提供了导航预加载机制，该机制在 `Service Worker` 开始启动时，便立刻发起导航请求，这样 `Service Worker` 启动便能与导航请求并行执行（如下图），从而大大降低了因延迟而导致空白页的几率。

![img](https://user-gold-cdn.xitu.io/2019/10/30/16e19a81c372e747?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 使用



> 导航预加载的使用非常简单，首先在 `Service Worker` 的 `activate` 事件中启用该功能：

```js
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    if (self.registration.navigationPreload) {
      await self.registration.navigationPreload.enable();
    }
  })());
});
```

> 然后在 `Service Worker` 的 `fetch` 事件中将预加载的导航请求响应返回即可：

```js
self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method.toLowerCase() === 'get') {
    event.respondWith((async () => {
      //...其他类型请求处理逻辑
      const preloadResponse = await event.preloadResponse;
      if (preloadResponse) {
        return preloadResponse;
      }
    })());
  }
});
```

- 需要注意的是：如果开启了导航预加载，那么在 `fetch` 事件中必须对 `event.preloadResponse` 进行消费，否则这将导致该请求会被请求两次。
- 导航预加载请求中会携带请求头 `Service-Worker-Navigation-Preload`，且默认值为 `true`，可通过以下方式来修改其默认值：

```js
navigator.serviceWorker.ready.then(registration => {
  return registration.navigationPreload.setHeaderValue(newValue);
});
```

## 与应用 Shell 集成



> 在[应用 Shell 中 (opens new window)](https://juejin.im/book/6844733815944904712/section/6844733816091705358)，我们通过将 top shell、正文信息、bottom shell 等内容拼装在一起的方式来响应页面请求，该方式虽然很大程度上解决了恶劣网络环境下的页面响应问题，但根据上文的论述可以得知，正文信息的请求响应依旧存在着一定程度的延迟，因此本节我们将尝试将两种技术融合在一起使用，以求得到更快速的响应。

```js
function fetchPage(cacheKey, event) {
  //... 根据 cacheKey 获取 shell 类型
  const stream = new ReadableStream({
    start(controller) {
      //... pushStream 函数定义
      (async () => {
        //... top shell 处理逻辑
        let context;
        try {
          context = await event.preloadResponse;
        } catch {
        }
        if (!context) {
          context = await fetch(cacheKey, {
            headers: {
              'only_content': 1
            }
          });
        }
        if (content) {
          await pushStream(content.body);
        } else {
          const errorContent = new Response(
            '<div class="message">网络错误</div>',
            { headers: { 'Content-Type': 'text/html' } }
          );
          await pushStream(errorContent.body);
        }
        //... bottom shell 处理逻辑
        controller.close();
      })();
    }
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/html' }
  });
}

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method.toLowerCase() === 'get') {
    event.respondWith((async () => {
      const cacheKey = new URL(request.url, location).pathname;
      //...其他类型请求处理逻辑
      return fetchPage(cacheKey, event);
    })());
  }
});
```

> 上述代码基于[应用 Shell (opens new window)](https://juejin.im/book/6844733815944904712/section/6844733816091705358)中所展示的代码为基础进行了修改：

- `fetchPage` 方法增加了 `fetch` 事件的 `event` 参数，以便获取导航预加载请求响应（即：`event.preloadResponse`）。
- 在 `fetchPage` 方法中，我们首先尝试获取导航预加载请求响应：

```js
let context;
try {
  context = await event.preloadResponse;
} catch {
}
```

如果导航预加载请求响应出现异常（比如服务器不响应）或响应内容为空，则尝试通过传统的 `fetch` 方法获取正文信息：

```js
if (!context) {
  context = await fetch(cacheKey, {
    headers: {
      'only_content': 1
    }
  });
}
```

> 由于 Service Worker 获得页面的控制权后，所有的页面请求都只需要返回正文部分的信息即可，而导航预加载请求并未携带头信息 'only_content': 1，故我们需要修改服务端代码以适应其变化：

```js
async function renderPage(ctx, type, content) {
  const { headers } = ctx.request;
  if (parseInt(headers['only_content'], 10) === 1 || headers['service-worker-navigation-preload'] === 'true') {
    //.... 返回正文部分
  } else {
    //... 返回整个文档
  }
}
```

## 总结



> 上文中，我们首先对为解决因 Service Worker 启动而导致导航请求延迟问题的导航预加载进行了说明，然后，介绍了如何与应用 Shell 搭配使用来进一步加速页面的渲染。至此，我们完成了预缓存、应用 Shell 及导航预加载的学习，相信大家此刻已经能够很好的处理恶劣网络环境下的页面响应问题。然而在实施这些方案时，往往会发现我们与之打交道最多的便是缓存，那么究竟如何处理缓存的使用与更新这些问题呢？在接下来的章节中将为大家一一讲解。



# 实战篇5: 请求策略

> 在 Service Worker 的 fetch 事件中，我们往往会从本地缓存中构建请求结果从而加速响应，然而有些时候我们又需要通过网络请求获取最新的数据，那么如何决定缓存的使用时机呢？本章将介绍一些常见的请求策略，以便大家能够更容易地控制缓存的使用时机。

![img](https://user-gold-cdn.xitu.io/2019/10/30/16e19aae54d26cde?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

首先从缓存中进行匹配，如果存在相关请求的响应，返回该响应，否则通过网络获取。基本实现如下：

```js
async function fetchFromNetwork(event) {
  const response = await fetch(event.request);
  if (response) {
    const cloneResponse = response.clone();
    event.waitUntil((async () => {
      const cache = await caches.open('cache-name');
      await cache.put(event.request, cloneResponse);
    })());
  }
  return response;
}

self.addEventListener('fetch', event => {
  if (request.method.toLowerCase() === 'get') {
    event.respondWith((async () => {
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) {
        return cachedResponse;
      }
      return await fetchFromNetwork(event);
    })());
  }
});
```

> 该策略主要适用于请求资源不经常变更的情况，比如：Shell 文件、图片、脚本等。

![img](https://user-gold-cdn.xitu.io/2019/10/30/16e19ab201616ac8?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 首先通过网络获取，如果请求异常，则从缓存中获取。基本实现如下：

```js
self.addEventListener('fetch', event => {
  if (request.method.toLowerCase() === 'get') {
    event.respondWith((async () => {
      try {
        return await fetchFromNetwork(event);
      } catch {
        return await caches.match(event.request);
      }
    })());
  }
});
```

该策略主要用于需要频繁更新的资源，比如：资讯、排行榜等。

> 该策略的主要优势是，如果用户处于离线状态，依旧可以为其提供服务，从而为用户提供更好的使用体验。

![img](https://user-gold-cdn.xitu.io/2019/10/30/16e19ab54b688c84?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 所有请求都从缓存中获取，基本实现如下：

```js
self.addEventListener('fetch', event => {
  if (request.method.toLowerCase() === 'get') {
    event.respondWith(caches.match(event.request));
  }
});
```

> 该策略的使用场景与缓存优先类似，相对于后者，该策略的主要问题是，如果缓存中不存在相关请求的响应，它将与传统的网络请求一样抛出异常，这可能会导致令人失望的用户体验。


![img](https://user-gold-cdn.xitu.io/2019/10/30/16e19ab8a62b7b71?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- 所有请求都从网络中获取，这是浏览器的默认行为，无需在 `Service Worker` 中做任何特殊处理。
- 该策略的使用场景与网络优先类似，相对于后者，该策略的主要问题是，如果请求出现异常，这可能会导致令人失望的用户体验。

### 先缓存后网络

![img](https://user-gold-cdn.xitu.io/2019/10/30/16e19abc261638fa?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 该策略为缓存优先的升级版，它与后者的唯一区别是，如果在缓存中匹配到相关请求的响应，在返回该响应的同时依旧会发起网络请求，并更新相关缓存。基本实现如下：

```js
self.addEventListener('fetch', event => {
  if (request.method.toLowerCase() === 'get') {
    event.respondWith((async () => {
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) {
        try {
          event.waitUntil((async () => {
            await fetchFromNetwork(event);
          })());
        } catch {
        }
        return cachedResponse;
      }
      return await fetchFromNetwork(event);
    })());
  }
});
```

> 该策略适用于任何类型的资源，其最为常见的一个场景是，假设一个处于滚动的列表，为了不让用户感觉到因请求最新数据而导致的间断，我们可以使用该策略快速返回缓存版本的数据，当滚动停止时，便可以用得到的最新数据替换展示在用户面前的内容。

## 总结



> 上文中，我们讨论了常见的请求策略，它为我们如何决定使用缓存提供了理论基础。很多情况下，我们不必为某一个请求选择一个具体的策略，而是根据其特点综合使用多种策略，比如[示例 (opens new window)](https://github.com/nanjingboy/pwa-demos/blob/master/part-2/client/sw.js)：

```js
async function fetchPageContent(cacheKey, event) {
  try {
    const response = await fetch(cacheKey, {
      headers: {
        'only_content': 1
      }
    });
    if (response) {
      const cloneResponse = response.clone();
      event.waitUntil((async () => {
        await setCache(runtimeCacheName, cacheKey, cloneResponse);
      })());
    }
    return response;
  } catch {
    return await getCache(runtimeCacheName, cacheKey);
  }
}

function fetchPage(cacheKey, event) {
  //... 根据 cacheKey 获取 shell 类型
  const stream = new ReadableStream({
    start(controller) {
      //... pushStream 函数定义
      (async () => {
        const top = await getCache(precacheName, `/shell/${shellType}_top.html`);
        await pushStream(top.body);
        const content = await fetchPageContent(cacheKey, event);
        await pushStream(content.body);
        const bottom = await getCache(precacheName, `/shell/${shellType}_bottom.html`);
        await pushStream(bottom.body);
        controller.close();
      })();
    }
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/html' }
  });
}
```

> 在 `fetchPage` 中，shell 文件（`top` 和 `bottom`）的获取使用了仅使用缓存策略，正文信息（`content`）的获取使用了网络优先策略（通过调用 `fetchPageContent`）



# 实战篇6： 缓存置换策略

> 到这里，相信大家已经能够熟练运用缓存来加速甚至避免网络请求，然而浏览器为每个应用所分配的存储空间是有限的，因此我们往往需要删除部分缓存来释放存储空间，至于需要删除哪些缓存，这正是本章需要讲解的内容。

> 由于 `CacheStorage` 是针对请求/响应类型对象的存储方案，它适用于网址可寻址（比如脚本、样式、图片、HTML 等）资源，基于此我们将使用 IndexedDB 来存储并处理缓存的过期信息，下文中所使用的类 DB 为 IndexedDB API 的简单封装，具体代码可在示例中获得，为节省篇幅，此处不再列出。

## 常见算法



### FIFO

> 该算法的核心思想是：如果一个数据最先加入缓存中，那么在存储空间不足时应该删除加入时间较久远的数据。

![img](https://user-gold-cdn.xitu.io/2019/11/2/16e29dac4e1bbbb0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

代码实现如下：

```js
class CacheExpirationDB extends DB {
  constructor(cacheName, maxAgeSeconds) {
    super('CacheExpiration', 1, event => {
      const db = event.target.result;
      const objStore = db.createObjectStore('CacheExpiration', { keyPath: 'id' });
      objStore.createIndex('timestamp', 'timestamp', { unique: false });
    });
    this._cacheName = cacheName;
    this._maxAgeSeconds = maxAgeSeconds;
  }

  /**
   * 去除 `url` 中的 `hash`（比如将：`/detail/12#hash` 转换为 `/detail/12`）
   */
  _normalizeURL(baseUrl) {
    const url = new URL(baseUrl, location);
    url.hash = '';
    return url.pathname;
  }

  /**
   * 根据 url 生成记录 id
   */
  _getId(url) {
    return `${this._cacheName}|${this._normalizeURL(url)}`;
  }

  async set(url, timestamp) {
    const expireEntries = await this.expireEntries(timestamp);
    await this.write('put', 'CacheExpiration', {
      id: this._getId(url),
      cacheName: this._cacheName,
      url: this._normalizeURL(url),
      timestamp
    });
    return expireEntries;
  }

  async expireEntries(timestamp) {
    const minTimestamp = timestamp - this._maxAgeSeconds;
    const entriesToDelete = await this._transaction(
      'CacheExpiration', 'readonly', (transaction, done) => {
        const entriesToDelete = [];
        const store = transaction.objectStore('CacheExpiration');
        const result = store.index('timestamp').openCursor(null, 'prev');
        result.onsuccess = ({ target }) => {
          const cursor = target.result;
          if (cursor) {
            const record = cursor.value;
            if (record.cacheName === this._cacheName && record.timestamp < minTimestamp) {
              entriesToDelete.push(record);
            }
            cursor.continue();
          } else {
            done(entriesToDelete);
          }
        };
      }
    );

    const urlsDeleted = [];
    for (const entry of entriesToDelete) {
      await this.write('delete', 'CacheExpiration', entry.id);
      urlsDeleted.push(entry.url);
    }
    return urlsDeleted;
  }
}
```

- 方法 set 中：
  - 首先尝试移除时间戳（timestamp）小于指定值的记录，而后将该 url 相关的缓存信息添加到记录中。
  - 返回需要移除的记录信息，以便 `Cache API` 删除具体的缓存。
- 方法 `set`仅需要在设置缓存时调用。
- 方法 `expireEntries` 中，我们需要通过 `timestamp` 索引并以降序的形式来获得记录列表，这样才能保证得到的待删除记录是最老的记录。

> 该算法存在的主要问题是：最先被加入的缓存很可能是被经常访问的，如果将其移除，便会降低缓存命中率，从而造成缓存污染现象。针对此类问题，我们可以使用下面的 LRU 或 LFU 来解决。

### LRU

> 该算法的核心思想是：如果一个数据在最近一段时间内没有被访问，那么在未来它被访问的可能性也很小，故此在存储空间不足时优先删除最久没有被访问到的数据。

![img](https://user-gold-cdn.xitu.io/2019/11/2/16e29db3212a04df?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

代码实现如下：

```js
class CacheExpirationDB extends DB {
  //constructor、_normalizeURL、 _getId 及 expireEntries 的实现与 FIFO 一致，故此省略

  async set(url, timestamp) {
    const id = this._getId(url);
    const entry = await this.read('get', 'CacheExpiration', id);
    if (entry) {
      await this.write('put', 'CacheExpiration', {
        ...entry,
        timestamp
      });
      return [];
    }
    const expireEntries = await this.expireEntries(timestamp);
    await this.write('put', 'CacheExpiration', {
      cacheName: this._cacheName,
      url: this._normalizeURL(url),
      id,
      timestamp
    });
    return expireEntries;
  }
}
```

- 方法 set 中：
  - 如果存在指定 url 的缓存记录，直接更新该记录的时间戳（timestamp），
  - 如果不存在指定 url 的缓存记录，首先尝试移除时间戳（timestamp）小于指定值的记录，而后将该 url 相关的缓存信息添加到记录中，
  - 返回需要移除的记录信息，以便 `Cache API` 删除具体的缓存。
- 方法 `set` 需要在命中缓存以及设置缓存时调用。
- 方法 `expireEntries` 中，我们需要通过 `timestamp` 索引并以降序的形式来获得记录列表，这样才能保证得到的待删除记录是最老的记录。

> 该算法存在的主要问题是：当处理热点数据时，该算法的效率很好，但如果处理偶发或周期性批量操作时依然会因为命中率的降低而造成缓存污染现象，针对此类问题，我们可以使用下面的 LFU 来解决。

### LFU

> 该算法的核心思想是：如果一个数据在最近一段时间内访问次数很少，那么在未来它被访问的可能性也很小，故此在存储空间不足时优先删除访问次数较少的数据。

![img](https://user-gold-cdn.xitu.io/2019/11/2/16e29db71da847c2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

代码实现如下：

```js
class CacheExpirationDB extends DB {
  //_normalizeURL 与 _getId 的实现与 FIFO 一致，故此省略

  constructor(cacheName, maxEntries) {
    super('CacheExpiration', 1, event => {
      const db = event.target.result;
      const objStore = db.createObjectStore('CacheExpiration', { keyPath: 'id' });
      objStore.createIndex('usedCount', 'usedCount', { unique: false });
    });
    this._cacheName = cacheName;
    this._maxEntries = maxEntries;
  }

  async set(url) {
    const id = this._getId(url);
    const entry = await this.read('get', 'CacheExpiration', id);
    if (entry) {
      await this.write('put', 'CacheExpiration', {
        ...entry,
        usedCount: entry.usedCount + 1
      });
      return [];
    }

    const expireEntries = await this.expireEntries();
    await this.write('put', 'CacheExpiration', {
      cacheName: this._cacheName,
      url: this._normalizeURL(url),
      usedCount: 1,
      id
    });
    return expireEntries;
  }

  async expireEntries() {
    const entriesToDelete = await this._transaction(
      'CacheExpiration', 'readonly', (transaction, done) => {
        const entriesToDelete = [];
        let entriesNotDeletedCount = 0;
        const store = transaction.objectStore('CacheExpiration');
        const result = store.index('usedCount').openCursor(null, 'prev');
        result.onsuccess = ({ target }) => {
          const cursor = target.result;
          if (cursor) {
            const record = cursor.value;
            if (record.cacheName === this._cacheName) {
              if (entriesNotDeletedCount >= this._maxEntries) {
                entriesToDelete.push(record);
              } else {
                entriesNotDeletedCount++;
              }
            }
            cursor.continue();
          } else {
            done(entriesToDelete);
          }
        };
      }
    );
    const urlsDeleted = [];
    for (const entry of entriesToDelete) {
      await this.write('delete', 'CacheExpiration', entry.id);
      urlsDeleted.push(entry.url);
    }
    return urlsDeleted;
  }
}
```

- 方法 set 中：
  - 如果存在指定 url 的缓存记录，直接更新该记录的访问次数（usedCount），
  - 如果不存在指定 url 的缓存记录，首先尝试移除访问次数较小的记录，而后将该 url 相关的缓存信息添加到记录中，
  - 返回需要移除的记录信息，以便 Cache API 删除具体的缓存。
- 方法 set 需要在命中缓存以及设置缓存时调用。
- 方法 `expireEntries`中，我们需要通过 `usedCount`索引并以降序的形式来获得记录列表，这样才能保证得到的待删除记录是使用次数较小的记录。
- 一般情况下，该算法的效率高于 LRU，且能够避免偶发或周期性批量操作时因缓存命中率下降而导致的缓存污染现象，但由于该算法需要记录数据的历史访问记录，一旦数据访问模式发生改变，则需要很长的时间来适应新的访问模式，在这段时间中很可能造成缓存污染。

## 运用



> 上一节中，我们介绍了常见的缓存置换算法，本节我们选用 FIFO 算法来对其使用进行说明，主要代码（仅对关键逻辑进行阐述说明，完整代码参见[示例](https://github.com/nanjingboy/pwa-demos/blob/master/part-2/client/sw.js）如下：

```js
async function updateCacheExpirations(cacheName, cacheKey = null) {
  const db = new CacheExpirationDB(cacheName, maxAgeSeconds[cacheName]);
  let deletedKeys;
  if (cacheKey) {
    deletedKeys = await db.set(cacheKey, Date.now());
  } else {
    deletedKeys = await db.expireEntries(Date.now());
  }
  const cache = await caches.open(cacheName);
  for (const deletedKey of deletedKeys) {
    await cache.delete(deletedKey);
  }
}

async function setCache(cacheName, cacheKey, value) {
  const cache = await caches.open(cacheName);
  try {
    await cache.put(cacheKey, value);
    await updateCacheExpirations(cacheName, cacheKey);
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      await updateCacheExpirations(precacheName);
      await updateCacheExpirations(runtimeCacheName);
    }
    throw error;
  }
}

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    //... 添加预缓存信息
    const precacheExpirationDB = new CacheExpirationDB(
      precacheName,
      maxAgeSeconds[precacheName]
    );
    for (const precacheItem of precacheList) {
      await precacheExpirationDB.set(precacheItem, Date.now());
    }
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    //... 其他逻辑
    const cacheNames = await caches.keys();
    for (const cacheName of cacheNames) {
      if (cacheName !== precacheName && /^precache\-\d+$/.test(cacheName)) {
        await caches.delete(cacheName);
        await (new CacheExpirationDB(cacheName, maxAgeSeconds[precacheName])).expireEntries(Infinity);
      }
    }
  })());
});
```

- 在 `install` 事件中初始化预缓存的有效期信息，并在 `activate` 事件中将之前版本的预缓存立刻失效以便释放存储空间。

- 由于

   

  ```
  FIFO
  ```

   

  只有在数据更新时才会设置相关缓存的时间戳，因此动态缓存有效期设置主要集中在

   

  ```
  setCache
  ```

   

  方法中：

  - 尝试设置缓存并调用 `updateCacheExpirations` 方法删除已过期的缓存项。
  - 如果在缓存设置中出现异常，且异常类型为 `QuotaExceededError`（该异常表示已使用的存储空间已经超过了浏览器的限制）时，我们将删除预缓存及运行时缓存中已过期的缓存项，以此来释放存储空间。

- 在 `updateCacheExpirations` 中，我们首先获得符合条件的已过期缓存对象，然后调用 Cache API 删除相关缓存。

## 总结



本章中，我们首先对常见的缓存置换算法进行了讨论：

- `FIFO`：先进先出算法，当缓存空间不足时，优先删除最先加入缓存的数据项，该算法主要适用于实时性较强的数据。
- `LRU`：最近最少使用算法，当缓存空间不足时，优先删除最久没有被访问到的数据，该算法主要适用于热点数据。
- `LFU`：最不常使用算法，当缓存空间不足时，优先删除访问次数较少的数据，该算法主要适用于数据访问模式不会频繁发生变化的数据。

> 然后我们通过实例对 FIFO 算法的应用进行了阐述。由于不存在适用于所有场景的算法，因此我们在实际工作中，需要结合缓存类型、访问模式等因素来选择一个或综合多个算法来灵活地处理所遇到的问题。



# 实战篇7： Service Worker更新

> 当我们使用各种技巧以充分爆发 `Service Worker` 的小宇宙时，往往因忽略其自身的更新问题，从而造成各种意想不到的故障。基于此，本章我们将目光重新回到 `Service Worker` 上，来聊一聊它的更新处理。

## Service Worker 脚本命名



> 现代前端构建体系中，输出的静态资源（脚本、图片、样式等）都以 `[name].[hash].[ext]` 的格式命名（比如：`index.54a427d9cf.js`），这是因为此类文件内容变更的频率非常低，我们可以对其使用强制缓存来避免不必要的网络请求，并且在文件变更之后，能够在页面刷新时得到更新。那么这种成为业界标准的命名是否适用于 Service Worker 脚本呢？我们通过一个例子进行说明：

- 假设我们在 `index.html` 中注册了某版本的 Service Worker（文件名为：`sw.v1.js`），并通过预缓存将 `index.html` 添加到缓存中。
- 当 `Service Worker` 更新后，`index.html`需要注册新版本的 Service Worker（文件名为：`sw.v2.js`），
- 如果我们使用缓存优先或仅缓存策略来响应 `index.html`请求，除非用户手动清除缓存，否则从缓存中得到的 `index.html`中注册的 `Service Worker` 依旧为 `sw.v1.js`，`sw.v2.js` 将永久不会生效。

正是由于以上所述缘由，当我们处理 `Service Worker` 脚本时，一定要保证不同版本的文件名保持一致。

## Service Worker 脚本缓存



> 如果已存在一个版本的 `Service Worker`，那么再次触发其安装的条件是从服务器获取的 `sw.js` 与本地版本存在差异。如果我们对 sw.js 进行缓存，除非用户手动清除缓存或缓存失效，否则新版本的 Service Worker 将永远无法安装。因此，不要对 Service Worker 脚本设置缓存（服务端可通过 `max-age: 0` 响应头来避免缓存）

## 慎用 skipWaiting



> Service Worker 安装成功后，如果已存在一个版本的 Service Worker 且有页面尚未关闭，新版 Service Worker 便会进入等待状态，直到运行旧版本的页面全部关闭或在 install 事件中调用 skipWaiting 方法，新的版本才会进入激活状态。虽然我们可以通过调用 skipWaiting 方法让新版本尽快接管页面控制权，但这种过早的权利交接很可能造成一些意想不到的问题，比如：

假设 `Service Worker` 对请求 `/users/tom` 的响应进行了转换，在旧版本中返回的格式为：

```text
{
  name: 'Tom',
  city: 'NanJing'
}
```

新版本中返回的格式为：

```text
{
  v2Name: 'Tom',
  v2City: 'NanJing'
}
```

> 这样的不一致可能在某些情况下导致应用崩溃且难以复现，这就等于在应用中埋藏了一个不稳定的定时炸弹，所以，除非能够保证同一个页面在两个版本相继处理的情况下依旧能够正常工作，否则尽量避免使用 `skipWaiting` 方法

## 处理更新的正确姿势



> 上文说到滥用 `skipWaiting` 可能会带来意想不到的问题，那如果我们想要新版本的 `Service Worker` 尽快接收控制权，又该如何处理呢？我的建议是将控制权交给用户，比如：

![img](https://user-gold-cdn.xitu.io/2019/11/2/16e29df0a6656e3c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 上图中，当新版本的 `Service Worker`安装成功后，给予用户提示，并让用户自行决定是否进行更新，如果用户确定更新，我们便激活新版本，并在激活成功后给予提示并刷新页面（如下图）。

![img](https://user-gold-cdn.xitu.io/2019/11/2/16e29df324f8d8a8?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

更新提示显示时机代码实现：

```js
export async function initSW() {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.register('/sw.js');
    //... 其他逻辑
    if (registration.waiting) {
      showSwUpdateTip(registration);
    }
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed') {
          setTimeout(() => {
            if (newWorker.state === 'installed') {
              showSwUpdateTip(registration);
            }
          }, 200);
        }
      });
    });
    return registration;
  }
}
```

- Service Worker 注册成功后，如果当前 Service Worker 处于等待状态（通过 `registration.waiting` 是否为非空值判断），则显示更新提示。
- 然后通过监听 `registration` 的 `updatefound` 事件（将在 `registration.installing` 值变化时触发），并在其回调中监听 `registration.installing` 的 `statechange` 事件。
- 在 `statechange` 事件中，如果 `registration.installing` 的状态变为 `installed`，且在 `200` 毫秒（等待以确保 `Service Worker` 在 `install` 事件中没有调用 `skipWaiting` 方法）后，`registration.installing` 的状态仍然为 `installed` 时，显示更新提示。

新版本激活代码实现：

```js
function showSwUpdateTip(registration) {
  toast(
    'info',
    '页面已更新，请点击此处进行更新',
    {
      timeOut: 0,
      onHidden: () => {
        registration.waiting.postMessage('skipWaiting');
      }
    }
  );
}

//sw.js
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
```

- 在 `showSwUpdateTip`方法中，在提示信息被点击的回调中调用 `registration.waiting.postMessage` 方法发送消息给 Service Worker 线程，以通知其激活新版本。
- 在 `sw.js` 文件中，通过监听 `message` 事件，并在 `event.data` 为 `skipWaiting` 时，通过调用 `skipWaiting` 方法来激活新版本。

最后要做的便是通知主线程进行页面刷新：

```js
export async function initSW() {
  if ('serviceWorker' in navigator) {
    //... 其他逻辑
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      toast('success', '页面更新完毕，即将刷新页面', {
        onHidden: () => {
          window.location.reload();
        }
      });
    });
    //... 其他逻辑
  }
}
```

- 首先，监听 `navigator.serviceWorker` 的 `controllerchange` 事件（将在新的 `Service Worker` 获得控制权后触发）。
- 然后，在回调中给予更新成功的提示，并在提示消失后刷新当前页面。

## 总结



> - 本章我们首先对 Service Worker 脚本文件名须保持一致且不能对其进行缓存的原因进行了讨论，然后对 skipWaiting 方法滥用可能导致的问题进行了说明，最后通过实例讨论了如何有效处理 Service Worker 的更新。至此我们已完成了 PWA 实战中所涉及到的常见主题，相信我们已经掌握了：

- 如何通过自定义 Webpack Plugin 实现动态预缓存列表的生成。
- 如何利用应用 Shell、导航预加载来解决恶劣网络环境下可能出现的空白页问题。
- 如何利用请求策略、缓存置换策略来实现缓存的高效利用。
- 如何避免常见的 Service Worker 更新问题。

关于 应用安装、推送通知、后台同步，因已在第一部分中进行了详细说明，故本部分不再重述，具体应用可参见示例代码：

- 应用安装：参见 [client/global/index.js (opens new window)](https://github.com/nanjingboy/pwa-demos/blob/master/part-2/client/global/index.js)。
- 推送通知：参见 [client/global/index.js (opens new window)](https://github.com/nanjingboy/pwa-demos/blob/master/part-2/client/global/index.js)。
- 后台同步：参见 [client/global/index.js (opens new window)](https://github.com/nanjingboy/pwa-demos/blob/master/part-2/client/global/index.js)及 [client/edit/index.js](https://github.com/nanjingboy/pwa-demos/blob/master/part-2/client/edit/index.js)



# Workbox 详解篇1 概述

> 通过前两部分的学习，相信大家已能够熟练运用 PWA 的相关技术来构建高可用的现代 Web 应用。但如果我们仔细分析实战篇示例中 sw.js 的实现，便会发现：

- 在 `install` 和 `activate` 事件中，一般只对静态资源做预缓存处理，且实现逻辑在不同的应用中几乎没有差异。
- 在 `fetch` 事件中，需要对不用类型请求执行不同的请求策略、缓存置换控制，如果要处理的请求类型过多，那么 fetch 事件的实现将变得极其臃肿且不易维护。

> 我们经常将预缓存处理、请求策略、缓存置换等逻辑进行进一步抽象，以解决此类问题。也正是这些原因，本部分我们将进一步学习由 Google 官方推出的 PWA 应用框架 [Workbox (opens new window)](https://github.com/GoogleChrome/workbox)，该框架以配置的形式将我们从繁琐且容易出错的底层 API 中解放出来，以便我们能够更容易且高效地完成 PWA 应用的构建。

在接下来的章节中，我们将详细介绍 `Workbox` 的使用，主要内容包括：

- 基本配置：介绍缓存名称、调试开关、`skipWaiting` 开关等基本信息的配置。
- 预缓存：介绍预缓存在 `Workbox` 中的使用。
- 路由配置：介绍在 `Workbox` 中如何进行路由配置来动态地拦截并处理网络请求。
- 请求 & 缓存置换策略：介绍请求策略、缓存置换机制在 Workbox 中的使用。
- 导航预加载：介绍导航预加载在 `Workbox` 中的使用。
- 可缓存对象：介绍 `Workbox` 确定请求响应是否进行缓存的策略及使用。
- 缓存更新广播：介绍缓存更新后，`Service Worker` 通知页面进行一些处理的机制，及 `Service Worker` 与页面互相通讯的常用技术及适用场景。
- 后台同步：介绍后台同步在 Workbox 中的实现及使用。
- 插件：介绍 Workbox 的插件机制及如何自定义插件。
- `Workbox window`：介绍 Workbox 在页面线程中的使用。
- `Workbox build`：介绍如何使用 `workbox-build` 来生成 `Service Worker`脚本，或生成预缓存列表并将其附加到已有的 `Service Worker` 脚本中。

本部分完整代码仓库为：[github.com/nanjingboy/…(opens new window)](https://github.com/nanjingboy/pwa-demos/tree/master/part-3)

> 注：本部分基于 workbox@4.3.1 进行讲解。



# Workbox 详解篇2 基本配置

> 本章我们将通过以下几个方面对 Workbox 的基本配置进行阐述说明，并以此开启 Workbox 的学习之旅：

- 加载本地 `workbox-sw.js` 文件。
- 模块异步加载问题。
- 调试配置。
- 缓存名称配置。
- 启用 `skipWaiting` 和 `clients.claim`。

## 加载本地 workbox-sw.js 文件



> 由于 `workbox-sw.js` 是 `Workbox` 的入口文件，所以在使用相关功能之前，我们必须加载该文件，比如：

```text
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
```

> 由于网络环境因素导致 Google 的 CDN 往往无法访问，因此我们一般通过本地来加载该文件：

```text
importScripts('/third_party/workbox/workbox-sw.js');

workbox.setConfig({
  modulePathPrefix: '/third_party/workbox/',
  modulePathCb: (moduleName, debug) => {
    return `/third_party/workbox/${moduleName}`
  }
});
```

> 上述代码中，除了将 `importScripts` 中的参数由绝对网络地址转换为相对地址外，我们还调用了 `workbox.setConfig` 方法进行了一些设置，之所以如此，是因为我们在使用 `workbox.strategies` 等模块的时候，`workbox` 内部会首先调用 `importScripts` 方法来加载相关模块代码文件，其参数的构造规则为：

- 如果设置了 `modulePathCb`，则调用该方法并将其返回值作为 `importScripts` 的参数，否则进入下一步，
- 如果设置了 `modulePathPrefix`，则将该属性值与模块名称进行拼接后作为 `importScripts` 的参数，否则将 CDN 的根地址与模块名称进行拼接后作为 importScripts 的参数。

**其中 modulePathCb 的参数为：**

- `moduleName`：所调用的模块名称。
- `debug`：是否使用调试版本，其值取自 `workbox`配置中的 debug 属性（将在下文介绍）。

## 模块异步加载问题



> 上文我们说过，当使用 `workbox.strategies` 等模块的时候，workbox 内部会首先调用 importScripts 方法来加载相关模块代码文件，由于 Service Worker 中的 `importScripts` 方法只能在 `install` 事件中或在 Service Worker 脚本的全局作用域内调用，因此以下调用将会导致问题：

```js
self.addEventListener('fetch', event => {
  if (event.request.url.endsWith('.png')) {
    const cacheFirst = new workbox.strategies.CacheFirst();
    event.respondWith(cacheFirst.makeRequest({request: event.request}));
  }
});
```

可通过以下方式来修复该问题：

```js
workbox.loadModule('workbox-strategies');

self.addEventListener('fetch', event => {
  if (event.request.url.endsWith('.png')) {
    const cacheFirst = new workbox.strategies.CacheFirst();
    event.respondWith(cacheFirst.makeRequest({request: event.request}));
  }
});
```

或：

```js
const { strategies } = workbox;

self.addEventListener('fetch', event => {
  if (event.request.url.endsWith('.png')) {
    const cacheFirst = new strategies.CacheFirst();
    event.respondWith(cacheFirst.makeRequest({request: event.request}));
  }
});
```

> 那在 install 事件中加载相关模块又如何呢？比如：

```js
self.addEventListener('install', event => {
  workbox.loadModule('workbox-strategies');
});

self.addEventListener('fetch', event => {
  if (event.request.url.endsWith('.png')) {
    const cacheFirst = new workbox.strategies.CacheFirst();
    event.respondWith(cacheFirst.makeRequest({request: event.request}));
  }
});
```

> 这样做的后果是肯定会出问题但我们却不知道它何时出现，这是因为：

- 在 Service Worker 没有任何更新的情况下，install 事件只会被调用一次
- 而 Service Worker 线程会在空闲时自行关闭（可能发生在两个事件之间或其他时机），并且线程关闭后，全局变量可能会被销毁（此处为 workbox）,
- 当 Service Worker 线程再次启动后，workbox 对象会被重新初始化，而此时在 fetch 事件中调用 workbox.strategies 会因为违反了 importScripts 的调用规则而导致异常。

> 基于以上原因，且由于 workbox 中的各模块已经为我们悄悄处理了 fetch 等事件，因此使用 workbox.strategies 等模块的最佳实践便是在 Service Worker 脚本的全局作用域内使用。因此以上代码可修改为：

```js
workbox.routing.registerRoute(
  new RegExp('\\.png$'),
  new workbox.strategies.CacheFirst()
);
```

## 调试配置



> Workbox 的所有模块代码均包含调试模式和线上模式，前者相对于后者多了日志输出及参数类型检测功能，通过配置项的 debug 属性来控制加载何种模式的代码，其默认值的设置规则为：如果应用运行在 localhost 上，为 true，否则为 false。

当然，我们也通过以下配置来强行指定需要加载何种模式的代码：

```js
workbox.setConfig({
  debug: <true or false>
});
```

> 必须保证 `workbox.setConfig` 在使用 `workbox` 模块（比如 workbox.routing）之前调用，否则将抛出 `Config must be set before accessing workbox.* modules` 异常。

## 缓存名称配置



> 在 Workbox 中，缓存名称的格式为：`<prefix>-<cache id (precache | runtime | googleAnalytics)>-<suffix>`，默认值分别为：

- 预缓存：`workbox-precache-v2-${scope}`
- 运行时缓存：`workbox-runtime-${scope}`
- Google 分析：`workbox-googleAnalytics-${scope}`

> 其中 scope 的值为我们在 UI 线程中调用 `navigator.serviceWorker.register`时传递的 scope 参数。可通过以下方式修改其默认值：

```js
workbox.core.setCacheNameDetails({
  prefix: 'my-app',
  suffix: 'v1',
  precache: 'install-time',
  runtime: 'run-time',
  googleAnalytics: 'ga',
});
```

## 启用 skipWaiting 和 clients.claim



> 默认情况下，`Workbox` 在 `install`、`activate` 事件中不会调用 `skipWaiting`、`clients.claim` 方法。不启用 `skipWaiting` 的原因我们已经在实战篇：`Service Worker` 更新中讨论过，此处不再重述，而不启用 `clients.claim` 的主要原因是，该方法只有在 Service Worker 被首次注册时才起作用，并且：

- 如果页面在 Service Worker 取得控制权前后执行不同的逻辑，那么便没有启用 clients.claim 的必要。
- 如果页面在 Service Worker 取得控制权前后执行相同的逻辑，由于页面已经渲染完成，且在刷新或跳转后 Service Worker 会自动取得控制权，因此启用 clients.claim 并不会带来多大的性能改善。

> 当然，如果你想要 Workbox 在 `install`、`activate` 事件中调用 `skipWaiting`、`clients.claim` 方法，可通过以下方式启用：

```text
workbox.core.skipWaiting();
workbox.core.clientsClaim();
```

## 总结



> 本章我们对 Workbox 的基本配置进行详细说明，那么接下来，就让我们一起进入 Workbox 预缓存的学习。



# Workbox 详解篇3 预缓存

> 通过实战篇：预缓存可知，在安装阶段将资源进行缓存以便 Service Worker 变为可用后可直接从本地缓存中获取资源的能力，我们称之为预缓存。同时，我们已经对如何通过底层 API 来实现预缓存进行了详细说明，本章我们将学习如何使用 Workbox 来更高效地实现预缓存。

## 基本使用



> `Workbox` 通过调用 `workbox.precaching.precacheAndRoute` 来实现预缓存，比如：

```js
workbox.precaching.precacheAndRoute([
  '/styles/example.ac29.css',
  { url: '/index.html', revision: 'abcd1234' },
], {
  ignoreURLParametersMatching: [/^utm_/],
  directoryIndex: 'index.html',
  cleanUrls: true,
  urlManipulation: ({ url }) => {
    return [URLObject];
  }
});
```

**workbox.precaching.precacheAndRoute 的参数依次为：**

- `entries`：数组类型，用于设置需要缓存的资源列表，其中每一项为字符串或格式为 `{ url: string, revision: string }` 的对象，使用规则为：如果名称中已包含资源的 hash 信息（即符合格式：`[name].[hash].[ext]`），则优先使用字符串，否则使用对象且必须指定 `revision` 属性的值，以便更好地处理资源的更新。
- options：对象类型，相关属性为：
  - `ignoreURLParametersMatching`：用于忽略请求中符合指定规则的查询参数，默认值为 `[/^utm_/]`，即忽略请求中以 `utm_` 开头的请求参数（比如：`/about.html?utm_campaign=abcd` 将使用预缓存 `/about.html` 来进行响应）。
  - `directoryIndex`：默认值为 `index.html`，即以预缓存 `/index.html` 来响应 `/` 的请求
  - `cleanUrls`：当无法从预缓存中获得请求的响应时，是否为请求添加 `.html` 的后缀（比如：`/about` 将使用预缓存 `/about.html` 来进行响应），默认值为 `true`。
  - `urlManipulation`：有些时候，我们可能需要自行匹配请求所对应的预缓存对象，此时便可使用此选项。该选项接收一个格式为 `{ url: URL }` 的对象，返回值为数组，且每一项的值为 `URL` 对象。

> 通过 `workbox.precaching.precacheAndRoute` 方法，我们无需处理 `install`、`activate` 及 `fetch` 事件便可为 `Service Worker` 添加预缓存处理能力，但如果我们对其所提供的默认更新机制（根据资源的 revision 值进行更新）或请求策略（缓存优先）不满意，可通过 `workbox.precaching.PrecacheController` 来自行处理 `install`、`activate` 及 `fetch` 事件，比如：

```js
const precacheController = new workbox.precaching.PrecacheController();
precacheController.addToCacheList([
  '/styles/example.ac29.css',
  { url: '/index.html', revision: 'abcd1234' },
]);
self.addEventListener('install', (event) => {
  event.waitUntil(precacheController.install());
});
self.addEventListener('activate', (event) => {
  event.waitUntil(precacheController.activate());
});
self.addEventListener('fetch', (event) => {
  const cacheKey = precacheController.getCacheKeyForURL(event.request.url);
  event.respondWith(caches.match(cacheKey).then(...));
});
```

## 自动生成预缓存资源列表



> 在实战篇：预缓存中，我们通过实现 webpack 插件 [SWFilePlugin (opens new window)](https://github.com/nanjingboy/pwa-demos/blob/master/part-2/webpack/plugins/SWFilePlugin.js)来自动生成预缓存资源列表，Workbox 也为我们提供了相关插件 [workbox-webpack-plugin (opens new window)](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin)，主要包含：

`GenerateSW`：根据配置为我们自动生成 `Service Worker` 脚本，主要适用于进行预缓存及简单的运行时缓存处理，使用方法如下：

```js
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
  //... 其他配置
  plugins: [
    //... 其他插件
    new GenerateSW({
      swDest: 'sw.js',
      importWorkboxFrom: 'local'
    })
  ]
};
```

> `InjectManifest`：生成预缓存列表并将其附加到已有的 `Service Worker`脚本中去，适用于想要使用[推送通知 (opens new window)](https://juejin.im/book/6844733815944904712/section/6844733816087511047)或更复杂的具有个性化定制功能的场景，使用方法如下：

```js
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  //... 其他配置
  plugins: [
    //... 其他插件
    new InjectManifest({
      swSrc: './client/sw.js',
      swDest: 'sw.js',
      importWorkboxFrom: 'local'
    })
  ]
};
```

> 由于 `InjectManifest` 只会在已有的 `Service Worker` 脚本头部添加以下类似代码：

```js
importScripts("/precache-manifest.6f5c74667aebc611e98f1f6384c686f4.js", "/workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "/workbox-v4.3.1"});
```

> 因此我们需要在已有的 `Service Worker`脚本中自行调用 `workbox.precaching.precacheAndRoute` 方法，相关代码如下：

```text
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
```

## 总结



> 本章我们首先对 `workbox.precaching.precacheAndRoute` 方法的使用进行了详细介绍，利用该方法仅需要通过简单配置便能为 Service Worker 添加预缓存处理能力，然后我们对 `workbox.precaching.PrecacheController`的使用进行了说明，它为我们自行控制预缓存的更新及访问策略提供了可能，最后我们讨论了如何使用 `GenerateSW` 和 `InjectManifest` 插件来自动生成预缓存资源列表。

完成了预缓存的学习，下一章，我们将对路由配置进行讨论。



# Workbox 详解篇4 路由配置

> 通过 `Service Worker` 的 `fetch` 事件可监听页面中的所有请求，因此可通过缓存构建响应，以减少请求的响应时间。`Workbox` 中的 `workbox-routing` 模块为我们提供了便捷的方式来匹配并处理请求，本章我们将对该模块进行详细介绍。

## 基本使用



> 我们通过调用 `workbox.routing.registerRoute` 方法来注册并处理请求，方法参数依次为：

- `capture`：请求匹配规则，类型为字符串、正则表达式、函数或 `workbox.routing.Route`。

- ```
  handler
  ```

  ：请求处理函数，返回值为

   

  ```
  Promise<Response>
  ```

  ，参数为含有以下属性的对象：

  - `url`：匹配到的请求地址，类型为：URL。
  - `event`：触发请求的 [FetchEvent 对象 (opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/API/FetchEvent)，该属性为可选属性。
  - `request`：触发请求的 Request 对象，该属性为可选属性。
  - `params`：请求匹配函数的返回值，类型为非空数组、非空对象或 `undefined`。
  - 注：该参数的值亦可为含有属性 `handle`的对象，且属性 `handle` 的值与参数值为函数时一致。

- `method`：请求方法，值为 `GET`、`HEAD`、`POST`、`PATCH`、`PUT` 或 `DELETE`，默认值为 `GET`。

> 下面我们通过一些示例来介绍 `workbox.routing.registerRoute` 的使用：

1. 当 `capture` 的值为正则表达式时：

```js
workbox.routing.registerRoute(
  new RegExp('/styles/.*\\.css'),
  ({ url, event, request, params }) => Promise.resolve(new Response(...))
);
```

> 示例中，我们注册了 `/styles` 路径下 `css` 文件请求的监听处理，需要注意的是，由于同源策略的影响，此时 `capture` 的值将无法匹配第三方站点的请求，比如：

```text
https://cdn.third-party-site.com/styles/main.css
```

> 如果想要正确匹配第三方资源，只需要保证正则表达式能够与请求 `URL` 的开头相匹配即可，因此 `capture` 的值可修改为：`new RegExp('https://.*/styles/.*\\.css')`

1. 当 `capture` 的值为函数时：

```js
workbox.routing.registerRoute(
  ({ url, event, request }) => true,
  ({ url, event, request, params }) => Promise.resolve(new Response(...))
);
```

> 如果 `capture` 的返回值为 `truthy`，则立刻调用 `handler` 处理函数，如果返回值为非空数组或非空对象，返回值将以 params 的形式传递给 handler 处理函数。函数的参数为含有以下属性的对象：

- `url`：匹配到的请求地址，类型为：`URL`。
- `event`：触发请求的 `FetchEvent`对象，该属性为可选属性。
- `request`：触发请求的 `Request` 对象，该属性为可选属性

1. 当 `capture` 的值为 `workbox.routing.Route` 时：

```js
workbox.routing.registerRoute(
  new workbox.routing.Route(
    ({ url, event, request }) => true,
    ({ url, event, request, params }) => Promise.resolve(new Response(...))
  );
);
```

1. 当 `capture` 的值为 `workbox.routing.Route` 时，参数 `handler`、`method` 将被忽略，故无需设置其值。

> `workbox.routing.Route` 的参数依次为 `match`、`handler` 和 `method`：

- `match` 等同于 `workbox.routing.registerRoute` 方法中的 `capture` 参数（值为函数时）。
- `handler`、`method` 等同于 `workbox.routing.registerRoute`方法中的 `handler`、`method` 参数。

## 全局处理函数



> 上文我们对 `workbox.routing.registerRoute` 方法的使用进行了介绍，然而有时我们可能需要处理未被成功匹配的请求，此时便可通过以下方式来设置默认处理函数：

```js
workbox.routing.setDefaultHandler(({ url, event, request, params }) => {
  return Promise.resolve(new Response(...));
});
```

> 在另外的一些场景下，如果注册的路由抛出异常，可能需要捕获异常并做一些降级处理（比如网络异常后通过缓存构建响应），可通过以下方式进行处理：

```js
workbox.routing.setCatchHandler(({ url, event, request, params }) => {
  return Promise.resolve(new Response(...));
});
```

> 方法 `workbox.routing.setDefaultHandler` 和 `workbox.routing.setCatchHandler` 的参数与上文中所讨论的 `handler` 处理函数的使用一致，此处不再重述。

## 高级使用



> 同预缓存一样，我们不仅可以通过 `workbox.routing.registerRoute` 来快速注册请求响应，也可通过 `workbox.routing.DefaultRouter` 来自行接管 `Service Worker`的 fetch 事件，比如：

```js
const router = new workbox.routing.DefaultRouter();

router.registerRoute(new Route(matchCb, handlerCb));
router.registerRoute(new RegExpRoute(new RegExp(...), handlerCb));

self.addEventListener('fetch', event => {
  const responsePromise = router.handleRequest(event);
  if (responsePromise) {
    event.respondWith(responsePromise);
  } else {
    // 不匹配后的逻辑处理
  }
});
```

> 注：`workbox.routing.DefaultRouter` 的实例方法 `registerRoute` 参数必须为 `workbox.routing.Route` 类型。

## 注意事项



> 由于在 `Workbox` 中，会按照路由注册的先后顺序对请求进行匹配（亦包含通过 `workbox.precaching.precacheAndRoute` 注册的预缓存路由），一旦有路由匹配到该请求，便利用该路由进行处理。对该规则处理不当，很可能会造成意想不到的结果，比如：

```js
workbox.routing.registerRoute(
  new RegExp('/styles/.*\\.css'),
  handlerCb
);

workbox.routing.registerRoute(
  '/styles/example.ac29.css',
  handlerCb1
);
```

> 上例中，我们的本意是想使用 `handlerCb1` 来响应 `/styles/example.ac29.css` 请求，但由于该请求亦能被 `handlerCb` 处理，且此路由优先于 `handlerCb1` 注册，所以实际上请求由 `handlerCb` 进行响应。为避免此类错误的出现，我们应该按照匹配范围从小到大的顺序进行路由规则定义。

## 总结



> 本章我们对 `workbox-routing` 模块的使用及使用过程中可能存在的问题进行了详细介绍，通过该模块，我们具备了拦截并处理页面中所有请求的能力，但仍需利用实战篇中讨论的请求策略、缓存置换等机制来更高效地完成请求的响应，因此下一章，我们将对 Workbox 中的请求策略、缓存置换进行讨论。



# Workbox 详解篇5 请求 & 缓存置换策略

> 在实战篇中，我们对请求策略及缓存置换策略进行了讨论，通过这两个机制我们能够高效地利用本地缓存来提高应用性能及可用性。本章我们将学习这两个机制在 Workbox 中的使用。

## 请求策略



> 在实战篇：请求策略中，我们讨论了五种常见的请求策略，分别为：

- 缓存优先：首先从缓存中进行匹配，如果存在相关请求的响应，返回该响应，否则通过网络获取。
- 网络优先：首先通过网络获取，如果请求异常，则从缓存中获取。
- 仅使用缓存：所有请求都从缓存中获取。
- 仅使用网络：所有请求都从网络中获取。
- 先缓存后网络：缓存优先的升级版，它与后者的唯一区别是，如果在缓存中匹配到相关请求的响应，在返回该响应的同时依旧会发起网络请求，并更新相关缓存。

> Workbox 中的 `workbox-strategies` 模块为我们实现了上述常见策略，相关类分别为：

- 缓存优先：`workbox.strategies.CacheFirst`。
- 网络优先：`workbox.strategies.NetworkFirst`。
- 仅使用缓存：`workbox.strategies.CacheOnly`。
- 仅使用网络：`workbox.strategies.NetworkOnly`。
- 先缓存后网络：`workbox.strategies.StaleWhileRevalidate`。

> 这些类的构造函数皆接收含有以下属性的对象：

- `cacheName`：缓存名称，默认值为 `Workbox` 配置中的运行时缓存名。
- `plugins`: 插件数组列表，在获取或缓存请求时会调用它们的生命周期方法以便执行一些额外操作（比如清空过期缓存）。
- `fetchOptions`：网络请求配置信息，结构与函数 `fetch` 中的 `init` 参数一致（在 `CacheOnly` 中，该属性将会被忽略）。
- `matchOptions`：`CacheQueryOptions` 对象（在 `NetworkOnly` 中，该属性将会被忽略）。
- `networkTimeoutSeconds`：如果对该属性进行了赋值，那么网络会在指定的时间内没有响应时使用本地缓存来进行响应（该属性仅在 `NetworkFirst` 中有效）

上文对 `Workbox` 中常见策略的实现进行了简单介绍，接下来我们来看一下它具体的使用，比如：

```js
workbox.routing.registerRoute(
  '/api/users',
  new workbox.strategies.NetworkFirst({...})
);
```

> 上例中，我们使用了上一章介绍的 `workbox.routing.registerRoute` 方法来拦截请求 `/api/users`，并通过 w`orkbox.strategies.NetworkFirst` 的实例进行响应，结合上一章的学习，我们可以确定上述五个类中必定包含实例方法 handle，故可据此实现自己的请求策略，比如：

```js
class CustomStrategy {
  async handle({ url, event, request, params }) {
    new Response(...);
  }
}

workbox.routing.registerRoute(
  '/api/users',
  new CustomStrategy()
);
```

> 除了将请求策略类的实例作为 `workbox.routing.registerRoute` 方法的 `handler` 参数外，我们也可以在自定义的 `fetch` 事件中直接使用，比如：

```js
self.addEventListener('fetch', (event) => {
  const { pathname } = new URL(event.request.url, location);
  if (pathname === '/api/users') {
    const networkFirst = new workbox.strategies.NetworkFirst();
    event.respondWith(networkFirst.handle({ event }));
  }
});
```

## 缓存置换



在实战篇：缓存置换策略中，我们讨论了三种常见的缓存置换控制算法，分别为：

- `FIFO`：先进先出算法，当缓存空间不足时，优先删除最先加入缓存的数据项。
- `LRU`：最近最少使用算法，当缓存空间不足时，优先删除最久没有被访问到的数据。
- `LFU`：最不常使用算法，当缓存空间不足时，优先删除访问次数较少的数据。

> Workbox 为我们提供了基于 FIFO 算法的缓存置换控制插件：`workbox.expiration.Plugin`，基本使用如下：

```js
workbox.routing.registerRoute(
  '/api/users',
  new workbox.strategies.NetworkFirst({
    cacheName: 'expiration-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20,
        maxAgeSeconds: 24 * 60 * 60 // 1 day
      })
    ]
  })
);
```

> 上例中，我们将 `workbox.expiration.Plugin` 的实例赋值给 `workbox.strategies.NetworkFirst` 构造参数中的 `plugins` 属性，然后在读取或更新缓存时，该插件将自动调用，并按照 `FIFO`算法来清理过期的缓存条目。其参数属性为：

- `maxEntries`：指定缓存名称下（此处为 `expiration-cache`）最多可存储的缓存条目数量。
- `maxAgeSeconds`：请求被添加到缓存之后的有效期，单位为毫秒。

> `workbox.expiration.Plugin` 的使用非常简单，唯一需要注意的是：

- 必须指定 `cacheName` 且值不能与 `Workbox` 运行时缓存名（通过 `workbox.core.cacheNames.runtime` 获得）相同，否则将抛出 `expire-custom-caches-only` 异常。
- 由于 `IndexedDB` 的执行速度较慢，如果一个缓存已经过期，它很可能不会被立即清除，此时应用得到的是已过期的缓存，故为了避免此类情况的发生，我们在使用 `workbox.expiration.Plugin` 时，尽量指定 `maxAgeSeconds` 的值。

> 同理，我们可通过 `workbox.expiration.CacheExpiration` 在自定义的 fetch 事件中处理过期缓存，比如：

```js
const cacheName = 'expiration-cache';
const expirationManager = new workbox.expiration.CacheExpiration(
  cacheName,
  {
    maxEntries: 20,
    maxAgeSeconds: 24 * 60 * 60
  }
);
```

> 代码中，我们创建了 `workbox.expiration.CacheExpiration` 的实例 `expirationManager`，然后便可在读取或更新缓存的时候调用以下方法来清理过期缓存：

```text
await expirationManager.expireEntries();
```

> 在缓存更新时调用以下方法来更新相关缓存的有效时间：

```text
await expirationManager.updateTimestamp(request.url);
```

## 总结



> 本章我们对 Workbox 中的请求策略、缓存置换的使用及注意事项进行了讲解，下一章，我们将讨论缓存相关的下一个主题：导航预加载在 Workbox 中的使用



# Workbox 详解篇6 导航预加载

> 通过实战篇：导航预加载可知，在一个 `Service Worker` 尚未启动的页面中，由于浏览器会等到 Service Worker 启动后才发起导航请求，且 Service Worker 启动可能会存在不同程度的延迟，该延迟将直接导致导航请求的延迟，进而增加了页面的整体渲染时间。为解决该问题，我们可以通过导航预加载机制让 Service Worker 的启动与导航请求并行执行，从而避免因 Service Worker 启动延迟而导致的页面渲染缓慢问题。由于我们已对相关底层 API 的使用进行了详细说明，故本章不再重述，而是直接讨论 Workbox 下导航预加载的使用。

## 基本使用



首先我们需要调用以下方法来启用导航预加载功能：

```text
workbox.navigationPreload.enable();
```

> 然后我们可通过 `workbox.routing.registerNavigationRoute` 方法注册导航请求路由：

```js
workbox.routing.registerNavigationRoute(
  workbox.precaching.getCacheKeyForURL('/single-page-app.html')
);
```

> 上述代码的效果是：当用户访问站点时，将使用预缓存资源 `/single-page-app.html` 来响应所有的导航请求，由于方法 `workbox.routing.registerNavigationRoute` 默认使用预缓存资源进行响应，如果想要自定义响应缓存的来源，可通过以下方式实现：

```js
workbox.routing.registerNavigationRoute(
  'custom-cache-key',
  {
    cacheName: 'custom-cache-name'
  }
);
```

> 有时我们可能只想要 `/single-page-app.html` 来响应部分导航请求，此时可通过设置 `whitelist` 或 `blacklist` 属性来实现，比如：

```js
workbox.routing.registerNavigationRoute(
  workbox.precaching.getCacheKeyForURL('/single-page-app.html'),
  {
    whitelist: [
      new RegExp('/blog/')
    ],
    blacklist: [
      new RegExp('/blog/restricted/')
    ]
  }
);
```

> 通过配置，只有在满足导航请求路径以 `/blog/` 开头且不以 `/blog/restricted/` 开头的情况下，才会使用缓存 `/single-page-app.html` 来响应该请求。

注：属性 `whitelist` 及 `blacklist` 的值为正则表达式数组。

> 使用方法 `workbox.routing.registerNavigationRoute` 注册的导航请求路由采用的是缓存优先的请求策略，如果想要使用其他请求策略，可使用如下方式进行注册：

```js
const strategy = new workbox.strategies.NetworkFirst(...);
const navigationRoute = new workbox.routing.NavigationRoute(strategy, {
  whitelist: [],
  blacklist: []
});
workbox.routing.registerRoute(navigationRoute);
```

也可使用自定义请求处理逻辑，比如：

```js
const handlerCb = ({ url, event, request, params }) => {
  return Promise.resolve(new Response(...));
};
const navigationRoute = new workbox.routing.NavigationRoute(handlerCb, {
  whitelist: [],
  blacklist: []
});
workbox.routing.registerRoute(navigationRoute);
```

## 综合运用



至此，我们完成了 `Workbox` 中预缓存、路由设置、请求策略、缓存置换策略及导航预加载的学习，下面我们将通过具体示例来看一下它们的综合运用（本示例代码仓库为：[github.com/nanjingboy/… (opens new window)](https://github.com/nanjingboy/pwa-demos/tree/master/part-3)）。

首先我们需要使用 [workbox-webpack-plugin (opens new window)](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin)来动态生成预缓存资源列表：

```js
// webpack.config.js
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  //... 其他配置
  plugins: [
    //... 其他插件
    new InjectManifest({
      swSrc: './client/sw.js',
      swDest: 'sw.js',
      importWorkboxFrom: 'local'
    })
  ]
};
```

接下来，在 `client/sw.js` 中注册预缓存路由：

```text
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
```

> `self.__precacheManifest` 的默认值来自通过第一步的 webpack 动态生成的 `precache-manifest.[hash].js` 文件，且在构建时自动生成引入该文件，故无需我们手动处理。

然后，在 `client/sw.js`中启动导航预加载并注册导航请求路由：

```text
workbox.navigationPreload.enable();

const navigationRoute = new workbox.routing.NavigationRoute(workbox.streams.strategy([
  ({ url }) => fetchShell(url, 'top'),
  ({ event }) => fetchPageContent(event),
  ({ url }) => fetchShell(url, 'bottom')
]));
workbox.routing.registerRoute(navigationRoute);
```

> 示例中，我们使用了应用 Shell 架构，而使用 `workbox.routing.registerNavigationRoute` 方法注册的导航路由并不适用于该架构，因此我们使用了上述较为繁琐的方式进行导航路由的注册。

在 `workbox.routing.NavigationRoute` 的构造函数中，我们调用了 `workbox.streams.strategy` 方法，并在其参数中，调用了函数 `fetchShell` 和 `fetchPageContent`，它们的主要实现如下：

```js
async function fetchShell(url, type) {
  const { pathname } = new URL(url, location);
  let shellUrl;
  if (pathname === '/') {
    shellUrl = `/shell/home_${type}.html`;
  } else if (/^\/create|\/edit\/\d+$/.test(pathname)) {
    shellUrl = `/shell/edit_${type}.html`;
  } else if (/^\/detail\/\d+$/.test(pathname)) {
    shellUrl = `/shell/detail_${type}.html`;
  }
  const cache = await caches.open(workbox.core.cacheNames.precache);
  return await cache.match(workbox.precaching.getCacheKeyForURL(shellUrl));
}

async function fetchPageContent(event) {
  const cacheName = 'page-content';
  try {
    const { request: { url } } = event;
    const preloadResponse = await event.preloadResponse;
    if (preloadResponse) {
      const clonePreloadResponse = preloadResponse.clone();
      event.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        await cache.put(url, clonePreloadResponse);
      })());
      return preloadResponse;
    }
  } catch {
  }
  const networkFirst = new workbox.strategies.NetworkFirst({
    cacheName,
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 24 * 60 * 60
      })
    ],
    fetchOptions: {
      headers: {
        'only_content': 1
      }
    }
  })
  return await networkFirst.handle({ event });
}
```

**在 fetchShell 中：**

- 首先根据请求 URL 得到相关 Shell 文件 的路径；
- 然后通过 `workbox.core.cacheNames.precache` 获得预缓存名，并调用 `caches.open` 打开相关缓存并获得相关实例 cache；
- 最后通过 `workbox.precaching.getCacheKeyForURL` 获得指定资源的 `cache key`，并调用 `cache.match` 获取相关资源并返回。

**在 fetchPageContent 中：**

- 首先尝试从导航预加载请求中获得响应，如果请求成功便缓存并返回相关响应；
- 如果无法从导航预加载请求中获得响应，则使用网络优先策略来获得相关响应。
- 在 fetchPageContent 中，我们使用了模块 `workbox.strategies`和 `workbox.expiration`，且我们已经在[基本配置 (opens new window)](https://juejin.im/book/6844733815944904712/section/6844733816100093965)中讨论过使用 `workbox.*` 模块时需注意模块异步加载的问题，因此需要在 Service Worker 脚本的全局作用域中调用以下方法来避免相关问题：

```text
workbox.loadModule('workbox-strategies');
workbox.loadModule('workbox-expiration');
```

## workbox.streams



> 上文中，我们提到了 `workbox.streams`，该模块是对 `ReadableStream` 的封装，主要有以下方法：

- `isSupported`：用来判断当前浏览器是否支持 `ReadableStream`。
- `concatenate`：该方法通过 `ReadableStream` 来处理所接收的 `Promise<Response|ReadableStream|BodyInit>` 数组，并返回结构为 `{done: Promise, stream: ReadableStream}` 的对象。
- `concatenateToResponse`：该方法是对 `concatenate` 的进一步封装，它将 `concatenate` 的返回值转换成结构为 `{done: Promise, response: Response}` 的对象。
- `strategy`：该方法是对 `concatenateToResponse` 的进一步封装，它接收签名为：`({ url, request, event, params }) => Response|ReadableStream|BodyInit|Promise<Response|ReadableStream|BodyInit>` 的函数数组，并返回一个签名为：`({ url, request, event, params }) => Promise<Response>` 的函数

> `concatenateToResponse` 和 `strategy` 方法均可设置 `headers`信息（通过方法的最后一次参数），默认值为：

```text
{ 'Content-Type': 'text/html' }
```

> 在实际应用中，我们应优先使用 strategy 方法，这是因为：

- 该方法可直接作为 `workbox` 路由的 `handler` 参数。
- 如果浏览器不支持 `ReadableStream`，无需我们做任何判断，该方法将自动降级使用 `Promise.all`。

## 总结



> 本章我们首先对 Workbox 中导航预加载的使用进行了简单介绍，接下来通过一个示例对前面章节中的预缓存、路由设置、请求策略、缓存置换策略及导航预加载进行了复习，最后我们对模块 `workbox.streams` 进行了简单介绍。下一章，我们将对可缓存对象进行讨论。



# Workbox 详解篇7 可缓存对象

> 当我们对运行时资源进行缓存操作时，并没有一个统一标准来指明该资源是有效且可以被缓存的，在 Workbox 中，我们可以使用 `workbox-cacheable-response` 模块，根据 `Response Status Code` 或 `Response Headers` 来决定是否对资源进行缓存操作。基于此，本章我们将讨论 `workbox-cacheable-response` 模块的使用。

## 基本使用



```js
workbox.routing.registerRoute(
  new RegExp('^https://third-party\\.example\\.com/images/'),
  new workbox.strategies.CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
        headers: {
          'Is-Cacheable': 'true',
          'X-Is-Cacheable': 'true'
        }
      })
    ]
  })
);
```

> 上例中，我们通过在 `workbox.strategies.CacheFirst`的 `plugins` 属性中添加 `workbox.cacheableResponse.Plugin` 实例来设置指定路由可被缓存的条件，该路由的响应将在 Response Status Code 为 0 或 200，并且 `Response Headers` 中包含 `Is-Cacheable=true` 或 `X-Is-Cacheable=true` 时进行缓存处理。另外，亦可单独指定 statuses 或 `headers` 属性以达到只根据 `Response Status Code` 或 `Response Headers` 来判断资源是否可被缓存的目的。

> `workbox.cacheableResponse.Plugin` 的使用非常简单，由于它只能在 `workbox.strategies` 模块的 `CacheFirst`、`NetworkFirst` 及 `StaleWhileRevalidate` 中使用，因此我们可直接使用 `workbox.cacheableResponse.CacheableResponse` 在自定义的请求策略中完成资源是否可缓存的逻辑处理，比如：

```js
const cacheable = new workbox.cacheableResponse.CacheableResponse({
  statuses: [0, 200],
  headers: {
    'Is-Cacheable': 'true',
    'X-Is-Cacheable': 'true'
  }
});

const response = await fetch('/path/to/api');
if (cacheable.isResponseCacheable(response)) {
  const cache = await caches.open('api-cache');
  cache.put(response.url, response);
} else {
}
```

## 默认处理



> 在 `workbox.strategies` 模块的 `CacheFirst`、`NetworkFirst` 及 `StaleWhileRevalidate` 中，如果我们未设置 `workbox.cacheableResponse.Plugin`，那么它们将根据以下规则来对响应是否可缓存进行处理：

- 在 `CacheFirst` 中，当 `Response Status Code` 为 `200` 时，则对响应进行缓存处理。
- 在 `NetworkFirst`、`StaleWhileRevalidate`中，当 `Response Status Code` 为 `0` 或 `200` 时，则对响应进行缓存处理。

> 上述设置中，CacheFirst 之所以不认可 Response Status Code 为 0 时的响应，主要是因为：

- 当 `Response Status Code` 为 0 时，即表明该响应为不透明响应，我们无法获得此类响应的任何有效信息，这也意味着我们无法判断该响应是否包含错误信息；
- 如果上述的不透明响应包含错误信息且 `CacheFirst` 认可并缓存该响应，那么除非用户手动清除缓存或缓存过期后被清除，否则用户得到的永远是含有错误信息的响应；
- 而在 `NetworkFirst` 或 `StaleWhileRevalidate` 中，即使在某一刻缓存了含有错误信息的响应，它依旧可以在未来被正确的响应所替换。

## 不透明响应



上文我们提到了不透明响应，本小节将对其就行简单介绍。

> 不透明响应是 Fetch API 标准的一部分，表示在未启用 CORS 时远程服务器对请求的响应。对于此类响应，无论请求成功与否，该响应的 Response Status Code 始终为 0，且我们无法访问 Response 中的任何属性，或调用如 json、text 等构成 Body 的各种方法。它主要作用于以下标签来加载跨域资源：

- `<script>`
- `<link rel="stylesheet">`
- `<img>`、`<video>` 和 `<audio>`
- `<object>`和 `<embed>`
- `<iframe>`

> 如果想要确定页面上的特定资源是否可以使用不透明响应，我们需要检查相关规范。比如，HTML 规范解释了不透明响应可作用于 `<script>` 标签，但依旧有一些限制以防止错误信息泄漏。

- 由于不透明响应的 Response Status Code 始终为 0，且 Cache API 中的 add、addAll 方法不接受不在 2XX 范围内的 Response Status Code，因此我们应使用 put 方法来缓存不透明响应，比如：

```text
const request = new Request('https://third-party-no-cors.com/', { mode: 'no-cors' });
fetch(request).then(response => cache.put(request, response));
```

> 为避免跨域信息的泄漏，浏览器在计算存储空间配额限制时会对不透明响应的大小进行填充（具体大小由浏览器决定，比如 Google Chrome 中每个不透明响应的存储空间最少为 7 MB），因此我们在对不透明响应进行缓存时，应时刻牢记这一点，因为根据响应的实际大小，可能很快就会突破存储空间的配额限制。

## 总结



> 本章我们首先对 `workbox-cacheable-response` 的使用进行了简单介绍，然后讨论了 `workbox.strategies` 模块中 `CacheFirst`、`N`etworkFirst`及`StaleWhileRevalidate`对响应是否可缓存的默认处理，最后我们对不透明响应进行了讨论。下一章，我们将对`Workbox` 缓存更新广播进行讨论。



# Workbox 详解篇8 缓存更新广播

> 为了加快页面渲染，我们常使用先缓存后网络（`StaleWhileRevalidate`）策略将本地缓存作为响应快速返回给用户，同时从网络中获取最新资源并更新缓存，最后通知页面进行更新。由于 Service Worker 与页面运行在不同的线程环境中，故需要一种机制来保证缓存更新后页面能够及时得到通知。在 Workbox 中，我们可以使用 `workbox-broadcast-cache-update`模块来实现这一需求，接下来就让我们一起来探究该模块的使用

## 基本使用



```js
workbox.routing.registerRoute(
  '/articles',
  new workbox.strategies.StaleWhileRevalidate({
    plugins: [
      new workbox.broadcastUpdate.Plugin({
        channelName: 'workbox',
        deferNoticationTimeout: 1000,
        headersToCheck: ['Content-Length', 'ETag', 'Last-Modified']
      })
    ]
  })
);
```

> 上例中，当请求 `/articles` 的缓存更新后，只要新响应头信息中 `Content-Length`、`ETag` 或 `Last-Modified` 的值有任何一个与旧响应头信息中相关属性的值不一致，便会向频道 workbox 广播缓存更新消息。其中 `workbox.broadcastUpdate.Plugin` 构造函数的参数为含有以下属性的对象：

- `channelName`：频道名称（默认值为 `workbox`）。
- `headersToCheck`：出于效率的考量，Workbox 通过比对前后两个响应的头信息来判断响应是否更新，我们可通过该属性来设置需比对的头信息（默认值为 `content-length`、`etag`和 `last-modified`）。
- `deferNoticationTimeout`：当请求为导航请求，且相关缓存有所更新时，Workbox 会延迟广播直到页面准备妥当（页面可通过调用 `navigator.serviceWorker.controller.postMessage` 发送 `{type: 'WINDOW_READY', meta: 'workbox-window'}` 消息来告知 `Workbox`），同时也为了避免无限制地等待，我们可通过该属性以要求 Workbox 在等待指定时间后，无论是否收到页面通知，都将立即广播更新消息（默认值为 `1000`，单位为毫秒）

> 由于 `workbox.broadcastUpdate.Plugin` 内部使用了 `workbox.broadcastUpdate.BroadcastCacheUpdate`来处理缓存更新广播，因此在自定义的请求策略中，可直接使用它来处理缓存更新广播，比如：

```js
const broadcastUpdate = new workbox.broadcastUpdate.BroadcastCacheUpdate({
  channelName: 'workbox',
  deferNoticationTimeout: 1000,
  headersToCheck: ['Content-Length', 'ETag', 'Last-Modified']
});

const cacheName = 'cacheName';
const url = 'http:/127.0.0.1:8080/articles';
const cache = await caches.open(cacheName);
const oldResponse = await cache.match(url);
const newResponse = await fetch(url);

broadcastUpdate.notifyIfUpdated({
  oldResponse,
  newResponse,
  url,
  cacheName
});
```

> 上例中，我们通过调用 `workbox.broadcastUpdate.BroadcastCacheUpdate` 实例的 `notifyIfUpdated` 方法，以便在缓存更新后广播相关信息。该方法的参数为含有以下属性的对象：

- `oldResponse`：已经缓存的请求响应。
- `newResponse`：新的将要被缓存的请求响应。
- `url`：请求的 URL（字符串，非 URL 类型）。
- `cacheName`：缓存名称。
- `event`：触发请求的 FetchEvent 对象，该属性为可选属性。

> 上文对 Service Worker 中的处理进行了介绍，此处需要牢记：无论是使用 `workbox.broadcastUpdate.Plugin`还是 `workbox.broadcastUpdate.BroadcastCacheUpdate`，由于它们都是根据响应头的差异来判断缓存是否需要更新，因此如果我们将它们作用在不透明响应上，更新广播将永远不会触发。

> 完成了 Service Worker 中的设置，接下来就需要在页面中监听此消息，相关代码如下：

```js
if ('BroadcastChannel' in window) {
  const workboxChannel = new BroadcastChannel('workbox');
  workboxChannel.addEventListener('message',  event => {
    console.log('Receive message from ServiceWorker:', event.data);
  });
} else {
  navigator.serviceWorker.addEventListener('message', event => {
    console.log('Receive message from ServiceWorker:', event.data);
  });
}
```

> 上例中，如果浏览器支持 BroadcastChannel API，则监听 BroadcastChannel 的 message 事件，否则监听 `navigator.serviceWorker` 的 message 事件，回调参数 event.data 为含有以下属性的对象：

- `type`：消息类型，值为常量 `CACHE_UPDATED`。
- `meta`：元属性，值为常量 `workbox-broadcast-cache-update`。
- `payload`：缓存相关信息，值为含有以下属性的对象：
- `cacheName`：缓存名称。
- `updatedUrl`：已更新的缓存地址（字符串，非 URL 类型）

## 消息总线



> 上文提到了 `BroadcastChannel`，通过它我们可以实现 `Service Worker` 与页面的相互通信，当然也可使用 `postMessage`或 `MessageChannel` 来实现此功能。究竟这三种技术有何区别？它们各自的适用场景又该如何？本节将为一一为大家进行介绍。

### postMessage

> 通过 postMessage 可实现不同窗口（比如：iframe、WebWorker 或 ServiceWorker）间的相互通信。同时，由于该方法允许来自不同源的脚本进行有效且安全地通信，它也常作为跨域通信的有效解决方案。此方法的使用如下：

```text
otherWindow.postMessage(message, targetOrigin, transferList);
```

- `otherWindow`：其他窗口的一个引用，比如 `iframe` 的 `contentWindow`属性、执行 `window.open` 所返回的窗口对象、已命名或数值索引的 `window.frames`、`Worker` 或 `ServiceWorker`实例。
- `message`：需要发送给 `otherWindow` 的数据，其值为可被结构化克隆算法序列化的所有类型。
- `targetOrigin`：通过该参数可控制消息能够发送给哪些窗口；只有目标窗口的协议、Host 地址及端口号与该参数的值完全相同，此窗口才能接收信息；当值为 * 时，则表明任何窗口都可以接收信息。
- `transferList`：可选参数，`Transferable` 对象数组，这些对象的所有权将转移给消息的接收方，并且在所有权转移之后，消息的发送方将不能再操作该对象，否则将抛出异常。

> 于 Worker 或 ServiceWorker 与注册它的页面遵循同源策略，因此它们的实例方法 postMessage 的参数与上述有所差异，依次为 message 和 transferList，类型则与上述相关参数相同。

目标窗口可通过监听 message 事件来接收消息：

```text
addEventListener('message', event => {
  // doSomething...
});
```

> 回调参数 event 为 [MessageEvent 对象 (opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageEvent)，主要包含以下属性：

- `data`：从其他窗口发送的消息对象。
- `origin`：消息发送窗口的源。
- `source`：消息发送窗口的引用。

### MessageChannel

> 除了 postMessage，我们也可以使用 MessageChannel 来实现不同窗口间的相互通信，它与 postMessage 的主要差异有：

- `MessageChannel` 的通信双方必须遵循同源策略，不能进行跨域通信。
- `MessageChannel` 无需维护通信双方实体的引用。
- `MessageChannel` 的使用如下所示：

```js
// index.html
const messageChannel = new MessageChannel();
messageChannel.port1.onmessage = event => {
  // doSomething...
};
navigator.serviceWorker.controller.postMessage(
  'Message from UI thread',
  [messageChannel.port2]
);

//sw.js
self.addEventListener('message', event => {
  // doSomething...
  event.ports[0].postMessage('Message back from Service Worker');
});
```

> 上例中，我们在页面中创建了信道实例 messageChannel，然后通过信道的两个端口 messageChannel.port1 和 messageChannel.port2 完成不同窗口的通信。端口的使用规则如下：

- 创建信道的窗口（此处为 index.html）使用端口 port1，并设置此端口的 onmessage 属性来接收另一端口发送的消息;
- 调用 postMessage（此处为 `navigator.serviceWorker.controller.postMessage`）方法将端口 port2 作为参数 `transferList` 的值，以消息的形式发送给另一个窗口（此处为 `sw.js`）；
- 在 `sw.js` 中监听 message 事件，并通过 `event.ports[0]` 来获得从 index.html 传递过来的信道端口，然后便可调用端口的 `postMessage` 方法来发送消息给 `index.html`。

其中：

- `event` 参数为 MessageEvent 对象，主要属性上文已进行说明，此处不再重述。
- `postMessage` 方法的参数依次为 message 和 transferList，具体类型上文已进行说明，此处不再重述。

### BroadcastChannel

> 虽然利用 MessageChannel，我们无需维护通信双方实体的引用便可完成双方的通信，但它依旧存在以下问题：

- 由于通信双方必须持有同一信道的不同端口，所以创建信道的一方必须通过某种方式将端口传递给另一方，这在无形之中增加了代码的复杂度。
- 由于同一通道只有两个端口，如果通信实体大于两个，那么 `MessageChannel` 将无法处理。

我们可以使用 `BroadcastChannel` 来解决上述问题，比如：

```js
//index.html
const broadcastChannel = new BroadcastChannel('workbox');
broadcastChannel.addEventListener('message',  event => {
  //...doSomething
});
broadcastChannel.postMessage('Message from UI thread');

//sw.js
const broadcastChannel = new BroadcastChannel('workbox');
broadcastChannel.addEventListener('message',  event => {
  //...doSomething
});
broadcastChannel.postMessage('Message back from Service Worker');
```

> 上例中，我们在 index.html 和 sw.js 中创建了具有相同名称 workbox 的广播信道实例 broadcastChannel，然后通过调用实例方法 postMessage 来发送消息，并监听实例的 message 事件来接收消息。只要保证信道具有相同的名称，通信的任何一方无需再向另一方传递任何信息，便能接收到发送方发送的消息。基于此，该机制常作为不同窗口通信的首选方案，但它依旧存在以下限制：

- `BroadcastChannel` 的通信双方必须遵循同源策略，不能进行跨域通信。
- 不同于 `MessageChannel`，如果消息接收方在发送方发送消息之后才监听 message 事件，那么接收方将无法获得之前发送的消息。

其中：

- `event` 参数为 MessageEvent 对象，主要属性上文已进行说明，此处不再重述。
- `postMessage` 方法的参数只有 message，具体类型上文已进行说明，此处不再重述。

## 总结



> 本章我们首先对 `workbox-broadcast-cache-update` 模块进行了介绍，通过该模块，我们可以在请求缓存发生更新后，页面主线程能够及时得到通知；然后，我们对不同窗口通信的常见技术进行了介绍：

- `postMessage`：主要用于跨域通信，但通信双方需要各自维护通信另一方实体的引用；
- `MessageChannel`：无需维护通信双方实体的引用，但不能处理跨域通信，通信双方需要各自持有信道的一个端口，也由于一个信道只有两个端口，因此无法处理两个以上通信实体的相互通信；主要用于一对一，且消息接收方在发送方发送消息之后才设置 onmessage 参数时，依旧需要接收到之前发送的消息的场景。
- `BroadcastChannel`：使用方式最为简单，且可以支持任意窗口（大于等于二）的相互通信，但不能处理跨域通信，并且如果消息接收方在发送方发送消息之后才监听 message 事件，那么接收方将无法获得之前发送的消息。

至此，我们完成了 Workbox 中缓存处理相关所有内容的学习，下一章，我们将对 Workbox 的后台同步进行介绍



# Workbox 详解篇9 后台同步

> 通过基础篇：后台同步可知，我们可通过后台同步机制来解决传统 Web 应用所存在的以下问题：

- 页面发起的请求会随着页面的关闭而终止。
- 在离线状态下，很难将用户的网络请求缓存起来，并在网络恢复正常后再次进行请求。
- 从而为用户提供了恶劣网络环境下，无感知事务处理的能力。在该章中我们已对底层 API 的使用进行了详细介绍，故本章不再重述相关细节，而是直接对 Workbox 相关接口进行介绍说明。

## 基本使用



> Workbox 使用 `workbox.backgroundSync.Plugin` 完成后台同步的注册，比如：

```js
workbox.routing.registerRoute(
  '/articles',
  new workbox.strategies.NetworkOnly({
    plugins: [
      new workbox.backgroundSync.Plugin('createArticle')
    ]
  }),
  'POST'
);
```

> 示例中，当 `POST /articles` 请求失败时，Workbox 会自动将该请求添加到后台同步队列 createArticle 中，并在 sync 事件中自动进行重试。其中 `workbox.backgroundSync.Plugin`的参数按照顺序依次为：

- `name`：队列名称，该参数的值必须全局唯一，否则将抛出 `duplicate-queue-name` 异常。

- ```
  options
  ```

  : 配置信息，相关属性为

  - `maxRetentionTime`：请求的最大有效时长（单位为分钟，默认值为七天），如果请求超过所指定的期限，将从队列中移除。
  - `onSync`：`sync` 触发时的回调函数，该回调函数的参数为含有 queue（类型为 `workbox.backgroundSync.Queue` 实例）属性的对象，如不指定将调用 `workbox.backgroundSync.Queue` 实例的 `replayRequests` 方法。若指定该属性的值，如果回调函数处理失败，需要抛出异常，以便浏览器后续继续进行尝试。

> 由于 `workbox.backgroundSync.Plugin`内部使用了 `workbox.backgroundSync.Queue`来管理同步请求队列，因此我们可以使用它来自行控制请求被加入队列的时机，比如

```js
const queue = new workbox.backgroundSync.Queue('createArticle');

self.addEventListener('fetch', event => {
  event.waitUntil(
    fetch(event.request.clone).catch(() => {
      return queue.pushRequest({ request: event.request });
    })
  );
});
```

> 示例中，我们首先定义了 `workbox.backgroundSync.Queue` 实例 `queue`，然后在 fetch 事件中，如果请求出现异常，则调用 queue 的 pushRequest 方法将相关请求添加到同步队列中，之后 sync 事件触发后将自动重试队列中的请求。由于 `workbox.backgroundSync.Queue` 的参数与 `workbox.backgroundSync.Plugin` 一致，故不再重述。

## 同步事件注册



为了启用后台同步，我们在页面中注册了同步事件，主要代码如下：

```js
window.addEventListener('load', function() {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.register('./sw.js').then(function(registration) {
      document.getElementById('submit').addEventListener('click', function() {
        ui.submit(function(name) {
          db.addTodo(name).then(function() {
            registration.sync.register('add-todo');
          });
        });
      });
    });
  } else {
    document.getElementById('submit').addEventListener('click', function() {
      ui.submit(function(name) {
        network.addTodos([{ name: name }]).then(function(todos) {
          ui.render(todos);
        });
      });
    });
  }
});
```

上例主要存在以下问题：

- 为了兼容不支持后台同步的浏览器，我们必须要对每一个网络请求做兼容性处理；
- 由于 Service Worker 线程无法直接访问 DOM，故需先将请求参数缓存在 IndexedDB 中，以便 Service Worker 在 sync 事件中能够成功构建相关请求。这便要求在页面主线程与 Service Worker 线程中所使用 IndexedDB 数据结构必须保持一致，如果一方更新了结构，而另一方尚未更新，则将造成意想不到的问题；
- 也由于后台同步只有在网络发生异常的情况下才能体现出其价值，但对处于稳定网络环境下的用户来说，在真正发起请求之前还要等待：缓存请求参数、注册同步事件、触发 sync 事件等一系列事件，这些不必要的开销累积起来很可能会严重影响用户体验；
- 最后，也是最重要的一点，PWA 所提倡的是以渐进、尽量少入侵的方式来为已有的 Web 应用添加离线处理等各种能力，如在页面中注册同步事件，将要大面积修改代码，明显违背了 PWA 的初衷。

> 基于以上原因，在 Workbox 中，无论是使用 `workbox.backgroundSync.Plugin`，还是 `workbox.backgroundSync.Queue`，我们都无需对页面代码进行任何修改，因此上例代码可简化为：

```js
window.addEventListener('load', function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
  }
  document.getElementById('submit').addEventListener('click', function() {
    ui.submit(function(name) {
      network.addTodos([{ name: name }]).then(function(todos) {
        ui.render(todos);
      });
    });
  });
});
```

> 这是因为 Workbox 在将请求加入同步队列时自动完成了同步事件的注册，如果我们使用 `workbox.backgroundSync.Plugin` 中仅在请求失败时将其加入同步队列的策略，这即能保证稳定网络下的高效率，又能解决网络中断又恢复后的自动重试问题。因此，无论是否使用 Workbox 的后台同步接口，尽量在 Service Worker 线程中，并且在请求异常时注册同步事件。

## 总结



> 本章我们首先对 Workbox 后台同步接口进行了介绍，然后简单讨论了同步事件注册的时机问题，通过 Workbox，我们无需修改页面逻辑便可为已有 Web 应用添加离线事务处理的能力，这也进一步体现了 PWA 中的渐进式思想。下一章，我们将对 Workbox 的插件进行讨论。



# Workbox 详解篇10 插件

> 很多情况下，我们可能需要在获取或更新缓存时执行一些额外操作，Workbox 的插件通过一系列生命周期函数（比如：cacheWillUpdate）为我们提供了可在请求的生命周期内，以操作请求、响应的方式来控制并添加额外行为的机制，本章我们将对其进行详细介绍。

## 内置插件



> Workbox 内置了一些插件以满足我们的日常开发需求，它们分别是：

- `workbox.backgroundSync.Plugin`：用于后台同步；如果网络请求失败，该请求将会被添加到后台同步队列中，并在触发下一个同步事件时重试该请求。
- `workbox.broadcastUpdate.Plugin`：用于广播通知；如果缓存被更新，将在 Broadcast Channel 或通过调用 postMessage 来发送通知给订阅者。
- `workbox.cacheableResponse.Plugin`：用于判断请求是否可以被缓存；通过该插件，可以只缓存满足指定条件的请求响应。
- `workbox.expiration.Plugin`：用于控制缓存的有效期。
- `workbox.rangeRequests.Plugin`：通过该插件，可要求 Service Worker 只返回响应的部分内容。 我们已经在前面的章节中对 `workbox.backgroundSync.Plugin`、`workbox.broadcastUpdate.Plugin`、`workbox.cacheableResponse.Plugin` 及 `workbox.expiration.Plugin` 进行了介绍，此处不再重述，本节的剩余部分，我们将对 `workbox.rangeRequests.Plugin` 的使用进行讨论。

### Range 请求

> 播放音视频时，我们往往需要边播边下载以减少用户等待时间，此时便可在请求中添加 Range 头来告知服务器只返回资源的指定部分，其格式如下：

```text
Range: <unit>=<range-start>-<range-end>
```

- `<unit>`：范围单位（通常为 bytes）。
- `<range-start>`：指定单位下，范围的起始值（类型为整数）。
- `<range-end>`：指定单位下，范围的结束值（类型为整数），如不指定此值，则表示范围的结束值为资源的末尾。

> 如果服务器返回的是 Range 响应，状态码为 206（Partial Content）；如请求不合法，服务器返回的状态码为 416（Range Not Satisfiable）；如果服务器忽略 Range 头，返回整个资源，其状态码为 200。

### workbox.rangeRequests.Plugin

> 当我们使用缓存来响应包含 Range 头的请求时，`Cache API` 将忽略 Range 设置并返回完整的资源，基于此，我们往往使用 `workbox.rangeRequests.Plugin` 来返回资源指定范围的内容。比如：

```js
workbox.routing.registerRoute(
  /\.mp4$/,
  new workbox.strategies.CacheFirst({
    plugins: [
      new workbox.rangeRequests.Plugin()
    ]
  });
);
```

> 同其他内置插件一样，我们可以使用 `workbox.rangeRequests.createPartialResponse` 在自定义的请求策略中处理 Range 请求，比如：

```text
const response = await workbox.rangeRequests.createPartialResponse(request, cachedResponse);
```

> 需要注意的是，参数 `request` 必须包含 `Range` 头，否则将抛出 `No Range header was found in the Request provided.` 异常。

## 自定义插件



我们可以通过创建包含以下方法的对象来构建自定义插件：

- `cacheWillUpdate`：方法签名为：`({request, response, event}) => Promise<Response|null>`，该方法在请求响应将要被缓存时触发，将用此方法的返回值来更新相关请求的缓存（当返回值为 `Promise<null>` 时，则表明不更新相关缓存）。
- `cacheDidUpdate`：方法签名为：`({cacheName, request, oldResponse, newResponse, event}) => Promise<Void>`，该方法在请求响应已经被缓存后触发，一般在该方法中做一些通知或清理过期缓存之类的工作。
- `cacheKeyWillBeUsed`：方法签名为：`({request, mode}) => Promise<Request|string>`，该方法在获取（mode 为 read）或更新（mode 为 write）缓存时触发，将用此方法的返回值作为缓存的键值来执行缓存操作。
- `cachedResponseWillBeUsed`：方法签名为：`({cacheName, request, matchOptions, cachedResponse, event}) => Promise<Response | null>`，该方法在将缓存结果作为请求响应时触发，将用此方法的返回值作为请求的响应。
- `requestWillFetch`： 方法签名为：`({request}) => Promise<Request>`，该方法在 `fetch`函数被调用时触发，可返回一个不同的 Request 对象以达到修改请求参数的目的。
- `fetchDidFail`：方法签名为：`({originalRequest, request, error, event}) => Promise<Void>`，该方法仅在 fetch 函数抛出异常时触发，即使服务器返回错误响应，只要 fetch 调用无异常抛出，该方法将不会触发。其中 `originalRequest` 为 `fetch` 函数的请求参数，request 为 requestWillFetch 方法的返回值。
- `fetchDidSucceed`：方法签名为：`({request, response}) => Promise<Void>`，该方法在 `fetch` 函数被成功调用后触发，即使服务器返回错误响应，只要 fetch 调用无异常抛出，该方法依旧会触发。

> 基于上述方法，我们便可在 Workbox 内置的请求策略中定义自己的插件，比如：

```js
const myPlugin = {
  cacheWillUpdate: async ({ request, response, event }) => {
    return response;
  },
  // ... 其他方法
};

workbox.routing.registerRoute(
  /\.mp4$/,
  new workbox.strategies.CacheFirst({
    plugins: [
      myPlugin
    ]
  });
);
```

## 总结



> 本章我们首先介绍了 Workbox 的内置插件，然后对 `workbox.rangeRequests.Plugin` 的使用进行了详细讨论，最后介绍了如何实现自定义插件。至此，我们完成了 Workbox 在 Service Worker 线程上所有特性的学习，下一章我们将转战 UI 线程，来看一看 Workbox 在页面主线程中为我们带来了哪些惊喜。



# Workbox 详解篇11 Workbox

> 在页面线程中，虽然可以直接使用底层 API 来处理 Service Worker 的注册、更新与通信，但在较为复杂的应用场景下（比如，页面中不同窗口注册不同的 Service Worker），我们往往会因为要处理各种情况而逐步陷入复杂、混乱的深渊，并且，在出现运行结果与预期结果不一致时，我们往往不知所措、不知如何进行排查。

正是因为这些原因，Workbox 提供了运行在页面线程中的 workbox-window 模块，通过该模块，我们可以：

- 更便捷、高效地处理 Service Worker 地注册、更新及通信。
- 通过运行时完善的日志输出（比如 Service Worker 生命周期状态改变），可帮助我们快速定位运行错误；亦可通过日志的提示（比如注册 Service Worker 时，指定了错误的 scope），帮助我们避免犯一些常见错误。
- 接下来，我们将一起学习 workbox-window 模块的使用。

## 基本使用



要使用 `workbox-window`，我们需要通过 npm 来安装相关依赖：

```text
$ npm install --save workbox-window
```

或使用 yarn：

```text
$ yarn add workbox-window
```

然后在代码文件中引入相关模块：

```text
import { Workbox } from 'workbox-window/Workbox.mjs';
```

> 为了在开发环境中 workbox-window 能够输出日志，我们必须从 `workbox-window/Workbox.mjs` 中引入 Workbox 模块，并按照以下方式修改 `webpack.config.js` 文件：

```js
const Terser = require('terser-webpack-plugin');
const { EnvironmentPlugin } = require('webpack');

module.exports = {
  //... 其他配置
  optimization: {
    minimizer: [
      new Terser({
        test: /\.m?js$/
      })
    ]
  },
  plugins: [
    //... 其他插件
    new EnvironmentPlugin({
      NODE_ENV: 'development'
    })
  ]
};
```

> 接下来，我们便可通过以下方式进行 Service Worker 的注册：

```js
if ('serviceWorker' in navigator) {
  const workbox = new Workbox('/sw.js', { scope: '/' });
  workbox.register({ immediate: false });
}
```

> 示例中，我们首先声明了 Workbox 的实例对象 workbox，然后调用其实例方法 register 进行 Service Worker 的注册，其中：

Workbox 构造函数的参数与方法 `navigator.serviceWorker.register` 的参数一样，此处不再重述。

> `workbox.register` 方法的参数为含有 `immediate` 属性的对象，该属性表示是否立即注册 Service Worker，而无需等待页面元素加载完成，默认值为 false。当该属性的值为 false 时，我们无需显式监听页面的 load 事件，因此以下代码：

```js
window.addEventListener('load', () => {
  workbox.register();
});
```

可简化为：

```text
workbox.register();
```

## 更新管理



> 我们可通过监听 `ServiceWorker` 的 statechange 事件、`ServiceWorkerRegistration` 的 `updatefound` 事件以及 `ServiceWorkerContainer` 的 `controllerchange`事件来处理 Service Worker 的更新：

```js
navigator.serviceWorker.register('/sw.js').then(registration => {
  if (registration.waiting) {
    //通知用户有更新，执行更新操作...
  }

  registration.addEventListener('updatefound', () => {
    const newWorker = registration.installing;
    newWorker.addEventListener('statechange', () => {
      if (newWorker.state === 'installed') {
        setTimeout(() => {
          if (newWorker.state === 'installed') {
            //通知用户有更新，执行更新操作...
          }
        }, 200);
      }
    });
  });
});

navigator.serviceWorker.addEventListener('controllerchange', () => {
  //通知用户更新已完成，执行页面刷新操作...
});
```

> 上例中，为了能够准确无误地处理更新，除了要求我们对 Service Worker 生命周期有深刻清晰的认识，也需要我们自行处理可能出现的任何状况，此过程繁琐且易于出错；基于此，workbox-window 在内部封装了这些细节，并通过一些简单明了的事件来帮助开发者便捷、高效地处理 Service Worker 更新问题。

在介绍 workbox-window 的生命周期事件之前，我们先对已注册 Service Worker 及外部 Service Worker 进行简单说明：

> Service Worker 注册成功后，如果后续触发了 updatefound 事件（workbox-window 内部会主动监听该事件），新安装的 Service Worker 只有满足以下任何一个条件后，才会被当作外部 Service Worker，否则为已注册 Service Worker：

- `updatefound` 事件被触发的次数大于一次。
- `updatefound` 事件被触发与 `workbox.register` 被调用的时间差大于 1 分钟。
- 新安装 `Service Worker` 脚本地址与注册的地址不一致。

了解了已注册 Service Worker 及外部 `Service Worker`，下面我们来一起看下 workbox-window 所提供的生命周期事件：

- `installed`：新的 Service Worker 已安装，且新安装的 Service Worker 为已注册 Service Worker 时触发。

- ```
  waiting：
  ```

  - 执行 `workbox.register` 方法时，如果 `registration.waiting` 的值不为空，触发该事件，且事件参数 event 的 `wasWaitingBeforeRegister` 属性值为 `true`。
  - 新的 Service Worker 已安装，且 200 毫秒后（等待以确保 Service Worker 在 install 事件中没有调用 `skipWaiting` 方法）新安装的 Service Worker 状态依旧为 installed，并且新安装的 Service Worker 为已注册 Service Worker 时触发。

- `controlling`：事件 `controllerchange` 被触发，且新激活的 Service Worker 为已注册 `Service Worker` 时触发。

- `activated`：`Service Worker` 已激活，且已激活的 Service Worker 为已注册 Service Worker 时触发。

- `externalinstalled`：新的 Service Worker 已安装，且新安装的 Service Worker 为外部 Service Worker 时触发。

- `externalwaiting`：新的 Service Worker 已安装，且 200 毫秒后（等待以确保 Service Worker 在 install 事件中没有调用 skipWaiting 方法）新安装的 Service Worker 状态依旧为 installed，并且新安装的 Service Worker 为外部 Service Worker 时触发。

- `externalactivated`：新的 Service Worker 已激活，且新激活的 Service Worker 为外部 Service Worker 时触发。

> 了解了 workbox-window 的生命周期事件，我们便可以按照以下方式修改前文所述的 Service Worker 更新示例：

```js
const workbox = new Workbox('/sw.js');
workbox.addEventListener('waiting', event => {
  //通知用户有更新，执行更新操作...
});
workbox.addEventListener('externalwaiting', event => {
  //通知用户有更新，执行更新操作...
});

workbox.addEventListener('activated', event => {
  if (event.isUpdate) {
    //通知用户更新已完成，执行页面刷新操作...
  }
});
workbox.addEventListener('externalactivated', event => {
  //通知用户更新已完成，执行页面刷新操作...
});
workbox.register();
```

示例中，我们需要注意以下两点：

> 由于在执行 `workbox.register` 方法时，如果 `registration.waiting`的值不为空，便会在当前调用栈为空时立即触发 waiting 事件，如要捕获此刻的 `waiting` 事件，应在 `workbox.register` 执行之前注册事件监听。

由于在首次注册 Service Worker 时亦会触发 activated 事件，因此需要通过 event.isUpdate 判断来避免首次注册时执行不必要的逻辑。

## 通信管理



> 我们可以调用 `workbox.messageSW` 方法向 Service Worker 发送消息，并以 `Promise` 返回值的形式得到 Service Worker 的响应，比如：

```js
//sw.js
const SW_VERSION = '1.0.0';
self.addEventListener('message', event => {
  if (event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage(SW_VERSION);
  }
});

//index.html
const swVersion = await workbox.messageSW({ type: 'GET_VERSION' });
console.log('Service Worker version:', swVersion);
```

示例中：

- 首先，在 Service Worker 中监听 message 事件，并且当 `event.data.type`的值为 `GET_VERSION` 时，通过 `event.ports[0]` 发送响应给页面；
- 然后，在页面中，我们通过调用 `workbox.messageSW`方法来发送类型为 `GET_VERSION` 的消息，并通过方法的返回值（类型为 Promise）获得 Service Worker 的响应。

> `messageSW` 方法的参数可以是任意类型，但还是建议使用含有以下属性的对象：

- `type`：Service Worker 需要根据该属性的值执行不同的业务逻辑，因此该属性的值需要全局唯一（类型为字符串，单词全部大写，且单词之间用下划线分割）。
- `meta`：主要用于放置一些额外信息，且该信息不属于 payload 的一部分；在 Workbox 中，该属性的值为消息发送方所在模块的名称（比如：`workbox-broadcast-cache-update`），自定义消息时可不指定，或自行指定（类型为字符串）。
- `payload`：需要发送的实际数据（任意类型）。

> 由于 `messageSW` 的实现基于 `MessageChannel（详情参见 Workbox 详解篇：缓存更新广播中的相关讨论），因此在 Service Worker 端必须使用`event.ports[0].postMessage` 来给页面发送响应，如用其他方式或不发送响应，那么 messageSW 的返回值将永远不会 resolve。

除了向 Service Worker 发送消息外，我们还可以通过监听 workbox 的 message 事件来接收 Service Worker 主动发送的消息：

```js
workbox.addEventListener('message', event => {
  //doSomething...
});
```

> 由于 workbox 的 message 事件内部同时监听了通过 postMessage 和 BroadcastChannel（详情参见 Workbox 详解篇：缓存更新广播中的相关讨论）发送的消息，因此在 Service Worker 中如果使用 BroadcastChannel 发送消息，那么 BroadcastChannel 构造参数的值必须为 workbox。

## 总结



> 本章我们首先介绍了 workbox-window 模块的使用；然后介绍了如何通过所提供的生命周期事件来高效地处理 Service Worker 更新问题；最后我们讨论了如何使用 messageSW 给 Service Worker 发送消息、如何接收来自 Service Worker 的消息、页面与 Service Worker 相互通信时的注意事项。

通过本章的学习，相信大家已能轻松应对 Service Worker 注册、更新中所遇到的问题，下一章，我们将讨论 Workbox 最后一个主题：构建。

# Workbox 详解篇12 Workbox Build

在 Workbox 详解篇：预缓存中，我们简单介绍了 workbox-webpack-plugin，本章我们将深入介绍 workbox-webpack-plugin 的底层依赖 workbox-build，通过该模块，我们可以：

- 根据配置，直接生成 Service Worker 脚本；
- 根据配置，生成预缓存列表，并将其附加到已有的 Service Worker 脚本中。
- 接下来，我们将一起探讨 workbox-build 的使用细节。

## generateSW



```text
const { generateSW } = require('workbox-build');

generateSW({
  //... 其他配置
  swDest: 'public/sw.js',
  globDirectory: '.'
}).then(({ count, size, warnings }) => {
  //...doSomething
});
```

> 示例中，我们通过 `workbox-build` 中的 `generateSW` 方法来生成 Service Worker 脚本，该方法的返回值为 `Promise<GenerateSWResult>`，其中 GenerateSWResult 为含有以下属性的对象：

- `count`：预缓存列表中的文件个数。
- `size`：预缓存文件的总尺寸大小，单位为 `byte`。
- `warnings`：构建过程中所产生的警告信息，类型为字符串数组。

**该方法的配置属性为：**

- ```
  swDest
  ```

  ：将要生成 Service Worker 脚本的路径及文件名，如果值为相对路径，那么：

  - 如果运行在 node 环境中，路径相对于当前的工作目录。
  - 如果运行在 webpack 环境中，路径相对于 output 配置中的 path 属性。

- ```
  importWorkboxFrom：Workbox
  ```

  入口文件 workbox-sw.js 的加载路径，可选值为：

  - `cdn`：默认值，将从 `Google Cloud Storage` 中加载 workbox-sw.js，由于国内网络问题，一般不使用该选项。
  - `local`：如使用该选项，在构建过程中会将 Workbox 模块代码拷贝到构建目录中，并从该目录中加载`workbox-sw.js`。
  - `disabled`：如使用该选项，Service Worker 脚本将不会包含加载 `workbox-sw.js`的代码。

- `skipWaiting`：是否在 `install` 事件中调用 `skipWaiting` 方法（`Boolean` 类型，默认值为 `false`），如果该属性的值为 `false`，Service Worker 脚本将包含以下代码：

```js
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
```

- `clientsClaim`：是否在 `activate`事件中调用 `clients.claim` 方法（Boolean 类型，默认值为 false）。

- ```
  runtimeCaching
  ```

  ：运行时缓存配置，类型为对象数组（默认值为

   

  ```
  []
  ```

  ），其中每一项包含以下属性：

  - ```
    urlPatterns
    ```

    ：请求匹配规则，类型为字符串、正则表达式或函数，其中：

    - 值为函数时，用法等同于 [Workbox 详解篇：路由设置中 (opens new window)](https://juejin.im/book/6844733815944904712/section/6844733816104288263)`workbox.routing.registerRoute` 方法的 `capture` 参数。

  - ```
    handler
    ```

    ：请求处理，类型为字符串或函数，其中：

    - 值为字符串时，其值必须为 `CacheFirst`、`CacheOnly`、`NetworkFirst`、`NetworkOnly` 或 `StaleWhileRevalidate`。
    - 值为函数时，用法等同于 `Workbox` 详解篇：路由设置中 `workbox.routing.registerRoute`方法的 `handler` 参数

- `method`：请求方法，值为 `GET`、`HEAD`、`POST`、`PATCH`、`PUT` 或 `DELETE`，默认值为 `GET`。

- ```
  options
  ```

  ：

  ```
  handler
  ```

   

  为字符串时的配置参数，主要属性有：

  - `cacheName`：缓存名称，默认值为 Workbox 配置中的运行时缓存名。
  - `fetchOptions`：网络请求配置信息，结构与函数 fetch 中的 init 参数一致（在 CacheOnly 中，该属性将会被忽略）。
  - `matchOptions`：[CacheQueryOptions (opens new window)](https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions)对象（在 NetworkOnly 中，该属性将会被忽略）。
  - `networkTimeoutSeconds`：如果对该属性进行了赋值，那么网络会在指定的时间内没有响应时使用本地缓存来进行响应（该属性仅在 NetworkFirst 中有效）。
  - `expiration`：插件 `workbox.expiration.Plugin` 配置信息，详情参见：Workbox 详解篇：请求策略 & 缓存置换策略相关内容。
  - `backgroundSync`：插件 `workbox.backgroundSync.Plugin`配置信息，详情参见：Workbox 详解篇：后台同步相关内容。
  - `cacheableResponse`：插件 `workbox.cacheableResponse.Plugin` 配置信息，详情参见：Workbox 详解篇：可缓存对象相关内容。
  - `broadcastUpdate`：插件 `workbox.broadcastUpdate.Plugin` 配置信息，详情参见：Workbox 详解篇：缓存更新广播相关内容。
  - `plugins：自定义插件列表，自定义插件详情参见：Workbox 详解篇：插件相关内容。

- `navigateFallback`：使用该属性的值作为键值，从预缓存中获取指定资源来响应所有的导航请求。

- `navigateFallbackBlacklist`：正则表达式数组，作用等同于 `workbox.routing.registerNavigationRoute` 的 `blacklist` 属性。

- `navigateFallbackWhitelist`：正则表达式数组，作用等同于 `workbox.routing.registerNavigationRoute` 的 `whitelist` 属性。

- `importScripts`：需要加载的脚本列表。

- `ignoreURLParametersMatching`：预缓存配置，用于忽略请求中符合指定规则的查询参数，详情参见：Workbox 详解篇：预缓存相关内容。

- `directoryIndex`：预缓存配置，默认值为 index.html，即以预缓存 `/index.html` 来响应 / 的请求。

- `cacheId`：用于设置缓存名配置中的 prefix 属性。

- `offlineGoogleAnalytics`：是否启用离线 `Google Analytics`（Boolean 类型，默认值为 false）。

- `cleanupOutdatedCaches`：是否添加 `workbox.precaching.cleanupOutdatedCaches()` 调用来清理过期的预缓存项目（Boolean 类型，默认值为 false）。

- `navigationPreload`：是否开启导航预加载（Boolean 类型，默认值为 false），当值为 true 时，需设置 `runtimeCaching` 对导航请求进行处理，且必须消费 `event.preloadResponse`。

- ```
  globPatterns
  ```

  ：能够被加入到预缓存列表的文件匹配模式，类型为字符串模式数组，默认值

  - 在 `workbox-build` 和 `workbox-cli` 下为 `['**/*.{js,css,html}']`。
  - 在 `workbox-webpack-plugin` 下为 `[]`。

- `globDirectory`：文件遍历的起始目录，如果值为相对路径，则相对于当前工作目录，如设置了该属性，除非设置了 `templatedURLs` 属性，否则需同时设置 globPatterns 属性。

- `globFollow`：文件匹配时，是否遵循符号链接规则（Boolean 类型，默认值为 true）。

- `globIgnores`：文件匹配时，需要排除的文件匹配规则列表，默认值为 `['node_modules/**/*']`。

- `globStrict`：文件匹配时，如果目录读取的过程中出现异常，如果值为 true 将抛出异常并终止构建进程，否则将忽略该目录，默认值为 true。

- ```
  templatedURLs
  ```

  ：默认情况下，加入到预缓存列表中每一项 revision 的值为文件的 hash 值，我们可通过该属性改变此默认行为。类型为对象，其中，每一项的键为文件的网络路径，值为：

  - 为字符串时，直接将该字符串的 hash 值作为预缓存文件的 revision 值。
  - 为字符串数组时，将被当作 `globPatterns` 进行文件匹配，将匹配到所有文件的总 hash 值作为预缓存文件的 revision 值。

- `maximumFileSizeToCacheInBytes`：当文件尺寸大于指定大小时，将不会将其加入到预缓存列表中（单位为 byte，默认值为 `2097152`）。

- `dontCacheBustURLsMatching`：类型为正则表达式，默认为空，当文件名符合指定规则时，在将其加入预缓存列表中将不会为该文件设置 revision 值。

- `modifyURLPrefix`：修改预缓存列表中每一项 url 值的前缀，类型为对象，比如：

```js
self.__precacheManifest = [
  {
    "url": "/dist/main.js",
    "revision": "0d12a38a0f7f730d93c6ff98082c6d99"
  }
].concat(self.__precacheManifest || []);
```

如果 `modifyURLPrefix` 配置如下：

```text
modifyURLPrefix: {
  '/dist': ''
}
```

那么上述预缓存列表将被替换成：

```text
self.__precacheManifest = [
  {
    "url": "/main.js",
    "revision": "0d12a38a0f7f730d93c6ff98082c6d99"
  }
].concat(self.__precacheManifest || []);
```

- ```
  manifestTransforms
  ```

  ：通过该属性，可以对预缓存列表进行自定义转换，类型为函数数组，函数签名为

   

  ```
  (Array<ManifestEntry>) => ManifestTransformResult
  ```

  ：

  - ```
    ManifestEntry
    ```

     

    为含有以下属性的对象：

    - `url`：文件地址，类型为字符串。
    - `revision`：文件 hash 值，类型为字符串。

  - ```
    ManifestTransformResult
    ```

     

    为含有以下属性的对象：

    - `manifest`：文件列表，类型为 `ManifestEntry` 数组。
    - `warnings`：警告信息列表，类型为字符串数组。

如果同时设置了 `dontCacheBustURLsMatching`或 `modifyURLPrefix` 属性，那么该属性将在它们两个之后执行。

除了通过 `generateSW` 方法快速生成 Service Worker 脚本外，我们也可通过 generateSWSring 方法来生成 Service Worker 脚本的字符串，使用方法如下：

```js
const { generateSWString } = require('workbox-build');

generateSWString({
  //... 其他配置
  globDirectory: '.',
}).then(({ swString, warnings }) => {
  //...doSomething
});
```

该方法的返回值为 `Promise<GenerateSWStringResult>`，其中 `GenerateSWStringResult` 为含有以下属性的对象：

- `swString`：生成的脚本字符串。
- `warnings`：构建过程中所产生的警告信息，类型为字符串数组。

该方法的配置属性除了没有 swDest 外，其他的与 generateSW 完全相同，此处不再重述。

## injectManifest



> 当需要添加较为复杂（比如：推送通知）的逻辑时，generateSW 或 generateSWString 方法已不能满足我们的需求，此时，可使用 injectManifest 方法来帮助生成预缓存列表，并将其与我们自己实现的 Service Worker 脚本进行合并，使用方法如下：

```text
const { injectManifest } = require('workbox-build');

injectManifest({
  //... 其他配置
  swSrc: 'src/sw.js',
  swDest: 'public/sw.js',
  globDirectory: '.'
}).then(({ count, size, warnings }) => {
  //...doSomething
});
```

该方法的返回值等同于 generateSW 方法的返回值，此处不再重述。其配置属性主要有：

- swSrc：包含自定义逻辑的 Service Worker 脚本的路径及文件名，如值为相对路径，则相对于当前工作目录，并且需要注意的是：
  - 在 node 环境中，脚本中需要包含以下代码：`workbox.precaching.precacheAndRoute([]);`
  - 在 webpack 环境中，脚本中需要包含以下代码：`workbox.precaching.precacheAndRoute(self.__precacheManifest, {});`
- swDest、globDirectory、globFollow、globIgnores、globPatterns、globStrict、templatedURLs、maximumFileSizeToCacheInBytes、dontCacheBustURLsMatching、modifyURLPrefix 及 manifestTransforms 等同于 generateSW 方法的相关属性，此处不再重述

> 同 generateSWString 一样，我们亦可通过 getManifest 方法来获取预缓存列表，使用方法如下：

```text
const { getManifest } = require('workbox-build');

getManifest({
  //... 其他配置
  globDirectory: '.'
}).then(({ manifestEntries, count, size, warnings }) => {
  //...doSomething
});
```

> 该方法的返回值为 `Promise<GetManifestResult>`，其中 GetManifestResult 为含有以下属性的对象：

- `manifestEntries`：预缓存资源列表，类型为 `Array<ManifestEntry>`，ManifestEntry 已在上文中作过说明，此处不再重述。
- `count`：预缓存列表中的文件个数。
- `size`：预缓存文件的总尺寸大小，单位为 byte。
- `warnings`：构建过程中所产生的警告信息，类型为字符串数组。 该方法的配置属性除了没有 swSrc、swDest 外，其他的与 `injectManifest` 完全相同，此处不再重述。

## workbox-webpack-plugin



> 虽然 workbox-webpack-plugin 底层使用了 workbox-build，但在使用的过程中，依旧需要注意以下两点：

- 如果某一 chunk 中包含 workbox-sw 模块的代码，那么亦可将该 chunk 的名称作为 importWorkboxFrom 属性的值。
- 一般情况下，无需配置 `globPatterns`、`globDirectory`、`globFollow`、`globIgnores`、`globStrict`、`templatedURLs`、`maximumFileSizeToCacheInBytes`、`dontCacheBustURLsMatching` 和 `modifyURLPrefix` 属性，这是因为 `workbox-webpack-plugin` 会自动将webpack 打包编译的资源加入到预缓存列表中。这些属性仅用于将不能被 webpack 识别的资源添加到 预缓存列表 中，且 `maximumFileSizeToCacheInBytes`、`dontCacheBustURLsMatching` 和 `modifyURLPrefix` 对 webpack 打包编译的资源无效。

> 相对于 `workbox-build`，`workbox-webpack-plugin`中的 `GenerateSW` 及 InjectManifest 新增了以下配置选项：

- chunks：默认情况下，插件会将所有 chunk 下的资源加入到预缓存列表中，如果只想将指定 chunk 下的资源加入到预缓存列表中，可通过配置该选项实现（类型为字符串数组，每一项为 chunk 名称，默认值为 []）。
- `excludeChunks`：与 chunks 的作用相反，如果配置了该选项，那么设置中指定的 chunk 下的资源将不会被加入到预缓存列表中（类型为字符串数组，每一项为 chunk 名称，默认值为 []）。
- `include`：如果配置了该选项，插件便会只将满足指定规则的资源加入到预缓存列表中（类型为字符串或正则表达式数组），该选项在 `chunks`、`excludeChunks` 之后执行。
- `exclude`：与 `include` 的作用相反，插件只将不满足指定规则的资源加入到预缓存列表中（类型为字符串或正则表达式数组，默认值为 `[/\.map$/, /^manifest.*\.js$/]`），该选项在 `chunks`、`excludeChunks` 之后执行。
- `importsDirectory`：默认情况下，插件会将自动生成的包含预缓存列表信息的脚本文件、Workbox 模块代码（importWorkboxFrom 的值为 local 时才会拷贝）放置到 webpack output 配置中 path 属性所指定的顶层目录下，如果设置了该选项，插件会在顶层目录下创建指定目录，并将前面所述文件放置到该目录下。
- `precacheManifestFilename`：插件会自动生成包含预缓存列表信息的脚本文件，该文件的默认名称为`precache-manifest.[manifestHash].js`，可通过该选项修改其默认名称，但名称中必须包含 `[manifestHash]`。

## 总结



> 本章我们首先对 workbox-build 进行了详细介绍，然后讨论了 workbox-webpack-plugin 与 workbox-build 的差异。通过这些模块，我们既可以直接生成 Service Worker 脚本来满足简单需求，也可通过生成预缓存列表并与现有 Service Worker 脚本合并的方式来满足复杂需求。至此我们已完成了 Workbox 系列整个核心部分的学习，相信到此我们已经掌握了：

- 如何使用 `workbox.precaching.precacheAndRoute` 或 `workbox.precaching.PrecacheController` 进行预缓存处理。
- 如何使用 `workbox.routing.registerRoute` 或 `workbox.routing.DefaultRouter` 进行运行时路由设置。
- 如何使用 `workbox.strategies.*` 及 `workbox.expiration.Plugin`来处理请求策略及缓存置换问题。
- 如何在 Workbox 处理导航预加载及后台同步问题。
- Workbox 中可缓存对象、缓存更新广播及插件的使用。
- 如何通过 Workbox Window 对象来轻松管理 Service Worker 的注册、更新及通信。
- 如何使用 workbox-build 及 `workbox-webpack-plugin` 与现代 Web 构建工具结合来轻松管理 Service Worker 脚本。

