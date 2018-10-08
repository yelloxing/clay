// 目前不考虑太多，先提供这一种投影方式
// 别的后期再说

// 假定了地球是小圆球

/**
 * 确定中心点以后，
 * 旋转地球，使得中心点作为最高点，
 * 然后垂直纸面的视线
 */

clay.math.map = function () {

    var scope = {
        // 默认采用中国地理中心经纬度
        c: [107, 31],
        // 缩放比例，默认缩小一万倍
        s: 10000
    };

    var rotate_z = clay.math.rotate().setL(0, 0, 0, 0, 0, 1);
    var rotate_x = clay.math.rotate().setL(0, 0, 0, 1, 0, 0);

    // 计算出来的位置是偏离中心点的距离
    var map = function (longitude, latitude) {

        var p = rotate_z.setP(_Geography[0].R / scope.s, 0, 0)(longitude / 180 * Math.PI);
        p = rotate_x.setP(p[0], p[1], p[2])(latitude / 180 * Math.PI);
        p = rotate_z.setP(p[0], p[1], p[2])((90 - scope.c[0]) / 180 * Math.PI);
        p = rotate_x.setP(p[0], p[1], p[2])((90 - scope.c[1]) / 180 * Math.PI);

        var result = [
            -p[0],
            p[1]
        ];

        return result;

    };

    map.scale = function (scale) {
        if (typeof scale === 'number') scope.s = scale;
        else return scope.s;
        return map;
    };

    map.center = function (longitude, latitude) {
        if (typeof longitude === 'number' && typeof latitude === 'number') scope.c = [longitude, latitude];
        else return scope.c;
        return map;
    };

    return map;

};
