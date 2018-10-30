// 针对任意射线(a1,b1,c1)->(a2,b2,c2)
// 计算出二个变换矩阵
// 分别为：任意射线变成OZ轴变换矩阵 + OZ轴变回原来的射线的变换矩阵
var transform = function (a1, b1, c1, a2, b2, c2) {

    var sqrt1 = Math.sqrt((a2 - a1) * (a2 - a1) + (b2 - b1) * (b2 - b1)),
        cos1 = sqrt1 != 0 ? (b2 - b1) / sqrt1 : 1,
        sin1 = sqrt1 != 0 ? (a2 - a1) / sqrt1 : 0,

        b = (a2 - a1) * sin1 + (b2 - b1) * cos1,
        c = c2 - c1,

        sqrt2 = Math.sqrt(b * b + c * c),
        cos2 = sqrt2 != 0 ? c / sqrt2 : 1,
        sin2 = sqrt2 != 0 ? b / sqrt2 : 0;

    return [

        // 任意射线变成OZ轴变换矩阵
        [
            cos1, cos2 * sin1, sin1 * sin2, 0,
            -sin1, cos1 * cos2, cos1 * sin2, 0,
            0, -sin2, cos2, 0,
            b1 * sin1 - a1 * cos1, c1 * sin2 - a1 * sin1 * cos2 - b1 * cos1 * cos2, -a1 * sin1 * sin2 - b1 * cos1 * sin2 - c1 * cos2, 1
        ],

        // OZ轴变回原来的射线的变换矩阵
        [
            cos1, -sin1, 0, 0,
            cos2 * sin1, cos2 * cos1, -sin2, 0,
            sin1 * sin2, cos1 * sin2, cos2, 0,
            a1, b1, c1, 1
        ]

    ];
};
