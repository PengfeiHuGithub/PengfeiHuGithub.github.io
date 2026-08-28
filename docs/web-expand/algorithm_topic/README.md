# JavaScript

# 单例模式

在合适的时候才创建对像，并且只创建唯一的一个。

创建对象和管理单例的职责被分布在两个不同的方法中，这两个方法组合起来才具有单例模式的威力。

使用闭包实现：

```js
var Singleton = function(name) {
    this.name = name;
};

Singleton.prototype.getName = function() {
    alert(this.name);
};

Singleton.getInstance = (function(name) {
    var instance;
    return function(name){
        if (!instance) {
            instance = new Singleton(name);
        }
        return instance;
    }
})();

var a = Singleton.getInstance('ConardLi');
var b = Singleton.getInstance('ConardLi2');

console.log(a===b);   //true
```

# 防抖

## 原理



防抖（`debounce`）：不管事件触发频率多高，一定在事件触发`n`秒后才执行，如果你在一个事件触发的 `n` 秒内又触发了这个事件，就以新的事件的时间为准，`n`秒后才执行，总之，触发完事件 `n` 秒内不再触发事件，`n`秒后再执行。

![img](https://s.poetries.top/gitee/2020/09/img/%E8%8A%82%E6%B5%81%E9%98%B2%E6%8A%96.gif)

## 应用场景



### 窗口大小变化，调整样式

```js
window.addEventListener('resize', debounce(handleResize, 200));
```

### 搜索框，输入后1000毫秒搜索

```js
debounce(fetchSelectData, 300);
```

### 表单验证，输入1000毫秒后验证

```js
debounce(validator, 1000);
```

## 实现



注意考虑两个问题：

- 在`debounce`函数中返回一个闭包，这里用的普通`function`，里面的`setTimeout`则用的箭头函数，这样做的意义是让`this`的指向准确，`this`的真实指向并非`debounce`的调用者，而是返回闭包的调用者。
- 对传入闭包的参数进行透传。

```js
    function debounce(event, time) {
      let timer = null;
      return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          event.apply(this, args);
        }, time);
      };
    }
```

有时候我们需要让函数立即执行一次，再等后面事件触发后等待`n`秒执行，我们给`debounce`函数一个`flag`用于标示是否立即执行。

当定时器变量`timer`为空时，说明是第一次执行，我们立即执行它。

```js
    function debounce(event, time, flag) {
      let timer = null;
      return function (...args) {
        clearTimeout(timer);
        if (flag && !timer) {
          event.apply(this, args);
        }
        timer = setTimeout(() => {
          event.apply(this, args);
        }, time);
      };
    }
```

# 函数柯力化

## 定义

在数学和计算机科学中，柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。

> 通俗易懂的解释：用闭包把参数保存起来，当参数的数量足够执行函数了，就开始执行函数。

## 实现

- 判断当前函数传入的参数是否大于或等于`fn`需要参数的数量，如果是，直接执行`fn`
- 如果传入参数数量不够，返回一个闭包，暂存传入的参数，并重新返回`currying`函数

```js
    function currying(fn, ...args) {
      if (args.length >= fn.length) {
        return fn(...args);
      } else {
        return (...args2) => currying(fn, ...args, ...args2);
      }
    }
```

我们来一个简单的实例验证一下：

```js
    const curryingFun = currying(fun)
    curryingFun(1)(2)(3);  // 1 2 3 
    curryingFun(1, 2)(3);  // 1 2 3 
    curryingFun(1, 2, 3);  // 1 2 3 
```

## 应用场景

### 参数复用

```js
    function getUrl(protocol, domain, path) {
      return protocol + "://" + domain + "/" + path;
    }

    var page1 = getUrl('http', 'www.conardli.top', 'page1.html');
    var page2 = getUrl('http', 'www.conardli.top', 'page2.html');
```

我们使用`currying`来简化它：

```js
let conardliSite = currying(simpleURL)('http', 'www.conardli.top');
let page1 = conardliSite('page1.html');    
```

# 基于Promise 的 ajax 封装

基于把原生`ajax`封装为`Promise`形式。

参数封装的有点简陋...后面继续优化

```js
    function ajax(url, method = 'get', param = {}) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const paramString = getStringParam(param);
        if (method === 'get' && paramString) {
          url.indexOf('?') > -1 ? url += paramString : url += `?${paramString}`
        }
        xhr.open(method, url);
        xhr.onload = function () {
          const result = {
            status: xhr.status,
            statusText: xhr.statusText,
            headers: xhr.getAllResponseHeaders(),
            data: xhr.response || xhr.responseText
          }
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            resolve(result);
          } else {
            reject(result);
          }
        }
        // 设置请求头
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // 跨域携带cookie
        xhr.withCredentials = true;
        // 错误处理
        xhr.onerror = function () {
          reject(new TypeError('请求出错'));
        }
        xhr.timeout = function () {
          reject(new TypeError('请求超时'));
        }
        xhr.onabort = function () {
          reject(new TypeError('请求被终止'));
        }
        if (method === 'post') {
          xhr.send(paramString);
        } else {
          xhr.send();
        }
      })
    }

    function getStringParam(param) {
      let dataString = '';
      for (const key in param) {
        dataString += `${key}=${param[key]}&`
      }
      return dataString;
    }
```

# 节流

## 定义

节流（`throttle`）:不管事件触发频率多高，只在单位时间内执行一次。

![img](https://s.poetries.top/gitee/2020/09/img/%E8%8A%82%E6%B5%81%E9%98%B2%E6%8A%96.gif)

## 实现

有两种方式可以实现节流，使用时间戳和定时器。

### 时间戳实现

> 第一次事件肯定触发，最后一次不会触发

```js
    function throttle(event, time) {
      let pre = 0;
      return function (...args) {
        if (Date.now() - pre > time) {
          pre = Date.now();
          event.apply(this, args);
        }
      }
```

### 定时器实现

> 第一次事件不会触发，最后一次一定触发

```js
    function throttle(event, time) {
      let timer = null;
      return function (...args) {
        if (!timer) {
          timer = setTimeout(() => {
            timer = null;
            event.apply(this, args);
          }, time);
        }
      }
    }
```

### 结合版

> 定时器和时间戳的结合版，也相当于节流和防抖的结合版，第一次和最后一次都会触发

```js
    function throttle(event, time) {
      let pre = 0;
      let timer = null;
      return function (...args) {
        if (Date.now() - pre > time) {
          clearTimeout(timer);
          timer = null;
          pre = Date.now();
          event.apply(this, args);
        } else if (!timer) {
          timer = setTimeout(() => {
            event.apply(this, args);
          }, time);
        }
      }
    }
```

# 模拟实现promise

## 基础版本

- 设定三个状态 `PENDING、FULFILLED、REJECTED` ，只能由`PENDING`改变为`FULFILLED、REJECTED`，并且只能改变一次
- `MyPromise`接收一个函数`executor`，`executor`有两个参数`resolve`方法和`reject`方法
- `resolve`将`PENDING`改变为`FULFILLED`
- `reject`将`PENDING`改变为`FULFILLED`
- `promise`变为`FULFILLED`状态后具有一个唯一的`value`
- `promise`变为`REJECTED`状态后具有一个唯一的`reason`

```js
    const PENDING = 'pending';
    const FULFILLED = 'fulfilled';
    const REJECTED = 'rejected';

    function MyPromise(executor) {
      this.state = PENDING;
      this.value = null;
      this.reason = null;

      const resolve = (value) => {
        if (this.state === PENDING) {
          this.state = FULFILLED;
          this.value = value;
        }
      }

      const reject = (reason) => {
        if (this.state === PENDING) {
          this.state = REJECTED;
          this.reason = reason;
        }
      }

      try {
        executor(resolve, reject);
      } catch (reason) {
        reject(reason);
      }
    }
```

## then方法

- `then`方法接受两个参数`onFulfilled、onRejected`，它们分别在状态由`PENDING`改变为`FULFILLED、REJECTED`后调用
- 一个`promise`可绑定多个`then`方法
- `then`方法可以同步调用也可以异步调用
- 同步调用：状态已经改变，直接调用`onFulfilled`方法
- 异步调用：状态还是`PENDING`，将`onFulfilled、onRejected`分别加入两个函数数组`onFulfilledCallbacks、onRejectedCallbacks`，当异步调用`resolve`和`reject`时，将两个数组中绑定的事件循环执行。

```js
  function MyPromise(executor) {
      this.state = PENDING;
      this.value = null;
      this.reason = null;
      this.onFulfilledCallbacks = [];
      this.onRejectedCallbacks = [];

      const resolve = (value) => {
        if (this.state === PENDING) {
          this.state = FULFILLED;
          this.value = value;
          this.onFulfilledCallbacks.forEach(fun => {
            fun();
          });
        }
      }

      const reject = (reason) => {
        if (this.state === PENDING) {
          this.state = REJECTED;
          this.reason = reason;
          this.onRejectedCallbacks.forEach(fun => {
            fun();
          });
        }
      }

      try {
        executor(resolve, reject);
      } catch (reason) {
        reject(reason);
      }
    }

    MyPromise.prototype.then = function (onFulfilled, onRejected) {
      switch (this.state) {
        case FULFILLED:
          onFulfilled(this.value);
          break;
        case REJECTED:
          onFulfilled(this.value);
          break;
        case PENDING:
          this.onFulfilledCallbacks.push(() => {
            onFulfilled(this.value);
          })
          this.onRejectedCallbacks.push(() => {
            onRejected(this.reason);
          })
          break;
      }
    }
```

## then方法异步调用

如下面的代码：输入顺序是：`1、2、ConardLi`

```js
console.log(1);

let promise = new Promise((resolve, reject) => {
  resolve('ConardLi');
});

promise.then((value) => {
  console.log(value);
});

console.log(2);
```

虽然`resolve`是同步执行的，我们必须保证`then`是异步调用的，我们用`settimeout`来模拟异步调用（并不能实现微任务和宏任务的执行机制，只是保证异步调用）

```js
    MyPromise.prototype.then = function (onFulfilled, onRejected) {
      if (typeof onFulfilled != 'function') {
        onFulfilled = function (value) {
          return value;
        }
      }
      if (typeof onRejected != 'function') {
        onRejected = function (reason) {
          throw reason;
        }
      }
      switch (this.state) {
        case FULFILLED:
          setTimeout(() => {
            onFulfilled(this.value);
          }, 0);
          break;
        case REJECTED:
          setTimeout(() => {
            onRejected(this.reason);
          }, 0);
          break;
        case PENDING:
          this.onFulfilledCallbacks.push(() => {
            setTimeout(() => {
              onFulfilled(this.value);
            }, 0);
          })
          this.onRejectedCallbacks.push(() => {
            setTimeout(() => {
              onRejected(this.reason);
            }, 0);
          })
          break;
      }
    }
```

## then方法链式调用

保证链式调用，即`then`方法中要返回一个新的`promise`，并将`then`方法的返回值进行`resolve`。

> 注意：这种实现并不能保证`then`方法中返回一个新的`promise`，只能保证链式调用。

```js
    MyPromise.prototype.then = function (onFulfilled, onRejected) {
      if (typeof onFulfilled != 'function') {
        onFulfilled = function (value) {
          return value;
        }
      }
      if (typeof onRejected != 'function') {
        onRejected = function (reason) {
          throw reason;
        }
      }
      const promise2 = new MyPromise((resolve, reject) => {
        switch (this.state) {
          case FULFILLED:
            setTimeout(() => {
              try {
                const x = onFulfilled(this.value);
                resolve(x);
              } catch (reason) {
                reject(reason);
              }
            }, 0);
            break;
          case REJECTED:
            setTimeout(() => {
              try {
                const x = onRejected(this.reason);
                resolve(x);
              } catch (reason) {
                reject(reason);
              }
            }, 0);
            break;
          case PENDING:
            this.onFulfilledCallbacks.push(() => {
              setTimeout(() => {
                try {
                  const x = onFulfilled(this.value);
                  resolve(x);
                } catch (reason) {
                  reject(reason);
                }
              }, 0);
            })
            this.onRejectedCallbacks.push(() => {
              setTimeout(() => {
                try {
                  const x = onRejected(this.reason);
                  resolve(x);
                } catch (reason) {
                  reject(reason);
                }
              }, 0);
            })
            break;
        }
      })
      return promise2;
    }
```

## catch方法

若上面没有定义`reject`方法，所有的异常会走向`catch`方法：

```js
MyPromise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
};
```

## finally方法

不管是`resolve`还是`reject`都会调用`finally`。

```js
MyPromise.prototype.finally = function(fn) {
    return this.then(value => {
       fn();
       return value;
    }, reason => {
        fn();
        throw reason;
    });
};
```

## Promise.resolve

`Promise.resolve`用来生成一个直接处于`FULFILLED`状态的Promise。

```js
MyPromise.reject = function(value) {
  return new MyPromise((resolve, reject) => {
    resolve(value);
  });
};
```

## Promise.reject

`Promise.reject`用来生成一个直接处于`REJECTED`状态的Promise。

```js
MyPromise.reject = function(reason) {
  return new MyPromise((resolve, reject) => {
    reject(reason);
  });
};
```

## all方法

接受一个`promise`数组，当所有`promise`状态`resolve`后，执行`resolve`

```js
    MyPromise.all = function (promises) {
      return new Promise((resolve, reject) => {
        if (promises.length === 0) {
          resolve([]);
        } else {
          let result = [];
          let index = 0;
          for (let i = 0; i < promises.length; i++) {
            promises[i].then(data => {
              result[i] = data;
              if (++index === promises.length) {
                resolve(result);
              }
            }, err => {
              reject(err);
              return;
            });
          }
        }
      });
    }
```

## race方法

接受一个`promise`数组，当有一个`promise`状态`resolve`后，执行`resolve`

```js
    MyPromise.race = function (promises) {
      return new Promise((resolve, reject) => {
        if (promises.length === 0) {
          resolve();
        } else {
          let index = 0;
          for (let i = 0; i < promises.length; i++) {
            promises[i].then(data => {
              resolve(data);
            }, err => {
              reject(err);
              return;
            });
          }
        }
      });
    }
```



# 浅拷贝与深拷贝

关于为什么会有深拷贝和浅拷贝，实际上就是基本类型和引用类型的问题，可以参考我这篇文章：[JS进阶】你真的掌握变量和类型了吗(opens new window)](https://www.conardli.top/2019/05/28/【JS进阶】你真的掌握变量和类型了吗/)

### 浅拷贝

我们用很多简单的方法都能实现浅拷贝：

```js
arr.slice();
arr.concat();
```

### 深拷贝

我们也能用简单的办法实现深拷贝：

```
JSON.parse(JSON.stringify(obj))
```

手动实现：

> 代码解析后面放出来。

```js
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const argsTag = '[object Arguments]';

const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const errorTag = '[object Error]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];


function forEach(array, iteratee) {
    let index = -1;
    const length = array.length;
    while (++index < length) {
        iteratee(array[index], index);
    }
    return array;
}

function isObject(target) {
    const type = typeof target;
    return target !== null && (type === 'object' || type === 'function');
}

function getType(target) {
    return Object.prototype.toString.call(target);
}

function getInit(target) {
    const Ctor = target.constructor;
    return new Ctor();
}

function cloneSymbol(targe) {
    return Object(Symbol.prototype.valueOf.call(targe));
}

function cloneReg(targe) {
    const reFlags = /\w*$/;
    const result = new targe.constructor(targe.source, reFlags.exec(targe));
    result.lastIndex = targe.lastIndex;
    return result;
}

function cloneFunction(func) {
    const bodyReg = /(?<={)(.|\n)+(?=})/m;
    const paramReg = /(?<=\().+(?=\)\s+{)/;
    const funcString = func.toString();
    if (func.prototype) {
        const param = paramReg.exec(funcString);
        const body = bodyReg.exec(funcString);
        if (body) {
            if (param) {
                const paramArr = param[0].split(',');
                return new Function(...paramArr, body[0]);
            } else {
                return new Function(body[0]);
            }
        } else {
            return null;
        }
    } else {
        return eval(funcString);
    }
}

function cloneOtherType(targe, type) {
    const Ctor = targe.constructor;
    switch (type) {
        case boolTag:
        case numberTag:
        case stringTag:
        case errorTag:
        case dateTag:
            return new Ctor(targe);
        case regexpTag:
            return cloneReg(targe);
        case symbolTag:
            return cloneSymbol(targe);
        case funcTag:
            return cloneFunction(targe);
        default:
            return null;
    }
}

function clone(target, map = new WeakMap()) {

    // 克隆原始类型
    if (!isObject(target)) {
        return target;
    }

    // 初始化
    const type = getType(target);
    let cloneTarget;
    if (deepTag.includes(type)) {
        cloneTarget = getInit(target, type);
    } else {
        return cloneOtherType(target, type);
    }

    // 防止循环引用
    if (map.get(target)) {
        return target;
    }
    map.set(target, cloneTarget);

    // 克隆set
    if (type === setTag) {
        target.forEach(value => {
            cloneTarget.add(clone(value));
        });
        return cloneTarget;
    }

    // 克隆map
    if (type === mapTag) {
        target.forEach((value, key) => {
            cloneTarget.set(key, clone(value));
        });
        return cloneTarget;
    }

    // 克隆对象和数组
    const keys = type === arrayTag ? undefined : Object.keys(target);
    forEach(keys || target, (value, key) => {
        if (keys) {
            key = value;
        }
        cloneTarget[key] = clone(target[key], map);
    });

    return cloneTarget;
}
```



# 手动实现call、apply、bind

## 模拟实现call

- 1.判断当前`this`是否为函数，防止`Function.prototype.myCall()` 直接调用
- 2.`context` 为可选参数，如果不传的话默认上下文为 `window`
- 3.为`context` 创建一个 `Symbol`（保证不会重名）属性，将当前函数赋值给这个属性
- 4.处理参数，传入第一个参数后的其余参数
- 4.调用函数后即删除该`Symbol`属性

```js
    Function.prototype.myCall = function (context = window, ...args) {
      if (this === Function.prototype) {
        return undefined; // 用于防止 Function.prototype.myCall() 直接调用
      }
      context = context || window;
      const fn = Symbol();
      context[fn] = this;
      const result = context[fn](...args);
      delete context[fn];
      return result;
    }
```

## 模拟实现apply

`apply`实现类似`call`，参数为数组

```js
    Function.prototype.myApply = function (context = window, args) {
      if (this === Function.prototype) {
        return undefined; // 用于防止 Function.prototype.myCall() 直接调用
      }
      const fn = Symbol();
      context[fn] = this;
      let result;
      if (Array.isArray(args)) {
        result = context[fn](...args);
      } else {
        result = context[fn]();
      }
      delete context[fn];
      return result;
    }
```

## 模拟实现bind

- 1.处理参数，返回一个闭包
- 2.判断是否为构造函数调用，如果是则使用`new`调用当前函数
- 3.如果不是，使用`apply`，将`context`和处理好的参数传入

```js
    Function.prototype.myBind = function (context,...args1) {
      if (this === Function.prototype) {
        throw new TypeError('Error')
      }
      const _this = this
      return function F(...args2) {
        // 判断是否用于构造函数
        if (this instanceof F) {
          return new _this(...args1, ...args2)
        }
        return _this.apply(context, args1.concat(args2))
      }
    }
```

## 扩展

获取函数中的参数：

```js
    // 获取argument对象 类数组对象 不能调用数组方法
    function test1() {
      console.log('获取argument对象 类数组对象 不能调用数组方法', arguments);
    }

    // 获取参数数组  可以调用数组方法
    function test2(...args) {
      console.log('获取参数数组  可以调用数组方法', args);
    }

    // 获取除第一个参数的剩余参数数组
    function test3(first, ...args) {
      console.log('获取argument对象 类数组对象 不能调用数组方法', args);
    }

    // 透传参数
    function test4(first, ...args) {
      fn(...args);
      fn(...arguments);
    }

    function fn() {
      console.log('透传', ...arguments);
    }

    test1(1, 2, 3);
    test2(1, 2, 3);
    test3(1, 2, 3);
    test4(1, 2, 3);
```



# 手动实现ES5继承

有下面两个类，下面实现`Man`继承`People`：

```js
    function People() {
      this.type = 'prople'
    }

    People.prototype.eat = function () {
      console.log('吃东西啦');
    }

    function Man(name) {
      this.name = name;
      this.color = 'black';
    }
```

## 原型继承

> 将父类指向子类的原型。

```js
Man.prototype = new People();
```

缺点：原型是所有子类实例共享的，改变一个其他也会改变。

------

## 构造继承

> 在子类构造函数中调用父类构造函数

```js
    function Man(name) {
      People.call(this);
    }
```

缺点：不能继承父类原型，函数在构造函数中，每个子类实例不能共享函数，浪费内存。

## 组合继承

> 使用构造继承继承父类参数，使用原型继承继承父类函数

```js
    function Man(name) {
      People.call(this);
    }

    Man.prototype = People.prototype;
```

缺点：父类原型和子类原型是同一个对象，无法区分子类真正是由谁构造。

## 寄生组合继承

> 在组合继承的基础上，子类继承一个由父类原型生成的空对象。

```js
    function Man(name) {
      People.call(this);
    }

    Man.prototype = Object.create(People.prototype, {
      constructor: {
        value: Man
      }
    })
```

## inherits函数：

```js
function inherits(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
}; 
```

使用：

```js
function Man() {
  People.call(this);
  //...
}
inherits(Man, People);

Man.prototype.fun = ...
```



# 手动实现instanceof

## 原理

```js
a instanceof Object
```

判断`Object`的prototype是否在`a`的原型链上。

## 实现

```js
    function myInstanceof(target, origin) {
      const proto = target.__proto__;
      if (proto) {
        if (origin.prototype === proto) {
          return true;
        } else {
          return myInstanceof(proto, origin)
        }
      } else {
        return false;
      }
    }
```

# 手动实现JSONP

- 1.将传入的data数据转化为url字符串形式
- 2.处理url中的回调函数
- 3.创建一个script标签并插入到页面中
- 4.挂载回调函数

```js
(function (window,document) {
    "use strict";
    var jsonp = function (url,data,callback) {

        // 1.将传入的data数据转化为url字符串形式
        // {id:1,name:'jack'} => id=1&name=jack
        var dataString = url.indexof('?') == -1? '?': '&';
        for(var key in data){
            dataString += key + '=' + data[key] + '&';
        };

        // 2 处理url中的回调函数
        // cbFuncName回调函数的名字 ：my_json_cb_名字的前缀 + 随机数（把小数点去掉）
        var cbFuncName = 'my_json_cb_' + Math.random().toString().replace('.','');
        dataString += 'callback=' + cbFuncName;

        // 3.创建一个script标签并插入到页面中
        var scriptEle = document.createElement('script');
        scriptEle.src = url + dataString;

        // 4.挂载回调函数
        window[cbFuncName] = function (data) {
            callback(data);
            // 处理完回调函数的数据之后，删除jsonp的script标签
            document.body.removeChild(scriptEle);
        }

        document.body.appendChild(scriptEle);
    }

    window.$jsonp = jsonp;

})(window,document)
```

# 数组乱序

从最后一个元素开始，从数组中随机选出一个位置，交换，直到第一个元素。

```js
    function disorder(array) {
      const length = array.length;
      let current = length - 1;
      let random;
      while (current >-1) {
        random = Math.floor(length * Math.random());
        [array[current], array[random]] = [array[random], array[current]];
        current--;
      }
      return array;
    }
```

# 数组去重、扁平、最值

## [#](https://interview.poetries.top/fe-algorithm-docs/algorithm2/JavaScript/13-数组去重、扁平、最值.html#去重)去重

### [#](https://interview.poetries.top/fe-algorithm-docs/algorithm2/JavaScript/13-数组去重、扁平、最值.html#object)Object

开辟一个外部存储空间用于标示元素是否出现过。

```js
const unique = (array)=> {
    var container = {};
    return array.filter((item, index) =>  container.hasOwnProperty(item) ? false : (container[item] = true));
}
```

### [#](https://interview.poetries.top/fe-algorithm-docs/algorithm2/JavaScript/13-数组去重、扁平、最值.html#indexof-filter)indexOf + filter

```js
const unique = arr => arr.filter((e,i) => arr.indexOf(e) === i);
```

### [#](https://interview.poetries.top/fe-algorithm-docs/algorithm2/JavaScript/13-数组去重、扁平、最值.html#set)Set

```js
const unique = arr => Array.from(new Set(arr));
const unique = arr => [...new Set(arr)];
```

### [#](https://interview.poetries.top/fe-algorithm-docs/algorithm2/JavaScript/13-数组去重、扁平、最值.html#排序)排序

通过比较相邻数字是否重复，将排序后的数组进行去重。

```js
    const unique = (array) => {
      array.sort((a, b) => a - b);
      let pre = 0;
      const result = [];
      for (let i = 0; i < array.length; i++) {
        if (!i || array[i] != array[pre]) {
          result.push(array[i]);
        }
        pre = i;
      }
      return result;
    }
```

### [#](https://interview.poetries.top/fe-algorithm-docs/algorithm2/JavaScript/13-数组去重、扁平、最值.html#去除重复的值)去除重复的值

不同于上面的去重，这里是只要数字出现了重复次，就将其移除掉。

```js
const filterNonUnique = arr => arr.filter(i => 
  arr.indexOf(i) === arr.lastIndexOf(i)
)
```

## [#](https://interview.poetries.top/fe-algorithm-docs/algorithm2/JavaScript/13-数组去重、扁平、最值.html#扁平)扁平

### [#](https://interview.poetries.top/fe-algorithm-docs/algorithm2/JavaScript/13-数组去重、扁平、最值.html#基本实现)基本实现

```js
    const flat = (array) => {
      let result = [];
      for (let i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) {
          result = result.concat(flat(array[i]));
        } else {
          result.push(array[i]);
        }
      }
      return result;
    }
```

### [#](https://interview.poetries.top/fe-algorithm-docs/algorithm2/JavaScript/13-数组去重、扁平、最值.html#使用reduce简化)使用reduce简化

```js
    function flatten(array) {
      return array.reduce(
        (target, current) =>
          Array.isArray(current) ?
            target.concat(flatten(current)) :
            target.concat(current)
        , [])
    }
```

### [#](https://interview.poetries.top/fe-algorithm-docs/algorithm2/JavaScript/13-数组去重、扁平、最值.html#根据指定深度扁平数组)根据指定深度扁平数组

```js
    function flattenByDeep(array, deep = 1) {
      return array.reduce(
        (target, current) =>
          Array.isArray(current) && deep > 1 ?
            target.concat(flattenByDeep(current, deep - 1)) :
            target.concat(current)
        , [])
    }
```

## 最值

### reduce

```js
array.reduce((c,n)=>Math.max(c,n))
```

### Math.max

`Math.max`参数原本是一组数字，只需要让他可以接收数组即可。

```js
const array = [3,2,1,4,5];
Math.max.apply(null,array);
Math.max(...array);
```

## 使用reduce实现map

```js
    Array.prototype.reduceToMap = function (handler) {
      return this.reduce((target, current, index) => {
        target.push(handler.call(this, current, index))
        return target;
      }, [])
    };
```

## 使用reduce实现filter

```js
    Array.prototype.reduceToFilter = function (handler) {
      return this.reduce((target, current, index) => {
        if (handler.call(this, current, index)) {
          target.push(current);
        }
        return target;
      }, [])
    };
```

# 图片懒加载

## 监听图片高度

图片，用一个其他属性存储真正的图片地址：

```html
  <img src="loading.gif" data-src="https://cdn.pixabay.com/photo/2015/09/09/16/05/forest-931706_1280.jpg" alt="">
  <img src="loading.gif" data-src="https://cdn.pixabay.com/photo/2014/08/01/00/08/pier-407252_1280.jpg" alt="">
  <img src="loading.gif" data-src="https://cdn.pixabay.com/photo/2014/12/15/17/16/pier-569314_1280.jpg" alt="">
  <img src="loading.gif" data-src="https://cdn.pixabay.com/photo/2010/12/13/10/09/abstract-2384_1280.jpg" alt="">
  <img src="loading.gif" data-src="https://cdn.pixabay.com/photo/2015/10/24/11/09/drop-of-water-1004250_1280.jpg"
```

通过图片`offsetTop`和`window`的`innerHeight`，`scrollTop`判断图片是否位于可视区域。

```js
    var img = document.getElementsByTagName("img");
    var n = 0; //存储图片加载到的位置，避免每次都从第一张图片开始遍历
    lazyload(); //页面载入完毕加载可是区域内的图片
    // 节流函数，保证每200ms触发一次
    function throttle(event, time) {
      let timer = null;
      return function (...args) {
        if (!timer) {
          timer = setTimeout(() => {
            timer = null;
            event.apply(this, args);
          }, time);
        }
      }
    }
    window.addEventListener('scroll', throttle(lazyload, 200))
    function lazyload() { //监听页面滚动事件
      var seeHeight = window.innerHeight; //可见区域高度
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滚动条距离顶部高度
      for (var i = n; i < img.length; i++) {
        console.log(img[i].offsetTop, seeHeight, scrollTop);
        if (img[i].offsetTop < seeHeight + scrollTop) {
          if (img[i].getAttribute("src") == "loading.gif") {
            img[i].src = img[i].getAttribute("data-src");
          }
          n = i + 1;
        }
      }
    }
```

## IntersectionObserver

> IntersectionObserver接口 (从属于Intersection Observer API) 提供了一种异步观察目标元素与其祖先元素或顶级文档视窗(viewport)交叉状态的方法。祖先元素与视窗(viewport)被称为根(root)。

`Intersection Observer`可以不用监听`scroll`事件，做到元素一可见便调用回调，在回调里面我们来判断元素是否可见。

```js
    if (IntersectionObserver) {
      let lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
          let lazyImage = entry.target;
          // 如果元素可见            
          if (entry.intersectionRatio > 0) {
            if (lazyImage.getAttribute("src") == "loading.gif") {
              lazyImage.src = lazyImage.getAttribute("data-src");
            }
            lazyImageObserver.unobserve(lazyImage)
          }
        })
      })
      for (let i = 0; i < img.length; i++) {
        lazyImageObserver.observe(img[i]);
      }
    }
```

# 异步循环打印

使用`promise + async await`实现异步循环打印

```js
    var sleep = function (time, i) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve(i);
        }, time);
      })
    };


    var start = async function () {
      for (let i = 0; i < 6; i++) {
        let result = await sleep(1000, i);
        console.log(result);
      }
    };

    start();
```

# EventEmitter

## 观察者模式

![img](https://img.blog.csdn.net/20161126191512446)

这就类似我们在微信平台订阅了公众号 , 当它有新的文章发表后，就会推送给我们所有订阅的人。

我们作为订阅者不必每次都去查看这个公众号有没有新文章发布，公众号作为发布者会在合适时间通知我们。

我们与公众号之间不再强耦合在一起。公众号不关心谁订阅了它， 不管你是男是女还是宠物狗，它只需要定时向所有订阅者发布消息即可。

### 观察者模式的优点

- 可以广泛应用于异步编程，它可以代替我们传统的回调函数
- 我们不需要关注对象在异步执行阶段的内部状态，我们只关心事件完成的时间点
- 取代对象之间硬编码通知机制，一个对象不必显式调用另一个对象的接口，而是松耦合的联系在一起 。

虽然不知道彼此的细节，但不影响相互通信。更重要的是，其中一个对象改变不会影响另一个对象。

## Nodejs的EventEmitter

`Nodejs`的`EventEmitter`就是观察者模式的典型实现，`Nodejs`的`events`模块只提供了一个对象： `events.EventEmitter``。EventEmitter` 的核心就是事件触发与事件监听器功能的封装。

> Node.js 里面的许多对象都会分发事件：一个 net.Server 对象会在每次有新连接时触发一个事件， 一个 fs.readStream 对象会在文件被打开的时候触发一个事件。 所有这些产生事件的对象都是 events.EventEmitter 的实例。

### Api

**addListener(event, listener)**

为指定事件添加一个监听器，默认添加到监听器数组的尾部。

**removeListener(event, listener)**

移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器。它接受两个参数，第一个是事件名称，第二个是回调函数名称。

**setMaxListeners(n)**

默认情况下， EventEmitters 如果你添加的监听器超过 10 个就会输出警告信息。 setMaxListeners 函数用于提高监听器的默认限制的数量。

**once(event, listener)**

为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器。

**emit(event, [arg1], [arg2], [...])**

按监听器的顺序执行执行每个监听器，如果事件有注册监听返回 `true`，否则返回 `false`。

### 基本使用

```js
var events = require('events');
var eventEmitter = new events.EventEmitter();

// 监听器 #1
var listener1 = function listener1() {
   console.log('监听器 listener1 执行。');
}

// 监听器 #2
var listener2 = function listener2() {
  console.log('监听器 listener2 执行。');
}

// 绑定 connection 事件，处理函数为 listener1 
eventEmitter.addListener('connection', listener1);

// 绑定 connection 事件，调用一次，处理函数为 listener2
eventEmitter.once('connection', listener2);

// 处理 connection 事件 
eventEmitter.emit('connection');

// 处理 connection 事件 
eventEmitter.emit('connection');
```

## 手动实现EventEmitter

```js
    function EventEmitter() {
      this._maxListeners = 10;
      this._events = Object.create(null);
    }

    // 向事件队列添加事件
    // prepend为true表示向事件队列头部添加事件
    EventEmitter.prototype.addListener = function (type, listener, prepend) {
      if (!this._events) {
        this._events = Object.create(null);
      }
      if (this._events[type]) {
        if (prepend) {
          this._events[type].unshift(listener);
        } else {
          this._events[type].push(listener);
        }
      } else {
        this._events[type] = [listener];
      }
    };

    // 移除某个事件
    EventEmitter.prototype.removeListener = function (type, listener) {
      if (Array.isArray(this._events[type])) {
        if (!listener) {
          delete this._events[type]
        } else {
          this._events[type] = this._events[type].filter(e => e !== listener && e.origin !== listener)
        }
      }
    };

    // 向事件队列添加事件，只执行一次
    EventEmitter.prototype.once = function (type, listener) {
      const only = (...args) => {
        listener.apply(this, args);
        this.removeListener(type, listener);
      }
      only.origin = listener;
      this.addListener(type, only);
    };

    // 执行某类事件
    EventEmitter.prototype.emit = function (type, ...args) {
      if (Array.isArray(this._events[type])) {
        this._events[type].forEach(fn => {
          fn.apply(this, args);
        });
      }
    };

    // 设置最大事件监听个数
    EventEmitter.prototype.setMaxListeners = function (count) {
      this.maxListeners = count;
    };
```

测试代码：

```js
    var emitter = new EventEmitter();

    var onceListener = function (args) {
      console.log('我只能被执行一次', args, this);
    }

    var listener = function (args) {
      console.log('我是一个listener', args, this);
    }

    emitter.once('click', onceListener);
    emitter.addListener('click', listener);

    emitter.emit('click', '参数');
    emitter.emit('click');

    emitter.removeListener('click', listener);
    emitter.emit('click');
```

## JavaScript自定义事件

`DOM`也提供了类似上面`EventEmitter`的`API`，基本使用：

```js
//1、创建事件
var myEvent = new Event("myEvent");

//2、注册事件监听器
elem.addEventListener("myEvent",function(e){
  
})

//3、触发事件
elem.dispatchEvent(myEvent);
```

# 数据结构

# 堆的基本操作

## 基本结构

![img](https://lsqimg-1257917459.cos-website.ap-beijing.myqcloud.com/blog/heap.png)

- 堆的底层实际上是一棵完全二叉树。
- 可以用数组实现
- 每个的节点元素值不小于其子节点 - 最大堆
- 每个的节点元素值不大于其子节点 - 最小堆

![img](https://lsqimg-1257917459.cos-website.ap-beijing.myqcloud.com/blog/heap2.png)

## 堆的构建

**大顶堆**

从第一个非叶子节点开始依次对数组中的元素进行下沉操作

- 和孩子节点的最大值`max`比较
- 大于`max` — 不需要在下沉
- 小于`max` — 和`max`交换位置 - 继续和下一层孩子节点比较，直到队列末尾

```js
    function ajustMaxHeap(array, index, length) {
      for (let i = 2 * index + 1; i < length; i = 2 * i + 1) {
        if (i + 1 < length && array[i + 1] > array[i]) {
          i++;
        }
        if (array[index] >= [array[i]]) {
          break;
        } else {
          [array[index], array[i]] = [array[i], array[index]];
          index = i;
        }
      }
    }

    function createMaxHeap(arr, length) {
      for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
        ajustMaxHeap(arr, i, length);
      }
      return arr;
    }
```

**小顶堆**

从第一个非叶子节点开始依次对数组中的元素进行下沉操作

- 和孩子节点的最小值`min`比较
- 小于`min` — 不需要在下沉
- 大于`min` — 和`min`交换位置（下沉） - 继续和下一层孩子节点比较，直到队列末尾

```js
    function ajustMinHeap(array, index, length) {
      for (let i = 2 * index + 1; i < length; i = 2 * i + 1) {
        if (i + 1 < length && array[i + 1] < array[i]) {
          i++;
        }
        if (array[index] < [array[i]]) {
          break;
        } else {
          [array[index], array[i]] = [array[i], array[index]];
          index = i;
        }
      }
    }

    function createMinHeap(arr, length) {
      for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
        ajustMinHeap(arr, i, length);
      }
      return arr;
    }
```

## 堆的插入

- 由于堆属于优先队列，只能从末尾添加
- 添加后有可能破坏堆的结构，需要从下到上进行调整
- 如果元素小于父元素，上浮

以小顶堆为例：

```js
    function minHeapAdd(array = [], element) {
      array.push(element);
      if (array.length > 1) {
        let index = array.length - 1;
        let target = Math.floor((index - 1) / 2);
        while (target >= 0) { array[target]);
          if (array[index] < array[target]) {
            [array[index], array[target]] = [array[target], array[index]]
            index = target;
            target = Math.floor((index - 1) / 2);
          } else {
            break;
          }
        }
      }
      return array;
    }
```

## 堆的移除

- 由于堆属于优先队列，只能从头部移除
- 移除头部后，使用末尾元素填充头部，开始头部下沉操作

以小顶堆为例：

```js
    function minHeapPop(array = []) {
      let result = null;
      if (array.length > 1) {
        result = array[0];
        array[0] = array.pop();
        ajustMinHeap(array, 0, array.length);
      } else if (array.length === 1) {
        return array.pop();
      }
      return result;
    }
```

## 封装

```js
    function Heap(type = 'min') {
      this.type = type;
      this.value = [];
    }

    Heap.prototype.create = function () {
      const length = this.value.length;
      for (let i = Math.floor((length / 2) - 1); i >= 0; i--) {
        this.ajust(i, length);
      }
    }

    Heap.prototype.ajust = function (index, length) {
      const array = this.value;
      for (let i = 2 * index + 1; i < length; i = 2 * i + 1) {
        if (i + 1 < length) {
          if ((this.type === 'max' && array[i + 1] > array[i]) ||
            (this.type === 'min' && array[i + 1] < array[i])) {
            i++;
          }
        }
        if ((this.type === 'max' && array[index] < [array[i]]) ||
          (this.type === 'min' && array[index] > [array[i]])) {
          [array[index], array[i]] = [array[i], array[index]];
          index = i;
        } else {
          break;
        }
      }
    }

    Heap.prototype.add = function (element) {
      const array = this.value;
      array.push(element);
      if (array.length > 1) {
        let index = array.length - 1;
        let target = Math.floor((index - 1) / 2);
        while (target >= 0) {
          if ((this.type === 'min' && array[index] < array[target]) ||
            (this.type === 'max' && array[index] > array[target])) {
            [array[index], array[target]] = [array[target], array[index]]
            index = target;
            target = Math.floor((index - 1) / 2);
          } else {
            break;
          }
        }
      }
    }

    Heap.prototype.pop = function () {
      const array = this.value;
      let result = null;
      if (array.length > 1) {
        result = array[0];
        array[0] = array.pop();
        this.ajust(0, array.length);
      } else if (array.length === 1) {
        return array.pop();
      }
      return result;
    }

    var heap = new Heap('max');
    heap.add(6)
    heap.add(10)
    console.log(heap.value);
    console.log(heap.pop());
    console.log(heap.value);
```

# 数据流中的中位数

## 题目

如何得到一个数据流中的中位数？如果从数据流中读出奇数个数值，那么中位数就是所有数值排序之后位于中间的数值。

如果从数据流中读出偶数个数值，那么中位数就是所有数值排序之后中间两个数的平均值。我们使用`Insert()`方法读取数据流，使用`GetMedian()`方法获取当前读取数据的中位数。

## 思路

1.维护一个大顶堆，一个小顶堆，数据总数：

- 小顶堆里的值全大于大顶堆里的；
- 2个堆个数的差值小于等于1

2.当插入数字后数据总数为奇数时：使小顶堆个数比大顶堆多1；当插入数字后数据总数为偶数时，使大顶堆个数跟小顶堆个数一样。

3.当总数字个数为奇数时，中位数就是小顶堆堆头；当总数字个数为偶数时，中位数数就是2个堆堆顶平均数。

## 代码

```js
    const maxHeap = new Heap('max');
    const minHeap = new Heap('min');
    let count = 0;
    function Insert(num) {
      count++;
      if (count % 2 === 1) {
        maxHeap.add(num);
        minHeap.add(maxHeap.pop());
      } else {
        minHeap.add(num);
        maxHeap.add(minHeap.pop());
      }
    }
    function GetMedian() {
      if (count % 2 === 1) {
        return minHeap.value[0];
      } else {
        return (minHeap.value[0] + maxHeap.value[0]) / 2
      }
    }

    function Heap(type = 'min') {
      this.type = type;
      this.value = [];
    }

    Heap.prototype.create = function () {
      const length = this.value.length;
      for (let i = Math.floor((length / 2) - 1); i >= 0; i--) {
        this.ajust(i, length);
      }
    }

    Heap.prototype.ajust = function (index, length) {
      const array = this.value;
      for (let i = 2 * index + 1; i < length; i = 2 * i + 1) {
        if (i + 1 < length) {
          if ((this.type === 'max' && array[i + 1] > array[i]) ||
            (this.type === 'min' && array[i + 1] < array[i])) {
            i++;
          }
        }
        if ((this.type === 'max' && array[index] < [array[i]]) ||
          (this.type === 'min' && array[index] > [array[i]])) {
          [array[index], array[i]] = [array[i], array[index]];
          index = i;
        } else {
          break;
        }
      }
    }

    Heap.prototype.add = function (element) {
      const array = this.value;
      array.push(element);
      if (array.length > 1) {
        let index = array.length - 1;
        let target = Math.floor((index - 1) / 2);
        while (target >= 0) {
          if ((this.type === 'min' && array[index] < array[target]) ||
            (this.type === 'max' && array[index] > array[target])) {
            [array[index], array[target]] = [array[target], array[index]]
            index = target;
            target = Math.floor((index - 1) / 2);
          } else {
            break;
          }
        }
      }
    }

    Heap.prototype.pop = function () {
      const array = this.value;
      let result = null;
      if (array.length > 1) {
        result = array[0];
        array[0] = array.pop();
        this.ajust(0, array.length);
      } else if (array.length === 1) {
        return array.pop();
      }
      return result;
    }
```

## 考察点

- 堆
- 二叉树



# 最小的K个数

## 题目

输入`n`个整数，找出其中最小的K个数。例如输入`4,5,1,6,2,7,3,8`这`8`个数字，则最小的`4`个数字是`1,2,3,4`。

## 思路

思路1:

先排序，再取前k个数，最小时间复杂度`nlogn`。

思路2:

1.把前`k`个数构建一个大顶堆

2.从第`k`个数开始，和大顶堆的最大值进行比较，若比最大值小，交换两个数的位置，重新构建大顶堆

3.一次遍历之后大顶堆里的数就是整个数据里最小的`k`个数。

时间复杂度`nlogk`，优于思路1。

## 代码

```js
    function GetLeastNumbers_Solution(input, k) {
      if (k > input.length) {
        return [];
      }
      createHeap(input, k);
      for (let i = k; i < input.length; i++) {
        // 当前值比最小的k个值中的最大值小
        if (input[i] < input[0]) {
          [input[i], input[0]] = [input[0], input[i]];
          ajustHeap(input, 0, k);
        }
      }
      return input.splice(0, k);
    }

    // 构建大顶堆
    function createHeap(arr, length) {
      for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
        ajustHeap(arr, i, length);
      }
    }

    function ajustHeap(arr, index, length) {
      for (let i = 2 * index + 1; i < length; i = 2 * i + 1) {
        if (i + 1 < length && arr[i + 1] > arr[i]) {
          i++;
        }
        if (arr[index] < arr[i]) {
          [arr[index], arr[i]] = [arr[i], arr[index]];
          index = i;
        } else {
          break;
        }
      }
    }
```

# 从上到下打印二叉树

## 题目1-不分行从上到下打印

从上往下打印出二叉树的每个节点，同层节点从左至右打印。

## 思路

- 在打印第一行时，将左孩子节点和右孩子节点存入一个队列里
- 队列元素出队列打印，同时分别将左孩子节点和右孩子节点存入队列
- 这样打印二叉树的顺序就是没行从左到右打印

## 代码

```js
    function PrintFromTopToBottom(root) {
      const result = [];
      const queue = [];
      if (root) {
        queue.push(root);
        while (queue.length > 0) {
          const current = queue.shift();
          if (current.left) {
            queue.push(current.left);
          }
          if (current.right) {
            queue.push(current.right);
          }
          result.push(current.val);
        }
      }
      return result;
    }
```

## 题目2-把二叉树打印成多行

从上到下按层打印二叉树，同一层结点从左至右输出。每一层输出一行。

## 思路

- 使用一个队列存储当前层遍历的节点
- 使用两个变量来标记当前遍历的状态
- currentNums：当前层剩余的节点数
- childNums：孩子节点数
- 当前层遍历完成后开始遍历孩子节点，currentNums赋值为childNums，childNums赋值为0，

## 代码

```js
    function Print(root) {
      const result = [];
      const queue = [];
      let tempArr = [];
      let currentNums = 1;
      let childNums = 0;
      if (root) {
        queue.push(root);
        while (queue.length > 0) {
          const current = queue.shift();
          if (current.left) {
            queue.push(current.left);
            childNums++;
          }
          if (current.right) {
            queue.push(current.right);
            childNums++;
          }
          tempArr.push(current.val);
          currentNums--;
          if (currentNums === 0) {
            currentNums = childNums;
            childNums = 0;
            result.push(tempArr);
            tempArr = [];
          }
        }
      }
      return result;
    }
```

## 题目3-按之字形顺序打印二叉树

请实现一个函数按照之字形打印二叉树，即第一行按照从左到右的顺序打印，第二层按照从右至左的顺序打印，第三行按照从左到右的顺序打印，其他行以此类推。

## 思路

奇数从左到右，偶数从右到左

- 若当前层为奇数层，从左到右打印，同时填充下一层，从右到左打印（先填充左孩子节点再填充右孩子节点）。
- 若当前层为偶数层，从右到左打印，同时填充下一层，从左到右打印（先填充右孩子节点再填充左孩子节点）。
- 不难发现，我们可以使用栈来作为存储结构。
- 分别设定一个奇数栈和一个偶数栈， 从将二叉树头部元素存入奇数栈开始。

> 这里同样可使用上面2题的两个变量来记录层数，只需要一个栈即可，但是代码不如两个栈容易理解。

## 代码

```js
    function Print(root) {
      const result = [];
      const oddStack = [];
      const evenStack = [];
      let temp = [];
      if (root) {
        oddStack.push(root);
        while (oddStack.length > 0 || evenStack.length > 0) {

          while (oddStack.length > 0) {
            const current = oddStack.pop();
            temp.push(current.val);
            if (current.left) {
              evenStack.push(current.left);
            }
            if (current.right) {
              evenStack.push(current.right);
            }
          }
          if (temp.length > 0) {
            result.push(temp);
            temp = [];
          }

          while (evenStack.length > 0) {
            const current = evenStack.pop();
            temp.push(current.val);
            if (current.right) {
              oddStack.push(current.right);
            }
            if (current.left) {
              oddStack.push(current.left);
            }
          }
          if (temp.length > 0) {
            result.push(temp);
            temp = [];
          }

        }
      }
      return result;
    }
```

## 考察点

- 二叉树
- 栈
- 队列

# 对称的二叉树

## 题目

请实现一个函数，用来判断一颗二叉树是不是对称的。注意，如果一个二叉树同此二叉树的镜像是同样的，定义其为对称的。

## 思路

二叉树的右子树是二叉树左子树的镜像二叉树。

镜像二叉树：两颗二叉树根结点相同，但他们的左右两个子节点交换了位置。

![img](https://s.poetries.top/gitee/2020/09/img/%E5%AF%B9%E7%A7%B0%E4%BA%8C%E5%8F%89%E6%A0%91.png)

如图，1为对称二叉树，2、3都不是。

- 两个根结点相等
- 左子树的右节点和右子树的左节点相同。
- 右子树的左节点和左子树的右节点相同。

递归所有节点满足以上条件即二叉树对称。

## 代码

```js
    function isSymmetrical(pRoot) {
      return isSymmetricalTree(pRoot, pRoot);
    }

    function isSymmetricalTree(node1, node2) {
      if (!node1 && !node2) {
        return true;
      }
      if (!node1 || !node2) {
        return false;
      }
      if (node1.val != node2.val) {
        return false;
      }
      return isSymmetricalTree(node1.left, node2.right) && isSymmetricalTree(node1.right, node2.left);
    }
```

## 考察点

- 二叉树
- 抽象问题形象化



# 二叉树

树是用来模拟具有树状结构性质的数据集合。根据它的特性可以分为非常多的种类，对于我们来讲，掌握二叉树这种结构就足够了，它也是树最简单、应用最广泛的种类。

> 二叉树是一种典型的树树状结构。如它名字所描述的那样，二叉树是每个节点最多有两个子树的树结构，通常子树被称作“左子树”和“右子树”。

![img](https://i.loli.net/2019/08/18/3HdPxIMFOQv9yEz.jpg)

### 二叉树遍历

> 重点中的重点，最好同时掌握递归和非递归版本，递归版本很容易书写，但是真正考察基本功的是非递归版本。

- [二叉树的中序遍历(opens new window)](https://www.conardli.top/docs/dataStructure/二叉树/二叉树的中序遍历.html)
- [二叉树的前序遍历(opens new window)](https://www.conardli.top/docs/dataStructure/二叉树/二叉树的前序遍历.html)
- [二叉树的后序遍历(opens new window)](https://www.conardli.top/docs/dataStructure/二叉树/二叉树的后序遍历.html)

> 根据前序遍历和中序遍历的特点重建二叉树，逆向思维，很有意思的题目

- [重建二叉树(opens new window)](https://www.conardli.top/docs/dataStructure/二叉树/重建二叉树.html)
- [求二叉树的遍历(opens new window)](https://www.conardli.top/docs/dataStructure/二叉树/重建二叉树.html#题目2-求二叉树的遍历)

### 二叉树的对称性

- [对称的二叉树(opens new window)](https://www.conardli.top/docs/dataStructure/二叉树/对称的二叉树.html)
- [二叉树的镜像(opens new window)](https://www.conardli.top/docs/dataStructure/二叉树/二叉树的镜像.html)

### 二叉搜索树

> 二叉搜索树是特殊的二叉树，考察二叉搜索树的题目一般都是考察二叉搜索树的特性，所以掌握好它的特性很重要。

1. 若任意节点的左⼦子树不不空，则左⼦子树上所有结点的值均⼩小于它的 根结点的值;
2. 若任意节点的右⼦子树不不空，则右⼦子树上所有结点的值均⼤大于它的 根结点的值;
3. 任意节点的左、右⼦子树也分别为⼆二叉查找树。

- [二叉搜索树的第k个节点(opens new window)](https://www.conardli.top/docs/dataStructure/二叉树/二叉搜索树的第k个节点.html#题目)
- [二叉搜索树的后序遍历(opens new window)](https://www.conardli.top/docs/dataStructure/二叉树/二叉搜索树的后序遍历.html)

### 二叉树的深度

> 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

> 平衡二叉树：左右子树深度之差大于1

- [二叉树的最大深度(opens new window)](https://www.conardli.top/docs/dataStructure/二叉树/二叉树的最大深度.html)
- [二叉树的最小深度(opens new window)](https://www.conardli.top/docs/dataStructure/二叉树/二叉树的最小深度.html#考察点)
- [平衡二叉树(opens new window)](https://www.conardli.top/docs/dataStructure/二叉树/平衡二叉树.html)



# 二叉树的后序遍历

## 题目

给定一个二叉树，返回它的 后序 遍历。

示例:

```js
输入: [1,null,2,3]  
   1
    \
     2
    /
   3 
输出: [3,2,1]
```

进阶: 递归算法很简单，你可以通过迭代算法完成吗？

## 代码

递归实现

```js
    var postorderTraversal = function (root, array = []) {
      if (root) {
        postorderTraversal(root.left, array);
        postorderTraversal(root.right, array);
        array.push(root.val);
      }
      return array;
    };
```

非递归实现

- 取根节点为目标节点，开始遍历
- 1.左孩子入栈 -> 直至左孩子为空的节点
- 2.栈顶节点的右节点为空或右节点被访问过 -> 节点出栈并访问他，将节点标记为已访问
- 3.栈顶节点的右节点不为空且未被访问，以右孩子为目标节点，再依次执行1、2、3

```js
    var postorderTraversal = function (root) {
      const result = [];
      const stack = [];
      let last = null; // 标记上一个访问的节点
      let current = root;
      while (current || stack.length > 0) {
        while (current) {
          stack.push(current);
          current = current.left;
        }
        current = stack[stack.length - 1];
        if (!current.right || current.right == last) {
          current = stack.pop();
          result.push(current.val);
          last = current;
          current = null; // 继续弹栈
        } else {
          current = current.right;
        }
      }
      return result;
    }
```

# 二叉树的基本操作

## 完全二叉树的一些公式

1.第n层的节点数最多为2n个节点

2.n层二叉树最多有20+...+2n=2n+1-1个节点

3.第一个非叶子节点：length/2

4.一个节点的孩子节点：2n、2n+1

## 基本结构

插入，遍历，深度

```js
        function Node(data, left, right) {
            this.data = data;
            this.left = left;
            this.right = right;
        }

        Node.prototype = {
            show: function () {
                console.log(this.data);
            }
        }

        function Tree() {
            this.root = null;
        }

        Tree.prototype = {
            insert: function (data) {
                var node = new Node(data, null, null);
                if (!this.root) {
                    this.root = node;
                    return;
                }
                var current = this.root;
                var parent = null;
                while (current) {
                    parent = current;
                    if (data < parent.data) {
                        current = current.left;
                        if (!current) {
                            parent.left = node;
                            return;
                        }
                    } else {
                        current = current.right;
                        if (!current) {
                            parent.right = node;
                            return;
                        }
                    }

                }
            },
            preOrder: function (node) {
                if (node) {
                    node.show();
                    this.preOrder(node.left);
                    this.preOrder(node.right);
                }
            },
            middleOrder: function (node) {
                if (node) {
                    this.middleOrder(node.left);
                    node.show();
                    this.middleOrder(node.right);
                }
            },
            laterOrder: function (node) {
                if (node) {
                    this.laterOrder(node.left);
                    this.laterOrder(node.right);
                    node.show();
                }
            },
            getMin: function () {
                var current = this.root;
                while(current){
                    if(!current.left){
                        return current;
                    }
                    current = current.left;
                }
            },
            getMax: function () {
                var current = this.root;
                while(current){
                    if(!current.right){
                        return current;
                    }
                    current = current.right;
                }
            },
            getDeep: function (node,deep) {
                deep = deep || 0;
                if(node == null){
                    return deep;
                }
                deep++;
                var dleft = this.getDeep(node.left,deep);
                var dright = this.getDeep(node.right,deep);
                return Math.max(dleft,dright);
            }
        }
        var t = new Tree();
        t.insert(3);
        t.insert(8);
        t.insert(1);
        t.insert(2);
        t.insert(5);
        t.insert(7);
        t.insert(6);
        t.insert(0);
        console.log(t);
        // t.middleOrder(t.root);
        console.log(t.getMin(), t.getMax());
        console.log(t.getDeep(t.root, 0));
        console.log(t.getNode(5,t.root));
```

## 树查找

```js
            getNode: function (data, node) {
                if (node) {
                    if (data === node.data) {
                        return node;
                    } else if (data < node.data) {
                        return this.getNode(data,node.left);
                    } else {
                        return this.getNode(data,node.right);
                    }
                } else {
                    return null;
                }
            }
```

利用二分的思想

## 二分查找

二分查找的条件是必须是有序的线性表。

和线性表的中点值进行比较，如果小就继续在小的序列中查找，如此递归直到找到相同的值。

```js
        function binarySearch(data, arr, start, end) {
            if (start > end) {
                return -1;
            }
            var mid = Math.floor((end + start) / 2);
            if (data == arr[mid]) {
                return mid;
            } else if (data < arr[mid]) {
                return binarySearch(data, arr, start, mid - 1);
            } else {
                return binarySearch(data, arr, mid + 1, end);
            }
        }
        var arr = [0, 1, 1, 1, 1, 1, 4, 6, 7, 8]
        console.log(binarySearch(1, arr, 0, arr.length-1));
```

# 二叉树的镜像

## 题目

操作给定的二叉树，将其变换为源二叉树的镜像。

```text
       源二叉树 
    	    8
    	   /  \
    	  6   10
    	 / \  / \
    	5  7 9 11
    	镜像二叉树
    	    8
    	   /  \
    	  10   6
    	 / \  / \
    	11 9 7  5
```

## 1.2 解题思路

递归交换二叉树所有节点左右节点的位置。

## 1.3 代码

```js
function Mirror(root)
{
    if(root){
        const temp = root.right;
        root.right = root.left;
        root.left = temp;
        Mirror(root.right);
        Mirror(root.left);
    }
}
```

## 考察点

- 二叉树
- 抽象问题形象化

# 二叉树的前序遍历

## 题目

给定一个二叉树，返回它的 前序 遍历。

示例:

```js
输入: [1,null,2,3]  
   1
    \
     2
    /
   3 
输出: [1,2,3]
```

进阶: 递归算法很简单，你可以通过迭代算法完成吗？

## 代码

递归实现

```js
    var preorderTraversal = function (root, array = []) {
      if (root) {
        array.push(root.val);
        preorderTraversal(root.left, array);
        preorderTraversal(root.right, array);
      }
      return array;
    };
```

非递归实现

- 取根节点为目标节点，开始遍历
- 1.访问目标节点
- 2.左孩子入栈 -> 直至左孩子为空的节点
- 3.节点出栈，以右孩子为目标节点，再依次执行1、2、3

```js
    var preorderTraversal = function (root) {
      const result = [];
      const stack = [];
      let current = root;
      while (current || stack.length > 0) {
        while (current) {
          result.push(current.val);
          stack.push(current);
          current = current.left;
        }
        current = stack.pop();
        current = current.right;
      }
      return result;
    };
```

#  二叉树的下一个节点

## 题目

给定一个二叉树和其中的一个结点，请找出中序遍历顺序的下一个结点并且返回。注意，树中的结点不仅包含左右子结点，同时包含指向父结点的指针。

## 思路

中序遍历的顺序 左 - 根 - 右

所以寻找下一个节点的优先级应该反过来 优先级 右 - 根 - 左

- 右节点不为空 - 取右节点的最左侧节点
- 右节点为空 - 如果节点是父亲节的左节点 取父节点
- 右节点为空 - 如果节点是父亲节的右节点 父节点已经被遍历过，再往上层寻找...
- 左节点一定在当前节点之前被遍历过

以下图的二叉树来分析：

![img](https://s.poetries.top/gitee/2020/09/img/%E4%BA%8C%E5%8F%89%E6%A0%91.jpeg)

中序遍历： CBDAEF

- B - 右节点不为空，下一个节点为右节点D
- C - 右节点为空，C是父节点的左节点，取父节点B
- D - 右节点为空，D是父节点的右节点，再往上蹭分析，B是其父节点的左节点，取B的父节点A
- F - 右节点为空，F是父节点的右节点，没有符合条件的节点，F为遍历的最后一个节点，返回null

## 代码

```js
    /*function TreeLinkNode(x){
        this.val = x;
        this.left = null;
        this.right = null;
        this.next = null;
    }*/
    function GetNext(pNode) {
      if (!pNode) {
        return null;
      }
      if (pNode.right) {
        pNode = pNode.right;
        while (pNode.left) {
          pNode = pNode.left;
        }
        return pNode;
      } else {
        while (pNode) {
          if (!pNode.next) {
            return null;
          } else if (pNode == pNode.next.left) {
            return pNode.next;
          }
          pNode = pNode.next;
        }
        return pNode;
      }
    }
```

## 考察点

- 二叉树
- 复杂问题拆解



# 二叉树的中序遍历

## 题目

给定一个二叉树，返回它的 中序 遍历。

示例:

```js
输入: [1,null,2,3]
   1
    \
     2
    /
   3
输出: [1,3,2]
```

进阶: 递归算法很简单，你可以通过迭代算法完成吗？

## 代码

递归实现

```js
    var inorderTraversal = function (root, array = []) {
      if (root) {
        inorderTraversal(root.left, array);
        array.push(root.val);
        inorderTraversal(root.right, array);
      }
      return array;
    };
```

非递归实现

- 取根节点为目标节点，开始遍历
- 1.左孩子入栈 -> 直至左孩子为空的节点
- 2.节点出栈 -> 访问该节点
- 3.以右孩子为目标节点，再依次执行1、2、3

```js
    var inorderTraversal = function (root) {
      const result = [];
      const stack = [];
      let current = root;
      while (current || stack.length > 0) {
        while (current) {
          stack.push(current);
          current = current.left;
        }
        current = stack.pop();
        result.push(current.val);
        current = current.right;
      }
      return result;
    };
```

# 二叉树的最大深度

## 题目

给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

说明: 叶子节点是指没有子节点的节点。

示例：

给定二叉树 `[3,9,20,null,null,15,7]`，

```text
    3
   / \
  9  20
    /  \
   15   7
```

返回它的最大深度 3 。

## 思路

- 深度优先遍历 + 分治
- 一棵二叉树的最大深度等于左子树深度和右子树最大深度的最大值 + 1

## 代码

```js
    function TreeDepth(pRoot) {
      return !pRoot ? 0 : Math.max(TreeDepth(pRoot.left), TreeDepth(pRoot.right)) + 1
    }
```

## 考察点

- 二叉树
- 递归
- 分治

# 二叉树的最小深度

## 题目

给定一个二叉树，找出其最小深度。

最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

说明: 叶子节点是指没有子节点的节点。

示例:

给定二叉树 `[3,9,20,null,null,15,7]`,

```js
    3
   / \
  9  20
    /  \
   15   7
```

返回它的最小深度 2

## 思路

深度优先 + 分治

- 左右子树都不为空：左子树深度和右子树最小深度的最小值 + 1
- 左树为空：右子树最小深度的最小值 + 1
- 右树为空：左子树最小深度 + 1

## 代码

```js
    var minDepth = function (root) {
      if (!root) {
        return 0;
      }
      if (!root.left) {
        return 1 + minDepth(root.right);
      }
      if (!root.right) {
        return 1 + minDepth(root.left);
      }
      return Math.min(minDepth(root.left), minDepth(root.right)) + 1
    };
```

## 考察点

- 二叉树
- 递归
- 分治

# 二叉树中和为某一值得路径

输入一颗二叉树的根节点和一个整数，打印出二叉树中结点值的和为输入整数的所有路径。路径定义为从树的根结点开始往下一直到叶结点所经过的结点形成一条路径。

## 思路

套用回溯算法的思路

设定一个结果数组result来存储所有符合条件的路径

设定一个栈stack来存储当前路径中的节点

设定一个和sum来标识当前路径之和

- 从根结点开始深度优先遍历，每经过一个节点，将节点入栈
- 到达叶子节点，且当前路径之和等于给定目标值，则找到一个可行的解决方案，将其加入结果数组
- 遍历到二叉树的某个节点时有2个可能的选项，选择前往左子树或右子树
- 若存在左子树，继续向左子树递归
- 若存在右子树，继续向右子树递归
- 若上述条件均不满足，或已经遍历过，将当前节点出栈，向上回溯

## 代码

```js
    function FindPath(root, expectNumber) {
      const result = [];
      if (root) {
        FindPathCore(root, expectNumber, [], 0, result);
      }
      return result;
    }

    function FindPathCore(node, expectNumber, stack, sum, result) {
      stack.push(node.val);
      sum += node.val;
      if (!node.left && !node.right && sum === expectNumber) {
        result.push(stack.slice(0));
      }
      if (node.left) {
        FindPathCore(node.left, expectNumber, stack, sum, result);
      }
      if (node.right) {
        FindPathCore(node.right, expectNumber, stack, sum, result);
      }
      stack.pop();
    }
```

## 考察点

- 二叉树
- 回溯算法



# 二叉搜索树的第k个节点

## 题目

给定一棵二叉搜索树，请找出其中的第k小的结点。 例如， （5，3，7，2，4，6，8） 中，按结点数值大小顺序第三小结点的值为4。

## 思路

二叉搜索树的中序遍历即排序后的节点，本题实际考察二叉树的遍历。

## 代码

```js
    //递归实现
    function KthNode(pRoot, k) {
      const arr = [];
      loopThrough(pRoot, arr);
      if (k > 0 && k <= arr.length) {
        return arr[k - 1];
      }
      return null;
    }

    function loopThrough(node, arr) {
      if (node) {
        loopThrough(node.left, arr);
        arr.push(node);
        loopThrough(node.right, arr);
      }
    }


    //非递归实现
    function KthNode(pRoot, k) {
      const arr = [];
      const stack = [];
      let current = pRoot;
      while (stack.length > 0 || current) {
        while (current) {
          stack.push(current);
          current = current.left;
        }
        current = stack.pop();
        arr.push(current);
        current = current.right;
      }
      if (k > 0 && k <= arr.length) {
        return arr[k - 1];
      }
      return null;
    }
```

## 考察点

- 二叉树



# 二叉搜索树的后序遍历

输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历的结果。如果是则输出Yes,否则输出No。假设输入的数组的任意两个数字都互不相同。

## 思路

1.后序遍历：分成三部分：最后一个节点为根节点，第二部分为左子树的值比根节点都小，第三部分为右子树的值比根节点都大。

2.先检测左子树，左侧比根节点小的值都判定为左子树。

3.除最后一个节点外和左子树外的其他值为右子树，右子树有一个比根节点小，则返回false。

4.若存在，左、右子树，递归检测左、右子树是否复合规范。

## 代码

```js
    function VerifySquenceOfBST(sequence) {
      if (sequence && sequence.length > 0) {
        var root = sequence[sequence.length - 1]
        for (var i = 0; i < sequence.length - 1; i++) {
          if (sequence[i] > root) {
            break;
          }
        }
        for (let j = i; j < sequence.length - 1; j++) {
          if (sequence[j] < root) {
            return false;
          }
        }
        var left = true;
        if (i > 0) {
          left = VerifySquenceOfBST(sequence.slice(0, i));
        }
        var right = true;
        if (i < sequence.length - 1) {
          right = VerifySquenceOfBST(sequence.slice(i, sequence.length - 1));
        }
        return left && right;
      }
    }
```

## 考察点

- 二叉树



# 二叉搜索树与双向链表

## 题目

输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的双向链表。要求不能创建任何新的结点，只能调整树中结点指针的指向。

## 思路

二叉搜索树的中序遍历即排序后的序列

- 1.递归左子树，找到左子树的最后一个节点，根节点左侧连接到左子树的最后一个节点
- 2.当前节点变为已经转换完成的链表的最后一个节点
- 3.递归右子树，找到当前树的最后一个节点
- 4.回溯到上一层，进行链接...

![img](https://s.poetries.top/gitee/2020/09/img/%E4%BA%8C%E5%8F%89%E6%90%9C%E7%B4%A2%E6%A0%91%E4%B8%8E%E5%8F%8C%E5%90%91%E9%93%BE%E8%A1%A8.png)

## 代码

```js
    function Convert(pRootOfTree) {
      if (!pRootOfTree) {
        return null;
      }
      ConvertCore(pRootOfTree);
      while (pRootOfTree.left) {
        pRootOfTree = pRootOfTree.left;
      }
      return pRootOfTree;
    }

    function ConvertCore(node, last) {
      if (node.left) {
        last = ConvertCore(node.left, last)
      }
      node.left = last;
      if (last) {
        last.right = node;
      }
      last = node;
      if (node.right) {
        last = ConvertCore(node.right, last);
      }
      return last;
    }
```

## 考察点

- 二叉搜索树
- 链表



# 平衡二叉树

## 题目

输入一棵二叉树，判断该二叉树是否是平衡二叉树。

> 平衡二叉树：每个子树的深度之差不超过1

## 思路

后续遍历二叉树

在遍历二叉树每个节点前都会遍历其左右子树

比较左右子树的深度，若差值大于1 则返回一个标记 -1表示当前子树不平衡

左右子树有一个不是平衡的，或左右子树差值大于1，则整课树不平衡

若左右子树平衡，返回当前树的深度（左右子树的深度最大值+1）

## 代码

```js
    function IsBalanced_Solution(pRoot) {
      return balanced(pRoot) != -1;
    }

    function balanced(node) {
      if (!node) {
        return 0;
      }
      const left = balanced(node.left);
      const right = balanced(node.right);
      if (left == -1 || right == -1 || Math.abs(left - right) > 1) {
        return -1;
      }
      return Math.max(left, right) + 1;
    }
```

## 考察点

- 二叉树



# 树的子结构

## 题目

输入两棵二叉树`A`，`B`，判断`B`是不是`A`的子结构。（ps：我们约定空树不是任意一个树的子结构）

## 思路

首先找到`A`树中和`B`树根节点相同的节点

从此节点开始，递归`AB`树比较是否有不同节点

## 代码

```js
    function HasSubtree(pRoot1, pRoot2) {
      let result = false;
      if (pRoot1 && pRoot2) {
        if (pRoot1.val === pRoot2.val) {
          result = compare(pRoot1, pRoot2);
        }
        if (!result) {
          result = HasSubtree(pRoot1.right, pRoot2);
        }
        if (!result) {
          result = HasSubtree(pRoot1.left, pRoot2);
        }
      }
      return result;
    }

    function compare(pRoot1, pRoot2) {
      if (pRoot2 === null) {
        return true;
      }
      if (pRoot1 === null) {
        return false;
      }
      if (pRoot1.val !== pRoot2.val) {
        return false;
      }
      return compare(pRoot1.right, pRoot2.right) && compare(pRoot1.left, pRoot2.left);
    }
```



# 序列化二叉树

## 题目

请实现两个函数，分别用来序列化和反序列化二叉树

## 思路

- 若一颗二叉树是不完全的，我们至少需要两个遍历才能将它重建（像题目[重建二叉树](https://interview.poetries.top/fe-algorithm-docs/algorithm2/dataStructure/重建二叉树.html)一样）
- 但是这种方式仍然有一定的局限性，比如二叉树中不能出现重复节点。
- 如果二叉树是一颗完全二叉树，我们只需要知道前序遍历即可将它重建。
- 因此在序列化时二叉树时，可以将空节点使用特殊符号存储起来，这样就可以模拟一棵完全二叉树的前序遍历
- 在重建二叉树时，当遇到特殊符号当空节点进行处理

## 代码

```js
    function Serialize(pRoot, arr = []) {
      if (!pRoot) {
        arr.push('#');
      } else {
        arr.push(pRoot.val);
        Serialize(pRoot.left, arr)
        Serialize(pRoot.right, arr)
      }
      return arr.join(',');
    }

    function Deserialize(s) {
      if (!s) {
        return null;
      }
      return deserialize(s.split(','));
    }

    function deserialize(arr) {
      let node = null;
      const current = arr.shift();
      if (current !== '#') {
        node = { val: current }
        node.left = deserialize(arr);
        node.right = deserialize(arr);
      }
      return node;
    }
```

## 考察点

- 二叉树
- 复杂问题拆解



# 重建二叉树

## 题目1-二叉树重建

输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。

例如输入前序遍历序列`{1,2,4,7,3,5,6,8}`和中序遍历序列`{4,7,2,1,5,3,8,6}`，则重建二叉树并返回。

## 思路

- 前序遍历：根节点 + 左子树前序遍历 + 右子树前序遍历
- 中序遍历：左子树中序遍历 + 根节点 + 右字数中序遍历
- 后序遍历：左子树后序遍历 + 右子树后序遍历 + 根节点

根据上面的规律：

- 前序遍历找到根结点`root`
- 找到`root`在中序遍历的位置 -> 左子树的长度和右子树的长度
- 截取左子树的中序遍历、右子树的中序遍历
- 截取左子树的前序遍历、右子树的前序遍历
- 递归重建二叉树

![img](https://s.poetries.top/gitee/2020/09/img/%E9%87%8D%E5%BB%BA%E4%BA%8C%E5%8F%89%E6%A0%91.png)

## 代码

```js
    function reConstructBinaryTree(pre, vin) {
        if(pre.length === 0){
            return null;
        }
        if(pre.length === 1){
            return new TreeNode(pre[0]);
        }
        const value = pre[0];
        const index = vin.indexOf(value);
        const vinLeft = vin.slice(0,index);
        const vinRight = vin.slice(index+1);
        const preLeft = pre.slice(1,index+1);
        const preRight = pre.slice(index+1);
        const node = new TreeNode(value);
        node.left = reConstructBinaryTree(preLeft, vinLeft);
        node.right = reConstructBinaryTree(preRight, vinRight);
        return node;
    }
```

## 题目2-求二叉树的遍历

给定一棵二叉树的前序遍历和中序遍历，求其后序遍历

输入描述:

两个字符串，其长度n均小于等于26。 第一行为前序遍历，第二行为中序遍历。 二叉树中的结点名称以大写字母表示：A，B，C....最多26个结点。

输出描述:

输入样例可能有多组，对于每组测试样例， 输出一行，为后序遍历的字符串。

样例：

```text
输入
ABC
BAC
FDXEAG
XDEFAG

输出
BCA
XEDGAF
```

## 思路

和上面题目的思路基本相同

- 前序遍历找到根结点`root`
- 找到`root`在中序遍历的位置 -> 左子树的长度和右子树的长度
- 截取左子树的中序遍历、右子树的中序遍历
- 截取左子树的前序遍历、右子树的前序遍历
- 递归拼接二叉树的后序遍历

## 代码

```js
let pre;
let vin;
 
while((pre = readline())!=null){
    vin = readline();
    print(getHRD(pre,vin));
}
 
    function getHRD(pre, vin) {
      if (!pre) {
        return '';
      }
      if (pre.length === 1) {
        return pre;
      }
      const head = pre[0];
      const splitIndex = vin.indexOf(head);
      const vinLeft = vin.substring(0, splitIndex);
      const vinRight = vin.substring(splitIndex + 1);
      const preLeft = pre.substring(1, splitIndex + 1);
      const preRight = pre.substring(splitIndex + 1);
      return getHRD(preLeft, vinLeft) + getHRD(preRight, vinRight) + head;
    }
```

## 考察点

- 二叉树
- 复杂问题拆解



# 链表_从尾到头打印链表

## 题目

输入一个链表，按链表值从尾到头的顺序返回一个`ArrayList`。

## 分析

要了解链表的数据结构：

`val`属性存储当前的值，`next`属性存储下一个节点的引用。

要遍历链表就是不断找到当前节点的`next`节点，当`next`节点是`null`时，说明是最后一个节点，停止遍历。

因为是从尾到头的顺序，使用一个队列来存储打印结果，每次从队列头部插入。

## 代码

```js
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function printListFromTailToHead(head)
{
    const array = [];
    while(head){
        array.unshift(head.val);
        head = head.next;
    }
    return array;
}
```

## 考察点

- 链表



# 链表_反转链表

输入一个链表，反转链表后，输出新链表的表头。

## 思路

以链表的头部节点为基准节点

将基准节点的下一个节点挪到头部作为头节点

当基准节点的`next`为`null`，则其已经成为最后一个节点，链表已经反转完成

## 代码

```js
    var reverseList = function (head) {
      let currentNode = null;
      let headNode = head;
      while (head && head.next) {
        currentNode = head.next;
        head.next = currentNode.next;
        currentNode.next = headNode;
        headNode = currentNode;
      }
      return headNode;
    };
```



# 链表_复杂链表的复制

## 题目

输入一个复杂链表（每个节点中有节点值，以及两个指针，一个指向下一个节点，另一个特殊指针指向任意一个节点），返回结果为复制后复杂链表的head。

## 思路

拆分成三步

1.复制一份链表放在前一个节点后面，即根据原始链表的每个节点N创建N`,把N`直接放在N的next位置，让复制后的链表和原始链表组成新的链表。

2.给复制的链表random赋值，即`N.random=N.random.next`。

3.拆分链表，将N`和N进行拆分，保证原始链表不受影响。

## 代码

```js
    function Clone(pHead) {
      if (pHead === null) {
        return null;
      }
      cloneNodes(pHead);
      cloneRandom(pHead);
      return reconnetNodes(pHead);
    }

    function cloneNodes(pHead) {
      var current = pHead;
      while (current) {
        var cloneNode = {
          label: current.label,
          next: current.next
        };
        current.next = cloneNode;
        current = cloneNode.next;
      }
    }

    function cloneRandom(pHead) {
      var current = pHead;
      while (current) {
        var cloneNode = current.next;
        if (current.random) {
          cloneNode.random = current.random.next;
        } else {
          cloneNode.random = null;
        }
        current = cloneNode.next;
      }
    }

    function reconnetNodes(pHead) {
      var cloneHead = pHead.next;
      var cloneNode = pHead.next;
      var current = pHead;
      while (current) {
        current.next = cloneNode.next;
        current = cloneNode.next;
        if (current) {
          cloneNode.next = current.next;
          cloneNode = current.next;
        } else {
          cloneNode.next = null;
        }
      }
      return cloneHead;
    }
```

## 考察点

- 链表
- 复杂问题拆解



# 链表_合并两个排序的链表

## 题目

输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则。

## 思路

![img](https://s.poetries.top/gitee/2020/09/img/%E5%90%88%E5%B9%B6%E9%93%BE%E8%A1%A8.png)

链表头部节点比较，取较小节点。

小节点的next等于小节点的next和大节点的较小值。

如此递归。

返回小节点。

考虑代码的鲁棒性，也是递归的终止条件，两个head为null的情况，取对方节点返回。

## 代码

```js
    function Merge(pHead1, pHead2) {
      if (!pHead1) {
        return pHead2;
      }
      if (!pHead2) {
        return pHead1;
      }
      let head;
      if (pHead1.val < pHead2.val) {
        head = pHead1;
        head.next = Merge(pHead1.next, pHead2);
      } else {
        head = pHead2;
        head.next = Merge(pHead1, pHead2.next);
      }
      return head;
    }
```



# 链表_链表倒数第K个节点

## 题目

输入一个链表，输出该链表中倒数第k个结点。

## 思路

简单思路： 循环到链表末尾找到 length 在找到length-k节点 需要循环两次。

优化：

设定两个节点，间距相差k个节点，当前面的节点到达终点，取后面的节点。

前面的节点到达k后，后面的节点才出发。

代码鲁棒性： 需要考虑head为null，k为0，k大于链表长度的情况。

## 代码

```js
    function FindKthToTail(head, k) {
      if (!head || !k) return null;
      let front = head;
      let behind = head;
      let index = 1;
      while (front.next) {
        index++;
        front = front.next;
        if (index > k) {
          behind = behind.next;
        }
      }
      return (k <= index) && behind;
    }
```



# 链表_链表中环的入口节点

## 题目

给一个链表，若其中包含环，请找出该链表的环的入口结点，否则，输出null。

## 思路

声明两个指针 P1 P2

- 1.判断链表是否有环： P1 P2 从头部出发，P1走两步，P2走一步，如果可以相遇，则环存在
- 2.从环内某个节点开始计数，再回到此节点时得到链表环的长度 length
- 3.P1、P2 回到head节点，让 P1 先走 length 步 ，当P2和P1相遇时即为链表环的起点

![img](https://s.poetries.top/gitee/2020/09/img/%E9%93%BE%E8%A1%A8%E4%B8%AD%E7%8E%AF%E7%9A%84%E5%85%A5%E5%8F%A3%E8%8A%82%E7%82%B9.png)

## 代码

```js
function EntryNodeOfLoop(pHead) {
      if (!pHead || !pHead.next) {
        return null;
      }
      let P1 = pHead.next;
      let P2 = pHead.next.next;
      // 1.判断是否有环
      while (P1 != P2) {
        if (P2 === null || P2.next === null) {
          return null;
        }
        P1 = P1.next;
        P2 = P2.next.next;
      }
      // 2.获取环的长度
      let temp = P1;
      let length = 1;
      P1 = P1.next;
      while (temp != P1) {
        P1 = P1.next;
        length++;
      }
      // 3.找公共节点
      P1 = P2 = pHead;
      while (length-- > 0) {
        P2 = P2.next;
      }
      while (P1 != P2) {
        P1 = P1.next;
        P2 = P2.next;
      }
      return P1;
    }
```

## 考察点

- 链表
- 程序的鲁棒性
- 复杂问题拆解



# 链表_两个链表的第一个公共节点

## 题目

输入两个链表，找出它们的第一个公共结点。

## 思路

- 1.先找到两个链表的长度`length1`、`length2`
- 2.让长一点的链表先走`length2-length1`步，让长链表和短链表起点相同
- 3.两个链表一起前进，比较获得第一个相等的节点
- 时间复杂度`O(length1+length2)` 空间复杂度`O(0)`

![img](https://s.poetries.top/gitee/2020/09/img/%E9%93%BE%E8%A1%A8%E5%85%AC%E5%85%B1%E8%8A%82%E7%82%B9.png)

## 代码

```js
function FindFirstCommonNode(pHead1, pHead2) {
      if (!pHead1 || !pHead2) { return null; }
      // 获取链表长度
      let length1 = getLength(pHead1);
      let length2 = getLength(pHead2);
      // 长链表先行
      let lang, short, interval;
      if (length1 > length2) {
        lang = pHead1;
        short = pHead2;
        interval = length1 - length2;
      } else {
        lang = pHead2;
        short = pHead1;
        interval = length2 - length1;
      }
      while (interval--) {
        lang = lang.next;
      }
      // 找相同节点
      while (lang) {
        if (lang === short) {
          return lang;
        }
        lang = lang.next;
        short = short.next;
      }
      return null;
    }

    function getLength(head) {
      let current = head;
      let result = 0;
      while (current) {
        result++;
        current = current.next;
      }
      return result;
    }
```



# 链表_圈圈中最后剩下的数字

## 题目



`0,1,...,n-1`这`n`个数字排成一个圆圈，从数字0开始，每次从这个圆圈里删除第`m`个数字。求出这个圆圈里剩下的最后一个数字。

其实这就是著名的约瑟夫环问题，下面是这个问题产生的背景，一个有趣的故事：

> 据说著名犹太历史学家 Josephus有过以下的故事：在罗马人占领乔塔帕特后，39 个犹太人与Josephus及他的朋友躲到一个洞中，39个犹太人决定宁愿死也不要被敌人抓到，于是决定了一个自杀方式，41个人排成一个圆圈，由第1个人开始报数，每报数到第3人该人就必须自杀，然后再由下一个重新报数，直到所有人都自杀身亡为止。然而Josephus 和他的朋友并不想遵从。首先从一个人开始，越过k-2个人（因为第一个人已经被越过），并杀掉第k个人。接着，再越过k-1个人，并杀掉第k个人。这个过程沿着圆圈一直进行，直到最终只剩下一个人留下，这个人就可以继续活着。问题是，给定了和，一开始要站在什么地方才能避免被处决？Josephus要他的朋友先假装遵从，他将朋友与自己安排在第16个与第31个位置，于是逃过了这场死亡游戏。

![img](https://s.poetries.top/gitee/2020/09/img/yuesefu.jpg)

## [#](https://interview.poetries.top/fe-algorithm-docs/algorithm2/dataStructure/32-链表_圈圈中最后剩下的数字.html#思路)思路



**解法1:用链表模拟环**

- 用链表模拟一个环
- 模拟游戏场景
- 记录头节点的前一个节点`current`，以保证我们找到的要删除的节点是`current.next`
- 每次循环m次找到目标节点删除，直到链表只剩下一个节点
- 时间复杂度`O(m*n)` 空间复杂度`O(n)`

**解法2:用数组模拟**

- 每次计算下标，需要考虑末尾条件

**解法3:数学推导**

- `f(n) = (f(n-1)+m)%n` 即 `f(n,m) = (f(n-1,m)+m)%n`
- 使用递归求解 边界条件为 `n=1`

时间复杂度 `1>2>3`

易理解程度 `1>2>3`

## 代码



```js
    // 解法1
    function LastRemaining_Solution(n, m) {
      if (n < 1 || m < 1) {
        return -1;
      }
      const head = { val: 0 }
      let current = head;
      for (let i = 1; i < n; i++) {
        current.next = { val: i }
        current = current.next;
      }
      current.next = head;

      while (current.next != current) {
        for (let i = 0; i < m - 1; i++) {
          current = current.next;
        }
        current.next = current.next.next;
      }
      return current.val;
    }
    // 解法2
    function LastRemaining_Solution(n, m) {
      if (n < 1 || m < 1) {
        return -1;
      }
      const array = [];
      let index = 0;
      for (let i = 0; i < n; i++) {
        array[i] = i;
      }
      while (array.length > 1) {
        index = (index + m) % array.length - 1;
        if (index >= 0) {
          array.splice(index, 1);
        } else {
          array.splice(array.length - 1, 1);
          index = 0;
        }
      }
      return array[0];
    }
    // 解法3
    function LastRemaining_Solution(n, m) {
      if (n < 1 || m < 1) {
        return -1;
      } else {
        return joseoh(n, m);
      }

    }

    function joseoh(n, m) {
      if (n === 1) {
        return 0;
      }
      return (joseoh(n - 1, m) + m) % n;
    }
```



# 链表_删除链表中的节点or重复的节点

## 删除链表中的节点



给定单链表的头指针和要删除的指针节点，在O(1)时间内删除该节点。

- 1.删除的节点不是尾部节点 - 将next节点覆盖当前节点
- 2.删除的节点是尾部节点且等于头节点，只剩一个节点 - 将头节点置为null
- 3.删除的节点是尾节点且前面还有节点 - 遍历到末尾的前一个节点删除

只有第三种情况时间复杂度是O(n)，且这种情况只会出现1/n次，所以算法时间复杂度是O(1)

```js
    var deleteNode = function (head, node) {
      if (node.next) {
        node.val = node.next.val;
        node.next = node.next.next;
      } else if (node === head) {
        node = null;
        head = null;
      } else {
        node = head;
        while (node.next.next) {
          node = node.next;
        }
        node.next = null;
        node = null;
      }
      return node;
    };
```

## 删除链表中重复的节点



### 方法1.存储链表中元素出现的次数

- 1.用一个map存储每个节点出现的次数
- 2.删除出现次数大于1的节点

此方法删除节点时可以使用上面总结的办法。

时间复杂度：O(n)

空间复杂度：O(n)

```js
    function deleteDuplication(pHead) {
      const map = {};
      if (pHead && pHead.next) {
        let current = pHead;
        // 计数
        while (current) {
          const val = map[current.val];
          map[current.val] = val ? val + 1 : 1;
          current = current.next;
        }
        current = pHead;
        while (current) {
          const val = map[current.val];
          if (val > 1) {
            // 删除节点
            console.log(val);
            if (current.next) {
              current.val = current.next.val;
              current.next = current.next.next;
            } else if (current === pHead) {
              current = null;
              pHead = null;
            } else {
              current = pHead;
              while (current.next.next) {
                current = current.next;
              }
              current.next = null;
              current = null;
            }

          } else {
            current = current.next;
          }
        }
      }
      return pHead;
    }
```

### 方法2.重新比较连接数组

链表是排好顺序的，所以重复元素都会相邻出现 递归链表：

- 1.当前节点或当前节点的next为空，返回该节点
- 2.当前节点是重复节点：找到后面第一个不重复的节点
- 3.当前节点不重复：将当前的节点的next赋值为下一个不重复的节点

```js
    function deleteDuplication(pHead) {
      if (!pHead || !pHead.next) {
        return pHead;
      } else if (pHead.val === pHead.next.val) {
        let tempNode = pHead.next;
        while (tempNode && pHead.val === tempNode.val) {
          tempNode = tempNode.next;
        }
        return deleteDuplication(tempNode);
      } else {
        pHead.next = deleteDuplication(pHead.next);
        return pHead;
      }
    }
```

时间复杂度：O(n)

空间复杂度：O(1)

## 考察点



- 链表
- 考虑问题的全面性



# 数组_把数组排成最小的数

## 题目

输入一个正整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。

例如输入数组`{3，32，321}`，则打印出这三个数字能排成的最小数字为`321323`。

## 思路

定义一种新的排序规则，将整个数组重新排序：

`a`和`b`两个数字可以有两种组合：`ab`和`ba`，若`ab<ba`则`ab`应该排在`ba`前面，否则`ab`应该排在`ba`后面。

使用数组的`sort`方法，底层是快排，也可以手写一个快排。

> `sort`方法接收一个比较函数，`compareFunction`：如果 `compareFunction(a, b)` 小于 `0` ，那么 `a` 会被排列到 `b` 之前；

## 代码

```js
    function PrintMinNumber(numbers) {
      if (!numbers || numbers.length === 0) {
        return "";
      }
      return numbers.sort(compare).join('');
    }

    function compare(a, b) {
      const front = "" + a + b;
      const behind = "" + b + a;
      return front - behind;
    }
```



# 数组_第一个只出现一次的字符

## 题目

在一个字符串(`0<=字符串长度<=10000`，全部由字母组成)中找到第一个只出现一次的字符,并返回它的位置, 如果没有则返回`-1`（需要区分大小写）。

## 思路

### 思路1:

用一个`map`存储每个字符出现的字数

第一次循环存储次数，第二次循环找到第一个出现一次的字符。

时间复杂度`O(n)`、空间复杂度`O(n)`

### 思路二：

使用`js`的`array`提供的`indexOf`和`lastIndexOf`方法

遍历字符串，比较每个字符第一次和最后一次出现的位置是否相同。

`indexOf`的时间复杂度为`O(n)`，所以整体的时间复杂度为O(n2)，空间复杂度为`0`。

## 代码

### 思路1:

```js
    function FirstNotRepeatingChar(str) {
      if (!str) {
        return -1;
      }
      let countMap = {};
      const array = str.split('');
      const length = str.length;
      for (let i = 0; i < length; i++) {
        const current = array[i];
        let count = countMap[current];
        if (count) {
          countMap[current] = count + 1;
        } else {
          countMap[current] = 1;
        }
      }
      for (let i = 0; i < length; i++) {
        if (countMap[array[i]] === 1) {
          return i;
        }
      }
      return -1;
    }
```

### 思路二：

```js
    function FirstNotRepeatingChar(str) {
      // write code here
      for (var i = 0; i < str.length; i++) {
        if (str.indexOf(str[i]) == str.lastIndexOf(str[i])) {
          return i;
        }
      }
      return -1;
    }
```



# 数组_调整数组顺序使奇数位于偶数前面

## 题目

输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有的奇数位于数组的前半部分，所有的偶数位于数组的后半部分

## 思路

设定两个指针

第一个指针start从数组第一个元素出发，向尾部前进

第二个指针end从数组的最后一个元素出发，向头部前进

start遍历到偶数，end遍历到奇数时，交换两个数的位置

当start>end时，完成交换

## 代码

```js
    function reOrderArray(array) {
      if (Array.isArray(array)) {
        let start = 0;
        let end = array.length - 1;
        while (start < end) {
          while (array[start] % 2 === 1) {
            start++;
          }
          while (array[end] % 2 === 0) {
            end--;
          }
          if (start < end) {
            [array[start], array[end]] = [array[end], array[start]]
          }
        }
      }
      return array;
    }
```

> 若需要保证相对顺序不变，则不能用上面的写法，需要让两个指针同时从左侧开始



# 数组_构建乘积数组

## 题目

给定一个数组A`[0,1,...,n-1]`,请构建一个数组B`[0,1,...,n-1]`,其中B中的元素`B[i]=A[0]*A[1]*...*A[i-1]*A[i+1]*...*A[n-1]`。不能使用除法。

## 思路

`B[i]`的值是`A`数组所有元素的乘积再除以`A[i]`，但是题目中给定不能用除法，我们换一个思路，将`B[i]`的每个值列出来，如下图：

![img](https://s.poetries.top/gitee/2020/09/img/%E6%9E%84%E5%BB%BA%E4%B9%98%E7%A7%AF%E6%95%B0%E7%BB%84.png)

`B[i]`的值可以看作下图的矩阵中每行的乘积。

可以将`B`数组分为上下两个三角，先计算下三角，然后把上三角乘进去。

## 代码

```js
    function multiply(array) {
      const result = [];
      if (Array.isArray(array) && array.length > 0) {
        // 计算下三角
        result[0] = 1;
        for (let i = 1; i < array.length; i++) {
          result[i] = result[i - 1] * array[i - 1];
        }
        // 乘上三角
        let temp = 1;
        for (let i = array.length - 2; i >= 0; i--) {
          temp = temp * array[i + 1];
          result[i] = result[i] * temp;
        }
      }
      return result;
    }
```



# 数组_和为S的连续正整数序列

## 题目

输入一个正数`S`，打印出所有和为S的连续正数序列。

例如：输入`15`，有序`1+2+3+4+5` = `4+5+6` = `7+8` = `15` 所以打印出3个连续序列`1-5`，`5-6`和`7-8`。

## 思路

- 创建一个容器`child`，用于表示当前的子序列，初始元素为`1,2`
- 记录子序列的开头元素`small`和末尾元素`big`
- `big`向右移动子序列末尾增加一个数 `small`向右移动子序列开头减少一个数
- 当子序列的和大于目标值，`small`向右移动，子序列的和小于目标值，`big`向右移动

## 代码

```js
    function FindContinuousSequence(sum) {
      const result = [];
      const child = [1, 2];
      let big = 2;
      let small = 1;
      let currentSum = 3;
      while (big < sum) {
        while (currentSum < sum && big < sum) {
          child.push(++big);
          currentSum += big;
        }
        while (currentSum > sum && small < big) {
          child.shift();
          currentSum -= small++;
        }
        if (currentSum === sum && child.length > 1) {
          result.push(child.slice());
          child.push(++big);
          currentSum += big;
        }
      }
      return result;
    }
```



# 数组_和为S的两个数字

## 题目

输入一个递增排序的数组和一个数字`S`，在数组中查找两个数，使得他们的和正好是`S`，如果有多对数字的和等于`S`，输出两个数的乘积最小的。

## 思路

> 数组中可能有多对符合条件的结果，而且要求输出乘积最小的，说明要分布在两侧 比如 `3,8` `5,7` 要取`3,8`。

看了题目了，很像`leetcode`的第一题【两数之和】，但是题目中有一个明显不同的条件就是数组是有序的，可以使用使用大小指针求解，不断逼近结果，最后取得最终值。

- 设定一个小索引`left`，从`0`开始
- 设定一个大索引`right`，从`array.length`开始
- 判断`array[left] + array[right]`的值`s`是否符合条件
- 符合条件 - 返回
- 大于`sum`，`right`向左移动
- 小于`sum`，`left`向右移动
- 若`left=right`，没有符合条件的结果

> 类似【两数之和】的解法来求解，使用`map`存储另已经遍历过的`key`，这种解法在有多个结果的情况下是有问题的，因为这样优先取得的结果是乘积较大的。例如 `3,8` `5,7` ，会优先取到`5,7`。

## 代码

```js
    function FindNumbersWithSum(array, sum) {
      if (array && array.length > 0) {
        let left = 0;
        let right = array.length - 1;
        while (left < right) {
          const s = array[left] + array[right];
          if (s > sum) {
            right--;
          } else if (s < sum) {
            left++;
          } else {
            return [array[left], array[right]]
          }
        }
      }
      return [];
    }
```



# 数组_连续子数组的最大和

## 题目

输入一个整型数组，数组里有正数也有负数。数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值，要求时间复杂度为`O(n)`

例如:`{6,-3,-2,7,-15,1,2,2}`,连续子向量的最大和为8(从第0个开始,到第3个为止)。

## 思路

记录一个当前连续子数组最大值 `max` 默认值为数组第一项

记录一个当前连续子数组累加值 `sum` 默认值为数组第一项

1.从数组第二个数开始，若 `sum<0` 则当前的`sum`不再对后面的累加有贡献，`sum = 当前数`

2.若 `sum>0` 则`sum = sum + 当前数`

3.比较 `sum` 和 `max` ，`max = 两者最大值`

## 代码

```js
    function FindGreatestSumOfSubArray(array) {
      if (Array.isArray(array) && array.length > 0) {
        let sum = array[0];
        let max = array[0];
        for (let i = 1; i < array.length; i++) {
          if (sum < 0) {
            sum = array[i];
          } else {
            sum = sum + array[i];
          }
          if (sum > max) {
            max = sum;
          }
        }
        return max;
      }
      return 0;
    }
```



# 数组_两数之和

## 题目

给定一个整数数组 `nums` 和一个目标值 `target`，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

示例:

```js
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```

## 思路

使用一个`map`将遍历过的数字存起来，值作为`key`，下标作为值。

对于每一次遍历：

- 取`map`中查找是否有`key`为`target-nums[i]`的值
- 如果取到了，则条件成立，返回。
- 如果没有取到，将当前值作为`key`，下标作为值存入`map`

时间复杂度：`O(n)`

空间复杂度`O(n)`

## 代码

```js
    var twoSum = function (nums, target) {
      const map = {};
      if (Array.isArray(nums)) {
        for (let i = 0; i < nums.length; i++) {
          if (map[target - nums[i]] != undefined) {
            return [map[target - nums[i]], i];
          } else {
            map[nums[i]] = i;
          }
        }
      }
      return [];
    };
```



# 数组_扑克牌顺子

## 题目

扑克牌中随机抽`5`张牌，判断是不是一个顺子，即这`5`张牌是不是连续的。

`2-10`为数字本身，`A`为`1`，`J`为`11...`大小王可以看成任何数字，可以把它当作`0`处理。

## 思路

- 1.数组排序
- 2.遍历数组
- 3.若为`0`，记录`0`的个数加`1`
- 4.若不为`0`，记录和下一个元素的间隔
- 5.最后比较`0`的个数和间隔数，间隔数`>0`的个数则不能构成顺子
- 6.注意中间如果有两个元素相等则不能构成顺子

## 代码

```js
    function IsContinuous(numbers) {
      if (numbers && numbers.length > 0) {
        numbers.sort();
        let kingNum = 0;
        let spaceNum = 0;
        for (let i = 0; i < numbers.length - 1; i++) {
          if (numbers[i] === 0) {
            kingNum++;
          } else {
            const space = numbers[i + 1] - numbers[i];
            if (space == 0) {
              return false;
            } else {
              spaceNum += space - 1;
            }
          }
        }
        return kingNum - spaceNum >= 0;
      }
      return false;
    }
```



# 数组_三数之和

## 题目

给定一个包含 `n` 个整数的数组`nums`，判断 `nums` 中是否存在三个元素`a，b，c` ，使得 `a + b + c = 0 ？`找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。

```js
例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]
```

## 思路

题目中说明可能会出现多组结果，所以我们要考虑好去重

- 1.为了方便去重，我们首先将数组排序
- 2.对数组进行遍历，取当前遍历的数`nums[i]`为一个基准数，遍历数后面的数组为寻找数组
- 3.在寻找数组中设定两个起点，最左侧的`left`(`i+1`)和最右侧的`right`(`length-1`)
- 4.判断`nums[i] + nums[left] + nums[right]`是否等于0，如果等于0，加入结果，并分别将`left`和`right`移动一位
- 5.如果结果大于0，将`right`向左移动一位，向结果逼近
- 5.如果结果小于0，将`left`向右移动一位，向结果逼近

注意整个过程中要考虑去重

## 代码

```js
    var threeSum = function (nums) {
      const result = [];
      nums.sort((a, b) => a - b);
      for (let i = 0; i < nums.length; i++) {
        // 跳过重复数字
        if (i && nums[i] === nums[i - 1]) { continue; }
        let left = i + 1;
        let right = nums.length - 1;
        while (left < right) {
          const sum = nums[i] + nums[left] + nums[right];
          if (sum > 0) {
            right--;
          } else if (sum < 0) {
            left++;
          } else {
            result.push([nums[i], nums[left++], nums[right--]]);
            // 跳过重复数字
            while (nums[left] === nums[left - 1]) {
              left++;
            }
            // 跳过重复数字
            while (nums[right] === nums[right + 1]) {
              right--;
            }
          }
        }
      }
      return result;
    }
```



# 数组

数组是我们在开发中最常见到的数据结构了，用于按顺序存储元素的集合。但是元素可以随机存取，因为数组中的每个元素都可以通过数组索引来识别。插入和删除时要移动后续元素，还要考虑扩容问题，插入慢。

数组与日常的业务开发联系非常紧密，如何巧妙的用好数组是我们能否开发出高质量代码的关键。

### 双指针

> 上面链表中提到的一类题目，主要是利用两个或多个不同位置的指针，通过速度和方向的变换解决问题。注意这种技巧经常在排序数组中使用。

- [调整数组顺序使奇数位于偶数前面(opens new window)](https://www.conardli.top/docs/dataStructure/数组/调整数组顺序使奇数位于偶数前面.html)
- [和为S的两个数字(opens new window)](https://www.conardli.top/docs/dataStructure/数组/和为S的两个数字.html)
- [和为S的连续正整数序列(opens new window)](https://www.conardli.top/docs/dataStructure/数组/和为S的连续正整数序列.html)

### N数之和问题

> 非常常见的问题，基本上都是一个套路，主要考虑如何比暴利法降低时间复杂度，而且也会用到上面的双指针技巧

- [两数之和(opens new window)](https://www.conardli.top/docs/dataStructure/数组/两数之和.html)
- [三数之和(opens new window)](https://www.conardli.top/docs/dataStructure/数组/三数之和.html)
- [四数之和(opens new window)](https://www.conardli.top/docs/dataStructure/数组/四数之和.html)

### 二维数组

> 建立一定的抽象建模能力，将实际中的很多问题进行抽象

- [构建乘积数组(opens new window)](https://www.conardli.top/docs/dataStructure/数组/构建乘积数组.html)
- [顺时针打印矩阵(opens new window)](https://www.conardli.top/docs/dataStructure/数组/顺时针打印矩阵.html)

### 数据统计

> 数组少不了的就是统计和计算，此类问题考察如何用更高效的方法对数组进行统计计算。

- [数组中出现次数超过数组长度一半的数字(opens new window)](https://www.conardli.top/docs/dataStructure/数组/数组中出现次数超过数组长度一半的数字.html)
- [连续子数组的最大和(opens new window)](https://www.conardli.top/docs/dataStructure/数组/连续子数组的最大和.html)
- [扑克牌顺子(opens new window)](https://www.conardli.top/docs/dataStructure/数组/扑克牌顺子.html)
- [第一个只出现一次的字符(opens new window)](https://www.conardli.top/docs/dataStructure/数组/第一个只出现一次的字符.html)

# 数组_数组中出现次数超过数组长度一半的数字

## 题目

数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。例如输入一个长度为9的数组{1,2,3,2,2,2,5,4,2}。由于数字2在数组中出现了5次，超过数组长度的一半，因此输出2。如果不存在则输出0。

## 代码

解法1:

开辟一个额外空间存储每个值出现的次数，时间复杂度最大为O(n)，逻辑简单

```js
    function MoreThanHalfNum_Solution(numbers) {
      if (numbers && numbers.length > 0) {
        var length = numbers.length;
        var temp = {};
        for (var i = 0; i < length; i++) {
          if (temp['s' + numbers[i]]) {
            temp['s' + numbers[i]]++;
          } else {
            temp['s' + numbers[i]] = 1;
          }
          if (temp['s' + numbers[i]] > length / 2) {
            return numbers[i];
          }
        }
        return 0;
      }
    }
```

解法2:

目标值的个数比其他所有值加起来的数多

记录两个变量 1.数组中的某个值 2.次数

1.当前遍历值和上一次遍历值相等？次数+1 ： 次数-1。

2.次数变为0后保存新的值。

3.遍历结束后保存的值,判断其是否复合条件

事件复杂度O(n) 不需要开辟额外空间 , 逻辑稍微复杂。

```js
    function MoreThanHalfNum_Solution(numbers) {
      if (numbers && numbers.length > 0) {
        var target = numbers[0];
        var count = 1;
        for (var i = 1; i < numbers.length; i++) {
          if (numbers[i] === target) {
            count++;
          } else {
            count--;
          }
          if (count === 0) {
            target = numbers[i];
            count = 1;
          }
        }
        count = 0;
        for (var i = 0; i < numbers.length; i++) {
          if (numbers[i] === target) count++;
        }
        return count > numbers.length / 2 ? target : 0;
      }
    }
```

# 数组_数组中的逆序对

## 题目

在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组,求出这个数组中的逆序对的总数P。

## 思路

使用暴力法：从第一个数开始，依次和后面每一个数字进行比较记录逆序对的个数，时间复杂度O(n2)

使用分治的细想：

若没了解过归并排序，建议先熟悉[归并排序](https://interview.poetries.top/fe-algorithm-docs/算法分类/排序/归并排序.html)算法再来看本题。

直接将归并排序进行改进，把数据分成`N`个小数组。

合并数组 `left - mid` , `mid+1 - right`，合并时， 若`array[leftIndex] > array[rightIndex]` ,则比右边 `rightIndex-mid`个数大

```
count += rightIndex-mid
```

注意和归并排序的区别： 归并排序是合并数组数从小数开始，而本题是从大数开始。

时间复杂度`O(nlogn)`

空间复杂度`O(n)`

## 代码

```js
    function InversePairs(data) {
      return mergeSort(data, 0, data.length - 1, []);
    }

    function mergeSort(array, left, right, temp) {
      if (left < right) {
        const mid = parseInt((left + right) / 2);
        const l = mergeSort(array, left, mid, temp);
        const r = mergeSort(array, mid + 1, right, temp);
        const m = merge(array, left, right, mid, temp);
        return l + m + r;
      } else {
        return 0;
      }
    }

    function merge(array, left, right, mid, temp) {
      let leftIndex = mid;
      let rightIndex = right;
      let tempIndex = right - left;
      let count = 0;
      while (leftIndex >= left && rightIndex > mid) {
        if (array[leftIndex] > array[rightIndex]) {
          count += (rightIndex - mid);
          temp[tempIndex--] = array[leftIndex--];
        } else {
          temp[tempIndex--] = array[rightIndex--];
        }
      }
      while (leftIndex >= left) {
        temp[tempIndex--] = array[leftIndex--];
      }
      while (rightIndex > mid) {
        temp[tempIndex--] = array[rightIndex--];
      }
      tempIndex = 0;
      for (let i = left; i <= right; i++) {
        array[i] = temp[tempIndex++];
      }
      return count;
    }
```

## 考察点

- 数组
- 分治



# 数组_顺时针打印矩阵

## 题目

输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。

例如，如果输入如下4 X 4矩阵：

```text
1 2 3 4 
5 6 7 8
9 10 11 12 
13 14 15 16 
```

则依次打印出数字`1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10.`

## 思路

![img](https://s.poetries.top/gitee/2020/09/img/%E9%A1%BA%E6%97%B6%E9%92%88%E6%89%93%E5%8D%B0%E7%9F%A9%E9%98%B5.png)

借助图形思考，将复杂的矩阵拆解成若干个圈，循环打印矩阵，每次打印其中一个圈

设起点坐标为`(start,start)`，矩阵的行数为`rows`，矩阵的列数为`columns`

循环结束条件为 `rows>start*2` 并且 `columns>start*2`

将打印一圈拆解为四部，

- 第一步：从左到右打印一行
- 第二步：从上到下打印一列
- 第三步：从右到左打印一行
- 第四步：从下到上打印一列

最后一圈很有可能出现几种异常情况,打印矩阵最里面一圈可能只需三步、两步、甚至一步

![img](https://s.poetries.top/gitee/2020/09/img/%E6%89%93%E5%8D%B0%E7%9F%A9%E9%98%B5%E5%BC%82%E5%B8%B8%E6%83%85%E5%86%B5.png)

所以在每一行打印时要做好条件判断:

能走到最后一圈，从左到右必定会打印

结束行号大于开始行号，需要从上到下打印

结束列号大于开始列号，需要从右到左打印

结束行号大于开始行号+1，需要从下到上打印

## 代码

```js
    // 顺时针打印
    function printMatrix(matrix) {
      var start = 0;
      var rows = matrix.length;
      var coloums = matrix[0].length;
      var result = [];
      if (!rows || !coloums) {
        return false;
      }
      while (coloums > start * 2 && rows > start * 2) {
        printCircle(matrix, start, coloums, rows, result);
        start++;
      }
      return result;
    }

    // 打印一圈
    function printCircle(matrix, start, coloums, rows, result) {
      var entX = coloums - start - 1;
      var endY = rows - start - 1;
      for (var i = start; i <= entX; i++) {
        result.push(matrix[start][i]);
      }
      if (endY > start) {
        for (var i = start + 1; i <= endY; i++) {
          result.push(matrix[i][entX]);
        }
        if (entX > start) {
          for (var i = entX - 1; i >= start; i--) {
            result.push(matrix[endY][i]);
          }
          if (endY > start + 1) {
            for (var i = endY - 1; i > start; i--) {
              result.push(matrix[i][start]);
            }
          }
        }
      }
    }
`` `
```



# 数组_四数之和

## 题目

给定一个包含 `n` 个整数的数组`nums`，判断 `nums` 中是否存在四个元素`a，b，c，d` ，使得 `a + b + c + d = 0 ？`找出所有满足条件且不重复的四元组。

注意：答案中不可以包含重复的四元组。

```js
给定数组 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。

满足要求的四元组集合为：
[
  [-1,  0, 0, 1],
  [-2, -1, 1, 2],
  [-2,  0, 0, 2]
]
```

## 思路

你已经经历了两数之和、三数之和，玩玩没想到，还有四数之和...

其实，后面还有五数之和，六数之和...

到这里其实我们就能发现一些规律，我们可以像[三数之和 (opens new window)](https://github.com/ConardLi/awesome-coding-js/blob/master/数据结构分类/数组/三数之和.md)那样，我们可以通过大小指针来逼近结果，从而达到降低一层时间复杂度的效果。

不管是几数之和，我们都用这种方法来进行优化。

## 代码

```js
var fourSum = function (nums, target) {
    if (nums.length < 4) {
        return [];
    }
    nums.sort((a, b) => a - b);
    const result = [];
    for (let i = 0; i < nums.length - 3; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) {
            break;
        }
        for (let j = i + 1; j < nums.length - 2; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) {
                continue;
            }
            let left = j + 1,
                right = nums.length - 1;
            while (left < right) {
                const sum = nums[i] + nums[j] + nums[left] + nums[right];
                if (sum === target) {
                    result.push([nums[i], nums[j], nums[left], nums[right]]);
                }
                if (sum <= target) {
                    while (nums[left] === nums[++left]);
                } else {
                    while (nums[right] === nums[--right]);
                }
            }
        }
    }
    return result;
};
```



# 数组_在排序数组中查找数字

## 题目

统计一个数字在排序数组中出现的次数。

## 思路

本道题有好几种解法

- 1.直接遍历数组，判断前后的值是否相同，找到元素开始位置和结束位置，时间复杂度`O(n)`
- 2.使用二分查找找到目标值，在向前向后遍历，找到所有的数，比上面略优，时间复杂度也是`O(n)`
- 3.使用二分查找分别找到第一个目标值出现的位置和最后一个位置，时间复杂度`O(logn)`

## 代码

在排序数组中找元素，首先考虑使用二分查找

下面是使用二分查找在数组中寻找某个数

```js
        function binarySearch(data, arr, start, end) {
            if (start > end) {
                return -1;
            }
            var mid = Math.floor((end + start) / 2);
            if (data == arr[mid]) {
                return mid;
            } else if (data < arr[mid]) {
                return binarySearch(data, arr, start, mid - 1);
            } else {
                return binarySearch(data, arr, mid + 1, end);
            }
        }
```

找到第一次和最后一次出现的位置我们只需要对上面的代码进行稍加的变形

第一次位置：找到目标值，并且前一位的数字和当前值不相等

最后一次位置：找到目标值，并且后一位的数字和当前值不相等

```js
    function GetNumberOfK(data, k) {
      if (data && data.length > 0 && k != null) {
        const firstIndex = getFirstK(data, 0, data.length - 1, k);
        const lastIndex = getLastK(data, 0, data.length - 1, k);
        if (firstIndex != -1 && lastIndex != -1) {
          return lastIndex - firstIndex + 1;
        }
      }
      return 0;
    }

    function getFirstK(data, first, last, k) {
      if (first > last) {
        return -1;
      }
      const mid = parseInt((first + last) / 2);
      if (data[mid] === k) {
        if (data[mid - 1] != k) {
          return mid;
        } else {
          return getFirstK(data, first, mid-1, k);
        }
      } else if (data[mid] > k) {
        return getFirstK(data, first, mid - 1, k);
      } else if (data[mid] < k) {
        return getFirstK(data, mid + 1, last, k);
      }
    }

    function getLastK(data, first, last, k) {
      if (first > last) {
        return -1;
      }
      const mid = parseInt((first + last) / 2);
      if (data[mid] === k) {
        if (data[mid + 1] != k) {
          return mid;
        } else {
          return getLastK(data, mid + 1, last, k);
        }
      } else if (data[mid] > k) {
        return getLastK(data, first, mid - 1, k);
      } else if (data[mid] < k) {
        return getLastK(data, mid + 1, last, k);
      }
    }
```

## 考察点

- 数组
- 二分查找



# 栈和队列_包含min函数的栈

## 包含min函数的栈

定义栈的数据结构，请在该类型中实现一个能够得到栈中所含最小元素的min函数（时间复杂度应为O（1））。

## 思路

1.定义两个栈，一个栈用于存储数据，另一个栈用于存储每次数据进栈时栈的最小值.

2.每次数据进栈时，将此数据和最小值栈的栈顶元素比较，将二者比较的较小值再次存入最小值栈.

4.数据栈出栈，最小值栈也出栈。

3.这样最小值栈的栈顶永远是当前栈的最小值。

以数据[3,4,2,7,9,0]为例，让这组数字依次如栈，则栈和其对应的最小值栈如下：

![img](https://s.poetries.top/gitee/2020/09/img/mainstack.png)

## 代码

```js
var dataStack = [];
var minStack = [];
 
function push(node)
{
    dataStack.push(node);
    if(minStack.length === 0 ||  node < min()){
        minStack.push(node);
    }else{
        minStack.push(min());
    }
}
function pop()
{
    minStack.pop();
    return dataStack.pop();
}
function top()
{
    var length = dataStack.length;
    return length>0&&dataStack[length-1]
}
function min()
{
    var length = minStack.length;
    return length>0&&minStack[length-1]
}
```



# 栈和队列_滑动窗口的最大值

## 题目

给定一个数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口 k 内的数字。滑动窗口每次只向右移动一位。 返回滑动窗口最大值。

```js
输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
输出: [3,3,5,5,6,7] 
解释: 
  滑动窗口的位置                最大值
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
```

## 思路

使用一个双端队列（队列两面都可进出），用于存储处于窗口中的值的下标，保证窗口头部元素永远是窗口最大值

- 1.当前进入的元素下标 - 窗口头部元素的下标 >= k 头部元素移出队列
- 2.如果当前数字大于队列尾，则删除队列尾，直到当前数字小于等于队列尾，或者队列空 （保证窗口中左侧的值均大于当前入队列的值，这样做可以保证当下次循环窗口头部的元素出队后，窗口头部元素仍然为最大值）
- 3.队列元素入队
- 4.第k次遍历后开始向结果中添加最大值

![img](https://s.poetries.top/gitee/2020/09/img/%E6%BB%91%E5%8A%A8%E7%AA%97%E5%8F%A3%E7%9A%84%E6%9C%80%E5%A4%A7%E5%80%BC.png)

时间复杂度：`O(n)`

空间复杂度：`O(n)`

- 使用优先队列也可以实现，时间复杂度为`O(nlogk)`

## 代码

```js
    var maxSlidingWindow = function (nums, k) {
      const window = [];
      const result = [];
      for (let i = 0; i < nums.length; i++) {
        if (i - window[0] > k - 1) {
          window.shift();
        }
        let j = window.length - 1;
        while (j >= 0 && nums[window[j]] <= nums[i]) {
          j--;
          window.pop();
        }
        window.push(i);
        if (i >= k - 1) {
          result.push(nums[window[0]]);
        }
      }
      return result;
    };
```

## 考察点

- 队列



# 栈和队列_用两个栈实现队列

## 题目

用两个栈来实现一个队列，完成队列的Push和Pop操作。 队列中的元素为int类型。

## 思路

**栈1:**

用于入队列存储

**栈2:**

出队列时将栈1的数据依次出栈，并入栈到栈2中

栈2出栈即栈1的底部数据即队列要出的数据。

**注意:**

栈2为空才能补充栈1的数据，否则会打乱当前的顺序。

![img](https://s.poetries.top/gitee/2020/09/img/queue.png)

## 代码

```js
const stack1 = [];
const stack2 = [];

function push(node)
{
    stack1.push(node);
}
function pop()
{
    if(stack2.length === 0){
       while(stack1.length>0){
        stack2.push(stack1.pop());
       }
    }
    return stack2.pop() || null;
}
```

## 扩展：用两个队列实现一个栈

```js
    const queue1 = []
    const queue2 = []

    function push(x) {
      if (queue1.length === 0) {
        queue1.push(x)

        while (queue2.length) {
          queue1.push(queue2.shift())
        }
      } else if (queue2.length === 0) {
        queue2.push(x)

        while (queue1.length) {
          queue2.push(queue1.shift())
        }
      }
    };

    function pop() {
      if (queue1.length !== 0) {
        return queue1.shift()
      } else {
        return queue2.shift()
      }
    };
```



# 栈和队列_栈的压入弹出序列

## 栈的压入、弹出序列

输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否可能为该栈的弹出顺序。假设压入栈的所有数字均不相等。例如序列`1,2,3,4,5`是某栈的压入顺序，序列`4,5,3,2,1`是该压栈序列对应的一个弹出序列，但`4,3,5,1,2`就不可能是该压栈序列的弹出序列。（注意：这两个序列的长度是相等的）

## 思路

1.借助一个辅助栈来模拟压入、弹出的过程。

2.设置一个索引`idx`，记录`popV`（出栈序列）栈顶的位置

3.将`pushV`（压入顺序）中的数据依次入栈。

4.当辅助栈栈顶元素和压`popV`栈顶元素相同时，辅助栈出栈。每次出栈索引`idx`+1。

5.出栈有可能在任意一次入栈后进行，当辅助栈栈顶元素和压`popV`栈顶元素相同时，继续让`pushV`入辅助栈。

6.当所有数据入栈完成，如果出栈顺序正确，那么辅助栈应该为空。

![img](https://s.poetries.top/gitee/2020/09/img/%E6%A0%88%E7%9A%84%E5%8E%8B%E5%85%A5%E5%BC%B9%E5%87%BA%E5%BA%8F%E5%88%97.png)

## 代码

```js
    function IsPopOrder(pushV, popV) {
      if (!pushV || !popV || pushV.length == 0 || popV.length == 0) {
        return;
      }
      var stack = [];
      var idx = 0;
      for (var i = 0; i < pushV.length; i++) {
        stack.push(pushV[i]);
        while (stack.length && stack[stack.length - 1] == popV[idx]) {
          stack.pop();
          idx++;
        }
      }
      return stack.length == 0;
    }
```



# 字符串_表示数值的字符串

## 题目

请实现一个函数用来判断字符串是否表示数值（包括整数和小数）。 例如，字符串"+100","5e2","-123","3.1416"和"-1E-16"都表示数值。 但是"12e","1a3.14","1.2.3","+-5"和"12e+4.3"都不是。

## 思路

考虑完全所有情况

- 1.只能出现数字、符号位、小数点、指数位
- 2.小数点，指数符号只能出现一次、且不能出现在开头结尾
- 3.指数位出现后，小数点不允许在出现
- 4.符号位只能出现在开头和指数位后面

## 代码

```js
    function isNumeric(s) {
      if (s == undefined) {
        return false;
      }
      let hasPoint = false;
      let hasExp = false;
      for (let i = 0; i < s.length; i++) {
        const target = s[i];
        if (target >= 0 && target <= 9) {
          continue;
        } else if (target === 'e' || target === 'E') {
          if (hasExp || i === 0 || i === s.length - 1) {
            return false;
          } else {
            hasExp = true;
            continue;
          }
        } else if (target === '.') {
          if (hasPoint || hasExp || i === 0 || i === s.length - 1) {
            return false;
          } else {
            hasPoint = true;
            continue;
          }
        } else if (target === '-' || target === '+') {
          if (i === 0 || s[i - 1] === 'e' || s[i - 1] === 'E') {
            continue;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
      return true;
    }
```

## 考察点

- 字符串
- 考虑问题的全面性
- 程序的完整性



# 字符串_替换空格

## 题目

请实现一个函数，将一个字符串中的每个空格替换成`“%20”`。例如，当字符串为`We Are Happy`。则经过替换之后的字符串为`We%20Are%20Happy`。

## 代码

1.直接用空格将字符串切割成数组，再用`20%`进行连接。

```js
function replaceSpace(str)
{
    return str.split(' ').join('%20');
}
```

2.用正则表达式找到所有空格依次替换

```js
function replaceSpace(str)
{
    return str.replace(/\s/g,'%20');
}
```

## 拓展

允许出现多个空格，多个空格用一个`20%`替换：

用正则表达式找到连续空格进行替换

```js
function replaceSpace(str)
{
    return str.replace(/\s+/g,'%20');
}
```

## 考察点

- 字符串
- 正则



# 字符串_正则表达式匹配

## 题目

请实现一个函数用来匹配包括'.'和'*'的正则表达式。 模式中的字符'.'表示任意一个字符，而'*'表示它前面的字符可以出现任意次（包含0次）。 在本题中，匹配是指字符串的所有字符匹配整个模式。 例如，字符串"aaa"与模式"a.a"和"ab*ac*a"匹配，但是与"aa.a"和"ab*a"均不匹配。

## 思路

当模式中的第二个字符不是“*”时：

- 1、如果字符串第一个字符和模式中的第一个字符相匹配，那么字符串和模式都后移一个字符，然后匹配剩余的。
- 2、如果 字符串第一个字符和模式中的第一个字符相不匹配，直接返回false。

而当模式中的第二个字符是“*”时：

- 如果字符串第一个字符跟模式第一个字符不匹配，则模式后移2个字符，继续匹配。

如果字符串第一个字符跟模式第一个字符匹配，可以有3种匹配方式：

- 1、模式后移2字符，相当于x*被忽略；
- 2、字符串后移1字符，模式后移2字符；
- 3、字符串后移1字符，模式不变，即继续匹配字符下一位，因为*可以匹配多位；

## 代码

```js
    function match(s, pattern) {
      if (s == undefined || pattern == undefined) {
        return false;
      }
      return matchStr(s, pattern, 0, 0);
    }

    function matchStr(s, pattern, sIndex, patternIndex) {
      if (sIndex === s.length && patternIndex === pattern.length) {
        return true;
      }
      if (sIndex !== s.length && patternIndex === pattern.length) {
        return false;
      }
      if (patternIndex + 1 < pattern.length && pattern[patternIndex + 1] === '*') {
        if (sIndex < s.length && (s[sIndex] === pattern[patternIndex] || pattern[patternIndex] === '.')) {
          return matchStr(s, pattern, sIndex, patternIndex + 2) ||
            matchStr(s, pattern, sIndex + 1, patternIndex + 2) ||
            matchStr(s, pattern, sIndex + 1, patternIndex);
        } else {
          return matchStr(s, pattern, sIndex, patternIndex + 2)
        }
      }
      if (sIndex < s.length && (s[sIndex] === pattern[patternIndex] || pattern[patternIndex] === '.')) {
        return matchStr(s, pattern, sIndex + 1, patternIndex + 1)
      }
      return false;
    }
```

## 考察点

- 字符串
- 正则表达式
- 考虑问题的全面性
- 程序的完整性



# 字符串_字符串的排列

## 题目

输入一个字符串,按字典序打印出该字符串中字符的所有排列。例如输入字符串`abc`,则打印出由字符`a,b,c`所能排列出来的所有字符串`abc,acb,bac,bca,cab`和`cba`。

## 思路

使用回溯法

记录一个字符（`temp`），用于存储当前需要进入排列的字符

记录一个字符串（`current`），用于记录当前已经排列好的字符

记录一个队列（`queue`），用于存储还未被排列的字符

- 每次排列将`temp`添加到`current`
- 如果`queue`为空，则本次排列完成，将`curret`加入到结果数组中，结束递归
- 如果`queue`不为空，说明还有未排列的字符
- 递归排列`queue`中剩余的字符
- 为了不影响后续排列，每次递归完成，将当前递归的字符`temp`加回队列

## 代码

> 记录一个当前排列字符temp

```js
    function Permutation(str) {
      const result = [];
      if (str) {
        queue = str.split('')
        PermutationCore(queue, result);
      }
      result.sort();
      return [... new Set(result)];
    }

    function PermutationCore(queue, result, temp = "", current = "") {
      current += temp;
      if (queue.length === 0) {
        result.push(current);
        return;
      }
      for (let i = 0; i < queue.length; i++) {
        temp = queue.shift();
        PermutationCore(queue, result, temp, current);
        queue.push(temp);
      }
    }
```

> 记录一个当前索引，不断交换数组中的元素（不太好理解，不推荐）

```js
    function Permutation(str) {
      var result = [];
      if (!str) {
        return result;
      }
      var array = str.split('');
      permutate(array, 0, result);
      result.sort();
      return [... new Set(result)];
    }

    function permutate(array, index, result) {
      if (array.length - 1 === index) {
        result.push(array.join(''));
      }
      for (let i = index; i < array.length; i++) {
        swap(array, index, i);
        permutate(array, index + 1, result);
        swap(array, i, index);
      }
    }
```

## 考察点

- 字符串
- 回溯算法



# 字符串_字符串翻转

## 题目1-翻转单词顺序

输入一个英文句子，翻转句子中单词的顺序，但单词内字符的顺序不变。为简单起见，标点符号和普通字母一样处理。例如输入字符串`"I am a student."`，则输出`"student. a am I"`。

## 代码

直接调用数组`API`进行翻转，没啥好讲的。

```js
function ReverseSentence(str)
{
    if(!str){return ''}
    return str.split(' ').reverse().join(' ');
}
```

## 题目2-左旋转字符串

字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。请定义一个函数实现字符串左旋转操作的功能。比如输入字符串`"abcdefg"`和数字`2`，该函数将返回左旋转2位得到的结果`"cdefgab"`。

## 代码

将两个`str`进行拼接，直接从第`n`位开始截取，就相当于将前面`n`个数字移到末尾。

```js
function LeftRotateString(str, n)
{
    if(str&&n!=null){
       return (str+str).substr(n,str.length)
    }else{
        return ''
    }
}
```

## 剑指offer中的思路

上面两个问题都可以用简单的方法解决，《剑指offer》中的解法稍微有些复杂，我不推荐用，但是思路可以参考下：

### 翻转单词顺序：

- 第一步将整个字符串翻转，`"I am a student."` -> `".tneduts a ma I"`
- 第二步将字符串内的单个字符串进行翻转：`".tneduts a ma I"` -> `"student. a am I"`

### 左旋转字符串：

以`"abcdefg"`为例，将字符串分为两部分`ab`和`cdefg`

将两部分分别进行翻转，得到 -> `"bagfedc"`

再将整个字符串进行翻转，得到 -> `"cdefgab"`



# 字符串_字符流中第一个不重复的字符

# 题目

请实现一个函数用来找出字符流中第一个只出现一次的字符。例如，当从字符流中只读出前两个字符"go"时，第一个只出现一次的字符是"g"。 当从该字符流中读出前六个字符“google"时，第一个只出现一次的字符是"l"。

如果当前字符流没有存在出现一次的字符，返回#字符。

## 思路

要求获得第一个只出现一次的。

使用一个有序的存储结构为每个字符计数，再遍历这个对象，第一个出现次数为1的即为结果。

在JavaScript中有序存储空间选择对象即可。

上述解决办法是有问题的，因为在`JavaScript`中对象遍历并不是在所有浏览器中的实现都是有序的，而且直接使用对象存储，当字符流中出现数字时也是有问题的。

所以下面改用剑指offer中的解法：

- 创建一个长度为`256`的数组`container`来标记字符流中字符出现的次数
- 使用字符`ASCII`码作为下标，这样数组长度最大为`256`
- 当字符没有出现过，标记为`-1`
- 当字符只出现一次，标记为字符在字符流中的位置`index`
- 当字符出现多次时，标记为`-2`
- 当调用`FirstAppearingOnce`时，只需要找到，数组值大于`-1`的且值最小的位置索引，即为第一个出现次数为`1`的字符

## 代码

```js
    let container = new Array(256).fill(-1);
    let index = 0;
    function Init() {
      container = new Array(256).fill(-1);
      index = 0;
    }
    function Insert(ch) {
      const code = ch.charCodeAt(0);
      if (container[code] === -1) {
        container[code] = index;
      } else if (container[code] >= 0) {
        container[code] = -2;
      }
      index++;
    }
    function FirstAppearingOnce() {
      let minIndex = 256;
      let strIndex = 0;
      for (let i = 0; i < 256; i++) {
        if (container[i] >= 0 && container[i] < minIndex) {
          minIndex = container[i];
          strIndex = i;
        }
      }
      return minIndex === 256 ? '#' : String.fromCharCode(strIndex);
    }
```

## 考察点

- 字符串
- hash



# 算法分类

# 查找_二维数组查找

##  题目



在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

## 基本思路



二维数组是有序的，比如下面的数据：

```text
1 2 3
4 5 6
7 8 9
```

可以直接利用左下角数字开始查找：

大于：比较上移

小于：比较右移

## 代码思路



将二维数组看作平面坐标系

从左下角（0,arr.length-1）开始比较：

目标值大于坐标值---x坐标+1

目标值小于坐标值---y坐标-1

注意：

二维数组arr[i][j]中

j代表x坐标

i代表y坐标

## 代码



```js
    function Find(target, array) {
      let i = array.length - 1; // y坐标
      let j = 0; // x坐标
      return compare(target, array, i, j);
    }

    function compare(target, array, i, j) {
      if (array[i] === undefined || array[i][j] === undefined) {
        return false;
      }
      const temp = array[i][j];
      if (target === temp) {
        return true;
      }
      else if (target > temp) {
        return compare(target, array, i, j+1);
      }
      else if (target < temp) {
        return compare(target, array, i-1, j);
      }
    }
```

## 拓展：二分查找



二分查找的条件是必须有序。

和线性表的中点值进行比较，如果小就继续在小的序列中查找，如此递归直到找到相同的值。

```js
    function binarySearch(data, arr, start, end) {
        if (start > end) {
            return -1;
        }
        var mid = Math.floor((end + start) / 2);
        if (data == arr[mid]) {
            return mid;
        } else if (data < arr[mid]) {
            return binarySearch(data, arr, start, mid - 1);
        } else {
            return binarySearch(data, arr, mid + 1, end);
        }
    }
```

## 考察点



- 查找
- 数组



# 查找_旋转数组的最小数字

## 题目



把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。 输入一个非减排序的数组的一个旋转，输出旋转数组的最小元素。 例如数组`{3,4,5,1,2}`为`{1,2,3,4,5}`的一个旋转，该数组的最小值为1。

> NOTE：给出的所有元素都大于0，若数组大小为0，请返回0。

## 基本思路



肯定不能直接遍历，失去了这道题的意义

旋转数组其实是由两个有序数组拼接而成的，因此我们可以使用二分法，只需要找到拼接点即可。

(1)`array[mid] > array[high]`:

出现这种情况的`array`类似`[3,4,5,6,0,1,2]`，此时最小数字一定在mid的右边。 `low = mid + 1`

(2)`array[mid] == array[high]`:

出现这种情况的`array`类似 `[1,0,1,1,1]`或者`[1,1,1,0,1]`，此时最小数字不好判断在mid左边 还是右边,这时只好一个一个试 。 `high = high - 1`

(3)`array[mid] < array[high]`:

出现这种情况的`array`类似`[2,2,3,4,5,6,6]`,此时最小数字一定就是`array[mid]`或者在`mid`的左 边。因为右边必然都是递增的。 `high = mid`

## 代码



```js
function minNumberInRotateArray(arr)
{
    let len = arr.length;
    if(len == 0)  return 0;
    let low = 0, high = len - 1;
    while(low < high) {
        let mid = low + Math.floor((high-low)/2);
        if(arr[mid] > arr[high]) {
            low = mid + 1;
        } else if(arr[mid] == arr[high]) {
            high = high - 1;
        } else {
            high = mid;
        }
    }
 
    return arr[low];
}
```

## 扩展



二分查找

```js
        function binarySearch(data, arr, start, end) {
            if (start > end) {
                return -1;
            }
            var mid = Math.floor((end + start) / 2);
            if (data == arr[mid]) {
                return mid;
            } else if (data < arr[mid]) {
                return binarySearch(data, arr, start, mid - 1);
            } else {
                return binarySearch(data, arr, mid + 1, end);
            }
        }
```

## 考察点



- 查找
- 数组



# 查找_在排序数组中查找数字

## 题目



统计一个数字在排序数组中出现的次数。

## 思路



本道题有好几种解法

- 1.直接遍历数组，判断前后的值是否相同，找到元素开始位置和结束位置，时间复杂度`O(n)`
- 2.使用二分查找找到目标值，在向前向后遍历，找到所有的数，比上面略优，时间复杂度也是`O(n)`
- 3.使用二分查找分别找到第一个目标值出现的位置和最后一个位置，时间复杂度`O(logn)`

## 代码



在排序数组中找元素，首先考虑使用二分查找

下面是使用二分查找在数组中寻找某个数

```js
        function binarySearch(data, arr, start, end) {
            if (start > end) {
                return -1;
            }
            var mid = Math.floor((end + start) / 2);
            if (data == arr[mid]) {
                return mid;
            } else if (data < arr[mid]) {
                return binarySearch(data, arr, start, mid - 1);
            } else {
                return binarySearch(data, arr, mid + 1, end);
            }
        }
```

找到第一次和最后一次出现的位置我们只需要对上面的代码进行稍加的变形

第一次位置：找到目标值，并且前一位的数字和当前值不相等

最后一次位置：找到目标值，并且后一位的数字和当前值不相等

```js
    function GetNumberOfK(data, k) {
      if (data && data.length > 0 && k != null) {
        const firstIndex = getFirstK(data, 0, data.length - 1, k);
        const lastIndex = getLastK(data, 0, data.length - 1, k);
        if (firstIndex != -1 && lastIndex != -1) {
          return lastIndex - firstIndex + 1;
        }
      }
      return 0;
    }

    function getFirstK(data, first, last, k) {
      if (first > last) {
        return -1;
      }
      const mid = parseInt((first + last) / 2);
      if (data[mid] === k) {
        if (data[mid - 1] != k) {
          return mid;
        } else {
          return getFirstK(data, first, mid-1, k);
        }
      } else if (data[mid] > k) {
        return getFirstK(data, first, mid - 1, k);
      } else if (data[mid] < k) {
        return getFirstK(data, mid + 1, last, k);
      }
    }

    function getLastK(data, first, last, k) {
      if (first > last) {
        return -1;
      }
      const mid = parseInt((first + last) / 2);
      if (data[mid] === k) {
        if (data[mid + 1] != k) {
          return mid;
        } else {
          return getLastK(data, mid + 1, last, k);
        }
      } else if (data[mid] > k) {
        return getLastK(data, first, mid - 1, k);
      } else if (data[mid] < k) {
        return getLastK(data, mid + 1, last, k);
      }
    }
```

## 考察点



- 数组
- 二分查找



# 递归和循环_变态跳台阶

## 题目



一只青蛙一次可以跳上1级台阶，也可以跳上2级……它也可以跳上n级。求该青蛙跳上一个n级的台阶总共有多少种跳法。

> f(n) = f(n-1) + f(n-2)

## 基本思路



每个台阶都可以选择跳或者不跳，最后一个台阶必跳。

每个台阶有两种选择，n个台阶有2的n次方种选择。

所以一共有2的n-1次跳法。

使用位运算

## 代码



```js
function jumpFloorII(number)
{
    return 1<<(--number);
}
```



# 递归和循环_递归

递归是一种解决问题的有效方法，在递归过程中，函数将自身作为子例程调用。

![img](https://i.loli.net/2019/08/19/fJgzFyM6WvXGOi7.png)

你可能想知道如何实现调用自身的函数。诀窍在于，每当递归函数调用自身时，它都会将给定的问题拆解为子问题。递归调用继续进行，直到到子问题无需进一步递归就可以解决的地步。

为了确保递归函数不会导致无限循环，它应具有以下属性：

- 一个简单的基本案例 —— 能够不使用递归来产生答案的终止方案。
- 一组规则，也称作递推关系，可将所有其他情况拆分到基本案例。

### 重复计算

一些问题使用递归考虑，思路是非常清晰的，但是却不推荐使用递归，例如下面的几个问题：

- [斐波拉契数列(opens new window)](https://www.conardli.top/docs/algorithm/递归和循环/斐波拉契数列.html)
- [跳台阶(opens new window)](https://www.conardli.top/docs/algorithm/递归和循环/跳台阶.html)
- [矩形覆盖(opens new window)](https://www.conardli.top/docs/algorithm/递归和循环/矩形覆盖.html)

这几个问题使用递归都有一个共同的缺点，那就是包含大量的重复计算，如果递归层次比较深的话，直接会导致JS进程崩溃。

![img](https://i.loli.net/2019/08/19/fA3okFVIMlxS1Q6.jpg)

你可以使用`记忆化`的方法来避免重复计算，即开辟一个额外空间来存储已经计算过的值，但是这样又会浪费一定的内存空间。因此上面的问题一般会使用动态规划求解。

> 所以，在使用递归之前，一定要判断代码是否含有重复计算，如果有的话，不推荐使用递归。

递归是一种思想，而非一个类型，很多经典算法都是以递归为基础，因此这里就不再给出更多问题。



# 递归和循环_斐波拉契数列

## 题目

大家都知道斐波那契数列，现在要求输入一个整数n，请你输出斐波那契数列的第n项（从0开始，第0项为0）。

> f(n) = f(n-1) + f(n-2)

## 基本思路

这道题在剑指`offer`中实际是当作递归的反例来说的。

递归的本质是吧一个问题分解成两个或者多个小问题，如果多个小问题存在互相重叠的情况，那么就存在重复计算。

`f(n) = f(n-1) + f(n-2)`这种拆分使用递归是典型的存在重叠的情况，所以会造成非常多的重复计算。

另外，每一次函数调用爱内存中都需要分配空间，每个进程的栈的容量是有限的，递归层次过多，就会造成栈溢出。

递归是从最大数开始，不断拆解成小的数计算，如果不去考虑递归，我们只需要从小数开始算起，从底层不断往上累加就可以了，其实思路也很简单。

## 代码

### 递归解法

```js
    function Fibonacci(n) {
      if (n < 2) {
        return n;
      }
      return Fibonacci(n - 1) + Fibonacci(n - 2);
    }
```

### 递归加记忆化

使用一个数组缓存计算过的值。

```js
    function Fibonacci(n, memory = []) {
      if (n < 2) {
        return n;
      }
      if (!memory[n]) {
        memory[n] = Fibonacci(n - 1, memory) + Fibonacci(n - 2, memory);
      }
      return memory[n];
    }
```

### 动态规划解法

```js
function Fibonacci(n){
    if(n<=1){
        return n;
    }
    let i = 1;
    let pre = 0;
    let current = 1;
    let result = 0;
    while(i++ < n){
        result = pre + current;
        pre = current;
        current = result;
    }
    return result;
}
```



# 递归和循环_矩形覆盖

## 题目

我们可以用`2*1`的小矩形横着或者竖着去覆盖更大的矩形。请问用n个`2*1`的小矩形无重叠地覆盖一个`2*n`的大矩形，总共有多少种方法？

假设有8个块

第1块竖着放，后面还剩`7`块，共`f(7)`种方法。

第1块横着放，后面还剩`6`块，共`f(6)`种方法。

即`f(8)=f(6)+f(7)`

```
f(n)=f(n-1)+f(n-2)
```

![img](https://s.poetries.top/gitee/2020/09/img/%E7%9F%A9%E5%BD%A2%E8%A6%86%E7%9B%96.png)

```js
function rectCover(n)
{
    if(n<=2){
        return n;
    }
    let i = 2;
    let pre = 1;
    let current = 2;
    let result = 0;
    while(i++ < n){
        result = pre + current;
        pre = current;
        current = result;
    }
    return result;
}
```



# 递归和循环_跳台阶

## 题目

一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法（先后次序不同算不同的结果）。

## 基本思路

找规律：

跳三级台阶等于跳两级台阶的跳法+跳一级台阶的跳法。

跳四级台阶等于跳三级台阶的跳法+跳二级台阶的跳法。

明显也符合斐波那契数列的规律

> f(n) = f(n-1) + f(n-2)

## 代码

```js
function jumpFloor(n)
{
    if(n<=2){
        return n;
    }
    let i = 2;
    let pre = 1;
    let current = 2;
    let result = 0;
    while(i++ < n){
        result = pre + current;
        pre = current;
        current = result;
    }
    return result;
}
```



# 动态规划_打家劫舍

## 题目

你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你在不触动警报装置的情况下，能够偷窃到的最高金额。

```js
示例 1:

输入: [1,2,3,1]
输出: 4
解释: 偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
     偷窃到的最高金额 = 1 + 3 = 4 。
示例 2:

输入: [2,7,9,3,1]
输出: 12
解释: 偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
     偷窃到的最高金额 = 2 + 9 + 1 = 12 。
```

## 思路

考虑所有可能的抢劫方案过于困难。一个自然而然的想法是首先从最简单的情况开始。记：

`f(k)` = 从前 k 个房屋中能抢劫到的最大数额，`Ai` = 第 i 个房屋的钱数。

首先看`n = 1` 的情况，显然 `f(1) = A1`。

再看 `n = 2`，`f(2) = max(A1, A2)`。

对于 `n = 3`，有两个选项:

抢第三个房子，将数额与第一个房子相加。

不抢第三个房子，保持现有最大数额。

显然，你想选择数额更大的选项。于是，可以总结出公式：

```
f(k) = max(f(k – 2) + Ak, f(k – 1))
```

## 代码

```js
    var rob = function (nums) {
      var len = nums.length;
      if (len < 2) {
        return nums[len - 1] ? nums[len - 1] : 0;
      }
      var current = [nums[0], Math.max(nums[0], nums[1])];
      for (var k = 2; k < len; k++) {
        current[k] = Math.max(current[k - 2] + nums[k], current[k - 1]);
      }
      return current[len - 1];
    };
```



# 动态规划

动态规划往往是最能有效考察算法和设计能力的题目类型，面对这类题目最重要的是抓住问题的阶段，了解每个阶段的状态，从而分析阶段之间的关系转化。

适用于动态规划的问题，需要满足最优子结构和无后效性，动态规划的求解过程，在于找到状态转移方程，进行自底向上的求解。

![img](https://i.loli.net/2019/08/18/3roOnqlBDEP5RZN.jpg)

自底向上的求解，可以帮你省略大量的复杂计算，例如上面的斐波拉契数列，使用递归的话时间复杂度会呈指数型增长，而动态规划则让此算法的时间复杂度保持在`O(n)`。

### 路径问题

- [最小路径和(opens new window)](https://leetcode-cn.com/problems/minimum-path-sum/)
- [不同路径(opens new window)](https://leetcode-cn.com/problems/unique-paths/)
- [不同路径 II(opens new window)](https://leetcode-cn.com/problems/unique-paths-ii/)
- [形成字符串的最短路径(opens new window)](https://leetcode-cn.com/problems/shortest-way-to-form-string)

### 买卖股票类问题

- [买卖股票的最佳时机(opens new window)](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock)
- [买卖股票的最佳时机 III(opens new window)](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii)
- [打家劫舍(opens new window)](https://leetcode-cn.com/problems/house-robber)
- [打家劫舍 II(opens new window)](https://leetcode-cn.com/problems/house-robber-ii/)

### 子序列问题

- [不同的子序列(opens new window)](https://leetcode-cn.com/problems/distinct-subsequences)
- [乘积最大子序列(opens new window)](https://leetcode-cn.com/problems/maximum-product-subarray)
- [最长上升子序列(opens new window)](https://leetcode-cn.com/problems/longest-increasing-subsequence)
- [最长回文子序列(opens new window)](https://leetcode-cn.com/problems/longest-palindromic-subsequence)

# 动态规划_最小路径和

## 题目

给定一个包含非负整数的 `m x n` 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

说明：每次只能向下或者向右移动一步。

示例:

```js
输入:
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
输出: 7
解释: 因为路径 1→3→1→1→1 的总和最小。
```

## 思路

新建一个额外的 dpdp 数组，与原矩阵大小相同。在这个矩阵中，`dp(i, j)dp(i,j)` 表示从坐标 `(i, j)(i,j)` 到右下角的最小路径权值。

我们初始化右下角的 `dpdp` 值为对应的原矩阵值，然后去填整个矩阵，对于每个元素考虑移动到右边或者下面，因此获得最小路径和我们有如下递推公式：

```js
dp(i,j)=grid(i,j)+min(dp(i+1,j),dp(i,j+1))
```

时间复杂度 ：`O(mn)O(mn)` 空间复杂度 ：`O(mn)O(mn)`

## 代码

```js
var minPathSum = function (grid) {
	var m = grid.length;
	var n = grid[0].length;
	for (var i = 0; i < m; i++) {
		for (var j = 0; j < n; j++) {
			if (i === 0 && j !== 0) {
				grid[i][j] += grid[i][j - 1];
			} else if (j === 0 && i !== 0) {
				grid[i][j] += grid[i - 1][j];
			} else if (i !== 0 && j !== 0) {
				grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
			}
		}
	}
	return grid[m - 1][n - 1];
};
```

## 考察点

- 动态规划



# 分治_数组中的逆序对

## 题目

在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组,求出这个数组中的逆序对的总数P。

## 思路

使用暴力法：从第一个数开始，依次和后面每一个数字进行比较记录逆序对的个数，时间复杂度O(n2)

使用分治的细想：

若没了解过归并排序，建议先熟悉[归并排序](https://interview.poetries.top/fe-algorithm-docs/算法分类/排序/归并排序.html)算法再来看本题。

直接将归并排序进行改进，把数据分成`N`个小数组。

合并数组 `left - mid` , `mid+1 - right`，合并时， 若`array[leftIndex] > array[rightIndex]` ,则比右边 `rightIndex-mid`个数大

```
count += rightIndex-mid
```

注意和归并排序的区别： 归并排序是合并数组数从小数开始，而本题是从大数开始。

时间复杂度`O(nlogn)`

空间复杂度`O(n)`

## 代码

```js
    function InversePairs(data) {
      return mergeSort(data, 0, data.length - 1, []);
    }

    function mergeSort(array, left, right, temp) {
      if (left < right) {
        const mid = parseInt((left + right) / 2);
        const l = mergeSort(array, left, mid, temp);
        const r = mergeSort(array, mid + 1, right, temp);
        const m = merge(array, left, right, mid, temp);
        return l + m + r;
      } else {
        return 0;
      }
    }

    function merge(array, left, right, mid, temp) {
      let leftIndex = mid;
      let rightIndex = right;
      let tempIndex = right - left;
      let count = 0;
      while (leftIndex >= left && rightIndex > mid) {
        if (array[leftIndex] > array[rightIndex]) {
          count += (rightIndex - mid);
          temp[tempIndex--] = array[leftIndex--];
        } else {
          temp[tempIndex--] = array[rightIndex--];
        }
      }
      while (leftIndex >= left) {
        temp[tempIndex--] = array[leftIndex--];
      }
      while (rightIndex > mid) {
        temp[tempIndex--] = array[rightIndex--];
      }
      tempIndex = 0;
      for (let i = left; i <= right; i++) {
        array[i] = temp[tempIndex++];
      }
      return count;
    }
```

## 考察点

- 数组
- 分治



# 回溯算法_二叉树中和为某一值的路径

## 二叉树中和为某一值的路径

输入一颗二叉树的根节点和一个整数，打印出二叉树中结点值的和为输入整数的所有路径。路径定义为从树的根结点开始往下一直到叶结点所经过的结点形成一条路径。

## 思路

套用回溯算法的思路

设定一个结果数组result来存储所有符合条件的路径

设定一个栈stack来存储当前路径中的节点

设定一个和sum来标识当前路径之和

- 从根结点开始深度优先遍历，每经过一个节点，将节点入栈
- 到达叶子节点，且当前路径之和等于给定目标值，则找到一个可行的解决方案，将其加入结果数组
- 遍历到二叉树的某个节点时有2个可能的选项，选择前往左子树或右子树
- 若存在左子树，继续向左子树递归
- 若存在右子树，继续向右子树递归
- 若上述条件均不满足，或已经遍历过，将当前节点出栈，向上回溯

## 代码

```js
    function FindPath(root, expectNumber) {
      const result = [];
      if (root) {
        FindPathCore(root, expectNumber, [], 0, result);
      }
      return result;
    }

    function FindPathCore(node, expectNumber, stack, sum, result) {
      stack.push(node.val);
      sum += node.val;
      if (!node.left && !node.right && sum === expectNumber) {
        result.push(stack.slice(0));
      }
      if (node.left) {
        FindPathCore(node.left, expectNumber, stack, sum, result);
      }
      if (node.right) {
        FindPathCore(node.right, expectNumber, stack, sum, result);
      }
      stack.pop();
    }
```

## 考察点

- 二叉树
- 回溯算法



# 回溯算法_和为sum的n个数

## 题目

给定无序、不重复的数组`data`，取出 `n` 个数，使其相加和为`sum`

## 思路

基于上面字符串排列题目的变形，我们从`array`中取出`n`个数的全排列，在取的同时判断是否符合条件。

## 代码

```js
    function getAllCombin(array, n, sum, temp) {
      if (temp.length === n) {
        if (temp.reduce((t, c) => t + c) === sum) {
          return temp;
        }
        return;
      }
      for (let i = 0; i < array.length; i++) {
        const current = array.shift();
        temp.push(current);
        const result = getAllCombin(array, n, sum, temp);
        if (result) {
          return result;
        }
        temp.pop();
        array.push(current);
      }
    }
    const arr = [1, 2, 3, 4, 5, 6];

    console.log(getAllCombin(arr, 3, 10, []));
```



# 回溯算法

从解决问题每一步的所有可能选项里系统选择出一个可行的解决方案。

在某一步选择一个选项后，进入下一步，然后面临新的选项。重复选择，直至达到最终状态。

回溯法解决的问题的所有选项可以用树状结构表示。

- 在某一步有n个可能的选项，该步骤可看作树中一个节点。
- 节点每个选项看成节点连线，到达它的n个子节点。
- 叶节点对应终结状态。
- 叶节点满足约束条件，则为一个可行的解决方案。
- 叶节点不满足约束条件，回溯到上一个节点，并尝试其他叶子节点。
- 节点所有子节点均不满足条件，再回溯到上一个节点。
- 所有状态均不能满足条件，问题无解。

![img](https://i.loli.net/2019/08/19/GZkQ7gx9CHsb2hd.png)

> 回溯算法适合由多个步骤组成的问题，并且每个步骤都有多个选项。

- [二叉树中和为某一值的路径(opens new window)](https://www.conardli.top/docs/algorithm/回溯算法/二叉树中和为某一值的路径.html)
- [字符串的排列(opens new window)](https://www.conardli.top/docs/algorithm/回溯算法/字符串的排列.html)
- [和为sum的n个数(opens new window)](https://www.conardli.top/docs/algorithm/回溯算法/和为sum的n个数.html)
- [矩阵中的路径(opens new window)](https://www.conardli.top/docs/algorithm/回溯算法/矩阵中的路径.html)
- [机器人的运动范围(opens new window)](https://www.conardli.top/docs/algorithm/回溯算法/机器人的运动范围.html)
- [N皇后问题(opens new window)](https://www.conardli.top/docs/algorithm/回溯算法/N皇后问题.html)



# 回溯算法_机器人的运动范围

## 题目

地上有一个m行和n列的方格。一个机器人从坐标0,0的格子开始移动，每一次只能向左，右，上，下四个方向移动一格，但是不能进入行坐标和列坐标的数位之和大于k的格子。

例如，当k为18时，机器人能够进入方格（35,37），因为3+5+3+7 = 18。但是，它不能进入方格（35,38），因为3+5+3+8 = 19。请问该机器人能够达到多少个格子？

## 思路

从第一个格开始走，进入递归

- 判断当前字符是否满足递归终止条件
- 递归终止条件：(1).行列越界 (2).行列值超出范围 (3).已经走过(需设定一个数组标识当前字符是否走过)
- 条件不满足，返回0，向上回溯。
- 若上面三个条件都满足，继续向下递归，返回四个方向的递归之和+1（当前节点）

下面是本算法的动画展示，可以点击[机器人的运动范围动画 (opens new window)](https://www.lisq.xyz/demo/机器人的运动范围.html)手动尝试。 ![机器人的运动范围动画](https://s.poetries.top/gitee/2020/09/img/%E6%9C%BA%E5%99%A8%E4%BA%BA%E8%BF%90%E5%8A%A8%E8%8C%83%E5%9B%B4.gif)

## 代码

```js
    function movingCount(threshold, rows, cols) {
      const flag = createArray(rows, cols);
      let count = 0;
      if (rows > 0 && cols > 0) {
        count = movingCountCore(0, 0, threshold, rows, cols, flag);
      }
      return count;
    }

    function movingCountCore(i, j, threshold, rows, cols, flag) {
      if (i < 0 || j < 0 || i >= rows || j >= cols) {
        return 0;
      }
      if (flag[i][j] || condition(i, j, threshold)) {
        flag[i][j] = true;
        return 0;
      }
      flag[i][j] = true;
      return 1 + movingCountCore(i - 1, j, threshold, rows, cols, flag) +
        movingCountCore(i + 1, j, threshold, rows, cols, flag) +
        movingCountCore(i, j - 1, threshold, rows, cols, flag) +
        movingCountCore(i, j + 1, threshold, rows, cols, flag);
    }

    /**
     * 判断是否符合条件
     */
    function condition(i, j, threshold) {
      let temp = i + '' + j;
      let sum = 0;
      for (var i = 0; i < temp.length; i++) {
        sum += temp.charAt(i) / 1;
      }
      return sum > threshold;
    }

    /**
     * 创建一个二维空数组
     */
    function createArray(rows, cols) {
      const result = new Array(rows) || [];
      for (let i = 0; i < rows; i++) {
        const arr = new Array(cols);
        for (let j = 0; j < cols; j++) {
          arr[j] = false;
        }
        result[i] = arr;
      }
      return result;
    }
```



# 回溯算法_矩阵中的路径

## 题目

请设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。

路径可以从矩阵中的任意一个格子开始，每一步可以在矩阵中向左，向右，向上，向下移动一个格子。 如果一条路径经过了矩阵中的某一个格子，则之后不能再次进入这个格子。

例如`a b c e s f c s a d e e`这样的`3 X 4`矩阵中包含一条字符串`"bcced"`的路径，但是矩阵中不包含`"abcb"`路径，因为字符串的第一个字符b占据了矩阵中的第一行第二个格子之后，路径不能再次进入该格子。

```text
     a b c e 
     s f c s 
     a d e e
```

## 思路

回溯算法 问题由多个步骤组成，并且每个步骤都有多个选项。

依次验证path中的每个字符（多个步骤），每个字符可能出现在多个方向（多个选项）

- 1.根据给定的行列，遍历字符，根据行列数计算出字符位置
- 2.判断当前字符是否满足递归终止条件
- 3.递归终止条件：(1).行列越界 (2).与路径不匹配 (3).已经走过(需设定一个数组标识当前字符是否走过)
- 4.若路径中的字符最后一位匹配成功，则到达边界且满足约束条件，找到合适的解
- 5.递归不断寻找四个方向是否满足条件，满足条件再忘更深层递归，不满足向上回溯
- 6.如果回溯到最外层，则当前字符匹配失败，将当前字符标记为未走

![img](https://s.poetries.top/gitee/2020/09/img/%E7%9F%A9%E9%98%B5%E4%B8%AD%E7%9A%84%E8%B7%AF%E5%BE%84.png)

## 代码

```js
    function hasPath(matrix, rows, cols, path) {
      const flag = new Array(matrix.length).fill(false);
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (hasPathCore(matrix, i, j, rows, cols, path, flag, 0)) {
            return true;
          }
        }
      }
      return false;
    }

    function hasPathCore(matrix, i, j, rows, cols, path, flag, k) {
      const index = i * cols + j;
      if (i < 0 || j < 0 || i >= rows || j >= cols || matrix[index] != path[k] || flag[index]) {
        return false;
      }
      if (k === path.length - 1) {
        return true;
      }
      flag[index] = true;
      if (hasPathCore(matrix, i + 1, j, rows, cols, path, flag, k + 1) ||
        hasPathCore(matrix, i - 1, j, rows, cols, path, flag, k + 1) ||
        hasPathCore(matrix, i, j + 1, rows, cols, path, flag, k + 1) ||
        hasPathCore(matrix, i, j - 1, rows, cols, path, flag, k + 1)) {
        return true;
      }
      flag[index] = false;
      return false;
    }
```

## 考察点

- 回溯算法
- 二维数组



# 回溯算法_字符串的排列

## 题目

输入一个字符串,按字典序打印出该字符串中字符的所有排列。例如输入字符串`abc`,则打印出由字符`a,b,c`所能排列出来的所有字符串`abc,acb,bac,bca,cab`和`cba`。

## 思路

使用回溯法

记录一个字符（`temp`），用于存储当前需要进入排列的字符

记录一个字符串（`current`），用于记录当前已经排列好的字符

记录一个队列（`queue`），用于存储还未被排列的字符

- 每次排列将`temp`添加到`current`
- 如果`queue`为空，则本次排列完成，将`curret`加入到结果数组中，结束递归
- 如果`queue`不为空，说明还有未排列的字符
- 递归排列`queue`中剩余的字符
- 为了不影响后续排列，每次递归完成，将当前递归的字符`temp`加回队列

## 代码

> 记录一个当前排列字符temp

```js
    function Permutation(str) {
      const result = [];
      if (str) {
        queue = str.split('')
        PermutationCore(queue, result);
      }
      result.sort();
      return [... new Set(result)];
    }

    function PermutationCore(queue, result, temp = "", current = "") {
      current += temp;
      if (queue.length === 0) {
        result.push(current);
        return;
      }
      for (let i = 0; i < queue.length; i++) {
        temp = queue.shift();
        PermutationCore(queue, result, temp, current);
        queue.push(temp);
      }
    }
```

> 记录一个当前索引，不断交换数组中的元素（不太好理解，不推荐）

```js
    function Permutation(str) {
      var result = [];
      if (!str) {
        return result;
      }
      var array = str.split('');
      permutate(array, 0, result);
      result.sort();
      return [... new Set(result)];
    }

    function permutate(array, index, result) {
      if (array.length - 1 === index) {
        result.push(array.join(''));
      }
      for (let i = index; i < array.length; i++) {
        swap(array, index, i);
        permutate(array, index + 1, result);
        swap(array, i, index);
      }
    }
```

## 考察点

- 字符串
- 回溯算法



#  回溯算法_字符串的排列

## 题目

输入一个字符串,按字典序打印出该字符串中字符的所有排列。例如输入字符串`abc`,则打印出由字符`a,b,c`所能排列出来的所有字符串`abc,acb,bac,bca,cab`和`cba`。

## 思路

使用回溯法

记录一个字符（`temp`），用于存储当前需要进入排列的字符

记录一个字符串（`current`），用于记录当前已经排列好的字符

记录一个队列（`queue`），用于存储还未被排列的字符

- 每次排列将`temp`添加到`current`
- 如果`queue`为空，则本次排列完成，将`curret`加入到结果数组中，结束递归
- 如果`queue`不为空，说明还有未排列的字符
- 递归排列`queue`中剩余的字符
- 为了不影响后续排列，每次递归完成，将当前递归的字符`temp`加回队列

## 代码

> 记录一个当前排列字符temp

```js
    function Permutation(str) {
      const result = [];
      if (str) {
        queue = str.split('')
        PermutationCore(queue, result);
      }
      result.sort();
      return [... new Set(result)];
    }

    function PermutationCore(queue, result, temp = "", current = "") {
      current += temp;
      if (queue.length === 0) {
        result.push(current);
        return;
      }
      for (let i = 0; i < queue.length; i++) {
        temp = queue.shift();
        PermutationCore(queue, result, temp, current);
        queue.push(temp);
      }
    }
```

> 记录一个当前索引，不断交换数组中的元素（不太好理解，不推荐）

```js
    function Permutation(str) {
      var result = [];
      if (!str) {
        return result;
      }
      var array = str.split('');
      permutate(array, 0, result);
      result.sort();
      return [... new Set(result)];
    }

    function permutate(array, index, result) {
      if (array.length - 1 === index) {
        result.push(array.join(''));
      }
      for (let i = index; i < array.length; i++) {
        swap(array, index, i);
        permutate(array, index + 1, result);
        swap(array, i, index);
      }
    }
```

## 考察点

- 字符串
- 回溯算法



# 回溯算法_N皇后问题

## 题目

n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/8-queens.png)

上图为 8 皇后问题的一种解法。

给定一个整数 n，返回所有不同的 n 皇后问题的解决方案。

```js
输入: 4
输出: 2
解释: 4 皇后问题存在如下两个不同的解法。
[
 [".Q..",  // 解法 1
  "...Q",
  "Q...",
  "..Q."],

 ["..Q.",  // 解法 2
  "Q...",
  "...Q",
  ".Q.."]
]
```

## 思路

回溯法：深度优先遍历（列数作为同级，行数作为深层）+ 剪枝

- 递归深度达到最后一层：达到一个符合条件的解，向上回溯，想结果中添加当前的皇后位置列表
- 循环所有同级向深层递归，将每一层皇后的位置进行记录
- 当前位置在已放好皇后的攻击范围内：当前位置不能放置皇后
- 没有命中上面的规则，说明当前位置可放置皇后，向更深层递归
- 将结果进行可视化绘制

## 代码

```js
  var solveNQueens = function (n) {
      const cols = new Set();
      const left = new Set();
      const right = new Set();
      const result = []
      solveNQueensCore(0, n, cols, left, right, result, []);
      return draw(result, n);
    };

    var solveNQueensCore = function (row, n, cols, left, right, result, temp) {
      if (row === n) {
        result.push([...temp]);
        temp = [];
      }
      for (let i = 0; i < n; i++) {
        if (!cols.has(i) && !right.has(row - i) && !left.has(row + i)) {
          cols.add(i);
          left.add(row + i);
          right.add(row - i);
          temp[row] = i;
          solveNQueensCore(row + 1, n, cols, left, right, result, temp);
          cols.delete(i);
          left.delete(row + i);
          right.delete(row - i);
        }
      }
    };

    function draw(array, n) {
      const result = [];
      array.forEach(element => {
        const panel = [];
        element.forEach(index => {
          const temp = new Array(n).fill('.');
          temp[index] = 'Q';
          panel.push(temp.join(''));
        });
        result.push(panel);
      });
      return result;
    }
```

# 回溯算法_N皇后问题2

## 题目

n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/8-queens.png)

上图为 8 皇后问题的一种解法。

给定一个整数 n，返回 n 皇后不同的解决方案的数量。

```js
输入: 4
输出: 2
解释: 4 皇后问题存在如下两个不同的解法。
[
 [".Q..",  // 解法 1
  "...Q",
  "Q...",
  "..Q."],

 ["..Q.",  // 解法 2
  "Q...",
  "...Q",
  ".Q.."]
]
```

## 思路

回溯法：深度优先遍历（列数作为同级，行数作为深层）+ 剪枝

- 递归深度达到最后一层：达到一个符合条件的解，向上回溯，返回1
- 循环所有同级向深层递归，并将每次递归的返回值累加
- 当前位置在已放好皇后的攻击范围内：当前位置不能放置皇后
- 没有命中上面的规则，说明当前位置可放置皇后，向更深层递归

## 代码

```js
    var totalNQueens = function (n) {
      const cols = new Set();
      const left = new Set();
      const right = new Set();
      return totalNQueensCore(0, n, cols, left, right);
    };

    var totalNQueensCore = function (row, n, cols, left, right) {
      let result = 0;
      if (row === n) {
        return 1;
      }
      for (let i = 0; i < n; i++) {
        if (!cols.has(i) && !right.has(row - i) && !left.has(row + i)) {
          cols.add(i);
          left.add(row + i);
          right.add(row - i);

          result += totalNQueensCore(row + 1, n, cols, left, right);
          cols.delete(i);
          left.delete(row + i);
          right.delete(row - i);
        }
      }
      return result;
    };
```

# 排序_插入排序

## 思想

将左侧序列看成一个有序序列，每次将一个数字插入该有序序列。

插入时，从有序序列最右侧开始比较，若比较的数较大，后移一位。

![img](https://upload-images.jianshu.io/upload_images/1867034-d1537e355abdd298.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/811/format/webp)

## 解法

```js
    function insertSort(array) {
      for (let i = 1; i < array.length; i++) {
        let target = i;
        for (let j = i - 1; j >= 0; j--) {
          if (array[target] < array[j]) {
            [array[target], array[j]] = [array[j], array[target]]
            target = j;
          } else {
            break;
          }
        }
      }
      return array;
    }
```

## 复杂度

时间复杂度：`O(n2)`

空间复杂度:`O(1)`

## 稳定性

稳定



# 排序_堆排序

# 思想

创建一个大顶堆，大顶堆的堆顶一定是最大的元素。

交换第一个元素和最后一个元素，让剩余的元素继续调整为大顶堆。

从后往前以此和第一个元素交换并重新构建，排序完成。

## 解法

```js
    function heapSort(array) {
      creatHeap(array);
      console.log(array);
      // 交换第一个和最后一个元素，然后重新调整大顶堆
      for (let i = array.length - 1; i > 0; i--) {
        [array[i], array[0]] = [array[0], array[i]];
        adjust(array, 0, i);
      }
      return array;
    }
    // 构建大顶堆，从第一个非叶子节点开始，进行下沉操作
    function creatHeap(array) {
      const len = array.length;
      const start = parseInt(len / 2) - 1;
      for (let i = start; i >= 0; i--) {
        adjust(array, i, len);
      }
    }
    // 将第target个元素进行下沉，孩子节点有比他大的就下沉
    function adjust(array, target, len) {
      for (let i = 2 * target + 1; i < len; i = 2 * i + 1) {
        // 找到孩子节点中最大的
        if (i + 1 < len && array[i + 1] > array[i]) {
          i = i + 1;
        }
        // 下沉
        if (array[i] > array[target]) {
          [array[i], array[target]] = [array[target], array[i]]
          target = i;
        } else {
          break;
        }
      }
    }
```

## 复杂度

时间复杂度：`O(nlogn)`

空间复杂度:`O(1)`

## 稳定性

不稳定



# 排序_复杂度

### 时间复杂度

一个算法的时间复杂度反映了程序运行从开始到结束所需要的时间。把算法中基本操作重复执行的次数（频度）作为算法的时间复杂度。

没有循环语句，记作`O(1)`，也称为常数阶。只有一重循环，则算法的基本操作的执行频度与问题规模n呈线性增大关系，记作`O（n）`，也叫线性阶。

常见的时间复杂度有：

- `O(1)`: Constant Complexity: Constant 常数复杂度
- `O(log n)`: Logarithmic Complexity: 对数复杂度
- `O(n)`: Linear Complexity: 线性时间复杂度
- `O(n^2)`: N square Complexity 平⽅方
- `O(n^3)`: N square Complexity ⽴立⽅方
- `O(2^n)`: Exponential Growth 指数
- `O(n!)`: Factorial 阶乘

![img](https://i.loli.net/2019/08/19/RS4xlctUEQjbkw6.png)

### 空间复杂度

一个程序的空间复杂度是指运行完一个程序所需内存的大小。利用程序的空间复杂度，可以对程序的运行所需要的内存多少有个预先估计。

一个程序执行时除了需要存储空间和存储本身所使用的指令、常数、变量和输入数据外，还需要一些对数据进行操作的工作单元和存储一些为现实计算所需信息的辅助空间。



# 排序_归并排序

## 思想

利用`归并`的思想实现的排序方法。

该算法是采用分治法（`Divide and Conquer`）的一个非常典型的应用。（分治法将问题分成一些小的问题然后递归求解，而治的阶段则将分的阶段得到的各答案"修补"在一起，即分而治之)。

- 将已有序的子序列合并，得到完全有序的序列
- 即先使每个子序列有序，再使子序列段间有序
- 若将两个有序表合并成一个有序表，称为二路归并

![img](https://s.poetries.top/gitee/2020/09/img/%E5%BD%92%E5%B9%B6%E6%8E%92%E5%BA%8F.gif)

分割：

- 将数组从中点进行分割，分为左、右两个数组
- 递归分割左、右数组，直到数组长度小于`2`

归并：

如果需要合并，那么左右两数组已经有序了。

创建一个临时存储数组`temp`，比较两数组第一个元素，将较小的元素加入临时数组

若左右数组有一个为空，那么此时另一个数组一定大于`temp`中的所有元素，直接将其所有元素加入`temp`

## 解法

### 写法1

分割数组时直接将数组分割为两个数组，合并时直接合并数组。

优点：思路简单，写法简单

缺点：空间复杂度略高，需要复制多个数组

```js
    function mergeSort(array) {
      if (array.length < 2) {
        return array;
      }
      const mid = Math.floor(array.length / 2);
      const front = array.slice(0, mid);
      const end = array.slice(mid);
      return merge(mergeSort(front), mergeSort(end));
    }

    function merge(front, end) {
      const temp = [];
      while (front.length && end.length) {
        if (front[0] < end[0]) {
          temp.push(front.shift());
        } else {
          temp.push(end.shift());
        }
      }
      while (front.length) {
        temp.push(front.shift());
      }
      while (end.length) {
        temp.push(end.shift());
      }
      return temp;
    }
```

### 写法2

记录数组的索引，使用`left、right`两个索引来限定当前分割的数组。

优点：空间复杂度低，只需一个`temp`存储空间，不需要拷贝数组

缺点：写法复杂

```js
    function mergeSort(array, left, right, temp) {
      if (left < right) {
        const mid = Math.floor((left + right) / 2);
        mergeSort(array, left, mid, temp)
        mergeSort(array, mid + 1, right, temp)
        merge(array, left, right, temp);
      }
      return array;
    }

    function merge(array, left, right, temp) {
      const mid = Math.floor((left + right) / 2);
      let leftIndex = left;
      let rightIndex = mid + 1;
      let tempIndex = 0;
      while (leftIndex <= mid && rightIndex <= right) {
        if (array[leftIndex] < array[rightIndex]) {
          temp[tempIndex++] = array[leftIndex++]
        } else {
          temp[tempIndex++] = array[rightIndex++]
        }
      }
      while (leftIndex <= mid) {
        temp[tempIndex++] = array[leftIndex++]
      }
      while (rightIndex <= right) {
        temp[tempIndex++] = array[rightIndex++]
      }
      tempIndex = 0;
      for (let i = left; i <= right; i++) {
        array[i] = temp[tempIndex++];
      }
    }
```

## 复杂度

时间复杂度：`O(nlogn)`

空间复杂度:`O(n)`

## 稳定性

稳定

# 排序_快速排序

## 思想

快速排序：通过一趟排序将要排序的数据分割成独立的两部分，其中一部分的所有数据比另一部分的所有数据要小，再按这种方法对这两部分数据分别进行快速排序，整个排序过程可以递归进行，使整个数据变成有序序列。

实现步骤：

- 选择一个基准元素`target`（一般选择第一个数）
- 将比`target`小的元素移动到数组左边，比`target`大的元素移动到数组右边
- 分别对`target`左侧和右侧的元素进行快速排序

从上面的步骤中我们可以看出，快速排序也利用了分治的思想（将问题分解成一些小问题递归求解）

下面是对序列`6、1、2、7、9、3、4、5、10、8`排序的过程：

![img](https://s.poetries.top/gitee/2020/09/img/%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F.jpg)

![img](https://s.poetries.top/gitee/2020/09/img/%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F.gif)

## 解法

 

## 写法1

单独开辟两个存储空间`left`和`right`来存储每次递归比`target`小和大的序列

每次递归直接返回`left、target、right`拼接后的数组

浪费大量存储空间，写法简单

```js
    function quickSort(array) {
      if (array.length < 2) {
        return array;
      }
      const target = array[0];
      const left = [];
      const right = [];
      for (let i = 1; i < array.length; i++) {
        if (array[i] < target) {
          left.push(array[i]);
        } else {
          right.push(array[i]);
        }
      }
      return quickSort(left).concat([target], quickSort(right));
    }
```

## 写法2

记录一个索引`l`从数组最左侧开始，记录一个索引`r`从数组右侧开始

在`l<r`的条件下，找到右侧小于`target`的值`array[r]`，并将其赋值到`array[l]`

在`l<r`的条件下，找到左侧大于`target`的值`array[l]`，并将其赋值到`array[r]`

这样让`l=r`时，左侧的值全部小于`target`，右侧的值全部小于`target`，将`target`放到该位置

不需要额外存储空间，写法思路稍复杂（有能力推荐这种写法）

```js
    function quickSort(array, start, end) {
      if (end - start < 1) {
        return;
      }
      const target = array[start];
      let l = start;
      let r = end;
      while (l < r) {
        while (l < r && array[r] >= target) {
          r--;
        }
        array[l] = array[r];
        while (l < r && array[l] < target) {
          l++;
        }
        array[r] = array[l];
      }
      array[l] = target;
      quickSort(array, start, l - 1);
      quickSort(array, l + 1, end);
      return array;
    }
```

## 复杂度

时间复杂度：平均`O(nlogn)`，最坏`O(n2)`，实际上大多数情况下小于`O(nlogn)`

空间复杂度:`O(logn)`（递归调用消耗）

## 稳定性

不稳定

# 排序_冒泡排序

## 思想

循环数组，比较当前元素和下一个元素，如果当前元素比下一个元素大，向上冒泡。

这样一次循环之后最后一个数就是本数组最大的数。

下一次循环继续上面的操作，不循环已经排序好的数。

优化：当一次循环没有发生冒泡，说明已经排序完成，停止循环。

## 解法

```js
    function bubbleSort(array) {
      for (let j = 0; j < array.length; j++) {
        let complete = true;
        for (let i = 0; i < array.length - 1 - j; i++) {
          // 比较相邻数
          if (array[i] > array[i + 1]) {
            [array[i], array[i + 1]] = [array[i + 1], array[i]];
            complete = false;
          }
        }
        // 没有冒泡结束循环
        if (complete) {
          break;
        }
      }
      return array;
    }
```

## 复杂度

时间复杂度：`O(n2)`

空间复杂度:`O(1)`

## 稳定性

稳定



# 排序_排序

排序或许是前端接触最多的算法了，很多人的算法之路是从一个冒泡排序开始的，排序的方法有非常多中，它们各自有各自的应用场景和优缺点，这里我推荐如下6种应用最多的排序方法，如果你有兴趣也可以研究下其他几种。

- [快速排序(opens new window)](https://www.conardli.top/docs/algorithm/排序/快速排序.html)

> 选择一个目标值，比目标值小的放左边，比目标值大的放右边，目标值的位置已排好，将左右两侧再进行快排。

- [归并排序(opens new window)](https://www.conardli.top/docs/algorithm/排序/归并排序.html)

> 将大序列二分成小序列，将小序列排序后再将排序后的小序列归并成大序列。

- [选择排序(opens new window)](https://www.conardli.top/docs/algorithm/排序/选择排序.html)

> 每次排序取一个最大或最小的数字放到前面的有序序列中。

- [插入排序(opens new window)](https://www.conardli.top/docs/algorithm/排序/插入排序.html)

> 将左侧序列看成一个有序序列，每次将一个数字插入该有序序列。插入时，从有序序列最右侧开始比较，若比较的数较大，后移一位。

- [冒泡排序(opens new window)](https://www.conardli.top/docs/algorithm/排序/冒泡排序.html)

> 循环数组，比较当前元素和下一个元素，如果当前元素比下一个元素大，向上冒泡。下一次循环继续上面的操作，不循环已经排序好的数。

- [堆排序(opens new window)](https://www.conardli.top/docs/algorithm/排序/堆排序.html)

> 创建一个大顶堆，大顶堆的堆顶一定是最大的元素。交换第一个元素和最后一个元素，让剩余的元素继续调整为大顶堆。从后往前以此和第一个元素交换并重新构建，排序完成。



# 排序_选择排序

## 思想

每次循环选取一个最小的数字放到前面的有序序列中。

![img](https://upload-images.jianshu.io/upload_images/1867034-c6cc220cfb2b9ac8.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/811/format/webp)

## 解法

```js
    function selectionSort(array) {
      for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
          if (array[j] < array[minIndex]) {
            minIndex = j;
          }
        }
        [array[minIndex], array[i]] = [array[i], array[minIndex]];
      }
    }
```

## 复杂度

时间复杂度：`O(n2)`

空间复杂度:`O(1)`

## 稳定性

不稳定



# 数学运算_1+2+3+...+n

## 题目

求`1+2+3+...+n`，要求不能使用乘除法、`for、while、if、else、switch、case`等关键字及条件判断语句`（A?B:C）`。

## 代码

使用递归，使用&&短路来终止递归

```js
function Sum_Solution(n) {
    return n && (n + Sum_Solution(n - 1));
}
```

求和公式为 `n(n+1)/2 = (n方+n)/2`

可以用`Math.pow`函数求`n`方，用位运算代替除法

```js
    function Sum_Solution(n) {
      return (Math.pow(n, 2) + n) >> 1;
    }
```



# 数学运算_不用加减乘除做加法

## 题目

写一个函数，求两个整数之和，要求在函数体内不得使用`+、-、*、/`四则运算符号。

## 思路

**将加法拆解成三步：**

- 1.不进位相加
- 2.计算进位
- 3.进位与不进位结果进行相加
- 重复这三步，直到进位值为0

**举一个十进制的例子 `5 + 17`：**

- 1.不进位相加 -> `12`
- 2.计算进位 -> `5+7` 产生进位 `10`
- 3.进位与不进位结果进行相加 `12 + 10 = 22`

**使用二进制代替上面的过程：**

- `5`的二进制为`101`，`17`的二进制为`10001`
- 1.不进位相加 -> `101+10001=10100`
- 2.计算进位 -> `10`
- 3.进位与不进位结果进行相加 `10100 + 10 = 10110`，转换成十进制后即`22`

**使用位运算来计算二进制：**

- 二进制异或操作和不进位相加得到的结果相同`(1^1=0 0^1=1 0^0=0)`
- 二进制与操作后左移和进位结果相同`（1&1=1 1&0=0 0&0=0）`

## 代码

*递归实现*

```js
    function Add(num1, num2) {
      if (num2 === 0) {
        return num1;
      }
      return Add(num1 ^ num2, (num1 & num2) << 1);
    }
```

*非递归实现*

```js
    function Add(num1, num2) {
      while (num2 != 0) {
        const excl = num1 ^ num2;
        const carry = (num1 & num2) << 1;
        num1 = excl;
        num2 = carry;
      }
      return num1;
    }
```

## 考察点

- 位运算
- 二进制



# 数学运算_丑数

## 题目

把只包含质因子`2、3和5`的数称作丑数（`Ugly Number`）。

例如`6、8`都是丑数，但`14`不是，因为它包含质因子`7`。

习惯上我们把`1`当做是第一个丑数。求按从小到大的顺序的第`N`个丑数。

## 思路

丑数只能被`2、3、5`整除，说明第`n`个丑数只能是`0 - n-1`中某个丑数✖️`2`、✖️`3`、✖️`5`的结果。

而且，这个数即第`0 - n-1`个丑数✖️`2`、✖️`3`、✖️`5`的结果中比第`n-1`个丑数大的最小值。

按照上面的规律，我们可以依次求出第`0 - n`个丑数。

简单做法：

- 1.每次把第`0 - n-1`个丑数✖️`(2、3、5)`
- 2.分别找到第`0 - n-1`个丑数✖️`2`、✖️`3`、✖️`5`的结果中比第`n-1`个丑数大的最小值。
- 3.比较三个数取最小值加入到丑数队列中

优化：

- 1.前面的数不必每个都乘
- 2.记录下✖️`(2、3、5)`后刚好比当前最大丑数大的这三个值的下标 `i2,i3,i5`
- 3.下次比较从这 `i2,i3,i5` 三个下标开始乘起
- 4.最后取`arr[i2]✖️2、arr[i3]✖️3、arr[i5]✖️5` 的最小值

![丑数](https://s.poetries.top/gitee/2020/09/img/%E4%B8%91%E6%95%B0.png)

## 代码

```js
    function GetUglyNumber_Solution(index) {
      if (index <= 0) {
        return 0;
      }
      let arr = [1];
      let i2 = i3 = i5 = 0;
      let cur = 0;
      while (arr.length < index) {
        arr.push(Math.min(arr[i2] * 2, arr[i3] * 3, arr[i5] * 5));
        const current = arr[arr.length - 1];
        while (arr[i2] * 2 <= current) {
          i2++;
        }
        while (arr[i3] * 3 <= current) {
          i3++;
        }
        while (arr[i5] * 5 <= current) {
          i5++;
        }
      }
      return arr[index - 1];
    }
```



# 数学运算_二进制中1的个数

## 题目

输入一个整数，输出该数二进制表示中1的个数。其中负数用补码表示。

## 分析

这是一道考察二进制的题目

二进制或运算符`（or）`：符号为|，表示若两个二进制位都为`0`，则结果为`0`，否则为`1`。

二进制与运算符`（and）`：符号为&，表示若两个二进制位都为`1`，则结果为`1`，否则为`0`。

二进制否运算符`（not）`：符号为~，表示对一个二进制位取反。

异或运算符`（xor）`：符号为^，表示若两个二进制位不相同，则结果为1，否则为0

左移运算符`m << n`表示把m左移n位，左移n位的时候，最左边的n位将被丢弃，同时在最右边补上`n`个`0`，比如：

```js
00001010<<2 = 00101000
```

右移运算符`m >> n`表示把`m`右移`n`位，右移`n`位的时候，最右边的n位将被丢弃，同时在最左边补上`n`个`0`，比如：

```js
00001010>>2 = 00000010
```

我们可以让目标数字和一个数字做与运算

这个用户比较的数字必须只有一位是`1`其他位是`0`，这样就可以知道目标数字的这一位是否为`0`。

所以用于比较的这个数字初始值为`1`，比较完后让`1`左移`1`位，这样就可以依次比较所有位是否为`1`。

## 代码

```js
function NumberOf1(n)
{
    let flag = 1;
    let count = 0;
    while(flag){
        if(flag & n){
            count++;
        }
       flag = flag << 1;
    }
    return count;
}
```



# 数学运算_数值的整数次方

给定一个`double`类型的浮点数`base`和`int`类型的整数`exponent`。求`base`的`exponent`次方。

## 思路

这道题逻辑上很简单，但很容易出错。

关键是要考虑全面，考虑到所有情况。

`exponent` 是正，负，`0`的情况

`base`为`0`的情况。

## 代码

```js
    function Power(base, exponent) {
      if (exponent === 0) {
        return 1;
      } else {
        if (exponent > 0) {
          var result = 1;
          for (let i = 0; i < exponent; i++) {
            result *= base;
          }
          return result;
        } else if (exponent < 0) {
          var result = 1;
          for (let i = 0; i < Math.abs(exponent); i++) {
            result *= base;
          }
          return result ? 1 / result : false;
        }
      }
    }
```



# 数学运算_数组中只出现一次的数字

## 题目

一个整型数组里除了两个数字之外，其他的数字都出现了偶数次。请写程序找出这两个只出现一次的数字。

## 思路

```
1异或1=0` `0异或0=0` `1异或0=0
```

### 如果题目是只有一个只出现一次的数字：

两个相同的数异或值为`0`，将数组所有的值进行异或操作，最后剩余值就是目标值。

### 如果有两个出现一次的值

- 数组所有元素异或后是两个目标值的异或值
- 两个目标值不相等，所以最终的异或值不为`0`
- 最终异或值的二进制某一位肯定是`1`，找到这个位置为`index`
- 所以目标的两个值的二进制，一个`index`位为`0`，另一个`index`位为`1`
- 按二进制`index`位为`0`和`1`，将数组分两批进行异或，两批最后的结果即为两个目标值

## 代码

```js
    function FindNumsAppearOnce(array) {
      let exclusive = 0;
      for (let i = 0; i < array.length; i++) {
        exclusive = exclusive ^ array[i];
      }
      let index = findFirst1(exclusive);
      let result1 = 0;
      let result2 = 0;
      for (let i = 0; i < array.length; i++) {
        if (isN1(array[i], index)) {
          result1 = result1 ^ array[i]
        } else {
          result2 = result2 ^ array[i]
        }
      }
      return [result1, result2];
    }

    // 找到n的二进制第一个为1的位置
    function findFirst1(n) {
      let index = 0;
      while (((n & 1) === 0) && index < 64) {
        n = n >> 1;
        index++;
      }
      return index;
    }

    // 判断n的二进制第index位是否为1
    function isN1(n, index) {
      return n & (n >> index);
    }
```



# 数学运算_整数中1出现的次数

## 题目

求出`1~13`的整数中1出现的次数,并算出`100~1300`的整数中`1`出现的次数？

为此他特别数了一下`1~13`中包含1的数字有`1、10、11、12、13`因此共出现6次,但是对于后面问题他就没辙了。

`ACMer`希望你们帮帮他,并把问题更加普遍化,可以很快的求出任意非负整数区间中`1`出现的次数（从`1`到`n`中`1`出现的次数）。

## 思路

> 注意：11算出现了两个1

分别计算数字中每个位置可能出现1的情况，相加。

将数字分为两部分： 当前数字为1，其后面数字可能出现的情况`low`，当前数字为1，其前面数字可能出现的情况`high`，所有情况为`low * high`种情况。

例如，在分析数字`8103`时：

- 个位 `3`: 个位已经是最低位了，所以`low`只有`1`中情况。`high`可以取`0 - 810`共`811`种情况，所有情况为`1 * 811 = 811`种情况。
- 十位 `0`: `low`可能为`10 - 19`共`10`种情况，`high`可以取`0 - 80`共`81`种情况，所有情况为`81 * 10 = 810`种情况。
- 百位 `1`: `low`可能为`100 - 199`共`100`种情况，`high`可以取`0 - 7`共`8`种情况;当`high`取`8`时，`low`还可以取`100 - 104`，所有情况为`100 * 8 + 4 = 804`种情况。
- 千位 `8`:`low`可能为`1000 - 1999`共`1000`种情况，当前已经是最高位了，`high`只有一种情况，所有情况为`1000 * 1 = 1000`种情况。

![机器人的运动范围动画](https://s.poetries.top/gitee/2020/09/img/%E6%95%B4%E6%95%B0%E4%B8%AD1%E5%87%BA%E7%8E%B0%E7%9A%84%E6%AC%A1%E6%95%B0.png)

由以上示例：分三种情况考虑，现有数字`abcde`，分析百位数字`c`

- `c = 0` : 有 `ab*100` 种情况
- `c = 1` : 有 `ab*100 + de + 1` 种情况
- `c > 2` : 有 `(ab+1) * 100` 种情况

`c`是`abcde`第`3`位数：

当前的量级：`level = 10`的`(3-1)`次方

- `ab = abcde / (level*10)`
- `c = (abcde / (level)) % 10`
- `de = abcde % level`

## 代码

```js
    function NumberOf1Between1AndN_Solution(n) {
      let count = 0;
      let i = 1;
      let high = low = current = level = 0;
      let length = n.toString().length;
      while (i <= length) {
        level = Math.pow(10, i - 1); //第i位数位于什么量级 1 10 100 ...
        high = parseInt(n / (level * 10));
        low = n % level;
        current = parseInt(n / level) % 10;
        if (current === 0) {
          count += (high * level);
        } else if (current === 1) {
          count += (high * level + low + 1);
        } else {
          count += ((high + 1) * level);
        }
        i++;
      }
      return count;
    }
```

# 数学运算_字符串转换成整数

## 题目

将一个字符串转换成一个整数(实现`Integer.valueOf(string)`的功能，但是`string`不符合数字要求时返回0)，要求不能使用字符串转换整数的库函数。 数值为0或者字符串不是一个合法的数值则返回0。

## 思路

循环字符串：当前值*10相加，循环时看每一项是否合法，最后根据首位符号判断正负

主要考虑编写代码的严谨性，需要判断以下异常情况

- 1.输入为空
- 2.有无符号 正负

## 代码

```js
    function StrToInt(str) {
      if (str == undefined || str == '') {
        return 0;
      }
      const first = str[0];
      let i = 1;
      let int = 0;
      if (first >= 0 && first <= 9) {
        int = first;
      } else if (first !== '-' && first !== '+') {
        return 0;
      }
      while (i < str.length) {
        if (str[i] >= 0 && str[i] <= 9) {
          int = int * 10 + (str[i] - 0);
          i++;
        } else {
          return 0;
        }
      }
      return first === '-' ? 0 - int : int;
    }
```



# 贪心算法_分发饼干

## 题目

假设你是一位很棒的家长，想要给你的孩子们一些小饼干。但是，每个孩子最多只能给一块饼干。对每个孩子 i ，都有一个胃口值 `gi` ，这是能让孩子们满足胃口的饼干的最小尺寸；并且每块饼干 j ，都有一个尺寸 `sj` 。如果 `sj >= gi` ，我们可以将这个饼干 j 分配给孩子 i ，这个孩子会得到满足。你的目标是尽可能满足越多数量的孩子，并输出这个最大数值。

注意：

你可以假设胃口值为正。 一个小朋友最多只能拥有一块饼干。

示例 1:

```js
输入: [1,2,3], [1,1]

输出: 1

解释: 
你有三个孩子和两块小饼干，3个孩子的胃口值分别是：1,2,3。
虽然你有两块小饼干，由于他们的尺寸都是1，你只能让胃口值是1的孩子满足。
所以你应该输出1。
```

示例 2:

```js
输入: [1,2], [1,2,3]

输出: 2

解释: 
你有两个孩子和三块小饼干，2个孩子的胃口值分别是1,2。
你拥有的饼干数量和尺寸都足以让所有孩子满足。
所以你应该输出2.
```

## 思路

> 优先使用最小的饼干满足最小的胃口

- 孩子胃口，饼干大小从小到大排序
- 优先满足胃口小的孩子，满足后换一个胃口大的
- 使用糖果进行尝试，满足后换下一个大饼干

## 代码

```js
var findContentChildren = function(g, s) {
    g = g.sort((a, b) => a - b);
    s = s.sort((a, b) => a - b);
    let num = 0;
    let cookie = 0;
    let child = 0;
    while (cookie < s.length && child < g.length) {
        if (g[child] <= s[cookie]) {
            num += 1
            child += 1
        }
        cookie += 1
    }
    return num
};
```

## 考察点

- 贪心算法



# 贪心算法

贪心算法：对问题求解的时候，总是做出在当前看来是最好的做法。

适用贪心算法的场景：问题能够分解成子问题来解决，子问题的最优解能递推到最终问题的最优解。这种子问题最优解成为最优子结构

![img](https://i.loli.net/2019/08/18/ZqOBvnsPUFVzXWp.jpg)

### 买卖股票类问题

- [买卖股票的最佳时机 II(opens new window)](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)
- [买卖股票的最佳时机含手续费(opens new window)](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee)

### 货币选择问题

- [零钱兑换(opens new window)](https://leetcode-cn.com/problems/coin-change)
- [零钱兑换 II(opens new window)](https://leetcode-cn.com/problems/coin-change-2)

贪心算法与动态规划的不同在于它对每个子问题的解决方案都作出选择，不能回退，动态规划则会保存以前的运算结果，并根据以前的结果对当前进行选择，有回退功能，而回溯算法就是大量的重复计算来获得最优解。

![img](https://i.loli.net/2019/08/18/HQge7bvB6SWdotp.jpg)

有很多算法题目都是可以用这三种思想同时解答的，但是总有一种最适合的解法，这就需要不断的练习和总结来进行深入的理解才能更好的选择解决办法。



# DFS和BFS

### 广度优先搜索

广度优先搜索（`BFS`）是一种遍历或搜索数据结构（如树或图）的算法，也可以在更抽象的场景中使用。

它的特点是越是接近根结点的结点将越早地遍历。

例如，我们可以使用 `BFS` 找到从起始结点到目标结点的路径，特别是最短路径。

在`BFS`中，结点的处理顺序与它们添加到队列的顺序是完全相同的顺序，即先进先出，所以广度优先搜索一般使用队列实现。

- [从上到下打印二叉树(opens new window)](https://www.conardli.top/docs/dataStructure/二叉树/从上到下打印二叉树.html)
- [单词接龙(opens new window)](https://leetcode-cn.com/problems/word-ladder/)
- [员工的重要性(opens new window)](https://leetcode-cn.com/problems/employee-importance/)
- [岛屿数量(opens new window)](https://leetcode-cn.com/problems/number-of-islands/)

### 深度优先搜索

和广度优先搜索一样，深度优先搜索（`DFS`）是用于在树/图中遍历/搜索的一种重要算法。

与 `BFS` 不同，更早访问的结点可能不是更靠近根结点的结点。因此，你在`DFS` 中找到的第一条路径可能不是最短路径。

![img](https://i.loli.net/2019/08/19/uNAkPfLY9HRjVQU.png)

在`DFS`中，结点的处理顺序是完全相反的顺序，就像它们被添加到栈中一样，它是后进先出。所以深度优先搜索一般使用栈实现。

- [二叉树的中序遍历(opens new window)](https://www.conardli.top/docs/dataStructure/二叉树/二叉树的中序遍历.html)
- [二叉树的最大深度(opens new window)](https://www.conardli.top/docs/dataStructure/二叉树/二叉树的最大深度.html)
- [路径总和(opens new window)](https://leetcode-cn.com/problems/path-sum/)
- [课程表(opens new window)](https://leetcode-cn.com/problems/course-schedule/)
- [岛屿数量(opens new window)](https://leetcode-cn.com/problems/number-of-islands/)



# LeetCode

# 两数之和

## 题目

给定一个整数数组 `nums` 和一个目标值 `target`，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

示例:

```js
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```

## 思路

使用一个`map`将遍历过的数字存起来，值作为`key`，下标作为值。

对于每一次遍历：

- 取`map`中查找是否有`key`为`target-nums[i]`的值
- 如果取到了，则条件成立，返回。
- 如果没有取到，将当前值作为`key`，下标作为值存入`map`

时间复杂度：`O(n)`

空间复杂度`O(n)`

## 代码

```js
    var twoSum = function (nums, target) {
      const map = {};
      if (Array.isArray(nums)) {
        for (let i = 0; i < nums.length; i++) {
          if (map[target - nums[i]] != undefined) {
            return [map[target - nums[i]], i];
          } else {
            map[nums[i]] = i;
          }
        }
      }
      return [];
    };
```

# 三数之和

## 题目

给定一个包含 `n` 个整数的数组`nums`，判断 `nums` 中是否存在三个元素`a，b，c` ，使得 `a + b + c = 0 ？`找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。

```js
例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]
```

## 思路

题目中说明可能会出现多组结果，所以我们要考虑好去重

- 1.为了方便去重，我们首先将数组排序
- 2.对数组进行遍历，取当前遍历的数`nums[i]`为一个基准数，遍历数后面的数组为寻找数组
- 3.在寻找数组中设定两个起点，最左侧的`left`(`i+1`)和最右侧的`right`(`length-1`)
- 4.判断`nums[i] + nums[left] + nums[right]`是否等于0，如果等于0，加入结果，并分别将`left`和`right`移动一位
- 5.如果结果大于0，将`right`向左移动一位，向结果逼近
- 5.如果结果小于0，将`left`向右移动一位，向结果逼近

注意整个过程中要考虑去重

## 代码

```js
    var threeSum = function (nums) {
      const result = [];
      nums.sort((a, b) => a - b);
      for (let i = 0; i < nums.length; i++) {
        // 跳过重复数字
        if (i && nums[i] === nums[i - 1]) { continue; }
        let left = i + 1;
        let right = nums.length - 1;
        while (left < right) {
          const sum = nums[i] + nums[left] + nums[right];
          if (sum > 0) {
            right--;
          } else if (sum < 0) {
            left++;
          } else {
            result.push([nums[i], nums[left++], nums[right--]]);
            // 跳过重复数字
            while (nums[left] === nums[left - 1]) {
              left++;
            }
            // 跳过重复数字
            while (nums[right] === nums[right + 1]) {
              right--;
            }
          }
        }
      }
      return result;
    }
```



# 四数之和

## 题目

给定一个包含 `n` 个整数的数组`nums`，判断 `nums` 中是否存在四个元素`a，b，c，d` ，使得 `a + b + c + d = 0 ？`找出所有满足条件且不重复的四元组。

注意：答案中不可以包含重复的四元组。

```js
给定数组 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。

满足要求的四元组集合为：
[
  [-1,  0, 0, 1],
  [-2, -1, 1, 2],
  [-2,  0, 0, 2]
]
```

## 思路

你已经经历了两数之和、三数之和，玩玩没想到，还有四数之和...

其实，后面还有五数之和，六数之和...

到这里其实我们就能发现一些规律，我们可以像[三数之和 (opens new window)](https://github.com/ConardLi/awesome-coding-js/blob/master/数据结构分类/数组/三数之和.md)那样，我们可以通过大小指针来逼近结果，从而达到降低一层时间复杂度的效果。

不管是几数之和，我们都用这种方法来进行优化。

## 代码

```js
var fourSum = function (nums, target) {
    if (nums.length < 4) {
        return [];
    }
    nums.sort((a, b) => a - b);
    const result = [];
    for (let i = 0; i < nums.length - 3; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) {
            break;
        }
        for (let j = i + 1; j < nums.length - 2; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) {
                continue;
            }
            let left = j + 1,
                right = nums.length - 1;
            while (left < right) {
                const sum = nums[i] + nums[j] + nums[left] + nums[right];
                if (sum === target) {
                    result.push([nums[i], nums[j], nums[left], nums[right]]);
                }
                if (sum <= target) {
                    while (nums[left] === nums[++left]);
                } else {
                    while (nums[right] === nums[--right]);
                }
            }
        }
    }
    return result;
};
```

# N皇后问题

## 题目

n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/8-queens.png)

上图为 8 皇后问题的一种解法。

给定一个整数 n，返回所有不同的 n 皇后问题的解决方案。

```js
输入: 4
输出: 2
解释: 4 皇后问题存在如下两个不同的解法。
[
 [".Q..",  // 解法 1
  "...Q",
  "Q...",
  "..Q."],

 ["..Q.",  // 解法 2
  "Q...",
  "...Q",
  ".Q.."]
]
```

## 思路

回溯法：深度优先遍历（列数作为同级，行数作为深层）+ 剪枝

- 递归深度达到最后一层：达到一个符合条件的解，向上回溯，想结果中添加当前的皇后位置列表
- 循环所有同级向深层递归，将每一层皇后的位置进行记录
- 当前位置在已放好皇后的攻击范围内：当前位置不能放置皇后
- 没有命中上面的规则，说明当前位置可放置皇后，向更深层递归
- 将结果进行可视化绘制

## 代码

```js
  var solveNQueens = function (n) {
      const cols = new Set();
      const left = new Set();
      const right = new Set();
      const result = []
      solveNQueensCore(0, n, cols, left, right, result, []);
      return draw(result, n);
    };

    var solveNQueensCore = function (row, n, cols, left, right, result, temp) {
      if (row === n) {
        result.push([...temp]);
        temp = [];
      }
      for (let i = 0; i < n; i++) {
        if (!cols.has(i) && !right.has(row - i) && !left.has(row + i)) {
          cols.add(i);
          left.add(row + i);
          right.add(row - i);
          temp[row] = i;
          solveNQueensCore(row + 1, n, cols, left, right, result, temp);
          cols.delete(i);
          left.delete(row + i);
          right.delete(row - i);
        }
      }
    };

    function draw(array, n) {
      const result = [];
      array.forEach(element => {
        const panel = [];
        element.forEach(index => {
          const temp = new Array(n).fill('.');
          temp[index] = 'Q';
          panel.push(temp.join(''));
        });
        result.push(panel);
      });
      return result;
    }
```



# N皇后问题2

## 题目

n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/8-queens.png)

上图为 8 皇后问题的一种解法。

给定一个整数 n，返回 n 皇后不同的解决方案的数量。

```js
输入: 4
输出: 2
解释: 4 皇后问题存在如下两个不同的解法。
[
 [".Q..",  // 解法 1
  "...Q",
  "Q...",
  "..Q."],

 ["..Q.",  // 解法 2
  "Q...",
  "...Q",
  ".Q.."]
]
```

## 思路

回溯法：深度优先遍历（列数作为同级，行数作为深层）+ 剪枝

- 递归深度达到最后一层：达到一个符合条件的解，向上回溯，返回1
- 循环所有同级向深层递归，并将每次递归的返回值累加
- 当前位置在已放好皇后的攻击范围内：当前位置不能放置皇后
- 没有命中上面的规则，说明当前位置可放置皇后，向更深层递归

## 代码

```js
    var totalNQueens = function (n) {
      const cols = new Set();
      const left = new Set();
      const right = new Set();
      return totalNQueensCore(0, n, cols, left, right);
    };

    var totalNQueensCore = function (row, n, cols, left, right) {
      let result = 0;
      if (row === n) {
        return 1;
      }
      for (let i = 0; i < n; i++) {
        if (!cols.has(i) && !right.has(row - i) && !left.has(row + i)) {
          cols.add(i);
          left.add(row + i);
          right.add(row - i);

          result += totalNQueensCore(row + 1, n, cols, left, right);
          cols.delete(i);
          left.delete(row + i);
          right.delete(row - i);
        }
      }
      return result;
    };
```



# 最小路径和

## 题目

给定一个包含非负整数的 `m x n` 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

说明：每次只能向下或者向右移动一步。

示例:

```js
输入:
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
输出: 7
解释: 因为路径 1→3→1→1→1 的总和最小。
```

## 思路

新建一个额外的 dpdp 数组，与原矩阵大小相同。在这个矩阵中，`dp(i, j)dp(i,j)` 表示从坐标 `(i, j)(i,j)` 到右下角的最小路径权值。

我们初始化右下角的 `dpdp` 值为对应的原矩阵值，然后去填整个矩阵，对于每个元素考虑移动到右边或者下面，因此获得最小路径和我们有如下递推公式：

```js
dp(i,j)=grid(i,j)+min(dp(i+1,j),dp(i,j+1))
```

时间复杂度 ：`O(mn)O(mn)` 空间复杂度 ：`O(mn)O(mn)`

## 代码

```js
var minPathSum = function (grid) {
	var m = grid.length;
	var n = grid[0].length;
	for (var i = 0; i < m; i++) {
		for (var j = 0; j < n; j++) {
			if (i === 0 && j !== 0) {
				grid[i][j] += grid[i][j - 1];
			} else if (j === 0 && i !== 0) {
				grid[i][j] += grid[i - 1][j];
			} else if (i !== 0 && j !== 0) {
				grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
			}
		}
	}
	return grid[m - 1][n - 1];
};
```

## 考察点

- 动态规划



# 二叉树中序遍历

## 题目

给定一个二叉树，返回它的 中序 遍历。

示例:

```js
输入: [1,null,2,3]
   1
    \
     2
    /
   3
输出: [1,3,2]
```

进阶: 递归算法很简单，你可以通过迭代算法完成吗？

## 代码

递归实现

```js
    var inorderTraversal = function (root, array = []) {
      if (root) {
        inorderTraversal(root.left, array);
        array.push(root.val);
        inorderTraversal(root.right, array);
      }
      return array;
    };
```

非递归实现

- 取根节点为目标节点，开始遍历
- 1.左孩子入栈 -> 直至左孩子为空的节点
- 2.节点出栈 -> 访问该节点
- 3.以右孩子为目标节点，再依次执行1、2、3

```js
    var inorderTraversal = function (root) {
      const result = [];
      const stack = [];
      let current = root;
      while (current || stack.length > 0) {
        while (current) {
          stack.push(current);
          current = current.left;
        }
        current = stack.pop();
        result.push(current.val);
        current = current.right;
      }
      return result;
    };
```



# 二叉树的最小深度

## 题目



给定一个二叉树，找出其最小深度。

最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

说明: 叶子节点是指没有子节点的节点。

示例:

给定二叉树 `[3,9,20,null,null,15,7]`,

```js
    3
   / \
  9  20
    /  \
   15   7
```

返回它的最小深度 2

## 思路



深度优先 + 分治

- 左右子树都不为空：左子树深度和右子树最小深度的最小值 + 1
- 左树为空：右子树最小深度的最小值 + 1
- 右树为空：左子树最小深度 + 1

## 代码



```js
    var minDepth = function (root) {
      if (!root) {
        return 0;
      }
      if (!root.left) {
        return 1 + minDepth(root.right);
      }
      if (!root.right) {
        return 1 + minDepth(root.left);
      }
      return Math.min(minDepth(root.left), minDepth(root.right)) + 1
    };
```

## 考察点



- 二叉树
- 递归
- 分治



# 二叉树的前序遍历

## 题目



给定一个二叉树，返回它的 前序 遍历。

示例:

```js
输入: [1,null,2,3]  
   1
    \
     2
    /
   3 
输出: [1,2,3]
```

进阶: 递归算法很简单，你可以通过迭代算法完成吗？

## 代码



递归实现

```js
    var preorderTraversal = function (root, array = []) {
      if (root) {
        array.push(root.val);
        preorderTraversal(root.left, array);
        preorderTraversal(root.right, array);
      }
      return array;
    };
```

非递归实现

- 取跟节点为目标节点，开始遍历
- 1.访问目标节点
- 2.左孩子入栈 -> 直至左孩子为空的节点
- 3.节点出栈，以右孩子为目标节点，再依次执行1、2、3

```js
    var preorderTraversal = function (root) {
      const result = [];
      const stack = [];
      let current = root;
      while (current || stack.length > 0) {
        while (current) {
          result.push(current.val);
          stack.push(current);
          current = current.left;
        }
        current = stack.pop();
        current = current.right;
      }
      return result;
    };
```



# 二叉树的后序遍历

## 题目



给定一个二叉树，返回它的 后序 遍历。

示例:

```js
输入: [1,null,2,3]  
   1
    \
     2
    /
   3 
输出: [3,2,1]
```

进阶: 递归算法很简单，你可以通过迭代算法完成吗？

## 代码



递归实现

```js
    var postorderTraversal = function (root, array = []) {
      if (root) {
        postorderTraversal(root.left, array);
        postorderTraversal(root.right, array);
        array.push(root.val);
      }
      return array;
    };
```

非递归实现

- 取根节点为目标节点，开始遍历
- 1.左孩子入栈 -> 直至左孩子为空的节点
- 2.栈顶节点的右节点为空或右节点被访问过 -> 节点出栈并访问他，将节点标记为已访问
- 3.栈顶节点的右节点不为空且未被访问，以右孩子为目标节点，再依次执行1、2、3

```js
    var postorderTraversal = function (root) {
      const result = [];
      const stack = [];
      let last = null; // 标记上一个访问的节点
      let current = root;
      while (current || stack.length > 0) {
        while (current) {
          stack.push(current);
          current = current.left;
        }
        current = stack[stack.length - 1];
        if (!current.right || current.right == last) {
          current = stack.pop();
          result.push(current.val);
          last = current;
          current = null; // 继续弹栈
        } else {
          current = current.right;
        }
      }
      return result;
    }
```



# 打家劫舍

## 题目

你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你在不触动警报装置的情况下，能够偷窃到的最高金额。

```js
示例 1:

输入: [1,2,3,1]
输出: 4
解释: 偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
     偷窃到的最高金额 = 1 + 3 = 4 。
示例 2:

输入: [2,7,9,3,1]
输出: 12
解释: 偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
     偷窃到的最高金额 = 2 + 9 + 1 = 12 。
```

## 思路

考虑所有可能的抢劫方案过于困难。一个自然而然的想法是首先从最简单的情况开始。记：

`f(k)` = 从前 k 个房屋中能抢劫到的最大数额，`Ai` = 第 i 个房屋的钱数。

首先看`n = 1` 的情况，显然 `f(1) = A1`。

再看 `n = 2`，`f(2) = max(A1, A2)`。

对于 `n = 3`，有两个选项:

抢第三个房子，将数额与第一个房子相加。

不抢第三个房子，保持现有最大数额。

显然，你想选择数额更大的选项。于是，可以总结出公式：

```
f(k) = max(f(k – 2) + Ak, f(k – 1))
```

## 代码

```js
    var rob = function (nums) {
      var len = nums.length;
      if (len < 2) {
        return nums[len - 1] ? nums[len - 1] : 0;
      }
      var current = [nums[0], Math.max(nums[0], nums[1])];
      for (var k = 2; k < len; k++) {
        current[k] = Math.max(current[k - 2] + nums[k], current[k - 1]);
      }
      return current[len - 1];
    };
```

# 滑动窗口的最大值

## 题目

给定一个数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口 k 内的数字。滑动窗口每次只向右移动一位。 返回滑动窗口最大值。

```js
输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
输出: [3,3,5,5,6,7] 
解释: 
  滑动窗口的位置                最大值
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
```

## 思路

使用一个双端队列（队列两面都可进出），用于存储处于窗口中的值的下标，保证窗口头部元素永远是窗口最大值

- 1.当前进入的元素下标 - 窗口头部元素的下标 >= k 头部元素移出队列
- 2.如果当前数字大于队列尾，则删除队列尾，直到当前数字小于等于队列尾，或者队列空 （保证窗口中左侧的值均大于当前入队列的值，这样做可以保证当下次循环窗口头部的元素出队后，窗口头部元素仍然为最大值）
- 3.队列元素入队
- 4.第k次遍历后开始向结果中添加最大值

![img](https://s.poetries.top/gitee/2020/09/img/%E6%BB%91%E5%8A%A8%E7%AA%97%E5%8F%A3%E7%9A%84%E6%9C%80%E5%A4%A7%E5%80%BC.png)

时间复杂度：`O(n)`

空间复杂度：`O(n)`

- 使用优先队列也可以实现，时间复杂度为`O(nlogk)`

## 代码

```js
    var maxSlidingWindow = function (nums, k) {
      const window = [];
      const result = [];
      for (let i = 0; i < nums.length; i++) {
        if (i - window[0] > k - 1) {
          window.shift();
        }
        let j = window.length - 1;
        while (j >= 0 && nums[window[j]] <= nums[i]) {
          j--;
          window.pop();
        }
        window.push(i);
        if (i >= k - 1) {
          result.push(nums[window[0]]);
        }
      }
      return result;
    };
```

## 考察点

- 队列



# 数据流的中位数

解析见：[数据流中的中位数](https://interview.poetries.top/fe-algorithm-docs/堆/数据流中的中位数.html)

```js
/**
 * initialize your data structure here.
 */
var MedianFinder = function() {
    this.maxHeap = new Heap('max');
    this.minHeap = new Heap('min');
    this.count = 0;
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
      this.count++;
      if (this.count % 2 === 1) {
        
        this.maxHeap.add(num);
        this.minHeap.add(this.maxHeap.pop());
      } else {
        this.minHeap.add(num);
        this.maxHeap.add(this.minHeap.pop());
      }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
     if (this.count === 0) {
        return 0;
      }
      if (this.count % 2 === 1) {
        return this.minHeap.value[0];
      } else {
        return (this.minHeap.value[0] + this.maxHeap.value[0]) / 2
      }
};


    function Heap(type = 'min') {
      this.type = type;
      this.value = [];
    }

    Heap.prototype.create = function () {
      const length = this.value.length;
      for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
        this.ajust(i, length);
      }
    }

    Heap.prototype.ajust = function (index, length) {
      const array = this.value;
      for (let i = 2 * index + 1; i < length; i = 2 * i + 1) {
        if (i + 1 < length) {
          if ((this.type === 'max' && array[i + 1] > array[i]) ||
            (this.type === 'min' && array[i + 1] < array[i])) {
            i++;
          }
        }
        if ((this.type === 'max' && array[index] < [array[i]]) ||
          (this.type === 'min' && array[index] > [array[i]])) {
          [array[index], array[i]] = [array[i], array[index]];
          index = i;
        } else {
          break;
        }
      }
    }

    Heap.prototype.add = function (element) {
      const array = this.value;
      array.push(element);
      if (array.length > 1) {
        let index = array.length - 1;
        let target = Math.floor((index - 1) / 2);
        while (target >= 0) {
          if ((this.type === 'min' && array[index] < array[target]) ||
            (this.type === 'max' && array[index] > array[target])) {
            [array[index], array[target]] = [array[target], array[index]]
            index = target;
            target = Math.floor((index - 1) / 2);
          } else {
            break;
          }
        }
      }
    }

    Heap.prototype.pop = function () {
      const array = this.value;
      let result = null;
      if (array.length > 1) {
        result = array[0];
        array[0] = array.pop();
        this.ajust(0, array.length);
      } else if (array.length === 1) {
        return array.pop();
      }
      return result;
    }
```



# 分发饼干

## 题目

假设你是一位很棒的家长，想要给你的孩子们一些小饼干。但是，每个孩子最多只能给一块饼干。对每个孩子 i ，都有一个胃口值 `gi` ，这是能让孩子们满足胃口的饼干的最小尺寸；并且每块饼干 j ，都有一个尺寸 `sj` 。如果 `sj >= gi` ，我们可以将这个饼干 j 分配给孩子 i ，这个孩子会得到满足。你的目标是尽可能满足越多数量的孩子，并输出这个最大数值。

注意：

你可以假设胃口值为正。 一个小朋友最多只能拥有一块饼干。

示例 1:

```js
输入: [1,2,3], [1,1]

输出: 1

解释: 
你有三个孩子和两块小饼干，3个孩子的胃口值分别是：1,2,3。
虽然你有两块小饼干，由于他们的尺寸都是1，你只能让胃口值是1的孩子满足。
所以你应该输出1。
```

示例 2:

```js
输入: [1,2], [1,2,3]

输出: 2

解释: 
你有两个孩子和三块小饼干，2个孩子的胃口值分别是1,2。
你拥有的饼干数量和尺寸都足以让所有孩子满足。
所以你应该输出2.
```

## 思路

> 优先使用最小的饼干满足最小的胃口

- 孩子胃口，饼干大小从小到大排序
- 优先满足胃口小的孩子，满足后换一个胃口大的
- 使用糖果进行尝试，满足后换下一个大饼干

## 代码

```js
var findContentChildren = function(g, s) {
    g = g.sort((a, b) => a - b);
    s = s.sort((a, b) => a - b);
    let num = 0;
    let cookie = 0;
    let child = 0;
    while (cookie < s.length && child < g.length) {
        if (g[child] <= s[cookie]) {
            num += 1
            child += 1
        }
        cookie += 1
    }
    return num
};
```

## 考察点

- 贪心算法



# 剑指Offer

# 二维数组查找

## 题目

假设你是一位很棒的家长，想要给你的孩子们一些小饼干。但是，每个孩子最多只能给一块饼干。对每个孩子 i ，都有一个胃口值 `gi` ，这是能让孩子们满足胃口的饼干的最小尺寸；并且每块饼干 j ，都有一个尺寸 `sj` 。如果 `sj >= gi` ，我们可以将这个饼干 j 分配给孩子 i ，这个孩子会得到满足。你的目标是尽可能满足越多数量的孩子，并输出这个最大数值。

注意：

你可以假设胃口值为正。 一个小朋友最多只能拥有一块饼干。

示例 1:

```js
输入: [1,2,3], [1,1]

输出: 1

解释: 
你有三个孩子和两块小饼干，3个孩子的胃口值分别是：1,2,3。
虽然你有两块小饼干，由于他们的尺寸都是1，你只能让胃口值是1的孩子满足。
所以你应该输出1。
```

示例 2:

```js
输入: [1,2], [1,2,3]

输出: 2

解释: 
你有两个孩子和三块小饼干，2个孩子的胃口值分别是1,2。
你拥有的饼干数量和尺寸都足以让所有孩子满足。
所以你应该输出2.
```

## 思路

> 优先使用最小的饼干满足最小的胃口

- 孩子胃口，饼干大小从小到大排序
- 优先满足胃口小的孩子，满足后换一个胃口大的
- 使用糖果进行尝试，满足后换下一个大饼干

## 代码

```js
var findContentChildren = function(g, s) {
    g = g.sort((a, b) => a - b);
    s = s.sort((a, b) => a - b);
    let num = 0;
    let cookie = 0;
    let child = 0;
    while (cookie < s.length && child < g.length) {
        if (g[child] <= s[cookie]) {
            num += 1
            child += 1
        }
        cookie += 1
    }
    return num
};
```

## 考察点

- 贪心算法



# 替换空格

## 题目

请实现一个函数，将一个字符串中的每个空格替换成`“%20”`。例如，当字符串为`We Are Happy`。则经过替换之后的字符串为`We%20Are%20Happy`。

## 代码

1.直接用空格将字符串切割成数组，再用`20%`进行连接。

```js
function replaceSpace(str)
{
    return str.split(' ').join('%20');
}
```

2.用正则表达式找到所有空格依次替换

```js
function replaceSpace(str)
{
    return str.replace(/\s/g,'%20');
}
```

## 拓展

允许出现多个空格，多个空格用一个`20%`替换：

用正则表达式找到连续空格进行替换

```js
function replaceSpace(str)
{
    return str.replace(/\s+/g,'%20');
}
```

## 考察点

- 字符串
- 正则



# 从尾到头打印链表

## 题目

输入一个链表，按链表值从尾到头的顺序返回一个`ArrayList`。

## 分析

要了解链表的数据结构：

`val`属性存储当前的值，`next`属性存储下一个节点的引用。

要遍历链表就是不断找到当前节点的`next`节点，当`next`节点是`null`时，说明是最后一个节点，停止遍历。

因为是从尾到头的顺序，使用一个队列来存储打印结果，每次从队列头部插入。

## 代码

```js
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function printListFromTailToHead(head)
{
    const array = [];
    while(head){
        array.unshift(head.val);
        head = head.next;
    }
    return array;
}
```

## 考察点

- 链表



# 重建二叉树

## 题目1-二叉树重建

输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。

例如输入前序遍历序列`{1,2,4,7,3,5,6,8}`和中序遍历序列`{4,7,2,1,5,3,8,6}`，则重建二叉树并返回。

## 思路

- 前序遍历：根节点 + 左子树前序遍历 + 右子树前序遍历
- 中序遍历：左子树中序遍历 + 根节点 + 右字数中序遍历
- 后序遍历：左子树后序遍历 + 右子树后序遍历 + 根节点

根据上面的规律：

- 前序遍历找到根结点`root`
- 找到`root`在中序遍历的位置 -> 左子树的长度和右子树的长度
- 截取左子树的中序遍历、右子树的中序遍历
- 截取左子树的前序遍历、右子树的前序遍历
- 递归重建二叉树

![img](https://s.poetries.top/gitee/2020/09/img/%E9%87%8D%E5%BB%BA%E4%BA%8C%E5%8F%89%E6%A0%91.png)

## 代码

```js
    function reConstructBinaryTree(pre, vin) {
        if(pre.length === 0){
            return null;
        }
        if(pre.length === 1){
            return new TreeNode(pre[0]);
        }
        const value = pre[0];
        const index = vin.indexOf(value);
        const vinLeft = vin.slice(0,index);
        const vinRight = vin.slice(index+1);
        const preLeft = pre.slice(1,index+1);
        const preRight = pre.slice(index+1);
        const node = new TreeNode(value);
        node.left = reConstructBinaryTree(preLeft, vinLeft);
        node.right = reConstructBinaryTree(preRight, vinRight);
        return node;
    }
```

## 题目2-求二叉树的遍历

给定一棵二叉树的前序遍历和中序遍历，求其后序遍历

输入描述:

两个字符串，其长度n均小于等于26。 第一行为前序遍历，第二行为中序遍历。 二叉树中的结点名称以大写字母表示：A，B，C....最多26个结点。

输出描述:

输入样例可能有多组，对于每组测试样例， 输出一行，为后序遍历的字符串。

样例：

```text
输入
ABC
BAC
FDXEAG
XDEFAG

输出
BCA
XEDGAF
```

## 思路

和上面题目的思路基本相同

- 前序遍历找到根结点`root`
- 找到`root`在中序遍历的位置 -> 左子树的长度和右子树的长度
- 截取左子树的中序遍历、右子树的中序遍历
- 截取左子树的前序遍历、右子树的前序遍历
- 递归拼接二叉树的后序遍历

## 代码

```js
let pre;
let vin;
 
while((pre = readline())!=null){
    vin = readline();
    print(getHRD(pre,vin));
}
 
    function getHRD(pre, vin) {
      if (!pre) {
        return '';
      }
      if (pre.length === 1) {
        return pre;
      }
      const head = pre[0];
      const splitIndex = vin.indexOf(head);
      const vinLeft = vin.substring(0, splitIndex);
      const vinRight = vin.substring(splitIndex + 1);
      const preLeft = pre.substring(1, splitIndex + 1);
      const preRight = pre.substring(splitIndex + 1);
      return getHRD(preLeft, vinLeft) + getHRD(preRight, vinRight) + head;
    }
```

## 考察点

- 二叉树
- 复杂问题拆解



# 二叉树的下一个节点

## 题目

给定一个二叉树和其中的一个结点，请找出中序遍历顺序的下一个结点并且返回。注意，树中的结点不仅包含左右子结点，同时包含指向父结点的指针。

## 思路

中序遍历的顺序 左 - 根 - 右

所以寻找下一个节点的优先级应该反过来 优先级 右 - 根 - 左

- 右节点不为空 - 取右节点的最左侧节点
- 右节点为空 - 如果节点是父亲节的左节点 取父节点
- 右节点为空 - 如果节点是父亲节的右节点 父节点已经被遍历过，再往上层寻找...
- 左节点一定在当前节点之前被遍历过

以下图的二叉树来分析：

![img](https://s.poetries.top/gitee/2020/09/img/%E4%BA%8C%E5%8F%89%E6%A0%91.jpeg)

中序遍历： CBDAEF

- B - 右节点不为空，下一个节点为右节点D
- C - 右节点为空，C是父节点的左节点，取父节点B
- D - 右节点为空，D是父节点的右节点，再往上蹭分析，B是其父节点的左节点，取B的父节点A
- F - 右节点为空，F是父节点的右节点，没有符合条件的节点，F为遍历的最后一个节点，返回null

## 代码

```js
    /*function TreeLinkNode(x){
        this.val = x;
        this.left = null;
        this.right = null;
        this.next = null;
    }*/
    function GetNext(pNode) {
      if (!pNode) {
        return null;
      }
      if (pNode.right) {
        pNode = pNode.right;
        while (pNode.left) {
          pNode = pNode.left;
        }
        return pNode;
      } else {
        while (pNode) {
          if (!pNode.next) {
            return null;
          } else if (pNode == pNode.next.left) {
            return pNode.next;
          }
          pNode = pNode.next;
        }
        return pNode;
      }
    }
```

## 考察点

- 二叉树
- 复杂问题拆解



# 用两个栈实现队列

## 题目

用两个栈来实现一个队列，完成队列的Push和Pop操作。 队列中的元素为int类型。

## 思路

**栈1:**

用于入队列存储

**栈2:**

出队列时将栈1的数据依次出栈，并入栈到栈2中

栈2出栈即栈1的底部数据即队列要出的数据。

**注意:**

栈2为空才能补充栈1的数据，否则会打乱当前的顺序。

![img](https://s.poetries.top/gitee/2020/09/img/queue.png)

## 代码

```js
const stack1 = [];
const stack2 = [];

function push(node)
{
    stack1.push(node);
}
function pop()
{
    if(stack2.length === 0){
       while(stack1.length>0){
        stack2.push(stack1.pop());
       }
    }
    return stack2.pop() || null;
}
```



# 2跳台阶

## 题目

一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法（先后次序不同算不同的结果）。

## 基本思路

找规律：

跳三级台阶等于跳两级台阶的跳法+跳一级台阶的跳法。

跳四级台阶等于跳三级台阶的跳法+跳二级台阶的跳法。

明显也符合斐波那契数列的规律

> f(n) = f(n-1) + f(n-2)

## 代码

```js
function jumpFloor(n)
{
    if(n<=2){
        return n;
    }
    let i = 2;
    let pre = 1;
    let current = 2;
    let result = 0;
    while(i++ < n){
        result = pre + current;
        pre = current;
        current = result;
    }
    return result;
}
```



# 3变态跳台阶

## 题目

一只青蛙一次可以跳上1级台阶，也可以跳上2级……它也可以跳上n级。求该青蛙跳上一个n级的台阶总共有多少种跳法。

> f(n) = f(n-1) + f(n-2)

## 基本思路

每个台阶都可以选择跳或者不跳，最后一个台阶必跳。

每个台阶有两种选择，n个台阶有2的n次方种选择。

所以一共有2的n-1次跳法。

使用位运算

## 代码

```js
function jumpFloorII(number)
{
    return 1<<(--number);
}
```



# 矩阵中的路径

## 题目

请设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。

路径可以从矩阵中的任意一个格子开始，每一步可以在矩阵中向左，向右，向上，向下移动一个格子。 如果一条路径经过了矩阵中的某一个格子，则之后不能再次进入这个格子。

例如`a b c e s f c s a d e e`这样的`3 X 4`矩阵中包含一条字符串`"bcced"`的路径，但是矩阵中不包含`"abcb"`路径，因为字符串的第一个字符b占据了矩阵中的第一行第二个格子之后，路径不能再次进入该格子。

```text
     a b c e 
     s f c s 
     a d e e
```

## 思路

回溯算法 问题由多个步骤组成，并且每个步骤都有多个选项。

依次验证path中的每个字符（多个步骤），每个字符可能出现在多个方向（多个选项）

- 1.根据给定的行列，遍历字符，根据行列数计算出字符位置
- 2.判断当前字符是否满足递归终止条件
- 3.递归终止条件：(1).行列越界 (2).与路径不匹配 (3).已经走过(需设定一个数组标识当前字符是否走过)
- 4.若路径中的字符最后一位匹配成功，则到达边界且满足约束条件，找到合适的解
- 5.递归不断寻找四个方向是否满足条件，满足条件再忘更深层递归，不满足向上回溯
- 6.如果回溯到最外层，则当前字符匹配失败，将当前字符标记为未走

![img](https://s.poetries.top/gitee/2020/09/img/%E7%9F%A9%E9%98%B5%E4%B8%AD%E7%9A%84%E8%B7%AF%E5%BE%84.png)

## 代码

```js
    function hasPath(matrix, rows, cols, path) {
      const flag = new Array(matrix.length).fill(false);
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (hasPathCore(matrix, i, j, rows, cols, path, flag, 0)) {
            return true;
          }
        }
      }
      return false;
    }

    function hasPathCore(matrix, i, j, rows, cols, path, flag, k) {
      const index = i * cols + j;
      if (i < 0 || j < 0 || i >= rows || j >= cols || matrix[index] != path[k] || flag[index]) {
        return false;
      }
      if (k === path.length - 1) {
        return true;
      }
      flag[index] = true;
      if (hasPathCore(matrix, i + 1, j, rows, cols, path, flag, k + 1) ||
        hasPathCore(matrix, i - 1, j, rows, cols, path, flag, k + 1) ||
        hasPathCore(matrix, i, j + 1, rows, cols, path, flag, k + 1) ||
        hasPathCore(matrix, i, j - 1, rows, cols, path, flag, k + 1)) {
        return true;
      }
      flag[index] = false;
      return false;
    }
```

## 考察点

- 回溯算法
- 二维数组



# 旋转数组的最小数字

## 题目

把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。 输入一个非减排序的数组的一个旋转，输出旋转数组的最小元素。 例如数组`{3,4,5,1,2}`为`{1,2,3,4,5}`的一个旋转，该数组的最小值为1。

> NOTE：给出的所有元素都大于0，若数组大小为0，请返回0。

## 基本思路

肯定不能直接遍历，失去了这道题的意义

旋转数组其实是由两个有序数组拼接而成的，因此我们可以使用二分法，只需要找到拼接点即可。

(1)`array[mid] > array[high]`:

出现这种情况的`array`类似`[3,4,5,6,0,1,2]`，此时最小数字一定在mid的右边。 `low = mid + 1`

(2)`array[mid] == array[high]`:

出现这种情况的`array`类似 `[1,0,1,1,1]`或者`[1,1,1,0,1]`，此时最小数字不好判断在mid左边 还是右边,这时只好一个一个试 。 `high = high - 1`

(3)`array[mid] < array[high]`:

出现这种情况的`array`类似`[2,2,3,4,5,6,6]`,此时最小数字一定就是`array[mid]`或者在`mid`的左 边。因为右边必然都是递增的。 `high = mid`

## 代码

```js
function minNumberInRotateArray(arr)
{
    let len = arr.length;
    if(len == 0)  return 0;
    let low = 0, high = len - 1;
    while(low < high) {
        let mid = low + Math.floor((high-low)/2);
        if(arr[mid] > arr[high]) {
            low = mid + 1;
        } else if(arr[mid] == arr[high]) {
            high = high - 1;
        } else {
            high = mid;
        }
    }
 
    return arr[low];
}
```

## 扩展

二分查找

```js
        function binarySearch(data, arr, start, end) {
            if (start > end) {
                return -1;
            }
            var mid = Math.floor((end + start) / 2);
            if (data == arr[mid]) {
                return mid;
            } else if (data < arr[mid]) {
                return binarySearch(data, arr, start, mid - 1);
            } else {
                return binarySearch(data, arr, mid + 1, end);
            }
        }
```

## 考察点

- 查找
- 数组



# 机器人的运动范围

## 题目

地上有一个m行和n列的方格。一个机器人从坐标0,0的格子开始移动，每一次只能向左，右，上，下四个方向移动一格，但是不能进入行坐标和列坐标的数位之和大于k的格子。

例如，当k为18时，机器人能够进入方格（35,37），因为3+5+3+7 = 18。但是，它不能进入方格（35,38），因为3+5+3+8 = 19。请问该机器人能够达到多少个格子？

## 思路

从第一个格开始走，进入递归

- 判断当前字符是否满足递归终止条件
- 递归终止条件：(1).行列越界 (2).行列值超出范围 (3).已经走过(需设定一个数组标识当前字符是否走过)
- 条件不满足，返回0，向上回溯。
- 若上面三个条件都满足，继续向下递归，返回四个方向的递归之和+1（当前节点）

下面是本算法的动画展示，可以点击[机器人的运动范围动画 (opens new window)](https://www.lisq.xyz/demo/机器人的运动范围.html)手动尝试。 ![机器人的运动范围动画](https://s.poetries.top/gitee/2020/09/img/%E6%9C%BA%E5%99%A8%E4%BA%BA%E8%BF%90%E5%8A%A8%E8%8C%83%E5%9B%B4.gif)

## 代码

```js
    function movingCount(threshold, rows, cols) {
      const flag = createArray(rows, cols);
      let count = 0;
      if (rows > 0 && cols > 0) {
        count = movingCountCore(0, 0, threshold, rows, cols, flag);
      }
      return count;
    }

    function movingCountCore(i, j, threshold, rows, cols, flag) {
      if (i < 0 || j < 0 || i >= rows || j >= cols) {
        return 0;
      }
      if (flag[i][j] || condition(i, j, threshold)) {
        flag[i][j] = true;
        return 0;
      }
      flag[i][j] = true;
      return 1 + movingCountCore(i - 1, j, threshold, rows, cols, flag) +
        movingCountCore(i + 1, j, threshold, rows, cols, flag) +
        movingCountCore(i, j - 1, threshold, rows, cols, flag) +
        movingCountCore(i, j + 1, threshold, rows, cols, flag);
    }

    /**
     * 判断是否符合条件
     */
    function condition(i, j, threshold) {
      let temp = i + '' + j;
      let sum = 0;
      for (var i = 0; i < temp.length; i++) {
        sum += temp.charAt(i) / 1;
      }
      return sum > threshold;
    }

    /**
     * 创建一个二维空数组
     */
    function createArray(rows, cols) {
      const result = new Array(rows) || [];
      for (let i = 0; i < rows; i++) {
        const arr = new Array(cols);
        for (let j = 0; j < cols; j++) {
          arr[j] = false;
        }
        result[i] = arr;
      }
      return result;
    }
```



# 二进制中1的个数

## 题目

输入一个整数，输出该数二进制表示中1的个数。其中负数用补码表示。

## 分析

这是一道考察二进制的题目

二进制或运算符`（or）`：符号为|，表示若两个二进制位都为`0`，则结果为`0`，否则为`1`。

二进制与运算符`（and）`：符号为&，表示若两个二进制位都为`1`，则结果为`1`，否则为`0`。

二进制否运算符`（not）`：符号为~，表示对一个二进制位取反。

异或运算符`（xor）`：符号为^，表示若两个二进制位不相同，则结果为1，否则为0

左移运算符`m << n`表示把m左移n位，左移n位的时候，最左边的n位将被丢弃，同时在最右边补上`n`个`0`，比如：

```js
00001010<<2 = 00101000
```

右移运算符`m >> n`表示把`m`右移`n`位，右移`n`位的时候，最右边的n位将被丢弃，同时在最左边补上`n`个`0`，比如：

```js
00001010>>2 = 00000010
```

我们可以让目标数字和一个数字做与运算

这个用户比较的数字必须只有一位是`1`其他位是`0`，这样就可以知道目标数字的这一位是否为`0`。

所以用于比较的这个数字初始值为`1`，比较完后让`1`左移`1`位，这样就可以依次比较所有位是否为`1`。

## 代码

```js
function NumberOf1(n)
{
    let flag = 1;
    let count = 0;
    while(flag){
        if(flag & n){
            count++;
        }
       flag = flag << 1;
    }
    return count;
}
```

# 数值的整数次方

给定一个`double`类型的浮点数`base`和`int`类型的整数`exponent`。求`base`的`exponent`次方。

## 思路

这道题逻辑上很简单，但很容易出错

关键是要考虑全面，考虑到所有情况

`exponent` 是正，负，`0`的情况

`base`为`0`的情况

## 代码

```js
    function Power(base, exponent) {
      if (exponent === 0) {
        return 1;
      } else {
        if (exponent > 0) {
          var result = 1;
          for (let i = 0; i < exponent; i++) {
            result *= base;
          }
          return result;
        } else if (exponent < 0) {
          var result = 1;
          for (let i = 0; i < Math.abs(exponent); i++) {
            result *= base;
          }
          return result ? 1 / result : false;
        }
      }
    }
```

# 删除链表中的节点or重复的节点

## 删除链表中的节点

给定单链表的头指针和要删除的指针节点，在O(1)时间内删除该节点。

- 1.删除的节点不是尾部节点 - 将next节点覆盖当前节点
- 2.删除的节点是尾部节点且等于头节点，只剩一个节点 - 将头节点置为null
- 3.删除的节点是尾节点且前面还有节点 - 遍历到末尾的前一个节点删除

只有第三种情况时间复杂度是O(n)，且这种情况只会出现1/n次，所以算法时间复杂度是O(1)

```js
    var deleteNode = function (head, node) {
      if (node.next) {
        node.val = node.next.val;
        node.next = node.next.next;
      } else if (node === head) {
        node = null;
        head = null;
      } else {
        node = head;
        while (node.next.next) {
          node = node.next;
        }
        node.next = null;
        node = null;
      }
      return node;
    };
```

## 删除链表中重复的节点

### 方法1.存储链表中元素出现的次数

- 1.用一个map存储每个节点出现的次数
- 2.删除出现次数大于1的节点

此方法删除节点时可以使用上面总结的办法。

时间复杂度：O(n)

空间复杂度：O(n)

```js
    function deleteDuplication(pHead) {
      const map = {};
      if (pHead && pHead.next) {
        let current = pHead;
        // 计数
        while (current) {
          const val = map[current.val];
          map[current.val] = val ? val + 1 : 1;
          current = current.next;
        }
        current = pHead;
        while (current) {
          const val = map[current.val];
          if (val > 1) {
            // 删除节点
            console.log(val);
            if (current.next) {
              current.val = current.next.val;
              current.next = current.next.next;
            } else if (current === pHead) {
              current = null;
              pHead = null;
            } else {
              current = pHead;
              while (current.next.next) {
                current = current.next;
              }
              current.next = null;
              current = null;
            }

          } else {
            current = current.next;
          }
        }
      }
      return pHead;
    }
```

### 方法2.重新比较连接数组

链表是排好顺序的，所以重复元素都会相邻出现 递归链表：

- 1.当前节点或当前节点的next为空，返回该节点
- 2.当前节点是重复节点：找到后面第一个不重复的节点
- 3.当前节点不重复：将当前的节点的next赋值为下一个不重复的节点

```js
    function deleteDuplication(pHead) {
      if (!pHead || !pHead.next) {
        return pHead;
      } else if (pHead.val === pHead.next.val) {
        let tempNode = pHead.next;
        while (tempNode && pHead.val === tempNode.val) {
          tempNode = tempNode.next;
        }
        return deleteDuplication(tempNode);
      } else {
        pHead.next = deleteDuplication(pHead.next);
        return pHead;
      }
    }
```

时间复杂度：O(n)

空间复杂度：O(1)

## 考察点

- 链表
- 考虑问题的全面性



# 正则表达式匹配

## 题目

请实现一个函数用来匹配包括'.'和'*'的正则表达式。 模式中的字符'.'表示任意一个字符，而'*'表示它前面的字符可以出现任意次（包含0次）。 在本题中，匹配是指字符串的所有字符匹配整个模式。 例如，字符串"aaa"与模式"a.a"和"ab*ac*a"匹配，但是与"aa.a"和"ab*a"均不匹配。

## 思路

当模式中的第二个字符不是“*”时：

- 1、如果字符串第一个字符和模式中的第一个字符相匹配，那么字符串和模式都后移一个字符，然后匹配剩余的。
- 2、如果 字符串第一个字符和模式中的第一个字符相不匹配，直接返回false。

而当模式中的第二个字符是“*”时：

- 如果字符串第一个字符跟模式第一个字符不匹配，则模式后移2个字符，继续匹配。

如果字符串第一个字符跟模式第一个字符匹配，可以有3种匹配方式：

- 1、模式后移2字符，相当于x*被忽略；
- 2、字符串后移1字符，模式后移2字符；
- 3、字符串后移1字符，模式不变，即继续匹配字符下一位，因为*可以匹配多位；

## 代码

```js
    function match(s, pattern) {
      if (s == undefined || pattern == undefined) {
        return false;
      }
      return matchStr(s, pattern, 0, 0);
    }

    function matchStr(s, pattern, sIndex, patternIndex) {
      if (sIndex === s.length && patternIndex === pattern.length) {
        return true;
      }
      if (sIndex !== s.length && patternIndex === pattern.length) {
        return false;
      }
      if (patternIndex + 1 < pattern.length && pattern[patternIndex + 1] === '*') {
        if (sIndex < s.length && (s[sIndex] === pattern[patternIndex] || pattern[patternIndex] === '.')) {
          return matchStr(s, pattern, sIndex, patternIndex + 2) ||
            matchStr(s, pattern, sIndex + 1, patternIndex + 2) ||
            matchStr(s, pattern, sIndex + 1, patternIndex);
        } else {
          return matchStr(s, pattern, sIndex, patternIndex + 2)
        }
      }
      if (sIndex < s.length && (s[sIndex] === pattern[patternIndex] || pattern[patternIndex] === '.')) {
        return matchStr(s, pattern, sIndex + 1, patternIndex + 1)
      }
      return false;
    }
```

## 考察点

- 字符串
- 正则表达式
- 考虑问题的全面性
- 程序的完整性



# 表示数值的字符串

## 题目

请实现一个函数用来判断字符串是否表示数值（包括整数和小数）。 例如，字符串"+100","5e2","-123","3.1416"和"-1E-16"都表示数值。 但是"12e","1a3.14","1.2.3","+-5"和"12e+4.3"都不是。

## 思路

考虑完全所有情况

- 1.只能出现数字、符号位、小数点、指数位
- 2.小数点，指数符号只能出现一次、且不能出现在开头结尾
- 3.指数位出现后，小数点不允许在出现
- 4.符号位只能出现在开头和指数位后面

## 代码

```js
    function isNumeric(s) {
      if (s == undefined) {
        return false;
      }
      let hasPoint = false;
      let hasExp = false;
      for (let i = 0; i < s.length; i++) {
        const target = s[i];
        if (target >= 0 && target <= 9) {
          continue;
        } else if (target === 'e' || target === 'E') {
          if (hasExp || i === 0 || i === s.length - 1) {
            return false;
          } else {
            hasExp = true;
            continue;
          }
        } else if (target === '.') {
          if (hasPoint || hasExp || i === 0 || i === s.length - 1) {
            return false;
          } else {
            hasPoint = true;
            continue;
          }
        } else if (target === '-' || target === '+') {
          if (i === 0 || s[i - 1] === 'e' || s[i - 1] === 'E') {
            continue;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
      return true;
    }
```

## 考察点

- 字符串
- 考虑问题的全面性
- 程序的完整性



# 调整数组顺序使奇数位于偶数前面

## 题目

输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有的奇数位于数组的前半部分，所有的偶数位于数组的后半部分

## 思路

设定两个指针

第一个指针start从数组第一个元素出发，向尾部前进

第二个指针end从数组的最后一个元素出发，向头部前进

start遍历到偶数，end遍历到奇数时，交换两个数的位置

当start>end时，完成交换

## 代码

```js
    function reOrderArray(array) {
      if (Array.isArray(array)) {
        let start = 0;
        let end = array.length - 1;
        while (start < end) {
          while (array[start] % 2 === 1) {
            start++;
          }
          while (array[end] % 2 === 0) {
            end--;
          }
          if (start < end) {
            [array[start], array[end]] = [array[end], array[start]]
          }
        }
      }
      return array;
    }
```

> 若需要保证相对顺序不变，则不能用上面的写法，需要让两个指针同时从左侧开始



# 链表倒数第K个节点

## 题目

输入一个链表，输出该链表中倒数第k个结点。

## 思路

简单思路： 循环到链表末尾找到 length 在找到length-k节点 需要循环两次。

优化：

设定两个节点，间距相差k个节点，当前面的节点到达终点，取后面的节点。

前面的节点到达k后，后面的节点才出发。

代码鲁棒性： 需要考虑head为null，k为0，k大于链表长度的情况。

## 代码

```js
    function FindKthToTail(head, k) {
      if (!head || !k) return null;
      let front = head;
      let behind = head;
      let index = 1;
      while (front.next) {
        index++;
        front = front.next;
        if (index > k) {
          behind = behind.next;
        }
      }
      return (k <= index) && behind;
    }
```



# 链表中环的入口节点

## 题目

给一个链表，若其中包含环，请找出该链表的环的入口结点，否则，输出null。

## 思路

声明两个指针 P1 P2

- 1.判断链表是否有环： P1 P2 从头部出发，P1走两步，P2走一步，如果可以相遇，则环存在
- 2.从环内某个节点开始计数，再回到此节点时得到链表环的长度 length
- 3.P1、P2 回到head节点，让 P1 先走 length 步 ，当P2和P1相遇时即为链表环的起点

![img](https://s.poetries.top/gitee/2020/09/img/%E9%93%BE%E8%A1%A8%E4%B8%AD%E7%8E%AF%E7%9A%84%E5%85%A5%E5%8F%A3%E8%8A%82%E7%82%B9.png)

## 代码

```js
function EntryNodeOfLoop(pHead) {
      if (!pHead || !pHead.next) {
        return null;
      }
      let P1 = pHead.next;
      let P2 = pHead.next.next;
      // 1.判断是否有环
      while (P1 != P2) {
        if (P2 === null || P2.next === null) {
          return null;
        }
        P1 = P1.next;
        P2 = P2.next.next;
      }
      // 2.获取环的长度
      let temp = P1;
      let length = 1;
      P1 = P1.next;
      while (temp != P1) {
        P1 = P1.next;
        length++;
      }
      // 3.找公共节点
      P1 = P2 = pHead;
      while (length-- > 0) {
        P2 = P2.next;
      }
      while (P1 != P2) {
        P1 = P1.next;
        P2 = P2.next;
      }
      return P1;
    }
```

## 考察点

- 链表
- 程序的鲁棒性
- 复杂问题拆解



# 反转链表

输入一个链表，反转链表后，输出新链表的表头。

## 思路

以链表的头部节点为基准节点

将基准节点的下一个节点挪到头部作为头节点

当基准节点的`next`为`null`，则其已经成为最后一个节点，链表已经反转完成

## 代码

```js
    var reverseList = function (head) {
      let currentNode = null;
      let headNode = head;
      while (head && head.next) {
        currentNode = head.next;
        head.next = currentNode.next;
        currentNode.next = headNode;
        headNode = currentNode;
      }
      return headNode;
    };
```



# 合并两个排序的链表

## 题目

输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则。

## 思路

![img](https://s.poetries.top/gitee/2020/09/img/%E5%90%88%E5%B9%B6%E9%93%BE%E8%A1%A8.png)

链表头部节点比较，取较小节点。

小节点的next等于小节点的next和大节点的较小值。

如此递归。

返回小节点。

考虑代码的鲁棒性，也是递归的终止条件，两个head为null的情况，取对方节点返回。

## 代码

```js
    function Merge(pHead1, pHead2) {
      if (!pHead1) {
        return pHead2;
      }
      if (!pHead2) {
        return pHead1;
      }
      let head;
      if (pHead1.val < pHead2.val) {
        head = pHead1;
        head.next = Merge(pHead1.next, pHead2);
      } else {
        head = pHead2;
        head.next = Merge(pHead1, pHead2.next);
      }
      return head;
    }
```



# 树的子结构

## 题目

输入两棵二叉树`A`，`B`，判断`B`是不是`A`的子结构。（ps：我们约定空树不是任意一个树的子结构）

## 思路

首先找到`A`树中和`B`树根节点相同的节点

从此节点开始，递归`AB`树比较是否有不同节点

## 代码

```js
    function HasSubtree(pRoot1, pRoot2) {
      let result = false;
      if (pRoot1 && pRoot2) {
        if (pRoot1.val === pRoot2.val) {
          result = compare(pRoot1, pRoot2);
        }
        if (!result) {
          result = HasSubtree(pRoot1.right, pRoot2);
        }
        if (!result) {
          result = HasSubtree(pRoot1.left, pRoot2);
        }
      }
      return result;
    }

    function compare(pRoot1, pRoot2) {
      if (pRoot2 === null) {
        return true;
      }
      if (pRoot1 === null) {
        return false;
      }
      if (pRoot1.val !== pRoot2.val) {
        return false;
      }
      return compare(pRoot1.right, pRoot2.right) && compare(pRoot1.left, pRoot2.left);
    }
```



# 二叉树的镜像

## 题目

操作给定的二叉树，将其变换为源二叉树的镜像。

```text
       源二叉树 
    	    8
    	   /  \
    	  6   10
    	 / \  / \
    	5  7 9 11
    	镜像二叉树
    	    8
    	   /  \
    	  10   6
    	 / \  / \
    	11 9 7  5
```

## 1.2 解题思路

递归交换二叉树所有节点左右节点的位置。

## 1.3 代码

```js
function Mirror(root)
{
    if(root){
        const temp = root.right;
        root.right = root.left;
        root.left = temp;
        Mirror(root.right);
        Mirror(root.left);
    }
}
```

## 考察点

- 二叉树
- 抽象问题形象化



# 对称的二叉树

## 题目

请实现一个函数，用来判断一颗二叉树是不是对称的。注意，如果一个二叉树同此二叉树的镜像是同样的，定义其为对称的。

## 思路

二叉树的右子树是二叉树左子树的镜像二叉树。

镜像二叉树：两颗二叉树根结点相同，但他们的左右两个子节点交换了位置。

![img](https://s.poetries.top/gitee/2020/09/img/%E5%AF%B9%E7%A7%B0%E4%BA%8C%E5%8F%89%E6%A0%91.png)

如图，1为对称二叉树，2、3都不是。

- 两个根结点相等
- 左子树的右节点和右子树的左节点相同。
- 右子树的左节点和左子树的右节点相同。

递归所有节点满足以上条件即二叉树对称。

## 代码

```js
    function isSymmetrical(pRoot) {
      return isSymmetricalTree(pRoot, pRoot);
    }

    function isSymmetricalTree(node1, node2) {
      if (!node1 && !node2) {
        return true;
      }
      if (!node1 || !node2) {
        return false;
      }
      if (node1.val != node2.val) {
        return false;
      }
      return isSymmetricalTree(node1.left, node2.right) && isSymmetricalTree(node1.right, node2.left);
    }
```

## 考察点

- 二叉树
- 抽象问题形象化



# 顺时针打印矩阵

## 题目

输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。

例如，如果输入如下4 X 4矩阵：

```text
1 2 3 4 
5 6 7 8
9 10 11 12 
13 14 15 16 
```

则依次打印出数字`1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10.`

## 思路

![img](https://s.poetries.top/gitee/2020/09/img/%E9%A1%BA%E6%97%B6%E9%92%88%E6%89%93%E5%8D%B0%E7%9F%A9%E9%98%B5.png)

借助图形思考，将复杂的矩阵拆解成若干个圈，循环打印矩阵，每次打印其中一个圈

设起点坐标为`(start,start)`，矩阵的行数为`rows`，矩阵的列数为`columns`

循环结束条件为 `rows>start*2` 并且 `columns>start*2`

将打印一圈拆解为四部，

- 第一步：从左到右打印一行
- 第二步：从上到下打印一列
- 第三步：从右到左打印一行
- 第四步：从下到上打印一列

最后一圈很有可能出现几种异常情况,打印矩阵最里面一圈可能只需三步、两步、甚至一步

![img](https://s.poetries.top/gitee/2020/09/img/%E6%89%93%E5%8D%B0%E7%9F%A9%E9%98%B5%E5%BC%82%E5%B8%B8%E6%83%85%E5%86%B5.png)

所以在每一行打印时要做好条件判断:

能走到最后一圈，从左到右必定会打印

结束行号大于开始行号，需要从上到下打印

结束列号大于开始列号，需要从右到左打印

结束行号大于开始行号+1，需要从下到上打印

## 代码

```js
    // 顺时针打印
    function printMatrix(matrix) {
      var start = 0;
      var rows = matrix.length;
      var coloums = matrix[0].length;
      var result = [];
      if (!rows || !coloums) {
        return false;
      }
      while (coloums > start * 2 && rows > start * 2) {
        printCircle(matrix, start, coloums, rows, result);
        start++;
      }
      return result;
    }

    // 打印一圈
    function printCircle(matrix, start, coloums, rows, result) {
      var entX = coloums - start - 1;
      var endY = rows - start - 1;
      for (var i = start; i <= entX; i++) {
        result.push(matrix[start][i]);
      }
      if (endY > start) {
        for (var i = start + 1; i <= endY; i++) {
          result.push(matrix[i][entX]);
        }
        if (entX > start) {
          for (var i = entX - 1; i >= start; i--) {
            result.push(matrix[endY][i]);
          }
          if (endY > start + 1) {
            for (var i = endY - 1; i > start; i--) {
              result.push(matrix[i][start]);
            }
          }
        }
      }
    }
`` `
```



# 包含main函数的栈

定义栈的数据结构，请在该类型中实现一个能够得到栈中所含最小元素的min函数（时间复杂度应为O（1））。

## 思路

1.定义两个栈，一个栈用于存储数据，另一个栈用于存储每次数据进栈时栈的最小值.

2.每次数据进栈时，将此数据和最小值栈的栈顶元素比较，将二者比较的较小值再次存入最小值栈.

4.数据栈出栈，最小值栈也出栈。

3.这样最小值栈的栈顶永远是当前栈的最小值。

以数据[3,4,2,7,9,0]为例，让这组数字依次如栈，则栈和其对应的最小值栈如下：

![img](https://s.poetries.top/gitee/2020/09/img/mainstack.png)

## 代码

```js
var dataStack = [];
var minStack = [];
 
function push(node)
{
    dataStack.push(node);
    if(minStack.length === 0 ||  node < min()){
        minStack.push(node);
    }else{
        minStack.push(min());
    }
}
function pop()
{
    minStack.pop();
    return dataStack.pop();
}
function top()
{
    var length = dataStack.length;
    return length>0&&dataStack[length-1]
}
function min()
{
    var length = minStack.length;
    return length>0&&minStack[length-1]
}
```

# 栈的压入弹出序列

输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否可能为该栈的弹出顺序。假设压入栈的所有数字均不相等。例如序列`1,2,3,4,5`是某栈的压入顺序，序列`4,5,3,2,1`是该压栈序列对应的一个弹出序列，但`4,3,5,1,2`就不可能是该压栈序列的弹出序列。（注意：这两个序列的长度是相等的）

## 思路

1.借助一个辅助栈来模拟压入、弹出的过程。

2.设置一个索引`idx`，记录`popV`（出栈序列）栈顶的位置

3.将`pushV`（压入顺序）中的数据依次入栈。

4.当辅助栈栈顶元素和压`popV`栈顶元素相同时，辅助栈出栈。每次出栈索引`idx`+1。

5.出栈有可能在任意一次入栈后进行，当辅助栈栈顶元素和压`popV`栈顶元素相同时，继续让`pushV`入辅助栈。

6.当所有数据入栈完成，如果出栈顺序正确，那么辅助栈应该为空。

![img](https://s.poetries.top/gitee/2020/09/img/%E6%A0%88%E7%9A%84%E5%8E%8B%E5%85%A5%E5%BC%B9%E5%87%BA%E5%BA%8F%E5%88%97.png)

## 代码

```js
    function IsPopOrder(pushV, popV) {
      if (!pushV || !popV || pushV.length == 0 || popV.length == 0) {
        return;
      }
      var stack = [];
      var idx = 0;
      for (var i = 0; i < pushV.length; i++) {
        stack.push(pushV[i]);
        while (stack.length && stack[stack.length - 1] == popV[idx]) {
          stack.pop();
          idx++;
        }
      }
      return stack.length == 0;
    }
```



# 从上到下打印二叉树

## 题目1-不分行从上到下打印

从上往下打印出二叉树的每个节点，同层节点从左至右打印。

## 思路

- 在打印第一行时，将左孩子节点和右孩子节点存入一个队列里
- 队列元素出队列打印，同时分别将左孩子节点和右孩子节点存入队列
- 这样打印二叉树的顺序就是没行从左到右打印

## 代码

```js
    function PrintFromTopToBottom(root) {
      const result = [];
      const queue = [];
      if (root) {
        queue.push(root);
        while (queue.length > 0) {
          const current = queue.shift();
          if (current.left) {
            queue.push(current.left);
          }
          if (current.right) {
            queue.push(current.right);
          }
          result.push(current.val);
        }
      }
      return result;
    }
```

## 题目2-把二叉树打印成多行

从上到下按层打印二叉树，同一层结点从左至右输出。每一层输出一行。

## 思路

- 使用一个队列存储当前层遍历的节点
- 使用两个变量来标记当前遍历的状态
- currentNums：当前层剩余的节点数
- childNums：孩子节点数
- 当前层遍历完成后开始遍历孩子节点，currentNums赋值为childNums，childNums赋值为0，

## 代码

```js
    function Print(root) {
      const result = [];
      const queue = [];
      let tempArr = [];
      let currentNums = 1;
      let childNums = 0;
      if (root) {
        queue.push(root);
        while (queue.length > 0) {
          const current = queue.shift();
          if (current.left) {
            queue.push(current.left);
            childNums++;
          }
          if (current.right) {
            queue.push(current.right);
            childNums++;
          }
          tempArr.push(current.val);
          currentNums--;
          if (currentNums === 0) {
            currentNums = childNums;
            childNums = 0;
            result.push(tempArr);
            tempArr = [];
          }
        }
      }
      return result;
    }
```

## 题目3-按之字形顺序打印二叉树

请实现一个函数按照之字形打印二叉树，即第一行按照从左到右的顺序打印，第二层按照从右至左的顺序打印，第三行按照从左到右的顺序打印，其他行以此类推。

## 思路

奇数从左到右，偶数从右到左

- 若当前层为奇数层，从左到右打印，同时填充下一层，从右到左打印（先填充左孩子节点再填充右孩子节点）。
- 若当前层为偶数层，从右到左打印，同时填充下一层，从左到右打印（先填充右孩子节点再填充左孩子节点）。
- 不难发现，我们可以使用栈来作为存储结构。
- 分别设定一个奇数栈和一个偶数栈， 从将二叉树头部元素存入奇数栈开始。

> 这里同样可使用上面2题的两个变量来记录层数，只需要一个栈即可，但是代码不如两个栈容易理解。

## 代码

```js
    function Print(root) {
      const result = [];
      const oddStack = [];
      const evenStack = [];
      let temp = [];
      if (root) {
        oddStack.push(root);
        while (oddStack.length > 0 || evenStack.length > 0) {

          while (oddStack.length > 0) {
            const current = oddStack.pop();
            temp.push(current.val);
            if (current.left) {
              evenStack.push(current.left);
            }
            if (current.right) {
              evenStack.push(current.right);
            }
          }
          if (temp.length > 0) {
            result.push(temp);
            temp = [];
          }

          while (evenStack.length > 0) {
            const current = evenStack.pop();
            temp.push(current.val);
            if (current.right) {
              oddStack.push(current.right);
            }
            if (current.left) {
              oddStack.push(current.left);
            }
          }
          if (temp.length > 0) {
            result.push(temp);
            temp = [];
          }

        }
      }
      return result;
    }
```

## 考察点

- 二叉树
- 栈
- 队列



# 二叉树搜索树的后序遍历

输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历的结果。如果是则输出Yes,否则输出No。假设输入的数组的任意两个数字都互不相同。

## 思路

1.后序遍历：分成三部分：最后一个节点为根节点，第二部分为左子树的值比根节点都小，第三部分为右子树的值比根节点都大。

2.先检测左子树，左侧比根节点小的值都判定为左子树。

3.除最后一个节点外和左子树外的其他值为右子树，右子树有一个比根节点小，则返回false。

4.若存在，左、右子树，递归检测左、右子树是否复合规范。

## 代码

```js
    function VerifySquenceOfBST(sequence) {
      if (sequence && sequence.length > 0) {
        var root = sequence[sequence.length - 1]
        for (var i = 0; i < sequence.length - 1; i++) {
          if (sequence[i] > root) {
            break;
          }
        }
        for (let j = i; j < sequence.length - 1; j++) {
          if (sequence[j] < root) {
            return false;
          }
        }
        var left = true;
        if (i > 0) {
          left = VerifySquenceOfBST(sequence.slice(0, i));
        }
        var right = true;
        if (i < sequence.length - 1) {
          right = VerifySquenceOfBST(sequence.slice(i, sequence.length - 1));
        }
        return left && right;
      }
    }
```

## 考察点

- 二叉树



# 二叉树中和为某一值的路径

输入一颗二叉树的根节点和一个整数，打印出二叉树中结点值的和为输入整数的所有路径。路径定义为从树的根结点开始往下一直到叶结点所经过的结点形成一条路径。

## 思路

套用回溯算法的思路

设定一个结果数组result来存储所有符合条件的路径

设定一个栈stack来存储当前路径中的节点

设定一个和sum来标识当前路径之和

- 从根结点开始深度优先遍历，每经过一个节点，将节点入栈
- 到达叶子节点，且当前路径之和等于给定目标值，则找到一个可行的解决方案，将其加入结果数组
- 遍历到二叉树的某个节点时有2个可能的选项，选择前往左子树或右子树
- 若存在左子树，继续向左子树递归
- 若存在右子树，继续向右子树递归
- 若上述条件均不满足，或已经遍历过，将当前节点出栈，向上回溯

## 代码

```js
    function FindPath(root, expectNumber) {
      const result = [];
      if (root) {
        FindPathCore(root, expectNumber, [], 0, result);
      }
      return result;
    }

    function FindPathCore(node, expectNumber, stack, sum, result) {
      stack.push(node.val);
      sum += node.val;
      if (!node.left && !node.right && sum === expectNumber) {
        result.push(stack.slice(0));
      }
      if (node.left) {
        FindPathCore(node.left, expectNumber, stack, sum, result);
      }
      if (node.right) {
        FindPathCore(node.right, expectNumber, stack, sum, result);
      }
      stack.pop();
    }
```

## 考察点

- 二叉树
- 回溯算法

# 复杂链表的复制

## 题目

输入一个复杂链表（每个节点中有节点值，以及两个指针，一个指向下一个节点，另一个特殊指针指向任意一个节点），返回结果为复制后复杂链表的head。

## 思路

拆分成三步

1.复制一份链表放在前一个节点后面，即根据原始链表的每个节点N创建N·,把N·直接放在N的next位置，让复制后的链表和原始链表组成新的链表。

2.给复制的链表random赋值，即`N.random=N.random.next`。

3.拆分链表，将N·和N进行拆分，保证原始链表不受影响。

## 代码

```js
    function Clone(pHead) {
      if (pHead === null) {
        return null;
      }
      cloneNodes(pHead);
      cloneRandom(pHead);
      return reconnetNodes(pHead);
    }

    function cloneNodes(pHead) {
      var current = pHead;
      while (current) {
        var cloneNode = {
          label: current.label,
          next: current.next
        };
        current.next = cloneNode;
        current = cloneNode.next;
      }
    }

    function cloneRandom(pHead) {
      var current = pHead;
      while (current) {
        var cloneNode = current.next;
        if (current.random) {
          cloneNode.random = current.random.next;
        } else {
          cloneNode.random = null;
        }
        current = cloneNode.next;
      }
    }

    function reconnetNodes(pHead) {
      var cloneHead = pHead.next;
      var cloneNode = pHead.next;
      var current = pHead;
      while (current) {
        current.next = cloneNode.next;
        current = cloneNode.next;
        if (current) {
          cloneNode.next = current.next;
          cloneNode = current.next;
        } else {
          cloneNode.next = null;
        }
      }
      return cloneHead;
    }
```

## 考察点

- 链表
- 复杂问题拆解



# 二叉搜索树于双向链表

## 题目

输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的双向链表。要求不能创建任何新的结点，只能调整树中结点指针的指向。

## 思路

二叉搜索树的中序遍历即排序后的序列

- 1.递归左子树，找到左子树的最后一个节点，根节点左侧连接到左子树的最后一个节点
- 2.当前节点变为已经转换完成的链表的最后一个节点
- 3.递归右子树，找到当前树的最后一个节点
- 4.回溯到上一层，进行链接...

![img](https://s.poetries.top/gitee/2020/09/img/%E4%BA%8C%E5%8F%89%E6%90%9C%E7%B4%A2%E6%A0%91%E4%B8%8E%E5%8F%8C%E5%90%91%E9%93%BE%E8%A1%A8.png)

## 代码

```js
    function Convert(pRootOfTree) {
      if (!pRootOfTree) {
        return null;
      }
      ConvertCore(pRootOfTree);
      while (pRootOfTree.left) {
        pRootOfTree = pRootOfTree.left;
      }
      return pRootOfTree;
    }

    function ConvertCore(node, last) {
      if (node.left) {
        last = ConvertCore(node.left, last)
      }
      node.left = last;
      if (last) {
        last.right = node;
      }
      last = node;
      if (node.right) {
        last = ConvertCore(node.right, last);
      }
      return last;
    }
```

## 考察点

- 二叉搜索树
- 链表



# 序列化二叉树

## 题目

请实现两个函数，分别用来序列化和反序列化二叉树

## 思路

- 若一颗二叉树是不完全的，我们至少需要两个遍历才能将它重建（像题目[重建二叉树](https://interview.poetries.top/fe-algorithm-docs/algorithm2/jianzhi-offer/7.重建二叉树.html)一样）
- 但是这种方式仍然有一定的局限性，比如二叉树中不能出现重复节点。
- 如果二叉树是一颗完全二叉树，我们只需要知道前序遍历即可将它重建。
- 因此在序列化时二叉树时，可以将空节点使用特殊符号存储起来，这样就可以模拟一棵完全二叉树的前序遍历
- 在重建二叉树时，当遇到特殊符号当空节点进行处理

## 代码

```js
    function Serialize(pRoot, arr = []) {
      if (!pRoot) {
        arr.push('#');
      } else {
        arr.push(pRoot.val);
        Serialize(pRoot.left, arr)
        Serialize(pRoot.right, arr)
      }
      return arr.join(',');
    }

    function Deserialize(s) {
      if (!s) {
        return null;
      }
      return deserialize(s.split(','));
    }

    function deserialize(arr) {
      let node = null;
      const current = arr.shift();
      if (current !== '#') {
        node = { val: current }
        node.left = deserialize(arr);
        node.right = deserialize(arr);
      }
      return node;
    }
```

## 考察点

- 二叉树
- 复杂问题拆解



# 字符串的排列

## 题目

输入一个字符串,按字典序打印出该字符串中字符的所有排列。例如输入字符串`abc`,则打印出由字符`a,b,c`所能排列出来的所有字符串`abc,acb,bac,bca,cab`和`cba`。

## 思路

使用回溯法

记录一个字符（`temp`），用于存储当前需要进入排列的字符

记录一个字符串（`current`），用于记录当前已经排列好的字符

记录一个队列（`queue`），用于存储还未被排列的字符

- 每次排列将`temp`添加到`current`
- 如果`queue`为空，则本次排列完成，将`curret`加入到结果数组中，结束递归
- 如果`queue`不为空，说明还有未排列的字符
- 递归排列`queue`中剩余的字符
- 为了不影响后续排列，每次递归完成，将当前递归的字符`temp`加回队列

## 代码

> 记录一个当前排列字符temp

```js
    function Permutation(str) {
      const result = [];
      if (str) {
        queue = str.split('')
        PermutationCore(queue, result);
      }
      result.sort();
      return [... new Set(result)];
    }

    function PermutationCore(queue, result, temp = "", current = "") {
      current += temp;
      if (queue.length === 0) {
        result.push(current);
        return;
      }
      for (let i = 0; i < queue.length; i++) {
        temp = queue.shift();
        PermutationCore(queue, result, temp, current);
        queue.push(temp);
      }
    }
```

> 记录一个当前索引，不断交换数组中的元素（不太好理解，不推荐）

```js
    function Permutation(str) {
      var result = [];
      if (!str) {
        return result;
      }
      var array = str.split('');
      permutate(array, 0, result);
      result.sort();
      return [... new Set(result)];
    }

    function permutate(array, index, result) {
      if (array.length - 1 === index) {
        result.push(array.join(''));
      }
      for (let i = index; i < array.length; i++) {
        swap(array, index, i);
        permutate(array, index + 1, result);
        swap(array, i, index);
      }
    }
```

## 考察点

- 字符串
- 回溯算法

# 数组中出现次数超过数组长度一半的数字

## 题目

数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。例如输入一个长度为9的数组{1,2,3,2,2,2,5,4,2}。由于数字2在数组中出现了5次，超过数组长度的一半，因此输出2。如果不存在则输出0。

## 代码

解法1:

开辟一个额外空间存储每个值出现的次数，时间复杂度最大为O(n)，逻辑简单

```js
    function MoreThanHalfNum_Solution(numbers) {
      if (numbers && numbers.length > 0) {
        var length = numbers.length;
        var temp = {};
        for (var i = 0; i < length; i++) {
          if (temp['s' + numbers[i]]) {
            temp['s' + numbers[i]]++;
          } else {
            temp['s' + numbers[i]] = 1;
          }
          if (temp['s' + numbers[i]] > length / 2) {
            return numbers[i];
          }
        }
        return 0;
      }
    }
```

解法2:

目标值的个数比其他所有值加起来的数多

记录两个变量 1.数组中的某个值 2.次数

1.当前遍历值和上一次遍历值相等？次数+1 ： 次数-1。

2.次数变为0后保存新的值。

3.遍历结束后保存的值,判断其是否复合条件

事件复杂度O(n) 不需要开辟额外空间 , 逻辑稍微复杂。

```js
    function MoreThanHalfNum_Solution(numbers) {
      if (numbers && numbers.length > 0) {
        var target = numbers[0];
        var count = 1;
        for (var i = 1; i < numbers.length; i++) {
          if (numbers[i] === target) {
            count++;
          } else {
            count--;
          }
          if (count === 0) {
            target = numbers[i];
            count = 1;
          }
        }
        count = 0;
        for (var i = 0; i < numbers.length; i++) {
          if (numbers[i] === target) count++;
        }
        return count > numbers.length / 2 ? target : 0;
      }
    }
```



# 最小的K个数

## 题目

输入`n`个整数，找出其中最小的K个数。例如输入`4,5,1,6,2,7,3,8`这`8`个数字，则最小的`4`个数字是`1,2,3,4`。

## 思路

思路1:

先排序，再取前k个数，最小时间复杂度`nlogn`。

思路2:

1.把前`k`个数构建一个大顶堆

2.从第`k`个数开始，和大顶堆的最大值进行比较，若比最大值小，交换两个数的位置，重新构建大顶堆

3.一次遍历之后大顶堆里的数就是整个数据里最小的`k`个数。

时间复杂度`nlogk`，优于思路1。

## 代码

```js
    function GetLeastNumbers_Solution(input, k) {
      if (k > input.length) {
        return [];
      }
      createHeap(input, k);
      for (let i = k; i < input.length; i++) {
        // 当前值比最小的k个值中的最大值小
        if (input[i] < input[0]) {
          [input[i], input[0]] = [input[0], input[i]];
          ajustHeap(input, 0, k);
        }
      }
      return input.splice(0, k);
    }

    // 构建大顶堆
    function createHeap(arr, length) {
      for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
        ajustHeap(arr, i, length);
      }
    }

    function ajustHeap(arr, index, length) {
      for (let i = 2 * index + 1; i < length; i = 2 * i + 1) {
        if (i + 1 < length && arr[i + 1] > arr[i]) {
          i++;
        }
        if (arr[index] < arr[i]) {
          [arr[index], arr[i]] = [arr[i], arr[index]];
          index = i;
        } else {
          break;
        }
      }
    }
```



# 数据流中的中位数

## 题目

如何得到一个数据流中的中位数？如果从数据流中读出奇数个数值，那么中位数就是所有数值排序之后位于中间的数值。

如果从数据流中读出偶数个数值，那么中位数就是所有数值排序之后中间两个数的平均值。我们使用`Insert()`方法读取数据流，使用`GetMedian()`方法获取当前读取数据的中位数。

## 思路

1.维护一个大顶堆，一个小顶堆，数据总数：

- 小顶堆里的值全大于大顶堆里的；
- 2个堆个数的差值小于等于1

2.当插入数字后数据总数为奇数时：使小顶堆个数比大顶堆多1；当插入数字后数据总数为偶数时，使大顶堆个数跟小顶堆个数一样。

3.当总数字个数为奇数时，中位数就是小顶堆堆头；当总数字个数为偶数时，中位数数就是2个堆堆顶平均数。

## 代码

```js
    const maxHeap = new Heap('max');
    const minHeap = new Heap('min');
    let count = 0;
    function Insert(num) {
      count++;
      if (count % 2 === 1) {
        maxHeap.add(num);
        minHeap.add(maxHeap.pop());
      } else {
        minHeap.add(num);
        maxHeap.add(minHeap.pop());
      }
    }
    function GetMedian() {
      if (count % 2 === 1) {
        return minHeap.value[0];
      } else {
        return (minHeap.value[0] + maxHeap.value[0]) / 2
      }
    }

    function Heap(type = 'min') {
      this.type = type;
      this.value = [];
    }

    Heap.prototype.create = function () {
      const length = this.value.length;
      for (let i = Math.floor((length / 2) - 1); i >= 0; i--) {
        this.ajust(i, length);
      }
    }

    Heap.prototype.ajust = function (index, length) {
      const array = this.value;
      for (let i = 2 * index + 1; i < length; i = 2 * i + 1) {
        if (i + 1 < length) {
          if ((this.type === 'max' && array[i + 1] > array[i]) ||
            (this.type === 'min' && array[i + 1] < array[i])) {
            i++;
          }
        }
        if ((this.type === 'max' && array[index] < [array[i]]) ||
          (this.type === 'min' && array[index] > [array[i]])) {
          [array[index], array[i]] = [array[i], array[index]];
          index = i;
        } else {
          break;
        }
      }
    }

    Heap.prototype.add = function (element) {
      const array = this.value;
      array.push(element);
      if (array.length > 1) {
        let index = array.length - 1;
        let target = Math.floor((index - 1) / 2);
        while (target >= 0) {
          if ((this.type === 'min' && array[index] < array[target]) ||
            (this.type === 'max' && array[index] > array[target])) {
            [array[index], array[target]] = [array[target], array[index]]
            index = target;
            target = Math.floor((index - 1) / 2);
          } else {
            break;
          }
        }
      }
    }

    Heap.prototype.pop = function () {
      const array = this.value;
      let result = null;
      if (array.length > 1) {
        result = array[0];
        array[0] = array.pop();
        this.ajust(0, array.length);
      } else if (array.length === 1) {
        return array.pop();
      }
      return result;
    }
```

## 考察点

- 堆
- 二叉树

# 连续子数组的最大和

## 题目

输入一个整型数组，数组里有正数也有负数。数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值，要求时间复杂度为`O(n)`

例如:`{6,-3,-2,7,-15,1,2,2}`,连续子向量的最大和为8(从第0个开始,到第3个为止)。

## 思路

记录一个当前连续子数组最大值 `max` 默认值为数组第一项

记录一个当前连续子数组累加值 `sum` 默认值为数组第一项

1.从数组第二个数开始，若 `sum<0` 则当前的`sum`不再对后面的累加有贡献，`sum = 当前数`

2.若 `sum>0` 则`sum = sum + 当前数`

3.比较 `sum` 和 `max` ，`max = 两者最大值`

## 代码

```js
    function FindGreatestSumOfSubArray(array) {
      if (Array.isArray(array) && array.length > 0) {
        let sum = array[0];
        let max = array[0];
        for (let i = 1; i < array.length; i++) {
          if (sum < 0) {
            sum = array[i];
          } else {
            sum = sum + array[i];
          }
          if (sum > max) {
            max = sum;
          }
        }
        return max;
      }
      return 0;
    }
```



# 整数1出现的次数

## 题目

求出`1~13`的整数中1出现的次数,并算出`100~1300`的整数中`1`出现的次数？

为此他特别数了一下`1~13`中包含1的数字有`1、10、11、12、13`因此共出现6次,但是对于后面问题他就没辙了。

`ACMer`希望你们帮帮他,并把问题更加普遍化,可以很快的求出任意非负整数区间中`1`出现的次数（从`1`到`n`中`1`出现的次数）。

## 思路

> 注意：11算出现了两个1

分别计算数字中每个位置可能出现1的情况，相加。

将数字分为两部分： 当前数字为1，其后面数字可能出现的情况`low`，当前数字为1，其前面数字可能出现的情况`high`，所有情况为`low * high`种情况。

例如，在分析数字`8103`时：

- 个位 `3`: 个位已经是最低位了，所以`low`只有`1`中情况。`high`可以取`0 - 810`共`811`种情况，所有情况为`1 * 811 = 811`种情况。
- 十位 `0`: `low`可能为`10 - 19`共`10`种情况，`high`可以取`0 - 80`共`81`种情况，所有情况为`81 * 10 = 810`种情况。
- 百位 `1`: `low`可能为`100 - 199`共`100`种情况，`high`可以取`0 - 7`共`8`种情况;当`high`取`8`时，`low`还可以取`100 - 104`，所有情况为`100 * 8 + 4 = 804`种情况。
- 千位 `8`:`low`可能为`1000 - 1999`共`1000`种情况，当前已经是最高位了，`high`只有一种情况，所有情况为`1000 * 1 = 1000`种情况。

![机器人的运动范围动画](https://s.poetries.top/gitee/2020/09/img/%E6%95%B4%E6%95%B0%E4%B8%AD1%E5%87%BA%E7%8E%B0%E7%9A%84%E6%AC%A1%E6%95%B0.png)

由以上示例：分三种情况考虑，现有数字`abcde`，分析百位数字`c`

- `c = 0` : 有 `ab*100` 种情况
- `c = 1` : 有 `ab*100 + de + 1` 种情况
- `c > 2` : 有 `(ab+1) * 100` 种情况

`c`是`abcde`第`3`位数：

当前的量级：`level = 10`的`(3-1)`次方

- `ab = abcde / (level*10)`
- `c = (abcde / (level)) % 10`
- `de = abcde % level`

## 代码

```js
    function NumberOf1Between1AndN_Solution(n) {
      let count = 0;
      let i = 1;
      let high = low = current = level = 0;
      let length = n.toString().length;
      while (i <= length) {
        level = Math.pow(10, i - 1); //第i位数位于什么量级 1 10 100 ...
        high = parseInt(n / (level * 10));
        low = n % level;
        current = parseInt(n / level) % 10;
        if (current === 0) {
          count += (high * level);
        } else if (current === 1) {
          count += (high * level + low + 1);
        } else {
          count += ((high + 1) * level);
        }
        i++;
      }
      return count;
    }
```



# 把数组排成最小的数

## 题目

求出`1~13`的整数中1出现的次数,并算出`100~1300`的整数中`1`出现的次数？

为此他特别数了一下`1~13`中包含1的数字有`1、10、11、12、13`因此共出现6次,但是对于后面问题他就没辙了。

`ACMer`希望你们帮帮他,并把问题更加普遍化,可以很快的求出任意非负整数区间中`1`出现的次数（从`1`到`n`中`1`出现的次数）。

## 思路

> 注意：11算出现了两个1

分别计算数字中每个位置可能出现1的情况，相加。

将数字分为两部分： 当前数字为1，其后面数字可能出现的情况`low`，当前数字为1，其前面数字可能出现的情况`high`，所有情况为`low * high`种情况。

例如，在分析数字`8103`时：

- 个位 `3`: 个位已经是最低位了，所以`low`只有`1`中情况。`high`可以取`0 - 810`共`811`种情况，所有情况为`1 * 811 = 811`种情况。
- 十位 `0`: `low`可能为`10 - 19`共`10`种情况，`high`可以取`0 - 80`共`81`种情况，所有情况为`81 * 10 = 810`种情况。
- 百位 `1`: `low`可能为`100 - 199`共`100`种情况，`high`可以取`0 - 7`共`8`种情况;当`high`取`8`时，`low`还可以取`100 - 104`，所有情况为`100 * 8 + 4 = 804`种情况。
- 千位 `8`:`low`可能为`1000 - 1999`共`1000`种情况，当前已经是最高位了，`high`只有一种情况，所有情况为`1000 * 1 = 1000`种情况。

![机器人的运动范围动画](https://s.poetries.top/gitee/2020/09/img/%E6%95%B4%E6%95%B0%E4%B8%AD1%E5%87%BA%E7%8E%B0%E7%9A%84%E6%AC%A1%E6%95%B0.png)

由以上示例：分三种情况考虑，现有数字`abcde`，分析百位数字`c`

- `c = 0` : 有 `ab*100` 种情况
- `c = 1` : 有 `ab*100 + de + 1` 种情况
- `c > 2` : 有 `(ab+1) * 100` 种情况

`c`是`abcde`第`3`位数：

当前的量级：`level = 10`的`(3-1)`次方

- `ab = abcde / (level*10)`
- `c = (abcde / (level)) % 10`
- `de = abcde % level`

## 代码

```js
    function NumberOf1Between1AndN_Solution(n) {
      let count = 0;
      let i = 1;
      let high = low = current = level = 0;
      let length = n.toString().length;
      while (i <= length) {
        level = Math.pow(10, i - 1); //第i位数位于什么量级 1 10 100 ...
        high = parseInt(n / (level * 10));
        low = n % level;
        current = parseInt(n / level) % 10;
        if (current === 0) {
          count += (high * level);
        } else if (current === 1) {
          count += (high * level + low + 1);
        } else {
          count += ((high + 1) * level);
        }
        i++;
      }
      return count;
    }
```



# 丑数

## 题目

把只包含质因子`2、3和5`的数称作丑数（`Ugly Number`）。

例如`6、8`都是丑数，但`14`不是，因为它包含质因子`7`。

习惯上我们把`1`当做是第一个丑数。求按从小到大的顺序的第`N`个丑数。

## 思路

丑数只能被`2、3、5`整除，说明第`n`个丑数只能是`0 - n-1`中某个丑数✖️`2`、✖️`3`、✖️`5`的结果。

而且，这个数即第`0 - n-1`个丑数✖️`2`、✖️`3`、✖️`5`的结果中比第`n-1`个丑数大的最小值。

按照上面的规律，我们可以依次求出第`0 - n`个丑数。

简单做法：

- 1.每次把第`0 - n-1`个丑数✖️`(2、3、5)`
- 2.分别找到第`0 - n-1`个丑数✖️`2`、✖️`3`、✖️`5`的结果中比第`n-1`个丑数大的最小值。
- 3.比较三个数取最小值加入到丑数队列中

优化：

- 1.前面的数不必每个都乘
- 2.记录下✖️`(2、3、5)`后刚好比当前最大丑数大的这三个值的下标 `i2,i3,i5`
- 3.下次比较从这 `i2,i3,i5` 三个下标开始乘起
- 4.最后取`arr[i2]✖️2、arr[i3]✖️3、arr[i5]✖️5` 的最小值

![丑数](https://s.poetries.top/gitee/2020/09/img/%E4%B8%91%E6%95%B0.png)

## 代码

```js
    function GetUglyNumber_Solution(index) {
      if (index <= 0) {
        return 0;
      }
      let arr = [1];
      let i2 = i3 = i5 = 0;
      let cur = 0;
      while (arr.length < index) {
        arr.push(Math.min(arr[i2] * 2, arr[i3] * 3, arr[i5] * 5));
        const current = arr[arr.length - 1];
        while (arr[i2] * 2 <= current) {
          i2++;
        }
        while (arr[i3] * 3 <= current) {
          i3++;
        }
        while (arr[i5] * 5 <= current) {
          i5++;
        }
      }
      return arr[index - 1];
    }
```



# 字符流中第一个不重复的字符

## 题目

把只包含质因子`2、3和5`的数称作丑数（`Ugly Number`）。

例如`6、8`都是丑数，但`14`不是，因为它包含质因子`7`。

习惯上我们把`1`当做是第一个丑数。求按从小到大的顺序的第`N`个丑数。

## 思路

丑数只能被`2、3、5`整除，说明第`n`个丑数只能是`0 - n-1`中某个丑数✖️`2`、✖️`3`、✖️`5`的结果。

而且，这个数即第`0 - n-1`个丑数✖️`2`、✖️`3`、✖️`5`的结果中比第`n-1`个丑数大的最小值。

按照上面的规律，我们可以依次求出第`0 - n`个丑数。

简单做法：

- 1.每次把第`0 - n-1`个丑数✖️`(2、3、5)`
- 2.分别找到第`0 - n-1`个丑数✖️`2`、✖️`3`、✖️`5`的结果中比第`n-1`个丑数大的最小值。
- 3.比较三个数取最小值加入到丑数队列中

优化：

- 1.前面的数不必每个都乘
- 2.记录下✖️`(2、3、5)`后刚好比当前最大丑数大的这三个值的下标 `i2,i3,i5`
- 3.下次比较从这 `i2,i3,i5` 三个下标开始乘起
- 4.最后取`arr[i2]✖️2、arr[i3]✖️3、arr[i5]✖️5` 的最小值

![丑数](https://s.poetries.top/gitee/2020/09/img/%E4%B8%91%E6%95%B0.png)

## 代码

```js
    function GetUglyNumber_Solution(index) {
      if (index <= 0) {
        return 0;
      }
      let arr = [1];
      let i2 = i3 = i5 = 0;
      let cur = 0;
      while (arr.length < index) {
        arr.push(Math.min(arr[i2] * 2, arr[i3] * 3, arr[i5] * 5));
        const current = arr[arr.length - 1];
        while (arr[i2] * 2 <= current) {
          i2++;
        }
        while (arr[i3] * 3 <= current) {
          i3++;
        }
        while (arr[i5] * 5 <= current) {
          i5++;
        }
      }
      return arr[index - 1];
    }
```



# 第一个只出现一次的字符

## 题目

在一个字符串(`0<=字符串长度<=10000`，全部由字母组成)中找到第一个只出现一次的字符,并返回它的位置, 如果没有则返回`-1`（需要区分大小写）。

## 思路

### 思路1:

用一个`map`存储每个字符出现的字数

第一次循环存储次数，第二次循环找到第一个出现一次的字符。

时间复杂度`O(n)`、空间复杂度`O(n)`

### 思路二：

使用`js`的`array`提供的`indexOf`和`lastIndexOf`方法

遍历字符串，比较每个字符第一次和最后一次出现的位置是否相同。

`indexOf`的时间复杂度为`O(n)`，所以整体的时间复杂度为O(n2)，空间复杂度为`0`。

## 代码

### 思路1:

```js
    function FirstNotRepeatingChar(str) {
      if (!str) {
        return -1;
      }
      let countMap = {};
      const array = str.split('');
      const length = str.length;
      for (let i = 0; i < length; i++) {
        const current = array[i];
        let count = countMap[current];
        if (count) {
          countMap[current] = count + 1;
        } else {
          countMap[current] = 1;
        }
      }
      for (let i = 0; i < length; i++) {
        if (countMap[array[i]] === 1) {
          return i;
        }
      }
      return -1;
    }
```

### 思路二：

```js
    function FirstNotRepeatingChar(str) {
      // write code here
      for (var i = 0; i < str.length; i++) {
        if (str.indexOf(str[i]) == str.lastIndexOf(str[i])) {
          return i;
        }
      }
      return -1;
    }
```

# 数组中的逆序对

## 题目



在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组,求出这个数组中的逆序对的总数P。

## 思路



使用暴力法：从第一个数开始，依次和后面每一个数字进行比较记录逆序对的个数，时间复杂度O(n2)

使用分治的细想：

若没了解过归并排序，建议先熟悉[归并排序](https://interview.poetries.top/fe-algorithm-docs/算法分类/排序/归并排序.html)算法再来看本题。

直接将归并排序进行改进，把数据分成`N`个小数组。

合并数组 `left - mid` , `mid+1 - right`，合并时， 若`array[leftIndex] > array[rightIndex]` ,则比右边 `rightIndex-mid`个数大

```
count += rightIndex-mid
```

注意和归并排序的区别： 归并排序是合并数组数从小数开始，而本题是从大数开始。

时间复杂度`O(nlogn)`

空间复杂度`O(n)`

## 代码



```js
    function InversePairs(data) {
      return mergeSort(data, 0, data.length - 1, []);
    }

    function mergeSort(array, left, right, temp) {
      if (left < right) {
        const mid = parseInt((left + right) / 2);
        const l = mergeSort(array, left, mid, temp);
        const r = mergeSort(array, mid + 1, right, temp);
        const m = merge(array, left, right, mid, temp);
        return l + m + r;
      } else {
        return 0;
      }
    }

    function merge(array, left, right, mid, temp) {
      let leftIndex = mid;
      let rightIndex = right;
      let tempIndex = right - left;
      let count = 0;
      while (leftIndex >= left && rightIndex > mid) {
        if (array[leftIndex] > array[rightIndex]) {
          count += (rightIndex - mid);
          temp[tempIndex--] = array[leftIndex--];
        } else {
          temp[tempIndex--] = array[rightIndex--];
        }
      }
      while (leftIndex >= left) {
        temp[tempIndex--] = array[leftIndex--];
      }
      while (rightIndex > mid) {
        temp[tempIndex--] = array[rightIndex--];
      }
      tempIndex = 0;
      for (let i = left; i <= right; i++) {
        array[i] = temp[tempIndex++];
      }
      return count;
    }
```

## 考察点



- 数组
- 分治

# 两个链表的第一个公共节点

## 题目



输入两个链表，找出它们的第一个公共结点。

## 思路



- 1.先找到两个链表的长度`length1`、`length2`
- 2.让长一点的链表先走`length2-length1`步，让长链表和短链表起点相同
- 3.两个链表一起前进，比较获得第一个相等的节点
- 时间复杂度`O(length1+length2)` 空间复杂度`O(0)`

![img](https://interview.poetries.top/dist/img/%E9%93%BE%E8%A1%A8%E5%85%AC%E5%85%B1%E8%8A%82%E7%82%B9.png)

## 代码



```js
function FindFirstCommonNode(pHead1, pHead2) {
      if (!pHead1 || !pHead2) { return null; }
      // 获取链表长度
      let length1 = getLength(pHead1);
      let length2 = getLength(pHead2);
      // 长链表先行
      let lang, short, interval;
      if (length1 > length2) {
        lang = pHead1;
        short = pHead2;
        interval = length1 - length2;
      } else {
        lang = pHead2;
        short = pHead1;
        interval = length2 - length1;
      }
      while (interval--) {
        lang = lang.next;
      }
      // 找相同节点
      while (lang) {
        if (lang === short) {
          return lang;
        }
        lang = lang.next;
        short = short.next;
      }
      return null;
    }

    function getLength(head) {
      let current = head;
      let result = 0;
      while (current) {
        result++;
        current = current.next;
      }
      return result;
    }
```



# 在排序数组中查找数字

## 题目



统计一个数字在排序数组中出现的次数。

## 思路



本道题有好几种解法

- 1.直接遍历数组，判断前后的值是否相同，找到元素开始位置和结束位置，时间复杂度`O(n)`
- 2.使用二分查找找到目标值，在向前向后遍历，找到所有的数，比上面略优，时间复杂度也是`O(n)`
- 3.使用二分查找分别找到第一个目标值出现的位置和最后一个位置，时间复杂度`O(logn)`

## 代码



在排序数组中找元素，首先考虑使用二分查找

下面是使用二分查找在数组中寻找某个数

```js
        function binarySearch(data, arr, start, end) {
            if (start > end) {
                return -1;
            }
            var mid = Math.floor((end + start) / 2);
            if (data == arr[mid]) {
                return mid;
            } else if (data < arr[mid]) {
                return binarySearch(data, arr, start, mid - 1);
            } else {
                return binarySearch(data, arr, mid + 1, end);
            }
        }
```

找到第一次和最后一次出现的位置我们只需要对上面的代码进行稍加的变形

第一次位置：找到目标值，并且前一位的数字和当前值不相等

最后一次位置：找到目标值，并且后一位的数字和当前值不相等

```js
    function GetNumberOfK(data, k) {
      if (data && data.length > 0 && k != null) {
        const firstIndex = getFirstK(data, 0, data.length - 1, k);
        const lastIndex = getLastK(data, 0, data.length - 1, k);
        if (firstIndex != -1 && lastIndex != -1) {
          return lastIndex - firstIndex + 1;
        }
      }
      return 0;
    }

    function getFirstK(data, first, last, k) {
      if (first > last) {
        return -1;
      }
      const mid = parseInt((first + last) / 2);
      if (data[mid] === k) {
        if (data[mid - 1] != k) {
          return mid;
        } else {
          return getFirstK(data, first, mid-1, k);
        }
      } else if (data[mid] > k) {
        return getFirstK(data, first, mid - 1, k);
      } else if (data[mid] < k) {
        return getFirstK(data, mid + 1, last, k);
      }
    }

    function getLastK(data, first, last, k) {
      if (first > last) {
        return -1;
      }
      const mid = parseInt((first + last) / 2);
      if (data[mid] === k) {
        if (data[mid + 1] != k) {
          return mid;
        } else {
          return getLastK(data, mid + 1, last, k);
        }
      } else if (data[mid] > k) {
        return getLastK(data, first, mid - 1, k);
      } else if (data[mid] < k) {
        return getLastK(data, mid + 1, last, k);
      }
    }
```

## 考察点



- 数组
- 二分查找

# 二叉搜索树的第k个节点

## 题目



给定一棵二叉搜索树，请找出其中的第k小的结点。 例如， （5，3，7，2，4，6，8） 中，按结点数值大小顺序第三小结点的值为4。

## 思路



二叉搜索树的中序遍历即排序后的节点，本题实际考察二叉树的遍历。

## 代码



```js
    //递归实现
    function KthNode(pRoot, k) {
      const arr = [];
      loopThrough(pRoot, arr);
      if (k > 0 && k <= arr.length) {
        return arr[k - 1];
      }
      return null;
    }

    function loopThrough(node, arr) {
      if (node) {
        loopThrough(node.left, arr);
        arr.push(node);
        loopThrough(node.right, arr);
      }
    }


    //非递归实现
    function KthNode(pRoot, k) {
      const arr = [];
      const stack = [];
      let current = pRoot;
      while (stack.length > 0 || current) {
        while (current) {
          stack.push(current);
          current = current.left;
        }
        current = stack.pop();
        arr.push(current);
        current = current.right;
      }
      if (k > 0 && k <= arr.length) {
        return arr[k - 1];
      }
      return null;
    }
```

## 考察点



- 二叉树



# 二叉树的最大深度

## 题目



给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

说明: 叶子节点是指没有子节点的节点。

示例：

给定二叉树 `[3,9,20,null,null,15,7]`，

```text
    3
   / \
  9  20
    /  \
   15   7
```

返回它的最大深度 3 。

## 思路



- 深度优先遍历 + 分治
- 一棵二叉树的最大深度等于左子树深度和右子树最大深度的最大值 + 1

## 代码



```js
    function TreeDepth(pRoot) {
      return !pRoot ? 0 : Math.max(TreeDepth(pRoot.left), TreeDepth(pRoot.right)) + 1
    }
```

## 考察点



- 二叉树
- 递归
- 分治

# 平衡二叉树



## 题目



输入一棵二叉树，判断该二叉树是否是平衡二叉树。

> 平衡二叉树：每个子树的深度之差不超过1

## 思路



后续遍历二叉树

在遍历二叉树每个节点前都会遍历其左右子树

比较左右子树的深度，若差值大于1 则返回一个标记 -1表示当前子树不平衡

左右子树有一个不是平衡的，或左右子树差值大于1，则整课树不平衡

若左右子树平衡，返回当前树的深度（左右子树的深度最大值+1）

## 代码



```js
    function IsBalanced_Solution(pRoot) {
      return balanced(pRoot) != -1;
    }

    function balanced(node) {
      if (!node) {
        return 0;
      }
      const left = balanced(node.left);
      const right = balanced(node.right);
      if (left == -1 || right == -1 || Math.abs(left - right) > 1) {
        return -1;
      }
      return Math.max(left, right) + 1;
    }
```

## 考察点



- 二叉树



# 数组中只出现一次的数字

## 题目

一个整型数组里除了两个数字之外，其他的数字都出现了偶数次。请写程序找出这两个只出现一次的数字。

## 思路

```
1异或1=0` `0异或0=0` `1异或0=0
```

### 如果题目是只有一个只出现一次的数字：

两个相同的数异或值为`0`，将数组所有的值进行异或操作，最后剩余值就是目标值。

### 如果有两个出现一次的值

- 数组所有元素异或后是两个目标值的异或值
- 两个目标值不相等，所以最终的异或值不为`0`
- 最终异或值的二进制某一位肯定是`1`，找到这个位置为`index`
- 所以目标的两个值的二进制，一个`index`位为`0`，另一个`index`位为`1`
- 按二进制`index`位为`0`和`1`，将数组分两批进行异或，两批最后的结果即为两个目标值

## 代码

```js
    function FindNumsAppearOnce(array) {
      let exclusive = 0;
      for (let i = 0; i < array.length; i++) {
        exclusive = exclusive ^ array[i];
      }
      let index = findFirst1(exclusive);
      let result1 = 0;
      let result2 = 0;
      for (let i = 0; i < array.length; i++) {
        if (isN1(array[i], index)) {
          result1 = result1 ^ array[i]
        } else {
          result2 = result2 ^ array[i]
        }
      }
      return [result1, result2];
    }

    // 找到n的二进制第一个为1的位置
    function findFirst1(n) {
      let index = 0;
      while (((n & 1) === 0) && index < 64) {
        n = n >> 1;
        index++;
      }
      return index;
    }

    // 判断n的二进制第index位是否为1
    function isN1(n, index) {
      return n & (n >> index);
    }
```



# 和为S的两个数字

## 题目

输入一个递增排序的数组和一个数字`S`，在数组中查找两个数，使得他们的和正好是`S`，如果有多对数字的和等于`S`，输出两个数的乘积最小的。

## 思路

> 数组中可能有多对符合条件的结果，而且要求输出乘积最小的，说明要分布在两侧 比如 `3,8` `5,7` 要取`3,8`。

看了题目了，很像`leetcode`的第一题【两数之和】，但是题目中有一个明显不同的条件就是数组是有序的，可以使用使用大小指针求解，不断逼近结果，最后取得最终值。

- 设定一个小索引`left`，从`0`开始
- 设定一个大索引`right`，从`array.length`开始
- 判断`array[left] + array[right]`的值`s`是否符合条件
- 符合条件 - 返回
- 大于`sum`，`right`向左移动
- 小于`sum`，`left`向右移动
- 若`left=right`，没有符合条件的结果

> 类似【两数之和】的解法来求解，使用`map`存储另已经遍历过的`key`，这种解法在有多个结果的情况下是有问题的，因为这样优先取得的结果是乘积较大的。例如 `3,8` `5,7` ，会优先取到`5,7`。

## 代码

```js
    function FindNumbersWithSum(array, sum) {
      if (array && array.length > 0) {
        let left = 0;
        let right = array.length - 1;
        while (left < right) {
          const s = array[left] + array[right];
          if (s > sum) {
            right--;
          } else if (s < sum) {
            left++;
          } else {
            return [array[left], array[right]]
          }
        }
      }
      return [];
    }
```



# 和为S的连续正整数序列

## 题目

输入一个正数`S`，打印出所有和为S的连续正数序列。

例如：输入`15`，有序`1+2+3+4+5` = `4+5+6` = `7+8` = `15` 所以打印出3个连续序列`1-5`，`5-6`和`7-8`。

## 思路

- 创建一个容器`child`，用于表示当前的子序列，初始元素为`1,2`
- 记录子序列的开头元素`small`和末尾元素`big`
- `big`向右移动子序列末尾增加一个数 `small`向右移动子序列开头减少一个数
- 当子序列的和大于目标值，`small`向右移动，子序列的和小于目标值，`big`向右移动

## 代码

```js
    function FindContinuousSequence(sum) {
      const result = [];
      const child = [1, 2];
      let big = 2;
      let small = 1;
      let currentSum = 3;
      while (big < sum) {
        while (currentSum < sum && big < sum) {
          child.push(++big);
          currentSum += big;
        }
        while (currentSum > sum && small < big) {
          child.shift();
          currentSum -= small++;
        }
        if (currentSum === sum && child.length > 1) {
          result.push(child.slice());
          child.push(++big);
          currentSum += big;
        }
      }
      return result;
    }
```



# 字符串翻转

## 题目1-翻转单词顺序

输入一个英文句子，翻转句子中单词的顺序，但单词内字符的顺序不变。为简单起见，标点符号和普通字母一样处理。例如输入字符串`"I am a student."`，则输出`"student. a am I"`。

## 代码

直接调用数组`API`进行翻转，没啥好讲的。

```js
function ReverseSentence(str)
{
    if(!str){return ''}
    return str.split(' ').reverse().join(' ');
}
```

## 题目2-左旋转字符串

字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。请定义一个函数实现字符串左旋转操作的功能。比如输入字符串`"abcdefg"`和数字`2`，该函数将返回左旋转2位得到的结果`"cdefgab"`。

## 代码

将两个`str`进行拼接，直接从第`n`位开始截取，就相当于将前面`n`个数字移到末尾。

```js
function LeftRotateString(str, n)
{
    if(str&&n!=null){
       return (str+str).substr(n,str.length)
    }else{
        return ''
    }
}
```

## 剑指offer中的思路

上面两个问题都可以用简单的方法解决，《剑指offer》中的解法稍微有些复杂，我不推荐用，但是思路可以参考下：

### 翻转单词顺序：

- 第一步将整个字符串翻转，`"I am a student."` -> `".tneduts a ma I"`
- 第二步将字符串内的单个字符串进行翻转：`".tneduts a ma I"` -> `"student. a am I"`

### 左旋转字符串：

以`"abcdefg"`为例，将字符串分为两部分`ab`和`cdefg`

将两部分分别进行翻转，得到 -> `"bagfedc"`

再将整个字符串进行翻转，得到 -> `"cdefgab"`



# 滑动窗口的最大值

## 题目

给定一个数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口 k 内的数字。滑动窗口每次只向右移动一位。

返回滑动窗口最大值。

```text
输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
输出: [3,3,5,5,6,7] 
  滑动窗口的位置                最大值
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
```

## 思路

用一个双端队列`window`来存储滑动窗口

队列中存储滑动窗口的索引，根据窗口末尾元素和首位元素判断首位元素是否应该被移出队列

当前进入的元素下标 - 窗口头部元素的下标 `>= k` 头部元素移出队列

当新元素进入队列时，从队列末尾元素开始比较，将比新元素小的元素全部移出队列，这样可以保证队列中首个元素永远是窗口最大值

第`k`次遍历后开始向结果中添加最大值（滑动窗口首位元素）

时间复杂度`O(n)`

空间复杂度`O(n)`

## 代码

```js
    function maxInWindows(num, size) {
      const window = [];
      const result = [];
      if (Array.isArray(num) && num.length > 0 && size > 0) {
        for (let i = 0; i < num.length; i++) {
          if (i - window[0] >= size) {
            window.shift();
          }
          let n = window.length - 1;
          while (n >= 0 && num[window[n]] < num[i]) {
            n--;
            window.pop();
          }
          window.push(i);
          if (i >= size - 1) {
            result.push(num[window[0]]);
          }
        }
      }
      return result;
    }
```



# 扑克牌顺子

## 题目

给定一个数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口 k 内的数字。滑动窗口每次只向右移动一位。

返回滑动窗口最大值。

```text
输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
输出: [3,3,5,5,6,7] 
  滑动窗口的位置                最大值
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
```

## 思路

用一个双端队列`window`来存储滑动窗口

队列中存储滑动窗口的索引，根据窗口末尾元素和首位元素判断首位元素是否应该被移出队列

当前进入的元素下标 - 窗口头部元素的下标 `>= k` 头部元素移出队列

当新元素进入队列时，从队列末尾元素开始比较，将比新元素小的元素全部移出队列，这样可以保证队列中首个元素永远是窗口最大值

第`k`次遍历后开始向结果中添加最大值（滑动窗口首位元素）

时间复杂度`O(n)`

空间复杂度`O(n)`

## 代码

```js
    function maxInWindows(num, size) {
      const window = [];
      const result = [];
      if (Array.isArray(num) && num.length > 0 && size > 0) {
        for (let i = 0; i < num.length; i++) {
          if (i - window[0] >= size) {
            window.shift();
          }
          let n = window.length - 1;
          while (n >= 0 && num[window[n]] < num[i]) {
            n--;
            window.pop();
          }
          window.push(i);
          if (i >= size - 1) {
            result.push(num[window[0]]);
          }
        }
      }
      return result;
    }
```



# 圈圈中最后剩下的数字

## 题目

`0,1,...,n-1`这`n`个数字排成一个圆圈，从数字0开始，每次从这个圆圈里删除第`m`个数字。求出这个圆圈里剩下的最后一个数字。

其实这就是著名的约瑟夫环问题，下面是这个问题产生的背景，一个有趣的故事：

> 据说著名犹太历史学家 Josephus有过以下的故事：在罗马人占领乔塔帕特后，39 个犹太人与Josephus及他的朋友躲到一个洞中，39个犹太人决定宁愿死也不要被敌人抓到，于是决定了一个自杀方式，41个人排成一个圆圈，由第1个人开始报数，每报数到第3人该人就必须自杀，然后再由下一个重新报数，直到所有人都自杀身亡为止。然而Josephus 和他的朋友并不想遵从。首先从一个人开始，越过k-2个人（因为第一个人已经被越过），并杀掉第k个人。接着，再越过k-1个人，并杀掉第k个人。这个过程沿着圆圈一直进行，直到最终只剩下一个人留下，这个人就可以继续活着。问题是，给定了和，一开始要站在什么地方才能避免被处决？Josephus要他的朋友先假装遵从，他将朋友与自己安排在第16个与第31个位置，于是逃过了这场死亡游戏。

![img](https://interview.poetries.top/dist/img/yuesefu.jpg)

## 思路

**解法1:用链表模拟环**

- 用链表模拟一个环
- 模拟游戏场景
- 记录头节点的前一个节点`current`，以保证我们找到的要删除的节点是`current.next`
- 每次循环m次找到目标节点删除，直到链表只剩下一个节点
- 时间复杂度`O(m*n)` 空间复杂度`O(n)`

**解法2:用数组模拟**

- 每次计算下标，需要考虑末尾条件

**解法3:数学推导**

- `f(n) = (f(n-1)+m)%n` 即 `f(n,m) = (f(n-1,m)+m)%n`
- 使用递归求解 边界条件为 `n=1`

时间复杂度 `1>2>3`

易理解程度 `1>2>3`

## 代码

```js
    // 解法1
    function LastRemaining_Solution(n, m) {
      if (n < 1 || m < 1) {
        return -1;
      }
      const head = { val: 0 }
      let current = head;
      for (let i = 1; i < n; i++) {
        current.next = { val: i }
        current = current.next;
      }
      current.next = head;

      while (current.next != current) {
        for (let i = 0; i < m - 1; i++) {
          current = current.next;
        }
        current.next = current.next.next;
      }
      return current.val;
    }
    // 解法2
    function LastRemaining_Solution(n, m) {
      if (n < 1 || m < 1) {
        return -1;
      }
      const array = [];
      let index = 0;
      for (let i = 0; i < n; i++) {
        array[i] = i;
      }
      while (array.length > 1) {
        index = (index + m) % array.length - 1;
        if (index >= 0) {
          array.splice(index, 1);
        } else {
          array.splice(array.length - 1, 1);
          index = 0;
        }
      }
      return array[0];
    }
    // 解法3
    function LastRemaining_Solution(n, m) {
      if (n < 1 || m < 1) {
        return -1;
      } else {
        return joseoh(n, m);
      }

    }

    function joseoh(n, m) {
      if (n === 1) {
        return 0;
      }
      return (joseoh(n - 1, m) + m) % n;
    }
```



# 1+2+3+...+n

## 题目

求`1+2+3+...+n`，要求不能使用乘除法、`for、while、if、else、switch、case`等关键字及条件判断语句`（A?B:C）`。

## 代码

使用递归，使用&&短路来终止递归

```js
function Sum_Solution(n) {
    return n && (n + Sum_Solution(n - 1));
}
```

求和公式为 `n(n+1)/2 = (n方+n)/2`

可以用`Math.pow`函数求`n`方，用位运算代替除法

```js
    function Sum_Solution(n) {
      return (Math.pow(n, 2) + n) >> 1;
    }
```



# 不用加减乘除做加法

## 题目

写一个函数，求两个整数之和，要求在函数体内不得使用`+、-、*、/`四则运算符号。

## 思路

**将加法拆解成三步：**

- 1.不进位相加
- 2.计算进位
- 3.进位与不进位结果进行相加
- 重复这三步，直到进位值为0

**举一个十进制的例子 `5 + 17`：**

- 1.不进位相加 -> `12`
- 2.计算进位 -> `5+7` 产生进位 `10`
- 3.进位与不进位结果进行相加 `12 + 10 = 22`

**使用二进制代替上面的过程：**

- `5`的二进制为`101`，`17`的二进制为`10001`
- 1.不进位相加 -> `101+10001=10100`
- 2.计算进位 -> `10`
- 3.进位与不进位结果进行相加 `10100 + 10 = 10110`，转换成十进制后即`22`

**使用位运算来计算二进制：**

- 二进制异或操作和不进位相加得到的结果相同`(1^1=0 0^1=1 0^0=0)`
- 二进制与操作后左移和进位结果相同`（1&1=1 1&0=0 0&0=0）`

## 代码

*递归实现*

```js
    function Add(num1, num2) {
      if (num2 === 0) {
        return num1;
      }
      return Add(num1 ^ num2, (num1 & num2) << 1);
    }
```

*非递归实现*

```js
    function Add(num1, num2) {
      while (num2 != 0) {
        const excl = num1 ^ num2;
        const carry = (num1 & num2) << 1;
        num1 = excl;
        num2 = carry;
      }
      return num1;
    }
```

## 考察点

- 位运算
- 二进制



# 构建乘积数组

## 题目

给定一个数组A`[0,1,...,n-1]`,请构建一个数组B`[0,1,...,n-1]`,其中B中的元素`B[i]=A[0]*A[1]*...*A[i-1]*A[i+1]*...*A[n-1]`。不能使用除法。

## 思路

`B[i]`的值是`A`数组所有元素的乘积再除以`A[i]`，但是题目中给定不能用除法，我们换一个思路，将`B[i]`的每个值列出来，如下图：

![img](https://interview.poetries.top/dist/img/%E6%9E%84%E5%BB%BA%E4%B9%98%E7%A7%AF%E6%95%B0%E7%BB%84.png)

`B[i]`的值可以看作下图的矩阵中每行的乘积。

可以将`B`数组分为上下两个三角，先计算下三角，然后把上三角乘进去。

## 代码

```js
    function multiply(array) {
      const result = [];
      if (Array.isArray(array) && array.length > 0) {
        // 计算下三角
        result[0] = 1;
        for (let i = 1; i < array.length; i++) {
          result[i] = result[i - 1] * array[i - 1];
        }
        // 乘上三角
        let temp = 1;
        for (let i = array.length - 2; i >= 0; i--) {
          temp = temp * array[i + 1];
          result[i] = result[i] * temp;
        }
      }
      return result;
    }
```



# 字符串转换成整数

## 题目

将一个字符串转换成一个整数(实现`Integer.valueOf(string)`的功能，但是`string`不符合数字要求时返回0)，要求不能使用字符串转换整数的库函数。 数值为0或者字符串不是一个合法的数值则返回0。

## 思路

循环字符串：当前值*10相加，循环时看每一项是否合法，最后根据首位符号判断正负

主要考虑编写代码的严谨性，需要判断以下异常情况

- 1.输入为空
- 2.有无符号 正负

## 代码

```js
    function StrToInt(str) {
      if (str == undefined || str == '') {
        return 0;
      }
      const first = str[0];
      let i = 1;
      let int = 0;
      if (first >= 0 && first <= 9) {
        int = first;
      } else if (first !== '-' && first !== '+') {
        return 0;
      }
      while (i < str.length) {
        if (str[i] >= 0 && str[i] <= 9) {
          int = int * 10 + (str[i] - 0);
          i++;
        } else {
          return 0;
        }
      }
      return first === '-' ? 0 - int : int;
    }
```