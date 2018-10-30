/**
 * 4x4矩阵
 * 默认列优先存储
 * 因为着色器语言采用此存储方式
 */
clay.Matrix4 = function () {

    var matrix4,
        // 可选类型：
        // 0 -> 空值
        // 1 -> 列优先存储的单一矩阵
        // 2 -> 列优先存储的多矩阵
        type = 0;

    return {
        "move": function (dx, dy, dz) {
            matrix4 = move(dx, dy, dz);
            type = 1;
            return matrix4;
        },
        "rotate": function (deg) {
            matrix4 = rotate(deg);
            type = 1;
            return matrix4;
        },
        "scale": function (xTimes, yTimes, zTimes) {
            matrix4 = scale(xTimes, yTimes, zTimes);
            type = 1;
            return matrix4;
        },
        "transform": function (a1, b1, c1, a2, b2, c2) {
            matrix4 = transform(a1, b1, c1, a2, b2, c2);
            type = 2;
            return matrix4;
        }
    };

};
