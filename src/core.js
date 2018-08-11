(function (global, factory, undefined) {

    'use strict';

    if (global && global.document) {

        // 如果是浏览器环境
        factory(global);

    } else if (typeof module === "object" && typeof module.exports === "object") {

        // 如果是node.js环境
        module.exports = factory(global, true);

    } else {
        throw new Error("Unexcepted Error!");
    }

})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
    'use strict';

    var clay = function (selector, content) {

        if (typeof selector === 'function') {
            if (clay.__isLoad__) {
                selector();
            } else {
                if (document.addEventListener) {//Mozilla, Opera and webkit
                    document.addEventListener("DOMContentLoaded", function doListenter() {
                        document.removeEventListener("DOMContentLoaded", doListenter, false);
                        selector();
                        clay.__isLoad__ = true;
                    });
                } else if (document.attachEvent) {//IE
                    document.attachEvent("onreadystatechange", function doListenter() {
                        if (document.readyState === "complete") {
                            document.detachEvent("onreadystatechange", doListenter);
                            selector();
                            clay.__isLoad__ = true;
                        }
                    });
                }
            }
            return window.clay;
        } else {
            return window.clay.selectAll(selector, content);
        }

    };

    // 定义基本信息
    clay.author = "心叶";
    clay.email = "yelloxing@gmail.com";

    // 如果全局有重名，可以调用恢复
    var _clay = window.clay,
        _$$ = window.$$;
    clay.noConflict = function (flag) {
        if (window.$$ === clay) {
            window.$$ = _$$;
        }
        if (flag && window.clay === clay) {
            window.clay = _clay;
        }
        return clay;
    };

    // 标记页面是否加载完毕
    clay.__isLoad__ = false;

    // 挂载到全局
    window.clay = window.$$ = clay;

    return clay;

});