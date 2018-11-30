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
        // 提示信息连线长度
        l: [20, 20],
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
    }, calcLinePosition = function (deg, r) {

        var pos = [];
        // 求出第一个点
        pos[0] = clay.rotate(scope.c[0], scope.c[1], deg, scope.c[0] + r, scope.c[1]);

        // 求出第二个点
        pos[1] = clay.rotate(scope.c[0], scope.c[1], deg, scope.c[0] + r + scope.l[0], scope.c[1]);

        // 求出第三个点
        pos[2] = [
            pos[1][0] > scope.c[0] ? pos[1][0] - (-scope.l[1]) : pos[1][0] - scope.l[1],
            pos[1][1]
        ];

        pos[3] = pos[1][0] > scope.c[0] ? "left" : "right";

        return pos;
    };

    /**
     * 计算饼图数据
     * @param {Array} initPie 一个可迭代的原始数据
     */
    var pie = function (initPie) {
        var resultData = [], key, allVal = 0, i = 0;
        for (key in initPie) {
            resultData.push({
                "org": initPie[key],
                "val": scope.v(initPie[key], key, i)
            });
            allVal += resultData[i].val;
            i += 1;
        }
        var preBegin = scope.b, preDeg = 0;
        var cDeg;
        for (i = 0; i < resultData.length - 1; i++) {

            // 求解角度（主要用于画弧）
            preBegin = resultData[i].begin = preBegin + preDeg;
            resultData[i].p = resultData[i].val / allVal;
            preDeg = resultData[i].deg = scope.g * resultData[i].p * (scope.d ? -1 : 1);

            // 求解说明文字连线（主要用于绘制折线）
            resultData[i].line = calcLinePosition(
                resultData[i].begin + resultData[i].deg * 0.5,
                typeof scope.r == 'function' ? scope.r(initPie[key], key, i) : scope.r);

            // 启动绘画方法
            scope.p(resultData[i], i);
        }

        // 最后一个为了可以完全闭合（因为计算有精度丢失导致的），独立计算
        resultData[i].begin = preBegin + preDeg;
        resultData[i].deg = scope.g * (scope.d ? -1 : 1) + scope.b - resultData[i].begin;
        resultData[i].p = resultData[i].val / allVal;

        resultData[i].line = calcLinePosition(
            resultData[i].begin + resultData[i].deg * 0.5,
            typeof scope.r == 'function' ? scope.r(initPie[key], key, i) : scope.r);

        scope.p(resultData[i], i);
        return pie;

    };

    // 设置如何获取值
    // 函数有三个参数：原始值、值的key、序号
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
    // 一个数字或返回半径的函数
    // 函数有三个参数：原始值、值的key、序号
    pie.setRadius = function (r) {
        scope.r = r;
        return pie;
    };

    // 设置提示信息连接线长度
    pie.setDis = function (l1, l2) {
        scope.l = [l1, typeof l2 == 'number' ? l2 : l1];
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
