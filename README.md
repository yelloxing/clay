# npm-downloads
npm包下载量比较。

<img align="center" src="https://github.com/yelloxing/npm-downloads/blob/master/src/asset/npm.png">

如何使用？
--------------------------------------
我们以jquery为例，下面是项目的最终效果，点击它你就会进入具体的下载统计页面。

<a href="https://yelloxing.github.io/npm-downloads?interval=7&packages=jquery"><img src="https://img.shields.io/npm/dm/jquery.svg" alt="Downloads"></a>

```html
<a href="https://yelloxing.github.io/npm-downloads?interval=7&packages=jquery">
    <img src="https://img.shields.io/npm/dm/jquery.svg" alt="Downloads">
</a>
```

复制上面的代码到你项目的README.md或别的页面，然后把jquery改成你自己的npm包的名字就可以了。

如何启动本地编辑？
--------------------------------------
首先，你需要确保本地安装了node.js，然后，执行下面命令安装项目依赖：

```bash
npm install
```

接着，启动下面命令会自动打开页面，修改内容页面也自动刷新：

```bash
npm run dev
```

如果你想发布开发的代码，执行下面命令进行打包：

```bash
npm run build
```
