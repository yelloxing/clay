(function (window, undefined) {

    'use strict';

    // 返回线性比例尺
    window.quickES.scaleLinear = function () {

        var scope = {};

        // 返回比例尺计算后的值
        function scaleLinear(domain) {
            if (typeof domain === 'number') {
                if (!scope.scaleCalc) {
                    throw new Error('You shoud first set the domain and range!');
                } else if (domain <= scope.domains[0]) {
                    return scope.ranges[0];
                } else if (domain >= scope.domains[1]) {
                    return scope.ranges[1];
                } else {
                    return (domain - scope.domains[0]) * scope.scaleCalc + scope.ranges[0];
                }
            } else {
                throw new Error('A number is required!');
            }
        };

        // 获取或设置定义域
        scaleLinear.domain = function (domains) {
            if (!domains || domains.constructor !== Array || typeof domains[0] !== 'number' || typeof domains[1] !== 'number') {
                throw new Error('Unsupported data!');
            }
            scope.domains = domains;
            if (scope.ranges) {
                scope.scaleCalc = (scope.ranges[1] - scope.ranges[0]) / (scope.domains[1] - scope.domains[0]);
            }
            return this;
        };

        // 定义或设置值域
        scaleLinear.range = function (ranges) {
            if (!ranges || ranges.constructor !== Array || typeof ranges[0] !== 'number' || typeof ranges[1] !== 'number') {
                throw new Error('Unsupported data!');
            }
            scope.ranges = ranges;
            if (scope.domains) {
                scope.scaleCalc = (scope.ranges[1] - scope.ranges[0]) / (scope.domains[1] - scope.domains[0]);
            }
            return this;
        };

        return scaleLinear;
    };

})(typeof window !== "undefined" ? window : this);