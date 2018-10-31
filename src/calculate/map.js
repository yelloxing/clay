/**
 * 把地球看成一个半径为100px的圆球
 * 等角斜方位投影
 */
clay.map = function () {

    var scope = {
        // 投影中心经纬度
        c: [107, 36],
        // 缩放比例
        s: 1
    };

    var _TwoMatrix4, calcTwoRotate = function () {
        _TwoMatrix4 = clay.Matrix4()
            // 3.然后再对p进行经度度旋转lo获得新的p
            .rotate((90 - scope.c[0]) / 180 * Math.PI, 0, 0, 0, 0, 0, 1)
            // 4.然后再对p进行纬度旋转la获得新的p
            .rotate((90 - scope.c[1]) / 180 * Math.PI, 0, 0, 0, 1, 0, 0)
            .value();
    };

    calcTwoRotate();

    // 计算出来的位置是偏离中心点的距离
    var map = function (longitude, latitude) {
        var point = clay.Matrix4()
            // 1.根据点的纬度对p进行旋转，旋转后得到的p的坐标纬度就是目标纬度
            .rotate(latitude / 180 * Math.PI, 0, 1, 0, 0, 0, 0)
            // 2.同样的对此刻的p进行经度的旋转，这样就获取了极点作为中心点的坐标
            .rotate(longitude / 180 * Math.PI, 0, 0, 0, 0, 0, 1)
            // [接着想象一下为了让旋转中心移动到极点需要进行旋转的经纬度是多少，记为lo和la]
            .multiply(_TwoMatrix4)
            // 5.初始化点的位置是p（x,0,0）
            .use(scope.s * 100, 0, 0, 1);
        return [
            -point[0],
            point[1],
            point[2],
            point[3]
        ];
    };

    // 设置缩放比例
    map.scale = function (scale) {
        if (typeof scale === 'number') scope.s = scale;
        return map;
    };

    // 设置旋转中心
    map.center = function (longitude, latitude) {
        if (typeof longitude === 'number' && typeof latitude === 'number') {
            scope.c = [longitude, latitude];
            calcTwoRotate();
        }
        return map;
    };

    return map;

};
