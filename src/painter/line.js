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
    // isClose表示曲线是否需要闭合（改变的是计算方法，不会自动闭合）
    var line = function (points, isClose) {

        if (scope.flag || typeof scope.h === 'number') {
            var hermite, i, j, p1, p2,
                result = config.init(points[0][0], scope.flag ? points[0][1] : scope.h - points[0][1]);

            // cardinal插值法
            if (scope.interpolate === 'cardinal') {
                hermite = clay.math.hermite().setU(scope.t);

                // 补足开头和结尾的辅助点
                points.unshift(isClose ? points[points.length - 1] : points[0]);
                points.push(isClose ? points[1] : points[points.length - 1]);

                for (i = 1; i < points.length - 2; i++) {

                    // 计算i，i+1段
                    if (points[i][0] == points[i + 1][0]) {


                        p1 = (points[i + 1][0] - points[i - 1][0]) / (points[i + 1][1] - points[i - 1][1]);
                        p2 = (points[i + 2][0] - points[i][0]) / (points[i + 2][1] - points[i][1]);
                        // 如果二个x坐标相同，交换坐标轴
                        if (points[i][1] < points[i + 1][1]) {

                            hermite.setP(points[i][1], points[i][0], points[i + 1][1], points[i + 1][0], p1, p2);
                            for (j = points[i][1]; j <= points[i + 1][1]; j += scope.dis)
                                result = config.draw(result, hermite(j), scope.flag ? j : scope.h - j);
                        } else {

                            hermite.setP(points[i + 1][1], points[i + 1][0], points[i][1], points[i][0], p2, p1);
                            for (j = points[i][1]; j >= points[i + 1][1]; j -= scope.dis)
                                result = config.draw(result, hermite(j), scope.flag ? j : scope.h - j);
                        }

                    } else {

                        p1 = (points[i + 1][1] - points[i - 1][1]) / (points[i + 1][0] - points[i - 1][0]);
                        p2 = (points[i + 2][1] - points[i][1]) / (points[i + 2][0] - points[i][0]);
                        if (points[i][0] < points[i + 1][0]) {

                            hermite.setP(points[i][0], points[i][1], points[i + 1][0], points[i + 1][1], p1, p2);
                            for (j = points[i][0]; j <= points[i + 1][0]; j += scope.dis)
                                result = config.draw(result, j, scope.flag ? hermite(j) : scope.h - hermite(j));
                        } else {

                            hermite.setP(points[i + 1][0], points[i + 1][1], points[i][0], points[i][1], p2, p1);
                            for (j = points[i][0]; j >= points[i + 1][0]; j -= scope.dis)
                                result = config.draw(result, j, scope.flag ? hermite(j) : scope.h - hermite(j));
                        }

                    }
                }

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
