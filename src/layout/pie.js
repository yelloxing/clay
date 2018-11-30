/**
 * 饼布局
 *
 */
clay.pieLayout = function () {
    var scope = {
        // 圆心
        c: [0, 0],
        // 半径
        r: 1,
        // 获取值方法
        v: function (value, key, index) {
            return value;
        },
        // 起始角度
        b: 0,
        // 旋转方向
        d: false,
        // arc尺寸
        g: Math.PI * 2
    };

    /**
     * 计算饼图数据
     * @param {Array} data 一个可迭代的原始数据
     */
    var pie = function (data) {
        var resultData = [], key, allVal = 0, i = 0;
        for (key in data) {
            resultData.push({
                "org": data[key],
                "val": scope.v(data[key], key, i)
            });
            allVal += resultData[i].val;
            i += 1;
        }
        var preBegin = scope.b, preDeg = 0;
        for (i = 0; i < resultData.length - 1; i++) {
            preBegin = resultData[i].begin = preBegin + preDeg;
            resultData[i].p = resultData[i].val / allVal;
            preDeg = resultData[i].deg = scope.g * resultData[i].p * (scope.d ? -1 : 1);
            scope.p(resultData[i], i);
        }
        // 最后一个为了可以完全闭合（因为计算有精度丢失导致的），独立计算
        resultData[i].begin = preBegin + preDeg;
        resultData[i].deg = scope.g * (scope.d ? -1 : 1) + scope.b - resultData[i].begin;
        resultData[i].p = resultData[i].val / allVal;
        scope.p(resultData[i], i);
        return pie;
    };

    // 设置如何获取值
    pie.setValue = function (valback) {
        scope.v = valback;
        return pie;
    };

    // 设置如何绘图
    pie.drawer = function (drawerback) {
        scope.p = drawerback;
        return pie;
    };

    // 设置旋转方向
    // true 逆时针
    // false 顺时针
    pie.setD = function (notClockwise) {
        scope.d = notClockwise;
        return pie;
    };

    // 设置起始角度
    pie.setBegin = function (deg) {
        scope.b = deg;
        return pie;
    };

    // 设置半径
    pie.setRadius = function (r) {
        scope.r = r;
        return pie;
    };

    // 设置弧中心
    pie.setCenter = function (x, y) {
        scope.c = [x, y];
        return pie;
    };

    // 设置弧度跨度
    pie.setDeg = function (deg) {
        scope.g = deg;
        return pie;
    };

    return pie;
};
