/**
 * 一个特殊的用来合并项目代码的插件
 * 额外合并的代码或自定义插入
 * 都应该在这里添加或调整
 */
module.exports = function (grunt) {

    "use strict";

    var srcFolder = __dirname + "/../../",
        read = function (fileName) {
            return grunt.file.read(srcFolder + fileName);
        },
        // 寻找插入点
        core = read("src/core.js").split(/\/\/ @CODE build.js inserts compiled clay.js here/),
        config = {
            wrap: {
                start: core[0],
                end: core[1]
            }
        };

    // 注册自定义grunt任务
    grunt.registerMultiTask(
        'build',
        'Concatenate source!',
        function () {
            var src = this.data.src,
                srcData = read(src),
                name = this.data.dest,
                banner = this.data.banner,
                targetData = banner +
                    config.wrap.start +
                    srcData +
                    "\n    clay.version = '" + this.data.info[0] + "';" +
                    "\n    clay.author = '" + this.data.info[1] + "';" +
                    "\n    clay.email = '" + this.data.info[2] + "';" +
                    config.wrap.end, flag;
            for (flag = 0; flag < name.length; flag++) {
                grunt.file.write(name[flag], targetData);
            }
        }
    );
};
