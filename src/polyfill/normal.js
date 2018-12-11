// 获取函数名称
// 部分浏览器不支持
if ('name' in Function.prototype === false) {
    Object.defineProperty(Function.prototype, 'name', {
        get: function () {
            return this.toString().match(/^\s*function\s*([^\(\s]*)/)[1];
        }
    });
}
