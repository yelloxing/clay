/**
 * 组件用例
 * 用于测试自定义组件相关问题
 */
(function (window, $$) {

    'use strict';

    $$.component("ui-example", ["browser", "IE", function (browser, ie) {
        return {
            restrict: "EA",
            link: function (element) {
                console.log(element);
            }
        };
    }]);

})(window, window.clay);
