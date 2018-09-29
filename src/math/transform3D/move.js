// 沿着指定方向移动
clay.math.move = function () {

    var scope = {};

    // 根据移动距离返回移动后位置
    // flag表示是否把这次移动后位置标记为下次移动开始位置
    var move = function (d, flag) {

        if (scope.D && scope.P) {
            var temp = [
                scope.D[0] * d + scope.P[0],
                scope.D[1] * d + scope.P[1],
                scope.D[2] * d + scope.P[2]
            ];
            // 如果flag为true，标记为下次移动开始位置
            if (flag) {
                scope.P = temp;
            }
            return temp;
        } else {
            throw new Error('You shoud first set the direction and position!');
        }

    };

    // 设置点最初的位置
    move.setP = function (x, y, z) {

        if (typeof z !== 'number') z = 0;
        scope.P = [x, y, z];
        return move;

    };

    // 设置移动方向
    move.setD = function (a, b, c) {

        if (typeof c !== 'number') c = 0;
        if (a == 0 && b == 0 && c == 0) {
            scope.D = [0, 0, 0];
        } else {
            var temp = Math.sqrt(a * a + b * b + c * c);
            scope.D = [a / temp, b / temp, c / temp];
        }
        return move;

    };

    return move;

};
