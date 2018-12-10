/**
 * 配置
 */
(function (window, $$) {

    'use strict';

    // http请求
    $$.config("$httpProvider", ["$browser", function ($browser) {
        return {
            "headers": {
                'Content-Type': 'application/json'
            },
            "timeout": 7000,
            "context": "/data/",
            "request": function (config) {
                return config;
            },
            "success": function (data, doback) {
                doback(data);
            },
            "error": function (error, doback) {
                doback(error);
            }
        };
    }]);

    // 配置sizzle选择器
    // 因为内置选择器比较弱，如果想用高级的，可以引入第三方库，进行配置
    $$.config("$sizzleProvider", function () {
        return function (selector, context) {
            // 配置新的查找方法
            return document.getElementsByTagName('meta');
        };
    });

})(window, window.clay);
