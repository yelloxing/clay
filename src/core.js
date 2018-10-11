(function (global, factory) {

    'use strict';

    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory(global);
    } else {
        factory(global);
    }

})(typeof window !== "undefined" ? window : this, function (global, undefined) {

    'use strict';

    var clay = function (selector, context) {
        return new clay.prototype.init(selector, context);
    }, __isLoad__;

    clay.prototype.init = function (selector, context) {

        if (typeof selector === 'function') {
            if (__isLoad__) {
                selector();
            } else {
                if (document.addEventListener) {//Mozilla, Opera and webkit
                    document.addEventListener("DOMContentLoaded", function doListenter() {
                        document.removeEventListener("DOMContentLoaded", doListenter, false);
                        selector();
                        __isLoad__ = true;
                    });
                } else if (document.attachEvent) {//IE
                    document.attachEvent("onreadystatechange", function doListenter() {
                        if (document.readyState === "complete") {
                            document.detachEvent("onreadystatechange", doListenter);
                            selector();
                            __isLoad__ = true;
                        }
                    });
                }
            }
        } else {
            this.context = context = context || document;
            var nodes = _sizzle(selector, context), flag;
            for (flag = 0; flag < nodes.length; flag++) {
                this[flag] = nodes[flag];
            }
            this.selector = selector;
            this.length = nodes.length;
        }
        return this;

    };

    clay.prototype.extend = clay.extend = function () {

        var target = arguments[0] || {},
            source = arguments[1] || {},
            length = arguments.length;

        //如果只有一个参数，目标对象是自己
        if (length === 1) {
            source = target;
            target = this;
        }

        //如果目标不是对象或函数，则初始化为空对象
        if (typeof target !== "object" && typeof target !== 'function')
            target = {};

        for (var key in source) {
            if (target[key]) console.warn('Extension may lead to coverage！');
            target[key] = source[key];
        }

        return target;
    };

    clay.prototype.init.prototype = clay.prototype;

    // @CODE build.js inserts compiled clay here

    __isLoad__ = false;

    clay.author = '心叶';
    clay.email = 'yelloxing@gmail.com';
    clay.version = '1.2.4';

    global.clay = global.$$ = clay;

    return clay;

});
