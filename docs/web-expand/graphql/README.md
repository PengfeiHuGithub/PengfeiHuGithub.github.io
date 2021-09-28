# 构建GraphQL API服务

## Graphql API 介绍

## 什么是 API



> API（Application Programming Interface，应用程序编程接口）是一些预先定义的函数或者接口，目的是提供应用程序与开发人员基于某软件或硬件得以访问一组例程的能力，而又无须访问源码，或理解内部工作机制的细节。

要实现一个 API 服务器，首先要考虑两个方面：API 风格和媒体类型。常用的 API 风格是 RPC 和 REST，常用的媒体类型是 JSON、XML 和 Protobuf。

## GraphQL 简介



> GraphQL 是一种新的 API 标准，它提供了一种比 REST 更有效、更强大和更灵活的替代方案。它是由 Facebook 开发并开源的，现在由来自世界各地的公司和个人组成的大型社区维护。

API已经成为软件基础结构中无处不在的组件。简而言之，API定义了客户客户端如何从服务器加载数据。

在其核心部分，GraphQL支持声明式数据获取，客户端可以在其中准确地指定需要从API获取哪些数据。与返回固定数据结构的多个端点（multiple endpoints）不同，GraphQL服务器只公开单个端点（a single endpoint），并使用客户机请求的准确数据进行响应。

除了Facebook，许多大公司都在采用GraphQL，包括GitHub，Pinterest，Twitter，Sky，纽约时报，Shopify，Yelp等数千家公司。

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708a4e40582e66d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## GraphQL vs REST



由于REST是构建API的一种流行方法，并且比GraphQL更广泛，我们假设你已经熟悉了，让我们看看GraphQL和REST之间的差异。

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708a50acd476b49?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### REST是一个概念

REST是一个事实上的架构标准，但它实际上并没有规范和大量的非官方定义。GraphQL有一个规范草案，它是一种查询语言而不是一种体系结构，围绕着它构建了一套定义良好的工具（以及一个繁荣的生态系统）。

虽然REST建立在现有架构之上，而在最常见的场景中是HTTP，但另一方面，GraphQL正在构建自己的约定。这可能是一个优势点，因为REST通过在HTTP层上缓存而免费获益。

### 单个端点

> GraphQL只有一个端点，你可以在其中发送所有查询。如果使用REST方法，你可以创建多个端点，并使用HTTP 动词来区分读操作（GET）和写操作（POST，PUT，DELETE）。GraphQL不使用HTTP动词来确定请求类型。

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708a5208fb14994?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 根据你的需求量身定制

使用REST，你通常无法选择服务器返回给你的内容，除非服务器使用稀疏字段集实现部分响应，并且客户端使用该功能。API维护者无法强制执行此类过滤。

API通常会向你返回比你需要的信息更多的信息，除非你也控制API服务器，并为每个不同的请求定制响应。

使用GraphQL，您可以明确地请求您需要的信息，您不能从完整的响应默认值中“选择退出”，只会强制选择您想要的字段。

这有助于节省服务器上的资源，因为你可能需要较少的处理流程以及很少的带宽，因为要传输的有效负载较小。

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708a516e40def33?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

GraphQL 可以轻松监控字段的使用情况 使用REST，除非强制使用稀疏字段集，否则无法确定客户端是否使用了字段，因此在进行重构或弃用时，无法确定实际使用情况。

GraphQL可以跟踪客户端使用的字段。

### 访问嵌套数据资源

GraphQL允许生成少得多的网络调用。

我们举个例子：你需要访问一个人的朋友的名字。如果你的REST API公开了一个/person端点，该端点返回一个带有朋友列表的人物对象，你通常首先通过执行获取人员信息GET /person/1，其中包含其朋友的ID列表。

除非这个人的朋友列表已经包含朋友姓名，否则有100个朋友需要向/person端点发出101个HTTP请求，这是一个巨大的时间成本，也是一个资源密集型操作。

使用GraphQL，你只需要一个请求，该请求会询问这个人的朋友的姓名。

### 类型

REST API基于JSON，无法提供类型控制。GraphQL有一个Type System。

### 哪一个更好？

世界各地的组织正在质疑他们的API技术选择，他们正试图找出从REST迁移到GraphQL是否最适合他们的需求。

当你需要公开复杂的数据表示，以及客户端可能只需要数据的子集，或者他们定期执行嵌套查询以获取所需数据时，GraphQL非常适合。

与编程语言一样，没有单一的赢家，这完全取决于你的需求。

# TypeScript 基础知识

因为后续我们的实战中是使用Typescript来编写的，我们先来了解一波。TypeScript 是 JavaScript 的类型的超集，它可以编译成纯 JavaScript。编译出来的 JavaScript 可以运行在任何浏览器上。TypeScript 编译工具可以运行在任何服务器和任何系统上。TypeScript 是开源的。

## 为什么要拥抱 TypeScript

如今，无论你是一枚前端开发还是后端开发，要是你连 JavaScript 都不知道，那你真的是 out 了。学习 JavaScript 是一件很有必要的事情。随着 Node.js 越发的流行， JavaScript 这门语言已经随处可见。众所周知 JavaScript 的语法规则不是那么严谨，随着项目的迭代与复杂度的不断增加，管理 JavaScript 项目也越发的困难了。正是因为这，TypeScipt 走进每一名开发者的视野。它的到来不禁让我们在平时的开发上避免了一些不必要的错误，更是使项目变的更加容易维护和迭代。

## TypeScript VS JavaScript

在上面我们已经介绍了 TypeScript 是 JavaScript 的一个超集，那他们之间到底有什么区别？让我们来看这张关系图：

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708a602752189f3?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

ES5，ES6 涵盖了 ES5 并扩充了类与模块，ES7 覆盖了 ES6 并扩充了 async/awaitc 和装饰器

### JavaScript

JavaScript 是一门轻量级解释型脚本语言，可以嵌入到 HTML 页面中，在浏览器端执行，实现浏览器端丰富的交换功能，为用户带来流畅的用户体验，它是基于对象和事件驱动的，无需特定的语言环境，只需要在支持的浏览器上就可以运行。

**特点：**

- 脚本语言，无需编译
- 基于对象的语言，创建对象同时使用现有对象
- 语法简单（弱类型语言）
- 动态性（事件驱动）
- 兼容性好（能够与其他技术一起是使用）
- 仅依赖与浏览器（跨平台语言）
- JavaScript 可谓说是神一样的语言，论灵活性没有那个语言可以与之一争高下。但由于如此高的灵活性，大神和菜鸟的 code 风格与质量肯定是不可苟同。在任何 IDE 编译下都不会报错，看似很爽。但是在运行时，错误漫天飞的 JavaScript 是不是让你内心崩溃啊。

### TypeScript

TypeScript 包含了 JavaScript 的所有元素，可以载入 JavaScript 的代码运行，并扩展了 JavaScript 的语法。

**特点：**

- 静态类型、类、模块、接口和类型注解
- 代码的可读性和可维护性
- IDE 的支持
- 完全的面向对象
- 可以在编译阶段就发现大部分错误
- 重构相比 JavaScript 要简单很多

> TypeScript 在学习难度上虽然高于 JavaScript 但它带来的好处也是相应的，如果你有着 JavaScript 的开发经验，相信你可以快速上手 TypeScript 的。在 TypeScript 中你可以使用 JavaScript 的所有代码概念 。

## TypeScript 显著的优势

### 静态类型

快速定位错误和修复错误是每一位开发人员所必须要掌握的技能，而 TypeScript 的静态类型让我们在编写脚本的同时检验错误，避免不必要的 bug 。这让我们可以编写更加健壮的代码进行维护，以便使我们的代码质量更好更清晰。

### 生产力

TypeScript 继承了 ECMAScript 6的大部分语法，因此你不必重新学习它。自动完成和动态输入等因素有助于提高开发人员的工作效率

### 项目的迭代

无论是什么项目，随着客户的需求和技术的更新。不断的迭代是避免不了的，而我们有时为了改进项目，需要对代码进行小的更改。由于我们的更改，可能引发的后果可能是我们意想不到的，因此我们必须撤销这些操作。但使用 TypeScript 工具来重构就会变得便捷。

### 协作能力

JavaScript 是弱类型并且没有命名空间，导致很难模块化，使得其在大型的协作项目中不是很方便。多人协作时乱码和错误的机会也在增加，而 TypeScript 可以很好的避免这一点。同时 TypeScript 的类型安全是一种在编码期间就可以检测错误的功能，而不是在编译期间检测错误。这为团队创建了一个更高效的编码和测试条件。

## JavaScript 和 TypeScript 如何抉择 ？

在上面我为大家介绍了 TypeScript 的优势点，但并没有提及 JavaScript 有哪些优势。不是因为没有，只是因为我们今天的重点在 TypeScript。技术没有好坏，该如何选择还是看项目的需要。如果是大型项目，TypeScript 的优势是比 JavaScript 的权重要高的，反之如果是小型项目，那么灵活的 JavaScript 无疑是更好的选择。

# TypeScript的使用

## 编写第一个 TypeScript 程序

我们在这个编辑工具中输入以下代码：

```text
function greeter(person) {
    return `Hello, ${person}`;
}
```

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708a618d528a115?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 我们可以看到编辑器给了我们一段警告，这段警告翻译成中文的意思就是：对于隐式含有 any 类型的参数或者变量进行警告⚠️这是因为TypeScript 默认开启了严格模式

**规则如下**

| 规则名称                     | 解释                                   |
| ---------------------------- | -------------------------------------- |
| noImplicitAny                | 不允许变量或函数参数具有隐式 any 类型  |
| noImplicitThis               | 不允许 this 上下文隐式定义             |
| strictNullChecks             | 不允许出现 null 或 undefined 的可能性  |
| strictPropertyInitialization | 验证构造函数内部初始化前后已定义的属性 |
| strictBindCallApply          | 对 bind、call、apply 更严格的类型检测  |
| strictFunctionTypes          | 对函数参数进行严格逆变比较             |

而我们正是触犯了 noImplicitAny 这条规则，我们对上边那段代码进行如下修改：

```text
function greeter(person: string) {
    return `Hello, ${person}`;
}
```

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708a631ac56a3a1?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 可以看到这个警告已经消失了，并且看到 greeter 的返回值自动推导为 string 类型。 之所以一开始就开启严格模式，主要目的有以下几点：

- 消除 JavaScript 中的一些不合理、不严谨的之处，减少一些怪异行为
- 消除代码运行的一些不安全之处，保证代码运行的安全
- 提高编译器效率，增加运行速度

## 数据类型

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708a63f45a72780?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> TypeScript 的数据类型有很多，有一些相信大家已经熟练掌握了。我就不一一为大家介绍了，主要为大家介绍一下 以下几种：

### 元组 Tuple

元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。看下方示例

```text
// 声明一个元组类型
const info: [string, number] = ['Jack', 20]; // OK

// 如果你的数组没有满足元组要求 
const info: [string, number] = [20, 'Jack']; // Error
// Type 'number' is not assignable to type 'string'.
// 这个错误是因为不能将数字类型分配给字符串类型

const info: [string, number] = ['Jack']; // Error
// Property '1' is missing in type '[string]' but required in type '[string, number]'.
// 这个错误大概意思就是缺少一个属性，但在元组中设定是必须的
```

由此我们可以看出顺序不可以颠倒，长度不可以违规，是固定的。

### 枚举

> enum类型是对 JavaScript 标准数据类型的一个补充。 像 C# 等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。

### 数字枚举

我们先来看一下数字枚举：

```text
enum Direction {
	Top,   // 我们可以初始化，比如 Top = 1
    Bottom,
    Left,
    Right
}
```

> 我们定义了一个数字枚举。默认情况下，从0开始为元素编号，简单来说Top 的默认初始值为 0，其余的成员会从 0 开始自动增长。也就是 Top 的值为 0、Bottm 的值为 1、Left 的值为 2、Right 的值为 3 。当前你也可以手动的指定成员的数值，如上方我们的注释。

### 字符串枚举

> 字符串的枚举概念很简单，但跟数字枚举有一定的差别。在字符串枚举中，每个成员都必须使用字符串字变量，并且字符串没有自增长的行为，字符串枚举可以很好的序列化。简单来说就是字符串相比较于数字枚举的可读性更高。

```text
enum Direction {
	Top = "Top",
    Bottom = "Bottom",
    Left = "Left",
    Right = "Right"
}
```

### Any

> Any 类型可以表示任意类型的值。虽然比较任性，但是在实际开发中的作用还是非常大的，当你无法确定一个值的具体类型时，这个时候可以使用 any 在编译阶段通过类型检查。

```text
let random: any = 'Jack'; 	// OK
random = 4;					// OK
random = (() => {})			// OK
```

**特点：**

- any 类型的变量可以被赋值任何类型数据
- any 类型的数据可以赋值给除 never 外的任何数据类型变量
- 如果是 any 类型，那么可以访问它的任意属性（即便不存在）
- any类型对象任意属性值都是any类型
- any 类型数据可以当做函数或者构造函数调用，可以有任意参数
- 如果没有明确给出数据类型，并且编译器无法推断，那么将被规定为 any 类型

> 总的来说 Any 这个类型好用，但是不能滥用，并且我们在开发中更要避免 Any 类型，因为这个类型只能在运行时报错，这样就很难发现某个小角落的错误。

### Void

简单来说如果方法没有返回值，那么此方法的返回值类型就是 Void 类型

```js
function test() : void {
	console.log('Hello Void');
}
```

### Never

> never 类型表示的是那些永不存在的值的类型。使用场景主要是那些抛出异常或根本不会有返回值的函数表达式或箭头函数表达式的返回值类型。下方是官方给出的一些返回 never 的函数：

```js
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}
```

### 类型断言

> 有时候你会遇到这样的情况，你会比 TypeScript 更了解某个值的详细信息。 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 类型断言好比其它语言里的 类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。 TypeScript会假设你，程序员，已经进行了必须的检查。

### 尖括号语法

```js
function info(name : string, age : string | number) {
    if ((<string>age).length) {				//断言
        console.log((<string>age).length)	//断言
    }  else {
        console.log(age.toString)
    }
}
```

### AS 语法

```js
function info(name : string, age : string | number) {
    if ((age as string).length) {				//断言
        console.log((age as string).length)		//断言
    }  else {
        console.log(age.toString)
    }
}
```

> 两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；然而，当你在TypeScript里使用 JSX 时，只有 as语法断言是被允许的。

## 语法特性

```js
// 封装一个类 小姐姐的信息都在里面
class Beauty {
    puublic  height: number = 170
    public bust: number = 84
    public waist: number = 62
    public hip: number = 86
    public hobby: Array<string> = ['吃', '喝', '玩', '乐']
	
    // 身高
    public getHeight() : number {
        return this.height
    }
	
    // 三围
    public getMeasurement() : string {
        return `胸围(${this.bust})、腰围(${this.waist})、臀围(${this.hip})`
    }
	
    // 爱好
    public getHobby() : Array<string> {
        return this.hobby
    }
	
	// 秘密
	private secret() {}
}

export default new Beauty() 
// 接口
interface IPrivacy { 
    height: number      	// 身高
    abs: number				// 腹肌
    hobby: Array<string>	// 爱好
}

class Beauty {
   ...
   // 构造方法
    constructor(information: IPrivacy) {

    }
   ...
}
const beauty = new Beauty({
    height: 180,
    abs: 8,
    hobby: ['抽烟', '喝酒', '烫头']
})

// 于是我们开开心心的拿到了小姐姐除了隐私之外的资料
console.log(beauty.getHeight()) // 170
...
每位小姐姐都有共同的特点，于是我们创建了Goblin 这个类去继承了上方的例子：

class Goblin extends Beauty {
	hobby: Array<string> = ['逛街', '旅游']
}

const goblin = new Goblin({
    height: 180,
    abs: 8,
    hobby: ['抽烟', '喝酒', '烫头']
})

console.log(beauty.getHeight()) // 170
console.log(beauty.getHobby()) // ["逛街", "旅游"]
console.log(beauty.secret())  // Property 'secret' is private and only accessible within class 'Beauty'. 这里的意思告诉我们 secret 是私人的不允许被继承
```

### 类 Classes

> 如果您有其他面向对象语言的经验，那么 类 就是比较简单的常用类型，结合上方的例子。我给大家总结以下几点：

### 修饰符

> TypeScript 里面定义属性的时候给我们提供了 三种修饰符：

- public : 在 TypeScript 的类中，成员都默认为 public, 被此限定符修饰的成员是可以被外部访问。
- protected： 当成员被设置为 protected 之后, 被此限定符修饰的成员是只可以被类的内部以及类的子类访问。
- private ： 当成员被设置为 private 之后, 被此限定符修饰的成员是只可以被类的内部访问。

### 封装

把客观的事物封装成抽象的类，并且类可以把自己的数据和方法只让可信的类或者对象操作，对不可信的类进行信息的隐藏。简单的说就是：封装使对象的设计者与对象的使用者分开，使用者只要知道对象可以做什么就可以了，不需要知道具体是怎么实现的。封装可以有助于提高类和系统的安全性。

### 继承

继承指的是建立一个新的派生类，从先前定义的类中继承数据和函数，可以重新定义或加进新数据和函数，从而建立了类的层次或等级。

> 注意：我们无法继承私有的属性或方法

### 多态

> 多态性指的是： 同一操作作用与不同类的实例，将产生不同的执行结果，即不同类的对象收到相同的消息时，将得到不同的结果。

### 接口 Interface

> 利用接口约束了传入变量的内容，注意，在赋值时：变量的形状必须和接口的形状保持一致。

- 在面向对象的编程中，接口是一种规范的定义，它定义了行为和动作规范，在程序设计里面，接口起到了一种限制和规范的作用。
- 接口定义了某一批类所需要遵守的规范，接口不关心这些类的内部状态数据，也不关心这些类里面方法的实现细节，它只规定这批类里面必须提供某些方法，提供这些方法的类就可以满足实际需要



# 后端技术选型

## Egg.js 简介

> Eggjs 是一个基于 Koajs 的框架，所以它应当属于框架之上的框架，它继承了 Koajs 的高性能优点，同时又加入了一些约束与开发规范，来规避Koajs框架本身的开发自由度太高的问题。

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708a67ca8205f84?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

作为大厂出品，加上现在 nodejs 的发展，学习 egg 还是很有必要的

## 为什么选择 Egg.js

### Egg.js 的理念

> Egg 的插件机制有很高的可扩展性，一个插件只做一件事（比如 Nunjucks 模板封装成了 egg-view-nunjucks、MySQL 数据库封装成了 egg-mysql）。Egg 通过框架聚合这些插件，并根据自己的业务场景定制配置，这样应用的开发成本就变得很低。

> Egg 奉行『约定优于配置』，按照一套统一的约定进行应用开发，团队内部采用这种方式可以减少开发人员的学习成本，开发人员不再是『钉子』，可以流动起来。没有约定的团队，沟通成本是非常高的，比如有人会按目录分栈而其他人按目录分功能，开发者认知不一致很容易犯错。但约定不等于扩展性差，相反 Egg 有很高的扩展性，可以按照团队的约定定制框架。使用 Loader 可以让框架根据不同环境定义默认配置，还可以覆盖 Egg 的默认约定

**Egg.js 的特性**

- 提供基于 Egg 定制上层框架的能力
- 高度可扩展的插件机制
- 内置多进程管理
- 基于 `Koa` 开发，性能优异
- 框架稳定，测试覆盖率高
- 渐进式开发

## 现有的Nodejs框架与Eggjs对比

### Expresss VS Egg.js

> Express和Koa两个框架是同一班人发布的，首先Koa肯定先天就有express不能替代的优势，那也代表着以Koa为基础的 egg 本身比express也是有优势的。在Express这个框架在使用的时候，由于框架的自由度很高，每个开发者都化身为哈姆雷特。比如实现某一个功能的时候，第一个使用者喜欢把 controller 和 service 区分开，另一个使用者却就喜欢写在一起，这样的结果就是同是 express 的项目，换一个人来维护时，成本变得很高，因为你不知道前面开发者的骚操作到底能骚到什么地步。而egg为了企业中使用相同的规范去开发，本身奉行“约定大于配置”的原则，就如上面这个例子，它本身就约定了这个功能该有怎样的规范去实现，从而使得它能在企业框架域中站住脚，发挥 Koajs 的价值。

### Sails VS Egg.js

> Sails框架也是一个nodejs为基础的企业级框架。sails的思想是ruby语言的框架rails借鉴来的，它是以express为基础的一个MVC框架，本身也是奉行“约定大于配置”的原则来面向开发者，但是它本身并不属于精巧的那种，框架自身内置了一些常用的功能，例如它的 blueprints，自动生成restApi路由的功能，但是其实我们在正式开发的时候因为这个功能的不能满足我们的要求，实际是不开启这个功能的。它本身还集成了前端模块进去，但是我们只将其作为后端服务来用，也从来没有使用过这些功能。而 egg 则非常的小巧，所有的模块功能均以插件的模式由开发者选择是否需要被安装使用，完全可以按照自己的需求去觉得框架那些需要安装，做的定制开发。

## 小结

> 从以上各项可以看出 egg 无论从设计理念、特性，或者和其他一些框架的对比都丝毫不落下风，甚至要比 现有的很多 nodejs 框架要优秀，下一节我们将走进 egg 的世界。



# 开发环境配置

## 环境准备

- 操作系统：支持 macOS，Linux，Windows
- 运行环境：建议选择 LTS 版本，最低要求 8.x。

## 初始化

### 使用脚手架生成 Egg 项目

推荐直接使用脚手架，只需几条简单指令，即可快速生成项目（npm >=6.1.0）:

```text
$ mkdir egg-example && cd egg-example
$ npm init egg --type=simple
$ npm i
```

> 上面这种方式是 egg.js 官方推荐的创建简易项目， 而我们本小册使用 Typescript 开发， 所以我们换种方式：

**TypeScript 初始化方式**

```text
$ npm init egg --type=ts
$ npm i
```

## 目录结构

```text
egg-example

    |-- .autod.conf.js
    |-- .gitignore
    |-- .travis.yml
    |-- README.md
    |-- appveyor.yml
    |-- package-lock.json
    |-- package.json
    |-- tsconfig.json			# 指定了用来编译这个项目的根文件和编译选项
    |-- tslint.json				# 代码检查
    |-- app
    |   |-- router.ts			# 用于配置 URL 路由规则
    |   |-- controller			# 用于解析用户的输入，处理后返回相应的结果
    |   |   |-- home.ts
    |   |-- public				# 用于放置静态资源
    |   |-- service				# 用于编写业务逻辑层
    |       |-- Test.ts
    |-- config					# 用于编写配置文件
    |   |-- config.default.ts
    |   |-- config.local.ts
    |   |-- config.prod.ts
    |   |-- plugin.ts			# 用于配置需要加载的插件
    |-- test					# 用于单元测试
    |   |-- app
    |       |-- controller
    |       |   |-- home.test.ts
    |       |-- service
    |           |-- Test.test.ts
    |-- typings					# 目录用于放置 d.ts 文件
        |-- index.d.ts
```

> gg API 项目中，一般都会包括这些功能项：路由文件、控制器目录、逻辑层目录。这些都在上述的代码结构中有列出，这是典型的 MVC 架构。新加功能时将代码放入对应功能的目录/文件中，可以使整个项目代码结构更加清晰，非常有利于后期的查找和维护。

### MVC

> MVC 全名是Model View Controller，是模型(model)－视图(view)－控制器(controller)的缩写，一种软件设计典范，用一种业务逻辑、数据、界面显示分离的方法组织代码，将业务逻辑聚集到一个部件里面，在改进和个性化定制界面及用户交互的同时，不需要重新编写业务逻辑。MVC被独特的发展起来用于映射传统的输入、处理和输出功能在一个逻辑的图形化用户界面的结构中。

### 安装插件

> 插件机制是Egg框架的一大特色，形成了egg 的繁荣的生态圈，接下来我们就来安装我们本次项目的第一个插件。

由于我们后续的实战是基于 TypeScript 的，所以在这里我选择了一个支持 TypeScript 的包 `@switchdog/egg-graphql` 。

```text
$ npm i --save @switchdog/egg-graphql
```

### 开启插件

> 在 config/plugin.ts 下告诉 egg 开启哪些插件：

```text
graphql: {
    enable: true,
    package: '@switchdog/egg-graphql',
},
```

### 配置插件

> 通常插件都会有一些配置项，在/config/config.default.ts中配置即可：

```text
config.graphql = {
    router: '/graphql',
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
    // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
    graphiql: true,
    apolloServerOptions: {
      tracing: true, // 设置为true时，以Apollo跟踪格式收集和公开跟踪数据
      debug: true, // 一个布尔值，如果发生执行错误，它将打印其他调试日志记录
    },
  };
```

在中间件中开启 graphql

```text
config.middleware = [ 'graphql' ];
```

> 配置完成之后，每个落到 /graphql的请求都会触发 GraphQL Schema 的查询。

### GraphQL 代码结构

> graphql 目录下，有 4 种代码，分别是：common 全局类型定义、query 查询代码、**mutation 更新操作代码 **和 resolver业务实现代码。

```text
.
├── graphql                       | graphql 代码
│   ├── common                    | 通用类型定义
│   │   ├── resolver.js           | 合并所有全局类型定义
│   │   ├── scalars               | 自定义类型定义
│   │   │   └── date.js           | 日期类型实现
│   │   └── schema.graphql        | schema 定义
│   ├── mutation                  | 所有的更新
│   │   └── schema.graphql        | schema 定义
│   ├── query                     | 所有的查询
│   │   └── schema.graphql        | schema 定义
│   └── user                      | 用户业务
│       ├── connector.js          | 连接数据服务
│       ├── resolver.js           | 类型实现
│       └── schema.graphql        | schema 定义
```

> tips: 在这只是为大家展示，请不要在开始就创建user目录，后边教程用到时再创建，不然会报错。

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708a6a1d7538698?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## CORS 跨域访问

> CORS，常被大家称之为跨域问题，准确的叫法是跨域资源共享**（CORS，Cross-origin resource sharing）**，是W3C标准，是一种机制，它使用额外的HTTP头来告诉浏览器 让运行在一个 origin (domain) 上的Web应用被准许访问来自不同源服务器上的指定的资源。当一个资源从与该资源本身所在的服务器不同的域或端口请求一个资源时，资源会发起一个跨域 HTTP 请求。

> 我们先来安装 egg-cors

```text
# npm i egg-cors --save
```

> 开启 /config/plugin.ts：

```text
cors: {
    enable: true,
    package: 'egg-cors',
},
```

> 配置 /config/config.default.ts：

```text
config.cors = {
    origin: '*', 
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
};
```

### CSRF

> CSRF（Cross-site request forgery）跨站请求伪造，也被称为 One Click Attack 或者 Session Riding，通常缩写为 CSRF 或者 XSRF，是一种对网站的恶意利用。

> 使用 graphql 或 rest 端点时，实际上不必担心使用 CSRF 保护。对服务的请求应该是无状态的，并且不真正依赖Cookie或会话数据。

关闭 `/config/config.default.ts：`

```text
config.security = {
    csrf: {
      ignore: () => true,
    },
};
```

## 小结

> 本节介绍了项目的初始化，egg.js 项目的目录结构以及 graphql 的目录结构。知道了egg.js 框架是 MVC 的形式，并了解了什么是 MVC。以及在如何在 egg.js 框架中安装和使用第三方包。



# 启动一个最简单的GraphQL API 服务器

## 一个简单的 GraphQL API

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708a6b185f8948f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

**schema.graphql**

> graphql 自带一组默认标量类型，包括 Int，Float，String，Boolean，ID。在定义字段时需要注明类型，这也是 graphql 的特点之一，是支持强类型的。如果非空，就在类型后面跟上一个!号。graphql 还包括枚举类型，列表和自定义类型。

```text
type Hello {
  id: ID!
  name: String!
}
```

**connector**

> 编写完 schema 之后，graphql 知道有哪些数据了，但他还需要知道 “如何去取”， connector 的角色就在于此。 connector 的职责就是 “取数”， 他既可以调用 rpc 接口取数，又可以调用内置的 orm 插件去取数，还可以直接调用 egg 的 service。

```text
export default class HelloConnector {
  hellos() {
    return [
      {
        id: 1,
        name: 'Jack',
      },
      {
        id: 2,
        name: 'Lucy',
      },
    ];
  }
}
```

**resolver**

> resolve.js是数据类型的具体实现，依赖connector.js完成。其实 resolver 非常简单，就是针对你暴露的查询接口，调用相应的connector去取数即可，如下：

```text
export default {
  Query: {
    hellos(_root: any, {}, { connector }) {
      return connector.hello.hellos();
    },
  },
};
```

**定义 Query**

> 新建一个 query 目录创建 schema.graphql 文件，大家也可以直接在各个模块下的 schema.graphql 文件中定义，纯属个人习惯

```text
type Query {
  hellos: [Hello!]
}
```

> [Hello!] 可以理解为 [{id: 1, name: 'jack'}, {id: 2, name: 'praise'}] Hello! 可以理解为 {id: 1, name: 'jack'}

**项目启动**

> egg本地开发环境启动方式非常简单：

```text
$ npm run dev
```

> 我们在浏览器中输入 http://127.0.0.1:7001/graphql 是类似下面这种界面说明已经 graphql 服务已经跑起来了。这是 graphql 自带的开发者工具页面，这个开发者工具可以满足我们绝大部分的调试工作，很是方便。

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708a6acc0ce8108?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

完成一次查询

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708a6b66d2d0f5b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 结果的顺序也是按照你输入的顺序排序的，定制化的数据，完全根据你查什么返回什么结果。这就是 GraphQL 被称作 API 查询语言的原因。

如果你对返回的名称不满意，还可以设置别名：

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708a6bab15763a0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

**请求流程**

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708a75466a5aa41?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 通过上方的例子我们可以看出客户端发送请求会被 graphql 解析，根据映射关系找到对应的 resolver。路由将数据传递到对应的 resolver，resolver 去调用对应的 connector 进行处理，connector 再调用 service 进行数据库处理。

# 实战介绍和准备工作

## 安装插件

**egg-sequelize**

> sequelize 是一个广泛使用的 ORM 框架，它支持 MySQL、SQLite 和 MSSQL 、PostgreSQL等多个数据源

```text
$ npm install egg-sequelize --save
```

> 在 config/plugin.js 中引入 egg-sequelize 插件

```text
sequelize: {
  enable: true,
  package: 'egg-sequelize',
};
```

> 在 config/config.default.js 中编写 sequelize 配置

```text
exports.sequelize = {
  dialect: 'mysql',  // support: mysql, mariadb, postgres, mssql
  host: '127.0.0.1',
  port: 3306,
  database: 'egg-sequelize-doc-unittest', // /数据库名
};
```

**mysql2**

> 在 Web 应用方面 MySQL 是最常见，最好的关系型数据库之一。非常多网站都选择 MySQL 作为网站数据库。

```text
$ npm install mysql2 --save
```

**sequelize-cli**

> sequelize 提供了 sequelize-cli 工具来实现 Migrations，我们也可以在 egg 项目中引入 sequelize-cli。

```text
$ npm install --save-dev sequelize-cli
```

> 在 egg 项目中，我们希望将所有数据库 Migrations 相关的内容都放在 database 目录下，所以我们在项目根目录下新建一个 .sequelizerc 配置文件：

```text
const path = require('path');

module.exports = {
  config: path.join(__dirname, 'database/config.json'),
  'migrations-path': path.join(__dirname, 'database/migrations'),
  'seeders-path': path.join(__dirname, 'database/seeders'),
  'models-path': path.join(__dirname, 'app/model'),
};
```

> 初始化 Migrations 配置文件和目录

```text
$ npx sequelize init:config
$ npx sequelize init:migrations
```

> 执行完后会生成 database/config.json 文件和 database/migrations 目录，我们修改一下 database/config.json 中的内容，将其改成我们项目中使用的数据库配置：

```text
{
  "development": {
    "username": "root",  // 账号
    "password": null,    // 密码
    "database": "egg-sequelize-doc-default", // 数据库名
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "egg-sequelize-doc-unittest",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

**sequelize-auto**

> 利用 sequelize-auto 对照数据库自动生成相应的models，使用sequelize-auto对照数据库自动生成相应的models减少了对数据库进行增删改查时的sql语句的编写

```text
$ npm install --save-dev egg-sequelize-auto
```

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708a7673a52cd16?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> egg-sequelize-auto -o ./app/model -h localhost -p 3306 -d [数据库] -u [用户名] -x [密码|'']

## 初始化数据库

利用我们定义的快捷命令我们可以很方便的创建我们所需要文件：

```text
$ npm run db:init
```

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708a77a1768c430?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

然后把文件内容更改成以下内容：

```text
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING  } = Sequelize
    await queryInterface.createTable('users', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
        comment: '唯一索引',
      },
      phone: {
        type: STRING(11),
        unique: true,
        allowNull: true,
        comment: '手机号',
      },
      password: {
        type: STRING,
        allowNull: true,
        comment: '密码',
      },
      name: {
        type: STRING(50),
        allowNull: false,
        comment: '昵称',
      },
      avatar: {
        type: STRING,
        allowNull: true,
        comment: '头像',
      }
    })
  },

  down: async queryInterface => {
      await queryInterface.dropTable('users');
  }
};
```

## 数据库变更

> 执行下方命令之后，我们的数据库初始化就完成了

```text
$ npm run db:up
// 升级数据库 `npm run db:up`
"db:up": "npx sequelize db:migrate && npm run db:model"
// 需要回滚，可以通过 `npm run db:down` 回退一个变更
"db:down": "npx sequelize db:migrate:undo"
// 可以通过 `npm run db:down-all` 回退到初始状态
"db:down-all": "npx sequelize db:migrate:undo:all"
```

> 并且会在model目录下帮我们创建 users 这个 model，如下：

```text
/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('users', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      primaryKey: true,
      autoIncrement: true
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: true,
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'users'
  });

  Model.associate = function() {
  
  }

  return Model;
};
```

> 这个 Model 就可以在 Controller 和 Service 中通过 app.model.Users 或者 ctx.model.Users 访问到了



# 用户注册登陆

给大家画了个简易的注册登录流程图，我们就按照这个流程图来进行我们下面的操作

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708aa69fca9f43e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 短信发送 API

> 在给客户开发一个信息发送功能的时候，需要涉及到短信的发送，短信发送一般不同的厂商提供的接口不同，处理方式也不太一样，之前用的一个厂商的，提供了一个封装类就很容易发送短息，因此都是基于HTTP协议做的一个数据发送而已，接触阿里云的短信服务器后，发现阿里云还增加了非常多的参数，其中包括一些秘钥和签名的内容。短信发送由于比较敏感原因，大多数应用场景是验证码或者一些固定的信息提醒，因此厂商都要求客户按预定的模板来发送，这样限制了短信的应用场景，只能根据业务进行消息定制了。本篇随笔主要介绍阿里云的短信服务的发送处理。

### 创建阿里云账号

> 为了访问短信服务，您需要有一个阿里云账号。如果没有，可首先按照如下步骤创建阿里云账号：

### 访问阿里云 官方网站，单击页面上的 免费注册 按钮。

> 按照屏幕提示完成注册流程并进行实名认证，短信服务只支持实名认证用户使用。为了更好地使用阿里云服务，建议尽快完成实名认证，否则部分阿里云服务将无法使用。具体实名认证流程，[请参考 这里 (opens new window)](https://help.aliyun.com/knowledge_detail/37171.html)。

### 获取阿里云访问密钥

> 为了使用短信发送API-node.js-SDK，您必须申请阿里云的访问密钥

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708aa8b96c51507?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

阿里云访问秘钥是阿里云为用户使用 API（非控制台）来访问其云资源设计的“安全口令”。您可以用它来签名 API 请求内容以通过服务端的安全验证。

该访问秘钥成对（AccessKeyId 与 AccessKeySecret）生成和使用。每个阿里云用户可以创建多对访问秘钥，且可随时启用（Active）、禁用（Inactive）或者删除已经生成的访问秘钥对。

您可以通过阿里云控制台的 [秘钥管理页面 (opens new window)](https://ak-console.aliyun.com/#/accesskey)创建、管理所有的访问秘钥对，且保证它处于“启用”状态。由于访问秘钥是阿里云对 API 请求进行安全验证的关键因子，请妥善保管你的访问秘钥。如果某些秘钥对出现泄漏风险，建议及时删除该秘钥对并生成新的替代秘钥对。

> 在控制台完成模板与签名的申请，获得调用接口必备的参数

**短信签名**

根据用户属性来创建符合自身属性的签名信息。企业用户需要上传相关企业资质证明，个人用户需要上传证明个人身份的证明。

短信签名需要审核通过后才可以使用。

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708aa93a4e42ccc?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

**短信模板**

短信模板，即具体发送的短信内容。

短信模板可以支持验证码、短信通知、推广短信、国际/港澳台消息四种模式。验证码和短信通知，通过变量替换实现个性短信定制。推广短信不支持在模板中添加变量。国际/港澳台消息只能使用国际/港澳台短信模版发送短信。

短信模板需要审核通过后才可以使用。

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708aa9852acd0d2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

**为了成功发送一条短信通知，您至少需要完成以下步骤**

- 在控制台完成短信签名与短信模板的申请，获得调用接口必备的参数
- 在“短信签名”页面完成签名的申请，获得短信签名的字符串 [签名申请手册(opens new window)](https://help.aliyun.com/document_detail/55327.html?spm=5176.doc55288.2.1.X0mqQo)
- 在“短信模板”页面完成模板的申请，获得模板ID。[模板申请手册(opens new window)](https://help.aliyun.com/document_detail/55330.html?spm=5176.doc55288.2.2.n0lubD)

**入参列表**

| 参数名称      | 类型   | 是否必填 | 样例取值                        | 参数说明                                                     |
| ------------- | ------ | -------- | ------------------------------- | ------------------------------------------------------------ |
| PhoneNumbers  | String | Y        | 15000000000                     | 短信接收号码。支持以逗号分隔的形式进行批量调用，批量上限为1000个手机号码,批量调用相对于单条调用及时性稍有延迟,验证码类型的短信推荐使用单条调用的方式，发送国际/港澳台消息时，接收号码格式为：国际区号+号码，如“85200000000” |
| SignName      | String | Y        | 云通信                          | 短信签名                                                     |
| TemplateCode  | String | Y        | SMS_0000                        | 短信模板ID，发送国际/港澳台消息时，请使用国际/港澳台短信模版 |
| TemplateParam | String | N        | {“code”:”1234”,”product”:”ytx”} | 短信模板变量替换JSON串,友情提示:如果JSON中需要带换行符,请参照标准的JSON协议要求。 |
| OutId         | String | N        | abcdefgh 外部流水扩展字段       |                                                              |

**出参列表**

| 出参名称  | 出参类型 | 样例取值       | 参数说明                                           |
| --------- | -------- | -------------- | -------------------------------------------------- |
| RequestId | String   | 8906582E-6722  | 请求ID                                             |
| Code      | String   | OK             | 状态码-返回OK代表请求成功,其他错误码详见错误码列表 |
| Message   | String   | 请求成功       | 状态码的描述                                       |
| BizId     | String   | 134523^4351232 | 发送回执ID,可根据该ID查询具体的发送状态            |

## 安装插件

这是阿里官方提供的一个 阿里云开发者工具套件（SDK）。让我们不用复杂编程即可访问云服务器、云数据库RDS、云监控等多个阿里云服务。

```text
$ npm install @alicloud/pop-core --save
```

## 配置参数

接下来将这些参数放到[配置 (opens new window)](https://github.com/push-over/egg-example/blob/master/config/config.default.ts)文件中：

```text
config.aliyun = {
    accessKeyId: 'xxxxxxxxxxxxxxxx',   // 秘钥
    accessKeySecret: 'xxxxxxxxxxxx',   // 秘钥
    endpoint: 'https://dysmsapi.aliyuncs.com',
    apiVersion: '2017-05-25',
    sendSms: {
      RegionId: 'cn-hangzhou',
      SignName: 'xxxx',   // 短信签名
      TemplateCode: 'xxxxxx', // 短信模板ID
    },
};
```

## 注册

> 有了上面的信息介绍，我们大概了解了短信消息发送的处理规则了。接下来我们就来基于腾讯的 SDK 来发送短信，并完成注册。

- [短信发送方法(opens new window)](https://github.com/push-over/egg-example/blob/70dc0ac730c452f2344568a75cf5ce1f6394811d/app/service/Utils.ts)

> 阿里的 SDK 发送短信为我们提供了一个demo，我们来简单的改造一下这个方法来供我们使用：

```text
public sendSms(PhoneNumbers: string) {
    const { ctx, app } = this;
    const { accessKeyId, accessKeySecret, endpoint, apiVersion, sendSms } = app.config.aliyun;
    const { RegionId, SignName, TemplateCode } = sendSms;

    const client = new Core({
      accessKeyId,
      accessKeySecret,
      endpoint,
      apiVersion,
    });
    
    // 生成验证码
    const sendCode = ctx.helper.smsCode();

    const params = {
      RegionId,
      PhoneNumbers,
      SignName,
      TemplateCode,
      TemplateParam: JSON.stringify({ code: sendCode }),
    };
	
    // 请求方式 POST
    const requestOption = {
      method: 'POST',
    };
}
```

> 在上方实例化了 SDK 这个对象， 使用 client 这个实例调用 [SendSms (opens new window)](https://help.aliyun.com/document_detail/101414.html?spm=a2c4g.11186623.6.624.3a9756e0v8n0uz)方法传递参数以完成短信发送：

```text
 return new Promise(async (resolve, _reject) => {
  // 调用方法完成短信发送
  await client.request('SendSms', params, requestOption).then(async (result: any) => {
    // 把生成的验证码存到redis中
    await ctx.service.redis.set(PhoneNumbers, sendCode, 60);
    return resolve(result);
  }).catch((ex: any) => {
    resolve(ex.data);
  });
});
```

- [注册方法(opens new window)](https://github.com/push-over/egg-example/blob/c72d08141fbd2fd52ebfbf0b5141c07e6aa86f8a/app/service/User.ts)

**操作数据库**

> 我们把关于数据库的操作全部放到 service 里来进行

```text
async register(data: IRegisterData) {
    const { ctx } = this;
    const { code, name, phone, password } = data;
    // 根据号码在redis中取出验证码
    const r_code = await ctx.service.redis.get(phone);
    // 判断存取的验证码和用户输入的是否一致
    if (Number(code) === Number(r_code)) {
      // 把用户信息写入数据库
      return await this.database.create({ name, phone, password });
    }
}

// TypeScript 中的接口，之前已为大家做过介绍哦
interface IRegisterData {
  code: string;  // 验证码
  name: string;	 // 名称
  phone: string;	// 手机号
  password: string;	// 密码
}
```

**定义类型**

> 可以将 GraphQL 的类型系统分为标量类型（Scalar Types，标量类型）和其他高级数据类型，标量类型即可以表示最细粒度数据结构的数据类型，可以和 JavaScript 的原始类型对应。GraphQL 规范目前规定支持的标量类型有：

- Int ：整数，对应 JavaScript 的 Number
- Float ：浮点数，对应 JavaScript 的 Number
- String ：字符串，对应 JavaScript 的 String
- Boolean ：布尔值，对应 JavaScript 的 Boolean
- ID ：ID 值，是一个序列化后值唯一的字符串，可以视作对应 ES 2015 新增的 Symbol
- 还有一些高级类型，具体大家可以去查询相关文档。我们来定义在我们这个注册登录功能的所需要的一些类型。

> 类型`GraphQL schema` 定义。我们根据用户表结构、短信出参列表以及注册所需参数来定义 schema。

```text
# 用户
type User {     // User: 一般是根据数据库表结构
  # 唯一索引
  id: ID
  # 手机号
  phone: String
  # 昵称
  name: String
  # 头像
  avatar: String
}

# 短信
type SendSms {	// SendSms: 可以参照阿里云短信的返回参数
 # 状态码的描述
 Message: String
 # 请求ID
 RequestId: String
 # 发送回执ID
 BizId: String
 # 状态码
 Code: String
}

# 注册
input Register {  // Register: 注册所需要的数据
  # 昵称
  name: String!
  # 手机号
  phone: String!
  # 密码
  password: String!
  # 验证码
  code: Int!
}
```

> 目前为止，我们只讨论过将例如枚举和字符串等标量值作为参数传递给字段，但是你也能很容易地传递复杂对象。这在变更（mutation）中特别有用，因为有时候你需要传递一整个对象作为新建对象。输入对象看上去和常规对象一模一样，除了关键字是 input 。

**处理逻辑**

> 编写完 schema 之后，graphql 知道有哪些数据了，这个时候我们就要用到 connector 调用 egg 的 service。

```text
// 短信发送
public async sendSms(PhoneNumbers: string) {
    const { ctx } = this;
    return await ctx.service.utils.sendSms(PhoneNumbers);
}

// 注册
public async register(data: IRegisterData) {
    const { ctx } = this;
    return await ctx.service.user.register(data);
}
```

**进行处理**

> 大家还记得在启动一个最简单的 graphql api 服务器一篇时为大家画的一个简易流程图吗，resolver 调用对应的 connector 进行处理。

```text
export default {
  Mutation: {
    // 短信发送
    async sendSms(_root: any, { PhoneNumbers }, { connector }) {
      return await connector.utils.sendSms(PhoneNumbers);
    },
    
    // 注册
    async register(_root: any, { data }, { connector }) {
      return await connector.user.register(data);
    },
  },
};
```

**查询和变更类型（Types Mutation And Query）**

> GraphQL 的一个查询请求被称为一份 query 文档（query document），即 GraphQL 服务能够解析验证并执行的一串请求字符串。query 由操作（Operation）和片段（Fragments）组成。一个 query 可以包含多个操作和片段。只有包含操作的 query 才会被 GraphQL 服务执行。但是不包含操作，只有片段的 query 也会被 GraphQL 服务解析验证，这样一份片段就可以在多个 query 文档内使用。

只包含一个操作的 query 可以不带操作名称或者使用简写形式（即 query 关键字加操作名）。query 包含多个操作时，所有操作都必须带上名称。

**GraphQL 规范支持两种操作：**

- Query ：仅获取数据（fetch）的只读请求
- Mutation ：获取数据后还有写操作的请求

> 简单来讲， Query 就是获取数据的基本查询；Mutation 支持对数据的增、删、改等操作。

注册肯定是要写入数据库的，发送短信也不仅仅是只读的请求，所以在这里我选择了 Mutation。

```text
type Mutation {
  sendSms(PhoneNumbers: String!) : SendSms
  register(data: Register!): User
}
```

**完成注册**

> 我们把 GraphQL 服务运行起来

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708aaa31feb8e74?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

然后这时候手机上就来了条短信

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708aaa8ac94e29f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

紧接着我们去完成注册

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708aaac156d9f1a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

至此我们的注册就算是告一段落了，接下来我们来看登录。

## 登录

按照我们的注册流程，我们再来利用登陆这个功能熟悉一下 graphql 的工作流程。

### 操作数据库

> 我们先在 [service (opens new window)](https://github.com/push-over/egg-example/blob/c72d08141fbd2fd52ebfbf0b5141c07e6aa86f8a/app/service/User.ts)里操作数据库，接收两个参数，登录成功后我们会生成一个 uuid 返回给前端来当做 token使用。

```text
  public async fetchByNamePassword(phone: string, password: string) {
    const { ctx } = this;
    // 生成一个唯一标识
    const uuid = ctx.helper.uuidv1();
   	// 查询当前用户是否存在
    const user = await this.database.findOne({
      where: {
        phone,
        password,
      },
    });

    if (!user) return null;
    const result = JSON.stringify(user);
    // 存到redis中
    await ctx.service.redis.set(uuid, result, 3600 * 24);
    return uuid;
  }
```

### 定义类型

> 我们定义一个输入类型，你可以理解为这是前端传递的数据。

```text
input Authentication {
  # 手机号
  phone: String!
  # 密码
  password: String!
}
```

### 处理逻辑

> connector 调用 egg 的 service。

```text
async fetchByNamePassword(phone: string, password: string) {
    const { ctx } = this;
    return await ctx.service.user.fetchByNamePassword(phone, password);
}
```

### 进行处理

> resolver 调用对应的 connector 进行处理。

```text
export default {
  Query: {
    async login(_root: any, { data }, { connector }) {
      const { phone, password } = data;
      return await connector.user.fetchByNamePassword(phone, password);
    },
  },
};
```

### 查询类型（Query Types）

> Query 对应 读

```text
type Query {
  login(data: Authentication): String!
}
```

完成登录

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708aab158638588?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



# 第三方注册登陆

> 现在很多网站、APP都支持第三方登录。第三方登录不得不说的一个优势：那就是本地注册和第三方注册的选择。虽然这是一个不能称之为问题的问题，做为一个新用户，你有两个选择：1、做一个很受欢迎的用户，注册帐号，完善信息，over。2、选用第三方登录/注册，简单方便。二者供你选择，随心挑选。而我们作为一名技术人员，第三方注册登录就选择了 github。

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ab40531a04e0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## OAuth 2.0

说到第三方登录，不得不提的一个知识点就是 oauth 2.0。

> OAuth（开放授权）是一个开放标准，允许用户让第三方应用访问该用户在某一网站上存储的私密的资源（如照片，视频，联系人列表），而无需将用户名和密码提供给第三方应用。

**这个协议在认证和授权的时候涉及到：**

- 服务提供方，例如 GitHub，GitHub上储存了用户的登录名，Email，昵称，头像等信息 用户
- 客户端，例如我的博客就是一个客户端，需要服务方向我提供用户的一些基本信息

**OAuth 协议的认证和授权的过程如下：**

- 用户打开我的网站后，我想要通过GitHub获取该用户的基本信息
- 在转跳到GitHub的授权页面后，用户同意我获取他的基本信息
- 后端获得GitHub提供的授权码，使用该授权码向GitHub申请一个令牌
- GitHub对后端提供的授权码进行验证，验证无误后，发放一个令牌给后端
- 后端使用令牌，向GitHub获取用户信息
- GitHub 确认令牌无误，返回给后端基本的用户信息

## 使用GitHub 提供的 OAuth 服务

1. 登陆 GitHub 官网并注册账号登陆后

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ab35d06999e3?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ab3a8a422962?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

1. 创建一个应用并填写信息

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ab30289d3810?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ab2afa326d90?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

1. 获得 Client ID 和 Chient Secret

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ab25961e267b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 配置 GitHub 参数

接下来将这些参数放到[配置文件 (opens new window)](https://github.com/push-over/egg-example/blob/master/config/config.default.ts)中：

```text
config.github = {
    // 固定的
    login_url: 'https://github.com/login/oauth/authorize',
    // github Client ID
    client_id: 'xxxxxxxxxxxxxx',
    // github Client Secret
    client_secret: 'xxxxxxxxxxxxx',
    // 此参数表示只获取用户信息
    scope: [ 'user' ],
  };
```

> 这样我们不仅可以方便的通过 `this.ctx.app.config.github` 拿到所需的数据，还有利于多环境的区分，不同环境使用不同的配置。

## 第三方登陆URL

> 获取 GitHub 授权的 url 并不需要操作我们的数据库，所以在这个流程中，并没有什么逻辑。

### 授权 URL

> 在这个[方法 (opens new window)](https://github.com/push-over/egg-example/blob/70dc0ac730c452f2344568a75cf5ce1f6394811d/app/graphql/utils/connector.ts)中我们只需要拼接我们之前定义好的参数即可。

### 返回结果

> 这就是一个简单的[查询 (opens new window)](https://github.com/push-over/egg-example/blob/70dc0ac730c452f2344568a75cf5ce1f6394811d/app/graphql/utils/resolver.ts)，我们直接返回结构即可。

```text
export default {
  Query: {
    async githubURL(_root: any, {}, { connector }) {
      return await connector.utils.githubURL();
    },
  },
};
```

### 定义查询

- [查询(opens new window)](https://github.com/push-over/egg-example/blob/70dc0ac730c452f2344568a75cf5ce1f6394811d/app/graphql/query/schema.graphql)

在这里我们指定返回的必须是个 string 类型，string！ 必须返回

```text
type Query {
  githubURL: String!
}
```

看一下我们的运行结果：

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ab1b32d34623?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 登陆授权

> 由于我们这是一个 API 项目，并不具备前端页面。不过这可难不倒我们，让我们打开浏览器的 console 工具栏，执行一次跳转。

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ab079c1ebbce?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 我们看到弹出一个页面，并让我们进行授权。那大家心里可能犯迷糊了，授权后跳转到哪里呢？又是怎么知道授权成功或者失败的？不知道大家还记得我们在创建一个应用填写的回调地址吗？

## 创建路由

> Router 主要用来描述请求 URL 和具体承担执行动作的 Controller 的对应关系， 框架约定了 app/router.js 文件用于统一所有路由规则。

### 如何定义 Router

> https://github.com/push-over/egg-example/blob/70dc0ac730c452f2344568a75cf5ce1f6394811d/app/router.ts

> app/router.ts 里面定义 URL 路由规则

```text
import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  // 回调地址
  router.get('/github/callback', controller.user.githubLogin);
};
```

### 实现 Controller

> https://github.com/push-over/egg-example/blob/70dc0ac730c452f2344568a75cf5ce1f6394811d/app/controller/user.ts

```
app/controller` 目录下面 实现 `Controller
import { Controller } from 'egg';

export default class UserController extends Controller {
  async githubLogin() {
    const { ctx } = this;
    ctx.body = {
      name: 'github 登陆',
    };
  }
}
```

> 这样就完成了一个最简单的 Router 定义，当用户执行 GET /github/callback，user.ts 这个里面的 githubLogin方法就会执行。

### 实现回调方法

接下来我们来实现这个方法

**验证 code**

> 当回调到我们的项目时，会带给我们一个授权码，我们拿到这个授权码 ，使用该授权码向GitHub申请一个令牌

```text
const { ctx, app } = this;
const { client_id, client_secret } = app.config.github;

const code = ctx.query.code;
const tokenResult = await ctx.curl('https://github.com/login/oauth/access_token', {
  method: 'POST',
  contentType: 'json',
  data: {
    client_id,
    client_secret,
    code,
  },
  dataType: 'json',
  timeout: 8000,
});

// 如果有错误信息或者状态码不等于200 那我们就不让他继续走下去了
if (tokenResult.data.error || tokenResult.status !== 200) {
  return await this.ctx.render('transit.html', { uuid: tokenResult.data.error });
}
```

**获取用户信息**

当我们获得令牌后，就可以拿着这个令牌去或许用户的信息了。

```text
const { access_token } = tokenResult.data;
const userResult = await ctx.curl(`https://api.github.com/user?access_token=${access_token}`, {
    dataType: 'json',
    timeout: 8000,
});

// 如果有错误信息或者状态码不等于200 那我们就不让他继续走下去了
if (userResult.data.error || userResult.status !== 200) {
	return await this.ctx.render('transit.html', { uuid: userResult.data.error });
}
```

**返回 token**

> 获取到用户信息后，会有一个第三方的唯一标识，我们需要拿到这个标识后判断当前用户有没有注册过我们的应用，如果有的话直接返回 token，没有的话我们需要先把用户信息插入到数据库之后再返回 token 给前端。

```js
const { login, node_id } = userResult.data;
// login: 名称   node_id: 第三方唯一标识
if (!login || !node_id) {
	return await this.ctx.render('transit.html', { uuid: '权限验证失败, 请重试' });
} else {
	const uuid = ctx.helper.uuidv1();
    // 查询数据库有没有这个用户信息
	const oauth = await ctx.service.oauth.findById(node_id);
    // 如果不存在要先添加到数据库
	if (!oauth) {
  		userResult.data.oauth_type = 'GtiHub';
      	const user = await ctx.service.user.githubRegister(userResult.data);
      	const userInfo = JSON.stringify(user);
      	await ctx.service.redis.set(uuid, userInfo, 3600 * 24);
	} else await ctx.service.redis.set(uuid, oauth, 3600 * 24);
    // 返回token
	await this.ctx.render('transit.html', { uuid });
}
```

> 不知道大家有没有注意 await this.ctx.render('transit.html', { uuid }); 这段代码。 在讲这段代码之前，大家先思考一下我们怎么把登陆消息传递给前端呢？

[transit.html (opens new window)](https://github.com/push-over/egg-example/blob/70dc0ac730/app/view/transit.html)是我在第三方登录的中一个 loading 页面，在这个页面中向前端传递信息，具体是怎么操作的，让我们来看代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  登陆中...
  <script>
    window.onload = function () {
      // 这里的 link 就等于是你前端应用接收信息的页面
      const link = "https://www.baidu.com/";
      window.opener.postMessage("<%= uuid %>", link);
      window.close();
    }
  </script>
</body>
</html>
```

### 窗口间通信 postMessage

> window.open方法会返回一个窗口对象，使用这个对象可以向子窗口发送消息，而子窗口可以通过window.opener向父窗口发送消息

由于`postMessage`是通过网络协议，所以不能以直接在浏览器打开html的方式进行调试。而是应该放在服务器上，走网络协议。

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708aafe76a92c24?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 小结

> 在这一小节中我们学习了如何创建 oauth 应用，并通过回调方法完成注册登录，以及在两个不同端口不同域名的页面之间怎么传递信息。



# 对象存储

> 对象存储服务，简称 OSS，是一种面向海量数据规模的分布式存储服务，具有稳定、可靠、安全、低成本的特点，能够提供十一个九的数据可靠性。OSS提供与平台无关的 RESTful API 接口，您可以在互联网任何位置存储和访问。OSS的容量和处理能力弹性扩展，并提供多种存储类型供您选择，全面优化存储成本。简单理解就是存储图片、音频、视频等非结构化数据的数据池。

在这里我选择了七牛云对象存储，大家在可能在疑惑为什么，或者它的优点是什么？ 免费算是优点吗？使用七牛云的免费存储空间足够我们的练习使用了。

## 优点

### 成本低，资源弹性伸缩，按需付费

> 现在阿里云对象存储（简称 OSS）40G 容量一年的价格大概是 9 块钱。七牛云对象存储（简称 cos）更是有免费的 10G 容量。已经可以满足大部分个人站点的使用需求。不像服务器的流量是固定的，包含在服务器的费用里面了。无论你用或不用，都是这么多。对象存储可以是根据你的实际使用量进行计费。

### 大幅提升网页性能

> 一般情况下，我们都是建议使用主机服务器和对象存储分工合作的方式来存储网站数据。主机服务器主要负责存储网站的动态数据，对象存储则用来存储网站的静态文件。从而实现网站的动静分离，当用户访问一个网站时，分别从主机服务器和对象存储的服务器同步读取数据，可以大幅的提升网页性能。

### 管理方便

> 那个服务商都有单独的管理控制台。你不必打开网站，就可以像使用百度云盘一样使用对象存储来管理你的网站文件，除了上传、下载、预览等常用功能，还可以直接在对象存储上进行图片处理/媒体转码/数据分析等。

### 新建存储空间

> ```
> 注册七牛云账号 > 管理控制台 > 对象存储 > 新建储存空间
> ```

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708abb3e365f9f6?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 拿到 AccessKey 和 SecretKey

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708abb8bf36df22?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 安装插件

> 七牛云官方提供并一直在维护的 SDK ，这个 SDK 以方便快捷的方式将数据安全的存储到七牛云上，无论是网站、云端还是终端等应用都可以让用户高速上传和下载。七牛云存储 Node.js SDK 使用指南

```text
$ npm install qiniu --save
```

## 配置参数

> https://github.com/push-over/egg-example/blob/70dc0ac730/config/config.default.ts

接下来将这些参数放到配置文件中：

```text
config.qiniu = {
    AccessKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    SecretKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    Bucket: 'xxxxxxx',  // 存储空间的名字
    Domain: 'xxxxxxx',  // 融合 CDN 测试域名
};
```

## 保存图片

> https://github.com/push-over/egg-example/blob/70dc0ac730c452f2344568a75cf5ce1f6394811d/app/service/Utils.ts

> 由于这个项目是一个 API 服务，没有前端页面，在这里我选择使用后端去上传图片以便给大家做演示。至于后端返回配置前端上传还是后端来做上传看大家实际需求了。

在这个方法中我们把图片以日期保存到了本地，并返回了图片所在的本地路径。

```text
private async storeUpload(stream: any, suffix: string) {
    const { ctx, uploadDir } = this;
    const { dayjs, uuidv1 } = ctx.helper;
    const id = uuidv1();
    // 当前日期
    const dirName = dayjs(Date.now()).format('YYYYMMDD');
    const filename = `${id}.${suffix}`;
    // 创建文件夹
    if (!fs.existsSync(join(uploadDir , dirName))) fs.mkdirSync(join(uploadDir , dirName));
    const path = join(uploadDir, dirName, filename);
	// 保存图片
    return new Promise<{ id: string, path: string }>((resolve, reject) =>
      stream.pipe(fs.createWriteStream(path))
        .on('finish', () => resolve({ id, path }))
        .on('error', reject),
    );
  }
```

## 上传图片至七牛云

> API流程：获取`七牛云 Token > 携带Token上传图片`

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ac21715e323d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 获取token

> https://github.com/push-over/egg-example/blob/70dc0ac730c452f2344568a75cf5ce1f6394811d/app/service/Utils.ts

我们拿之前获取到的配置实例化七牛云的对象并获取到 token。

```js
 private getToken() {
    const { app } = this;
    // config 中的配置
    const { AccessKey: accessKey, SecretKey: secretKey, Bucket } = app.config.qiniu;
    const putPolicy = new qiniu.rs.PutPolicy({ scope: Bucket });
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const uploadToken = putPolicy.uploadToken(mac);

    return uploadToken;
  }
```

### 上传图片

> https://github.com/push-over/egg-example/blob/70dc0ac730c452f2344568a75cf5ce1f6394811d/app/service/Utils.ts

这一步我们将正式把图上上传至七牛云，携带从上一步获取到的 token 和 本地图片路径把本地图片上传至七牛云并返回图片名称。

```text
// localFile 本地路径
// suffix ['.jpg', '.jepg', '.png']
private uploader(localFile: string, suffix: string) {
    const { ctx, app } = this;
    const { Domain } = app.config.qiniu;
    const config: any = new qiniu.conf.Config();
    //   Zone_z0: qiniu.zone.Zone_z0, 	// 华东
    //   Zone_z1: qiniu.zone.Zone_z1, 	// 华北
    //   Zone_z2: qiniu.zone.Zone_z2, 	// 华南
    //   Zone_na0: qiniu.zone.Zone_na0, // 北美
    config.zone = qiniu.zone.Zone_z0;
    const formUploader = new qiniu.form_up.FormUploader(config);
    // 获取 token
    const token = this.getToken();
    const putExtra = new qiniu.form_up.PutExtra();
    // 图片名称
    const key = ctx.helper.uuidv1() + '.' + suffix;
    // 上传图片
    return new Promise(resolve => {
      formUploader.putFile(token, key, localFile, putExtra, (respErr: any, respBody: any, respInfo: any) => {
        if (respErr) {
          throw respErr;
        }
        if (respInfo.statusCode === 200) {
          const { hash, key } = respBody;
          const result = {
            hash,
            key: `${Domain}/${key}`,
          };
          resolve(result);
        }
      });
    });
  }
```

### 合并方法

> https://github.com/push-over/egg-example/blob/70dc0ac730c452f2344568a75cf5ce1f6394811d/app/service/Utils.ts

> `上传图片到本地 > 拿到路径 > 上传图片`至七牛云 我们根据这个流程把我们需要的方法合并一下做一个入口。实际上就是在之前就做了代码的拆分，不然放在一个方法中显得太臃肿。我们按照顺序组合一下。

```text
 public async processUpload(file: any) {
    const { _ } = this.ctx.helper;
    const { stream, mimetype, encoding } = file;
    const suffix = _.split(mimetype, '/', 2)[1];
    // 获取本地路径
    const { path } = await this.storeUpload(stream, suffix);
    // 上传至七牛云
    const result: any = await this.uploader(path, suffix);
    const { key } = result;
    // 返回图片信息以及路径
    return {
      filename: key,
      mimetype,
      encoding,
    };
  }
```

## 实践操作

> 我们开始正式编写 Graphql 服务，因为 Graphql 开发者工具是不支持上传文件的。所以在这里我也会新起一个 Vue 的项目基于 [Vue Apollo (opens new window)](https://vue-apollo.netlify.com/zh-cn/)来为大家演示上传图片。

### 定义类型

> https://github.com/push-over/egg-example/blob/c72d08141f/app/graphql/utils/schema.graphql

```text
type File {
  filename: String!
  mimetype: String!
  encoding: String!
}
```

## 执行逻辑

> https://github.com/push-over/egg-example/blob/c72d08141f/app/graphql/utils/connector.ts

在 connector 调用 service 中的上传图片方法。

```text
  public async singleUpload(file: any) {
    const { ctx } = this;
    return await ctx.service.utils.processUpload(file);
  }
```

## 数据操作

> https://github.com/push-over/egg-example/blob/70dc0ac730/app/graphql/user/resolver.ts

```text
export default {
  Mutation: {
    async singleUpload(_root: any, { file }, { connector }) {
      return await connector.utils.singleUpload(await file);
    },
  },
};
```

> 上传文件这种操作是一个动作，在这里我使用了 Mutation。要解决文件上传详细信息以进行处理和存储需要依赖于这个 graphql-upload 插件。

```text
$ npm i graphql-upload --save
```

> 大家有没有注意 Upload 这个类型，其实就是我们 graphql-upload 这个插件中的标量类型。

```text
type Mutation {
  singleUpload(file: Upload!) : File!
}
```

### 演示

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ac29bb2c91b3?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

我们看一下七牛云上存不存在我们刚刚上传的这张图片：

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ac2dfe7f4aad?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 小结

> 在这一节中我们学习了对象存储的优点与好处，并通过代码实例完成了一次把图片上传至七牛云对象存储。其实七牛云还有很多好玩的，如果图片裁切、加水印等等，有兴趣的可以研究研究。



# 第三方支付通道

## 支付

> 对于大多数网站或者 APP 都是有着支付功能的。这一节我们将在项目中集成支付宝支付，为什么会选择支付宝呢。支付宝有一个沙箱环境，可以让我们不需要拥有真实的商家账号就可以进行支付的开发测试。本篇将带大家学习一下怎么集成支付宝并支付。

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ac606fea6636?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 沙箱环境

首先访问 [蚂蚁金服 (opens new window)](https://auth.alipay.com/login/ant_sso_index.htm?goto=https%3A%2F%2Fopenhome.alipay.com%2Fplatform%2FappDaily.htm%3Ftab%3Dinfo)，然后用你的支付宝账号登录之后会看到如下界面：

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ac6542f0d080?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

点击 设置应用公钥

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ac6a2fc259a2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

点击 查看秘钥 生成方法

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ac6dc24d78df?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

点击查看密钥生成方法之后会跳转到一篇文档，里面可以下载 RSA2 密钥生成工具，请根据自己的系统下载对应的版本并打开：

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ac71d92ce23e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 如上图，密钥格式 选择 PKCS1，密钥长度 选择 RSA2，然后点击 生成密钥 按钮。生成完毕之后点击 开发助手 右侧的 复制公钥 按钮，将其内容粘贴到刚刚网页上的框中点击保存。

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ac754341a149?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

将支付宝公钥复制下来。

## 安装插件

> 蚂蚁金服开放平台 SDK [使用文档 (opens new window)](https://www.yuque.com/chenqiu/alipay-node-sdk/guide)，建议大家必须要看一下。它会将必要的参数与加密信息处理好，我们只需要传入业务参数就可以了。

```text
$ npm install alipay-sdk --save
```

## 配置参数

> https://github.com/push-over/egg-example/blob/master/config

> 在这里我们需要用到支付宝开放平台开发助手生成的支付宝 应用私钥 和 支付宝公钥， 是支付宝公钥，大家不要弄混了哈。这两段配置实在是太长了，把它直接放到我们的配置文件中肯定是不合适的，我们新建一个 keys 目录，并创建两个文件。

```text
└── config
    └── keys // 密钥存放文件夹
        ├── alipay_public_key.pem // 支付宝公钥
        └── app_priv_key.pem   // 应用私钥
```

接下来我们来使用这两个文件：

```js
config.alipay = {
    appId: 'xxxxxx',   // 支付宝分配给开发者的应用ID
    privateKey: read('./keys/app_priv_key.pem'),
    alipayPublicKey : read('./keys/alipay_public_key.pem'),
    gateway: 'https://openapi.alipaydev.com/gateway.do',  // 环境
    return_url: 'http://127.0.0.1:7001/alipay/alipayReturn', // 一般是指客户端的一个页面
    notify_url: 'http://requestbin.net/r/13ip1wr1',  // 回调地址
  };
```

read 是一个读取文件的方法。

```js
const read = (filename: string) => {
  return fs.readFileSync(path.resolve(__dirname, filename), 'ascii');
};
```

## 编写逻辑

> https://github.com/push-over/egg-example/blob/master/app/service/Alipay.ts

那么接下来就上一个完整的示例进行整体的演示，如何请求 alipay.trade.page.pay (PC 端的支付接口)。

### 实例化操作

我们先来创建一个用来支付的类，并在构造函数中进行初始化操作：

```text
import { Service, Context } from 'egg';
import AlipaySdk from 'alipay-sdk';   // 引入 SDK

/**
 * Alipay Service
 */
export default class Alipays extends Service {
  private alipaySdk: any;
  constructor(ctx: Context) {
    super(ctx);
    // 获取配置参数
    const { appId, privateKey, alipayPublicKey, gateway } = ctx.app.config.alipay;
    // 实例化 AlipaySdk
    this.alipaySdk = new AlipaySdk({
      privateKey,
      alipayPublicKey,
      appId,
      gateway,
    });
  }
}
```

### 请求接口

> 因为这个接口属于页面类接口，页面类接口默认返回的数据为 html 代码片段。这类接口我们需要创建一个 FormData 去请求。而这个 SDK 提供了一个 AlipayFormData 可以方便我们的创建：

```text
import AlipayFormData from 'alipay-sdk/lib/form';  // 引入AlipayFormData
...

public async doPay(data: IApipayData) {
   	const { ctx, alipaySdk } = this;
    const { return_url, notify_url } = ctx.app.config.alipay;

    const data1 = {
      product_code: 'FAST_INSTANT_TRADE_PAY', // 销售产品码 注：目前仅支持FAST_INSTANT_TRADE_PAY
      out_trade_no: new Date().valueOf(), // 商户订单号 实际情况中，订单号按照具体需求生成
    };

    try {
      const formData = new AlipayFormData();
      formData.setMethod('get');     // 请求方式
      formData.addField('notify_url', notify_url);  // 支付完成后，支付宝主动向我们的服务器发送回调的地址
      formData.addField('return_url', return_url);  // 支付完成后，当前页面跳转的地址
      formData.addField('biz_content', { ...data, ...data1 });   // 请求参数的集合，最大长度不限，除公共参数外所有请求参数都必须放在这个参数中传递
      return await alipaySdk.exec('alipay.trade.page.pay', {}, {
        formData,
        validateSign: true,
      });
    } catch (error) {
      throw error;
    }
}
```

> 请求成功后，会给我们一个用于跳转支付链接的 URL，前端拿到支付链接后去做跳转。在这里要特别注意，支付宝在用户付款完成后，会向我们的服务器发送一条 POST 方式 的异步回调。

### 支付回调

- 支付宝的支付回调分为 前端回调 和 服务器回调。
  - 前端回调 是指当用户支付成功之后支付宝会让用户浏览器跳转回项目页面并带上支付成功的参数，也就是说前端回调依赖于用户浏览器，如果用户在跳转之前关闭浏览器，将无法收到前端回调。
  - 服务器回调 是指支付成功之后支付宝的服务器会用订单相关数据作为参数请求项目的接口，不依赖用户浏览器。

因此我们判断支付是否成功要以服务器端回调为准。

由于这个异步通知是在支付完成之后，是支付宝以 POST 的方式请求我们的接口，这里我们要先定义一个[路由 (opens new window)](https://github.com/push-over/egg-example/blob/master/app/router.ts)：

```text
// 支付成功异步通知
router.post('/alipay/alipayNotify', controller.alipay.alipayNotify);
```

> 接下来我们来编写控制器中的这个方法，由于我们的逻辑都是放到 service 层去处理的，在这里我们就做了一个转发的操作：

```text
public async alipayNotify() {
    const { ctx } = this;
    const params = ctx.request.body;
    await ctx.service.alipay.alipayNotify(params);
}
```

> 在通知里有一个 trade_status 参数，如果等于 TRADE_SUCCESS 就表示支付成功。然后你就可以继续进行你的后续操作，在这里我是使用了 redis 的消息队列，纯属是为了演示， lpush 命令将一个或多个值插入到列表头部。

```text
public async alipayNotify(params: any) {
  const { ctx } = this;

  if (params.trade_status === 'TRADE_SUCCESS') {
    // 后续操作
    await ctx.service.redis.lpush('payInfo', params);
  }
}
```

> 这个回调地址必须是外网可以访问到的，也就是说这一过程我们必须在线上开发。接下来我给大家介绍一个工具以便完成我们在本地开发接收异步回调

## RequestBin

> 是一个免费开源的网站，任何人都可以在上面申请一个专属的 URL（通常有效期 48 小时），对这个 URL 的任何类型的请求都会被记录下来，URL 的创建者可以看到请求的具体信息，包含请求时间、请求头、请求具体数据等。

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ac7d7241ac45?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 系统就会给你分配一个 URL，把这个 URL 复制下来，放到我们之前放服务器端回调地址的参数上：

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ac81b8a38e34?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 编写服务

> 在完成上述内容后，接下来我们来编写支付的服务。其实大家在掌握之前几篇文章的内容后，我相信编写一个服务对你来说还是轻而易举的事情。

## 定义类型

> https://github.com/push-over/egg-example/blob/master/app/graphql/alipay/schema.graphql

实际情况还是看需求和支付接口的参数来定。其中订单描述不是必须的，订单标题和订单金额是必填的。

```text
input Pay {
  # 订单描述
  body: String
  # 订单标题
  subject: String!
  # 订单总金额
  total_amount: String!
}
```

## 执行逻辑

> https://github.com/push-over/egg-example/blob/master/app/graphql/alipay/connector.ts

调用我们之前编写好的逻辑，这就返回的就是支付的跳转链接：

```text
...
export default class AlipayConnector {
  ...
  // 这里传递的参数必须要符合我们定义的接口类型
  public async pay(data: IApipayData) {
    const { ctx } = this;
    return await ctx.service.alipay.doPay(data);   // 调用服务
  }
}
```

## 数据操作

> https://github.com/push-over/egg-example/blob/master/app/graphql/alipay/resolver.ts

> 基于前面的定义的支付 Schema ，我们可以写出如下的数据操作：

```text
export default {
  Mutation: {
    pay(_root: any, { data }, { connector }) {
      return connector.alipay.pay(data);
    },
  },
};

type Mutation {
  pay(data: Pay) : String!  // 这里我们只返回一个 URL
}
```

## 走一遍流程

> 打开我们的开发者工具，输入以下查询：

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ac86ba834ba4?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

把这个链接复制下来，在浏览器中打开：

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ac8bc3aa505d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 选择登陆账户付款，会让你输入账号密码进行支付。这个时候我们打开沙箱环境，左侧有一个沙箱账号。找到买家信息，我们使用这个账号登陆测试，还可以很方便的充值，享受一波消费的快感。

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ac90b80a967e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 在支付成功后，会看到这个页面，大概 3s 左右会跳到你定义的的通知页面：

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ac95b8807a79?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 接下来打开我之前给大家推荐的 RequestBin 网站，刷新一下会看到：

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ac9a32e826ef?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 把 RAW BOOY 完整的复制下来，放到 -d'' 中，然后在终端使用 curl 来请求我们的服务器端回调 URL：

```text
curl -XPOST http://127.0.0.1:7001/alipay/alipayNotify -d'RAW BOOY'
```

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ac9de5b09e19?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

可以看到我本地获取到了通知。我为什么会有这个呢。这是因为我在项目启动时就开启了 redis 的消息队列，也是为了给方便给大家做演示。

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708aca27c55205e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

怎么在启动时添加我们的一些操作呢，接下来我们来学习一个知识点。

## 启动自定义

我们常常需要在应用启动期间进行一些 [初始化 (opens new window)](https://eggjs.org/zh-cn/basics/app-start.html)工作，等初始化完成后应用才可以启动成功，并开始对外提供服务。

框架提供了统一的入口文件（`app.ts`）进行启动过程自定义，这个文件返回一个 Boot 类，我们可以通过定义 Boot 类中的生命周期方法来执行启动应用过程中的初始化工作。

> 框架提供了这些 [生命周期函数 (opens new window)](https://eggjs.org/zh-cn/advanced/loader.html#life-cycles)供开发人员处理：

- 配置文件即将加载，这是最后动态修改配置的时机（configWillLoad）
- 配置文件加载完成（configDidLoad）
- 文件加载完成（didLoad）
- 插件启动完毕（willReady）
- worker 准备就绪（didReady）
- 应用启动完成（serverDidReady）
- 应用即将关闭（beforeClose）

> 我们可以在 app.ts 中定义这个 Boot 类，然后我们在 didReady中启用我们的消息队列：

```text
import { Application } from 'egg';

export default class AppBootHook {
  app: Application;
  constructor(app: Application) {
    this.app = app;
  }
 
  // 应用已经启动完毕
  async didReady() {
    const ctx = await this.app.createAnonymousContext();
    await ctx.service.alipay.paymentRedisPubSub();  // 启动消息队列
  }
}
```

> 我们来看一下这个方法，Redis 这个类，因为比较简单，就没有给大家做演示，大家如果有兴趣可以拉取我的源码下来进行查看。

```text
public async paymentRedisPubSub() {
    const { ctx } = this;
    let num = 0;
    // tslint:disable-next-line: no-constant-condition
    while (true) {
      const result = await ctx.service.redis.brpop('payInfo');
      num++;
      // 处理各种事宜
      console.log(num, '==============', result);
    }
}
```

> 到这，我们的接入支付宝进行支付就结束了，本篇文章主要讲的是 pc 页面进行支付。大家可以尝试接入其他接口测试。

## 小结

> 本篇文章主要给大家讲解了怎么接入支付宝并进行支付以及怎么在本地接收异步通知。微信也是一样的，只不过那个需要商家账号，无缘给大家做演示。相信大家只要掌握了怎么对接支付宝，微信或者别的对你来说也不是难事。



# 即时通讯

> 如今几乎所有的软件产品中都加入了社交的功能。即时通信是非常重要而又常用的一个技术点。H5之前大家一般用Flash之类的技术，完成通信，至今很多网站的客服系统还是用这个做的。 但H5出来之后你懂的，让通信一下子变得很简单。

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708acd8657180ca?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> WebSocket是HTML5最新提出的规范，虽然主流浏览器都已经支持，但仍然可能有不兼容的情况，为了兼容所有浏览器，给程序员提供一致的编程体验，SocketIO将 WebSocket、AJAX和其它的通信方式全部封装成了统一的通信接口，也就是说，我们在使用SocketIO时，不用担心兼容问题，底层会自动选用最佳的通信方式。因此说，WebSocket是SocketIO的一个子集。今天我们就用 socket.io来实现一下简单的聊天应用。

## Socket.IO

> Socket.IO 是一个基于 Node.js 的实时应用程序框架，在即时通讯、通知与消息推送，实时分析等场景中有较为广泛的应用。

WebSocket 的产生源于 Web 开发中日益增长的实时通信需求，对比基于 http 的轮询方式，它大大节省了网络带宽，同时也降低了服务器的性能消耗； [socket.io (opens new window)](https://socket.io/)支持 websocket、polling 两种数据传输方式以兼容浏览器不支持 WebSocket 场景下的通信需求。

框架提供了 [egg-socket.io (opens new window)](https://github.com/eggjs/egg-socket.io)插件，增加了以下开发规约：

- namespace: 通过配置的方式定义 namespace（命名空间）
- middleware: 对每一次 socket 连接的建立/断开、每一次消息/数据传递进行预处理
- controller: 响应 socket.io 的 event 事件
- router: 统一了 socket.io 的 event 与 框架路由的处理配置方式

## 安装 egg-socket.io

安装

```text
$ npm i egg-socket.io --save
```

开启插件：

```text
config/plugin.js：
io: {
   enable: true,
   package: 'egg-socket.io',
}
```

配置

```text
config/config.default.ts：
config.io = {
    init: { }, // 传递给engine.io
    namespace: {
      '/': {
        connectionMiddleware: [],
        packetMiddleware: [],
      },
      '/example': {
        connectionMiddleware: [],
        packetMiddleware: [],
      },
    },
  };
```

> 命名空间为 `/` 与 `/example`, 不是 `example`

> [egg-socket.io (opens new window)](https://github.com/eggjs/egg-socket.io)内置了 socket.io-redis，在 cluster 模式下，使用 redis 可以较为简单的实现 clients/rooms 等信息共享：

```text
 config.io = {
   ...
    redis: {
      host: '127.0.0.1',
      port: 6379,
      auth_pass: '',
      db: 0,
    },
  };
```

> 开启 redis 后，程序在启动时会尝试连接到 redis 服务器 此处 redis 仅用于存储连接实例信息，参见 [#server.adapter(opens new window)](https://socket.io/docs/server-api/#server-adapter-value)

> 注意： 如果项目中同时使用了 egg-redis， 请单独配置，不可共用。

### 部署

> 框架是以 Cluster 方式启动的，而 socket.io 协议实现需要 sticky 特性支持，否则在多进程模式下无法正常工作。

由于 socket.io 的设计，在多进程中服务器必须在 sticky 模式下工作，故需要给 startCluster 传递 sticky 参数。

修改 package.json 中 npm scripts 脚本：

```text
{
  "scripts": {
    "dev": "egg-bin dev --sticky",
    "start": "egg-scripts start --sticky"
  }
}
```

### Nginx 配置

```text
location / {
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection "upgrade";
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header Host $host;
  proxy_pass   http://127.0.0.1:7001;

  # http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_bind
  # proxy_bind       $remote_addr transparent;
}
```

## 使用 egg-socket.io

开启 egg-socket.io 的项目目录结构如下：

```text
xxxx
├── app
│   ├── extend
│   │   └── helper.js
│   ├── io
│   │   ├── controller
│   │   │   └── default.js
│   │   └── middleware
│   │       ├── connection.js
│   │       └── packet.js
│   └── router.js
├── config
└── package.json
```

> 注意：对应的文件都在 `app/io` 目录下

### Middleware

- 中间件有如下两种场景：
  - Connection
  - Packet

> 其配置于各个命名空间下，根据上述两种场景分别发生作用。

注意：如果我们启用了框架中间件，则会发现项目中有以下目录：

- `app/middleware`：框架中间件
- `app/io/middleware`：插件中间件

**区别：**

- 框架中间件基于 http 模型设计，处理 http 请求。
- 插件中间件基于 socket 模型设计，处理 socket.io 请求。
- 虽然框架通过插件尽量统一了它们的风格，但务必注意，它们的使用场景是不一样的。

**Connection**

> 在每一个客户端连接或者退出时发生作用，故而我们通常在这一步进行授权认证，对认证失败的客户端做出相应的处理：

```text
// app/io/middleware/connection.ts
import { Context, Application } from 'egg';

export default function ConnectionMiddleware(_options: any, _app: Application) {
  return async (ctx: Context, next: any) => {
   ctx.socket.emit('res', 'connected!');
    await next();
    // 断开连接时执行。
    console.log('disconnection!');
  };
}
```

踢出用户示例：

```text
const tick = (id, msg) => {
  logger.debug('#tick', id, msg);
  socket.emit(id, msg);
  app.io.of('/').adapter.remoteDisconnect(id, true, err => {
    logger.error(err);
  });
};
```

同时，针对当前的连接也可以简单处理：

```text
// app/io/middleware/connection.ts
import { Context, Application } from 'egg';

export default function ConnectionMiddleware(_options: any, _app: Application) {
  return async (ctx: Context, next: any) => {
    if (true) {
      ctx.socket.disconnect();
      return;
    }
    await next();
    console.log('断开!');
  };
}
```

**Packet**

> 作用于每一个数据包（每一条消息）；在生产环境中，通常用于对消息做预处理，又或者是对加密消息的解密等操作：

```text
// app/io/middleware/packet.ts
import { Context, Application } from 'egg';

export default function ConnectionMiddleware(_options: any, _app: Application) {
  return async (ctx: Context, next: any) => {
    ctx.socket.emit('res', '收到数据包!');
    console.log('packet:', this.packet);
    await next();
  };
}
```

**Controller**

> Controller 对客户端发送的 event 进行处理；由于其继承于 egg.Contoller, 拥有如下成员对象:

- ctx
- app
- service
- config
- logger

> 详情参考 Controller 文档 https://eggjs.org/zh-cn/basics/controller.html

```text
// app/io/controller/default.ts

import { Controller } from 'egg';

export default class NspController extends Controller {
  async ping() {
    const { ctx, app } = this;
    const message = ctx.args[0];
    await ctx.socket.emit('res', `Hi! I've got your message: ${message}`);
  }
}
```

### Router

> https://github.com/push-over/egg-example/blob/master/app/router.ts

> 路由负责将 socket 连接的不同 events 分发到对应的 controller，框架统一了其使用方式

```text
import { Application } from 'egg';

export default (app: Application) => {
  const { router, controller, io } = app;

  router.get('/', controller.home.index);
  
  // tslint:disable-next-line: no-string-literal
  io.of('/').route('server', io.controller.['home'].server);
};
```

注意：

**nsp 有如下的系统事件:**

- `disconnecting` 断开连接。
- `disconnect` 连接已断开。
- `error` 发生了错误。

**Namespace/Room**

**Namespace (nsp)**

> namespace 通常意味分配到不同的接入点或者路径，如果客户端没有指定 nsp，则默认分配到 "/" 这个默认的命名空间。

在 socket.io 中我们通过 of 来划分命名空间；鉴于 nsp 通常是预定义且相对固定的存在，框架将其进行了封装，采用配置的方式来划分不同的命名空间。

```text
const nsp = io.of('/my-namespace');
nsp.on('connection', function(socket){
  console.log('someone connected');
});
nsp.emit('hi', 'everyone!');

// egg
config.io = {
    init: { },
    namespace: {
      '/': {
        connectionMiddleware: [ 'auth' ],
        packetMiddleware: [],
      },
    },
};
```

**Room**

> room 存在于 nsp 中，通过 join/leave 方法来加入或者离开; 框架中使用方法相同；

```text
const room = 'default_room';

import { Context, Application } from 'egg';

export default function AuthMiddleware(_options: any, _app: Application) {
  return async (ctx: Context, next: any) => {
    ctx.socket.join(room);
    ctx.app.io.of('/').to(room).emit('online', { msg: 'welcome', id: ctx.socket.id });
    await next();
    console.log('断开');
  };
}
```

> 注意： 每一个 socket 连接都会拥有一个随机且不可预测的唯一 id Socket#id，并且会自动加入到以这个 id 命名的 room 中。

## 实例

> 这里我们使用 egg-socket.io 来做一个支持聊天的小例子。

### 客户端 client

UI 相关的内容我就不带大家一步步写了，大家可以拉取源码进行实践，在这我们通过 window.socket调用即可。

具体的样子如下图：

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708acecf41f1aef?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 既然我们基于 socket.io 那我们的客户端也需要使用scoket.io 才能完成和服务器端的通信。首先我们引入 socket.io 和 vue 的 CDN。

```text
<!DOCTYPE html>
<html lang="en">
...

<body>
  <div id="app">
 	...
  </div>
  <script src="https://cdn.bootcss.com/vue/2.6.10/vue.js"></script>
  <script src="https://cdn.bootcss.com/socket.io/2.3.0/socket.io.js"></script>
</body>
</html>
```

我们先来了解一个知识点：

- socket.emit 表示发送了一个 action 命令
- socket.on 表示接收一个 action 命令

接下来我们来完成我们客户端的代码：

```text
<script>
  const app = new Vue({
    el: '#app',
    data: {
      user: null,	// 用户
      userList: [],	// 用户列表
      messageList: [], // 消息列表
      search: '',	   // search user
      target: '群聊',	  // 目标
      text: '',		// 文本消息
      tipsList: [],	// 消息提示
    },
     mounted() {
      const _this = this
      // 请注意我们在调用 io() 时没有指定任何 URL，因为它默认将尝试连接到提供当前页面的主机。
      const socket = io('/', {
        // 实际使用中可以在这里传递参数
        query: {
          room: 'demo'
        },
        transports: ['websocket']
      });
      socket.on('connect', () => {
        const id = socket.id;
        log('#connect,', id, socket);
        // 监听自身 id 以实现通讯
        socket.on(id, msg => {
          log('#receive,', msg);
        });
      });
      // 接收在线用户信息
      socket.on('online', msg => {
        log('#online,', msg);
      });
      // 系统事件
      socket.on('disconnect', msg => {
        console.log('服务器异常，已与服务器失去联系！', msg)
      });
      socket.on('disconnecting', () => {
        console.log('断开连接！', msg)
      });
      socket.on('error', () => {
        console.log('未知错误！')
      });
      window.socket = socket;
    }
  })
</script>
```

接下来我们来完善发送消息：

```text
<script>
    ...
    inputing(e) {
        const _this = this
        // 在这里我们是使用 Enter 发送的
        if (e.keyCode === 13 && _this.text.trim().length) {
          // exchange  就是socket.io 的路由
          // 传给服务器端一个要通讯的目标 (target)
          window.socket.emit('exchange', {
            target: _this.target,
            payload: {
              msg: _this.text,
            },
          });
          // 添加到消息列表
          _this.messages(_this.target, true, _this.text)
          _this.text = ''
        }
      }
    ...
</script>
```

发送消息我们完成了，那接收消息呢？ 接收消息也很简单，我们来看代码：

```text
<script>
    ...
     socket.on('connect', () => {
        const id = socket.id;
        _this.user = id
        // 接收通讯目标的消息
        socket.on(id, msg => {
          const { data, meta } = msg
          const date = new Date(meta.timestamp)
          // 添加到消息列表
          _this.messages(meta.client, false, data.payload.msg, date)
          if (!_this.tipsList.includes(meta.client)) _this.tipsList.push(meta.client)
       });
    ...
</script>
```

> 是不是发现 socket.io 仅用简短的代码就完成了一个聊天案例啊

### 服务端 server

**扩展**

框架扩展用于封装数据格式

```text
// {app_root}/app/extend/helper.ts

export default {
  parseMsg(action: string, payload = {}, metadata = {}) {
    const meta = Object.assign({}, {
      timestamp: Date.now(),
    }, metadata);

    return {
      meta,
      data: {
        action,
        payload,
      },
    };
  },
};
```

**中间件**

> gg-socket.io 中间件负责 socket 连接的处理，我们建立一个 auth 中间件，来做一些用户加入和离开的操作：

```text
const PREFIX = 'room';

import { Context, Application } from 'egg';

export default function AuthMiddleware(_options: any, _app: Application) {
  return async (ctx: Context, next: any) => {
    const { app, socket, logger, helper } = ctx;
    const id = socket.id;
    const nsp = app.io.of('/');
    const query = socket.handshake.query;

    const { room } = query;
    const rooms = [ room ];

    const tick = (id: any, msg: {} | undefined) => {
      // 踢出用户前发送消息
      socket.emit(id, helper.parseMsg('deny', msg));
      // 调用 adapter 方法踢出用户，客户端触发 disconnect 事件
      // tslint:disable-next-line: no-string-literal
      nsp['adapter'].remoteDisconnect(id, true, (err: any) => {
        logger.error(err);
      });
    };
	
    // 检查房间是否存在，不存在则踢出用户
    const hasRoom = await app.redis.get(`${PREFIX}:${room}`);

    if (!hasRoom) {
      tick(id, {
        type: '已删除',
        message: '删除，房间已删除.',
      });
      return;
    }
	
    // 用户加入
    socket.join(room);
	
    // 在线列表
    // tslint:disable-next-line: no-string-literal
    nsp['adapter'].clients(rooms, (_err: any, clients: any) => {
      // 更新在线用户列表
      // tslint:disable-next-line: no-string-literal
      nsp['to'](room).emit('online', {
        clients,
        action: '加入',
        target: '参加者',
        message: `用户(${id})已加入.`,
      });
    });

    await next();

    // tslint:disable-next-line: no-string-literal
    nsp['adapter'].clients(rooms, (_err: any, clients: any) => {
      // 更新在线用户列表
      // tslint:disable-next-line: no-string-literal
      nsp['to'](room).emit('online', {
        clients,
        action: '离开',
        target: '参加者',
        message: `用户(${id})已离开.`,
      });
    });
  };
}
```

**控制器**

通信，通过 exchange 进行数据交换

```text
import { Controller } from 'egg';

export default class NspController extends Controller {
  async exchange() {
    const { ctx, app } = this;
    const nsp = app.io.of('/');
    // 客户端传递的消息
    const message = ctx.args[0] || {};
    const socket = ctx.socket;
    const client = socket.id;

    try {
      const { target, payload } = message;
      if (!target) return;
      const msg = ctx.helper.parseMsg('exchange', payload, { client, target });
      // 判断是群聊还是私聊
      if (target === '群聊') {
        // 广播：发送给不包括自己的所有人
        socket.broadcast.emit(target, msg);
      } else {
        // tslint:disable-next-line: no-string-literal
        nsp['emit'](target, msg);
        // socket.emit(target, msg);
      }
    } catch (error) {
      app.logger.error(error);
    }
  }
}
```

**路由**

建立 socket.io 路由进行测试：

```text
import { Application } from 'egg';

export default (app: Application) => {
  const { router, controller, io } = app;

  // tslint:disable-next-line: no-string-literal
  io.of('/').route('exchange', io.controller[ 'nsp' ].exchange);
};
```

> 多开几个 tab 页面，并测试发送消息：

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ace7e3af1591?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 大家有没有感觉使用 socket.io 只用简短的代码就实现了一个简易的聊天应用呢，有没有感觉很方便。当然 socket.io 还有很多 api，大家有兴趣可以去研究研究该怎么样优化我们这个案例。

## 课外练习

> 下面是一些可以做的优化：

- 当用户连接和断开连接时广播消息
- 添加昵称
- 添加 `“{用户} 正在输入”` 功能
- 显示在线用户
- 添加发送表情包
- 添加发送语音

# 邮件发送

> 发送邮件需要一个邮件服务器，通常来说搭建一个邮件服务器是完全没有必要的，我们可以使用163、谷歌、QQ邮箱等，公司可以使用企业邮箱，这类的服务也比较多，本章我将带大家使用 163邮箱进行发送邮件。

## 邮箱授权

> 要发送邮件，我们需要有自己的邮箱，还要获取到授权码，那怎么获取到授权码呢？ 如下图以 163 为例：

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ad0d4f929436?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 安装插件

> Nodemailer 是Node.js 应用程序的模块，可以轻松发送电子邮件。该项目始于2010年，当时没有理智的选项来发送电子邮件，如今，它已成为大多数Node.js用户默认使用的解决方案。

```text
$ npm install nodemailer --save
```

## 配置参数

> ```
> config/config.default.ts:
> ```

```text
config.mail = {
    host: 'smtp.163.com',  // SMTP服务
    port: 465,				
    auth: {
      user: 'xxxxxxxx',	// 账号
      pass: 'xxxxxxxx',	// 授权码
    },
};
```

## 编写逻辑

> 在完成上述步骤后，接下来我们来编写发送邮件的逻辑。

### 定义接口

> 首先我们需要定义一个接口，这个接口中包括了我们发送邮件所需的参数以及类型。

```text
interface IMailData {
  to: string;  // 接收者
  subject: string;	// 标题
  html: string;	// 内容
}
```

### 编写 service

> https://github.com/push-over/egg-example/blob/c72d08141f/app/service/Utils.ts

[nodemailer (opens new window)](https://nodemailer.com/about/)这个插件非常方便，我们只需要提供一些参数就可以完成邮件发送：

```text
import * as nodemailer from 'nodemailer';

export default class Utils extends Service {
	public async sendMail(data: IMailData) {
        // 所需的参数
        const { to, subject, html } = data;
        // 我们之前配置的参数
        const { host, port, auth } = this.app.config.mail;
        // 创建传输器对象
        const transporter = nodemailer.createTransport({ host, port, auth });
        try {
          // 使用定义的传输对象发送邮件
          return await transporter.sendMail({
            from: auth.user, // 发件人地址
            to, // 接收者名单
            subject, // 主题
            html, // html 正文
          });
        } catch (error) {
          throw error;
        }
  }
}
```

## 编写服务

一切准备就绪，接下来让我们来实现发送短信。

### 定义类型

> https://github.com/push-over/egg-example/blob/c72d08141f/app/graphql/utils/schema.graphql

定义参数数据类型：

```text
input Mail {
  # 接收者
  to: String!
  # 标题
  subject: String!
  # 内容
  html: String!
}
```

### 调用方法发送邮件

> https://github.com/push-over/egg-example/blob/c72d08141f/app/graphql/utils/connector.ts

在这里我们只需要调用我们发送邮件的方法即可：

```text
public async sendMail(data: IMailData) {
    const { ctx } = this;
    return await ctx.service.utils.sendMail(data);
  }
```

### 数据操作

> https://github.com/push-over/egg-example/blob/c72d08141f/app/graphql/utils/resolver.ts

接下来我们来进行数据操作，完成发送邮件的服务：

```text
Mutation: {
    async sendMail(_root: any, { data }, { connector }) {
      const mail = await connector.utils.sendMail(data);
      return mail.response;  // 成功消息
    }
}

type Mutation {
  sendMail(data: Mail!) : String!
}
```

### 测试

> 我们使用开发者工具来测试一下，能不能正常发送短信：

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ad12c573476e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

我们来查看下邮箱，看看有没有收到邮件：

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708b505f5582c8c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 小结

> 在这篇里带大家完成了怎么集成邮件服务并发送短信，大家可以想一想可不可以在我们之前注册时，短信验证码的基础上再增加邮件验证。或者你还有什么别的奇思妙想，都可以动起手了哦。

# 异步方案

## 温习异步

> 我们知道 Javascript 语言的执行环境是 单线程。也就是指一次只能完成一件任务。如果有多个任务，就必须排队，前面一个任务完成，再执行后面一个任务。

在开始之前请大家思考下，我们在前面的环节中大量使用了 async/await，那么它究竟是什么？

## 什么是异步？

异步指的是每一个任务有一个或多个回调函数（callback），前一个任务结束后，不是执行后一个任务，而是执行回调函数，后一个任务则是不等前一个任务结束就执行，所以程序的执行顺序与任务的排列顺序是不一致的、异步的。这种模式虽然实现起来比较简单，执行环境相对单纯，但是只要有一个任务耗时很长，后面的任务都必须排队等着，会拖延整个程序的执行。常见的浏览器无响应（假死），往往就是因为某一段 Javascript 代码长时间运行（比如死循环），导致整个页面卡在这个地方，其他任务无法执行。

## 回调实现异步

小明在看电视，但他肚子饿了。同步的做法是先吃饭后看电视。异步的做法是一边吃饭一边看电视。实现异步的本质是回调，我们使用 nodejs 的 fs 这个 API 接口来看一下异步与同步的区别：

```text
const fs = require('fs')

// 读取文件
let txt1 = fs.readFileSync('./key.txt')
console.log(txt1.toString(), '1')

let txt2 = fs.readFile('./key.txt', (err, txt3) => {
  console.log(txt3.toString(), '2')
})

console.log(txt2, '3')
```

> 运行结果如下， readFileSync 是一个同步方法，所以当我们打印 txt1 的时候立刻有返回值。而当我们打印 txt2 的时候可以看到返回值是一个 undefined，这说明没有返回值，而数据在 txt3 的回调里打印出来的。

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ad4b563b6c09?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

在 NodeJs 中这种 API 太多了，异步是不能直接返回值的，当我们的项目大时又或者随着项目的不断迭代，久而久之嵌套就会越来越多，这个时候代码是你不愿意去维护也没法维护的，这还牵扯出来一个比较好听的名字，叫回调地狱，我们后面再讲该如何优化。

## 异步函数

> 我们来动手创建一个异步函数，在这里我们来通过 setTimeout 来模拟异步任务， setTimeout 也是回调，这种回调错误不好处理，默认第一个参数为错误，如果有第一个参数，则说明发生了错误，那么我们就要进行相应的处理。

```text
function asynchronous(text, fn) {
  setTimeout(() => {
    fn(null, '-' + text + '-')
  }, 3000)
}

asynchronous('hello nodejs', (err, text) => {
  if(err) console.log(err)
  console.log(text)
})

// 3s  hello nodejs
```

## 事件实现异步

事件这个词汇相信大家都不陌生，在学习编程的道路上大家或多或少都接触过前端。在浏览器和页面交互时有各种事件，我们用的比较多的就是点击事件，比如当用户点击某个 HTML 元素时执行一段代码。而在 NodeJs 中，也有一个 events 的事件模块，事件的本质就是发布订阅设计模式。之所以能异步，还是因为回调。

```text
class Evente {
    private map: any = {}
	
    // 监听器
    public on(name: string, fn: Function) {
        if (this.map[name]) {
            this.map[name].push(fn)
            return this
        }
        this.map[name] = [fn]
        return this
      }
	
    // 发射器
    public emit(name: string, ...args: any[]) {
        if (this.map[name]) {
            this.map[name].forEach((fn: Function) => {
                fn(...args)
            })
        }
        return this
    }
}
```

> 我们以 name 作为 key 放到 map 里，也就是事件名称。当触发 emit 方法的时候，获得对应的回调进行调用：

```text
const evente = new Evente()

evente.on('click', (error: string, result: any) => {
    if (error) return console.log(`error: ${error}`)
    console.log(`result: ${result}`)
})
.emit('click', '执行错误！')
.emit('click', null, '执行成功!')
```

> NodeJs 里不少模块都是基于事件模块构建的，因为事件的里面还是有回调，对于处理错误而言，还是把第一个参数作为错误传递。

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ad4ef7018b71?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

我们来使用事件模式重新完成我们一开始的例子：

```text
const evente = new Evente()

evente.on('readFile', (error: string, result: any) => {
    if (error) return console.log(`error: ${error}`)
    console.log(`result: ${result}`)
})
fs.readFile('./key.txt', (err: any, data: any) => {
    evente.emit('readFile', err, data)
})
```

好像变的更麻烦了一样，对于简单的异步我们没有必要使用事件来完成异步，在这里只是为大家做演示。

## 观察者模式实现异步

> 观察者模式或者说订阅模式，它定义了对象间的一种一对多的关系，让多个观察者对象同时监听某一个主题对象，当一个对象发生改变时，所有依赖于它的对象都将得到通知。

```text
function observableCreate(fn: Function) {
    let ret = false
    return ({
        next,
        complete,
        error,
    }: any) => {
        // 通知：传递给观察者的实际数据
        function nextFn(...args: any[]) {
            if (ret) return
            next(...args)
        }
        // 通知：按理来说这步不会发送任何值
        function completeFn(...args: any[]) {
            complete(...args)
            ret = true
        }
        // 通知：发送一个错误或异常
        function errorFn(...args: any[]) {
            error(...args)
        }
        fn({
            next: nextFn, complete: completeFn, error: errorFn
        })
        return () => (ret = true)
    }
}
```

> 当订阅下面代码中的 Observable 的时候会立即(同步地)推送值1、2、3，然后1秒后会推送值4、5，再然后是完成流，因为 complete 调用之后，把 ret 设置为 true，complate 的字面意思就是完成，完成了之后 next 就不会再生效了，有错误的时候用 error 发出即可。

```text
const observerable = observableCreate((observer: any) => {
    try {
        observer.next(1)
        observer.next(2)
        observer.next(3)
        setTimeout(() => {
            observer.next(4)
            observer.complete('完成！')
        }, 1000)
    }catch(err) {
        observer.error(err)  // 如果捕获到异常会发送一个错误
    }
})
```

> 要调用 observerable 并看到这些值，我们需要订阅 observerable：

```text
const subject  = {
    next: (value: any) => console.log(value, 'next'),
    complete: (value: any) => console.log(value, 'complate'),
    error: (value: any) => console.log(value, 'error')
}

const unsubscribe = observerable(subject)
```

## Primise 实现异步

> Primise 是 ES6 的新特性，为了处理异步而生，本质还是回调。只不过 Promise 比传统的回调和事件更合理且更强大。ES6 将其写入了语言标准，统一了用法，所以我们通常会使用 Promise 来实现异步编程。

```text
// Promise 接受一个函数作为参数，该函数的两个参数分别的是 resolve：成功，reject：失败
const promise = new Promise((resolve, reject) => {
  if (/* 条件满足 */) return resolve(result)
   reject(error)
})
```

> Promise 实例生成后，可用then 和 catch 方法分别指定两种状态回调参数：

```text
promise.then(console.log)
.catch(console.log)
```

## async/await 大杀器

> 相信大家也注意到了我们在实战环节中，都是使用的 async/await , ES7 标准引入了 async 函数，使得异步操作变得更加方便，async 其实本质是Generator函数的语法糖。async/await 应该是目前最简单的异步解决方案了，我们先来看个例子：

```text
const sleep = (time: number) => {
    return new Promise(function (resolve: any, reject: any) {
        setTimeout(() => {
            resolve();
        }, time);
    })
};

const start = async() => {
    console.log('start');
    await sleep(3000);
    console.log('end');
};

start();
```

> async 表示 是一个异步函数，await 只能用在这个函数里面。await 表示在这里等待 Promise 返回结果了，再继续执行。await 后面跟着的应该是一个 Promise 对象。

# 跨域身份验证_JWT 权限验证

## JWT 权限验证

> 关于接口的安全验证方案有很多，比如：session、签名验证、JWT 等，由于我们在前面的实战环节中已经使用过一种方式来实现权限验证了，所以本篇我们把 JWT 作为一个扩展来讲解。

## 关于 JWT

> JWT 全称 JSON Web Token，是目前比较流行的另一种跨域身份验证解决方案。也是被很多人用坏的一种安全验证机制。

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ad74c1c6c3a0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> JWT 的原理是在服务器身份验证之后，将生成一个 json 对象并将其发送回用户， 如下：

```text
{
  "id": "1",
  "username": "Praise",
  "expire": "2018-08-08 20:15:56"
}
```

> 服务器与客户端通信就是以发送这个 json 对象来实现的，为了防止客户端去篡改通信使用的 json 对象，服务器会在生成这个对象的时候，为这个 json 对象加上一个签名。

## JWT 结构

> 服务器返回的token数据基本结构是 Header.Payload.Signature， header、payload、signature 三部分以 '.' 隔开：

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJ1c2VyTmFtZSI6ImNlc2hpemhhbmdodTAyIiwiaWF0IjoxNTU1MjEyMzg1LCJleHAiOjE1NTUyMTU5ODV9.
K53kd6cERhp6H4mtd8jCzA2bQtJTsdA2Kh3hzbXMXbU
```

- header: 一个 json 对象，描述 jwt 的元数据。
- payload: 一个 json 对象，用来存放实际需要传递的数据。
- signature: 对 header和 payload 两部分的签名，防止数据被篡改。

## JWT 的交互方法

> 客户端接收服务器返回的 JWT，将其存储在Cookie 或 localStorage 中。此后，客户端将在与服务器交互中都会带 JWT。如果将它存储在 Cookie中，就可以自动发送，但是不会跨域，因此一般是将它放入HTTP请求Header Authorization字段中。

## 使用 JWT

> 前面我们简单介绍了 JWT 的原理以及结构，接下来我们在项目中使用 JWT 来实现权限验证。

### 安装插件

> jwt 的插件有很多，在这里我就不为大家介绍了，我选了个下载量最多的 jsonwebtoken，只是使用方式不同，原理都相同，大家也可以使用其他插件进行尝试。

```text
$ npm install jsonwebtoken --save
```

### 生成 Token

```text
jwt.sign(payload, secretOrPrivateKey, [options, callback])
```

> secretOrPrivateKey 是一个字符串，缓冲区或对象，其中包含 HMAC 算法的密钥或 RSA 和ECDSA的PEM` 编码的私钥。如果使用带有密码短语的私钥，则可以使用对象{key，passphrase}（基于加密文档），在这种情况下，请确保您通过了algorithm选项。

**options**

- algorithm (默认算法: HS256)。
- expiresIn：以秒或表示时间跨度zeit / ms的字符串表示。

```text
// 对用户信息进行签名生成token
const token = JWT.sign({
    id: 1,
    username: 'priase',
}, 'private.key', { expiresIn: 60 });

console.log(token) // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJwcmlhc2UiLCJpYXQiOjE1Nzc0Mzg4OTksImV4cCI6MTU3NzQzODk1OX0.JO2IIAXQfVigHxaIFmwIIUI6gGKR-pwC6XNRQijR_Gc
```

## 验证 Token

> 验证 token 非常简单，只需要一句话：

```text
const verify = JWT.verify(token, 'private.key');
```

验证结果：

```text
{
    "id": 1,
    "username": "priase",
    "iat": 1577438899,
    "exp": 1577438959
}
```

## 关于JWT的一些问题

> JWT 的最大缺点是服务器不保存会话状态，所以在使用期间不可能取消令牌或更改令牌的权限。也就是说，一旦JWT 签发，在有效期内将会一直有效，这也是我在实战环节中没有用 JWT 的原因，不过技术无好坏，一切还是看需求来定。

## J WT 本身包含认证信息，因此一旦信息泄露，任何人都可以获得令牌的所有权限。为了减少盗用，JWT 的有效期不宜设置太长。对于某些重要操作，用户在使用时应该每次都进行进行身份验证。

 

## 课外练习

我们讲完了 JWT，小伙伴们也要动起手来

- 在我们的项目中使用 JWT
- 还有 JWT最大的缺点，该怎么解决
- 添加 JWT 的中间件验证



# Docker 部署上线

> 这一篇我将带大家如何使用 Docker 部署项目到线上。Docker 可理解为跑在宿主机上的非常精简、小巧、高度浓缩的虚拟机。 它可以将容器里的进程安稳的在宿主机上运行。

## 开始前的准备

> docker 与 docker-compose 的安装我就不给大家介绍了。作为一位开发人员，我认为这点事情难不倒大家。

## 创建需要的文件

我们需要在项目根目录创建我们所需要的文件

```text
$ touch Dockerfile
$ touch docker-compose.yml
$ setup.sh
```

### 目录结构

```text
egg-project
├── package.json
├── setup.sh (新建)
├── Dockerfile (新建)
├── docker-compose.yml (新建)
├── app
...
```

## 常用指令

在开始之前我们要学习下常用的一些指令，看下方：

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ad8bbb2b70d0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 部署流程

这是一个项目的部署流程，这篇文章带大家做一个简单的部署。后面大家可以参照这张流程图来做一些完善。

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ad98784e2ef8?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 安装 Jenkins

> 既然我们项目部署打算使用 Docker，那么在安装 Jenkins 我们也一样选择使用 Docker三剑客之一的 docker-compose。docker-compose 是一个用来把 docker 自动化的东西，有了 docker-compose 你可以把所有繁复的 docker 操作全都一条命令，自动化的完成。

### 创建目录

首先我们需要在服务器上创建一个目录机构 ：

```text
/home/jenkins
     - docker-compose.yml
     - jenkins-home
```

**编写docker-compose.yml**

> 接下来我们来编写 docker-compose.yml 安装 Jenkins:

```text
version: '3'                                    # 指定 docker-compose.yml 文件的写法格式
services:                                       # 多个容器集合
  docker_jenkins: 
    user: root                                  # 为了避免一些权限问题 在这我使用了root
    restart: always                             # 重启方式
    image: jenkins/jenkins:lts                  # 指定服务所使用的镜像 在这里我选择了 LTS (长期支持)
    container_name: jenkins                     # 容器名称
    ports:                                      # 对外暴露的端口定义
      - '8080:8080'
      - '50000:50000'
    volumes:                                    # 卷挂载路径
      - /home/jenkins/jenkins_home/:/var/jenkins_home   # 这是我们一开始创建的目录挂载到容器内的jenkins_home目录
      - /var/run/docker.sock:/var/run/docker.sock
      - /usr/bin/docker:/usr/bin/docker                 # 这是为了我们可以在容器内使用docker命令
      - /usr/local/bin/docker-compose:/usr/local/bin/docker-compose     # 同样的这是为了使用docker-compose命令
```

我们需要进入到 jenkins 目录执行以下指令：

```text
$ docker-compose up -d
```

> 到这里 Jenkins 就安装成功了，使用 docker-compose 是不是既方便又快捷，接下来我们来配置以下 Jenkins。

### 配置

> 不出意外你现在可以打开你的服务器地址 http://xxxxxxx: 端口号 就能看到这个界面

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ad9d6f3d9b36?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 打开服务器你所创建的 jenkins 目录进入到 jenkins-home

```text
/home/jenkins/jenkins-home：
```

进入 secrets 目录：

```text
$ cat initialAdminPassword
```

然后把里面的文本复制出来填到管理员密码中。

在这里我们直接安装推荐的插件就好了：

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708adae63707a40?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 进入到首页面后，我们需要安装这两个插件 ：

- `NodeJS Plugin`
- `Publish Over SSH`

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708adb751e90116?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 配置 NodeJS 版本：

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708adbad3b752dd?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

滑到最下方配置：

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708adc07598f426?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

配置 SSH：

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708adc463939995?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 编写 Docker 文件

### Dockerfile

我们在开始阶段的时候学过一些常用指令，大家应该一眼就可以看得懂这些命令。 加油！！

```text
FROM node:10.0-alpine             # 镜像版本
# 设置时区
RUN apk --update add tzdata \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && apk del tzdata

# 创建app目录
RUN mkdir -p /usr/src/node-app/egg-santak

# 设置工作目录
WORKDIR /usr/src/node-app/egg-santak

# 拷贝package.json文件到工作目录
# !!重要：package.json需要单独添加。
# Docker在构建镜像的时候，是一层一层构建的，仅当这一层有变化时，重新构建对应的层。
# 如果package.json和源代码一起添加到镜像，则每次修改源码都需要重新安装npm模块，这样木有必要。
# 所以，正确的顺序是: 添加package.json；安装npm模块；添加源代码。
COPY package.json /usr/src/node-app/egg-santak/package.json

# 安装npm依赖(使用淘宝的镜像源)
# 如果使用的境外服务器，无需使用淘宝的镜像源，即改为`RUN npm i`。
RUN npm i --registry=https://registry.npm.taobao.org

# 拷贝所有源代码到工作目录
COPY . /usr/src/node-app/egg-santak

# 暴露容器端口
EXPOSE 7001

# 启动node应用
CMD npm start
```

### 创建目录

> 我们这个项目中使用了 mysql 和 redis 我们需要创建数据卷用来保证数据持久化：

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708adc8d6aa7967?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

```text
# nginx
$ mkdir -p nginx/conf.d nginx/logs

# mysql
$ mkdir mysql

# redis
$ mkdir redis
```

> 然后进入 `nginx/conf.d` 文件夹中 创建一个后缀为 conf 的文件：

```text
$ cd nginx/conf.d
$ touch default.conf
$ vim default.conf
```

写入以下内容：

```text
server {
  listen 80;
  listen [::]:80;
  server_tokens off;

  root /var/www/html;
  index index.html index.htm;

  # 修改为自己的域名
  server_name api.lovelp.xin;

  # 访问 / 路径时执行反向代理
  location / {
    # 这里 nodejs 是 node 容器名
    proxy_pass http://nodejs:7001;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $host;
    # 后端的Web服务器可以通过 X-Forwarded-For 获取用户真实 IP
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    # 允许客户端请求的最大单文件字节数
    client_max_body_size 15M;
    # 缓冲区代理缓冲用户端请求的最大字节数
    client_body_buffer_size 128k;
  }
}
```

> docker-compose.yml

我们使用 `docker-compose.yml` 来对多个 Docker 容器编排：

```text
version: '3' # 指的是docker-compose的 version

services:
  example_redis:
    image: redis:3                  # 指定服务镜像
    container_name: santak_redis    # 容器名称
    restart: always                 # 重启方式
    hostname: redis
    command: redis-server /usr/local/etc/redis/redis.conf --requirepass 123456  --appendonly yes
    volumes:                        # 挂载数据卷
      - /root/redis/redis.conf:/usr/local/etc/redis/redis.conf
    ports:                          # 映射端口
      - "6379:6379"     
    networks:                       # 加入指定网络
      - app-network

  example_nginx:
    image: nginx:stable-alpine      # 指定服务镜像
    container_name: santak_nginx    # 容器名称
    restart: always                 # 重启方式
    ports:                          # 映射端口
      - "80:80"
    volumes:                        # 挂载数据卷
      - /etc/localtime:/etc/localtime
      - /root/nginx/conf.d:/etc/nginx/conf.d
      - /root/nginx/logs:/var/log/nginx
    depends_on:                     # 启动顺序
      - nodejs
    networks:                       # 加入指定网络
      - app-network

  example_mysql:
    image: mysql:5.7
    container_name: santak_mysql
    restart: always
    ports:                          # 映射端口
      - "3306:3306"
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_USER=lovelp           # 创建lovelp用户
      - MYSQL_PASSWORD=mm123321     # 设置lovelp用户的密码
      - MYSQL_DATABASE=santak       # 创建初始数据库
      - TZ=Asia/Shanghai            # 设置时区
    volumes:                        # 挂载数据卷
      - /root/mysql:/var/lib/mysql  # 为了数据持久化
    command: --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
    networks:                       # 加入指定网络
      - app-network 

  nodejs:
    build:                          # 这里指的是我们刚刚撸的 Dockerfile 文件
      context: .                    
      dockerfile: Dockerfile
    image: nodejs                   # 镜像名称
    container_name: nodejs          # 容器名称
    restart: always                 # 重启方式
    depends_on:                     # 启动顺序
      - santak_redis
      - santak_mysql
    links:                          # 容器连接
      - santak_redis:santak_redis
      - santak_mysql:santak_mysql
    networks:                       # 加入指定网络
      - app-network

volumes:
  certbot-etc:
  certbot-var:

networks:  # 实现通信
  app-network:
    driver: bridge
```

## 脚本

这是我们部署时所要执行的脚本任务：

```text
#!/usr/bin/env bash
#image_version=`date +%Y%m%d%H%M`;

# 关闭容器
docker-compose stop || true;
# 删除容器
docker-compose down || true;
# 构建镜像
docker-compose build;
# 启动并后台运行
docker-compose up -d;
# 查看日志
docker logs nodejs;
# 对空间进行自动清理
docker system prune -a -f
```

## 开始部署

我们现在 Jenkins 创建一个项目：

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708adcdfadacec5?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

指定 git 远程仓库地址：

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708add2d35d3a59?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

指定 Node 版本和之前所编写的脚本：

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708add73660733a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

最后我们就可以愉快的 Build Now 了

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708addb23efaad0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 在这里我选择的是手动构建。其实 Jenkins 有很多可配置项，比如自动化构建，大家可以按照上方给出的流程图去完善哦。

## 小结

> 本篇内容有些多，但我们作为一名开发人员，部署项目上线是我们的必修课，还请大家不畏艰辛，好好学习。



# Serverless 部署

> Serverless 中文称之为无服务器，并不是说没有服务器，而是说服务器对用户来说是透明的。它使用计算托管的方式，在 Serverless 这里，我们可以看成两块，第一块就是函数即服务，它真正实现了你业务的托管计算。另外一种是后端即服务，包括对象存储，大家不用自己构建分布式存储，不用担心数据的丢失和安全性问题；同时在云上提供的数据库，消息队列和对象存储都是一样的，不用购买服务器自己搭建，在购买使用的过程当中我们可以称之为 Serverless。因为这些都是托管型的，使用的时候不用关心它的安全性，不用关心可能服务器宕机导致的故障。

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ae0a1a571aa6?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- FaaS（Function as a Service） 就是一些运行函数的平台，比如阿里云的函数计算、AWS 的 Lambda 等。
- BaaS（Backend as a Service）则是一些后端云服务，比如云数据库、对象存储、消息队列等。利用 BaaS，可以极大简化我们的应用开发难度。

## 传统开发流程 VS Serverless 开发流程

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ae4cbdbe13a7?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

在传统开发流程中，我们需要前端写页面，后端工程师写接口。后端写完接口之后，把接口部署了，再进行前后端联调。联调完毕后再测试、上线。上线之后，还需要运维工程师对系统进行维护。整个过程涉及多个不同角色，链路较长，沟通协调也是一个问题。

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ae50228337c9?imageslim)

> 而基于 Serverless，后端变得非常简单了，以往的后端应用被拆分为一个个函数，只需要写完函数并部署到 Serverless 服务即可，后续也不用关心任何服务器的运维操作。

## 搞懂 Serverless 四大特点

### 自动扩缩容

> 函数即应用，一个函数只做一件事，可以独立的进行扩缩容，而不用担心影响其他函数，并且由于粒度更小，扩缩容速度也更快。而对于单体应用和微服务，借助于各种容器编排技术，虽然也能实现自动扩缩容，但由于粒度关系，相比函数，始终会存在一定的资源浪费。比如一个微服务提供两个 API，其中一个 API 需要进行扩容，而另一个并不需要，那么这时候扩容，对于不需要的 API 就是一种浪费。

### 事件驱动

> 函数本质上实现的是一种IPO（Input-Process-Output）模型，它是短暂的，是即用即走的。既不发布任何服务，没有请求时也不消耗任何资源，只有当请求来了，才会消耗资源进行响应，服务完立刻释放资源。正是由于这一点，函数天然的适用于任何事件驱动的业务场景，比如身份验证，定时任务，图片处理等。

### 运行成本

> 无论是过去的 IDC 还是现在的云主机，本质上都是一种包月计费模式，也就是说，不管有没有用户访问你的应用，也不管你有没有部署应用，你都要付相同的钱。而对于 Serverless 应用是根据实际使用量来进行付费的，用多少付多少。而在运维过程中，用户无须再持续监控和维护具体服务器的状态，只需要关心应用的整体状态。应用运营的整体复杂度下降，用户的关注点可以更多地放在软件应用的体验和改进以及其他能带来更高业务价值的地方。

### 无状态性

> 在 Serverless 架构下，应用的功能被解构成若干个细颗粒度的无状态函数，功能与功能之间的边界变得更加清晰，功能模块之间的耦合度大大减小。这使得软件应用的开发效率更高，应用开发的迭代周期更短。无状态一方面有助于提高函数的可重用性和可迁移性，但也带来了性能上的一些损失。函数不是常驻进程，每一个请求，函数都要经历一次冷启动。每服务完一个请求，函数的进程会被杀掉，也就是说使用内存进行缓存对函数而言没有意义。每次启动都可能被调度到新的服务器上，任何基于本地磁盘的缓存技术也不再适用。

## 准备

> 使用 Serverless 在几分钟内就可以创建和部署一个无服务器微服务，接下来我们就来拿我们的项目来做实践。

安装插件

通过 NPM 全局安装 `Serverless Framework` https://www.github.com/serverless/serverless

```text
$ npm install -g serverless
```

### 修改 Egg 配置

> 由于云函数在执行时，只有 /tmp 可读写的，所以我们需要将 egg.js 框架运行尝试的日志写到该目录下，为此需要修改 config/config.default.ts 中的配置如下

```text
const config = {
    env: 'prod',  // 推荐云函数的 egg 运行环境变量修改为 prod
    rundir: '/tmp',
    logger: {
      dir: '/tmp',
    },
  } as PowerPartial<EggAppConfig>;
```

### 构建为 JS

> egg.js 的文档上有句话：正式环境下，我们更倾向于把 ts 构建为 js。等于说我们在服务器里面运行之前，需要将 ts 都转换为 js，这样才能正常运行。看看 package.json，里面有对应的命令。

```text
$ npm run ci
```

> 当有同名的 ts 和 js 文件时，egg 会优先加载 js 文件。

**serverless.yml**

> 在项目目录下，创建 serverless.yml 文件，在其中进行如下配置

```text
# Serverless.yml

egg:
  component: "@Serverless/tencent-egg"  # NPM 包名称
  inputs:
    region: ap-guangzhou				# 地区 默认为：ap-guangzhou
    functionName: egg-graphql-function  # 函数名称
    code: ./							# 工作目录
    functionConf:						# 功能配置
      timeout: 10						# 允许执行的功能的持续时间
      memorySize: 128					# 执行期间该功能可用的内存大小
      environment:						# 功能的环境变量
        variables:						# 环境变量数组
          TEST: vale
    apigatewayConf:						# API网关配置
      protocol: https					# 服务的前端请求类型，例如HTTP，HTTPS，HTTP和HTTPS
      environment: release 				# 要发布的环境的名称。支持三种环境: test, prepub 和 release
```

## 开始部署

> 通过 serverless or sls 命令进行部署，并可以添加 --debug 参数查看部署过程中的信息。

```text
$ serverless --debug
# or
$ sls --debug
```

> 如您的账号未 登陆 或 注册 腾讯云，您可以直接通过 微信 扫描命令行中的二维码进行授权登陆和注册。

部署成功后，可以直接在访问日志中返回的 url 地址，查看本次部署的效果。

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ae66251f926d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

打开这个 url 我们看到我们的项目已经部署上去并且可以正常使用。

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ae6341cc1ab3?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 账号配置

> 当前默认支持 CLI 扫描二维码登录，如您希望配置持久的环境变量/秘钥信息，也可以本地创建 .env 文件

```text
$ touch .env # 腾讯云的配置信息
```

> 如果已有腾讯云账号，可以在 [API 密钥管理 (opens new window)](https://console.cloud.tencent.com/cam/capi)中获取 SecretId 和SecretKey

![img](https://user-gold-cdn.xitu.io/2020/2/28/1708ae5eaa1d7bec?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 在 .env 文件中配置腾讯云的 SecretId 和 SecretKey 信息并保存

```text
TENCENT_SECRET_ID=SecretId
TENCENT_SECRET_KEY=SecretKey
```

### 移除部署

> 通过以下命令移除部署的 API 网关，并可以添加 --debug 参数查看移除部署过程中的信息。

```text
$ serverless remove --debug
# or
$ sls remove --debug
```

## 小结

> 通过本篇的学习我们知道使用 Serverless 时，我们不需要再过多关注服务端的运维，不需要关心我们不熟悉的领域，我们只需要专注于业务的开发、专注于产品的实现。我们需要关心的事情变少了，但我们能做的事情更多了。

