'use strict';

let banner = '/*!\n' +
    '* clay.js - <%= pkg.description %>\n' +
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

// 打包文件
const source = [

    /**
     * 核心代码
     */
    './src/config.js',
    './src/tool.js',
    './src/sizzle.js',
    './src/modify.js',
    './src/data.js',
    './src/event.js',

    /**
     * 兼容性
     */
    './src/polyfill/svg.innerHTML.js',

    /**
     * 工具类
     */
    './src/Tools/animation.js',
    './src/Tools/tool.js',

    /**
     * 高效独立对象
     */
    './src/Tools/region.js',
    './src/Tools/canvas.js',

    /**
     * 变换矩阵4x4
     */
    './src/Matrix4/basic.calc.js',
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
     * webgl
     */
    './src/webgl/shader.js',
    './src/webgl/buffer.js',
    './src/webgl/texture.js',
    './src/webgl/index.js',

    /**
     * 布局
     */
    './src/layout/tree.js',

    /**
     * 加强
     */
    './src/enhance/config.js'

];

// 需要单元测试文件
const unit_file = [
    'test/unit/node.html',
    'test/unit/data.html',
    'test/unit/calculate.html'
];

module.exports = function (grunt) {

    // 独立配置文件
    const jshint_options = grunt.file.readJSON('jshint.json');

    /*配置插件*/
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        insert: { // 合并插入
            options: {
                banner: banner,
                link: ""
            },
            target: {
                options: {
                    separator: '// @CODE build.js inserts compiled clay.js here',
                    target: 'src/core.js'
                },
                files: {
                    'build/<%= pkg.name %>.js': source
                }
            }
        },
        jshint: { //语法检查
            options: jshint_options,
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
                    urls: unit_file
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
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-plug-insert');

    /*注册任务*/
    grunt.registerTask('release', ['insert:target', 'jshint:target', 'uglify:target']);
    grunt.registerTask('test', ['connect:target', 'qunit:target']);
    grunt.registerTask('server', ['connect:server']);
};
