(function (window, undefined) {

    'use strict';

    // 把数据转换为方便画数轴的数据
    window.clay.axisLayout = function () {

        var scope = {
            num: 10,
            width: 700
        };

        var axisLayout = function (scaleLinear) {

            var domain = scaleLinear.domain(), resultData = [], flag;
            var pw = scope.width / (scope.num - 1);
            var dw = (domain[1] - domain[0]) / (scope.num - 1);
            for (flag = 0; flag < scope.num; flag++) {
                resultData[flag] = {
                    "p": pw * (flag),
                    "v": scaleLinear(domain[0] + dw * flag)
                };
                if (scope.dot || scope.dot == 0) {
                    resultData[flag].v = (resultData[flag].v).toFixed(scope.dot);
                }
            }
            return resultData;

        };

        // 设置刻度个数
        axisLayout.setNum = function (num) {

            if (!num || typeof num != 'number') {
                throw new Error('A number is expected!');
            }
            scope.num = num;
            return axisLayout;

        };

        // 设置刻度尺长度
        axisLayout.setWidth = function (width) {

            if (!width || typeof width != 'number') {
                throw new Error('A number is expected!');
            }
            scope.width = width;
            return axisLayout;

        };

        // 设置小数点个数
        axisLayout.setDot = function (dot) {

            if ((!dot || typeof dot != 'number') && dot != 0) {
                throw new Error('A number is expected!');
            }
            scope.dot = dot;
            return axisLayout;

        };

        return axisLayout;

    };

})(typeof window !== "undefined" ? window : this);