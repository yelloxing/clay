// 可注入内部服务
var _service = {
    "$browser": {
        "type": _browser,
        "IE": _IE
    }
};

// 常用方法
var _this = {
    "toNode": _toNode
};

/**
 * 确定应用目标以后
 * 启动编译并应用
 */
clay.prototype.use = function (name, config) {

    // 销毁之前的
    if (this[0]._component) _component[this[0]._component].beforeDestory.apply(_this, [this]);

    // 使用组件前，在结点中记录一下
    this[0]._component = name;

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

    // 组件创建前
    if (typeof _component[name].beforeCreate == 'function') _component[name].beforeCreate.apply(_this, [this]);

    // 启动组件
    _component[name].link.apply(_this, [this, config]);
    return this;
};

// 主动销毁
clay.prototype.destory = function () {
    if (this[0]._component) _component[this[0]._component].beforeDestory.apply(_this, [this]);
    return this;
};
