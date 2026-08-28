# Vue 基础

# 开篇：Vue CLI 3 项目构建基础

Vue.js 作为一门轻量级、易上手的前端框架，从入门难度和学习曲线上相对其他框架来说算是占据优势的，越来越多的人开始投入 Vue.js 的怀抱，走进 Vue.js 的世界。那么接下来屏幕前的你不妨一起来和我从零开始构建一个 Vue 项目，体会一下 Vue.js 的精彩绝伦。

## 依赖工具



在构建一个 Vue 项目前，我们先要确保你本地安装了 `Node` 环境以及包管理工具 `npm`，打开终端运行：

```text
# 查看 node 版本
node -v

# 查看 npm 版本
npm -v
```

如果成功打印出版本号，说明你本地具备了 node 的运行环境，我们可以使用 npm 来安装管理项目的依赖，而如果没有或报错，则你需要去 [node 官网 (opens new window)](https://nodejs.org/en/)进行 node 的下载及安装，如图：

![img](https://s.poetries.top/gitee/2020/08/vue/1.png)

左边的版本是推荐安装的稳定版本，也就是目前已经被正式列入标准的版本，而右边的版本是当前最新的版本，该版本包含了一些新的特性，还未被完全列入标准，可能以后会有所变动。这里建议大家安装最新的 node 稳定版进行开发。

## 脚手架



当我们安装完 node 后便可以开始进行后续的构建工作了，那么这里我主要给大家介绍下最便捷的脚手架构建。

### 1. 什么是脚手架

很多人可能经常会听到“脚手架”三个字，无论是前端还是后台，其实它在生活中的含义是为了保证各施工过程顺利进行而搭设的工作平台。因此作为一个工作平台，前端的脚手架可以理解为能够帮助我们快速构建前端项目的一个工具或平台。

### 2. vue-cli

其实说到脚手架，目前很多主流的前端框架都提供了各自官方的脚手架工具，以帮助开发者快速构建起自己的项目，比如 `Vue`、`React` 等，这里我们就来介绍下 Vue 的脚手架工具 `vue-cli`。

vue-cli 经历了几个版本的迭代，目前最新的版本是 3.x，也是本小册构建项目所使用的版本，我们一起来看下其人性化的构建流程：

#### a. 安装

我们可以在终端通过以下命令全局安装 vue-cli：

```text
# 安装 Vue CLI 3.x
npm i -g @vue/cli
```

如果你习惯使用 `yarn`，你也可以：

```text
# 没有全局安装yarn需执行此命令
npm i -g yarn
yarn global add @vue/cli
```

注意因为是全局安装，所以 vue-cli 是全局的包，它和我们所处的项目没有关系。同时我们这里介绍的 CLI 版本是最新的 3.x，它和 2.x 版本存在着很大的区别，具体的讲解会在后续章节中进行介绍。

#### b. 构建

安装完 vue-cli 后，我们在你想要创建的项目目录地址下执行构建命令：

```text
# my-project 是你的项目名称
vue create my-project
```

执行完上述命令后，会出现一系列的选择项，我们可以根据自己的需要进行选择，流程图如下：

![img](https://s.poetries.top/gitee/2020/08/vue/2.png)

如果你只想构建一个基础的 Vue 项目，那么使用 `Babel`、`Router`、`Vuex`、`CSS Pre-processors` 就足够了，最后选择你喜欢的包管理工具 npm or yarn。

等待构建完成后你便可以运行命令来启动你的 Vue 项目：

```text
# 打开项目目录
cd vue-project

# 启动项目
yarn serve

# or
npm run serve
```

需要注意的是如果启动的时候出现报错或者包丢失等情况，最好将 node 或者 yarn （如果使用）的版本更新到最新重新构建。

成功后打开浏览器地址：[http://localhost:8080/ (opens new window)](http://localhost:8080/)可以看到如下界面：

![img](https://s.poetries.top/gitee/2020/08/vue/3.png)

#### d. 目录结构

最后脚手架生成的目录结构如下：

```text
├── node_modules     # 项目依赖包目录
├── public
│   ├── favicon.ico  # ico图标
│   └── index.html   # 首页模板
├── src 
│   ├── assets       # 样式图片目录
│   ├── components   # 组件目录
│   ├── views        # 页面目录
│   ├── App.vue      # 父组件
│   ├── main.js      # 入口文件
│   ├── router.js    # 路由配置文件
│   └── store.js     # vuex状态管理文件
├── .gitignore       # git忽略文件
├── .postcssrc.js    # postcss配置文件
├── babel.config.js  # babel配置文件
├── package.json     # 包管理文件
└── yarn.lock        # yarn依赖信息文件
```

根据你安装时选择的依赖不同，最后生成的目录结构也会有所差异。

### 3. 可视化界面

当然，除了使用上述命令行构建外，`vue-cli 3.x` 还提供了可视化的操作界面，在项目目录下我们运行如下命令开启图形化界面：

```text
vue ui
```

之后浏览器会自动打开本地 `8000` 端口，页面如下：

![img](https://s.poetries.top/gitee/2020/08/vue/4.png)

如果你还没有任何项目，那么可以点击创建或者直接导入现有的项目。创建项目和我们使用命令行的步骤基本相同，完全可视化操作，一定程度上降低了构建和使用的难度。项目创建或导入成功后你便可以进入项目进行可视化管理了。

![img](https://s.poetries.top/gitee/2020/08/vue/5.png)

在整个管理界面中，我们可以为自己的项目安装 CLI 提供的插件，比如安装 `@vue/cli-plugin-babel` 插件，同时我们也可以配置相应插件的配置项，进行代码的编译、热更新、检查等。详细的操作大家可以自己进行手动尝试，相信你会发现意想不到的惊喜。

## 你还需要了解什么



上方我们用 vue-cli 成功生成了一个最基础的 Vue 项目，麻雀虽小，五脏俱全，但是想要让麻雀飞起来，我们还要不断的给它进行拓展训练，那么我们还需要了解什么呢？

![img](https://s.poetries.top/gitee/2020/08/vue/6.png)

以上这些内容（包含但不限于）将会在本小册的接下来几章进行详细的讲解，你准备好了吗？

## 结语



本文主要讲述了使用 vue-cli 脚手架进行 Vue 项目构建的基本知识，从构建的流程中我们不难发现 Vue 提供给了我们一套非常灵活可配置的工具，其小巧而不乏大匠的魅力不言而喻。希望大家能够从构建开始，逐渐领略 Vue.js 的匠心，激发自己的对 Vue 的兴趣。

# 构建基础篇 1：你需要了解的包管理工具与配置项

任何一个项目的构建离不开工具和统一的管理标准，在项目开发和维护过程中，我们需要了解安装包的相应工具和配置文件，以此来有效的进行项目的迭代和版本的更新，为项目提供基本的运行环境。本文将详细介绍构建 Vue.js 项目相关的依赖包安装工具和相应的配置文件，为大家提供参考。

## 介绍



相信大家对于包管理工具的使用一定不会陌生，毕竟它已经成为前端项目中必不可少的一部分，为了照顾部分零基础用户，这里我们做一个简单的介绍。

### 1. npm 与 package.json

npm 是 Node Package Manager 的简称，顾名思义，它是 node 的包管理工具，也是目前世界上最大的开源库生态系统。官方地址为：[https://www.npmjs.com/ (opens new window)](https://www.npmjs.com/)，你可以在里面找到数以万计的开源包。

使用 npm 包下载量统计工具，比如 [npm-start (opens new window)](https://npm-stat.com/)，我们可以查看相应包在一定时间范围内的下载量数据，下面是 `vue-cli` 和 `@vue/cli` 的下载量趋势：

![img](https://s.poetries.top/gitee/2020/08/vue/7.png)

在上篇文章中我们介绍了使用 vue-cli 来构建自己的项目，并生成了相应的目录结构，而在最外层目录中，我们可以看到有 `package.json` 这一文件，该文件便是我们需要了解的包管理文件。

我们先来看一下该文件里面的内容：

```text
{
    "name": "my-project", 
    "version": "0.1.0", 
    "private": true, 
    "scripts": {
        "serve": "vue-cli-service serve",
        "build": "vue-cli-service build",
        "lint": "vue-cli-service lint"
    },
    "dependencies": {
        "vue": "^2.5.16",
        "vue-router": "^3.0.1",
        "vuex": "^3.0.1"
    },
    "devDependencies": {
        "@vue/cli-plugin-babel": "^3.0.0-beta.15",
        "@vue/cli-service": "^3.0.0-beta.15",
        "less": "^3.0.4",
        "less-loader": "^4.1.0",
        "vue-template-compiler": "^2.5.16"
    },
    "browserslist": [
        "> 1%",
        "last 2 versions",
        "not ie <= 8"
    ]
}
```

可以看到该文件是由一系列键值对构成的 JSON 对象，每一个键值对都有其相应的作用，比如 scripts 脚本命令的配置，我们在终端启动项目运行的 `npm run serve` 命令其实便是执行了 scripts 配置下的 serve 项命令 `vue-cli-service serve` ，我们可以在 scripts 下自己修改或添加相应的项目命令。

而 dependencies 和 devDependencies 分别为项目生产环境和开发环境的依赖包配置，也就是说像 `@vue/cli-service` 这样只用于项目开发时的包我们可以放在 devDependencies 下，但像 `vue-router` 这样结合在项目上线代码中的包应该放在 dependencies 下。

详细的package.json文件配置项介绍可以参考：[package.json(opens new window)](https://docs.npmjs.com/files/package.json)

### 2. 常用命令

在简单的了解了 package.json 文件后，我们再来看下包管理工具的常用命令。一般在项目的构建和开发阶段，我们常用的 npm 命令有：

```bash
# 生成 package.json 文件（需要手动选择配置）
npm init

# 生成 package.json 文件（使用默认配置）
npm init -y

# 一键安装 package.json 下的依赖包
npm i

# 在项目中安装包名为 xxx 的依赖包（配置在 dependencies 下）
npm i xxx

# 在项目中安装包名为 xxx 的依赖包（配置在 dependencies 下）
npm i xxx --save

# 在项目中安装包名为 xxx 的依赖包（配置在 devDependencies 下）
npm i xxx --save-dev

# 全局安装包名为 xxx 的依赖包
npm i -g xxx

# 运行 package.json 中 scripts 下的命令
npm run xxx
```

比较陌生但实用的有：

```text
# 打开 xxx 包的主页
npm home xxx

# 打开 xxx 包的代码仓库
npm repo xxx

# 将当前模块发布到 npmjs.com，需要先登录
npm publish
```

相比 npm，[yarn (opens new window)](https://yarnpkg.com/zh-Hans/)相信大家也不会陌生，它是由 facebook 推出并开源的包管理工具，具有速度快，安全性高，可靠性强等主要优势，它的常用命令如下：

```text
# 生成 package.json 文件（需要手动选择配置）
yarn init

# 生成 package.json 文件（使用默认配置）
yarn init -y

# 一键安装 package.json 下的依赖包
yarn

# 在项目中安装包名为 xxx 的依赖包（配置在 dependencies 下）,同时 yarn.lock 也会被更新
yarn add xxx

# 在项目中安装包名为 xxx 的依赖包（配置在配置在 devDependencies 下）,同时 yarn.lock 也会被更新
yarn add xxx --dev

# 全局安装包名为 xxx 的依
yarn global add xxx

# 运行 package.json 中 scripts 下的命令
yarn xxx
```

比较陌生但实用的有：

```text
# 列出 xxx 包的版本信息
yarn outdated xxx

# 验证当前项目 package.json 里的依赖版本和 yarn 的 lock 文件是否匹配
yarn check

# 将当前模块发布到 npmjs.com，需要先登录
yarn publish
```

以上便是 npm 与 yarn 包管理工具的常用及实用命令，需要注意的是，本小册的讲解将会优先使用 yarn 命令进行包的管理和安装。

### 3. 第三方插件配置

在上方的 package.json 文件中我们可以看到有 browserslist 这一配置项，那么该配置项便是这里所说的第三方插件配置，该配置的主要作用是用于在不同的前端工具之间共享目标浏览器和 Node.js 的版本：

```text
"browserslist": [
    "> 1%", // 表示包含所有使用率 > 1% 的浏览器
    "last 2 versions", // 表示包含浏览器最新的两个版本
    "not ie <= 8" // 表示不包含 ie8 及以下版本
]
```

比如像 [autoprefixer (opens new window)](https://www.npmjs.com/package/autoprefixer)这样的插件需要把你写的 css 样式适配不同的浏览器，那么这里要针对哪些浏览器呢，就是上面配置中所包含的。

而如果写在 autoprefixer 的配置中，那么会存在一个问题，万一其他第三方插件也需要浏览器的包含范围用于实现其特定的功能，那么就又得在其配置中设置一遍，这样就无法得以共用。所以在 package.json 中配置 browserslist 的属性使得所有工具都会自动找到目标浏览器。

当然，你也可以单独写在 .browserslistrc 的文件中：

```text
# Browsers that we support 

> 1%
last 2 versions
not ie <= 8
```

至于它是如何去衡量浏览器的使用率和版本的，数据都是来源于 [Can I Use (opens new window)](https://caniuse.com/)。你也可以访问 [http://browserl.ist/ (opens new window)](http://browserl.ist/)去搜索配置项所包含的浏览器列表，比如搜索 `last 2 versions` 会得到你想要的结果，或者在项目终端运行如下命令查看：

```text
npx browserslist
```

除了上述插件的配置，项目中常用的插件还有：babel、postcss 等，有兴趣的同学可以访问其官网进行了解。

### 4. vue-cli 包安装

在上述的教程中，我们使用 npm 或 yarn 进行了包的安装和配置，除了以上两种方法，vue-cli 3.x 还提供了其专属的 `vue add` 命令，但是需要注意的是该命令安装的包是以 @vue/cli-plugin 或者 vue-cli-plugin 开头，即只能安装 Vue 集成的包。

比如运行：

```text
vue add jquery
```

其会安装 `vue-cli-plugin-jquery`，很显然这个插件不存在便会安装失败。又或者你运行：

```text
vue add @vue/eslint
```

其会解析为完整的包名 `@vue/cli-plugin-eslint`，因为该包存在所以会安装成功。

同时，不同于 npm 或 yarn 的安装， `vue add` 不仅会将包安装到你的项目中，其还会改变项目的代码或文件结构，所以安装前最好提交你的代码至仓库。

另外 vue add 中还有两个特例，如下：

```text
# 安装 vue-router
vue add router

# 安装 vuex
vue add vuex
```

这两个命令会直接安装 vue-router 和 vuex 并改变你的代码结构，使你的项目集成这两个配置，并不会去安装添加 vue-cli-plugin 或 @vue/cli-plugin 前缀的包。

## 结语



不积跬步无以至千里，不积小流无以成江海。本文主要介绍了在 Vue 项目构建前期需要了解的包管理工具与配置的知识点，只有了解了基本的工具使用才能熟练的对项目进行按需配置，希望大家在接下来的学习中能够学以致用，付诸实践。

## 思考 & 作业



- 文章中使用的一些 npm 包名为什么要用 `@` 开头？
- 除了文章中介绍的 `browserslist` 这样的配置项可以写在单独的文件中外，还有哪些常用的配置项可以这样操作？又是如何配置的？
- Vue CLI 3 还集成了哪些包，可以通过 `vue add` 命令安装？

# 构建基础篇 2：webpack 在 CLI 3 中的应用

webpack 作为目前最流行的项目打包工具，被广泛使用于项目的构建和开发过程中，其实说它是打包工具有点大材小用了，我个人认为它是一个集前端自动化、模块化、组件化于一体的可拓展系统，你可以根据自己的需要来进行一系列的配置和安装，最终实现你需要的功能并进行打包输出。

而在 Vue 的项目中，webpack 同样充当着举足轻重的作用，比如打包压缩、异步加载、模块化管理等等。如果你了解 webpack 那么相信本文会让你更了解其在 Vue 中的使用，如果你是一个 webpack 小白，那么也没事，相信你会很容易的了解它在项目中的配置和功能。

## webpack 的使用



### 1. 与 vue-cli 2.x 的差异

如果你使用过 vue-cli 2.x，那么你应该了解其构建出的目录会包含相应的 webpack 配置文件，但是在 vue-cli 3.x 中你却见不到一份关于 webpack 的配置文件，难道 3.x 抛弃了 webpack？其实不然，3.x 提供了一种开箱即用的模式，即你无需配置 webpack 就可以运行项目，并且它提供了一个 vue.config.js 文件来满足开发者对其封装的 webpack 默认配置的修改。如图：

![img](https://s.poetries.top/gitee/2020/08/vue/8.png)

### 2. vue.config.js 的配置

通过上方新老版本的对比，我们可以清晰的看出 vue.config.js 的配置项结构，如果你构建的项目中没有该文件，那么你需要在根目录手动创建它。下面我们就来介绍一下其常用配置项的功能和用途：

### a. baseurl

在第一节《Vue CLI 3 项目构建基础》中我们通过 vue-cli 3.x 成功构建并在浏览器中打开 `http://localhost:8080/` 展示了项目首页。如果现在你想要将项目地址加一个二级目录，比如：`http://localhost:8080/vue/`，那么我们需要在 vue.config.js 里配置 baseurl 这一项：

```text
// vue.config.js
module.exports = {
    ...
    
    baseUrl: 'vue',
    
    ...
}
```

其改变的其实是 webpack 配置文件中 output 的 `publicPath` 项，这时候你重启终端再次打开页面的时候我们首页的 url 就会变成带二级目录的形式。

### b. outputDir

如果你想将构建好的文件打包输出到 output 文件夹下（默认是 dist 文件夹），你可以配置：

```text
// vue.config.js
module.exports = {
    ...
    
    outputDir: 'output',
    
    ...
}
```

然后运行命令 `yarn build` 进行打包输出，你会发现项目跟目录会创建 output 文件夹， 这其实改变了 webpack 配置中 output 下的 `path` 项，修改了文件的输出路径。

### c. productionSourceMap

该配置项用于设置是否为生产环境构建生成 source map，一般在生产环境下为了快速定位错误信息，我们都会开启 source map：

```text
// vue.config.js
module.exports = {
    ...
    
    productionSourceMap: true,
    
    ...
}
```

该配置会修改 webpack 中 `devtool` 项的值为 `source-map`。

开启 source map 后，我们打包输出的文件中会包含 js 对应的 .map 文件，其用途可以参考：[JavaScript Source Map 详解(opens new window)](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)

### d. chainWebpack

chainWebpack 配置项允许我们更细粒度的控制 webpack 的内部配置，其集成的是 [webpack-chain (opens new window)](https://github.com/mozilla-neutrino/webpack-chain)这一插件，该插件可以让我们能够使用链式操作来修改配置，比如：

```text
// 用于做相应的合并处理
const merge = require('webpack-merge');

module.exports = {
    ...
    
    // config 参数为已经解析好的 webpack 配置
    chainWebpack: config => {
        config.module
            .rule('images')
            .use('url-loader')
            .tap(options =>
                merge(options, {
                  limit: 5120,
                })
            )
    }
    
    ...
}
```

以上操作我们可以成功修改 webpack 中 module 项里配置 rules 规则为图片下的 url-loader 值，将其 limit 限制改为 5M，修改后的 webpack 配置代码如下：

```text
{
    ...
    
    module: {
        rules: [
            {   
                /* config.module.rule('images') */
                test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
                use: [
                    /* config.module.rule('images').use('url-loader') */
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 5120,
                            name: 'img/[name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    }
    
    ...
}
```

这里需要注意的是我们使用了 webpack-merge 这一插件，该插件用于做 webpack 配置的合并处理，这样 options 下面的其他值就不会被覆盖或改变。

关于 webpack-chain 的使用可以参考其 github 官方地址：[https://github.com/mozilla-neutrino/webpack-chain (opens new window)](https://github.com/mozilla-neutrino/webpack-chain)，它提供了操作类似 JavaScript Set 和 Map 的方式，以及一系列速记方法。

![img](https://s.poetries.top/gitee/2020/08/vue/9.png)

### e. configureWebpack

除了上述使用 chainWebpack 来改变 webpack 内部配置外，我们还可以使用 configureWebpack 来进行修改，两者的不同点在于 chainWebpack 是链式修改，而 configureWebpack 更倾向于整体替换和修改。示例代码如下：

```text
// vue.config.js
module.exports = {
    ...
    
    // config 参数为已经解析好的 webpack 配置
    configureWebpack: config => {
        // config.plugins = []; // 这样会直接将 plugins 置空
        
        // 使用 return 一个对象会通过 webpack-merge 进行合并，plugins 不会置空
        return {
            plugins: []
        }
    }
    
    ...
}
```

configureWebpack 可以直接是一个对象，也可以是一个函数，如果是对象它会直接使用 webpack-merge 对其进行合并处理，如果是函数，你可以直接使用其 config 参数来修改 webpack 中的配置，或者返回一个对象来进行 merge 处理。

你可以在项目目录下运行 `vue inspect` 来查看你修改后的 webpack 完整配置，当然你也可以缩小审查范围，比如：

```text
# 只查看 plugins 的内容
vue inspect plugins
```

### f. devServer

vue.config.js 还提供了 devServer 项用于配置 webpack-dev-server 的行为，使得我们可以对本地服务器进行相应配置，我们在命令行中运行的 `yarn serve` 对应的命令 `vue-cli-service serve` 其实便是基于 webpack-dev-server 开启的一个本地服务器，其常用配置参数如下：

```text
// vue.config.js
module.exports = {
    ...
    
    devServer: {
        open: true, // 是否自动打开浏览器页面
        host: '0.0.0.0', // 指定使用一个 host。默认是 localhost
        port: 8080, // 端口地址
        https: false, // 使用https提供服务
        proxy: null, // string | Object 代理设置
        
        // 提供在服务器内部的其他中间件之前执行自定义中间件的能力
        before: app => {
          // `app` 是一个 express 实例
        }
    }
    
    ...
}
```

当然除了以上参数，其支持所有的 webpack-dev-server 中的选项，比如 `historyApiFallback` 用于重写路由（会在后续的多页应用配置中讲解）、progress 将运行进度输出到控制台等，具体可参考：[devServer(opens new window)](https://www.webpackjs.com/configuration/dev-server/)

以上讲解了 vue.config.js 中一些常用的配置项功能，具体的配置实现需要结合实际项目进行，完整的配置项可以查看：[vue.config.js(opens new window)](https://github.com/vuejs/vue-cli/blob/ce3e2d475d63895cbb40f62425bb6b3237469bcd/docs/zh/config/README.md)

### 3. 默认插件简介

通过对 vue.config.js 的了解，我们知道了 vue-cli 3.x 为我们默认封装了项目运行的常用 webpack 配置，那么它给我们提供了哪些默认插件，每一个 plugin 又有着怎样的用途呢？除了使用 `vue inspect plugins` 我们还可以通过运行 `vue ui` 进入可视化页面查看，步骤如下：

- 打开可视化页面，点击对应项目进入管理页面（如果没有对应项目，需要导入或新建）
- 点击侧边栏 Tasks 选项，再点击二级栏 inspect 选项
- 点击 Run task 按钮执行审查命令

如图所示：

![img](https://s.poetries.top/gitee/2020/08/vue/10.png)

最后我们从输出的内容中找到 plugins 数组，其包含了如下插件（配置项已经省略，增加了定义插件的代码）：

```text
// vue-loader是 webpack 的加载器，允许你以单文件组件的格式编写 Vue 组件
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// webpack 内置插件，用于创建在编译时可以配置的全局常量
const { DefinePlugin } = require('webpack');

// 用于强制所有模块的完整路径必需与磁盘上实际路径的确切大小写相匹配
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

// 识别某些类型的 webpack 错误并整理，以提供开发人员更好的体验。
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

// 将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 用于在 webpack 构建期间优化、最小化 CSS文件
const OptimizeCssnanoPlugin = require('optimize-css-assets-webpack-plugin');

// webpack 内置插件，用于根据模块的相对路径生成 hash 作为模块 id, 一般用于生产环境
const { HashedModuleIdsPlugin } = require('webpack');

// 用于根据模板或使用加载器生成 HTML 文件
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 用于在使用 html-webpack-plugin 生成的 html 中添加 <link rel ='preload'> 或 <link rel ='prefetch'>，有助于异步加载
const PreloadPlugin = require('preload-webpack-plugin');

// 用于将单个文件或整个目录复制到构建目录
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    plugins: [
        /* config.plugin('vue-loader') */
        new VueLoaderPlugin(), 
        
        /* config.plugin('define') */
        new DefinePlugin(),
        
        /* config.plugin('case-sensitive-paths') */
        new CaseSensitivePathsPlugin(),
        
        /* config.plugin('friendly-errors') */
        new FriendlyErrorsWebpackPlugin(),
        
        /* config.plugin('extract-css') */
        new MiniCssExtractPlugin(),
        
        /* config.plugin('optimize-css') */
        new OptimizeCssnanoPlugin(),
        
        /* config.plugin('hash-module-ids') */
        new HashedModuleIdsPlugin(),
        
        /* config.plugin('html') */
        new HtmlWebpackPlugin(),
        
        /* config.plugin('preload') */
        new PreloadPlugin(),
        
        /* config.plugin('copy') */
        new CopyWebpackPlugin()
    ]
}
```

我们可以看到每个插件上方都添加了使用 chainWebpack 访问的方式，同时我也添加了每个插件相应的用途注释，需要注意的是要区分 webpack 内置插件和第三方插件的区别，如果是内置插件则无需安装下载，而外部插件大家可以直接访问：[https://www.npmjs.com/ (opens new window)](https://www.npmjs.com/)搜索对应的插件，了解其详细的 api 设置。

## 结语



本文主要阐述了 vue-cli 3.x 下基于 vue.config.js 配置 webpack 的主要方法，同时也介绍了其默认的 webpack 插件与主要功能，相信大家在了解 webpack 的知识后能够更加轻松的开展后续内容的学习，为接下来项目的构建和开发奠定基础。

## 思考 & 作业



- 除了文章中介绍的配置项，`vue.config.js` 中还有哪些额外的配置？
- `webpack-merge` 的合并原理是怎样的？
- 使用 `chainWebpack` 获取到 webpack 中的某一插件后，如何修改其配置？

# 构建基础篇 3：env 文件与环境设置

在实际项目的开发中，我们一般会经历项目的开发阶段、测试阶段和最终上线阶段，每一个阶段对于项目代码的要求可能都不尽相同，那么我们如何能够游刃有余的在不同阶段下使我们的项目呈现不同的效果，使用不同的功能呢？这里就需要引入**环境**的概念。

一般一个项目都会有以下 3 种环境：

- 开发环境（开发阶段，本地开发版本，一般会使用一些调试工具或额外的辅助功能）
- 测试环境（测试阶段，上线前版本，除了一些 bug 的修复，基本不会和上线版本有很大差别）
- 生产环境（上线阶段，正式对外发布的版本，一般会进行优化，关掉错误报告）

作为一名开发人员，我们可能需要针对每一种环境编写一些不同的代码并且保证这些代码运行在正确的环境中，那么我们应该如何在代码中判断项目所处的环境同时执行不同的代码呢？这就需要我们进行正确的环境配置和管理。

## 介绍



### 1. 配置文件

正确的配置环境首先需要我们认识不同环境配置之间的关系，如图所示：

![img](https://s.poetries.top/gitee/2020/08/vue/11.png)

我们从上图中可以了解到每一个环境其实有其不同的配置，同时它们也存在着交集部分，交集便是它们都共有的配置项，那么在 Vue 中我们应该如何处理呢？

我们可以在根目录下创建以下形式的文件进行不同环境下变量的配置：

```text
.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略
.env.[mode]         # 只在指定的模式中被载入
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略
```

比如我们创建一个名为 .env.stage 的文件，该文件表明其只在 stage 环境下被加载，在这个文件中，我们可以配置如下键值对的变量：

```text
NODE_ENV=stage
VUE_APP_TITLE=stage mode
```

这时候我们怎么在 vue.config.js 中访问这些变量呢？很简单，使用 `process.env.[name]` 进行访问就可以了，比如：

```text
// vue.config.js

console.log(process.env.NODE_ENV); // development（在终端输出）
```

当你运行 `yarn serve` 命令后会发现输出的是 development，因为 `vue-cli-service serve` 命令默认设置的环境是 development，你需要修改 package.json 中的 serve 脚本的命令为：

```text
"scripts": {
    "serve": "vue-cli-service serve --mode stage",
}
```

`--mode stage` 其实就是修改了 webpack 4 中的 mode 配置项为 stage，同时其会读取对应 .env.[model] 文件下的配置，如果没找到对应配置文件，其会使用默认环境 development，同样 `vue-cli-service build` 会使用默认环境 production。

这时候如果你再创建一个 .env 的文件，再次配置重复的变量，但是值不同，如：

```text
NODE_ENV=staging
VUE_APP_TITLE=staging mode
VUE_APP_NAME=project
```

因为 .env 文件会被所有环境加载，即公共配置，那么最终我们运行 `vue-cli-service serve` 打印出来的是哪个呢？答案是 **stage**，但是如果是 .env.stage.local 文件中配置成上方这样，答案便是 **staging**，所以 .env.[mode].local 会覆盖 .env.[mode] 下的相同配置。同理 .env.local 会覆盖 .env 下的相同配置。

由此可以得出结论，相同配置项的权重：

```text
.env.[mode].local > .env.[mode] > .env.local > .env 
```

但是需要注意的是，除了相同配置项权重大的覆盖小的，不同配置项它们会进行合并操作，类似于 Javascript 中的 Object.assign 的用法。

### 2. 环境注入

通过上述配置文件的创建，我们成功使用命令行的形式对项目环境进行了设置并可以自由切换，但是需要注意的是我们在 Vue 的前端代码中打印出的 `process.env` 与 vue.config.js 中输出的可能是不一样的，这需要普及一个知识点：webpack 通过 DefinePlugin 内置插件将 process.env 注入到客户端代码中。

```text
// webpack 配置
{
    ...
    
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
    ],
    
    ...
}
```

由于 vue-cli 3.x 封装的 webpack 配置中已经帮我们完成了这个功能，所以我们可以直接在客户端代码中打印出 process.env 的值，该对象可以包含多个键值对，也就是说可以注入多个值，但是经过 CLI 封装后仅支持注入环境配置文件中以 `VUE_APP_` 开头的变量，而 `NODE_ENV` 和 `BASE_URL` 这两个特殊变量除外。比如我们在权重最高的 .env.stage.local 文件中写入：

```text
NODE_ENV=stage2
VUE_APP_TITLE=stage mode2
NAME=vue
```

然后我们尝试在 vue.config.js 中打印 `process.env`，终端输出：

```text
{
    ...
    
    npm_config_ignore_scripts: '',
    npm_config_version_git_sign: '',
    npm_config_ignore_optional: '',
    npm_config_init_version: '1.0.0',
    npm_package_dependencies_vue_router: '^3.0.1',
    npm_config_version_tag_prefix: 'v',
    npm_node_execpath: '/usr/local/bin/node',
    NODE_ENV: 'stage2',
    VUE_APP_TITLE: 'stage mode2',
    NAME: 'vue',
    BABEL_ENV: 'development',
    
    ...
}
```

可以看到输出内容除了我们环境配置中的变量外还包含了很多 npm 的信息，但是我们在入口文件 main.js 中打印会发现输出：

```text
{
    "BASE_URL": "/vue/",
    "NODE_ENV": "stage2",
    "VUE_APP_TITLE": "stage mode2"
}
```

可见注入时过滤调了非 `VUE_APP_` 开头的变量，其中多出的 `BASE_URL` 为你在 vue.config.js 设置的值，默认为 /，其在环境配置文件中设置无效。

![img](https://s.poetries.top/gitee/2020/08/vue/12.png)

### 3. 额外配置

以上我们通过新建配置文件的方式为项目不同环境配置不同的变量值，能够实现项目基本的环境管理，但是 .env 这样的配置文件中的参数目前只支持静态值，无法使用动态参数，在某些情况下无法实现特定需求，这时候我们可以在根目录下新建 config 文件夹用于存放一些额外的配置文件。

```text
/* 配置文件 index.js */

// 公共变量
const com = {
    IP: JSON.stringify('xxx')
};

module.exports = {

    // 开发环境变量
    dev: {
    	env: {
            TYPE: JSON.stringify('dev'),
            ...com
    	}
    },
    
    // 生产环境变量
    build: {
    	env: {
            TYPE: JSON.stringify('prod'),
            ...com
    	}
    }
}
```

上方代码我们把环境变量分为了公共变量、开发环境变量和生产环境变量，当然这些变量可能是动态的，比如用户的 ip 等。现在我们要在 vue.config.js 里注入这些变量，我们可以使用 chainWebpack 修改 DefinePlugin 中的值：

```text
/* vue.config.js */
const configs = require('./config');

// 用于做相应的 merge 处理
const merge = require('webpack-merge');

// 根据环境判断使用哪份配置
const cfg = process.env.NODE_ENV === 'production' ? configs.build.env : configs.dev.env;

module.exports = {
    ...
    
    chainWebpack: config => {
        config.plugin('define')
            .tap(args => {
                let name = 'process.env';
                
                // 使用 merge 保证原始值不变
                args[0][name] = merge(args[0][name], cfg);
    
                return args
            })
    },
	
    ...
}
```

最后我们可以在客户端成功打印出包含动态配置的对象：

```text
{
    "NODE_ENV": "stage2",
    "VUE_APP_TITLE": "stage mode2",
    "BASE_URL": "/vue/",
    "TYPE": "dev",
    "IP": "xxx"
}
```

### 4. 实际场景

结合以上环境变量的配置，我们项目中一般会遇到一些实际场景： 比如在非线上环境我们可以给自己的移动端项目开启 [vConsole (opens new window)](https://github.com/Tencent/vConsole)调试，但是在线上环境肯定不需要开启这一功能，我们可以在入口文件中进行设置，代码如下：

```text
/* main.js */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 如果是非线上环境，加载 VConsole
if (process.env.NODE_ENV !== 'production') {
    var VConsole = require('vconsole/dist/vconsole.min.js');
    var vConsole = new VConsole();
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

vConsole 是一款用于移动网页的轻量级，可扩展的前端开发工具，可以看作是移动端浏览器的控制台，如图：

![img](https://s.poetries.top/gitee/2020/08/vue/13.png)

另外我们还可以使用配置中的 BASE_URL 来设置路由的 base 参数：

```text
/* router.js */

import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'

Vue.use(Router)

let base = `${process.env.BASE_URL}`; // 获取二级目录

export default new Router({
    mode: 'history',
    base: base, // 设置 base 值
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: About
        }
    ]
})
```

每一个环境变量你都可以用于项目的一些地方，它提供给了我们一种全局的可访问形式，也是基于 Node 开发的特性所在。

## 结语



环境的配置和管理对于项目的构建起到了至关重要的作用，通过给项目配置不同的环境不仅可以增加开发的灵活性、提高程序的拓展性，同时也有助于帮助我们去了解并分析项目在不同环境下的运行机制，建立全局观念。

## 思考 & 作业



- webpack 通过 DefinePlugin 内置插件将 process.env 注入到客户端代码中时，`process.env.NODE_ENV` 为什么要进行 JSON.stringify 处理？
- `process.env` 中如何获取 package.json 中 name 的值？
- 如何在 package.json 中的 scripts 字段中定义一些自定义脚本来切换不同的环境？

# 实战

# 构建实战篇 1：单页应用的基本配置

前几篇文章我们介绍了 Vue 项目构建及运行的前期工作，包括 webpack 的配置、环境变量的使用等，在了解并掌握了这些前期准备工作后，那么接下来我们可以走进 Vue 项目的内部，一探其内部配置的基本构成。

![img](https://s.poetries.top/gitee/2020/08/vue/14.png)

## 配置



### 1. 路由配置

由于 Vue 这类型的框架都是以一个或多个单页构成，在单页内部跳转并不会重新渲染 HTML 文件，其路由可以由前端进行控制，因此我们需要在项目内部编写相应的路由文件，Vue 会解析这些文件中的配置并进行对应的跳转渲染。

我们来看一下 CLI 给我们生成的 router.js 文件的配置：

```text
/* router.js */

import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue' // 引入 Home 组件
import About from './views/About.vue' // 引入 About 组件

Vue.use(Router) // 注册路由

export default new Router({
    routes: [{
        path: '/',
        name: 'home',
        component: Home
    }, {
        path: '/about',
        name: 'about',
        component: About
    }]
})
```

这份配置可以算是最基础的路由配置，有以下几点需要进行优化：

- 如果路由存在二级目录，需要添加 base 属性，否则默认为 "/"
- 默认路由模式是 hash 模式，会携带 # 标记，与真实 url 不符，可以改为 history 模式
- 页面组件没有进行按需加载，可以使用 `require.ensure()` 来进行优化

下面是我们优化结束的代码：

```text
/* router.js */

import Vue from 'vue'
import Router from 'vue-router'

// 引入 Home 组件
const Home = resolve => {
    require.ensure(['./views/Home.vue'], () => {
        resolve(require('./views/Home.vue'))
    })
}

// 引入 About 组件
const About = resolve => {
    require.ensure(['./views/About.vue'], () => {
        resolve(require('./views/About.vue'))
    })
}

Vue.use(Router)

let base = `${process.env.BASE_URL}` // 动态获取二级目录

export default new Router({
    mode: 'history',
    base: base,
    routes: [{
        path: '/',
        name: 'home',
        component: Home
    }, {
        path: '/about',
        name: 'about',
        component: About
    }]
})
```

改为 history 后我们 url 的路径就变成了 `http://127.0.0.1:8080/vue/about`，而不是原来的 `http://127.0.0.1:8080/vue/#/about`，但是需要注意页面渲染 404 的问题，具体可查阅：[HTML5 History 模式 (opens new window)](https://router.vuejs.org/zh/guide/essentials/history-mode.html)。

而在异步加载的优化上，我们使用了 webpack 提供的 require.ensure() 进行了代码拆分，主要区别在于没有优化前，访问 Home 页面会一起加载 About 组件的资源，因为它们打包进了一个 app.js 中：

![img](https://s.poetries.top/gitee/2020/08/vue/15.png)

但是优化过后，它们分别被拆分成了 2.js 和 3.js：

![img](https://s.poetries.top/gitee/2020/08/vue/16.png) ![img](https://s.poetries.top/gitee/2020/08/vue/17.png)

如此，只有当用户点击了某页面，才会加载对应页面的 js 文件，实现了按需加载的功能。

> webpack 在编译时，会静态地解析代码中的 require.ensure()，同时将模块添加到一个分开的 chunk 当中。这个新的 chunk 会被 webpack 通过 jsonp 来按需加载。

关于 `require.ensure()` 的知识点可以参考官方文档：[require.ensure (opens new window)](https://webpack.js.org/api/module-methods/#require-ensure)。

当然，除了使用 require.ensure 来拆分代码，[Vue Router (opens new window)](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#把组件按组分块)官方文档还推荐使用动态 `import` 语法来进行代码分块，比如上述 require.ensure 代码可以修改为：

```text
// 引入 Home 组件
const Home = () => import('./views/Home.vue');

// 引入 About 组件
const About = () => import('./views/About.vue');
```

其余代码可以保持不变，仍然可以实现同样的功能。如果你想给拆分出的文件命名，可以尝试一下 webpack 提供的 `Magic Comments`（魔法注释）：

```text
const Home = () => import(/* webpackChunkName:'home'*/ './views/Home.vue');
```

### 2. Vuex 配置

除了 vue-router，如果你的项目需要用到 [Vuex (opens new window)](https://vuex.vuejs.org/zh/)，那么你应该对它有一定的了解，Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。这里我们先来看一下使用 CLI 生成的配置文件 store.js 中的内容：

```text
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {

    },
    mutations: {

    },
    actions: {

    }
})
```

该配置文件便是 Vuex 的配置文件，主要有 4 个核心点：state、mutations、actions 及 getter，详细的介绍大家可以参考官方文档：[核心概念 (opens new window)](https://vuex.vuejs.org/zh/guide/state.html)，这里我用一句话介绍它们之间的关系就是：**我们可以通过 actions 异步提交 mutations 去 修改 state 的值并通过 getter 获取**。

需要注意的是不是每一个项目都适合使用 Vuex，如果你的项目是中大型项目，那么使用 Vuex 来管理错综复杂的状态数据是很有帮助的，而为了后期的拓展性和可维护性，这里不建议使用 CLI 生成的一份配置文件来管理所有的状态操作，我们可以把它拆分为以下目录：

```text
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── moduleA.js    # A模块
        └── moduleB.js    # B模块
```

![img](https://s.poetries.top/gitee/2020/08/vue/18.png)

与单个 store.js 文件不同的是，我们按模块进行了划分，每个模块中都可以包含自己 4 个核心功能。比如模块 A 中：

```text
/* moduleA.js */

const moduleA = {
    state: { 
        text: 'hello'
    },
    mutations: {
        addText (state, txt) {
            // 这里的 `state` 对象是模块的局部状态
            state.text += txt
        }
    },
    
    actions: {
        setText ({ commit }) {
            commit('addText', ' world')
        }
    },

    getters: {
        getText (state) {
            return state.text + '!'
        }
    }
}

export default moduleA
```

上方我们导出 A 模块，并在 index.js 中引入：

```text
/* index.js */

import Vue from 'vue'
import Vuex from 'vuex'
import moduleA from './modules/moduleA'
import moduleB from './modules/moduleB'
import { mutations } from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        groups: [1]
    },
    modules: {
        moduleA, // 引入 A 模块
        moduleB, // 引入 B 模块
    },
    actions, // 根级别的 action
    mutations, // 根级别的 mutations
    
    // 根级别的 getters
    getters: {
        getGroups (state) {
            return state.groups
        }
    }   
})
```

这样项目中状态的模块划分就更加清晰，对应模块的状态我们只需要修改相应模块文件即可。详细的案例代码可参考文末 github 地址。

### 3. 接口配置

在项目的开发过程中，我们也少不了与后台服务器进行数据的获取和交互，这一般都是通过接口完成的，那么我们如何进行合理的接口配置呢？我们可以在 src 目录下新建 services 文件夹用于存放接口文件：

```text
└── src
    └── services
        ├── http.js      # 接口封装
        ├── moduleA.js    # A模块接口
        └── moduleB.js    # B模块接口
```

为了让接口便于管理，我们同样使用不同的文件来配置不同模块的接口，同时由于接口的调用 ajax 请求代码重复部分较多，我们可以对其进行简单的封装，比如在 http.js 中（fetch为例）：

```text
/* http.js */
import 'whatwg-fetch'

// HTTP 工具类
export default class Http {
    static async request(method, url, data) {
        const param = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (method === 'GET') {
            url += this.formatQuery(data)
        } else {
            param['body'] = JSON.stringify(data)
        }

        // Tips.loading(); // 可调用 loading 组件

        return fetch(url, param).then(response => this.isSuccess(response))
                .then(response => {
                    return response.json()
            })
    }

    // 判断请求是否成功
    static isSuccess(res) {
        if (res.status >= 200 && res.status < 300) {
            return res
        } else {
            this.requestException(res)
        }
    }

    // 处理异常
    static requestException(res) {
        const error = new Error(res.statusText)

        error.response = res

        throw error
    }
    
    // url处理
    static formatQuery(query) {
        let params = [];

        if (query) {
            for (let item in query) {
                let vals = query[item];
                if (vals !== undefined) {
                    params.push(item + '=' + query[item])
                }
            }
        }
        return params.length ? '?' + params.join('&') : '';
    }
    
    // 处理 get 请求
    static get(url, data) {
        return this.request('GET', url, data)
    }
    
    // 处理 put 请求
    static put(url, data) {
        return this.request('PUT', url, data)
    }
    
    // 处理 post 请求
    static post(url, data) {
        return this.request('POST', url, data)
    }
    
    // 处理 patch 请求
    static patch(url, data) {
        return this.request('PATCH', url, data)
    }
    
    // 处理 delete 请求
    static delete(url, data) {
        return this.request('DELETE', url, data)
    }
}
```

封装完毕后我们在 moduleA.js 中配置一个 github 的开放接口：`https://api.github.com/repos/octokit/octokit.rb`

```text
/* moduleA.js */
import Http from './http'

// 获取测试数据
export const getTestData = () => {
    return Http.get('https://api.github.com/repos/octokit/octokit.rb')
}
```

然后在项目页面中进行调用，会成功获取 github 返回的数据，但是一般我们在项目中配置接口的时候会直接省略项目 url 部分，比如：

```text
/* moduleA.js */
import Http from './http'

// 获取测试数据
export const getTestData = () => {
    return Http.get('/repos/octokit/octokit.rb')
}
```

这时候我们再次调用接口的时候会发现其调用地址为本地地址：`http://127.0.0.1:8080/repos/octokit/octokit.rb`，那么为了让其指向 `https://api.github.com`，我们需要在 vue.config.js 中进行 devServer 的配置：

```text
/* vue.config.js */

module.exports = {
    ...
    
    devServer: {
    
        // string | Object 代理设置
        proxy: {
        
            // 接口是 '/repos' 开头的才用代理
            '/repos': {
                target: 'https://api.github.com', // 目标地址
                changeOrigin: true, // 是否改变源地址
                // pathRewrite: {'^/api': ''}
            }
        },
    }
    
    ...
}
```

在 devServer 中 我们配置 proxy 进行接口的代理，将我们本地地址转换为真实的服务器地址，此时我们同样能顺利的获取到数据，不同点在于接口状态变成了 304（重定向）：

![img](https://s.poetries.top/gitee/2020/08/vue/19.png)

### 4. 公共设施配置

最后我们项目开发中肯定需要对一些公共的方法进行封装使用，这里我把它称之为公共设施，那么我们可以在 src 目录下建一个 common 文件夹来存放其配置文件：

```text
└── src
    └── common
        ├── index.js      # 公共配置入口
        ├── validate.js   # 表单验证配置
        └── other.js      # 其他配置
```

在入口文件中我们可以向外暴露其他功能配置的模块，比如：

```text
/* index.js */
import Validate from './validate'
import Other from './other'

export {
    Validate,
    Other,
}
```

这样我们在页面中只需要引入一个 index.js 即可。

## 结语



本文介绍了 Vue 单页应用的一些基本配置，从项目构建层面阐述了各文件的主要配置方式和注意点，由于本文并不是一篇文档类的配置说明，并不会详细介绍各配置文件的 API 功能，大家可以访问文中列出的官方文档进行查阅。

本案例代码地址：[single-page-project(opens new window)](https://github.com/luozhihao/vue-project-code/tree/master/single-page-project)

## 思考 & 作业



- devServer 中 proxy 的 key 值代表什么？如果再添加一个 `/reposed` 的配置会产生什么隐患？
- 如何配置 webpack 使得 `require.ensure()` 拆分出的 js 文件具有自定义文件名？

# 构建实战篇 2：使用 pages 构建多页应用

经过对单页应用配置的了解，相信大家应该对如何构建一个 Vue 单页应用项目已经有所收获和体会，在大部分实际场景中，我们都可以构建单页应用来进行项目的开发和迭代，然而对于项目复杂度过高或者页面模块之间差异化较大的项目，我们可以选择构建多页应用来实现。那么什么是多页应用，如何构建一个多页应用便是本文所要阐述的内容。

## 概念



> 首先我们可以把多页应用理解为由多个单页构成的应用，而何谓多个单页呢？其实你可以把一个单页看成是一个 html 文件，那么多个单页便是多个 html 文件，多页应用便是由多个 html 组成的应用，如下图所示：

![img](https://s.poetries.top/gitee/2020/08/vue/20.png)

既然多页应用拥有多个 html，那么同样其应该拥有多个独立的入口文件、组件、路由、vuex 等。没错，说简单一点就是**多页应用的每个单页都可以拥有单页应用 src 目录下的文件及功能**，我们来看一下一个基础多页应用的目录结构：

```text
├── node_modules               # 项目依赖包目录
├── build                      # 项目 webpack 功能目录
├── config                     # 项目配置项文件夹
├── src                        # 前端资源目录
│   ├── images                 # 图片目录
│   ├── components             # 公共组件目录
│   ├── pages                  # 页面目录
│   │   ├── page1              # page1 目录
│   │   │   ├── components     # page1 组件目录
│   │   │   ├── router         # page1 路由目录
│   │   │   ├── views          # page1 页面目录
│   │   │   ├── page1.html     # page1 html 模板
│   │   │   ├── page1.vue      # page1 vue 配置文件
│   │   │   └── page1.js       # page1 入口文件
│   │   ├── page2              # page2 目录
│   │   └── index              # index 目录
│   ├── common                 # 公共方法目录
│   └── store                  # 状态管理 store 目录
├── .gitignore                 # git 忽略文件
├── .env                       # 全局环境配置文件
├── .env.dev                   # 开发环境配置文件
├── .postcssrc.js              # postcss 配置文件
├── babel.config.js            # babel 配置文件
├── package.json               # 包管理文件
├── vue.config.js              # CLI 配置文件
└── yarn.lock                  # yarn 依赖信息文件
```

根据上方目录结构我们可以看出其实 pages 下的一个目录就是一个单页包含的功能，这里我们包含了 3 个目录就构成了多页应用。

除了目录结构的不同外，其实区别单页应用，多页应用在很多配置上都需要进行修改，比如单入口变为多入口、单模板变为多模板等，那么下面我们就来了解一下多页应用的具体实现。

## 多入口



在单页应用中，我们的入口文件只有一个，CLI 默认配置的是 main.js，但是到了多页应用，我们的入口文件便包含了 page1.js、page2.js、index.js等，数量取决于 pages 文件夹下目录的个数，这时候为了项目的可拓展性，我们需要自动计算入口文件的数量并解析路径配置到 webpack 中的 entry 属性上，如：

```text
module.exports = {
    ...
    
    entry: {
        page1: '/xxx/pages/page1/page1.js',
        page2: '/xxx/pages/page2/page2.js',
        index: '/xxx/pages/index/index.js',
    },
    
    ...
}
```

那么我们如何读取并解析这样的路径呢，这里就需要使用工具和函数来解决了。我们可以在根目录新建 build 文件夹存放 utils.js 这样共用的 webpack 功能性文件，并加入多入口读取解析方法：

```text
/* utils.js */
const path = require('path');

// glob 是 webpack 安装时依赖的一个第三方模块，该模块允许你使用 * 等符号,
// 例如 lib/*.js 就是获取 lib 文件夹下的所有 js 后缀名的文件
const glob = require('glob');

// 取得相应的页面路径，因为之前的配置，所以是 src 文件夹下的 pages 文件夹
const PAGE_PATH = path.resolve(__dirname, '../src/pages');

/* 
* 多入口配置
* 通过 glob 模块读取 pages 文件夹下的所有对应文件夹下的 js * 后缀文件，如果该文件存在
* 那么就作为入口处理
*/
exports.getEntries = () => {
    let entryFiles = glob.sync(PAGE_PATH + '/*/*.js') // 同步读取所有入口文件
    let map = {}
    
    // 遍历所有入口文件
    entryFiles.forEach(filePath => {
        // 获取文件名
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        
        // 以键值对的形式存储
        map[filename] = filePath 
    })
    
    return map
}
```

![img](https://s.poetries.top/gitee/2020/08/vue/21.png)

上方我们使用了 [glob (opens new window)](https://github.com/isaacs/node-glob)这一第三方模块读取所有 pages 文件夹下的入口文件，其需要进行安装：`yarn add glob --dev`

读取并存储完毕后，我们得到了一个入口文件的对象集合，这个对象我们便可以将其设置到 webpack 的 entry 属性上，这里我们需要修改 vue.config.js 的配置来间接修改 webpack 的值：

```text
/* vue.config.js */

const utils = require('./build/utils')

module.exports = {
    ...
    
    configureWebpack: config => {
        config.entry = utils.getEntries()
    },
    
    ...
}
```

这样我们多入口的设置便完成了，当然这并不是 CLI 所希望的操作，后面我们会进行改进。

## 多模板



相对于多入口来说，多模板的配置也是大同小异，这里所说的模板便是每个 page 下的 html 模板文件，而模板文件的作用主要用于 webpack 中 `html-webpack-plugin` 插件的配置，其会根据模板文件生产一个编译后的 html 文件并自动加入携带 hash 的脚本和样式，基本配置如下：

```text
/* webpack 配置文件 */
const HtmlWebpackPlugin = require('html-webpack-plugin') // 安装并引用插件

module.exports = {
    ...
    
    plugins: [
        new HtmlWebpackPlugin({
            title: 'My Page', // 生成 html 中的 title
            filename: 'demo.html', // 生成 html 的文件名
            template: 'xxx/xxx/demo.html', // 模板路径
            chunks: ['manifest', 'vendor', 'demo'], // 所要包含的模块
            inject: true, // 是否注入资源
        })
    ]
    
    ...
}
```

以上是单模板的配置，那么如果是多模板只要继续往 plugins 数组中添加 HtmlWebpackPlugin 即可，但是为了和多入口一样能够灵活的获取 pages 目录下所有模板文件并进行配置，我们可以在 utils.js 中添加多模板的读取解析方法：

```text
/* utils.js */

// 多页面输出配置
// 与上面的多页面入口配置相同，读取 page 文件夹下的对应的 html 后缀文件，然后放入数组中
exports.htmlPlugin = configs => {
    let entryHtml = glob.sync(PAGE_PATH + '/*/*.html')
    let arr = []
    
    entryHtml.forEach(filePath => {
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        let conf = {
            template: filePath, // 模板路径
            filename: filename + '.html', // 生成 html 的文件名
            chunks: ['manifest', 'vendor',  filename],
            inject: true,
        }
        
        // 如果有自定义配置可以进行 merge
        if (configs) {
            conf = merge(conf, configs)
        }
        
        // 针对生产环境配置
        if (process.env.NODE_ENV === 'production') {
            conf = merge(conf, {
                minify: {
                    removeComments: true, // 删除 html 中的注释代码
                    collapseWhitespace: true, // 删除 html 中的空白符
                    // removeAttributeQuotes: true // 删除 html 元素中属性的引号
                },
                chunksSortMode: 'manual' // 按 manual 的顺序引入
            })
        }
        
        arr.push(new HtmlWebpackPlugin(conf))
    })
    
    return arr
}
```

![img](https://s.poetries.top/gitee/2020/08/vue/22.png)

以上我们仍然是使用 glob 读取所有模板文件，然后将其遍历并设置每个模板的 config，同时针对一些自定义配置和生产环境的配置进行了 merge 处理，其中自定义配置的功能我会在下节进行介绍，这里介绍一下生产环境下 `minify` 配置的作用：**将 html-minifier 的选项作为对象来缩小输出**。

[html-minifier (opens new window)](https://github.com/kangax/html-minifier)是一款用于缩小 html 文件大小的工具，其有很多配置项功能，包括上述所列举的常用的删除注释、空白、引号等。

当我们编写完了多模板的方法后，我们同样可以在 vue.config.js 中进行配置，与多入口不同的是我们在 configureWebpack 中不能直接替换 plugins 的值，因为它还包含了其他插件，这时候大家还记得第 3 节中讲到的使用 return 返回一个对象来进行 merge 操作吗？

```text
/* vue.config.js */

const utils = require('./build/utils')

module.exports = {
    ...
    
    configureWebpack: config => {
        config.entry = utils.getEntries() // 直接覆盖 entry 配置
        
        // 使用 return 一个对象会通过 webpack-merge 进行合并，plugins 不会置空
        return {
            plugins: [...utils.htmlPlugin()]
        }
    },
    
    ...
}
```

如此我们多页应用的多入口和多模板的配置就完成了，这时候我们运行命令 `yarn build` 后你会发现 dist 目录下生成了 3 个 html 文件，分别是 index.html、page1.html 和 page2.html。

## 使用 pages 配置



其实，在 vue.config.js 中，我们还有一个配置没有使用，便是 pages。pages 对象允许我们为应用配置多个入口及模板，这就为我们的多页应用提供了开放的配置入口。官方示例代码如下：

```text
/* vue.config.js */
module.exports = {
    pages: {
        index: {
            // page 的入口
            entry: 'src/index/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Index Page',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        // 当使用只有入口的字符串格式时，
        // 模板会被推导为 `public/subpage.html`
        // 并且如果找不到的话，就回退到 `public/index.html`。
        // 输出文件名会被推导为 `subpage.html`。
        subpage: 'src/subpage/main.js'
    }
}
```

我们不难发现，pages 对象中的 key 就是入口的别名，而其 value 对象其实是入口 entry 和模板属性的合并，这样我们上述介绍的获取多入口和多模板的方法就可以合并成一个函数来进行多页的处理，合并后的 setPages 方法如下：

```text
// pages 多入口配置
exports.setPages = configs => {
    let entryFiles = glob.sync(PAGE_PATH + '/*/*.js')
    let map = {}

    entryFiles.forEach(filePath => {
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        let tmp = filePath.substring(0, filePath.lastIndexOf('\/'))

        let conf = {
            // page 的入口
            entry: filePath, 
            // 模板来源
            template: tmp + '.html', 
            // 在 dist/index.html 的输出
            filename: filename + '.html', 
            // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
            chunks: ['manifest', 'vendor', filename], 
            inject: true,
        };

        if (configs) {
            conf = merge(conf, configs)
        }

        if (process.env.NODE_ENV === 'production') {
            conf = merge(conf, {
                minify: {
                    removeComments: true, // 删除 html 中的注释代码
                    collapseWhitespace: true, // 删除 html 中的空白符
                    // removeAttributeQuotes: true // 删除 html 元素中属性的引号
                },
                chunksSortMode: 'manual'// 按 manual 的顺序引入
            })
        }

        map[filename] = conf
    })

    return map
}
```

上述代码我们 return 出的 map 对象就是 pages 所需要的配置项结构，我们只需在 vue.config.js 中引用即可：

```text
/* vue.config.js */

const utils = require('./build/utils')

module.exports = {
    ...
    
    pages: utils.setPages(),
    
    ...
}
```

这样我们多页应用基于 pages 配置的改进就大功告成了，当你运行打包命令来查看输出结果的时候，你会发现和之前的方式相比并没有什么变化，这就说明这两种方式都适用于多页的构建，但是这里还是推荐大家使用更便捷的 pages 配置。

## 结语



本文主要讲解了多页应用开发中多入口和多模板的实现方式，通过针对 webpack 配置的修改我们基本了解了多页模式与单页模式的差异性，下篇文章我们将以本文内容为基础进一步完善我们的多页应用配置，使其能够正常适应实际的开发与生产。

本案例代码地址：[multi-page-project(opens new window)](https://github.com/luozhihao/vue-project-code/tree/master/multi-page-project)

## 思考 & 作业



- 多页应用相比单页应用有哪些优点和缺点？
- `chunksSortMode` 除了文中介绍的 `manual` 手动排序外，还有哪些排序方式？
- glob 中 `*` 和 `**` 的区别是什么？

# 构建实战篇 3：多页路由与模板解析

上篇文章中我们成功打包并输出了多页文件，而构建一个多页应用能够让我们进一步了解项目配置的可拓展性，可以对学习 Vue 和 webpack 起到强化训练的效果，本文将在此基础上主要针对多页路由及模板的配置进行系列的介绍。

## 路由配置



### 1. 跳转

在配置路由前，首先我们要明确一点就是，多页应用中的每个单页都是相互隔离的，即如果你想从 page1 下的路由跳到 page2 下的路由，你无法使用 vue-router 中的方法进行跳转，需要使用原生方法：`location.href` 或 `location.replace`。

此外为了能够清晰的分辨路由属于哪个单页，我们应该给每个单页路由添加前缀，比如：

- index 单页：/vue/
- page1 单页：/vue/page1/
- page2 单页：/vue/page2/

其中 /vue/ 为项目的二级目录，其后的目录代表路由属于哪个单页。因此我们每个单页的路由配置可以像这样：

```text
/* page1 单页路由配置 */

import Vue from 'vue'
import Router from 'vue-router'

// 首页
const Home = (resolve => {
    require.ensure(['../views/home.vue'], () => {
        resolve(require('../views/home.vue'))
    })
})

Vue.use(Router)

let base = `${process.env.BASE_URL}` + 'page1'; // 添加单页前缀

export default new Router({
    mode: 'history',
    base: base,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
    ]
})
```

我们通过设置路由的 base 值来为每个单页添加路由前缀，如果是 index 单页我们无需拼接路由前缀，直接跳转至二级目录即可。

那么在单页间跳转的地方，我们可以这样写：

```text
<template>
  <div id="app">
    <div id="nav">
      <a @click="goFn('')">Index</a> |
      <a @click="goFn('page1')">Page1</a> |
      <a @click="goFn('page2')">Page2</a> |
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
    methods: {
        goFn(name) {
            location.href = `${process.env.BASE_URL}` + name
        }
    }
}
</script>
```

但是为了保持和 Vue 路由跳转同样的风格，我可以对单页之间的跳转做一下封装，实现一个 `Navigator` 类，类的代码可以查看本文最后的示例，封装完成后我们可以将跳转方法修改为：

```text
this.$openRouter({
    name: name, // 跳转地址
    query: {
        text: 'hello' // 可以进行参数传递
    },
})
```

使用上述 `$openRouter` 方法我们还需要一个前提条件，便是将其绑定到 Vue 的原型链上，我们在所有单页的入口文件中添加：

```text
import { Navigator } from '../../common' // 引入 Navigator

Vue.prototype.$openRouter = Navigator.openRouter; // 添加至 Vue 原型链
```

至此我们已经能够成功模仿 vue-router 进行单页间的跳转，但是需要注意的是因为其本质使用的是 location 跳转，所以必然会产生浏览器的刷新与重载。

### 2. 重定向

当我们完成上述路由跳转的功能后，可以在本地服务器上来进行一下测试，你会发现 Index 首页可以正常打开，但是跳转 Page1、Page2 却仍然处于 Index 父组件下，这是因为浏览器认为你所要跳转的页面还是在 Index 根路由下，同时又没有匹配到 Index 单页中对应的路由。这时候我们服务器需要做一次重定向，将下方路由指向对应的 html 文件即可：

```text
/vue/page1 -> /vue/page1.html
/vue/page2 -> /vue/page2.html
```

在 vue.config.js 中，我们需要对 devServer 进行配置，添加 `historyApiFallback` 配置项，该配置项主要用于解决 HTML5 History API 产生的问题，比如其 rewrites 选项用于重写路由：

```text
/* vue.config.js */

let baseUrl = '/vue/';

module.exports = {
    ...
    
    devServer: {
        historyApiFallback: {
            rewrites: [
                { from: new RegExp(baseUrl + 'page1'), to: baseUrl + 'page1.html' },
                { from: new RegExp(baseUrl + 'page2'), to: baseUrl + 'page2.html' },
            ]
        }
    }
    
    ...
}
```

上方我们通过 rewrites 匹配正则表达式的方式将 `/vue/page1` 这样的路由替换为访问服务器下正确 html 文件的形式，如此不同单页间便可以进行正确跳转和访问了。最后需要注意的是如果你的应用发布到正式服务器上，你同样需要让服务器或者中间层作出合理解析，参考：[HTML5 History 模式 # 后端配置例子(opens new window)](https://router.vuejs.org/zh/guide/essentials/history-mode.html#后端配置例子)

而更多关于 historyApiFallback 的信息可以访问：[connect-history-api-fallback(opens new window)](https://github.com/bripkens/connect-history-api-fallback)

## 模板配置



上篇文章我们已经介绍了关于多模板的读取和配置，在配置 html-webpack-plugin 的时候我们提到了自定义配置，这里我将结合模板渲染的功能来进行统一介绍。

### 1. 模板渲染

这里所说的模板渲染是在我们的 html 模板文件中使用 html-webpack-plugin 提供的 [default template (opens new window)](https://github.com/jaketrent/html-webpack-template/blob/86f285d5c790a6c15263f5cc50fd666d51f974fd/index.html)语法进行模板编写，比如：

```text
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>模板</title>
    <% for (var chunk in htmlWebpackPlugin.files.css) { %>
        <% if(htmlWebpackPlugin.files.css[chunk]) {%>
            <link href="<%= htmlWebpackPlugin.files.css[chunk] %>" rel="stylesheet" />
        <%}%>
    <% } %>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->

    <% for (var chunk in htmlWebpackPlugin.files.js) { %>
        <% if(htmlWebpackPlugin.files.js[chunk]) {%>
            <script type="text/javascript" src="<%= htmlWebpackPlugin.files.js[chunk] %>"></script>
        <%}%>
    <% } %>
  </body>
</html>
```

以上我们使用模板语法手动获取并遍历 htmlWebpackPlugin 打包后的文件并生成到模板中，其中的 `htmlWebpackPlugin` 变量是模板提供的可访问变量，其有以下特定数据：

```text
"htmlWebpackPlugin": {
    "files": {
        "css": [ "main.css" ],
        "js": [ "assets/head_bundle.js", "assets/main_bundle.js"],
        "chunks": {
            "head": {
                "entry": "assets/head_bundle.js",
                "css": [ "main.css" ]
            },
            "main": {
                "entry": "assets/main_bundle.js",
                "css": []
            },
        }
    }
}
```

我们通过 `htmlWebpackPlugin.files` 可以获取打包输出的 js 及 css 文件路径，包括入口文件路径等。

需要注意的是如果你在模板中编写了插入对应 js 及 css 的语法，你需要设置 `inject` 的值为 false 来关闭资源的自动注入：

```text
/* utils.js */
...

let conf = {
    entry: filePath, // page 的入口
    template: filePath, // 模板路径
    filename: filename + '.html', // 生成 html 的文件名
    chunks: ['manifest', 'vendor',  filename],
    inject: false, // 关闭资源自动注入
}

...
```

否则在页面会引入两次资源，如下图所示：

![img](https://s.poetries.top/gitee/2020/08/vue/23.png)

### 2. 自定义配置

在模板渲染中，我们只能够使用 htmlWebpackPlugin 内部的一些属性和方法来进行模板的定制化开发，那么如果遇到需要根据不同环境来引入不同资源，同时不同模板间的配置还可能不一样的需求情况的话，我们使用自定义配置会比较方便。比如我们需要在生产环境模板中引入第三方统计脚本：

```text
/* vue.config.js */

module.exports = {
    ...
    
    pages: utils.setPages({
        addScript() {
            if (process.env.NODE_ENV === 'production') {
                return `
                    <script src="https://s95.cnzz.com/z_stat.php?id=xxx&web_id=xxx" language="JavaScript"></script>
                `
            }

            return ''
        }
    }),
    
    ...
}
```

然后在页面模板中通过 `htmlWebpackPlugin.options` 获取自定义配置对象并进行输出：

```text
<% if(htmlWebpackPlugin.options.addScript){ %>
    <%= htmlWebpackPlugin.options.addScript() %>
<%}%>
```

同时你也可以针对个别模板进行配置，比如我想只在 Index 单页中添加统计脚本，在 Page1 单页中添加其他脚本，那么你可以给 addScript 传入标识符来进行判断输出，比如：

```text
<% if(htmlWebpackPlugin.options.addScript){ %>
    <%= htmlWebpackPlugin.options.addScript('index') %>
<%}%>
```

同时为 addScript 方法添加参数 from：

```text
addScript(from) {
    if (process.env.NODE_ENV === 'production') {
        let url = "https://xxx";
    
        if (from === 'index') {
            url = "https://s95.cnzz.com/z_stat.php?id=xxx&web_id=xxx";
        }
        
        return `
            <script src=${url} language="JavaScript"></script>
        `
    }

    return ''
}
```

这样我们就完成了自定义配置中的模板渲染功能。当然根据实际项目需求你的自定义配置项可能会更加复杂和灵活。

## 结语



通过 2 小节的学习，相信大家对 Vue 多页应用的构建已经有所了解。本文在第 1 节的基础上重点介绍了多页路由及模板的配置，阐述了其与单页应用的不同之处，同时针对模板自定义配置的使用场景给出了简单的实例，希望大家在了解的基础上将下方的实例代码作为参考，进行相应的实战。

本案例代码地址：[multi-page-project(opens new window)](https://github.com/luozhihao/vue-project-code/tree/master/multi-page-project)

## 思考 & 作业



- 多页应用中各自的 `Vuex Store` 信息能实现共享吗？
- html-webpack-plugin 如何解析非 .html 的模板，比如 .hbs，应该如何配置？

# 构建实战篇 4：项目整合与优化

前几小节，我们讲述了 Vue 项目构建的整体流程，从无到有的实现了单页和多页应用的功能配置，但在实现的过程中不乏一些可以整合的功能点及可行性的优化方案，就像大楼造完需要进行最后的项目验收改进一样，有待我们进一步的去完善。

## 使用 alias 简化路径



使用 webpack 构建过 Vue 项目的同学应该知道 `alias` 的作用，我们可以使用它将复杂的文件路径定义成一个变量来访问。在不使用 alias 的项目中，我们引入文件的时候通常会去计算被引入文件对于引入它的文件的相对路径，比如像这样：

```text
import HelloWorld from '../../../../HelloWorld.vue'
```

一旦相对层次结构较深，我们就很难去定位所引入文件的具体位置，其实这并不是我们应该操心的地方，完全可以交给 webpack 来进行处理。在原生的 webpack 配置中我们可以定义 alias 来解决这一问题：

```text
const path = require('path')

const resolve = dir => {
    return path.join(__dirname, dir)
}

module.exports = {
    ...
    
    resolve: {
        alias: {
            '@': resolve('src'), // 定义 src 目录变量
            _lib: resolve('src/common'), // 定义 common 目录变量,
            _com: resolve('src/components'), // 定义 components 目录变量,
            _img: resolve('src/images'), // 定义 images 目录变量,
            _ser: resolve('src/services'), // 定义 services 目录变量,
        }
    },
    
    ...
}
```

上方我们在 webpack resolve（解析）对象下配置 alias 的值，将常用的一些路径赋值给了我们自定义的变量，这样我们便可以将第一个例子简化为：

```text
import HelloWorld from '_com/HelloWorld.vue'
```

而在 CLI 3.x 中我们无法直接操作 webpack 的配置文件，我们需要通过 chainWebpack 来进行间接修改，代码如下：

```text
/* vue.config.js */
module.exports = {
    ...
    
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('_lib', resolve('src/common'))
            .set('_com', resolve('src/components'))
            .set('_img', resolve('src/images'))
            .set('_ser', resolve('src/services'))
    },
    
    ...
}
```

这样我们修改 webpack alias 来简化路径的优化就实现了。但是需要注意的是对于在样式及 html 模板中引用路径的简写时，前面需要加上 `～` 符，否则路径解析会失败，如：

```text
.img {
    background: (~_img/home.png);
}
```

## 整合功能模块



在多页应用的构建中，由于存在多个入口文件，因此会出现重复书写相同入口配置的情况，这样对于后期的修改和维护都不是特别友好，需要修改所有入口文件的相同配置，比如在 index 单页的入口中我们引用了 VConsole 及 performance 的配置，同时在 Vue 实例上还添加了 $openRouter 方法：

```text
import Vue from 'vue'
import App from './index.vue'
import router from './router'
import store from '@/store/'
import { Navigator } from '../../common'

// 如果是非线上环境，不加载 VConsole
if (process.env.NODE_ENV !== 'production') {
    var VConsole = require('vconsole/dist/vconsole.min.js');
    var vConsole = new VConsole();

    Vue.config.performance = true;
}

Vue.$openRouter = Vue.prototype.$openRouter = Navigator.openRouter;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

而在 page1 和 page2 的入口文件中也同样进行了上述配置，那我们该如何整合这些重复代码，使其能够实现一次修改多处生效的功能呢？最简单的方法便是封装成一个共用方法来进行调用，这里我们可以在 common 文件夹下新建 entryConfig 文件夹用于放置入口文件中公共配置的封装，封装代码如下：

```text
import { Navigator } from '../index'

export default (Vue) => {

    // 如果是非线上环境，不加载 VConsole
    if (process.env.NODE_ENV !== 'production') {
        var VConsole = require('vconsole/dist/vconsole.min.js');
        var vConsole = new VConsole();

        Vue.config.performance = true;
    }

    Vue.$openRouter = Vue.prototype.$openRouter = Navigator.openRouter;
}
```

上述代码我们向外暴露了一个函数，在调用它的入口文件中传入 Vue 实例作为参数即可实现内部功能的共用，我们可以将原本的入口文件简化为:

```text
import Vue from 'vue'
import App from './index.vue'
import router from './router'
import store from '@/store/'
import entryConfig from '_lib/entryConfig/'

// 调用公共方法加载配置
entryConfig(Vue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

这样我们便完成了入口文件配置的整合，当然你还可以给该函数传入 router 实例及自定义参数用于其他共用配置的封装。

## 开启 Gzip 压缩



在《webpack 在 CLI 3 中的应用》章节，我们介绍了 CLI 为我们内置的 webpack plugins，使用这些内置插件基本已经能够满足我们大多数项目的构建和优化，当然你仍然可以为项目添加自己想要的插件来实现一些差异化的功能，比如使用 [compression-webpack-plugin (opens new window)](https://www.npmjs.com/package/compression-webpack-plugin)来开启 Gzip 压缩。在 vue.config.js 配置文件中，我们通过 configureWebpack 中返回一个对象来实现 plugins 的合并：

```text
/* vue.config.js */
const isPro = process.env.NODE_ENV === 'production'

module.exports = {
    ...
    
    configureWebpack: config => {
        if (isPro) {
            return {
                plugins: [
                    new CompressionWebpackPlugin({
                         // 目标文件名称。[path] 被替换为原始文件的路径和 [query] 查询
                        asset: '[path].gz[query]',
                        // 使用 gzip 压缩
                        algorithm: 'gzip', 
                        // 处理与此正则相匹配的所有文件
                        test: new RegExp(
                            '\\.(js|css)$'
                        ),
                        // 只处理大于此大小的文件
                        threshold: 10240,
                        // 最小压缩比达到 0.8 时才会被压缩
                        minRatio: 0.8，
                    })
                ]
            }
        }
    }
    ...
}
```

上方我们通过在生产环境中增加 Gzip 压缩配置实现了打包后输出增加对应的 .gz 为后缀的文件，而由于我们配置项中配置的是只压缩大小超过 10240B（10kB）的 JS 及 CSS，因此不满足条件的文件不会进行 Gzip 压缩。

Gzip 压缩能在普通压缩的基础上再进行 50% 以上 的压缩，我们可以直接来看下控制台的输出对比图：

![img](https://s.poetries.top/gitee/2020/08/vue/24.png)

很明显，Gzip 压缩后的文件体积得到了很大程度的减小，这对于浏览器资源加载速度的提升起到了非常有效的帮助。但是需要注意的是访问 Gzip 压缩的文件需要服务端进行相应配置，以下是 Nginx Gzip 压缩的流程：

> Nginx 开启 Gzip 压缩配置后，其会根据配置情况对指定的类型文件进行压缩，主要针对 JS 与 CSS 。如果文件路径中存在与原文件同名（加了个 .gz），Nginx 会获取 gz 文件，如果找不到，会主动进行 Gzip 压缩。

## 结语



至此，一路走来，我们成功完成了本小册 Vue 项目构建部分的教程，从 CLI 3.x 的使用到项目内外部环境的配置，再到最后多页应用的拓展，我们循序渐进、由浅入深的讲解了 Vue 项目构建的主要知识点及详细流程，希望大家能够在此基础上举一反三，结合实际代码，将理论知识转化为实际运用，配合自己的理解，一步步实现自己的项目构建，并为构建出的项目添砖加瓦，实现质的飞跃。

## 思考 & 作业



- 除了本文中介绍的项目优化方法，还有哪些常见的优化手段？如何通过 Vue CLI 3 配置实现？
- 总结并对比 Vue CLI 2.x，Vue CLI 3.x 在项目构建方面有哪些优势和不足？



# 指南

# 开发指南篇 1：学会编写可复用性模块

在生活中，重复的机械劳动会消耗我们的时间和精力，提高生产成本，降低工作效率。同样，在代码世界中，编写重复的代码会导致代码的冗余，页面性能的下降以及后期维护成本的增加。由此可见将重复的事情复用起来是提高生产效率、降低维护成本的不二之选。

在 Vue 项目中，每一个页面都可以看作是由大大小小的模块构成的，即便是一行代码、一个函数、一个组件都可以看作是一个个自由的模块。那么提高代码的复用性的关键便在于编写可复用的模块，也就是编写可复用的代码、函数和组件等。

## 一个简单的例子



```text
let person = [];

for (let i = 0; i < data.obj.items.length; i++) {
    person.push({
        name: data.obj.items[i].name,
        age: data.obj.items[i].age
    });
}
```

不知道上方代码给你的第一印象是什么？总之给我的印象是糟糕的，因为出现了重复性的代码片段 `data.obj.items`，可能这样的代码在我们团队开发中随处可见，这也说明了重复编码现象其实无处不在。

面对自己编写的代码，我们应该保持一颗去重的心，发现重复的地方就相当于找到了可以复用的模块。在不复用的情况下，上述代码一旦需要修改变量 `items` 为 `lists`，那么我们就得修改 3 处地方，不知不觉就增加了维护成本。而到时候往往修改你代码的人并不是你自己，所以对自己好点，对他人也会好点。复用后的代码如下：

```text
let person = [];
let values = data.obj.items;

for (let i = 0; i < values.length; i++) {
    person.push({
        name: values[i].name,
        age: values[i].age
    });
}
```

我们通过将 data.obj.items 的值赋值给变量 values 来实现了复用，此时修改 `items` 为 `lists` 的话我们只需修改一处地方即可，不管是维护成本还是代码可读性上，复用的优势都显而易见。

## 封装成一个函数



除了使用变量的赋值缓存使用来解决数据的重复读取外，我们在开发过程中重复性更多的也许是功能点的重复，比如：

```text
<tempalte>
    <div>
        <input type="text" v-model="str1">
        <input type="text" v-model="str2">
        <div>{{ str1.slice(1).toUpperCase() }}</div>
        <div>{{ str2.slice(1).toUpperCase() }}</div>
    </div>
</template>
```

上述代码的重复功能点在于截取输入框中第二个字符开始到最后的值并把它们转化成大写字母，像这样很简单的操作虽然重复使用也不会出现太大的问题，但是如果是代码量较多的操作呢？重复书写相同功能的代码是一种不经过大脑思考的行为，我们需要对其进行优化，这里我们可以把功能点封装成一个函数：

```text
export default {
    methods: {
        sliceUpperCase(val) {
            return val.slice(1).toUpperCase()
        }
    }
}
```

如此我们只要在用到该方法的地方调用即可，将值传入其中并返回新值。当然像在双花括号插值和 v-bind 表达式中重复的功能点我们可以封装成过滤器比较合适：

```text
// 单文件组件注册过滤器
filters: {
    sliceUpperCase(val) {
        return val.slice(1).toUpperCase()
    }
}

// 全局注册过滤器
Vue.filter('sliceUpperCase', function (val) {
    return val.slice(1).toUpperCase()
})
```

然后在 html 中使用“管道”符进行过滤：

```text
<div>{{ str1 | toUpperCase }}</div>
<div>{{ str2 | toUpperCase }}</div>
```

这样我们就把重复的功能性代码封装成了函数，而不管是过滤器还是正常的方法封装，其本质都是函数的封装。

## 封装成一个组件



相比较于函数的封装，规模更大一点的便是组件的封装，组件包含了模板、脚本以及样式的代码，在实际开发中组件的使用频率也是非常大的，我们项目中的每一个页面其实都可以看作是一个父组件，其可以包含很多子组件，子组件通过接收父组件的值来渲染页面，父组件通过响应子组件的回调来触发事件。

封装一个组件主要包含两种方式，一种是最常见的整体封装，用户通过改变数据源来呈现不同的页面状态，代码结构不可定制化。例如：

```text
<div>
    <my-component data="我是父组件传入子组件的数据"></my-component>
</div>
```

另一种便是自定义封装，也就是插槽(slot)，我们可以开放一部分槽位给父组件，使其能够进行一定程度的定制化，例如：

```text
<div>
    <my-component data="我是父组件传入子组件的数据">
        <template slot="customize">
            <span>这是定制化的数据</span>
        </template>
    </my-component>
</div>
```

在 myComponent 组件中我们便可以接收对应的 slot：

```text
<div class="container">
    <span>{{ data }}</span>
    <slot name="customize"></slot>
<div>
```

这里我们通过定义 slot 标签的 name 值为 customize 来接收父组件在使用该组件时在 template 标签上定义的 slot="customize" 中的代码，不同父组件可以定制不同的 slot 代码来实现差异化的插槽。最终渲染出来的代码如下：

```text
<div>
    <div class="container">
        <span>我是父组件传入子组件的数据</span>
        <span>这是定制化的数据</span>
    </div>
</div>
```

这样我们就完成了一个小型组件的封装，将共用代码封装到组件中去，页面需要引入的时候直接使用 import 并进行相应注册即可，当然你也可以进行全局的引入：

```text
import myComponent from '../myComponent.vue'

// 全局
Vue.component('my-component', myComponent)
```

## 封装成一个插件



在某些情况下，我们封装的内容可能不需要使用者对其内部代码结构进行了解，其只需要熟悉我们提供出来的相应方法和 api 即可，这需要我们更系统性的将公用部分逻辑封装成插件，来为项目添加全局功能，比如常见的 loading 功能、弹框功能等。

Vue 提供给了我们一个 install 方法来编写插件，使用该方法中的第一个 Vue 构造器参数可以为项目添加全局方法、资源、选项等。比如我们可以给组件添加一个简单的全局调用方法来实现插件的编写：

```text
/* toast.js */
import ToastComponent from './toast.vue' // 引入组件

let $vm

export default {    
    install(Vue, options) {
        
        // 判断实例是否存在
        if (!$vm) {            
            const ToastPlugin = Vue.extend(ToastComponent); // 创建一个“扩展实例构造器”
            
            // 创建 $vm 实例
            $vm = new ToastPlugin({                
                el: document.createElement('div')  // 声明挂载元素          
            });            
            
            document.body.appendChild($vm.$el); // 把 toast 组件的 DOM 添加到 body 里
        } 
        
        // 给 toast 设置自定义文案和时间
        let toast = (text, duration) => {
            $vm.text = text;
            $vm.duration = duration;
            
            // 在指定 duration 之后让 toast 消失
            setTimeout(() => {
                $vm.isShow = false;  
            }, $vm.duration);
        }
        
        // 判断 Vue.$toast 是否存在
        if (!Vue.$toast) {            
            Vue.$toast = toast;        
        }        
        
        Vue.prototype.$toast = Vue.$toast; // 全局添加 $toast 事件
    }
}
```

![img](https://s.poetries.top/gitee/2020/08/vue/26.png)

成功编写完插件的 JS 脚本后，我们在入口文件中需要通过 Vue.use() 来注册一下该插件：

```text
import Toast from '@/widgets/toast/toast.js'

Vue.use(Toast); // 注册 Toast
```

最后我们在需要调用它的地方直接传入配置项使用即可，比如：

```text
this.$toast('Hello World', 2000);
```

当然你也可以不使用 install 方法来编写插件，直接采用导出一个封装好的实例方法并将其挂载到 Vue 的原型链上来实现相同的功能。

更详细的编写插件和实例的方法可以参考我之前写的一篇文章：[Vue 插件编写与实战(opens new window)](https://mp.weixin.qq.com/s/Aqgh7Dkialhm9v8U0wBuqg)

## 结语



本文讲解了编写可复用性模块的常见方法，通过出现了重复代码 -> 封装成一个变量 -> 封装成一个函数 -> 封装成一个组件 -> 封装成一个插件，一步步将重复代码进行分析和复用。而与重复代码做斗争是一个持久性的过程，我们需要时刻保持一种“强迫症”的心态去整理复用项目中的重复代码，做好编码的严谨和自律。

## 思考 & 作业



- 在 Vue 中如何添加全局自定义指令？
- 在 vue 路由切换时如何全局隐藏某个插件？比如文中的 toast
- 如何实现一个表单验证插件？需要运用到哪些知识？

# 开发指南篇 2：合理划分容器组件与展示组件

上篇文章我们提到了组件的概念，组件是目前模块化、组件化开发模式中必不可少的单元形式，那么除了其概念和可复用性外，我们对它的职能划分了解多少呢？

本文将立足 Vue 组件的职能来谈谈我个人对于其划分的理解，唯有了解不同类型组件的职能才能编写出可维护、低耦合的前端代码。

## 组件的职能划分



如果要将 Vue 组件按照职能划分，我们可以将其分为两种类型：容器组件和展示组件。

容器组件和展示组件的概念来自于 `Redux` 文档，那么首先什么是容器组件呢？顾名思义，它是一个容器性质的组件，我们可以把它理解为最外层的父组件，也就是最顶层的组件，一般我们把它放置在 `views` 文件夹下，其功能主要用于做数据提取与实现公共逻辑，然后渲染对应的子组件。

另一类组件叫做展示组件，字面意思就是主要用于做展示的组件，其主要功能是负责接收从容器组件传输过来的数据并在页面上渲染，实现其内部独有的功能逻辑。

一个页面中容器组件与展示组件的关系如下图所示：

![img](https://s.poetries.top/gitee/2020/08/vue/27.png)

上图我们以博客首页为例，容器组件就是整个首页最外层的父组件，而展示组件就包含了导航栏、文章列表、底部等子组件，代码层面如下：

```text
<template>
    <div>
        <navigation @count="countFn"></navigation>
        <article :list="articleList"></article>
        <foot></foot>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    export default {
        mounted() {
            this.SET_BLOG_DATA(); // 调用接口获取数据
        },
        computed: {
            ...mapGetters(['articleList']), // 监听 state
        }
        methods: {
            ...mapActions(['SET_BLOG_DATA', 'SET_NAV_COUNT']),
            countFn(item) {
            
                // 调用接口存储导航点击次数并跳转，通过派发 action 的形式来发起 state 变化
                this.SET_NAV_COUNT({ type: item.type });
                
                this.$router.push({name: item.route});
            }
        }
    }
</script>
```

以上是首页容器组件中的主要代码，其主要做了两件事情：数据的传递和回调的处理，当然还可以包括处理一些该页面中不属于任何一个展示组件的方法，比如校验登录状态。在一个容器组件中可以包含多个展示组件，下面我们来看一下展示组件 `Navigation` 中的代码：

```text
<template>
    <ul>
        <li 
            v-for="(item, index) in nav"
            :key="index"
            @click="goNav(item)"
            v-text="item.name"
        ></li>
    </ul>
</template>

<script>
    export default {
        data() {
            return {
                nav: [{
                    name: '首页',
                    route: 'index',
                    type: 'index'
                }, {
                    name: '文章',
                    route: 'article',
                    type: 'article' 
                }, {
                    name: '关于',
                    route: 'about',
                    type: 'about' 
                }]
            }
        },
        methods: {
            goNav(item) {
                this.$emit('count', item); // 触发回调
            }
        }
    }
</script>
```

`Navigation` 导航组件只负责自己内部的数据渲染和回调逻辑，对于存储每个导航的点击量及跳转逻辑来说，作为展示组件这并不是其所关心的，所以我们需要通过触发容器组件回调的方式来实现。再来看一下展示组件 `Article` 的代码：

```text
<template>
    <ul>
        <li 
            v-for="(item, index) in list"
            :key="index"
            @click="goPage(item.id)"
            v-text="item.title"
        ></li>
    </ul>
</template>

<script>
    export default {
        props: {
        
            // 接收容器组件数据
            list: {
                default: [],
                type: Array
            }
        }
    }
</script>
```

展示组件 Article 中动态的数据通过 `props` 从父组件中获取，其内部只处理文章列表的渲染工作，这样很好的将 UI 层面和应用层面进行了分离，便于今后该组件的复用。

此外 `Foot` 组件为纯静态组件，其只负责内部数据的渲染，不接收外部的数据和回调方法，这里就不做介绍了。

相比较如果上述的博客首页不做组件的划分，全部逻辑都放在一个组件中，那么必然会导致代码的臃肿和难以维护，而一旦划分了容器组件和展示组件，后期如果哪个页面同样需要展示文章列表，我们只需要传递不同的数据直接复用即可。

## 组件的层次结构



了解了组件职能的划分后，我们再来看一下组件的层次结构。关于组件的层次，一般页面中不宜嵌套超过 3 层的组件，因为超过 3 层后父子组件的通信就会变得相对困难，不利于项目的开发和维护。3 层结构的容器组件与展示组件的数据传递如下：

![img](https://s.poetries.top/gitee/2020/08/vue/28.png)

可见组件的层次越深数据传递的过程就会变得越复杂，当然这取决于你如何划分容器组件和展示组件，比如我们可以将上述博客首页换一种划分方式：

![img](https://s.poetries.top/gitee/2020/08/vue/29.png)

上图我们页面中存在 3 个容器组件，每个容器组件又可以包含各自的展示组件，这样一定程度上可以减少组件的层次嵌套深度。当然展示组件中也可以包含对应的容器组件来解决数据传输的问题：

![img](https://s.poetries.top/gitee/2020/08/vue/30.png)

这样展示组件 B 下面的容器组件 C 便可以不依赖于容器组件 A 的数据，其可以单独的进行数据获取和状态更新。

而对于那些你不知道应该划分为容器组件和展示组件的组件，比如一些耦合度较高的组件，那么你可以暂时归类到其他组件中，混用容器和展示，随着日后功能的逐渐清晰，我们再将其进行划分。

## 结语



本文主要介绍了容器组件和展示组件的概念和层次划分，在编码上，容器组件和展示组件各司其职，它们将容器和展示更好的分离，提高了组件的重用度，降低了功能上的耦合度，为高效、高质量的代码开发奠定了基础。

## 思考 & 作业



- 如果你了解 React，那么试想一下在 React 中展示组件与容器组件有哪些异同点？
- 如果需要你对掘金首页进行组件的划分，你会如何划分其结构和层次？
- 在子组件的 `props` 中，如何动态的设置默认值？

# 开发指南篇 3：数据驱动与拼图游戏

数据驱动是 Vue 框架的核心特性之一，也是 Vue 响应式原理的具体体现，相信大家对其应该深有体会，尤其是在操作数据来触发页面更新的时候。

为了让大家更加了解数据驱动的理念，并解决使用过程中可能出现的一系列问题，本文将结合比较常见和简单的 “拼图游戏” 来展示 Vue 数据驱动的魅力所在。

## 效果展示



首先我们先来看一下实现的 “拼图游戏” 的动态效果：

![img](https://s.poetries.top/gitee/2020/08/vue/31.png)

在不操作 `DOM` 的情况下实现以上功能其实需要我们对 Vue 数据驱动及数据可视化有一个非常清楚的认知，在操作数据的同时驱动可视化界面的还原。

## 关键代码



接下来我们来看一下实现该拼图游戏的功能点及关键代码：

### 游戏面板的构建

```text
<!-- HTML 部分 -->
<ul class="puzzle-wrap">
    <li 
        :class="{'puzzle': true, 'puzzle-empty': !puzzle}" 
        v-for="(puzzle, index) in puzzles"
        :key="index"
        v-text="puzzle"
    ></li>
</ul>
// 数据部分
export default {
    data() {
        return {
            puzzles: Array.from({ length: 15 }, (value, index) => index + 1)
        }
    },
}
```

上方我们使用 `v-for` 循环构建了从 1 ～ 15 按顺序排列的方块格子，也就是拼图完成时候的顺序，但是拼图游戏一开始数字的顺序应该是无序的，也是随机打乱的，那么我们怎么实现呢？可以使用下方的随机排列函数：

```text
function shuffle(arr) {
    let len = arr.length
    
    for (let i = 0; i < len - 1; i++) {
        let idx = Math.floor(Math.random() * (len - i))
        let temp = arr[idx]
        arr[idx] = arr[len - i - 1]
        arr[len - i - 1] = temp
    }
    
    return arr
}
```

该函数中我们使用 `Math.random()` 来返回 0 和 1 之间的伪随机数，可能为 0，但总是小于1，[0, 1)，而通过这一特性我们可以实现生成 n-m，包含 n 但不包含 m 的整数，具体步骤如下：

- 第一步算出 `m-n` 的值，假设等于 w
- 第二步 `Math.random() * w`
- 第三步 `Math.random() * w + n`
- 第四步 `Math.floor(Math.random() * w + n)`

在 `shuffle` 函数中 n 值永远是 0，而 w（即 len - i） 值随着循环 i 值的变大而不断减小。

> 在上面的算法里，我们每一次循环从前 len - i 个元素里随机一个位置，将这个元素和第 len - i 个元素进行交换，迭代直到 i = len - 1 为止。

这一便实现了数组的随机打乱。最后我们需要在数组末尾追加一个空值来显示唯一一个空白格子：

```text
this.puzzles.push('');
```

### 交换方块位置

实现随机数字后，当我们点击方块，如果其上下左右存在为空的格子就需要将其进行交换，而由于是数据驱动界面，这里我们便需要交换两者在数组中的位置来实现：

```text
export default {
    methods: {
        
        // 点击方块
        moveFn(index) {
            let puzzles = this.puzzles

            // 获取点击位置上下左右的值
            let leftNum = this.puzzles[index - 1],
                rightNum = this.puzzles[index + 1],
                topNum = this.puzzles[index - 4],
                bottomNum = this.puzzles[index + 4]

            // 和为空的位置交换数值
            if (leftNum === '' && index % 4) {
                this.setPuzzle(index, -1)
            } else if (rightNum === '' && 3 !== index % 4) {
                this.setPuzzle(index, 1)
            } else if (topNum === '') {
                this.setPuzzle(index, -4)
            } else if (bottomNum === '') {
                this.setPuzzle(index, 4)
            }
        },

        // 设置数组值
        setPuzzle(index, num) {
            let curNum = this.puzzles[index]
            
            this.$set(this.puzzles, index + num, curNum)
            this.$set(this.puzzles, index, '')
        },
    }
}
```

由于是 16 宫格的拼图，所以我们在点击获取位置的时候需要考虑边界情况，比如第 4 个格子为空，我们点击第 5 个格子不应该交换它们，因为在界面上第 4 个格子不在第 5 个格子的左侧，所以我们使用 `index % 4` 的方法来进行边界的判断，同时使用 Vue 提供的 `$set` 方法来将响应属性添加到数组上。

### 校验是否过关

最后我们需要校验游戏是否过关，我们只需要在最后一个格子为空时去进行校验即可：

```text
if (this.puzzles[15] === '') {
    const newPuzzles = this.puzzles.slice(0, 15)
    const isPass = newPuzzles.every((e, i) => e === i + 1)

    if (isPass) {
        alert ('恭喜，闯关成功！')
    }
}
```

我们使用数组的 `every` 方法来简化代码的复杂度，当所有数字大小和对应的数组下标 + 1 相吻合时即会返回 `true`。

如此我们便完成了一个简单拼图游戏的功能。

## 盲点及误区



在实现拼图游戏后，有些同学可能会存在一些疑惑，比如：数组赋值为什么要用 $set 方法？数组随机打乱为什么不用 sort 排序呢？下面便来进行讲解：

### 为什么要用 $set 方法

大家应该都知道如果不用 `$set` 方法我们可以直接通过操作数组索引的形式对数组进行赋值，从而交换拼图的中两者的数据：

```text
// 设置数组值
setPuzzle(index, num) {
    let curNum = this.puzzles[index]
    
    this.puzzles[index + num] = curNum
    this.puzzles[index] = ''
    
    // this.$set(this.puzzles, index + num, curNum)
    // this.$set(this.puzzles, index, '')
}
```

但是你会发现这样做数据是改变了，但是页面并没有因此重新渲染，这是为什么呢？其实 Vue 官方已经给出了明确的答案：

> 由于 JavaScript 的限制，Vue 不能检测以下变动的数组：
>
> - 当你利用索引直接设置一个项时，例如：vm.items[indexOfItem] = newValue
> - 当你修改数组的长度时，例如：vm.items.length = newLength

我们这里使用的便是第一种利用索引的方式，由于 Vue 检测不到数组变动，因此页面便无法重绘。同样 Vue 也不能检测对象属性的添加或删除，需要使用 `Vue.set(object, key, value)` 方法来实现。

其实还有一种比较取巧的方式便是强制重新渲染 Vue 实例来解决这一问题：

```text
// 设置数组值
setPuzzle(index, num) {
    let curNum = this.puzzles[index]
    
    this.puzzles[index + num] = curNum
    this.puzzles[index] = ''
    
    this.$forceUpdate() // 迫使 Vue 实例重新渲染
    
    // this.$set(this.puzzles, index + num, curNum)
    // this.$set(this.puzzles, index, '')
}
```

上方我们使用了 Vue 提供的 `$forceUpdate` 方法迫使 Vue 实例重新渲染，这样改变的数据就会被更新的页面中去。但是最好不要这样操作，因为这会导致 Vue 重新遍历此对象所有的属性，一定程度上会影响页面的性能。

### 为什么不用 sort 排序

其实 sort 方法也能够实现数组的随机排序，代码如下：

```text
let puzzleArr = Array.from({ length: 15 }, (value, index) => index + 1);

// 随机打乱数组
puzzleArr = puzzleArr.sort(() => {
    return Math.random() - 0.5
});
```

我们通过使用 `Math.random()` 的随机数减去 0.5 来返回一个大于、等于或小于 0 的数，sort 方法会根据接收到的值来对相互比较的数据进行升序或是降序排列。

但是由于 JavaScript 内置排序算法的缺陷性，使用 sort 排序的结果并不随机分布，经过大量的测试你会发现**越大的数字出现在越后面的概率越大**。

由于本文并非是一篇介绍 sort 排序的文章，关于论证其缺陷性的话题这里就不进行详细展开了，感兴趣的同学可以进一步进行探究。

## 结语



本文实例是基于我之前写的一篇关于利用 Vue.js 实现拼图游戏的文章上进行了改进和优化，希望通过这样一个小游戏来强化大家对于 Vue 数据驱动的理解。相比操作 DOM 元素，操作数据其实更加的便捷和快速，可以使用较少的代码来实现一些较为复杂的逻辑。

具体实例代码可以参考：[puzzle(opens new window)](https://github.com/luozhihao/vue-project-code/blob/ea7294370af888084be41c10c914b4fedbf3f400/ui-framework-project/src/views/demo/puzzle.vue)

## 思考 & 作业



- Vue 中监听数据变化的原理是什么？是通过何种方式实现的？
- 如何论证原生 JS 中 sort 排序后越大的数字出现在越后面的概率越大？
- 如何使用 `Math.random()` 生成 n-m，不包含 n 但包含 m 的整数？

# 开发指南篇 4：Vue API 盲点解析

在了解了一些实用的开发技巧和编码理念后，我们在项目的开发过程中难免也会遇到因为不熟悉 Vue API 而导致的技术问题，而往往就是这样的一些问题消耗了我们大量的开发时间，造成代码可读性下降、功能紊乱甚至 `bug` 量的增加，其根本原因还是自己对 Vue API 的 “**无知**”。

本文将介绍 Vue 项目开发中比较难以理解并可能被你忽视的 API，唯有知己知彼，才能百战不殆。

## API 解析



### 使用 performance 开启性能追踪

`performance API` 是 Vue 全局配置 API 中的一个，我们可以使用它来进行网页性能的追踪，我们可以在入口文件中添加：

```text
if (process.env.NODE_ENV !== 'production') {
    Vue.config.performance = true;
}
```

来开启这一功能，该 API（2.2.0 新增）功能只适用于开发模式和支持 `performance.mark` API 的浏览器上，开启后我们可以下载 [Vue Performance Devtool (opens new window)](https://chrome.google.com/webstore/search/vue performance devtool)这一 chrome 插件来看查看各个组件的加载情况，如图：

![img](https://s.poetries.top/gitee/2020/09/120.png)

从中我们可以清晰的看到页面组件在每个阶段的耗时情况，而针对耗时比较久的组件，我们便可以对其进行相应优化。

而其在 Vue 源码中主要使用了 [window.performance (opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance)来获取网页性能数据，其中包含了 `performance.mark` 和 `performance.measure`。

- performance.mark 主要用于创建标记
- performance.measure 主要用于记录两个标记的时间间隔

例如：

```text
performance.mark('start'); // 创建 start 标记
performance.mark('end'); // 创建 end 标记

performance.measure('output', 'start', 'end'); // 计算两者时间间隔

performance.getEntriesByName('output'); // 获取标记，返回值是一个数组，包含了间隔时间数据
```

熟练的使用 performance 我们可以查看并分析网页的很多数据，为我们项目优化提供保障。除了上述介绍的两个方法，我们还可以使用 `performance.timing` 来计算页面各个阶段的加载情况，关于 performance.timing 的介绍可以查看我之前写的一篇文章：[利用 Navigation Timing 测量页面加载时间(opens new window)](https://www.cnblogs.com/luozhihao/p/4681564.html)

### 使用 errorHandler 来捕获异常

在浏览器异常捕获的方法上，我们熟知的一般有：`try ... catch` 和 `window.onerror`，这也是原生 JavaScript 提供给我们处理异常的方式。但是在 Vue 2.x 中如果你一如既往的想使用 window.onerror 来捕获异常，那么其实你是捕获不到的，因为异常信息被框架自身的异常机制捕获了，你可以使用 `errorHandler` 来进行异常信息的获取：

```text
Vue.config.errorHandler = function (err, vm, info) {
    let { 
        message, // 异常信息
        name, // 异常名称
        stack  // 异常堆栈信息
    } = err;

    // vm 为抛出异常的 Vue 实例
    // info 为 Vue 特定的错误信息，比如错误所在的生命周期钩子
}
```

在入口文件中加入上述代码后，我们便可以捕获到 Vue 项目中的一些异常信息了，但是需要注意的是 Vue 2.4.0 起的版本才支持捕获 Vue 自定义事件处理函数内部的错误，比如:

```text
<template>
    <my-component @eventFn="doSomething"></my-component>
</template>

<script>
export default {
    methods: {
        doSomething() {
            console.log(a); // a is not defined
        }
    }
}
</script>
```

使用 Vue 中的异常捕获机制，我们可以针对捕获到的数据进行分析和上报，为实现前端异常监控奠定基础。关于对异常捕获的详细介绍，感兴趣的同学可以查看我的这篇文章：[谈谈前端异常捕获与上报(opens new window)](https://www.cnblogs.com/luozhihao/p/8635507.html)

### 使用 nextTick 将回调延迟到下次 DOM 更新循环之后执行

在某些情况下，我们改变页面中绑定的数据后需要对新视图进行一些操作，而这时候新视图其实还未生成，需要等待 DOM 的更新后才能获取的到，在这种场景下我们便可以使用 nextTick 来延迟回调的执行。比如未使用 `nextTick` 时的代码：

```text
<template>
    <ul ref="box">
        <li v-for="(item, index) in arr" :key="index"></li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            arr: []
        }
    },
    mounted() {
    	this.getData();
    },
    methods: {
        getData() {
            this.arr = [1, 2, 3];
            this.$refs.box.getElementsByTagName('li')[0].innerHTML = 'hello';
        }
    }
}
</script>
```

上方代码我们在实际运行的时候肯定会报错，因为我们获取 DOM 元素 li 的时候其还未被渲染，我们将方法放入 nextTick 回调中即可解决该问题：

```text
this.$nextTick(() => {
    this.$refs.box.getElementsByTagName('li')[0].innerHTML = 'hello';
})
```

当然你也可以使用 ES6 的 `async/await` 语法来改写上述方法：

```text
methods: {
    async getData() {
        this.arr = [1, 2, 3];
        
        await this.$nextTick();
        
        this.$refs.box.getElementsByTagName('li')[0].innerHTML = 'hello';
    }
}
```

那么接下来我们来分析下 Vue 是如何做到的，其源码中使用了 3 种方式：

- promise.then 延迟调用
- setTimeout(func, 0) 延迟功能
- MutationObserver 监听变化

前两种方式相信大家都比较熟悉，其都具备延迟执行的功能，我们也可以直接替换 nextTick 为这两种方式中的一种，同样可以解决问题。这里主要介绍下 [MutationObserver (opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)这一 HTML5 新特性，那么什么是 `MutationObserver` 呢？用一句话介绍就是：我们可以使用它创建一个观察者对象，其会监听某个 DOM 元素，并在它的 DOM 树发生变化时执行我们提供的回调函数。实例化代码及配置如下：

```text
// 传入回调函数进行实例化
var observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        console.log(mutation.type);
    })
});

// 选择目标节点
var target = document.querySelector('#box');
 
// 配置观察选项
var config = { 
    attributes: true, // 是否观察属性的变动
    childList: true, // 是否观察子节点的变动（指新增，删除或者更改）
    characterData: true // 是否观察节点内容或节点文本的变动
};
 
// 传入目标节点和观察选项
observer.observe(target, config);
 
// 停止观察
observer.disconnect();
```

这样我们便可以观察 id 为 box 下的 DOM 树变化，一旦发生变化就会触发相应的回调方法，实现延迟调用的功能。

### 使用 watch 的深度遍历和立即调用功能

相信很多同学使用 `watch` 来监听数据变化的时候通常只使用过其中的 `handler` 回调，其实其还有两个参数，便是：

- deep 设置为 true 用于监听对象内部值的变化
- immediate 设置为 true 将立即以表达式的当前值触发回调

我们来看下代码中的配置：

```text
<template>
    <button @click="obj.a = 2">修改</button>
</template>
<script>
export default {
    data() {
        return {
            obj: {
                a: 1,
            }
        }
    },
    watch: {
        obj: {
            handler: function(newVal, oldVal) {
                console.log(newVal); 
            },
            deep: true,
            immediate: true
        }
    }
}
</script>
```

以上代码我们修改了 obj 对象中 a 属性的值，我们可以触发其 watch 中的 handler 回调输出新的对象，而如果不加 `deep: true`，我们只能监听 obj 的改变，并不会触发回调。同时我们也添加了 `immediate: true` 配置，其会立即以 obj 的当前值触发回调。

在 Vue 源码中，主要使用了 [Object.defineProperty (obj, key, option) (opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)方法来实现数据的监听，同时其也是 Vue 数据双向绑定的关键方法之一。示例代码如下：

```text
function Observer() {
    var result = null;
    
    Object.defineProperty(this, 'result', {
        get: function() {
            console.log('你访问了 result');
            return result;
        },
        set: function(value) {
            result = value;
            console.log('你设置了 result = ' + value);
        }
    });
}

var app = new Observer(); // 实例化

app.result; // 你访问了 result
app.result = 11; // 你设置了 result = 11
```

我们通过实例化了 `Observer` 方法来实现了一个简单的监听数据访问与变化的功能。`Object.defineProperty` 是 ES5 的语法，这也就是为什么 Vue 不支持 IE8 以及更低版本浏览器的主要原因。

### 对低开销的静态组件使用 v-once

Vue 提供了 `v-once` 指令用于只渲染元素和组件一次，一般可以用于存在大量静态数据组件的更新性能优化，注意是大量静态数据，因为少数情况下我们的页面渲染会因为一些静态数据而变慢。如果你需要对一个组件使用 v-once，可以直接在组件上绑定：

```text
<my-component v-once :data="msg"></my-component>
```

这时候因为组件绑定了 v-once，所以无论 msg 的值如何变化，组件内渲染的永远是其第一次获取到的初始值。因此我们在使用 v-once 的时候需要考虑该组件今后的更新情况，避免不必要的问题产生。

### 使用 $isServer 判断当前实例是否运行于服务器

当我们的 Vue 项目中存在服务端渲染（SSR）的时候，有些项目文件可能会同时在客户端和服务端加载，这时候代码中的一些客户端浏览器才支持的属性或变量在服务端便会加载出错，比如 window、 document 等，这时候我们需要进行环境的判断来区分客户端和服务端，如果你不知道 `$isServer`，那么你可能会使用 `try ... catch` 或者 `process.env.VUE_ENV` 来判断：

```text
try {
    document.title = 'test';
} catch(e) {}

// process.env.VUE_ENV 需要在 webpack 中进行配置
if (process.env.VUE_ENV === 'client') {
    document.title = 'test';
}
```

而使用 $isServer 则无需进行配置，在组件中直接使用该 API 即可：

```text
if (this.$isServer) {
    document.title = 'test';
}
```

其源码中使用了 `Object.defineProperty` 来进行数据监测：

```text
Object.defineProperty(Vue.prototype, '$isServer', {
    get: isServerRendering
});

var _isServer;
var isServerRendering = function () {
    if (_isServer === undefined) {
        if (!inBrowser && !inWeex && typeof global !== 'undefined') {
            _isServer = global['process'].env.VUE_ENV === 'server';
        } else {
            _isServer = false;
        }
    }
    return _isServer
};
```

当我们访问 $isServer 属性时，其会调用 `isServerRendering` 方法，该方法会首先判断当前环境，如果在浏览器或者 Weex 下则返回 false，否则继续判断当前全局环境下的 `process.env.VUE_ENV` 是否为 server 来返回最终结果。

## 结语



每一门语言、一个框架都有其 API 文档，在 Vue 的项目开发过程中，很多时候当你一筹莫展之际，你可以尝试浏览一下 Vue 的 API 列表，或许你就会柳暗花明。

## 思考 & 作业



- 使用 watch 监听某一值时，同时修改该值两次会触发几次 watch 回调？
- 使用 `errorHandler` 捕获异常堆栈后如何解析 `source-map` 信息？
- 除了本文介绍的 Vue 盲点外，还有哪些需要注意并容易忽略的 API？

# 开发指南篇 5：从编码技巧与规范开始

当我们完成项目的构建，进入开发阶段的时候，除了你需要了解框架本身的知识点外，我们还需要提前掌握一些项目的编码技巧与规范，在根源上解决之后因编码缺陷而导致的项目维护困难、性能下降等常见问题，为项目多人开发提供编码的一致性。

本文将罗列项目中常用的一些编码技巧与规范来帮助大家提升代码质量，并会结合代码片段加强大家的理解与认知。当然不是所有实例都是针对 Vue.js 开发的，有些同样也适用于其他前端项目。

## 实例



### 1. 使用对象代替 if 及 switch

在很多情况下，我们经常会遇到循环判断执行赋值操作的场景，一般我们都会使用 if 及 switch 的条件判断，如果符合则执行赋值，不符合则进入下个判断，比如：

```text
let name = 'lisi';
let age = 18;

if (name === 'zhangsan') {
    age = 21;
} else if (name === 'lisi') {
    age = 18;
} else if (name === 'wangwu') {
    age = 12;
}

// 或者
switch(name) {
    case 'zhangsan':
        age = 21;
        break
    case 'lisi':
        age = 18;
        break
    case 'wangwu':
        age = 12;
        break
}
```

这样的写法不仅冗余，而且代码执行效率不高，我们可以使用对象的形式简写：

```text
let name = 'lisi';
let obj = {
    zhangsan: 21,
    lisi: 18,
    wangwu: 12
};

let age = obj[name] || 18;
```

以上这种技巧适用于循环判断一次赋值的情况，如果判断过后有较多处理逻辑的还需要使用 if 或 switch 等方法。

### 2. 使用 Array.from 快速生成数组

一般我们生成一个有规律的数组会使用循环插入的方法，比如使用时间选择插件时，我们可能需要将小时数存放在数组中：

```text
let hours = [];

for (let i = 0; i < 24; i++) {
    hours.push(i + '时');
}
```

如果使用 Array.from 我们可以简写为：

```text
let hours = Array.from({ length: 24 }, (value, index) => index + '时');
```

### 3. 使用 router.beforeEach 来处理跳转前逻辑

在某些情况下，我们需要在路由跳转前处理一些特定的业务逻辑，比如修改路由跳转、设置 title 等，代码如下：

```text
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 首页
const Home = (resolve => {
    require.ensure(['../views/home.vue'], () => {
        resolve(require('../views/home.vue'))
    })
})

let base = `${process.env.BASE_URL}`;

let router =  new Router({
    mode: 'history',
    base: base,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: { title: '首页' }
        },
    ]
})

router.beforeEach((to, from, next) => {
    let title = to.meta && to.meta.title;
    
    if (title) {
        document.title = title; // 设置页面 title
    }
    
    if (to.name === 'home') {
    
        // 拦截并跳转至 page2 单页，$openRouter 方法在第 5 节中封装
        Vue.$openRouter({
            name: 'page2'
        });
    }
    
    next();
})

export default router
```

注意最后需要调用 `next()` 方法执行路由跳转。

### 4. 使用 v-if 来优化页面加载

在 Vue 页面中，一些模块可能需要用户主动触发才会显示，比如弹框组件等这样的子组件，那么我们可以使用 `v-if` 来进行按需渲染，没必要一进页面就渲染所有模块。比如：

```text
<template>
    <div @click="showModuleB = true"></div>
    <module-b v-if="isShowModuleB"></module-b>
</template>

<script>
import moduleB from 'components/moduleB'
export default {
    data() {
        return {
            isShowModuleB: false
        }  
    },
    components: {
        moduleB
    }
}
</script>
```

这样当 isShowModuleB 为 false 的时候便不会加载该模块下的代码，包括一些耗时的接口调用。当然 v-if 主要适用于代码量较多、用户点击不是很频繁的模块的显示隐藏，同时如果涉及到权限问题的代码都需要使用 v-if，而不是 v-show。

### 5. 路由跳转尽量使用 name 而不是 path

我们前期配置的路由路径后期难免会进行修改，如果我们页面跳转的地方全是使用的 `path`，那么我们需要修改所有涉及该 path 的页面，这样不利于项目的维护。而相对于 path，name 使用起来就方便多了，因为其具有唯一性，即使我们修改了 path，还可以使用原来的 `name` 值进行跳转。

```text
this.$router.push({ 
    name: 'page1'
});

// 而不是
this.$router.push({ 
    path: 'page1'
});
```

### 6. 使用 key 来优化 v-for 循环

`v-for` 是 Vue 提供的基于源数据多次渲染元素或模板块的指令。正因为是数据驱动，所以在修改列表数据的时候，Vue 内部会根据 key 值去判断某个值是否被修改，其会重新渲染修改后的值，否则复用之前的元素。

这里如果数据中存在唯一表示 id，则推荐使用 id 作为 key，如果没有则可以使用数组的下标 index 作为 key。因为如果在数组中间插入值，其之后的 index 会发生改变，即使数据没变 Vue 也会进行重新渲染，所以最好的办法是使用数组中不会变化且唯一的那一项作为 key 值。例如：

```text
<template>
    <ul>
        <li v-for="(item, index) in arr" :key="item.id">{{ item.data }}</li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            arr: [
                {
                    id: 1,
                    data: 'a'
                },
                {
                    id: 2,
                    data: 'b'
                },
                {
                    id: 3,
                    data: 'c'
                }
            ]
        }
    }
}
</script>
```

### 7. 使用 computed 代替 watch

很多时候页面会出现 `watch` 的滥用而导致一系列问题的产生，而通常更好的办法是使用 `computed` 属性，首先需要区别它们有什么区别：

- watch：当监测的属性变化时会自动执行对应的回调函数
- computed：计算的属性只有在它的相关依赖发生改变时才会重新求值

其实它们在功能上还是有所区别的，但是有时候可以实现同样的效果，而 computed 会更胜一筹，比如：

```text
<template>
    <div>
        <input type="text" v-model="firstName">
        <input type="text" v-model="lastName">
        <span>{{ fullName }}</span>
        <span>{{ fullName2 }}</span>
    </div>
</template>

<script>
export default {
    data() {
        reurn {
            firstName: '',
            lastName: '',
            fullName2: ''
        }
    },
    
    // 使用 computed
    computed: {
        fullName() {
            return this.firstName + ' ' + this.lastName
        }
    },
    
    // 使用 watch
    watch: {
        firstName: function(newVal, oldVal) {
            this.fullName2 = newVal + ' ' + this.lastName;
        },
        lastName: function(newVal, oldVal) {
            this.fullName2 = this.firstName + ' ' + newVal;
        },
    }
}
</script>
```

上方我们通过对比可以看到，在处理多数据联动的情况下，使用 computed 会更加合理一点。

![img](https://s.poetries.top/gitee/2020/08/vue/25.png)

computed 监测的是依赖值，依赖值不变的情况下其会直接读取缓存进行复用，变化的情况下才会重新计算；而 watch 监测的是属性值， 只要属性值发生变化，其都会触发执行回调函数来执行一系列操作。

### 8. 统一管理缓存变量

在项目中或多或少会使用浏览器缓存，比如 sessionStorage 和 localStorage，当一个项目中存在很多这样的缓存存取情况的时候就会变得难以维护和管理，因为其就像全局变量一样散落在项目的各个地方，这时候我们应该将这些变量统一管理起来，放到一个或多个文件中去，比如：

```text
/* types.js */

export const USER_NAME = 'userName';
export const TOKEN = 'token';
```

在需要存取的时候，直接引用：

```text
import { USER_NAME, TOKEN } from '../types.js'

sessionStorage[USER_NAME] = '张三';
localStorage[TOKEN] = 'xxx';
```

使用这种方法的好处在于一旦我们需要修改变量名，直接修改管理文件中的值即可，无需修改使用它的页面，同时这也可以避免命名冲突等问题的出现，这类似于 vuex 中 mutations 变量的管理。

### 9. 使用 setTimeout 代替 setInterval

一般情况下我们在项目里不建议使用 `setInterval`，因为其会存在代码的执行间隔比预期小以及 “丢帧” 的现象，原因在于其本身的实现逻辑。很多人会认为 setInterval 中第二个时间参数的作用是经过该毫秒数执行回调方法，其实不然，其真正的作用是**经过该毫秒数将回调方法放置到队列中去**，但是如果队列中存在正在执行的方法，其会等待之前的方法完毕再执行，如果存在还未执行的代码实例，其不会插入到队列中去，也就产生了 “丢帧”。

而 setTimeout 并不会出现这样的现象，因为每一次调用都会产生了一个新定时器，同时在前一个定时器代码执行完之前，不会向队列插入新的定时器代码。

```text
// 该定时器实际会在 3s 后立即触发下一次回调
setInterval(() => {
    // 执行完这里的代码需要 2s
}, 1000);

// 使用 setTimeout 改写，4秒后触发下一次回调
let doSometing = () => {
    // 执行完这里的代码需要 2s
    
    setTimeout(doSometing, 1000);
}

doSometing();
```

延伸阅读：[对于“不用setInterval，用setTimeout”的理解(opens new window)](https://segmentfault.com/a/1190000011282175)

### 10. 不要使用 for in 循环来遍历数组

大家应该都知道 `for in` 循环是用于遍历对象的，但它可以用来遍历数组吗？答案是可以的，因为数组在某种意义上也是对象，但是如果用其遍历数组会存在一些隐患：其会遍历数组原型链上的属性。

```text
let arr = [1, 2];

for (let key in arr) {
    console.log(arr[key]); // 会正常打印 1, 2
}

// 但是如果在 Array 原型链上添加一个方法
Array.prototype.test = function() {};

for (let key in arr) {
    console.log(arr[key]); // 此时会打印 1, 2, ƒ () {}
}
```

因为我们不能保证项目代码中不会对数组原型链进行操作，也不能保证引入的第三方库不对其进行操作，所以不要使用 for in 循环来遍历数组。

## 结语



本文罗列了 10 个项目开发中常见的编码技巧与规范，其实技巧和规范之间本身就是相辅相成的，所以没有分别进行罗列。当然实际的项目开发中存在着很多这样的例子需要大家自己去归纳和整理，比如使用 `name` 来命名你的组件等。如果你有不错的点子，也可以分享在下方的评论区域中供大家学习。

拓展阅读：[前端各类规范集合(opens new window)](https://github.com/ecomfe/spec)

## 思考 & 作业



- 可以使用哪些技巧来实现数组的循环遍历、去重等？
- 在 Vue 项目中如何使用 `ESLint` 来规范 JS 代码的编写？
- .vue 单文件组件中如何进行代码的格式化？



# 其他

# 开发拓展篇 1：扩充你的开发工具

在项目开发中，工具的使用起到了至关重要的作用，正所谓工欲善其事，必先利其器，掌握一些实用的开发工具能够使我们的开发效率事半功倍。

那么我们应该掌握哪些开发工具的使用方法呢？其实一路走来，我们已经介绍的开发工具包括了 `npm`、`yarn`、`webpack` 以及一些集成在项目中的工具包，这些工具一定程度上都大大简化了我们的开发流程，起到了项目助推剂的作用。因此在开发工具的学习上我们应该抱着宜多不宜少的心态，积极主动的扩充自己的工具库。

## 巧用 Chrome 插件



首先，既然说到工具，那我们不得不介绍下占据浏览器市场份额霸主地位的 `Chrome` 了。相信每一个从事前端开发的同学都对其寄存着一种亲切感，因为只要是参与 web 项目的开发就基本上离不开它的关照，比如它提供的调试控制台以及数以万计的插件等。

而作为一名前端开发人员，我想你的 Chrome 浏览器地址栏右侧肯定排列着几款你钟爱的插件，使用的插件数量越多说明了你掌握的 Chrome 技能越多，同时一定程度上也凸显了你的开发能力。

那么接下来我们不妨来认识一下几款实用的 Chrome 插件：

### Vue.js devtools

首先介绍的肯定是 [Vue.js devtools (opens new window)](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=zh-CN)，它是 Vue 官方发布的一款调试 Vue 项目的插件，支持数据模拟与调试。相信从事过 Vue 项目开发的同学都已经把它收入在自己的工具库中了，它的界面如下：

![img](https://s.poetries.top/gitee/2020/08/vue/32.png)

成功安装它之后，在 Vue 项目的页面中我们可以打开 Chrome 控制台选择 Vue 的 tab 进行页面调试。

### Vue Performance Devtool

在《Vue API 盲点解析》章节我们已经介绍了 [Vue Performance Devtool (opens new window)](https://chrome.google.com/webstore/detail/vue-performance-devtool/koljilikekcjfeecjefimopfffhkjbne)这款插件，它可以分析我们页面中各个组件的性能情况，从而在其基础上我们可以有针对性的对组件的代码进行优化，如下图所示：

![img](https://s.poetries.top/gitee/2020/09/130.png)

同样安装完毕后，我们可以打开 Chrome 控制台选择 `Vue Performance` 的 tab 进行组件的性能观察。

### Postman

[Postman (opens new window)](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en)相信大家都比较熟悉，它是一款非常好用的接口调试工具。在 Vue 项目开发中，我们或多或少需要对后台提供的接口进行测试，比如传递数据并查看返回结果等，这时候使用 Postman 便可以完成这些任务。

![img](https://s.poetries.top/gitee/2020/09/131.png)

Postman 会当作 Chrome 应用程序安装到你的电脑上，打开后我们可以选择请求方式（GET／POST），输入请求 URL 以及设置传递参数来进行接口的调用。

### Web Developer

[Web Developer (opens new window)](https://chrome.google.com/webstore/detail/web-developer/bfbameneiokkgbdmiekhjnmfkcnldhhm)是一款强大的用于操作网页中各项资源与浏览器的插件，比如一键禁用 JS、编辑 CSS、清除 Cookie 等。

![img](https://s.poetries.top/gitee/2020/09/132.png)

虽然说一些功能我们也可以在 Chrome 控制台实现，但其提供的快捷键能够十分方便的让我们在页面中操作某些资源。

### Google PageSpeed Insights API Extension

PageSpeed Insights (PSI) 是 `Google` 在全球范围内应用最广的开发者工具之一，其中文网页版 [developers.google.cn/speed/pagespeed/insights/](http://interview.poetries.top/fe-vue-docs/learn-vue-base/other/developers.google.cn/speed/pagespeed/insights/) 也已经发布。作为一款专注于改进网页性能的开发者工具，它主要具有以下两个优势：**真实的网页运行速度** 及 **优化建议**。

![img](https://s.poetries.top/gitee/2020/09/133.png)

为了便于使用，我们可以直接下载 Chrome 插件 [Google PageSpeed Insights API Extension (opens new window)](https://chrome.google.com/webstore/detail/google-pagespeed-insights/hfebkooaidmeboeblkkejdoepilnnjhn)来对当前访问网址进行测试和分析。

### FeHelper

FeHelper 是百度 FE 团队开发的一款前端工具集插件，包含代码压缩／性能检测／字符串编解码等功能，能够帮助我们完成一些琐碎的开发任务。

![img](https://s.poetries.top/gitee/2020/09/134.png)

FeHelper 为我们提供了十多种快捷功能，在需要的时候我们直接点击插件图标选择对应功能即可，操作起来十分便捷。

### Can I Use

[Can I Use (opens new window)](https://chrome.google.com/webstore/detail/can-i-use/decehbilpgknnlnkbgkcggjbgjbphljb)是 [https://caniuse.com/ (opens new window)](https://caniuse.com/)网页版的插件。我们可以使用其来查看某一特性的浏览器支持程度，确保主流浏览器的支持。

![img](https://s.poetries.top/gitee/2020/09/135.png)

使用 Chrome 插件形式的 Can I Use 我们可以快捷的查看项目中用到的某一特性的浏览器支持范围，同时还可以查看支持程度和兼容方式。

### 其他实用插件

- [JSONView (opens new window)](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc)：一款可以将后台返回的 JSON 字符串数据自动格式化成规范 JSON 格式的插件
- [WhatFont (opens new window)](https://chrome.google.com/webstore/detail/whatfont/jabopobgcpjmedljpbcaablpmlmfcogm)：一款可以显示浏览器中选择文字的字体类型／字号／颜色的插件
- [The QR Code Extension (opens new window)](https://chrome.google.com/webstore/detail/the-qr-code-extension/oijdcdmnjjgnnhgljmhkjlablaejfeeb)：一款允许当前页面生成二维码，并使用网络摄像头扫描二维码的插件
- [Test IE (opens new window)](https://chrome.google.com/webstore/detail/test-ie/eldlkpeoddgbmpjlnpfblfpgodnojfjl?hl=zh-CN)：一款可以模拟 `IE` 及其他主流浏览器的插件，但大部分模拟场景需要付费才能使用
- [Wappalyzer (opens new window)](https://chrome.google.com/webstore/detail/wappalyzer/gppongmhjkpfnbhagpmjfkannfbllamg)：一款查看当前网站使用的前后端技术的插件，帮助你学习和认识优秀网站的技术选型
- [Mobile/Responsive Web Design Tester (opens new window)](https://chrome.google.com/webstore/detail/mobileresponsive-web-desi/elmekokodcohlommfikpmojheggnbelo)：一款用于测试页面在不同机型下呈现的插件
- [Resolution Test (opens new window)](https://chrome.google.com/webstore/detail/resolution-test/idhfcdbheobinplaamokffboaccidbal)：一款用于测试页面在不同分辨率下呈现的插件

以上我们介绍了一些非常实用的 chrome 拓展插件来助力我们的前端开发，为项目开发提供了工具解决方案，同时也有助于帮助大家开启以工具为向导的开发模式。

## 分析你的包文件



每当我们使用 webpack 打包项目代码的时候，你可能需要关注一下打包生成的每个 js 文件的大小以及其包含的内容，这对于优化项目打包速度和提升页面加载性能都有十分大的帮助。

这里我们推荐使用 [webpack-bundle-analyzer (opens new window)](https://www.npmjs.com/package/webpack-bundle-analyzer)这一款 webpack 插件来进行包文件的分析，下面我们就来介绍下其配置和使用方法。

首先作为一款需要内置在代码中的开发分析工具，我们需要安装并在 webpack 的 plugins 中添加该插件：

```text
#  安装命令
yarn add webpack-bundle-analyzer --dev
/* vue.config.js */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const isPro = process.env.NODE_ENV === 'production'

module.exports = {
    
    ... 
    
    configureWebpack: config => {
        if (isPro) {
            return {
                plugins: [
                
                    // 使用包分析工具
                    new BundleAnalyzerPlugin()
                ]
            }
        }
    },
    
    ...
}
```

这样我们在生产环境下打包便可以在浏览器 8888 端口（默认）下打开页面进行包文件的分析，如下图所示：

![img](https://s.poetries.top/gitee/2020/08/vue/33.png)

图中区域内包含了我们打包出的所有 js 文件，我们可以以不同的颜色进行区分，同时我们也可以点击某一区块进行放大观察，以此来分析是否存在较大或重复的模块。而在页面左侧存在一个筛选面板，在该面板中我们能勾选需要查看的文件来进行显示，同时也可以切换查看原始、普通及 `GZIP` 压缩模式下的文件大小。

使用好 webpack-bundle-analyzer 工具我们可以快速的找到需要合并的模块，解决文件冗余，为资源优化提供可行性方案。

## 调试移动端页面



除了 Chrome 插件及打包分析工具的介绍外，我们再来了解下移动端页面的调试工具。相比 PC 端调试，移动端调试可能稍微复杂一点，但是只要熟练的使用好 “工具” 这一东西，我们同样可以在移动端的世界中游刃有余。

作为一名 `Mac` 及 `iOS` 用户，这里我主要介绍在 `iPhone` 手机中调试页面的方法，当然最后也会简单介绍一下 `Android` 手机页面的调试方法。

首先我们得具备这些工具：iPhone 手机一部、数据线一条、Mac 电脑一台。在满足以上要求后我们需要把手机通过数据线连接上 Mac 电脑，连接完毕后便可以进行如下步骤的设置：

#### 1. 打开苹果手机的 `Web 检查器` （设置 > Safari浏览器 > 高级 > Web检查器），一般情况下默认是开启的

#### 2. 打开 Mac 上的 `Safari` 的 `“开发”菜单`，一般情况下默认是开启的

![img](https://s.poetries.top/gitee/2020/08/vue/34.png)

#### 3. 在手机 Safari 浏览器中打开你需要调试的页面

#### 4. 在 Mac Safari 浏览器中选择你需要调试的页面（开发 > 你的 iPhone > 你的页面地址）

#### 5. 点击地址后弹出如图所示的控制台，你便可以在该控制台中进行调试了

![img](https://s.poetries.top/gitee/2020/08/vue/35.png)

最后你可以针对你的移动端页面进行断点调试、操作缓存、查看网络及资源等，帮助你快速的定位和解决问题。

而在 Android 手机中，我们同样可以对移动端页面进行调试，主要不同点在于 IOS 使用的工具是 iPhone 和 Mac，Android 使用的工具主要是 Android 手机和 Windows 系统罢了（Mac 也可以使用模拟器），当然还需要借助 Chrome 的帮助。

这里主要介绍一下 Chrome 中的 `inspect`，我们可以在 Chrome 地址栏输入：`chrome://inspect/` 来捕获手机访问的页面地址，前提是你的 Android 手机通过数据线连接上了电脑并开启了相应权限，最后获取到的地址会在 `Remote Target` 中显示：

![img](https://s.poetries.top/gitee/2020/08/vue/36.png)

点击相应的地址会弹出一个控制台，你可以在该控制台中进行页面的调试。

## 结语



本文介绍了 Vue 项目开发时常用的 Chrome 插件、包分析工具以及移动端调试工具，这些开发工具的使用能够帮助我们快速的定位项目中出现的一些疑难杂症，而唯有 “用正确的工具，做正确的事情” 才能有效的彰显工具对于项目开发和维护的重要性，使我们的工具库能够发挥它真正的价值。

## 思考 & 作业



- `webpack-bundle-analyzer` 有哪些配置项？分别有什么作用？
- 除了本文介绍的开发工具外，还有哪些比较实用的开发工具？



# 开发拓展篇 2：将 UI 界面交给第三方库

当你了解了 Vue 项目构建和开发的基本知识后，我认为接下来你一定想亲自在构建出的项目中填充自己的业务和功能逻辑，因为目前其还是空白的。

但是这里我不会教你如何实现一个具体的业务和功能模块，因为每个人想要实现的东西都可能不尽相同。如果你想快速开发一款应用，并且不想过多的操心页面 `UI` 层次的内容，比如你不想去实现一个下拉 UI 组件或设计一个 `icon` 图标，那么我想你有必要了解下 UI 库及图标库的应用。

## UI 库



UI 库是脱离 JS 框架外的一种 “工具”，相比 JS 框架可以帮助你实现各种业务逻辑，其更关注于页面 UI 层面的实现，比如提供和业务无关的弹窗、导航、表单组件等，为项目 UI 层面的功能提供解决方案，比如 [jQuery UI (opens new window)](https://jqueryui.com/)。

而由于本小册介绍的 JS 框架是 Vue，所以在 Vue 项目中我们需要使用基于 Vue 开发的 UI 库。本文将以比较流行的 [Vux (opens new window)](https://doc.vux.li/zh-CN/)为例，其目前 github star 数已在 14 k 左右。

> Vux 是一款是基于 [WeUI (opens new window)](https://weui.io/)和 `Vue(2.x)` 开发的移动端 UI 组件库，主要服务于微信页面。

### Vux 的安装和配置

那么我们如何在项目中使用 Vux 呢？首先我们先要进行安装：

```text
yarn add vux 

# 或者
npm install vux --save
```

同时我们还需要安装 [vux-loader (opens new window)](https://doc.vux.li/zh-CN/vux-loader/about.html)：

```text
yarn add vux-loader --dev

# 或者
npm install vux-loader --save-dev
```

安装完成后，我们需要在项目中进行配置，而由于目前 Vux 官网的配置教程未对 Vue CLI 3.x 作出说明，我们先来看下其目前的介绍：

```text
/* build/webpack.base.conf.js */
const vuxLoader = require('vux-loader')
const webpackConfig = originalConfig // 原来的 module.exports 代码赋值给变量 webpackConfig

module.exports = vuxLoader.merge(webpackConfig, {
    plugins: ['vux-ui']
})
```

官方目前的配置是在 Vue CLI 2.x 的 `build/webpack.base.conf.js` 文件中进行修改，merge `vux-loader` 的配置项。那么在 Vue CLI 3.x 中其实原理是一样的，不一样的地方在于我们无法直接修改 webpack 配置文件，而需要通过 vue.config.js 中的 `configureWebpack` 配置项来进行修改罢了。代码如下：

```text
/* vue.config.js */
const vuxLoader = require('vux-loader')

module.exports = {
    ...
    
    configureWebpack: config => {
        vuxLoader.merge(config, {
            plugins: ['vux-ui']
        })
    },
    
    ...
}
```

configureWebpack 配置中提供的 `config` 参数便是 webpack 的配置内容，也可以看作是官方文档中提到的原来在 `webpack.base.conf.js` 中的 `module.exports` 代码。

### Vux 的使用

当我们配置好 Vux 后，我们便可以在项目中使用了。Vux 为我们提供了很多项目中常用的组件和工具函数等，比如我们在全局父组件 App.vue 中添加一个底部导航：

```text
<!-- App.vue -->

<template>
    <div id="app">
        <router-view/>
        <tabbar>
            <tabbar-item :link="{name: 'demo'}">
                <span slot="label">Demo</span>
            </tabbar-item>
            <tabbar-item :link="{name: 'laboratory'}">
                <span slot="label">实验室</span>
            </tabbar-item>
            <tabbar-item :link="{name: 'about'}">
                <span slot="label">关于</span>
            </tabbar-item>
        </tabbar>	
    </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'

export default {
    components: {
        Tabbar,
        TabbarItem,
    }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
</style>
```

我们通过引入组件的方式将导航组 `Tabbar`、`TabbarItem` 件引入并注册到页面中，这样通过 Vux 文档中的介绍我们便可以对相应组件进行配置。呈现效果如下：

![img](https://s.poetries.top/gitee/2020/08/vue/37.png)

需要注意的是我们需要在 App.vue 中引入 Vux 的 `reset` 样式 less 文件以解决样式呈现不统一的问题。关于其他 Vux 组件的配置可以参考官方文档：[组件(opens new window)](https://doc.vux.li/zh-CN/components/actionsheet.html)

### 其他 UI 库（框架）

除了上方介绍的 Vux 外，类似的 Vue 的第三方 UI 库还有很多，这里我列举几个比较常用的：

- [iview (opens new window)](https://www.iviewui.com/)：一套基于 Vue.js 的高质量 UI 组件库（PC端）
- [iView Admin (opens new window)](https://github.com/iview/iview-admin)：搭配使用iView UI组件库形成的一套后台集成解决方案（PC端）
- [Element (opens new window)](http://element-cn.eleme.io/#/zh-CN)：一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库（PC端）
- [Vue Antd (opens new window)](http://okoala.github.io/vue-antd/#!/docs/introduce)：Ant Design 的 Vue 实现，开发和服务于企业级后台产品（PC端）
- [VueStrap (opens new window)](http://yuche.github.io/vue-strap/)：一款 Bootstrap 风格的 Vue UI 库（PC端）
- [Mint UI (opens new window)](http://mint-ui.github.io/#!/zh-cn)：由饿了么前端开发的基于 Vue.js 的移动端组件库（移动端）
- [Vonic (opens new window)](https://wangdahoo.github.io/vonic-documents/#/?id=vonic)：一个基于 vue.js 和 ionic 样式的 UI 框架，用于快速构建移动端单页应用（移动端）
- [Vant (opens new window)](https://youzan.github.io/vant/#/zh-CN/intro)：轻量、可靠的移动端 Vue 组件库（移动端）
- [Cube UI (opens new window)](https://didi.github.io/cube-ui/#/zh-CN/docs/introduction)：基于 Vue.js 实现的精致移动端组件库（移动端）

## 图标库



了解完 UI 库，我们再来了解下图标库。图标库，顾名思义就是汇聚了大量图标的仓库，在这样的仓库中我们可以查找并下载我们想要的图标，甚至还可以制定颜色和大小。

在项目中使用图标库可以为我们的项目制定统一的图标管理标准，同时一定程度上也可以减少项目图片的数量。下面我们便来介绍下目前最流行的一款图标库 [Iconfont (opens new window)](http://www.iconfont.cn/)。

### 使用 Iconfont 下载管理图标

> `Iconfont` 是阿里妈妈 `MUX` 倾力打造的矢量图标管理、交流平台。 设计师将图标上传到 Iconfont 平台，用户可以自定义下载多种格式的 icon，平台也可将图标转换为字体，便于前端工程师自由调整与调用。

![img](https://s.poetries.top/gitee/2020/08/vue/38.png)

在 Iconfont 首页，我们可以点击图标库来进行图标的搜索。这里我们可以点击官方图标库后选择 Ant Design 官方图标库进入。

![img](https://s.poetries.top/gitee/2020/08/vue/39.png)

进入对应的图标库后，我们可以选择对应的图标加入购物车，同时购物车会更新添加后的图标数量。

![img](https://s.poetries.top/gitee/2020/08/vue/40.png)

选择完成后，为了使图标便于今后管理，我们可以新建一个项目并将图标移入项目中。在项目中，我们便可以进行图标的添加、删除和下载等操作（需要登录）。

![img](https://s.poetries.top/gitee/2020/08/vue/41.png)

这里我们采用将图标下载到本地的方式进行使用，当然你也可以使用在线链接，但这会受到网络的影响。

### Iconfont 的使用

下载到本地后，我们需要将文件夹中的 `iconfont.css`、`iconfont.eot`、`iconfont.svg`、`iconfont.ttf` 和 `iconfont.woff` 文件统一放到项目中去，比如我们可以放入新建的 assets 文件夹的 iconfont 中去。而 iconfont.css 便是管理这样图标字体的样式文件，我们可以将其引入到入口文件中：

```text
/* main.js */

import './assets/iconfont/iconfont.css'
```

引入后我们便可以在项目中通过给 html 标签添加样式名称的方式来进行图标的使用，比如我们在上方 Vux 的导航上添加图标：

```text
<!-- App.vue -->

<template>
    <div id="app">
    	<router-view/>
        <tabbar>
            <tabbar-item :link="{name: 'demo'}">
                <span slot="icon" class="iconfont icon-bulb"></span>
                <span slot="label">Demo</span>
            </tabbar-item>
            <tabbar-item>
                <span slot="icon" class="iconfont icon-experiment"></span>
                <span slot="label">实验室</span>
            </tabbar-item>
            <tabbar-item>
                <span slot="icon" class="iconfont icon-deploymentunit"></span>
                <span slot="label">关于</span>
            </tabbar-item>
        </tabbar>	
    </div>
</template>
```

按照 Vux 导航文档添加名称为 `icon` 的 `solt` 插槽后，我们还需要在标签上添加对应图标的 class 名称，比如 `iconfont icon-bulb`，最终我们的展示效果如图所示：

![img](https://s.poetries.top/gitee/2020/08/vue/42.png)

### 其他图标库

除了 Iconfont，常用的图标库还有：

- [Font Awesome (opens new window)](https://fontawesome.com/)：世界上最受欢迎且最易于使用的图标集
- [Ionicons (opens new window)](https://ionicons.com/)：精美的开源图标库，可以用于Web，iOS，Android和桌面应用程序
- [Themify (opens new window)](https://themify.me/themify-icons)：一套用于网页设计和应用程序的完整图标

相信以上这些图标库就足以使你应付所有项目了。

## 结语



本文介绍了 Vue 项目开发中可能会使用到的 UI 库与图标库的应用，以 Vux 和 Iconfont 为例讲解了它们在项目中的使用方法和注意事项，相信大家能够在项目构建和开发的基础上使用 UI 库与图标库快速实现自己的项目 UI 层面的功能和展示，为自己的项目添砖加瓦。

具体实例代码可以参考：[ui-framework-project(opens new window)](https://github.com/luozhihao/vue-project-code/tree/master/ui-framework-project)

## 思考 & 作业



- 查看 Vux 源码，尝试自己编写一个 UI 插件
- Iconfont 是矢量图标库，其相比位图的主要区别是什么？



# 开发拓展篇 3：尝试使用外部数据

当你应用的 UI 层面已经趋于完善的时候，接下来你就需要去获取动态的数据来实现真实的应用场景。那么动态数据从哪里来呢？前端主要还是通过接口的形式获取。

如果有专业的接口开发人员和你一起完成一个应用，那么你只需要和他定义好接口的入参和出参，然后进行调用就好了，这也是公司中前端与后台的常见合作方式。

而在以下场景下，你可能并不需要或者并没有后台工程师提供接口给你：

- 你个人开发的项目
- 你的应用数据来源于外部

这时候你就需要通过调用**第三方接口**来实现应用的数据交互与展现。那么接下来我们就来介绍下第三方接口的使用。

## 介绍



大多数情况下，我们调用的第三方接口都是完全或者部分开源及免费的，因此只要在合理的范围内使用我们便可以实现一些简单的数据交互。本文将以[聚合数据 (opens new window)](https://www.juhe.cn/docs)提供的第三方接口 API 为例进行讲解。

### 聚合数据

> 聚合数据是国内领先的基础数据服务商， 以自有数据为基础，各种便捷服务整合以及第三方数据接入，为互联网开发全行业提供标准化 API 技术支撑服务的 DaaS 平台。

在官网 API 首页（[https://www.juhe.cn/docs (opens new window)](https://www.juhe.cn/docs)）我们可以选择你想要的接口类型进行调用，如下图所示：

![img](https://s.poetries.top/gitee/2020/08/vue/43.png)

其中包含了免费及付费的接口类型，如果只是用于单个的调用或测试，建议大家使用免费接口就可以了（非会员只能申请一个免费接口，比较坑），但如果你的应用准备上架或发布，你最好付费以获得更多的调用和使用接口的次数。

点击你想使用的接口后你便可以查看该接口的 API 文档，包括接口地址、请求方式、请求示例及返回示例等，比如这里我点击“笑话大全”：

![img](https://s.poetries.top/gitee/2020/08/vue/44.png)

调用接口需要平台提供的 `AppKey`，在你注册登录个人中心的**我的数据**中可以查看对应接口的 `AppKey`：

![img](https://s.poetries.top/gitee/2020/08/vue/45.png)

获取到 AppKey 后我们便可以对接口进行测试了，这里我们可以直接通过对应接口的测试按钮进行测试，当然你也可以通过 `postman` 工具进行调试：

![img](https://s.poetries.top/gitee/2020/08/vue/46.png)

测试完毕后，我们便可以在 Vue 项目中接入我们的第三方接口，实现动态数据和功能。

### 其他第三方接口

除了整合型的第三方接口聚合数据外，其他比较实用的第三方接口还有：

- [高德地图 (opens new window)](https://lbs.amap.com/)：访问高德地图的 Web API
- [GitHub (opens new window)](https://developer.github.com/v3/)：世界上领先的软件开发平台
- [百度翻译 (opens new window)](http://api.fanyi.baidu.com/api/trans/product/index)：支持多种语言之间的相互翻译
- [和风天气 (opens new window)](https://www.heweather.com/documents/)：中国天气信息
- [阿凡达数据 (opens new window)](https://www.avatardata.cn/Docs)：提供中国可用的 API

## 实例



接下来，我们便可以在 Vue 项目中接入第三方接口来实现数据的交互。这里我们以接入聚合数据的`历史上的今天`接口为例。

首先我们来看一下该接口的请求详情：

```text
请求地址：http://api.juheapi.com/japi/toh
请求参数：v=1.0&month=10&day=31&key=你的AppKey
请求方式：GET
```

上方详情中我们可以看到请求参数主要有 4 个，分别为：

- v：string 类型。版本，当前：1.0
- month：int 类型。月份，如：10
- day：int 类型。日，如：1
- key：string 类型。你的 AppKey

通过接口入参的说明我们可以知道唯一可以变的数据便是月份和日期，所以我们页面中得有选择**月日**的功能。

另外我们再来看一下该接口的出参示例：

```text
{
    "error_code": 0,
    "reason": "请求成功！",
    "result": [
        {
            "day": 1, 
            "des": "1907年11月1日 电影导演吴永刚诞生 &emsp;&emsp;吴永刚，1907年11月1日生于江苏吴县。1932年后参加影片《三个摩登女性》、《母性之光》的拍摄工作。1934年在联华影片公司编导处女作《神女》，一举成名，...",  
            "id": 9000, 
            "lunar": "丁未年九月廿六",
            "month": 11, 
            "pic": "",  
            "title": "电影导演吴永刚诞生",  
            "year": 1907  
        },
    }
}
```

通过上方示例，我们可以获取**历史上的今天**的标题、详情、图片等，这些数据可以用于页面展示。

这样经过接口入参和出参的分析，我们可以使用 Vux 构建一个简单的页面，如下图所示：

![img](https://s.poetries.top/gitee/2020/08/vue/47.png)

通过点击上图中“查看历史上的今天”按钮，便可以调用接口获取数据列表并渲染。主要代码如下：

```text
<template>
    <div>
        <datetime-view v-model="value" ref="datetime" :format="format"></datetime-view>
        <p class="info">选中值: {{ value }}</p>
        <div class="btn-padding">
            <x-button type="primary" @click.native="watchHistory">查看历史上的今天</x-button>
        </div>
        <panel header="历史上的今天" :list="list" type="1"></panel>
    </div>
</template>
<script>
import { DatetimeView, XButton, Panel } from 'vux'
import { getHistory } from '_ser/moduleB'

export default {
    data() {
        return {
    	    value: '10-31',
    	    format: 'MM-DD',
    	    list: []
        }
    },
    methods: {
        watchHistory() {
            let data = this.value.split('-')
        
            this.list = [];
        
            getHistory({
            	v: '1.0',
            	month: data[0],
            	day: data[1],
            	key: 'd6ceaf9be9f116ae45e7699845d87056'
            }).then(response => {
                if (!response.error_code) {
                    response.result.map(e => {
                        this.list.push({
                            title: e.title,
                            desc: e.des,
                            src: e.pic,
                        })
                    })
                }	
            })
        }
    },
    components: {
    	DatetimeView,
    	XButton,
    	Panel
    },
}
</script>
```

上方我们通过调用封装的 `getHistory` 接口名称进行数据的获取，在本地调用的过程中需要注意跨域的问题，可以配置 devServer 的 proxy 代理来解决：

```text
/* vue.config.js */

module.exports = {
    devServer: {
        proxy: {
            '/juheapi': {
                target: 'http://api.juheapi.com/',
                changeOrigin: true,
                pathRewrite: {'^/juheapi': ''}
            }
        }
    }
}
```

具体实例代码可以参考：[ui-framework-project(opens new window)](https://github.com/luozhihao/vue-project-code/tree/master/ui-framework-project)

这样我们便完成了使用第三方接口获取数据实现页面渲染的功能，为自己的应用填充了数据和功能。

## 结语



第三方接口的使用能够帮助我们快速的获取数据并实现应用的动态交互，同时也有助于解决接口开发的人力及服务器资源消耗，为部分 Vue 项目开发提供数据保障。

至此，本小册的开发部分章节也将告一段落。在这部分的内容中我们一起学习了 Vue 项目开发的实用技巧、方法和工具，并在构建出的项目基础上了解并实践了 Vue 开发的相关技术要点。希望这部分内容的介绍能够巩固大家对于 Vue 开发的基础知识，弥补 Vue 开发的技能空白。

## 思考 & 作业



- 自己通过调用外部数据完成一个页面动态的数据渲染
- devServer 的 proxy 代理是如何实现接口转换和重定向的？各配置项的作用是什么？