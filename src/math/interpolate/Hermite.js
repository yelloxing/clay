// Hermite三次插值
clay.math.hermite = function () {

    var scope = { "u": 0.5 };

    // 根据x值返回y值
    var hermite = function (x) {

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
    hermite.setU = function (t) {

        if (typeof t === 'number') {
            scope.u = (1 - t) * 0.5;
        } else {
            throw new Error('Expecting a figure!');
        }
        return hermite;

    };

    // 设置点的位置
    hermite.setP = function (x1, y1, x2, y2, s1, s2) {

        if (x1 < x2) {
            // 记录原始尺寸
            scope.a = x1; scope.b = x2;
            var p3 = scope.u * s1,
                p4 = scope.u * s2;
            // 缩放到[0,1]定义域
            y1 /= (x2 - x1);
            y2 /= (x2 - x1);
            // MR是提前计算好的多项式通解矩阵
            // 为了加速计算
            // 如上面说的
            // 统一在[0,1]上计算后再通过缩放和移动恢复
            // 避免了动态求解矩阵的麻烦
            scope.MR = [
                2 * y1 - 2 * y2 + p3 + p4,
                3 * y2 - 3 * y1 - 2 * p3 - p4,
                p3,
                y1
            ];
        } else {
            throw new Error('The point position should be increamented!');
        }
        return hermite;

    };

    return hermite;
};
