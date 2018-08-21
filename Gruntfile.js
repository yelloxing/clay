'use strict';

var source = [

    /*【基础模块】*/
    './src/core.js',//核心代码
    './src/config.js',//基本的配置文件
    './src/animation.js',//轮询执行方法

    /*【数学模块】 => 提供数值计算 */
    './src/math/interpolate/cardinal.js',//三次cardinal插值
    './src/math/ease.js',//变换速率计算

    /*【结点模块】 => 关于DOM结点的操作 */
    './src/dom/node.js',//结点元素对象(本模块核心)
    './src/dom/sizzle/tool.js',//选择器辅助方法
    './src/dom/sizzle/core.js',//内置sizzle选择器
    './src/dom/data.js',//为结点绑定数据
    './src/dom/modify.js',//结点的增删改操作
    './src/dom/search.js',//结点的查找操作
    './src/dom/size.js',//获取元素渲染后的尺寸
    './src/dom/event.js',//结点事件相关操作

    /*【比例尺模块】=> 数据映射关系 */
    './src/scale/linear.js',//线性比例尺

    /*【布局模块】=> 把数据变成对于绘图而言更友好的格式 */
    './src/layout/pie.js',//饼状图

    /*【动画模块】 => 为DOM结点属性或样式的修改提供动画效果 */
    './src/animation/port.js',//对外提供的调用接口
    './src/animation/attr.js',//针对属性的渐变计算

    /*【SVG模块】=> 提供更友好的接口来绘制SVG图形 */
    './src/svg/arc.js',//绘制一段圆弧
    './src/svg/line.js'//绘制一段线条

];

var banner = '/*!\n*\n' +
    '* <%= pkg.name %> - <%= pkg.description %>\n' +
    '* <%= pkg.repository.url %>\n' +
    '* \n' +
    '* author <%= pkg.author %>\n' +
    '*\n' +
    '* version <%= pkg.version %>\n' +
    '* \n' +
    '* build 2018/07/29\n' +
    '*\n' +
    '* Copyright yelloxing\n' +
    '* Released under the <%= pkg.license %> license\n' +
    '* \n' +
    '**************************************************************\n' +
    '*\n';

for (let flag = 0; flag < source.length; flag++) {
    banner += ('* (' + flag + ')' + source[flag] + '\n');
}
banner += '*\n' +
    '*/\n';
module.exports = function (grunt) {
    /*配置插件*/
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: { //合并代码
            options: {
                separator: '\n',
                stripBanners: true,
                banner: banner
            },
            target: {
                src: source,
                dest: 'build/clay-<%= pkg.version %>.js'
            }
        },
        jshint: { //语法检查
            options: { //语法检查配置
                '-W064': true,
                "strict": true,
                "eqnull": true,
                "undef": true,
                "globals": {
                    "window": true,
                    "navigator": true,
                    "document": true,
                    "console": true,
                    "module": true,
                    "setInterval": true,
                    "clearInterval": true,
                    "Math": true
                },
                "force": true, // 强制执行，即使出现错误也会执行下面的任务
                "reporterOutput": 'jshint.debug.txt' //将jshint校验的结果输出到文件
            },
            target: source
        },
        uglify: { //压缩代码
            options: {
                banner: banner
            },
            target: {
                options: {
                    mangle: true
                },
                files: [{
                    'build/clay-<%= pkg.version %>.min.js': ['build/clay-<%= pkg.version %>.js'],
                    'docs/clay-<%= pkg.version %>.min.js': ['build/clay-<%= pkg.version %>.js']
                }]
            }
        }
    });

    /*加载插件*/
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    /*注册任务*/
    grunt.registerTask('release', ['concat:target', 'jshint:target', 'uglify:target']);
};
