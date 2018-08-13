(function (window, undefined) {

    'use strict';


    // 返回计算渐变数值的函数
    window.clay.math.ease = function (type) {

        var cubicBezier = /^cubic-bezier\( *(-?\d*\.?\d+) *, *(-?\d*\.?\d+) *, *(-?\d*\.?\d+) *, *(-?\d*\.?\d+) *\)$/;

        type = type.trim();

        if (type == 'linear') {//普通的线性变化
            return function (deep) {
                return deep;
            };
        } else if (cubicBezier.test(type)) {//Hermite拟合法
            var point = cubicBezier.exec(type);
            // 点计算对应具体计算方式修改
            point[1] += 1;
            point[2] += 1;
            point[3] -= 1;
            point[4] -= 1;

            // 健壮性判断
            var p;
            if (point[1] > 0) {
                point[1] = 0;
                point[2] = point[2] - (1 - point[2]) * point[1] / (1 - point[1]);
            }
            if (point[3] < 1) {
                point[3] = 1;
                point[4] = point[4] / point[3];
            }
            return window.clay.math.cardinal().setU(-1).setPs(
                point[1], point[2],
                0, 0,
                100, 100,
                point[3] * 100, point[4] * 100
            );
        } else {
            return function () {
                return 100;
            };
        }

    };

})(typeof window !== "undefined" ? window : this);