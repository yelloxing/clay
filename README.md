[clay.js / core](https://yelloxing.github.io/clay-core/doc/) - Provide a more friendly web-side drawing interface
==================================================

[![travis](https://www.travis-ci.org/yelloxing/clay-core.svg?branch=master)](https://www.travis-ci.org/yelloxing/clay-core)
[![chat](https://github.com/yelloxing/clay-core/blob/master/data/chat.svg)](https://github.com/yelloxing/clay-core/issues)

我们的目标是：提供更友好的web端绘图接口。

<img align="right" height="100" src="https://github.com/yelloxing/clay-core/blob/master/clay.png">

****
### 作者:心叶
### 邮箱:yelloxing@gmail.com
****

关注的问题
--------------------------------------
首先，本项目是为了Web端绘图而建立的，如果用更通俗的话说，就是为了方便使用HTML + CSS + ES绘制各种2D和3D图形，并且绘制的图形是可交互的。

和别的库不同的是，clay.js关注的重点是绘图过程中繁琐的操作和复杂的计算部分，通过提供更友好的操作接口和丰富而基础的计算接口来加速绘图。除此之外，不会也不喜欢强迫使用者改变自己的代码习惯，或者说在尽可能的情况下，保证灵活性。

[![](https://github.com/yelloxing/clay-core/blob/master/doc/images/clay-readme.jpg)](https://yelloxing.github.io/clay-core/doc/)

项目关系
--------------------------------------
clay.js是一个在浏览器端绘图的一个项目集的称呼，其中有很多项目，下面分别说明一下：

* [clay.js / core](https://yelloxing.github.io/clay-core/doc/) - 也就是本项目，主要是浏览器端绘图的基本接口，只要是使用本系列绘图，大部分情况下，都应该引入本项目。

* [clay.js / 2d](https://github.com/yelloxing/clay-2d) - 主要提供绘制二维图形的快捷接口，比如扇形等，引入本项目以后，基本的二维图形的绘制将不再麻烦。

* [clay.js / chart](https://github.com/yelloxing/clay-chart) - 主要是图表绘制问题，比如绘制饼状图、树图等，你可以认为，这是一个数据可视化相关的计算库。

* [clay.js / 3d](https://github.com/yelloxing/clay-3d) - 绘制三维图形相关的基础库，目前处于开发阶段。

开源初衷
--------------------------------------
始终秉承着开源的初衷，任何有益的建议或设计都是被鼓励作为新的代码贡献进来的。加入我们前，请先阅读[相关基本说明](https://github.com/yelloxing/clay-core/blob/master/.github/CONTRIBUTING.md)和[接口文档API](https://yelloxing.github.io/clay-core/doc)了解基本情况。如果仍有疑惑，可以发送作者邮箱询问细节。

如何使用？
--------------------------------------
如果你开发的是一个web项目，直接在页面引入打包后的文件后即可：

```html
<script src="./build/clay-core.min.js" type="text/javascript"></script>
```

如果你想通过npm方式管理，首先你需要通过命令行安装clay.js：

```bash
npm install --save clay-core
```

安装好了，可以这样调用：

```js
import clay from 'clay-core';

// 基本配置(可以不配置，使用默认值)
clay.config(...);
...

// 导出，供别的模块使用(如果没有配置，别的模块重新import也一样)
export default clay;
```

如果你是使用npm方式管理的，除了导入全局clay外，你还可以导入你需要的接口，下面列出全部可导入接口：

```js
import {
    // 全局变量
    clay, $$,
    // 布局
    treeLayout,
    // 坐标变换
    rotate, move, scale,
    // 曲线插值
    hermite, cardinal, catmullRom,
    // Matrix4矩阵
    Matrix4,
    // 地球坐标映射
    map,
    // 轮询
    animation, loop
} from 'clay-core';
```

如何在本地搭建开发环境？
--------------------------------------

把代码Clone到本地：

```bash
git clone git://github.com/yelloxing/clay-core.git
```

进入项目目录，安装打包文件：

```bash
cd clay-core && npm install
```

安装好以后就可以进行开发了，修改代码以后，应该启动打包程序：

```bash
npm run release
```

除非特殊情况，每一个新开发的功能都应该添加单元测试和基准测试，无法提供单元测试的应该添加用例。

单元测试位于test/unit,基准测试位于test/benchmark，用例位于test/use-case。

对于单元测试，如果是新添加的html页面，应该在Gruntfile.js里最后部分添加引用（每次发布代码到Github的时候会自动报告是否存在问题），本地直接在目标浏览器中打开对应html页面即可查看测试结果。

### 免责声明

*   项目中部分数据（如图片等）来自互联网，如果侵犯到对应权益者请联系我们，方便我们及时删除！
*   本项目保留贡献者全部权利，发生的任何纠纷，本项目作者和维护人概不负责，如有侵权，请及时和我们取得联系。
