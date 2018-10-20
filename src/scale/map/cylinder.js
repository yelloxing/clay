/**
 * 圆柱投影
 * @param {number} longitude 经度
 * @param {number} latitude 纬度
 * @param {number} vertical_dis 垂直间距
 * @param {number} horizontal_dis 水平间距
 * @param {json} scope 参数对象
 *
 */
var _cylinder = function (longitude, latitude, vertical_dis, horizontal_dis, scope) {

    return [
        horizontal_dis * (longitude - scope.c[0]),
        vertical_dis * (scope.c[1] - latitude),
        // 这种投影统一认为无法模拟三纬
        0
    ];
};
