'use strict';

var source = [

    // 配置
    './src/config.js',

    // 结点
    './src/node/sizzle.js',
    './src/node/modify.js',
    './src/node/data.js',
    './src/node/event.js',

    // 区域
    './src/region/modify.js',
    './src/region/index.js',

    // 工具
    './src/tool/animation.js',
    './src/tool/calc.js',

    // 数学计算
    './src/math/interpolate/Hermite.js',
    './src/math/interpolate/Cardinal.js',
    './src/math/transform3D/rotate.js',
    './src/math/transform3D/move.js',
    './src/math/transform3D/scale.js',

    // 映射计算
    './src/scale/map/ploar.js',
    './src/scale/map/index.js',

    // 布局
    './src/layout/tree.js',

    // 图形对象
    './src/painter/canvas.js',
    './src/painter/arc.js',
    './src/painter/ruler.js',

    // svg绘图
    './src/painter/svg/arc.js',
    './src/painter/svg/arcRuler.js',
    './src/painter/svg/lineRuler.js',

    // Canvas2D绘图
    './src/painter/canvas/arc.js',
    './src/painter/canvas/arcRuler.js',
    './src/painter/canvas/lineRuler.js'

];

var banner = '/*!\n*\n' +
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
                dest: 'build/clay.js'
            }
        },
        build: {//自定义插入合并
            target: {
                banner: banner,
                src: 'build/clay.js',
                dest: ['build/clay-<%= pkg.version %>.js', 'test/libs/clay.js']
            }
        },
        clean: {// 删除临时文件
            target: {
                src: ['build/clay.js']
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
                    "HTMLCollection": true,
                    "CanvasRenderingContext2D": true,
                    "NodeList": true,
                    "clay": true
                },
                "force": true, // 强制执行，即使出现错误也会执行下面的任务
                "reporterOutput": 'jshint.debug.txt' //将jshint校验的结果输出到文件
            },
            target: 'build/clay-<%= pkg.version %>.js'
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
                    'build/clay-<%= pkg.version %>.min.js': ['build/clay-<%= pkg.version %>.js']
                }]
            }
        },
        qunit: {//单元测试
            target: {
                options: {
                    httpBase: "http://localhost:30001",
                    force: true,//一个任务失败了依旧不停止
                    urls: [
                        'test/data/node.html',
                        'test/data/data.html',
                        'test/data/math.html'
                    ]
                }
            }
        },
        connect: {
            target: {//给单元测试用的服务器
                options: {
                    port: 30001,
                    base: '.'
                }
            },
            local: {//服务器
                options: {
                    port: 30000,
                    base: '.',
                    keepalive: true
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

    // clay特殊的任务
    grunt.loadTasks("build/tasks");

    /*注册任务*/
    grunt.registerTask('release', ['concat:target', 'build:target', 'clean:target', 'jshint:target', 'uglify:target']);
    grunt.registerTask('test', ['connect:target', 'qunit:target']);
    grunt.registerTask('server', ['connect:local']);
};
