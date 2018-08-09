(function (window, undefined) {

    'use strict';

    // 三次多项式的cardinal插值
    window.quickES.math.cardinal = function () {

        var scope = {
            "u": 0.5,
            "M": [
                [2, -2, 1, 1],
                [-3, 3, -2, -1],
                [0, 0, 1, 0],
                [1, 0, 0, 0]
            ]
        };

        // 根据x值返回y值
        var cardinal = function (x) {

            if (scope.MR) {
                var sx = (x - scope.a) / (scope.b - scope.a),
                    sx2 = sx * sx,
                    sx3 = sx * sx2;
                var sResult = sx3 * scope.MR[0] + sx2 * scope.MR[1] + sx * scope.MR[2] + scope.MR[3];
                return sResult * (scope.b - scope.a);
            } else {
                throw new Error('You shoud first set the position!');
            }

        };

        // 设置张弛系数【应该在点的位置设置前设置】
        cardinal.setU = function (t) {

            if (typeof t === 'number') {
                scope.u = (1 - t) * 0.5;
            } else {
                throw new Error('Unsupported data!');
            }
            return cardinal;

        };

        // 设置点的位置
        cardinal.setPs = function (x0, y0, x1, y1, x2, y2, x3, y3) {

            if (x0 <= x1 && x1 < x2 && x2 <= x3) {
                // 记录原始尺寸
                scope.a = x1; scope.b = x2;
                var p3 = scope.u * (y2 - y0) / (x2 - x0),
                    p4 = scope.u * (y3 - y1) / (x3 - x1);
                // 缩放到[0,1]定义域
                y1 /= (x2 - x1);
                y2 /= (x2 - x1);
                scope.MR = [
                    2 * y1 - 2 * y2 + p3 + p4,
                    3 * y2 - 3 * y1 - 2 * p3 - p4,
                    p3,
                    y1
                ];
            } else {
                throw new Error('Unsupported data!');
            }
            return cardinal;

        };

        return cardinal;

    };

})(typeof window !== "undefined" ? window : this);