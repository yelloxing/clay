// 目前不考虑太多，先提供这一种投影方式
// 别的后期再说

// 假定了地球是小圆球

/**
 * 确定中心点以后，
 * 旋转地球，使得中心点作为最高点，
 * 然后垂直纸面的视线
 */

clay.scale.map = function () {

    var scope = {
        c: [107, 36],
        // 缩放比例，默认缩小一万倍
        s: 10000
    };

    var rotate_z = clay.math.rotate().setL(0, 0, 0, 0, 0, 1);
    var rotate_x = clay.math.rotate().setL(0, 0, 0, 1, 0, 0);
    var rotate_y = clay.math.rotate().setL(0, 1, 0, 0, 0, 0);

    // 计算出来的位置是偏离中心点的距离
    var map = function (longitude, latitude) {

        /**
         * 通过旋转的方法
         * 先旋转出点的位置
         * 然后根据把地心到旋转中心的这条射线变成OZ这条射线的变换应用到初始化点上
         * 这样求的的点的x,y就是最终结果
         *
         *  计算过程：
         *  1.初始化点的位置是p（x,0,0）,其中x的值是地球半径除以缩放倍速
         *  2.根据点的纬度对p进行旋转，旋转后得到的p的坐标纬度就是目标纬度
         *  3.同样的对此刻的p进行经度的旋转，这样就获取了极点作为中心点的坐标
         *  4.接着想象一下为了让旋转中心移动到极点需要进行旋转的经纬度是多少，记为lo和la
         *  5.然后再对p进行经度度旋转lo获得新的p
         *  6.然后再对p进行纬度旋转la获得新的p
         *  7.旋转结束
         *
         * 特别注意：第5和第6步顺序一定不可以调换，原因来自经纬度定义上
         * 【除了经度为0的位置，不然纬度的旋转会改变原来的经度值，反过来不会】
         *
         */
        var p = rotate_y.setP(_Geography[0].R / scope.s, 0, 0)(latitude / 180 * Math.PI);
        p = rotate_z.setP(p[0], p[1], p[2])(longitude / 180 * Math.PI);
        p = rotate_z.setP(p[0], p[1], p[2])((90 - scope.c[0]) / 180 * Math.PI);
        p = rotate_x.setP(p[0], p[1], p[2])((90 - scope.c[1]) / 180 * Math.PI);

        return [
            -p[0],
            p[1]
        ];

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
