'use strict';

var source = [
    './src/core.js',
    './src/config.js',

    // 基本的结点操作
    './src/node/sizzle.js',
    './src/node/modify.js',
    './src/node/data.js',

    // 数学计算
    './src/math/interpolate/Hermite.js'
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
                "strict": false,
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
                    "clay":true
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
                    'build/clay-<%= pkg.version %>.min.js': ['build/clay-<%= pkg.version %>.js']
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
