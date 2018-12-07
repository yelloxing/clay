/**
 * 组件用例
 * 用于测试自定义组件相关问题
 */
(function (window, $$) {

    'use strict';

    $$.component("example", ["browser", "IE", function (browser, ie) {
        return function (element, attr, $scope) {

            console.log(element, attr, $scope);

            // 监听数据改变
            $scope.$watch("key1", function (olddata, newdata) {
                console.log(olddata, newdata);
            });

        };
    }]);

})(window, window.clay);
