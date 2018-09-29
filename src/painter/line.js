// 2D曲线
// config={init,draw,end}
var _line = function (config) {

    var scope = {
        interpolate: 'line',
        dis: 5,
        t: 0,
        flag: false
    };

    // points代表曲线的点集合[[x,y],[x,y],...]
    var line = function (points) {

        if (typeof scope.h === 'number') {
            var cardinal, i,
                result = config.init(points[0][0], scope.flag ? points[0][1] : scope.h - points[0][1]);

            // cardinal插值法
            if (scope.interpolate === 'cardinal') {
                cardinal = clay.math.cardinal().setU(scope.t).setP(points);
                for (i = points[0][0] + scope.dis; i < points[points.length - 1][0]; i += scope.dis)
                    result = config.draw(result, i, scope.flag ? cardinal(i) : scope.h - cardinal(i));
            }

            // 默认或错误设置都归结为line
            else {
                for (i = 1; i < points.length; i++)
                    result = config.draw(result, points[i][0], scope.flag ? points[i][1] : scope.h - points[i][1]);
            }

            return config.end(result);
        } else {
            throw new Error('You need to set the height first!');
        }

    };

    // flag可以不传递，默认false，表示y坐标轴方向和数学上保存一致
    // 只有在设置为true的时候，才会使用浏览器的方式
    line.setFlag = function (flag) {

        scope.flag = flag;
        return line;

    };

    // 设置所在组的高
    // 参数应该是一个数字
    line.setHeight = function (height) {

        if (typeof height !== 'number' || height <= 0)
            throw new Error('Unsupported data!');
        scope.h = height;
        return line;

    };

    // 设置张弛系数
    line.setT = function (t) {

        scope.t = t;
        return line;

    };

    // 设置精度
    line.setPrecision = function (dis) {

        scope.dis = dis;
        return line;

    };

    // 设置曲线插值方法
    line.interpolate = function (type) {

        scope.interpolate = type;
        return line;

    };

    return line;

};
