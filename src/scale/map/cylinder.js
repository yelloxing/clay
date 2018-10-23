/**
 * 正轴等角圆柱投影 - 墨卡托投影
 * @param {number} longitude 经度
 * @param {number} latitude 纬度
 * @param {number} vertical_dis 垂直间距
 * @param {number} horizontal_dis 水平间距
 * @param {json} scope 参数对象
 *
 * 想象一个球被圆柱包含，把球皮一片片拨开，横向拉伸，贴在圆柱上
 *
 * 该投影具有等角航线被表示成直线的特性，故广泛用于编制航海图和航空图等
 * 【展开的界限纬度：-90 ~ 90，经度：-180 ~ 180】
 */
var _cylinder = function (longitude, latitude, vertical_dis, horizontal_dis, scope) {

    return [
        horizontal_dis * (longitude - scope.c[0]),
        vertical_dis * (scope.c[1] - latitude),
        // 这种投影统一认为无法模拟三纬
        0
    ];
};
