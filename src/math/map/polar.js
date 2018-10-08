//中心点平行投影 = 等角正切方位投影+等积斜切方位投影

// 假定了地球是小圆球

/**
 * 确定中心点以后，
 * 旋转地球，使得中心点作为最高点，
 * 然后垂直纸面的视线
 */

clay.math.map.polar = function () {

    var scope = {
        // 默认采用中国地理中心经纬度
        c: [104, 31],
        // 缩放比例，默认缩小五千倍
        s: 5000
    };

    // 计算出来的位置是偏离中心点的距离
    var polar = function (longitude, latitude) {

        // 这样统一转成以北极为中心点
        // 问题简单化
        longitude += (90 - scope.c[0]);
        var cos1 = Math.cos(longitude / 180 * Math.PI),
            sin1 = Math.cos(longitude / 180 * Math.PI),
            sin2 = Math.sin(latitude / 180 * Math.PI),
            cos2 = Math.cos(latitude / 180 * Math.PI),
            cosN = Math.cos((latitude - 90 + scope.c[1]) / 180 * Math.PI),

            cosLatitude = Math.sqrt(
                (_Geography[0].R * cos1 * cos2) * (_Geography[0].R * cos1 * cos2) /
                (
                    (_Geography[0].R * cos1 * cos2) * (_Geography[0].R * cos1 * cos2) +
                    ((
                        _Geography[0].R * cos1 * sin2 * cosN / cos2
                    ) * (
                            _Geography[0].R * cos1 * sin2 * cosN / cos2
                        ))
                ));
        var temp = _Geography[0].R * cos2 / scope.s,
            result = [
                -temp * cos1,
                temp * sin1
            ];

        return result;

    };

    polar.scale = function (scale) {
        if (typeof scale === 'number') scope.s = scale;
        else return scope.s;
        return polar;
    };

    polar.center = function (longitude, latitude) {
        if (typeof longitude === 'number' && typeof latitude === 'number') scope.c = [longitude, latitude];
        else return scope.c;
        return polar;
    };

    return polar;

};
