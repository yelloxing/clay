/**
 * 围绕任意射线旋转
 * -----------------------
 * 针对xOy平面的旋转是简单的
 * 因此计算的思路是：
 *  1.把旋转变换成xOy平面的旋转
 *  2.按照xOy面的旋转方法进行旋转
 *  3.旋转后的结果通过乘上之前变换的逆矩阵得到最终解
 *
 * 因此主要是求解二个矩阵：
 *  1.任意射线变成OZ轴变换矩阵
 *  2.OZ轴变回原来的射线的变换矩阵
 *  (该部分的计算在纸面上完成，代码中直接使用计算结果)
 *
 * 旋转方向由右手法则确定
 */
clay.math.rotate = function () {

    var scope = {};

    // 旋转方向满足右手法则
    // flag表示是否把这次旋转后位置标记为下次旋转开始位置
    // deg采用弧度值单位
    var rotate = function (deg, flag) {

        if (scope.M && scope.P) {
            var x = scope.M.A[0][0] * scope.P[0] + scope.M.A[0][1] * scope.P[1] + scope.M.A[0][2] * scope.P[2] + scope.M.A[0][3],
                y = scope.M.A[1][0] * scope.P[0] + scope.M.A[1][1] * scope.P[1] + scope.M.A[1][2] * scope.P[2] + scope.M.A[1][3],
                z = scope.M.A[2][0] * scope.P[0] + scope.M.A[2][1] * scope.P[1] + scope.M.A[2][2] * scope.P[2] + scope.M.A[2][3],
                cos = Math.cos(deg),
                sin = Math.sin(deg);
            var t = x * cos - y * sin;
            y = x * sin + y * cos;
            x = t;
            var temp = [
                scope.M.B[0][0] * x + scope.M.B[0][1] * y + scope.M.B[0][2] * z + scope.M.B[0][3],
                scope.M.B[1][0] * x + scope.M.B[1][1] * y + scope.M.B[1][2] * z + scope.M.B[1][3],
                scope.M.B[2][0] * x + scope.M.B[2][1] * y + scope.M.B[2][2] * z + scope.M.B[2][3]
            ];
            temp[0] = Math.round(temp[0] * 100000000000000) / 100000000000000;
            temp[1] = Math.round(temp[1] * 100000000000000) / 100000000000000;
            temp[2] = Math.round(temp[2] * 100000000000000) / 100000000000000;
            // 如果flag为true，标记为下次旋转开始位置
            if (flag) {
                scope.P = temp;
            }
            return temp;
        } else {
            throw new Error('You shoud first set the ray and position!');
        }
    };

    // 设置旋转射线
    // (a1,b1,c1)->(a2,b2,c2)
    rotate.setL = function (a1, b1, c1, a2, b2, c2) {

        if (typeof a1 === 'number' && typeof b1 === 'number') {

            // 如果设置二个点
            // 表示二维上围绕某个点旋转
            if (typeof c1 !== 'number') {
                c1 = 0; a2 = a1; b2 = b1; c2 = 1;
            }
            // 只设置三个点(设置不足六个点都认为只设置了三个点)
            // 表示围绕从原点出发的射线旋转
            else if (typeof a2 !== 'number' || typeof b2 !== 'number' || typeof c2 !== 'number') {
                a2 = a1; b2 = b1; c2 = c1; a1 = 0; b1 = 0; c1 = 0;
            }

            if (a1 == a2 && b1 == b2 && c1 == c2) throw new Error('It\'s not a legitimate ray!');

            var sqrt1 = Math.sqrt((a2 - a1) * (a2 - a1) + (b2 - b1) * (b2 - b1)),
                cos1 = sqrt1 != 0 ? (b2 - b1) / sqrt1 : 1,
                sin1 = sqrt1 != 0 ? (a2 - a1) / sqrt1 : 0,
                b = (a2 - a1) * sin1 + (b2 - b1) * cos1,
                c = c2 - c1,
                sqrt2 = Math.sqrt(b * b + c * c),
                cos2 = sqrt2 != 0 ? c / sqrt2 : 1,
                sin2 = sqrt2 != 0 ? b / sqrt2 : 0;
            //旋转矩阵
            scope.M = {
                // 任意射线变成OZ轴变换矩阵
                A: [
                    [cos1, -sin1, 0, b1 * sin1 - a1 * cos1],
                    [cos2 * sin1, cos1 * cos2, -sin2, c1 * sin2 - a1 * sin1 * cos2 - b1 * cos1 * cos2],
                    [sin1 * sin2, cos1 * sin2, cos2, -a1 * sin1 * sin2 - b1 * cos1 * sin2 - c1 * cos2]
                ],
                // OZ轴变回原来的射线的变换矩阵
                B: [
                    [cos1, cos2 * sin1, sin1 * sin2, a1],
                    [-sin1, cos2 * cos1, cos1 * sin2, b1],
                    [0, -sin2, cos2, c1]
                ]
            };

        } else {
            throw new Error('a1 and b1 is required!');
        }
        return rotate;

    };

    // 设置点最初的位置
    rotate.setP = function (x, y, z) {

        if (typeof z !== 'number') z = 0;
        scope.P = [x, y, z];
        return rotate;

    };

    return rotate;

};
