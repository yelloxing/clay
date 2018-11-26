// 任意曲线
var _line = function (painter) {

    var scope = {},
        hermite = clay.hermite().setU(-1);

    /**
     * 绘制任意曲线
     */
    var line = function (points) {
        var i = 0, temp = "M" + points[0][0] + "," + points[0][1];
        var sqrt2,
            cos, sin,
            cx, cy,
            x, y,
            leftP, rightP;
        for (; i < points.length - 1; i++) {
            sqrt2 = Math.sqrt((points[i][0] - points[i + 1][0]) * (points[i][0] - points[i + 1][0]) + (points[i][1] - points[i + 1][1]) * (points[i][1] - points[i + 1][1]));
            sin = -(points[i][1] - points[i + 1][1]) / 2 / sqrt2;
            cos = (points[i + 1][0] - points[i][0]) / 2 / sqrt2;
            cx = (points[i][0] + points[i + 1][0]) / 2;
            cy = (points[i][1] + points[i + 1][1]) / 2;
            x = points[i == 0 ? 0 : i - 1][0];
            y = points[i == 0 ? 0 : i - 1][1];
            leftP = [
                ((x - cx) * cos - (y - cy) * sin + cx).toFixed(7),
                ((x - cx) * sin + (y - cy) * cos + cy).toFixed(7)
            ];
            x = points[i >= points.length - 2 ? points.length - 1 : i + 2][0];
            y = points[i >= points.length - 2 ? points.length - 1 : i + 2][1];
            rightP = [
                ((x - cx) * cos - (y - cy) * sin + cx).toFixed(7),
                ((x - cx) * sin + (y - cy) * cos + cy).toFixed(7)
            ];
            hermite.setP(
                (points[i][0] + points[i + 1][0]) * 0.5 - sqrt2 * 0.5, (points[i][1] + points[i + 1][1]) * 0.5,
                (points[i][0] + points[i + 1][0]) * 0.5 + sqrt2 * 0.5, (points[i][1] + points[i + 1][1]) * 0.5,
                points[i + 1][0] == leftP[0] ? -9999999 : (points[i + 1][1] - leftP[1]) / (points[i + 1][0] - leftP[0]),
                points[i][0] == rightP[0] ? 9999999 : (points[i][1] - rightP[1]) / (points[i][0] - rightP[0])
            );
            temp = painter(hermite, (points[i][0] + points[i + 1][0]) * 0.5 - sqrt2 * 0.5, (points[i][0] + points[i + 1][0]) * 0.5 + sqrt2 * 0.5, temp, scope.d);
        }
        return temp;
    };

    // 设置精度
    line.setPrecision = function (dis) {
        scope.d = dis;
        return line;
    };

    return line;

};

// 采用SVG绘制任意曲线
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

// 采用Canvas绘制任意曲线
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
