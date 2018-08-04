/*!
*
* quickES - Help quickly use ES.
* https://github.com/yelloxing/quickES
* 
* author 心叶
*
* version 1.0.0
* 
* build 2018/07/29
*
* Copyright yelloxing
* Released under the MIT license
* 
**************************************************************
* 
*【内容】
*
* 1.不同浏览器兼容的常用方法
*
* 2.常用的自定义方法
*
* 【说明】
*
* 兼容不同浏览器的接口，提供常用的辅助方法，只是针对常用的，目标是轻量级。
*
* 【打包文件】
* (0)./src/core.js
* (1)./src/config.js
*
*/
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
(function (window, undefined) {

    'use strict';

    window.quickES.namespace = {
        svg: "http://www.w3.org/2000/svg",
        xhtml: "http://www.w3.org/1999/xhtml",
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/"
    };

})(typeof window !== "undefined" ? window : this);