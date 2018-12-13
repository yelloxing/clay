'use strict';

var source = [

    /**
     * 核心代码
     */
    './src/config.js',
    './src/sizzle.js',
    './src/modify.js',
    './src/data.js',
    './src/event.js',

    /**
     * 兼容性
     */
    './src/polyfill/browser.js',
    './src/polyfill/normal.js',
    './src/polyfill/innerHTML.js',
    './src/polyfill/event.js',

    /**
     * 工具类
     */
    './src/Tools/animation.js',
    './src/Tools/tool.js',
    './src/Tools/ajax.js',

    /**
     * 高效独立对象
     */
    './src/Tools/region.js',
    './src/Tools/canvas.js',

    /**
     * 变换矩阵4x4
     */
    './src/Matrix4/move.js',
    './src/Matrix4/rotate.js',
    './src/Matrix4/scale.js',
    './src/Matrix4/transform.js',
    './src/Matrix4/index.js',

    /**
     * 基础计算
     */
    './src/calculate/interpolate/Hermite.js',
    './src/calculate/interpolate/Cardinal.js',
    './src/calculate/interpolate/catmull-rom.js',
    './src/calculate/map.js',
    './src/calculate/transform.js',

    /**
     * 2D图形
     */
    './src/graphics/index.js',
    './src/graphics/arc.js',
    './src/graphics/rect.js',
    './src/graphics/line.js',
    './src/graphics/text.js',
    './src/graphics/bezier.js',
    './src/graphics/polygon.js',

    /**
     * 布局
     */
    './src/layout/tree.js',
    './src/layout/pie.js',

    /**
     * 扩展
     */
    './src/extend/compiler.js',
    './src/extend/component.js',
    './src/extend/config.js'

];

var banner = '/*!\n' +
    '* <%= pkg.name %> - <%= pkg.description %>\n' +
    '* <%= pkg.repository.url %>\n' +
    '* \n' +
    '* author <%= pkg.author %>\n' +
    '*\n' +
    '* version <%= pkg.version %>\n' +
    '* \n' +
    '* build Sun Jul 29 2018\n' +
    '*\n' +
    '* Copyright yelloxing\n' +
    '* Released under the <%= pkg.license %> license\n' +
    '* \n' +
    '* Date:' + new Date() + '\n' +
    '*/\n';

module.exports = function (grunt) {
    /*配置插件*/
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: { //合并代码
            options: {
                separator: '\n',
                stripBanners: true
            },
            target: {
                src: source,
                dest: 'build/.temp'
            }
        },
        build: {//自定义插入合并
            target: {
                banner: banner,
                src: 'build/.temp',
                info: ['<%= pkg.version %>', '<%= pkg.author %>', '<%= pkg.email %>'],
                dest: ['build/<%= pkg.name %>.js']
            }
        },
        clean: {// 删除临时文件
            target: {
                src: ['build/.temp']
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
                    "Math": true,
                    "SVGElement": true,
                    "HTMLCollection": true,
                    "CanvasRenderingContext2D": true,
                    "WebGLRenderingContext": true,
                    "NodeList": true,
                    "XMLHttpRequest": true,
                    "SVGSVGElement": true,
                    "ActiveXObject": true,
                    "<%= pkg.name %>": true,
                    "Event": true,
                    "define": true,
                    "exports": true
                },
                "force": true, // 强制执行，即使出现错误也会执行下面的任务
                "reporterOutput": 'jshint.debug.txt' //将jshint校验的结果输出到文件
            },
            target: 'build/<%= pkg.name %>.js'
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
                    'build/<%= pkg.name %>.min.js': ['build/<%= pkg.name %>.js']
                }]
            }
        },
        qunit: {//单元测试
            target: {
                options: {
                    httpBase: "http://localhost:30000",
                    force: true,//一个任务失败了依旧不停止
                    urls: [
                        'test/unit/node.html',
                        'test/unit/data.html',
                        'test/unit/calculate.html'
                    ]
                }
            }
        },
        connect: {
            target: {//给单元测试用的服务器
                options: {
                    port: 30000,
                    base: '.'
                }
            },
            server: {//本地服务器
                options: {
                    keepalive: true,
                    port: 20000,
                    base: '.'
                }
            }
        }
    });

    /*加载插件*/
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // <%= pkg.name %>特殊的任务
    grunt.loadTasks("build/tasks");

    /*注册任务*/
    grunt.registerTask('release', ['concat:target', 'build:target', 'clean:target', 'jshint:target', 'uglify:target']);
    grunt.registerTask('test', ['connect:target', 'qunit:target']);
    grunt.registerTask('server', ['connect:server']);
};
