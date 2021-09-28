# CSS之美

> 谈到CSS，就会想到兼容性，想到兼容性就会涉及到浏览器，浏览器是一切CSS的运行环境

## 浏览器



浏览器这家伙是前端开发者每天都打交道的工具，正是它，才有了前端这个职业。浏览器指显示万维网上的媒体信息(文字、图像、音频、视频等)和处理用户交互操作的软件。

浏览器正是Internet时代的产物，随着各种设备操作系统的普及、网络技术的全球化以及人们对信息需求的爆炸式增长，为浏览器的诞生和兴起提供了强大的动力，同时它也标志着互联网时代的来临。

### 组成

> 虽然目前市场上的浏览器品牌众多，但是浏览器的结构还是由以下几部分组成。

- 地址栏：用于输入网站地址，通过识别地址信息跳转到对应网站
- 菜单栏：包含设置内容和常用快捷操作，用户可自定义设置内容
- 标签栏：包含一个或多个窗口，窗口的内容互不干扰，独立运行
- 窗口栏：显示当前网站地址的访问内容，可为用户提供各种交互操作
- 状态栏：用于实时显示当前操作和下载Web页面的进度情况

## 历史



> 浏览器作为一个跨时代的科技产物，为现代网络人机交互的发展提供了强而有力的支持，历史的时刻不应该被忘记，以下简单列举一些浏览器的历史时刻。

- 1993年，NCSA组织发布了Mosaic浏览器
- 1994年，网景公司发布了Navigator浏览器
- 1995年，微软公司发布了IExplorer浏览器，并掀起了浏览器之战
- 1996年，Navigator浏览器的市场份额达到86%，微软公司开始将IExplorer浏览器整合到Windows操作系统中
- 1996年，ASA公司发布了Opera浏览器
- 1998年，网景公司启动其开源产品，开始推出Mozilla
- 2001年，为人诟病的IExplorer 6发布，这货霸占国内市场十多年
- 2002年，网景公司发布了Firefox浏览器
- 2003年，苹果公司发布了Safari浏览器
- 2004年，IExplorer浏览器的市场份额达到了历史顶峰92%，自此以后其市场份额开始下滑
- 2006年，Firefox 3的发布创下了吉尼斯世界纪录，一天800万下载量
- 2008年，谷歌公司发布了Chrome浏览器

> 至此，世界五大浏览器鼎立的格局逐渐形成，也为后期浏览器市场的多变提供了广大的技术支持。浏览器发展史并不久远，虽然只有短短的20多年，但是却不断在更新迭代，为广大互联网用户提供越来越强大的人机交互功能。

> 世界五大浏览器：Chrome、Safari、Firefox、Opera、IExplorer/Edge

## 渲染引擎



> 渲染引擎又名浏览器内核，指负责对网页语法解析并渲染成一张可视化页面的解析器。它是浏览器最核心最重要的部位，不同内核对网页语法的解析也有不同，因此同一网页语法在不同内核的浏览器中的渲染效果也可能不同，这就是常说的浏览器差异性。

上述提到的世界五大浏览器，在自身的发展过程中都使用了一种或多种浏览器内核作为自身的渲染引擎。

- Google Chrome：Webkit(前期)、Blink(后期)
- Apple Safari：Webkit
- Mozilla Firefox：Gecko
- ASA Opera：Presto(前期)、Blink(后期)
- Microsoft IExplorer：Trident
- Microsoft Edge：Trident(前期)、Blink(后期)

> IExplorer和Edge同是微软公司开发的浏览器产品，鉴于IExplorer存在很多为人诟病的问题，在后续的系统升级中逐渐使用Edge取代IExplorer在Windows上的位置

**因此20多年的浏览器发展史里，被大规模使用的浏览器内核也就这五个。**

- Blink内核：由谷歌公司和欧朋公司合作自研的内核，同时谷歌公司也将其作为开源内核架构Chromium的一部分发布，在Chrome 28+和Opear 15+中被使用。
- Webkit内核：由苹果公司自研的内核，同时也是Blink内核的原型，在Chrome 1 ~ 28和Safari 1+中被使用。
- Gecko内核：由网景公司自研的内核，先期在Navigator中使用，后期推广到Firefox上，在Firefox 1+中被使用。
- Presto内核：由欧朋公司自研的内核，其渲染性能达到极致但是牺牲了兼容性，目前已经废弃，在Opear 7 ~ 14中被使用。
- Trident内核：由微软公司自研的内核，由于其被包含在全世界使用率最高的Windows操作系统中，导致十多年时间里一直称霸浏览器内核界，在IExplorer 4+中被使用。

## 渲染过程



> 要了解浏览器页面的渲染过程，首先得知道关键渲染路径。关键渲染路径指浏览器从最初接收请求得到HTML、CSS、JS等资源，然后解析、构建、渲染、布局、绘制、合成，到最后呈现在用户眼前界面的整个过程。

**笔者将关键渲染路径划分理解，页面的渲染过程分为以下几部分。**

- 解析文件
  - 将html文件转换为DOM树
  - 将css文件转换为CSSOM树
  - 将DOM树和CSSOM树合并生成渲染树
- 绘制图层
  - 根据渲染树布局(回流)
  - 根据布局绘制(重绘)
- 合成图层：合成图层显示在屏幕上

**解析文件**

HTML文档描述一个页面的结构，浏览器通过HTML解析器将HTML解析成DOM树结构。HTML文档中所有内容皆为节点，各节点间拥有层级关系，彼此相连，构成DOM树。构建DOM树的过程：读取HTML文档的字节(Bytes)，将字节转换成字符(Chars)，依据字符确定标签(Tokens)，将标签转换成节点(Nodes)，以节点为基准构建DOM树。

CSS文档描述一个页面的表现，浏览器通过CSS解析器将CSS解析成CSSOM树结构，与DOM树结构比较像。CSS文档中所有内容皆为节点，与HTML文档中的节点一一对应，各节点间拥有层级关系，彼此相连，构成CSSOM树。构建CSSOM树的过程：读取CSS文档的字节(Bytes)，将字节转换成字符(Chars)，依据字符确定标签(Tokens)，将标签转换成节点(Nodes)，以节点为基准构建CSSOM树。与DOM树的构建过程完全一致。

在构建DOM树的过程中，当HTML解析器遇到`<script>`时会立即阻塞DOM树的构建，将控制权移交给浏览器的JS引擎，等到JS引擎运行完毕，浏览器才会从中断的地方恢复DOM树的构建。`<script>`的脚本加载完成后，JS引擎通过DOM API和CSSOM API操作DOM树和CSSOM树。为何会产生渲染阻塞呢？其根本原因在于：JS操作DOM后，浏览器无法预测未来DOM的具体内容，为了防止无效操作和节省资源，只能阻塞DOM树的构建。

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/acb36f3594814e59be49fd0553e2958d~tplv-k3u1fbpfcp-zoom-1.image)

> 浏览器的渲染引擎将DOM树和CSSOM树合并生成渲染树，只渲染需显示的节点及其样式。DOM树、CSSOM树和渲染树三者的构建并无先后条件和先后顺序，并非完全独立而是会有交叉并行构建的情况。因此会形成一边加载，一边解析，一边渲染的工作现象

**绘制图层**

> 进入绘制阶段，遍历渲染树，调用渲染器的paint()在屏幕上绘制内容。根据渲染树布局计算样式，即每个节点在页面中的布局、尺寸等几何属性。HTML默认是流式布局，CSS和JS会打破这种布局，改变DOM的几何属性和外观属性。在绘制过程中，根据渲染树布局，再根据布局绘制，这就是常听常说的回流重绘。

在此涉及到两个核心概念：回流、重绘。笔者用两句精简的话分别概括它们。

- 回流：几何属性需改变的渲染
- 重绘：更改外观属性而不影响几何属性的渲染

> 当生成渲染树后，至少会渲染一次。在后续交互过程中，还会不断地重新渲染。这时只会回流重绘或只有重绘。因此引出一个定向法则：回流必定引发重绘，重绘不一定引发回流。

**合成图层**

> 将回流重绘生成的图层逐张合并并显示在屏幕上。上述几个步骤并不是一次性顺序完成的，若DOM或CSSOM被修改，上述过程会被重复执行。实际上，CSS和JS往往会多次修改DOM或CSSOM，简单来说就是用户的交互操作引发了网页的重渲染

## 兼容性



兼容性又名网站兼容性或网页兼容性，指网页在各种浏览器上的显示效果可能不同而产生浏览器和网页间的兼容问题。

说到兼容性，就不得不推荐一个专门为前端开发者定制可查询CSS/JS特性在各种浏览器中兼容性的网站Caniuse，它可很好地保障网页在不同浏览器间的兼容性。有了这个工具可快速地了解使用到的代码在各个浏览器中的效果。所以后续使用VScode编码的过程中都会顺带使用Caniuse查看CSS属性以及选择器的兼容性。

产生浏览器间的兼容问题，正是上述谈到的渲染引擎而导致的。在网站的设计和开发中，做好浏览器兼容才能让网站在不同浏览器间都能显示正常。浏览器对标准的更好兼容能够给用户带来更好的使用体验，当然无法奢求浏览器厂商能统一所有浏览器标准，所以前端开发者只能自己着手解决。

以下聊聊处理CSS兼容性的三种方法，相对处理JS兼容性来说简单到不得了，这也是普遍前端开发者认为CSS简单的原因之一。通过以下方法处理，后续编码时就不会编写CSS私有属性了

**磨平浏览器默认样式**

> 每个浏览器的CSS默认样式不尽相同，所以最简单最有效的方法就是对其默认样式初始化。以下贴一个各位同学都会的初始化代码。简单暴力但是不明确，*通配符可是有执行性能问题的。

```text
* {
    margin: 0;
    padding: 0;
}
```

> 以下推荐两种磨平浏览器默认样式的方法，在接入其他css文件前将其导入

- `normalize.css`：懒人必备的浏览器默认样式库，接近40k的Star，说明大部分人都是懒人
- `reset.css`：其实就是笔者自定义的默认样式，各位同学也可自行为项目撰写一份默认样式

> 在项目入口文件的其他css文件前导入，若使用burce-cli，可能发现在index.js里已经提前导入了reset.css

```text
import "path/to/normalize.css";
// 或
import "path/to/reset.css";
```

**插入浏览器私有属性**

通常编写CSS都会在一些CSS3属性前加入-webkit-、-moz-、-ms-或-o-，这些奇形怪状写到手软的东西就是浏览器私有属性。样式少还好，样式多那就欲哭无泪了😂。

出现这些私有属性，是因为制定CSS标准的W3C其动作就像蜗牛一样慢，量产一个CSS属性是需走一个很严格很复杂的流程。一个成熟且被大众肯定的属性，浏览器厂商会加大其支持力度而铺路，但是为了避免日后W3C公布标准时有所变更，就加入一个本厂商的私有属性提前支持该属性，待W3C公布该属性标准后，再让新版浏览器支持标准属性。

对于编写私有属性的顺序需特别注意：兼容性写法放到前面，标准写法放到最后。在浏览器解析CSS过程中，若标准属性无法使用则使用当前浏览器对应的私有属性

```css
/* Chrome、Safari、New Opera、New Edge */
-webkit-transform: translate(10px, 10px);
/* Firefox */
-moz-transform: translate(10px, 10px);
/* IExplorer、Old Edge */
-ms-transform: translate(10px, 10px);
/* Old Opera */
-o-transform: translate(10px, 10px);
/* 标准 */
transform: translate(10px, 10px);
```

- 当然不是所有的CSS3属性都需补齐-webkit-、-moz-、-ms-或-o-，上述Demo只是一个示例，真正的transform私有属性只有-webkit-和-ms-。这些需查看Caniuse确保正确的编写，若想偷懒也可全部写上。
- 每个CSS3属性都编写这么一堆兼容性代码，无疑是对生命最大的浪费。在使用Webpack打包项目代码的过程中，可接入postcss-loader和postcss-preset-env，postcss-preset-env内置了autoprefixer，它会依据Caniuse所提供的数据对代码里的CSS3属性批量添加私有属性。
- 若使用bruce-cli，那么也无需关注CSS私有属性的插入，因为其内置了postcss-loader和postcss-preset-env。自动化工具的好处就是为了解决一些重复而无趣的工作

**CSS Hack**

CSS Hack指针对不同浏览器编写不同CSS，让它能够同时兼容不同浏览器，在不同浏览器中渲染想要的效果。当然也可反过来利用CSS Hack为不同版本的浏览器定制不同效果。

在一些老旧网站的html文件或css文件里可能会看到以下代码，没错，这就是CSS Hack。现在可能很多同学都不会遇到这种写法，毕竟很多公司的产品都放弃了IExplorer 8以下的兼容，这些痕迹都已经成为历史。很多同学没想过5年到10年前的前端开发者是多么苦逼的，光兼容IExplorer就已经够烦了，还连续兼容几个版本。

```html
<head>
    <!--[if IE]>
    <style>
    .elem {
        background-color: #f66;
    }
    </style>
    <![endif]-->
</head>
.elem {
    background-color: #f66; /* IExplorer 8+ */
    *background-color: #f66; /* IExplorer 7 */
    _background-color: #f66; /* IExplorer 6 */
}
```

> 所以现在也不会推荐去学习这些CSS Hack，有一个基本的了解即可。上述CSS Hack写法只是最简单的几行代码，其实还存在一些更难的表达式。当然也不推荐这种写法，毕竟不符合大名鼎鼎的雅虎军规的Avoid CSS Expressions。

综上所述，结合【磨平浏览器默认样式】和【插入浏览器私有属性】这两种方法完成浏览器兼容性的处理即可

**IExplorer兼容性**

在此也顺带提一个众多前端开发者觉得很头疼的问题，就是IExplorer兼容性。试问一下，兼容一个90年代末00年代初的浏览器版本，是一个多费劲的事情啊，刚好又遇上HTML5和CSS3的迅速发展，是一个技术的取舍问题，要么原地踏步要么紧跟潮流，笔者最终还是选择了后者。

正是IExplorer的垄断性和大部分网站在早期是基于IExplorer 6开发和维护的，导致了后期的用户都是优先使用IExplorer 6浏览，也就造成了很多公司招聘前端开发者都是要标配处理IExplorer 6兼容性

IExplorer的垄断性使得Trident内核在十多年时间里一家独大，微软公司可能很有信心吧，在很长时间内都无更新Trident内核，导致其曾经与W3C标准完全脱节和大量安全隐患无法得到解决。看过Jquery源码的同学应该都知道，源码里包含了大量的IExplorer兼容代码，所以在移动端上使用Jquery操作DOM是一件很费力不讨好的事情，后面才出现一个叫Zepto的库代替Jquery在移动端上的使用，该库很小，因为删除了所有的IExplorer兼容代码

在此笔者也建议，在业务需求允许的范围内尽量不要兼容IExplorer，毕竟兼容IExplorer需花费很多时间去维护，更何况微软公司已经宣布不再支持IExplorer的维护而转向Edge。

目前大部分国产浏览器是基于开源内核架构Chromium二次开发的，可认为是Chrome外面又包了一层外壳。另外可能有些国产浏览器打着双内核的旗号，在Blink内核的基础上又增加一个Trident内核。Blink内核对应着浏览器的极速模式，可访问一些比较现代化和超前技术的网站，例如特效网站和可视化网站；Trident内核对应着浏览器的兼容模式，可访问一些久经不衰的OG网站，例如政务网站和金融网站。



## 重绘回流

## 前言



上一章梳理了浏览器三大核心内容：渲染引擎、渲染过程、兼容性。其中渲染过程里的回流和重绘是CSS中很重要的概念。了解和认识它们，可编写出性能更好的CSS代码。

有些同学说，怎么不开发完CSS再找时间优化呢？试问有多少同学开发完一个项目后会拿出空余时间重构或优化你的代码。何必不在编码时对CSS代码进行一次完美的编写呢？接下来隆重介绍本章的两位主角。

## 回流



> 回流又名重排，指几何属性需改变的渲染。但是感觉回流这个词比较高大上，后续统称回流吧。

可理解成，将整个网页填白，对内容重新渲染一次。只不过以人眼的感官速度去看浏览器回流是不会有任何变化的，若你拥有闪电侠的感官速度去看浏览器回流(实质是将时间调慢)，就会发现每次回流都会将页面清空，再从左上角第一个像素点从左到右从上到下这样一点一点渲染，直至右下角最后一个像素点。每次回流都会呈现该过程，只是感受不到而已。

> 渲染树的节点发生改变，影响了该节点的几何属性，导致该节点位置发生变化，此时就会触发浏览器回流并重新生成渲染树。回流意味着节点的几何属性改变，需重新计算并生成渲染树，导致渲染树的全部或部分发生变化。

## 重绘



> 重绘指更改外观属性而不影响几何属性的渲染。相比回流，重绘在两者中会温和一些，后续谈到的CSS性能优化就会基于该特点展开。

渲染树的节点发生改变，但是不影响该节点的几何属性。由此可见，**回流对浏览器性能的消耗是高于重绘的，而且回流一定会伴随重绘，重绘却不一定伴随回流**。

为何回流一定会伴随重绘呢？整个节点的位置都变了，肯定要重新渲染它的外观属性啊！

## 属性分类



> 以下对一些常用的几何属性和外观属性分类，其实同种分类的属性都有一些共同点，各位同学可自行感受。推荐一个查询CSS属性渲染状态的网站[CssTriggers (opens new window)](https://csstriggers.com/)，可查看每个属性在渲染过程中发生了什么影响了什么

- 几何属性：包括布局、尺寸等可用数学几何衡量的属性
  - 布局：display、float、position、list、table、flex、columns、grid
  - 布局：display、float、position、list、table、flex、columns、grid
- 外观属性：包括界面、文字等可用状态向量描述的属性
  - 界面：appearance、outline、background、mask、box-shadow、box-reflect、filter、opacity、clip
  - 文字：text、font、word

**如何理解回流重绘**

有无更好的方法可帮助理解回流重绘呢？答案是有的。

某一天星巴克发行一套很有纪念价值的杯子，男同胞们为了买到心仪的杯子给女友当惊喜礼物，通宵达旦搬张板凳去星巴克门口排队。此时形成的队伍是有序的，毕竟大家都是文明人，不可能随便插队吧，先到先拿，这个道理谁都懂！

可是总有一些人不按常理出牌，别人排队排得那么辛苦，他一到来就仗着自己有钱有势人多马多，插队到最前面。若他插队成功，那么后面的人都要往后挪一位。此时队伍就要重新往后挪，甚至引发多人斗殴。但是混乱的情况总会被控制下来，此时就得重新排队，而原先的队伍顺序经过这次斗殴就可能不按照原先的队伍顺序排队了。几何属性变了，就要重新排队，这个就是回流或重排。重新排队啊😂！

一位漂亮妹纸排队排得久肚子呱呱叫，就与另一位同伴交换，她去买早餐，而这位同伴代替她的位置。各位男同胞可能发现这位妹纸更漂亮了。没错，外观属性改变了，变漂亮了，但是除了妹纸，其余人的位置和顺序都无发生变化，所以肯定不会发生上述重新排队的情况。外观属性变了，但是几何属性没变，这个就是重绘。不用重新排队，还有漂亮妹纸看，大家都很乐意🤔！

## 性能优化



回流重绘在操作节点样式时频繁出现，同时也存在很大程度上的性能问题。回流成本比重绘成本高得多，一个节点的回流很有可能导致子节点、兄弟节点或祖先节点的回流。在一些高性能电脑上也许无什么影响，但是回流发生在手机上(明摆说某些安卓手机)，就会减缓加载速度和增加电量消耗。

在上一章中引出一个定向法则：回流必定引发重绘，重绘不一定引发回流，可利用该法则解决一些因为回流重绘而引发的性能问题。在优化性能前，需了解什么情况可能产生性能问题，**以下罗列一些常见的情况**。

- 改变窗口大小
- 修改盒模型
- 增删样式
- 重构布局
- 重设尺寸
- 改变字体
- 改动文字

> 很多同学可能不知，回流重绘其实与浏览器的事件循环有关，以下源自对[HTML文档的理解(opens new window)](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)

- 浏览器刷新频率为`60Hz`，即每`16.6ms`更新一次
- 事件循环执行完成微任务
- 判断`document`是否需更新
- 判断`resize/scroll`事件是否存在，存在则触发事件
- 判断`Media Query`是否触发
- 更新动作并发送事件
- 判断`document.isFullScreen`是否为`true`(全屏)
- 执行`requestAnimationFrame`回调
- 执行`IntersectionObserver`回调
- 更新界面

> 上述就是浏览器每一帧中可能会做到的事情，若在一帧中有空闲时间，就会执行`requestIdleCallback`回调。

回到正题，通过定向法则回流必定引发重绘，重绘不一定引发回流可知道，尽量减少回流重绘，就是CSS性能优化中一个很好的指标。

> 如何减少和避免回流重绘

**1. 使用transform代替top**

> top是几何属性，操作top会改变节点位置从而引发回流，使用`transform:translate3d(x,0,0)`代替top，只会引发图层重绘，还会间接启动GPU加速，该情况在第12章变换与动画中会详细讲解。

**2. 使用visibility:hidden替换display:none**

> 笔者从以下四方面对比`display:none`和`visibility:hidden，display:none`简称DN，`visibility:hidden`简称VH

- 占位表现
  - DN不占据空间
  - VH占据空间
- 触发影响
  - DN触发回流重绘
  - VH触发重绘
- 过渡影响
  - DN影响过渡不影响动画
  - VH不影响过渡不影响动画
- 株连效果
  - DN后自身及其子节点全都不可见
  - VH后自身及其子节点全都不可见但可声明子节点`visibility:visible`单独显示

> 两者的占位表现、触发影响和株连效果就能说明VH代替DN的好处，从两者区别中就能找出恰当的答案了

**3. 避免使用Table布局**

> 牵一发而动全身用在Table布局身上就很适合了，可能很小的一个改动就会造成整个`<table>`回流，有兴趣的同学可用Chrome Devtools的Performance调试看看，在此就不演示了。

通常可用`<ul>`、`<li>`和`<span>`等标签取代`<table>`系列标签生成表格。

**4. 避免样式节点层级过多**

> 浏览器的CSS解析器解析css文件时，对CSS规则是从右到左匹配查找，样式层级过多会影响回流重绘效率，建议保持CSS规则在3层左右。

**5. 将频繁回流或重绘的节点设置为图层**

上一章的渲染过程最后一步，提到将回流重绘生成的图层逐张合并并显示在屏幕上。可将其理解成Photoshop的图层，若不对图层添加关联，图层间是不会互相影响的。同理，在浏览器中设置频繁回流或重绘的节点为一张新图层，那么新图层就能够阻止节点的渲染行为影响别的节点，这张图层里怎样变化都无法影响到其他图层

> 设置新图层有两种方法，将节点设置为`<video>`或`<iframe>`，为节点添加`will-change`。`will-change`是一个很叼的属性，在第12章变换与动画中会详细讲解

**6. 动态改变类名而不改变样式**

- 不要尝试每次操作DOM去改变节点样式，这样会频繁触发回流。
- 更好的方法是使用新的类名预定义节点样式，在执行逻辑操作时收集并确认最终更换的类名集合，在适合时机一次性动态替换原来的类名集合。有点像vue的依赖收集机制，不知这样描述会不会更容易理解。

各位同学可研究下这个强大的[classList (opens new window)](https://www.runoob.com/jsref/prop-element-classlist.html)，它能满足笔者所说的需求。

**7. 避免节点属性值放在循环里当成循环变量**

```text
for (let i = 0; i < 10000; i++) {
    const top = document.getElementById("css").style.top;
    console.log(top);
}
```

> 每次循环操作DOM都会发生回流，应该在循环外使用变量保存一些不会变化的DOM映射值

```text
const top = document.getElementById("css").style.top;
for (let i = 0; i < 10000; i++) {
    console.log(top);
}
```

**8. 使用requestAnimationFrame作为动画速度帧**

> 动画速度越快，回流次数越多，上述有提到浏览器刷新频率为60Hz，即每16.6ms更新一次，而requestAnimationFrame()正是以16.6ms的速度更新一次。所以可用requestAnimationFrame()代替setInterval()。

## 属性排序



> 在进入属性排序这个话题前，先来看看以下两段CSS代码。

```text
.elem {
    width: 200px;
    background-color: #f66;
    align-items: center;
    color: #fff;
    height: 200px;
    justify-content: center;
    font-size: 20px;
    display: flex;
}
.elem {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    background-color: #f66;
    font-size: 20px;
    color: #fff;
}
```

若不特别指明，可能各位同学觉得这两段代码无异样，顶多就是属性顺序不同。但是仔细观察两段代码，就会发现第一段代码好像无依据地随便排列，而第二段代码好像按照某些规范顺序排列。

> 属性排序指按照预设规范排列CSS属性。提供一个预设的约定规范，依据该规范以一定的顺序排列所有属性。

曾经笔者也是随机排列属性顺序，想到什么写什么，反正能实现就行。但是反过来看，随意真的好吗，每次维护代码都需反复确认某个属性是否已经存在，混乱的属性排序让笔者有时无法在脑海里构思出更好的排版。所以笔者下意识去了解和认识属性排序，利用一些约定规范合理管理我的CSS代码。

曾经有一个著名的CSS网站CSSTricks做了一份属性排序的调查问卷，调查结果如下。

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/94af68e4f7d34b70a0e1aca114158ede~tplv-k3u1fbpfcp-zoom-1.image)

- A：随意排序占39%
- B：按照类型排序占45%
- C：按照单行代码长度排序占2%
- D：按照属性字母排序占14%

> 发现B选项占比最多

**属性排序有很多优点，笔者着重罗列一些。**

- 突出CSS艺术之美
- 防止属性重复编写
- 可快速定位到问题代码
- 可快速在脑海里构思出节点
- 可锻炼无视图架构页面能力
- 提高代码的可读性和可维护性

大部分前端开发者都会给属性做排序，可见业内大部分人对属性排序持有肯定的态度，只是在排序方式上会有一定的分歧。按照长度排序和按照字母排序是比较简单易用的排序方式，但是忽略了属性间的关联性。而按照类型排序又会分为很多种，主要还是围绕着盒模型。

- 按照类型排序
- 按照长度排序
- 按照字母排序

属性排序并不会影响样式的功能和性能，只是让代码看起来更简洁和规范。

> 笔者将属性排序按照布局 → 尺寸 → 界面 → 文字 → 交互的方式顺序定义。把交互属性放到后面是因为transform和animation会让节点重新生成新图层，上述有提到新图层不会对其他图层造成影响。

**布局属性**

- 显示：`display` `visibility`
- 溢出：`overflow` `overflow-x` `overflow-y`
- 浮动：`float` `clear`
- 定位：`position` `left` `right` `top` `bottom` `z-index`
- 列表：`list-style` `list-style-type` `list-style-position` `list-style-image`
- 表格：`table-layout` `border-collapse` `border-spacing` `caption-side` `empty-cells`
- 弹性：`flex-flow` `flex-direction` `flex-wrap` `justify-content` `align-content` `align-items` `align-self` `flex` `flex-grow` `flex-shrink` `flex-basis` `order`
- 多列：`columns` `column-width` `column-count` `column-gap` `column-rule` `column-rule-width` `column-rule-style` `column-rule-color` `column-span` `column-fill` `column-break-before` `column-break-after` `column-break-inside`
- 格栅：`grid-columns` `grid-rows`

**尺寸属性**

- 模型：box-sizing
- 边距：margin margin-left margin-right margin-top margin-bottom
- 填充：padding padding-left padding-right padding-top padding-bottom
- 边框：border border-width border-style border-color border-colors `border-[direction]-<param>`
- 圆角：border-radius border-top-left-radius border-top-right-radius border-bottom-left-radius border-bottom-right-radius
- 框图：border-image border-image-source border-image-slice border-image-width border-image-outset border-image-repeat
- 大小：width min-width max-width height min-height max-height

**界面属性**

- 外观：appearance
- 轮廓：outline outline-width outline-style outline-color outline-offset outline-radius `outline-radius-[direction]`
- 背景：background background-color background-image background-repeat background-repeat-x background-repeat-y background-position background-position-x background-position-y background-size background-origin background-clip background-attachment bakground-composite
- 遮罩：mask mask-mode mask-image mask-repeat mask-repeat-x mask-repeat-y mask-position mask-position-x mask-position-y mask-size mask-origin mask-clip mask-attachment mask-composite mask-box-image mask-box-image-source mask-box-image-width mask-box-image-outset mask-box-image-repeat mask-box-image-slice
- 滤镜：box-shadow box-reflect filter mix-blend-mode opacity,
- 裁剪：object-fit clip
- 事件：resize zoom cursor pointer-events touch-callout user-modify user-focus user-input user-select user-drag

**文字属性**

- 模式：line-height line-clamp vertical-align direction unicode-bidi writing-mode ime-mode
- 文本：text-overflow text-decoration text-decoration-line text-decoration-style text-decoration-color text-decoration-skip text-underline-position text-align text-align-last text-justify text-indent text-stroke text-stroke-width text-stroke-color text-shadow text-transform text-size-adjust
- 字体：src font font-family font-style font-stretch font-weight font-variant font-size font-size-adjust color
- 内容：overflow-wrap word-wrap word-break word-spacing letter-spacing white-space caret-color tab-size content counter-increment counter-reset quotes page page-break-before page-break-after page-break-inside

**交互属性**

- 模式：will-change perspective perspective-origin backface-visibility
- 变换：transform transform-origin transform-style
- 过渡：transition transition-property transition-duration transition-timing-function transition-delay
- 动画：animation animation-name animation-duration animation-timing-function animation-delay animation-iteration-count animation-direction animation-play-state animation-fill-mode

> 在此已经整合了95%的属性，可满足95%的属性排序。其他未列入的属性，可根据自身使用习惯添加。当然笔者的属性分类只提供参考。

**配置**

> 纯粹靠在编码过程中按照约定规范排列属性肯定是有难度的，也不方便频繁修改代码。每次编码时都记住这些属性排序估计也挺费脑力的，这么多属性，肯定使用工具自动化处理啊！推荐一个自动排列CSS属性的网站Csscomb，在学前准备那章已经安装了VSCode的Csscomb，接下来就配置一键排序

该插件貌似只有存档，主软件包已经无维护者了，后续估计也不会再更新

官网内容已经不复存在，以前是一步一步显示配置再选择适合自己的配置，最终生成一个json文件。配置详情请戳这里，以下的全局配置也是依据文档处理的，当然你也可对工作区设置。

> 打开VSCode，Window系统选择ctrl+, → 用户 → 右上角第二个图标(打开设置)，Mac系统选择cmd+, → 用户 → 右上角第二个图标(打开设置)，在json文件里插入以下配置。

> sort-order是一个数组，由于属性太多就不一一插入了，按照上述分类好的排序逐个插入即可，"sort-order":["display", "visibility", ...]

配置详情

```json
{
	"csscomb.formatOnSave": true, // 保存代码时自动格式化
	"csscomb.preset": {
		"always-semicolon": true, // 分号结尾
		"block-indent": "\t", // 换行格式
		"color-case": "lower", // 颜色格式
		"color-shorthand": true, // 颜色缩写
		"element-case": "lower", // 元素格式
		// "eof-newline": false, // 结尾空行
		"leading-zero": false, // 保留前导零位
		// "lines-between-rulesets": 0, // 规则间隔行数
		"quotes": "double", // 引号格式
		"remove-empty-rulesets": true, // 剔除空规则
		"space-between-declarations": "\n", // 属性换行
		"space-before-closing-brace": "\n", // 后花括号前插入
		"space-after-colon": " ", // 冒号后插入
		"space-before-colon": "", // 冒号前插入
		"space-after-combinator": " ", // 大于号后插入
		"space-before-combinator": " ", // 大于号前插入
		"space-after-opening-brace": "\n", // 前花括号后插入
		"space-before-opening-brace": " ", // 前花括号前插入
		"space-after-selector-delimiter": "\n", // 逗号后插入
		"space-before-selector-delimiter": "", // 逗号前插入
		"strip-spaces": true, // 剔除空格
		"tab-size": true, // 缩进大小
		"unitless-zero": true, // 剔除零单位
		"vendor-prefix-align": false, // 前缀缩进
		"sort-order": [
			// 布局属性
			"display",
			"visibility",
			"overflow",
			"overflow-x",
			"overflow-y",
			// 布局属性：浮动
			"float",
			"clear",
			// 布局属性：定位
			"position",
			"left",
			"right",
			"top",
			"bottom",
			"z-index",
			// 布局属性：列表
			"list-style",
			"list-style-type",
			"list-style-position",
			"list-style-image",
			// 布局属性：表格
			"table-layout",
			"border-collapse",
			"border-spacing",
			"caption-side",
			"empty-cells",
			// 布局属性：弹性
			"flex-flow",
			"flex-direction",
			"flex-wrap",
			"justify-content",
			"align-content",
			"align-items",
			"align-self",
			"flex",
			"flex-grow",
			"flex-shrink",
			"flex-basis",
			"order",
			// 布局属性：多列
			"columns",
			"column-width",
			"column-count",
			"column-gap",
			"column-rule",
			"column-rule-width",
			"column-rule-style",
			"column-rule-color",
			"column-span",
			"column-fill",
			"column-break-before",
			"column-break-after",
			"column-break-inside",
			// 布局属性：格栅
			"grid-columns",
			"grid-rows",
			// 尺寸属性
			"box-sizing",
			"margin",
			"margin-left",
			"margin-right",
			"margin-top",
			"margin-bottom",
			"padding",
			"padding-left",
			"padding-right",
			"padding-top",
			"padding-bottom",
			"border",
			"border-width",
			"border-style",
			"border-color",
			"border-colors",
			"border-left",
			"border-left-width",
			"border-left-style",
			"border-left-color",
			"border-left-colors",
			"border-right",
			"border-right-width",
			"border-right-style",
			"border-right-color",
			"border-right-colors",
			"border-top",
			"border-top-width",
			"border-top-style",
			"border-top-color",
			"border-top-colors",
			"border-bottom",
			"border-bottom-width",
			"border-bottom-style",
			"border-bottom-color",
			"border-bottom-colors",
			"border-radius",
			"border-top-left-radius",
			"border-top-right-radius",
			"border-bottom-left-radius",
			"border-bottom-right-radius",
			"border-image",
			"border-image-source",
			"border-image-slice",
			"border-image-width",
			"border-image-outset",
			"border-image-repeat",
			"width",
			"min-width",
			"max-width",
			"height",
			"min-height",
			"max-height",
			// 界面属性
			"appearance",
			"outline",
			"outline-width",
			"outline-style",
			"outline-color",
			"outline-offset",
			"outline-radius",
			"outline-radius-topleft",
			"outline-radius-topright",
			"outline-radius-bottomleft",
			"outline-radius-bottomright",
			"background",
			"background-color",
			"background-image",
			"background-repeat",
			"background-repeat-x",
			"background-repeat-y",
			"background-position",
			"background-position-x",
			"background-position-y",
			"background-size",
			"background-origin",
			"background-clip",
			"background-attachment",
			"bakground-composite",
			"background-blend-mode",
			"mask",
			"mask-mode",
			"mask-image",
			"mask-repeat",
			"mask-repeat-x",
			"mask-repeat-y",
			"mask-position",
			"mask-position-x",
			"mask-position-y",
			"mask-size",
			"mask-origin",
			"mask-clip",
			"mask-attachment",
			"mask-composite",
			"mask-box-image",
			"mask-box-image-source",
			"mask-box-image-width",
			"mask-box-image-outset",
			"mask-box-image-repeat",
			"mask-box-image-slice",
			"box-shadow",
			"box-reflect",
			"filter",
			"mix-blend-mode",
			"opacity",
			"object-fit",
			"clip",
			"clip-path",
			"resize",
			"zoom",
			"cursor",
			"pointer-events",
			"touch-callout",
			"user-modify",
			"user-focus",
			"user-input",
			"user-select",
			"user-drag",
			// 文字属性
			"line-height",
			"line-clamp",
			"vertical-align",
			"direction",
			"unicode-bidi",
			"writing-mode",
			"ime-mode",
			"text-overflow",
			"text-decoration",
			"text-decoration-line",
			"text-decoration-style",
			"text-decoration-color",
			"text-decoration-skip",
			"text-underline-position",
			"text-align",
			"text-align-last",
			"text-justify",
			"text-indent",
			"text-stroke",
			"text-stroke-width",
			"text-stroke-color",
			"text-shadow",
			"text-transform",
			"text-size-adjust",
			"src",
			"font",
			"font-family",
			"font-style",
			"font-stretch",
			"font-weight",
			"font-variant",
			"font-size",
			"font-size-adjust",
			"color",
			// 内容属性
			"overflow-wrap",
			"word-wrap",
			"word-break",
			"word-spacing",
			"letter-spacing",
			"white-space",
			"caret-color",
			"tab-size",
			"content",
			"counter-increment",
			"counter-reset",
			"quotes",
			"page",
			"page-break-before",
			"page-break-after",
			"page-break-inside",
			// 交互属性
			"will-change",
			"perspective",
			"perspective-origin",
			"backface-visibility",
			"transform",
			"transform-origin",
			"transform-style",
			"transition",
			"transition-property",
			"transition-duration",
			"transition-timing-function",
			"transition-delay",
			"animation",
			"animation-name",
			"animation-duration",
			"animation-timing-function",
			"animation-delay",
			"animation-iteration-count",
			"animation-direction",
			"animation-play-state",
			"animation-fill-mode"
		] // 属性排序
	}
}
```

> 配置完成后，若觉得每次保存时格式化CSS代码会影响编辑器性能，可为Csscomb配置快捷键，在有需时再格式化CSS代码。Window系统选择ctrl+K+S → 用户 → 右上角第一个图标(打开键盘快捷方式)，Mac系统选择cmd+K+S → 用户 → 右上角第一个图标(打开键盘快捷方式)，在json文件里插入以下配置

```text
[{
    "key": "ctrl+alt+c", // "cmd+alt+c"
    "command": "csscomb.execute"
}]
```

全选代码或选择局部代码，执行`ctrl/cmd+alt+c`，自动格式化代码且自动排列属性，一个字，爽🤔！



## 盒模型



> 盒模型又名框模型，是一种网页设计思维模型，它把文档节点看成一个盒子。

在HTML文档解析过程中，每个节点都会被描述为一个盒模型，然后一个盒子套进另一个盒子中，再依据各个节点对应的CSS规则，最后渲染成一个井井有条的页面。

**组成**

> 盒模型由以下属性组成，由外到内用公式表示就是：`box = margin + border + padding + content`。除了content(不是属性，作为盒模型扩展理解使用)，其余属性都包含left、right、top和bottom等扩展属性。

- `margin`：边距，外部透明区域，负责隔离相邻盒子
- `border`：边框，内部着色区域，负责隔离边距和填充，包含width、style、color三个扩展属性
- `padding`：填充，内部着色区域，负责扩展盒子内部尺寸
- `content`：内容，以文本或节点存在的占用位置

> 重点提醒，padding着色随`background-color`而变，可用`background-clip`隔离，该情况在第10章背景与遮罩中会详细讲解。

节点由外到内一层一层深入，通过上述公式组成了一个完整的盒模型。所以在理解盒模型时记住这4个属性及其从外到内的顺序即可。换另一种方式理解，可把它看做你的快递包裹。两个快递包裹间的距离就是margin，快递包裹的纸皮就是border，打开快递包裹，填充物料就是padding，把填充物料打开看到了你的物品，那就是content。这样理解是不是特别容易呢？

**类型**

由于历史原因，盒模型分化成两种类型，分别是标准盒模型和怪异盒模型。具体原因在第2章浏览器有提及。

> 所以CSS3里提供一个属性用于声明盒模型的类型，它就是box-sizing

- `content-box`：标准盒模型(默认)
- `border-box`：怪异盒模型

> 它不具备继承性，若全局统一盒模型，那只能使用*声明box-sizing了。建议使用[reset.css (opens new window)](https://github.com/JowayYoung/idea-css/blob/master/css/reset.css#L123)里的方式声明。

**标准盒模型**

> 标准盒模型是W3C规范的标准，由`margin + border + padding + content`组成。与上述提到的公式一模一样，节点的`width/height`只包含content，不包含padding和border。

- 节点的尺寸计算公式如下。
  - 横向：`margin-[left/right] + border-[left/right]+ padding-[left/right] + width`
  - 纵向：`margin-[top/bottom] + border-[top/bottom]+ padding-[top/bottom] + height`
- 节点的宽高计算公式如下。
  - 横向：`width = width`
  - 纵向：`height = height`

**怪异盒模型**

> 怪异盒模型又名IE盒子模型，是IExplore制定的标准，由margin + content组成。与上述提到的公式一不同，节点的width/height包含border、padding和content。

- 节点的尺寸计算公式如下
  - 横向：`margin-[left/right] + width`(包含`border-[left/right]`和`padding-[left/right]`)
  - 纵向：`margin-[top/bottom] + height`(包含`border-[top/bottom]`和`padding-[top/bottom]`)
- 节点的宽高计算公式如下
  - 横向：`width = border + padding + width`
  - 纵向：`height = border + padding + height`

> 在IExplore中，若HTML文档缺失`<!doctype html>`声明则会触发怪异盒模型

**两者区别**

> 通过代码演示可能会更清晰，width和height的范围也一目了然，其实两者区别在于width和height包不包含border和padding。把上述公式记清楚，两者区别就迎刃而解了

```text
.content-box {
    box-sizing: content-box;
    margin: 100px;
    padding: 50px;
    border: 10px solid #66f;
    width: 80px;
    height: 80px;
    background-color: #f66;
}
.border-box {
    box-sizing: border-box;
    margin: 100px;
    padding: 50px;
    border: 10px solid #66f;
    width: 80px;
    height: 80px;
    background-color: #f66;
}
```

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/09d57825b3a04c00978c05b55cb6de8e~tplv-k3u1fbpfcp-zoom-1.image)

## 视觉格式化模型



- 上述盒模型都是平时了解到的概念，若使用display对这个简单盒模型稍微加工则会进化到视觉格式化模型
- 视觉格式化模型指在视觉媒体上处理和显示文档而使用的计算规则。它是一种CSS机制，由大量CSS规范组成，规定了节点在页面中的排版。

**块级元素**

- 当节点的display声明为block、list-item、table、flex或grid时，该节点被标记为块级元素。块级元素默认宽度为100%，在垂直方向上按顺序放置，同时参与块格式化上下文。
- 每个块级元素都至少生成一个块级盒，或一个块容器盒，块级盒描述它与兄弟节点间的表现方式，块容器盒描述它与子节点间的表现方式。
- 一个块容器盒只包含其他块级盒，或生成一个行内格式化上下文只包含行内盒。或许一段代码中某一个块容器盒同时包含块级盒和行内盒的情况，但实质上在这种情况下会产生一种新的匿名块盒解决该问题。

**行内元素**

- 当节点的display声明为inline、inline-block、inline-table、inline-flex或inline-grid时，该节点被标记为行内元素。行内元素默认宽度为auto，在水平方向上按顺序放置，同时参与行内格式化上下文。
- 当行内级盒参与行内格式化上下文后就会变成行内盒。另外还有一个叫做匿名行内盒的概念，匿名行内盒与匿名块盒的原理类似，都是浏览器自动生成的补充性盒

上述概念可能有点绕口，若从两者的区别理解可能更容易消化

- 互相转换
  - 块级元素转换行内元素：`display:inline`
  - 行内元素转换块级元素：`display:block`
- 占位表现
  - 块级元素默认独占一行，默认宽度为父元素的100%，可声明边距、填充、宽高
  - 行内元素默认不独占一行(一行可多个)，默认宽度随内容自动撑开，可声明水平边距和填充，不可声明垂直边距和宽高
- 包含关系
  - 块级元素可包含块级元素和行内元素
  - 行内元素可包含行内元素，不能包含块级元素

## 格式化上下文



- 概念内容多次提到了格式化上下文的字眼，那么格式化上下文又是何方神圣呢？了解格式化上下文，或许就能了解上述内容了。
- 格式化上下文指决定渲染区域里节点的排版、关系和相互作用的渲染规则。简单来说就是页面中有一个`<ul>`及其多个子节点`<li>`，格式上下文决定这些`<li>`如何排版，`<li>`与`<li>`间处于什么关系，以及`<li>`与`<li>`间如何互相影响。
- 格式上下文由以下几部分组成，其中最重要的是块格式化上下文和行内格式化上下文，也频繁出现在大厂面试题中，了解其原理与特性，相信面试时被问到也无什么难度了。

| 上下文           | 缩写 | 版本 | 声明         |
| ---------------- | ---- | ---- | ------------ |
| 块格式化上下文   | BFC  | 2    | 块级盒子容器 |
| 行内格式化上下文 | IFC  | 2    | 行内盒子容器 |
| 弹性格式化上下文 | FFC  | 3    | 弹性盒子容器 |
| 格栅格式化上下文 | GFC  | 3    | 格栅盒子容器 |

> 为了防止有些同学对格式化上下文的概念越看越混乱，本章不会过多解说格式化上下文，但是笔者会抽丝剥茧把格式化上下文的概念清晰化，更多的解读可自行查找相关资料深入学习。有时学习点到即止也未尝不是一件好事，过多解读反而达不到想要的效果。

**块格式化上下文**

- BFC是页面上一个独立且隔离的渲染区域，容器里的子节点不会在布局上影响到外面的节点，反之亦然。
- 以下是笔者意译W3C文档和平时一些开发经验的总结所得，也结合一些自身对BFC的理解。

规则

- 子节点在垂直方向上按顺序放置
- 子节点的垂直方向距离由margin决定，相邻节点的margin会发生重叠，以最大margin为合并值
- 每个节点的`margin-left/right`与父节点的左边/右边相接触，即使处于浮动也如此，除非自行形成BFC
- BFC区域不会与同级浮动区域重叠
- BFC是一个隔离且不受外界影响的独立容器
- 计算BFC高度时其浮动子节点也参与计算

成因

- 根节点：`html`
- 非溢出可见节点：`overflow:!visible`
- 浮动节点：`float:left/right`
- 绝对定位节点：`position:absolute/fixed`
- 被定义成块级的非块级节点：`display:inline-block/table-cell/table-caption/flex/inline-flex`
- 父节点与正常文档流的子节点(非浮动)自动形成`BFC`

场景

- 清除浮动
- 已知宽度水平居中
- 防止浮动节点被覆盖
- 防止垂直`margin`合并

> 面试中常问到的margin塌陷问题，可用BFC的概念回答了。所谓的塌陷其实是两个BFC的相邻盒或父子盒相互作用时产生的效果，两个盒子会取相邻边最大margin作为相邻边的共用margin。

- 在此笔者补充一些margin折叠的计算问题，相信在笔试上会遇到
  - 两个盒子相邻边的margin都为正值，取最大值
  - 两个盒子相邻边的margin都为负值，取最小值，两者会互相重合
  - 两个盒子相邻边的margin一正一负，取两者相加值，若结果为负，两者会互相重合

**行内格式化上下文**

> IFC的宽高由行内子元素中最大的实际高度确定，不受垂直方向的margin和padding影响。另外，IFC中不能存在块元素，若插入块元素则会产生对应个数的匿名块并互相隔离，即产生对应个数的IFC，每个IFC对外表现为块级元素，并垂直排列。

以下是笔者意译W3C文档和平时一些开发经验的总结所得，也结合一些自身对IFC的理解。

规则

- 节点在水平方向上按顺序放置
- 节点无法指定宽高，其margin和padding在水平方向有效在垂直方向无效
- 节点在垂直方向上以不同形式对齐
- 节点的宽度由包含块和浮动决定，高度由行高决定

成因

- 行内元素：`display:inline[-x]`
- 声明 `line-height`
- 声明 `vertical-align`
- 声明 `font-size`

**弹性格式化上下文**

声明display为flex或inline-flex时，节点会生成一个FFC的独立容器，主要用于响应式布局。

**格栅格式化上下文**

- 声明`display`为`grid`或`inline-grid`时，节点会生成一个GFC的独立容器，主要用于响应式布局。
- 细心的同学会发现，GFC有点像`<table>`，同为二维表格，但是GFC会有更丰富的属性控制行列、对齐以及更为精细的渲染语义和控制。不过由于兼容性不是特别好，所以笔者也不会讲解基于GFC的格栅布局。

## 文档流



> 文档流指节点在排版布局过程中默认使用从左往右从上往下的流式排列方式。在窗体自上而下分成一行行，且每行按照从左至右的顺序排列节点，其显著特点就是从左往右从上往下。

**类型**

对于一个标准的文档流，可根据其特性对节点分类。

- HTML级别
  - 容器级元素：`<div>`、`<ul>`、`<li>`等
  - 文本级元素：`<a>`、`<p>`、`<span>`等
- CSS级别
  - 块级元素：`<div>`、`<ul>`、`<li>`等
  - 行内元素：`<a>`、`<p>`、`<span>`等

**微观现象**

即使是标准的文档流，也不排除有一些小小的缺陷，笔者罗列三个常见缺陷。

- 空白折叠：HTML中换行编写行内元素，排版会出现5px空隙
- 高矮不齐：行内元素统一以底边垂直对齐
- 自动换行：排版若一行无法完成则换行接着排版

> 空白折叠解决方式

空白折叠也许是最容易出现的文档流微观现象，可能各位同学都会遇过。

```text
<ul>
    <li></li>
    <li></li>
    <li></li>
</ul>
ul {
    text-align: center;
}
li {
    display: inline-block;
}
```

此时，很多浏览器就会出现`5px`空隙，解决方式也有很多种的。

第一种，必须紧密连接节点。

```text
<ul>
    <li></li><li></li><li></li>
</ul>
```

第二种，子节点声明`margin-left:-5px`。

```text
li {
    display: inline-block;
    margin-left: -5px;
}
```

第三种，使用`Flex布局`居中显示。

```text
ul {
    display: flex;
    justify-content: center;
}
```

**脱流文档流**

> 脱流文档流指节点脱流正常文档流后，在正常文档流中的其他节点将忽略该节点并填补其原先空间。文档一旦脱流，计算其父节点高度时不会将其高度纳入，脱流节点不占据空间，因此添加浮动或定位后会对周围节点布局产生或多或少的影响。

- 文档流的脱流有两种方式
  - 浮动布局：`float:left/right`
  - 定位布局：`position:absolute/fixed`

> Float方式

节点使用float脱流时，会让其跳出正常文档流，其他节点会忽略该节点并填补其原先空间。但是该节点文本可不参与这个脱流效果，却会认同该节点所占据的空间并围绕它布局，这个就是常说的文字环绕效果的原理。

一句话概括：`节点参与浮动布局后，自身脱流但其文本不脱流`

> Position方式

节点使用position脱流时(只有absolute和fixed)，会让其及其文本一起跳出正常文档流，其他节点会忽略该节点并填补其原先空间。absolute绝对定位是相对往上遍历第一个包含position:relative的祖先节点定位，若无此节点则相对`<body>`定位；fixed固定定位是相对浏览器窗口定位。

一句话概括：`节点参与定位布局后，自身及其文本一起脱流`

**显隐影响**

> 在正常文档流排版过程中，经常会使用display:none和visibility:hidden控制节点的隐藏，display:none简称DN，visibility:hidden简称VH。上一章有提及DN和VH的区别，这次看看节点切入隐藏状态后，会存在什么差别。

- 节点不可见但占据空间，显隐时可过渡：`visibility:hidden`
- 节点不可见但占据空间，不可点击：`visibility:hidden`
- 节点不可见不占据空间，可访问DOM：`display:none`
- 节点不可见但占据空间，可点击：`opacity:0`
- 节点不可见不占据空间，可点击：`position:absolute; opacity:0`
- 节点不可见但占据空间，不可点击：`position:relative; z-index:-1`
- 节点不可见不占据空间，不可点击：`position:absolute; z-index:-1`

当然这个问题也经常在大厂面试题中出现，结合DN和VH的区别，相信就能完美解答面试官的问题了。

## 层叠上下文



- 层叠上下文指盒模型在三维空间Z轴上所表现的行为。每个盒模型存在于一个三维空间中，分别是平面画布的X轴Y轴和表示层叠的Z轴。
- 通常情况下，节点在页面上沿着X轴和Y轴平铺，很难察觉它们在Z轴上的层叠关系。一旦节点发生堆叠，最终表现就是节点间互相覆盖。若一个节点包含层叠上下文，那么该节点就拥有绝对的制高点，用一个成语贴切表示就是鹤立鸡群，最终表现就是离屏幕观察者更近。

![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/96a7616d4888416ba9dbe6613b300ec9~tplv-k3u1fbpfcp-zoom-1.image)

> 此时想起position和z-index的结合使用可生成层叠上下文，大部分同学可能一直认为z-index只是定义一个节点在三维空间Z轴的层叠顺序，值越高离屏幕观察者就越近。其实这个认识不全面，还需注意以下两点。

- z-index只在声明定位的节点上起效
- 节点在Z轴的层叠顺序依据z-index、层叠上下文和层叠等级共同决定

**层叠等级**

- 层叠等级又名层叠级别，指节点在三维空间Z轴上的上下顺序。在同一层叠上下文中，它描述了层叠上下文节点在Z轴上的上下顺序；在普通节点中，它描述普通节点在Z轴上的上下顺序。
- 普通节点的层叠等级优先由其所在的层叠上下文决定，层叠等级的比较只有在当前层叠上下文中才有意义，脱离当前层叠上下文的比较就变得无意义了。

> 成因

很多同学可能认为只有`position`和`z-index`才能让节点生成一个层叠上下文，其实不仅只有这两个属性，还有一些条件也能让节点生成层叠上下文。

- `<html>`根结点
- 声明`position:relative/absolute`和`z-index`不为`auto`的节点
- 声明`position:fixed/sticky`的节点
- Flex布局下声明`z-index`不为`auto`的节点
- Grid布局下声明`z-index`不为`auto`的节点
- 声明`mask/mask-image/mask-border`不为`none`的节点
- 声明`filter`不为`none`的节点
- 声明`mix-blend-mode`不为`normal`的节点
- 声明`opacity`不为`1`的节点
- 声明`clip-path`不为`none`的节点
- 声明`will-change`不为`initial`的节点
- 声明`perspective`不为`none`的节点
- 声明`transform`不为`none`的节点
- 声明`isolation`为`isolate`的节点
- 声明-webkit-overflow-scrolling`为`touch`的节点

**层叠顺序**

> 层叠顺序指节点发生层叠时按照特定的顺序规则在`Z`轴上垂直显示

脱流元素的层叠顺序

> 在同一个层叠上下文中，节点会按照`z-index`的大小从上到下层叠，若`z-index`一致则后面的节点层叠等级要大于前面。脱流元素的层叠顺序就是看`z-index`的大小

标准流元素的层叠顺序

> 标准流元素的层叠顺序稍微有点难记，笔者也未找到特别的记忆方法，只能死记硬背了。以下是层叠顺序从低到高的排列。

- 层叠上下文的`border`和`background`
- `z-index<0`的子节点
- 标准流内块级非定位的子节点
- 浮动非定位的子节点
- 标准流内行内非定位的子节点
- `z-index:auto/0`的子节点
- `z-index>0`的子节点

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c872c75bea14f3a8d4a7d3c4c87b248~tplv-k3u1fbpfcp-zoom-1.image)



## 样式计算

##  前言



有试过样式覆盖导致排版出问题或布局时不知使用什么长度单位声明属性吗？这些问题应该都是比较常见的问题，笔者有位同事遇到样式覆盖的问题时一言不合使用!important暴力解决，这样真的好吗？

## 优先级别



> 样式覆盖的根本原因是未处理好规则间的优先级别，虽然使用`!important`能解决问题，但是不能什么情况都由`!important`暴力解决

为何样式需优先级别呢？当创建的样式越来越复杂时，一个节点的样式将会受到越来越多的影响，这种影响可能来自周围节点也可能来自自身。通过相关规范分配给规则一个权重，那么样式可按照权重计算，呈现页面最终的效果。

从以下几方面了解优先级别，相信能更好把握优先级别的使用场景。

**特点**

- 使用就近原则
- 继承样式的优先级别最低
- `!important`样式的优先级别最高，若冲突则重新计算

**权重**

直观权重

- `10000`：`!important`
- `1000`：内联样式、外联样式
- `100`：ID选择器
- `10`：类选择器、伪类选择器、属性选择器
- `1`：元素选择器、伪元素选择器
- `0`：通配选择器、后代选择器、兄弟选择器

微观权重

- `1,0,0,0,0`：`!important`
- `0,1,0,0,0`：内联样式、外联样式
- `0,0,1,0,0`：ID选择器
- `0,0,0,1,0`：类选择器、伪类选择器、属性选择器
- `0,0,0,0,1`：元素选择器、伪元素选择器
- `0,0,0,0,0`：通配选择器、后代选择器、兄弟选择器

总体来说，直观权重和微观权重只是表达方式不同，实际意义还是一致的，使用公式可表达成这样。

> ```
> !important` > `内联样式 = 外联样式` > `ID选择器` > `类选择器 = 伪类选择器 = 属性选择器` > `元素选择器 = 伪元素选择器` > `通配选择器 = 后代选择器 = 兄弟选择器
> ```

**计算**

优先级别相同的规则使用最后出现的规则

```text
.input-box {
    color: #f66;
}
:focus {
    color: #66f;
}
[type=text] {
    color: #f90;
}
```

> 虽然类选择器、伪类选择器和属性选择器三者的优先级别相同，但是最后出现的规则其优先级别最高，所以`<input>`最终会显示`#f90`。

优先级别无视节点在DOM树中的距离

```text
html h1 {
    color: #f66;
}
body h1 {
    color: #66f;
}
```

> 虽然`<html>`包含着`<body>`，但是依据就近原则，所以`<h1>`最终会显示`#66f`

不同规则作用于相同节点使用优先级别最高的规则

```text
#bruce {
    color: #f66;
}
[id=bruce] {
    color: #66f;
}
```

> 虽然两者规则都作用于ID为bruce的`<div>`，但是ID选择器的优先级比属性选择器高，所以`<div>`最终会显示#f66。

`:not()`不参与优先级别的计算

> `:not()`在优先级别计算中不会被看成伪类，但是会把`:not()`里的选择器当作普通选择器计数。简单来说就是忽略`:not()`，其他伪类照常参与优先级别计算。

**规则**

- 规则的权值不同时，权值高的规则优先
- 规则的权值相同时，后定义的规则优先
- 属性后面追加`!important`时，规则无条件绝对优先

## 长度单位



粗糙的干活可能只需`px`和`%`两个长度单位即可，随着终端设备分辨率的多样性，CSS衍生出越来越多的长度单位，灵活结合这些长度单位能为页面的布局方案提供更多可能性。

| 单位 | 定义        | 类型     | 描述                                 |
| ---- | ----------- | -------- | ------------------------------------ |
| px   | 像素        | 绝对单位 | -                                    |
| pt   | 点          | 绝对单位 | `1pt = 1/72in`                       |
| pc   | 派          | 绝对单位 | `1pc = 12pt`                         |
| mm   | 毫米        | 绝对单位 | -                                    |
| cm   | 厘米        | 绝对单位 | -                                    |
| in   | 英寸        | 绝对单位 | `1in = 96px = 2.54cm`                |
| %    | 百分比      | 相对单位 | 相对父节点，宽度对应，高度不一定对应 |
| em   | M的宽度     | 相对单位 | 相对当前节点字体                     |
| rem  | M的宽度     | 相对单位 | 相对根结点字体                       |
| ch   | 0的宽度     | 相对单位 | 相对当前节点字体                     |
| ex   | x的宽度     | 相对单位 | 相对当前节点字体                     |
| vw   | 1%视窗宽度  | 相对单位 | 相对视窗                             |
| vh   | 1%视窗高度  | 相对单位 | 相对视窗                             |
| vmin | vw/vh最小者 | 相对单位 | 相对视窗                             |
| vmax | vw/vh最大者 | 相对单位 | 相对视窗                             |

> 这么多单位，到底如何区别呢？首先要明确一点，那就是屏幕分辨率。

- 屏幕分辨率指横纵向上的像素点数，单位是px。屏幕分辨率确定计算机屏幕上能显示多少信息的，以水平和垂直像素衡量。屏幕尺寸一致的情况下，屏幕分辨率越低在屏幕上显示的像素就越少，单个像素尺寸也比较大，屏幕分辨率越高在屏幕上显示的像素越多，单个像素尺寸也比较小。
- 屏幕分辨率就是屏幕上显示的像素个数，分辨率`1920×1080`意味着水平方向含有1920个像素数，垂直方向含有1080个像素数。屏幕尺寸一致的情况下，屏幕分辨率越高，显示效果就越细腻。这也是为何iPhone经常亮瞎眼睛的原因。
- 所以在同一个网页里，以px作为长度单位时，在不同屏幕分辨率下显示的大小是不同的。在低屏幕分辨率下像素比较大，显示的页面元素也偏大偏模糊。实际上，所有单位无论是绝对单位还是相对单位，最终都是转化为px在屏幕上显示。因此在设计和开发过程中都以`px`为准。

**em/rem区别**

> em和rem是移动端布局上常用的长度单位，两者的后缀都一致。rem全称是root em，意思是相对根节点作为参考的长度单位

- `em`：当前节点字体宽度，准确来说是一个`M`的宽度
- `rem`：默认字体宽度，准确来说是一个`M`的宽度

两者区别在于：`em`相对父节点，`rem`相对根节点。`em`以当前节点字体宽度作为参考，rem以根节点`<html>`字体宽度作为参考，默认是`16px`。很多同学错误地以为em是根据父节点作为参考的，实际上是当前节点继承了父节点的属性后产生的错觉

`em`和`rem`都是很灵活且可扩展的长度单位，由浏览器转换为px，具体取决于设计图中的字体大小。

针对移动端，笔者通常会结合JS依据屏幕宽度与设计图宽度的比例动态声明`<html>`的`font-size`，以`rem`为长度单位声明所有节点的几何属性，这样就能做到大部分移动设备的页面兼容，兼容出入比较大的地方再通过媒体查询做特别处理。

```js
function AutoResponse(width = 750) {
    const target = document.documentElement;
    if (target.clientWidth >= 600) {
        target.style.fontSize = "80px";
    } else {
        target.style.fontSize = target.clientWidth / width * 100 + "px";
    }
}

AutoResponse();
```

前提还需在`<html>`中声明以下代码，阻止用户缩放屏幕。

```text
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, minimum-scale=1, maximum-scale=1">
```

**视窗比例单位**

> 在CSS3中增加了与viewport相关的四个长度单位，随着时间推移，目前大部分浏览器对这四个长度单位都有比较好的兼容，这也是未来最建议在伸缩方案中使用的长度单位

- `1vw`表示1%视窗宽度
- `1vh`表示1%视窗高度
- `1vmin`表示1%视窗宽度和1%视窗高度中最小者
- `1vmax`表示1%视窗宽度和1%视窗高度中最大者

> 视窗宽高在JS中分别对应`window.innerWdith`和`window.innerHeight`。若不考虑低版本浏览器的兼容，完全可用一行CSS代码秒杀所有移动端的伸缩方案。

```css
/* 基于UI width=750px DPR=2的页面 */
html {
    font-size: calc(100vw / 7.5);
}
```

> 这是`calc()`的一个神操作，在第7章函数计算会详细讲解`calc()`怎么玩。这行CSS代码就留个给位同学思考，为何这样处理能，细心的同学可能发现这段代码可代替上述那段JS代码。



## 布局方式

## 布局



为了方便记忆，笔者按照属性聚合度将跟布局有关系的属性分类，并划分为以下8种基本布局

- 普通布局：`display:block/inline`
- 浮动布局：`float:left/right`
- 定位布局：`position:relative/absolute/fixed、left/right/top/bottom/z-index`
- 表格布局：`table`系列属性
- 弹性布局：`display:flex/inline-flex`、`flex`系列属性
- 多列布局：`column`系列属性
- 格栅布局：`display:grid/inline-grid`、`grid`系列属性
- 响应式布局：`em/rem/vw/vh/vmin/vmax`、媒体查询

众多跟布局有关的属性，到底要如何结合才能完成想要的布局，具体开发中使用何种属性更为合适，这些都是布局方式中必须得面对的问题。本章也着重从常用的布局技巧说起，怎么样的属性搭配才能玩转网页排版。

在8种基本布局中，笔者还是比较推荐浮动布局、定位布局和弹性布局，熟悉这三种布局基本上能解决大部分网页排版问题。表格布局尽量不要使用，在第3章回流重绘有提及，可能很小的一个改动就会造成整个`<table>`回流；格栅布局其实是一个很不错的布局方式，无奈兼容性不是很好，所以笔者比较少研究，后续兼容性上来了笔者会更新本章格栅布局相关内容

弹性布局是一个好东西，完全掌握后能创造出很多意想不到的事情

**清除浮动**

> 在各种经典布局方式中，可能会结合浮动布局相关属性。在第4章盒模型有提及，使用`float`会使节点脱流导致父节点高度坍塌，若不对父节点显式声明高度则很有必要给父节点清除浮动。定义以下`clearfix`用于清除浮动，给父节点添加即可。值得注意，`clearfix`已占用`::after`，所以使用`clearfix`的父节点就不能再声明`::after`了，可改用`::before`

```text
.clearfix::after {
    display: block;
    visibility: hidden;
    clear: both;
    height: 0;
    font-size: 0;
    content: "";
}
```

笔者就不详细讲解清除浮动的原理和分析了，有兴趣的同学请查看[Clearfix(opens new window)](https://stackoverflow.com/questions/211383/what-methods-of-clearfix-can-i-use)

## 全屏布局



> 经典的全屏布局由顶部、底部、主体三部分组成，其特点为三部分左右满屏拉伸、顶部底部高度固定和主体高度自适应，主要应用在主体布局。该布局很常见，也是大部分Web应用主体的主流布局。通常使用`<header>`、`<footer>`和`<main>`三个标签语义化排版，`<main>`内还可插入`<aside>`作为侧栏。

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d851768f18e47d4ba4d62fc2b27d9c2~tplv-k3u1fbpfcp-zoom-1.image)

```html
<div class="fullscreen-layout">
    <header></header>
    <main></main>
    <footer></footer>
</div>
```

**position + left/right/top/bottom**

- 顶部、底部和主体声明`left:0`和`right:0`将其左右部分满屏拉伸；顶部和底部声明`top:0`和`bottom:0`分别将其吸顶和吸底，并声明俩高度为固定值；将主体的`top`和`bottom`分别声明为顶部高度和底部高度。
- 移动端基本都是以该布局为主，不信打开你常用的App瞧瞧。实现起来比较简单，基于其左右满屏拉伸这个特点下手即可。

```css
.fullscreen-layout {
    position: relative;
    width: 400px;
    height: 400px;
    header,
    footer,
    main {
        position: absolute;
        left: 0;
        right: 0;
    }
    header {
        top: 0;
        height: 50px;
        background-color: #f66;
    }
    footer {
        bottom: 0;
        height: 50px;
        background-color: #66f;
    }
    main {
        top: 50px;
        bottom: 50px;
        background-color: #3c9;
    }
}
```

**flex**

> 使用flex实现会更简洁。`display:flex`默认会令子节点横向排列，需声明flex-direction:column改变子节点排列方向为纵向排列；顶部和底部高度固定，所以主体声明flex:1让高度自适应即可。

```css
.fullscreen-layout {
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 400px;
    header {
        height: 50px;
        background-color: #f66;
    }
    footer {
        height: 50px;
        background-color: #66f;
    }
    main {
        flex: 1;
        background-color: #3c9;
    }
}
```

## 多列布局



**两列布局**

经典的两列布局由左右两列组成，其特点为`一列宽度固定`、`另一列宽度自适应`和`两列高度固定且相等`。以下以左列宽度固定和右列宽度自适应为例，反之同理

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1c9804b4659f4f42ad11463ae49bdb8e~tplv-k3u1fbpfcp-zoom-1.image)

```text
<div class="two-column-layout">
    <div class="left"></div>
    <div class="right"></div>
</div>
```

> float + margin-left/right

左列声明`float:left`和固定宽度，由于float使节点脱流，右列需声明`margin-left`为左列宽度，以保证两列不会重叠。

```text
.two-column-layout {
    width: 400px;
    height: 400px;
    .left {
        float: left;
        width: 100px;
        height: 100%;
        background-color: #f66;
    }
    .right {
        margin-left: 100px;
        height: 100%;
        background-color: #66f;
    }
}
```

> overflow + float

左列声明同上，右列声明`overflow:hidden`使其形成BFC区域与外界隔离，详情可回看第4章盒模型

```text
.two-column-layout {
    width: 400px;
    height: 400px;
    .left {
        float: left;
        width: 100px;
        height: 100%;
        background-color: #f66;
    }
    .right {
        overflow: hidden;
        height: 100%;
        background-color: #66f;
    }
}
```

> flex

使用flex实现会更简洁。左列声明固定宽度，右列声明`flex:1`自适应宽度。

```text
.two-column-layout {
    display: flex;
    width: 400px;
    height: 400px;
    .left {
        width: 100px;
        background-color: #f66;
    }
    .right {
        flex: 1;
        background-color: #66f;
    }
}
```

**三列布局**

经典的三列布局由左中右三列组成，其特点为连续两列宽度固定、剩余一列宽度自适应和三列高度固定且相等。以下以左中列宽度固定和右列宽度自适应为例，反之同理。整体的实现原理与上述两列布局一致，以下就不啰嗦了，直接贴代码。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/abcc731db88b464ca6b91c66fe38b9a2~tplv-k3u1fbpfcp-zoom-1.image)

```html
<div class="three-column-layout">
    <div class="left"></div>
    <div class="center"></div>
    <div class="right"></div>
</div>
```

为了让右列宽度自适应计算，就不使用`float + margin-left`的方式了，若使用`margin-left`还得结合左中列宽度计算。

> overflow + float

```text
.three-column-layout {
    width: 400px;
    height: 400px;
    .left {
        float: left;
        width: 50px;
        height: 100%;
        background-color: #f66;
    }
    .center {
        float: left;
        width: 100px;
        height: 100%;
        background-color: #66f;
    }
    .right {
        overflow: hidden;
        height: 100%;
        background-color: #3c9;
    }
}
```

> flex

使用flex实现会更简洁，还是flex大法好。

```text
.three-column-layout {
    display: flex;
    width: 400px;
    height: 400px;
    .left {
        width: 50px;
        background-color: #f66;
    }
    .center {
        width: 100px;
        background-color: #66f;
    }
    .right {
        flex: 1;
        background-color: #3c9;
    }
}
```

**圣杯布局与双飞翼布局**

> 经典的圣杯布局和双飞翼布局都是由左中右三列组成，其特点为左右两列宽度固定、中间一列宽度自适应和三列高度固定且相等。其实也是上述两列布局和三列布局的变体，整体的实现原理与上述N列布局一致，可能就是一些细节需注意

圣杯布局和双飞翼布局在大体相同下也存在一点不同，区别在于双飞翼布局中间列需插入一个子节点。在常规的实现方式中也是在这个中间列里做文章，如何使中间列内容不被左右列遮挡。

- 相同
  - 中间列放首位且声明其宽高占满父节点
  - 被挤出的左右列使用float和margin负值将其拉回与中间列处在同一水平线上
- 不同
  - 圣杯布局：父节点声明padding为左右列留出空位，将左右列固定在空位上
  - 双飞翼布局：中间列插入子节点并声明margin为左右列让出空位，将左右列固定在空位上

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c83380c01f4040e693bb7a15a8621558~tplv-k3u1fbpfcp-zoom-1.image)

> 圣杯布局float + margin-left/right + padding-left/right

由于浮动节点在位置上不能高于前面或平级的非浮动节点，否则会导致浮动节点下沉。因此在编写HTML结构时，将中间列节点挪到右列节点后面。

```text
<div class="grail-layout">
    <div class="left"></div>
    <div class="right"></div>
    <div class="center"></div>
</div>
.grail-layout {
    padding: 0 100px;
    width: 400px;
    height: 400px;
    .left {
        float: left;
        margin-left: -100px;
        width: 100px;
        height: 100%;
        background-color: #f66;
    }
    .right {
        float: right;
        margin-right: -100px;
        width: 100px;
        height: 100%;
        background-color: #66f;
    }
    .center {
        height: 100%;
        background-color: #3c9;
    }
}
```

> 双飞翼布局float + margin-left/right

HTML结构大体同上，只是在中间里里插入一个子节点`<div>`。根据两者区别，CSS声明会与上述圣杯布局有一点点出入，可观察对比找出不同地方。

```text
<div class="grail-layout">
    <div class="left"></div>
    <div class="right"></div>
    <div class="center">
        <div></div>
    </div>
</div>
.grail-layout {
    width: 400px;
    height: 400px;
    .left {
        float: left;
        width: 100px;
        height: 100%;
        background-color: #f66;
    }
    .right {
        float: right;
        width: 100px;
        height: 100%;
        background-color: #66f;
    }
    .center {
        margin: 0 100px;
        height: 100%;
        background-color: #3c9;
    }
}
```

> 圣杯布局/双飞翼布局flex

使用`flex`实现圣杯布局/双飞翼布局可忽略上述分析，左右两列宽度固定，中间列宽度自适应

```text
<div class="grail-layout">
    <div class="left"></div>
    <div class="center"></div>
    <div class="right"></div>
</div>
.grail-layout {
    display: flex;
    width: 400px;
    height: 400px;
    .left {
        width: 100px;
        background-color: #f66;
    }
    .center {
        flex: 1;
        background-color: #3c9;
    }
    .right {
        width: 100px;
        background-color: #66f;
    }
}
```

**均分布局**

> 经典的均分布局由多列组成，其特点为每列宽度相等和每列高度固定且相等。总体来说，也是最简单的经典布局，由于每列宽度相等，所以很容易找到合适的方式处理。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b63ad7914f4f468092caa6b850eb5234~tplv-k3u1fbpfcp-zoom-1.image)

```text
<div class="average-layout">
    <div class="one"></div>
    <div class="two"></div>
    <div class="three"></div>
    <div class="four"></div>
</div>
.one {
    background-color: #f66;
}
.two {
    background-color: #66f;
}
.three {
    background-color: #f90;
}
.four {
    background-color: #09f;
}
```

> float + width

每列宽度声明为相等的百分比，若有4列则声明`width:25%`。N列就用公式`100 / n`求出最终百分比宽度，记得保留2位小数，懒人还可用`width:calc(100% / n)`自动计算呢

```text
.average-layout {
    width: 400px;
    height: 400px;
    div {
        float: left;
        width: 25%;
        height: 100%;
    }
}
```

> column

使用column实现会令CSS代码语义化更明确。`column`相关属性是为列排版应运而生的，相对flex相关属性来说更易懂易学。

```text
.average-layout {
    column-count: 4;
    column-gap: 0;
    width: 400px;
    height: 400px;
    div {
        height: 100%;
    }
}
```

> flex

使用flex实现会更简洁。节点声明`display:flex`后，生成的FFC容器里所有子节点的高度都相等，因为容器的`align-items`默认为`stretch`，所有子节点将占满整个容器的高度。每列声明`flex:1`自适应宽度。

```text
.average-layout {
    display: flex;
    width: 400px;
    height: 400px;
    div {
        flex: 1;
    }
}
```

## 居中布局



居中布局不管在开发还是面试，都是一个出现率很高频的场景。很多同学可能都会死记硬背，若是根据不同场景使用不同居中布局，那死记硬背也不一定帮得上忙。所以剖析其原理和技巧再自由组合，相信能开发出更多的使用方式，当然死记硬背也不会存在了。

以下是笔者总结的水平居中和垂直居中的实现方式，分开了解水平居中和垂直居中的原理，是玩转居中布局里最重要的一步。

**水平居中**

- `margin:0 auto + width:fit-content：全部元素`

- ```
  块级元素 + margin:0 auto + width：块级元素
  ```

  - 若节点不是块级元素需声明`display:block`
  - 若节点宽度已隐式声明则无需显式声明`width`

- 行内元素 +

   

  ```
  text-aligin:center
  ```

  ：行内元素

  - 父节点上声明`text-align`
  - 若节点不是行内元素需声明`display:inline/inline-block`

- `position + left/right + margin-left/right + width`：全部元素

- `position + left/right + transform:translateX(-50%)`：全部元素

- ```
  display:flex + justify-content:center
  ```

  ：全部元素

  - 父节点上声明`display`和`justify-content`

**垂直居中**

- 块级元素 + padding-top/bottom：

  ```
  块级元素
  ```

  - 父节点高度未声明或自适应
  - 若节点不是块级元素需声明`display:block`

- 行内元素 + line-height：

  ```
  行内元素
  ```

  - 父节点上声明`line-height`
  - 若节点不是行内元素需声明`display:inline/inline-block`

- display:table + display:table-cell + vertical-align:middle：

  ```
  全部元素
  ```

  - 父节点上声明`display:table`

- display:table-cell + vertical-align:middle：

  ```
  全部元素
  ```

  - 父节点上声明`display`和`vertical-align`

- position + top/bottom + margin-top/bottom + height：`全部元素`

- position + top/bottom + transform:translateY(-50%)：`全部元素`

- display:flex + align-items:center：

  ```
  全部元素
  ```

  - 父节点上声明`display`和`align-items`

- display:flex + margin:auto 0：

  ```
  全部元素
  ```

  - 父节点上声明display

> 浏览器会为文本生成一个匿名行内盒，让文本参与IFC，所以可认为文本是行内元素

- 通过结合上述水平居中和垂直居中的实现方式完成一些常见的水平垂直居中布局，未出现的方式可在评论中补充，方便一起学习。注意，上述任何水平居中和垂直居中方式不是随意组合就能生效，这个需详细分析可行性。以下是一些组合成功的水平垂直居中布局。
- 假设节点是块级元素，意味着隐式声明`display:block`，例如以下的`<div></div>`，围绕着该`<div>`实现各种水平垂直居中布局。

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/73256f661d1245c899e68ee8c47bd334~tplv-k3u1fbpfcp-zoom-1.image)

```text
<div class="center-layout">
    <div></div>
</div>
.center-layout {
    width: 400px;
    height: 400px;
    background-color: #f66;
    div {
        width: 100px;
        height: 100px;
        background-color: #66f;
    }
}
```

> display:inline-block

<div>声明display:inline-block将其变成行内块级元素，那么可用text-align和line-height声明水平垂直居中了，但是行内块级元素与匿名行内盒的基线对齐存在很大差异，所以需声明vertical-align:middle将其调整到垂直居中的位置，不过这也是近似垂直居中，父节点最后还需声明font-size:0消除该差异。

```text
.center-layout {
    line-height: 400px;
    text-align: center;
    font-size: 0;
    div {
        display: inline-block;
        vertical-align: middle;
    }
}
```

**display:table-cell**

> 父节点声明`display:table-cell`模拟表格布局的垂直居中；子节点声明`margin:0 auto`使其水平居中。

```text
.center-layout {
    display: table-cell;
    vertical-align: middle;
    div {
        margin: 0 auto;
    }
}
```

**position**

该方式也是最传统最稳定的水平垂直居中布局了，唯二的缺点就是声明属性稍多和必须已知宽高。要点是使用margin负值将节点拉回最中间，所以必须已知宽高才能计算margin负值，通常是`margin-left`和`margin-top`，可连写成`margin:-(height/2) 0 0 -(width/2)`。

```text
.center-layout {
    position: relative;
    div {
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -50px 0 0 -50px;
    }
}
```

自从CSS3的transform普及后，声明`transform:translate(-50%,-50%)`可代替margin负值了，这样就无需声明宽高和计算宽高的二分之一是多少，真正做到自适应水平垂直居中。

但是存在一个缺陷，若节点需额外使用`transform`，那么就比较麻烦了。将额外的transform合并到水平垂直居中的`transform:translate(-50%,-50%)`里，就会存在有一个比较棘手的变换顺序问题，在第12章变换与动画中会详细讲解。解决方式就是在节点外部套上一层`<div>`，把`transform:translate(-50%,-50%)`转嫁到`<div>`上，那么节点就能自由使用`transform`了

```text
.center-layout {
    position: relative;
    div {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
}
```

> flex

目前最强大的方式，不用说，常用flex的各位同学都会知道。

```text
.center-layout {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

当然还有一个隐藏的终极方式，也是史上最简方式。只需声明两个重要属性！

```text
.center-layout {
    display: flex;
    div {
        margin: auto;
    }
}
```

## 文字布局



**文本环绕**

> 利用float使节点脱流的原理实现

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1b9dd2dad564c3a8e85740a7b7e2e40~tplv-k3u1fbpfcp-zoom-1.image)

```text
<div class="text-wrapping">
    <img src="https://static.yangzw.vip/codepen/thor.jpg">
    XXXXX......(很多个X)
</div>
```

```text
.text-wrapping {
    overflow: hidden;
    width: 400px;
    height: 300px;
    font-size: 20px;
    color: #f66;
    word-break: break-all;
    img {
        float: left;
        margin: 10px;
        height: 200px;
    }
}
```

**文字溢出**

嘿嘿，最常用的单行文字溢出和多行问题溢出来啦。

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6bc489b6a5034289a566b2288f7aa5aa~tplv-k3u1fbpfcp-zoom-1.image)

```text
<div class="text-ellipsis">
    <p class="s-line s-ellipsis">玩转CSS的艺术之美...</p>
    <p class="m-line m-ellipsis">玩转CSS的艺术之美...</p>
</div>
```

```text
.text-ellipsis {
    width: 400px;
    p {
        padding: 0 10px;
        line-height: 40px;
        text-align: justify;
        font-size: 20px;
        color: #fff;
        &.s-line {
            background-color: #f66;
        }
        &.m-line {
            background-color: #66f;
        }
    }
}
```

> 单行文字溢出overflow + text-overflow

```text
.s-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
```

> 多行文字溢出flex + overflow + text-overflow

使用旧版弹性布局模拟多行文字溢出，只能在Webkit内核中使用，局限性太大了

- `display:-webkit-box`：将容器作为弹性伸缩盒模型
- `-webkit-box-orient`：弹性伸缩盒模型子节点的排列方式
- `-webkit-line-clamp`：限制容器最多显示多少行文本

```text
.m-ellipsis {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
}
```

> 所以得通过一些兼容性稳定的属性模拟该溢出省略号，当然是使用伪元素`::after`胜任这个工作了。结合max-height和line-height计算最大显示行数，通过定位布局把省略号定位到整段文字的右下角，使用`linear-gradient()`调整渐变背景颜色稍微润色下省略号使其看上去自然一些。

```text
.m-ellipsis {
    overflow: hidden;
    position: relative;
    max-height: 120px;
    line-height: 40px;
    &::after {
        position: absolute;
        right: 0;
        bottom: 0;
        padding-left: 20px;
        background: linear-gradient(to right, transparent, #fff 50%);
        content: "...";
    }
}
```

虽然该方式兼容性比较好，但是单行文字也会出现省略号，只能结合JS额外处理了。



## 函数计算

## 前言



各位同学都知道，CSS只是一门声明式的语言，主要为标记语言HTML服务。很多前端开发者都会鄙视它，不愿意深入学习，更多会抛出一个原因：现在不是有很多UI框架吗，我还编写CSS干嘛！

虽然CSS看上去弱不禁风，常用的也就是一堆静态属性声明而已。然而，这只是完全不了解CSS且还停留在编写属性声明的同学对CSS的理解而已。时至今日，随着前端技术的不断变革，也让曾经被鄙视的CSS变得越来越强大。过去只有声明式的CSS，现在也拥有了具有运算能力的函数。

CSS能做的事情可多了，JS有变量和函数，CSS也有。本章先摸透一些常用的函数，因为函数在后面章节中各种客串出场。

## 函数



> CSS函数指复杂类型或调用特殊处理的组件值类型。为单调的属性声明增加了更强大的点缀，让简单的CSS变得更有艺术感。其语法也很简单，编写形式为`function(params)`，JS里的函数调用一致。在CSS代码中，只要带有`()`的属性值都是函数。

有了函数后，可将一系列相关计算交给浏览器处理，可减少大量人工计算甚至无需人工计算，大大提高了CSS代码的编写效率。

## 分类



笔者敢相信，大部分同学常用到的函数只有`url()`、`rgb()`和`rgba()`，稍微深入一点的也只有`calc()`、`cubic-bezier()`和`linear-gradient()`

其实不然，函数怎么会只有这几个。从W3C文档详情发现总共存在86个可用的函数，一点也不比属性少。按照惯例，笔者又对其进行了合理的记忆分类，以下分类均为笔者使用过的函数，暂未得到浏览器支持且在Caniuse上未收录的函数就不在分类范围内了。

**颜色函数**

- `rgb()`：RGB色彩模式
- `rgba()`：RGBA色彩模式
- `hsl()`：HSL色彩模式
- `hsla()`：HSLA色彩模式
- `color()`：色彩模式，基于当前颜色衍生出其他颜色

**属性函数**

- `attr()`：属性
- `var()`：变量

**数学函数**

- `clamp()`：区间范围值
- `counter()`：计数器
- `counters()`：嵌套计数器
- `calc()`：计算
- `max()`：最大值
- `min()`：最小值

**背景函数**

- `url()`：图像路径
- `element()`：图像映射，渲染指定元素为图像
- `image-set()`：图像集合，根据屏幕分辨率匹配合适图像
- `linear-gradient()`：线性渐变
- `radial-gradient()`：径向渐变
- `conic-gradient()`：锥形渐变
- `repeating-linear-gradient()`：重复线性渐变
- `repeating-radial-gradient()`：重复径向渐变
- `repeating-conic-gradient()`：重复锥形渐变

**滤镜函数**

- `blur()`：模糊
- `brightness()`：亮度
- `contrast()`：对比度
- `drop-shadow()`：阴影
- `grayscale()`：灰度
- `hue-rotate()`：色相旋转
- `invert()`：反相
- `opacity()`：透明度
- `saturate()`：饱和度
- `sepia()`：褐色

**图像函数**

- `circle()`：圆形
- `ellipse()`：椭圆形
- `inset()`：矩形
- `path()`：路径
- `polygon()`：多边行

**变换函数**

- `matrix()`：矩阵
- `matrix3d()`：3D矩阵
- `perspective()`：视距
- `rotate()`：旋转
- `rotate3d()`：3D旋转
- `rotateX()`：X轴旋转
- `rotateY()`：Y轴旋转
- `rotateZ()`：Z轴旋转
- `scale()`：缩放
- `scale3d()`：3D缩放
- `scaleX()`：X轴缩放
- `scaleY()`：Y轴缩放
- `scaleZ()`：Z轴缩放
- `skew()`：扭曲
- `skewX()`：X轴扭曲
- `skewY()`：Y轴扭曲
- `translate()`：位移
- `translate3d()`：3D位移
- `translateX()`：X轴位移
- `translateY()`：Y轴位移
- `translateZ()`：Z轴位移

**缓动函数**

- `cubic-bezier()`：贝塞尔曲线
- `steps()`：逐帧

## 颜色函数



> 颜色函数是最常用的函数，没有之一。颜色函数可用在`border-color`、`outline-color`、`background-color`、`box-shadow`、`color`、`caret-color`等属性上使用。

RGB色彩模式：`rgb()`、`rgba()`

> 例如将文本声明成白色，普通的声明可用`color:white`和`color:#fff`。有了颜色函数后，可用`rgb()`和`rgba()`声明。将原来的声明改成成`color:rgb(255,255,255)`或`rgba(255,255,255,1)`

- `rgb()`里的R表示红色，G表示绿色，B表示蓝色，而`rgba()`多出来的A表示透明度，这个A与`opacity`声明的透明度不同，`rgba()`声明的透明度不会应用到子节点上，而opacity声明的透明度会应用到子节点上。
- 建议在声明普通颜色时使用HEX色彩模式(16进制色彩模式)，若颜色存在透明度的需求，可用`rgba()`。但是`rgba()`的参数不太友好，得把`HEX`转换成`RGB`。由于本小册使用sass作为样式预处理语言，编写rgb()和rgba()时使用HEX代替RGB即可。将原来的声明改成成`color:rgb(#fff)`或`rgba(#fff,1)`
- `HSL`色彩模式：`hsl()`、`hsla()`
- `HSL`色彩模式是一种工业界的色彩标准，因为它能涵盖到人类视觉所能感知的所有颜色，所以在工业界广泛应用。
- `hsl()`和`hsla()`这两个颜色函数与上述两个颜色在`CSS`和`sass`上用法相似。`H`表示色相，`S`表示饱和度，`L`表示亮度，`A`表示透明度。
- 色相又名色盘，指色彩的基本属性。就是常说的颜色名称，例如红色、绿色等，此时应该想起画家那个装满不同颜料的色盘吧。色相的单位是`deg`，值的范围在`0~360deg`间，若超过`360deg`则相当绕N圈再计算剩余的值。0deg和`360deg`为红色，`120deg`为绿色，`240deg`为蓝色。
- 饱和度指色彩的纯度。越高色彩越纯，越低色彩越灰。饱和度的单位是%，值的范围在0~100%间。0%为灰色，100%为全色。
- 亮度指色彩的发光强度。越高色彩越亮，越低色彩越暗。亮度的单位是%，值的范围在0~100%间。0%为最暗，100%为最亮。若你想亮瞎别人的狗眼，把该值调整为100%即可。
- 饱和度和亮度的单位即使是0也得写成0%，否则整个函数都会失效。
- HSL色彩模式其实是一种将RGB色彩模式中的点在圆柱坐标系中标记出来的表示法，该表示法试图做到比基于笛卡尔坐标系的几何结构RGB更直观。

## 属性函数



- ```
  attr()
  ```

  - `attr(val)`用于返回节点属性，通常结合伪元素的`content`使用，是一个很优雅的函数。兼容性好不说了，还极其低调，导致很多同学以为它是一个CSS3特性。。

```text
<h1 class="hello" data-name="玩转CSS的艺术之美"></h1>
h1 {
    &::before {
        content: attr(class);
    }
    &::after {
        content: attr(data-name);
    }
}
```

- `::before`通过`attr()`获取`<h1 class>`的属性值并赋值到`content`上，`::after`通过`attr()`获取`<h1 data-name>`的属性值并赋值到`content`上，最终`<h1>`的`innerText`是`hello`玩转CSS的艺术之美。
- `attr()`可灵活结合选择器返回节点属性并赋值到伪元素的content上，通过`attr()`结合`:hover`和`:empty`抓取节点需显示的内容是一个很不错的技巧。
- 在按钮1触发悬浮状态`:hover`时，通过`attr()`获取节点的data-msg并赋值到`::after`的`content`上
- 当按钮2内容为空`:empty`时，通过`attr()`获取节点的href并赋值到`::after`的`content`上

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/292434cd086043348d3da3cccacb6ce6~tplv-k3u1fbpfcp-zoom-1.image)

```text
<a class="hover-tips btn-1" href="https://www.baidu.com" data-msg="Hello World">提示框</a>
<a class="hover-tips btn-2" href="https://www.baidu.com"></a>
.hover-tips {
    position: relative;
    padding: 0 20px;
    border-radius: 10px;
    height: 40px;
    background-color: #66f;
    line-height: 40px;
    color: #fff;
    & + .hover-tips {
        margin-top: 10px;
    }
    &.btn-1 {
        &::after {
            position: absolute;
            left: 0;
            top: 0;
            border-radius: 5px;
            width: 100%;
            height: 100%;
            background-color: rgba(#000, .5);
            opacity: 0;
            text-align: center;
            font-size: 12px;
            content: attr(data-msg);
            transition: all 300ms;
        }
        &:hover::after {
            left: calc(100% + 20px);
            opacity: 1;
        }
    }
    &.btn-2:empty::after {
        content: attr(href);
    }
}
```

> var()

`var()`用于引用自定义属性，是CSS变量的组成之一，在第8章变量计算会详细讲解`var()`，在此就不再讲解了。

## 数学函数



> ```
> counter()/counters()
> ```

- `counter()`用于返回计数器迭代值，必须结合伪元素的content使用。它以计数器名称作为参数，并作为值传递给content。counters()用于返回嵌套计数器迭代值，情况和`counter()`一致。

- 在使用

  ```
  counter()
  ```

  和

  ```
  counters()
  ```

  时，必须与

  ```
  counter-reset
  ```

  和

  ```
  counter-increment
  ```

  一起使用。 - `

  - `counter-reset`：重置计数器名称与初始值，编写形式为`counter-reset:name val`
  - `counter-increment`：对指定计数器累计其计数值，编写形式为`counter-increment:name`，在使用到的地方声明就会累加

> 对于一些迭代需求通常都会使用HTML模板，例如Vue模板、Pug模板等，所以`counter()`和`counters()`使用场景不多，笔者也很少发掘它的用处。以下就使用`counter()`巧妙搭配完成一个显示权重的迭代计数器。

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f8a2eef220814ebc9655d75de7213d9c~tplv-k3u1fbpfcp-zoom-1.image)

```text
<div class="iterative-counter">
    <ul>
        <li>
            <input id="angular" type="checkbox">
            <label for="angular">Angular</label>
        </li>
        <li>
            <input id="react" type="checkbox">
            <label for="react">React</label>
        </li>
        <li>
            <input id="vue" type="checkbox">
            <label for="vue">Vue</label>
        </li>
    </ul>
    <p class="count" data-unit="个">框架：</p>
    <p class="weight" data-unit="%">权重：</p>
</div>
.iterative-counter {
    ul {
        counter-reset: index 0 count 0 weight 0;
    }
    li {
        display: flex;
        position: relative;
        align-items: center;
        counter-increment: index 1;
        &::before {
            content: counter(index)"、";
        }
        & + li {
            margin-top: 10px;
        }
    }
    input {
        overflow: hidden;
        position: absolute;
        width: 0;
        height: 0;
        opacity: 0;
        &:checked + label::before {
            color: #3c9;
            content: "\2713";
        }
    }
    label {
        display: flex;
        align-items: center;
        height: 20px;
        &::before {
            margin-right: 5px;
            border: 1px solid #3c9;
            width: 20px;
            height: 20px;
            cursor: pointer;
            line-height: 20px;
            text-align: center;
            color: transparent;
            content: "";
            transition: all 300ms;
        }
    }
    p {
        margin-top: 10px;
        &.count::after {
            content: counter(count) attr(data-unit);
        }
        &.weight::after {
            content: counter(weight) attr(data-unit);
        }
    }
}
#angular:checked {
    counter-increment: count 1 weight 20;
}
#react:checked {
    counter-increment: count 1 weight 50;
}
#vue:checked {
    counter-increment: count 1 weight 30;
}
```

> calc()

> `calc(exp)`用于动态计算单位，数值、长度、角度、时间和百分比都能作为参数。由于执行数学表达式后返回运算后的计算值，所以可减少大量人工计算甚至无需人工计算，是笔者认为最有用的函数，没有之一。

`calc()`饥不择食，所有计量单位都能作为参数参加整个动态计算。

- 数值：整数、浮点数
- 长度：`px`、`em`、`rem`、`vw`、`vh`等(详情可回看第5章样式计算)
- 角度：`deg`、`turn`
- 时间：`s`、`ms`
- 百分比：`%`

> `calc()`虽然好用，但是新手难免会遇到一些坑，谨记以下特点，相信就能玩转`calc()`了

- 四则运算：只能使用`+`、`-`、`*`、`/`作为运算符号
- 运算顺序：遵循加减乘除运算顺序，可用`()`提升运算等级
- 符号连接：每个运算符号必须使用空格间隔起来
- 混合计算：可混合不同计量单位动态计算

第三点尤为重要，若未能遵守，浏览器直接忽略该属性。

> 还记得第5章样式计算的一行CSS代码让页面自适应吗？`font-size:calc(100vw / 7.5)`，其实就是根据设计图与浏览器视窗的比例动态计算`<html>`的`font-size：100/750 = x/100vw`。

在SPA里有遇过因为有滚动条或没滚动条而导致页面路由在跳转过程中发生向左或向右的抖动吗？这让强迫症患者很不舒服，此时可用`calc()`巧妙解决该问题。

```text
.elem {
    padding-right: calc(100vw - 100%);
}
```

- `100vw`是视窗宽度，`100%`内容宽度，那么`100vw - 100%`就是滚动条宽度了，声明`padding-right`用于保留滚动条出现的位置，这样滚动条出不出现都不会让页面抖动了。
- 上述两个示例都是很常用的场景，`calc()`需结合变量才好玩，后续章节都会有`calc()`乱入，各位同学记得注意喔。

> clamp()/max()/min()

`clamp()/max()/min()`都和`calc()`类似，所有计量单位都能作为参数参加整个动态计算。这三个函数和`calc()`可互相嵌套使用的。

```text
.elem {
    width: calc(min(1200px, 100%) / 5);
}
```

> `max(...val)`用于返回最大值，`min(...val)`用于返回最小值，支持一个或多个值或数学表达式。虽然`max()`名称是最大值，但实质上是用来限制最大值的；`min()`名称是最小值，但实质上是用来限制最小值的。

在响应式开发中，通常会声明内容宽度`100%`自适应且最大值不超过`1200px`。

```text
.elem {
    width: 100%;
    max-width: 1200px;
}
```

若用`min()`表示，只需一行声明即可。

```text
.elem {
    width: min(1200px, 100%);
}
```

- `clamp(min, val, max)`用于返回区间范围值。val在`min~max`间则返回val，val小于min则返回min，val大于max则返回max，妥妥的响应式函数样子。
- `clamp(min, val, max)`等价于`max(min, min(val, max))`。`clamp()`可用于响应式开发中，很好地履行了响应式的义务，让组件属性在特定条件下使用特定的值。

```text
.elem {
    width: clamp(100px, 25vw, 300px);
}
```

> 节点宽度声明在100~300px间，节点随着视窗宽度变化而变化。若视窗宽度大于300px则节点宽度一直保持300px，若视窗宽度在100~300px间则节点宽度为25vw转化后的px值，若视窗宽度小于100px则节点宽度一直保持100px。

## 图形函数



> `clip-path`用于创建一个只有节点的部分区域可显示的剪切区域。裁剪完成后，内部区域显示，外部区域隐藏。一般应用在SVG上，但是也可当作裁剪效果用在节点上。当节点使用`clip-path`声明裁剪路径时，可用这5个图形函数裁剪区域了，除了`path()`其他4个函数的兼容性还行。

以下使用`circle()`、`ellipse()`和`polygon()`描绘一些常见的图像。

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/734080acde84497f80ac2cb5d29b0970~tplv-k3u1fbpfcp-zoom-1.image)

```text
<ul class="figure-box" style="--count: 12">
    <li class="star" style="--index: 0"></li>
    <li class="ellipse" style="--index: 1"></li>
    <li class="circle" style="--index: 2"></li>
    <li class="triangle" style="--index: 3"></li>
    <li class="rhombus" style="--index: 4"></li>
    <li class="trapezoid" style="--index: 5"></li>
    <li class="parallelogram" style="--index: 6"></li>
    <li class="pentagon" style="--index: 7"></li>
    <li class="left-arrow" style="--index: 8"></li>
    <li class="right-arrow" style="--index: 9"></li>
    <li class="close" style="--index: 10"></li>
    <li class="message" style="--index: 11"></li>
</ul>
.figure-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 720px;
    li {
        --Θ: calc(var(--index) / var(--count) * 1turn);
        margin: 10px;
        width: 100px;
        height: 100px;
        background-color: #3c9;
        filter: hue-rotate(var(--Θ));
        &.star {
            clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
        }
        &.ellipse {
            clip-path: ellipse(40% 50% at 50% 50%);
        }
        &.circle {
            clip-path: circle(50% at 50% 50%);
        }
        &.triangle {
            clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        &.rhombus {
            clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
        }
        &.trapezoid {
            clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
        }
        &.parallelogram {
            clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);
        }
        &.pentagon {
            clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
        }
        &.left-arrow {
            clip-path: polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%);
        }
        &.right-arrow {
            clip-path: polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%);
        }
        &.close {
            clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);
        }
        &.message {
            clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%);
        }
    }
}
```

整体来说很简单，在特定坐标上标记连线的点即可。推荐一个裁剪路径的网站Clippy，轻松绘制出各种由线条组成的裁剪区域。`clip-path`有一个明显的限制，就是只能裁剪折线形成的图形，不能裁剪曲线形成的图形。

## 其他函数



由于后续章节的每一章都单独挂钩背景函数、滤镜函数、变换函数和缓动函数，所以本节就不再讲解这四个函数了。后续章节都会对这些函数进行一些详细的讲解。



## 变量计算

## 变量



> CSS变量又名CSS自定义属性，指可在整个文档中重复使用的值。它由自定义属性`--var`和函数`var()`组成，`var()`用于引用自定义属性。谈到为何会在CSS中使用变量，以下上个示例，估计一看就会明白。

```text
/* 不使用变量 */
.title {
    background-color: red;
}
.desc {
    background-color: red;
}

/* 使用变量 */
:root {
    --bg-color: red;
}
.title {
    background-color: var(--bg-color);
}
.desc {
    background-color: var(--bg-color);
}
```

- 看完可能会觉得使用变量的代码会多了一点，但是有无想到突然某天万恶的策划小哥哥和设计小姐姐说要做一个换肤功能。按照平时思路，估计有些同学就会按照默认颜色主题增加一份对照的新颜色主题样式文件。这样每次增加需求都同时维护几套颜色主题多麻烦啊。
- 此时变量就派上用场了，提前跟设计小姐姐规范好各种需变换的颜色并使用变量定义，通过JS批量操作这些定义好的变量即可。这也是变换颜色主题的一种解决方案，好处在于只需维护一套CSS代码，第13章实战大操作-切换控件会使用纯CSS实现暗黑模式换肤。

```text
["red", "blue", "green"].forEach(v => {
    const btn = document.getElementById(`${v}-theme-btn`);
    btn.addEventListener("click", () => document.body.style.setProperty("--bg-color", v));
});
```

**CSS使用变量有如下好处**。

- 减少样式代码的重复性
- 增加样式代码的扩展性
- 提高样式代码的灵活性
- 增多一种CSS与JS的通讯方式
- 不用深层遍历DOM改变某个样式

可能有些同学会问，sass和less早就实现了变量该特性，何必再多此一举呢？可是细想一下，变量对比Sass变量和Less变量又有它的过人之处。

- 浏览器原生特性，无需经过任何转译可直接运行
- DOM对象一员，极大便利了CSS与JS间的联系

## 认识



> 本来打算用一半篇幅讲述变量的规范和用法，但是网上一搜一大把就感觉没必要了，贴上阮一峰老师发表的教程[《CSS变量教程》 (opens new window)](http://www.ruanyifeng.com/blog/2017/05/css-variables.html)。同时笔者也对变量的细节作一个整理，方便记忆。

- 声明：`--变量名`
- 读取：`var(--变量名, 默认值)`
- 类型
  - 普通：只能用作属性值不能用作属性名
  - 字符：与字符串拼接 `"Hello, "var(--name)`
  - 数值：使用`calc()`与数值单位连用 `var(--width) * 10px`
- 作用域
  - 范围：在当前节点块作用域及其子节点块作用域下有效
  - 优先级别：`内联样式 = 外联样式` > `ID选择器` > `类选择器 = 伪类选择器 = 属性选择器` > `元素选择器 = 伪元素选择器` > `通配选择器 = 后代选择器 = 兄弟选择器`

接下来使用几个特别的场景展示变量的魅力。还是那句话，一样东西有使用的场景，那自然就会有它的价值，那么用的人也会越来越多。

## 场景



其实变量有一个特别好用的场景，那就是结合List集合使用。若不明白这是什么，请继续往下看。

**条形加载条**

一个条形加载条通常由几条线条组成，每条线条对应一个存在不同时延的相同动画，通过时间差运行相同的动画，从而产生加载效果。估计大部分的同学可能会把CSS代码编写成以下这样。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f1fb111c99a4bb28348b34fe309dc30~tplv-k3u1fbpfcp-zoom-1.image)

```text
<ul class="strip-loading">
    <li v-for="v in 6" :key="v"></li>
</ul>
.strip-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    li {
        border-radius: 3px;
        width: 6px;
        height: 30px;
        background-color: #f66;
        animation: beat 1s ease-in-out infinite;
        & + li {
            margin-left: 5px;
        }
        &:nth-child(2) {
            animation-delay: 200ms;
        }
        &:nth-child(3) {
            animation-delay: 400ms;
        }
        &:nth-child(4) {
            animation-delay: 600ms;
        }
        &:nth-child(5) {
            animation-delay: 800ms;
        }
        &:nth-child(6) {
            animation-delay: 1s;
        }
    }
}
@keyframes beat {
    0%,
    100% {
        transform: scaleY(1);
    }
    50% {
        transform: scaleY(.5);
    }
}
```

- 分析代码发现，每个`<li>`只是存在`animation-delay`不同，而其余代码则完全相同，换成其他类似的List集合，那岂不是有10个`<li>`就写10个`:nth-child(n)`。
- 显然这种方法不灵活也不容易封装成组件，若能像JS那样封装成一个函数，并根据参数输出不同样式效果，那就更棒了。说到这里，很明显就是为了铺垫变量的开发技巧了。
- 对于HTML部分的修改，让每个`<li>`拥有一个自己作用域下的变量。对于CSS部分的修改，就需分析哪些属性是随着index递增而发生规律变化的，对规律变化的部分使用变量表达式代替即可。

```text
<ul class="strip-loading">
    <li v-for="v in 6" :key="v" :style="`--line-index: ${v}`"></li>
</ul>
.strip-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    li {
        --time: calc(var(--line-index) * 200ms);
        border-radius: 3px;
        width: 6px;
        height: 30px;
        background-color: #f66;
        animation: beat 1.5s ease-in-out var(--time) infinite;
        & + li {
            margin-left: 5px;
        }
    }
}
@keyframes beat {
    0%,
    100% {
        transform: scaleY(1);
    }
    50% {
        transform: scaleY(.5);
    }
}
```

- 代码中的变量`--line-index`和`--time`使每个`<li>`拥有一个属于自己的作用域。例如第二个`<li>`，`--line-index`的值为`2`，`--time`的计算值为`200ms`，换成第三个`<li>`后这两个值又会不同了。
- 这就是变量的作用范围所致(在当前节点块作用域及其子节点块作用域下有效)，因此在`.strip-loading`的块作用域下调用`--line-index`是无效的

```text
/* flex属性无效 */
.strip-loading {
    display: flex;
    align-items: center;
    flex: var(--line-index);
}
```

> 通过妙用变量，也把CSS代码从41行缩减到27行，对于那些含有List集合越多的场景，效果就越明显。而且这样处理也更美观更容易维护，某天说加载效果的时间差不明显，直接将`calc((var(--line-index) - 1) * 200ms)`里的`200ms`调整成`400ms`即可，就无需修改每个`:nth-child(n)`了。

**心形加载条**

![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc65407352084bf9a3be59324c6dfa69~tplv-k3u1fbpfcp-zoom-1.image)

通过动图分析，发现每条线条的背景颜色和动画时延不同，另外动画运行时的高度也不同。细心的你可能还会发现，第一条和第九条的高度一致，第二条和第八条的高度一致，依次类推，得到高度变换相同类的公式：对称`index = 总数 + 1 - index`。

背景颜色使用了滤镜的色相旋转`hue-rotate()`，目的是为了使颜色过渡得更自然；动画时延与上述条形加载条一致。以下就用变量根据看到的动图实现一番。

```text
<div class="heart-loading">
    <ul style="--line-count: 9">
        <li v-for="v in 9" :key="v" :class="`line-${v}`" :style="`--line-index: ${v}`"></li>
    </ul>
</div>
.heart-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    ul {
        display: flex;
        justify-content: space-between;
        width: 150px;
        height: 10px;
    }
    li {
        --Θ: calc(var(--line-index) / var(--line-count) * .5turn);
        --time: calc((var(--line-index) - 1) * 40ms);
        border-radius: 5px;
        width: 10px;
        height: 10px;
        background-color: #3c9;
        filter: hue-rotate(var(--Θ));
        animation-duration: 1s;
        animation-delay: var(--time);
        animation-iteration-count: infinite;
        &.line-1,
        &.line-9 {
            animation-name: beat-1;
        }
        &.line-2,
        &.line-8 {
            animation-name: beat-2;
        }
        &.line-3,
        &.line-7 {
            animation-name: beat-3;
        }
        &.line-4,
        &.line-6 {
            animation-name: beat-4;
        }
        &.line-5 {
            animation-name: beat-5;
        }
    }
}
@keyframes beat-1 {
    0%,
    10%,
    90%,
    100% {
        height: 10px;
    }
    45%,
    55% {
        height: 30px;
        transform: translate3d(0, -15px, 0);
    }
}
@keyframes beat-2 {
    0%,
    10%,
    90%,
    100% {
        height: 10px;
    }
    45%,
    55% {
        height: 60px;
        transform: translate3d(0, -30px, 0);
    }
}
@keyframes beat-3 {
    0%,
    10%,
    90%,
    100% {
        height: 10px;
    }
    45%,
    55% {
        height: 80px;
        transform: translate3d(0, -40px, 0);
    }
}
@keyframes beat-4 {
    0%,
    10%,
    90%,
    100% {
        height: 10px;
    }
    45%,
    55% {
        height: 90px;
        transform: translate3d(0, -30px, 0);
    }
}
@keyframes beat-5 {
    0%,
    10%,
    90%,
    100% {
        height: 10px;
    }
    45%,
    55% {
        height: 90px;
        transform: translate3d(0, -20px, 0);
    }
}
```

一波操作后就有了以下效果。与陈大鱼头兄的心形加载条对比一下，颜色、波动曲线和跳动频率有点不同，在暖色调的蔓延和肾上腺素的飙升下，这是一种心动的感觉。

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/505a02a34ce24059a60fdca1f690ce4a~tplv-k3u1fbpfcp-zoom-1.image)

**标签导航**

上述通过两个加载条演示了变量在CSS中的运用以及一些妙用技巧，现在通过标签导航演示变量在JS中的运用。

- JS中有3个操作变量的API，看上去简单易记。
  - 读取变量：`elem.style.getPropertyValue()`
  - 设置变量：`elem.style.setProperty()`
  - 删除变量：`elem.style.removeProperty()`

先上效果图，效果中主要是使用变量标记每个Tab的背景颜色和切换Tab的显示状态。

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9db1d4ed6dc0426e8bdb43f3255f2f5d~tplv-k3u1fbpfcp-zoom-1.image)

```text
<div class="tab-navbar">
    <nav>
        <a v-for="(v, i) in list" :key="v" :class="{ active: index === i }" @click="select(i)">标题{{i + 1}}</a>
    </nav>
    <div>
        <ul ref="tabs" :style="`--tab-count: ${list.length}`">
            <li v-for="(v, i) in list" :key="v" :style="`--bg-color: ${v}`">内容{{i + 1}}</li>
        </ul>
    </div>
</div>
.tab-navbar {
    display: flex;
    overflow: hidden;
    flex-direction: column-reverse;
    border-radius: 10px;
    width: 300px;
    height: 400px;
    nav {
        display: flex;
        height: 40px;
        background-color: #f0f0f0;
        line-height: 40px;
        text-align: center;
        a {
            flex: 1;
            cursor: pointer;
            transition: all 300ms;
            &.active {
                background-color: #3c9;
                color: #fff;
            }
        }
    }
    div {
        flex: 1;
        ul {
            --tab-index: 0;
            --tab-width: calc(var(--tab-count) * 100%);
            --tab-move: calc(var(--tab-index) / var(--tab-count) * -100%);
            display: flex;
            flex-wrap: nowrap;
            width: var(--tab-width);
            height: 100%;
            transform: translate3d(var(--tab-move), 0, 0);
            transition: all 300ms;
        }
        li {
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;
            background-color: var(--bg-color);
            font-weight: bold;
            font-size: 20px;
            color: #fff;
        }
    }
}
export default {
    data() {
        return {
            index: 0,
            list: ["#f66", "#66f", "#f90", "#09f"]
        };
    },
    methods: {
        select(i) {
            this.index = i;
            this.$refs.tabs.style.setProperty("--tab-index", i);
        }
    }
};
```

- 在`<ul>`上定义`--tab-index`表示Tab当前的索引，当点击按钮时重置`--tab-index`的值，可实现不操作DOM移动`<ul>`的位置显示指定的Tab。不操作DOM而可移动`<ul>`是因为定义了`--tab-move`，通过`calc()`计算`--tab-index`与`--tab-move`的关系，从而操控`transform:translate3d()`移动`<ul>`。
- 另外在`<li>`上定义`--bg-color`表示Tab的背景颜色，也是一种比较简洁的模板赋值方式，总比写`<li :style="backgroundColor:${color}">`要好看。若多个属性依赖一个变量赋值，那么使用变量赋值到`style`上就更方便了，那些属性可在css文件里计算与赋值，这样可帮助JS分担一些属性计算工作。

**悬浮跟踪按钮**

- 通过几个示例实践了变量在CSS和JS上的运用，相信各位同学已经掌握了其用法和技巧。曾经在某个网站看过一个比较酷炫的鼠标悬浮效果，好像也是使用变量实现的。笔者凭着记忆也使用变量实现一番。
- 其实思路也比较简单，先对按钮布局和着色，然后使用伪元素标记鼠标的位置，定义`--x`和`--y`表示伪元素在按钮里的坐标，通过JS获取鼠标在按钮上的offsetX和`offsetY`分别赋值给`--x`和`--y`，再对伪元素添加径向渐变的背景颜色，大功告成，一个酷炫的鼠标悬浮跟踪效果就这样诞生了。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa1b7826e47847779c5e27cf66300988~tplv-k3u1fbpfcp-zoom-1.image)

```text
<a class="track-btn" @mousemove="move">
    <span>妙用CSS变量，让你的CSS变得更心动</span>
</a>
.track-btn {
    overflow: hidden;
    position: relative;
    border-radius: 25px;
    width: 400px;
    height: 50px;
    background-color: #66f;
    cursor: pointer;
    line-height: 50px;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    color: #fff;
    span {
        position: relative;
        pointer-events: none;
    }
    &::before {
        --size: 0;
        position: absolute;
        left: var(--x);
        top: var(--y);
        width: var(--size);
        height: var(--size);
        background-image: radial-gradient(circle closest-side, #09f, transparent);
        content: "";
        transform: translate3d(-50%, -50%, 0);
        transition: width 200ms ease, height 200ms ease;
    }
    &:hover::before {
        --size: 400px;
    }
}
export default {
    name: "track-btn",
    methods: {
        move(e) {
            const x = e.pageX - e.target.offsetLeft;
            const y = e.pageY - e.target.offsetTop;
            e.target.style.setProperty("--x", `${x}px`);
            e.target.style.setProperty("--y", `${y}px`);
        }
    }
};
```

> 其实可结合鼠标事件完成更多的酷炫效果，例如动画关联和事件响应等操作。没有做不到只有想不到，尽情发挥你的想象力啦。

**悬浮视差按钮**

曾经在CodePen上还看到一个挺不错的示例，一个[悬浮视差按钮 (opens new window)](https://t.co/qE0woiNip8)，具体代码涉及到一些3D变换的知识。看完源码后，按照其思路自己也实现一番，顺便对代码稍加改良

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97730d7098d94c7e94d48c1428f3d208~tplv-k3u1fbpfcp-zoom-1.image)

- [在线演示：Here(opens new window)](https://codepen.io/JowayYoung/pen/RwPdQEz)

## 兼容



对于现代浏览器来说，变量的兼容性其实还是蛮好的，所以可放心使用。毕竟现在都是各大浏览器厂商快速迭代的时刻，产品对于用户体验来说是占了很大比重，因此在条件允许的情况下还是大胆尝新，不要被一些过去的所谓的规范所约束着。

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f9916f2d0881488c9503113437e3e40f~tplv-k3u1fbpfcp-zoom-1.image)

- 试问现在还有多少人愿意去维护IExplorer兼容性，若一个产品的用户体验受限于远古浏览器的压制(可能政务网站和金融网站除外吧)，相信该产品也不会走得很远。
- 在完成一个产品的过程中，不仅仅是为了完成工作任务，若在保证进度的同时能花点心思点缀一下，可能会有意外的收获。用心写好每一段代码，才是享受写代码的真谛。



## 选择器

## 分类



在讲解选择器的奇妙用处前，还是先把选择器分类记忆吧。没错，笔者就是喜欢总结。由于选择器的标准概念上无作出明确的分类，以下的分类是为了方便记忆而整理的。

**基础选择器**

| 选择器   | 别名       | 说明           | 版本 |
| -------- | ---------- | -------------- | ---- |
| `tag`    | 标签选择器 | 指定类型的标签 | 1    |
| `#id`    | ID选择器   | 指定身份的标签 | 1    |
| `.class` | 类选择器   | 指定类名的标签 | 1    |
| `*`      | 通配选择器 | 所有类型的标签 | 2    |

**层次选择器**

| 选择器        | 别名           | 说明               | 版本 |
| ------------- | -------------- | ------------------ | ---- |
| `elemP elemC` | 后代选择器     | 元素的后代元素     | 1    |
| `elemP>elemC` | 子代选择器     | 元素的子代元素     | 2    |
| `elem1+elem2` | 相邻同胞选择器 | 元素相邻的同胞元素 | 2    |
| `elem1~elem2` | 通用同胞选择器 | 元素后面的同胞元素 | 3    |

**集合选择器**

| 选择器        | 别名       | 说明           | 版本 |
| ------------- | ---------- | -------------- | ---- |
| `elem1,elem2` | 并集选择器 | 多个指定的元素 | 1    |
| `elem.class`  | 交集选择器 | 指定类名的元素 | 1    |

**条件选择器**

| 选择器        | 说明                                 | 版本 |
| ------------- | ------------------------------------ | ---- |
| `:lang`       | 指定标记语言的元素                   | 2    |
| `:dir()`      | 指定编写方向的元素                   | 4    |
| `:has`        | 包含指定元素的元素                   | 4    |
| `:is`         | 指定条件的元素                       | 4    |
| `:not`        | 非指定条件的元素                     | 4    |
| `:where`      | 指定条件的元素                       | 4    |
| `:scope`      | 指定元素作为参考点                   | 4    |
| `:any-link`   | 所有包含href的链接元素               | 4    |
| `:local-link` | 所有包含href且属于绝对地址的链接元素 | 4    |

**行为选择器**

| 选择器        | 说明           | 版本 |
| ------------- | -------------- | ---- |
| `:active`     | 鼠标激活的元素 | 1    |
| `:hover`      | 鼠标悬浮的元素 | 1    |
| `::selection` | 鼠标选中的元素 | 3    |

**状态选择器**

| 选择器               | 说明                           | 版本 |
| -------------------- | ------------------------------ | ---- |
| `:target`            | 当前锚点的元素                 | 3    |
| `:link`              | 未访问的链接元素               | 1    |
| `:visited`           | 已访问的链接元素               | 1    |
| `:focus`             | 输入聚焦的表单元素             | 2    |
| `:required`          | 输入必填的表单元素             | 3    |
| `:valid`             | 输入合法的表单元素             | 3    |
| `:invalid`           | 输入非法的表单元素             | 3    |
| `:in-range`          | 输入范围以内的表单元素         | 3    |
| `:out-of-range`      | 输入范围以外的表单元素         | 3    |
| `:checked`           | 选项选中的表单元素             | 3    |
| `:optional`          | 选项可选的表单元素             | 3    |
| `:enabled`           | 事件启用的表单元素             | 3    |
| `:disabled`          | 事件禁用的表单元素             | 3    |
| `:read-only`         | 只读的表单元素                 | 3    |
| `:read-write`        | 可读可写的表单元素             | 3    |
| `:target-within`     | 内部锚点元素处于激活状态的元素 | 4    |
| `:focus-within`      | 内部表单元素处于聚焦状态的元素 | 4    |
| `:focus-visible`     | 输入聚焦的表单元素             | 4    |
| `:blank`             | 输入为空的表单元素             | 4    |
| `:user-invalid`      | 输入合法的表单元素             | 4    |
| `:indeterminate`     | 选项未定的表单元素             | 4    |
| `:placeholder-shown` | 占位显示的表单元素             | 4    |
| `:current()`         | 浏览中的元素                   | 4    |
| `:past()`            | 已浏览的元素                   | 4    |
| `:future()`          | 未浏览的元素                   | 4    |
| `:playing`           | 开始播放的媒体元素             | 4    |
| `:paused`            | 暂停播放的媒体元素             | 4    |

**结构选择器**

| 选择器                 | 说明                     | 版本 |
| ---------------------- | ------------------------ | ---- |
| `:root`                | 文档的根元素             | 3    |
| `:empty`               | 无子元素的元素           | 3    |
| `:first-letter`        | 元素的首字母             | 1    |
| `:first-line`          | 元素的首行               | 1    |
| `:nth-child(n)`        | 元素中指定顺序索引的元素 | 3    |
| `:nth-last-child(n)`   | 元素中指定逆序索引的元素 | 3    |
| `:first-child`         | 元素中为首的元素         | 2    |
| `:last-child`          | 元素中为尾的元素         | 3    |
| `:only-child`          | 父元素仅有该元素的元素   | 3    |
| `:nth-of-type(n)`      | 标签中指定顺序索引的标签 | 3    |
| `:nth-last-of-type(n)` | 标签中指定逆序索引的标签 | 3    |
| `:first-of-type`       | 标签中为首的标签         | 3    |
| `:last-of-type`        | 标签中为尾标签           | 3    |
| `:only-of-type`        | 父元素仅有该标签的标签   | 3    |

**属性选择器**

| 选择器        | 说明                                         | 版本 |
| ------------- | -------------------------------------------- | ---- |
| `[attr]`      | 指定属性的元素                               | 2    |
| `[attr=val]`  | 属性等于指定值的元素                         | 2    |
| `[attr*=val]` | 属性包含指定值的元素                         | 3    |
| `[attr^=val]` | 属性以指定值开头的元素                       | 3    |
| `[attr$=val]` | 属性以指定值结尾的元素                       | 3    |
| `[attr~=val]` | 属性包含指定值(完整单词)的元素(不推荐使用)   | 2    |
| `[attr|=val]` | 属性以指定值(完整单词)开头的元素(不推荐使用) | 2    |

**伪元素**

| 选择器     | 说明               | 版本 |
| ---------- | ------------------ | ---- |
| `::before` | 在元素前插入的内容 | 2    |
| `::after`  | 在元素后插入的内容 | 2    |

## 优势



话说选择器若无用处，那W3C还干嘛把它纳入到标准里呢？选择器的劣势就不啰嗦了，使用不当可能会引起解析性能问题，这个对于现代浏览器来说几乎可忽略，除非你还是IExplorer的忠实粉丝。使用选择器有什么好处呢？笔者给各位同学总结一下。

- 对于那些结构与行为分离的写法，使用sass/less编写属性时结构会更清晰易读
- 减少很多无用或少用的类，保持css文件的整洁性和观赏性，代码也是一门艺术
- 减少修改类而有可能导致样式失效的问题，有时修改类但无确保HTML中和CSS中的一致而导致样式失效
- 减少无实质性使用的类，例如很多层嵌套的标签，这些标签可能只使用到一个CSS属性，就没必要建个类关联
- 使用选择器可实现一些看似只能由JS才能实现的效果，既可减少代码量也可减少JS对DOM的操作，使得交互效果更流畅

## 场景



由于选择器太多，笔者选择几个最具代表性的耍耍，通过选择器的妙用实现一些看似只能由JS才能实现的效果。未提到的选择器可能在其他地方穿插着讲解，请各位同学放心学习。

**+和~**

- `+/~`都是作用于当前节点后的同胞节点，但是两者有一个明显的区别，+是针对紧随该节点的节点，而~是针对后面所有的节点，包括紧随该节点的节点。`~`还可针对一些特定类和选择器的节点，所以其使用性更广泛。
- 另外，`+/~`通常都会结合`:checked`完成一些高难度的纯CSS效果，当`<input>`触发了`:checked`选中状态后可通过`+/~`带动后面指定的节点声明一些特别属性。

通常其CSS代码形式如下。

```text
input:checked + div {}
input:checked ~ div {}
```

> `+/~`的用途很广，静态效果和动态效果都能用上它，是两个很关键的选择器。以下通过动静结合的方式展示`+/~`的用途。

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4bc4620c743f45f6a858ec5d2a533fb6~tplv-k3u1fbpfcp-zoom-1.image)

```text
<div class="specify-selector">
    <ul class="list">
        <li>同胞元素</li>
        <li class="next">当前元素</li>
        <li>同胞元素</li>
        <li>同胞元素</li>
        <li>同胞元素</li>
    </ul>
    <ul class="list">
        <li>同胞元素</li>
        <li class="next-all">当前元素</li>
        <li>同胞元素</li>
        <li>同胞元素</li>
        <li>同胞元素</li>
    </ul>
    <ul class="list">
        <li>同胞元素</li>
        <li class="next-filter">当前元素</li>
        <li>同胞元素</li>
        <li class="filter">同胞元素</li>
        <li>同胞元素</li>
    </ul>
</div>
<div class="specify-selector">
    <div class="button">
        <input id="btn1" type="radio" name="btns" hidden>
        <label for="btn1">点击我切换样式</label>
    </div>
    <div class="button">
        <input id="btn2" type="radio" name="btns" hidden>
        <label for="btn2">点击我切换样式</label>
    </div>
    <div class="button">
        <input id="btn3" type="radio" name="btns" hidden>
        <label for="btn3">点击我切换样式</label>
    </div>
</div>
.specify-selector {
    display: flex;
    & + .specify-selector {
        margin-top: 20px;
    }
    .list {
        border: 1px solid #f66;
        width: 200px;
        line-height: 2;
        font-weight: bold;
        font-size: 20px;
        color: #f66;
        & + .list {
            margin-left: 20px;
        }
        li {
            padding: 0 10px;
        }
        .next {
            background-color: #66f;
            color: #fff;
            & + li {
                background-color: #f90;
                color: #fff;
            }
        }
        .next-all {
            background-color: #66f;
            color: #fff;
            & ~ li {
                background-color: #09f;
                color: #fff;
            }
        }
        .next-filter {
            background-color: #66f;
            color: #fff;
            & ~ .filter {
                background-color: #09f;
                color: #fff;
            }
        }
    }
    .button {
        & + .button {
            margin-left: 20px;
        }
        label {
            display: block;
            padding: 0 10px;
            height: 40px;
            background-color: #3c9;
            cursor: pointer;
            line-height: 40px;
            font-size: 16px;
            color: #fff;
            transition: all 300ms;
        }
        input:checked + label {
            padding: 0 20px;
            border-radius: 20px;
            background-color: #f66;
        }
    }
}
```

**:hover**

- `:hover`作用于鼠标悬浮的节点，是一个很好用的选择器。在特定场景可代替`mouseenter`和`mouseleave`两个鼠标事件，加上`transtion`让节点的动画更丝滑。

结合`attr()`有一个很好用的场景，就是鼠标悬浮在某个节点上显示提示浮层，提示浮层里包含着该动作的文本。

- 给节点标记一个用户属性`data-*`
- 当鼠标悬浮在该节点上触发`:hover`
- 通过`attr()`获取`data-*`的内容
- 将`data-*`的内容赋值到伪元素的`content`上

![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9bc56c233d86483a9375d98bb7ce06a5~tplv-k3u1fbpfcp-zoom-1.image)

```html
<ul class="hover-tips">
    <li data-name="姨妈红"></li>
    <li data-name="基佬紫"></li>
    <li data-name="箩底橙"></li>
    <li data-name="姣婆蓝"></li>
    <li data-name="大粪青"></li>
    <li data-name="原谅绿"></li>
</ul>
$color-list: #f66 #66f #f90 #09f #9c3 #3c9;
.hover-tips {
    display: flex;
    justify-content: space-between;
    width: 200px;
    li {
        position: relative;
        padding: 2px;
        border: 2px solid transparent;
        border-radius: 100%;
        width: 24px;
        height: 24px;
        background-clip: content-box;
        cursor: pointer;
        transition: all 300ms;
        &::before,
        &::after {
            position: absolute;
            left: 50%;
            bottom: 100%;
            opacity: 0;
            transform: translate3d(0, -30px, 0);
            transition: all 300ms;
        }
        &::before {
            margin: 0 0 12px -35px;
            border-radius: 5px;
            width: 70px;
            height: 30px;
            background-color: rgba(#000, .5);
            line-height: 30px;
            text-align: center;
            color: #fff;
            content: attr(data-name);
        }
        &::after {
            margin-left: -6px;
            border: 6px solid transparent;
            border-top-color: rgba(#000, .5);
            width: 0;
            height: 0;
            content: "";
        }
        @each $color in $color-list {
            $index: index($color-list, $color);
            &:nth-child(#{$index}) {
                background-color: $color;
                &:hover {
                    border-color: $color;
                }
            }
        }
        &:hover {
            &::before,
            &::after {
                opacity: 1;
                transform: translate3d(0, 0, 0);
            }
        }
    }
}
```

**:valid和:invalid**

很多同学可能还会使用JS去判断表单输入内容是否合法，其实HTML5发布后，可用纯CSS完成这些工作，正确搭配一些属性能大大减少校验表单的代码量。

完成一个完整的表单验证，需以下HTML属性和选择器搭配。

- `placeholder`：占位，在未输入内容时显示提示文本
- `pattern`：正则，在输入内容时触发正则验证
- `:valid`：作用于输入合法的表单节点
- `:invalid`：作用于输入非法的表单节点

```html
<input type="text" placeholder="" pattern="">
input:valid {}
input:invalid {}
```

> 这个`pattern`与JS正则有点不同，JS的正则形式是`/regexp/`，而`pattern`的正则形式只需`/regexp/`里的`regexp`。这个校验过程是动态触发的，监听了input这个键盘事件，当输入内容合法时触发`:valid`，当输入内容非法时触发:`invalid`。

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd3a6ba13a7949d09fac31fbff875e57~tplv-k3u1fbpfcp-zoom-1.image)

```text
<form class="form-validation">
    <div>
        <label>名字</label>
        <input type="text" placeholder="请输入你的名字(1到10个中文)" pattern="^[\u4e00-\u9fa5]{1,10}$" required>
    </div>
    <div>
        <label>手机</label>
        <input type="text" placeholder="请输入你的手机" pattern="^1[3456789]\d{9}$" required>
    </div>
    <div>
        <label>简介</label>
        <textarea required></textarea>
    </div>
</form>
.form-validation {
    width: 500px;
    div + div {
        margin-top: 10px;
    }
    label {
        display: block;
        padding-bottom: 5px;
        font-weight: bold;
        font-size: 16px;
    }
    input,
    textarea {
        display: block;
        padding: 0 20px;
        border: 1px solid #ccc;
        width: 100%;
        height: 40px;
        outline: none;
        caret-color: #09f;
        transition: all 300ms;
        &:valid {
            border-color: #3c9;
        }
        &:invalid {
            border-color: #f66;
        }
    }
    textarea {
        height: 122px;
        resize: none;
        line-height: 30px;
        font-size: 16px;
    }
}
```

**:checked**

> `:checked`作用于选项选中的表单节点，当`<input>`的type设置成radio和`checkbox`时可用。在CSS神操作骚技巧中是一个很重要的技巧，主要是用于模拟鼠标点击事件

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a835669acd744637b7ef4808cce0dade~tplv-k3u1fbpfcp-zoom-1.image)

```text
<input class="ios-switch" type="checkbox">
.btn {
    border-radius: 31px;
    width: 102px;
    height: 62px;
    background-color: #e9e9eb;
}
.ios-switch {
    position: relative;
    appearance: none;
    cursor: pointer;
    transition: all 100ms;
    @extend .btn;
    &::before {
        position: absolute;
        content: "";
        transition: all 300ms cubic-bezier(.45, 1, .4, 1);
        @extend .btn;
    }
    &::after {
        position: absolute;
        left: 4px;
        top: 4px;
        border-radius: 27px;
        width: 54px;
        height: 54px;
        background-color: #fff;
        box-shadow: 1px 1px 5px rgba(#000, .3);
        content: "";
        transition: all 300ms cubic-bezier(.4, .4, .25, 1.35);
    }
    &:checked {
        background-color: #5eb662;
        &::before {
            transform: scale(0);
        }
        &::after {
            transform: translateX(40px);
        }
    }
}
```

> `<input>`与`<label>`的巧妙搭配

上述有提到与`+/~`的搭配使用，在此还有一个很重要的技巧，就是结合`<label>`使用。为何要结合`<label>`呢？因为要让`input:checked + div {}`或`input:checked ~ div {}`起效，其HTML结构必须像以下那样。

```text
<input type="radio">
<div></div>
```

> 这样就无法分离结构与行为了，导致CSS必须跟着HTML走，只能使用绝对定位将`input>`固定到指定位置。使用`<label>`绑定`<input>`，可将`<input>`的鼠标选择事件转移到`<label>`上，由`<label>`控制选中状态。那么HTML结构可改为以下那样，此时的`<input>`可设置`hidden`隐藏起来，不参与任何排版。

```text
<input type="radio" id="btn" hidden>
<div>
    <label for="btn">
</div>
```

> `<input>`使用id与`<label>`使用`for`关联起来，而`hidden`使`<input>`隐藏起来，不占用页面任何位置，此时`<label>`放置在页面任何位置都行。

```text
input:checked + div {}
input:checked ~ div {}
```

笔者使用纯CSS实现的标签导航是一个很好的学习用例，在第8章变量计算有提及。

![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/087c742904e848509be19cc49931ca1c~tplv-k3u1fbpfcp-zoom-1.image)

**:focus-within**

- `:focus-within`作用于内部表单节点处于聚焦状态的节点。它监听当前节点里是否有表单节点，且该表单节点是否处于聚焦状态。
- 有些同学听上去可能觉得拗口，其实它是一个简单易用的属性。表单控件触发`focus`和`blur`两个鼠标事件后往祖先节点冒泡，在祖先节点上通过`:focus-within`捕获该冒泡事件声明样式

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ef03c079cb841939b20c789ecd6a7d8~tplv-k3u1fbpfcp-zoom-1.image)

```html
<form class="bubble-distribution">
    <h3>注册</h3>
    <div class="accout">
        <input type="text" placeholder="请输入手机或邮箱" pattern="^1[3456789]\d{9}$|^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$" required>
        <img src="https://b-gold-cdn.xitu.io/v3/static/img/greeting.1415c1c.png">
    </div>
    <div class="password">
        <input type="password" placeholder="请输入密码(6到20位字符)" pattern="^[\dA-Za-z_]{6,20}$" required>
        <img src="https://b-gold-cdn.xitu.io/v3/static/img/blindfold.58ce423.png">
    </div>
    <div class="code">
        <input type="text" placeholder="请输入邀请码(6位数字)" pattern="^[\d]{6}$" maxLength="6" required>
        <button type="button">查询</button>
        <img src="https://b-gold-cdn.xitu.io/v3/static/img/greeting.1415c1c.png">
    </div>
    <img src="https://b-gold-cdn.xitu.io/v3/static/img/normal.0447fe9.png">
    <ul>
        <li>
            <input id="male" type="radio" name="sex">
            <label for="male">Boy</label>
        </li>
        <li>
            <input id="female" type="radio" name="sex">
            <label for="female">Girl</label>
        </li>
    </ul>
    <button type="button">注册</button>
</form>
.bubble-distribution {
    position: relative;
    margin-top: 50px;
    padding: 25px;
    border-radius: 2px;
    width: 320px;
    background-color: #fff;
    h3 {
        font-size: 16px;
        color: #333;
    }
    div {
        margin-top: 10px;
    }
    img {
        position: absolute;
        left: 50%;
        bottom: 100%;
        margin: 0 0 -20px -60px;
        width: 120px;
    }
    ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        height: 30px;
        line-height: 30px;
    }
    li {
        position: relative;
        width: 45%;
        transition: all 300ms;
        &:focus-within {
            background: linear-gradient(90deg, #09f 50%, transparent 0) repeat-x,
                linear-gradient(90deg, #09f 50%, transparent 0) repeat-x,
                linear-gradient(0deg, #09f 50%, transparent 0) repeat-y,
                linear-gradient(0deg, #09f 50%, transparent 0) repeat-y;
            background-position: 0 0, 0 100%, 0 0, 100% 0;
            background-size: 8px 1px, 8px 1px, 1px 8px, 1px 8px;
            animation: move 500ms infinite linear;
        }
    }
    input[type=text],
    input[type=password] {
        padding: 10px;
        border: 1px solid #e9e9e9;
        border-radius: 2px;
        width: 100%;
        height: 40px;
        outline: none;
        transition: all 300ms;
        &:focus:valid {
            border-color: #09f;
        }
        &:focus:invalid {
            border-color: #f66;
        }
    }
    input[type=radio] {
        position: absolute;
        width: 0;
        height: 0;
        &:checked + label {
            border: 3px solid transparent;
            background-color: #09f;
            color: #fff;
        }
    }
    label {
        display: block;
        border-bottom: 1px solid #ccc;
        width: 100%;
        background-clip: padding-box;
        cursor: pointer;
        text-align: center;
        transition: all 300ms;
    }
    button {
        overflow: hidden;
        margin-top: 10px;
        border: none;
        border-radius: 2px;
        width: 100%;
        height: 40px;
        outline: none;
        background-color: #09f;
        cursor: pointer;
        color: #fff;
        transition: all 300ms;
    }
    .accout,
    .password,
    .code {
        img {
            display: none;
            margin-bottom: -27px;
        }
        &:focus-within {
            img {
                display: block;
            }
            & ~ img {
                display: none;
            }
        }
    }
    .code {
        display: flex;
        justify-content: space-between;
        button {
            margin-top: 0;
        }
        input {
            &:not(:placeholder-shown) {
                width: 70%;
                & + button {
                    width: 25%;
                }
            }
            &:placeholder-shown {
                width: 100%;
                & + button {
                    width: 0;
                    opacity: 0;
                }
            }
        }
    }
}
@keyframes move {
    to {
        background-position: 6% 0, -6% 100%, 0 -6%, 100% 6%;
    }
}
```

**:empty**

> 还有使用JS判断列表集合为空时显示占位符吗？相信很多使用MVVM框架开发的同学都会使用条件判断的方式渲染虚拟DOM，若列表长度不为0则渲染列表，否则渲染占位符。然而CSS提供了一个空判断的选择器`:empty`，这应该很少同学会注意到。

`:empty`作用于无子节点的节点，这个子节点也包括行内匿名盒(单独的文本内容)，匿名盒在第4章盒模型有提及。以下三种情况均为非空状态，若不出现这三种状态则为空状态，此时`:empty`才会触发。

- 仅存在节点：`<div><p>CSS</p></div>`
- 仅存在文本：`<div>CSS</div>`
- 同时存在节点和文本：`<div>Hello <p>CSS</p></div>`

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/783eb7e9b5c84722af155515f4ae2e78~tplv-k3u1fbpfcp-zoom-1.image)

```html
<ul class="empty-list">
    <li v-for="v in 10" :key="v">Data {{v}}</li>
</ul>
<ul class="empty-list"></ul>
$empty: "https://yangzw.vip/img/empty.svg";
.empty-list {
    overflow: auto;
    width: 200px;
    height: 150px;
    outline: 1px solid #3c9;
    &:empty {
        display: flex;
        justify-content: center;
        align-items: center;
        background: url($empty) no-repeat center/100px auto;
        &::after {
            margin-top: 90px;
            font-weight: bold;
            content: "没钱就没数据";
        }
    }
    & + .empty-list {
        margin-left: 20px;
    }
    li {
        padding: 0 10px;
        height: 30px;
        background-color: #09f;
        line-height: 30px;
        color: #fff;
        &:nth-child(even) {
            background-color: #f90;
        }
    }
}
```

**::before和::after**

- 有时为了实现某个效果而往页面里反复添加标签变得很繁琐，添加太多标签反而不好处理而变得难以维护。此时会引入伪元素这个概念解决上述问题。
- 伪元素指页面里不存在的元素。伪元素在HTML代码里未声明，却能正常显示，在页面渲染时看到这些本来不存在的元素发挥着重要作用。`:before`和`:after`是两个很重要的伪元素，早在CSS2就出现了。

> 起初伪元素的前缀使用单冒号语法。随着CSS改革，伪元素的前缀被修改成双冒号语法，`:before/:after`从此变成`::before/::after`，用来区分伪类。若兼容低版本浏览器，还需使用`:before`和`:after`，但是本小册均以`::before/::after`编写CSS代码。

**伪元素和伪类虽然都是选择器，但是它们还是存在一丝丝的差别**。

- 伪元素通常是一些实体选择器，选择满足指定条件的DOM，例如`::selection`、`:nth-child(n)`和`:first-child`
- 伪类通常是一些状态选择器，选择处于特定状态的DOM，例如:`hover`、`:focus`和`:checked`
- `::before/::after`必须结合`content`使用，通常用作修饰节点，为节点- 插入一些多余的东西，但又不想内嵌一些其他标签。若插入2个以下(包含`2`个)的修饰，建议使用`::before/::after`。

以下两个HTML结构是等效的

```html
<p>
    <span>:before</span>
    CSS
    <span>:after</span>
</p>
<p>CSS</p>
// 接上一个HTML结构
p {
    &::before {
        content: ":before";
    }
    &::after {
        content: ":after";
    }
}
```

> `::before/::after`最常用的场景就是气泡对话框，圆滚滚的身子带上一个三角形的尾巴。像以下第二个挖空的气泡对话框，其实使用白色填充背景颜色，而小尾巴使用白色的`::after`叠加橙色的`::before`形成障眼法。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/20ee69a794ea449e83ab8f9720e25a41~tplv-k3u1fbpfcp-zoom-1.image)

```text
<div class="bubble-box">iCSS</div>
<div class="bubble-empty-box">iCSS</div>
.bubble-box {
    position: relative;
    border-radius: 5px;
    width: 200px;
    height: 50px;
    background-color: #f90;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    &::after {
        position: absolute;
        left: 100%;
        top: 50%;
        margin-top: -5px;
        border: 5px solid transparent;
        border-left-color: #f90;
        content: "";
    }
}
.bubble-empty-box {
    position: relative;
    margin-top: 10px;
    border: 2px solid #f90;
    border-radius: 5px;
    width: 200px;
    height: 50px;
    line-height: 46px;
    text-align: center;
    font-size: 20px;
    color: #f90;
    &::before {
        position: absolute;
        left: 100%;
        top: 50%;
        margin: -5px 0 0 2px;
        border: 5px solid transparent;
        border-left-color: #f90;
        content: "";
    }
    &::after {
        position: absolute;
        left: 100%;
        top: 50%;
        margin-top: -4px;
        border: 4px solid transparent;
        border-left-color: #fff;
        content: "";
    }
}
```



## 背景与遮罩

> background是使用最多的属性之一，mask是使用最少的属性之一。为何要拿background和mask一起说呢？因为它们的格式和用法大部分相似，作用效果也相似，是少有的兄弟属性。另外，margin和padding也是一对常见的兄弟属性，何时使用margin何时使用padding，这个就自行探讨了

## 属性连写



> background是一个大家庭，包含着众多子属性，这些子属性可拆开声明也可合并声明。拆开与合并也是看个人编码习惯，无特别的标准说一定要怎样处理。合并声明有一个标准称呼，叫做属性连写。

`background`包含以下子属性，而mask子属性也大部分与`background`一致。

- `background-color`：背景颜色
- `background-image`：背景图像
- `background-repeat`：背景图像平铺方式
- `background-attachment`：背景图像依附方式
- `background-position`：背景图像起始位置
- `background-size`：背景图像尺寸模式
- `background-origin`：定位区域
- `background-clip`：绘制区域
- `background-blend-mode`：混合模式

> 除了`background`，以下属性也包含众多子属性，它们单独声明也能代替单个子属性声明。例如`padding-top:10px`等价于`padding:10px 0 0 0`

- `margin`
- `padding`
- `border`
- `outline`
- `mask`
- `font`
- `transition`
- `animation`

最常使用的background，有些同学喜欢简写，有些同学喜欢连写。建议只声明一个子属性时使用简写，声明两个或以上子属性时使用连写。这样是为了规范代码，增加代码的可读性。

```text
/* 简写 */
.elem {
    background-color: #f66;
    background-image: url("./img.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100px 100px;
}
/* 连写 */
.elem {
    background: #f66 url("./img.png") no-repeat center/100px 100px;
}
```

细心的同学可能发现`position`和`size`在连写时使用`/`衔接起来了。

刚开始的`background`只有`color`、`image`、`repeat`、`attachment`和`position`这五个子属性，CSS3发布后增加了`size`、`origin`和`clip`这三个子属性，而`position`和`size`都能使用长度单位作为值，连写时就无法区分两者的位置了，所以使用/将两者衔接起来。

通用格式是`position/size`，若声明`background:#f66 100px 100px，100px 100px`对应是`position`，而`size`不会被声明。

属性连写的好处是比单个子属性声明要简洁得多，可少写很多代码。而background子属性众多，到底如何安排子属性连写顺序也是一个难题。刚好CSS2推荐了一条子属性连写顺序规则。

```text
background: color image repeat attachment position/size
```

- `origin`和`clip`不能加入到属性连写中，因为其取值都是一致的，有些浏览器无法区分它们的取值。
- 若某些值缺省则往前补充即可。background子属性连写顺序并无强制标准，若不喜欢上述规范，也可自行制定。以下涉及到mask子属性连写顺序与background子属性连写顺序一致，就不再啰嗦了

## 背景



> `background`子属性众多，其属性取值也很多。

- background-color：颜色
  - `transparent`：透明(默认)
  - `Keyword`：颜色关键字
  - `HEX`：十六进制色彩模式
  - `RGB`或`RGBA`：RGB/A色彩模式
  - `HSL`或`HSLA`：HSL/A色彩模式
  - `Color1/Color2`：覆盖颜色，背景颜色可能是`Color1`，若背景图像无效则使用`Color2`代替`Color1`
- background-image：图像
  - `none`：无图像(默认)
  - `url()`：图像路径
- background-repeat：图像平铺方式
  - `repeat`：图像在水平方向和垂直方向重复(默认)
  - `repeat-x`：图像在水平方向重复
  - `repeat-y`：图像在垂直方向重复
  - `no-repeat`：图像仅重复一次
  - `space`：图像以相同间距平铺且填充整个节点
  - `round`：图像自动缩放直到适应且填充整个节点
- background-attachment：图像依附方式
  - `scroll`：图像随页面滚动而移动(默认)
  - `fixed`：图像不会随页面滚动而移动
- background-position：图像起始位置
  - `Position`：位置，可用任何长度单位，第二个位置(Y轴)不声明默认是50%(默认0% 0%)
  - `Keyword`：位置关键字`left`、`right`、`top`、`bottom`、`center`，可单双使用，第二个关键字不声明默认是`center`
- background-size：图像尺寸模式
  - `auto`：自动设置尺寸(默认)
  - `cover`：图像扩展至足够大，使其完全覆盖整个区域，图像某些部分也许无法显示在区域中
  - `contain`：图像扩展至最大尺寸，使其宽度和高度完全适应整个区域
  - `Size`：尺寸，可用任何长度单位，第二个尺寸(高)不声明默认是`auto`
- background-origin：定位区域(与background-position结合使用)
  - `padding-box`：图像相对填充定位(默认)
  - `border-box`：图像相对边框定位
  - `content-box`：图像相对内容定位
- background-clip：绘制区域
  - `border-box`：图像被裁剪到边框与边距的交界处(默认)
  - `padding-box`：图像被裁剪到填充与边框的的交界处
  - `content-box`：图像被裁剪到内容与填充的交界处
- background-blend-mode：混合模式
  - `normal`：正常(默认)
  - `color-burn`：颜色加深
  - `color-dodge`：颜色减淡
  - `color`：颜色
  - `darken`：变暗
  - `difference`：差值
  - `exclusion`：排除
  - `hard-light`：强光
  - `hue`：色相
  - `lighten`：变亮
  - `luminosity`：亮度
  - `multiply`：正片叠底
  - `overlay`：叠加
  - `saturation`：饱和度
  - `screen`：滤色
  - `soft-light`：柔光

> 总体来说，`background`简单易用，以下三点可能需加注意。

- `repeat`和`position`包含后缀为`-x`和`-y`这两个子属性，若单独声明使用x或y即可
- `position`的`x`和`y`允许负值，当赋值x时正值向右负值向左，当赋值y时正值向下负值向上
- `background`声明多个图像路径时，若不声明`position`，那么首个图像定位在节点最顶部，剩余图像依次顺序显示 对于兼容性比较低的浏览器，`size`不能在`background`中连写，需单独编写

**贴顶背景**

这个需求可能是使用background最多的场景，没有之一。需求的定位很简单，就是背景图像贴着最顶部且水平居中显示，不管屏幕怎么拉伸都始终保持在最顶部最中间

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ed44641801694db1a3468840c885369f~tplv-k3u1fbpfcp-zoom-1.image)

```css
$bg: "https://static.yangzw.vip/codepen/mountain.jpg";
.pasted-bg {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    background: #000 url($bg) no-repeat center top/auto 300px;
    text-shadow: 2px 2px 5px rgba(#000, .5);
    font-weight: bold;
    font-size: 50px;
    color: #fff;
}
```

> 该需求通常都会定死高度，声明`background-size:auto 300px`让背景图像高度跟节点高度一致但宽度自适应，千万别写死100%，这样在浏览器窗口变化过程中就会让背景图像变形了。声明`background-position:center top`是为了让背景图像水平居中且贴着最顶部，无论浏览器窗口怎样变化都始终保持这个定位。

**多重背景**

CSS3的background不仅仅增加了size、origin和clip这三个子属性，还增加了多重背景这个强大功能。多重背景可从上到下从左到右拼接背景图像，也可叠加背景图像。

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ac4e8c000ef49228f84b4fa58a7cee6~tplv-k3u1fbpfcp-zoom-1.image)

```text
$bg-1: "https://static.yangzw.vip/codepen/ab-1.jpg";
$bg-2: "https://static.yangzw.vip/codepen/ab-2.jpg";
$bg-3: "https://static.yangzw.vip/codepen/mountain.jpg";
$bg-4: "https://static.yangzw.vip/codepen/logo.svg";
.spliced-bg {
    width: 300px;
    height: 200px;
    background-color: #3c9;
    background-image: url($bg-1), url($bg-2);
    background-repeat: no-repeat, no-repeat;
    background-position: left, right;
    background-size: auto 200px, auto 200px;
}
.overlying-bg {
    margin-left: 20px;
    width: 300px;
    height: 200px;
    background-image: url($bg-4), url($bg-3);
    background-repeat: repeat, no-repeat;
    background-position: left, center;
    background-size: auto 80px, auto 200px;
}
```

声明顺序靠前的背景图像的层叠等级比较高，叠加背景图像时，靠前的背景图像尽量使用png格式才能让靠后的背景图像显示，否则可能遮挡靠后的背景图像

**镂空文本**

> `background-clip`是一个很巧妙的属性，除了专有的三个取值，在Webkit内核中还可裁剪到文本与内容的交界处，也就是说背景只作用于文本中。

有了`background-clip:text`，再结合`text-shadow`描绘文本阴影，让文字变得更立体更动感。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0169de2fcf140dfb5c1d0e9cc98a5e9~tplv-k3u1fbpfcp-zoom-1.image)

```css
$bg: "https://static.yangzw.vip/codepen/mountain.jpg";
.hollow-text {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    background: #000 url($bg) no-repeat center top/auto 300px;
    background-clip: text;
    text-shadow: 2px 2px 5px rgba(#000, .5);
    font-weight: bold;
    font-size: 80px;
    color: transparent;
}
```

## 渐变



渐变一直以来在页面中都是一种常见的视觉元素。设计师都是通过图形软件设计这些渐变效果，然后以图像的形式被前端开发者运用到页面中。

> 渐变指两种或多种颜色在特定区域内平滑过渡的效果。曾经渲染带有渐变的背景只能使用图像实现。如今CSS3增加了以下几个渐变函数，让代码渲染渐变成为了可能

- `linear-gradient()`：线性渐变
- `radial-gradient()`：径向渐变
- `conic-gradient()`：锥形渐变
- `repeating-linear-gradient()`：重复线性渐变
- `repeating-radial-gradient()`：重复径向渐变
- `repeating-conic-gradient()`：重复锥形渐变

> 重点讲解`linear-gradient()`、`radial-gradient()`和`conic-gradient()`，`repeating-*`也是在原有函数的基础上延伸，就不再啰嗦了。

**CSS渐变分为三种，每一种都有自身的特点**。

- 线性渐变：沿着指定方向从起点到终点逐渐改变颜色，渐变形状是一条直线
- 径向渐变：沿着任意方向从圆心往外面逐渐改变颜色，渐变形状是一个圆形或椭圆形
- 锥形渐变：沿着顺时针方向从圆心往外面逐渐改变颜色，渐变形状是一个圆锥体
- 每个渐变函数都必须在`background`或`background-image`上使用，可认为`gradient()`就是一个图像，只不过是通过函数产生的图像。

**线性渐变**

> 线性渐变是三种渐变效果里最简单的一种，以直线的方式向指定方向扩散，使用频率很高，是渐变函数里最好用的一个函数。掌握它几乎能应付大部分需求，其使用语法如下

```text
background-image: linear-gradient(direction, color-stop)
```

- Direction：方向
  - `Keyword`：方向关键字`to left/right/top/bottom/top left/top right/bottom left/bottom right`(默认`to bottom`)
  - `Angle`：角度，以顺时针方向的垂直线和渐变线的夹角计算，超出N圈则计算剩余角度
- ColorStop：色标
  - `Color`：颜色，可参考`background-color`取值，在指定位置产生渐变效果所使用的颜色
  - `Position`：位置，可参考`background-position`的`Position`取值，在指定位置产生渐变效果

![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f6aba72ceef0489ea457cf65775e06c9~tplv-k3u1fbpfcp-zoom-1.image)

```css
.elem {
    width: 400px;
    height: 200px;
    background-image: linear-gradient(to bottom, #f66, #66f);
    /* 等价于 */
    background-image: linear-gradient(to bottom, #f66 0, #66f 100%);
}
```

> `color-stop()`在指定位置使用指定颜色，可用多个色标，其连写方式如下。第一个值为`Color`，第二个值为`Position`，编写形式为`#f66 30%`，若第二个值不声明则浏览器会自动分配位置。

```text
.elem {
    background-image: linear-gradient(to bottom, #f66 0, #66f 20%, #f90, 40%, #09f 60%, #9c3 80%, #3c9 100%);
}
```

很多同学对线性渐变的方向搞不清，若`Direction`缺省则默认从上到下，也就是参数默认值`to bottom`。

可能使用方向关键字比较容易理解，`to xxx`就知道是什么意思了。千万不要使用单独的方向关键字，例如`left`、`right`、`top`和`bottom`等，因为Sarafi相对其他浏览器对这些单独的方向关键字的解释可能是不同的。

若以角度声明方向，上述角度解析可能有点拗口，可参考以下的角度演示图。

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9683a510a7b44982b0d51923c91edaa2~tplv-k3u1fbpfcp-zoom-1.image)

- `0deg：to top`
- `90deg：to right`
- `180deg：to bottom`
- `270deg：to left`

> 从形式上可联想到盒模型的`margin`、`padding`和`border`。`padding:10px 20px 30px 40px`可拆分为以下形式

- `padding-top：10px`
- `padding-right：20px`
- `padding-bottom：30px`
- `padding-left：40px`

其实CSS的方向顺序都是符合上右下左这个规则，若跟方向有关的声明都可联想到这个规则

**径向渐变**

> 径向渐变是一个很奇妙的渐变效果，以圆形或椭圆形的方式向任意方向扩散。参数有点奇葩，但是解构其参数后用起来也很方便，其使用语法如下。

```text
background-image: radial-gradient(shape size at position, color-stop)
```

- Shape：形状
  - `ellipse`：椭圆形(默认)
  - `circle`：圆形
- Size：尺寸
  - `farthest-corner`：从圆心到离圆心最远的角为半径(默认)
  - `farthest-side`：从圆心到离圆心最远的边为半径
  - `closest-corner`：从圆心到离圆心最近的角为半径
  - `closest-side`：从圆心到离圆心最近的边为半径
  - `Size`：尺寸，可用任何长度单位，宽和高必须同时声明
- Position：位置
  - Keyword：位置关键字`left、right、top、bottom、center`(默认center)
  - Position：位置，可用任何长度单位
- ColorStop：色标
  - `Color`：颜色，可参考`background-color`取值，在指定位置产生渐变效果所使用的颜色
  - `Position`：位置，可参考`background-position`的Position取值，在指定位置产生渐变效果

![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e9fa3daf68f04aa2a9fe6ab27562375e~tplv-k3u1fbpfcp-zoom-1.image)

```css
.elem {
    width: 400px;
    height: 200px;
    background-image: radial-gradient(100px 100px, #f66, #66f);
    /* 等价于 */
    background-image: radial-gradient(ellipse 100px 100px at center, #f66, #66f);
}
```

> 径向渐变的`color-stop()`与线性渐变的`color-stop()`完全一致，其细节可回看上述详情。虽然径向渐变比线性渐变更复杂，只要了解其基本语法以及参数，基本也没什么大问题。

**锥形渐变**

> 锥形渐变比其他两个渐变效果更新潮，，以圆锥体的方式向顺时针方向扩散，产生的渐变效果就像俯视圆锥体的顶部。由于兼容性比较差也没什么实际应用，不过认识它也是一件很不错的事情，其使用语法如下。

```text
background-image: conic-gradient(color-stop)
```

- ColorStop：色标
  - Color：颜色，可参考background-color取值，在指定位置产生渐变效果所使用的颜色
  - Position：位置，可参考background-position的Position取值，在指定位置产生渐变效果

细心的同学可能发现锥形渐变无方向感，因为其无参数可声明。锥形渐变确实无参数用于声明方向，其渐变的起始位置是垂直线与向上方向的夹角(可参照上述线性渐变的`0deg`)，再沿着顺时针方向旋转产生渐变效果。

![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fdfb590cd6664c21b01e656208da90cf~tplv-k3u1fbpfcp-zoom-1.image)

```css
.elem {
    width: 400px;
    height: 200px;
    background-image: conic-gradient(#f66, #66f);
    /* 等价于 */
    background-image: conic-gradient(#f66 0, #66f 100%);
}
```

> 锥形渐变的`color-stop()`与线性渐变的`color-stop()`完全一致，其细节可回看上述详情。貌似锥形渐变比线性渐变更简单，其参数比线性渐变更少。

**渐变背景**

> 声明`linear-gradient()`产生从左上角往右下角的渐变效果，将背景定位在左边，通过`animation`控制背景定位左右徘徊产生动态的渐变背景。其实这是一种障眼法，好比在电视机前看电视，电视机不动，但镜头却一直在移动

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c432708fb0541b1974d0fde1aa051c6~tplv-k3u1fbpfcp-zoom-1.image)

```text
<div class="gradient-bg">iCSS</div>
.gradient-bg {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: linear-gradient(135deg, #f66, #f90, #3c9, #09f, #66f) left center/400% 400%;
    font-weight: bold;
    font-size: 100px;
    color: #fff;
    animation: move 10s infinite;
}
@keyframes move {
    0%,
    100% {
        background-position-x: left;
    }
    50% {
        background-position-x: right;
    }
}
```

**渐变文本**

> 实现原理与上述镂空文本和渐变背景一致，在声明`background-image`时由图像路径改成`linear-gradient()`，再通过`filter:hue-rotate()`在指定时间内改变背景色相。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2b6b52dd751f4cbe92a6659586b4262a~tplv-k3u1fbpfcp-zoom-1.image)

```text
<h1 class="gradient-text">Full Stack Developer</h1>
.gradient-text {
    background-image: linear-gradient(90deg, #f66, #f90);
    background-clip: text;
    line-height: 60px;
    font-size: 60px;
    color: transparent;
    animation: hue 5s linear infinite;
}
@keyframes hue {
    from {
        filter: hue-rotate(0);
    }
    to {
        filter: hue-rotate(-1turn);
    }
}
```

**闪烁文本**

> 实现原理与上述渐变文本一致，额外声明`background-blend-mode`为强光模式是为了模拟闪烁效果。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/34569640603d4a2dac0eeb4d94d35e06~tplv-k3u1fbpfcp-zoom-1.image)

```text
<p class="blink-text tac">🔥若对CSS技巧很感兴趣，请关注我喔</p>
.blink-text {
    width: 100%;
    background-image: linear-gradient(-45deg, #f66 30%, #fff 50%, #f66 70%);
    background-size: 200%;
    background-clip: text;
    background-blend-mode: hard-light;
    font-weight: bold;
    font-size: 20px;
    color: transparent;
    animation: shine 2s infinite;
}
@keyframes shine {
    from {
        background-position: 100%;
    }
    to {
        background-position: 0;
    }
}
```

**方格背景**

> 曾经渲染方格背景需在图形软件下切出重复主体的图层，再声明`background-repeat:repeat`让该图像重复平铺到整个背景区域。

其实可用`linear-gradient()`完成上述效果，减少图像渲染。分析方格背景的特点可知，其主体部分由4个交错的正方形组成，两个白色两个灰色，声明`linear-gradient()`渲染出这个主体图像，再声明`background-repeat:repeat`让该主体图像重复平铺到整个背景区域。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42170c815bbd4a5cbc051741520a587d~tplv-k3u1fbpfcp-zoom-1.image)

> 首先声明`background-image:linear-gradient(45deg,#eee 25%,transparent 25%,transparent 75%,#eee 75%)`产生下图。有无发现把该图像复制一份并向上位移`20px`向右位移2`0px`就得到上图

![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8e827a1fe2364a3baf715b28a182342c~tplv-k3u1fbpfcp-zoom-1.image)

> 上述有提及`background`可用多重背景，那么此时就可用上了。声明两个`linear-gradient()`产生两个图像，声明`background-position:0 0, 20px 20px`让两个图像错位排列，声明`background-size:40px 40px`固定两个图像的大小。由于`background-repeat`的默认值是`repeat`，因此无需声明重复平铺了。

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a1c8e5d8c6da4fbe9c17d80731ace321~tplv-k3u1fbpfcp-zoom-1.image)

```text
<div class="square-bg"></div>
.square-bg {
    width: 500px;
    height: 300px;
    background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%),
        linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%);
    background-position: 0 0, 20px 20px;
    background-size: 40px 40px;
}
```

**网格背景**

实现原理与上述方格背景一致，各位同学可试试该效果的实现。

![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91e55821a48948cb949f7c106bcc1afe~tplv-k3u1fbpfcp-zoom-1.image)

```text
<div class="grid-bg"></div>
.grid-bg {
    width: 500px;
    height: 300px;
    background-color: #3c9;
    background-image: linear-gradient(0deg, #fff 5%, transparent 5%, transparent),
        linear-gradient(90deg, #fff 5%, transparent 5%, transparent);
    background-position: 0 0, 20px 20px;
    background-size: 20px 20px;
}
```

**彩色饼图**

平时绘制饼图需引入第三方图表库，仅仅绘制一个饼图而引入一个图表库，岂不是很浪费资源。若要求不高的话，其实CSS也能完成一个常规的饼图。

上述提及的`conic-gradient()`能产生锥形渐变，若控制每个颜色的渐变范围就能产生以下效果。该渐变范围指颜色渲染的边界，具体到哪个百分比。以下代码分别声明了`0~25%`、`25~30%`、`30~55%`、`55~70%`、`70~100%`这五个区间，每个区间渲染一种指定颜色。

```css
.elem {
    background-image: conic-gradient(#f66 0, #f66 25%, #66f 25% #66f, 30%, #f90 30%, #f90 55%, #09f 55%, #09f 70%, #3c9 70%, #3c9 100%);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/20e8dc4962ae420b882eda7f707b3d2b~tplv-k3u1fbpfcp-zoom-1.image)

整个饼图在0deg(可参照上述线性渐变的0deg)的位置沿着顺时针方向依次渲染颜色，先定义的颜色先渲染。声明`border-radius:100%让节点变成圆形，就能完成一个常规的饼图了

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb5274dccd2942a68de16552ea97576b~tplv-k3u1fbpfcp-zoom-1.image)

上述写法导致`background-image`过长，可用`color start end`代替`color start`, `color end`。

```text
<div class="pie-chart"></div>
.pie-chart {
    border-radius: 100%;
    width: 300px;
    height: 300px;
    background-image: conic-gradient(#f66 0 25%, #66f 25% 30%, #f90 30% 55%, #09f 55% 70%, #3c9 70% 100%);
}
```

## 遮罩



> mask子属性比background子属性还要多，其属性取值也很多，但是总体使用情况和background差不多。

- mask-mode：模式

  - `match-source`：根据图像类型采用合适的遮罩模式(默认)
  - `alpha`：根据图像透明度采用合适的遮罩模式
  - `luminance`：根据图像亮度采用合适的遮罩模式

- mask-image

  ：图像

  - `none`：无图像(默认)
  - `url()`：图像路径

- `mask-repeat`：图像平铺方式

  - `repeat`：图像在水平方向和垂直方向重复(默认)
  - `repeat-x`：图像在水平方向重复
  - `repeat-y`：图像在垂直方向重复
  - `no-repeat`：图像仅重复一次
  - `space`：图像以相同间距平铺且填充整个节点
  - `round`：图像自动缩放直到适应且填充整个节点

- mask-position：图像起始位置

  - `Position`：位置，可用任何长度单位，第二个位置(Y轴)不声明默认是50%(默认`0% 0%`)
  - `Keyword`：位置关键字`left`、`right`、`top`、`bottom`、`center`，可单双使用，第二个关键字不声明默认是center

- mask-size：图像尺寸模式

  - `auto`：自动设置尺寸(默认)
  - `cover`：图像扩展至足够大，使其完全覆盖整个区域，图像某些部分也许无法显示在区域中
  - `contain`：图像扩展至最大尺寸，使其宽度和高度完全适应整个区域
  - `Size：尺寸，可用任何长度单位，第二个尺寸(高)不声明默认是auto

- mask-origin：定位区域(与background-position结合使用)

  - `padding-box`：图像相对填充定位(默认)
  - `border-box`：图像相对边框定位
  - `content-box`：图像相对内容定位

- mask-clip：绘制区域

  - `border-box`：图像被裁剪到边框与边距的交界处(默认)
  - `padding-box`：图像被裁剪到填充与边框的的交界处
  - `content-box`：图像被裁剪到内容与填充的交界处

- mask-composite：混合模式

  - `source-over`：叠加，显示遮罩图像合并处
  - `subtract`：相减，不显示遮罩图像重合处
  - `intersect`：相交，显示遮罩图像重合处
  - `exclude`：排除，显示遮罩图像合并处但不显示重合处

> 总体来说，`mask`和b`ackground`的格式和用法大部分相似，作用效果也相似。认识它的难度不大，当作`background`的另一种效果使用即可。

- `repeat`和`position`包含后缀为`-x`和`-y`这两个子属性，若单独声明使用x或y即可
- `position`的x和y允许负值，当赋值x时正值向右负值向左，当赋值y时正值向下负值向上
- mask声明多个图像路径时，若不声明position，那么首个图像定位在节点最顶部，剩余图像依次顺序显示
- 若要声明mask生效，节点的`background-image`必须使用透明格式的图像
- 目前多个浏览器还没统`一composite`的取值，上述取值均为Firefox标准，是极大可能被W3C标准化的取值，Chrome标准请参照[这里(opens new window)](https://www.canvasapi.cn/CanvasRenderingContext2D/globalCompositeOperation)

**镂空背景**

实现原理与上述镂空文本一致，只不过是把`background-clip`改成`mask`。

- `background-clip:text`针对文本镂空
- `mask`针对图像镂空
- 实现镂空背景有两个要点。声明background时可选纯色、图像或渐变，声明mask时必须选择透明格式的图像才能用该图像的透明区域遮挡背景。

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/595b1ac8ca85424c9e608949a6ef3154~tplv-k3u1fbpfcp-zoom-1.image)

```html
<div class="mask-bg">
    <div></div>
</div>
$mask-bg: "https://static.yangzw.vip/codepen/mountain.jpg";
$mask-text: "https://static.yangzw.vip/codepen/snow.jpg";
$logo: "https://static.yangzw.vip/codepen/logo.png";
.mask-bg {
    display: flex;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 100%;
    &::after {
        position: absolute;
        left: -20px;
        right: -20px;
        top: -20px;
        bottom: -20px;
        background: url($mask-bg) no-repeat center/cover;
        filter: blur(10px);
        content: "";
    }
    div {
        position: relative;
        z-index: 9;
        width: 600px;
        height: 300px;
        background: url($mask-text) left center/150% auto;
        mask: url($logo) center/cover;
        animation: move 10s infinite;
    }
}
@keyframes move {
    0% {
        background-position-x: 0;
    }
    50% {
        background-position-x: 100%;
    }
}
```



## 阴影与滤镜

## 前言



阴影和滤镜能让视觉元素看上去更具立体感，阴影为视觉元素提供了边界轮廓，滤镜为视觉元素提供了多变外观。随着浏览器不断升级，阴影和滤镜的兼容性得到了大大提升。

阴影和滤镜在一般情况下可有可无，它们更多是为了点缀视觉元素而存在。早期的视觉元素为了实现这两种效果，只能使用图像实现，每次维护都需重新切图重新替换，确实麻烦。

如今CSS3为阴影和滤镜提供了对应的属性，可通过编码的方式完成这些效果，就无须使用图像实现了。

## 阴影



> 阴影效果有三剑客，分别是`box-shadow`、`text-shadow`、`drop-shadow()`。`box-shadow`和`text-shadow`都是一个属性，而`drop-shadow()`是`filter`里的滤镜函数。

三者都能产生阴影效果，如何区分它们的使用场景呢。其实从字面意思也大概能猜出各自的使用场景了。

- 想要盒子轮廓产生阴影效果，使用`box-shadow`
- 想要文本轮廓产生阴影效果，使用`text-shadow`
- 想要透明图像的非透明部分轮廓产生阴影效果，使用`fliter:drop-shadow()`

三个阴影都具备以下大部分参数，只要认识以下参数，阴影效果随时能上手

- OffsetX：水平偏移，阴影的水平位置(必选)
  - Offset：偏移，可用任何长度单位，允许负值，正值向右负值向左(默认0)
- OffsetY：垂直偏移，阴影的垂直位置(必选)
  - Offset：偏移，可用任何长度单位，允许负值，正值向下负值向上(默认0)
- Blur：模糊半径，阴影的清晰程度(虚色)
  - Length：长度，可用任何长度单位，值越大边缘越模糊(默认0)
- Spread：扩展距离，阴影的实体尺寸(实色)
  - Length：长度，可用任何长度单位，允许负值，正值扩大负值缩小(默认0)
- Color：投影颜色
  - `transparent`：透明(默认)
  - `Keyword`：颜色关键字
  - `HEX`：十六进制色彩模式
  - `RGB`或RGBA：RGB/A色彩模式
  - `HSL`或HSLA：HSL/A色彩模式
- Position：投影位置
  - `outset`：阴影显示在外部(默认)
  - `inset`：阴影显示在内部

上述参数都是`box-shadow`标配的，而`text-shadow`和`drop-shadow()`除了`spread`和`position`，其余全部标配。三个阴影的用法都一致，无什么特殊区别，以下着重讲解`box-shadow`的技巧，另外两个属性也可参照该属性适当扩展使用场景

```text
box-shadow: offset-x offset-y blur spread color position
text-shadow: offset-x offset-y blur color
drop-shadow(offset-x, offset-y, blur, color)
```

**多重阴影**

> 与backgound和mask一致可声明多重效果，使用逗号隔开。先声明的阴影层叠等级最高，会遮挡后面声明的阴影，排列方向由position决定。后面声明的阴影接着上一个排列下去，此时需将blur或spread增大，防止被先声明的阴影遮挡。

**定向阴影**

> 巧妙声明spread为blur的负值可产生定向阴影，这样是为了抵消阴影的扩散。还记得`offset-x`和`offset-y`的取值吗，正负决定了偏移方向。当然这个技巧只适用于`box-shadow`。

- `offset-x`：正值向右负值向左
- `offset-y`：正值向下负值向上

> 根据上述`offset-x`和`offset-y`的偏移方向，可确定以下定向阴影的方向对应的参数。

- 向左：`offset-x`为负，`offset-y`为0
- 向右：`offset-x`为正，`offset-y`为0
- 向上：`offset-x`为0，`offset-y`为负
- 向下：`offset-x`为0，`offset-y`为正

若想多几个方向产生定向阴影，可结合多重阴影的规则实现。

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8280cae592b34e3bb30dc59e049a6fa3~tplv-k3u1fbpfcp-zoom-1.image)

```css
.shadow {
    margin-left: 50px;
    border: 1px solid #f66;
    width: 200px;
    height: 200px;
    &:nth-child(4n-3) {
        margin-left: 0;
    }
    &.left {
        box-shadow: -10px 0 5px -5px #f66;
    }
    &.right {
        box-shadow: 10px 0 5px -5px #f66;
    }
    &.up {
        box-shadow: 0 -10px 5px -5px #f66;
    }
    &.down {
        box-shadow: 0 10px 5px -5px #f66;
    }
    &.left-up {
        box-shadow: -10px 0 5px -5px #f66, 0 -10px 5px -5px #f66;
    }
    &.left-down {
        box-shadow: -10px 0 5px -5px #f66, 0 10px 5px -5px #f66;
    }
    &.right-up {
        box-shadow: 10px 0 5px -5px #f66, 0 -10px 5px -5px #f66;
    }
    &.right-down {
        box-shadow: 10px 0 5px -5px #f66, 0 10px 5px -5px #f66;
    }
}
```

**模拟边框**

> 众所周知，border参与到盒模型的计算和布局中，占据了一定的位置。若希望边框只是一件附属物，不纳入盒模型的计算和布局中，可用outline代替border，而outline的用法和参数与border一致，效果上无太大区别，唯一的却别是outline描绘的轮廓不纳入盒模型的计算和布局中。

本章认识的box-shadow也能代替border产生边框效果，当然也不纳入盒模型的计算和布局中。当然这个技巧只适用于box-shadow。

- 阴影不影响布局，可能会覆盖其他节点及其阴影
- 阴影不触发滚动条，也不会增加滚动区域大小

> blur渲染阴影是虚色，而spread渲染阴影是实色，所以可将其余参数声明为0，spread声明为正值，编写形式为`box-shadow:0 0 0 10px #f66`。还可结合`border-radius`让阴影变成圆角

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/16c3299437ba42ef822c3484427231b1~tplv-k3u1fbpfcp-zoom-1.image)

```css
.shadow {
    border: 1px solid #f66;
    width: 200px;
    height: 200px;
    box-shadow: 0 0 0 10px #f66;
}
.shadow {
    width: 200px;
    height: 200px;
    box-shadow: 0 0 0 10px #f66;
    &.borders {
        margin-left: 100px;
        box-shadow: 0 0 0 10px #f66, 0 0 0 20px #66f;
    }
}
```

**彩虹色带**

彩虹色带很漂亮，可用box-shadow将其渲染得淋漓尽致。实现原理主要是使用了多重阴影，另外也可用第7章函数计算的clip-path实现一番。

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dbe9d700210a4f30b3c9291cd786c433~tplv-k3u1fbpfcp-zoom-1.image)

```text
<div class="rainbow-bar bar-1"></div>
<div class="rainbow-bar bar-2"></div>
$rainbow: 0 0 0 8px #f66 inset,
    0 0 0 16px #f90 inset,
    0 0 0 24px #ff3 inset,
    0 0 0 32px #3c9 inset,
    0 0 0 40px #9c3 inset,
    0 0 0 48px #09f inset,
    0 0 0 56px #66f inset;
.rainbow-bar {
    width: 250px;
    &.bar-1 {
        overflow: hidden;
        position: relative;
        height: 125px;
        &::after {
            display: block;
            border-radius: 100%;
            width: 100%;
            height: 200%;
            box-shadow: $rainbow;
            content: "";
        }
    }
    &.bar-2 {
        margin: 125px 0 0 50px;
        border-radius: 100%;
        height: 250px;
        box-shadow: $rainbow;
        clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
    }
}
```

**专栏头像**

> 上述谈到阴影和滤镜能让视觉元素看上去更具立体感，实际上阴影起了最大作用。`box-shadow`和`text-shadow`结合起来能让视觉元素更立体更动感。

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7a8a36215394bb593b05e2be2f6b90f~tplv-k3u1fbpfcp-zoom-1.image)

```text
<div class="article-avatar">
    <p class="left">JowayYoung</p>
    <p class="right">谈前端</p>
</div>
.article-avatar {
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    width: 250px;
    height: 250px;
    background-color: #f66;
    box-shadow: 0 0 50px 5px rgba(#000, .2) inset;
    line-height: 50px;
    text-shadow: 5px 5px 10px rgba(#000, .5);
    font-weight: bold;
    font-size: 30px;
    color: #fff;
    .left {
        border-top: 3px solid #fff;
        text-indent: -1em;
    }
    .right {
        text-indent: 2em;
        font-size: 40px;
    }
}
```

**聚焦区域**

有无遇过一些迭代新功能的网站，进去时会有一些导航提示，告诉你网站增加了哪些内容。

这个导航提示通常都是一个矩形区域定位在增加内容上方，区域内部透明，凸显增加内容，而区域外部会带上一层蒙层，兼容其他内容。当然这个效果可用box-shadow实现，还记得阴影可调制各种透明颜色吗？将spread延长到9999px足以覆盖整个网站了

![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb69c865f7cd47e596afa5a034aa6dc6~tplv-k3u1fbpfcp-zoom-1.image)

```text
<div class="img-cliper">
    <img src="https://static.yangzw.vip/codepen/gz.jpg">
    <i></i>
</div>
.img-cliper {
    overflow: hidden;
    position: relative;
    img {
        width: 400px;
    }
    i {
        position: absolute;
        left: 50px;
        top: 30px;
        border-radius: 100%;
        width: 100px;
        height: 50px;
        box-shadow: 0 0 0 9999px rgba(#000, .5);
    }
}
```

## 滤镜



玩过Photoshop的同学都知道，其内置的强大滤镜能让图像焕然一新。曾经只能切图完成这些图像滤镜效果，如今可用CSS3提供的filter完成这些滤镜效果了。

> 以前每次修改网页滤镜效果都需重新切图，再换上新的图像，使用CSS滤镜就免去这些烦恼。不妨看看filter提供的那些滤镜属性吧。

- blur()：模糊
  - Length：长度，可用任何长度单位，值为0显示原图，值越大越模糊
- brightness()：亮度
  - Percentage：百分比，可用0~1代替，值为0显示全黑，值为100%显示原图
- contrast()：对比度
  - Percentage：百分比，可用0~1代替，值为0显示全黑，值为100%显示原图
- drop-shadow()：阴影
  - 参考上述阴影
- grayscale()：灰度
  - Percentage：百分比，可用0~1代替，值为0显示原图，值为100%显示全灰
- hue-rotate()：色相旋转
  - Angle：角度，值为0显示原图，值为0~360deg减弱原图色彩，值超过360deg则相当绕N圈再计算剩余的值
- invert()：反相
  - Percentage：百分比，可用0~1代替，值为0显示原图，值为100%完全反转原图色彩
- opacity()：透明度
  - Percentage：百分比，可用0~1代替，值为0显示透明，值为100%显示原图
- saturate()：饱和度
  - Percentage：百分比，可用0~1代替，值为0完全不饱和原图，值为100%显示原图
- sepia()：褐色
  - Percentage：百分比，可用0~1代替，值为0显示原图，值为100%显示褐

滤镜更偏向设计方向，若学过设计课程的同学可能对滤镜的调制会更顺手。其实filter怎么用呢？问设计师索取图像在图像软件的滤镜参数声明filter即可。当然filter与backgound和mask一致可声明多重效果。

**滤镜调制**

其实filter上手不难，难就难在每个人的审美不同，很难做出比较唯美的滤镜效果，更多是看个人在设计方向的进修程度。

所以无设计基础的同学，可参照Cssarm的[官网 (opens new window)](https://una.im/CSSgram/)和[源码 (opens new window)](https://una.im/CSSgram/css/cssgram.min.css)学习滤镜调制，其源码通过filter复现了Instagram网站内置的图像滤镜效果。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/299809384b694aa09c7fa54f0a7715c8~tplv-k3u1fbpfcp-zoom-1.image)

**悼念模式**

> 一行代码全站进入悼念模式，把`<html>`替换成<`html style="filter:grayscale(1)">`即可，简单粗暴。当然核心代码是`filter:grayscale(1)`，意思是把当前节点及其后代节点设置成100%的灰度模式。

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ab69134a78140a5934309d4f011b0c4~tplv-k3u1fbpfcp-zoom-1.image)

```text
<img class="mourning-mode" src="https://static.yangzw.vip/codepen/car.jpg">
.mourning-mode {
    width: 400px;
    filter: grayscale(100%);
}
```

- 可能有些同学在使用上述技巧时会发现声明`position:absolute/fixed`的节点会出现异常，导致某些布局排版错乱。因为节点声明不为`none`的`filter`时，若自身及其后代节点声明了`position:absolute/fixed`，则为其创建一个新容器，使得这些定位节点其定位基准相对这个新容器进行。

> 相信遇到上述问题的同学，应该都是在`<body>`或某个主要节点上声明`filter`吧。根据上述原理，把`filter:grayscale(1)`声明到`<html>`上就行。

- 因为不管怎样设置定位基准，`<html>`都是最顶层的容器，即使创建了新的定位基准节点，也不会对自身及其后代节点产生不符合预期的影响。
- 这也就是为何开头直接把`<html>`替换成`<html style="filter:grayscale(1)">`，当然笔者贴出来的示例也是为了讲解声明`filter:grayscale(1)`后出现的坑，同样原理，也可解决其他因为声明`filter`而导致布局排版错乱的问题



## 变换与动画 

## 前言



曾经简单的交互都需使用JS才能完成，经历过jQuery时代的同学应该很清楚，使用原生JS写交互很艰难，但是使用jQuery封装好的交互函数那就很简单了。

> 如今CSS3增加了`transform`、`transition`和`animation`三大交互属性，为CSS的单调性增加了很多趣味，也为交互开发增加了新的可能。

## 变换



> 变换分为2D变换和3D变换。2D变换在平面上操作，3D变换在空间上操作，2D和3D的概念相信很多同学都会了吧。变换可理解成将节点复制一份并生成新的图层，原节点隐藏，使用新节点进行变换操作。

声明`transform-style`可实现2D变换和3D变换间的切换，不同变换空间需使用对应的变换函数。当然`transform-style`需声明在父节点中，即需发生变换的节点的父节点。

- `flat`：所有变换效果在平面上呈现(默认)
- `preserve-3d`：所有变换效果在空间上呈现

笔者已将2D变换函数和3D变换函数整理好，在不同变换空间使用对应的变换函数即可。

- translate()：位移
  - `translate(x,y)`：2D位移
  - `translate3d(x,y,z)`：3D位移
  - `translateX(x)`：X轴位移，等同于`translate(x,0)`或`translate3d(x,0,0)`
  - `translateY(y)`：Y轴位移，等同于`translate(0,y)`或- translate3d(0,y,0)
  - `translateZ(z)`：Z轴位移，等同于`translate3d(0,0,z)`
  - 描述
    - 单位：Length长度，可用任何长度单位，允许负值
    - 默认：XYZ轴不声明默认是0
    - 正值：沿X轴向右位移/沿Y轴向上位移/沿Z轴向外位移
    - 负值：沿X轴向左位移/沿Y轴向下位移/沿Z轴向内位移
- scale()：缩放
  - `scale(x,y)`：2D缩放
  - `scale3d(x,y,z)`：3D缩放
  - `scaleX(x)`：X轴缩放，等同于`scale(x,1)`或`scale3d(x,1,1)`
  - `scaleY(y)`：Y轴缩放，等同于`scale(1,y)`或`scale3d(1,y,1)`
  - 描述
  - 单位：`Number`数值或Percentage百分比，允许负值
  - 默认：`XYZ`轴不声明默认是1或100%
  - 正值：`0<(x,y,z)<1`沿X轴缩小/沿Y轴缩小/沿Z轴变厚，`(x,y,z)>1`沿X轴放大/沿Y轴放大/沿Z轴变薄
  - 负值：`-1<(x,y,z)<0`翻转沿X轴缩小/沿Y轴缩小/沿Z轴变厚，`(x,y,z)<-1`翻转沿X轴放大/沿Y轴放大/沿Z轴变薄
- skew()：扭曲
  - `skew(x,y)`：2D扭曲
  - `skewX(x)`：X轴扭曲，等同于`skew(x,0)`
  - `skewY(y)`：Y轴扭曲，等同于`skew(0,y)`
  - 描述
    - 单位：Angle角度或Turn周
    - 默认：XY轴不声明默认是0
    - 正值：沿X轴向左扭曲/沿Y轴向下扭曲
    - 负值：沿X轴向右扭曲/沿Y轴向上扭曲
- rotate()：旋转
  - `rotate()`：2D旋转
  - `rotate3d(x,y,z,a)`：3D旋转，`[x,y,z]`是一个向量，数值都是0~1
  - `rotateX(a)`：X轴旋转，等同于`rotate(1,0,0,a)`，正值时沿X轴向上逆时针旋转，负值时沿X轴向下顺时针旋转
  - `rotateY(a)`：3D Y轴旋转，等同于`rotate(0,1,0,a)`，正值时沿Y轴向右逆时针旋转，负值时沿Y轴向左顺时针旋转
  - `rotateZ(a)`：3D Z轴旋转，等同于`rotate(0,0,1,a)`，正值时沿Z轴顺时针旋转，负值时沿Z轴逆时针旋转
  - 描述
    - 单位：Angle角度或Turn周
    - 正值：2D旋转时顺时针旋转
    - 负值：2D旋转时逆时针旋转
- matrix()：矩阵(太过复杂，可放弃)
  - `matrix(a,b,c,d,e,f)`：2D矩阵(位移、缩放、扭曲、旋转的综合函数)
  - `matrix(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p)`：3D矩阵(位移、缩放、扭曲、旋转的综合函数)
- perspective()：视距
  - `Length`：长度，可用任何长度单位

> transform的使用场景很多，不局限于某种特定场景，若结合transition和animation使用还必须注意性能问题。

**多值执行顺序**

与backgound和mask一致可声明多重效果，使用逗号隔开。网上很多结论说transform多值执行顺序是从左到右或从右到左，其实这样的结论都是比较笼统的。正确来说并无执行上的先后顺序, 而是由多个变换对应的矩阵相乘, 再拿该矩阵去乘以坐标，最终得出变换效果。

> 例如`transform:translate(150px,0),rotate(45deg)`和`transform:rotate(45deg),translate(150px,0)`，最终的变换效果就有所不同。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7a3851be62304907bc11da4b95752507~tplv-k3u1fbpfcp-zoom-1.image)

- 第一种：先往右位移`150px`，坐标轴不变；再顺时针旋转`45deg`，坐标轴顺时针旋转`45deg`
- 第二种：先顺时针旋转`45deg`，坐标轴顺时针旋转`45deg`；再往右位移`150px`，坐标轴不变

```css
.elem {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 50px;
    top: 50px;
    width: 100px;
    height: 100px;
    background-color: #f66;
    font-size: 20px;
    color: #fff;
    &.transform-1 {
        transform: translate(150px, 0) rotate(45deg);
    }
    &.transform-2 {
        transform: rotate(45deg) translate(150px, 0);
    }
}
```

> 正确的理解是从左到右，但是还得注意坐标轴是否发生了变化，若坐标轴发生了变化，会影响到后续的变换效果。优先考虑坐标轴的变化，先分析出前后缩放旋转的变化，再分析出前后位移扭曲的变化。

缩放和旋转都能让坐标轴发生变化，这个必须谨记

**视距效果**

> `transform:perspective()`也可通过`perspective`声明，这个属性在开启3D变换后最好声明上，否则有些3D变换效果可能无法得到更好的展现。

- 值越小，用户与空间Z轴距离越近，视觉效果越强
- 值越大，用户与空间Z轴距离越远，视觉效果越弱

**perspective/perspective()区别**

> `perspective`和`transform:perspective()`都能声明视距，那为何要存在两种声明方式呢？当然是有它们的区别所以才能存在呀。

- `perspective`与transform:perspective()的作用相同
- `perspective`在舞台节点(变换节点的父节点)上使用，`transform:perspective()`在当前变换节点上使用，也可与其他变换函数一起使用

**GPU硬件加速模式**

- 有无发现即使很简单的动画，有时都能引起卡顿，特别是在移动端上尤其明显。在此介绍一种Hack方法，为节点声明`transform:transition3d()`或`transform:translateZ()`，这两个声明都会开启GPU硬件加速模式，从而让浏览器在渲染动画时从CPU转向GPU，实现硬件加速。
- `transform:transition3d()`和`transform:translateZ()`其实是为了渲染3D样式，但声明为0后并无真正使用3D效果，但浏览器却因此开启了GPU硬件加速模式。在`Webkit`内核下使用`transform:translate3d()`加速效果会更明显。

```css
.elem {
    transform: transition3d(0, 0, 0);
}
/* 或 */
.elem {
    transform: translateZ(0);
}
```

在使用该方案时可能会出现诡异的缺陷。当有多个绝对定位的节点声明`transform:transition3d()`开启GPU硬件加速模式后会有几个节点凭空消失，是不是很诡异。这种现象不能完全解决，只能尽量避免。

- 尽量不要对节点及其父节点声明`position:absolute/fixed`，当然这个很难避免不使用
- 减少声明`transform:transition3d()`的节点数量，减少至6个以下即可
- 声明`will-change代替transform:transition3d()`，详情[请戳这里(opens new window)](https://segmentfault.com/a/1190000020926189)

笔者比较推荐第二种方法，节点的数量可通过JS动态控制，保持在6个以下。而`will-change`会存在另一些问题，大量使用还是会引发更严重的性能问题，笔者后续会在本章更新详细的分析。

**动感心形**

transform有一个很实用的场景，就是通过`transform:translate()`补位。补位指实现效果的最终位置还差一点距离就能完成，通过margin或`transform:translate()`将该距离补充完整，将节点调整到最终位置。

还记得第6章布局方式的居中布局吗？有一种方式就是通过`transform:translate(-50%,-50%)`将节点拉回最中央，节点无需声明位移的距离是宽高的二分之一，使用50%自动计算其距离为宽高的二分之一即可。

描绘一个心形虽然不是一个很常用的场景，作为一名雄性程序猿，214和520等具有示爱性质的节日，当然少不了用纯CSS描绘一个动感心形啦。

使用单个`<div>`结合两个伪元素`::before`和`::after`通过错位叠加的方式合并成一个心形。

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/afcd1fed26dc49d580e7bd3be0fe25c3~tplv-k3u1fbpfcp-zoom-1.image)

- 声明`<div>`的尺寸为一个正方形并以中心顺时针旋转45deg
- 声明两个伪元素继承`<div`>的尺寸并实行绝对定位
- 声明两个伪元素的圆角率为100%并平移到相应位置

> 巧妙利用了`transform`将两个伪元素平移到相应位置产生叠加错觉。

![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7728b943ab574255b0bd124a6872b4d9~tplv-k3u1fbpfcp-zoom-1.image)

```text
<div class="heart-shape"></div>
.heart-shape {
    position: relative;
    width: 200px;
    height: 200px;
    background-color: #f66;
    transform: rotate(45deg);
    &::before,
    &::after {
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 100%;
        width: 100%;
        height: 100%;
        background-color: #f66;
        content: "";
    }
    &::before {
        transform: translateX(-50%);
    }
    &::after {
        transform: translateY(-50%);
    }
}
```

**像素边框**

> 1px边框在桌面端网站看上去没什么大问题，但在移动端网站看上去却觉得很粗。由于大部分移动端都具有细腻的屏幕，像iPhone的Retina屏幕，一个像素可由4个点或9个点组成，在接近视网膜极限的情况下，1px边框看起来确实会有点粗。

- 那么可声明`0.5px`边框吗。答案是可行的，即使声明成功，但有些浏览器还是按照1px的值去渲染，这样就导致不同设备的边框参差不齐了。

> 换个思路，使用一个伪元素的边框去当作节点边框，声明`border`为1px并将其宽高声明成200%，最终效果是该节点的2倍大小，再通过声明`transform:scale(.5)`将该伪元素缩小到原来的`0.5`倍，现在和节点尺寸一致了，而border也通过浏览器自动计算成`0.5px`了，最终实现0.5px边框。其实现原理就是将边框宽度计算交由浏览器处理。

![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/81e8c3386708474f892348668c3f4d5c~tplv-k3u1fbpfcp-zoom-1.image)

```text
<div class="onepx-border normal">1px</div>
<div class="onepx-border thin">0.5px</div>
.onepx-border {
    width: 200px;
    height: 80px;
    cursor: pointer;
    line-height: 80px;
    text-align: center;
    font-weight: bold;
    font-size: 50px;
    color: #f66;
    & + .onepx-border {
        margin-top: 10px;
    }
    &.normal {
        border: 1px solid #f66;
    }
    &.thin {
        position: relative;
        &::after {
            position: absolute;
            left: 0;
            top: 0;
            border: 1px solid #f66;
            width: 200%;
            height: 200%;
            content: "";
            transform: scale(.5);
            transform-origin: left top;
        }
    }
}
```

**内容翻转**

遇到一些内容翻转的场景，有些同学可能会声明`transform:rotate3d()`将内容沿着Y轴旋转180deg水平翻转。

其实可声明`transform:scale()`为负值将内容直接翻转，细心的同学应该注意到上述有谈到。

- 水平翻转：`transform:scale(1,-1)`
- 垂直翻转：`transform:scale(-1,1)`
- 倒序翻转：`transform:scale(-1,-1)`

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29f8917130d740dfbbce40fc78a02d5b~tplv-k3u1fbpfcp-zoom-1.image)

```html
<ul class="flip-content">
    <li>正常文本</li>
    <li class="x-axis">水平翻转</li>
    <li class="y-axis">垂直翻转</li>
    <li class="reverse">倒序翻转</li>
</ul>
.flip-content {
    li {
        position: relative;
        width: 121px;
        height: 51px;
        line-height: 51px;
        text-align: center;
        font-weight: bold;
        font-size: 30px;
        color: #f66;
        &::before,
        &::after {
            position: absolute;
            background-color: #66f;
            content: "";
        }
        & + li {
            margin-top: 10px;
        }
        &.x-axis {
            transform: scale(1, -1);
            &::after {
                left: 0;
                top: 25px;
                width: 100%;
                height: 1px;
            }
        }
        &.y-axis {
            transform: scale(-1, 1);
            &::after {
                left: 60px;
                top: 0;
                width: 1px;
                height: 100%;
            }
        }
        &.reverse {
            transform: scale(-1, -1);
            &::before {
                left: 0;
                top: 25px;
                width: 100%;
                height: 1px;
            }
            &::after {
                left: 60px;
                top: 0;
                width: 1px;
                height: 100%;
            }
        }
    }
}
```

## 过渡



> 有时在不同状态间切换属性可能会显得很生硬，此时`transition`就派上用场了，它能让状态间的切换变得更丝滑。

- transition-property：属性
  - `all`：全部属性过渡(默认)
  - `none`：无属性过渡
  - `String`：某个属性过渡
- transition-duration：时间
  - Time：秒或毫秒(默认0)
- transition-timing-function：缓动函数
  - `ease`：逐渐变慢，等同于`cubic-bezier(.25,.1,.25,1)`(默认)
  - `linear`：匀速，等同于`cubic-bezier(0,0,1,1)`
  - `ease-in`：加速，等同于`cubic-bezier(.42,0,1,1)`
  - `ease-out`：减速，等同于`cubic-bezier(0,0,.58,1)`
  - `ease-in-out`：先加速后减速，等同于`cubic-bezier(.42,0,.58,1)`
  - `cubic-bezier`：贝塞尔曲线，`(x1,y1,x2,y2)`四个值特定于曲线上的点P1和P2，所有值需在`[0,1]`区域内
- transition-delay：时延
  - Time：秒或毫秒(默认0)

> 总体来说，transition可用到所有可能发生属性变更的节点上，但有一些情况是绝对不能使用的。transition延缓某些属性的变更过程，若通过鼠标事件给某个节点属性赋值，会导致属性在变更过程中发生卡顿。

例如通过鼠标的`mousemove`事件将top从10px变更到20px。由于声明了`transition:300ms`，那么从10px变更到11px时会将该过程延缓`300ms`，导致了该过程的执行时长是300ms，而此刻想要的效果是瞬间从10px变更到11px，再依次变更到20px。整个过程是鼠标移动就立刻赋值，这样才能实时显示top的变化，而声明了transition反而起到副作用导致看上去很卡顿。

由于duration和delay的取值都是时间，所以可能会发生混淆。

- `duration`和delay作用于所有节点，包括自身的`::before`和`::after`
- `transition`中出现两个时间值时，第一个解析为`duration`，第二个解析为delay
- `transition`中出现一个时间值时，解析为`duration`

缓动函数其实就是贝塞尔曲线，相关原理可自行百度。推荐一个设置缓动函数形状的网站[CubicBezier (opens new window)](https://cubic-bezier.com/)，可根据需求设置想要的缓动函数。

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/46ed7cd086894bda9537555b6ed5029d~tplv-k3u1fbpfcp-zoom-1.image)

还记得第9章选择器的切换按钮的刹车动画吗？点击按钮后，圆点从左到右有一个细微的刹车动画，这个不是通过JS捣鼓出来的，而是笔者细心地调制了一个缓动函数`cubic-bezier(.4,.4,.25,1.35)`实现的。具体实现可通过笔者推荐的网站自行调制喔。

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a835669acd744637b7ef4808cce0dade~tplv-k3u1fbpfcp-zoom-1.image)

## 动画



> 上述transform能让节点拥有更多形态，而animation能让节点拥有更多状态。正是有了animation，所以才让交互效果更精彩。

-CSS动画可通过设置多个点精确控制一个或一组动画，用来实现复杂的动画效果。

- 动画由多个点组成，每个点拥有独立的状态，这些状态通过浏览器处理成过渡效果，点与点间的过渡效果串联起来就是一个完整的动画。

`animation`可声明的两种动画，每种动画各有自身特点。

- 关键帧动画：在时间轴的关键帧上绘制关键状态并使之有效过渡组成动画
- 逐帧动画：在时间轴的每一帧上绘制不同内容并使之连续播放组成动画

> 关键帧动画可看作是一个连续的动画片段，逐帧动画可看作是一个断续的动画片段，两种动画都是通过时间流逝将多个动画片段串联在一起。浏览器可将关键帧动画的关键帧自动过渡成片段，而将逐帧动画的每一帧按顺序播放成片段，可认为逐帧动画是一个GIF。

- animation-name：名称
  - `none：无动画(默认)
  - `String：动画名称
- animation-duration：时间
  - Time：秒或毫秒(默认0)
- animation-timing-function：缓动函数
  - `ease`：逐渐变慢，等同于cubic-bezier(.25,.1,.25,1)(默认)
  - `linear`：匀速，等同于cubic-bezier(0,0,1,1)
  - `ease-in`：加速，等同于cubic-bezier(.42,0,1,1)
  - `ease-out`：减速，等同于cubic-bezier(0,0,.58,1)
  - `ease-in-out`：先加速后减速，等同于cubic-bezier(.42,0,.58,1)
  - `cubic-bezier`：贝塞尔曲线，(x1,y1,x2,y2)四个值特定于曲线上的点P1和P2，所有值需在[0,1]区域内
  - `steps([,[start|end]]?)`：把动画平均划分成n等分，直到平均走完该动画
  - `step-start`：等同于`steps(1,start)`，把动画分成一步，动画执行时以左侧端点0%为开始
  - `step-end`：等同于`steps(1,end)`，把动画分成一步，动画执行时以右侧端点100%为开始
- animation-delay：时延
  - `Time`：秒或毫秒(默认0)
- animation-iteration-count：播放次数
  - `Number`：数值(默认1)
  - `infinite`：无限次
- animation-direction：轮流反向播放(播放次数为一次则该属性无效果)
  - `normal`：正常播放(默认)
  - `alternate`：轮流反向播放，奇数次数正常播放，偶数次数反向播放
- animation-play-state：播放状态
  - `running`：正在播放(默认)
  - `paused`：暂停播放
- animation-fill-mode：播放前后其效果是否可见
  - `none`：不改变默认行为(默认)
  - `backwards`：在时延所指定时间内或在动画开始前应用开始属性(在第一个关键帧中定义)
  - `forwards`：在动画结束后保持最后一个属性(在最后一个关键帧中定义)
  - `both`：向前和向后填充模式都被应用

> 关键帧动画必须通过`animation`和`@keyframes`声明，逐帧动画只能通过`animation-timing-function:steps()`声明。总体来说，逐帧动画的声明比较简单，可用一张逐帧长图完成整个动画效果，而关键帧动画需结合`@keyframes`为每个关键帧声明当前对应的状态，若涉及的点较多，可能比较繁琐。

**关键帧动画声明步骤**

- 在`@keyframes`里声明动画名称和动画每个关键帧的状态
- 动画名称不能重复否则会被覆盖，关键帧通过百分比分割出每个关键帧并声明对应的状态
- 在指定节点中声明`animation`调用动画

**逐帧动画声明步骤**

- 准备一张逐帧长图，该图像包含动画效果的每一帧且每帧宽高必须一致
- 在`steps()`里声明逐帧长图及其展示方式
- 在指定节点中声明`animation`调用动画

**@keyframes注意事项**

关键帧动画的声明通过`@keyframes`完成，编写形式如下。

```css
@keyframes animation-name {
    from {}
    to {}
}
/* 或 */
@keyframes animation-name {
    p1 {}
    p2 {}
    p3 {}
}
```

- 关键帧的取值必须是`from`、`to`或`Percentage`。`from`可用`0%`代替，to可用100%代替，若开始或结束的关键帧无对应的状态，可不用声明`from`或`to`。`0%`的`%`不能省略，否则关键帧解析会失败。
- 后面声明的关键帧状态会覆盖前面声明的关键帧状态，动画结束后会回到`animation-fill-mode`声明的状态。

**自动打字器**

很多在线编辑器网站都有一些自动打字的效果，例如[CodePen (opens new window)](https://codepen.io/JowayYoung)。很多同学都以为是JS实现的效果，其实查看Chrome Devtools发现是纯CSS实现的。观察多几次自动打字器，可发现其存在以下特点。

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9df260b9292418f99aebcdf4f1b2599~tplv-k3u1fbpfcp-zoom-1.image)

- 字体都是等宽字体，等宽字体可保证每次打字时光标的移动距离都是一致的
- 打字器的宽度由最初的0px逐渐增加内容后变成最终固定字数的宽度，宽度以等宽字体的个数为准
- 光标随着每打一个字就闪烁一次，打字速度均匀，打字完成后再次重复打字
- 整个打字过程存在两个动画，一个是打字器自增宽度，一个是光标闪烁
- 整个打字过程一闪一闪地完成，根据其断断续续的特点可判断该动画为逐帧动画

还记得第5章样式计算的长度单位吗？有一个叫做ch的长度单位，它是一个等宽字体的特有长度单位，准确宽度为0的宽度。因此一个等宽字体就是1ch，两个等宽字体就是2ch。通过等宽字体个数定制打字器长度最合适不过了，而常用的设备自带等宽字体有Consolas、Monaco和Monospace三种。

打字器自增宽度可用0px到等宽字体指定个数的宽度nch为一个自增周期，使用动画完成其自增过程即可。

光标闪烁可用`border-right`模拟，具体形象现在可脑补一下，有无想出什么效果？节点里包含文本，在最右边声明border-right，那不就是一个具有静态光标的输入状态吗？文本右边就是光标，很符合常理，为border-right声明一个闪烁动画即可。

```text
<div class="auto-typing">Do You Want To Know More About CSS Development Skill</div>
@mixin typing($count: 0, $duration: 0, $delay: 0) {
    overflow: hidden;
    border-right: 1px solid transparent;
    width: #{$count + 1}ch;
    font-family: Consolas, Monaco, monospace;
    white-space: nowrap;
    animation: typing #{$duration}s steps($count + 1) #{$delay}s infinite backwards,
        caret 500ms steps(1) #{$delay}s infinite forwards;
}
.auto-typing {
    font-weight: bold;
    font-size: 30px;
    color: #09f;
    @include typing(52, 5);
}
@keyframes caret {
    50% {
        border-right-color: currentColor;
    }
}
@keyframes typing {
    from {
        width: 0;
    }
}
```

- [在线演示：Here](https://codepen.io/JowayYoung/pen/ZEzKQEx)