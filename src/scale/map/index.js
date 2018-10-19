clay.scale.map = function () {

    var scope = {
        c: [107, 36],
        // 缩放比例，默认缩小一万倍
        s: 10000,
        t: "ploar"//默认采用极地投影
    };

    var rotate_z, rotate_x, rotate_y;

    // 计算出来的位置是偏离中心点的距离
    var map = function (longitude, latitude) {

        // 极地投影
        if (scope.t == 'ploar') {
            rotate_z = rotate_z || clay.math.rotate().setL(0, 0, 0, 0, 0, 1);
            rotate_x = rotate_x || clay.math.rotate().setL(0, 0, 0, 1, 0, 0);
            rotate_y = rotate_y || clay.math.rotate().setL(0, 1, 0, 0, 0, 0);
            return _ploar(longitude, latitude, rotate_z, rotate_x, rotate_y, scope);
        }
        // 错误设置应该抛错
        else {
            throw new Error('Illegal projection mode!');
        }

    };

    // 设置或获取映射方法
    map.type = function (type) {
        if (typeof type === 'string') scope.t = type;
        else return scope.t;
        return map;
    };

    // 设置或获取缩放比例
    map.scale = function (scale) {
        if (typeof scale === 'number') scope.s = scale;
        else return scope.s;
        return map;
    };

    // 设置或获取旋转中心
    map.center = function (longitude, latitude) {
        if (typeof longitude === 'number' && typeof latitude === 'number') scope.c = [longitude, latitude];
        else return scope.c;
        return map;
    };

    return map;

};
