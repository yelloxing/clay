// 曲线
var _line = function (painter) {

    var scope = {
        d: 5
    },
        hermite = clay.hermite().setU(-1);

    /**
     * 绘制曲线
     */
    var line = function (points) {
        var i = 0, temp = "M" + points[0][0] + "," + points[0][1];
        var l, r;
        for (; i < points.length - 1; i++) {
            l = i == 0 ? 0 : i - 1;
            r = i == points.length - 2 ? points.length - 1 : i + 2;
            hermite.setP(
                points[i][0], points[i][1],
                points[i + 1][0], points[i + 1][1],
                (points[i + 1][1] - points[l][1]) / (points[i + 1][0] - points[l][0]),
                (points[r][1] - points[i][1]) / (points[r][0] - points[i][0])
            );
            temp = painter(hermite, points[i][0], points[i + 1][0], temp, scope.d);
        }
        return temp;
    };

    // 设置精度
    line.setPrecision = function (dis) {
        scope.d = dis;
        return line;
    };

    // 设置张弛系数
    line.setU = function (u) {
        hermite.setU(u);
        return line;
    };

    return line;

};

// 采用SVG绘制曲线
clay.svg.line = function () {
    return _line(
        function (
            hermite, bx, ex, d, dis
        ) {
            for (; bx < ex; bx += dis)
                d = d + " L" + bx + "," + hermite(bx);
            d = d + " L" + ex + "," + hermite(ex);
            return d;
        }
    );
};

// 采用Canvas绘制曲线
clay.canvas.line = function (selector, config) {
    var key,
        obj =
            _canvas(selector, config, _line, function (
                hermite, bx, ex, flag, dis
            ) {
                if (typeof flag == 'string') {
                    obj._p.beginPath();
                    obj._p.moveTo(bx, hermite(bx));
                }
                for (; bx < ex; bx += dis)
                    obj._p.lineTo(bx, hermite(bx));
                obj._p.lineTo(ex, hermite(ex));
                return obj._p;
            });
    return obj;
};
