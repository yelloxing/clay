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

    // 定义挂载对象
    var quickES = {
        "author": "心叶",
        "email": "yelloxing@gmail.com"
    };

    // 如果全局有重名，可以调用恢复
    var _quickES = window.quickES,
        _$$ = window.$$;
    quickES.noConflict = function (flag) {
        if (window.$$ === quickES) {
            window.$$ = _$$;
        }
        if (flag && window.quickES === quickES) {
            window.quickES = _quickES;
        }
        return quickES;
    };

    // 挂载到全局
    window.quickES = window.$$ = quickES;

    return quickES;

});