/**
 *  catmull-rom插值
 *  给定四个点p0,p1,p2,p3，可以计算出p1,p2之间的插值，其中的p0,p3为控制点
 */
clay.catmullRom = function () {

    var scope = {};

    // deep为偏移量  deep的取值范围为[0,1]，deep取0将得出p1点，deep取1将得出p2点
    var catmull = function (deep) {
        var deep2 = deep * deep, deep3 = deep2 * deep;
        return [
            0.5 * (scope.x[0] * deep3 + scope.x[1] * deep2 + scope.x[2] * deep + scope.x[3]),
            0.5 * (scope.y[0] * deep3 + scope.y[1] * deep2 + scope.y[2] * deep + scope.y[3])
        ];
    };

    // 设置一组点
    // 四个点 p1,p2,p3,p4
    catmull.setP = function (p1, p2, p3, p4) {
        scope.x = clay.Matrix4([-1, 2, -1, 0, 3, -5, 0, 2, -3, 4, 1, 0, 1, -1, 0, 0]).use(p1[0], p2[0], p3[0], p4[0]);
        scope.y = clay.Matrix4([-1, 2, -1, 0, 3, -5, 0, 2, -3, 4, 1, 0, 1, -1, 0, 0]).use(p1[1], p2[1], p3[1], p4[1]);
        return catmull;
    };

    return catmull;
};
