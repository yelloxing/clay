/**
 * 确定应用目标以后
 * 启动编译并应用
 */
clay.prototype.use = function (name, config) {
    // 添加监听方法
    config.$watch = function (key, doback) {
        var val = config[key];
        Object.defineProperty(config, key, {
            get: function () {
                return val;
            },
            set: function (newVal) {
                doback(newVal, val);
                val = newVal;
            }
        });
    };
    _component[name](this, config);
};
