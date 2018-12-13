[clay-core](https://yelloxing.github.io/clay-core/doc/) - Provide more flexible data visualization solutions
==================================================

[![travis](https://api.travis-ci.org/yelloxing/clay.svg?branch=master)](https://www.travis-ci.org/yelloxing/clay)
[![chat](https://github.com/yelloxing/clay-core/blob/master/data/chat.svg)](https://github.com/yelloxing/clay-core/issues)

我们的目标是：提供更友好的数据可视化（2D和3D）解决方案。

<img align="right" height="100" src="https://github.com/yelloxing/clay-core/blob/master/clay.png">

****
### 作者:心叶
### 邮箱:yelloxing@gmail.com
****

>>> 温馨提示：目前clay-core依旧处于开发阶段，你不应该用于正式项目，从2.x.x开始的版本才是发布版本（预计2019年3月底发布），请知悉！

关注的问题
--------------------------------------
首先，本项目是为了Web端数据可视化而建立的，如果用更通俗的话说，就是为了方便使用HTML + CSS + ES绘制各种2D和3D图形来反映统计的数据，并且绘制的图形是可交互的。

和别的库不同的是，clay-core关注的重点是绘图过程中繁琐的操作和复杂的计算部分，通过提供更友好的操作接口和丰富而基础的计算接口来加速绘图。除此之外，不会也不喜欢强迫使用者改变自己的代码习惯，或者说在尽可能的情况下，保证灵活性。

[![](https://github.com/yelloxing/clay-core/blob/master/doc/images/clay-readme.jpg)](https://yelloxing.github.io/clay/doc/)

贡献代码和参与讨论？
--------------------------------------
始终秉承着开源的初衷，任何有益的建议或设计都是被鼓励作为新的代码贡献进来的。加入我们前，请先阅读[相关基本说明](https://github.com/yelloxing/clay-core/blob/master/.github/CONTRIBUTING.md)和[接口文档API](https://yelloxing.github.io/clay-core/doc)了解基本情况。如果仍有疑惑，可以发送作者邮箱询问细节。

如何使用？
--------------------------------------
如果你开发的是一个web项目，直接在页面引入打包后的文件后即可：

```html
<script src="./build/clay-core.min.js" type="text/javascript"></script>
```

如果你想通过npm方式管理，首先你需要通过命令行安装clay-core：

```bash
npm install --save clay-core
```

安装好了，可以这样调用：

```js
import render from 'clay-core';

// 启动clay
let clay=render(window);

// 基本配置(可以不配置，使用默认值)
clay.config(...);
...

// 导出，供别的模块使用
export default clay;
```

如何在本地搭建开发环境？
--------------------------------------

把代码Clone到本地：

```bash
git clone git://github.com/yelloxing/clay-core.git
```

进入项目目录，安装打包文件：

```bash
cd clay && npm install
```

安装好以后就可以进行开发了，修改代码以后，应该启动打包程序：

```bash
npm run release
```

除非特殊情况，每一个新开发的功能都应该添加单元测试和基准测试，无法提供单元测试的应该添加用例。

单元测试位于test/unit,基准测试位于test/benchmark，用例位于test/use-case。

对于单元测试，如果是新添加的html页面，应该在Gruntfile.js里最后部分添加引用（每次发布代码到Github的时候会自动报告是否存在问题），本地直接在目标浏览器中打开对应html页面即可查看测试结果。

### 项目结构

设计的初衷是方便绘制2D和3D的图形，让数据以交互的图片形式展示。

核心模块：

- **矩阵变换**：2D和3D图形变换，包括3D相机和投影等。
- **插值运算**：坐标查找。
- **坐标映射**：比如地图经纬度映射。
- **轮播动画**：主要是动画核心计算方法。
- **小工具**：一些实用的小工具，比如色彩格式化等。
- **结点操作**：兼容HTML和SVG等不同上下文标签和属性操作。

布局模块：

- **layout**：对于特殊展示方式，定义对应的布局来方便位置和图形计算。

图形模块：

- **graphics**：包括SVG、Canvas2D和WebGL3D绘图接口。

扩展：

- **extend**：包括已实现功能可加强扩展和组件扩展。

### 单元测试

采用QUnit，下面是可以选择的测试方法：

```js
ok( value, [message] );
equal( actual, expected, [message] );
notEqual( actual, expected, [message] );
deepEqual( actual, expected, [message] );
notDeepEqual( actual, expected, [message] );
strictEqual( actual, expected, [message] );
notStrictEqual( actual, expected, [message] );
throws( block, [expected], [message] );
```

### 免责声明

*   项目中部分数据（如图片等）来自互联网，如果侵犯到对应权益者请联系我们，方便我们及时删除！
*   本项目保留贡献者全部权利，发生的任何纠纷，本项目作者和维护人概不负责，如有侵权，请及时和我们取得联系。
