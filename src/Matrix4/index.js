/**
 * 4x4矩阵
 * 列主序存储
 */
clay.Matrix4 = function (initMatrix4) {

    var matrix4 = initMatrix4 || [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];

    var matrix4Obj = {

        // 移动
        "move": function (dis, a, b, c) {
            matrix4 = _multiply(_move(dis, a, b, c), matrix4);
            return matrix4Obj;
        },

        // 旋转
        "rotate": function (deg, a1, b1, c1, a2, b2, c2) {
            var matrix4s = _transform(a1, b1, c1, a2, b2, c2);
            matrix4 = _multiply(_multiply(_multiply(matrix4s[1], _rotate(deg)), matrix4s[0]), matrix4);
            return matrix4Obj;
        },

        // 缩放
        "scale": function (xTimes, yTimes, zTimes, cx, cy, cz) {
            matrix4 = _multiply(_scale(xTimes, yTimes, zTimes, cx, cy, cz), matrix4);
            return matrix4Obj;
        },

        // 乘法
        // 可以传入一个矩阵(matrix4,flag)
        "multiply": function (newMatrix4, flag) {
            matrix4 = flag ? _multiply(matrix4, newMatrix4) : _multiply(newMatrix4, matrix4);
            return matrix4Obj;
        },

        // 逆矩阵
        "inverse": function () {
            matrix4 = _inverse_matrix(matrix4);
            return matrix4Obj;
        },

        // 对一个坐标应用变换
        // 齐次坐标(x,y,z,w)
        "use": function (x, y, z, w) {
            // w为0表示点位于无穷远处，忽略
            z = z || 0; w = w || 1;
            var temp = _multiply(matrix4, [x, y, z, w]);
            temp[0] = temp[0].toFixed(7);
            temp[1] = temp[1].toFixed(7);
            temp[2] = temp[2].toFixed(7);
            return temp;
        },

        // 矩阵的值
        "value": function () {
            return matrix4;
        }

    };

    return matrix4Obj;
};
