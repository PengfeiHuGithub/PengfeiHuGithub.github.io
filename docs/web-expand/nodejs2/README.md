# Express

## 概述



> Express是目前最流行的基于Node.js的Web开发框架，可以快速地搭建一个完整功能的网站

## 运行原理



**底层：http模块**

> Express框架建立在node.js内置的http模块上。http模块生成服务器的原始代码如下

```javascript
var http = require("http");

var app = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello world!");
});

app.listen(3000, "localhost");
```

> Express框架的核心是对http模块的再包装。上面的代码用Express改写如下

```javascript
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello world!');
});

app.listen(3000);
```

> Express框架等于在http模块之上，加了一个中间层

**什么是中间件**

> - 简单说，中间件（middleware）就是处理HTTP请求的函数。它最大的特点就是，一个中间件处理完，再传递给下一个中间件。App实例在运行过程中，会调用一系列的中间件
> - 每个中间件可以从App实例，接收三个参数，依次为request对象（代表HTTP请求）、response对象（代表HTTP回应），next回调函数（代表下一个中间件）。每个中间件都可以对HTTP请求（request对象）进行加工，并且决定是否调用next方法，将request对象再传给下一个中间件。

- 一个不进行任何操作、只传递`request`对象的中间件，就是下面这样

```javascript
function uselessMiddleware(req, res, next) {
  next();
}
```

- 上面代码的next就是下一个中间件。如果它带有参数，则代表抛出一个错误，参数为错误文本
- 抛出错误以后，后面的中间件将不再执行，直到发现一个错误处理函数为止

```javascript
function uselessMiddleware(req, res, next) {
  next('出错了！');
}
```

## use方法



> use是express注册中间件的方法，它返回一个函数。下面是一个连续调用两个中间件的例子

```javascript
var express = require("express");
var http = require("http");

var app = express();

app.use(function(request, response, next) {
  console.log("In comes a " + request.method + " to " + request.url);
  next();
});

app.use(function(request, response) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello world!\n");
});

http.createServer(app).listen(1337);
```

> 上面代码使用app.use方法，注册了两个中间件。收到HTTP请求后，先调用第一个中间件，在控制台输出一行信息，然后通过next方法，将执行权传给第二个中间件，输出HTTP回应。由于第二个中间件没有调用next方法，所以request对象就不再向后传递了

- use方法内部可以对访问路径进行判断，据此就能实现简单的路由，根据不同的请求网址，返回不同的网页内容

```javascript
var express = require("express");
var http = require("http");

var app = express();

app.use(function(request, response, next) {
  if (request.url == "/") {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Welcome to the homepage!\n");
  } else {
    next();
  }
});

app.use(function(request, response, next) {
  if (request.url == "/about") {
    response.writeHead(200, { "Content-Type": "text/plain" });
  } else {
    next();
  }
});

app.use(function(request, response) {
  response.writeHead(404, { "Content-Type": "text/plain" });
  response.end("404 error!\n");
});

http.createServer(app).listen(1337);
```

> 上面代码通过`request.url`属性，判断请求的网址，从而返回不同的内容。注意，`app.use`方法一共登记了三个中间件，只要请求路径匹配，就不会将执行权交给下一个中间件。因此，最后一个中间件会返回`404`错误，即前面的中间件都没匹配请求路径，找不到所要请求的资源

- 除了在回调函数内部判断请求的网址，`use`方法也允许将请求网址写在第一个参数。这代表，只有请求路径匹配这个参数，后面的中间件才会生效。无疑，这样写更加清晰和方便

```javascript
// 只对根目录的请求，调用某个中间件
app.use('/path', someMiddleware);
```

- 因此，上面的代码可以写成下面的样子

```text
ar express = require("express");
var http = require("http");

var app = express();

app.use("/home", function(request, response, next) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Welcome to the homepage!\n");
});

app.use("/about", function(request, response, next) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Welcome to the about page!\n");
});

app.use(function(request, response) {
  response.writeHead(404, { "Content-Type": "text/plain" });
  response.end("404 error!\n");
});

http.createServer(app).listen(1337)
```

## Express的方法



**all方法和HTTP动词方法**

> 针对不同的请求，Express提供了use方法的一些别名。比如，上面代码也可以用别名的形式来写

```javascript
var express = require("express");
var http = require("http");
var app = express();

app.all("*", function(request, response, next) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  next();
});

app.get("/", function(request, response) {
  response.end("Welcome to the homepage!");
});

app.get("/about", function(request, response) {
  response.end("Welcome to the about page!");
});

app.get("*", function(request, response) {
  response.end("404!");
});

http.createServer(app).listen(1337);
```

> - 上面代码的all方法表示，所有请求都必须通过该中间件，参数中的“*”表示对所有路径有效。get方法则是只有GET动词的HTTP请求通过该中间件，它的第一个参数是请求的路径。由于get方法的回调函数没有调用next方法，所以只要有一个中间件被调用了，后面的中间件就不会再被调用了
> - 除了get方法以外，Express还提供post、put、delete方法，即HTTP动词都是Express的方法

- 除了get方法以外，Express还提供post、put、delete方法，即HTTP动词都是Express的方法
- 这些方法的第一个参数，都是请求的路径。除了绝对匹配以外，Express允许模式匹配

```javascript
app.get("/hello/:who", function(req, res) {
  res.end("Hello, " + req.params.who + ".");
});
```

## set方法



> set方法用于指定变量的值

- 使用set方法，为系统变量“views”和“view engine”指定值

```javascript
app.set("views", __dirname + "/views");

app.set("view engine", "jade");
```

## response对象



**（1）response.redirect方法**

> response.redirect方法允许网址的重定向

```javascript
response.redirect("/hello/anime");
response.redirect("http://www.example.com");
response.redirect(301, "http://www.example.com"); 
```

**（2）response.sendFile方法**

> response.sendFile方法用于发送文件

```javascript
response.sendFile("/path/to/anime.mp4");
```

**（3）response.render方法**

> response.render方法用于渲染网页模板。

```text
//  使用render方法，将message变量传入index模板，渲染成HTML网页
app.get("/", function(request, response) {
  response.render("index", { message: "Hello World" });
});
```

## requst对象



**（1）request.ip**

> request.ip属性用于获得HTTP请求的IP地址

**（2）request.files**

> request.files用于获取上传的文件

## 搭建HTTPs服务器



> 使用Express搭建HTTPs加密服务器，也很简单

```javascript
var fs = require('fs');
var options = {
  key: fs.readFileSync('E:/ssl/myserver.key'),
  cert: fs.readFileSync('E:/ssl/myserver.crt'),
  passphrase: '1234'
};

var https = require('https');
var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('Hello World Expressjs');
});

var server = https.createServer(options, app);
server.listen(8084);
console.log('Server is running on port 8084');
```

## 静态网页模板



> - 在项目目录之中，建立一个子目录views，用于存放网页模板
> - 假定这个项目有三个路径：根路径（/）、自我介绍（/about）和文章（/article）。那么，app.js可以这样写

```javascript
// 向服务器发送信息的方法，从send变成了sendfile，后者专门用于发送文件
var express = require('express');
var app = express();
 
app.get('/', function(req, res) {
   res.sendfile('./views/index.html');
});
 
app.get('/about', function(req, res) {
   res.sendfile('./views/about.html');
});
 
app.get('/article', function(req, res) {
   res.sendfile('./views/article.html');
});
 
app.listen(3000);
```

## 动态网页模板



**安装模板引擎**

> Express支持多种模板引擎，这里采用Handlebars模板引擎的服务器端版本hbs模板引擎

```javascript
npm install hbs --save-dev
```

- 安装模板引擎之后，就要改写app.js

```javascript
// app.js文件

var express = require('express');
var app = express();

// 加载hbs模块
var hbs = require('hbs');

// 指定模板文件的后缀名为html
app.set('view engine', 'html');

// 运行hbs模块
app.engine('html', hbs.__express);

app.get('/', function (req, res){
	res.render('index');
});

app.get('/about', function(req, res) {
	res.render('about');
});

app.get('/article', function(req, res) {
	res.render('article');
});
```

> 上面代码改用render方法，对网页模板进行渲染。render方法的参数就是模板的文件名，默认放在子目录views之中，后缀名已经在前面指定为html，这里可以省略。所以，res.render(‘index’) 就是指，把子目录views下面的index.html文件，交给模板引擎hbs渲染

## 新建数据脚本



> - 渲染是指将数据代入模板的过程。实际运用中，数据都是保存在数据库之中的，这里为了简化问题，假定数据保存在一个脚本文件中
> - 在项目目录中，新建一个文件blog.js，用于存放数据。blog.js的写法符合CommonJS规范，使得它可以被require语句加载

```javascript
// blog.js文件

var entries = [
	{"id":1, "title":"第一篇", "body":"正文", "published":"6/2/2013"},
	{"id":2, "title":"第二篇", "body":"正文", "published":"6/3/2013"},
	{"id":3, "title":"第三篇", "body":"正文", "published":"6/4/2013"},
	{"id":4, "title":"第四篇", "body":"正文", "published":"6/5/2013"},
	{"id":5, "title":"第五篇", "body":"正文", "published":"6/10/2013"},
	{"id":6, "title":"第六篇", "body":"正文", "published":"6/12/2013"}
];

exports.getBlogEntries = function (){
   return entries;
}
 
exports.getBlogEntry = function (id){
   for(var i=0; i < entries.length; i++){
      if(entries[i].id == id) return entries[i];
   }
}
```

## 新建网页模板



> 接着，新建模板文件`index.html`

```javascript
<!-- views/index.html文件 -->

<h1>文章列表</h1>
 
{{#each entries}}
   <p>
      <a href="/article/{{id}}">{{title}}</a><br/>
      Published: {{published}}
   </p>
{{/each}}
<!-- views/about.html文件 -->

<h1>自我介绍</h1>
 
<p>正文</p>
<!-- views/article.html文件 -->

<h1>{{blog.title}}</h1>
Published: {{blog.published}}
 
<p/>
 
{{blog.body}}
```

> 可以看到，上面三个模板文件都只有网页主体。因为网页布局是共享的，所以布局的部分可以单独新建一个文件`layout.html`

```javascript
<!-- views/layout.html文件 -->

<html>
 
<head>
   <title>{{title}}</title>
</head>
 
<body>
 
	{{{body}}}
 
   <footer>
      <p>
         <a href="/">首页</a> - <a href="/about">自我介绍</a>
      </p>
   </footer>
    
</body>
</html>
```

## 渲染模板



> 最后，改写app.js文件

```javascript
// app.js文件

var express = require('express');
var app = express();
 
var hbs = require('hbs');

// 加载数据模块
var blogEngine = require('./blog');
 
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.bodyParser());
 
app.get('/', function(req, res) {
   res.render('index',{title:"最近文章", entries:blogEngine.getBlogEntries()});
});
 
app.get('/about', function(req, res) {
   res.render('about', {title:"自我介绍"});
});
 
app.get('/article/:id', function(req, res) {
   var entry = blogEngine.getBlogEntry(req.params.id);
   res.render('article',{title:entry.title, blog:entry});
});
 
app.listen(3000);
```

- 上面代码中的render方法，现在加入了第二个参数，表示模板变量绑定的数据

## 指定静态文件目录



> 模板文件默认存放在views子目录。这时，如果要在网页中加载静态文件（比如样式表、图片等），就需要另外指定一个存放静态文件的目录

```javascript
app.use(express.static('public'));
```

> 上面代码在文件app.js之中，指定静态文件存放的目录是public。于是，当浏览器发出非HTML文件请求时，服务器端就到public目录寻找这个文件。比如，浏览器发出如下的样式表请求：

```javascript
<link href="/bootstrap/css/bootstrap.css" rel="stylesheet">
```

- 服务器端就到`public/bootstrap/css/`目录中寻找`bootstrap.css`文件

## Express.Router用法



> 从`Express 4.0`开始，路由器功能成了一个单独的组件`Express.Router`。它好像小型的`express`应用程序一样，有自己的`use`、`get`、`param`和`route`方法

**基本用法**

> 首先，Express.Router是一个构造函数，调用后返回一个路由器实例。然后，使用该实例的HTTP动词方法，为不同的访问路径，指定回调函数；最后，挂载到某个路径。

```javascript
var router = express.Router();

router.get('/', function(req, res) {
  res.send('首页');
});

router.get('/about', function(req, res) {
  res.send('关于');
});

app.use('/', router);
```

> - 上面代码先定义了两个访问路径，然后将它们挂载到根目录
> - 这种路由器可以自由挂载的做法，为程序带来了更大的灵活性，既可以定义多个路由器实例，也可以为将同一个路由器实例挂载到多个路径。

## router.route方法



> router实例对象的route方法，可以接受访问路径作为参数

```javascript
var router = express.Router();

router.route('/api')
	.post(function(req, res) {
		// ...
	})
	.get(function(req, res) {
		Bear.find(function(err, bears) {
			if (err) res.send(err);
			res.json(bears);
		});
	});

app.use('/', router);
```

## router中间件



> use方法为router对象指定中间件，即在数据正式发给用户之前，对数据进行处理。下面就是一个中间件的例子

```javascript
router.use(function(req, res, next) {
	console.log(req.method, req.url);
	next();	
});
```

- 上面代码中，回调函数的next参数，表示接受其他中间件的调用。函数体中的next()，表示将数据传递给下一个中间件
- 注意，中间件的放置顺序很重要，等同于执行顺序。而且，中间件必须放在HTTP动词方法之前，否则不会执行

## 对路径参数的处理



> router对象的param方法用于路径参数的处理，可以

```javascript
router.param('name', function(req, res, next, name) {
	// 对name进行验证或其他处理……
	console.log(name);
	req.name = name;
	next();	
});

router.get('/hello/:name', function(req, res) {
	res.send('hello ' + req.name + '!');
});
```

> 上面代码中，get方法为访问路径指定了name参数，param方法则是对name参数进行处理。注意，param方法必须放在HTTP动词方法之前

## app.route



> - 假定app是Express的实例对象，Express 4.0为该对象提供了一个route属性。app.route实际上是express.Router()的缩写形式，直接挂载到根路径
> - 因此，对同一个路径指定get和post方法的回调函数，可以写成链式形式

```javascript
app.route('/login')
	.get(function(req, res) {
		res.send('this is the login form');
	})
	.post(function(req, res) {
		console.log('processing');
		res.send('processing the login form!');
	});
```

## 上传文件



- 首先，在网页插入上传文件的表单

```javascript
<form action="/pictures/upload" method="POST" enctype="multipart/form-data">
  Select an image to upload:
  <input type="file" name="image">
  <input type="submit" value="Upload Image">
</form>
```

> 然后，服务器脚本建立指向/upload目录的路由。这时可以安装multer模块，它提供了上传文件的许多功能

```javascript
var express = require('express');
var router = express.Router();
var multer = require('multer');

var uploading = multer({
  dest: __dirname + '../public/uploads/',
  // 设定限制，每次最多上传1个文件，文件大小不超过1MB
  limits: {fileSize: 1000000, files:1},
})

router.post('/upload', uploading, function(req, res) {

})

module.exports = router
```

## Express 基础应用



Express 是一个第三方模块，对原生模块封装了一套更灵活、更简洁的应用框架，其在 Node.js 环境的地位和作用好比 jQuery 在前端的地位和作用。

### 路由

在 BS 架构中，路由的概念都是一样的，可理解为根据客户端请求的 URL 映射到不同的方法实现，更多的一般都是针对 URL 中的路径，或者是参数，又或者是锚点这些信息进行映射。

### Express 使用

- 因为 Express 是第三方模块，所以在使用前要先安装 `npm install express`
- 加载模块

```javascript
var express = require('express');
var app = express();
```

- 开启服务器，定义端口8080：

```javascript
app.listen(8080, function(){
	console.log('Server running on http://localhost:8080');
});
```

### GET

- 定义根路由，我们定义端口为 8080，当我们访问：http://localhost:8080/，会自动触发方法，会在页面上显示 Root Page。
- `response.send()` 可理解为 `response.end()`，其中一个不同点在于 `response.send()` 参数可为对象。
- 只有 GET 访问能触发

```javascript
app.get('/', function(request, response){
    response.send('Root Page');
})
```

- 定义 getUsers 路由，当我们访问：http://localhost:8080/getusers，会自动触发方法，会在页面上显示 getUsers Page。

```javascript
app.get('/getUsers', function(request, response){
    response.send('getUsers Page');
})
```

- Node.js 默认是不能访问静态资源文件（*.html、*.js、*.css、*.jpg 等），如果要访问服务端的静态资源文件则要用到方法 `sendFile`
- __dirname 为 Node.js 的系统变量，指向文件的绝对路径。

```javascript
app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
});
```

#### GET 参数接收之 Query Strings

访问地址：`http://localhost:8080/getusers?username=dk&age=18`，可通过 `request.query` 来获取参数

```javascript
app.get('/getUsers', function(request, response){
    var params = {
        username: request.query.username,
        age: request.query.age
    }
    response.send(params);
})
```

#### GET 参数接收之路径方式

访问地址：`http://localhost:8080/getusers/admin/18`，可通过 `request.params` 来获取参数

```javascript
app.get('/getUsers/:username/:age', function(request, response){
    var params = {
        username: request.params.username,
        age: request.params.age
    }
    response.send(params);
})
```

### POST

- post 参数接收，可依赖第三方模块 body-parser 进行转换会更方便、更简单，该模块用于处理 JSON, Raw, Text 和 URL 编码的数据。
- 安装 body-parser `npm install body-parser`
- 参数接受和 GET 基本一样，不同的在于 GET 是 `request.query` 而 POST 的是 `request.body`

```javascript
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/getUsers', urlencodedParser, function (request, response) {
    var params = {
        username: request.body.username,
        age: request.body.age
    }
   response.send(params);
});
```

### 跨域支持(放在最前面)

```javascript
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") {
      res.send(200);/*让options请求快速返回*/
    } else{
      next();
    }
});
```

## Express Koa 和 Egg 基础配置



### Express

#### 处理请求

- 处理GET请求：配合`req.query`
- 处理POST请求：需要`body-parser`模块，配合`req.body`

| GET       | POST     | JSONP     | COOKIE      |
| --------- | -------- | --------- | ----------- |
| req.query | req.body | req.query | req.cookies |

```js
//npm install express
var express = require('express');
//npm install body-parser
var bodyParser = require("body-parser");
var app = express();
//配置静态文件夹,在本地public读取css,js,html等文件
app.use(express.static('public'));
//post请求需要body-parser模块处理
app.use(bodyParser.urlencoded({
	extended: false
}));
app.get('/', function(req, res) {
	res.send('Hello World!');
});
app.get('/home', function(req, res) {
	//get请求参数对象
	console.log('get请求参数对象:', req.query);
	res.send('get请求');
});
app.post('/home', function(req, res) {
	//post请求参数对象
	console.log('post请求参数对象:', req.body);
	res.send('post请求');
});
var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});
```

#### 匹配路由参数

```js
app.get('/add/:id/:age', function(req, res) {
	//追加请求头
	res.append("Access-Control-Allow-Origin","*");
	//?id=xx&age=xxx
	console.log(req.query)
	//:id/:age
	console.log(req.params)
	res.send("Hello Oaoafly");
})
```

#### 跨域

可在中间件中追加这句防止跨域

```js
res.append("Access-Control-Allow-Origin","*");
```

#### 模板文件

这个设置视图文件的放置地方，然后配置jade为其模板渲染引擎，这里也需要安装jade模块实现

```js
//views, 放模板文件的目录，比如： 
app.set('views', './views')
//view engine, 模板引擎
app.set('view engine', 'jade')
```

然后安装对应的模板引擎npm包

```text
npm install jade
```

然后创建一个views文件夹，并在里面新建一个`xxxx.jade`文件，内容如下

```text
html
	head
	body
		h1 这是测试
		p 你好
			ul.hhh#ddd
				for n in news
					li=n.title
```

> 在中间件中添加如下关键代码，res.render("文件名可省略后缀",{需要渲染在模板上的数据})

```js
app.get('/', function(req, res) {
	connection.query("select * from news",function(err,data){
	var content = "Hello Oaoafly";
	res.render("qianfeng",{
		//model
		name:'xie',
		name2:'lan',
		news:data
	    })
	})
	//res.send("<p style='color:red'>"+content+"</p>");
})
```

#### 静态文件

- Express提供了内置的中间件express.static来设置静态文件如：图片， CSS，JavaScript等
- 你可以使用`express.static`中间件来设置静态文件路径
- 例如，如果你将图片， `CSS，JavaScript`文件放在public目录下
- 在`app.js`根目录下创建一个`public`文件夹，然后在代码中添加

```text
app.use(express.static('public'));
```

- 设置完静态文件夹后我们可以用`res.sendFile(文件路径)`方法来把文件发送到前端
- 注意路径要用绝对路径`__dirname + "/public/" + "upload.html"`

```js
app.get('/index.html', function (req, res) {
   res.sendFile(__dirname + "/public" + "index.html");
})
```

还有值得注意的一点就是，对于每个应用程序，可以有多个静态目录，比如你可以按上传的文件类型分目录，当我们找某张图片的时候就会从这几个静态文件夹中一起找取

```js
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('files'));
```

#### 连接数据库

连接数据库，可以安装mysql模块实现

```js
var mysql = require("mysql");
var connection = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "asm"
})
//执行数据库连接 .close();
connection.connect();
app.post('/add', function(req, res) {
	//追加请求头
	res.append("Access-Control-Allow-Origin","*");
	console.log(req.body);
	connection.query("insert into news (title,text) values ('" + req.body.title + "','" + req.body.text + "')",function(err,data){
		console.log(data)
	})
	res.send("增加信息");
	
})
```

#### body-parser

```text
npm install body-parser
```

然后通过`app.use()`方法调用

```js
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json 
app.use(bodyParser.json())
```

#### cookie-parser

```text
npm install cookie-parser
```

通过`app.use()`方法调用

```text
var cookieParser = require('cookie-parser')
app.use(cookieParser())
```

然后在中间件中通过`req.cookies`获取前端页面的`cookie`，是一个通过处理的对象

| module                                                       | description                        |
| ------------------------------------------------------------ | ---------------------------------- |
| querystring                                                  | 将GET请求url中的字符串信息进行转换 |
| chalk                                                        | 把控制台输出信息的字符串颜色改变   |
| body-parser                                                  | 将客户端通过POST方法传过来的       |
| cookie-parser                                                | 处理cookie信息                     |
| svg-captcha                                                  | 用来生成验证码                     |
| trek-captcha                                                 | 用来生成验证码                     |
| emailjs                                                      | 用来通过邮箱找回密码               |
| validator                                                    | 验证器                             |
| mongodb                                                      | 连接mongodb数据库                  |
| crypto                                                       | express自带的加密模块              |
| express-session session的认证机制离不开cookie，需要同时使用cookieParser中间件，可以用来保存用户的登陆状态，免密码登陆 |                                    |
| formidable                                                   | 表单文件上传模块                   |

> [node——常用的模块插件(opens new window)](https://blog.csdn.net/YUHUI01/article/details/81048256)

#### node上传文件

```text
npm install multer
```

**引用模块**

它是依赖于express的一个模块

```js
//引用express并配置
var express = require("express");
var app = express();
app.listen(3000);
var multer = require('multer');
/*var upload = multer({
	//如果用这种方法上传，要手动添加文明名后缀
        //如果用下面配置的代码，则可以省略这一句
	dest: 'uploads/'
})*/
```

**配置**

> 设置保存文件的地方，并根据上传的文件名对应文件添加后缀可以通过`filename`属性定制文件保存的格式

| 属性值      | 用途                                                         |
| ----------- | ------------------------------------------------------------ |
| destination | 设置资源的保存路径。注意，如果没有这个配置项，默认会保存在`/tmp/uploads`下。此外，路径需要自己创建 |
| `filename`  | 设置资源保存在本地的文件名                                   |

```js
var storage = multer.diskStorage({
	//设置上传后文件路径，uploads文件夹会自动创建。
	destination: function(req, file, cb) {
		cb(null, './uploads')
	},
	//给上传文件重命名，获取添加后缀名
	filename: function(req, file, cb) {
		var fileFormat = (file.originalname).split(".");
		//给图片加上时间戳格式防止重名名
		//比如把 abc.jpg图片切割为数组[abc,jpg],然后用数组长度-1来获取后缀名
		cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
	}
});
var upload = multer({
	storage: storage
});
```

**接受文件**

> `upload.single('xxx')`，xxx与表单中的name属性的值对应这里虽然用到post请求，但实际上不需要bodyParser模块处理

```js
app.post('/upload-single', upload.single('logo'), function(req, res, next) {
	console.log(req.file)
	console.log('文件类型：%s', req.file.mimetype);
	console.log('原始文件名：%s', req.file.originalname);
	console.log((req.file.originalname).split("."))
	console.log('文件大小：%s', req.file.size);
	console.log('文件保存路径：%s', req.file.path);
	res.send({
		ret_code: '0'
	});
});
```

**多图上传**

多图上传只要更改一下地方，前端往file输入框加多一个multiple="multiple"属性值，此时就可以在选图的时候多选了，当然也可以并列多个file输入框(不推荐多个上传图片输入框)，这样体验会不好

```html
<input type="file" name="logo" multiple="multiple" />
```

后端也需要相应的改变

```js
app.post('/upload-single', upload.single('logo'), function(req, res, next) {
//upload.single('logo')变为upload.array('logo', 2)，数字代表可以接受多少张图片
app.post('/upload-single', upload.array('logo', 2), function(req, res, next) {
```

如果不想有图片数量上传限制，我们可以用`upload.any()`方法

```js
app.post('/upload-single', upload.any(), function(req, res, next) {	
	res.append("Access-Control-Allow-Origin","*");
	res.send({
		wscats_code: '0'
	});
});
```

**前端部分**

**formData表单提交**

```html
<form action="http://localhost:3000/upload-single" method="post" enctype="multipart/form-data">
	<h2>单图上传</h2>
	<input type="file" name="logo">
	<input type="submit" value="提交">
</form>
```

**formData表单+ajax提交**

```html
<form id="uploadForm">
	<p>指定文件名： <input type="text" name="filename" value="" /></p>
	<p>上传文件： <input type="file" name="logo" /></ p>
	<input type="button" value="上传" onclick="doUpload()" />
</form>
```

> `FormData`对象，是可以使用一系列的键值对来模拟一个完整的表单，然后使用`XMLHttpRequest`发送这个"表单"

**注意点**

- `processData`设置为`false`。因为`data`值是`FormData`对象，不需要对数据做处理。
- `<form>`标签添加`enctype="multipart/form-data"`属性。
- `cache`设置为false，上传文件不需要缓存。
- contentType设置为false。因为是由`<form>`表单构造的FormData对象，且已经声明了属性`enctype="multipart/form-data"`，所以这里设置为false上传后，服务器端代码需要使用从查询参数名为logo获取文件输入流对象，因为`<input>`中声明的是`name="logo"`

```js
function doUpload() {
	$.ajax({
		url: 'http://localhost:3000/upload-single',
		type: 'POST',
		cache: false, //不必须
		data: new FormData($('#uploadForm')[0]),
		processData: false,//必须
		contentType: false,//必须
		success: function(data) {
			console.log(data)
		}
	})
}
```

**改变样式**

可以先隐藏文件上传输入框

```html
<form id="uploadForm">
	<input style="display: none;" type="file" name="logo" onchange="doUpload()" multiple="multiple" />
</form>
```

为需要出发文件上传的标签添加点击事件

```html
<img onclick="uploadImg()" class="headpic" src="" />
function uploadImg(){
	$("#uploadForm input").trigger("click");//代理文件上传的事件
}
//触发真正的幕后上传事件
function doUpload() {
        //upload code
}
```

**携带其他参数**

可以用原生的`append`对请求体继续添加内容，既可以上传图片也可以带其他参数

```js
//构造form数据 
var data = new FormData();
data.append("avatar", fileNode.files[0]);
data.append("description", "其他参数");
```

#### 热启动

```text
npm install supervisor -g
```

全局安装后，就会有supervisor命令，它会自动检测你的文件变化，一旦变化则会自动重启

```text
supervisor app.js
```

#### 过滤器

可以设置对路由的拦截，比如用在登录拦截等

```js
// filter.js
exports.authorize = function(req, res, next) {
	if(req.body.token) {
		//res.redirect('/beauty/test');
		console.log(1)
	} else {
		//res.redirect('/beauty/getFemaleList');
		console.log(2)
		next();
	}
}
```

**路由逻辑**

```text
var express = require('express');
var router = express.Router(); //模块化
var filter = require('../filter.js');
router.get('/getFemaleList', filter.authorize, function(req, res) {
	res.send('hello world');
});
```

> 时访问`/getFemaleList`路由的时候就会进入过滤器逻辑，从而实现拦截功能

#### ES6

要让Express在ES6下跑起来就不得不用转码器Babel了。首先新建一个在某目录下新建一个项目。然后跳转到这个目录下开始下面的操作

全局安装

```text
npm install --save-dev babel-cli -g
```

然后，可以安装一些presets

```text
cnpm install --save-dev babel-preset-es2015 babel-preset-stage-2
```

在package.json里添加运行的脚本，这里就可以用ES6代码写程序，babel自动帮我们转ES5运行

```text
"scripts": {
    "start": "babel-node index.js --presets es2015,stage-2"
}
```

> 可以用`babel lib -d dist`命令将router文件夹的所有js转码

```text
"scripts": {
    "start": "babel-node --presets es2015,stage-2",
    "build": "babel router -d dist --presets es2015,stage-2",
     "serve": "node dist/index.js"
}
```

#### 脚手架

全局安装

```text
npm install -g express-generator@4
```

在一个文件夹里面用express命令创建应用架构

```text
express test
cd test
```

进入test文件夹安装依赖，推荐cnpm安装所有依赖

```text
npm install
```

启动应用

```text
SET DEBUG=test:*
npm start
```

访问在浏览器3000端口号

http://localhost:3000

**创建路由**

- 进入到test目录的routes文件夹,然后复制users.js
- 你可以改变`/home`这里的路径

```js
var express = require('express');
var router = express.Router();
router.get('/home', function(req, res, next) {
  res.send('hello world');
});
module.exports = router;
```

在app.js添加以下两条，该路由就完成了

```js
var homeRouter = require('./routes/home');
//code
app.use('/test', homeRouter);
```

访问该路径

http://localhost:3000/test/home

#### 配合await和async

```text
let db = require("../libs/db.js");
router.post('/findUser', async (req, res, next) => {
  let {
    id,
    name,
    skill
  } = req.body
  let data = await db.connect(`select * from students where ?`, [{
    id
  }])
  res.send(data);
});
```

### Koa

> Koa 是一个新的 web 框架，由 Express 幕后的原班人马打造， 致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。 通过利用 async 函数，Koa 帮你丢弃回调函数，并有力地增强错误处理。 Koa 并没有捆绑任何中间件， 而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序

#### 安装

Koa依赖node v7.6.0或ES2015及更高版本和async方法支持

```text
npm i koa
node my-koa-app.js
```

安装完之后可以新建`my-koa-app.js`，然后写以下代码，就可以简单创建一个服务器

```js
const Koa = require('koa');
const app = new Koa();
app.use(async ctx => {
  ctx.body = 'Hello World';
});
app.listen(3000);
```

#### 处理请求和响应

Koa Context将node的request和response对象封装到单个对象中，为编写 Web 应用程序和 API 提供了许多有用的方法，一般将它简写为ctx

```js
ctx.request; // 这是 koa Request
ctx.req; // 这是 node Request
// 注意：绕过 Koa 的 response 处理是 不被支持的. 应避免使用以下 node 属性：res.statusCode, res.writeHead(), res.write(), res.end()

res.statusCode
res.writeHead()
res.write()
res.end()
ctx.request

ctx.response; // 这是 koa Response
ctx.res; // 这是 node Response
```

区别于express框架，是在回调函数里面分开写request和response

为方便起见许多上下文的访问器和方法直接委托给它们的ctx.request或ctx.response，不然的话它们是相同的。 例如ctx.type和ctx.length委托给response对象ctx.path和ctx.method委托给request。所以ctx上面综合封装了多个request和response的方法

下面这个负责响应请求体的数据

```text
ctx.response.body=
ctx.body= // 简写
将响应体设置为以下之一：
string 写入
Buffer 写入
Stream 管道
Object || Array JSON-字符串化
null 无内容响应
```

> 也就是说如果传递数组或者字符串它会自动调用JSON.stringify()来序列化数据，并且response.status如未被设置, Koa将会自动设置状态为200或204。

#### Context

| GET       | POST             | JSONP     | COOKIE                           |
| --------- | ---------------- | --------- | -------------------------------- |
| ctx.query | ctx.request.body | ctx.query | ctx.cookies.get(name, [options]) |

> 注意post请求需要配合koa-bodyparser模块和`x-www-form-urlencoded`格式，如果是formdata 格式，可以用multer模块来解析

```js
const bodyParser = require('koa-bodyparser'); // 需要先安装koa-bodyparser npm install koa-bodyparser
app.use(bodyParser());
```

Request别名以下访问器和Request别名等效：

```text
ctx.header
ctx.headers
ctx.method
ctx.method=
ctx.url
ctx.url=
ctx.originalUrl
ctx.origin
ctx.href
ctx.path
ctx.path=
ctx.query
ctx.query=
ctx.querystring
ctx.querystring=
ctx.host
ctx.hostname
ctx.fresh
ctx.stale
ctx.socket
ctx.protocol
ctx.secure
ctx.ip
ctx.ips
ctx.subdomains
ctx.is()
ctx.accepts()
ctx.acceptsEncodings()
ctx.acceptsCharsets()
ctx.acceptsLanguages()
ctx.get()
```

Response别名,以下访问器和Response别名等效：

```js
ctx.body
ctx.body=
ctx.status
ctx.status=
ctx.message
ctx.message=
ctx.length=
ctx.length
ctx.type=
ctx.type
ctx.headerSent
ctx.redirect()
ctx.attachment()
ctx.set()
ctx.append()
ctx.remove()
ctx.lastModified=
ctx.etag=
```

### Egg

#### 安装

直接使用脚手架，可快速生成项目文件夹

```text
npm i egg-init -g
egg-init egg-example --type=simple
cd egg-example
npm i
```

#### 控制器

第一步需要编写的Controller和Router

```js
// app/controller/home.js（编写文件的位置）
const Controller = require('egg').Controller;
class HomeController extends Controller {
  async index() {
    this.ctx.body = 'Hello world';
  }
}
module.exports = HomeController;
```

**配置路由映射**

```js
// app/router.js（编写文件的位置）
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
};
```

#### 静态资源

- Egg 内置了 static 插件，线上环境建议部署到 CDN，无需该插件
- static 插件默认映射`/public/* -> app/public/*`目录
- 此处，我们把静态资源都放到`app/public`目录即可

> 并且在`plugin.js`添加以下代码

```js
exports.cors = {
  enable: true,
  package: 'egg-cors',
};
```

#### 服务

> 简单来说，Service 就是在复杂业务场景下用于做业务逻辑封装的一个抽象层，提供这个抽象有以下几个好处：

- 保持 Controller 中的逻辑更加简洁。 保持业务逻辑的独立性，抽象出来的 Service 可以被多个 Controller 重复调用。
- 将逻辑和展现分离，更容易编写测试用例，测试用例的编写具体可以查看这里。
- 所以我们可以把操作数据库的逻辑放在 Service 层

**定义 Service 文件**

```js
// app/service/user.js
const Service = require('egg').Service;
class UserService extends Service {
  // 默认不需要提供构造函数。
  // constructor(ctx) {
  //   super(ctx); 如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
  //   // 就可以直接通过 this.ctx 获取 ctx 了
  //   // 还可以直接通过 this.app 获取 app 了
  // }
  async find(uid) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const user = await this.ctx.db.query('select * from user where uid = ?', uid);
    // 假定这里还有一些复杂的计算，然后返回需要的信息。
    const picture = await this.getPicture(uid);
    return {
      name: user.user_name,
      age: user.age,
      picture,
    };
  }
  async getPicture(uid) {
    const result = await this.ctx.curl(`http://photoserver/uid=${uid}`, { dataType: 'json' });
    return result.data;
  }
}
module.exports = UserService;
```

我们就可以在 Controller 层用this.ctx.service.服务名xxx.方法xxx来调用服务里面封装好的方法

```js
// app/router.js
module.exports = app => {
  app.router.get('/user/:id', app.controller.user.info);
};
// app/controller/user.js
const Controller = require('egg').Controller;
class UserController extends Controller {
  async info() {
    const { ctx } = this;
    const userId = ctx.params.id;
    const userInfo = await ctx.service.user.find(userId);
    ctx.body = userInfo;
  }
}
module.exports = UserController;
```

#### 跨域

> 在`config/config.default.js`添加以下代码

```js
config.security = {
  csrf: {
    enable: false,
    ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
  },
  domainWhiteList: [ 'http://localhost:8000' ],
};
config.cors = {
  allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
};
```

#### 服务器代理

> 可以使用curl来代替第三方request模块，或者内置的http.request模块来实现服务器代理通讯

```js
class HomeController extends Controller {
  async news() {
    // 今日头条
    const { ctx } = this;
    const {
      data,
    } = await ctx.curl('https://m.toutiao.com/list/?tag=video&ac=wap&count=20&format=json_raw&as=A1457C764A41F74&cp=5C6AC19F07943E1&min_behot_time=0&_signature=1Y7F0AAAieymeM-.Mi2uANWOxc&i=', {
      dataType: 'json',
    });
    ctx.body = data;
  }
}
```

## Express 过滤器



在进入某个路由前先经过一个过滤逻辑，这个称之为过滤器

### 简单使用

```javascript
const express = require('express')
const app = express();

let filter = (req, res, next) => {
    if(req.params.name == 'admin' && req.params.pwd == 'admin'){
        next()
    } else {
        next('用户名密码不正确')
    }
    
}

app.get('/:name/:pwd', filter, (req, res) => {
    res.send('ok')
}).listen(88)
```

### 运行规则

- 访问 `http://localhost:88/admin/admin`
- 首先会进入过滤器方法 filter
- next()，不带任何参数，表示会直接进入目标路由，执行路由逻辑
- next('')，带参数，表示不会进入目标路由，并抛出错误。

### 全局使用--use

表示进入所有目标路由前都会先进入过滤器方法

### 简单使用

```javascript
const express = require('express')
const app = express();

let filter = (req, res, next) => {
    if(req.params.name == 'admin' && req.params.pwd == 'admin'){
        next()
    } else {
        next('用户名密码不正确')
    }
    
}

app.use(filter);

app.get('/:name/:pwd', (req, res) => {
    res.send('ok')
}).listen(88)
```

### 访问所有静态资源文件

```javascript
app.use(express.static(path.join(__dirname, '/')));
```

### 所有 post 使用 body-parser

```javascript
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
```

## Express 文件上传



- body-parser 并不技术文件上传，所以这里要用到另一个第三方模块 multer
- 安装 multer `npm install multer`
- 使用前先定义上传的路径

> 参考 https://github.com/poetries/learn-node/tree/master/uploadFiles

## Express https服务器



### 原生

```js
const https = require('https')
const path = require('path')
const fs = require('fs')

// 根据项目的路径导入生成的证书文件
const privateKey = fs.readFileSync(path.join(__dirname, '../github.key'), 'utf8')
const certificate = fs.readFileSync(path.join(__dirname, '../github.crt'), 'utf8')
const credentials = {
    key: privateKey,
    cert: certificate,
}

// 创建https服务器实例
const httpsServer = https.createServer(credentials, async (req, res) => {
    res.writeHead(200)
    res.end('Hello World!')
})

// 设置https的访问端口号
const SSLPORT = 8888

// 启动服务器，监听对应的端口
httpsServer.listen(SSLPORT, () => {
    console.log(`HTTPS Server is running on: https://localhost:${SSLPORT}`)
})
```

### Express

```js
const express = require('express')
const path = require('path')
const fs = require('fs')
const https = require('https')
// 根据项目的路径导入生成的证书文件
const privateKey = fs.readFileSync(path.join(__dirname, '../github.key'), 'utf8')
const certificate = fs.readFileSync(path.join(__dirname, '../github.crt'), 'utf8')
const credentials = {
    key: privateKey,
    cert: certificate,
}
// 创建express实例
const app = express()
// 处理请求
app.get('/', async (req, res) => {
    res.status(200).send('Hello World!')
})
// 创建https服务器实例
const httpsServer = https.createServer(credentials, app)
// 设置https的访问端口号
const SSLPORT = 8889
// 启动服务器，监听对应的端口
httpsServer.listen(SSLPORT, () => {
    console.log(`HTTPS Server is running on: https://localhost:${SSLPORT}`)
})
```

# Koa2

# 1.0 概念篇

> Koa 就是一种简单好用的 Web 框架。它的特点是优雅、简洁、表达力强、自由度高

## 一、基本用法

**1.1 架设 HTTP 服务**

> 只要三行代码，就可以用 `Koa` 架设一个 `HTTP` 服务。

```javascript
const Koa = require('koa');
const app = new Koa();

app.listen(3000);
```

> 打开浏览器，访问`http://127.0.0.1:3000` 。你会看到页面显示"Not Found"，表示没有发现任何内容。这是因为我们并没有告诉 `Koa` 应该显示什么内容

**1.2 Context 对象**

> `Koa` 提供一个 `Context` 对象，表示一次对话的上下文（包括 `HTTP` 请求和 `HTTP` 回复）。通过加工这个对象，就可以控制返回给用户的内容

- `Context.response.body`属性就是发送给用户的内容

```javascript
const Koa = require("koa");
const app = new Koa();

app.use(ctx => { //处理请求的中间件
    ctx.response.body = "hello world";
}).listen(3000);
```

> 上面代码中，`main`函数用来设置`ctx.response.body`。然后，使用`app.use`方法加载`main`函数

- `ctx.response`代表 `HTTP Response`。同样地，`ctx.request`代表 `HTTP Request`

**1.3 HTTP Response 的类型**

> `Koa` 默认的返回类型是`text/plain`，如果想返回其他类型的内容，可以先用`ctx.request.accepts`判断一下，客户端希望接受什么数据（根据 `HTTP Request` 的Accept字段），然后使用`ctx.response.type`指定返回类型

```javascript
const Koa = require("koa");
const app = new Koa();

app.use(ctx => {
    if (ctx.request.accepts('xml')) {
        ctx.response.type = 'xml';
        ctx.response.body = '<data>Hello World</data>';
    } else if (ctx.request.accepts('json')) {
        ctx.response.type = 'json';
        ctx.response.body = { data: 'Hello World' };
    } else if (ctx.request.accepts('html')) {
        ctx.response.type = 'html';
        ctx.response.body = '<p>Hello World</p>';
    } else {
        ctx.response.type = 'text';
        ctx.response.body = 'Hello World';
    }
}).listen(3000);
```

**1.4 网页模板**

> 实际开发中，返回给用户的网页往往都写成模板文件。我们可以让 Koa 先读取模板文件，然后将这个模板返回给用户

```javascript
const Koa = require("koa");
const app = new Koa();
const fs = require('fs');

app.use(ctx => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./demos/template.html');
}).listen(3000);
```

## 二、路由

> 网站一般都有多个页面。通过`ctx.request.path`可以获取用户请求的路径，由此实现简单的路由

```javascript
const Koa = require("koa");
const app = new Koa();
const fs = require('fs');

app.use(ctx => {
    if (ctx.request.path !== '/') {
        ctx.response.type = 'html';
        ctx.response.body = '<a href="/">Index Page1</a>';
    } else {
        ctx.response.body = 'Hello World';
    }
}).listen(3000);
```

**2.2 koa-route 模块**

> 原生路由用起来不太方便，我们可以使用封装好的`koa-route`模块

```javascript
const Koa = require("koa");
const app = new Koa();
const fs = require('fs');
const route = require('koa-route');

const main = route.get("/", ctx => {
    ctx.response.type = 'html';
    ctx.response.body = '<a href="/">Index Page1</a>';
})
const about = route.get("/about", ctx => {
    ctx.response.body = 'Hello World';
})

app.use(main);
app.use(about);
app.listen(3000);
```

**2.3 静态资源**

> 如果网站提供静态资源（图片、字体、样式表、脚本......），为它们一个个写路由就很麻烦，也没必要。`koa-static`模块封装了这部分的请求

```javascript
// 访问 http://localhost:3000/test.json
const Koa = require("koa");
const app = new Koa();

const path = require('path');
const serve = require('koa-static');

const main = serve(path.join(__dirname, "../public/"));

app.use(main);
app.listen(3000);
```

**2.4 重定向**

> 有些场合，服务器需要重定向（`redirect`）访问请求。比如，用户登陆以后，将他重定向到登陆前的页面。`ctx.response.redirect()`方法可以发出一个`302`跳转，将用户导向另一个路由

```javascript
const Koa = require("koa");
const app = new Koa();
const route = require("koa-route");

const redirect = route.get("/redirect", ctx => {
    ctx.response.redirect('/');
    ctx.response.body = '<a href="/">Index Page</a>';
})
const main = route.get("/", ctx => {
    ctx.response.body = "hello world";
});

app.use(main);
app.use(redirect);
app.listen(3000);
```

## 三、中间件

**3.1 Logger 功能**

> Koa 的最大特色，也是最重要的一个设计，就是中间件（middleware）。为了理解中间件，我们先看一下 Logger （打印日志）功能的实现

**3.2 中间件的概念**

> "中间件"（middleware），它处在 HTTP Request 和 HTTP Response 中间，用来实现某种中间功能。app.use()用来加载中间件

- 基本上，Koa 所有的功能都是通过中间件实现的，前面例子里面的main也是中间件
- 每个中间件默认接受两个参数，第一个参数是 Context 对象，第二个参数是next函数。只要调用next函数，就可以把执行权转交给下一个中间件

**3.3 中间件栈**

> 多个中间件会形成一个栈结构（`middle stack`），以"先进后出"（`first-in-last-out`）的顺序执行

- 最外层的中间件首先执行。
- 调用next函数，把执行权交给下一个中间件。
- ...
- 最内层的中间件最后执行。
- 执行结束后，把执行权交回上一层的中间件。
- ...
- 最外层的中间件收回执行权之后，执行next函数后面的代码

```javascript
const Koa = require('koa');
const app = new Koa();

const one = (ctx, next) => {
  console.log('>> one');
  next();
  console.log('<< one');
}

const two = (ctx, next) => {
  console.log('>> two');
  next();
  console.log('<< two');
}

const three = (ctx, next) => {
  console.log('>> three');
  next();
  console.log('<< three');
}

app.use(one);
app.use(two);
app.use(three);

app.listen(3000);
>> one
>> two
>> three
<< three
<< two
<< one
```

> 如果中间件内部没有调用`next`函数，那么执行权就不会传递下去

**3.4 异步中间件**

> 如果有异步操作（比如读取数据库），中间件就必须写成 `async` 函数

```javascript
const fs = require('fs.promised');
const Koa = require('koa');
const app = new Koa();

const main = async function (ctx, next) {
  ctx.response.type = 'html';
  ctx.response.body = await fs.readFile('./demos/template.html', 'utf8');
};

app.use(main);
app.listen(3000);
```

> 上面代码中，`fs.readFile`是一个异步操作，必须写成`await fs.readFile()`，然后中间件必须写成 `async`函数。

**3.5 中间件的合成**

> `koa-compose`模块可以将多个中间件合成为一个

```javascript
const Koa = require('koa');
const compose = require('koa-compose');
const app = new Koa();

const logger = (ctx, next) => {
  console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
  next();
}

const main = ctx => {
  ctx.response.body = 'Hello World';
};

const middlewares = compose([logger, main]);

app.use(middlewares);
app.listen(3000);
```

## 四、错误处理

**4.1 500 错误**

> 如果代码运行过程中发生错误，我们需要把错误信息返回给用户。HTTP 协定约定这时要返回500状态码

- `Koa`提供了`ctx.throw()`方法，用来抛出错误，`ctx.throw(500)`就是抛出`500`错误

```javascript
const Koa = require('koa');
const app = new Koa();

const main = ctx => {
  ctx.throw(500);
};

app.use(main);
app.listen(3000);
```

**4.2 404错误**

> 如果将`ctx.response.status`设置成`404`，就相当于`ctx.throw(404)`，返回`404`错误

```javascript
const Koa = require('koa');
const app = new Koa();

const main = ctx => {
  ctx.response.status = 404;
  ctx.response.body = 'Page Not Found';
};

app.use(main);
app.listen(3000);
```

**4.3 处理错误的中间件**

> 为了方便处理错误，最好使用`try...catch`将其捕获。但是，为每个中间件都写`try...catch`太麻烦，我们可以让最外层的中间件，负责所有中间件的错误处理

```javascript
const Koa = require('koa');
const app = new Koa();

const handler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    };
  }
};

const main = ctx => {
  ctx.throw(500);
};

app.use(handler);
app.use(main);
app.listen(3000);
```

**4.4 error 事件的监听**

> 运行过程中一旦出错，Koa 会触发一个error事件。监听这个事件，也可以处理错误

```javascript
const Koa = require('koa');
const app = new Koa();

const main = ctx => {
  ctx.throw(500);
};

app.on('error', (err, ctx) => {
  console.error('server error', err);
});

app.use(main);
app.listen(3000);
```

> 访问 http://127.0.0.1:3000 ，你会在命令行窗口看到"server error xxx"。

## 五、Web App 的功能

**5.1 Cookies**

> ctx.cookies用来读写 Cookie

> 访问 http://127.0.0.1:3000 ，你会看到1 views。刷新一次页面，就变成了2 views。再刷新，每次都会计数增加1

```javascript
const Koa = require('koa');
const app = new Koa();

const main = function(ctx) {
    const n = Number(ctx.cookies.get('view') || 0) + 1;
    ctx.cookies.set('view', n);
    ctx.response.body = n + ' views';
}

app.use(main);
app.listen(3000);
```

**5.2 表单**

> `Web`应用离不开处理表单。本质上，表单就是`POST` 方法发送到服务器的键值对。`koa-body`模块可以用来从 `POST` 请求的数据体里面提取键值对

```javascript
const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();

const main = async function(ctx) {
  const body = ctx.request.body;
  if (!body.name) ctx.throw(400, '.name required');
  ctx.body = { name: body.name };
};

app.use(koaBody());
app.use(main);
app.listen(3000);
```

- 打开另一个命令行窗口，运行下面的命令

```javascript
$ curl -X POST --data "name=Jack" 127.0.0.1:3000
{"name":"Jack"}

$ curl -X POST --data "name" 127.0.0.1:3000
name required
```

> 上面代码使用 POST 方法向服务器发送一个键值对，会被正确解析。如果发送的数据不正确，就会收到错误提示。

**2.3 文件上传**

> koa-body模块还可以用来处理文件上传

- 打开另一个命令行窗口，运行下面的命令，上传一个文件。注意，`/path/to/file`要更换为真实的文件路径

```javascript
$ curl --form upload=@/path/to/file http://127.0.0.1:3000
["/tmp/file"]
const os = require('os');
const path = require('path');
const Koa = require('koa');
const fs = require('fs');
const koaBody = require('koa-body');

const app = new Koa();

const main = async function(ctx) {
  const tmpdir = os.tmpdir();
  const filePaths = [];
  const files = ctx.request.body.files || {};

  for (let key in files) {
    const file = files[key];
    const filePath = path.join(tmpdir, file.name);
    const reader = fs.createReadStream(file.path);
    const writer = fs.createWriteStream(filePath);
    reader.pipe(writer);
    filePaths.push(filePath);
  }

  ctx.body = filePaths;
};

app.use(koaBody({ multipart: true }));
app.use(main);
app.listen(3000);
```

# 1.1 快速开始

## 环境准备

- 因为node.js v7.6.0开始完全支持async/await，不需要加flag，所以node.js环境都要7.6.0以上
- node.js环境 版本v7.6以上
  - 直接安装node.js 7.6：node.js官网地址[https://nodejs.org(opens new window)](https://nodejs.org/)
  - nvm管理多版本node.js：可以用nvm 进行node版本进行管理
    - Mac系统安装nvm [https://github.com/creationix/nvm#manual-install(opens new window)](https://github.com/creationix/nvm#manual-install)
    - windows系统安装nvm [https://github.com/coreybutler/nvm-windows(opens new window)](https://github.com/coreybutler/nvm-windows)
    - Ubuntu系统安装nvm [https://github.com/creationix/nvm(opens new window)](https://github.com/creationix/nvm)
- npm 版本3.x以上

## 快速开始

### 安装koa2

```sh
# 初始化package.json
npm init

# 安装koa2 
npm install koa
```

### hello world 代码

```js
const Koa = require('koa')
const app = new Koa()

app.use( async ( ctx ) => {
  ctx.body = 'hello koa2'
})

app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')
```

### 启动demo

由于koa2是基于async/await操作中间件，目前node.js 7.x的harmony模式下才能使用，所以启动的时的脚本如下：

```sh
node index.js
```

访问[http:localhost:3000 (opens new window)](http://interview.poetries.top/fe-nodejs-docs/nodejs-docs/koa2/localhost:3000)，效果如下

![start-result-01](https://interview.poetries.top/fe-nodejs-docs/assets/img/start-result-01.b2e9bed6.png)

# 1.2 async await使用

## 快速上手理解

先复制以下这段代码，在粘贴在chrome的控制台console中，按回车键执行

```js
function getSyncTime() {
  return new Promise((resolve, reject) => {
    try {
      let startTime = new Date().getTime()
      setTimeout(() => {
        let endTime = new Date().getTime()
        let data = endTime - startTime
        resolve( data )
      }, 500)
    } catch ( err ) {
      reject( err )
    }
  })
}

async function getSyncData() {
  let time = await getSyncTime()
  let data = `endTime - startTime = ${time}`
  return data
}

async function getData() {
  let data = await getSyncData()
  console.log( data )
}

getData()
```

### 在chrome的console中执行结果如下

![async](https://interview.poetries.top/fe-nodejs-docs/assets/img/async.8869f199.png)

### 从上述例子可以看出 async/await 的特点：

- 可以让异步逻辑用同步写法实现
- 最底层的await返回需要是Promise对象
- 可以通过多层 async function 的同步写法代替传统的callback嵌套



# 1.3 koa2简析结构

## 源码文件

```text
├── lib
│   ├── application.js
│   ├── context.js
│   ├── request.js
│   └── response.js
└── package.json
```

这个就是 `GitHub` [https://github.com/koajs/koa (opens new window)](https://github.com/koajs/koa/)上开源的koa2源码的源文件结构，核心代码就是lib目录下的四个文件

- application.js 是整个koa2 的入口文件，封装了context，request，response，以及最核心的中间件处理流程。
- context.js 处理应用上下文，里面直接封装部分request.js和response.js的方法
- request.js 处理http请求
- response.js 处理http响应

## koa2特性

- 只提供封装好http上下文、请求、响应，以及基于`async/await`的中间件容器。
- 利用ES7的`async/await`的来处理传统回调嵌套问题和代替koa@1的generator，但是需要在node.js 7.x的harmony模式下才能支持`async/await`。
- 中间件只支持 `async/await` 封装的，如果要使用koa@1基于generator中间件，需要通过中间件koa-convert封装一下才能使用。



# 1.4 koa中间件开发使用

> 注：原文地址在我的博客issue里[https://github.com/ChenShenhai/blog/issues/15(opens new window)](https://github.com/ChenShenhai/blog/issues/15)

- koa v1和v2中使用到的中间件的开发和使用
- generator 中间件开发在koa v1和v2中使用
- async await 中间件开发和只能在koa v2中使用

## generator中间件开发

> generator中间件返回的应该是function * () 函数

```js
/* ./middleware/logger-generator.js */
function log( ctx ) {
    console.log( ctx.method, ctx.header.host + ctx.url )
}

module.exports = function () {
    return function * ( next ) {

        // 执行中间件的操作
        log( this )

        if ( next ) {
            yield next
        }
    }
}
```

### generator中间件在koa@1中的使用

> generator 中间件在koa v1中可以直接use使用

```js
const koa = require('koa')  // koa v1
const loggerGenerator  = require('./middleware/logger-generator')
const app = koa()

app.use(loggerGenerator())

app.use(function *( ) {
    this.body = 'hello world!'
})

app.listen(3000)
console.log('the server is starting at port 3000')
```

### generator中间件在koa@2中的使用

> generator 中间件在koa v2中需要用koa-convert封装一下才能使用

```js
const Koa = require('koa') // koa v2
const convert = require('koa-convert')
const loggerGenerator  = require('./middleware/logger-generator')
const app = new Koa()

app.use(convert(loggerGenerator()))

app.use(( ctx ) => {
    ctx.body = 'hello world!'
})

app.listen(3000)
console.log('the server is starting at port 3000')
```

## async中间件开发

```js
/* ./middleware/logger-async.js */

function log( ctx ) {
    console.log( ctx.method, ctx.header.host + ctx.url )
}

module.exports = function () {
  return async function ( ctx, next ) {
    log(ctx);
    await next()
  }
}
```

### async 中间件在koa@2中使用

> async 中间件只能在 koa v2中使用

```js
const Koa = require('koa') // koa v2
const loggerAsync  = require('./middleware/logger-async')
const app = new Koa()

app.use(loggerAsync())

app.use(( ctx ) => {
    ctx.body = 'hello world!'
})

app.listen(3000)
console.log('the server is starting at port 3000')
```

# 10.1 单元测试

## 前言

测试是一个项目周期里必不可少的环节，开发者在开发过程中也是无时无刻进行“人工测试”，如果每次修改一点代码，都要牵一发动全身都要手动测试关联接口，这样子是禁锢了生产力。为了解放大部分测试生产力，相关的测试框架应运而生，比较出名的有mocha，karma，jasmine等。虽然框架繁多，但是使用起来都是大同小异。

## 准备工作

### 安装测试相关框架

```sh
npm install --save-dev mocha chai supertest
```

- mocha 模块是测试框架
- chai 模块是用来进行测试结果断言库，比如一个判断 1 + 1 是否等于 2
- supertest 模块是http请求测试库，用来请求API接口

## 测试例子

demo地址

[https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/test-unit/(opens new window)](https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/test-unit/)

### 例子目录

```sh
.
├── index.js # api文件
├── package.json
└── test # 测试目录
    └── index.test.js # 测试用例
```

### 所需测试demo

```js
const Koa = require('koa')
const app = new Koa()

const server = async ( ctx, next ) => {
  let result = {
    success: true,
    data: null
  }

  if ( ctx.method === 'GET' ) { 
    if ( ctx.url === '/getString.json' ) {
      result.data = 'this is string data'
    } else if ( ctx.url === '/getNumber.json' ) {
      result.data = 123456
    } else {
      result.success = false
    }
    ctx.body = result
    next && next()
  } else if ( ctx.method === 'POST' ) {
    if ( ctx.url === '/postData.json' ) {
      result.data = 'ok'
    } else {
      result.success = false
    }
    ctx.body = result
    next && next()
  } else {
    ctx.body = 'hello world'
    next && next()
  }
}

app.use(server)

module.exports = app

app.listen(3000, () => {
  console.log('[demo] test-unit is starting at port 3000')
})
```

启动服务后访问接口会看到以下数据

[http://localhost:3000/getString.json(opens new window)](http://localhost:3000/getString.json)

![test-unit-result-01](https://interview.poetries.top/fe-nodejs-docs/assets/img/test-unit-result-01.26c6e3fb.png)

### 开始写测试用例

demo/test-unit/test/index.test.js

```js
const supertest = require('supertest')
const chai = require('chai')
const app = require('./../index')

const expect = chai.expect
const request = supertest( app.listen() )

// 测试套件/组
describe( '开始测试demo的GET请求', ( ) => {
  
  // 测试用例
  it('测试/getString.json请求', ( done ) => {
      request
        .get('/getString.json')
        .expect(200)
        .end(( err, res ) => {
            // 断言判断结果是否为object类型
            expect(res.body).to.be.an('object')
            expect(res.body.success).to.be.an('boolean')
            expect(res.body.data).to.be.an('string')
            done()
        })
  })
})
```

### 执行测试用例

```sh
# node.js <= 7.5.x
./node_modules/.bin/mocha  --harmony

# node.js = 7.6.0
./node_modules/.bin/mocha
```

> 注意：
>
> 1. 如果是全局安装了mocha，可以直接在当前项目目录下执行 mocha --harmony 命令
> 2. 如果当前node.js版本低于7.6，由于7.5.x以下还直接不支持async/awiar就需要加上--harmony

会自动读取执行命令 ./test 目录下的测用例文件 inde.test.js，并执行。测试结果如下 ![test-unit-result-03](https://interview.poetries.top/fe-nodejs-docs/assets/img/test-unit-result-03.e6e0ac18.png)

### 用例详解

#### 服务入口加载

如果要对一个服务的API接口，进行单元测试，要用supertest加载服务的入口文件

```js
const supertest = require('supertest')
const request = supertest( app.listen() )
```

#### 测试套件、用例

- describe()描述的是一个测试套件
- 嵌套在describe()的it()是对接口进行自动化测试的测试用例
- 一个describe()可以包含多个it()

```js
describe( '开始测试demo的GET请求', ( ) => {
    it('测试/getString.json请求', () => {
        // TODO ...
    })
})
```

- supertest封装服务request，是用来请求接口
- chai.expect使用来判断测试结果是否与预期一样
  - chai 断言有很多种方法，这里只是用了数据类型断言



# 11.1 开发debug

# 开发debug

## 快速开始

### 环境

- node环境 8.x +
- chrome 60+

### 启动脚本

#### 调试demo

[https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/start-quick/(opens new window)](https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/start-quick/index.js)

```text
node --inspect index.js
```

#### 指令框显示

> 指令框就会出现以下字样

```sh
Debugger listening on ws://127.0.0.1:9229/4c23c723-5197-4d23-9b90-d473f1164abe
For help see https://nodejs.org/en/docs/inspector
```

![debug-result](https://interview.poetries.top/fe-nodejs-docs/assets/img/debug-result-001.c1c9cb8b.png)

#### 访问chrome浏览器调试server

![debug-result](https://interview.poetries.top/fe-nodejs-docs/assets/img/debug-result-002.cbdc9f49.png)

> 打开浏览器调试窗口会看到一个node.js 的小logo

![debug-result](data:image/png;base64,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)

#### 打开chrome浏览器的node调试窗口

![debug-result](https://interview.poetries.top/fe-nodejs-docs/assets/img/debug-result-004.e04cba67.png)

![debug-result](https://interview.poetries.top/fe-nodejs-docs/assets/img/debug-result-006.d34cb585.png)

> 注意打开了node的调试窗口后，原来绿色的node按钮会变灰色，同时调试框会显示debug状态

![debug-result](https://interview.poetries.top/fe-nodejs-docs/assets/img/debug-result-005.b58632fc.png)

![debug-result](https://interview.poetries.top/fe-nodejs-docs/assets/img/debug-result-008.6db33e88.png)

#### 可以自定义打断点调试了

![debug-result](https://interview.poetries.top/fe-nodejs-docs/assets/img/debug-result-007.7808a7f2.png)



# 12.1 快速启动

### demo地址

[https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/project/(opens new window)](https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/project/)

### 环境准备

### 初始化数据库

- 安装MySQL5.6以上版本
- 创建数据库koa_demo

```sh
create database koa_demo;
```

- 配置项目config.js

[https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/project/(opens new window)](https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/project/)

```js
const config = {
  // 启动端口
  port: 3001,

  // 数据库配置
  database: {
    DATABASE: 'koa_demo',
    USERNAME: 'root',
    PASSWORD: 'abc123',
    PORT: '3306',
    HOST: 'localhost'
  }
}

module.exports = config
```

### 启动脚本

```sh
# 安装淘宝镜像cnpm
npm install -g cnpm --registry=https://registry.npm.taobao.org

# 安装依赖
cnpm install

# 数据建库初始化
npm run init_sql

# 编译react.js源码
npm run start_static

# 启动服务
npm run start_server 
```

### 访问项目demo

[http://localhost:3001/admin(opens new window)](http://localhost:3001/admin)

![project-result](https://interview.poetries.top/fe-nodejs-docs/assets/img/project-result-02.d31821b8.png)



# 12.2 框架设计

## 实现概要



- koa2 搭建服务
- MySQL作为数据库
  - mysql 5.7 版本
  - 储存普通数据
  - 存储session登录态数据
- 渲染
  - 服务端渲染：ejs作为服务端渲染的模板引擎
  - 前端渲染：用webpack4环境编译react.js动态渲染页面，使用ant-design框架

## 文件目录设计



demo源码

[https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/project/(opens new window)](https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/project/config.js)

```sh
├── init # 数据库初始化目录
│   ├── index.js # 初始化入口文件
│   ├── sql/    # sql脚本文件目录
│   └── util/   # 工具操作目录
├── package.json 
├── config.js # 配置文件
├── server  # 后端代码目录
│   ├── app.js # 后端服务入口文件
│   ├── codes/ # 提示语代码目录
│   ├── controllers/    # 操作层目录
│   ├── models/ # 数据模型model层目录
│   ├── routers/ # 路由目录
│   ├── services/   # 业务层目录
│   ├── utils/  # 工具类目录
│   └── views/  # 模板目录
└── static # 前端静态代码目录
    ├── build/   # webpack编译配置目录
    ├── output/  # 编译后前端代码目录&静态资源前端访问目录
    └── src/ # 前端源代码目录
```

## 入口文件预览



```js
const path = require('path')
const Koa = require('koa')
const convert = require('koa-convert')
const views = require('koa-views')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const koaLogger = require('koa-logger')
const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')

const config = require('./../config')
const routers = require('./routers/index')

const app = new Koa()

// session存储配置
const sessionMysqlConfig= {
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST,
}

// 配置session中间件
app.use(session({
  key: 'USER_SID',
  store: new MysqlStore(sessionMysqlConfig)
}))

// 配置控制台日志中间件
app.use(convert(koaLogger()))

// 配置ctx.body解析中间件
app.use(bodyParser())

// 配置静态资源加载中间件
app.use(convert(koaStatic(
  path.join(__dirname , './../static')
)))

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

// 监听启动端口
app.listen( config.port )
console.log(`the server is start at port ${config.port}`)
```

# 12.3 分层操作

## 后端代码目录



```sh
└── server
    ├── controllers # 操作层 执行服务端模板渲染，json接口返回数据，页面跳转
    │   ├── admin.js
    │   ├── index.js
    │   ├── user-info.js
    │   └── work.js
    ├── models # 数据模型层 执行数据操作
    │   └── user-Info.js
    ├── routers # 路由层 控制路由
    │   ├── admin.js
    │   ├── api.js
    │   ├── error.js
    │   ├── home.js
    │   ├── index.js
    │   └── work.js
    ├── services # 业务层 实现数据层model到操作层controller的耦合封装
    │   └── user-info.js
    └── views # 服务端模板代码
        ├── admin.ejs
        ├── error.ejs
        ├── index.ejs
        └── work.ejs
```



# 12.4 数据库设计

## 初始化数据库脚本



### 脚本目录

./demos/project/init/sql/

```sql
CREATE TABLE   IF NOT EXISTS  `user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT, # 用户ID
  `email` varchar(255) DEFAULT NULL,    # 邮箱地址
  `password` varchar(255) DEFAULT NULL, # 密码
  `name` varchar(255) DEFAULT NULL,     # 用户名
  `nick` varchar(255) DEFAULT NULL,     # 用户昵称
  `detail_info` longtext DEFAULT NULL,  # 详细信息
  `create_time` varchar(20) DEFAULT NULL,   # 创建时间
  `modified_time` varchar(20) DEFAULT NULL, # 修改时间
  `level` int(11) DEFAULT NULL, # 权限级别
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# 插入默认信息
INSERT INTO `user_info` set name='admin001', email='admin001@example.com', password='123456';
```



# 12.5 路由设计

## 使用koa-router中间件



### 路由目录

```sh
# ...
└── server # 后端代码目录
    └── routers
        ├── admin.js # /admin/* 子路由
        ├── api.js #  resetful /api/* 子路由
        ├── error.js #   /error/* 子路由
        ├── home.js # 主页子路由
        ├── index.js # 子路由汇总文件
        └── work.js # /work/* 子路由
 # ...
```

### 子路由配置

### resetful API 子路由

例如api子路由/user/getUserInfo.json，整合到主路由，加载到中间件后，请求的路径会是 http://www.example.com/api/user/getUserInfo.json

./demos/project/server/routers/api.js

```js
/**
 * restful api 子路由
 */

const router = require('koa-router')()
const userInfoController = require('./../controllers/user-info')

const routers = router
  .get('/user/getUserInfo.json', userInfoController.getLoginUserInfo)
  .post('/user/signIn.json', userInfoController.signIn)
  .post('/user/signUp.json', userInfoController.signUp)

module.exports = routers
```

#### 子路由汇总

./demos/project/server/routers/index.js

```js
/**
 * 整合所有子路由
 */

const router = require('koa-router')()

const home = require('./home')
const api = require('./api')
const admin = require('./admin')
const work = require('./work')
const error = require('./error')

router.use('/', home.routes(), home.allowedMethods())
router.use('/api', api.routes(), api.allowedMethods())
router.use('/admin', admin.routes(), admin.allowedMethods())
router.use('/work', work.routes(), work.allowedMethods())
router.use('/error', error.routes(), error.allowedMethods())
module.exports = router
```

#### app.js加载路由中间件

./demos/project/server/app.js

```js
const routers = require('./routers/index')

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())
```



# 12.6 webpack4环境搭建

## 前言



由于demos/project 前端渲染是通过react.js渲染的，这就需要webpack4 对react.js及其相关JSX，ES6/7代码进行编译和混淆压缩。

## webpack4



### 安装和文档

可访问网[https://webpack.js.org/(opens new window)](https://webpack.js.org/)

## 配置webpack4编译react.js + less + sass + antd 环境



### 文件目录

```sh
└── static # 项目静态文件目录
    ├── build
    │   ├── webpack.base.config.js # 基础编译脚本
    │   ├── webpack.dev.config.js # 开发环境编译脚本
    │   └── webpack.prod.config.js # 生产环境编译脚本
    ├── output # 编译后输出目录
    │   ├── asset
    │   ├── dist
    │   └── upload
    └── src # 待编译的ES6/7、JSX源代码
        ├── api
        ├── apps
        ├── components
        ├── pages
        ├── texts
        └── utils
```

### webpack4 编译基础配置

#### babel@7 配置

```js
const babelConfig = {
  presets: [
    '@babel/env',
    // [
    //   '@babel/env',
    //   {
    //     targets: {
    //       edge: '17',
    //       firefox: '60',
    //       chrome: '67',
    //       safari: '11.1'
    //     },
    //     useBuiltIns: 'usage'
    //   }
    // ],
    '@babel/preset-react'
  ],
  'plugins': [
    [
      'import',
      { 'libraryName': 'antd', 'libraryDirectory': 'lib' },
      'ant'
    ],
    [
      'import',
      { 'libraryName': 'antd-mobile', 'libraryDirectory': 'lib' },
      'antd-mobile'
    ],
    '@babel/plugin-proposal-class-properties'
  ]
};

module.exports = babelConfig;
```

#### webpack.base.config.js

```js
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const babelConfig = require('./babel.config');

// const prodMode = process.env.NODE_ENV === 'production';

const srcResolve = function (file) {
  return path.join(__dirname, '..', 'src', file);
};

const distResolve = function (file) {
  return path.join(__dirname, '..', 'output', 'dist', file);
};

module.exports = {
  entry: {
    'index': srcResolve('js/index'),
    'admin' : srcResolve('pages/admin.js'),
    'work' : srcResolve('pages/work.js'),
    'index' : srcResolve('pages/index.js'),
    'error' : srcResolve('pages/error.js'),
  },
  output: {
    path: distResolve(''),
    filename: 'vendorjs/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: babelConfig
        }
      },
      {
        test: /\.(css|less)$/,
        use: [
          // devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          // 'postcss-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                return [];
              }
            }
          },
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  }
};
```

### 配置开发&生产环境webpack4 编译设置

为了方便编译基本配置代码统一管理，开发环境（wepack.dev.config.js）和生产环境（webpack.prod.config.js）的编译配置都是继承了基本配置（wepack.base.config.js）的代码

#### 开发环境配置 wepack.dev.config.js

```js
var merge = require('webpack-merge')
var webpack = require('webpack')
var baseWebpackConfig = require('./webpack.base.config');

module.exports = merge(baseWebpackConfig, {

  devtool: 'source-map',
  plugins: [
    
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
  ]
})
```

#### 编译环境配置 wepack.prod.config.js

```js
process.env.NODE_ENV = 'production';

const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const config = require('./webpack.base.config');

module.exports = merge(config, {
  mode: 'production',
  // plugins: [
  //   new UglifyJsPlugin()
  // ]
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
});
```



# 12.7 使用react

## react.js简介



react.js 是作为前端渲染的js库（注意：不是框架）。react.js用JSX开发来描述DOM结构，通过编译成virtual dom的在浏览器中进行view渲染和动态交互处理。更多了解可查阅GitHub[https://facebook.github.io/react/(opens new window)](https://facebook.github.io/react/)

## 编译使用



由于react.js开发过程用JSX编程，无法直接在浏览器中运行，需要编译成浏览器可识别运行的virtual dom。从JSX开发到运行，需要有一个编译的过程。目前最常用的方案是用webpack + babel进行编译打包。

## 前端待编译源文件目录



demos/project/static/

```sh
.
├── build # 编译的webpack脚本
│   ├── webpack.base.config.js
│   ├── webpack.dev.config.js
│   └── webpack.prod.config.js
├── output # 输出文件
│   ├── asset
│   ├── dist #  react.js编译后的文件目录
│   └── ...
└── src
   ├── apps # 页面react.js应用
   │   ├── admin.jsx
   │   ├── error.jsx
   │   ├── index.jsx
   │   └── work.jsx
   ├── components # jsx 模块、组件
   │   ├── footer-common.jsx
   │   ├── form-group.jsx
   │   ├── header-nav.jsx
   │   ├── sign-in-form.jsx
   │   └── sign-up-form.jsx
   └── pages # react.js 执行render文件目录
       ├── admin.js
       ├── error.js
       ├── index.js
       └── work.js
        ...
```

### react.js页面应用文件

static/src/apps/index.jsx 文件

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Layout, Menu, Breadcrumb } from 'antd'
import HeadeNav from './../components/header-nav.jsx'
import FooterCommon from './../components/footer-common.jsx'
import 'antd/lib/layout/style/css'

const { Header, Content, Footer } = Layout

class App extends React.Component {
  render() {
    return (
      <Layout className="layout">
        <HeadeNav/>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '12px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <p>index</p>
          </div>
        </Content>
        <FooterCommon />
      </Layout>
    )
  }
}
export default App
```

### react.js执行render渲染

static/src/pages/index.js 文件

```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './../apps/index.jsx'

ReactDOM.render( <App />,
  document.getElementById("app"))
```

### 静态页面引用react.js编译后文件

```sh
<!DOCTYPE html>
<html>
<head>
    <title><%= title %></title>
    <link rel="stylesheet" href="/output/dist/css/index.css">
</head>
<body>
    <div id="app"></div>
    <script src="/output/dist/js/vendor.js"></script>
    <script src="/output/dist/js/index.js"></script>
</body>
</html>
```

### 页面渲染效果

![project-result-01.png](https://interview.poetries.top/fe-nodejs-docs/assets/img/project-result-00.a12f59c9.png)



# 12.8 登录注册功能实现

## 用户模型dao操作



```js
/**
   * 数据库创建用户
   * @param  {object} model 用户数据模型
   * @return {object}       mysql执行结果
   */
  async create ( model ) {
    let result = await dbUtils.insertData( 'user_info', model )
    return result
  },

  /**
   * 查找一个存在用户的数据
   * @param  {obejct} options 查找条件参数
   * @return {object|null}        查找结果
   */
  async getExistOne(options ) {
    let _sql = `
    SELECT * from user_info
      where email="${options.email}" or name="${options.name}"
      limit 1`
    let result = await dbUtils.query( _sql )
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },

  /**
   * 根据用户名和密码查找用户
   * @param  {object} options 用户名密码对象
   * @return {object|null}         查找结果
   */
  async getOneByUserNameAndPassword( options ) {
    let _sql = `
    SELECT * from user_info
      where password="${options.password}" and name="${options.name}"
      limit 1`
    let result = await dbUtils.query( _sql )
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },

  /**
   * 根据用户名查找用户信息
   * @param  {string} userName 用户账号名称
   * @return {object|null}     查找结果
   */
  async getUserInfoByUserName( userName ) {

    let result = await dbUtils.select(
      'user_info',
      ['id', 'email', 'name', 'detail_info', 'create_time', 'modified_time', 'modified_time' ])
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },
```

### 业务层操作

```js
/**
   * 创建用户
   * @param  {object} user 用户信息
   * @return {object}      创建结果
   */
  async create( user ) {
    let result = await userModel.create(user)
    return result
  },

  /**
   * 查找存在用户信息
   * @param  {object} formData 查找的表单数据
   * @return {object|null}      查找结果
   */
  async getExistOne( formData ) {
    let resultData = await userModel.getExistOne({
      'email': formData.email,
      'name': formData.userName
    })
    return resultData
  },

  /**
   * 登录业务操作
   * @param  {object} formData 登录表单信息
   * @return {object}          登录业务操作结果
   */
  async signIn( formData ) {
    let resultData = await userModel.getOneByUserNameAndPassword({
      'password': formData.password,
      'name': formData.userName})
    return resultData
  },


  /**
   * 根据用户名查找用户业务操作
   * @param  {string} userName 用户名
   * @return {object|null}     查找结果
   */
  async getUserInfoByUserName( userName ) {
    
    let resultData = await userModel.getUserInfoByUserName( userName ) || {}
    let userInfo = {
      // id: resultData.id,
      email: resultData.email,
      userName: resultData.name,
      detailInfo: resultData.detail_info,
      createTime: resultData.create_time
    }
    return userInfo
  },


  /**
   * 检验用户注册数据
   * @param  {object} userInfo 用户注册数据
   * @return {object}          校验结果
   */
  validatorSignUp( userInfo ) {
    let result = {
      success: false,
      message: '',
    }

    if ( /[a-z0-9\_\-]{6,16}/.test(userInfo.userName) === false ) {
      result.message = userCode.ERROR_USER_NAME
      return result
    }
    if ( !validator.isEmail( userInfo.email ) ) {
      result.message = userCode.ERROR_EMAIL
      return result
    }
    if ( !/[\w+]{6,16}/.test( userInfo.password )  ) {
      result.message = userCode.ERROR_PASSWORD
      return result
    }
    if ( userInfo.password !== userInfo.confirmPassword ) {
      result.message = userCode.ERROR_PASSWORD_CONFORM
      return result
    }

    result.success = true

    return result
  }
```

### controller 操作

```js
 /**
   * 登录操作
   * @param  {obejct} ctx 上下文对象
   */
  async signIn( ctx ) {
    let formData = ctx.request.body
    let result = {
      success: false,
      message: '',
      data: null,
      code: ''
    }

    let userResult = await userInfoService.signIn( formData )

    if ( userResult ) {
      if ( formData.userName === userResult.name ) {
        result.success = true
      } else {
        result.message = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR
        result.code = 'FAIL_USER_NAME_OR_PASSWORD_ERROR'
      }
    } else {
      result.code = 'FAIL_USER_NO_EXIST',
      result.message = userCode.FAIL_USER_NO_EXIST
    }

    if ( formData.source === 'form' && result.success === true ) {
      let session = ctx.session
      session.isLogin = true
      session.userName = userResult.name
      session.userId = userResult.id

      ctx.redirect('/work')
    } else {
      ctx.body = result
    }
  },

  /**
   * 注册操作
   * @param   {obejct} ctx 上下文对象
   */
  async signUp( ctx ) {
    let formData = ctx.request.body
    let result = {
      success: false,
      message: '',
      data: null
    }

    let validateResult = userInfoService.validatorSignUp( formData )

    if ( validateResult.success === false ) {
      result = validateResult
      ctx.body = result
      return
    }

    let existOne  = await userInfoService.getExistOne(formData)
    console.log( existOne )

    if ( existOne  ) {
      if ( existOne .name === formData.userName ) {
        result.message = userCode.FAIL_USER_NAME_IS_EXIST
        ctx.body = result
        return
      }
      if ( existOne .email === formData.email ) {
        result.message = userCode.FAIL_EMAIL_IS_EXIST
        ctx.body = result
        return
      }
    }


    let userResult = await userInfoService.create({
      email: formData.email,
      password: formData.password,
      name: formData.userName,
      create_time: new Date().getTime(),
      level: 1,
    })

    console.log( userResult )

    if ( userResult && userResult.insertId * 1 > 0) {
      result.success = true
    } else {
      result.message = userCode.ERROR_SYS
    }

    ctx.body = result
  },
```

### api路由操作

```js
const router = require('koa-router')()
const userInfoController = require('./../controllers/user-info')

const routers = router
  .get('/user/getUserInfo.json', userInfoController.getLoginUserInfo)
  .post('/user/signIn.json', userInfoController.signIn)
  .post('/user/signUp.json', userInfoController.signUp)
```

## 前端用react.js实现效果



登录模式 ![project-result-01](https://interview.poetries.top/fe-nodejs-docs/assets/img/project-result-01.7864a550.png) 注册模式 ![project-result-01](https://interview.poetries.top/fe-nodejs-docs/assets/img/project-result-02.d31821b8.png)



# 12.9 session登录状态判断处理

## 使用session中间件



```js
// code ...
const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')

const config = require('./../config')

// code ...

const app = new Koa()

// session存储配置
const sessionMysqlConfig= {
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST,
}

// 配置session中间件
app.use(session({
  key: 'USER_SID',
  store: new MysqlStore(sessionMysqlConfig)
}))
// code ...
```

## 登录成功后设置session到MySQL和设置sessionId到cookie



```js
let session = ctx.session
session.isLogin = true
session.userName = userResult.name
session.userId = userResult.id
```

## 需要判断登录态页面进行session判断



```js
async indexPage ( ctx ) {
    // 判断是否有session
    if ( ctx.session && ctx.session.isLogin && ctx.session.userName ) {
      const title = 'work页面'
      await ctx.render('work', {
        title,
      })
    } else {
      // 没有登录态则跳转到错误页面
      ctx.redirect('/error')
    }
  },
```



# 13.1 import export使用

## 前言



Node 9最激动人心的是提供了在flag模式下使用`ECMAScript Modules`，虽然现在还是`Stability: 1 - Experimental`阶段，但是可以让Noder抛掉babel等工具的束缚，直接在Node环境下愉快地去玩耍`import/export`

如果觉得文字太多，看不下去，可以直接去玩玩demo，地址是[https://github.com/chenshenhai/node-modules-demo(opens new window)](https://github.com/chenshenhai/node-modules-demo)

## Node 9下import/export使用简单须知



- Node 环境必须在 9.0以上
- 不加loader时候，使用`import/export`的文件后缀名必须为`*.mjs`（下面会讲利用Loader Hooks兼容`*.js`后缀文件）
- 启动必须加上flag `--experimental-modules`
- 文件的`import`和`export`必须严格按照`ECMAScript Modules`语法
- `ECMAScript Modules`和`require()`的cache机制不一样

## 使用简述



Node 9.x官方文档 [https://nodejs.org/dist/latest-v9.x/docs/api/esm.html(opens new window)](https://nodejs.org/dist/latest-v9.x/docs/api/esm.html)

### 与require()区别

| 能力       | 描述                    | require()                    | import                                                       |
| ---------- | ----------------------- | ---------------------------- | ------------------------------------------------------------ |
| NODE_PATH  | 从NODE_PATH加载依赖模块 | Y                            | N                                                            |
| cache      | 缓存机制                | 可以通过require的API操作缓存 | 自己独立的缓存机制，目前不可访问                             |
| path       | 引用路径                | 文件路径                     | URL格式文件路径，例如`import A from './a?v=2017'`            |
| extensions | 扩展名机制              | require.extensions           | Loader Hooks                                                 |
| natives    | 原生模块引用            | 直接支持                     | 直接支持                                                     |
| npm        | npm模块引用             | 直接支持                     | 需要Loader Hooks                                             |
| file       | 文件(引用)              | `*.js`,`*.json`等直接支持    | 默认只能是`*.mjs`，通过`Loader Hooks`可以自定义配置规则支持`*.js`,`*.json`等Node原有支持文件 |

## Loader Hooks模式使用



> 由于历史原因，在ES6的Modules还没确定之前，JavaScript的模块化处理方案都是八仙过海，各显神通，例如前端的AMD、CMD模块方案，Node的CommonJS方案也在这个“乱世”诞生。 当到了ES6规范确定后，Node的CommonJS方案已经是JavaScript中比较成熟的模块化方案，但ES6怎么说都是正统的规范，“法理”上是需要兼容的，所以`*.mjs`这个针对`ECMAScript Modules`规范的Node文件方案在一片讨论声中应运而生。

> 当然如果`import/export`只能对`*.mjs`文件起作用，意味着Node原生模块和npm所有第三方模块都不能。所以这时候Node 9就提供了 `Loader Hooks`，开发者可自定义配置`Resolve Hook`规则去利用`import/export`加载使用Node原生模块，`*.js`文件，npm模块，C/C++的Node编译模块等Node生态圈的模块。

### Loader Hooks 使用步骤

- 自定义loader规则
- 启动的flag要加载loader规则文件
  - 例如：`node --experimental-modules --loader ./custom-loader.mjs ./index.js`

## Koa2 直接使用import/export



看看demo4，[https://github.com/chenshenhai/node-modules-demo/tree/master/demo4(opens new window)](https://github.com/chenshenhai/node-modules-demo/tree/master/demo4)

- 文件目录

```js
├── esm
│   ├── README.md
│   ├── custom-loader.mjs
│   ├── index.js
│   ├── lib
│   │   ├── data.json
│   │   ├── path.js
│   │   └── render.js
│   ├── package.json
│   └── view
│       ├── index.html
│       ├── index.html
│       └── todo.html
```

代码片段太多，不一一贴出来，只显示主文件

```js
import Koa from 'koa';
import { render } from './lib/render.js';
import data from './lib/data.json';

let app = new Koa();
app.use((ctx, next) => {
    let view = ctx.url.substr(1);
    let content;
    if ( view === '' ) {
        content = render('index');
    } else if ( view === 'data' ) {
        content = data;
    } else {
        content = render(view);
    }
    ctx.body = content;
})
app.listen(3000, ()=>{
    console.log('the modules test server is starting');
})
```

- 执行代码

```text
node --experimental-modules  --loader ./custom-loader.mjs ./index.js
```

- 访问
  - 访问 [http://127.0.0.1:3000/index(opens new window)](http://127.0.0.1:3000/index)
  - 访问 [http://127.0.0.1:3000/data(opens new window)](http://127.0.0.1:3000/data)
  - 访问 [http://127.0.0.1:3000/todo(opens new window)](http://127.0.0.1:3000/todo)

### 自定义loader规则优化

从上面官方提供的自定义loader例子看出，只是对`*.js`文件做`import/export`做loader兼容，然而我们在实际开发中需要对npm模块，`*.json`文件也使用`import/export`

### loader规则优化解析

```js
import url from 'url';
import path from 'path';
import process from 'process';
import fs from 'fs';

// 从package.json中
// 的dependencies、devDependencies获取项目所需npm模块信息
const ROOT_PATH = process.cwd();
const PKG_JSON_PATH = path.join( ROOT_PATH, 'package.json' );
const PKG_JSON_STR = fs.readFileSync(PKG_JSON_PATH, 'binary');
const PKG_JSON = JSON.parse(PKG_JSON_STR);
// 项目所需npm模块信息
const allDependencies = {
  ...PKG_JSON.dependencies || {},
  ...PKG_JSON.devDependencies || {}
}

//Node原生模信息
const builtins = new Set(
  Object.keys(process.binding('natives')).filter((str) =>
    /^(?!(?:internal|node|v8)\/)/.test(str))
);

// 文件引用兼容后缀名
const JS_EXTENSIONS = new Set(['.js', '.mjs']);
const JSON_EXTENSIONS = new Set(['.json']);

export function resolve(specifier, parentModuleURL, defaultResolve) {
  // 判断是否为Node原生模块
  if (builtins.has(specifier)) {
    return {
      url: specifier,
      format: 'builtin'
    };
  }

  // 判断是否为npm模块
  if ( allDependencies && typeof allDependencies[specifier] === 'string' ) {
    return defaultResolve(specifier, parentModuleURL);
  }

  // 如果是文件引用，判断是否路径格式正确
  if (/^\.{0,2}[/]/.test(specifier) !== true && !specifier.startsWith('file:')) { 
    throw new Error(
      `imports must begin with '/', './', or '../'; '${specifier}' does not`);
  }

  // 判断是否为*.js、*.mjs、*.json文件
  const resolved = new url.URL(specifier, parentModuleURL);
  const ext = path.extname(resolved.pathname);
  if (!JS_EXTENSIONS.has(ext) && !JSON_EXTENSIONS.has(ext)) {
    throw new Error(
      `Cannot load file with non-JavaScript file extension ${ext}.`);
  }

  // 如果是*.js、*.mjs文件
  if (JS_EXTENSIONS.has(ext)) {
    return {
      url: resolved.href,
      format: 'esm'
    };
  }
  
  // 如果是*.json文件
  if (JSON_EXTENSIONS.has(ext)) {
    return {
      url: resolved.href,
      format: 'json'
    };
  }

}
```

### 规则总结

在自定义loader中，export的resolve规则最核心的代码是

```js
return {
  url: '',
  format: ''
}
```

- url 是模块名称或者文件URL格式路径
- format 是模块格式有`esm`, `cjs`, `json`, `builtin`, `addon`这四种模块/文件格式.

注意： 目前Node对`import/export`的支持现在还是`Stability: 1 - Experimental`阶段，后续的发展还有很多不确定因素，自己练手玩玩还可以，但是在还没去flag使用之前，尽量不要在生产环境中使用。Node 9.x 更详细`import/export`的使用，可参考 https://github.com/ChenShenhai/blog/issues/24



# 2.1 原生koa2实现路由

## 简单例子



```js
const Koa = require('koa')
const app = new Koa()

app.use( async ( ctx ) => {
  let url = ctx.request.url
  ctx.body = url
})
app.listen(3000)
```

访问 http://localhost:3000/hello/world 页面会输出 /hello/world，也就是说上下文的请求request对象中url之就是当前访问的路径名称，可以根据ctx.request.url 通过一定的判断或者正则匹配就可以定制出所需要的路由。

## 定制化的路由



demo源码

[https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/route-simple(opens new window)](https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/route-simple)

### 源码文件目录

```text
.
├── index.js
├── package.json
└── view
    ├── 404.html
    ├── index.html
    └── todo.html
```

### demo源码

```js
const Koa = require('koa')
const fs = require('fs')
const app = new Koa()

/**
 * 用Promise封装异步读取文件方法
 * @param  {string} page html文件名称
 * @return {promise}      
 */
function render( page ) {
  return new Promise(( resolve, reject ) => {
    let viewUrl = `./view/${page}`
    fs.readFile(viewUrl, "binary", ( err, data ) => {
      if ( err ) {
        reject( err )
      } else {
        resolve( data )
      }
    })
  })
}

/**
 * 根据URL获取HTML内容
 * @param  {string} url koa2上下文的url，ctx.url
 * @return {string}     获取HTML文件内容
 */
async function route( url ) {
  let view = '404.html'
  switch ( url ) {
    case '/':
      view = 'index.html'
      break
    case '/index':
      view = 'index.html'
      break
    case '/todo':
      view = 'todo.html'
      break
    case '/404':
      view = '404.html'
      break
    default:
      break
  }
  let html = await render( view )
  return html
}

app.use( async ( ctx ) => {
  let url = ctx.request.url
  let html = await route( url )
  ctx.body = html
})

app.listen(3000)
console.log('[demo] route-simple is starting at port 3000')
```

### 运行demo

#### 执行运行脚本

```sh
node -harmony index.js
```

#### 运行效果如下

访问[http://localhost:3000/index (opens new window)](http://localhost:3000/index)![route-result-01](https://interview.poetries.top/fe-nodejs-docs/assets/img/route-result-01.ad7c6df9.png)



# 2.2 koa router中间件

如果依靠ctx.request.url去手动处理路由，将会写很多处理代码，这时候就需要对应的路由的中间件对路由进行控制，这里介绍一个比较好用的路由中间件koa-router

## 安装koa-router中间件



```sh
# koa2 对应的版本是 7.x
npm install --save koa-router@7
```

## 快速使用koa-router



demo源码

[https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/route-use-middleware(opens new window)](https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/route-use-middleware)

```js
const Koa = require('koa')
const fs = require('fs')
const app = new Koa()

const Router = require('koa-router')

let home = new Router()

// 子路由1
home.get('/', async ( ctx )=>{
  let html = `
    <ul>
      <li><a href="/page/helloworld">/page/helloworld</a></li>
      <li><a href="/page/404">/page/404</a></li>
    </ul>
  `
  ctx.body = html
})

// 子路由2
let page = new Router()
page.get('/404', async ( ctx )=>{
  ctx.body = '404 page!'
}).get('/helloworld', async ( ctx )=>{
  ctx.body = 'helloworld page!'
})

// 装载所有子路由
let router = new Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log('[demo] route-use-middleware is starting at port 3000')
})
```



# 3.1 GET请求数据获取

## 使用方法



在koa中，获取GET请求数据源头是koa中request对象中的query方法或querystring方法，query返回是格式化好的参数对象，querystring返回的是请求字符串，由于ctx对request的API有直接引用的方式，所以获取GET请求数据有两个途径。

- 1.是从上下文中直接获取
  - 请求对象ctx.query，返回如 { a:1, b:2 }
  - 请求字符串 ctx.querystring，返回如 a=1&b=2
- 2.是从上下文的request对象中获取
  - 请求对象ctx.request.query，返回如 { a:1, b:2 }
  - 请求字符串 ctx.request.querystring，返回如 a=1&b=2

## 举个例子



demo源码

[https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/request/get.js(opens new window)](https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/request/get.js)

### 例子代码

```js
const Koa = require('koa')
const app = new Koa()

app.use( async ( ctx ) => {
  let url = ctx.url
  // 从上下文的request对象中获取
  let request = ctx.request
  let req_query = request.query
  let req_querystring = request.querystring

  // 从上下文中直接获取
  let ctx_query = ctx.query
  let ctx_querystring = ctx.querystring
  
  ctx.body = {
    url,
    req_query,
    req_querystring,
    ctx_query,
    ctx_querystring
  }
})

app.listen(3000, () => {
  console.log('[demo] request get is starting at port 3000')
})
```

### 执行程序

```sh
node get.js
```

执行后程序后，用chrome访问 [http://localhost:3000/page/user?a=1&b=2 (opens new window)](http://localhost:3000/page/user?a=1&b=2)会出现以下情况

> 注意：我是用了chrome的json格式化插件才会显示json的格式化

![request-get](https://interview.poetries.top/fe-nodejs-docs/assets/img/request-get.731f7abf.png)



# 3.2 POST 请求数据获取

## 原理



对于POST请求的处理，koa2没有封装获取参数的方法，需要通过解析上下文context中的原生node.js请求对象req，将POST表单数据解析成query string（例如：`a=1&b=2&c=3`），再将query string 解析成JSON格式（例如：`{"a":"1", "b":"2", "c":"3"}`）

> 注意：ctx.request是context经过封装的请求对象，ctx.req是context提供的node.js原生HTTP请求对象，同理ctx.response是context经过封装的响应对象，ctx.res是context提供的node.js原生HTTP响应对象。

> 具体koa2 API文档可见 [https://github.com/koajs/koa/blob/master/docs/api/context.md#ctxreq(opens new window)](https://github.com/koajs/koa/blob/master/docs/api/context.md#ctxreq)

### 解析出POST请求上下文中的表单数据

demo源码

[https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/request/post.js(opens new window)](https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/request/post.js)

```js
// 解析上下文里node原生请求的POST参数
function parsePostData( ctx ) {
  return new Promise((resolve, reject) => {
    try {
      let postdata = "";
      ctx.req.addListener('data', (data) => {
        postdata += data
      })
      ctx.req.addListener("end",function(){
        let parseData = parseQueryStr( postdata )
        resolve( parseData )
      })
    } catch ( err ) {
      reject(err)
    }
  })
}

// 将POST请求参数字符串解析成JSON
function parseQueryStr( queryStr ) {
  let queryData = {}
  let queryStrList = queryStr.split('&')
  console.log( queryStrList )
  for (  let [ index, queryStr ] of queryStrList.entries()  ) {
    let itemList = queryStr.split('=')
    queryData[ itemList[0] ] = decodeURIComponent(itemList[1])
  }
  return queryData
}
```

## 举个例子



源码在 /demos/request/post.js中

### 例子代码

```js
const Koa = require('koa')
const app = new Koa()

app.use( async ( ctx ) => {

  if ( ctx.url === '/' && ctx.method === 'GET' ) {
    // 当GET请求时候返回表单页面
    let html = `
      <h1>koa2 request post demo</h1>
      <form method="POST" action="/">
        <p>userName</p>
        <input name="userName" /><br/>
        <p>nickName</p>
        <input name="nickName" /><br/>
        <p>email</p>
        <input name="email" /><br/>
        <button type="submit">submit</button>
      </form>
    `
    ctx.body = html
  } else if ( ctx.url === '/' && ctx.method === 'POST' ) {
    // 当POST请求的时候，解析POST表单里的数据，并显示出来
    let postData = await parsePostData( ctx )
    ctx.body = postData
  } else {
    // 其他请求显示404
    ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
  }
})

// 解析上下文里node原生请求的POST参数
function parsePostData( ctx ) {
  return new Promise((resolve, reject) => {
    try {
      let postdata = "";
      ctx.req.addListener('data', (data) => {
        postdata += data
      })
      ctx.req.addListener("end",function(){
        let parseData = parseQueryStr( postdata )
        resolve( parseData )
      })
    } catch ( err ) {
      reject(err)
    }
  })
}

// 将POST请求参数字符串解析成JSON
function parseQueryStr( queryStr ) {
  let queryData = {}
  let queryStrList = queryStr.split('&')
  console.log( queryStrList )
  for (  let [ index, queryStr ] of queryStrList.entries()  ) {
    let itemList = queryStr.split('=')
    queryData[ itemList[0] ] = decodeURIComponent(itemList[1])
  }
  return queryData
}

app.listen(3000, () => {
  console.log('[demo] request post is starting at port 3000')
})
```

### 启动例子

```sh
node post.js
```

### 访问页面

![request-post-form](https://interview.poetries.top/fe-nodejs-docs/assets/img/request-post-form.281c217d.png)

### 提交表单发起POST请求结果显示

![request-post-result](https://interview.poetries.top/fe-nodejs-docs/assets/img/request-post-result.3037e1ce.png)



# 3.3 koa bodyparser中间件

## 原理



对于POST请求的处理，koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中

### 安装koa2版本的koa-bodyparser@3中间件

```sh
npm install --save koa-bodyparser@3
```

## 举个例子



### 例子代码

demo源码

[https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/request/post-middleware.js(opens new window)](https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/request/post-middleware.js)

```js
const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')

// 使用ctx.body解析中间件
app.use(bodyParser())

app.use( async ( ctx ) => {

  if ( ctx.url === '/' && ctx.method === 'GET' ) {
    // 当GET请求时候返回表单页面
    let html = `
      <h1>koa2 request post demo</h1>
      <form method="POST" action="/">
        <p>userName</p>
        <input name="userName" /><br/>
        <p>nickName</p>
        <input name="nickName" /><br/>
        <p>email</p>
        <input name="email" /><br/>
        <button type="submit">submit</button>
      </form>
    `
    ctx.body = html
  } else if ( ctx.url === '/' && ctx.method === 'POST' ) {
    // 当POST请求的时候，中间件koa-bodyparser解析POST表单里的数据，并显示出来
    let postData = ctx.request.body
    ctx.body = postData
  } else {
    // 其他请求显示404
    ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
  }
})

app.listen(3000, () => {
  console.log('[demo] request post is starting at port 3000')
})
```

### 启动例子

```sh
node post-middleware.js
```

### 访问页面

![request-post-form](https://interview.poetries.top/fe-nodejs-docs/assets/img/request-post-form.281c217d.png)

### 提交表单发起POST请求结果显示

![request-post-result](https://interview.poetries.top/fe-nodejs-docs/assets/img/request-post-result.3037e1ce.png)



# 4.1 原生koa2实现静态资源服务器

##  前言



一个http请求访问web服务静态资源，一般响应结果有三种情况

- 访问文本，例如js，css，png，jpg，gif
- 访问静态目录
- 找不到资源，抛出404错误

## 原生koa2 静态资源服务器例子



demo源码

[https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/static-server/(opens new window)](https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/static-server/)

### 代码目录

```sh
├── static # 静态资源目录
│   ├── css/
│   ├── image/
│   ├── js/
│   └── index.html
├── util # 工具代码
│   ├── content.js # 读取请求内容
│   ├── dir.js # 读取目录内容
│   ├── file.js # 读取文件内容
│   ├── mimes.js # 文件类型列表
│   └── walk.js # 遍历目录内容
└── index.js # 启动入口文件
```

### 代码解析

#### index.js

```js
const Koa = require('koa')
const path = require('path')
const content = require('./util/content')
const mimes = require('./util/mimes')

const app = new Koa()

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'

// 解析资源类型
function parseMime( url ) {
  let extName = path.extname( url )
  extName = extName ?  extName.slice(1) : 'unknown'
  return  mimes[ extName ]
}

app.use( async ( ctx ) => {
  // 静态资源目录在本地的绝对路径
  let fullStaticPath = path.join(__dirname, staticPath)

  // 获取静态资源内容，有可能是文件内容，目录，或404
  let _content = await content( ctx, fullStaticPath )

  // 解析请求内容的类型
  let _mime = parseMime( ctx.url )

  // 如果有对应的文件类型，就配置上下文的类型
  if ( _mime ) {
    ctx.type = _mime
  }

  // 输出静态资源内容
  if ( _mime && _mime.indexOf('image/') >= 0 ) {
    // 如果是图片，则用node原生res，输出二进制数据
    ctx.res.writeHead(200)
    ctx.res.write(_content, 'binary')
    ctx.res.end()
  } else {
    // 其他则输出文本
    ctx.body = _content
  }
})

app.listen(3000)
console.log('[demo] static-server is starting at port 3000')
```

#### util/content.js

```js
const path = require('path')
const fs = require('fs')

// 封装读取目录内容方法
const dir = require('./dir')

// 封装读取文件内容方法
const file = require('./file')


/**
 * 获取静态资源内容
 * @param  {object} ctx koa上下文
 * @param  {string} 静态资源目录在本地的绝对路径
 * @return  {string} 请求获取到的本地内容
 */
async function content( ctx, fullStaticPath ) {
  
  // 封装请求资源的完绝对径
  let reqPath = path.join(fullStaticPath, ctx.url)

  // 判断请求路径是否为存在目录或者文件
  let exist = fs.existsSync( reqPath )
  
  // 返回请求内容， 默认为空
  let content = ''

  if( !exist ) {
    //如果请求路径不存在，返回404
    content = '404 Not Found! o(╯□╰)o！'
  } else {
    //判断访问地址是文件夹还是文件
    let stat = fs.statSync( reqPath )

    if( stat.isDirectory() ) {
      //如果为目录，则渲读取目录内容
      content = dir( ctx.url, reqPath )

    } else {
      // 如果请求为文件，则读取文件内容
      content = await file( reqPath )
    }
  }

  return content
}

module.exports = content
```

#### util/dir.js

```js
const url = require('url')
const fs = require('fs')
const path = require('path')

// 遍历读取目录内容方法
const walk = require('./walk')

/**
 * 封装目录内容
 * @param  {string} url 当前请求的上下文中的url，即ctx.url
 * @param  {string} reqPath 请求静态资源的完整本地路径
 * @return {string} 返回目录内容，封装成HTML
 */
function dir ( url, reqPath ) {
  
  // 遍历读取当前目录下的文件、子目录
  let contentList = walk( reqPath )

  let html = `<ul>`
  for ( let [ index, item ] of contentList.entries() ) {
    html = `${html}<li><a href="${url === '/' ? '' : url}/${item}">${item}</a>` 
  }
  html = `${html}</ul>`
  
  return html
}

module.exports = dir
```

#### util/file.js

```js
const fs = require('fs')

/**
 * 读取文件方法
 * @param  {string} 文件本地的绝对路径
 * @return {string|binary} 
 */
function file ( filePath ) {

 let content = fs.readFileSync(filePath, 'binary' )
 return content
}

module.exports = file
```

#### util/walk.js

```js
const fs = require('fs')
const mimes = require('./mimes')

/**
 * 遍历读取目录内容（子目录，文件名）
 * @param  {string} reqPath 请求资源的绝对路径
 * @return {array} 目录内容列表
 */
function walk( reqPath ){

  let files = fs.readdirSync( reqPath );

  let dirList = [], fileList = [];
  for( let i=0, len=files.length; i<len; i++ ) {
    let item = files[i];
    let itemArr = item.split("\.");
    let itemMime = ( itemArr.length > 1 ) ? itemArr[ itemArr.length - 1 ] : "undefined";

    if( typeof mimes[ itemMime ] === "undefined" ) {
      dirList.push( files[i] );
    } else {
      fileList.push( files[i] );
    }
  }


  let result = dirList.concat( fileList );

  return result;
};

module.exports = walk;
```

#### util/mime.js

```js
let mimes = {
  'css': 'text/css',
  'less': 'text/css',
  'gif': 'image/gif',
  'html': 'text/html',
  'ico': 'image/x-icon',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpeg',
  'js': 'text/javascript',
  'json': 'application/json',
  'pdf': 'application/pdf',
  'png': 'image/png',
  'svg': 'image/svg+xml',
  'swf': 'application/x-shockwave-flash',
  'tiff': 'image/tiff',
  'txt': 'text/plain',
  'wav': 'audio/x-wav',
  'wma': 'audio/x-ms-wma',
  'wmv': 'video/x-ms-wmv',
  'xml': 'text/xml'
}

module.exports = mimes
```

### 运行效果

#### 启动服务

```sh
node index.js
```

#### 效果

##### 访问[http://localhost:3000(opens new window)](http://localhost:3000/)

![static-server-result](https://interview.poetries.top/fe-nodejs-docs/assets/img/static-server-result-01.41418ff5.png)

##### 访问[http://localhost:3000/index.html(opens new window)](http://localhost:3000/index.html)

![static-server-result](https://interview.poetries.top/fe-nodejs-docs/assets/img/static-server-result-02.3c44a239.png)

##### 访问[http://localhost:3000/js/index.js(opens new window)](http://localhost:3000/js/index.js)

![static-server-result](https://interview.poetries.top/fe-nodejs-docs/assets/img/static-server-result-03.53c88774.png)

# 4.2 koa static中间件

## 使用例子



demo源码

[https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/static-use-middleware/(opens new window)](https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/static-use-middleware/)

```js
const Koa = require('koa')
const path = require('path')
const static = require('koa-static')

const app = new Koa()

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'

app.use(static(
  path.join( __dirname,  staticPath)
))


app.use( async ( ctx ) => {
  ctx.body = 'hello world'
})

app.listen(3000, () => {
  console.log('[demo] static-use-middleware is starting at port 3000')
})
```

#### 效果

##### 访问[http://localhost:3000(opens new window)](http://localhost:3000/)

![static-server-result](https://interview.poetries.top/fe-nodejs-docs/assets/img/static-server-result-01.41418ff5.png)

##### 访问[http://localhost:3000/index.html(opens new window)](http://localhost:3000/index.html)

![static-server-result](https://interview.poetries.top/fe-nodejs-docs/assets/img/static-server-result-02.3c44a239.png)

##### 访问[http://localhost:3000/js/index.js(opens new window)](http://localhost:3000/js/index.js)

![static-server-result](https://interview.poetries.top/fe-nodejs-docs/assets/img/static-server-result-03.53c88774.png)



# 5.1 koa2 使用cookie

## 使用方法



koa提供了从上下文直接读取、写入cookie的方法

- ctx.cookies.get(name, [options]) 读取上下文请求中的cookie
- ctx.cookies.set(name, value, [options]) 在上下文中写入cookie

koa2 中操作的cookies是使用了npm的cookies模块，源码在[https://github.com/pillarjs/cookies (opens new window)](https://github.com/pillarjs/cookies)，所以在读写cookie的使用参数与该模块的使用一致。

## 例子代码



```js
const Koa = require('koa')
const app = new Koa()

app.use( async ( ctx ) => {

  if ( ctx.url === '/index' ) {
    ctx.cookies.set(
      'cid', 
      'hello world',
      {
        domain: 'localhost',  // 写cookie所在的域名
        path: '/index',       // 写cookie所在的路径
        maxAge: 10 * 60 * 1000, // cookie有效时长
        expires: new Date('2017-02-15'),  // cookie失效时间
        httpOnly: false,  // 是否只用于http请求中获取
        overwrite: false  // 是否允许重写
      }
    )
    ctx.body = 'cookie is ok'
  } else {
    ctx.body = 'hello world' 
  }

})

app.listen(3000, () => {
  console.log('[demo] cookie is starting at port 3000')
})
```

## 运行例子



### 执行脚本

```sh
node index.js
```

### 运行结果

#### 访问[http://localhost:3000/index(opens new window)](http://localhost:3000/index)

- 可以在控制台的cookie列表中中看到写在页面上的cookie
- 在控制台的console中使用document.cookie可以打印出在页面的所有cookie（需要是httpOnly设置false才能显示）

![cookie-result-01](https://interview.poetries.top/fe-nodejs-docs/assets/img/cookie-result-01.a2f8d237.png)

# 5.2 koa2实现session

## 前言



koa2原生功能只提供了cookie的操作，但是没有提供session操作。session就只用自己实现或者通过第三方中间件实现。在koa2中实现session的方案有一下几种

- 如果session数据量很小，可以直接存在内存中
- 如果session数据量很大，则需要存储介质存放session数据

## 数据库存储方案



- 将session存放在MySQL数据库中
- 需要用到中间件
  - koa-session-minimal 适用于koa2 的session中间件，提供存储介质的读写接口 。
  - koa-mysql-session 为koa-session-minimal中间件提供MySQL数据库的session数据读写操作。
  - 将sessionId和对应的数据存到数据库
- 将数据库的存储的sessionId存到页面的cookie中
- 根据cookie的sessionId去获取对于的session信息

## 快速使用



demo源码

[https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/blob/master/demo/session/index.js(opens new window)](https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/blob/master/demo/session/index.js)

### 例子代码

```js
const Koa = require('koa')
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')

const app = new Koa()

// 配置存储session信息的mysql
let store = new MysqlSession({
  user: 'root',
  password: 'abc123',
  database: 'koa_demo',
  host: '127.0.0.1',
})

// 存放sessionId的cookie配置
let cookie = {
  maxAge: '', // cookie有效时长
  expires: '',  // cookie失效时间
  path: '', // 写cookie所在的路径
  domain: '', // 写cookie所在的域名
  httpOnly: '', // 是否只用于http请求中获取
  overwrite: '',  // 是否允许重写
  secure: '',
  sameSite: '',
  signed: '',
  
}

// 使用session中间件
app.use(session({
  key: 'SESSION_ID',
  store: store,
  cookie: cookie
}))

app.use( async ( ctx ) => {

  // 设置session
  if ( ctx.url === '/set' ) {
    ctx.session = {
      user_id: Math.random().toString(36).substr(2),
      count: 0
    }
    ctx.body = ctx.session
  } else if ( ctx.url === '/' ) {

    // 读取session信息
    ctx.session.count = ctx.session.count + 1
    ctx.body = ctx.session
  } 
  
})

app.listen(3000)
console.log('[demo] session is starting at port 3000')
```

### 运行例子

#### 执行命令

```sh
node index.js
```

#### 访问连接设置session

[http://localhost:3000/set (opens new window)](http://localhost:3000/set)![session-result-01](https://interview.poetries.top/fe-nodejs-docs/assets/img/session-result-01.57116136.png)

#### 查看数据库session是否存储

![session-result-01](https://interview.poetries.top/fe-nodejs-docs/assets/img/session-result-03.01a0ccd1.png)

#### 查看cookie中是否种下了sessionId

[http://localhost:3000 (opens new window)](http://localhost:3000/)![session-result-01](https://interview.poetries.top/fe-nodejs-docs/assets/img/session-result-02.16f1ad16.png)



# 6.1 koa2加载模板引擎

## 快速开始

### 安装模块

```sh
# 安装koa模板使用中间件
npm install --save koa-views

# 安装ejs模板引擎
npm install --save ejs
```

### 使用模板引擎

demo源码

[https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/blob/master/demo/ejs/(opens new window)](https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/blob/master/demo/ejs/)

#### 文件目录

```text
├── package.json
├── index.js
└── view
    └── index.ejs
```

#### ./index.js文件

```js
const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const app = new Koa()

// 加载模板引擎
app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}))

app.use( async ( ctx ) => {
  let title = 'hello koa2'
  await ctx.render('index', {
    title,
  })
})

app.listen(3000)
```

#### ./view/index.ejs 模板

```html
<!DOCTYPE html>
<html>
<head>
    <title><%= title %></title>
</head>
<body>
    <h1><%= title %></h1>
    <p>EJS Welcome to <%= title %></p>
</body>
</html>
```



# 6.2 ejs模板引擎



## 具体查看ejs官方文档



https://github.com/mde/ejs



# 7.1 busboy模块



## 快速开始



### 安装

```js
npm install --save busboy
```

### 模块简介

busboy 模块是用来解析POST请求，node原生req中的文件流。

### 开始使用

```js
const inspect = require('util').inspect 
const path = require('path')
const fs = require('fs')
const Busboy = require('busboy')

// req 为node原生请求
const busboy = new Busboy({ headers: req.headers })

// ...

// 监听文件解析事件
busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
  console.log(`File [${fieldname}]: filename: ${filename}`)


  // 文件保存到特定路径
  file.pipe(fs.createWriteStream('./upload'))

  // 开始解析文件流
  file.on('data', function(data) {
    console.log(`File [${fieldname}] got ${data.length} bytes`)
  })

  // 解析文件结束
  file.on('end', function() {
    console.log(`File [${fieldname}] Finished`)
  })
})

// 监听请求中的字段
busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
  console.log(`Field [${fieldname}]: value: ${inspect(val)}`)
})

// 监听结束事件
busboy.on('finish', function() {
  console.log('Done parsing form!')
  res.writeHead(303, { Connection: 'close', Location: '/' })
  res.end()
})
req.pipe(busboy)
```

## 更多模块信息



更多详细API可以访问npm官方文档 https://www.npmjs.com/package/busboy



# 7.2 上传文件简单实现

## 依赖模块



### 安装依赖

```sh
npm install --save busboy
```

- busboy 是用来解析出请求中文件流

## 例子源码



demo源码

[https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/upload/(opens new window)](https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/upload/)

### 封装上传文件到写入服务的方法

```js
const inspect = require('util').inspect
const path = require('path')
const os = require('os')
const fs = require('fs')
const Busboy = require('busboy')

/**
 * 同步创建文件目录
 * @param  {string} dirname 目录绝对地址
 * @return {boolean}        创建目录结果
 */
function mkdirsSync( dirname ) {
  if (fs.existsSync( dirname )) {
    return true
  } else {
    if (mkdirsSync( path.dirname(dirname)) ) {
      fs.mkdirSync( dirname )
      return true
    }
  }
}

/**
 * 获取上传文件的后缀名
 * @param  {string} fileName 获取上传文件的后缀名
 * @return {string}          文件后缀名
 */
function getSuffixName( fileName ) {
  let nameList = fileName.split('.')
  return nameList[nameList.length - 1]
}

/**
 * 上传文件
 * @param  {object} ctx     koa上下文
 * @param  {object} options 文件上传参数 fileType文件类型， path文件存放路径
 * @return {promise}         
 */
function uploadFile( ctx, options) {
  let req = ctx.req
  let res = ctx.res
  let busboy = new Busboy({headers: req.headers})

  // 获取类型
  let fileType = options.fileType || 'common'
  let filePath = path.join( options.path,  fileType)
  let mkdirResult = mkdirsSync( filePath )
  
  return new Promise((resolve, reject) => {
    console.log('文件上传中...')
    let result = { 
      success: false,
      formData: {},
    }

    // 解析请求文件事件
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
      let _uploadFilePath = path.join( filePath, fileName )
      let saveTo = path.join(_uploadFilePath)

      // 文件保存到制定路径
      file.pipe(fs.createWriteStream(saveTo))

      // 文件写入事件结束
      file.on('end', function() {
        result.success = true
        result.message = '文件上传成功'

        console.log('文件上传成功！')
        resolve(result)
      })
    })

    // 解析表单中其他字段信息
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      console.log('表单字段数据 [' + fieldname + ']: value: ' + inspect(val));
      result.formData[fieldname] = inspect(val);
    });

    // 解析结束事件
    busboy.on('finish', function( ) {
      console.log('文件上结束')
      resolve(result)
    })

    // 解析错误事件
    busboy.on('error', function(err) {
      console.log('文件上出错')
      reject(result)
    })

    req.pipe(busboy)
  })
    
} 


module.exports =  {
  uploadFile
}
```

### 入口文件

```js
const Koa = require('koa')
const path = require('path')
const app = new Koa()
// const bodyParser = require('koa-bodyparser')

const { uploadFile } = require('./util/upload')

// app.use(bodyParser())

app.use( async ( ctx ) => {

  if ( ctx.url === '/' && ctx.method === 'GET' ) {
    // 当GET请求时候返回表单页面
    let html = `
      <h1>koa2 upload demo</h1>
      <form method="POST" action="/upload.json" enctype="multipart/form-data">
        <p>file upload</p>
        <span>picName:</span><input name="picName" type="text" /><br/>
        <input name="file" type="file" /><br/><br/>
        <button type="submit">submit</button>
      </form>
    `
    ctx.body = html

  } else if ( ctx.url === '/upload.json' && ctx.method === 'POST' ) {
    // 上传文件请求处理
    let result = { success: false }
    let serverFilePath = path.join( __dirname, 'upload-files' )

    // 上传文件事件
    result = await uploadFile( ctx, {
      fileType: 'album', // common or album
      path: serverFilePath
    })

    ctx.body = result
  } else {
    // 其他请求显示404
    ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
  }
})

app.listen(3000, () => {
  console.log('[demo] upload-simple is starting at port 3000')
})
```

### 运行结果

![upload-simple-result](https://interview.poetries.top/fe-nodejs-docs/assets/img/upload-simple-result-03.bc8ad88a.png)

![upload-simple-result](https://interview.poetries.top/fe-nodejs-docs/assets/img/upload-simple-result-02.954eb399.png)

![upload-simple-result](https://interview.poetries.top/fe-nodejs-docs/assets/img/upload-simple-result-01.28198536.png)

![upload-simple-result](https://interview.poetries.top/fe-nodejs-docs/assets/img/upload-simple-result-04.9058935d.png)



# 7.3 异步上传图片实现

## 快速上手



demo 地址

[https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/upload-async(opens new window)](https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/upload-async)

## 源码理解



### demo源码目录

```sh
.
├── index.js # 后端启动文件
├── node_modules
├── package.json
├── static # 静态资源目录
│   ├── image # 异步上传图片存储目录
│   └── js
│       └── index.js # 上传图片前端js操作
├── util
│   └── upload.js # 后端处理图片流操作
└── view
    └── index.ejs # ejs后端渲染模板
```

### 后端代码

入口文件 demo/upload-async/index.js

```js
const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const convert = require('koa-convert')
const static = require('koa-static')
const { uploadFile } = require('./util/upload')

const app = new Koa()

/**
 * 使用第三方中间件 start 
 */
app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}))

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'
// 由于koa-static目前不支持koa2
// 所以只能用koa-convert封装一下
app.use(convert(static(
  path.join( __dirname,  staticPath)
)))
/**
 * 使用第三方中间件 end 
 */

app.use( async ( ctx ) => {
  if ( ctx.method === 'GET' ) {
    let title = 'upload pic async'
    await ctx.render('index', {
      title,
    })
  } else if ( ctx.url === '/api/picture/upload.json' && ctx.method === 'POST' ) {
    // 上传文件请求处理
    let result = { success: false }
    let serverFilePath = path.join( __dirname, 'static/image' )

    // 上传文件事件
    result = await uploadFile( ctx, {
      fileType: 'album',
      path: serverFilePath
    })
    ctx.body = result
  } else {
    // 其他请求显示404
    ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
  }
  
})

app.listen(3000, () => {
  console.log('[demo] upload-pic-async is starting at port 3000')
})
```

后端上传图片流写操作 入口文件 demo/upload-async/util/upload.js

```js
const inspect = require('util').inspect
const path = require('path')
const os = require('os')
const fs = require('fs')
const Busboy = require('busboy')

/**
 * 同步创建文件目录
 * @param  {string} dirname 目录绝对地址
 * @return {boolean}        创建目录结果
 */
function mkdirsSync( dirname ) {
  if (fs.existsSync( dirname )) {
    return true
  } else {
    if (mkdirsSync( path.dirname(dirname)) ) {
      fs.mkdirSync( dirname )
      return true
    }
  }
}

/**
 * 获取上传文件的后缀名
 * @param  {string} fileName 获取上传文件的后缀名
 * @return {string}          文件后缀名
 */
function getSuffixName( fileName ) {
  let nameList = fileName.split('.')
  return nameList[nameList.length - 1]
}

/**
 * 上传文件
 * @param  {object} ctx     koa上下文
 * @param  {object} options 文件上传参数 fileType文件类型， path文件存放路径
 * @return {promise}         
 */
function uploadFile( ctx, options) {
  let req = ctx.req
  let res = ctx.res
  let busboy = new Busboy({headers: req.headers})

  // 获取类型
  let fileType = options.fileType || 'common'
  let filePath = path.join( options.path,  fileType)
  let mkdirResult = mkdirsSync( filePath )
  
  return new Promise((resolve, reject) => {
    console.log('文件上传中...')
    let result = { 
      success: false,
      message: '',
      data: null
    }

    // 解析请求文件事件
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
      let _uploadFilePath = path.join( filePath, fileName )
      let saveTo = path.join(_uploadFilePath)

      // 文件保存到制定路径
      file.pipe(fs.createWriteStream(saveTo))

      // 文件写入事件结束
      file.on('end', function() {
        result.success = true
        result.message = '文件上传成功'
        result.data = {
          pictureUrl: `//${ctx.host}/image/${fileType}/${fileName}`
        }
        console.log('文件上传成功！')
        resolve(result)
      })
    })

    // 解析结束事件
    busboy.on('finish', function( ) {
      console.log('文件上结束')
      resolve(result)
    })

    // 解析错误事件
    busboy.on('error', function(err) {
      console.log('文件上出错')
      reject(result)
    })

    req.pipe(busboy)
  })
    
} 

module.exports =  {
  uploadFile
}
```

### 前端代码

```html
<button class="btn" id="J_UploadPictureBtn">上传图片</button>
<hr/>
<p>上传进度<span id="J_UploadProgress">0</span>%</p>
<p>上传结果图片</p>
<div id="J_PicturePreview" class="preview-picture">
</div>
<script src="/js/index.js"></script>
```

上传操作代码

```js
(function(){

let btn = document.getElementById('J_UploadPictureBtn')
let progressElem = document.getElementById('J_UploadProgress')
let previewElem = document.getElementById('J_PicturePreview')
btn.addEventListener('click', function(){
  uploadAction({
    success: function( result ) {
      console.log( result )
      if ( result && result.success && result.data && result.data.pictureUrl ) {
        previewElem.innerHTML = '<img src="'+ result.data.pictureUrl +'" style="max-width: 100%">'
      }
    },
    progress: function( data ) {
      if ( data && data * 1 > 0 ) {
        progressElem.innerText = data
      }
    }
  })
})


/**
 * 类型判断
 * @type {Object}
 */
let UtilType = {
  isPrototype: function( data ) {
    return Object.prototype.toString.call(data).toLowerCase();
  },

  isJSON: function( data ) {
    return this.isPrototype( data ) === '[object object]';
  },

  isFunction: function( data ) {
    return this.isPrototype( data ) === '[object function]';
  }
}

/**
 * form表单上传请求事件
 * @param  {object} options 请求参数
 */
function requestEvent( options ) {
  try {
    let formData = options.formData
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {

      if ( xhr.readyState === 4 && xhr.status === 200 ) {
        options.success(JSON.parse(xhr.responseText))
      } 
    }

    xhr.upload.onprogress = function(evt) {
      let loaded = evt.loaded
      let tot = evt.total
      let per = Math.floor(100 * loaded / tot) 
      options.progress(per)
    }
    xhr.open('post', '/api/picture/upload.json')
    xhr.send(formData)
  } catch ( err ) {
    options.fail(err)
  }
}

/**
 * 上传事件
 * @param  {object} options 上传参数      
 */
function uploadEvent ( options ){
  let file
  let formData = new FormData()
  let input = document.createElement('input')
  input.setAttribute('type', 'file')
  input.setAttribute('name', 'files')

  input.click()
  input.onchange = function () {
    file = input.files[0]
    formData.append('files', file)

    requestEvent({
      formData,
      success: options.success,
      fail: options.fail,
      progress: options.progress
    })  
  }

}

/**
 * 上传操作
 * @param  {object} options 上传参数     
 */
function uploadAction( options ) {
  if ( !UtilType.isJSON( options ) ) {
    console.log( 'upload options is null' )
    return
  }
  let _options = {}
  _options.success = UtilType.isFunction(options.success) ? options.success : function() {}
  _options.fail = UtilType.isFunction(options.fail) ? options.fail : function() {}
  _options.progress = UtilType.isFunction(options.progress) ? options.progress : function() {}
  
  uploadEvent(_options)
}


})()
```

### 运行效果

![images/upload-async-result](https://interview.poetries.top/fe-nodejs-docs/assets/img/upload-async-result-01.0406e6d6.png)

# 8.1 mysql模块

## 快速开始



### 安装MySQL数据库

[https://www.mysql.com/downloads/(opens new window)](https://www.mysql.com/downloads/)

### 安装 node.js的mysql模块

```text
npm install --save mysql
```

### 模块介绍

mysql模块是node操作MySQL的引擎，可以在node.js环境下对MySQL数据库进行建表，增、删、改、查等操作。

### 开始使用

#### 创建数据库会话

```js
const mysql      = require('mysql')
const connection = mysql.createConnection({
  host     : '127.0.0.1',   // 数据库地址
  user     : 'root',    // 数据库用户
  password : '123456'   // 数据库密码
  database : 'my_database'  // 选中数据库
})
 
// 执行sql脚本对数据库进行读写 
connection.query('SELECT * FROM my_table',  (error, results, fields) => {
  if (error) throw error
  // connected! 
  
  // 结束会话
  connection.release() 
});
```

> 注意：一个事件就有一个从开始到结束的过程，数据库会话操作执行完后，就需要关闭掉，以免占用连接资源。

#### 创建数据连接池

一般情况下操作数据库是很复杂的读写过程，不只是一个会话，如果直接用会话操作，就需要每次会话都要配置连接参数。所以这时候就需要连接池管理会话。

```js
const mysql = require('mysql')

// 创建数据池
const pool  = mysql.createPool({
  host     : '127.0.0.1',   // 数据库地址
  user     : 'root',    // 数据库用户
  password : '123456'   // 数据库密码
  database : 'my_database'  // 选中数据库
})
 
// 在数据池中进行会话操作
pool.getConnection(function(err, connection) {
   
  connection.query('SELECT * FROM my_table',  (error, results, fields) => {
    
    // 结束会话
    connection.release();
 
    // 如果有错误就抛出
    if (error) throw error;
  })
})
```

## 更多模块信息



更多详细API可以访问npm官方文档 https://www.npmjs.com/package/mysql

# 8.2 async await 封装使用mysql

## 前言



由于mysql模块的操作都是异步操作，每次操作的结果都是在回调函数中执行，现在有了async/await，就可以用同步的写法去操作数据库

### Promise封装mysql模块

#### Promise封装 ./async-db

```js
const mysql = require('mysql')
const pool = mysql.createPool({
  host     :  '127.0.0.1',
  user     :  'root',
  password :  '123456',
  database :  'my_database'
})

let query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
}

module.exports = { query }
```

#### async/await使用

```js
const { query } = require('./async-db')
async function selectAllData( ) {
  let sql = 'SELECT * FROM my_table'
  let dataList = await query( sql )
  return dataList
}

async function getData() {
  let dataList = await selectAllData()
  console.log( dataList )
}

getData()
```



# 8.3 项目建表初始化

## 前言



通常初始化数据库要建立很多表，特别在项目开发的时候表的格式可能会有些变动，这时候就需要封装对数据库建表初始化的方法，保留项目的sql脚本文件，然后每次需要重新建表，则执行建表初始化程序就行

## 快速开始



demo源码

[https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/mysql/(opens new window)](https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/mysql/)

### 源码目录

```sh
├── index.js # 程序入口文件
├── node_modules/
├── package.json
├── sql   # sql脚本文件目录
│   ├── data.sql
│   └── user.sql
└── util    # 工具代码
    ├── db.js # 封装的mysql模块方法
    ├── get-sql-content-map.js # 获取sql脚本文件内容
    ├── get-sql-map.js # 获取所有sql脚本文件
    └── walk-file.js # 遍历sql脚本文件
```

### 具体流程

```sh
       +---------------------------------------------------+
       |                                                   |
       |   +-----------+   +-----------+   +-----------+   |
       |   |           |   |           |   |           |   |
       |   |           |   |           |   |           |   |
       |   |           |   |           |   |           |   |
       |   |           |   |           |   |           |   |
+----------+  遍历sql  +---+ 解析所有sql +---+  执行sql  +------------>
       |   |  目录下的  |   |  文件脚本  |   |   脚本     |   |
+----------+  sql文件   +---+   内容    +---+           +------------>
       |   |           |   |           |   |           |   |
       |   |           |   |           |   |           |   |
       |   |           |   |           |   |           |   |
       |   |           |   |           |   |           |   |
       |   +-----------+   +-----------+   +-----------+   |
       |                                                   |
       +---------------------------------------------------+
```

## 源码详解



### 数据库操作文件 ./util/db.js

```js
const mysql = require('mysql')

const pool = mysql.createPool({
  host     :  '127.0.0.1',
  user     :  'root',
  password :  'abc123',
  database :  'koa_demo'
})

let query = function( sql, values ) {

  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })

}

module.exports = {
  query
}
```

### 获取所有sql脚本内容 ./util/get-sql-content-map.js

```js
const fs = require('fs')
const getSqlMap = require('./get-sql-map')

let sqlContentMap = {}

/**
 * 读取sql文件内容
 * @param  {string} fileName 文件名称
 * @param  {string} path     文件所在的路径
 * @return {string}          脚本文件内容
 */
function getSqlContent( fileName,  path ) {
  let content = fs.readFileSync( path, 'binary' )
  sqlContentMap[ fileName ] = content
}

/**
 * 封装所有sql文件脚本内容
 * @return {object} 
 */
function getSqlContentMap () {
  let sqlMap = getSqlMap()
  for( let key in sqlMap ) {
    getSqlContent( key, sqlMap[key] )
  }

  return sqlContentMap
}

module.exports = getSqlContentMap
```

### 获取sql目录详情 ./util/get-sql-map.js

```js
const fs = require('fs')
const walkFile = require('./walk-file')

/**
 * 获取sql目录下的文件目录数据
 * @return {object} 
 */
function getSqlMap () {
  let basePath = __dirname
  basePath = basePath.replace(/\\/g, '\/')

  let pathArr = basePath.split('\/')
  pathArr = pathArr.splice( 0, pathArr.length - 1 )
  basePath = pathArr.join('/') + '/sql/'

  let fileList = walkFile( basePath, 'sql' )
  return fileList
}

module.exports = getSqlMap
```

### 遍历目录操作 ./util/walk-file.js

```js
const fs = require('fs')

/**
 * 遍历目录下的文件目录
 * @param  {string} pathResolve  需进行遍历的目录路径
 * @param  {string} mime         遍历文件的后缀名
 * @return {object}              返回遍历后的目录结果
 */
const walkFile = function(  pathResolve , mime ){

  let files = fs.readdirSync( pathResolve )

  let fileList = {}

   for( let [ i, item] of files.entries() ) {
    let itemArr = item.split('\.')

    let itemMime = ( itemArr.length > 1 ) ? itemArr[ itemArr.length - 1 ] : 'undefined'
    let keyName = item + ''
    if( mime === itemMime ) {
      fileList[ item ] =  pathResolve + item
    }
  }

  return fileList
}

module.exports = walkFile
```

### 入口文件 ./index.js

```js
const fs = require('fs');
const getSqlContentMap = require('./util/get-sql-content-map');
const { query } = require('./util/db');


// 打印脚本执行日志
const eventLog = function( err , sqlFile, index ) {
  if( err ) {
    console.log(`[ERROR] sql脚本文件: ${sqlFile} 第${index + 1}条脚本 执行失败 o(╯□╰)o ！`)
  } else {
    console.log(`[SUCCESS] sql脚本文件: ${sqlFile} 第${index + 1}条脚本 执行成功 O(∩_∩)O !`)
  }
}

// 获取所有sql脚本内容
let sqlContentMap = getSqlContentMap()

// 执行建表sql脚本
const createAllTables = async () => {
  for( let key in sqlContentMap ) {
    let sqlShell = sqlContentMap[key]
    let sqlShellList = sqlShell.split(';')

    for ( let [ i, shell ] of sqlShellList.entries() ) {
      if ( shell.trim() ) {
        let result = await query( shell )
        if ( result.serverStatus * 1 === 2 ) {
          eventLog( null,  key, i)
        } else {
          eventLog( true,  key, i) 
        }
      }
    }
  }
  console.log('sql脚本执行结束！')
  console.log('请按 ctrl + c 键退出！')

}

createAllTables()
```

### sql脚本文件 ./sql/data.sql

```sql
CREATE TABLE   IF NOT EXISTS  `data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `data_info` json DEFAULT NULL,
  `create_time` varchar(20) DEFAULT NULL,
  `modified_time` varchar(20) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
```

### sql脚本文件 ./sql/user.sql

```sql
CREATE TABLE   IF NOT EXISTS  `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `nick` varchar(255) DEFAULT NULL,
  `detail_info` json DEFAULT NULL,
  `create_time` varchar(20) DEFAULT NULL,
  `modified_time` varchar(20) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `user` set email='1@example.com', password='123456';
INSERT INTO `user` set email='2@example.com', password='123456';
INSERT INTO `user` set email='3@example.com', password='123456';
```

## 效果



### 执行脚本

```text
node index.js
```

### 执行结果

![mysql-init-result-01](https://interview.poetries.top/fe-nodejs-docs/assets/img/mysql-init-result-01.4a39c870.png)

### 查看数据库写入数据

![mysql-init-result-01](https://interview.poetries.top/fe-nodejs-docs/assets/img/mysql-init-result-02.ed13a703.png)



# 9.1 原生koa2实现JSONP

## 前言



在项目复杂的业务场景，有时候需要在前端跨域获取数据，这时候提供数据的服务就需要提供跨域请求的接口，通常是使用JSONP的方式提供跨域接口。

## 实现JSONP



demo地址

[https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/jsonp/(opens new window)](https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/jsonp/)

### 具体原理

```js
  // 判断是否为JSONP的请求 
  if ( ctx.method === 'GET' && ctx.url.split('?')[0] === '/getData.jsonp') {
    // 获取jsonp的callback
    let callbackName = ctx.query.callback || 'callback'
    let returnData = {
      success: true,
      data: {
        text: 'this is a jsonp api',
        time: new Date().getTime(),
      }
    } 

    // jsonp的script字符串
    let jsonpStr = `;${callbackName}(${JSON.stringify(returnData)})`

    // 用text/javascript，让请求支持跨域获取
    ctx.type = 'text/javascript'

    // 输出jsonp字符串
    ctx.body = jsonpStr
  }  
```

### 解析原理

- JSONP跨域输出的数据是可执行的JavaScript代码
  - ctx输出的类型应该是'text/javascript'
  - ctx输出的内容为可执行的返回数据JavaScript代码字符串
- 需要有回调函数名callbackName，前端获取后会通过动态执行JavaScript代码字符，获取里面的数据

### 效果截图

#### 同域访问JSON请求

![jsonp-result-01](https://interview.poetries.top/fe-nodejs-docs/assets/img/jsonp-result-01.52a321b6.png)

#### 跨域访问JSON请求

![jsonp-result-02](https://interview.poetries.top/fe-nodejs-docs/assets/img/jsonp-result-02.8053e745.png)

### 完整demo代码

```js
const Koa = require('koa')
const app = new Koa()

app.use( async ( ctx ) => {


  // 如果jsonp 的请求为GET
  if ( ctx.method === 'GET' && ctx.url.split('?')[0] === '/getData.jsonp') {

    // 获取jsonp的callback
    let callbackName = ctx.query.callback || 'callback'
    let returnData = {
      success: true,
      data: {
        text: 'this is a jsonp api',
        time: new Date().getTime(),
      }
    }

    // jsonp的script字符串
    let jsonpStr = `;${callbackName}(${JSON.stringify(returnData)})`

    // 用text/javascript，让请求支持跨域获取
    ctx.type = 'text/javascript'

    // 输出jsonp字符串
    ctx.body = jsonpStr

  } else {

    ctx.body = 'hello jsonp'

  }
})

app.listen(3000, () => {
  console.log('[demo] jsonp is starting at port 3000')
})
```



# 9.2 koa jsonp中间件

koa.js 官方wiki中也介绍了不少jsonp的中间件 ![jsonp-wiki](http://interview.poetries.top/fe-nodejs-docs/assets/img/jsonp-wiki.4dc57e7c.png)

其中koa-jsonp是支持koa2的，使用方式也非常简单，koa-jsonp的官方demo也很容易理解

## 快速使用



demo地址

[https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/jsonp-use-middleware/(opens new window)](https://github.com/poetries/daily-code-practice/tree/master/node/koa/koa2-demo/jsonp-use-middleware/)

### 安装

```sh
npm install --save koa-jsonp
```

### 简单例子

```js
const Koa = require('koa')
const jsonp = require('koa-jsonp')
const app = new Koa()

// 使用中间件
app.use(jsonp())

app.use( async ( ctx ) => {
  
  let returnData = {
    success: true,
    data: {
      text: 'this is a jsonp api',
      time: new Date().getTime(),
    }
  }

  // 直接输出JSON
  ctx.body = returnData
})

app.listen(3000, () => {
  console.log('[demo] jsonp is starting at port 3000')
```



# 其他

# 操作数据库

## MongoDB 基础



> MongoDB教程 https://www.yiibai.com/mongodb

### Node.js 操作 MongoDB

```js
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var db;

MongoClient.connect("mongodb://localhost:27017/test1705candel", function(err, database) {
  if(err) throw err;

  db = database;
});

module.exports = {
	insert: function(_collection, _data, _callback){
		var i = db.collection(_collection).insert(_data).then(function(result){
			_callback(result);
		});
	},
	select: function(_collection, _condition, _callback){
		var i = db.collection(_collection).find(_condition || {}).toArray(function(error, dataset){
			_callback({status: true, data: dataset});
		})
	}
}
```

## MySql 基础



### node-mysql

```text
npm install mysql
```

**新建sql.js**

```js
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'wscats',
	password: '123456789',
	database: 'asm'
});
connection.connect();//连接数据库
connection.query('select * from news', function(err, rows, fields) {
	if(err) throw err;
	console.log('The news is: ', rows[0]);
});//执行SQL语句
connection.end();//关闭连接。
```

**连接基本参数**

| 参数           | 用法                      |
| -------------- | ------------------------- |
| host           | 主机名，localhost代表本地 |
| user Mysql用户 |                           |
| password       | 密码                      |
| database       | 连接的数据库              |

**执行文件**

```text
node sql
```

> 注意如果我们要在每一次查询数据库后connection.end()关闭一次连接，那我们需要`mysql.createConnection()`创建一个新的connection，也就是每一次的开关都是用唯一一个connection来实现

```js
var connection;
function createConnection() {
	connection = mysql.createConnection({
		host: 'localhost',
		user: 'laoxie',
		password: '12345678',
		database: 'asm'
	});
}
```

**增删查改分页**

> 注意sql语句不要写错语法

```js
//增加记录
connection.query('insert into news (title ,text) values ("wscats" , "eno")');
//删除记录
connection.query('delete from news where title = "wscats"');
// 修改记录
connection.query('update news set text = "eno" where title = "wscats"');
//查找记录
connection.query('select * from news', function(err, rows, fields) {
	if(err) throw err;
	console.log('The news is: ', rows[0]);
});
//查询记录
var arr = [];
connection.query("select * from news", function selectTable(err, rows, fields) {
	if(err) {
		throw err;
	}
	if(rows) {
		for(var i = 0; i < rows.length; i++) {
			console.log("第" + i + "条", "id: " + rows[i].id, "title: " + rows[i].title, "text: " + rows[i].text);
			//把数据组装成数组对象
			var obj = {};
			obj.id = rows[i].id;
			obj.title = rows[i].title;
			obj.text = rows[i].text;
			arr.push(obj);
		}
	}
	console.log(arr);
});
//查询记录
connection.query('select * from news where id = 2', function(err, rows, fields) {
	if(err) throw err;
	console.log('The news is: ', rows[0]);
});
//分页
//取前5条数据
select * from table limit 0,5
//or
select * from table limit 5
//取第11条到第15条数据，共5条
select * from table limit 10,5
//格式
select * from table limit offset,rows
offset指定要返回的第一行的偏移量，rows第二个指定返回行的最大数目。初始行的偏移量是0(不是1)
```

**封装成模块**

> 最后我们可以把它封装成一个模块导出，在其他主模块中调用注意我在每个原型链的函数结尾处都会调用一个connection.end()方法，这个方法connection.connect()对应，一个开始，一个结束

配合await和async的封装

```js
let mysql = require('mysql');
let config = require('./config.json');
let pool = mysql.createPool({
    connectionLimit: 10,
    host: config.host,
    user: config.user,
    port: config.port,
    password: config.password,
    database: config.database
});
let connect = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            !err ? resolve(connection) : reject(err)
        });
    })
}

let find = (table, params) => {
    return new Promise(async (resolve, reject) => {
        let connection = await connect();
        connection.query(`SELECT * FROM ${table} ${params?'where ?':''}`, [{
            ...params
        }], (err, results, fields) => {
            !err ? resolve(results) : reject(err)
            connection.release();
        });
    })
}

let insert = (table, params) => {
    return new Promise(async (resolve, reject) => {
        let connection = await connect();
        connection.query(`INSERT INTO ${table} SET ?`, [{
            ...params
        }], (err, results, fields) => {
            !err ? resolve(results) : reject(err)
            connection.release();
        })
    })
}

let del = (table, params) => {
    return new Promise(async (resolve, reject) => {
        let connection = await connect();
        connection.query(`DELETE FROM ${table} WHERE ?`, [{
            ...params
        }], (err, results, fields) => {
            !err ? resolve(results) : reject(err)
            connection.release();
        })
    })
}

let update = (table, params1, params2) => {
    return new Promise(async (resolve, reject) => {
        let connection = await connect();
        connection.query(`UPDATE ${table} SET ? WHERE ?`, [{
            ...params1
        }, {
            ...params2
        }], (err, results, fields) => {
            !err ? resolve(results) : reject(err)
            connection.release();
        })
    })
}
module.exports = {
    connect,
    find,
    insert,
    del,
    update
}
```

**断线重连**

> 因为mysql连接时间长的话会自动断掉，可以封装一个断线重连的接口

```js
const mysql = require("mysql");
function createConnection() {
	let connection = mysql.createConnection({
		// 域名
		host: 'localhost',
		// 用户名
		user: 'wscats',
		// 密码
		password: '12345678',
		// 数据库
		database: 'corrine'
	});
	//连接错误，2秒重试
	connection.connect((err) => {
		if(err) {
			console.log('error when connecting to db:', err);
			setTimeout(createConnection, 2000);
		}
	});
	connection.on('error', function(err) {
		console.log('db error', err);
		// 如果是连接断开，自动重新连接
		if(err.code === 'PROTOCOL_CONNECTION_LOST') {
			createConnection();
		} else {
			throw err;
		}
	});
	return connection
}
module.exports = createConnection();
```

**自动断线**

> 建议用下面这一段来实现mysql的自动连接和自动断开，那就不会出现too many connections的错误提醒了

```js
var query = function(sql, params, callback) {
	var connection = mysql.createConnection({
		// 域名
		host: 'localhost',
		// 用户名
		user: 'wscats',
		// 密码
		password: '12345678',
		// 数据库
		database: 'corrine'
	});
	//连接错误，2秒重试  
	connection.connect(function(err) {
		if(err) {
			console.log("error when connecting to db:", err);
			setTimeout(query, 2000);
		} else {
			var q = connection.query(sql, params, function(error, results, fields) {
				//关闭连接  
				connection.end();
				//事件驱动回调  
				callback(error, results, fields);
			});
			console.log("sql:::" + q.sql);
		}
	});
	connection.on("error", function(err) {
		console.log("db error", err);
		// 如果是连接断开，自动重新连接  
		if(err.code === "PROTOCOL_CONNECTION_LOST") {
			query();
		} else {
			throw err;
		}
	});
}
```

### Node.js 操作 MySql

```js
var mysql = require('mysql');

//创建连接池
var pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  port: 3306,
  database: '1000phone',
  multipleStatements: true
});


module.exports = {
	select: function(tsql, callback){
		pool.query(tsql, function(error, rows){
      if(rows.length > 1){
        callback({rowsCount: rows[1][0]['rowsCount'], data: rows[0]});
      } else {
        callback(rows);
      }
		})
	}
}
```

# Session 与 Token

## Session



Session 是一种记录客户状态的机制，不同的是 Cookie 保存在客户端浏览器中，而 Session 保存在服务器上的进程中。

客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上，这就是 Session。客户端浏览器再次访问时只需要从该 Session 中查找该客户的状态就可以了。

如果说 Cookie 机制是通过检查客户身上的“通行证”来确定客户身份的话，那么 Session 机制就是通过检查服务器上的“客户明细表”来确认客户身份。

Session 相当于程序在服务器上建立的一份客户档案，客户来访的时候只需要查询客户档案表就可以了。

Session 不能跨域

### Session 与 Cookie 的区别

- Cookie 数据存放在客户的浏览器上，Session 数据放在服务器上的进程中。
- Cookie 不是很安全，别人可以分析存放在本地的 Cookie 并进行 Cookie 欺骗 考虑到安全应当使用 Session。
- Session 会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能
- 单个 Cookie 保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个 Cookie。

### Session 应用

```javascript
const express = require('express')
const path = require('path')
const app = express();

const bodyParser = require('body-parser');

const cp = require('cookie-parser');
const session = require('express-session');

app.use(cp());
app.use(session({
    secret: '12345',//用来对session数据进行加密的字符串.这个属性值为必须指定的属性
    name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 5000 },  //设置maxAge是5000ms，即5s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,    
}))
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '/')));

app.get('/setsession', (request, response) => {
    request.session.user = {username: 'admin'};
    response.send('set session success');
})

app.get('/getsession', (request, response) => {
    response.send(request.session.user);
})

app.get('/delsession', (request, response) => {
    delete reqeust.session.user;
    response.send(request.session.user);
})

app.listen(88)
```

## Token



### Token

在计算机身份认证中是令牌（临时）的意思，在词法分析中是标记的意思。一般我们所说的的 token 大多是指用于身份验证的 token

### Token的特点

- 随机性
- 不可预测性
- 时效性
- 无状态、可扩展
- 跨域

### 基于Token的身份验证场景

1. 客户端使用用户名和密码请求登录
2. 服务端收到请求，验证登录是否成功
3. 验证成功后，服务端会返回一个 Token 给客户端，反之，返回身份验证失败的信息
4. 客户端收到 Token 后把 Token 用一种方式(cookie/localstorage/sessionstorage/其他)存储起来
5. 客户端每次发起请求时都选哦将 Token 发给服务端
6. 服务端收到请求后，验证Token的合法性，合法就返回客户端所需数据，反之，返回验证失败的信息

### Token 身份验证实现 —— jsonwebtoken

先安装第三方模块 jsonwebtoken `npm install jsonwebtoken`

```javascript
const express = require('express')
const path = require('path')
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '/')));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Auth, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") {
          res.sendStatus(200);/*让options请求快速返回*/
    } else{
          next();
    }
});


app.get('/createtoken', (request, response) => {
    //要生成 token 的主题信息
    let user = {
        username: 'admin',
    }
    //这是加密的 key（密钥）
    let secret = 'dktoken';
    //生成 Token
    let token = jwt.sign(user, secret, {
        'expiresIn': 60*60*24 // 设置过期时间, 24 小时
    })      
    response.send({status: true, token});
})

app.post('/verifytoken', (request, response) => {
    //这是加密的 key（密钥），和生成 token 时的必须一样
    let secret = 'dktoken';
    let token = request.headers['auth'];
    if(!token){
        response.send({status: false, message: 'token不能为空'});
    }
    jwt.verify(token, secret, (error, result) => {
        if(error){
            response.send({status: false});
        } else {
            response.send({status: true, data: result});
        }
    })
})

app.listen(88)
```

### 前端 ajax 请求时在请求头中包含 Token

#### ajax 请求之 jQuery 篇

```javascript
$.ajax({
    url: 'verifytoken',
    type: 'post',
    headers: {"auth": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTIzNTQwNjY5LCJleHAiOjE1MjM2MjcwNjl9.ddkS5XEiMzvNQsk9UlMPhyxPSq5S_oh3Nq19eIm9AJU'},
    success: function(res){
        console.log(res)
    }
})
```

#### ajax 请求之 XMLHttpRequest 篇

```javascript
var xhr = new XMLHttpRequest();
xhr.open("POST","verifytoken");
xhr.setRequestHeader('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTIzNTQwNjY5LCJleHAiOjE1MjM2MjcwNjl9.ddkS5XEiMzvNQsk9UlMPhyxPSq5S_oh3Nq19eIm9AJU');
xhr.send();
```

#### ajax 请求之 axios 篇

```javascript
import axios from 'axios'
axios({
    url: url,
    params: _params || {},
    headers: {auth: window.sessionStorage.getItem('dktoken')}
}).then(res => {
    if(!res.data.status && res.data.error == "unauthorized"){
        router.push('login');
        return false;
    }
    resolve(res)
}).catch(error => {
    reject(error)
})
```

#### ajax 请求之 superagent 篇

```javascript
import http from 'superagent'
http.post(getUrl(path))
    .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    .set('auth',  window.localStorage.getItem('access_token'))
    .end((err, res) => {});
```

# Cookie、Session、Token、JWT

## 什么是认证（Authentication）



- 通俗地讲就是验证当前用户的身份，证明“你是你自己”（比如：你每天上下班打卡，都需要通过指纹打卡，当你的指纹和系统里录入的指纹相匹配时，就打卡成功）
- 互联网中的认证：
  - 用户名密码登录
  - 邮箱发送登录链接
  - 手机号接收验证码
  - 只要你能收到邮箱/验证码，就默认你是账号的主人

## [#](http://interview.poetries.top/fe-nodejs-docs/nodejs-docs/other/03-Cookie、Session、Token、JWT.html#什么是授权-authorization)什么是授权（Authorization）



- 用户授予第三方应用访问该用户某些资源的权限
  - 你在安装手机应用的时候，APP 会询问是否允许授予权限（访问相册、地理位置等权限）
  - 你在访问微信小程序时，当登录时，小程序会询问是否允许授予权限（获取昵称、头像、地区、性别等个人信息）
- 实现授权的方式有：`cookie`、`session`、`token`、`OAuth`

## [#](http://interview.poetries.top/fe-nodejs-docs/nodejs-docs/other/03-Cookie、Session、Token、JWT.html#什么是凭证-credentials)什么是凭证（Credentials）



**实现认证和授权的前提是需要一种媒介（证书） 来标记访问者的身份**

> 在互联网应用中，一般网站（如掘金）会有两种模式，游客模式和登录模式。游客模式下，可以正常浏览网站上面的文章，一旦想要点赞/收藏/分享文章，就需要登录或者注册账号。当用户登录成功后，服务器会给该用户使用的浏览器颁发一个令牌（`token`），这个令牌用来表明你的身份，每次浏览器发送请求时会带上这个令牌，就可以使用游客模式下无法使用的功能。

## [#](http://interview.poetries.top/fe-nodejs-docs/nodejs-docs/other/03-Cookie、Session、Token、JWT.html#什么是-cookie)什么是 Cookie



- **HTTP 是无状态的协议**（对于事务处理没有记忆能力，每次客户端和服务端会话完成时，服务端不会保存任何会话信息）：每个请求都是完全独立的，服务端无法确认当前访问者的身份信息，无法分辨上一次的请求发送者和这一次的发送者是不是同一个人。所以服务器与浏览器为了进行会话跟踪（知道是谁在访问我），就必须主动的去维护一个状态，这个状态用于告知服务端前后两个请求是否来自同一浏览器。而这个状态需要通过 `cookie` 或者 `session` 去实现
- **cookie 存储在客户端**： cookie 是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。
- **cookie 是不可跨域的**： 每个 cookie 都会绑定单一的域名，无法在别的域名下获取使用，**一级域名和二级域名之间是允许共享使用的**（靠的是 domain）。

| 属性                                                         | 说明                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `name=value`                                                 | 键值对，设置 `Cookie` 的名称及相对应的值，都必须是字符串类型。如果值为 Unicode 字符，需要为字符编码。如果值为二进制数据，则需要使用 `BASE64` 编码。 |
| `domain`                                                     | 指定 `cookie` 所属域名，默认是当前域名                       |
| `path`                                                       | 指定 cookie 在哪个路径（路由）下生效，默认是 '/'。           |
| 如果设置为 /abc，则只有 /abc 下的路由可以访问到该 cookie，如：/abc/read。 |                                                              |
| `maxAge`                                                     | cookie 失效的时间，单位秒。如果为整数，则该 cookie 在 maxAge 秒后失效。如果为负数，该 cookie 为临时 cookie ，关闭浏览器即失效，浏览器也不会以任何形式保存该 cookie 。如果为 0，表示删除该 cookie 。默认为 -1。- 比 expires 好用。 |
| `expires`                                                    | 过期时间，在设置的某个时间点后该 cookie 就会失效。           |
| 一般浏览器的 cookie 都是默认储存的，当关闭浏览器结束这个会话的时候，这个 cookie 也就会被删除 |                                                              |
| `secure`                                                     | 该 cookie 是否仅被使用安全协议传输。安全协议有 HTTPS，SSL等，在网络上传输数据之前先将数据加密。默认为false。 |
| 当 secure 值为 true 时，cookie 在 HTTP 中是无效，在 HTTPS 中才有效 |                                                              |
| `httpOnly`                                                   | 如果给某个 cookie 设置了 httpOnly 属性，则无法通过 JS 脚本 读取到该 cookie 的信息，但还是能通过 Application 中手动修改 cookie，所以只是在一定程度上可以防止 XSS 攻击，不是绝对的安全 |

## [#](http://interview.poetries.top/fe-nodejs-docs/nodejs-docs/other/03-Cookie、Session、Token、JWT.html#什么是-session)什么是 Session



- `session` 是另一种记录服务器和客户端会话状态的机制
- `session` 是基于 `cookie` 实现的，`session` 存储在服务器端，`sessionId` 会被存储到客户端的`cookie` 中

![img](https://interview.poetries.top/fe-nodejs-docs/assets/img/session.d9af5647.png)

**session 认证流程：**

- 用户第一次请求服务器的时候，服务器根据用户提交的相关信息，创建对应的 Session
- 请求返回时将此 Session 的唯一标识信息 SessionID 返回给浏览器
- 浏览器接收到服务器返回的 SessionID 信息后，会将此信息存入到 Cookie 中，同时 Cookie 记录此 SessionID 属于哪个域名
- 当用户第二次访问服务器的时候，请求会自动判断此域名下是否存在 Cookie 信息，如果存在自动将 Cookie 信息也发送给服务端，服务端会从 Cookie 中获取 SessionID，再根据 SessionID 查找对应的 Session 信息，如果没有找到说明用户没有登录或者登录失效，如果找到 Session 证明用户已经登录可执行后面操作。

> 根据以上流程可知，SessionID 是连接 Cookie 和 Session 的一道桥梁，大部分系统也是根据此原理来验证用户登录状态。

## [#](http://interview.poetries.top/fe-nodejs-docs/nodejs-docs/other/03-Cookie、Session、Token、JWT.html#cookie-和-session-的区别)Cookie 和 Session 的区别



- **安全性**： Session 比 Cookie 安全，Session 是存储在服务器端的，Cookie 是存储在客户端的。
- **存取值的类型不同**：Cookie 只支持存字符串数据，想要设置其他类型的数据，需要将其转换成字符串，Session 可以存任意数据类型。
- **有效期不同**： Cookie 可设置为长时间保持，比如我们经常使用的默认登录功能，Session 一般失效时间较短，客户端关闭（默认情况下）或者 Session 超时都会失效。
- **存储大小不同**： 单个 Cookie 保存的数据不能超过 4K，Session 可存储数据远高于 Cookie，但是当访问量过多，会占用过多的服务器资源。

## [#](http://interview.poetries.top/fe-nodejs-docs/nodejs-docs/other/03-Cookie、Session、Token、JWT.html#什么是-token-令牌)什么是 Token（令牌）



### [#](http://interview.poetries.top/fe-nodejs-docs/nodejs-docs/other/03-Cookie、Session、Token、JWT.html#acesss-token)Acesss Token

- 访问资源接口（API）时所需要的资源凭证
- 简单 token 的组成： uid(用户唯一的身份标识)、time(当前时间的时间戳)、sign（签名，token 的前几位以哈希算法压缩成的一定长度的十六进制字符串）
- 特点：
  - 服务端无状态化、可扩展性好
  - 支持移动端设备
  - 安全
  - 支持跨程序调用
- `token` 的身份验证流程：

![img](https://interview.poetries.top/fe-nodejs-docs/assets/img/token.91d0af4c.png)

1. 客户端使用用户名跟密码请求登录
2. 服务端收到请求，去验证用户名与密码
3. 验证成功后，服务端会签发一个 token 并把这个 token 发送给客户端
4. 客户端收到 token 以后，会把它存储起来，比如放在 cookie 里或者 localStorage 里
5. 客户端每次向服务端请求资源的时候需要带着服务端签发的 token
6. 服务端收到请求，然后去验证客户端请求里面带着的 token ，如果验证成功，就向客户端返回请求的数据

- 每一次请求都需要携带 token，需要把 token 放到 HTTP 的 Header 里
- 基于 token 的用户认证是一种服务端无状态的认证方式，服务端不用存放 token 数据。用解析 token 的计算时间换取 session 的存储空间，从而减轻服务器的压力，减少频繁的查询数据库
- token 完全由应用管理，所以它可以避开同源策略

### [#](http://interview.poetries.top/fe-nodejs-docs/nodejs-docs/other/03-Cookie、Session、Token、JWT.html#refresh-token)Refresh Token

- 另外一种 `token——refresh token`
- `refresh token` 是专用于刷新 access token 的 token。如果没有 refresh token，也可以刷新 access token，但每次刷新都要用户输入登录用户名与密码，会很麻烦。有了 refresh token，可以减少这个麻烦，客户端直接用 refresh token 去更新 access token，无需用户进行额外的操作。

![img](https://interview.poetries.top/fe-nodejs-docs/assets/img/token2.529aab5c.png)

- `Access Token` 的有效期比较短，当 Acesss Token 由于过期而失效时，使用 Refresh Token 就可以获取到新的 Token，如果 Refresh Token 也失效了，用户就只能重新登录了。
- `Refresh Token` 及过期时间是存储在服务器的数据库中，只有在申请新的 Acesss Token 时才会验证，不会对业务接口响应时间造成影响，也不需要向 Session 一样一直保持在内存中以应对大量的请求。

## Token 和 Session 的区别



- `Session` 是一种记录服务器和客户端会话状态的机制，使服务端有状态化，可以记录会话信息。而 Token 是令牌，访问资源接口（API）时所需要的资源凭证。`Token` 使服务端无状态化，不会存储会话信息。
- `Session` 和 `Token` 并不矛盾，作为身份认证 Token 安全性比 Session 好，因为每一个请求都有签名还能防止监听以及重放攻击，而 Session 就必须依赖链路层来保障通讯安全了。如果你需要实现有状态的会话，仍然可以增加 Session 来在服务器端保存一些状态。
- 所谓 Session 认证只是简单的把 User 信息存储到 Session 里，因为 SessionID 的不可预测性，暂且认为是安全的。而 Token ，如果指的是 OAuth Token 或类似的机制的话，提供的是 认证 和 授权 ，认证是针对用户，授权是针对 App 。其目的是让某 App 有权利访问某用户的信息。这里的 Token 是唯一的。不可以转移到其它 App上，也不可以转到其它用户上。Session 只提供一种简单的认证，即只要有此 SessionID ，即认为有此 User 的全部权利。是需要严格保密的，这个数据应该只保存在站方，不应该共享给其它网站或者第三方 App。所以简单来说：如果你的用户数据可能需要和第三方共享，或者允许第三方调用 API 接口，用 Token 。如果永远只是自己的网站，自己的 App，用什么就无所谓了。

## 什么是 JWT



> [JSON Web Token 入门教程(opens new window)](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)

- JSON Web Token（简称 JWT）是目前最流行的跨域认证解决方案。
- 是一种认证授权机制。
- JWT 是为了在网络应用环境间传递声明而执行的一种基于 JSON 的开放标准（RFC 7519）。JWT 的声明一般被用来在身份提供者和服务提供者间传递被认证的- 用户身份信息，以便于从资源服务器获取资源。比如用在用户登录上。
- 可以使用 HMAC 算法或者是 RSA 的公/私秘钥对 JWT 进行签名。因为数字签名的存在，这些传递的信息是可信的。

### 生成 JWT

- jwt.io/
- www.jsonwebtoken.io/

### JWT 的原理

![img](https://interview.poetries.top/fe-nodejs-docs/assets/img/jwt.989a49ef.png)

**JWT 认证流程：**

- 用户输入用户名/密码登录，服务端认证成功后，会返回给客户端一个 JWT
- 客户端将 token 保存到本地（通常使用 localstorage，也可以使用 cookie）
- 当用户希望访问一个受保护的路由或者资源的时候，需要请求头的 Authorization 字段中使用Bearer 模式添加 JWT，其内容看起来是下面这样

```text
Authorization: Bearer <token>
```

- 服务端的保护路由将会检查请求头 Authorization 中的 JWT 信息，如果合法，则允许用户的行为
- 因为 JWT 是自包含的（内部包含了一些会话信息），因此减少了需要查询数据库的需要
- 因为 JWT 并不使用 Cookie 的，所以你可以使用任何域名提供你的 API 服务而不需要担心跨域资源共享问题（CORS）
- 因为用户的状态不再存储在服务端的内存中，所以这是一种无状态的认证机制

### JWT 的使用方式

> 客户端收到服务器返回的 JWT，可以储存在 Cookie 里面，也可以储存在 localStorage

1. 方式一

> 当用户希望访问一个受保护的路由或者资源的时候，可以把它放在 Cookie 里面自动发送，但是这样不能跨域，所以更好的做法是放在 HTTP 请求头信息的 Authorization 字段里，使用 Bearer 模式添加 JWT。

```text
GET /calendar/v1/events
Host: api.example.com
Authorization: Bearer <token>
```

- 用户的状态不会存储在服务端的内存中，这是一种 无状态的认证机制
- 服务端的保护路由将会检查请求头 Authorization 中的 JWT 信息，如果合法，则允许用户的行为。
- 由于 JWT 是自包含的，因此减少了需要查询数据库的需要
- JWT 的这些特性使得我们可以完全依赖其无状态的特性提供数据 API 服务，甚至是创建一个下载流服务。
- 因为 JWT 并不使用 Cookie ，所以你可以使用任何域名提供你的 API 服务而不需要担心跨域资源共享问题（CORS）

1. 方式二

> 跨域的时候，可以把 JWT 放在 POST 请求的数据体里。

1. 方式三

> 通过 URL 传输

```text
http://www.example.com/user?token=xxx
```

## Token 和 JWT 的区别



**相同：**

- 都是访问资源的令牌
- 都可以记录用户的信息
- 都是使服务端无状态化
- 都是只有验证成功后，客户端才能访问服务端上受保护的资源

**区别：**

- **Token**：服务端验证客户端发送过来的 Token 时，还需要查询数据库获取用户信息，然后验证 Token 是否有效。
- **JWT**： 将 Token 和 Payload 加密后存储于客户端，服务端只需要使用密钥解密进行校验（校验也是 JWT 自己实现的）即可，不需要查询或者减少查询数据库，因为 JWT 自包含了用户信息和加密的数据。

## 常见的前后端鉴权方式



- `Session-Cookie`
- `Token` 验证（包括 `JWT`，`SSO`）
- `OAuth2.0`（开放授权）

## 常见的加密算法



![img](https://interview.poetries.top/fe-nodejs-docs/assets/img/sha.b6a155ed.png)

- 哈希算法(Hash Algorithm)又称散列算法、散列函数、哈希函数，是一种从任何一种数据中创建小的数字“指纹”的方法。哈希算法将数据重新打乱混合，重新创建一个哈希值。
- 哈希算法主要用来保障数据真实性(即完整性)，即发信人将原始消息和哈希值一起发送，收信人通过相同的哈希函数来校验原始数据是否真实。
- 哈希算法通常有以下几个特点：
  - 正像快速：原始数据可以快速计算出哈希值
  - 逆向困难：通过哈希值基本不可能推导出原始数据
  - 输入敏感：原始数据只要有一点变动，得到的哈希值差别很大
  - 冲突避免：很难找到不同的原始数据得到相同的哈希值，宇宙中原子数大约在 10 的 60 次方到 80 次方之间，所以 2 的 256 次方有足够的空间容纳所有的可能，算法好的情况下冲突碰撞的概率很低：

**注意：**

- 以上不能保证数据被恶意篡改，原始数据和哈希值都可能被恶意篡改，要保证不被篡改，可以使用RSA 公钥私钥方案，再配合哈希值。
- 哈希算法主要用来防止计算机传输过程中的错误，早期计算机通过前 7 位数据第 8 位奇偶校验码来保障（12.5% 的浪费效率低），对于一段数据或文件，通过哈希算法生成 128bit 或者 256bit 的哈希值，如果校验有问题就要求重传。

## 常见问题



### 使用 cookie 时需要考虑的问题

- 因为存储在客户端，容易被客户端篡改，使用前需要验证合法性
- 不要存储敏感数据，比如用户密码，账户余额
- 使用 httpOnly 在一定程度上提高安全性
- 尽量减少 cookie 的体积，能存储的数据量不能超过 4kb
- 设置正确的 domain 和 path，减少数据传输
- cookie 无法跨域
- 一个浏览器针对一个网站最多存 20 个Cookie，浏览器一般只允许存放 300 个Cookie
- 移动端对 cookie 的支持不是很好，而 session 需要基于 cookie 实现，所以移动端常用的是 token

### 使用 session 时需要考虑的问题

- 将 session 存储在服务器里面，当用户同时在线量比较多时，这些 session 会占据较多的内存，需要在服务端定期的去清理过期的 session
- 当网站采用集群部署的时候，会遇到多台 web 服务器之间如何做 session 共享的问题。因为 session 是由单个服务器创建的，但是处理用户请求的服务器不一定是那个创建 session 的服务器，那么该服务器就无法拿到之前已经放入到 session 中的登录凭证之类的信息了。
- 当多个应用要共享 session 时，除了以上问题，还会遇到跨域问题，因为不同的应用可能部署的主机不一样，需要在各个应用做好 cookie 跨域的处理。
- sessionId 是存储在 cookie 中的，假如浏览器禁止 cookie 或不支持 cookie 怎么办？ 一般会把 sessionId 跟在 url 参数后面即重写 url，所以 session 不一定非得需要靠 cookie 实现
- 移动端对 cookie 的支持不是很好，而 session 需要基于 cookie 实现，所以移动端常用的是 token

### 使用 token 时需要考虑的问题

- 如果你认为用数据库来存储 token 会导致查询时间太长，可以选择放在内存当中。比如 redis 很适合你对 token 查询的需求。
- token 完全由应用管理，所以它可以避开同源策略
- token 可以避免 CSRF 攻击(因为不需要 cookie 了)
- 移动端对 cookie 的支持不是很好，而 session 需要基于 cookie 实现，所以移动端常用的是 token

### 使用 JWT 时需要考虑的问题

- 因为 JWT 并不依赖 Cookie 的，所以你可以使用任何域名提供你的 API 服务而不需要担心跨域资源共享问题（CORS）
- JWT 默认是不加密，但也是可以加密的。生成原始 Token 以后，可以用密钥再加密一次。
- JWT 不加密的情况下，不能将秘密数据写入 JWT。
- JWT 不仅可以用于认证，也可以用于交换信息。有效使用 JWT，可以降低服务器查询数据库的次数。
- JWT 最大的优势是服务器不再需要存储 Session，使得服务器认证鉴权业务可以方便扩展。但这也是 JWT 最大的缺点：由于服务器不需要存储 Session 状态，- 因此使用过程中无法废弃某个 Token 或者更改 Token 的权限。也就是说一旦 JWT 签发了，到期之前就会始终有效，除非服务器部署额外的逻辑。
- JWT 本身包含了认证信息，一旦泄露，任何人都可以获得该令牌的所有权限。为了减少盗用，JWT的有效期应该设置得比较短。对于一些比较重要的权限，使用时应该再次对用户进行认证。
- JWT 适合一次性的命令认证，颁发一个有效期极短的 JWT，即使暴露了危险也很小，由于每次操作都会生成新的 JWT，因此也没必要保存 JWT，真正实现无状态。
- 为了减少盗用，JWT 不应该使用 HTTP 协议明码传输，要使用 HTTPS 协议传输。

### 使用加密算法时需要考虑的问题

- 绝不要以明文存储密码
- 永远使用 哈希算法 来处理密码，绝不要使用 Base64 或其他编码方式来存储密码，这和以明文存储密码是一样的，使用哈希，而不要使用编码。编码以及加密，都是双向的过程，而密码是保密的，应该只被它的所有者知道， 这个过程必须是单向的。哈希正是用于做这个的，从来没有解哈希这种说法， 但是编码就存在解码，加密就存在解密。
- 绝不要使用弱哈希或已被破解的哈希算法，像 MD5 或 SHA1 ，只使用强密码哈希算法。
- 绝不要以明文形式显示或发送密码，即使是对密码的所有者也应该这样。如果你需要 “忘记密码” 的功能，可以随机生成一个新的 一次性的（这点很重要）密码，然后把这个密码发送给用户。

## 分布式架构下 session 共享方案



### 1. session 复制

> 任何一个服务器上的 session 发生改变（增删改），该节点会把这个 session 的所有内容序列化，然后广播给所有其它节点，不管其他服务器需不需要 session ，以此来保证 session 同步

- 优点： 可容错，各个服务器间 session 能够实时响应。
- 缺点： 会对网络负荷造成一定压力，如果 session 量大的话可能会造成网络堵塞，拖慢服务器性能。

### 2. 粘性 session /IP 绑定策略

> 采用 Ngnix 中的 ip_hash 机制，将某个 ip的所有请求都定向到同一台服务器上，即将用户与服务器绑定。 用户第一次请求时，负载均衡器将用户的请求转发到了 A 服务器上，如果负载均衡器设置了粘性 session 的话，那么用户以后的每次请求都会转发到 A 服务器上，相当于把用户和 A 服务器粘到了一块，这就是粘性 session 机制

- **优点**： 简单，不需要对 session 做任何处理。
- **缺点**： 缺乏容错性，如果当前访问的服务器发生故障，用户被转移到第二个服务器上时，他的 session 信息都将失效。
- **适用场景**： 发生故障对客户产生的影响较小；服务器发生故障是低概率事件
- **实现方式**： 以 Nginx 为例，在 upstream 模块配置 ip_hash 属性即可实现粘性 session

### 3. session 共享（常用）

- 使用分布式缓存方案比如 Memcached 、Redis 来缓存 session，但是要求 Memcached 或 Redis 必须是集群
- 把 session 放到 Redis 中存储，虽然架构上变得复杂，并且需要多访问一次 Redis ，但是这种方案带来的好处也是很大的：
  - 实现了 session 共享；
  - 可以水平扩展（增加 Redis 服务器）；
  - 服务器重启 session 不丢失（不过也要注意 session 在 Redis 中的刷新/失效机制）；
  - 不仅可以跨服务器 session 共享，甚至可以跨平台（例如网页端和 APP 端）

![img](https://interview.poetries.top/fe-nodejs-docs/assets/img/session2.9db60093.png)

### 4. session 持久化

> 将 session 存储到数据库中，保证 session 的持久化

- 优点： 服务器出现问题，session 不会丢失
- 缺点： 如果网站的访问量很大，把 session 存储到数据库中，会对数据库造成很大压力，还需要增加额外的开销维护数据库。

**只要关闭浏览器 ，session 真的就消失了？**

> 不对。对 session 来说，除非程序通知服务器删除一个 session，否则服务器会一直保留，程序一般都是在用户做 log off 的时候发个指令去删除 session。然而浏览器从来不会主动在关闭之前通知服务器它将要关闭，因此服务器根本不会有机会知道浏览器已经关闭，之所以会有这种错觉，是大部分 session 机制都使用会话 cookie 来保存 session id，而关闭浏览器后这个 session id 就消失了，再次连接服务器时也就无法找到原来的 session。如果服务器设置的 cookie 被保存在硬盘上，或者使用某种手段改写浏览器发出的 HTTP 请求头，把原来的 session id 发送给服务器，则再次打开浏览器仍然能够打开原来的 session。恰恰是由于关闭浏览器不会导致 session 被删除，迫使服务器为 session 设置了一个失效时间，当距离客户端上一次使用 session 的时间超过这个失效时间时，服务器就认为客户端已经停止了活动，才会把 session 删除以节省存储空间。

# Socket

## WebSocket



### 一、WebSocket 解决了什么问题

- 客户端(浏览器)和服务器端进行通信，只能由客户端发起`ajax`请求，才能进行通信，服务器端无法主动向客户端推送信息
- 当出现类似体育赛事、聊天室、实时位置之类的场景时，客户端要获取服务器端的变化，就只能通过轮询(定时请求)来了解服务器端有没有新的信息变化

轮询效率低，非常浪费资源(需要不断发送请求，不停链接服务器)

> `WebSocket`的出现，让服务器端可以主动向服务器端发送信息，使得浏览器具备了实时双向通信的能力,这就是`WebSocket`解决的问题

**一个超简单例子**

> 新建一个`html`文件，将本栗子找个地方跑一下试试，即可轻松入门`WebSocket`

```js
function socketConnect(url) {
    // 客户端与服务器进行连接
    let ws = new WebSocket(url); // 返回`WebSocket`对象，赋值给变量ws
    // 连接成功回调
    ws.onopen = e => {
        console.log('连接成功', e)
        ws.send('我发送消息给服务端'); // 客户端与服务器端通信
    }
    // 监听服务器端返回的信息
    ws.onmessage = e => {
        console.log('服务器端返回：', e.data)
        // do something
    }
    return ws; // 返回websocket对象
}
let wsValue = socketConnect('ws://121.40.165.18:8800'); // websocket对象
```

> 上述栗子中`WebSocket`的接口地址出自：`WebSocket` 在线测试，在开发的时候也可以用于测试后端给的地址是否可用

![img](https://s.poetries.top/gitee/2019/10/389.png)

### 二、webSocket的class类

> 当项目中很多地方使用`WebSocket`，把它封成一个`class`类，是更好的选择

```js
class WebSocketClass {
    /**
     * @description: 初始化实例属性，保存参数
     * @param {String} url ws的接口
     * @param {Function} msgCallback 服务器信息的回调传数据给函数
     * @param {String} name 可选值 用于区分ws，用于debugger
     */
    constructor(url, msgCallback, name = 'default') {
        this.url = url;
        this.msgCallback = msgCallback;
        this.name = name;
        this.ws = null;  // websocket对象
        this.status = null; // websocket是否关闭
    }
    /**
     * @description: 初始化 连接websocket或重连webSocket时调用
     * @param {*} 可选值 要传的数据
     */
    connect(data) {
        // 新建 WebSocket 实例
        this.ws = new WebSocket(this.url);
        this.ws.onopen = e => {
            // 连接ws成功回调
            this.status = 'open';
            console.log(`${this.name}连接成功`, e)
            // this.heartCheck();
            if (data !== undefined) {
                // 有要传的数据,就发给后端
                return this.ws.send(data);
            }
        }
        // 监听服务器端返回的信息
        this.ws.onmessage = e => {
            // 把数据传给回调函数，并执行回调
            // if (e.data === 'pong') {
            //     this.pingPong = 'pong'; // 服务器端返回pong,修改pingPong的状态
            // }
            return this.msgCallback(e.data);
        }
        // ws关闭回调
        this.ws.onclose = e => {
            this.closeHandle(e); // 判断是否关闭
        }
        // ws出错回调
        this.onerror = e => {
            this.closeHandle(e); // 判断是否关闭
        }
    }
    // heartCheck() {
    //     // 心跳机制的时间可以自己与后端约定
    //     this.pingPong = 'ping'; // ws的心跳机制状态值
    //     this.pingInterval = setInterval(() => {
    //         if (this.ws.readyState === 1) {
    //             // 检查ws为链接状态 才可发送
    //             this.ws.send('ping'); // 客户端发送ping
    //         }
    //     }, 10000)
    //     this.pongInterval = setInterval(() => {
    //         this.pingPong = false;
    //         if (this.pingPong === 'ping') {
    //             this.closeHandle('pingPong没有改变为pong'); // 没有返回pong 重启webSocket
    //         }
    //         // 重置为ping 若下一次 ping 发送失败 或者pong返回失败(pingPong不会改成pong)，将重启
    //         console.log('返回pong')
    //         this.pingPong = 'ping'
    //     }, 20000)
    // }
    // 发送信息给服务器
    sendHandle(data) {
        console.log(`${this.name}发送消息给服务器:`, data)
        return this.ws.send(data);
    }
    closeHandle(e = 'err') {
        // 因为webSocket并不稳定，规定只能手动关闭(调closeMyself方法)，否则就重连
        if (this.status !== 'close') {
            console.log(`${this.name}断开，重连websocket`, e)
            // if (this.pingInterval !== undefined && this.pongInterval !== undefined) {
            //     // 清除定时器
            //     clearInterval(this.pingInterval);
            //     clearInterval(this.pongInterval);
            // }
            this.connect(); // 重连
        } else {
            console.log(`${this.name}websocket手动关闭`)
        }
    }
    // 手动关闭WebSocket
    closeMyself() {
        console.log(`关闭${this.name}`)
        this.status = 'close';
        return this.ws.close();
    }
}
function someFn(data) {
    console.log('接收服务器消息的回调：', data);
}
// const wsValue = new WebSocketClass('ws://121.40.165.18:8800', someFn, 'wsName'); // 这个链接一天只能发送消息50次
const wsValue = new WebSocketClass('wss://echo.websocket.org', someFn, 'wsName'); // 阮一峰老师教程链接
wsValue.connect('立即与服务器通信'); // 连接服务器
// setTimeout(() => {
//     wsValue.sendHandle('传消息给服务器')
// }, 1000);
// setTimeout(() => {
//     wsValue.closeMyself(); // 关闭ws
// }, 10000)
```

> 可以把`class`放在一个js文件里面,`export`出去，然后在需要用的地方再`import`进来，把参数传进去就可以用了

### 三、WebSocket不稳定

> `WebSocket`并不稳定，在使用一段时间后，可能会断开连接，貌似至今没有一个为何会断开连接的公论，所以我们需要让`WebSocket`保持连接状态，这里推荐两种方法

#### 3.1 WebSocket设置变量，判断是否手动关闭连接

> `class`类中就是用的这种方式:设置一个变量，在`webSocket`关闭/报错的回调中，判断是不是手动关闭的，如果不是的话，就重新连接，这样做的优缺点如下

- 优点：请求较少(相对于心跳连接)，易设置。
- 缺点：可能会导致丢失数据,在断开重连的这段时间中，恰好双方正在通信

### 3.2 WebSocket心跳机制

> 因为第一种方案的缺点，并且可能会有其他一些未知情况导致断开连接而没有触发Error或Close事件。这样就导致实际连接已经断开了，而客户端和服务端却不知道，还在傻傻的等着消息来

- 想出了一种叫做心跳机制的解决方法：
- 客户端就像心跳一样每隔固定的时间发送一次ping，来告诉服务器，我还活着，而服务器也会返回pong，来告诉客户端，服务器还活着。
- 具体的实现方法，在上面`class`的注释中，将其打开，即可看到效果

### 四、关于WebSocket

#### 4.1 WebSocket的当前状态:`WebSocket.readyState`

**下面是WebSocket.readyState的四个值(四种状态)：**

- `0`: 表示正在连接
- `1`: 表示连接成功，可以通信了
- `2`: 表示连接正在关闭
- `3`: 表示连接已经关闭，或者打开连接失败

> 我们可以利用当前状态来做一些事情，比如上面栗子中当`WebSocket`链接成功后，才允许客户端发`送ping`

```js
if (this.ws.readyState === 1) {
    // 检查ws为链接状态 才可发送
    this.ws.send('ping'); // 客户端发送ping
}
```

#### 4.2 `WebSocket`还可以发送/接收 二进制数据

> 二进制数据包括：`blob`对象和`Arraybuffer`对象，所以我们需要分开来处理

```js
 // 接收数据
ws.onmessage = function(event){
    if(event.data instanceof ArrayBuffer){
        // 判断 ArrayBuffer 对象
    }

    if(event.data instanceof Blob){
        // 判断 Blob 对象
    }
}

// 发送 Blob 对象的例子
let file = document.querySelector('input[type="file"]').files[0];
ws.send(file);

// 发送 ArrayBuffer 对象的例子
var img = canvas_context.getImageData(0, 0, 400, 320);
var binary = new Uint8Array(img.data.length);
for (var i = 0; i < img.data.length; i++) {
    binary[i] = img.data[i];
}
ws.send(binary.buffer);
```

> 如果你要发送的二进制数据很大的话，如何判断发送完毕：

```text
webSocket.bufferedAmount属性，表示还有多少字节的二进制数据没有发送出去：

var data = new ArrayBuffer(10000000);
socket.send(data);
if (socket.bufferedAmount === 0) {
    // 发送完毕
} else {
    // 发送还没结束
}
```

### 五、WebSocket的优点

- 双向通信
- 数据格式比较轻量，性能开销小，通信高效
  - 协议控制的数据包头部较小，而`HTTP`协议每次通信都需要携带完整的头部
- 更好的二进制支持
- 没有同源限制，客户端可以与任意服务器通信
- 与 `HTTP` 协议有着良好的兼容性。默认端口也是`80`和`443`，并且握手阶段采用 `HTTP` 协议，因此握手时不容易屏蔽，能通过各种 `HTTP` 代理服务器

## socket.io



### 一、原生Node与socket.io通信

> 原生`nodejs`结合`Socket.io`实现服务器和客户端的相互通信

> 官方文档 https://socket.io

#### 1.1 搭建服务

```bash
# 新建目录
mkdir socket && cd socket

# 生成package.json
npm init -y

# 安装socket
npm install socket.io
// app.js

var http = require("http");

var server = http.createServer(function(req,res){
    if(req.url == "/"){ //显示首页
        fs.readFile("./index.html",function(err,data){ 
            res.end(data);
        }); 
    }
});

var io = require('socket.io')(server);

//监听连接事件 
io.on("connection",function(socket){
    console.log("1 个客户端连接了"); 
})

server.listen(3000,"127.0.0.1",function(){
    console.log('app run at 127.0.0.1:3000')
});

// 写完这句话之后，你就会发现，http://127.0.0.1:3000/socket.io/socket.io.js 就是一个 js 文件 的地址了
```

#### 1.2 新建页面

> 现在需要制作一个`index`页面，这个页面中，必须引用秘密`js`文件。调用`io`函数，取得`socket` 对象

```html
<!DOCTYPE html> <html lang="en"> <head>
<meta charset="UTF-8">
<title>Document</title> </head>
<body>

<h1>我是 index 页面，我引用了秘密 script 文件</h1>

<script type="text/javascript" src="/socket.io/socket.io.js"></script> <script type="text/javascript">
    var socket = io(); 
    console.log(socket)
</script>

</body> 
</html>
```

> 至此，服务器和客户端都有 `socket` 对象了。服务器的 `socket` 对象:

> ```
> socket对象
> ```

![img](https://s.poetries.top/gitee/2019/10/390.png) ![img](https://s.poetries.top/gitee/2019/10/391.png)

#### 1.3 服务器端通过emit广播，通过on接收广播

```js
// app.js

var http = require("http");

var server = http.createServer(function(req,res){
    if(req.url == "/"){ //显示首页
        fs.readFile("./index.html",function(err,data){ 
            res.end(data);
        }); 
    }
});

var io = require('socket.io')(server);

//监听连接事件 
io.on('connection',function(socket) {
    console.log('和服务器建立连接了');
    
    socket.on('to-server',function(data) {
    
        // 接收客户端传过来的数据
        console.log('客户端说:' + data);
        
        // 向客户端发送数据
        // socket 只给当前发送消息给服务端的客户端发送消息
        socket.emit('to-client','我是服务器返回的数据');
        
    }) 
    socket.on('disconnect',function() {
        console.log('断开连接了');
    })
})

server.listen(3000,"127.0.0.1",function(){
    console.log('app run at 127.0.0.1:3000')
});
```

![img](https://s.poetries.top/gitee/2019/10/392.png)

> 每一个连接上来的用户，都有一个 `socket`。由于我们的 `emit` 语句，是 `socket.emit()`发 出的，所以指的是向这个客户端发出语句。 广播，就是给所有当前连接的用户发送信息:

```js
var io = require('socket.io')(server);

io.on('connection',function(socket) {

    console.log('和服务器建立连接了')
    
    socket.on('to-server',function(data) {
    
        console.log('客户端说:' + data);
        
        // io 给所有建立连接的客户端发送数据，不管是哪个客户端发送消息，都会对所有客户端进行广播一次
        io.emit('to-client','我是服务器返回的数据');
    }) 
    socket.on('disconnect',function() {
        console.log('断开连接了');
    })
})
```

![img](https://s.poetries.top/gitee/2019/10/393.png) ![img](https://s.poetries.top/gitee/2019/10/394.png)

- `io.emit()`可以实现聊天室消息群发
- `socket.emit()`可以实现聊天机器人，一对一发送

#### 1.4 客户端端通过emit广播，通过on接收广播

```js
// index.html
<!DOCTYPE html> 
<html lang="en"> 
<head>
    <meta charset="UTF-8">
    <title>socket demo</title> 
</head>
<body>

<h1>我是 index 页面，我引用了秘密 script 文件</h1>
<button id="btn">给服务端发送数据</button>

<script type="text/javascript" src="/socket.io/socket.io.js"></script> <script type="text/javascript">

    // 连接的地址http://localhost:3000 后台提供
    var socket = io.connect('http://localhost:3000');

    // 客户端建立连接
    socket.on('connect',function() {
        console.log('客户端和服务端建立连接了');
    }) 

    socket.on('disconnect',function() {
        console.log('客户端和服务端断开连接了');
    }) 

    // 客户端给服务端发送数据后，监听服务端返回的数据
    socket.on('to-client',function(data) {
        console.log('客户端说:' + data);
    }) 

    var btn = document.getElementById('btn');

    btn.onclick = function() {
        socket.emit('to-server','我是客户端的数据');
    }
</script>

</body> 
</html>
```

### 二、聊天室、智能机器人实现原理

#### 2.1 express简单例子

> `Express` 结合 `Socket.io` 实现服务器和客户 端的相互通信、聊天室、智能机器人实现 原理

> - [express文档(opens new window)](http://www.expressjs.com.cn/starter/generator.html)
> - [socket.io文档(opens new window)](https://socket.io/docs)

**1. Server (app.js)**

```js
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);
// WARNING: app.listen(80) will NOT work here!

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
```

**2. Client (index.html)**

```html
<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io.connect('http://localhost');
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });
</script>
```

#### 2.2 express实现智能机器人

```html
<!--views/index.ejx-->
<html>
<head>
  <title></title>

    <script src="/jquery-1.11.3.min.js"></script>

    <script src="/socket.io/socket.io.js"></script>
</head>
<body>


    <input type="text" id="msg"/>

    <br/>
    <br/>

    <button id="send">发送</button>

</body>
</html>

<script>
$(function(){

    var socket = io.connect('http://127.0.0.1:8000');

    //群聊功能--聊天室
    $('#send').click(function(){
        var msg=$('#msg').val();

        socket.emit('message',msg);  /*客户端给服务器发送数据*/

    })
    //接受服务器返回的数据
    socket.on('servermessage',function(data){

        console.log(data)
    })

})
</script>
// app.js

var express=require('express');

var app=express();

/*第一步*/
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.set('view engine','ejs');
app.use(express.static('public'));

app.get('/',function(req,res){
    //res.send('首页');
    res.render('index');
})


app.get('/news',function(req,res){
    res.send('news');

})

//2.监听端口
server.listen(8000,'127.0.0.1');   /*改ip*/



//3、写socket的代码

io.on('connection', function (socket) {
  console.log('建立链接')

    socket.on('message',function(data){

        console.log(data);

        //io.emit  广播 --- 聊天室
        //socket.emit  谁给我发的信息我回返回给谁 --- 智能机器人


        //io.emit('servermessage',data);   /*服务器给客户端发送数据*/


        if(data==1){

            var msg='您当前的话费有2元'
        }else if(data==2){
            var msg='您当前的流量有200M'

        }else{
            var msg='请输入正确的信息'
        }

        socket.emit('servermessage',msg);

    })
});
```

> [完整代码(opens new window)](https://github.com/poetries/socket.io-demo/tree/master/express-socket-chat)

#### 2.3 express结合`socket.io`及数据库实现智能机器人

> 跨域也可以访问`socket.io`

```js
// app.js

var express=require('express');

var app=express();

var DB=require('./module/db.js');

/*第一步*/
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.set('view engine','ejs');
app.use(express.static('public'));

app.get('/',function(req,res){
    //res.send('首页');
    res.render('index');
})


app.get('/news',function(req,res){
    res.send('news');

})

//2.监听端口
server.listen(8000,'127.0.0.1', function () {
    console.log('app run at 127.0.0.1:8000')
});   /*改ip*/


//3、写socket的代码

io.on('connection', function (socket) {
    console.log('建立链接')

    socket.on('message',function(data){

        console.log(data)
        //socket.emit('servermessage',msg);

        var msg=data.msg||'';  /*获取客户端的数据*/

        //去服务器查询数据

        DB.find('article',{'title':{$regex:new RegExp(msg)}},{'title':1},function(err,data){

            console.log(data);


            socket.emit('servermessage',{
                result:data
            });
        })


    })
});
<!DOCTYPE>
<html>
<head>
    <title></title>
    <script
  src="https://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>

    <script src="/socket.io/socket.io.js"></script>
    <style>

        .box{
            width: 300px;
            height: 400px;
            margin: 0 auto;
            border: 1px solid #666;
            margin-top:20px;


        }
        .list{
            width: 300px;
            height: 360px;
            overflow-y: auto;
        }
        .message{
            height: 40px;
            line-height: 44px;
            display: flex;
        }
        .message input{

            border: 1px solid #666;
        }
        .message input[type='text']{
            flex: 1;
            height: 38px;
        }
        .message input[type='button']{
            width: 100px;
            height: 40px;
            border: 1px solid #666;
        }
    </style>
</head>
<body>

    <div class="box">
        <div class="list">
            <div id="list">
            </div>
            <div class="footer" id="footer">

            </div>
        </div>
        
        <div class="message">
            <input type="text" id="msg" />
            <input type="button" id="send" value="发送"/>
        </div>


    </div>

</body>
</html>

<script>


    $(function(){

        var socket = io.connect('http://127.0.0.1:8000');

        socket.on('servermessage',function(data){

            if(data.result.length)

            {
                var str='<ul>';
                for(var i=0;i<data.result.length;i++){

                    str+='<li>'+data.result[i].title+'</li>';
                }
                str+='</ul>';
            }else{

                var str='<p>没有找到您要的数据，请联系人工客服</p>'
            }
            $('#list').append(str);
            $('#footer').get(0).scrollIntoView();

        })

        var username='zhangsan'+Math.floor(Math.random()*10);

        //群聊功能--聊天室
        $('#send').click(function(){
            var msg=$('#msg').val();
            socket.emit('message',{
                'username':username,
                'msg':msg
            });
            $('#list').append(`<p><strong>${username}:</strong>  ${msg}</p>`);

            $('#msg').val();

        })
    })
</script>
```

> [完整代码(opens new window)](https://github.com/poetries/socket.io-demo/tree/master/express-socket-chat-use-db)

### 三、Koa中Socket.io的使用

**1. 服务端配置**

```bash
# 1 安装
cnpm i -S koa-socket
// app.js

// 2 引入
const IO = require( 'koa-socket' )

// 3 实例化
const io = new IO()

io.attach( app )

// 4 配置服务端

app._io.on( 'connection', socket => {

console.log('建立连接了');
})
```

**2. 客户端代码**

```html
 <script src="http://localhost:3000/socket.io/socket.io.js"></script>
 <script>
    var socket=io.connect('http://localhost:3000/')
 </script>
```

> [完整代码](https://github.com/poetries/socket.io-demo/tree/master/koa-socket.io)