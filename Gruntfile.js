'use strict';

var banner = '/*!\n' +
    '*\n' +
    '* quickES - Help quickly use ES.\n' +
    '* https://github.com/yelloxing/quickES\n' +
    '* \n' +
    '* author <%= pkg.author %>\n' +
    '*\n' +
    '* version <%= pkg.version %>\n' +
    '* \n' +
    '* build 2018/07/29\n' +
    '*\n' +
    '* Copyright yelloxing\n' +
    '* Released under the MIT license\n' +
    '* \n' +
    '**************************************************************\n' +
    '* \n' +
    '*【内容】\n' +
    '*\n' +
    '* 1.不同浏览器兼容的常用方法\n' +
    '*\n' +
    '* 2.常用的自定义方法\n' +
    '*\n' +
    '* 【说明】\n' +
    '*\n' +
    '* 兼容不同浏览器的接口，提供常用的辅助方法，只是针对常用的，目标是轻量级。\n' +
    '*\n' +
    '*/'

var source = [
    './src/core.js'
];
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
                dest: 'build/lib-<%= pkg.version %>.js'
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
                    "console": true
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
                    'build/lib-<%= pkg.version %>.min.js': ['build/lib-<%= pkg.version %>.js']
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
