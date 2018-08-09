(function (window, undefined) {

    'use strict';

    // 返回计算线条路径函数
    window.quickES.svg.line = function () {

        var scope = {
            interpolate: 'line'
        };

        // 输入多个点的位置数据，返回对应的path标签的d属性值
        var line = function (points) {

            if (points && points.constructor === Array && points.length >= 2) {
                var d = "M" + scope.xback(points[0], 0) + " " + scope.yback(points[0], 0);
                if (scope.interpolate == 'line') {//折线图
                    d += "L";
                    var flag;
                    for (flag = 1; flag < points.length; flag++) {
                        d += scope.xback(points[flag], flag) + " " + scope.yback(points[flag], flag) + ",";
                    }
                    d = d.replace(/,$/, '');
                } else if (scope.interpolate == 'cardinal') {//三次cardinal插值法
                    d += "L";
                    var i, j, cardinal;
                    for (i = 0; i < points.length - 1; i++) {
                        // 基本点
                        var p1 = [scope.xback(points[i], i), scope.yback(points[i], i)];
                        var p2 = [scope.xback(points[i + 1], i + 1), scope.yback(points[i + 1], i + 1)];
                        // 辅助点
                        var p0 = (i == 0 ? p1 : [scope.xback(points[i - 1], i - 1), scope.yback(points[i - 1], i - 1)]);
                        var p3 = (i >= (points.length - 2) ? p2 : [scope.xback(points[i + 2], i + 2), scope.yback(points[i + 2], i + 2)]);
                        cardinal = window.quickES.math.cardinal().setPs(p0[0], p0[1], p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
                        for (j = p1[0]; j < p2[0]; j += 5) {
                            d += (j + " " + cardinal(j) + ",");
                        }
                        d += (p2[0] + " " + cardinal(p2[0]) + ",");
                    }
                    d = d.replace(/,$/, '');
                } else {
                    throw new Error('Unsupported interpolate!');
                }
                return d;
            } else {
                throw new Error('Unsupported data!');
            }

        };

        // 设置曲线插值方法
        line.interpolate = function (type) {

            scope.interpolate = type;
            return line;

        };

        // 设置计算x坐标的函数
        line.x = function (xback) {

            if (typeof xback === 'function') {
                scope.xback = xback;
            } else {
                throw new Error('Unsupported data!');
            }
            return line;

        };

        // 设置计算y坐标的函数
        line.y = function (yback) {

            if (typeof yback === 'function') {
                scope.yback = yback;
            } else {
                throw new Error('Unsupported data!');
            }
            return line;

        };


        return line;

    };

})(typeof window !== "undefined" ? window : this);