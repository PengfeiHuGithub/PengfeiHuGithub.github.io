# Node 学习指南

## 认识 Node.js



- Node 是一个服务器端 JavaScript 解释器
- Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境
- Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效
- Node.js 的包管理器 npm，是全球最大的开源库生态系统
- Node.js 是一门动态语言，运行在服务端的 Javascript

## 版本介绍



- 在命令窗口中输入 node -v 可以查看版本
- 0.x 完全不技术 ES6
- 4.x 部分支持 ES6 特性
- 5.x 部分支持ES6特性（比4.x多些），属于过渡产品，现在来说应该没有什么理由去用这个了
- 6.x 支持98%的 ES6 特性
- 8.x 支持 ES6 特性

## 环境搭建



- [下载安装文件(opens new window)](https://nodejs.org/en/download/)
- 下载完后进行安装，建议安装到默认路径，注意不要有中文路径
- 配置环境变量
- 在命令窗口中输入 node -v，如果正常显示版本号则表示安装成功

### NVM管理Node版本

> 先安装一个 nvm（ https://github.com/creationix/nvm ）

```bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.25.2/install.sh | bash
```

nvm 的全称是 **Node Version Manager**，之所以需要这个工具，是因为 Node.js 的各种特性都没有稳定下来，所以我们经常由于老项目或尝新的原因，需要切换各种版本。

安装完成后，你的 shell 里面应该就有个 nvm 命令了，调用它试试

```text
$ nvm
```

当看到有输出时，则 nvm 安装成功。

**安装 Node.js**

使用 nvm 的命令安装 Node.js

```text
$ nvm install 0.12
```

安装完成后，查看一下

```text
$ nvm ls
```

这时候可以看到自己安装的所有 Node.js 版本，输出应如下：

![img](https://raw.githubusercontent.com/alsotang/node-lessons/master/lesson0/1.png)

（图1）

那个绿色小箭头的意思就是现在正在使用的版本，我这里是 `v0.10.29`。我还安装了 `v0.11.14`，但它并非我当前使用的版本。

如果你那里没有出现绿色小箭头的话，告诉 nvm 你要使用 `0.12.x` 版本

```text
$ nvm use 0.12
```

然后再次查看，这时候小箭头应该出现了。

OK，我们在终端中输入

```text
$ node
```

REPL(read–eval–print loop) 应该就出来了，那我们就成功了。

随便敲两行命令玩玩吧。

比如 `> while (true) {}`，这时你的 CPU 应该会飚高。

**完善安装**

上述过程完成后，有时会出现，当开启一个新的 shell 窗口时，找不到 node 命令的情况。

这种情况一般来自两个原因

1. shell 不知道 nvm 的存在
2. nvm 已经存在，但是没有 default 的 Node.js 版本可用。

**解决方式：**

一、检查 `~/.profile` 或者 `~/.bash_profile` 中有没有这样两句

```text
export NVM_DIR="/Users/YOURUSERNAME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm
```

没有的话，加进去。这两句会在 bash 启动的时候被调用，然后注册 nvm 命令。

二、调用 `$ nvm ls`

看看像不像上述图1中一样，有 default 的指向。

如果没有的话，执行 `$ nvm alias default 0.12`再`$ nvm ls`

## Node.js 模块



模块系统是 Node.js 最基本也是最常用的。一般情况模块可分为四类：

- 原生模块
- 文件模块
- 第三方模块
- 自定义模块

### 自定义模块

1. 创建模块(b.js)

```javascript
//b.js
function FunA(){
    return 'Tom';
}
//暴露方法 FunA
module.exports = FunA;
```

1. 加载模块(a.js)

```javascript
//a.js
var FunA = require('./b.js');//得到 b.js => FunA
var name = FunA();// 运行 FunA，name = 'Tom'
console.log(name); // 输出结果
```

### module.exports

module.exports 就 Node.js 用于对外暴露，或者说对外开放指定访问权限的一个对象。如上面的案例，如果没有这段代码

```javascript
module.exports = FunA;
```

那么 `require('./b.js')` 就会为 `undefined`。 一个模块中有且仅有一个 `module.exports`，如果有多个那后面的则会覆盖前面的。

### exports

> `exports` 是 `module` 对象的一个属性，同时它也是一个对象。在很多时候一个 js 文件有多个需要暴露的方法或是对象，`module.exports` 又只能暴露一个，那这个时候就要用到 `exports`:

```javascript
function FunA(){
    return 'Tom';
}

function FunB(){
    return 'Sam';
}

exports.FunA = FunA;
exports.FunB = FunB;
//FunA = exports,exports 是一个对象
var FunA = require('./b.js');
var name1 = FunA.FunA();// 运行 FunA，name = 'Tom'
var name2 = FunA.FunB();// 运行 FunB，name = 'Sam'
console.log(name1);
console.log(name2);
```

当然在引入的时候也可以这样写

```javascript
//FunA = exports,exports 是一个对象
var {FunA, FunB} = require('./b.js');
var name1 = FunA();// 运行 FunA，name = 'Tom'
var name2 = FunB();// 运行 FunB，name = 'Sam'
console.log(name1);
console.log(name2);
```

## npm scripts



### NPM版本管理

```text
npm -v
```

**使用nrm管理npm版本**

```text
npm install -g nrm
```

> 执行命令`nrm ls`查看可选的源。



```text
*npm ---- https://registry.npmjs.org/

cnpm --- http://r.cnpmjs.org/

taobao - http://registry.npm.taobao.org/

eu ----- http://registry.npmjs.eu/

au ----- http://registry.npmjs.org.au/

sl ----- http://npm.strongloop.com/

nj ----- https://registry.nodejitsu.com/
```

其中，带`*`的是当前使用的源，上面的输出表明当前源是官方源。

1. 切换

如果要切换到`taobao`源，执行命令 `nrm use taobao`。

1. 增加

你可以增加定制的源，特别适用于添加企业内部的私有源，执行命令 `nrm add <registry> <url>`，其中`reigstry`为源名，`url`为源的路径。

```text
nrm add registry http://registry.npm.frp.trmap.cn/
```

1. 删除

执行命令`nrm del <registry>`删除对应的源。

1. 测试速度

你还可以通过 `nrm test` 测试相应源的响应时间。

```text
nrm test npm             
```

### 什么是 npm 脚本

> npm 允许在`package.json`文件里面，使用`scripts`字段定义脚本命令。`package.json` 里面的`scripts` 字段是一个对象。它的每一个属性，对应一段脚本。定义在`package.json`里面的脚本，就称为 `npm` 脚本。

查看当前项目的所有 npm 脚本命令，可以使用不带任何参数的`npm run`命令。

### 使用

- `npm run` 脚本名称
- 如果是并行执行（即同时的平行执行），可以使用&符号。 `npm run script1.js & npm run script2.js`
- 如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用&&符号。`npm run script1.js && npm run script2.js`

### 简写形式

- `npm start` 即 `npm run start`
- `npm stop` 即 `npm run stop`
- `npm test` 即 `npm run test`
- `npm restart` 即 `npm run stop && npm run restart && npm run start`



# Node 部署

## 一、forever



> `forever`则可以在`cmd`或`ssh`连接断开时,让项目一直运行,而且可以在项目崩溃时自动重启

- 安装 `npm install -g forever`
- `forever`的帮助手册 `forever --help`
- 使用`forever`启动项目 `forever start app.js`
- 使用`forever`停止项目 `forever stop app.js`
- 列出所有通过`forever`管理的项目 `forever list`
- 监视项目中的文件,当文件有变动时重启项目 `forever -w start app.js`

## 二、pm2



> 部署参考 http://blog.poetries.top/2018/11/18/react-ssr-next-deploy/

```text
npm install pm2 -g
```

新建一份index.js测试，运行以下命令测试

```text
pm2 start index.js
```

**运行**

> 你可以执行以下命令来重启和暂停服务

```text
pm2 stop     <app_name|id|'all'|json_conf>
pm2 restart  <app_name|id|'all'|json_conf>
pm2 delete   <app_name|id|'all'|json_conf>
```

> 比如`pm2 stop index.js`，暂停上面的`index.js`服务

**常用命令**

- 运行`pm2 start app.js`
- 查看运行状态 `pm2 list`
- 追踪资源运行情况 `pm2 monit`
- 查看日志 `pm2 logs`
- 重启应用 `pm2 restart appId`
- 停止应用 `pm2 stop app.js`
- 开启`api`访问 `pm2 web`

**自动重启**

当文件改动则自动重启服务

```text
pm2 start app.js --watch
```

这里是监控整个项目的文件，如果只想监听指定文件和目录，建议通过下面配置文件的`watch`、`ignore_watch`字段来设置

**配置文件**

编写一份`ecosystem.json`文件，完整配置说明请参考官方文档

```text
{
    "name": "test", // 应用名称
    "script": "./bin/www", // 实际启动脚本
    "cwd": "./", // 当前工作路径
    "watch": [ // 监控变化的目录，一旦变化，自动重启
        "bin",
        "routers"
    ],
    "ignore_watch": [ // 从监控目录中排除
        "node_modules",
        "logs",
        "public"
    ],
    "watch_options": {
        "followSymlinks": false
    },
    "max_memory_restart": "100M", //超过最大内存重启
    "error_file": "./logs/app-err.log", // 错误日志路径
    "out_file": "./logs/app-out.log", // 普通日志路径
    "env": {
        "NODE_ENV": "production" // 环境参数，当前指定为生产环境
    }
}
```

配置完后你可以执行以下命令

```bash
# Start all apps
pm2 start ecosystem.json

# Stop
pm2 stop ecosystem.json

# Restart
pm2 start ecosystem.json
## Or
pm2 restart ecosystem.json

# Reload
pm2 reload ecosystem.json

# Delete from PM2
pm2 delete ecosystem.json
```

这里注意的是配置文件改变了之后要先`delete`再`start`配置文件才能生效

**负载均衡**

命令如下，表示开启三个进程。如果-i 0，则会根据机器当前核数自动开启尽可能多的进程

```text
pm2 start app.js -i 3      //开启三个进程
pm2 start app.js -i max //根据机器CPU核数，开启对应数目的进程
```

**日志查看**

除了可以打开日志文件查看日志外，还可以通过pm2 logs来查看实时日志。这点对于线上问题排查非常重要

比如某个node服务突然异常重启了，那么可以通过pm2提供的日志工具来查看实时日志，看是不是脚本出错之类导致的异常重启。

```text
pm2 logs
```

**内存使用超过上限自动重启**

> 如果想要你的应用，在超过使用内存上限后自动重启，那么可以加上`--max-memory-restart`参数。（有对应的配置项）

```text
pm2 start big-array.js --max-memory-restart 20M
```

**pm2与forever对比**

| Feature             | Forever | PM2  |
| ------------------- | ------- | ---- |
| Keep Alive          | ✔       | ✔    |
| Coffeescript        | ✔       |      |
| Log aggregation     |         | ✔    |
| API                 |         | ✔    |
| Terminal monitoring |         | ✔    |
| Clustering          |         | ✔    |
| JSON configuration  |         | ✔    |

# 基础应用

## 路由



在 `BS` 架构中，路由的概念都是一样的，可理解为根据客户端请求的 `URL` 映射到不同的方法实现，更多的一般都是针对 `URL` 中的路径，或者是参数，又或者是锚点这些信息进行映射。

### 场景

1. 注册一个账户 --> [post] --> http://localhost:88/register
2. 注册成功的情况下跳转到登录界面进行登录 --> [post] --> http://localhost:88/login
3. 登录成功进行获取学生信息 --> [get] --> http://localhost:88/students
4. 同时可以获取订单信息 --> [get] --> http://localhost:88/orders
5. 如何访问不存在的路由则抛出错误信息。

```javascript
const http = require('http')
const url = require('url')
const qs = require('querystring');
const util = require('util');

http.createServer((request, response) => {
    let urlObj = url.parse(request.url, true);
    let pathname = urlObj.pathname;
    let method = request.method.toUpperCase();
    let params = urlObj.query;
    if(method == 'POST'){
        let postData = '';
        request.on('data', (_data) => {
            postData += '_data';
        })
        request.on('end', () => {
            postData = qs.parse(postData);
            let result = {};
            switch(pathname){
                case '/login':
                    //连接数据库，实现登陆逻辑
                    result = {status: true};
                    break;
                case '/register':
                    //连接数据库，实现注册逻辑
                    result = {status: true};
                    break;
                default :
                    result = {status: false, message: '没有对应的请求'};
                    break;                  
            }
            response.end(util.inspect(result))
        })
    } else {
        let result = {};
        switch(pathname){
            case '/students':
                //连接数据库，获取学生信息
                result = {status: true, data: [], params};
                break;
            case '/orders':
                //连接数据库，获取订单信息
                result = {status: true, data: [], params};
                break;
            default :
                result = {status: false, message: '没有对应的请求', params};
                break;
        }
        response.end(util.inspect(result))
    }
}).listen(88)
```

### Demo

```js
const http = require('http')
const url = require('url')
const qs = require('querystring');
const util = require('util');

http.createServer((request, response) => {
    let urlObj = url.parse(request.url, true);
    let pathname = urlObj.pathname;
    let method = request.method.toUpperCase();
    let params = urlObj.query;
    if(method == 'POST'){
        let postData = '';
        request.on('data', (_data) => {
            postData += '_data';
        })
        request.on('end', () => {
            postData = qs.parse(postData);
            let result = {};
            switch(pathname){
                case '/login':
                    //连接数据库，实现登陆逻辑
                    result = {status: true};
                    break;
                case '/register':
                    //连接数据库，实现注册逻辑
                    result = {status: true};
                    break;
                default :
                    result = {status: false, message: '没有对应的请求'};
                    break;                  
            }
            response.end(util.inspect(result))
        })
    } else {
        let result = {};
        switch(pathname){
            case '/students':
                //连接数据库，获取学生信息
                result = {status: true, data: [], params};
                break;
            case '/orders':
                //连接数据库，获取订单信息
                result = {status: true, data: [], params};
                break;
            default :
                result = {status: false, message: '没有对应的请求', params};
                break;
        }
        response.end(util.inspect(result))
    }
}).listen(88)
```

## request



一个第三方的模块，可用于发起 http 或 https 请求，可理解成服务端的 ajax 请求。可用于代简单的服务器代理，用法和 ajax 类似。

在使用前需要先安装 `npm install request --save`

### GET 请求

```javascript
request.get('https://cnodejs.org/api/v1/topics?page=1&limit=10', (error, response, body) => {
    console.log(body)
})
//or
request('https://cnodejs.org/api/v1/topics?page=1&limit=10', (error, response, body) => {
    console.log(body)
})
```

#### 多参数设置

```javascript
exports.get = function(url, options) {
    options = options || {};
    var httpOptions = {
        url: url,
        method: 'get',
        timeout: options.timeout || 10000,
        headers: options.headers || default_post_headers,
        proxy: options.proxy || '',
        agentOptions: agentOptions,
        params: options.params || {}
    }
    if(options.userAgent){
        httpOptions.headers = {
            'User-Agent': userAgents[options.userAgent],
        }
    }

    try{
        request.get(httpOptions, function(err, res, body) {
            if (err) {
                options.callback({status: false, error: err})
            } else {
                options.callback({status: res.statusCode == 200, error: res, data: body})
            }
        }).on('error', logger.error);
    } catch(err){
        console.log('http error');
    }
}
```

### POST 请求

request支持application/x-www-form-urlencoded和multipart/form-data实现表单上传。

#### application/x-www-form-urlencoded (URL-Encoded Forms)

```javascript
request.post('http://service.com/upload', {form:{key:'value'}})
// or
request.post('http://service.com/upload').form({key:'value'})
// or
request.post({url:'http://service.com/upload', form: {key:'value'}}, function(err,httpResponse,body){ /* ... */ })
```

#### multipart/form-data (Multipart Form Uploads)

```javascript
var formData = {
  // Pass a simple key-value pair
  my_field: 'my_value',
  // Pass data via Buffers
  my_buffer: new Buffer([1, 2, 3]),
  // Pass data via Streams
  my_file: fs.createReadStream(__dirname + '/unicycle.jpg'),
  // Pass multiple values /w an Array
  attachments: [
    fs.createReadStream(__dirname + '/attachment1.jpg'),
    fs.createReadStream(__dirname + '/attachment2.jpg')
  ],
  // Pass optional meta-data with an 'options' object with style: {value: DATA, options: OPTIONS}
  // Use case: for some types of streams, you'll need to provide "file"-related information manually.
  // See the `form-data` README for more information about options: https://github.com/form-data/form-data
  custom_file: {
    value:  fs.createReadStream('/dev/urandom'),
    options: {
      filename: 'topsecret.jpg',
      contentType: 'image/jpeg'
    }
  }
};
request.post({url:'http://service.com/upload', formData: formData}, function optionalCallback(err, httpResponse, body) {
  if (err) {
    return console.error('upload failed:', err);
  }
  console.log('Upload successful!  Server responded with:', body);
});
```

### 常用多参数设置

```javascript
exports.form_post = function(url, postdata, options) {
    // console.log(`${moment().format()} HttpFormPost: ${url}`)
    return new Promise((resolve, reject) => {
        options = options || {};
        var httpOptions = {
            url: url,
            form: postdata,
            method: 'post',
            timeout: options.timeout || 3000,
            headers: options.headers || default_post_headers,
            proxy: options.proxy || '',
            agentOptions: agentOptions
        };
        request(httpOptions, function(err, res, body) {
            if (err) {
                reject(err);
            } else {
                if (res.statusCode == 200) {
                    resolve(body);
                } else {
                    reject(res.statusCode);
                }
            }
        }).on('error', logger.error);
    });
};
```

### 流

```javascript
request('http://img.zcool.cn/community/018d4e554967920000019ae9df1533.jpg@900w_1l_2o_100sh.jpg').pipe(fs.createWriteStream('test.png'))
request('https://cnodejs.org/api/v1/topics?page=1&limit=10').pipe(fs.createWriteStream('cnodejs.json'))
```

## http 小爬虫



又被称为网页蜘蛛，网络机器人，主要是在服务端去请求外部的 url 拿到对方的资源，然后进行分析并抓取有效数据。

这里用 request 实现一个简单的图片抓取的小爬虫

```javascript
const request = require('request');
const fs = require('fs');
const cheerio = require('cheerio');

request('http://www.lanrentuku.com/', (error, response, body) => {
    let $ = cheerio.load(body);
    $('img', '.in-ne').each((i, e) => {
        let src = $(e).attr('src');
        let name = src.substr(src.lastIndexOf('/') + 1);
        request(src).pipe(fs.createWriteStream(name))
    })
})
```

## async



Node.js 是一个异步机制的服务端语言，在大量异步的场景下需要按顺序执行，那正常做法就是回调嵌套回调，回调嵌套太多的问题被称之回调地狱。

Node.js 为解决这一问题推出了异步控制流 ———— Async

### Async/Await

Async/Await 就 ES7 的方案，结合 ES6 的 Promise 对象，使用前请确定 Node.js 的版本是 7.6 以上。

Async/await的主要益处是可以避免回调地狱（callback hell），且以最接近同步代码的方式编写异步代码。

### 基本规则

- async 表示这是一个async函数，await只能用在这个函数里面。
- await 表示在这里等待promise返回结果了，再继续执行。
- await 后面跟着的应该是一个promise对象

### 对比使用

场景：3秒后返回一个值

#### 原始时代

```javascript
let sleep = (time, cb) => {
    setTimeout(() => {
        cb('ok');
    }, 3000);
}

let start = () => {
    sleep(3000, (result) => {
        console.log(result)
    })
}

start()
```

#### Promise 时代

```javascript
let sleep = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
           resolve('ok') ;
        }, time);
    })
}

let start = () => {
    sleep(3000).then((result) => {
        console.log(result)
    })
}

start()
```

#### Async/Await 时代

```javascript
let sleep = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
           resolve('ok') ;
        }, time);
    })
}

let start = async () => {
    let result = await sleep(3000);
    console.log(result)
}

start();
```

### 捕捉错误

```javascript
let sleep = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('error') ;
        }, time);
    })
}

let start = async () => {
    try{
        let result = await sleep(3000);
        console.log(result)
    } catch(err) {
        console.log('error')
    }
}

start();
```

### 在循环中使用

```javascript
let sleep = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('ok') ;
        }, time);
    })
}

let start = async () => {
    for (var i = 1; i <= 3; i++) {
        console.log(`当前是第${i}次等待..`);
        await sleep(1000);
    }
}

start();
```

### 爬虫中使用

```javascript
const request = require('request');
const fs = require('fs');
const cheerio = require('cheerio');

let spider = (url) => {
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            resolve(body);
        })
    })
}

let start = async () => {
    let dom = await spider('http://www.lanrentuku.com/');
    let $ = cheerio.load(dom);
    $('img', '.in-ne').each((i, e) => {
        let src = $(e).attr('src');
        let name = src.substr(src.lastIndexOf('/') + 1);
        request(src).pipe(fs.createWriteStream(name))
    })
}

start();
```

# 内置模块

# 1.0 本地路径处理path

## 模块概览



在nodejs中，path是个使用频率很高，但却让人又爱又恨的模块。部分因为文档说的不够清晰，部分因为接口的平台差异性。

将path的接口按照用途归类，仔细琢磨琢磨，也就没那么费解了。

## 获取路径/文件名/扩展名



- 获取路径：path.dirname(filepath)
- 获取文件名：path.basename(filepath)
- 获取扩展名：path.extname(filepath)

### 获取所在路径

例子如下：

```javascript
var path = require('path');
var filepath = '/tmp/demo/js/test.js';

// 输出：/tmp/demo/js
console.log( path.dirname(filepath) );
```

### 获取文件名

严格意义上来说，path.basename(filepath) 只是输出路径的最后一部分，并不会判断是否文件名。

但大部分时候，我们可以用它来作为简易的“获取文件名“的方法。

```javascript
var path = require('path');

// 输出：test.js
console.log( path.basename('/tmp/demo/js/test.js') );

// 输出：test
console.log( path.basename('/tmp/demo/js/test/') );

// 输出：test
console.log( path.basename('/tmp/demo/js/test') );
```

如果只想获取文件名，单不包括文件扩展呢？可以用上第二个参数。

```javascript
// 输出：test
console.log( path.basename('/tmp/demo/js/test.js', '.js') );
```

### 获取文件扩展名

简单的例子如下：

```javascript
var path = require('path');
var filepath = '/tmp/demo/js/test.js';

// 输出：.js
console.log( path.extname(filepath) );
```

更详细的规则是如下：（假设 path.basename(filepath) === B ）

- 从B的最后一个`.`开始截取，直到最后一个字符。
- 如果B中不存在`.`，或者B的第一个字符就是`.`，那么返回空字符串。

直接看[官方文档 (opens new window)](https://nodejs.org/api/path.html#path_path_extname_path)的例子

```javascript
path.extname('index.html')
// returns '.html'

path.extname('index.coffee.md')
// returns '.md'

path.extname('index.')
// returns '.'

path.extname('index')
// returns ''

path.extname('.index')
// returns ''
```

## 路径组合



- path.join([...paths])
- path.resolve([...paths])

### path.join([...paths])

把`paths`拼起来，然后再normalize一下。这句话反正我自己看着也是莫名其妙，可以参考下面的伪代码定义。

例子如下：

```text
var path = require('path');

// 输出 '/foo/bar/baz/asdf'
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
```

path定义的伪代码如下：

```javascript
module.exports.join = function(){
  var paths = Array.prototye.slice.call(arguments, 0);
  return this.normalize( paths.join('/') );
};
```

### path.resolve([...paths])

这个接口的说明有点啰嗦。你可以想象现在你在shell下面，从左到右运行一遍`cd path`命令，最终获取的绝对路径/文件名，就是这个接口所返回的结果了。

比如 `path.resolve('/foo/bar', './baz')` 可以看成下面命令的结果

```bash
cd /foo/bar
cd ./baz
```

更多对比例子如下：

```javascript
var path = require('path');

// 假设当前工作路径是 /Users/a/Documents/git-code/nodejs-learning-guide/examples/2016.11.08-node-path

// 输出 /Users/a/Documents/git-code/nodejs-learning-guide/examples/2016.11.08-node-path
console.log( path.resolve('') )

// 输出 /Users/a/Documents/git-code/nodejs-learning-guide/examples/2016.11.08-node-path
console.log( path.resolve('.') )

// 输出 /foo/bar/baz
console.log( path.resolve('/foo/bar', './baz') );

// 输出 /foo/bar/baz
console.log( path.resolve('/foo/bar', './baz/') );

// 输出 /tmp/file
console.log( path.resolve('/foo/bar', '/tmp/file/') );

// 输出 /Users/a/Documents/git-code/nodejs-learning-guide/examples/2016.11.08-node-path/www/js/mod.js
console.log( path.resolve('www', 'js/upload', '../mod.js') );
```

## 路径解析



path.parse(path)

## path.normalize(filepath)



从官方文档的描述来看，path.normalize(filepath) 应该是比较简单的一个API，不过用起来总是觉得没底。

为什么呢？API说明过于简略了，包括如下：

- 如果路径为空，返回`.`，相当于当前的工作路径。
- 将对路径中重复的路径分隔符（比如linux下的`/`)合并为一个。
- 对路径中的`.`、`..`进行处理。（类似于shell里的`cd ..`）
- 如果路径最后有`/`，那么保留该`/`。

感觉stackoverflow上一个兄弟对这个API的解释更实在，[原文链接 (opens new window)](http://stackoverflow.com/questions/10822574/difference-between-path-normalize-and-path-resolve-in-node-js)。

> In other words, path.normalize is "What is the shortest path I can take that will take me to the same place as the input"

代码示例如下。建议读者把代码拷贝出来运行下，看下实际效果。

```javascript
var path = require('path');

var index = 0;

var compare = function(desc, callback){
  console.log('[用例%d]：%s', ++index, desc);
  callback();
  console.log('\n');
};

compare('路径为空', function(){
  // 输出 .
  console.log( path.normalize('') );
});

compare('路径结尾是否带/', function(){
  // 输出 /tmp/demo/js/upload
  console.log( path.normalize('/tmp/demo/js/upload') );

  // /tmp/demo/js/upload/
  console.log( path.normalize('/tmp/demo/js/upload/') );
});

compare('重复的/', function(){
  // 输出 /tmp/demo/js
  console.log( path.normalize('/tmp/demo//js') );
});

compare('路径带..', function(){
  // 输出 /tmp/demo/js
  console.log( path.normalize('/tmp/demo/js/upload/..') );
});

compare('相对路径', function(){
  // 输出 demo/js/upload/
  console.log( path.normalize('./demo/js/upload/') );

  // 输出 demo/js/upload/
  console.log( path.normalize('demo/js/upload/') );
});

compare('不常用边界', function(){
  // 输出 ..
  console.log( path.normalize('./..') );

  // 输出 ..
  console.log( path.normalize('..') );

  // 输出 ../
  console.log( path.normalize('../') );

  // 输出 /
  console.log( path.normalize('/../') );
  
  // 输出 /
  console.log( path.normalize('/..') );
});
```

感兴趣的可以看下 path.normalize(filepath) 的node源码如下：[传送门(opens new window)](https://github.com/nodejs/node/blob/master/lib/path.js)

## 文件路径分解/组合



- path.format(pathObject)：将pathObject的root、dir、base、name、ext属性，按照一定的规则，组合成一个文件路径。
- path.parse(filepath)：path.format()方法的反向操作。

我们先来看看官网对相关属性的说明。

首先是linux下

```bash
┌─────────────────────┬────────────┐
│          dir        │    base    │
├──────┬              ├──────┬─────┤
│ root │              │ name │ ext │
"  /    home/user/dir / file  .txt "
└──────┴──────────────┴──────┴─────┘
(all spaces in the "" line should be ignored -- they are purely for formatting)
```

然后是windows下

```bash
┌─────────────────────┬────────────┐
│          dir        │    base    │
├──────┬              ├──────┬─────┤
│ root │              │ name │ ext │
" C:\      path\dir   \ file  .txt "
└──────┴──────────────┴──────┴─────┘
(all spaces in the "" line should be ignored -- they are purely for formatting)
```

### path.format(pathObject)

阅读相关API文档说明后发现，path.format(pathObject)中，pathObject的配置属性是可以进一步精简的。

根据接口的描述来看，以下两者是等价的。

- `root` vs `dir`：两者可以互相替换，区别在于，路径拼接时，`root`后不会自动加`/`，而`dir`会。
- `base` vs `name+ext`：两者可以互相替换。

```javascript
var path = require('path');

var p1 = path.format({
  root: '/tmp/', 
  base: 'hello.js'
});
console.log( p1 ); // 输出 /tmp/hello.js

var p2 = path.format({
  dir: '/tmp', 
  name: 'hello',
  ext: '.js'
});
console.log( p2 );  // 输出 /tmp/hello.js
```

### path.parse(filepath)

path.format(pathObject) 的反向操作，直接上官网例子。

四个属性，对于使用者是挺便利的，不过path.format(pathObject) 中也是四个配置属性，就有点容易搞混。

```javascript
path.parse('/home/user/dir/file.txt')
// returns
// {
//    root : "/",
//    dir : "/home/user/dir",
//    base : "file.txt",
//    ext : ".txt",
//    name : "file"
// }
```

## 获取相对路径



接口：path.relative(from, to)

描述：从`from`路径，到`to`路径的相对路径。

边界：

- 如果`from`、`to`指向同个路径，那么，返回空字符串。
- 如果`from`、`to`中任一者为空，那么，返回当前工作路径。

上例子：

```javascript
var path = require('path');

var p1 = path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb');
console.log(p1);  // 输出 "../../impl/bbb"

var p2 = path.relative('/data/demo', '/data/demo');
console.log(p2);  // 输出 ""

var p3 = path.relative('/data/demo', '');
console.log(p3);  // 输出 "../../Users/a/Documents/git-code/nodejs-learning-guide/examples/2016.11.08-node-path"
```

## 平台相关接口/属性



以下属性、接口，都跟平台的具体实现相关。也就是说，同样的属性、接口，在不同平台上的表现不同。

- path.posix：path相关属性、接口的linux实现。
- path.win32：path相关属性、接口的win32实现。
- path.sep：路径分隔符。在linux上是`/`，在windows上是`\`。
- path.delimiter：path设置的分割符。linux上是`:`，windows上是`;`。

注意，当使用 path.win32 相关接口时，参数同样可以使用`/`做分隔符，但接口返回值的分割符只会是`\`。

直接来例子更直观。

```bash
> path.win32.join('/tmp', 'fuck')
'\\tmp\\fuck'
> path.win32.sep
'\\'
> path.win32.join('\tmp', 'demo')
'\\tmp\\demo'
> path.win32.join('/tmp', 'demo')
'\\tmp\\demo'
```

### path.delimiter

linux系统例子：

```bash
console.log(process.env.PATH)
// '/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin'

process.env.PATH.split(path.delimiter)
// returns ['/usr/bin', '/bin', '/usr/sbin', '/sbin', '/usr/local/bin']
```

windows系统例子：

```bash
console.log(process.env.PATH)
// 'C:\Windows\system32;C:\Windows;C:\Program Files\node\'

process.env.PATH.split(path.delimiter)
// returns ['C:\\Windows\\system32', 'C:\\Windows', 'C:\\Program Files\\node\\']
```

## 相关链接



官方文档：https://nodejs.org/api/path.html#path_path

# 2.0 文件系统操作fs

## 文件读取



### 普通读取

同步读取

```javascript
var fs = require('fs');
var data;

try{
    data = fs.readFileSync('./fileForRead.txt', 'utf8');
    console.log('文件内容: ' + data);
}catch(err){
    console.error('读取文件出错: ' + err.message);
}
```

输出如下：

```powershell
/usr/local/bin/node readFileSync.js
文件内容: hello world
```

异步读取

```javascript
var fs = require('fs');

fs.readFile('./fileForRead.txt', 'utf8', function(err, data){
    if(err){
        return console.error('读取文件出错: ' + err.message);
    }
    console.log('文件内容: ' + data);
});
```

输出如下

```powershell
/usr/local/bin/node readFile.js
文件内容: hello world
```

### 通过文件流读取

适合读取大文件

```javascript
var fs = require('fs');
var readStream = fs.createReadStream('./fileForRead.txt', 'utf8');

readStream
    .on('data', function(chunk) {
        console.log('读取数据: ' + chunk);
    })
    .on('error', function(err){
        console.log('出错: ' + err.message);
    })
    .on('end', function(){  // 没有数据了
        console.log('没有数据了');
    })
    .on('close', function(){  // 已经关闭，不会再有事件抛出
        console.log('已经关闭');
    });
```

输出如下

```powershell
/usr/local/bin/node createReadStream.js
读取数据: hello world
没有数据了
已经关闭
```

## 文件写入



备注：以下代码，如果文件不存在，则创建文件；如果文件存在，则覆盖文件内容；

异步写入

```javascript
var fs = require('fs');

fs.writeFile('./fileForWrite.txt', 'hello world', 'utf8', function(err){
    if(err) throw err;
    console.log('文件写入成功');
});
```

同步写入

```javascript
var fs = require('fs');

try{
    fs.writeFileSync('./fileForWrite1.txt', 'hello world', 'utf8');
    console.log('文件写入成功');
}catch(err){
    throw err;
}
```

### 通过文件流写入

```javascript
var fs = require('fs');
var writeStream = fs.createWriteStream('./fileForWrite1.txt', 'utf8');

writeStream
    .on('close', function(){  // 已经关闭，不会再有事件抛出
        console.log('已经关闭');
    });

writeStream.write('hello');
writeStream.write('world');
writeStream.end('');
```

### 相对底层的接口

> fs.write(fd, buffer, offset, length[, position], callback) fs.write(fd, data[, position[, encoding]], callback) fs.writeSync(fd, buffer, offset, length[, position]) fs.writeSync(fd, data[, position[, encoding]])

- fd：写入的文件句柄。
- buffer：写入的内容。
- offset：将buffer从offset位置开始，长度为length的内容写入。
- length：写入的buffer内容的长度。
- position：从打开文件的position处写入。
- callback：参数为 `(err, written, buffer)`。`written`表示有xx字节的buffer被写入。

备注：`fs.write(fd, buffer, offset, length[, position], callback)`跟`fs.write(fd, data[, position[, encoding]], callback)`的区别在于：后面的只能把所有的data写入，而前面的可以写入指定的data子串？

## 文件是否存在



`fs.exists()`已经是`deprecated`状态，现在可以通过下面代码判断文件是否存在。

```javascript
var fs = require('fs');

fs.access('./fileForRead.txt', function(err){
    if(err) throw err;
    console.log('fileForRead.txt存在');
});

fs.access('./fileForRead2.txt', function(err){
    if(err) throw err;
    console.log('fileForRead2.txt存在');
});
```

`fs.access()`除了判断文件是否存在（默认模式），还可以用来判断文件的权限。

备忘：`fs.constants.F_OK`等常量无法获取（node v6.1，mac 10.11.4下，`fs.constants`是`undefined`）

## 创建目录



异步版本（如果目录已存在，会报错）

```javascript
var fs = require('fs');

fs.mkdir('./hello', function(err){
    if(err) throw err;
    console.log('目录创建成功');
});
```

同步版本

```javascript
var fs = require('fs');

fs.mkdirSync('./hello');
```

## 删除文件



```javascript
var fs = require('fs');

fs.unlink('./fileForUnlink.txt', function(err){
    if(err) throw err;
    console.log('文件删除成功');
});
var fs = require('fs');

fs.unlinkSync('./fileForUnlink.txt');
```

## 创建目录



```javascript
// fs.mkdir(path[, mode], callback)
var fs = require('fs');

fs.mkdir('sub', function(err){
    if(err) throw err;
    console.log('创建目录成功');
});
// fs.mkdirSync(path[, mode])
var fs = require('fs');

try{
    fs.mkdirSync('hello');
    console.log('创建目录成功');
}catch(e){
    throw e;
}
```

## 遍历目录



同步版本，注意：`fs.readdirSync()`只会读一层，所以需要判断文件类型是否目录，如果是，则进行递归遍历。

```javascript
// fs.readdirSync(path[, options])

var fs = require('fs');
var path = require('path');

var getFilesInDir = function(dir){

    var results = [ path.resolve(dir) ];
    var files = fs.readdirSync(dir, 'utf8');

    files.forEach(function(file){

        file = path.resolve(dir, file);

        var stats = fs.statSync(file);

        if(stats.isFile()){
            results.push(file);
        }else if(stats.isDirectory()){
            results = results.concat( getFilesInDir(file) );
        }
    });

    return results;
};

var files = getFilesInDir('../');
console.log(files);
```

异步版本：（TODO）

```javascript

```

## 文件重命名



```javascript
// fs.rename(oldPath, newPath, callback)
var fs = require('fs');

fs.rename('./hello', './world', function(err){
    if(err) throw err;
    console.log('重命名成功');
});
fs.renameSync(oldPath, newPath)
var fs = require('fs');

fs.renameSync('./world', './hello');
```

## 监听文件修改



`fs.watch()`比`fs.watchFile()`高效很多（why）

### fs.watchFile()

实现原理：轮询。每隔一段时间检查文件是否发生变化。所以在不同平台上表现基本是一致的。

```javascript
var fs = require('fs');

var options = {
    persistent: true,  // 默认就是true
    interval: 2000  // 多久检查一次
};

// curr, prev 是被监听文件的状态, fs.Stat实例
// 可以通过 fs.unwatch() 移除监听
fs.watchFile('./fileForWatch.txt', options, function(curr, prev){
    console.log('修改时间为: ' + curr.mtime);
});
```

修改`fileForWatch.txt`，可以看到控制台下打印出日志

```powershell
/usr/local/bin/node watchFile.js
修改时间为: Sat Jul 16 2016 19:03:57 GMT+0800 (CST)
修改时间为: Sat Jul 16 2016 19:04:05 GMT+0800 (CST)
```

为啥子？莫非单纯访问文件也会触发回调？

> If you want to be notified when the file was modified, not just accessed, you need to compare curr.mtime and prev.mtime.

在 **v0.10** 之后的改动。如果监听的文件不存在，会怎么处理。如下

> Note: when an fs.watchFile operation results in an ENOENT error, it will invoke the listener once, with all the fields zeroed (or, for dates, the Unix Epoch). In Windows, blksize and blocks fields will be undefined, instead of zero. If the file is created later on, the listener will be called again, with the latest stat objects. This is a change in functionality since v0.10.

### fs.watch()

> fs.watch(filename[, options][, listener]) fs.unwatchFile(filename[, listener])

这接口非常不靠谱（当前测试用的v6.1.0），参考 https://github.com/nodejs/node/issues/7420

> fs.watch(filename[, options][, listener])#

注意：`fs.watch()`这个接口并不是在所有的平台行为都一致，并且在某些情况下是不可用的。`recursive`这个选项只在`mac`、`windows`下可用。

问题来了：

1. 不一致的表现。
2. 不可用的场景。
3. linux上要recursive咋整。

> The fs.watch API is not 100% consistent across platforms, and is unavailable in some situations. The recursive option is only supported on OS X and Windows.

备忘，不可用的场景。比如网络文件系统等。

> For example, watching files or directories can be unreliable, and in some cases impossible, on network file systems (NFS, SMB, etc), or host file systems when using virtualization software such as Vagrant, Docker, etc.

另外，listener回调有两个参数，分别是`event`、`filename`。其中，`filename`仅在linux、windows上会提供，并且不是100%提供，所以，尽量不要依赖`filename`。

在linux、osx上，`fs.watch()`监听的是inode。如果文件被删除，并重新创建，那么删除事件会触发。同时，`fs.watch()`监听的还是最初的inode。（API的设计就是这样的）

结论：怎么看都感觉这个API很不靠谱，虽然性能比fs.watchFile()要高很多。

先来个例子，在osx下测试了一下，简直令人绝望。。。无论是创建、修改、删除文件，`evt`都是`rename`。。。

```javascript
var fs = require('fs');

var options = {
    persistent: true,
    recursive: true,
    encoding: 'utf8'
};

fs.watch('../', options, function(event, filename){
    console.log('触发事件:' + event);
    if(filename){
        console.log('文件名是: ' + filename);
    }else{
        console.log('文件名是没有提供');
    }
});
```

修改下`fileForWatch.txt`，看到下面输出。。。感觉打死也不想用这个API。。。

贴下环境：osx 10.11.4, node v6.1.0。

```powershell
触发事件:rename
文件名是: fs/fileForWatch.txt___jb_bak___
触发事件:rename
文件名是: fs/fileForWatch.txt
触发事件:rename
文件名是: fs/fileForWatch.txt___jb_old___
触发事件:rename
文件名是: .idea/workspace.xml___jb_bak___
触发事件:rename
文件名是: .idea/workspace.xml
触发事件:rename
文件名是: .idea/workspace.xml___jb_old___
```

## 修改所有者



参考linux命令行，不举例子了。。。

> fs.chown(path, uid, gid, callback) fs.chownSync(path, uid, gid) fs.fchown(fd, uid, gid, callback) fs.fchownSync(fd, uid, gid)

## 修改权限



可以用`fs.chmod()`，也可以用`fs.fchmod()`。两者的区别在于，前面传的是文件路径，后面传的的文件句柄。

1. `fs.chmod)`、`fs.fchmod()`区别：传的是文件路径，还是文件句柄。
2. `fs.chmod()`、`fs.lchmod()`区别：如果文件是软连接，那么`fs.chmod()`修改的是软连接指向的目标文件；`fs.lchmod()`修改的是软连接。

> fs.chmod(path, mode, callback) fs.chmodSync(path, mode)

> fs.fchmod(fd, mode, callback) fs.fchmodSync(fd, mode)

> fs.lchmod(path, mode, callback)# fs.lchmodSync(path, mode)

例子：

```javascript
var fs = require('fs');

fs.chmod('./fileForChown.txt', '777', function(err){
    if(err) console.log(err);
    console.log('权限修改成功');
});
```

同步版本：

```text
var fs = require('fs');

fs.chmodSync('./fileForChown.txt', '777');
```

## 获取文件状态



区别：

- `fs.stat()` vs `fs.fstat()`：传文件路径 vs 文件句柄。
- `fs.stat()` vs `fs.lstat()`：如果文件是软链接，那么`fs.stat()`返回目标文件的状态，`fs.lstat()`返回软链接本身的状态。

> fs.stat(path, callback) fs.statSync(path)

> fs.fstat(fd, callback) fs.fstatSync(fd)

> fs.lstat(path, callback) fs.lstatSync(path)

主要关注`Class: fs.Stats`。

首先是方法

- stats.isFile() -- 是否文件
- stats.isDirectory() -- 是否目录
- stats.isBlockDevice() -- 什么鬼
- stats.isCharacterDevice() -- 什么鬼
- stats.isSymbolicLink() (only valid with fs.lstat()) -- 什么鬼
- stats.isFIFO() -- 什么鬼
- stats.isSocket() -- 是不是socket文件

官网例子：

```javascript
{
  dev: 2114,
  ino: 48064969,
  mode: 33188,
  nlink: 1,
  uid: 85,
  gid: 100,
  rdev: 0,
  size: 527,
  blksize: 4096,
  blocks: 8,
  atime: Mon, 10 Oct 2011 23:24:11 GMT, // 访问时间
  mtime: Mon, 10 Oct 2011 23:24:11 GMT,  // 文件内容修改时间
  ctime: Mon, 10 Oct 2011 23:24:11 GMT,  // 文件状态修改时间
  birthtime: Mon, 10 Oct 2011 23:24:11 GMT  // 创建时间
}
```

- atime：Access Time // 访问时间
- mtime:: Modified Time // 文件内容修改时间
- ctime: Changed Time. // 文件状态修改时间，比如修改文件所有者、修改权限、重命名等
- birthtime: Birth Time // 创建时间。在某些系统上是不可靠的，因为拿不到。

例子：

```javascript
var fs = require('fs');

var getTimeDesc = function(d){
    return [d.getFullYear(), d.getMonth()+1, d.getDate()].join('-') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
};

fs.stat('./fileForStat.txt', function(err, stats){
    console.log('文件大小: ' + stats.size);
    console.log('创建时间: ' + getTimeDesc(stats.birthtime));
    console.log('访问时间: ' + getTimeDesc(stats.atime));
    console.log('修改时间: ' + getTimeDesc(stats.mtime));
});
```

输出如下：

```powershell
/usr/local/bin/node stat.js
文件大小: 3613
创建时间: 2016-7-16 12:40:49
访问时间: 2016-7-16 12:40:49
修改时间: 2016-7-16 12:40:49

Process finished with exit code 0
```

同步的例子：

```javascript
var fs = require('fs');

var getTimeDesc = function(d){
    return [d.getFullYear(), d.getMonth()+1, d.getDate()].join('-') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
};

var stats = fs.statSync('./fileForStat.txt');

console.log('文件大小: ' + stats.size);
console.log('创建时间: ' + getTimeDesc(stats.birthtime));
console.log('访问时间: ' + getTimeDesc(stats.atime));
console.log('修改时间: ' + getTimeDesc(stats.mtime));
```

## 访问/权限检测



例子：

```javascript
// fs.access(path[, mode], callback)
var fs = require('fs');

fs.access('./fileForAccess.txt', function(err){
    if(err) throw err;
    console.log('可以访问');
});
```

同步版本：

```javascript
// fs.accessSync(path[, mode])
var fs = require('fs');

// 如果成功，则返回undefined，如果失败，则抛出错误（什么鬼）
try{
    fs.accessSync('./fileForAccess.txt');
}catch(e){
    throw(e);
}
```

## 文件打开/关闭



比较底层的接口，实际需要用到的机会不多。需要用到的时候看下[文档 (opens new window)](https://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback)就行。

- flags：文件打开模式，比如`r`、`r+`、`w`、`w+`等。可选模式非常多。
- mode：默认是`666`，可读+可写。

> fs.open(path, flags[, mode], callback) fs.openSync(path, flags[, mode]) fs.close(fd, callback) fs.closeSync(fd)

## 文件读取（底层）



相对底层的读取接口，参数如下

- fd：文件句柄。
- buffer：将读取的文件内容写到buffer里。
- offset：buffer开始写入的位置。（在offset开始写入，还是offset+1？）
- length：要读取的字节数。
- position：文件从哪个位置开始读取。如果是null，那么就从当前位置开始读取。（读取操作会记录下上一个位置）

此外，`callback`的回调参数为`(err, bytesRead, buffer)`

> fs.read(fd, buffer, offset, length, position, callback)

## 追加文件内容



> fs.appendFile(file, data[, options], callback)

- file：可以是文件路径，也可以是文件句柄。（还可以是buffer？）
- data：要追加的内容。string或者buffer。
- options
  - encoding：编码，默认是`utf8`
  - mode：默认是`0o666`
  - flag：默认是`a`

注意：如果`file`是文件句柄，那么

- 开始追加数据前，file需要已经打开。
- file需要手动关闭。

```javascript
var fs = require('fs');

fs.appendFile('./extra/fileForAppend.txt', 'hello', 'utf8', function(err){
    if(err) throw err;
    console.log('append成功');
});
```

## 文件内容截取



> fs.truncate(path, len, callback) fs.truncateSync(path, len)
>
> fs.ftruncate(fd, len, callback) fs.ftruncateSync(fd, len)

用途参考[linux说明文档 (opens new window)](http://man7.org/linux/man-pages/man2/ftruncate.2.html)。

要点：

- `offset`不会变化。比如通过`fs.read()`读取文件内容，就需要特别注意。
- 如果`len`小于文件内容长度，剩余文件内容部分会丢失；如果`len`大于文件内容长度，那么超出的部分，会用`\0`进行填充。
- 如果传的是文件路径，需要确保文件是可写的；如果传的是文件句柄，需要确保文件句柄已经打开并且可写入。

> The truncate() and ftruncate() functions cause the regular file named by path or referenced by fd to be truncated to a size of precisely length bytes.

> If the file previously was larger than this size, the extra data is lost. If the file previously was shorter, it is extended, and the extended part reads as null bytes ('\0').

> The file offset is not changed.

> With ftruncate(), the file must be open for writing; with truncate(), the file must be writable.

## 修改文件属性（时间）



- path/fd：文件路径/文件句柄
- atime：Access Time。上一次访问文件数据的时间。
- mtime：Modified Time。修改时间。

> fs.utimes(path, atime, mtime, callback) fs.utimesSync(path, atime, mtime)

> fs.futimes(fd, atime, mtime, callback) fs.futimesSync(fd, atime, mtime)

备注，在命令行下可以

- 通过`stat`查看文件的状态信息，包括了上面的atime、mtime。
- 通过`touch`修改这几个时间。

## 创建文件链接



> fs.symlink(target, path[, type], callback) fs.symlinkSync(target, path[, type])
>
> fs.link(srcpath, dstpath, callback) fs.linkSync(srcpath, dstpath)

> link() creates a new link (also known as a hard link) to an existing file.

软链接、硬链接区别：[参考 (opens new window)](https://www.ibm.com/developerworks/cn/linux/l-cn-hardandsymb-links/)或者 [这个]。(http://www.cnblogs.com/itech/archive/2009/04/10/1433052.html)

- 硬链接：inode相同，多个别名。删除一个硬链接文件，不会影响其他有相同inode的文件。
- 软链接：有自己的inode，用户数据块存放指向文件的inode。

参考[这里 (opens new window)](http://man7.org/linux/man-pages/man2/link.2.html)。

## 创建临时目录



> fs.mkdtemp(prefix, callback) fs.mkdtempSync(prefix)

备忘：跟普通的随便找个目录，创建个随机名字的文件夹，有什么区别？

代码示例如下：

```javascript
var fs = require('fs');

fs.mkdtemp('/tmp/', function(err, folder){
    if(err) throw err;
    console.log('创建临时目录: ' + folder);
});
```

输出如下：

```powershell
/usr/local/bin/node mkdtemp.js
创建临时目录: /tmp/Cxw51O
```

## 找出软连接指向的真实路径



> fs.readlink(path[, options], callback) fs.readlinkSync(path[, options])

如下面例子，创建了个软链接指向`fileForReadLink.txt`，通过`fs.readlink()`就可以找出原始的路径。

```javascript
var fs = require('fs');
var randomFileName = './extra/fileForReadLink-' + String(Math.random()).slice(2, 6) + '.txt';

fs.symlinkSync('./extra/fileForReadLink.txt', randomFileName);
fs.readlink(randomFileName, 'utf8', function(err, linkString){
    if(err) throw err;
    console.log('链接文件内容: ' + linkString);
});
```

类似终端下直接运行`readlink`。对于软链接文件，效果同上面代码。对于硬链接，没有输出。

```powershell
➜  extra git:(master) ✗ readlink fileForReadLink-9827.txt
./extra/fileForReadLink.txt
➜  extra git:(master) ✗ readlink fileForLinkHard.txt 
➜  extra git:(master) ✗ readlink fileForLinkSoft.txt
./extra/fileForLink.txt
```

## 真实路径



> fs.realpath(path[, options], callback) fs.realpathSync(path[, options])

例子：（不能作用于软链接？）

```javascript
var fs = require('fs');
var path = require('path');

// fileForRealPath1.txt 是普通文件,正常运行
fs.realpath('./extra/inner/fileForRealPath1.txt', function(err, resolvedPath){
    if(err) throw err;
    console.log('fs.realpath: ' + resolvedPath);
});

// fileForRealPath.txt 是软链接, 会报错,提示找不到文件
fs.realpath('./extra/inner/fileForRealPath.txt', function(err, resolvedPath){
    if(err) throw err;
    console.log('fs.realpath: ' + resolvedPath);
});

console.log( 'path.resolve: ' + path.resolve('./extra/inner/fileForRealpath.txt') );
```

输出如下：

```powershell
path.resolve: /Users/a/Documents/git-code/git-blog/demo/2015.05.21-node-basic/fs/extra/inner/fileForRealpath.txt
fs.realpath: /Users/a/Documents/git-code/git-blog/demo/2015.05.21-node-basic/fs/extra/inner/fileForRealPath1.txt
/Users/a/Documents/git-code/git-blog/demo/2015.05.21-node-basic/fs/realpath.js:12
    if(err) throw err;
            ^

Error: ENOENT: no such file or directory, realpath './extra/inner/fileForRealPath.txt'
    at Error (native)

Process finished with exit code 1
```

## 删除目录



> fs.rmdir(path, callback) fs.rmdirSync(path)

例子如下：

```javascript
var fs = require('fs');

fs.rmdir('./dirForRemove', function(err){
    if(err) throw err;
    console.log('目录删除成功');
});
```

## 不常用



### 缓冲区内容写到磁盘

> fs.fdatasync(fd, callback) fs.fdatasyncSync(fd)

可以参考这里：

> 1、sync函数 sync函数只是将所有修改过的块缓冲区排入写队列，然后就返回，它并不等待实际写磁盘操作结束。 通常称为update的系统守护进程会周期性地（一般每隔30秒）调用sync函数。这就保证了定期冲洗内核的块缓冲区。命令sync(1)也调用sync函数。 2、fsync函数 fsync函数只对由文件描述符filedes指定的单一文件起作用，并且等待写磁盘操作结束，然后返回。 fsync可用于数据库这样的应用程序，这种应用程序需要确保将修改过的块立即写到磁盘上。 3、fdatasync函数 fdatasync函数类似于fsync，但它只影响文件的数据部分。而除数据外，fsync还会同步更新文件的属性。 对于提供事务支持的数据库，在事务提交时，都要确保事务日志（包含该事务所有的修改操作以及一个提交记录）完全写到硬盘上，才认定事务提交成功并返回给应用层。

## 待确认



1. 通篇的`mode`，待确认。
2. fs.access()更多用法（涉及 fs.constants.F_OK等权限）



# 3.1  基础调试console

## 模块概览



console模块提供了基础的调试功能。使用很简单，常用的API主要有 console.log()、console.error()。

此外，可以基于Console类，方便的扩展出自己的console实例，比如把调试信息打印到文件里，而部署输出在控制台上。

直接看例子。

## 基础例子



无特殊说明，日志都是默认打印到控制台。最常用的是console.log()、console.error()两个方法。

- console.log(msg)：普通日志打印。
- console.error(msg)：错误日志打印。
- console.info(msg)：等同于console.log(msg)
- console.warn(msg)：等同于console.error(msg)

例子如下：

```js
console.log('log: hello');
console.log('log: hello', 'chyingp');
console.log('log: hello %s', 'chyingp');

console.error('error: hello');
console.error('error: hello', 'chyingp');
console.error('error: hello %s', 'chyingp');

// 输出如下：
// log: hello
// log: hello chyingp
// log: hello chyingp
// error: hello
// error: hello chyingp
// error: hello chyingp
```

## 自定义stdout



可以通过 new console.Console(stdout, stderr) 来创建自定义的console实例，这个功能很实用。

比如你想将调试信息打印到本地文件，那么，就可以通过如下代码实现。

```js
var fs = require('fs');
var file = fs.createWriteStream('./stdout.txt');

var logger = new console.Console(file, file);

logger.log('hello');
logger.log('word');

// 备注：内容输出到 stdout.txt里，而不是打印到控制台
```

## 计时



通过`console.time(label)`和`console.timeEnd(label)`，来打印出两个时间点之间的时间差，单位是毫秒，例子如下。

```js
var timeLabel = 'hello'

console.time(timeLabel);

setTimeout(console.timeEnd, 1000, timeLabel);
// 输入出入：
// hello: 1005.505ms
```

## 断言



通过 console.assert(value, message) 进行断言。如果value不为true，那么抛出`AssertionError`异常，并中断程序执行。

如下代码所示，第二个断言报错，程序停止执行。

```js
console.assert(true, '1、right');
console.assert(false, '2、right', '2、wrong');

// 输出如下：
// assert.js:90
//   throw new assert.AssertionError({
//     ^
//     AssertionError: 2、right 2、wrong
//         at Console.assert (console.js:95:23)
```

为避免程序异常退出，需要对上面的异常进行处理，比如：

```js
try{
    console.assert(false, 'error occurred');
}catch(e){
    console.log(e.message);
}

// 输出如下：
// error occurred
```

## 打印错误堆栈：console.trace(msg)



将msg打印到标准错误输出流里，包含当前代码的位置和堆栈信息。

```js
console.trace('trace is called');

// 输出如下：
// Trace: trace is called
//     at Object.<anonymous> (/Users/a/Documents/git-code/nodejs-learning-guide/examples/2016.12.01-console/trace.js:1:71)
//     at Module._compile (module.js:541:32)
//     at Object.Module._extensions..js (module.js:550:10)
//     at Module.load (module.js:456:32)
//     at tryModuleLoad (module.js:415:12)
//     at Function.Module._load (module.js:407:3)
//     at Function.Module.runMain (module.js:575:10)
//     at startup (node.js:160:18)
//     at node.js:445:3
```

## 深层打印



很少关注 console.dir(obj)，因为大部分时候表现跟 console.log(obj) 差不多，看例子

```js
var obj = {
    nick: 'chyingp'
};

console.log(obj);  // 输出：{ nick: 'chyingp' }
console.dir(obj);  // 输出：{ nick: 'chyingp' }
```

但当obj的层级比较深时，用处就出来了。可以通过`depth`自定义打印的层级数，默认是2，这对于调试很有帮助。

```js
var obj2 = {
    human: {
        man: {
            info: {
                nick: 'chyingp'
            }
        }
    }
};

console.log(obj2);  // 输出：{ human: { man: { info: [Object] } } }
console.dir(obj2);  // 输出：{ human: { man: { info: [Object] } } }

console.dir(obj2, {depth: 3});  // 输出：{ human: { man: { info: { nick: 'chyingp' } } } }
```

## 相关链接



官方文档：https://nodejs.org/api/console.html

# 3.2 本地调试远程服务器上的Node代码

## 写在前面



谈到node断点调试，目前主要有三种方式，通过`node内置调试工具`、`通过IDE（如vscode）`、`通过node-inspector`，三者本质上差不多。本文着重点在于介绍 **如何在本地通过node-inspector 调试远程服务器上的node代码**。

在进入主题之前，首先会对三种调试方式进行入门讲解，方便新手理解后面的内容。至于老司机们，可以直接跳到主题去。

## 方式一：内置debug功能



#### 进入调试模式（在第1行断点）

```powershell
node debug app.js
```

![img](https://segmentfault.com/img/bVCNET)

#### 进入调试模式（在第n行断点）

比如要在第3行断点。

方式一：通过`debugger`

![img](https://segmentfault.com/img/bVCNE6)

方式二：通过`sb(line)`。

![img](https://segmentfault.com/img/bVCNE7)

#### 执行下一步

通过`next`命令。

![img](https://segmentfault.com/img/bVCNE9)

#### 跳到下一个断点

通过`cont`命令。

![img](https://segmentfault.com/img/bVCNFa)

#### 查看某个变量的值

输入`repl`命令后，再次输入变量名，就可以看到变量对应的值。如果想继续执行代码，可以按`ctrl+c`退出。

![img](https://segmentfault.com/img/bVCNFb)

#### 添加/删除watch

- 通过`watch(expr)`来添加监视对象。
- 通过`watchers`查看当前所有的监视对象。
- 通过`unwatch(expr)`来删除监视对象。

添加watch：

![img](https://segmentfault.com/img/bVCNFc)

删除watch：

![img](https://segmentfault.com/img/bVCNFd)

进入/跳出函数（step in、step out）

- 进入函数：通过`step`或者`s`。
- 跳出函数：通过`out`或者`o`。

示例代码如下，假设代码运行到`logger(str);`这一行，首先跳进函数内部，再跳出函数。

```text
var nick = 'chyingp';
var country = 'China';

var str = nick + ' live in ' + country;

var logger = function(msg){
    console.log(msg); // 这里
    console.log('这行会跳过'); // 跳过这行
};

logger(str);  // 假设运行到这里，想要进入logger方法

console.log(str);
```

示例截图如下：

![img](https://segmentfault.com/img/bVCNFh)

#### 多个文件断点

通过`setBreakpoint('script.js', 1), sb(...)`，在某个文件某一行添加断点。反正我是没成功过。。。怎么看都是bug。。。

#### 重新运行

每次都退出然后`node debug app.js`相当烦。直接用`restart`

![img](https://segmentfault.com/img/bVCNFi)

#### 远程调试

比如远程机器ip是`192.168.1.126`，在远程机器上进入调试模式

```powershell
[root@localhost ex]# node --debug-brk app.js
Debugger listening on port 5858
```

然后，在本地机器通过`node debug 192.168.1.126:5858`连接远程机器进行调试。

```powershell
node debug 192.168.1.126:5858
```

如下：

```powershell
➜  /tmp node debug 192.168.1.126:5858
connecting to 192.168.1.126:5858 ... ok
break in /tmp/ex/app.js:1
> 1 var Logger = require('./logger');
  2 
  3 Logger.info('hello');
debug> n
break in /tmp/ex/app.js:3
  1 var Logger = require('./logger');
  2 
> 3 Logger.info('hello');
  4 
  5 });
```

当然，还可以通过pid进行远程调试，这里就不举例。

参考：https://nodejs.org/api/debugger.html#debugger_advanced_usage

## 方式二：通过IDE(vscode)



首先，在vscode里打开项目

![img](https://segmentfault.com/img/bVCNFl)

然后，添加调试配置。主要需要修改的是可执行文件的路径。

![img](https://segmentfault.com/img/bVCNFm)

点击代码左侧添加断点。

![img](https://segmentfault.com/img/bVCNFp)

开始调试

![img](https://segmentfault.com/img/bVCNFr)

顺利断点，左侧的变量、监视对象，右侧的调试工具栏，用过`chrome dev tool`的同学应该很熟悉，不赘述。

![img](https://segmentfault.com/img/bVCNFs)

## 方式三：通过node-inspector



首先，安装`node-inspector`。

```powershell
npm install -g node-inspector
```

#### 方式一：通过`node-debug`启动调试

启动调试，它会自动帮你在浏览器里打开调试界面。

```powershell
➜  debugger git:(master) ✗ node-debug app.js
Node Inspector v0.12.8
Visit http://127.0.0.1:8080/?port=5858 to start debugging.
Debugging `app.js`

Debugger listening on port 5858
```

调试界面如下，简直不能更亲切。

![img](https://segmentfault.com/img/bVCNFt)

#### 方式二：更加灵活的方式

步骤1：通过`node-inspector`启动Node Inspector Server

```powershell
➜  debugger git:(master) ✗ node-inspector 
Node Inspector v0.12.8
Visit http://127.0.0.1:8080/?port=5858 to start debugging.
```

步骤2：通过传统方式启动调试。加入`--debug-brk`，好让代码在第一行断住。

```powershell
➜  debugger git:(master) ✗ node --debug-brk app.js
Debugger listening on port 5858
```

步骤3：在浏览器里打开调试UI界面。就是步骤1里打印出来的地址 http://127.0.0.1:8080/?port=5858。成功

![img](https://segmentfault.com/img/bVCNFu)

#### 实现原理

从上面的例子不难猜想到。（不负责任猜想）

- 通过`node --debug-brk`启动调试，监听`5858`端口。
- `node-inspector`启动服务，监听8080端口。
- 在浏览器里访问`http://127.0.0.1:8080/?port=5858`。可以看到`port=5858`这个参数。结合之前讲到的node内置远程调试的功能，可以猜想，在返回UI调试界面的同时，服务内部通过`5858`端口开始了断点调试。

另外，从下面截图可以看出，UI调试工具（其实是个网页）跟 `inspector服务` 之间通过`websocket`进行通信。

用户在界面上操作时，比如设置断点，就向 `inspector服务` 发送一条消息，`inspector服务` 在内部通过v8调试器来实现代码的断点。

![img](https://segmentfault.com/img/bVCNFC)

可以看到，用到了`v8-debug`，这个就待深挖了。

![img](https://segmentfault.com/img/bVCNFD)

## 通过node-inspector调试远程代码



细心的同学可能会发现，node远程调试其实在上面`node-inspector`章节的讲解里已经覆盖到了。这里还是来个实际的例子。

假设我们的node代码`app.js`运行在阿里云的服务器上，服务器ip是`xxx.xxx.xxx.xxx`。

首先，服务器上启动node-inspector服务

```powershell
[root@iZ94wb7tioqZ ~]# node-inspector 
Node Inspector v0.12.8
Visit http://127.0.0.1:8080/?port=5858 to start debugging.
```

其次，通过`--debug-brk`参数，进入调试模式

```powershell
[root@iZ94wb7tioqZ ex]# node --debug-brk app.js
Debugger listening on port 5858
```

最后，在本地通过ip地址愉快的访问调试界面。是不是很简单捏。

![img](https://segmentfault.com/img/bVCNFF)

#### 常见问题：安全限制

远程调试常见的问题就是请求被拒绝。这是服务器安全策略的限制。遇到这种情况，开放端口就完事了。

![img](https://segmentfault.com/img/bVCNHD)

在我们的云主机上，默认安装了`firewall-cmd`，可以通过`--add-port`选项来开放`8080`端口的开放。如果本机没有安装`firewall-cmd`，也可以通过`iptables`来实现同样的功能。

```powershell
[root@iZ94wb7tioqZ ex]# firewall-cmd --add-port=8080/tcp
success
```

然后，就可以愉快的远程调试了。

![img](https://segmentfault.com/img/bVCNHE)

## 相关链接



[Node Debugger(opens new window)](https://nodejs.org/api/debugger.html)

[How Does a C Debugger Work?(opens new window)](http://blog.0x972.info/?d=2014/11/13/10/40/50-how-does-a-debugger-work)

[How debuggers work: Part 2 - Breakpoints](http://eli.thegreenplace.net/2011/01/27/how-debuggers-work-part-2-breakpoints/)



# 4.1 网络服务 http

## http模块概览



大多数nodejs开发者都是冲着开发web server的目的选择了nodejs。正如官网所展示的，借助http模块，可以几行代码就搞定一个超迷你的web server。

在nodejs中，`http`可以说是最核心的模块，同时也是比较复杂的一个模块。上手很简单，但一旦深入学习，不少初学者就会觉得头疼，不知从何入手。

本文先从一个简单的例子出发，引出`http`模块最核心的四个实例。看完本文，应该就能够对http模块有个整体的认识。

## 一个简单的例子



在下面的例子中，我们创建了1个web服务器、1个http客户端

- 服务器server：接收来自客户端的请求，并将客户端请求的地址返回给客户端。
- 客户端client：向服务器发起请求，并将服务器返回的内容打印到控制台。

代码如下所示，只有几行，但包含了不少信息量。下一小节会进行简单介绍。

```js
var http = require('http');

// http server 例子
var server = http.createServer(function(serverReq, serverRes){
    var url = serverReq.url;
    serverRes.end( '您访问的地址是：' + url );
});

server.listen(3000);

// http client 例子
var client = http.get('http://127.0.0.1:3000', function(clientRes){
    clientRes.pipe(process.stdout);
});
```

## 例子解释



在上面这个简单的例子里，涉及了4个实例。大部分时候，serverReq、serverRes 才是主角。

- server：http.Server实例，用来提供服务，处理客户端的请求。
- client：http.ClientReques实例，用来向服务端发起请求。
- serverReq/clientRes：其实都是 http.IncomingMessage实。serverReq 用来获取客户端请求的相关信息，如request header；而clientRes用来获取服务端返回的相关信息，比如response header。
- serverRes：http.ServerResponse实例

## 关于http.IncomingMessage、http.ServerResponse



先讲下 http.ServerResponse 实例。作用很明确，服务端通过http.ServerResponse 实例，来个请求方发送数据。包括发送响应表头，发送响应主体等。

接下来是 http.IncomingMessage 实例，由于在 server、client 都出现了，初学者难免有点迷茫。它的作用是

在server端：获取请求发送方的信息，比如请求方法、路径、传递的数据等。 在client端：获取 server 端发送过来的信息，比如请求方法、路径、传递的数据等。

http.IncomingMessage实例 有三个属性需要注意：method、statusCode、statusMessage。

- method：只在 server 端的实例有（也就是 serverReq.method）
- statusCode/statusMessage：只在 client 端 的实例有（也就是 clientRes.method）

## 关于继承与扩展



### http.Server

- http.Server 继承了 net.Server （于是顺带需要学一下 net.Server 的API、属性、相关事件）
- net.createServer(fn)，回调中的 `socket` 是个双工的stream接口，也就是说，读取发送方信息、向发送方发送信息都靠他。

备注：socket的客户端、服务端是相对的概念，所以其实 net.Server 内部也是用了 net.Socket（不负责任猜想）

```js
// 参考：https://cnodejs.org/topic/4fb1c1fd1975fe1e1310490b
var net = require('net');

var PORT = 8989;
var HOST = '127.0.0.1';

var server = net.createServer(function(socket){
    console.log('Connected: ' + socket.remoteAddress + ':' + socket.remotePort);
    
    socket.on('data', function(data){
        console.log('DATA ' + socket.remoteAddress + ': ' + data);
        console.log('Data is: ' + data);

        socket.write('Data from you is  "' + data + '"');
    });

    socket.on('close', function(){
         console.log('CLOSED: ' +
            socket.remoteAddress + ' ' + socket.remotePort);
    });
});
server.listen(PORT, HOST);

console.log(server instanceof net.Server);  // true
```

### http.ClientRequest

http.ClientRequest 内部创建了一个socket来发起请求，[代码如下 (opens new window)](https://github.com/nodejs/node/blob/master/lib/_http_client.js#L174)。

当你调用 http.request(options) 时，内部是这样的

```javascript
self.onSocket(net.createConnection(options));
```

### http.ServerResponse

- 实现了 Writable Stream interface，内部也是通过socket来发送信息。

### http.IncomingMessage

- 实现了 Readable Stream interface，参考[这里(opens new window)](https://github.com/nodejs/node/blob/master/lib/_http_incoming.js#L62)
- req.socket --> 获得跟这次连接相关的socket



# 4.2 网络服务http res

## 概览



http模块四剑客之一的`res`，应该都不陌生了。一个web服务程序，接受到来自客户端的http请求后，向客户端返回正确的响应内容，这就是`res`的职责。

返回的内容包括：状态代码/状态描述信息、响应头部、响应主体。下文会举几个简单的例子。

```js
var http = require('http');
var server = http.createServer(function(req, res){
    res.end('ok');
});
server.listen(3000);
```

## 例子



在下面的例子中，我们同时设置了 状态代码/状态描述信息、响应头部、响应主体，就是这么简单。

```js
var http = require('http');

// 设置状态码、状态描述信息、响应主体
var server = http.createServer(function(req, res){
    res.writeHead(200, 'ok', {
        'Content-Type': 'text/plain'
    });
    res.end('hello');
});

server.listen(3000);
```

### 设置状态代码、状态描述信息

`res`提供了 res.writeHead()、res.statusCode/res.statusMessage 来实现这个目的。

举例，如果想要设置 200/ok ，可以

```js
res.writeHead(200, 'ok');
```

也可以

```js
res.statusCode = 200;
res.statusMessage = 'ok';
```

两者差不多，差异点在于

1. res.writeHead() 可以提供额外的功能，比如设置响应头部。
2. 当响应头部发送出去后，res.statusCode/res.statusMessage 会被设置成已发送出去的 状态代码/状态描述信息。

### 设置响应头部

`res`提供了 res.writeHead()、response.setHeader() 来实现响应头部的设置。

举例，比如想把 `Content-Type` 设置为 `text-plain`，那么可以

```js
// 方法一
res.writeHead(200, 'ok', {
    'Content-Type': 'text-plain'
});

// 方法二
res.setHeader('Content-Type', 'text-plain');
```

两者的差异点在哪里呢？

1. res.writeHead() 不单单是设置header。
2. 已经通过 res.setHeader() 设置了header，当通过 res.writeHead() 设置同名header，res.writeHead() 的设置会覆盖之前的设置。

关于第2点差异，这里举个例子。下面代码，最终的 `Content-Type` 为 `text/plain`。

```js
var http = require('http');

var server = http.createServer(function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200, 'ok', {
        'Content-Type': 'text/plain'
    });
    res.end('hello');
});

server.listen(3000);
```

而下面的例子，则直接报错。报错信息为 `Error: Can't set headers after they are sent.`。

```js
var http = require('http');

var server = http.createServer(function(req, res){    
    res.writeHead(200, 'ok', {
        'Content-Type': 'text/plain'
    });
    res.setHeader('Content-Type', 'text/html');
    res.end('hello');
});

server.listen(3000);
```

### 其他响应头部操作

增、删、改、查 是配套的。下面分别举例说明下，例子太简单就直接上代码了。

```js
// 增
res.setHeader('Content-Type', 'text/plain');

// 删
res.removeHeader('Content-Type');

// 改
res.setHeader('Content-Type', 'text/plain');
res.setHeader('Content-Type', 'text/html');  // 覆盖

// 查
res.getHeader('content-type');
```

其中略显不同的是 res.getHeader(name)，name 用的是小写，返回值没做特殊处理。

```js
res.setHeader('Content-Type', 'TEXT/HTML');
console.log( res.getHeader('content-type') );  // TEXT/HTML

res.setHeader('Content-Type', 'text/plain');
console.log( res.getHeader('content-type') );  // text/plain
```

此外，还有不那么常用的：

- res.headersSent：header是否已经发送；
- res.sendDate：默认为true。但为true时，会在response header里自动设置Date首部。

## 设置响应主体



主要用到 res.write() 以及 res.end() 两个方法。

res.write() API的信息量略大，建议看下[官方文档 (opens new window)](https://nodejs.org/api/http.html#http_response_write_chunk_encoding_callback)。

### response.write(chunk[, encoding][, callback])

- chunk：响应主体的内容，可以是string，也可以是buffer。当为string时，encoding参数用来指明编码方式。（默认是utf8）
- encoding：编码方式，默认是 utf8。
- callback：当响应体flushed时触发。（TODO 这里想下更好的解释。。。）

使用上没什么难度，只是有些注意事项：

1. 如果 res.write() 被调用时， res.writeHead() 还没被调用过，那么，就会把header flush出去。
2. res.write() 可以被调用多次。
3. 当 res.write(chunk) 第一次被调用时，node 会将 header 信息 以及 chunk 发送到客户端。第二次调用 res.write(chunk) ，node 会认为你是要streaming data（WTF，该怎么翻译）。。。

> Returns true if the entire data was flushed successfully to the kernel buffer. Returns false if all or part of the data was queued in user memory. 'drain' will be emitted when the buffer is free again.

### response.end([data][, encoding][, callback])

掌握了 res.write() 的话，res.end() 就很简单了。res.end() 的用处是告诉nodejs，header、body都给你了，这次响应就到这里吧。

有点像个语法糖，可以看成下面两个调用的组合。至于callback，当响应传递结束后触发。

```js
res.write(data, encoding);
res.end()
```

## chunk数据



参考这里：http://stackoverflow.com/questions/6258210/how-can-i-output-data-before-i-end-the-response

也就是说，除了nodejs的特性，还需要了解 HTTP协议、浏览器的具体实现。（细思极恐）

如果是 `text/html`

```js
var http = require('http');

http.createServer(function(req, res) {    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.write('hello');

    setTimeout(function() {
        res.write(' world!');
        res.end();
    }, 2000);

}).listen(3000);
```

如果是 `text/plain`

```js
var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Content-Type-Options': 'nosniff'
    });
    res.write('hello');

    setTimeout(function(){
        res.write('world');
        res.end()
    }, 2000);
    
}).listen(3000);
```

失败例子

```js
var http = require('http');

var server = http.createServer(function(req, res){
    res.writeHead(200, 'ok', {
        'Content-Type': 'text/html'
    });
    res.write('hello');
    
    setTimeout(function(){
        res.write('world');
        res.end();
    }, 2000);
});

server.listen(3000);
```

## 超时处理



接口：response.setTimeout(msecs, callback)

关于 timeout 事件的说明，同样是言简意赅（WTF），话少信息量大，最好来个demo TODO

> If no 'timeout' listener is added to the request, the response, or the server, then sockets are destroyed when they time out. If you assign a handler on the request, the response, or the server's 'timeout' events, then it is your responsibility to handle timed out sockets.

## 事件 close/finish



- close：response.end() 被调用前，连接就断开了。此时会触发这个事件。
- finish：响应header、body都已经发送出去（交给操作系统，排队等候传输），但客户端是否实际收到数据为止。（这个事件后，res 上就不会再有其他事件触发）

## 其他不常用属性/方法



- response.finished：一开始是false，响应结束后，设置为true。
- response.sendDate：默认是true。是否自动设置Date头部。（按HTTP协议是必须要的，除非是调试用，不然不要设置为false）
- response.headersSent：只读属性。响应头部是否已发送。
- response.writeContinue()：发送 HTTP/1.1 100 Continue 消息给客户端，提示说服务端愿意接受客户端的请求，请继续发送请求正文（body)。（TODO 做个demo啥的是大大的好）

## 相关链接



How can I output data before I end the response? http://stackoverflow.com/questions/6258210/how-can-i-output-data-before-i-end-the-response

8.2.3 Use of the 100 (Continue) Status http://greenbytes.de/tech/webdav/rfc2616.html#use.of.the.100.status



# 4.3 网络服务 http req

## 概览



本文的重点会放在`req`这个对象上。前面已经提到，它其实是http.IncomingMessage实例，在服务端、客户端作用略微有差异

- 服务端处：获取请求方的相关信息，如request header等。
- 客户端处：获取响应方返回的相关信息，如statusCode等。

服务端例子：

```js
// 下面的 req
var http = require('http');
var server = http.createServer(function(req, res){
    console.log(req.headers);
    res.end('ok');
});
server.listen(3000);
```

客户端例子

```js
// 下面的res
var http = require('http');
http.get('http://127.0.0.1:3000', function(res){
    console.log(res.statusCode);
});
```

## 属性/方法/事件 分类



http.IncomingMessage的属性/方法/事件 不是特别多，按照是否客户端/服务端 特有的，下面进行简单归类。可以看到

- 服务端处特有：url
- 客户端处特有：statusCode、statusMessage

| 类型 |     名称      | 服务端 | 客户端 |
| :--- | :-----------: | :----: | :----: |
| 事件 |    aborted    |   ✓    |   ✓    |
| 事件 |     close     |   ✓    |   ✓    |
| 属性 |    headers    |   ✓    |   ✓    |
| 属性 |  rawHeaders   |   ✓    |   ✓    |
| 属性 |  statusCode   |   ✕    |   ✓    |
| 属性 | statusMessage |   ✕    |   ✓    |
| 属性 |  httpVersion  |   ✓    |   ✓    |
| 属性 |      url      |   ✓    |   ✕    |
| 属性 |    socket     |   ✓    |   ✓    |
| 方法 |  .destroy()   |   ✓    |   ✓    |
| 方法 | .setTimeout() |   ✓    |   ✓    |

## 服务端的例子



### 例子一：获取httpVersion/method/url

下面是一个典型的HTTP请求报文，里面最重要的内容包括：HTTP版本、请求方法、请求地址、请求头部。

```http
GET /hello HTTP/1.1
Host: 127.0.0.1:3000
Connection: keep-alive
Cache-Control: no-cache
```

那么，如何获取上面提到的信息呢？很简单，直接上代码

```js
// getClientInfo.js
var http = require('http');

var server = http.createServer(function(req, res){
    console.log( '1、客户端请求url：' + req.url );
    console.log( '2、http版本：' + req.httpVersion );
    console.log( '3、http请求方法：' + req.method );
    console.log( '4、http请求头部' + JSON.stringify(req.headers) );

    res.end('ok');
});

server.listen(3000);
```

效果如下：

```bash
1、客户端请求url：/hello
2、http版本：1.1
3、http请求方法：GET
4、http headers：{"host":"127.0.0.1:3000","connection":"keep-alive","cache-control":"no-cache","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36","postman-token":"1148986a-ddfb-3569-e2c0-585634655fe4","accept":"*/*","accept-encoding":"gzip, deflate, sdch, br","accept-language":"zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4"}
```

### 例子二：获取get请求参数

服务端代码如下：

```js
// getClientGetQuery.js
var http = require('http');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer(function(req, res){
    var urlObj = url.parse(req.url);
    var query = urlObj.query;
    var queryObj = querystring.parse(query);
    
    console.log( JSON.stringify(queryObj) );
    
    res.end('ok');
});

server.listen(3000);
```

访问地址 http://127.0.0.1:3000/hello?nick=chyingp&hello=world

服务端输出如下

```bash
{"nick":"chyingp","hello":"world"}
```

### 例子三：获取post请求参数

服务端代码如下

```js
// getClientPostBody.js
var http = require('http');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer(function(req, res){
    
    var body = '';  
    req.on('data', function(thunk){
        body += thunk;
    });

    req.on('end', function(){
        console.log( 'post body is: ' + body );
        res.end('ok');
    }); 
});

server.listen(3000);
```

通过curl构造post请求：

```bash
curl -d 'nick=casper&hello=world' http://127.0.0.1:3000
```

服务端打印如下：

```bash
post body is: nick=casper&hello=world
```

备注：post请求中，不同的`Content-type`，post body有不小差异，感兴趣的同学可以研究下。

本例中的post请求，HTTP报文大概如下

```http
POST / HTTP/1.1
Host: 127.0.0.1:3000
Content-Type: application/x-www-form-urlencoded
Cache-Control: no-cache

nick=casper&hello=world
```

## 客户端处例子



### 例子一：获取httpVersion/statusCode/statusMessage

代码如下：

```js
var http = require('http');
var server = http.createServer(function(req, res){
    res.writeHead(200, {'content-type': 'text/plain'});
    res.end('from server');
});
server.listen(3000);

var client = http.get('http://127.0.0.1:3000', function(res){
    console.log('1、http版本：' + res.httpVersion);
    console.log('2、返回状态码：' + res.statusCode);
    console.log('3、返回状态描述信息：' + res.statusMessage);
    console.log('4、返回正文：');

    res.pipe(process.stdout);
});
```

控制台输出：

```bash
1、http版本：1.1
2、返回状态码：200
3、返回状态描述信息：OK
4、返回正文：
from server
```

## 事件对比：aborted、close



官方文档对这两个事件的解释是：当客户端终止请求时，触发aborted事件；当客户端连接断开时，触发close事件；官方文档传送们：[地址(opens new window)](https://nodejs.org/api/http.html#http_event_aborted_1)

解释得比较含糊，从实际实验对比上来看，跟官方文档有不小出入。此外，客户端处、服务端处的表现也是不同的。

### 服务端表现

根据实际测试结果来看，当客户端：

- abort请求时，服务端req的aborted、close事件都会触发；（诡异）
- 请求正常完成时，服务端req的close事件不会触发；（也很诡异）

直接扒了下nodejs的源代码，发现的确是同时触发的，触发场景：请求正常结束前，客户端abort请求。

测试代码如下：

```js
var http = require('http');

var server = http.createServer(function(req, res){
    
    console.log('1、收到客户端请求: ' + req.url);
    
    req.on('aborted', function(){
        console.log('2、客户端请求aborted');
    });
    
    req.on('close', function(){
        console.log('3、客户端请求close');
    });
    
    // res.end('ok'); 故意不返回，等着客户端中断请求
});

server.listen(3000, function(){
    var client = http.get('http://127.0.0.1:3000/aborted');
    setTimeout(function(){
        client.abort();  // 故意延迟100ms，确保请求发出
    }, 100);    
});


// 输出如下
// 1、收到客户端请求: /aborted
// 2、客户端请求aborted
// 3、客户端请求close
```

以下代码来自nodejs源码（_http_server.js）

```js
  function abortIncoming() {
    while (incoming.length) {
      var req = incoming.shift();
      req.emit('aborted');
      req.emit('close');
    }
    // abort socket._httpMessage ?
  }
```

再来一波对比，`req.on('close')`和`req.socket.on('close')`。

```js
// reqSocketClose.js
var http = require('http');

var server = http.createServer(function(req, res){
    
    console.log('server: 收到客户端请求');
    
    req.on('close', function(){
        console.log('server: req close');
    });
    
    req.socket.on('close', function(){
        console.log('server: req.socket close');
    });    
    
    res.end('ok'); 
});

server.listen(3000);

var client = http.get('http://127.0.0.1:3000/aborted', function(res){
    console.log('client: 收到服务端响应');
});
```

输出如下，正儿八经的close事件触发了。

```bash
server: 收到客户端请求
server: req.socket close
client: 收到服务端响应
```

### 客户端表现

猜测客户端的aborted、close也是在类似场景下触发，测试代码如下。发现一个比较有意思的情况，`res.pipe(process.stdout)` 这行代码是否添加，会影响`close`是否触发。

- 没有`res.pipe(process.stdout)`：close不触发。
- 有`res.pipe(process.stdout)`：close触发。

```js
var http = require('http');

var server = http.createServer(function(req, res){
    
    console.log('1、服务端：收到客户端请求');
    
    res.flushHeaders();
    res.setTimeout(100);    // 故意不返回，3000ms后超时
});


server.on('error', function(){});

server.listen(3000, function(){

    var client = http.get('http://127.0.0.1:3000/aborted', function(res){

        console.log('2、客户端：收到服务端响应');

        // res.pipe(process.stdout); 注意这行代码
        
        res.on('aborted', function(){
            console.log('3、客户端：aborted触发！');
        });

        res.on('close', function(){
            console.log('4、客户端：close触发！');
        });     
    });
});
```

## 信息量略大的 .destroy()



经过前面aborted、close的摧残，本能的觉得 .destroy() 方法的表现会有很多惊喜之处。

测试代码如下：

```js
var http = require('http');

var server = http.createServer(function(req, res){
    
    console.log('服务端：收到客户端请求');
    
    req.destroy(new Error('测试destroy'));
    
    req.on('error', function(error){
        console.log('服务端：req error: ' + error.message);
    });
    
    req.socket.on('error', function(error){
        console.log('服务端：req socket error: ' + error.message);
    })
});

server.on('error', function(error){
    console.log('服务端：server error: ' + error.message);
});

server.listen(3000, function(){

    var client = http.get('http://127.0.0.1:3000/aborted', function(res){
        // do nothing
    });

    client.on('error', function(error){
        console.log('客户端：client error触发！' + error.message);
    });
});
```

输出如下。根据 .destroy() 调用的时机不同，error 触发的对象不同。（测试过程比较枯燥，有时间再总结一下）

```bash
服务端：收到客户端请求
服务端：req socket error: 测试destroy
客户端：client error触发！socket hang up
```

## 不常用属性



- rawHeaders：未解析前的request header。
- trailers：在分块传输编码(chunk)中用到，表示trailer后的header可分块传输。（感兴趣的可以研究下）
- rawTrailers：

关于trailers属性：

> The request/response trailers object. Only populated at the 'end' event.

## 写在后面



一个貌似很简单的对象，实际比想的要复杂一些。做了不少对比实验，也发现了一些好玩的东西，打算深入学习的同学可以自己多动手尝试一下 😃

TODO：

1. 对close、aborted进行更深入对比
2. 对.destroy()进行更深入对比

## 相关链接



官方文档： https://nodejs.org/api/http.html#http_class_http_incomingmessage



# 4.4  网络服务 http server

## http服务端概览

 

## 创建server



几行代码搞定

```js
var http = require('http');
var requestListener = function(req, res){
    res.end('ok');
};
var server = http.createServer(requestListener);
// var server = new http.Server(requestListener); 跟上面是等价的
server.listen(3000);
```

## 获取请求方信息



### HTTP版本、HTTP method、headers、url

```js
var http = require('http');

var server = http.createServer(function(req, res){
    console.log('客户端请求url：' + req.url);
    console.log('http版本：' + req.httpVersion);
    console.log('http请求方法：' + req.method);

    res.end('ok');
});

server.listen(3000);
```

效果如下：

```bash
客户端请求url：/hello
http版本：1.1
http请求方法：GET
http headers：{"host":"127.0.0.1:3000","connection":"keep-alive","cache-control":"max-age=0","upgrade-insecure-requests":"1","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36","accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8","accept-encoding":"gzip, deflate, sdch, br","accept-language":"zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4"}
```

### 获取get请求参数

```js
var http = require('http');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer(function(req, res){
    var urlObj = url.parse(req.url);
    var query = urlObj.query;
    var queryObj = querystring.parse(query);
    
    console.log( JSON.stringify(queryObj) );
    
    res.end('ok');
});

server.listen(3000);
```

运行如下命令

```bash
curl http://127.0.0.1:3000/hello\?nick\=chyingp\&hello\=world
```

服务端输出如下

```bash
{"nick":"chyingp","hello":"world"}
```

### 获取post请求参数

代码如下

```js
var http = require('http');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer(function(req, res){
    
    var body = '';  
    req.on('data', function(thunk){
        body += thunk;
    });

    req.on('end', function(){
        console.log( 'post body is: ' + body );
        res.end('ok');
    }); 
});

server.listen(3000);
```

通过curl构造极简post请求

```bash
curl -d 'nick=casper&hello=world' http://127.0.0.1:3000
```

服务端打印如下。注意，在post请求中，不同的`Content-type`，post body有不小差异，感兴趣的同学可以自己试下。

```bash
post body is: nick=casper&hello=world
```

比如本例中的post请求，HTTP报文大概如下

```http
POST / HTTP/1.1
Host: 127.0.0.1:3000
Content-Type: application/x-www-form-urlencoded
Cache-Control: no-cache

nick=casper&hello=world
```

## 枯燥的事件



首先，我们来看下有哪些事件

checkContinue、checkExpectation、clientError、close、connect、connection、request、upgrade

### error

```js
var http = require('http');
var PORT = 3000;
var noop = function(){};

var svr = http.createServer(noop);
var anotherSvr = http.createServer(noop);

anotherSvr.on('error', function(e){
    console.error('出错啦！' + e.message);
});

svr.listen(PORT, function(){
    anotherSvr.listen(PORT);
});
```

运行代码，输出如下

```bash
出错啦！listen EADDRINUSE :::3000
```

### connect vs connection

两者差别非常大，虽然字眼看着有点像。

- connect：当客户端的HTTP method为connect时触发。
- connection：当TCP连接建立时触发，大部分时候可以忽略这个事件（目测模块内部自己用到而已）。此外，可以通过 req.connection 来获取这个socket（从nodejs源码来看，req.socket、req.connection 都指向了这个socket）。此外，socket上的readable事件不会触发（具体原因请看模块内部实现，反正我是还没研究）

大部分时候都不会用到，除非你要开发HTTP代理。当客户端发起 connect 请求时触发（注意绕过了 requestListener）

```js
var http = require('http');
var PORT = 3000;

var server = http.createServer(function(req, res){
    res.end('ok');
});

// 注意：发起connect请求的例子在 ./httpServerEventConnectClient.js 里
server.on('connect', function(req, socket, head){
    console.log('connect事件触发');
    socket.end();   // 反正我就只想举个例子，没打算正经处理。。。
});

server.listen(PORT);
```

### request

当有新的连接到来时触发。那跟 connection 有什么区别呢？

好了，`keep-alive`闪亮登场！在持久化连接的情况下，多个 request 可能对应的是 一个 connection。

先来看下没有`keep-alive`的场景

```js
var http = require('http');
var PORT = 3000;
var requestIndex = 0;
var connectionIndex = 0;

var server = http.createServer(function(req, res){
    res.end('ok');
});

server.on('request', function(req, res){
    requestIndex++;
    console.log('request event: 第'+ requestIndex +'个请求！');
});

server.on('connection', function(req, res){
    connectionIndex++;
    console.log('connection event: 第'+ connectionIndex +'个请求！');
});

server.listen(PORT);
```

通过curl连续发送3个请求，看下效果

```bash
for i in `seq 1 3`; do curl http://127.0.0.1:3000; done
```

服务端输出如下

```bash
connection event: 第1个请求！
request event: 第1个请求！
connection event: 第2个请求！
request event: 第2个请求！
connection event: 第3个请求！
request event: 第3个请求！
```

然后，再来看下有`keep-alive`的场景。用 postman 构造包含 keep-alive 的请求，最终的HTTP请求报文如下

```http
GET / HTTP/1.1
Host: 127.0.0.1:3000
Connection: keep-alive
Cache-Control: no-cache
Postman-Token: 6027fda7-f936-d3ac-e54f-dafcbf5e58ff
```

连续发送3个请求，服务端打印日志如下

```bash
connection event: 第1个请求！
request event: 第1个请求！
request event: 第2个请求！
request event: 第3个请求！
```

## 不常用接口



### server.close([callback]);

关闭服务器。其实就是 (new net.Server()).close()，停止接受新的连接。 已经连接上的请求会继续处理，当所有连接结束的时候，server 正式关闭，并抛出 close 事件。 一般提供了callback，就不用监听close; 监听了close，就不用添加callback。

### 其他server.listen()

其实除了 server.listen(PORT) 这种监听方式外，还有以下几种相对不那么常用的监听方式。用到的时候看看文档就行了。

server.listen(handle[, callback])：监听本地文件描述符（fd）（windows不支持），或者server，或者socket server.listen(path[, callback])：监听本地socket，创建一个 UNIX socket server 。 server.listen([port][, hostname][, backlog][, callback])

### 网络超时 server.setTimeout(msecs, callback)

设置网络连接的超时时间。当超过 msecs 没有响应时，网络就会自动断开。

如果传了 callback，那么当 timeout 发生时，就会将timeout的socket作为参数传给callback。

注意，一般情况下超时的socket会自动销毁。但当你传了callback后，你就需要手动end或者destroy这个socket。

## 不常用属性



server.listening：是否在监听连接 server.timeout：设置超时时间（毫秒），注意，修改这个值，只会对新建立的连接产生影响。此外，将timeout设置为0，就会禁用自动超时行为。（目测不推荐） server.maxHeadersCount：客户端最多传送的header数量，默认是1000，如果设置为0，则没有限制。（问题：如果超过1000怎么办？？）

# 4.5 网络服务 http client

## ClientRequest概览



当你调用 http.request(options) 时，会返回 ClientRequest实例，主要用来创建HTTP客户端请求。

在前面的章节里，已经对http模块的的其他方面进行了不少介绍，如http.Server、http.ServerResponse、http.IncomingMessage。

有了前面的基础，详细本文不难理解，本文更多的以例子为主。

## 简单的GET请求



下面构造了个GET请求，访问 http://id.qq.com/ ，并将返回的网页内容打印在控制台下。

```js
var http = require('http');
var options = {
    protocol: 'http:',
    hostname: 'id.qq.com',
    port: '80',
    path: '/',
    method: 'GET'
};

var client = http.request(options, function(res){
    var data = '';
    res.setEncoding('utf8');
    res.on('data', function(chunk){
        data += chunk;
    });
    res.on('end', function(){
        console.log(data);
    });
});

client.end();
```

当然，也可以用便捷方法 http.get(options) 进行重写

```js
var http = require('http');

http.get('http://id.qq.com/', function(res){
    var data = '';
    res.setEncoding('utf8');
    res.on('data', function(chunk){
        data += chunk;
    });
    res.on('end', function(){
        console.log(data);
    });
});
```

## 简单的post请求



在下面例子中，首先创建了个http server，负责将客户端发送过来的数据回传。

接着，创建客户端POST请求，向服务端发送数据。需要注意的点有：

1. method 指定为 POST。
2. headers 里声明了 content-type 为 application/x-www-form-urlencoded。
3. 数据发送前，用 querystring.stringify(obj) 对传输的对象进行了格式化。

```js
var http = require('http');
var querystring = require('querystring');

var createClientPostRequest = function(){
    var options = {
        method: 'POST',
        protocol: 'http:',
        hostname: '127.0.0.1',
        port: '3000',
        path: '/post',
        headers: {
            "connection": "keep-alive",
            "content-type": "application/x-www-form-urlencoded"
        }    
    };

    // 发送给服务端的数据
    var postBody = {
        nick: 'chyingp'
    };

    // 创建客户端请求
    var client = http.request(options, function(res){
        // 最终输出：Server got client data: nick=chyingp
        res.pipe(process.stdout);  
    });

    // 发送的报文主体，记得先用 querystring.stringify() 处理下
    client.write( querystring.stringify(postBody) );
    client.end();
};

// 服务端程序，只是负责回传客户端数据
var server = http.createServer(function(req, res){
    res.write('Server got client data: ');
    req.pipe(res);
});

server.listen(3000, createClientPostRequest);
```

## 各种事件



在官方文档里，http.RequestClient相关的事件共有7个。跟HTTP协议密切相关的有3个，分别是 connect、continue、upgrade，其他4个分别是 abort、aborted、socket、response。

- 其他：abort、aborted、socket、response
- 与HTTP协议相关：connect、continue、upgrade

跟HTTP协议相关的会相对复杂些，因为涉及HTTP协议的设计细节。其他3个相对简单。下面分别进行简单的介绍。

### response事件

最容易理解的一个，当收到来自服务端的响应时触发，其实跟 http.get(url, cbk) 中的回调是一样的，看下程序运行的打印信息就知道。

```js
var http = require('http');

var url = 'http://id.qq.com/';

var client = http.get(url, function(res){
    console.log('1. response event');
});

client.on('response', function(res){
    console.log('2. response event');
});

client.end();
```

打印信息：

```bash
1. response event
2. response event
```

### socket事件

当给client分配socket的时候触发，如果熟悉net模块对这个事件应该不陌生。大部分时候并不需要关注这个事件，虽然内部其实挺复杂的。

### abort/aborted 事件

这两个事件看着非常像，都是请求中断时触发，差异在于中断的发起方：

- abort：客户端主动中断请求（第一次调用 client.abort() 时触发）
- aborted：服务端主动中断请求，且请求已经中断时触发。

### continue事件

当收到服务端的响应 `100 Continue` 时触发。熟悉HTTP协议的同学应该对 `100 Continue` 有所了解。当客户端向服务端发送首部 `Expect: 100-continue` ，服务端经过一定的校验后，决定对客户端的后续请求放行，于是返回返回 `100 Continue`，知会客户端，可以继续发送数据。（request body）

### upgrade事件

同样是跟HTTP协议密切相关。当客户端向客户端发起请求时，可以在请求首部里声明 `'Connection': 'Upgrade'` ，以此要求服务端，将当前连接升级到新的协议。如果服务器同意，那么就升级协议继续通信。这里不打算展开太多细节，直接上官方文档的代码

```js
const http = require('http');

// Create an HTTP server
var srv = http.createServer( (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('okay');
});
srv.on('upgrade', (req, socket, head) => {
  socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
               'Upgrade: WebSocket\r\n' +
               'Connection: Upgrade\r\n' +
               '\r\n');

  socket.pipe(socket); // echo back
});

// now that server is running
srv.listen(1337, '127.0.0.1', () => {

  // make a request
  var options = {
    port: 1337,
    hostname: '127.0.0.1',
    headers: {
      'Connection': 'Upgrade',
      'Upgrade': 'websocket'
    }
  };

  var req = http.request(options);
  req.end();

  req.on('upgrade', (res, socket, upgradeHead) => {
    console.log('got upgraded!');
    socket.end();
    process.exit(0);
  });
});
```

## 其他



除了上面讲解到的属性、方法、事件外，还有下面方法没有讲到。并不是它们不重要，篇幅有限，后面再展开。

- client.abort()：中断请求；
- client.setTimeout(timeout)：请求超时设置；
- client.flushHeaders() 及早将请求首部发送出去；
- client.setSocketKeepAlive()：当内部分配 socket 并连接上时，就会内部调用 socket.keepAlive()；
- client.setNoDelay([noDelay])：当内部分配 socket 并连接上时，就会内部调用 socket.setNoDelay()；

## 参考链接



upgrade机制： https://developer.mozilla.org/en-US/docs/Web/HTTP/Protocol_upgrade_mechanism

官方文档： https://nodejs.org/api/http.html#http_class_http_clientrequest

nodejs源码： https://github.com/nodejs/node/blob/master/lib/_http_client.js



# 4.6 网络服务 https

## 模块概览



这个模块的重要性，基本不用强调了。在网络安全问题日益严峻的今天，网站采用HTTPS是个必然的趋势。

在nodejs中，提供了 https 这个模块来完成 HTTPS 相关功能。从官方文档来看，跟 http 模块用法非常相似。

本文主要包含两部分：

1. 通过客户端、服务端的例子，对https模块进行入门讲解。
2. 如何访问安全证书不受信任的网站。（以 12306 为例子）

篇幅所限，本文无法对 HTTPS协议 及 相关技术体系 做过多讲解，有问题欢迎留言交流。

## 客户端例子



跟http模块的用法非常像，只不过请求的地址是https协议的而已，代码如下：

```js
var https = require('https');

https.get('https://www.baidu.com', function(res){
    console.log('status code: ' + res.statusCode);
    console.log('headers: ' + JSON.stringify(res.headers));

    res.on('data', function(data){
        process.stdout.write(data);
    });
}).on('error', function(err){
    console.error(err);
});
```

## 服务端例子



对外提供HTTPS服务，需要有HTTPS证书。如果你已经有了HTTPS证书，那么可以跳过证书生成的环节。如果没有，可以参考如下步骤

### 生成证书

#### 1、创建个目录存放证书。

```bash
mkdir cert
cd cert
```

#### 2、生成私钥。

```text
openssl genrsa -out chyingp-key.pem 2048
```

#### 3、生成证书签名请求（csr是 Certificate Signing Request的意思）。

```text
openssl req -new \
  -sha256
  -key chyingp-key.key.pem \
  -out chyingp-csr.pem \
  -subj "/C=CN/ST=Guandong/L=Shenzhen/O=YH Inc/CN=www.chyingp.com"
```

#### 4、生成证书。

```text
openssl x509 \
  -req -in chyingp-csr.pem \
  -signkey chyingp-key.pem \
  -out chyingp-cert.pem
```

### HTTPS服务端

代码如下：

```js
var https = require('https');
var fs = require('fs');

var options = {
    key: fs.readFileSync('./cert/chyingp-key.pem'), // 私钥
    cert: fs.readFileSync('./cert/chyingp-cert.pem') // 证书
};

var server = https.createServer(options, function(req, res){
    res.end('这是来自HTTPS服务器的返回');
});

server.listen(3000);
```

由于我并没有 www.chyingp.com 这个域名，于是先配置本地host

```text
127.0.0.1 www.chyingp.com
```

启动服务，并在浏览器里访问 [http://www.chyingp.com:3000 (opens new window)](http://www.chyingp.com:3000/)。注意，浏览器会提示你证书不可靠，点击 信任并继续访问 就行了。

## 进阶例子：访问安全证书不受信任的网站



这里以我们最喜爱的12306最为例子。当我们通过浏览器，访问12306的购票页面 https://kyfw.12306.cn/otn/regist/init 时，chrome会阻止我们访问，这是因为，12306的证书是自己颁发的，chrome无法确认他的安全性。

对这种情况，可以有如下处理方式：

1. 停止访问：着急抢票回家过年的老乡表示无法接受。
2. 无视安全警告，继续访问：大部分情况下，浏览器是会放行的，不过安全提示还在。
3. 导入12306的CA根证书：浏览器乖乖就范，认为访问是安全的。（实际上还是有安全提示，因为12306用的签名算法安全级别不够）

### 例子：触发安全限制

同样的，通过 node https client 发起请求，也会遇到同样问题。我们做下实验，代码如下：

```js
var https = require('https');

https.get('https://kyfw.12306.cn/otn/regist/init', function(res){   
    res.on('data', function(data){
        process.stdout.write(data);
    });
}).on('error', function(err){
    console.error(err);
});
```

运行上面代码，得到下面的错误提示，意思是 安全证书不可靠，拒绝继续访问。

```bash
{ Error: self signed certificate in certificate chain
    at Error (native)
    at TLSSocket.<anonymous> (_tls_wrap.js:1055:38)
    at emitNone (events.js:86:13)
    at TLSSocket.emit (events.js:185:7)
    at TLSSocket._finishInit (_tls_wrap.js:580:8)
    at TLSWrap.ssl.onhandshakedone (_tls_wrap.js:412:38) code: 'SELF_SIGNED_CERT_IN_CHAIN' }
```

ps：个人认为这里的错误提示有点误导人，12306网站的证书并不是自签名的，只是对证书签名的CA是12306自家的，不在可信列表里而已。自签名证书，跟自己CA签名的证书还是不一样的。

类似在浏览器里访问，我们可以采取如下处理：

1. 不建议：忽略安全警告，继续访问；
2. 建议：将12306的CA加入受信列表；

### 方法1：忽略安全警告，继续访问

非常简单，将 rejectUnauthorized 设置为 false 就行，再次运行代码，就可以愉快的返回页面了。

```js
// 例子：忽略安全警告
var https = require('https');

var options = { 
    hostname: 'kyfw.12306.cn',
    path: '/otn/leftTicket/init',
    rejectUnauthorized: false  // 忽略安全警告
};

var req = https.get(options, function(res){ 
    res.pipe(process.stdout);   
});

req.on('error', function(err){
    console.error(err.code);
});
```

### 方法2：将12306的CA加入受信列表

这里包含3个步骤：

1. 下载 12306 的CA证书
2. 将der格式的CA证书，转成pem格式
3. 修改node https的配置

#### 1、下载 12306 的CA证书

在12306的官网上，提供了CA证书的[下载地址 (opens new window)](http://www.12306.cn/mormhweb/ggxxfw/wbyyzj/201106/srca12306.zip)，将它保存到本地，命名为 srca.cer。

#### 2、将der格式的CA证书，转成pem格式

https初始化client时，提供了 ca 这个配置项，可以将 12306 的CA证书添加进去。当你访问 12306 的网站时，client就会用ca配置项里的 ca 证书，对当前的证书进行校验，于是就校验通过了。

需要注意的是，ca 配置项只支持 pem 格式，而从12306官网下载的是der格式的。需要转换下格式才能用。关于 pem、der的区别，可参考 [这里 (opens new window)](https://support.ssl.com/Knowledgebase/Article/View/19/0/der-vs-crt-vs-cer-vs-pem-certificates-and-how-to-convert-them)。

```bash
openssl x509 -in srca.cer -inform der -outform pem -out srca.cer.pem
```

#### 3、修改node https的配置

修改后的代码如下，现在可以愉快的访问12306了。

```js
// 例子：将12306的CA证书，加入我们的信任列表里
var https = require('https');
var fs = require('fs');
var ca = fs.readFileSync('./srca.cer.pem');

var options = { 
  hostname: 'kyfw.12306.cn',
  path: '/otn/leftTicket/init',
  ca: [ ca ]
};

var req = https.get(options, function(res){ 
  res.pipe(process.stdout); 
});

req.on('error', function(err){
  console.error(err.code);
});
```

## 相关链接



[Why is my node.js SSL connection failing to connect?(opens new window)](http://www.thedreaming.org/2016/09/27/nodejs-ssl/)

[DER vs. CRT vs. CER vs. PEM Certificates and How To Convert Them(opens new window)](https://support.ssl.com/Knowledgebase/Article/View/19/0/der-vs-crt-vs-cer-vs-pem-certificates-and-how-to-convert-them)

[Painless Self Signed Certificates in node.js(opens new window)](https://github.com/Daplie/node-ssl-root-cas/wiki/Painless-Self-Signed-Certificates-in-node.js)

[利用OpenSSL创建自签名的SSL证书备忘（自建ca）(opens new window)](http://wangye.org/blog/archives/732/)

[OpenSSL 与 SSL 数字证书概念贴(opens new window)](http://seanlook.com/2015/01/15/openssl-certificate-encryption/)

[自签名证书和私有CA签名的证书的区别 创建自签名证书 创建私有CA 证书类型 证书扩展名(opens new window)](http://blog.csdn.net/sdcxyz/article/details/47220129)

[那些证书相关的玩意儿(SSL,X.509,PEM,DER,CRT,CER,KEY,CSR,P12等)](http://www.cnblogs.com/guogangj/p/4118605.html)



# 4.7 网络TCP net

## 模块概览



net模块是同样是nodejs的核心模块。在http模块概览里提到，http.Server继承了net.Server，此外，http客户端与http服务端的通信均依赖于socket（net.Socket）。也就是说，做node服务端编程，net基本是绕不开的一个模块。

从组成来看，net模块主要包含两部分，了解socket编程的同学应该比较熟悉了：

- net.Server：TCP server，内部通过socket来实现与客户端的通信。
- net.Socket：tcp/本地 socket的node版实现，它实现了全双工的stream接口。

本文从一个简单的 tcp服务端/客户端 的例子开始讲解，好让读者有个概要的认识。接着再分别介绍 net.Server、net.Socket 比较重要的API、属性、事件。

对于初学者，建议把文中的例子本地跑一遍加深理解。

## 简单的 server+client 例子



tcp服务端程序如下：

```js
var net = require('net');

var PORT = 3000;
var HOST = '127.0.0.1';

// tcp服务端
var server = net.createServer(function(socket){
    console.log('服务端：收到来自客户端的请求');

    socket.on('data', function(data){
        console.log('服务端：收到客户端数据，内容为{'+ data +'}');

        // 给客户端返回数据
        socket.write('你好，我是服务端');
    });

    socket.on('close', function(){
         console.log('服务端：客户端连接断开');
    });
});
server.listen(PORT, HOST, function(){
    console.log('服务端：开始监听来自客户端的请求');
});
```

tcp客户端如下：

```js
var net = require('net');

var PORT = 3000;
var HOST = '127.0.0.1';

// tcp客户端
var client = net.createConnection(PORT, HOST);

client.on('connect', function(){
    console.log('客户端：已经与服务端建立连接');
});

client.on('data', function(data){
    console.log('客户端：收到服务端数据，内容为{'+ data +'}');
});

client.on('close', function(data){
    console.log('客户端：连接断开');
});

client.end('你好，我是客户端');
```

运行服务端、客户端代码，控制台分别输出如下：

服务端：

```bash
服务端：开始监听来自客户端的请求
服务端：收到来自客户端的请求
服务端：收到客户端数据，内容为{你好，我是客户端}
服务端：客户端连接断开
```

客户端：

```bash
客户端：已经与服务端建立连接
客户端：收到服务端数据，内容为{你好，我是服务端}
客户端：连接断开
```

## 服务端 net.Server



### server.address()

返回服务端的地址信息，比如绑定的ip地址、端口等。

```js
console.log( server.address() );
// 输出如下 { port: 3000, family: 'IPv4', address: '127.0.0.1' }
```

### server.close(callback])

关闭服务器，停止接收新的客户端请求。有几点注意事项：

- 对正在处理中的客户端请求，服务器会等待它们处理完（或超时），然后再正式关闭。
- 正常关闭的同时，callback 会被执行，同时会触发 close 事件。
- 异常关闭的同时，callback 也会执行，同时将对应的 error 作为参数传入。（比如还没调用 server.listen(port) 之前，就调用了server.close()）

下面会通过两个具体的例子进行对比，先把结论列出来

- 已调用server.listen()：正常关闭，close事件触发，然后callback执行，error参数为undefined
- 未调用server.listen()：异常关闭，close事件触发，然后callback执行，error为具体的错误信息。（注意，error 事件没有触发）

例子1：服务端正常关闭

```js
var net = require('net');
var PORT = 3000;
var HOST = '127.0.0.1';
var noop = function(){};

// tcp服务端
var server = net.createServer(noop);

server.listen(PORT, HOST, function(){

    server.close(function(error){
        if(error){
            console.log( 'close回调：服务端异常：' + error.message );
        }else{
            console.log( 'close回调：服务端正常关闭' );
        }            
    }); 
});

server.on('close', function(){
    console.log( 'close事件：服务端关闭' );
});

server.on('error', function(error){
    console.log( 'error事件：服务端异常：' + error.message );
});
```

输出为：

```bash
close事件：服务端关闭
close回调：服务端正常关闭
```

例子2：服务端异常关闭

代码如下

```js
var net = require('net');
var PORT = 3000;
var HOST = '127.0.0.1';
var noop = function(){};

// tcp服务端
var server = net.createServer(noop);

// 没有正式启动请求监听
// server.listen(PORT, HOST);

server.on('close', function(){
    console.log( 'close事件：服务端关闭' );
});

server.on('error', function(error){
    console.log( 'error事件：服务端异常：' + error.message );
});

server.close(function(error){
    if(error){
        console.log( 'close回调：服务端异常：' + error.message );
    }else{
        console.log( 'close回调：服务端正常关闭' );
    }            
});
```

输出为：

```bash
close事件：服务端关闭
close回调：服务端异常：Not running
```

### server.ref()/server.unref()

了解node事件循环的同学对这两个API应该不陌生，主要用于将server 加入事件循环/从事件循环里面剔除，影响就在于会不会影响进程的退出。

对出学习net的同学来说，并不需要特别关注，感兴趣的自己做下实验就好。

### 事件 listening/connection/close/error

- listening：调用 server.listen()，正式开始监听请求的时候触发。
- connection：当有新的请求进来时触发，参数为请求相关的 socket。
- close：服务端关闭的时候触发。
- error：服务出错的时候触发，比如监听了已经被占用的端口。

几个事件都比较简单，这里仅举个 connection 的例子。

从测试结果可以看出，有新的客户端连接产生时，net.createServer(callback) 中的callback回调 会被调用，同时 connection 事件注册的回调函数也会被调用。

事实上，net.createServer(callback) 中的 callback 在node内部实现中 也是加入了做为 connection事件 的监听函数。感兴趣的可以看下node的源码。

```js
var net = require('net');
var PORT = 3000;
var HOST = '127.0.0.1';
var noop = function(){};

// tcp服务端
var server = net.createServer(function(socket){
    socket.write('1. connection 触发\n');
});

server.on('connection', function(socket){
    socket.end('2. connection 触发\n');
});

server.listen(PORT, HOST);
```

通过下面命令测试下效果

```bash
curl http://127.0.0.1:3000
```

输出：

```bash
1. connection 触发
2. connection 触发
```

## 客户端 net.Socket



在文章开头已经举过客户端的例子，这里再把例子贴一下。(备注：严格来说不应该把 net.Socket 叫做客户端，这里方便讲解而已)

单从node官方文档来看的话，感觉 net.Socket 比 net.Server 要复杂很多，有更多的API、事件、属性。但实际上，把 net.Socket 相关的API、事件、属性 进行归类下，会发现，其实也不是特别复杂。

具体请看下一小节内容。

```js
var net = require('net');

var PORT = 3000;
var HOST = '127.0.0.1';

// tcp客户端
var client = net.createConnection(PORT, HOST);

client.on('connect', function(){
    console.log('客户端：已经与服务端建立连接');
});

client.on('data', function(data){
    console.log('客户端：收到服务端数据，内容为{'+ data +'}');
});

client.on('close', function(data){
    console.log('客户端：连接断开');
});

client.end('你好，我是客户端');
```

## API、属性归类



以下对net.Socket的API跟属性，按照用途进行了大致的分类，方便读者更好的理解。大部分API跟属性都比较简单，看下文档就知道做什么的，这里就先不展开。

### 连接相关

- socket.connect()：有3种不同的参数，用于不同的场景；
- socket.setTimeout()：用来进行连接超时设置。
- socket.setKeepAlive()：用来设置长连接。
- socket.destroy(）、socket.destroyed：当错误发生时，用来销毁socket，确保这个socket上不会再有其他的IO操作。

### 数据读、写相关

socket.write()、socket.end()、socket.pause()、socket.resume()、socket.setEncoding()、socket.setNoDelay()

### 数据属性相关

socket.bufferSize、socket.bytesRead、socket.bytesWritten

### 事件循环相关

socket.ref()、socket.unref()

### 地址相关

- socket.address()
- socket.remoteAddress、socket.remoteFamily、socket.remotePort
- socket.localAddress/socket.localPort

## 事件简介



- data：当收到另一侧传来的数据时触发。
- connect：当连接建立时触发。
- close：连接断开时触发。如果是因为传输错误导致的连接断开，则参数为error。
- end：当连接另一侧发送了 FIN 包的时候触发（读者可以回顾下HTTP如何断开连接的）。默认情况下（allowHalfOpen == false），socket会完成自我销毁操作。但你也可以把 allowHalfOpen 设置为 true，这样就可以继续往socket里写数据。当然，最后你需要手动调用 socket.end()
- error：当有错误发生时，就会触发，参数为error。（官方文档基本一句话带过，不过考虑到出错的可能太多，也可以理解）
- timeout：提示用户，socket 已经超时，需要手动关闭连接。
- drain：当写缓存空了的时候触发。（不是很好描述，具体可以看下stream的介绍）
- lookup：域名解析完成时触发。

## 相关链接



官方文档： https://nodejs.org/api/net.html#net_socket_destroy_exception



# 4.8 网络UDP dgram

## 模块概览



dgram模块是对UDP socket的一层封装，相对net模块简单很多，下面看例子。

## UDP客户端 vs UDP服务端



首先，启动UDP server，监听来自端口33333的请求。

**server.js**

```js
// 例子：UDP服务端
var PORT = 33333;
var HOST = '127.0.0.1';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port +' - ' + message);
});

server.bind(PORT, HOST);
```

然后，创建UDP socket，向端口33333发送请求。

**client.js**

```js
// 例子：UDP客户端
var PORT = 33333;
var HOST = '127.0.0.1';

var dgram = require('dgram');
var message = Buffer.from('My KungFu is Good!');

var client = dgram.createSocket('udp4');

client.send(message, PORT, HOST, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST +':'+ PORT);
    client.close();
});
```

运行 server.js。

```bash
node server.js
```

运行 client.js。

```bash
➜  2016.12.22-dgram git:(master) ✗ node client.js 
UDP message sent to 127.0.0.1:33333
```

服务端打印日志如下

```bash
UDP Server listening on 127.0.0.1:33333
127.0.0.1:58940 - My KungFu is Good!
```

## 广播



通过dgram实现广播功能很简单，服务端代码如下。

```js
var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var port = 33333;

server.on('message', function(message, rinfo){
    console.log('server got message from: ' + rinfo.address + ':' + rinfo.port);
});

server.bind(port);
```

接着创建客户端，向地址'255.255.255.255:33333'进行广播。

```js
var dgram = require('dgram');
var client = dgram.createSocket('udp4');
var msg = Buffer.from('hello world');
var port = 33333;
var host = '255.255.255.255';

client.bind(function(){
    client.setBroadcast(true);
    client.send(msg, port, host, function(err){
        if(err) throw err;
        console.log('msg has been sent');
        client.close();
    });
});
```

运行程序，最终服务端打印日志如下

```bash
➜  2016.12.22-dgram git:(master) ✗ node broadcast-server.js
server got message from: 192.168.0.102:61010
```

## 相关链接



https://nodejs.org/api/dgram.html



# 4.9 域名解析 dns

 域名解析：dns.lookup()



比如我们要查询域名 www.qq.com 对应的ip，可以通过 dns.lookup() 。

```javascript
var dns = require('dns');

dns.lookup('www.qq.com', function(err, address, family){
    if(err) throw err;
    console.log('例子A: ' + address);
});
```

输出如下：

```bash
例子A: 182.254.34.74
```

我们知道，同一个域名，可能对应多个不同的ip。那么，如何获取一个域名对应的多个ip呢？可以这样。

```javascript
var dns = require('dns');
var options = {all: true};

dns.lookup('www.qq.com', options, function(err, address, family){
    if(err) throw err;
    console.log('例子B: ' + address);
});
```

输出如下：

```bash
例子B: [{"address":"182.254.34.74","family":4},{"address":"240e:e1:8100:28::2:16","family":6}]
```

## 域名解析：dns.resolve4()



上文的例子，也可以通过 dns.resolve4() 来实现。

```javascript
var dns = require('dns');

dns.resolve4('id.qq.com', function(err, address){
    if(err) throw err;
    console.log( JSON.stringify(address) );
});
```

输出如下：

```bash
["61.151.186.39","101.227.139.179"]
```

如果要获取IPv6的地址，接口也差不多，不赘述。

## dns.lookup()跟dns.resolve4()的区别



从上面的例子来看，两个方法都可以查询域名的ip列表。那么，它们的区别在什么地方呢？

可能最大的差异就在于，当配置了本地Host时，是否会对查询结果产生影响。

- dns.lookup()：有影响。
- dns.resolve4()：没有影响。

举例，在hosts文件里配置了如下规则。

> 127.0.0.1 www.qq.com

运行如下对比示例子，就可以看到区别。

```javascript
var dns = require('dns');

dns.lookup('www.qq.com', function(err, address, family){
    if(err) throw err;
    console.log('配置host后，dns.lokup =>' + address);
});

dns.resolve4('www.qq.com', function(err, address, family){
    if(err) throw err;
    console.log('配置host后，dns.resolve4 =>' + address);
});
```

输出如下

```bash
➜  2016.11.03-node-dns git:(master) ✗ node lookup-vs-resolve4.js 
配置host后，dns.resolve4 =>182.254.34.74
配置host后，dns.lookup =>127.0.0.1
```

## 其他接口



对DNS有了解的同学，应该对A记录、NS记录、CNAME等不陌生，同样可以通过相应的API进行查询，感兴趣的可以自行尝试下。

## 相关链接



官方文档：https://nodejs.org/api/dns.html#dns_dns_resolve4_hostname_callback



# 5.0 网络地址解析 url

## 模块概述



nodejs中，提供了**url**这个非常实用的模块，用来做URL的解析。在做node服务端的开发时会经常用到。使用很简单，总共只有3个方法。

正式讲解前，各位同学先把下面这个图记在心上（来自nodejs官网），先对URL有一个直观的认识。

![img](https://interview.poetries.top/assets/url.png)

## 模块方法概述



url模块三个方法分别是：

- **.parse(urlString)**：将url字符串，解析成object，便于开发者进行操作。
- **.format(urlObj)**：.parse() 方法的反向操作。
- **.resove(from, to)**：以from作为起始地址，解析出完整的目标地址（还是看直接看例子好些）

## url解析：url.parse()



> 完整语法：url.parse(urlString[, parseQueryString[, slashesDenoteHost]])

使用比较简单，几个要点备忘如下。

1. **parseQueryString**：（默认为false）如为false，则`urlObject.query`为未解析的字符串，比如`nick=%E7%A8%8B%E5%BA%8F%E7%8C%BF%E5%B0%8F%E5%8D%A1`，且对应的值不会decode；如果`parseQueryString`为true，则`urlObject.query`为object，比如`{ nick: '程序猿小卡' }`，且值会被decode；
2. **slashesDenoteHos**：（默认为false）如果为true，那么类似`//foo/bar`里的`foo`就会被认为是`hostname`；如果为false，则`foo`被认为是pathname的一部分。
3. 关于解析得到的 urlObject ，会在下一小节进行详细介绍。

### 例子1：参数值不进行解析

代码如下：

```javascript
var url = require('url');
var str = 'http://Chyingp:HelloWorld@ke.qq.com:8080/index.html?nick=%E7%A8%8B%E5%BA%8F%E7%8C%BF%E5%B0%8F%E5%8D%A1#part=1';

var obj = url.parse(str);
console.log(obj);
```

输出如下：

```javascript
Url {
  protocol: 'http:',
  slashes: true,
  auth: 'Chyingp:HelloWorld',
  host: 'ke.qq.com:8080',
  port: '8080',
  hostname: 'ke.qq.com',
  hash: '#part=1',
  search: '?nick=%E7%A8%8B%E5%BA%8F%E7%8C%BF%E5%B0%8F%E5%8D%A1',
  query: 'nick=%E7%A8%8B%E5%BA%8F%E7%8C%BF%E5%B0%8F%E5%8D%A1',
  pathname: '/index.html',
  path: '/index.html?nick=%E7%A8%8B%E5%BA%8F%E7%8C%BF%E5%B0%8F%E5%8D%A1',
  href: 'http://Chyingp:HelloWorld@ke.qq.com:8080/index.html?nick=%E7%A8%8B%E5%BA%8F%E7%8C%BF%E5%B0%8F%E5%8D%A1#part=1' }
```

### 例子2：对参数值进行decode

代码如下：

```javascript
var url = require('url');
var str = 'http://Chyingp:HelloWorld@ke.qq.com:8080/index.html?nick=%E7%A8%8B%E5%BA%8F%E7%8C%BF%E5%B0%8F%E5%8D%A1#part=1';

var obj = url.parse(str, true);
console.log(obj);
```

输出如下，对比上面的例子会发现，**query** 字段被解析成了object，并且decode过。

```bash
Url {
  protocol: 'http:',
  slashes: true,
  auth: 'Chyingp:HelloWorld',
  host: 'ke.qq.com:8080',
  port: '8080',
  hostname: 'ke.qq.com',
  hash: '#part=1',
  search: '?nick=%E7%A8%8B%E5%BA%8F%E7%8C%BF%E5%B0%8F%E5%8D%A1',
  query: { nick: '程序猿小卡' },
  pathname: '/index.html',
  path: '/index.html?nick=%E7%A8%8B%E5%BA%8F%E7%8C%BF%E5%B0%8F%E5%8D%A1',
  href: 'http://Chyingp:HelloWorld@ke.qq.com:8080/index.html?nick=%E7%A8%8B%E5%BA%8F%E7%8C%BF%E5%B0%8F%E5%8D%A1#part=1' }
```

### 例子3：针对路径 //foo/bar 的处理

代码如下：

```text
var url = require('url');
var str = '//foo/bar';

var obj = url.parse(str, true, false);
console.log(obj);

obj = url.parse(str, true, true);
console.log(obj);
```

输出如下，自行对比两者之间的差异：

```bash
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '',
  query: {},
  pathname: '//foo/bar',
  path: '//foo/bar',
  href: '//foo/bar' }
Url {
  protocol: null,
  slashes: true,
  auth: null,
  host: 'foo',
  port: null,
  hostname: 'foo',
  hash: null,
  search: '',
  query: {},
  pathname: '/bar',
  path: '/bar',
  href: '//foo/bar' }
```

## 关于urlObject



以上面的作为例子，粗略讲解下`urlObject`。更多细节可参考[官方文档 (opens new window)](https://nodejs.org/api/url.html#url_url_strings_and_url_objects)。

- protocol：协议，需要注意的是包含了`:`，并且是小写的。
- slashes：如果`:`后面跟了两个`//`，那么为true。
- auth：认证信息，如果有密码，为`usrname:passwd`，如果没有，则为`usrname`。注意，这里区分大小写。
- host：主机名。注意包含了端口，比如`ke.qq.com:8080`，并且是小写的。
- hostname：主机名，不包含端口，并且是小写的。
- hash：哈希部分，注意包含了`#`。
- search：查询字符串，注意，包含了`?`，此外，值是没有经过decode的。
- query：字符串 或者 对象。如果是字符串，则是`search`去掉`?`，其余一样；如果是对象，那么是decode过的。
- path：路径部分，包含search部分。
- pathname：路径部分，不包含search部分。
- href：原始的地址。不过需要注意的是，`protocol`、`host`会被转成小写字母。

```javascript
{
  protocol: 'http:',
  slashes: true,
  auth: 'Chyingp:HelloWorld',
  host: 'ke.qq.com:8080',
  port: '8080',
  hostname: 'ke.qq.com',
  hash: '#part=1',
  search: '?nick=%E7%A8%8B%E5%BA%8F%E7%8C%BF%E5%B0%8F%E5%8D%A1',
  query: { nick: '程序猿小卡' },
  pathname: '/index.html',
  path: '/index.html?nick=%E7%A8%8B%E5%BA%8F%E7%8C%BF%E5%B0%8F%E5%8D%A1',
  href: 'http://Chyingp:HelloWorld@ke.qq.com:8080/index.html?nick=%E7%A8%8B%E5%BA%8F%E7%8C%BF%E5%B0%8F%E5%8D%A1#part=1' }
```

## url拼接：url.format(urlObject)



> 完整语法：url.format(urlObject)

`url.parse(str)`的反向操作，没什么好说的。`urlObject`包含了很多字段，比如`protocol`、`slashes`、`protocol`等，且不一定需要全部传，所以有一套解析逻辑。

过程比较冗长，大部分时候不需要用到，直接贴[官方文档 (opens new window)](https://nodejs.org/api/url.html#url_url_format_urlobject)的链接，有需要再看。

## url.resolve(from, to)



用法比较简单，直接贴官方文档的例子

```javascript
url.resolve('/one/two/three', 'four')         // '/one/two/four'
url.resolve('http://example.com/', '/one')    // 'http://example.com/one'
url.resolve('http://example.com/one', '/two') // 'http://example.com/two'
```

## 非法字符转义



url字符如果有下面的字符会被转义（非法字符）

> < > " ` \r \n \t { } | \ ^ '

## 相关链接



官方文档：https://nodejs.org/api/url.html#url_url



# 5.1 URL查询字符串 querystring

## 模块概述



在nodejs中，提供了**querystring**这个模块，用来做url查询参数的解析，使用非常简单。

模块总共有四个方法，绝大部分时，我们只会用到 **.parse()**、 **.stringify()**两个方法。剩余的方法，感兴趣的同学可自行查看文档。

- **.parse()**：对url查询参数（字符串）进行解析，生成易于分析的json格式。
- **.stringif()**：跟**.parse()**相反，用于拼接查询查询。

```javascript
querystring.parse(str[, sep[, eq[, options]]])
querystring.stringify(obj[, sep[, eq[, options]]])
```

## 查询参数解析：querystring.parse()



> 参数：querystring.parse(str[, sep[, eq[, options]]])

第四个参数几乎不会用到,直接不讨论. 第二个, 第三个其实也很少用到,但某些时候还是可以用一下。直接看例子

```javascript
var querystring = require('querystring');
var str = 'nick=casper&age=24';
var obj = querystring.parse(str);
console.log(JSON.stringify(obj, null, 4));
```

输出如下

```javascript
{
    "nick": "casper",
    "age": "24"
}
```

再来看下`sep`、`eq`有什么作用。相当于可以替换`&`、`=`为自定义字符，对于下面的场景来说还是挺省事的。

```javascript
var str1 = 'nick=casper&age=24&extra=name-chyingp|country-cn';
var obj1 = querystring.parse(str1);
var obj2 = querystring.parse(obj1.extra, '|', '-');
console.log(JSON.stringify(obj2, null, 4));
```

输出如下

```javascript
{
    "name": "chyingp",
    "country": "cn"
}
```

## 查询参数拼接：querystring.stringify()



> querystring.stringify(obj[, sep[, eq[, options]]])

没什么好说的，相当于`parse`的逆向操作。直接看代码

```javascript
var querystring = require('querystring');

var obj1 = {
    "nick": "casper",
    "age": "24"
};
var str1 = querystring.stringify(obj1);
console.log(str1);

var obj2 = {
    "name": "chyingp",
    "country": "cn"
};
var str2 = querystring.stringify(obj2, '|', '-');
console.log(str2);
```

输出如下

```javascript
nick=casper&age=24
name-chyingp|country-cn
```

## 相关链接



官方文档：https://nodejs.org/api/querystring.html



# 6.1 流操作 stream

## 模块概览



nodejs的核心模块，基本上都是stream的的实例，比如process.stdout、http.clientRequest。

对于大部分的nodejs开发者来说，平常并不会直接用到stream模块，只需要了解stream的运行机制即可（非常重要）。

而对于想要实现自定义stream实例的开发者来说，就得好好研究stream的扩展API了，比如gulp的内部实现就大量用到了自定义的stream类型。

来个简单的例子镇楼，几行代码就实现了读取文件内容，并打印到控制台：

```js
const fs = require('fs');

fs.createReadStream('./sample.txt').pipe(process.stdout);
```

## Stream分类



在nodejs中，有四种stream类型：

- Readable：用来读取数据，比如 `fs.createReadStream()`。
- Writable：用来写数据，比如 `fs.createWriteStream()`。
- Duplex：可读+可写，比如 `net.Socket()`。
- Transform：在读写的过程中，可以对数据进行修改，比如 `zlib.createDeflate()`（数据压缩/解压）。

## Readable Stream



以下都是nodejs中常见的Readable Stream，当然还有其他的，可自行查看文档。

- http.IncomingRequest
- fs.createReadStream()
- process.stdin
- 其他

例子一：

```js
var fs = require('fs');

fs.readFile('./sample.txt', 'utf8', function(err, content){
	// 文件读取完成，文件内容是 [你好，我是程序猿小卡]
	console.log('文件读取完成，文件内容是 [%s]', content);
});
```

例子二：

```js
var fs = require('fs');

var readStream = fs.createReadStream('./sample.txt');
var content = '';

readStream.setEncoding('utf8');

readStream.on('data', function(chunk){
	content += chunk;
});

readStream.on('end', function(chunk){
	// 文件读取完成，文件内容是 [你好，我是程序猿小卡]
	console.log('文件读取完成，文件内容是 [%s]', content);
});
```

例子三：

这里使用了`.pipe(dest)`，好处在于，如果源文件较大，对于降低内存占用有好处。

```js
var fs = require('fs');

fs.createReadStream('./sample.txt').pipe(process.stdout);
```

注意：这里只是原封不动的将内容输出到控制台，所以实际上跟前两个例子有细微差异。可以稍做修改，达到上面同样的效果

```js
var fs = require('fs');

var onEnd = function(){
	process.stdout.write(']');	
};

var fileStream = fs.createReadStream('./sample.txt');
fileStream.on('end', onEnd)

fileStream.pipe(process.stdout);

process.stdout.write('文件读取完成，文件内容是[');

// 文件读取完成，文件内容是[你好，我是程序猿小卡]
```

## Writable Stream



同样以写文件为例子，比如想将`hello world`写到`sample.txt`里。

例子一：

```js
var fs = require('fs');
var content = 'hello world';
var filepath = './sample.txt';

fs.writeFile(filepath, content);
```

例子二：

```js
var fs = require('fs');
var content = 'hello world';
var filepath = './sample.txt';

var writeStram = fs.createWriteStream(filepath);
writeStram.write(content);
writeStram.end();
```

## Duplex Stream



最常见的Duplex stream应该就是`net.Socket`实例了，在前面的文章里有接触过，这里就直接上代码了，这里包含服务端代码、客户端代码。

服务端代码：

```js
var net = require('net');
var opt = {
	host: '127.0.0.1',
	port: '3000'
};

var server = net.createServer((socket) => {
    socket.on('data', (data) => {
        console.log('client send message: ', data.toString());
    });
    socket.write('hello client');
});
server.listen(opt.port, opt.host, ()=>{
    console.log(server.address());
});
```

客户端代码：

```js
var net = require('net');
var opt = {
	host: '127.0.0.1',
	port: '3000'
};

var client = net.connect(opt, function(){
	client.write('msg from client');  // 可写
});

// 可读
client.on('data', function(data){
    // lient: got reply from server [reply from server]
	console.log('client: got reply from server [%s]', data);
	client.end();
});
```

## Transform Stream



Transform stream是Duplex stream的特例，也就是说，Transform stream也同时可读可写。跟Duplex stream的区别点在于，Transform stream的输出与输入是存在相关性的。

常见的Transform stream包括`zlib`、`crypto`，这里举个简单例子：文件的gzip压缩。

```js
var fs = require('fs');
var zlib = require('zlib');

var gzip = zlib.createGzip();

var inFile = fs.createReadStream('./extra/fileForCompress.txt');
var out = fs.createWriteStream('./extra/fileForCompress.txt.gz');

inFile.pipe(gzip).pipe(out);
```

## 相关链接



https://nodejs.org/api/stream.html



# 6.2 逐行读取 readline

## 模块概览



readline是个非常实用的模块。如名字所示，主要用来实现逐行读取，比如读取用户输入，或者读取文件内容。常见使用场景有下面几种，本文会逐一举例说明。

- 文件逐行读取：比如说进行日志分析。
- 自动完成：比如输入npm，自动提示"help init install"。
- 命令行工具：比如npm init这种问答式的脚手架工具。

## 基础例子



先看个简单的例子，要求用户输入一个单词，然后自动转成大写

```js
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Please input a word: ', function(answer){
    console.log('You have entered [%s]', answer.toUpperCase());
    rl.close();
});
```

运行如下：

```bash
➜  toUpperCase git:(master) ✗ node app.js 
Please input a word: hello
You have entered {HELLO}
```

## 例子：文件逐行读取：日志分析



比如我们有如下日志文件access.log，我们想要提取“访问时间+访问地址”，借助`readline`可以很方便的完成日志分析的工作。

```text
[2016-12-09 13:56:48.407] [INFO] access - ::ffff:127.0.0.1 - - "GET /oc/v/account/user.html HTTP/1.1" 200 213125 "http://www.example.com/oc/v/account/login.html" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36"
[2016-12-09 14:00:10.618] [INFO] access - ::ffff:127.0.0.1 - - "GET /oc/v/contract/underlying.html HTTP/1.1" 200 216376 "http://www.example.com/oc/v/account/user.html" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36"
[2016-12-09 14:00:34.200] [INFO] access - ::ffff:127.0.0.1 - - "GET /oc/v/contract/underlying.html HTTP/1.1" 200 216376 "http://www.example.com/oc/v/account/user.html" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36"
```

代码如下：

```js
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('./access.log')
});

rl.on('line', (line) => {
    const arr = line.split(' '); 
    console.log('访问时间：%s %s，访问地址：%s', arr[0], arr[1], arr[13]);
});
```

运行结果如下：

```bash
➜  lineByLineFromFile git:(master) ✗ node app.js
访问时间：[2016-12-09 13:56:48.407]，访问地址："http://www.example.com/oc/v/account/login.html"
访问时间：[2016-12-09 14:00:10.618]，访问地址："http://www.example.com/oc/v/account/user.html"
访问时间：[2016-12-09 14:00:34.200]，访问地址："http://www.example.com/oc/v/account/user.html"
```

## 例子：自动完成：代码提示



这里我们实现一个简单的自动完成功能，当用户输入npm时，按tab键，自动提示用户可选的子命令，如help、init、install。

- 输入`np`，按下tab：自动补全为npm
- 输入`npm in`，按下tab：自动提示可选子命令 init、install
- 输入`npm inst`，按下tab：自动补全为 `npm install`

```js
const readline = require('readline');
const fs = require('fs');

function completer(line) {
    const command = 'npm';
    const subCommands = ['help', 'init', 'install'];

    // 输入为空，或者为npm的一部分，则tab补全为npm
    if(line.length < command.length){
        return [command.indexOf(line) === 0 ? [command] : [], line];
    }

    // 输入 npm，tab提示 help init install
    // 输入 npm in，tab提示 init install
    let hits = subCommands.filter(function(subCommand){ 
        const lineTrippedCommand = line.replace(command, '').trim();
        return lineTrippedCommand && subCommand.indexOf( lineTrippedCommand ) === 0;
    })

    if(hits.length === 1){
        hits = hits.map(function(hit){
            return [command, hit].join(' ');
        });
    }
  
    return [hits.length ? hits : subCommands, line];
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  completer: completer
});

rl.prompt();
```

代码运行效果如下，当输入`npm in`，按下tab键，则会自动提示可选子命令init、install。

```bash
➜  autoComplete git:(master) ✗ node app.js
> npm in
init     install  
```

## 例子：命令行工具：npmt init



下面借助readline实现一个迷你版的`npm init`功能，运行脚本时，会依次要求用户输入name、version、author属性（其他略过）。

这里用到的是`rl.question(msg, cbk)`这个方法，它会在控制台输入一行提示，当用户完成输入，敲击回车，`cbk`就会被调用，并把用户输入作为参数传入。

```js
const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'OHAI> '
});

const preHint = `
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See \`npm help json\` for definitive documentation on these fields
and exactly what they do.

Use \`npm install <pkg> --save\` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
`;

console.log(preHint);

// 问题
let questions = [ 'name', 'version', 'author'];

// 默认答案
let defaultAnswers = [ 'name', '1.0.0', 'none' ];

// 用户答案
let answers = [];
let index = 0;

function createPackageJson(){
    var map = {};
    questions.forEach(function(question, index){
        map[question] = answers[index];
    });

    fs.writeFileSync('./package.json', JSON.stringify(map, null, 4));
}

function runQuestionLoop() {

    if(index === questions.length) {
        createPackageJson();
        rl.close();
        return;
    }
    
    let defaultAnswer = defaultAnswers[index];
    let question = questions[index] + ': (' + defaultAnswer +') ';
    
    rl.question(question, function(answer){
        answers.push(answer || defaultAnswer);
        index++;
        runQuestionLoop();
    });
}

runQuestionLoop();
```

运行效果如下，最后还像模像样的生成了package.json（害羞脸）。

```bash
➜  commandLine git:(master) ✗ node app.js

This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.

name: (name) hello
version: (1.0.0) 0.0.1
author: (none) chyingp
```

## 写在后面



有不少基于readline的有趣的工具，比如各种脚手架工具。限于篇幅不展开，感兴趣的同学可以研究下。

## 相关链接



https://nodejs.org/api/readline.html



# 7.1 进程相关 process

## 模块概览



process是node的全局模块，作用比较直观。可以通过它来获得node进程相关的信息，比如运行node程序时的命令行参数。或者设置进程相关信息，比如设置环境变量。

## 环境变量：process.env



使用频率很高，node服务运行时，时常会判断当前服务运行的环境，如下所示

```js
if(process.env.NODE_ENV === 'production'){
    console.log('生产环境');
}else{
    console.log('非生产环境');
}
```

运行命令 `NODE_ENV=production node env.js`，输出如下

```bash
非生产环境
```

## 异步：process.nextTick(fn)



使用频率同样很高，通常用在异步的场景，来个简单的栗子：

```js
console.log('海贼王');
process.nextTick(function(){
    console.log('火影忍者');
});
console.log('死神');

// 输出如下
// 海贼王
// 死神
// 火影忍者
```

process.nextTick(fn) 咋看跟 setTimeout(fn, 0) 很像，但实际有实现及性能上的差异，我们先记住几个点：

- process.nextTick(fn) 将 fn 放到 node 事件循环的 下一个tick 里；
- process.nextTick(fn) 比 setTimetout(fn, 0) 性能高；

这里不打算深入讨论，感兴趣的可以点击[这里 (opens new window)](https://cnodejs.org/topic/4f16442ccae1f4aa2700109b)进行了解。

## 获取命令行参数：process.argv



process.argv 返回一个数组，数组元素分别如下：

- 元素1：node
- 元素2：可执行文件的绝对路径
- 元素x：其他，比如参数等

```js
// print process.argv
process.argv.forEach(function(val, index, array) {
  console.log('参数' + index + ': ' + val);
});
```

运行命令 `NODE_ENV=dev node argv.js --env production`，输出如下。（不包含环境变量）

```bash
参数0: /Users/a/.nvm/versions/node/v6.1.0/bin/node
参数1: /Users/a/Documents/git-code/nodejs-learning-guide/examples/2016.11.22-node-process/argv.js
参数2: --env
参数3: production
```

## 获取node specific参数：process.execArgv



跟 process.argv 看着像，但差异很大。它会返回 node specific 的参数（也就是运行node程序特有的参数啦，比如 --harmony）。这部分参数不会出现在 process.argv 里。

我们来看个例子，相当直观。输入命令 `node --harmony execArgv.js --nick chyingp`， execArgv.js 代码如下：

```js
process.execArgv.forEach(function(val, index, array) {
  console.log(index + ': ' + val);
});
// 输出：
// 0: --harmony

process.argv.forEach(function(val, index, array) {
  console.log(index + ': ' + val);
});
// 输出：
// 0: /Users/a/.nvm/versions/node/v6.1.0/bin/node
// 1: /Users/a/Documents/git-code/nodejs-learning-guide/examples/2016.11.22-node-process/execArgv.js
// 2: --nick
// 3: chyingp
```

## 当前工作路径：process.cwd() vs process.chdir(directory)



- process.cwd()：返回当前工作路径
- process.chdir(directory)：切换当前工作路径

工作路径的用途不用过多解释了，直接上代码

```js
console.log('Starting directory: ' + process.cwd());
try {
  process.chdir('/tmp');
  console.log('New directory: ' + process.cwd());
}
catch (err) {
  console.log('chdir: ' + err);
}
```

输出如下：

```bash
Starting directory: /Users/a/Documents/git-code/nodejs-learning-guide/examples/2016.11.22-node-process
New directory: /private/tmp
```

## IPC相关



- process.connected：如果当前进程是子进程，且与父进程之间通过IPC通道连接着，则为true；
- process.disconnect()：断开与父进程之间的IPC通道，此时会将 process.connected 置为false；

首先是 connected.js，通过 fork 创建子进程（父子进程之间创建了IPC通道）

```js
var child_process = require('child_process');

child_process.fork('./connectedChild.js', {
  stdio: 'inherit'
});
```

然后，在 connectedChild.js 里面。

```js
console.log( 'process.connected: ' + process.connected );
process.disconnect();
console.log( 'process.connected: ' + process.connected );

// 输出：
// process.connected: true
// process.connected: false
```

## 其他



process.config：跟node的编译配置参数有关

## 标准输入/标准输出/标准错误输出：process.stdin、process.stdout



process.stdin、process.stdout、process.stderr 分别代表进程的标准输入、标准输出、标准错误输出。看官网的例子

```js
process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write(`data: ${chunk}`);
  }
});

process.stdin.on('end', () => {
  process.stdout.write('end');
});
```

执行程序，可以看到，程序通过 process.stdin 读取用户输入的同时，通过 process.stdout 将内容输出到控制台

```bash
hello
data: hello
world
data: world
```

process.stderr也差不多，读者可以自己试下。

## 用户组/用户 相关



process.seteuid(id)： process.geteuid()：获得当前用户的id。（POSIX平台上才有效）

process.getgid(id) process.getgid()：获得当前群组的id。（POSIX平台上才有效，群组、有效群组 的区别，请自行谷歌）

process.setegid(id) process.getegid()：获得当前有效群组的id。（POSIX平台上才有效）

process.setroups(groups)： process.getgroups()：获得附加群组的id。（POSIX平台上才有效，

process.setgroups(groups)： process.setgroups(groups)：

process.initgroups(user, extra_group)：

## 当前进程信息



- process.pid：返回进程id。
- process.title：可以用它来修改进程的名字，当你用`ps`命令，同时有多个node进程在跑的时候，作用就出来了。

## 运行情况/资源占用情况



- process.uptime()：当前node进程已经运行了多长时间（单位是秒）。
- process.memoryUsage()：返回进程占用的内存，单位为字节。输出内容大致如下：

```js
{ 
    rss: 19181568, 
    heapTotal: 8384512, // V8占用的内容
    heapUsed: 4218408 // V8实际使用了的内存
}
```

- process.cpuUsage([previousValue])：CPU使用时间耗时，单位为毫秒。user表示用户程序代码运行占用的时间，system表示系统占用时间。如果当前进程占用多个内核来执行任务，那么数值会比实际感知的要大。官方例子如下：

```js
const startUsage = process.cpuUsage();
// { user: 38579, system: 6986 }

// spin the CPU for 500 milliseconds
const now = Date.now();
while (Date.now() - now < 500);

console.log(process.cpuUsage(startUsage));
// { user: 514883, system: 11226 }
```

- process.hrtime()：一般用于做性能基准测试。返回一个数组，数组里的值为 [[seconds, nanoseconds] （1秒等10的九次方毫微秒）。 注意，这里返回的值，是相对于过去一个随机的时间，所以本身没什么意义。仅当你将上一次调用返回的值做为参数传入，才有实际意义。

把官网的例子稍做修改：

```js
var time = process.hrtime();

setInterval(() => {
  var diff = process.hrtime(time);

  console.log(`Benchmark took ${diff[0] * 1e9 + diff[1]} nanoseconds`);
}, 1000);
```

输出大概如下：

```bash
Benchmark took 1006117293 nanoseconds
Benchmark took 2049182207 nanoseconds
Benchmark took 3052562935 nanoseconds
Benchmark took 4053410161 nanoseconds
Benchmark took 5056050224 nanoseconds
```

## node可执行程序相关信息



1. process.version：返回当前node的版本，比如'v6.1.0'。
2. process.versions：返回node的版本，以及依赖库的版本，如下所示。

```js
{ http_parser: '2.7.0',
  node: '6.1.0',
  v8: '5.0.71.35',
  uv: '1.9.0',
  zlib: '1.2.8',
  ares: '1.10.1-DEV',
  icu: '56.1',
  modules: '48',
  openssl: '1.0.2h' }
```

1. process.release：返回当前node发行版本的相关信息，大部分时候不会用到。具体字段含义可以看[这里 (opens new window)](https://nodejs.org/api/process.html#process_process_release)。

```js
{
  name: 'node',
  lts: 'Argon',
  sourceUrl: 'https://nodejs.org/download/release/v4.4.5/node-v4.4.5.tar.gz',
  headersUrl: 'https://nodejs.org/download/release/v4.4.5/node-v4.4.5-headers.tar.gz',
  libUrl: 'https://nodejs.org/download/release/v4.4.5/win-x64/node.lib'
}
```

1. process.config：返回当前 node版本 编译时的参数，同样很少会用到，一般用来查问题。
2. process.execPath：node可执行程序的绝对路径，比如 '/usr/local/bin/node'

## 进程运行所在环境



- process.arch：返回当前系统的处理器架构（字符串），比如'arm', 'ia32', or 'x64'。
- process.platform：返回关于平台描述的字符串，比如 darwin、win32 等。

## 警告信息:process.emitWarning(warning);



v6.0.0新增的接口，可以用来抛出警告信息。最简单的例子如下，只有警告信息

```js
process.emitWarning('Something happened!');
// (node:50215) Warning: Something happened!
```

可以给警告信息加个名字，便于分类

```js
process.emitWarning('Something Happened!', 'CustomWarning');
// (node:50252) CustomWarning: Something Happened!
```

可以对其进行监听

```js
process.emitWarning('Something Happened!', 'CustomWarning');

process.on('warning', (warning) => {
  console.warn(warning.name);
  console.warn(warning.message);
  console.warn(warning.stack);
});

/*
(node:50314) CustomWarning: Something Happened!
CustomWarning
Something Happened!
CustomWarning: Something Happened!
    at Object.<anonymous> (/Users/a/Documents/git-code/nodejs-learning-guide/examples/2016.11.22-node-process/emitWarning.js:3:9)
    at Module._compile (module.js:541:32)
    at Object.Module._extensions..js (module.js:550:10)
    at Module.load (module.js:456:32)
    at tryModuleLoad (module.js:415:12)
    at Function.Module._load (module.js:407:3)
    at Function.Module.runMain (module.js:575:10)
    at startup (node.js:160:18)
    at node.js:445:3
*/    
```

也可以直接给个Error对象

```js
const myWarning = new Error('Warning! Something happened!');
myWarning.name = 'CustomWarning';

process.emitWarning(myWarning);
```

## 向进程发送信号：process.kill(pid, signal)



process.kill() 这个方法名可能会让初学者感到困惑，其实它并不是用来杀死进程的，而是用来向进程发送信号。举个例子：

```js
console.log('hello');

process.kill(process.pid, 'SIGHUP');

console.log('world');
```

输出如下，可以看到，最后一行代码并没有执行，因为向当前进程发送 SIGHUP 信号，进程退出所致。

```bash
hello
[1]    50856 hangup     node kill.js
```

可以通过监听 SIGHUP 事件，来阻止它的默认行为。

```js
process.on('SIGHUP', () => {
  console.log('Got SIGHUP signal.');
});

console.log('hello');

process.kill(process.pid, 'SIGHUP');

console.log('world');
```

测试结果比较意外，输出如下：（osx 10.11.4），SIGHUP 事件回调里的内容并没有输出。

```bash
hello
world
```

猜测是因为写标准输出被推到下一个事件循环导致（类似process.exit()小节提到的），再试下

```js
process.on('SIGHUP', () => {
  console.log('Got SIGHUP signal.');
});

setTimeout(function(){
  console.log('Exiting.');
}, 0);

console.log('hello');

process.kill(process.pid, 'SIGHUP');

console.log('world');
```

输出如下（其实并不能说明什么。。。知道真相的朋友请举手。。。）

```bash
hello
world
Exiting.
Got SIGHUP signal.
```

## 终止进程：process.exit([exitCode])、process.exitCode



1. process.exit([exitCode]) 可以用来立即退出进程。即使当前有操作没执行完，比如 process.exit() 的代码逻辑，或者未完成的异步逻辑。
2. 写数据到 process.stdout 之后，立即调用 process.exit() 是不保险的，因为在node里面，往 stdout 写数据是非阻塞的，可以跨越多个事件循环。于是，可能写到一半就跪了。比较保险的做法是，通过process.exitCode设置退出码，然后等进程自动退出。
3. 如果程序出现异常，必须退出不可，那么，可以抛出一个未被捕获的error，来终止进程，这个比 process.exit() 安全。

来段官网的例子镇楼：

```js
// How to properly set the exit code while letting
// the process exit gracefully.
if (someConditionNotMet()) {
  printUsageToStdout();
  process.exitCode = 1;
}
```

备注：整个 process.exit() 的接口说明，都在告诉我们 process.exit() 这个接口有多不可靠。。。还用吗。。。

## 事件



- beforeExit：进程退出之前触发，参数为 exitCode。（此时eventLoop已经空了）如果是显式调用 process.exit()退出，或者未捕获的异常导致退出，那么 beforeExit 不会触发。（我要，这事件有何用。。。）
- exit：

## TODO 待进一步验证



1. 官方文档里，对于 process.nextTick(fn) 有如下描述，如何构造用例进行测试？

> It runs before any additional I/O events (including timers) fire in subsequent ticks of the event loop.

1. process.channel：实际测试结果，即使父、子进程间存在IPC通道，process.channel 的值依旧是undefined.（测试方法有问题？）

## 相关链接



[Understanding process.nextTick()(opens new window)](https://howtonode.org/understanding-process-next-tick)

[nodejs 异步之 Timer &Tick; 篇](https://cnodejs.org/topic/4f16442ccae1f4aa2700109b)



# 7.2 子进程 child

## 模块概览



在node中，child_process这个模块非常重要。掌握了它，等于在node的世界开启了一扇新的大门。

举个简单的例子：

```javascript
const spawn = require('child_process').spawn;
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
```

## 几种创建子进程的方式



注意事项：

- 下面列出来的都是异步创建子进程的方式，每一种方式都有对应的同步版本。
- `.exec()`、`.execFile()`、`.fork()`底层都是通过`.spawn()`实现的。
- `.exec()`、`execFile()`额外提供了回调，当子进程停止的时候执行。

> child_process.spawn(command[, args][, options]) child_process.exec(command[, options][, callback]) child_process.execFile(file[, args][, options][, callback]) child_process.fork(modulePath[, args][, options])

### child_process.exec(command[, options][, callback])

创建一个shell，然后在shell里执行命令。执行完成后，将stdout、stderr作为参数传入回调方法。

> spawns a shell and runs a command within that shell, passing the stdout and stderr to a callback function when complete.

例子如下：

1. 执行成功，`error`为`null`；执行失败，`error`为`Error`实例。`error.code`为错误码，
2. `stdout`、`stderr`为标准输出、标准错误。默认是字符串，除非`options.encoding`为`buffer`

```javascript
var exec = require('child_process').exec;

// 成功的例子
exec('ls -al', function(error, stdout, stderr){
    if(error) {
        console.error('error: ' + error);
        return;
    }
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + typeof stderr);
});

// 失败的例子
exec('ls hello.txt', function(error, stdout, stderr){
    if(error) {
        console.error('error: ' + error);
        return;
    }
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
});
```

#### 参数说明：

- `cwd`：当前工作路径。
- `env`：环境变量。
- `encoding`：编码，默认是`utf8`。
- `shell`：用来执行命令的shell，unix上默认是`/bin/sh`，windows上默认是`cmd.exe`。
- `timeout`：默认是0。
- `killSignal`：默认是`SIGTERM`。
- `uid`：执行进程的uid。
- `gid`：执行进程的gid。
- `maxBuffer`： 标准输出、错误输出最大允许的数据量（单位为字节），如果超出的话，子进程就会被杀死。默认是200*1024（就是200k啦）

备注：

1. 如果`timeout`大于0，那么，当子进程运行超过`timeout`毫秒，那么，就会给进程发送`killSignal`指定的信号（比如`SIGTERM`）。
2. 如果运行没有出错，那么`error`为`null`。如果运行出错，那么，`error.code`就是退出代码（exist code），`error.signal`会被设置成终止进程的信号。（比如`CTRL+C`时发送的`SIGINT`）

#### 风险项

传入的命令，如果是用户输入的，有可能产生类似sql注入的风险，比如

```text
exec('ls hello.txt; rm -rf *', function(error, stdout, stderr){
    if(error) {
        console.error('error: ' + error);
        // return;
    }
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
});
```

#### 备注事项

Note: Unlike the exec(3) POSIX system call, child_process.exec() does not replace the existing process and uses a shell to execute the command.



### child_process.execFile(file[, args][, options][, callback])

跟`.exec()`类似，不同点在于，没有创建一个新的shell。至少有两点影响

1. 比`child_process.exec()`效率高一些。（实际待测试）
2. 一些操作，比如I/O重定向，文件glob等不支持。

> similar to child_process.exec() except that it spawns the command directly without first spawning a shell.

`file`： 可执行文件的名字，或者路径。

例子：

```javascript
var child_process = require('child_process');

child_process.execFile('node', ['--version'], function(error, stdout, stderr){
    if(error){
        throw error;
    }
    console.log(stdout);
});

child_process.execFile('/Users/a/.nvm/versions/node/v6.1.0/bin/node', ['--version'], function(error, stdout, stderr){
    if(error){
        throw error;
    }
    console.log(stdout);
});
```

====== 扩展阅读 =======

从node源码来看，`exec()`、`execFile()`最大的差别，就在于是否创建了shell。（execFile()内部，options.shell === false），那么，可以手动设置shell。以下代码差不多是等价的。win下的shell设置有所不同，感兴趣的同学可以自己试验下。

备注：execFile()内部最终还是通过spawn()实现的， 如果没有设置 {shell: '/bin/bash'}，那么 spawm() 内部对命令的解析会有所不同，execFile('ls -al .') 会直接报错。

```javascript
var child_process = require('child_process');
var execFile = child_process.execFile;
var exec = child_process.exec;

exec('ls -al .', function(error, stdout, stderr){
    if(error){
        throw error;
    }
    console.log(stdout);
});

execFile('ls -al .', {shell: '/bin/bash'}, function(error, stdout, stderr){
    if(error){
        throw error;
    }
    console.log(stdout);
});
```

### child_process.fork(modulePath[, args][, options])

`modulePath`：子进程运行的模块。

参数说明：（重复的参数说明就不在这里列举）

- `execPath`： 用来创建子进程的可执行文件，默认是`/usr/local/bin/node`。也就是说，你可通过`execPath`来指定具体的node可执行文件路径。（比如多个node版本）
- `execArgv`： 传给可执行文件的字符串参数列表。默认是`process.execArgv`，跟父进程保持一致。
- `silent`： 默认是`false`，即子进程的`stdio`从父进程继承。如果是`true`，则直接`pipe`向子进程的`child.stdin`、`child.stdout`等。
- `stdio`： 如果声明了`stdio`，则会覆盖`silent`选项的设置。

例子1：silent

**parent.js**

```javascript
var child_process = require('child_process');

// 例子一：会打印出 output from the child
// 默认情况，silent 为 false，子进程的 stdout 等
// 从父进程继承
child_process.fork('./child.js', {
    silent: false
});

// 例子二：不会打印出 output from the silent child
// silent 为 true，子进程的 stdout 等
// pipe 向父进程
child_process.fork('./silentChild.js', {
    silent: true
});

// 例子三：打印出 output from another silent child
var child = child_process.fork('./anotherSilentChild.js', {
    silent: true
});

child.stdout.setEncoding('utf8');
child.stdout.on('data', function(data){
    console.log(data);
});
```

**child.js**

```javascript
console.log('output from the child');
```

**silentChild.js**

```javascript
console.log('output from the silent child');
```

**anotherSilentChild.js**

```javascript
console.log('output from another silent child');
```

例子二：ipc

parent.js

```javascript
var child_process = require('child_process');

var child = child_process.fork('./child.js');

child.on('message', function(m){
    console.log('message from child: ' + JSON.stringify(m));
});

child.send({from: 'parent'});
```

child.js

```javascript
process.on('message', function(m){
    console.log('message from parent: ' + JSON.stringify(m));
});

process.send({from: 'child'});
```

运行结果

```powershell
➜  ipc git:(master) ✗ node parent.js
message from child: {"from":"child"}
message from parent: {"from":"parent"}
```

例子三：execArgv

首先，process.execArgv的定义，参考[这里 (opens new window)](https://nodejs.org/api/process.html#process_process_execargv)。设置`execArgv`的目的一般在于，让子进程跟父进程保持相同的执行环境。

比如，父进程指定了`--harmony`，如果子进程没有指定，那么就要跪了。

parent.js

```javascript
var child_process = require('child_process');

console.log('parent execArgv: ' + process.execArgv);

child_process.fork('./child.js', {
    execArgv: process.execArgv
});
```

child.js

```javascript
console.log('child execArgv: ' + process.execArgv);
```

运行结果

```powershell
➜  execArgv git:(master) ✗ node --harmony parent.js
parent execArgv: --harmony
child execArgv: --harmony
```

例子3：execPath（TODO 待举例子）

### child_process.spawn(command[, args][, options])

`command`：要执行的命令

options参数说明：

- `argv0`：[String] 这货比较诡异，在uninx、windows上表现不一样。有需要再深究。
- `stdio`：[Array] | [String] 子进程的stdio。参考[这里(opens new window)](https://nodejs.org/api/child_process.html#child_process_options_stdio)
- `detached`：[Boolean] 让子进程独立于父进程之外运行。同样在不同平台上表现有差异，具体参考[这里(opens new window)](https://nodejs.org/api/child_process.html#child_process_options_detached)
- `shell`：[Boolean] | [String] 如果是`true`，在shell里运行程序。默认是`false`。（很有用，比如 可以通过 /bin/sh -c xxx 来实现 .exec() 这样的效果）

例子1：基础例子

```javascript
var spawn = require('child_process').spawn;
var ls = spawn('ls', ['-al']);

ls.stdout.on('data', function(data){
    console.log('data from child: ' + data);
});


ls.stderr.on('data', function(data){
    console.log('error from child: ' + data);
});

ls.on('close', function(code){
    console.log('child exists with code: ' + code);
});
```

例子2：声明stdio

```javascript
var spawn = require('child_process').spawn;
var ls = spawn('ls', ['-al'], {
    stdio: 'inherit'
});

ls.on('close', function(code){
    console.log('child exists with code: ' + code);
});
```

例子3：声明使用shell

```javascript
var spawn = require('child_process').spawn;

// 运行 echo "hello nodejs" | wc
var ls = spawn('bash', ['-c', 'echo "hello nodejs" | wc'], {
    stdio: 'inherit',
    shell: true
});

ls.on('close', function(code){
    console.log('child exists with code: ' + code);
});
```

例子4：错误处理，包含两种场景，这两种场景有不同的处理方式。

- 场景1：命令本身不存在，创建子进程报错。
- 场景2：命令存在，但运行过程报错。

```javascript
var spawn = require('child_process').spawn;
var child = spawn('bad_command');

child.on('error', (err) => {
  console.log('Failed to start child process 1.');
});

var child2 = spawn('ls', ['nonexistFile']);

child2.stderr.on('data', function(data){
    console.log('Error msg from process 2: ' + data);
});

child2.on('error', (err) => {
  console.log('Failed to start child process 2.');
});
```

运行结果如下。

```powershell
➜  spawn git:(master) ✗ node error/error.js
Failed to start child process 1.
Error msg from process 2: ls: nonexistFile: No such file or directory
```

例子5：echo "hello nodejs" | grep "nodejs"

```javascript
// echo "hello nodejs" | grep "nodejs"
var child_process = require('child_process');

var echo = child_process.spawn('echo', ['hello nodejs']);
var grep = child_process.spawn('grep', ['nodejs']);

grep.stdout.setEncoding('utf8');

echo.stdout.on('data', function(data){
    grep.stdin.write(data);
});

echo.on('close', function(code){
    if(code!==0){
        console.log('echo exists with code: ' + code);
    }
    grep.stdin.end();
});

grep.stdout.on('data', function(data){
    console.log('grep: ' + data);
});

grep.on('close', function(code){
    if(code!==0){
        console.log('grep exists with code: ' + code);
    }
});
```

运行结果：

```powershell
➜  spawn git:(master) ✗ node pipe/pipe.js
grep: hello nodejs
```

## 关于`options.stdio`



默认值：['pipe', 'pipe', 'pipe']，这意味着：

1. child.stdin、child.stdout 不是`undefined`
2. 可以通过监听 `data` 事件，来获取数据。

### 基础例子

```javascript
var spawn = require('child_process').spawn;
var ls = spawn('ls', ['-al']);

ls.stdout.on('data', function(data){
    console.log('data from child: ' + data);
});

ls.on('close', function(code){
    console.log('child exists with code: ' + code);
});
```

### 通过child.stdin.write()写入

```javascript
var spawn = require('child_process').spawn;
var grep = spawn('grep', ['nodejs']);

setTimeout(function(){
    grep.stdin.write('hello nodejs \n hello javascript');
    grep.stdin.end();
}, 2000);

grep.stdout.on('data', function(data){
    console.log('data from grep: ' + data);
});

grep.on('close', function(code){
    console.log('grep exists with code: ' + code);
});
```

## 异步 vs 同步



大部分时候，子进程的创建是异步的。也就是说，它不会阻塞当前的事件循环，这对于性能的提升很有帮助。

当然，有的时候，同步的方式会更方便（阻塞事件循环），比如通过子进程的方式来执行shell脚本时。

node同样提供同步的版本，比如：

- spawnSync()
- execSync()
- execFileSync()

## 关于`options.detached`



由于木有在windows上做测试，于是先贴原文

> On Windows, setting options.detached to true makes it possible for the child process to continue running after the parent exits. The child will have its own console window. Once enabled for a child process, it cannot be disabled.

在非window是平台上的表现

> On non-Windows platforms, if options.detached is set to true, the child process will be made the leader of a new process group and session. Note that child processes may continue running after the parent exits regardless of whether they are detached or not. See setsid(2) for more information.

### 默认情况：父进程等待子进程结束。

子进程。可以看到，有个定时器一直在跑

```javascript
var times = 0;
setInterval(function(){
    console.log(++times);
}, 1000);
```

运行下面代码，会发现父进程一直hold着不退出。

```text
var child_process = require('child_process');
child_process.spawn('node', ['child.js'], {
    // stdio: 'inherit'
});
```

### 通过child.unref()让父进程退出

调用`child.unref()`，将子进程从父进程的事件循环中剔除。于是父进程可以愉快的退出。这里有几个要点

1. 调用`child.unref()`
2. 设置`detached`为`true`
3. 设置`stdio`为`ignore`（这点容易忘）

```javascript
var child_process = require('child_process');
var child = child_process.spawn('node', ['child.js'], {
    detached: true,
    stdio: 'ignore'  // 备注：如果不置为 ignore，那么 父进程还是不会退出
    // stdio: 'inherit'
});

child.unref();
```

### 将`stdio`重定向到文件

除了直接将stdio设置为`ignore`，还可以将它重定向到本地的文件。

```javascript
var child_process = require('child_process');
var fs = require('fs');

var out = fs.openSync('./out.log', 'a');
var err = fs.openSync('./err.log', 'a');

var child = child_process.spawn('node', ['child.js'], {
    detached: true,
    stdio: ['ignore', out, err]
});

child.unref();
```

## exec()与execFile()之间的区别



首先，exec() 内部调用 execFile() 来实现，而 execFile() 内部调用 spawn() 来实现。

> exec() -> execFile() -> spawn()

其次，execFile() 内部默认将 options.shell 设置为false，exec() 默认不是false。

## Class: ChildProcess



- 通过`child_process.spawn()`等创建，一般不直接用构造函数创建。
- 继承了`EventEmitters`，所以有`.on()`等方法。

### 各种事件

### close

当stdio流关闭时触发。这个事件跟`exit`不同，因为多个进程可以共享同个stdio流。
参数：code（退出码，如果子进程是自己退出的话），signal（结束子进程的信号） 问题：code一定是有的吗？（从对code的注解来看好像不是）比如用`kill`杀死子进程，那么，code是？

### exit

参数：code、signal，如果子进程是自己退出的，那么`code`就是退出码，否则为null；如果子进程是通过信号结束的，那么，`signal`就是结束进程的信号，否则为null。这两者中，一者肯定不为null。 注意事项：`exit`事件触发时，子进程的stdio stream可能还打开着。（场景？）此外，nodejs监听了SIGINT和SIGTERM信号，也就是说，nodejs收到这两个信号时，不会立刻退出，而是先做一些清理的工作，然后重新抛出这两个信号。（目测此时js可以做清理工作了，比如关闭数据库等。TODO 疑问：js里面是否也可以不退出？？？？）

SIGINT：interrupt，程序终止信号，通常在用户按下CTRL+C时发出，用来通知前台进程终止进程。 SIGTERM：terminate，程序结束信号，该信号可以被阻塞和处理，通常用来要求程序自己正常退出。shell命令kill缺省产生这个信号。如果信号终止不了，我们才会尝试SIGKILL（强制终止）。

> Also, note that Node.js establishes signal handlers for SIGINT and SIGTERM and Node.js processes will not terminate immediately due to receipt of those signals. Rather, Node.js will perform a sequence of cleanup actions and then will re-raise the handled signal.

### error

当发生下列事情时，error就会被触发。当error触发时，exit可能触发，也可能不触发。（内心是崩溃的）

- 无法创建子进程。
- 进程无法kill。（TODO 例子）
- 向子进程发送消息失败。（TODO 例子）

### message

当采用`process.send()`来发送消息时触发。 参数：`message`，为json对象，或者primitive value；`sendHandle`，net.Socket对象，或者net.Server对象（TODO 什么时候是什么对象？？？）

**.connected**：当调用`.disconnected()`时，设为false。代表是否能够从子进程接收消息，或者对子进程发送消息。

**.disconnect()**：关闭父进程、子进程之间的IPC通道。当这个方法被调用时，`disconnect`事件就会触发。如果子进程是node实例（通过child_process.fork()创建），那么在子进程内部也可以主动调用`process.disconnect()`来终止IPC通道。参考[process.disconnect (opens new window)](https://nodejs.org/api/process.html#process_process_disconnect)。 疑问：比如fork了个子进程，子进程里启动了http server，那么，父进程调用 `.disconnect()`的影响？（TODO 求验证？？？）

## 非重要的备忘点



### windows平台上的`cmd`、`bat`

> The importance of the distinction between child_process.exec() and child_process.execFile() can vary based on platform. On Unix-type operating systems (Unix, Linux, OSX) child_process.execFile() can be more efficient because it does not spawn a shell. On Windows, however, .bat and .cmd files are not executable on their own without a terminal, and therefore cannot be launched using child_process.execFile(). When running on Windows, .bat and .cmd files can be invoked using child_process.spawn() with the shell option set, with child_process.exec(), or by spawning cmd.exe and passing the .bat or .cmd file as an argument (which is what the shell option and child_process.exec() do).

```javascript
// On Windows Only ...
const spawn = require('child_process').spawn;
const bat = spawn('cmd.exe', ['/c', 'my.bat']);

bat.stdout.on('data', (data) => {
  console.log(data);
});

bat.stderr.on('data', (data) => {
  console.log(data);
});

bat.on('exit', (code) => {
  console.log(`Child exited with code ${code}`);
});

// OR...
const exec = require('child_process').exec;
exec('my.bat', (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stdout);
});
```

### 进程标题

Note: Certain platforms (OS X, Linux) will use the value of argv[0] for the process title while others (Windows, SunOS) will use command.

Note: Node.js currently overwrites argv[0] with process.execPath on startup, so process.argv[0] in a Node.js child process will not match the argv0 parameter passed to spawn from the parent, retrieve it with the process.argv0 property instead.

### 代码运行次序的问题

**p.js**

```javascript
const cp = require('child_process');
const n = cp.fork(`${__dirname}/sub.js`);

console.log('1');

n.on('message', (m) => {
  console.log('PARENT got message:', m);
});

console.log('2');

n.send({ hello: 'world' });

console.log('3');
```

**sub.js**

```javascript
console.log('4');
process.on('message', (m) => {
  console.log('CHILD got message:', m);
});

process.send({ foo: 'bar' });
console.log('5');
```

运行`node p.js`，打印出来的内容如下

```powershell
➜  ch node p.js       
1
2
3
4
5
PARENT got message: { foo: 'bar' }
CHILD got message: { hello: 'world' }
```

再来个例子

```javascript
// p2.js
var fork = require('child_process').fork;

console.log('p: 1');

fork('./c2.js');

console.log('p: 2');

// 从测试结果来看，同样是70ms，有的时候，定时器回调比子进程先执行，有的时候比子进程慢执行。
const t = 70;
setTimeout(function(){
    console.log('p: 3 in %s', t);
}, t);


// c2.js
console.log('c: 1');
```

### 关于NODE_CHANNEL_FD

child_process.fork()时，如果指定了execPath，那么父、子进程间通过NODE_CHANNEL_FD 进行通信。

> Node.js processes launched with a custom execPath will communicate with the parent process using the file descriptor (fd) identified using the environment variable NODE_CHANNEL_FD on the child process. The input and output on this fd is expected to be line delimited JSON objects.

## 相关链接



官方文档：https://nodejs.org/api/child_process.html



# 8.1 二进制数据buffer

## 模块概览



Buffer是node的核心模块，开发者可以利用它来处理二进制数据，比如文件流的读写、网络请求数据的处理等。

Buffer的API非常多，本文仅挑选 比较常用/容易理解 的API进行讲解，包括Buffer实例的创建、比较、连接、拷贝、查找、遍历、类型转换、截取、编码转换等。

## 创建



- new Buffer(array)
- Buffer.alloc(length)
- Buffer.allocUnsafe(length)
- Buffer.from(array)

### 通过 new Buffer(array)

```js
// Creates a new Buffer containing the ASCII bytes of the string 'buffer'
const buf = new Buffer([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
```

验证下：

```js
var array = 'buffer'.split('').map(function(v){
    return '0x' + v.charCodeAt(0).toString(16)
});

console.log( array.join() );
// 输出：0x62,0x75,0x66,0x66,0x65,0x72
```

### 通过 Buffer.alloc(length)

```js
var buf1 = Buffer.alloc(10);  // 长度为10的buffer，初始值为0x0
var buf2 = Buffer.alloc(10, 1);  // 长度为10的buffer，初始值为0x1
var buf3 = Buffer.allocUnsafe(10);  // 长度为10的buffer，初始值不确定
var buf4 = Buffer.from([1, 2, 3])  // 长度为3的buffer，初始值为 0x01, 0x02, 0x03
```

### 通过Buffer.from()

例子一：Buffer.from(array)

```js
// [0x62, 0x75, 0x66, 0x66, 0x65, 0x72] 为字符串 "buffer" 
// 0x62 为16进制，转成十进制就是 98，代表的就是字母 b
var buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
console.log(buf.toString());
```

例子二：Buffer.from(string[, encoding])

通过string创建buffer，跟将buffer转成字符串时，记得编码保持一致，不然会出现乱码，如下所示。

```js
var buf = Buffer.from('this is a tést');  // 默认采用utf8

// 输出：this is a tést
console.log(buf.toString());  // 默认编码是utf8，所以正常打印

// 输出：this is a tC)st
console.log(buf.toString('ascii'));  // 转成字符串时，编码不是utf8，所以乱码
```

对乱码的分析如下：

```js
var letter = 'é';
var buff = Buffer.from(letter);  // 默认编码是utf8，这里占据两个字节 <Buffer c3 a9>
var len = buff.length;  // 2
var code = buff[0]; // 第一个字节为0xc3，即195：超出ascii的最大支持范围
var binary = code.toString(2);  // 195的二进制：10101001
var finalBinary = binary.slice(1);  // 将高位的1舍弃，变成：0101001
var finalCode = parseInt(finalBinary, 2);  // 0101001 对应的十进制：67
var finalLetter = String.fromCharCode(finalCode);  // 67对应的字符：C

// 同理 0xa9最终转成的ascii字符为)
// 所以，最终输出为 this is a tC)st
```

例子三：Buffer.from(buffer)

创建新的Buffer实例，并将buffer的数据拷贝到新的实例子中去。

```js
var buff = Buffer.from('buffer');
var buff2 = Buffer.from(buff);

console.log(buff.toString());  // 输出：buffer
console.log(buff2.toString());  // 输出：buffer

buff2[0] = 0x61;

console.log(buff.toString());  // 输出：buffer
console.log(buff2.toString());  // 输出：auffer
```

## buffer比较



### buf.equals(otherBuffer)

判断两个buffer实例存储的数据是否相同，如果是，返回true，否则返回false。

```js
// 例子一：编码一样，内容相同
var buf1 = Buffer.from('A');
var buf2 = Buffer.from('A');

console.log( buf1.equals(buf2) );  // true

// 例子二：编码一样，内容不同
var buf3 = Buffer.from('A');
var buf4 = Buffer.from('B');

console.log( buf3.equals(buf4) );  // false

// 例子三：编码不一样，内容相同
var buf5 = Buffer.from('ABC');  // <Buffer 41 42 43>
var buf6 = Buffer.from('414243', 'hex');

console.log(buf5.equals(buf6));    //true

//只要比较的两者内容相同,`buf.equals(otherBuffer)` 就返回true
```

### buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])

同样是对两个buffer实例进行比较，不同的是：

1. 可以指定特定比较的范围（通过start、end指定）
2. 返回值为整数，达标buf、target的大小关系

假设返回值为

- `0`：buf、target大小相同。
- `1`：buf大于target，也就是说buf应该排在target之后。
- `-1`：buf小于target，也就是说buf应该排在target之前。

看例子，官方的例子挺好的，直接贴一下：

```js
const buf1 = Buffer.from('ABC');
const buf2 = Buffer.from('BCD');
const buf3 = Buffer.from('ABCD');

// Prints: 0
console.log(buf1.compare(buf1));

// Prints: -1
console.log(buf1.compare(buf2));

// Prints: -1
console.log(buf1.compare(buf3));

// Prints: 1
console.log(buf2.compare(buf1));

// Prints: 1
console.log(buf2.compare(buf3));

// Prints: [ <Buffer 41 42 43>, <Buffer 41 42 43 44>, <Buffer 42 43 44> ]
// (This result is equal to: [buf1, buf3, buf2])
console.log([buf1, buf2, buf3].sort(Buffer.compare));
```

### Buffer.compare(buf1, buf2)

跟 `buf.compare(target)` 大同小异，一般用于排序。直接贴官方例子：

```js
const buf1 = Buffer.from('1234');
const buf2 = Buffer.from('0123');
const arr = [buf1, buf2];

// Prints: [ <Buffer 30 31 32 33>, <Buffer 31 32 33 34> ]
// (This result is equal to: [buf2, buf1])
console.log(arr.sort(Buffer.compare));
```

## 从Buffer.from([62])谈起



这里稍微研究下Buffer.from(array)。下面是官方文档对API的说明，也就是说，每个array的元素对应1个字节（8位），取值从0到255。

> Allocates a new Buffer using an array of octets.

### 数组元素为数字

首先看下，传入的元素为数字的场景。下面分别是10进制、8进制、16进制，跟预期中的结果一致。

```js
var buff = Buffer.from([62])
// <Buffer 3e>
// buff[0] === parseInt('3e', 16) === 62
var buff = Buffer.from([062])
// <Buffer 32>
// buff[0] === parseInt(62, 8) === parseInt(32, 16) === 50
var buff = Buffer.from([0x62])
// <Buffer 62>
// buff[0] === parseInt(62, 16) === 98
```

### 数组元素为字符串

再看下，传入的元素为字符串的场景。

1. `0`开头的字符串，在parseInt('062')时，可以解释为62，也可以解释为50（八进制），这里看到采用了第一种解释。
2. 字符串的场景，跟parseInt()有没有关系，暂未深入探究，只是这样猜想。TODO（找时间研究下）

```js
var buff = Buffer.from(['62'])
// <Buffer 3e>
// buff[0] === parseInt('3e', 16) === parseInt('62') === 62
var buff = Buffer.from(['062'])
// <Buffer 3e>
// buff[0] === parseInt('3e', 16) === parseInt('062') === 62
var buff = Buffer.from(['0x62'])
// <Buffer 62>
// buff[0] === parseInt('62', 16) === parseInt('0x62') === 98
```

### 数组元素大小超出1个字节

感兴趣的同学自行探究。

```js
var buff = Buffer.from([256])
// <Buffer 00>
```

## Buffer.from('1')



一开始不自觉的会将`Buffer.from('1')[0]`跟`"1"`划等号，其实`"1"`对应的编码是49。

```js
var buff = Buffer.from('1')  // <Buffer 31>
console.log(buff[0] === 1)  // false
```

这样对比就知道了，编码为1的是个控制字符，表示 Start of Heading。

```js
console.log( String.fromCharCode(49) )  // '1'
console.log( String.fromCharCode(1) )  // '\u0001'
```

## buffer连接：Buffer.concat(list[, totalLength])



备注：个人觉得`totalLength`这个参数挺多余的，从官方文档来看，是处于性能提升的角度考虑。不过内部实现也只是遍历list，将length累加得到totalLength，从这点来看，性能优化是几乎可以忽略不计的。

```js
var buff1 = Buffer.alloc(10);
var buff2 = Buffer.alloc(20);

var totalLength = buff1.length + buff2.length;

console.log(totalLength);  // 30

var buff3 = Buffer.concat([buff1, buff2], totalLength);

console.log(buff3.length);  // 30
```

除了上面提到的性能优化，totalLength还有两点需要注意。假设list里面所有buffer的长度累加和为length

- totalLength > length：返回长度为totalLength的Buffer实例，超出长度的部分填充0。
- totalLength < length：返回长度为totalLength的Buffer实例，后面部分舍弃。

```js
var buff4 = Buffer.from([1, 2]);
var buff5 = Buffer.from([3, 4]);

var buff6 = Buffer.concat([buff4, buff5], 5);

console.log(buff6.length);  // 
console.log(buff6);  // <Buffer 01 02 03 04 00>

var buff7 = Buffer.concat([buff4, buff5], 3);

console.log(buff7.length);  // 3
console.log(buff7);  // <Buffer 01 02 03>
```

## 拷贝：buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])



使用比较简单，如果忽略后面三个参数，那就是将buf的数据拷贝到target里去，如下所示：

```js
var buff1 = Buffer.from([1, 2]);
var buff2 = Buffer.alloc(2);

buff1.copy(buff2);

console.log(buff2);  // <Buffer 01 02>
```

另外三个参数比较直观，直接看官方例子

```js
const buf1 = Buffer.allocUnsafe(26);
const buf2 = Buffer.allocUnsafe(26).fill('!');

for (let i = 0 ; i < 26 ; i++) {
  // 97 is the decimal ASCII value for 'a'
  buf1[i] = i + 97;
}

buf1.copy(buf2, 8, 16, 20);

// Prints: !!!!!!!!qrst!!!!!!!!!!!!!
console.log(buf2.toString('ascii', 0, 25));
```

## 查找：buf.indexOf(value[, byteOffset][, encoding])



跟数组的查找差不多，需要注意的是，value可能是String、Buffer、Integer中的任意类型。

- String：如果是字符串，那么encoding就是其对应的编码，默认是utf8。
- Buffer：如果是Buffer实例，那么会将value中的完整数据，跟buf进行对比。
- Integer：如果是数字，那么value会被当做无符号的8位整数，取值范围是0到255。

另外，可以通过`byteOffset`来指定起始查找位置。

直接上代码，官方例子妥妥的，耐心看完它基本就理解得差不多了。

```js
const buf = Buffer.from('this is a buffer');

// Prints: 0
console.log(buf.indexOf('this'));

// Prints: 2
console.log(buf.indexOf('is'));

// Prints: 8
console.log(buf.indexOf(Buffer.from('a buffer')));

// Prints: 8
// (97 is the decimal ASCII value for 'a')
console.log(buf.indexOf(97));

// Prints: -1
console.log(buf.indexOf(Buffer.from('a buffer example')));

// Prints: 8
console.log(buf.indexOf(Buffer.from('a buffer example').slice(0, 8)));


const utf16Buffer = Buffer.from('\u039a\u0391\u03a3\u03a3\u0395', 'ucs2');

// Prints: 4
console.log(utf16Buffer.indexOf('\u03a3', 0, 'ucs2'));

// Prints: 6
console.log(utf16Buffer.indexOf('\u03a3', -4, 'ucs2'));
```

## 写：buf.write(string[, offset[, length]][, encoding])



将sring写入buf实例，同时返回写入的字节数。

参数如下：

- string：写入的字符串。
- offset：从buf的第几位开始写入，默认是0。
- length：写入多少个字节，默认是 buf.length - offset。
- encoding：字符串的编码，默认是utf8。

看个简单例子

```js
var buff = Buffer.alloc(4);
buff.write('a');  // 返回 1
console.log(buff);  // 打印 <Buffer 61 00 00 00>

buff.write('ab');  // 返回 2
console.log(buff);  // 打印 <Buffer 61 62 00 00>
```

## 填充：buf.fill(value[, offset[, end]][, encoding])



用`value`填充buf，常用于初始化buf。参数说明如下：

- value：用来填充的内容，可以是Buffer、String或Integer。
- offset：从第几位开始填充，默认是0。
- end：停止填充的位置，默认是 buf.length。
- encoding：如果`value`是String，那么为`value`的编码，默认是utf8。

例子：

```js
var buff = Buffer.alloc(20).fill('a');

console.log(buff.toString());  // aaaaaaaaaaaaaaaaaaaa
```

## 转成字符串: buf.toString([encoding[, start[, end]]])



把buf解码成字符串，用法比较直观，看例子

```js
var buff = Buffer.from('hello');

console.log( buff.toString() );  // hello

console.log( buff.toString('utf8', 0, 2) );  // he
```

## 转成JSON字符串：buf.toJSON()



```js
var buff = Buffer.from('hello');

console.log( buff.toJSON() );  // { type: 'Buffer', data: [ 104, 101, 108, 108, 111 ] }
```

## 遍历：buf.values()、buf.keys()、buf.entries()



用于对`buf`进行`for...of`遍历，直接看例子。

```js
var buff = Buffer.from('abcde');

for(const key of buff.keys()){
    console.log('key is %d', key);
}
// key is 0
// key is 1
// key is 2
// key is 3
// key is 4

for(const value of buff.values()){
    console.log('value is %d', value);
}
// value is 97
// value is 98
// value is 99
// value is 100
// value is 101

for(const pair of buff.entries()){
    console.log('buff[%d] === %d', pair[0], pair[1]);
}
// buff[0] === 97
// buff[1] === 98
// buff[2] === 99
// buff[3] === 100
// buff[4] === 101
```

## 截取：buf.slice([start[, end]])



用于截取buf，并返回一个新的Buffer实例。需要注意的是，这里返回的Buffer实例，指向的仍然是buf的内存地址，所以对新Buffer实例的修改，也会影响到buf。

```js
var buff1 = Buffer.from('abcde');
console.log(buff1);  // <Buffer 61 62 63 64 65>

var buff2 = buff1.slice();
console.log(buff2);  // <Buffer 61 62 63 64 65>

var buff3 = buff1.slice(1, 3);
console.log(buff3);  // <Buffer 62 63>

buff3[0] = 97;  // parseInt(61, 16) ==> 97
console.log(buff1);  // <Buffer 62 63>
```

## TODO



1. 创建、拷贝、截取、转换、查找
2. buffer、arraybuffer、dataview、typedarray
3. buffer vs 编码
4. Buffer.from()、Buffer.alloc()、Buffer.alocUnsafe()
5. Buffer vs TypedArray

## 文档摘要



关于buffer内存空间的动态分配

> Instances of the Buffer class are similar to arrays of integers but correspond to fixed-sized, raw memory allocations outside the V8 heap. The size of the Buffer is established when it is created and cannot be resized.

## 相关链接



unicode对照表 https://unicode-table.com/cn/#control-character

字符编码笔记：ASCII，Unicode和UTF-8 http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html



#  二进制解码 string_decoder

## 模块简介



`string_decoder`模块用于将Buffer转成对应的字符串。使用者通过调用`stringDecoder.write(buffer)`，可以获得buffer对应的字符串。

它的特殊之处在于，当传入的buffer不完整（比如三个字节的字符，只传入了两个），内部会维护一个internal buffer将不完整的字节cache住，等到使用者再次调用`stringDecoder.write(buffer)`传入剩余的字节，来拼成完整的字符。

这样可以有效避免buffer不完整带来的错误，对于很多场景，比如网络请求中的包体解析等，非常有用。

## 入门例子



这节分别演示了`decode.write(buffer)`、`decode.end([buffer])`两个主要API的用法。

例子一：

`decoder.write(buffer)`调用传入了Buffer对象`<Buffer e4 bd a0>`，相应的返回了对应的字符串`你`;

```javascript
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');

// Buffer.from('你') => <Buffer e4 bd a0>
const str = decoder.write(Buffer.from([0xe4, 0xbd, 0xa0]));
console.log(str);  // 你
```

例子二：

当`decoder.end([buffer])`被调用时，内部剩余的buffer会被一次性返回。如果此时带上`buffer`参数，那么相当于同时调用`decoder.write(buffer)`和`decoder.end()`。

```javascript
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');

// Buffer.from('你好') => <Buffer e4 bd a0 e5 a5 bd>
let str = decoder.write(Buffer.from([0xe4, 0xbd, 0xa0, 0xe5, 0xa5]));
console.log(str);  // 你

str = decoder.end(Buffer.from([0xbd]));
console.log(str);  // 好
```

## 例子：分多次写入多个字节



下面的例子，演示了分多次写入多个字节时，`string_decoder`模块是怎么处理的。

首先，传入了`<Buffer e4 bd a0 e5 a5>`，`好`还差1个字节，此时，`decoder.write(xx)`返回`你`。

然后，再次调用`decoder.write(Buffer.from([0xbd]))`，将剩余的1个字节传入，成功返回`好`。

```javascript
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');

// Buffer.from('你好') => <Buffer e4 bd a0 e5 a5 bd>
let str = decoder.write(Buffer.from([0xe4, 0xbd, 0xa0, 0xe5, 0xa5]));
console.log(str);  // 你

str = decoder.write(Buffer.from([0xbd]));
console.log(str);  // 好
```

## 例子：decoder.end()时，字节数不完整的处理



`decoder.end(buffer)`时，仅传入了`好`的第1个字节，此时调用`decoder.end()`，返回了`�`，对应的buffer为`<Buffer ef bf bd>`。

```javascript
const StringDecoder = require('string_decoder').StringDecoder;

// Buffer.from('好') => <Buffer e5 a5 bd>
let decoder = new StringDecoder('utf8');
let str = decoder.end( Buffer.from([0xe5]) );
console.log(str);  // �
console.log(Buffer.from(str));  // <Buffer ef bf bd>
```

官方文档对于这种情况的解释是这样的（跟废话差不多），大约是约定俗成了，当`utf8`码点无效时，替换成`ef bf bd`。

> Returns any remaining input stored in the internal buffer as a string. Bytes representing incomplete UTF-8 and UTF-16 characters will be replaced with substitution characters appropriate for the character encoding.

## 相关链接



你应该记住的一个UTF-8字符「EF BF BD」 http://liudanking.com/golang/utf-8_replacement_character/



# 9.1 事件机制 events

## 模块概览



events模块是node的核心模块之一，几乎所有常用的node模块都继承了events模块，比如http、fs等。

模块本身非常简单，API虽然也不少，但常用的就那么几个，这里举几个简单例子。

## 基础例子



下面一共是6个例子，都非常简单，可以直接拷贝出来运行。例子5比较有意思，虽然也并不复杂，但确实是容易记错的点，感兴趣的同学可以看下。

### 例子1：单个事件监听器

```js
var EventEmitter = require('events');

class Man extends EventEmitter {}

var man = new Man();

man.on('wakeup', function(){
    console.log('man has woken up');
});

man.emit('wakeup');
// 输出如下：
// man has woken up
```

### 例子2：同个事件，多个事件监听器

可以看到，事件触发时，事件监听器按照注册的顺序执行。

```js
var EventEmitter = require('events');

class Man extends EventEmitter {}

var man = new Man();

man.on('wakeup', function(){
    console.log('man has woken up');
});

man.on('wakeup', function(){
    console.log('man has woken up again');
});

man.emit('wakeup');

// 输出如下：
// man has woken up
// man has woken up again
```

### 例子3：只运行一次的事件监听器

```js
var EventEmitter = require('events');

class Man extends EventEmitter {}

var man = new Man();

man.on('wakeup', function(){
    console.log('man has woken up');
});

man.once('wakeup', function(){
    console.log('man has woken up again');
});

man.emit('wakeup');
man.emit('wakeup');

// 输出如下：
// man has woken up
// man has woken up again
// man has woken up
```

### 例子4：注册事件监听器前，事件先触发

可以看到，注册事件监听器前，事件先触发，则该事件会直接被忽略。

```js
var EventEmitter = require('events');

class Man extends EventEmitter {}

var man = new Man();

man.emit('wakeup', 1);

man.on('wakeup', function(index){
    console.log('man has woken up ->' + index);
});

man.emit('wakeup', 2);
// 输出如下：
// man has woken up ->2
```

### 例子5：异步执行，还是顺序执行

例子很简单，但非常重要。究竟是代码1先执行，还是代码2先执行，这点差异，无论对于我们理解别人的代码，还是自己编写node程序，都非常关键。

实践证明，代码1先执行了。(node v6.1.0)

```js
var EventEmitter = require('events');

class Man extends EventEmitter {}

var man = new Man();

man.on('wakeup', function(){
    console.log('man has woken up'); // 代码1
});

man.emit('wakeup');

console.log('woman has woken up');  // 代码2

// 输出如下：
// man has woken up
// woman has woken up
```

### 例子6：移除事件监听器

```js
var EventEmitter = require('events');

function wakeup(){
    console.log('man has woken up');
}

class Man extends EventEmitter {}

var man = new Man();

man.on('wakeup', wakeup);
man.emit('wakeup');

man.removeListener('wakeup', wakeup);
man.emit('wakeup');

// 输出如下：
// man has woken up
```

## 相关链接



https://nodejs.org/api/events.html



# 9.2 实用工具模块 util

## debuglog(section)

很有用的调试方法。可以通过 util.debuglog(name) 来创建一个调试fn，这个fn的特点是，只有在运行程序时候，声明环境变量NODE_DEBUG=name，才会打印出调试信息。

可以看下面的例子，直接运行 `node debuglog.js`，没有任何输出。需要`NODE_DEBUG=foo`，才会有打印信息.

```js
var util = require('util');
var logger = util.debuglog('foo');

logger('hello');
```

如下所示，注意，6347 是当前进程id。

```bash
➜  2016.12.02-util git:(master) ✗ NODE_DEBUG=foo node debuglog.js
FOO 6347: hello world
```

此外，还可以一次指定多个`name`，通过逗号分隔。

```js
var util = require('util');
var firstLogger = util.debuglog('first');
var secondLogger = util.debuglog('second');
var thirdLogger = util.debuglog('third');

firstLogger('hello');
secondLogger('hello');
thirdLogger('hello');
```

运行如下：

```bash
FOO 6347: hello world
➜  2016.12.02-util git:(master) ✗ NODE_DEBUG=first,second node debuglog.js
FIRST 6456: hello
SECOND 6456: hello
```

## 将方法标识为作废：util.deprecate(fn, str)

将`fn`包裹一层，并返回一个新的函数`fn2`。调用`fn2`时，同样完成`fn`原有的功能，但同时会打印出错误日志，提示方法已作废，具体的提示信息就是第二个参数`str`。

```js
var util = require('util');
var foo = function(){
    console.log('foo');
};

var foo2 = util.deprecate(foo, 'foo is deprecate');

foo2();

// 输出如下：
// foo
// (node:6608) DeprecationWarning: foo is deprecate
```

如果嫌错误提示信息烦人，可以通过`--no-deprecation`参数禁掉，可以参考[这里 (opens new window)](https://nodejs.org/api/util.html#util_util_deprecate_function_string)。

```bash
➜  2016.12.02-util git:(master) ✗ node --no-deprecation deprecate.js 
foo
```

## 格式化打印：util.format(format[, ...args])

格式化打印大家应该比较熟悉了，基本每种语言里都有自己的实现，直接上例子。

```js
var util = require('util');

console.log( util.format('hello %s', 'world') );
// 输出：hello world

console.log( util.format('1 + 1 = %d', 2) );
// 输出：1 + 1 = 2

console.log( util.format('info: %j', {nick: 'chyingp'}) );
// 输出：info: {"nick":"chyingp"}

console.log( util.format('%s is %d age old', 'chyingp') );
// 输出：chyingp is %d age old

console.log( util.format('%s is a man', 'chyingp', 'indeed') );
// 输出：chyingp is a man indeed
```

## 调试方法：util.inspect(obj[, options])

非常实用的一个方法，参数说明如下：

- obj：js原始值，或者对象。
- options：配置参数，包含下面选项
  - showHidden：如果是true的话，obj的非枚举属性也会被展示出来。默认是false。
  - depth：如果obj是对象，那么，depth限制对象递归展示的层级，这对可读性有一定的好处，默认是2。如果设置为null，则不做限制。
  - colors：自定义配色方案。
  - showProxy：
  - maxArrayLength：如果obj是数组，那么限制最大可展示的数组个数。默认是100，如果设置为null，则不做限制。如果设置为0或负数，则一个都不展示。

```js
var util = require('util');

var obj = {};

Object.defineProperty(obj, 'nick', {
  enumerable: false,  
  value: 'chyingp'
});

console.log( util.inspect(obj) );
// 输出：{}

console.log( util.inspect(obj, {showHidden: true}) );
// 输出：{ [nick]: 'chyingp' }
```



# 9.3 数据加密 crypto

## 写在前面

本章节写得差不多了，不过还需要再整理一下（TODO）。

## hash例子

hash.digest([encoding])：计算摘要。encoding可以是`hex`、`latin1`或者`base64`。如果声明了encoding，那么返回字符串。否则，返回Buffer实例。注意，调用hash.digest()后，hash对象就作废了，再次调用就会出错。

hash.update(data[, input_encoding])：input_encoding可以是`utf8`、`ascii`或者`latin1`。如果data是字符串，且没有指定 input_encoding，则默认是`utf8`。注意，hash.update()方法可以调用多次。

```js
var crypto = require('crypto');
var fs = require('fs');

var content = fs.readFileSync('./test.txt', {encoding: 'utf8'});
var hash = crypto.createHash('sha256');
var output;

hash.update(content);

output = hash.digest('hex'); 

console.log(output);
// 输出内容为：
// b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9
```

也可以这样：

```js
var crypto = require('crypto');
var fs = require('fs');

var input = fs.createReadStream('./test.txt', {encoding: 'utf8'});
var hash = crypto.createHash('sha256');

hash.setEncoding('hex');

input.pipe(hash).pipe(process.stdout)

// 输出内容为：
// b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9
```

hash.digest()后，再次调用digest()或者update()

```js
var crypto = require('crypto');
var fs = require('fs');

var content = fs.readFileSync('./test.txt', {encoding: 'utf8'});
var hash = crypto.createHash('sha256');
var output;

hash.update(content);
hash.digest('hex'); 

// 报错：Error: Digest already called
hash.update(content);

// 报错：Error: Digest already called
hash.digest('hex');
```

## HMAC例子

HMAC的全称是Hash-based Message Authentication Code，也即在hash的加盐运算。

算法细节可以参考附录链接，具体到使用的话，跟hash模块差不多，选定hash算法，指定“盐”即可。

例子1：

```js
var crypto = require('crypto');
var fs = require('fs');

var secret = 'secret';
var hmac = crypto.createHmac('sha256', secret);
var input = fs.readFileSync('./test.txt', {encoding: 'utf8'});

hmac.update(input);

console.log( hmac.digest('hex') );
// 输出：
// 734cc62f32841568f45715aeb9f4d7891324e6d948e4c6c60c0621cdac48623a
```

例子2：

```js
var crypto = require('crypto');
var fs = require('fs');

var secret = 'secret';
var hmac = crypto.createHmac('sha256', secret);
var input = fs.createReadStream('./test.txt', {encoding: 'utf8'});

hmac.setEncoding('hex');

input.pipe(hmac).pipe(process.stdout)
// 输出：
// 734cc62f32841568f45715aeb9f4d7891324e6d948e4c6c60c0621cdac48623a
```

## 加密/解密

加解密主要用到下面两组方法：

加密：

- crypto.createCipher(algorithm, password)
- crypto.createCipheriv(algorithm, key, iv)

解密：

- crypto.createDecipher(algorithm, password)
- crypto.createDecipheriv(algorithm, key, iv)

### crypto.createCipher(algorithm, password)

先来看下 crypto.createCipher(algorithm, password)，两个参数分别是加密算法、密码

- algorithm：加密算法，比如`aes192`，具体有哪些可选的算法，依赖于本地`openssl`的版本，可以通过`openssl list-cipher-algorithms`命令查看支持哪些算法。
- password：用来生成密钥(key)、初始化向量(IV)。

备注：这里nodejs屏蔽了AES的使用/实现细节，关于key、IV，感兴趣的同学可以自行谷歌下。

```js
var crypto = require('crypto');
var secret = 'secret';

var cipher = crypto.createCipher('aes192', secret);
var content = 'hello';
var cryptedContent;

cipher.update(content);
cryptedContent = cipher.final('hex');
console.log(cryptedContent);
// 输出：
// 71d30ec9bc926b5dbbd5150bf9d3e5fb
```

### crypto.createDecipher(algorithm, password)

可以看作 crypto.createCipher(algorithm, password) 逆向操作，直接看例子

```js
var crypto = require('crypto');
var secret = 'secret';

var cipher = crypto.createCipher('aes192', secret);
var content = 'hello';
var cryptedContent;

cipher.update(content);
cryptedContent = cipher.final('hex');
console.log(cryptedContent);
// 输出：
// 71d30ec9bc926b5dbbd5150bf9d3e5fb

var decipher = crypto.createDecipher('aes192', secret);
var decryptedContent;

decipher.update(cryptedContent, 'hex');
decryptedContent = decipher.final('utf8');
console.log(decryptedContent);
// 输出：
// hello
```

### crypto.createCipheriv(algorithm, key, iv)

相对于 crypto.createCipher() 来说，crypto.createCipheriv() 需要提供`key`和`iv`，而 crypto.createCipher() 是根据用户提供的 password 算出来的。

key、iv 可以是Buffer，也可以是utf8编码的字符串，这里需要关注的是它们的长度：

- key：根据选择的算法有关，比如 aes128、aes192、aes256，长度分别是128、192、256位（16、24、32字节）
- iv：都是128位（16字节）

```js
var crypto = require('crypto');
var key = crypto.randomBytes(192/8);
var iv = crypto.randomBytes(128/8);
var algorithm = 'aes192';

function encrypt(text){
    var cipher = crypto.createCipheriv(algorithm, key, iv);
    cipher.update(text);
    return cipher.final('hex');
}

function decrypt(encrypted){
    var decipher = crypto.createDecipheriv(algorithm, key, iv);
    decipher.update(encrypted, 'hex');
    return decipher.final('utf8');
}

var content = 'hello';
var crypted = encrypt('hello');
console.log( crypted );

var decrypted = decrypt( crypted );
console.log( decrypted );  // 输出：utf8
```

## 数字签名/签名校验

假设：

1、服务端原始信息为M，摘要算法为Hash，Hash(M)得出的摘要是H。 2、公钥为Pub，私钥为Piv，非对称加密算法为Encrypt，非对称解密算法为Decrypt。 3、Encrypt(H)得到的结果是S。 4、客户端拿到的信息为M1，利用Hash(M1)得出的结果是H1。

数字签名的产生、校验步骤分别如下：

1、数字签名的产生步骤：利用摘要算法Hash算出M的摘要，即Hash(M) == H，利用非对称加密算法对摘要进行加密Encrypt( H, Piv )，得到数字签名S。 2、数字签名的校验步骤：利用解密算法D对数字签名进行解密，即Decrypt(S) == H，计算M1的摘要 Hash(M1) == H1，对比 H、H1，如果两者相同，则通过校验。

私钥如何生成不是这里的重点，这里采用网上的服务来生成，点击[这里](在线生成非对称加密公钥私钥对、在线生成公私钥对、RSA Key pair create、生成RSA密钥对)。

了解了数字签名产生、校验的原理后，相信下面的代码很容易理解：

```js
var crypto = require('crypto');
var fs = require('fs');
var privateKey = fs.readFileSync('./private-key.pem');  // 私钥
var publicKey = fs.readFileSync('./public-key.pem');  // 公钥
var algorithm = 'RSA-SHA256';  // 加密算法 vs 摘要算法

// 数字签名
function sign(text){
    var sign = crypto.createSign(algorithm);
    sign.update(text);
    return sign.sign(privateKey, 'hex');    
}

// 校验签名
function verify(oriContent, signature){
    var verifier = crypto.createVerify(algorithm);
    verifier.update(oriContent);
    return verifier.verify(publicKey, signature, 'hex');
}

// 对内容进行签名
var content = 'hello world';
var signature = sign(content);
console.log(signature);

// 校验签名，如果通过，返回true
var verified = verify(content, signature);
console.log(verified);
```

## DiffieHellman

DiffieHellman：Diffie–Hellman key exchange，缩写为D-H，是一种安全协议，让通信双方在预先没有对方信息的情况下，通过不安全通信信道，创建一个密钥。这个密钥可以在后续的通信中，作为对称加密的密钥加密传递的信息。

代码如下，原理待补充 TODO

```js
const crypto = require('crypto');
const assert = require('assert');

// Generate Alice's keys...
const alice = crypto.createDiffieHellman(2048);
const alice_key = alice.generateKeys();

// Generate Bob's keys...
const bob = crypto.createDiffieHellman(alice.getPrime(), alice.getGenerator());
const bob_key = bob.generateKeys();

// Exchange and generate the secret...
const alice_secret = alice.computeSecret(bob_key);
const bob_secret = bob.computeSecret(alice_key);

// OK
assert.equal(alice_secret.toString('hex'), bob_secret.toString('hex'));
```

## ECDH：Elliptic Curve Diffie-Hellman

代码如下，原理待补充 TODO

```js
const crypto = require('crypto');
const assert = require('assert');

// Generate Alice's keys...
const alice = crypto.createECDH('secp521r1');
const alice_key = alice.generateKeys();

// Generate Bob's keys...
const bob = crypto.createECDH('secp521r1');
const bob_key = bob.generateKeys();

// Exchange and generate the secret...
const alice_secret = alice.computeSecret(bob_key);
const bob_secret = bob.computeSecret(alice_key);

assert(alice_secret, bob_secret);
  // OK
```

## 证书

SPKAC：

> SPKAC is an acronym that stands for Signed Public Key and Challenge, also known as Netscape SPKI.

SPKI：Simple public-key infrastructure

## 关键点

md5：固定长度（128bit）、不可逆（重要）、不同数据的散列值可能相同（重要）、高度离散型（原文细微的变化，会导致散列值差异巨大）

sha1：固定长度160bit，广泛使用（如TLS，目前安全性受到密码学家的质疑）

SHA-256/SHA-384/SHA-512：后面表示摘要的长度。

用途：数字签名、文件完整性校验

关系：sha1 基于 MD5，MD5 基于 MD4

md5(1991) -> SHA1

sha家族：由美国国家安全局（NSA）所设计，并由美国国家标准与技术研究院（NIST）发布；是美国的政府标准。

## 相关术语

SPKAC：Signed Public Key and Challenge

MD5：Message-Digest Algorithm 5，信息-摘要算法。

SHA：Secure Hash Algorithm，安全散列算法。

HMAC：Hash-based Message Authentication Code，密钥相关的哈希运算消息认证码。

SPKAC：

对称加密：比如AES、DES

非对称加密：比如RSA、DSA

AES：Advanced Encryption Standard（高级加密标准），密钥长度可以是128、192和256位。

DES：Data Encryption Standard，数据加密标准，对称密钥加密算法（现在认为不安全）。https://en.wikipedia.org/wiki/Data_Encryption_Standard

DiffieHellman：Diffie–Hellman key exchange，缩写为D-H，是一种安全协议，让通信双方在预先没有对方信息的情况下，通过不安全通信信道，创建一个密钥。这个密钥可以在后续的通信中，作为对称加密的密钥加密传递的信息。（备注，使是用协议的发明者命名）

## 相关链接

字符编码笔记：ASCII，Unicode和UTF-8 - 阮一峰的网络日志 http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html

Unicode与JavaScript详解 http://www.ruanyifeng.com/blog/2014/12/unicode.html

Base64笔记 http://www.ruanyifeng.com/blog/2008/06/base64.html

MIME笔记 http://www.ruanyifeng.com/blog/2008/06/mime.html

SHA家族 https://zh.wikipedia.org/wiki/SHA%E5%AE%B6%E6%97%8F

加盐密码哈希：如何正确使用 http://blog.jobbole.com/61872/

HMAC-MD5算法原理及实现 http://www.jianshu.com/p/067f9eb6b252

Encrypting using AES-256, can I use 256 bits IV? http://security.stackexchange.com/questions/90848/encrypting-using-aes-256-can-i-use-256-bits-iv

分组对称加密模式:ECB/CBC/CFB/OFB http://blog.csdn.net/aaaaatiger/article/details/2525561

在线生成非对称加密公钥私钥对、在线生成公私钥对、RSA Key pair create、生成RSA密钥对 http://web.chacuo.net/netrsakeypair

Diffie–Hellman key exchange https://zh.wikipedia.org/wiki/%E8%BF%AA%E8%8F%B2-%E8%B5%AB%E7%88%BE%E6%9B%BC%E5%AF%86%E9%91%B0%E4%BA%A4%E6%8F%9B

理解 Deffie-Hellman 密钥交换算法 http://wsfdl.com/algorithm/2016/02/04/%E7%90%86%E8%A7%A3Diffie-Hellman%E5%AF%86%E9%92%A5%E4%BA%A4%E6%8D%A2%E7%AE%97%E6%B3%95.html

What is the difference between DHE and ECDH? http://stackoverflow.com/questions/2701294/how-does-the-elliptic-curve-version-of-diffie-hellman-cryptography-work?rq=1

Example application for working with SPKAC (signed public key & challege) data coming from the element. https://github.com/jas-/node-spkac

Using Padding in Encryption http://www.di-mgt.com.au/cryptopad.html#randompadding

对称加密和分组加密中的四种模式(ECB、CBC、CFB、OFB) http://www.cnblogs.com/happyhippy/archive/2006/12/23/601353.html

分组密码工作模式 https://zh.wikipedia.org/wiki/%E5%88%86%E7%BB%84%E5%AF%86%E7%A0%81%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F#.E5.AF.86.E7.A0.81.E5.9D.97.E9.93.BE.E6.8E.A5.EF.BC.88CBC.EF.BC.89

为什么说密文链接模式已经丧失安全性？ https://www.zhihu.com/question/26437065

Elliptic Curve Cryptography: a gentle introduction http://andrea.corbellini.name/2015/05/17/elliptic-curve-cryptography-a-gentle-introduction/

Elliptic Curve Cryptography: ECDH and ECDSA http://andrea.corbellini.name/2015/05/30/elliptic-curve-cryptography-ecdh-and-ecdsa/

为什么RSA公钥每次加密得到的结果都不一样？ http://blog.csdn.net/guyongqiangx/article/details/74930951



# 9.4 MD5入门介绍及crypto模块的应用

## 简介

MD5（Message-Digest Algorithm）是计算机安全领域广泛使用的散列函数（又称哈希算法、摘要算法），主要用来确保消息的完整和一致性。常见的应用场景有密码保护、下载文件校验等。

本文先对MD5的特点与应用进行简要概述，接着重点介绍MD5在密码保护场景下的应用，最后通过例子对MD5碰撞进行简单介绍。

## 特点

1. 运算速度快：对`jquery.js`求md5值，57254个字符，耗时1.907ms
2. 输出长度固定：输入长度不固定，输出长度固定（128位）。
3. 运算不可逆：已知运算结果的情况下，无法通过通过逆运算得到原始字符串。
4. 高度离散：输入的微小变化，可导致运算结果差异巨大。
5. 弱碰撞性：不同输入的散列值可能相同。

## 应用场景

1. 文件完整性校验：比如从网上下载一个软件，一般网站都会将软件的md5值附在网页上，用户下载完软件后，可对下载到本地的软件进行md5运算，然后跟网站上的md5值进行对比，确保下载的软件是完整的（或正确的）
2. 密码保护：将md5后的密码保存到数据库，而不是保存明文密码，避免拖库等事件发生后，明文密码外泄。
3. 防篡改：比如数字证书的防篡改，就用到了摘要算法。（当然还要结合数字签名等手段）

## nodejs中md5运算的例子

在nodejs中，`crypto`模块封装了一系列密码学相关的功能，包括摘要运算。基础例子如下，非常简单：

```js
var crypto = require('crypto');
var md5 = crypto.createHash('md5');

var result = md5.update('a').digest('hex');

// 输出：0cc175b9c0f1b6a831c399e269772661
console.log(result);
```

## 例子：密码保护

前面提到，将明文密码保存到数据库是很不安全的，最不济也要进行md5后进行保存。比如用户密码是`123456`，md5运行后，得到`输出：e10adc3949ba59abbe56e057f20f883e`。

这样至少有两个好处：

1. 防内部攻击：网站主人也不知道用户的明文密码，避免网站主人拿着用户明文密码干坏事。
2. 防外部攻击：如网站被黑客入侵，黑客也只能拿到md5后的密码，而不是用户的明文密码。

示例代码如下：

```javascript
var crypto = require('crypto');

function cryptPwd(password) {
    var md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
}

var password = '123456';
var cryptedPassword = cryptPwd(password);

console.log(cryptedPassword);
// 输出：e10adc3949ba59abbe56e057f20f883e
```

### 单纯对密码进行md5不安全

前面提到，通过对用户密码进行md5运算来提高安全性。但实际上，这样的安全性是很差的，为什么呢？

稍微修改下上面的例子，可能你就明白了。相同的明文密码，md5值也是相同的。

```javascript
var crypto = require('crypto');

function cryptPwd(password) {
    var md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
}

var password = '123456';

console.log( cryptPwd(password) );
// 输出：e10adc3949ba59abbe56e057f20f883e

console.log( cryptPwd(password) );
// 输出：e10adc3949ba59abbe56e057f20f883e
```

也就是说，当攻击者知道算法是md5，且数据库里存储的密码值为`e10adc3949ba59abbe56e057f20f883e`时，理论上可以可以猜到，用户的明文密码就是`123456`。

事实上，彩虹表就是这么进行暴力破解的：事先将常见明文密码的md5值运算好存起来，然后跟网站数据库里存储的密码进行匹配，就能够快速找到用户的明文密码。（这里不探究具体细节）

那么，有什么办法可以进一步提升安全性呢？答案是：密码加盐。

## 密码加盐

“加盐”这个词看上去很玄乎，其实原理很简单，就是在密码特定位置插入特定字符串后，再对修改后的字符串进行md5运算。

例子如下。同样的密码，当“盐”值不一样时，md5值的差异非常大。通过密码加盐，可以防止最初级的暴力破解，如果攻击者事先不知道”盐“值，破解的难度就会非常大。

```javascript
var crypto = require('crypto');

function cryptPwd(password, salt) {
    // 密码“加盐”
    var saltPassword = password + ':' + salt;
    console.log('原始密码：%s', password);
    console.log('加盐后的密码：%s', saltPassword);

    // 加盐密码的md5值
    var md5 = crypto.createHash('md5');
    var result = md5.update(saltPassword).digest('hex');
    console.log('加盐密码的md5值：%s', result);
}

cryptPwd('123456', 'abc');
// 输出：
// 原始密码：123456
// 加盐后的密码：123456:abc
// 加盐密码的md5值：51011af1892f59e74baf61f3d4389092

cryptPwd('123456', 'bcd');
// 输出：
// 原始密码：123456
// 加盐后的密码：123456:bcd
// 加盐密码的md5值：55a95bcb6bfbaef6906dbbd264ab4531
```

## 密码加盐：随机盐值

通过密码加盐，密码的安全性已经提高了不少。但其实上面的例子存在不少问题。

假设字符串拼接算法、盐值已外泄，上面的代码至少存在下面问题：

1. 短盐值：需要穷举的可能性较少，容易暴力破解，一般采用长盐值来解决。
2. 盐值固定：类似的，攻击者只需要把常用密码+盐值的hash值表算出来，就完事大吉了。

短盐值自不必说，应该避免。对于为什么不应该使用固定盐值，这里需要多解释一下。很多时候，我们的盐值是硬编码到我们的代码里的（比如配置文件），一旦坏人通过某种手段获知了盐值，那么，只需要针对这串固定的盐值进行暴力穷举就行了。

比如上面的代码，当你知道盐值是`abc`时，立刻就能猜到`51011af1892f59e74baf61f3d4389092`对应的明文密码是`123456`。

那么，该怎么优化呢？答案是：随机盐值。

示例代码如下。可以看到，密码同样是123456，由于采用了随机盐值，前后运算得出的结果是不同的。这样带来的好处是，多个用户，同样的密码，攻击者需要进行多次运算才能够完全破解。同样是纯数字3位短盐值，随机盐值破解所需的运算量，是固定盐值的1000倍。

```javascript
var crypto = require('crypto');

function getRandomSalt(){
    return Math.random().toString().slice(2, 5);
}

function cryptPwd(password, salt) {
    // 密码“加盐”
    var saltPassword = password + ':' + salt;
    console.log('原始密码：%s', password);
    console.log('加盐后的密码：%s', saltPassword);

    // 加盐密码的md5值
    var md5 = crypto.createHash('md5');
    var result = md5.update(saltPassword).digest('hex');
    console.log('加盐密码的md5值：%s', result);
}

var password = '123456';

cryptPwd('123456', getRandomSalt());
// 输出：
// 原始密码：123456
// 加盐后的密码：123456:498
// 加盐密码的md5值：af3b7d32cc2a254a6bf1ebdcfd700115

cryptPwd('123456', getRandomSalt());
// 输出：
// 原始密码：123456
// 加盐后的密码：123456:287
// 加盐密码的md5值：65d7dd044c2db64c5e658d947578d759
```

## MD5碰撞

简单的说，就是两段不同的字符串，经过MD5运算后，得出相同的结果。

网上有不少例子，这里就不赘述，直接上例子，参考(这里)[http://www.mscs.dal.ca/~selinger/md5collision/]

```javascript
function getHashResult(hexString){

    // 转成16进制，比如 0x4d 0xc9 ...
    hexString = hexString.replace(/(\w{2,2})/g, '0x$1 ').trim();

    // 转成16进制数组，如 [0x4d, 0xc9, ...]
    var arr = hexString.split(' ');

    // 转成对应的buffer，如：<Buffer 4d c9 ...>
    var buff = Buffer.from(arr);

    var crypto = require('crypto');
    var hash = crypto.createHash('md5');

    // 计算md5值
    var result = hash.update(buff).digest('hex');

    return result;  
}

var str1 = 'd131dd02c5e6eec4693d9a0698aff95c2fcab58712467eab4004583eb8fb7f8955ad340609f4b30283e488832571415a085125e8f7cdc99fd91dbdf280373c5bd8823e3156348f5bae6dacd436c919c6dd53e2b487da03fd02396306d248cda0e99f33420f577ee8ce54b67080a80d1ec69821bcb6a8839396f9652b6ff72a70';
var str2 = 'd131dd02c5e6eec4693d9a0698aff95c2fcab50712467eab4004583eb8fb7f8955ad340609f4b30283e4888325f1415a085125e8f7cdc99fd91dbd7280373c5bd8823e3156348f5bae6dacd436c919c6dd53e23487da03fd02396306d248cda0e99f33420f577ee8ce54b67080280d1ec69821bcb6a8839396f965ab6ff72a70';

var result1 = getHashResult(str1);
var result2 = getHashResult(str2);

if(result1 === result2) {
    console.log(`Got the same md5 result: ${result1}`);
}else{
    console.log(`Not the same md5 result`);
}
```

## 相关链接

MD5碰撞的一些例子 http://www.jianshu.com/p/c9089fd5b1ba

MD5 Collision Demo http://www.mscs.dal.ca/~selinger/md5collision/

Free Password Hash Cracker https://crackstation.net/



# 9.5 资源压缩 zlib

## 概览

做过web性能优化的同学，对性能优化大杀器**gzip**应该不陌生。浏览器向服务器发起资源请求，比如下载一个js文件，服务器先对资源进行压缩，再返回给浏览器，以此节省流量，加快访问速度。

浏览器通过HTTP请求头部里加上**Accept-Encoding**，告诉服务器，“你可以用gzip，或者defalte算法压缩资源”。

> Accept-Encoding:gzip, deflate

那么，在nodejs里，是如何对资源进行压缩的呢？答案就是**Zlib**模块。

## 入门实例：简单的压缩/解压缩

### 压缩的例子

非常简单的几行代码，就完成了本地文件的gzip压缩。

```javascript
var fs = require('fs');
var zlib = require('zlib');

var gzip = zlib.createGzip();

var inFile = fs.createReadStream('./extra/fileForCompress.txt');
var out = fs.createWriteStream('./extra/fileForCompress.txt.gz');

inFile.pipe(gzip).pipe(out);
```

### 解压的例子

同样非常简单，就是个反向操作。

```javascript
var fs = require('fs');
var zlib = require('zlib');

var gunzip = zlib.createGunzip();

var inFile = fs.createReadStream('./extra/fileForCompress.txt.gz');
var outFile = fs.createWriteStream('./extra/fileForCompress1.txt');

inFile.pipe(gunzip).pipe(outFile);
```

## 服务端gzip压缩

代码超级简单。首先判断 是否包含 **accept-encoding** 首部，且值为**gzip**。

- 否：返回未压缩的文件。
- 是：返回gzip压缩后的文件。

```javascript
var http = require('http');
var zlib = require('zlib');
var fs = require('fs');
var filepath = './extra/fileForGzip.html';

var server = http.createServer(function(req, res){
    var acceptEncoding = req.headers['accept-encoding'];
    var gzip;
    
    if(acceptEncoding.indexOf('gzip')!=-1){ // 判断是否需要gzip压缩
        
        gzip = zlib.createGzip();
        
        // 记得响应 Content-Encoding，告诉浏览器：文件被 gzip 压缩过
        res.writeHead(200, {
            'Content-Encoding': 'gzip'
        });
        fs.createReadStream(filepath).pipe(gzip).pipe(res);
    
    }else{

        fs.createReadStream(filepath).pipe(res);
    }

});

server.listen('3000');
```

## 服务端字符串gzip压缩

代码跟前面例子大同小异。这里采用了 **zlib.gzipSync(str)** 对字符串进行gzip压缩。

```javascript
var http = require('http');
var zlib = require('zlib');

var responseText = 'hello world';

var server = http.createServer(function(req, res){
    var acceptEncoding = req.headers['accept-encoding'];
    if(acceptEncoding.indexOf('gzip')!=-1){
        res.writeHead(200, {
            'content-encoding': 'gzip'
        });
        res.end( zlib.gzipSync(responseText) );
    }else{
        res.end(responseText);
    }

});

server.listen('3000');
```

## 写在后面

deflate压缩的使用也差不多，这里就不赘述。更多详细用法可参考[官方文档 (opens new window)](https://nodejs.org/api/zlib.html#zlib_class_options)。



# 9.6 集群 cluster

## cluster模块概览

node实例是单线程作业的。在服务端编程中，通常会创建多个node实例来处理客户端的请求，以此提升系统的吞吐率。对这样多个node实例，我们称之为cluster（集群）。

借助node的cluster模块，开发者可以在几乎不修改原有项目代码的前提下，获得集群服务带来的好处。

集群有以下两种常见的实现方案，而node自带的cluster模块，采用了方案二。

### 方案一：多个node实例+多个端口

集群内的node实例，各自监听不同的端口，再由反向代理实现请求到多个端口的分发。

- 优点：实现简单，各实例相对独立，这对服务稳定性有好处。
- 缺点：增加端口占用，进程之间通信比较麻烦。

### 方案二：主进程向子进程转发请求

集群内，创建一个主进程(master)，以及若干个子进程(worker)。由master监听客户端连接请求，并根据特定的策略，转发给worker。

- 优点：通常只占用一个端口，通信相对简单，转发策略更灵活。
- 缺点：实现相对复杂，对主进程的稳定性要求较高。

## 入门实例

在cluster模块中，主进程称为master，子进程称为worker。

例子如下，创建与CPU数目相同的服务端实例，来处理客户端请求。注意，它们监听的都是同样的端口。

```js
// server.js
var cluster = require('cluster');
var cpuNums = require('os').cpus().length;
var http = require('http');

if(cluster.isMaster){
  for(var i = 0; i < cpuNums; i++){
    cluster.fork();
  }
}else{
  http.createServer(function(req, res){
    res.end(`response from worker ${process.pid}`);
  }).listen(3000);

  console.log(`Worker ${process.pid} started`);
}
```

创建批处理脚本：./req.sh。

```bash
#!/bin/bash

# req.sh
for((i=1;i<=4;i++)); do   
  curl http://127.0.0.1:3000
  echo ""
done 
```

输出如下。可以看到，响应来自不同的进程。

```bash
response from worker 23735
response from worker 23731
response from worker 23729
response from worker 23730
```

## cluster模块实现原理

了解cluster模块，主要搞清楚3个问题：

1. master、worker如何通信？
2. 多个server实例，如何实现端口共享？
3. 多个server实例，来自客户端的请求如何分发到多个worker？

下面会结合示意图进行介绍，源码级别的介绍，可以参考 [笔者的github (opens new window)](https://github.com/chyingp/nodejs-learning-guide)。

## 问题1：master、worker如何通信

这个问题比较简单。master进程通过 cluster.fork() 来创建 worker进程。cluster.fork() 内部 是通过 child_process.fork() 来创建子进程。

也就是说：

1. master进程、worker进程是父、子进程的关系。
2. master进程、woker进程可以通过IPC通道进行通信。（重要）

## 问题2：如何实现端口共享

在前面的例子中，多个woker中创建的server监听了同个端口3000。通常来说，多个进程监听同个端口，系统会报错。

为什么我们的例子没问题呢？

秘密在于，net模块中，对 listen() 方法进行了特殊处理。根据当前进程是master进程，还是worker进程：

1. master进程：在该端口上正常监听请求。（没做特殊处理）
2. worker进程：创建server实例。然后通过IPC通道，向master进程发送消息，让master进程也创建 server 实例，并在该端口上监听请求。当请求进来时，master进程将请求转发给worker进程的server实例。

归纳起来，就是：master进程监听特定端口，并将客户请求转发给worker进程。

如下图所示：

![img](https://www.chyingp.com/wp-content/uploads/2018/04/4c1692183865cb201df83f8ee357d070.png)

### 问题3：如何将请求分发到多个worker

每当worker进程创建server实例来监听请求，都会通过IPC通道，在master上进行注册。当客户端请求到达，master会负责将请求转发给对应的worker。

具体转发给哪个worker？这是由转发策略决定的。可以通过环境变量NODE_CLUSTER_SCHED_POLICY设置，也可以在cluster.setupMaster(options)时传入。

默认的转发策略是轮询（SCHED_RR）。

当有客户请求到达，master会轮询一遍worker列表，找到第一个空闲的worker，然后将该请求转发给该worker。

## master、worker内部通信小技巧

在开发过程中，我们会通过 process.on('message', fn) 来实现进程间通信。

前面提到，master进程、worker进程在server实例的创建过程中，也是通过IPC通道进行通信的。那会不会对我们的开发造成干扰呢？比如，收到一堆其实并不需要关心的消息？

答案肯定是不会？那么是怎么做到的呢？

当发送的消息包含`cmd`字段，且改字段以`NODE_`作为前缀，则该消息会被视为内部保留的消息，不会通过`message`事件抛出，但可以通过监听'internalMessage'捕获。

以worker进程通知master进程创建server实例为例子。worker伪代码如下：

```javascript
// woker进程
const message = {
  cmd: 'NODE_CLUSTER',
  act: 'queryServer'
};
process.send(message);
```

master伪代码如下：

```javascript
worker.process.on('internalMessage', fn);
```

## 相关链接

官方文档：[https://nodejs.org/api/cluster.html(opens new window)](https://nodejs.org/api/cluster.html)

Node学习笔记：[https://github.com/chyingp/nodejs-learning-guide(opens new window)](https://github.com/chyingp/nodejs-learning-guide)



# 9.7 V8

 [#](http://interview.poetries.top/fe-nodejs-docs/nodejs-docs/modules/-9.6 v8.html#v8-getheapstatistics)v8.getHeapStatistics()

用来获取内存使用情况

```javascript
const v8 = require('v8');
const statics = v8.getHeapStatistics();
console.log(statics);
```

输出如下：

```javascript
{ 
  total_heap_size: 9961472,
  total_heap_size_executable: 1572864,
  total_physical_size: 6266656,
  total_available_size: 1518883592,
  used_heap_size: 4943008,
  heap_size_limit: 1526909922,
  malloced_memory: 8192,
  peak_malloced_memory: 4818552,
  does_zap_garbage: 0 
}
```

# 进阶篇

# 5分钟入门非对称加密用法

## 加密、解密方法



在Node.js中，负责安全的模块是`crypto`。非对称加密中，公钥加密，私钥解密，加解密对应的API分别如下。

加密函数：

```javascript
crypto.publicEncrypt(key, buffer)
```

解密函数：

```javascript
crypto.privateDecrypt(privateKey, buffer)
```

## 入门例子



假设有如下`utils.js`

```javascript
// utils.js
const crypto = require('crypto');

// 加密方法
exports.encrypt = (data, key) => {
  // 注意，第二个参数是Buffer类型
  return crypto.publicEncrypt(key, Buffer.from(data));
};

// 解密方法
exports.decrypt = (encrypted, key) => {
  // 注意，encrypted是Buffer类型
  return crypto.privateDecrypt(key, encrypted);
};
```

测试代码`app.js`：

```javascript
const utils = require('./utils');
const keys = require('./keys');

const plainText = '你好，我是程序猿小卡';
const crypted = utils.encrypt(plainText, keys.pubKey); // 加密
const decrypted = utils.decrypt(crypted, keys.privKey); // 解密

console.log(decrypted.toString()); // 你好，我是程序猿小卡
```

附上公钥、私钥 `keys.js`：

```javascript
exports.privKey = `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQDFWnl8fChyKI/Tgo1ILB+IlGr8ZECKnnO8XRDwttBbf5EmG0qV
8gs0aGkh649rb75I+tMu2JSNuVj61CncL/7Ct2kAZ6CZZo1vYgtzhlFnxd4V7Ra+
aIwLZaXT/h3eE+/cFsL4VAJI5wXh4Mq4Vtu7uEjeogAOgXACaIqiFyrk3wIDAQAB
AoGBAKdrunYlqfY2fNUVAqAAdnvaVOxqa+psw4g/d3iNzjJhBRTLwDl2TZUXImEZ
QeEFueqVhoROTa/xVg/r3tshiD/QC71EfmPVBjBQJJIvJUbjtZJ/O+L2WxqzSvqe
wzYaTm6Te3kZeG/cULNMIL+xU7XsUmslbGPAurYmHA1jNKFpAkEA48aUogSv8VFn
R2QuYmilz20LkCzffK2aq2+9iSz1ZjCvo+iuFt71Y3+etWomzcZCuJ5sn0w7lcSx
nqyzCFDspQJBAN3O2VdQF3gua0Q5VHmK9AvsoXLmCfRa1RiKuFOtrtC609RfX4DC
FxDxH09UVu/8Hmdau8t6OFExcBriIYJQwDMCQQCZLjFDDHfuiFo2js8K62mnJ6SB
H0xlIrND2+/RUuTuBov4ZUC+rM7GTUtEodDazhyM4C4Yq0HfJNp25Zm5XALpAkBG
atLpO04YI3R+dkzxQUH1PyyKU6m5X9TjM7cNKcikD4wMkjK5p+S2xjYQc1AeZEYq
vc187dJPRIi4oC3PN1+tAkBuW51/5vBj+zmd73mVcTt28OmSKOX6kU29F0lvEh8I
oHiLOo285vG5ZtmXiY58tAiPVQXa7eU8hPQHTHWa9qp6
-----END RSA PRIVATE KEY-----
`;

exports.pubKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDFWnl8fChyKI/Tgo1ILB+IlGr8
ZECKnnO8XRDwttBbf5EmG0qV8gs0aGkh649rb75I+tMu2JSNuVj61CncL/7Ct2kA
Z6CZZo1vYgtzhlFnxd4V7Ra+aIwLZaXT/h3eE+/cFsL4VAJI5wXh4Mq4Vtu7uEje
ogAOgXACaIqiFyrk3wIDAQAB
-----END PUBLIC KEY-----
`;
```

## 小结



可以看到，通过Node.js进行非对称加密、解密还是挺方便的。更多用法，可以参考官方文档。

# cluster

## 写在前面



下文适合对cluster模块有一定了解的同学阅读。主要包含两部分内容：

1. cluster模块如何实现端口共享
2. cluster模块如何分发请求

## 端口共享源码分析



首先，master 进程 fork() 子进程：

```javascript
// master进程
cluster.fork()
```

子进程创建 net.Server 实例：

```javascript
// worker进程
require('net').createServer(() => {}).listen(3000);
```

在 net 模块中，调用 cluster._getServer

```javascript
// worker进程
cluster._getServer(self, {
  address: address,
  port: port,
  addressType: addressType,
  fd: fd,
  flags: 0
}, cb);

function cb(err, handle) {
  // 忽略错误处理
  self._handle = handle;
  self._listen2(address, port, addressType, backlog, fd);
}
```

在 cluster._getServer 中，通过 process.send(message)，向 master 进程发送 queryServer 请求。

```javascript
// worker进程
cluster._getServer = function(obj, options, cb) {
    const indexesKey = [ options.address,
                         options.port,
                         options.addressType,
                         options.fd ].join(':');
    if (indexes[indexesKey] === undefined)
      indexes[indexesKey] = 0;
    else
      indexes[indexesKey]++;

    // message =>
    // {
    //   act: 'queryServer',
    //   index: ':3000:4:',
    //   data: null,
    //   address: null,
    //   port: 3000,
    //   addressType: 4,
    //   fd: undefined
    // }
    const message = util._extend({
      act: 'queryServer',
      index: indexes[indexesKey],
      data: null
    }, options);

    // Set custom data on handle (i.e. tls tickets key)
    if (obj._getServerData) message.data = obj._getServerData();

    /*
      send 方法的定义如下，注意：masterInit 里也有 send 方法
      function send(message, cb) {
        return sendHelper(process, message, null, cb);
      }
      在 sendHelper 里对 message 进程加工，最终 message 如下所示（关键字段）：
      { cmd: 'NODE_CLUSTER', act: 'queryServer' }
    */  
    send(message, function(reply, handle) {
      if (obj._setServerData) obj._setServerData(reply.data);

      if (handle)
        shared(reply, handle, indexesKey, cb);  // Shared listen socket.
      else
        rr(reply, indexesKey, cb);              // Round-robin.
    });

    obj.once('listening', function() {
      cluster.worker.state = 'listening';
      const address = obj.address();
      message.act = 'listening';
      message.port = address && address.port || options.port;
      send(message);
    });
  };
```

在 cluster.fork() 方法里，监听了 internalMessage 事件，onmessage里，调用了 queryServer()。

```javascript
// master进程
cluster.fork = function(env) {
  // 忽略非关键代码
  const workerProcess = createWorkerProcess(id, env);
  const worker = new Worker({
    id: id,
    process: workerProcess
  });
  worker.process.on('internalMessage', internal(worker, onmessage));
};

// 
function onmessage(message, handle) {
  var worker = this;
  if (message.act === 'online')
    online(worker);
  else if (message.act === 'queryServer')
    // 调用 queryServer 方法
    queryServer(worker, message);
  else if (message.act === 'listening')
    listening(worker, message);
  else if (message.act === 'exitedAfterDisconnect')
    exitedAfterDisconnect(worker, message);
  else if (message.act === 'close')
    close(worker, message);
}
```

在 queryServer 里，首先 创建 RoundRobinHandle 实例，然后调用 handle.add()。

对于 address + port + addressType + fd + index 一样的 net.Server 实例，只创建一个 RoundRobinHandle 实例，并通过 handle.add() 将worker添加进去。

```javascript
// master进程
function queryServer(worker, message) {  
    var args = [message.address,
                message.port,
                message.addressType,
                message.fd, // undefined
                message.index]; // 注意：对于同样的监听参数，index 是从0开始递增的整数
    var key = args.join(':'); // 例子：':3000:4::0'
    var handle = handles[key];
    if (handle === undefined) {      
      var constructor = RoundRobinHandle;

      // 创建新的handle，并挂载到 handles 上
      // 这里的 constructor 为 RoundRobinHandle
      handles[key] = handle = new constructor(key,
                                              message.address,
                                              message.port,
                                              message.addressType,
                                              message.fd,
                                              message.flags);
    }
    if (!handle.data) handle.data = message.data;

    // Set custom server data
    handle.add(worker, function(errno, reply, handle) {
      reply = util._extend({
        errno: errno,
        key: key,
        ack: message.seq,
        data: handles[key].data
      }, reply);
      if (errno) delete handles[key];  // Gives other workers a chance to retry.
      send(worker, reply, handle);
    });
  }
```

看下 RoundRobinHandle 的构造方法。创建了 net.Server 实例，并调用 server.listen() 方法（实际监听）。

当 listening 事件触发，将 onconnection 事件覆盖掉，实现在多个worker中分发请求的逻辑。

```javascript
// master进程
function RoundRobinHandle(key, address, port, addressType, fd) {
  this.key = key;
  this.all = {};
  this.free = [];
  this.handles = [];
  this.handle = null;
  this.server = net.createServer(assert.fail);

  if (fd >= 0)
    this.server.listen({ fd: fd });
  else if (port >= 0)
    this.server.listen(port, address);
  else
    this.server.listen(address);  // UNIX socket path.

  this.server.once('listening', () => {
    this.handle = this.server._handle;
    // 监听 connection 事件，当用户请求进来时，通过 this.distribute() 分发请求到各个worker
    this.handle.onconnection = (err, handle) => this.distribute(err, handle);
    this.server._handle = null;
    this.server = null;
  });
}
```

注意，前面调用了 handle.add() 方法，如下所示

```javascript
// master进程
// Set custom server data
handle.add(worker, function(errno, reply, handle) {
  reply = util._extend({
    errno: errno,
    key: key,
    ack: message.seq,
    data: handles[key].data
  }, reply);
  if (errno) delete handles[key];  // Gives other workers a chance to retry.
  send(worker, reply, handle);
});
```

看下方法定义（忽略非主要逻辑）：

```javascript
// master进程
RoundRobinHandle.prototype.add = function(worker, send) {
  // 存储worker的引用
  this.all[worker.id] = worker;

  // 当listening事件触发，done 被调用（注意，在 RoundRobinHandle 构造方法里也监听了 listening）
  const done = () => {
    if (this.handle.getsockname) {
      // osx 10.13.1，node 8.9.3，跑这个分支
      var out = {};
      this.handle.getsockname(out);
      // 这里的 send 函数名比较有歧义，其实是 handle.add(worker, callback) 中的 callback
      // TODO(bnoordhuis) Check err.
      send(null, { sockname: out }, null);
    } else {
      send(null, null, null);  // UNIX socket.
    }
    this.handoff(worker);  // In case there are connections pending.
  };

  // Still busy binding.
  this.server.once('listening', done);
};
```

当 listening 事件触发，下面方法被调用。同样的，最终被 sendHelper 封装了一遍

```javascript
// master进程
// error: null
// reply: {}
// handle: null 
function(errno, reply, handle) {
  reply = util._extend({
    errno: errno,
    key: key,
    ack: message.seq,
    data: handles[key].data
  }, reply);
  if (errno) delete handles[key];  // Gives other workers a chance to retry.
  {"errno":null,"key":":3000:4::0","ack":1,"data":null,"sockname":{"address":"::","family":"IPv6","port":3000}}
  send(worker, reply, handle);
}
```

经过 sendHelper 的封装，worker.process.send(message)，message 内容如下。注意，此时 ack === 1。

```javascript
// master进程
{
  "cmd": "NODE_CLUSTER",
  "sockname": {
    "address": "::",
    "family": "IPv6",
    "port": 3000
  },
  "data": null,
  "ack": 1,
  "key": ":3000:4::0",
  "errno": null,
  "seq": 0
}
```

当上面 message 被发出时，worker 进程的 internalMessage 事件触发。（worker进程 的internalMessage 事件是在 node_bootstrap阶段监听的，这里容易忽略）

```javascript
// worker进程
cluster._setupWorker = function() {
  var worker = new Worker({
    id: +process.env.NODE_UNIQUE_ID | 0,
    process: process,
    state: 'online'
  });
  cluster.worker = worker;
  process.on('internalMessage', internal(worker, onmessage));
};
```

如下所示，当 message.ack 存在时，callbacks[message.ack] 被调用。

```javascript
// worker进程
function internal(worker, cb) {
  return function(message, handle) {
    if (message.cmd !== 'NODE_CLUSTER') return;
    var fn = cb;
    // 此时，message.ack === 1
    // callbacks[message.ack] 是 _getServer 的回调
    if (message.ack !== undefined && callbacks[message.ack] !== undefined) {
      fn = callbacks[message.ack];
      delete callbacks[message.ack];
    }
    fn.apply(worker, arguments);
  };
}
```

也就是下面的回调。

```javascript
// worker进程
// obj is a net#Server or a dgram#Socket object.
cluster._getServer = function(obj, options, cb) {

  // 忽略部分代码
  const message = util._extend({
    act: 'queryServer',
    index: indexes[indexesKey],
    data: null
  }, options);

  /* 
  注意：就是这里的回调】
  reply: {
    "cmd": "NODE_CLUSTER",
    "sockname": {
      "address": "::",
      "family": "IPv6",
      "port": 3000
    },
    "data": null,
    "ack": 1,
    "key": ":3000:4::0",
    "errno": null,
    "seq": 0
  }
  handle：undefined
  */
  send(message, (reply, handle) => {
    if (handle)
      shared(reply, handle, indexesKey, cb);  // Shared listen socket.
    else
      // 这里被调用
      rr(reply, indexesKey, cb);              // Round-robin.
  });
};
```

下面是 rr 方法的定义。

```javascript
// worker进程
// message： {"cmd":"NODE_CLUSTER","sockname":{"address":"::","family":"IPv6","port":3000},"data":null,"ack":1,"key":":3000:4::0","errno":null,"seq":0}
// indexsKey: ":3000:4:"
// cb: _getServer 的回调
// Round-robin. Master distributes handles across workers.
function rr(message, indexesKey, cb) {
  if (message.errno)
    return cb(message.errno, null);

  var key = message.key;
  function listen(backlog) {
    // TODO(bnoordhuis) Send a message to the master that tells it to
    // update the backlog size. The actual backlog should probably be
    // the largest requested size by any worker.
    return 0;
  }

  function close() {
    // lib/net.js treats server._handle.close() as effectively synchronous.
    // That means there is a time window between the call to close() and
    // the ack by the master process in which we can still receive handles.
    // onconnection() below handles that by sending those handles back to
    // the master.
    if (key === undefined) return;
    send({ act: 'close', key: key });
    delete handles[key];
    delete indexes[indexesKey];
    key = undefined;
  }

  function getsockname(out) {
    if (key) util._extend(out, message.sockname);
    return 0;
  }

  // XXX(bnoordhuis) Probably no point in implementing ref() and unref()
  // because the control channel is going to keep the worker alive anyway.
  function ref() {
  }

  function unref() {
  }

  // Faux handle. Mimics a TCPWrap with just enough fidelity to get away
  // with it. Fools net.Server into thinking that it's backed by a real
  // handle.
  var handle = {
    close: close,
    listen: listen,
    ref: ref,
    unref: unref,
  };
  if (message.sockname) {
    handle.getsockname = getsockname;  // TCP handles only.
  }
  
  handles[key] = handle;
  cb(0, handle); // 终于调用 cb 了。。。
}
```

然后，下面的回调函数被调用：

```javascript
// worker进程
function cb(err, handle) {
  // err：0
  // handle: {close: fn, listen: fn, getsockname: fn, ref: fn, unref: fn}
  if (err === 0 && port > 0 && handle.getsockname) {
    var out = {};
    err = handle.getsockname(out);
    if (err === 0 && port !== out.port)
      err = uv.UV_EADDRINUSE;
  }

  self._handle = handle; // 将 handle 赋给 net.Server 实例
  self._listen2(address, port, addressType, backlog, fd); // 调用 _listen2 方法
}
```

看下此时 _listen2 做了什么。主要是抛出 listening 事件，以及 添加 onconnection 监听。

```javascript
// worker进程
Server.prototype._listen2 = function(address, port, addressType, backlog, fd) {

  // If there is not yet a handle, we need to create one and bind.
  // In the case of a server sent via IPC, we don't need to do this.
  if (this._handle) {
    debug('_listen2: have a handle already');
  } 

  this._handle.onconnection = onconnection; // onconnect 回调
  this._handle.owner = this;

  var err = _listen(this._handle, backlog);

  // generate connection key, this should be unique to the connection
  this._connectionKey = addressType + ':' + address + ':' + port;

  process.nextTick(emitListeningNT, this);
};
```

前面说过，在主进程里，创建了 net.Server 实例，并对端口进行实际的监听。再来回顾这段代码

```javascript
// master进程
// Start a round-robin server. Master accepts connections and distributes
// them over the workers.
function RoundRobinHandle(key, address, port, addressType, fd) {
  // 忽略非重点代码
  this.server = net.createServer(assert.fail);
  this.server.listen(port, address); // 注意这里的监听

  this.server.once('listening', () => {
    this.handle = this.server._handle;
    this.handle.onconnection = (err, handle) => this.distribute(err, handle);
    this.server._handle = null;
    this.server = null;
  });
}
```

监听调用的是 net 模块中如下函数：

```javascript
// master进程
self._listen2(address, port, addressType, backlog, fd);
// master进程
Server.prototype._listen2 = function(address, port, addressType, backlog, fd) {

  // If there is not yet a handle, we need to create one and bind.
  // In the case of a server sent via IPC, we don't need to do this.
  // 此时，this._handle 是 null（初始化状态），于是走第二个分支
  if (this._handle) {
    debug('_listen2: have a handle already');
  } else {
    debug('_listen2: create a handle');

    var rval = null;

    if (!address && typeof fd !== 'number') {
      rval = createServerHandle('::', port, 6, fd);

      if (typeof rval === 'number') {
        rval = null;
        address = '0.0.0.0';
        addressType = 4;
      } else {
        address = '::';
        addressType = 6;
      }
    }

    // rval: {"reading":false,"owner":null,"onread":null,"onconnection":null,"writeQueueSize":0}
    if (rval === null)
      // 重点是这行代码，在这里面创建 TCP 实例，并进行监听
      // fd: undefined
      // address: ::''
      rval = createServerHandle(address, port, addressType, fd);

    if (typeof rval === 'number') {
      var error = exceptionWithHostPort(rval, 'listen', address, port);
      process.nextTick(emitErrorNT, this, error);
      return;
    }
    this._handle = rval;
  }

  this._handle.onconnection = onconnection;
  this._handle.owner = this;

  var err = _listen(this._handle, backlog);

  if (err) {
    var ex = exceptionWithHostPort(err, 'listen', address, port);
    this._handle.close();
    this._handle = null;
    process.nextTick(emitErrorNT, this, ex);
    return;
  }

  // generate connection key, this should be unique to the connection
  this._connectionKey = addressType + ':' + address + ':' + port;

  // unref the handle if the server was unref'ed prior to listening
  if (this._unref)
    this.unref();

  process.nextTick(emitListeningNT, this);
};
```

主要逻辑：创建 TCP 实例，绑定端口、IP，并返回 handle。

```javascript
//master进程
function createServerHandle(address, port, addressType, fd) {
  var err = 0;
  // assign handle in listen, and clean up if bind or listen fails
  var handle;

  var isTCP = false;
  
  handle = new TCP();
  isTCP = true;

  if (address || port || isTCP) {
    debug('bind to ' + (address || 'anycast'));
    if (!address) {
      // Try binding to ipv6 first
      err = handle.bind6('::', port);
      if (err) {
        handle.close();
        // Fallback to ipv4
        return createServerHandle('0.0.0.0', port);
      }
    } else if (addressType === 6) {
      err = handle.bind6(address, port);
    } else {
      err = handle.bind(address, port);
    }
  }

  if (err) {
    handle.close();
    return err;
  }

  return handle;
}
```

server._handle 初始化完成，开始监听后，触发 listening 事件。此时，RoundRobinHandle 中的回调函数被调用。

```javascript
// master进程
this.server.once('listening', () => {
  // 将 this.server._handle 赋值给 this.handle
  this.handle = this.server._handle;
  // 覆盖 this.handle.onconnection，以达到请求分发的目的
  this.handle.onconnection = (err, handle) => this.distribute(err, handle);
  // 将server._handle 设置为null
  this.server._handle = null;
  // 将this.server 设置为null（这里只需要 handle 就够了）
  this.server = null;
});
```

经过上面的复杂流程，最终的结果是：

1. master 进程中创建了 net.Server 实例A，并对来自特定端口的请求进行监听。
2. worker 进程中创建了 net.Server 实例B。
3. 当新连接创建时，实例A 将请求分发给实例B。（如果有多个worker进程，master进程会按照特定算法进行分发）

## 请求分发源码分析



首先，当连接请求进来时，调用 this.distribute(err, handle);

```javascript
// master进程
this.handle.onconnection = (err, handle) => this.distribute(err, handle);
```

看下distribute的实现。主要做了两件事情：

1. 将 handle 加入待处理队列。
2. 取得第一个空闲的worker，如果存在，就调用 this.handoff(worker); 处理请求。

```javascript
// master进程
RoundRobinHandle.prototype.distribute = function(err, handle) {
  // 将 handle 加入 handles 队列，该队列里是待处理的请求对应的handle。
  this.handles.push(handle);
  // 取第一个空闲的worker
  var worker = this.free.shift();
  // 如果有空闲的worker
  if (worker) this.handoff(worker);
};
```

看下 handoff(worker) 的实现。

```javascript
// master进程
RoundRobinHandle.prototype.handoff = function(worker) {
  if (worker.id in this.all === false) {
    return;  // Worker is closing (or has closed) the server.
  }
  // 获取第一个待处理的请求
  var handle = this.handles.shift();
  if (handle === undefined) {
    this.free.push(worker);  // Add to ready queue again.
    return;
  }
  var message = { act: 'newconn', key: this.key };

  // 向worker进程发送消息
  // message：{ act: 'newconn', key: this.key }
  sendHelper(worker.process, message, handle, (reply) => {
    // 当 worker进程 收到消息后，ack回应，调用 handle.close() 
    if (reply.accepted)
      handle.close();
    else
      this.distribute(0, handle);  // Worker is shutting down. Send to another.
    // 再次调用 handoff(worker)。有可能前面已经有一堆的待处理请求，因此检查下还有没有请求需要处理
    // 如有，已经空闲出来的worker可以接着处理请求
    this.handoff(worker);
  });
};
```

#  cookie_parser深入

## 文章导读



`cookie-parser`是Express的中间件，用来实现cookie的解析，是官方脚手架内置的中间件之一。

它的使用非常简单，但在使用过程中偶尔也会遇到问题。一般都是因为对`Express + cookie-parser`的签名、验证机制不了解导致的。

本文深入讲解`Express + cookie-parser`的签名和验证的实现机制，以及cookie签名是如何增强网站的安全性的。

## 入门例子：cookie设置与解析



先从最简单的例子来看下`cookie-parser`的使用，下面采用默认配置。

- cookie设置：使用`Express`的内置方法`res.cookie`。
- cookie解析：使用`cookie-parser`中间件。

```javascript
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();

app.use(cookieParser());

app.use(function (req, res, next) {
  console.log(req.cookies.nick); // 第二次访问，输出chyingp
  next();
});

app.use(function (req, res, next) {  
  res.cookie('nick', 'chyingp');
  res.end('ok');
});

app.listen(3000);
```

在当前场景下，`cookie-parser`中间件大致实现如下：

```javascript
app.use(function (req, res, next) {
  req.cookies = cookie.parse(req.headers.cookie);
  next();
});
```

## 进阶例子：cookie签名与解析



出于安全的考虑，我们通常需要对cookie进行签名。

例子改写如下，有两个注意点：

1. `cookieParser`初始化时，传入`secret`作为签名的秘钥。
2. 设置cookie时，将`signed`设置为`true`，表示对cookie进行签名。
3. 获取cookie时，可以同时通过`req.cookies`，也可以通过`req.signedCookies`获取。

```javascript
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();

// 初始化中间件，传入的第一个参数为singed secret
app.use(cookieParser('secret'));

app.use(function (req, res, next) {
  console.log(req.cookies.nick); // chyingp
  console.log(req.signedCookies.nick); // chyingp
  next();
});

app.use(function (req, res, next) {  
  // 传入第三个参数 {signed: true}，表示要对cookie进行摘要计算
  res.cookie('nick', 'chyingp', {signed: true});
  res.end('ok');
});

app.listen(3000);
```

签名前的cookie值为`chyingp`，签名后的cookie值为`s%3Achyingp.uVofnk6k%2B9mHQpdPlQeOfjM8B5oa6mppny9d%2BmG9rD0`。

下面就来分析下，cookie的签名、解析是如何实现的。

## cookie签名、解析实现剖析



Express完成cookie值的签名，`cookie-parser`实现签名cookie的解析。两者公用同一个秘钥。

### cookie签名

Express对cookie的设置（包括签名），都是通过`res.cookie`这个方法实现的。

精简后的代码如下：

```javascript
res.cookie = function (name, value, options) {  
  var secret = this.req.secret;
  var signed = opts.signed;

  // 如果 options.signed 为true，则对cookie进行签名
  if (signed) {
    val = 's:' + sign(val, secret);
  }

  this.append('Set-Cookie', cookie.serialize(name, String(val), opts));

  return this;
};
```

`sign`为签名函数。伪代码如下，其实就是把cookie的原始值，跟hmac后的值拼接起来。

> 敲黑板划重点：签名后的cookie值，包含了原始值。

```javascript
function sign (val, secret) {
  return val + '.' + hmac(val, secret);
}
```

这里的`secret`哪来的呢？是`cookie-parser`初始化的时候传入的。如下伪代码所示：

```javascript
var cookieParser = function (secret) {
  return function (req, res, next) {
    req.secret = secret;
    // ...
    next();
  };
};

app.use(cookieParser('secret'));
```

### 签名cookie解析

知道了cookie签名的机制后，如何"解析"签名cookie就很清楚了。这个阶段，中间件主要做了两件事：

1. 将签名cookie对应的原始值提取出来
2. 验证签名cookie是否合法

实现代码如下：

```javascript
// str：签名后的cookie，比如 "s:chyingp.uVofnk6k+9mHQpdPlQeOfjM8B5oa6mppny9d+mG9rD0"
// secret：秘钥，比如 "secret"
function signedCookie(str, secret) {

  // 检查是否 s: 开头，确保只对签过名的cookie进行解析
  if (str.substr(0, 2) !== 's:') {
    return str;
  }

  // 校验签名的值是否合法，如合法，返回true，否则，返回false
  var val = unsign(str.slice(2), secret);
  
  if (val !== false) {
    return val;
  }

  return false;
}
```

判断、提取cookie原始值比较简单。只是是`unsign`方法名比较有迷惑性。

一般只会对签名进行合法校验，并没有所谓的反签名。

`unsign`方法的代码如下。首先，从传入的cookie值中，分别提取出原始值A1、签名值B1。用同样的秘钥对A1进行签名，得到A2。根据A2、B1是否相等，判断签名是否合法。

```javascript
exports.unsign = function(val, secret){
  var str = val.slice(0, val.lastIndexOf('.'))
    , mac = exports.sign(str, secret);
  
  return sha1(mac) == sha1(val) ? str : false;
};
```

## cookie签名的作用



主要是出于安全考虑，防止cookie被篡改，增强安全性。

举个小例子来看下cookie签名是如何实现防篡改的。

基于前面的例子展开。假设网站通过`nick`这个cookie来区分当前登录的用户是谁。在前面例子中，登录用户的cookie中，nick对应的值如下：(decode后的)

```text
s:chyingp.uVofnk6k+9mHQpdPlQeOfjM8B5oa6mppny9d+mG9rD0
```

此时，有人试图修改这个cookie值，来达到伪造身份的目的。比如修改成`xiaoming`：

```text
s:xiaoming.uVofnk6k+9mHQpdPlQeOfjM8B5oa6mppny9d+mG9rD0
```

当网站收到请求，对签名cookie进行解析，发现签名验证不通过。由此可判断，cookie是伪造的。

```text
hmac("xiaoming", "secret") !== "uVofnk6k+9mHQpdPlQeOfjM8B5oa6mppny9d+mG9rD0"
```

## 签名就能够确保安全吗



当然不是。

上个小节的例子，仅通过`nick`这个cookie的值来判断登录的是哪个用户，这是一个非常糟糕的设计。虽然在秘钥未知的情况下，很难伪造签名cookie的，但原始值相同的情况下，签名也是相同的。这种情况下，其实是很容易伪造的。

另外，开源组件的算法是公开的，因此秘钥的安全性就成了关键，要确保秘钥不泄露。

还有很多，这里不展开。

## 小结



本文主要对`Express + cookie-parser`的签名和解析机制进行相对深入的介绍。不少类似的总结文章中，把cookie的签名说成了加密，这是一个常见的错误，读者朋友可以注意一下。

签名部分的介绍，稍微涉及一些简单的安全知识，对这块不熟悉的同学可以留言交流。为讲解方便，部分段落、用词可能不够严谨。如有错漏，敬请指出。

## 相关链接



https://github.com/expressjs/cookie-parser



#  crypto模块之理论篇

# Nodejs进阶：crypto模块之理论篇

## 一、 文章概述



互联网时代，网络上的数据量每天都在以惊人的速度增长。同时，各类网络安全问题层出不穷。在信息安全重要性日益凸显的今天，作为一名开发者，需要加强对安全的认识，并通过技术手段增强服务的安全性。

`crypto`模块是nodejs的核心模块之一，它提供了安全相关的功能，如摘要运算、加密、电子签名等。很多初学者对着长长的API列表，不知如何上手，因此它背后涉及了大量安全领域的知识。

本文重点讲解API背后的理论知识，主要包括如下内容：

1. 摘要（hash）、基于摘要的消息验证码（HMAC）
2. 对称加密、非对称加密、电子签名
3. 分组加密模式

## 二、摘要（hash）



摘要（digest）：将长度不固定的消息作为输入，通过运行hash函数，生成固定长度的输出，这段输出就叫做摘要。通常用来验证消息完整、未被篡改。

摘要运算是不可逆的。也就是说，输入固定的情况下，产生固定的输出。但知道输出的情况下，无法反推出输入。

伪代码如下。

> digest = Hash(message)

常见的摘要算法 与 对应的输出位数如下：

- MD5：128位
- SHA-1：160位
- SHA256 ：256位
- SHA512：512位

nodejs中的例子：

```javascript
var crypto = require('crypto');
var md5 = crypto.createHash('md5');

var message = 'hello';
var digest = md5.update(message, 'utf8').digest('hex'); 

console.log(digest);
// 输出如下：注意这里是16进制
// 5d41402abc4b2a76b9719d911017c592
```

> 备注：在各类文章或文献中，摘要、hash、散列 这几个词经常会混用，导致不少初学者看了一脸懵逼，其实大部分时候指的都是一回事，记住上面对摘要的定义就好了。

## 三、MAC、HMAC



MAC（Message Authentication Code）：消息认证码，用以保证数据的完整性。运算结果取决于消息本身、秘钥。

MAC可以有多种不同的实现方式，比如HMAC。

HMAC（Hash-based Message Authentication Code）：可以粗略地理解为带秘钥的hash函数。

nodejs例子如下：

```javascript
const crypto = require('crypto');

// 参数一：摘要函数
// 参数二：秘钥
let hmac = crypto.createHmac('md5', '123456');
let ret = hmac.update('hello').digest('hex');

console.log(ret);
// 9c699d7af73a49247a239cb0dd2f8139
```

## 四、对称加密、非对称加密



**加密/解密**：给定明文，通过一定的算法，产生加密后的密文，这个过程叫加密。反过来就是解密。

> encryptedText = encrypt( plainText ) plainText = decrypt( encryptedText )

**秘钥**：为了进一步增强加/解密算法的安全性，在加/解密的过程中引入了秘钥。秘钥可以视为加/解密算法的参数，在已知密文的情况下，如果不知道解密所用的秘钥，则无法将密文解开。

> encryptedText = encrypt(plainText, encryptKey) plainText = decrypt(encryptedText, decryptKey)

根据加密、解密所用的秘钥是否相同，可以将加密算法分为**对称加密**、**非对称加密**。

### 1、对称加密

加密、解密所用的秘钥是相同的，即`encryptKey === decryptKey`。

常见的对称加密算法：DES、3DES、AES、Blowfish、RC5、IDEA。

加、解密伪代码：

> encryptedText = encrypt(plainText, key); // 加密 plainText = decrypt(encryptedText, key); // 解密

### 2、非对称加密

又称公开秘钥加密。加密、解密所用的秘钥是不同的，即`encryptKey !== decryptKey`。

加密秘钥公开，称为公钥。解密秘钥保密，称为秘钥。

常见的非对称加密算法：RSA、DSA、ElGamal。

加、解密伪代码：

> encryptedText = encrypt(plainText, publicKey); // 加密 plainText = decrypt(encryptedText, priviteKey); // 解密

### 3、对比与应用

除了秘钥的差异，还有运算速度上的差异。通常来说：

1. 对称加密速度要快于非对称加密。
2. 非对称加密通常用于加密短文本，对称加密通常用于加密长文本。

两者可以结合起来使用，比如HTTPS协议，可以在握手阶段，通过RSA来交换生成对称秘钥。在之后的通讯阶段，可以使用对称加密算法对数据进行加密，秘钥则是握手阶段生成的。

> 备注：对称秘钥交换不一定通过RSA，还可以通过类似DH来完成，这里不展开。

## 五、数字签名



从**签名**大致可以猜到**数字签名**的用途。主要作用如下：

1. 确认信息来源于特定的主体。
2. 确认信息完整、未被篡改。

为了达到上述目的，需要有两个过程：

1. 发送方：生成签名。
2. 接收方：验证签名。

### 1、发送方生成签名

1. 计算原始信息的摘要。
2. 通过私钥对摘要进行签名，得到电子签名。
3. 将原始信息、电子签名，发送给接收方。

附：签名伪代码

> digest = hash(message); // 计算摘要 digitalSignature = sign(digest, priviteKey); // 计算数字签名

### 2、接收方验证签名

1. 通过公钥解开电子签名，得到摘要D1。（如果解不开，信息来源主体校验失败）
2. 计算原始信息的摘要D2。
3. 对比D1、D2，如果D1等于D2，说明原始信息完整、未被篡改。

附：签名验证伪代码

> digest1 = verify(digitalSignature, publicKey); // 获取摘要 digest2 = hash(message); // 计算原始信息的摘要 digest1 === digest2 // 验证是否相等

### 3、对比非对称加密

由于RSA算法的特殊性，加密/解密、签名/验证 看上去特别像，很多同学都很容易混淆。先记住下面结论，后面有时间再详细介绍。

1. 加密/解密：公钥加密，私钥解密。
2. 签名/验证：私钥签名，公钥验证。

## 六、分组加密模式、填充、初始化向量



常见的对称加密算法，如AES、DES都采用了分组加密模式。这其中，有三个关键的概念需要掌握：模式、填充、初始化向量。

搞清楚这三点，才会知道crypto模块对称加密API的参数代表什么含义，出了错知道如何去排查。

### 1、分组加密模式

所谓的分组加密，就是将（较长的）明文拆分成固定长度的块，然后对拆分的块按照特定的模式进行加密。

常见的分组加密模式有：ECB（不安全）、CBC（最常用）、CFB、OFB、CTR等。

以最简单的ECB为例，先将消息拆分成等分的模块，然后利用秘钥进行加密。

图片来源：[这里 (opens new window)](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Electronic_Codebook_(ECB))，更多关于分组加密模式的介绍可以参考 [wiki (opens new window)](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Common_modes)。

> 后面假设每个块的长度为128位

### 2、初始化向量：IV

为了增强算法的安全性，部分分组加密模式（CFB、OFB、CTR）中引入了初始化向量（IV），使得加密的结果随机化。也就是说，对于同一段明文，IV不同，加密的结果不同。

以CBC为例，每一个数据块，都与前一个加密块进行亦或运算后，再进行加密。对于第一个数据块，则是与IV进行亦或。

IV的大小跟数据块的大小有关（128位），跟秘钥的长度无关。

如图所示，图片来源 [这里(opens new window)](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Cipher_Block_Chaining_(CBC))

### 3、填充：padding

分组加密模式需要对长度固定的块进行加密。分组拆分完后，最后一个数据块长度可能小于128位，此时需要进行填充以满足长度要求。

填充方式有多重。常见的填充方式有[PKCS7 (opens new window)](https://tools.ietf.org/html/rfc5652#section-6.3)。

假设分组长度为k字节，最后一个分组长度为k-last，可以看到：

1. 不管明文长度是多少，加密之前都会会对明文进行填充 （不然解密函数无法区分最后一个分组是否被填充了，因为存在最后一个分组长度刚好等于k的情况）
2. 如果最后一个分组长度等于k-last === k，那么填充内容为一个完整的分组 k k k ... k （k个字节）
3. 如果最后一个分组长度小于k-last < k，那么填充内容为 k-last mod k

```text
                     01 -- if lth mod k = k-1
                  02 02 -- if lth mod k = k-2
                      .
                      .
                      .
            k k ... k k -- if lth mod k = 0
```

### 概括来说

1. 分组加密：先将明文切分成固定长度的块（128位），再进行加密。
2. 分组加密的几种模式：ECB（不安全）、CBC（最常用）、CFB、OFB、CTR。
3. 填充(padding)：部分加密模式，当最后一个块的长度小于128位时，需要通过特定的方式进行填充。（ECB、CBC需要填充，CFB、OFB、CTR不需要填充）
4. 初始化向量（IV）：部分加密模式（CFB、OFB、CTR）会将 明文块 与 前一个密文块进行亦或操作。对于第一个明文块，不存在前一个密文块，因此需要提供初始化向量IV（把IV当做第一个明文块 之前的 密文块）。此外，IV也可以让加密结果随机化。

## 七、写在后面



crypto模块涉及的安全知识较多，篇幅所限，这里没办法一一展开。为了讲解方便，部分内容可能不够严谨，如有错漏敬请指出。

## 八、相关链接



[Cryptographic hash function(opens new window)](https://en.wikipedia.org/wiki/Cryptographic_hash_function)

[Hash-based message authentication code(opens new window)](https://en.wikipedia.org/wiki/Hash-based_message_authentication_code)

[HMAC vs MAC functions(opens new window)](https://crypto.stackexchange.com/questions/2936/hmac-vs-mac-functions)

[What is the difference between MAC and HMAC?(opens new window)](https://crypto.stackexchange.com/questions/6523/what-is-the-difference-between-mac-and-hmac)

[Block cipher mode of operation(opens new window)](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation)

[RSA的公钥和私钥到底哪个才是用来加密和哪个用来解密？ - 刘巍然-学酥的回答 - 知乎](https://www.zhihu.com/question/25912483/answer/31653639)



# express+cookie_parser:签名机制深入剖析

## 写在前面



本文先简单介绍session跟cookie的区别与联系，接着深入剖析`express-session`中间件的实现。关于`express-session`的基础使用，可参见笔者前面的文章。

## session vs cookie vs 登录态



HTTP是无状态的，也就是说，同个用户，多次访问同一个网站，网站无法区分前后访问的是否同个用户。cookie跟session的出现很好的解决了这个问题。

抛开两者的学术定义，从应用的角度来讲，session跟cookie就是一对好基友，可以用来实现用户的身份识别。

session是保存在服务端的小段数据，cookie是保存在用户本地的小段数据，它们一般是一一对应的。

上面的解释比较抽象，先举两个常见的例子：**用户登录** 和 **登录态检验**。

### 用户登录

1. 张三：在网站输入用户名(zhang)、密码，点击“登录”。
2. 浏览器：向服务端发送登录请求。
3. 服务端：收到登录请求，对 用户名、密码 进行校验，且校验通过。
4. 服务端：把张三的用户名 zhang 写到本地文件 session.txt。（session）
5. 服务端：请求成功返回，附带 `Set-Cookie:uid=zhang` 首部。
6. 浏览器：收到服务端返回，检测到 `Set-Cookie` 首部，将cookie(`uid=zhang`)保存到本地。(cookie)

### 登录态检验

张三再次访问网站：

1. 张三：访问网站的个人主页。
2. 浏览器：向服务端发送访问请求（带上之前的cookie）。
3. 服务端：解析cookie，找到`uid=zhang`。
4. 服务端：查找本地session.txt，发现`uid=zhang`这条记录，判断用户已登录。
5. 服务端：返回个人主页。

## express-session实现原理



关键配置如下。其中，`saveUninitialized`若为`true`，对状态为“未初始化”的会话，服务端会自动为该会话创建session id，并保存到本地。

对于需要实现登录功能的站点，需要将`saveUninitialized`设置为`false`。

```js
app.use(session({
    name: identityKey,
    secret: 'chyingp',  // 用来对session id相关的cookie进行签名
    store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
    resave: false,  // 是否每次都重新保存会话，建议false
    cookie: {
        maxAge: 10 * 1000  // 有效期，单位是毫秒
    }
}));
```

从请求的生命周期来看下express-session是怎么发挥作用的。

首先，是一个“未初始化”的请求（比如第一次访问网站的用户）

```js
app.use(session(/* 配置项 */));
app.use('/', function(req, res, next){
    res.end('ok');
});
```

## 关注点



1. 防止cookie篡改
2. 登录态超时机制
3. 登录态主动失效机制



# express+session 实现简易身份认证

## 环境初始化



首先，初始化项目

```bash
express -e
```

然后，安装依赖。

```bash
npm install
```

接着，安装session相关的包。

```bash
npm install --save express-session session-file-store
```

## session相关配置



配置如下，并不复杂，可以见代码注释，或者参考[官方文档 (opens new window)](https://github.com/expressjs/session#options)。

```js
var express = require('express');
var app = express();
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var identityKey = 'skey';

app.use(session({
    name: identityKey,
    secret: 'chyingp',  // 用来对session id相关的cookie进行签名
    store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
    resave: false,  // 是否每次都重新保存会话，建议false
    cookie: {
        maxAge: 10 * 1000  // 有效期，单位是毫秒
    }
}));
```

## 实现登录/登出接口



### 创建测试账户数据

首先，在本地创建个文件，来保存可用于登录的账户信息，避免创建链接数据库的繁琐。

```js
// users.js
module.exports = {
    items: [
        {name: 'chyingp', password: '123456'}
    ]
};
```

### 登录、登出接口实现

实现登录、登出接口，其中：

- 登录：如果用户存在，则通过`req.regenerate`创建session，保存到本地，并通过`Set-Cookie`将session id保存到用户侧；
- 登出：销毁session，并清除cookie；

```js
var users = require('./users').items;

var findUser = function(name, password){
    return users.find(function(item){
        return item.name === name && item.password === password;
    });
};

// 登录接口
app.post('/login', function(req, res, next){
    
    var sess = req.session;
    var user = findUser(req.body.name, req.body.password);

    if(user){
        req.session.regenerate(function(err) {
            if(err){
                return res.json({ret_code: 2, ret_msg: '登录失败'});                
            }
            
            req.session.loginUser = user.name;
            res.json({ret_code: 0, ret_msg: '登录成功'});                           
        });
    }else{
        res.json({ret_code: 1, ret_msg: '账号或密码错误'});
    }   
});

// 退出登录
app.get('/logout', function(req, res, next){
    // 备注：这里用的 session-file-store 在destroy 方法里，并没有销毁cookie
    // 所以客户端的 cookie 还是存在，导致的问题 --> 退出登陆后，服务端检测到cookie
    // 然后去查找对应的 session 文件，报错
    // session-file-store 本身的bug    

    req.session.destroy(function(err) {
        if(err){
            res.json({ret_code: 2, ret_msg: '退出登录失败'});
            return;
        }
        
        // req.session.loginUser = null;
        res.clearCookie(identityKey);
        res.redirect('/');
    });
});
```

### 登录态判断

用户访问 http://127.0.0.1:3000 时，判断用户是否登录，如果是，则调到用户详情界面（简陋无比）；如果没有登录，则跳到登录界面；

```js
app.get('/', function(req, res, next){
    var sess = req.session;
    var loginUser = sess.loginUser;
    var isLogined = !!loginUser;

    res.render('index', {
        isLogined: isLogined,
        name: loginUser || ''
    });
});
```

### UI界面

最后，看下登录、登出UI相关的代码。

```html
<!DOCTYPE html>
<html>
<head>
    <title>会话管理</title>
</head>
<body>

<h1>会话管理</h1>

<% if(isLogined){ %>
    <p>当前登录用户：<%= name %>，<a href="/logout" id="logout">退出登陆</a></p>
<% }else{ %>
    <form method="POST" action="/login">
        <input type="text" id="name" name="name" value="chyingp" />
        <input type="password" id="password" name="password" value="123456" />
        <input type="submit" value="登录" id="login" />
    </form>
<% } %> 

<script type="text/javascript" src="/jquery-3.1.0.min.js"></script>
<script type="text/javascript">
    $('#login').click(function(evt){
        evt.preventDefault();

        $.ajax({
            url: '/login',
            type: 'POST',
            data: {
                name: $('#name').val(),
                password: $('#password').val()
            },
            success: function(data){
                if(data.ret_code === 0){
                    location.reload();
                }   
            }
        });
    });
</script>

</body>
</html>
```

## 相关链接



https://github.com/expressjs/session



# https

## 客户端例子：不受信任的证书



我们知道，有些网站的HTTPS证书会被浏览器标识为不受信任，有可能是以下情况导致的：

- 颁发证书的机构不在操作系统的受信列表里
- 办法证书的机构在操作系统的受信列表里，但证书的安全级别不够

比如我们访问[12306 (opens new window)](https://kyfw.12306.cn/otn/regist/init)，chrome就会提示你“您的连接不是私密连接，攻击者可能会试图从kyfw.12306.cn窃取您的信息”。

那么，当我们用node向12306发起请求时，又会是什么状况呢？下面就来试下

```js
var https = require('https');

https.get('https://www.baidu.com', function(res){
    res.on('data', function(data){
        process.stdout.write(data);
    });
}).on('error', function(err){
    console.error(err);
});
```

运行上面代码，输出如下。可以看到出现报错，提示信息是“self signed certificate in certificate chain”。大意就是说证书是网站自己签发的，不安全。

```bash
{ Error: self signed certificate in certificate chain
    at Error (native)
    at TLSSocket.<anonymous> (_tls_wrap.js:1055:38)
    at emitNone (events.js:86:13)
    at TLSSocket.emit (events.js:185:7)
    at TLSSocket._finishInit (_tls_wrap.js:580:8)
    at TLSWrap.ssl.onhandshakedone (_tls_wrap.js:412:38) code: 'SELF_SIGNED_CERT_IN_CHAIN' }
```

出现上述错误怎么处理呢？我们知道，如果是在浏览器里访问，有两种处理方式：

- 忽略浏览器的安全提示，继续访问（浏览器可能会直接禁止你访问）
- 将网站的根证书导入到操作系统的受信任根证书列表里

## 入门示例



TODO

## 基础讲解



。。。

## 本地证书



。。。

## 服务器：自签名证书



```bash
➜  server git:(master) ✗ mkdir cert
➜  server git:(master) ✗ cd cert 
➜  cert git:(master) ✗ openssl genrsa -out chyingp-key.pem 2048
Generating RSA private key, 2048 bit long modulus
.............................+++
..........................................+++
e is 65537 (0x10001)
➜  cert git:(master) ✗ openssl req -new -sha256 -key chyingp-key.pem -out chyingp-csr.pem
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:CN
State or Province Name (full name) [Some-State]:Guangdong
Locality Name (eg, city) []:Shenzhen
Organization Name (eg, company) [Internet Widgits Pty Ltd]:YH
Organizational Unit Name (eg, section) []:web
Common Name (e.g. server FQDN or YOUR name) []:www.chyingp.com
Email Address []:416394284@qq.com

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:123456
An optional company name []:YH
➜  cert git:(master) ✗ openssl x509 -req -in chyingp-csr.pem -signkey chyingp-key.pem -out chyingp-cert.pem
```

## 私有CA签名的证书



首先，创建自签名的CA证书

```bash
# 创建ca的私钥
openssl genrsa -out my-ca.key.pem 2048

# 创建ca的证书
openssl req \
  -x509 \
  -new \
  -nodes \
  -key my-ca.key.pem \
  -days 1024 \
  -out my-ca.crt.pem \
  -subj "/C=CN/ST=Guandong/L=Shenzhen/O=YH Inc/CN=chyingp.com"
```

然后，创建用CA的私钥进行签名的网站证书

```bash
# 创建私钥
openssl genrsa \
  -out my-server.key.pem \
  2048  

# 创建证书签名请求
openssl req -new \
  -key my-server.key.pem \
  -out my-server.csr.pem \
  -subj "/C=CN/ST=Guandong/L=Shenzhen/O=YH Inc/CN=www.chyingp.com"

# 创建网站证书
openssl x509 \
  -req -in my-server.csr.pem \
  -CA my-ca.crt.pem \
  -CAkey my-ca.key.pem \
  -CAcreateserial \
  -out my-server.crt.pem \
  -days 500  
```



# log4js入门实例

对于线上项目用来说，日志是非常重要的一环。log4js是使用得比较多的一个日志组件，经常跟Express一起配合使用。本文从入门实例开始，讲解log4js的使用，以及如何跟Express进行整合。

## 入门例子



输出日志如下，包括日志打印时间、日志级别、日志分类、日志内容。

```javascript
// started.js
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.debug('hello world');

// 输出： 
// [2017-02-28 21:28:22.853] [DEBUG] [default] - hello world
```

## 日志级别



`logger.setLevel('INFO');` 表示想要打印的最低级别的日志是`INFO`，也就是说，调用类似`logger.debug()`等级别低于`INFO`的接口，日志是不会打印出来的。

```javascript
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.setLevel('INFO');

logger.debug('level: debug');
logger.info('level: info');
logger.error('level: error');

// 输出如下：
// [2017-02-28 21:50:45.372] [INFO] [default] - level: info
// [2017-02-28 21:50:45.376] [ERROR] [default] - level: error
```

## 日志类别



除级别外，还可以对日志进行分类，`log4js.getLogger(category)`，如下所示

```javascript
var log4js = require('log4js');
var alogger = log4js.getLogger('category-a');
var blogger = log4js.getLogger('category-b');

alogger.info('hello');
blogger.info('hello');

// 输出如下：
// [2017-02-28 22:36:57.570] [INFO] category-a - hello
// [2017-02-28 22:36:57.574] [INFO] category-b - hello
```

## appenders



appenders指定日志输出的位置，可以同时配置多个，用category进行区分。比如 `log4js.getLogger('info')` 应用的就是 `type` 为 `dateFile` 的配置。

可以注意到，`type` 为 `console` 的配置没有声明 `category` ，因此，所有的日志都会打印到控制台。

```javascript
var log4js = require('log4js');

log4js.configure({
    appenders: [
        { type: 'console'},
        { type: 'dateFile', filename: './logs/info.log', category: 'info' }
    ]
});

var logger = log4js.getLogger('info');
logger.setLevel('INFO');

logger.trace('trace');
logger.debug('debug');
logger.info('info');

// 输出如下：
// [2017-02-28 22:51:30.723] [INFO] info - info
```

## express应用



一个比较简单的例子如下，日志全部打印到控制台。

```javascript
var express = require('express');
var log4js = require('log4js');
var app = express();

log4js.configure({
    appenders: [
        { type: 'console', category: 'app' }
    ]
});

var logger = log4js.getLogger('app');

logger.setLevel('INFO');  // 级别 > INFO 的日志才会被打印

app.use( log4js.connectLogger(logger) );

app.use(function(req, res, next){
    res.send('ok');
});

app.listen(3000);
```

访问 http://127.0.0.1:3000 ，打印日志如下

```bash
[2017-03-01 00:28:29.301] [INFO] app - ::ffff:127.0.0.1 - - "GET / HTTP/1.1" 304 - "" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
```

`log4js.connectLogger(logger)` 时，可以声明日志的级别。

```javascript
// 级别 > INFO 的日志才会被打印
logger.setLevel('INFO'); 

// 日志的级别是 WARN 
app.use( log4js.connectLogger(logger, {level: 'WARN'}) );
```

注意，如果声明的日志级别低于`logger.setLevel(level)`限定的级别，那么日志不会被打印，如下例子。

```javascript
logger.setLevel('INFO'); 

app.use( log4js.connectLogger(logger, {level: 'DEBUG'}) );
```

## 相关链接



官网：https://github.com/nomiddlename/log4js-node



#  node8_napi

## N-API简介



Node.js 8.0 在2017年6月份发布，升级的特性中，包含了N-API。编写过或者使用过 node扩展的同学，不少都遇到过升级node版本，node扩展编译失败的情况。因为node扩展严重依赖于V8暴露的API，而node不同版本依赖的V8版本可能不同，一旦升级node版本，原先运行正常的node扩展就编译失败了。

这种情况对node生态圈无疑是不利的，N-API的引入正是试图改善这种情况的一种尝试。它跟底层JS引擎无关，只要N-API暴露的API足够稳定，那么node扩展的编写者就不用过分担忧node的升级问题。

## 如何使用N-API



先强调一点，N-API并不是对原有node扩展实现方式的替代，它只是提供了一系列底层无关的API，来帮助开发者编写跨版本的node扩展。至于如何编写、编译、使用扩展，跟原来的差不多。

本文会从一个超级简单的例子，简单介绍N-API的使用，包括环境准备、编写扩展、编译、运行几个步骤。

> 备注：当前N-API还处于试验阶段，官方文档提供的例子都是有问题的，如用于生产环境需格外谨慎。

## 1、环境准备



首先，N-API是8.0版本引入的，首先确保本地安装了8.0版本。笔者用的是`nvm`，读者可自行选择安装方式。

```bash
nvm i 8.0
nvm use 8.0
```

然后，安装`node-gyp`，编译扩展会用到。

```bash
npm install -g node-gyp
```

创建项目目录，并初始化`package.json`。

```bash
mkdir hello & cd hello # 目录名随便起
npm init -f
```

## 2、编写扩展



创建`hello.cc`作为扩展的源文件。

```bash
mkdir src
touch src/hello.cc
```

编辑`hello.cc`，输入如下内容。

```c
#include <node_api.h>

// 实际暴露的方法，这里只是简单返回一个字符串
napi_value HelloMethod (napi_env env, napi_callback_info info) {
    napi_value world;
    napi_create_string_utf8(env, "world", 5, &world);
    return world;
}

// 扩展的初始化方法，其中 
// env：环境变量
// exports、module：node模块中对外暴露的对象
void Init (napi_env env, napi_value exports, napi_value module, void* priv) {
    // napi_property_descriptor 为结构体，作用是描述扩展暴露的 属性/方法 的描述
    napi_property_descriptor desc = { "hello", 0, HelloMethod, 0, 0, 0, napi_default, 0 };
    napi_define_properties(env, exports, 1, &desc);  // 定义暴露的方法
}

NAPI_MODULE(hello, Init);  // 注册扩展，扩展名叫做hello，Init为扩展的初始化方法
```

## 3、编译扩展



首先，创建编译描述文件`binding.gyp`。

```json
{
  "targets": [
    {
      "target_name": "hello",
      "sources": [ "./src/hello.cc" ]
    }
  ]
}
```

然后，运行如下命令进行编译。

```bash
node-gyp rebuild
```

## 4、调用扩展



未方便调用扩展，先安装`bindings`。

```bash
npm install --save bindings
```

然后，创建`app.js`，调用刚编译的扩展。

```javascript
var addon = require('bindings')('hello');

console.log( addon.hello() );  // world
```

运行代码，由于N-API当前尚处于Experimental阶段，记得加上`--napi-modules`标记。

```bash
node --napi-modules app.js
```

输出如下

```bash
{"path":"/data/github/abi-stable-node-addon-examples/1_hello_world/napi/build/Release/hello.node"}
world
(node:6500) Warning: N-API is an experimental feature and could change at any time.
```

## 相关链接



N-API：https://nodejs.org/api/n-api.html

C++ Addons：https://nodejs.org/api/addons.html



# 使用async控制并发

## 目标



建立一个 lesson5 项目，在其中编写代码。

代码的入口是 `app.js`，当调用 `node app.js` 时，它会输出 CNode(https://cnodejs.org/ ) 社区首页的所有主题的标题，链接和第一条评论，以 json 的格式。

注意：与上节课不同，并发连接数需要控制在 5 个。

输出示例：

```js
[
  {
    "title": "【公告】发招聘帖的同学留意一下这里",
    "href": "http://cnodejs.org/topic/541ed2d05e28155f24676a12",
    "comment1": "呵呵呵呵"
  },
  {
    "title": "发布一款 Sublime Text 下的 JavaScript 语法高亮插件",
    "href": "http://cnodejs.org/topic/54207e2efffeb6de3d61f68f",
    "comment1": "沙发！"
  }
]
```

## 知识点



1. 学习 async(https://github.com/caolan/async ) 的使用。这里有个详细的 async demo 演示：https://github.com/alsotang/async_demo
2. 学习使用 async 来控制并发连接数。

## 课程内容



lesson4 的代码其实是不完美的。为什么这么说，是因为在 lesson4 中，我们一次性发了 40 个并发请求出去，要知道，除去 CNode 的话，别的网站有可能会因为你发出的并发连接数太多而当你是在恶意请求，把你的 IP 封掉。

我们在写爬虫的时候，如果有 1000 个链接要去爬，那么不可能同时发出 1000 个并发链接出去对不对？我们需要控制一下并发的数量，比如并发 10 个就好，然后慢慢抓完这 1000 个链接。

用 async 来做这件事很简单。

这次我们要介绍的是 async 的 `mapLimit(arr, limit, iterator, callback)` 接口。另外，还有个常用的控制并发连接数的接口是 `queue(worker, concurrency)`，大家可以去 https://github.com/caolan/async#queueworker-concurrency 看看说明。

这回我就不带大家爬网站了，我们来专注知识点：并发连接数控制。

对了，还有个问题是，什么时候用 eventproxy，什么时候使用 async 呢？它们不都是用来做异步流程控制的吗？

我的答案是：

当你需要去多个源(一般是小于 10 个)汇总数据的时候，用 eventproxy 方便；当你需要用到队列，需要控制并发数，或者你喜欢函数式编程思维时，使用 async。大部分场景是前者，所以我个人大部分时间是用 eventproxy 的。

正题开始。

首先，我们伪造一个 `fetchUrl(url, callback)` 函数，这个函数的作用就是，当你通过

```js
fetchUrl('http://www.baidu.com', function (err, content) {
  // do something with `content`
});
```

调用它时，它会返回 `http://www.baidu.com` 的页面内容回来。

当然，我们这里的返回内容是假的，返回延时是随机的。并且在它被调用时，会告诉你它现在一共被多少个地方并发调用着。

```js
// 并发连接数的计数器
var concurrencyCount = 0;
var fetchUrl = function (url, callback) {
  // delay 的值在 2000 以内，是个随机的整数
  var delay = parseInt((Math.random() * 10000000) % 2000, 10);
  concurrencyCount++;
  console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');
  setTimeout(function () {
    concurrencyCount--;
    callback(null, url + ' html content');
  }, delay);
};
```

我们接着来伪造一组链接

```js
var urls = [];
for(var i = 0; i < 30; i++) {
  urls.push('http://datasource_' + i);
}
```

这组链接的长这样：

![img](https://raw.githubusercontent.com/alsotang/node-lessons/master/lesson5/1.png)

接着，我们使用 `async.mapLimit` 来并发抓取，并获取结果。

```js
async.mapLimit(urls, 5, function (url, callback) {
  fetchUrl(url, callback);
}, function (err, result) {
  console.log('final:');
  console.log(result);
});
```

运行输出是这样的：

![img](https://raw.githubusercontent.com/alsotang/node-lessons/master/lesson5/2.png)

可以看到，一开始，并发链接数是从 1 开始增长的，增长到 5 时，就不再增加。当其中有任务完成时，再继续抓取。并发连接数始终控制在 5 个。

完整代码请参见 app.js 文件。

```json
{
  "name": "lesson5",
  "version": "0.0.0",
  "description": "使用 async 控制并发",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "alsotang <alsotang@gmail.com>",
  "license": "MIT",
  "dependencies": {
    "async": "^0.9.0"
  }
}
var async = require('async');

var concurrencyCount = 0;
var fetchUrl = function (url, callback) {
  var delay = parseInt((Math.random() * 10000000) % 2000, 10);
  concurrencyCount++;
  console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');
  setTimeout(function () {
    concurrencyCount--;
    callback(null, url + ' html content');
  }, delay);
};

var urls = [];
for(var i = 0; i < 30; i++) {
  urls.push('http://datasource_' + i);
}

async.mapLimit(urls, 5, function (url, callback) {
  fetchUrl(url, callback);
}, function (err, result) {
  console.log('final:');
  console.log(result);
});
```



# 使用eventproxy控制并发

## 目标



建立一个 lesson4 项目，在其中编写代码。

代码的入口是 `app.js`，当调用 `node app.js` 时，它会输出 CNode(https://cnodejs.org/ ) 社区首页的所有主题的标题，链接和第一条评论，以 json 的格式。

输出示例：

```js
[
  {
    "title": "【公告】发招聘帖的同学留意一下这里",
    "href": "http://cnodejs.org/topic/541ed2d05e28155f24676a12",
    "comment1": "呵呵呵呵"
  },
  {
    "title": "发布一款 Sublime Text 下的 JavaScript 语法高亮插件",
    "href": "http://cnodejs.org/topic/54207e2efffeb6de3d61f68f",
    "comment1": "沙发！"
  }
]
```

## 挑战



以上文目标为基础，输出 `comment1` 的作者，以及他在 cnode 社区的积分值。

示例：

```js
[
  {
    "title": "【公告】发招聘帖的同学留意一下这里",
    "href": "http://cnodejs.org/topic/541ed2d05e28155f24676a12",
    "comment1": "呵呵呵呵",
    "author1": "auser",
    "score1": 80
  },
  ...
]
```

## 知识点



1. 体会 Node.js 的 callback hell 之美
2. 学习使用 eventproxy 这一利器控制并发

## 课程内容



*注意，cnodejs.org 网站有并发连接数的限制，所以当请求发送太快的时候会导致返回值为空或报错。建议一次抓取3个主题即可。文中的40只是为了方便讲解*

这一章我们来到了 Node.js 最牛逼的地方——异步并发的内容了。

上一课我们介绍了如何使用 superagent 和 cheerio 来取主页内容，那只需要发起一次 http get 请求就能办到。但这次，我们需要取出每个主题的第一条评论，这就要求我们对每个主题的链接发起请求，并用 cheerio 去取出其中的第一条评论。

CNode 目前每一页有 40 个主题，于是我们就需要发起 1 + 40 个请求，来达到我们这一课的目标。

后者的 40 个请求，我们并发地发起：），而且不会遇到多线程啊锁什么的，Node.js 的并发模型跟多线程不同，抛却那些观念。更具体一点的话，比如异步到底为何异步，Node.js 为何单线程却能并发这类走近科学的问题，我就不打算讲了。对于这方面有兴趣的同学，强烈推荐 @朴灵 的 《九浅一深Node.js》： http://book.douban.com/subject/25768396/ 。

有些逼格比较高的朋友可能听说过 promise 和 generator 这类概念。不过我呢，只会讲 callback，主要原因是我个人只喜欢 callback。

这次课程我们需要用到三个库：superagent cheerio eventproxy(https://github.com/JacksonTian/eventproxy )

手脚架的工作各位自己来，我们一步一步来一起写出这个程序。

首先 app.js 应该长这样

```js
var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
// url 模块是 Node.js 标准库里面的
// http://nodejs.org/api/url.html
var url = require('url');

var cnodeUrl = 'https://cnodejs.org/';

superagent.get(cnodeUrl)
  .end(function (err, res) {
    if (err) {
      return console.error(err);
    }
    var topicUrls = [];
    var $ = cheerio.load(res.text);
    // 获取首页所有的链接
    $('#topic_list .topic_title').each(function (idx, element) {
      var $element = $(element);
      // $element.attr('href') 本来的样子是 /topic/542acd7d5d28233425538b04
      // 我们用 url.resolve 来自动推断出完整 url，变成
      // https://cnodejs.org/topic/542acd7d5d28233425538b04 的形式
      // 具体请看 http://nodejs.org/api/url.html#url_url_resolve_from_to 的示例
      var href = url.resolve(cnodeUrl, $element.attr('href'));
      topicUrls.push(href);
    });

    console.log(topicUrls);
  });
```

运行 `node app.js`

输出如下图：

![img](https://raw.githubusercontent.com/alsotang/node-lessons/master/lesson4/1.png)

OK，这时候我们已经得到所有 url 的地址了，接下来，我们把这些地址都抓取一遍，就完成了，Node.js 就是这么简单。

抓取之前，还是得介绍一下 eventproxy 这个库。

用 js 写过异步的同学应该都知道，如果你要并发异步获取两三个地址的数据，并且要在获取到数据之后，对这些数据一起进行利用的话，常规的写法是自己维护一个计数器。

先定义一个 `var count = 0`，然后每次抓取成功以后，就 `count++`。如果你是要抓取三个源的数据，由于你根本不知道这些异步操作到底谁先完成，那么每次当抓取成功的时候，就判断一下 `count === 3`。当值为真时，使用另一个函数继续完成操作。

而 eventproxy 就起到了这个计数器的作用，它来帮你管理到底这些异步操作是否完成，完成之后，它会自动调用你提供的处理函数，并将抓取到的数据当参数传过来。

假设我们不使用 eventproxy 也不使用计数器时，抓取三个源的写法是这样的：

```js
// 参考 jquery 的 $.get 的方法
$.get("http://data1_source", function (data1) {
  // something
  $.get("http://data2_source", function (data2) {
    // something
    $.get("http://data3_source", function (data3) {
      // something
      var html = fuck(data1, data2, data3);
      render(html);
    });
  });
});
```

上述的代码大家都写过吧。先获取 data1，获取完成之后获取 data2，然后再获取 data3，然后 fuck 它们，进行输出。

但大家应该也想到了，其实这三个源的数据，是可以并行去获取的，data2 的获取并不依赖 data1 的完成，data3 同理也不依赖 data2。

于是我们用计数器来写，会写成这样：

```js
(function () {
  var count = 0;
  var result = {};

  $.get('http://data1_source', function (data) {
    result.data1 = data;
    count++;
    handle();
    });
  $.get('http://data2_source', function (data) {
    result.data2 = data;
    count++;
    handle();
    });
  $.get('http://data3_source', function (data) {
    result.data3 = data;
    count++;
    handle();
    });

  function handle() {
    if (count === 3) {
      var html = fuck(result.data1, result.data2, result.data3);
      render(html);
    }
  }
})();
```

~~丑的一逼，~~也不算丑，主要我写代码好看。

如果我们用 eventproxy，写出来是这样的：

```js
var ep = new eventproxy();
ep.all('data1_event', 'data2_event', 'data3_event', function (data1, data2, data3) {
  var html = fuck(data1, data2, data3);
  render(html);
});

$.get('http://data1_source', function (data) {
  ep.emit('data1_event', data);
  });

$.get('http://data2_source', function (data) {
  ep.emit('data2_event', data);
  });

$.get('http://data3_source', function (data) {
  ep.emit('data3_event', data);
  });
```

好看多了是吧，也就是个高等计数器嘛。

```
ep.all('data1_event', 'data2_event', 'data3_event', function (data1, data2, data3) {});
```

这一句，监听了三个事件，分别是 `data1_event, data2_event, data3_event`，每次当一个源的数据抓取完成时，就通过 `ep.emit()` 来告诉 `ep` 自己，某某事件已经完成了。

当三个事件未同时完成时，`ep.emit()` 调用之后不会做任何事；当三个事件都完成的时候，就会调用末尾的那个回调函数，来对它们进行统一处理。

eventproxy 提供了不少其他场景所需的 API，但最最常用的用法就是以上的这种，即：

1. 先 `var ep = new eventproxy();` 得到一个 eventproxy 实例。
2. 告诉它你要监听哪些事件，并给它一个回调函数。`ep.all('event1', 'event2', function (result1, result2) {})`。
3. 在适当的时候 `ep.emit('event_name', eventData)`。

eventproxy 这套处理异步并发的思路，我一直觉得就像是汇编里面的 goto 语句一样，程序逻辑在代码中随处跳跃。本来代码已经执行到 100 行了，突然 80 行的那个回调函数又开始工作了。如果你异步逻辑复杂点的话，80 行的这个函数完成之后，又激活了 60 行的另外一个函数。并发和嵌套的问题虽然解决了，但老祖宗们消灭了几十年的 goto 语句又回来了。

至于这套思想糟糕不糟糕，我个人倒是觉得还是不糟糕，用熟了看起来蛮清晰的。不过 js 这门渣渣语言本来就乱嘛，什么变量提升（http://www.cnblogs.com/damonlan/archive/2012/07/01/2553425.html ）啊，没有 main 函数啊，变量作用域啊，数据类型常常简单得只有数字、字符串、哈希、数组啊，这一系列的问题，都不是事儿。

编程语言美丑啥的，咱心中有佛就好。

回到正题，之前我们已经得到了一个长度为 40 的 `topicUrls` 数组，里面包含了每条主题的链接。那么意味着，我们接下来要发出 40 个并发请求。我们需要用到 eventproxy 的 `#after` API。

大家自行学习一下这个 API 吧：https://github.com/JacksonTian/eventproxy#%E9%87%8D%E5%A4%8D%E5%BC%82%E6%AD%A5%E5%8D%8F%E4%BD%9C

我代码就直接贴了哈。

```js
// 得到 topicUrls 之后

// 得到一个 eventproxy 的实例
var ep = new eventproxy();

// 命令 ep 重复监听 topicUrls.length 次（在这里也就是 40 次） `topic_html` 事件再行动
ep.after('topic_html', topicUrls.length, function (topics) {
  // topics 是个数组，包含了 40 次 ep.emit('topic_html', pair) 中的那 40 个 pair

  // 开始行动
  topics = topics.map(function (topicPair) {
    // 接下来都是 jquery 的用法了
    var topicUrl = topicPair[0];
    var topicHtml = topicPair[1];
    var $ = cheerio.load(topicHtml);
    return ({
      title: $('.topic_full_title').text().trim(),
      href: topicUrl,
      comment1: $('.reply_content').eq(0).text().trim(),
    });
  });

  console.log('final:');
  console.log(topics);
});

topicUrls.forEach(function (topicUrl) {
  superagent.get(topicUrl)
    .end(function (err, res) {
      console.log('fetch ' + topicUrl + ' successful');
      ep.emit('topic_html', [topicUrl, res.text]);
    });
});
```

输出长这样：

![img](https://raw.githubusercontent.com/alsotang/node-lessons/master/lesson4/2.png)

完整的代码请查看 lesson4 目录下的 app.js 文件

```json
{
  "name": "lesson4",
  "version": "0.0.0",
  "description": "使用 eventproxy 控制并发",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "alsotang <alsotang@gmail.com>",
  "license": "MIT",
  "dependencies": {
    "cheerio": "^0.17.0",
    "eventproxy": "^0.3.1",
    "superagent": "^0.20.0"
  }
}
//app.js
var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');

var cnodeUrl = 'https://cnodejs.org/';

superagent.get(cnodeUrl)
  .end(function (err, res) {
    if (err) {
      return console.error(err);
    }
    var topicUrls = [];
    var $ = cheerio.load(res.text);
    $('#topic_list .topic_title').each(function (idx, element) {
      var $element = $(element);
      var href = url.resolve(cnodeUrl, $element.attr('href'));
      topicUrls.push(href);
    });

    var ep = new eventproxy();

    ep.after('topic_html', topicUrls.length, function (topics) {
      topics = topics.map(function (topicPair) {
        var topicUrl = topicPair[0];
        var topicHtml = topicPair[1];
        var $ = cheerio.load(topicHtml);
        return ({
          title: $('.topic_full_title').text().trim(),
          href: topicUrl,
          comment1: $('.reply_content').eq(0).text().trim(),
        });
      });

      console.log('final:');
      console.log(topics);
    });

    topicUrls.forEach(function (topicUrl) {
      superagent.get(topicUrl)
        .end(function (err, res) {
          console.log('fetch ' + topicUrl + ' successful');
          ep.emit('topic_html', [topicUrl, res.text]);
        });
    });
  });
```



# 使用superagent 与 cheerio 完成简单爬虫

## 目标

建立一个 lesson3 项目，在其中编写代码。

当在浏览器中访问 `http://localhost:3000/` 时，输出 CNode(https://cnodejs.org/ ) 社区首页的所有帖子标题和链接，以 json 的形式。

输出示例：

```js
[
  {
    "title": "【公告】发招聘帖的同学留意一下这里",
    "href": "http://cnodejs.org/topic/541ed2d05e28155f24676a12"
  },
  {
    "title": "发布一款 Sublime Text 下的 JavaScript 语法高亮插件",
    "href": "http://cnodejs.org/topic/54207e2efffeb6de3d61f68f"
  }
]
```

## 挑战

访问 `http://localhost:3000/` 时，输出包括主题的作者，

示例：

```js
[
  {
    "title": "【公告】发招聘帖的同学留意一下这里",
    "href": "http://cnodejs.org/topic/541ed2d05e28155f24676a12",
    "author": "alsotang"
  },
  {
    "title": "发布一款 Sublime Text 下的 JavaScript 语法高亮插件",
    "href": "http://cnodejs.org/topic/54207e2efffeb6de3d61f68f",
    "author": "otheruser"
  }
]
```

## 知识点

1. 学习使用 superagent 抓取网页
2. 学习使用 cheerio 分析网页

## 课程内容

Node.js 总是吹牛逼说自己异步特性多么多么厉害，但是对于初学者来说，要找一个能好好利用异步的场景不容易。我想来想去，爬虫的场景就比较适合，没事就异步并发地爬几个网站玩玩。

本来想教大家怎么爬 github 的 api 的，但是 github 有 rate limit 的限制，所以只好牺牲一下 CNode 社区（国内最专业的 Node.js 开源技术社区），教大家怎么去爬它了。

我们这回需要用到三个依赖，分别是 express，superagent 和 cheerio。

先介绍一下，

superagent(http://visionmedia.github.io/superagent/ ) 是个 http 方面的库，可以发起 get 或 post 请求。

cheerio(https://github.com/cheeriojs/cheerio ) 大家可以理解成一个 Node.js 版的 jquery，用来从网页中以 css selector 取数据，使用方式跟 jquery 一样一样的。

还记得我们怎么新建一个项目吗？

1. 新建一个文件夹，进去之后 `npm init`
2. 安装依赖 `npm install --save PACKAGE_NAME`
3. 写应用逻辑

我们应用的核心逻辑长这样

```js
app.get('/', function (req, res, next) {
  // 用 superagent 去抓取 https://cnodejs.org/ 的内容
  superagent.get('https://cnodejs.org/')
    .end(function (err, sres) {
      // 常规的错误处理
      if (err) {
        return next(err);
      }
      // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
      // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
      // 剩下就都是 jquery 的内容了
      var $ = cheerio.load(sres.text);
      var items = [];
      $('#topic_list .topic_title').each(function (idx, element) {
        var $element = $(element);
        items.push({
          title: $element.attr('title'),
          href: $element.attr('href')
        });
      });

      res.send(items);
    });
});
```

OK，一个简单的爬虫就是这么简单。这里我们还没有利用到 Node.js 的异步并发特性。不过下两章内容都是关于异步控制的。

记得好好看看 superagent 的 API，它把链式调用的风格玩到了极致。

```json
{
  "name": "lesson3",
  "version": "0.0.0",
  "description": "使用 superagent 与 cheerio 完成简单爬虫",
  "main": "app.js",
  "dependencies": {
    "cheerio": "^0.17.0",
    "express": "^4.9.5",
    "superagent": "^0.20.0"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "alsotang <alsotang@gmail.com>",
  "license": "MIT"
}
//app.js
var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');

var app = express();

app.get('/', function (req, res, next) {
  superagent.get('https://cnodejs.org/')
    .end(function (err, sres) {
      if (err) {
        return next(err);
      }
      var $ = cheerio.load(sres.text);
      var items = [];
      $('#topic_list .topic_title').each(function (idx, element) {
        var $element = $(element);
        items.push({
          title: $element.attr('title'),
          href: $element.attr('href')
        });
      });

      res.send(items);
    });
});


app.listen(3000, function () {
  console.log('app is listening at port 3000');
});
```

# 基于express+muter的文件上传

## 概览

图片上传是web开发中经常用到的功能，node社区在这方面也有了相对完善的支持。

常用的开源组件有**multer**、**formidable**等，借助这两个开源组件，可以轻松搞定图片上传。

## 环境初始化

非常简单，一行命令。

```bash
npm install express multer multer --save
```

每个示例下面，都有下面两个文件

```bash
➜  upload-custom-filename git:(master) ✗ tree -L 1
.
├── app.js # 服务端代码，用来处理文件上传请求
├── form.html # 前端页面，用来上传文件
```

## 基础例子：单图上传

```javascript
var fs = require('fs');
var express = require('express');
var multer  = require('multer')

var app = express();
var upload = multer({ dest: 'upload/' });

// 单图上传
app.post('/upload', upload.single('logo'), function(req, res, next){
    res.send({ret_code: '0'});
});

app.get('/form', function(req, res, next){
    var form = fs.readFileSync('./form.html', {encoding: 'utf8'});
    res.send(form);
});

app.listen(3000);
<form action="/upload" method="post" enctype="multipart/form-data">
    <h2>单图上传</h2>
    <input type="file" name="logo">
    <input type="submit" value="提交">
</form>
```

运行服务。

```bash
node app.js
```

访问 http://127.0.0.1:3000/form ，选择图片，点击“提交”，done。然后，你就会看到 upload 目录下多了个图片。

## 基础例子：多图上传

代码简直不能更简单，将前面的 upload.single('logo') 改成 upload.array('logo', 2) 就行。表示：同时支持2张图片上传，并且 name 属性为 logo。

```javascript
var fs = require('fs');
var express = require('express');
var multer  = require('multer')

var app = express();
var upload = multer({ dest: 'upload/' });

// 多图上传
app.post('/upload', upload.array('logo', 2), function(req, res, next){
    res.send({ret_code: '0'});
});

app.get('/form', function(req, res, next){
    var form = fs.readFileSync('./form.html', {encoding: 'utf8'});
    res.send(form);
});

app.listen(3000);
<form action="/upload" method="post" enctype="multipart/form-data">
    <h2>多图上传</h2>
    <input type="file" name="logos">
    <input type="file" name="logos">
    <input type="submit" value="提交">
</form>
```

同样的测试步骤，不赘述。

## 获取上传的图片的信息

很多时候，除了将图片保存在服务器外，我们还需要做很多其他事情，比如将图片的信息存到数据库里。

常用的信息比如原始文件名、文件类型、文件大小、本地保存路径等。借助multer，我们可以很方便的获取这些信息。

还是单文件上传的例子，此时，multer会将文件的信息写到 req.file 上，如下代码所示。

```javascript
var fs = require('fs');
var express = require('express');
var multer  = require('multer')

var app = express();
var upload = multer({ dest: 'upload/' });

// 单图上传
app.post('/upload', upload.single('logo'), function(req, res, next){
    var file = req.file;

    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);

    res.send({ret_code: '0'});
});

app.get('/form', function(req, res, next){
    var form = fs.readFileSync('./form.html', {encoding: 'utf8'});
    res.send(form);
});

app.listen(3000);
<form action="/upload" method="post" enctype="multipart/form-data">
    <h2>单图上传</h2>
    <input type="file" name="logo">
    <input type="submit" value="提交">
</form>
```

启动服务，上传文件后，就会看到控制台下打印出的信息。

```bash
文件类型：image/png
原始文件名：1.png
文件大小：18379
文件保存路径：upload/b7e4bb22375695d92689e45b551873d9
```

## 自定义文件上传路径、名称

有的时候，我们想要定制文件上传的路径、名称，multer也可以方便的实现。

### 自定义本地保存的路径

非常简单，比如我们想将文件上传到 my-upload 目录下，修改下 dest 配置项就行。

```javascript
var upload = multer({ dest: 'upload/' });
```

在上面的配置下，所有资源都是保存在同个目录下。有时我们需要针对不同文件进行个性化设置，那么，可以参考下一小节的内容。

### 自定义本地保存的文件名

代码稍微长一点，单同样简单。multer 提供了 **storage** 这个参数来对资源保存的路径、文件名进行个性化设置。

使用注意事项如下：

- destination：设置资源的保存路径。注意，如果没有这个配置项，默认会保存在 /tmp/uploads 下。此外，路径需要自己创建。
- filename：设置资源保存在本地的文件名。

[app.js](http://interview.poetries.top/fe-nodejs-docs/nodejs-docs/examples/2016.11.07-advanced-express-multer/upload-custom-filename/app.js)。

```javascript
var fs = require('fs');
var express = require('express');
var multer  = require('multer')

var app = express();

var createFolder = function(folder){
    try{
        fs.accessSync(folder); 
    }catch(e){
        fs.mkdirSync(folder);
    }  
};

var uploadFolder = './upload/';

createFolder(uploadFolder);

// 通过 filename 属性定制
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        cb(null, file.fieldname + '-' + Date.now());  
    }
});

// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage })

// 单图上传
app.post('/upload', upload.single('logo'), function(req, res, next){
    var file = req.file;
    res.send({ret_code: '0'});
});

app.get('/form', function(req, res, next){
    var form = fs.readFileSync('./form.html', {encoding: 'utf8'});
    res.send(form);
});

app.listen(3000);
<form action="/upload" method="post" enctype="multipart/form-data">
    <h2>单图上传</h2>
    <input type="file" name="logo">
    <input type="submit" value="提交">
</form>
```

测试步骤不赘述，访问一下就知道效果了。

## 写在后面

本文对multer的基础用法进行了介绍，并未涉及过多原理性的东西。俗话说 **授人以渔不如授人以渔**，在后续的章节里，会对文件上传的细节进行挖掘，好让读者朋友对文件上传加深进一步的认识。

## 相关链接

multer官方文档：https://github.com/expressjs/multer



# 将图片转成datauri嵌入到html

## 问题：将图片转成datauri

今天，在QQ群有个群友问了个问题：“nodejs读取图片，转成base64，怎么读取呢？” 想了一下，他想问的应该是 怎么样把图片嵌入到网页中去，即如何把图片转成对应的 datauri。

是个不错的问题，而且也是个很常用的功能。快速实现了个简单的demo，这里顺便记录一下。

## 实现思路

思路很直观：1、读取图片二进制数据 -> 2、转成base64字符串 -> 3、转成datauri。

关于base64的介绍，可以参考阮一峰老师的[文章 (opens new window)](http://www.ruanyifeng.com/blog/2008/06/base64.html)。而 datauri 的格式如下

> data:[][;base64],

具体到png图片，大概如下，其中 “xxx” 就是前面的base64字符串了。接下来，我们看下在nodejs里该如何实现

> data: image/png;base64, xxx

## 具体实现

首先，读取本地图片二进制数据。

```js
var fs = require('fs');
var filepath = './1.png';

var bData = fs.readFileSync(filepath);
```

然后，将二进制数据转换成base64编码的字符串。

```js
var base64Str = bData.toString('base64');
```

最后，转换成datauri的格式。

```js
var datauri = 'data:image/png;base64,' + base64Str;
```

完整例子代码如下，代码非常少：

```js
var fs = require('fs');
var filepath = './1.png';

var bData = fs.readFileSync(filepath);
var base64Str = bData.toString('base64');
var datauri = 'data:image/png;base64,' + base64Str;

console.log(datauri);
```

## 相关链接

Base64笔记：http://www.ruanyifeng.com/blog/2008/06/base64.html Data URIs：https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs



# 常用中间件 body_parser实现解析

## 写在前面

`body-parser`是非常常用的一个`express`中间件，作用是对http请求体进行解析。使用非常简单，以下两行代码已经覆盖了大部分的使用场景。

```javascript
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
```

本文从简单的例子出发，探究`body-parser`的内部实现。至于`body-parser`如何使用，感兴趣的同学可以参考[官方文档 (opens new window)](https://github.com/expressjs/body-parser/)。

## 入门基础

在正式讲解前，我们先来看一个POST请求的报文，如下所示。

```http
POST /test HTTP/1.1
Host: 127.0.0.1:3000
Content-Type: text/plain; charset=utf8
Content-Encoding: gzip

chyingp
```

其中需要我们注意的有`Content-Type`、`Content-Encoding`以及报文主体：

- Content-Type：请求报文主体的类型、编码。常见的类型有`text/plain`、`application/json`、`application/x-www-form-urlencoded`。常见的编码有`utf8`、`gbk`等。
- Content-Encoding：声明报文主体的压缩格式，常见的取值有`gzip`、`deflate`、`identity`。
- 报文主体：这里是个普通的文本字符串`chyingp`。

## body-parser主要做了什么

`body-parser`实现的要点如下：

1. 处理不同类型的请求体：比如`text`、`json`、`urlencoded`等，对应的报文主体的格式不同。
2. 处理不同的编码：比如`utf8`、`gbk`等。
3. 处理不同的压缩类型：比如`gzip`、`deflare`等。
4. 其他边界、异常的处理。

## 一、处理不同类型请求体

为了方便读者测试，以下例子均包含服务端、客户端代码，完整代码可在[笔者github (opens new window)](https://github.com/chyingp/nodejs-learning-guide/tree/master/examples/2017.05.20-express-body-parser)上找到。

### 解析text/plain

客户端请求的代码如下，采用默认编码，不对请求体进行压缩。请求体类型为`text/plain`。

```javascript
var http = require('http');

var options = {
    hostname: '127.0.0.1',
    port: '3000',
    path: '/test',
    method: 'POST',
    headers: {
        'Content-Type': 'text/plain',
        'Content-Encoding': 'identity'
    }
};

var client = http.request(options, (res) => {
    res.pipe(process.stdout);
});

client.end('chyingp');
```

服务端代码如下。`text/plain`类型处理比较简单，就是buffer的拼接。

```javascript
var http = require('http');

var parsePostBody = function (req, done) {
    var arr = [];
    var chunks;

    req.on('data', buff => {
        arr.push(buff);
    });

    req.on('end', () => {
        chunks = Buffer.concat(arr);
        done(chunks);
    });
};

var server = http.createServer(function (req, res) {
    parsePostBody(req, (chunks) => {
        var body = chunks.toString();
        res.end(`Your nick is ${body}`)
    });
});

server.listen(3000);
```

### 解析application/json

客户端代码如下，把`Content-Type`换成`application/json`。

```javascript
var http = require('http');
var querystring = require('querystring');

var options = {
    hostname: '127.0.0.1',
    port: '3000',
    path: '/test',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Encoding': 'identity'
    }
};

var jsonBody = {
    nick: 'chyingp'
};

var client = http.request(options, (res) => {
    res.pipe(process.stdout);
});

client.end( JSON.stringify(jsonBody) );
```

服务端代码如下，相比`text/plain`，只是多了个`JSON.parse()`的过程。

```javascript
var http = require('http');

var parsePostBody = function (req, done) {
    var length = req.headers['content-length'] - 0;
    var arr = [];
    var chunks;

    req.on('data', buff => {
        arr.push(buff);
    });

    req.on('end', () => {
        chunks = Buffer.concat(arr);
        done(chunks);
    });
};

var server = http.createServer(function (req, res) {
    parsePostBody(req, (chunks) => {
        var json = JSON.parse( chunks.toString() );    // 关键代码    
        res.end(`Your nick is ${json.nick}`)
    });
});

server.listen(3000);
```

### 解析application/x-www-form-urlencoded

客户端代码如下，这里通过`querystring`对请求体进行格式化，得到类似`nick=chyingp`的字符串。

```javascript
var http = require('http');
var querystring = require('querystring');

var options = {
    hostname: '127.0.0.1',
    port: '3000',
    path: '/test',
    method: 'POST',
    headers: {
        'Content-Type': 'form/x-www-form-urlencoded',
        'Content-Encoding': 'identity'
    }
};

var postBody = { nick: 'chyingp' };

var client = http.request(options, (res) => {
    res.pipe(process.stdout);
});

client.end( querystring.stringify(postBody) );
```

服务端代码如下，同样跟`text/plain`的解析差不多，就多了个`querystring.parse()`的调用。

```javascript
var http = require('http');
var querystring = require('querystring');

var parsePostBody = function (req, done) {
    var length = req.headers['content-length'] - 0;
    var arr = [];
    var chunks;

    req.on('data', buff => {
        arr.push(buff);
    });

    req.on('end', () => {
        chunks = Buffer.concat(arr);
        done(chunks);
    });
};

var server = http.createServer(function (req, res) {
    parsePostBody(req, (chunks) => {
        var body = querystring.parse( chunks.toString() );  // 关键代码
        res.end(`Your nick is ${body.nick}`)
    });
});

server.listen(3000);
```

## 二、处理不同编码

很多时候，来自客户端的请求，采用的不一定是默认的`utf8`编码，这个时候，就需要对请求体进行解码处理。

客户端请求如下，有两个要点。

1. 编码声明：在`Content-Type`最后加上`;charset=gbk`
2. 请求体编码：这里借助了`iconv-lite`，对请求体进行编码`iconv.encode('程序猿小卡', encoding)`

```javascript
var http = require('http');
var iconv = require('iconv-lite');

var encoding = 'gbk';  // 请求编码

var options = {
    hostname: '127.0.0.1',
    port: '3000',
    path: '/test',
    method: 'POST',
    headers: {
        'Content-Type': 'text/plain; charset=' + encoding,
        'Content-Encoding': 'identity',        
    }
};

// 备注：nodejs本身不支持gbk编码，所以请求发送前，需要先进行编码
var buff = iconv.encode('程序猿小卡', encoding);

var client = http.request(options, (res) => {
    res.pipe(process.stdout);
});

client.end(buff, encoding);
```

服务端代码如下，这里多了两个步骤：编码判断、解码操作。首先通过`Content-Type`获取编码类型`gbk`，然后通过`iconv-lite`进行反向解码操作。

```javascript
var http = require('http');
var contentType = require('content-type');
var iconv = require('iconv-lite');

var parsePostBody = function (req, done) {
    var obj = contentType.parse(req.headers['content-type']);
    var charset = obj.parameters.charset;  // 编码判断：这里获取到的值是 'gbk'

    var arr = [];
    var chunks;

    req.on('data', buff => {
        arr.push(buff);
    });

    req.on('end', () => {
        chunks = Buffer.concat(arr);
        var body = iconv.decode(chunks, charset);  // 解码操作
        done(body);
    });
};

var server = http.createServer(function (req, res) {
    parsePostBody(req, (body) => {
        res.end(`Your nick is ${body}`)
    });
});

server.listen(3000);
```

## 三、处理不同压缩类型

这里举个`gzip`压缩的例子。客户端代码如下，要点如下：

1. 压缩类型声明：`Content-Encoding`赋值为`gzip`。
2. 请求体压缩：通过`zlib`模块对请求体进行gzip压缩。

```javascript
var http = require('http');
var zlib = require('zlib');

var options = {
    hostname: '127.0.0.1',
    port: '3000',
    path: '/test',
    method: 'POST',
    headers: {
        'Content-Type': 'text/plain',
        'Content-Encoding': 'gzip'
    }
};

var client = http.request(options, (res) => {
    res.pipe(process.stdout);
});

// 注意：将 Content-Encoding 设置为 gzip 的同时，发送给服务端的数据也应该先进行gzip
var buff = zlib.gzipSync('chyingp');

client.end(buff);
```

服务端代码如下，这里通过`zlib`模块，对请求体进行了解压缩操作（guzip）。

```javascript
var http = require('http');
var zlib = require('zlib');

var parsePostBody = function (req, done) {
    var length = req.headers['content-length'] - 0;
    var contentEncoding = req.headers['content-encoding'];
    var stream = req;

    // 关键代码如下
    if(contentEncoding === 'gzip') {
        stream = zlib.createGunzip();
        req.pipe(stream);
    }

    var arr = [];
    var chunks;

    stream.on('data', buff => {
        arr.push(buff);
    });

    stream.on('end', () => {
        chunks = Buffer.concat(arr);        
        done(chunks);
    });

    stream.on('error', error => console.error(error.message));
};

var server = http.createServer(function (req, res) {
    parsePostBody(req, (chunks) => {
        var body = chunks.toString();
        res.end(`Your nick is ${body}`)
    });
});

server.listen(3000);
```

## 写在后面

`body-parser`的核心实现并不复杂，翻看源码后你会发现，更多的代码是在处理异常跟边界。

另外，对于POST请求，还有一个非常常见的`Content-Type`是`multipart/form-data`，这个的处理相对复杂些，`body-parser`不打算对其进行支持。篇幅有限，后续章节再继续展开。

欢迎交流，如有错漏请指出。

## 相关链接

https://github.com/expressjs/body-parser/

https://github.com/ashtuchkin/iconv-lite

#  日志模块morgan



## 章节概览

morgan是express默认的日志中间件，也可以脱离express，作为node.js的日志组件单独使用。本文由浅入深，内容主要包括：

- morgan使用入门例子
- 如何将日志保存到本地文件
- 核心API使用说明及例子
- 进阶使用：1、日志分割 2、将日志写入数据库
- 源码剖析：morgan的日志格式以及预编译

## 入门例子

首先，初始化项目。

```bash
npm install express morgan
```

然后，在`basic.js`中添加如下代码。

```js
var express = require('express');
var app = express();
var morgan = require('morgan');

app.use(morgan('short'));
app.use(function(req, res, next){
    res.send('ok');
});

app.listen(3000);
```

`node basic.js`运行程序，并在浏览器里访问 http://127.0.0.1:3000 ，打印日志如下

```bash
➜  2016.12.11-advanced-morgan git:(master) ✗ node basic.js
::ffff:127.0.0.1 - GET / HTTP/1.1 304 - - 3.019 ms
::ffff:127.0.0.1 - GET /favicon.ico HTTP/1.1 200 2 - 0.984 ms
```

## 将日志打印到本地文件

morgan支持stream配置项，可以通过它来实现将日志落地的效果，代码如下：

```js
var express = require('express');
var app = express();
var morgan = require('morgan');
var fs = require('fs');
var path = require('path');

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

app.use(morgan('short', {stream: accessLogStream}));
app.use(function(req, res, next){
    res.send('ok');
});

app.listen(3000);
```

## 使用讲解

### 核心API

morgan的API非常少，使用频率最高的就是`morgan()`，作用是返回一个express日志中间件。

```js
morgan(format, options)
```

参数说明如下：

- format：可选，morgan与定义了几种日志格式，每种格式都有对应的名称，比如`combined`、`short`等，默认是`default`。不同格式的差别可参考[这里 (opens new window)](https://github.com/expressjs/morgan/#predefined-formats)。下文会讲解下，如果自定义日志格式。

- options：可选，配置项，包含

  ```
  stream（常用）
  ```

  、

  ```
  skip
  ```

  、

  ```
  immediate
  ```

  。

  - stream：日志的输出流配置，默认是`process.stdout`。
  - skip：是否跳过日志记录，使用方式可以参考[这里 (opens new window)](https://github.com/expressjs/morgan/#skip)。
  - immediate：布尔值，默认是false。当为true时，一收到请求，就记录日志；如果为false，则在请求返回后，再记录日志。

### 自定义日志格式

首先搞清楚morgan中的两个概念：format 跟 token。非常简单：

- format：日志格式，本质是代表日志格式的字符串，比如 `:method :url :status :res[content-length] - :response-time ms`。
- token：format的组成部分，比如上面的`:method`、`:url`即使所谓的token。

搞清楚format、token的区别后，就可以看下morgan中，关于自定义日志格式的关键API。

```js
morgan.format(name, format);  // 自定义日志格式
morgan.token(name, fn);  // 自定义token
```

## 自定义format

非常简单，首先通过`morgan.format()`定义名为`joke`的日志格式，然后通过`morgan('joke')`调用即可。

```js
var express = require('express');
var app = express();
var morgan = require('morgan');

morgan.format('joke', '[joke] :method :url :status');

app.use(morgan('joke'));

app.use(function(req, res, next){
    res.send('ok');
});

app.listen(3000);
```

我们来看下运行结果

```bash
➜  2016.12.11-advanced-morgan git:(master) ✗ node morgan.format.js
[joke] GET / 304
[joke] GET /favicon.ico 200
```

## 自定义token

代码如下，通过`morgan.token()`自定义token，然后将自定义的token，加入自定义的format中即可。

```js
var express = require('express');
var app = express();
var morgan = require('morgan');

// 自定义token
morgan.token('from', function(req, res){
    return req.query.from || '-';
});

// 自定义format，其中包含自定义的token
morgan.format('joke', '[joke] :method :url :status :from');

// 使用自定义的format
app.use(morgan('joke'));

app.use(function(req, res, next){
    res.send('ok');
});

app.listen(3000);
```

运行程序，并在浏览器里先后访问 http://127.0.0.1:3000/hello?from=app 和 http://127.0.0.1:3000/hello?from=pc

```bash
➜  2016.12.11-advanced-morgan git:(master) ✗ node morgan.token.js 
[joke] GET /hello?from=app 200 app
[joke] GET /favicon.ico 304 -
[joke] GET /hello?from=pc 200 pc
[joke] GET /favicon.ico 304 -
```

## 高级使用

### 日志切割

一个线上应用，如果所有的日志都落地到同一个本地文件，时间久了，文件会变得非常大，既影响性能，又不便于查看。这时候，就需要用到日志分割了。

借助`file-stream-rotator`插件，可以轻松完成日志分割的工作。除了`file-stream-rotator`相关的配置代码，其余跟之前的例子差不多，这里不赘述。

```js
var FileStreamRotator = require('file-stream-rotator')
var express = require('express')
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')

var app = express()
var logDirectory = path.join(__dirname, 'log')

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
})

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))

app.get('/', function (req, res) {
  res.send('hello, world!')
})
```

### 日志写入数据库

有的时候，我们会有这样的需求，将访问日志写入数据库。这种需求常见于需要实时查询统计的日志系统。

在morgan里该如何实现呢？从文档上，并没有看到适合的扩展接口。于是查阅了下`morgan`的源码，发现实现起来非常简单。

回顾下之前日志写入本地文件的例子，最关键的两行代码如下。通过`stream`指定日志的输出流。

```js
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
app.use(morgan('short', {stream: accessLogStream}));
```

在`morgan`内部，大致实现是这样的（简化后）。

```js
// opt为配置文件
var stream = opts.stream || process.stdout;
var logString = createLogString();  // 伪代码，根据format、token的定义，生成日志
stream.write(logString);
```

于是，可以用比较取巧的方式来实现目的：声明一个带`write`方法的对象，并作为`stream`配置传入。

```js
var express = require('express');
var app = express();
var morgan = require('morgan');

// 带write方法的对象
var dbStream = {
  write: function(line){
    saveToDatabase(line);  // 伪代码，保存到数据库
  }
};

// 将 dbStream 作为 stream 配置项的值
app.use(morgan('short', {stream: dbStream}));
app.use(function(req, res, next){
  res.send('ok');
});

app.listen(3000);
```

## 深入剖析

morgan的代码非常简洁，从设计上来说，morgan的生命周期包含：

> token定义 --> 日志格式定义 -> 日志格式预编译 --> 请求达到/返回 --> 写日志

其中，token定义、日志格式定义前面已经讲到，这里就只讲下 **日志格式预编译** 的细节。

跟模板引擎预编译一样，日志格式预编译，也是为了提升性能。源码如下，最关键的代码就是`compile(fmt)`。

```js
function getFormatFunction (name) {
  // lookup format
  var fmt = morgan[name] || name || morgan.default

  // return compiled format
  return typeof fmt !== 'function'
    ? compile(fmt)
    : fmt
}
```

`compile()`方法的实现细节这里不赘述，着重看下`compile(fmt)`返回的内容：

```js
var morgan = require('morgan');
var format = morgan['tiny'];
var fn = morgan.compile(format);

console.log(fn.toString());
```

运行上面程序，输出内容如下，其中`tokens`其实就是`morgan`。

```bash
function anonymous(tokens, req, res
/**/) {
  return ""
    + (tokens["method"](req, res, undefined) || "-") + " "
    + (tokens["url"](req, res, undefined) || "-") + " "
    + (tokens["status"](req, res, undefined) || "-") + " "
    + (tokens["res"](req, res, "content-length") || "-") + " - "
    + (tokens["response-time"](req, res, undefined) || "-") + " ms";
}
```

看下`morgan.token()`的定义，就很清晰了

```js
function token (name, fn) {
  morgan[name] = fn
  return this
}
```

## 相关链接

https://github.com/expressjs/morgan

# 服务端字符编码&乱码处理 chartset_enc_dec

## 写在前面

在web服务端开发中，字符的编解码几乎每天都要打交道。编解码一旦处理不当，就会出现令人头疼的乱码问题。

不少从事node服务端开发的同学，由于对字符编码码相关知识了解不足，遇到问题时，经常会一筹莫展，花大量的时间在排查、解决问题。

文本先对字符编解码的基础知识进行简单介绍，然后举例说明如何在node中进行编解码，最后是服务端的代码案例。

## 关于字符编解码

在网络通信的过程中，传输的都是二进制的比特位，不管发送的内容是文本还是图片，采用的语言是中文还是英文。

举个例子，客户端向服务端发送"你好"。

> 客户端 --- 你好 ---> 服务端

这中间包含了两个关键步骤，分别对应的是编码、解码。

1. 客户端：将"你好"这个字符串，编码成计算机网络需要的二进制比特位。
2. 服务端：将接收到的二进制比特位，解码成"你好"这个字符串。

总结一下：

1. 编码：将需要传送的数据，转成对应的二进制比特位。
2. 解码：将二进制比特位，转成原始的数据。

上面有些重要的技术细节没有提到，答案在下一小节。

- 客户端怎么知道"你好"这个字符对应的比特位是多少？
- 服务端收到二进制比特位之后，怎么知道对应的字符串是什么？

## 关于字符集和字符编码

上面提到字符、二进制的转换问题。既然两者可以互相转换，也就是说存在明确的转换规则，可以实现**字符<->二进制**的相互转换。

这里提到的转换规则，其实就是我们经常听到的字符集&字符编码。

**字符集**是一系列字符（文字、标点符号等）的集合。字符集有很多，常见的有ASCII、Unicode、GBK等。不同字符集主要的区别在于包含字符个数的不同。

了解了字符集的概念后，接下来介绍下字符编码。

字符集告诉我们支持哪些字符，但具体字符怎么编码，是由**字符编码**决定的。比如Unicode字符集，支持的字符编码有UTF8(常用)、UTF16、UTF32。

概括一下：

- 字符集：字符的集合，不同字符集包含的字符数不同。
- 字符编码：字符集中字符的实际编码方式。
- 一个字符集可能有多种字符编码方式。

可以把字符编码看成一个映射表，客户端、服务端就是根据这个映射表，来实现字符跟二进制的编解码转换。

举个例子，"你"这个字符，在UTF8编码中，占据三个字节`0xe4 0xbd 0xa0`，而在GBK编码中，占据两个字节`0xc4 0xe3`。

## 字符编解码例子

上面已经提到了字符编解码所需的基础知识。下面我们看一个简单的例子，这里借助了`icon-lite`这个库来帮助我们实现编解码的操作。

可以看到，在字符编码时，我们采用了`gbk`。在解码时，如果同样采用`gbk`，可以得到原始的字符。而当我们解码时采用`utf8`时，则出现了乱码。

```javascript
var iconv = require('iconv-lite');

var oriText = '你';

var encodedBuff = iconv.encode(oriText, 'gbk');
console.log(encodedBuff);
// <Buffer c4 e3>

var decodedText = iconv.decode(encodedBuff, 'gbk');
console.log(decodedText);
// 你

var wrongText = iconv.decode(encodedBuff, 'utf8');
console.log(wrongText);
// ��
```

## 实际例子：服务端编解码

通常我们需要处理编解码的场景有文件读写、网络请求处理。这里距网络请求的例子，介绍如何在服务端进行编解码。

假设我们运行着如下http服务，监听来自客户端的请求。客户端传输数据时采用了`gbk`编码，而服务端默认采用的是`utf8`编码。

如果此时采用默认的`utf8`对请求进行解码，就会出现乱码，因此需要特殊处理。

服务端代码如下（为简化代码，这里跳过了请求方法、请求编码的判断）

```javascript
var http = require('http');
var iconv = require('iconv-lite');

// 假设客户端采用post方法，编码为gbk
var server = http.createServer(function (req, res) {
    var chunks = [];
    
    req.on('data', function (chunk) {
        chunks.push(chunk)
    });

    req.on('end', function () {
        chunks = Buffer.concat(chunks);

        // 对二进制进行解码
        var body = iconv.decode(chunks, 'gbk');
        console.log(body);

        res.end('HELLO FROM SERVER');
    });

});

server.listen(3000);
```

对应的客户端代码如下：

```javascript
var http = require('http');
var iconv = require('iconv-lite');

var charset = 'gbk';

// 对字符"你"进行编码
var reqBuff = iconv.encode('你', charset);

var options = {
    hostname: '127.0.0.1',
    port: '3000',
    path: '/',
    method: 'POST',
    headers: {
        'Content-Type': 'text/plain',
        'Content-Encoding': 'identity',
        'Charset': charset // 设置请求字符集编码
    }
};

var client = http.request(options, function(res) {
    res.pipe(process.stdout);
});

client.end(reqBuff);
```

## 相关链接

iconv-lite https://github.com/ashtuchkin/iconv-lite

# 测试用例： mocha、should、istanbul

## 目标

建立一个 lesson6 项目，在其中编写代码。

main.js: 其中有个 fibonacci 函数。fibonacci 的介绍见：http://en.wikipedia.org/wiki/Fibonacci_number 。

此函数的定义为 `int fibonacci(int n)`

- 当 n === 0 时，返回 0；n === 1时，返回 1;
- n > 1 时，返回 `fibonacci(n) === fibonacci(n-1) + fibonacci(n-2)`，如 `fibonacci(10) === 55`;
- n 不可大于10，否则抛错，因为 Node.js 的计算性能没那么强。
- n 也不可小于 0，否则抛错，因为没意义。
- n 不为数字时，抛错。

test/main.test.js: 对 main 函数进行测试，并使行覆盖率和分支覆盖率都达到 100%。

## 知识点

1. 学习使用测试框架 mocha : http://mochajs.org/
2. 学习使用断言库 should : https://github.com/tj/should.js
3. 学习使用测试率覆盖工具 istanbul : https://github.com/gotwarlost/istanbul
4. 简单 Makefile 的编写 : http://blog.csdn.net/haoel/article/details/2886

## 课程内容

首先，作为一个 Node.js 项目，先执行 `npm init` 创建 package.json。

其次，建立我们的 main.js 文件，编写 `fibonacci` 函数。

```js
var fibonacci = function (n) {
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  return fibonacci(n-1) + fibonacci(n-2);
};

if (require.main === module) {
  // 如果是直接执行 main.js，则进入此处
  // 如果 main.js 被其他文件 require，则此处不会执行。
  var n = Number(process.argv[2]);
  console.log('fibonacci(' + n + ') is', fibonacci(n));
}
```

OK，这只是个简单的实现。

我们可以执行试试

```
$ node main.js 10
```

![img](https://raw.githubusercontent.com/alsotang/node-lessons/master/lesson6/1.png)

嗯，结果是 55，符合预期。

接下来我们开始测试驱动开发，现在简单的实现已经完成，那我们就对它进行一下简单测试吧。

我们先得把 main.js 里面的 fibonacci 暴露出来，这个简单。加一句

`exports.fibonacci = fibonacci;`（要是看不懂这句就去补补 Node.js 的基础知识吧）

就好了。

然后我们在 `test/main.test.js` 中引用我们的 main.js，并开始一个简单的测试。

```js
// file: test/main.test.js
var main = require('../main');
var should = require('should');

describe('test/main.test.js', function () {
  it('should equal 55 when n === 10', function () {
    main.fibonacci(10).should.equal(55);
  });
});
```

把测试先跑通，我们再讲这段测试代码的含义。

装个全局的 mocha: `$ npm install mocha -g`。

`-g` 与 非`-g` 的区别，就是安装位置的区别，g 是 global 的意思。如果不加的话，则安装 mocha 在你的项目目录下面；如果加了，则这个 mocha 是安装在全局的，如果 mocha 有可执行命令的话，那么这个命令也会自动加入到你系统 $PATH 中的某个地方（在我的系统中，是这里 `/Users/alsotang/.nvm/v0.10.29/bin`）

在 lesson6 目录下，直接执行

```
$ mocha
```

输出应如下

![img](https://raw.githubusercontent.com/alsotang/node-lessons/master/lesson6/2.png)

那么，代码中的 describe 和 it 是什么意思呢？其实就是 BDD 中的那些意思，把它们当做语法来记就好了。

大家来看看 nodeclub 中，关于 topicController 的测试文件：

https://github.com/cnodejs/nodeclub/blob/master/test/controllers/topic.test.js

这文件的内容没有超出之前课程的范围吧。

`describe` 中的字符串，用来描述你要测的主体是什么；`it` 当中，描述具体的 case 内容。

而引入的那个 should 模块，是个断言库。玩过 ruby 的同学应该知道 `rspec`，rspec 它把测试框架和断言库的事情一起做了，而在 Node.js 中，这两样东西的作用分别是 mocha 和 should 在协作完成。

should 在 js 的 Object “基类”上注入了一个 `#should` 属性，这个属性中，又有着许许多多的属性可以被访问。

比如测试一个数是不是大于3，则是 `(5).should.above(3)`；测试一个字符串是否有着特定前缀：`'foobar'.should.startWith('foo');`。should.js API 在：https://github.com/tj/should.js

should.js 如果现在还是 version 3 的话，我倒是推荐大家去看看它的 API 和 源码；现在 should 是 version 4 了，API 丑得很，但为了不掉队，我还是一直用着它。我觉得 expect 麻烦，所以不用 expect，对了，expect 也是一个断言库：https://github.com/LearnBoost/expect.js/ 。

回到正题，还记得我们 fibonacci 函数的几个要求吗？

```text
* 当 n === 0 时，返回 0；n === 1时，返回 1;
* n > 1 时，返回 `fibonacci(n) === fibonacci(n-1) + fibonacci(n-2)`，如 `fibonacci(10) === 55`;
* n 不可大于10，否则抛错，因为 Node.js 的计算性能没那么强。
* n 也不可小于 0，否则抛错，因为没意义。
* n 不为数字时，抛错。
```

我们用测试用例来描述一下这几个要求，更新后的 main.test.js 如下：

```js
var main = require('../main');
var should = require('should');

describe('test/main.test.js', function () {
  it('should equal 0 when n === 0', function () {
    main.fibonacci(0).should.equal(0);
  });

  it('should equal 1 when n === 1', function () {
    main.fibonacci(1).should.equal(1);
  });

  it('should equal 55 when n === 10', function () {
    main.fibonacci(10).should.equal(55);
  });

  it('should throw when n > 10', function () {
    (function () {
      main.fibonacci(11);
    }).should.throw('n should <= 10');
  });

  it('should throw when n < 0', function () {
    (function () {
      main.fibonacci(-1);
    }).should.throw('n should >= 0');
  });

  it('should throw when n isnt Number', function () {
    (function () {
      main.fibonacci('呵呵');
    }).should.throw('n should be a Number');
  });
});
```

还是比较清晰的吧？

我们这时候跑一下 `$ mocha`，会发现后三个 case 都没过。

于是我们更新 fibonacci 的实现：

```js
var fibonacci = function (n) {
  if (typeof n !== 'number') {
    throw new Error('n should be a Number');
  }
  if (n < 0) {
    throw new Error('n should >= 0');
  }
  if (n > 10) {
    throw new Error('n should <= 10');
  }
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }

  return fibonacci(n-1) + fibonacci(n-2);
};
```

再跑一次 `$ mocha`，就过了。这就是传说中的测试驱动开发：先把要达到的目的都描述清楚，然后让现有的程序跑不过 case，再修补程序，让 case 通过。

安装一个 istanbul : `$ npm i istanbul -g`

执行 `$ istanbul cover _mocha`

这会比直接使用 mocha 多一行覆盖率的输出，

![img](https://raw.githubusercontent.com/alsotang/node-lessons/master/lesson6/3.png)

可以看到，我们其中的分支覆盖率是 91.67%，行覆盖率是 87.5%。

打开 `open coverage/lcov-report/index.html` 看看

![img](https://raw.githubusercontent.com/alsotang/node-lessons/master/lesson6/4.png)

其实这覆盖率是 100% 的，24 25 两行没法测。

mocha 和 istanbul 的结合是相当无缝的，只要 mocha 跑得动，那么 istanbul 就接得进来。

到此这门课其实就完了，剩下要说的内容，都是些比较细节的。比较懒的同学可以踩坑了之后再回来看。

上面的课程，不完美的地方就在于 mocha 和 istanbul 版本依赖的问题，但为了不引入不必要的复杂性，所以上面就没提到这点了。

假设你有一个项目A，用到了 mocha 的 version 3，其他人有个项目B，用到了 mocha 的 version 10，那么如果你 `npm i mocha -g` 装的是 version 3 的话，你用 `$ mocha` 是不兼容B项目的。因为 mocha 版本改变之后，很可能语法也变了，对吧。

这时，跑测试用例的正确方法，应该是

1. `$ npm i mocha --save-dev`，装个 mocha 到项目目录中去
2. `$ ./node_modules/.bin/mocha`，用刚才安装的这个特定版本的 mocha，来跑项目的测试代码。

`./node_modules/.bin` 这个目录下放着我们所有依赖自带的那些可执行文件。

每次输入这个很麻烦对吧？所以我们要引入 Makefile，让 Makefile 帮我们记住复杂的配置。

```text
test:
  ./node_modules/.bin/mocha

cov test-cov:
  ./node_modules/.bin/istanbul cover _mocha

.PHONY: test cov test-cov
```

这时，我们只需要调用 `make test` 或者 `make cov`，就可以跑我们相应的测试了。

至于 Makefile 怎么写？以及 .PHONY 是什么意思，请看这里：http://blog.csdn.net/haoel/article/details/2886 ，左耳朵耗子陈皓2004年的文章。

```json
{
  "name": "lesson6",
  "version": "0.0.0",
  "description": "测试用例：mocha，should，istanbul",
  "main": "main.js",
  "directories": {
    "test": "test"
  },
  "scripts": {
    "test": "make test"
  },
  "author": "alsotang <alsotang@gmail.com>",
  "license": "MIT",
  "devDependencies": {
    "istanbul": "^0.3.2",
    "mocha": "^1.21.4",
    "should": "^4.0.4"
  }
}
// main.js
var fibonacci = function (n) {
  if (typeof n !== 'number') {
    throw new Error('n should be a Number');
  }
  if (n < 0) {
    throw new Error('n should >= 0')
  }
  if (n > 10) {
    throw new Error('n should <= 10');
  }
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }

  return fibonacci(n-1) + fibonacci(n-2);
};

exports.fibonacci = fibonacci;

if (require.main === module) {
  var n = Number(process.argv[2]);
  console.log('fibonacci(' + n + ') is', fibonacci(n));
}
```

# 调试日志打印：debug模块

## 前言

在node程序开发中时，经常需要打印调试日志。用的比较多的是debug模块，比如express框架中就用到了

> 备注：node在0.11.3版本也加入了util.debuglog()用于打印调试日志，使用方法跟debug模块大同小异。

## 基础例子

首先，安装`debug`模块。

```bash
npm install debug
```

使用很简单，运行node程序时，加上`DEBUG=app`环境变量即可。

```javascript
/**
 * debug基础例子
 */
var debug = require('debug')('app');

// 运行 DEBUG=app node 01.js
// 输出：app hello +0ms
debug('hello');
```

## 例子：命名空间

当项目程序变得复杂，我们需要对日志进行分类打印，debug支持命令空间，如下所示。

- `DEBUG=app,api`：表示同时打印出命名空间为app、api的调试日志。
- `DEBUG=a*`：支持通配符，所有命名空间为a开头的调试日志都打印出来。

```javascript
/**
 * debug例子：命名空间
 */
var debug = require('debug');
var appDebug = debug('app');
var apiDebug = debug('api');

// 分别运行下面几行命令看下效果
// 
//     DEBUG=app node 02.js
//     DEBUG=api node 02.js
//     DEBUG=app,api node 02.js
//     DEBUG=a* node 02.js
//     
appDebug('hello');
apiDebug('hello');
```

## 例子：命名空间排除

有的时候，我们想要打印出所有的调试日志，除了个别命名空间下的。这个时候，可以通过`-`来进行排除，如下所示。`-account*`表示排除所有以account开头的命名空间的调试日志。

```javascript
/**
 * debug例子：排查命名空间
 */
var debug = require('debug');
var listDebug = debug('app:list');
var profileDebug = debug('app:profile');
var loginDebug = debug('account:login');

// 分别运行下面几行命令看下效果
// 
//     DEBUG=* node 03.js
//     DEBUG=*,-account* node 03.js
//     
listDebug('hello');
profileDebug('hello');
loginDebug('hello');
```

## 例子：自定义格式化

debug也支持格式化输出，如下例子所示。

```javascript
var debug = require('debug')('app');

debug('my name is %s', 'chyingp');
```

此外，也可以自定义格式化内容。

```javascript
/**
 * debug：自定义格式化
 */
var createDebug = require('debug')

createDebug.formatters.h = function(v) {
  return v.toUpperCase();
};
 
var debug = createDebug('foo');

// 运行 DEBUG=foo node 04.js 
// 输出 foo My name is CHYINGP +0ms
debug('My name is %h', 'chying');
```

## 相关链接

debug：https://github.com/visionmedia/debug debuglog：https://nodejs.org/api/util.html#util_util_debuglog_section

