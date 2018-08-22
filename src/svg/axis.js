(function (window, undefined) {

    'use strict';

    // 返回数轴
    window.clay.svg.axis = function (scaleLinear, num, width, dot) {

        var scope = {
            "d": 'horizontal'
        };

        var axisLayout = window.clay.axisLayout();

        var axis = function (scaleLinear) {

            var tempLayout = axisLayout(scaleLinear), flag;
            var resultData='';
            if (scope.d == 'horizontal') {
                resultData += '<g fill="none" font-size="10" font-family="sans-serif" text-anchor="middle">';
                resultData += '<path stroke="#000" d="M0.5,0V0.5H' + (tempLayout[tempLayout.length - 1].p - (-0.5)) + 'V0"></path>';
                for (flag = 0; flag < tempLayout.length; flag++) {
                    resultData += '<g opacity="1" transform="translate(' + tempLayout[flag].p + ',0)">';
                    resultData += '   <line stroke="#000" y2="6"></line>';
                    resultData += '   <text fill="#000" y="9" dy="0.71em">' + tempLayout[flag].v + '</text>';
                    resultData += '</g>';
                }
            } else {
                resultData += '<g fill="none" font-size="10" font-family="sans-serif" text-anchor="end">';
                resultData += '<path stroke="#000" d="M6,0.5H6.5V' + (tempLayout[tempLayout.length - 1].p - 0.5) + 'H6"></path>';
                for (flag = 0; flag < tempLayout.length; flag++) {
                    resultData += '<g opacity="1" transform="translate(0,' + tempLayout[flag].p + ')">';
                    resultData += '   <line stroke="#000" x2="6"></line>';
                    resultData += '   <text fill="#000" x="-10" y="4" dx="0.71em">' + tempLayout[tempLayout.length - flag - 1].v + '</text>';
                    resultData += '</g>';
                }
            }
            resultData += '</g>';
            return resultData;

        };

        // 设置刻度尺是垂直的还是水平的
        axis.setDir = function (d) {

            if (d == 'vertical' || d == 'horizontal') {
                scope.d = d;
            }
            return axis;

        };

        // 设置刻度个数
        axis.setNum = function (num) {

            if (num && num <= 1) num = 2;
            axisLayout.setNum(num);
            return axis;

        };

        // 设置刻度尺长度
        axis.setWidth = function (width) {

            axisLayout.setWidth(width);
            return axis;

        };

        // 设置小数点个数
        axis.setDot = function (dot) {

            axisLayout.setDot(dot);
            return axis;

        };

        return axis;

    };

})(typeof window !== "undefined" ? window : this);