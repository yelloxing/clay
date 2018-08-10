(function (window, undefined) {

    'use strict';


    // 返回计算渐变数值的函数
    window.quickES.math.ease = function (type) {

        var cubicBezier = /^cubic-bezier\((-?\d*\.?\d+), *(-?\d*\.?\d+), *(-?\d*\.?\d+), *(-?\d*\.?\d+)\)$/;

        // 按照浏览器提供的css动画渐变定义
        var defined = {
            'ease': 'cubic-bezier(0.25, 0.1, 0.25, 1.01)',
            'ease-in': 'cubic-bezier(0.42, 0, 1, 1)',
            'ease-in-out': 'cubic-bezier(0.42, 0, 0.57, 1.01)',
            'ease-out': 'cubic-bezier(0, 0, 0.58, 1)'
        };

        if (type == 'linear') {//普通的线性变化
            return function (deep) {
                return deep;
            };
        } else if (cubicBezier.test(type)) {//Hermite拟合法
            var point = cubicBezier.exec(type);
            if (point[1] > 0) {
                point[1] = -point[1];
                point[2] = -point[2];
            }
            if (point[3] < 1) {
                point[3] = 2 - point[3];
                point[4] = 2 - point[4];
            }
            return window.quickES.math.cardinal().setU(-1).setPs(
                point[1], point[2],
                0, 0,
                100, 100,
                point[3] * 100, point[4] * 100
            );
        } else if (defined[type]) {//预定义固定参数的Hermite拟合法
            return window.quickES.math.ease(defined[type]);
        } else {
            return function () {
                return 100;
            };
        }

    };

})(typeof window !== "undefined" ? window : this);