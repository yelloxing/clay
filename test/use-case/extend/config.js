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

})(window, window.clay);
