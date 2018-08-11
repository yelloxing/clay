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
    var clay = {
        "author": "心叶",
        "email": "yelloxing@gmail.com"
    };

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

    // 挂载到全局
    window.clay = window.$$ = clay;

    return clay;

});